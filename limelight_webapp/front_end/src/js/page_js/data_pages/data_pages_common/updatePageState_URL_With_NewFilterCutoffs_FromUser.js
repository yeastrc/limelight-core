
/**
 * updatePageState_URL_With_NewFilterCutoffs_FromUser.js
 * 
 * Javascript:  Update Page State and URL with new Filter Cutoffs From User
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts.js';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM.js';
import { newURL_Build_PerProjectSearchIds_Or_ExperimentId }  from './newURL_Build_PerProjectSearchIds_Or_ExperimentId.js';


import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants.js';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_dataPages_Maint.js';

/**
 * 
 */
export class UpdatePageState_URL_With_NewFilterCutoffs_FromUser {

	/**
	 * 
	 */
	constructor( { searchDetailsBlockDataMgmtProcessing } ) {
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

		this._parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();
	}
	
	/**
	 * 
	 */
	updatePageState_URL_With_NewFilterCutoffs_FromUser( { searchDetails_Filters_AnnTypeDisplay_Root } ) {

		let objectThis = this;
		
		let call_updatePageState_URL_With_NewFilterCutoffs_FromUser_Internal = function(resolve, reject) {
			try {
				objectThis._updatePageState_URL_With_NewFilterCutoffs_FromUser_Internal( { searchDetails_Filters_AnnTypeDisplay_Root, resolve ,reject } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}
		let updatePromise = new Promise( call_updatePageState_URL_With_NewFilterCutoffs_FromUser_Internal );
		return updatePromise;
	}

	/**
	 * 
	 */
	_updatePageState_URL_With_NewFilterCutoffs_FromUser_Internal( { searchDetails_Filters_AnnTypeDisplay_Root, resolve, reject } ) {

		let objectThis = this;
		
		// Update JS variables with new filter cutoffs
		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( 
				{ searchDetails_Filters_AnnTypeDisplay_Root : searchDetails_Filters_AnnTypeDisplay_Root } );

		let searchDataLookupParamsRoot = searchDetails_Filters_AnnTypeDisplay_Root;

		let call_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs = function(resolve, reject) {
			try {
				objectThis._getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs( { searchDataLookupParamsRoot, resolve, reject } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}
		
		new Promise( call_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs ).then(function( params ) {
			try {
				let searchDataLookupParamsCode = undefined;
				if ( params ) {
					searchDataLookupParamsCode = params.searchDataLookupParamsCode;
				}
				if ( ! searchDataLookupParamsCode ) {
					console.log("searchDataLookupParamsCode not populated");
					reject("searchDataLookupParamsCode not populated");
				}
				
				objectThis._updateURL_withNew_searchDataLookupParamsCode( { searchDataLookupParamsCode_New : searchDataLookupParamsCode } );
				
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
	_updateURL_withNew_searchDataLookupParamsCode( { searchDataLookupParamsCode_New } ) {
		
		// Current URL contents
		const pageStatePartsFromURL = this._parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();
		
		let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
				
		let newURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({ 
			pageControllerPath, 
			searchDataLookupParamsCode : searchDataLookupParamsCode_New, 
			pageStateIdentifier : pageStatePartsFromURL.pageStateIdentifier,
			pageStateString : pageStatePartsFromURL.pageStateString, 
			referrer : pageStatePartsFromURL.referrer 
		} );
		
		window.history.replaceState( null, null, newURL );

		navigation_dataPages_Maint_Instance._updateNavLinks();
	}

	/**
	 * Get searchDataLookupParamsCode for searchDataLookupParamsRoot
	 */
	_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs( { searchDataLookupParamsRoot, resolve, reject } ) {

//		if (!this._initializeCalled) {
//			throw Error("initialize method not called");
//		}

		let objectThis = this;
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

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				let searchDataLookupParamsCode = responseData.searchDataLookupParamsCode;
				if (!searchDataLookupParamsCode) {
					reject("No value for responseData.searchDataLookupParamsCode");
				}

				resolve( { searchDataLookupParamsCode } );

			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({ errorException : e });
				throw e;
			}
		});
	}

}
		