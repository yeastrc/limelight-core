/**
 * projPg_Expermnts_AllUsersInteraction.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Experiments Section - Provide interaction for All Users (including public users when project is public) 
 * 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

import React from 'react';
import ReactDOM from 'react-dom';

import { limelight__IsVariableAString } from 'page_js/common_all_pages/limelight__IsVariableAString';

//  Local imports

import { ProjectPage_ExperimentsSectionRoot, ProjectPage_ExperimentsSectionRoot_Props } from './projPg_ExpermntsSectionRoot';
import { ProjectPage_ExperimentsSection_LoggedInUsersInteraction } from './projPg_Expermnts_LoggedInUsersInteraction';

/**
 * 
 */
export class ProjectPage_ExperimentsSection_AllUsersInteraction {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string;

	private _projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction;

	private _editExperimentInvokeHandler_BindThis = this._editExperimentInvokeHandler.bind(this);
	private _cloneExperimentInvokeHandler_BindThis = this._cloneExperimentInvokeHandler.bind(this)

	private _renderedReactComponent : ProjectPage_ExperimentsSectionRoot;

	/**
	 * searchSelectionChangeCallback - function called when the search selection changes
	 */
	constructor({ 
		projectIdentifierFromURL, 
		projectPage_ExperimentsSection_LoggedInUsersInteraction, // object of class ProjectPage_ExperimentsSection_LoggedInUsersInteraction
	} : { 
		projectIdentifierFromURL : any 
		projectPage_ExperimentsSection_LoggedInUsersInteraction? : ProjectPage_ExperimentsSection_LoggedInUsersInteraction // object of class ProjectPage_ExperimentsSection_LoggedInUsersInteraction
	}) {

		if ( ! limelight__IsVariableAString( projectIdentifierFromURL ) ) {
			const msg = "ProjectPage_ExperimentsSection_AllUsersInteraction:constructor: not a string: projectIdentifierFromURL: " + projectIdentifierFromURL;
			console.warn( msg );
			throw Error( msg );
		}
		if ( projectPage_ExperimentsSection_LoggedInUsersInteraction ) {
			if ( ! ( projectPage_ExperimentsSection_LoggedInUsersInteraction instanceof ProjectPage_ExperimentsSection_LoggedInUsersInteraction ) ) {
				const msg = "ProjectPage_ExperimentsSection_AllUsersInteraction:constructor: ! ( projectPage_ExperimentsSection_LoggedInUsersInteraction instanceof ProjectPage_ExperimentsSection_LoggedInUsersInteraction )";
				console.warn( msg );
				throw Error( msg );
			}
		}
		
		this._projectIdentifierFromURL = projectIdentifierFromURL;

		this._projectPage_ExperimentsSection_LoggedInUsersInteraction = projectPage_ExperimentsSection_LoggedInUsersInteraction;
	}

	/**
	 * 
	 */
	_editExperimentInvokeHandler({ experimentId }:{ experimentId: any }) {

		this._projectPage_ExperimentsSection_LoggedInUsersInteraction.editExperiment({ experimentId });
	}

	/**
	 * 
	 */
	_cloneExperimentInvokeHandler({ experimentId }:{ experimentId: any }) {

		this._projectPage_ExperimentsSection_LoggedInUsersInteraction.cloneExperiment({ experimentId });
	}
	
	/**
	 * 
	 */
	initialize() {

		this._listExperiments();
	
		this._initializeCalled = true;
	}

	/**
	 * 
	 */
	refreshExperimentLists() {

		if ( this._renderedReactComponent ) {
			this._renderedReactComponent.refreshExperimentsLists();
		}
	}

	/**
	 * 
	 */
	_listExperiments() {

		{
			const $experiments_section_block_shown = $("#experiments_section_block_shown")
			if ( $experiments_section_block_shown.length === 0 ) {

				//  No Experiments block so skip initialization

				return;  // EARLY RETURN
			}
		}

		const $experiments_section__top_level_block = $("#experiments_section__top_level_block");
		if ( $experiments_section__top_level_block.length === 0 ) {
			throw Error("NO DOM element with id 'experiments_section__top_level_block'");
		}
		$experiments_section__top_level_block.show();

		const experiments_section__contents_blockDOM = document.getElementById("experiments_section__contents_block");

		if ( experiments_section__contents_blockDOM === null || experiments_section__contents_blockDOM === undefined ) {
			throw Error("NO DOM element with id 'experiments_section__contents_block'");
		}

		const projectPage_ExperimentsSection_LoggedInUsersInteraction_ForReactComponent = this._projectPage_ExperimentsSection_LoggedInUsersInteraction;

		let editExperimentInvokeHandler_BindThis = undefined;
		let cloneExperimentInvokeHandler_BindThis = undefined;

		if ( this._projectPage_ExperimentsSection_LoggedInUsersInteraction ) {

			editExperimentInvokeHandler_BindThis = this._editExperimentInvokeHandler_BindThis;
			cloneExperimentInvokeHandler_BindThis = this._cloneExperimentInvokeHandler_BindThis;
		}

		const projectPage_ExperimentsSectionRoot_Props = new ProjectPage_ExperimentsSectionRoot_Props();

		projectPage_ExperimentsSectionRoot_Props.projectPage_ExperimentsSection_LoggedInUsersInteraction = projectPage_ExperimentsSection_LoggedInUsersInteraction_ForReactComponent ,
		projectPage_ExperimentsSectionRoot_Props.projectIdentifierFromURL = this._projectIdentifierFromURL,
		projectPage_ExperimentsSectionRoot_Props.editExperimentInvokeHandler = editExperimentInvokeHandler_BindThis,
		projectPage_ExperimentsSectionRoot_Props.cloneExperimentInvokeHandler = cloneExperimentInvokeHandler_BindThis

		const renderCompletecallbackFcn = ( ) => { };

		const projectPage_ExperimentsSectionRoot_Component = (
			React.createElement(
				ProjectPage_ExperimentsSectionRoot,
				projectPage_ExperimentsSectionRoot_Props,
				null
			)
		);

		this._renderedReactComponent = ReactDOM.render( 
			projectPage_ExperimentsSectionRoot_Component, 
			experiments_section__contents_blockDOM,
			renderCompletecallbackFcn );
	
		this._initializeCalled = true;
	}
}
