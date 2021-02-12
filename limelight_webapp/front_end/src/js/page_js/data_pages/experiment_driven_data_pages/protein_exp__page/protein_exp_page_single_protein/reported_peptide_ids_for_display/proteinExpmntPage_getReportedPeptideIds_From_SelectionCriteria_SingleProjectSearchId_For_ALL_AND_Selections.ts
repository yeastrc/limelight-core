/**
 * proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ALL_AND_Selections.ts
 *
 * All / AND / Intersection
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
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject_Wrapper} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject_Wrapper";
import {ProteinSequenceWidget_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {modificationMass_CommonRounding_ReturnNumber} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {UserSearchString_LocationsOn_ProteinSequence_Root} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData";
import {ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON";


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////


/////    Process "ALL" Selections (Including Protein Position and Peptide String)

//      Apply "ALL" as an Intersection to the input entries (either all or a UNION of the "ANY" selections)

/**
 *
 *
 */
export const proteinExpmntPage_update_reportedPeptideIds_AndTheir_PSM_IDs__For_ALL_Selections__INTERSECTION_Together = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        projectSearchId,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        proteinSequenceWidget_StateObject,
        proteinPositionFilter_UserSelections_StateObject_Wrapper,
        userSearchString_LocationsOn_ProteinSequence_Root
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        projectSearchId: number
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
        proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper
        userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
    }): void {


    const is_Any_StaticModification_Selected__SelectionType__ALL =
        modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected__For_SelectionType({singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.ALL});
    const is_Any_VariableModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection =
        modificationMass_UserSelections_StateObject.get_VariableModificationSelections().
        is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.ALL});
    const is_Any_OpenModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection =
        modificationMass_UserSelections_StateObject.get_OpenModificationSelections().
        is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({ singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.ALL});
    const is_Any_ReporterIons_Selected__SelectionType__ALL =
        reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected__For_SelectionType({singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.ALL});

    let is_VariableModification_Unmodified___SelectionType__ALL__Selected = false
    let is_OpenModification_Unmodified___SelectionType__ALL__Selected = false
    {
        {
            const unmodifiedSelection = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
            if (unmodifiedSelection && unmodifiedSelection.selectionType === SingleProtein_Filter_SelectionType.ALL) {
                is_VariableModification_Unmodified___SelectionType__ALL__Selected = true
            }
        }
        {
            const unmodifiedSelection = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
            if (unmodifiedSelection && unmodifiedSelection.selectionType === SingleProtein_Filter_SelectionType.ALL) {
                is_OpenModification_Unmodified___SelectionType__ALL__Selected = true
            }
        }
    }

//  Implicit ALL
    let is_peptideUniqueSelected = false;
    if (peptideUnique_UserSelection_StateObject && peptideUnique_UserSelection_StateObject.getPeptideUnique()) {
        is_peptideUniqueSelected = true;
    }

    let is_UserSearchString = false;
    if (peptideSequence_UserSelections_StateObject.isPeptideSearchString_AtLeastOneNotEmptyString()) {
        is_UserSearchString = true;
    }

    let is_proteinPositionFilter_PeptidePage = false;
    if (proteinPositionFilter_UserSelections_StateObject_Wrapper
        && proteinPositionFilter_UserSelections_StateObject_Wrapper.isAnySelections()) {
        is_proteinPositionFilter_PeptidePage = true;
    }

    let is_Any_selectedProteinSequencePosition = false;
    if (proteinSequenceWidget_StateObject) {
        is_Any_selectedProteinSequencePosition = proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition()
    }

    if ((!is_Any_StaticModification_Selected__SelectionType__ALL)
        && (!is_Any_VariableModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection)
        && (!is_Any_OpenModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection)
        && (!is_Any_ReporterIons_Selected__SelectionType__ALL)
        && (!is_VariableModification_Unmodified___SelectionType__ALL__Selected)
        && (!is_OpenModification_Unmodified___SelectionType__ALL__Selected)
        && (!is_peptideUniqueSelected)
        && (!is_UserSearchString)
        && (!is_proteinPositionFilter_PeptidePage)
        && (!is_Any_selectedProteinSequencePosition)
    ) {
        //  NO "ALL" selections so exit without any changes

        return;  //  EARLY RETURN
    }

