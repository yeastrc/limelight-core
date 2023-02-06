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


import {Set_ProjectWide_DefaultFilter_Cutoffs_Overrides} from "page_js/data_pages/other_data_pages/project_page/project_page__set_project_wide_default_filter_cutoffs_overrides/js/set_ProjectWide_DefaultFilter_Cutoffs_Overrides";
import {
	projectPage_DeleteSearch_Overlay_Component__openOverlay,
	ProjectPage_SearchesAdmin_DeleteSearch_Overlay_Component__SingleSearchEntry
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesAdmin_DeleteSearch_Overlay_Component";
import {openOverlay_ForCopyMoveSearches} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesAdmin_CopyMove_Searches_Overlay_Component";
import {open_Search_Tags_Manage_TagsForProject_OverlayComponent_Overlay} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_project/search_Tags_Manage_TagsForProject_OverlayComponent";
import {
	project_OrganizeSearches_Folder_AddRename_Component__openOverlay,
	Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback,
	Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback_Params
} from "page_js/data_pages/other_data_pages/project_organize_searches_page/project_OrganizeSearches_Folder_AddRename_Component";
import {
	searchName_and_SearchShortName_Change_Component__openOverlay,
	SearchName_and_SearchShortName_Change_Component_Change_Callback
} from "page_js/data_pages/common_components__react/search_name_and_search_short_name__user_change_overlay/searchName_and_SearchShortName_Change_Component_and_WebserviceCall";
import {
	open_Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Overlay,
	Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_MainParams,
	Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch
} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_search/search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent";

/**
 * 
 */
export class ProjectPage_SearchesAdmin {

	private _initializeCalled = false;

	private _projectIdentifierFromURL;

	set_ProjectWide_DefaultFilter_Cutoffs_Overrides: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides;

	/**
	 * searchSelectionChangeCallback - function called when the search selection changes
	 */
	constructor({ projectIdentifierFromURL }) {

		this._initializeCalled = false;

        this._projectIdentifierFromURL = projectIdentifierFromURL;

		this.set_ProjectWide_DefaultFilter_Cutoffs_Overrides = new Set_ProjectWide_DefaultFilter_Cutoffs_Overrides({
			projectIdentifierFromURL
		});
    }

	/**
	 * 
	 */
	initialize() {
		this.set_ProjectWide_DefaultFilter_Cutoffs_Overrides.initialize();

        this._initializeCalled = true;
    }

    openOverlay_Change_SearchName_SearchShortName(
		{
			projectSearchId,
			existingSearchName,
			existingSearchShortName,
			position_top,
			position_left,
			change_Callback,
			cancel_Callback
		} : {
			projectSearchId: number
			existingSearchName: string
			existingSearchShortName: string
			position_top: number
			position_left: number
			change_Callback: SearchName_and_SearchShortName_Change_Component_Change_Callback
			cancel_Callback: () => void
		}
	) {
		searchName_and_SearchShortName_Change_Component__openOverlay({
			projectSearchId,
			existingSearchName,
			existingSearchShortName,
			position_top,
			position_left,
			change_Callback,
			cancel_Callback
		} )

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

		const searchesToDelete: Array<ProjectPage_SearchesAdmin_DeleteSearch_Overlay_Component__SingleSearchEntry> = [
			{ projectSearchId, searchId, searchName }
		]

		projectPage_DeleteSearch_Overlay_Component__openOverlay({ searchesToDelete, projectIdentifier, deleteComplete_Callback });

		return;
	}

	/**
	 * Initiate Delete these Searches
	 *
	 * Opens an overlay for user to get info and confirm deletion
	 */
	deleteSearches(
		{
			searchesToDelete, projectIdentifier, deleteComplete_Callback
		} : {
			searchesToDelete: Array<ProjectPage_SearchesAdmin_DeleteSearch_Overlay_Component__SingleSearchEntry>
			projectIdentifier : string
			deleteComplete_Callback: () => void
		}) : void {

		if ( searchesToDelete.length === 0 ) {

			// No project search ids found to process

			return; // EARLY RETURN
		}
		projectPage_DeleteSearch_Overlay_Component__openOverlay({ searchesToDelete, projectIdentifier, deleteComplete_Callback });

		return;
	}

	////////  FOLDER

	renameFolder(
		{
			folderId, folderName, position_top, position_left
		} : {
			folderId: number
			folderName: string
			position_top: number
			position_left: number
		}
	) : void {

		const change_Callback: Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback =
			(params: Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback_Params) : void =>  {

				window.location.reload(true)
			}

		project_OrganizeSearches_Folder_AddRename_Component__openOverlay({
			projectIdentifier: null, // For Add
			folderId_Existing: folderId,
			folderName_Existing: folderName,
			position_top,
			position_left,
			change_Callback,
			cancel_Callback: null
		})
	}

	/**
	 * Delete this Folder Id
	 */
	deleteFolder(
		{
			folderId, callback_FolderDelete_Complete
		} : {
			folderId: number
			callback_FolderDelete_Complete: () => void
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
				if ( callback_FolderDelete_Complete ) {
					callback_FolderDelete_Complete()
				}

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
	openOverlay_ForCopySearches(
		{
			projectSearchIdsSelected, projectIdentifier
		} : {
			projectSearchIdsSelected: Set<number>
			projectIdentifier : string

		} ) : void {

		if ( projectSearchIdsSelected.size === 0 ) {

			// No project search ids found to process

			return; // EARLY RETURN
		}

		const copyMoveSearchesReturnToProject_Callback = () => {

			//  Do Nothing since only copy.  No longer move
		}

		openOverlay_ForCopyMoveSearches({ doCopy: true, doMove: false, projectSearchIdsSelected, projectIdentifier, copyMoveSearchesReturnToProject_Callback });
	}


	openOverlay_For_Search_Tags_Manage_TagsForSearches(
		{
			projectSearchIdsSelected
		} : {
			projectSearchIdsSelected: Set<number>
		} ) : void {

		if (projectSearchIdsSelected.size === 0) {

			// No project search ids found to process

			return; // EARLY RETURN
		}

		const searches: Array<Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch> = []

		for ( const projectSearchId of projectSearchIdsSelected ) {
			const search: Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch = {
				projectSearchId
			}
			searches.push(search)
		}

		const mainParams : Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_MainParams = {
			searches
		}

		open_Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Overlay({ mainParams })
	}


	openOverlay_For_Search_Tags_Manage_TagsForProject(
		{
			projectIdentifier
		} : {
			projectIdentifier: string
		} ) : void {

		open_Search_Tags_Manage_TagsForProject_OverlayComponent_Overlay({ mainParams:{ projectIdentifier} })
	}
}
