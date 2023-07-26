/**
 * psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.ts
 *
 * Get a lot of The Chromatogram data for a single SearchScanFileId.
 *
 * Not return the Scan Data.  Returns the scan numbers
 *
 */

//   Request Params:

import {
    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange,
    PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import {
    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers,
    PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers";
import { PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer";



//    Response Objects:

/**
 *
 */
export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root {

    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result

    value_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_FromPsmScanNumbers: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result

    scanNumberArray: Array<number>
}

/**
 * for Retention Time range and m/z ranges
 *
 */
export const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId = function (
    {
        retentionTimeRange_Min,
        retentionTimeRange_Max,
        projectSearchId,
        searchScanFileId,
        psmList,
    } : {
        retentionTimeRange_Min: number
        retentionTimeRange_Max: number

        projectSearchId: number
        searchScanFileId: number
        psmList: Array<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item>
    }
) : Promise<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root> {

    if ( psmList.length === 0 ) {
        const msg = "( psmList.length === 0 )"
        console.warn(msg)
        throw Error(msg)
    }

    return new Promise<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root>((resolve_TopLevel, reject_TopLevel) => { try {

        let value_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_FromPsmScanNumbers: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result
        let value_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result

        const promises: Array<Promise<void>> = []

        {

            const scanNumberList: Array<number> = []

            for ( const psmItem of psmList ) {

                if ( psmItem.searchScanFileId === searchScanFileId ) {
                    scanNumberList.push( psmItem.scanNumber )
                }
            }

            const promise = new Promise<void>((resolve, reject) => { try {
                const promise_FromCall = psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers({
                    projectSearchId, searchScanFileId, scanNumberList
                })
                promise_FromCall.catch(reason => { reject( reason )})
                promise_FromCall.then(value => { try {

                    value_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_FromPsmScanNumbers = value

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)
        }
        {
            const promise = new Promise<void>((resolve, reject) => { try {
                const promise_FromCall = psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange({
                    projectSearchId,
                    searchScanFileId,
                    retentionTimeRange_Min,
                    retentionTimeRange_Max
                })
                promise_FromCall.catch(reason => { reject( reason )})
                promise_FromCall.then(value => { try {

                    value_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange = value

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push(promise)
        }

        const promisesAll = Promise.all(promises)

        promisesAll.catch(reason => { reject_TopLevel(reason) })
        promisesAll.then(noValue => { try {

            const result_Final : PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root = {

                psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result: value_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange,
                value_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_FromPsmScanNumbers,

                scanNumberArray: value_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange.scanNumber_List
            }

            resolve_TopLevel( result_Final )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

}