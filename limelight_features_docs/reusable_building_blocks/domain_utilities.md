# Reusable building blocks — Domain utilities (mass, annotations and cutoffs, lookup codes, mods, peptide identity, protein inference, sub-groups, experiments, statistics)

Part of the reusable-building-blocks inventory; start at [README.md](README.md) (keyword index, quick picks, duplicates).
Counts and user lists are as of 2026-11-09 and approximate; grep before relying on them.

The proteomics-specific building blocks: peptide mass and m/z (Java and front end), annotation types and filter cutoffs
(from the lookup-code JSON down to the cutoff SQL), default cutoffs, modification and open-modification handling and
mass rounding, the "distinct peptide" identity key, protein inference / NSAF / ABACUS / sequence coverage, trypsin rules,
I/L equivalence, terminus encodings, search sub-groups, experiment conditions, and the few statistics helpers.
**Mass rule:** do not add new mass computation (mass, m/z, residue tables); reuse the
calculators listed below.

Path abbreviations (all repo-relative):
- `J` = `limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp`
- `SC` = `limelight_shared_code/src/main/java/org/yeastrc/limelight/limelight_shared`
- `IMP` = `limelight_importer/src/main/java/org/yeastrc/limelight/limelight_importer`
- `FE` = `limelight_webapp/front_end/src/js/page_js`
- `DP` = `FE/data_pages`
- `PSB` = `DP/project_search_ids_driven_pages`
- `CF` = `DP/common_filtering_code_filtering_components__except_mod_main_page`

## Quick picks

| If you need... | Use this | Entry |
|---|---|---|
| Peptide mass or m/z in the browser | `DP/peptide_mass_utils/PeptideMassCalculator.ts` (+ `PROTON_MASS`, `C13_MASS_DELTA`) | Front-end PeptideMassCalculator |
| Peptide mass in Java (webapp) | `org.yeastrc.proteomics.peptide.peptide.PeptideMassCalculator` from the committed `yrc-proteomics.jar` | Java mass calculation |
| ANY new mass / m/z / residue-table code | do not add it; reuse an existing calculator listed here | Mass computation rule |
| PPM mass error with C13 isotope correction (front end) | QC `qc_Psm_PPM_Error__..._For_SingleSearch` (template) | PPM mass error |
| Display / group a mod or reporter-ion mass | `modificationMass_CommonRounding_ReturnNumber` / `reporterIonMass_CommonRounding_*` (2 decimals) | Mod / reporter-ion mass rounding |
| One key for "same peptide form" across searches | `create_reportedPeptide_CommonValue_EncodedString` | Peptide identity string across searches |
| Distinct-peptide rows with PSM counts | `create_GeneratedReportedPeptideListData__SingleProtein` | Generated peptide list builder |
| Protein groups / parsimony | `DP/protein_inference/ProteinInferenceUtils.ts` | Protein inference |
| NSAF or ABACUS adjusted spectral count | `DP/calculated_annotations/` calculators (call on the FINAL list) | NSAF and ABACUS |
| Protein sequence coverage | `ProteinSequenceCoverageData_For_ProteinSequenceVersionId` from the common-data loader | Protein sequence coverage |
| Trypsin cut sites in a protein | `FE/common_all_pages/trypsinCutPointsForSequence.ts` | Trypsin rules |
| Peptide flanking (pre/post) residues in Java | `SC/protein_coverage_common/Compute_Peptide_Pre_Post_Residues_..._Util` | Peptide pre/post residue |
| I/L-insensitive sequence matching (front end) | `get_PeptideSequence_I_To_L__For_PeptideId` / `get_ProteinSequence_I_To_L__...` on the common sequence loaders | I/L equivalence |
| Respect the user's cutoffs in a new per-search webservice | accept `SearchDataLookupParams_For_Single_ProjectSearchId`, convert with `SearcherCutoffValues_Factory` | Cutoff objects + factory |
| Reported peptides passing cutoffs for a search | `ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList` (never the searchers directly) | Filtered reported-peptide list |
| Default cutoffs for searches (server) | `SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds` | Default cutoffs builder |
| New lookup code for changed cutoffs (front end) | `updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts` | Search data lookup params: client side |
| Annotation types of a search, split by kind (Java) | `J/annotation_type_utils/GetAnnotationTypeData` | Annotation type data |
| Selected search sub-groups on a page | `searchSubGroup_Get_Selected_SearchSubGroupIds` | Sub-group selection (front end) |
| Searches per experiment condition | `Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer` statics | Experiment query helpers |
| p-values / z-test / mean / SD | jStat wrapper `Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls` | Two-proportion z-test + jStat wrapper |
| Benjamini-Hochberg q-values | `ModPage_QValueCalculator` (mod page only; copy or move to common) | BH q-values |

---

## Mass and m/z

### Mass computation rule and where the existing mass code lives
- What it solves: tells you where mass math already exists so you do not add another copy. Rule: do NOT add mass computation (peptide/protein/molecular mass, monoisotopic/average, residue tables, m/z <-> mass) to any module without asking first; reuse an existing calculator.
- Search keywords: mass, peptide mass, monoisotopic, average mass, m/z, mz, neutral mass, residue masses, amino acid masses, proton mass, isotope, C13, mass rule
- Location: existing mass code (each has its own entry below): front end `DP/peptide_mass_utils/PeptideMassCalculator.ts`; Java `org.yeastrc.proteomics` (`yrc-proteomics.jar` in `limelight_webapp/libs_webapp__yeastrc_github_jars/`) used by the APEX PSM download controller and by `J/web_utils/PSMMassCalculator` (unused); third-party Lorikeet library residue/ion masses; hand-written m/z / isotope steps in the APEX controller, chromatogram helpers, scan-file-browser plot and Lorikeet page.
- Used by: see the individual entries.
- How to use / extend: front end -> `PeptideMassCalculator.ts`; Java -> the `org.yeastrc.proteomics` `PeptideMassCalculator` (the standard library). Reuse it rather than extracting or adding mass code.
- Do not use when: n/a.
- Limits and gotchas: the importer does NO mass computation (only stores / rounds XML-supplied masses; grep for `PSMMassCalculator|PeptideMassCalculator` in `limelight_importer` finds nothing). `org.yeastrc.proteomics` is imported only in the webapp (2 files; spot-checked by grep).
- Related / duplicates: proton mass appears as `1.00727647` (front-end `PeptideMassCalculator.ts` and the APEX Java controller, spot-checked) and as a hard-coded `1.007276466621` in `PSB/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot.tsx`.
- Status: verified (pointer entry; details in the entries below)

### Front-end PeptideMassCalculator (peptide mass, m/z, mass constants)
- What it solves: monoisotopic peptide mass from sequence + mod masses (residue table + H2O), m/z from mass and charge and back; exports `PROTON_MASS` (1.00727647), `C13_MASS_DELTA` (1.0033548352), `HYDROGEN_MONOISOTOPIC_MASS`, `OXYGEN_MONOISOTOPIC_MASS`.
- Search keywords: mass, peptide mass, monoisotopic, m/z, mz, charge, proton mass, isotope, C13, residue masses, amino acid masses, mass calculator
- Location: `DP/peptide_mass_utils/PeptideMassCalculator.ts` (`PeptideMassCalculator.calculatePeptideMass`, `calculateMZ`, `calculateMZ_From_MonoisotopicMass_Charge`, `calculate_MonoisotopicMass_From_MZ_Charge`).
- Used by: `calculatePeptideMass` in `psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject.ts` and `qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch.ts`; m/z helpers in both chromatogram components, `scanFileBrowserViewPage__MainPage_Component.tsx`, `scanFileBrowser_SingleScan_Plot_Component.tsx`, `scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.ts`; `C13_MASS_DELTA` in `DP/chromatogram_common/chromatogram_Common_Helpers.ts`.
- How to use / extend: reuse these; do not add a new mass computation or residue table.
- Do not use when: server side (use the Java library), or average mass (the `avg` values are stored but no method uses them).
- Limits and gotchas (observed in source): unknown residue letters silently contribute mass 0; display names for E and Q are swapped ("E" = "Glutamine", "Q" = "Glutamic Acid"; masses correct); only the 20 standard residues (no U/O/X/B/Z).
- Related / duplicates: QC MS1 plot's own proton mass constant; Java calculators; Lorikeet library masses.
- Status: verified (re-checked)

### Java mass calculation: `org.yeastrc.proteomics` PeptideMassCalculator and the webapp `PSMMassCalculator` (unused)
- What it solves: server-side peptide mass. The blessed calculator is `org.yeastrc.proteomics.peptide.peptide.PeptideMassCalculator` (with `Peptide`, `MassUtils.MassType`) from the committed `yrc-proteomics.jar`. `J/web_utils/PSMMassCalculator` wraps it: theoretical monoisotopic neutral mass of a PSM peptide (label, static mods by residue count, dynamic/open mod masses) and PPM error vs precursor m/z with isotope-shift correction (`calculatePPMEstimateForPSM`, static `calculateTheoreticalNeutralMassForPSM`).
- Search keywords: Java mass, PSMMassCalculator, PeptideMassCalculator, yrc-proteomics, theoretical mass, neutral mass, PPM error, precursor m/z, isotope label, monoisotopic
- Location: library jar `limelight_webapp/libs_webapp__yeastrc_github_jars/yrc-proteomics.jar` (webapp only); wrapper `J/web_utils/PSMMassCalculator.java`.
- Used by: the library — `PSMs_For_ProjectSearchIds_SearchCriteria_Optional_ExperimentData_Optional__ReportedPeptideIds_Optional_ProtSeqVIds__WITH_Computed__Apex_Retention_Time_Download_Controller` (calls `PeptideMassCalculator` directly) and `PSMMassCalculator`. **`PSMMassCalculator` has NO users**: spot-checked with a whole-repo grep for `\bPSMMassCalculator\b` over `*.java` (only its own file) and over `*.ts/*.tsx/*.jsp/*.xml` (no hits). The only two files importing `org.yeastrc.proteomics` are that controller and `PSMMassCalculator` itself.
- How to use / extend: for new server-side mass needs, reuse the existing calculator; the existing path in use today is direct `PeptideMassCalculator` (`MONOISOTOPIC`) as in the APEX controller. `J/web_utils/PSMMassCalculator` exists but nothing calls it; the APEX PSM download calls `PeptideMassCalculator` directly.
- Do not use when: in modules other than the webapp (the jar is webapp-only); in the importer (it stores XML-supplied masses only).
- Limits and gotchas: `PSMMassCalculator` counts static mods by residue occurrence only (no terminal mods); being unused, its behavior is untested in current code.
- Related / duplicates: APEX controller m/z math (next entry); front-end `PeptideMassCalculator.ts`.
- Status: verified (users re-checked by grep)

### APEX MS1 peak / m/z / isotope / ppm window math (inside the APEX PSM download)
- What it solves: for each reported peptide + charge + scan file, computes precursor m/z (and isotopes up to a max) and searches MS1 scans in a ppm window for the highest-intensity peak ("apex"): scan number, RT, intensity, m/z, tie count.
- Search keywords: apex retention time, MS1 apex, XIC peak, precursor m/z window, isotope window, ppm window, chromatogram apex
- Location: `J/spring_mvc_parts/data_pages/data_download_controllers/psm_downloads/PSMs_..._WITH_Computed__Apex_Retention_Time_Download_Controller.java`, private `_compute_PeptideMass_WithMods_FOR_ScanPeak_MZ_Ranges`, `_compute_For_SingleSearch_APEX_ScanData`.
- Used by: only that controller.
- How to use / extend: not reusable as-is (private methods). Peptide mass uses the library `PeptideMassCalculator` (`MONOISOTOPIC`) with dynamic + static mods merged into a position->mass map (N-term = 0, C-term = length+1). Prefer the library calculator over copying this math.
- Do not use when: you need quant (this is a single-scan apex, not an integrated area; see the FlashLFQ quant docs).
- Limits and gotchas: the m/z step (`(mass + PROTON_MASS*charge)/charge`, `C13_MASS_DELTA` isotopes, hard-coded ppm window) is hand-written here with its own constants. Observed: open-modification masses are NOT added to the peptide mass (only dynamic + static mods), so open-mod PSMs get a window around the mass without the open mod.
- Related / duplicates: front-end chromatogram isotope helpers; `PSMMassCalculator`.
- Status: verified

### Isotope m/z offset, isotope count, and trace colors (chromatogram + scan browser)
- What it solves: m/z added for isotope number n at charge z (`n * C13_MASS_DELTA / z`), the max isotope count for chart traces (3), trace colors, ppm window.
- Search keywords: isotope offset, isotope m/z, C13 isotope, isotope traces, ppm window, chromatogram isotopes
- Location: `DP/chromatogram_common/chromatogram_Common_Helpers.ts` (`chromatogram_Common_Helpers__compute_Isotope_M_Over_Z_Addition_For_Isotope_Number`, `..._ISOTOPE_MAX__FOR_CHART_TRACES = 3`, `..._ISOTOPE_PLOT_TRACE_COLORS`); a private copy `_compute_Isotope_M_Over_Z_Addition_For_Isotope_Number` + `_ISOTOPE_MAX__FOR_CHART_LINES = 3` in the scan-file-browser single-scan plot.
- Used by: `psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx`, `featureDetection_ViewPage__Chromatogram_Component.tsx` (common helpers); scan-file browser plot (private copy).
- How to use / extend: import from `chromatogram_Common_Helpers.ts`; `C13_MASS_DELTA` itself comes from `PeptideMassCalculator.ts`.
- Do not use when: n/a.
- Limits and gotchas: the scan-file browser keeps its own copy of the same computation and constants.
- Related / duplicates: APEX controller isotope math (Java); chromatogram common code (Charts area).
- Status: verified

