/**
 * projectPage_SavedViews_Section_AllUsersInteraction.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Saved Views Section - Provide interaction for All Users (including public users when project is public) 
 *
 *
 *
 * !!!!!  References to class properties that are NEVER Set: 'this._projectPage_SearchesAdmin' and 'this._projectPage_SearchDetails_AllUsers'
 *
 * 			For Now they are commented out
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

//  Import Handlebars templates

// @ts-ignore
import { _project_page__saved_views_section_template } from './projectPage__Common__ImportHandlebarsTemplates'


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { addToolTips } from 'page_js/common_all_pages/genericToolTip';
import {ProjectPage_SavedViews_Section_LoggedInUsersInteraction} from "page_js/data_pages/other_data_pages/project_page/projectPage_SavedViews_Section_LoggedInUsersInteraction";

//  Local imports

/**
 * 
 */
export class ProjectPage_SavedViews_Section_AllUsersInteraction {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string
	private _projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction

	private _projpg_saved_view_list_container_template = _project_page__saved_views_section_template.projpg_saved_view_list_container;
	private _projpg_saved_view_list_item_template = _project_page__saved_views_section_template.projpg_saved_view_list_item;

	/**
	 * 
	 */
	constructor({ 
		projectIdentifierFromURL,
		projectPage_SavedViews_Section_LoggedInUsersInteraction
	} : {
		projectIdentifierFromURL : string
		projectPage_SavedViews_Section_LoggedInUsersInteraction? : ProjectPage_SavedViews_Section_LoggedInUsersInteraction
	}) {

		this._projectIdentifierFromURL = projectIdentifierFromURL;
		this._projectPage_SavedViews_Section_LoggedInUsersInteraction = projectPage_SavedViews_Section_LoggedInUsersInteraction;

		if (!_project_page__saved_views_section_template.projpg_saved_view_list_container) {
			throw Error("Nothing in _project_page__saved_views_section_template.projpg_saved_view_list_container");
		}
		if (!_project_page__saved_views_section_template.projpg_saved_view_list_item) {
			throw Error("Nothing in _project_page__saved_views_section_template.projpg_saved_view_list_item");
		}
	}

	/**
	 * 
	 */
	initialize() {

		this._initializeCalled = true;
	}

	/**
	 * 
	 */
	getSavedViewsData() {

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		{
			const $saved_views_block_shown = $("#saved_views_block_shown")
			if ( $saved_views_block_shown.length === 0 ) {

				//  No Saved Views block so skip initialization

				return;  // EARLY RETURN
			}
		}

		let objectThis = this;

		let projectIdentifier = this._projectIdentifierFromURL;

		let requestObj = {
			projectIdentifier : projectIdentifier
		};

		const url = "d/rws/for-page/project-view-page-saved-views-list";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
			try {
				objectThis._getSavedViewsDataResponse(responseData);
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
	_getSavedViewsDataResponse(responseData: any) {

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		let savedViewList = responseData.savedViewList;

		let $saved_views_list = $("#saved_views_list");
		if ( $saved_views_list.length === 0 ) {
			throw Error("No DOM element with id 'saved_views_list'");
		}
		$saved_views_list.empty();

		if ( (!savedViewList) || savedViewList.length === 0 ) {
			//  No savedViewList for identifier

			const $saved_views_no_entries = $("#saved_views_no_entries");
			if ( $saved_views_no_entries.length === 0 ) {
				throw Error("No DOM element with id 'saved_views_no_entries'");
			}
			$saved_views_no_entries.show();

			return; // EARLY EXIT
		}

		const $saved_views_no_entries = $("#saved_views_no_entries");
		if ( $saved_views_no_entries.length === 0 ) {
			throw Error("No DOM element with id 'saved_views_no_entries'");
		}
		$saved_views_no_entries.hide();

		//  Add inner Saved Views list container

		let canSelectSearches = false;


		//  this._projectPage_SearchesAdmin is never populated so Skip this code for now

		//
		// //  For now, only select searches when Searches Admin Object provided
		// if ( this._projectPage_SearchesAdmin ) {
		// 	canSelectSearches = true;
		// }

		const searchesContainerContext = { canSelectSearches };

		const _projpg_saved_view_list_containerHTML = this._projpg_saved_view_list_container_template(searchesContainerContext);
		const $_projpg_saved_view_list_container = $( _projpg_saved_view_list_containerHTML );
		$_projpg_saved_view_list_container.appendTo( $saved_views_list );

		for ( const savedViewItem of savedViewList ) {

			let canEdit = savedViewItem.canEdit;
			let canDelete = savedViewItem.canDelete;

			if ( ! this._projectPage_SavedViews_Section_LoggedInUsersInteraction ) {
				canEdit = false;
				canDelete = false;
			}

			let context = {
				savedViewItem : savedViewItem,
				canEdit,
				canDelete
			};

			const savedViewEntry_HTML = this._projpg_saved_view_list_item_template(context);

			const $saved_view_entry = $(savedViewEntry_HTML);

			$saved_view_entry.appendTo( $_projpg_saved_view_list_container );

			addToolTips( $saved_view_entry );  // External Function

			this._addSavedViewItem_ClickHandlers({ $saved_view_entry, savedViewItem });

		}
	}

	/**
	 * for HTML in single_search_expansion_icon_template.handlebars
	 */
	_addSearch_ShowHideBlock_ClickHandlers({ $expansion_entry, savedViewItem }: { $expansion_entry: any, savedViewItem: any }) {

		// this._projectPage_SearchDetails_AllUsers.addSearch_ShowHideBlock_ClickHandlers({ $expansion_entry, savedViewItem });
	}

	/**
	 * 
	 */
	_addSavedViewItem_ClickHandlers({ $saved_view_entry, savedViewItem }: { $saved_view_entry: any, savedViewItem: any }) {

		const objectThis = this;

		if ( ! this._projectPage_SavedViews_Section_LoggedInUsersInteraction ) {

			// No LoggedInUser so exit

			return;  // EARLY EXIT
		}

		//  Only for Logged In Users

		this._projectPage_SavedViews_Section_LoggedInUsersInteraction.add_ClickHandlers({ $saved_view_entry, savedViewItem });

	}

}
