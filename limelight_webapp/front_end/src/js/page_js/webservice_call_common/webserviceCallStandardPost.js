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

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';

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
        
        const webserviceSyncTrackingCode = getWebserviceSyncTrackingCode();

        const _URL = url + "/" + webserviceSyncTrackingCode;

        const requestData = JSON.stringify( dataToSend );

        // let request =
        $.ajax({
            type : "POST",
            url : _URL,
            data : requestData,
            contentType: _AJAX_POST_JSON_CONTENT_TYPE,
            dataType : "json",
            success : function( responseData ) {
                try {
                    resolve({ responseData });
                    
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    
                    throw e;
                }
            },
            failure: function(errMsg) {

                if ( ! doNotHandleErrorResponse ) {
                    handleAJAXFailure( errMsg );  //  Sometimes throws exception so rest of processing won't always happen
                }

                const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

                //  Need to set properties on object rejectReasonObject

                reject({ rejectReasonObject });
            },
            error : function(jqXHR, textStatus, errorThrown) {

                if ( ! doNotHandleErrorResponse ) {
                    handleAJAXError(jqXHR, textStatus, errorThrown);  //  Sometimes throws exception so rest of processing won't always happen
                }

                const rejectReasonObject = new WebserviceCallStandardPost_RejectObject_Class();

                //  Need to set properties on object rejectReasonObject

                reject({ rejectReasonObject });

                // alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
                // textStatus: " + textStatus );
            }
        });
    }

    return new Promise( webserviceCallFunction );
};

export { webserviceCallStandardPost }

