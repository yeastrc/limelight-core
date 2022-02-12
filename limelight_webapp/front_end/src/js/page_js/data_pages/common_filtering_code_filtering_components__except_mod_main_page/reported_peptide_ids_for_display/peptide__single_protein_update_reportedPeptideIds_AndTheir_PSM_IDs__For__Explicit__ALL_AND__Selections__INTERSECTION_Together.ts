/**
 * peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together.ts
 *
 * All / AND / Intersection
 *
 * For Filters where user has explicitly chosen "AND".   Same filters where user can choose "OR" or "EXCLUDE"
 *
 */


import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {reporterIonMass_CommonRounding_ReturnNumber} from "page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {modificationMass_CommonRounding_ReturnNumber} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////


/////    Process "ALL"/"AND" Selections (Including Protein Position and Peptide String)

//      Apply "ALL" as an Intersection to the input entries (either all or a UNION of the "ANY" selections)

/**
 *
 *
 */
export const peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,    //  NOT (always) Used when proteinSequenceVersionId is populated
        proteinSequenceVersionId,  //  OPTIONAL - Restrict results to this proteinSequenceVersionId
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        projectSearchId,
        modificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        reporterIonMass_UserSelections_StateObject,
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        projectSearchId: number
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
    }): Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> {

    const singleProtein_Filter_SelectionType_Requested = SingleProtein_Filter_SelectionType.ALL;

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

    {  //  Static Mod ALL selections

        const result = _getFor__SelectionType_ALL__StaticModifications({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            singleProtein_Filter_SelectionType_Requested,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    { // 'unmodified' ALL  in the Variable Modification mass filter section

        const result = _getFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection({
            modificationMass_UserSelections_StateObject,
            singleProtein_Filter_SelectionType_Requested,   //  ALL
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }
    {
        const result = _getFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified({
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            modificationMass_UserSelections_StateObject
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    { // 'unmodified' ALL  in the Open Modification mass filter section

        const result = _getFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection({
            modificationMass_UserSelections_StateObject,
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            projectSearchId,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }
    {
        const result = _getFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            singleProtein_Filter_SelectionType_Requested,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    {
        const result = _getFor__SelectionType_ALL___For__ReporterIonMassesSelected({
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            reporterIonMass_UserSelections_StateObject
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array;
}

/**
 * Get for Static Modification mass Selection Type ALL.
 *
 * User has selected entry(s) in the Static Modification mass filter section
 *
 * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
 *
 * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
 */
const _getFor__SelectionType_ALL__StaticModifications = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        singleProtein_Filter_SelectionType_Requested,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        modificationMass_UserSelections_StateObject
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        proteinSequenceVersionId: number
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {

        //  For processing with NO _proteinSequenceVersionId

        return _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            singleProtein_Filter_SelectionType_Requested,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject
        });
    }

    //  For processing with YES _proteinSequenceVersionId

    return _getFor__SelectionType_ALL__StaticModifications__Have_proteinSequenceVersionId({
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        singleProtein_Filter_SelectionType_Requested,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject
    });
}

/**
 * Get for Static Modification mass Selection Type ALL.  NOT proteinSequenceVersionId value
 *
 * User has selected entry(s) in the Static Modification mass filter section
 *
 * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
 *
 * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
 */
const _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        singleProtein_Filter_SelectionType_Requested,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        modificationMass_UserSelections_StateObject
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! modificationMass_UserSelections_StateObject )
        || ( ! modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested }) ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    if (!loadedDataPerProjectSearchIdHolder.get_staticMods()) {

        //  No Static mods so return empty selection

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor = new Set<string>();

    for (const staticModEntry of loadedDataPerProjectSearchIdHolder.get_staticMods()) {

        const residueLetter = staticModEntry.residue
        const mass = staticModEntry.mass;

        const massForPositionForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

        const selectionEntry = modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
            residueLetter,
            modMass: massForPositionForComparison
        });
        if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

            const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

            //  The Peptide Search Strings will be used to search the protein sequence.
            //  Reported Peptides will be selected where their Protein Coverage records fully contain
            //     the locations of the search strings on the protein sequence.

            //  The amino acid letters I and L will be equivalent.

            const residueLetter_I_To_L = residueLetter.replace(findAll_I_Regex, 'L');
            staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.add(residueLetter_I_To_L);
        }
    }

    if (staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.size === 0) {

        //  No Static mods that meet filters so  return empty selection

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    let reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod: Set<number> = undefined;

    {  //  ONLY use cached results IF staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor matches cached results

        const getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
        if (getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data) {

            const staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType: Map<SingleProtein_Filter_SelectionType, {
                staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor : Set<string>
                reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod : Set<number>
            }> = getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType;

            if ( staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType ) {

                const staticModSearch_ALL_CachedResults = staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType.get(SingleProtein_Filter_SelectionType.ALL);
                if (staticModSearch_ALL_CachedResults) {

                    const staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached = staticModSearch_ALL_CachedResults.staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor;
                    //  compare staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached to local staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor

                    if (staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached.size === staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.size) {

                        let currentAndCachedContentsSame = true;
                        for (const staticMod_residueLetter of staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor) {
                            if (!staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached.has(staticMod_residueLetter)) {
                                currentAndCachedContentsSame = false;
                                break;
                            }
                        }
                        if (currentAndCachedContentsSame) {
                            //  Search data same as cached so re-use cached data
                            reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod = staticModSearch_ALL_CachedResults.reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod;
                        }
                    }
                }
            }
        }
    }

    if (!reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod) {

        reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod = new Set();

        // Start from All Reported Peptide Ids at Cutoff.  Have to search more peptide strings but since covers all it can be safely cached and re-used on next call

        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

            const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({reportedPeptideId});
            if (peptideId === undefined || peptideId === null) {
                throw Error("peptideId not found for reportedPeptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId)
            }
            const peptideSequenceString_I_To_L = loadedDataCommonHolder.get_peptideSequenceString_I_To_L_For_peptideId({peptideId})
            if (peptideSequenceString_I_To_L === undefined || peptideSequenceString_I_To_L === null) {
                throw Error("peptideSequenceString_I_To_L not found for peptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
            }

            //  Only add reportedPeptideId to result if All staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor entries are in peptideSequenceString_I_To_L

            let foundAll_staticMod_residueLetters = true;

            for (const staticMod_residueLetter of staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor) {

                if ( ! peptideSequenceString_I_To_L.includes(staticMod_residueLetter)) {
                    foundAll_staticMod_residueLetters = false;
                    break;
                }
            }
            if ( foundAll_staticMod_residueLetters ) {
                reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod.add(reportedPeptideId);
            }
        }

        let getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
        if (!getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data) {
            getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = {};
            loadedDataPerProjectSearchIdHolder.set_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data(getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data);
        }

        let staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType: Map<SingleProtein_Filter_SelectionType, {
            staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor : Set<string>
            reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod : Set<number>
        }> = getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType;

        if ( ! staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType ) {
            staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType = new Map();
            getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType = staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType;
        }
        const staticModSearch_ALL_CachedResults = {
            staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor,
            reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod
        }
        staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType.set(SingleProtein_Filter_SelectionType.ALL, staticModSearch_ALL_CachedResults);
    }

//////

    //  reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod may be empty

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for (const reportedPeptideId of reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod) {

        const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });
        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData
    };

    return result;
}

/**
 * Get for Static Modification mass Selection Type ALL.  HAVE proteinSequenceVersionId value
 *
 * User has selected entry(s) in the Static Modification mass filter section
 *
 * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
 *
 * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
 */
const _getFor__SelectionType_ALL__StaticModifications__Have_proteinSequenceVersionId = function (
    {
        singleProtein_Filter_SelectionType_Requested,
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        proteinSequenceVersionId: number
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! modificationMass_UserSelections_StateObject )
        || ( ! modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested }) ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
    if (!staticModificationsOnProtein_KeyProteinSequenceVersionId) {

        //  No Static mods so return empty selection

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }
    const staticModificationsOnProtein = staticModificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
    if (!staticModificationsOnProtein) {

        //  No Static mods so return empty selection

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter = new Map<string, Map<number, Set<number>>>()

    { // set up proteinPositions_Key_ModMass_Key_ResidueLetter
        //  call ...ONLY__ALL_SelectionType()
        const staticModifications_Selected: Map<string, Set<number>> = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__ALL_SelectionType()
        for (const staticModifications_Selected_Entry of staticModifications_Selected.entries()) {
            const entry_Key_ResidueLetter = staticModifications_Selected_Entry[0]
            const entry_Value_MassesSet: Set<number> = staticModifications_Selected_Entry[1]

            const accumulate_proteinPositions_Key_ModMass = new Map<number, Set<number>>()
            accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.set(entry_Key_ResidueLetter, accumulate_proteinPositions_Key_ModMass)

            for (const massSelected of entry_Value_MassesSet) {

                const massSelected_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: massSelected});

                accumulate_proteinPositions_Key_ModMass.set(massSelected_Rounded, new Set())
            }
        }
    }

    //  Search through Static Masses per position to get positions
    for (const staticModificationsOnProteinEntry of staticModificationsOnProtein.entries()) {

        const position = staticModificationsOnProteinEntry[0];
        const staticModificationsAtPosition = staticModificationsOnProteinEntry[1];

        const residueLetter = staticModificationsAtPosition.residue

        for (const massForPosition of staticModificationsAtPosition.massesSet) {

            const massForPosition_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: massForPosition});

            const selectionEntry = modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
                residueLetter,
                modMass: massForPosition_Rounded
            });
            if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                const accumulate_proteinPositions_Key_ModMass = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.get(residueLetter)
                if (!accumulate_proteinPositions_Key_ModMass) {
                    const msg = "accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.get(residueLetter) not return a value for residueLetter: " + residueLetter
                    console.warn(msg)
                    throw Error(msg)
                }
                const accumulate_proteinPositions = accumulate_proteinPositions_Key_ModMass.get(massForPosition_Rounded)
                if (!accumulate_proteinPositions_Key_ModMass) {
                    const msg = "accumulate_proteinPositions_Key_ModMass.get( massForPositionForComparison ) not return a value for massForPosition_Rounded: " +
                        massForPosition_Rounded + ",  residueLetter: " + residueLetter
                    console.warn(msg)
                    throw Error(msg)
                }
                accumulate_proteinPositions.add(position);
            }
        }
    }

    //  Process accumulated protein positions

    ////

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    //  First populate for reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId and then delete as needed
    {
        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmIds_Include: undefined
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }
    }

    for (const accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry of accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.entries()) {

        // const residueLetter = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry[0];
        const accumulate_proteinPositions_Key_ModMass = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry[1];

        for (const accumulate_proteinPositions_Key_ModMass_Entry of accumulate_proteinPositions_Key_ModMass.entries()) {
            // const modMass = accumulate_proteinPositions_Key_ModMass_Entry[0]
            const proteinPositions = accumulate_proteinPositions_Key_ModMass_Entry[1]

            //  Processing One residueLetter/modMass selection and it's proteinPositions

            //  Utilize getReportedPeptideIdsForDisplay_ProteinPositionsSelected
            const peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__For_ProteinPositions =
                Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
                    selectedProteinSequencePositions: proteinPositions,
                    proteinSequenceVersionId,
                    loadedDataPerProjectSearchIdHolder
                });

            if (! peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__For_ProteinPositions.result.is_AnyEntries() ) {

                //  No reportedPeptideId entries for selection so return empty selection

                return peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__For_ProteinPositions; // EARLY RETURN
            }

            //  remove entries in INPUT reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            //  that are not in result for current  residueLetter/modMass selection (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions)

            for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

                if (!
                    peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__For_ProteinPositions.
                    result.get_Entry_For_ReportedPeptideId(reportedPeptideId)
                ) {
                    //  Existing entry NOT in entries for this residueLetter/modMass selection so remove
                    resultData.delete_Entry_For_ReportedPeptideId(reportedPeptideId)
                }
            }
        }
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData
    };

    return result;
}

