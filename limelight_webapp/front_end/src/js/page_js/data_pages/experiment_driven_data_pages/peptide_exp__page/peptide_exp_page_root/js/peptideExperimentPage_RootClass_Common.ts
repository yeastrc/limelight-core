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
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';

//  From data_pages_common

import { _REFERRER_PATH_STRING } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

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

import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {PeptideExperimentPage_Display_MainContent_Component_Props_Prop} from "page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/jsx/peptideExperimentPage_Display_MainContent_Component";
import {
	PeptideExperimentPage_Display_Root_Component,
	PeptideExperimentPage_Display_Root_Component_Props
} from "page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/jsx/peptideExperimentPage_Display_Root_Component";
import {PeptideExperimentPageRoot_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/js/peptideExperimentPageRoot_CentralStateManagerObjectClass";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {SingleProtein_ExpPage_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/singleProtein_ExpPage_CentralStateManagerObjectClass";
import {navigation_dataPages_Maint_Instance} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";

/**
 * 
 */
export class PeptideExperimentPage_RootClass_Common {

	private _experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory;

	private _page_UserDefault_processing : Page_UserDefault_processing;
	private _centralPageStateManager : CentralPageStateManager;
	private _experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;
	private _singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass;

	private _peptideExperimentPageRoot_CentralStateManagerObjectClass : PeptideExperimentPageRoot_CentralStateManagerObjectClass;
	private _generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject

	private _peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject

	private _modificationMass_UserSelections_StateObject = new ModificationMass_UserSelections_StateObject();

	private _modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass;

	private _reporterIonMass_UserSelections_StateObject = new ReporterIonMass_UserSelections_StateObject();
	private _peptideUnique_UserSelection_StateObject = new PeptideUnique_UserSelection_StateObject();
	private _peptideSequence_UserSelections_StateObject = new PeptideSequence_UserSelections_StateObject();
	private _proteinPositionFilter_UserSelections_StateObject = new ProteinPositionFilter_UserSelections_StateObject();


	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _getExerimentMainDataFromPage : GetExerimentMainDataFromPage;
	private _getSearchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage;
	private _loadCoreData_ProjectSearchIds_Based : LoadCoreData_ProjectSearchIds_Based;

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

		this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.getNewInstance_MainPage({
			centralPageStateManager : this._centralPageStateManager
		});

		this._singleProtein_ExpPage_CentralStateManagerObjectClass = new SingleProtein_ExpPage_CentralStateManagerObjectClass({
			centralPageStateManager : this._centralPageStateManager, initialProteinSequenceVersionId : undefined
		});

		this._peptideExperimentPageRoot_CentralStateManagerObjectClass = new PeptideExperimentPageRoot_CentralStateManagerObjectClass({
			centralPageStateManager : this._centralPageStateManager
		});

		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass =
			ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_MainPage({ centralPageStateManager : this._centralPageStateManager });


		const generatedPeptideContents_UserSelections_StateObject_valueChangedCallback = () : void => {

			const encodedStateData = this._generatedPeptideContents_UserSelections_StateObject.getEncodedStateData();
			this._peptideExperimentPageRoot_CentralStateManagerObjectClass.setGeneratedPeptideContentsSelectedEncodedStateData( { generatedPeptideContentsSelectedEncodedStateData : encodedStateData } );
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

		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize_MainPageInstance();

		this._singleProtein_ExpPage_CentralStateManagerObjectClass.initialize();

		this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.initialize_MainPageInstance();

		this._peptideExperimentPageRoot_CentralStateManagerObjectClass.initialize();
		{
			const encodedStateData = this._peptideExperimentPageRoot_CentralStateManagerObjectClass.getModsSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._modificationMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{
			const encodedStateData = this._peptideExperimentPageRoot_CentralStateManagerObjectClass.getReporterIonMassesSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._reporterIonMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{
			const encodedStateData = this._peptideExperimentPageRoot_CentralStateManagerObjectClass.getPeptideUniqueFilterSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._peptideUnique_UserSelection_StateObject.set_encodedStateData({ encodedStateData });
			}
		}
		{
			const encodedStateData = this._peptideExperimentPageRoot_CentralStateManagerObjectClass.getPeptideSequenceFilterSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._peptideSequence_UserSelections_StateObject.set_encodedStateData({ encodedStateData });
			}
		}
		{
			const encodedStateData = this._peptideExperimentPageRoot_CentralStateManagerObjectClass.get_proteinPositionFilter_UserSelections_EncodedStateData();
			if ( encodedStateData ) {
				this._proteinPositionFilter_UserSelections_StateObject.set_encodedStateData({ encodedStateData });
			}
		}
		{
			const encodedStateData = this._peptideExperimentPageRoot_CentralStateManagerObjectClass.getGeneratedPeptideContentsSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._generatedPeptideContents_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject

			const valueChangedCallback = () => {

				const peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData = this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.getEncodedStateData();
				this._peptideExperimentPageRoot_CentralStateManagerObjectClass.set_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData( { peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData } );
			}
			this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject = new PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._peptideExperimentPageRoot_CentralStateManagerObjectClass.get_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData();
			if ( encodedStateData ) {
				this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}


		let referrerFromURL = initialStateFromURL.referrer;
		
		if ( referrerFromURL === _REFERRER_PATH_STRING ) {
			
			//  TODO  do any needed processing of the URL since it is a referrer from another page
			
			//  Could do default URL processing here.  
			//		IE: Replace the current URL with the default URL and then call again:
			//			let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
		}
		
		// //  Clear the referrer flag from URL, if it exists
		this._centralPageStateManager.clearReferrerFlagFromURL();

		navigation_dataPages_Maint_Instance.initializePageOnLoad({
			isManageNavigationOnPage : true, navigationChange_Callback : undefined, isExperimentPage : true, isSingleSearch: false, isMultipleSearches: false
		}); // Initialize

		//  Save centralPageStateManager to URL '/q/...' on page load
		this._centralPageStateManager._updateURL();


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


		let loadCoreData_ProjectSearchIds_Based_Promise =
			this._loadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds();

		loadCoreData_ProjectSearchIds_Based_Promise.catch( (reason) => {
			console.warn( "loadCoreData_ProjectSearchIds_Based_Promise.catch: reason: ", reason )
			throw Error("loadCoreData_ProjectSearchIds_Based_Promise.catch")
		})
		loadCoreData_ProjectSearchIds_Based_Promise.then( ( value ) => {
			try {
				//  Continue processing



				//  For getting search info for projectSearchIds.  Object with property name being project search id
				const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

				// experimentId : number;
				// experimentName : string;
				// conditionGroupsContainer : Experiment_ConditionGroupsContainer;
				// conditionGroupsDataContainer : Experiment_ConditionGroupsContainer;
				// searchNamesMap_KeyProjectSearchId : SearchNames_AsMap; // Map with key being project search id
				// experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData
				// // experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass


				//  Have all data in page variables to render the page

				const propsValue : PeptideExperimentPage_Display_MainContent_Component_Props_Prop = {

					experiment_DataPages_LoggedInUser_CommonObjectsFactory : this._experiment_DataPages_LoggedInUser_CommonObjectsFactory,

					projectSearchIds,
					dataPageStateManager: this._dataPageStateManager_DataFrom_Server,
					dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
					searchDataLookupParamsRoot,

					experimentId,
					experimentName,
					conditionGroupsContainer,
					conditionGroupsDataContainer,
					searchNamesMap_KeyProjectSearchId,
					experimentConditions_GraphicRepresentation_PropsData,
					centralPageStateManager: this._centralPageStateManager,
					experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
					modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

					peptideExperimentPageRoot_CentralStateManagerObjectClass: this._peptideExperimentPageRoot_CentralStateManagerObjectClass,
					singleProtein_ExpPage_CentralStateManagerObjectClass: this._singleProtein_ExpPage_CentralStateManagerObjectClass,
					modificationMass_UserSelections_StateObject: this._modificationMass_UserSelections_StateObject,
					reporterIonMass_UserSelections_StateObject: this._reporterIonMass_UserSelections_StateObject,
					peptideUnique_UserSelection_StateObject: this._peptideUnique_UserSelection_StateObject,
					peptideSequence_UserSelections_StateObject: this._peptideSequence_UserSelections_StateObject,
					proteinPositionFilter_UserSelections_StateObject : this._proteinPositionFilter_UserSelections_StateObject,
					peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,

					generatedPeptideContents_UserSelections_StateObject: this._generatedPeptideContents_UserSelections_StateObject
				}

				const props : PeptideExperimentPage_Display_Root_Component_Props = {
					propsValue
				}

				const projectPage_ExperimentsSectionRoot_Component = (
					React.createElement(
						PeptideExperimentPage_Display_Root_Component,
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

			} catch( e ) {
				console.warn("_loadCoreData_ProjectSearchIds_Based_Promise.then: exception: " + e );
				console.warn( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

	}


}