### PPM mass error per filtered PSM with C13 isotope correction (QC)
- What it solves: for every PSM passing the main filters, precursor PPM error. Observed mass from `PeptideMassCalculator.calculate_MonoisotopicMass_From_MZ_Charge` (PSM precursor m/z, or scan data when absent); calculated mass from `calculatePeptideMass(sequence, mods)` with static, reported-peptide-level variable and per-PSM open mod masses; picks the closest `calc + n*C13_MASS_DELTA` for n = 0..3; returns `1e6*(obs-chosen)/obs`. Indexed by psmId and reportedPeptideId, includes RT.
- Search keywords: ppm error, mass error, precursor mass accuracy, delta mass ppm, C13 isotope error, mass calibration
- Location: `PSB/qc_page/qc_common__psm__ppm_error/qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch.ts` (entry of the same name, result `get_PPM_Error_For_PsmId`, `get_PPM_Error__PSMs_For_ReportedPeptideId`).
- Used by: `qc_SingleSearch_PSM_PPM_Error_Statistics_Section.tsx`, `qcViewPage_SingleSearch__PSM_PPM_Error_MainPageContainer.tsx`, `qcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_StatisticsPlot.tsx`, `qcViewPage_MultipleSearches__PSM_PPM_Error_OverlayContainer.tsx` (8+ files).
- How to use / extend: reference for combining the canonical calculator with static + variable + open mods. Outside QC, extract the inner `_process_LoadedData` (needs the QC common-data object today).
- Do not use when: outside QC without extracting.
- Limits and gotchas: always returns a Promise (no sync fast path); nothing cached between calls; loads scan data (no peaks) per scan file when PSMs lack precursor m/z or RT.
- Related / duplicates: `PSMMassCalculator.calculatePPMEstimateForPSM` (Java, unused) does a similar job.
- Status: verified

### Importer: stored masses and decimal rounding (no mass computation)
- What it solves: the importer stores masses from the Limelight XML and only rounds them to fit DB columns.
- Search keywords: round decimal, mass rounding importer, reporter ion mass rounding, static mod mass rounding, open mod rounded
- Location: `IMP/utils/RoundDecimalFieldsIfNecessary` (scale > 9 -> HALF_UP; used by `ProcessStaticModifications`), `IMP/utils/ReporterIonMass_Round_IfNecessary` (used by `ProcessPSMsForReportedPeptide`); open-mod `Math.round` to int for the reported-peptide rounded open-mod lookup in `IMP/process_input/ProcessPSMsForReportedPeptide`; column limits in `IMP/constants/Database_DecimalFieldType_MaxWholeNumberDigits_Constants`.
- Used by: as listed.
- How to use / extend: within the importer only.
- Do not use when: you need a computed mass (there is none in the importer).
- Limits and gotchas: DB column limits must be kept in sync with the schema by hand.
- Related / duplicates: front-end display rounding (2 decimals) is a different rule.
- Status: verified

### Lorikeet page mass arithmetic (third-party library + local mod-mass sum)
- What it solves: the Lorikeet spectrum viewer computes its own residue/ion masses (third-party `limelight_webapp/front_end/src/js/libs/Lorikeet/` — `peptide.js`, `ion.js`, `aminoacid.js`); the page's `_add_2_modMasses_And_Round` sums a variable or terminal mod mass with the open-mod mass and rounds to the longer decimal length.
- Search keywords: Lorikeet, specview, b y ions, ion masses, spectrum annotation masses
- Location: `limelight_webapp/front_end/src/js/libs/Lorikeet/`; `DP/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded.ts`.
- Used by: the Lorikeet page only.
- How to use / extend: do not reuse its mass code elsewhere.
- Do not use when: any non-Lorikeet mass need (use `PeptideMassCalculator.ts`).
- Limits and gotchas: a separate mass computation from `PeptideMassCalculator` (relevant to the mass rule).
- Related / duplicates: front-end `PeptideMassCalculator`.
- Status: verified

## Modifications and open modifications

### Open-modification data model (where open-mod masses and positions live)
- What it solves: explains which table/DTO/searcher to use for open mods. Open-mod mass and candidate positions (0..n) are stored per PSM; the reported-peptide-level table holds only ROUNDED, aggregated unique masses.
- Search keywords: open mod, open modification, mass shift, unlocalized, localization, open mod position, psm_open_modification_tbl
- Location: PSM level `psm_open_modification_tbl` / `psm_open_modification_position_tbl` (`PsmOpenModificationDTO`, `PsmOpenModificationPositionDTO`); reported-peptide rounded lookup `srch_rep_pept__psm_open_mod_rounded_lookup_tbl`; unique positions lookup `srch_rep_pept__open_mod_psm_unique_positions__lookup_tbl` (DTO `Search_ReportedPeptide_OpenMod_PsmUniquePositions_DTO`, importer).
- Used by: searchers in the next entry; importer `ProcessPSMsForReportedPeptide`.
- How to use / extend: get masses by psmIds, then positions by open-mod ids (next entry). Never key exact open-mod identity on `reportedPeptideId` alone (one reported peptide can cover several open-mod mass forms; see repo `CLAUDE.md`).
- Do not use when: you need an exact mass from the rounded reported-peptide table.
- Limits and gotchas: two DTOs map the unique-positions lookup table; `SrchRepPeptOpenModPsmUniquePositionsDTO` is unused (dead) and its fields differ.
- Related / duplicates: front-end "treat open-mod mass 0 as unmodified" option (UI area).
- Status: verified

### Modification and reporter-ion searchers (reported-peptide and PSM level, Java)
- What it solves: variable (dynamic) mods per reported peptide or PSM, open-mod masses and positions, reporter-ion masses, static mods per search. All return stored masses (no mass computation).
- Search keywords: modifications, dynamic mod, variable mod, open mod, open modification position, reporter ions, static mod, PTM, n-terminal, c-terminal
- Location: `J/searchers/`: `DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher`, `SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher`, `PsmDynamicModification_For_PsmIdList_Searcher`, `PsmDynamicModification_For_PsmId_Searcher`, `PsmDynamicModificationMassesFor_PsmIds_Searcher`, `OpenModificationsPSMsRoundedUniqueAtReportedPeptideLevelForSearchIdReportedPeptideIdsSearcher`, `OpenModificationMasses_PsmLevel_ForPsmIds_Searcher`, `OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher`, `PsmOpenModificationMassesFor_PsmIds_Searcher`, `PsmOpenModification_Masses_Positions_For_PsmIds_Searcher`, `PsmOpenModificationPosition_SetOf_PsmOpenModificationIds_Searcher`, `PsmReporterIonMassesFor_PsmIds_Searcher`, `ReporterIonMasses_PsmLevel_ForPsmIds_Searcher`, `ReporterIonMasses_Unique_ForSearchLevel_ForSearchIdSearcher`, `StaticModDTOForSearchIdSearcher`.
- Used by: `DynamicModifications_PerReportedPeptide_..._RestWebserviceController`, `OpenModifications_PerReportedPeptide_..._RestWebserviceController`, `Psm_Variable_Dynamic_ModificationMasses_PerReportedPeptide_...Controller`, `Psm_OpenModificationMasses_PerReportedPeptide_...Controller`, `Psm_ReporterIonMasses_PerReportedPeptide_...Controller`, `PSM_List_RestWebserviceController`, `PSM_Peptide_List_Display_With_SpectrumViewer_RestWebserviceController`, Blib controller, PSM download controllers, `StaticMods_Single_ProjectSearchId_RestWebserviceController`.
- How to use / extend: pick by the inputs in the class name; results keyed by reported peptide id where applicable (`getResults_Key_ReportedPeptideId()`); PSM-level searchers take `List<Long>` psm ids.
- Do not use when: you need a peptide/PSM mass (that is the mass calculator).
- Limits and gotchas: reporter-ion PSM-id searchers overlap (`PsmReporterIonMassesFor_PsmIds_Searcher` vs `ReporterIonMasses_PsmLevel_ForPsmIds_Searcher`); `PsmOpenModification_For_PsmId_Searcher` and `PsmOpenModificationPosition_Searcher` have no users.
- Related / duplicates: Data access area (same searchers, DB view).
- Status: verified (users grepped; some SQL only skimmed)

### Modification / reporter-ion mass rounding for display and grouping (2 decimals)
- What it solves: the single rounding rule (2 decimal places) for variable/open/static mod masses and reporter-ion masses: number and trimmed-string forms, plus "does this mass need rounding".
- Search keywords: round mod mass, modification mass display, decimal places, reporter ion mass, rounding, mass string, mod mass key
- Location: `DP/modification_mass_common/modification_mass_rounding.ts` (`modificationMass_CommonRounding_ReturnNumber`, `_ReturnString`, `_Needed`); `DP/reporter_ion_mass_common/reporter_ion_mass_rounding.ts` (`reporterIonMass_CommonRounding_*`).
- Used by: `modificationMass_CommonRounding_ReturnNumber` 35 files, `_ReturnString` 6; reporter-ion number 14 files; injected into the mod / reporter-ion filter components; `round_Selected_ModMasses_IfNeed_...` in the single-protein nonClass functions.
- How to use / extend: always use these for mod-mass display/grouping keys so rounding matches across pages.
- Do not use when: exact mass math (loses precision); mod-page binning (whole number, next entry).
- Limits and gotchas: rounded masses go into the peptide identity string, so changing rounding changes grouping.
- Related / duplicates: the two files are copies with renamed identifiers.
- Status: verified (re-checked)

### Mod page whole-number binning (`modPage_ModMass_Rounding_UTIL`) and its protein-page copy
- What it solves: the one place the mod page rounds a mod mass for binning (heatmap columns, top table rows, URL selections, reports) — currently `Math.round`.
- Search keywords: mod mass rounding, bin, whole number, rounded mod mass, mod mass bucket
- Location: `PSB/mod_view_page/mod_page__js/mod_page_mod_mass_rounding_UTIL/modPage_ModMass_Rounding_UTIL.ts`.
- Used by: `modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering.ts`, `modViewPage_DataVizOptions_VizSelections_PageStateManager.ts`, `modPage_Create_GeneratedReportedPeptideEntries_String_Etc.ts`.
- How to use / extend: use it for any mod-page binning so a precision change is one edit.
- Do not use when: displaying a mod mass (use the 2-decimal rounding).
- Limits and gotchas: `PSB/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Populate_ModSelections_From_ModPage_ModMass.ts` receives the mod page's rounded mass and rounds with its own `Math.round`; if this util changes, that must change too.
- Related / duplicates: protein-page `Math.round` copy; 2-decimal display rounding.
- Status: verified

### Seed single-protein mod selections from the mod page
- What it solves: when the single-protein view opens from the mod page for one rounded mod mass, preselects the matching variable / open mod selections; companion helpers re-round mod / reporter-ion selections read from the URL.
- Search keywords: mod page to protein, preselect modification, mod mass selection, round mod mass selection
- Location: `PSB/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Populate_ModSelections_From_ModPage_ModMass.ts`; `round_Selected_ModMasses_IfNeed_...` / `round_Selected_ReporterIonMasses_IfNeed_...` in `.../proteinPage_Display__SingleProtein_nonClass_Functions.ts`.
- Used by: `proteinPage_Display__SingleProtein_Root.ts`; populate also by `DP/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/js/proteinExperimentPage_Display_SingleProtein.ts`.
- How to use / extend: uses `ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass` (`{ data, promise }`) and the common rounding (no mass computation).
- Do not use when: n/a.
- Limits and gotchas: returns `Promise<unknown>`; own `Math.round` (see previous entry).
- Related / duplicates: `modPage_ModMass_Rounding_UTIL`.
- Status: verified (body partly read)

### Mod page per-mod-mass / per-search / per-PSM data pipeline
- What it solves: turns the page's filtered PSMs into "for each mod mass, for each search (or sub-search), which PSMs carry it", combining PSM-level variable mods, reported-peptide-level variable mods and PSM-level open mods, and applying the mod page's own protein-position and protein-position-of-modification filters to individual mod positions (localized and unlocalized). Also a template for fanning out to several `{ data, promise }` loaders with a synchronous fast path.
- Search keywords: mod mass per PSM, modification counts, open mod, variable mod, unlocalized, localized, sub search, PSMs per mod mass, fan-in loaders, promises.length === 0
- Location: `PSB/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering.ts` (same-named entry returning `{ data, promise }`; result classes `..._Result_Root`, `_ForSingle_ModMass`, `_ForSingle_ProjectSearchId_Or_SubSearchId`, `_ForSingle_Psm`); input wrapper `ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass`.
- Used by: `modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable.ts`, the ratio-totals container, `ModPage_ModPageBlock_UserEntryArea_..._Component.tsx`, the mod-page sub-table generators.
- How to use / extend: add a new per-search source as another `get_..._ReturnPromise()` branch pushing onto `promises`, and add its holder as a REQUIRED param of the `_..._AfterLoadData` function (called from both the sync and async sites).
- Do not use when: per-peptide or per-protein grouping (use common filtering / peptide-page code). Nothing outside `mod_view_page/` imports from it — reuse means moving it to common code.
- Limits and gotchas: uses the filtered loaders; for sub-searches uses `CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered` (a psmId -> sub-group lookup, not the unfiltered PSM-table loader). Sub-search mode only with exactly one search that has sub-groups. Mod mass here is the actual mass; heatmap binning uses `modPage_ModMass_Rounding_UTIL`. Folder names "except_mod_main_page" on the common filtering/loader code are stale: the mod page uses them.
- Related / duplicates: experiment mod page (`mod_exp__page`) is a stub with parallel per-condition code.
- Status: verified

