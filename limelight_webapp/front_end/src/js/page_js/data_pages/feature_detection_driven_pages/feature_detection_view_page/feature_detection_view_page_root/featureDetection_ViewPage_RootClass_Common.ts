/**
 * featureDetection_ViewPage_RootClass_Common.ts
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
import { FeatureDetection_View_CentralStateManagerObjectClass } from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root/featureDetection_View_CentralStateManagerObjectClass";
import { FeatureDetection_ViewPage__MainPage_Component_Props_Prop } from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__MainPage_Component";
import {
	FeatureDetection_ViewPage__Root_Component,
	FeatureDetection_ViewPage__Root_Component_Props
} from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__Root_Component";
import {
	GetSearchDataLookupParametersFromPage,
	GetSearchDataLookupParametersFromPage_Result
} from "page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { LoadCoreData_ProjectSearchIds_Based } from "page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based";
import { SearchDetailsBlockDataMgmtProcessing } from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
	PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";
import {
	FeatureDetection_ViewPage_RootTableSelection_StateObject
} from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root/featureDetection_ViewPage_RootTableSelection_StateObject";

/**
 *
 */
export class FeatureDetection_ViewPage_RootClass_Common {

	private _centralPageStateManager : CentralPageStateManager;


	///  Page Root Page State

	private _featureDetection_View_CentralStateManagerObjectClass : FeatureDetection_View_CentralStateManagerObjectClass;

	private _featureDetection_ViewPage_RootTableSelection_StateObject: FeatureDetection_ViewPage_RootTableSelection_StateObject

