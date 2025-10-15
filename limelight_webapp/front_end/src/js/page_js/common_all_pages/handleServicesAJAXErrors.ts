/**
 * handleServicesAJAXErrors.ts
 * 
 * Handle AJAX Errors
 * 
 * 
 * Exported Javascript variable
 * 
 * export { handleAJAXFailure, handleRawAJAXError, handleAJAXError }
 * 
 */

/**
 * JavaScript directive:   all variables have to be declared with "var", maybe other things
 */


import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";

const WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT = "webservice_sync_tracking_code_mismatch_text";
const WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT_STATUS_CODE = 400;

const AJAX_RESPONSE_NO_SESSION_TEXT = "no_session";
const AJAX_RESPONSE_NO_SESSION_STATUS_CODE = 401;

const AJAX_RESPONSE_FORBIDDEN_TEXT = "forbidden";
const AJAX_RESPONSE_FORBIDDEN_STATUS_CODE = 403;

const AJAX_RESPONSE_INVALID_SEARCH_LIST_ACROSS_PROJECTS_TEXT = "invalid_search_list_across_projects_text";
const AJAX_RESPONSE_INVALID_SEARCH_LIST_ACROSS_PROJECTS_STATUS_CODE = 403;

const INVALID_SEARCH_LIST_NOT_IN_DB_TEXT = "invalid_search_list_not_in_db_text";
const INVALID_SEARCH_LIST_NOT_IN_DB_STATUS_CODE = 400;

const AJAX_RESPONSE_INVALID_PARAMETER_TEXT = "invalid_parameter";
const AJAX_RESPONSE_INVALID_PARAMETER_STATUS_CODE = 400;


let beforeUnloadEvent_Triggered = false;

{

	const beforeUnload_EventHandler = (event: any) => {

		//  set so it doesn't report errors during page unload

		beforeUnloadEvent_Triggered = true;

		// // Cancel the event
		// event.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
		// // Chrome requires returnValue to be set
		// event.returnValue = '';
	};

	window.addEventListener("beforeunload", beforeUnload_EventHandler );

}

/////////////////////

//Handle when AJAX call gets failure

function handleAJAXFailure( errMsg: any ) {

	if ( beforeUnloadEvent_Triggered ) {

		//  Before Unload Event Triggered so skip

		return;  // EARLY RETURN
	}

	showAjaxErrorMsgFromMsg( { errorMsg : "Connecting to server failed: " + errMsg } );
}


/////////////////////

//  Handle when AJAX call gets error, non-jQuery Direct use of var xhr = new XMLHttpRequest();

function handleRawAJAXError( xhr: any ) {

	if ( beforeUnloadEvent_Triggered ) {

		//  Before Unload Event Triggered so skip

		return;  // EARLY RETURN
	}

	var jqXHR_statusCode = xhr.status;
	var jqXHR_responseText_String = xhr.response;
	
	
	if ( jqXHR_statusCode === WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT_STATUS_CODE &&
		jqXHR_responseText_String === WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT ) { 

		//  reload current URL, pick up new tacking code and new Javascript code

		limelight__ReloadPage_Function()

		return true;

	} else if ( jqXHR_statusCode === AJAX_RESPONSE_NO_SESSION_STATUS_CODE &&
			jqXHR_responseText_String === AJAX_RESPONSE_NO_SESSION_TEXT ) { 
		

		//  reload current URL
		
		limelight__ReloadPage_Function()
		
		return true;


	} else if ( jqXHR_statusCode === AJAX_RESPONSE_FORBIDDEN_STATUS_CODE &&
			jqXHR_responseText_String === AJAX_RESPONSE_FORBIDDEN_TEXT ) { 


		//  reload current URL

		limelight__ReloadPage_Function()

		return true;
	}

	return false;
}


/////////////////////

//  Handle when AJAX call gets error