/**
 * User has selected 'unmodified' ALL  in the Variable Modification mass filter section
 *
 */
const _getFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection = function (
    {
        modificationMass_UserSelections_StateObject,
        singleProtein_Filter_SelectionType_Requested,   //  ALL
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder
    }: {
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ALL
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! modificationMass_UserSelections_StateObject )
        || ( ! modificationMass_UserSelections_StateObject.get_VariableModificationSelections() ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const unmodifiedSelection = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
    if ( ( ! unmodifiedSelection )
        || unmodifiedSelection.selectionType !== singleProtein_Filter_SelectionType_Requested) {

        //  No Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

    if ((!dynamicModificationsOnReportedPeptide_KeyReportedPeptideId) || dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.size === 0 ) {

        //  No values for this search, return Empty

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });


        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {
        const modificationsForReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
        if (! modificationsForReportedPeptide) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData
    };

    return result;
}

/**
 * User has selected Variable Modification Masses 'ALL' to filter on (Other than 'unmodified')
 *
 */
const _getFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified = function (
    {
        singleProtein_Filter_SelectionType_Requested,
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! modificationMass_UserSelections_StateObject )
        || ( ! modificationMass_UserSelections_StateObject.get_VariableModificationSelections() )
        || ( ! modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({ singleProtein_Filter_SelectionType_Requested }) ) ) {

        //  No Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const reportedPeptideIdsMap_Key_VariableModMass = new Map<number, Set<number>>()

    if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {

        //  Dynamic Modifications ARE same as Variable Modifications
        const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
        if ( dynamicModificationsOnProtein_KeyProteinSequenceVersionId ) {
            const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);

            //  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected
            if (dynamicModificationsOnProtein) {
                //  Have modifications for this protein so process them,  Modifications are at the current PSM/Peptide Filters
                for (const modificationOnProtein of dynamicModificationsOnProtein) {
                    //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                    // const position = modificationOnProtein.position;
                    const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                    let mass = modificationOnProtein.mass;

                    const mass_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                    const selectEntry = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(mass_Rounded);
                    if (selectEntry && selectEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                        let reportedPeptideIdsMapEntry = reportedPeptideIdsMap_Key_VariableModMass.get(mass_Rounded);
                        if (!reportedPeptideIdsMapEntry) {
                            reportedPeptideIdsMapEntry = new Set<number>();
                            reportedPeptideIdsMap_Key_VariableModMass.set(mass_Rounded, reportedPeptideIdsMapEntry);
                        }
                        reportedPeptideIdsMapEntry.add(reportedPeptideId);
                    }
                }
            }
        }
    } else {

        //  NO proteinSequenceVersionId

        if (loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId()) {
            for (const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId_Entry of loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId().entries()) {

                const dynamicModifications_Entries = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId_Entry[1];
                for (const dynamicModifications_Entry of dynamicModifications_Entries) {

                    const reportedPeptideId = dynamicModifications_Entry.reportedPeptideId

                    let mass = dynamicModifications_Entry.mass;

                    const mass_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                    const selectEntry = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(mass_Rounded);
                    if (selectEntry && selectEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                        let reportedPeptideIdsMapEntry = reportedPeptideIdsMap_Key_VariableModMass.get(mass_Rounded);
                        if (!reportedPeptideIdsMapEntry) {
                            reportedPeptideIdsMapEntry = new Set<number>();
                            reportedPeptideIdsMap_Key_VariableModMass.set(mass_Rounded, reportedPeptideIdsMapEntry);
                        }
                        reportedPeptideIdsMapEntry.add(reportedPeptideId);
                    }
                }
            }
        }
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    //  First populate for reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId and then delete as needed
    {
        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmIds_Include: undefined
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }
    }

    //  Remove all reportedPeptideId not found for all selectedModMass

    for (const selectedModMass of modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet()) {

        const reportedPeptideIdsMapEntry = reportedPeptideIdsMap_Key_VariableModMass.get(selectedModMass)
        if (!reportedPeptideIdsMapEntry) {
            //  No reportedPeptideIds found for required modification mass so remove all entries and exit loop
            resultData.clearAllEntries();

            break; // EARLY EXIT LOOP
        }

        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {
            if (!reportedPeptideIdsMapEntry.has(reportedPeptideId)) {
                //  Existing ReportedPeptideId not in entries for this selected mod mass so remove since this is an intersection
                resultData.delete_Entry_For_ReportedPeptideId(reportedPeptideId)
            }
        }
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData
    };

    return result;
}

