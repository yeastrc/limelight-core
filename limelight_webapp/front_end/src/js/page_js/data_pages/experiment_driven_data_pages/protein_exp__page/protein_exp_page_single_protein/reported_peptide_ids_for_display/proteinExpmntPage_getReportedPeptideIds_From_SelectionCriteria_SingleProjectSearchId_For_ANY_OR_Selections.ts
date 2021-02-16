/**
 * proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ANY_OR_Selections.ts
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
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {modificationMass_CommonRounding_ReturnNumber} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON";


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

//     Filter using "ANY" Selections building up a UNION of the selected entries

//          !!!  Also used to create a Union of all NOT which is then excluded from the selection in bulk

/**
 *
 *   Filter using "ANY" Selections building up a UNION of the selected entries
 *
 *   !!!  Also used to create a Union of all NOT which is then excluded from the selection in bulk
 *
 * @returns null if singleProtein_Filter_SelectionType_Requested is NOT and no NOT selections
 */
export const proteinExpmntPage_get_reportedPeptideIds_AndTheir_PSM_IDs__For_ANY_Selections__UNION_Together = function (
    {
        singleProtein_Filter_SelectionType_Requested,   //  ANY or NOT
        reportedPeptideIds_All,
        proteinSequenceVersionId,
        numPsmsForReportedPeptideIdMap,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        projectSearchId,
        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
        reportedPeptideIds_All: Array<number>
        proteinSequenceVersionId: number
        numPsmsForReportedPeptideIdMap: Map<number, number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        projectSearchId: number
        searchSubGroup_Ids_Selected: Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
        
    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {


    const is_Any_StaticModification_Selected__SelectionType__REQUESTED_TYPE =
        modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested });
    const is_Any_VariableModification__REQUESTED_TYPE__Modification_Selected_Excludes_UnmodifiedSelection =
        modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({ singleProtein_Filter_SelectionType_Requested });
    const is_Any_OpenModification__REQUESTED_TYPE__Modification_Selected_Excludes_UnmodifiedSelection =
        modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({ singleProtein_Filter_SelectionType_Requested });
    const is_Any_ReporterIons_Selected__SelectionType__REQUESTED_TYPE = reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested })

    let is_VariableModification_Unmodified___SelectionType__REQUESTED_TYPE__Selected = false
    let is_OpenModification_Unmodified___SelectionType__REQUESTED_TYPE__Selected = false
    {
        {
            const unmodifiedSelection = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
            if (unmodifiedSelection && unmodifiedSelection.selectionType === singleProtein_Filter_SelectionType_Requested) {
                is_VariableModification_Unmodified___SelectionType__REQUESTED_TYPE__Selected = true
            }
        }
        {
            const unmodifiedSelection = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
            if (unmodifiedSelection && unmodifiedSelection.selectionType === singleProtein_Filter_SelectionType_Requested) {
                is_OpenModification_Unmodified___SelectionType__REQUESTED_TYPE__Selected = true
            }
        }
    }

    if ((!is_Any_StaticModification_Selected__SelectionType__REQUESTED_TYPE)
        && (!is_Any_VariableModification__REQUESTED_TYPE__Modification_Selected_Excludes_UnmodifiedSelection)
        && (!is_Any_OpenModification__REQUESTED_TYPE__Modification_Selected_Excludes_UnmodifiedSelection)
        && (!is_Any_ReporterIons_Selected__SelectionType__REQUESTED_TYPE)
        && (!is_VariableModification_Unmodified___SelectionType__REQUESTED_TYPE__Selected)
        && (!is_OpenModification_Unmodified___SelectionType__REQUESTED_TYPE__Selected)
    ) {

        //  !!!   Will return something or throw Error  !!!!


        if ( singleProtein_Filter_SelectionType_Requested === SingleProtein_Filter_SelectionType.ANY ) {

            //  NO "ANY" selections so return all Reported Peptide Ids for this search, also based on searchSubGroup_Ids_Selected if populated

            const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();
            if (searchSubGroup_Ids_Selected && (!numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map)) {
                throw Error("searchSubGroup_Ids_Selected is populated: loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map(); not return a value")
            }

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)

            for (const reportedPeptideId of reportedPeptideIds_All) {

                let numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                if (numPsms === undefined || numPsms === null) {
                    throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                }

                let psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId: Map<number, number> = undefined;

                if (searchSubGroup_Ids_Selected) {

                    numPsms = 0;  //  Reset since will be total for searchSubGroup_Ids_Selected

                    const numPsmsFor_SearchSubGroupId = numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get(reportedPeptideId)
                    if (numPsmsFor_SearchSubGroupId === undefined) {
                        throw Error("No value in numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map for reportedPeptideId: " + reportedPeptideId)
                    }

                    psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId = new Map();

                    for (const searchSubGroup_Id of searchSubGroup_Ids_Selected) {
                        const numPsmsFor_This_SearchSubGroupId = numPsmsFor_SearchSubGroupId.get(searchSubGroup_Id);
                        if (numPsmsFor_This_SearchSubGroupId) {
                            psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId.set(searchSubGroup_Id, numPsmsFor_This_SearchSubGroupId);

                            numPsms += numPsmsFor_This_SearchSubGroupId;
                        }
                    }

                    if (psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId.size === 0) {

                        // Found NO PSMs for Selected Search Sub Group Ids so skip this entry

                        continue;  // EARLY CONTINUE
                    }
                }
                const entry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    reportedPeptideId,
                    psmCount_after_Include: numPsms,
                    psmCount_after_Include_Map_Key_SearchSubGroupId: psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId,
                    psmIds_Include: undefined,
                    psmIds_IncludeSet_Map_Key_SearchSubGroupId: undefined,
                    psmIds_UnionSelection_ExplicitSelectAll: false,
                })
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry)
            }

            return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId; // EARLY RETURN

        } else if ( singleProtein_Filter_SelectionType_Requested === SingleProtein_Filter_SelectionType.NOT ) {

            //  NO "NOT" selections so return all Reported Peptide Ids for this search, also based on searchSubGroup_Ids_Selected if populated

            return null;  // EARLY RETURN

        } else {
            const msg = "Unexpected value for singleProtein_Filter_SelectionType_Requested. not ANY or NOT. singleProtein_Filter_SelectionType_Requested: " + singleProtein_Filter_SelectionType_Requested;
            console.warn( msg );
            throw Error( msg )
        }
    }

    //  Have at least one "ANY" or "NOT" type selection so create UNION of the selections

    let reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = undefined

    if (is_Any_StaticModification_Selected__SelectionType__REQUESTED_TYPE) {  //  Static Mod ANY/NOT selections

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = _getFor__SelectionType_ANY_NOT__StaticModifications({
            singleProtein_Filter_SelectionType_Requested,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject
        });

        if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId) {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)
        }
    } else {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)
    }

    //  Variable Mods
    if (is_VariableModification_Unmodified___SelectionType__REQUESTED_TYPE__Selected) {  //  Variable Mod ANY/NOT selection (includes unmodified)
        _updateFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_VariableModificationMassSection({ //  Variable Mod Unmodified type ANY/NOT selection
            reportedPeptideIds_All,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        })
    }
    if (is_Any_VariableModification__REQUESTED_TYPE__Modification_Selected_Excludes_UnmodifiedSelection) {  //  Variable Mod type ANY/NOT selection (excludes unmodified)
        _updateFor__SelectionType_ANY_NOT___For__VariableModificationMassesSelected_OtherThanUnmodified({
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            modificationMass_UserSelections_StateObject
        })
    }

    //  Open Mods
    if (is_OpenModification_Unmodified___SelectionType__REQUESTED_TYPE__Selected) {  //  Open Mod ANY/NOT selection (includes unmodified)
        _updateFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_OpenModificationMassSection({ //  Open Mod Unmodified type ANY/NOT selection
            reportedPeptideIds_All,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder,
            projectSearchId
        })
    }
    if (is_Any_OpenModification__REQUESTED_TYPE__Modification_Selected_Excludes_UnmodifiedSelection) {  //  Open Mod type ANY/NOT selection (excludes unmodified)
        _updateFor__SelectionType_ANY_NOT___For__OpenModificationMassesSelected_OtherThanUnmodified({
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            modificationMass_UserSelections_StateObject
        })
    }

    if (is_Any_ReporterIons_Selected__SelectionType__REQUESTED_TYPE) {  //   Reporter Ion type ANY/NOT selection
        _updateFor__SelectionType_ANY_NOT___For__ReporterIonMassesSelected({
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_All,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder,
            reporterIonMass_UserSelections_StateObject
        })
    }


    return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
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
        singleProtein_Filter_SelectionType_Requested,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        modificationMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

    if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {

        //  For processing with NO proteinSequenceVersionId

        return _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId({
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
 * Uses _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
 *
 * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
 */
const _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId = function (
    {
        singleProtein_Filter_SelectionType_Requested,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        modificationMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined); // Build set of filtered reportedPeptideIds

    if (!loadedDataPerProjectSearchIdHolder.get_staticMods()) {
        throw Error(" ( ! loadedDataPerProjectSearchIdHolder.get_staticMods() )  _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId ");
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

        //  No Static mods that meet filters so return null
        return null; // EARLY RETURN
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

        for (const reportedPeptideId of loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds()) {

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

    if (reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod.size === 0) {

        return null;
    }

    for (const reportedPeptideId of reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod) {

        const entry = ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({
            reportedPeptideId,
            loadedDataPerProjectSearchIdHolder
        })
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
    }

    return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId;
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

    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

    //  Create Set of protein positions and then call _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) with those positions

    const proteinsPositionsToGetReportedPeptideIdsFor = new Set<number>();

    //  For processing with YES proteinSequenceVersionId

    const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
    if (!staticModificationsOnProtein_KeyProteinSequenceVersionId) {
        //  No Static mods so return;
        return null;  //  EARLY EXIT
    }
    const staticModificationsOnProtein = staticModificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
    if (!staticModificationsOnProtein) {
        //  No Static mods so return;
        return null;  //  EARLY EXIT
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

    if (proteinsPositionsToGetReportedPeptideIdsFor.size === 0) {
        //  No Static mods for selection so return;
        return null;  //  EARLY EXIT
    }

    //  Utilize _getReportedPeptideIdsForDisplay_ProteinPositionsSelected
    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions =
        ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
            selectedProteinSequencePositions: proteinsPositionsToGetReportedPeptideIdsFor,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder
        });

    return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions;
}

/**
 * User has selected 'unmodified' ANY/NOT  in the Variable Modification mass filter section
 *
 */
const _updateFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_VariableModificationMassSection = function (
    {
        reportedPeptideIds_All,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    }: {
        reportedPeptideIds_All: Array<number>
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    }): void {

    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

    if (!dynamicModificationsOnReportedPeptide_KeyReportedPeptideId) {
        //  No values for this search, skip
        return; // EARLY RETURN
    }

    for (const reportedPeptideId of reportedPeptideIds_All) {
        const modificationsForReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
        if (!modificationsForReportedPeptide) {

            if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)) {

                //  Not already in Result so add to Result

                const entry = ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({
                    reportedPeptideId,
                    loadedDataPerProjectSearchIdHolder
                })
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
            }
        }
    }
}

/**
 * User has selected Variable Modification Masses 'ANY'/'NOT' to filter on (Other than 'unmodified')
 *
 */
const _updateFor__SelectionType_ANY_NOT___For__VariableModificationMassesSelected_OtherThanUnmodified = function (
    {
        singleProtein_Filter_SelectionType_Requested,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

    }): void {

    if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {

        //  Dynamic Modifications ARE same as Variable Modifications
        const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();

        if (!dynamicModificationsOnProtein_KeyProteinSequenceVersionId) {
            //  No values for this search, skip
            return; // EARLY RETURN
        }

        const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);

        //  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected
        if (dynamicModificationsOnProtein) {
            //  Have modifications for this protein so process them,  Modifications are at the current PSM/Peptide Filters
            for (const modificationOnProtein of dynamicModificationsOnProtein) {
                //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                // const position = modificationOnProtein.position;
                const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)) {

                    //  Not already in Result so process it

                    const mass = modificationOnProtein.mass;

                    const massForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                    const selectEntry = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(massForComparison)
                    if (selectEntry && selectEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                        const entry = ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({
                            reportedPeptideId,
                            loadedDataPerProjectSearchIdHolder
                        })
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
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

                    if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)) {

                        //  Not already in Result so process it

                        const mass = dynamicModifications_Entry.mass;

                        const massForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                        const selectEntry = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(massForComparison)
                        if (selectEntry && selectEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                            const entry = ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({
                                reportedPeptideId,
                                loadedDataPerProjectSearchIdHolder
                            })
                            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
                        }
                    }
                }
            }
        }
    }
}

