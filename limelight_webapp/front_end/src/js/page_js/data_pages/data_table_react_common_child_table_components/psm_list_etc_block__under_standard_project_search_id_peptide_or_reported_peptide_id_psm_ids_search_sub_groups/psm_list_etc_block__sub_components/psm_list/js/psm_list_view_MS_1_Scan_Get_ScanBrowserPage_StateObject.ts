/**
 * psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject.tsx
 *
 * PSM List for "MS1 Scan" Fake Link - Create Page State Object to show Scan Browser page with MS 1 scan for PSM scan number
 */

import { PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer";
import { PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import { CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import { CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch";
import { scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc } from "page_js/data_pages/scan_file_driven_pages/scan_file_driven_pages__utils/scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc";
import { CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import { ScanFileBrowserPage_SingleScan_UserSelections_StateObject } from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPage_SingleScan_UserSelections_StateObject";
import { PeptideMassCalculator } from "page_js/data_pages/peptide_mass_utils/PeptideMassCalculator";

/**
 *
 */
export class Psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result {

    // no_MS1_Scans: boolean
    ms1_ScanNumber_NOT_Found: boolean

    scanFileBrowserPage_SingleScan_UserSelections_StateObject: ScanFileBrowserPage_SingleScan_UserSelections_StateObject
    scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result: {basePathURL: string, codeForProjectScanFileId: string, basePathURL_AND_codeForProjectScanFileId: string}
}

/**
 *
 * @param psmListItem
 * @param psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
 */
export const psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject = function (
    {
        psmListItem,
        psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
    } : {
        psmListItem: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item
        psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
    }
) : Promise<Psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result> {

    return new Promise<Psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result>( (resolve, reject) => { try {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId

        const commonData_LoadedFromServer_From_ProjectScanFileId___ROOT = commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_ParentObject().get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT()

        let scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId: CommonData_LoadedFromServer_SingleSearch_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair
        let scanFileCode_FirstSix_Data_For_ProjectScanFileId: string
        let scanData_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder

        let variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        let staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
        let peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder


        const promises: Array<Promise<void>> = []

        { //  scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder && scanFileCode_FirstSix_Data_For_ProjectScanFileId

            const promise = new Promise<void>( (resolve, reject) => { try {

                const get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch().
                    get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise()

                get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise_Result.catch( reason =>  { reject(reason)})
                get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise_Result.then( value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise_Result => { try {

                    scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId = value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(psmListItem.searchScanFileId)

                    if ( ! scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId ) {
                        const msg = "scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(psmListItem.searchScanFileId) returned NOTHING for psmListItem.searchScanFileId: " + psmListItem.searchScanFileId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const projectScanFileId = scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId.projectScanFileId

                    const promises_projectScanFileIdDriven: Array<Promise<void>> = []

                    { //  scanFileCode_FirstSix_Data_For_ProjectScanFileId

                        const promise = new Promise<void>( (resolve, reject) => { try {

                            const get_ScanFileCode_FirstSix_DataHolder_For_ProjectScanFileId_ReturnPromise_Result =
                                commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
                                get_commonData_LoadedFromServer__ScanFileCode_FirstSix_Data_For_Single_ProjectScanFileId_MainClass().
                                get_ScanFileCode_FirstSix_DataHolder_For_ProjectScanFileId_ReturnPromise( projectScanFileId )

                            get_ScanFileCode_FirstSix_DataHolder_For_ProjectScanFileId_ReturnPromise_Result.catch( reason =>  { reject(reason)})
                            get_ScanFileCode_FirstSix_DataHolder_For_ProjectScanFileId_ReturnPromise_Result.then( value_get_ScanFileCode_FirstSix_DataHolder_For_ProjectScanFileId_ReturnPromise_Result => { try {

                                const scanFileCode_FirstSix_Data_For_ProjectScanFileId_Entry =
                                    value_get_ScanFileCode_FirstSix_DataHolder_For_ProjectScanFileId_ReturnPromise_Result.
                                    commonData_LoadedFromServer__ScanFileCode_FirstSix_Data_Holder.get_ScanFileCode_FirstSix_Data_For_ProjectScanFileId( projectScanFileId )

                                if ( ! scanFileCode_FirstSix_Data_For_ProjectScanFileId_Entry ) {
                                    const msg = "commonData_LoadedFromServer__ScanFileCode_FirstSix_Data_Holder.get_ScanFileCode_FirstSix_Data_For_ProjectScanFileId( projectScanFileId ) returned NOTHING for projectScanFileId: " + projectScanFileId + ", psmListItem.searchScanFileId: " + psmListItem.searchScanFileId
                                    console.warn(msg)
                                    throw Error(msg)
                                }

                                scanFileCode_FirstSix_Data_For_ProjectScanFileId = scanFileCode_FirstSix_Data_For_ProjectScanFileId_Entry.scanFileCode_FirstSix

                                resolve()

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                        promises_projectScanFileIdDriven.push(promise)
                    }

                    { //  scanData_NO_Peaks_Data_Holder

                        const promise = new Promise<void>( (resolve, reject) => { try {

                            const get_ScanData_NO_Peaks_DataHolder_ReturnPromise_Result =
                                commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
                                get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data().
                                get_ScanData_NO_Peaks_DataHolder_ReturnPromise({ projectScanFileId, retrieved_ALL_Scans_ForFile: true, get_ParentScanData: undefined, scanNumbers_RetrievedDataFor: undefined })

                            get_ScanData_NO_Peaks_DataHolder_ReturnPromise_Result.catch( reason =>  { reject(reason)})
                            get_ScanData_NO_Peaks_DataHolder_ReturnPromise_Result.then( value_get_ScanData_NO_Peaks_DataHolder_ReturnPromise_Result => { try {

                                scanData_NO_Peaks_Data_Holder = value_get_ScanData_NO_Peaks_DataHolder_ReturnPromise_Result.scanData_NO_Peaks_Data_Holder

                                resolve()

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                        promises_projectScanFileIdDriven.push(promise)
                    }

                    const promises_projectScanFileIdDriven_All = Promise.all( promises_projectScanFileIdDriven )

                    promises_projectScanFileIdDriven_All.catch(reason => { reject(reason) })
                    promises_projectScanFileIdDriven_All.then(novalue => { try {

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)
        }

        {  //  get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder AllForSearch

            const get_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch();

            if ( get_Result.data ) {

                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = get_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

            } else if ( get_Result.promise ) {

                const promise = new Promise<void>( (resolve, reject) => { try {
                        get_Result.promise.catch( reason =>  { reject(reason)})
                        get_Result.promise.then( value => { try {

                            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
                            resolve()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                )
                promises.push(promise)
            } else {
                throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch() Result no data or promise")
            }
        }

        {  // get_StaticModsHolder

            const get_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__StaticModifications().get_StaticModsHolder();

            if ( get_Result.data ) {

                staticMods_Holder = get_Result.data.staticMods_Holder

            } else if ( get_Result.promise ) {

                const promise = new Promise<void>( (resolve, reject) => { try {
                        get_Result.promise.catch( reason =>  { reject(reason)})
                        get_Result.promise.then( value => { try {

                            staticMods_Holder = value.staticMods_Holder
                            resolve()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                )
                promises.push(promise)
            } else {
                throw Error("get_StaticModsHolder() Result no data or promise")
            }
        }

        { // get_PeptideIdsHolder_AllForSearch

            const get_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch();

            if ( get_Result.data ) {

                peptideIds_For_MainFilters_Holder = get_Result.data.peptideIds_For_MainFilters_Holder

            } else if ( get_Result.promise ) {

                const promise = new Promise<void>( (resolve, reject) => { try {
                        get_Result.promise.catch( reason =>  { reject(reason)})
                        get_Result.promise.then( value => { try {

                            peptideIds_For_MainFilters_Holder = value.peptideIds_For_MainFilters_Holder
                            resolve()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                )
                promises.push(promise)
            } else {
                throw Error("get_PeptideIdsHolder_AllForSearch() Result no data or promise")
            }
        }

        {  //  get_PeptideSequencesHolder_AllForAllSearches

            const get_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_ParentObject().
                get__commonData_LoadedFromServer__CommonAcrossSearches().get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
                get_PeptideSequencesHolder_AllForAllSearches();

            if ( get_Result.data ) {

                peptideSequences_For_MainFilters_Holder = get_Result.data.peptideSequences_For_MainFilters_Holder

            } else if ( get_Result.promise ) {

                const promise = new Promise<void>( (resolve, reject) => { try {
                        get_Result.promise.catch( reason =>  { reject(reason)})
                        get_Result.promise.then( value => { try {

                            peptideSequences_For_MainFilters_Holder = value.peptideSequences_For_MainFilters_Holder
                            resolve()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                )
                promises.push(promise)
            } else {
                throw Error("get_PeptideIdsHolder_AllForSearch() Result no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            //  ( promises.length === 0 ) will NEVER happen since at least 1 Promise will always be created above

            const result =
                _process_LoadedData({
                    psmListItem,
                    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter,

                    scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId,
                    scanFileCode_FirstSix_Data_For_ProjectScanFileId,
                    scanData_NO_Peaks_Data_Holder,
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                    staticMods_Holder,
                    peptideIds_For_MainFilters_Holder,
                    peptideSequences_For_MainFilters_Holder
                })

            resolve(result)

            return  //  EARLY RETURN
        }

        const promiseAll = Promise.all( promises )

        promiseAll.catch(reason => {  reject(reason) })
        promiseAll.then(novalue => { try {

            const result =
                _process_LoadedData({
                    psmListItem,
                    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter,

                    scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId,
                    scanFileCode_FirstSix_Data_For_ProjectScanFileId,
                    scanData_NO_Peaks_Data_Holder,
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                    staticMods_Holder,
                    peptideIds_For_MainFilters_Holder,
                    peptideSequences_For_MainFilters_Holder
                })

            resolve(result)

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }})

}

/**
 *
 */
const _process_LoadedData = function(
    {
        psmListItem,
        psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter,

        scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId,
        scanFileCode_FirstSix_Data_For_ProjectScanFileId,
        scanData_NO_Peaks_Data_Holder,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        staticMods_Holder,
        peptideIds_For_MainFilters_Holder,
        peptideSequences_For_MainFilters_Holder

    } : {
        psmListItem: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item
        psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter

        scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId: CommonData_LoadedFromServer_SingleSearch_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair
        scanFileCode_FirstSix_Data_For_ProjectScanFileId: string
        scanData_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
        peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
    }
) : Psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result {


    const scanFileBrowserPage_SingleScan_UserSelections_StateObject = new ScanFileBrowserPage_SingleScan_UserSelections_StateObject({ valueChangedCallback: undefined })

    // {  //  Are there ANY MS1 Scans
    //
    //     let any_MS1_Scans = false
    //
    //     for ( const scanData of scanData_NO_Peaks_Data_Holder.scanData.scansArray ) {
    //
    //         if ( scanData.level === 1 ) {
    //             any_MS1_Scans = true
    //             break
    //         }
    //     }
    //
    //     if ( ! any_MS1_Scans ) {
    //
    //         return {                // EARLY RETURN
    //             // no_MS1_Scans: true,
    //             ms1_ScanNumber_NOT_Found: false,
    //             scanFileBrowserPage_SingleScan_UserSelections_StateObject: undefined,
    //             scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result: undefined
    //         }
    //     }
    // }
    { // Get MS1 Scan Number

        let scanData = scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmListItem.scanNumber )
        if ( ! scanData ) {
            const msg = "scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmListItem.scanNumber ) returned NOTHING for psmListItem.scanNumber: " + psmListItem.scanNumber + ", projectScanFileId: " + scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId.projectScanFileId + ", psmListItem.searchScanFileId: " + psmListItem.searchScanFileId
            console.warn(msg)
            throw Error(msg)
        }

        while ( scanData.level !== 1 ) {

            if ( scanData.parentScanNumber === undefined || scanData.parentScanNumber === null ) {
                //  NO Parent Scan Number
                //  Unable to get MS 1 Scan Number so return

                return {                // EARLY RETURN
                    ms1_ScanNumber_NOT_Found: true,
                    // no_MS1_Scans: false,
                    scanFileBrowserPage_SingleScan_UserSelections_StateObject: undefined,
                    scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result: undefined
                }
            }

            scanData = scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( scanData.parentScanNumber )
            if ( ! scanData ) {
                const msg = "scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( scanData.parentScanNumber ) returned NOTHING for scanData.parentScanNumber: " + scanData.parentScanNumber + ", projectScanFileId: " + scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId.projectScanFileId + ", psmListItem.searchScanFileId: " + psmListItem.searchScanFileId
                console.warn(msg)
                throw Error(msg)
            }
        }

        scanFileBrowserPage_SingleScan_UserSelections_StateObject.setScanNumber_Selected( scanData.scanNumber )
    }

    const scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result =
        scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc({
            projectScanFileId: scanFile_ProjectScanFileId_SearchScanFileId_All_For_SearchScanFileId.projectScanFileId,
            scanFile_Code_FirstSix: scanFileCode_FirstSix_Data_For_ProjectScanFileId
        })

    const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( psmListItem.reportedPeptideId )
    if ( ! peptideId ) {
        const msg = "peptideIdsHolder_AllForSearch.peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( psmListItem.reportedPeptideId ) returned NOTHING for " + psmListItem.reportedPeptideId;
        console.warn(msg)
        throw Error(msg)
    }

    const peptideSequence_String = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
    if ( ! peptideSequence_String ) {
        const msg = "peptideSequencesHolder_AllForAllSearches.peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId) returned NOTHING for peptideId: " + peptideId + ", psmListItem.reportedPeptideId: " + psmListItem.reportedPeptideId;
        console.warn(msg)
        throw Error(msg)
    }

    const staticModMasses_At_ReportedPeptide_Level: Array<number> = []
    {
        const staticMods = staticMods_Holder.get_StaticMods()
        if ( staticMods && staticMods.length > 0 ) {

            for ( const staticMod of staticMods ) {
                for ( const peptideSequenceLetter of peptideSequence_String ) {
                    if ( peptideSequenceLetter == staticMod.residue ) {
                        staticModMasses_At_ReportedPeptide_Level.push( staticMod.mass )
                    }
                }
            }
        }
    }

    const variableModMasses_At_ReportedPeptide_Level: Array<number> = []
    {
        const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId =
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( psmListItem.reportedPeptideId )
        if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

            for ( const modificationEntry of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {
                variableModMasses_At_ReportedPeptide_Level.push( modificationEntry.mass )
            }
        }
    }

    const modificationMasses_VariableAndStatic_And_OptionalOpenMod: Array<number> = []
    if ( variableModMasses_At_ReportedPeptide_Level && variableModMasses_At_ReportedPeptide_Level.length > 0 ) {
        for ( const mass of variableModMasses_At_ReportedPeptide_Level ) {
            modificationMasses_VariableAndStatic_And_OptionalOpenMod.push(mass)
        }
    }
    if ( staticModMasses_At_ReportedPeptide_Level && staticModMasses_At_ReportedPeptide_Level.length > 0 ) {
        for ( const mass of staticModMasses_At_ReportedPeptide_Level ) {
            modificationMasses_VariableAndStatic_And_OptionalOpenMod.push(mass)
        }
    }

    if ( psmListItem.openModificationMassAndPositionsList && psmListItem.openModificationMassAndPositionsList.length > 0 ) {

        //  Have Open Mod Mass

        for ( const openModMass_Entry of psmListItem.openModificationMassAndPositionsList ) {

            modificationMasses_VariableAndStatic_And_OptionalOpenMod.push(openModMass_Entry.openModMass)
        }
    }

    const monoisotopicMass_Peptide_And_Mods = PeptideMassCalculator.calculatePeptideMass(peptideSequence_String, modificationMasses_VariableAndStatic_And_OptionalOpenMod)
    const m_over_z_Peptide_And_Mods = PeptideMassCalculator.calculateMZ( peptideSequence_String, modificationMasses_VariableAndStatic_And_OptionalOpenMod, psmListItem.charge );

    scanFileBrowserPage_SingleScan_UserSelections_StateObject.set_featureDetection_IndividualFeature_OR_PSM__Root({
        baseIsotopePeak__Containing_M_Over_Z: m_over_z_Peptide_And_Mods,
        monoisotopicMass: monoisotopicMass_Peptide_And_Mods,
        charge: psmListItem.charge
    })

    return {
        scanFileBrowserPage_SingleScan_UserSelections_StateObject,
        scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result,
        // no_MS1_Scans: false,
        ms1_ScanNumber_NOT_Found: false
    }
}