/**
 * newURL_Build_PerProjectSearchIds.js
 * 
 * Javascript:   
 * 
 * Given pageControllerPath, searchDataLookupParamsCode, pageStateIdentifier, pageStateString, referrer
 * Create a new URL:
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

import { _PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants.js';

/**
 * 
 */
export class NewURL_Build_PerProjectSearchIds {

	/**
	 * For params, build a new URL
	 */
	static newURL_Build_PerProjectSearchIds( { pageControllerPath, searchDataLookupParamsCode, pageStateIdentifier, pageStateString, referrer } ) {

		let newURL_PageStateWithStateIdentifier = "";
		
		if ( pageStateString ) {
			if ( ! pageStateIdentifier ) {
				throw Error("pageState populated but pageStateIdentifier not populated");
			}
			newURL_PageStateWithStateIdentifier = 
				_PATH_SEPARATOR +
				pageStateIdentifier + 
				_PATH_SEPARATOR +
				pageStateString;
			
			if ( referrer ) {
				newURL_PageStateWithStateIdentifier += _PATH_SEPARATOR + referrer;
			}
		}

		let newURL = 
			pageControllerPath + searchDataLookupParamsCode + newURL_PageStateWithStateIdentifier;
		
		return newURL;
	}
	
	
}