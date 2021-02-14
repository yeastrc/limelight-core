/**
 * newURL_Build_PerProjectSearchIds_Or_ExperimentId.ts
 * 
 * Javascript:   
 * 
 * Given pageControllerPath, experimentId, searchDataLookupParamsCode, pageStateIdentifier, pageStateString, referrer
 * Create a new URL:
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

import { _PATH_SEPARATOR, _EXPERIMENT_ID_IDENTIFIER, _SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER /*  Only for Experiment Id based pages */ } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { controller_path_prefix_ProjectSearchId_Based_FromDOM, controller_path_prefix_ExperimentId_Based_FromDOM } from 'page_js/data_pages/data_pages_common/controllerPath_Prefixes_FromDOM';

/**
 * Given pageControllerPath, experimentId, searchDataLookupParamsCode, pageStateIdentifier, pageStateString, referrer
 * Create a new URL:
 */
export const newURL_Build_PerProjectSearchIds_Or_ExperimentId = function(
	{
		pageControllerPath, experimentId, searchDataLookupParamsCode, pageStateIdentifier, pageStateString, referrer
	}: {
		pageControllerPath: any, experimentId: any, searchDataLookupParamsCode: any, pageStateIdentifier: any, pageStateString: any, referrer: any
	} ) {


	const controller_path_prefix_ProjectSearchId_Based = controller_path_prefix_ProjectSearchId_Based_FromDOM();
	const controller_path_prefix_ExperimentId_Based = controller_path_prefix_ExperimentId_Based_FromDOM();

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

	let newURL = undefined;
	
	if ( pageControllerPath.includes( controller_path_prefix_ProjectSearchId_Based ) ) {

		//  Project Search Id Based:

		if ( searchDataLookupParamsCode === undefined || searchDataLookupParamsCode === null || searchDataLookupParamsCode === "" ) {
			const msg = "ERROR: newURL_Build_PerProjectSearchIds: pageControllerPath includes '" + controller_path_prefix_ProjectSearchId_Based + "' but no value for 'searchDataLookupParamsCode'. pageControllerPath: " + pageControllerPath;
			console.warn( msg );
			throw Error( msg );
		}
	
		newURL = pageControllerPath + searchDataLookupParamsCode + newURL_PageStateWithStateIdentifier;
	
	} else if ( pageControllerPath.includes( controller_path_prefix_ExperimentId_Based ) ) {

		//  Experiment Id Based:

		if ( experimentId === undefined || experimentId === null || experimentId === "" ) {
			const msg = "ERROR: newURL_Build_PerProjectSearchIds: pageControllerPath includes '" + controller_path_prefix_ExperimentId_Based + "' but no value for 'experimentId'. pageControllerPath: " + experimentId;
			console.warn( msg );
			throw Error( msg );
		}

		let searchDataLookupParamsCodeSection = "";
		if ( searchDataLookupParamsCode !== undefined && searchDataLookupParamsCode !== null && searchDataLookupParamsCode !== "" ) {
			// Have value for searchDataLookupParamsCodeSection so format that portion of the URL
			searchDataLookupParamsCodeSection = _PATH_SEPARATOR + _SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER + _PATH_SEPARATOR + searchDataLookupParamsCode;
		}

		newURL = pageControllerPath + _EXPERIMENT_ID_IDENTIFIER + _PATH_SEPARATOR + experimentId + searchDataLookupParamsCodeSection + newURL_PageStateWithStateIdentifier;
	
	} else {
		const msg = "ERROR: newURL_Build_PerProjectSearchIds: pageControllerPath does not include '" + controller_path_prefix_ProjectSearchId_Based + "' or '" + controller_path_prefix_ExperimentId_Based + "'. pageControllerPath: " + pageControllerPath;
		console.warn( msg );
		throw Error( msg );
	}

	return newURL;
}
