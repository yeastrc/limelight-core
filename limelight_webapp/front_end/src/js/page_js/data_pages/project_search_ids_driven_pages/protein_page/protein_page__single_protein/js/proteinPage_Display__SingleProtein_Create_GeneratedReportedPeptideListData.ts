
/**
 * proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts
 *
 * Get Generated Reported Peptide List
 *
 * Create Generated Reported Peptide String, and combine data per project search id and reported peptide id under them
 *
 */

//   Modification Mass Rounding to provide some level of commonality between searches
import {
    modificationMass_CommonRounding_ReturnNumber,
    modificationMass_CommonRounding_ReturnString
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import {
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches,
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX,
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX
} from 'page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches';
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {Experiment_ConditionGroupsContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";
import {Experiment_ConditionGroupsDataContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class";
import {Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {
    reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX,
    reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX
} from "page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptide_CommonValue_AcrossSearches";
import {CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";

///////////////////

/**
 * Result from create_GeneratedReportedPeptideListData call
 */
export class Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result {
    peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry>;
    entries_Key_peptideSequenceDisplay : Map<string , CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry>; // AKA peptideItems_Map_Key_peptideSequenceDisplayString : Map<any , CreateReportedPeptideDisplayData_Result_Entry>
    peptideList_Length : number;
    numberOfUniquePeptides : number;
    numberOfPsmIds_NonRedundant_AcrossAllPeptides : number;
    /**
     * Created new if filtering on PSM Count, else return value passed in
     */
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
}

/**
 * Result from createReportedPeptideDisplayData call
 */
export class CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry {

    peptideSequenceDisplay : string

    protein_Pre_Residues : Set<string> = new Set()
    protein_Pre_Residue_N_Term : boolean
    protein_Post_Residues : Set<string> = new Set()
    protein_Post_Residue_C_Term : boolean

    peptideUnique : boolean;

    numPsmsTotal : number = 0;  //  Can NOT be summed across all Peptide List entries to get numberOfPsmIds_NonRedundant_AcrossAllPeptides

    psmCountsMap_KeyProjectSearchId : Map<number, number>
    psmCountsMap_Key_SubSearchGroup_Id : Map<number, number>
    psmCountsMap_Key_Condition_Id : Map<number, number>

    dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId : Map<number, Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>>
}

/**
 * Result from createReportedPeptideDisplayData call
 */
export class CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry {

    reportedPeptideId : Readonly<number>

    //  Only 1 of the next 2 is set
    no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId : Readonly<boolean>
    psmIdsSet : Set<number>

    constructor({ reportedPeptideId, no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId, psmIdsSet } : {
        reportedPeptideId : Readonly<number>
        //  Only 1 of the next 2 is set
        no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId : Readonly<boolean>
        psmIdsSet : Set<number>
    }) {
        if ( no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && psmIdsSet ) {
            const msg = "( allPsmIds_For_ReportedPeptideId_within_ProjectSearchId && psmIdsSet ): CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry. "
            console.warn( msg )
            throw Error( msg )
        }
        this.reportedPeptideId = reportedPeptideId
        this.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId = no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId
        this.psmIdsSet = psmIdsSet
    }
}

/**
 * !!!!!  IMPORTANT:   Always return Promise since caller uses 'await'   !!!!!
 *
 *
 * !!!!!    Main Function --- called from outside this file   !!!!!!!!!!!!!!!!!
 *
 *
 * Create Reported Peptide Data for Display or Download
 *
 * Reported Peptide List
 * Number of Reported Peptides
 * Number of PSMs total
 */
export const create_GeneratedReportedPeptideListData__SingleProtein = function(
    {
        forPeptidePage,

        psmMinimumCount_Filter_UserEntry,  // May be undefined or null

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
        generatedPeptideContents_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

        dataPageStateManager,

        proteinSequenceVersionId,  // Not Populated on Peptide Page
        projectSearchIds,

        conditionGroupsContainer,      // Only populated for experiment Page
        conditionGroupsDataContainer,  // Only populated for experiment Page

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        forPeptidePage: boolean

        psmMinimumCount_Filter_UserEntry: number

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        dataPageStateManager : DataPageStateManager

        proteinSequenceVersionId : number  // Not Populated on Peptide Page
        projectSearchIds : Array<number>

        conditionGroupsContainer : Experiment_ConditionGroupsContainer
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    } ) : Promise<Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result> {


    return new Promise<Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result>( (resolve_TopLevel, reject_TopLevel) => {
        try {
            if ( ( ( conditionGroupsContainer ) && ( ! conditionGroupsDataContainer ) ) || ( ( ! conditionGroupsContainer ) && ( conditionGroupsDataContainer ) ) ) {
                //  If one is populated, both MUST be populated.
                const msg = "If one of 'conditionGroupsContainer' 'conditionGroupsDataContainer' is populated, both MUST be populated";
                console.warn(msg);
                throw Error(msg);
            }

            //  First get data which may return a Promise

            let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder = undefined

            let proteinSequenceString : string = undefined

            const peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder> = new Map();

            const numPsmsForReportedPeptideIdMap_Key_ProjectSearchId : Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType> = new Map()

            const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId : Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder> = new Map()

            let staticModsForSearchMap_Map_Key_ProjectSearchId : Map<number, Map<string, number>> = undefined; // Map<ProjectSearchId, Map<residue, roundedMass>>

            //  Map<(project search id), Map<(reported peptide), Map<(position),Array<(mod mass rounded number)>>>
            let variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId : Map<number, Map<number, Map<number, Set<number>>>> = undefined;

            let openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId : Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder> = undefined;

            let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder> = undefined;

            let searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder> = undefined;

            let numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder> = undefined;

            const promises: Array<Promise<void>> = [];

            {
                // across all searches
                {
                    {
                        const get_PeptideSequencesHolder_AllForAllSearches_Result =
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer__CommonAcrossSearches().
                            get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
                            get_PeptideSequencesHolder_For_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds({ reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds });

                        if ( get_PeptideSequencesHolder_AllForAllSearches_Result.data ) {
                            peptideSequences_For_MainFilters_Holder= get_PeptideSequencesHolder_AllForAllSearches_Result.data.peptideSequences_For_MainFilters_Holder
                        } else if ( get_PeptideSequencesHolder_AllForAllSearches_Result.promise ) {
                            const promise = new Promise<void>((resolve, reject) => { try {
                                get_PeptideSequencesHolder_AllForAllSearches_Result.promise.catch(reason => { reject(reason)})
                                get_PeptideSequencesHolder_AllForAllSearches_Result.promise.then( value_get_PeptideSequencesHolder_AllForAllSearches_Result => { try {
                                    peptideSequences_For_MainFilters_Holder = value_get_PeptideSequencesHolder_AllForAllSearches_Result.peptideSequences_For_MainFilters_Holder
                                    resolve()
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            promises.push(promise)
                        } else {
                            throw Error("get_PeptideSequencesHolder_AllForAllSearches_Result no data or promise")
                        }
                    }

                    //  Conditionally loaded items

                    {   //  Protein Sequence String

                        if ( ! forPeptidePage ) {

                            {
                                const get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result =
                                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer__CommonAcrossSearches().
                                    get_commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences().get_ProteinSequencesHolder_For_ProteinSequenceVersionId(proteinSequenceVersionId);
                                if ( get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.data ) {
                                    proteinSequenceString =
                                        get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.data.
                                        proteinSequences_For_MainFilters_Holder.get_ProteinSequence_For_ProteinSequenceVersionId(proteinSequenceVersionId);
                                    if ( ! proteinSequenceString ) {
                                        const msg = "get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.data.proteinSequences_For_MainFilters_Holder.get_ProteinSequence_For_ProteinSequenceVersionId(proteinSequenceVersionId) returned nothing for proteinSequenceVersionId: " + proteinSequenceVersionId;
                                        console.warn(msg)
                                        throw Error(msg)
                                    }
                                } else if ( get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.promise ) {
                                    const promise = new Promise<void>((resolve, reject) => { try {
                                        get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.promise.catch(reason => {reject(reason)})
                                        get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.promise.then( value_get_PeptideSequencesHolder_AllForAllSearches_Result => { try {
                                            proteinSequenceString =
                                                value_get_PeptideSequencesHolder_AllForAllSearches_Result.proteinSequences_For_MainFilters_Holder.
                                                get_ProteinSequence_For_ProteinSequenceVersionId(proteinSequenceVersionId);
                                            if ( ! proteinSequenceString ) {
                                                const msg = "value_get_PeptideSequencesHolder_AllForAllSearches_Result.proteinSequences_For_MainFilters_Holder.get_ProteinSequence_For_ProteinSequenceVersionId(proteinSequenceVersionId) returned nothing for proteinSequenceVersionId: " + proteinSequenceVersionId;
                                                console.warn(msg)
                                                throw Error(msg)
                                            }
                                            resolve()
                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                    promises.push(promise)
                                } else {
                                    throw Error("get_PeptideSequencesHolder_AllForAllSearches_Result no data or promise")
                                }
                            }
                        }
                    }
                }
            }

            for ( const projectSearchId of projectSearchIds ) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    throw Error( "No commonData_LoadedFromServer_PerSearch_For_ProjectSearchId for projectSearchId: " + projectSearchId );
                }

                {
                    const peptideIds_For_MainFilters_Holder_AllForSearch_Result =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch();

                    if ( peptideIds_For_MainFilters_Holder_AllForSearch_Result.data ) {
                        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, peptideIds_For_MainFilters_Holder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder );
                    } else if ( peptideIds_For_MainFilters_Holder_AllForSearch_Result.promise ) {

                        const promise = new Promise<void>( (resolve, reject) => {
                            try {
                                peptideIds_For_MainFilters_Holder_AllForSearch_Result.promise.catch(reason => {
                                    reject(reason);
                                })
                                peptideIds_For_MainFilters_Holder_AllForSearch_Result.promise.then(value => {
                                    try {
                                        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.peptideIds_For_MainFilters_Holder );
                                        resolve();
                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                })
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });
                        promises.push(promise);
                    } else {
                        throw Error("peptideIds_For_MainFilters_Holder_AllForSearch_Result 'data' or 'promise' both not populated");
                    }
                }
                {  // numPsmsForReportedPeptideIdMap

                    const get_numPsmsForReportedPeptideIdMap_Result =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_numPsmsForReportedPeptideIdMap()

                    if ( get_numPsmsForReportedPeptideIdMap_Result.data ) {
                        numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.set( projectSearchId, get_numPsmsForReportedPeptideIdMap_Result.data.numPsmsForReportedPeptideIdMap );
                    } else if ( get_numPsmsForReportedPeptideIdMap_Result.promise ) {
                        const promise = new Promise<void>( (resolve, reject) => {
                            get_numPsmsForReportedPeptideIdMap_Result.promise.catch(reason => {
                                reject(reason);
                            })
                            get_numPsmsForReportedPeptideIdMap_Result.promise.then(value => { try {
                                numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.set( projectSearchId, value.numPsmsForReportedPeptideIdMap );
                                resolve();
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        });
                        promises.push(promise);
                    } else {
                        throw Error("get_numPsmsForReportedPeptideIdMap_Result 'data' 'promise' both NOT have value");
                    }
                }
                {  // numPsmsForReportedPeptideIdMap

                    const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

                    if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder );
                    } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                        const promise = new Promise<void>( (resolve, reject) => {
                            get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => {
                                reject(reason);
                            })
                            get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder );
                                resolve();
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        });
                        promises.push(promise);
                    } else {
                        throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result 'data' 'promise' both NOT have value");
                    }
                }

                //  Conditionally loaded items

                {  //  Load Search Static Mods if needed
                    if ( generatedPeptideContents_UserSelections_StateObject && generatedPeptideContents_UserSelections_StateObject.getStaticModifications_Selected() ) {

                        if ( ! staticModsForSearchMap_Map_Key_ProjectSearchId ) {
                            staticModsForSearchMap_Map_Key_ProjectSearchId = new Map()
                        }

                        const get_StaticModsHolder_Result =
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__StaticModifications().
                            get_StaticModsHolder();

                        if ( get_StaticModsHolder_Result.data ) {

                            const staticModsForSearchMap = (
                                _get_StaticModifications_ByResidueLetter_ForProjectSearchId({
                                    staticMods_Holder: get_StaticModsHolder_Result.data.staticMods_Holder
                                })
                            );

                            staticModsForSearchMap_Map_Key_ProjectSearchId.set(projectSearchId, staticModsForSearchMap)

                        } else if ( get_StaticModsHolder_Result.promise ) {

                            const promise = new Promise<void>( (resolve, reject) => {
                                get_StaticModsHolder_Result.promise.catch(reason => {
                                    reject(reason);
                                })
                                get_StaticModsHolder_Result.promise.then(value => {
                                    try {
                                        const staticModsForSearchMap = (
                                            _get_StaticModifications_ByResidueLetter_ForProjectSearchId({
                                                staticMods_Holder: value.staticMods_Holder
                                            })
                                        );

                                        staticModsForSearchMap_Map_Key_ProjectSearchId.set(projectSearchId, staticModsForSearchMap)
                                        resolve();

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });
                            });

                            promises.push(promise);

                        } else {
                            throw Error("variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result 'data' 'promise' both NOT have value");
                        }

                    }
                }
                {  //  Load Reported Peptide Variable Mods if needed
                    if ( generatedPeptideContents_UserSelections_StateObject && generatedPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() ) {

                        if ( ! variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId ) {
                            variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId = new Map();
                        }

                        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId(projectSearchId);
                        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId ) {
                            const msg = "reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId
                            console.warn(msg)
                            throw Error(msg)
                        }

                        const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result =
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                            get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch();

                        if ( variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result.data ) {
                            const variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId = (
                                _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId({
                                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
                                })
                            );
                            variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId.set(projectSearchId, variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId)
                        } else if ( variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result.promise ) {
                            const promise = new Promise<void>( (resolve, reject) => {
                                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result.promise.catch(reason => {
                                    reject(reason);
                                })
                                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result.promise.then(value => { try {
                                    const variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId = (
                                        _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId({
                                            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                                            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
                                        })
                                    );
                                    variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId.set(projectSearchId, variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId)
                                    resolve();
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            });

                            promises.push(promise);

                        } else {
                            throw Error("variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result 'data' 'promise' both NOT have value");
                        }
                    }
                }
                {  //  Load PSM Open Mods if needed
                    if ( generatedPeptideContents_UserSelections_StateObject && generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {

                        if ( ! openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                            openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId = new Map();
                        }

                        const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                            get_OpenModifications_On_PSMHolder_AllForSearch();

                        if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data ) {

                            openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId,
                                get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder
                            );

                        } else if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise ) {

                            const promise = new Promise<void>( (resolve, reject) => {
                                get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => {
                                    reject(reason);
                                })
                                get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then(value => {
                                    try {

                                        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                            projectSearchId, value.openModifications_On_PSM_For_MainFilters_Holder
                                        );

                                        resolve();

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });
                            });

                            promises.push(promise);

                        } else {
                            throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result 'data' 'promise' both NOT have value");
                        }
                    }
                }
                {  //  Load PSM IDs if needed.  Only needed if displaying open mods

                    const common_Flags_SingleSearch = dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId)

                    if ( common_Flags_SingleSearch.anyPsmHas_OpenModifications
                        && generatedPeptideContents_UserSelections_StateObject && generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {

                        // Search has PSM Open Mods and Open Mods are selected for display

                        if ( ! psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = new Map();
                        }

                        const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                            get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();

                        if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId,
                                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                            );

                        } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {

                            const promise = new Promise<void>( (resolve, reject) => {
                                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                                    reject(reason);
                                })
                                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => {
                                    try {

                                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                            projectSearchId, value.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                                        );

                                        resolve();

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });
                            });

                            promises.push(promise);

                        } else {
                            throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result 'data' 'promise' both NOT have value");
                        }
                    }
                }
                {  //
                    if ( searchSubGroup_Ids_Selected ) {

                        {  //  searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId

                            if ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = new Map()
                            }

                            const get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result =
                                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                                get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters().
                                get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch();

                            if ( get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

                                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                    projectSearchId, get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                                );

                            } else if ( get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {

                                const promise = new Promise<void>( (resolve, reject) => {
                                    get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                                        reject(reason);
                                    })
                                    get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => {
                                        try {

                                            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                                projectSearchId, value.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                                            );

                                            resolve();

                                        } catch( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                            throw e;
                                        }
                                    });
                                });

                                promises.push(promise);

                            } else {
                                throw Error("get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result 'data' 'promise' both NOT have value");
                            }
                        }

                        {  //  searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId

                            if ( ! numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                                numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = new Map()
                            }

                            const get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result =
                                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                                get_commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters().
                                get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch();

                            if ( get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

                                numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                    projectSearchId, get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.data.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
                                );

                            } else if ( get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {

                                const promise = new Promise<void>( (resolve, reject) => {
                                    get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                                        reject(reason);
                                    })
                                    get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => {
                                        try {

                                            numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                                projectSearchId, value.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
                                            );

                                            resolve();

                                        } catch( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                            throw e;
                                        }
                                    });
                                });

                                promises.push(promise);

                            } else {
                                throw Error("get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result 'data' 'promise' both NOT have value");
                            }
                        }
                    }
                }
            }

            if ( promises.length === 0 ) {
                const result = _internal_TopLevel_Function_AfterDataLoad({
                    forPeptidePage,

                    psmMinimumCount_Filter_UserEntry,  // May be undefined or null

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                    generatedPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

                    proteinSequenceVersionId,  // Not Populated on Peptide Page
                    proteinSequenceString,  // Not Populated on Peptide Page

                    projectSearchIds,

                    conditionGroupsContainer,      // Only populated for experiment Page
                    conditionGroupsDataContainer,  // Only populated for experiment Page

                    peptideSequences_For_MainFilters_Holder,
                    numPsmsForReportedPeptideIdMap_Key_ProjectSearchId,
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,

                    variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId,
                    staticModsForSearchMap_Map_Key_ProjectSearchId,

                    openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                });

                resolve_TopLevel(result);

                return;  // EARLY RETURN
            }

            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {
                reject_TopLevel(reason);
            })
            promisesAll.then(noValue => {
                try {
                    const result = _internal_TopLevel_Function_AfterDataLoad({
                        forPeptidePage,

                        psmMinimumCount_Filter_UserEntry,  // May be undefined or null

                        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                        generatedPeptideContents_UserSelections_StateObject,
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

                        proteinSequenceVersionId,  // Not Populated on Peptide Page
                        proteinSequenceString,  // Not Populated on Peptide Page

                        projectSearchIds,

                        conditionGroupsContainer,      // Only populated for experiment Page
                        conditionGroupsDataContainer,  // Only populated for experiment Page

                        peptideSequences_For_MainFilters_Holder,
                        numPsmsForReportedPeptideIdMap_Key_ProjectSearchId,
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,

                        variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId,
                        staticModsForSearchMap_Map_Key_ProjectSearchId,

                        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                    });

                    resolve_TopLevel(result);

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })
}


/**
 *
 */
const _internal_TopLevel_Function_AfterDataLoad = function (
    {
        forPeptidePage,

        psmMinimumCount_Filter_UserEntry,  // May be undefined or null

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
        generatedPeptideContents_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

        proteinSequenceVersionId,  // Not Populated on Peptide Page
        proteinSequenceString,

        projectSearchIds,

        conditionGroupsContainer,      // Only populated for experiment Page
        conditionGroupsDataContainer,  // Only populated for experiment Page

        peptideSequences_For_MainFilters_Holder,
        numPsmsForReportedPeptideIdMap_Key_ProjectSearchId,
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,

        variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId,
        staticModsForSearchMap_Map_Key_ProjectSearchId,

        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
    } : {
        forPeptidePage: boolean

        psmMinimumCount_Filter_UserEntry: number

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        proteinSequenceVersionId : number  // Not Populated on Peptide Page
        proteinSequenceString : string     // Not Populated on Peptide Page

        projectSearchIds : Array<number>

        conditionGroupsContainer : Experiment_ConditionGroupsContainer
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
        numPsmsForReportedPeptideIdMap_Key_ProjectSearchId : Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType>
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId : Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>

        //  Map<(project search id), Map<(reported peptide), Map<(position),Array<(mod mass rounded number)>>>
        variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId : Map<number, Map<number, Map<number, Set<number>>>>
        staticModsForSearchMap_Map_Key_ProjectSearchId : Map<number, Map<string, number>>

        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId : Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder>
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder>
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder>
        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder>

    })  {


    //  Initially populate from function parameter.  Replaced if filtering on PSM Count
    let reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_FunctionResult : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

    const projectSearchIds_Set = new Set( projectSearchIds );

    let projectSearchIds_By_conditionId :  Map<number,Set<number>> = undefined;

    if ( conditionGroupsContainer && conditionGroupsDataContainer ) {

        // Have Experiment data so populate projectSearchIds_By_conditionId

        projectSearchIds_By_conditionId = new Map();

        // Filter projectSearchIds_By_conditionId_Local to only projectSearchIds in projectSearchIds_Set and store in  projectSearchIds_By_conditionId

        const projectSearchIds_By_conditionId_Local :  Map<number,Set<number>> =
            Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer.
            getProjectSearchIds_For_First_ConditionGroup({ conditionGroupsContainer, conditionGroupsDataContainer });

        for ( const projectSearchIds_By_conditionId_Local_Entry of projectSearchIds_By_conditionId_Local.entries() ) {
            const conditionId = projectSearchIds_By_conditionId_Local_Entry[0];
            const projectSearchIds = projectSearchIds_By_conditionId_Local_Entry[1];

            const projectSearchIds_Result = new Set<number>();

            for ( const projectSearchId of projectSearchIds ) {
                if ( projectSearchIds_Set.has( projectSearchId ) ) {
                    projectSearchIds_Result.add( projectSearchId );
                }
            }
            if ( projectSearchIds_Result.size > 0 ) {
                projectSearchIds_By_conditionId.set( conditionId, projectSearchIds_Result );
            }
        }
    }

    const create_GeneratedReportedPeptideListData_Result = new Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result();

    const peptideItems_Map_Key_peptideSequenceDisplayString : Map<string , CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = new Map();

    let numberOfPsmIds_NonRedundant_AcrossAllPeptides = 0;  // Initially populate as processing Reported Peptides since then for sure to be a Non-Redundant count

    for ( const projectSearchId of projectSearchIds ) {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId =
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId );
        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId ) {
            throw Error( "No reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for projectSearchId: " + projectSearchId );
        }

        const numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.get(projectSearchId);
        if ( ! numPsmsForReportedPeptideIdMap ) {
            throw Error( "No numPsmsForReportedPeptideIdMap_Key_ProjectSearchId for projectSearchId: " + projectSearchId );
        }

        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
        if ( ! proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder ) {
            throw Error( "No proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId );
        }

        const peptideIds_For_MainFilters_Holder = peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
        if ( ! peptideIds_For_MainFilters_Holder ) {
            throw Error( "No peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId );
        }

        //  Map<(reported peptide), Map<(position),Set<(mod mass rounded number)>>
        let variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Set<number>>> = undefined;
        if ( variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId ) {
            variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId = variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
        }

        //   The static modifications
        let staticModificationsForProjectSearchId_Key_ResidueLetter : Map<string, number> = undefined;
        if ( staticModsForSearchMap_Map_Key_ProjectSearchId ) {
            staticModificationsForProjectSearchId_Key_ResidueLetter = staticModsForSearchMap_Map_Key_ProjectSearchId.get(projectSearchId);
        }

        let searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = undefined
        if ( searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId)
        }

        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        if ( psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId)
        }

        let openModifications_On_PSM_For_MainFilters_Holder : CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder = undefined;
        if ( openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
            openModifications_On_PSM_For_MainFilters_Holder = openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
        }

        //  reportedPeptideIds filtered if applicable so now create display peptide row objects

        for ( const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ) {

            const reportedPeptideId =  reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.reportedPeptideId
            const psmIds_Include = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include
            const psmCount_after_Include_Map_Key_SearchSubGroupId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include_Map_Key_SearchSubGroupId
            const psmIds_IncludeSet_Map_Key_SearchSubGroupId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_IncludeSet_Map_Key_SearchSubGroupId
            const numPsms__ForSingleReportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include;

            if ( numPsms__ForSingleReportedPeptideId === 0 ) {
                const msg = "proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts: const numPsms__ForSingleReportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include is zero. for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds;
                console.warn(msg);
                throw Error(msg);
            }

            //  Is this Reported Peptide Unique?
            let peptideUnique = true;
            {
                // proteinSequenceVersionIds array of proteinSequenceVersionIds for this reported peptide id
                const proteinSequenceVersionIds = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId );
                if ( ! proteinSequenceVersionIds ) {
                    throw Error( "No proteinSequenceVersionIds for reportedPeptideId: " + reportedPeptideId );
                }
                if ( proteinSequenceVersionIds.length !== 1 ) {
                    peptideUnique = false;
                }
            }

            numberOfPsmIds_NonRedundant_AcrossAllPeptides += numPsms__ForSingleReportedPeptideId;

            const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId );
            if ( ! peptideId ) {
                const msg = "proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts: No peptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds;
                console.warn(msg);
                throw Error(msg);
            }

            const peptideSequenceString : string = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId );
            if ( ! peptideSequenceString ) {
                throw Error("proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData.ts: No peptideSequenceString for peptideId: " + peptideId + ", for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
            }

            let variableModificationsRoundedArray_KeyPosition :  Map<number, Set<number>> = undefined;

            if ( variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId ) {
                variableModificationsRoundedArray_KeyPosition = variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId.get( reportedPeptideId ) ;
            }

            if ( _anyOpenMods_For_ReportedPeptide({ reportedPeptideId, openModifications_On_PSM_For_MainFilters_Holder })
                && ( ( generatedPeptideContents_UserSelections_StateObject && generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected() )
                    || ( generatedPeptideContents_UserSelections_StateObject && generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) ) ) {

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods({

                    forPeptidePage,

                    reportedPeptideId,
                    psmIds_ToProcess : psmIds_Include,

                    proteinSequenceVersionId,  // Not Populated on Peptide Page,
                    proteinSequenceString,     // Not Populated on Peptide Page,
                    // Not Populated on Peptide Page
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    psmCount_after_Include_Map_Key_SearchSubGroupId,
                    psmIds_IncludeSet_Map_Key_SearchSubGroupId,

                    peptideSequenceString,
                    peptideUnique,
                    projectSearchId,
                    numPsms: numPsms__ForSingleReportedPeptideId,
                    variableModificationsRoundedArray_KeyPosition,
                    staticModificationsForProjectSearchId: staticModificationsForProjectSearchId_Key_ResidueLetter,
                    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                    openModifications_On_PSM_For_MainFilters_Holder,

                    generatedPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

                    peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
                });

            } else {
                //  No Open Mods or Not showing Open Mods

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                    forPeptidePage,

                    reportedPeptideId,
                    psmIds_ToAdd : psmIds_Include,

                    proteinSequenceVersionId,
                    proteinSequenceString,
                    // Not Populated on Peptide Page
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    psmCount_after_Include_Map_Key_SearchSubGroupId,

                    peptideSequenceString,
                    peptideUnique,
                    projectSearchId,
                    numPsms: numPsms__ForSingleReportedPeptideId,
                    variableModificationsRoundedArray_KeyPosition,
                    staticModificationsForProjectSearchId: staticModificationsForProjectSearchId_Key_ResidueLetter,
                    open_Modification_Rounded : undefined,
                    open_Modification_Rounded_Position : undefined,
                    open_Modification_Rounded_NoPosition : undefined,

                    peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
                });
            }
        }
    }

    const peptideList_BeforeFinalFiltering : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = Array.from( peptideItems_Map_Key_peptideSequenceDisplayString.values() );

    if ( conditionGroupsContainer && conditionGroupsDataContainer ) {

        //  Have Experiment Data so compute peptideItem.psmCountsMap_Key_Condition_Id

        for ( const peptideItem of peptideList_BeforeFinalFiltering ) {

            peptideItem.psmCountsMap_Key_Condition_Id = new Map();

            for ( const projectSearchIds_By_conditionId_Entry of projectSearchIds_By_conditionId.entries() ) {
                const conditionId = projectSearchIds_By_conditionId_Entry[0];
                const projectSearchIds = projectSearchIds_By_conditionId_Entry[1];

                let psmCount_ForCondition = 0;

                for ( const projectSearchId of projectSearchIds ) {
                    const psmCount = peptideItem.psmCountsMap_KeyProjectSearchId.get(projectSearchId);
                    if ( psmCount ) {
                        psmCount_ForCondition += psmCount;
                    }
                }

                peptideItem.psmCountsMap_Key_Condition_Id.set( conditionId, psmCount_ForCondition );
            }
        }
    }

    let peptideList_Final : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = undefined;

    //  Final Filtering

    let finalFiltering_Performed = false;

    if ( ( ! psmMinimumCount_Filter_UserEntry ) || psmMinimumCount_Filter_UserEntry <= 1 ) {

        //  NO Filtering so just copy

        peptideList_Final = peptideList_BeforeFinalFiltering;

    } else {

        //  YES Filtering so conditional copy

        finalFiltering_Performed = true;

        peptideList_Final = [];

        for ( const peptideItem of peptideList_BeforeFinalFiltering ) {

            if ( psmMinimumCount_Filter_UserEntry && psmMinimumCount_Filter_UserEntry > 1 ) {

                //  Yes filtering on psmMinimumCount_Filter_UserEntry

                let maxPsmCount_FromSubTypes = 0;  //  Max PSM Count from Sub Groups or Searches or Conditions

                if ( peptideItem.psmCountsMap_Key_SubSearchGroup_Id ) {

                    for ( const searchSubGroup of searchSubGroup_Ids_Selected ) {

                        const psmCount = peptideItem.psmCountsMap_Key_SubSearchGroup_Id.get( searchSubGroup );
                        if ( psmCount ) {
                            if ( maxPsmCount_FromSubTypes < psmCount ) {
                                maxPsmCount_FromSubTypes = psmCount;
                            }
                        }
                    }
                } else if ( peptideItem.psmCountsMap_Key_Condition_Id ) {

                    for ( const psmCount of peptideItem.psmCountsMap_Key_Condition_Id.values() ) {
                        if ( maxPsmCount_FromSubTypes < psmCount ) {
                            maxPsmCount_FromSubTypes = psmCount;
                        }
                    }

                } else {

                    for ( const projectSearchId of projectSearchIds ) {
                        const psmCount = peptideItem.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
                        if ( psmCount ) {
                            if ( maxPsmCount_FromSubTypes < psmCount ) {
                                maxPsmCount_FromSubTypes = psmCount;
                            }
                        }
                    }
                }

                if ( maxPsmCount_FromSubTypes < psmMinimumCount_Filter_UserEntry ) {

                    //  Drop 'peptideItem' since does NOT meet psmMinimumCount_Filter_UserEntry

                    //  First remove entry from peptideItems_Map_Key_peptideSequenceDisplayString
                    const deleteResult = peptideItems_Map_Key_peptideSequenceDisplayString.delete( peptideItem.peptideSequenceDisplay );
                    if ( ! deleteResult ) {
                        //  peptideItem.peptideSequenceDisplay NOT found in peptideItems_Map_Key_peptideSequenceDisplayString
                        const msg = "peptideItems_Map_Key_peptideSequenceDisplayString.delete( peptideItem.peptideSequenceDisplay ); NOT Delete anything.  peptideItem.peptideSequenceDisplay: " + peptideItem.peptideSequenceDisplay;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    // Drop 'peptideItem'
                    continue; //  EARLY CONTINUE
                }
            }

            //  NOT dropped (by 'continue') so add to output Array.

            peptideList_Final.push( peptideItem )
        }
    }

    if ( finalFiltering_Performed ) {

        //  Recompute since removed Peptides from final list:

        //   PSM Count

        //   reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_FunctionResult

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_FunctionResult = new Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds( undefined );

        const reportedPeptideId_NotFilterdOnPsmId_Set__Map_Key_ProjectSearchId : Map<number, Set<number>> = new Map();

        const psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId : Map<number,Map<number, Set<number>>> = new Map();

        numberOfPsmIds_NonRedundant_AcrossAllPeptides = 0;

        for ( const peptideItem of peptideList_Final ) {

            for ( const projectSearchId of projectSearchIds ) {

                const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideItem.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId );
                if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                    //  No Data so skip to next projectSearchId
                    continue; // EARLY CONTINUE
                }

                const numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.get(projectSearchId);
                if ( ! numPsmsForReportedPeptideIdMap ) {
                    throw Error( "numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.get() returned NOTHING for projectSearchId: " + projectSearchId );
                }

                let reportedPeptideId_NotFilterdOnPsmId_Set = reportedPeptideId_NotFilterdOnPsmId_Set__Map_Key_ProjectSearchId.get( projectSearchId );
                if ( ! reportedPeptideId_NotFilterdOnPsmId_Set ) {
                    reportedPeptideId_NotFilterdOnPsmId_Set = new Set();
                    reportedPeptideId_NotFilterdOnPsmId_Set__Map_Key_ProjectSearchId.set( projectSearchId, reportedPeptideId_NotFilterdOnPsmId_Set );
                }
                let psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map = psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId.get( projectSearchId );
                if ( ! psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map ) {
                    psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map = new Map();
                    psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId.set( projectSearchId, psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map );
                }

                for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                    if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                        reportedPeptideId_NotFilterdOnPsmId_Set.add( dataPerReportedPeptideId.reportedPeptideId );

                        //  Delete since now NOT filtering on PSM Ids for this reportedPeptideId
                        psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map.delete( dataPerReportedPeptideId.reportedPeptideId );

                        const numPsms = numPsmsForReportedPeptideIdMap.get( dataPerReportedPeptideId.reportedPeptideId );
                        if ( ! numPsms ) {
                            throw Error( "numPsmsForReportedPeptideIdMap.get( dataPerReportedPeptideId.reportedPeptideId ) returned NOTHING for dataPerReportedPeptideId.reportedPeptideId: " + dataPerReportedPeptideId.reportedPeptideId + ", projectSearchId: " + projectSearchId );
                        }

                        numberOfPsmIds_NonRedundant_AcrossAllPeptides += numPsms;

                    } else {
                        if ( ! dataPerReportedPeptideId.psmIdsSet ) {
                            throw Error( "( ! dataPerReportedPeptideId.psmIdsSet ) WHEN else of ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ). dataPerReportedPeptideId.reportedPeptideId: " + dataPerReportedPeptideId.reportedPeptideId + ", projectSearchId: " + projectSearchId );
                        }

                        if ( ! reportedPeptideId_NotFilterdOnPsmId_Set.has( dataPerReportedPeptideId.reportedPeptideId ) ) {
                            //  NO entry for reportedPeptideId NOT filtering on PSM Ids so add PSM Ids to psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map

                            let psmIds_Set = psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map.get( dataPerReportedPeptideId.reportedPeptideId );
                            if ( ! psmIds_Set ) {
                                psmIds_Set = new Set();
                                psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map.set( dataPerReportedPeptideId.reportedPeptideId, psmIds_Set );
                            }
                            for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {
                                psmIds_Set.add( psmId );
                            }
                        }

                        numberOfPsmIds_NonRedundant_AcrossAllPeptides += dataPerReportedPeptideId.psmIdsSet.size;
                    }
                }
            }
        }

        for ( const projectSearchId of projectSearchIds ) {

            const numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.get(projectSearchId);
            if ( ! numPsmsForReportedPeptideIdMap ) {
                throw Error( "numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.get() returned NOTHING for projectSearchId: " + projectSearchId );
            }

            let numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder = undefined
            if ( searchSubGroup_Ids_Selected ) {
                if ( ! searchSubGroup_Ids_Selected ) {
                    const msg = "searchSubGroup_Ids_Selected is populated and numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId is NOT populated"
                    console.warn(msg)
                    throw Error(msg)
                }
                numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder = numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder = numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId)
                if ( ! numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder ) {
                    const msg = "searchSubGroup_Ids_Selected is populated and numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId) returned nothing for projectSearchId: " + projectSearchId
                    console.warn(msg)
                    throw Error(msg)
                }
            }

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({
                projectSearchId, entriesMap_KeyReportedPeptideId: undefined
            });

            const reportedPeptideId_NotFilterdOnPsmId_Set = reportedPeptideId_NotFilterdOnPsmId_Set__Map_Key_ProjectSearchId.get( projectSearchId );
            if ( reportedPeptideId_NotFilterdOnPsmId_Set && reportedPeptideId_NotFilterdOnPsmId_Set.size > 0 ) {

                //  Not Filtered on specific PSM IDs so No passing PSM IDs to filter on

                for ( const reportedPeptideId of reportedPeptideId_NotFilterdOnPsmId_Set ) {

                    const numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                    if (numPsms === undefined || numPsms === null) {
                        throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                    }

                    let psmCount_after_Include_Map_Key_SearchSubGroupId : Map<number,number> = undefined

                    if ( searchSubGroup_Ids_Selected ) {

                        const numPsmsFor_SearchSubGroupId = numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get_numPsmsFor_SearchSubGroupId__For_ReportedPeptideId( reportedPeptideId )
                        if ( numPsmsFor_SearchSubGroupId === undefined ) {
                            throw Error("No value in numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder for reportedPeptideId: " + reportedPeptideId)
                        }

                        psmCount_after_Include_Map_Key_SearchSubGroupId = new Map()

                        for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {
                            const numPsmsFor_This_SearchSubGroupId = numPsmsFor_SearchSubGroupId.get( searchSubGroup_Id )
                            if ( numPsmsFor_This_SearchSubGroupId ) {
                                psmCount_after_Include_Map_Key_SearchSubGroupId.set( searchSubGroup_Id, numPsmsFor_This_SearchSubGroupId );
                            }
                        }
                    }

                    const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                        reportedPeptideId,
                        psmCount_after_Include: numPsms,
                        psmCount_after_Include_Map_Key_SearchSubGroupId: psmCount_after_Include_Map_Key_SearchSubGroupId,
                        psmIds_Include: undefined,
                        psmIds_IncludeSet_Map_Key_SearchSubGroupId : undefined
                    })
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
                }
            }

            const psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId = psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId.get( projectSearchId );
            if ( psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId && psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId.size > 0 ) {

                //  YES Filtered on specific PSM IDs so No passing PSM IDs to filter on

                for ( const psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId_Entry of psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId.entries() ) {
                    const reportedPeptideId = psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId_Entry[0];
                    const psmIds_Set = psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId_Entry[1];


                    let psmIds_IncludeSet_Map_Key_SearchSubGroupId : Map<number, Set<number>> = undefined;
                    let psmCount_after_Include_Map_Key_SearchSubGroupId : Map<number, number> = new Map();

                    if ( searchSubGroup_Ids_Selected ) {

                        psmIds_IncludeSet_Map_Key_SearchSubGroupId = new Map();
                        psmCount_after_Include_Map_Key_SearchSubGroupId = new Map();

                        const subGroupIdMap_Key_PsmId = numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get_numPsmsFor_SearchSubGroupId__For_ReportedPeptideId( reportedPeptideId );
                        if ( ! subGroupIdMap_Key_PsmId ) {
                            throw Error("reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include is populated: numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get_numPsmsFor_SearchSubGroupId__For_ReportedPeptideId( reportedPeptideId ); not return a value. _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected(...). reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId );
                        }

                        for ( const psmId_Include of psmIds_Set ) {

                            const subGroupId = subGroupIdMap_Key_PsmId.get( psmId_Include );
                            if ( ! subGroupId === undefined ) {
                                throw Error("reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include is populated: subGroupIdMap_Key_PsmId.get( psmId_Include ); not return a value. _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected(...). psmId_Include: " + psmId_Include + ", projectSearchId: " + projectSearchId );
                            }

                            if ( ! searchSubGroup_Ids_Selected.has( subGroupId ) ) {

                                //  subGroupId is not selected so skip record
                                continue;  // EARLY CONTINUE - Skip to next psmId_Include
                            }

                            let psmIds_IncludeSet = psmIds_IncludeSet_Map_Key_SearchSubGroupId.get( subGroupId );
                            if ( ! psmIds_IncludeSet ) {
                                psmIds_IncludeSet = new Set();
                                psmIds_IncludeSet_Map_Key_SearchSubGroupId.set( subGroupId, psmIds_IncludeSet );
                            }
                            psmIds_IncludeSet.add( psmId_Include );
                        }

                        for ( const psmIds_IncludeSet_Map_Key_SearchSubGroupId_MapEntry of psmIds_IncludeSet_Map_Key_SearchSubGroupId.entries() ) {
                            const subGroupId = psmIds_IncludeSet_Map_Key_SearchSubGroupId_MapEntry[0];
                            const psmIds_IncludeSet = psmIds_IncludeSet_Map_Key_SearchSubGroupId_MapEntry[1];
                            psmCount_after_Include_Map_Key_SearchSubGroupId.set( subGroupId, psmIds_IncludeSet.size );
                        }
                    }

                    const resultEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                        reportedPeptideId,
                        psmIds_Include: psmIds_Set,
                        psmIds_IncludeSet_Map_Key_SearchSubGroupId,
                        psmCount_after_Include: psmIds_Set.size,
                        psmCount_after_Include_Map_Key_SearchSubGroupId
                    })
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(resultEntry);
                }
            }

            // if ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds().size > 0 ) {

            //  Change to Always Insert since downstream code expects an entry per projectSearchId even if it is empty.  That is the way the primary filtering works.
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_FunctionResult.insert_Entry({ projectSearchId, entry: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId });
            // }
        }
    }

    //  Compute Totals

    let numberOfUniquePeptides = 0;

    for ( const peptideItem of peptideList_Final ) {

        // numberOfPsmIds_NonRedundant_AcrossAllPeptides += peptideItem.numPsmsTotal;  !!!  DOES NOT WORK due to Open Mods with Multiple Positions

        if ( peptideItem.peptideUnique ) {
            numberOfUniquePeptides++;
        }
    }

    // Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
    _sortPeptideListOnSortOrder( { peptideList : peptideList_Final } );

    const peptideList_Length = peptideList_Final.length;

    create_GeneratedReportedPeptideListData_Result.peptideList = peptideList_Final;
    create_GeneratedReportedPeptideListData_Result.entries_Key_peptideSequenceDisplay = peptideItems_Map_Key_peptideSequenceDisplayString;

    create_GeneratedReportedPeptideListData_Result.peptideList_Length = peptideList_Length;
    create_GeneratedReportedPeptideListData_Result.numberOfUniquePeptides = numberOfUniquePeptides;
    create_GeneratedReportedPeptideListData_Result.numberOfPsmIds_NonRedundant_AcrossAllPeptides = numberOfPsmIds_NonRedundant_AcrossAllPeptides;

    //  New instance if filtering on PSM Count.  Otherwise, is what is passed in to function
    create_GeneratedReportedPeptideListData_Result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_FunctionResult;

    return create_GeneratedReportedPeptideListData_Result;
}