/**
 * User has selected 'unmodified' ALL  in the Open Modification mass filter section
 *
 */
const _getFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection = function (
    {
        modificationMass_UserSelections_StateObject,
        singleProtein_Filter_SelectionType_Requested,
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        projectSearchId,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    }: {
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        projectSearchId: number // for error logging
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! modificationMass_UserSelections_StateObject ) || ( ! modificationMass_UserSelections_StateObject.get_OpenModificationSelections() ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }
    {
        const unmodifiedSelection = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
        if ( ( ! unmodifiedSelection )
            || unmodifiedSelection.selectionType !== singleProtein_Filter_SelectionType_Requested) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData
            };

            return result; // EARLY RETURN
        }
    }

    // may be NOT Set (undefined) if No Open Mods for this search
    const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

    if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs ) {

        //  No Open Mod values on PSMs for this search, Add Everything

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: true
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    ////

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    //  First populate for reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId and then delete as needed
    {
        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmIds_Include: undefined
            });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }
    }

    //

    for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);
        if ((!psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId)
            || psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size === 0) {

            //  No Open Modification for reportedPeptideId so nothing needs to happen to entry for reportedPeptideId

        } else {
            //  Have at least one Open Modification for reportedPeptideId so Add reportedPeptideId and exclude PSM Ids that have Open Modifications

            //  All PSM IDs for each reported peptide id for current cutoffs
            const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
            if ( ! psmIdsForReportedPeptideIdMap ) {
                const msg = "Have at least one Open Modification for reportedPeptideId and loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap(); returns NOTHING. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmIdsForReportedPeptideId = psmIdsForReportedPeptideIdMap.get(reportedPeptideId);
            if (!psmIdsForReportedPeptideId) {
                const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            //  Get Existing entry
            const resultData_Entry = resultData.get_Entry_For_ReportedPeptideId(reportedPeptideId)
            if (!resultData_Entry) {

                //  NO Existing Entry so skip
            } else {
                //  Process Existing Entry for this filter

                if ( ( ! modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() )
                    && ( psmIdsForReportedPeptideId.length === psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size)) {

                    //  Not:  User Selected 'TreatOpenModMassZeroAsUnmodified'
                    //  and:  All PSM IDs for reportedPeptideId have Open Mods
                    //      So remove reportedPeptideId entry

                    resultData.delete_Entry_For_ReportedPeptideId(reportedPeptideId);

                } else {
                    //  Remove PSM IDs that have Open Modifications

                    let psmIncludes_New: Set<number> = undefined;

                    if (resultData_Entry.psmIds_Include) {
                        psmIncludes_New = new Set(resultData_Entry.psmIds_Include)
                    } else {
                        psmIncludes_New = new Set(psmIdsForReportedPeptideId); // resultData_Entry.psmIds_Include is always undefined so this is always executed
                    }

                    if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

                        if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.openModificationMass_RoundedMap ) {
                            const msg = "( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.openModificationMass_RoundedMap ) NOT return a value. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId
                            console.warn(msg)
                            throw Error(msg)
                        }
                        for (const openModificationMass_RoundedMap_Entry of psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.openModificationMass_RoundedMap.entries()) {
                            const openModificationMass_RoundedMap_EntryValue = openModificationMass_RoundedMap_Entry[1];
                            if ( openModificationMass_RoundedMap_EntryValue.openModificationMass_Rounded !== 0 ) { //  Exclude Rounded Mass of Zero
                                // Processing all BUT Mass Zero since User selected TreatOpenModMassZeroAsUnmodified
                                for ( const psmId of openModificationMass_RoundedMap_EntryValue.psmIds_Set ) {
                                    psmIncludes_New.delete(psmId);
                                }
                            }
                        }
                    } else {
                        //  Not TreatOpenModMassZeroAsUnmodified so Simpler code

                        for (const psmId_ContainAnyOpenModificationMass of psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass) {
                            psmIncludes_New.delete(psmId_ContainAnyOpenModificationMass);
                        }
                    }

                    if ( psmIncludes_New.size === 0 ) {

                        //  No PSM IDs left so delete

                        resultData.delete_Entry_For_ReportedPeptideId(reportedPeptideId);

                    } else {

                        // Store PSM IDs on resultData_Entry

                        resultData_Entry.psmIds_Include = psmIncludes_New;
                    }
                }
            }
        }
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData
    };

    return result;
}

