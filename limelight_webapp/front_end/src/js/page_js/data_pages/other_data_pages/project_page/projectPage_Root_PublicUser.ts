/**
 * projectPage_Root_PublicUser.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Root JS file for Public Users 
 * 
 * 
 */


/**
 * Always do in Root Javascript for page:
 */

//  Required Import for Handlebars Support on this page
import { Handlebars, _dummy_template_template_bundle } from './projectPage_Root_Handlebars_Include'

const Handlebars_Local = Handlebars
const _dummy_template_template_bundle_Local = _dummy_template_template_bundle



/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

import { CollapsableSection_StandardProcessing } from 'page_js/main_pages/collapsableSection_StandardProcessing';


//  Local Imports

import { ProjectPage_CommonOverall } from './projectPage_CommonOverall';

import { ProjectPage_ProjectSection_AllUsersInteraction } from './project_page_project_section/js/projectPage_ProjectSection_AllUsersInteraction';

import {add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";

/**
 * 
 */
class ProjectViewPage_Root_PublicUser {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

	private _projectPage_ProjectSection_AllUsersInteraction : ProjectPage_ProjectSection_AllUsersInteraction

	/**
	 * 
	 */
	constructor() {

		this._initializeCalled = false;
		
	}

	/**
	 * 
	 */
	initialize() {

		catchAndReportGlobalOnError.init();

		const projectPage_CommonOverall = new ProjectPage_CommonOverall();
		projectPage_CommonOverall.initialize();
		
		//  Collapse/Expand for Project Info and Searches
		const collapsableSection_StandardProcessing = new CollapsableSection_StandardProcessing();
		collapsableSection_StandardProcessing.initialize();

		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();
		
		this._projectPage_ProjectSection_AllUsersInteraction = 
			new ProjectPage_ProjectSection_AllUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL } );

		this._projectPage_ProjectSection_AllUsersInteraction.initialize();

		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		
		mainPagesPopulateHeader.initialize();

		this._projectPage_ProjectSection_AllUsersInteraction.getProjectData();

		try {
			add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component({
				projectIdentifierFromURL : this._projectIdentifierFromURL,
				projectIsLocked: true,
				for_PublicUser: true,
				projectPage_SearchesAdmin: null,
				projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: null,
				dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: null,
				projectPage_ExperimentsSection_LoggedInUsersInteraction: null,
				projectPage_SavedViews_Section_LoggedInUsersInteraction: null,
				getSubComponents__Callback_Function: null
			})
		} catch (e) {

		}

		this._initializeCalled = true;
	}
	

	/**
	 * 
	 */
	_getProjectIdentifierFromURL() : string {

		let windowPath = window.location.pathname;
		
		let lastIndexOfSlash = windowPath.lastIndexOf( "/" );
		
		if ( lastIndexOfSlash === -1 ) {
			throw Error("No Project Identifier in URL. windowPath: " + windowPath );
		}
		
		let projectIdentifier = windowPath.substring( lastIndexOfSlash + 1 );

		return projectIdentifier;
	}

}


///////////////

$(document).ready(function() {

	//Instance of class
	let projectViewPage_Root_PublicUser = new ProjectViewPage_Root_PublicUser();

	try {
		projectViewPage_Root_PublicUser.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});



