/**
 * commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist.ts
 *
 * For Single Project Search  -  GoldStandard Root - Any Entries Exist
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist_Holder {

    private _goldStandard_Root_AnyEntriesExist : boolean;

    constructor(
        {
            goldStandard_Root_AnyEntriesExist
        } : {
            goldStandard_Root_AnyEntriesExist : boolean
        }
    ) {
        this._goldStandard_Root_AnyEntriesExist = goldStandard_Root_AnyEntriesExist;
    }

    /**
     *
     */
    get_GoldStandard_Root_AnyEntriesExist() {
        return this._goldStandard_Root_AnyEntriesExist;
    }
}


/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist__get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult {

    goldStandard_Root_AnyEntriesExist_Holder: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //

    private _get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist__get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult

    private _promise_Load_GoldStandard_Root_AnyEntriesExist_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist__get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
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
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist({
            projectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_GoldStandard_Root_AnyEntriesExistHolder_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist__get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult> {

        const result = this.get_GoldStandard_Root_AnyEntriesExistHolder();

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     * 
     */
    get_GoldStandard_Root_AnyEntriesExistHolder():
        {
            data: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist__get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist__get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult>
        } {

        if (this._get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult,
                promise: undefined
            };
        }

        return {
            data: undefined,
            promise: this._load_GoldStandard_Root_AnyEntriesExist_Data()
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_GoldStandard_Root_AnyEntriesExist_Data() : Promise<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist__get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult> {
        try {
            if ( this._promise_Load_GoldStandard_Root_AnyEntriesExist_Data_InProgress ) {

                return this._promise_Load_GoldStandard_Root_AnyEntriesExist_Data_InProgress;
            }

            this._promise_Load_GoldStandard_Root_AnyEntriesExist_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist__get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId
                    };

                    const url = "d/rws/for-page/scan-file-gold-standard-root-any-entries-exist-single-project-search-id";

                    console.log("START:  AJAX Call to get " + url + ", Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        console.log("END:  AJAX Call to get " + url + ", Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData });
                        resolve( this._get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_Load_GoldStandard_Root_AnyEntriesExist_Data_InProgress.catch( reason => {
                this._promise_Load_GoldStandard_Root_AnyEntriesExist_Data_InProgress = undefined;
            });
            this._promise_Load_GoldStandard_Root_AnyEntriesExist_Data_InProgress.then( valueIgnored => {
                this._promise_Load_GoldStandard_Root_AnyEntriesExist_Data_InProgress = undefined;
            })

            return this._promise_Load_GoldStandard_Root_AnyEntriesExist_Data_InProgress;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        let goldStandard_Root_AnyEntriesExist = false

        if ( responseData.anyEntriesExist ) {
            goldStandard_Root_AnyEntriesExist = true
        }

        const goldStandard_Root_AnyEntriesExist_Holder = new CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist_Holder({ goldStandard_Root_AnyEntriesExist });

        this._get_GoldStandard_Root_AnyEntriesExistHolder__FunctionResult = {
            goldStandard_Root_AnyEntriesExist_Holder
        }
    }

}