function handleAJAXError(
	{
		fetch_Results, url, requestData
	} : {
		fetch_Results: {
			fetch_Results_statusCode: any
			fetch_Results_statusText: any
			fetch_Results_ResponseText: any
		}
		url: any
		requestData: any
	}) {

	if ( beforeUnloadEvent_Triggered ) {

		//  Before Unload Event Triggered so skip

		return;  // EARLY RETURN
	}

	//  JQUERY

	// let textStatus__LOCAL = jquery_Results.textStatus
	//
	// var ajaxResponse_StatusCode = jquery_Results.jqXHR.status;
	// var ajaxResponse_ResponseText_JSON_String = jquery_Results.jqXHR.responseText; //  Actually JSON

	//   FETCH

	let textStatus__LOCAL = fetch_Results.fetch_Results_statusText

	var ajaxResponse_StatusCode = fetch_Results.fetch_Results_statusCode
	var ajaxResponse_ResponseText_JSON_String = fetch_Results.fetch_Results_ResponseText; //  Actually JSON



	var ajaxResponse_ResponseText__From_ResponseBody_JSON = "Unknown Error";

	var ajaxResponse_ResponseText_JSON = undefined;
	
	try {
		ajaxResponse_ResponseText_JSON = window.JSON.parse( ajaxResponse_ResponseText_JSON_String );
	} catch( e ) {
//		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		
		//  Unable to parse JSON so display on page
		// showAjaxErrorMsg( { errorMsg : "exception: " + errorThrown + ", jqXHR: " + jqXHR + ", textStatus: " + textStatus } );

		// throw e;
	}
	
	if ( ajaxResponse_ResponseText_JSON ) {
		ajaxResponse_ResponseText__From_ResponseBody_JSON = ajaxResponse_ResponseText_JSON.message;
	}

	
	if ( ajaxResponse_StatusCode === WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT_STATUS_CODE &&
		ajaxResponse_ResponseText__From_ResponseBody_JSON === WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT ) {

		//  reload current URL, pick up new tacking code and new Javascript code

		limelight__ReloadPage_Function()

		return true;

	} else if ( ajaxResponse_StatusCode === AJAX_RESPONSE_NO_SESSION_STATUS_CODE &&
			ajaxResponse_ResponseText__From_ResponseBody_JSON === AJAX_RESPONSE_NO_SESSION_TEXT ) {
		

		//  reload current URL
		
		limelight__ReloadPage_Function()
		
		return;
		
		
	} else if ( ajaxResponse_StatusCode === AJAX_RESPONSE_FORBIDDEN_STATUS_CODE &&
				ajaxResponse_ResponseText__From_ResponseBody_JSON === AJAX_RESPONSE_FORBIDDEN_TEXT ) {


		//  reload current URL
		
		limelight__ReloadPage_Function()
		
		return;
		
		
	} else if ( ajaxResponse_StatusCode === AJAX_RESPONSE_INVALID_SEARCH_LIST_ACROSS_PROJECTS_STATUS_CODE &&
				ajaxResponse_ResponseText__From_ResponseBody_JSON === AJAX_RESPONSE_INVALID_SEARCH_LIST_ACROSS_PROJECTS_TEXT ) {
		 
		showAjaxErrorMsg( { 
			 errorPageElementId : "ajax_error_invalid_search_list_across_projects_text_msg",
			 errorMsg : "Invalid Search list, it crosses projects" } );
		 

	} else if ( ajaxResponse_StatusCode === INVALID_SEARCH_LIST_NOT_IN_DB_STATUS_CODE &&
				ajaxResponse_ResponseText__From_ResponseBody_JSON === INVALID_SEARCH_LIST_NOT_IN_DB_TEXT ) {
		
		 showAjaxErrorMsg( { 
			 errorPageElementId : "ajax_error_invalid_search_list_not_in_db_text_msg",
			 errorMsg : "Invalid Search list, at least one search not found in database.  Please start over at the project or the project list." } );
		 
	} else if ( ajaxResponse_StatusCode === AJAX_RESPONSE_INVALID_PARAMETER_STATUS_CODE &&
			ajaxResponse_ResponseText__From_ResponseBody_JSON === AJAX_RESPONSE_INVALID_PARAMETER_TEXT ) {

		showAjaxErrorMsg( { errorMsg : "Invalid parameter passed to server" } );

		
		//  jqXHR_responseText is '' or '' to provide a cause

	} else if ( ajaxResponse_StatusCode === 401 ) {
		
		showAjaxErrorMsg( { errorMsg : "401 received, responseText: " + ajaxResponse_ResponseText__From_ResponseBody_JSON  } );
							
	} else if ( ajaxResponse_StatusCode === 403 ) {
		
		showAjaxErrorMsg( { errorMsg : "403 received, responseText: " + ajaxResponse_ResponseText__From_ResponseBody_JSON } );
			
	} else if ( ajaxResponse_StatusCode === 404 ) {
		
		showAjaxErrorMsg( { errorMsg : "404 received, service not found on server, textStatus: " + textStatus__LOCAL  } );
			

	} else if ( ajaxResponse_StatusCode === 500 ) {
		
		showAjaxErrorMsg( { errorMsg : "Internal Server error, status code 500, textStatus: " + textStatus__LOCAL  } );

	} else if ( ajaxResponse_StatusCode === 503 ) {

		showAjaxErrorMsg( { errorMsg : "Internal Server error, status code 503, textStatus: " + textStatus__LOCAL  } );

	} else if ( ajaxResponse_StatusCode === 0 ) {

		showAjaxErrorMsg( { errorMsg : "Internal Server error, status code 0, textStatus: " + textStatus__LOCAL  } );

	} else {
		
		try {
			const msg = (
				 "Response HTTP Status Code from server not an expected status. HTTP Status Code: " + ajaxResponse_StatusCode
				+ ", textStatus: " + textStatus__LOCAL
				+ ", text response from, server: " + ajaxResponse_ResponseText_JSON_String
			);

			console.log( msg );

			//  Create error to send to server
			throw Error( msg );

		} catch( e ) {
			try {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e, webserviceURL: url } );
			} catch( e2 ) {
				console.log("reportWebErrorToServer.reportErrorObjectToServer threw exception:")
				console.log( e2 );
			}
		}

		showAjaxErrorMsg( { errorMsg : "HTTP Status Code: " + ajaxResponse_StatusCode + ", textStatus: " + textStatus__LOCAL } );
	}
	
	
	
}


