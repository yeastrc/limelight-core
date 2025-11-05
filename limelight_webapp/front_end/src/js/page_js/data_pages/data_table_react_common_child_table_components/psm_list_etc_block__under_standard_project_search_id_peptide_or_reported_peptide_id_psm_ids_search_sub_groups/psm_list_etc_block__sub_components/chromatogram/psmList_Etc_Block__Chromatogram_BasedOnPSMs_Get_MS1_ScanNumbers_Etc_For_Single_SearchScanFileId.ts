/**
 * psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.ts
 *
 * Get a lot of The Chromatogram data for a single SearchScanFileId.
 *
 * Not return the Scan Data.  Returns the scan numbers
 *
 */

//   Request Params:

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers";
import { PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import { CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import { CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange";



//    Response Objects:

/**
 *
 */
export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root {

    value_CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult: CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult

    value_CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder

    scanNumberArray: ReadonlyArray<number>
}

/**
 * for Retention Time range and m/z ranges
 *
 */
export const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId = function (
    {
        retentionTime_Seconds_Range_Min,
        retentionTime_Seconds_Range_Max,
        searchScanFileId,
        psmList,
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
    } : {
        retentionTime_Seconds_Range_Min: number
        retentionTime_Seconds_Range_Max: number

        searchScanFileId: number
        psmList: Array<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item>
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : Promise<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root> {

    if ( psmList.length === 0 ) {
        const msg = "( psmList.length === 0 )"
        console.warn(msg)
        throw Error(msg)
    }

    return new Promise<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root>((resolve_TopLevel, reject_TopLevel) => { try {

        let value_CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder
        let value_CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult: CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult

        const promises: Array<Promise<void>> = []

        {

            const scanNumberSet: Set<number> = new Set()

            for ( const psmItem of psmList ) {

                if ( psmItem.searchScanFileId === searchScanFileId ) {
                    scanNumberSet.add( psmItem.scanNumber )
                }
            }

            const promise = new Promise<void>((resolve, reject) => { try {

                const promise_FromCall = psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers({
                    searchScanFileId, scanNumberSet, commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
                })
                promise_FromCall.catch(reason => { reject( reason )})
                promise_FromCall.then(value => { try {

                    value_CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder = value

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)
        }
        {
            const promise = new Promise<void>((resolve, reject) => { try {
                const promise_FromCall =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange().
                    get_MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Data_ReturnPromise({
                        searchScanFileId,
                        retentionTime_Seconds_Range_Min,
                        retentionTime_Seconds_Range_Max
                    })

                promise_FromCall.catch(reason => { reject( reason )})
                promise_FromCall.then(value => { try {

                    value_CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult = value

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)
        }

        const promisesAll = Promise.all(promises)

        promisesAll.catch(reason => { reject_TopLevel(reason) })
        promisesAll.then(noValue => { try {

            const result_Final : PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root = {

                value_CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult,
                value_CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,

                scanNumberArray:
                value_CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult.
                    ms_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Holder.
                    ms_1_ScanNumbers_Data_Holder.
                    scanNumber_Array
            }

            resolve_TopLevel( result_Final )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

}