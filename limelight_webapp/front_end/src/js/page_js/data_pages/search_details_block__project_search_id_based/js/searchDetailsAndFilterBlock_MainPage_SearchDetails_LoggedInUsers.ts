/**
 * searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers.ts
 * 
 * Javascript for Search Details (Expand a search to show the details) on all pages (except Project Page).
 * 
 * Search Details - Provide interaction for Logged In Users.  Some only to a subset of logged in users
*/

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

//  Import Handlebars templates

import _search_detail_section_main_page_logged_in_users_template = require("../../../../../../handlebars_templates_precompiled/search_detail_section_main_page_logged_in_users/search_detail_section_main_page_logged_in_users_template-bundle.js");


import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage';

//  Local imports

import { SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers } from './searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers'
import {searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId} from "page_js/data_pages/search_sub_group/search_sub_group_manage_group_names/js/search_sub_group__manage__group_names__open_overlay__pass__project_search_id";

/**
* 
*/
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers {

    private _initializeCalled : boolean;

    //  Handlebars Templates
    private _project_search_details_add_weblink_link_template : any;
    private _project_search_details_add_weblink_dialog_template : any;
    private _project_search_details_add_comment_template : any;
    private _project_search_details_add_comment_dialog_template : any;
    private _project_search_details_update_comment_dialog_template : any;
    private _project_search_details_manage_sub_groups_link_template : any;

    //  Set in initialize
    private _searchDetails_AllUsers : SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers;

   /**
    * 
    */
   constructor() {
       this._initializeCalled = false;

       if ( ! _search_detail_section_main_page_logged_in_users_template.project_search_details_add_weblink_link_template ) {
           throw Error("_search_detail_section_main_page_logged_in_users_template.project_search_details_add_weblink_link_template")
       }
       this._project_search_details_add_weblink_link_template =
           _search_detail_section_main_page_logged_in_users_template.project_search_details_add_weblink_link_template;

       if ( ! _search_detail_section_main_page_logged_in_users_template.project_search_details_add_weblink_dialog_template ) {
           throw Error("_search_detail_section_main_page_logged_in_users_template.project_search_details_add_weblink_dialog_template")
       }
       this._project_search_details_add_weblink_dialog_template =
           _search_detail_section_main_page_logged_in_users_template.project_search_details_add_weblink_dialog_template;

       if ( ! _search_detail_section_main_page_logged_in_users_template.project_search_details_add_comment_template ) {
           throw Error("_search_detail_section_main_page_logged_in_users_template.project_search_details_add_comment_template")
       }
       this._project_search_details_add_comment_template =
           _search_detail_section_main_page_logged_in_users_template.project_search_details_add_comment_template;

       if ( ! _search_detail_section_main_page_logged_in_users_template.project_search_details_add_comment_dialog_template ) {
           throw Error("_search_detail_section_main_page_logged_in_users_template.project_search_details_add_comment_dialog_template")
       }
       this._project_search_details_add_comment_dialog_template =
           _search_detail_section_main_page_logged_in_users_template.project_search_details_add_comment_dialog_template;
           
       if ( ! _search_detail_section_main_page_logged_in_users_template.project_search_details_update_comment_dialog_template ) {
           throw Error("_search_detail_section_main_page_logged_in_users_template.project_search_details_update_comment_dialog_template")
       }
       this._project_search_details_update_comment_dialog_template =
           _search_detail_section_main_page_logged_in_users_template.project_search_details_update_comment_dialog_template;

       if ( ! _search_detail_section_main_page_logged_in_users_template.project_search_details_manage_sub_groups_link_template ) {
           throw Error("_search_detail_section_main_page_logged_in_users_template.project_search_details_manage_sub_groups_link_template")
       }
       this._project_search_details_manage_sub_groups_link_template =
           _search_detail_section_main_page_logged_in_users_template.project_search_details_manage_sub_groups_link_template;
   
   }

   /**
    * 
    */
   public initialize(
       { searchDetails_AllUsers } :
       { searchDetails_AllUsers : SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers }
    ) : void {
       
       this._searchDetails_AllUsers = searchDetails_AllUsers;


       this._initializeCalled = true;
   }


   /**
    * 
    */
   public searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, commentsShowBlockAlways, $selector_search_details_container }) : void {

       if ( weblinksShowAddWeblinkLink ) {
           
           //  Only when weblinksShowAddWeblinkLink is true.  Currently only for Project Owner
           
           const $selector_weblinks_outer_container = $selector_search_details_container.find(".selector_weblinks_outer_container");
           if ($selector_weblinks_outer_container.length === 0) {
               throw Error("Failed to find DOM element with class 'selector_weblinks_outer_container' searchDetails_AdditionsForLoggedInUsers(...) projectSearchId: " + projectSearchId);
           }
           
           const htmlAddLink = this._project_search_details_add_weblink_link_template();
           const $htmlAddLink = $(htmlAddLink);
           $htmlAddLink.appendTo($selector_weblinks_outer_container);
       }

       if ( commentsShowBlockAlways ) {
           const $selector_comments_outer_container = $selector_search_details_container.find(".selector_comments_outer_container");

           //  $selector_comments_outer_container.length === 0 : true when User is NO LONGER Logged In

           //      The Page will reload if the project is not public.
           //      If the project is public, the search details are displayed for the public user, with no update options.

           //   For Public project, probably should reload the page instead of continuing so more obvious that the user is no longer logged in.

           // if ($selector_comments_outer_container.length === 0) {
           //     throw Error("Failed to find DOM element with class 'selector_comments_outer_container' searchDetails_AdditionsForLoggedInUsers(...) projectSearchId: " + projectSearchId);
           // }

           const htmlAddComment = this._project_search_details_add_comment_template();
           const $htmlAddComment = $(htmlAddComment);
           $htmlAddComment.appendTo($selector_comments_outer_container);
       }

       {
           const $selector_search_details_manage_sub_groups_link_container = $selector_search_details_container.find(".selector_search_details_manage_sub_groups_link_container");

           if ( $selector_search_details_manage_sub_groups_link_container.length > 0 ) {

               //  Have Sub Groups Container so add "Manage" fake link

               const html = this._project_search_details_manage_sub_groups_link_template();
               const $html = $(html);
               $html.appendTo( $selector_search_details_manage_sub_groups_link_container );

               const objectThis = this;

               $html.click(function(eventObject) {
                   try {
                       eventObject.preventDefault();
                       objectThis._manageSubGroupsClicked({ projectSearchId, clickedThis : this });
                   } catch (e) {
                       reportWebErrorToServer.reportErrorObjectToServer({
                           errorException : e
                       });
                       throw e;
                   }
               });
           }
       }

   }

   /**
    * 
    */
   public searchDetails_DeleteWeblink_AddClickHandler({ projectSearchId, webLink, $weblinkEntry }) : void {

       const objectThis = this;

       const weblinkId = webLink.id;

       const $selector_delete_weblink = $weblinkEntry.find(".selector_delete_weblink");
       if ($selector_delete_weblink.length === 0) {
           throw Error("Failed to find DOM element with class 'selector_delete_weblink' searchDetails_DeleteWeblink_AddClickHandler(...) projectSearchId: " + projectSearchId);
       }
       $selector_delete_weblink.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._deleteWeblinkClicked({ projectSearchId, weblinkId, clickedThis : this });
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
   public searchDetails_Edit_Delete_Comment_AddClickHandlers({ projectSearchId, comment, $commentEntry }) : void {

       const objectThis = this;

       const commentId = comment.id;

       if ( comment.canEdit ) {
           const $selector_comment_update = $commentEntry.find(".selector_comment_update");
           if ($selector_comment_update.length === 0) {
               throw Error("Failed to find DOM element with class 'selector_comment_update' searchDetails_Edit_Delete_Comment_AddClickHandlers(...) projectSearchId: " + projectSearchId);
           }
           $selector_comment_update.click(function(eventObject) {
               try {
                   eventObject.preventDefault();
                   objectThis._editCommentClicked({ projectSearchId, commentId , clickedThis : this });
               } catch (e) {
                   reportWebErrorToServer.reportErrorObjectToServer({
                       errorException : e
                   });
                   throw e;
               }
           });
       }
       if ( comment.canDelete ) {
           const $selector_comment_delete = $commentEntry.find(".selector_comment_delete");
           if ($selector_comment_delete.length === 0) {
               throw Error("Failed to find DOM element with class 'selector_comment_delete' searchDetails_Edit_Delete_Comment_AddClickHandlers(...) projectSearchId: " + projectSearchId);
           }
           $selector_comment_delete.click(function(eventObject) {
               try {
                   eventObject.preventDefault();
                   objectThis._deleteCommentClicked({ projectSearchId, commentId , clickedThis : this });
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
   public attachSearchDetails_ClickHandlers({ projectSearchId, $selector_search_details_container }) : void {

       const objectThis = this;

       const $selector_edit_search_filenameAll = $selector_search_details_container.find(".selector_edit_search_filename");
       $selector_edit_search_filenameAll.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._changeSearchFilenameOpenClicked({ projectSearchId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });
       
       const $selector_cancel_edit_search_filenameAll = $selector_search_details_container.find(".selector_cancel_edit_search_filename");
       $selector_cancel_edit_search_filenameAll.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._changeSearchFilenameCancelClicked({ projectSearchId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });

       const $selector_save_search_filenameAll = $selector_search_details_container.find(".selector_save_search_filename");
       $selector_save_search_filenameAll.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._changeSearchFilenameSaveClicked({ projectSearchId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });

       //  Weblinks 

       const $selector_weblinks_add_link_open = $selector_search_details_container.find(".selector_weblinks_add_link_open");
       $selector_weblinks_add_link_open.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._weblinks_OpenAddClicked({ projectSearchId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });

       //  Comments 

       const $selector_comments_add_comment_open_container = $selector_search_details_container.find(".selector_comments_add_comment_open_container");
       $selector_comments_add_comment_open_container.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._comments_OpenAddClicked({ projectSearchId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });
   }

   /**
    * Open Change Search Filename Input
    */        
   private _changeSearchFilenameOpenClicked({ projectSearchId, clickedThis }) : void {

       const $selector_display_search_filename_outer_container = $( clickedThis ).closest(".selector_display_search_filename_outer_container");
       if ( $selector_display_search_filename_outer_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_display_search_filename_outer_container'. _changeSearchFilenameOpenClicked(...) projectSearchId: " + projectSearchId );
       }
       
       //  Currently displayed filename
       const $selector_search_filename = $selector_display_search_filename_outer_container.find(".selector_search_filename");
       if ( $selector_search_filename.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_search_filename'. _changeSearchFilenameOpenClicked(...) projectSearchId: " + projectSearchId );
       }
       const search_filename = $selector_search_filename.text();

       const $selector_edit_search_filename_input_field = $selector_display_search_filename_outer_container.find(".selector_edit_search_filename_input_field");
       if ( $selector_edit_search_filename_input_field.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_edit_search_filename_input_field'. _changeSearchFilenameOpenClicked(...) projectSearchId: " + projectSearchId );
       }
       $selector_edit_search_filename_input_field.val( search_filename );

       const $selector_display_search_filename_container = $selector_display_search_filename_outer_container.find(".selector_display_search_filename_container");
       if ( $selector_display_search_filename_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_display_search_filename_container'. _changeSearchFilenameOpenClicked(...) projectSearchId: " + projectSearchId );
       }
       $selector_display_search_filename_container.hide();

       const $selector_edit_search_filename_container = $selector_display_search_filename_outer_container.find(".selector_edit_search_filename_container");
       if ( $selector_edit_search_filename_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_edit_search_filename_container'. _changeSearchFilenameOpenClicked(...) projectSearchId: " + projectSearchId );
       }
       $selector_edit_search_filename_container.show();
   }

   /**
    * Save Change Search Filename Input
    */  
   private _changeSearchFilenameSaveClicked({ projectSearchId, clickedThis }) : void {

        const objectThis = this;

        const $selector_display_search_filename_outer_container = $( clickedThis ).closest(".selector_display_search_filename_outer_container");
        if ( $selector_display_search_filename_outer_container.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_display_search_filename_outer_container'. _changeSearchFilenameOpenClicked(...) projectSearchId: " + projectSearchId );
        }

        const $selector_edit_search_filename_input_field = $selector_display_search_filename_outer_container.find(".selector_edit_search_filename_input_field");
        if ( $selector_edit_search_filename_input_field.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_edit_search_filename_input_field'. _changeSearchFilenameOpenClicked(...) projectSearchId: " + projectSearchId );
        }
        const searchFilename : string = <string> $selector_edit_search_filename_input_field.val();

        if ( searchFilename === "" ) {
            // Cannot be empty string
            return; // EARLY EXIT
        }

        const search_file_project_search_idString = $selector_display_search_filename_outer_container.attr("search_file_project_search_id");
        if ( search_file_project_search_idString === undefined || search_file_project_search_idString ===  null || search_file_project_search_idString === "" ) {
            throw Error("Attr 'search_file_project_search_id' not exist or is empty. _downloadSearchFileClicked(...) projectSearchId: " + projectSearchId );
        }
        const searchFileProjectSearchId = Number.parseInt( search_file_project_search_idString );
        if ( Number.isNaN( searchFileProjectSearchId ) ) {
            throw Error("Attr 'search_file_project_search_id' is not a number. _downloadSearchFileClicked(...). search_file_project_search_id: "
                + search_file_project_search_idString
                + ", projectSearchId: " + projectSearchId );
        }

        const promise_saveChangedSearchFilenameToServer = this._saveChangedSearchFilenameToServer({ projectSearchId, searchFileProjectSearchId, searchFilename });

        promise_saveChangedSearchFilenameToServer.catch((reason) => {
            // try {
                
            // } catch( e ) {
            //     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            //     throw e;
            // }
        })

        promise_saveChangedSearchFilenameToServer.then((result) => {
            try {
                //  Assume result status is true

                //  Change displayed filename
                const $selector_search_filename = $selector_display_search_filename_outer_container.find(".selector_search_filename");
                if ( $selector_search_filename.length === 0 ) {
                    throw Error("Failed to find DOM element with class 'selector_search_filename'. _changeSearchFilenameSaveClicked(...) projectSearchId: " + projectSearchId );
                }
                $selector_search_filename.text( searchFilename );

                objectThis._changeSearchFilenameClose({ projectSearchId, clickedThis });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
   }

   /**
    * Save Changed Search Filename To Server
    */  
   private _saveChangedSearchFilenameToServer({ projectSearchId, searchFileProjectSearchId, searchFilename }) : any {

       const objectThis = this;

       return new Promise((resolve,reject) => {
            try {
            const requestObj = { projectSearchId, searchFileProjectSearchId, filename : searchFilename };

            const url = "d/rws/for-page/update-search-filename";
            
            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { 
                try {
                    reject()
              
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        resolve( responseData );
                        
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

   }    

   /**
    * Cancel Change Search Filename Input
    */  
   private _changeSearchFilenameCancelClicked({ projectSearchId, clickedThis }) : void {

       this._changeSearchFilenameClose({ projectSearchId, clickedThis });
   }

   /**
    * Close Change Search Filename Input - Hide Input show filename
    */  
   private _changeSearchFilenameClose({ projectSearchId, clickedThis }) : void {

       const $selector_display_search_filename_outer_container = $( clickedThis ).closest(".selector_display_search_filename_outer_container");
       if ( $selector_display_search_filename_outer_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_display_search_filename_outer_container'. _changeSearchFilenameOpenClicked(...) projectSearchId: " + projectSearchId );
       }
       
       const $selector_display_search_filename_container = $selector_display_search_filename_outer_container.find(".selector_display_search_filename_container");
       if ( $selector_display_search_filename_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_display_search_filename_container'. _changeSearchFilenameOpenClicked(...) projectSearchId: " + projectSearchId );
       }
       $selector_display_search_filename_container.show();

       const $selector_edit_search_filename_container = $selector_display_search_filename_outer_container.find(".selector_edit_search_filename_container");
       if ( $selector_edit_search_filename_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_edit_search_filename_container'. _changeSearchFilenameOpenClicked(...) projectSearchId: " + projectSearchId );
       }
       $selector_edit_search_filename_container.hide();
   }

   //////////////////////////////////////////////////

   //   Weblinks

   /**
    *  Open Add Weblink
    */      
   private _weblinks_OpenAddClicked({ projectSearchId, clickedThis }) : void {

       const $selector_weblinks_outer_container = $( clickedThis ).closest( ".selector_weblinks_outer_container" );
       if ( $selector_weblinks_outer_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_weblinks_outer_container'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_weblinks_add_link_open_container = $selector_weblinks_outer_container.find(".selector_weblinks_add_link_open_container");
       if ( $selector_weblinks_add_link_open_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_weblinks_add_link_open_container'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_weblinks_add_link_container = $selector_weblinks_outer_container.find(".selector_weblinks_add_link_container");
       if ( $selector_weblinks_add_link_container.length !== 0 ) {
           //  Dialog already in DOM so remove it
           $selector_weblinks_add_link_container.remove();
       }

       //  Hide Add weblink link
       $selector_weblinks_add_link_open_container.hide();

       //  Add Dialog to DOM and add click handlers

       const htmlAddLinkDialog = this._project_search_details_add_weblink_dialog_template();
       const $htmlAddLinkDialog = $(htmlAddLinkDialog);
       $htmlAddLinkDialog.appendTo($selector_weblinks_outer_container);

       const $selector_weblinks_add_link_add_button = $selector_weblinks_outer_container.find(".selector_weblinks_add_link_add_button");
       if ( $selector_weblinks_add_link_add_button.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_weblinks_add_link_add_button'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_weblinks_add_link_cancel_button = $selector_weblinks_outer_container.find(".selector_weblinks_add_link_cancel_button");
       if ( $selector_weblinks_add_link_cancel_button.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_weblinks_add_link_cancel_button'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }

       const objectThis = this;

       $selector_weblinks_add_link_add_button.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._weblinks_AddWeblinkClicked({ projectSearchId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });

       $selector_weblinks_add_link_cancel_button.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._weblinks_CancelCloseAddClicked({ projectSearchId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });
       
   }

   /**
    *  Cancel Close Add Weblink
    */      
   private _weblinks_CancelCloseAddClicked({ projectSearchId, clickedThis }) : void {

       const $selector_weblinks_outer_container = $( clickedThis ).closest( ".selector_weblinks_outer_container" );
       if ( $selector_weblinks_outer_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_weblinks_outer_container'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_weblinks_add_link_open_container = $selector_weblinks_outer_container.find(".selector_weblinks_add_link_open_container");
       if ( $selector_weblinks_add_link_open_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_weblinks_add_link_open_container'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_weblinks_add_link_container = $selector_weblinks_outer_container.find(".selector_weblinks_add_link_container");
       if ( $selector_weblinks_add_link_open_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_weblinks_add_link_open_container'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }

       //  Remove Dialog
       $selector_weblinks_add_link_container.remove();
       //  Show Add weblink link
       $selector_weblinks_add_link_open_container.show();
   }

   /**
    *  Add Weblink
    */      
   private _weblinks_AddWeblinkClicked({ projectSearchId, clickedThis }) : void {

        const $selector_weblinks_outer_container = $( clickedThis ).closest( ".selector_weblinks_outer_container" );
        if ( $selector_weblinks_outer_container.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_weblinks_outer_container'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
        }
        const $selector_weblinks_add_link_open_container = $selector_weblinks_outer_container.find(".selector_weblinks_add_link_open_container");
        if ( $selector_weblinks_add_link_open_container.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_weblinks_add_link_open_container'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
        }
        const $selector_weblinks_add_link_container = $selector_weblinks_outer_container.find(".selector_weblinks_add_link_container");
        if ( $selector_weblinks_add_link_open_container.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_weblinks_add_link_open_container'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
        }

        const $selector_weblinks_add_link_input_url = $selector_weblinks_outer_container.find(".selector_weblinks_add_link_input_url");
        if ( $selector_weblinks_add_link_input_url.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_weblinks_add_link_input_url'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
        }
        const weblinkURL = $selector_weblinks_add_link_input_url.val();
        const $selector_weblinks_add_link_input_label = $selector_weblinks_outer_container.find(".selector_weblinks_add_link_input_label");
        if ( $selector_weblinks_add_link_input_label.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_weblinks_add_link_input_label'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
        }
        const weblinkLabel = $selector_weblinks_add_link_input_label.val();
        
        if ( weblinkURL === "" ) {
            //  No value in input for URL
            return; //  EARLY EXIT
        }
        if ( weblinkLabel === "" ) {
            //  No value in input for Label
            return; //  EARLY EXIT
        }

        if ( this._weblinks_validateURL( weblinkURL )  ) {
            const znothing = 0;
        } else {
    //		alert("url not valid");

            const $selector_error_message_web_link_url_invalid = $selector_weblinks_outer_container.find(".selector_error_message_web_link_url_invalid");
            if ( $selector_weblinks_add_link_input_label.length === 0 ) {
                throw Error("Failed to find DOM element with class 'selector_error_message_web_link_url_invalid'. _weblinks_OpenAddClicked(...) projectSearchId: " + projectSearchId );
            }

            showErrorMsg( $selector_error_message_web_link_url_invalid, undefined /* clearMsg */ );

            $selector_weblinks_add_link_input_url.focus();

            return;  //  !!!  EARLY EXIT
        }

        const promise__weblinks_AddWeblinkCallServer = this._weblinks_AddWeblinkCallServer({ projectSearchId, weblinkURL, weblinkLabel });

        promise__weblinks_AddWeblinkCallServer.catch((reason) => {
            // try {

            // } catch( e ) {
            //     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            //     throw e;
            // }
        })

        promise__weblinks_AddWeblinkCallServer.then((insertedId) => {
            try {
                //  Add to list on page
                const webLink = {
                    canDelete : true, // assume can delete since can create
                    id : insertedId,
                    linkURL : weblinkURL,
                    linkLabel : weblinkLabel
                }
                const $selector_weblinks_list_container = $selector_weblinks_outer_container.find(".selector_weblinks_list_container");
                this._searchDetails_AllUsers.searchDetails_Weblinks_AddSingleEntry({ webLink, projectSearchId, $selector_weblinks_list_container });

                //  Remove Dialog
                $selector_weblinks_add_link_container.remove();
                //  Show Add weblink link
                $selector_weblinks_add_link_open_container.show();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
   }

   /**
    *  Validate new Weblink URL
    */     
   private _weblinks_validateURL(textval) {
       var urlregex = new RegExp(
           "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
       return urlregex.test(textval);
   }


   /**
    *  Add Weblink - Call Server
    */      
   private _weblinks_AddWeblinkCallServer({ projectSearchId, weblinkURL, weblinkLabel }) : Promise<number> {

       return new Promise((resolve,reject) => {
            try {
                const requestObj = { projectSearchId, weblinkURL, weblinkLabel };

                const url = "d/rws/for-page/insert-web-link";

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

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        const insertedId : number = responseData.insertedId;

                        resolve( insertedId );
                        
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
   }

   /**
    * 
    */    
   private _deleteWeblinkClicked({ projectSearchId, weblinkId, clickedThis }) : void {
       
        if ( ! window.confirm("Delete Link?") ) {
            return;
        }

        const promise__weblinks_DeleteWeblinkCallServer = this._weblinks_DeleteWeblinkCallServer({ projectSearchId, weblinkId });

        promise__weblinks_DeleteWeblinkCallServer.catch((reason) => {
            // try {

            // } catch( e ) {
            //     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            //     throw e;
            // }
        })

        promise__weblinks_DeleteWeblinkCallServer.then((response) => {
            try {
                //  Remove from list on page
                const $selector_weblink_entry = $( clickedThis ).closest(".selector_weblink_entry");
                if ( $selector_weblink_entry.length === 0 ) {
                    throw Error("Failed to find DOM element with class 'selector_weblink_entry'. _deleteWeblinkClicked(...) projectSearchId: " + projectSearchId );
                }

                //  Remove Entry
                $selector_weblink_entry.remove();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
   }

   /**
    *  Delete Weblink - Call Server
    */      
   private _weblinks_DeleteWeblinkCallServer({ projectSearchId, weblinkId }) {

       return new Promise((resolve,reject) => {
         try {
           const requestObj = { weblinkId };

           const url = "d/rws/for-page/delete-web-link";

           const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

           const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

           promise_webserviceCallStandardPost.catch( () => {
                try {
                    reject() 
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

           promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve( responseData );
                    
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
   }

   //////////////////////////////////////////////////

   //   Comments

   /**
    *  Open Add Comment
    */      
   private _comments_OpenAddClicked({ projectSearchId, clickedThis }) : void {

       const $selector_comments_outer_container = $( clickedThis ).closest( ".selector_comments_outer_container" );
       if ( $selector_comments_outer_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_outer_container'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_comments_add_comment_open_container = $selector_comments_outer_container.find(".selector_comments_add_comment_open_container");
       if ( $selector_comments_add_comment_open_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_add_comment_open_container'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_comments_add_link_container = $selector_comments_outer_container.find(".selector_comments_add_link_container");
       if ( $selector_comments_add_link_container.length !== 0 ) {
           //  Dialog already in DOM so remove it
           $selector_comments_add_link_container.remove();
       }

       //  Hide Add comment link
       $selector_comments_add_comment_open_container.hide();

       //  Add Dialog to DOM and add click handlers

       const htmlAddCommentDialog = this._project_search_details_add_comment_dialog_template();
       const $htmlAddCommentDialog = $(htmlAddCommentDialog);
       $htmlAddCommentDialog.appendTo($selector_comments_outer_container);

       const $selector_comments_add_comment_add_button = $selector_comments_outer_container.find(".selector_comments_add_comment_add_button");
       if ( $selector_comments_add_comment_add_button.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_add_comment_add_button'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_comments_add_comment_cancel_button = $selector_comments_outer_container.find(".selector_comments_add_comment_cancel_button");
       if ( $selector_comments_add_comment_cancel_button.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_add_comment_cancel_button'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_comments_add_comment_input = $selector_comments_outer_container.find(".selector_comments_add_comment_input");
       if ( $selector_comments_add_comment_input.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_add_comment_input'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       $selector_comments_add_comment_input.focus();


       const objectThis = this;

       $selector_comments_add_comment_add_button.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._comments_AddCommentClicked({ projectSearchId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });

       $selector_comments_add_comment_cancel_button.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._comments_CancelCloseAddClicked({ projectSearchId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });
       
   }

   /**
    *  Cancel Close Add Comment
    */      
   private _comments_CancelCloseAddClicked({ projectSearchId, clickedThis }) : void {

       const $selector_comments_outer_container = $( clickedThis ).closest( ".selector_comments_outer_container" );
       if ( $selector_comments_outer_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_outer_container'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_comments_add_comment_open_container = $selector_comments_outer_container.find(".selector_comments_add_comment_open_container");
       if ( $selector_comments_add_comment_open_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_add_comment_open_container'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_comments_add_comment_container = $selector_comments_outer_container.find(".selector_comments_add_comment_container");
       if ( $selector_comments_add_comment_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_add_comment_container'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }

       //  Remove Dialog
       $selector_comments_add_comment_container.remove();
       //  Show Add comment link
       $selector_comments_add_comment_open_container.show();
   }

   /**
    *  Add Comment
    */      
   private _comments_AddCommentClicked({ projectSearchId, clickedThis }) : void {

       const objectThis = this;

       const $selector_comments_outer_container = $( clickedThis ).closest( ".selector_comments_outer_container" );
       if ( $selector_comments_outer_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_outer_container'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_comments_add_comment_open_container = $selector_comments_outer_container.find(".selector_comments_add_comment_open_container");
       if ( $selector_comments_add_comment_open_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_add_comment_open_container'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_comments_add_comment_container = $selector_comments_outer_container.find(".selector_comments_add_comment_container");
       if ( $selector_comments_add_comment_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_add_comment_container'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }

       const $selector_comments_add_comment_input = $selector_comments_outer_container.find(".selector_comments_add_comment_input");
       if ( $selector_comments_add_comment_input.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_add_comment_input'. _comments_OpenAddClicked(...) projectSearchId: " + projectSearchId );
       }
       const commentText = $selector_comments_add_comment_input.val();

       if ( commentText === "" ) {
           //  No value in input for URL
           return; //  EARLY EXIT
       }

       const promise__comments_AddCommentCallServer = this._comments_AddCommentCallServer({ projectSearchId, commentText });

       promise__comments_AddCommentCallServer.catch((reason) => {
        // try {
        // } catch( e ) {
        //     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        //     throw e;
        // }
       })

       promise__comments_AddCommentCallServer.then((insertedId) => {
        try {
           //  Add to list on page
           const comment = {
               canEdit : true, // assume can edit since can create
               canDelete : true, // assume can delete since can create
               id : insertedId,
               commentText : commentText
           }
           const $selector_comments_list_container = $selector_comments_outer_container.find(".selector_comments_list_container");
           objectThis._searchDetails_AllUsers.searchDetails_Comments_AddSingleEntry({ comment, projectSearchId, $selector_comments_list_container });

           //  Remove Dialog
           $selector_comments_add_comment_container.remove();
           //  Show Add comment link
           $selector_comments_add_comment_open_container.show();
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
       });
   }

   /**
    *  Add Comment - Call Server
    */      
   private _comments_AddCommentCallServer({ projectSearchId, commentText }) : Promise<number> {

       return new Promise((resolve,reject) => {
            try {
                const requestObj = { projectSearchId, commentText };

                const url = "d/rws/for-page/insert-comment";

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

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        const insertedId : number = responseData.insertedId;

                        resolve( insertedId );

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
   }

   /**
    * 
    */    
   private _editCommentClicked({ projectSearchId, commentId , clickedThis }) : void {

       const objectThis = this;

       const $selector_comment_root_entry = $( clickedThis ).closest(".selector_comment_root_entry");
       if ( $selector_comment_root_entry.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comment_root_entry'. _editCommentClicked(...) projectSearchId: " + projectSearchId );
       }
       
       //  Currently displayed comment
       const $selector_search_comment_string = $selector_comment_root_entry.find(".selector_search_comment_string");
       if ( $selector_search_comment_string.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_search_comment_string'. _editCommentClicked(...) projectSearchId: " + projectSearchId );
       }
       const commentText = $selector_search_comment_string.text();

       //  Container for Edit Comment Input
       const $selector_comment_update_container = $selector_comment_root_entry.find(".selector_comment_update_container");
       if ( $selector_comment_update_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comment_update_container'. _editCommentClicked(...) projectSearchId: " + projectSearchId );
       }
       //  Remove existing content, if there is any
       $selector_comment_update_container.empty();

       const update_comment_dialogHTML = this._project_search_details_update_comment_dialog_template({});
       $selector_comment_update_container.append( update_comment_dialogHTML );

       const $selector_comments_update_comment_input = $selector_comment_root_entry.find(".selector_comments_update_comment_input");
       if ( $selector_comments_update_comment_input.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_update_comment_input'. _editCommentClicked(...) projectSearchId: " + projectSearchId );
       }
       $selector_comments_update_comment_input.val( commentText );

       const $selector_comments_update_comment_update_button = $selector_comment_root_entry.find(".selector_comments_update_comment_update_button");
       if ( $selector_comments_update_comment_update_button.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_update_comment_update_button'. _editCommentClicked(...) projectSearchId: " + projectSearchId );
       }
       const $selector_comments_update_comment_cancel_button = $selector_comment_root_entry.find(".selector_comments_update_comment_cancel_button");
       if ( $selector_comments_update_comment_cancel_button.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comments_update_comment_cancel_button'. _editCommentClicked(...) projectSearchId: " + projectSearchId );
       }
       $selector_comments_update_comment_update_button.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._changeCommentSaveClicked({ projectSearchId, commentId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });
       $selector_comments_update_comment_cancel_button.click(function(eventObject) {
           try {
               eventObject.preventDefault();
               objectThis._changeCommentCancelClicked({ projectSearchId, clickedThis : this });
           } catch (e) {
               reportWebErrorToServer.reportErrorObjectToServer({
                   errorException : e
               });
               throw e;
           }
       });

       const $selector_comment_text_entry = $selector_comment_root_entry.find(".selector_comment_text_entry");
       if ( $selector_comment_text_entry.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comment_text_entry'. _editCommentClicked(...) projectSearchId: " + projectSearchId );
       }
       $selector_comment_text_entry.hide();
   }

   /**
    * Save Change Comment Input
    */  
   private _changeCommentSaveClicked({ projectSearchId, commentId, clickedThis }) : void {

        const objectThis = this;

        const $selector_comment_root_entry = $( clickedThis ).closest(".selector_comment_root_entry");
        if ( $selector_comment_root_entry.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_comment_root_entry'. _changeCommentSaveClicked(...) projectSearchId: " + projectSearchId );
        }

        const $selector_comments_update_comment_input = $selector_comment_root_entry.find(".selector_comments_update_comment_input");
        if ( $selector_comments_update_comment_input.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_comments_update_comment_input'. _changeCommentSaveClicked(...) projectSearchId: " + projectSearchId );
        }
        const commentText = <string>$selector_comments_update_comment_input.val();

        if ( commentText === "" ) {
            // Cannot be empty string
            return; // EARLY EXIT
        }

        const promise_saveChangedCommentToServer = this._saveChangedCommentToServer({ projectSearchId, commentId, commentText });

        promise_saveChangedCommentToServer.catch((reason) => {
            // try {

            // } catch( e ) {
            //     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            //     throw e;
            // }
        });

        promise_saveChangedCommentToServer.then((result) => {
            try {
                //  Assume result status is true

                //  Change displayed comment
                const $selector_search_comment_string = $selector_comment_root_entry.find(".selector_search_comment_string");
                if ( $selector_search_comment_string.length === 0 ) {
                    throw Error("Failed to find DOM element with class 'selector_search_comment_string'. _changeCommentSaveClicked(...) projectSearchId: " + projectSearchId );
                }
                $selector_search_comment_string.text( commentText );

                objectThis._changeCommentClose({ projectSearchId, clickedThis });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
   }

   /**
    * Save Changed Search Filename To Server
    */  
   private _saveChangedCommentToServer({ projectSearchId, commentId, commentText }) {

       const objectThis = this;

       return new Promise((resolve,reject) => {
         try {
           const requestObj = { commentId, commentText };

           const url = "d/rws/for-page/update-comment";

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

           promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve( responseData );
                    
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
   }    

   /**
    * Cancel Change Comment Input
    */  
   private _changeCommentCancelClicked({ projectSearchId, clickedThis }) : void {

       this._changeCommentClose({ projectSearchId, clickedThis });
   }

   /**
    * Close Change Comment Input - Remove Input show comment text
    */  
   private _changeCommentClose({ projectSearchId, clickedThis }) : void {

       const $selector_comment_root_entry = $( clickedThis ).closest(".selector_comment_root_entry");
       if ( $selector_comment_root_entry.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comment_root_entry'. _changeCommentClose(...) projectSearchId: " + projectSearchId );
       }
       
       const $selector_comment_text_entry = $selector_comment_root_entry.find(".selector_comment_text_entry");
       if ( $selector_comment_text_entry.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comment_text_entry'. _changeCommentClose(...) projectSearchId: " + projectSearchId );
       }
       $selector_comment_text_entry.show();

       const $selector_comment_update_container = $selector_comment_root_entry.find(".selector_comment_update_container");
       if ( $selector_comment_update_container.length === 0 ) {
           throw Error("Failed to find DOM element with class 'selector_comment_update_container'. _changeCommentClose(...) projectSearchId: " + projectSearchId );
       }
       $selector_comment_update_container.empty();
   }

   /**
    * 
    */    
   private _deleteCommentClicked({ projectSearchId, commentId, clickedThis }) : void {
       
       if ( ! window.confirm("Delete Comment?") ) {
           return;
       }

       const promise__comments_DeleteCommentCallServer = this._comments_DeleteCommentCallServer({ projectSearchId, commentId });

       promise__comments_DeleteCommentCallServer.catch((reason) => {
        // try {

        // } catch( e ) {
        //     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        //     throw e;
        // }
       })

       promise__comments_DeleteCommentCallServer.then((response) => {
        try {
           //  Remove from list on page
           const $selector_comment_root_entry = $( clickedThis ).closest(".selector_comment_root_entry");
           if ( $selector_comment_root_entry.length === 0 ) {
               throw Error("Failed to find DOM element with class 'selector_comment_root_entry'. _deleteCommentClicked(...) projectSearchId: " + projectSearchId );
           }

           //  Remove Entry
           $selector_comment_root_entry.remove();
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
       });
   }

   /**
    *  Delete Comment - Call Server
    */      
   private _comments_DeleteCommentCallServer({ projectSearchId, commentId }) {

       return new Promise((resolve,reject) => {
         try {
           const requestObj = { commentId };

           const url = "d/rws/for-page/delete-comment";

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

           promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve( responseData );
                    
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
   }

    /**
     *
     */
    private _manageSubGroupsClicked({ projectSearchId, clickedThis }) : void {
        try {

            searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId({ projectSearchId, searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback : undefined });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

}