//  Have at least one "ALL" type selection so create INTERSECTION of the 'ALL" selections which is all Intersection with results of "ANY" selection

    if (is_Any_StaticModification_Selected__SelectionType__ALL) {  //  Static Mod ALL selections

        _getFor__SelectionType_ALL__StaticModifications({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject
        });
    }

    if (is_VariableModification_Unmodified___SelectionType__ALL__Selected) { // 'unmodified' ALL  in the Variable Modification mass filter section

        _updateFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
        });
    }
    if (is_Any_VariableModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection) {
        _updateFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            modificationMass_UserSelections_StateObject
        });
    }

    if (is_OpenModification_Unmodified___SelectionType__ALL__Selected) { // 'unmodified' ALL  in the Open Modification mass filter section

        _updateFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder,
            projectSearchId
        });
    }
    if (is_Any_OpenModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection) {
        _updateFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            modificationMass_UserSelections_StateObject
        });
    }

    if (is_Any_ReporterIons_Selected__SelectionType__ALL) {
        _updateFor__SelectionType_ALL___For__ReporterIonMassesSelected({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder,
            reporterIonMass_UserSelections_StateObject
        });
    }
    if (is_peptideUniqueSelected) {
        _updateFor_peptideUniqueSelected({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
        })
    }

    if (is_UserSearchString) {
        _updateFor__UserSearchString({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            peptideSequence_UserSelections_StateObject,
            userSearchString_LocationsOn_ProteinSequence_Root
        });
    }

    if (is_proteinPositionFilter_PeptidePage) {
        _updateFor_is_proteinPositionFilter_PeptidePage({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder,
            proteinPositionFilter_UserSelections_StateObject_Wrapper
        })
    }

    if (is_Any_selectedProteinSequencePosition) {
        _updateFor__selectedProteinSequencePositions({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            proteinSequenceWidget_StateObject
        });
    }
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
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        modificationMass_UserSelections_StateObject
    }: {
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        proteinSequenceVersionId: number
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    }): void {

    if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {

        //  For processing with NO _proteinSequenceVersionId

        _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject
        });

    } else {

        _getFor__SelectionType_ALL__StaticModifications__Have_proteinSequenceVersionId({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            modificationMass_UserSelections_StateObject
        });
    }


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
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        modificationMass_UserSelections_StateObject
    }: {
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    }): void {

    if (!loadedDataPerProjectSearchIdHolder.get_staticMods()) {
        //  No Static mods so remove all entries and return
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()
        return;  //  EARLY EXIT
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

        //  No Static mods that meet filters so remove all entries and return
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

        return; // EARLY RETURN
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

        for (const reportedPeptideId of loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds()) {

            const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({reportedPeptideId});
            if (peptideId === undefined || peptideId === null) {
                throw Error("peptideId not found for reportedPeptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId)
            }
            const peptideSequenceString_I_To_L = loadedDataCommonHolder.get_peptideSequenceString_I_To_L_For_peptideId({peptideId})
            if (peptideSequenceString_I_To_L === undefined || peptideSequenceString_I_To_L === null) {
                throw Error("peptideSequenceString_I_To_L not found for peptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
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
        const staticModSearch_ALL_CachedResults = {
            staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor,
            reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod
        }
        staticModSearch_CachedResults_Map_Key_SingleProtein_Filter_SelectionType.set(SingleProtein_Filter_SelectionType.ALL, staticModSearch_ALL_CachedResults);
    }

//////

    const reportedPeptideIds_Copy = Array.from(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds());

    for (const reportedPeptideId of reportedPeptideIds_Copy) {

        if (!reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod.has(reportedPeptideId)) {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId);
        }
    }
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
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject
    }: {
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        proteinSequenceVersionId: number
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    }): void {

    const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
    if (!staticModificationsOnProtein_KeyProteinSequenceVersionId) {
        //  No Static mods so remove all entries and return
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()
        return;  //  EARLY EXIT
    }
    const staticModificationsOnProtein = staticModificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
    if (!staticModificationsOnProtein) {
        //  No Static mods so remove all entries and return
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()
        return;  //  EARLY EXIT
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

    for (const accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry of accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.entries()) {

        const residueLetter = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry[0];
        const accumulate_proteinPositions_Key_ModMass = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry[1];

        for (const accumulate_proteinPositions_Key_ModMass_Entry of accumulate_proteinPositions_Key_ModMass.entries()) {
            const modMass = accumulate_proteinPositions_Key_ModMass_Entry[0]
            const proteinPositions = accumulate_proteinPositions_Key_ModMass_Entry[1]

            //  Processing One residueLetter/modMass selection and it's proteinPositions

            //  Utilize getReportedPeptideIdsForDisplay_ProteinPositionsSelected
            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions =
                ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
                    selectedProteinSequencePositions: proteinPositions,
                    proteinSequenceVersionId,
                    loadedDataPerProjectSearchIdHolder
                });

            if (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions.get_reportedPeptideIds().size === 0) {
                //  No reportedPeptideIds for selection so clear all entries and return
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

                return;  //  EARLY EXIT
            }

            //  remove entries in INPUT reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            //  that are not in result for current  residueLetter/modMass selection (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions)
            const existing_reportedPeptideIds = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds()
            for (const existing_reportedPeptideId of existing_reportedPeptideIds) {

                if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions.get_EntryFor_reportedPeptideId(existing_reportedPeptideId)) {
                    //  Existing entry NOT in entries for this residueLetter/modMass selection so remove
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(existing_reportedPeptideId)
                }
            }
        }
    }
}

