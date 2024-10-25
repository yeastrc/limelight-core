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
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import { limelight__catchAndReportGlobalOnError } from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { initShowHideErrorMessage } from 'page_js/common_all_pages/showHideErrorMessage';

import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';


//  Local Imports

import { ProjectPage_CommonOverall } from './projectPage_CommonOverall';

import { ProjectPage_ExperimentsSection_LoggedInUsersInteraction } from './project_page_experiments_section/projPg_Expermnts_LoggedInUsersInteraction';

import { ProjectPage_SavedViews_Section_LoggedInUsersInteraction } from './projectPage_SavedViews_Section_LoggedInUsersInteraction';

import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {
	add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component,
	ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";
import { getComponent_ProjectPage_Root_ResearcherUser_SpecificComponentsForRoot_Component } from "page_js/data_pages/other_data_pages/project_page/projectPage_Root_ResearcherUser_SpecificComponentsForRoot_Component";
import {
	add_ProjectPage__ProjectSection_AllUser_Root_Component_ToPage
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_AllUser_Root_Component";
import {
	ProjectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot";
import {
	addToPage_INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help_Component";
import {
	ProjectPage_ProjectSection_AllUsersInclPublic_Interaction
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_AllUsersInclPublic_Interaction";



/**
 * 
 */
class ProjectViewPage_Root_ResearcherUser {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

	private _projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction

	private _projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction

	private _projectPage_ProjectSection_AllUsersInclPublic_Interaction: ProjectPage_ProjectSection_AllUsersInclPublic_Interaction

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

		limelight__catchAndReportGlobalOnError.init();
		
		initShowHideErrorMessage();

		{
			this._projectPage_ProjectSection_AllUsersInclPublic_Interaction = new ProjectPage_ProjectSection_AllUsersInclPublic_Interaction()
			this._projectPage_ProjectSection_AllUsersInclPublic_Interaction.initialize()
		}

		const projectPage_CommonOverall = new ProjectPage_CommonOverall();
		projectPage_CommonOverall.initialize();
		
		const userIsProjectOwner = false;
		const projectLocked = false;

		const dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails = new DataPages_LoggedInUser_CommonObjectsFactory();
		
		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();

		{
			const isResearcherUser = document.getElementById("project_page_user_level_researcher_found__just_above_bundle");

			if ( isResearcherUser ) {

				//  Researcher Level user so populate (NOT Viewer Level user AKA Read Only user)

				this._projectPage_ExperimentsSection_LoggedInUsersInteraction = new ProjectPage_ExperimentsSection_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });
			}
		}

		this._projectPage_SavedViews_Section_LoggedInUsersInteraction = new ProjectPage_SavedViews_Section_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });

		this._projectPage_SavedViews_Section_LoggedInUsersInteraction.initialize();

		const getSubComponents__Callback_Function = ( params: ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Params ) => {

			return getComponent_ProjectPage_Root_ResearcherUser_SpecificComponentsForRoot_Component({
				projectIdentifier: params.projectIdentifierFromURL,
				projectIsLocked: params.projectIsLocked,
				force_ReloadFromServer_EmptyObjectReference: params.force_ReloadFromServer_EmptyObjectReference,
				force_Rerender_EmptyObjectReference: params.force_Rerender_EmptyObjectReference
			})
		}

		try {
			add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component({
				projectIdentifierFromURL : this._projectIdentifierFromURL,
				projectIsLocked: projectLocked,
				for_PublicUser: false,
				projectPage_SearchesAdmin: null,
				projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: null,
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

		addToPage_INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component()

		const projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot = new ProjectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot()

		add_ProjectPage__ProjectSection_AllUser_Root_Component_ToPage({ propsValue: { projectIdentifier: this._projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot }})

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



