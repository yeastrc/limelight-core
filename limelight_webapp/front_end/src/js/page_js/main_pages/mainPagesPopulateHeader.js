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
// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

// import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

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
//		var requestObj = { };
//
//  Untested change:

		// const url = "user/rws/for-page/userInfo";

		// const promise_webserviceCallStandardPost = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		// promise_webserviceCallStandardPost.catch( () => { }  );

		// promise_webserviceCallStandardPost.then( ({ responseData }) => {
//				try {
//
//					objectThis.getUserInfoResponse(requestData, data);
//
//				} catch( e ) {
//					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//					throw e;
//				}
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

