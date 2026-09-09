# Limelight Core

Limelight is a web application for visualizing, sharing, and analyzing mass-spec
proteomics results. This repo is a multi-module Java project (built with Ant; see
Building below) plus a TypeScript/webpack front end. User-facing docs live at
https://limelight-ms.readthedocs.io/ — this section covers only what isn't obvious
from the code.

## Architecture

### Data flow

A user submits search results (Limelight XML) for import. The import is queued,
then a long-running daemon picks it up and loads it into the database. The webapp
reads that database to visualize and share the results.

```
submit_import (CLI)  ─┐
                      ├─►  queue (DB)  ──►  run_importer (daemon)  ──►  importer ──►  DB  ◄── webapp (visualize/share)
webapp upload UI    ─┘                                              └─► feature_detection_run_import
```

### Modules

Runnable jars (each has a `main`) and the WAR are the deployable artifacts; the
rest are libraries consumed by them.

**Deployables**
- `limelight_webapp` — Spring MVC web app deployed as a WAR to Tomcat. Entry:
  `LimelightSpringApplicationRoot` / `WebappServletContextListener`. The
  TypeScript/webpack UI lives in `limelight_webapp/front_end` (see its own
  `CLAUDE.md`). MUST be built with its Ant script, not Gradle.
- `limelight_run_importer` — daemon (`RunImporterProgram`) that polls the import
  queue and runs imports; also drives DB cleanup and new-field population on
  startup/maintenance.
- `limelight_importer` — core importer (`LimelightImporterProgram`): validates and
  parses Limelight XML and loads it into the database.
- `limelight_feature_detection_run_import` — importer variant
  (`Limelight_FeatureDetection_Run_Import_Program`) for feature-detection data.
- `limelight_submit_import` — CLI (`SubmitImportProgram`) that submits/queues an
  import by calling the webapp web service.

**Libraries**
- `limelight_shared_code` — DTO/DAO/database layer shared across (nearly) all
  modules. Start here when looking for how data is persisted or read.
- `limelight_importer_run_importer_shared` — code shared by the importer,
  feature-detection importer, and run_importer.
- `limelight_submit_import_client_connector` — web-service client connector for
  the submit-import call; used by `submit_import`, `shared_code`, and `webapp`.
- `limelight__database_cleanup__common_code__remove_data_from_database` — removes
  data from the DB; consumed by `run_importer`.
- `limelight__db_populate_new_fields__common_code` — populates newly added DB
  fields (schema-upgrade data backfill); consumed by `run_importer` and `webapp`.

**Other top-level dirs**
- `database_scripts` — SQL `install/` schema and `version_upgrades/`.
- `docs` — Sphinx source for the readthedocs site.
- `deploy` — build output (jars + WAR).

## Things to do sooner than later

- **Quant pages — remaining work / TODO:** `limelight_features_docs/quant_pages_TODO.md` — the living to-do
  list for the FlashLFQ-quant pages (near-term roadmap: standalone quant single-protein page, charts/stats, DB
  persistence). The single-protein-overlay tab widgets (§1) and per-peptide child-table expansion (§2) are now
  re-enabled. Details live in that doc; the quant *status & decisions* hub is
  `limelight_features_docs/flashlfq_quant_status_and_decisions.md`.

## Identifications data model (PSMs, reported peptides, open modifications)

A few cross-cutting concepts that aren't obvious from the schema:

- **PSM** — a single peptide-spectrum match (one identified scan). Per-scan facts live here:
  charge, scan number/file, and — importantly — **open-modification** mass/position.
- **Reported peptide** — the **grouping of PSMs at which peptide-level statistics apply.** When
  post-processing rescores PSMs and emits a *peptide-level* value (e.g. Percolator's peptide-level
  q-value / PEP), that peptide is the reported peptide; it is the grouping of the PSMs that rolled up
  into it. So a reported peptide is a *scoring/grouping* level, not necessarily one exact mass form.