/**
 * User has selected 'unmodified' ALL  in the Variable Modification mass filter section
 *
 */
const _updateFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    }): void {

    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

    const existing_reportedPeptideIds_All = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds())

    for (const existing_reportedPeptideId of existing_reportedPeptideIds_All) {
        const modificationsForReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get(existing_reportedPeptideId);
        if (modificationsForReportedPeptide) {

            //  No Mods selected and mods found so remove existing_reportedPeptideId
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(existing_reportedPeptideId)
        }
    }
}

/**
 * User has selected Variable Modification Masses 'ALL' to filter on (Other than 'unmodified')
 *
 */
const _updateFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    }): void {

    const reportedPeptideIdsMap_Key_VariableModMass = new Map<number, Set<number>>()

    if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {

        //  Dynamic Modifications ARE same as Variable Modifications
        const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
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

//  Remove all reportedPeptideId not found for all selectedModMass

    for (const selectedModMass of modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet()) {

        const reportedPeptideIdsMapEntry = reportedPeptideIdsMap_Key_VariableModMass.get(selectedModMass)
        if (!reportedPeptideIdsMapEntry) {
            //  No reportedPeptideIds found for required modification mass so remove all entries and return
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

            return;  //  EARLY RETURN
        }

        const existing_ReportedPeptideIds = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds()
        for (const existing_ReportedPeptideId of existing_ReportedPeptideIds) {
            if (!reportedPeptideIdsMapEntry.has(existing_ReportedPeptideId)) {
                //  Existing ReportedPeptideId not in entries for this selected mod mass so remove since this is an intersection
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(existing_ReportedPeptideId)
            }
        }
    }
}

/**
 * User has selected 'unmodified' ALL  in the Open Modification mass filter section
 *
 */
const _updateFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        loadedDataPerProjectSearchIdHolder,
        projectSearchId
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        projectSearchId: number // for error logging
    }): void {

    // const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

    const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

    //  All PSM IDs for each reported peptide id for current cutoffs
    const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();

    const existing_reportedPeptideIds_All = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds())

    for (const reportedPeptideId of existing_reportedPeptideIds_All) {

        const psmIdsForReportedPeptideId = psmIdsForReportedPeptideIdMap.get(reportedPeptideId);
        if (!psmIdsForReportedPeptideId) {
            const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);
        if ((!psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId)
            || psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size === 0) {
            //  No Open Modification for reportedPeptideId so nothing needs to happen to entry for reportedPeptideId

        } else {
            //  Have at least one Open Modification for reportedPeptideId so Add reportedPeptideId and exclude PSM Ids that have Open Modifications

            //  Get Existing entry
            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)
            if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry) {

                //  NO Existing Entry so skip
            } else {
                //  Process Existing Entry for this filter

                if (psmIdsForReportedPeptideId.length === psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size) {
                    //  All PSM IDs for reportedPeptideId have Open Mods so remove reportedPeptideId entry
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)

                } else {
                    //  Remove PSM IDs that have Open Modifications

                    let psmIncludes_New: Set<number> = undefined;

                    if (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry.psmIds_Include) {
                        psmIncludes_New = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry.psmIds_Include)
                    } else {
                        psmIncludes_New = new Set(psmIdsForReportedPeptideId);
                    }

                    for (const psmId_ContainAnyOpenModificationMass of psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass) {
                        psmIncludes_New.delete(psmId_ContainAnyOpenModificationMass);
                    }

                    //  Merge existing entry for reportedPeptideId with new PSM Ids to Include
                    const {newEntry, deleteEntry} = _merge_new_psmIds_Include_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                        entry: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry,
                        psmIds_Include: psmIncludes_New
                    })
                    if (deleteEntry) {
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
                    }
                    if (newEntry) {
                        //  Have new entry so insert it
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
                    }
                }
            }
        }
    }
}