/**
 * User has selected 'unmodified' 'ANY'/'NOT' in the Open Modification mass filter section
 *
 *
 */
const _updateFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_OpenModificationMassSection = function (
    {
        reportedPeptideIds_All,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,  // Add to this object
        loadedDataPerProjectSearchIdHolder,
        projectSearchId
    }: {
        reportedPeptideIds_All: Array<number>
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        projectSearchId: number // for error logging
    }) {

    const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

    const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

    if (!psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs) {
        //  No values for this search, skip
        return; // EARLY RETURN
    }

    //  All PSM IDs for each reported peptide id for current cutoffs
    const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
    const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

    for (const reportedPeptideId of reportedPeptideIds_All) {

        const openModificationsForReportedPeptide = openModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
        if (!openModificationsForReportedPeptide) {
            //  No Open Modification for reportedPeptideId so add whole reportedPeptideId to result

            //  Delete any existing entry that may may have a PSM Includes Set
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)

            const entry = ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({
                reportedPeptideId,
                loadedDataPerProjectSearchIdHolder
            })
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);

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
                if (numPsmsForReportedPeptideId === psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size) {

                    //  All PSM IDs for reportedPeptideId have Open Mods so skip processing

                } else {

                    //  Create a Set of PSM IDs for reportedPeptideId that are NOT in psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass

                    const psmIdsForReportedPeptideId = psmIdsForReportedPeptideIdMap.get(reportedPeptideId);
                    if (!psmIdsForReportedPeptideId) {
                        const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const psmIds_NOT_Containing_AnyOpenModificationMass = new Set<number>(psmIdsForReportedPeptideId);

                    //  Remove psmId that contains open mod mass
                    for (const psmId_ContainAnyOpenModificationMass of psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass) {
                        psmIds_NOT_Containing_AnyOpenModificationMass.delete(psmId_ContainAnyOpenModificationMass);
                    }

                    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)
                    if (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry) {

                        //  Merge existing entry for reportedPeptideId with new PSM Ids to Include
                        const newEntry = _merge_new_psmIds_Include_As_UNION__For_ANY_NOT___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                            entry: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry,
                            psmIds_Include: psmIds_NOT_Containing_AnyOpenModificationMass,
                            numPsmsForReportedPeptideId
                        })
                        if (newEntry) {
                            //  Have new updated entry so delete existing and insert new entry
                            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
                            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
                        }

                    } else {
                        //  Not already in Result so add to Result

                        const psmCount_after_Include_Exclude = numPsmsForReportedPeptideId - psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size

                        const resultEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                            reportedPeptideId,
                            psmIds_Include: psmIds_NOT_Containing_AnyOpenModificationMass,
                            psmIds_UnionSelection_ExplicitSelectAll: false,
                            psmCount_after_Include: psmCount_after_Include_Exclude
                        })
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(resultEntry);
                    }
                }
            }
        }
    }
}

