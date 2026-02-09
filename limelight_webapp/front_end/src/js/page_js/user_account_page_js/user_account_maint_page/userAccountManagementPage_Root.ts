/**
 * userAccountManagementPage_Root.ts
 * 
 * Javascript for userAccountManagement.jsp page  
 *
 * Currently SKIPPED for upgrade 'ReactDOM.render' call
 */


//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//module import 


///////////////////////////////////////////

/**
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import { limelight__catchAndReportGlobalOnError } from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';


import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/common_all_pages/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import ReactDOM from "react-dom";
import React from "react";
import {
	UserAccountManagementPage_MainPage_Component,
	UserAccountManagementPage_MainPage_Component_Props
} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_MainPage_Component";

/**
 * 
 */
class UserAccountManagementPage {

	private _initializeCalled = false;

	/**
	 * 
	 */
	constructor() {

	}

	/**
	 * initialize the page
	 */
	initialize(  ) {

		initShowHideErrorMessage();
		limelight__catchAndReportGlobalOnError.init();

		{  // remove "LOADING"

			const manage_account_loading_blockDOM = document.getElementById("manage_account_loading_block")
			if ( ! manage_account_loading_blockDOM ) {
				throw Error("No DOM element with id 'manage_account_loading_block'");
			}
			manage_account_loading_blockDOM.remove();
		}

		const containerDOMElement = document.getElementById("manage_account_main_block")
		if ( ! containerDOMElement ) {
			throw Error("No DOM element with id 'manage_account_main_block'");
		}

		const props : UserAccountManagementPage_MainPage_Component_Props = {};

		const component = (
			React.createElement(
				UserAccountManagementPage_MainPage_Component,
				props,
				null
			)
		);


		const renderCompletecallbackFcn = ( ) => { };

		const renderedReactComponent = ReactDOM.render(
			component,
			containerDOMElement,
			renderCompletecallbackFcn
		);

	}
}


///////////////

{

//	Instance of class
	var userAccountManagementPage = new UserAccountManagementPage();

	try {
		userAccountManagementPage.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

}
