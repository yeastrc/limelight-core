/**
 * projPg_Expermnts_Load_SearchesData_ForProject.ts
 * 
 * Javascript for projectView.jsp page 
 * 
 * Load Searches Data for Project
 * 
 * Used to display Search data for the Experiment
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {
	getSearchesAndFolders_SingleProject,
	GetSearchesAndFolders_SingleProject_PromiseResponse, GetSearchesAndFolders_SingleProject_PromiseResponse_Item
} from "page_js/data_pages/data_pages_common/single_project_its_searches_and_folders/single_project_its_searches_and_folders_WebserviceRetrieval_TS_Classes";
import {
	AnnotationTypeData_Root,
	DataPageStateManager,
	SearchProgramsPerSearchData_Root
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchProgramsPerSearchDataRetrieval} from "page_js/data_pages/data_pages_common/searchProgramsPerSearchDataRetrieval";
import {AnnotationTypeDataRetrieval} from "page_js/data_pages/data_pages_common/annotationTypeDataRetrieval";

/**
 *
 */
export class GetSearchesDataForProject_ExperimentProcessing_Result {

	getSearchesAndFolders_SingleProject_PromiseResponse?: GetSearchesAndFolders_SingleProject_PromiseResponse
	noSearchesFound? : boolean
	searchList_OnlySearches? : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>;

	searchesSubData? : {
		searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
		annotationTypeData_Root : AnnotationTypeData_Root
	}

	private _DO_NOT_CALL(){} // Only here to force creating an object of this class using new ...
}

/**
 * projectIdentifier - From URL
 */