	/**
	 *
	 */
	constructor({ dataPages_LoggedInUser_CommonObjectsFactory } : { dataPages_LoggedInUser_CommonObjectsFactory? : DataPages_LoggedInUser_CommonObjectsFactory }) {

		this._centralPageStateManager = new CentralPageStateManager();

		this._featureDetection_View_CentralStateManagerObjectClass = new FeatureDetection_View_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager } );
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

		let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();

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

		this._featureDetection_View_CentralStateManagerObjectClass.initialize();

		{ // this._featureDetection_ViewPage_RootTableSelection_StateObject

			const valueChangedCallback = () => {

				const featureDetection_ViewPage_RootTableSelection_EncodedStateData = this._featureDetection_ViewPage_RootTableSelection_StateObject.getEncodedStateData();
				this._featureDetection_View_CentralStateManagerObjectClass.set_featureDetection_ViewPage_RootTableSelection_EncodedStateData( { featureDetection_ViewPage_RootTableSelection_EncodedStateData } );
			}
			this._featureDetection_ViewPage_RootTableSelection_StateObject = new FeatureDetection_ViewPage_RootTableSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._featureDetection_View_CentralStateManagerObjectClass.get_featureDetection_ViewPage_RootTableSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._featureDetection_ViewPage_RootTableSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

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
	private async _main_Render(
		{
			mainParametersCodeString
		} : {
			mainParametersCodeString : string
		}) : Promise<void> {

		if ( ! mainParametersCodeString.startsWith( "a" ) ) {
			throw Error("mainParametersCodeString NOT start with 'a'. The start 'a' is the version")
		}

		let feature_detection_root__project_scnfl_mapping_tbl_id: number
		let project_scan_file_id: number

		const scanFileCode_firstSix = mainParametersCodeString.substring(1, 7);  // skip first character and then take 6

		//   OLD
		// {
		// 	const rest = mainParametersCodeString.substring(7);
		//
		// 	const feature_detection_root__project_scnfl_mapping_tbl_IdString = rest;
		//
        //     feature_detection_root__project_scnfl_mapping_tbl_Id = Number.parseInt(feature_detection_root__project_scnfl_mapping_tbl_IdString, 35)
		//
		// 	if ( Number.isNaN( feature_detection_root__project_scnfl_mapping_tbl_Id ) ) {
		// 		throw Error("Failed to parse feature_detection_root__project_scnfl_mapping_tbl_IdString: " + feature_detection_root__project_scnfl_mapping_tbl_IdString );
		// 	}
		// }
		{
			const feature_detection_root__project_scnfl_mapping_tbl_idDOM = document.getElementById("feature_detection_root__project_scnfl_mapping_tbl_id")
			if ( ! feature_detection_root__project_scnfl_mapping_tbl_idDOM ) {
				const msg = "NO DOM element with id 'feature_detection_root__project_scnfl_mapping_tbl_id'"
				console.warn(msg)
				throw Error(msg)
			}

			const feature_detection_root__project_scnfl_mapping_tbl_IdString = feature_detection_root__project_scnfl_mapping_tbl_idDOM.innerText

			feature_detection_root__project_scnfl_mapping_tbl_id = Number.parseInt(feature_detection_root__project_scnfl_mapping_tbl_IdString)

			if ( Number.isNaN( feature_detection_root__project_scnfl_mapping_tbl_id ) ) {
				throw Error("Failed to parse value in DOM element with id 'feature_detection_root__project_scnfl_mapping_tbl_id': " + feature_detection_root__project_scnfl_mapping_tbl_IdString );
			}
		}
		{
			const project_scan_file_idDOM = document.getElementById("project_scan_file_id")
			if ( ! project_scan_file_idDOM ) {
				const msg = "NO DOM element with id 'project_scan_file_id'"
				console.warn(msg)
				throw Error(msg)
			}

			const project_scan_file_idString = project_scan_file_idDOM.innerText

			project_scan_file_id = Number.parseInt(project_scan_file_idString)

			if ( Number.isNaN( project_scan_file_id ) ) {
				throw Error("Failed to parse value in DOM element with id 'project_scan_file_id': " + project_scan_file_idString );
			}
		}


		const getSearchDataLookupParametersFromPage = new GetSearchDataLookupParametersFromPage();

		//  From JSON placed on the page by the Server side Page Controller
		const searchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage_Result =
			getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage({ returnNull_IF_NoDataOnPage: true });


		/**
		 * Store data from server
		 */
		let dataPageStateManager_DataFrom_Server: DataPageStateManager

		/**
		 * Project Search Ids, their filters and Annotation Type Ids to display that user entered.  The values used for filters for displaying data and how to display the data
		 */
		let dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager

		let searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing

		if ( searchDataLookupParametersFromPage ) {

			/**
			 * Store data from server
			 */
			dataPageStateManager_DataFrom_Server = new DataPageStateManager();

			/**
			 * Project Search Ids, their filters and Annotation Type Ids to display that user entered.  The values used for filters for displaying data and how to display the data
			 */
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( searchDataLookupParametersFromPage.projectSearchIds );

			dataPageStateManager_DataFrom_Server.set_projectSearchIds( searchDataLookupParametersFromPage.projectSearchIds );

			const loadCoreData_ProjectSearchIds_Based =
				new LoadCoreData_ProjectSearchIds_Based( {
					dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
					dataPageStateManager_DataFrom_Server
				} );

			await loadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds();

			searchDetailsBlockDataMgmtProcessing = new SearchDetailsBlockDataMgmtProcessing({
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
			});

			searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
				searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
				dataPageStateManager : undefined
			} );

		}

		const propsValue: FeatureDetection_ViewPage__MainPage_Component_Props_Prop = {

			featureDetectionId_Encoded: mainParametersCodeString,
            feature_detection_root__project_scnfl_mapping_tbl_id, project_scan_file_id,
			searchDataLookupParametersFromPage,
			dataPageStateManager_DataFrom_Server,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			searchDetailsBlockDataMgmtProcessing,
			featureDetection_ViewPage_RootTableSelection_StateObject: this._featureDetection_ViewPage_RootTableSelection_StateObject
		}

		const props : FeatureDetection_ViewPage__Root_Component_Props = {
			propsValue
		}

		const component = (
			React.createElement(
				FeatureDetection_ViewPage__Root_Component,
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

