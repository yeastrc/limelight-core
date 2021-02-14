/**
 * peptideViewPage_RootClass_Common.ts
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
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import {DataPageStateManager, SearchNames_AsMap} from 'page_js/data_pages/data_pages_common/dataPageStateManager';

//  From data_pages_common

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { Page_UserDefault_processing }  from 'page_js/data_pages/data_pages_common/page_UserDefault_processing';

import { GetSearchDataLookupParametersFromPage, GetSearchDataLookupParametersFromPage_Result }  from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { LoadCoreData_ProjectSearchIds_Based } from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

//  From main_pages
import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

//  Import for typing only
import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {
	PeptidePage_Display_MainContent_Component_Props_Prop
} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component";
import {PeptidePageRoot_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePageRoot_CentralStateManagerObjectClass";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import React from "react";
import ReactDOM from "react-dom";
import {
	PeptidePage_Display_Root_Component,
	PeptidePage_Display_Root_Component_Props
} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_Root_Component";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";

/**
 * 
 */
export class PeptideViewPage_RootClass_Common {
	
	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;

	private _page_UserDefault_processing : Page_UserDefault_processing;

	private _centralPageStateManager : CentralPageStateManager;

	private _peptidePageRoot_CentralStateManagerObjectClass : PeptidePageRoot_CentralStateManagerObjectClass;

	private _modificationMass_UserSelections_StateObject = new ModificationMass_UserSelections_StateObject();

	private _reporterIonMass_UserSelections_StateObject = new ReporterIonMass_UserSelections_StateObject();

	private _peptideUnique_UserSelection_StateObject = new PeptideUnique_UserSelection_StateObject();

	private _peptideSequence_UserSelections_StateObject = new PeptideSequence_UserSelections_StateObject();
	private _proteinPositionFilter_UserSelections_StateObject = new ProteinPositionFilter_UserSelections_StateObject();

	private _generatedPeptideContents_UserSelections_StateObject = new GeneratedPeptideContents_UserSelections_StateObject();

	private _searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass;

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

		this._peptidePageRoot_CentralStateManagerObjectClass = new PeptidePageRoot_CentralStateManagerObjectClass({ centralPageStateManager : this._centralPageStateManager });
		this._searchSubGroup_CentralStateManagerObjectClass = new SearchSubGroup_CentralStateManagerObjectClass({ centralPageStateManager : this._centralPageStateManager });

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
		

		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		mainPagesPopulateHeader.initialize();

		//  From JSON placed on the page by the Server side Page Controller 
		const searchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage_Result = 
			this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();

		const projectSearchIds : Array<number> = searchDataLookupParametersFromPage.projectSearchIds;

		this._searchSubGroup_CentralStateManagerObjectClass.initialize({ current_ProjectSearchIds : projectSearchIds });

		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
			searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
			dataPageStateManager : undefined
		} ); 

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );


		this._peptidePageRoot_CentralStateManagerObjectClass.initialize();

		{
			const encodedStateData = this._peptidePageRoot_CentralStateManagerObjectClass.getModsSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._modificationMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{
			const encodedStateData = this._peptidePageRoot_CentralStateManagerObjectClass.getReporterIonMassesSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._reporterIonMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{
			const encodedStateData = this._peptidePageRoot_CentralStateManagerObjectClass.getPeptideUniqueFilterSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._peptideUnique_UserSelection_StateObject.set_encodedStateData({ encodedStateData });
			}
		}
		{
			const encodedStateData = this._peptidePageRoot_CentralStateManagerObjectClass.getPeptideSequenceFilterSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._peptideSequence_UserSelections_StateObject.set_encodedStateData({ encodedStateData });
			}
		}
		{
			const encodedStateData = this._peptidePageRoot_CentralStateManagerObjectClass.get_proteinPositionFilter_UserSelections_EncodedStateData();
			if ( encodedStateData ) {
				this._proteinPositionFilter_UserSelections_StateObject.set_encodedStateData({ encodedStateData });
			}
		}
		{
			const encodedStateData = this._peptidePageRoot_CentralStateManagerObjectClass.getGeneratedPeptideContentsSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._generatedPeptideContents_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}


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
		
		let loadCoreData_ProjectSearchIds_Based_Promise =
			this._loadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds();

		loadCoreData_ProjectSearchIds_Based_Promise.catch( (reason) => {
			console.warn( "loadCoreData_ProjectSearchIds_Based_Promise.catch: reason: ", reason )
			throw Error("loadCoreData_ProjectSearchIds_Based_Promise.catch")
		})
		loadCoreData_ProjectSearchIds_Based_Promise.then( ( value ) => {
			try {
				//  Continue processing
				this._createFilterData_In_dataPageStateManager_ForInitialLoad ({ projectSearchIds });
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
	private _createFilterData_In_dataPageStateManager_ForInitialLoad(
		{
			projectSearchIds
		} : {
			projectSearchIds : Array<number>
		}) : void {

		//  Have all data in page variables to render the page

		const propsValue : PeptidePage_Display_MainContent_Component_Props_Prop = {

			projectSearchIds,
			dataPageStateManager: this._dataPageStateManager_DataFrom_Server,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			searchDetailsBlockDataMgmtProcessing: this._searchDetailsBlockDataMgmtProcessing,

			searchSubGroup_CentralStateManagerObjectClass: this._searchSubGroup_CentralStateManagerObjectClass,
			peptidePageRoot_CentralStateManagerObjectClass: this._peptidePageRoot_CentralStateManagerObjectClass,
			modificationMass_UserSelections_StateObject: this._modificationMass_UserSelections_StateObject,
			reporterIonMass_UserSelections_StateObject: this._reporterIonMass_UserSelections_StateObject,
			peptideUnique_UserSelection_StateObject: this._peptideUnique_UserSelection_StateObject,
			peptideSequence_UserSelections_StateObject: this._peptideSequence_UserSelections_StateObject,
			proteinPositionFilter_UserSelections_StateObject : this._proteinPositionFilter_UserSelections_StateObject,

			generatedPeptideContents_UserSelections_StateObject: this._generatedPeptideContents_UserSelections_StateObject,

			dataPages_LoggedInUser_CommonObjectsFactory: this._dataPages_LoggedInUser_CommonObjectsFactory
		}

		const props : PeptidePage_Display_Root_Component_Props = {
			propsValue
		}

		const projectPage_ExperimentsSectionRoot_Component = (
			React.createElement(
				PeptidePage_Display_Root_Component,
				props,
				null
			)
		);

		//  Render to page:

		const containerDOMElement = document.getElementById("main_peptide_view_outer_block_react_root_container");

		if ( ! containerDOMElement ) {
			throw Error("No DOM element with id 'main_peptide_view_outer_block_react_root_container'");
		}

		//  Called on render complete
		const renderCompleteCallbackFcn = () => {

		};

		const renderedReactComponent = ReactDOM.render(
			projectPage_ExperimentsSectionRoot_Component,
			containerDOMElement,
			renderCompleteCallbackFcn
		);

	}

}

