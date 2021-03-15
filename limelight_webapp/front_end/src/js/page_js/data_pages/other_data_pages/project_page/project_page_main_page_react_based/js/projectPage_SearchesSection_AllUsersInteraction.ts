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

//  Import Handlebars templates

import { _project_page_searches_section_all_users_interaction_template } from '../../projectPage__Common__ImportHandlebarsTemplates'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { CollapsableSection_StandardProcessing } from 'page_js/main_pages/collapsableSection_StandardProcessing';

import { addToolTips } from 'page_js/common_all_pages/genericToolTip';

import { sortSearchesOnDisplayOrder_OrDefaultOrder } from 'page_js/data_pages/data_pages_common/sortSearchesOnDisplayOrder_OrDefaultOrder';

//  Local imports

import {ProjectPage_SearchesAdmin} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {
	ProjectPage_SearchesSection_ROOT_Component,
	ProjectPage_SearchesSection_ROOT_Component_Props
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_ROOT_Container_Component";
import React from "react";
import ReactDOM from "react-dom";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";

//  prefix for DOM element 'id' attribute, followed by project search id
const _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_CHECKBOX_ID_PREFIX = "search_item_checkbox_root_id_";
const _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX = "search_item_expand_collapse_root_id_";
const _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX = "search_item_main_root_id_";

/**
 * 
 */
export class ProjectPage_SearchesSection_AllUsersInteraction {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

	private _projectPage_SearchesAdmin : ProjectPage_SearchesAdmin

	private _dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory

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
				dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: this._dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails,
				projectPage_SearchesAdmin: this._projectPage_SearchesAdmin,
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

}
