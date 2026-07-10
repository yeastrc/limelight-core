# Critical Assessment — FlashLFQ Quant Integration for Limelight

**Date:** 2026-07-06
**Author:** Claude (independent code review)
**Scope reviewed:**

- **limelight-core** working tree — 6 modified files + 10 new (git-untracked) files
  (`/data/code_checkouts/Github/Limelight_Primary_Development/GIT_CLONE/limelight-core`)
- **limelight-flashlfq-service** — new Python microservice, entire tree (repo has **no commits yet**)
  (`/data/code_checkouts/Github/limelight-flashlfq-service/GIT_CLONE/limelight-flashlfq-service`)

**Goal being pursued:** add MS1 label-free quant to Limelight, computed by FlashLFQ, driven from
the PSMs already stored in Limelight. The central complication is that Limelight PSMs carry **open
modifications that may have zero, one, or more than one location**, which does not map cleanly onto
FlashLFQ's normal expectation of fully localized modifications.

---

## 1. Executive summary / verdict

The design is **sound in its overall shape** and the hardest conceptual problem — how to make
FlashLFQ quantify Limelight peptidoforms (including open mods) and round-trip the results back to
Limelight identifiers — has a **clever, working answer**: the service treats FlashLFQ's "Full
Sequence" as an *opaque grouping key* carrying an embedded `rpid<id>_` prefix plus mass-annotated
tokens, and takes the neutral mass from the dedicated mass column rather than asking FlashLFQ to
re-parse chemistry. A real sample run completed successfully and produced realistic intensities.

However, the work is **early-stage and not production-ready**, and there are several **correctness,
security, and operational defects** that must be resolved before this is trusted:

- **Two clearly separated tiers on the webapp side.** The *run-request* path (browser → Java
  controller → Python service) is structurally real and reasonably engineered. The *display* path
  (reading quant back into the peptide/protein tables) is **100% throwaway prototype** — it reads a
  single static served TSV with no DB, no auth, and no per-search scoping, and every file says
  "Delete this once the real DB-backed ingest lands."
- **High-impact correctness bug in the service:** the user-selected boolean FlashLFQ parameters
  (`--mbr`, `--nor`, `--int`, `--chg`, `--usepepq`, `--rmc`, `--sha`) are **silently ignored** — the
  sample run requested them all `false` and FlashLFQ ran them all at its default `true`. The
  "disable MBR for a single scan file" safeguard therefore **did not take effect**.
