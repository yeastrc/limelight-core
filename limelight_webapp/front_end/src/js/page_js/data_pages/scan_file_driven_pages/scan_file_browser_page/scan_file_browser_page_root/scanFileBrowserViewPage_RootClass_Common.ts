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
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import { limelight__catchAndReportGlobalOnError } from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';

import {
	_PATH_SEPARATOR,
	_REFERRER_PATH_STRING,
	_REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR
} from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

//  From main_pages
import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import {ControllerPath_forCurrentPage_FromDOM} from "page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM";
import {
	ScanFileBrowserViewPage__Root_Component,
	ScanFileBrowserViewPage__Root_Component_Props
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root_and_main_page_components/scanFileBrowserViewPage__Root_Component";
import {ScanFileBrowserViewPage__MainPage_Component_Props_Prop} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root_and_main_page_components/scanFileBrowserViewPage__MainPage_Component";
import { ScanFileBrowserPageRoot_CentralStateManagerObjectClass } from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPageRoot_CentralStateManagerObjectClass";
import {
	ScanFileBrowserPage_SingleScan_UserSelections_StateObject,
	ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPage_SingleScan_UserSelections_StateObject";
import { ParseURL_Into_PageStateParts } from "page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";


/**
 * 
 */
export class ScanFileBrowserViewPage_RootClass_Common {

	private _centralPageStateManager : CentralPageStateManager;


	///  Page Root Page State

	private _scanFileBrowserPageRoot_CentralStateManagerObjectClass : ScanFileBrowserPageRoot_CentralStateManagerObjectClass;

	private _scanFileBrowserPage_SingleScan_UserSelections_StateObject: ScanFileBrowserPage_SingleScan_UserSelections_StateObject

	/**
	 *
	 */
	constructor({ dataPages_LoggedInUser_CommonObjectsFactory } : { dataPages_LoggedInUser_CommonObjectsFactory? : DataPages_LoggedInUser_CommonObjectsFactory }) {

		this._centralPageStateManager = new CentralPageStateManager();

		this._scanFileBrowserPageRoot_CentralStateManagerObjectClass = new ScanFileBrowserPageRoot_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager } );
	}

	/**
	 *
	 */
	initialize() {

		limelight__catchAndReportGlobalOnError.init();

		window.onpopstate = function(event) {
			//  User clicked the back button so reload so page reflects that URL
			limelight__ReloadPage_Function()
		};

		// this._page_UserDefault_processing.page_UserDefault_processing();

		const initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();

		let pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag = false

		{
			const referrerFromURL_Contents = initialStateFromURL.referrer;

			pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag = true

			if ( referrerFromURL_Contents === _REFERRER_PATH_STRING ) {

				//  TODO  do any needed processing of the URL since it is a referrer from another page

				//  Could do default URL processing here.
				//		IE: Replace the current URL with the default URL and then call again:
				//			let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
			}
		}

		//  Clear the referrer flag from URL, if it exists
		this._centralPageStateManager.clearReferrerFlagFromURL();


		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		mainPagesPopulateHeader.initialize();

		////

		this._scanFileBrowserPageRoot_CentralStateManagerObjectClass.initialize();

		{ // this._scanFileBrowserPage_SingleScan_UserSelections_StateObject

			const valueChangedCallback = () => {

				const singleSingleScanData = this._scanFileBrowserPage_SingleScan_UserSelections_StateObject.getEncodedStateData();
				this._scanFileBrowserPageRoot_CentralStateManagerObjectClass.set_SingleScanDataEncodedStateData({ singleSingleScanData })
			}
			this._scanFileBrowserPage_SingleScan_UserSelections_StateObject = new ScanFileBrowserPage_SingleScan_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._scanFileBrowserPageRoot_CentralStateManagerObjectClass.get_SingleScanData_EncodedStateData()
			if ( encodedStateData ) {
				this._scanFileBrowserPage_SingleScan_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		if ( pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag ) {

			//  Page Load from other page

			//  ZoomRange_Selected().tic_Max_ZoomRange ensure is Integer.   Take Math.ceil if populated

			if ( this._scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
				&& this._scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().tic_Max_ZoomRange ) {

				const zoomRange_Selected_Existing = this._scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()

				const tic_Max_ZoomRange_Ceil = Math.ceil( zoomRange_Selected_Existing.tic_Max_ZoomRange )
				if ( ! Number.isNaN( tic_Max_ZoomRange_Ceil ) ) {

					const zoomRange_Selected_New: ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange = {
						tic_Max_ZoomRange: tic_Max_ZoomRange_Ceil,
						mz_Min_ZoomRange: zoomRange_Selected_Existing.mz_Min_ZoomRange,
						mz_Max_ZoomRange: zoomRange_Selected_Existing.mz_Max_ZoomRange
					}

					this._scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected( zoomRange_Selected_New )
				}
			}
		}

		//  Save centralPageStateManager to URL '/q/...' on page load
		this._centralPageStateManager._updateURL();

		//  "Root" Page State objects all initialized

		const parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts()

		const url_Into_PageStateParts = parseURL_Into_PageStateParts.parseURL_Into_PageStateParts()

		const mainParametersCodeString = url_Into_PageStateParts.projectScanFileId_Encoded

		this._main_Render({ mainParametersCodeString, pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag });
	}

	/**
	 *
	 *
	 */
	private _main_Render(
		{
			mainParametersCodeString, pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag
		} : {
			mainParametersCodeString : string
			pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag: boolean
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

			projectScanFileId, pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag,
			scanFileBrowserPage_SingleScan_UserSelections_StateObject: this._scanFileBrowserPage_SingleScan_UserSelections_StateObject
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

		//  Remove div above that has "Loading..."

		{
			try {

				const domElement = document.getElementById("main_block_loading_message_container")
				if ( ! domElement ) {
					console.warn( "failed to find DOM element to remove with id 'main_block_loading_message_container'")
				} else {
					domElement.remove()
				}
			} catch ( e ) {
				console.warn( "Failed to remove DOM element with id 'main_block_loading_message_container'. exception: ", e )
				//  Eat exception
			}
		}
	}
}

