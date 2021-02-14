/**
 * searchProgramsPerSearchDataRetrieval.ts
 * 
 * Javascript for retrieving Search Programs Per Search data for project search ids 
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


//module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import { DataPageStateManager, SearchProgramsPerSearchData_Root, SearchProgramsPerSearchItems_PerProjectSearchId, SearchProgramsPerSearchItem } from './dataPageStateManager';
import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

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
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager, 
			dataPageStateManager_DataFrom_Server : DataPageStateManager ) : Promise<unknown> {

		let projectSearchIds = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		let projectSearchIds_dataNotLoadedArray = projectSearchIds; //  default to load all

		const searchProgramsPerSearchData_Root : SearchProgramsPerSearchData_Root = dataPageStateManager_DataFrom_Server.get_searchProgramsPerSearchData_Root();

		if ( searchProgramsPerSearchData_Root ) {

			//  Some data loaded so only load 'missing' search names

			const projectSearchIds_dataNotLoaded_Set : Set<number> = new Set();
			
			for ( const projectSearchId of projectSearchIds ) {

				// Not already loading for this project search id

				if ( ! searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.has( projectSearchId ) ) {
					// no data for project search id, so add to loading list
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
		return this._retrieveSearchProgramsPerSearchDataFromAJAX( 
				projectSearchIds_dataNotLoadedArray, 
				dataPageStateManager_DataFrom_Server );
	}
	

	/**
	 * return Promise
	 */
	_retrieveSearchProgramsPerSearchDataFromAJAX( 
			projectSearchIds_dataNotLoadedArray: any,
			dataPageStateManager_DataFrom_Server : DataPageStateManager ) : Promise<unknown>  {

		let objectThis = this;

		let retrieval = function( resolve: any, reject: any ) {
		  try {
			let requestObj = { projectSearchIds : projectSearchIds_dataNotLoadedArray };

			const url = "d/rws/for-page/psb/search-programs-per-search-list-from-psi";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => {
				try { 
					reject( { fail : true } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					reject( { fail : true } );
					throw e;
				}
			});

			promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
				try {
					objectThis._retrieveSearchProgramsPerSearchDataFromAJAXResponse( {
							responseData, 
							dataPageStateManager_DataFrom_Server, 
							projectSearchIds_dataNotLoadedArray 
					} );
					
					resolve( { sucess : true } );

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					reject( { fail : true } );
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
	_retrieveSearchProgramsPerSearchDataFromAJAXResponse({
		responseData, 
		dataPageStateManager_DataFrom_Server, 
		projectSearchIds_dataNotLoadedArray 
	} : {
		responseData: any,
		dataPageStateManager_DataFrom_Server : DataPageStateManager, 
		projectSearchIds_dataNotLoadedArray: any
	} ) {
		
		let perSearchList = responseData.perSearchList;

		if ( ! perSearchList ) {
			throw Error("SearchProgramsPerSearch List return is empty. projectSearchIds_dataNotLoadedArray: " + projectSearchIds_dataNotLoadedArray.join( '_' ));
		}
		
		let searchProgramsPerSearchData_Root : SearchProgramsPerSearchData_Root = dataPageStateManager_DataFrom_Server.get_searchProgramsPerSearchData_Root();

		if ( ! searchProgramsPerSearchData_Root ) {
			searchProgramsPerSearchData_Root = new SearchProgramsPerSearchData_Root();
		}
		
		perSearchList.forEach(function( perSearchListArrayItem: any, index: any, array: any ) {
			
			//  Convert SearchProgramsPerSearch list to ...

			if ( ! variable_is_type_number_Check( perSearchListArrayItem.projectSearchId ) ) {
				const msg = "perSearchListArrayItem.projectSearchId is not a number: " + perSearchListArrayItem.projectSearchId;
				console.warn( msg );
				throw Error( msg )
			}
			if ( ! variable_is_type_number_Check( perSearchListArrayItem.searchId ) ) {
				const msg = "perSearchListArrayItem.searchId is not a number: " + perSearchListArrayItem.searchId;
				console.warn( msg );
				throw Error( msg )
			}

			const searchProgramsPerSearchItems_PerProjectSearchId = new SearchProgramsPerSearchItems_PerProjectSearchId();
			searchProgramsPerSearchItems_PerProjectSearchId.projectSearchId = perSearchListArrayItem.projectSearchId
			searchProgramsPerSearchItems_PerProjectSearchId.searchId = perSearchListArrayItem.searchId

			perSearchListArrayItem.searchProgramsPerSearchs.forEach(function( searchProgramsPerSearchsArrayItem: any, index: any, array: any ) {

				if ( ! variable_is_type_number_Check( searchProgramsPerSearchsArrayItem.searchProgramsPerSearchId ) ) {
					const msg = "searchProgramsPerSearchsArrayItem.searchProgramsPerSearchId is not a number: " + searchProgramsPerSearchsArrayItem.searchProgramsPerSearchId;
					console.warn( msg );
					throw Error( msg )
				}
				if ( ! variable_is_type_number_Check( searchProgramsPerSearchsArrayItem.searchId ) ) {
					const msg = "searchProgramsPerSearchsArrayItem.searchId is not a number: " + searchProgramsPerSearchsArrayItem.searchId;
					console.warn( msg );
					throw Error( msg )
				}
				const searchProgramsPerSearchItem = new SearchProgramsPerSearchItem({
					searchProgramsPerSearchId : searchProgramsPerSearchsArrayItem.searchProgramsPerSearchId,
					searchId : searchProgramsPerSearchsArrayItem.searchId,
					name : searchProgramsPerSearchsArrayItem.name,
					description : searchProgramsPerSearchsArrayItem.description,
					displayName : searchProgramsPerSearchsArrayItem.displayName,
					version : searchProgramsPerSearchsArrayItem.version
				});
				Object.seal( searchProgramsPerSearchItem );
				searchProgramsPerSearchItems_PerProjectSearchId.searchProgramsPerSearchItem_Map.set( searchProgramsPerSearchItem.searchProgramsPerSearchId, searchProgramsPerSearchItem );
			}, this );
			
			//  Put in Map, key projectSearchId
			searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.set( searchProgramsPerSearchItems_PerProjectSearchId.projectSearchId, searchProgramsPerSearchItems_PerProjectSearchId );
			
		}, this );
		
		//  Save Data to state manager
		dataPageStateManager_DataFrom_Server.set_searchProgramsPerSearchData_Root( searchProgramsPerSearchData_Root );
	}

}

