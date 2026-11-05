# FlashLFQ: MS1-only spectra reading, mzML requirements, and per-file memory lifecycle

**Bottom line.**
- FlashLFQ quantifies from **MS1 scans only**. MS2 spectra in the scan file are parsed and then discarded.
- PSMs are linked to the MS1 data **by retention time only**, not by scan number.
- With multiple scan files, FlashLFQ processes **one file at a time** and frees each file's peak index
  before reading the next. MBR does keep each file's index between passes, but on disk, not in memory.
  IsoTracker is the exception that keeps a (pruned) index for every file in memory.

**Provenance.** Every claim below was OBSERVED by reading source at the cited `file:line` (verified
2026-10-14), except where marked *inferred*. Nothing here was measured by running FlashLFQ. Line numbers
drift; grep the quoted symbol if a line has moved.

**Source version examined.** FlashLFQ's engine lives in **mzLib** (`github.com/smith-chem-wisc/mzLib`).
The code read here is mzLib tag **`1.0.566`** (commit `703edec3`). That is the exact version FlashLFQ's
command-line build references (`FlashLFQ` repo `CMD/CMD.csproj:18`:
`<PackageReference Include="mzLib" Version="1.0.566" />`, FlashLFQ commit `ee2a86dc`). All mzLib paths
below are relative to `mzLib/` in that repo.

Related docs:
- `limelight-flashlfq-service` repo, `docs/MZML_FLASHLFQ_REQUIRED_FIELDS.md`: the mzML header fields the
  service writes so mzLib can open the file. That doc and this one agree that the file can be MS1-only
  with scan-number gaps.
- `flashlfq_retention_time_units_confirmation.md`: RT is in minutes end to end.
- `quant_profile_centroid_detection__all_ms_levels_gate.md`: why the centroid gate covers all MS levels.

---

## 1. Only MS1 scans are used

- `FlashLFQ/PeakIndexingEngine/PeakIndexingEngine.cs:36-37`: opens the file with
  `MsDataFileReader.GetDataFile(fileName)` and calls `LoadAllStaticData()`, which loads **every** scan.
- `PeakIndexingEngine.cs:50-53`: keeps only
  `dataFile.GetMS1Scans().Where(i => i != null && i.MsnOrder == 1).OrderBy(i => i.OneBasedScanNumber)`.
  The method's doc comment says "This method ignores MS2 scans when indexing".
- `MassSpectrometry/MsDataFile.cs:85-96`: `GetMS1Scans()` itself returns only scans with `MsnOrder == 1`.
- This is the **only** place the FlashLFQ engine reads spectra. Grepping `FlashLFQ/` for
  `MsDataFileReader`, `GetMS1Scans` and `MsnOrder` finds only this file.

## 2. PSMs connect to the MS1 data by retention time only

- `FlashLFQ/Identification.cs:22-26`: the `Identification` constructor takes `ms2RetentionTimeInMinutes`,
  charge, monoisotopic mass and sequence. It takes **no scan number** and no MS2 spectrum.
- `FlashLFQ/FlashLfqEngine.cs:510-514`: peak finding starts with
  `GetXic(identification.PeakfindingMass.ToMz(chargeState), identification.Ms2RetentionTimeInMinutes, …)`.
- `MassSpectrometry/PeakIndexing/IndexingEngine.cs:87-106`: `GetXic` takes the **last MS1 scan whose RT
  is less than the PSM's RT** as its starting point, then traces backward and forward from it.
- Consequences:
  - The PSM RTs and the mzML's MS1 RTs must be in the same units and on the same clock.
  - A PSM whose RT is at or before the first MS1 scan leaves the starting index at `-1`
    (`IndexingEngine.cs:91`, where `scanIndex = -1` is never updated).

## 3. Scans are tracked by position; the `scan=` in the spectrum id is ignored

- `IndexingEngine.cs:34-49`: `IndexPeaks` assigns each MS1 scan a 0-based position in the sorted array.
  Every indexed peak and every `ScanInfo` record stores that position.
- `MsDataFile.cs:99-105`: `GetOneBasedScan(i)` returns `Scans[i - 1]`, i.e. it looks scans up by position.
- `Readers/MzML/Mzml.cs:769`: the mzML reader sets `oneBasedScanNumber = oneBasedIndex`, the spectrum's
  position in `spectrumList`. It does **not** parse the nativeID (`id="scan=<n>"`).
- `Mzml.cs:61, 790-793`: the only override is a **`MS:1000797`** cvParam on `<scanList><scan>`.
- **So an MS1-only mzML without `MS:1000797` is always numbered 1..N with no gaps**, regardless of the
  `scan=` ids. This is why the service's MS1-only file with gappy `scan=` ids works.
- **If `MS:1000797` is ever written:**
  - A duplicate value throws `"Scan number … appeared multiple times"` (`Mzml.cs:183-186`).
  - Out-of-order values make the reader rebuild the scan array by scan number (`Mzml.cs:195-202`),
    which can leave null slots. `GetMS1Scans()` then reads `scan.MsnOrder` with no null check
    (`MsDataFile.cs:91-92`). *Inferred, not run:* a NullReferenceException.
  - Either leave `MS:1000797` out or make it strictly increasing. (As of 2026-10-14 the service does
    not write it: grepping `limelight-flashlfq-service/app/` for `1000797` finds nothing.)

