/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__NonSubGroup_Part__Create_GeneratedPeptides.ts
 *
 * Create Generated Peptide List for Protein List for Single Search or Multiple Searches ( NOT Single Search Sub Groups )
 */

import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";

import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {
    modificationMass_CommonRounding_ReturnNumber,
    modificationMass_CommonRounding_ReturnString
} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";
import {
    create_reportedPeptide_CommonValue_EncodedString,
    reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX,
    reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX
} from "page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptide_CommonValue_AcrossSearches";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters";
import {dataPage_common_Get_Searches_Flags} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";


/**
 * Result from proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides call
 */
export class ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result {
    peptideList : Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry>;
    entries_Key_reportedPeptide_CommonValue_EncodedString : Map<string , ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry>; // AKA peptideItems_Map_Key_peptideSequenceDisplayString : Map<string , ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__NonSubGroup_Part__Create_GeneratedPeptides_Result_PeptideList_Entry>
    // numberOfPsmIds_NonRedundant_AcrossAllPeptides : number;
}

/**
 * Result from proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides call
 */
export class ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry {

    reportedPeptide_CommonValue_EncodedString : string

    dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId : Map<number, Map<number, ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry>>

    dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId: Map<number, Map<number, ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry>>
}

/**
 * Result from proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides call
 */
export class ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry {

    reportedPeptideId : Readonly<number>

    //  Only 1 of the next 2 is set
    no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId : Readonly<boolean>  //  Also within Sub Group
    psmIdsSet : Set<number>

    constructor({ reportedPeptideId, no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId, psmIdsSet } : {
        reportedPeptideId : Readonly<number>
        //  Only 1 of the next 2 is set
        no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId : Readonly<boolean>
        psmIdsSet : Set<number>
    }) {
        if ( no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && psmIdsSet ) {
            const msg = "( allPsmIds_For_ReportedPeptideId_within_ProjectSearchId && psmIdsSet ): ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry. "
            console.warn( msg )
            throw Error( msg )
        }
        this.reportedPeptideId = reportedPeptideId
        this.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId = no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId
        this.psmIdsSet = psmIdsSet
    }
}

////////////////////////////////////////////

