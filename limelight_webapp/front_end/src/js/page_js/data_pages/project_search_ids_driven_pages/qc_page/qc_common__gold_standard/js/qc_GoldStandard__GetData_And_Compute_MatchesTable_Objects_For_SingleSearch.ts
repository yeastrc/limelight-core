/**
 * qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch.ts
 * 
 * For Single Project Search  -  Gold Standard
 *
 * Get Data and then Compute Objects for the "Matches" <table> for a Single Project Search Id
 *
 * Used in Single Search
 *
 * Does NOT break out for Sub Searches
 */


import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries_Holder
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
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component";
import { ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry } from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import { CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters";
import { QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component";
import { Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/js/qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch";
import {
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches,
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX,
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX
} from "page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches";
import { limelight__Sort_ArrayOfNumbers_SortArrayInPlace } from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";


/**
 *
 */
export class Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result {

    table_DataRows_Map_Key_ScanNumber: Map<number, Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow>
    gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: number

}

/**
 *
 */
export class Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow {

    scan_Number: number
    gold_Standard_Match_At_least_1_PSM: boolean

    peptide_Plain_sequence_From_GoldStandard: string
    modifications_From_GoldStandard_Array: Array<string>

    all_PSM_IDs_for_Scan_Number__Set: Set<number>
    pSM_IDs_for_Scan_Number_That_Match_Gold_Standard__Set: Set<number>

    peptides_For_All_PSM_IDs_for_Scan_Number__Map_Key_PSM_Id: Map<number, Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Single_Peptide_For_PSM_Id>
}

/**
 *
 */
export class Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Single_Peptide_For_PSM_Id {

    peptide_Generated_Array: Array<string>
    psmId: number
}

/**
 *
 * @param qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result
 * @param goldStandard_Root_Selection
 * @param userOptions_Component_OptionsSelections
 * @param projectSearchId
 * @param peptideDistinct_Array
 * @param qcViewPage_CommonData_To_AllComponents_From_MainComponent
 */
export const qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch = function (
    {
        qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result,
        goldStandard_Root_Selection,
        userOptions_Component_OptionsSelections,
        projectSearchId,
        peptideDistinct_Array,
        qcViewPage_CommonData_To_AllComponents_From_MainComponent
    } : {
        qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result
        goldStandard_Root_Selection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
        userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections
        peptideDistinct_Array: Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry>
        projectSearchId: number
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
) : {
    data: Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result
    promise: Promise<Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result>
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
            qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result,
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
        data: undefined, promise: new Promise<Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result>((resolve, reject) => { try {

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
                    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result,
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
        qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result,

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
        qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result

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
) : Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result {

    if ( qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.no_PSM_Data_For_ScanFile_AND_ScanNumbers_In_GoldStandard ) {
        const msg = "ERROR ( qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.no_PSM_Data_For_ScanFile_AND_ScanNumbers_In_GoldStandard )"
        console.warn(msg)
        throw Error(msg)
    }

    const goldStandard_FileContents_Entry =
        goldStandard_FileContents_Entries_Holder.get_GoldStandard_FileContents_Entry_For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id(
            goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
        )

    if ( ! goldStandard_FileContents_Entry ) {
        const msg = "_goldStandard_FileContents_Entries_Holder.get_GoldStandard_FileContents_Entry_For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id( goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) returned NOTHING for goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: " + goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
        console.warn(msg)
        throw Error(msg)
    }

    const results__Rows__Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow_Map_Key_ScanNumber: Map<number, Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow> = new Map()

    for ( const goldStandard_File_Entry of goldStandard_FileContents_Entry.goldStandard_File_Entries ) {

        const scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM_Entry =
            qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber );

        const scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber =
            qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber );

        const modifications_From_GoldStandard_Array: Array<string> = []

        if ( goldStandard_File_Entry.modification && goldStandard_File_Entry.modification.entries && goldStandard_File_Entry.modification.entries.length > 0  ) {

            for ( const goldStandard_File_Entry__modification of goldStandard_File_Entry.modification.entries ) {

                let modificationResult = goldStandard_File_Entry__modification.modificationMass.toString()

                if ( goldStandard_File_Entry__modification.positionList && goldStandard_File_Entry__modification.positionList.length > 0 ) {

                    modificationResult += "{"

                    let first_PositionEntry = true

                    for ( const positionEntry of goldStandard_File_Entry__modification.positionList ) {

                        if ( first_PositionEntry ) {
                            first_PositionEntry = false
                        } else {
                            modificationResult += ";" // delimiter between positions
                        }

                        if ( positionEntry.position_Range_Start !== undefined && positionEntry.position_Range_Start !== null
                            && positionEntry.position_Range_End !== undefined && positionEntry.position_Range_End !== null ) {

                            modificationResult += positionEntry.position_Range_Start + "-" + positionEntry.position_Range_End

                        } else {

                            if ( positionEntry.position_Is_n ) {

                                modificationResult += "n"

                            } else if ( positionEntry.position_Is_c ) {

                                modificationResult += "c"
                            } else {
                                modificationResult += positionEntry.position.toString()
                            }
                        }
                    }

                    modificationResult += "}"
                }

                modifications_From_GoldStandard_Array.push( modificationResult )
            }
        }

        let peptides_For_All_PSM_IDs_for_Scan_Number__Map_Key_PSM_Id: Map<number, Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Single_Peptide_For_PSM_Id> = undefined

        if ( scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber
            && scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.PSMs_AllForScanNumber_Map_Key_PsmId
            && scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.PSMs_AllForScanNumber_Map_Key_PsmId.size > 0 ) {

            peptides_For_All_PSM_IDs_for_Scan_Number__Map_Key_PSM_Id = new Map()

            for ( const PSMs_AllForScanNumber_Entry of scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.PSMs_AllForScanNumber_Map_Key_PsmId.values() ) {

                const psmTblData_Entry_ForPsmId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId( PSMs_AllForScanNumber_Entry.psmId );
                if ( ! psmTblData_Entry_ForPsmId ) {
                    const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(PSMs_AllForScanNumber_Entry.psmId); returned NOTHING for PSMs_AllForScanNumber_Entry.psmId: " + PSMs_AllForScanNumber_Entry.psmId +
                        ", projectSearchId: " + projectSearchId;
                    console.warn(msg)
                    throw Error(msg)
                }

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( PSMs_AllForScanNumber_Entry.reportedPeptideId )
                if ( ! peptideId ) {
                    const msg = "peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( PSMs_AllForScanNumber_Entry.reportedPeptideId ) returned NOTHING for PSMs_AllForScanNumber_Entry.reportedPeptideId: " + PSMs_AllForScanNumber_Entry.reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                const peptideSequenceString = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
                if ( ! peptideSequenceString ) {
                    const msg = "peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId) returned NOTHING for peptideId: " + peptideId + ", PSMs_AllForScanNumber_Entry.reportedPeptideId: " + PSMs_AllForScanNumber_Entry.reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                const variable_Modification_Number_Array_Map_KeyPosition : Map<number, Array<number>> = new Map();


                const variableModifications_Positions_FoundIn_PsmLevel: Set<number> = new Set()

                let is_N_Terminal_FoundIn_PsmLevel = false
                let is_C_Terminal_FoundIn_PsmLevel = false

                if ( psmTblData_Entry_ForPsmId.hasModifications ) {

                    if ( ! variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder ) {
                        const msg = "( psmTblData.hasModifications ) AND ( ! variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder )"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const modificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId = variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder.get_psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(psmTblData_Entry_ForPsmId.reportedPeptideId)
                    if ( modificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId ) {
                        const modificationMass_ForPSM = modificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap.get( psmTblData_Entry_ForPsmId.psmId );
                        if ( modificationMass_ForPSM ) {

                            let position = modificationMass_ForPSM.position;

                            if ( modificationMass_ForPSM.isNTerminal ) {

                                position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX
                                is_N_Terminal_FoundIn_PsmLevel = true

                            } else if ( modificationMass_ForPSM.isCTerminal ) {

                                position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX
                                is_C_Terminal_FoundIn_PsmLevel = true
                            } else {

                                variableModifications_Positions_FoundIn_PsmLevel.add( modificationMass_ForPSM.position )
                            }

                            let modification_Number_Array = variable_Modification_Number_Array_Map_KeyPosition.get( position )
                            if ( ! modification_Number_Array ) {
                                modification_Number_Array = []
                                variable_Modification_Number_Array_Map_KeyPosition.set( position, modification_Number_Array )
                            }

                            modification_Number_Array.push( modificationMass_ForPSM.modificationMass )
                        }
                    }
                }

                const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( psmTblData_Entry_ForPsmId.reportedPeptideId )

                if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId && variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId.length > 0 ) {

                    for ( const variableModification_For_ReportedPeptideId of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

                        if ( ( ! variableModifications_Positions_FoundIn_PsmLevel.has( variableModification_For_ReportedPeptideId.position ) )
                            && ( ! ( is_N_Terminal_FoundIn_PsmLevel && variableModification_For_ReportedPeptideId.is_N_Terminal ) )
                            && ( ! ( is_C_Terminal_FoundIn_PsmLevel && variableModification_For_ReportedPeptideId.is_C_Terminal ) ) ) {

                            //  Only use this entry if NOT same position (# or N or C) already on PSM level Variable Mod entry

                            let position = variableModification_For_ReportedPeptideId.position;

                            if ( variableModification_For_ReportedPeptideId.is_N_Terminal ) {

                                position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX

                            } else if ( variableModification_For_ReportedPeptideId.is_C_Terminal ) {

                                position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX
                            }

                            let modification_Number_Array = variable_Modification_Number_Array_Map_KeyPosition.get( position )
                            if ( ! modification_Number_Array ) {
                                modification_Number_Array = []
                                variable_Modification_Number_Array_Map_KeyPosition.set( position, modification_Number_Array )
                            }

                            modification_Number_Array.push( variableModification_For_ReportedPeptideId.mass )
                        }
                    }
                }


                const variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall : Map<number, Array<string>> = new Map();

                {

                    for (const variable_Modification_Number_Array_Map_KeyPosition_Entry of variable_Modification_Number_Array_Map_KeyPosition.entries()) {
                        const variable_Modification_Number_Array_Map_KeyPosition_Entry_Key = variable_Modification_Number_Array_Map_KeyPosition_Entry[0];
                        const variable_Modification_Number_Array_Map_KeyPosition_Entry_Value = variable_Modification_Number_Array_Map_KeyPosition_Entry[1];

                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( variable_Modification_Number_Array_Map_KeyPosition_Entry_Value )

                        const modsRoundedStringsArray : Array<string> = [];
                        for (const variable_Modification_Mass of variable_Modification_Number_Array_Map_KeyPosition_Entry_Value) {
                            const modRoundedString = variable_Modification_Mass.toString();
                            modsRoundedStringsArray.push(modRoundedString);
                        }
                        variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall.set(variable_Modification_Number_Array_Map_KeyPosition_Entry_Key, modsRoundedStringsArray);
                    }
                }


                //  Open Mod at Position is added to Variable Mods
                let open_Modification_Rounded_NoPosition : string = undefined;

                let openModifications_On_PSM_For_PsmId: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_PsmId = undefined

                {
                    const psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( psmTblData_Entry_ForPsmId.reportedPeptideId )
                    if ( psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId ) {
                        openModifications_On_PSM_For_PsmId = psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmTblData_Entry_ForPsmId.psmId )
                    }
                }

                if ( ! openModifications_On_PSM_For_PsmId ) {

                    //  NO open mod mass so SINGLE peptideSequenceDisplay

                    //   Call external function
                    const peptideSequenceDisplay = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches({
                        peptideSequence : peptideSequenceString,
                        variable_Modifications_RoundedArray_KeyPosition: variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall,
                        open_Modification_Rounded: undefined,				//  Open Mod at Position is added to Variable Mods
                        open_Modification_Rounded_Position: undefined,		//  Open Mod at Position is added to Variable Mods
                        open_Modification_Rounded_NoPosition,
                        staticModificationsRounded_KeyPosition : undefined
                    });

                    const result_Single_Peptide_For_PSM_Id: Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Single_Peptide_For_PSM_Id = {
                        peptide_Generated_Array: [ peptideSequenceDisplay ],
                        psmId: psmTblData_Entry_ForPsmId.psmId
                    }

                    peptides_For_All_PSM_IDs_for_Scan_Number__Map_Key_PSM_Id.set( psmTblData_Entry_ForPsmId.psmId, result_Single_Peptide_For_PSM_Id )

                } else {

                    //  YES open mod mass so POSSIBLY MULTIPLE peptideSequenceDisplay

                    const peptide_Generated_Array: Array<string> = []

                    if ( openModifications_On_PSM_For_PsmId.positionsMap_KeyPosition && openModifications_On_PSM_For_PsmId.positionsMap_KeyPosition.size > 0 ) {

                        //  Process Positions

                        for ( const positionMapEntry_OnPSM of openModifications_On_PSM_For_PsmId.positionsMap_KeyPosition.values() ) {

                            for ( const positionEntry_OnPSM of positionMapEntry_OnPSM ) {

                                let position = positionEntry_OnPSM.position;

                                if ( positionEntry_OnPSM.isNTerminal ) {

                                    position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX

                                } else if ( positionEntry_OnPSM.isCTerminal ) {

                                    position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX
                                }

                                //   Call external function
                                const peptideSequenceDisplay = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches( {
                                    peptideSequence: peptideSequenceString,
                                    variable_Modifications_RoundedArray_KeyPosition: variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall,
                                    open_Modification_Rounded: openModifications_On_PSM_For_PsmId.openModificationMass.toString(),				//  Open Mod at Position is added to Variable Mods
                                    open_Modification_Rounded_Position: position,		//  Open Mod at Position is added to Variable Mods
                                    open_Modification_Rounded_NoPosition,
                                    staticModificationsRounded_KeyPosition: undefined
                                } );

                                peptide_Generated_Array.push( peptideSequenceDisplay )
                            }
                        }

                    } else {

                        //  NO Position

                        //   Call external function
                        const peptideSequenceDisplay = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches( {
                            peptideSequence: peptideSequenceString,
                            variable_Modifications_RoundedArray_KeyPosition: variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall,
                            open_Modification_Rounded: undefined,				//  Open Mod at Position is added to Variable Mods
                            open_Modification_Rounded_Position: undefined,		//  Open Mod at Position is added to Variable Mods
                            open_Modification_Rounded_NoPosition: openModifications_On_PSM_For_PsmId.openModificationMass.toString(),
                            staticModificationsRounded_KeyPosition: undefined
                        } );

                        peptide_Generated_Array.push( peptideSequenceDisplay )
                    }

                    const result_Single_Peptide_For_PSM_Id: Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Single_Peptide_For_PSM_Id = {
                        peptide_Generated_Array,
                        psmId: psmTblData_Entry_ForPsmId.psmId
                    }

                    peptides_For_All_PSM_IDs_for_Scan_Number__Map_Key_PSM_Id.set( psmTblData_Entry_ForPsmId.psmId, result_Single_Peptide_For_PSM_Id )
                }
            }
        }

        const results__Rows__Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow_Entry: Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow = {

            scan_Number: goldStandard_File_Entry.scanNumber,
            gold_Standard_Match_At_least_1_PSM: qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.has( goldStandard_File_Entry.scanNumber ),

            peptide_Plain_sequence_From_GoldStandard: goldStandard_File_Entry.peptideSequence,
            modifications_From_GoldStandard_Array,

            all_PSM_IDs_for_Scan_Number__Set: scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM_Entry ? new Set( scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.PSMs_AllForScanNumber_Map_Key_PsmId.keys() ) : undefined,
            pSM_IDs_for_Scan_Number_That_Match_Gold_Standard__Set: scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM_Entry ? new Set( scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM_Entry.PSMs_AllThatAreCorrect_Map_Key_PsmId.keys() ) : undefined,

            peptides_For_All_PSM_IDs_for_Scan_Number__Map_Key_PSM_Id
        }

        if ( results__Rows__Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow_Map_Key_ScanNumber.has( goldStandard_File_Entry.scanNumber ) ) {
            const msg = "results__Rows__Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow_Map_Key_ScanNumber ALREADY HAS entry for goldStandard_File_Entry.scanNumber: " + goldStandard_File_Entry.scanNumber
            console.warn(msg)
            throw Error(msg)
        }

        results__Rows__Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow_Map_Key_ScanNumber.set( goldStandard_File_Entry.scanNumber, results__Rows__Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow_Entry )
    }


    const result: Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result = {

        gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id,
        table_DataRows_Map_Key_ScanNumber: results__Rows__Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_SingleRow_Map_Key_ScanNumber
    }

    return result
}
