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

import { Handlebars, _project_page__project_info_section_all_users_interaction_template } from '../../projectPage__Common__ImportHandlebarsTemplates'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { addToolTips } from 'page_js/common_all_pages/genericToolTip';
import {ProjectPage_ProjectSection_LoggedInUsersInteraction} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_LoggedInUsersInteraction";
import {ProjectPage_ProjectSection_ProjectOwnerInteraction} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_ProjectOwnerInteraction";
import {limelight__Encode_TextString_Escaping_HTML} from "page_js/common_all_pages/limelight__Encode_TextString_Escaping_HTML";

//  Local imports



/**
 * 
 */
export class ProjectPage_ProjectSection_AllUsersInteraction {

	private _initializeCalled = false;
	private _projectIdentifierFromURL : string
	private _projectPage_ProjectSection_LoggedInUsersInteraction : ProjectPage_ProjectSection_LoggedInUsersInteraction
	private _projectPage_ProjectSection_ProjectOwnerInteraction : ProjectPage_ProjectSection_ProjectOwnerInteraction

	private _project_abstract_contents_from_server_NotEncoded: string

	private _project_notes_outer_container = _project_page__project_info_section_all_users_interaction_template.project_notes_outer_container;
	private _project_notes_entry = _project_page__project_info_section_all_users_interaction_template.project_notes_entry;

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction, projectPage_ProjectSection_ProjectOwnerInteraction } : {

		projectIdentifierFromURL : string
		projectPage_ProjectSection_LoggedInUsersInteraction? : ProjectPage_ProjectSection_LoggedInUsersInteraction
		projectPage_ProjectSection_ProjectOwnerInteraction? : ProjectPage_ProjectSection_ProjectOwnerInteraction
	} ) {

		this._initializeCalled = false;
		
		this._projectIdentifierFromURL = projectIdentifierFromURL;
		this._projectPage_ProjectSection_LoggedInUsersInteraction = projectPage_ProjectSection_LoggedInUsersInteraction;
		this._projectPage_ProjectSection_ProjectOwnerInteraction = projectPage_ProjectSection_ProjectOwnerInteraction;

        if ( ! _project_page__project_info_section_all_users_interaction_template.project_notes_outer_container ) {
            throw Error("_project_page__project_info_section_all_users_interaction_template.project_notes_outer_container")
        }
        if ( ! _project_page__project_info_section_all_users_interaction_template.project_notes_entry ) {
            throw Error("_project_page__project_info_section_all_users_interaction_template.project_notes_entry")
        }
	}

	/**
	 * 
	 */
	initialize() {

		this._add_AbstractToPage();

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

	///   Project Abstract


	/**
	 *
	 */
	private _add_AbstractToPage() {

		//   Process Search Data Lookup Parameters JSON and Code from DOM <script> text element

		this._project_abstract_contents_from_server_NotEncoded = _getDOMElementContents_UnEncode_HTML_To_Text( "project_abstract_contents_from_server" );
		if ( this._project_abstract_contents_from_server_NotEncoded === undefined || this._project_abstract_contents_from_server_NotEncoded === null ) {
			throw Error("No DOM element with ID 'project_abstract_contents_from_server' or contents failed to parse as HTML");
		}

		this.put_Abstract_NotEncoded_Onto_Page({ abstract_NotEncoded_Onto_Page: this._project_abstract_contents_from_server_NotEncoded })

		if ( this._projectPage_ProjectSection_ProjectOwnerInteraction ) {

			this._projectPage_ProjectSection_ProjectOwnerInteraction.
			get_projectPage_ProjectSection_Abstract_ProjectOwnerInteraction().
			initialize_After_AllUsersInteraction_add_AbstractToPage({
				abstract_NotEncoded: this._project_abstract_contents_from_server_NotEncoded,
				projectPage_ProjectSection_AllUsersInteraction: this
			});
		}

		//  Show "Abstract" overall container ( remove display: none )

		const abstract_display_outer_containerDOM = document.getElementById("abstract_display_outer_container");
		if ( ! abstract_display_outer_containerDOM ) {
			throw Error("No DOM element with id 'abstract_display_outer_container'")
		}
		abstract_display_outer_containerDOM.style.display = "";  // remove 'none' so is shown
	}

	/**
	 *
	 * @param abstract_NotEncoded_Onto_Page
	 */
	put_Abstract_NotEncoded_Onto_Page(
		{
			abstract_NotEncoded_Onto_Page
		} : {
			abstract_NotEncoded_Onto_Page: string
		}
	) : void {

		const abstract_Escaping_HTML = limelight__Encode_TextString_Escaping_HTML( abstract_NotEncoded_Onto_Page )

		const abstract_Final = this._updateString__Input_escapedHTML__Apply__Urlify__NewLineToBR( abstract_Escaping_HTML );

		const project_abstract_displayDOM = document.getElementById("project_abstract_display");
		if ( ! project_abstract_displayDOM ) {
			throw Error("No DOM element with id 'project_abstract_display'")
		}
		project_abstract_displayDOM.innerHTML = abstract_Final;
	}


	////////////////////////////

	//   Project Notes

	/**
	 * 
	 */		
	_notes_getDataAndDisplay() {

		let objectThis = this;
		
		const promise_notes_getData = this._notes_getData();

		promise_notes_getData.catch((reason) => {
			try {

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		})

		promise_notes_getData.then(({ projectNotesAjaxresponse }) => {
			try {
				objectThis._notes_displayNotes_Main({ projectNotesAjaxresponse });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		})
	}

	/**
	 * 
	 */	
	_notes_getData() {

        const objectThis = this;

        return new Promise((resolve,reject) => {
						try {
								const requestObj = { projectIdentifier : this._projectIdentifierFromURL };

								const url = "d/rws/for-page/project-notes-list";

								const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;
				
								const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
				
								promise_webserviceCallStandardPost.catch( () => { 
									try { 
										reject(); 
									} catch( e ) {
										reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
										throw e;
									}
								});

								promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
										try {
												resolve( { projectNotesAjaxresponse : responseData } );
											
										} catch( e ) {
												reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
												
												reject();
												
												throw e;
										}
								});
						} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
						}
        });
	}

	/**
	 * 
	 */	
	_notes_displayNotes_Main({ projectNotesAjaxresponse }:{ projectNotesAjaxresponse: any }) {
		
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
	_notes_displayNotes_NotesList({ notesList, $notesOuterContainer }:{ notesList: any, $notesOuterContainer: any }) {
		
		if ( ( ! notesList ) || notesList.length === 0 ) {

			//  No Notes so exit
			return;  // EARLY EXIT
		}

		const $notes_list_container_div = $notesOuterContainer.find("#notes_list_container_div");

		for ( const note of notesList ) {

			const noteHTML__Apply__Urlify__NewLineToBR = this.noteObject_For_Template__To__NoteHTML(note)

			const $noteDOM = $( noteHTML__Apply__Urlify__NewLineToBR );
			$noteDOM.appendTo( $notes_list_container_div );

			addToolTips( $noteDOM );  // External Function

			if ( ( note.canEdit || note.canDelete ) && this._projectPage_ProjectSection_LoggedInUsersInteraction ) {
				this._projectPage_ProjectSection_LoggedInUsersInteraction.addExistingNoteLoggedInUserAdditions({
					 id : note.id, canEdit : note.canEdit, canDelete : note.canDelete, $noteDOM });
			}
		}
	}

	/**
	 *
	 * @param noteObject
	 */
	noteObject_For_Template__To__NoteHTML( noteObject: any ) : string {

		const noteHTML = this._project_notes_entry( noteObject );

		const noteHTML__Apply__Urlify__NewLineToBR = this.update_NOTE_String__Input_escapedHTML__Apply__Urlify( noteHTML )

		return noteHTML__Apply__Urlify__NewLineToBR;
	}


	/////////////////


	private _updateString__Input_escapedHTML__Apply__Urlify__NewLineToBR(textString_After_Escaping_HTML: string ) : string {

		const textString_After_Urlify = urlify(textString_After_Escaping_HTML);

		let textString_After_Remove_NewLine_AtEnd = textString_After_Urlify;
		while ( textString_After_Remove_NewLine_AtEnd.endsWith("\n") ) {
			textString_After_Remove_NewLine_AtEnd = textString_After_Remove_NewLine_AtEnd.substring(0, textString_After_Remove_NewLine_AtEnd.length - 1 );
		}

		const textString_After_NewLine = textString_After_Remove_NewLine_AtEnd.replaceAll("\n", "<br/>")

		const textString_Final = textString_After_NewLine;

		return textString_Final;
	}

	/**
	 * Separate version for NOTE since CANNOT change \n to <br> since template has a number of '\n' in it.
	 *
	 * @param textString_After_Escaping_HTML
	 * @private
	 */
	update_NOTE_String__Input_escapedHTML__Apply__Urlify(textString_After_Escaping_HTML: string ) : string {

		const textString_After_Urlify = urlify(textString_After_Escaping_HTML);

		const textString_Final = textString_After_Urlify;

		//  CANNOT change \n to <br> since template has a number of '\n' in it.

		// let textString_After_Remove_NewLine_AtEnd = textString_After_Urlify;
		//
		// while ( textString_After_Remove_NewLine_AtEnd.endsWith("\n") ) {
		// 	textString_After_Remove_NewLine_AtEnd = textString_After_Remove_NewLine_AtEnd.substring(0, textString_After_Remove_NewLine_AtEnd.length - 1 );
		// }
		//
		// const textString_After_NewLine = textString_After_Remove_NewLine_AtEnd.replaceAll("\n", "<br/>")
		//
		// const textString_Final = textString_After_NewLine;

		return textString_Final;
	}



};




const urlify = (text) => {
	const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return text.replace(urlRegex, (url) => {
		console.log("In 'text.replace(...)': url: " + url )
		return `<a href="${url}" target="_blank" rel="noreferrer" rel="noopener" >${url}</a>`;
	})
}

/**
 *
 * @param domElementIdString
 */
const _getDOMElementContents_UnEncode_HTML_To_Text = function ( domElementIdString : string ) : string {

	const domElementRef = document.getElementById(domElementIdString);
	if ( ! domElementRef ) {
		// Not on Page so exit
		return null; // EARLY EXIT
	}

	let domElementContents_Inside_HTML_BODY_Tags : string = null;

	{
		const innerText = domElementRef.innerText

		const domparser = new DOMParser()

		try {
			const doc = domparser.parseFromString(innerText, "text/html")

			const body = doc.body;

			domElementContents_Inside_HTML_BODY_Tags = body.innerText;

		} catch (e) {
			// Not parsable Value so exit
			return null; // EARLY EXIT
		}
	}
	try {
		domElementRef.remove();
	} catch (e) {
		// swallow any exception
	}

	return domElementContents_Inside_HTML_BODY_Tags;
}
