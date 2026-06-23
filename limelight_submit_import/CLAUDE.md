# limelight_submit_import

The client-side CLI (runnable jar) that submits/queues an import to a running
Limelight webapp over its web service. This is the tool an end user or pipeline
runs to upload search results; the webapp records the request and the
`limelight_run_importer` daemon later runs it. For the repo-wide module map, see
the root `CLAUDE.md`.

Small module (~20 files), not a Spring app.

## Building

```
ant -f ant__create_runnable_jar_submit_import.xml
```

## How it works

`main` is `program/SubmitImportProgram` → `main/SubmitUploadMain`. The actual
HTTP/web-service calls to the webapp go through the
`limelight_submit_import_client_connector` library (shared with the webapp), not
hand-rolled here.

- `get_submitter_key/` — obtains the submitter key used to authenticate the
  upload.
- `auth_test/` — `AuthTest_Perform_ConnectToServer*` verify connectivity and auth
  to the server without doing a full import (useful for diagnosing setup).
- `config/`, `constants/`, `objects/`, `exceptions/` — config handling, CLI
  constants, request objects.

## Notes

- The server URL and credentials/submitter key are runtime inputs — see `config/`
  and `get_submitter_key/`.
- No JUnit suite under `src/test`; validate against a running webapp (the
  `auth_test/` path is the lightweight connectivity check).
