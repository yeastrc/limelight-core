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

import { _AJAX_POST_JSON_CONTENT_TYPE, LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors';

import { WebserviceCallStandardPost_RejectObject_Class } from './webserviceCallStandardPost_RejectObject_Class';
import { WebserviceCallStandardPost_ApiObject_Class, WebserviceCallStandardPost_ApiObject_Holder_Class } from './webserviceCallStandardPost_ApiObject_Class';

import { webserviceCallStandardPost_INTERNALONLY } from './webserviceCallStandardPost__InternalJS.js';

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
const webserviceCallStandardPost = function ({ dataToSend, url, doNotHandleErrorResponse = false, webserviceCallStandardPost_ApiObject_Holder_Class } : {

    dataToSend, 
    url : string, 
    doNotHandleErrorResponse? : boolean,
    webserviceCallStandardPost_ApiObject_Holder_Class? : WebserviceCallStandardPost_ApiObject_Holder_Class
}) {

    // console.log("webserviceCallStandardPost")

    const api = new WebserviceCallStandardPost_ApiObject_Class();

    const promise = webserviceCallStandardPost_INTERNALONLY({ dataToSend, url, doNotHandleErrorResponse, api, webserviceCallStandardPost_ApiObject_Holder_Class });

    return { promise, api };
};

export { webserviceCallStandardPost }

