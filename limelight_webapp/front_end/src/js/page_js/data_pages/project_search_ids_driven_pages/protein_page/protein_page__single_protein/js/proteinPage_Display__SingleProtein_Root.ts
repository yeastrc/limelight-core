/**
 * proteinPage_Display__SingleProtein.ts
 * 
 * Display Javascript for protein.jsp page  - Displaying Data for Single Protein
 * 
 */


import React from 'react';
import ReactDOM from 'react-dom';

import {reportWebErrorToServer} from 'page_js/reportWebErrorToServer';
//   Modification Mass Rounding to provide some level of commonality between searches
import {modificationMass_CommonRounding_ReturnNumber,} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import {SearchDetailsBlockDataMgmtProcessing} from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';

import {SingleProtein_CentralStateManagerObjectClass} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass';
//  From Common Version. These are compatible with the old Protein Page State Objects
import {ProteinSequenceWidget_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import {PeptideSequence_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import {DataPages_LoggedInUser_CommonObjectsFactory} from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import {ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop} from '../jsx/proteinPage_Display__SingleProtein_MainContent_Component'

import {
	ProteinPage_Display__SingleProtein_Root_Component,
	ProteinPage_Display__SingleProtein_Root_Component_Props
} from '../jsx/proteinPage_Display__SingleProtein_Root_Component';


import {
	resize_OverlayHeight_BasedOnViewportHeight_MultipleSearch_SingleProtein,
	round_Selected_ModMasses_IfNeed_modificationMass_UserSelections_StateObject,
	round_Selected_ReporterIonMasses_IfNeed_reporterIonMass_UserSelections_StateObject,
	update_Overlay_OnWindowResize_MultipleSearch_SingleProtein
} from './proteinPage_Display__SingleProtein_nonClass_Functions';
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__mod_page_embed_single_protein/js/protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass";
import {proteinPage_Display__SingleProtein_Populate_ModSelections_From_ModPage_ModMass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Populate_ModSelections_From_ModPage_ModMass";
import {open_Limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex} from "page_js/common_all_pages/limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {DataPage_common_Data_Holder_Holder_SearchScanFileData_Root} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";


/**
 * 
 */
export interface ProteinPage_Display__SingleProtein_singleProteinCloseCallback {
    () : void
}

/**
 * 
 */
export class ProteinPage_Display__SingleProtein_Root {

	private _forPeptidePage : boolean

	private _proteinSequenceVersionId : number;
	private _proteinListItem : {name: string, description: string};

	private _singleProteinCloseCallback : ProteinPage_Display__SingleProtein_singleProteinCloseCallback;
	
	private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

	/**
	 *   Created in the constructor.  NOT shared with Main Page
	 */
	private _getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class

	private _dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root;

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

	private _projectSearchIds : Array<number>;

	private _searchDataLookupParamsRoot : SearchDataLookupParameters_Root;

	private _singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass

	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory

	/**
	 * For Single Protein.  Data from this._singleProtein_CentralStateManagerObject
	 */
	private _searchSubGroup_CentralStateManagerObjectClass = SearchSubGroup_CentralStateManagerObjectClass.getNewInstance_SingleProtein();

	/**
	 * For Single Protein.  Data from this._singleProtein_CentralStateManagerObject
	 */
	private _modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_SingleProtein();

	private _modificationMass_UserSelections_StateObject = new ModificationMass_UserSelections_StateObject();

	private _reporterIonMass_UserSelections_StateObject = new ReporterIonMass_UserSelections_StateObject();

	private _peptideUnique_UserSelection_StateObject = new PeptideUnique_UserSelection_StateObject();

	private _peptideSequence_UserSelections_StateObject = new PeptideSequence_UserSelections_StateObject();

	private _peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject;

	private _scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
	private _scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject

	//     In ProteinViewPage_RootClass_Common, the data in private _proteinSequenceWidget_StateObject is transferred to object of class SingleProtein_CentralStateManagerObjectClass which interfaces with centralPageStateManager
	
	private _proteinSequenceWidget_StateObject = new ProteinSequenceWidget_StateObject();


	///////////////////

	private _closeOverlayClickHandler_BindThis = this._closeOverlayClickHandler.bind(this);

	private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

	//////////////////////

	//  after constructor


	private _singleProteinContainer_addedDivElementDOM : HTMLElement;

	private _renderedReactComponent_ProteinPage_Display__SingleProtein_Root_Component : ProteinPage_Display__SingleProtein_Root_Component;
	
	/**
	 * 
	 */
	constructor(
		{
			forPeptidePage,

			singleProteinCloseCallback,

			commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
			dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,

			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing,
			projectSearchIds,
			searchDataLookupParamsRoot,
			singleProtein_CentralStateManagerObject,
			dataPages_LoggedInUser_CommonObjectsFactory
		} : {

			forPeptidePage? : boolean

			singleProteinCloseCallback : ProteinPage_Display__SingleProtein_singleProteinCloseCallback

			commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
			dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root

			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
			dataPageStateManager_DataFrom_Server : DataPageStateManager
			searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing

			projectSearchIds : Array<number>,
			searchDataLookupParamsRoot : SearchDataLookupParameters_Root
			singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass
			dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory

		}) {

		this._forPeptidePage = forPeptidePage;

		this._singleProteinCloseCallback = singleProteinCloseCallback;
		
		this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

		this._dataPage_common_Data_Holder_Holder_SearchScanFileData_Root = dataPage_common_Data_Holder_Holder_SearchScanFileData_Root;

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

        this._projectSearchIds = projectSearchIds;

		this._searchDataLookupParamsRoot = searchDataLookupParamsRoot;

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;

		//  Main Filtering object - Single Protein has it's own object
		this._getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object = GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class.getNewInstance({ projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root });
	}
	

	/**
	 * Call when going straight to Single Protein view on Page load and don't have any data loaded yet
	 */
	openOverlay_OnlyLoadingMessage() {

		this._renderOverlayOutline();
	}

	/**
	 * 
	 */
	openOverlay(
		{
			proteinSequenceVersionId,
			modMass_Rounded_From_ModPage_ForInitialSelection, // Optional.  ONLY populated when called from Mod Page. Used for Initial Population of selected Variable and Open Modifications.
			proteinNameDescription,

			//  Optional.  Will replace values in instance properties
			dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,

			//  Optional.  Values Cleared once modMass_Rounded_From_ModPage_ForInitialSelection is used to set Single Protein Page State to URL
			protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
		} : {
			proteinSequenceVersionId: number
			modMass_Rounded_From_ModPage_ForInitialSelection?: number
			proteinNameDescription : {name: string, description: string}
			dataPage_common_Data_Holder_Holder_SearchScanFileData_Root?: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root
			protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass?: Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
		} ) : void {

		this._proteinSequenceVersionId = proteinSequenceVersionId;

		if (dataPage_common_Data_Holder_Holder_SearchScanFileData_Root) {
			this._dataPage_common_Data_Holder_Holder_SearchScanFileData_Root = dataPage_common_Data_Holder_Holder_SearchScanFileData_Root;
		}

		if (proteinNameDescription) {
			this._proteinListItem = proteinNameDescription; // proteinListItem;
		}

		let promise__get_ProteinNameDescription_Strings_For_SingleProtein: Promise<void>

		if (!this._proteinListItem) {
			//  No value passed in so compute it
			promise__get_ProteinNameDescription_Strings_For_SingleProtein = this._get_ProteinNameDescription_Strings_For_SingleProtein({
				proteinSequenceVersionId: this._proteinSequenceVersionId,
				projectSearchIds: this._projectSearchIds
			});
		}

		if ( ! promise__get_ProteinNameDescription_Strings_For_SingleProtein ) {

			//  No Promise

			this._openOverlay__After_Have_ProteinNameDescription__MaybeHadToLoadFromServer({
				modMass_Rounded_From_ModPage_ForInitialSelection, // Optional.  ONLY populated when called from Mod Page. Used for Initial Population of selected Variable and Open Modifications.

				//  Optional.  Values Cleared once modMass_Rounded_From_ModPage_ForInitialSelection is used to set Single Protein Page State to URL
				protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
			});

			return; // EARLY RETURN
		}

		promise__get_ProteinNameDescription_Strings_For_SingleProtein.catch(reason => {  })
		promise__get_ProteinNameDescription_Strings_For_SingleProtein.then(noValue => { try {

			this._openOverlay__After_Have_ProteinNameDescription__MaybeHadToLoadFromServer({
				modMass_Rounded_From_ModPage_ForInitialSelection, // Optional.  ONLY populated when called from Mod Page. Used for Initial Population of selected Variable and Open Modifications.

				//  Optional.  Values Cleared once modMass_Rounded_From_ModPage_ForInitialSelection is used to set Single Protein Page State to URL
				protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
			});
		} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
	}

	/**
	 *  After MaybeHadToLoadFromServer
	 */
	private _openOverlay__After_Have_ProteinNameDescription__MaybeHadToLoadFromServer(
		{
			modMass_Rounded_From_ModPage_ForInitialSelection, // Optional.  ONLY populated when called from Mod Page. Used for Initial Population of selected Variable and Open Modifications.

			//  Optional.  Values Cleared once modMass_Rounded_From_ModPage_ForInitialSelection is used to set Single Protein Page State to URL
			protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
		} : {
			modMass_Rounded_From_ModPage_ForInitialSelection?: number
			protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass?: Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
		} ) : void {

		////

		this._renderOverlayOutline(); //  Will just return if already done

		{
			const encodedStateData = this._singleProtein_CentralStateManagerObject.getSearchSubGroupSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._searchSubGroup_CentralStateManagerObjectClass.initialize_SingleProteinInstance({ encodedStateData, current_ProjectSearchIds: this._projectSearchIds })
			}
		}
		{
			const encodedStateData = this._singleProtein_CentralStateManagerObject.getModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData();
			if ( encodedStateData ) {
				this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize_SingleProteinInstance({ encodedStateData });
			} else {
				this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize_SingleProteinInstance({ encodedStateData: undefined });
			}
		}
        {
            const encodedStateData = this._singleProtein_CentralStateManagerObject.getModsSelectedEncodedStateData();
            if ( encodedStateData ) {
                this._modificationMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
            }

			round_Selected_ModMasses_IfNeed_modificationMass_UserSelections_StateObject({ modificationMass_UserSelections_StateObject : this._modificationMass_UserSelections_StateObject});
        }
        {
            const encodedStateData = this._singleProtein_CentralStateManagerObject.getReporterIonMassesSelectedEncodedStateData();
            if ( encodedStateData ) {
                this._reporterIonMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
            }

			round_Selected_ReporterIonMasses_IfNeed_reporterIonMass_UserSelections_StateObject({ reporterIonMass_UserSelections_StateObject : this._reporterIonMass_UserSelections_StateObject});
        }
        {
            const encodedStateData = this._singleProtein_CentralStateManagerObject.getProteinSequenceFormattedDisplayWidgetEncodedStateData();
            if ( encodedStateData ) {
                this._proteinSequenceWidget_StateObject.set_encodedStateData({ encodedStateData });
            }
        }
		{
			const encodedStateData = this._singleProtein_CentralStateManagerObject.getPeptideUniqueFilterSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._peptideUnique_UserSelection_StateObject.set_encodedStateData({ encodedStateData });
			}
		}
        {
            const encodedStateData = this._singleProtein_CentralStateManagerObject.getPeptideSequenceFilterSelectedEncodedStateData();
            if ( encodedStateData ) {
                this._peptideSequence_UserSelections_StateObject.set_encodedStateData({ encodedStateData });
            }
        }

		{ // this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject

			const valueChangedCallback = () => {

				const peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData = this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.getEncodedStateData();
				this._singleProtein_CentralStateManagerObject.set_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData( { peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData } );
			}
			this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject = new PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._singleProtein_CentralStateManagerObject.get_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData();
			if ( encodedStateData ) {
				this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData = this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject.getEncodedStateData();
				this._singleProtein_CentralStateManagerObject.set_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData({ scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData });
			}
			this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject = new ScanFilenameId_On_PSM_Filter_UserSelection_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._singleProtein_CentralStateManagerObject.get_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		{ // this._scan_RetentionTime_MZ_UserSelection_StateObject

			const valueChangedCallback = () => {

				const scan_RetentionTime_MZ_UserSelection_EncodedStateData = this._scan_RetentionTime_MZ_UserSelection_StateObject.getEncodedStateData();
				this._singleProtein_CentralStateManagerObject.set_scan_RetentionTime_MZ_UserSelection_EncodedStateData({ scan_RetentionTime_MZ_UserSelection_EncodedStateData });
			}
			this._scan_RetentionTime_MZ_UserSelection_StateObject = new Scan_RetentionTime_MZ_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._singleProtein_CentralStateManagerObject.get_scan_RetentionTime_MZ_UserSelection_EncodedStateData();
			if ( encodedStateData ) {
				this._scan_RetentionTime_MZ_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}

		//  Create for Initial Load
		const generatedPeptideContents_UserSelections_StateObject = new GeneratedPeptideContents_UserSelections_StateObject({ valueChangedCallback : undefined });

		{
			const encodedStateData = this._singleProtein_CentralStateManagerObject.getGeneratedPeptideContents_UserSelections__EncodedStateData();
			generatedPeptideContents_UserSelections_StateObject.set_encodedStateData({encodedStateData});
		}

		window.setTimeout( () => {
			try {
				//  Run in next paint cycle

				this._showAfterInitialLoad({ modMass_Rounded_From_ModPage_ForInitialSelection, protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass });

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}, 5 )
	}

	/**
	 *
	 *
	 */
	private _get_ProteinNameDescription_Strings_For_SingleProtein(
		{
			proteinSequenceVersionId,
			projectSearchIds,
		}: {
			proteinSequenceVersionId: number
			projectSearchIds: Array<number>

		}) : Promise<void>  {

		//  So add only once to result
		const proteinNamesUniqueSet: Set<string> = new Set();
		const proteinDescriptionsUniqueSet: Set<string> = new Set();

		//  To combine with "," separator
		const proteinNamesArray: Array<string> = [];
		const proteinDescriptionsArray: Array<string> = [];

		const promises: Array<Promise<void>> = []

		for (const projectSearchId of projectSearchIds) {

			const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
				this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
			if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
				throw Error("this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned Nothing for projectSearchId:" + projectSearchId )
			}

			const promise = this._get_ProteinNameDescription_Strings_For_SingleProtein_ForSingleSearch({
				proteinSequenceVersionId,
				projectSearchId,
				commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
				//  Updated
				proteinNamesUniqueSet, proteinDescriptionsUniqueSet, proteinNamesArray, proteinDescriptionsArray
			});
			if ( promise ) {
				promises.push(promise)
			}
		}

		if ( promises.length === 0 ) {

			this._get_ProteinNameDescription_Strings_For_SingleProtein_AfterProcessing_OfSingleSearches({
				proteinSequenceVersionId,
				proteinNamesArray, proteinDescriptionsArray
			})
			return null  // EARLY RETURN:  NO Promise
		}

		const promises_All = Promise.all(promises)

		const promise_Return = new Promise<void>((resolve, reject) => { try {
			promises_All.catch(reason => { reject(reason)})
			promises_All.then(noValue => { try {
				this._get_ProteinNameDescription_Strings_For_SingleProtein_AfterProcessing_OfSingleSearches({
					proteinSequenceVersionId,
					proteinNamesArray, proteinDescriptionsArray
				})
				resolve()

			} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
		} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

		return promise_Return;
	}

	/**
	 *
	 *
	 */
	private _get_ProteinNameDescription_Strings_For_SingleProtein_AfterProcessing_OfSingleSearches(
		{
			proteinSequenceVersionId,
			proteinNamesArray, proteinDescriptionsArray
		}: {
			proteinSequenceVersionId: number
			proteinNamesArray: Array<string>
			proteinDescriptionsArray: Array<string>
		}) : void {

		if ( proteinNamesArray.length === 0 ) {
			const msg = "No Protein names found in any search for proteinSequenceVersionId: " + proteinSequenceVersionId;
			console.warn(msg);
			throw Error(msg);
		}

		const proteinNamesString = proteinNamesArray.join(",");
		const proteinDescriptionsString = proteinDescriptionsArray.join(",");

		this._proteinListItem = {name: proteinNamesString, description: proteinDescriptionsString};
	}

		/**
	 *
	 *
	 */
	private _get_ProteinNameDescription_Strings_For_SingleProtein_ForSingleSearch(
		{
			proteinSequenceVersionId,
			projectSearchId,
			commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
			//  Updated
			proteinNamesUniqueSet, proteinDescriptionsUniqueSet, proteinNamesArray, proteinDescriptionsArray
		}: {
			proteinSequenceVersionId: number
			projectSearchId: number
			commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
			proteinNamesUniqueSet: Set<string>
			proteinDescriptionsUniqueSet: Set<string>
			proteinNamesArray: Array<string>
			proteinDescriptionsArray: Array<string>
		}) : Promise<void> {

		const get_ProteinInfoHolder_AllForSearch_Result =
			commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
			get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters().get_ProteinInfoHolder_AllForSearch();

		if ( get_ProteinInfoHolder_AllForSearch_Result.data ) {
			this._get_ProteinNameDescription_Strings_For_SingleProtein_ForSingleSearch__AfterGetData({
				proteinSequenceVersionId,
				projectSearchId,
				proteinInfo_For_MainFilters_Holder: get_ProteinInfoHolder_AllForSearch_Result.data.proteinInfo_For_MainFilters_Holder,
				proteinNamesUniqueSet, proteinDescriptionsUniqueSet, proteinNamesArray, proteinDescriptionsArray
			});
			return null;  // EARLY RETURN

		} else if ( get_ProteinInfoHolder_AllForSearch_Result.promise ) {
			return new Promise<void>((resolve, reject) => { try {
				get_ProteinInfoHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
				get_ProteinInfoHolder_AllForSearch_Result.promise.then(value => { try {
					this._get_ProteinNameDescription_Strings_For_SingleProtein_ForSingleSearch__AfterGetData({
						proteinSequenceVersionId,
						projectSearchId,
						proteinInfo_For_MainFilters_Holder: value.proteinInfo_For_MainFilters_Holder,
						proteinNamesUniqueSet, proteinDescriptionsUniqueSet, proteinNamesArray, proteinDescriptionsArray
					});
					resolve()
				} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
			} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
		} else {
			throw Error("get_ProteinInfoHolder_AllForSearch_Result no data or promise")
		}

		console.warn("SHOULD NOT GET HERE")
		throw Error("SHOULD NOT GET HERE")
	}

	/**
	 *
	 *
	 */
	private _get_ProteinNameDescription_Strings_For_SingleProtein_ForSingleSearch__AfterGetData(
		{
			proteinSequenceVersionId,
			projectSearchId,
			proteinInfo_For_MainFilters_Holder,
			//  Updated
			proteinNamesUniqueSet, proteinDescriptionsUniqueSet, proteinNamesArray, proteinDescriptionsArray
		}: {
			proteinSequenceVersionId: number
			projectSearchId: number
			proteinInfo_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder
			proteinNamesUniqueSet: Set<string>
			proteinDescriptionsUniqueSet: Set<string>
			proteinNamesArray: Array<string>
			proteinDescriptionsArray: Array<string>

		}) : void {

		let proteinInfo = proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId(proteinSequenceVersionId);
		if (proteinInfo === undefined) {
			//  proteinSequenceVersionId NOT in this search.  Skip to next

			return;  // EARLY RETURN
		}

		const annotations = proteinInfo.annotations;
		if (annotations) {
			for (const annotation of annotations) {
				const name = annotation.name;
				const description = annotation.description;
				const taxonomy = annotation.taxonomy;
				if (!proteinNamesUniqueSet.has(name)) {
					proteinNamesUniqueSet.add(name);
					proteinNamesArray.push(name);
				}
				if (description) {
					if (!proteinDescriptionsUniqueSet.has(description)) {
						proteinDescriptionsUniqueSet.add(description);
						proteinDescriptionsArray.push(description);
					}
				}
			}
		}
	}

	/////////////  END Get Protein Names and Descriptions

	/**
	 * 
	 */
	private _renderOverlayOutline() {

		console.log("ProteinPage_Display__SingleProtein: _renderOverlayOutline() enter")

		if ( this._renderedReactComponent_ProteinPage_Display__SingleProtein_Root_Component ) {

			//  Component Already Added to DOM

			return; // EARLY RETURN
		}

        //   Add DOM element to insert ReactDOM render into

        let addedDivElementDOM: HTMLDivElement = undefined;

        {
            // Parent Node to insert under
            const data_page_outermost_divDOMElement = document.getElementById("data_page_outermost_div");

            if ( ! data_page_outermost_divDOMElement ) {
                throw Error("No DOM element with id 'data_page_outermost_div'");
            }

            //  Sibling Node to insert before
            const footer_outer_container_divDOMElement = document.getElementById("footer_outer_container_div");

            if ( ! footer_outer_container_divDOMElement ) {
                throw Error("No DOM element with id 'footer_outer_container_div'");
            }

            addedDivElementDOM = document.createElement("div");

            data_page_outermost_divDOMElement.insertBefore(addedDivElementDOM, footer_outer_container_divDOMElement);
		}

        this._singleProteinContainer_addedDivElementDOM = addedDivElementDOM;

        //  Called on render complete
        const renderCompleteCallbackFcn = () => {

            this._resizeWindow_Handler_Attach();

            resize_OverlayHeight_BasedOnViewportHeight_MultipleSearch_SingleProtein({ singleProteinContainer_addedDivElementDOM : this._singleProteinContainer_addedDivElementDOM });
		};

		let proteinNames : string = undefined
		let proteinDescriptions : string = undefined

		if ( this._proteinListItem ) {
			proteinNames = this._proteinListItem.name
			proteinDescriptions = this._proteinListItem.description
		}

		const standard_Page_Header_Height = this._get_Standard_Page_Header_Height();

		const props : ProteinPage_Display__SingleProtein_Root_Component_Props = {
			closeOverlayClickHandler : this._closeOverlayClickHandler_BindThis,
			standard_Page_Header_Height,
			proteinNames,
			proteinDescriptions
		}

		//  Create React component instance using React.createElement(...) so don't have to make this file .tsx
		
		const proteinExperimentPage_SingleProtein_Root_Component = (
			React.createElement(
				ProteinPage_Display__SingleProtein_Root_Component,
				props,
				null
			)
		);

		this._renderedReactComponent_ProteinPage_Display__SingleProtein_Root_Component = ReactDOM.render( 
			proteinExperimentPage_SingleProtein_Root_Component,
			this._singleProteinContainer_addedDivElementDOM,
            renderCompleteCallbackFcn
		);

	}

	/**
	 * 
	 */
	private _showAfterInitialLoad(
		{
			modMass_Rounded_From_ModPage_ForInitialSelection,
			protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
		}: {
			modMass_Rounded_From_ModPage_ForInitialSelection: number
			protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass: Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass

		}) : void {

		let proteinSequenceString: string

		const promises: Array<Promise<unknown>> = [];

		if ( modMass_Rounded_From_ModPage_ForInitialSelection !== undefined && modMass_Rounded_From_ModPage_ForInitialSelection !== null ) {

			//  modMass_Rounded_From_ModPage_ForInitialSelection has a value so set Variable and Open Modification Selection Masses using it.

			const promise = //  promise may be null
				proteinPage_Display__SingleProtein_Populate_ModSelections_From_ModPage_ModMass({
					modMass_Rounded_From_ModPage_ForInitialSelection,
					modificationMass_UserSelections_StateObject: this._modificationMass_UserSelections_StateObject,
					proteinSequenceVersionId: this._proteinSequenceVersionId,  //  Not populated on Peptide page
					projectSearchIds: this._projectSearchIds,
					commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
					modificationMass_CommonRounding_ReturnNumber
				});

			if ( promise ) {
				promises.push(promise)
			}
		}
		{ // Get proteinSequenceString

			const get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result =
				this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer__CommonAcrossSearches().
				get_commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences().get_ProteinSequencesHolder_For_ProteinSequenceVersionId(this._proteinSequenceVersionId);

			if ( get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.data ) {

				proteinSequenceString =
					get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.data.proteinSequences_For_MainFilters_Holder.
					get_ProteinSequence_For_ProteinSequenceVersionId(this._proteinSequenceVersionId)

				if (proteinSequenceString === undefined) {
					throw Error("proteinSequenceData.getProteinSequence() is undefined: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
				}

			} else if ( get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.promise ) {
				const promise = new Promise<void>((resolve, reject) => { try {
					get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.promise.catch(reason => reject(reason))
					get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.promise.then(value => { try {

						proteinSequenceString =
							value.proteinSequences_For_MainFilters_Holder.
							get_ProteinSequence_For_ProteinSequenceVersionId(this._proteinSequenceVersionId)

						if (proteinSequenceString === undefined) {
							throw Error("proteinSequenceData.getProteinSequence() is undefined: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
						}

						resolve();

					} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
				} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
				promises.push(promise)
			} else {
				throw Error("get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result no data or promise")
			}

		}

		if ( promises.length === 0 ) {

			//  No promises

			this._showAfterInitialLoad__AfterLoadMoreData({
				proteinSequenceString, modMass_Rounded_From_ModPage_ForInitialSelection,
				protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
			})

			return;  //  EARLY RETURN
		}

		const promises_All = Promise.all(promises);

		promises_All.catch(reason => {

		})
		promises_All.then(noValue => { try {

			this._showAfterInitialLoad__AfterLoadMoreData({
				proteinSequenceString, modMass_Rounded_From_ModPage_ForInitialSelection,
				protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
			})
		} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

	}

	/**
	 *
	 */
	private async _showAfterInitialLoad__AfterLoadMoreData(
		{
			proteinSequenceString, modMass_Rounded_From_ModPage_ForInitialSelection,
			protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
		} : {
			proteinSequenceString: string
			modMass_Rounded_From_ModPage_ForInitialSelection: number
			protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass: Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
		}
	) {
		try {
			if ( modMass_Rounded_From_ModPage_ForInitialSelection !== undefined && modMass_Rounded_From_ModPage_ForInitialSelection !== null ) {

				//  modMass_Rounded_From_ModPage_ForInitialSelection has a value so set Variable and Open Modification Selection Masses using it.

				//  After previous call (in function above) to 'proteinPage_Display__SingleProtein_Populate_ModSelections_From_ModPage_ModMass' update URL

				const modsSelectedEncodedStateData = this._modificationMass_UserSelections_StateObject.getEncodedStateData();
				this._singleProtein_CentralStateManagerObject.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );

				//  Update URL to remove initial Mod Mass selection from Mod Page so not processed on page reload
				if ( protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass ) {
					protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass.clearAll();
				}
			}
			//  For getting search info for projectSearchIds
			const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

			//  Render to page:


			const proteinNames = this._proteinListItem.name; // proteinNames;
			const proteinDescriptions = this._proteinListItem.description; // proteinDescriptions;

			const proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop : ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop = {

				projectSearchIds : this._projectSearchIds ,
				proteinSequenceVersionId : this._proteinSequenceVersionId ,
				proteinNames : proteinNames ,
				proteinDescriptions : proteinDescriptions ,
				proteinSequenceString : proteinSequenceString ,
				commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root ,
				getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object : this._getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object ,
				dataPage_common_Data_Holder_Holder_SearchScanFileData_Root : this._dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,
				dataPageStateManager : this._dataPageStateManager_DataFrom_Server,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
				searchNamesMap_KeyProjectSearchId : searchNamesMap_KeyProjectSearchId ,
				searchDataLookupParamsRoot : this._searchDataLookupParamsRoot ,
				searchSubGroup_CentralStateManagerObjectClass : this._searchSubGroup_CentralStateManagerObjectClass,
				singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,
				modificationMass_UserSelections_StateObject : this._modificationMass_UserSelections_StateObject ,
				modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
				reporterIonMass_UserSelections_StateObject : this._reporterIonMass_UserSelections_StateObject ,
				peptideUnique_UserSelection_StateObject : this._peptideUnique_UserSelection_StateObject ,
				peptideSequence_UserSelections_StateObject : this._peptideSequence_UserSelections_StateObject ,
				peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject ,
				proteinSequenceWidget_StateObject : this._proteinSequenceWidget_StateObject ,
				scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
				scan_RetentionTime_MZ_UserSelection_StateObject : this._scan_RetentionTime_MZ_UserSelection_StateObject,
				dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory
			};

			this._renderedReactComponent_ProteinPage_Display__SingleProtein_Root_Component.add_ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop({

				proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop
			});

		} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
	}

	//////////////

	/**
	 * 
	 */
	private _closeOverlayClickHandler() : void {
		try {
			this._closeOverlay_Actual({ no_Call_CloseCallback : false })

		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}

	/**
	 * External exposed method.
	 *
	 * Call to close overlay
	 */
	forceCloseOverlay() : void {

		this._closeOverlay_Actual({ no_Call_CloseCallback : false })
	}

	/**
	 * Call to close overlay
	 */
	private _closeOverlay_Actual({ no_Call_CloseCallback } : { no_Call_CloseCallback : boolean }) : void {
		try {
			//  Cover with spinner on background since this may take a while

			const closingCover = open_Limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex();

			window.setTimeout( () => {
				try {
					//  Remove Single Protein From page:

					if ( this._singleProteinContainer_addedDivElementDOM ) {
						ReactDOM.unmountComponentAtNode( this._singleProteinContainer_addedDivElementDOM );

						this._singleProteinContainer_addedDivElementDOM.remove();
					}

					this._singleProtein_CentralStateManagerObject.clearAll();

					this._resizeWindow_Handler_Remove();

					const call_CloseCallback = ! no_Call_CloseCallback;

					if ( call_CloseCallback && this._singleProteinCloseCallback ) {
						this._singleProteinCloseCallback();
					}

					//  Remove cover
					closingCover.removeCover();

				} catch( e ) {
					console.log("Exception caught in _closeOverlay_Actual() window.setTimeout");
					console.log( e );
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			}, 10 );

		} catch( e ) {
			console.log("Exception caught in _closeOverlay_Actual()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}

	//////////////

	/**
	 * 
	 */
	private _resizeWindow_Handler_Attach() : void {

		//  Attach resize handler
		window.addEventListener( "resize", this._resizeWindow_Handler_BindThis );
	}

	/**
	 * 
	 */
	private _resizeWindow_Handler_Remove() : void {

		//  Remove resize handler
		window.removeEventListener( "resize", this._resizeWindow_Handler_BindThis );
	}
	
	/**
	 * copied to this._resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this) in constructor
	 */
	private _resizeWindow_Handler() : void {
		try {
			resize_OverlayHeight_BasedOnViewportHeight_MultipleSearch_SingleProtein({ singleProteinContainer_addedDivElementDOM : this._singleProteinContainer_addedDivElementDOM });

			update_Overlay_OnWindowResize_MultipleSearch_SingleProtein({ singleProteinContainer_addedDivElementDOM : this._singleProteinContainer_addedDivElementDOM });

		} catch( e ) {
			console.log("Exception caught in _resizeWindow_Handler()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}

	/**
	 * Return the height of the Page header at the top of the page
	 */
	private _get_Standard_Page_Header_Height() : number {

		// const $header_outer_container_div = $("#header_outer_container_div");
		// if ( $header_outer_container_div.length === 0 ) {
		// 	throw Error("No DOM element found with id 'header_outer_container_div'");
		// }
		// const headerOuterHeight = $header_outer_container_div.outerHeight( true /* [includeMargin ] */ );

		const header_outer_container_div_DOM = document.getElementById("header_outer_container_div");
		if ( ! header_outer_container_div_DOM ) {
			throw Error("No DOM element found with id 'header_outer_container_div'");
		}
		const header_outer_container_div_BoundingClientRect = header_outer_container_div_DOM.getBoundingClientRect();
		const height = header_outer_container_div_BoundingClientRect.height;

		return height;
	}
}


