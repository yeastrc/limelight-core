
/**
 * updatePageState_URL_With_New_SearchDataLookupParameters_Root.ts
 * 
 * Javascript:  Update Page State and URL with new SearchDataLookupParameters_Root Object
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';
import { newURL_Build_PerProjectSearchIds_Or_ExperimentId }  from './newURL_Build_PerProjectSearchIds_Or_ExperimentId';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint';
import { limelight__IsVariableAString } from 'page_js/common_all_pages/limelight__IsVariableAString';
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
	limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function
} from "page_js/common_all_pages/limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function";

/**
 *
 */
export const updatePageState_URL_With_New_SearchDataLookupParameters_Root = function(
	{
		searchDetails_Filters_AnnTypeDisplay_Root
	} : {
		searchDetails_Filters_AnnTypeDisplay_Root :  SearchDataLookupParameters_Root //  Should be : SearchDataLookupParameters_Root but not for sure have the actual instances of the classes

	} ) : Promise<void> {

	return new Promise<void>( (resolve, reject) => {
		try {
			const searchDataLookupParamsRoot = searchDetails_Filters_AnnTypeDisplay_Root;

			const call_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs = function(resolve: any, reject: any) {
				try {
					_getSearchDataLookupParamsCode_ForUpdated_SearchDataLookupParameters_Root( { searchDataLookupParamsRoot, resolve, reject } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			}

			const promise = new Promise<string>( call_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs );

			promise.catch( (reason) => {
				try {
					reject(reason);
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			})

			promise.then(function( searchDataLookupParamsCode ) {
				try {
					if ( ! searchDataLookupParamsCode ) {
						console.warn( "searchDataLookupParamsCode not populated" );
						reject( "searchDataLookupParamsCode not populated" );
					}

					_updateURL_withNew_searchDataLookupParamsCode( { searchDataLookupParamsCode_New : searchDataLookupParamsCode } );

					resolve();

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});

		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	})
}

/**
 * 
 */
const _updateURL_withNew_searchDataLookupParamsCode = function( { searchDataLookupParamsCode_New } : {
	
	searchDataLookupParamsCode_New: string
} ) {

	const parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();

	// Current URL contents
	const pageStatePartsFromURL = parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();
	
	let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
			
	let newURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({ 
		pageControllerPath, 
		searchDataLookupParamsCode : searchDataLookupParamsCode_New, 
		pageStateIdentifier : pageStatePartsFromURL.pageStateIdentifier,
		pageStateString : pageStatePartsFromURL.pageStateString, 
		referrer : pageStatePartsFromURL.referrer,
		experimentId : undefined
	} );

	limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function({ newURL })

	navigation_dataPages_Maint_Instance.updateNavLinks();
}

/**
 * Get searchDataLookupParamsCode for searchDataLookupParamsRoot
 */
const _getSearchDataLookupParamsCode_ForUpdated_SearchDataLookupParameters_Root = function( { searchDataLookupParamsRoot, resolve, reject } : {

	searchDataLookupParamsRoot :  SearchDataLookupParameters_Root  //  Should be : SearchDataLookupParameters_Root but not for sure have the actual instances of the classes
	resolve: any
	reject: any
} ) {

	if (!searchDataLookupParamsRoot) {
		throw Error("No value for searchDataLookupParamsRoot")
	}
	
	let requestObj = {
			searchDataLookupParamsRoot : searchDataLookupParamsRoot,
			sjklwuiowerzUIryhnIOWzq : true
	};

	const url = "d/rws/for-page/psb/get-search-data-lookup-params-code";

	const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

	const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

	promise_webserviceCallStandardPost.catch( (reason) => {
		try { 
			reject(reason);
		} catch (e) {
			reportWebErrorToServer.reportErrorObjectToServer({ errorException : e });
			throw e;
		}
	});

	promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
		try {
			let searchDataLookupParamsCode = responseData.searchDataLookupParamsCode as string;
			if ( ! searchDataLookupParamsCode ) {
				const msg = "_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs: No value for responseData.searchDataLookupParamsCode";
				console.warn( msg );
				reject( msg );
			}

			if ( ! limelight__IsVariableAString( searchDataLookupParamsCode ) ) {
				const msg = "_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs: searchDataLookupParamsCode is not a string. searchDataLookupParamsCode: " + searchDataLookupParamsCode;
				console.warn( msg );
				reject( msg );
			}

			resolve( searchDataLookupParamsCode );

		} catch (e) {
			reportWebErrorToServer.reportErrorObjectToServer({ errorException : e });
			throw e;
		}
	});
}
		