/**
 *
 */
const _anyOpenMods_For_ReportedPeptide = function (
    {
        reportedPeptideId,
        openModifications_On_PSM_For_MainFilters_Holder
    } : {
        reportedPeptideId : number
        openModifications_On_PSM_For_MainFilters_Holder : CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder

    }) : boolean {

    if ( ! openModifications_On_PSM_For_MainFilters_Holder ) {
        //  No Open Mods for search
        return false;  // EARLY RETURN
    }
    if ( ! openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( reportedPeptideId ) ) {
        //  No Open Mods for reportedPeptideId
        return false;  // EARLY RETURN
    }
    return true;
}

/**
 *
 */
const _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods = function (
    {
        forPeptidePage,

        reportedPeptideId,
        psmIds_ToProcess,

        proteinSequenceVersionId, // Not Populated on Peptide Page
        proteinSequenceString,     // Not Populated on Peptide Page
        // Not Populated on Peptide Page
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        peptideSequenceString,
        peptideUnique,
        projectSearchId,
        variableModificationsRoundedArray_KeyPosition,
        staticModificationsForProjectSearchId,
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
        openModifications_On_PSM_For_MainFilters_Holder,

        generatedPeptideContents_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

        peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
    } : {
        forPeptidePage: boolean

        reportedPeptideId : number
        psmIds_ToProcess : ReadonlySet<number>  // Optional

        proteinSequenceVersionId : number  // Not Populated on Peptide Page
        proteinSequenceString : string     // Not Populated on Peptide Page
        // Not Populated on Peptide Page
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder : CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId: ReadonlyMap<number, number>
        psmIds_IncludeSet_Map_Key_SearchSubGroupId: ReadonlyMap<number,ReadonlySet<number>>

        peptideSequenceString : string
        peptideUnique : boolean
        projectSearchId : number
        numPsms : number
        variableModificationsRoundedArray_KeyPosition: Map<number, Set<number>>
        staticModificationsForProjectSearchId : Map<string, number>
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
        openModifications_On_PSM_For_MainFilters_Holder : CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder

        generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        peptideItems_Map_Key_peptideSequenceDisplayString : Map<string , CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> //  UPDATED
    }) : void {

    let subGroupIdMap_Key_PsmId : Map<number, number> = undefined;

    if ( searchSubGroup_Ids_Selected ) {
        if ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ) {
            const msg = "( searchSubGroup_Ids_Selected ) and ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ): projectSearchId " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }
        subGroupIdMap_Key_PsmId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupIdMap_Key_PsmId__For_ReportedPeptideId( reportedPeptideId )
        if ( ! subGroupIdMap_Key_PsmId ) {
            const msg = "( searchSubGroup_Ids_Selected ) and ( ! subGroupIdMap_Key_PsmId ): reportedPeptideId: " + reportedPeptideId + ", projectSearchId " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }
    }


    let psmIds_ToProcess_Local = psmIds_ToProcess;
    if ( ! psmIds_ToProcess_Local ) {
        if ( ! psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder ) {
            throw new Error("psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder not set. _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods. projectSearchId: " + projectSearchId )
        }
        const psmIdsForReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId( reportedPeptideId );
        if ( ! psmIdsForReportedPeptideId ) {
            throw new Error("psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId( reportedPeptideId ) not return a value. _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods. reportedPeptideId: "
                + reportedPeptideId
                + ", projectSearchId: " + projectSearchId
            )
        }

        if ( searchSubGroup_Ids_Selected ) {

            const psmIds_ToProcess_Temp = new Set<number>();

            for ( const psmId of psmIdsForReportedPeptideId ) {

                const subGroupId = subGroupIdMap_Key_PsmId.get( psmId );
                if ( ! subGroupId ) {
                    const msg = "( searchSubGroup_Ids_Selected ) and subGroupIdMap_Key_PsmId.get( psmId ) not return a value: psmId: " + psmId + ", projectSearchId " + projectSearchId;
                    console.warn( msg )
                    throw Error( msg )
                }
                if ( searchSubGroup_Ids_Selected.has( subGroupId ) ) {

                    psmIds_ToProcess_Temp.add( psmId );
                }

                psmIds_ToProcess_Local = new Set( psmIds_ToProcess_Temp );
            }
        } else {
            psmIds_ToProcess_Local = new Set( psmIdsForReportedPeptideId );
        }
    }

    const psmOpenModificationMassPerPSM_ForPsmIdMap = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( reportedPeptideId )
    if ( ! psmOpenModificationMassPerPSM_ForPsmIdMap ) {
        throw new Error("openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( reportedPeptideId ) not return a value. _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods. reportedPeptideId: "
            + reportedPeptideId
            + ", projectSearchId: " + projectSearchId
        )
    }


    for ( const psmId of psmIds_ToProcess_Local ) {

        const psmIds_ToAdd = new Set<number>();
        psmIds_ToAdd.add( psmId );

        let psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall : Map<number,number> = undefined;

        if ( searchSubGroup_Ids_Selected ) {
            psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall = new Map<number, number>();

            const subGroupId = subGroupIdMap_Key_PsmId.get( psmId );
            if ( ! subGroupId ) {
                const msg = "( searchSubGroup_Ids_Selected ) and subGroupIdMap_Key_PsmId.get( psmId ) not return a value: psmId: " + psmId + ", projectSearchId " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }
            if ( ! searchSubGroup_Ids_Selected.has( subGroupId ) ) {
                const msg = "( searchSubGroup_Ids_Selected ) and ( ! searchSubGroup_Ids_Selected.has( subGroupId ) ): psmId: " + psmId + ", projectSearchId " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }
            psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall.set( subGroupId, 1 );
        }

        let psmOpenModificationMassForPsmId = psmOpenModificationMassPerPSM_ForPsmIdMap.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmId );

        if ( psmOpenModificationMassForPsmId && psmOpenModificationMassForPsmId.openModificationMass_Rounded === 0
            && modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

            //  Open Mod Mass Rounded is Zero and User has selected to Treat Open Mod Mass Zero as Unmodified
            //    So Remove Open Mod Mass from for PSM from Generation of this Generated Reported Peptide for this PSM.

            psmOpenModificationMassForPsmId = null;
        }

        if ( ! psmOpenModificationMassForPsmId ) {

            //  NO Open Mods for PSM

            _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                forPeptidePage,

                reportedPeptideId,
                psmIds_ToAdd,

                proteinSequenceVersionId,
                proteinSequenceString,
                // Not Populated on Peptide Page
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,

                searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                peptideSequenceString,
                peptideUnique,
                projectSearchId,
                numPsms : psmIds_ToAdd.size, // TODO  Is this right?
                variableModificationsRoundedArray_KeyPosition,
                staticModificationsForProjectSearchId,
                open_Modification_Rounded : undefined,
                open_Modification_Rounded_Position : undefined,
                open_Modification_Rounded_NoPosition : undefined,

                peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
            });

        } else {

            if ( ( ! psmOpenModificationMassForPsmId.positionsMap_KeyPosition )
                || ! generatedPeptideContents_UserSelections_StateObject
                || ( ! generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) ) {

                //  No Position OR WithLocalization NOT selected

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                    forPeptidePage,

                    reportedPeptideId,
                    psmIds_ToAdd,

                    proteinSequenceVersionId,
                    proteinSequenceString,
                    // Not Populated on Peptide Page
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                    peptideSequenceString,
                    peptideUnique,
                    projectSearchId,
                    numPsms : psmIds_ToAdd.size, // TODO  Is this right?
                    variableModificationsRoundedArray_KeyPosition,
                    staticModificationsForProjectSearchId,
                    open_Modification_Rounded: undefined,
                    open_Modification_Rounded_Position: undefined,
                    open_Modification_Rounded_NoPosition: psmOpenModificationMassForPsmId.openModificationMass_Rounded.toString(),

                    peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
                });

            } else {
                // Process Positions

                for ( const positionMapEntry of psmOpenModificationMassForPsmId.positionsMap_KeyPosition.entries() ) {

                    const positionEntries_AtPosition = positionMapEntry[1];

                    for (const positionEntry of positionEntries_AtPosition) {

                        let open_Modification_Rounded_Position = positionEntry.position;
                        if (positionEntry.isNTerminal) {
                            open_Modification_Rounded_Position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX;
                        } else if (positionEntry.isCTerminal) {
                            open_Modification_Rounded_Position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX;
                        }
                        _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                            forPeptidePage,

                            reportedPeptideId,
                            psmIds_ToAdd,

                            proteinSequenceVersionId,
                            proteinSequenceString,
                            // Not Populated on Peptide Page
                            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,

                            searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                            psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                            peptideSequenceString,
                            peptideUnique,
                            projectSearchId,
                            numPsms : psmIds_ToAdd.size, // TODO  Is this right?
                            variableModificationsRoundedArray_KeyPosition,
                            staticModificationsForProjectSearchId,
                            open_Modification_Rounded: psmOpenModificationMassForPsmId.openModificationMass_Rounded,
                            open_Modification_Rounded_Position,
                            open_Modification_Rounded_NoPosition: undefined,

                            peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
                        });
                    }
                }
            }
        }
    }

}

