/**
 * commonData_LoadedFromServer_SingleSearch__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId.ts
 *
 * For Single Project Search  -  MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import { CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Holder {

    readonly searchScanFileId: number
    readonly scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId__FunctionResult {

    scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId {

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
        return new CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for searchScanFileId and other parameters
     */
    get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data_ReturnPromise(
        {
            searchScanFileId
        } : {
            searchScanFileId: number
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId__FunctionResult> {
        try {
            const result = this.get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data({ searchScanFileId })

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
    get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data(
        {
            searchScanFileId
        } : {
            searchScanFileId: number
        }) : {
            data: CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId__FunctionResult>
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

                const get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result =
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_ParentObject().
                    get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT().
                    get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ().
                    get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder( scanFile_ProjectScanFileId_SearchScanFileId_Entry.projectScanFileId )

                if ( get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result.data ) {

                    return {
                        promise: undefined,
                        data: {
                            scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: { searchScanFileId, scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result.data.scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder
                            } } }

                } else if ( get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result.promise ) {

                    return {
                        data: undefined,
                        promise: new Promise<CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId__FunctionResult>(( resolve, reject) => { try {

                            get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result.promise.catch(reason => reject(reason))
                            get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result.promise.then(value_get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result => { try {

                                resolve({
                                        scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: { searchScanFileId, scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: value_get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result.scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder
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
                    const msg = "get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result no data or promise"
                    console.warn(msg)
                    throw Error(msg)
                }

            } else if ( get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise ) {

                return {
                    data: undefined,
                    promise: new Promise<CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId__FunctionResult>(( resolve, reject) => { try {

                        get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                        get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise.then(value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result => { try {

                            const scanFile_ProjectScanFileId_SearchScanFileId_Entry =
                                value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileId)
                            if ( ! scanFile_ProjectScanFileId_SearchScanFileId_Entry ) {
                                const msg = "value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileId) returned NOTHING for searchScanFileId: " + searchScanFileId
                                console.warn(msg)
                                throw Error(msg)
                            }

                            const get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result_Promise =
                                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_ParentObject().
                                get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT().
                                get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ().
                                get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_ReturnPromise( scanFile_ProjectScanFileId_SearchScanFileId_Entry.projectScanFileId )

                            get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result_Promise.catch(reason => reject(reason))
                            get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result_Promise.then(value_get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result_Promise => { try {

                                resolve({
                                    scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: { searchScanFileId, scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: value_get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_Result_Promise.scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder
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