- **Open-mod fidelity loss:** rounding the mass token to 5 decimals collapses near-isobaric
  open-search variants to the same Full Sequence key with different masses, and FlashLFQ **silently
  rejects ~3.3% of written PSMs** in the sample ("a peptide with the same modified sequence but a
  different monoisotopic mass has already been added").
- **Operational gaps in the service:** no HTTP or subprocess timeouts, no concurrency limit, no job
  registry / status endpoint, and **no cleanup** of run directories (618 MB mzML per scan file →
  unbounded disk growth).
- **Authorization is likely too weak** on the run-trigger endpoint (read-level access can launch an
  expensive compute job), and the service itself has **no auth** (relies entirely on Docker network
  isolation).
- **Repo hygiene risk:** the flashlfq-service repo has no commits, and its `.gitignore` does **not**
  match the actual 4.4 GB `flashlfq_data/` output tree — one `git add .` from entering history.

None of these are architectural dead-ends; they are the expected rough edges of a first integration
pass, plus a couple of genuine bugs. The prototype clearly served its purpose (proving the
round-trip). The gap between "prototype that runs" and "feature that ships" is still substantial.

---

## 2. Intended architecture (as built)

```
  Peptide/Protein page  ──"Add Quant" form──►  Java REST controller
  (browser, React/TSX)                          FLASHLFQ_RUN__REQUEST_CREATION
        │                                              │
        │  {projectSearchIds,                          │ derives reported peptides + PSMs
        │   searchDataLookupParamsRoot,                │ SERVER-SIDE from cutoffs only;
        │   flashlfq_parameters}                       │ builds per-PSM position→mass mod map;
        │                                              │ keys per scan file on Spectr API key
        ▼                                              ▼
  (display path — PROTOTYPE)              Python FlashLFQ service  POST /requestNewFlashLFQRun
  fetch static served                            │  (returns request_id immediately; runs in bg thread)
  QuantifiedPeaks.tsv  ◄───────────────┐         │  1. spectr: generate + download mzML per scan file
  parse rpid<id>_ prefix,              │         │  2. write FlashLFQ generic identifications TSV
  aggregate by reportedPeptideId       │         │  3. run FlashLFQ CLI (dotnet CMD.dll)
        │                              │         │  4. write outputs to finaldir/<request_id>/
        ▼                              └─────────┘        (QuantifiedPeaks/Peptides/Proteins.tsv)
  "Quant" column injected into
  peptide/protein tables
```

The key design decision — **derive the peptide/PSM set server-side from the page's PSM/peptide
cutoffs, not from the client** — is good: quant is defined purely by the top-of-page filtering and
is reproducible from the echoed `searchDataLookupParamsRoot`. The Full-Sequence-as-opaque-key idea
is the linchpin that makes the whole round-trip work without FlashLFQ understanding Limelight
chemistry.

---

## 3. The open-modification complication (zero / one / more locations)

This is the crux of the effort, so it gets its own section. The handling spans three files, and it
is worth tracing end-to-end.

### 3a. Send side — Java controller builds a `position → mass` map (SUMMED)

`FlashLFQ_Run__Request_Creation_RestWebserviceController.java` builds, per PSM, a
`Map<String,Double> modifications` keyed by position string, merging four mod sources:

- PSM-level dynamic mods (lines 737–766) **or** reported-peptide-level variable mods (768–800),
- open modifications (802–844),
- static mods applied by scanning the sequence for matching residues (846–872).

Positions are encoded as `"n"` / `"c"` (termini), a **1-based numeric position**, or `"u"`
(unlocalized). This directly models the zero/one/more cases for open mods (lines 826–834):

- **Zero locations** → `"u"` (unlocalized).
- **One location** → numeric position (or `"n"`/`"c"`).
- **More than one location** → multiple distinct numeric keys.

**Critical property: masses at the same position are SUMMED** (e.g. lines 764, 795, 841, 866). This
is chemically correct for computing a neutral mass, but it means that once a localized open mod
lands on a residue, it is **indistinguishable** from a static/variable/dynamic mod at that same
residue. That single fact drives the entire limitation on the receive side (3c).

> **Firsthand-noted potential bug (worth verifying).** In the **PSM-level dynamic mod** branch the
> position is taken as `String.valueOf( psmDynamicModificationDTO.getPosition() )` (line 758) with
> **no** N-/C-terminal handling — unlike the reported-peptide-level variable branch (lines 785–789)
> and the open-mod branch (826–829), both of which explicitly map terminal mods to `"n"`/`"c"`. If a
> PSM-level dynamic mod can be terminal, it would be written with a numeric (possibly `0`) position
> instead of `"n"`/`"c"`, producing an inconsistent Full Sequence vs. the variable-mod path. Confirm
> what `getPosition()` returns for terminal dynamic mods.

Also note the "-(N)" / more-than-one **unlocalized** case: because the map is keyed by `"u"`,
multiple unlocalized open mods on one PSM are **summed into a single `"u"` mass** — count is lost,
though total mass is preserved. This is a reasonable approximation but should be a documented,
conscious choice.

### 3b. Service side — mass and Full Sequence (`peptide_mass.py`)

- `peptide_monoisotopic_mass()` = water + Σ residue masses + **Σ of all mod masses regardless of
  position** (lines 42–50). Correct as long as each mass appears once in the dict.
- `full_sequence_string()` renders `[+mass]` inline after each numeric position, plus `[n…]`/`[c…]`/
  `[u…]` groups. `full_sequence_string_with_reported_peptide_id()` prepends `rpid<id>_`. Mass tokens
  are formatted to **5 decimal places** (`_mass_token`, line 113).

**Two real fidelity issues here:**

1. **5-dp rounding collapses near-isobaric open-mod variants** (see 4c below — this causes FlashLFQ
   to drop PSMs).
2. **A numeric mod position beyond the sequence length (or `0`) is dropped from the Full Sequence
   string but still added to the mass** (render loop only emits positions `1..len`, lines 81–84).
   Two genuinely different peptidoforms could then collapse to the same grouping key. Add a guard /
   validation.

### 3c. Receive side — display prototype (`quant_PrototypeData.ts`)

The parser extracts `rpid<id>_` from each `|`-joined "Full Sequence" entry, so a peak maps to a
**set** of reportedPeptideIds (shared/near-isobaric peptides). Aggregation:

- `get_QuantForReportedPeptideIds()` (lines 156–169) — union of **all** peaks for the reported
  peptide (**all** open-mod mass forms, **all** charge states), each peak counted once via a Set of
  peak indices. **This is what the peptide-table "Quant" column uses.**
- `get_QuantForDisplayForm()` (lines 137–150) — keyed by `"<rpid>|<unlocalizedOpenModRounded>"`, so
  it resolves **unlocalized** open-mod display forms and no-mod forms per-form.

**The load-bearing limitation:** only **unlocalized** open mods survive as separable `[u±mass]`
tokens (regex `\[u([+-][0-9.]+)\]`, line 29). **Localized** open mods were summed into the residue's
`[+mass]` on the send side (3a) and are therefore **not recoverable** — the display flags them
rather than computing a per-form value. The tooltip is honest about this: *"This is the whole
reported peptide (all open-mod forms & charges), not just the displayed form."*

**Charge state is never an aggregation key** — it is captured only for the tooltip; intensities are
always summed across charges (correct FlashLFQ behavior, but note it is not a discriminator).

**Cross-row double-counting caveat:** a peak shared between two *different* displayed rows (different
reportedPeptideIds) is counted once *within* each row but added to *both* rows. Per-row values are
fine; **any column total would exceed the true total intensity.** This must be called out if the
column ever graduates to a real feature.

### 3d. Verdict on the open-mod approach

The approach is **as good as the file format permits** and correctly enumerates zero/one/more.
The honest, documented degradation (localized open mods → whole-peptide aggregation only; unlocalized
→ per-form) is the right call for a prototype. The unresolved design questions for production are:

1. How should the **UI represent** quant for a reported peptide that has multiple open-mod forms
   (whole-peptide total vs. per-form)? Today it is whole-peptide only.
2. Should **sub-mDa unlocalized deltas be quantized** before writing the TSV, to stop FlashLFQ
   rejecting them (4c)?
3. How is a **single PSM with one open mod at multiple candidate sites** ("more locations" =
   ambiguous localization) encoded by the webapp? The service's flat `position→mass` dict **cannot
   model "one mass at one-of-many sites"** — encoding it as two numeric entries would double-count
   the mass. This case is not exercised in the sample data; it needs an explicit contract.

---

## 4. Correctness bugs (ranked)

### 4a. **[High] Boolean FlashLFQ parameters are silently ignored** (`flashlfq_command.py`)
The sample run requested `--int false --chg false --sha false --usepepq false --mbr false --nor
false --rmc false`, but `flashlfq_output/FlashLfqSettings.toml` records `Normalize/Integrate/
MatchBetweenRuns/… = true`, and stdout shows MBR + normalization actually executed. FlashLFQ's
`CMD.dll` evidently treats **flag presence as `true`** and ignores the `false` argument. The service
renders booleans as `--flag false` (lines ~90–91). Net effect:
- The "**MBR forced off for a single scan file**" safeguard (`request_processor`/`flashlfq_command`)
  **does not work** — MBR ran anyway.
- Every user boolean toggle in the "Add Quant" form is **non-functional**.
**Fix:** emit boolean flags only when `true` (or verify each flag's exact CLI semantics against the
FlashLFQ version in the pinned image), and add an integration assertion comparing requested vs.
`FlashLfqSettings.toml`.

### 4b. **[Med-High] 404 reported to the user as "could not connect"** (`flashLFQ_Run_RequestCreation_InitiateAndShowResult.ts`, ~lines 64–73)
`_showResult` checks `failedToConnectToWebservice` before `httpStatusCode_Not_200_OK`, but the Java
controller sets **both** on a 404 (lines 997–999). Users see a misleading connectivity error instead
of "HTTP 404."

### 4c. **[Med-High] ~3.3% of PSMs silently dropped by FlashLFQ on open-mod mass collisions**
5-dp rounding of the Full Sequence mass token collapses near-isobaric open-search variants to the
same modified-sequence string with different mono masses; FlashLFQ then rejects the later one:
*"A peptide with the same modified sequence but a different monoisotopic mass has already been
added."* In the sample: 52,675 rows written → FlashLFQ read 50,935 (~1,740 dropped). This is a
fidelity issue specific to the open-modification goal and is **not surfaced anywhere** to the user.

### 4d. **[Med] Backend does not enforce the single-search invariant the UI relies on**
`TODO #1` (controller lines 121–126, 354–359) states quant must move to **per-search** runs
(cross-search MBR/RT-alignment/normalization is invalid), and the "same scan file in multiple
searches" guard was **removed**. Today the controller still builds **one joint run across all
searches**. The only thing preventing the known-invalid multi-search run is a **client-side button
gate** (`quant_ViewAddQuant_Button_Component.tsx`, hides for `projectSearchIdCount > 1`) — trivially
bypassed by calling the endpoint directly.

### 4e. **[Med] Empty "Scan Retention Time" cells** (`request_processor.py` / TSV writer)
A PSM whose `scan_number` isn't in the spectr metadata map yields `rt_minutes = None` → blank RT
cell. FlashLFQ's generic reader generally expects numeric RT; blanks may drop/mis-handle those PSMs.

### 4f. **[Low] Misleading "top 200 shown"** (`quant_PrototypeDisplay_QuantifiedPeaks_Component.tsx`)
The mode line always says "top 200 shown" even when fewer rows exist; localized-mod rows sort among
zero-intensity rows rather than strictly last. Cosmetic, prototype-only.

---

## 5. Security

- **[High] Run-trigger endpoint authorized at read level.** The Java controller uses
  `validatePublicAccessCodeReadAllowed` (line 302), modeled on the blib **download** controller. But
  this endpoint **launches a heavyweight FlashLFQ compute job**, not a read. Any read-level user
  (including public-access-code holders on public projects) can initiate expensive runs — a
  resource-abuse / DoS vector. Consider a stronger access level and/or rate limiting.
- **[High] The Python service has no authentication.** By design it relies solely on Docker network
  isolation (no published port). There is no token, mTLS, allowlist, or `MAX_CONTENT_LENGTH`. If the
  compose network is ever misconfigured to publish the port, the service is fully open to unbounded
  downloads and process spawning. `docker-compose.standalone.yml` does publish 3434 for dev.
- **[Med] Prototype TSV endpoint is unauthenticated and unscoped.** `/flashlfq_test_files/
  QuantifiedPeaks.tsv` is served with no auth and no project scoping; the *same* file is shown
  regardless of which search is open. Acceptable only because it is explicitly throwaway.
- **[Low, handled] No command injection.** `subprocess.run` is called with an **argv list, no
  `shell=True`**; the executable comes from a trusted env var via `shlex.split`; all user parameter
  values are coerced to `int`/`float`/`bool`; file paths are service-generated. This part is safe.
- **[Low] Spectral-storage API keys written to disk in cleartext** in every run's
  `params_manifest.json`. Combined with no run-dir cleanup, these persist indefinitely.
- **[Low] No parameter range validation** anywhere (client, Java, or service). Nonsense values
  (negative `ppm`, etc.) flow to the CLI. `quant_FlashLFQ_Parameters.ts` carries no min/max metadata.

---

## 6. Operational / robustness (Python service)

- **[High] No cleanup / retention.** `finaldir/<request_id>/` grows without bound (618 MB mzML per
  scan file in the sample). The `workdir` / `clean_workdir` config is **dead** (referenced only in
  `config.py`; nothing reads it). This will fill the disk. Also no download **dedup/caching** — the
  same large mzML is re-fetched per request.
- **[High] No timeouts.** No `timeout=` on **any** `requests` call in `spectr_client.py` (the only
  "timeout" is the polling *deadline*, which a hung socket defeats), and no `timeout` on the FlashLFQ
  `subprocess.run`. A stalled dependency hangs the worker thread forever.
- **[High] No job registry / status endpoint.** The caller gets a `request_id` but **cannot poll
  status or fetch results**; `_safe_process` swallows all exceptions into a log line, so failures are
  invisible to the webapp. Fire-and-forget with no feedback channel — this blocks the whole
  display-side feature, not just error reporting.
- **[Med] Unbounded concurrency.** One daemon thread per POST, no queue/semaphore. N concurrent
  requests = N × (600 MB download + `dotnet` process). Daemon threads are also killed on
  `restart: always`, leaving partial run dirs with no failure marker.
- **[Med] Truncated-download blind spot.** Content-Length verification is skipped when the header is
  absent (chunked transfer); a silently truncated mzML would be accepted. (The atomic
  `.part`→`os.replace` download logic is otherwise the strongest code in the service.)
- **[Low] Dev server in production.** `app.run` (Werkzeug dev server), not gunicorn/uwsgi.

---

## 7. Documentation / config / repo hygiene (flashlfq-service)

- **[High] `.gitignore` does not match the real output tree.** The repo has **no commits**;
  `.gitignore` ignores root-anchored `/finaldir/` and `/workdir/`, but outputs live under
  `flashlfq_data/finaldir/` and `flashlfq_data/workdir/` (`git check-ignore` confirms: not ignored).
  A naive first `git add .` would commit **4.4 GB** including a 618 MB mzML. Fix **before the first
  commit** — ignore `flashlfq_data/` (or `**/finaldir/`, `**/workdir/`) or move the bind-mount
  outside the repo. Also present: Eclipse `.metadata/` and stray `__pycache__/mzml_writer.cpython-*.pyc`.
- **[Med] Docs describe a superseded design.** README (`Status: Scaffold`), `MZML_FLASHLFQ_
  REQUIRED_FIELDS.md`, and the Dockerfile comment describe **client-side mzML writing via `psims`**
  (numpy/lxml) and an `app/mzml_writer.py` — but the current code has **spectr generate the mzML**
  server-side, `mzml_writer.py` does not exist (only a leftover `.pyc`), and `requirements.txt`
  (Flask + requests only) matches the **current** code, not the docs.
  - *Reconciliation note:* Agent C flagged `psims` as a "missing dependency"; the more accurate read
    is that `requirements.txt` is correct for the current implementation and the **docs are stale**
    from a pre-refactor design. Fix the docs, not requirements. Verify no code path still imports
    `psims`.
- **[Med] `FLASHLFQ_EXECUTABLE` default mismatch.** `config.py` and `.env-sample` default to
  `dotnet /opt/flashlfq/FlashLFQ.dll`, but the image and the actual run use `dotnet /flashlfq/CMD.dll`.
  Works only because the Dockerfile overrides it; a run without that env silently fails to find
  FlashLFQ.
- **[Low] Unpinned base image** `smithchemwisc/flashlfq:latest` (Dockerfile TODO acknowledges it) —
  non-reproducible builds; combined with 4a this matters because CLI flag semantics can shift.
- **[Low] Dead config leftovers:** `SPECTR_BATCH_SIZE`, `APP_WORKDIR`, `APP_CLEAN_WORKDIR` unused;
  `APP_CLEAN_WORKDIR: yes` in compose isn't even one of the documented `always|never|onsuccess`
  values. No LICENSE / CHANGELOG.
- **Positives:** `REQUEST_SCHEMA.md` fully and clearly specifies the request/response and
  parameter→flag mapping; `MZML_FLASHLFQ_REQUIRED_FIELDS.md` is a genuinely useful capture of the
  mzLib NRE gotchas.

---

## 8. limelight-core changes — prototype vs. production

**Production-intended (structurally real):**
- `FlashLFQ_Run__Request_Creation_RestWebserviceController.java` — thorough request validation, real
  auth (level aside), real searchers/DAOs, typed request/response, degrades HTTP failures to typed
  result flags. **Solid.** Nits: no HTTP connect/read timeouts (lines 940–1057); `disconnect()`
  commented out (1055); stale dead comment `protein_accessions … "not yet populated"` (1212–1213)
  though it *is* populated (720); O(n²) `proteinAccessions.contains` (664) and per-residue
  `substring` in static-mod loop (854–857) — fine at expected scale.
- `flashLFQ_Run_RequestCreation_WebserviceCall.ts`, the parameters model/form, the overlay, button,
  and container — real, but with acknowledged **first-try UI** (`window.alert` for progress and
  results; no button-disable, so a user can dismiss the alert and fire duplicate runs).
- Constants wiring: `ConfigSystemsKeysSharedConstants.java` (two new config keys) and
  `AA_RestWSControllerPaths_Constants.java` (new REST path) — clean.

**Throwaway prototype (explicitly labeled "THROWAWAY PROTOTYPE", "Delete this module…"):**
- `quant_PrototypeData.ts` and `quant_PrototypeDisplay_QuantifiedPeaks_Component.tsx` — fetch a
  single static served TSV, no DB, no auth, no scoping.
- The **Quant column injected into the peptide and protein tables** — the diffs in
  `peptidePage_Display_MainContent_Component.tsx`,
  `proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component.tsx`, and
  `..._Create_TableData.tsx` are all prototype-tagged. Note the mildly awkward mechanism: because the
  quant singleton loads async and must bypass `shouldComponentUpdate` gating, the component both
  takes a prop **and** self-subscribes via `quant_PrototypeData_RegisterOnLoaded` and reads
  `quant_PrototypeData_GetIfLoaded()` directly (Component lines ~99–129, Create_TableData reads the
  singleton). This dual path is a prototype smell that should not survive into the DB-backed version.
- One unrelated whitespace-only cleanup in `searchDetailsAndFilterBlock_MainPage_Root.tsx`.

**Minor frontend defects:** duplicate error reporting on TSV load failure (both the module-level
`_loadPromise.catch` and the component's `componentDidMount().catch` call `reportWebErrorToServer`);
the manually-maintained REST path string mirrors a Java constant by comment only (brittle, but house
style).

---

## 9. What's genuinely good

- The **Full-Sequence-as-opaque-round-trip-key** design (embedded `rpid<id>_`, mass from the mass
  column) is elegant and correctly avoids asking FlashLFQ to understand Limelight chemistry.
- **Server-side derivation of peptides/PSMs from cutoffs only** — reproducible, well-reasoned, and
  documented as an intentional decision.
- The **Java controller's validation and error handling** are thorough and consistent.
- The service's **atomic `.part`→`os.replace` download** with cleanup-on-failure, the deliberate
  TSV line-terminator handling, dropping of non-standard residues with an auditable manifest, and
  the explicit RT-unit knob are all careful touches.
- The team has been **honest in-code** about what is prototype and what is a TODO — the "THROWAWAY
  PROTOTYPE" tags and `TODO #1 (boss decision 2026-06-29)` make the intended trajectory clear.
- A real end-to-end run **succeeded** and produced realistic quant, proving the pipeline works.

---

## 10. Prioritized recommendations

**Must-fix before trusting any results:**
1. Fix boolean CLI flag emission so requested parameters (esp. MBR off for single file) actually take
   effect; add a requested-vs-`FlashLfqSettings.toml` assertion (4a).
2. Add `timeout=` to all spectr HTTP calls and to the FlashLFQ subprocess (§6).
3. Fix the flashlfq-service `.gitignore` to exclude `flashlfq_data/` **before the first commit** (§7).
4. Decide and enforce the open-mod mass-collision policy (quantize sub-mDa unlocalized deltas or
   otherwise stop FlashLFQ silently dropping ~3.3% of PSMs) and surface the drop count (4c).

**Needed before shipping the feature:**
5. Add run-dir retention/cleanup; wire up or delete the dead `workdir`/`clean_workdir` config (§6).
6. Add a job registry + status/result endpoint so the webapp learns success/failure (§6).
7. Bound service concurrency and request body size (§6).
8. Re-evaluate authorization on the run-trigger endpoint (read-level is likely too weak); add rate
   limiting (§5).
9. Move quant to per-search runs and enforce it **server-side**, not just via the UI button (4d).
10. Define the contract for a single PSM with one open mod at multiple candidate localizations
    (the flat `position→mass` dict cannot represent it without double-counting mass) (§3d).

**Cleanup / correctness follow-ups:**
11. Verify/fix PSM-level dynamic-mod terminal position handling (§3a firsthand note).
12. Fix the 404-as-connectivity-error precedence (4b); handle empty RT (4e); guard mod positions
    beyond sequence length (3b); reconcile stale docs/config/defaults (§7); remove the dead
    `protein_accessions` comment and add HTTP timeouts + `disconnect()` in the Java sender (§8).
13. Replace `window.alert` UX and disable the Run button while a request is in flight (§8).
14. Plan the real DB-backed ingest that replaces the entire prototype display path, and design the
    UI answer for whole-peptide vs. per-open-mod-form quant, plus the shared-peak double-counting
    caveat for any column totals (§3c, §3d).

---

## 11. Handling open-modification masses in FlashLFQ (deep dive + recommendation)

*Added 2026-07-06 after analyzing two real runs (~52k PSMs, open search). Directed at whoever
implements the service-side fix.*

### 11a. How FlashLFQ actually treats the input (grounded in the wiki + real output)

- FlashLFQ **does not parse** the "Full Sequence" — it is an *opaque peptidoform grouping key*
  ("can contain any characters… must be consistent between the same peptidoform"). This is exactly
  what makes the `rpid<id>_…` round-trip legitimate.
- The **"Peptide Monoisotopic Mass" column drives quantification**: FlashLFQ indexes theoretical m/z
  (mass × charge states) and extracts MS1 peaks within a ppm tolerance (defaults: `--ppm` 10 peak,
  `--iso` 5 isotope, `--nis` 2). It integrates one XIC per peak.
- **Load-bearing invariant: one Full Sequence string ⇒ exactly one monoisotopic mass.** A second row
  with the same string but a different mass is **rejected** ("same modified sequence but a different
  monoisotopic mass has already been added").
- Outputs: `QuantifiedPeaks` (one row per detected MS1 feature; the `Full Sequence` column holds the
  `|`-joined list of peptidoforms mapped to that peak; `PSMs/Base Sequences/Full Sequences Mapped`
  are **count** columns), `QuantifiedPeptides` (one row per Full Sequence), `QuantifiedProteins`.
- FlashLFQ was designed for a **bounded set of named fixed/variable mods**, not open/unrestricted
  search where the delta mass is effectively continuous.

### 11b. What the real runs show (measured; runs `41d5a59c…` and `fdee0d31…`, identical inputs)

| Metric | Value |
|---|---|
| PSMs written to identifications TSV | 52,675 |
| distinct **Base Sequences** | 1,669 |
| distinct **Full Sequences** (peptidoforms) | **39,188** (~23×) |
| distinct monoisotopic masses | 32,169 |
| **PSMs rejected** (string/mass collision) | **1,740 (3.3%)** |
| `QuantifiedPeaks` rows (with signal) | 10,050 (7,967) |
| **avg peptidoforms merged per peak / max** | **4.0 / 367** |
| peaks merging >1 peptidoform | 4,053 (40%) |
| **peaks spanning >1 base sequence** (shared) | **1,938 (19%)** |
| `QuantifiedPeptides` rows (with signal) | 39,188 (only 3,810) |
| `QuantifiedProteins` rows | 343 |

**Key insight:** FlashLFQ's `--ppm` extraction window **already collapses near-isobaric mass forms
at the peak level** (39,188 peptidoforms → 10,050 peaks). Example: one peak absorbed 35 distinct
`rpid255638_FPGQLNADLR[u±0.00x]` forms (52 PSMs); another absorbed 121 forms across 2 base sequences
(222 PSMs). So the open-mod explosion does **not** corrupt the peak-level quant that the prototype
reads — it only causes (a) the 1,740 read-time rejections and (b) a useless 39k-row peptide table.

### 11c. Root cause of the rejections (this is a BUG, not physics)

The service builds the Full Sequence mass token **rounded to 5 dp** (`peptide_mass._mass_token`) while
the "Peptide Monoisotopic Mass" column is **full precision**. Two PSMs whose open-mod masses round to
the same 5-dp token but differ deeper produce an *identical string with different mass* → the second
is rejected. Proven by the collision set (e.g. `…LLYR[u+0.00199]` appearing with two neutral masses).

### 11d. Recommendation — bin open-mod masses by `--ppm`

**Yes: use the webapp "PPM tolerance" value (FlashLFQ `--ppm`) as the mass-merge radius.** Rationale:
ppm on the *neutral mass* is charge-invariant (`Δmass/mass = Δ(m/z)/(m/z)`), and two forms within
`--ppm` extract the *same* peak anyway — so merging them loses nothing.

Concrete change (in `peptide_mass.py` / `request_processor.py`, no FlashLFQ fork):
1. **Within one `reported_peptide_id`**, cluster its PSMs whose neutral masses fall within `--ppm`
   (greedy clustering on sorted mass). Only merge within the same rpid — the `[u±0.00x]` spread is
   mass-measurement jitter of the *same* open mod; a `+29.99` form and a `+0.00` form are far outside
   `--ppm` and must stay separate.
2. Emit **one identification per cluster**: one representative mass (median or intensity-weighted)
   used for **both** the mass column and the Full Sequence token, so string↔mass is strictly 1:1.
3. Result: **zero rejections**, and the peptidoform table shrinks to something meaningful.

Minimal-effort alternative (fixes rejections only, not the table bloat): derive both the token and the
mass column from the same rounded value.

### 11e. Other open-mod fixes that still matter (peaks are fine, these aren't)

- **Shared-peak double-counting:** 19% of peaks span >1 base sequence. The prototype's per-rpid union
  sums a shared peak's full intensity into *every* rpid row → column totals overcount. Decide a
  policy (attribute-once, split, or flag) — the tooltip already surfaces the shared count.
- **MBR / normalization:** turn OFF for open-search / single-file runs, and fix the boolean-flag bug
  (§4a) so "off" actually takes effect — MBR matching across a near-continuous mass space mis-assigns.
- The prototype reading `QuantifiedPeaks` and grouping by `rpid` is the **right** grain; keep it.

### 11f. Where run outputs live (for verifying future runs)

Container-internal path is always `/data/app/finaldir/<request_id>/`, mapped by compose:
- **Production (`docker-compose.yml`):** named Docker volume `flashlfq_finaldir` → `/data/app/finaldir`.
- **Standalone/dev (`docker-compose.standalone.yml`):** host bind-mount, default
  `/spinning-disk-02/run-space--spinning-disk-02/Limelight/flashlfq-service-data/finaldir/<request_id>/`
  (override `FLASHLFQ_FINALDIR`). Outputs now live **outside** the repo (resolves item 4 / §7).
- `.env-sample` still shows the stale `APP_FINALDIR=./finaldir`; compose overrides it.

---

## 12. Revalidation — 2026-07-06 (later same day)

*Re-checked both repos after fixes landed. The flashlfq-service `app/` files (`flashlfq_command.py`,
`peptide_mass.py`, `request_models.py`, `request_processor.py`) and the Java controller were
substantially reworked; the frontend `.ts`/`.tsx`, `web_listener.py`, `spectr_client.py`, and
`config.py` were not. Status of every item below.*

### ✅ Fixed — correctly

- **Open-mod mass collision + `--ppm` binning (was §4c / §11d — the headline issue).** Implemented in
  the **controller**, `collapse_NearIsobaric_OpenMod_MassForms` (`…RestWebserviceController.java:966`):
  computes each PSM's neutral mass via the canonical `PeptideMassCalculator` (line 973); groups by
  **modification-position layout** so different localizations never merge (line 994); greedily
  clusters within the `--ppm` window anchored at the lightest member (lines 1007–1017), using the
  webapp PPM-tolerance value (lines 400–404, default 10); rewrites every cluster member to the
  representative's **mods and mass together** (lines 1021–1029) → strict 1:1 Full Sequence↔mass. This
  eliminates the ~1,740-PSM (3.3%) rejection. Non-standard-residue peptides dropped cleanly
  (`massComputed=false`, line 900). Mass is now computed once in the webapp and sent per PSM;
  `peptide_mass.py` no longer computes mass (removes the scattered-mass concern).
- **Boolean flag inversion (§4a).** `flashlfq_command.py` now emits a bare switch flag only when the
  option is intended on, never `--flag false` (lines 112–117). Bonus: `request_processor.
  _verify_flashlfq_settings` (line 162) reads the actual `FlashLfqSettings.toml` back and logs any
  mismatch — a durable regression guard.
- **Run-endpoint authorization (§5a).** Changed `validatePublicAccessCodeReadAllowed` →
  **`validateProjectOwnerAllowed`** (controller line 310). Compute-trigger now requires project owner.
- **.gitignore / repo hygiene (item 4 / §7).** `/flashlfq_data/` added; outputs moved outside the repo
  (standalone bind-mount to `/spinning-disk-02/...`).

### ⚠️ Partially addressed

- **MBR "off" (part of §4a).** `--mbr` is a switch defaulting **true** that **cannot be disabled via
  CLI in this build**. MBR still runs when unwanted; now transparently recorded (`honored=false` in
  the manifest, warning at `request_processor.py:114`). Low practical impact for single-file runs
  (MBR is a no-op with one sample); it is disclosure, not prevention. A real off would need a settings
  file or different invocation.
- **spectr robustness (§6).** A poll **deadline** exists (`spectr_generate_timeout_seconds`), but still
  **no per-call `timeout=`** on any `requests.get/post` (`spectr_client.py:92,109,134,166`) — a hung
  socket can still block within a poll iteration or the file download.

### ❌ Still open

- **`subprocess.run` has no `timeout`** (`request_processor.py:146`) — FlashLFQ can hang indefinitely.
- **No concurrency cap / no job-status endpoint** (`web_listener.py`) — one raw daemon thread per POST,
  no queue/semaphore, no `MAX_CONTENT_LENGTH`; only `/health` + `/requestNewFlashLFQRun`. The webapp
  still cannot learn success/failure (`_safe_process` swallows exceptions to log). Blocks the real
  display feature.
- **No run-dir cleanup/retention** — no `rmtree`; unbounded disk growth; `clean_workdir` still dead.
- **Service has no auth (§5b)** — unchanged (by-design docker-network isolation).
- **404 shown as "could not connect" (§4b)** — unchanged: controller sets `failedToConnectToWebservice
  =true` on 404 (line 1129), and `flashLFQ_Run_RequestCreation_InitiateAndShowResult.ts:64` checks that
  flag before the HTTP-status flag.
- **Joint vs per-search run (§4d)** — still one joint run; `TODO #1` remains; backend still doesn't
  enforce the single-search rule the UI button relies on.
- **Empty RT cells (§4e)** — unchanged (`request_processor.py:88-89`).
- **`FLASHLFQ_EXECUTABLE` default mismatch (§7)** — `config.py:54` / `.env-sample:27` still default to
  `/opt/flashlfq/FlashLFQ.dll` while the image uses `/flashlfq/CMD.dll`.
- **Stale docs (§7)** — `README.md` still describes `psims` mzML writing, `app/mzml_writer.py` (absent),
  and "Scaffold"; controller `protein_accessions` still carries the inaccurate "not yet populated"
  comment (line 1343).
- **Receive-side prototype (§3c, §8)** — cross-row shared-peak double-counting still present (explicitly
  throwaway; tooltip surfaces the shared count); `window.alert` UI unchanged.

### Bottom line

The two most important issues are resolved: the open-mod mass explosion/rejection now has a correct
`--ppm` clustering fix (strict 1:1 Full Sequence↔mass), and the boolean-flag inversion is fixed with a
runtime verifier; authorization was tightened. What remains is almost entirely **service operational
hardening** — HTTP/subprocess timeouts, a concurrency cap, a job-status/result endpoint, and run-dir
cleanup (the last two also gate the *production* display path) — plus minor UI/doc cleanups.

**Priority note (2026-07-06):** the current focus is **display to the user**, not this hardening. The
open items above are **deferred, not dropped** — they remain necessary for production (Track B in §13d),
but they do **not** block the current display work, which runs on the prototype path (see §13d Track A).

---

## 13. Assessment of the proposed next step — decomposed per-peptidoform quant identity

*Reviewing open item #3 in `limelight_features_docs/flashlfq_output_to_limelight_mapping.md`: replace
the `reportedPeptideId`-only embedding with a full decomposed key —
**peptide id (base sequence) + decomposed mods {type, position, mass} + charge**, with
`reportedPeptideId` kept as association metadata — so quant rolls up to the current 'Collate Peptides
Using:' grain and each open-mod display row shows its own form. Verdict: **applicable and correct — the
right next step — but scope it as a feature, not a tweak, and sequence it after the service job-status
endpoint.***

### 13a. The diagnosis is right

The worked example (`SIQFVDWCPTGFK-(13)` showing 4.22e11 = the whole reported peptide's 55 features
across ~70 mass forms and charges 2/3/4, not just the ~13 Da form) is exactly the display-grain-vs-
quant-grain gap flagged in §3c / §3d. Embedding only `reportedPeptideId` cannot split open-mod forms;
decomposing the identity fixes it and supersedes the rpid-only prototype.

### 13b. Correction: the modifications map is NOT decomposed today

The mapping doc says "the per-PSM `modifications` map we already build *is* the decomposed component
set." That is over-optimistic. The controller builds **position → summed mass**, folding dynamic +
variable + open + static **together** per position (`…RestWebserviceController.java` ~778, ~809, ~855,
~884 all `put(pos, mass + existing)`). So today it is **not** decomposed by type, and co-located mods
at one position are already summed and unrecoverable. Implementing item #3 therefore requires real work
on the send side:

- **Stop summing across mod types** — carry a structured, type-tagged component list
  `{type, position, mass}` instead of one summed mass per position. The neutral **mass stays the sum**
  (FlashLFQ needs total neutral mass); only the *identity / Full Sequence encoding* gains structure.
  This touches the same code the binning uses.
- **Bin-then-embed:** embed the **post-binning canonical** components (bin per `(rpid, layout)` as now,
  then embed the representative cluster's decomposed set). The two features are compatible but ordered.

### 13c. Caveats for the implementer

1. **Charge:** read it from the `QuantifiedPeaks` `Precursor Charge` column as a rollup axis — do **not**
   embed it in the Full Sequence. The peptide display grain does not split by charge, and whether
   per-charge features even exist depends on FlashLFQ's `IdSpecificChargeState` (`--chg`): with `--chg`
   off (intended default) FlashLFQ combines charges into one peak, so per-charge granularity may be
   unavailable. Treat charge as best-effort/optional in the key.
2. **Per-form resolves only to the display-rounded grain — and that is correct.** Sub-Da jitter is
   already binned to one feature; genuinely different forms (`-(13)` vs `-(16)`) are different peaks and
   separate cleanly; multiple peaks that round to the same `-(13)` correctly **sum** into that display
   row. Grouping received peaks by the decomposed key at the display-rounded grain gives the right
   answer.
3. **Position-collision limit:** two mod types that truly co-locate on one residue still cannot be
   separated (rare; document it).
4. **Cross-base-sequence shared peaks (open item #4) is not solved by this** — a peak with
   `Base Sequences Mapped > 1` still attributes one intensity to multiple peptides; needs the ambiguity
   flag + feature-dedup already called for.

### 13d. Sequencing — current priority is DISPLAY, not hardening (revised 2026-07-06)

**Decision (2026-07-06): the focus now is getting quant *displayed to the user*; the §12 operational
hardening (timeouts, concurrency cap, job-status endpoint, cleanup) is deferred — it will come, but it
does NOT block the display work.** This corrects the production-first sequencing in an earlier draft of
this section: per-display-form quant can be delivered end-to-end on the **existing prototype path**
without any of the hardening.

There are two tracks; do the display track now.

**Track A — prototype display path (do now; needs no hardening, no DB, no job-status endpoint).**
The prototype already renders quant by fetching the served `QuantifiedPeaks.tsv`
(`/flashlfq_test_files/QuantifiedPeaks.tsv`, copied to Tomcat manually after a run). Item #3's payoff —
each open-mod display row showing *its own* form instead of the whole reported peptide (the
`SIQFVDWCPTGFK-(13)` gap) — is achievable entirely on this path:

1. **Send side (webapp):** embed the decomposed, type-tagged mod components in the `Full Sequence`
   (§13b) — bin-then-embed. Low-risk; only enriches the identity string.
2. **Run + copy:** run FlashLFQ, copy `QuantifiedPeaks.tsv` to the served location (as today).
3. **Receive side (prototype, `quant_PrototypeData.ts` + display components):** parse the decomposed
   key back out and group features at the current **'Collate Peptides Using:'** grain, deduping by
   feature. No database, no service status endpoint, no cleanup involved.

This delivers the per-form display and lets it be validated against the chromatogram cross-check now.

**Track B — productionization (later, when hardening lands).** Replacing the served-TSV prototype with
the real **DB-backed `QuantifiedPeaks` ingest** (the schema in the mapping doc) *does* depend on the
service being able to report a run finished and hand back its output — i.e. the **job-status/result
endpoint (still ❌ open in §12)** plus run-dir cleanup. Order when that phase starts: (1) service
job-status/result endpoint + §12 hardening → (2) DB ingest at feature grain → (3) move the Track-A
rollup logic from the prototype onto the ingested features.

**Net:** the decomposed-identity work (send side + prototype receive-side rollup) is the right thing to
build now and is unblocked. The §12 hardening is real and still needed, but it is explicitly a
*later* phase gating Track B, not the current display work.

---

## 14. What you gain by doing §13 (the decomposed per-peptidoform identity)

Payoff of replacing the `reportedPeptideId`-only embedding with the decomposed key
(base peptide + mods `{type, position, mass}` + charge):

1. **Correct per-form numbers — the headline fix.** Each open-mod display row shows *its own* form's
   quant instead of the reported peptide's whole summed cloud. Concretely, `SIQFVDWCPTGFK-(13)` would
   show just the ~13 Da form rather than the **4.22e11** it shows today (= 55 features across ~70 mass
   forms and charges 2/3/4). Right now every form of that peptide — `-(0)`, `-(13)`, `-(16)`, … —
   displays the **same** wrong number. This is a correctness fix, not cosmetics.

2. **Quant follows the 'Collate Peptides Using:' control automatically.** Open mods off → the cloud
   collapses to one row and quant sums all forms; open mods on → each mass form is its own row with its
   own quant. Without §13, quant is frozen at one grain and is wrong at every other grain the user can
   select at runtime.

3. **One mechanism, every page.** Because features are keyed on peptidoform *components* and rolled up
   through the same grouping machinery that builds the peptide list, the peptide, protein, and mod pages
   all derive correctly from one feature store — no per-page special-casing.

4. **No fragile string reverse-engineering.** Exact round-trip from the keys we embed, instead of parsing
   Limelight structure back out of FlashLFQ's opaque, summed-across-types, rounded `[+mass]` tokens — a
   poor foundation (see "Why the peptide/modification axis is hard" in the mapping doc).

5. **Correct shared-feature accounting.** A peak shared by multiple forms/peptides is attributed to each
   but deduped on rollup — the same many-to-one accounting Limelight already does for PSM counts, so
   totals never double-count.

**What §13 does NOT fix (set expectations):** the residual chromatogram-vs-FlashLFQ gap from area-vs-apex
(`--int`) and fixed-window-vs-peak-detection (§ "How Limelight's … chromatogram compares"), and
cross-base-sequence shared peaks (open item #4) still need an ambiguity flag. After §13 the dominant
*grain* component of the worked-example discrepancy is gone; what remains is smaller and explainable.

**Bottom line:** §13 is what makes the displayed quant actually **correct at the grain the user is
looking at** — the difference between a Quant column that shows a plausible-but-wrong lump sum on every
open-mod row, and one that means what the row says.

---

## 15. Track A implementation decisions (recommendations, 2026-07-06)

Three implementation choices §13 left unpinned, plus the receive-side approach. Recommendations below
with reasoning; the first two **differ from the initial lean** and say why.

Current-state facts they rest on: mass is computed in Java (`PeptideMassCalculator`) and sent per PSM;
binning (`collapse_NearIsobaric_OpenMod_MassForms`) lives in the Java controller and rewrites each
cluster member to the representative's mods+mass; `peptide_mass.py` no longer computes mass, it only
builds the `Full Sequence` from the position→summed-mass map Java sends; the display string is built by
`reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches` (`[..]` variable, `{..}` static,
`(..)` open; variable/static 2 dp, open rounded to whole number).

### Decision 1 — build the type-tagged `Full Sequence` in **Java** (not the Python service)

**Recommend Java (flips the initial "Python formats it" lean).**
- Decisive factor is where encoder and decoder stay in lockstep: with Java-builds, the **encoder (Java
  controller) and decoder (frontend `quant_PrototypeData.ts`) both live in limelight-core** — one repo,
  one PR, shareable fixture. Python-builds splits the encoder into the *separate* service repo — the
  format contract straddles two repos, the classic drift source.
- Completes the mass-to-Java consolidation: the string is regenerated atomically from the same canonical
  components the binning just rewrote — no window where Python's formatter disagrees with Java's binning.
- "Wire format stays in the service" is preserved: the service still owns the TSV (columns, escaping,
  the `Full Sequence` column); Java supplies that cell's *value*, exactly as it already supplies the
  mass value. The Full Sequence content is Limelight *identity*, not FlashLFQ chemistry (FlashLFQ treats
  it as opaque).
- Side effect: `peptide_mass.py::full_sequence_string` retires → the service does zero chemistry, per the
  thin-renderer design. Port cost is ~40 trivial lines.

### Decision 2 — tag **open mods only** (not full v/o/s tagging)

**Recommend open-only (flips the initial "full tags" lean).**
- The actual blocker per-form must fix: **localized open mods currently render as `[+mass]`,
  indistinguishable from variable/static at the same position** (§3a). A distinct open-mod tag
  (localized *and* unlocalized) is exactly what removes that ambiguity — and that is all per-form needs.
- Variable/static need no tags: they are **constant within a `reportedPeptideId`**, and the receive side
  already has them from the rpid's display data; only the varying (open) part must ride in the feature.
- The "full tags enable mod-page / per-type rollup" rationale is **already reachable via rpid → its
  mods**, so full tagging expands the 2-language parser contract now for a capability you can already
  get. YAGNI: add v/s tags later if a concrete *rpid-independent* need appears.
- Safety: because **rpid is in the string**, two rpids differing only in a variable mod still get
  distinct strings + masses, so omitting v/s tags does not reintroduce the same-string/different-mass
  rejection.

### Decision 3 — show **per-form and rpid-total side by side** during validation

**Recommend side-by-side (agrees with the initial lean).**
- Safe rollout for a change that materially moves the displayed number (the 4.22e11 lump → per-form).
- Makes the invariant **Σ(per-form) ≈ rpid-total** (modulo shared-peak dedup) visible and testable.
- The rpid-total is independently meaningful (whole-peptide abundance) — both columns may be worth
  keeping permanently, not just as validation scaffolding.
- Only way to run the chromatogram cross-check (chromatogram measures one form; per-form should track
  it, rpid-total will not).

### Receive side — reconstruct the display key via the **display builder**, not token string-matching

**Emphatically yes** — feed the parsed components through
`reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches` (or its exact rounding/format), never
a parallel matcher.
- The display format (brackets, 2 dp / whole-number rounding, open-mod position-splitting) is complex
  and builder-owned; a re-implementation on the receive side **will** drift.
- Feeding components through the builder makes **quant-key == display-key by construction** and makes
  quant track the 'Collate Peptides Using:' control for free.
- Confirms Decision 2: the builder needs typed mod objects; assemble them from the rpid's variable/static
  (already typed in display data) + the feature's open component — so the Full Sequence only carries the
  open mod + rpid.
- **Caution:** reconcile the two roundings — send-side binning merges within *ppm* (finer than 1 Da),
  the builder buckets open mods to *whole numbers* (coarser). That is fine (coarser bucket sums finer
  features), but bucket on the receive side by running the builder's own rounding, never an independently
  coded rounding, or you get off-by-one bucket edges.

### §13c items — none change the above, with two riders

- **Charge:** from the `Precursor Charge` column, never embedded; orthogonal to Decisions 1/2. Sum over
  charges for the display form; per-charge resolvability depends on `--chg` but the display grain does
  not split by charge, so it is moot now.
- **Cross-base-sequence shared peaks (open item #4):** not solved here — the per-form Quant column should
  carry an **ambiguity indicator** for shared features (extend the existing shared-count tooltip) so a
  shared number is not shown as if clean.
- Per-form resolving only to the display-rounded grain, and the position-collision limit, are inherent
  and just need documenting.

**Summary: 1 → Java, 2 → open-only, 3 → side-by-side, receive side → via the display builder.**

---

## 16. Concurrence + refinements on the Track A response, and the filtering model (2026-07-06)

*Responding to `Claude_Response_TrackA_Decisions_20260706.md` (accepts all four §15 recommendations and
adds four riders). Concurrence: agree with the sign-off and all four additions — two sharpened below —
plus a Java-side crux, and a validation of how quant composes with Limelight's page filters (which
corrects a wrong caveat from an earlier draft of this section).*

### The four additions — validated

- **Add #1 — shared Java↔TS round-trip fixture:** agree, the single most important safety artifact.
  Proximity (both ends in limelight-core) is the opportunity; a golden
  `components → Full Sequence string → parsed components` fixture asserted by **both** the Java encoder
  test and the TS decoder test is the guarantee. Build it.
- **Add #2 — receive side needs the rpid's var/static; degrade when an rpid isn't on the page:** correct;
  state the scenario precisely. For the **primary displayed row**, its own rpid is by definition on the
  page, so builder-feeding never fails for the row itself. The degradation cases are (a) **enumerating a
  shared feature's *other* rpids** (for the ambiguity indicator) and (b) **features whose proteoform was
  filtered out of the current view**. Handle by skipping/flagging, and render the shared-with-others
  indicator without needing the other rpid's page data.
- **Add #3 — concrete token format:** good starting point. For the format-lock: (i) **self-delimiting
  parse** — `o?[+-][0-9.]+` scanned repeatedly (a mass never contains `o`/mid-number sign); keep the
  **token sort deterministic** so the string is byte-stable per form (FlashLFQ grouping needs identical
  strings); (ii) **pin terminal-open now** — `[no+m]`/`[co+m]`, don't leave an untagged terminal open;
  (iii) agree with **tagged-and-readable** over minimal open-only-in-string (keeps `QuantifiedPeaks`
  human-interpretable at near-zero cost; receive side ignores untagged tokens).
- **Add #4 — narrowing of the position-collision limit:** correct, and it narrows **further**. Because the
  receive side sources var/static **from the rpid, not the string**, var/static co-location summing in the
  string is never parsed. The **only** genuinely unseparable case is **two distinct open deltas summed on
  one residue in one PSM** (open+open) — vanishingly rare (open search assigns one delta per PSM).

### Java-side crux to make explicit before coding

"Stop summing the open mod into the position total" is the **real refactor**: today the controller folds
dynamic + variable + open + static into one summed mass per position; Track A needs the **open component
tracked separately per position** (var/static may stay summed — never parsed back). Neutral **mass stays
the full sum**; **binning still clusters on neutral mass** (within a (rpid, layout) the open delta is the
only varying part, so that is effectively what ppm-binning bins); canonicalize the **open component**,
since it becomes `[o+m]`.

### How quant composes with Limelight's page filters — VALIDATED

*(This replaces a wrong "orphan features / canned-run mismatch" caveat from an earlier draft — that was
reasoned from an incorrect model.)*

The actual model:
- **Annotation/cutoff filters (PSM + reported-peptide, top of page) DEFINE the FlashLFQ run** — the
  controller sends exactly those PSMs; quant is measured once over that set. Changing these requires a
  **new run** (FlashLFQ is not re-run for anything else).
- **All other page filters (charge, mod mass, RT, scan, …) gate CLIENT-SIDE** — the front end keeps/hides
  `QuantifiedPeaks` rows by whether each **proteoform still has surviving PSMs** after that filtering.
  FlashLFQ is **not** re-run.

**This is valid — and it is the correct architecture, not a shortcut:**
- An integrated precursor peak area is **measured once and is not per-PSM decomposable**, so the only
  correct response to a view-narrowing filter is **presence gating** (keep a feature iff a proteoform it
  is attributed to still has ≥1 surviving identification), never re-integration. Re-running on the subset
  couldn't split an existing feature anyway.
- The seam is drawn correctly: filters that change the **measured population** (annotation/cutoffs)
  trigger a run; filters that merely **narrow the view** (charge/mass/RT) gate client-side.

**Hard condition — the gating grain must equal the feature-attribution grain.** The front end gates by
"which *proteoforms* still have PSMs," so features must attribute at the **proteoform (display-form)**
grain, not `reportedPeptideId`. A **mod-mass filter** (e.g. show only +16 forms) keeps a reported peptide
but only its +16 PSMs; with **rpid-only** attribution all its features (incl. +79) would wrongly remain;
with the **decomposed per-form identity** only the +16-form features survive. **So this filtering model
depends on §13–§15** — finer-than-rpid secondary filters gate quant incorrectly without it. This is an
additional, independent justification for the per-form work.

**One semantic to surface (not a bug):** a **charge filter** keeps the proteoform (it has surviving
charge-N PSMs) and shows **all** its features summed across charges — quant is *not* charge-subset even
though the user filtered charge. Internally consistent ("thinning PSMs doesn't move the number"; matches
FlashLFQ's peptide-level charge summing), but a deliberate semantic worth stating, since features do carry
a charge column and one *could* subset them. Presence-gating (don't subset) is the principled choice.

**Consequences for the two ❌ "row with no data" shapes** (both expected, not defects): a displayed row
with no feature = `MSMSIdentifiedButNotQuantified` / no detectable peak; a feature that vanishes on
filtering = its proteoform was gated out. Neither is a mismatch to chase.

**Verified against the code (2026-07-06).** Confirmed firsthand that gating is already at the
proteoform/display-form grain and the quant prototype does no gating of its own — so Track A only swaps
attribution, not gating:
- `peptidePage_Display_MainContent_Component.tsx:2960–2977` — the row list is built from
  `getReportedPeptideIdsForDisplay_...` fed **all** secondary filter state objects (mod-mass, charge,
  scan/scanPeak-m/z/RT, peptide-sequence, missed-cleavage, digestion), i.e. the **fully-filtered** set.
- `:2984` builds `create_GeneratedReportedPeptideListData_Result` with `generatedPeptideContents_
  UserSelections_StateObject` (`:2992`) — the **'Collate Peptides Using:'** control — and it is keyed by
  `entries_Key_peptideSequenceDisplay` (`:3230`): the **collation-dependent display-form grain**.
- The prototype consumes this list (`_compute_displayedPeptidesForQuantPrototype`, `:3221–3246`); the
  cell attribution is rpid-total (`…GeneratedReportedPeptideListSection_Create_TableData.tsx:790–802` →
  `get_QuantForReportedPeptideIds`) — the exact mismatch the per-form key fixes.
Conclusion: gating-grain already == proteoform grain; swapping attribution to a per-display-form rollup
keyed by the same `peptideDisplayString` satisfies §16's hard condition and closes the localized-open
`n/a*` gap. **Track A is unblocked; the front end needs no gating change, only the attribution swap.**

### Endorsed as-is

Decision 3's "keep rpid-total permanently (not scaffolding)", and elevating the **ppm-vs-whole-number
rounding reconciliation to the core of the receive logic** (bucket via the builder's own rounding, never
an independent round) — both fully endorsed. The response's build order is sound.

### §16 addendum — the "sum across charges" semantic is quantified, and it is large (2026-07-08)

The §16 note that "a charge filter keeps the proteoform and shows all features summed across charges —
quant is *not* charge-subset" was framed as a benign, internally-consistent semantic. A **Tier-1 offline
differential harness** (re-run `CMD.dll` on PSM subsets of the validated single-file run `b3a49a5d…`,
compare per display form to summing the full-run peaks) now puts numbers on it. **Full-set re-run
reproduced production exactly** (6,069 forms, max rel err 0 → harness is faithful). Measured **over-count**
of the webpage sum vs. a re-run on exactly the surviving PSMs:

| Filter (PSMs kept)        | forms | exact | de-seeded | over-count |
|---------------------------|-------|-------|-----------|------------|
| drop open-mod +14 (92.8%) | 5,999 | 5,983 | 0         | **0.000%** |
| RT window 54–145 (79.5%)  | 5,137 | 4,825 | 310       | **1.04%**  |
| random 50% (50%)          | 4,249 | 3,198 | 911       | **5.96%**  |
| drop charge 2 (45%)       | 3,277 | 2,617 | 357+301*  | **54.2%**  |

Two conclusions:
- **Area-invariance holds** (the model's load-bearing assumption): removing *some* of a form's PSMs does
  not move its integrated peak — the open-mod filter is essentially exact; retained-peak drift ≤3.2%. The
  §16 "presence-gate, never re-integrate" call is sound for **form-removing** filters (0% over-count).
- **But for filters that thin PSMs *within* a surviving form the display over-counts**, up to **~54% for a
  charge filter** — because the form key sums across charges AND the stored intensity is **not
  charge-decomposable** (observed: `peak.charge` is the *ID* charge, not the peak's `Peak Charge`; ~28% of
  peaks pool ≥2 charge states, so a single charge's contribution cannot be extracted). Confirmed at the
  call site (`…GeneratedReportedPeptideListSection_Create_TableData.tsx:1247`: only `reportedPeptideIds`,
  `openModDescriptor`, `projectSearchId` passed — no charge). So the front end *does not*, and *could not*,
  charge-subset the stored peaks; a correct charge-specific value requires **re-running FlashLFQ on
  charge-specific PSMs**.

**Design implication (Dan, 2026-07-08):** to guarantee correct quant under arbitrary filtering, run
FlashLFQ on the **final filtered PSMs** and bind the result to a frozen, URL-encoded filter state — the
**"locked-filter run"** (any filter change removes the quant). The features doc now frames this as a
three-option spectrum (Option 1 = honest-labeled total, no re-run [recommended default]; Option 2 =
opt-in "quantify current filtered view"; Option 3 = locked-filter run). Full write-up, harness table, and
non-decomposability evidence: **`limelight_features_docs/flashlfq_quant_run_on_final_filtered_psms.md`**.
*(Over-count numbers OBSERVED from re-runs I executed; "webpage value" is a code-verified reconstruction of
`quant_PrototypeData.ts`, not a UI screenshot. Single scan file → no MBR.)*

**Option 1 shipped and vetted (2026-07-08).** The other session implemented the recommended default as a
**labeling/semantics change only** — no engine or run-model change: an "About the Quant column" info box
(`…GeneratedReportedPeptideListSection_Component.tsx:557–579`) + a matching header tooltip
(`…Create_TableData.tsx:559–577`). I reviewed the actual working-tree strings. **Verdict: accurate and
ship-worthy** — both state the value is the peptidoform total over the **submitted** PSMs, **not narrowed**
by secondary filters (charge/RT/m·z/scan), **not charge-scoped**, and **not additive down the column**
(shared-feature convention = PSM Count). Confirmed code-true: `get_QuantForDisplayForm` takes no
charge/filter args and a row's `reportedPeptideIds` don't change under secondary filters, so "not narrowed"
is a real property. **Both surfaces are shared onto the peptide page** via the (misnamed) `…SingleProtein…`
Section + Create_TableData — an earlier "peptide-page coverage gap" I raised was **wrong**, an artifact of
the filename; verified by who *renders* it (`peptidePage_Display_MainContent_Component.tsx` imports both).

Two review items left (both name-independent):
- **`--chg` coupling** — the "*cannot* be split by charge" wording is literally true only for `--chg` **off**
  (the default; the 28%-charge-pooling evidence came from an off run). The run form exposes
  `only_identified_charge` (`quant_FlashLFQ_Parameters.ts:83`); with `--chg` **on**, peaks are per-charge and
  "cannot" overclaims. Fix: soften to "…one combined intensity across charge states, **not broken out by
  charge**" (robust to both), or lock `--chg` off.
- **Nit** — tooltip "*summed over the PSMs* submitted" implies PSM-additivity; the summation unit is MS1
  features (peaks). "*as measured from* the PSMs submitted" is cleaner (the info box already avoids this).

**Both items RESOLVED (2026-07-08), verified in the working tree.** The other session took the softening for
`--chg` (did not lock the flag): info box and tooltip now read "*one combined intensity across charge states,
not broken out by charge*" (robust to `--chg` on or off, since the form key excludes charge regardless of run
config) — `Section_Component.tsx:571`, `Create_TableData.tsx:569–570`; the old "cannot be split by charge" is
gone from both. The nit is applied: tooltip now "*as measured from the PSMs submitted*" (`Create_TableData.tsx:564`).
So the Option-1 wording is fully vetted and correct on both the single-protein and peptide pages. *(Confirmed
by reading the working-tree strings; FE was rebuilt/redeployed and the new phrasing was verified rendered by
the other session — I did not re-observe the live UI.)*

Out-of-scope note for later: the **experiment-driven** protein/peptide pages have *parallel*
`…GeneratedReportedPeptideListSection…` components (separate files) that would need the same wording if quant
reaches them. *(Wording OBSERVED from the working-tree source; not yet seen rendered in a live UI.)*

---

## 17. Track A independent validation — run `b3a49a5d` (2026-07-06)

Independent cross-check of the landed Track A implementation against the run output at
`…/flashlfq-service-data/finaldir/b3a49a5ddaf64789b7f6fc322f6f1624/` (same open-mod search as the
evidence run). **Result: passes — Track A is functionally landed.**

### Send side / binning — all confirmed

- **0 rejections** (was 1,740); all **52,675** PSMs read; distinct `Full Sequence` collapsed
  **39,188 → 8,830**. The ppm binning works in production.
- **Mass computed in Java and sent** — `Peptide Monoisotopic Mass` column fully populated, **0 empty**.
- **Open-only tagging exactly as decided (§15 D2):** localized open → `[o+m]`, unlocalized → `[u+m]`,
  variable/static **untagged** (`C[+57.02146]`). No terminal-open present in this data (0 `[no`/`[co`) —
  format is in place but that edge is **untested**.
- **Boolean-flag fix applied:** command is `--ppm 10 --iso 5 --nis 2 --mrt 1.5` — no `--flag false`;
  the 6 false-default booleans read `false` in `FlashLfqSettings.toml`. `QuantifiedPeaks` carries the
  tagged forms so the receive side can parse per-form.

### Per-form resolution + invariant — the headline, confirmed

Quant now splits per display form instead of one lump. Example (`rpid265706`, total **1.53853e10** over
246 peaks): `-(0)` → **1.19e10** (65 peaks, ~77%), `-(1)` → 1.70e9, `-(26)` → 4.72e8, … 87 forms. So the
`-(0)` row shows 1.19e10, not the whole-peptide lump — the `SIQFVDWCPTGFK-(13)` gap is closed.

**Invariant Σ(per-form) == rpid-total: YES** on both rpids tested (1.42028e9 = 1.42028e9;
1.53853e10 = 1.53853e10) → the per-form split is exact, **no intra-rpid double-counting**.

### MBR was unchecked in the UI but ran anyway — benign here, flag for multi-file

The user **unchecked MBR** in the "Add Quant" form. The service captured it correctly
(`params_manifest.json`: `mbr → requested:false, intended:false, applied:true, honored:false`) and
omitted `--mbr` from the command — but `FlashLfqSettings.toml` shows **`MatchBetweenRuns = true`** and
stdout shows the MBR stage executed ("Doing match-between-runs", "Computing PEP for MBR Transfers").
This is the known `--mbr` limitation (§12/§4a): in **FlashLFQ `CMD.dll` 1.0.0.0** (the FlashLFQ
command-line program in the service's Docker image, run as `dotnet /flashlfq/CMD.dll`), the boolean
options are CLI **switches** — `--mbr` defaults **on** and there is no token that sets it false, so
omitting it leaves it on. (This is a FlashLFQ-CLI property, not a Limelight or Python-service issue; the
service handles it correctly — omits `--mbr`, records `honored:false`, warns.)

**Impact on this run: none.** All **9,162 peaks are Detection Type `MSMS`; 0 MBR-transferred peaks** —
with a single scan file there is no donor run, so MBR is a true no-op and the intensities are unaffected.

**Consequences to record:**
- The MBR checkbox in the UI is **not enforceable-off via the FlashLFQ CLI in `CMD.dll` 1.0.0.0**. For a
  single scan file it is harmless (no-op). It would materially change results only for **multi-file**
  runs — which are gated by the single-search UI restriction and are the deferred per-search refactor
  (TODO #1 / §4d).
- **Real fix path if MBR-off ever must be enforced** (i.e. once multi-file runs exist): NOT a settings
  file — per the FlashLFQ command-line docs, `CMD.dll` takes only individual `--flags` and has **no
  settings-file input**; the `FlashLfqSettings.toml` in the output is a *record written by FlashLFQ*, not
  a re-readable input. The genuine options are (a) invoke FlashLFQ as a **.NET library** (`FlashLfqEngine`
  exposes MBR as a settable property — how MetaMorpheus drives it) instead of shelling to `CMD.dll`, or
  (b) a FlashLFQ version whose `--mbr` accepts a value (unverified). The CLI switch in `CMD.dll` 1.0.0.0
  alone cannot express MBR-off.
- Recommend the UI **disable/annotate the MBR control** (e.g. "MBR cannot be turned off with FlashLFQ
  CMD.dll 1.0.0.0; no effect for a single scan file") so an unchecked box doesn't imply an effect it
  can't deliver. This is honesty-of-UI, not a quant bug.

### Caveats — all known/expected, not regressions

- **Cross-base-sequence shared peaks (open item #4) still unsolved:** `QuantifiedPeaks` shows peaks
  mapped to multiple rpids (`rpid245997_…|rpid255692_…`). The invariant above was verified *within* one
  rpid; summing across *different* rpids would still double-count a shared peak. Deferred ambiguity-flag
  work, correctly out of Track A scope.
- **`-(-0)` was produced by MY validation script — NOT an observed render.** My `awk` collapsed the
  display grain with `sprintf("%.0f", …)`, which turned a *real* near-zero negative open mass
  (`rpid244515_DYEEVGVDSVEGEGEEEGEEY[u-0.00021]`, −0.00021 Da) into the string `-0`, so my per-form
  breakdown printed `-(-0)`. **This string was generated by the validation script; it was NOT seen in any
  FlashLFQ output nor in the Limelight display.** Whether the real UI ever shows `-0` is **unverified** —
  it depends on how `reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches` rounds/formats
  (not checked); the builder may already normalize signed zero, in which case there is no defect.
  The **verified** point that does stand: near-zero open forms of opposite sign / different layout (e.g.
  `[o+0.00532]` and `[u-0.00021]` on this rpid) are separate canonical forms and should fold into a single
  unsigned `(0)` display row on the receive side.
- The validation approximated the display grain (summed `[o]`+`[u]`, position-blind); the real receive
  side must bucket via the display builder's own rounding/position-splitting (§16).

**Bottom line:** binning, Java-side decomposed encoding, per-form resolution, and the Σ-invariant all
validate against the run. Remaining: the #4 shared-peak ambiguity flag; a UI note that MBR-off is not
enforceable in FlashLFQ `CMD.dll` 1.0.0.0; and a receive-side check that near-zero open forms fold into
one unsigned `(0)` row (the `-0` seen during validation was a **script artifact, not an observed
render**). *(See §18 for decisions that supersede parts of this list.)*

---

## 18. Decisions (2026-07-06, later) — supersede earlier suggestions

Three calls made after §16/§17; recorded here as the authoritative current position.

### Decision A — open item #4 (cross-base-sequence shared peaks): **NO ambiguity flag** — supersedes §16/§17

The per-row display will **not** carry a shared/ambiguity flag. Rationale: **Limelight's PSM Count already
attributes a shared PSM under every peptide it maps to, with no flag** — quant uses the *same* many-to-one
attribution, so matching that established semantic is more consistent (and less surprising) than flagging
quant alone. This **supersedes** the "add an ambiguity indicator" suggestion in §16 (§13c riders) and §17
(caveats).

Still holds (unchanged by this decision):
- The mapped-forms / shared-with-others data remains available (e.g. tooltip) if a flag is ever wanted
  later — the decision is "don't surface a flag now," not "discard the information."
- Any **summed total** (protein-group rollup) must still **dedupe by feature** so a shared feature isn't
  double-counted in a total — that is the roll-up layer, separate from per-row display, and the mapping
  doc already plans it. "No flag" applies to the per-row display, consistent with how counts behave.

**RECONSIDERED for the QUANT column (2026-07-10) — flag shared-quant rows.** Grounded in the non-open-mod
run `3d4438a3…` (shared-peak analysis): of 1,621 reported peptides with quant, **12.5% carry shared-peak
intensity (value is an upper bound), 9.4% fully shared**; the sharing is **almost entirely variable-mod
positional isomers** (same base sequence + same mass, different mod site — e.g. `MM[+15.995]QQ…` vs
`M[+15.995]MQQ…`), **not** distinct near-isobaric peptides (only 0.2% of peaks). The count-vs-abundance
distinction justifies flagging quant while **leaving PSM Count unflagged**: PSM Count is identification
evidence (shared credit is benign), whereas quant is an **abundance** and showing the *same* intensity under
two localization-variant rows distorts the quantitative comparison quant exists for. So Decision A's "no
flag" is **revised for the quant column only** (Dan, 2026-07-10): mark shared-quant rows with a small glyph
+ tooltip. **PSM Count keeps no flag** (Decision A stands for it).

Implementation caveat (important): base the row flag on the peak mapping to **>1 reported peptide**
(`peak.reportedPeptideIds.length > 1` — equivalently `Full Sequences Mapped`/rpid multiplicity), **NOT** the
existing `peak.isShared` (which is `baseSequenceSet.size > 1`). The dominant case is one base sequence /
multiple rpids, so base-sequence sharing would catch only the 0.2% distinct-sequence peaks and **miss ~97%**
of the actual sharing. A row is "shared" iff any peak in its quant sum also maps to a different
`reportedPeptideId`. Single glyph (don't distinguish partly-vs-fully); tooltip can state the sibling count.
*(Prevalence OBSERVED from the run's `QuantifiedPeaks.tsv`; per-reported-peptide rollup computed by my
analysis script replicating the receive-side attribution.)*

### Decision B — MBR-off UI note: owned by the other session

The other session is adding a UI note that **MBR cannot be turned off in FlashLFQ `CMD.dll` 1.0.0.0**
(harmless no-op for a single scan file; would matter only for the deferred multi-file runs). Closes the
§17 UI-note item.

### Decision C — §12 service hardening: deferred, tied to the DB-ingest structural change

The §12 operational items (job-status/result endpoint, run-dir cleanup, HTTP/subprocess timeouts,
concurrency cap) are **deferred** and will be addressed as part of the upcoming **load-FlashLFQ-results-
into-the-database** work — a structural change to the flow (Track B in §13d) — rather than piecemeal
against the current served-TSV prototype. The job-status endpoint + cleanup are natural parts of that
DB-ingest phase; doing them now against the throwaway path would be wasted. Display work (Track A)
continues on the prototype path meanwhile.

---

## 19. Single-search / multi-file quant: run **per scan file**, MBR off — refines §16/§17 (2026-07-08)

The single-search-with-multiple-scan-files case (flagged open in §17 / TODO #1, and never designed) was
worked through with the user. Conclusion below. The topology already in use — **many searches, each a
single scan file, each run through FlashLFQ separately** — is unaffected (no MBR, no cross-file coupling);
this section is only about the *one search, several scan files* case.

### 19a. Why MBR is not merely "changes the numbers" — it is **incompatible with the §16 filter model**

§16 established the architecture: FlashLFQ is measured **once** over the annotation/cutoff-defined PSM
set, and all other page filters gate **client-side by presence** — a feature is kept iff a proteoform it
is attributed to still has ≥1 surviving identification. That model has an unstated premise: **every
feature is attributable to real PSMs in the set**, so "did any survive?" is answerable.

**An MBR-transferred peak violates that premise by construction.** It has **zero seeding PSMs in its own
scan file** — it is integrated in an acceptor file purely from a *donor* identification in a *different*
file. Yet the send side stamps its `rpid` from that donor, so the phantom peak still carries a
reportedPeptideId and **would be summed into that peptide's displayed quant**, with **no PSM behind it in
that file that any filter could act on**. So an MBR peak is not just *different* under a view-narrowing
filter (the §17 "materially change results" framing) — it is **unfilterable**: presence-gating cannot
coherently include or exclude it. This is a sharper statement than §17: MBR doesn't just perturb
multi-file numbers, it breaks the run-once / display-many **mechanism** of §16.

Corollary: MBR is sound **only** if FlashLFQ is run on *exactly* the PSMs driving the current display —
i.e. the run-once model must be abandoned and a run bound to one filter state (the Tier-2 endpoint in
19c). You cannot have both MBR and reusable-across-filters results.

### 19b. Recommendation — quantify **per scan file**, one FlashLFQ run per file

For a single search with N scan files, run FlashLFQ **N times, once per file, feeding each run only that
file's PSMs**, then sum per displayed form across the per-file runs (same receive-side rollup as today).

- This **forces MBR off by construction** — a single-file run has no donor, so MBR is a guaranteed no-op
  (confirmed empirically in §17: 0 MBR-transferred peaks, all `MSMS`, for the single-file run). **This is a
  third MBR-off path §17 did not list** — and the cleanest: it needs neither the `.NET`-library rewrite
  (§17 option a) nor a newer FlashLFQ whose `--mbr` takes a value (§17 option b). It also supersedes the
  premise of Decision B (§18): with per-file runs there is no live MBR control to annotate, because MBR is
  structurally absent, not merely un-disable-able.
- It **collapses the multi-file case into the single-file topology already validated** in §16/§17, so the
  bounded correctness property carries over verbatim: summing the run's peaks equals a subset re-run
  **except** for peaks a finer-than-proteoform filter fully de-seeds (the §16 charge-summing semantic),
  and every peak is backed by a real MS/MS ID.

### 19c. What it costs, and the open metadata question

- **You give up MBR's value-recovery.** MBR's purpose is to fill missing values — integrate a peptide's
  XIC in a file where it is present in MS1 but was not MS/MS-identified (DDA sampling is stochastic).
  Per-file runs won't do that; files where a peptide wasn't identified get no peak for it. The displayed
  cross-file total therefore becomes **"sum of ID-seeded per-file XIC areas"** — more conservative and
  fully filter-attributable, but with more gaps than an MBR total.
- **Whether that matters depends on what the N files are**, and this is a genuine **design decision, not a
  test**: *fractions* of one sample (SCX / high-pH) → per-file is fine, arguably better (cross-fraction
  MBR is marginal or actively wrong); *replicates / time series / conditions to compare across files* →
  MBR's recovery is valuable and per-file loses it. **Open question:** does Limelight capture the
  file-relationship (fraction vs replicate) metadata? If not, one cannot branch on it and must pick a
  documented default — **per-file-then-sum, "MBR-based recovery not performed"**, is the defensible
  default given the correctness parity above and that the display already just sums.
- **Not a regression vs. current display:** the peak-summing display never used FlashLFQ's cross-file
  normalization or protein-Bayesian rollup, so per-file runs lose only MBR, nothing else.
- **Summing across files** is itself a semantic to state: legitimate as a total for fractions; conflates
  replicates (FlashLFQ deliberately keeps per-file intensities so one does *not* just sum replicates).
  Ties to the same fraction-vs-replicate metadata gap.

### 19d. Parallel testing — an offline oracle needing no code change, plus a Tier-2 endpoint

The user's standing frustration is the lack of an independent way to check any of this. Two tiers:

- **Tier 1 (immediate, no webservice change):** each `finaldir/<requestId>/` already contains
  `flashlfq_identifications.tsv` (the exact identification input) + `mzml/` + the engine (`CMD.dll`). A
  differential run = delete a controlled subset of identification rows (one peptidoform / one charge / one
  file / a random fraction), re-run `CMD.dll` on the reduced identifications + same mzML, and compare
  `QuantifiedPeaks` intensities per form (full-run-restricted-to-survivors vs subset re-run). This
  measures FlashLFQ's subsetting sensitivity directly and confirms/breaks the "only fully-de-seeded peaks
  differ, retained peaks are area-invariant" claim — including any second-order RT-recalibration drift on
  retained peaks, which reasoning alone can't rule out. **Verify the granularity of
  `flashlfq_identifications.tsv` (expected one row per PSM) before relying on it.**
- **Tier 2 (end-to-end, needs a throwaway webservice change):** the user proposed modifying the submit
  webservice to accept explicit `reportedPeptideId → [psmId]` and build FlashLFQ inputs from only those,
  bypassing the current filter-value-retrieval path. The peptide page already knows the surviving
  reportedPeptideIds+PSMs for the *actual* current filters, so it can hand that set straight to the
  endpoint. This is the definitive product-path check (does the summed display equal a re-run on exactly
  the displayed PSMs). Acknowledged **throwaway scaffolding**, to be removed once results live in the DB.
  Do Tier 1 first — if the effect is negligible, Tier 2 may not be worth building.

*(Provenance: 19a–19b are algorithmic/domain reasoning about how FlashLFQ seeds and integrates peaks,
consistent with the §17 empirical single-file result; the "per-file ≈ all-files-minus-MBR" equivalence
and the de-seeding bound are to be confirmed by the Tier-1 harness, not yet observed on a real multi-file
run.)*

### Decision (19) — proposed, pending user confirmation

For single-search / multi-file: **quantify per scan file (MBR off by construction), sum per displayed form
across files.** MBR is incompatible with the run-once/display-many model (19a) and is only sound bound to
one filter state (Tier-2). Document "MBR-based recovery not performed" and record the **fraction-vs-
replicate metadata gap** as the next design question. Validate via the Tier-1 offline harness.
