# Gradle Version Upgrade Process

How to upgrade the **Gradle wrapper** across this repo — the proper way, with the
committed wrapper JAR/scripts refreshed and the distribution checksum pinned.

This repo is **public and referenced by scientific papers**, so build
reproducibility and supply-chain integrity matter: pin checksums, keep the
wrapper JAR an authentic official Gradle artifact, and verify before committing.

## Background — what the wrapper is

Each Gradle module carries a self-contained wrapper: **4 files**.

```
gradle/wrapper/gradle-wrapper.properties   # names the Gradle version (distributionUrl) + pinned checksum
gradle/wrapper/gradle-wrapper.jar          # bootstrap JAR: reads properties, downloads/caches, launches Gradle
gradlew                                    # POSIX launcher script
gradlew.bat                                # Windows launcher script
```

Only `gradle-wrapper.properties` names the version. The JAR is a version-agnostic
bootstrapper, so **editing `distributionUrl` alone is functionally enough** to run
a new Gradle — but it leaves the JAR and `gradlew*` scripts frozen at the old
version and pins no checksum. This document is the **full** upgrade (JAR + scripts
refreshed to the target version's official artifacts, distribution checksum pinned).

### Wrapper locations in this repo (12)

All 12 wrappers are kept **byte-for-byte identical**. Locations:

```
limelight__database_cleanup__common_code__remove_data_from_database
limelight__db_populate_new_fields__common_code
limelight_feature_detection_run_import
limelight_importer
limelight_importer_run_importer_shared
limelight_run_importer
limelight_shared_code
limelight_submit_import
limelight_submit_import_client_connector
limelight_webapp
limelight_webapp/front_end
tomcat_image_setup
```

## Process

Set the target version once:

```bash
VERSION=9.6.1          # <-- the Gradle version to upgrade to
```

### 1. Fetch the official checksums

Gradle publishes SHA-256 sums for both the distribution zip and the wrapper JAR:

```bash
DIST_SHA=$(curl -fsSL https://services.gradle.org/distributions/gradle-${VERSION}-bin.zip.sha256)
JAR_SHA=$(curl -fsSL  https://services.gradle.org/distributions/gradle-${VERSION}-wrapper.jar.sha256)
echo "dist: $DIST_SHA"
echo "jar : $JAR_SHA"
```

- `DIST_SHA` → goes into `distributionSha256Sum` (the wrapper verifies the
  downloaded distribution on every run).
- `JAR_SHA` → the expected hash of the committed `gradle-wrapper.jar`, used to
  prove the JAR we commit is the authentic official one (step 3).

### 2. Regenerate the wrapper in one pilot module

Run Gradle's own `wrapper` task **with the checksum flag** — this rewrites all 4
files to the target version and writes the pinned checksum into the properties:

```bash
cd limelight_importer_run_importer_shared      # any module works; this is a simple leaf lib
./gradlew wrapper --gradle-version "$VERSION" --gradle-distribution-sha256-sum "$DIST_SHA"
cd -
```

**"Run twice" nuance:** the `wrapper` task emits the JAR/scripts using the Gradle
version *currently running*. If the wrapper is still on the old version when you
start, run the command **twice** — the first run points `distributionUrl` at the
new version, the second run executes *under* the new version and emits its real
JAR/scripts. (If you first bump `distributionUrl` to the target version by hand,
a single run already executes under the new version — verify with step 3 either
way.)

### 3. Verify authenticity BEFORE trusting the JAR

The bootstrap download is only checksum-gated once `distributionSha256Sum` is in
place, so explicitly confirm the regenerated JAR is the official artifact:

```bash
OUR_JAR=$(sha256sum limelight_importer_run_importer_shared/gradle/wrapper/gradle-wrapper.jar | awk '{print $1}')
[ "$OUR_JAR" = "$JAR_SHA" ] && echo "✓ authentic official Gradle $VERSION wrapper JAR" || echo "✗ MISMATCH — do not commit"
```

Also sanity-check the properties now contain `distributionSha256Sum=$DIST_SHA`.

### 4. Propagate to the other 11 modules

The wrapper files are module-agnostic, so copying the 4 regenerated files to every
other wrapper dir is byte-for-byte what running the task in each would produce —
and keeps all 12 identical:

```bash
SRC=limelight_importer_run_importer_shared
for t in \
  limelight__database_cleanup__common_code__remove_data_from_database \
  limelight__db_populate_new_fields__common_code \
  limelight_feature_detection_run_import \
  limelight_importer \
  limelight_run_importer \
  limelight_shared_code \
  limelight_submit_import \
  limelight_submit_import_client_connector \
  limelight_webapp \
  limelight_webapp/front_end \
  tomcat_image_setup
do
  cp "$SRC/gradle/wrapper/gradle-wrapper.properties" "$t/gradle/wrapper/gradle-wrapper.properties"
  cp "$SRC/gradle/wrapper/gradle-wrapper.jar"        "$t/gradle/wrapper/gradle-wrapper.jar"
  cp "$SRC/gradlew"                                   "$t/gradlew"
  cp "$SRC/gradlew.bat"                               "$t/gradlew.bat"
done
```

### 5. Final verification (all 12 identical + pinned)

```bash
# all four wrapper files identical across all 12 dirs (1 distinct md5 each)
for name in gradle/wrapper/gradle-wrapper.properties gradle/wrapper/gradle-wrapper.jar gradlew gradlew.bat; do
  n=$(find . -path "*/$name" -not -path "*/node_modules/*" | wc -l)
  c=$(find . -path "*/$name" -not -path "*/node_modules/*" -exec sha256sum {} + | awk '{print $1}' | sort -u | wc -l)
  echo "$name : $n files, $c distinct"
done

# every properties carries the pinned distribution checksum
grep -rL "distributionSha256Sum=$DIST_SHA" $(find . -name gradle-wrapper.properties) \
  && echo "!! some not pinned" || echo "all pinned ✓"
```

Then build (or let CI build) to confirm the new Gradle works before committing.

## Notes & caveats

- **`-bin` vs `-all`.** These wrappers use the `-bin` distribution (`…-bin.zip`).
  If you ever switch to `-all` (bundles sources/docs for IDE navigation), fetch the
  `-all.zip.sha256` instead and pass a matching `distributionUrl`.
- **Quick-and-dirty alternative.** Editing only `distributionUrl` in each
  `gradle-wrapper.properties` still *runs* the new Gradle and is fine for a minor
  bump, but it does **not** refresh the JAR/scripts and pins **no** checksum. Use
  the full process above for anything you commit to this public repo.
- **CI hardening (recommended complement).** Pinning the *distribution* checksum
  protects builders; to also stop a tampered **`gradle-wrapper.jar`** from entering
  via a PR, add `gradle/wrapper-validation-action` (or
  `gradle/actions/setup-gradle` with `validate-wrappers: true`) to CI. It validates
  every committed wrapper JAR against Gradle's known-good hashes — the same
  `JAR_SHA` check as step 3, enforced automatically.
- **A dependency version bump is NOT a Gradle version bump.** This document covers
  only the Gradle *wrapper* version. Library upgrades live in each module's
  `build.gradle`; watch per-module Java-toolchain constraints there (e.g. the
  Java-8 modules `limelight_submit_import` / `limelight_submit_import_client_connector`
  must stay on the Java-8-compatible JAXB 3.0.x line — see `.github/dependabot.yml`).
