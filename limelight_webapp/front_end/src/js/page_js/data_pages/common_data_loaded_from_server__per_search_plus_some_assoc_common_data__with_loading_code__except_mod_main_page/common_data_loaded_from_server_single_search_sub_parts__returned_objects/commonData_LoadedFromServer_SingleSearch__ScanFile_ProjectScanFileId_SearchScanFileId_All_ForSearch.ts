/**
 * commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch.ts
 *
 * For Single Project Search  -  All ProjectScanFileId / SearchScanFileId Pairs for Search
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair {


    readonly searchScanFileId: number;
    readonly projectScanFileId: number;
}


/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder {

    private _data_Array: ReadonlyArray<CommonData_LoadedFromServer_SingleSearch_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair>

    private _data_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair>
    private _data_Map_Key_ProjectScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair>

    constructor(
        {
            data_Array
        }: {
            data_Array: ReadonlyArray<CommonData_LoadedFromServer_SingleSearch_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair>
        }
    ) {
        this._data_Array = data_Array;
    }

    get_All() {
        return this._data_Array
    }

    get_For_SearchScanFileId(searchScanFileId: number) {

        if ( ! this._data_Map_Key_SearchScanFileId ) {
            this._data_Map_Key_SearchScanFileId = new Map()
            for ( const data of this._data_Array ) {
                if ( this._data_Map_Key_SearchScanFileId.has( data.searchScanFileId ) ) {
                    const msg = "this._data_Array has more than one entry for data.searchScanFileId: " + data.searchScanFileId
                    console.warn(msg)
                    throw Error(msg)
                }
                this._data_Map_Key_SearchScanFileId.set( data.searchScanFileId, data )
            }
        }

        return this._data_Map_Key_SearchScanFileId.get(searchScanFileId);
    }

    get_For_ProjectScanFileId(projectScanFileId: number) {

        if ( ! this._data_Map_Key_ProjectScanFileId ) {
            this._data_Map_Key_ProjectScanFileId = new Map()
            for ( const data of this._data_Array ) {
                if ( this._data_Map_Key_ProjectScanFileId.has( data.projectScanFileId ) ) {
                    const msg = "this._data_Array has more than one entry for data.projectScanFileId: " + data.projectScanFileId
                    console.warn(msg)
                    throw Error(msg)
                }
                this._data_Map_Key_ProjectScanFileId.set( data.projectScanFileId, data )
            }
        }

        return this._data_Map_Key_ProjectScanFileId.get(projectScanFileId);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult {

    scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder: CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //

    private _get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult

    private _promise_LoadScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Data_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult>

    /**
     *
     * @param projectSearchId
     */
    private constructor(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        this._projectSearchId = projectSearchId;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     */
    static getNewInstance(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch({
            projectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult> {
        try {
            const result = this.get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch();

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
    get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult>
        } {

        if (this._get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult,
                promise: undefined
            };
        }

        if (this._promise_LoadScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Data_Data_InProgress) {

            return {data: undefined, promise: this._promise_LoadScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Data_Data_InProgress};
        }

        this._promise_LoadScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Data_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult>(
            (resolve, reject) => { try {
                const requestObject = {
                    projectSearchId: this._projectSearchId
                };

                const url = "scanfile-projectscanfileid-searchscanfileid-all-forsearch-for-projectsearchid";

                console.log("START: getting data from URL: " + url);

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObject, url});

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch(() => {
                    reject()
                });

                promise_webserviceCallStandardPost.then(({responseData}: { responseData: any }) => { try {
                    console.log("END: REJECTED: getting data from URL: " + url);

                    this._process_WebserviceResponse({responseData});

                    resolve(this._get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult);

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {data: undefined, promise: this._promise_LoadScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Data_Data_InProgress};
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({responseData}: { responseData: any }): void {

        const data_Array = responseData.entries as Array<CommonData_LoadedFromServer_SingleSearch_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair>

        if ( ! data_Array ) {
            const msg = "( ! ( responseData.entries ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if (!(data_Array instanceof Array)) {
            const msg = "( ! ( responseData.entries instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        for (const entry of data_Array) {
            if (entry.searchScanFileId === undefined || entry.searchScanFileId === null) {
                const msg = "( entry.searchScanFileId === undefined || entry.searchScanFileId === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if (!variable_is_type_number_Check(entry.searchScanFileId)) {
                const msg = "( ! variable_is_type_number_Check( entry.searchScanFileId ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if (entry.projectScanFileId === undefined || entry.projectScanFileId === null) {
                const msg = "( entry.projectScanFileId === undefined || entry.projectScanFileId === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if (!variable_is_type_number_Check(entry.projectScanFileId)) {
                const msg = "( ! variable_is_type_number_Check( entry.projectScanFileId ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }

        const scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder = new CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder({data_Array});

        this._get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder__FunctionResult = {
            scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder
        }
    }
}