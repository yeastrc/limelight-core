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

import {
	_PATH_SEPARATOR,
	_EXPERIMENT_ID_IDENTIFIER,
	_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER,
	_FEATURE_DETECTION_ENCODED_IDENTIFIER /*  Only for Experiment Id based pages */
} from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import {
	controller_path_prefix_ProjectSearchId_Based_FromDOM,
	controller_path_prefix_ExperimentId_Based_FromDOM,
	controller_path_prefix_FeatureDetectionId_Based_FromDOM, controller_path_prefix_ProjectScanFileId_Based_FromDOM
} from 'page_js/data_pages/data_pages_common/controllerPath_Prefixes_FromDOM';

/**
 * Given pageControllerPath, experimentId, searchDataLookupParamsCode, pageStateIdentifier, pageStateString, referrer
 * Create a new URL:
 */
export const newURL_Build_PerProjectSearchIds_Or_ExperimentId = function(
	{
		pageControllerPath, experimentId, featureDetectionId_Encoded, projectScanFileId_Encoded, searchDataLookupParamsCode, pageStateIdentifier, pageStateString, referrer
	}: {
		pageControllerPath: any, experimentId: any, featureDetectionId_Encoded?: any, projectScanFileId_Encoded?: any, searchDataLookupParamsCode: any, pageStateIdentifier: any, pageStateString: any, referrer: any
	} ) {


	const controller_path_prefix_ProjectSearchId_Based = controller_path_prefix_ProjectSearchId_Based_FromDOM();
	const controller_path_prefix_ExperimentId_Based = controller_path_prefix_ExperimentId_Based_FromDOM();
	const controller_path_prefix_FeatureDetectionId_Based = controller_path_prefix_FeatureDetectionId_Based_FromDOM()
	const controller_path_prefix_ProjectScanFileId_Based = controller_path_prefix_ProjectScanFileId_Based_FromDOM()

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
			const msg = "ERROR: newURL_Build_PerProjectSearchIds: pageControllerPath includes '" + controller_path_prefix_ExperimentId_Based + "' but no value for 'experimentId'. pageControllerPath: " + pageControllerPath;
			console.warn( msg );
			throw Error( msg );
		}

		let searchDataLookupParamsCodeSection = "";
		if ( searchDataLookupParamsCode !== undefined && searchDataLookupParamsCode !== null && searchDataLookupParamsCode !== "" ) {
			// Have value for searchDataLookupParamsCodeSection so format that portion of the URL
			searchDataLookupParamsCodeSection = _PATH_SEPARATOR + _SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER + _PATH_SEPARATOR + searchDataLookupParamsCode;
		}

		newURL = pageControllerPath + _EXPERIMENT_ID_IDENTIFIER + _PATH_SEPARATOR + experimentId + searchDataLookupParamsCodeSection + newURL_PageStateWithStateIdentifier;

	} else if ( pageControllerPath.includes( controller_path_prefix_FeatureDetectionId_Based ) ) {

		//  Feature Detection Id Based:

		if ( featureDetectionId_Encoded === undefined || featureDetectionId_Encoded === null || featureDetectionId_Encoded === "" ) {

			//  NO value for featureDetectionId_Encoded so get it from URL

			const pathBefore__featureDetectionId_Encoded = pageControllerPath + _FEATURE_DETECTION_ENCODED_IDENTIFIER + _PATH_SEPARATOR

			let windowPath = window.location.pathname;

			const pathBefore__featureDetectionId_Encoded_Index = windowPath.indexOf( pathBefore__featureDetectionId_Encoded );
			if ( pathBefore__featureDetectionId_Encoded_Index === -1 ) {
				throw Error( "pathBefore__featureDetectionId_Encoded not found in window path.  windowPath: " + windowPath );
			}
			const index_StartingAt__featureDetectionId_Encoded = pathBefore__featureDetectionId_Encoded_Index + pathBefore__featureDetectionId_Encoded.length;

			const path_StartingAt__featureDetectionId_Encoded = windowPath.substring( index_StartingAt__featureDetectionId_Encoded );

			featureDetectionId_Encoded = path_StartingAt__featureDetectionId_Encoded

			const index__PathSeparatorAfter__featureDetectionId_Encoded = path_StartingAt__featureDetectionId_Encoded.indexOf( _PATH_SEPARATOR )
			if ( pathBefore__featureDetectionId_Encoded_Index !== -1 ) {

				featureDetectionId_Encoded = featureDetectionId_Encoded.substring(0, index__PathSeparatorAfter__featureDetectionId_Encoded)
			}

			// const msg = "ERROR: newURL_Build_PerProjectSearchIds: pageControllerPath includes '" + controller_path_prefix_FeatureDetectionId_Based + "' but no value for 'featureDetectionId_Encoded'. pageControllerPath: " + pageControllerPath;
			// console.warn( msg );
			// throw Error( msg );
		}

		let searchDataLookupParamsCodeSection = "";
		if ( searchDataLookupParamsCode !== undefined && searchDataLookupParamsCode !== null && searchDataLookupParamsCode !== "" ) {
			// Have value for searchDataLookupParamsCodeSection so format that portion of the URL
			searchDataLookupParamsCodeSection = _PATH_SEPARATOR + _SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER + _PATH_SEPARATOR + searchDataLookupParamsCode;
		}

		newURL = pageControllerPath + _FEATURE_DETECTION_ENCODED_IDENTIFIER + _PATH_SEPARATOR + featureDetectionId_Encoded + searchDataLookupParamsCodeSection + newURL_PageStateWithStateIdentifier;

	} else if ( pageControllerPath.includes( controller_path_prefix_ProjectScanFileId_Based ) ) {

		//  Project Scan File Id Based:

		if ( projectScanFileId_Encoded === undefined || projectScanFileId_Encoded === null || projectScanFileId_Encoded === "" ) {

			//  NO value for projectScanFileId_Encoded so get it from URL

			const pathBefore__projectScanFileId_Encoded = pageControllerPath + _FEATURE_DETECTION_ENCODED_IDENTIFIER + _PATH_SEPARATOR

			let windowPath = window.location.pathname;

			const pathBefore__projectScanFileId_Encoded_Index = windowPath.indexOf( pathBefore__projectScanFileId_Encoded );
			if ( pathBefore__projectScanFileId_Encoded_Index === -1 ) {
				throw Error( "pathBefore__projectScanFileId_Encoded not found in window path.  windowPath: " + windowPath );
			}
			const index_StartingAt__projectScanFileId_Encoded = pathBefore__projectScanFileId_Encoded_Index + pathBefore__projectScanFileId_Encoded.length;

			const path_StartingAt__projectScanFileId_Encoded = windowPath.substring( index_StartingAt__projectScanFileId_Encoded );

			projectScanFileId_Encoded = path_StartingAt__projectScanFileId_Encoded

			const index__PathSeparatorAfter__projectScanFileId_Encoded = path_StartingAt__projectScanFileId_Encoded.indexOf( _PATH_SEPARATOR )
			if ( pathBefore__projectScanFileId_Encoded_Index !== -1 ) {

				projectScanFileId_Encoded = projectScanFileId_Encoded.substring(0, index__PathSeparatorAfter__projectScanFileId_Encoded)
			}

			// const msg = "ERROR: newURL_Build_PerProjectSearchIds: pageControllerPath includes '" + controller_path_prefix_FeatureDetectionId_Based + "' but no value for 'projectScanFileId_Encoded'. pageControllerPath: " + pageControllerPath;
			// console.warn( msg );
			// throw Error( msg );
		}

		let searchDataLookupParamsCodeSection = "";
		if ( searchDataLookupParamsCode !== undefined && searchDataLookupParamsCode !== null && searchDataLookupParamsCode !== "" ) {
			// Have value for searchDataLookupParamsCodeSection so format that portion of the URL
			searchDataLookupParamsCodeSection = _PATH_SEPARATOR + _SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER + _PATH_SEPARATOR + searchDataLookupParamsCode;
		}

		newURL = pageControllerPath + _FEATURE_DETECTION_ENCODED_IDENTIFIER + _PATH_SEPARATOR + projectScanFileId_Encoded + searchDataLookupParamsCodeSection + newURL_PageStateWithStateIdentifier;

	} else {
		const msg = "ERROR: newURL_Build_PerProjectSearchIds: pageControllerPath does not include '" + controller_path_prefix_ProjectSearchId_Based + "' or '" + controller_path_prefix_ExperimentId_Based + "'. pageControllerPath: " + pageControllerPath;
		console.warn( msg );
		throw Error( msg );
	}

	return newURL;
}