/**
 *
 *
 */
const _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM = function (
    {
        forPeptidePage,

        reportedPeptideId,
        psmIds_ToAdd,

        proteinSequenceVersionId,  //  NOT populated for Peptide page
        proteinSequenceString,     // Not Populated on Peptide Page
        // Not Populated on Peptide Page
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId,

        peptideSequenceString,
        peptideUnique,
        projectSearchId,
        numPsms,
        variableModificationsRoundedArray_KeyPosition,
        staticModificationsForProjectSearchId,
        open_Modification_Rounded,
        open_Modification_Rounded_Position,
        open_Modification_Rounded_NoPosition,

        peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
    } : {
        forPeptidePage: boolean

        reportedPeptideId : number
        psmIds_ToAdd : ReadonlySet<number>  // Optional

        proteinSequenceVersionId : number  // Not Populated on Peptide Page
        proteinSequenceString: string  // Not Populated on Peptide Page
        // Not Populated on Peptide Page
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder : CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder


        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId: ReadonlyMap<number, number>

        peptideSequenceString : string
        peptideUnique : boolean
        projectSearchId : number
        numPsms : number                //  Ignored if psmIds_ToAdd provided
        variableModificationsRoundedArray_KeyPosition: Map<number, Set<number>>
        staticModificationsForProjectSearchId : Map<string, number>
        open_Modification_Rounded : number
        open_Modification_Rounded_Position : number
        open_Modification_Rounded_NoPosition : string

        peptideItems_Map_Key_peptideSequenceDisplayString : Map<string , CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> //  UPDATED
    }) : void {

    if ( searchSubGroup_Ids_Selected && psmCount_after_Include_Map_Key_SearchSubGroupId === undefined ) {
        const msg = "searchSubGroup_Ids_Selected && psmCount_after_Include_Map_Key_SearchSubGroupId === undefined."
        console.warn( msg )
        throw Error( msg );
    }

    //  First combine all positional mods together into single map since will display all as Variable Mods in '[' ']'

    const modifications_combine_temp : Map<number, Array<{ massNumber : number, massString : string }>> = new Map();

    if ( variableModificationsRoundedArray_KeyPosition ) {
        for ( const entry of variableModificationsRoundedArray_KeyPosition.entries() ) {
            const position : number = entry[ 0 ];
            const massesNumber : Set<number> = entry[ 1 ];

            let modifications_combine_temp_Entry = modifications_combine_temp.get( position );
            if ( ! modifications_combine_temp_Entry ) {
                modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
                modifications_combine_temp.set( position, modifications_combine_temp_Entry );
            }
            for ( const massNumber of massesNumber ) {
                const massString = modificationMass_CommonRounding_ReturnString( massNumber );
                modifications_combine_temp_Entry.push({massNumber, massString})
            }
        }
    }

    if ( staticModificationsForProjectSearchId ) {

        //  Peptide Sequence as Array of characters.  From MDN: .split():  If separator is an empty string, str is converted to an array of characters

        const peptideSequence_AsArray = peptideSequenceString.split("");
        const peptideSequence_Length = peptideSequenceString.length;

        for ( let peptideSequenceIndex = 0; peptideSequenceIndex < peptideSequence_Length; peptideSequenceIndex++ ) {

            const peptideSequencePosition = peptideSequenceIndex + 1; // positions are 1 based (start at 1)

            const peptideSequenceAtIndex = peptideSequence_AsArray[ peptideSequenceIndex ];

            const staticModificationRoundedNumber: number = staticModificationsForProjectSearchId.get( peptideSequenceAtIndex );
            if ( staticModificationRoundedNumber ) {

                let modifications_combine_temp_Entry = modifications_combine_temp.get( peptideSequencePosition );
                if ( ! modifications_combine_temp_Entry ) {
                    modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
                    modifications_combine_temp.set( peptideSequencePosition, modifications_combine_temp_Entry );
                }

                const massString = modificationMass_CommonRounding_ReturnString( staticModificationRoundedNumber );
                modifications_combine_temp_Entry.push({massNumber : staticModificationRoundedNumber, massString})
            }
        }
    }

    if ( open_Modification_Rounded !== undefined && open_Modification_Rounded !== null ) {

        let modifications_combine_temp_Entry = modifications_combine_temp.get( open_Modification_Rounded_Position );
        if ( ! modifications_combine_temp_Entry ) {
            modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
            modifications_combine_temp.set( open_Modification_Rounded_Position, modifications_combine_temp_Entry );
        }
        const massString = modificationMass_CommonRounding_ReturnString( open_Modification_Rounded );
        modifications_combine_temp_Entry.push({massNumber : open_Modification_Rounded, massString})
    }

    const variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall : Map<number, Array<string>> = new Map();

    for (const modifications_combine_temp_Entry of modifications_combine_temp.entries()) {
        const modifications_combine_tempKey = modifications_combine_temp_Entry[0];
        const modsRounded_ObjectsArray = modifications_combine_temp_Entry[1];

        modsRounded_ObjectsArray.sort((a, b) => {
            if (a.massNumber < b.massNumber) {
                return -1;
            } else if (a.massNumber > b.massNumber) {
                return 1;
            } else {
                return 0;
            }
        });
        const modsRoundedStringsArray : Array<string> = [];
        for (const modRounded of modsRounded_ObjectsArray) {
            const modRoundedString = modRounded.massString.toString();
            modsRoundedStringsArray.push(modRoundedString);
        }
        variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall.set(modifications_combine_tempKey, modsRoundedStringsArray);
    }



    //   Call external function
    const peptideSequenceDisplay = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches({
        peptideSequence : peptideSequenceString,
        variable_Modifications_RoundedArray_KeyPosition: variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall,
        open_Modification_Rounded : undefined,
        open_Modification_Rounded_Position : undefined,
        open_Modification_Rounded_NoPosition,
        staticModificationsRounded_KeyPosition : undefined
    });

    let peptideItem : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry = peptideItems_Map_Key_peptideSequenceDisplayString.get( peptideSequenceDisplay );
    if ( ! peptideItem ) {

        peptideItem = new CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry();
        peptideItem.peptideSequenceDisplay = peptideSequenceDisplay;
        peptideItem.peptideUnique = peptideUnique;
        peptideItem.psmCountsMap_KeyProjectSearchId = new Map();
        peptideItem.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId = new Map();

        peptideItems_Map_Key_peptideSequenceDisplayString.set( peptideSequenceDisplay, peptideItem );
    }

    if ( ! forPeptidePage ) {

        _update_peptideItem_Pre_Post_Residues({
            reportedPeptideId,
            proteinSequenceVersionId,
            proteinSequenceString,

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,

            peptideItem  // Updated
        });
    }

    if ( numPsms !== undefined ) {
        peptideItem.numPsmsTotal += numPsms;  // TODO  Maybe do something different instead
    }

    {
        if ( ! peptideUnique ) {
            peptideItem.peptideUnique = false;  // Set to false since can no longer be true
        }
    }

    {  //  PSM Count per search
        const psmCountFromMap = peptideItem.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
        if ( psmCountFromMap === undefined ) {
            peptideItem.psmCountsMap_KeyProjectSearchId.set( projectSearchId, numPsms );
        } else {
            const new_psmCountFromMap  = psmCountFromMap + numPsms;
            peptideItem.psmCountsMap_KeyProjectSearchId.set( projectSearchId, new_psmCountFromMap );
        }
    }
    {  //  PSM Count per Search Sub Group
        if ( searchSubGroup_Ids_Selected ) {

            if ( ! psmCount_after_Include_Map_Key_SearchSubGroupId ) {
                const msg = "( searchSubGroup_Ids_Selected ) AND ( ! psmCount_after_Include_Map_Key_SearchSubGroupId )"
                console.warn( msg )
                throw Error( msg )
            }

            for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {

                const psmCount_NO_PsmId_Filtering_For_SearchSubGroupId = psmCount_after_Include_Map_Key_SearchSubGroupId.get( searchSubGroup_Id )
                if ( psmCount_NO_PsmId_Filtering_For_SearchSubGroupId !== undefined ) {

                    if ( ! peptideItem.psmCountsMap_Key_SubSearchGroup_Id ) {
                        peptideItem.psmCountsMap_Key_SubSearchGroup_Id = new Map();
                    }

                    const psmCountFromMap = peptideItem.psmCountsMap_Key_SubSearchGroup_Id.get( searchSubGroup_Id );
                    if ( psmCountFromMap === undefined ) {
                        peptideItem.psmCountsMap_Key_SubSearchGroup_Id.set( searchSubGroup_Id, psmCount_NO_PsmId_Filtering_For_SearchSubGroupId );
                    } else {
                        const new_psmCountFromMap  = psmCountFromMap + psmCount_NO_PsmId_Filtering_For_SearchSubGroupId;
                        peptideItem.psmCountsMap_Key_SubSearchGroup_Id.set( searchSubGroup_Id, new_psmCountFromMap );
                    }
                }
            }

            if ( ! peptideItem.psmCountsMap_Key_SubSearchGroup_Id ) {
                const msg = "( ! peptideItem.psmCountsMap_Key_SubSearchGroup_Id ) after supposed to populate it inside "
                console.warn( msg )
                throw Error( msg )
            }
        }
    }

    let dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideItem.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId );
    if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
        dataPerReportedPeptideId_Map_Key_reportedPeptideId = new Map()
        peptideItem.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.set( projectSearchId, dataPerReportedPeptideId_Map_Key_reportedPeptideId );
    }

    let psmIdsSet : Set<number> = undefined
    let no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId = false;

    if ( psmIds_ToAdd ) {
        psmIdsSet = new Set( psmIds_ToAdd )
    } else {
        no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId = true;
    }

    let dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId.get( reportedPeptideId );
    if ( ! dataPerReportedPeptideId ) {
        dataPerReportedPeptideId = new CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry({
            reportedPeptideId,
            no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId,
            psmIdsSet
        });
        dataPerReportedPeptideId_Map_Key_reportedPeptideId.set( reportedPeptideId, dataPerReportedPeptideId );
    } else {
        if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {
            throw new Error( "( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ). reportedPeptideId: "
                + reportedPeptideId
                + ", projectSearchId: " + projectSearchId
            );
        }
        if ( psmIds_ToAdd ) {
            for ( const psmId_ToAdd of psmIds_ToAdd ) {
                dataPerReportedPeptideId.psmIdsSet.add( psmId_ToAdd );
            }
        }
    }
}

