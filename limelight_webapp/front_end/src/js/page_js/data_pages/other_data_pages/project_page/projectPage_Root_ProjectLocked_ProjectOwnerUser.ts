/**
 * projectPage_Root_ProjectLocked_ProjectOwnerUser.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Root JS file for Project Owner Users when the Project is Locked
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

import { initShowHideErrorMessage } from 'page_js/showHideErrorMessage';

import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

import { CollapsableSection_StandardProcessing } from 'page_js/main_pages/collapsableSection_StandardProcessing';


//  Local Imports

import { ProjectPage_CommonOverall } from './projectPage_CommonOverall';

import { ProjectPage_ProjectSection_ProjectOwnerInteraction } from './project_page_project_section/js/projectPage_ProjectSection_ProjectOwnerInteraction';
import {
	add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";
import {
	add_ProjectPage__ProjectSection_AllUser_Root_Component_ToPage
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_AllUser_Root_Component";

/**
 * 
 */
class ProjectViewPage_Root_ProjectLocked_ProjectOwnerUser {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

	private _projectPage_ProjectSection_ProjectOwnerInteraction : ProjectPage_ProjectSection_ProjectOwnerInteraction

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
		
		initShowHideErrorMessage();

		const projectPage_CommonOverall = new ProjectPage_CommonOverall();
		projectPage_CommonOverall.initialize();
		
		//  Collapse/Expand for Project Info and Searches
		const collapsableSection_StandardProcessing = new CollapsableSection_StandardProcessing();
		collapsableSection_StandardProcessing.initialize();

		const userIsProjectOwner = true;
		const projectLocked = true;
		
		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();

		this._projectPage_ProjectSection_ProjectOwnerInteraction =
			new ProjectPage_ProjectSection_ProjectOwnerInteraction( {
				projectIdentifierFromURL : this._projectIdentifierFromURL, projectLocked } );

		this._projectPage_ProjectSection_ProjectOwnerInteraction.initialize();

		////Instance of class
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		
		mainPagesPopulateHeader.initialize();

		add_ProjectPage__ProjectSection_AllUser_Root_Component_ToPage({ propsValue: { projectIdentifier: this._projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot: undefined }})


		add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component({
			projectIdentifierFromURL : this._projectIdentifierFromURL,
			projectIsLocked: true,
			for_PublicUser: false,
			projectPage_SearchesAdmin: null,
			projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: null,
			dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: null,
			projectPage_ExperimentsSection_LoggedInUsersInteraction: null,
			projectPage_SavedViews_Section_LoggedInUsersInteraction: null,
			getSubComponents__Callback_Function: null
		})

		this._initializeCalled = true;
	};
	

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
	};

};


///////////////

$(document).ready(function() {

	//Instance of class
	let projectViewPage_Root_ProjectLocked_ProjectOwnerUser = new ProjectViewPage_Root_ProjectLocked_ProjectOwnerUser();

	try {
		projectViewPage_Root_ProjectLocked_ProjectOwnerUser.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});



