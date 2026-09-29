# Gradle dependency management — shared libraries, transitive flow, and versioning

This repo has **no single root Gradle build**. Each deployable module
(`limelight_webapp`, `limelight_importer`, `limelight_run_importer`,
`limelight_feature_detection_run_import`, `limelight_submit_import`) has its own
`settings.gradle` that **includes the shared library modules as subprojects**
(`limelight_shared_code`, `limelight_importer_run_importer_shared`,
`limelight_submit_import_client_connector`, the DB-maintenance libs). The build is
driven by **Ant, which invokes Gradle** — most importantly the webapp's Ant script runs
the front-end build first and then the webapp Gradle build. (A single root Gradle build
was attempted and abandoned; Ant-drives-Gradle is the committed approach.)

Because there is no root build / version catalog, **the way we keep a common dependency
at one version across modules is to declare it once in the shared library module and let
it flow transitively to the deployable modules and into their deployed `.jar` / `.war`.**

## The rule

**Common libraries that the shared code owns are declared ONCE in
`limelight_shared_code` (or the relevant shared library) and NOT re-declared in the
deployable "leaf" modules.** To bump such a dependency, edit only the shared module.

- Use **`api`** for a shared dependency whose types the leaf modules compile against
  (they `import` it). `api` puts it on each consumer's **compile *and* runtime**
  classpath transitively, so the leaf compiles without its own declaration and the
  library lands in the deployed artifact.
- Use **`implementation`** (or `runtimeOnly`) for a shared dependency that leaf modules
  only need at **runtime** (a provider they don't compile against). It still flows onto
  the consumer's runtime classpath transitively and into the deployed artifact — it just
  isn't exposed to their compile classpath.

### Why (the incident this prevents)

`jackson-databind` was declared in both `limelight_shared_code` (2.22.1) and each leaf
(2.22.2). A security bump updated the leaves but missed the shared module, so the shared
subproject kept resolving the vulnerable 2.22.1 — which showed up in every module's
dependency graph and kept a Dependabot HIGH open. One declaration in one place removes
that whole class of "bumped some modules, forgot others" drift.

## Centralized dependencies (in `limelight_shared_code`)

These are declared once in `limelight_shared_code` and inherited by the plain-Java
deployable modules — **do not re-declare them in `limelight_importer`,
`limelight_run_importer`, or `limelight_feature_detection_run_import`** (nor in
`limelight_importer_run_importer_shared`, which also consumes `limelight_shared_code`):

- `com.fasterxml.jackson.core:jackson-databind` — `api`
- `com.fasterxml.jackson.core:jackson-core` — `api`
- `jakarta.xml.bind:jakarta.xml.bind-api` — `api`
- `org.glassfish.jaxb:jaxb-runtime` — `implementation`/`runtimeOnly` (runtime provider)
- `org.slf4j:slf4j-api` — `api`
- `org.apache.commons:commons-lang3` — `api`

(`commons-dbcp2` stays declared in the modules that use it — it is not owned by
`limelight_shared_code`.)

## The webapp is a deliberate exception — do NOT consolidate its deps into shared

`limelight_webapp` keeps its own dependency declarations. Two reasons:

1. **Spring Boot BOM (`io.spring.dependency-management`).** The webapp's dependency
   versions are *managed* by the Spring Boot BOM, which applies **override** semantics:
   it forces a managed dependency to the BOM's version even when a transitive dependency
   (e.g. from `limelight_shared_code`) requests a different version. So a version set on a
   shared `api` dependency does **not** change the webapp's resolved version for anything
   the BOM manages — the webapp uses the Spring-tested version. (Observed: shared brings
   jackson-databind 2.22.x into the webapp build, yet the webapp resolves the BOM's
   2.21.5.) Consequently, the versions declared in `limelight_shared_code` govern the
   **non-Spring** importer modules; the webapp follows its BOM.
2. **JAXB javax↔jakarta coexistence.** The webapp intentionally carries both a javax
   JAXB-2 runtime (for bundled yeastrc client-connector jars) and jakarta JAXB-4, and the
   WAR build is sensitive to duplicate `WEB-INF/lib` JAXB entries (see the root
   `CLAUDE.md`, "Dependency updates: the JAXB Java-8 vs Java-25 split"). Do not disturb
   the webapp's `jakarta.xml.bind-api` / `jaxb-runtime` / `jaxb-impl` declarations by
   consolidating them into shared.

## Caveat: compiled-against vs run-against version

Because the shared module compiles against the version it declares, but is bundled into a
deployable module that may resolve a *different* version at runtime (e.g. the webapp's BOM
version, or a leaf's higher pinned version), the shared classes can run against a version
they were not compiled against. This is the normal transitive-dependency situation and is
benign for backward-compatible minor upgrades (e.g. Jackson 2.x), but a shared class that
calls an API *added* in a newer version than the runtime provides would fail at runtime.
Keep shared's usage to stable APIs, and prefer keeping the shared and webapp-BOM versions
of a given library close.

## How Dependabot sees this (dependency-submission)

Gradle dependencies are reported to GitHub's dependency graph by
`.github/workflows/dependency-submission.yml`, which resolves each deployable module's
build (each of which includes the shared subprojects) and submits the fully-resolved
graph. That means **a version resolved in `limelight_shared_code` appears in the graph of
every module that includes it** — so a stale version in the shared module raises alerts
attributed to all of them. Fixing the one shared declaration clears them together. To
confirm after a change, check the submitted SBOM
(`gh api /repos/<owner>/<repo>/dependency-graph/sbom`) or run
`./gradlew :<module>:dependencyInsight --configuration runtimeClasspath --dependency <group:name>`.