export const getSearchesDataForProject_ExperimentProcessing = function({ projectIdentifier }: { projectIdentifier: any }) : Promise<GetSearchesDataForProject_ExperimentProcessing_Result> {

	return new Promise<GetSearchesDataForProject_ExperimentProcessing_Result>( (resolve, reject) => {
		try {
			const promise_getSearchesDataFromServer = getSearchesAndFolders_SingleProject({ projectIdentifier });

			promise_getSearchesDataFromServer.catch( (reason) => {
				reject(reason)
			} );

			promise_getSearchesDataFromServer.then( (getSearchesAndFolders_SingleProject_PromiseResponse) => {
				try {
					const { noSearchesFound, searchList_OnlySearches } = _getSearchesListFromWebserviceResponse({ getSearchesAndFolders_SingleProject_PromiseResponse });

					if ( noSearchesFound ) {

						const result = new GetSearchesDataForProject_ExperimentProcessing_Result();
						result.noSearchesFound = true;
						result.getSearchesAndFolders_SingleProject_PromiseResponse = getSearchesAndFolders_SingleProject_PromiseResponse;

						resolve(result);

						return; // EARLY RETURN
					}

					const promise_getSearchesSubDataFromServer = _getSearchesSubDataFromServer({ searchList_OnlySearches });

					promise_getSearchesSubDataFromServer.catch( () => {} );

					promise_getSearchesSubDataFromServer.then( ({ searchProgramsPerSearchData_Root, annotationTypeData_Root }) => {
						try {
							//  Get Final Search List and Per Search and Ann Type data for the searches

							const result = new GetSearchesDataForProject_ExperimentProcessing_Result();
							result.noSearchesFound = false;
							result.getSearchesAndFolders_SingleProject_PromiseResponse = getSearchesAndFolders_SingleProject_PromiseResponse;
							result.searchList_OnlySearches = searchList_OnlySearches;
							result.searchesSubData = { searchProgramsPerSearchData_Root, annotationTypeData_Root };

							resolve(result);

						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}
					});
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		} catch (e) {
			reportWebErrorToServer.reportErrorObjectToServer({
				errorException : e
			});
			throw e;
		}
	});
}

/**
 * 
 */
const _getSearchesDataFromServer = function({ projectIdentifier }: { projectIdentifier: any }) {

	return new Promise( (resolve, reject) => {
		try {

			let requestObj = {
				projectIdentifier : projectIdentifier
			};

			const url = "d/rws/for-page/project-view-page-search-list";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

			promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
				try {
					resolve({ responseData });
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});
		} catch (e) {
			reportWebErrorToServer.reportErrorObjectToServer({
				errorException : e
			});
			throw e;
		}
	});
}

/**
 * @param responseData from web service call
 */
const _getSearchesListFromWebserviceResponse = function(
	{
		getSearchesAndFolders_SingleProject_PromiseResponse
	} : {
		getSearchesAndFolders_SingleProject_PromiseResponse : GetSearchesAndFolders_SingleProject_PromiseResponse

	}) : {
	noSearchesFound : boolean
	searchList_OnlySearches : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
} {

	const searchesAndFolders_Items = getSearchesAndFolders_SingleProject_PromiseResponse.items;

	if ( searchesAndFolders_Items.length < 1 ) {
		//  No Data
		return { noSearchesFound : true, searchList_OnlySearches: [] }; // EARLY RETURN
	}

	const searchList_OnlySearches : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item> = [];

	//  Copy all searches to single array and sort on search id descending

	for ( const item of searchesAndFolders_Items ) {

		if ( item.isFolder ) {
			for ( const inFolderItem of item.searchesInFolder ) {
				searchList_OnlySearches.push( inFolderItem );
			}
		} else {
			searchList_OnlySearches.push( item );
		}
	}

	// sort on search id descending

	searchList_OnlySearches.sort( (a,b) => {

		if ( a.searchId < b.searchId ) { 
			return 1; // descending
		}
		if ( a.searchId > b.searchId ) { 
			return -1; // descending
		}
		return 0;
	});

	return { searchList_OnlySearches, noSearchesFound: false };
}

/**
 * 
 */
const _getSearchesSubDataFromServer = function({ searchList_OnlySearches } : {

	searchList_OnlySearches : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>

}) : Promise<{ searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root, annotationTypeData_Root : AnnotationTypeData_Root}> {

	const projectSearchIds: Array<number> = [];

	for ( const search of searchList_OnlySearches ) {
		projectSearchIds.push( search.projectSearchId );
	}


	return new Promise( (resolve, reject) => {
		try {
			//  Create instance of DataPageStateManager to call existing code to retrieve search data
			const  localONLY__for_SearchDataLoading__dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager()
			localONLY__for_SearchDataLoading__dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );

			//  instance of DataPageStateManager with search data loaded
			const localONLY__SearchDataLoaded__dataPageStateManager_DataFrom_Server = new DataPageStateManager()

			const promise = new Promise<void>( (resolve, reject) => {
				try {
					const promises = [];

					{
						const searchProgramsPerSearchDataRetrieval = new SearchProgramsPerSearchDataRetrieval();
						const promise = searchProgramsPerSearchDataRetrieval.retrieveSearchProgramsPerSearchData(
							localONLY__for_SearchDataLoading__dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
							localONLY__SearchDataLoaded__dataPageStateManager_DataFrom_Server
						);
						if ( promise ) {
							promises.push(promise);
						}
					}
					{
						const annotationTypeDataRetrieval = new AnnotationTypeDataRetrieval();
						const promise = annotationTypeDataRetrieval.retrieveSearchAnnotationTypeData({
							dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : localONLY__for_SearchDataLoading__dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
							dataPageStateManager_DataFrom_Server : localONLY__SearchDataLoaded__dataPageStateManager_DataFrom_Server
						})
						if ( promise ) {
							promises.push(promise);
						}
					}
					if ( promises.length === 0 ) {
						resolve()
					}

					const promisesAll = Promise.all( promises );

					promisesAll.catch( (reason) => {
						reject(reason);
					} );

					promisesAll.then( (promiseResults) => {
						try {
							resolve()
						} catch (e) {
							reportWebErrorToServer.reportErrorObjectToServer({
								errorException : e
							});
							throw e;
						}
					});
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			})

			promise.catch( (reason) => {
				reject(reason)
			} );
		
			promise.then( (promiseResults) => {
				try {
					const searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root = localONLY__SearchDataLoaded__dataPageStateManager_DataFrom_Server.get_searchProgramsPerSearchData_Root()
					const annotationTypeData_Root : AnnotationTypeData_Root = localONLY__SearchDataLoaded__dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

					resolve({ searchProgramsPerSearchData_Root, annotationTypeData_Root });

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});
		} catch (e) {
			reportWebErrorToServer.reportErrorObjectToServer({
				errorException : e
			});
			throw e;
		}
	});
}


