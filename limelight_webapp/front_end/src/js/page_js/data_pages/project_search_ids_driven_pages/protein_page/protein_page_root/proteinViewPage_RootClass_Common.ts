/**
 * proteinViewPage_RootClass_Common.ts
 * 
 * Common Root Javascript for proteinView.jsp page  
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

 // import { Handlebars, _dummy_template_template_bundle } from './proteinViewPage_RootClass_Common_ImportHandlebarsTemplates.js';

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError.js';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants.js';

import { Page_UserDefault_processing }  from 'page_js/data_pages/data_pages_common/page_UserDefault_processing.js';

import { GetSearchDataLookupParametersFromPage, GetSearchDataLookupParametersFromPage_Result }  from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/data_pages_common/searchDetailsBlockDataMgmtProcessing';
import { LoadCoreData_ProjectSearchIds_Based } from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_dataPages_Maint.js';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager.js';

import { SharePage_dataPages } from 'page_js/data_pages/data_pages_common/sharePage_dataPages';

import { SingleProtein_CentralStateManagerObjectClass }	from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass.js';

import { ProteinList_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinList_CentralStateManagerObjectClass.js';


//  From main_pages
import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader.js';

//  Import for typing only
import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import { SaveView_dataPages } from 'page_js/data_pages/data_pages_common/saveView_dataPages';

//  From local dir
import { ProteinViewPage_DisplayDataOnPage }  from './proteinViewPage_DisplayDataOnPage';
	
//  From Testing
	
// import { TestPageComponent } from 'page_js/z_test_code/testPageComponent.js';
	
/**
 * 
 */
export class ProteinViewPage_RootClass_Common {

	//  Copied from constructor parameter
	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;

	//  Comes from this._dataPages_LoggedInUser_CommonObjectsFactory  : DataPages_LoggedInUser_CommonObjectsFactory
	private _saveView_dataPages : SaveView_dataPages; 

	//  Created or set in this class

	private _page_UserDefault_processing : Page_UserDefault_processing;
	private _centralPageStateManager : CentralPageStateManager;
	private _singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass;
	private _proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass;

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _proteinViewPage_DisplayDataOnPage : ProteinViewPage_DisplayDataOnPage;

	private _getSearchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage;
	private _sharePage_dataPages : SharePage_dataPages;

	private _loadCoreData_ProjectSearchIds_Based : LoadCoreData_ProjectSearchIds_Based;

	/**
	 * 
	 */
	constructor({ dataPages_LoggedInUser_CommonObjectsFactory } : { dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory }) {

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		if ( this._dataPages_LoggedInUser_CommonObjectsFactory ) {
			this._saveView_dataPages = this._dataPages_LoggedInUser_CommonObjectsFactory.instantiate_SaveView_dataPages();
		}

		this._page_UserDefault_processing = new Page_UserDefault_processing();

		this._centralPageStateManager = new CentralPageStateManager();

		this._singleProtein_CentralStateManagerObject = new SingleProtein_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager, initialProteinSequenceVersionId : undefined } );
		this._proteinList_CentralStateManagerObjectClass = new ProteinList_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager, initialProteinSequenceVersionId : undefined } );

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
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
		});

		this._proteinViewPage_DisplayDataOnPage = new ProteinViewPage_DisplayDataOnPage( {
			
			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager : this._centralPageStateManager,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,
			proteinList_CentralStateManagerObjectClass : this._proteinList_CentralStateManagerObjectClass
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

		this._singleProtein_CentralStateManagerObject.initialize();
		this._proteinList_CentralStateManagerObjectClass.initialize();
		
		let referrerFromURL = initialStateFromURL.referrer;
		
		if ( referrerFromURL === _REFERRER_PATH_STRING ) {
			
			//  TODO  do any needed processing of the URL since it is a referrer from another page
			
			//  Could do default URL processing here.  
			//		IE: Replace the current URL with the default URL and then call again:
			//			let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
		}
		
		//  Clear the referrer flag from URL, if it exists
		this._centralPageStateManager.clearReferrerFlagFromURL();
		
//		let testPageComponent = new TestPageComponent( { centralPageStateManager : this._centralPageStateManager } );
//		testPageComponent.initialize();
//		
//		testPageComponent.setValue( { key : 'b', value : 'rtw' } );


		////Instance of class
		{
			const mainPagesPopulateHeader = new MainPagesPopulateHeader();
			mainPagesPopulateHeader.initialize();
		}

		const searchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage_Result = 
			this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();
		
		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
			searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
			dataPageStateManager : undefined
		} ); 
		
		const projectSearchIds : Array<number> = searchDataLookupParametersFromPage.projectSearchIds;
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );


		this._proteinViewPage_DisplayDataOnPage.initialize({ projectSearchIds });
		
		navigation_dataPages_Maint_Instance.initializePageOnLoad({ projectSearchIds }); // Initialize


		if ( this._saveView_dataPages ) {
			this._saveView_dataPages.initialize({ projectSearchIds, container_DOM_Element : undefined, enableSetDefault : undefined });
		}

		this._sharePage_dataPages.initialize({ projectSearchIds, container_DOM_Element : undefined });

		
		this._loadCoreData_ProjectSearchIds_Based =
			new LoadCoreData_ProjectSearchIds_Based( {
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
			});
		
		let _loadCoreData_ProjectSearchIds_Based_Promise =
			this._loadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds();

		_loadCoreData_ProjectSearchIds_Based_Promise.then(  // onFulfilled
				function( value ) {
					try {
						//  Continue processing
						objectThis._createFilterData_In_dataPageStateManager_ForInitialLoad ();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				}, function(reason) { // onRejected

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

		this._proteinViewPage_DisplayDataOnPage.populateSearchDetailsBlock();
		
		this._proteinViewPage_DisplayDataOnPage.populateProteinListBlock();

	}
	
}
