# Eclipse — which subdirs to import as Gradle projects

These subdirectories are **independent Gradle builds** that cross-include each
other by relative path (e.g. most include `../limelight_shared_code`). They are
**not** a single Gradle multi-project, so there is no clean one-shot import.
Ant remains the build tool (build-all and the webapp/front_end build); Gradle
import here is only for editing in Eclipse.

## Step 1 — register the Git repo FIRST (avoids an EGit error)

This is one git repo rooted at `limelight-core` (no `.git` in the subprojects).
A brand-new workspace knows no repos, so importing the projects before EGit knows
the repo fails with:

> Connecting Git team provider failed. See log for details.
> Error connecting project ..., no Git repositories found

Do this once per new workspace, **before** importing:

1. *Window > Show View > Other… > Git > Git Repositories.*
2. Click **Add an existing local Git repository**, browse to the repo root:
   `…/GIT_CLONE/limelight-core` → Finish.

Then the Gradle imports below auto-connect to it. (If you already imported and
hit the error: add the repo as above, then right-click each project >
Team > Share Project > Git > select `limelight-core` > Finish.)

## Step 2 — import these 5 (File > Import > Existing Gradle Project)

Importing only these top-level builds pulls the shared ones in automatically as
subprojects, covering all 10 project directories:

| Import (top-level build)              | Pulls in as subprojects                                   |
|---------------------------------------|-----------------------------------------------------------|
| `limelight_feature_detection_run_import` | limelight_shared_code, limelight_importer_run_importer_shared |
| `limelight_importer`                  | (shared_code, importer_run_importer_shared — already in)  |
| `limelight_run_importer`              | + limelight__db_populate_new_fields__common_code, limelight__database_cleanup__common_code__remove_data_from_database |
| `limelight_webapp`                    | (shared_code, db_populate, submit_import_client_connector — already in) |

### Shared subprojects (do NOT import directly — they arrive via the above)
- `limelight_shared_code`
- `limelight_importer_run_importer_shared`
- `limelight__db_populate_new_fields__common_code`
- `limelight__database_cleanup__common_code__remove_data_from_database`
- `limelight_submit_import_client_connector`
- `limelight_submit_import`

## Step 3 — webapp JSP / Servlet facet (limelight_webapp only)

If a JSP shows: *The default superclass, "javax.servlet.http.HttpServlet",
according to the project's Dynamic Web Module facet version (2.4), was not found
on the Java Build Path* — the `jst.web` facet was stamped at the stale **2.4**
(javax namespace) instead of matching the real Jakarta Servlet 6.1 runtime.

The build is set up to pin the facet to **6.0** (WTP's newest; jakarta
namespace — 6.1 doesn't exist as a facet): `limelight_webapp/web.xml` declares
`version="6.0"` and `build.gradle` pins it via the `eclipse.wtp.facet` block.
But **Buildship sometimes reverts the facet to 2.4 on import/refresh**. If that
happens, regenerate the correct facet file on disk:

```bash
cd .../limelight-core/limelight_webapp
./gradlew eclipseWtpFacet
```

then in Eclipse: select the project → **F5** (Refresh) → **Project > Clean**.
Eclipse reloads the 6.0 facet and the error clears. (Alternatively set it once
in **Properties > Project Facets > Dynamic Web Module = 6.0**.)

Do NOT run **Gradle > Refresh Gradle Project** to fix this — that is the step
that can re-stamp 2.4; use F5 + Clean so Eclipse just reloads the file on disk.

## Notes
- **Order / duplicates:** the shared projects are referenced by several builds.
  When you import the 2nd–5th build, Buildship sees those subprojects are already
  in the workspace and reuses them — that's expected. If it blocks on a
  duplicate, that project is already imported; skip it.
- **`limelight_webapp/front_end`:** do NOT import into Eclipse. It is an
  npm-built front end (edited in WebStorm) and is not `include`d by the webapp's
  Gradle build.
- **Why not one import:** a unifying root (multi-project or `includeBuild`
  composite) collides because shared dirs like `limelight_shared_code` would be
  part of more than one build. That's the failure behind the root
  `Z_Not_Works_*.gradle` files. Restructuring would fight the Ant build, so it's
  intentionally left as separate builds.
