/**
 * commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.ts
 *
 */

import { CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data } from "./commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import { CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers";
import { CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data";
import { CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Scan_Summary_Data";

/**
 * For Scan Data loaded using ProjectScanFileId
 *
 * Data loaded from server and code to load data from server
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT {

    private _commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass: CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass

    private _commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data

    private _commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data

    private _commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers: CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor() {

        this._commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass =
            CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass.getNewInstance()

        this._commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data =
            CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data.getNewInstance()

        this._commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data =
            CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data.getNewInstance()

        this._commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers =
            CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers.getNewInstance()
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance() {
        return new CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT();
    }

    ///////////////

    get_commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass() {
        return this._commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass
    }

    get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data() {
        return this._commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data;
    }

    get_commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data() {
        return this._commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data
    }

    get_commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers() {
        return this._commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers
    }
}
