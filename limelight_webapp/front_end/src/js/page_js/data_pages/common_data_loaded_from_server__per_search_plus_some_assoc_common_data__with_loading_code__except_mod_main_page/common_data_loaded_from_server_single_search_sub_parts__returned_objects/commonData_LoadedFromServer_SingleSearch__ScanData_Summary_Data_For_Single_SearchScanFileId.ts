/**
 * commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_SearchScanFileId.ts
 *
 * For Single Project Search  -  ScanData Summary Data
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import { CommonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Scan_Summary_Data";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder {

    private _scanData_PerSearchScanFileId_Map_Key_SearchScanFileId = new Map<number, CommonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId>()

    /**
     *
     * @param searchScanFileId
     */
    get_ScanData_Summary_Data_For_SearchScanFileId( searchScanFileId: number ) {
        return this._scanData_PerSearchScanFileId_Map_Key_SearchScanFileId.get(searchScanFileId);
    }

    /**
     * !!!  For Use Only within the TS file this class is in
     * @param entry
     */
    InternalUse__InsertEntry(
        {
            searchScanFileId, entry
        } : {
            searchScanFileId
            entry: CommonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId
        }) : void {

        this._scanData_PerSearchScanFileId_Map_Key_SearchScanFileId.set( searchScanFileId, entry )
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder__FunctionResult {

    commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_SearchScanFileId_MainClass {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder = new CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder()

    private _promise_LoadingInProgress_Map_Key_SearchScanFileId: Map<number, Promise<void>> = new Map()

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
     * @param projectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_SearchScanFileId_MainClass({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for searchScanFileId
     */
    get_ScanData_Summary_DataHolder_For_SearchScanFileId_ReturnPromise(searchScanFileId: number): Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder__FunctionResult> {
        try {
            const result = this.get_ScanData_Summary_DataHolder_For_SearchScanFileId(searchScanFileId);

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
    get_ScanData_Summary_DataHolder_For_SearchScanFileId(searchScanFileId: number):
        {
            data: CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder__FunctionResult>
        } {

        if (this._commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder.get_ScanData_Summary_Data_For_SearchScanFileId(searchScanFileId) ) {

            //  Have loaded data so just return it
            return {
                data: {
                    commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder: this._commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder
                },
                promise: undefined
            };
        }

        let promise_LoadingInProgress_For_SearchScanFileId = this._promise_LoadingInProgress_Map_Key_SearchScanFileId.get(searchScanFileId)

        if ( ! promise_LoadingInProgress_For_SearchScanFileId ) {
            promise_LoadingInProgress_For_SearchScanFileId = this._loadData_For_SearchScanFileId(searchScanFileId)
            this._promise_LoadingInProgress_Map_Key_SearchScanFileId.set(searchScanFileId, promise_LoadingInProgress_For_SearchScanFileId)
        }

        return {data: undefined, promise: new Promise<CommonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder__FunctionResult>((resolve, reject) => { try {
                promise_LoadingInProgress_For_SearchScanFileId.catch(reason => reject(reason))
                promise_LoadingInProgress_For_SearchScanFileId.then(novalue => { try {

                    resolve({ commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder: this._commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        };
    }

    /**
     *
     * @param searchScanFileId
     */
    private async _loadData_For_SearchScanFileId(searchScanFileId: number) : Promise<void> {
        try {
            const get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result =
                await
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch().get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise()

            const projectScanFileId_SearchScanFileId_Entry =
                get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileId)
            if ( ! projectScanFileId_SearchScanFileId_Entry ) {
                const msg = "get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileId) returned NOTHING for searchScanFileId: " + searchScanFileId
                console.warn(msg)
                throw Error(msg)
            }

            const get_ScanData_NO_Peaks_DataHolder_Result =
                await
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_ParentObject().
                    get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT().get_commonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass().
                    get_ScanData_Summary_DataHolder_For_ProjectScanFileId_ReturnPromise( projectScanFileId_SearchScanFileId_Entry.projectScanFileId )

            const scanData_Summary_Data_For_ProjectScanFileId =
                get_ScanData_NO_Peaks_DataHolder_Result.commonData_LoadedFromServer__ScanData_Summary_Data_Holder.get_ScanData_Summary_Data_For_ProjectScanFileId( projectScanFileId_SearchScanFileId_Entry.projectScanFileId )
            if ( ! scanData_Summary_Data_For_ProjectScanFileId ) {
                const msg = "get_ScanData_NO_Peaks_DataHolder_Result.commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder.get_ScanData_Summary_Data_For_ProjectScanFileId( projectScanFileId_SearchScanFileId_Entry.projectScanFileId )) returned NOTHING for projectScanFileId_SearchScanFileId_Entry.projectScanFileId: " + projectScanFileId_SearchScanFileId_Entry.projectScanFileId
                console.warn(msg)
                throw Error(msg)
            }

            this._promise_LoadingInProgress_Map_Key_SearchScanFileId.delete(searchScanFileId)

            this._commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder.InternalUse__InsertEntry({ searchScanFileId, entry: scanData_Summary_Data_For_ProjectScanFileId })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

}