/**
 * User has selected Open Modification Masses 'ALL' to filter on (Other than 'unmodified')
 *
 */
const _getFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        singleProtein_Filter_SelectionType_Requested,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! modificationMass_UserSelections_StateObject ) || ( ! modificationMass_UserSelections_StateObject.get_OpenModificationSelections() ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    if ( ! modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({ singleProtein_Filter_SelectionType_Requested }) )  {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

        const selectedModificationMasses = new Set(modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet())

        if ( selectedModificationMasses.has( 0 ) ) {

            //  User has selected TreatOpenModMassZeroAsUnmodified And has selected Open Mod Mass Zero type 'ALL'

            //   Return Empty Result since Open Mod Mass Zero is Not being considered an Open Mod Mass

            //  Create Empty Result
            const resultData_Empty = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData_Empty,
            };

            return result;  // EARLY RETURN
        }
    }

    const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

    if (!psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs) {
        //  NO modifications for this search so cannot find any matches to selected Open Modification masses

        //  Create Empty Result
        const resultData_Empty = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData_Empty,
        };

        return result;  // EARLY RETURN
    }

    if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {

        const openModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId();
        const openModificationsOnProtein = openModificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);

        if ((!openModificationsOnProtein_KeyProteinSequenceVersionId) || (!psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs)) {
            //  NO modifications for this protein so cannot find any matches to selected Open Modification masses

            //  Create Empty Result
            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
            };

            return result;  // EARLY RETURN
        }

        //  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected

        { //  Confirm all selected modification masses are in the modification masses on this protein
            const selectedModificationMasses = new Set(modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet())

            for (const modificationOnProtein of openModificationsOnProtein) {
                const massRounded_At_ProteinLevel = modificationOnProtein.mass;  //  No Need to round for Multiple Search since already rounded to whole number
                selectedModificationMasses.delete(massRounded_At_ProteinLevel)
            }
            if (selectedModificationMasses.size > 0) {
                //  Not all selected modification masses are in the modification masses on this protein

                //  Create Empty Result
                const resultData_Empty = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                    noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
                });
                const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                    result: resultData_Empty,
                };

                return result;  // EARLY RETURN
            }
        }
    }

    // let reportedPeptideIds = reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId;
    //
    //  Remove since reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId is already filtered on proteinSequenceVersionId when proteinSequenceVersionId is present
    // if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {
    //     reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get(proteinSequenceVersionId);
    // }

    const psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded: Map<number, Map<number, Set<number>>> = new Map();

