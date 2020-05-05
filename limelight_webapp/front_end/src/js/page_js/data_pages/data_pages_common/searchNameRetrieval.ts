/**
 * searchNameRetrieval.ts
 * 
 * Javascript for managing the Searches Details and Searches Filter block 
 * at the top of project search id driven pages
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { limelight__IsVariableAString } from 'page_js/common_all_pages/limelight__IsVariableAString';
import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

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
	retrieveSearchNames({ 
		
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
		dataPageStateManager_DataFrom_Server,
	} : { 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
		dataPageStateManager_DataFrom_Server : DataPageStateManager
	}) : Promise<any> { 
		
		if ( ! dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay ) {
			throw Error("No dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay");
		}
		if ( ! dataPageStateManager_DataFrom_Server ) {
			throw Error("No dataPageStateManager_DataFrom_Server");
		}
		
		let projectSearchIds = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		//  Initially assume All projectSearchIds need to be loaded
		let projectSearchIds_dataNotLoadedArray : Array<number> = projectSearchIds;

		//  currently loaded search names
		let searchNames_AsMap = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

		if ( searchNames_AsMap && searchNames_AsMap.size !== 0 ) {

			//  Have some loaded so need to determine which are not loaded and update projectSearchIds_dataNotLoadedArray

			let projectSearchIds_dataNotLoaded_Set : Set<number> = new Set();

			//  Identify project search ids for data to be loaded

			for ( const projectSearchId of projectSearchIds ) {

				// Not already loading for this project search id
				if ( ! searchNames_AsMap.has( projectSearchId ) ) {
					projectSearchIds_dataNotLoaded_Set.add( projectSearchId );
				}
			}
			
			if ( projectSearchIds_dataNotLoaded_Set.size === 0 ) {
				// nothing new to load so return null
				
				return null; //  EARLY RETURN
			}

			projectSearchIds_dataNotLoadedArray = Array.from( projectSearchIds_dataNotLoaded_Set );
		}

		//  Return created Promise
		return this._retrieveSearchNamesFromAJAX(
			projectSearchIds_dataNotLoadedArray, 
			// dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
			dataPageStateManager_DataFrom_Server 
		);
	}


	/**
	 * return Promise
	 */
	private _retrieveSearchNamesFromAJAX( 

		projectSearchIds_dataNotLoadedArray : Array<number>, 
		// dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager, 
		dataPageStateManager_DataFrom_Server : DataPageStateManager
	) : Promise<any> {

		let retrieval = ( resolve, reject ) => {
		  try {
			let requestObj = { projectSearchIds : projectSearchIds_dataNotLoadedArray };

			const url = "d/rws/for-page/psb/search-name-list-from-psi";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

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
					this._retrieveSearchNamesResponse(
						responseData, 
						dataPageStateManager_DataFrom_Server, 
						projectSearchIds_dataNotLoadedArray 
					);
					
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
	}

	/**
	 * 
	 */
	private _retrieveSearchNamesResponse(
		responseData, //  Data from webservice
		dataPageStateManager_DataFrom_Server : DataPageStateManager, 
		projectSearchIds_dataNotLoadedArray : Array<number>
	) : void {

		let searchList = responseData.searchList;

		if ( ! searchList ) {
			throw Error("Search List return is empty. projectSearchIds_dataNotLoadedArray: " + projectSearchIds_dataNotLoadedArray.join( '_' ));
		}

		let searchNames_AsMap = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

		if ( ! searchNames_AsMap ) {
			searchNames_AsMap = new Map();
		}
		for ( const searchListItem of searchList ) {
			//  Validate searchListItem
			if ( ! limelight__IsVariableAString( searchListItem.name ) ) {
				const msg = "SearchNameRetrieval: searchListItem.name is not a string. searchListItem.name: " + searchListItem.name;
				console.warn( msg );
				throw Error( msg );
			}
			if ( ! variable_is_type_number_Check( searchListItem.projectSearchId ) ) {
				const msg = "SearchNameRetrieval: searchListItem.projectSearchId is not a number. searchListItem.projectSearchId: " + searchListItem.projectSearchId;
				console.warn( msg );
				throw Error( msg );
			}
			if ( ! variable_is_type_number_Check( searchListItem.searchId ) ) {
				const msg = "SearchNameRetrieval: searchListItem.searchId is not a number. searchListItem.searchId: " + searchListItem.searchId;
				console.warn( msg );
				throw Error( msg );
			}
			const projectSearchId : number = searchListItem.projectSearchId;
			const itemToStore = {
				projectSearchId : searchListItem.projectSearchId,
				searchId : searchListItem.searchId,
				name : searchListItem.name
			};

			searchNames_AsMap.set( projectSearchId, itemToStore );
			
			// searchNamesLoaded[ projectSearchId ] = itemToStore;
		}

		//  Save Data to state manager
		dataPageStateManager_DataFrom_Server.set_searchNames_AsMap( searchNames_AsMap );
		// dataPageStateManager_DataFrom_Server.set_searchNames( searchNamesLoaded );
	}


}

