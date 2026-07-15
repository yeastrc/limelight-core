# Evolving an upload header for a widely-distributed client via a version handshake

**Status:** convention / how-to reference. Captured 2026-07-15 (implemented, commit `1fef5dd9`). A recipe
for **changing the wire format of a request header when the client is distributed widely and neither side
can be force-upgraded** — here, the Submit Import Program (a runnable jar users/pipelines run, plus Docker
images) talking to the Limelight webapp. The concrete change was moving the upload-file params from a raw
XML header to a Base64-encoded-XML header, done without breaking any old program↔server combination.
Companions: `upload_metadata_length_prefixed_in_body.md` (the header-encoding hub — the size/charset limits
that motivate base64, and the bigger move of header→body framing) and `compressing_strings_stored_in_the_url.md`
(transport-encoding conventions). This is the **submit-program** sibling of the browser→webapp base64 header
codec (`HttpHeaderValue_Base64_Encoding.java`): same "escape the raw-header limits" goal, but this doc's
emphasis is the **backward-compatible rollout** of that header change to a widely-distributed client.

## The problem this solves

You want to change a header format (encoding, name, or contents) on a request that flows
**program → webapp**, but:

- **Old programs are in the field forever.** Open-source jar + Docker images; you cannot force anyone to
  upgrade. A new webapp must still accept old programs.
- **Old webapps are in the field forever.** You cannot force server operators to upgrade either. A new
  program must still work against an old webapp.

So the four combinations must all work:

| | **new webapp** | **old webapp** |
|---|---|---|
| **new program** | use the new format | fall back to the old format |
| **old program** | server accepts the old format | baseline (unchanged) |

The two load-bearing ideas: **(1) a version handshake** so the new program learns whether the server
understands the new format, and **(2) new-then-old reading** on the server so an old program's old-format
request still parses. Neither side sends both formats — each picks exactly one — so there is no header-size
doubling.

## Part 1 — the version handshake (learn the peer's version before you need it)

The program already makes a lightweight pre-flight call (`--auth-test` /
`project-upload-data-upload-submit-pgm-auth-test`) before uploading. Use its response to carry the
server's version.

- The client sends its own version on the request:
  `SubmitImport_AuthTest_Request.setSubmitProgramVersionNumber(Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER)`.
- **The server ALWAYS returns the submit-program version it is coded for** in the response field
  `submitProgramVersionNumber_Current_Per_Webapp` — on **every** path, success and failure
  (`Project_UploadData_SubmitterProgram_AuthTest_RestWebserviceController`). Historically it was set only
  on the "program too old" rejection path; making it unconditional is what lets a *successful* auth-test
  report the server's version.
- The client reads it and threads it forward
  (`AuthTest_Perform_ConnectToServer...` → `SubmitResult.serverCodedFor_SubmitProgramVersionNumber_OrNull`).

**Interpreting the value — three cases, no ambiguity:**

- **auth-test 404s** → the server predates the auth-test webservice entirely (very old) → treat as old.
- **auth-test succeeds but the version is `null`** → the server has auth-test but predates the
  "always return the version" change → treat as old.
- **auth-test returns `N`** → the server is coded for submit-program version `N`; compare `N` to the
  version at which the new format shipped.

Note `submitProgramVersionNumber_Current_Per_Webapp` is **"the submit-program version the *server*
expects,"** not a separate server version. It is the same monotonic integer the program reports for
itself (`SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER`), bumped in lockstep as features land.

## Part 2 — client picks one header by the handshake result

At upload time the connector (`CallSubmitImportWebservice.call_SubmitImport_UploadFile_Service`) selects
**exactly one** header — there is no "send both":

```java
boolean useNewBase64XmlHeader =
    serverExpects_SubmitProgramVersion_OrNull != null
    && serverExpects_SubmitProgramVersion_OrNull >= SUBMIT_PROGRAM_VERSION__UPLOAD_FILE_PARAMS_NEW_BASE64_XML_HEADER__MINIMUM;
```

- **new (≥ minimum):** serialize the params to XML (existing JAXB), `Base64.getEncoder().encodeToString(...)`,
  set header `limelight_upload_file_params_xml_base_64`.
- **old (`null` / `< minimum`):** the original behavior unchanged — raw XML in `limelight_upload_file_params_xml`
  (with its newline-strip).

