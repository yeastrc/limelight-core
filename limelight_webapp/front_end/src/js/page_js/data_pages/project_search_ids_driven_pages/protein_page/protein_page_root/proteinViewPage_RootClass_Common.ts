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

import React from "react";

import ReactDOM from 'react-dom';

/**
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import { limelight__catchAndReportGlobalOnError } from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { _REFERRER_PATH_STRING } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

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

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {page_Update_From_search_data_lookup_parameters_lookup_code__computed} from "page_js/data_pages/data_pages_common/page_Update_From_search_data_lookup_parameters_lookup_code__computed";
import {ProteinViewPage_DisplayData_ProteinList__Main_Component_Props_Prop} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__Main_Component";
import {
	ProteinViewPage_DisplayData_ProteinList__Root_Component,
	ProteinViewPage_DisplayData_ProteinList__Root_Component_Props
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__Root_Component";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";
import {ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/filter_on__components/filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Navigation_dataPages_Maint__NavigationType_Enum} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint_Component";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import {PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
	ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/js/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject";
import {
	ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_peak__mz_intensity/js/scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject";


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
	private _modificationMass_UserSelections_StateObject = new ModificationMass_UserSelections_StateObject();

	private _reporterIonMass_UserSelections_StateObject = new ReporterIonMass_UserSelections_StateObject();
	private _peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
	private _peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
	private _singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass;
	private _proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass;
	private _proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass;
	private _proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
	private _proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
	private _proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject

	private _scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
	private _scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
	private _scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject

	private _scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject

	private _psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
	private _psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject

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

		this._searchSubGroup_CentralStateManagerObjectClass = SearchSubGroup_CentralStateManagerObjectClass.getNewInstance_MainPage({ centralPageStateManager : this._centralPageStateManager });
		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass =
			ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_MainPage({ centralPageStateManager: this._centralPageStateManager });

		this._singleProtein_CentralStateManagerObject = new SingleProtein_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager, initialProteinSequenceVersionId : undefined } );
		this._proteinList_CentralStateManagerObjectClass = new ProteinList_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager } );
		this._proteinGrouping_CentralStateManagerObjectClass = new ProteinGrouping_CentralStateManagerObjectClass({ centralPageStateManager : this._centralPageStateManager, proteinList_CentralStateManagerObjectClass : this._proteinList_CentralStateManagerObjectClass });

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
		
		limelight__catchAndReportGlobalOnError.init();

		window.onpopstate = function(event) {
			//  User clicked the back button so reload so page reflects that URL
			limelight__ReloadPage_Function()
		};

		page_Update_From_search_data_lookup_parameters_lookup_code__computed();

		this._page_UserDefault_processing.page_UserDefault_processing();
		
		let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();

		this._singleProtein_CentralStateManagerObject.initialize();
		this._proteinList_CentralStateManagerObjectClass.initialize();
		this._proteinGrouping_CentralStateManagerObjectClass.initialize();

		//  "Root" Page State objects all initialized


		{
			//  Transfer GeneratedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay to singleProtein_CentralStateManagerObject
			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.getGeneratedPeptideContentsSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._singleProtein_CentralStateManagerObject.setGeneratedPeptideContents_UserSelections__EncodedStateData({ generatedPeptideContents_UserSelections__EncodedStateData: encodedStateData });
				//  clear value after transfer
				this._proteinList_CentralStateManagerObjectClass.setGeneratedPeptideContentsSelectedEncodedStateData({ generatedPeptideContentsSelectedEncodedStateData: undefined });
			}
		}

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
		{
			const mainPagesPopulateHeader = new MainPagesPopulateHeader();
			mainPagesPopulateHeader.initialize();
		}

		const searchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage_Result = 
			this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();

		const projectSearchIds : Array<number> = searchDataLookupParametersFromPage.projectSearchIds;

		this._searchSubGroup_CentralStateManagerObjectClass.initialize_MainPageInstance({ current_ProjectSearchIds : projectSearchIds });

		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize_MainPageInstance();

		{
			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.getModsSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._modificationMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{
			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.getReporterIonMassesSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._reporterIonMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{
			const valueChangedCallback = () => {

				const distinctPeptideContents_For_ProteinList_Selection_EncodedStateData = this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_distinctPeptideContents_For_ProteinList_Selection_EncodedStateData( { distinctPeptideContents_For_ProteinList_Selection_EncodedStateData } );
			}
			this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject = new ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_distinctPeptideContents_For_ProteinList_Selection_EncodedStateData();
			if ( encodedStateData ) {
				this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{ // proteinListColumnsDisplayContents

			let forSingleSearchHasSubGroups = false;
			if ( projectSearchIds.length === 1 ) {
				const single_search_has_sub_groupsDOM = document.getElementById("single_search_has_sub_groups");
				if ( single_search_has_sub_groupsDOM ) {
					forSingleSearchHasSubGroups = true;
				}
			}

			const valueChangedCallback = () => {

				const proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData = this._proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData( { proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData } );
			}
			this._proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject = new ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject({
				valueChangedCallback, forExperiment: false, forSingleSearchHasSubGroups, searchCount_IfNotExperiment: projectSearchIds.length
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData();
			if ( encodedStateData ) {
				this._proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject

			const valueChangedCallback = () => {

				const proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData = this._proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData( { proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData } );
			}
			this._proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject = new ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData();
			if ( encodedStateData ) {
				this._proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ //  this._peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject

			const valueChangedCallback = () => {

				const peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData = this._peptideSequence_MissedCleavageCount_UserSelections_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData( { peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData } );
			}
			this._peptideSequence_MissedCleavageCount_UserSelections_StateObject = new PeptideSequence_MissedCleavageCount_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData();
			if ( encodedStateData ) {
				this._peptideSequence_MissedCleavageCount_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ //  this._peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject

			const valueChangedCallback = () => {

				const peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData = this._peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData( { peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData } );
			}
			this._peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject = new PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData();
			if ( encodedStateData ) {
				this._peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData = this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData( { scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData } );
			}
			this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject = new ScanFilenameId_On_PSM_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scan_RetentionTime_MZ_UserSelections_EncodedStateData = this._scan_RetentionTime_MZ_UserSelection_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_scan_RetentionTime_MZ_UserSelections_EncodedStateData( { scan_RetentionTime_MZ_UserSelections_EncodedStateData } );
			}
			this._scan_RetentionTime_MZ_UserSelection_StateObject = new Scan_RetentionTime_MZ_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_scan_RetentionTime_MZ_UserSelections_EncodedStateData();
			if ( encodedStateData ) {
				this._scan_RetentionTime_MZ_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._psm_Charge_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const psm_Charge_Filter_UserSelection_EncodedStateData = this._psm_Charge_Filter_UserSelection_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_psm_Charge_Filter_UserSelection_EncodedStateData({ psm_Charge_Filter_UserSelection_EncodedStateData });
			}
			this._psm_Charge_Filter_UserSelection_StateObject = new Psm_Charge_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_psm_Charge_Filter_UserSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._psm_Charge_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{  //  this._psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData = this._psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData({ psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData });
			}
			this._psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject = new Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{  //  this._scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData = this._scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData({ scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData });
			}
			this._scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject = new ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData();
			if ( encodedStateData ) {
				this._scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
		{  //  this._scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData = this._scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.getEncodedStateData();
				this._proteinList_CentralStateManagerObjectClass.set_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData({ scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData });
			}
			this._scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject = new ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._proteinList_CentralStateManagerObjectClass.get_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData();
			if ( encodedStateData ) {
				this._scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}




		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
			searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
			dataPageStateManager : undefined
		} ); 

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );


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

		const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();


		const propsValue : ProteinViewPage_DisplayData_ProteinList__Main_Component_Props_Prop = {
			projectSearchIds : projectSearchIds,
			dataPageStateManager : this._dataPageStateManager_DataFrom_Server,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,

			centralPageStateManager: this._centralPageStateManager,

			proteinList_CentralStateManagerObjectClass: this._proteinList_CentralStateManagerObjectClass,

			proteinGrouping_CentralStateManagerObjectClass: this._proteinGrouping_CentralStateManagerObjectClass,
			searchSubGroup_CentralStateManagerObjectClass: this._searchSubGroup_CentralStateManagerObjectClass,
			modificationMass_UserSelections_StateObject: this._modificationMass_UserSelections_StateObject,
			modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
			reporterIonMass_UserSelections_StateObject: this._reporterIonMass_UserSelections_StateObject,
			peptideSequence_MissedCleavageCount_UserSelections_StateObject: this._peptideSequence_MissedCleavageCount_UserSelections_StateObject,
			peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: this._peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
			proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
			proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: this._proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject,
			proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: this._proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject,
			scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
			scan_RetentionTime_MZ_UserSelection_StateObject : this._scan_RetentionTime_MZ_UserSelection_StateObject,
			psm_Charge_Filter_UserSelection_StateObject: this._psm_Charge_Filter_UserSelection_StateObject,
			psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: this._psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
			scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: this._scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
			scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject: this._scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,

			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,

			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory
		}

		const props : ProteinViewPage_DisplayData_ProteinList__Root_Component_Props = {
			propsValue
		}

		const component = (
			React.createElement(
				ProteinViewPage_DisplayData_ProteinList__Root_Component,
				props,
				null
			)
		);

		//  Render to page:

		const containerDOMElement = document.getElementById("main_protein_view_outer_block_react_root_container");

		if ( ! containerDOMElement ) {
			throw Error("No DOM element with id 'main_protein_view_outer_block_react_root_container'");
		}

		//  Called on render complete
		const renderCompleteCallbackFcn = () => {

		};

		const renderedReactComponent = ReactDOM.render(
			component,
			containerDOMElement,
			renderCompleteCallbackFcn
		);

		{  //  Hide LOADING DATA message
			const main_protein_view_loading_data_root_containerDOM = document.getElementById("main_protein_view_loading_data_root_container");
			if ( ! main_protein_view_loading_data_root_containerDOM ) {
				throw Error("No DOM element with ID: 'main_protein_view_loading_data_root_container'");
			}
			main_protein_view_loading_data_root_containerDOM.style.display = "none";
		}
	}
}

