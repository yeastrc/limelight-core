# Front End — Conventions & Build

This directory is the entire TypeScript/React front end (all `.ts`/`.tsx` in the repo live under `src/`). **Match the surrounding code.** The rules below are the established house style.

---

## Naming: underscore = private / file-scoped

- **File-scoped variables and functions, and class properties (instance _and_ static), start with a leading `_`** to mark them as private to that file or class.
  - e.g. `const _myHelper = ...`, `private _spinnerManager`, `private static _CACHE`.
- **If something becomes exported, or a class member becomes non-private, remove the leading `_`.** A leading underscore must never appear on an exported / public name.

## Naming: exported symbols are prefixed with their source file

Exported names should be long and self-describing so an IDE autocomplete entry tells you exactly where the symbol comes from (short names don't carry enough information).

- **Every exported symbol is prefixed with its source file's basename, using `__` as the separator**, and has no leading underscore:
  - `<fileBasename>__<name>`
  - e.g. in `chromatogram_Common_Helpers.ts`:
    `export const chromatogram_Common_Helpers__ISOTOPE_PLOT_TRACE_COLORS = [...]`
  - e.g. in `chromatogram_Common_Options.ts`:
    `export enum chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum {...}`
- **This applies to all export kinds** — consts, functions, enums, interfaces, and classes/components.
- **React component classes use a Capitalized prefix** (`Chromatogram_Common_OptionSelector_Components__...`), because JSX treats a lowercase-initial tag as a DOM/intrinsic element. The filename basename starts lowercase, so capitalize its first letter only for component classes.
- **Non-exported, file-local types** keep the existing `Internal__` marker prefix (e.g. `Internal__Foo_Component_Props`); they are not exported, so they get neither the filename prefix nor a leading `_`.

## Imports

- Import with **absolute module paths from `src/js`** (via the tsconfig `paths` mapping `"*": ["./src/js/*"]`), not relative `../../` chains:
  ```ts
  import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
  ```

---

## How the front end is actually built

**Entry point:** an Ant script calls Gradle. There is no npm build script — `package.json` `scripts` is empty, and `npm install` is run separately (it's slow) outside Gradle.

- `ant_buildFrontEnd_CopyToTomcat.xml` → Gradle `frontEndBuild_ForDevelopment` (front end only, copies to Tomcat).
- The parent-directory WAR build → Gradle `frontEndBuild_ForProduction`.

Both Gradle tasks run the same pipeline (production minifies; development does not minify the data-pages bundle and builds React in dev mode):

1. **`delete_outputDirs`** — clean output dirs.
2. **`run_Typescript_Validate__NoEmit`** — validate types with `tsc --noEmit` (no JS is emitted here; this is type-checking only). The `tsc` path can be overridden via `Typescript_Executable_OverridePath.txt` (e.g. to use `tsgo`).
3. **esbuild** bundles all JS/TS, one call per page group (header / admin / user / data pages). Flags: `--bundle --sourcemap --entry-names=[name]-bundle --outdir=...`; `--minify` for production. Entry points are listed in `build.gradle`. Output → `build/js_generated_bundles/<group>/`.
4. **webpack** (`runWebpack_ProductionMode` / `runWebpack_DevelopmentMode`) processes **SCSS only** — entry `src/styles/global.scss` → `build/css_generated/global.css`. Loaders: `sass-loader` → `css-loader` → `mini-css-extract-plugin`, minified by `css-minimizer-webpack-plugin`. See `webpack.config.js`.
5. **`gzipJsBundles`** — gzip every `.js` under `build/js_generated_bundles` (keeps the originals, writes `*.js.gz`).
6. **`copyFrontEndJS` / `copyFrontEndCSS`** — sync `build/js_generated_bundles` and `build/css_generated` into `../src/main/webapp/static/` for the WAR.

### Important build facts (don't reintroduce removed tooling)

- **esbuild does the TS/JS transpiling and bundling.** It does **not** use Babel. There is no `.babelrc` and no Babel dependency — don't add Babel config expecting it to run.
- **webpack handles SCSS only.** It does **not** process `.ts`/`.tsx` (no `ts-loader`, no `babel-loader`). Don't add JS/TS entry points to `webpack.config.js`; add esbuild entry points in `build.gradle` instead.
- **Type errors fail the build** at step 2 — keep `tsc --noEmit` clean.

### tsconfig notes

- `target: es2022`, `module: commonjs`, `jsx: "react"`.
- `strict: false`, but `noImplicitAny`, `noImplicitThis`, and `strictBindCallApply` are **on**; **`strictNullChecks` is off** — guard nullables explicitly where it matters.

### Linting

- ESLint flat config in `eslint.config.js` (minimal: `@eslint/js` recommended only). It is not part of the Gradle build.
