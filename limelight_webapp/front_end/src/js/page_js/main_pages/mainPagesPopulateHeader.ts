/**
 * mainPagesPopulateHeader.ts
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

import { addToolTips } from 'page_js/common_all_pages/genericToolTip';


/**
 * 
 */
export class MainPagesPopulateHeader {

	private _initializeCalled = false

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

		this._initializeCalled = true;
	};

};

