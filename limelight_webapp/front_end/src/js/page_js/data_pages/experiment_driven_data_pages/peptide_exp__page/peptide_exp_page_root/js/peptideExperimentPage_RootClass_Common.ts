/**
 * peptideExperimentPage_RootClass_Common.ts
 * 
 * Common Root Javascript for peptide_Experiment.jsp page  
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

import React from 'react';
import ReactDOM from 'react-dom';



/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager';

//  From data_pages_common

import { _PATH_SEPARATOR, _EXPERIMENT_ID_IDENTIFIER, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { Page_UserDefault_processing }  from 'page_js/data_pages/data_pages_common/page_UserDefault_processing';

import { GetExerimentMainDataFromPage } from 'page_js/data_pages/experiment_data_pages_common/getExerimentMainDataFromPage';

import { GetSearchDataLookupParametersFromPage }  from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage';

import { LoadCoreData_ProjectSearchIds_Based } from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based';

// import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_dataPages_Maint';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

//  From experiment_data_pages_common

import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';
import { create_experimentConditions_GraphicRepresentation_PropsData, ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';


//  From main_pages
import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

import { Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass } from '../../../../experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass';

//  Import for typing only
import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';

/**
 * 
 */
export class PeptideExperimentPage_RootClass_Common {

	private _experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory;

	private _page_UserDefault_processing : Page_UserDefault_processing;
	private _centralPageStateManager : CentralPageStateManager;
	private _experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _getExerimentMainDataFromPage : GetExerimentMainDataFromPage;
	private _getSearchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage;
	private _loadCoreData_ProjectSearchIds_Based : LoadCoreData_ProjectSearchIds_Based;
	// private _peptideExperimentPage_Display : PeptideExperimentPage_Display;

	/**
	 * @param experiment_DataPages_LoggedInUser_CommonObjectsFactory - Optional
	 */
	constructor(
		{ experiment_DataPages_LoggedInUser_CommonObjectsFactory } : 
		{ experiment_DataPages_LoggedInUser_CommonObjectsFactory? : Experiment_DataPages_LoggedInUser_CommonObjectsFactory }
	) {

		this._experiment_DataPages_LoggedInUser_CommonObjectsFactory = experiment_DataPages_LoggedInUser_CommonObjectsFactory;

		this._page_UserDefault_processing = new Page_UserDefault_processing();

		this._centralPageStateManager = new CentralPageStateManager();

		this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = new Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({
			centralPageStateManager : this._centralPageStateManager
		})

		//  Instances of class DataPageStateManager
		
		/**
		 * Project Search Ids, their filters and Annotation Type Ids to display that user entered.  The values used for filters for displaying data and how to display the data
		 */
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

		/**
		 * Store data from server
		 */
		this._dataPageStateManager_DataFrom_Server = new DataPageStateManager();
		
		this._getExerimentMainDataFromPage = new GetExerimentMainDataFromPage();

		this._getSearchDataLookupParametersFromPage = new GetSearchDataLookupParametersFromPage();

		// this._sharePage_dataPages = new SharePage_dataPages();
	}
	

	/**
	 * 
	 */
	initialize() {

		catchAndReportGlobalOnError.init();

		/////////////////////////

		this._page_UserDefault_processing.page_UserDefault_processing();
		
		let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();

		this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.initialize();

		let referrerFromURL = initialStateFromURL.referrer;
		
		if ( referrerFromURL === _REFERRER_PATH_STRING ) {
			
			//  TODO  do any needed processing of the URL since it is a referrer from another page
			
			//  Could do default URL processing here.  
			//		IE: Replace the current URL with the default URL and then call again:
			//			let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
		}
		
		// //  Clear the referrer flag from URL, if it exists
		this._centralPageStateManager.clearReferrerFlagFromURL();
		
		// let testPageComponent = new TestPageComponent( { centralPageStateManager : this._centralPageStateManager } );
		// testPageComponent.initialize();
		
		// testPageComponent.setValue( { key : 'b', value : 'rtw' } );


		{
			const mainPagesPopulateHeader = new MainPagesPopulateHeader();
			mainPagesPopulateHeader.initialize();
		}

		const searchDataLookupParametersFromPage = this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();
		const searchDataLookupParamsRoot : SearchDataLookupParameters_Root = searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load;

		const exerimentMainDataFromPage = this._getExerimentMainDataFromPage.getExerimentMainDataFromPage({ searchDataLookupParamsRoot });

		const experimentId : number = exerimentMainDataFromPage.experimentId;
		// const experiment_id_string : string = exerimentMainDataFromPage.experiment_id_string;
		const experimentName : string = exerimentMainDataFromPage.experiment_name;
		const projectSearchIds : Array<number> = exerimentMainDataFromPage.experiment_project_search_ids_at_page_load;
		
		const conditionGroupsContainer : Experiment_ConditionGroupsContainer = exerimentMainDataFromPage.experiment_ConditionGroupsContainer;
		const conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer = exerimentMainDataFromPage.conditionGroupsDataContainer;

        const experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData = ( 
            create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer, conditionGroupsDataContainer }) //  Call External Function
		);
		
		////  !!!   Not using existing Search Details Block
		
		// this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
		// 	searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load } ); 


		//  !!!!!!!!  Getting the projectSearchIds from the experiment
		
		// let projectSearchIds = searchDataLookupParametersFromPage.projectSearchIds;
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );


		// this._peptideExperimentPage_DisplayDataOnPage.initialize({ projectSearchIds });
		
		// navigation_dataPages_Maint_Instance.initializePageOnLoad({ projectSearchIds }); // Initialize

		//  loadCoreData_ProjectSearchIds_Based - Loads Annotation Type data, Per Program data, search names, etc.   Annotation Type data is needed for displaying data.
		
		this._loadCoreData_ProjectSearchIds_Based =
			new LoadCoreData_ProjectSearchIds_Based( {
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
			});
		
		const _loadCoreData_ProjectSearchIds_Based_Promise = this._loadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds();

		_loadCoreData_ProjectSearchIds_Based_Promise.catch( (reason) => {});

		_loadCoreData_ProjectSearchIds_Based_Promise.then( ( value ) => {
			try {
				//  Continue processing
						
				// this._peptideExperimentPage_Display = new PeptideExperimentPage_Display({
				// 	dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
				// 	experiment_DataPages_LoggedInUser_CommonObjectsFactory : this._experiment_DataPages_LoggedInUser_CommonObjectsFactory,
				// 	experimentId,
				// 	experimentName,
				// 	projectSearchIds,
				// 	searchDataLookupParamsRoot,
				// 	conditionGroupsContainer,
				// 	conditionGroupsDataContainer,
				// 	experimentConditions_GraphicRepresentation_PropsData,
				// 	// centralPageStateManager : this._centralPageStateManager,
				// 	experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
				// 	peptideGrouping_CentralStateManagerObjectClass : this._peptideGrouping_CentralStateManagerObjectClass,
				// 	singlePeptide_ExpPage_CentralStateManagerObjectClass : this._singlePeptide_ExpPage_CentralStateManagerObjectClass
				// });
				//
				// this._peptideExperimentPage_Display.initialize();

			} catch( e ) {
				console.warn("_loadCoreData_ProjectSearchIds_Based_Promise.then: exception: " + e );
				console.warn( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

	}


}
