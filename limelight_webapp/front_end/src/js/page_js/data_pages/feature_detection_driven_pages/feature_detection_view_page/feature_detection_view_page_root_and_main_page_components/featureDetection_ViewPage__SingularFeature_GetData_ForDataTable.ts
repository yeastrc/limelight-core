/**
 * featureDetection_ViewPage__SingularFeature_GetData_ForDataTable.ts
 *
 *
 *
 */

import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import { CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries";
import {
    CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry
} from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries";
import { CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT";
import { CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId___ROOT";
import { CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import { CommonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id";


////////////////

/**
 *
 */
export class FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter {

    featureDetection_PersistentFeature_Entry: CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry
    feature_detection_root__project_scnfl_mapping_tbl_Id: number

    commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT
    commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT
}

/**
 *
 */
export class FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results {

    featureDetection_SingularFeature_Entries_For_PersistentId: Array<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry>
    scanData_WholeFile_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder
    featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder: CommonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder
}

/**
 *
 * @param params
 */
export const featureDetection_ViewPage__SingularFeature_GetData_ForDataTable = function (
    {
        params
    } : {
        params: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter
    }
): Promise<FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results> /* return a promise */ {

    return new Promise<FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results>((resolve, reject) => { try {

        const promise_getData_FeatureDetectionData = _getData_FeatureDetectionData({ params })
        const promise_getData_ScanData = _getData_ScanData({ params })

        const promiseAll = Promise.all([ promise_getData_FeatureDetectionData, promise_getData_ScanData ])

        promiseAll.catch(reason => reject(reason))
        promiseAll.then(valueArray => { try {

            const featureDetection_SingularFeature_Entries_For_PersistentId: Array<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry> = valueArray[ 0 ].featureDetection_SingularFeature_Entries_For_PersistentId
            const scanData_WholeFile_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder = valueArray[ 1 ].scanData_WholeFile_NO_Peaks_Data_Holder
            const featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder = valueArray[ 1 ].featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder

            resolve({
                featureDetection_SingularFeature_Entries_For_PersistentId, scanData_WholeFile_NO_Peaks_Data_Holder, featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}

/**
 *
 * @param params
 */
const _getData_FeatureDetectionData = async function(
    {
        params
    } : {
        params: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter
    }
) : Promise<{
    featureDetection_SingularFeature_Entries_For_PersistentId: Array<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry>
}> {
    try {
        const get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result = (
            await params.commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT.get_commonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries().
            get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder__With_optional__feature_detection_persistent_feature_entry_id_ReturnPromise({
                feature_detection_root__project_scnfl_mapping_tbl__id: params.feature_detection_root__project_scnfl_mapping_tbl_Id,
                optional__feature_detection_persistent_feature_entry_id: params.featureDetection_PersistentFeature_Entry.id_PersistentFeature_Entry
            })
        )

        const featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder

        const featureDetection_SingularFeature_Entry_IDs: Set<number> = new Set()

        for ( const featureDetection_MappingOf_PersistentToSingularFeature_Entry of featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder.get_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries() ) {

            if ( featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id === params.featureDetection_PersistentFeature_Entry.id_PersistentFeature_Entry ) {

                featureDetection_SingularFeature_Entry_IDs.add( featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_SingularFeatureEntry_Id )
            }
        }

        const get_FeatureDetection_SingularFeature_EntriesHolder_Result = (
            await
                params.commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT.get_commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries().
                get_FeatureDetection_SingularFeature_EntriesHolder__With_optional__SingularFeature_Ids__ReturnPromise({
                    feature_detection_root__project_scnfl_mapping_tbl__id: params.feature_detection_root__project_scnfl_mapping_tbl_Id,
                    optional__SingularFeatureIds_Set: featureDetection_SingularFeature_Entry_IDs
                })
        )

        const featureDetection_SingularFeature_Entries_Holder = get_FeatureDetection_SingularFeature_EntriesHolder_Result.featureDetection_SingularFeature_Entries_Holder

        const ms_1_ScanNumbers_From_SingularFeatureEntries: Set<number> = new Set()

        const featureDetection_SingularFeature_Entries_For_PersistentId: Array<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry> = []

        for ( const featureDetection_SingularFeature_Entry of featureDetection_SingularFeature_Entries_Holder.get_FeatureDetection_SingularFeature_Entries() ) {

            if ( featureDetection_SingularFeature_Entry_IDs.has( featureDetection_SingularFeature_Entry.id ) ) {

                featureDetection_SingularFeature_Entries_For_PersistentId.push( featureDetection_SingularFeature_Entry )

                ms_1_ScanNumbers_From_SingularFeatureEntries.add( featureDetection_SingularFeature_Entry.ms_1_scan_number )
            }
        }

        return { featureDetection_SingularFeature_Entries_For_PersistentId }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

/**
 *
 * @param params
 */
const _getData_ScanData = async function(
    {
        params
    } : {
        params: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter
    }
) : Promise<{
    scanData_WholeFile_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder
    featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder: CommonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder
}> {
    try {
        const get_CommonData_LoadedFromServer_SingleSearch__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder_Result =
            await
        params.commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT.get_commonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id().
        get_CommonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder_ReturnPromise({ feature_detection_root__project_scnfl_mapping_tbl__id: params.feature_detection_root__project_scnfl_mapping_tbl_Id })

        const featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder =
            get_CommonData_LoadedFromServer_SingleSearch__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder_Result.featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder

        const projectScanFileId =
            featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.get_projectScanFileId()

        const get_ScanData_NO_Peaks_DataHolder_ReturnPromise_Result =
            await params.commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data().get_ScanData_NO_Peaks_DataHolder_ReturnPromise({
                projectScanFileId, retrieved_ALL_Scans_ForFile: true, scanNumbers_RetrievedDataFor: undefined, get_ParentScanData: undefined
            })

        const scanData_WholeFile_NO_Peaks_Data_Holder = get_ScanData_NO_Peaks_DataHolder_ReturnPromise_Result.scanData_NO_Peaks_Data_Holder

        return { scanData_WholeFile_NO_Peaks_Data_Holder, featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}