/**
 * !!!  Only called for Single Protein.  Not loaded for Peptide page
 *
 *
 * @param reportedPeptideId
 * @param proteinSequenceVersionId
 * @param proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId
 * @param peptideItem
 * @private
 */
const _update_peptideItem_Pre_Post_Residues = function (
    {
        reportedPeptideId,
        proteinSequenceVersionId,
        proteinSequenceString,

        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,

        peptideItem  // Updated
    } : {
        reportedPeptideId: number
        proteinSequenceVersionId: number
        proteinSequenceString: string

        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder : CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

        peptideItem : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
    }
) : void {

    if ( ! proteinSequenceVersionId ) {
        throw Error("_update_peptideItem_Pre_Post_Residues: proteinSequenceVersionId is required")
    }
    if ( ! proteinSequenceString ) {
        throw Error("_update_peptideItem_Pre_Post_Residues: proteinSequenceString is required")
    }


    //  Skip if no Protein Sequence loaded -  Protein Sequence loaded only for Single Protein.  Not loaded for Peptide page
    if ( !proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder ) {
        //  Coverage Data NOT loaded so Skip

        return; // EARLY RETURN
    }

    const proteinCoverage_For_ReportedPeptideId =
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId(reportedPeptideId);

    if (proteinCoverage_For_ReportedPeptideId) {
        for (const proteinCoverageEntry of proteinCoverage_For_ReportedPeptideId) {

            if ( proteinSequenceVersionId && proteinSequenceVersionId !== proteinCoverageEntry.proteinSequenceVersionId ) {

                //  Processing this function specifically for proteinSequenceVersionId (Single Protein Page)
                //     AND the proteinSequenceVersionId for this Coverage Entry does NOT match SO SKIP

                continue;  // EARLY CONTINUE
            }

            const proteinStartPosition = proteinCoverageEntry.proteinStartPosition
            const proteinEndPosition = proteinCoverageEntry.proteinEndPosition

            if ( proteinStartPosition === 1 ) {

                peptideItem.protein_Pre_Residue_N_Term = true
            } else {
                const preResidue_Index = proteinStartPosition -  1 - 1;  //  - 1 for convert from One based to Zero based,  - 1 for get position one before the start of the peptide
                const preResidue = proteinSequenceString.substring( preResidue_Index, preResidue_Index + 1 );
                peptideItem.protein_Pre_Residues.add( preResidue );
            }

            if ( proteinEndPosition === proteinSequenceString.length ) {

                peptideItem.protein_Post_Residue_C_Term = true
            } else {
                const postResidue_Index = proteinEndPosition - 1 + 1;  //  - 1 for convert from One based to Zero based,  + 1 for get position one after the end of the peptide
                const postResidue = proteinSequenceString.substring( postResidue_Index, postResidue_Index + 1 );
                peptideItem.protein_Post_Residues.add( postResidue );
            }
        }
    }
}


