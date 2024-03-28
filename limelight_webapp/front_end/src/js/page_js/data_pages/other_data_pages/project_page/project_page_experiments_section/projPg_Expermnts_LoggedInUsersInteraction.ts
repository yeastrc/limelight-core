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

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

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
import {
	AnnotationTypeData_Root,
	SearchProgramsPerSearchData_Root
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {DefaultFilter_Cutoffs_Overrides_ProjectWide_Root} from "page_js/data_pages/data_pages_common/defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval";
import {
	CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
	CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import { ProjectPage_ExperimentsSectionRoot } from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projPg_ExpermntsSectionRoot";


/**
 * 
 */
export class ProjectPage_ExperimentsSection_LoggedInUsersInteraction {

	private _initializeCalled = false;

	private _projectIdentifierFromURL: string;

	private _projectPage_ExperimentsSectionRoot: ProjectPage_ExperimentsSectionRoot //  Experiment Main Display React Component

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
	 * Set to pass in Experiment Main Display React Component  - ProjectPage_ExperimentsSectionRoot
	 *
	 * Set after the Component is created
	 */
	set_projectPage_ExperimentsSectionRoot( projectPage_ExperimentsSectionRoot: ProjectPage_ExperimentsSectionRoot ) : void {

		this._projectPage_ExperimentsSectionRoot = projectPage_ExperimentsSectionRoot;
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
					searchesSearchTagsFolders_Result_Root?: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
					noSearchesFound? : boolean

					searchesSubData? : {
						searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
						annotationTypeData_Root : AnnotationTypeData_Root
					}
					defaultFilter_Cutoffs_Overrides_ProjectWide_Root?: DefaultFilter_Cutoffs_Overrides_ProjectWide_Root

					experimentData?: any

				} = {};

				for ( const promiseResult_Unknown of promiseResults ) {

					const promiseResult = promiseResult_Unknown as any

					if ( promiseResult instanceof GetSearchesDataForProject_ExperimentProcessing_Result ) {
						results.noSearchesFound = promiseResult.noSearchesFound;
						results.searchesSearchTagsFolders_Result_Root = promiseResult.getSearchesAndFolders_SingleProject_PromiseResponse
						results.searchesSubData = promiseResult.searchesSubData;
						results.defaultFilter_Cutoffs_Overrides_ProjectWide_Root = promiseResult.defaultFilter_Cutoffs_Overrides_ProjectWide_Root
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
			searchesSearchTagsFolders_Result_Root,
			searchList_OnlySearches,
			noSearchesFound,
			searchesSubData,
			defaultFilter_Cutoffs_Overrides_ProjectWide_Root,
			experimentData
		} :  {
			makeClone? : boolean
			searchesSearchTagsFolders_Result_Root?: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
			searchList_OnlySearches? : Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data>;

			noSearchesFound? : boolean

			searchesSubData? : {
				searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
				annotationTypeData_Root : AnnotationTypeData_Root
			}
			defaultFilter_Cutoffs_Overrides_ProjectWide_Root?: DefaultFilter_Cutoffs_Overrides_ProjectWide_Root

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
			searchesSearchTagsFolders_Result_Root,
			searchesSubData,
			defaultFilter_Cutoffs_Overrides_ProjectWide_Root
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
		
		if ( ! this._create_Update_Experiment_addedDivElementDOM ) {
			
			//  No longer has a value so code has already run.
			
			return; // EARLY RETURN
		}

		ReactDOM.unmountComponentAtNode( this._create_Update_Experiment_addedDivElementDOM );

		this._create_Update_Experiment_addedDivElementDOM.remove();


		this._create_Update_Experiment_addedDivElementDOM = undefined;

		if ( this._projectPage_ExperimentsSectionRoot ) {
			this._projectPage_ExperimentsSectionRoot.refreshExperimentsLists();
		}

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

