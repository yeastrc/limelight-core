/**
 * modViewPage_RootClass_Common.ts
 * 
 * Common Root Javascript for modView.jsp page  
 * 
 * 
 * TODO !!!!!  When Single Project Search Id: Handle "Default URL" as set by User that overrides specified values.
 * 
 * Either:
 * 		detect that coming from another page and use a web service to get Default URL
 * 		place default URL on page and redirect to it if coming from another page
 */

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import {catchAndReportGlobalOnError} from 'page_js/catchAndReportGlobalOnError';

import {reportWebErrorToServer} from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {_REFERRER_PATH_STRING} from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import {Page_UserDefault_processing} from 'page_js/data_pages/data_pages_common/page_UserDefault_processing';

import { GetSearchDataLookupParametersFromPage, GetSearchDataLookupParametersFromPage_Result } from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage';
import {SearchDetailsBlockDataMgmtProcessing} from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import {LoadCoreData_ProjectSearchIds_Based} from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based';

import {navigation_dataPages_Maint_Instance} from 'page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint';

import {CentralPageStateManager} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import {SharePage_dataPages} from 'page_js/data_pages/data_pages_common/sharePage_dataPages';


//  From main_pages

//  Import for typing only
import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import { SaveView_dataPages } from 'page_js/data_pages/data_pages_common/saveView_dataPages';

import {MainPagesPopulateHeader} from 'page_js/main_pages/mainPagesPopulateHeader';
//  From local dir
import {ModViewPage_DisplayDataOnPage} from './modViewPage_DisplayDataOnPage';
import {SetDefaultView_dataPages} from "page_js/data_pages/data_pages_common/setDefaultView_dataPages";

//  From data_pages_common

/**
 * 
 */
export class ModViewPage_RootClass_Common {
	
	_dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;
	_saveView_dataPages : SaveView_dataPages; //  Comes from _dataPages_LoggedInUser_CommonObjectsFactory
	private _setDefaultView_dataPages : SetDefaultView_dataPages; //  Comes from _dataPages_LoggedInUser_CommonObjectsFactory

	_page_UserDefault_processing : Page_UserDefault_processing;
	_centralPageStateManager : CentralPageStateManager;

	_dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	_dataPageStateManager_DataFrom_Server : DataPageStateManager;

	_searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	_modViewPage_DisplayDataOnPage : ModViewPage_DisplayDataOnPage;

	_getSearchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage;
	_sharePage_dataPages : SharePage_dataPages;

	_loadCoreData_ProjectSearchIds_Based : LoadCoreData_ProjectSearchIds_Based;

	/**
	 * 
	 */
	constructor({ dataPages_LoggedInUser_CommonObjectsFactory } : { dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory }) {

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		if ( this._dataPages_LoggedInUser_CommonObjectsFactory ) {
			this._saveView_dataPages = this._dataPages_LoggedInUser_CommonObjectsFactory.instantiate_SaveView_dataPages();
			this._setDefaultView_dataPages = this._dataPages_LoggedInUser_CommonObjectsFactory.instantiate_SetDefaultView_dataPages();
		}

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
		
		this._sharePage_dataPages = new SharePage_dataPages();
	}
	

	/**
	 * 
	 */
	initialize() {
		
		let objectThis = this;
		
		catchAndReportGlobalOnError.init();

		this._page_UserDefault_processing.page_UserDefault_processing();

		let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
		let referrerFromURL = initialStateFromURL.referrer;
		
		if ( referrerFromURL === _REFERRER_PATH_STRING ) {
			
			//  TODO  do any needed processing of the URL since it is a referrer from another page
			
			//  Could do default URL processing here.  
			//		IE: Replace the current URL with the default URL and then call again:
			//			let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
		}
		
		//  Clear the referrer flag from URL, if it exists
		this._centralPageStateManager.clearReferrerFlagFromURL();
		
		
		////Instance of class
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		mainPagesPopulateHeader.initialize();
		
		const searchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage_Result = 
			this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();
		
		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
			searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
			dataPageStateManager : undefined
		} ); 
		
		const projectSearchIds : Array<number> = searchDataLookupParametersFromPage.projectSearchIds;
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );

		let isSingleSearch = false
		let isMultipleSearches = false
		if ( projectSearchIds.length > 1 ) {
			isMultipleSearches = true
		} else {
			isSingleSearch = true
		}

		navigation_dataPages_Maint_Instance.initializePageOnLoad({ isManageNavigationOnPage : true, navigationChange_Callback : undefined, isSingleSearch, isMultipleSearches, isExperimentPage : false }); // Initialize


		if ( this._saveView_dataPages ) {
			this._saveView_dataPages.initialize({ projectSearchIds, container_DOM_Element : undefined, experimentId : undefined });
		}
		if ( isSingleSearch && this._setDefaultView_dataPages ) {
			const projectSearchId = projectSearchIds[ 0 ]
			this._setDefaultView_dataPages.initialize({ projectSearchId, container_DOM_Element : undefined, experimentId : undefined });
		}
		
		this._sharePage_dataPages.initialize({ projectSearchIds, container_DOM_Element : undefined });
				
		this._loadCoreData_ProjectSearchIds_Based = new LoadCoreData_ProjectSearchIds_Based( {
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
		});
		
		let _loadCoreData_ProjectSearchIds_Based_Promise = this._loadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds();

		_loadCoreData_ProjectSearchIds_Based_Promise.then(  // onFulfilled
				function( value ) {
					try {
						//  Continue processing
						objectThis._createFilterData_In_dataPageStateManager_ForInitialLoad ({});
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
		}, function(reason) { // onRejected
			
		})
	}


	/**
	 * If the filtering data does not exist in dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
	 *   create it and put in dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay 
	 *   and parts in dataPageStateManager_For_UserFilterSelectionsBefore_Update_Clicked as required
	 *   
	 * This is handling when the page is initially loaded and the data needs to be loaded from the URL
	 */
	_createFilterData_In_dataPageStateManager_ForInitialLoad( params ) {

		//  pageState excludes project search id (or other similar things) filters and ann type display 
		
//		let pageStateIdentifier = params.pageStateIdentifier;
//		let pageState = params.pageState;
//
//		if ( pageState ) {
//
//			// TODO Not handling yet;
//			//  Before using filters, first check for default URL and use if present
//			//  Process URL linking from another page separately, and replace URL on browser after map to URL for current page
////			alert("Not handling _filterDataFromURL_OnPageLoad.filters has value yet");
////			throw Error( "Not handling _filterDataFromURL_OnPageLoad.filters has value yet" );
//
//		} else {
//
//			//  No Filters so initialize page using defaults (Check for user defaults for page)
//
////			this.initializeFilterCriteriaDataDisplayFromDefaults(); 
//		}
//
//		if ( pageState ) {
//			this._userSelection_q_OnURL_Update.replaceUserSelectionFromURL( pageState );
//		}

		//  Have all data in page variables to render the page


		this._modViewPage_DisplayDataOnPage = new ModViewPage_DisplayDataOnPage( {

			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager : this._centralPageStateManager
		});

		this._modViewPage_DisplayDataOnPage.populateSearchDetailsAndOtherFiltersBlock();
		
		this._modViewPage_DisplayDataOnPage.populateModDataBlock();
	}
	


}
