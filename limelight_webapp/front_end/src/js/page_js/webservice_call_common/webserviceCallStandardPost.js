/**
 * webserviceCallStandardPost.js
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
 * createUserAccount_With_Invite.js
 * userResetPassword_Subpart.js
 * 
 * The following use $.ajax still:
 * reportWebErrorToServer.js - Since calling a webservice that does not accept the "/" + webserviceSyncTrackingCode
 * 
 * googleChartLoaderForThisWebapp.js - Since loads Javacript
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import { _AJAX_POST_JSON_CONTENT_TYPE, LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { WebserviceCallStandardPost_RejectObject_Class } from './webserviceCallStandardPost_RejectObject_Class.js';

/**
 * Make webservice call
 * 
 * @param dataToSend Object that will be serialized to JSON and sent to server
 * @param url - without trailing '/' or getWebserviceSyncTrackingCode() 
 * @param doNotHandleErrorResponse - Do not process non-200 response code or AJAX Parse failures, Caller is responsible.
 * 
 * @return Promise. call resolve({ responseData }) or reject({ rejectReasonObject })
 * 
 * content type of post is assumed _AJAX_POST_JSON_CONTENT_TYPE
 * 
 */
var webserviceCallStandardPost = function ({ dataToSend, url, doNotHandleErrorResponse }) {

    const webserviceCallFunction = function( resolve, reject ) {
        try {
            const webserviceSyncTrackingCodeHeaderParam = LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM;
            const webserviceSyncTrackingCode = getWebserviceSyncTrackingCode();

            const _URL = url;

            const requestData = JSON.stringify( dataToSend );

            // let request =
            $.ajax({
                type : "POST",
                url : _URL,
                data : requestData,
                contentType: _AJAX_POST_JSON_CONTENT_TYPE,
                dataType : "json",
                beforeSend : function( jqXHR, settings ) { // ( jqXHR jqXHR, PlainObject settings )
                    // A pre-request callback function that can be used to modify the jqXHR (in jQuery 1.4.x, XMLHTTPRequest) object before it is sent. Use this to set custom headers, etc. The jqXHR and settings objects are passed as arguments. This is an Ajax Event. Returning false in the beforeSend function will cancel the request. As of jQuery 1.5, the beforeSend option will be called regardless of the type of request.

                    jqXHR.setRequestHeader( webserviceSyncTrackingCodeHeaderParam, webserviceSyncTrackingCode );
                },
                success : function( responseData ) {
                    try {
                        resolve({ responseData });
                        
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                },
                failure: function(errMsg) {
                    try {
                        if ( ! doNotHandleErrorResponse ) {
                            handleAJAXFailure( errMsg );  //  Sometimes throws exception so rest of processing won't always happen
                        }

                        const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

                        //  Need to set properties on object rejectReasonObject

                        reject({ rejectReasonObject });
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }

                },
                error : function(jqXHR, textStatus, errorThrown) {
                    try {
                        if ( ! doNotHandleErrorResponse ) {
                            handleAJAXError(jqXHR, textStatus, errorThrown);  //  Sometimes throws exception so rest of processing won't always happen
                        }

                        const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

                        //  Need to set properties on object rejectReasonObject

                        reject({ rejectReasonObject });

                        // alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
                        // textStatus: " + textStatus );
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }
                
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    return new Promise( webserviceCallFunction );
};

export { webserviceCallStandardPost }