/**
 * !!!!!  IMPORTANT:   Always return Promise since caller uses 'await'   !!!!!
 *
 *
 * !!!!!    Main Function --- called from outside this file   !!!!!!!!!!!!!!!!!
 *
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides = function (
    {
        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        dataPageStateManager,
        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }: {
        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        dataPageStateManager : DataPageStateManager
        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        projectSearchIds: Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }) : Promise<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result> {

    return new Promise<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result>( (resolve_TopLevel, reject_TopLevel) => {
        try {
            //  First get data which may return a Promise

            const peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult> = new Map();

            //  Map<(project search id), Map<(reported peptide), Map<(position),Array<(mod mass rounded number)>>>
            let variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId : Map<number, Map<number, Map<number, Array<number>>>> = undefined;

            let openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId : Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder> = undefined;

            let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder> = undefined;

            let searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder> = undefined;

            let numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder> = undefined;

            const promises: Array<Promise<void>> = [];

            for ( const projectSearchId of projectSearchIds ) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    throw Error( "No commonData_LoadedFromServer_PerSearch_For_ProjectSearchId for projectSearchId: " + projectSearchId );
                }

                {
                    const peptideIds_For_MainFilters_Holder_AllForSearch_Result =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch();
                    if ( peptideIds_For_MainFilters_Holder_AllForSearch_Result.data ) {
                        peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult_Map_Key_ProjectSearchId.set( projectSearchId, peptideIds_For_MainFilters_Holder_AllForSearch_Result.data );
                    } else if ( peptideIds_For_MainFilters_Holder_AllForSearch_Result.promise ) {
                        const promise = new Promise<void>( (resolve, reject) => { try {
                            peptideIds_For_MainFilters_Holder_AllForSearch_Result.promise.catch(reason => {
                                reject(reason);
                            })
                            peptideIds_For_MainFilters_Holder_AllForSearch_Result.promise.then(value => { try {
                                peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult_Map_Key_ProjectSearchId.set( projectSearchId, value );
                                resolve();  //  resolve
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        promises.push(promise);
                    } else {
                        throw Error("peptideIds_For_MainFilters_Holder_AllForSearch_Result 'data' or 'promise' both not populated");
                    }
                }
                {  //  Load Reported Peptide Variable Mods if needed
                    if ( proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject && proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() ) {

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
                                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult: variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result.data,
                                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
                                })
                            );
                            variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId.set(projectSearchId, variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId)
                        } else if ( variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result.promise ) {
                            const promise = new Promise<void>( (resolve, reject) => { try {
                                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result.promise.catch(reason => {
                                    reject(reason);
                                })
                                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result.promise.then(value => { try {
                                    const variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId = (
                                        _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId({
                                            get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult: value,
                                            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
                                        })
                                    );
                                    variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId.set(projectSearchId, variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId)
                                    resolve(); // resolve
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            promises.push(promise);
                        } else {
                            throw Error("variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result 'data' 'promise' both NOT have value");
                        }
                    }
                }
                {  //  Load PSM Open Mods if needed
                    if ( proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject && proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {
                        if ( ! openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                            openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId = new Map();
                        }
                        const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                            get_OpenModifications_On_PSMHolder_AllForSearch();
                        if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data ) {
                            openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId, get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder
                            );
                        } else if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise ) {
                            const promise = new Promise<void>( (resolve, reject) => { try {
                                get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => {
                                    reject(reason);
                                })
                                get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then(value => { try {
                                    openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                        projectSearchId, value.openModifications_On_PSM_For_MainFilters_Holder
                                    );
                                    resolve();  // resolve
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            promises.push(promise);
                        } else {
                            throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result 'data' 'promise' both NOT have value");
                        }
                    }
                }
                {  //  Load PSM IDs if needed.  Only needed if displaying open mods

                    const common_Flags_SingleSearch_ForProjectSearchId = dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
                    if ( ! common_Flags_SingleSearch_ForProjectSearchId ) {
                        const msg = "dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId) returned Nothing. projectSearchId: " + projectSearchId;
                        console.warn(msg)
                        throw Error(msg)
                    }

                    if ( common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_OpenModifications
                        && proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject && proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {

                        if ( ! psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = new Map();
                        }
                        const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                            get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();
                        if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId, get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                            );
                        } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                            const promise = new Promise<void>( (resolve, reject) => { try {
                                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                                    reject(reason);
                                })
                                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                        projectSearchId, value.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                                    );
                                    resolve(); //  resolve
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            promises.push(promise);
                        } else {
                            throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result 'data' 'promise' both NOT have value");
                        }
                    }
                }

                if ( searchSubGroup_Ids_Selected ) {  //  When have Search Sub Groups Selection ( Have Single Search which has Sub Groups )
                    {
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
                                const promise = new Promise<void>( (resolve, reject) => { try {
                                    get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                                        reject(reason);
                                    })
                                    get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                                            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                                projectSearchId, value.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                                            );
                                            resolve(); // resolve
                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                promises.push(promise);
                            } else {
                                throw Error("get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result 'data' 'promise' both NOT have value");
                            }
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
                            const promise = new Promise<void>( (resolve, reject) => { try {
                                get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                                    reject(reason);
                                })
                                get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                                        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                            projectSearchId, value.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
                                        );
                                        resolve(); // resolve
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            promises.push(promise);
                        } else {
                            throw Error("get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result 'data' 'promise' both NOT have value");
                        }
                    }
                }
            }  //  END:  if ( searchSubGroup_Ids_Selected )

            if ( promises.length === 0 ) {
                const result = internal_TopLevel_Function_AfterDataLoad({
                    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                    projectSearchIds,
                    peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult_Map_Key_ProjectSearchId,
                    variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId,
                    openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                });

                resolve_TopLevel(result);  // resolve

                return;  // EARLY RETURN
            }

            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {
                reject_TopLevel(reason);
            })
            promisesAll.then(noValue => {
                try {
                    const result = internal_TopLevel_Function_AfterDataLoad({
                        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                        projectSearchIds,
                        peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult_Map_Key_ProjectSearchId,
                        variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId,
                        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                    });

                    resolve_TopLevel(result); // resolve

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
const internal_TopLevel_Function_AfterDataLoad = function (
    {
        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
        projectSearchIds,
        peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult_Map_Key_ProjectSearchId,
        variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId,
        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
    }: {
        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        projectSearchIds: Array<number>
        peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult>

        //  Map<(project search id), Map<(reported peptide), Map<(position),Array<(mod mass rounded number)>>>
        variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId : Map<number, Map<number, Map<number, Array<number>>>>

        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId : Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder>
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder>
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder>
        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder>

    }) : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result {

    const peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString : Map<string, ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry> = new Map();

    for ( const projectSearchId of projectSearchIds ) {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId =
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId );
        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId ) {
            throw Error( "No reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for projectSearchId: " + projectSearchId );
        }

        const peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult = peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult_Map_Key_ProjectSearchId.get(projectSearchId);
        if ( ! peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult ) {
            throw Error( "No peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId );
        }
        const peptideIds_For_MainFilters_Holder_AllForSearch = peptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult.peptideIds_For_MainFilters_Holder;

        let openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder = undefined;
        if ( openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
            openModifications_On_PSM_For_MainFilters_Holder = openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
            //  Possibly NOT populated for all searches
            // if ( ! openModifications_On_PSM_For_MainFilters_Holder ) {
            //     throw Error( "No openModifications_On_PSM_For_MainFilters_Holder for projectSearchId: " + projectSearchId );
            // }
        }

        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined;
        if ( psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
            //  Possibly NOT populated for all searches
            // if ( ! psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder ) {
            //     throw Error( "No psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder for projectSearchId: " + projectSearchId );
            // }
        }

        let searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = undefined
        if ( searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
            //  Possibly NOT populated for all searches
            // if ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ) {
            //     throw Error( "No searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder for projectSearchId: " + projectSearchId );
            // }
        }

        let numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        if ( numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
            numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder = numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
            //  Possibly NOT populated for all searches
            // if ( ! numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder ) {
            //     throw Error( "No numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder for projectSearchId: " + projectSearchId );
            // }
        }

        //  Map<(reported peptide), Map<(position),Array<(mod mass rounded number)>>
        let variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId: Map<number, Map<number, Array<number>>> = undefined;
        if ( variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId ) {
            variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId = variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
        }

        //  reportedPeptideIds filtered if applicable so now create display peptide row objects

        for ( const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
            of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ) {

            const reportedPeptideId =  reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.reportedPeptideId
            const psmIds_Include = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include
            const psmCount_after_Include_Map_Key_SearchSubGroupId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include_Map_Key_SearchSubGroupId

            const peptideId = peptideIds_For_MainFilters_Holder_AllForSearch.get_PeptideId_For_ReportedPeptideId( reportedPeptideId );
            if ( ! peptideId ) {
                throw Error("_createReportedPeptideDisplayData: No peptideId for reportedPeptideId: " + reportedPeptideId + ", projectSearchIds: " + projectSearchIds );
            }

            let variableModificationsRoundedArray_KeyPosition :  Map<number, Array<number>> = undefined;

            if ( variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId ) {
                variableModificationsRoundedArray_KeyPosition = variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId.get( reportedPeptideId ) ;
            }

            let generatedReportedPeptide_UserSelected_Add_Variable_Modifications = false;
            if ( proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject && proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() ) {
                generatedReportedPeptide_UserSelected_Add_Variable_Modifications = true;
            }

            let generatedReportedPeptide_UserSelected_Add_Open_Modifications = false;
            if ( proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject && proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {
                generatedReportedPeptide_UserSelected_Add_Open_Modifications = true;
            }

            let psmOpenModificationMassPerPSM_ForPsmIdMap: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId = undefined;
            if ( openModifications_On_PSM_For_MainFilters_Holder ) {
                psmOpenModificationMassPerPSM_ForPsmIdMap = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId);
            }

            if ( psmOpenModificationMassPerPSM_ForPsmIdMap ) {

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods({

                    reportedPeptideId,
                    psmIds_ToProcess : psmIds_Include,

                    generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
                    generatedReportedPeptide_UserSelected_Add_Open_Modifications,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

                    peptideId,
                    projectSearchId,
                    variableModificationsRoundedArray_KeyPosition,
                    psmOpenModificationMassPerPSM_ForPsmIdMap,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                    numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,
                    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

                    peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
                });

            } else {
                //  No Open Mods

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                    reportedPeptideId,
                    psmIds_ToAdd : psmIds_Include,

                    generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
                    generatedReportedPeptide_UserSelected_Add_Open_Modifications,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    psmCount_after_Include_Map_Key_SearchSubGroupId,

                    peptideId,
                    projectSearchId,
                    variableModificationsRoundedArray_KeyPosition,
                    open_Modification_Rounded : undefined,
                    open_Modification_Rounded_Position : undefined,
                    open_Modification_Rounded_NoPosition : undefined,

                    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                    numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,

                    peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
                });
            }
        }
    }

    const peptideListResult : Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry> = [];

    //  Copy to array
    for ( const peptideItemsEntry of peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString.entries() ) {
        const peptideItem = peptideItemsEntry[ 1 ];
        peptideListResult.push( peptideItem );
    }

    const result = new ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result();

    result.peptideList = peptideListResult;
    result.entries_Key_reportedPeptide_CommonValue_EncodedString = peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString;

    return result;
}

/**
 *
 */
