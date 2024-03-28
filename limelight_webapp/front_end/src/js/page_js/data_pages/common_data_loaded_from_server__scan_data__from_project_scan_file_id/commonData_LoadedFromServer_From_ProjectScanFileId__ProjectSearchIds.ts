/**
 * commonData_LoadedFromServer_From_ProjectScanFileId__ProjectSearchIds.ts
 *
 * Data across Project since pass in ProjectScanFileId  -  
 *
 * Data loaded from server and code to load data from server
 *
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer__ProjectSearchIds_Data_For_Single_ProjectScanFileId {

    readonly projectSearchIds: ReadonlyArray<number>
}

/**
 *
 */
export class CommonData_LoadedFromServer__ProjectSearchIds_Data_Holder {

    private _projectSearchIds_PerProjectScanFileId_Map_Key_ProjectScanFileId = new Map<number, CommonData_LoadedFromServer__ProjectSearchIds_Data_For_Single_ProjectScanFileId>()

    /**
     *
     * @param projectScanFileId
     */
    get_ProjectSearchIds_Data_For_ProjectScanFileId( projectScanFileId: number ) {
        return this._projectSearchIds_PerProjectScanFileId_Map_Key_ProjectScanFileId.get(projectScanFileId);
    }

    /**
     * !!!  For Use Only within the TS file this class is in
     * @param entry
     */
    InternalUse__InsertEntry(
        {
            projectScanFileId, entry
        } : {
            projectScanFileId: number
            entry: CommonData_LoadedFromServer__ProjectSearchIds_Data_For_Single_ProjectScanFileId
        } ) {

        this._projectSearchIds_PerProjectScanFileId_Map_Key_ProjectScanFileId.set( projectScanFileId, entry )
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer__ProjectSearchIds_Data_Holder__FunctionResult {

    commonData_LoadedFromServer__ProjectSearchIds_Data_Holder: CommonData_LoadedFromServer__ProjectSearchIds_Data_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer__ProjectSearchIds_Data_For_Single_ProjectScanFileId_MainClass {

    //

    private _commonData_LoadedFromServer__ProjectSearchIds_Data_Holder: CommonData_LoadedFromServer__ProjectSearchIds_Data_Holder = new CommonData_LoadedFromServer__ProjectSearchIds_Data_Holder()

    private _promise_LoadingInProgress_Map_Key_ProjectScanFileId: Map<number, Promise<void>> = new Map()

    /**
     *
     * @param projectSearchId
     */
    private constructor() {

    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     */
    static getNewInstance() {
        return new CommonData_LoadedFromServer__ProjectSearchIds_Data_For_Single_ProjectScanFileId_MainClass();
    }

    /**
     * !!!  Always return promise
     *
     * Get all for projectScanFileId
     */
    get_ProjectSearchIds_DataHolder_For_ProjectScanFileId_ReturnPromise(projectScanFileId: number): Promise<CommonData_LoadedFromServer__ProjectSearchIds_Data_Holder__FunctionResult> {
        try {
            const result = this.get_ProjectSearchIds_DataHolder_For_ProjectScanFileId(projectScanFileId);

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
    get_ProjectSearchIds_DataHolder_For_ProjectScanFileId(projectScanFileId: number):
        {
            data: CommonData_LoadedFromServer__ProjectSearchIds_Data_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer__ProjectSearchIds_Data_Holder__FunctionResult>
        } {

        if (this._commonData_LoadedFromServer__ProjectSearchIds_Data_Holder.get_ProjectSearchIds_Data_For_ProjectScanFileId(projectScanFileId) ) {

            //  Have loaded data so just return it
            return {
                data: {
                    commonData_LoadedFromServer__ProjectSearchIds_Data_Holder: this._commonData_LoadedFromServer__ProjectSearchIds_Data_Holder
                },
                promise: undefined
            };
        }

        let promise_LoadingInProgress_For_ProjectScanFileId = this._promise_LoadingInProgress_Map_Key_ProjectScanFileId.get(projectScanFileId)

        if ( ! promise_LoadingInProgress_For_ProjectScanFileId ) {
            promise_LoadingInProgress_For_ProjectScanFileId = this._loadData_For_ProjectScanFileId(projectScanFileId)
            this._promise_LoadingInProgress_Map_Key_ProjectScanFileId.set(projectScanFileId, promise_LoadingInProgress_For_ProjectScanFileId)
        }

        return {data: undefined, promise: new Promise<CommonData_LoadedFromServer__ProjectSearchIds_Data_Holder__FunctionResult>(( resolve, reject) => { try {
                promise_LoadingInProgress_For_ProjectScanFileId.catch(reason => reject(reason))
                promise_LoadingInProgress_For_ProjectScanFileId.then(novalue => { try {

                    resolve({ commonData_LoadedFromServer__ProjectSearchIds_Data_Holder: this._commonData_LoadedFromServer__ProjectSearchIds_Data_Holder })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        };
    }

    /**
     *
     * @param projectScanFileId
     */
    private _loadData_For_ProjectScanFileId(projectScanFileId: number) : Promise<void> {

        return new Promise<void>((resolve, reject) => { try {

            const requestObject = {
                projectScanFileId
            };
            const url = "d/rws/for-page/project-search-ids-for-project-scan-file-id";

            console.log("START: getting data from URL: " + url);

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObject, url, dataRetrieval_CanRetry: true});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch(() => {
                this._promise_LoadingInProgress_Map_Key_ProjectScanFileId.delete(projectScanFileId)
                reject()
            });

            promise_webserviceCallStandardPost.then(({responseData}: { responseData: any }) => { try {

                this._promise_LoadingInProgress_Map_Key_ProjectScanFileId.delete(projectScanFileId)

                console.log("END: REJECTED: getting data from URL: " + url);

                this._process_WebserviceResponse({responseData, projectScanFileId});

                resolve();

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse(
        {
            responseData, projectScanFileId
        }: {
            responseData: any
            projectScanFileId: number
        }): void {

        const spectralStorage_ProjectSearchIds_DataFor_SingleProjectScanFileId: CommonData_LoadedFromServer__ProjectSearchIds_Data_For_Single_ProjectScanFileId = responseData

        if ( spectralStorage_ProjectSearchIds_DataFor_SingleProjectScanFileId.projectSearchIds === undefined || spectralStorage_ProjectSearchIds_DataFor_SingleProjectScanFileId.projectSearchIds === null ) {
            const msg = "( spectralStorage_ProjectSearchIds_DataFor_SingleProjectScanFileId.projectSearchIds === undefined || spectralStorage_ProjectSearchIds_DataFor_SingleProjectScanFileId.projectSearchIds === null )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( ! ( spectralStorage_ProjectSearchIds_DataFor_SingleProjectScanFileId.projectSearchIds instanceof Array ) ) {
            const msg = "( ! ( spectralStorage_ProjectSearchIds_DataFor_SingleProjectScanFileId.projectSearchIds instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        for ( const projectSearchId of spectralStorage_ProjectSearchIds_DataFor_SingleProjectScanFileId.projectSearchIds ) {

            if ( projectSearchId === undefined || projectSearchId === null ) {
                const msg = "( projectSearchId === undefined || projectSearchId === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( projectSearchId ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( projectSearchId ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }

        this._commonData_LoadedFromServer__ProjectSearchIds_Data_Holder.InternalUse__InsertEntry({ projectScanFileId, entry: spectralStorage_ProjectSearchIds_DataFor_SingleProjectScanFileId })
    }
}