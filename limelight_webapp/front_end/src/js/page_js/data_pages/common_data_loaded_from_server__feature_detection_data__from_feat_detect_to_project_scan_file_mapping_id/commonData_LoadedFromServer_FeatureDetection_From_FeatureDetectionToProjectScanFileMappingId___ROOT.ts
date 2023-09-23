/**
 * commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT.ts
 *
 */


import { CommonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id";
import { CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries";
import { CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries";
import { CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries";

/**
 * For Scan Data loaded using ProjectScanFileId
 *
 * Data loaded from server and code to load data from server
 *
 */
export class CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT {

    private _commonData_LoadedFromServer_SingleSearch__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id: CommonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id

    private _commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries: CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries
    private _commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries
    private _commonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries: CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor() {

        this._commonData_LoadedFromServer_SingleSearch__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id =
            CommonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id.getNewInstance()

        this._commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries = CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries.getNewInstance()
        this._commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries = CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries.getNewInstance()
        this._commonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries = CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries.getNewInstance()

    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance() {
        return new CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT();
    }

    ///////////////

    get_commonData_LoadedFromServer_SingleSearch__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id() {
        return this._commonData_LoadedFromServer_SingleSearch__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id
    }

    get_commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries() {
        return this._commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries
    }

    get_commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries() {
        return this._commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries
    }

    get_commonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries() {
        return this._commonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries
    }
}