- **Open modification** — Limelight models an open modification on a peptide as **a mass plus
  zero-to-many candidate positions** within the peptide (0 positions = unlocalized). This exists to
  support open / mass-tolerant searching from tools like **MSFragger, Magnum, and MetaMorpheus**,
  where a delta mass is found but only localized to a set of possible sites (or not at all).

  **Key consequence: the open-mod mass (and its position(s)) is stored on the _PSM_, not on the
  reported peptide.** So a single `reportedPeptideId` can cover PSMs with **different open-mod masses /
  positions** — i.e. one reported peptide maps to *multiple distinct peptidoform mass forms*. Any code
  that assumes "one reported peptide == one exact mass/modification form" is wrong for open-mod data
  (e.g. quant keyed only on `reportedPeptideId` under-splits open-mod peptides — the distinguishing
  mass lives on the PSM).
- **Search sub-group** ("Sub Search" in the UI) — an optional per-PSM *logical* label that partitions one
  search's PSMs into named groups (conditions/replicates). It is **independent of the scan file** (a
  *physical* per-PSM fact): a sub-group can span many scan files and a scan file can hold many sub-groups,
  with no constraint aligning them. `searchSubGroupId` is unique only within a `searchId`, so sub-groups
  show only on single-search views. For the full stack (schema → import → searchers → REST → UI) and why
  this matters for MS1 quant, see `limelight_features_docs/limelight_search_sub_groups_deep_dive.md`.

