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
	AnnotationTypeData_Root,
	DataPageStateManager,
	SearchProgramsPerSearchData_Root
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchProgramsPerSearchDataRetrieval} from "page_js/data_pages/data_pages_common/searchProgramsPerSearchDataRetrieval";
import {AnnotationTypeDataRetrieval} from "page_js/data_pages/data_pages_common/annotationTypeDataRetrieval";
import {
	defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval,
	DefaultFilter_Cutoffs_Overrides_ProjectWide_Root
} from "page_js/data_pages/data_pages_common/defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval";
import {
	CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
	getSearchesSearchTagsAndFolders_SingleProject
} from "page_js/data_pages/common_data_loaded_from_server__for_project__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders";

/**
 *
 */
export class GetSearchesDataForProject_ExperimentProcessing_Result {

	getSearchesAndFolders_SingleProject_PromiseResponse?: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
	noSearchesFound? : boolean

	searchesSubData? : {
		searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
		annotationTypeData_Root : AnnotationTypeData_Root
	}

	defaultFilter_Cutoffs_Overrides_ProjectWide_Root: DefaultFilter_Cutoffs_Overrides_ProjectWide_Root

	private _DO_NOT_CALL(){} // Only here to force creating an object of this class using new ...
}

/**
 * projectIdentifier - From URL
 */
export const getSearchesDataForProject_ExperimentProcessing = function({ projectIdentifier }: { projectIdentifier: any }) : Promise<GetSearchesDataForProject_ExperimentProcessing_Result> {

	return new Promise<GetSearchesDataForProject_ExperimentProcessing_Result>( (resolve, reject) => {
		try {
			const promise_getSearchesSearchTagsAndFolders_SingleProject = getSearchesSearchTagsAndFolders_SingleProject({ projectIdentifier });

			promise_getSearchesSearchTagsAndFolders_SingleProject.catch( (reason) => {
				reject(reason)
			} );

			promise_getSearchesSearchTagsAndFolders_SingleProject.then( (getSearchesSearchTagsAndFolders_SingleProject_PromiseResponse) => {
				try {
					if ( getSearchesSearchTagsAndFolders_SingleProject_PromiseResponse.is_NO_Searches_In_Project() ) {

						const result = new GetSearchesDataForProject_ExperimentProcessing_Result();
						result.noSearchesFound = true;
						result.getSearchesAndFolders_SingleProject_PromiseResponse = getSearchesSearchTagsAndFolders_SingleProject_PromiseResponse;

						resolve(result);

						return; // EARLY RETURN
					}

					const promise_defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval = defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval({ projectIdentifier });

					const promise_getSearchesSubDataFromServer = _getSearchesSubDataFromServer({ getSearchesSearchTagsAndFolders_SingleProject_PromiseResponse });

					const promiseAll = Promise.all([ promise_defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval, promise_getSearchesSubDataFromServer ]);
					promiseAll.catch( (reason) => {
						reject(reason)
					} );

					promiseAll.then( ([ defaultFilter_Cutoffs_Overrides_ProjectWide_Root , { searchProgramsPerSearchData_Root, annotationTypeData_Root } ]) => {
						try {
							//  Get Final Search List and Per Search and Ann Type data for the searches

							const result = new GetSearchesDataForProject_ExperimentProcessing_Result();
							result.noSearchesFound = false;
							result.getSearchesAndFolders_SingleProject_PromiseResponse = getSearchesSearchTagsAndFolders_SingleProject_PromiseResponse;
							result.searchesSubData = { searchProgramsPerSearchData_Root, annotationTypeData_Root };
							result.defaultFilter_Cutoffs_Overrides_ProjectWide_Root = defaultFilter_Cutoffs_Overrides_ProjectWide_Root;

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
const _getSearchesSubDataFromServer = function({ getSearchesSearchTagsAndFolders_SingleProject_PromiseResponse } : {

	getSearchesSearchTagsAndFolders_SingleProject_PromiseResponse : CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root

}) : Promise<{ searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root, annotationTypeData_Root : AnnotationTypeData_Root}> {

	const projectSearchIds = Array.from( getSearchesSearchTagsAndFolders_SingleProject_PromiseResponse.get_all_Searches_ProjectSearchIds_Set() );

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


