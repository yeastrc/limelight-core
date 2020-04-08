/**
 * handleServicesAJAXErrors.js
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


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

const WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT = "webservice_sync_tracking_code_mismatch_text";
const WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT_STATUS_CODE = 400;

var AJAX_RESPONSE_NO_SESSION_TEXT = "no_session";
var AJAX_RESPONSE_NO_SESSION_STATUS_CODE = 401;

var AJAX_RESPONSE_FORBIDDEN_TEXT = "forbidden";
var AJAX_RESPONSE_FORBIDDEN_STATUS_CODE = 403;

var AJAX_RESPONSE_INVALID_SEARCH_LIST_ACROSS_PROJECTS_TEXT = "invalid_search_list_across_projects_text";
var AJAX_RESPONSE_INVALID_SEARCH_LIST_ACROSS_PROJECTS_STATUS_CODE = 403;

var INVALID_SEARCH_LIST_NOT_IN_DB_TEXT = "invalid_search_list_not_in_db_text";
var INVALID_SEARCH_LIST_NOT_IN_DB_STATUS_CODE = 400;

var AJAX_RESPONSE_INVALID_PARAMETER_TEXT = "invalid_parameter";
var AJAX_RESPONSE_INVALID_PARAMETER_STATUS_CODE = 400;



/////////////////////

//Handle when AJAX call gets failure

function handleAJAXFailure( errMsg ) {

	showAjaxErrorMsgFromMsg( { errorMsg : "Connecting to server failed: " + errMsg } );
}


/////////////////////

//  Handle when AJAX call gets error, non-jQuery Direct use of var xhr = new XMLHttpRequest();

function handleRawAJAXError( xhr ) {

	var jqXHR_statusCode = xhr.status;
	var jqXHR_responseText_String = xhr.response;
	
	
	if ( jqXHR_statusCode === WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT_STATUS_CODE &&
		jqXHR_responseText_String === WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT ) { 

		//  reload current URL, pick up new tacking code and new Javascript code

		window.location.reload(true);

		return true;

	} else if ( jqXHR_statusCode === AJAX_RESPONSE_NO_SESSION_STATUS_CODE &&
			jqXHR_responseText_String === AJAX_RESPONSE_NO_SESSION_TEXT ) { 
		

		//  reload current URL
		
		window.location.reload(true);
		
		return true;


	} else if ( jqXHR_statusCode === AJAX_RESPONSE_FORBIDDEN_STATUS_CODE &&
			jqXHR_responseText_String === AJAX_RESPONSE_FORBIDDEN_TEXT ) { 


		//  reload current URL

		window.location.reload(true);

		return true;
	}

	return false;
}


/////////////////////

//  Handle when AJAX call gets error

function handleAJAXError( jqXHR, textStatus, errorThrown ) {

	var jqXHR_responseText = "Unknown Error";
	
	var jqXHR_statusCode = jqXHR.status;
	var jqXHR_responseText_JSON_String = jqXHR.responseText; //  Actually JSON 

	var jqXHR_responseText_JSON = undefined;
	
	try {
		jqXHR_responseText_JSON = window.JSON.parse( jqXHR_responseText_JSON_String );
	} catch( e ) {
//		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		
		//  Unable to parse JSON so display on page
		// showAjaxErrorMsg( { errorMsg : "exception: " + errorThrown + ", jqXHR: " + jqXHR + ", textStatus: " + textStatus } );

		// throw e;
	}
	
	if ( jqXHR_responseText_JSON ) {
		jqXHR_responseText = jqXHR_responseText_JSON.message;
	}

	
	if ( jqXHR_statusCode === WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT_STATUS_CODE &&
		jqXHR_responseText === WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT ) { 

		//  reload current URL, pick up new tacking code and new Javascript code

		window.location.reload(true);

		return true;

	} else if ( jqXHR_statusCode === AJAX_RESPONSE_NO_SESSION_STATUS_CODE &&
			jqXHR_responseText === AJAX_RESPONSE_NO_SESSION_TEXT ) { 
		

		//  reload current URL
		
		window.location.reload(true);
		
		return;
		
		
	} else if ( jqXHR_statusCode === AJAX_RESPONSE_FORBIDDEN_STATUS_CODE &&
				jqXHR_responseText === AJAX_RESPONSE_FORBIDDEN_TEXT ) { 


		//  reload current URL
		
		window.location.reload(true);
		
		return;
		
		
	} else if ( jqXHR_statusCode === AJAX_RESPONSE_INVALID_SEARCH_LIST_ACROSS_PROJECTS_STATUS_CODE &&
				jqXHR_responseText === AJAX_RESPONSE_INVALID_SEARCH_LIST_ACROSS_PROJECTS_TEXT ) { 
		 
		showAjaxErrorMsg( { 
			 errorPageElementId : "ajax_error_invalid_search_list_across_projects_text_msg",
			 errorMsg : "Invalid Search list, it crosses projects" } );
		 

	} else if ( jqXHR_statusCode === INVALID_SEARCH_LIST_NOT_IN_DB_STATUS_CODE &&
				jqXHR_responseText === INVALID_SEARCH_LIST_NOT_IN_DB_TEXT ) { 
		
		 showAjaxErrorMsg( { 
			 errorPageElementId : "ajax_error_invalid_search_list_not_in_db_text_msg",
			 errorMsg : "Invalid Search list, at least one search not found in database.  Please start over at the project or the project list." } );
		 
	} else if ( jqXHR_statusCode === AJAX_RESPONSE_INVALID_PARAMETER_STATUS_CODE &&
			jqXHR_responseText === AJAX_RESPONSE_INVALID_PARAMETER_TEXT ) { 

		showAjaxErrorMsg( { errorMsg : "Invalid parameter passed to server" } );

		
		//  jqXHR_responseText is '' or '' to provide a cause

	} else if ( jqXHR_statusCode === 401 ) {
		
		showAjaxErrorMsg( { errorMsg : "401 received, responseText: " + jqXHR_responseText  } );
							
	} else if ( jqXHR_statusCode === 403 ) {
		
		showAjaxErrorMsg( { errorMsg : "403 received, responseText: " + jqXHR_responseText } );
			
	} else if ( jqXHR_statusCode === 404 ) {
		
		showAjaxErrorMsg( { errorMsg : "404 received, service not found on server, textStatus: " + textStatus  } );
			

	} else if ( jqXHR_statusCode === 500 ) {
		
		showAjaxErrorMsg( { errorMsg : "Internal Server error, status code 500, textStatus: " + textStatus  } );
		
	} else {
		
		try {
			const msg = (
				 "Response HTTP Status Code from server not an expected status. HTTP Status Code: " + jqXHR_statusCode 
				+ ", textStatus: " + textStatus 
				+ ", jqXHR.responseText: " + jqXHR.responseText
			);

			console.log( msg );

			//  Create error to send to server
			throw Error( msg );
		} catch( e ) {
			try {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			} catch( e2 ) {
				console.log("reportWebErrorToServer.reportErrorObjectToServer threw exception:")
				console.log( e2 );
			}
		}

		showAjaxErrorMsg( { errorMsg : "exception: " + errorThrown + ", jqXHR: " + jqXHR + ", HTTP Status Code: " + jqXHR_statusCode + ", textStatus: " + textStatus } );
	}
	
	
	
}


function showAjaxErrorMsg( params ) {
	
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
	

function showAjaxErrorMsgFromMsg( params ) {
	
	try {

		var errorMsg = params.errorMsg;

		if ( ! errorMsg || errorMsg === "" )  {

			throw Error( "No value passed in params.errorMsg to function showAjaxErrorMsgFromMsg( params )" );
		}

//		alert( errorMsg );

		var html = '<div style="position: absolute; background-color: white; z-index: 10000; top:40px; left:40px; width:500px; padding: 10px; border-width: 5px; border-color: red; border-style: solid;" >'

			+ '<h1 style="color: red;">Error accessing server</h1>'

			+ '<h3>Please reload the page and try again.</h3>'
			+ '<h3>If this error continues to occur, please contact the person at the bottom of the page.</h3>'

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
