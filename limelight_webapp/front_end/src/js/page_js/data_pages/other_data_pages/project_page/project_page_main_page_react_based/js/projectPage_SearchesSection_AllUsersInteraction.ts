/**
 * projectPage_SearchesSection_AllUsersInteraction.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Searches Section - Provide interaction for All Users (including public users when project is public) 
 * 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

//  Local imports

import {ProjectPage_SearchesAdmin} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {
	ProjectPage_SearchesSection_ROOT_Component,
	ProjectPage_SearchesSection_ROOT_Component_Props
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_ROOT_Container_Component";
import React from "react";
import ReactDOM from "react-dom";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {
	ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_folderIds_ExpandedFolders_Callback,
	ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_folderIds_ExpandedFolders_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_SearchesAndFoldersList_Component";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";


const _SESSION_STORAGE_KEY = "limelight_project_page_folders_expanded_ids"



/**
 * 
 */
export class ProjectPage_SearchesSection_AllUsersInteraction {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

	private _projectPage_SearchesAdmin : ProjectPage_SearchesAdmin

	private _dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory

	private _callback_Update_folderIds_ExpandedFolders_BindThis = this._callback_Update_folderIds_ExpandedFolders.bind(this);

	private _DO_NOT_CALL() {
		const callback_Update_folderIds_ExpandedFolders: ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_folderIds_ExpandedFolders_Callback =
			this._callback_Update_folderIds_ExpandedFolders
	}

	private _initial__folderIds_ExpandedFolders : Set<number>

	/**
	 * searchSelectionChangeCallback - function called when the search selection changes
	 */
	constructor({ 
		projectIdentifierFromURL, 
		projectPage_SearchesAdmin, // object of class ProjectPage_SearchesAdmin
		dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails
	} : {
		projectIdentifierFromURL : string
		//  rest of parameters are optional
		projectPage_SearchesAdmin? : ProjectPage_SearchesAdmin
		dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
	}) {

		this._projectIdentifierFromURL = projectIdentifierFromURL;

		this._projectPage_SearchesAdmin = projectPage_SearchesAdmin;

		this._dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails = dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails;
	}

	/**
	 * 
	 */
	initialize() {

		this._initializeCalled = true;

		this._initial__folderIds_ExpandedFolders = new Set();

		const storedValueJSON = window.sessionStorage.getItem(_SESSION_STORAGE_KEY )
		if ( ! storedValueJSON ) {


		} else {

			let storageValue = null
			try {
				storageValue = JSON.parse( storedValueJSON );
			} catch (e) {
				
			}
			if ( storageValue ) {
				if ( storageValue.projectIdentifier === this._projectIdentifierFromURL ) {

					if ( storageValue.folderIds_ExpandedFolders && ( storageValue.folderIds_ExpandedFolders instanceof Array )) {

						for ( const entry of storageValue.folderIds_ExpandedFolders ) {
							if ( variable_is_type_number_Check(entry) ) {
								this._initial__folderIds_ExpandedFolders.add(entry)
							}
						}
					}
				}
			}
		}


		this._save_folderIds_ExpandedFolders_To_SessionStorage( this._initial__folderIds_ExpandedFolders );

	};

	/**
	 * 
	 */
	getSearchList() {

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		let projectIdentifier = this._projectIdentifierFromURL;

		{
			const containerDOMElement = document.getElementById("explore_data_section__contents_block");
			if ( ! containerDOMElement ) {
				throw Error("NO DOM Element with id 'explore_data_section__contents_block'")
			}

			//  Remove existing React Node, if one exists
			ReactDOM.unmountComponentAtNode(containerDOMElement);


			const projectPage_SearchesSection_ROOT_Component_Props : ProjectPage_SearchesSection_ROOT_Component_Props = {
				projectIdentifier,
				folderIds_ExpandedFolders_InitialValue: this._initial__folderIds_ExpandedFolders,
				dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: this._dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails,
				projectPage_SearchesAdmin: this._projectPage_SearchesAdmin,
				callback_Update_folderIds_ExpandedFolders: this._callback_Update_folderIds_ExpandedFolders_BindThis
			};


			const projectPage_SearchesSection_ROOT_Component = (
				React.createElement(
					ProjectPage_SearchesSection_ROOT_Component,
					projectPage_SearchesSection_ROOT_Component_Props,
					null
				)
			);

			const renderCompletecallbackFcn_Local = ( ) => {

			}

			const renderedReactComponent = ReactDOM.render(
				projectPage_SearchesSection_ROOT_Component,
				containerDOMElement,
				renderCompletecallbackFcn_Local
			);

		}

	};

	private _callback_Update_folderIds_ExpandedFolders( params: ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_folderIds_ExpandedFolders_Params ) {

		this._initial__folderIds_ExpandedFolders = params.updated_folderIds_ExpandedFolders;

		this._save_folderIds_ExpandedFolders_To_SessionStorage( params.updated_folderIds_ExpandedFolders )
	}

	private _save_folderIds_ExpandedFolders_To_SessionStorage( updated_folderIds_ExpandedFolders_Set : Set<number> ) {

		window.setTimeout( () => {

			let updated_folderIds_ExpandedFolders = [];
			if ( updated_folderIds_ExpandedFolders_Set ) {
				updated_folderIds_ExpandedFolders = Array.from( updated_folderIds_ExpandedFolders_Set )
			}

			const storageValue = {
				folderIds_ExpandedFolders: updated_folderIds_ExpandedFolders,
				projectIdentifier: this._projectIdentifierFromURL
			}
			const storedValueJSON = JSON.stringify( storageValue );

			window.sessionStorage.setItem(_SESSION_STORAGE_KEY, storedValueJSON )

		}, 50 );
	}

}
