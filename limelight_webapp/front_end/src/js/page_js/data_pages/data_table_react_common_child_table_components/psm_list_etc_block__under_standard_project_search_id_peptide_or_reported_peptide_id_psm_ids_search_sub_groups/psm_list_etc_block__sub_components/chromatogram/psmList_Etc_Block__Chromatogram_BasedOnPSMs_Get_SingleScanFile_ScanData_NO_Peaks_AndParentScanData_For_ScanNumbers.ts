/**
 * psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers.ts
 *
 */


import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";


/**
 *
 */
export const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers = async function(
    {
        searchScanFileId, scanNumberSet, commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
    } : {
        searchScanFileId: number;
        scanNumberSet: Set<number>
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
):  Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder> {
    try {
        const get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_AndOtherParameters_ReturnPromise_Result =
            await
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data().
                get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_AndOtherParameters_ReturnPromise({
                    searchScanFileId,
                    retrieved_ALL_Scans_ForFile: false,
                    scanNumbers_RetrievedDataFor: scanNumberSet,
                    get_ParentScanData: true
                })

        return get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_AndOtherParameters_ReturnPromise_Result.scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder.scanData_NO_Peaks_Data_Holder

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}