## 4. What each MS1 spectrum needs (mzLib mzML reader)

- **`MS:1000511` (ms level)**: this is how a spectrum is recognized as MS1 (`Mzml.cs:55, 744-747`).
- **`MS:1000127` (centroid spectrum)**: required. If it is missing, the reader returns the scan with no
  spectrum (`Mzml.cs:796-801`) and drops it (`Mzml.cs:172`). The scan **silently disappears**.
  - If ms level is missing, that same branch calls `msOrder.Value` (`Mzml.cs:804`). *Inferred, not run:*
    an exception.
- **Profile mode is rejected.** `MS:1000128` throws `"Reading profile mode mzmls not supported"`
  (`Mzml.cs:50, 752-754`), for **any** MS level. See the centroid-gate doc linked above.
- **Retention time is `MS:1000016` on `scanList.scan[0]`.** If `unitName == "second"` it is divided by
  60; any other unit is taken as minutes (`Mzml.cs:62, 774-780`).

## 5. Memory: one scan file at a time

### The run loop
`FlashLFQ/FlashLfqEngine.cs:204-245` handles the scan files in a plain sequential `foreach`. For each
file it:
1. reads and indexes the file (`InitializeIndexingEngine`, line 207),
2. quantifies that file's PSMs (`QuantifyMs2IdentifiedPeptides`, line 217),
3. then frees or saves that file's index (lines 221-237) before the next file.

### What happens to each file's index

| Settings | After the file is quantified | Held in memory across files |
|---|---|---|
| MBR off, IsoTracker off | `ClearIndex()` (line 236) sets the peak index to null and runs `GC.Collect()` (`PeakIndexingEngine.cs:70-74`) | Only `ScanInfoArray` (scan number, position, RT, MS level per scan), which `ClearIndex` does not touch |
| **MBR on**, IsoTracker off | `SerializeIndex()` (line 234) writes it to disk, then `ClearIndex()` | Same as above; the index waits on disk for the MBR pass |
| **IsoTracker on** | `PruneIndex(targetMzs)` (line 227) shrinks the index to the m/z values IsoTracker needs but keeps it in memory | **A pruned index for every file**, until line 261 clears them all |

The MBR pass is also one file at a time: for each file it loads the index back from disk, runs MBR, then
clears it (`FlashLfqEngine.cs:269-281`).

### Where the memory peak is
The peak is **inside a single file's read and index step**, not across files:
- **The whole mzML is loaded, MS2 included.** The `Mzml` constructor deserializes the entire document
  with an `XmlSerializer` (`Readers/MzML/Mzml.cs:127-148`). `LoadAllStaticData` then decodes every
  spectrum into an `MsDataScan` (`Mzml.cs:160-172`). The MS1 filter only runs after that
  (`PeakIndexingEngine.cs:50-51`).
- **The index is a separate copy of every MS1 peak.** Each peak becomes its own
  `IndexedMassSpectralPeak` object holding scan position, m/z, RT and intensity
  (`MassSpectrometry/PeakIndexing/IndexedMassSpectralPeak.cs:6-12`, built at `IndexingEngine.cs:44-49`).
- **The raw file data should be freed once indexing finishes.** The reader is a local variable
  (`PeakIndexingEngine.cs:36`), the index copies values rather than referencing the scans, and the index
  keeps only the file's `SpectraFileInfo` (`PeakIndexingEngine.cs:40`). *Inferred from those references,
  not confirmed with a memory profile:* the garbage collector can reclaim the reader after indexing.

## 6. Implications for the Limelight FlashLFQ service

- **Writing an MS1-only mzML lowers peak memory.** mzLib loads the entire document, so MS2 spectra left
  out of the file are never loaded. FlashLFQ would discard them anyway. The service already writes
  MS1-only (see `MZML_FLASHLFQ_REQUIRED_FIELDS.md`).
- **MBR writes a file next to each mzML.** `SerializeIndex` writes `<filename>.ind` into the spectra
  file's own directory (`PeakIndexingEngine.cs:76-85`). `DeserializeIndex` reads it back and deletes it
  (`PeakIndexingEngine.cs:87-98`). So the mzML directory (the service's `--rep` directory) must be
  writable and have room for every file's index during a multi-file run.
  - MBR is effectively always on for multi-file service runs. `limelight-flashlfq-service`
    `app/flashlfq_command.py:14-17` notes that FlashLFQ's `--mbr` defaults to TRUE and cannot be
    turned off from the command line in this build.
- **IsoTracker is off for service runs.** It defaults to false (`FlashLFQ/FlashLfqParameters.cs:26`),
  and nothing in the FlashLFQ repo outside tests references it, so the command line cannot enable it.
  The "every file's pruned index stays in memory" case does not apply to the service.
