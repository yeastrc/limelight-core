/**
 * commonData_LoadedFromServer_SingleSearch__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange.ts
 *
 * For Single Project Search  -  MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import { CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Holder {

    readonly searchScanFileId: number
    readonly ms_1_ScanNumbers_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult {

    ms_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    /**
     *
     * @param projectSearchId
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for searchScanFileId and other parameters
     */
    get_MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Data_ReturnPromise(
        {
            searchScanFileId, retentionTimeRange_Min, retentionTimeRange_Max
        } : {
            searchScanFileId: number
            readonly retentionTimeRange_Min: number;
            readonly retentionTimeRange_Max: number;
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult> {
        try {
            const result = this.get_MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Data({ searchScanFileId, retentionTimeRange_Min, retentionTimeRange_Max })

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch (e) {
            console.warn("Exception caught: ", e);
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    }

    /**
     * Get all for searchScanFileId and other parameters
     */
    get_MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Data(
        {
            searchScanFileId, retentionTimeRange_Min, retentionTimeRange_Max
        } : {
            searchScanFileId: number
            readonly retentionTimeRange_Min: number;
            readonly retentionTimeRange_Max: number;
        }) : {
            data: CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult>
        } {
        try {
            const get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result =
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch().get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch()

            if ( get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.data ) {

                const scanFile_ProjectScanFileId_SearchScanFileId_Entry =
                    get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.data.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileId)
                if ( ! scanFile_ProjectScanFileId_SearchScanFileId_Entry ) {
                    const msg = "get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.data.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileId) returned NOTHING for searchScanFileId: " + searchScanFileId
                    console.warn(msg)
                    throw Error(msg)
                }

                const get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result =
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_ParentObject().
                    get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT().get_commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers().
                    get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange({
                        projectScanFileId: scanFile_ProjectScanFileId_SearchScanFileId_Entry.projectScanFileId,
                        retentionTimeRange_Min,
                        retentionTimeRange_Max
                    })

                if ( get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result.data ) {

                    return {
                        promise: undefined,
                        data: {
                            ms_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Holder: { searchScanFileId, ms_1_ScanNumbers_Data_Holder: get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result.data.scanNumbers_Data_Holder
                            } } }

                } else if ( get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result.promise ) {

                    return {
                        data: undefined,
                        promise: new Promise<CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult>(( resolve, reject) => { try {

                            get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result.promise.catch(reason => reject(reason))
                            get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result.promise.then(value_get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result => { try {

                                resolve({
                                        ms_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Holder: { searchScanFileId, ms_1_ScanNumbers_Data_Holder: value_get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result.scanNumbers_Data_Holder
                                        } }
                                )

                            } catch (e) {
                                console.warn("Exception caught: ", e);
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }})

                        } catch (e) {
                            console.warn("Exception caught: ", e);
                            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                            throw e;
                        }})
                    }

                } else {
                    const msg = "get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result no data or promise"
                    console.warn(msg)
                    throw Error(msg)
                }

            } else if ( get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise ) {

                return {
                    data: undefined,
                    promise: new Promise<CommonData_LoadedFromServer_SingleSearch__ScanData__MS_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange__FunctionResult>(( resolve, reject) => { try {

                        get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                        get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise.then(value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result => { try {

                            const scanFile_ProjectScanFileId_SearchScanFileId_Entry =
                                value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileId)
                            if ( ! scanFile_ProjectScanFileId_SearchScanFileId_Entry ) {
                                const msg = "value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileId) returned NOTHING for searchScanFileId: " + searchScanFileId
                                console.warn(msg)
                                throw Error(msg)
                            }

                            const get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result_Promise =
                                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_ParentObject().
                                get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT().get_commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers().
                                get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_ReturnPromise({
                                    projectScanFileId: scanFile_ProjectScanFileId_SearchScanFileId_Entry.projectScanFileId,
                                    retentionTimeRange_Min,
                                    retentionTimeRange_Max
                                })

                            get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result_Promise.catch(reason => reject(reason))
                            get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result_Promise.then(value_get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result_Promise => { try {

                                resolve({
                                    ms_1_ScanNumbers_For_Single_SearchScanFileId_RetentionTimeRange_Holder: { searchScanFileId, ms_1_ScanNumbers_Data_Holder: value_get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_Result_Promise.scanNumbers_Data_Holder
                                    } }
                                )

                            } catch (e) {
                                console.warn("Exception caught: ", e);
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }})

                        } catch (e) {
                            console.warn("Exception caught: ", e);
                            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                            throw e;
                        }})

                    } catch (e) {
                        console.warn("Exception caught: ", e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }})
                }

            } else {
                const msg = "get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result no data or promise"
                console.warn(msg)
                throw Error(msg)
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

}