# Design Discussion: Single Source of Truth for Webservice DTOs (Java ↔ TypeScript)

Status: **exploratory design notes** (not a committed plan). Captured 2026-06-24.

This document records a design discussion about defining each webservice request/response
contract in **one place** and generating both the **Java DTO classes** (server side) and the
**TypeScript types** (front end) from it, so the two sides cannot silently drift.

> **Goal (confirmed):** a single source of truth so we stop *wondering whether the Java and
> TypeScript sides still match*. Today both sides are hand-written and kept in sync by hand.

---

## 1. Current state (how the contract is defined today)

- Webapp REST endpoints are Spring MVC `@RestController` classes (~220 of them). The
  TypeScript/esbuild front end (`limelight_webapp/front_end`) calls them.
- **Every webservice is POST**, with the TS client sending a **JSON request body** and getting
  a **JSON response body**. There is effectively no GET/query-param/path-param REST surface to
  model — it is uniform **RPC-over-POST**.
- The controller methods are deliberately written as:

  ```java
  @PostMapping( path = { ... }, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE )
  public @ResponseBody ResponseEntity<byte[]> webserviceMethod(
          @RequestBody byte[] postBody,
          HttpServletRequest httpServletRequest,
          HttpServletResponse httpServletResponse ) throws Exception {
      ...
  }
  ```

  i.e. the method takes `@RequestBody byte[]` and returns `ResponseEntity<byte[]>`, and the
  **JSON↔Java marshalling is done by hand inside the method** (Jackson `ObjectMapper`), **not**
  by Spring binding. There is a specific reason for this, and **switching to "let Spring do the
  JSON" is not an option.**
- The Request/Result DTOs are currently `public static` **nested classes inside each
  controller**, and **many share the same simple name** across controllers (e.g.
  `WebserviceRequest` / `WebserviceResult`); only the enclosing controller disambiguates them.
  This nesting is **incidental** — "what I have now" (the project predates the TypeScript front
  end, and this approach was never reconsidered), **not** a hard architectural constraint. Dan
  is willing to move DTOs to external top-level classes if doing this seriously.
- The webapp DTOs carry **almost no Jackson annotations** (only ~2 `@JsonProperty` in the whole
  webapp), so the wire contract is just *field name → JSON key* by default.
- On the TS side, the request/response shapes are **hand-written again** as interfaces/classes,
  and the shared call helper (`webserviceCallStandardPost.ts`) returns essentially untyped
  `responseData` that callers cast.

**Net:** the contract is duplicated by hand on both sides, with Java as the de-facto source of
truth. Keeping them in sync is manual and error-prone.

---

## 2. What the `byte[]`/manual-marshalling design rules out

Because the method signatures are `byte[]` in and `ResponseEntity<byte[]>` out, **anything that
discovers the contract by introspecting the Spring endpoints sees only `byte[]`** and learns
nothing about the real DTOs. So these are **not viable**:

- ❌ **springdoc-openapi** (scans controller signatures/return types).
- ❌ **typescript-generator's REST-scanning mode** (`generateSpringApplicationClient` / JAX-RS
  scan) — same problem, and it cannot map path → types through an opaque `byte[]` body.

This is independent of where the DTO classes live; it is purely a consequence of the opaque
body type. (Note: the manual marshalling itself is **kept** under every option below — generated
*model classes/types* plug straight into the existing `objectMapper.readValue(postBody, X.class)`
/ `writeValueAsBytes(result)` calls. None of these options change how the controller reads or
writes the body.)

---

## 3. The two families of approach

### A. Java-first — keep Java authoritative, generate TS only

Point a generator at the **DTO classes themselves** (not the endpoints), so the `byte[]`
signatures are irrelevant.

- **`typescript-generator` (vojtechhabarta)** — Gradle plugin. Select DTOs via a marker
  annotation (`classesWithAnnotations`, e.g. `@LimelightWebserviceDTO`) rather than by simple
  name, and use a `customTypeNamingFunction` (which receives the fully-qualified `Outer$Inner`
  name) to produce collision-free TS names derived from the enclosing controller — either a
  **prefix** (`ProjectCreate__ProjectSaveRequest`) or by **mirroring the nesting as a TS
  namespace** (`ProjectCreate_RestWebserviceController.ProjectSaveRequest`). The naming function
  is **mandatory** here, not optional, because of the duplicate simple names.
- **Custom annotation processor** — a small compile-time processor that finds the marker-
  annotated nested classes and emits namespaced `.ts`. Full control, no third-party quirks; more
  upfront code.

**Limitation of Family A:** it keeps the **shapes** in sync but does **not** model the
endpoint → (request, response) wiring; the TS side still associates URL → type by hand, exactly
as today.

### B. Schema-first — one neutral definition generates **both** sides  ← current leaning

A neutral schema/IDL is the single source of truth; both the Java DTO classes and the TS types
(and optionally a typed client) are generated from it.

This is the direction Dan leans toward "if doing it seriously," explicitly accepting that the
**Java DTOs move out of the controllers into external generated classes**. That is fine: moving
to external top-level classes also makes the **duplicate-simple-name problem vanish** (each
becomes a uniquely named class in a package), and the **schema file becomes the new "locality"**
that the nested classes used to provide.

Because every endpoint is uniform POST-JSON, the schema only has to express **message shapes**
plus one boilerplate **operation pattern** repeated ~220×.

