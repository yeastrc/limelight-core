/**
 * projectPage_SavedViews_Section_LoggedInUsersInteraction.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Saved Views Section - Provide interaction for Logged In Users
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//  module import 

//  Import Handlebars templates

// @ts-ignore
import { _project_page__saved_views_section_loggedin_users_template } from './projectPage__Common__ImportHandlebarsTemplates'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {ProjectPage_SavedViews_Section_AllUsersInteraction} from "page_js/data_pages/other_data_pages/project_page/projectPage_SavedViews_Section_AllUsersInteraction";

//  Local imports

/**
 * 
 */
export class ProjectPage_SavedViews_Section_LoggedInUsersInteraction {

    private _initializeCalled = false;

    private _projectIdentifierFromURL: string;

    private _projpg_saved_view_list_item_edit_label_template = _project_page__saved_views_section_loggedin_users_template.projpg_saved_view_list_item_edit_label;

    private _projectPage_SavedViews_Section_AllUsersInteraction: ProjectPage_SavedViews_Section_AllUsersInteraction;

	/**
	 * 
	 */
	constructor({ 
		projectIdentifierFromURL
	}:{
        projectIdentifierFromURL: string
    }) {

		this._projectIdentifierFromURL = projectIdentifierFromURL;

		if (!_project_page__saved_views_section_loggedin_users_template.projpg_saved_view_list_item_edit_label) {
			throw Error("Nothing in _project_page__saved_views_section_loggedin_users_template.projpg_saved_view_list_item_edit_label");
		}
	}

	/**
	 * 
	 */
	initialize({projectPage_SavedViews_Section_AllUsersInteraction}:{ projectPage_SavedViews_Section_AllUsersInteraction: ProjectPage_SavedViews_Section_AllUsersInteraction }) {
        
        this._projectPage_SavedViews_Section_AllUsersInteraction = projectPage_SavedViews_Section_AllUsersInteraction;

		this._initializeCalled = true;
	}