///////////

/**
 * Sort Peptides Array on PSM Count then Reported Peptide Id
 */
const _sortPeptideListOnSortOrder = function( { peptideList } : { peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> } ) {

    peptideList.sort( function( a, b ) {

        //  Sort on PSM Counts total for entry, Descending
        if ( a.numPsmsTotal > b.numPsmsTotal ) {
            return -1;
        }
        if ( a.numPsmsTotal < b.numPsmsTotal ) {
            return 1;
        }

        //  PSM Counts match so order on peptideSequenceDisplay, Ascending
        if ( a.peptideSequenceDisplay < b.peptideSequenceDisplay ) {
            return -1;
        }
        if ( a.peptideSequenceDisplay > b.peptideSequenceDisplay ) {
            return 1;
        }
        return 0;

    });
}


/////

/**
 * Get Static Modifications (rounded) Number
 *
 * @returns Map<residue, roundedMass>: subset of staticModificationMassesToFilterOn;
 */
const _get_StaticModifications_ByResidueLetter_ForProjectSearchId = function(
    {
        staticMods_Holder
    } : {
        staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
    }) : Map<string, number> {

    const staticModsForSearchMap : Map<string, number> = new Map(); // Map<residue, roundedMass>

    // from staticMods: Build Map<residue, roundedMass>
    for ( const staticMod of staticMods_Holder.get_StaticMods() ) {
        const massRounded = modificationMass_CommonRounding_ReturnNumber( staticMod.mass );  // Call external function
        staticModsForSearchMap.set( staticMod.residue, massRounded );
    }

    return staticModsForSearchMap;
}