### Residue-letter modification counts with fractional apportioning
- What it solves: counts which residue letters carry a mod mass, splitting a PSM's count fractionally across candidate positions when a mod has several or zero positions; localized vs unlocalized tracked separately; dedup by psmId. Table column + overlay render it.
- Search keywords: residue letter, modified residue, localization, unlocalized, fractional count, apportion, rollup, accumulate
- Location: `PSB/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.ts`, `..._Under_SingleModMassRoundedTopLevel_For_SinglePsm.ts`; display `mod_page__modified_residue__table_column_display/ModPage_ModifiedResidue__DataTable_ColumnDisplay.tsx`; overlay `mod_page__modified_residue__overlay/ModPage_ModifiedResidue__Overlay.tsx`.
- Used by: `modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable.ts`, `ModPage_TopLevel_ModificationList_DataTable_Component.tsx`, sub-table generators.
- How to use / extend: add per-PSM entries, read totals per residue letter.
- Do not use when: you need whole PSM counts.
- Limits and gotchas: mod page only.
- Related / duplicates: none found.
- Status: verified (accumulator); display/overlay skimmed

### Unlocalized position range model and interval merge
- What it solves: `ModPage_Mod_Unlocalized_StartEnd_ContainerClass` (start/end; `toString` as `n` or `[a-b]`) and `modPage_CompressUnlocalizedRanges` (sort + merge overlapping ranges).
- Search keywords: range merge, interval merge, unlocalized positions, position range
- Location: `PSB/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_Mod_Unlocalized_StartEnd_ContainerClass.ts`, `mod_page__js/mod_page_util_js/modPage_CompressUnlocalizedRanges.ts`.
- Used by: `modPage_get_ProteinList_SubTable.tsx`, `modPage_Get_ProteinData_BySearch_List_SubTableGenerator.tsx`, `modPage_Get_PeptideList_ForModMassProteinAndSearch_SubTableGenerator.tsx`.
- How to use / extend: generic; could move to common code.
- Do not use when: adjacent non-overlapping ranges must merge (merges only when `start <= previous end`).
- Limits and gotchas: sorts the input array in place.
- Related / duplicates: `ProteinSequenceCoverageData_For_ProteinSequenceVersionId` keeps merged ranges too (not compared).
- Status: verified

## Peptide identity, termini, sequences, I/L

### Peptide identity string across searches (generated reported peptide key + display string)
- What it solves: the "common" key for a peptide form across searches, `PID<peptideId>!V<varmods>!O<openmod>!S<staticmods>` (positions + rounded masses), and a display string (sequence with mods inserted). Groups reported peptides from many searches into one row.
- Search keywords: peptide key, peptidoform key, generated reported peptide, group peptides across searches, unique peptide string, peptide display string, modified sequence string, distinct peptide key
- Location: `DP/reported_peptide__generated_common__across_searches/reportedPeptide_CommonValue_AcrossSearches.ts` (`create_reportedPeptide_CommonValue_EncodedString`, N/C terminus position constants -999 / 99999999), `reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches.ts`.
- Used by: encoded key (`create_reportedPeptide_CommonValue_EncodedString`) — only `proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides.ts`; its N/C terminus constants are also imported by `proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`, `scanFileToSearchesPage_Display_MainContent_Component.tsx`, `featureDetection_ViewPage__Chromatogram_Component.tsx`; display string (`reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches`) — 6 files incl. `proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`, `modPage_Create_GeneratedReportedPeptideEntries_String_Etc.ts`, `qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch.ts`, `lorikeetSpectrumViewer_createDataFor_PsmPeptideTable.ts`, the scan-file-to-searches page and the feature-detection chromatogram.
- How to use / extend: pass rounded mass strings from the rounding helpers; masses are encoded in the order given.
- Do not use when: exact-mass identity is needed.
- Limits and gotchas: header says open mod "assumes only 1"; same masses in a different order give a different key; throws if a value contains a delimiter. The single-protein / peptide-page builder (`create_GeneratedReportedPeptideListData__SingleProtein`) keys its rows by the DISPLAY string (`entries_Key_peptideSequenceDisplay`), not by the encoded key — the two builders use different identity keys (verified).
- Related / duplicates: terminus encodings (next entry).
- Status: verified (re-checked)

### Peptide terminus position encodings (three representations)
- What it solves: tells you which terminus marker a given API expects.
- Search keywords: n-terminus, c-terminus, terminal mod, terminus position, n term, c term
- Location: numeric sentinels -999 (N) / 99999999 (C) in `reportedPeptide_CommonValue_AcrossSearches.ts`; strings `'n'` / `'c'` in `DP/data_pages__common_data_types_typescript/` (`ModificationPosition_DataType` = number | 'n' | 'c'; `OpenModPosition_DataType` = number | string); Java shared constants `SC/constants/Limelight__Protein_PrePostResidue_Contants` ("n"/"c" for pre/post residue at protein ends); APEX controller position map N-term = 0, C-term = length+1.
- Used by: see the linked entries.
- How to use / extend: convert at the boundary; do not mix.
- Do not use when: n/a.
- Limits and gotchas: no shared converter found.
- Related / duplicates: listed above.
- Status: verified (each location read)

### Generated (distinct) peptide list builder: `create_GeneratedReportedPeptideListData__SingleProtein`
- What it solves: turns filtered reported-peptide ids + PSM ids per projectSearchId into displayed "generated peptide" rows: one per distinct peptide string (sequence + user-chosen variable / open / static mods), PSM counts per search, per sub-group, per experiment condition, unique-to-protein flag, pre/post residues, per-search reported-peptide/PSM ids; applies the minimum-PSM filter.
- Search keywords: peptide list, distinct peptide, generated peptide, peptide string, combine searches, peptide grouping, PSM count per peptide, unique peptide, minimum PSM count
- Location: `PSB/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts` (`create_GeneratedReportedPeptideListData__SingleProtein`, `..._ONLY_for_FILTERING__Returns__ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds`).
- Used by: peptide page main component, single-protein main component, `peptideExperimentPage_Display_MainContent_Component.tsx`, `proteinExperimentPage_SingleProtein_MainContent_Component.tsx`, `PSB/qc_page/qc_common_compute/generatedReportedPeptideList_Compute/qc_compute_Cache_create_GeneratedReportedPeptideListData.ts`; the FILTERING-only variant by `modViewPage_Display_MainContent_Component.tsx`.
- How to use / extend: pass the output of `GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class`, the `GeneratedPeptideContents_UserSelections_StateObject`, the common-data root; `proteinSequenceVersionId` only on single protein; `conditionGroupsContainer` + `conditionGroupsDataContainer` both or neither.
- Do not use when: you need the protein-list distinct-peptide sets (next entry) or raw reported peptides per search.
- Limits and gotchas: always returns a Promise (no sync fast path). Per-row `numPsmsTotal` cannot be summed for an overall PSM count (use `numberOfPsmIds_NonRedundant_AcrossAllPeptides`). PSM counts may sum across searches/conditions; quant may not. Loads `SearchSubGroupId_ForPSM_ID` from the per-search `NO_PSM_Peptide_Protein_Filtering` holder (a lookup, not the unfiltered PSM-table loader, which new code should not use).
- Related / duplicates: next entry (second distinct-peptide builder).
- Status: verified (re-checked)

### Distinct peptide builder for protein list / QC: `..._CreateProteinDisplayData__Create_GeneratedPeptides`
- What it solves: groups filtered reported peptides + PSMs across searches (and sub-groups) into distinct peptides keyed by the identity string, optionally including variable mods and localized open mods ("Distinct Peptide Includes").
- Search keywords: distinct peptide count, distinct peptides, peptide identity key, unique peptide, protein list peptides, QC distinct peptide
- Location: `PSB/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides.ts` (+ result classes); option state `..._DistinctPeptideContents_UserSelections_StateObject.ts`, UI `.../jsx/..._DistinctPeptideContents_UserSelections_Root_Component.tsx`.
- Used by: protein list main component, experiment protein page main component, many QC components (e.g. `qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array.ts`, `qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch.ts`), `featureDetection_ViewPage__MainPage_Component.tsx`, the estimated-error display component.
- How to use / extend: pass the DistinctPeptideContents state object (undefined = mods not included), the open-mod-mass-zero state, `searchSubGroup_Ids_Selected`, all-search reported-peptide ids, common-data root; `await`.
- Do not use when: you need a display string or per-row PSM counts (previous entry).
- Limits and gotchas: always a Promise; static mods never part of this key. Generic despite the protein-page name.
- Related / duplicates: previous entry (two builders with different option objects; QC uses both).
- Status: verified

### I/L (isoleucine / leucine) equivalence handling
- What it solves: treat I and L as the same residue when matching sequences.
- Search keywords: I L equivalence, isoleucine leucine, I to L, L to I, J residue, sequence matching
- Location: importer `IMP/utils/PeptideProteinSequenceForProteinInference.convert_PeptideOrProtein_SequenceFor_I_L_Equivalence_ChangeTo_J` (both -> J); front-end common sequence loaders `get_PeptideSequence_I_To_L__For_PeptideId`, `get_ProteinSequence_I_To_L__For_ProteinSequenceVersionId` (in `.../common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__{PeptideSequences_For_MainFilters,ProteinSequences}.ts`); `CF/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_Compute.ts` (upper-cases and maps L->I on the search string).
- Used by: importer `GetProteinsForPeptide`; PeptideSequences getter in 26 front-end files; user search string compute in `peptideSequence_UserSelections.tsx` and the single-protein / experiment single-protein main components.
- How to use / extend: front end — reuse the loader's I->L getters instead of re-implementing replace.
- Do not use when: you need the original sequence.
- Limits and gotchas: three directions in use (I/L -> J importer, I -> L loaders, L -> I user search); compare only within one convention. One more front-end match on I/L in `commonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId.ts` (grep only, not read).
- Related / duplicates: listed above.
- Status: verified (loader I->L code and search-string compute read; importer util read)

### Peptide-to-protein position mapping at import (`GetProteinsForPeptide`)
- What it solves: finds every position of a peptide in its matched proteins (all `<matched_proteins>` or only those in `<matched_protein_for_peptide>`), with I/L equivalence, records differing residues; fails the import if a listed protein does not contain the peptide or an explicitly mapped protein is never matched.
- Search keywords: protein inference import, peptide position in protein, protein coverage, matched proteins, find peptide in protein
- Location: `IMP/process_input/GetProteinsForPeptide` (singleton: `setMatchedProteinsFromLimelightXML`, `getProteinsForPeptide(reportedPeptide, positions)`), `IMP/objects/ProteinImporterContainer`, driver `IMP/process_input/Process_PeptidesToProteinsMapping_ProteinInference_InsertProteins`, dedupe `IMP/peptide_protein_position/ProteinCoverageDTO_SaveToDB_NoDups`.
- Used by: the driver; `log_limelight_xml_stats/SearchStatistics_General_SavedToDB` (timing); `dao/ProteinImporterContainerDAO`.
- How to use / extend: importer only; coverage rows go through `ProteinCoverageDTO_SaveToDB_NoDups` (static `HashSet` dedupe).
- Do not use when: webapp or front end (positions are already stored in protein coverage tables).
- Limits and gotchas: peptide isotope labels throw "not yet supported"; linear `indexOf` over every protein when no explicit mapping; static per-process state.
- Related / duplicates: front-end `ProteinInferenceUtils` (different problem, name overlap).
- Status: verified (start of `GetProteinsForPeptide` read; driver skimmed)

### Peptide pre/post residue for a protein position (Java, shared)
- What it solves: given a protein sequence and 1-based peptide start/end, the residues before and after, with N-/C-terminus markers and at-start/at-end flags.
- Search keywords: pre residue, post residue, flanking residue, preceding amino acid, protein coverage, tryptic end, n-terminus, c-terminus
- Location: `SC/protein_coverage_common/Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util` (static); markers `SC/constants/Limelight__Protein_PrePostResidue_Contants`.
- Used by: importer `Process_PeptidesToProteinsMapping_ProteinInference_InsertProteins`; `limelight__db_populate_new_fields__common_code` pre/post residue backfill (`..._ProteinPrePostResidue_MAIN`, `..._FROM_PerRecordObjects`).
- How to use / extend: static call; positions are 1-based inclusive; reuse in any backfill rather than re-deriving.
- Do not use when: front end (positions/residues come from the coverage webservice).
- Limits and gotchas: no bounds checking (bad positions throw `StringIndexOutOfBoundsException`).
- Related / duplicates: none found.
- Status: verified

## Protein inference, coverage, abundance

