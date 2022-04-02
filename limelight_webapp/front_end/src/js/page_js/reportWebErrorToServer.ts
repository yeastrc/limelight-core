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
		reportErrorObjectToServer : function( params ) {

			const errorException = params.errorException;

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

			const react_devtools_backend_String = "react_devtools_backend";
			
			let errorException_stack_Contains_react_devtools_backend = false;
			
			if ( errorException.stack ) {

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



