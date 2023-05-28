/**
 * projectPage_Root_ResearcherUser.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Root JS file for Researcher Users 
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

import { ProjectPage_ExperimentsSection_LoggedInUsersInteraction } from './project_page_experiments_section/projPg_Expermnts_LoggedInUsersInteraction';

import { ProjectPage_SavedViews_Section_LoggedInUsersInteraction } from './projectPage_SavedViews_Section_LoggedInUsersInteraction';

import { ProjectPage_ProjectSection_AllUsersInteraction } from './project_page_project_section/js/projectPage_ProjectSection_AllUsersInteraction';

import { ProjectPage_ProjectUserAccessAdminSection } from './project_page_project_section/js/projectPage_ProjectUserAccessAdminSection';
import { ProjectPage_ProjectSection_LoggedInUsersInteraction } from './project_page_project_section/js/projectPage_ProjectSection_LoggedInUsersInteraction';
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_ShareDataSection_ResearcherUser_AssistantProjectOwner__Interaction} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/share_data_section/researcher_aka_assistant_project_owner/projectPage_ShareDataSection_ResearcherUser_AssistantProjectOwner__Interaction";
import {add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";



/**
 * 
 */
class ProjectViewPage_Root_ResearcherUser {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

	private _projectPage_ProjectSection_LoggedInUsersInteraction : ProjectPage_ProjectSection_LoggedInUsersInteraction

	private _projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction

	private _projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction

	private _projectPage_ProjectSection_AllUsersInteraction : ProjectPage_ProjectSection_AllUsersInteraction

	private _projectPage_ProjectUserAccessAdminSection : ProjectPage_ProjectUserAccessAdminSection
	private _projectPage_PublicAccessSection_ResearcherUser_AssistantProjectOwner__Interaction : ProjectPage_ShareDataSection_ResearcherUser_AssistantProjectOwner__Interaction

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

		//  Collapse/Expand for Project Info and Searches
		const collapsableSection_StandardProcessing = new CollapsableSection_StandardProcessing();
		collapsableSection_StandardProcessing.initialize();

		const projectPage_CommonOverall = new ProjectPage_CommonOverall();
		projectPage_CommonOverall.initialize();
		
		const userIsProjectOwner = false;
		const projectLocked = false;

		const dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails = new DataPages_LoggedInUser_CommonObjectsFactory();
		
		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();

		this._projectPage_ProjectSection_LoggedInUsersInteraction = new ProjectPage_ProjectSection_LoggedInUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL, projectLocked : projectLocked });

		{
			const isResearcherUser = document.getElementById("project_page_user_level_researcher_found__just_above_bundle");

			if ( isResearcherUser ) {

				//  Researcher Level user so populate (NOT Viewer Level user AKA Read Only user)

				this._projectPage_ExperimentsSection_LoggedInUsersInteraction = new ProjectPage_ExperimentsSection_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });
			}
		}

		this._projectPage_SavedViews_Section_LoggedInUsersInteraction = new ProjectPage_SavedViews_Section_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });

		this._projectPage_ProjectSection_AllUsersInteraction = 
			new ProjectPage_ProjectSection_AllUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction : this._projectPage_ProjectSection_LoggedInUsersInteraction } );

		this._projectPage_ProjectUserAccessAdminSection =
			new ProjectPage_ProjectUserAccessAdminSection( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked } );

		this._projectPage_PublicAccessSection_ResearcherUser_AssistantProjectOwner__Interaction =
				new ProjectPage_ShareDataSection_ResearcherUser_AssistantProjectOwner__Interaction();

		this._projectPage_SavedViews_Section_LoggedInUsersInteraction.initialize();

		this._projectPage_ProjectSection_AllUsersInteraction.initialize();

		this._projectPage_ProjectSection_LoggedInUsersInteraction.initialize({ projectPage_ProjectSection_AllUsersInteraction : this._projectPage_ProjectSection_AllUsersInteraction });
		
		window.setTimeout(() => {
			//  Run in setTimeout to catch Errors
			this._projectPage_ProjectUserAccessAdminSection.initialize();
		}, 10 );
		try {
			add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component({
				projectIdentifierFromURL : this._projectIdentifierFromURL,
				projectIsLocked: projectLocked,
				projectPage_SearchesAdmin: null,
				projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: null,
				dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails,
				projectPage_ExperimentsSection_LoggedInUsersInteraction: this._projectPage_ExperimentsSection_LoggedInUsersInteraction,
				projectPage_SavedViews_Section_LoggedInUsersInteraction: this._projectPage_SavedViews_Section_LoggedInUsersInteraction,
				getSubComponents__Callback_Function: null
			})
		} catch (e) {

		}

		this._projectPage_PublicAccessSection_ResearcherUser_AssistantProjectOwner__Interaction.initialize();
		
		////  Instance of class
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		
		mainPagesPopulateHeader.initialize();

		this._projectPage_ProjectSection_AllUsersInteraction.getProjectData();

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
	let projectViewPage_Root_ResearcherUser = new ProjectViewPage_Root_ResearcherUser();

	try {
		projectViewPage_Root_ResearcherUser.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});



