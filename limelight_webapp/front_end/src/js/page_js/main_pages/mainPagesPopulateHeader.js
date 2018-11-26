/**
 * mainPagesPopulateHeader.js
 * 
 * Javascript for body_section_start_include_every_page.jsp page section  
 * 
 * page variable: mainPagesPopulateHeader
 * 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  Relative import - works
import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';


/**
 * 
 */
export class MainPagesPopulateHeader {

	/**
	 * 
	 */
	constructor(  ) {
		
	};
		
	/**
	 * initialize the page (Add element listeners like onClick, ...)
	 */
	initialize(  ) {

//		this.getUserInfo();
		
		this._initializeCalled = true;
	};

//	/**
//	 * 
//	 */
//	getUserInfo() {
//
//		var objectThis = this;
//		
//		var contentType = _AJAX_POST_JSON_CONTENT_TYPE;
//
//		var _URL = "user/rws/for-page/userInfo/" + getWebserviceSyncTrackingCode();
//		
//		var requestObj = { };
//
//		var requestData = JSON.stringify( requestObj );
//
//		// var request =
//		$.ajax({
//			type : "POST",
//			url : _URL,
//			data : requestData,
//			contentType: _AJAX_POST_JSON_CONTENT_TYPE,
//			dataType : "json",
//			success : function(data) {
//
//				try {
//
//					objectThis.getUserInfoResponse(requestData, data);
//
//				} catch( e ) {
//					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//					throw e;
//				}
//			},
//			failure: function(errMsg) {
//				handleAJAXFailure( errMsg );
//			},
//			error : function(jqXHR, textStatus, errorThrown) {
//
//				handleAJAXError(jqXHR, textStatus, errorThrown);
//
//				// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
//				// textStatus: " + textStatus );
//			}
//		});
//
//	};
//
//	/**
//	 * 
//	 */
//	getUserInfoResponse(requestData, responseData) {
//
//		if ( ! responseData.success ) {
//			//  No User Info
//			
//			
//			return; // EARY EXIT
//		}
//
//		var userInfo = responseData;
//		
//		$("#page_header_username").text( userInfo.username );
//		$("#page_header_email").text( userInfo.email );
//		$("#page_header_first_name").text( userInfo.firstName );
//		$("#page_header_last_name").text( userInfo.lastName );
//		$("#page_header_organization").text( userInfo.organization );
//
//	};

};