const _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods = function (
    {
        reportedPeptideId,
        psmIds_ToProcess,

        generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
        generatedReportedPeptide_UserSelected_Add_Open_Modifications,

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        peptideId,
        projectSearchId,
        variableModificationsRoundedArray_KeyPosition,
        psmOpenModificationMassPerPSM_ForPsmIdMap,
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,
        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
    } : {
        reportedPeptideId : number
        psmIds_ToProcess : ReadonlySet<number>  // Optional

        generatedReportedPeptide_UserSelected_Add_Variable_Modifications: boolean  //  True when add Variable Modifications to the Generated Distinct Peptide
        generatedReportedPeptide_UserSelected_Add_Open_Modifications: boolean  //  True when add Open Modifications to the Generated Distinct Peptide

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        peptideId : number
        projectSearchId : number
        variableModificationsRoundedArray_KeyPosition: Map<number, Array<number>>
        psmOpenModificationMassPerPSM_ForPsmIdMap: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder

        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString : Map<string , ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry> //  UPDATED
    }) {

    let psmIds_ToProcess_Local = psmIds_ToProcess;
    if ( ! psmIds_ToProcess_Local ) {

        //  NO psmIds_ToProcess_Local so Need to Get them.

        //  Start with ALL PSM IDs for Reported Peptide Id (At current Filters)

        if ( ! psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder ) {
            const msg = "( ! psmIds_ToProcess_Local ) and ( ! psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder ): reportedPeptideId: " + reportedPeptideId + ", projectSearchId " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        const psmIdsForReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId( reportedPeptideId );
        if ( ! psmIdsForReportedPeptideId ) {
            throw new Error("psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId( reportedPeptideId ); not return a value. _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods. reportedPeptideId: "
                + reportedPeptideId
                + ", projectSearchId: " + projectSearchId
            )
        }

        if ( ! searchSubGroup_Ids_Selected ) {
            //  NO Sub Groups selected, so process ALL PSM IDs for Reported Peptide Id (At current Filters)
            psmIds_ToProcess_Local = new Set(psmIdsForReportedPeptideId);

        } else {

            //  Update psmIds_ToProcess_Local to ONLY PSM IDs for the searchSubGroup_Ids_Selected entries

            if ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ) {
                const msg = "else of ( ! searchSubGroup_Ids_Selected ) and ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ): reportedPeptideId: " + reportedPeptideId + ", projectSearchId " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            const psmIds_ToProcess_Temp = new Set<number>();

            for ( const psmId of psmIdsForReportedPeptideId ) {

                const subGroupId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmId );
                if ( ! subGroupId ) {
                    const msg = "( searchSubGroup_Ids_Selected ) and searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmId ) not return a value: psmId: " + psmId + ", projectSearchId " + projectSearchId;
                    console.warn( msg )
                    throw Error( msg )
                }
                if ( searchSubGroup_Ids_Selected.has( subGroupId ) ) {

                    psmIds_ToProcess_Temp.add( psmId );
                }
            }

            psmIds_ToProcess_Local = psmIds_ToProcess_Temp;
        }
    }

    for ( const psmId of psmIds_ToProcess_Local ) {

        const psmIds_ToAdd = new Set<number>();
        psmIds_ToAdd.add( psmId );

        let psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall : Map<number,number> = undefined;

        if ( searchSubGroup_Ids_Selected ) {

            if ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ) {
                const msg = "else of ( ! searchSubGroup_Ids_Selected ) and ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ): reportedPeptideId: " + reportedPeptideId + ", projectSearchId " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall = new Map<number, number>();

            const subGroupId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmId );
            if ( ! subGroupId ) {
                const msg = "( searchSubGroup_Ids_Selected ) and searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmId ) not return a value: psmId: " + psmId + ", projectSearchId " + projectSearchId;
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

            _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                reportedPeptideId,
                psmIds_ToAdd,

                generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
                generatedReportedPeptide_UserSelected_Add_Open_Modifications,

                searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                peptideId,
                projectSearchId,
                variableModificationsRoundedArray_KeyPosition,
                open_Modification_Rounded : undefined,
                open_Modification_Rounded_Position : undefined,
                open_Modification_Rounded_NoPosition : undefined,

                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,

                peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
            });

        } else {

            if ( ( ! psmOpenModificationMassForPsmId.positionsMap_KeyPosition )
                || ! proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
                || ( ! proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) ) {

                //  No Position OR WithLocalization NOT selected

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                    reportedPeptideId,
                    psmIds_ToAdd,

                    generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
                    generatedReportedPeptide_UserSelected_Add_Open_Modifications,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                    peptideId,
                    projectSearchId,
                    variableModificationsRoundedArray_KeyPosition,
                    open_Modification_Rounded: undefined,
                    open_Modification_Rounded_Position: undefined,
                    open_Modification_Rounded_NoPosition: psmOpenModificationMassForPsmId.openModificationMass_Rounded.toString(),

                    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                    numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,

                    peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
                });

            } else {
                // Process Positions

                for ( const positionMapEntry of psmOpenModificationMassForPsmId.positionsMap_KeyPosition.entries() ) {

                    const positionEntries_AtPosition = positionMapEntry[1];

                    for (const positionEntry of positionEntries_AtPosition) {

                        let open_Modification_Rounded_Position = positionEntry.position;
                        if (positionEntry.isNTerminal) {
                            open_Modification_Rounded_Position = reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX;
                        } else if (positionEntry.isCTerminal) {
                            open_Modification_Rounded_Position = reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX;
                        }
                        _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                            reportedPeptideId,
                            psmIds_ToAdd,

                            generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
                            generatedReportedPeptide_UserSelected_Add_Open_Modifications,

                            searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                            psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                            peptideId,
                            projectSearchId,
                            variableModificationsRoundedArray_KeyPosition,
                            open_Modification_Rounded: psmOpenModificationMassForPsmId.openModificationMass_Rounded,
                            open_Modification_Rounded_Position,
                            open_Modification_Rounded_NoPosition: undefined,

                            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                            numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,

                            peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
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
        reportedPeptideId,
        psmIds_ToAdd,

        generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
        generatedReportedPeptide_UserSelected_Add_Open_Modifications,

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId,

        peptideId,
        projectSearchId,
        variableModificationsRoundedArray_KeyPosition,
        open_Modification_Rounded,
        open_Modification_Rounded_Position,
        open_Modification_Rounded_NoPosition,

        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,

        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
    } : {
        reportedPeptideId : number

        psmIds_ToAdd : ReadonlySet<number>  // Optional

        generatedReportedPeptide_UserSelected_Add_Variable_Modifications: boolean  //  True when add Variable Modifications to the Generated Distinct Peptide
        generatedReportedPeptide_UserSelected_Add_Open_Modifications: boolean  //  True when add Open Modifications to the Generated Distinct Peptide

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId: ReadonlyMap<number, number>

        peptideId : number
        projectSearchId : number
        variableModificationsRoundedArray_KeyPosition: Map<number, Array<number>>
        open_Modification_Rounded : number
        open_Modification_Rounded_Position : number
        open_Modification_Rounded_NoPosition : string

        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder

        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString : Map<string , ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry> //  UPDATED
    })  {

    if ( searchSubGroup_Ids_Selected && psmCount_after_Include_Map_Key_SearchSubGroupId === undefined ) {
        const msg = "searchSubGroup_Ids_Selected && psmCount_after_Include_Map_Key_SearchSubGroupId === undefined."
        console.warn( msg )
        throw Error( msg );
    }

    //  First combine all positional mods (Variable and Open) together into single map since will display all as Variable Mods in '[' ']'

    const modifications_combine_temp : Map<number, Array<{ massNumber : number, massString : string }>> = new Map();

    if ( generatedReportedPeptide_UserSelected_Add_Variable_Modifications ) {

        //  Add Variable Mod masses to Modifications for reportedPeptide_CommonValue_EncodedString SINCE user has selected "Distinct Peptide Includes:" "Variable Modifications"

        if ( variableModificationsRoundedArray_KeyPosition ) {
            for ( const entry of variableModificationsRoundedArray_KeyPosition.entries() ) {
                const position : number = entry[ 0 ];
                const massesNumber : Array<number> = entry[ 1 ];

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
    }

    if ( generatedReportedPeptide_UserSelected_Add_Open_Modifications ) {

        //  Add Open Mod mass to Modifications for reportedPeptide_CommonValue_EncodedString SINCE user has selected "Distinct Peptide Includes:" "Open Modifications"

        if ( open_Modification_Rounded !== undefined && open_Modification_Rounded !== null ) {

            let modifications_combine_temp_Entry = modifications_combine_temp.get( open_Modification_Rounded_Position );
            if ( ! modifications_combine_temp_Entry ) {
                modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
                modifications_combine_temp.set( open_Modification_Rounded_Position, modifications_combine_temp_Entry );
            }
            const massString = modificationMass_CommonRounding_ReturnString( open_Modification_Rounded );
            modifications_combine_temp_Entry.push({massNumber : open_Modification_Rounded, massString})
        }
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

    let open_Modification_Rounded_NoPosition__For_reportedPeptide_CommonValue_EncodedString = undefined;
    if ( generatedReportedPeptide_UserSelected_Add_Open_Modifications ) {

        //  Add Open Mod mass No Position for reportedPeptide_CommonValue_EncodedString SINCE user has selected "Distinct Peptide Includes:" "Open Modifications"

        open_Modification_Rounded_NoPosition__For_reportedPeptide_CommonValue_EncodedString = open_Modification_Rounded_NoPosition
    }

    //  Create a string that represents the peptide with optionally variable and open mods and possibly others based on user selection

    const reportedPeptide_CommonValue_EncodedString = create_reportedPeptide_CommonValue_EncodedString({

        peptideId,
        variableModifications_Map_KeyPosition: variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall,  //  Variable Mods and Open Mod at Position
        staticModifications_Map_KeyPosition: undefined,
        //  No Open Mod at Position passed in since included with the Variable Modifications
        open_Modification_Rounded: undefined, //  Currently added to variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall
        open_Modification_Rounded_Position: undefined, //  Currently added to variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall
        open_Modification_Rounded_NoPosition: open_Modification_Rounded_NoPosition__For_reportedPeptide_CommonValue_EncodedString
    });

    let peptideItem : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry =
        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString.get( reportedPeptide_CommonValue_EncodedString );

    if ( ! peptideItem ) {

        peptideItem = new ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry();
        peptideItem.reportedPeptide_CommonValue_EncodedString = reportedPeptide_CommonValue_EncodedString;
        peptideItem.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId = new Map();

        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString.set( reportedPeptide_CommonValue_EncodedString, peptideItem );
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
        dataPerReportedPeptideId = new ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry({
            reportedPeptideId,
            no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId,
            psmIdsSet
        });
        dataPerReportedPeptideId_Map_Key_reportedPeptideId.set( reportedPeptideId, dataPerReportedPeptideId );
    } else {
        if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {
            //  Is for No Sub filtering and already processed this reportedPeptideId
            throw new Error( "Is for No Sub filtering and already processed this reportedPeptideId: ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ). reportedPeptideId: "
                + reportedPeptideId
                + ", projectSearchId: " + projectSearchId
            );
        }
        if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && ( ! no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) ) {
            //  Already processed this reportedPeptideId for No Sub filtering and this is NOT for No Sub filtering
            throw new Error( "Already processed this reportedPeptideId for No Sub filtering and this is NOT for No Sub filtering: ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && ( ! no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) ). reportedPeptideId: "
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

    //   Per Search Sub Group Id (If populated)

    {
        if ( searchSubGroup_Ids_Selected ) {

             // Add to Per searchSubGroup_Id Map

            if ( ! peptideItem.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId ) {
                peptideItem.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId = new Map();
            }

            if ( psmIds_ToAdd && psmIds_ToAdd.size > 0 ) {

                //  YES Specific PSM IDs to add so add based on psmIds_ToAdd, reportedPeptideId and searchSubGroup_Ids_Selected

                if ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ) {
                    const msg = "( searchSubGroup_Ids_Selected ) AND ( psmIds_ToAdd && psmIds_ToAdd.size > 0 ) AND  searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder NOT Populated";
                    console.warn(msg);
                    throw Error(msg);
                }

                for ( const psmId of psmIds_ToAdd ) {
                    const subGroupId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId(psmId);
                    if ( ! subGroupId ) {
                        const msg = "( searchSubGroup_Ids_Selected ) AND ( psmIds_ToAdd && psmIds_ToAdd.size > 0 ) AND searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId(psmId); returned NOTHING. psmId: " + psmId + ", reportedPeptideId: " + reportedPeptideId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    let dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId = peptideItem.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.get(reportedPeptideId);
                    if ( ! dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId ) {
                        dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId = new Map();
                        peptideItem.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.set(reportedPeptideId, dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId);
                    }
                    let dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId.get(subGroupId);
                    if ( ! dataPerReportedPeptideId ) {
                        dataPerReportedPeptideId = new ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry({
                            reportedPeptideId,
                            no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId,
                            psmIdsSet: new Set()
                        });
                        dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId.set(subGroupId, dataPerReportedPeptideId);
                    }

                    dataPerReportedPeptideId.psmIdsSet.add(psmId);
                }

            } else {

                //  NO Specific PSM IDs to add so add based on reportedPeptideId and searchSubGroup_Ids_Selected
                if ( ! numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder ) {

                    const msg = "createProteinDisplayData_SingleSearch_SearchSubGroup(...) ( ! numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder ). projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                if ( ! psmCount_after_Include_Map_Key_SearchSubGroupId ) {
                    const msg = "( searchSubGroup_Ids_Selected ) AND ( ! psmCount_after_Include_Map_Key_SearchSubGroupId )"
                    console.warn( msg )
                    throw Error( msg )
                }

                const numPsmsFor_SearchSubGroupId = numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get_numPsmsFor_SearchSubGroupId__For_ReportedPeptideId(reportedPeptideId)
                if ( numPsmsFor_SearchSubGroupId ) {

                    for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {

                        const numPsms = numPsmsFor_SearchSubGroupId.get(searchSubGroup_Id);
                        if (numPsms !== undefined && numPsms !== 0) {

                            const psmCount_NO_PsmId_Filtering_For_SearchSubGroupId = psmCount_after_Include_Map_Key_SearchSubGroupId.get(searchSubGroup_Id)
                            if (psmCount_NO_PsmId_Filtering_For_SearchSubGroupId !== undefined) {

                                let dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId = peptideItem.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.get(reportedPeptideId);
                                if ( ! dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId ) {
                                    dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId = new Map();
                                    peptideItem.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.set(reportedPeptideId, dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId);
                                }
                                let dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId.get(searchSubGroup_Id);
                                if ( ! dataPerReportedPeptideId ) {
                                    dataPerReportedPeptideId = new ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry({
                                        reportedPeptideId,
                                        no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId,
                                        psmIdsSet: undefined
                                    });
                                    dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_For_reportedPeptideId.set(searchSubGroup_Id, dataPerReportedPeptideId);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

////////////////////////////////////

/**
 * Get Variable Modifications (rounded) Strings: By Reported Peptide Id and Position _ For Single Project Search Id
 *
 * @returns  Map<(reported peptide), Map<(position),Array<(mod mass rounded numbers)>>
 */
const _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId = function(
    {
        get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    } : {
        get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId

    }) :  Map<number, Map<number, Array<number>>>
{
    const modsRoundedArray_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Array<number>>> = new Map();

    for ( const reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() ) {

        _process_VariableModifications_ForSingleReportedPeptideId({ reportedPeptideId,  get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult, modsRoundedArray_KeyPosition_KeyReportedPeptideId });
    }

    return modsRoundedArray_KeyPosition_KeyReportedPeptideId;
}

/**
 *
 */
const _process_VariableModifications_ForSingleReportedPeptideId = function (
    {
        reportedPeptideId,
        get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult,
        modsRoundedArray_KeyPosition_KeyReportedPeptideId
    } : {
        reportedPeptideId : number
        get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult
        modsRoundedArray_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Array<number>>>
    }
) : void {

    let modsRoundedArray_KeyPosition = modsRoundedArray_KeyPosition_KeyReportedPeptideId.get(reportedPeptideId);
    if (!modsRoundedArray_KeyPosition) {
        modsRoundedArray_KeyPosition = new Map();
        modsRoundedArray_KeyPosition_KeyReportedPeptideId.set(reportedPeptideId, modsRoundedArray_KeyPosition);
    }

    const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

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

                positionOnReportedPeptide = reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX;

            } else if ( is_C_Terminal ) {

                positionOnReportedPeptide = reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX;
            }

            let modsRoundedArray = modsRoundedArray_KeyPosition.get(positionOnReportedPeptide);
            if (!modsRoundedArray) {
                modsRoundedArray = new Array();
                modsRoundedArray_KeyPosition.set(positionOnReportedPeptide, modsRoundedArray);
            }

            const massRounded = modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
            modsRoundedArray.push(massRounded);
        }
    }
}