# FlashLFQ retention-time units: confirmed **minutes** end-to-end

**Bottom line.** FlashLFQ requires retention time (RT) in **minutes**, and the RT delivered to it by the
Limelight FlashLFQ service is in **minutes**. This was confirmed by direct source inspection of all three
components in the path: the Limelight webapp (this repo, `limelight-core`), the `limelight-flashlfq-service`
microservice, and FlashLFQ (from MetaMorpheus) itself.

**Provenance.** Every claim below is OBSERVED in source at the cited `file:line` (verified 2026-09-09). Line
numbers drift as code changes — grep the quoted symbol/string if a line has moved.

## 1. FlashLFQ requires RT in minutes

FlashLFQ reads its identification-input column named literally **`Scan Retention Time`** and stores it in the
field **`Ms2RetentionTimeInMinutes`**, reading the value **as-is** (no unit conversion on this input path):

- `FlashLFQ` — `Util/PsmReader.cs:631, 642` (and again `:763, 771`): recognizes the `Scan Retention Time`
  column and sets `MsmsRTColumn` to it.
- `FlashLFQ` — `Util/PsmReader.cs:298-300`: `ms2RetentionTime = retentionTime;` — the column value is used
  verbatim. *(The only seconds→minutes `/60` inside `PsmReader` (~`:304`) is gated to the PeptideShaker input
  format, which is NOT the format the Limelight service produces.)*

FlashLFQ also asserts the requirement explicitly:

- `FlashLFQ` — `GUI/MainWindow.xaml.cs:574-576`: warns when any `Ms2RetentionTimeInMinutes > 500` —
  *"It seems that some of the retention times in the PSM file(s) are in seconds and not minutes; **FlashLFQ
  requires the RT to be in minutes**."*

## 2. The Limelight webapp sends NO retention time — only a scan number + spectr key

For each PSM the webapp sends `scan_number`, `charge`, `peptide_sequence`, `reported_peptide_id`,
`full_sequence`, `monoisotopic_mass`, and protein accessions — **no retention time**. RT is resolved
downstream by the service. The per-scan-file object carries the Spectral Storage (spectr) key.

- `limelight-core` — `.../services/FlashLFQ_Run_GatherPsms_And_SendRequest_Service.java:933`
  (`Request_To_FlashLFQ_Service_Per_Psm`); fields at `:935` (`scan_number`), `:957` (`full_sequence`),
  `:964` (`monoisotopic_mass`). No RT field exists on this object.

## 3. spectr returns RT in seconds

- `limelight-flashlfq-service` — `app/spectr_client.py:29`: *"RT UNIT: spectr returns retentionTime in
  **SECONDS** (confirmed against a live payload …)."*
- `limelight-flashlfq-service` — `app/spectr_client.py:121`: `retention_time_seconds =
  float(raw.get("retentionTime", 0.0))` (stored as `retention_time_seconds`, declared `:51`).

## 4. The service converts seconds → minutes and writes the minutes value

- `limelight-flashlfq-service` — `app/request_processor.py:114`: builds `rt_seconds_by_scan` from spectr's
  scan metadata.
- `limelight-flashlfq-service` — `app/request_processor.py:129`:
  **`rt_minutes = None if rt_seconds is None else (rt_seconds / 60.0)`** — the seconds→minutes conversion.
- `limelight-flashlfq-service` — `app/request_processor.py:135`: writes it as
  `scan_retention_time_minutes=rt_minutes`.
- `limelight-flashlfq-service` — `app/flashlfq_identifications_tsv_writer.py:21, 45`: writes the
  **`Scan Retention Time`** column with that minutes value (`"%.5f"`).

## Consistency: spectra and identifications on the same (minutes) scale

The service's mzML writer applies the same normalization, so the spectra RT and the per-identification RT are
on the same **minutes** scale — which is what FlashLFQ needs to trace each identification's chromatographic
peak.

- `limelight-flashlfq-service` — `app/mzml_writer.py:105`: `rt_minutes = meta.retention_time_seconds / 60.0`.

## The chain, summarized

| Stage | RT units |
| --- | --- |
| Limelight webapp → service | *no RT sent* (scan number + spectr key only) |
| spectr → service | **seconds** |
| service → FlashLFQ (identifications TSV, `Scan Retention Time` column) | **minutes** (`rt_seconds / 60.0`) |
| FlashLFQ reads (`Ms2RetentionTimeInMinutes`) | **minutes** (required) |

## Related robustness guard (2026-09-09)

If spectr does not return a scan that a PSM references (so its RT is unknowable), the service **fails the whole
request** rather than writing an empty RT — an all-or-nothing guard in `limelight-flashlfq-service`,
`app/request_processor.py` (up-front check immediately after the spectr metadata fetch). This prevents a
missing-scan case from silently producing quant on blank/partial RT input.