Because it is `if/else`, a **successful upload proves which path ran**: if the new header were unreadable
the upload would fail (the old header isn't there to rescue it), not silently fall back.

The floor lives in its own constant, distinct from CURRENT, so it stays fixed as CURRENT climbs:
`SUBMIT_PROGRAM_VERSION__UPLOAD_FILE_PARAMS_NEW_BASE64_XML_HEADER__MINIMUM = 16` (and CURRENT bumped
`15 → 16` when this shipped).

## Part 3 — server reads new-then-old (reject if neither; fail loud on a malformed new header)

`Project_UploadData_V1_UploadFile_OldFor_OldSubmitImportProgram_RestWebserviceController`:

1. **New header present** → Base64-decode → unmarshal the XML (reuse the existing
   `unmarshal_RestRequest_XML_ToObject`). **Malformed (bad Base64 / won't parse) → reject** (400). Do
   **not** fall back to the old header — a new program sending a broken new header is a client bug worth
   surfacing.
2. **Else old header present** → the original raw-XML path, byte-for-byte unchanged.
3. **Else neither** → reject.

Keep the two header-name string constants in sync across the connector and the controller (they are
duplicated by convention, each with a "keep in sync" comment).

## Why Base64-of-the-existing-XML (not JSON)

The lowest-risk encoding change: it **reuses the existing JAXB marshal/unmarshal on both ends** — the
server just Base64-decodes, then runs the identical XML unmarshal. It gets the real win (header-safety:
no raw XML, no newline-stripping hack) without introducing a JSON serializer to the connector or a new
server parse path. JSON was considered and rejected on risk grounds. The header value is standard Base64
(`+`, `/`, `=` are all valid in an HTTP header value); use `java.util.Base64` on **both** sides so the
alphabets match.

## Payload format version (evolve the new header before a new URL is warranted)

The new-header payload carries its own version — `@XmlAttribute newHeaderParams_FormatVersion` on
`SubmitImport_UploadFile_Request_Common`, set only on the new-header path
(`SUBMIT_PROGRAM_UPLOAD_FILE_PARAMS_NEW_BASE64_XML_HEADER__FORMAT_VERSION = 1`). This layers the versioning:

- **header presence** distinguishes old-format vs new-format,
- **the payload's format version** distinguishes new vs newer,

so the new header's contents can evolve over several revisions on the **same URL**; reserve a brand-new
URL for a genuinely breaking change. (This mirrors the repo's `..._Version_Number_001` DTO convention.)

## Guardrails

- **Additive only.** Leave the old header path untouched; add the new path alongside. JAXB ignores unknown
  attributes on unmarshal, so a new field is backward-safe in both directions — but only *set* it on the
  new path so old-header requests are byte-identical to before.
- **Exactly one header on the wire** (client `if/else`). This is what makes a successful upload a proof
  the chosen path works, and avoids the header-size cost of sending both.
- **Fail loud on the path you control.** New header present but malformed → reject, never downgrade.
- **Reject if neither header is present** (unchanged behavior).
- **Never force an upgrade.** Support the old header/endpoint indefinitely; only retire it once telemetry
  shows old peers are gone. Gate a hard version requirement only on features that genuinely cannot degrade.
- **Deploy is per-side and independent** — that's the whole point; verify all four cells (below).

## Concrete instance (implemented, commit `1fef5dd9`)

Files (3 modules): webapp — the AuthTest controller (always return version) and the v1 upload-file
controller (new-then-old read); submit program — `SubmitUploadMain` (capture + thread the server version;
also a self-assignment exit-code bug fix) and `AuthTest_Perform_ConnectToServer...` (capture); client
connector — `Limelight_SubmitImport_Version_Constants` (`15 → 16` + the floor/format constants),
`SubmitImport_UploadFile_Request_Common` (format-version attr), `CallSubmitImportWebservice` (the
version-gated header), `Call_SubmitImport_UploadFile_Service_Parameters` (carry the version to the connector).

**Verified live end-to-end (real submit, small Limelight XML + one scan file), all four cells:**

| run | server returned | header used | result |
|---|---|---|---|
| v16 program → **new** webapp | `16` | **new Base64** | Submission Successful |
| v16 program → **old** webapp | `null` | **old XML** (fallback) | Submission Successful |
| **old** program → **new** webapp | (n/a) | old XML → server falls back | Submission Successful |
| old program → old webapp | — | old XML | baseline |

A temporary diagnostic (`Server Submit Import Program version: 16` / `... : null`) made the handshake and
header choice directly observable during verification; it was then commented out as `DEBUGGING ONLY` so
end users don't see it (the load-bearing capture stays active).

## Generic recipe

1. **Pick a version integer** the two sides already exchange (or add one) and a **floor** constant for the
   new format (a dedicated constant, not "current", so it stays fixed as current climbs).
2. **Handshake:** have the server return its version on the pre-flight response **unconditionally**; have
   the client capture it. Define what "old" means: 404, `null`, or `< floor`.
3. **Client:** at send time, pick **one** header by `serverVersion >= floor` (else the old header). Put a
   format-version inside the new payload.
4. **Server:** read **new-then-old**; reject-if-neither; **reject a malformed new header** (no fallback).
5. **Keep header-name constants in sync** across client and server.
6. **Verify all four old/new × client/server cells** on real data; a temporary "which header" log makes
   the path observable, then remove/comment it.
