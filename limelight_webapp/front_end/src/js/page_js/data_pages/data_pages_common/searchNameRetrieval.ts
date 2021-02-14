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

import {
	DataPageStateManager,
	SearchNames_AsMap_Entry, SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry,
	SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry,
	SearchSubGroups_Root__DataPageStateManagerEntry
} from 'page_js/data_pages/data_pages_common/dataPageStateManager';

/**
 *
 */
export class SearchNameRetrieval {

	/**
	 *
	 */
	constructor() {
	}

	/**
	 * return Promise, if anything to load.  Otherwise return null
	 */
	retrieveSearchNames({

							dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
							dataPageStateManager_DataFrom_Server,
						}: {
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager
		dataPageStateManager_DataFrom_Server: DataPageStateManager
	}): Promise<any> {

		if (!dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay) {
			throw Error("No dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay");
		}
		if (!dataPageStateManager_DataFrom_Server) {
			throw Error("No dataPageStateManager_DataFrom_Server");
		}

		let projectSearchIds = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		//  Initially assume All projectSearchIds need to be loaded
		let projectSearchIds_dataNotLoadedArray: Array<number> = projectSearchIds;

		//  currently loaded search names
		let searchNames_AsMap = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

		if (searchNames_AsMap && searchNames_AsMap.size !== 0) {

			//  Have some loaded so need to determine which are not loaded and update projectSearchIds_dataNotLoadedArray

			let projectSearchIds_dataNotLoaded_Set: Set<number> = new Set();

			//  Identify project search ids for data to be loaded

			for (const projectSearchId of projectSearchIds) {

				// Not already loading for this project search id
				if (!searchNames_AsMap.has(projectSearchId)) {
					projectSearchIds_dataNotLoaded_Set.add(projectSearchId);
				}
			}

			if (projectSearchIds_dataNotLoaded_Set.size === 0) {
				// nothing new to load so return null

				return null; //  EARLY RETURN
			}

			projectSearchIds_dataNotLoadedArray = Array.from(projectSearchIds_dataNotLoaded_Set);
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
		projectSearchIds_dataNotLoadedArray: Array<number>,
		// dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager, 
		dataPageStateManager_DataFrom_Server: DataPageStateManager
	): Promise<any> {

		let retrieval = (resolve: any, reject: any) => {
			try {
				let requestObj = {projectSearchIds: projectSearchIds_dataNotLoadedArray};

				const url = "d/rws/for-page/psb/search-name-list-from-psi";

				const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

				const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch(() => {
					try {
						reject();
					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
						throw e;
					}
				});

				promise_webserviceCallStandardPost.then(({responseData}:{responseData: any}) => {
					try {
						this._retrieveSearchNamesResponse(
							responseData,
							dataPageStateManager_DataFrom_Server,
							projectSearchIds_dataNotLoadedArray
						);

						resolve();

					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
						throw e;
					}

				});
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
				throw e;
			}
		}

		return new Promise(retrieval);
	}

	/**
	 *
	 */
	private _retrieveSearchNamesResponse(
		responseData: any, //  Data from webservice
		dataPageStateManager_DataFrom_Server: DataPageStateManager,
		projectSearchIds_dataNotLoadedArray: Array<number>
	): void {

		{
			let searchList = responseData.searchList;

			if (!searchList) {
				throw Error("Search List return is empty. projectSearchIds_dataNotLoadedArray: " + projectSearchIds_dataNotLoadedArray.join('_'));
			}

			let searchNames_AsMap = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

			if (!searchNames_AsMap) {
				searchNames_AsMap = new Map();
			}
			for (const searchListItem of searchList) {
				//  Validate searchListItem
				if (!limelight__IsVariableAString(searchListItem.name)) {
					const msg = "SearchNameRetrieval: searchListItem.name is not a string. searchListItem.name: " + searchListItem.name;
					console.warn(msg);
					throw Error(msg);
				}
				if (!variable_is_type_number_Check(searchListItem.projectSearchId)) {
					const msg = "SearchNameRetrieval: searchListItem.projectSearchId is not a number. searchListItem.projectSearchId: " + searchListItem.projectSearchId;
					console.warn(msg);
					throw Error(msg);
				}
				if (!variable_is_type_number_Check(searchListItem.searchId)) {
					const msg = "SearchNameRetrieval: searchListItem.searchId is not a number. searchListItem.searchId: " + searchListItem.searchId;
					console.warn(msg);
					throw Error(msg);
				}

				let searchHasSubgroups = false;
				if (searchListItem.searchHasSubgroups) {
					searchHasSubgroups = true;
				}

				const projectSearchId: number = searchListItem.projectSearchId; //  Map Key

				const itemToStore: SearchNames_AsMap_Entry = {
					projectSearchId: searchListItem.projectSearchId,
					searchId: searchListItem.searchId,
					name: searchListItem.name,
					searchHasSubgroups
				};

				searchNames_AsMap.set(projectSearchId, itemToStore);

				// searchNamesLoaded[ projectSearchId ] = itemToStore;
			}

			//  Save Data to state manager
			dataPageStateManager_DataFrom_Server.set_searchNames_AsMap(searchNames_AsMap);
		}
		{
			if ( responseData.canEditSearchSubGroups ) {
				dataPageStateManager_DataFrom_Server.set_userCanEditSearchSubGroups( true );
			} else {
				dataPageStateManager_DataFrom_Server.set_userCanEditSearchSubGroups( false );
			}
		}

		{
			if (responseData.searchSubGroupsPerSearchList) {

				let searchSubGroups_Root = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root();
				if ( ! searchSubGroups_Root ) {
					searchSubGroups_Root = new SearchSubGroups_Root__DataPageStateManagerEntry()
					dataPageStateManager_DataFrom_Server.set_SearchSubGroups_Root(searchSubGroups_Root)
				}

				for (const searchSubGroupsPerSearchEntry of responseData.searchSubGroupsPerSearchList) {

					//  Validate searchSubGroupsPerSearchEntry
					if (!variable_is_type_number_Check(searchSubGroupsPerSearchEntry.projectSearchId)) {
						const msg = "SearchNameRetrieval: searchSubGroupsPerSearchEntry.projectSearchId is not a number. searchSubGroupsPerSearchEntry.projectSearchId: " + searchSubGroupsPerSearchEntry.projectSearchId;
						console.warn(msg);
						throw Error(msg);
					}
					if (!variable_is_type_number_Check(searchSubGroupsPerSearchEntry.searchId)) {
						const msg = "SearchNameRetrieval: searchSubGroupsPerSearchEntry.searchId is not a number. searchSubGroupsPerSearchEntry.searchId: " + searchSubGroupsPerSearchEntry.searchId;
						console.warn(msg);
						throw Error(msg);
					}
					if ( ! searchSubGroupsPerSearchEntry.searchSubgroupItems ) {
						const msg = "SearchNameRetrieval: searchSubGroupsPerSearchEntry.searchSubgroupItems is not a populated.";
						console.warn(msg);
						throw Error(msg);
					}

					const searchSubGroupIds_Set = new Set<number>();

					const searchSubGroups_Array : Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = new Array();

					for ( const searchSubGroupEntry of searchSubGroupsPerSearchEntry.searchSubgroupItems ) {

						//  Validate searchListItem
						if (!limelight__IsVariableAString(searchSubGroupEntry.subgroupName_fromImportFile)) {
							const msg = "SearchNameRetrieval: searchSubGroupEntry.subgroupName_fromImportFile is not a string. searchListItem.subgroupName_fromImportFile: " + searchSubGroupEntry.subgroupName_fromImportFile;
							console.warn(msg);
							throw Error(msg);
						}
						if (searchSubGroupEntry.subgroupName_Display_FromServer_IfUserEnteredAValue) {
							if (!limelight__IsVariableAString(searchSubGroupEntry.subgroupName_Display_FromServer_IfUserEnteredAValue)) {
								const msg = "SearchNameRetrieval: searchSubGroupEntry.subgroupName_Display_FromServer_IfUserEnteredAValue is not a string. searchListItem.subgroupName_Display_FromServer_IfUserEnteredAValue: " + searchSubGroupEntry.subgroupName_Display;
								console.warn(msg);
								throw Error(msg);
							}
						}
						if (searchSubGroupEntry.subgroupName_Display) {
							if (!limelight__IsVariableAString(searchSubGroupEntry.subgroupName_Display)) {
								const msg = "SearchNameRetrieval: searchSubGroupEntry.subgroupName_Display is not a string. searchListItem.subgroupName_Display: " + searchSubGroupEntry.subgroupName_Display;
								console.warn(msg);
								throw Error(msg);
							}
						}
						if ( searchSubGroupEntry.displayOrder ) {
							if (!variable_is_type_number_Check(searchSubGroupEntry.displayOrder)) {
								const msg = "SearchNameRetrieval: searchSubGroupEntry.displayOrder is not a number. searchListItem.displayOrder: " + searchSubGroupEntry.displayOrder;
								console.warn(msg);
								throw Error(msg);
							}
						}
						if (!variable_is_type_number_Check(searchSubGroupEntry.searchSubGroupId)) {
							const msg = "SearchNameRetrieval: searchSubGroupEntry.searchSubGroupId is not a number. searchListItem.searchSubGroupId: " + searchSubGroupEntry.searchSubGroupId;
							console.warn(msg);
							throw Error(msg);
						}

						if ( searchSubGroupIds_Set.has( searchSubGroupEntry.searchSubGroupId ) ) {
							const msg = "SearchNameRetrieval: searchSubGroupEntry.searchSubGroupId value found in more than one searchSubGroupEntry. searchListItem.searchSubGroupId: " + searchSubGroupEntry.searchSubGroupId;
							console.warn(msg);
							throw Error(msg);
						}

						searchSubGroupIds_Set.add( searchSubGroupEntry.searchSubGroupId )

						const entryFor_SearchSubGroup = new SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry({
							searchSubGroup_Id : searchSubGroupEntry.searchSubGroupId,
							displayOrder : searchSubGroupEntry.displayOrder,
							searchSubgroupName_fromImportFile : searchSubGroupEntry.subgroupName_fromImportFile,
							subgroupName_Display_FromServer_IfUserEnteredAValue : searchSubGroupEntry.subgroupName_Display_FromServer_IfUserEnteredAValue,
							subgroupName_Display : searchSubGroupEntry.subgroupName_Display
						});

						searchSubGroups_Array.push( entryFor_SearchSubGroup );
					}

					const entryFor_ProjectSearchId = new SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry({
						projectSearchId : searchSubGroupsPerSearchEntry.projectSearchId,
						searchSubGroups_Array_SortedOn_subgroupName_Display_ByServerCode : searchSubGroups_Array
					});

					searchSubGroups_Root.addForProjectSearchId( entryFor_ProjectSearchId )
				}
			}
		}
	}

}
