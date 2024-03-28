/**
 * commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data.ts
 *
 * For Single Project Search  -  ScanData_Single_SearchScanFileId_NO_Peaks_Data
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import { CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder {

    readonly searchScanFileId: number
    readonly scanData_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data__get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data__FunctionResult {

    scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data {

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
        return new CommonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for searchScanFileId
     */
    get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_ReturnPromise(
        {
            searchScanFileId
        } : {
            searchScanFileId: number
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data__get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data__FunctionResult> {

        return this.get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_AndOtherParameters_ReturnPromise({
            searchScanFileId, scanNumbers_RetrievedDataFor: undefined, retrieved_ALL_Scans_ForFile: true, get_ParentScanData: undefined
        })
    }

    /**
     * Get all for searchScanFileId
     */
    get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId(
        {
            searchScanFileId
        } : {
            searchScanFileId: number
        }) : {
        data: CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data__get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data__FunctionResult
        promise: Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data__get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data__FunctionResult>
    } {
        return this.get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_AndOtherParameters({
            searchScanFileId, scanNumbers_RetrievedDataFor: undefined, retrieved_ALL_Scans_ForFile: true, get_ParentScanData: undefined
        })
    }

    /**
     * !!!  Always return promise
     *
     * Get all for searchScanFileId and other parameters
     */
    get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_AndOtherParameters_ReturnPromise(
        {
            searchScanFileId, scanNumbers_RetrievedDataFor, retrieved_ALL_Scans_ForFile, get_ParentScanData
        } : {
            searchScanFileId: number
            scanNumbers_RetrievedDataFor: ReadonlySet<number>
            retrieved_ALL_Scans_ForFile: boolean
            get_ParentScanData: boolean
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data__get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data__FunctionResult> {
        try {
            const result = this.get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_AndOtherParameters({ searchScanFileId, scanNumbers_RetrievedDataFor, retrieved_ALL_Scans_ForFile, get_ParentScanData })

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
    get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_AndOtherParameters(
        {
            searchScanFileId, scanNumbers_RetrievedDataFor, retrieved_ALL_Scans_ForFile, get_ParentScanData
        } : {
            searchScanFileId: number
            scanNumbers_RetrievedDataFor: ReadonlySet<number>
            retrieved_ALL_Scans_ForFile: boolean
            get_ParentScanData: boolean
        }) : {
            data: CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data__get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data__get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data__FunctionResult>
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

                const get_ScanData_NO_Peaks_DataHolder_Result =
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_ParentObject().
                    get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT().get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data().get_ScanData_NO_Peaks_DataHolder({
                        projectScanFileId: scanFile_ProjectScanFileId_SearchScanFileId_Entry.projectScanFileId,
                        retrieved_ALL_Scans_ForFile,
                        scanNumbers_RetrievedDataFor,
                        get_ParentScanData
                    })

                if ( get_ScanData_NO_Peaks_DataHolder_Result.data ) {

                    return {
                        promise: undefined,
                        data: {
                            scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder: { searchScanFileId, scanData_NO_Peaks_Data_Holder: get_ScanData_NO_Peaks_DataHolder_Result.data.scanData_NO_Peaks_Data_Holder
                            } } }

                } else if ( get_ScanData_NO_Peaks_DataHolder_Result.promise ) {

                    return {
                        data: undefined,
                        promise: new Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data__get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data__FunctionResult>((resolve, reject) => { try {

                            get_ScanData_NO_Peaks_DataHolder_Result.promise.catch(reason => reject(reason))
                            get_ScanData_NO_Peaks_DataHolder_Result.promise.then(value_get_ScanData_NO_Peaks_DataHolder_Result => { try {

                                resolve({
                                        scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder: { searchScanFileId, scanData_NO_Peaks_Data_Holder: value_get_ScanData_NO_Peaks_DataHolder_Result.scanData_NO_Peaks_Data_Holder
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
                    const msg = "get_ScanData_NO_Peaks_DataHolder_Result no data or promise"
                    console.warn(msg)
                    throw Error(msg)
                }

            } else if ( get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise ) {

                return {
                    data: undefined,
                    promise: new Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data__get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data__FunctionResult>((resolve, reject) => { try {

                        get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                        get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise.then(value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result => { try {

                            const scanFile_ProjectScanFileId_SearchScanFileId_Entry =
                                value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileId)
                            if ( ! scanFile_ProjectScanFileId_SearchScanFileId_Entry ) {
                                const msg = "value_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileId) returned NOTHING for searchScanFileId: " + searchScanFileId
                                console.warn(msg)
                                throw Error(msg)
                            }

                            const get_ScanData_NO_Peaks_DataHolder_Result_Promise =
                                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_ParentObject().
                                get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT().get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data().get_ScanData_NO_Peaks_DataHolder_ReturnPromise({
                                    projectScanFileId: scanFile_ProjectScanFileId_SearchScanFileId_Entry.projectScanFileId,
                                    retrieved_ALL_Scans_ForFile,
                                    scanNumbers_RetrievedDataFor,
                                    get_ParentScanData
                                })

                            get_ScanData_NO_Peaks_DataHolder_Result_Promise.catch(reason => reject(reason))
                            get_ScanData_NO_Peaks_DataHolder_Result_Promise.then(value_get_ScanData_NO_Peaks_DataHolder_Result_Promise => { try {

                                resolve({
                                    scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder: { searchScanFileId, scanData_NO_Peaks_Data_Holder: value_get_ScanData_NO_Peaks_DataHolder_Result_Promise.scanData_NO_Peaks_Data_Holder
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