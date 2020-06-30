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

/**
 * projectIdentifier - From URL
 */
export const getSearchesDataForProject = function({ projectIdentifier }) {

	return new Promise( (resolve, reject) => {
		try {
			const promise_getSearchesDataFromServer = _getSearchesDataFromServer({ projectIdentifier });

			promise_getSearchesDataFromServer.catch( () => {} );

			promise_getSearchesDataFromServer.then( ({ responseData }) => {
				try {
					const searchList = _getSearchesListFromWebserviceResponse({ responseData });

					const promise_getSearchesSubDataFromServer = _getSearchesSubDataFromServer({ searchList });

					promise_getSearchesSubDataFromServer.catch( () => {} );

					promise_getSearchesSubDataFromServer.then( ({ searchesSubDataFromServer }) => {
						try {
							//  Get Final Search List and Per Search and Ann Type data for the searches

							const searchesSubData = _create_searchesSubData_From_searchesSubDataFromServer({ searchesSubDataFromServer });

							resolve({ searchList, searchesSubData });

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
const _getSearchesDataFromServer = function({ projectIdentifier }) {

	return new Promise( (resolve, reject) => {
		try {

			let requestObj = {
				projectIdentifier : projectIdentifier
			};

			const url = "d/rws/for-page/project-view-page-search-list";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
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
 * 
 */
const _getSearchesListFromWebserviceResponse = function({ responseData }) {

	const folderList = responseData.folderList;
	const searchesNotInFolders = responseData.searchesNotInFolders;
	const noSearchesFound = responseData.noSearchesFound;

	if ( noSearchesFound ) {
		//  No Data
		return { noSearchesFound : true }; // EARLY RETURN
	}

	const searchList = [];

	//  Copy all searches to single array and sort on search id descending

	if ( folderList && folderList.length !== 0 ) {
		for ( const folderItem of folderList ) {

			const searchesInFolder = folderItem.searchesInFolder;

			if ( searchesInFolder && searchesInFolder.length !== 0 ) {

				for ( const searchItem of searchesInFolder ) {

					searchList.push( searchItem );
				}
			}
		}
	}

	if ( searchesNotInFolders && searchesNotInFolders.length !== 0 ) {

		for ( const searchItem of searchesNotInFolders ) {

			searchList.push( searchItem );
		}
	}

	// sort on search id descending

	searchList.sort( (a,b) => {

		if ( a.searchId < b.searchId ) { 
			return 1; // descending
		}
		if ( a.searchId > b.searchId ) { 
			return -1; // descending
		}
		return 0;
	});

	return searchList;
}


// const promise_getSearchesSubDataFromServer = _getSearchesSubDataFromServer({ searchList });

// promise_getSearchesSubDataFromServer.catch( () => {} );

// promise_getSearchesSubDataFromServer.then( ({ searchesSubDataFromServer }) => {

/**
 * 
 */
const _getSearchesSubDataFromServer = function({ searchList }) {

	const projectSearchIds = [];

	for ( const search of searchList ) {
		projectSearchIds.push( search.projectSearchId );
	}

	return new Promise( (resolve, reject) => {
		try {
				
			const promises = [];

			{
				const promise = _getSearchProgramsPerSearch_FromServer({ projectSearchIds });
				promises.push( promise );
			}
			{
				const promise = _getSearchAnnotationTypes_FromServer({ projectSearchIds });
				promises.push( promise );
			}

			const promisesAll = Promise.all( promises );

			promisesAll.catch( (reason) => {} );
		
			promisesAll.then( (promiseResults) => {
				try {
					const result = { responseData_SearchProgramsPerSearch : undefined, responseData_SearchAnnotationTypes : undefined };
					for ( const promiseResult of promiseResults ) {
						if ( promiseResult.responseData_SearchProgramsPerSearch ) {
							result.responseData_SearchProgramsPerSearch = promiseResult.responseData_SearchProgramsPerSearch;
						}
						if ( promiseResult.responseData_SearchAnnotationTypes ) {
							result.responseData_SearchAnnotationTypes = promiseResult.responseData_SearchAnnotationTypes;
						}
					}

					resolve({ searchesSubDataFromServer : result });
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
 * 
 */
const _getSearchProgramsPerSearch_FromServer = function({ projectSearchIds }) {

	return new Promise( (resolve, reject) => {
		try {
		
			let requestObj = { projectSearchIds };

			const url = "d/rws/for-page/psb/search-programs-per-search-list-from-psi";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					resolve({ responseData_SearchProgramsPerSearch : responseData });
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
 * 
 */
const _getSearchAnnotationTypes_FromServer = function({ projectSearchIds }) {

	return new Promise( (resolve, reject) => {
		try {

			const requestObj = { projectSearchIds };
			
			const url = "d/rws/for-page/psb/search-annotation-type-list-from-psi";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					resolve({ responseData_SearchAnnotationTypes : responseData });
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
 * 
 */
const _create_searchesSubData_From_searchesSubDataFromServer = function({ searchesSubDataFromServer }) {

	const dataMap_KeyProjectSearchId = new Map();

	{
		const responseData_SearchAnnotationTypes = searchesSubDataFromServer.responseData_SearchAnnotationTypes;
		const perSearchList = responseData_SearchAnnotationTypes.perSearchList;

		for ( const perSearchEntry of perSearchList ) {

			const projectSearchId = perSearchEntry.projectSearchId;

			//  Convert AnnotationType lists to Maps keyed on Annotation Type Id which is then stored in local variable
			
			const psmFilterableAnnotationTypes = _convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchEntry.psmFilterableAnnotationTypes 
			});
			const reportedPeptideFilterableAnnotationTypes = _convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchEntry.reportedPeptideFilterableAnnotationTypes
			});
			const matchedProteinFilterableAnnotationTypes = _convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchEntry.matchedProteinFilterableAnnotationTypes
			});
			const psmDescriptiveAnnotationTypes = _convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchEntry.psmDescriptiveAnnotationTypes
			})
			const reportedPeptideDescriptiveAnnotationTypes = _convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchEntry.reportedPeptideDescriptiveAnnotationTypes
			});
			const matchedProteinDescriptiveAnnotationTypes = _convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchEntry.matchedProteinDescriptiveAnnotationTypes
			});

			const searchAnnotationTypesData = {
				projectSearchId : perSearchEntry.projectSearchId,
				searchId : perSearchEntry.searchId,
				psmFilterableAnnotationTypes,

				reportedPeptideFilterableAnnotationTypes,
				matchedProteinFilterableAnnotationTypes,
				psmDescriptiveAnnotationTypes,
				reportedPeptideDescriptiveAnnotationTypes,
				matchedProteinDescriptiveAnnotationTypes
			};
			
			const resultObject = { searchAnnotationTypesData };
			dataMap_KeyProjectSearchId.set( projectSearchId, resultObject );
		}
	}

	{
		const responseData_SearchProgramsPerSearch = searchesSubDataFromServer.responseData_SearchProgramsPerSearch;
		const perSearchList = responseData_SearchProgramsPerSearch.perSearchList;

		for ( const perSearchEntry of perSearchList ) {

			const projectSearchId = perSearchEntry.projectSearchId;

			let resultObject = dataMap_KeyProjectSearchId.get( projectSearchId );
			if ( ! resultObject ) {
				resultObject = {};
				dataMap_KeyProjectSearchId.set( projectSearchId, resultObject );
			}

			const searchProgramsPerSearch_Key_searchProgramsPerSearchId = new Map();
			const searchProgramsPerSearchs = perSearchEntry.searchProgramsPerSearchs;

			for ( const searchProgramsPerSearchIdEntry of searchProgramsPerSearchs ) {
				searchProgramsPerSearch_Key_searchProgramsPerSearchId.set( searchProgramsPerSearchIdEntry.searchProgramsPerSearchId, searchProgramsPerSearchIdEntry );
			}

			const searchProgramsPerSearchEntry = {
				searchProgramsPerSearch_Key_searchProgramsPerSearchId,
				projectSearchId : perSearchEntry.projectSearchId,
				searchId : perSearchEntry.searchId
			}

			resultObject.searchProgramsPerSearch = searchProgramsPerSearchEntry;
		}
	}

	return { dataMap_KeyProjectSearchId };
}


/**
 * 
 */
const _convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId = function( { annotationTypeArray } ) {

	let annotationTypesMap = new Map();
	
	for ( const annotationTypeItem of annotationTypeArray ) {
		
		Object.freeze( annotationTypeItem );    //  Freeze Object, no changes to properties, no add or remove properties
		
		annotationTypesMap.set( annotationTypeItem.annotationTypeId, annotationTypeItem );
	}
	
	return annotationTypesMap;
}

