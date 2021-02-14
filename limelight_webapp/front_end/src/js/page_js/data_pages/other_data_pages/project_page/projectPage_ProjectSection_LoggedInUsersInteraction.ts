/**
 * projectPage_ProjectSection_LoggedInUsersInteraction.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Project Info Section - Provide interaction for Logged In Users
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

//  Import Handlebars templates

// @ts-ignore
import { _project_page__project_info_section_logged_in_users_interaction,_project_page__project_info_section_all_users_interaction_template  } from './projectPage__Common__ImportHandlebarsTemplates'


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage';

import { addToolTips, addSingleGenericAppSpecificToolTip } from 'page_js/common_all_pages/genericToolTip';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {ProjectPage_ProjectSection_AllUsersInteraction} from "page_js/data_pages/other_data_pages/project_page/projectPage_ProjectSection_AllUsersInteraction";

//  Local imports



/**
 * 
 */
export class ProjectPage_ProjectSection_LoggedInUsersInteraction {

    private _initializeCalled = false;

    private _projectIdentifierFromURL : string
    private _project_notes_entry_edit = _project_page__project_info_section_logged_in_users_interaction.project_notes_entry_edit;
    private _project_notes_add_note_container_and_link = _project_page__project_info_section_logged_in_users_interaction.project_notes_add_note_container_and_link;
    private _project_notes_add_note_add_note_input = _project_page__project_info_section_logged_in_users_interaction.project_notes_add_note_add_note_input;
    private _project_notes_entry = _project_page__project_info_section_all_users_interaction_template.project_notes_entry;

    private _projectPage_ProjectSection_AllUsersInteraction : ProjectPage_ProjectSection_AllUsersInteraction

	/**
	 * 
	 */
	constructor(
	    {
            projectIdentifierFromURL, projectLocked
	    } : {
            projectIdentifierFromURL: string
            projectLocked: boolean
        }) {

		this._initializeCalled = false;
		
		this._projectIdentifierFromURL = projectIdentifierFromURL;

        if ( ! _project_page__project_info_section_logged_in_users_interaction.project_notes_entry_edit ) {
            throw Error("_project_page__project_info_section_logged_in_users_interaction.project_notes_entry_edit")
        }
        if ( ! _project_page__project_info_section_logged_in_users_interaction.project_notes_add_note_container_and_link ) {
            throw Error("_project_page__project_info_section_logged_in_users_interaction.project_notes_add_note_container_and_link")
        }
        if ( ! _project_page__project_info_section_logged_in_users_interaction.project_notes_add_note_add_note_input ) {
            throw Error("_project_page__project_info_section_logged_in_users_interaction.project_notes_add_note_add_note_input")
        }
        if ( ! _project_page__project_info_section_all_users_interaction_template.project_notes_entry ) {
            throw Error("_project_page__project_info_section_all_users_interaction_template.project_notes_entry")
        }
	}

	/**
	 * 
	 */
	initialize({ projectPage_ProjectSection_AllUsersInteraction } : { projectPage_ProjectSection_AllUsersInteraction : ProjectPage_ProjectSection_AllUsersInteraction }) {
        let objectThis = this;
        
        this._projectPage_ProjectSection_AllUsersInteraction = projectPage_ProjectSection_AllUsersInteraction;
		
        this._initializeCalled = true;
    }

	/**
	 * Add Notes Add, if allowed for user
	 */
    addNotesAddIfAllowed({ projectNotesAjaxresponse, $notesOuterContainer }: { projectNotesAjaxresponse: any, $notesOuterContainer: any }) {

        const objectThis = this;

        if ( ! projectNotesAjaxresponse.canAdd ) {
            //  Cannot add note so exit
            return;
        }

        const addNoteContainerHTML = this._project_notes_add_note_container_and_link({});
        const $addNoteContainer = $( addNoteContainerHTML );
        $addNoteContainer.appendTo( $notesOuterContainer );

		addToolTips( $addNoteContainer );  // External Function

        const $selector_add_note_init_input = $addNoteContainer.find(".selector_add_note_init_input");
        if ( $selector_add_note_init_input.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_init_input'");
        }
        $selector_add_note_init_input.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
                objectThis._open_AddNote_Block( { clickThis } );
                return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
    }