### Protein inference / grouping (`ProteinInferenceUtils` + protein-list wrappers)
- What it solves: from proteinId -> set of peptide keys, compute indistinguishable groups, parsimonious groups, or non-subset groups (`ProteinGroup`: `proteins`, `peptides`, `uniquePeptides`, `passesFilter`); the protein-list wrappers recompute unique-peptide counts at group level (overall, per search, per sub-group, per condition) and hide subset / non-parsimonious groups.
- Search keywords: protein inference, protein grouping, parsimony, parsimonious, indistinguishable proteins, subset proteins, group proteins, unique peptides
- Location: algorithm `DP/protein_inference/ProteinInferenceUtils.ts` (`getProteinGroups`, `getParsimoniousProteinGroupsFromProteinPeptideMap`, `getNonSubsetProteinGroupsFromProteinPeptideMap`, all `async`), `DP/protein_inference/ProteinGroup.ts`; wrappers `PSB/protein_page/protein_page__protein_list/js/proteinPage_ProteinList__GroupProteins.ts` and `..._GroupProteins_Compute_UniquePeptideCounts_For_ProjectSearchIds.ts`, `..._For_SubGroups.ts`, `..._Compute_DistinctPeptideCounts_UniquePeptideCounts_For_ExperimentConditions.ts`, `..._Remove_NotPassesFilter_RemoveSubsetOrNotParsimonious.ts`; state `protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass.ts`; UI `proteinViewPage_ProteinGroupingFilterSelectionComponent.tsx`.
- Used by: protein list main component; experiment protein page main component; `protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped.ts`.
- How to use / extend: for a new page build `Map<proteinSequenceVersionId, Set<peptideKey>>` from filtered data and call `ProteinInferenceUtils` directly (the wrapper is tied to `ProteinDisplayData_From_createProteinDisplayData_ProteinList`).
- Do not use when: you only need "is this peptide unique to one protein" (single-protein list computes `peptideUnique` itself); importer protein mapping (different problem).
- Limits and gotchas: methods are `async` but run synchronously (the `setTimeout` yield is commented out, so the page locks on large inputs); fast path when every protein is its own group. Proteins missing from the groups map are reported to the server as a warning and skipped. Possible out-of-order re-render on rapid filter changes (no stale-run guard seen; not tested).
- Related / duplicates: unique-peptide counting also in `..._NOT_GroupProteins.ts` and the single-protein `peptideUnique` (about 5 places).
- Status: verified (re-checked)

### NSAF and ABACUS adjusted spectral count (calculators + per-search / per-sub-group / per-condition wrappers)
- What it solves: NSAF (count / length, normalized) from protein->count and protein->length maps; ABACUS-style adjusted spectral count; NSAF using ABACUS; per search, per sub-group (single search), or per experiment condition; number formatting and column tooltips.
- Search keywords: NSAF, spectral count, normalized spectral abundance, ABACUS, adjusted spectral count, label-free count, protein abundance
- Location: calculators `DP/calculated_annotations/NSAF_annotation_calculator.ts` (`NSAFAnnotationCalculator.getNSAFAnnotations`), `DP/calculated_annotations/adjusted_Spectral_Count_ABACUS__Annotation_Calculator.ts`; single-search wrappers `PSB/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_NSAF.ts`, `..._Compute__Adjusted_Spectral_Count_ABACUS.ts` (`..._ReturnPromise`), `..._Compute_NSAF__Using_Adjusted_Spectral_Count_ABACUS.ts`; per-condition wrappers `DP/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/..._Per_ExperimentConditionId.ts` (NSAF, ABACUS, NSAF-using-ABACUS); format `PSB/protein_page/protein_page_common/proteinView_nsaf_formatNumber_ForDisplayInTable.ts`, `proteinView_Adjusted_Spectral_Count_ABACUS_formatNumber_ForDisplayInTable.ts`; tooltips `protein_page_common/jsx/proteinView__ProteinList_ColumnHeader__Tooltip_Text.tsx`.
- Used by: protein list main component; experiment protein list (`proteinExperimentPage_Display_MainContent_Component.tsx`, `..._Create_ProteinList_DataTable_RootTableDataObject.ts`).
- How to use / extend: call only on the FINAL list (after all filtering). NSAF accepts any count (PSM count or ABACUS value). The single-search ABACUS wrapper is a clean template of the `{ data, promise }` loader pattern with a sync fast path; it reads PSMs via the FILTERED `..._PSM_TblData_For_ReportedPeptideId_For_MainFilters` loader. For a new per-condition metric: get searches per condition, then call the shared calculator per condition.
- Do not use when: MS1 quant (these are spectral counts; see the repo rule on not summing quant across scan files/searches/conditions).
- Limits and gotchas: NSAF throws plain strings (not `Error`) on size mismatch; ABACUS calculator has `_DEBUG_LOGGING = true` (console logging on); the single-search ABACUS wrapper throws if sub-groups are selected with more than one search (`searchSubGroup_Ids_Selected && projectSearchIds.length !== 1`). Per-condition math itself not read.
- Related / duplicates: per-condition wrappers mirror the single-search wrappers (math shared, wrapping duplicated).
- Status: verified (ABACUS internals skimmed; per-condition math not read) (re-checked)

### Protein sequence coverage (holder + boolean-array helpers)
- What it solves: per-reported-peptide start/end on one protein and merged ranges; coverage ratio (unfiltered cached, or filtered on reportedPeptideIds), boolean coverage array, reported peptides covering a position; multi-search boolean arrays.
- Search keywords: sequence coverage, protein coverage, coverage ratio, covered positions, peptide positions on protein, coverage array
- Location: `PSB/protein_page/protein_page_common/proteinSequenceCoverageData_For_ProteinSequenceVersionId.ts` (`ProteinSequenceCoverageData_For_ProteinSequenceVersionId`, built by the derived loader `commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters.ts`); multi-search arrays `CF/filter_on__components/filter_on__single_protein/protein_sequence_display_widget__ForProtExp_SingleProtein/` (`getSequenceCoverageBooleanArray_NotFiltered`, `getSequenceCoverageBooleanArray_ForReportedPeptideIds`).
- Used by: protein list main component, `peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.ts`, protein sequence / bar / structure widgets, experiment protein list; boolean-array helpers by the single-protein and experiment single-protein nonClass functions.
- How to use / extend: get the holder from the common-data loader, do not construct it.
- Do not use when: n/a.
- Limits and gotchas: filtered ratio throws if a reportedPeptideId has no coverage entry. Lives in a protein-page folder but is shared. The boolean-array helpers always return a Promise (no sync fast path).
- Related / duplicates: Java protein-level coverage searchers (Data access area).
- Status: verified

## Trypsin and digestion

### Trypsin cut points for a protein sequence
- What it solves: positions (between residues, +0.5) where trypsin cuts, K/R-not-before-P plus exceptions.
- Search keywords: trypsin, digestion, cleavage sites, cut points, enzyme, tryptic
- Location: `FE/common_all_pages/trypsinCutPointsForSequence.ts` (`trypsin_CutPointsForSequence_Compute(proteinSequence)`).
- Used by: `ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component.tsx`, `protein_Structure_WidgetDisplay__Main_Component.tsx`.
- How to use / extend: returns undefined for sequences shorter than 2.
- Do not use when: you need the simple `[KR][^P]` missed-cleavage rule (next entry).
- Limits and gotchas: different rule from the QC / filter missed-cleavage code.
- Related / duplicates: next entry.
- Status: verified (re-checked)

### Missed-cleavage (trypsin) counting per reported peptide / PSM
- What it solves: counts trypsin missed cleavages with regex `[KR][^P]` on the peptide sequence, skipping positions carrying a reported-peptide-level variable mod or static-mod residue, and per PSM skipping localized open-mod positions; aggregated per search or sub-search for filtered PSMs.
- Search keywords: missed cleavage, digestion, tryptic, trypsin, KR not before P, cleavage sites, digestion statistics, missed cleavage filter
- Location: QC `PSB/qc_page/qc_common_compute/digestion_compute/` (`qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data`, `..._Data`, `..._Data__SingleSearch__SubSearches`); copy for the missed-cleavage filter in `CF/reported_peptide_ids_for_display/peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together.ts` (both define `TRYPSIN_CLEAVAGE_REGEX_PATTERN = "[KR][^P]"`).
- Used by: QC digestion sections (single, multiple, sub-searches); the filtering engine.
- How to use / extend: QC: compute `Initial_Data` once per filter state, then `Data` on smaller option changes. A new user should extract one shared helper first.
- Do not use when: non-trypsin enzymes (hard-coded).
- Limits and gotchas: from regex semantics (analysis, not run): `matchAll` with `g` finds non-overlapping matches, so adjacent sites like `KK` / `RK` may be undercounted. QC version tied to the QC common-data object.
- Related / duplicates: QC copy vs filter copy; `trypsinCutPointsForSequence.ts` (third, different rule).
- Status: verified (Initial_Data read; aggregation skimmed)

## Annotation types and cutoffs

### Annotation type data (Java and front end)
- What it solves: all annotation types (PSM / reported peptide / matched protein / modification position / PSM peptide position; filterable / descriptive) for a search, raw or split into maps by kind; front-end loading and "types for X in display order".
- Search keywords: annotation type, score names, filterable, descriptive, score types, annotation_type_tbl, display order, default visible
- Location: Java `J/searchers/AnnotationTypeListForSearchIdSearcher` (`getAnnotationTypeListForSearchId(searchId)`), `J/annotation_type_utils/GetAnnotationTypeData(IF)` (`getAnnotationTypeDataForSearchId(searchId)`); front end `DP/data_pages_common/annotationTypeDataRetrieval.ts` (`AnnotationTypeDataRetrieval` -> `search-annotation-type-list-from-psi`), `annotationTypeData_ReturnSpecifiedTypes.ts`, `single_project_its_searches_and_folders/annotationTypes_SortOn_DisplayOrderAnnTypeName.ts`.
- Used by: `GetAnnotationTypeData` — `DefaultCutoffsExactlyMatchAnnTypeDataToSearchData`, `SearchDataLookupParams_CreateObjectForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds`; searcher — `GetAnnotationTypeData`, `SearcherCutoffValues_Factory`, `SearchAnnotationTypeList_From_ProjectSearchIds_RestWebserviceController`, PSM download controllers; front end — `LoadCoreData_ProjectSearchIds_Based`, project-page experiments, project-wide default cutoffs overlay, Lorikeet page.
- How to use / extend: Java — inject `GetAnnotationTypeData` for split maps (takes `search_tbl.id`); front end — read from the `DataPageStateManager` after core load.
- Do not use when: many searches at once in Java (one query per search).
- Limits and gotchas: descriptive `PSM_PEPTIDE_POSITION` throws in `GetAnnotationTypeData` (no map). Neither `GetAnnotationTypeData` nor `AnnotationTypeListForSearchIdSearcher` caches (no cache in either; each call queries the DB). Annotation-type select options are rebuilt in about 18 QC overlays.
- Related / duplicates: Data access area (searcher); Webservices area (loaders).
- Status: verified (re-checked)

### Filter-direction and annotation enums + SQL operator constants
- What it solves: shared vocabulary for cutoffs: `FilterDirectionTypeJavaCodeEnum` ("above"/"below"), `FilterableDescriptiveAnnotationType`, `PsmPeptideMatchedProteinAnnotationType` (psm, peptide, matched_protein, modification_position, psm_peptide_position), `AnnotationValueLocation` ("local"/"large_value_table"); `SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER` (`>=`) / `SQL_END_SMALLER_VALUE_BETTER` (`<=`); `AnnotationValueStringLocalFieldLengthConstants` (50).
- Search keywords: filter direction, above below, bigger is better, smaller is better, annotation type kind, descriptive, filterable, large value table
- Location: `SC/enum_classes/` and `SC/constants/`.
- Used by: webapp cutoff searchers and factory, importer, populate-new-fields, `AnnotationTypeDAO`/`AnnotationTypeDTO`.
- How to use / extend: use the enum `value()` / `fromValue()` pattern; ints/strings must match DB lookup rows.
- Do not use when: n/a.
- Limits and gotchas: some enum error messages name the wrong enum (copy-paste). ABOVE/BELOW best/worst comparison is written separately in 4 importer classes and the populate backfill.
- Related / duplicates: Data access area (enum pattern).
- Status: verified

### Searcher cutoff value objects + `SearcherCutoffValues_Factory`
- What it solves: immutable, builder-made holders of the user's cutoffs (annotation type -> cutoff value) per project search at PSM, reported-peptide, protein and modification-position levels, with a compact string for cache keys; and the only factory that converts webservice lookup params (keyed by projectSearchId) into them (keyed by searchId, each cutoff carrying its `AnnotationTypeDTO`).
- Search keywords: cutoffs, filters, filter values, annotation cutoff, q-value cutoff, PSM filter, peptide filter, search criteria, SearcherCutoffValuesSearchLevel, cache key for filters
- Location: objects `SC/searcher_psm_peptide_cutoff_objects/` (`SearcherCutoffValuesRootLevel`, `SearcherCutoffValuesSearchLevel` with `get*PerAnnotationCutoffsList`, `getAsCompactString`, `getAsCompactStringByteArray`, `builder()`; `SearcherCutoffValuesAnnotationLevel`); factory `J/searcher_psm_peptide_protein_cutoff_objects_utils/SearcherCutoffValues_Factory.java` (`createSearcherCutoffValuesRootLevel_From_WebserviceRequestCutoffs(map, root[, skip])`, `createSearcherCutoffValuesSearchLevel(map, paramsForOneProjectSearchId[, skip])`).
- Used by: only the webapp (the factory is referenced by 14 webapp Java files; the cutoff objects by about 36 webapp files plus their own shared-code classes), e.g. `PSM_List_RestWebserviceController`, `PsmTable_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController`, `ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RestWebserviceController`, `BlibSpectralLibrary_Download__Request_Creation_RestWebserviceController`, PSM download controllers.
- How to use / extend: build `Map<projectSearchId, searchId>` (e.g. `SearchIdForProjectSearchIdSearcher`), call the factory with the request's `SearchDataLookupParams_For_Single_ProjectSearchId`, pass the search-level object to the cutoff searchers/services.
- Do not use when: front-end filter state (TypeScript).
- Limits and gotchas: throws `LimelightErrorDataInWebRequestException` when a projectSearchId in the cutoffs is not in the map unless `SkipWebserviceCutoffs_NotIn_projectSearchIdMapToSearchId.YES`. Loads annotation types per searchId on each call. Javadoc says `equals`/`hashCode` include `projectSearchId` but the code compares only the four cutoff maps; the compact string does include it (observed in code). These objects are used as cache keys — update `equals`/`hashCode` if fields change. Lives in shared code but no non-webapp module uses it.
- Related / duplicates: search data lookup params (below).
- Status: verified (re-checked)

