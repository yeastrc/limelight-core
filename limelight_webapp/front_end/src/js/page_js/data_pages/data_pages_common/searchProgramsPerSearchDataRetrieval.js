/**
 * searchProgramsPerSearchDataRetrieval.js
 * 
 * Javascript for retrieving Search Programs Per Search data for project search ids 
 * 
 * page variable: searchProgramsPerSearchDataRetrieval
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


//module import 

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

const _SEARCH_PROGRAMS_PER_SEARCH_DATA_KEY_PROJECT_SEARCH_ID_DPSM = dataPageStateManager_Keys.SEARCH_PROGRAMS_PER_SEARCH_DATA_KEY_PROJECT_SEARCH_ID_DPSM;


/**
 * 
 */
export class SearchProgramsPerSearchDataRetrieval {

	/**
	 * 
	 */
	constructor() {}
	
	/**
	 * return Promise, if anything to load.  Otherwise return null
	 */
	retrieveSearchProgramsPerSearchData( 
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
			dataPageStateManager_DataFrom_Server ) {

		let projectSearchIds = // array
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.getPageState( dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM );

		let searchProgramsPerSearchDataLoaded = 
			dataPageStateManager_DataFrom_Server.getPageStateAllowNotInPageState( _SEARCH_PROGRAMS_PER_SEARCH_DATA_KEY_PROJECT_SEARCH_ID_DPSM );
		
		let projectSearchIds_dataNotLoadedObj = {};
		
		let found_projectSearchId_ToLoad = false;
		
		//  Some data loaded so only load 'missing' search names
			
		projectSearchIds.forEach(function( projectSearchIdSingleString, index, array) {

			// Not already loading for this project search id

			if ( ( ! searchProgramsPerSearchDataLoaded ) || ( ! searchProgramsPerSearchDataLoaded[ projectSearchIdSingleString ] ) ) {
				// no data for project search id, so add to loading list (object to drop dups)
				projectSearchIds_dataNotLoadedObj[ projectSearchIdSingleString ] = projectSearchIdSingleString;
				found_projectSearchId_ToLoad = true;
			}
		}, this );

		if ( ! found_projectSearchId_ToLoad ) {
			// nothing new to load so return null
			return null;
		}

		let projectSearchIds_dataNotLoadedArray = Object.keys( projectSearchIds_dataNotLoadedObj );
		
		//  Return created Promise
		return this._retrieveSearchProgramsPerSearchDataFromAJAX( 
				projectSearchIds_dataNotLoadedArray, 
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
				dataPageStateManager_DataFrom_Server );
	}
	

	/**
	 * return Promise
	 */
	_retrieveSearchProgramsPerSearchDataFromAJAX( 
			projectSearchIds_dataNotLoadedArray, 
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
			dataPageStateManager_DataFrom_Server ) {

		let objectThis = this;

		let retrieval = function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let _URL = "d/rws/for-page/psb/search-programs-per-search-list-from-psi/" + getWebserviceSyncTrackingCode();

			let requestObj = { projectSearchIds : projectSearchIds_dataNotLoadedArray };

			let requestData = JSON.stringify( requestObj );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						objectThis._retrieveSearchProgramsPerSearchDataFromAJAXResponse( {
								requestData, responseData, 
								dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
								dataPageStateManager_DataFrom_Server, 
								projectSearchIds_dataNotLoadedArray 
						} );
						
						resolve( { sucess : true } );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );

						reject( { fail : true } );

						throw e;
					}
				},
				failure: function(errMsg) {
					
					handleAJAXFailure( errMsg );

					reject();
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( { fail : true } );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		}

		return new Promise( retrieval );
	};

	/**
	 * 
	 */
	_retrieveSearchProgramsPerSearchDataFromAJAXResponse( {
			requestData, responseData, 
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
			dataPageStateManager_DataFrom_Server, 
			projectSearchIds_dataNotLoadedArray } ) {
		
		let perSearchList = responseData.perSearchList;

		if ( ! perSearchList ) {
			throw Error("SearchProgramsPerSearch List return is empty. projectSearchIds_dataNotLoadedArray: " + projectSearchIds_dataNotLoadedArray.join( '_' ));
		}
		
		let searchProgramsPerSearchDataLoaded = 
			dataPageStateManager_DataFrom_Server.getPageStateAllowNotInPageState( _SEARCH_PROGRAMS_PER_SEARCH_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

		if ( ! searchProgramsPerSearchDataLoaded ) {
			searchProgramsPerSearchDataLoaded = {};
		}
		
		perSearchList.forEach(function( perSearchListArrayItem, index, array ) {
			
			//  Convert SearchProgramsPerSearch list to objects keyed on SearchProgramsPerSearch Id which is then stored in local variable

			let searchProgramsPerSearchsAsObjectMap = {};
			
			perSearchListArrayItem.searchProgramsPerSearchs.forEach(function( searchProgramsPerSearchsArrayItem, index, array ) {
				searchProgramsPerSearchsAsObjectMap[ searchProgramsPerSearchsArrayItem.searchProgramsPerSearchId ] = searchProgramsPerSearchsArrayItem;
			}, this );
			
			//  Put in object, key projectSearchId
			searchProgramsPerSearchDataLoaded[ perSearchListArrayItem.projectSearchId ] = searchProgramsPerSearchsAsObjectMap;
			
		}, this );
		
		//  Save Data to state manager
		dataPageStateManager_DataFrom_Server.setPageState( 
				dataPageStateManager_Keys.SEARCH_PROGRAMS_PER_SEARCH_DATA_KEY_PROJECT_SEARCH_ID_DPSM,
				searchProgramsPerSearchDataLoaded );
	};

};