| Source of truth | Java side | TS side | Notes |
|---|---|---|---|
| **JSON Schema** (per message) | `jsonschema2pojo` → POJOs w/ Jackson annotations | `json-schema-to-typescript` | Simplest; JSON-native (matches the wire format). Shapes only — keep an endpoint→types map by hand. Verbose to hand-author. |
| **OpenAPI** | `openapi-generator` (models only — keep manual marshalling) | `openapi-typescript` / `orval` → types **+ typed client** | Captures the endpoint wiring. Verbose, but uniform POST ops are easy to template. |
| **TypeSpec** → emits OpenAPI → above | (via OpenAPI) | (via OpenAPI) | Concise: define one "Limelight POST op" pattern once, then ~220 one-liners. Nicest authoring; newer tool to learn. |
| **Protobuf / Smithy / Avro** | protoc / Smithy / Avro | ts-proto, protobuf-ts, Smithy-TS | True multi-language IDL, strongest typing, but moves off plain-JSON POJOs and is **overkill** unless binary/gRPC is also wanted. |
| **quicktype** | Java out | TS out | Feed a JSON sample or JSON Schema → both. Good for **bootstrapping**, weak for long-term governance. |

> **The bigger payoff of Family B:** if you model the *endpoints* (OpenAPI / TypeSpec), not just
> the data shapes, you can generate a **typed TS client** — each call site is bound to that
> URL's request **and** response types. Change the schema and *both* the Java model and the TS
> call site break at compile time. That is the real cure for "always wondering if they match,"
> and it is strictly more than the hand-written interfaces ever provided.

**Recommended sweet spot:** given the all-POST-JSON uniformity,
**TypeSpec → OpenAPI → (`openapi-generator` Java models + a TS client generator)**. You write one
reusable POST-operation template and each endpoint is a couple of lines, and you get end-to-end
typed calls. **JSON Schema + `jsonschema2pojo` + `json-schema-to-typescript`** is the minimal
version if you only care that the *shapes* match and are content to keep the endpoint map by hand.

---

## 4. Migration (no big-bang)

- Stand up the schema + codegen pipeline once.
- Go **schema-first for new endpoints** from day one.
- **Migrate existing endpoints opportunistically** — when you next touch a controller.
- **Seed** the existing message shapes rather than hand-writing ~220 schemas: reverse-generate
  starter schemas from the current Java DTOs (reflection dump) or from captured sample JSON
  (e.g. quicktype), then hand-curate.

---

## 5. Codegen workflow & build/CI integration

The decided shape of the workflow (Dan's preference):

- **Generated code IS checked in.** Commit the generated `.java` (and `.ts`) so you can code
  against real files with full IDE support and so regenerated output shows up in PR diffs. Mark
  them as generated (`// GENERATED — do not edit` header; `.gitattributes` `linguist-generated`
  so GitHub collapses them).
- **Run codegen whenever a schema changes.** Implement it as a **Gradle task with declared
  inputs (schema files) and outputs (generated dir)** so Gradle's up-to-date check means it only
  regenerates when a schema actually changed — normal builds are a no-op and the working tree
  stays clean unless a schema was edited.
- **Commit together:** schema change + regenerated `.java`/`.ts` in the same commit.
- **`compileJava` depends on the gen task.** Because it's incremental it's a no-op when schemas
  are unchanged, but it guarantees you never compile locally against stale generated classes.
- **CI drift guard (GitHub Actions):** after building, run the gen task and then

  ```bash
  git diff --exit-code -- path/to/generated   # nonzero exit -> fail the job
  ```

  A non-empty diff fails the build, which is exactly what we want — it catches both *"changed a
  schema but didn't commit the regenerated code"* and *"hand-edited a generated file."*

### Critical prerequisite: deterministic output

For `git diff --exit-code` to be trustworthy, codegen output must be **byte-stable** across runs
and machines, or CI will false-fail. Lock down:

- **Pin the generator version** (`jsonschema2pojo` / `openapi-generator`) — a version bump
  reshuffles output.
- **Disable generation timestamps / "generated on" headers** (e.g. `openapi-generator`
  `hideGenerationTimestamp=true`).
- Confirm the generator emits in **stable order** (not dependent on filesystem iteration order).

Since the build is **Ant-orchestrates-Gradle** (Ant is a thin wrapper; Gradle is the real Java
build), the gen task is just another Gradle task in the chain, and the GitHub Actions docker
build runs it the same way — so this flows through the existing pipeline.

---

## 6. Suggested next step (a contained spike)

Before committing to a pipeline, do a **one-endpoint spike** to judge authoring ergonomics and
generated-code quality:

1. Pick one existing POST endpoint.
2. Hand-write its request/response in **TypeSpec** (or raw **JSON Schema** to skip the new tool).
3. Run the codegen.
4. Wire the generated Java model into that controller's manual `readValue`/`writeValue`, and the
   generated TS into its call site.
5. Run the gen task **twice** and confirm `git diff` is empty (determinism check) before building
   anything around it.

---

## 7. Open decisions

- **Source format:** TypeSpec vs OpenAPI vs plain JSON Schema (i.e. typed-client payoff vs
  minimal shapes-only).
- **Do we model endpoints (for a typed client) or just message shapes?**
- **Where generated Java classes live** (which module/package) and how schemas are organized
  (per-endpoint files vs per-feature grouping).
- Nothing is finalized yet.
