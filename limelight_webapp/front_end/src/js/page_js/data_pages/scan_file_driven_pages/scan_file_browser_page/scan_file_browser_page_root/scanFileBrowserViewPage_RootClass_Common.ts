/**
 * scanFileBrowserViewPage_RootClass_Common.ts
 * 
 * Common Root Javascript for qcView.jsp page
 * 
 * 
 * TODO !!!!!  When Single Project Search Id: Handle "Default URL" as set by User that overrides specified values.
 * 
 * Either:
 * 		detect that coming from another page and use a web service to get Default URL
 * 		place default URL on page and redirect to it if coming from another page
 */


/**
 * Always do in Root Javascript for page:
 */

import React from "react";

import ReactDOM from 'react-dom';

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import {
	_PATH_SEPARATOR,
	_REFERRER_PATH_STRING,
	_REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR
} from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

//  From main_pages
import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import {ScanFileBrowserPage_CentralStateManagerObjectClass} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPage_CentralStateManagerObjectClass";
import {ControllerPath_forCurrentPage_FromDOM} from "page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM";
import {
	ScanFileBrowserViewPage__Root_Component,
	ScanFileBrowserViewPage__Root_Component_Props
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root_and_main_page_components/scanFileBrowserViewPage__Root_Component";
import {ScanFileBrowserViewPage__MainPage_Component_Props_Prop} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root_and_main_page_components/scanFileBrowserViewPage__MainPage_Component";


/**
 * 
 */
export class ScanFileBrowserViewPage_RootClass_Common {

	private _centralPageStateManager : CentralPageStateManager;


	///  Page Root Page State

	private _scanFileBrowserPage_CentralStateManagerObjectClass : ScanFileBrowserPage_CentralStateManagerObjectClass;

	/**
	 *
	 */
	constructor({ dataPages_LoggedInUser_CommonObjectsFactory } : { dataPages_LoggedInUser_CommonObjectsFactory? : DataPages_LoggedInUser_CommonObjectsFactory }) {

		this._centralPageStateManager = new CentralPageStateManager();

		this._scanFileBrowserPage_CentralStateManagerObjectClass = new ScanFileBrowserPage_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager } );
	}

	/**
	 *
	 */
	initialize() {

		catchAndReportGlobalOnError.init();

		window.onpopstate = function(event) {
			//  User clicked the back button so reload so page reflects that URL
			window.location.reload(true);
		};

		// this._page_UserDefault_processing.page_UserDefault_processing();

		// let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
		//
		// let referrerFromURL = initialStateFromURL.referrer;
		//
		// if ( referrerFromURL === _REFERRER_PATH_STRING ) {
		//
		// 	//  TODO  do any needed processing of the URL since it is a referrer from another page
		//
		// 	//  Could do default URL processing here.
		// 	//		IE: Replace the current URL with the default URL and then call again:
		// 	//			let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
		// }
		//
		// //  Clear the referrer flag from URL, if it exists
		// this._centralPageStateManager.clearReferrerFlagFromURL();


		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		mainPagesPopulateHeader.initialize();

		this._scanFileBrowserPage_CentralStateManagerObjectClass.initialize();

		//  "Root" Page State objects all initialized


		const pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();


		//  Get URL after pageControllerPath

		let windowPath = window.location.pathname;

		if ( windowPath.endsWith( "/" ) ) {
			//  Remove trailing "/"
			windowPath = windowPath.substring( 0, windowPath.length - 1 );
		}

		const pageControllerPath_Index = windowPath.indexOf( pageControllerPath );
		if ( pageControllerPath_Index === -1 ) {
			throw Error( "Page controller path not found in window path.  windowPath: " + windowPath );
		}
		const index_AfterPageController = pageControllerPath_Index + pageControllerPath.length;

		const windowPath_After_pageControllerPath = windowPath.substring( index_AfterPageController );

		if ( ! windowPath_After_pageControllerPath.startsWith( "c/" ) ) {
			throw Error("Missing 'c/' after Page controller path")
		}

		const windowPath_After_pageControllerPath__After_c_slash = windowPath_After_pageControllerPath.substring( 2 );

		const windowPath_After_pageControllerPathSplitSlash = windowPath_After_pageControllerPath__After_c_slash.split( _PATH_SEPARATOR );

		//  These next 2 checks should not fail since the server side will return 404 for any value but 'r'

		//  If length is 2, then 2nd value must be _REFERRER_PATH_STRING (r)
		if ( windowPath_After_pageControllerPathSplitSlash.length === 2 ) {
			if ( windowPath_After_pageControllerPathSplitSlash[ 1 ] !== _REFERRER_PATH_STRING ) {

				//  TODO  Present user an error message with link to take them back to project

				throw Error( "URI Path for Project search id based URL after controller path contains 2 elements when split on '" +
					_PATH_SEPARATOR + "' and 2nd element is not '" + _REFERRER_PATH_STRING + "'." +
					"  windowPath_After_pageControllerPath to split: " + windowPath_After_pageControllerPath );
			}
		}

		this.clearReferrerFlagFromURL();

		const mainParametersCodeString = windowPath_After_pageControllerPathSplitSlash[ 0 ];

		this._main_Render({ mainParametersCodeString });
	}

	/**
	 *
	 */
	clearReferrerFlagFromURL() {

		let windowPath = window.location.pathname;

		if ( windowPath.endsWith( _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR ) ) {

			const newURLlength = windowPath.length - _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR.length

			let newURL = windowPath.substring( 0, newURLlength );

			window.history.replaceState( null, null, newURL );
		}
	}


	/**
	 *
	 *
	 */
	private _main_Render(
		{
			mainParametersCodeString
		} : {
			mainParametersCodeString : string
		}) : void {

		if ( ! mainParametersCodeString.startsWith( "a" ) ) {
			throw Error("mainParametersCodeString NOT start with 'a'. The start 'a' is the version")
		}

		let projectScanFileId: number

		const scanFileCode_firstSix = mainParametersCodeString.substring(1, 7);  // skip first character and then take 6

		{
			const rest = mainParametersCodeString.substring(7);

			const projectScanFileIdString = rest;

			projectScanFileId = Number.parseInt(projectScanFileIdString, 35)

			if ( Number.isNaN( projectScanFileId ) ) {
				throw Error("Failed to parse projectScanFileIdString: " + projectScanFileIdString );
			}
		}

		const propsValue: ScanFileBrowserViewPage__MainPage_Component_Props_Prop = {

			projectScanFileId
		}

		const props : ScanFileBrowserViewPage__Root_Component_Props = {
			propsValue
		}

		const component = (
			React.createElement(
				ScanFileBrowserViewPage__Root_Component,
				props,
				null
			)
		);

		//  Render to page:

		const containerDOMElement = document.getElementById("main_view_outer_block_react_root_container");

		if ( ! containerDOMElement ) {
			throw Error("No DOM element with id 'main_view_outer_block_react_root_container'");
		}

		//  Called on render complete
		const renderCompleteCallbackFcn = () => {

		};

		const renderedReactComponent = ReactDOM.render(
			component,
			containerDOMElement,
			renderCompleteCallbackFcn
		);

		{  //  Hide LOADING DATA message
			const main_view_loading_data_root_containerDOM = document.getElementById("main_view_loading_data_root_container");
			if ( ! main_view_loading_data_root_containerDOM ) {
				throw Error("No DOM element with ID: 'main_view_loading_data_root_container'");
			}
			main_view_loading_data_root_containerDOM.style.display = "none";
		}
	}
}