/**
 * User has selected Open Modification Masses 'ALL' to filter on (Other than 'unmodified')
 *
 */
const _updateFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        modificationMass_UserSelections_StateObject
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    }): void {

    const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

    if (!psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs) {
        //  NO modifications for this search so cannot find any matches to selected Open Modification masses

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

        return  //  EARLY RETURN
    }

    const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

    if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {

        const openModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId();
        const openModificationsOnProtein = openModificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);

        if ((!openModificationsOnProtein_KeyProteinSequenceVersionId) || (!psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs)) {
            //  NO modifications for this protein so cannot find any matches to selected Open Modification masses
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

            return  //  EARLY RETURN
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
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

                return;  //  EARLY RETURN
            }
        }
    }

    const psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded: Map<number, Map<number, Set<number>>> = new Map();

//  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected

    for (const reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds()) {

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

    const selectedModificationMasses = new Set(modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet())

    for (const selectedModificationMass of selectedModificationMasses) {

        //  Intersection applied for each entry of selectedModificationMasses

        const psmIdsSet_Map_Key_ReportedPeptideId = psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded.get(selectedModificationMass)

        if (!psmIdsSet_Map_Key_ReportedPeptideId) {
            //  No Reported Peptides with PSMs with Selected Modification mass are in the modification masses on this protein
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

            return;  //  EARLY RETURN
        }

        const reportedPeptideIds = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds())
        for (const reportedPeptideId of reportedPeptideIds) {

            const reportedPeptideIds_AndTheir_PSM_IDs_Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)
            if (!reportedPeptideIds_AndTheir_PSM_IDs_Entry) {
                throw Error("reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId ) not return value: _updateFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified: reportedPeptideId: " + reportedPeptideId)
            }

            const mapEntry_perReportedPeptideId_psmIds_Include = psmIdsSet_Map_Key_ReportedPeptideId.get(reportedPeptideId)
            if (!mapEntry_perReportedPeptideId_psmIds_Include) {
                //  No Reported Peptides with PSMs with Selected Modification mass are in the modification masses on this reported peptide id
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)

                continue  //  EARLY CONTINUE
            }
            const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
            if (numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null) {
                throw Error("numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null: reportedPeptideId: " + reportedPeptideId)
            }

            const {newEntry, deleteEntry} = _merge_new_psmIds_Include_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                entry: reportedPeptideIds_AndTheir_PSM_IDs_Entry,
                psmIds_Include: mapEntry_perReportedPeptideId_psmIds_Include
            })
            if (deleteEntry) {
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
            }
            if (newEntry) {
                //  Have new entry so insert it
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
            }
        }
    }
}

/**
 * User has selected Reporter Ion Masses 'ALL' to filter on
 *
 */