	/**
	 * 
	 */
    addExistingNoteLoggedInUserAdditions({ id, canEdit ,canDelete, $noteDOM }: { id: any, canEdit: any, canDelete: any, $noteDOM: any }) {

        const objectThis = this;

        if ( canEdit ) {
            const $selector_note_update = $noteDOM.find(".selector_note_update");
            if ( $selector_note_update.length === 0 ) {
                throw Error("Failed to find DOM element with class 'selector_note_update'");
            }
            $selector_note_update.click(function(eventObject: any) {
                try {
                    eventObject.preventDefault(); // to stop the
                    let clickThis = this;
                    objectThis._editNoteClicked( { clickThis, id } );
                    return false;
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }
        if ( canDelete ) {
            const $selector_note_remove = $noteDOM.find(".selector_note_remove");
            if ( $selector_note_remove.length === 0 ) {
                throw Error("Failed to find DOM element with class 'selector_note_remove'");
            }
            $selector_note_remove.click(function(eventObject: any) {
                try {
                    eventObject.preventDefault(); // to stop the
                    let clickThis = this;
                    objectThis._deleteNoteClicked( { clickThis, id } );
                    return false;
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }
    }

	/**
	 * Add/Show the Add Note Block with input and buttons
	 */    
    _open_AddNote_Block( { clickThis } :  { clickThis: any } ) {

        const objectThis = this;

        const $selector_add_note_inner_root_container = $( clickThis ).closest(".selector_add_note_inner_root_container");
        if ( $selector_add_note_inner_root_container.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_inner_root_container'");
        }

        const $selector_add_note_container = $selector_add_note_inner_root_container.find(".selector_add_note_container")
        if ( $selector_add_note_inner_root_container.length !== 0 ) {
            $selector_add_note_container.remove();  //  Remove prev entry
        }
        //  Add input to DOM
        const add_note_inputHTML = this._project_notes_add_note_add_note_input({});
        const $add_note_input = $( add_note_inputHTML );
        $add_note_input.appendTo( $selector_add_note_inner_root_container );

        addToolTips( $add_note_input );  // External Function

        const $selector_add_note_save_button = $add_note_input.find(".selector_add_note_save_button");
        if ( $selector_add_note_save_button.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_save_button'");
        }
        const $selector_add_note_cancel_button = $add_note_input.find(".selector_add_note_cancel_button");
        if ( $selector_add_note_cancel_button.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_cancel_button'");
        }

        $selector_add_note_save_button.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
                objectThis._addNote_AddClicked( { clickThis } );
                return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });
        $selector_add_note_cancel_button.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
                objectThis._addNote_CancelClicked( { clickThis } );
                return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });
        const $selector_add_note_field = $selector_add_note_inner_root_container.find(".selector_add_note_field");
        if ( $selector_add_note_field.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_field'");
        }
        $selector_add_note_field.focus();

        const $selector_add_note_button_container_div = $selector_add_note_inner_root_container.find(".selector_add_note_button_container_div");
        if ( $selector_add_note_button_container_div.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_button_container_div'");
        }
        $selector_add_note_button_container_div.hide();
    }

	/**
	 * Remove the Add Note Block with input and buttons
	 */  
    _addNote_CancelClicked( { clickThis }: { clickThis: any } ) {

        const $selector_add_note_inner_root_container = $( clickThis ).closest(".selector_add_note_inner_root_container");
        if ( $selector_add_note_inner_root_container.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_inner_root_container'");
        }

        const $selector_add_note_container = $selector_add_note_inner_root_container.find(".selector_add_note_container")
        if ( $selector_add_note_container.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_container'");
        }
        $selector_add_note_container.remove();  //  Remove entry

        const $selector_add_note_button_container_div = $selector_add_note_inner_root_container.find(".selector_add_note_button_container_div");
        if ( $selector_add_note_button_container_div.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_button_container_div'");
        }
        $selector_add_note_button_container_div.show();
    }

	/**
	 * Add the Note, Update DOM
	 */  
    _addNote_AddClicked( { clickThis }: { clickThis: any }  ) {

        const $selector_add_note_inner_root_container = $( clickThis ).closest(".selector_add_note_inner_root_container");
        if ( $selector_add_note_inner_root_container.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_inner_root_container'");
        }

        const $selector_add_note_field = $selector_add_note_inner_root_container.find(".selector_add_note_field");
        if ( $selector_add_note_field.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_add_note_field'");
        }
        const noteText = $selector_add_note_field.val();
        if (noteText === undefined || noteText === null || noteText === "") {
    //		alert("Note cannot be empty");
            
            const $element = $selector_add_note_inner_root_container.find(".selector_error_message_project_note_required");
            if ( $element.length === 0 ) {
                throw Error("Failed to find DOM element with class 'selector_error_message_project_note_required'");
            }
            showErrorMsg( $element, undefined /* clearMsg */ );
            return;  //  !!!  EARLY EXIT
        }

        const promise_addNote_SaveToServer = this._addNote_SaveToServer({ noteText });

        promise_addNote_SaveToServer.catch((reason) => {

        })

        promise_addNote_SaveToServer.then((result) => {
            try {
                if ( ! result ) {
                    return;  //  No Result
                }

                const addNote_SaveToServer_AjaxResponse = result.addNote_SaveToServer_AjaxResponse;

                //  Add Note to Notes

                const $notes_list_container_div = $("#notes_list_container_div");
                if ( $notes_list_container_div.length === 0 ) {
                    throw Error("Failed to find DOM element with id 'notes_list_container_div'");
                }

                const note = {
                    id : addNote_SaveToServer_AjaxResponse.insertedId,
                    noteText,
                    canEdit : true,
                    canDelete : true
                };

                const noteHTML = this._project_notes_entry( note );
                const $noteDOM = $( noteHTML );
                $noteDOM.appendTo( $notes_list_container_div );

        		addToolTips( $noteDOM );  // External Function

                this.addExistingNoteLoggedInUserAdditions({ id : note.id, canEdit : note.canEdit, canDelete : note.canDelete, $noteDOM });

                //  Remove Add Note and show Add Note link

                const $selector_add_note_container = $selector_add_note_inner_root_container.find(".selector_add_note_container")
                if ( $selector_add_note_container.length === 0 ) {
                    throw Error("Failed to find DOM element with class 'selector_add_note_container'");
                }
                $selector_add_note_container.remove();  //  Remove entry

                const $selector_add_note_button_container_div = $selector_add_note_inner_root_container.find(".selector_add_note_button_container_div");
                if ( $selector_add_note_button_container_div.length === 0 ) {
                    throw Error("Failed to find DOM element with class 'selector_add_note_button_container_div'");
                }
                $selector_add_note_button_container_div.show();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

    }

	/**
	 * 
	 */	
	_addNote_SaveToServer({ noteText }: { noteText: any } ) : Promise<any> {

        const objectThis = this;

        return new Promise((resolve,reject) => {
            try {
                const requestObj = { noteText, projectIdentifier : this._projectIdentifierFromURL };

                const url = "d/rws/for-page/project-note-add";

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
                        resolve( { addNote_SaveToServer_AjaxResponse : responseData } );
                        
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
    
    //////////////////////////////

    //   Edit Note

	/**
	 * 
	 */
    _editNoteClicked( { clickThis, id } : { clickThis: any, id: any } ) {

        const objectThis = this;

        const $selector_note_root_container_div = $( clickThis ).closest(".selector_note_root_container_div");
        if ( $selector_note_root_container_div.length === 0 ) {
            throw Error("No DOM element found with class 'selector_note_root_container_div'");
        }

        //  Get existing note value

        const $notes_text_jq = $selector_note_root_container_div.find(".notes_text_jq");
        if ( $notes_text_jq.length === 0 ) {
            throw Error("No DOM element found with class 'notes_text_jq'");
        }
        const noteText = $notes_text_jq.text();
       
        //  Add Edit HTML to DOM
        
        // container to put it in
        const $selector_note_update_container = $selector_note_root_container_div.find(".selector_note_update_container");
        if ( $selector_note_update_container.length === 0 ) {
            throw Error("No DOM element found with class 'selector_note_update_container'");
        }
        $selector_note_update_container.empty();

        const project_notes_entry_editHTML = this._project_notes_entry_edit({ noteText });
        const $project_notes_entry_edit = $( project_notes_entry_editHTML );
        $project_notes_entry_edit.appendTo( $selector_note_update_container );

        const $selector_note_maint_cancel_button = $project_notes_entry_edit.find(".selector_note_maint_cancel_button");
        if ( $selector_note_maint_cancel_button.length === 0 ) {
            throw Error("No DOM element found with class 'selector_note_maint_cancel_button'");
        }
        $selector_note_maint_cancel_button.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
                objectThis._editNote_CancelClicked( { clickThis } );
                return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });      
        
        const $selector_note_maint_save_button = $project_notes_entry_edit.find(".selector_note_maint_save_button");
        if ( $selector_note_maint_save_button.length === 0 ) {
            throw Error("No DOM element found with class 'selector_note_maint_save_button'");
        }
        $selector_note_maint_save_button.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
                objectThis._editNote_SaveClicked( { clickThis, id } );
                return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});       

        //  Hide display of note
        const $selector_note_display_container = $selector_note_root_container_div.find(".selector_note_display_container");
        if ( $selector_note_display_container.length === 0 ) {
            throw Error("No DOM element found with class 'selector_note_display_container'");
        }
        $selector_note_display_container.hide();
    }

	/**
	 * 
	 */
    _editNote_RemoveEditInputAndShowNote( { $selector_note_root_container_div }: { $selector_note_root_container_div: any } ) {

        //  Remove Edit HTML from DOM
        
        // container to put it in
        const $selector_note_update_container = $selector_note_root_container_div.find(".selector_note_update_container");
        if ( $selector_note_update_container.length === 0 ) {
            throw Error("No DOM element found with class 'selector_note_update_container'");
        }
        $selector_note_update_container.empty();

        //  Show display of note
        const $selector_note_display_container = $selector_note_root_container_div.find(".selector_note_display_container");
        if ( $selector_note_display_container.length === 0 ) {
            throw Error("No DOM element found with class 'selector_note_display_container'");
        }
        $selector_note_display_container.show();
    }

	/**
	 * 
	 */
    _editNote_CancelClicked( { clickThis }: { clickThis: any } ) {

        const $selector_note_root_container_div = $( clickThis ).closest(".selector_note_root_container_div");
        if ( $selector_note_root_container_div.length === 0 ) {
            throw Error("No DOM element found with class 'selector_note_root_container_div'");
        }
       
        this._editNote_RemoveEditInputAndShowNote( { $selector_note_root_container_div } );
    }


	/**
	 * 
	 */
    _editNote_SaveClicked( { clickThis, id }: { clickThis: any, id: any } ) {

        const $selector_note_root_container_div = $( clickThis ).closest(".selector_note_root_container_div");
        if ( $selector_note_root_container_div.length === 0 ) {
            throw Error("No DOM element found with class 'selector_note_root_container_div'");
        }

        const $note_maint_textarea_jq = $selector_note_root_container_div.find(".note_maint_textarea_jq");
        if ( $note_maint_textarea_jq.length === 0 ) {
            throw Error("No DOM element found with class 'selector_note_root_container_div'");
        }

        const noteText : any = $note_maint_textarea_jq.val();

        if (noteText === undefined || noteText === null || noteText === "") {
    //		alert("Note cannot be empty");
            
            const $element = $selector_note_root_container_div.find(".error_message_project_note_required_jq");
            if ( $element.length === 0 ) {
                throw Error("Failed to find DOM element with class 'error_message_project_note_required_jq'");
            }
            showErrorMsg( $element, undefined /* clearMsg */ );
            return;  //  !!!  EARLY EXIT
        }
        

        const promise_editNote_SaveToServer = this._editNote_SaveToServer({ id, noteText });

        promise_editNote_SaveToServer.catch((reason) => {
            try {

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promise_editNote_SaveToServer.then((result) => {
            try {
                //  assume success if get here
                //  Update note text in DOM

                const $selector_note_root_container_div = $( clickThis ).closest(".selector_note_root_container_div");
                if ( $selector_note_root_container_div.length === 0 ) {
                    throw Error("No DOM element found with class 'selector_note_root_container_div'");
                }

                const $notes_text_jq = $selector_note_root_container_div.find(".notes_text_jq");
                if ( $notes_text_jq.length === 0 ) {
                    throw Error("No DOM element found with class 'notes_text_jq'");
                }
                $notes_text_jq.text( noteText );

                this._editNote_RemoveEditInputAndShowNote( { $selector_note_root_container_div } );
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

	/**
	 * 
	 */	
	_editNote_SaveToServer({ id, noteText } : { id: any, noteText: any }) {

        const objectThis = this;

        return new Promise((resolve,reject) => {
          try {
			const requestObj = { id, noteText };

			const url = "d/rws/for-page/project-note-update-text";

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

			promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                try {
                    resolve( { editNote_SaveToServer_AjaxResponse : responseData } );
                    
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

    //////////////////////////////

    //   Delete Note

	/**
	 * 
	 */
    _deleteNoteClicked( { clickThis, id } : { clickThis: any, id: any } ) {

        if ( ! window.confirm("Delete Note?") ) {
            return; 
        }

        const promise_deleteNote_DeleteFromServer = this._deleteNote_DeleteFromServer({ id });

        promise_deleteNote_DeleteFromServer.catch((reason) => {

        })

        promise_deleteNote_DeleteFromServer.then((result) => {
            try {
                //  assume success if get here
                //  Remove note from DOM
                const $selector_note_root_container_div = $( clickThis ).closest( ".selector_note_root_container_div" );
                $selector_note_root_container_div.remove();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

	/**
	 * 
	 */	
	_deleteNote_DeleteFromServer({ id } : { id: any }) {

        const objectThis = this;

        return new Promise((resolve,reject) => {
          try {
			const requestObj = { id };

			const url = "d/rws/for-page/project-note-delete";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    resolve( { deleteNote_DeleteFromServer_AjaxResponse : responseData } );
                    
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
}
