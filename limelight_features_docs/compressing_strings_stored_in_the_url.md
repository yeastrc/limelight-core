# Compressing strings stored in the URL — algorithm choice (JS ⇄ Java)

**Status:** convention / design decision. Captured 2026-07-14. Records which compression scheme to use
for a string that is stored as part of a page URL, and — the deciding factor — whether that string must be
read/written by **both** the browser (TypeScript) and the **server (Java)**. Related: the HTTP-header
JSON encoding work (`HttpHeaderValue_Base64_Encoding.java` /
`front_end/.../data_pages_common/httpHeaderValue_Base64_EncodeDecode.ts`) solves the *same* underlying
transport-charset problem for headers.

## TL;DR

- **New URL value that BOTH JS and Java must handle → standard `deflate-raw` (RFC 1951) + Base64URL.**
- **JS-only URL value (browser produces *and* consumes it) → the existing lz-string wrapper is fine;**
  don't introduce a second scheme, and don't churn what already works.

The decision is driven by **interop reliability, not compression ratio.**

## Background

Limelight already compresses a string into the URL in one place: the **central page state** blob that
appears as a path segment after `/q/`. That path is produced by
`newURL_Build_PerProjectSearchIds_Or_ExperimentId.ts` and parsed by `parseURL_Into_PageStateParts.ts`;
the compression is done by `data_pages_common/compressDecompressString.ts`, which wraps the vendored
**lz-string v1.4.4** (`front_end/src/js/libs/lz-string/lz-string.js`) using
`compressToEncodedURIComponent` / `decompressFromEncodedURIComponent`. That usage is correct **and the
variant choice is required**: the `EncodedURIComponent` alphabet (`A-Za-z0-9 + - $`) contains no `/`, so
the blob survives being split out of the path on `/`; `compressToBase64` would break because its alphabet
contains `/`.

That existing usage is **entirely inside the browser** — the server never reads or writes it. The question
this doc answers is what to do when a *new* URL string must also be read or written by **Java**.

## Decision: for JS ⇄ Java, use `deflate-raw` + Base64URL

lz-string's only real advantage is that it emits URL-safe output directly. But it has **no first-class Java
implementation** — using it from Java means porting ~150 lines of bit-twiddling per direction and
maintaining a golden-vector test suite against the exact vendored file (see the edge-cases discussion
below). For a *new* interop value, that cost is avoidable.

Standard DEFLATE gives URL-safe output **and** battle-tested, byte-compatible implementations on both sides:

| Step | TypeScript (browser) | Java (server) |
|---|---|---|
| Compress / decompress | `CompressionStream` / `DecompressionStream('deflate-raw')` (or `pako`) | `java.util.zip.Deflater` / `Inflater` with `nowrap = true` |
| URL-safe encode / decode | `btoa` → swap `+/`→`-_` → strip `=` (and reverse) | `Base64.getUrlEncoder().withoutPadding()` / `getUrlDecoder()` |

DEFLATE is a spec (RFC 1951); cross-language interop is a non-event — it is exactly how, e.g., SAML's
`?SAMLRequest=` parameter works (raw DEFLATE + base64). There is no port to write and no silent-desync
class of bug to guard against.

## Motivating use case: search-data-lookup params inline in the URL (instead of a DB `code`)

A concrete reason this convention exists. Today the **search data lookup parameters** —
`SearchDataLookupParamsRoot` and its nested contents (e.g. `SearchDataLookupParams_For_ProjectSearchIds`;
package `...search_data_lookup_parameters_code`) — are **persisted in the database**, and only a short
opaque **`code`** is placed in the URL (the `searchDataLookupParametersCode`, seen as `.../c/{code}/...` in
`parseURL_Into_PageStateParts.ts`). The server resolves that code back to the stored params.

The goal: store a **reworked, compact, compressed** version of those params **directly in the URL** and drop
the DB row + code entirely — one less thing to persist. This is **especially valuable for not-logged-in
(anonymous) users**, where you would otherwise have to write transient server-side state for a session; it
also yields self-contained, shareable URLs.

Because **both** the server (Java) and the browser (JS) build and read these params, this is squarely the
JS ⇄ Java case → use **`deflate-raw` + Base64URL**, not lz-string.

"Reworked" matters. `SearchDataLookupParamsRoot` is a verbose bean (nested objects, long JSON keys).
Inline-in-URL wants a **compact wire form** — short keys or positional encoding — applied *before*
compression, so DEFLATE starts from something already small. The existing `versionNumber` field is exactly
the right hook: carry a format version in the compact form so the decoder can evolve.

Design points to settle up front (not blockers):

- **URL length is the real ceiling.** Inlining grows the URL, and browsers/Tomcat cap URL and path length
  (stay well under ~2 KB to be safe). A DB `code` is O(1) length regardless of how big the params are, so
  the inline approach fits **small/medium** param sets; large ones (many project-search-ids, big filter
  sets) may still need the code indirection. Measure on realistic worst cases — compression buys headroom,
  not an unlimited budget.
