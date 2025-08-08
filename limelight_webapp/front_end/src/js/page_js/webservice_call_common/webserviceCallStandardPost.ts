/**
 * webserviceCallStandardPost.ts
 * 
 * Make webservice call to server.
 * 
 * Makes Standard POST call to webservice
 * 
 * Search rest of code for use of ".ajax" for places where this is not used and jQuery $.ajax is still being used.
 * 
 * Search rest of code for XMLHttpRequest for AJAX using browser native.
 * 
 * 
 * The following handle the fail/error response with their own GUI/Page updates to user.
 * 
 * createUserAccount_With_Invite.ts
 * userResetPassword_Subpart.ts
 * 
 * The following use jquery jQuery $.ajax still:
 *
 * googleChartLoaderForThisWebapp.ts - Since loads Javacript
 * googleRecaptchaLoaderForThisWebapp.ts - Since loads Javacript
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { WebserviceCallStandardPost_ApiObject_Class, WebserviceCallStandardPost_ApiObject_Holder_Class } from './webserviceCallStandardPost_ApiObject_Class';

import {
    _AJAX_POST_JSON_CONTENT_TYPE,
    getWebserviceSyncTrackingCode,
    LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM
} from "page_js/common_all_pages/EveryPageCommon";
import {
    WebserviceCallStandardPost_RejectObject_Class
} from "page_js/webservice_call_common/webserviceCallStandardPost_RejectObject_Class";
import { handleAJAXError } from "page_js/common_all_pages/handleServicesAJAXErrors";


const MAX_CONCURRENT_REQUESTS = 10;


///   !!!!!!!!!!!!     Function to do  Actual SINGLE Webservice call is at bottom of this file.  Named '__for_Next_WebserviceCallStandardPost'


/**
 * Make webservice call
 * 
 * @param dataToSend Object that will be serialized to JSON and sent to server
 * @param url - without trailing '/' or getWebserviceSyncTrackingCode() 
 * @param doNotHandleErrorResponse - optional Do not process non-200 response code or AJAX Parse failures, Caller is responsible.
 * 
 * @return { promise, api }. On promise, call resolve({ responseData }) or reject( rejectReasonObject ).  On api, call abort()
 * 
 * content type of post is assumed _AJAX_POST_JSON_CONTENT_TYPE
 * 
 */
