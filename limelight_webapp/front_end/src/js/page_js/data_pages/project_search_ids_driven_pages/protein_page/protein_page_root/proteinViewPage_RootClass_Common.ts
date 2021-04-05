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

import ReactDOM from 'react-dom';

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { Page_UserDefault_processing }  from 'page_js/data_pages/data_pages_common/page_UserDefault_processing';

import { GetSearchDataLookupParametersFromPage, GetSearchDataLookupParametersFromPage_Result }  from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { LoadCoreData_ProjectSearchIds_Based } from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { SingleProtein_CentralStateManagerObjectClass }	from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass';

import { ProteinList_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinList_CentralStateManagerObjectClass';
import { ProteinGrouping_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';

//  From main_pages
import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

//  Import for typing only
import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

//  From local dir
import { ProteinViewPage_DisplayDataOnPage }  from './proteinViewPage_DisplayDataOnPage';
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {getSharePage_MainPage_Component} from "page_js/data_pages/sharePage_React/sharePage_Component_React";
import {
	Get_SetDefaultView_Component_React_Type,
	SetDefaultView_Component_React_Params
} from "page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate";
import {
	SaveView_Create_Component_React_Result,
	SaveView_Create_Component_React_Type, SaveView_Get_Component_React_Type
} from "page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {page_Update_From_search_data_lookup_parameters_lookup_code__computed} from "page_js/data_pages/data_pages_common/page_Update_From_search_data_lookup_parameters_lookup_code__computed";

/**
 * 
 */
export class ProteinViewPage_RootClass_Common {

	//  Copied from constructor parameter
	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;

	//  Created or set in this class

	private _page_UserDefault_processing : Page_UserDefault_processing;
	private _centralPageStateManager : CentralPageStateManager;
	private _searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass;
	private _modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
	private _singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass;
	private _proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass;
	private _proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass;
	private _generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _proteinViewPage_DisplayDataOnPage : ProteinViewPage_DisplayDataOnPage;

	private _getSearchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage;

	private _loadCoreData_ProjectSearchIds_Based : LoadCoreData_ProjectSearchIds_Based;

	/**
	 * 
	 */
	constructor({ dataPages_LoggedInUser_CommonObjectsFactory } : { dataPages_LoggedInUser_CommonObjectsFactory? : DataPages_LoggedInUser_CommonObjectsFactory }) {

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		this._page_UserDefault_processing = new Page_UserDefault_processing();

		this._centralPageStateManager = new CentralPageStateManager();

		this._searchSubGroup_CentralStateManagerObjectClass = new SearchSubGroup_CentralStateManagerObjectClass({ centralPageStateManager : this._centralPageStateManager });
		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass =
			new ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass({ centralPageStateManager: this._centralPageStateManager });

		this._singleProtein_CentralStateManagerObject = new SingleProtein_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager, initialProteinSequenceVersionId : undefined } );
		this._proteinList_CentralStateManagerObjectClass = new ProteinList_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager } );
		this._proteinGrouping_CentralStateManagerObjectClass = new ProteinGrouping_CentralStateManagerObjectClass({ centralPageStateManager : this._centralPageStateManager, proteinList_CentralStateManagerObjectClass : this._proteinList_CentralStateManagerObjectClass });

		const generatedPeptideContents_UserSelections_StateObject_valueChangedCallback = () : void => {

			const encodedStateData = this._generatedPeptideContents_UserSelections_StateObject.getEncodedStateData();
			this._proteinList_CentralStateManagerObjectClass.setGeneratedPeptideContentsSelectedEncodedStateData( { generatedPeptideContentsSelectedEncodedStateData : encodedStateData } );
		}
		this._generatedPeptideContents_UserSelections_StateObject = new GeneratedPeptideContents_UserSelections_StateObject({ valueChangedCallback : generatedPeptideContents_UserSelections_StateObject_valueChangedCallback });


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

		this._proteinViewPage_DisplayDataOnPage = new ProteinViewPage_DisplayDataOnPage( {
			
			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager : this._centralPageStateManager,
			searchSubGroup_CentralStateManagerObjectClass : this._searchSubGroup_CentralStateManagerObjectClass,
			modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,
			proteinList_CentralStateManagerObjectClass : this._proteinList_CentralStateManagerObjectClass,
			proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass,
			generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject
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

		this._singleProtein_CentralStateManagerObject.initialize();
		this._proteinList_CentralStateManagerObjectClass.initialize();
		this._proteinGrouping_CentralStateManagerObjectClass.initialize();
		{
			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.getGeneratedPeptideContentsSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._generatedPeptideContents_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		
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
		{
			const mainPagesPopulateHeader = new MainPagesPopulateHeader();
			mainPagesPopulateHeader.initialize();
		}

		const searchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage_Result = 
			this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();

		const projectSearchIds : Array<number> = searchDataLookupParametersFromPage.projectSearchIds;

		this._searchSubGroup_CentralStateManagerObjectClass.initialize({ current_ProjectSearchIds : projectSearchIds });
		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize();

		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
			searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
			dataPageStateManager : undefined
		} ); 

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );

		this._proteinViewPage_DisplayDataOnPage.initialize({ projectSearchIds });

		let isSingleSearch = false
		let isMultipleSearches = false
		if ( projectSearchIds.length > 1 ) {
			isMultipleSearches = true
		} else {
			isSingleSearch = true
		}

		navigation_dataPages_Maint_Instance.initializePageOnLoad({ isManageNavigationOnPage : true, navigationChange_Callback : undefined, isSingleSearch, isMultipleSearches, isExperimentPage : false }); // Initialize


		if ( this._dataPages_LoggedInUser_CommonObjectsFactory ) {

			const save_view_root_containerDOM = document.getElementById("save_view_root_container");
			if ( ! save_view_root_containerDOM ) {
				throw Error("No DOM element with id 'save_view_root_container'")
			}

			const getSaveView_Component : SaveView_Get_Component_React_Type = this._dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_getSaveView_Component();

			const saveView_Component = getSaveView_Component({ projectSearchIds });

			ReactDOM.render(
				saveView_Component,
				save_view_root_containerDOM
			);
		}

		if ( isSingleSearch && this._dataPages_LoggedInUser_CommonObjectsFactory ) {

			const get_SetDefaultView_Component_React : Get_SetDefaultView_Component_React_Type = this._dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SetDefaultView_Component_React();

			const projectSearchId = projectSearchIds[ 0 ];

			const set_default_view_root_containerDOM = document.getElementById("set_default_view_root_container");
			if ( ! set_default_view_root_containerDOM ) {
				throw Error("No DOM element with id 'set_default_view_root_container'")
			}
			const params = new SetDefaultView_Component_React_Params({ projectSearchId })
			const setDefaultView_Component_React = get_SetDefaultView_Component_React(params);

			ReactDOM.render(
				setDefaultView_Component_React,
				set_default_view_root_containerDOM
			);
		}

		{
			//  Put "Share Page" button component on page

			const share_page_root_containerDOM = document.getElementById("share_page_root_container");
			if ( ! share_page_root_containerDOM ) {
				throw Error("No DOM element with id 'share_page_root_container'")
			}

			const sharePage_MainPage_Component = getSharePage_MainPage_Component({ projectSearchIds });

			ReactDOM.render(
				sharePage_MainPage_Component,
				share_page_root_containerDOM
			);
		}

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

		this._proteinViewPage_DisplayDataOnPage.populateSearchDetailsAndOtherFiltersBlock();

		this._proteinViewPage_DisplayDataOnPage.populateProteinListBlock();
	}
}

