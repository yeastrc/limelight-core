/**
 * reportWebErrorToServer
 * 
 * Send errors detected in JS to server   
 * 
 * 
 * Exported Javascript variable
 * 
 * export { reportWebErrorToServer }
 * 
 */

/**
 * JavaScript directive:   all variables have to be declared with "var", maybe other things
 */
"use strict";


import {errorDisplay_WhenHave_Javascript_Typescript_Error} from "page_js/common_all_pages/errorDisplay_WhenHave_Javascript_Typescript_Error";

/**
 * 
 */
var reportWebErrorToServer = {

		/**
		 * 
		 */
		reportErrorObjectToServer : function( params ) {

			var errorException = params.errorException;
			
			let errorException_stack_Contains_react_devtools_backend = false;
			
			if ( errorException.stack ) {
				
				if ( errorException.stack.indexOf( "react_devtools_backend" ) ) {
					
					errorException_stack_Contains_react_devtools_backend = true;
				}
			}

			if ( ! errorException_stack_Contains_react_devtools_backend ) {
				try {
					errorDisplay_WhenHave_Javascript_Typescript_Error();
				} catch (e) {
					console.warn("Exception calling errorDisplay_WhenHave_Javascript_Typescript_Error();")
				}
			}

			try {

				var userAgent = "unknown";

				if ( window.navigator ) {

					if ( window.navigator.userAgent ) {

						userAgent = window.navigator.userAgent
					}
				}

				var browserURL = window.location.href;

				var requestObj = { fdajklweRWOIUOPOP : true,
						errorMsg : errorException.message,
						stackString : errorException && errorException.stack || '(no stack trace)',
						userAgent : userAgent,
						browserURL : browserURL };

				var requestData = JSON.stringify( requestObj );

				var _URL = "d/rws/for-page/log-browser-javascript-error";

				//   Not calling webserviceCallStandardPost since webservice does not support URL in format "/" + webserviceSyncTrackingCode

//				var request =
				// @ts-ignore
				$.ajax({
					type : "POST",
					url : _URL,
					data : requestData,
					contentType: "application/json; charset=utf-8",
					dataType : "json",
					success : function(data) {

						var z = 0;
					},
					failure: function(errMsg) {

						console.log("AJAX failure in reportWebErrorToServer.reportErrorObjectToServer(), errMsg: " + errMsg );
					},
					error : function(jqXHR, textStatus, errorThrown) {

						console.log("AJAX error in reportWebErrorToServer.reportErrorObjectToServer(), textStatus: " + textStatus );
					}
				});



			} catch( e ) {

				console.log("Exception in reportWebErrorToServer.reportErrorObjectToServer()");
			}


		}


};


export { reportWebErrorToServer }