/**
 * User has selected Open Modification Masses to filter on (Other than 'unmodified')
 *
 *
 */
const _updateFor__SelectionType_ANY_NOT___For__OpenModificationMassesSelected_OtherThanUnmodified = function (
    {
        singleProtein_Filter_SelectionType_Requested,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, ///  Add to this
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

    }): void {

    let reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

    if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {
        reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get(proteinSequenceVersionId);
    }

    const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();
    const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

    if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs ) {

        //  NO Open Modification Masses for this search so exit

        return; // EARLY RETURN
    }


    const psmIdsSet_Map_Key_ReportedPeptideId: Map<number, Set<number>> = new Map();

//  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected

    for (const reportedPeptideId of reportedPeptideIds) {

        const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId)
        if (psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object) {

            const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object.openModificationMass_RoundedMap

            for (const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry of psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass.entries()) {

                const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry[1];
                const openModificationMass_Rounded = psmOpenModificationMasses_PsmIdSet.openModificationMass_Rounded
                const psmIds_Set = psmOpenModificationMasses_PsmIdSet.psmIds_Set;

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

    for (const mapEntry of psmIdsSet_Map_Key_ReportedPeptideId.entries()) {

        const reportedPeptideId = mapEntry[0];
        const psmIds_Include = mapEntry[1]

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)
        if (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry) {

            const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId);

            //  Merge existing entry for reportedPeptideId with new PSM Ids to Include
            const newEntry = _merge_new_psmIds_Include_As_UNION__For_ANY_NOT___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                entry: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry,
                psmIds_Include,
                numPsmsForReportedPeptideId
            })
            if (newEntry) {
                //  Have new updated entry so delete existing and insert new entry
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
            }

        } else {

            const resultEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                reportedPeptideId,
                psmIds_Include,
                psmIds_UnionSelection_ExplicitSelectAll: false,
                psmCount_after_Include: psmIds_Include.size
            })

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(resultEntry);
        }
    }
}

