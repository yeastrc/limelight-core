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

import { addToolTips, addSingleGenericAppSpecificToolTip } from 'page_js/common_all_pages/genericToolTip';


//  Relative import - works
// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

// import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

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

		//  Add tooltips
        const $header_outer_container_div = $("#header_outer_container_div");
        
		addToolTips( $header_outer_container_div );  // External Function

		//  Add these tooltips directly since use different positioning

		//  Some of these DOM elements may not be on the page so skip any that are not on the page.

		// {
		// 	const $user_mgmt_header_link = $("#user_mgmt_header_link");
		// 	if ( $user_mgmt_header_link.length !== 0 ) {
		// 		this._addTooltipBelowRightAligned({ $element : $user_mgmt_header_link, adjustY : 10 });
		// 	}
		// }
		// {
		// 	const $sign_out_header_link = $("#sign_out_header_link");
		// 	if ( $sign_out_header_link.length !== 0 ) {
		// 		this._addTooltipBelowRightAligned({ $element : $sign_out_header_link, adjustY : 0 });
		// 	}
		// }
		// {
		// 	const $signin_header_link = $("#signin_header_link");
		// 	if ( $signin_header_link.length !== 0 ) {
		// 		this._addTooltipBelowRightAligned({ $element : $signin_header_link, adjustY : 0 });
		// 	}
		// }
		
//		this.getUserInfo();
		
		this._initializeCalled = true;
	};

	/**
	 * Add Tooltip Locked to show below and to right edge of display item
	 */
	// _addTooltipBelowRightAligned({ $element, adjustY }) {

	// 	const tooltipHTML = $element.attr("data-tooltip");		

	// 	$element.qtip( {
	// 		content: {
	// 			text: tooltipHTML
	// 		},
	// 		position: {
	// 			//  Position tooltip below display item (User Name) locked to right edge of display item.
	// 			my : 'top right',
	// 			at : 'bottom right',
	// 			adjust: { x: 0, y: adjustY },
	// 			// target: 'mouse',
	// 			// adjust: { x: 5, y: 5 }, // Offset it slightly from under the mouse
	// 			viewport: $(window)
	// 		 }
	// 	});		
	// }


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

        //         const webserviceCallStandardPostResponse =  webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        //         const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

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
//			return; // EARLY EXIT
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

