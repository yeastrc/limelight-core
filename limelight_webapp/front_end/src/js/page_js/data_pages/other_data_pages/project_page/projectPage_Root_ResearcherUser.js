/**
 * projectPage_Root_ResearcherUser.js
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

/**
 * Require Handlebars and dummy_template_template-bundle.js so that Handlebars is properly initialized for other uses of it
 */
var Handlebars = require('handlebars/runtime');
var _dummy_template_template_bundle = 
	require("../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );
Handlebars.templates = _dummy_template_template_bundle;


/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError.js';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage.js';

import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader.js';

import { CollapsableSection_StandardProcessing } from 'page_js/main_pages/collapsableSection_StandardProcessing.js';


//  Local Imports

import { ProjectPage_CommonOverall } from './projectPage_CommonOverall.js';

import { ProjectPage_SearchesSection_LoggedInUsersInteraction } from './projectPage_SearchesSection_LoggedInUsersInteraction.js';
import { ProjectPage_SearchDetails_LoggedInUsers } from './projectPage_SearchDetails_LoggedInUsers.js';
import { ProjectPage_SavedViews_Section_LoggedInUsersInteraction } from './projectPage_SavedViews_Section_LoggedInUsersInteraction';

import { ProjectPage_ProjectSection_AllUsersInteraction } from './projectPage_ProjectSection_AllUsersInteraction.js';
import { ProjectPage_SearchesSection_AllUsersInteraction } from './projectPage_SearchesSection_AllUsersInteraction.js';
import { ProjectPage_SavedViews_Section_AllUsersInteraction } from './projectPage_SavedViews_Section_AllUsersInteraction.js'

import { ProjectPage_ProjectUserAccessAdminSection } from './projectPage_ProjectUserAccessAdminSection.js';
import { ProjectPage_ProjectSection_LoggedInUsersInteraction } from './projectPage_ProjectSection_LoggedInUsersInteraction.js';
import { ProjectPage_PublicAccessSection_ProjectOwnerInteraction } from './projectPage_PublicAccessSection_ProjectOwnerInteraction.js';

/**
 * 
 */
class ProjectViewPage_Root_ResearcherUser {
	
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
		let objectThis = this;
		
		catchAndReportGlobalOnError.init();
		
		initShowHideErrorMessage();

		//  Collapse/Expand for Project Info and Searches
		const collapsableSection_StandardProcessing = new CollapsableSection_StandardProcessing();
		collapsableSection_StandardProcessing.initialize();

		const projectPage_CommonOverall = new ProjectPage_CommonOverall();
		projectPage_CommonOverall.initialize();
		
		const userIsProjectOwner = false;
		const projectLocked = false;
		
		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();

		this._projectPage_ProjectSection_LoggedInUsersInteraction = new ProjectPage_ProjectSection_LoggedInUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL, projectLocked : projectLocked });
		this._projectPage_SearchesSection_LoggedInUsersInteraction = new ProjectPage_SearchesSection_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });
		this._projectPage_SearchDetails_LoggedInUsers = new ProjectPage_SearchDetails_LoggedInUsers({ projectIdentifierFromURL : this._projectIdentifierFromURL });
		this._projectPage_SavedViews_Section_LoggedInUsersInteraction = new ProjectPage_SavedViews_Section_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });

		this._projectPage_ProjectSection_AllUsersInteraction = 
			new ProjectPage_ProjectSection_AllUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction : this._projectPage_ProjectSection_LoggedInUsersInteraction } );
		
		this._projectPage_SearchesSection_AllUsersInteraction = 
			new ProjectPage_SearchesSection_AllUsersInteraction( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL,
				projectPage_SearchesSection_LoggedInUsersInteraction : this._projectPage_SearchesSection_LoggedInUsersInteraction,
				projectPage_SearchDetails_LoggedInUsers : this._projectPage_SearchDetails_LoggedInUsers,
				projectPage_SearchesAdmin : this._projectPage_SearchesAdmin } );

		this._projectPage_SavedViews_Section_AllUsersInteraction =
			new ProjectPage_SavedViews_Section_AllUsersInteraction({ 
				projectIdentifierFromURL : this._projectIdentifierFromURL,
				projectPage_SavedViews_Section_LoggedInUsersInteraction : this._projectPage_SavedViews_Section_LoggedInUsersInteraction });
		

		this._projectPage_ProjectUserAccessAdminSection =
			new ProjectPage_ProjectUserAccessAdminSection( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL, projectLocked : projectLocked } );

		this._projectPage_PublicAccessSection_ProjectOwnerInteraction =
				new ProjectPage_PublicAccessSection_ProjectOwnerInteraction( { 
					projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked } );
					
		this._projectPage_SearchesSection_LoggedInUsersInteraction.initialize({ projectPage_SearchesSection_AllUsersInteraction : this._projectPage_SearchesSection_AllUsersInteraction });

		this._projectPage_SavedViews_Section_LoggedInUsersInteraction.initialize({ projectPage_SavedViews_Section_AllUsersInteraction : this._projectPage_SavedViews_Section_AllUsersInteraction });

		this._projectPage_ProjectSection_AllUsersInteraction.initialize();
		this._projectPage_SearchesSection_AllUsersInteraction.initialize();
		this._projectPage_SavedViews_Section_AllUsersInteraction.initialize();

		this._projectPage_ProjectSection_LoggedInUsersInteraction.initialize({ projectPage_ProjectSection_AllUsersInteraction : this._projectPage_ProjectSection_AllUsersInteraction });
		this._projectPage_ProjectUserAccessAdminSection.initialize();
		this._projectPage_PublicAccessSection_ProjectOwnerInteraction.initialize();
		
		////  Instance of class
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		
		mainPagesPopulateHeader.initialize();
		
//		let projectViewPage_UserAccessAdminSection = 
//			new ProjectViewPage_UserAccessAdminSection( { projectIdentifierFromURL : this._projectIdentifierFromURL } );
//		projectViewPage_UserAccessAdminSection.initialize();
		
		this._projectPage_ProjectSection_AllUsersInteraction.getProjectData();
		this._projectPage_SavedViews_Section_AllUsersInteraction.getSavedViewsData();
		this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();
		
		this._initializeCalled = true;
	};
	
	/**
	 * 
	 */
	_getProjectIdentifierFromURL() {

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



