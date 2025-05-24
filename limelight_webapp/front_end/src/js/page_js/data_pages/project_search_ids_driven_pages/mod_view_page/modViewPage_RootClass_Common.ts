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

import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {_REFERRER_PATH_STRING} from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import {Page_UserDefault_processing} from 'page_js/data_pages/data_pages_common/page_UserDefault_processing';

import { GetSearchDataLookupParametersFromPage, GetSearchDataLookupParametersFromPage_Result } from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage';
import {SearchDetailsBlockDataMgmtProcessing} from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import {LoadCoreData_ProjectSearchIds_Based} from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based';

import {navigation_dataPages_Maint_Instance} from 'page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint';

import {CentralPageStateManager} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import {MainPagesPopulateHeader} from 'page_js/main_pages/mainPagesPopulateHeader';
import {page_Update_From_search_data_lookup_parameters_lookup_code__computed} from "page_js/data_pages/data_pages_common/page_Update_From_search_data_lookup_parameters_lookup_code__computed";
import {Navigation_dataPages_Maint__NavigationType_Enum} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint_Component";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
	ModificationMass_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {
	ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {
	ReporterIonMass_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {
	PeptideUnique_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {
	PeptideSequence_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {
	PeptideSequence_MissedCleavageCount_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import {
	PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject";
import {
	ProteinPositionFilter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {
	GeneratedPeptideContents_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {
	PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";
import {
	ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {
	Scan_RetentionTime_MZ_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {
	Psm_Charge_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {
	Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";
import {
	ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/js/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject";
import {
	ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_peak__mz_intensity/js/scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject";
import {
	SingleProtein_CentralStateManagerObjectClass
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass";
import {
	SearchSubGroup_CentralStateManagerObjectClass
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import React from "react";
import ReactDOM from "react-dom";
import {
	ModViewPage_Display_Root_Component, ModViewPage_Display_Root_Component_Props
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_Root_Component";
import {
	ModViewPage_Display_MainContent_Component_Props_Prop
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";
import {
	ModViewPage_DataVizOptions_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
	ModPageRoot_CentralStateManagerObjectClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modPageRoot_CentralStateManagerObjectClass";
import {
	ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";

//  From data_pages_common



/**
 * 
 */
export class ModViewPage_RootClass_Common {
	
	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;

	private _page_UserDefault_processing : Page_UserDefault_processing;
	private _centralPageStateManager : CentralPageStateManager;

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

	private _getSearchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage;

	/**
	 * EncodedDat for this._modPageRoot_CentralStateManagerObjectClass in CentralStateManager at Page Load
	 */
	private _modPageRoot_CentralStateManagerObjectClass__EncodedDatSetIn_CentralStateManager__OnPageLoad: boolean

	private _modPageRoot_CentralStateManagerObjectClass : ModPageRoot_CentralStateManagerObjectClass;

	private _modificationMass_UserSelections_StateObject = new ModificationMass_UserSelections_StateObject();

	private _modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass;

	private _reporterIonMass_UserSelections_StateObject = new ReporterIonMass_UserSelections_StateObject();

	private _peptideUnique_UserSelection_StateObject = new PeptideUnique_UserSelection_StateObject();

	private _peptideSequence_UserSelections_StateObject = new PeptideSequence_UserSelections_StateObject();
	private _peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
	private _peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
	private _proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject

	private _proteinPosition_Of_Modification_Filter_UserSelections_StateObject: ProteinPosition_Of_Modification_Filter_UserSelections_StateObject

	private _generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject;

	private _peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject

	private _scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
	private _scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject

	private _psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
	private _psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject

	private _scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
	private _scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject

	//  Specific to pass in to Single Protein Overlay
	private _singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass;

	private _searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass;


	private _modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager


	private _loadCoreData_ProjectSearchIds_Based : LoadCoreData_ProjectSearchIds_Based;


	/**
	 * 
	 */
	constructor({ dataPages_LoggedInUser_CommonObjectsFactory } : { dataPages_LoggedInUser_CommonObjectsFactory? : DataPages_LoggedInUser_CommonObjectsFactory }) {

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		this._page_UserDefault_processing = new Page_UserDefault_processing();

		this._centralPageStateManager = new CentralPageStateManager();

		this._singleProtein_CentralStateManagerObject = new SingleProtein_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager, initialProteinSequenceVersionId : undefined } );

		this._modPageRoot_CentralStateManagerObjectClass = new ModPageRoot_CentralStateManagerObjectClass({ centralPageStateManager : this._centralPageStateManager });

		{
			// const generatedPeptideContents_UserSelections_StateObject_valueChangedCallback = (): void => {
			//
			// 	const encodedStateData = this._generatedPeptideContents_UserSelections_StateObject.getEncodedStateData();
			// 	this._modPageRoot_CentralStateManagerObjectClass.setGeneratedPeptideContentsSelectedEncodedStateData({generatedPeptideContentsSelectedEncodedStateData: encodedStateData});
			// }

			//   !!!!!  WARNING:   Code below also commented to get value for this state object from Root State object on Page Load

			//  Change to NOT have callback since no longer have the Component where the user can change so always use the defaults.
			const generatedPeptideContents_UserSelections_StateObject_valueChangedCallback = undefined

			this._generatedPeptideContents_UserSelections_StateObject = new GeneratedPeptideContents_UserSelections_StateObject({valueChangedCallback: generatedPeptideContents_UserSelections_StateObject_valueChangedCallback});
		}

		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass =
			ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_MainPage({ centralPageStateManager : this._centralPageStateManager });

		this._searchSubGroup_CentralStateManagerObjectClass = SearchSubGroup_CentralStateManagerObjectClass.getNewInstance_MainPage({ centralPageStateManager : this._centralPageStateManager });


		this._modViewPage_DataVizOptions_VizSelections_PageStateManager = new ModViewPage_DataVizOptions_VizSelections_PageStateManager({ centralPageStateManager : this._centralPageStateManager });


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

		limelight__catchAndReportGlobalOnError.init();

		window.onpopstate = function(event) {
			//  User clicked the back button so reload so page reflects that URL
			limelight__ReloadPage_Function()
		};

		page_Update_From_search_data_lookup_parameters_lookup_code__computed();

		this._page_UserDefault_processing.page_UserDefault_processing();

		let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();

		let referrerFromURL = initialStateFromURL.referrer;

		if ( referrerFromURL === _REFERRER_PATH_STRING ) {

			//  TODO  do any needed processing of the URL since it is a referrer from another page

			//  Could do default URL processing here.
			//		IE: Replace the current URL with the default URL and then call again:
			//			let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
		}


		//  Set after this._centralPageStateManager is initialized
		this._modPageRoot_CentralStateManagerObjectClass__EncodedDatSetIn_CentralStateManager__OnPageLoad = ModPageRoot_CentralStateManagerObjectClass.isSetIn_CentralPageStateManager({ centralPageStateManager: this._centralPageStateManager })


		//  Clear the referrer flag from URL, if it exists
		this._centralPageStateManager.clearReferrerFlagFromURL();


		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		mainPagesPopulateHeader.initialize();

		//  From JSON placed on the page by the Server side Page Controller
		const searchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage_Result =
			this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();

		const projectSearchIds : Array<number> = searchDataLookupParametersFromPage.projectSearchIds;

		this._singleProtein_CentralStateManagerObject.initialize();
		this._searchSubGroup_CentralStateManagerObjectClass.initialize_MainPageInstance({ current_ProjectSearchIds : projectSearchIds });
		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize_MainPageInstance();

		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
			searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
			dataPageStateManager : undefined
		} );

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );


		this._modPageRoot_CentralStateManagerObjectClass.initialize();
		{
			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.getModsSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._modificationMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{
			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.getReporterIonMassesSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._reporterIonMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{
			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.getPeptideUniqueFilterSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._peptideUnique_UserSelection_StateObject.set_encodedStateData({ encodedStateData });
			}
		}
		{
			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.getPeptideSequenceFilterSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._peptideSequence_UserSelections_StateObject.set_encodedStateData({ encodedStateData });
			}
		}
		{  // this._proteinPositionFilter_UserSelections_StateObject

			const valueChangedCallback = () => {

				const proteinPositionFilter_UserSelections_EncodedStateData = this._proteinPositionFilter_UserSelections_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_proteinPositionFilter_UserSelections_EncodedStateData( { proteinPositionFilter_UserSelections_EncodedStateData } );
			}
			this._proteinPositionFilter_UserSelections_StateObject = new ProteinPositionFilter_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_proteinPositionFilter_UserSelections_EncodedStateData();
			if ( encodedStateData ) {
				this._proteinPositionFilter_UserSelections_StateObject.set_encodedStateData({ encodedStateData });
			}
		}

		{  // this._proteinPosition_Of_Modification_Filter_UserSelections_StateObject

			const valueChangedCallback = () => {

				const proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData = this._proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData( { proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData } );
			}
			this._proteinPosition_Of_Modification_Filter_UserSelections_StateObject = new ProteinPosition_Of_Modification_Filter_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData();
			if ( encodedStateData ) {
				this._proteinPosition_Of_Modification_Filter_UserSelections_StateObject.set_encodedStateData({ encodedStateData });
			}
		}
		{
			//   !!!!!  WARNING:   Code above also commented to update value in Root State object when this state object changes

			//  Change to NOT have callback since no longer have the Component where the user can change so always use the defaults.

			// const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.getGeneratedPeptideContentsSelectedEncodedStateData();
			// if ( encodedStateData ) {
			// 	this._generatedPeptideContents_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			// }
		}

		{ // this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject

			const valueChangedCallback = () => {

				const peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData = this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData( { peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData } );
			}
			this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject = new PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData();
			if ( encodedStateData ) {
				this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData = this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData( { scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData } );
			}
			this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject = new ScanFilenameId_On_PSM_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ //  this._peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject

			const valueChangedCallback = () => {

				const peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData = this._peptideSequence_MissedCleavageCount_UserSelections_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData( { peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData } );
			}
			this._peptideSequence_MissedCleavageCount_UserSelections_StateObject = new PeptideSequence_MissedCleavageCount_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData();
			if ( encodedStateData ) {
				this._peptideSequence_MissedCleavageCount_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ //  this._peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject

			const valueChangedCallback = () => {

				const peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData = this._peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData( { peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData } );
			}
			this._peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject = new PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData();
			if ( encodedStateData ) {
				this._peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scan_RetentionTime_MZ_UserSelections_EncodedStateData = this._scan_RetentionTime_MZ_UserSelection_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_scan_RetentionTime_MZ_UserSelections_EncodedStateData( { scan_RetentionTime_MZ_UserSelections_EncodedStateData } );
			}
			this._scan_RetentionTime_MZ_UserSelection_StateObject = new Scan_RetentionTime_MZ_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_scan_RetentionTime_MZ_UserSelections_EncodedStateData();
			if ( encodedStateData ) {
				this._scan_RetentionTime_MZ_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{ // this._psm_Charge_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const psm_Charge_Filter_UserSelection_EncodedStateData = this._psm_Charge_Filter_UserSelection_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_psm_Charge_Filter_UserSelection_EncodedStateData({ psm_Charge_Filter_UserSelection_EncodedStateData });
			}
			this._psm_Charge_Filter_UserSelection_StateObject = new Psm_Charge_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_psm_Charge_Filter_UserSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._psm_Charge_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{  //  this._psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData = this._psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData({ psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData });
			}
			this._psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject = new Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{  //  this._scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData = this._scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData({ scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData });
			}
			this._scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject = new ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData();
			if ( encodedStateData ) {
				this._scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{  //  this._scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData = this._scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.getEncodedStateData();
				this._modPageRoot_CentralStateManagerObjectClass.set_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData({ scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData });
			}
			this._scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject = new ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._modPageRoot_CentralStateManagerObjectClass.get_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData();
			if ( encodedStateData ) {
				this._scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}


		/////

		///   WARNING:  This MUST be the LAST State object taken from the URL.  The URL will be updated for changes to this._proteinPositionFilter_UserSelections_StateObject

		//   Pass in this._proteinPosition_Of_Modification_Filter_UserSelections_StateObject to support moving Protein Position filters to that state object

		this._modViewPage_DataVizOptions_VizSelections_PageStateManager.initialize({
			proteinPosition_Of_Modification_Filter_UserSelections_StateObject: this._proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
			projectSearchIds_MainPage: projectSearchIds
		})

		if ( ! this._modPageRoot_CentralStateManagerObjectClass__EncodedDatSetIn_CentralStateManager__OnPageLoad ) {

			//  Hard code to Set to Default when load page that had OLD URL before  _modPageRoot_CentralStateManagerObjectClass : ModPageRoot_CentralStateManagerObjectClass is set

			//  Previously on Mod page " this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass" for main page was hard coded to false

			//  This will also work when navigate from other pages to set to default

			this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.setTreatOpenModMassZeroAsUnmodified_Selection__TO_DEFAULT()
		}


		//////////////////

		let navigationType = Navigation_dataPages_Maint__NavigationType_Enum.SINGLE_SEARCH
		if ( projectSearchIds.length > 1 ) {
			navigationType = Navigation_dataPages_Maint__NavigationType_Enum.MULTIPLE_SEARCHES
		}

		navigation_dataPages_Maint_Instance.initializePageOnLoad({ navigationType }); // Initialize

		//  Save centralPageStateManager to URL '/q/...' on page load
		this._centralPageStateManager._updateURL();

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
	} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


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

		const callback_Before_ReadURLtoGenerateNewURL_ReOrderSearchesOverlay = () : void => {

			this._modViewPage_DataVizOptions_VizSelections_PageStateManager.clear_projectSearchIds_OrderOverride_Deprecated()
		}

		//  Have all data in page variables to render the page

		const propsValue : ModViewPage_Display_MainContent_Component_Props_Prop = {

			projectSearchIds,
			dataPageStateManager: this._dataPageStateManager_DataFrom_Server,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			searchDetailsBlockDataMgmtProcessing: this._searchDetailsBlockDataMgmtProcessing,

			centralPageStateManager: this._centralPageStateManager,
			searchSubGroup_CentralStateManagerObjectClass: this._searchSubGroup_CentralStateManagerObjectClass,
			modPageRoot_CentralStateManagerObjectClass: this._modPageRoot_CentralStateManagerObjectClass,
			modificationMass_UserSelections_StateObject: this._modificationMass_UserSelections_StateObject,
			modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
			reporterIonMass_UserSelections_StateObject: this._reporterIonMass_UserSelections_StateObject,
			peptideUnique_UserSelection_StateObject: this._peptideUnique_UserSelection_StateObject,
			peptideSequence_UserSelections_StateObject: this._peptideSequence_UserSelections_StateObject,
			peptideSequence_MissedCleavageCount_UserSelections_StateObject: this._peptideSequence_MissedCleavageCount_UserSelections_StateObject,
			peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: this._peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
			proteinPositionFilter_UserSelections_StateObject : this._proteinPositionFilter_UserSelections_StateObject,
			proteinPosition_Of_Modification_Filter_UserSelections_StateObject: this._proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
			peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
			scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
			scan_RetentionTime_MZ_UserSelection_StateObject : this._scan_RetentionTime_MZ_UserSelection_StateObject,
			psm_Charge_Filter_UserSelection_StateObject: this._psm_Charge_Filter_UserSelection_StateObject,
			psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: this._psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
			scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: this._scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
			scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject: this._scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,

			generatedPeptideContents_UserSelections_StateObject: this._generatedPeptideContents_UserSelections_StateObject,

			modViewPage_DataVizOptions_VizSelections_PageStateManager: this._modViewPage_DataVizOptions_VizSelections_PageStateManager,

			singleProtein_CentralStateManagerObject: this._singleProtein_CentralStateManagerObject,

			dataPages_LoggedInUser_CommonObjectsFactory: this._dataPages_LoggedInUser_CommonObjectsFactory,

			callback_Before_ReadURLtoGenerateNewURL_ReOrderSearchesOverlay
		}

		const props : ModViewPage_Display_Root_Component_Props = {
			propsValue
		}

		const projectPage_ExperimentsSectionRoot_Component = (
			React.createElement(
				ModViewPage_Display_Root_Component,
				props,
				null
			)
		);

		//  Render to page:

		const containerDOMElement = document.getElementById("main_mod_view_outer_block_react_root_container");

		if ( ! containerDOMElement ) {
			throw Error("No DOM element with id 'main_mod_view_outer_block_react_root_container'");
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

