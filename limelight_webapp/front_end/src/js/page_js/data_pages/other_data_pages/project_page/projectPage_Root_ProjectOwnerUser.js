/**
 * projectPage_Root_ProjectOwnerUser.js
 * 
 * Javascript for projectView.jsp page  
 * 
 * Root JS file for Project Owner Users 
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
// Handlebars.templates = _dummy_template_template_bundle;


/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage';

import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

import { CollapsableSection_StandardProcessing } from 'page_js/main_pages/collapsableSection_StandardProcessing';

//  Local Imports

import { ProjectPage_CommonOverall } from './projectPage_CommonOverall';

//  Comment out Experiment Code
import { ProjectPage_ExperimentsSection_LoggedInUsersInteraction } from './project_page_experiments_section/projPg_Expermnts_LoggedInUsersInteraction';

import { ProjectPage_SearchesSection_LoggedInUsersInteraction } from './projectPage_SearchesSection_LoggedInUsersInteraction';
import { ProjectPage_SearchDetails_LoggedInUsers } from './projectPage_SearchDetails_LoggedInUsers';
import { ProjectPage_SearchesAdmin } from './projectPage_SearchesAdmin';
import { ProjectPage_SavedViews_Section_LoggedInUsersInteraction } from './projectPage_SavedViews_Section_LoggedInUsersInteraction';

import { ProjectPage_ProjectSection_AllUsersInteraction } from './projectPage_ProjectSection_AllUsersInteraction';

//  Comment out Experiment Code
import { ProjectPage_ExperimentsSection_AllUsersInteraction } from './project_page_experiments_section/projPg_Expermnts_AllUsersInteraction';

import { ProjectPage_SearchesSection_AllUsersInteraction } from './projectPage_SearchesSection_AllUsersInteraction';
import { ProjectPage_SavedViews_Section_AllUsersInteraction } from './projectPage_SavedViews_Section_AllUsersInteraction'

import { ProjectPage_ProjectUserAccessAdminSection } from './projectPage_ProjectUserAccessAdminSection';
import { ProjectPage_ProjectSection_ProjectOwnerInteraction } from './projectPage_ProjectSection_ProjectOwnerInteraction';
import { ProjectPage_ProjectSection_LoggedInUsersInteraction } from './projectPage_ProjectSection_LoggedInUsersInteraction';
import { ProjectPage_PublicAccessSection_ProjectOwnerInteraction } from './projectPage_PublicAccessSection_ProjectOwnerInteraction';
import { ProjectPage_UploadData } from './projectPage_UploadData';

/**
 * 
 */
class ProjectViewPage_Root_ProjectOwnerUser {
	
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

		const projectPage_CommonOverall = new ProjectPage_CommonOverall();
		projectPage_CommonOverall.initialize();
		
		//  Collapse/Expand for Project Info and Searches
		const collapsableSection_StandardProcessing = new CollapsableSection_StandardProcessing();
		collapsableSection_StandardProcessing.initialize();

		const userIsProjectOwner = true;
		const projectLocked = false;

		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();

		this._projectPage_ProjectSection_LoggedInUsersInteraction = new ProjectPage_ProjectSection_LoggedInUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL, projectLocked : projectLocked });

		//  Comment out Experiment Code
		this._projectPage_ExperimentsSection_LoggedInUsersInteraction = new ProjectPage_ExperimentsSection_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });
		
		this._projectPage_SearchesSection_LoggedInUsersInteraction = new ProjectPage_SearchesSection_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });
		this._projectPage_SearchDetails_LoggedInUsers = new ProjectPage_SearchDetails_LoggedInUsers({ projectIdentifierFromURL : this._projectIdentifierFromURL });
		this._projectPage_SearchesAdmin = new ProjectPage_SearchesAdmin({ projectIdentifierFromURL : this._projectIdentifierFromURL });
		this._projectPage_SavedViews_Section_LoggedInUsersInteraction = new ProjectPage_SavedViews_Section_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });

		this._projectPage_ProjectSection_AllUsersInteraction = new ProjectPage_ProjectSection_AllUsersInteraction( { 
			projectIdentifierFromURL : this._projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction : this._projectPage_ProjectSection_LoggedInUsersInteraction 
		} );
		
		//  Comment out Experiment Code
		 this._projectPage_ExperimentsSection_AllUsersInteraction = new ProjectPage_ExperimentsSection_AllUsersInteraction( {
		 		projectIdentifierFromURL : this._projectIdentifierFromURL,
		 		projectPage_ExperimentsSection_LoggedInUsersInteraction : this._projectPage_ExperimentsSection_LoggedInUsersInteraction
		 } );


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
		
		this._projectPage_ProjectSection_ProjectOwnerInteraction =
			new ProjectPage_ProjectSection_ProjectOwnerInteraction( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked 
			} );
		
		this._projectPage_ProjectUserAccessAdminSection =
			new ProjectPage_ProjectUserAccessAdminSection( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked } );
		
		this._projectPage_PublicAccessSection_ProjectOwnerInteraction =
			new ProjectPage_PublicAccessSection_ProjectOwnerInteraction( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked } );
		
		this._projectPage_UploadData = new ProjectPage_UploadData( { 
			projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked 
		} );
		
		//  Comment out Experiment Code
		 this._projectPage_ExperimentsSection_LoggedInUsersInteraction.initialize({ projectPage_ExperimentsSection_AllUsersInteraction : this._projectPage_ExperimentsSection_AllUsersInteraction });

		this._projectPage_SearchesSection_LoggedInUsersInteraction.initialize({ projectPage_SearchesSection_AllUsersInteraction : this._projectPage_SearchesSection_AllUsersInteraction });
		this._projectPage_SearchesAdmin.initialize({ projectPage_SearchesSection_AllUsersInteraction : this._projectPage_SearchesSection_AllUsersInteraction });

		this._projectPage_SavedViews_Section_LoggedInUsersInteraction.initialize({ projectPage_SavedViews_Section_AllUsersInteraction : this._projectPage_SavedViews_Section_AllUsersInteraction });

		this._projectPage_ProjectSection_AllUsersInteraction.initialize();
		
		//  Comment out Experiment Code
		 this._projectPage_ExperimentsSection_AllUsersInteraction.initialize();
		
		this._projectPage_SearchesSection_AllUsersInteraction.initialize();
		this._projectPage_SavedViews_Section_AllUsersInteraction.initialize();

		this._projectPage_ProjectSection_ProjectOwnerInteraction.initialize();
		this._projectPage_ProjectSection_LoggedInUsersInteraction.initialize({ projectPage_ProjectSection_AllUsersInteraction : this._projectPage_ProjectSection_AllUsersInteraction });
		
		window.setTimeout(() => {
			//  Run in setTimeout to catch Errors
			this._projectPage_ProjectUserAccessAdminSection.initialize();
		}, 10 );

		this._projectPage_PublicAccessSection_ProjectOwnerInteraction.initialize();
		this._projectPage_UploadData.initialize();
		
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
	let projectViewPage_Root_ProjectOwnerUser = new ProjectViewPage_Root_ProjectOwnerUser();

	try {
		projectViewPage_Root_ProjectOwnerUser.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});



