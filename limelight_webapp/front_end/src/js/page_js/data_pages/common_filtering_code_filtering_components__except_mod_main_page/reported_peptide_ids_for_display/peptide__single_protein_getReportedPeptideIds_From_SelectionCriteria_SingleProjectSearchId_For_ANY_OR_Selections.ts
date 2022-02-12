/**
 * peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ANY_OR_Selections.ts
 *
 * Any / OR / Union
 *
 * !!!  Also used to create a Union of all NOT which is then excluded from the selection in bulk
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
import {modificationMass_CommonRounding_ReturnNumber} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

//     Filter using "ANY"/"OR" (UI has "OR") Selections building up a UNION of the selected entries

//          !!!  Also used to create a Union of all NOT which is then excluded from the selection in bulk



/**
 *
 *   Filter using "ANY"/"OR" (UI has "OR") Selections building up a UNION of the selected entries
 *
 *   !!!  Also used to create a Union of all NOT which is then excluded from the selection in bulk
 *
 * @returns
 */
export const peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together = function (
    {
        singleProtein_Filter_SelectionType_Requested,   //  ANY/OR or NOT
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,    //  NOT (always) Used when proteinSequenceVersionId is populated
        proteinSequenceVersionId,  //  OPTIONAL - Restrict results to this proteinSequenceVersionId
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        projectSearchId,
        modificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        reporterIonMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        projectSearchId: number
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
        
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

    {  //  Static Mod ANY/NOT selections

        const result = _getFor__SelectionType_ANY_NOT__StaticModifications({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            singleProtein_Filter_SelectionType_Requested,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    //  Variable Mods

    {  //  Variable Mod ANY/NOT selection (only unmodified)

        const result =
            _computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_VariableModificationMassSection({ //  Variable Mod Unmodified type ANY/NOT selection
                modificationMass_UserSelections_StateObject,
                singleProtein_Filter_SelectionType_Requested,
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                loadedDataPerProjectSearchIdHolder
            });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }
    {  //  Variable Mod type ANY/NOT selection (excludes unmodified)

        const result =
            _computeFor__SelectionType_ANY_NOT___For__VariableModificationMassesSelected_OtherThanUnmodified({
                modificationMass_UserSelections_StateObject,
                singleProtein_Filter_SelectionType_Requested,
                proteinSequenceVersionId,
                loadedDataPerProjectSearchIdHolder
            });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    //  Open Mods
    {  //  Open Mod ANY/NOT selection (only unmodified)
        const result =
            _computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_OpenModificationMassSection({ //  Open Mod Unmodified type ANY/NOT selection
                modificationMass_UserSelections_StateObject,
                singleProtein_Filter_SelectionType_Requested,
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                loadedDataPerProjectSearchIdHolder,
                projectSearchId,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    {  //  Open Mod type ANY/NOT selection (excludes unmodified)
        const result =
            _computeFor__SelectionType_ANY_NOT___For__OpenModificationMassesSelected_OtherThanUnmodified({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                singleProtein_Filter_SelectionType_Requested,
                // proteinSequenceVersionId,
                loadedDataPerProjectSearchIdHolder,
                modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    {  //   Reporter Ion type ANY/NOT selection
        const result =
            _computeFor__SelectionType_ANY_NOT___For__ReporterIonMassesSelected({
                singleProtein_Filter_SelectionType_Requested,
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                loadedDataPerProjectSearchIdHolder,
                reporterIonMass_UserSelections_StateObject
            });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__FinalResult =
        _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
        })

    return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__FinalResult;
}

/**
 * Get for Static Modification mass Selection Type ANY/NOT.
 *
 * User has selected entry(s) in the Static Modification mass filter section
 *
 * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
 */
const _getFor__SelectionType_ANY_NOT__StaticModifications = function (
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
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {

        //  For processing with NO proteinSequenceVersionId

        return _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            singleProtein_Filter_SelectionType_Requested,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject
        });

    } else {

        return _getFor__SelectionType_ANY_NOT__StaticModifications__Have_proteinSequenceVersionId({
            singleProtein_Filter_SelectionType_Requested,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            modificationMass_UserSelections_StateObject
        });
    }

}

/**
 * Get for Static Modification mass Selection Type ANY/NOT.  NOT proteinSequenceVersionId value
 *
 * User has selected entry(s) in the Static Modification mass filter section
 *
 * Uses loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
 *
 * Uses _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
 *
 * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
 */
const _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId = function (
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

    // Build filtered reportedPeptideIds

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
        if (selectionEntry && selectionEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

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

        //  No Static mods that meet filters so return empty selection

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

                const staticModSearch_ANY_NOT_CachedResults = staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType.get(singleProtein_Filter_SelectionType_Requested);
                if (staticModSearch_ANY_NOT_CachedResults) {

                    const staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached = staticModSearch_ANY_NOT_CachedResults.staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor;

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
                            reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod = staticModSearch_ANY_NOT_CachedResults.reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod;
                        }
                    }
                }
            }
        }
    }

    if (!reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod) {

        reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod = new Set();

        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

            const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({reportedPeptideId});
            if (peptideId === undefined || peptideId === null) {
                throw Error("peptideId not found for reportedPeptideId. _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId)
            }
            const peptideSequenceString_I_To_L = loadedDataCommonHolder.get_peptideSequenceString_I_To_L_For_peptideId({peptideId})
            if (peptideSequenceString_I_To_L === undefined || peptideSequenceString_I_To_L === null) {
                throw Error("peptideSequenceString_I_To_L not found for peptideId. _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
            }

            for (const staticMod_residueLetter of staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor) {

                if (peptideSequenceString_I_To_L.includes(staticMod_residueLetter)) {
                    reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod.add(reportedPeptideId);
                    break;
                }
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
        const staticModSearch_ANY_NOT_CachedResults = {
            staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor,
            reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod
        }
        staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType.set(singleProtein_Filter_SelectionType_Requested, staticModSearch_ANY_NOT_CachedResults);
    }

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
 * Get for Static Modification mass Selection Type ANY/NOT.  Have proteinSequenceVersionId value
 *
 * User has selected entry(s) in the Static Modification mass filter section
 *
 * Uses _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
 *
 * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
 */
const _getFor__SelectionType_ANY_NOT__StaticModifications__Have_proteinSequenceVersionId = function (
    {
        singleProtein_Filter_SelectionType_Requested,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
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

    //  Create Set of protein positions and then call _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) with those positions

    const proteinsPositionsToGetReportedPeptideIdsFor = new Set<number>();

    //  For processing with YES proteinSequenceVersionId

    const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
    if (!staticModificationsOnProtein_KeyProteinSequenceVersionId) {

        //  No Static mods on this search so return empty;

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

        //  No Static mods on this protein so return empty;

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    //  Search through Static Masses per position to get positions
    for (const staticModificationsOnProteinEntry of staticModificationsOnProtein.entries()) {

        const position = staticModificationsOnProteinEntry[0];
        const staticModificationsAtPosition = staticModificationsOnProteinEntry[1];

        for (const massForPosition of staticModificationsAtPosition.massesSet) {

            const mass = massForPosition;

            const massForPositionForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

            const selectionEntry = modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
                residueLetter: staticModificationsAtPosition.residue,
                modMass: massForPositionForComparison
            });
            if (selectionEntry && selectionEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                proteinsPositionsToGetReportedPeptideIdsFor.add(position);
            }
        }
    }

    //  proteinsPositionsToGetReportedPeptideIdsFor  may be empty

    //  Utilize _getReportedPeptideIdsForDisplay_ProteinPositionsSelected
    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions =
        Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
            selectedProteinSequencePositions: proteinsPositionsToGetReportedPeptideIdsFor,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder
        });

    return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions;
}

/**
 * User has selected 'unmodified' ANY/NOT  in the Variable Modification mass filter section
 *
 *  return
 */
const _computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_VariableModificationMassSection = function (
    {
        modificationMass_UserSelections_StateObject,
        singleProtein_Filter_SelectionType_Requested,   //  ANY or NOT
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder
    }: {
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    }) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

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
        //  No values for this search, Add Everything

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: true
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
        if (!modificationsForReportedPeptide) {

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
 * User has selected Variable Modification Masses 'ANY'/'NOT' to filter on (Other than 'unmodified')
 *
 */
const _computeFor__SelectionType_ANY_NOT___For__VariableModificationMassesSelected_OtherThanUnmodified = function (
    {
        modificationMass_UserSelections_StateObject,
        singleProtein_Filter_SelectionType_Requested,   //  ANY or NOT
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder
    }: {
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder

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

    if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {

        //  Have proteinSequenceVersionId.  Will Return from inside this block.

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        //  Dynamic Modifications ARE same as Variable Modifications
        const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();

        if (!dynamicModificationsOnProtein_KeyProteinSequenceVersionId) {
            //  No values for this search, skip

            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData
            };

            return result; // EARLY RETURN
        }

        const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);

        //  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected
        if (dynamicModificationsOnProtein) {
            //  Have modifications for this protein so process them,  Modifications are at the current PSM/Peptide Filters
            for (const modificationOnProtein of dynamicModificationsOnProtein) {
                //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                // const position = modificationOnProtein.position;
                const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                if ( ! resultData.get_Entry_For_ReportedPeptideId(reportedPeptideId) ) {

                    //  reportedPeptideId not already in resultData

                    const mass = modificationOnProtein.mass;

                    const massForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                    const selectEntry = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(massForComparison)
                    if (selectEntry && selectEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                        const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            reportedPeptideId, psmIds_Include: undefined
                        });
                        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
                    }
                }
            }
        }
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN

        //  END OF:  YES  proteinSequenceVersionId
    }

    //  NO proteinSequenceVersionId

    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

    if (!dynamicModificationsOnReportedPeptide_KeyReportedPeptideId) {
        //  No values for this search, skip

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

    for (const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId_Entry of loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId().entries()) {

        const dynamicModifications_Entries = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId_Entry[1];
        for (const dynamicModifications_Entry of dynamicModifications_Entries) {

            const reportedPeptideId = dynamicModifications_Entry.reportedPeptideId

            if ( ! resultData.get_Entry_For_ReportedPeptideId(reportedPeptideId) ) {

                //  reportedPeptideId not already in resultData

                const mass = dynamicModifications_Entry.mass;

                const massForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                const selectEntry = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(massForComparison)
                if (selectEntry && selectEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                    const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                        reportedPeptideId, psmIds_Include: undefined
                    });
                    resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
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
 * User has selected 'unmodified' 'ANY'/'NOT' in the Open Modification mass filter section
 *
 *
 */
const _computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_OpenModificationMassSection = function (
    {
        modificationMass_UserSelections_StateObject,
        singleProtein_Filter_SelectionType_Requested,   //  ANY or NOT
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        projectSearchId,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    }: {
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        projectSearchId: number // for error logging
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    }) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! modificationMass_UserSelections_StateObject )
        || ( ! modificationMass_UserSelections_StateObject.get_OpenModificationSelections() ) ){

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

    const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

    const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

    if (!psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs) {

        //  No Open Mod values on PSMs for this search, Add Everything

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: true
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    //////

    const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

        const openModificationsForReportedPeptide = openModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
        if ((!openModificationsForReportedPeptide)
            || openModificationsForReportedPeptide.length === 0) {

            //  No Open Modification for reportedPeptideId so add whole reportedPeptideId to result

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmIds_Include: undefined
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);

        } else {
            //  Have at least one Open Modification for reportedPeptideId so Add reportedPeptideId and exclude PSM Ids that have Open Modifications

            if (!psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs) {
                const msg = "loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs(); returned nothing when openModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId ); returned a value";
                console.warn(msg)
                throw Error(msg)
            }

            const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId);
            const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);
            if (numPsmsForReportedPeptideId && psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId) {
                if (
                    numPsmsForReportedPeptideId === psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size
                    && ( ! modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() )
                ) {

                    //  All PSM IDs for reportedPeptideId have Open Mods And Not Treating Zero Mod mass as unmodified  so skip processing

                } else {

                    //  All PSM IDs for each reported peptide id for current cutoffs
                    const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
                    if ( ! psmIdsForReportedPeptideIdMap ) {
                        const msg = "Have at least one Open Modification for reportedPeptideId and loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap(); returns NOTHING. projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    //  Create a Set of PSM IDs for reportedPeptideId that are NOT in psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass

                    const psmIdsForReportedPeptideId = psmIdsForReportedPeptideIdMap.get(reportedPeptideId);
                    if (!psmIdsForReportedPeptideId) {
                        const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const psmIds_NOT_Containing_AnyOpenModificationMass = new Set<number>(psmIdsForReportedPeptideId);

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
                                    psmIds_NOT_Containing_AnyOpenModificationMass.delete(psmId);
                                }
                            }
                        }
                    } else {
                        //  Not TreatOpenModMassZeroAsUnmodified so Simpler code

                        //  Remove psmId that contains open mod mass
                        for (const psmId_ContainAnyOpenModificationMass of psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass) {
                            psmIds_NOT_Containing_AnyOpenModificationMass.delete(psmId_ContainAnyOpenModificationMass);
                        }
                    }

                    const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                        reportedPeptideId, psmIds_Include: psmIds_NOT_Containing_AnyOpenModificationMass
                    });

                    resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
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
 * User has selected Open Modification Masses to filter on (Other than 'unmodified')
 *
 *
 */
const _computeFor__SelectionType_ANY_NOT___For__OpenModificationMassesSelected_OtherThanUnmodified = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        singleProtein_Filter_SelectionType_Requested,
        // proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        // proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ! modificationMass_UserSelections_StateObject ) {

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

    const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

    if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs ) {

        //  NO Open Modification Masses so No Values are Selected for this search so exit

        //  Create Empty Result
        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData,
        };

        return result;  // EARLY RETURN
    }


    let reportedPeptideIds = reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId;

    const psmIdsSet_Map_Key_ReportedPeptideId: Map<number, Set<number>> = new Map();

//  Add to psmIdsSet_Map_Key_ReportedPeptideId any reported peptide ids with modification masses that are selected

    for (const reportedPeptideId of reportedPeptideIds) {

        const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId)
        if (psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object) {

            const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object.openModificationMass_RoundedMap

            for (const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry of psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass.entries()) {

                const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry[1];
                const openModificationMass_Rounded = psmOpenModificationMasses_PsmIdSet.openModificationMass_Rounded
                const psmIds_Set = psmOpenModificationMasses_PsmIdSet.psmIds_Set;

                if (
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection()
                    && openModificationMass_Rounded === 0
                ) {
                    //  Skip Open Mod Mass Rounded Zero Since User Selected TreatOpenModMassZeroAsUnmodified

                    continue;  //  EARLY CONTINUE
                }

                const selectionEntry = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_Modification_Selected_Entry(openModificationMass_Rounded)
                if (selectionEntry && selectionEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                    //  Since found in selection, confirm that there are actually PSMs with that selected rounded Open Modification Mass

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

    for (const mapEntry of psmIdsSet_Map_Key_ReportedPeptideId.entries()) {

        const reportedPeptideId = mapEntry[0];
        const psmIds_Include = mapEntry[1]

        const resultEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId,
            psmIds_Include
        });

        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(resultEntry);
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData,
    };

    return result;
}

/**
 * User has selected Reporter Ion Masses to filter on
 *
 *
 */
const _computeFor__SelectionType_ANY_NOT___For__ReporterIonMassesSelected = function (
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

    if (!psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs) {

        //  NO Reporter Ion Masses so No Values are Selected for this search so exit

        //  Create Empty Result
        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result;  // EARLY RETURN
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

        //  loadedDataPerProjectSearchIdHolder does contain psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs for this Project Search Id

        const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);

        if (!psmReporterIonMassesPerPSM_ForPsmIdMap_Object) {
            //  NO PSM Reporter Ion Masses for Reported Peptide Id

            continue // EARLY CONTINUE
        }

        const psmReporterIonMassesPerPSM_ForPsmIdMap: Map<number, { psmId: number, reporterIonMasses: Set<number> }> =
            psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;

        if (!psmReporterIonMassesPerPSM_ForPsmIdMap) {
            const msg = "psm_ReporterIonMasses_FilterOnSelectedValues: psmReporterIonMassesPerPSM_ForPsmIdMap not set";
            console.warn(msg);
            throw Error(msg);
        }

        const psmIds_For_SelectedReporterIonMasses = new Set<number>();

        for (const entry of psmReporterIonMassesPerPSM_ForPsmIdMap.entries()) {
            const reporterIonMasses_Object = entry[1]; // Map entry value
            const psmId = reporterIonMasses_Object.psmId;
            const reporterIonMasses_Set = reporterIonMasses_Object.reporterIonMasses;
            for (const reporterIonMass of reporterIonMasses_Set) {

                const reporterIonMass_Rounded = reporterIonMass_CommonRounding_ReturnNumber(reporterIonMass);  // Call external function

                const selectionEntry = reporterIonMass_UserSelections_StateObject.get_ReporterIon_Selected_Entry(reporterIonMass_Rounded)
                if (selectionEntry && selectionEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                    psmIds_For_SelectedReporterIonMasses.add(psmId);
                    break;
                }
            }
        }

        if (psmIds_For_SelectedReporterIonMasses.size === 0) {
            //  NO PSMs for Reported Peptide Id contains the Selected Reporter Ion Masses

            continue // EARLY CONTINUE
        }

        const resultEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId,
            psmIds_Include: psmIds_For_SelectedReporterIonMasses
        })

        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(resultEntry);
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData
    };

    return result;
}


