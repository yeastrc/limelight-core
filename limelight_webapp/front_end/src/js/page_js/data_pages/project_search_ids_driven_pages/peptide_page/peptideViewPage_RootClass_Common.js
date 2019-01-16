/**
 * peptideViewPage_RootClass_Common.js
 * 
  * Common Root Javascript for peptideView.jsp page  
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

/**
 * Require Handlebars and dummy_template_template-bundle.js so that Handlebars is properly initialized for other uses of it
 */
var Handlebars = require('handlebars/runtime');
var _dummy_template_template_bundle = 
	require("../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );
Handlebars.templates = _dummy_template_template_bundle;


/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError.js';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

//   From data_pages_common
import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

//  From data_pages_common

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants.js';

import { Page_UserDefault_processing }  from 'page_js/data_pages/data_pages_common/page_UserDefault_processing.js';

import { GetSearchDataLookupParametersFromPage }  from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage.js';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/data_pages_common/searchDetailsBlockDataMgmtProcessing.js';
import { LoadCoreData_ProjectSearchIds_Based } from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based.js';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_dataPages_Maint.js';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager.js';

//  From main_pages
import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader.js';

//  From local dir
import { PeptideViewPage_DisplayDataOnPage }  
	from 'page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_DisplayDataOnPage.js';

//  From Testing
	
// import { TestPageComponent } from 'page_js/z_test_code/testPageComponent.js';

// import { Peptide_Fake_CentralStateManagerObjectClass } from './peptide_Fake_CentralStateManagerObjectClass.js';
	
/**
 * 
 */
export class PeptideViewPage_RootClass_Common {
	
	/**
	 * 
	 */
	constructor( params ) {

		if ( params ) {
			this._dataPages_LoggedInUser_CommonObjectsFactory = params.dataPages_LoggedInUser_CommonObjectsFactory;
		}

		if ( this._dataPages_LoggedInUser_CommonObjectsFactory ) {
			this._saveView_dataPages = this._dataPages_LoggedInUser_CommonObjectsFactory.instantiate_SaveView_dataPages();
		}

		this._page_UserDefault_processing = new Page_UserDefault_processing();

		this._centralPageStateManager = new CentralPageStateManager();

		// this._peptide_Fake_CentralStateManagerObjectClass = new Peptide_Fake_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager } );

		//  Instances of class DataPageStateManager
		
		/**
		 * Project Search Ids, their filters and Annotation Type Ids to display that user entered.  The values used for filters for displaying data and how to display the data
		 */
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

		/**
		 * Other User Selections that impact display.
		 */
		this._dataPageStateManager_OtherUserSelections = new DataPageStateManager();

		/**
		 * Store data from server
		 */
		this._dataPageStateManager_DataFrom_Server = new DataPageStateManager();
		

		this._searchDetailsBlockDataMgmtProcessing = new SearchDetailsBlockDataMgmtProcessing({
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
		});

		this._peptideViewPage_DisplayDataOnPage = new PeptideViewPage_DisplayDataOnPage( {
			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_OtherUserSelections : this._dataPageStateManager_OtherUserSelections,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing
		});

		this._getSearchDataLookupParametersFromPage = new GetSearchDataLookupParametersFromPage();
		
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
		
		// let testPageComponent = new TestPageComponent( { centralPageStateManager : this._centralPageStateManager, initialKey : 'd', initialValue : 'mmm' } );
		// testPageComponent.initialize();

		// const urlWithTestPageComponent = this._centralPageStateManager.getURL_ForCurrentState();
		
		// testPageComponent.setValue( { key : 'b', value : 'rtw' } );

		// this._centralPageStateManager.unregister( testPageComponent.getUniqueId() );



		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		mainPagesPopulateHeader.initialize();
		
		this._peptideViewPage_DisplayDataOnPage.initialize();
		
		//  From JSON placed on the page by the Server side Page Controller 
		let searchDataLookupParametersFromPage = 
			this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();
		
		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
			searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load } ); 
		
		let projectSearchIds = searchDataLookupParametersFromPage.projectSearchIds;
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.setPageState( 
				dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM, projectSearchIds );


		navigation_dataPages_Maint_Instance.initializePageOnLoad({ projectSearchIds }); // Initialize


		if ( this._saveView_dataPages ) {
			this._saveView_dataPages.initialize({ projectSearchIds });
		}
		
						
		this._loadCoreData_ProjectSearchIds_Based =
			new LoadCoreData_ProjectSearchIds_Based( {
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
			});
		
		let loadCoreData_ProjectSearchIds_Based_Promise =
			this._loadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds();

		loadCoreData_ProjectSearchIds_Based_Promise.then(  // onFulfilled
				function( value ) {
					//  Continue processing
					objectThis._createFilterData_In_dataPageStateManager_ForInitialLoad ({});
				}, function(reason) { // onRejected

				});
		
		
				//  TODO  FAKE
		// this._peptide_Fake_CentralStateManagerObjectClass.setFakeData({ fakeData : 8888 });

	}


	/**
	 * If the filtering data does not exist in dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
	 *   create it and put in dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay 
	 *   and parts in dataPageStateManager_For_UserFilterSelectionsBefore_Update_Clicked as required
	 *   
	 * This is handling when the page is initially loaded and the data needs to be loaded from the URL
	 */
	_createFilterData_In_dataPageStateManager_ForInitialLoad( params ) {

		//  Have all data in page variables to render the page

		this._peptideViewPage_DisplayDataOnPage.populateSearchDetailsBlock();
		
		this._peptideViewPage_DisplayDataOnPage.populatePeptideListBlock();

	};
	


	/**
	 * If the filtering data does not exist in dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
	 *   create it and put in dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay 
	 *   and parts in dataPageStateManager_For_UserFilterSelectionsBefore_Update_Clicked as required
	 *   
	 * This is handling when the page is initially loaded and the data needs to be loaded from the URL
	 */
	_createFilterData_In_dataPageStateManager_ForInitialLoad( params ) {

		this._peptideViewPage_DisplayDataOnPage.populateSearchDetailsBlock();
		
		this._peptideViewPage_DisplayDataOnPage.populatePeptideListBlock();

	};
	

}

