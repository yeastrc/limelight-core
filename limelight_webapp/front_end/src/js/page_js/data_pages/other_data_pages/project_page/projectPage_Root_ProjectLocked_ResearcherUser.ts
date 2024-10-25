/**
 * projectPage_Root_ProjectLocked_ResearcherUser.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Root JS file for Researcher Users when the Project is Locked
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

import {
	add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component,
	ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";
import {
	add_ProjectPage__ProjectSection_AllUser_Root_Component_ToPage
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_AllUser_Root_Component";
import {
	addToPage_INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help_Component";
import {
	ProjectPage_ProjectSection_AllUsersInclPublic_Interaction
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_AllUsersInclPublic_Interaction";
import {
	getComponent_ProjectPage_Root_ResearcherUser_ProjectLocked_SpecificComponentsForRoot_Component
} from "page_js/data_pages/other_data_pages/project_page/projectPage_Root_ResearcherUser_ProjectLocked_SpecificComponentsForRoot_Component";


/**
 * 
 */
class ProjectViewPage_Root_ProjectLocked_ResearcherUser {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

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
		const projectLocked = true;
		
		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();

		const getSubComponents__Callback_Function = ( params: ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Params ) => {

			return getComponent_ProjectPage_Root_ResearcherUser_ProjectLocked_SpecificComponentsForRoot_Component({
				projectIdentifier: params.projectIdentifierFromURL,
				projectIsLocked: params.projectIsLocked,
				force_ReloadFromServer_EmptyObjectReference: params.force_ReloadFromServer_EmptyObjectReference,
				force_Rerender_EmptyObjectReference: params.force_Rerender_EmptyObjectReference
			})
		}

		try {
			add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component({
				projectIdentifierFromURL : this._projectIdentifierFromURL,
				projectIsLocked: true,
				for_PublicUser: false,
				projectPage_SearchesAdmin: null,
				projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions : null,
				dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: null,
				projectPage_ExperimentsSection_LoggedInUsersInteraction: null,
				projectPage_SavedViews_Section_LoggedInUsersInteraction: null,
				getSubComponents__Callback_Function
			})

		} catch (e) {

		}

		////Instance of class
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		
		mainPagesPopulateHeader.initialize();

		addToPage_INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component()

		add_ProjectPage__ProjectSection_AllUser_Root_Component_ToPage({ propsValue: { projectIdentifier: this._projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot: undefined }})

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
	let projectViewPage_Root_ProjectLocked_ResearcherUser = new ProjectViewPage_Root_ProjectLocked_ResearcherUser();

	try {
		projectViewPage_Root_ProjectLocked_ResearcherUser.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});



