/**
 * proteinExperimentPage_RootClass_Common.ts
 * 
 * Common Root Javascript for protein_Experiment.jsp page  
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
import {DataPageStateManager, SearchNames_AsMap} from 'page_js/data_pages/data_pages_common/dataPageStateManager';

//  From data_pages_common

import { _REFERRER_PATH_STRING } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { Page_UserDefault_processing }  from 'page_js/data_pages/data_pages_common/page_UserDefault_processing';

import { GetExerimentMainDataFromPage } from 'page_js/data_pages/experiment_data_pages_common/getExerimentMainDataFromPage';

import { GetSearchDataLookupParametersFromPage }  from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage';

import { LoadCoreData_ProjectSearchIds_Based } from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';
import { create_experimentConditions_GraphicRepresentation_PropsData, ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';
import {Experiment_DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory";
import {Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass";
import {ProteinList_ExpPage_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinList_ExpPage_CentralStateManagerObjectClass";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";
import {ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/filter_on__components/filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject";
import {MainPagesPopulateHeader} from "page_js/main_pages/mainPagesPopulateHeader";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {ProteinExperimentPage_Display_MainContent_Component_Props_Prop} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/jsx/proteinExperimentPage_Display_MainContent_Component";
import {
	ProteinExperimentPage_Display_Root_Component,
	ProteinExperimentPage_Display_Root_Component_Props
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/jsx/proteinExperimentPage_Display_Root_Component";
import {SingleProtein_ExpPage_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/singleProtein_ExpPage_CentralStateManagerObjectClass";
import {navigation_dataPages_Maint_Instance} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint";
import {ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Navigation_dataPages_Maint__NavigationType_Enum} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint_Component";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";

/**
 * 
 */
export class ProteinExperimentPage_RootClass_Common {

	private _experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory;

	private _page_UserDefault_processing : Page_UserDefault_processing;
	private _centralPageStateManager : CentralPageStateManager;
	private _experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;
	private _singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass;

	private _proteinExperimentPageRoot_CentralStateManagerObjectClass : ProteinList_ExpPage_CentralStateManagerObjectClass;
	private _proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass;
	private _modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
	private _modificationMass_UserSelections_StateObject = new ModificationMass_UserSelections_StateObject();

	private _reporterIonMass_UserSelections_StateObject = new ReporterIonMass_UserSelections_StateObject();
	private _peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
	private _proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
	private _proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
	private _proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject

	private _scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
	private _scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject

	private _psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject

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

		this._proteinExperimentPageRoot_CentralStateManagerObjectClass = new ProteinList_ExpPage_CentralStateManagerObjectClass({
			centralPageStateManager : this._centralPageStateManager
		});
		this._proteinGrouping_CentralStateManagerObjectClass = new ProteinGrouping_CentralStateManagerObjectClass({ centralPageStateManager : this._centralPageStateManager, proteinList_CentralStateManagerObjectClass : undefined });

		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass =
			ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_MainPage({ centralPageStateManager: this._centralPageStateManager });

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

		this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.initialize_MainPageInstance();