**MS1 quant aggregation — before you sum quant across anything, read this.** Whenever you write code that
combines, sums, or shows a single quant/abundance number for a group of units — multiple **scan files** of
one search, multiple **sub-groups**, multiple **searches**, or an experiment **condition** — read
`limelight_features_docs/flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md`
first. Short version: **PSM count may sum across those; quant may NOT.** A quant value is a physical MS1
measurement tied to one scan file and one run, so it may only be aggregated over units that were
co-measured in one run and are known-valid to combine (Limelight has no fraction-vs-replicate metadata and
won't). Where that doesn't hold (a multi-scan-file search, a condition spanning searches), **decline the
quant — never silently sum it the way PSM count does.**

## Never substitute a projectSearchId for a "search id" (they are DIFFERENT ids)

**`projectSearchId` (`project_search_tbl.id`) and search id (`search_tbl.id`) are two DIFFERENT identifiers.
Never use a `projectSearchId` where a search id is asked for, and never label/name a `projectSearchId` as a
"search id".** They are not interchangeable: `search_tbl.id` is the global search id; `project_search_tbl.id`
is a per-project handle onto a search. Conflating them produces wrong lookups and misleading UI/labels.

- **When a request (from a human or a spec) says "search id", it means `search_tbl.id`** — supply that, not a
  `projectSearchId`. If only a `projectSearchId` is in hand, resolve it to the real search id rather than
  passing the `projectSearchId` and calling it a "search id".
- **When cloning/adapting code (or copying a label/field/param) that calls something "search id", it means
  `search_tbl.id`** — do NOT bind a `projectSearchId` to it. Match the id the source actually means; if the
  source is itself wrong, flag it, don't propagate it.
- **Applies everywhere:** user-facing text, tooltips, column headers, variable/param/field names, comments,
  DTO/JSON keys, and log messages. A value named or labeled "search id" must carry `search_tbl.id`.
- **If you genuinely only have / only need the `projectSearchId`, call it `projectSearchId`** in *code* —
  never dress it up as "search id". **But it must NOT reach the user (see the next rule).**

### NEVER show the `projectSearchId` to the user

**The `projectSearchId` (`project_search_tbl.id`) is an internal handle — NEVER display it in the UI.** Any
id a user sees for "a search" must be the real **search id (`search_tbl.id`)**. This includes visible text,
labels, tooltips, table cells, messages, and anything rendered on a page. If a UI needs to show "the search's
id", show `search_tbl.id`, not the `projectSearchId` — and never relabel the problem away by calling a
displayed `projectSearchId` a "project search id" either; resolve to the real search id instead.

**This rule governs ids rendered as page CONTENT, not opaque functional keys in URLs.** A `projectSearchId`
carried in a URL / query string / URL-hash fragment (e.g. as a lookup key the page reads back) is a functional
identifier, not a displayed "search id", so it is EXEMPT from this rule — do not "fix" it to a `search_tbl.id`
just because it appears in the address bar. (Example: the Add-New-Quant viewer hash
`#qr;<projectSearchId>_<searchScanFileId>_<requestId>` is fine as-is.) The rule still applies in full to any id
the user reads as "the search's id" in the page body.

### The search NAME + real search id: get them from the STANDARD source (varies by page)

The search **name** obeys a rule: it comes from **`project_search_tbl.search_name`** — a **PER-PROJECT** name
(the column lives on `project_search_tbl`, keyed by `projectSearchId`, NOT on `search_tbl`), so the same
shared `search_tbl` search can carry a **different name in each project**. **When that name is null/empty the
standard display name is computed server-side** as `"Search: " + searchId` by
`web_utils/SearchNameReturnDefaultIfNull.searchNameReturnDefaultIfNull( searchNameFromDB, searchId )` (the only
place `search_tbl.id` enters the name). **Always run the raw DB name through that util** — never display a raw
possibly-null name, and never hand-roll the default. The standard source returns BOTH ids alongside the name
(`project_search_tbl.id AS project_search_id`, `search_tbl.id AS search_id`), so the real **search id**
(`search_tbl.id`) is always on hand for display.

The standard source is NOT the same on every page — do not reuse one page's mechanism on another:
- **Main data pages (Peptide / Protein / Mod, etc.)** load names once, early, via the front-end module
  `data_pages_common/searchNameRetrieval.ts` (`retrieveSearchNamesFromServer`), which POSTs
  `d/rws/for-page/psb/search-name-list-from-psi` and returns, per search, `{ projectSearchId, searchId, name
  (fallback-applied), searchShortName, subgroups }`. On those pages, read from that already-loaded data — do
  not re-fetch or invent a per-page path.
- **Server side**, the canonical builder is `SearchMinimalForProjectSearchIdSearcher` /
  `SearchListForProjectIdSearcher` → `SearchItemMinimal` (carries `projectSearchId` + `searchId` + raw name),
  **then** the `SearchNameReturnDefaultIfNull` fallback. The webservice
  `SearchNameList_From_ProjectSearchIds_RestWebserviceController` is the reference implementation.
- If you can't determine the correct standard source for a given page/context, **STOP and ask** — do not fall
  back to showing the `projectSearchId`.

**Caution — not every existing endpoint sources the name correctly; verify, don't assume.** The "Add New Quant"
eligibility webservice (`Quant_AddNew_ProjectSearches_ScanFiles_Eligibility_List_RestWebserviceController`)
ORIGINALLY set `searchName = search.getName()` **raw** (skipping `SearchNameReturnDefaultIfNull`) and did not
return `searchId` to the front end — a broken template. It has since been fixed (it now returns `searchId` and
applies `SearchNameReturnDefaultIfNull`); the lesson stands — check each endpoint rather than assume it sources
the name/ids correctly.

Real miss to learn from: the "Add New Quant" overlay
(`.../project_page_quant_section/projPg_Quant_UploadParse_Component.tsx`) displayed `(search id
<projectSearchId>)` in three spots (ineligible-search list, multi-match picker, collision error) — the label
said "search id" but the value was the `projectSearchId`. The fix (implemented + verified) keeps the "search id"
label and shows the real `search_tbl.id` sourced the standard way above (which also fixed the raw-name gap) — NOT
relabeling it "project search id", and NEVER showing the `projectSearchId`.

## Page links: always use `<span class="fake-link">`, not `<a>` (unless explicitly asked)

For any NEW clickable navigation link on a page, use a `<span class="fake-link">` (or similar element) with a JS onClick handler — NOT a real anchor `<a href>`. Use a real `<a href>` ONLY when explicitly asked for one. Limelight's predominant pattern is the fake-link because it lets us run code at navigation time (inject behavior before/instead of the browser navigating).

Because a fake-link isn't a real anchor, its onClick handler MUST re-implement the ctrl/cmd-click → new-tab affordance the browser gives an `<a>` for free: check `event.ctrlKey || event.metaKey` and, when true, open the target in a NEW TAB (e.g. `window.open(url, "_blank")`) and return — instead of the in-page navigation. Without this, ctrl/cmd-click silently does a same-tab nav.

When reviewing or touching an EXISTING link, look at how it's rendered in the code: a real `<a href>` handles ctrl/cmd-click natively (fine as-is); a fake-link onClick handler must have the ctrl/meta → new-tab check above.

## Webservice-response ("off-the-wire") shape types: declare fields REQUIRED, validate at runtime — do NOT use `?`

**When declaring the TypeScript type that describes a webservice/JSON response shape** — the loose
`responseData as { ... }` "off-the-wire" type inside a loader — **declare every field the server always sends as
REQUIRED (no `?`)**, then validate each field at runtime (the house `limelight__variable_is_type_number_Check` /
string-check + `throw` pattern) before constructing the strict internal type the rest of the code uses.

- **Do NOT mark a field `?` merely because it is unvalidated at that point.** `?` is reserved for a field that is
  genuinely sometimes-present / sometimes-absent BY DESIGN. Using it for an always-sent-but-not-yet-checked field
  is misleading: a reader can no longer tell "actually optional" from "just not validated yet".
- The runtime validation is the real guard (the `as` assertion is untrusted either way, and the per-field
  runtime check still catches a missing/wrong value even when the field is typed required). Typing the field
  required simply states the true contract — "the server sends this" — instead of a misleading "maybe".
- This is about the off-the-wire response-shape type specifically. The strict INTERNAL type the loader
  constructs from it is required too (and `?` there would be a genuine leftover-optional footgun).

Why: `?` carries a specific meaning — "may or may not be populated". Spending it on "present but unverified"
dilutes that signal everywhere `?` appears, so every optional becomes a question ("is this truly optional, or did
someone just not validate it yet?"). Keep `?` meaningful: required + runtime-validated for what the server always
sends; `?` only for genuinely optional fields.

## Building

### Full project

From the repo root:

```
ant -f ant__build_all_limelight.xml
```

Default target `createInstallables`: runs `npm install` + the front-end build
(`limelight_webapp/front_end`), compiles all submodules into runnable jars, and
builds the webapp WAR. Output goes to `deploy/`.

This host-direct build only works when the machine has the correct Node and Java
installed. The build environment (Java/Node/NPM versions and tooling) is defined
by the limelight-build-docker image — see that repo for current requirements:
https://github.com/yeastrc/limelight-build-docker

### Portable build (Docker)

If your machine isn't set up with the right Node/Java, build inside the official
image instead (needs Docker; uses `sudo` only for the `docker` command):

```
./build_in_docker.sh
```

This runs the same Ant build in the limelight-build-docker image, reusing your
host Gradle/npm caches.

### Single module

Each module is built by its own Ant script (run from the module directory):

- `limelight_feature_detection_run_import` — `ant__create_runnable_jar_importer.xml`
- `limelight_importer` — `ant__create_runnable_jar_importer.xml`
- `limelight_run_importer` — `ant__create_runnable_jar_run_importer.xml`
- `limelight_submit_import` — `ant__create_runnable_jar_submit_import.xml`
- `limelight_webapp` — `ant_create_war.xml` (build the WAR; the webapp MUST be
  built with its Ant script, not Gradle)

e.g.:

```
cd limelight_webapp
ant -f ant_create_war.xml
```

Note: root-level Gradle does NOT work (see `Z_Not_Works_build.gradle` /
`Z_Not_Works_settings.gradle`). Use the root Ant build for a full build and the
per-module Ant scripts above for a single module.

## Dependency updates: the JAXB Java-8 vs Java-25 split (and a Dependabot gotcha)

The modules run on **two Java toolchains**, and this splits which JAXB line each may
use — get it wrong and the build breaks in non-obvious ways:

- **Java 8 modules** — `limelight_submit_import` and `limelight_submit_import_client_connector`
  (they pin `JavaLanguageVersion.of(8)` so the submit-import client can run under Java 8).
  These MUST stay on the **Java-8-compatible JAXB lines**: `jakarta.xml.bind:jakarta.xml.bind-api`
  / `org.glassfish.jaxb:jaxb-runtime` on **3.0.x**. JAXB **4.x** is compiled for Java 11
  (class-file 55.0) and will NOT compile under a Java 8 toolchain (`cannot access
  jakarta.xml.bind.annotation.XmlAccessType`).
- **Java 25 modules** — everything else. They use **jakarta JAXB 4.x**. The **webapp** additionally
  keeps a *javax* JAXB 2 runtime (`javax.xml.bind:jaxb-api:2.3.x` + `com.sun.xml.bind:jaxb-impl:2.3.x`)
  for the bundled yeastrc client-connector jars, coexisting with jakarta `jaxb-runtime:4.0.x`.
  Do **not** bump `com.sun.xml.bind:jaxb-impl` to 3.x/4.x — it breaks the javax pairing and drags in
  a duplicate `org.glassfish.jaxb:jaxb-core-4.x`, failing the WAR build (`bootWar`: duplicate
  `WEB-INF/lib` entry).

**The Dependabot gotcha (why the Java-8 ignore isn't enough):**
`limelight_webapp/settings.gradle` (and `limelight_submit_import/settings.gradle`) **include
`limelight_submit_import_client_connector` as a Gradle subproject**. So when Dependabot scans the
**webapp** directory — which is in the **Java-25** Dependabot group — it traverses into the connector
subproject and tries to bump *its* JAXB to 4.x, **bypassing** the ignore on the separate Java-8 group.
This recurred in PRs #105 and #107. `.github/dependabot.yml` handles it by adding a **semver-major**
ignore for `jakarta.xml.bind:jakarta.xml.bind-api` and `org.glassfish.jaxb:jaxb-runtime` to the
**Java-25 group** (blocks the connector's 3.x→4.x jump while still allowing JAXB 4.x minor/patch on
the genuine Java-25 modules), plus a `>=3.0.0` ignore on `com.sun.xml.bind:jaxb-impl`. If a Dependabot
gradle PR ever reintroduces a JAXB-4.x bump on `limelight_submit_import_client_connector`, drop that
hunk before merging — the rest of the PR is fine.

## Web security: CSP and XSS / URL hardening

Before touching the Content-Security-Policy, adding a link/redirect, rendering a server- or
user-provided URL, or injecting an HTML string, read
`limelight_features_docs/web_security_csp_and_xss_url_hardening.md`. Quick pointers:

- **CSP** lives in a `<meta>` tag in
  `limelight_webapp/src/main/webapp/WEB-INF/jsp/jsp_includes_head_section/head_section_include_every_page.jsp`
  (no header). It uses hashes, not `'unsafe-inline'`; `'unsafe-eval'` is required by **Plotly WebGL**
  (`scattergl`/regl), not Google Charts (unused). `gstatic` is narrowed to `/recaptcha/`; `base-uri 'self'`
  protects the app's `<base href>`-driven relative URLs; `form-action 'self'` is set. Anti-clickjacking
  (`frame-ancestors`) can't live in a `<meta>` CSP (silently ignored), so it's a **response header**
  (`Content-Security-Policy: frame-ancestors 'self'` + `X-Frame-Options: SAMEORIGIN`) set in
  `top_of_every_page_doctype__jsp_cache_directives.jsp`. Each directive is commented inline.
- **URLs:** route any non-hardcoded URL through
  `front_end/.../page_js/common_all_pages/sanitizeURL_ForHrefOrNavigation.ts` before it reaches an
  `href`/`.src`/`location.href`/`window.open` (external vs same-origin variant per intent). Validate
  redirect/web-link URLs **server-side** too — client checks are bypassable (web links are http/https-only
  across client form, `Insert_WebLink_RestWebserviceController`, and the render sanitizer).
- **HTML:** never build HTML from server/user data via string concat + `innerHTML`/`.html()`. Use React
  (auto-escaped), `<c:out>` on the server, or inject an empty node and set user text via
  `.textContent`/`.text()`. (`dangerouslySetInnerHTML` is used nowhere.)
- **Future security/hardening requests start at §7 of that doc** — deferred items are catalogued there:
  remaining CSP directives (`default-src`/`img-src`/`style-src`/`connect-src`) and ToS/footer escape-first.

## Project page: Advanced (grouped) search tag filter

The project page Searches section has an **Advanced** grouped tag filter (build boolean expressions
like `( a AND b ) OR ( c OR d )`, with per-tag NOT), mutually exclusive with the basic "Filter On
Tags:" selector. **Each group has its own AND/OR operator, and a single independent between-groups
operator combines the groups** (this replaced the original coupled CNF/DNF single-toggle model; old
saved filters are migrated on load). It is **front-end only** (client-side filtering + per-project
`sessionStorage`; no webservice/DB change) and lives in
`.../tag_filter_expression_builder_grouped_component/`. Before changing it, read
`limelight_features_docs/project_page_advanced_tag_filter.md` — files, the empty-group-blocks-all vs.
pristine-shows-all rule, basic↔advanced seeding, the persistence migration, and the shared
"Filtering on…" summary requirement.

## Identifier/record "matching" code: discuss the match — and what to do on a mismatch — with the maintainer first

When you write or change code that **matches records or identifiers across sources or systems** — e.g.
matching a PSM's scan number to the spectral-storage (spectr) scan metadata, matching scan-file filenames
across searches, matching ids across DB tables, or reconciling data between Limelight and an adjacent service —
do **NOT** unilaterally decide the behavior **when they don't match** (a lookup miss, an absent record, a
partial / short result). Raise **both** the matching logic **and** the mismatch / failure handling with **the
maintainer**, and get a decision, before implementing it. This applies to Limelight **and its adjacent
services** (e.g. the FlashLFQ quant service).

- **Default toward failing loudly, not silently degrading.** A mismatch usually means the inputs disagree in a
  way that can corrupt downstream results, and a silent or partial fallback hides it. Do **not**, on your own,
  choose "write an empty / placeholder value and keep going," drop the offending row, or otherwise paper over
  the gap.
- **The policy is the maintainer's call, not an implementation detail** — error the whole request,
  skip-with-report, substitute a documented default, etc. It is a correctness / data-integrity decision.
  Surface it; don't pick it.

**Why (concrete):** the FlashLFQ quant service looks up each PSM's retention time by **scan number** against
spectr's all-scans metadata. A scan number absent from that metadata originally wrote an **empty**
retention-time value and continued — a silent, partial result feeding quant. The maintainer's decision: **if
any scan number does not return data from spectr, the whole request must error.** The match / mismatch policy
was the maintainer's to set, not the code's to assume.

## Never put machine-specific / absolute host paths in repo files (only under the gitignored `.claude/`)

Do **NOT** write machine-specific or absolute host filesystem paths — e.g. `/data/...`, `/spinning-disk-02/...`,
`/home/<user>/...`, or any developer's local clone / output / data / run-space path — into **any file tracked in
this repo**: docs (`limelight_features_docs/`), code, comments, `CLAUDE.md`, everything. This repo is **public**
and paper-cited; an absolute host path leaks private infrastructure layout, is useless to anyone else, and rots
(it's specific to one box).

- **Refer to locations generically instead:** the repo/service name ("the `limelight-flashlfq-service` repo
  clone"), a repo-relative or output-relative path (`flashlfq_output/QuantifiedPeptides.tsv`), a config/env-var
  name, or "the run-space data volume" — never the absolute host path. Keep the shareable fact (what the file is,
  its columns, which repo it's in) and drop the host path.
- **The only place a machine path may live is under the repo-root `.claude/` directory**, which is **gitignored**
  (`.gitignore`: `/.claude/` and `**/.claude`, verified) so it is never committed. Machine-specific scratch notes
  go there, not in tracked files.
- **Before committing a doc/code change, scan it** for `/data/`, `/spinning-disk-02/`, `/home/`, and similar
  host-absolute paths and remove them.

Why: a machine path in a public repo is a hard-to-undo leak once pushed/indexed, and exposes internal infra
layout.
