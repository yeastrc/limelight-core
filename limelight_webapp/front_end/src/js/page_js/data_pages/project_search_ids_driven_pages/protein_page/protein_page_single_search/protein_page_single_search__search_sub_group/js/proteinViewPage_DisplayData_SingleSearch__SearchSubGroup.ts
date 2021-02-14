/**
 * proteinViewPage_DisplayData_SingleSearch__SearchSubGroup.ts
 *
 * Javascript for proteinView.jsp page - Displaying Data for Single Search, for Search Sub Groups
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
import _protein_table_template_bundle = require("../../../../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js" );

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';

import {SearchDataLookupParameters_Root, SearchDataLookupParams_For_Single_ProjectSearchId} from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';

import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';


import {
    DataTable_RootTableObject,
    DataTable_TableOptions,
    DataTable_RootTableDataObject,
    DataTable_DataRowEntry, DataTable_DataGroupRowEntry
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import {
    create_dataTable_Root_React,
    remove_dataTable_Root_React
} from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React_Create_Remove_Table_DOM'

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ProteinViewPage_StatsSectionCreator_SingleSearch } from './../../proteinPageStatsSectionCreator_SingleSearch';

import { SingleProtein_CentralStateManagerObjectClass }	from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass';
import { ProteinList_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinList_CentralStateManagerObjectClass';
import { ProteinGrouping_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';

import {_CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH_SEARCH_SUB_GROUPS} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group/js/proteinViewPage_DisplayData_SingleSearch__SearchSubGroup_Constants";
import {
    ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Function,
    ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Parameter,
    renderToPageProteinList_SingleSearch__SearchSubGroup__Create_DataTable_RootTableDataObject
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group/js/proteinViewPage_DisplayData_SingleSearch__SearchSubGroup_Create_ProteinList_DataTable_RootTableDataObject";
import {loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder";
import {
    ProteinPage_Display_MultipleSearches_SingleProtein,
    ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/js/proteinPage_Display_MultipleSearches_SingleProtein";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {StringDownloadUtils} from "page_js/data_pages/data_pages_common/downloadStringAsFile";
import {
    DownloadPSMs_PerProjectSearchId_Entry,
    downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds
} from "page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds";
import {searchSubGroup_Get_Selected_SearchSubGroupIds} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {
    CountsFor_proteinSequenceVersionIdEntry_SingleSearch_SearchSubGroup,
    createProteinDisplayData_SingleSearch_SearchSubGroup,
    ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup,
    ProteinDisplayData_From_createProteinDisplayData_SingleSearch_SearchSubGroup,
    ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group/js/proteinViewPage_DisplayData_SingleSearch_SearchSubGroup_CreateProteinDisplayData";



/**
 *
 */
export class ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup {

    private _singleProteinRowClickHandler_BindThis = this._singleProteinRowClickHandler.bind(this);

    private _DO_NOT_CALL_CastTestOnly () {
        const singleProteinRowClickHandler : ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Function = this._singleProteinRowClickHandler;
    }

    //  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids

    // !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change

    //   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch

    private _loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder;


    // !!!!!!!!!  TODO  Parts of this._loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change

    //   this._loadedDataPerProjectSearchIdHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch

    private _loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder;

    private _dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory;
    private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager;

    private _dataPageStateManager_DataFrom_Server: DataPageStateManager;

    private _searchDetailsBlockDataMgmtProcessing: SearchDetailsBlockDataMgmtProcessing;
    private _centralPageStateManager: CentralPageStateManager;
    private _singleProtein_CentralStateManagerObject: SingleProtein_CentralStateManagerObjectClass;
    private _proteinList_CentralStateManagerObjectClass: ProteinList_CentralStateManagerObjectClass;
    private _searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass;
    private _proteinGrouping_CentralStateManagerObjectClass: ProteinGrouping_CentralStateManagerObjectClass;
    private _generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject;

    private _search_SubGroup_SelectionValues_Changed_Callback : () => void;

    private _annotationTypeData_ReturnSpecifiedTypes: AnnotationTypeData_ReturnSpecifiedTypes;

    private _proteinViewPage_StatsSectionCreator_SingleSearch: ProteinViewPage_StatsSectionCreator_SingleSearch;

