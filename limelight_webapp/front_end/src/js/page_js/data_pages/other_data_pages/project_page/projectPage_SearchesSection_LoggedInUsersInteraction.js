/**
 * projectPage_SearchesSection_LoggedInUsersInteraction.js
 * 
 * Javascript for projectView.jsp page 
 * 
 * 
 * 
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

//  Import Handlebars templates

let _project_page_upload_data_section_project_owner_user_interaction_template = require("../../../../../../handlebars_templates_precompiled/project_page_upload_data_section_project_owner_user_interaction/project_page_upload_data_section_project_owner_user_interaction_template-bundle.js");


import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';




/**
 * 
 */
export class ProjectPage_SearchesSection_LoggedInUsersInteraction {

	/**
	 * 
	 */
	constructor({ projectIdentifierFromURL }) {

		this._initializeCalled = false;

        this._projectIdentifierFromURL = projectIdentifierFromURL;

        this._expandCollapseButtonsAdded = false;
        
        if ( ! _project_page_upload_data_section_project_owner_user_interaction_template.project_searches_user_buttons_template ) {
            throw Error("_project_page_upload_data_section_project_owner_user_interaction_template.project_searches_user_buttons_template")
        }
        this._project_searches_user_buttons_template =
            _project_page_upload_data_section_project_owner_user_interaction_template.project_searches_user_buttons_template;

	}

	/**
	 * 
	 */
	initialize({ projectPage_SearchesSection_AllUsersInteraction }) {
        let objectThis = this;
        
        this._projectPage_SearchesSection_AllUsersInteraction = projectPage_SearchesSection_AllUsersInteraction;

        this._initializeCalled = true;
    }

	/**
	 * 
	 */    
    searchListPopulated() {

        if ( ! this._expandCollapseButtonsAdded ) {
            this._add_ExpandAllCollapseAll_Buttons();
        }

    }

	/**
	 * Add 'Expand All' and 'Collapse All' buttons
     * Show and Hide Search Details for all searches
	 */  
    _add_ExpandAllCollapseAll_Buttons() {

        const objectThis = this;

        const $search_list_above_block = $("#search_list_above_block");

        let userButtons_HTML = this._project_searches_user_buttons_template({});

        $search_list_above_block.append( userButtons_HTML );

        const $expand_all_search_details_button = $("#expand_all_search_details_button");
        if ( $expand_all_search_details_button.length === 0 ) {
            throw Error("No DOM element found with id 'expand_all_search_details_button'");
        }
        $expand_all_search_details_button.click(function(eventObject) {
            try {
                eventObject.preventDefault();
                const clickThis = this;
                objectThis._expandAllSearchDetails( clickThis, eventObject );
                return false;
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
        const $collapse_all_search_details_button = $("#collapse_all_search_details_button");
        if ( $collapse_all_search_details_button.length === 0 ) {
            throw Error("No DOM element found with id 'collapse_all_search_details_button'");
        }
        $collapse_all_search_details_button.click(function(eventObject) {
            try {
                eventObject.preventDefault();
                const clickThis = this;
                objectThis._collapseAllSearchDetails( clickThis, eventObject );
                return false;
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        this._expandCollapseButtonsAdded = true;
    }

	/**
	 * 'Expand All' button clicked
     * Show Search Details for all searches
	 */    
    _expandAllSearchDetails( clickThis, eventObject ) {

        this._projectPage_SearchesSection_AllUsersInteraction.displaySearchDetails_All();
    }

	/**
	 * 'Collapse All' button clicked
     * Hide Search Details for all searches
	 */    
    _collapseAllSearchDetails( clickThis, eventObject ) {

        this._projectPage_SearchesSection_AllUsersInteraction.hideSearchDetails_All();
    }
}