////////////

///   UNION to support "ANY"/"NOT"

//    Merge Rules for merging UNION/ANY/OR:

/**
 * Merge in contents As UNION to support "ANY"/"OR" to existing entry.  Used for selection of Open Modification and Reporter Ion Masses
 *
 * reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
 *
 */
const _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array = function(
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS>

    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    { //  Check for any that are just undefined or null and throw Error

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( entry === undefined || entry === null ) {

                //  Found entry Not populated.  Problem with return statement that generated it.

                const msg = "Found ( entry === undefined || entry === null ) in reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array in _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array";
                console.warn(msg);
                throw Error(msg);
            }
        }
    }

    {  //  If ALL entries have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

        let all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE = true;

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( ! entry.result.is_noFilter_OR_FilterHasNoData() ) {

                all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE = false;
                break;
            }
        }

        if ( all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE ) {

            ///  ALL entries have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData
            };

            return result; // EARLY RETURN
        }
    }

    {  //  If ONLY ONE entry does NOT have is_noFilter_OR_FilterHasNoData() true, then return that entry

        let onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = false;
        let foundMoreThanOneOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = false;

        let entry_OnlyOne_NOT_is_noFilter_OR_FilterHasNoData_True: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = undefined;

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( ! entry.result.is_noFilter_OR_FilterHasNoData() ) {

                if ( onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True ) {

                    foundMoreThanOneOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = true;
                } else {

                    onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = true;
                    entry_OnlyOne_NOT_is_noFilter_OR_FilterHasNoData_True = entry;
                }
            }
        }

        if ( ( ! foundMoreThanOneOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True )
            && onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True ) {

            ///  ONLY ONE entry does NOT have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

            return entry_OnlyOne_NOT_is_noFilter_OR_FilterHasNoData_True; // EARLY RETURN
        }
    }

    {  //  Check for any that includes ALL Reported Peptide Ids

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( entry.result.is_includeAll_ReportedPeptideIds() ) {

                //  Found entry with is_includeAll_ReportedPeptideIds() true so just return that since it covers everything

                return entry; // EARLY RETURN
            }
        }
    }

    //  Start Computing UNION of values

    //  Break out by reported peptide id.  Store entries without PSM Ids separately.  Combine PSM Ids

    const reportedPeptideIds_Entries_Without_PsmIds : Set<number> = new Set();

    const psmIds_Set_Map_Key_ReportedPeptideId : Map<number, Set<number>> = new Map();

    for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

        if ( entry.result.is_noFilter_OR_FilterHasNoData() ) {

            continue; // EARLY CONTINUE
        }

        for ( const entryPer_ReportedPeptideId of entry.result.get_Entries_IterableIterator() ) {

            const reportedPeptideId = entryPer_ReportedPeptideId.reportedPeptideId;
            const psmIds_Include = entryPer_ReportedPeptideId.psmIds_Include;

            if ( psmIds_Include ) {
                if ( ! reportedPeptideIds_Entries_Without_PsmIds.has( reportedPeptideId ) ) {
                    let psmIds_Set = psmIds_Set_Map_Key_ReportedPeptideId.get(reportedPeptideId);
                    if ( ! psmIds_Set ) {
                        psmIds_Set = new Set();
                        psmIds_Set_Map_Key_ReportedPeptideId.set(reportedPeptideId, psmIds_Set );
                    }
                    for ( const psmId of psmIds_Include ) {
                        psmIds_Set.add(psmId);
                    }
                }
            } else {
                psmIds_Set_Map_Key_ReportedPeptideId.delete(reportedPeptideId);
                reportedPeptideIds_Entries_Without_PsmIds.add(reportedPeptideId);
            }
        }
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for ( const psmIds_Set_Map_Key_ReportedPeptideId_Entry of psmIds_Set_Map_Key_ReportedPeptideId.entries() ) {

        const reportedPeptideId = psmIds_Set_Map_Key_ReportedPeptideId_Entry[0];
        const psmIds_Set = psmIds_Set_Map_Key_ReportedPeptideId_Entry[1];

        const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId : reportedPeptideId,
            psmIds_Include : psmIds_Set
        });

        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);
    }

    for ( const reportedPeptideId of reportedPeptideIds_Entries_Without_PsmIds ) {

        const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId : reportedPeptideId,
            psmIds_Include : undefined
        });

        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData
    };

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