/**
 * qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch.ts
 *
 * For Single Project Search  -  Gold Standard
 *
 * Get Data and then Compute Precision and Recall for a Single Project Search Id
 *
 * Used in Single Search and Multiple Searches
 *
 * Does NOT break out for Sub Searches
 */


import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Entry,
    CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Entry,
    CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries_Holder,
    CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries";
import {
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_PsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import { CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {
    QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections,
    QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component";
import { ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry } from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import { CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters";
import { QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component";





class Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_And_Positions {

    mass: number
    positionArray: Array<Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_Single_PositionEntry>

}



class Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_Single_PositionEntry {

    position: number
    position_Is_n: boolean
    position_Is_c: boolean
}






export class Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result {

    no_PSM_Data_For_ScanFile_AND_ScanNumbers_In_GoldStandard: boolean = false

    scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber: Map<number, { PSMs_AllThatAreCorrect_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> }> = new Map()

    scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber: Map<number, { PSMs_AllForScanNumber_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> }> = new Map()

    scanNumbers_InGoldStandard_Set: Set<number> = new Set()

}



/**
 *
 * @param goldStandard_Root_Selection
 * @param userOptions_Component_OptionsSelections
 * @param projectSearchId
 * @param peptideDistinct_Array
 * @param qcViewPage_CommonData_To_AllComponents_From_MainComponent
 */
export const qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch = function (
    {
        goldStandard_Root_Selection,
        userOptions_Component_OptionsSelections,
        projectSearchId,
        peptideDistinct_Array,
        qcViewPage_CommonData_To_AllComponents_From_MainComponent
    } : {
        goldStandard_Root_Selection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
        userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections
        peptideDistinct_Array: Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry>
        projectSearchId: number
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
) : {
    data: Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result
    promise: Promise<Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result>
} {
    const gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id =
        goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id;

    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
        qcViewPage_CommonData_To_AllComponents_From_MainComponent.
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
        get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

    if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
        throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + projectSearchId )
    }

    const promises: Array<Promise<void>> = [] // Always has at least 1 entry from first promise

    let goldStandard_FileContents_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries_Holder
    let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
    let variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
    let openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder

    let peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
    let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

    let variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder

    const common_Flags_SingleSearch_ForProjectSearchId = qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId )
    if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
        const msg = "qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
        console.warn(msg)
        throw Error(msg)
    }

    if ( common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_DynamicModifications ) {

        const get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters().
            get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch()

        if ( get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.data ) {

            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder = get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder

        } else if ( get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.promise ) {

            const promise = new Promise<void>((resolve, reject) =>  { try {

                get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.promise.then(value_get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result => { try {

                    variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder = value_get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)

        } else {
            const msg = "get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result no data or promise"
            console.warn(msg)
            throw Error(msg)
        }
    }

    { //  goldStandard_FileContents_Entries_Holder

        const get_GoldStandard_FileContents_EntriesHolder_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries().
            get_GoldStandard_FileContents_EntriesHolder({ gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id })

        if ( get_GoldStandard_FileContents_EntriesHolder_Result.data ) {

            goldStandard_FileContents_Entries_Holder = get_GoldStandard_FileContents_EntriesHolder_Result.data.goldStandard_FileContents_Entries_Holder

        } else if ( get_GoldStandard_FileContents_EntriesHolder_Result.promise ) {

            const promise = new Promise<void>((resolve, reject) =>  { try {

                get_GoldStandard_FileContents_EntriesHolder_Result.promise.catch(reason => { reject(reason)})
                get_GoldStandard_FileContents_EntriesHolder_Result.promise.then(value_get_GoldStandard_FileContents_EntriesHolder_Result => { try {

                    goldStandard_FileContents_Entries_Holder = value_get_GoldStandard_FileContents_EntriesHolder_Result.goldStandard_FileContents_Entries_Holder

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)

        } else {
            const msg = "get_GoldStandard_FileContents_EntriesHolder_Result no data or promise"
            console.warn(msg)
            throw Error(msg)
        }
    }
    { // psmTblData_For_ReportedPeptideId_For_MainFilters_Holder

        const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
            get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

        if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder

        } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {

            const promise = new Promise<void>((resolve, reject) =>  { try {

                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_GoldStandard_FileContents_EntriesHolder_Result => { try {

                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value_get_GoldStandard_FileContents_EntriesHolder_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)

        } else {
            const msg = "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no data or promise"
            console.warn(msg)
            throw Error(msg)
        }
    }
    { //  variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

        const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
            get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()


        if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {

            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

        } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {

            const promise = new Promise<void>((resolve, reject) =>  { try {

                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then(value_get_GoldStandard_FileContents_EntriesHolder_Result => { try {

                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = value_get_GoldStandard_FileContents_EntriesHolder_Result.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)

        } else {
            const msg = "get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result no data or promise"
            console.warn(msg)
            throw Error(msg)
        }
    }
    { //  variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

        const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().get_OpenModifications_On_PSMHolder_AllForSearch()


        if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data ) {

            openModifications_On_PSM_For_MainFilters_Holder = get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder

        } else if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise ) {

            const promise = new Promise<void>((resolve, reject) =>  { try {

                get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then(value_get_GoldStandard_FileContents_EntriesHolder_Result => { try {

                    openModifications_On_PSM_For_MainFilters_Holder = value_get_GoldStandard_FileContents_EntriesHolder_Result.openModifications_On_PSM_For_MainFilters_Holder

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)

        } else {
            const msg = "get_OpenModifications_On_PSMHolder_AllForSearch_Result no data or promise"
            console.warn(msg)
            throw Error(msg)
        }
    }
    { //  peptideIds_For_MainFilters_Holder

        const get_PeptideIdsHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch()


        if ( get_PeptideIdsHolder_AllForSearch_Result.data ) {

            peptideIds_For_MainFilters_Holder = get_PeptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder

        } else if ( get_PeptideIdsHolder_AllForSearch_Result.promise ) {

            const promise = new Promise<void>((resolve, reject) =>  { try {

                get_PeptideIdsHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                get_PeptideIdsHolder_AllForSearch_Result.promise.then(value_get_GoldStandard_FileContents_EntriesHolder_Result => { try {

                    peptideIds_For_MainFilters_Holder = value_get_GoldStandard_FileContents_EntriesHolder_Result.peptideIds_For_MainFilters_Holder

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)

        } else {
            const msg = "get_PeptideIdsHolder_AllForSearch_Result no data or promise"
            console.warn(msg)
            throw Error(msg)
        }
    }
    { //  peptideSequences_For_MainFilters_Holder

        const get_PeptideSequencesHolder_AllForAllSearches_Result =
            qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer__CommonAcrossSearches().get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().get_PeptideSequencesHolder_AllForAllSearches()

        if ( get_PeptideSequencesHolder_AllForAllSearches_Result.data ) {

            peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_Result.data.peptideSequences_For_MainFilters_Holder

        } else if ( get_PeptideSequencesHolder_AllForAllSearches_Result.promise ) {

            const promise = new Promise<void>((resolve, reject) =>  { try {

                get_PeptideSequencesHolder_AllForAllSearches_Result.promise.catch(reason => { reject(reason)})
                get_PeptideSequencesHolder_AllForAllSearches_Result.promise.then(value_get_GoldStandard_FileContents_EntriesHolder_Result => { try {

                    peptideSequences_For_MainFilters_Holder = value_get_GoldStandard_FileContents_EntriesHolder_Result.peptideSequences_For_MainFilters_Holder

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)

        } else {
            const msg = "get_PeptideSequencesHolder_AllForAllSearches_Result no data or promise"
            console.warn(msg)
            throw Error(msg)
        }
    }

    if ( promises.length === 0 ) {

        const resultData = _call__After_GetGoldStandardData({
            userOptions_Component_OptionsSelections,
            goldStandard_Root_Selection,
            projectSearchId,
            peptideDistinct_Array,

            goldStandard_FileContents_Entries_Holder,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            openModifications_On_PSM_For_MainFilters_Holder,

            peptideIds_For_MainFilters_Holder,
            peptideSequences_For_MainFilters_Holder,
            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
        })

        return { // EARLY RETURN
            promise: undefined, data: resultData
        }
    }

    const promisesAll = Promise.all( promises );

    return {
        data: undefined, promise: new Promise<Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result>((resolve, reject) => { try {

            promisesAll.catch( reason => {
                try {
                    reject(reason)
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promisesAll.then( noValue => { try {

                const dataResult = _call__After_GetGoldStandardData({
                    userOptions_Component_OptionsSelections,
                    goldStandard_Root_Selection,
                    projectSearchId,
                    peptideDistinct_Array,

                    goldStandard_FileContents_Entries_Holder,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                    openModifications_On_PSM_For_MainFilters_Holder,

                    peptideIds_For_MainFilters_Holder,
                    peptideSequences_For_MainFilters_Holder,
                    variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
                })
                resolve(dataResult)

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }});
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }})
    }
}


/**
 * @returns null if no data
 */
const _call__After_GetGoldStandardData = function (
    {
        userOptions_Component_OptionsSelections,
        goldStandard_Root_Selection,
        projectSearchId,
        peptideDistinct_Array,

        goldStandard_FileContents_Entries_Holder,
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        openModifications_On_PSM_For_MainFilters_Holder,

        peptideIds_For_MainFilters_Holder,
        peptideSequences_For_MainFilters_Holder,

        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder

    } : {
        userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections
        goldStandard_Root_Selection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
        projectSearchId: number
        peptideDistinct_Array: Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry>

        goldStandard_FileContents_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries_Holder
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder

        peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
    }
) : Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result {

    const goldStandard_FileContents_Entry =
        goldStandard_FileContents_Entries_Holder.get_GoldStandard_FileContents_Entry_For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id( goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id )

    if ( ! goldStandard_FileContents_Entry ) {
        const msg = "_goldStandard_FileContents_Entries_Holder.get_GoldStandard_FileContents_Entry_For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id( goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) returned NOTHING for goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: " + goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
        console.warn(msg)
        throw Error(msg)
    }

    const scanNumbers_IN_goldStandard_File_Entries = new Set<number>()
    {
        for ( const goldStandard_File_Entry of goldStandard_FileContents_Entry.goldStandard_File_Entries ) {

            scanNumbers_IN_goldStandard_File_Entries.add( goldStandard_File_Entry.scanNumber )
        }
    }

    const psmTblData_Array_Filtered__Map_Key_ScanNumber: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>> = new Map()

    let psmTblData_Filtered__Array_ALL: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> = []

    {
        const psmTblData_Array_From_peptideDistinct_Entry: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> = []

        for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId );

            if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                // No data for this projectSearchId so skip
                continue // EARLY CONTINUE
            }

            for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                    const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( dataPerReportedPeptideId.reportedPeptideId )
                    if ( ! psmTblData_For_ReportedPeptideId ) {
                        const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( dataPerReportedPeptideId.reportedPeptideId ) returned NOTHING for dataPerReportedPeptideId.reportedPeptideId " +
                            dataPerReportedPeptideId.reportedPeptideId +
                            ", projectSearchId: " + projectSearchId;
                        console.warn(msg)
                        throw Error(msg)
                    }

                    for ( const psmTblData_Entry of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {
                        psmTblData_Array_From_peptideDistinct_Entry.push( psmTblData_Entry );
                    }

                } else if ( dataPerReportedPeptideId.psmIdsSet ) {

                    for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {
                        const psmTblData_Entry_ForPsmId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId);
                        if ( ! psmTblData_Entry_ForPsmId ) {
                            const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId); returned NOTHING for psmId: " + psmId +
                                ", dataPerReportedPeptideId.reportedPeptideId " +
                                dataPerReportedPeptideId.reportedPeptideId +
                                ", projectSearchId: " + projectSearchId;
                            console.warn(msg)
                            throw Error(msg)
                        }
                        psmTblData_Array_From_peptideDistinct_Entry.push( psmTblData_Entry_ForPsmId );
                    }

                } else {
                    const msg = "NEITHER SET: dataPerReportedPeptideId.psmIdsSet, dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId. dataPerReportedPeptideId.reportedPeptideId " +
                        dataPerReportedPeptideId.reportedPeptideId +
                        ", projectSearchId: " + projectSearchId;
                    console.warn(msg)
                    throw Error(msg)
                }
            }
        }

        //  Filter on psmTblData.searchScanFileId

        for ( const psmTblData of psmTblData_Array_From_peptideDistinct_Entry ) {

            if ( ! goldStandard_Root_Selection.searchScanFileIds_In_GoldStandardEntries.has( psmTblData.searchScanFileId ) ) {
                //  PSM NOT for selected searchScanFileIds in GoldStandardEntry so skip

                continue // EARLY CONTINUE
            }

            let psmTblData_Array_FilteredTo_ScanNumbers_ON_goldStandard_File_Entries = psmTblData_Array_Filtered__Map_Key_ScanNumber.get( psmTblData.scanNumber )
            if ( ! psmTblData_Array_FilteredTo_ScanNumbers_ON_goldStandard_File_Entries ) {
                psmTblData_Array_FilteredTo_ScanNumbers_ON_goldStandard_File_Entries = []
                psmTblData_Array_Filtered__Map_Key_ScanNumber.set( psmTblData.scanNumber, psmTblData_Array_FilteredTo_ScanNumbers_ON_goldStandard_File_Entries )
            }
            psmTblData_Array_FilteredTo_ScanNumbers_ON_goldStandard_File_Entries.push( psmTblData )

            psmTblData_Filtered__Array_ALL.push( psmTblData )
        }
    }

    {
        //  Filter PSMs to only ones that have scanNumber in Gold Standard

        const psmTblData_Filtered__Array_ALL__LOCAL: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> = []

        for ( const psmTblData of psmTblData_Filtered__Array_ALL ) {

            if ( scanNumbers_IN_goldStandard_File_Entries.has( psmTblData.scanNumber ) ) {

                let psmTblData_Array_FilteredTo_ScanNumbers_ON_goldStandard_File_Entries = psmTblData_Array_Filtered__Map_Key_ScanNumber.get( psmTblData.scanNumber )
                if ( ! psmTblData_Array_FilteredTo_ScanNumbers_ON_goldStandard_File_Entries ) {
                    psmTblData_Array_FilteredTo_ScanNumbers_ON_goldStandard_File_Entries = []
                    psmTblData_Array_Filtered__Map_Key_ScanNumber.set( psmTblData.scanNumber, psmTblData_Array_FilteredTo_ScanNumbers_ON_goldStandard_File_Entries )
                }
                psmTblData_Array_FilteredTo_ScanNumbers_ON_goldStandard_File_Entries.push( psmTblData )

                psmTblData_Filtered__Array_ALL__LOCAL.push( psmTblData )
            }
        }

        psmTblData_Filtered__Array_ALL = psmTblData_Filtered__Array_ALL__LOCAL  ///  Copy filtered over psmTblData_Possibly_Filtered__Array_ALL
    }

    if ( psmTblData_Filtered__Array_ALL.length === 0 ) {

        return {

            no_PSM_Data_For_ScanFile_AND_ScanNumbers_In_GoldStandard: true,

            scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber: undefined,
            scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber: undefined,
            scanNumbers_InGoldStandard_Set: undefined
        }
    }

    if (
        userOptions_Component_OptionsSelections.userOptions_Component_Selections ===  QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS__NOT__MATCH_POSITIONS
        || userOptions_Component_OptionsSelections.userOptions_Component_Selections ===  QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS_MATCH_POSITIONS
    ) {

        return _computeFor_Match_VariableModifications_OpenModifications__MAYBE_Match_Positions({
            userOptions_Component_OptionsSelections,
            goldStandard_FileContents_Entry,
            psmTblData_Array_Possibly_Filtered__Map_Key_ScanNumber: psmTblData_Array_Filtered__Map_Key_ScanNumber,
            psmTblData_Possibly_Filtered__Array_ALL: psmTblData_Filtered__Array_ALL,

            goldStandard_Root_Selection,
            projectSearchId,

            goldStandard_FileContents_Entries_Holder,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            openModifications_On_PSM_For_MainFilters_Holder,

            peptideIds_For_MainFilters_Holder,
            peptideSequences_For_MainFilters_Holder,
            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
        })
    }

    if ( userOptions_Component_OptionsSelections.userOptions_Component_Selections ===  QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_TOTAL_MODIFICATION_MASS ) {

        return _computeFor_Match_TotalModificationMass({
            userOptions_Component_OptionsSelections,
            goldStandard_FileContents_Entry,
            psmTblData_Array_Possibly_Filtered__Map_Key_ScanNumber: psmTblData_Array_Filtered__Map_Key_ScanNumber,
            psmTblData_Possibly_Filtered__Array_ALL: psmTblData_Filtered__Array_ALL,

            goldStandard_Root_Selection,
            projectSearchId,

            goldStandard_FileContents_Entries_Holder,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            openModifications_On_PSM_For_MainFilters_Holder,

            peptideIds_For_MainFilters_Holder,
            peptideSequences_For_MainFilters_Holder,
            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
        })
    }

    {
        const msg = "Unknown value for userOptions_Component_OptionsSelections.userOptions_Component_Selections: " + userOptions_Component_OptionsSelections.userOptions_Component_Selections;
        console.warn(msg)
        throw Error(msg)
    }
}

/**
 * _computeFor_Match_TotalModificationMass
 *
 *
 * @param userOptions_Component_OptionsSelections
 * @param goldStandard_FileContents_Entry
 * @param psmTblData_Array_Possibly_Filtered__Map_Key_ScanNumber
 * @param psmTblData_Possibly_Filtered__Array_ALL
 * @param goldStandard_Root_Selection
 * @param projectSearchId
 * @param goldStandard_FileContents_Entries_Holder
 * @param psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
 * @param variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
 * @param openModifications_On_PSM_For_MainFilters_Holder
 * @param peptideIds_For_MainFilters_Holder
 * @param peptideSequences_For_MainFilters_Holder
 * @private
 */
const _computeFor_Match_TotalModificationMass = function(
    {
        userOptions_Component_OptionsSelections,
        goldStandard_FileContents_Entry,
        psmTblData_Array_Possibly_Filtered__Map_Key_ScanNumber,
        psmTblData_Possibly_Filtered__Array_ALL,

        goldStandard_Root_Selection,
        projectSearchId,

        goldStandard_FileContents_Entries_Holder,
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        openModifications_On_PSM_For_MainFilters_Holder,

        peptideIds_For_MainFilters_Holder,
        peptideSequences_For_MainFilters_Holder,

        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
    } : {
        userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections

        goldStandard_FileContents_Entry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry
        psmTblData_Possibly_Filtered__Array_ALL: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>
        psmTblData_Array_Possibly_Filtered__Map_Key_ScanNumber: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>>

        goldStandard_Root_Selection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
        projectSearchId: number

        goldStandard_FileContents_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries_Holder
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder

        peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
    }
) : Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result {


    //   Method Result
    const qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result = new Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result()


    for ( const goldStandard_File_Entry of goldStandard_FileContents_Entry.goldStandard_File_Entries ) {

        qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_Set.add( goldStandard_File_Entry.scanNumber )

        const psmTblData_Array_For_ScanNumber = psmTblData_Array_Possibly_Filtered__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )

        if ( ! psmTblData_Array_For_ScanNumber ) {

            //  NO PSMs for scan number

            var z = 0;  // For debugging for break point

        } else {

            {
                let scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry = qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )
                if ( ! scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry ) {
                    scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry = { PSMs_AllForScanNumber_Map_Key_PsmId: new Map() }
                    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.set( goldStandard_File_Entry.scanNumber, scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry )
                }

                for ( const psmTblData of psmTblData_Array_For_ScanNumber ) {
                    scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry.PSMs_AllForScanNumber_Map_Key_PsmId.set( psmTblData.psmId, psmTblData )
                }
            }

            let goldStandard_File_Entry_Total_ModificationMass = 0;

            {
                if ( goldStandard_File_Entry.modification && goldStandard_File_Entry.modification.entries && goldStandard_File_Entry.modification.entries.length > 0 ) {
                    for ( const entry of goldStandard_File_Entry.modification.entries ) {
                        goldStandard_File_Entry_Total_ModificationMass += entry.modificationMass
                    }
                }
            }


            for ( const psmTblData of psmTblData_Array_For_ScanNumber ) {

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( psmTblData.reportedPeptideId )
                if ( ! peptideId ) {
                    const msg = "peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( psmTblData.reportedPeptideId ) returned NOTHING for psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                const peptideSequence = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
                if ( ! peptideSequence ) {
                    const msg = "peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId) returned NOTHING for peptideId: " + peptideId + ", psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( peptideSequence !== goldStandard_File_Entry.peptideSequence ) {

                    //  Peptide Sequence NOT match

                    var z = 0;  // For debugging for break point

                } else {

                    let psm_Total_ModificationMass = 0;

                    {
                        const variableModifications_Positions_FoundIn_PsmLevel: Set<number> = new Set()

                        let is_N_Terminal_FoundIn_PsmLevel = false
                        let is_C_Terminal_FoundIn_PsmLevel = false

                        if ( psmTblData.hasModifications ) {

                            if ( ! variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder ) {
                                const msg = "( psmTblData.hasModifications ) AND ( ! variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder )"
                                console.warn(msg)
                                throw Error(msg)
                            }

                            const modificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId = variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder.get_psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(psmTblData.reportedPeptideId)
                            if ( modificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId ) {
                                const modificationMass_ForPSM = modificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap.get( psmTblData.psmId );
                                if ( modificationMass_ForPSM ) {
                                    psm_Total_ModificationMass += modificationMass_ForPSM.modificationMass

                                    if ( modificationMass_ForPSM.isNTerminal ) {
                                        is_N_Terminal_FoundIn_PsmLevel = true

                                    } else if ( modificationMass_ForPSM.isCTerminal ) {
                                        is_C_Terminal_FoundIn_PsmLevel = true

                                    } else {
                                        variableModifications_Positions_FoundIn_PsmLevel.add( modificationMass_ForPSM.position )
                                    }
                                }
                            }
                        }

                        const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( psmTblData.reportedPeptideId )

                        if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId && variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId.length > 0 ) {

                            for ( const variableModification_For_ReportedPeptideId of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

                                if ( ( ! variableModifications_Positions_FoundIn_PsmLevel.has( variableModification_For_ReportedPeptideId.position ) )
                                    && ( ! ( is_N_Terminal_FoundIn_PsmLevel && variableModification_For_ReportedPeptideId.is_N_Terminal ) )
                                    && ( ! ( is_C_Terminal_FoundIn_PsmLevel && variableModification_For_ReportedPeptideId.is_C_Terminal ) ) ) {

                                    //  Only use this entry if NOT same position (# or N or C) already on PSM level Variable Mod entry

                                    psm_Total_ModificationMass += variableModification_For_ReportedPeptideId.mass
                                }
                            }
                        }
                    }

                    let openModifications_On_PSM_For_PsmId: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_PsmId = undefined

                    {
                        const psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( psmTblData.reportedPeptideId )
                        if ( psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId ) {
                            openModifications_On_PSM_For_PsmId = psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmTblData.psmId )
                        }
                    }

                    if ( openModifications_On_PSM_For_PsmId ) {

                        psm_Total_ModificationMass += openModifications_On_PSM_For_PsmId.openModificationMass
                    }

                    const massDifference = Math.abs( goldStandard_File_Entry_Total_ModificationMass - psm_Total_ModificationMass );

                    if ( massDifference <= userOptions_Component_OptionsSelections.modification_Mass__Max_Difference_For_Considered_Equal ) {


                        let scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry =
                            qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )
                        if ( ! scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry ) {
                            scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry = { PSMs_AllThatAreCorrect_Map_Key_PsmId: new Map() }
                            qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.set( goldStandard_File_Entry.scanNumber, scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry )
                        }

                        scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry.PSMs_AllThatAreCorrect_Map_Key_PsmId.set( psmTblData.psmId, psmTblData )
                    }
                }
            }

        }
    }

    return qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result;
}

/**
 * _computeFor_Match_VariableModifications_OpenModifications__MAYBE_Match_Positions
 *
 *
 * @param userOptions_Component_OptionsSelections
 * @param goldStandard_FileContents_Entry
 * @param psmTblData_Array_Possibly_Filtered__Map_Key_ScanNumber
 * @param psmTblData_Possibly_Filtered__Array_ALL
 * @param goldStandard_Root_Selection
 * @param projectSearchId
 * @param goldStandard_FileContents_Entries_Holder
 * @param psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
 * @param variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
 * @param openModifications_On_PSM_For_MainFilters_Holder
 * @param peptideIds_For_MainFilters_Holder
 * @param peptideSequences_For_MainFilters_Holder
 * @private
 */
const _computeFor_Match_VariableModifications_OpenModifications__MAYBE_Match_Positions = function(
    {
        userOptions_Component_OptionsSelections,
        goldStandard_FileContents_Entry,
        psmTblData_Array_Possibly_Filtered__Map_Key_ScanNumber,
        psmTblData_Possibly_Filtered__Array_ALL,

        goldStandard_Root_Selection,
        projectSearchId,

        goldStandard_FileContents_Entries_Holder,
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        openModifications_On_PSM_For_MainFilters_Holder,

        peptideIds_For_MainFilters_Holder,
        peptideSequences_For_MainFilters_Holder,

        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
    } : {
        userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections

        goldStandard_FileContents_Entry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry
        psmTblData_Possibly_Filtered__Array_ALL: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>
        psmTblData_Array_Possibly_Filtered__Map_Key_ScanNumber: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>>

        goldStandard_Root_Selection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
        projectSearchId: number

        goldStandard_FileContents_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries_Holder
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder

        peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
    }
) : Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result {



    //   Method Result
    const qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result = new Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result()


    for ( const goldStandard_File_Entry of goldStandard_FileContents_Entry.goldStandard_File_Entries ) {

        if ( goldStandard_File_Entry.scanNumber === 70714 ) {
            var z = 0
        }

        qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_Set.add( goldStandard_File_Entry.scanNumber )

        const goldStandard_File_Entry__scanNumber = goldStandard_File_Entry.scanNumber
        const goldStandard_File_Entry__peptideSequence = goldStandard_File_Entry.peptideSequence

        const psmTblData_Array_For_ScanNumber = psmTblData_Array_Possibly_Filtered__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )

        if ( ! psmTblData_Array_For_ScanNumber ) {

            //  NO PSMs for scan number

            var z = 0;  // For debugging for break point

        } else {

            {  //  Add PSMs to 'At Least One' (NO Need to be Correct scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber

                let scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map = qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )
                if ( ! scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map ) {
                    scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map = { PSMs_AllForScanNumber_Map_Key_PsmId: new Map() }
                    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.set( goldStandard_File_Entry.scanNumber, scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map )
                }

                for ( const psmTblData of psmTblData_Array_For_ScanNumber ) {
                    scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map.PSMs_AllForScanNumber_Map_Key_PsmId.set( psmTblData.psmId, psmTblData )
                }
            }

            for ( const psmTblData of psmTblData_Array_For_ScanNumber ) {

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( psmTblData.reportedPeptideId )
                if ( ! peptideId ) {
                    const msg = "peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( psmTblData.reportedPeptideId ) returned NOTHING for psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                const peptideSequence = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
                if ( ! peptideSequence ) {
                    const msg = "peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId) returned NOTHING for peptideId: " + peptideId + ", psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( peptideSequence !== goldStandard_File_Entry.peptideSequence ) {

                    //  Peptide Sequence NOT match - NO Match

                    var z = 0;

                } else {

                    const singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array = _create__singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array({
                        psmTblData,
                        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
                        openModifications_On_PSM_For_MainFilters_Holder
                    })

                    //  Compare GoldStandard Entry To 'singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array'

                    if ( ( ! goldStandard_File_Entry.modification  ) || ( ! goldStandard_File_Entry.modification.entries ) || ( goldStandard_File_Entry.modification.entries.length === 0 ) ) {

                        //  NO Modifications on Gold Standard Entry

                        if ( singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array.length === 0 ) {

                            //  NO Modifications on PSM.  YES Match

                            {  //  Add PSMs to 'At Least 1 CORRECT' scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber

                                let scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry = qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )
                                if ( ! scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry ) {
                                    scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry = { PSMs_AllThatAreCorrect_Map_Key_PsmId: new Map() }
                                    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.set( goldStandard_File_Entry.scanNumber, scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry )
                                }

                                scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry.PSMs_AllThatAreCorrect_Map_Key_PsmId.set( psmTblData.psmId, psmTblData )
                            }

                        } else {

                            //  YES Modifications on PSM.  NO Match

                            var z = 0;
                        }
                    } else {
                        //  YES Modifications on Gold Standard Entry

                        if (  _validate_All_PSM_Modifications_IN_GoldStandard_Modifications({
                            userOptions_Component_OptionsSelections,
                            goldStandard_File_Entry,
                            singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array
                        }) ) {

                            //  Modifications on Gold Standard Entry and PSM Match

                            {  //  Add PSMs to 'At Least 1 CORRECT' scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber

                                let scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry = qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )
                                if ( ! scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry ) {
                                    scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry = { PSMs_AllThatAreCorrect_Map_Key_PsmId: new Map() }
                                    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.set( goldStandard_File_Entry.scanNumber, scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry )
                                }

                                scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry.PSMs_AllThatAreCorrect_Map_Key_PsmId.set( psmTblData.psmId, psmTblData )
                            }

                        } else {
                            //  NO Match - Modifications on Gold Standard Entry and PSM
                            var z = 0;
                        }
                    }
                }
            }
        }
    }

    return qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result;
}

/////////////////

const _validate_All_PSM_Modifications_IN_GoldStandard_Modifications = function(
    {
        userOptions_Component_OptionsSelections,
        goldStandard_File_Entry,
        singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array //  IMPORTANT:  ONLY use to make the clone.  DO NOT Alter this Array!!
    } : {
        userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections
        goldStandard_File_Entry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Entry
        singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array: Array<Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_And_Positions>
    }
) : boolean {

    //  Assume can only use a PSM Modification entry once to match a Gold Standard Modification Entry

    //  Clone since remove each element that is found to match Gold Standard Modifications
    let singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array__CloneForSearching_GoldStandardEntry_Modifications = Array.from( singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array )


    for ( const goldStandard_File_Entry__ModificationEntry of goldStandard_File_Entry.modification.entries ) {

        let foundMatch_For__GoldStandard_File_Entry__ModificationEntry = false

        const length__singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array__CloneForSearching_GoldStandardEntry_Modifications = singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array__CloneForSearching_GoldStandardEntry_Modifications.length

        if ( length__singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array__CloneForSearching_GoldStandardEntry_Modifications > 1 ) {
            var z = 0;
        }

        for ( let singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions__Index = 0; singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions__Index < length__singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array__CloneForSearching_GoldStandardEntry_Modifications; singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions__Index++ ) {

            const singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions = singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array__CloneForSearching_GoldStandardEntry_Modifications[ singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions__Index ]

            const foundMatch__singlePSM_ModsAndPositions__For__GoldStandard_File_Entry__ModificationEntry = _match__goldStandard_File_Entry__ModificationEntry__singlePSM__PSM_Variable_AND_Open_Modifications_And_MAYBE_Positions({
                userOptions_Component_OptionsSelections,
                goldStandard_File_Entry__ModificationEntry,
                singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions
            })

            if ( foundMatch__singlePSM_ModsAndPositions__For__GoldStandard_File_Entry__ModificationEntry ) {

                foundMatch_For__GoldStandard_File_Entry__ModificationEntry = true;

                //  Remove this entry in singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array__CloneForSearching_GoldStandardEntry_Modifications

                //     Remove since do not want same PSM mod entry used for more than one Gold Standard mod entry

                singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array__CloneForSearching_GoldStandardEntry_Modifications.splice( singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions__Index, 1 )

                break
            }
        }

        if ( ! foundMatch_For__GoldStandard_File_Entry__ModificationEntry ) {

            //  This Gold Standard Mod Entry NOT found in PSM mod entries

            return false // EARLY RETURN
        }
    }

    if ( singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array__CloneForSearching_GoldStandardEntry_Modifications.length > 0 ) {

        //  These PSM Mod entries NOT ALL Found in  Gold Standard Mod Entries

        return false // EARLY RETURN
    }

    return true
}

//////////

/**
 *
 * @param goldStandard_File_Entry__ModificationEntry
 * @param singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions
 * @private
 */
const _match__goldStandard_File_Entry__ModificationEntry__singlePSM__PSM_Variable_AND_Open_Modifications_And_MAYBE_Positions = function (
    {
        userOptions_Component_OptionsSelections,
        goldStandard_File_Entry__ModificationEntry,
        singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions
    } : {
        userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections
        goldStandard_File_Entry__ModificationEntry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Entry
        singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions: Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_And_Positions
    }
) : boolean {

    const massDifference = Math.abs( goldStandard_File_Entry__ModificationEntry.modificationMass - singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions.mass );

    if ( massDifference > userOptions_Component_OptionsSelections.modification_Mass__Max_Difference_For_Considered_Equal ) {
        //  Mass not match within tolerance

        return false // EARLY RETURN
    }

    if ( userOptions_Component_OptionsSelections.userOptions_Component_Selections === QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS__NOT__MATCH_POSITIONS ) {

        //  NOT matching positions so return true

        return true; // EARLY RETURN
    }

    if ( ( !goldStandard_File_Entry__ModificationEntry.positionList ) || ( !goldStandard_File_Entry__ModificationEntry.positionList ) || ( goldStandard_File_Entry__ModificationEntry.positionList.length === 0 ) ) {
        //  NO positions on Gold Standard Entry, Modification Entry

        //  All positions accepted so MATCH
        return true // EARLY RETURN

    } else {
        if ( ( !singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions.positionArray ) || ( singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions.positionArray.length === 0 ) ) {
            //  NO positions on PSM Entry, Modification Entry
            //  NO Match

            return false // EARLY RETURN

        } else {

            return _match__goldStandard_File_Entry__ModificationEntry__singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions__MatchPositions({
                goldStandard_File_Entry__ModificationEntry,
                singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions
            })
        }
    }
}


//////////
/**
 *
 * @param goldStandard_File_Entry__ModificationEntry
 * @param singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions
 * @private
 */
const _match__goldStandard_File_Entry__ModificationEntry__singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions__MatchPositions = function (
    {
        goldStandard_File_Entry__ModificationEntry,
        singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions
    } : {
        goldStandard_File_Entry__ModificationEntry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Entry
        singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions: Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_And_Positions
    }
) : boolean {

    //  Each position on the PSM Mod entry MUST be in the Gold Standard Entry Mod Entry

    for ( const psmModPosition of singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions.positionArray ) {

        let found__GoldStandardEntry_ModEntry_PositionEntry__For__PSM_Entry_ModEntry_PositionEntry = false

        for ( const goldStandardPosition of goldStandard_File_Entry__ModificationEntry.positionList ) {

            if ( goldStandardPosition.position_Range_Start !== undefined && goldStandardPosition.position_Range_Start !== null
                && goldStandardPosition.position_Range_End !== undefined && goldStandardPosition.position_Range_End !== null ) {

                if ( psmModPosition.position_Is_n || psmModPosition.position_Is_c ) {
                    //  Range does NOT apply to N or C term position
                    //  NO Match
                    continue // EARLY CONTINUE

                } else {
                    if ( psmModPosition.position >= goldStandardPosition.position_Range_Start
                        && psmModPosition.position <= goldStandardPosition.position_Range_End ) {

                        found__GoldStandardEntry_ModEntry_PositionEntry__For__PSM_Entry_ModEntry_PositionEntry = true

                    } else {
                        //  NOT in Range
                        //  NO Match
                        continue // EARLY CONTINUE
                    }
                }

            } else {
                if ( goldStandardPosition.position === undefined || goldStandardPosition.position === null ) {
                    const msg = "goldStandardPosition.position is undefined or null when goldStandardPosition.position_Range_Start OR goldStandardPosition.position_Range_End is undefined or null"
                    console.warn( msg )
                    throw Error( msg )
                }

                if ( psmModPosition.position_Is_n && goldStandardPosition.position_Is_n
                    || psmModPosition.position_Is_c && goldStandardPosition.position_Is_c ) {

                    found__GoldStandardEntry_ModEntry_PositionEntry__For__PSM_Entry_ModEntry_PositionEntry = true

                } else if ( ( psmModPosition.position_Is_n ) && ( !goldStandardPosition.position_Is_n )
                    || ( !psmModPosition.position_Is_n ) && ( goldStandardPosition.position_Is_n ) ) {
                    //  NOT position match
                    //  NO Match
                    continue // EARLY CONTINUE

                } else if ( psmModPosition.position_Is_c && ( !goldStandardPosition.position_Is_c )
                    || ( !psmModPosition.position_Is_c ) && ( goldStandardPosition.position_Is_c ) ) {
                    //  NOT position match
                    //  NO Match
                    continue // EARLY CONTINUE

                } else if ( psmModPosition.position === goldStandardPosition.position ) {

                    found__GoldStandardEntry_ModEntry_PositionEntry__For__PSM_Entry_ModEntry_PositionEntry = true

                } else {
                    //  NOT position match
                    //  NO Match
                    continue // EARLY CONTINUE
                }
            }
        }

        if ( ! found__GoldStandardEntry_ModEntry_PositionEntry__For__PSM_Entry_ModEntry_PositionEntry ) {

            //  NOT All PSM Mod Entry Position Entries ARE FOUND in the Gold Standard Entry Mod Entry Position Entries

            return false
        }
    }

    //   All PSM Mod Entry Position Entries ARE FOUND in the Gold Standard Entry Mod Entry Position Entries

    return true
}

/////////////////

/**
 *
 * @param psmTblData
 * @param variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
 * @param variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
 * @param openModifications_On_PSM_For_MainFilters_Holder
 * @private
 */
const _create__singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array = function(
    {
        psmTblData,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
        openModifications_On_PSM_For_MainFilters_Holder
    } : {
        psmTblData: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
        openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
    }
) : Array<Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_And_Positions> {

    const singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array: Array<Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_And_Positions> = []

    {
        //  Process PSM and its Reported Peptide Variable Mods to add to 'singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array'

        const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( psmTblData.reportedPeptideId )

        if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId && variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId.length > 0 ) {

            {
                //  First combine Variable Modifications between from PSM and Reported Peptide, Keeping the PSM one if available, else keeping the one from Reported Peptide
                const variableModification_From_Psm_Or_ReportedPeptide_Array: Array<{ reportedPeptideId: number, position: number, mass: number, is_N_Terminal: boolean, is_C_Terminal: boolean }> = []

                {
                    if ( psmTblData.hasModifications ) {

                        if ( !variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder ) {
                            const msg = "( psmTblData.hasModifications ) AND ( ! variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder )"
                            console.warn( msg )
                            throw Error( msg )
                        }

                        const modificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId = variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder.get_psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( psmTblData.reportedPeptideId )
                        if ( modificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId ) {
                            const modificationMass_ForPSM = modificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap.get( psmTblData.psmId );
                            if ( modificationMass_ForPSM ) {

                                //  Make ONLY true/false for simpler comparison below.  Unsure if value could be undefined or null
                                let is_N_Terminal_variableModification = false;
                                let is_C_Terminal_variableModification = false;
                                if ( modificationMass_ForPSM.isNTerminal ) {
                                    is_N_Terminal_variableModification = true
                                }
                                if ( modificationMass_ForPSM.isCTerminal ) {
                                    is_C_Terminal_variableModification = true
                                }

                                variableModification_From_Psm_Or_ReportedPeptide_Array.push( {
                                    reportedPeptideId: psmTblData.reportedPeptideId,
                                    mass: modificationMass_ForPSM.modificationMass,
                                    position: modificationMass_ForPSM.position,
                                    is_N_Terminal: is_N_Terminal_variableModification ? true : false,
                                    is_C_Terminal: is_C_Terminal_variableModification ? true : false
                                } )
                            }
                        }
                    }

                    for ( const variableModification_For_ReportedPeptideId of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

                        // const variableModification_For_ReportedPeptideId: {reportedPeptideId: number, position: number, mass: number, is_N_Terminal: boolean, is_C_Terminal: boolean}


                        //  Make ONLY true/false for simpler comparison below.  Unsure if value could be undefined or null

                        let is_N_Terminal_variableModification_For_ReportedPeptideId = false;
                        let is_C_Terminal_variableModification_For_ReportedPeptideId = false;
                        if ( variableModification_For_ReportedPeptideId.is_N_Terminal ) {
                            is_N_Terminal_variableModification_For_ReportedPeptideId = true
                        }
                        if ( variableModification_For_ReportedPeptideId.is_C_Terminal ) {
                            is_C_Terminal_variableModification_For_ReportedPeptideId = true
                        }

                        if ( !variableModification_From_Psm_Or_ReportedPeptide_Array.find( value => {

                            if ( value.position === variableModification_For_ReportedPeptideId.position
                                && value.is_N_Terminal === is_N_Terminal_variableModification_For_ReportedPeptideId
                                && value.is_C_Terminal === is_C_Terminal_variableModification_For_ReportedPeptideId ) {
                                //  Matched element in the array
                                return true
                            }
                            //  Not match this element in the array
                            return false
                        } ) ) {
                            //  NOT in the array so add it
                            variableModification_From_Psm_Or_ReportedPeptide_Array.push( {
                                reportedPeptideId: psmTblData.reportedPeptideId,
                                mass: variableModification_For_ReportedPeptideId.mass,
                                position: variableModification_For_ReportedPeptideId.position,
                                is_N_Terminal: is_N_Terminal_variableModification_For_ReportedPeptideId ? true : false,
                                is_C_Terminal: is_C_Terminal_variableModification_For_ReportedPeptideId ? true : false
                            } )
                        }
                    }
                }

                //  Process the Array of modifications combined from PSM and Reported Peptide

                for ( const variableModification_From_Psm_Or_ReportedPeptide of variableModification_From_Psm_Or_ReportedPeptide_Array ) {

                    const position: Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_Single_PositionEntry = {

                        position: variableModification_From_Psm_Or_ReportedPeptide.position,
                        position_Is_n: variableModification_From_Psm_Or_ReportedPeptide.is_N_Terminal ? true : false,
                        position_Is_c: variableModification_From_Psm_Or_ReportedPeptide.is_C_Terminal ? true : false
                    }

                    const outputEntry: Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_And_Positions = {
                        mass: variableModification_From_Psm_Or_ReportedPeptide.mass,
                        positionArray: [ position ]
                    }

                    //  Add to Combined Array

                    singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array.push( outputEntry )
                }
            }
        }
    }

    // const singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array: Array<Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_And_Positions> = []

    {
        //  Process PSM Open Mods to add to 'singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array'

        let openModifications_On_PSM_For_PsmId: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_PsmId = undefined

        {
            const psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( psmTblData.reportedPeptideId )
            if ( psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId ) {
                openModifications_On_PSM_For_PsmId = psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmTblData.psmId )
            }
        }

        if ( openModifications_On_PSM_For_PsmId ) {

            const positionArray: Array<Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_Single_PositionEntry> = []


            if ( openModifications_On_PSM_For_PsmId.positionsMap_KeyPosition && openModifications_On_PSM_For_PsmId.positionsMap_KeyPosition.size > 0 ) {

                for ( const positionMapEntry_OnPSM of openModifications_On_PSM_For_PsmId.positionsMap_KeyPosition.values() ) {

                    for ( const positionEntry_OnPSM of positionMapEntry_OnPSM ) {

                        const position: Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_Single_PositionEntry = {

                            position: positionEntry_OnPSM.position,
                            position_Is_n: positionEntry_OnPSM.isNTerminal,
                            position_Is_c: positionEntry_OnPSM.isCTerminal
                        }

                        positionArray.push( position )
                    }
                }
            }


            const outputEntry: Internal_PSM__SinglePSM__PSM_Variable_AND_Open_Modifications_And_Positions = {
                mass: openModifications_On_PSM_For_PsmId.openModificationMass,
                positionArray: positionArray
            }

            //  Add to Combined Array

            singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array.push( outputEntry )
        }
    }

    return singlePSM__PSM_Variable_AND_Open_Modifications_And_Positions_Array;
}