const _updateFor__SelectionType_ALL___For__ReporterIonMassesSelected = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        loadedDataPerProjectSearchIdHolder,
        reporterIonMass_UserSelections_StateObject
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
    }): void {

    const psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs: Map<number, { reportedPeptideId: number, psmReporterIonMassesPerPSM_ForPsmIdMap: Map<number, { psmId: number, reporterIonMasses: Set<number> }> }> =
        loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();

    const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

    if (!psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs) {
        //  No Reporter Ion values for this search
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

        return; // EARLY RETURN
    }

    const existing_ReportedPeptideIds = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds());


    reportedPeptideId_LOOP:  //  Javascript Label for 'continue' to skip to next entry of this loop from any inner loop
        for (const reportedPeptideId of existing_ReportedPeptideIds) {

            const reportedPeptideIds_AndTheir_PSM_IDs_Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)
            if (!reportedPeptideIds_AndTheir_PSM_IDs_Entry) {
                throw Error("reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId ) not return value: _updateFor__SelectionType_ALL___For__ReporterIonMassesSelected: reportedPeptideId: " + reportedPeptideId)
            }
            const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
            if (numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null) {
                throw Error("numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null: reportedPeptideId: " + reportedPeptideId)
            }

            const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);

            if (!psmReporterIonMassesPerPSM_ForPsmIdMap_Object) {
                //  NO PSM Reporter Ion Masses for Reported Peptide Id
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)

                //  Skip to next reportedPeptideId using label 'reportedPeptideId_LOOP'
                continue reportedPeptideId_LOOP // EARLY CONTINUE
            }

            const psmReporterIonMassesPerPSM_ForPsmIdMap: Map<number, { psmId: number, reporterIonMasses: Set<number> }> =
                psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;

            if (!psmReporterIonMassesPerPSM_ForPsmIdMap) {
                const msg = "psm_ReporterIonMasses_FilterOnSelectedValues: psmReporterIonMassesPerPSM_ForPsmIdMap not set";
                console.warn(msg);
                throw Error(msg);
            }

            const psmIdsSet_Key_SelectedReporterIonMasses = new Map<number, Set<number>>();

            for (const entry of psmReporterIonMassesPerPSM_ForPsmIdMap.entries()) {
                const reporterIonMasses_Object = entry[1]; // Map entry value
                const psmId = reporterIonMasses_Object.psmId;
                const reporterIonMasses_Set = reporterIonMasses_Object.reporterIonMasses;
                for (const reporterIonMass of reporterIonMasses_Set) {

                    const reporterIonMass_Rounded = reporterIonMass_CommonRounding_ReturnNumber(reporterIonMass);  // Call external function

                    const selectionEntry = reporterIonMass_UserSelections_StateObject.get_ReporterIon_Selected_Entry(reporterIonMass_Rounded)
                    if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                        let psmIdsSet = psmIdsSet_Key_SelectedReporterIonMasses.get(reporterIonMass_Rounded)
                        if (!psmIdsSet) {
                            psmIdsSet = new Set<number>()
                            psmIdsSet_Key_SelectedReporterIonMasses.set(reporterIonMass_Rounded, psmIdsSet)
                        }
                        psmIdsSet.add(psmId);
                    }
                }
            }

            if (psmIdsSet_Key_SelectedReporterIonMasses.size === 0) {
                //  NO PSM Reporter Ion Masses for Reported Peptide Id
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)

                //  Skip to next reportedPeptideId using label 'reportedPeptideId_LOOP'
                continue reportedPeptideId_LOOP // EARLY CONTINUE
            }

            for (const selectedMass of reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly__SelectionType__ALL__AsSet()) {
                if (!psmIdsSet_Key_SelectedReporterIonMasses.has(selectedMass)) {
                    //  Selected mass not in found masses so remove since intersect
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)

                    //  Skip to next reportedPeptideId using label 'reportedPeptideId_LOOP'
                    continue reportedPeptideId_LOOP // EARLY CONTINUE
                }
            }

            for (const psmIdsSet_Key_SelectedReporterIonMasses_Entry of psmIdsSet_Key_SelectedReporterIonMasses.entries()) {

                const psmIds_Include = psmIdsSet_Key_SelectedReporterIonMasses_Entry[1]

                const reportedPeptideIds_AndTheir_PSM_IDs_Entry_Local_To_ProcessEachMass_Loop = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)

                if (!reportedPeptideIds_AndTheir_PSM_IDs_Entry_Local_To_ProcessEachMass_Loop) {
                    const msg = "reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId ) NOT return a value in loop processing psmIdsSet_Key_SelectedReporterIonMasses: _updateFor__SelectionType_ALL___For__ReporterIonMassesSelected"
                    console.warn(msg)
                    throw Error(msg)
                }

                const {newEntry, deleteEntry} = _merge_new_psmIds_Include_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    entry: reportedPeptideIds_AndTheir_PSM_IDs_Entry_Local_To_ProcessEachMass_Loop,
                    psmIds_Include
                })
                if (deleteEntry) {
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)

                    //  Exit Loop since deleted entry for reportedPeptideId

                    break //  EARLY BREAK LOOP
                }
                if (newEntry) {
                    //  Have new entry so insert it
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
                }
            }
        }
}

