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

//  Local imports

import { ProjectPage_SearchesAdmin_CopyMove_Searches } from "./projectPage_SearchesAdmin_CopyMove_Searches";

import { ProjectPage_SearchesAdmin_OrganizeSearchesAndFolders } from "./projectPage_SearchesAdmin_OrganizeSearchesAndFolders";
import {ProjectPage_SearchesSection_AllUsersInteraction} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesSection_AllUsersInteraction";

/**
 * 
 */
export class ProjectPage_SearchesAdmin {

	private _initializeCalled = false;

	private _projectIdentifierFromURL;

	projectPage_SearchesAdmin_CopyMove_Searches: ProjectPage_SearchesAdmin_CopyMove_Searches;

	projectPage_SearchesAdmin_OrganizeSearchesAndFolders: ProjectPage_SearchesAdmin_OrganizeSearchesAndFolders;

	private _projectPage_SearchesSection_AllUsersInteraction: ProjectPage_SearchesSection_AllUsersInteraction;

	/**
	 * searchSelectionChangeCallback - function called when the search selection changes
	 */
	constructor({ projectIdentifierFromURL }) {

		this._initializeCalled = false;

        this._projectIdentifierFromURL = projectIdentifierFromURL;

		this.projectPage_SearchesAdmin_CopyMove_Searches = new ProjectPage_SearchesAdmin_CopyMove_Searches({ projectIdentifierFromURL });
		
		this.projectPage_SearchesAdmin_OrganizeSearchesAndFolders = new ProjectPage_SearchesAdmin_OrganizeSearchesAndFolders({
			projectIdentifierFromURL,
			projectPage_ProjectSection_LoggedInUsersInteraction : undefined
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

		this.projectPage_SearchesAdmin_CopyMove_Searches.initialize( { projectPage_SearchesSection_AllUsersInteraction });
		
		this.projectPage_SearchesAdmin_OrganizeSearchesAndFolders.initialize( { projectPage_SearchesSection_AllUsersInteraction });

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
	 * Delete this Project Search Id
	 */
	deleteSearch(
		{
			projectSearchId, searchId, deleteComplete_Callback
		} : {
			projectSearchId: number
			searchId: number
			deleteComplete_Callback: () => void
		}) {

		if ( ! window.confirm("Delete Search Id: " + searchId ) ) {
			return;
		}

		let requestObj = {
			projectSearchId : projectSearchId
		};

		const url = "d/rws/for-page/delete-project-search";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				deleteComplete_Callback();

				// this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();

			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
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


}
