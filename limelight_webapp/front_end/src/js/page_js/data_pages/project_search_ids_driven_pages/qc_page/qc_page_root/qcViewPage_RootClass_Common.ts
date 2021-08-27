/**
 * qcViewPage_RootClass_Common.ts
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

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { _REFERRER_PATH_STRING } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { Page_UserDefault_processing }  from 'page_js/data_pages/data_pages_common/page_UserDefault_processing';

import { GetSearchDataLookupParametersFromPage, GetSearchDataLookupParametersFromPage_Result }  from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { LoadCoreData_ProjectSearchIds_Based } from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

//  From main_pages
import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import {page_Update_From_search_data_lookup_parameters_lookup_code__computed} from "page_js/data_pages/data_pages_common/page_Update_From_search_data_lookup_parameters_lookup_code__computed";
import {QcViewPage_DisplayData_ProteinList__Main_Component_Props_Prop} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData_ProteinList__Main_Component";
import {
	QcViewPage_DisplayData_ProteinList__Root_Component,
	QcViewPage_DisplayData_ProteinList__Root_Component_Props
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData_ProteinList__Root_Component";


/**
 * 
 */
export class QcViewPage_RootClass_Common {

	//  Copied from constructor parameter
	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;

	//  Created or set in this class

	private _page_UserDefault_processing : Page_UserDefault_processing;
	private _centralPageStateManager : CentralPageStateManager;

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

	private _getSearchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage;

	private _loadCoreData_ProjectSearchIds_Based : LoadCoreData_ProjectSearchIds_Based;

	/**
	 * 
	 */
	constructor({ dataPages_LoggedInUser_CommonObjectsFactory } : { dataPages_LoggedInUser_CommonObjectsFactory? : DataPages_LoggedInUser_CommonObjectsFactory }) {

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		this._page_UserDefault_processing = new Page_UserDefault_processing();

		this._centralPageStateManager = new CentralPageStateManager();

		//  Instances of class DataPageStateManager
		
		/**
		 * Project Search Ids, their filters and Annotation Type Ids to display that user entered.  The values used for filters for displaying data and how to display the data
		 */
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

		/**
		 * Store data from server
		 */
		this._dataPageStateManager_DataFrom_Server = new DataPageStateManager();
		

		this._searchDetailsBlockDataMgmtProcessing = new SearchDetailsBlockDataMgmtProcessing({
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
		});

		this._getSearchDataLookupParametersFromPage = new GetSearchDataLookupParametersFromPage();
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

		page_Update_From_search_data_lookup_parameters_lookup_code__computed();

		this._page_UserDefault_processing.page_UserDefault_processing();
		
		let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();

		let referrerFromURL_Set = false;

		{
			let referrerFromURL = initialStateFromURL.referrer;

			if (referrerFromURL === _REFERRER_PATH_STRING) {

				//  TODO  do any needed processing of the URL since it is a referrer from another page

				referrerFromURL_Set = true;

				//  Could do default URL processing here.
				//		IE: Replace the current URL with the default URL and then call again:
				//			let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
			}
		}

		//  Clear the referrer flag from URL, if it exists
		this._centralPageStateManager.clearReferrerFlagFromURL();

		////Instance of class
		{
			const mainPagesPopulateHeader = new MainPagesPopulateHeader();
			mainPagesPopulateHeader.initialize();
		}

		const searchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage_Result = 
			this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();

		const projectSearchIds : Array<number> = searchDataLookupParametersFromPage.projectSearchIds;

		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
			searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
			dataPageStateManager : undefined
		} ); 

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );

		let isSingleSearch = false
		let isMultipleSearches = false
		if ( projectSearchIds.length > 1 ) {
			isMultipleSearches = true
		} else {
			isSingleSearch = true
		}

		navigation_dataPages_Maint_Instance.initializePageOnLoad({ isManageNavigationOnPage : true, navigationChange_Callback : undefined, isSingleSearch, isMultipleSearches, isExperimentPage : false }); // Initialize


		this._loadCoreData_ProjectSearchIds_Based =
			new LoadCoreData_ProjectSearchIds_Based( {
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
			});
		
		let loadCoreData_ProjectSearchIds_Based_Promise = this._loadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds();

		loadCoreData_ProjectSearchIds_Based_Promise.catch( (reason) => { 
			throw Error(reason)
		} );

		loadCoreData_ProjectSearchIds_Based_Promise.then( ( value ) => {
			try {
				//  Continue processing
				this._createFilterData_In_dataPageStateManager_ForInitialLoad ();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * If the filtering data does not exist in dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
	 *   create it and put in dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay 
	 *   and parts in dataPageStateManager_For_UserFilterSelectionsBefore_Update_Clicked as required
	 *   
	 * This is handling when the page is initially loaded and the data needs to be loaded from the URL
	 */
	private _createFilterData_In_dataPageStateManager_ForInitialLoad() {

		//  Have all data in page variables to render the page

		const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();


		const propsValue : QcViewPage_DisplayData_ProteinList__Main_Component_Props_Prop = {
			projectSearchIds : projectSearchIds,
			dataPageStateManager : this._dataPageStateManager_DataFrom_Server,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,

			centralPageStateManager: this._centralPageStateManager,

			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory
		}

		const props : QcViewPage_DisplayData_ProteinList__Root_Component_Props = {
			propsValue
		}

		const component = (
			React.createElement(
				QcViewPage_DisplayData_ProteinList__Root_Component,
				props,
				null
			)
		);

		//  Render to page:

		const containerDOMElement = document.getElementById("main_qc_view_outer_block_react_root_container");

		if ( ! containerDOMElement ) {
			throw Error("No DOM element with id 'main_qc_view_outer_block_react_root_container'");
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
			const main_qc_view_loading_data_root_containerDOM = document.getElementById("main_qc_view_loading_data_root_container");
			if ( ! main_qc_view_loading_data_root_containerDOM ) {
				throw Error("No DOM element with ID: 'main_qc_view_loading_data_root_container'");
			}
			main_qc_view_loading_data_root_containerDOM.style.display = "none";
		}
	}
}

