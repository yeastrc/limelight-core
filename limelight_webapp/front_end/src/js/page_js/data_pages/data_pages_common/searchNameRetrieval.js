/**
 * searchNameRetrieval.js
 * 
 * Javascript for managing the Searches Details and Searches Filter block 
 * at the top of project search id driven pages
 * 
 * page variable: searchNameRetrieval
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//module import 

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

/**
 * 
 */
export class SearchNameRetrieval {

	/**
	 * 
	 */
	constructor() {}

	/**
	 * return Promise, if anything to load.  Otherwise return null
	 */
	retrieveSearchNames( { dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, dataPageStateManager_DataFrom_Server } ) {

		if ( ! dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay ) {
			throw Error("No dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay");
		}
		if ( ! dataPageStateManager_DataFrom_Server ) {
			throw Error("No dataPageStateManager_DataFrom_Server");
		}
		
		let projectSearchIds = // array
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.getPageState(dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM);

		let searchNamesLoaded = dataPageStateManager_DataFrom_Server.getPageStateAllowNotInPageState(dataPageStateManager_Keys.SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM);

		let projectSearchIds_dataNotLoadedObj = {};

		let found_projectSearchId_ToLoad = false;

		//  Identify project search ids for data to be loaded

		projectSearchIds.forEach(function(projectSearchIdSingleString, index, array) {

			// Not already loading for this project search id
			if ( ( ! searchNamesLoaded ) || ( ! searchNamesLoaded[projectSearchIdSingleString] ) ) {
				projectSearchIds_dataNotLoadedObj[projectSearchIdSingleString] = projectSearchIdSingleString;
				found_projectSearchId_ToLoad = true;
			}
		}, this);
		
		if ( ! found_projectSearchId_ToLoad ) {
			// nothing new to load so return null
			return null;
		}

		let projectSearchIds_dataNotLoadedArray = Object.keys(projectSearchIds_dataNotLoadedObj);

		//  Return created Promise
		return this._retrieveSearchNamesFromAJAX(
				projectSearchIds_dataNotLoadedArray, 
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, dataPageStateManager_DataFrom_Server );
	}


	/**
	 * return Promise
	 */
	_retrieveSearchNamesFromAJAX( 
			projectSearchIds_dataNotLoadedArray, 
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
			dataPageStateManager_DataFrom_Server ) {

		let objectThis = this;

		let retrieval = function( resolve, reject ) {
		  try {
			let requestObj = { projectSearchIds : projectSearchIds_dataNotLoadedArray };

			const url = "d/rws/for-page/psb/search-name-list-from-psi";

			const promise_webserviceCallStandardPost = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

			promise_webserviceCallStandardPost.catch( () => {
				try { 
					reject();
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				} 
			});

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					objectThis._retrieveSearchNamesResponse( {
							responseData, 
							dataPageStateManager_DataFrom_Server, 
							projectSearchIds_dataNotLoadedArray } );
					
					resolve();

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}

			});
		  } catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		  }
		}

		return new Promise( retrieval );
	};

	/**
	 * 
	 */
	_retrieveSearchNamesResponse( {
			responseData, 
			dataPageStateManager_DataFrom_Server, 
			projectSearchIds_dataNotLoadedArray } ) {

		let searchList = responseData.searchList;

		if (!searchList) {
			throw Error("Search List return is empty. projectSearchIds_dataNotLoadedArray: " + projectSearchIds_dataNotLoadedArray.join( '_' ));
		}

		let searchNamesLoaded = dataPageStateManager_DataFrom_Server.getPageStateAllowNotInPageState(dataPageStateManager_Keys.SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM);

		if (!searchNamesLoaded) {
			searchNamesLoaded = {};
		}

		searchList.forEach(function(arrayItem, index, array) {
			searchNamesLoaded[arrayItem.projectSearchId] = arrayItem;
		}, this);

		//  Save Data to state manager
		dataPageStateManager_DataFrom_Server.setPageState(
			dataPageStateManager_Keys.SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM,
			searchNamesLoaded);
	};


}