/**
 * User has selected 'Filter On Unique Peptides:'
 *
 */
const _updateFor_peptideUniqueSelected = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    }): void {

    const proteinSequenceVersionIdsKeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId()

    const existing_reportedPeptideIds = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds())
    for (const existing_reportedPeptideId of existing_reportedPeptideIds) {

        const proteinSequenceVersionIds_For_ReportedPeptideId = proteinSequenceVersionIdsKeyReportedPeptideId.get(existing_reportedPeptideId);
        if (!proteinSequenceVersionIds_For_ReportedPeptideId) {
            throw Error("_updateFor_peptideUniqueSelected: proteinSequenceVersionIdsKeyReportedPeptideId.get( existing_reportedPeptideId ); returned nothing existing_reportedPeptideId: " + existing_reportedPeptideId)
        }
        if (proteinSequenceVersionIds_For_ReportedPeptideId.length > 1) {
            //  Peptide is not unique
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(existing_reportedPeptideId)
        }
    }
}

/**
 * User has entered Protein Sequence "Filter On Peptide:" to filter on
 *
 */
const _updateFor__UserSearchString = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        peptideSequence_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
    }): void {

    if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {

        //  For processing with NO _proteinSequenceVersionId

        _updateFor__UserSearchString__NOT_Have_proteinSequenceVersionId({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            peptideSequence_UserSelections_StateObject
        });

    } else {

        _updateFor__UserSearchString_Have_proteinSequenceVersionId({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            userSearchString_LocationsOn_ProteinSequence_Root
        });
    }
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
const _updateFor__UserSearchString__NOT_Have_proteinSequenceVersionId = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        peptideSequence_UserSelections_StateObject
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
    }): void {


    const searchStrings = peptideSequence_UserSelections_StateObject.getPeptideSearchStrings();

    if (searchStrings === undefined || searchStrings === null || searchStrings.length === 0) {
        // Not searching for anything so exit
        return;  // EARLY RETURN
    }

    const searchStrings_Set__ToGetReportedPeptideIdsFor: Set<string> = new Set(searchStrings);

    let reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString: Set<number> = undefined;

    {  //  ONLY use cached results IF staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor matches cached results

        const getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
        if (getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data) {

            const userSearchString_CachedResults = getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.userSearchString_CachedResults;
            if (userSearchString_CachedResults) {

                const searchStrings_Set__ToGetReportedPeptideIdsFor_Cached = userSearchString_CachedResults.searchStrings_Set__ToGetReportedPeptideIdsFor;
                //  compare staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached to local staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor

                if (searchStrings_Set__ToGetReportedPeptideIdsFor_Cached.size === searchStrings_Set__ToGetReportedPeptideIdsFor.size) {

                    let currentAndCachedContentsSame = true;
                    for (const searchString of searchStrings_Set__ToGetReportedPeptideIdsFor) {
                        if (!searchStrings_Set__ToGetReportedPeptideIdsFor_Cached.has(searchString)) {
                            currentAndCachedContentsSame = false;
                            break;
                        }
                    }
                    if (currentAndCachedContentsSame) {
                        //  Search data same as cached so re-use cached data
                        reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString = userSearchString_CachedResults.reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString;
                    }
                }
            }
        }
    }

    if (!reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString) {

        const searchStrings_I_To_L__ToGetReportedPeptideIdsFor = new Set<string>();
        {
            const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

            //  The Peptide Search Strings will be used to search the protein sequence.
            //  Reported Peptides will be selected where their Protein Coverage records fully contain
            //     the locations of the search strings on the protein sequence.

            //  The amino acid letters I and L will be equivalent.

            for (const searchString of searchStrings) {

                if (searchString && (searchString !== "")) {  //  Skip searchString === ""

                    const searchStringUpperCase = searchString.toLocaleUpperCase();
                    const searchString_UpperCase_I_to_L = searchStringUpperCase.replace(findAll_I_Regex, "L");
                    searchStrings_I_To_L__ToGetReportedPeptideIdsFor.add(searchString_UpperCase_I_to_L);
                }
            }
        }

        reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString = new Set();

        // Start from All Reported Peptide Ids at Cutoff.  Have to search more peptide strings but since covers all it can be safely cached and re-used on next call

        for (const reportedPeptideId of loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds()) {

            const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({reportedPeptideId});
            if (peptideId === undefined || peptideId === null) {
                throw Error("peptideId not found for reportedPeptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId)
            }
            const peptideSequenceString_I_To_L = loadedDataCommonHolder.get_peptideSequenceString_I_To_L_For_peptideId({peptideId})
            if (peptideSequenceString_I_To_L === undefined || peptideSequenceString_I_To_L === null) {
                throw Error("peptideSequenceString_I_To_L not found for peptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
            }

            for (const searchString_I_To_L of searchStrings_I_To_L__ToGetReportedPeptideIdsFor) {

                if (peptideSequenceString_I_To_L.includes(searchString_I_To_L)) {
                    reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString.add(reportedPeptideId);
                    break;
                }
            }
        }

        let getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
        if (!getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data) {
            getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = {};
            loadedDataPerProjectSearchIdHolder.set_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data(getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data);
        }

        getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.userSearchString_CachedResults = {
            searchStrings_Set__ToGetReportedPeptideIdsFor,
            reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString: reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString
        }
    }

//////

    const reportedPeptideIds_Copy = Array.from(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds());

    for (const reportedPeptideId of reportedPeptideIds_Copy) {

        if (!reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString.has(reportedPeptideId)) {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId);
        }
    }
}

/**
 * User has entered Protein Sequence "Filter On Peptide:" to filter on
 *
 */
const _updateFor__UserSearchString_Have_proteinSequenceVersionId = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        userSearchString_LocationsOn_ProteinSequence_Root
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
    }): void {

    const proteinPositions_CoveredBy_SearchStrings = userSearchString_LocationsOn_ProteinSequence_Root.proteinPositions_CoveredBy_SearchStrings
    const proteinPositions_CoveredBy_SearchStrings_length = proteinPositions_CoveredBy_SearchStrings.length

    const selectedProteinSequencePositions = new Set<number>()

    for (let position = 1; position < proteinPositions_CoveredBy_SearchStrings_length; position++) {
        if (proteinPositions_CoveredBy_SearchStrings[position]) {
            selectedProteinSequencePositions.add(position)
        }
    }

    const dataForPositions_ForEnteredSequence: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = (
        ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
            selectedProteinSequencePositions,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder
        })
    )

    const existing_reportedPeptideIds = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds())
    for (const existing_reportedPeptideId of existing_reportedPeptideIds) {
        if (!dataForPositions_ForEnteredSequence.get_EntryFor_reportedPeptideId(existing_reportedPeptideId)) {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(existing_reportedPeptideId)
        }
    }

}

