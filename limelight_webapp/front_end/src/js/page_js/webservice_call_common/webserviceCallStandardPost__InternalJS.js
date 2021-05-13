/**
 * webserviceCallStandardPost__InternalJS.js
 * 
 * !!!!!!   INTERNAL Only:  Only called from webserviceCallStandardPost.ts
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
 * reportWebErrorToServer - Since calling a webservice that does not accept the "/" + webserviceSyncTrackingCode
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
import {WebserviceCallStandardPost_ApiObject_Holder_Class} from "page_js/webservice_call_common/webserviceCallStandardPost_ApiObject_Class";

/**
 * !!!!!   INTERNAL ONLY
 * 
 * ONLY CALL FROM webserviceCallStandardPost.ts
 * 
 */
const webserviceCallStandardPost_INTERNALONLY = function ({ requestParams, api, request_Holder, requestComplete_Callback }) {

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

        const _URL = url;

        const requestData = JSON.stringify( dataToSend );

        const request =
            $.ajax({
                type : "POST",
                url : _URL,
                data : requestData,
                contentType: _AJAX_POST_JSON_CONTENT_TYPE,
                dataType : "text", // "json",
                beforeSend : function( jqXHR, settings ) { // ( jqXHR jqXHR, PlainObject settings )
                    // A pre-request callback function that can be used to modify the jqXHR (in jQuery 1.4.x, XMLHTTPRequest) object before it is sent. Use this to set custom headers, etc. The jqXHR and settings objects are passed as arguments. This is an Ajax Event. Returning false in the beforeSend function will cancel the request. As of jQuery 1.5, the beforeSend option will be called regardless of the type of request.

                    jqXHR.setRequestHeader( webserviceSyncTrackingCodeHeaderParam, webserviceSyncTrackingCode );
                },
                success : function( responseDataJSON ) {

                    try {
                        requestComplete_Callback()
                    } catch (e) {
                        // eat/swallow exception
                    }

                    api._clear_request();
                    if ( webserviceCallStandardPost_ApiObject_Holder_Class ) {
                        webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;
                    }

                    try {

                        let responseData;
                        try {
                            responseData = JSON.parse( responseDataJSON );
                        } catch( e_JSON_parse ) {

                            try {
                                //  Create error to send to server
                                throw Error("Response from server cannot be parsed as JSON. Server response contents: " + responseDataJSON );
                            } catch( e ) {

                                if ( ! doNotHandleErrorResponse ) {
                                    handleAJAXFailure( "Response from server cannot be parsed as JSON." );  //  Sometimes throws exception so rest of processing won't always happen
                                }

                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        }

                        request_Holder.resolvePromise({ responseData });

                    } catch( e ) {

                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );

                        const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

                        //  Need to set properties on object rejectReasonObject

                        request_Holder.rejectPromise({ rejectReasonObject });

                        throw e;
                    }
                },
                failure: function(errMsg) {

                    try {
                        requestComplete_Callback()
                    } catch (e) {
                        // eat/swallow exception
                    }

                    api._clear_request();
                    if ( webserviceCallStandardPost_ApiObject_Holder_Class ) {
                        webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;
                    }

                    try {
                        if ( ! doNotHandleErrorResponse ) {
                            handleAJAXFailure( errMsg );  //  Sometimes throws exception so rest of processing won't always happen
                        }

                        const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

                        //  Need to set properties on object rejectReasonObject

                        request_Holder.rejectPromise({ rejectReasonObject });

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }

                },
                error : function(jqXHR, textStatus, errorThrown) {

                    try {
                        requestComplete_Callback()
                    } catch (e) {
                        // eat/swallow exception
                    }

                    api._clear_request();
                    if ( webserviceCallStandardPost_ApiObject_Holder_Class ) {
                        webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;
                    }

                    if ( ! api._is_abortCalled() ) {
                        //  Abort not called so report error
                        try {
                            if ( ! doNotHandleErrorResponse ) {
                                handleAJAXError(jqXHR, textStatus, errorThrown);  //  Sometimes throws exception so rest of processing won't always happen
                            }

                            const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

                            //  Need to set properties on object rejectReasonObject

                            request_Holder.rejectPromise({ rejectReasonObject });

                            // alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
                            // textStatus: " + textStatus );

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }
                }

            });

        api._set_request( request );

    } catch( e ) {
        if ( webserviceCallStandardPost_ApiObject_Holder_Class ) {
            webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;
        }

        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }
};

export { webserviceCallStandardPost_INTERNALONLY }