		this._proteinExperimentPageRoot_CentralStateManagerObjectClass.initialize();
		{
			const encodedStateData = this._proteinExperimentPageRoot_CentralStateManagerObjectClass.getModsSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._modificationMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{
			const encodedStateData = this._proteinExperimentPageRoot_CentralStateManagerObjectClass.getReporterIonMassesSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._reporterIonMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		this._singleProtein_ExpPage_CentralStateManagerObjectClass.initialize();

		this._proteinGrouping_CentralStateManagerObjectClass.initialize();

		this._proteinExperimentPageRoot_CentralStateManagerObjectClass.initialize();

		{
			const encodedStateData = this._proteinExperimentPageRoot_CentralStateManagerObjectClass.getModsSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._modificationMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{
			const valueChangedCallback = () => {

				const distinctPeptideContents_For_ProteinList_Selection_EncodedStateData = this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getEncodedStateData();
				this._proteinExperimentPageRoot_CentralStateManagerObjectClass.set_distinctPeptideContents_For_ProteinList_Selection_EncodedStateData( { distinctPeptideContents_For_ProteinList_Selection_EncodedStateData } );
			}
			this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject = new ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinExperimentPageRoot_CentralStateManagerObjectClass.get_distinctPeptideContents_For_ProteinList_Selection_EncodedStateData();
			if ( encodedStateData ) {
				this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{ // proteinListColumnsDisplayContents

			const valueChangedCallback = () => {

				const proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData = this._proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.getEncodedStateData();
				this._proteinExperimentPageRoot_CentralStateManagerObjectClass.set_proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData( { proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData } );
			}
			this._proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject = new ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject({
				valueChangedCallback, forExperiment: true, forSingleSearchHasSubGroups: false, searchCount_IfNotExperiment: undefined
			});

			const encodedStateData = this._proteinExperimentPageRoot_CentralStateManagerObjectClass.get_proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData();
			if ( encodedStateData ) {
				this._proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject

			const valueChangedCallback = () => {

				const proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData = this._proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.getEncodedStateData();
				this._proteinExperimentPageRoot_CentralStateManagerObjectClass.set_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData( { proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData } );
			}
			this._proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject = new ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinExperimentPageRoot_CentralStateManagerObjectClass.get_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData();
			if ( encodedStateData ) {
				this._proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ //  this._peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject

			const valueChangedCallback = () => {

				const peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData = this._peptideSequence_MissedCleavageCount_UserSelections_StateObject.getEncodedStateData();
				this._proteinExperimentPageRoot_CentralStateManagerObjectClass.set_peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData( { peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData } );
			}
			this._peptideSequence_MissedCleavageCount_UserSelections_StateObject = new PeptideSequence_MissedCleavageCount_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinExperimentPageRoot_CentralStateManagerObjectClass.get_peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData();
			if ( encodedStateData ) {
				this._peptideSequence_MissedCleavageCount_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}

		}

		{ // this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData = this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject.getEncodedStateData();
				this._proteinExperimentPageRoot_CentralStateManagerObjectClass.set_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData( { scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData } );
			}
			this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject = new ScanFilenameId_On_PSM_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinExperimentPageRoot_CentralStateManagerObjectClass.get_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scan_RetentionTime_MZ_UserSelections_EncodedStateData = this._scan_RetentionTime_MZ_UserSelection_StateObject.getEncodedStateData();
				this._proteinExperimentPageRoot_CentralStateManagerObjectClass.set_scan_RetentionTime_MZ_UserSelections_EncodedStateData( { scan_RetentionTime_MZ_UserSelections_EncodedStateData } );
			}
			this._scan_RetentionTime_MZ_UserSelection_StateObject = new Scan_RetentionTime_MZ_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinExperimentPageRoot_CentralStateManagerObjectClass.get_scan_RetentionTime_MZ_UserSelections_EncodedStateData();
			if ( encodedStateData ) {
				this._scan_RetentionTime_MZ_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._psm_Charge_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const psm_Charge_Filter_UserSelection_EncodedStateData = this._psm_Charge_Filter_UserSelection_StateObject.getEncodedStateData();
				this._proteinExperimentPageRoot_CentralStateManagerObjectClass.set_psm_Charge_Filter_UserSelection_EncodedStateData({ psm_Charge_Filter_UserSelection_EncodedStateData });
			}
			this._psm_Charge_Filter_UserSelection_StateObject = new Psm_Charge_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinExperimentPageRoot_CentralStateManagerObjectClass.get_psm_Charge_Filter_UserSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._psm_Charge_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
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

		navigation_dataPages_Maint_Instance.initializePageOnLoad({ navigationType: Navigation_dataPages_Maint__NavigationType_Enum.EXPERIMENT }); // Initialize

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


		// this._proteinExperimentPage_DisplayDataOnPage.initialize({ projectSearchIds });
		
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


				//  Have all data in page variables to render the page

				const propsValue : ProteinExperimentPage_Display_MainContent_Component_Props_Prop = {

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
					proteinExperimentPageRoot_CentralStateManagerObjectClass: this._proteinExperimentPageRoot_CentralStateManagerObjectClass,
					singleProtein_ExpPage_CentralStateManagerObjectClass: this._singleProtein_ExpPage_CentralStateManagerObjectClass,

					modificationMass_UserSelections_StateObject: this._modificationMass_UserSelections_StateObject,
					modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
					reporterIonMass_UserSelections_StateObject: this._reporterIonMass_UserSelections_StateObject,
					peptideSequence_MissedCleavageCount_UserSelections_StateObject: this._peptideSequence_MissedCleavageCount_UserSelections_StateObject,

					proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass,
					proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
					proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: this._proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject,
					proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: this._proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject,
					scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
					scan_RetentionTime_MZ_UserSelection_StateObject : this._scan_RetentionTime_MZ_UserSelection_StateObject,
					psm_Charge_Filter_UserSelection_StateObject : this._psm_Charge_Filter_UserSelection_StateObject
				}

				const props : ProteinExperimentPage_Display_Root_Component_Props = {
					propsValue
				}

				const projectPage_ExperimentsSectionRoot_Component = (
					React.createElement(
						ProteinExperimentPage_Display_Root_Component,
						props,
						null
					)
				);

				//  Render to page:

				const containerDOMElement = document.getElementById("protein_experiment_data_page_overall_enclosing_block_div");

				if ( ! containerDOMElement ) {
					throw Error("No DOM element with id 'protein_experiment_data_page_overall_enclosing_block_div'");
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
