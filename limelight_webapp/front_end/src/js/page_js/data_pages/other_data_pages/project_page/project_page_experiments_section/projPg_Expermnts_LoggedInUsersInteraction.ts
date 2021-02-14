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

import { getExperimentDataFromServer } from './projPg_Expermnts_Load_ExperimentData';

import {
	getSearchesDataForProject_ExperimentProcessing,
	GetSearchesDataForProject_ExperimentProcessing_Result
} from './projPg_Expermnts_Load_SearchesData_ForProject'

import {
	ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer,
	ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer_Props
} from './projPg_Expermnts_Single_Maint_OverlayContainer';
import {GetSearchesAndFolders_SingleProject_PromiseResponse_Item} from "page_js/data_pages/data_pages_common/single_project_its_searches_and_folders/single_project_its_searches_and_folders_WebserviceRetrieval_TS_Classes";
import {
	AnnotationTypeData_Root,
	SearchProgramsPerSearchData_Root
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {ProjectPage_ExperimentsSection_AllUsersInteraction} from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projPg_Expermnts_AllUsersInteraction";


/**
 * 
 */
export class ProjectPage_ExperimentsSection_LoggedInUsersInteraction {

	private _initializeCalled = false;

	private _projectIdentifierFromURL: string;

	private _projectPage_ExperimentsSection_AllUsersInteraction: ProjectPage_ExperimentsSection_AllUsersInteraction;

	private _scrollBeforeHideMainDiv: { scrollX : number, scrollY : number };

	private _create_Update_Experiment_addedDivElementDOM: HTMLDivElement;

	/**
	 * 
	 */
	constructor({ projectIdentifierFromURL }:{ projectIdentifierFromURL: string }) {

		this._initializeCalled = false;

        this._projectIdentifierFromURL = projectIdentifierFromURL;

	}

	/**
	 * 
	 */
	initialize({ projectPage_ExperimentsSection_AllUsersInteraction }: { projectPage_ExperimentsSection_AllUsersInteraction: ProjectPage_ExperimentsSection_AllUsersInteraction }) {
        
        this._projectPage_ExperimentsSection_AllUsersInteraction = projectPage_ExperimentsSection_AllUsersInteraction;

        this._initializeCalled = true;
	}
	
	/**
	 * Called when "Create New Experiment" button is clicked on main Experiment list
	 */
	createNewExperimentButtonClicked({ event }: { event: any }) {

		const target = event.target;

		this._create_Update_Experiment_Clicked({ experimentId : undefined, makeClone : false });

	}

	/**
	 * 
	 */
	editExperiment({ experimentId }: { experimentId: any }) {

		// console.log("ProjectPage_ExperimentsSection_LoggedInUsersInteraction: editExperiment({ experimentId }): experimentId: " + experimentId );

		this._create_Update_Experiment_Clicked({ experimentId, makeClone : false });
	}

	/**
	 * 
	 */
	cloneExperiment({ experimentId }: { experimentId: any }) {

		// console.log("ProjectPage_ExperimentsSection_LoggedInUsersInteraction: cloneExperiment({ experimentId }): experimentId: " + experimentId );

		this._create_Update_Experiment_Clicked({ experimentId, makeClone : true });
	}
	
	/**
	 * @param experimentId - optional, not populated for create
	 */
	_create_Update_Experiment_Clicked({ experimentId, makeClone } : { experimentId : number, makeClone : boolean }) {

		const promises = [];

		{
			const promise = getSearchesDataForProject_ExperimentProcessing({ projectIdentifier : this._projectIdentifierFromURL });
			promises.push( promise );
		}
		if ( experimentId !== undefined ) {

			const promise = getExperimentDataFromServer({ experimentId });
			promises.push( promise );
		}

		const promisesAll = Promise.all( promises );

		promisesAll.catch( (reason) => {
			throw Error("")
		})

		promisesAll.then ( ( promiseResults ) => {
			try {
				const results : {
					makeClone? : boolean
					searches_TopLevelAndNestedInFolders?: Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
					noSearchesFound? : boolean
					searchList_OnlySearches? : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>;

					searchesSubData? : {
						searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
						annotationTypeData_Root : AnnotationTypeData_Root
					}

					experimentData?: any

				} = {};

				for ( const promiseResult_Unknown of promiseResults ) {

					const promiseResult = promiseResult_Unknown as any

					if ( promiseResult instanceof GetSearchesDataForProject_ExperimentProcessing_Result ) {
						results.noSearchesFound = promiseResult.noSearchesFound;
						results.searches_TopLevelAndNestedInFolders = promiseResult.getSearchesAndFolders_SingleProject_PromiseResponse.items
						results.searchList_OnlySearches = promiseResult.searchList_OnlySearches;
						results.searchesSubData = promiseResult.searchesSubData;
					} else if ( promiseResult.experimentData ) {
						results.experimentData = promiseResult.experimentData;
					} else {
						const msg = "_loadExperimentData(...): promisesAll.then: promiseResult is unknown type";
						console.warn(msg);
						throw Error(msg);
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

	///////////////////////////////////////////////

	/**
	 * 
	 */
	_open_New_Update_ExperimentOverlay(
		{
			makeClone,
			searches_TopLevelAndNestedInFolders,
			noSearchesFound,
			searchList_OnlySearches,
			searchesSubData,
			experimentData
		} :  {
			makeClone? : boolean
			searches_TopLevelAndNestedInFolders?: Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
			noSearchesFound? : boolean
			searchList_OnlySearches? : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>;

			searchesSubData? : {
				searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
				annotationTypeData_Root : AnnotationTypeData_Root
			}

			experimentData?: any

		}) : void {

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

		const searchesData = {
			searches_TopLevelAndNestedInFolders,
			searchList_OnlySearches,
			searchesSubData
		};

		const projectPage_ExperimentsSection_LoggedInUsersInteraction_ForReactComponent = this;

		const ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer_Props : ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer_Props = {
			projectIdentifierFromURL : this._projectIdentifierFromURL ,
			projectPage_ExperimentsSection_LoggedInUsersInteraction : projectPage_ExperimentsSection_LoggedInUsersInteraction_ForReactComponent ,
			searchesData : searchesData ,
			experimentData : experimentData
		}

		const addedDivElementDOM = document.createElement("div");

		var documentBody = document.querySelector('body');

		documentBody.appendChild( addedDivElementDOM );

		this._create_Update_Experiment_addedDivElementDOM = addedDivElementDOM;

		const renderCompletecallbackFcn = ( ) => { };

		const projectPage_Experiments_SingleExperimentMaint_OverlayContainer_Component = (
			React.createElement(
				ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer,
				ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer_Props,
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

