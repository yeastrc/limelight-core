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

import { getSearchesDataForProject } from './projPg_Expermnts_Load_SearchesData_ForProject'

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
			const promise = getSearchesDataForProject({ projectIdentifier : this._projectIdentifierFromURL });
			promises.push( promise );
		}
		if ( experimentId !== undefined ) {

			const promise = getExperimentDataFromServer({ experimentId });
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

