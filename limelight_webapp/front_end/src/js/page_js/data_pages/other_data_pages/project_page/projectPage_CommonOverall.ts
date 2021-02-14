/**
 * projectPage_CommonOverall.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Common Overall JS across User Types 
 * 
 * 
 */


import { addToolTips } from 'page_js/common_all_pages/genericToolTip';


/**
 * 
 */
export class ProjectPage_CommonOverall {

	private _initializeCalled: boolean

	/**
	 * 
	 */
	constructor() {

		this._initializeCalled = false;
	}

	/**
	 * 
	 */
	initialize() {


        //  Add tooltips that are in the JSP for class 'selector_tool_tip_attached'
        
        const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
        
		addToolTips( $data_page_overall_enclosing_block_div );  // External Function


        this._initializeCalled = true;
    }

}