function showAjaxErrorMsg( params: {
							   errorPageElementId?: string
							   errorMsg: string
						   }
	) {

	if ( beforeUnloadEvent_Triggered ) {

		//  Before Unload Event Triggered so skip

		return;  // EARLY RETURN
	}

	var errorPageElementId = params.errorPageElementId;
	var errorMsg = params.errorMsg;
	
	if ( errorPageElementId  ) {

		var $msg = $("#" + errorPageElementId );
		
		if ( $msg.length === 0 ) {
			
			showAjaxErrorMsgFromMsg( { errorMsg : errorMsg } );
			
		} else {
			
			$(".overlay_show_hide_parts_jq").hide();
			
			$msg.show();
			
			window.scroll(0, 0);  // scroll to top left, assuming message is in that corner
		}
		
	} else {
		
		showAjaxErrorMsgFromMsg( { errorMsg : errorMsg } );
		
		
	}
	
	
}
	

function showAjaxErrorMsgFromMsg( params: any ) {

	if ( beforeUnloadEvent_Triggered ) {

		//  Before Unload Event Triggered so skip

		return;  // EARLY RETURN
	}

	try {

		var errorMsg = params.errorMsg;

		if ( ! errorMsg || errorMsg === "" )  {

			throw Error( "No value passed in params.errorMsg to function showAjaxErrorMsgFromMsg( params )" );
		}

//		alert( errorMsg );

		var html = '<div style="position: absolute; background-color: white; z-index: 10000; top:40px; left:40px; width:500px; padding: 10px; border-width: 5px; border-color: red; border-style: solid;" >'

			+ '<h1 style="color: red;">Error accessing server</h1>'

			+ '<h3>Please reload the page and try again.</h3>'
			+ '<h3>If this error continues to occur, please contact the person at the bottom of the page, if someone is listed there.</h3>'

			+ '<br><br>'

			+ 'Error Message:<br>'

			+ errorMsg

			+ '<br><br>'

			+ '</div>';


		$("body").append( html );

		window.scroll(0, 0);  // scroll to top left, assuming message is in that corner
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}
}
	
export { handleAJAXFailure, handleRawAJAXError, handleAJAXError }
