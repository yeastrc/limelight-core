/**
 * loadCoreData_ProjectSearchIds_Based.ts
 * 
 * Load core data for Project Search Id Based pages page  
 * 
 * ie: Annotation Type data, Per Program data, etc
 * 
 * 
 * 
 */
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import {
	DataPageStateManager,
	SearchData_SearchName_Etc_Root__DataPageStateManagerEntry,
	SearchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry,
	SearchNames_AsMap_Entry,
	SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry,
	SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry,
	SearchSubGroups_Root__DataPageStateManagerEntry,
	SearchTags_SearchTagCategories_Root__DataPageStateManagerEntry
} from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import {
	retrieveSearchNamesFromServer,
	RetrieveSearchNamesFromServer_Result
} from './searchNameRetrieval';
import { SearchProgramsPerSearchDataRetrieval }  from './searchProgramsPerSearchDataRetrieval';
import { AnnotationTypeDataRetrieval } from './annotationTypeDataRetrieval';
import {dataPage_common_Get_Searches_Flags} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {dataPage_common_Get_Searches_Info} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";
import {
	searchTags__Get_For_ProjectSearchIds,
	SearchTags__Get_For_ProjectSearchIds_Result, SearchTags_SearchTagCategories__Get_For_ProjectSearchIds_ResultItem_SingleProjectSearchId
} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_search/searchTags__Get_For_ProjectSearchIds";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";

/**
 * 
 */
export class LoadCoreData_ProjectSearchIds_Based{

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

	_annotationTypeDataRetrieval : AnnotationTypeDataRetrieval;
	_searchProgramsPerSearchDataRetrieval : SearchProgramsPerSearchDataRetrieval;

	//  Bind 'this' to 'this.loadDataFor_ProjectSearchIds_ExcludeMainQueries'
	_processRequestAsPromise_BoundThis: any;
	

	/**
	 * 
	 */
	constructor( 
		{ dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, dataPageStateManager_DataFrom_Server } :
		{ dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager, dataPageStateManager_DataFrom_Server : DataPageStateManager }
	) {

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		this._annotationTypeDataRetrieval = new AnnotationTypeDataRetrieval();
		this._searchProgramsPerSearchDataRetrieval = new SearchProgramsPerSearchDataRetrieval();

		//  Bind 'this' to 'this.loadDataFor_ProjectSearchIds_ExcludeMainQueries'
		this._processRequestAsPromise_BoundThis = this._processRequestAsPromise.bind( this );
		
	}
	

	/**
	 * This is called:
	 * 	  Initial Page Load
	 *    Any time Project Search Ids are changed
	 *    After any AJAX call completes for any function called in this function
	 *    
	 * This loads data for the Project Search Ids (Project Names, Annotation Type data, etc)
	 * 
	 * This does not perform any main query using the filter data
	 * 
	 * returns a Promise 
	 */
	loadCoreDataFor_ProjectSearchIds() {

		return new Promise( this._processRequestAsPromise_BoundThis );
	}
	
