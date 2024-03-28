/**
 * projectsListPage.ts
 * 
 * Javascript for projectsList.jsp page  
 * 
 * page variable: listProjectsPage
 * 
 * 
 * 
 */

//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//  module import 

import React from "react";
import ReactDOM from "react-dom";


/**
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import { limelight__catchAndReportGlobalOnError } from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';


import {
	ProjectsListPage_Root_Component, ProjectsListPage_Root_Component_Props
} from "page_js/data_pages/other_data_pages/project_list_page/projectsListPage_Root_Component";

///////////////


try {

	limelight__catchAndReportGlobalOnError.init();

	////Instance of class
	var mainPagesPopulateHeader = new MainPagesPopulateHeader();
	mainPagesPopulateHeader.initialize();

	const props: ProjectsListPage_Root_Component_Props = { propsValue: {} }

	const projectPage_ExperimentsSectionRoot_Component = (
		React.createElement(
			ProjectsListPage_Root_Component,
			props,
			null
		)
	);


	//  Render to page:

	const containerDOMElement = document.getElementById("main_project_list_view_outer_block_react_root_container");

	if ( ! containerDOMElement ) {
		throw Error("No DOM element with id 'main_project_list_view_outer_block_react_root_container'");
	}

	//  Called on render complete
	const renderCompleteCallbackFcn = () => {

	};

	const renderedReactComponent = ReactDOM.render(
		projectPage_ExperimentsSectionRoot_Component,
		containerDOMElement,
		renderCompleteCallbackFcn
	);


} catch( e ) {
	reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
	throw e;
}