### Cutoff-filtered SQL building (PSM, reported peptide, protein levels)
- What it solves: dynamic SQL that keeps only PSMs / reported peptides / proteins whose filterable annotation values pass the cutoffs, honoring filter direction; optional decoy exclusion.
- Search keywords: filter SQL, cutoff SQL, annotation filter, value_double, best PSM value, ABOVE / BELOW, decoy exclusion, protein cutoffs, is_decoy
- Location: PSM level `J/searchers/PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher.java` (nested `SELECT psm_id FROM psm_filterable_annotation_tbl ...` per cutoff, plus `psm_mod_pos_worst_filterable_annotation_lookup_tbl` for modification-position cutoffs); peptide level `J/searchers/ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher.java` (`srch__rep_pept_filterable_annotation_tbl`, best-PSM-value lookup tables, protein sub-select); protein level `ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher`, `ProteinCoverageForSearchIdReportedPeptideIdsSearcher`, `ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher` (aliased `INNER JOIN srch__protein_filterable_annotation_tbl` per cutoff).
- Used by: those searchers and their services/controllers (PSM list, PSM table, protein version ids, protein coverage, PSM downloads, Blib).
- How to use / extend: prefer an existing searcher/service. If you must add one, copy the loop from `PsmIds_OR_PsmCount_...` (one nested level per cutoff; bind `annotation_type_id` then cutoff value in the same order). Add `is_decoy != 1` / `protein_is_decoy != 1` only when `SearchFlagsForSingleSearchId_SearchResult_Cached` says `isAnyPsmHas_IsDecoy_True()`.
- Do not use when: an existing searcher already returns the filtered ids.
- Limits and gotchas: an AND of several best-PSM-value columns at peptide level does not guarantee one PSM passes all cutoffs, so the peptide searcher re-checks each peptide with a PSM count query when >1 PSM cutoff, decoys present, mod-position cutoffs, or min-PSMs > 1. The protein-cutoff SQL block is copied into 4 searchers (no shared builder). Possible defect (seen in code, not runtime-tested): in `PsmIds_OR_PsmCount_...`, mod-position cutoffs with NO PSM cutoffs add `?` placeholders but the bind branch binds only searchId and reportedPeptideId (would be a JDBC error).
- Related / duplicates: default-cutoffs fast path (next); Data access area.
- Status: verified

### Default-cutoffs fast path (precomputed lookup data at import-time defaults)
- What it solves: when the user's cutoffs exactly equal the import-time defaults, read precomputed reported-peptide lists / PSM counts from lookup tables instead of filtering annotation rows.
- Search keywords: default cutoffs, default filters, fast path, precomputed, psm count at default cutoff, lookup table, search__rep_pept__lookup_tbl
- Location: `J/searcher_utils/DefaultCutoffsExactlyMatchAnnTypeDataToSearchData.java` (`defaultCutoffsExactlyMatchAnnTypeDataToSearchData(searchId, searcherCutoffValuesSearchLevel)`); `J/searchers/ReportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcher.java`; `J/searchers/PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher.java` (`search__rep_pept_sub_group_lookup_tbl`).
- Used by: `J/services/ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service`, `Psm_Count_PerReportedPeptide_SubSearchGroup_..._RestWebserviceController`.
- How to use / extend: call the helper first; if true use the lookup-table searcher, else the general one. For reported peptides always call the service, not either searcher (both carry a WARNING).
- Do not use when: the data is not precomputed at defaults.
- Limits and gotchas: throws if the DB has `default_filter_at_database_load = 1` with a null default value (TODO in code). Precomputed counts split targets / independent decoys / decoys.
- Related / duplicates: import-time default-cutoff evaluation (below).
- Status: verified

### Filtered reported-peptide list and PSM ids / counts at cutoffs
- What it solves: reported peptide ids (+ has-mods / open-mod / reporter-ion flags, PSM counts when known) passing the cutoffs for one search; PSM ids or count per (searchId, reportedPeptideId) passing PSM + mod-position cutoffs, excluding decoys.
- Search keywords: reported peptide ids, peptide list, filtered peptides, peptides meeting cutoffs, minimum PSMs, psm ids, psm count, filtered PSMs
- Location: service `J/services/ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service` (`getPeptideDataList(searchId, searcherCutoffValuesSearchLevel, minPsms)`, cached Guava `LoadingCache`); result `J/searchers_results/ReportedPeptide_MinimalData_List_FromSearcher_Entry.java`; PSM side `J/searchers/PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher.java` (`getPsmIdsForSearchIdReportedPeptideIdCutoffs` uncached, `getPsmCountForSearchIdReportedPeptideIdCutoffs` cached, max 8000 entries).
- Used by: service — `ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RestWebserviceController`, `PsmTable_Data_PerReportedPeptide_...Controller`, `PsmFilterableAnnotationData_PerReportedPeptide_...Controller`, `ProteinVersionIdsFor_SearchID_SearchCriteriaService`, PSM download controllers, Blib controller; PSM searcher — additionally `PSM_List_RestWebserviceController`, `Psm_IDs_PerReportedPeptide_..._RestWebserviceController`, `Psm_Count_PerReportedPeptide_...` and the per-reported-peptide PSM mod / reporter-ion mass controllers (re-checked by grep).
- How to use / extend: inject the service IF; pass a `SearcherCutoffValuesSearchLevel`.
- Do not use when: peptides for given ids (per-id searchers); many peptides' PSMs at once (one query per reported peptide).
- Limits and gotchas: entry PSM counts are `Integer.MIN_VALUE` "not set" unless computed / in DB. The service weigher computes `150 + bytes/1024.0` (operator precedence; intent inferred, not confirmed). Per-peptide re-check uses parallel streams when enabled by config.
- Related / duplicates: in-memory cache pattern (Storage / caches areas).
- Status: verified (re-checked)

### Import-time default-cutoff evaluation and best-PSM-per-reported-peptide
- What it solves: during import, decide whether each PSM passes the search's default cutoffs (`AnnotationTypeFilterableDTO.defaultFilterValueAtDatabaseLoad` + ABOVE/BELOW), count passing targets / independent decoys / decoys, track the best PSM value per annotation type per reported peptide; these feed the `search_reportedpeptide__lookup` and best-PSM-value lookup records.
- Search keywords: default cutoff, passes filter, best psm value, psm count at default cutoff, lookup table, target decoy count
- Location: `IMP/process_input/DoesPsmPassDefault_PsmFilterable_Cutoffs`, `DoesPsmPassDefault_ModificationPosition_Cutoffs`, `BestPsmFilterableAnnotationProcessing` (`getInstance`, `updateForCurrentPsmFilterableAnnotationData`, `getBestPsmValues`), `IMP/objects/PsmStatisticsAndBestValues`, `IMP/process_input/CreateSearchReportedPeptideLevelLookupRecords`.
- Used by: `ProcessPSMsForReportedPeptide`; `CreateSearchReportedPeptideLevelLookupRecords` by `lookup_records_create_update/LookupRecordsCreate_Main` and `batch_insert_db_records/SearchReportedPeptideLevelLookupRecords_Records_BatchInsert_DB_Records`.
- How to use / extend: add new per-reported-peptide summary fields to `PsmStatisticsAndBestValues` and set them in `CreateSearchReportedPeptideLevelLookupRecords`.
- Do not use when: in the webapp at query time (cutoff SQL + the fast-path check).
- Limits and gotchas: null default value = no cutoff (passes); lookup records exist at DEFAULT cutoffs only.
- Related / duplicates: annotation min/max accumulator (next).
- Status: verified (lookup creator skimmed)

### Search-level annotation min/max/best/worst (importer accumulator + populate backfill)
- What it solves: per search and filterable annotation type, min, max, best and worst values (by filter direction), stored in the search-level min/max table and returned to the front end.
- Search keywords: annotation min max, score range, best worst value, filter range, search level annotation stats, search_level_annotation_min_max_tbl
- Location: importer `IMP/annotation_data_min_max_accumulation_computation/AnnotationData_MinMax_AccumulationComputation_SingletonInstance.java` (`store_AnnotationTypeDTO_OnlyWhenContains_AnnotationTypeFilterableDTO`, `add_AnnotationDataBaseDTO`, `storeInDB(searchId)`); backfill `limelight__db_populate_new_fields__common_code` `populate_table_search_level_annotation_min_max_tbl/**` (`save_MinMax_ToDB`).
- Used by: importer `dao/AnnotationTypeDAO` (registers types), the five `DB_Insert_*FilterableAnnotation*DAO`s (add values as a side effect), `ProcessReportedPeptidesAndPSMs` (`storeInDB`); backfill via the populate-new-fields framework.
- How to use / extend: any new filterable-annotation insert DAO must call `add_AnnotationDataBaseDTO` for each value.
- Do not use when: outside one importer process (static singleton, one search, no reset).
- Limits and gotchas: throws for an unregistered type or a direction other than ABOVE/BELOW. Possible defect (observed in source, UI impact not checked): the backfill sets best=max, worst=min for BOTH directions, while the importer uses best=min for BELOW — so backfilled rows for BELOW annotations (e.g. q-values) likely have best/worst swapped vs imported rows.
- Related / duplicates: importer and backfill compute the same values separately.
- Status: verified

## Default cutoffs

### Default cutoffs + default annotation-type display (server builder)
- What it solves: builds (and optionally saves -> lookup code) the default `SearchDataLookupParamsRoot` for projectSearchIds: default filter value per filterable type (from import `AnnotationTypeFilterableDTO.defaultFilterValue`, overridden by project-level defaults matched on annotation-type name + search-program name) and default display ann-type ids (types with a `displayOrder`, sorted). Covers PSM, reported peptide, matched protein, modification-position filters and PSM-peptide-position display.
- Search keywords: default cutoffs, default filters, project default cutoffs, initial page filters, annotation type display order, default ann types, append searches to existing params
- Location: `J/search_data_lookup_parameters_code/main/`: `SearchDataLookupParams_CreateObjectForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF.createSearchDataLookupParamsRoot_forDefaults(projectId, projectSearchIds, projectSearchIdsToSearchIds|null, existingRoot|null)` (object only; class package-private) and `SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF.create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds(...)`.
- Used by: `J/services/SearchDataLookupParametersLookupCode__Create_InsertToDB__Service`; experiment webservices (`AddSaveExperiment_RestWebservice`, `Experiment_Get_RestWebservice`, `Experiment_List_RestWebservice`, `Experiment_List_Drafts_RestWebservice`, `Experiment_Delete_RestWebservice`). The project page "open data pages" flow posts `projectSearchIds_CreateDefault` to the lookup-code webservice rather than computing defaults itself.
- How to use / extend: pass `existingRoot` to APPEND defaults for added searches (must be at CURRENT_VERSION_NUMBER or it throws); pass the projectSearchId -> searchId map if you have it.
- Do not use when: converting a chosen root into searcher cutoffs (use `SearcherCutoffValues_Factory`).
- Limits and gotchas: override matching is by NAME strings; one DB round-trip set per projectSearchId; PSM-peptide-position descriptive types faked as an empty map.
- Related / duplicates: client-side experiment default cutoffs (below) — equivalence not checked.
- Status: verified

### Project-wide default filter cutoff overrides (searcher, REST, transaction service, UI)
- What it solves: lets a project owner override, per search program name + annotation type name, the default PSM / peptide / protein / modification-position cutoffs from import; applied when searches are opened from the project page and when searches are added to an experiment.
- Search keywords: default cutoffs, project defaults, project level cutoffs, override cutoffs, q-value default, annotation cutoff, filter defaults
- Location: searcher `J/searchers/ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher` (`getAllForProjectId`; tables `project_level_default_fltr_ann_cutoffs_tbl` + `..._cutoff_as_string_tbl`); REST `Project_Level_Filter_Default_Cutoffs_Override_Maint__Get_RestWebserviceController` / `..._Save_...` -> `ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService_IF.saveUpdate(projectId, entries)`; front end `DP/data_pages_common/defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval.ts` (read), `FE/data_pages/other_data_pages/project_page/project_page__set_project_wide_default_filter_cutoffs_overrides/` (overlay, `..._GetDataFromServer.ts`, `..._SaveDataToServer.ts` POST `d/rws/for-page/project-level-filter-default-cutoffs-override_MAINT--save`).
- Used by: server default-cutoffs builder; project page `ProjectPage_SearchesAdmin`; experiments section loaders.
- How to use / extend: read effective overrides with `defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval`; save replaces the project's set in one transaction.
- Do not use when: per-search cutoffs (lookup params) or per-user saved filters (saved views / default view).
- Limits and gotchas: keyed by names, not annotation type ids; the searcher INNER JOINs the string table (a row without its string row is dropped); the save method has four copy-pasted loops. Overrides are applied in two places (server default builder and experiments front end).
- Related / duplicates: client-side experiment default cutoffs.
- Status: verified (front end and REST); server save internals only grepped

