# FlashLFQ quant charts — original plan (2026-09-23) — SUPERSEDED

> **Replaced 2026-11-16.** This file used to hold the investigation and phased plan (2026-09-23 → 2026-09-26) for adding FlashLFQ
> quant charts to the Quant Common peptide / protein pages. That working document was retired from the repo; this short note keeps the
> file name, which code comments still cite. Nothing here is current design.

**Where the current record is:**
- What the page does now: the Quant QC page overview,
  [`quant_common_page__charts_view__design_and_status_2026-10-01.md`](quant_common_page__charts_view__design_and_status_2026-10-01.md).
- Why (every decision, with alternatives and history):
  [`quant_common_page__charts_view__decision_log_and_rationale_2026-10-04.md`](quant_common_page__charts_view__decision_log_and_rationale_2026-10-04.md)
  — §1 (foundational constraints from this plan) and §2 (the change of data source).

## What was planned

- Draw charts of a FlashLFQ quant run with Plotly in the browser, computing the statistics in TypeScript (no server-side images, no
  new Java statistics endpoints; decision log §1), on the then Quant Common peptide and protein pages, in three phases:
  1. abundance-only QC charts (CV, missingness / MNAR, identification depth, per-sample abundance boxplot, dynamic range);
  2. sample-metadata-aware charts (condition / batch coloring, PCA, sample correlation heatmap, study-design charts);
  3. differential abundance (a contrast-definition UI, a limma-style moderated t-test with BH adjustment, volcano and p-value charts),
     as a separate, larger feature.
- A later step (2026-09-26) added a Raw / Normalized choice fed by the FlashLFQ service's median-normalized result files.

## What was built, and what changed

- **The data source changed (decided 2026-09-30, in place by 2026-10-01).** The plan read the quant values the pages had already joined to Limelight reported peptides.
  The charts now read the run's FlashLFQ result files directly (one FlashLFQ row = one peptide or protein, no reported-peptide mapping),
  through the webservice `d/rws/for-page/quant--flashlfq-combined-result-file`
  (`Quant_FlashLFQ_CombinedResultFile_Retrieval_RestWebserviceController`). Decision log §2.
- **Normalized data:** the FlashLFQ service writes each median-normalized derivative on two scales, linear
  (`CombinedPeptides.normalized.linear.tsv` / `CombinedProteins.normalized.linear.tsv`) and log2 (`….normalized.log2.tsv`), plus
  `normalize_status.json`. The normalized files are a complete-case subset (features finite and > 0 in every sample). Limelight reads
  **only the linear** files and applies its own log2 per chart, exactly as for the raw values; the log2 files are deliberately not read
  (no consumer). Normalization is best-effort on the service side: a run can be READY with normalization FAILED, and the page then shows a
  banner and no normalized state.
- The two per-page proxy controllers that Phase B added for the linear files
  (`FlashLFQ_Run__Result_Retrieval_Peptides_Normalized_Linear_RestWebserviceController`,
  `FlashLFQ_Run__Result_Retrieval_Proteins_Normalized_Linear_RestWebserviceController`) are now commented out; the combined-result-file
  webservice above serves those files instead.
- The page itself became the single Quant QC page (decision log §25), showing one chart at a time per tab (§26).
