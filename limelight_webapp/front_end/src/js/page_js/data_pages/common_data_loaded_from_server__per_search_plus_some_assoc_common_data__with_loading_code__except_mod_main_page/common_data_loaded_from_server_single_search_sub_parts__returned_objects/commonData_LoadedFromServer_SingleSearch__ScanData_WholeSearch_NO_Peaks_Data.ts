/**
 * commonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data.ts
 *
 * For Single Project Search  -  ScanData_WholeSearch_NO_Peaks_Data
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import { CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import { CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data_Holder {

    private _scanData_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder>

    constructor(
        {
            scanData_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId
        } : {
            scanData_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder>
        }
    ) {
        this._scanData_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId = scanData_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId;
    }

    /**
     *
     * @param searchScanFileId
     */
    get_ScanData_WholeSearch_NO_Peaks_Data_For_SearchScanFileId( searchScanFileId: number ) {
        return this._scanData_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.get(searchScanFileId);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data__get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult {

    scanData_WholeSearch_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data__get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult

    private _promise_LoadScanData_WholeSearch_NO_Peaks_Data_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data__get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult>

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
        return new CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data__get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult> {
        try {
            const result = this.get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch();

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
     * Get all for search for main filters
     */
    get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data__get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data__get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult>
        } {

        if ( this._get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult ) {

            //  Have loaded data so just return it
            return {
                data: this._get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult,
                promise: undefined
            };
        }

        if ( this._promise_LoadScanData_WholeSearch_NO_Peaks_Data_Data_InProgress ) {

            return { data: undefined, promise: this._promise_LoadScanData_WholeSearch_NO_Peaks_Data_Data_InProgress };
        }

        this._promise_LoadScanData_WholeSearch_NO_Peaks_Data_Data_InProgress = this._getData_Overall()

        return {data: undefined, promise: this._promise_LoadScanData_WholeSearch_NO_Peaks_Data_Data_InProgress};
    }

    /**
     *
     */
    private async _getData_Overall() : Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data__get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult> {
        try {
            const get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise_Result =
                await
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch().get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise()

            const getData_ScanData_Result =
                await
                    this._getData_ScanData({ get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise_Result })

            return getData_ScanData_Result

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private _getData_ScanData(
        {
            get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise_Result
        } : {
            get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise_Result: CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data__get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult> {

        return new Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data__get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult>((resolve_TopLevel, reject_TopLevel) => { try {

            const scanData_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder> = new Map()

            const promises: Array<Promise<void>> = []

            for ( const projectScanFileId_SearchScanFileId_Entry of get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_All() ) {

                const promise = new Promise<void>((resolve_SingleEntry, reject_SingleEntry) => { try {

                    const getData_Promise =
                        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data().
                        get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_ReturnPromise({ searchScanFileId: projectScanFileId_SearchScanFileId_Entry.searchScanFileId })

                    getData_Promise.catch(reason => reject_SingleEntry(reason))
                    getData_Promise.then(value_getData_Promise => { try {

                        scanData_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.set( projectScanFileId_SearchScanFileId_Entry.searchScanFileId, value_getData_Promise.scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder.scanData_NO_Peaks_Data_Holder )

                        resolve_SingleEntry()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promises.push(promise)
            }

            const promisesAll = Promise.all(promises)

            promisesAll.catch(reason => { reject_TopLevel(reason)})
            promisesAll.then(novalue => { try {

                const scanData_WholeSearch_NO_Peaks_Data_Holder = new CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data_Holder({ scanData_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId })

                this._get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult = { scanData_WholeSearch_NO_Peaks_Data_Holder };

                resolve_TopLevel( this._get_ScanData_WholeSearch_NO_Peaks_DataHolder__FunctionResult )

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }
}