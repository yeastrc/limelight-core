/**
 * projectPage_Root_PublicUser.js
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
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

import { CollapsableSection_StandardProcessing } from 'page_js/main_pages/collapsableSection_StandardProcessing';


//  Local Imports

import { ProjectPage_CommonOverall } from './projectPage_CommonOverall';

import { ProjectPage_ProjectSection_AllUsersInteraction } from './projectPage_ProjectSection_AllUsersInteraction';

//  Comment out Experiment Code
// import { ProjectPage_ExperimentsSection_AllUsersInteraction } from './project_page_experiments_section/projPg_Expermnts_AllUsersInteraction';

import { ProjectPage_SearchesSection_AllUsersInteraction } from './projectPage_SearchesSection_AllUsersInteraction';
import { ProjectPage_SavedViews_Section_AllUsersInteraction } from './projectPage_SavedViews_Section_AllUsersInteraction'

/**
 * 
 */
class ProjectViewPage_Root_PublicUser {
	
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

		const projectPage_CommonOverall = new ProjectPage_CommonOverall();
		projectPage_CommonOverall.initialize();
		
		//  Collapse/Expand for Project Info and Searches
		const collapsableSection_StandardProcessing = new CollapsableSection_StandardProcessing();
		collapsableSection_StandardProcessing.initialize();

		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();
		
		this._projectPage_ProjectSection_AllUsersInteraction = 
			new ProjectPage_ProjectSection_AllUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL } );
		
		//  Comment out Experiment Code
		// this._projectPage_ExperimentsSection_AllUsersInteraction = 
		// 	new ProjectPage_ExperimentsSection_AllUsersInteraction( { 
		// 		projectIdentifierFromURL : this._projectIdentifierFromURL 
		// 	} );

		this._projectPage_SearchesSection_AllUsersInteraction = 
			new ProjectPage_SearchesSection_AllUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL } );

		this._projectPage_SavedViews_Section_AllUsersInteraction =
			new ProjectPage_SavedViews_Section_AllUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });

		
		this._projectPage_ProjectSection_AllUsersInteraction.initialize();

		//  Comment out Experiment Code
		// this._projectPage_ExperimentsSection_AllUsersInteraction.initialize();
		
		this._projectPage_SearchesSection_AllUsersInteraction.initialize();
		this._projectPage_SavedViews_Section_AllUsersInteraction.initialize();

		////Instance of class
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		
		mainPagesPopulateHeader.initialize();
		
//		let projectViewPage_UserAccessAdminSection = 
//			new ProjectViewPage_UserAccessAdminSection( { projectIdentifierFromURL : this._projectIdentifierFromURL } );
//		projectViewPage_UserAccessAdminSection.initialize();
		
		this._projectPage_ProjectSection_AllUsersInteraction.getProjectData();
		this._projectPage_SavedViews_Section_AllUsersInteraction.getSavedViewsData();
		this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();
		
		this._initializeCalled = true;
	}
	

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