/**
 * User has selected Protein Positions to filter on (Peptide Page) Valid for all proteins for selected reported peptide ids
 *
 */
const _updateFor_is_proteinPositionFilter_PeptidePage = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        loadedDataPerProjectSearchIdHolder,
        proteinPositionFilter_UserSelections_StateObject_Wrapper
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper
    }): void
{

    if (!proteinPositionFilter_UserSelections_StateObject_Wrapper.getSelections_Ranges()) {
        const msg = "_updateFor_is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelections_StateObject_Wrapper.getSelections_Ranges(); returned nothing";
        console.warn(msg)
        throw Error(msg)
    }
    const proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId = proteinPositionFilter_UserSelections_StateObject_Wrapper.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId;
    if (!proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId) {
        const msg = "_updateFor_is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelections_StateObject_Wrapper.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId; returned nothing";
        console.warn(msg)
        throw Error(msg)
    }
    const proteinCoverage_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyReportedPeptideId();
    if (!proteinCoverage_KeyReportedPeptideId) {
        throw Error("_updateFor_is_proteinPositionFilter_PeptidePage(...): loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyReportedPeptideId(); returned nothing")
    }

    const existing_reportedPeptideIds = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds())

    for (const reportedPeptideId of existing_reportedPeptideIds) {

        const proteinCoverage_Entries_For_ReportedPeptideId = proteinCoverage_KeyReportedPeptideId.get(reportedPeptideId);
        if (!proteinCoverage_Entries_For_ReportedPeptideId) {
            throw Error("_updateFor_is_proteinPositionFilter_PeptidePage(...): proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId ); returned nothing")
        }

        let found_proteinCoverage_Entry_For_ProteinPositionFilter = false;

        for (const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId) {

            const proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.get(proteinCoverage_Entry.proteinSequenceVersionId);
            if (!proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId) {
                //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                continue; // EARLY CONTINUE
            }

            if (proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected) {
                // Filter selection is Full Protein
                found_proteinCoverage_Entry_For_ProteinPositionFilter = true;
                break;  // BREAK LOOP
            }

            if (!proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries) {
                throw Error("_updateFor_is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries contains nothing")
            }
            if (proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries.length === 0) {
                throw Error("_updateFor_is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries empty array")
            }

            const proteinPositionFilter_UserSelections_RangeEntries = proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries;
            for (const proteinPositionFilter_UserSelections_RangeEntry of proteinPositionFilter_UserSelections_RangeEntries) {

                const selectRange_Start = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_Start;
                const selectRange_End = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_End;

                //  x1 <= y2 && y1 <= x2
                if (selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End) { // coverage entry overlaps select range
                    found_proteinCoverage_Entry_For_ProteinPositionFilter = true;
                    break
                }
            }
        }

        if (!found_proteinCoverage_Entry_For_ProteinPositionFilter) {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
        }
    }
}

