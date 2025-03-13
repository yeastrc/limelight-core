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
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import {limelight__catchAndReportGlobalOnError} from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';

import {reportWebErrorToServer} from 'page_js/common_all_pages/reportWebErrorToServer';

//   From data_pages_common
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {_REFERRER_PATH_STRING} from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import {Page_UserDefault_processing} from 'page_js/data_pages/data_pages_common/page_UserDefault_processing';

import { GetSearchDataLookupParametersFromPage, GetSearchDataLookupParametersFromPage_Result } from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage';
import {SearchDetailsBlockDataMgmtProcessing} from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import {LoadCoreData_ProjectSearchIds_Based} from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based';

import {navigation_dataPages_Maint_Instance} from 'page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint';

import {CentralPageStateManager} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

//  From main_pages

//  Import for typing only
import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import {MainPagesPopulateHeader} from 'page_js/main_pages/mainPagesPopulateHeader';
//  From local dir
import {ModViewPage_DisplayDataOnPage} from './modViewPage_DisplayDataOnPage';
import {get_SingletonInstance__Protein_SingleProtein_Embed_in_ModPage_Root} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__mod_page_embed_single_protein/js/protein_SingleProtein_Embed_in_ModPage_Root";
import {page_Update_From_search_data_lookup_parameters_lookup_code__computed} from "page_js/data_pages/data_pages_common/page_Update_From_search_data_lookup_parameters_lookup_code__computed";
import {Navigation_dataPages_Maint__NavigationType_Enum} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint_Component";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
	CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId___ROOT";
import {
	CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT
} from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT";
import {
	CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";

//  From data_pages_common



/**
 * 
 */
export class ModViewPage_RootClass_Common {
	
	_dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;

	_page_UserDefault_processing : Page_UserDefault_processing;
	_centralPageStateManager : CentralPageStateManager;

	_dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	_dataPageStateManager_DataFrom_Server : DataPageStateManager;

	_searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

	_modViewPage_DisplayDataOnPage : ModViewPage_DisplayDataOnPage;

	private _called__populateModDataBlock: boolean = false;

	_getSearchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage;

	_loadCoreData_ProjectSearchIds_Based : LoadCoreData_ProjectSearchIds_Based;

	//  Main Data Loader object
	private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
	private _commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT
	private _commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT


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
	initialize() { try {

		let objectThis = this;
		
		limelight__catchAndReportGlobalOnError.init();

		window.onpopstate = function(event) {
			//  User clicked the back button so reload so page reflects that URL
			limelight__ReloadPage_Function()
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
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		mainPagesPopulateHeader.initialize();
		
		const searchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage_Result = 
			this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();
		
		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
			searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
			dataPageStateManager : undefined
		} ); 
		
		const projectSearchIds : Array<number> = searchDataLookupParametersFromPage.projectSearchIds;

		this._dataPageStateManager_DataFrom_Server.set_projectSearchIds( projectSearchIds );
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );

		let navigationType = Navigation_dataPages_Maint__NavigationType_Enum.SINGLE_SEARCH
		if ( projectSearchIds.length > 1 ) {
			navigationType = Navigation_dataPages_Maint__NavigationType_Enum.MULTIPLE_SEARCHES
		}
		navigation_dataPages_Maint_Instance.initializePageOnLoad({ navigationType }); // Initialize

		this._loadCoreData_ProjectSearchIds_Based = new LoadCoreData_ProjectSearchIds_Based( {
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
		});
		
		let _loadCoreData_ProjectSearchIds_Based_Promise = this._loadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds();

		_loadCoreData_ProjectSearchIds_Based_Promise.then(  // onFulfilled
				function( value ) {
					try {
						//  Continue processing
						objectThis._createFilterData_In_dataPageStateManager_ForInitialLoad ({ referrerFromURL_Set });
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
		}, function(reason) { // onRejected
			
		})
	} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


	/**
	 * If the filtering data does not exist in dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
	 *   create it and put in dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay 
	 *   and parts in dataPageStateManager_For_UserFilterSelectionsBefore_Update_Clicked as required
	 *   
	 * This is handling when the page is initially loaded and the data needs to be loaded from the URL
	 */
	private async _createFilterData_In_dataPageStateManager_ForInitialLoad({ referrerFromURL_Set } : { referrerFromURL_Set: boolean }) : Promise<void> { // Returned Promise is ignored
		try {
			//  pageState excludes project search id (or other similar things) filters and ann type display

// 			let pageStateIdentifier = params.pageStateIdentifier;
// 			let pageState = params.pageState;
//
// 			if ( pageState ) {
//
// 				// TODO Not handling yet;
// 				//  Before using filters, first check for default URL and use if present
// 				//  Process URL linking from another page separately, and replace URL on browser after map to URL for current page
// //			alert("Not handling _filterDataFromURL_OnPageLoad.filters has value yet");
// //			throw Error( "Not handling _filterDataFromURL_OnPageLoad.filters has value yet" );
//
// 			} else {
//
// 				//  No Filters so initialize page using defaults (Check for user defaults for page)
//
// //			this.initializeFilterCriteriaDataDisplayFromDefaults();
// 			}
//
// 			if ( pageState ) {
// 				this._userSelection_q_OnURL_Update.replaceUserSelectionFromURL( pageState );
// 			}

			const projectSearchIds = this._dataPageStateManager_DataFrom_Server.get_projectSearchIds()

			//  Main Data Loader object

			this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT = CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT.getNewInstance()

			this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT = CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT.getNewInstance()

			this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.getNewInstance({
				projectSearchIds,
				searchDataLookupParameters_Root: this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({dataPageStateManager: undefined}),
				dataPageStateManager: this._dataPageStateManager_DataFrom_Server,
				commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT,
				commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT
			});



			this._modViewPage_DisplayDataOnPage = new ModViewPage_DisplayDataOnPage( {

				dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
				centralPageStateManager : this._centralPageStateManager,
				commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
			});

			await this._modViewPage_DisplayDataOnPage.initialize();

			//  Have all data in page variables to render the page

			const singleProteinCloseCallback = () : void =>  {

				if ( ! this._called__populateModDataBlock ) {

					this._modViewPage_DisplayDataOnPage.populateModDataBlock();

					this._called__populateModDataBlock = true;
				}
			}

			const singleProtein_InitializeResult =
				get_SingletonInstance__Protein_SingleProtein_Embed_in_ModPage_Root().initialize({

					referrerFromURL_Set,

					singleProteinCloseCallback,

					dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
					dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
					dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
					searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
					centralPageStateManager : this._centralPageStateManager,

					projectSearchIds: this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds(),
					searchDataLookupParamsRoot : this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({dataPageStateManager: undefined}),

					commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
					commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT,
					commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT
				});



			this._modViewPage_DisplayDataOnPage.initialUpdates_To_PageStateVariables();

			this._modViewPage_DisplayDataOnPage.populateSearchDetailsAndOtherFilters_And_Save_Set_Buttons_Underneath_Block();

			if ( ! singleProtein_InitializeResult.directlyShowing_SingleProteinOverlay ) {

				this._called__populateModDataBlock = true;

				this._modViewPage_DisplayDataOnPage.populateModDataBlock();
			}
		} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
	}
}

