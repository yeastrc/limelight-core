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
 * The following use $.ajax still:
 * reportWebErrorToServer.ts - Since calling a webservice that does not accept the "/" + webserviceSyncTrackingCode
 * 
 * googleChartLoaderForThisWebapp.ts - Since loads Javacript
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { WebserviceCallStandardPost_ApiObject_Class, WebserviceCallStandardPost_ApiObject_Holder_Class } from './webserviceCallStandardPost_ApiObject_Class';

import { webserviceCallStandardPost_INTERNALONLY } from './webserviceCallStandardPost__InternalJS.js';


const MAX_CONCURRENT_REQUESTS = 10;


/**
 * Make webservice call
 * 
 * @param dataToSend Object that will be serialized to JSON and sent to server
 * @param url - without trailing '/' or getWebserviceSyncTrackingCode() 
 * @param doNotHandleErrorResponse - optional Do not process non-200 response code or AJAX Parse failures, Caller is responsible.
 * 
 * @return { promise, api }. On promise, call resolve({ responseData }) or reject({ rejectReasonObject }).  On api, call abort()
 * 
 * content type of post is assumed _AJAX_POST_JSON_CONTENT_TYPE
 * 
 */
const webserviceCallStandardPost = function ( requestParams: WebserviceCallStandardPost_RequestParams ) {

    // console.log("webserviceCallStandardPost")

    const api = new WebserviceCallStandardPost_ApiObject_Class();

    const request_Holder = new Request_Holder(requestParams, api );

    if ( inProgressEntries.size < MAX_CONCURRENT_REQUESTS ) {

        inProgressEntries.set(request_Holder, request_Holder);

        const requestComplete_Callback = () => {

            inProgressEntries.delete(request_Holder);

            try {
                run_NextRequest_IfAnyExist();

            } catch( e ) {
                console.warn("call to run_NextRequest_IfAnyExist() threw: ", e )
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }

        webserviceCallStandardPost_INTERNALONLY({
            requestParams,
            api,
            request_Holder,
            requestComplete_Callback
        });

    } else {

        requestQueue.push( request_Holder ); // queue for submit later
    }

    return { promise: request_Holder.containedPromise(), api };
};

////////

const inProgressEntries : Map<Request_Holder,Request_Holder> = new Map();

const requestQueue : Array<Request_Holder> = []


/**
 *
 */
const run_NextRequest_IfAnyExist = function () {

    //  Submit next queued request


    if ( inProgressEntries.size >= MAX_CONCURRENT_REQUESTS ) {
        //  Already max running
        // SHOULD NOT OCCUR
        const msg = "run_NextRequest_IfAnyExist() called and ( inProgressEntries.size >= MAX_CONCURRENT_REQUESTS )";
        console.warn(msg);
        throw Error(msg);
    }

    while ( requestQueue.length !== 0 ) {

        //  Exit loop when process next_request_Holder with api that is NOT aborted ( _is_abortCalled() returns false )

        const next_request_Holder = requestQueue.shift();  // Remove first entry and return it

        if (!next_request_Holder) {
            //  Already max running
            // SHOULD NOT OCCUR
            const msg = "run_NextRequest_IfAnyExist() called and requestQueue.shift() returned nothing after checked ( requestQueue.length === 0 ) ";
            console.warn(msg);
            throw Error(msg);
        }

        if (next_request_Holder.api._is_abortCalled()) {

            // request has been aborted so skip

            console.log( "skipping AJAX request that has been aborted" );

            continue;   //  EARLY LOOP CONTINUE
        }

        // console.log("Submitting AJAX request that was in queue.  URL: ", next_request_Holder.requestParams.url )

        //  at end of loop use 'break;' to exit loop

        inProgressEntries.set(next_request_Holder, next_request_Holder);

        const requestComplete_Callback = () => {

            inProgressEntries.delete(next_request_Holder);

            run_NextRequest_IfAnyExist();
        }

        const requestParams = next_request_Holder.requestParams;
        const api = next_request_Holder.api;

        webserviceCallStandardPost_INTERNALONLY({
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
class Request_Holder {

    private promise: Promise<any>
    private resolve: any
    private reject: any

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
    resolvePromise(value) {
        this.resolve(value);
    }
    rejectPromise(reason) {
        this.reject(reason);
    }
}

//  Local code and classes



export { webserviceCallStandardPost }

