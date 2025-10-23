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
import { _AJAX_POST_JSON_CONTENT_TYPE } from "page_js/common_all_pages/EveryPageCommon";
import {
	WebserviceCallStandardPost_RejectObject_Class
} from "page_js/webservice_call_common/webserviceCallStandardPost_RejectObject_Class";
import {
	ParseURL_Into_PageStateParts__FailToParse__StillHas__go__InUrl_Exception_Class
} from "page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts";

let _pageHide_Event_Triggered = false; //  true when 'pagehide' event called on page unload

let _page_beforeunload_Event_Triggered = false; //  true when 'beforeunload' event called on page unload

let _page_beforeunload_Event_Triggered__At__Milliseconds: number;

let _page_visibilitychange__hidden_Event_Triggered = false;

let _page_visibilitychange__hidden_Event_Triggered__At__Milliseconds: number;




/**
 * 
 */
var reportWebErrorToServer = {

		/**
		 *
		 */
		reportErrorObjectToServer : function(
			params
				:
				{
					errorException?: any
					webserviceURL?: any
					skipDisplayErrorOverlay_SkipCall__errorDisplay_WhenHave_Javascript_Typescript_Error?: boolean
				} ) {

			const errorException = params.errorException;
			const webserviceURL = params.webserviceURL
			const skipDisplayErrorOverlay_SkipCall__errorDisplay_WhenHave_Javascript_Typescript_Error = params.skipDisplayErrorOverlay_SkipCall__errorDisplay_WhenHave_Javascript_Typescript_Error


			if ( errorException instanceof WebserviceCallStandardPost_RejectObject_Class ) {

				console.warn( "reportErrorObjectToServer: errorException instanceof WebserviceCallStandardPost_RejectObject_Class SO NOT report exception to server" )

				return //   EARLY RETURN
			}

			if ( errorException && errorException.stack && errorException.stack.includes( "chrome-extension://" ) ) {

				//  Skip exceptions caused by Chrome Extensions.  The React Chrome Extension sometimes triggers an exception

				console.warn( "reportErrorObjectToServer: ( errorException.stack && errorException.stack.includes( \"chrome-extension://\" ) ) SO NOT report exception to server. errorException.stack: " + errorException.stack )

				return //   EARLY RETURN
			}

			if ( _pageHide_Event_Triggered ) {

				// 'pagehide' event called on page unload

				console.warn("'pagehide' event triggered so NOT report error to server")

				return; // EARLY RETURN
			}

			if ( _page_beforeunload_Event_Triggered && _page_beforeunload_Event_Triggered__At__Milliseconds ) {

				const now = new Date().getMilliseconds();

				if ( ( now - _page_beforeunload_Event_Triggered__At__Milliseconds ) < 5000 ) {

					// 'beforeunload' event called on page unload

					console.warn("'beforeunload' event triggered and now is within 5 seconds so NOT report error to server")

					return;  //  EARLY RETURN
				}
			}

			if ( _page_visibilitychange__hidden_Event_Triggered && _page_visibilitychange__hidden_Event_Triggered__At__Milliseconds ) {

				const now = new Date().getMilliseconds();

				if ( ( now - _page_visibilitychange__hidden_Event_Triggered__At__Milliseconds ) < 5000 ) {

					// 'pagehide' event called on page unload

					console.warn("'visibilitychange' event triggered and document.visibilityState === 'hidden' and now is within 5 seconds so NOT report error to server")

					return;  //  EARLY RETURN
				}
			}

			if ( ! skipDisplayErrorOverlay_SkipCall__errorDisplay_WhenHave_Javascript_Typescript_Error ) {

				const react_devtools_backend_String = "react_devtools_backend";

				let errorException_stack_Contains_react_devtools_backend = false;

				if ( errorException && errorException.stack ) {

					const stack = errorException.stack
					const index = stack.indexOf( react_devtools_backend_String );

					if ( index != -1 ) {

						errorException_stack_Contains_react_devtools_backend = true;
					}
				}

				if ( ! errorException_stack_Contains_react_devtools_backend ) {
					try {
						errorDisplay_WhenHave_Javascript_Typescript_Error();
					} catch (e) {
						console.warn("Exception calling errorDisplay_WhenHave_Javascript_Typescript_Error();")
					}
				} else {
					console.warn("Exception Stack contains dev tools string so NOT displaying error msg to user.  dev tools string: '" + react_devtools_backend_String + "'." )
				}
			}

			if ( errorException instanceof ParseURL_Into_PageStateParts__FailToParse__StillHas__go__InUrl_Exception_Class ) {

				console.warn( "reportErrorObjectToServer: errorException instanceof ParseURL_Into_PageStateParts__FailToParse__StillHas__go__InUrl_Exception_Class SO NOT report exception to server" )

				return //   EARLY RETURN
			}

			console.warn("reportErrorObjectToServer: params: ", params)

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
						browserURL : browserURL,
						webserviceURL };

				var requestData_JSON_String = JSON.stringify( requestObj );

				const _URL = "d/rws/for-page/log-browser-javascript-error";

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


				promise_fetch.catch( reason => {
					console.log("AJAX failure in reportWebErrorToServer.reportErrorObjectToServer(), reject reason: " + reason );
				})
				promise_fetch.then( response => {
					console.log( "fetch response.ok: ", response.ok )
					console.log( "fetch response.status: ", response.status )

					if ( ! response.ok ) {

						console.log("AJAX error in reportWebErrorToServer.reportErrorObjectToServer(), response.status: " + response.status  + ", response.statusText: " + response.statusText );
					}
				})

			} catch( e ) {

				console.log("Exception in reportWebErrorToServer.reportErrorObjectToServer()");
			}


		}


};


//  https://developer.mozilla.org/en-US/docs/Web/API/Window/pagehide_event

window.addEventListener("pagehide", event => {
	if (event.persisted) {
		/* the page isn't being discarded, so it can be reused later */
	}

	_pageHide_Event_Triggered = true;

}, false);

// https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event

document.addEventListener("beforeunload", event => {

	//  This function will NOT return anything or call anything to prevent navigation away from this page

	_page_beforeunload_Event_Triggered = true;

	_page_beforeunload_Event_Triggered__At__Milliseconds = new Date().getMilliseconds();

}, {passive: true});

//  https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event

document.addEventListener("visibilitychange", function() {
	if (document.visibilityState === 'hidden') {

		_page_visibilitychange__hidden_Event_Triggered = true;

		_page_visibilitychange__hidden_Event_Triggered__At__Milliseconds = new Date().getMilliseconds();

	} else {

		_page_visibilitychange__hidden_Event_Triggered = false;
		_page_visibilitychange__hidden_Event_Triggered__At__Milliseconds = undefined;
	}
});

export { reportWebErrorToServer }



