/**
 * parseURL_Into_PageStateParts.js
 * 
 * Javascript for getting searchDataLookupParametersCode, pageStateIdentifier, pageState, referrer 
 *           - pageState(as a single string)
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM.js';

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants.js';

/**
 * 
 */
export class ParseURL_Into_PageStateParts {

	/**
	 * 
	 */
	constructor() {
		
		
	}

	/**
	 * @return { searchDataLookupParametersCode, pageStateIdentifier, pageStateString, referrer }
	 */
	parseURL_Into_PageStateParts() {
		
		let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
				
		//  Get URL after pageControllerPath
		
		let windowPath = window.location.pathname;
		
		if ( windowPath.endsWith( "/" ) ) {
			//  Remove trailing "/"
			windowPath = windowPath.substring( 0, windowPath.length - 1 );
		}
			
		let pageControllerPath_Index = windowPath.indexOf( pageControllerPath );
		if ( pageControllerPath_Index === -1 ) {
			throw Error( "Page controller path not found in window path.  windowPath: " + windowPath );
		}
		let index_AfterPageController = pageControllerPath_Index + pageControllerPath.length;
		
		let windowPath_After_pageControllerPath = windowPath.substring( index_AfterPageController );

		// Split URL after pageControllerPath on _PATH_SEPARATOR ('/')

		let windowPath_After_pageControllerPathSplitSlash = windowPath_After_pageControllerPath.split( _PATH_SEPARATOR );
		
		if ( windowPath_After_pageControllerPathSplitSlash.length !== 1 && 
				windowPath_After_pageControllerPathSplitSlash.length !== 2 &&
				windowPath_After_pageControllerPathSplitSlash.length !== 3 &&
				windowPath_After_pageControllerPathSplitSlash.length !== 4 ) {

			throw Error( "URI Path after controller path does not contain 1, 2, 3 or 4 elements when split on '" + 
					_PATH_SEPARATOR + "'.  Number of elements: " + windowPath_After_pageControllerPathSplitSlash.length +
					", windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
		}
		
		//  These next 2 checks should not fail since the server side will return 404 for any value but 'r'
		
		//  If length is 2, then 2nd value must be _REFERRER_PATH_STRING (r)
		if ( windowPath_After_pageControllerPathSplitSlash.length === 2 ) {
			if ( windowPath_After_pageControllerPathSplitSlash[ 1 ] !== _REFERRER_PATH_STRING ) {
				
				//  TODO  Present user an error message with link to take them back to project
				
				throw Error( "URI Path after controller path contains 2 elements when split on '" + 
						_PATH_SEPARATOR + "' and 2nd element is not '" + _REFERRER_PATH_STRING + "'." +
						"  windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
			}
		} 

		//  If length is 4, then 4th value must be _REFERRER_PATH_STRING (r)
		if ( windowPath_After_pageControllerPathSplitSlash.length === 4 ) {
			if ( windowPath_After_pageControllerPathSplitSlash[ 3 ] !== _REFERRER_PATH_STRING ) {
				
				//  TODO  Present user an error message with link to take them back to project
				
				throw Error( "URI Path after controller path contains 4 elements when split on '" + 
						_PATH_SEPARATOR + "' and 4th element is not '" + _REFERRER_PATH_STRING + "'." +
						"  windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
			}
		} 

		// Process URL Path Parts
		
		
		//   Process other page state, just saving string (and label before it) off to returned object
		
		let searchDataLookupParametersCode = undefined;
		let pageStateIdentifier = undefined;
		let pageStateString = undefined;
		let referrer = undefined;
		
		if ( windowPath_After_pageControllerPathSplitSlash.length >= 1 ) {
			searchDataLookupParametersCode = windowPath_After_pageControllerPathSplitSlash[ 0 ];
		}
		if ( windowPath_After_pageControllerPathSplitSlash.length === 2 ) {
			referrer = windowPath_After_pageControllerPathSplitSlash[ 1 ];
		}
		if ( windowPath_After_pageControllerPathSplitSlash.length >= 3 ) {
			pageStateIdentifier = windowPath_After_pageControllerPathSplitSlash[ 1 ];
			pageStateString = windowPath_After_pageControllerPathSplitSlash[ 2 ];
		}
		if ( windowPath_After_pageControllerPathSplitSlash.length >= 4 ) {
			referrer = windowPath_After_pageControllerPathSplitSlash[ 3 ];
		}
		
		// Object to return
		const pageStateParts = { 
				searchDataLookupParametersCode,
				pageStateIdentifier,
				pageStateString,
				referrer
		};

		return pageStateParts;
	};
	
}
