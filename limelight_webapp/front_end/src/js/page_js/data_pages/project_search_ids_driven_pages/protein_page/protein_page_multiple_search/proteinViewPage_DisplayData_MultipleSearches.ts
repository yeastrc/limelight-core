/**
 * proteinViewPage_DisplayData_MultipleSearches.ts
 * 
 * Javascript for proteinView.jsp page - Displaying Data for Multiple Searches
 * 
 * 
 * 
 * 
 * 
 */

//  !! Next 2 imports import AMD format code so use import ... = require('...');

// @ts-ignore
import Handlebars = require('handlebars/runtime');

// @ts-ignore
import _protein_table_template_bundle = require("../../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js" );


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import {
	ProteinPage_Display_MultipleSearches_SingleProtein,
	ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback
} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/js/proteinPage_Display_MultipleSearches_SingleProtein'

import { SingleProtein_CentralStateManagerObjectClass }	from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass';
import { ProteinList_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinList_CentralStateManagerObjectClass';
import { ProteinGrouping_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';

import { ProteinGroup } from 'page_js/data_pages/protein_inference/ProteinGroup';
import { ProteinInferenceUtils } from 'page_js/data_pages/protein_inference/ProteinInferenceUtils';
import { modificationMass_CommonRounding_ReturnNumber } from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';
import { create_reportedPeptide_CommonValue_EncodedString } from 'page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptide_CommonValue_AcrossSearches';
import { get_DynamicModificationsForReportedPeptideIds } from '../protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_GetDynamicModificationsForReportedPeptides';
import {
	DataTable_TableOptions,
	DataTable_RootTableDataObject,
	DataTable_RootTableObject,
	DataTable_DataRowEntry,
	DataTable_DataGroupRowEntry,
	DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import { create_dataTable_Root_React } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React_Create_Remove_Table_DOM';
import { renderToPageProteinList_MultipleSearches_Create_DataTable_RootTableDataObject } from './proteinViewPage_DisplayData_MultipleSearches_Create_ProteinList_DataTable_RootTableDataObject';
import { _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_MULTIPLE_SEARCHES } from './proteinViewPage_DisplayData_MultipleSearches_Constants';
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';
import {get_OpenModificationsForReportedPeptideIds} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_Get_Open_ModificationsForReportedPeptides";
import {loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {ProteinPageSearchesSummarySectionCreator_MultipleSearches} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/proteinPageSearchesSummarySectionCreator_MultipleSearches";
import {
	ProteinPageSearchesSummarySectionData_PerSearchEntry,
	ProteinPageSearchesSummarySectionData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/proteinPageSearchesSummarySection";
import {downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds} from "page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds";

/**
 * Entry in proteinList
 */
export class ProteinDataDisplay_ProteinListItem_MultipleSearch {

	proteinSequenceVersionId : number
	numPsms : number //  numPsms to be consistent with single search code
	proteinNames : string
	proteinDescriptions : string
	proteinItemRecordsMap_Key_projectSearchId : Map<number, { 
		proteinSequenceVersionId : number 
		proteinInfo : { proteinLength : number, annotations : Array<{ name : string, description : string, taxonomy : number }> } // Map Value from loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
		numPsms : number
		numReportedPeptides : number
		numReportedPeptidesUnique : number
		reportedPeptideIds : Array<number>
	}>
}

///   Callback when row in protein list table is clicked

export class ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler_Params {
	proteinSequenceVersionId: number
	dataTable_RowClickCallback_Params: DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params
}

export type ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler = ( params : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler_Params ) => void


/**
 * !! InternalClass
 *
 * Summary Data Per Search
 */
class ProteinDataDisplay_MultipleSearch_Summary_PerSearch {

	projectSearchId : number

	proteinCount_TotalForSearch : number;
	reportedPeptideCount_TotalForSearch : number;
	psmCount_TotalForSearch : number;
}

class ProteinNameDescriptionCacheEntry_MultipleSearches {
	name : string
	description: string
}

	
/**
 * 
 */
export class ProteinViewPage_Display_MultipleSearches {

	private _singleProteinRowClickHandler_BindThis = this._singleProteinRowClickHandler.bind(this);

	private _DO_NOT_CALL() { // For testing .bind functions types
		throw Error("DO NOT CALL")
		const singleProteinRowClickHandler : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler = this._singleProteinRowClickHandler
	}

	private _data_LoadedFor_ComputedReportedPeptides_AllProteins = false;

	//  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids

	// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change

	//   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_MultipleSearches_SingleProtein

	private _loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder;


	// !!!!!!!!!  TODO  Parts of private _loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change

	//   private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds is shared with private _proteinViewPage_Display_SingleProtein_...

	private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>; // : Map;

	private _dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory;

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server: DataPageStateManager;

	private _searchDetailsBlockDataMgmtProcessing: SearchDetailsBlockDataMgmtProcessing;
	private _centralPageStateManager: CentralPageStateManager;
	private _singleProtein_CentralStateManagerObject: SingleProtein_CentralStateManagerObjectClass;
	private _proteinList_CentralStateManagerObjectClass: ProteinList_CentralStateManagerObjectClass;
	private _proteinGrouping_CentralStateManagerObjectClass: ProteinGrouping_CentralStateManagerObjectClass;
	private _generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject;

	private _annotationTypeData_ReturnSpecifiedTypes: AnnotationTypeData_ReturnSpecifiedTypes;

	//  From Protein Template:
	private _protein_page_protein_tooltip_Template = _protein_table_template_bundle.protein_page_protein_tooltip;


	//   projectSearchIds being processed.  Reset All data if receive different projectSearchId
	private _projectSearchIds: Array<number> = undefined;

	//   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
	private _proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry_MultipleSearches> = undefined;

	//   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
	private _proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry_MultipleSearches>> = undefined;

	//   Cached: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
	private _peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId: Map<number, {
		numReportedPeptides: number,
		numReportedPeptidesUnique: number,
		numPsms: number
	}> = undefined;

	private _proteinPageSearchesSummarySectionCreator_MultipleSearches = new ProteinPageSearchesSummarySectionCreator_MultipleSearches({});

	private _proteinViewPage_Display_MultipleSearches_SingleProtein: ProteinPage_Display_MultipleSearches_SingleProtein;

	// private currentProteinListDisplayTableData = undefined

	private _proteinList_IsInDOM: boolean;

	private _addTooltipForProteinName_ADDED = false;  // So don't add more than once

	private _proteinList_currentTableObject: DataTable_RootTableObject;


	/**
	 *
	 */
	constructor(
		{
			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager,
			singleProtein_CentralStateManagerObject,
			proteinList_CentralStateManagerObjectClass,
			proteinGrouping_CentralStateManagerObjectClass,
			generatedPeptideContents_UserSelections_StateObject
		}: {
			dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager,
			dataPageStateManager_DataFrom_Server: DataPageStateManager,
			searchDetailsBlockDataMgmtProcessing: SearchDetailsBlockDataMgmtProcessing,
			centralPageStateManager: CentralPageStateManager,
			singleProtein_CentralStateManagerObject: SingleProtein_CentralStateManagerObjectClass,
			proteinList_CentralStateManagerObjectClass: ProteinList_CentralStateManagerObjectClass
			proteinGrouping_CentralStateManagerObjectClass: ProteinGrouping_CentralStateManagerObjectClass
			generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
		}) {

		//  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids

		// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change

		//   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_MultipleSearches_SingleProtein

		this._loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();


		// !!!!!!!!!  TODO  Parts of this._loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change

		//   this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds is shared with this._proteinViewPage_Display_SingleProtein_...

		this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = new Map();

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;

		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		this._centralPageStateManager = centralPageStateManager;
		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;
		this._proteinList_CentralStateManagerObjectClass = proteinList_CentralStateManagerObjectClass;
		this._proteinGrouping_CentralStateManagerObjectClass = proteinGrouping_CentralStateManagerObjectClass;
		this._generatedPeptideContents_UserSelections_StateObject = generatedPeptideContents_UserSelections_StateObject;

		this._annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes({
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server
		});

		//  From Protein Template:

		if (!_protein_table_template_bundle.protein_page_protein_tooltip) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_protein_tooltip");
		}
	}

	/////////////////////////////////////////////////

	/**
	 * Create New loadedDataPerProjectSearchIdHolder
	 */
	private _create_loadedDataPerProjectSearchIdHolder() {

		const loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
		return loadedDataPerProjectSearchIdHolder;
	}

	////  Called from proteinViewPage_DisplayData_MultipleSearches_SingleProtein.ts

	/**
	 * Called from proteinViewPage_DisplayData_MultipleSearches_SingleProtein.ts
	 *
	 * Get loadedDataPerProjectSearchIdHolder from this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId
	 * Add to this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds if not exist
	 */
	public _get_loadedDataPerProjectSearchIdHolder_for_projectSearchId(projectSearchId: number) {

		let loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
		if (!loadedDataPerProjectSearchIdHolder) {
			loadedDataPerProjectSearchIdHolder = this._create_loadedDataPerProjectSearchIdHolder();
			this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set(projectSearchId, loadedDataPerProjectSearchIdHolder);
		}
		return loadedDataPerProjectSearchIdHolder;
	}

	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////


	/**
	 * Initialize
	 */
	initialize({projectSearchIds}: { projectSearchIds: Array<number> }) {

		this._projectSearchIds = projectSearchIds;

		this._data_LoadedFor_ComputedReportedPeptides_AllProteins = false;
	}

	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////

	/**
	 * attachPSMDownloadClickHandler
	 */
	attachPSMDownloadClickHandler({ projectSearchIds } : { projectSearchIds : Array<number> }) {

		const objectThis = this;

		// Wait to show and attach click handler for #protein_download_proteins until after protein list is displayed

		//  Download PSMs container and link.  Only supported for 1 project search id

		const $protein_download_assoc_psms = $("#protein_download_assoc_psms");

		//  First remove any previous click handler
		$protein_download_assoc_psms.off("click");

		$protein_download_assoc_psms.show();

		$protein_download_assoc_psms.click( function(eventObject) {
			try {
				eventObject.preventDefault();

				const projectSearchIds_InDownloadClickHandler =
					objectThis._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

				const searchDataLookupParamsRoot: SearchDataLookupParameters_Root =
					objectThis._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

				if (!searchDataLookupParamsRoot) {
					throw Error("searchDataLookupParamsRoot not found");
				}

				const projectSearchIdsReportedPeptideIdsPsmIds = [];

				for ( const projectSearchId_InDownloadClickHandler of projectSearchIds_InDownloadClickHandler ) {

					const single_projectSearchId_ReportedPeptideIdsPsmIds = {projectSearchId: projectSearchId_InDownloadClickHandler};

					projectSearchIdsReportedPeptideIdsPsmIds.push(single_projectSearchId_ReportedPeptideIdsPsmIds);
				}

				downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {
					projectSearchIdsReportedPeptideIdsPsmIds,
					searchDataLookupParamsRoot : searchDataLookupParamsRoot,
					proteinSequenceVersionIds : undefined,
					experimentId : undefined
				} );
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
				throw e;
			}
		});

	}

	/**
	 * Populate Protein List On Page For Multiple Project Search Ids
	 */
	populateProteinList({projectSearchIds}: { projectSearchIds : Array<number> }) {

		this._projectSearchIds = projectSearchIds;

		this._data_LoadedFor_ComputedReportedPeptides_AllProteins = false;

		if (this._singleProtein_CentralStateManagerObject) {
			//  If Have Single Protein to display in URL, Immediately hide the Main Display <div id="data_page_overall_enclosing_block_div" >

			const proteinSequenceVersionId_FromURL = this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

			if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {
				//  Have proteinSequenceVersionId_FromURL so going to display Single Protein Overlay

				//  Hide Main Div inside of header/footer
				const data_page_overall_enclosing_block_divDOM = document.getElementById("data_page_overall_enclosing_block_div");
				if (!data_page_overall_enclosing_block_divDOM) {
					const msg = "No element on DOM with id 'data_page_overall_enclosing_block_div'";
					console.warn(msg);
					throw Error(msg);
				}
				data_page_overall_enclosing_block_divDOM.style.display = "none";

				if (!this._proteinViewPage_Display_MultipleSearches_SingleProtein) {
					this._instantiateObject_Class__ProteinPage_Display_MultipleSearches_SingleProtein({currentWindowScrollY: undefined});
				}
				this._proteinViewPage_Display_MultipleSearches_SingleProtein.openOverlay_OnlyLoadingMessage();
			}
		}
		{
			//  Show <div id="protein_page_outermost_block"> (the outermost <div> on the protein page) ,which is just inside <div id="data_page_overall_enclosing_block_div" > from header
			const protein_page_outermost_blockDOM = document.getElementById("protein_page_outermost_block");
			if (!protein_page_outermost_blockDOM) {
				const msg = "No element on DOM with id 'protein_page_outermost_block'";
				console.warn(msg);
				throw Error(msg);
			}
			protein_page_outermost_blockDOM.style.display = "";
		}

		//   Clear: Protein Name and Description in a Map, Key ProteinSequenceVersionId
		this._proteinNameDescription_Key_ProteinSequenceVersionId = new Map();

		//   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
		this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = new Map();

		//   Clear: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
		this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId = new Map();


		//  TODO  Recode this for Multiple Project Search Ids

		// Blunt approach
		this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.clear(); // = new Map();

		// if ( this._projectSearchId !== projectSearchId ) {

		// 	//  Clear all retained Data
		// 	this._loadedDataPerProjectSearchIdHolder.clearAllData();
		// }

		this._projectSearchIds = projectSearchIds;  // Save projectSearchIds

		//  for just changes to cutoff filters
		// this._loadedDataPerProjectSearchIdHolder.clearForNewCutoffsOrDisplayedData()

		//   TODO  Maybe don't need to call this, only clearForNewCutoffsOrDisplayedData()

		//  Clear all retained Data
		// this._loadedDataPerProjectSearchIdHolder.clearAllData();


		let $protein_table_loading_text_display = $("#protein_table_loading_text_display");
		if ($protein_table_loading_text_display.length === 0) {
			throw Error("No element found with id 'protein_table_loading_text_display'");
		}
		$protein_table_loading_text_display.show();

		let $protein_list_container = $("#protein_list_container");
		if ($protein_list_container.length === 0) {
			throw Error("No element found for id 'protein_list_container'");
		}

		$protein_list_container.hide();

		$("#protein_list_size").empty();

		$("#protein_group_list_size_section_display").hide();
		$("#protein_group_list_size").empty();

		const getDataFromServer_AllPromises = [];

		for (const projectSearchId of projectSearchIds) {

			const loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
			this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set(projectSearchId, loadedDataPerProjectSearchIdHolder);


			let searchDataLookupParams_For_Single_ProjectSearchId = this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId({
				projectSearchId,
				dataPageStateManager: undefined
			});

			if (!searchDataLookupParams_For_Single_ProjectSearchId) {
				const msg = "No entry found in searchDetailsBlockDataMgmtProcessing for projectSearchId: " + projectSearchId;
				console.log(msg);
				throw Error(msg);
			}

			const promise_getDataFromServer = loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder({
				projectSearchId,
				searchDataLookupParams_For_Single_ProjectSearchId,
				loadedDataPerProjectSearchIdHolder,
				load_searchSubGroupsData : false
				//  load_searchSubGroupsData : false since for now not processing subgroup data
			});

			getDataFromServer_AllPromises.push(promise_getDataFromServer);
		}

		const promise_getDataFromServer_AllPromises = Promise.all(getDataFromServer_AllPromises);

		promise_getDataFromServer_AllPromises.catch((reason) => {
		});

		promise_getDataFromServer_AllPromises.then((value) => {
			try {
				this._displayProteinListOnPage({projectSearchIds});
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
				throw e;
			}
		})
	}


	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////

	/**
	 *
	 */
	private _loadDataFor_ComputedReportedPeptides_AllProteins({projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds}: {

		projectSearchIds: Array<number>
		loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

	}): Array<Promise<any>> {

		const promises__get_Array: Array<Promise<any>> = [];

		for (const projectSearchId of projectSearchIds) {

			const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
			if (!loadedDataPerProjectSearchIdHolder) {
				const msg = "ProteinViewPage_Display_MultipleSearches: _loadDataFor_ComputedReportedPeptides_AllProteins: no value in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
				console.warn(msg);
				throw Error(msg);
			}

			//  Process for all reportedPeptideIds for projectSearchId

			const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
			if (!reportedPeptideIds) {
				const msg = "ProteinViewPage_Display_MultipleSearches: _loadDataFor_ComputedReportedPeptides_AllProteins: no value in loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() for projectSearchId: " + projectSearchId;
				console.warn(msg);
				throw Error(msg);
			}

			{
				const promise_get__ = get_DynamicModificationsForReportedPeptideIds({loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds});

				if (promise_get__) { //  May return null so test before add to array
					promises__get_Array.push(promise_get__);
				}
			}
			{
				const promise_get__ = get_OpenModificationsForReportedPeptideIds({loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds});

				if (promise_get__) { //  May return null so test before add to array
					promises__get_Array.push(promise_get__);
				}
			}
			{
				const promise_get__ = loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder({reportedPeptideIds, projectSearchId, loadedDataPerProjectSearchIdHolder});

				if (promise_get__) { //  May return null so test before add to array
					promises__get_Array.push(promise_get__);
				}
			}
		}

		return promises__get_Array;
	}


	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////

	/**
	 * Update Protein List on Page for change to Protein Group
	 */
	updateFor_ProteinGroup_Change_ProteinListOnPage() {

		this._displayProteinListOnPage({projectSearchIds: this._projectSearchIds});
	}

	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////

	/**
	 *
	 */
	private _displayProteinListOnPage({projectSearchIds}: { projectSearchIds : Array<number> }) {

		if (!this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping()) {

			//  Grouping Proteins selected so Load data needed for Computed Reported Peptides, All Proteins

			if (this._data_LoadedFor_ComputedReportedPeptides_AllProteins) {

				//  Data already loaded

				this._displayProteinListOnPage_ActualRender({projectSearchIds});

			} else {

				//  Grouping Proteins selected so Load data needed for Computed Reported Peptides, All Proteins

				const promises_loadDataFor_ComputedReportedPeptides_AllProteins = this._loadDataFor_ComputedReportedPeptides_AllProteins({
					projectSearchIds,
					loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
				})

				if (promises_loadDataFor_ComputedReportedPeptides_AllProteins.length !== 0) {

					//  Have Data to Load so update page to "Loading Data State"


					const $protein_counts_download_assoc_psms_block = $("#protein_counts_download_assoc_psms_block");
					if ($protein_counts_download_assoc_psms_block.length === 0) {
						throw Error("Failed to find DOM element with id 'protein_counts_download_assoc_psms_block'");
					}
					$protein_counts_download_assoc_psms_block.hide();

					if (this._proteinList_IsInDOM) {

						//  Have existing list that will be updating and waiting for new data so display "Updating" message
						const $protein_list_updating_message = $("#protein_list_updating_message");
						if ($protein_list_updating_message.length === 0) {
							throw Error("Failed to find DOM element with id 'protein_list_updating_message'");
						}
						$protein_list_updating_message.show();
					}

					const promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises = Promise.all(promises_loadDataFor_ComputedReportedPeptides_AllProteins);

					promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises.catch((reason) => {
					});

					promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises.then((value) => {
						try {
							// Data Loaded for Computed Reported Peptides

							this._data_LoadedFor_ComputedReportedPeptides_AllProteins = true;

							this._displayProteinListOnPage_ActualRender({projectSearchIds});

						} catch (e) {
							reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
							throw e;
						}
					});
				} else {

					// NO data To Load for Computed Reported Peptides so immediately execute this._displayProteinListOnPage_ActualRender( { projectSearchIds } );

					this._displayProteinListOnPage_ActualRender({projectSearchIds});
				}
			}
		} else {

			// Grouping Proteins NOT selected so immediately execute this._displayProteinListOnPage_ActualRender( { projectSearchIds } );

			this._displayProteinListOnPage_ActualRender({projectSearchIds});
		}
	}

	/**
	 *
	 */
	private _displayProteinListOnPage_ActualRender({projectSearchIds}: { projectSearchIds : Array<number> }) {


		const proteinDisplayData = this._createProteinDisplayData({projectSearchIds});

		const proteinSequenceVersionId_FromURL = this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

		if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {
			//  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay
			this._singleProteinRowShowSingleProteinOverlay({proteinSequenceVersionId: proteinSequenceVersionId_FromURL});

			//  Delay render Protein List since currently hidden.  Probably could skip render until close Single Protein Overlay
			window.setTimeout(() => {

				this._renderToPageProteinList({projectSearchIds, proteinDisplayData});
			}, 2000);

		} else {

			//  render Protein List immediately
			this._renderToPageProteinList({projectSearchIds, proteinDisplayData});
		}
	}


	/////////////

	/**
	 * Create Protein Data for Display
	 *
	 * @param projectSearchIds - May be Set instead of Array
	 *
	 * Return:
	 * Protein List
	 * Number of Proteins
	 * Number of Reported Peptides Total
	 * Number of PSMs total
	 */
	private _createProteinDisplayData({projectSearchIds}: {

		projectSearchIds: Array<number>  /* May be Set instead of Array */

	}): {
		proteinList: Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>;
		proteinGroups_ArrayOf_ProteinGroup: Array<ProteinGroup>
		summaryMap_Key_ProjectSearchId : Map<number, ProteinDataDisplay_MultipleSearch_Summary_PerSearch>
	} {


		//  Validate loadedDataPerProjectSearchIdHolder populated for all projectSearchIds
		for (const projectSearchId of projectSearchIds) {
			const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
			if (!loadedDataPerProjectSearchIdHolder) {
				throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId); // Must have loadedDataPerProjectSearchIdHolder populated
			}
		}

		//  Validate num PSMs populated for all projectSearchIds
		for (const projectSearchId of projectSearchIds) {
			const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
			if (!loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap()) {
				throw Error("loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() not populated for projectSearchId: " + projectSearchId); // Must have num PSMs populated
			}
		}

		//  Map<proteinSequenceVersionId, Map<projectSearchId, ProteinDataForSingleProjectSearchIdSingleProteinSequenceVersionId>>
		const proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId:

			Map<number, Map<number, {
				proteinSequenceVersionId: number
				proteinInfo: { proteinLength: number, annotations: Array<{ name: string, description: string, taxonomy: number }> } // Map Value from loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
				numPsms: number
				numReportedPeptides: number
				numReportedPeptidesUnique: number
				reportedPeptideIds: Array<number>
			}>>
			= new Map();

		//  TODO  Currently not used

		//  Get Totals Per Search:

		// let reportedPeptideCount_TotalForSearch_AllSearches = 0;
		// let psmCount_TotalForSearch_AllSearches = 0;
		//  Track reported peptide ids to skip ones already processed under other proteins
		// const reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch_AllSearches = new Set();

		const summaryMap_Key_ProjectSearchId : Map<number, ProteinDataDisplay_MultipleSearch_Summary_PerSearch> = new Map();

		//  Process for all projectSearchIds
		for (const projectSearchId of projectSearchIds) {

			const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
			if (!loadedDataPerProjectSearchIdHolder) {
				throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId); // Must have loadedDataPerProjectSearchIdHolder populated
			}

			const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()

			//  Used to determine if a reported peptide is unique (maps to only 1 protein)
			const proteinSequenceVersionIdsPerReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId();

			const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

			//  Use proteinSequenceVersionIdsArray since it has the proteinSequenceVersionIds for the current Reported Peptide Ids for the current cutoffs/filters
			const proteinSequenceVersionIdsArray = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsArray();


			//  Get Totals for Search Values: Reported Peptide Count and PSM Count
			let proteinCount_TotalForSearch = 0;
			let reportedPeptideCount_TotalForSearch = 0;
			let psmCount_TotalForSearch = 0;
			//  Track reported peptide ids to skip ones already processed under other proteins
			const reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch = new Set();


			for (let proteinSequenceVersionId of proteinSequenceVersionIdsArray) {

				let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get(proteinSequenceVersionId);
				if (proteinInfo === undefined) {
					throw Error("No proteinInfo found.  proteinSequenceVersionId: " + proteinSequenceVersionId);
				}

				const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
				if (proteinCoverageObject === undefined) {
					throw Error("No proteinCoverageObject found.  proteinSequenceVersionId: " + proteinSequenceVersionId);
				}
				// const proteinCoverageRatio = proteinCoverageObject.getProteinSequenceCoverageRatio();

				let numReportedPeptides = 0;
				let numReportedPeptidesUnique = 0; // 'Unique' == map to only one protein
				let numPsms = 0;

				//  reportedPeptideIds for proteinSequenceVersionId
				let reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get(proteinSequenceVersionId);

				for (let reportedPeptideId of reportedPeptideIds) {

					let numberOfPSMsForReportedPeptide = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap().get(reportedPeptideId);

					if (numberOfPSMsForReportedPeptide === undefined || numberOfPSMsForReportedPeptide === null) {
						throw Error("number of PSMs Not Found for reportedPeptideId: " + reportedPeptideId);
					}

					numReportedPeptides++;
					numPsms += numberOfPSMsForReportedPeptide;

					if (!reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch.has(reportedPeptideId)) {
						//  For totals for whole search
						//  Not processed this reported peptide id yet so do so now
						reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch.add(reportedPeptideId);
						reportedPeptideCount_TotalForSearch++;
						psmCount_TotalForSearch += numberOfPSMsForReportedPeptide;
					}

					//  Is this Reported Peptide Unique?
					// proteinSequenceVersionIds array of proteinSequenceVersionIds for this reported peptide id
					const proteinSequenceVersionIds = proteinSequenceVersionIdsPerReportedPeptideId.get(reportedPeptideId);
					if (!proteinSequenceVersionIds) {
						throw Error("No proteinSequenceVersionIds for reportedPeptideId: " + reportedPeptideId);
					}
					if (proteinSequenceVersionIds.length === 1) {
						numReportedPeptidesUnique++
					}
				}

				//  Stored computed values per proteinSequenceVersionId
				const countsFor_proteinSequenceVersionId = {
					numReportedPeptides,
					numReportedPeptidesUnique,
					numPsms
				}
				this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, countsFor_proteinSequenceVersionId);

				//  output Protein Item for this projectSearchId

				let proteinItemForProjectSearch = {
					proteinSequenceVersionId: proteinSequenceVersionId,
					proteinInfo,
					numPsms,
					numReportedPeptides,
					numReportedPeptidesUnique,
					reportedPeptideIds
				};

				//  Insert Map Entry proteinItemForProjectSearch

				let proteinItemRecordsMap_Key_projectSearchId: Map<number, {
					proteinSequenceVersionId: number
					proteinInfo: {
						proteinLength: number;
						annotations: Array<{
							name: string;
							description: string;
							taxonomy: number;
						}>,
					},
					numPsms: number
					numReportedPeptides: number
					numReportedPeptidesUnique: number
					reportedPeptideIds: Array<number>
				}> = proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.get(proteinSequenceVersionId);

				if (!proteinItemRecordsMap_Key_projectSearchId) {
					proteinItemRecordsMap_Key_projectSearchId = new Map();
					proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.set(proteinSequenceVersionId, proteinItemRecordsMap_Key_projectSearchId);
				}
				const outputRecordsMap_Entry = proteinItemRecordsMap_Key_projectSearchId.get(projectSearchId);
				if (outputRecordsMap_Entry) {
					throw Error("Already have entry in proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId);
				}

				proteinCount_TotalForSearch++;

				proteinItemRecordsMap_Key_projectSearchId.set(projectSearchId, proteinItemForProjectSearch);

			}

			const summary_ForSearch = new ProteinDataDisplay_MultipleSearch_Summary_PerSearch();
			summaryMap_Key_ProjectSearchId.set( projectSearchId, summary_ForSearch )
			summary_ForSearch.projectSearchId = projectSearchId
			summary_ForSearch.proteinCount_TotalForSearch = proteinCount_TotalForSearch;
			summary_ForSearch.reportedPeptideCount_TotalForSearch = reportedPeptideCount_TotalForSearch;
			summary_ForSearch.psmCount_TotalForSearch = psmCount_TotalForSearch;
		}

		let proteinGroups_ArrayOf_ProteinGroup: Array<ProteinGroup> = undefined;


		if (!this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping()) {

			//  Grouping proteins so compute protein groups using Generated Encoded Reported Peptide String

			//  Compute Generated Encoded Reported Peptide String (from peptide id, not peptide string) to support protein grouping


			///////  !!!!!!!!! If process groupProteinsSelection not NO, need to load the following data:

			//                  loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

			//					loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId()

			//                  loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId();

			const proteinPeptideMap: Map<number, Set<string>> = new Map(); // Map<proteinSequenceVersionId, Set<reportedPeptide_CommonValue_EncodedString>>

			//  Map< proteinSequenceVersionId, Map< generatedReportedPeptide, Map< projectSearchId, Set< reportedPeptideIds >
			// const proteinSequenceVersionId_generatedReportedPeptide_projectSearchId_reportedPeptideIds_Map : Map<string,Map<number,Set<number>>> = new Map();

			//  Cached reportedPeptide_CommonValue_EncodedString : Map<projectSearchId, Map<reportedPeptideId, reportedPeptide_CommonValue_EncodedString>>
			const cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId_Key_projectSearchId: Map<number, Map<number, string>> = new Map();

			//  Process Map Key proteinSequenceVersionId first

			for (const outputRecordsMap_Per_proteinSequenceVersionId_Entry of proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.entries()) {

				const proteinSequenceVersionId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[0];
				const proteinItemRecordsMap_Key_projectSearchId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[1];

				const reportedPeptide_CommonValue_EncodedString_ForProtein: Set<string> = new Set();  //  Set<reportedPeptide_CommonValue_EncodedString>

				for (const projectSearchId of projectSearchIds) {

					const proteinItemRecord = proteinItemRecordsMap_Key_projectSearchId.get(projectSearchId);

					if (!proteinItemRecord) {
						//  No protein item for this project search id
						continue;
					}

					//  Cached reportedPeptide_CommonValue_EncodedString : Map<reportedPeptideId, reportedPeptide_CommonValue_EncodedString>
					let cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId: Map<number, string> = (
						cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId_Key_projectSearchId.get(projectSearchId)
					);
					if (!cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId) {
						cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId = new Map();
						cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId_Key_projectSearchId.set(projectSearchId, cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId);
					}

					const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);

					if (!loadedDataPerProjectSearchIdHolder) {
						const msg = "ProteinViewPage_Display_MultipleSearches: 'Compute Generated Encoded Reported Peptide String': No value in this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
						console.warn(msg);
						throw Error(msg);
					}

					//  Dynamic/Variable Modifications Per Reported Peptide Id.   position is int, mass is double
					// Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>
					const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

					if (!dynamicModificationsOnReportedPeptide_KeyReportedPeptideId) {
						const msg = "ProteinViewPage_Display_MultipleSearches: 'Compute Generated Encoded Reported Peptide String': No value in: loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId()"
						console.warn(msg);
						throw Error(msg);
					}

					//  Open Modifications Per Reported Peptide Id.   mass is double
					// Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, mass }]>>
					const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

					if (!openModificationsOnReportedPeptide_KeyReportedPeptideId) {
						const msg = "ProteinViewPage_Display_MultipleSearches: 'Compute Generated Encoded Reported Peptide String': No value in: loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId()"
						console.warn(msg);
						throw Error(msg);
					}

					const reportedPeptideIds = proteinItemRecord.reportedPeptideIds;

					for (const reportedPeptideId of reportedPeptideIds) {

						//  Cached reportedPeptide_CommonValue_EncodedString : Map<reportedPeptideId, reportedPeptide_CommonValue_EncodedString>
						let reportedPeptide_CommonValue_EncodedString = cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId.get(reportedPeptideId);

						if (!reportedPeptide_CommonValue_EncodedString) {

							//  Not in cache so compute:

							const variableMmodificationsRoundedArray_Map_KeyPosition: Map<number, Array<string>> = new Map();

							{
								const modsRoundedSet_KeyPosition: Map<number, Set<number>> = new Map();

								const dynamicModificationsOnReportedPeptideArray = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
								if (dynamicModificationsOnReportedPeptideArray) {

									//  Have Mods for this reportedPeptideId
									for (const dynamicModificationOnReportedPeptide of dynamicModificationsOnReportedPeptideArray) {

										const mass = dynamicModificationOnReportedPeptide.mass;
										const positionOnReportedPeptide = dynamicModificationOnReportedPeptide.position;

										let modsRoundedSet = modsRoundedSet_KeyPosition.get(positionOnReportedPeptide);
										if (!modsRoundedSet) {
											modsRoundedSet = new Set();
											modsRoundedSet_KeyPosition.set(positionOnReportedPeptide, modsRoundedSet);
										}

										const massRounded = modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
										modsRoundedSet.add(massRounded);
									}

									for (const modsRoundedSet_KeyPosition_Entry of modsRoundedSet_KeyPosition.entries()) {
										const positionOfModification = modsRoundedSet_KeyPosition_Entry[0];
										const modsRoundedSet = modsRoundedSet_KeyPosition_Entry[1];

										const modsRoundedArray = Array.from(modsRoundedSet);
										if (modsRoundedArray.length > 1) {
											modsRoundedArray.sort((a, b) => {
												if (a < b) {
													return -1;
												} else if (a > b) {
													return 1;
												} else {
													return 0;
												}
											});
										}
										const modsRoundedStringsArray: Array<string> = [];
										for (const modRounded of modsRoundedArray) {
											const modRoundedString = modRounded.toString();
											modsRoundedStringsArray.push(modRoundedString);
										}
										variableMmodificationsRoundedArray_Map_KeyPosition.set(positionOfModification, modsRoundedStringsArray);
									}
								}
							}

							const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({reportedPeptideId});

							if (peptideId === undefined || peptideId === null) {
								const msg = "ProteinViewPage_Display_MultipleSearches: 'Compute Generated Encoded Reported Peptide String': No Peptide Id found for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
								console.warn(msg);
								throw Error(msg);
							}

							reportedPeptide_CommonValue_EncodedString = create_reportedPeptide_CommonValue_EncodedString({

								peptideId, variableModifications_Map_KeyPosition: variableMmodificationsRoundedArray_Map_KeyPosition, staticModifications_Map_KeyPosition: undefined
							});

							//  Cached reportedPeptide_CommonValue_EncodedString : Map<reportedPeptideId, reportedPeptide_CommonValue_EncodedString>
							cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId.set(reportedPeptideId, reportedPeptide_CommonValue_EncodedString);
						}

						reportedPeptide_CommonValue_EncodedString_ForProtein.add(reportedPeptide_CommonValue_EncodedString);
					}
				}

				proteinPeptideMap.set(proteinSequenceVersionId, reportedPeptide_CommonValue_EncodedString_ForProtein);
			}

			if (this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_All_Groups()) {

				proteinGroups_ArrayOf_ProteinGroup = ProteinInferenceUtils.getProteinGroups({proteinPeptideMap});

			} else if (this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups()) {

				proteinGroups_ArrayOf_ProteinGroup = ProteinInferenceUtils.getNonSubsetProteinGroupsFromProteinPeptideMap({proteinPeptideMap});

			} else if (this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_Parsimonious_Groups()) {

				proteinGroups_ArrayOf_ProteinGroup = ProteinInferenceUtils.getParsimoniousProteinGroupsFromProteinPeptideMap({proteinPeptideMap});

			} else {

				const msg = "proteinViewPage_DisplayData_SingleSearch_Create_ProteinList_DataTable_RootTableDataObject.ts:_group_proteinList_Entries_Get_PerProteinIdMap: this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins... not === expected values.  this._proteinGrouping_CentralStateManagerObjectClass (Only in Log): " + this._proteinGrouping_CentralStateManagerObjectClass;
				console.warn(msg);
				throw Error(msg);
			}

			// for ( const proteinGroupEntry of proteinGroups_ArrayOf_ProteinGroup ) {
			// 	if ( proteinGroupEntry.proteins.size > 1 ) {
			// 		console.log( "proteinViewPage_DisplayData_SingleSearch_Create_ProteinList_DataTable_RootTableDataObject.ts: proteinGroupEntry.proteins.size > 1: proteinGroupEntry: ", proteinGroupEntry );
			// 	}
			// }

		}

		//  Build output array from Map of Maps

		let proteinResultListResult: Array<ProteinDataDisplay_ProteinListItem_MultipleSearch> = [];

		for (const outputRecordsMap_Per_proteinSequenceVersionId_Entry of proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.entries()) {

			let psmCountForThis_proteinSequenceVersionId = 0;

			//  So add only once to result
			const proteinNamesUniqueSet: Set<string> = new Set();
			const proteinDescriptionsUniqueSet: Set<string> = new Set();

			//  To combine with "," separator
			const proteinNamesArray: Array<string> = [];
			const proteinDescriptionsArray: Array<string> = [];

			const proteinNamesAndDescriptionsArray: Array<{ name: string, description: string }> = [];  // For Tooltip

			const proteinSequenceVersionId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[0];
			const proteinItemRecordsMap_Key_projectSearchId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[1];

			for (const projectSearchId of projectSearchIds) {
				const proteinItem = proteinItemRecordsMap_Key_projectSearchId.get(projectSearchId);

				if (!proteinItem) {
					//  No protein item for this project search id
					continue;
				}

				psmCountForThis_proteinSequenceVersionId += proteinItem.numPsms;

				//  Get Protein Names and Descriptions

				let foundProteinName = false;

				const proteinInfo = proteinItem.proteinInfo;
				if (!proteinInfo) {
					throw Error("No proteinInfo property for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId);
				}
				const annotations = proteinInfo.annotations;
				if (annotations) {
					foundProteinName = true;
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
						{ // For Tooltip, matches Tooltip template
							const proteinNamesAndDescriptionsNewEntry = {
								name: name,
								description: description
							};
							//  Only add to proteinNamesAndDescriptionsArray if combination of name and description is not already in array
							let nameDescriptionComboFoundInArray = false;
							for (const entry of proteinNamesAndDescriptionsArray) {
								if (entry.name === proteinNamesAndDescriptionsNewEntry.name && entry.description === proteinNamesAndDescriptionsNewEntry.description) {
									nameDescriptionComboFoundInArray = true;
									break;
								}
							}
							if (!nameDescriptionComboFoundInArray) {
								proteinNamesAndDescriptionsArray.push(proteinNamesAndDescriptionsNewEntry);
							}
						}
					}
				}

				if (!foundProteinName) {
					throw Error("No Data found for protein name.  proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId);
				}

			}

			const proteinNamesString = proteinNamesArray.join(",");
			const proteinDescriptionsString = proteinDescriptionsArray.join(",");

			const proteinNameDescriptionEntry = {proteinSequenceVersionId, name: proteinNamesString, description: proteinDescriptionsString};
			this._proteinNameDescription_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, proteinNameDescriptionEntry);

			//   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
			this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, proteinNamesAndDescriptionsArray);

			const proteinResultEntry: ProteinDataDisplay_ProteinListItem_MultipleSearch = {
				proteinSequenceVersionId,
				numPsms: psmCountForThis_proteinSequenceVersionId, //  numPsms to be consistent with single search code
				proteinNames: proteinNamesString,
				proteinDescriptions: proteinDescriptionsString,
				proteinItemRecordsMap_Key_projectSearchId
			};

			proteinResultListResult.push(proteinResultEntry);
		}

		this._sortProteinList({proteinList: proteinResultListResult});

		return {proteinList: proteinResultListResult, proteinGroups_ArrayOf_ProteinGroup, summaryMap_Key_ProjectSearchId};
	}

	//   Maybe not valid sort since not displaying the sorted on number of numPsms (Total across searches)

	/**
	 *
	 */
	private _sortProteinList({proteinList}: {

		proteinList: Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>

	}) {

		//   Sort Proteins Array on PSM Count Descending and then Protein Name then Protein Sequence Version Id

		proteinList.sort(function (a, b) {

			// PSM Count (numPsms) Descending so reverse comparisons '>' '<'

			if (a.numPsms > b.numPsms) {
				return -1;
			}
			if (a.numPsms < b.numPsms) {
				return 1;
			}

			if (a.proteinNames < b.proteinNames) {
				return -1;
			}
			if (a.proteinNames > b.proteinNames) {
				return 1;
			}

			//  All others match so order on proteinSequenceVersionId
			if (a.proteinSequenceVersionId < b.proteinSequenceVersionId) {
				return -1;
			}
			if (a.proteinSequenceVersionId > b.proteinSequenceVersionId) {
				return 1;
			}
			return 0;

		});
	}

	///////////////////////////////////////

	/**
	 *
	 */
	private _renderToPageProteinList({projectSearchIds, proteinDisplayData}: {

		projectSearchIds: Array<number>

		proteinDisplayData: {
			proteinList: Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>;
			proteinGroups_ArrayOf_ProteinGroup: Array<ProteinGroup>
			summaryMap_Key_ProjectSearchId : Map<number, ProteinDataDisplay_MultipleSearch_Summary_PerSearch>
		}
	}): void {


		console.log("Rendering Protein List START, Now: " + new Date());

		{
			//  Download Proteins container and link.

			//  Show and attach click handler here since now have the data loaded for downloading

			const $protein_download_proteins = $("#protein_download_proteins");

			//  First remove any previous click handler
			$protein_download_proteins.off("click");

			$protein_download_proteins.show();

			$protein_download_proteins.click((eventObject) => {
				try {
					eventObject.preventDefault();

					this._downloadProteinList();

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
					throw e;
				}
			});
		}
		{
			const searchNames_AsMap = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap()

			const summarySectionData = new ProteinPageSearchesSummarySectionData_Root();
			summarySectionData.perSearchEntries = [];

			for ( const projectSearchId of this._projectSearchIds ) {

				const searchNameEntry = searchNames_AsMap.get( projectSearchId );
				if ( ! searchNameEntry ) {
					const msg = "Building ProteinPageSearchesSummarySectionData_Root: searchNames_AsMap.get( projectSearchId ); return nothing. projectSearchId: " + projectSearchId;
					console.warn( msg )
					throw Error( msg )
				}

				const summarySectionData_PerSearchEntry = new ProteinPageSearchesSummarySectionData_PerSearchEntry()
				summarySectionData_PerSearchEntry.searchId = searchNameEntry.searchId;
				summarySectionData_PerSearchEntry.searchName = searchNameEntry.name;

				const summaryMap_Key_ProjectSearchId = proteinDisplayData.summaryMap_Key_ProjectSearchId;

				const summary_For_ProjectSearchId = summaryMap_Key_ProjectSearchId.get( projectSearchId );

				if ( summary_For_ProjectSearchId ) {
					summarySectionData_PerSearchEntry.proteinCount_TotalForSearch = summary_For_ProjectSearchId.proteinCount_TotalForSearch;
					summarySectionData_PerSearchEntry.reportedPeptideCount_TotalForSearch = summary_For_ProjectSearchId.reportedPeptideCount_TotalForSearch;
					summarySectionData_PerSearchEntry.psmCount_TotalForSearch = summary_For_ProjectSearchId.psmCount_TotalForSearch;
				} else {
					console.warn( "No value returned from summaryMap_Key_ProjectSearchId.get( projectSearchId ) projectSearchId: " + projectSearchId )
				}

				summarySectionData.perSearchEntries.push( summarySectionData_PerSearchEntry );
			}

			this._proteinPageSearchesSummarySectionCreator_MultipleSearches.addDisplayClickHandler()
			this._proteinPageSearchesSummarySectionCreator_MultipleSearches.setSummaryData({ summarySectionData })
		}

		const proteinList = proteinDisplayData.proteinList;

		let $protein_table_loading_text_display = $("#protein_table_loading_text_display");
		if ($protein_table_loading_text_display.length === 0) {
			throw Error("No element found with id 'protein_table_loading_text_display'");
		}
		$protein_table_loading_text_display.hide();


		const $protein_counts_download_assoc_psms_block = $("#protein_counts_download_assoc_psms_block");
		if ($protein_counts_download_assoc_psms_block.length === 0) {
			throw Error("Failed to find DOM element with id 'protein_counts_download_assoc_psms_block'");
		}
		$protein_counts_download_assoc_psms_block.hide();

		if (this._proteinList_IsInDOM && proteinList.length > 80) {

			//  Have existing list that will be updating and new list is long enough so display "Updating" message
			const $protein_list_updating_message = $("#protein_list_updating_message");
			if ($protein_list_updating_message.length === 0) {
				throw Error("Failed to find DOM element with id 'protein_list_updating_message'");
			}
			$protein_list_updating_message.show();
		}

		let proteinListLength = 0;
		if (proteinList && proteinList.length > 0) {
			proteinListLength = proteinList.length;
		}

		const proteinCount = proteinListLength.toLocaleString();
		// const reportedPeptideCount_TotalForSearch_Display = proteinDisplayData.reportedPeptideCount_TotalForSearch.toLocaleString();
		// const psmCount_TotalForSearch_Display = proteinDisplayData.psmCount_TotalForSearch.toLocaleString();

		$("#protein_list_size").text(proteinCount);
		// $("#reported_peptide_count_display").text( reportedPeptideCount_TotalForSearch_Display );
		// $("#psm_count_display").text( psmCount_TotalForSearch_Display );

		const tableOptions = new DataTable_TableOptions({});

		//   Create Data Table
		const tableDataObject: DataTable_RootTableDataObject = renderToPageProteinList_MultipleSearches_Create_DataTable_RootTableDataObject({ // External Function
			singleProteinRowClickHandler_Callback : this._singleProteinRowClickHandler_BindThis,
			proteinList,
			proteinGroups_ArrayOf_ProteinGroup: proteinDisplayData.proteinGroups_ArrayOf_ProteinGroup,
			proteinGrouping_CentralStateManagerObjectClass: this._proteinGrouping_CentralStateManagerObjectClass,
			projectSearchIds,
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server
		});

		const tableObject = new DataTable_RootTableObject({tableDataObject, tableOptions, dataTableId: "Multiple Search Protein List"});

		this._proteinList_currentTableObject = tableObject;

		if (!this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping()) {
			//  Update Protein Group Count
			if (tableObject.tableDataObject.dataTable_DataGroupRowEntries === undefined) {
				throw Error("groupProteinsInDataTable is true and tableObject.dataGroupObjects === undefined");
			}
			const groupCount = tableObject.tableDataObject.dataTable_DataGroupRowEntries.length.toLocaleString();
			$("#protein_group_list_size").text(groupCount);
			$("#protein_group_list_size_section_display").show();
		} else {
			$("#protein_group_list_size_section_display").hide();
		}


		// if ( this._proteinList_renderedReactComponent ) {

		// 	//  Already have React Component of Protein List on Page so update it

		//  	Not calling this._proteinList_renderedReactComponent.update_tableObject since that was having problems and was removed

		// 		this._proteinList_renderedReactComponent.update_tableObject({ tableObject });

		// 		return;  // EARLY RETURN
		// }

		window.setTimeout(() => {

			// Run in setTimeout so all previous page updates get painted first


			//  Hide "Updating" message
			const $protein_list_updating_message = $("#protein_list_updating_message");
			if ($protein_list_updating_message.length === 0) {
				throw Error("Failed to find DOM element with id 'protein_list_updating_message'");
			}
			$protein_list_updating_message.hide();

			const $protein_counts_download_assoc_psms_block = $("#protein_counts_download_assoc_psms_block");
			if ($protein_counts_download_assoc_psms_block.length === 0) {
				throw Error("Failed to find DOM element with id 'protein_counts_download_assoc_psms_block'");
			}
			$protein_counts_download_assoc_psms_block.show();

			let $protein_list_container = $("#protein_list_container");
			if ($protein_list_container.length === 0) {
				throw Error("No element found for id 'protein_list_container'");
			}
			$protein_list_container.show();

			const renderCompleteCallbackFcn = () => {

				//   This code runs the component is created.

				console.log("Rendering Protein List END, Now: " + new Date());
			}

			// add the table to the page

			if ($protein_list_container.length !== 1) {
				throw Error("Not found exactly one DOM element for $protein_list_container");
			}
			const protein_list_containerDOMElement = $protein_list_container[0];

			create_dataTable_Root_React({  // External Function;

				tableObject, containerDOMElement: protein_list_containerDOMElement, renderCompleteCallbackFcn
			});

			this._proteinList_IsInDOM = true;

			//  Add tooltips to  $protein_list_container instead since that is what is already in the DOM
			this._addTooltipForProteinName({$selector_table_rows_container: $protein_list_container})

			// this._populated_DOM_id_protein_list_container__With_React = true;
			console.log("Rendering Protein List END, Now: " + new Date());

		}, 10);
	}


	//////////////////////////////////////
	//////////////////////////////////////
	//////////////////////////////////////

	//     Click Handlers and Tooltips

	/**
	 *
	 */
	private _singleProteinRowClickHandler( params : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler_Params ) {

		console.log("!!!  _singleProteinRowClickHandler called: params: ", params );

		const proteinSequenceVersionId = params.proteinSequenceVersionId

		if (params.dataTable_RowClickCallback_Params.clickEventData.ctrlKey_From_ClickEvent || params.dataTable_RowClickCallback_Params.clickEventData.metaKey_From_ClickEvent) {

			this._singleProteinRowShowSingleProteinNewWindow({proteinSequenceVersionId});
			return;
		}

		this._singleProtein_CentralStateManagerObject.setProteinSequenceVersionId({proteinSequenceVersionId});

		this._singleProteinRowShowSingleProteinOverlay({ proteinSequenceVersionId});
	}

	/**
	 *
	 */
	private _singleProteinRowShowSingleProteinNewWindow({proteinSequenceVersionId}: {proteinSequenceVersionId: number}) {

		//  Create URL for new Window about to open

		//  Create to override the value of proteinSequenceVersionId from the URL
		const singleProtein_CentralStateManagerObjectClass_ForNewWindow = new SingleProtein_CentralStateManagerObjectClass({
			initialProteinSequenceVersionId: proteinSequenceVersionId,
			centralPageStateManager: undefined
		});

		const newWindowURL = this._centralPageStateManager.getURL_ForCurrentState({componentOverridesAdditions: [singleProtein_CentralStateManagerObjectClass_ForNewWindow]})

		// MUST open window before make AJAX Call.  This is a Browser Security requirement
		//  window.open(...): Must run in code directly triggered by click event

		const newWindow = window.open(newWindowURL, "_blank");
	}

	/**
	 *
	 */
	private _singleProteinRowShowSingleProteinOverlay({proteinSequenceVersionId}: {proteinSequenceVersionId: number}) {

		const proteinNameDescription = this._proteinNameDescription_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
		if (proteinNameDescription === undefined) {
			return "Description Not Found";
		}

		const proteinNameDescriptionParam = {name: proteinNameDescription.name, description: proteinNameDescription.description};

		//  Current Window Scroll position
		const currentWindowScrollY = window.scrollY;

		//  Hide Main Div inside of header/footer
		const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
		$data_page_overall_enclosing_block_div.hide();

		if (!this._proteinViewPage_Display_MultipleSearches_SingleProtein) {
			this._instantiateObject_Class__ProteinPage_Display_MultipleSearches_SingleProtein({currentWindowScrollY});
		}

		this._proteinViewPage_Display_MultipleSearches_SingleProtein.openOverlay({
			proteinSequenceVersionId,
			proteinNameDescription: proteinNameDescriptionParam,
			generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject
		});
	}

	/**
	 * Call right before calling openOverlay or openOverlay_OnlyLoadingMessage
	 */
	private _instantiateObject_Class__ProteinPage_Display_MultipleSearches_SingleProtein({currentWindowScrollY}: {currentWindowScrollY: number}) {

		//  Create callback function to call on single protein close

		const singleProteinCloseCallback : ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback = () : void => {

			this._proteinViewPage_Display_MultipleSearches_SingleProtein = undefined;

			//  Show Main Div inside of header/footer
			const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
			$data_page_overall_enclosing_block_div.show();

			if (currentWindowScrollY) {

				//  Scroll window down to original position when protein was clicked to open Single Protein view

				//  Web standard, should be supported in Edge but doesn't seem to work in Edge
				// window.scrollTo({ top : currentWindowScrollY });

				$(window).scrollTop(currentWindowScrollY);
			}
		}

		const searchDataLookupParamsRoot: SearchDataLookupParameters_Root = (
			this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds()
		);

		this._proteinViewPage_Display_MultipleSearches_SingleProtein = new ProteinPage_Display_MultipleSearches_SingleProtein({

			projectSearchIds: this._projectSearchIds,
			searchDataLookupParamsRoot,

			dataPages_LoggedInUser_CommonObjectsFactory: this._dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing: this._searchDetailsBlockDataMgmtProcessing,

			loadedDataCommonHolder: this._loadedDataCommonHolder,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
			proteinList_CentralStateManagerObjectClass: this._proteinList_CentralStateManagerObjectClass,
			singleProtein_CentralStateManagerObject: this._singleProtein_CentralStateManagerObject,
			searchSubGroup_CentralStateManagerObjectClass : undefined,

			singleProteinCloseCallback
		});
	}

	/**
	 *
	 */
	private _addTooltipForProteinName({$selector_table_rows_container}:{$selector_table_rows_container: JQuery<HTMLElement>}) {

		if (this._addTooltipForProteinName_ADDED) {
			//  Already done so exit
			return;
		}

		//  qtip tooltip on whole block

		// const selector_table_rows_container_Element = $selector_table_rows_container[ 0 ];

		// @ts-ignore
		$selector_table_rows_container.qtip({

			content: {
				text: "&nbsp;" // Replaced as mouse over each sequence letter
			},
			position: {
				effect: false,
				target: 'mouse'
				,
				adjust: {x: 5, y: 5} // Offset it slightly from under the mouse
			},
			show: {
				delay: 1,
			},
			hide: {
				delay: 0,
				effect: false,
			}
		});

		// Grab the first element in the tooltips array and access its qTip API
		// @ts-ignore
		const qtipAPI = $selector_table_rows_container.qtip('api');


		const proteinSequenceVersionIdNotAvailable: any = undefined;

		const lastProteinSequenceVersionIdObjInContainingFunction = {lastProteinSequenceVersionId: -2};

		const updateTooltipOnMouseMove_BindThis = this._updateTooltipOnMouseMove.bind(this);

		//  Add a mouse move event handler to the protein bar overlay rectangle to update the contents of the qtip tool tip 
		$selector_table_rows_container.mousemove(function (eventObject) {
			updateTooltipOnMouseMove_BindThis(eventObject, qtipAPI, lastProteinSequenceVersionIdObjInContainingFunction, proteinSequenceVersionIdNotAvailable);
		});

		const updateTooltipOnScroll_BindThis = this._updateTooltipOnScroll.bind(this);

		//  Add a scroll event handler to hide the tooltip on scroll
		$(window).scroll(function (eventObject) {
			updateTooltipOnScroll_BindThis(eventObject, qtipAPI, lastProteinSequenceVersionIdObjInContainingFunction, proteinSequenceVersionIdNotAvailable);
		});

	}

	/**
	 *
	 */
	private _updateTooltipOnScroll(eventObject: any, qtipAPI: any, lastProteinSequenceVersionIdObj: any, proteinSequenceVersionIdNotAvailable: any) {

		if (lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId === proteinSequenceVersionIdNotAvailable) {
			//  Already not showing tooltip so exit
			return;
		}
		lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId = proteinSequenceVersionIdNotAvailable;

		// User has scrolled.  Hide tooltip and clear tooltip contents.

		//  Update tool tip contents
		qtipAPI.set('content.text', '&nbsp;'); // Clear contents.  This should never be displayed but tooltip will be an empty box if displayed

		qtipAPI.toggle(false);  // ensure qtip not shown
		qtipAPI.disable(true);  // disable - must pass true to disable it
	}

	/**
	 *
	 */
	private _updateTooltipOnMouseMove(eventObject: any, qtipAPI: any, lastProteinSequenceVersionIdObj: any, proteinSequenceVersionIdNotAvailable: any) {

		const $target = $(eventObject.target);

		const $targetParent = $target.parent();

		const target_HasProteinNameCSS_Selector = $target.hasClass(_CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_MULTIPLE_SEARCHES)
		const targetParent_HasProteinNameCSS_Selector = $targetParent.hasClass(_CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_MULTIPLE_SEARCHES)

		if ((!target_HasProteinNameCSS_Selector) && (!targetParent_HasProteinNameCSS_Selector)) {

			if (lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId === proteinSequenceVersionIdNotAvailable) {
				//  Already not showing tooltip so exit
				return;
			}
			lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId = proteinSequenceVersionIdNotAvailable;

			// Mouse is Not over a Protein Name.  Hide tooltip and clear tooltip contents.

			//  Update tool tip contents
			qtipAPI.set('content.text', '&nbsp;'); // Clear contents.  This should never be displayed but tooltip will be an empty box if displayed

			qtipAPI.toggle(false);  // ensure qtip not shown
			qtipAPI.disable(true);  // disable - must pass true to disable it

			return;
		}

		let $tableCell = $target;
		if (!target_HasProteinNameCSS_Selector) {
			$tableCell = $targetParent;
		}

		const proteinSequenceVersionIdString = $tableCell.attr("data-protein-id");
		if (proteinSequenceVersionIdString === undefined) {
			throw Error("value in attr 'data-protein-id' is undefined or not set");
		}
		const proteinSequenceVersionIdInt = Number.parseInt(proteinSequenceVersionIdString, 10);
		if (Number.isNaN(proteinSequenceVersionIdInt)) {
			throw Error("value in attr 'data-protein-id' is not integer.  value: " + proteinSequenceVersionIdString);
		}

		if (proteinSequenceVersionIdInt === lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId) {

			// proteinSequenceVersionIdInt (or undefined for non protein name elements) 
			// is same as prev call to mouse move so no changes required so just exit.
			return;
		}

		lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId = proteinSequenceVersionIdInt;

		// Mouse is over a protein sequence name.

		const tooltipContentsHTML = this._getTooltipText({proteinSequenceVersionIdInt});

		//  Update tool tip contents
		qtipAPI.set('content.text', tooltipContentsHTML);

		qtipAPI.disable(false);	// enable qtip - pass false to enable
		qtipAPI.toggle(true);	    // ensure qtip visible
	}

	/**
	 *
	 */
	private _getTooltipText({proteinSequenceVersionIdInt}: {proteinSequenceVersionIdInt: number}) {

		//  Only displaying the name and description uploaded with the search

		const proteinNamesAndDescriptionsArray = this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.get(proteinSequenceVersionIdInt);
		if (proteinNamesAndDescriptionsArray === undefined) {
			return "Name and Description Not Found";
		}

		const tooltipContext = {proteinNamesAndDescriptions: proteinNamesAndDescriptionsArray};

		const tooltipHTML = this._protein_page_protein_tooltip_Template(tooltipContext);

		return tooltipHTML;
	}


	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////

	// /**
	//  * Download Protein List
	//  */
	// private _downloadProteinList() {

	// 	if ( ! this.currentProteinListDisplayTableData ) {
	// 		alert("No Data to Download");
	// 		return; // EARLY RETURN
	// 	}

	// 	const proteinDisplayDataAsString = call code in DataTable React Folder to generate string from Table data

	// 	//  For getting search info for projectSearchIds
	// 	const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();


	// 	const searchIds = [];

	// 	for ( const projectSearchId of this._projectSearchIds ) {
	// 		const searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
	// 		if ( ! searchNameObject ) {
	// 			throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
	// 		}
	// 		searchIds.push( searchNameObject.searchId );
	// 	}

	// 	const searchIdsDashDelim = searchIds.join("-");

	// 	const filename = 'proteins-search-' + searchIdsDashDelim + '.txt';


	//     StringDownloadUtils.downloadStringAsFile( { stringToDownload : proteinDisplayDataAsString, filename: filename } );
	// }

	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////

	/**
	 * Download Protein List
	 */
	_downloadProteinList() {

		const proteinDisplayDataAsString = this._createProteinDisplayDownloadDataAsString();

		if (!proteinDisplayDataAsString) {

			window.alert("No data to download")
			return // EARLY RETURN
		}

		const searchIds : Array<number> = []

		{
			//  For getting search info for projectSearchIds
			const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

			for ( const projectSearchId of this._projectSearchIds ) {
				const searchNameObject = searchNamesMap_KeyProjectSearchId.get(projectSearchId);
				if (!searchNameObject) {
					throw Error("No searchNameObject for projectSearchId: " + projectSearchId);
				}
				const searchId = searchNameObject.searchId;
				searchIds.push( searchId )
			}
		}

		searchIds.sort( (a, b) => {
			if (a < b) {
				return -1
			}
			if (a > b) {
				return  1
			}
			return 0
		})

		const filename = 'proteins-search-' + searchIds.join("-") + '.txt';

		StringDownloadUtils.downloadStringAsFile({stringToDownload: proteinDisplayDataAsString, filename: filename});
	}

	/**
	 *
	 */
	private _createProteinDisplayDownloadDataAsString() {

		if (!this._proteinList_currentTableObject) {

			window.alert("No data to download")
			return // EARLY RETURN
		}

		const tableDataObject = this._proteinList_currentTableObject.tableDataObject

		//  Array of Arrays of reportLineParts
		const reportLineParts_AllLines : Array<Array<string>> = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join

		//  reportLineParts will be joined with separator '\t'

		//  Header Line
		{
			const reportLineParts = [];

			for (const column of tableDataObject.columns) {

				reportLineParts.push(column.displayName);
			}

			reportLineParts_AllLines.push(reportLineParts);
		}

		if ( tableDataObject.dataTable_DataRowEntries ) {
			this._createProteinDisplayDownloadDataAsString_Process_dataTable_DataRowEntries({ dataTable_DataRowEntries : tableDataObject.dataTable_DataRowEntries, reportLineParts_AllLines })

		} else if ( tableDataObject.dataTable_DataGroupRowEntries ) {

			this._createProteinDisplayDownloadDataAsString_Process_dataTable_DataGroupRowEntries({ dataTable_DataGroupRowEntries : tableDataObject.dataTable_DataGroupRowEntries, reportLineParts_AllLines })

		} else {

			window.alert("Error in processing")
			throw Error("tableDataObject.dataTable_DataRowEntries NOR tableDataObject.dataTable_DataRowEntries is populated")
		}

		//  Join all line parts into strings, delimit on '\t'

		const reportLine_AllLines = [];

		let reportLineParts_AllLinesIndex = -1; // init to -1 since increment first
		const reportLineParts_AllLinesIndex_Last = reportLineParts_AllLines.length - 1;

		for (const reportLineParts of reportLineParts_AllLines) {

			reportLineParts_AllLinesIndex++;

			let reportLine = reportLineParts.join("\t");
			if (reportLineParts_AllLinesIndex === reportLineParts_AllLinesIndex_Last) {
				reportLine += '\n'; // Add '\n' to last line
			}
			reportLine_AllLines.push(reportLine);
		}

		//  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end

		const reportLinesSingleString = reportLine_AllLines.join('\n');

		return reportLinesSingleString;
	}

	/**
	 *
	 */
	_createProteinDisplayDownloadDataAsString_Process_dataTable_DataGroupRowEntries({ dataTable_DataGroupRowEntries, reportLineParts_AllLines } : {

		dataTable_DataGroupRowEntries: DataTable_DataGroupRowEntry[]
		reportLineParts_AllLines : Array<Array<string>>
	}) {

		for ( const dataTable_DataGroupRowEntry of dataTable_DataGroupRowEntries ) {

			this._createProteinDisplayDownloadDataAsString_Process_dataTable_DataRowEntries({ dataTable_DataRowEntries : dataTable_DataGroupRowEntry.dataTable_DataRowEntries, reportLineParts_AllLines })
		}
	}

	/**
	 *
	 */
	_createProteinDisplayDownloadDataAsString_Process_dataTable_DataRowEntries({ dataTable_DataRowEntries, reportLineParts_AllLines } : {

		dataTable_DataRowEntries : DataTable_DataRowEntry[]
		reportLineParts_AllLines : Array<Array<string>>
	}) {

		//  Data Lines
		for (const dataTable_DataRowEntry of dataTable_DataRowEntries) {

			const reportLineParts = [];

			for (const columnEntry of dataTable_DataRowEntry.columnEntries) {

				let dataForColumn = columnEntry.valueDisplay;
				if ( columnEntry.valueSort !== undefined && columnEntry.valueSort !== null ) {
					dataForColumn = columnEntry.valueSort;
				}
				reportLineParts.push(dataForColumn)
			}

			reportLineParts_AllLines.push(reportLineParts);
		}
	}

}