/**
 * User has selected Reporter Ion Masses to filter on
 *
 *
 */
const _updateFor__SelectionType_ANY_NOT___For__ReporterIonMassesSelected = function (
    {
        singleProtein_Filter_SelectionType_Requested,
        reportedPeptideIds_All,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, ///  Add to this
        loadedDataPerProjectSearchIdHolder,
        reporterIonMass_UserSelections_StateObject
    }: {
        singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
        reportedPeptideIds_All: Array<number>
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
        
    }): void {

    const psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs: Map<number, { reportedPeptideId: number, psmReporterIonMassesPerPSM_ForPsmIdMap: Map<number, { psmId: number, reporterIonMasses: Set<number> }> }> =
        loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
    const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

//  Filter reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_StartingValue

    if (!psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs) {
        //  No values for this search, skip
        return; // EARLY RETURN
    }

    for (const reportedPeptideId of reportedPeptideIds_All) {

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

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)
        if (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry) {

            const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId);

            //  Merge existing entry for reportedPeptideId with new PSM Ids to Include
            const newEntry = _merge_new_psmIds_Include_As_UNION__For_ANY_NOT___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                entry: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry,
                psmIds_Include: psmIds_For_SelectedReporterIonMasses,
                numPsmsForReportedPeptideId
            })
            if (newEntry) {
                //  Have new updated entry so delete existing and insert new entry
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
            }

        } else {

            const resultEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                reportedPeptideId,
                psmIds_Include: psmIds_For_SelectedReporterIonMasses,
                psmIds_UnionSelection_ExplicitSelectAll: false,
                psmCount_after_Include: psmIds_For_SelectedReporterIonMasses.size
            })

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(resultEntry);
        }
    }
}


