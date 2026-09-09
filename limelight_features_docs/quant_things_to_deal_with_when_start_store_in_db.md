# Quant: things to deal with when we start storing quant in the DB (Track B)

**Status: FUTURE / DESIGN NOTES — NOT implemented now.** This is a forward-looking design memo for the
eventual **DB-backed quant ingest ("Track B")**, where quant results are parsed once at import time and stored
in Limelight's database, instead of the current throwaway prototype that fetches a quant program's raw output
files on demand and interprets them per-render in the front end.

Today (prototype): the front end pulls a FlashLFQ run's output files (`QuantifiedPeptides.tsv` for the peptide
page / `QuantifiedProteins.tsv` for the protein page) through Limelight webservices and interprets program-specific values live in the
browser. That does not scale to multiple quant programs and re-derives meaning on every page load. The notes
below are the things a DB-backed design should get right up front.

---

## 1. Track which quant PROGRAM produced each run, and attribute program-specific sentinels to it

FlashLFQ is the only quant program wired in today, but it will not be the only one. Every stored quant run
should record **which program produced it** (program name + version), because the raw values — and especially
the **sentinel / special values** — are program-specific and only meaningful in the context of that program.

- Store the producing program (and version) per run.
- When a value is a program-specific sentinel (see §2), attribute it to that program so nothing downstream
  has to guess "what does this odd value mean?" from the number alone.
- Do not hardcode "FlashLFQ" assumptions into shared storage/display code; route program-specific
  interpretation through a per-program adapter keyed by the stored program identity.

## 2. Translate program-specific values into a common, program-agnostic representation AT STORE TIME

Interpret each program's special values **once, at ingest**, into a small common vocabulary — rather than
re-interpreting raw program output on every render (which is what the prototype does today).

**First concrete, code-verified example — FlashLFQ's `NaN` protein intensity:**

- FlashLFQ writes the literal token **`NaN`** for a protein's intensity in `QuantifiedProteins.tsv` (mzLib
  `ProteinGroup.cs` emits the intensity via a plain `double.ToString()`, and the value is `double.NaN`).
- That `NaN` is a **deliberate sentinel** from FlashLFQ's median-polish protein quantification
  (**mzLib `FlashLFQResults.cs:569`**): the protein **is detected and its peptides ARE quantified**, but it is
  **not quantifiable *across runs*** because **no single peptide is quantified in ≥ 2 scan files** — there is no
  shared "anchor" peptide to place the runs on a common intensity scale, so median polish cannot produce a
  protein-level number.
- It is therefore **NOT "absent"** (that is a blank / no row) and **NOT `0`** (that is "measured, no signal").
  It is a distinct third meaning: *detected, but not quantifiable across runs.*
- **JSON has no `NaN`/`Infinity` number.** A `NaN` double must never reach the JSON serializer (Jackson). So
  even in the prototype, the server now converts a non-finite parsed intensity to a **String token** with a
  **null numeric intensity**, and the front end surfaces it as a distinct state rather than crashing. (See the
  prototype implementation: `FlashLFQ_Run__Result_Retrieval_Proteins_RestWebserviceController` server-side, and
  `flashlfq_proteinQuant_PrototypeData.ts` / the protein-list renderer front-end.)

For a DB-backed design, the ingest step should map this FlashLFQ `NaN` to a **common, program-agnostic
"not quantifiable across runs" status** on the stored record (a small enum/flag), so that:
- storage never holds a non-finite number;
- display code reads a program-agnostic status, not a FlashLFQ-specific token;
- a different program's equivalent situation maps to the **same** common status even if that program spells it
  differently (a different token, an empty cell + a side flag, etc.).

Other program-specific values to expect and normalize at store time (non-exhaustive): "detected but not
quantified", "ambiguous / overlapping signal" (FlashLFQ's `MSMSAmbiguousPeakfinding`), match-between-runs
provenance, and any program's own infinity/overflow sentinels. Each maps to a common representation once.

## 3. Store the human explanation / tooltip ONCE per run (or by an assigned message id), not per render

The prototype hardcodes the user-facing explanation strings (cell text, tooltip, warning-box copy) at each
render site. For DB-backed quant, store the explanation **once** — e.g. attach the human-readable
meaning to the run (or to the common status value) via an **assigned message id** that display code resolves —
rather than duplicating the prose across renderers. Benefits: one place to edit wording, consistent text
everywhere, and the ability to vary the explanation by producing program while keeping display code generic.

## 4. Generic multi-program support

Design storage + retrieval + display to be **program-agnostic** end to end:
- a per-program **ingest adapter** parses that program's output and emits common records (value + common
  status + program identity + optional program-specific detail);
- **storage** holds the common representation (never a non-finite number, never a raw program token as the
  primary value);
- **display** reads only the common representation + resolves explanation text by message id (§3), with
  program identity available for attribution ("reported by FlashLFQ as …").

This keeps adding a second/third quant program a matter of writing a new ingest adapter, not touching shared
storage or display code.

---

*Cross-reference:* the current prototype's non-finite handling (the first real case of §2) lives in the
FlashLFQ protein-quant path; see the code comments there for the exact server→FE marker shape. This doc is the
place to record additional program-specific quirks as they are discovered, so the eventual DB design starts
from a real list rather than a blank page.