export const webserviceCallStandardPost = function ( requestParams: WebserviceCallStandardPost_RequestParams ) {

    // console.log("webserviceCallStandardPost")

    const api = new WebserviceCallStandardPost_ApiObject_Class();

    const request_Holder = new INTERNAL__Request_Holder(requestParams, api );

    if ( _INTERNAL__inProgressEntries.size < MAX_CONCURRENT_REQUESTS ) {

        _INTERNAL__inProgressEntries.set(request_Holder, request_Holder);

        const requestComplete_Callback = () => {

            _INTERNAL__inProgressEntries.delete(request_Holder);

            try {
                _run_NextRequest_IfAnyExist();

            } catch( e ) {
                console.warn("call to _run_NextRequest_IfAnyExist() threw: ", e )
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }

        __for_Next_WebserviceCallStandardPost({
            requestParams,
            api,
            request_Holder,
            requestComplete_Callback
        });

    } else {

        _INTERNAL__requestQueue.push( request_Holder ); // queue for submit later
    }

    return { promise: request_Holder.containedPromise(), api };
};


////////

const _INTERNAL__inProgressEntries : Map<INTERNAL__Request_Holder,INTERNAL__Request_Holder> = new Map();

const _INTERNAL__requestQueue : Array<INTERNAL__Request_Holder> = []


/**
 *
 */
const _run_NextRequest_IfAnyExist = function () {

    //  Submit next queued request


    if ( _INTERNAL__inProgressEntries.size >= MAX_CONCURRENT_REQUESTS ) {
        //  Already max running
        // SHOULD NOT OCCUR
        const msg = "_run_NextRequest_IfAnyExist() called and ( _INTERNAL__inProgressEntries.size >= MAX_CONCURRENT_REQUESTS )";
        console.warn(msg);
        throw Error(msg);
    }

    while ( _INTERNAL__requestQueue.length !== 0 ) {

        //  Exit loop when process next_request_Holder with api that is NOT aborted ( _is_abortCalled() returns false )

        const next_request_Holder = _INTERNAL__requestQueue.shift();  // Remove first entry and return it

        if (!next_request_Holder) {
            //  Already max running
            // SHOULD NOT OCCUR
            const msg = "_run_NextRequest_IfAnyExist() called and _INTERNAL__requestQueue.shift() returned nothing after checked ( _INTERNAL__requestQueue.length === 0 ) ";
            console.warn(msg);
            throw Error(msg);
        }

        // if (next_request_Holder.api._is_abortCalled()) {
        //
        //     // request has been aborted so skip
        //
        //     console.log( "skipping AJAX request that has been aborted" );
        //
        //     continue;   //  EARLY LOOP CONTINUE
        // }

        // console.log("Submitting AJAX request that was in queue.  URL: ", next_request_Holder.requestParams.url )

        //  at end of loop use 'break;' to exit loop

        _INTERNAL__inProgressEntries.set(next_request_Holder, next_request_Holder);

        const requestComplete_Callback = () => {

            _INTERNAL__inProgressEntries.delete(next_request_Holder);

            _run_NextRequest_IfAnyExist();
        }

        const requestParams = next_request_Holder.requestParams;
        const api = next_request_Holder.api;

        __for_Next_WebserviceCallStandardPost({
            requestParams,
            api,
            request_Holder: next_request_Holder,
            requestComplete_Callback
        });

        ///  Processed an entry so EXIT LOOP

        break;  //  EXIT LOOP
    }

}


/**
 * Local Class - Kind of a Hack but it works
 */
class WebserviceCallStandardPost_RequestParams {

    /**
     * Object to encode to JSON and send to server
     */
    dataToSend: any
    url : string

    /**
     * ONLY Pass True if for Sure there are NO changes on the server due to calling this web service.
     *
     * If true, then the WebserviceCall Internal code may perform a retry of the webservice call if it fails with invalid HTTP status code.
     *
     * Set to undefined if unsure.  Will be treated as false but will know in future may want to investigate.
     */
    dataRetrieval_CanRetry?: boolean

    doNotHandleErrorResponse? : boolean
    webserviceCallStandardPost_ApiObject_Holder_Class? : WebserviceCallStandardPost_ApiObject_Holder_Class
}


/**
 * Local Class - Kind of a Hack but it works
 */
class INTERNAL__Request_Holder {

    private promise: Promise<any>
    private resolve: (value: any) => void
    private reject: (value: any) => void

    requestParams: WebserviceCallStandardPost_RequestParams
    api : WebserviceCallStandardPost_ApiObject_Class

    constructor(
        requestParams: WebserviceCallStandardPost_RequestParams,
        api : WebserviceCallStandardPost_ApiObject_Class
    ) {
        this.requestParams = requestParams;
        this.api = api

        this.promise = new Promise((resolve, reject)=> {
            try {
                this.reject = reject;
                this.resolve = resolve;
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    containedPromise() {
        return this.promise;
    }
    resolvePromise(value: any) {
        this.resolve(value);
    }
    rejectPromise(reason: any) {
        this.reject(reason);
    }
}

//  Local code and classes




////////

const __for_Next_WebserviceCallStandardPost = function(
    {
        requestParams, api, request_Holder, requestComplete_Callback
    } : {
        requestParams: WebserviceCallStandardPost_RequestParams
        api: WebserviceCallStandardPost_ApiObject_Class
        request_Holder: INTERNAL__Request_Holder
        requestComplete_Callback: () => void
    }

) {

    const dataToSend = requestParams.dataToSend;
    const url = requestParams.url;
    const doNotHandleErrorResponse = requestParams.doNotHandleErrorResponse;
    const webserviceCallStandardPost_ApiObject_Holder_Class = requestParams.webserviceCallStandardPost_ApiObject_Holder_Class

    if ( webserviceCallStandardPost_ApiObject_Holder_Class ) {
        webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = api;
    }

    try {
        const webserviceSyncTrackingCodeHeaderParam = LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM;
        const webserviceSyncTrackingCode = getWebserviceSyncTrackingCode();

        const httpHeaders: any = {
            "Content-Type": _AJAX_POST_JSON_CONTENT_TYPE
        }
        httpHeaders[ webserviceSyncTrackingCodeHeaderParam ] = webserviceSyncTrackingCode

        const requestData_JSON_String = JSON.stringify( dataToSend );

        //  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

        const promise_fetch = window.fetch( url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: httpHeaders,
            // redirect: "follow", // manual, *follow, error
            // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: requestData_JSON_String // body data type must match "Content-Type" header
        })

        //  Fetch response

        promise_fetch.catch( reason => { try {

            console.warn("fetch reject. reason: ", reason)

            try {
                requestComplete_Callback()
            } catch (e) {
                // eat/swallow exception
            }

            // api._clear_request();
            if ( webserviceCallStandardPost_ApiObject_Holder_Class ) {
                webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;
            }

            // reportWebErrorToServer.reportErrorObjectToServer( { errorException : undefined, webserviceURL: url } );

            const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

            //  Need to set properties on object rejectReasonObject

            request_Holder.rejectPromise( rejectReasonObject );

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        promise_fetch.then( response => { try {

            try {
                requestComplete_Callback()
            } catch (e) {
                // eat/swallow exception
            }

            // api._clear_request();
            if ( webserviceCallStandardPost_ApiObject_Holder_Class ) {
                webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;
            }

            if ( ! response.ok ) {

                const response_text_Promise = response.text()
                response_text_Promise.catch(reason => {
                    if ( ! doNotHandleErrorResponse ) {
                        handleAJAXError({
                            fetch_Results: {
                                fetch_Results_statusCode: response.status,
                                fetch_Results_statusText: response.statusText,
                                fetch_Results_ResponseText: ""
                            },
                            url,
                            requestData: dataToSend
                        });  //  Sometimes throws exception so rest of processing won't always happen
                    }
                })
                response_text_Promise.then( fetch_Results_ResponseText => {
                    if ( ! doNotHandleErrorResponse ) {
                        handleAJAXError( {
                            fetch_Results: {
                                fetch_Results_statusCode: response.status,
                                fetch_Results_statusText: response.statusText,
                                fetch_Results_ResponseText
                            },
                            url,
                            requestData: dataToSend
                        } );  //  Sometimes throws exception so rest of processing won't always happen
                    }
                })

                console.warn("fetch response.ok is not true. response.ok : ", response.ok)

                const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

                //  Need to set properties on object rejectReasonObject

                request_Holder.rejectPromise( rejectReasonObject );

                return; // EARLY RETURN
            }

            const response_text_Promise = response.text()

            if ( ! response_text_Promise ) {
                console.warn("response.text() returned nothing")
            }

            response_text_Promise.catch( reason => { try {

                console.warn("response.text() reject: ", reason)

                handleAJAXError({
                    fetch_Results: {
                        fetch_Results_statusCode: response.status,
                        fetch_Results_statusText: "Failed to get response from server. Reject Reason: " + reason,
                        fetch_Results_ResponseText: ""
                    },
                    url,
                    requestData: dataToSend
                });  //  Sometimes throws exception so rest of processing won't always happen

                // reportWebErrorToServer.reportErrorObjectToServer( { errorException : e, webserviceURL: url } );

                const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

                //  Need to set properties on object rejectReasonObject

                request_Holder.rejectPromise( rejectReasonObject );

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            response_text_Promise.then( response_text => { try {

                let responseData;
                try {
                    responseData = JSON.parse( response_text );
                } catch( e_JSON_parse ) {
                    try {

                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e_JSON_parse, webserviceURL: url } );

                        const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

                        //  Need to set properties on object rejectReasonObject

                        request_Holder.rejectPromise( rejectReasonObject );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                }

                request_Holder.resolvePromise({ responseData });

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }

}