////////////

///   UNION to support "ANY"/"NOT"

//    Merge Rules for merging UNION/ANY:

/**
 * Merge in contents of psmIds_Include As UNION to support "ANY" to existing entry.  Used for selection of Open Modification and Reporter Ion Masses
 *
 * @return new value or null if no chnages
 */
const _merge_new_psmIds_Include_As_UNION__For_ANY_NOT___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = function(
    {
        entry, psmIds_Include, numPsmsForReportedPeptideId
    }: {

        entry: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        psmIds_Include: Set<number>
        numPsmsForReportedPeptideId: number

    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {

    if (psmIds_Include.size === 0) {
        // NO Changes
        return null; // EARLY RETURN
    }

    if ( ! entry.psmIds_Include ) {
        //  Already added for ReportedPeptideId with NO Include or Exclude so for All PSMs for UNION/ANY so no changes needed
        // NO Changes
        return null; // EARLY RETURN
    }

    if ( entry.psmIds_UnionSelection_ExplicitSelectAll ) {
        //  Already explicitly added all PSM Ids for ReportedPeptideId for UNION/ANY so no changes needed
        // NO Changes
        return null; // EARLY RETURN
    }

    let new_psmIds_Include : Set<number> = undefined
    let psmIds_UnionSelection_ExplicitSelectAll = false

    if (entry.psmIds_Include) {
        //  Have Existing Include:
        new_psmIds_Include = new Set(entry.psmIds_Include)
    } else {
        new_psmIds_Include = new Set()
    }

    for (const psmId_Include of psmIds_Include) {
        new_psmIds_Include.add(psmId_Include)  //  Add to the Include to grow the selected by the contents of psmIds_Include since this is UNION/ANY
    }
    if ( entry.psmIds_Include && entry.psmIds_Include.size === new_psmIds_Include.size) {  // Have Existing and since only add can just compare size
        // NO Changes
        return null; // EARLY RETURN
    }

    let psmCount_after_Include = 0;
    if ( new_psmIds_Include ) {
        psmCount_after_Include = new_psmIds_Include.size
    } else {
        psmCount_after_Include = numPsmsForReportedPeptideId
    }

    const newEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
        reportedPeptideId : entry.reportedPeptideId,
        psmIds_Include : new_psmIds_Include,
        psmIds_UnionSelection_ExplicitSelectAll,
        psmCount_after_Include: psmCount_after_Include
    })

    return newEntry
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