/**
 * User has selected Protein Positions to filter on (Single Protein view) (Requires Single proteinSequenceVersionId)
 *
 */
const _updateFor__selectedProteinSequencePositions = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        proteinSequenceWidget_StateObject
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
    }): void {

    const selectedProteinSequencePositions = proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions()

    const dataForPositions_ForEnteredSequence: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = (
        ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
            selectedProteinSequencePositions,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder
        })
    )

    const existing_reportedPeptideIds = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds())
    for (const existing_reportedPeptideId of existing_reportedPeptideIds) {
        if (!dataForPositions_ForEnteredSequence.get_EntryFor_reportedPeptideId(existing_reportedPeptideId)) {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(existing_reportedPeptideId)
        }
    }

}

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////


////////////

///   INTERSECTION to support "ALL"

//    Merge Rules for merging INTERSECTION/ALL:

/**
 * Merge in contents of psmIds_Include As INTERSECTION to support "ALL" to existing entry.  Used for selection of Open Modification and Reporter Ion Masses
 *
 * When have existing Exclude, to add Include, remove Exclude and update the Include to remove any entries that were in the Exclude
 *
 * @return newEntry === null if no changes
 */
const _merge_new_psmIds_Include_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = function(
    {
        entry, psmIds_Include
    }: {

        entry: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        psmIds_Include: Set<number>

    }): {
    newEntry : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
    deleteEntry : boolean
} {

    if (psmIds_Include.size === 0) {
        //  No PSM IDs are now included so remove entry
        return { newEntry : null, deleteEntry : true }; // EARLY RETURN
    }

    let new_psmIds_Include : Set<number> = undefined

    if (entry.psmIds_Include) {
        //  Have Existing Include:
        new_psmIds_Include = new Set()
        for (const psmId_Include of psmIds_Include) {
            if ( entry.psmIds_Include.has( psmId_Include) ) {
                //  psmId_Include is in both existing and new psmIds_Include so is added to result new_psmIds_Include since this is INTERSECTION/ALL
                new_psmIds_Include.add(psmId_Include)
            }
        }
        if ( entry.psmIds_Include.size === new_psmIds_Include.size) {  // Have Existing and since only add can just compare size
            // NO Changes
            return { newEntry: null, deleteEntry: false }; // EARLY RETURN
        }
    } else {
        //  No Existing Includes
        new_psmIds_Include = psmIds_Include
    }

    let psmCount_after_Include_Exclude = new_psmIds_Include.size

    if (psmCount_after_Include_Exclude === 0) {
        //  No PSM IDs are now included so remove entry
        return {newEntry: null, deleteEntry: true}; // EARLY RETURN
    }

    const newEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
        reportedPeptideId : entry.reportedPeptideId,
        psmIds_Include : new_psmIds_Include,
        psmIds_UnionSelection_ExplicitSelectAll : false,
        psmCount_after_Include: psmCount_after_Include_Exclude
    })

    return { newEntry, deleteEntry : false }
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