### Client-side default per-search cutoffs for experiments (`create_experiment_SearchFilterValuesFromDefaultCutoffs`)
- What it solves: fills an `Experiment_ConditionGroupsDataContainer` with default PSM / peptide / protein / mod-position cutoffs and annotation display for each projectSearchId, from annotation-type defaults plus project-wide overrides.
- Search keywords: default cutoffs, experiment filters, annotation type default filter value, project-wide cutoff overrides
- Location: `FE/data_pages/other_data_pages/project_page/project_page_experiments_section/create_experiment_SearchFilterValuesFromDefaultCutoffs.ts`; inputs from `projPg_Expermnts_Load_SearchesData_ForProject.ts` (`getSearchesDataForProject_ExperimentProcessing`: searches, programs, annotation types, overrides for a whole project).
- Used by: `projPg_Expermnts_Single_MaintRoot.tsx` only.
- How to use / extend: pass the projectSearchIds, search map, loader result and container (mutated in place; existing entries kept).
- Do not use when: project-search-id data pages (defaults come from the server builder).
- Limits and gotchas: parallel to the server default logic; identical results NOT verified. The loader builds throwaway `DataPageStateManager` instances and loads every search in the project.
- Related / duplicates: server default-cutoffs builder.
- Status: verified (equivalence with server unverified)

## Search data lookup parameter codes

### SearchDataLookupParamsRoot object model + version number (Java)
- What it solves: the JSON shape for per-search filters and display choices that the server stores and the front end edits: `versionNumber`, list of per-search `SearchDataLookupParams_For_Single_ProjectSearchId` (`projectSearchId`, `psmFilters`, `reportedPeptideFilters`, `matchedProteinFilters`, `modificationPositionFilters` as `{annTypeId, value}` lists; display lists `psmAnnTypeDisplay`, `reportedPeptideAnnTypeDisplay`, `matchedProteinAnnTypeDisplay`, `bestPsm_AnnTypeDisplay`, `psmPeptidePosition_AnnTypeDisplay`).
- Search keywords: search criteria, cutoffs request object, filter values per annotation type, ann type display, versioned params JSON, webservice request cutoffs, searchDataLookupParams
- Location: `J/search_data_lookup_parameters_code/lookup_params_main_objects/` (`SearchDataLookupParamsRoot`, `SearchDataLookupParams_For_ProjectSearchIds`, `SearchDataLookupParams_For_Single_ProjectSearchId`, `SearchDataLookupParams_Filter_Per_AnnotationType`); `constants/SearchDataLookupParams_VersionNumber` (MINIMUM = CURRENT = 1); `internal_objects_for_json/RootIdsObj`.
- Used by: about 20 Java files; the per-search object is the standard "search criteria" field of many single-search REST request roots (PSM list, PSM table, reported peptide ids, PSM downloads) and `SearcherCutoffValues_Factory`.
- How to use / extend: for a new cutoff-respecting per-search webservice, accept a `SearchDataLookupParams_For_Single_ProjectSearchId` and convert with the factory. To add a field, change this class and the TypeScript mirror together; bump the version if old JSON must be migrated.
- Do not use when: experiment-level state (experiments embed lookup codes).
- Limits and gotchas: mutable Jackson POJOs; a null `annTypeId` NPEs in the sort.
- Related / duplicates: front-end mirror (below).
- Status: verified

### Lookup code: save + dedupe + issue, and resolve
- What it solves: turns a `SearchDataLookupParamsRoot` into a short stable shareable code stored in the DB (identical params -> same code), and resolves a URL code back to its record.
- Search keywords: lookup code, URL code, cutoffs in URL, filter params code, shareable link params, hash of params, MD5, hash collision index, content-addressed, searchDataLookupParametersCode, parse lookup code
- Location: `J/search_data_lookup_parameters_code/main/SearchDataLookupParams_MainProcessing.java` (`searchDataLookupParams_Save_Create_Code(root, rootIdType, singleProjectSearchIdCreatedDefaultsFor, createdByInfo)`, `searchDataLookupParams_Save_ReturnObject`), `SearchDataLookupParams_Save.java` (`@Transactional` parent row + one assoc row per projectSearchId), `SearchDataLookupParams_FormatParseCodeString.java`; resolve `SearchDataLookupParams_GetRecordForCodeIF.getSearchDataLookupParametersLookupDTO_RecordForCode(code)`; DAOs `SearchDataLookupParametersLookupDAO`, `SearchDataLookupParametersLookupAssocProjSrchIdDAO`.
- Used by: save — the lookup-code service, default-cutoffs create+save, experiment webservices and `Experiment_AddSave_MainProcessing`; resolve — `DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor` (every project-search-id data page; sets `WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS[_JSON]`), `FeatureDetectionView_Controller`, `Validate_Access_Page_ExperimentDataPage`.
- How to use / extend: set `versionNumber` = CURRENT, root id type `PROJECT_SEARCH_IDS`, and a `SearchDataLookupParams_CreatedByInfo`. Algorithm: sort filter lists by annTypeId -> Jackson JSON -> MD5 hex -> reuse a row with byte-identical JSON else insert with `hashCollisionIndex = max+1`; retries up to 20 times on `DuplicateKeyException`. Code = `<md5hex>z<collisionIndex>` (parser accepts legacy `_`). Inside a data-page request, read the root from the request attribute instead of resolving again. Autowire the resolve IF with field name `searchDataLookupParams_GetRecordForCode`.
- Do not use when: browser-only state (use the front-end page-state blob after `/q/`); root ids other than projectSearchIds (throws).
- Limits and gotchas: hash is over JSON, so order matters; `modificationPositionFilters` is NOT sorted (same logical params, different order -> a second row/code; harmless duplicate). `singleProjectSearchIdCreatedDefaultsFor` is unused. Rows are never deleted by this code (cleanup not found). Two `@Component`s implement the resolve IF: `SearchDataLookupParams_GetRecordForCode` and an unused byte-identical copy `SearchDataLookupParams_GetProjectSearchIdsForCode`; by-type autowiring works only through the field-name fallback (renaming a field would likely fail startup — inferred, not tested). Malformed code -> `IllegalArgumentException`.
- Related / duplicates: Webservices area (same entries, request flow view).
- Status: verified

### Lookup-code service facade + REST endpoint
- What it solves: one call that either creates defaults for `projectSearchIds_CreateDefault` (optionally appended to a supplied root) or saves a supplied root as-is; returns root + code + DTO.
- Search keywords: get search data lookup params code, new URL code, change searches, reorder searches, update page URL with cutoffs, create default code, q code
- Location: `J/services/SearchDataLookupParametersLookupCode__Create_InsertToDB__Service.java` (+ `_IF`); REST `J/spring_mvc_parts/data_pages/rest_controllers/multiple_project_search_id/Get_SearchDataLookupParametersLookupCode_RestWebservice.java`, path `d/rws/for-page/psb/get-search-data-lookup-params-code` (`AA_RestWSControllerPaths_Constants.GET_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_REST_WEBSERVICE_CONTROLLER`).
- Used by: the REST controller and the data-page interceptor; front end `updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts`, `searchDetailsAndFilterBlock_ChangeSearches.ts`, `searchDetailsAndFilterBlock_Re_Order_Searches.ts`, `projectPage_SearchesSection_Open_DataPages_PeptideProteinMod.ts`, `featureDetection_ViewPage__MainPage_Component.tsx`.
- How to use / extend: front end — reuse `updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts` rather than adding a caller; never build codes yourself.
- Do not use when: you only need the current page's params (already loaded).
- Limits and gotchas: all projectSearchIds must be in one project; defaults path requires root version == CURRENT, save-as-is path checks only `>= MINIMUM`; all-null result if neither input given. Five front-end files hard-code the URL string with their own request/response handling.
- Related / duplicates: Webservices area.
- Status: verified

### Search data lookup parameters: client side (TypeScript mirror, read from page, update URL)
- What it solves: the TypeScript mirror of `SearchDataLookupParamsRoot`: read from the page at load, validated; when the user changes cutoffs, POST for a new code and replace it in the URL.
- Search keywords: filter cutoffs, cutoff values, search data lookup params, searchDataLookupParamsCode, psmFilters, annotation type display, change filters, new code
- Location: `DP/data_pages__common_data_classes/searchDataLookupParameters.ts` (`SearchDataLookupParameters_Root`, `SearchDataLookupParams_For_Single_ProjectSearchId`, `copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root`); `DP/data_pages_common/getSearchDataLookupParametersFromPage.ts` (DOM ids `search_data_lookup_parameters_at_page_load_code` / `_json`); `updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts`; `updatePageState_URL_With_NewFilterCutoffs_FromUser.ts`; `page_Update_From_search_data_lookup_parameters_lookup_code__computed.ts`.
- Used by: classes in 64 files; `GetSearchDataLookupParametersFromPage` in 11 page roots; `UpdatePageState_URL_With_NewFilterCutoffs_FromUser` in `searchDetailsAndFilterBlock_UserInput_OverlayContents.tsx`; `updatePageState_URL_With_New_SearchDataLookupParameters_Root` in the annotation-types-to-display overlay; `page_Update_From_..._computed` in 5 page roots.
- How to use / extend: read params from `DataPageStateManager.get_searchDetailsCriteriaData()`, never re-parse the DOM. Change Java and TS together when adding a field.
- Do not use when: experiment pages (experiment id + optional `/c/<code>`; per-search cutoffs live in the experiment data container).
- Limits and gotchas: one DB row per distinct params; the URL helper passes `experimentId: undefined`; navigation happens in callers. Idea to inline params in the URL: `limelight_features_docs/compressing_strings_stored_in_the_url.md`.
- Related / duplicates: experiment per-search filter holder (parallel storage).
- Status: verified

## Search sub-groups

### Sub-group detection and save at import
- What it solves: collect distinct PSM `subgroup_name` values (all-or-none rule) and assign per-search sequential `searchSubGroupId`s.
- Search keywords: sub search, sub group, subgroup_name, condition, replicate, import sub groups
- Location: `IMP/search_sub_group_processing_validating/PreprocessValidate_SearchSubGroups`, `Process_SearchSubGroups_SaveAtSearchLevel` (saves via `SearchSubGroupDAO`).
- Used by: `IMP/process_input/ProcessLimelightInput` (both).
- How to use / extend: the returned `Map<label, SearchSubGroupDTO>` is passed to PSM processing to tag each PSM.
- Do not use when: outside import.
- Limits and gotchas: ids 1..N assigned while iterating a `HashSet` (not ordered by name or file order); one distinct name = no sub-groups.
- Related / duplicates: `limelight_features_docs/limelight_search_sub_groups_deep_dive.md`.
- Status: verified

### Sub-group searchers and webservices (server)
- What it solves: sub-group list per search, PSM -> sub-group map, PSM counts per sub-group (by PSM ids, or precomputed at default PSM cutoffs), reported-peptide -> sub-group, has-sub-groups check; REST for counts, PSM map and owner rename/reorder.
- Search keywords: sub group, sub search, subgroup, condition, replicate, psm_search_sub_group_tbl, rename sub group, sub group display order
- Location: `J/searchers/` `SearchSubGroupDTOForSearchIdSearcher`, `PsmSearchSubGroupIdsForPsmIdsSearcher`, `PsmCountSearchSubGroups_For_PsmIds_Searcher`, `PsmCountSearchSubGroupsForSearchIdReportedPeptideIds_DefaultPSMCutoffs_Searcher`, `SearchRepPeptSubGroupDTOForSearchIdReportedPeptideIdsSearcher`, `SearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher`, `Search_Has_SearchSubGroups_ForProjectSearchIdSearcher`; REST (single project search id) `Psm_Count_PerReportedPeptide_SubSearchGroup_..._SearchCriteria_...` (filtered), `SearchSubSearchGroupId_PsmId_NOT_FIltered_...` (unfiltered), `SubGroups_Update_User_Updatable_Data_Single_ProjectSearchId_...` (-> `SubGroups_Update_UserUpdatableData_UsingDBTransactionService_IF`). Names come with `SearchNameList_From_ProjectSearchIds_RestWebserviceController`.
- Used by: `SearchNameList_From_ProjectSearchIds_RestWebserviceController`, the data-page interceptor (has-sub-groups), front-end loaders `..._Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters.ts`, `..._SearchSubGroupId_ForPSM_ID_NOT_Filtered.ts`, `searchSubGroup_Manage_GroupNames_UpdateServer.ts`.
- How to use / extend: names and order from the search-name-list load; PSM membership from the PSM -> sub-group map.
- Do not use when: multi-search views (`searchSubGroupId` is unique only within a searchId); aggregating quant (read the quant aggregation doc).
- Limits and gotchas: `..._ALL_..._IncludesDecoys` searcher is unfiltered. `SearchSubgroups_At_SearchLevel_...` controller is disabled; `ProjectSearchSubGroupDTOForProjectSearchIdSearcher` param named `searchIds` holds projectSearchIds (a naming issue).
- Related / duplicates: Data access area; Webservices area.
- Status: verified

