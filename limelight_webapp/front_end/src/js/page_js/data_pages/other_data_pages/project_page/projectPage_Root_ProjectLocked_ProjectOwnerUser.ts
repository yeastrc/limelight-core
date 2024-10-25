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
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import { limelight__catchAndReportGlobalOnError } from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { initShowHideErrorMessage } from 'page_js/common_all_pages/showHideErrorMessage';

import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';


//  Local Imports

import { ProjectPage_CommonOverall } from './projectPage_CommonOverall';

import { ProjectPage_ProjectSection_ProjectOwnerInteraction } from './project_page_project_section/js/projectPage_ProjectSection_ProjectOwnerInteraction';
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
	ProjectPage_SearchesAdmin
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {
	DataPages_LoggedInUser_CommonObjectsFactory
} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {
	ProjectPage_ProjectSection_AllUsersInclPublic_Interaction
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_AllUsersInclPublic_Interaction";
import {
	getComponent_ProjectPage_Root_ProjectOwnerUser_ProjectLocked_SpecificComponentsForRoot_Component
} from "page_js/data_pages/other_data_pages/project_page/projectPage_Root_ProjectOwnerUser_ProjectLocked_SpecificComponentsForRoot_Component";

/**
 * 
 */
class ProjectViewPage_Root_ProjectLocked_ProjectOwnerUser {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

	private _projectPage_SearchesAdmin : ProjectPage_SearchesAdmin

	private _projectPage_ProjectSection_AllUsersInclPublic_Interaction: ProjectPage_ProjectSection_AllUsersInclPublic_Interaction

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

		limelight__catchAndReportGlobalOnError.init();
		
		initShowHideErrorMessage();

		const projectPage_CommonOverall = new ProjectPage_CommonOverall();
		projectPage_CommonOverall.initialize();

		{
			this._projectPage_ProjectSection_AllUsersInclPublic_Interaction = new ProjectPage_ProjectSection_AllUsersInclPublic_Interaction()
			this._projectPage_ProjectSection_AllUsersInclPublic_Interaction.initialize()
		}

		const userIsProjectOwner = true;
		const projectLocked = true;

		const dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails = new DataPages_LoggedInUser_CommonObjectsFactory();

		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();

		this._projectPage_ProjectSection_ProjectOwnerInteraction =
			new ProjectPage_ProjectSection_ProjectOwnerInteraction( {
				projectIdentifierFromURL : this._projectIdentifierFromURL, projectLocked } );

		this._projectPage_SearchesAdmin = new ProjectPage_SearchesAdmin({ projectIdentifierFromURL : this._projectIdentifierFromURL });

		this._projectPage_SearchesAdmin.initialize();

		this._projectPage_ProjectSection_ProjectOwnerInteraction.initialize();

		////Instance of class
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		
		mainPagesPopulateHeader.initialize();

		addToPage_INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component()

		add_ProjectPage__ProjectSection_AllUser_Root_Component_ToPage({ propsValue: { projectIdentifier: this._projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot: undefined }})


		const getSubComponents__Callback_Function = ( params: ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Params ) => {

			return getComponent_ProjectPage_Root_ProjectOwnerUser_ProjectLocked_SpecificComponentsForRoot_Component({
				projectIdentifier: params.projectIdentifierFromURL,
				projectIsLocked: params.projectIsLocked,
				force_ReloadFromServer_EmptyObjectReference: params.force_ReloadFromServer_EmptyObjectReference,
				force_Rerender_EmptyObjectReference: params.force_Rerender_EmptyObjectReference
			})
		}

		add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component({
			projectIdentifierFromURL : this._projectIdentifierFromURL,
			projectIsLocked: true,
			for_PublicUser: false,
			projectPage_SearchesAdmin: this._projectPage_SearchesAdmin,
			projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: null,
			dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails,
			projectPage_ExperimentsSection_LoggedInUsersInteraction: null,
			projectPage_SavedViews_Section_LoggedInUsersInteraction: null,
			getSubComponents__Callback_Function
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



