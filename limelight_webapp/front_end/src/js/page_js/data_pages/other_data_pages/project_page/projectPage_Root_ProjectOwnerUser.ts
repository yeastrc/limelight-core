/**
 * projectPage_Root_ProjectOwnerUser.ts
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

import { ProjectPage_SearchesAdmin } from './project_page_main_page_react_based/js/projectPage_SearchesAdmin';
import { ProjectPage_SavedViews_Section_LoggedInUsersInteraction } from './projectPage_SavedViews_Section_LoggedInUsersInteraction';

import { ProjectPage_ProjectSection_AllUsersInteraction } from './project_page_project_section/js/projectPage_ProjectSection_AllUsersInteraction';

import { ProjectPage_ProjectUserAccessAdminSection } from './project_page_project_section/js/projectPage_ProjectUserAccessAdminSection';
import { ProjectPage_ProjectSection_ProjectOwnerInteraction } from './project_page_project_section/js/projectPage_ProjectSection_ProjectOwnerInteraction';
import { ProjectPage_ProjectSection_LoggedInUsersInteraction } from './project_page_project_section/js/projectPage_ProjectSection_LoggedInUsersInteraction';
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {
	add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component,
	ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";
import {ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions} from "page_js/data_pages/other_data_pages/project_page/project_page__common/projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions";
import { getComponent_ProjectPage_Root_ProjectOwnerUser_SpecificComponentsForRoot_Component } from "page_js/data_pages/other_data_pages/project_page/projectPage_Root_ProjectOwnerUser_SpecificComponentsForRoot_Component";

/**
 * 
 */
class ProjectViewPage_Root_ProjectOwnerUser {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

	private _projectPage_ProjectSection_LoggedInUsersInteraction : ProjectPage_ProjectSection_LoggedInUsersInteraction

	private _projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction

	private _projectPage_SearchesAdmin : ProjectPage_SearchesAdmin
	private _projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction

	private _projectPage_ProjectSection_AllUsersInteraction : ProjectPage_ProjectSection_AllUsersInteraction

	private _projectPage_ProjectSection_ProjectOwnerInteraction : ProjectPage_ProjectSection_ProjectOwnerInteraction

	private _projectPage_ProjectUserAccessAdminSection : ProjectPage_ProjectUserAccessAdminSection

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
		const projectLocked = false;

		const projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions = new ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions()

		const dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails = new DataPages_LoggedInUser_CommonObjectsFactory();

		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();

		this._projectPage_ProjectSection_ProjectOwnerInteraction =
			new ProjectPage_ProjectSection_ProjectOwnerInteraction( {
				projectIdentifierFromURL : this._projectIdentifierFromURL, projectLocked
			} );

		this._projectPage_ProjectSection_LoggedInUsersInteraction = new ProjectPage_ProjectSection_LoggedInUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL, projectLocked : projectLocked });

		this._projectPage_ExperimentsSection_LoggedInUsersInteraction = new ProjectPage_ExperimentsSection_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });
		
		this._projectPage_SearchesAdmin = new ProjectPage_SearchesAdmin({ projectIdentifierFromURL : this._projectIdentifierFromURL });
		this._projectPage_SavedViews_Section_LoggedInUsersInteraction = new ProjectPage_SavedViews_Section_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });

		this._projectPage_ProjectSection_AllUsersInteraction = new ProjectPage_ProjectSection_AllUsersInteraction( { 
			projectIdentifierFromURL : this._projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction : this._projectPage_ProjectSection_LoggedInUsersInteraction,
			projectPage_ProjectSection_ProjectOwnerInteraction : this._projectPage_ProjectSection_ProjectOwnerInteraction
		} );

		this._projectPage_ProjectUserAccessAdminSection =
			new ProjectPage_ProjectUserAccessAdminSection( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked } );

		this._projectPage_SearchesAdmin.initialize();

		this._projectPage_SavedViews_Section_LoggedInUsersInteraction.initialize();

		this._projectPage_ProjectSection_AllUsersInteraction.initialize();

		this._projectPage_ProjectSection_ProjectOwnerInteraction.initialize();
		this._projectPage_ProjectSection_LoggedInUsersInteraction.initialize({ projectPage_ProjectSection_AllUsersInteraction : this._projectPage_ProjectSection_AllUsersInteraction });
		
		window.setTimeout(() => {
			//  Run in setTimeout to catch Errors
			this._projectPage_ProjectUserAccessAdminSection.initialize();
		}, 10 );

		const getSubComponents__Callback_Function = ( params: ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Params ) => {

			return getComponent_ProjectPage_Root_ProjectOwnerUser_SpecificComponentsForRoot_Component({
				projectIdentifier: params.projectIdentifierFromURL,
				projectIsLocked: params.projectIsLocked,
				force_ReloadFromServer_Object: params.force_Rerender
			})
		}

		try {
			add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component({
				projectIdentifierFromURL : this._projectIdentifierFromURL,
				projectIsLocked: false,
				projectPage_SearchesAdmin: this._projectPage_SearchesAdmin,
				projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions,
				dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails,
				projectPage_ExperimentsSection_LoggedInUsersInteraction: this._projectPage_ExperimentsSection_LoggedInUsersInteraction,
				projectPage_SavedViews_Section_LoggedInUsersInteraction: this._projectPage_SavedViews_Section_LoggedInUsersInteraction,
				getSubComponents__Callback_Function
			})
		} catch (e) {

		}

		////  Instance of class
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		
		mainPagesPopulateHeader.initialize();

		this._projectPage_ProjectSection_AllUsersInteraction.getProjectData();


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
	let projectViewPage_Root_ProjectOwnerUser = new ProjectViewPage_Root_ProjectOwnerUser();

	try {
		projectViewPage_Root_ProjectOwnerUser.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});



