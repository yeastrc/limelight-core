/**
 * commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers.ts
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
export class CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder {

    readonly scanNumber_Array: ReadonlyArray<number>

    readonly retentionTimeRange_Min: number;
    readonly retentionTimeRange_Max: number;
}

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult {

    scanNumbers_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers {

    /**
     *
     */
    private constructor() {
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     */
    static getNewInstance() {
        return new CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers();
    }

    private _data_Holder_Array__Map_Key_ProjectScanFileId = new Map<number, Array<CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder>>()

    private _promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId = new Map<number, Array<INTERNAL__SingleRequestToServer_RequestParams_AND_Promise>>()

    /**
     * !!!  Always return promise
     *
     */
    get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_ReturnPromise( requestParams: INTERNAL__SingleRequestToServer_RequestParams ): Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult> {
        try {
            const result = this.get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange(requestParams);

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
     *
     */
    get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange( requestParams: INTERNAL__SingleRequestToServer_RequestParams):
        {
            data: CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult>
        } {

        { //  Find existing data loaded to return

            const data_Holder_Array = this._data_Holder_Array__Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )

            if ( data_Holder_Array ) {

                const data_Holder_FromArray = data_Holder_Array.find( data_Holder_Entry => {

                    if ( _requestParams_Match__INTERNAL__SingleRequestToServer_RequestParams( requestParams, data_Holder_Entry ) ) {
                        return data_Holder_Entry
                    }
                } )

                if ( data_Holder_FromArray ) {

                    //  Found data is loaded so return it

                    return { promise: undefined, data: { scanNumbers_Data_Holder: data_Holder_FromArray } } // EARLY RETURN
                }
            }
        }

        {  //  Find existing loading Promise

            const promise_And_scanNumbers_RetrieveInProgress_Array = this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )

            if ( promise_And_scanNumbers_RetrieveInProgress_Array ) {

                const promise_And_scanNumbers_RetrieveInProgress_FromArray = promise_And_scanNumbers_RetrieveInProgress_Array.find( promise_And_scanNumbers_RetrieveInProgress_Entry => {

                    if ( requestParams.retentionTimeRange_Min === promise_And_scanNumbers_RetrieveInProgress_Entry.requestParams.retentionTimeRange_Min
                        &&  requestParams.retentionTimeRange_Max === promise_And_scanNumbers_RetrieveInProgress_Entry.requestParams.retentionTimeRange_Max ) {

                        return promise_And_scanNumbers_RetrieveInProgress_Entry
                    }
                } )

                if ( promise_And_scanNumbers_RetrieveInProgress_FromArray ) {

                    //  Found data is loaded so return it

                    return {
                        data: undefined,
                        promise: new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult>((resolve, reject) => { try {

                            promise_And_scanNumbers_RetrieveInProgress_FromArray.promise.then( value_scanNumbers_Data_Holder => { try {

                                resolve({ scanNumbers_Data_Holder: value_scanNumbers_Data_Holder })

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
                    } // EARLY RETURN
                }
            }

        }

        const loadPromise = this._loadData(requestParams )

        {

            const requestParams_AND_Promise: INTERNAL__SingleRequestToServer_RequestParams_AND_Promise = {
                promise: loadPromise, requestParams
            }

            let promise_And_scanNumbers_RetrieveInProgress_Array = this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )

            if ( ! promise_And_scanNumbers_RetrieveInProgress_Array ) {
                promise_And_scanNumbers_RetrieveInProgress_Array = []
                this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.set( requestParams.projectScanFileId, promise_And_scanNumbers_RetrieveInProgress_Array )
            }

            promise_And_scanNumbers_RetrieveInProgress_Array.push( requestParams_AND_Promise )



            loadPromise.catch(reason => {
                this._removeFrom_promise_And_scanNumbers_RetrieveInProgress_Array({ requestParams_AND_Promise })
            })
            loadPromise.then(value => { try {

                this._removeFrom_promise_And_scanNumbers_RetrieveInProgress_Array({ requestParams_AND_Promise })


            } catch (e) {
                console.warn("Exception caught: ", e);
                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                throw e;
            }})

        }

        return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult>((resolve, reject) => { try {

                loadPromise.catch(reason => { reject(reason) })
                loadPromise.then( value_loadPromise => { try {

                    resolve( { scanNumbers_Data_Holder: value_loadPromise })

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
    }

    /**
     * @param requestParams_AND_Promise
     */
    private _removeFrom_promise_And_scanNumbers_RetrieveInProgress_Array({ requestParams_AND_Promise} : { requestParams_AND_Promise: INTERNAL__SingleRequestToServer_RequestParams_AND_Promise }) {

        const promise_And_scanNumbers_RetrieveInProgress_Array = this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.get( requestParams_AND_Promise.requestParams.projectScanFileId )

        if ( promise_And_scanNumbers_RetrieveInProgress_Array ) {

            const newArray = promise_And_scanNumbers_RetrieveInProgress_Array.filter(arrayEntry => {
                if ( arrayEntry === requestParams_AND_Promise ) {
                    return false; // Remove passed in entry
                }
                return true
            })

            this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.set( requestParams_AND_Promise.requestParams.projectScanFileId, newArray )
        }
    }

    /**
     *
     * @param requestParams
     */
    private _loadData( requestParams: INTERNAL__SingleRequestToServer_RequestParams ) : Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder> {

        const promise = new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder>(
            (resolve, reject) => { try {
                const requestObject = {
                    projectScanFileId: requestParams.projectScanFileId,
                    retentionTimeRange_Min: requestParams.retentionTimeRange_Min,
                    retentionTimeRange_Max: requestParams.retentionTimeRange_Max
                };

                const url = "d/rws/for-page/psfb/scan-numbers-for-ms-1-scans-project-scan-file-id-retention-time-range";

                console.log("START: getting data from URL: " + url);

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObject, url});

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch((reason) => {
                    console.log("END: REJECTED: getting data from URL: " + url);
                    reject(reason)
                });

                promise_webserviceCallStandardPost.then(({responseData}: { responseData: any }) => { try {

                    console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

                    const holder = _populate_DataPage_CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder({responseData, requestParams });

                    resolve(holder);

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return promise;
    }
}


/**
 *
 */
const _populate_DataPage_CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder = function (
    {
        responseData, requestParams
    } : {
        responseData: any

        requestParams: INTERNAL__SingleRequestToServer_RequestParams

    }) : CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder {

    if ( responseData.scanNumber_List === undefined || responseData.scanNumber_List === null ) {
        const msg = "( responseData.scanNumber_List === undefined || responseData.scanNumber_List === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! ( responseData.scanNumber_List instanceof Array ) ) {
        const msg = "( ! ( responseData.scanNumber_List instanceof Array ) )";
        console.warn(msg);
        throw Error(msg);
    }

    const scanNumber_List = responseData.scanNumber_List

    for ( const scanNumber of scanNumber_List ) {

        if ( ! limelight__variable_is_type_number_Check( scanNumber ) ) {
            const msg = "( ! limelight__variable_is_type_number_Check( scanNumber ) )";
            console.warn(msg);
            throw Error(msg);
        }
    }

    const result: CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder = {

        scanNumber_Array: scanNumber_List,
        retentionTimeRange_Min: requestParams.retentionTimeRange_Min, retentionTimeRange_Max: requestParams.retentionTimeRange_Max
    }

    return result ;
}

/**
 *
 * @param requestParams
 * @param scanData
 * @private
 */
const _requestParams_Match__INTERNAL__SingleRequestToServer_RequestParams = function (

    requestParams: INTERNAL__SingleRequestToServer_RequestParams, dataHolder: CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder
) : boolean {

    if ( requestParams.retentionTimeRange_Min === dataHolder.retentionTimeRange_Min
        && requestParams.retentionTimeRange_Max === dataHolder.retentionTimeRange_Max ) {
        return true
    }

    return true
}


class INTERNAL__SingleRequestToServer_RequestParams {

    //   Keep Function above this in Sync with these values  '_requestParams_Match__INTERNAL__SingleRequestToServer_RequestParams'

    readonly projectScanFileId: number;
    readonly retentionTimeRange_Min: number;
    readonly retentionTimeRange_Max: number;
}


class INTERNAL__SingleRequestToServer_RequestParams_AND_Promise {

    requestParams: INTERNAL__SingleRequestToServer_RequestParams
    promise: Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder>
}
