/**
 * projectPage_SearchesAdmin.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Searches Admin
 * 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';


import { ProjectPage_SearchesAdmin_OrganizeSearchesAndFolders } from "./projectPage_SearchesAdmin_OrganizeSearchesAndFolders";
import {ProjectPage_SearchesSection_AllUsersInteraction} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesSection_AllUsersInteraction";
import {Set_ProjectWide_DefaultFilter_Cutoffs_Overrides} from "page_js/data_pages/other_data_pages/project_page/project_page__set_project_wide_default_filter_cutoffs_overrides/js/set_ProjectWide_DefaultFilter_Cutoffs_Overrides";
import {projectPage_DeleteSearch_Overlay_Component__openOverlay} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesAdmin_DeleteSearch_Overlay_Component";
import {openOverlay_ForCopyMoveSearches} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesAdmin_CopyMove_Searches_Overlay_Component";

/**
 * 
 */
export class ProjectPage_SearchesAdmin {

	private _initializeCalled = false;

	private _projectIdentifierFromURL;

	projectPage_SearchesAdmin_OrganizeSearchesAndFolders: ProjectPage_SearchesAdmin_OrganizeSearchesAndFolders;

	set_ProjectWide_DefaultFilter_Cutoffs_Overrides: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides;

	private _projectPage_SearchesSection_AllUsersInteraction: ProjectPage_SearchesSection_AllUsersInteraction;

	/**
	 * searchSelectionChangeCallback - function called when the search selection changes
	 */
	constructor({ projectIdentifierFromURL }) {

		this._initializeCalled = false;

        this._projectIdentifierFromURL = projectIdentifierFromURL;

		this.projectPage_SearchesAdmin_OrganizeSearchesAndFolders = new ProjectPage_SearchesAdmin_OrganizeSearchesAndFolders({
			projectIdentifierFromURL
		});

		this.set_ProjectWide_DefaultFilter_Cutoffs_Overrides = new Set_ProjectWide_DefaultFilter_Cutoffs_Overrides({
			projectIdentifierFromURL
		});
    }

	/**
	 * 
	 */
	initialize(
		{
			projectPage_SearchesSection_AllUsersInteraction
		} : {
			projectPage_SearchesSection_AllUsersInteraction: ProjectPage_SearchesSection_AllUsersInteraction
		}
	) {
		this._projectPage_SearchesSection_AllUsersInteraction = projectPage_SearchesSection_AllUsersInteraction;

		this.projectPage_SearchesAdmin_OrganizeSearchesAndFolders.initialize( { projectPage_SearchesSection_AllUsersInteraction });

		this.set_ProjectWide_DefaultFilter_Cutoffs_Overrides.initialize();

        this._initializeCalled = true;
    }

	/**
	 * 
	 */
	saveSearchName(
		{
			projectSearchId, newSearchName, saveComplete_Callback
		} : {
			projectSearchId: number
			newSearchName: string
			saveComplete_Callback: () => void
		}) {

		let requestObj = {
			projectSearchId : projectSearchId,
			searchName : newSearchName
		};

		const url = "d/rws/for-page/update-search-name";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				saveComplete_Callback()

			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	}

	/**
	 * Initiate Delete this Project Search Id
	 *
	 * Opens an overlay for user to get info and confirm deletion
	 */
	deleteSearch(
		{
			projectSearchId, searchId, searchName, projectIdentifier, deleteComplete_Callback
		} : {
			projectSearchId: number
			searchId: number
			searchName: string
			projectIdentifier : string
			deleteComplete_Callback: () => void
		}) {

		projectPage_DeleteSearch_Overlay_Component__openOverlay({ projectSearchId, searchId, searchName, projectIdentifier, deleteComplete_Callback });


		return;
	}

	//  FOLDER


	/**
	 * Delete this Folder Id
	 */
	deleteFolder(
		{
			folderId
		} : {
			folderId: number
		}) {

		if ( ! window.confirm("Delete folder?" ) ) {
			//  User clicked cancel
			return; // EARLY RETURN
		}

		const requestObj = {
			folderId
		};

		const url = "d/rws/for-page/project-organize-searches-folder-delete";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( (reason) => {  }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();

			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
				throw e;
			}
		});
	}

	//  Copy/Move Searches to a different Project

	/**
	 *
	 * @param doCopy
	 * @param doMove
	 * @param projectSearchIdsSelected
	 */
	openOverlay_ForCopyMoveSearches(
		{
			doCopy, doMove, projectSearchIdsSelected, projectIdentifier
		} : {

			doCopy: boolean
			doMove: boolean
			projectSearchIdsSelected: Set<number>
			projectIdentifier : string

		} ) : void {

		if ( projectSearchIdsSelected.size === 0 ) {

			// No project search ids found to process

			return; // EARLY RETURN
		}

		const copyMoveSearchesReturnToProject_Callback = () => {

			this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();
		}

		openOverlay_ForCopyMoveSearches({ doCopy, doMove, projectSearchIdsSelected, projectIdentifier, copyMoveSearchesReturnToProject_Callback });
	}

}