### Sub-group display label computation (Java)
- What it solves: short (max 8 chars) display labels for sub-groups from import names (strips common suffix, picks a separator), preferring a user label; sorts by display order / label.
- Search keywords: sub group name, sub search label, short label, display name abbreviation
- Location: `J/web_utils/SearchSubGroup_Name_Display_Computation_Util` (`searchSubGroup_Name_Display_Computation__SortOn_DisplayOrder_SubGroupNameDisplay__Util`; entries `SearchSubGroup_Name_Display_Computation_Entry`).
- Used by: `SearchNameList_From_ProjectSearchIds_RestWebserviceController`, both PSM download controllers.
- How to use / extend: fill the entry list, call, read `subgroupName_Display`.
- Do not use when: n/a.
- Limits and gotchas: algorithm only partly read; whether the front end recomputes labels not checked.
- Related / duplicates: front-end sub-group code.
- Status: verified (algorithm details partly unread)

### Sub-group selection state, helpers and UI (front end)
- What it solves: which sub-groups ("Sub Searches") are selected on single-search pages, stored in URL state (or inside the single-protein state); effective selected set; "are all selected"; filter UI in the search details block and single-protein "Filter On"; logged-in rename/reorder overlay.
- Search keywords: sub group, sub search, search sub group, subgroup selection, rename subgroups, selected sub groups
- Location: `DP/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass.ts` (`getNewInstance_MainPage`, `getNewInstance_SingleProtein`); `DP/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds.ts`, `searchSubGroup_Are_All_SearchSubGroupIds_Selected.ts`; UI `.../jsx/searchSubGroup_In_SearchDetailsOuterBlock.tsx`; manage names `.../search_sub_group_manage_group_names/` (POST `d/rws/for-page/psb/sub-groups-update-user-updatable-data-single-project-search-id`); per-page copies `compute_searchSubGroup_Ids_Selected` / `compute_searchSubGroup_PropValue` in the peptide, single-protein, protein-list and scan-file-to-searches nonClass function files.
- Used by: state class 20 files; `..._Get_Selected_...` 12; `..._Are_All_...` 27; all `*_FiltersDisplay_ComponentData.ts`.
- How to use / extend: always go through `searchSubGroup_Get_Selected_SearchSubGroupIds` (state stores `undefined` for "all selected" and a flag for "none selected").
- Do not use when: multi-search views (state is cleared when projectSearchIds != 1).
- Limits and gotchas: template for the central-state-object pattern. The manage-names overlay calls `search-name-list-from-psi` directly instead of `retrieveSearchNamesFromServer`. Per-page `compute_searchSubGroup_*` helpers are duplicated (not diffed).
- Related / duplicates: `limelight_features_docs/limelight_search_sub_groups_deep_dive.md`.
- Status: verified

## Experiments and conditions

### Experiment condition model (condition groups / conditions + server JSON deserializer)
- What it solves: typed front-end model of an experiment design: `Experiment_ConditionGroupsContainer` (groups, schema `version`, next-id counters), `Experiment_ConditionGroup` (id, label, conditions, type flags continuous / discrete / biological replicate / technical replicate / time point / `specialConditionGroup`), `Experiment_Condition`; builds and validates from server JSON.
- Search keywords: experiment, condition group, condition, replicate, time point, experiment design, experiment builder, conditionGroupsContainer, condition id
- Location: `DP/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes.ts` (`cloneShallow`, `conditionGroupId_GetNextValue`, `conditionId_GetNextValue`, `create_Experiment_ConditionGroupsContainer_AndChildren_From_ServerSideParsedJSON`); Java counterpart `J/experiment/main_objects/Experiment_ConditionGroupsContainer.java` (+ `Experiment_A_Root.java`, `Experiment_OverallConditionDataRoot.java`; saved via `AddSaveExperiment_RestWebservice.java`).
- Used by: about 30 files: experiment page roots, project-page experiment builder (`projPg_Expermnts_Single_MaintRoot.tsx`, `projPg_Expermnts_Single_ConditionGroupMaint.tsx`), `proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`.
- How to use / extend: get it from `GetExerimentMainDataFromPage` on a data page; new ids from the `..._GetNextValue()` methods (never reused). Adding a field: update TS class + deserializer AND the Java class (round-trips on save).
- Do not use when: you need which searches are in a cell (data container, next).
- Limits and gotchas: constructor params mostly optional (`?`), so missing fields fail open; `version` defaults to 1; deserializer requires `label` and numeric `id`.
- Related / duplicates: Java experiment main objects.
- Status: verified

### Experiment condition data container (condition path -> projectSearchIds, plus per-search filters)
- What it solves: for each main cell (condition id path, order-independent) the `Set` of projectSearchIds; per-projectSearchId cutoffs and annotation display; iterate all / selected cells, delete by condition, serialize for save.
- Search keywords: conditionGroupsDataContainer, main cell data, searches per condition, condition path, projectSearchIds per condition, experiment data
- Location: `DP/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class.ts` (`get_data`, `put_data`, `get_data_ForProjectSearchId`, `processAllDataEntries_ConditionGroupsDataContainer`, `processAllDataEntries_ForSelectedConditionIds_ConditionGroupsDataContainer`, `getAllData_ForSave_ConditionGroupCondition`, `delete_data_For_ConditionId`, `clearConditionData`, `cloneShallow`); per-search holder `experiment_conditionGroupsDataContainer_PerProjectSearchIdData_AndChildren_Classes.ts` (`Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData`).
- Used by: about 26 files, e.g. experiment MainContent components, `projPg_Expermnts_Single_MaintRoot.tsx`, `experiment_User_Set_Searches_Filters.tsx`, `create_experiment_SearchFilterValuesFromDefaultCutoffs.ts`, `projPg_Expermnts_Single_MainCellMaint.tsx`.
- How to use / extend: prefer the query helpers (next) over hand-walking the callback; reach per-search filters through `get_data_ForProjectSearchId`.
- Do not use when: you only need all searches on the page (`experiment_project_search_ids_at_page_load`); non-experiment pages (cutoffs come from `SearchDataLookupParameters_Root`).
- Limits and gotchas: `cloneShallow` shares inner data (only for React `===` change detection). Editing groups/conditions in the builder clears cell data. Per-search data for searches under no condition is never saved. The per-search holder parallels `SearchDataLookupParameters_Root` (conversion paths not traced).
- Related / duplicates: search data lookup params (client side).
- Status: verified

### Read experiment data embedded in the page
- What it solves: reads server-embedded `<script type="text/text">` blocks (`experiment_id_string`, `experiment_name_from_server`, `experiment_main_data_at_page_load_json`, `experiment_project_search_ids_at_page_load_json`), checks `version === 1`, builds model + container, removes the elements.
- Search keywords: experiment id from page, experiment JSON in page, page load data, DOM JSON, experiment name
- Location: `DP/experiment_data_pages_common/getExerimentMainDataFromPage.ts` (`GetExerimentMainDataFromPage.getExerimentMainDataFromPage({searchDataLookupParamsRoot})`; note "Exeriment" misspelling); emitted by `limelight_webapp/src/main/webapp/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp`.
- Used by: protein / peptide / mod experiment page root classes.
- How to use / extend: call once at init after reading the lookup params; keep the results on the root instance.
- Do not use when: not an experiment page (throws).
- Limits and gotchas: single-shot (elements removed). Its private DOM-unescape helper is copy-pasted in about 10 files.
- Related / duplicates: `getSearchDataLookupParametersFromPage.ts`.
- Status: verified

### Experiment searches-by-condition query helpers
- What it solves: static helpers returning search ids grouped by condition: all ids; any ids?; per condition of the first group; per condition of a given group filtered on a parent path; two-level map.
- Search keywords: projectSearchIds for condition, searches per condition, first condition group, condition path filter
- Location: `DP/experiment_data_pages_common/experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer.ts` (`get_All_ProjectSearchIds`, `get_Is_ANY_ProjectSearchId_In_conditionGroupsDataContainer`, `getProjectSearchIds_For_First_ConditionGroup`, `getProjectSearchIds_For_ConditionGroup_FilteringOn_ConditionIdsParentPath`, `getProjectSearchIds_For_ConditionGroup_FirstConditionGroup_FilteringOn_ConditionIdsParentPath`).
- Used by: `projPg_Expermnts_Single_MaintRoot.tsx`, `proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts`, `generatedReportedPeptideList_For_Last_ConditionGroup_PerCondition_Rows_CreateListData.ts`, `generatedReportedPeptideList_For_All_But_Last_ConditionGroup_PerCondition_Rows_CreateListData.ts`.
- How to use / extend: add a new static here rather than another ad hoc walk.
- Do not use when: you must honor the user's selected cells (use the container's selected-cells iterate, as `proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group.ts` does).
- Limits and gotchas: returns `Map<conditionId, Set<projectSearchId>>`; may be empty.
- Related / duplicates: `proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group` (same grouping + selection filter).
- Status: verified

### Condition labels per search (for downloads / columns)
- What it solves: `Map<projectSearchId, Array<{conditionGroupLabel, conditionLabel}>>` plus ordered group labels, so each per-search row can get one column per condition group.
- Search keywords: condition label for search, condition group label, download condition columns
- Location: `DP/experiment_data_pages_common/experiment_Get_ConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId.ts`.
- Used by: `peptide_And_SingleProtein_Experiment__CreateReportedPeptideDisplayDownloadDataAsString.ts`, peptide / protein / single-protein experiment MainContent components.
- How to use / extend: pass the (possibly re-ordered) container so labels follow display order.
- Do not use when: a search can appear in two main cells (behavior then is an assumption, unverified).
- Limits and gotchas: file header says "NOT TESTED CODE", yet it feeds downloads.
- Related / duplicates: `mainCell_getHoverContents_StandAlone` resolves condition labels from a path too.
- Status: verified (code + users); correctness not tested

### Selected conditions and condition-group display order (URL state)
- What it solves: which condition cells the user selected (persisted in the URL, stale selections cleared) and a user display order for condition groups (URL; not saved to the experiment) applied as a re-ordered shallow clone, with a drag-and-drop re-order overlay.
- Search keywords: selected conditions, condition selection, filter by condition, selected cells, reorder condition groups, condition group order, drag and drop
- Location: `DP/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections.ts` (`ExperimentConditions_GraphicRepresentation_SelectedCells`, `__YES__` / `__NO__` factories); `experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.ts` (URL key 'g'); `experiment_SelectedConditionIdsAndPaths_Clear_CentralStateManagerObject_If_AnySelection_NOT_Found_InExperiment.ts`; `experiment_ConditionGroups_Order_CentralStateManagerObjectClass.ts` (URL key 'r'); `experiment_ConditionGroups_UpdateOrderFrom_Order_StateObject.ts`; `experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component_WithOpenFunction.tsx`.
- Used by: protein / peptide / mod experiment roots and MainContent components; `projPg_Expermnts_Single_MaintRoot.tsx` (selections class).
- How to use / extend: root creates the main-page instances and runs the clear helper after loading; use `getNewInstance_SingleProtein()` for overlay-local selection.
- Do not use when: changing the saved experiment (project-page builder).
- Limits and gotchas: the selections class assumes it is the only writer of its state object; first-group selections are id sets, later groups are paths.
- Related / duplicates: central state manager pattern (UI area).
- Status: verified (selection algorithm skimmed)

### Per-condition protein metrics (searches per condition, NSAF, ABACUS, combined ids)
- What it solves: on the experiment protein list, per-condition (first group, honoring selection) search ids, NSAF, ABACUS, NSAF-using-ABACUS, and combined reported-peptide / PSM ids per condition.
- Search keywords: per condition NSAF, ABACUS per condition, experiment protein list, PSM count per condition, combine reported peptide ids
- Location: `DP/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/`: `proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group.ts`, `..._Compute_NSAF_Per_ExperimentConditionId.ts`, `..._Compute__Adjusted_Spectral_Count_ABACUS__Per_ExperimentConditionId.ts`, `..._Compute_NSAF__Using_Adjusted_Spectral_Count_ABACUS__Per_ExperimentConditionId.ts`, `..._Combine_ReportedPeptideIdsPsmIds_Per_ExperimentConditionId.ts`.
- Used by: `proteinExperimentPage_Display_MainContent_Component.tsx`, `proteinExperimentPage_DisplayData_ProteinList__Create_ProteinList_DataTable_RootTableDataObject.ts`.
- How to use / extend: template for "roll a per-search computation up per condition".
- Do not use when: summing MS1 quant per condition (`limelight_features_docs/flashlfq_quant__do_not_silently_sum_across_scan_files_searches_conditions.md`).
- Limits and gotchas: feature-specific wrappers mirroring the single-search ones.
- Related / duplicates: NSAF and ABACUS entry.
- Status: verified (math not read)