	/**
	 * 
	 */
    add_ClickHandlers({ $saved_view_entry, savedViewItem }:{ $saved_view_entry: any, savedViewItem: any }) {
        
        let objectThis = this;
        
        const id = savedViewItem.id;
		const canEdit = savedViewItem.canEdit;
        const canDelete = savedViewItem.canDelete;
        
        if ( canEdit ) {

            const $selector_edit_saved_view_label = $saved_view_entry.find(".selector_edit_saved_view_label");
            if ( $selector_edit_saved_view_label.length === 0 ) {
                console.log("WARN: No DOM element found with class 'selector_edit_saved_view_label'");
            }
            $selector_edit_saved_view_label.click(function(eventObject: any) {
                try {
                    eventObject.preventDefault(); // to stop the
                    let clickThis = this;
                    objectThis._editSavedViewLabel_Clicked({
                        clickThis ,
                        id
                    });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        }

        if ( canDelete ) {

            const $selector_delete_saved_view = $saved_view_entry.find(".selector_delete_saved_view");
            if ( $selector_delete_saved_view.length === 0 ) {
                console.log("WARN: No DOM element found with class 'selector_delete_saved_view'");
            }
            $selector_delete_saved_view.click(function(eventObject: any) {
                try {
                    eventObject.preventDefault(); // to stop the
                    let clickThis = this;
                    objectThis._deleteSavedView_Clicked({
                        clickThis ,
                        id
                    });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        }
    }

	/**
	 * 
	 */
    _editSavedViewLabel_Clicked({ clickThis, id }: { clickThis: any, id: any }) {

        const objectThis = this;

        const $clickThis = $( clickThis );

        const $selector_saved_view_item_display_container = $clickThis.closest(".selector_saved_view_item_display_container");
        if ( $selector_saved_view_item_display_container.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_display_container'");
        }
        $selector_saved_view_item_display_container.hide();

        //  Get current label text
        const $selector_saved_view_item_label = $selector_saved_view_item_display_container.find(".selector_saved_view_item_label");
        if ( $selector_saved_view_item_label.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_label'");
        }
        const labelText = $selector_saved_view_item_label.text();

        //  Add edit HTML and update label text

        const $selector_saved_view_item_root_container = $clickThis.closest(".selector_saved_view_item_root_container");
        if ( $selector_saved_view_item_root_container.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_root_container'");
        }
        
        const editHTML = this._projpg_saved_view_list_item_edit_label_template();
        const $editElement = $( editHTML );
        $selector_saved_view_item_root_container.append( $editElement );

        const $selector_saved_view_item_edit_label_input = $editElement.find(".selector_saved_view_item_edit_label_input");
        if ( $selector_saved_view_item_edit_label_input.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_edit_label_input'");
        }
        $selector_saved_view_item_edit_label_input.val( labelText );

        //  Add click handlers
        const $selector_saved_view_item_edit_label_cancel_button = $editElement.find(".selector_saved_view_item_edit_label_cancel_button");
        if ( $selector_saved_view_item_edit_label_cancel_button.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_edit_label_cancel_button'");
        }
        $selector_saved_view_item_edit_label_cancel_button.click(function(eventObject) {
            try {
                event.preventDefault(); // to stop the 
                let clickThis = this;
                objectThis._cancelLabelChange_Clicked({ clickThis });
            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException : e
                });
                throw e;
            }
        });

        const $selector_saved_view_item_edit_label_save_button = $editElement.find(".selector_saved_view_item_edit_label_save_button");
        if ( $selector_saved_view_item_edit_label_save_button.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_edit_label_save_button'");
        }
        $selector_saved_view_item_edit_label_save_button.click(function(eventObject) {
            try {
                event.preventDefault(); // to stop the 
                let clickThis = this;
                objectThis._saveLabelChange_Clicked({ clickThis, id });
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
    _saveLabelChange_Clicked({ clickThis, id }: { clickThis: any, id: any }) {

        const objectThis = this;

        const $selector_saved_view_item_edit_label_container = $( clickThis ).closest(".selector_saved_view_item_edit_label_container");
        if ( $selector_saved_view_item_edit_label_container.length === 0 ) {
            throw Error("No DOM element with class 'selector_saved_view_item_edit_label_container'");
        }
        const $selector_saved_view_item_edit_label_input = $selector_saved_view_item_edit_label_container.find(".selector_saved_view_item_edit_label_input");
        if ( $selector_saved_view_item_edit_label_input.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_edit_label_input'");
        }
        
        const labelText = $selector_saved_view_item_edit_label_input.val();

        if ( labelText === "" ) {

            //  No value so exit
            return; // EARLY EXIT
        }

        const promise_changeLabel_SavedView_OnServer = this._changeLabel_SavedView_OnServer( { labelText, id } );

        promise_changeLabel_SavedView_OnServer.catch((reason) => {});

        promise_changeLabel_SavedView_OnServer.then((result) => {
            try {
                objectThis._saveLabelChange_UpdatePageAfterUpdateServer({ clickThis, labelText, id });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

	/**
	 * 
	 */
    _saveLabelChange_UpdatePageAfterUpdateServer({ clickThis, labelText, id }: { clickThis: any, labelText: any, id: any }) {

        const $selector_saved_view_item_root_container = $( clickThis ).closest(".selector_saved_view_item_root_container");
        if ( $selector_saved_view_item_root_container.length === 0 ) {
            throw Error("No DOM element with class 'selector_saved_view_item_root_container'");
        }

        //  Update label text on page
        const $selector_saved_view_item_label = $selector_saved_view_item_root_container.find(".selector_saved_view_item_label");
        if ( $selector_saved_view_item_label.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_label'");
        }
        $selector_saved_view_item_label.text( labelText );

        this._removeLabelChangeElement_ShowMainContainer({ clickThis });
    }

	/**
	 * 
	 */  
    _changeLabel_SavedView_OnServer( { labelText, id }: { labelText: any, id: any } ) {
    
        return new Promise(function(resolve, reject) {
          try {
            let requestObj = {
                labelText,
                id
            };

			const url = "d/rws/for-page/saved-view-change-label";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    resolve( responseData );
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
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
    _cancelLabelChange_Clicked({ clickThis } : { clickThis: any }) {

        this._removeLabelChangeElement_ShowMainContainer({ clickThis });
    }

    /**
	 * 
	 */
    _removeLabelChangeElement_ShowMainContainer({ clickThis } : { clickThis: any }) {

        const $clickThis = $( clickThis );

        const $selector_saved_view_item_root_container = $clickThis.closest(".selector_saved_view_item_root_container");
        if ( $selector_saved_view_item_root_container.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_root_container'");
        }
        
        const $selector_saved_view_item_display_container = $selector_saved_view_item_root_container.find(".selector_saved_view_item_display_container");
        if ( $selector_saved_view_item_display_container.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_display_container'");
        }
        $selector_saved_view_item_display_container.show();

        const $selector_saved_view_item_edit_label_container = $clickThis.closest(".selector_saved_view_item_edit_label_container");
        if ( $selector_saved_view_item_edit_label_container.length === 0 ) {
            console.log("WARN: No DOM element found with class 'selector_saved_view_item_edit_label_container'");
        }
        $selector_saved_view_item_edit_label_container.remove();

    }

    ////////////////////////////////////////

    //   Delete

	/**
	 * 
	 */
    _deleteSavedView_Clicked({ clickThis, id }: { clickThis: any, id: any }) {

        if ( ! window.confirm("Delete Saved View?") ) {
            return;  // EARLY EXIT
        }

        const promise_deleteSavedView_OnServer = this._deleteSavedView_OnServer( { id } );

        promise_deleteSavedView_OnServer.catch((reason) => {});

        promise_deleteSavedView_OnServer.then((result) => {
            try {
                const $selector_saved_view_item_root_container = $( clickThis ).closest(".selector_saved_view_item_root_container");
                if ( $selector_saved_view_item_root_container.length === 0 ) {
                    throw Error("No DOM element with class 'selector_saved_view_item_root_container'");
                }
                $selector_saved_view_item_root_container.remove();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

	/**
	 * 
	 */  
    _deleteSavedView_OnServer( { id } : { id: any } ) {
    
        return new Promise(function(resolve, reject) {
          try {
            let requestObj = {
                id
            };

			const url = "d/rws/for-page/delete-saved-view";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    resolve( responseData );
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
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