- **Coexistence, not either/or.** Support **both**: a short DB `code` *or* an inline compressed blob,
  distinguished by URL position or a one-character tag. Anonymous / small → inline; logged-in / large →
  code.
- **Authorization is unchanged.** An inline blob is user-visible and user-editable, so the server must keep
  enforcing access on whatever the params resolve to (project search ids, etc.) exactly as it does for a
  code. The blob is a convenience, never a trust boundary — never assume it wasn't tampered with.

## Details and gotchas

- **`deflate-raw`, not gzip.** gzip adds an ~18-byte header/footer that is pure overhead in a URL. Use
  raw DEFLATE. The **`-raw` / `nowrap` settings must match on both sides**: `CompressionStream('deflate-raw')`
  pairs with `new Deflater(level, /*nowrap*/ true)` and `new Inflater(/*nowrap*/ true)`. (If you ever use
  JS `'deflate'` — zlib-wrapped — you must use `nowrap = false` in Java. Pick one and be consistent.)
- **Base64URL, not standard Base64.** The `-_` alphabet with padding stripped is path- *and* query-safe:
  no `/`, no `+`, no `%`. That is the same property that forces lz-string's `EncodedURIComponent` for path
  segments, so a Base64URL blob is equally safe to drop straight into the path (no `encodeURIComponent`).
- **Measure before compressing short strings.** DEFLATE has a small fixed overhead and Base64URL adds
  ~33%; for short values the result can be *larger* than the input. If the string is small, plain Base64URL
  of the UTF-8 JSON (no compression) is simpler and often smaller — and still fully standard on both sides.
- **Browser support.** `CompressionStream` / `DecompressionStream` are in all current browsers
  (Chrome/Edge 80+, Firefox 113+, Safari 16.4+). If older browsers must be supported, `pako` is a DEFLATE-
  compatible drop-in fallback.
- **Never hand-roll a compressor.** Use the stdlib DEFLATE on each side.
- **Test cross-implementation, not just self-round-trip.** The real guarantee is JS-encode → Java-decode →
  original (and the reverse). A Java-encode → Java-decode round trip can be self-consistently wrong.

## Illustrative reference implementations

These are minimal and meant to be validated with a cross-implementation round-trip test before use.

TypeScript:
```ts
async function encode_ForUrl_DeflateBase64Url( text: string ): Promise<string> {
    const cs = new CompressionStream( "deflate-raw" );
    const writer = cs.writable.getWriter();
    writer.write( new TextEncoder().encode( text ) );
    writer.close();
    const bytes = new Uint8Array( await new Response( cs.readable ).arrayBuffer() );
    let bin = "";
    for ( const b of bytes ) bin += String.fromCharCode( b );
    return btoa( bin ).replace( /\+/g, "-" ).replace( /\//g, "_" ).replace( /=+$/, "" );
}

async function decode_FromUrl_DeflateBase64Url( encoded: string ): Promise<string> {
    const b64 = encoded.replace( /-/g, "+" ).replace( /_/g, "/" );
    const bytes = Uint8Array.from( atob( b64 ), c => c.charCodeAt( 0 ) );
    const ds = new DecompressionStream( "deflate-raw" );
    const writer = ds.writable.getWriter();
    writer.write( bytes );
    writer.close();
    return await new Response( ds.readable ).text();
}
```

Java:
```java
static String encodeForUrl( String text ) {
    Deflater deflater = new Deflater( Deflater.DEFAULT_COMPRESSION, /*nowrap*/ true );
    deflater.setInput( text.getBytes( StandardCharsets.UTF_8 ) );
    deflater.finish();
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    byte[] buf = new byte[ 4096 ];
    while ( ! deflater.finished() ) { out.write( buf, 0, deflater.deflate( buf ) ); }
    deflater.end();
    return Base64.getUrlEncoder().withoutPadding().encodeToString( out.toByteArray() );
}

static String decodeFromUrl( String encoded ) throws DataFormatException {
    byte[] compressed = Base64.getUrlDecoder().decode( encoded );
    Inflater inflater = new Inflater( /*nowrap*/ true );
    inflater.setInput( compressed );
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    byte[] buf = new byte[ 4096 ];
    while ( ! inflater.finished() ) {
        int n = inflater.inflate( buf );
        if ( n == 0 && inflater.needsInput() ) break;
        out.write( buf, 0, n );
    }
    inflater.end();
    return new String( out.toByteArray(), StandardCharsets.UTF_8 );
}
```

## When lz-string is still the right call

If the new string is **JS-only** — produced and consumed entirely in the browser, like today's page-state
blob after `/q/` — reuse the existing lz-string wrapper. There is no reason to introduce a second scheme,
and the existing page-state should **not** be churned; it works and is JS-only.

If Java ever needs to read/write the page-state blob too, that is the trigger to **migrate it to
`deflate-raw` + Base64URL** rather than writing and maintaining an lz-string Java port. Porting lz-string is
possible but exacting — it operates on UTF-16 code units and has bit-exact `numBits`-growth, new-char-flag,
and end-of-stream details that must match the vendored file exactly, verified with golden vectors. The
whole point of this convention is to not sign up for that when a standard, stdlib-supported scheme does the
job.