    //  From Protein Template:

    private _protein_page_protein_tooltip_Template = _protein_table_template_bundle.protein_page_protein_tooltip;


    //   projectSearchId being processed.  Reset All data if receive different projectSearchId
    private _projectSearchId: number = undefined;

    //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
    private _proteinNameDescription_Key_ProteinSequenceVersionId: Map<number, ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup> = undefined;

    //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    private _proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId: Map<number, Array<ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup>> = undefined;

    //   Cached: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
    private _peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId: Map<number, CountsFor_proteinSequenceVersionIdEntry_SingleSearch_SearchSubGroup> = undefined;

    private _proteinViewPage_Display_MultipleSearches_SingleProtein : ProteinPage_Display_MultipleSearches_SingleProtein;

    private _subGroupSelection_WhenOpened_SingleProteinOverlay : Set<number>;

    private _proteinList_IsInDOM: boolean;
    // private _addTooltipForProteinName_Called: boolean;

    private _mainData_LoadedFor_displayProteinListOnPage = false; // Set to true once "Main Data" Loaded for current project search id.

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
            searchSubGroup_CentralStateManagerObjectClass,
            proteinGrouping_CentralStateManagerObjectClass,
            generatedPeptideContents_UserSelections_StateObject,

            search_SubGroup_SelectionValues_Changed_Callback
        }: {
            dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory,
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager,
            dataPageStateManager_DataFrom_Server: DataPageStateManager,
            searchDetailsBlockDataMgmtProcessing: SearchDetailsBlockDataMgmtProcessing,
            centralPageStateManager: CentralPageStateManager,
            singleProtein_CentralStateManagerObject: SingleProtein_CentralStateManagerObjectClass,
            proteinList_CentralStateManagerObjectClass: ProteinList_CentralStateManagerObjectClass
            searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
            proteinGrouping_CentralStateManagerObjectClass: ProteinGrouping_CentralStateManagerObjectClass
            generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject;

            search_SubGroup_SelectionValues_Changed_Callback : () => void
        }) {

        // console.log("ProteinViewPage_Display_SingleSearch::  constructor: proteinViewPage_DisplayData_SingleSearch.ts")

        //  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids

        // !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change

        //   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch

        this._loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();


        // !!!!!!!!!  TODO  Parts of this._loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change

        //   this._loadedDataPerProjectSearchIdHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch

        this._loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();

        this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;
        this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;

        this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

        this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
        this._centralPageStateManager = centralPageStateManager;
        this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;
        this._proteinList_CentralStateManagerObjectClass = proteinList_CentralStateManagerObjectClass;
        this._searchSubGroup_CentralStateManagerObjectClass = searchSubGroup_CentralStateManagerObjectClass;
        this._proteinGrouping_CentralStateManagerObjectClass = proteinGrouping_CentralStateManagerObjectClass;
        this._generatedPeptideContents_UserSelections_StateObject = generatedPeptideContents_UserSelections_StateObject;

        this._search_SubGroup_SelectionValues_Changed_Callback = search_SubGroup_SelectionValues_Changed_Callback;

        this._annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes({
            dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server
        });

        this._proteinViewPage_StatsSectionCreator_SingleSearch = new ProteinViewPage_StatsSectionCreator_SingleSearch({
            loadedDataPerProjectSearchIdHolder: this._loadedDataPerProjectSearchIdHolder,
            dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
        });


        //  From Protein Template:

        if (!_protein_table_template_bundle.protein_page_protein_tooltip) {
            throw Error("Nothing in _protein_table_template_bundle.protein_page_protein_tooltip");
        }
    }

    /**
     * Initialize
     */
    initialize({projectSearchId}: { projectSearchId: number }) {

        if (!variable_is_type_number_Check(projectSearchId)) {
            throw Error("initialize({ projectSearchId }): projectSearchId is not a number: projectSearchId: " + projectSearchId);
        }

        this._projectSearchId = projectSearchId;
    }

    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////

    /**
     * Populate Protein List On Page For Single Project Search Id
     *
     * @param projectSearchId - may be different than value passed to initialize if now showing a different projectSearchId
     * @param load_searchSubGroupsData - load searchSubGroupsData.  Only pass true if search has sub groups and require that data.  Adds significant processing so do NOT set true unless need the data
     *
     */
    populateProteinList({projectSearchId}: { projectSearchId: number }) {

        if (!variable_is_type_number_Check(projectSearchId)) {
            throw Error("populateProteinList({ projectSearchId }): projectSearchId is not a number: projectSearchId: " + projectSearchId);
        }

        this._removeHidePSMDownloadClickHandler();

        let load_searchSubGroupsData = false;
        {
            const searchName_Entry = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap().get(projectSearchId)
            if (!searchName_Entry) {
                const msg = "Single Search: populateProteinList({: this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap().get(projectSearchId) did not return a value. projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }
            if (searchName_Entry.searchHasSubgroups) {
                load_searchSubGroupsData = true;
            }
        }

        this._mainData_LoadedFor_displayProteinListOnPage = false; // Set to true once "Main Data" Loaded for current project search id.

        {
            //  If Have Single Protein to display in URL, Immediately hide the Main Display <div id="data_page_overall_enclosing_block_div" >

            const proteinSequenceVersionId_FromURL = this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

            if ( proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null ) {
                //  Have proteinSequenceVersionId_FromURL so going to display Single Protein Overlay

                //  Hide Main Div inside of header/footer
                const data_page_overall_enclosing_block_divDOM = document.getElementById( "data_page_overall_enclosing_block_div" );
                if ( ! data_page_overall_enclosing_block_divDOM ) {
                    const msg = "No element on DOM with id 'data_page_overall_enclosing_block_div'";
                    console.warn( msg );
                    throw Error( msg );
                }
                data_page_overall_enclosing_block_divDOM.style.display = "none";

                if ( ! this._proteinViewPage_Display_MultipleSearches_SingleProtein ) {
                    this._instantiateObject_Class__ProteinPage_Display_SingleSearch_SearchSubGroup_SingleProtein__SingleProtein({ currentWindowScrollY : undefined });
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

        if (this._projectSearchId !== projectSearchId) {

            //  Clear all retained Data
            this._loadedDataPerProjectSearchIdHolder.clearAllData();
        }

        this._projectSearchId = projectSearchId;  // Save projectSearchId

        //  for just changes to cutoff filters
        this._loadedDataPerProjectSearchIdHolder.clearForNewCutoffsOrDisplayedData()

        //   TODO  Maybe don't need to call this, only clearForNewCutoffsOrDisplayedData()

        //  Clear all retained Data
        this._loadedDataPerProjectSearchIdHolder.clearAllData();


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


        let searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId = this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId({
            projectSearchId,
            dataPageStateManager: undefined
        });

        if (  ! searchDataLookupParams_For_Single_ProjectSearchId ) {
            const msg = "No entry found in searchDetailsBlockDataMgmtProcessing for projectSearchId: " + projectSearchId;
            console.log(msg);
            throw Error(msg);
        }

        const promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = (
            loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder({
                projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, load_searchSubGroupsData , loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder
            })
        );

        promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.catch((reason) => {
        });
        promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.then((value) => {
            try {

                this._mainData_LoadedFor_displayProteinListOnPage = true; // Set to true once "Main Data" Loaded for current project search id.

                this._displayProteinListOnPage();

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                throw e;
            }
        });
    }

    ///

    /**
     * Update Protein List on Page for change to Protein Group
     */
    updateFor_ProteinGroup_Change_ProteinListOnPage() {

        if (!this._mainData_LoadedFor_displayProteinListOnPage) { // = false; // Set to true once "Main Data" Loaded for current project search id.
            //  Loading Main Data data in progress.
            //  Group Protein Selection will be evaluated when Loading of Main data is complete
            //  Will display data when data is loaded.
            return; // EARY RETURN
        }

        this._displayProteinListOnPage();
    }

    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////

    /**
     * Display Protein List on Page
     */
    _displayProteinListOnPage() {

        // console.warn("_displayProteinListOnPage() called")

        let searchSubGroup_Ids_Selected_Array : Array<number> = undefined;
        {
            const searchSubGroup_Ids_Selected_Set = this._compute_searchSubGroup_Ids_Selected();
            if ( searchSubGroup_Ids_Selected_Set ) {

                if ( ! this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() ) {
                    const msg = "( ! this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() ) when this._compute_searchSubGroup_Ids_Selected(); returns a value. this._projectSearchId: " + this._projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                const searchSubGroups_ForProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( this._projectSearchId );
                if ( ! searchSubGroups_ForProjectSearchId ) {
                    const msg = "( ! searchSubGroups_ForProjectSearchId ) when this._compute_searchSubGroup_Ids_Selected(); returns a value. this._projectSearchId: " + this._projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                searchSubGroup_Ids_Selected_Array = [];

                for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                    if ( searchSubGroup_Ids_Selected_Set.has( searchSubGroup.searchSubGroup_Id ) ) {
                        searchSubGroup_Ids_Selected_Array.push( searchSubGroup.searchSubGroup_Id );
                    }
                }
            }
        }

        const proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData_SingleSearch_SearchSubGroup = createProteinDisplayData_SingleSearch_SearchSubGroup({
            searchSubGroup_Ids : searchSubGroup_Ids_Selected_Array,

            projectSearchId : this._projectSearchId,
            loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder,

            proteinNameDescription_Key_ProteinSequenceVersionId : this._proteinNameDescription_Key_ProteinSequenceVersionId,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
            peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId
        });

        // console.warn("_displayProteinListOnPage() called. proteinDisplayData: ", proteinDisplayData )


        const proteinSequenceVersionId_FromURL = this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

        if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {

            //  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay
            this._singleProteinRowShowSingleProteinOverlay({proteinSequenceVersionId: proteinSequenceVersionId_FromURL});

            //  Delay render Protein List since currently hidden.  Probably could skip render until close Single Protein Overlay
            window.setTimeout(() => {

                this._renderToPageProteinList({ proteinDisplayData, searchSubGroup_Ids_Selected_Array });
            }, 2000);

        } else {

            //  render Protein List immediately
            this._renderToPageProteinList({proteinDisplayData, searchSubGroup_Ids_Selected_Array });
        }
    }

    ///////////////////////////////////////

    /**
     *
     */
    private _renderToPageProteinList( { proteinDisplayData, searchSubGroup_Ids_Selected_Array } : {

        proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData_SingleSearch_SearchSubGroup
        searchSubGroup_Ids_Selected_Array : Array<number>
    }): void {

        console.log("Rendering Protein List START, Now: " + new Date());

        const proteinList = proteinDisplayData.proteinList;

        {
            //  Download Proteins container and link.

            //  Show and attach click handler here since now have the data loaded for downloading

            const $protein_download_proteins = $("#protein_download_proteins");

            //  First remove any previous click handler
            $protein_download_proteins.off("click");

            if ( proteinList.length > 0 ) {

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

            } else {

                $protein_download_proteins.hide();
            }

            //  Download PSM Link:

            if ( proteinList.length > 0 ) {
                this._attachPSMDownloadClickHandler({ projectSearchId : this._projectSearchId });
            } else {
                this._removeHidePSMDownloadClickHandler();
            }

        }

        let $protein_table_loading_text_display = $("#protein_table_loading_text_display");
        if ($protein_table_loading_text_display.length === 0) {
            throw Error("No element found with id 'protein_table_loading_text_display'");
        }
        $protein_table_loading_text_display.hide();

        let $protein_list_container = $("#protein_list_container");
        if ( $protein_list_container.length === 0 ) {
            throw Error("No element found for id 'protein_list_container'");
        }

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
        const reportedPeptideCount_TotalForSearch_Display = proteinDisplayData.reportedPeptideCount_TotalForSearch.toLocaleString();
        const psmCount_TotalForSearch_Display = proteinDisplayData.psmCount_TotalForSearch.toLocaleString();

        $("#protein_list_size").text(proteinCount);
        $("#reported_peptide_count_label").show();
        $("#reported_peptide_count_display").text( reportedPeptideCount_TotalForSearch_Display );
        $("#psm_count_label").show();
        $("#psm_count_display").text( psmCount_TotalForSearch_Display );

        this._proteinViewPage_StatsSectionCreator_SingleSearch.setProteinListData({
            projectSearchId : this._projectSearchId,
            proteinListData : {
                psmCount: proteinDisplayData.psmCount_TotalForSearch,
                reportedPeptideCount: proteinDisplayData.reportedPeptideCount_TotalForSearch,
                proteinCount: proteinListLength
            }
        });

        this._proteinViewPage_StatsSectionCreator_SingleSearch.addDisplayClickHandler();


        if (proteinList && proteinList.length > 0) {

            //  Have Data to show

            this._renderToPageProteinList_ActualRender({
                proteinDisplayData, $protein_list_container, searchSubGroup_Ids_Selected_Array, projectSearchId : this._projectSearchId
            });

        } else {

            if ( ! this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {
                $("#protein_group_list_size").text( "0" );
                $("#protein_group_list_size_section_display").show();
            } else {
                $("#protein_group_list_size_section_display").hide();
            }

            //  No Data to show

            //  Remove existing React in $protein_list_container

            if ( $protein_list_container.length !== 1 ) {
                throw Error("Not found exactly one DOM element for $protein_list_container");
            }
            const protein_list_containerDOMElement = $protein_list_container[ 0 ];
            remove_dataTable_Root_React({ containerDOMElement : protein_list_containerDOMElement }); // External function

            this._proteinList_IsInDOM = false;

            console.log("Rendering Protein List END (No Data), Now: " + new Date() );
        }
    }

    /**
     * Have data so actual render
     */
    _renderToPageProteinList_ActualRender({ proteinDisplayData, $protein_list_container, searchSubGroup_Ids_Selected_Array, projectSearchId } : {

        proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData_SingleSearch_SearchSubGroup
        $protein_list_container: JQuery<HTMLElement>
        searchSubGroup_Ids_Selected_Array : Array<number>
        projectSearchId : number
    } ) {

        const proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup> = proteinDisplayData.proteinList;

        //   Create Data Table
        const tableDataObject: DataTable_RootTableDataObject = renderToPageProteinList_SingleSearch__SearchSubGroup__Create_DataTable_RootTableDataObject({ // External Function
            proteinList,
            proteinGrouping_CentralStateManagerObjectClass: this._proteinGrouping_CentralStateManagerObjectClass,
            searchSubGroupIds : searchSubGroup_Ids_Selected_Array,
            projectSearchId : this._projectSearchId,
            dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
            proteinRow_tableRowClickHandler_Callback_Function : this._singleProteinRowClickHandler_BindThis
        });

        //  For DataTable

        const tableOptions = new DataTable_TableOptions({});

        const tableObject = new DataTable_RootTableObject({tableDataObject, tableOptions, dataTableId: "Single Search Search Sub Groups Protein List"});

        this._proteinList_currentTableObject = tableObject;

        if ( ! this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {
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

        //  This next block is also commented out in the Multiple Search code

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
    private _singleProteinRowClickHandler(params: ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Parameter) {

        const proteinSequenceVersionId = params.proteinSequenceVersionId

        try {
            //  Exit if user selected content on the page
            const selectedContent = window.getSelection().toString();
            if( selectedContent ){
                //  user selected content on the page
                return false; //  EARLY RETURN
            }
        } catch (e) {
            //  Eat any exception
        }

        if (params.dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params.clickEventData.ctrlKey_From_ClickEvent ||
            params.dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params.clickEventData.metaKey_From_ClickEvent ) {

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
    private _singleProteinRowShowSingleProteinOverlay({proteinSequenceVersionId } : {

        proteinSequenceVersionId : number

    }) : void {

        const proteinNameDescription = this._proteinNameDescription_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
        if (proteinNameDescription !== undefined) {
            const proteinName = proteinNameDescription.name;
            const proteinDescription = proteinNameDescription.description;

            this._singleProteinRowShowSingleProteinOverlay_Actual({ proteinSequenceVersionId, proteinName, proteinDescription })

        } else {

            //  Protein Name/Description NOT loaded so load it now and pass it

            //  For now, just close the overlay

            this._proteinViewPage_Display_MultipleSearches_SingleProtein.forceCloseOverlay();
        }
    }


    /**
     *
     */
    private _singleProteinRowShowSingleProteinOverlay_Actual({proteinSequenceVersionId, proteinName, proteinDescription } : {

        proteinSequenceVersionId : number
        proteinName : string
        proteinDescription : string

    }) : void {

        const proteinNameDescriptionParam = {name: proteinName, description: proteinDescription};

        try {
            let $protein_list_container = $("#protein_list_container");
            if ($protein_list_container.length > 0) {
                // Grab the first element in the tooltips array and access its qTip API
                // @ts-ignore
                const qtipAPI = $protein_list_container.qtip('api');
                if (qtipAPI) {
                    qtipAPI.toggle(false);  // ensure qtip not shown
                }
            }
        } catch (e) {
            //  Eat any exception
        }

        //  Current Window Scroll position
        const currentWindowScrollY = window.scrollY;

         // Hide Main Div inside of header/footer
        const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
        $data_page_overall_enclosing_block_div.hide();

        if ( ! this._proteinViewPage_Display_MultipleSearches_SingleProtein ) {

            this._instantiateObject_Class__ProteinPage_Display_SingleSearch_SearchSubGroup_SingleProtein__SingleProtein({ currentWindowScrollY });
        }

        {
            const projectSearchId = this._projectSearchId;

            const searchSubGroups_ForProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
            if ( ! searchSubGroups_ForProjectSearchId ) {
                const msg = "returned nothing: this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            this._subGroupSelection_WhenOpened_SingleProteinOverlay = searchSubGroup_Get_Selected_SearchSubGroupIds({
                searchSubGroup_CentralStateManagerObjectClass : this._searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
            })
        }

        this._proteinViewPage_Display_MultipleSearches_SingleProtein.openOverlay({
            proteinSequenceVersionId,
            proteinNameDescription : proteinNameDescriptionParam,
            generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject
        });
    }

    /**
     * Call right before calling openOverlay or openOverlay_OnlyLoadingMessage
     */
    private _instantiateObject_Class__ProteinPage_Display_SingleSearch_SearchSubGroup_SingleProtein__SingleProtein({ currentWindowScrollY } : {

        currentWindowScrollY : number
    }) {

        //  Create callback function to call on single protein close

        const singleProteinCloseCallback : ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback = () => {

            this._singleProteinCloseCallback_CalledFromInlineFunction({ currentWindowScrollY });
        }

        const searchDataLookupParamsRoot : SearchDataLookupParameters_Root = (
            this._searchDetailsBlockDataMgmtProcessing.
            getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds()
        );

        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map();
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( this._projectSearchId, this._loadedDataPerProjectSearchIdHolder );


        this._proteinViewPage_Display_MultipleSearches_SingleProtein = new ProteinPage_Display_MultipleSearches_SingleProtein( {

            projectSearchIds : [ this._projectSearchId ],
            searchDataLookupParamsRoot,

            dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
            searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
            loadedDataCommonHolder : this._loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,
            proteinList_CentralStateManagerObjectClass : this._proteinList_CentralStateManagerObjectClass,
            searchSubGroup_CentralStateManagerObjectClass : this._searchSubGroup_CentralStateManagerObjectClass,

            singleProteinCloseCallback : singleProteinCloseCallback
        } );
    }

    /**
     *
     */
    private _singleProteinCloseCallback_CalledFromInlineFunction({ currentWindowScrollY } : { currentWindowScrollY : number }) : void {


        //  Show Main Div inside of header/footer
        const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
        // console.log("running $data_page_overall_enclosing_block_div.show();")
        $data_page_overall_enclosing_block_div.show();


        this._proteinViewPage_Display_MultipleSearches_SingleProtein = undefined;

        let subGroupSelection_Changed = false; // True if subGroupSelection Changed

        if ( this._subGroupSelection_WhenOpened_SingleProteinOverlay ) {

            const projectSearchId = this._projectSearchId;

            const searchSubGroups_ForProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
            if ( ! searchSubGroups_ForProjectSearchId ) {
                const msg = "returned nothing: this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            const searchSubGroup_Ids_Selected_Current = searchSubGroup_Get_Selected_SearchSubGroupIds({
                searchSubGroup_CentralStateManagerObjectClass : this._searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
            })

            if ( this._subGroupSelection_WhenOpened_SingleProteinOverlay.size !== searchSubGroup_Ids_Selected_Current.size ) {

                subGroupSelection_Changed = true;
            } else {

                for ( const searchSubGroup_Id of this._subGroupSelection_WhenOpened_SingleProteinOverlay ) {
                    if ( ! searchSubGroup_Ids_Selected_Current.has( searchSubGroup_Id ) ) {
                        subGroupSelection_Changed = true;
                        break;
                    }
                }
            }
        }

        this._subGroupSelection_WhenOpened_SingleProteinOverlay = undefined;

        if ( subGroupSelection_Changed ) {

            this._search_SubGroup_SelectionValues_Changed_Callback();

            return; // EARLY RETURN
        }

        if ( currentWindowScrollY ) {

            //  Scroll window down to original position when protein was clicked to open Single Protein view

            //  Web standard, should be supported in Edge but doesn't seem to work in Edge
            // window.scrollTo({ top : currentWindowScrollY });

            $( window ).scrollTop( currentWindowScrollY );
        }

    }

    ////////

    /**
     *
     */
    private _addTooltipForProteinName({$selector_table_rows_container}: {$selector_table_rows_container: JQuery<HTMLElement>}) {

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

        const target_HasProteinNameCSS_Selector = $target.hasClass( _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH_SEARCH_SUB_GROUPS )
        const targetParent_HasProteinNameCSS_Selector = $targetParent.hasClass( _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH_SEARCH_SUB_GROUPS )

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

    /**
     * _remove and Hide PSMDownloadClickHandler
     */
    private _removeHidePSMDownloadClickHandler() {

        const $protein_download_assoc_psms = $("#protein_download_assoc_psms");

        //  First remove any previous click handler
        $protein_download_assoc_psms.off("click");

        $protein_download_assoc_psms.hide();
    }

    /**
     * attachPSMDownloadClickHandler
     */
    private _attachPSMDownloadClickHandler({ projectSearchId } : { projectSearchId : number }) {

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

                if ( projectSearchIds_InDownloadClickHandler.length !== 1 ) {
                    alert("More than one Search is not supported" );
                    throw Error( "More than one Search is not supported" );
                }

                let projectSearchId_InDownloadClickHandler = projectSearchIds_InDownloadClickHandler[0];

                const searchDataLookupParamsRoot : SearchDataLookupParameters_Root =
                    objectThis._searchDetailsBlockDataMgmtProcessing.
                    getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

                if ( ! searchDataLookupParamsRoot ) {
                    throw Error( "searchDataLookupParamsRoot not found" );
                }

                let searchSubGroup_Ids_Selected : Array<number> = undefined;
                {
                    const searchSubGroup_Ids_Selected_Set = objectThis._compute_searchSubGroup_Ids_Selected();
                    if ( searchSubGroup_Ids_Selected_Set ) {
                        searchSubGroup_Ids_Selected = Array.from( searchSubGroup_Ids_Selected_Set );
                    }
                }

                const single_projectSearchId_ReportedPeptideIdsPsmIds : DownloadPSMs_PerProjectSearchId_Entry = { projectSearchId : projectSearchId_InDownloadClickHandler, searchSubGroup_Ids_Selected };

                const projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> = [ single_projectSearchId_ReportedPeptideIdsPsmIds ];

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


        const $protein_counts_download_assoc_psms_block = $("#protein_counts_download_assoc_psms_block");
        if ( $protein_counts_download_assoc_psms_block.length === 0 ) {
            throw Error("Failed to find DOM element with id 'protein_counts_download_assoc_psms_block'");
        }
        $protein_counts_download_assoc_psms_block.show();
    }

    ///////////

    /**
     * Download Protein List
     */
    _downloadProteinList() {

        if ( ! this._proteinList_currentTableObject ) {
            const msg = "_downloadProteinList:  No value in this._proteinList_currentTableObject";
            console.warn( msg );
            throw Error( msg );
        }

        const tableDataObject = this._proteinList_currentTableObject.tableDataObject;

        //  Array of Arrays of reportLineParts
        const reportLineParts_AllLines : Array<Array<string>> = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join

        //  reportLineParts will be joined with separator '\t'

        //  Header Line
        {
            const reportLineParts = [];

            for ( const column of tableDataObject.columns ) {

                reportLineParts.push( column.displayName );
            }

            reportLineParts_AllLines.push( reportLineParts );
        }

        if ( tableDataObject.dataTable_DataGroupRowEntries ) {

            this._downloadProteinList_Process__dataTable_DataGroupRowEntries({ dataTable_DataGroupRowEntries : tableDataObject.dataTable_DataGroupRowEntries, reportLineParts_AllLines });

        } else if ( tableDataObject.dataTable_DataRowEntries ) {

            this._downloadProteinList_Process__dataTable_DataRowEntries({ dataTable_DataRowEntries : tableDataObject.dataTable_DataRowEntries, reportLineParts_AllLines });

        } else {
            const msg = "_downloadProteinList:  No value in tableDataObject.dataTable_DataGroupRowEntries or tableDataObject.dataTable_DataRowEntries";
            console.warn( msg );
            throw Error( msg );
        }


        //  Join all line parts into strings, delimit on '\t'

        const reportLine_AllLines = [];

        let reportLineParts_AllLinesIndex = -1; // init to -1 since increment first
        const reportLineParts_AllLinesIndex_Last = reportLineParts_AllLines.length - 1;

        for ( const reportLineParts of reportLineParts_AllLines ) {

            reportLineParts_AllLinesIndex++;

            let reportLine = reportLineParts.join( "\t" );
            if ( reportLineParts_AllLinesIndex === reportLineParts_AllLinesIndex_Last ) {
                reportLine += '\n'; // Add '\n' to last line
            }
            reportLine_AllLines.push( reportLine );
        }

        //  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end

        const reportLinesSingleString = reportLine_AllLines.join( '\n' );


        //  For getting search info for projectSearchIds
        const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

        const searchNameObject = searchNamesMap_KeyProjectSearchId.get( this._projectSearchId );
        if ( ! searchNameObject ) {
            throw Error("No searchNameObject for projectSearchId: " + this._projectSearchId );
        }

        const filename = 'proteins-search-' + searchNameObject.searchId + '.txt';

        StringDownloadUtils.downloadStringAsFile( { stringToDownload : reportLinesSingleString, filename: filename } );
    }

    /**
     * Download Protein List, process dataTable_DataRowEntries
     */
    private _downloadProteinList_Process__dataTable_DataGroupRowEntries({ dataTable_DataGroupRowEntries, reportLineParts_AllLines } : {

        dataTable_DataGroupRowEntries: DataTable_DataGroupRowEntry[]
        reportLineParts_AllLines : Array<Array<string>>
    }) {
        for ( const dataTable_DataGroupRowEntry of dataTable_DataGroupRowEntries ) {

            this._downloadProteinList_Process__dataTable_DataRowEntries({ dataTable_DataRowEntries : dataTable_DataGroupRowEntry.dataTable_DataRowEntries, reportLineParts_AllLines });
        }
    }

    /**
     * Download Protein List, process dataTable_DataRowEntries
     */
    private _downloadProteinList_Process__dataTable_DataRowEntries({ dataTable_DataRowEntries, reportLineParts_AllLines } : {

        dataTable_DataRowEntries: DataTable_DataRowEntry[];
        reportLineParts_AllLines : Array<Array<string>>
    }) {
        for ( const dataTable_DataRowEntry of dataTable_DataRowEntries ) {

            const reportLineParts = [];

            for ( const columnEntry of dataTable_DataRowEntry.columnEntries ) {

                let dataForColumn = columnEntry.valueDisplay;
                if ( columnEntry.valueSort !== undefined && columnEntry.valueSort !== null ) {
                    dataForColumn = columnEntry.valueSort;
                }
                reportLineParts.push( dataForColumn )
            }

            reportLineParts_AllLines.push( reportLineParts );
        }
    }


    /**
     * Create searchSubGroup_Ids_Selected
     */
    private _compute_searchSubGroup_Ids_Selected() :  Set<number>
    {
        let searchSubGroup_Ids_Selected : Set<number> = undefined;

        const projectSearchId = this._projectSearchId;

        const searchSubGroups_ForProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        searchSubGroup_Ids_Selected = searchSubGroup_Get_Selected_SearchSubGroupIds({
            searchSubGroup_CentralStateManagerObjectClass : this._searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
        })

        return searchSubGroup_Ids_Selected;
    }

}