//  Add to psmIdsSet_Map_Key_ReportedPeptideId any reported peptide ids with modification masses that are selected

    for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

        const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId)
        if (psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object) {

            const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object.openModificationMass_RoundedMap

            for (const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry of psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass.entries()) {

                const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry[1];
                const openModificationMass_Rounded = psmOpenModificationMasses_PsmIdSet.openModificationMass_Rounded
                const psmIds_Set = psmOpenModificationMasses_PsmIdSet.psmIds_Set;

                const selectionEntry = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_Modification_Selected_Entry(openModificationMass_Rounded)
                if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                    //  Since found in selection, confirm that there are actually PSMs with that selected rounded Open Modification Mass

                    let psmIdsSet_Map_Key_ReportedPeptideId = psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded.get(openModificationMass_Rounded);
                    if (!psmIdsSet_Map_Key_ReportedPeptideId) {
                        psmIdsSet_Map_Key_ReportedPeptideId = new Map();
                        psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded.set(openModificationMass_Rounded, psmIdsSet_Map_Key_ReportedPeptideId)
                    }
                    let psmIdsSet = psmIdsSet_Map_Key_ReportedPeptideId.get(reportedPeptideId)
                    if (!psmIdsSet) {
                        psmIdsSet = new Set()
                        psmIdsSet_Map_Key_ReportedPeptideId.set(reportedPeptideId, psmIdsSet)
                    }
                    for (const psmId of psmIds_Set) {
                        psmIdsSet.add(psmId)
                    }
                }
            }
        }
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    //  Populate for all reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId.  Will delete some below

    for ( const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId ) {
        const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId, psmIds_Include: undefined
        })
        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
    }

    const selectedModificationMasses = new Set(modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet())

    for (const selectedModificationMass of selectedModificationMasses) {

        //  Intersection applied for each entry of selectedModificationMasses

        const psmIdsSet_Map_Key_ReportedPeptideId = psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded.get(selectedModificationMass)

        if (!psmIdsSet_Map_Key_ReportedPeptideId) {
            //  No Reported Peptides with PSMs with Selected Modification mass are in the modification masses on this protein

            //  Create Empty Result
            const resultData_Empty = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData_Empty,
            };

            return result;  // EARLY RETURN
        }

        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

            const resultData_Entry = resultData.get_Entry_For_ReportedPeptideId(reportedPeptideId)
            if (!resultData_Entry) {

                continue  //  EARLY CONTINUE
            }

            const psmIds_Include_For_ReportedPeptideId_SelectedModificationMass = psmIdsSet_Map_Key_ReportedPeptideId.get(reportedPeptideId)
            if (!psmIds_Include_For_ReportedPeptideId_SelectedModificationMass) {

                //  No Reported Peptides with PSMs with Selected Modification mass are in the modification masses on this reported peptide id
                resultData.delete_Entry_For_ReportedPeptideId(reportedPeptideId)

                continue  //  EARLY CONTINUE
            }

            if ( ! resultData_Entry.psmIds_Include ) {

                resultData_Entry.psmIds_Include = new Set( psmIds_Include_For_ReportedPeptideId_SelectedModificationMass );
            } else {

                resultData_Entry.psmIds_Include = _numberSets_Return_Intersection({ numberSet_1: resultData_Entry.psmIds_Include, numberSet_2: psmIds_Include_For_ReportedPeptideId_SelectedModificationMass });
            }
        }
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData,
    };

    return result;
}

