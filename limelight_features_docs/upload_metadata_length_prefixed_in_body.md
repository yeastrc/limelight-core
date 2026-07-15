# Moving upload metadata out of HTTP headers and into the request body (length-prefixed framing)

**Status:** convention / how-to reference. Captured 2026-07-15. A generic recipe for converting **any**
browser→server file upload that currently ships JSON metadata in HTTP **headers** to instead carry that
metadata at the **start of the request body**, framed by a byte length. Companion:
`compressing_strings_stored_in_the_url.md` (related transport-encoding conventions). The header-encoding
predecessor to this pattern is the base64-of-UTF-8 header codec
(`HttpHeaderValue_Base64_Encoding.java` / `front_end/.../httpHeaderValue_Base64_EncodeDecode.ts`).

## When to use this

Limelight file uploads put the file in the POST body (octet-stream) and JSON metadata in request headers.
That works, but headers have two hard limits:

1. **Charset:** header values are transported as ISO-8859-1, so JSON containing any character > U+00FF
   can't ride in a raw header. (Today mitigated by base64-of-UTF-8 — see the header codec above.)
2. **Size:** the total header block is capped (Tomcat default `maxHttpHeaderSize` ≈ 8 KB, shared across
   all headers). Metadata that grows without bound (e.g. per-item arrays) can blow that cap.

**Reach for this pattern when a metadata blob can grow large** (the size limit is the real driver; base64
already handles the charset issue for small/bounded headers). Moving the blob into the body removes both
limits at once — the body has no charset restriction and no practical size cap.

Do **not** convert an upload just because you can. Small, bounded metadata is fine in a base64 header. This
is for the blobs that scale.

## The format

```
POST body =  [ metadata UTF-8 bytes ] [ file bytes ]
                     ^ length N                ^ rest of body
```

The server needs to know **N**, the byte length of the metadata prefix, to split the two. Everything below
is about (a) computing N correctly and (b) how to communicate N. The pattern generalizes to multiple
metadata segments (`[meta1][meta2][file]`) — see "embedded prefix" below.

Once the metadata is UTF-8 bytes in the **body**, **drop any base64** you were applying for the header —
base64 exists only to survive the ISO-8859-1 header limit, which does not apply in the body.

## The length value: count UTF-8 bytes, not string length

This is the single most important correctness rule and the easiest to get wrong.

- **Browser:** `const bytes = new TextEncoder().encode(metadataJson); const N = bytes.length;`
  Do **not** use `metadataJson.length` — that is UTF-16 code units, which differs from the byte count for
  any non-ASCII character and would make the server split **mid-character**.
- **Assemble the body from raw bytes**, letting nothing re-encode: `new Blob([bytes, fileBytesOrBlob])`.
- **Server:** read exactly N bytes, `new String(prefixBytes, StandardCharsets.UTF_8)`, then parse.

## Communicating N: ASCII header vs. embedded body prefix

Two options. Pick per the tradeoff below.

### Option A — tiny ASCII integer header (e.g. `..._metadata_byte_length: 1234`)

Body = `[metadata bytes][file bytes]`; N travels as a decimal integer in a request header.

- **+ Simplest server control flow.** The header is available *before* the body stream, so you know N up
  front: read N into a buffer, stream the rest straight to the file. No "peek the stream to learn the
  frame" step.
- **+ Debuggable/observable.** N is visible in devtools' network tab, server logs, `curl -H`.
- **+ Trivially safe value.** Decimal digits are always header-safe — no ISO-8859-1 concern, no base64.
- **+ Loud failure on skew.** A producer/consumer mismatch surfaces as a missing/empty header → the
  existing `isEmpty → 400` check catches it, consistent with the `_base_64` header discipline.
- **+ Smallest diff / matches the current idiom** (uploads already read metadata from headers).
- **− Keeps *something* in the header** (though a ≤ ~10-byte integer does **not** reintroduce the size
  problem that motivated the move).
- **− Framing split across header + body** — they must stay consistent and travel together.
- **− Rare hostile proxies/WAFs can strip custom headers** (a non-issue same-origin, real only in theory).

### Option B — fixed-width length prefix embedded at the start of the body

Body = `[fixed-width length field][metadata bytes][file bytes]` (e.g. 4-byte big-endian uint32).

- **+ Fully self-describing body** — the payload carries its own framing; nothing external needed. It's a
  complete unit you could store/replay as-is.
- **+ Nothing added to the header** — the purest "metadata is entirely in the body" outcome.
- **+ Scales to multiple segments.** If more metadata blocks move into the body later, extend to a small
  **versioned** format — `[magic][version][len1][len2]…][seg1][seg2][file]`. The header approach would need
  one header per segment.
- **− Extra read step + binary fiddliness.** Server reads the first k bytes of the stream to learn N before
  splitting; both sides must agree on **endianness and width**. Browser prepends a `DataView`/`Uint8Array`
  length into the `Blob`. A binary field is more error-prone than a decimal string.
- **− Poor observability** — N is binary at the head of an octet-stream body; invisible without a hex dump.
- **− Quieter mismatch** — a format skew isn't a missing header; you catch it only by parsing (an
  implausible N). Add a **magic/version byte** to fail loudly.

### Recommendation

- **Default to Option A (ASCII header)** for a single metadata blob: cleanest server flow (N known before
  the body), best debuggability, smallest diff, loud-fail on skew, and the tiny integer doesn't bring back
  the size problem.
- **Choose Option B only if you foresee several/variable metadata blocks in the body** — then design it once
  as a **versioned** body framing format (magic + version + segment lengths), not an ad-hoc single prefix.

## Guardrails (apply to either option)

- **Validate N** against the total body size: `0 ≤ N ≤ contentLength − prefixWidth` (prefixWidth = 0 for
  Option A). A malformed or hostile length must not cause an over-read or a mis-split.
- **Hash the file portion only.** If the upload computes a SHA-256 (or similar) of the file contents, it
  must cover the bytes **after** the metadata prefix, not the whole body.
- **Stream the file from the right offset** — server body→file copy starts at offset N (Option A) or
  N + prefixWidth (Option B).
- **Drop base64 for the moved blob** — it's UTF-8 bytes in the body now; base64 was only for the header.
- **Deploy producer + consumer together** — the framing contract (header name / body format) is shared, so
  a browser/server version skew breaks the split. Prefer the loud-failure designs above.

## Generic migration recipe

1. **Producer (browser):** stop setting the metadata header. Compute `bytes = TextEncoder().encode(json)`
   and `N = bytes.length`. Build the body: Option A → `new Blob([bytes, file])` + set the `..._byte_length`
   header to `N`; Option B → `new Blob([lengthPrefixBytes, bytes, file])`. Send as `application/octet-stream`.
2. **Consumer (server):** read N (from the header, or from the fixed-width body prefix). Validate N. Read
   the first N body bytes → `new String(..., UTF_8)` → parse (reuse the existing `UnmarshalJSON_ToObject`).
   Stream the remaining bytes to the file / hash them.
3. **Remove** the now-unused base64 header codec call for that blob.
4. **Test** with a non-ASCII payload (proves the byte-count split) and with a large payload (proves the
   size limit is gone).

## Concrete instance

The first candidate is the **structure-file upload** (`structure-file-contents-upload-data`): its
`chains id/label/auth` JSON grows with chain count and is the blob most likely to approach the header cap.
Moving *that* blob into the body via this pattern (Option A) is the intended first application; the small
`params_json` can stay a base64 header. See the deferred-follow-up note recorded for that upload.