	_processRequestAsPromise( resolve_Overall: any, reject_Overall: any ) {
		try {
			const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();
			
			let promisesToWaitFor: Array<Promise<unknown>> = []; //  'sub' promises

			{
				const promiseToAdd = new Promise<void>( (resolve_promiseToAdd, reject_promiseToAdd) => {
					try {
						const promise_dataPage_common_Get_Searches_Flags = dataPage_common_Get_Searches_Flags({ projectSearchIds });

						promise_dataPage_common_Get_Searches_Flags.catch( reason => {
							try {
								reject_promiseToAdd(reason);

							} catch( e ) {
								console.warn(e);
								reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
								throw e;
							}
						});

						promise_dataPage_common_Get_Searches_Flags.then( result => {
							try {
								this._dataPageStateManager_DataFrom_Server.set_DataPage_common_Searches_Flags(result);

								resolve_promiseToAdd();

							} catch( e ) {
								console.warn(e);
								reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
								throw e;
							}
						})


					} catch( e ) {
						console.warn(e);
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				})

				promisesToWaitFor.push( promiseToAdd );
			}
			{
				const promiseToAdd = new Promise<void>( (resolve_promiseToAdd, reject_promiseToAdd) => {
					try {
						const promise_dataPage_common_Get_Searches_Info = dataPage_common_Get_Searches_Info({ projectSearchIds });

						promise_dataPage_common_Get_Searches_Info.catch( reason => {
							try {
								reject_promiseToAdd(reason);

							} catch( e ) {
								console.warn(e);
								reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
								throw e;
							}
						});

						promise_dataPage_common_Get_Searches_Info.then( result => {
							try {
								this._dataPageStateManager_DataFrom_Server.set_DataPage_common_Searches_Info(result);

								resolve_promiseToAdd();

							} catch( e ) {
								console.warn(e);
								reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
								throw e;
							}
						})


					} catch( e ) {
						console.warn(e);
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				})

				promisesToWaitFor.push( promiseToAdd );
			}
			{
				//  Retrieval of search names from server for project search ids
				let retrieveSearchNames_Promise = _retrieveSearchNames( {
					dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
					dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server 
				} );

				if ( retrieveSearchNames_Promise ) {
					promisesToWaitFor.push( retrieveSearchNames_Promise );
				}
			}

			{
				let retrieveAnnotationType_Promise = this._annotationTypeDataRetrieval.retrieveSearchAnnotationTypeData( {
					dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
					dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
				} );

				if ( retrieveAnnotationType_Promise ) {
					promisesToWaitFor.push( retrieveAnnotationType_Promise );
				}
			}

			{
				let searchProgramsPerSearchDataRetrieval_Promise = this._searchProgramsPerSearchDataRetrieval.retrieveSearchProgramsPerSearchData( 
					this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, this._dataPageStateManager_DataFrom_Server
				);

				if ( searchProgramsPerSearchDataRetrieval_Promise ) {
					promisesToWaitFor.push( searchProgramsPerSearchDataRetrieval_Promise );
				}
			}
			
			if ( promisesToWaitFor.length === 0 ) {
				
				window.setTimeout( () => {
					try {
						resolve_Overall();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				}, 10 );
				
			} else {
				
				const promisesToWaitFor_Promise_all = Promise.all( promisesToWaitFor );

				promisesToWaitFor_Promise_all.catch( ( rejectionReason) => {
					try {
						reject_Overall();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				
				promisesToWaitFor_Promise_all.then( ( resolvedPromisesArray ) => { 
					try {
						//  All loads complete
						resolve_Overall();

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}

				});
			}
		} catch( e ) {
			console.warn("Exception LoadCoreData_ProjectSearchIds_Based._processRequestAsPromise(...). Exception listed next logging.  Exception as String: " + e );
			console.warn( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}

}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

/**
 * return Promise, if anything to load.  Otherwise return null
 */
const _retrieveSearchNames = function(
	{
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server,
	}: {
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager
		dataPageStateManager_DataFrom_Server: DataPageStateManager
	}): Promise<void> {

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

	return new Promise<void>((resolve, reject) => { try {

		let retrieveSearchNamesFromServer_Result: RetrieveSearchNamesFromServer_Result
		let searchTags__Get_For_ProjectSearchIds_Result: SearchTags__Get_For_ProjectSearchIds_Result

		const promises: Array<Promise<void>> = []

		{
			const promise = new Promise<void>((resolve, reject) => { try {

				const promise_retrieveSearchNamesFromServer = retrieveSearchNamesFromServer({ projectSearchIds })

				promise_retrieveSearchNamesFromServer.catch(reason => { reject(reason)})

				promise_retrieveSearchNamesFromServer.then(retrieveSearchNamesFromServer_Result__PromiseResolve => { try {

					retrieveSearchNamesFromServer_Result = retrieveSearchNamesFromServer_Result__PromiseResolve;

					resolve()

				} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
			} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

			promises.push( promise );
		}
		{
			const promise = new Promise<void>((resolve, reject) => { try {

				const promise_getSearchTagList = searchTags__Get_For_ProjectSearchIds({ projectSearchIds });

				promise_getSearchTagList.catch(reason => { reject(reason) })

				promise_getSearchTagList.then( ( searchTags__Get_For_ProjectSearchIds_Result__PromiseResolve ) => { try {

					searchTags__Get_For_ProjectSearchIds_Result = searchTags__Get_For_ProjectSearchIds_Result__PromiseResolve;
					resolve()

				} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
			} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

			promises.push( promise );
		}

		const promisesAll = Promise.all( promises );

		promisesAll.catch((reason => {}))

		promisesAll.then( () => { try {

			_retrieveSearchNamesResponse({ retrieveSearchNamesFromServer_Result, searchTags__Get_For_ProjectSearchIds_Result, dataPageStateManager_DataFrom_Server, projectSearchIds_dataNotLoadedArray })

			resolve()

		} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
	} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}


/**
 *
 */
const _retrieveSearchNamesResponse = function(
	{
		retrieveSearchNamesFromServer_Result,
		searchTags__Get_For_ProjectSearchIds_Result,
		dataPageStateManager_DataFrom_Server,
		projectSearchIds_dataNotLoadedArray,
	} : {
		retrieveSearchNamesFromServer_Result: RetrieveSearchNamesFromServer_Result //  Data from webservice
		searchTags__Get_For_ProjectSearchIds_Result: SearchTags__Get_For_ProjectSearchIds_Result //  Data from webservice
		dataPageStateManager_DataFrom_Server: DataPageStateManager
		projectSearchIds_dataNotLoadedArray: Array<number>
	}
): void {

	{
		let searchList = retrieveSearchNamesFromServer_Result.searchList;

		if (!searchList) {
			throw Error("Search List return is empty. projectSearchIds_dataNotLoadedArray: " + projectSearchIds_dataNotLoadedArray.join('_'));
		}

		//  Check if all Search Short Name (Or use Search Id when Search Short Name is NOT populated) is unique.

		//    ( If they are not unique, the search display label will always be the search id since that is always unique )

		let all_SearchShortNames_Or_SearchIdsWhereSearchNamesNotPopulated_AreUnique = true
		{
			const searchShortNames_Or_SearchIdsWhereSearchNamesNotPopulated_Set = new Set<string>()

			for (const searchListItem of searchList) {

				if ( searchListItem.searchShortName !== undefined && searchListItem.searchShortName !== null && searchListItem.searchShortName !== "" ) {
					// Have searchListItem.searchShortName
					if ( searchShortNames_Or_SearchIdsWhereSearchNamesNotPopulated_Set.has( searchListItem.searchShortName ) ) {
						all_SearchShortNames_Or_SearchIdsWhereSearchNamesNotPopulated_AreUnique = false;
						break;
					}
					searchShortNames_Or_SearchIdsWhereSearchNamesNotPopulated_Set.add( searchListItem.searchShortName )
				} else {

					if ( searchListItem.searchId === undefined || searchListItem.searchId === null ) {
						const msg = "( searchListItem.searchId === undefined || searchListItem.searchId === null )"
						console.warn(msg)
						throw Error(msg)
					}

					const searchId_AsString = searchListItem.searchId.toString();

					if ( searchShortNames_Or_SearchIdsWhereSearchNamesNotPopulated_Set.has( searchId_AsString ) ) {
						all_SearchShortNames_Or_SearchIdsWhereSearchNamesNotPopulated_AreUnique = false;
						break;
					}
					searchShortNames_Or_SearchIdsWhereSearchNamesNotPopulated_Set.add( searchId_AsString );
				}
			}
		}

		const searchData_SearchName_Etc_Map_Key_ProjectSearchId : Map<number, SearchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry> = new Map()

		let searchNames_AsMap = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

		if (!searchNames_AsMap) {
			searchNames_AsMap = new Map();
		}
		for (const searchListItem of searchList) {

			let searchHasSubgroups = false;
			if (searchListItem.searchHasSubgroups) {
				searchHasSubgroups = true;
			}

			let searchLabel__SearchShortName_OR_SearchId
			let searchLabel_FromSearchId = false;
			let searchLabel_FromSearchShortName = false

			if ( ! all_SearchShortNames_Or_SearchIdsWhereSearchNamesNotPopulated_AreUnique ) {

				if ( searchListItem.searchId === undefined || searchListItem.searchId === null ) {
					const msg = "( searchListItem.searchId === undefined || searchListItem.searchId === null )"
					console.warn(msg)
					throw Error(msg)
				}
				searchLabel__SearchShortName_OR_SearchId = searchListItem.searchId.toString();
				searchLabel_FromSearchId = true;
			} else {
				if ( searchListItem.searchShortName !== undefined && searchListItem.searchShortName !== null && searchListItem.searchShortName !== "" ) {
					// Have searchListItem.searchShortName
					searchLabel__SearchShortName_OR_SearchId = searchListItem.searchShortName
					searchLabel_FromSearchShortName = true
				} else {
					if ( searchListItem.searchId === undefined || searchListItem.searchId === null ) {
						const msg = "( searchListItem.searchId === undefined || searchListItem.searchId === null )"
						console.warn(msg)
						throw Error(msg)
					}
					searchLabel__SearchShortName_OR_SearchId = searchListItem.searchId.toString();
					searchLabel_FromSearchId = true;
				}
			}

			const projectSearchId: number = searchListItem.projectSearchId; //  Map Key

			///

			const searchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry : SearchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry = {
				projectSearchId: searchListItem.projectSearchId,
				searchId: searchListItem.searchId,
				name: searchListItem.name,
				searchShortName: searchListItem.searchShortName,
				searchLabel__SearchShortName_OR_SearchId,
				searchLabel_FromSearchId,
				searchLabel_FromSearchShortName,
				searchHasSubgroups
			}

			searchData_SearchName_Etc_Map_Key_ProjectSearchId.set( projectSearchId, searchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry )

			///

			const searchNames_AsMap_Entry: SearchNames_AsMap_Entry = {
				projectSearchId: searchListItem.projectSearchId,
				searchId: searchListItem.searchId,
				name: searchListItem.name,
				searchShortName: searchListItem.searchShortName,
				searchLabel__SearchShortName_OR_SearchId,
				searchLabel_FromSearchId,
				searchLabel_FromSearchShortName,
				searchHasSubgroups
			};

			searchNames_AsMap.set(projectSearchId, searchNames_AsMap_Entry);
		}

		const searchData_SearchName_Etc_Root__DataPageStateManagerEntry = new SearchData_SearchName_Etc_Root__DataPageStateManagerEntry({
			searchData_SearchName_Etc_Map_Key_ProjectSearchId, all_SearchShortNames_Or_SearchIdsWhereSearchNamesNotPopulated_AreUnique
		})

		dataPageStateManager_DataFrom_Server.set_searchData_SearchName_Etc_Root(searchData_SearchName_Etc_Root__DataPageStateManagerEntry)

		//  Save Data to state manager
		dataPageStateManager_DataFrom_Server.set_searchNames_AsMap(searchNames_AsMap);


	}
	{
		if ( retrieveSearchNamesFromServer_Result.canEditSearchSubGroups ) {
			dataPageStateManager_DataFrom_Server.set_userCanEditSearchSubGroups( true );
		} else {
			dataPageStateManager_DataFrom_Server.set_userCanEditSearchSubGroups( false );
		}
	}

	{
		if (retrieveSearchNamesFromServer_Result.searchSubGroupsPerSearchList) {

			let searchSubGroups_Root = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root();
			if ( ! searchSubGroups_Root ) {
				searchSubGroups_Root = new SearchSubGroups_Root__DataPageStateManagerEntry()
				dataPageStateManager_DataFrom_Server.set_SearchSubGroups_Root(searchSubGroups_Root)
			}

			for (const searchSubGroupsPerSearchEntry of retrieveSearchNamesFromServer_Result.searchSubGroupsPerSearchList) {

				const searchSubGroupIds_Set = new Set<number>();

				const searchSubGroups_Array : Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = new Array();

				for ( const searchSubGroupEntry of searchSubGroupsPerSearchEntry.searchSubgroupItems ) {

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
	{
		if ( searchTags__Get_For_ProjectSearchIds_Result.userCanEditSearchTags ) {
			dataPageStateManager_DataFrom_Server.set_userCanEditSearchTags(true)
		} else {
			dataPageStateManager_DataFrom_Server.set_userCanEditSearchTags(false)
		}

		let searchTags_Root = dataPageStateManager_DataFrom_Server.get_SearchTags_SearchTagCategories_Root();
		if ( ! searchTags_Root ) {
			searchTags_Root = new SearchTags_SearchTagCategories_Root__DataPageStateManagerEntry()
			dataPageStateManager_DataFrom_Server.set_SearchTags_SearchTagCategories_Root(searchTags_Root)
		}

		for ( const entry_ForSingleProjectSearchId of searchTags__Get_For_ProjectSearchIds_Result.entriesPerSingleProjectSearchId ) {

			const entriesPerTag_New = Array.from( entry_ForSingleProjectSearchId.entriesPerTag );
			entriesPerTag_New.sort( (a,b ) => {
				return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.tag_string, b.tag_string);
			})

			const entry_ForSingleProjectSearchId_NEW: SearchTags_SearchTagCategories__Get_For_ProjectSearchIds_ResultItem_SingleProjectSearchId = {
				projectSearchId: entry_ForSingleProjectSearchId.projectSearchId,
				entriesPerTag: entriesPerTag_New
			}

			searchTags_Root.addForProjectSearchId( entry_ForSingleProjectSearchId_NEW );
		}

		searchTags_Root.set_SearchTags__Get_For_ProjectSearchIds_Result( searchTags__Get_For_ProjectSearchIds_Result )
	}


}
