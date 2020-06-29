/**
 * parseURL_Into_PageStateParts.ts
 * 
 * Javascript for getting searchDataLookupParametersCode, pageStateIdentifier, pageState, referrer 
 *           - pageState(as a single string)
 * 
 * This Reads from the URL in the address bar
 * 
 * 
 * For Project Search Id based Data pages:
 * 
 *    ..pagename/searchDataLookupParametersCode/q/page_state_string
 *    
 *    Nav from project page:
 *       ...pagename/searchDataLookupParametersCode/r
 *    
 *    Nav from other page:
 *       ...pagename/searchDataLookupParametersCode/q/page_state_string/r
 * 
 * For Experiment Id based Data Pages
 * 
 *     ..pagename/e/{experimentId}/q/page_state_string
 * 
 *    User changed Search Filters or Annotation Types to Desplay:
 *        ..pagename/e/{experimentId}/c/{searchDataLookupParametersCode}/q/page_state_string
 * 
 *    Nav from project page:
 *         ..pagename/e/{experimentId}/r
 * 
 *    Nav from other page:
 *         ..pagename/e/{experimentId}/q/page_state_string/r
 *       or
 *         ..pagename/e/{experimentId}/c/{searchDataLookupParametersCode}/q/page_state_string/r
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { controller_path_prefix_ProjectSearchId_Based_FromDOM, controller_path_prefix_ExperimentId_Based_FromDOM } from 'page_js/data_pages/data_pages_common/controllerPath_Prefixes_FromDOM';

import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';

import { _PATH_SEPARATOR, _EXPERIMENT_ID_IDENTIFIER, _SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

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
		
		const pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

		const controller_path_prefix_ProjectSearchId_Based = controller_path_prefix_ProjectSearchId_Based_FromDOM();
		const controller_path_prefix_ExperimentId_Based = controller_path_prefix_ExperimentId_Based_FromDOM();

		// console.log("parseURL_Into_PageStateParts(): controller_path_prefix_ProjectSearchId_Based: " + controller_path_prefix_ProjectSearchId_Based + ", controller_path_prefix_ExperimentId_Based: " + controller_path_prefix_ExperimentId_Based )
				
		//  Get URL after pageControllerPath
		
		let windowPath = window.location.pathname;
		
		if ( windowPath.endsWith( "/" ) ) {
			//  Remove trailing "/"
			windowPath = windowPath.substring( 0, windowPath.length - 1 );
		}


		let is_ProjectSearchId_Based_URL = false;
		let is_ExperimentId_Based_URL = false;
		
		{
			const projectSearchId_Based_URL_Index = windowPath.indexOf( controller_path_prefix_ProjectSearchId_Based );
			if ( projectSearchId_Based_URL_Index !== -1 ) {
				//  URL is ProjectSearchId Based
				is_ProjectSearchId_Based_URL = true;
			} else {
				const experimentId_Based_URL_Index = windowPath.indexOf( controller_path_prefix_ExperimentId_Based );
				if ( experimentId_Based_URL_Index !== -1 ) {
					//  URL is Experiment Based
					is_ExperimentId_Based_URL = true;
				} else {
					const msg = "ERROR: Page URL is not Project Search Id Based or Experiment Id Based.  Page URL: " + windowPath;
					console.warn( msg );
					throw Error( msg );
				}
			}
		}
		
			
		const pageControllerPath_Index = windowPath.indexOf( pageControllerPath );
		if ( pageControllerPath_Index === -1 ) {
			throw Error( "Page controller path not found in window path.  windowPath: " + windowPath );
		}
		const index_AfterPageController = pageControllerPath_Index + pageControllerPath.length;
		
		const windowPath_After_pageControllerPath = windowPath.substring( index_AfterPageController );

		//   FAKE VALUE


		// const windowPath_After_pageControllerPath = "e/20/c/oooo/r";

		// console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		// console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		// console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		// console.warn("FAKE VALUE FOR windowPath_After_pageControllerPath: " + windowPath_After_pageControllerPath );
		// console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		// console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		// console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");


		// Split URL after pageControllerPath on _PATH_SEPARATOR ('/')

		const windowPath_After_pageControllerPathSplitSlash = windowPath_After_pageControllerPath.split( _PATH_SEPARATOR );


		// Process URL Path Parts
		
		
		//   Process other page state, just saving string (and label before it) off to returned object
		
		let experimentId = undefined;
		let searchDataLookupParametersCode = undefined;
		let pageStateIdentifier = undefined;
		let pageStateString = undefined;
		let referrer = undefined;

		if ( is_ProjectSearchId_Based_URL ) {

			//  Project Search Id based URL:

			if ( windowPath_After_pageControllerPathSplitSlash.length !== 1 && 
					windowPath_After_pageControllerPathSplitSlash.length !== 2 &&
					windowPath_After_pageControllerPathSplitSlash.length !== 3 &&
					windowPath_After_pageControllerPathSplitSlash.length !== 4 ) {

				throw Error( "URI Path for Project search id based URL after controller path does not contain 1, 2, 3 or 4 elements when split on '" + 
						_PATH_SEPARATOR + "'.  Number of elements: " + windowPath_After_pageControllerPathSplitSlash.length +
						", windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
			}
			
			//  These next 2 checks should not fail since the server side will return 404 for any value but 'r'
			
			//  If length is 2, then 2nd value must be _REFERRER_PATH_STRING (r)
			if ( windowPath_After_pageControllerPathSplitSlash.length === 2 ) {
				if ( windowPath_After_pageControllerPathSplitSlash[ 1 ] !== _REFERRER_PATH_STRING ) {
					
					//  TODO  Present user an error message with link to take them back to project
					
					throw Error( "URI Path for Project search id based URL after controller path contains 2 elements when split on '" + 
							_PATH_SEPARATOR + "' and 2nd element is not '" + _REFERRER_PATH_STRING + "'." +
							"  windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
				}
			} 

			//  If length is 4, then 4th value must be _REFERRER_PATH_STRING (r)
			if ( windowPath_After_pageControllerPathSplitSlash.length === 4 ) {
				if ( windowPath_After_pageControllerPathSplitSlash[ 3 ] !== _REFERRER_PATH_STRING ) {
					
					//  TODO  Present user an error message with link to take them back to project
					
					throw Error( "URI Path for Project search id based URL after controller path contains 4 elements when split on '" + 
							_PATH_SEPARATOR + "' and 4th element is not '" + _REFERRER_PATH_STRING + "'." +
							"  windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
				}
			} 

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

		} else if ( is_ExperimentId_Based_URL ) {

			//  Experiment Id based URL:
			/*
			*     ..pagename/e/{experimentId}/q/page_state_string
			* 
			*    User changed Search Filters or Annotation Types to Desplay:
			*        ..pagename/e/{experimentId}/c/{searchDataLookupParametersCode}/q/page_state_string
			* 
			*    Nav from project page:
			*         ..pagename/e/{experimentId}/r
			* 
			*    Nav from other page:
			*         ..pagename/e/{experimentId}/q/page_state_string/r
			*       or
			*         ..pagename/e/{experimentId}/c/{searchDataLookupParametersCode}/q/page_state_string/r
			*/ 

			if ( windowPath_After_pageControllerPathSplitSlash.length < 2 ||
				windowPath_After_pageControllerPathSplitSlash.length > 7 ) {

				throw Error( "URI Path for Experiment id based URL after controller path does not contain 2, 3, 4, 5, 6 or 7 elements when split on '" + 
						_PATH_SEPARATOR + "'.  Number of elements: " + windowPath_After_pageControllerPathSplitSlash.length +
						", windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
			}

			//  The first identifier has to be _EXPERIMENT_ID_IDENTIFIER (e)
			if ( windowPath_After_pageControllerPathSplitSlash[ 0 ] !== _EXPERIMENT_ID_IDENTIFIER ) {
				
				//  TODO  Present user an error message with link to take them back to project
				
				throw Error( "URI Path for Experiment id based URL after controller path contains 2 elements when split on '" + 
						_PATH_SEPARATOR + "' and 1st element is not '" + _EXPERIMENT_ID_IDENTIFIER + "'." +
						"  windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
			} 
			
			//  These next 2 checks should not fail since the server side will return 404 for any value but 'r'
			
			//  If length is 3, then 2nd value must be _REFERRER_PATH_STRING (r)
			// if ( windowPath_After_pageControllerPathSplitSlash.length === 2 ) {
			// 	if ( windowPath_After_pageControllerPathSplitSlash[ 1 ] !== _REFERRER_PATH_STRING ) {
					
			// 		//  TODO  Present user an error message with link to take them back to project
					
			// 		throw Error( "URI Path for Experiment id based URL after controller path contains 2 elements when split on '" + 
			// 				_PATH_SEPARATOR + "' and 2nd element is not '" + _REFERRER_PATH_STRING + "'." +
			// 				"  windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
			// 	}
			// } 

			// //  If length is 4, then 4th value must be _REFERRER_PATH_STRING (r)
			// if ( windowPath_After_pageControllerPathSplitSlash.length === 4 ) {
			// 	if ( windowPath_After_pageControllerPathSplitSlash[ 3 ] !== _REFERRER_PATH_STRING ) {
					
			// 		//  TODO  Present user an error message with link to take them back to project
					
			// 		throw Error( "URI Path for Experiment id based URL after controller path contains 4 elements when split on '" + 
			// 				_PATH_SEPARATOR + "' and 4th element is not '" + _REFERRER_PATH_STRING + "'." +
			// 				"  windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
			// 	}
			// } 

			experimentId = windowPath_After_pageControllerPathSplitSlash[ 1 ];

			let nextPartPartToParseIndex = 2;  // set after experiment id
			
			// searchDataLookupParametersCode
			if ( windowPath_After_pageControllerPathSplitSlash.length > nextPartPartToParseIndex && windowPath_After_pageControllerPathSplitSlash[ nextPartPartToParseIndex ] === _SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER ) {
				//  next element is 'c'

				nextPartPartToParseIndex++; //  Advance past 'c' to searchDataLookupParametersCode

				if ( windowPath_After_pageControllerPathSplitSlash.length <= nextPartPartToParseIndex  ) {
					//  nextPartPartToParseIndex does not exist in array
					//    Value is required after 'c'
					const msg = "ERROR parsing URL:  have '" + _SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER + "' but no value after it. windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath + "  ::  windowPath: " + windowPath;
					console.warn( msg );
					throw Error( msg );
				}

				searchDataLookupParametersCode = windowPath_After_pageControllerPathSplitSlash[ nextPartPartToParseIndex ];

				nextPartPartToParseIndex++; //  Advance past searchDataLookupParametersCode
			}

			// pageStateString
			if ( windowPath_After_pageControllerPathSplitSlash.length > nextPartPartToParseIndex  && windowPath_After_pageControllerPathSplitSlash[ nextPartPartToParseIndex ] === _STANDARD_PAGE_STATE_IDENTIFIER ) {
				//  Found next element contains 'q'
				
				pageStateIdentifier = windowPath_After_pageControllerPathSplitSlash[ nextPartPartToParseIndex ];

				nextPartPartToParseIndex++; //  Advance past 'q' to pageStateString

				if ( windowPath_After_pageControllerPathSplitSlash.length <= nextPartPartToParseIndex  ) {
					//  nextPartPartToParseIndex does not exist in array
					//    Value is required after 'q'
					const msg = "ERROR parsing URL:  have '" + _STANDARD_PAGE_STATE_IDENTIFIER + "' but no value after it. windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath + "  ::  windowPath: " + windowPath;
					console.warn( msg );
					throw Error( msg );
				}

				pageStateString = windowPath_After_pageControllerPathSplitSlash[ nextPartPartToParseIndex ];

				nextPartPartToParseIndex++; //  Advance past pageStateString
			}
				
			// referrer
			if ( windowPath_After_pageControllerPathSplitSlash.length > nextPartPartToParseIndex  && windowPath_After_pageControllerPathSplitSlash[ nextPartPartToParseIndex ] === _REFERRER_PATH_STRING ) {
				//  Found next element contains 'r'
				referrer = windowPath_After_pageControllerPathSplitSlash[ nextPartPartToParseIndex ];

				nextPartPartToParseIndex++; //  Advance past referrer
			}

			if ( nextPartPartToParseIndex !== windowPath_After_pageControllerPathSplitSlash.length ) {
				const msg = "ERROR parsing URL:  have more values than expected. windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath + "  ::  windowPath: " + windowPath;
				console.warn( msg );
				throw Error( msg );
			}

		} else {
			const msg = "ERROR: is_ProjectSearchId_Based_URL and is_ExperimentId_Based_URL are both false.  Page URL: " + windowPath;
			console.warn( msg );
			throw Error( msg );
		}
		
		// Object to return
		const pageStateParts = { 
			experimentId,  //  Only populated for experiment id based pages
			searchDataLookupParametersCode,
			pageStateIdentifier,
			pageStateString,
			referrer
		};

		return pageStateParts;
	};
	
}
