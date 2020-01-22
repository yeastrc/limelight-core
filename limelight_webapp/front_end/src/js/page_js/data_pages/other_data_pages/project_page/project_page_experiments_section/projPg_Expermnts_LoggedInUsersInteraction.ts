/**
 * projPg_Expermnts_LoggedInUsersInteraction.ts
 * 
 * Javascript for projectView.jsp page 
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

import React from 'react';
import ReactDOM from 'react-dom';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer } from './projPg_Expermnts_Single_Maint_OverlayContainer';


/**
 * 
 */
export class ProjectPage_ExperimentsSection_LoggedInUsersInteraction {

	private _initializeCalled = false;

	private _projectIdentifierFromURL;

	private _projectPage_ExperimentsSection_AllUsersInteraction;

	private _scrollBeforeHideMainDiv;

	private _create_Update_Experiment_addedDivElementDOM;

	/**
	 * 
	 */
	constructor({ projectIdentifierFromURL }) {

		this._initializeCalled = false;

        this._projectIdentifierFromURL = projectIdentifierFromURL;

	}

	/**
	 * 
	 */
	initialize({ projectPage_ExperimentsSection_AllUsersInteraction }) {
        
        this._projectPage_ExperimentsSection_AllUsersInteraction = projectPage_ExperimentsSection_AllUsersInteraction;

        this._initializeCalled = true;
	}
	
	/**
	 * Called when "Create New Experiment" button is clicked on main Experiment list
	 */
	createNewExperimentButtonClicked({ event }) {

		const target = event.target;

		this._create_Update_Experiment_Clicked({ experimentId : undefined, makeClone : false });

	}

	/**
	 * 
	 */
	editExperiment({ experimentId }) {

		// console.log("ProjectPage_ExperimentsSection_LoggedInUsersInteraction: editExperiment({ experimentId }): experimentId: " + experimentId );

		this._create_Update_Experiment_Clicked({ experimentId, makeClone : false });
	}

	/**
	 * 
	 */
	cloneExperiment({ experimentId }) {

		// console.log("ProjectPage_ExperimentsSection_LoggedInUsersInteraction: editExperiment({ experimentId }): experimentId: " + experimentId );

		this._create_Update_Experiment_Clicked({ experimentId, makeClone : true });
	}
	
