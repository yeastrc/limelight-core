/**
 * keep_UserSession_AliveIfExists_OnServer_WebserviceCall.ts
 *
 * AJAX Call to server to keep User Session Alive if exists
 *
 *
 */

/**
 * JavaScript directive:   all variables have to be declared with "var", maybe other things
 */
"use strict";

import { _AJAX_POST_JSON_CONTENT_TYPE } from "page_js/common_all_pages/EveryPageCommon";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

export class Keep_UserSession_AliveIfExists_OnServer_Result {

	readonly userIsLoggedIn : boolean;
	readonly webserviceSyncTracking_Code_Invalid : boolean;
}

/**
 *
 */
export const keep_UserSession_AliveIfExists_OnServer_WebserviceCall = function() : Promise<Keep_UserSession_AliveIfExists_OnServer_Result> {

	return new Promise<Keep_UserSession_AliveIfExists_OnServer_Result>( ( resolve, reject ) => {
		try {
			var userAgent = "unknown";

			if ( window.navigator ) {

				if ( window.navigator.userAgent ) {

					userAgent = window.navigator.userAgent
				}
			}

			var browserURL = window.location.href;

			var requestObj = { fdajklweRWOIUOPOP : true,
				userAgent : userAgent,
				browserURL : browserURL
			};

			var requestData_JSON_String = JSON.stringify( requestObj );

			var _URL = "d/rws/for-page/user-session-keep-alive-if-exists";

			//   Not calling webserviceCallStandardPost since webservice does not support URL in format "/" + webserviceSyncTrackingCode

			const httpHeaders: any = {
				"Content-Type": _AJAX_POST_JSON_CONTENT_TYPE
			}

			//  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

			const promise_fetch = window.fetch( _URL, {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				headers: httpHeaders,
				// redirect: "follow", // manual, *follow, error
				// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body: requestData_JSON_String // body data type must match "Content-Type" header
			})

			//  Fetch response

			promise_fetch.catch( reason => { try {

				console.log("AJAX failure in keep_UserSession_AliveIfExists_OnServer_WebserviceCall(), promise_fetch.catch(...) reject reason: " + reason );

				reject();

			} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

			promise_fetch.then( response => { try {

				if ( ! response.ok ) {

					console.log("AJAX failure in keep_UserSession_AliveIfExists_OnServer_WebserviceCall(), promise_fetch.then(...) ( ! response.ok )  response.status: " + response.status );

					return
				}

				const response_text_Promise = response.text()

				if ( ! response_text_Promise ) {
					console.warn("response.text() returned nothing")
				}

				response_text_Promise.catch( reason => { try {

					console.log("AJAX failure in keep_UserSession_AliveIfExists_OnServer_WebserviceCall(), response_text_Promise.catch(...) reject reason: " + reason );

					reject();

				} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

				response_text_Promise.then( response_text => { try {

					let responseData;
					try {
						responseData = JSON.parse( response_text );
					} catch( e_JSON_parse ) {
						try {
							console.log("AJAX failure in keep_UserSession_AliveIfExists_OnServer_WebserviceCall(), JSON.parse( response_text )  Exception: e_JSON_parse: " + e_JSON_parse );

							reject();

						} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
					}


					let userIsLoggedIn = false;
					let webserviceSyncTracking_Code_Invalid = false;

					if ( responseData.userIsLoggedIn  ) {
						userIsLoggedIn = true;
					}
					if ( responseData.webserviceSyncTracking_Code_Invalid  ) {
						webserviceSyncTracking_Code_Invalid = true;
					}

					const result : Keep_UserSession_AliveIfExists_OnServer_Result = {

						userIsLoggedIn,
						webserviceSyncTracking_Code_Invalid
					}

					resolve( result );

				} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})


			} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

		} catch( e ) {

			console.log("Exception in keep_UserSession_AliveIfExists_OnServer_WebserviceCall()");
		}
	});
}