### Experiment peptide download with condition columns; per-search cutoff editor
- What it solves: TSV download (`Search Id`, `Search Name`, `Sequence`, `PSM Count`, one column per condition group) for the experiment peptide page / single-protein overlay; and the project-page form that edits per-search PSM / peptide / protein cutoffs inside an experiment.
- Search keywords: download peptides, TSV, export experiment peptides, condition columns, edit cutoffs, set filters per search
- Location: `DP/experiment_driven_data_pages/peptide__single_protein__shared__exp__page/js/peptide_And_SingleProtein_Experiment__CreateReportedPeptideDisplayDownloadDataAsString.ts`; `FE/data_pages/other_data_pages/project_page/project_page_experiments_section/experiment_User_Set_Searches_Filters.tsx`.
- Used by: download — `peptideExperimentPage_Display_MainContent_Component.tsx`, `proteinExperimentPage_SingleProtein_MainContent_Component.tsx`; editor — `projPg_Expermnts_Single_MainCellMaint.tsx` only (header claims more users; grep found one).
- How to use / extend: the download is a good reference for showing a search correctly (real `searchId` + name from `get_searchNames_AsMap()`, never the projectSearchId); pair with `DP/data_pages_common/downloadStringAsFile.ts`.
- Do not use when: non-experiment pages (own download builders; search-details filter overlay for cutoffs).
- Limits and gotchas: download throws if a search lacks a name or condition labels.
- Related / duplicates: condition labels per search.
- Status: verified

## Statistics

### Two-proportion z-test (`ModPage_ModStatsUtils`) and the jStat typed wrapper
- What it solves: `getZScoreForTwoRatios({x1,n1,x2,n2})` (pooled two-proportion z), `getPValueForTwoRatios` (two-sided p); typed, result-checked calls to untyped jStat (`ztest`, `mean`, `stdev`).
- Search keywords: z-test, two proportions, compare ratios, p-value, jStat, ztest, mean, standard deviation, statistics
- Location: `PSB/mod_view_page/mod_page__js/mod_page_util_js/ModPage_ModStatsUtils.ts`; wrapper `FE/common_all_pages/external_libraries_without_typescript_definition__calls/jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.ts` (`Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls`: `call_jStat_ztest`, `call_jStat_mean`, `call_jStat_stdev`).
- Used by: ModStatsUtils — `ModPage_ZScore_ReplicateReport_DataTable_Component.tsx` only; wrapper — `ModPage_ModStatsUtils.ts`, `modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable.ts`, `ModView_DataViz_Histogram_Renderer.ts`.
- How to use / extend: use the wrapper for any new statistics; add more jStat calls there with the same number check.
- Do not use when: n1 + n2 = 0 or p = 0 / 1 (no guard; NaN / Infinity).
- Limits and gotchas: `flag` is passed only when truthy (undefined makes jStat return NaN); the `mean` error text says "stdev" (copy-paste); no input validation in ModStatsUtils.
- Related / duplicates: hand-rolled mean/SD in the mod viz compute.
- Status: verified (re-checked)

### Benjamini-Hochberg q-values (`ModPage_QValueCalculator`)
- What it solves: converts p-values to BH q-values (ties get largest rank; monotonic step-down), then looks up a q-value by p-value.
- Search keywords: q-value, FDR, Benjamini-Hochberg, multiple testing, p-value correction
- Location: `PSB/mod_view_page/mod_page__js/mod_page_util_js/ModPage_QValueCalculator.ts` (`new ModPage_QValueCalculator({ pValueArray })`, `getQvalueForPValue(p)`).
- Used by: `modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable.ts` only.
- How to use / extend: build once with all p-values, then query; move to common code before reusing elsewhere.
- Do not use when: values are not p-values in [0,1].
- Limits and gotchas: sorts the passed array IN PLACE; keyed by exact float; throws for unknown p. Only front-end q-value implementation found.
- Related / duplicates: none found.
- Status: verified (re-checked)

### Mod page statistical transforms and ratio denominators
- What it solves: per-mod-mass x per-search value matrix (PSM count, scan count, or ratio of total) with optional transforms: per-mod z-score, global z-score, global p-value with Bonferroni, BH q-value, scaled mean difference; and the denominators (total PSM count, or unique (searchScanFileId, scanNumber) pairs, per search / sub-search, main filters only or after secondary filters).
- Search keywords: z-score, p-value, q-value, Bonferroni, FDR, ratio, normalize, heatmap values, scaled mean diff, total PSMs, scan count, unique scans, denominator
- Location: `PSB/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable.ts` (entry of the same name, `{ data, promise }`); `mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.ts` (`getPsmCount_ForRatiosDenominator_For_ProjectSearchIds` + scan-count counterpart); helpers `mod_page_util_js/mod_page__compute__total__psm_id__counts__...ts`, `modPage_Compute_Total_Scan_Counts_...ts`; labels `modPage_Get_DataTransformationType_DisplayLabel`.
- Used by: `ModView_DataViz_Renderer.ts`, `ModView_DataViz_Histogram_Renderer.ts`, `ModView_DataViz_Compute_ColorScale_WidthHeight_Etc.ts`, `ModPage_TopLevel_ModificationList_DataTable_Component.tsx`, mod-page download builders, `modViewPage_Display_MainContent_Component.tsx`, `ModPage_ZScore_ReplicateReport_DataTable_Component.tsx`.
- How to use / extend: statistic choice from `ModViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY()`. Copy the unique scan counting if needed elsewhere.
- Do not use when: outside the mod page (private helpers bound to its result classes).
- Limits and gotchas: means / SDs hand-rolled (population SD, divides by n) while the histogram uses jStat; p-values via `jStat.ztest(z, 2)`. Sentinel -999999 for a null searchScanFileId in the pair key. These are counts (sum-safe), not MS1 quant.
- Related / duplicates: QC page totals computed separately (assumption, not checked).
- Status: verified (sub-search PSM-count path skimmed)

### Estimated error from independent decoys (clamp helper)
- What it solves: clamps an estimated error computed from independent decoys + FASTA statistics to [0,1]; a display component shows it.
- Search keywords: estimated error, FDR, independent decoy, decoy, FASTA statistics
- Location: `DP/data_pages_common/estimated_Error__From_IndependentDecoy__CommonCode.ts` (`Estimated_Error__From_IndependentDecoy__CommonCode.estimatedError_ClampTo_Zero_To_One`); component `DP/common_components__react/estimated_error__using_independent_decoy__fasta_file_statistics/`.
- Used by: clamp in 5+ QC estimated-error plots; component in `peptidePage_Display_MainContent_Component.tsx`, `proteinViewPage_DisplayData_ProteinList__Main_Component.tsx`.
- How to use / extend: reuse the clamp for any estimated-error value.
- Do not use when: n/a.
- Limits and gotchas: component internals not read.
- Related / duplicates: none.
- Status: unverified (component internals); clamp verified

---

## Cross-references (blocks owned by other areas)
- Chromatogram shared code, LOWESS / Savitzky-Golay smoothing (`DP/peptide_mass_utils/SmoothingUtils.ts`, misplaced in a mass folder), heatmap / histogram renderers, Plotly helpers -> [charts_visualization.md](charts_visualization.md).
- Needleman-Wunsch alignment, Mol* structure widget, ChimeraX export, protein sequence / bar widgets (trypsin cut-point tooltips) -> [charts_visualization.md](charts_visualization.md).
- Mod / reporter-ion selection filter (OR/AND/NOT + coordinator), "treat open-mod mass 0 as unmodified" option, protein position filters, current-filters display, filtering engine `GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class`, generated-peptide-contents controls, annotation-types-to-display overlay, protein-list user-selection state objects -> [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md).
- Annotation-value searchers parked in `search_data_lookup_parameters_code/searchers`, annotation "pivot to map" services, two-dimension annotation-value cache loaders, search flags, projectSearchId -> searchId searchers, `LoadCoreData_ProjectSearchIds_Based` / search-name retrieval, mod-page search-label helpers -> [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) and [data_access.md](data_access.md).
- Guava in-memory cache pattern (`ReportedPeptide_MinimalData_List_..._Service`, PSM count cache) -> [storage_files_external_services.md](storage_files_external_services.md) (caches).
- Populate-new-fields framework (host of the min/max and pre/post-residue backfills) -> [background_processing_queues_maintenance.md](background_processing_queues_maintenance.md).
- Enum-with-stored-value pattern, DTO hierarchy for annotation values, descriptive-annotation large-value split -> [data_access.md](data_access.md).
- Experiment save/load/list/delete webservices, conditions grid component, experiment page bootstrap -> [webservices_and_front_end_data_loading.md](webservices_and_front_end_data_loading.md) / [front_end_ui_components_page_framework.md](front_end_ui_components_page_framework.md).
- `yrc-proteomics.jar` and other committed jars -> [build_deploy_config.md](build_deploy_config.md).

## Duplicates and parallel mechanisms in this area
- **Mass code**: front-end `PeptideMassCalculator.ts` (prefer for browser code); Java library `PeptideMassCalculator` used directly by the APEX controller (the path in use); `PSMMassCalculator` (unused wrapper — grep-confirmed); hand-written m/z / isotope / ppm math in the APEX controller, chromatogram helpers, scan-file-browser plot; Lorikeet third-party masses. No preferred extraction identified — reuse an existing calculator rather than adding another.
- **Proton mass**: `1.00727647` (front-end calculator, APEX controller) vs hard-coded `1.007276466621` in the QC MS1 plot. Prefer importing `PROTON_MASS` in front-end code.
- **Isotope offset** computed in `chromatogram_Common_Helpers.ts` and privately in the scan-file-browser plot (prefer the common helper).
- **Mod-mass rounding**: 2-decimal display rounding (`modification_mass_rounding.ts`, prefer for display/grouping) vs reporter-ion copy; whole-number mod-page binning (`modPage_ModMass_Rounding_UTIL`) vs the protein page's own `Math.round` for the same handoff value.
- **Terminus encoding**: -999 / 99999999 numbers vs `'n'`/`'c'` strings (front end) vs Java "n"/"c" markers vs APEX position 0 / length+1. No preferred one identified.
- **I/L conventions**: importer I/L -> J, front-end loaders I -> L, user search string L -> I.
- **Two distinct-peptide builders** (`create_GeneratedReportedPeptideListData__SingleProtein` vs `..._Create_GeneratedPeptides`), both keyed on `create_reportedPeptide_CommonValue_EncodedString`; QC uses both. No preferred one (they serve different outputs).
- **Unique-peptide counting** in about 5 places (grouped wrappers, `..._NOT_GroupProteins.ts`, single-protein `peptideUnique`).
- **Trypsin rules**: `trypsinCutPointsForSequence.ts` vs `[KR][^P]` regex copied in QC digestion and the filtering engine (3 places, 2 rules).
- **Default cutoffs computed twice**: server `SearchDataLookupParams_CreateObjectForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds` vs client `create_experiment_SearchFilterValuesFromDefaultCutoffs` (equivalence unchecked). Project-wide overrides applied in both.
- **Per-search cutoff storage**: `SearchDataLookupParameters_Root` vs experiment `Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData`.
- **Annotation min/max/best/worst** computed by the importer and by the populate backfill (backfill BELOW direction looks swapped). ABOVE/BELOW comparison written separately in 4 importer classes.
- **Protein-cutoff SQL block** copied into 4 searchers (no shared builder).
- **Lookup-code resolve**: `SearchDataLookupParams_GetRecordForCode` (use) vs unused identical `SearchDataLookupParams_GetProjectSearchIdsForCode`.
- **Lookup-code webservice URL** hard-coded in 5 front-end files (prefer `updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts`).
- **Mean / SD**: hand-rolled in the mod viz compute vs jStat wrapper (prefer the wrapper).
- **NSAF / ABACUS per-condition wrappers** mirror the single-search wrappers (math shared).
- **Searches per first condition group**: query helper vs `proteinExperiment_Create_conditions_...` (adds selection filtering).
- **Reporter-ion PSM-id searchers** overlap (`PsmReporterIonMassesFor_PsmIds_Searcher` vs `ReporterIonMasses_PsmLevel_ForPsmIds_Searcher`).
- **Open-mod unique-positions DTOs**: `Search_ReportedPeptide_OpenMod_PsmUniquePositions_DTO` (use) vs unused `SrchRepPeptOpenModPsmUniquePositionsDTO`.
- **Sub-group page helpers** (`compute_searchSubGroup_*`) duplicated per page; sub-group manage-names overlay calls the search-name webservice directly.

## Open questions / unverified
- Whether `PSMMassCalculator` (in webapp `web_utils`) should be deleted, revived, or left as-is: grep shows no users; the only live server-side mass path is the APEX PSM download calling `PeptideMassCalculator` directly — a decision for the maintainer.
- Whether the APEX controller should include open-mod masses. Confirmed: `_compute_PeptideMass_WithMods_FOR_ScanPeak_MZ_Ranges` builds the mod map from dynamic (variable) + static mods only, no open-mod mass; whether that is intended is a maintainer question.
- Equivalence of client-side experiment default cutoffs vs the server builder: not checked.
- Possible defects seen in code, not runtime-tested: unbound mod-position placeholders in `PsmIds_OR_PsmCount_...` when only mod-position cutoffs are set; swapped best/worst for BELOW annotations in the min/max backfill; QC missed-cleavage regex may undercount adjacent sites; lookup-code hash does not sort `modificationPositionFilters` (duplicate rows, not wrong data); `SearcherCutoffValuesSearchLevel` equals/hashCode vs Javadoc mismatch; reported-peptide cache weigher precedence.
- Resolved: `GetAnnotationTypeData` and `AnnotationTypeListForSearchIdSearcher` do not cache (no cache code in either).
- ABACUS calculator internals, per-condition NSAF/ABACUS math, estimated-error component internals, sub-group label algorithm: only skimmed.
- Front-end protein inference vs importer protein mapping, and front-end mod-mass rounding vs any Java rounding: not compared.
- Condition labels per search: author note "NOT TESTED CODE"; behavior when a search sits in two cells is unverified.
- Whether any DB cleanup ever deletes old `search_data_lookup_parameters` rows: not found by grep.