	/**
	 * @param experimentId - optional, not populated for create
	 */
	_create_Update_Experiment_Clicked({ experimentId, makeClone } : { experimentId : number, makeClone : boolean }) {

		const promises = [];

		{
			const promise = this._getSearchesDataForProject();
			promises.push( promise );
		}
		if ( experimentId !== undefined ) {

			const promise = this._getExperimentDataFromServer({ experimentId });
			promises.push( promise );
		}

		const promisesAll = Promise.all( promises );

		promisesAll.catch( (reason) => {  } );
		
		promisesAll.then ( ( promiseResults ) => {
			try {
				const results : { searchList? , searchesSubData? , experimentData?, makeClone : boolean } = { makeClone };
				for ( const promiseResult of promiseResults ) {
					if ( promiseResult.searchList ) {
						results.searchList = promiseResult.searchList
					}
					if ( promiseResult.searchesSubData ) {
						results.searchesSubData = promiseResult.searchesSubData
					}
					if ( promiseResult.experimentData ) {
						results.experimentData = promiseResult.experimentData;
					}
				}

				if ( makeClone ) {
					delete results.experimentData.id;  //  Remove experiment id
					results.experimentData.draft = true; // change draft flag to true
				}
				
				this._open_New_Update_ExperimentOverlay( results );

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
	_getExperimentDataFromServer({ experimentId }) {

		return new Promise( (resolve, reject) => {
			try {
				let requestObj = {
					experimentId
				};

				const url = "d/rws/for-page/experiment/experiment-get";

				const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

				const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

				promise_webserviceCallStandardPost.then( ({ responseData }) => {
					try {
						resolve({ experimentData : responseData });
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
	_getSearchesDataForProject() {

		return new Promise( (resolve, reject) => {
			try {
				const promise_getSearchesDataFromServer = this._getSearchesDataFromServer();

				promise_getSearchesDataFromServer.catch( () => {} );

				promise_getSearchesDataFromServer.then( ({ responseData }) => {

					const searchList = this._getSearchesListFromWebserviceResponse({ responseData });

					const promise_getSearchesSubDataFromServer = this._getSearchesSubDataFromServer({ searchList });

					promise_getSearchesSubDataFromServer.catch( () => {} );

					promise_getSearchesSubDataFromServer.then( ({ searchesSubDataFromServer }) => {

						//  Get Final Search List and Per Search and Ann Type data for the searches

						const searchesSubData = this._create_searchesSubData_From_searchesSubDataFromServer({ searchesSubDataFromServer });

						resolve({ searchList, searchesSubData });
					});
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
	_getSearchesDataFromServer() {

		return new Promise( (resolve, reject) => {
			try {
				let projectIdentifier = this._projectIdentifierFromURL;

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
	_getSearchesListFromWebserviceResponse({ responseData }) {

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


	// const promise_getSearchesSubDataFromServer = this._getSearchesSubDataFromServer({ searchList });

	// promise_getSearchesSubDataFromServer.catch( () => {} );

	// promise_getSearchesSubDataFromServer.then( ({ searchesSubDataFromServer }) => {

	/**
	 * 
	 */
	_getSearchesSubDataFromServer({ searchList }) {

		const projectSearchIds = [];

		for ( const search of searchList ) {
			projectSearchIds.push( search.projectSearchId );
		}

		return new Promise( (resolve, reject) => {
			try {
					
				const promises = [];

				{
					const promise = this._getSearchProgramsPerSearch_FromServer({ projectSearchIds });
					promises.push( promise );
				}
				{
					const promise = this._getSearchAnnotationTypes_FromServer({ projectSearchIds });
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
	_getSearchProgramsPerSearch_FromServer({ projectSearchIds }) {

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
	_getSearchAnnotationTypes_FromServer({ projectSearchIds }) {

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
	_create_searchesSubData_From_searchesSubDataFromServer({ searchesSubDataFromServer }) {

		const dataMap_KeyProjectSearchId = new Map();

		{
			const responseData_SearchAnnotationTypes = searchesSubDataFromServer.responseData_SearchAnnotationTypes;
			const perSearchList = responseData_SearchAnnotationTypes.perSearchList;

			for ( const perSearchEntry of perSearchList ) {

				const projectSearchId = perSearchEntry.projectSearchId;

				//  Convert AnnotationType lists to Maps keyed on Annotation Type Id which is then stored in local variable
				
				const psmFilterableAnnotationTypes = this._convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
					annotationTypeArray : perSearchEntry.psmFilterableAnnotationTypes 
				});
				const reportedPeptideFilterableAnnotationTypes = this._convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
					annotationTypeArray : perSearchEntry.reportedPeptideFilterableAnnotationTypes
				});
				const matchedProteinFilterableAnnotationTypes = this._convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
					annotationTypeArray : perSearchEntry.matchedProteinFilterableAnnotationTypes
				});
				const psmDescriptiveAnnotationTypes = this._convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
					annotationTypeArray : perSearchEntry.psmDescriptiveAnnotationTypes
				})
				const reportedPeptideDescriptiveAnnotationTypes = this._convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
					annotationTypeArray : perSearchEntry.reportedPeptideDescriptiveAnnotationTypes
				});
				const matchedProteinDescriptiveAnnotationTypes = this._convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId({
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
	_convertAnnotationTypeArray_ToMap_KeyedAnnotationTypeId( { annotationTypeArray } ) {

		let annotationTypesMap = new Map();
		
		for ( const annotationTypeItem of annotationTypeArray ) {
			
			Object.freeze( annotationTypeItem );    //  Freeze Object, no changes to properties, no add or remove properties
			
			annotationTypesMap.set( annotationTypeItem.annotationTypeId, annotationTypeItem );
		}
		
		return annotationTypesMap;
	}



	///////////////////////////////////////////////

	/**
	 * 
	 */
	_open_New_Update_ExperimentOverlay({ searchList, searchesSubData, experimentData, makeClone } : { searchList?, searchesSubData?, experimentData?, makeClone : boolean }) {

		{  //  First save scroll position and hide the main root div
			const data_page_outermost_divDOM = document.getElementById("data_page_outermost_div");
			if ( ! data_page_outermost_divDOM ) {
				throw Error("No DOM element with id 'data_page_outermost_div'");
			}
			this._scrollBeforeHideMainDiv = {
				scrollX : window.scrollX,
				scrollY : window.scrollY
			}
			data_page_outermost_divDOM.style.display = "none";
		}

		const searchesData = { searchList, searchesSubData };

		const addedDivElementDOM = document.createElement("div");

		var documentBody = document.querySelector('body');

		documentBody.appendChild( addedDivElementDOM );

		this._create_Update_Experiment_addedDivElementDOM = addedDivElementDOM;
		
		const projectPage_ExperimentsSection_LoggedInUsersInteraction_ForReactComponent = this;

		const renderCompletecallbackFcn = ( ) => { };

		const projectPage_Experiments_SingleExperimentMaint_OverlayContainer_Component = (
			React.createElement(
				ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer,
				{
					projectIdentifierFromURL : this._projectIdentifierFromURL ,
					projectPage_ExperimentsSection_LoggedInUsersInteraction : projectPage_ExperimentsSection_LoggedInUsersInteraction_ForReactComponent ,
					searchesData : searchesData ,
					experimentData : experimentData 
				},
				null
			)
		)

		const renderedReactComponent = ReactDOM.render( 
			projectPage_Experiments_SingleExperimentMaint_OverlayContainer_Component, 
			addedDivElementDOM,
			renderCompletecallbackFcn 
		);
	}

	/**
	 * Close overlay
	 */
	closeOverlay() {

		//  React Unmount Single Experiment Maint

		ReactDOM.unmountComponentAtNode( this._create_Update_Experiment_addedDivElementDOM );

		this._create_Update_Experiment_addedDivElementDOM.remove();


		this._create_Update_Experiment_addedDivElementDOM = undefined;

		this._projectPage_ExperimentsSection_AllUsersInteraction.refreshExperimentLists();

		{  //  Last restore scroll position and show the main root div
			const data_page_outermost_divDOM = document.getElementById("data_page_outermost_div");
			if ( ! data_page_outermost_divDOM ) {
				throw Error("No DOM element with id 'data_page_outermost_div'");
			}
			data_page_outermost_divDOM.style.display = "";
			if ( this._scrollBeforeHideMainDiv ) {
				if ( window.scroll ) {
					window.scroll( this._scrollBeforeHideMainDiv.scrollX /* x-coord */, this._scrollBeforeHideMainDiv.scrollY /* y-coord */ );
				} else {
					console.log("No window.scroll() so calling window.scrollTo(...)");
					window.scrollTo( this._scrollBeforeHideMainDiv.scrollX /* x-coord */, this._scrollBeforeHideMainDiv.scrollY /* y-coord */ );
				}
			}
		}
	}

}

