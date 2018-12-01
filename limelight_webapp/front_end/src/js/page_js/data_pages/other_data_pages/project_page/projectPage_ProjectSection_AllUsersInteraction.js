/**
 * projectPage_ProjectSection_AllUsersInteraction.js
 * 
 * Javascript for projectView.jsp page  
 * 
 * Project Section - Provide interaction for All Users (including public users when project is public) 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

//  Import Handlebars templates

let _project_page__project_info_section_all_users_interaction_template = require("../../../../../../handlebars_templates_precompiled/project_page__project_info_section_all_users_interaction/project_page__project_info_section_all_users_interaction_template-bundle.js");

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

//  Local imports



/**
 * 
 */
export class ProjectPage_ProjectSection_AllUsersInteraction {

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction } ) {

		this._initializeCalled = false;
		
		this._projectIdentifierFromURL = projectIdentifierFromURL;
		this._projectPage_ProjectSection_LoggedInUsersInteraction = projectPage_ProjectSection_LoggedInUsersInteraction;

        if ( ! _project_page__project_info_section_all_users_interaction_template.project_notes_outer_container ) {
            throw Error("_project_page__project_info_section_all_users_interaction_template.project_notes_outer_container")
        }
		this._project_notes_outer_container = _project_page__project_info_section_all_users_interaction_template.project_notes_outer_container;

        if ( ! _project_page__project_info_section_all_users_interaction_template.project_notes_entry ) {
            throw Error("_project_page__project_info_section_all_users_interaction_template.project_notes_entry")
        }
		this._project_notes_entry = _project_page__project_info_section_all_users_interaction_template.project_notes_entry;

	}

	/**
	 * 
	 */
	initialize() {
		let objectThis = this;
		
		this._initializeCalled = true;
	};
	
	/**
	 * 
	 */
	getProjectData() {
		
		if ( ! this._initializeCalled ) {
			throw Error( "initialize method not called" );
		}
		
		this._notes_getDataAndDisplay();
	};

	////////////////////////////

	//   Project Notes

	/**
	 * 
	 */		
	_notes_getDataAndDisplay() {

		let objectThis = this;
		
		const promise_notes_getData = this._notes_getData();

		promise_notes_getData.catch((reason) => {

		})

		promise_notes_getData.then(({ projectNotesAjaxresponse }) => {

			objectThis._notes_displayNotes_Main({ projectNotesAjaxresponse });
		})
	}

	/**
	 * 
	 */	
	_notes_getData() {

        const objectThis = this;

        return new Promise((resolve,reject) => {

			const _URL = "d/rws/for-page/project-notes-list/" + getWebserviceSyncTrackingCode();

			const requestObj = { projectIdentifier : this._projectIdentifierFromURL };

			const requestData = JSON.stringify( requestObj );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						resolve( { projectNotesAjaxresponse : responseData } );
						
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						
						reject();
						
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );

					reject();
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject();

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});

        })
	}

	/**
	 * 
	 */	
	_notes_displayNotes_Main({ projectNotesAjaxresponse }) {
		
		const notesList = projectNotesAjaxresponse.resultList;
		const canAdd = projectNotesAjaxresponse.canAdd;

		const noList = ( ( ! notesList ) || notesList.length === 0 );
		const noLoggedInUserOrNoCanAdd = ( ! this._projectPage_ProjectSection_LoggedInUsersInteraction ) || ( ! canAdd );

		if ( noList && noLoggedInUserOrNoCanAdd ) {

			//  No Notes and ( no logged in user or user cannot add notes [not display 'Add Note'] ) so exit
			return;  // EARLY EXIT
		}

		const $project_notes_root_block = $("#project_notes_root_block");
		if ( $project_notes_root_block.length === 0 ) {
			throw Error("No DOM element found with id 'project_notes_root_block'")
		}

		const outerContainerContext = {};

		//  add Notes outer container
		const notesOuterContainerHTML = this._project_notes_outer_container( outerContainerContext );
		const $notesOuterContainer = $( notesOuterContainerHTML );
		$notesOuterContainer.appendTo( $project_notes_root_block );

		// Add Notes list, if present
		this._notes_displayNotes_NotesList({ notesList, $notesOuterContainer });
		
		// Add Notes Add, if allowed for user
		if ( this._projectPage_ProjectSection_LoggedInUsersInteraction ) {
			this._projectPage_ProjectSection_LoggedInUsersInteraction.addNotesAddIfAllowed({ projectNotesAjaxresponse, $notesOuterContainer });
		}
	}

	/**
	 * 
	 */	
	_notes_displayNotes_NotesList({ notesList, $notesOuterContainer }) {
		
		if ( ( ! notesList ) || notesList.length === 0 ) {

			//  No Notes so exit
			return;  // EARLY EXIT
		}

		const $notes_list_container_div = $notesOuterContainer.find("#notes_list_container_div");

		for ( const note of notesList ) {

			const noteHTML = this._project_notes_entry( note );
			const $noteDOM = $( noteHTML );
			$noteDOM.appendTo( $notes_list_container_div );

			if ( ( note.canEdit || note.canDelete ) && this._projectPage_ProjectSection_LoggedInUsersInteraction ) {
				this._projectPage_ProjectSection_LoggedInUsersInteraction.addExistingNoteLoggedInUserAdditions({
					 id : note.id, canEdit : note.canEdit, canDelete : note.canDelete, $noteDOM });
			}
		}
	}

};