////////////////////////////////////

/**
 * Get Variable Modifications (rounded) Strings: By Reported Peptide Id and Position _ For Single Project Search Id
 *
 * @returns  Map<(reported peptide), Map<(position),Set<(mod mass rounded numbers)>>
 */
const _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId = function(
    {
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    } : {
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId

    }
) :  Map<number, Map<number, Set<number>>>

{
    const modsRoundedSet_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Set<number>>> = new Map();

    for ( const reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() ) {

        _process_VariableModifications_ForSingleReportedPeptideId({ reportedPeptideId,  variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder, modsRoundedSet_KeyPosition_KeyReportedPeptideId });
    }

    return modsRoundedSet_KeyPosition_KeyReportedPeptideId;
}

/**
 *
 */
const _process_VariableModifications_ForSingleReportedPeptideId = function (
    {
        reportedPeptideId,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        modsRoundedSet_KeyPosition_KeyReportedPeptideId
    } : {
        reportedPeptideId : number
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        modsRoundedSet_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Set<number>>>
    }
) : void {

    let modsRoundedSet_KeyPosition = modsRoundedSet_KeyPosition_KeyReportedPeptideId.get(reportedPeptideId);
    if (!modsRoundedSet_KeyPosition) {
        modsRoundedSet_KeyPosition = new Map();
        modsRoundedSet_KeyPosition_KeyReportedPeptideId.set(reportedPeptideId, modsRoundedSet_KeyPosition);
    }

    const dynamicModificationsOnReportedPeptideArray = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId(reportedPeptideId);
    if (dynamicModificationsOnReportedPeptideArray) {

        //  Have Mods for this reportedPeptideId
        for (const dynamicModificationOnReportedPeptide of dynamicModificationsOnReportedPeptideArray) {

            //   is_N_Terminal and is_C_Terminal
            const is_N_Terminal = dynamicModificationOnReportedPeptide.is_N_Terminal;
            const is_C_Terminal = dynamicModificationOnReportedPeptide.is_C_Terminal;

            const mass = dynamicModificationOnReportedPeptide.mass;
            let positionOnReportedPeptide = dynamicModificationOnReportedPeptide.position;

            if ( is_N_Terminal ) {

                positionOnReportedPeptide = reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX;

            } else if ( is_C_Terminal ) {

                positionOnReportedPeptide = reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX;
            }

            let modsRoundedSet = modsRoundedSet_KeyPosition.get(positionOnReportedPeptide);
            if (!modsRoundedSet) {
                modsRoundedSet = new Set();
                modsRoundedSet_KeyPosition.set(positionOnReportedPeptide, modsRoundedSet);
            }

            const massRounded = modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
            modsRoundedSet.add(massRounded);
        }
    }
}