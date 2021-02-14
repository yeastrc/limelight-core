
/**
 * updatePageState_URL_With_NewFilterCutoffs_FromUser.ts
 * 
 * Javascript:  Update Page State and URL with new Filter Cutoffs From User
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';
import { newURL_Build_PerProjectSearchIds_Or_ExperimentId }  from './newURL_Build_PerProjectSearchIds_Or_ExperimentId';


import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { limelight__IsVariableAString } from 'page_js/common_all_pages/limelight__IsVariableAString';
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";

/**
 * 
 */
export class UpdatePageState_URL_With_NewFilterCutoffs_FromUser {

	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

	private _parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();

	/**
	 * 
	 */
	constructor( { searchDetailsBlockDataMgmtProcessing } : { searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing } ) {
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
	}
	
	/**
	 * 
	 */
	updatePageState_URL_With_NewFilterCutoffs_FromUser( { searchDetails_Filters_AnnTypeDisplay_Root } : { searchDetails_Filters_AnnTypeDisplay_Root :  SearchDataLookupParameters_Root } ) {

		let call_updatePageState_URL_With_NewFilterCutoffs_FromUser_Internal = (resolve: any, reject: any) => {
			try {
				_updatePageState_URL_With_NewFilterCutoffs_FromUser_Internal( { 
					
					searchDetails_Filters_AnnTypeDisplay_Root, resolve ,reject, 
					_searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
					_parseURL_Into_PageStateParts : this._parseURL_Into_PageStateParts
				} );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}
		let updatePromise = new Promise( call_updatePageState_URL_With_NewFilterCutoffs_FromUser_Internal );
		return updatePromise;
	}
}


/**
 * 
 */
const _updatePageState_URL_With_NewFilterCutoffs_FromUser_Internal = function( { 
	
	searchDetails_Filters_AnnTypeDisplay_Root, resolve, reject, _searchDetailsBlockDataMgmtProcessing, _parseURL_Into_PageStateParts
} : {
	searchDetails_Filters_AnnTypeDisplay_Root :  SearchDataLookupParameters_Root //  Should be : SearchDataLookupParameters_Root but not for sure have the actual instances of the classes
	resolve: any,
	reject: any,
	_searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
	_parseURL_Into_PageStateParts : ParseURL_Into_PageStateParts
} ) {

	// Update JS variables with new filter cutoffs
	_searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root({
		searchDetails_Filters_AnnTypeDisplay_Root : searchDetails_Filters_AnnTypeDisplay_Root, dataPageStateManager : undefined 
	} );

	let searchDataLookupParamsRoot = searchDetails_Filters_AnnTypeDisplay_Root;

	let call_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs = function(resolve: any, reject: any) {
		try {
			_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs( { searchDataLookupParamsRoot, resolve, reject } );
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}
	
	new Promise<string>( call_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs ).then(function( searchDataLookupParamsCode ) {
		try {
			if ( ! searchDataLookupParamsCode ) {
				console.warn( "searchDataLookupParamsCode not populated" );
				reject( "searchDataLookupParamsCode not populated" );
			}
			
			_updateURL_withNew_searchDataLookupParamsCode( { searchDataLookupParamsCode_New : searchDataLookupParamsCode, _parseURL_Into_PageStateParts } );
			
			resolve();
			
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}, function(reason) {
		try {
			reject(reason);
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	})
}

/**
 * 
 */
const _updateURL_withNew_searchDataLookupParamsCode = function( { searchDataLookupParamsCode_New, _parseURL_Into_PageStateParts } : { 
	
	searchDataLookupParamsCode_New: string,
	_parseURL_Into_PageStateParts : ParseURL_Into_PageStateParts 
} ) {
	
	// Current URL contents
	const pageStatePartsFromURL = _parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();
	
	let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
			
	let newURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({ 
		pageControllerPath, 
		searchDataLookupParamsCode : searchDataLookupParamsCode_New, 
		pageStateIdentifier : pageStatePartsFromURL.pageStateIdentifier,
		pageStateString : pageStatePartsFromURL.pageStateString, 
		referrer : pageStatePartsFromURL.referrer,
		experimentId : undefined
	} );
	
	window.history.replaceState( null, null, newURL );

	navigation_dataPages_Maint_Instance.updateNavLinks();
}

/**
 * Get searchDataLookupParamsCode for searchDataLookupParamsRoot
 */
const _getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs = function( { searchDataLookupParamsRoot, resolve, reject } : {

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

	const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

	const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

	promise_webserviceCallStandardPost.catch( () => {
		try { 
			reject();
		} catch (e) {
			reportWebErrorToServer.reportErrorObjectToServer({ errorException : e });
			throw e;
		}
	});

	promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
		try {
			let searchDataLookupParamsCode = responseData.searchDataLookupParamsCode;
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
		