/**
 * User has selected Reporter Ion Masses 'ALL' to filter on
 *
 */
const _getFor__SelectionType_ALL___For__ReporterIonMassesSelected = function (
    {
        singleProtein_Filter_SelectionType_Requested,
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        reporterIonMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ! reporterIonMass_UserSelections_StateObject ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }
    if ( ! reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested }) )  {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs: Map<number, { reportedPeptideId: number, psmReporterIonMassesPerPSM_ForPsmIdMap: Map<number, { psmId: number, reporterIonMasses: Set<number> }> }> =
        loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();

    const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

    if (!psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs) {

        //  NO Reporter Ion Masses so No Values are Selected for this search so return empty selection

        //  Create Empty Result
        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result;  // EARLY RETURN
    }

    ///

    //  Get User "ALL/AND" selections for Reporter Ion Masses
    const reporterIonsSelected_MassesOnly__SelectionType__ALL__AsSet_MainInstance = reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly__SelectionType__ALL__AsSet();

    //
    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for ( const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId ) {

        const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);

        if (!psmReporterIonMassesPerPSM_ForPsmIdMap_Object) {
            //  NO PSM Reporter Ion Masses for Reported Peptide Id so skip

            continue;  // EARLY CONTINUE
        }

        const psmReporterIonMassesPerPSM_ForPsmIdMap = psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap

        if (!psmReporterIonMassesPerPSM_ForPsmIdMap) {
            //  NO PSM Reporter Ion Masses for Reported Peptide Id so skip

            continue;  // EARLY CONTINUE
        }

        const psmIds_FoundFor_All_UserSelections = new Set<number>();

        for (const psmReporterIonMassesPerPSM_ForPsmIdMap_Entry of psmReporterIonMassesPerPSM_ForPsmIdMap.entries()) {

            const psmId = psmReporterIonMassesPerPSM_ForPsmIdMap_Entry[0];
            const reporterIonMasses_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_Entry[1];

            if ( psmId !== reporterIonMasses_Object.psmId ) {
                //  Map Key is NOT PSM ID
                const msg = "Map Key is NOT PSM ID: ( psmId !== reporterIonMasses_Object.psmId ) for const psmId = psmReporterIonMassesPerPSM_ForPsmIdMap_Entry[0]; ";
                console.warn(msg);
                throw Error(msg);
            }

            //  Make copy for processing this PSM ID
            const reporterIonsSelected_MassesOnly__SelectionType__ALL__AsSet_Copy__DeleteFoundValues = new Set( reporterIonsSelected_MassesOnly__SelectionType__ALL__AsSet_MainInstance );

            const reporterIonMasses_Set = reporterIonMasses_Object.reporterIonMasses;

            for (const reporterIonMass of reporterIonMasses_Set) {

                const reporterIonMass_Rounded = reporterIonMass_CommonRounding_ReturnNumber(reporterIonMass);  // Call external function

                reporterIonsSelected_MassesOnly__SelectionType__ALL__AsSet_Copy__DeleteFoundValues.delete(reporterIonMass_Rounded);
            }

            if ( reporterIonsSelected_MassesOnly__SelectionType__ALL__AsSet_Copy__DeleteFoundValues.size === 0 ) {

                //  All "ALL/AND" selections found so save PSM ID

                psmIds_FoundFor_All_UserSelections.add( psmId );
            }
        }

        if ( psmIds_FoundFor_All_UserSelections.size === 0 ) {
            //  NO PSM IDs contain selected "ALL/AND" Reporter Ion Masses for Reported Peptide Id so skip

            continue;  // EARLY CONTINUE
        }

        {
            const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
            if (numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null) {
                throw Error("numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null: reportedPeptideId: " + reportedPeptideId)
            }

            if ( psmIds_FoundFor_All_UserSelections.size === numPsmsForReportedPeptideId ) {

                //  ALL PSM IDs contain selected "ALL/AND" Reporter Ion Masses for Reported Peptide Id so store reported peptide id with no PSM Ids

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                    reportedPeptideId, psmIds_Include: undefined
                });
                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);

                continue;  // EARLY CONTINUE
            }
        }

        //  store reported peptide id with PSM Ids

        const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId, psmIds_Include: psmIds_FoundFor_All_UserSelections
        });
        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData,
    };

    return result;
}


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////


/**
 *
 * @param numberSet_1
 * @param numberSet_2
 * @private
 */
const _numberSets_Return_Intersection = function (
    {
        numberSet_1, numberSet_2
    } : {
        numberSet_1 : Set<number>
        numberSet_2 : Set<number>
    }
) : Set<number> {

    const result = new Set<number>();

    for ( const number_1 of numberSet_1 ) {
        if (numberSet_2.has(number_1)) {
            result.add(number_1);
        }
    }

    return result;
}


//////////////
//////////////

//   Modification Mass Rounding to provide some level of commonality between searches

/**
 *
 */
const _roundModificationMass_ReturnNumber_LocalFunction = function({mass} : {mass : number}) : number {
    return modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
}

