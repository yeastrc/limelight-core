/**
 * proteinExperimentPage_Display.ts
 * 
 * Display Javascript for protein_Experiment.jsp page  
 * 
 * 
 */


import React from 'react';
import ReactDOM from 'react-dom';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { loadGoogleChart_CoreChart }  from 'page_js/data_pages/data_pages_common/googleChartLoaderForThisWebapp';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { loadProteinDisplayData_Per_ProjectSearchId } from './proteinExperiment___loadData';
import {
    proteinExperiment_CreateProteinDisplayData, ProteinExperiment_CreateProteinDisplayData_Result
} from './proteinExperiment___createProteinDisplayData';

import {
    DataTable_TableOptions,
    DataTable_RootTableObject,
    DataTable_RootTableDataObject,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { ProteinExperimentPage_Root_Component, ProteinExperimentPage_Root_Component_Props, ProteinExperimentPage_Root_Component_ProteinListData_Param } from '../jsx/proteinExperimentPage_Root_Component';

import { ProteinExperimentPage_Display_SingleProtein } from '../../protein_exp_page_single_protein/js/proteinExperimentPage_Display_SingleProtein';

import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';

import { Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass } from '../../../../experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass';
import { SingleProtein_ExpPage_CentralStateManagerObjectClass } from './singleProtein_ExpPage_CentralStateManagerObjectClass';

import { ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';
import { Experiment_ConditionGroupsContainer, Experiment_ConditionGroup, Experiment_Condition } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer, Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';
import {
    create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
    ExperimentConditions_GraphicRepresentation_SelectedCells
} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections";
import {proteinExperiment__createProteinList_DataTable_RootTableDataObject} from "./proteinExperiment__createProteinList_DataTable_RootTableDataObject";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {get_DynamicModificationsForReportedPeptideIds} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_GetDynamicModificationsForReportedPeptides";
import {ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_search_and_other_filters_block/proteinViewPage_ProteinGroupingFilterSelectionComponent";
import {ProteinExperiment__CreateProteinDataTableColumns_Class} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperiment__createProteinList_DataTable_ColumnObject";
import {get_OpenModificationsForReportedPeptideIds} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_Get_Open_ModificationsForReportedPeptides";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";



/**
 *
 */
export class ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry  {
    condition : Experiment_Condition
    projectSearchIds : Set<number>
}

/**
 * DataTable_DataRowEntry.tableRowClickHandlerParameter value
 */
export class ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value {

    proteinListItem;
}

/**
 * 
 */
export class ProteinExperimentPage_Display {

    private _selectedConditionIdsUpdated_Callback_BindThis = this._selectedConditionIdsUpdated_Callback.bind(this);
    private _proteinGroup_SelectionValues_Changed_Callback_BindThis = this._proteinGroup_SelectionValues_Changed_Callback.bind(this);

    private _data_LoadedFor_ComputedReportedPeptides_AllProteins = false;

    private _proteinListTable_SetInRootComponent : boolean = false;

    private _usedForCurrentDisplay__experiment_SelectedConditionIdsAndPaths_AsJSON : String
	
    private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

    private _experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory;

    private _experimentId : number;
    private _experimentName : string;

    private _projectSearchIds : Array<number>;

    private _searchDataLookupParamsRoot : SearchDataLookupParameters_Root

    private _conditionGroupsContainer : Experiment_ConditionGroupsContainer;
    private _conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer;
    
    private _experimentConditions_GraphicRepresentation_PropsData

    // private _centralPageStateManager : CentralPageStateManager;
    private _experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;
    private _proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    private _singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass;


    private _proteinExperiment__CreateProteinDataTableColumns_Class : ProteinExperiment__CreateProteinDataTableColumns_Class;


    private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>;


    // !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
    
    //   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_MultipleSearches_SingleProtein
    
    private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;

    private _renderedReactComponent_ProteinExperimentPage_Root_Component : ProteinExperimentPage_Root_Component;

    private _proteinExperimentPage_Display_SingleProtein : ProteinExperimentPage_Display_SingleProtein;


    private _proteinListTable_dataRow_ClickHandler_BindThis : ({ 
        event, 
        tableRowClickHandlerParameter 
    } : { 
        event : React.MouseEvent<HTMLTableRowElement, MouseEvent>
        tableRowClickHandlerParameter : any 
    }) => void = ( 
        this._proteinListTable_dataRow_ClickHandler.bind(this)
    );


	/**
	 * 
	 */
	constructor({ 
        dataPageStateManager_DataFrom_Server,
        experiment_DataPages_LoggedInUser_CommonObjectsFactory,
        experimentId, 
        experimentName, 
        projectSearchIds,
        searchDataLookupParamsRoot,
        conditionGroupsContainer,
        conditionGroupsDataContainer,
        experimentConditions_GraphicRepresentation_PropsData,
        // centralPageStateManager,
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
        proteinGrouping_CentralStateManagerObjectClass,
        singleProtein_ExpPage_CentralStateManagerObjectClass

     } : { 
        dataPageStateManager_DataFrom_Server : DataPageStateManager,
        experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory,
        experimentId : number, 
        experimentName : string, 
        projectSearchIds : Array<number>,
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        conditionGroupsContainer : Experiment_ConditionGroupsContainer,
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer,
        experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData,
        // centralPageStateManager : CentralPageStateManager,
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass

     }) {

        this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

        this._experiment_DataPages_LoggedInUser_CommonObjectsFactory = experiment_DataPages_LoggedInUser_CommonObjectsFactory;

        this._experimentId = experimentId;
        this._experimentName = experimentName;

        this._projectSearchIds = projectSearchIds;

		this._searchDataLookupParamsRoot = searchDataLookupParamsRoot;

		this._conditionGroupsContainer = conditionGroupsContainer;
		this._conditionGroupsDataContainer = conditionGroupsDataContainer;
        
        this._experimentConditions_GraphicRepresentation_PropsData = experimentConditions_GraphicRepresentation_PropsData;

        // this._centralPageStateManager = centralPageStateManager;
        this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;
        this._proteinGrouping_CentralStateManagerObjectClass = proteinGrouping_CentralStateManagerObjectClass;
        this._singleProtein_ExpPage_CentralStateManagerObjectClass = singleProtein_ExpPage_CentralStateManagerObjectClass;


		// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
		
		//   this._loadedDataCommonHolder is shared with this._proteinExperimentPage_Display_SingleProtein
		
		this._loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

		this._proteinExperiment__CreateProteinDataTableColumns_Class = new ProteinExperiment__CreateProteinDataTableColumns_Class();
    }
	

	/**
	 * 
	 */
	initialize() {


        //  Save current values:

        this._usedForCurrentDisplay__experiment_SelectedConditionIdsAndPaths_AsJSON = JSON.stringify( this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.getDataForEncoding() );


        //  For getting search info for projectSearchIds.  Object with property name being project search id
        const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

        //  Render to page:

        const containerDOMElement = document.getElementById("protein_experiment_data_page_overall_enclosing_block_div");

        if ( ! containerDOMElement ) {
            throw Error("No DOM element with id 'protein_experiment_data_page_overall_enclosing_block_div'");
        }

        containerDOMElement.style.display = ""; //  Remove display : none


        //  Called on render complete
        const renderCompleteCallbackFcn = () => {

        };


        const proteinExperimentPage_Root_Component_Props : ProteinExperimentPage_Root_Component_Props = {

            experimentId : this._experimentId,
            experimentName : this._experimentName ,
            projectSearchIds : this._projectSearchIds,
            searchDataLookupParamsRoot : this._searchDataLookupParamsRoot,
            experimentConditions_GraphicRepresentation_PropsData : this._experimentConditions_GraphicRepresentation_PropsData ,
            conditionGroupsContainer : this._conditionGroupsContainer ,
            conditionGroupsDataContainer : this._conditionGroupsDataContainer ,
            searchNamesMap_KeyProjectSearchId : searchNamesMap_KeyProjectSearchId,
            experiment_DataPages_LoggedInUser_CommonObjectsFactory : this._experiment_DataPages_LoggedInUser_CommonObjectsFactory,

            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
            proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass,

            selectedConditionIdsUpdated_Callback : this._selectedConditionIdsUpdated_Callback_BindThis,
            proteinGroup_SelectionValues_Changed_Callback : this._proteinGroup_SelectionValues_Changed_Callback_BindThis

            //      Passed in later when data loaded by calling method on rendered Component
            // proteinCount : proteinCount ,
            // proteinListDataTable : proteinListDataTable ,

        }
		

        //  Create React component instance using React.createElement(...) so don't have to make this file .tsx
		const proteinExperimentPage_Root_Component = (
			React.createElement(
                ProteinExperimentPage_Root_Component,
                proteinExperimentPage_Root_Component_Props,
                null
            )
        )

        this._renderedReactComponent_ProteinExperimentPage_Root_Component = ReactDOM.render( 
            proteinExperimentPage_Root_Component,
            containerDOMElement,
            renderCompleteCallbackFcn 
        );
    

        const allPromises = [];

        //  Load Data
        
        const promise_loadProteinDisplayData_Per_ProjectSearchId = loadProteinDisplayData_Per_ProjectSearchId({
            projectSearchIds : this._projectSearchIds, 
            searchDataLookupParamsRoot : this._searchDataLookupParamsRoot
        });

        allPromises.push( promise_loadProteinDisplayData_Per_ProjectSearchId );

        promise_loadProteinDisplayData_Per_ProjectSearchId.catch( (reason) => {  });

        //  Load Google Charts

        //  Object returned with Properties
		const loadGoogleChart_CoreChartResult = loadGoogleChart_CoreChart();

		if ( ! loadGoogleChart_CoreChartResult.isLoaded ) {
            allPromises.push( loadGoogleChart_CoreChartResult.loadingPromise );
        }
        
        const promiseAll = Promise.all( allPromises );

        promiseAll.then( ( promiseResults ) => {
            try {
                let loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = undefined;

                for ( const promiseResult of promiseResults ) {
                    if ( promiseResult && promiseResult.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = promiseResult.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
                    }
                }

                if ( ! loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                    const msg = "loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds not found as property on any promise result";
                    console.warn( msg );
                    throw Error( msg );
                }

                //  Save for later processing: re-render protein list and Single Protein
                this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;

                this._displayProteinListOnPage();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

	/**
	 * 
	 */
	_selectedConditionIdsUpdated_Callback() {

        //  Save current values:

        this._usedForCurrentDisplay__experiment_SelectedConditionIdsAndPaths_AsJSON = JSON.stringify( this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.getDataForEncoding() );

        //  Cancel Queued DOM updates to add PSM Count Charts
        this._proteinExperiment__CreateProteinDataTableColumns_Class.cancel_scheduledDOMUpdates();

        //  Update Page

        // window.setTimeout( () => {
        //     try {
        //         //  Run in settimeout so Update to FilterBlock paints first so user gets immediate visual feedback

                // Update rest of page with new values

                this._displayProteinListOnPage();

        //     } catch (e) {
        //         reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
        //         throw e;
        //     }
        // }, 10 )
    }

    /**
     *
     */
    _proteinGroup_SelectionValues_Changed_Callback( params: ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param ) {

        // console.warn("_proteinGroup_SelectionValues_Changed_Callback")

        //  Cancel Queued DOM updates to add PSM Count Charts
        this._proteinExperiment__CreateProteinDataTableColumns_Class.cancel_scheduledDOMUpdates();

        //  Update Page

        // window.setTimeout( () => {
        //     try {
        //         //  Run in settimeout so Update to FilterBlock paints first so user gets immediate visual feedback

                // Update rest of page with new values

                this._displayProteinListOnPage();

        //     } catch (e) {
        //         reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
        //         throw e;
        //     }
        // }, 10 )
    }

    /**
     *
     */
    private _displayProteinListOnPage() {

        if ( ! this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

            //  Grouping Proteins selected so Load data needed for Computed Reported Peptides, All Proteins

            if ( this._data_LoadedFor_ComputedReportedPeptides_AllProteins ) {

                //  Data already loaded

                this._displayProteinListOnPage_ActualRender();

            } else {

                //  Grouping Proteins selected so Load data needed for Computed Reported Peptides, All Proteins

                const promises_loadDataFor_ComputedReportedPeptides_AllProteins = _loadDataFor_ComputedReportedPeptides_AllProteins( {
                    projectSearchIds : this._projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                });

                if ( promises_loadDataFor_ComputedReportedPeptides_AllProteins.length !== 0 ) {

                    //  Have Data to Load so update page to "Loading Data State"

                    this._renderedReactComponent_ProteinExperimentPage_Root_Component.clear_proteinListDataTable();

                    const promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises = Promise.all( promises_loadDataFor_ComputedReportedPeptides_AllProteins );

                    promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises.catch( (reason) => {});

                    promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises.then( (value) => {
                        try {
                            // Data Loaded for Computed Reported Peptides

                            this._data_LoadedFor_ComputedReportedPeptides_AllProteins = true;

                            this._displayProteinListOnPage_ActualRender();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    });
                } else {

                    // NO data To Load for Computed Reported Peptides so immediately execute this._displayProteinListOnPage_ActualRender( { projectSearchIds } );

                    this._displayProteinListOnPage_ActualRender();
                }
            }
        } else {

            // Grouping Proteins NOT selected so immediately execute this._displayProteinListOnPage_ActualRender( { projectSearchIds } );

            this._displayProteinListOnPage_ActualRender();
        }
    }

	/**
	 * 
	 */
    private _displayProteinListOnPage_ActualRender() {

        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;

        //  Create these Maps elsewhere or store on object of this class
        const proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, { proteinSequenceVersionId : number, name : string, description : string }> = new Map();
        const proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId : Map < number, Array< { name : string, description : string } >> = new Map();

        //  Get for First Condition Group - Hard Code to First Condition Group for now
        let conditions_for_condition_group_with_their_project_search_ids : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry> = undefined;
        {
            const conditionGroups = this._conditionGroupsContainer.conditionGroups;
            const conditionGroup = conditionGroups[ 0 ];
        
            conditions_for_condition_group_with_their_project_search_ids = _create_conditions_with_their_project_search_ids_for_condition_group({ 
                conditionGroup, 
                conditionGroupsContainer : this._conditionGroupsContainer,
                conditionGroupsDataContainer : this._conditionGroupsDataContainer,
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
            });
        }

        //  Get all Project Search Ids after filtering to use for generating the protein list

        let projectSearchIds_ToDisplayProteinsFor_Array : Array<number> = undefined;
        {
            const projectSearchIds_ToDisplayProteinsFor_Set : Set<number> = new Set();
            for ( const entry of conditions_for_condition_group_with_their_project_search_ids ) {
                for ( const projectSearchId of entry.projectSearchIds ) {
                    projectSearchIds_ToDisplayProteinsFor_Set.add( projectSearchId )
                }
            }
            projectSearchIds_ToDisplayProteinsFor_Array = Array.from( projectSearchIds_ToDisplayProteinsFor_Set );
        }

        const createProteinDisplayData_Result : ProteinExperiment_CreateProteinDisplayData_Result = proteinExperiment_CreateProteinDisplayData ({ // External Function
            projectSearchIds : projectSearchIds_ToDisplayProteinsFor_Array,
            proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            proteinNameDescription_Key_ProteinSequenceVersionId,
            //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
            proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId
        } );

        const proteinList = createProteinDisplayData_Result.proteinList;
        
        const proteinCount = proteinList.length;

        //    DataTable_RootTableDataObject Object from Protein List
        const rootTableDataObject: DataTable_RootTableDataObject = proteinExperiment__createProteinList_DataTable_RootTableDataObject( {
            proteinList, 
            conditions_for_condition_group_with_their_project_search_ids,
            proteinGroups_ArrayOf_ProteinGroup : createProteinDisplayData_Result.proteinGroups_ArrayOf_ProteinGroup,
            proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass,
            proteinExperiment__CreateProteinDataTableColumns_Class : this._proteinExperiment__CreateProteinDataTableColumns_Class
        } );

        let proteinGroupCount = null;

        if ( rootTableDataObject.dataTable_DataGroupRowEntries ) {

            proteinGroupCount = rootTableDataObject.dataTable_DataGroupRowEntries.length;
        }

        let directlyShowingSingleProtein = false;

		{
			const proteinSequenceVersionId_FromURL = this._singleProtein_ExpPage_CentralStateManagerObjectClass.getProteinSequenceVersionId();

			if ( proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null ) {

                console.log( "Have proteinSequenceVersionId_FromURL value" );

				//  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay
                // this._singleProteinRowShowSingleProteinOverlay( { proteinSequenceVersionId : proteinSequenceVersionId_FromURL } ) ;
                
                //  Find dataObject for proteinSequenceVersionId_FromURL

                let proteinListItem_For_proteinSequenceVersionId_FromURL = undefined;

                // if ( rootTableDataObject.dataTable_DataRowEntries ) {

                for ( const dataObject of rootTableDataObject.dataTable_DataRowEntries ) {

                    //  Cast in this assignment. Will validate the type next with ( tableRowClickHandlerParameter instanceof ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value )
                    const proteinExperimentPage_Display_tableRowClickHandlerParameter_Value : ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value = (
                        dataObject.tableRowClickHandlerParameter as ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value
                    );
                    if ( ! proteinExperimentPage_Display_tableRowClickHandlerParameter_Value ) {
                        const msg = "ProteinExperimentPage_Display._formatAndRenderData: no value for tableRowClickHandlerParameter";
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( ! ( proteinExperimentPage_Display_tableRowClickHandlerParameter_Value instanceof ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value ) ) {
                        const msg = "ProteinExperimentPage_Display._formatAndRenderData: tableRowClickHandlerParameter not instance of ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value";
                        console.warn( msg );
                        throw Error( msg );
                    }

                    const proteinListItem = proteinExperimentPage_Display_tableRowClickHandlerParameter_Value.proteinListItem;
                    if ( ! proteinListItem ) {
                        const msg = "ProteinExperimentPage_Display._formatAndRenderData: no value for proteinListItem";
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( proteinListItem.proteinSequenceVersionId === undefined || proteinListItem.proteinSequenceVersionId === null ) {
                        const msg = "ProteinExperimentPage_Display._formatAndRenderData: no value for proteinListItem.proteinSequenceVersionId";
                        console.warn( msg );
                        throw Error( msg );
                    }

                    if ( proteinListItem.proteinSequenceVersionId === proteinSequenceVersionId_FromURL ) {
                        proteinListItem_For_proteinSequenceVersionId_FromURL = proteinListItem;
                        break;
                    }
                }
            
                if ( proteinListItem_For_proteinSequenceVersionId_FromURL ) {

                    directlyShowingSingleProtein = true;

                    this._singleProteinRowShowSingleProteinOverlay({ entry_proteinList_ForDataTable : proteinListItem_For_proteinSequenceVersionId_FromURL });

                } else {
                    console.warn( "No entry in proteinList_ForDataTable for proteinSequenceVersionId_FromURL: " + proteinSequenceVersionId_FromURL );
                }
			}
		}

		if ( directlyShowingSingleProtein ) {

            this._proteinListTable_SetInRootComponent = false;

        } else {

		    //  Only add Protein List to Page if not having just added the Single Protein Overlay to the page and HIDDEN the main Page display which contains the Protein List

            //  Add Protein List Data to page:

            const tableOptions = new DataTable_TableOptions({
                dataRowClickHandler: this._proteinListTable_dataRow_ClickHandler_BindThis //  Called when a data row is clicked
            });

            const proteinListDataTable: DataTable_RootTableObject = new DataTable_RootTableObject({
                dataTableId: "Experiment Protein List",
                tableDataObject: rootTableDataObject, tableOptions
            });

            const proteinListData: ProteinExperimentPage_Root_Component_ProteinListData_Param = {
                proteinCount, proteinGroupCount, proteinListDataTable
            };

            this._renderedReactComponent_ProteinExperimentPage_Root_Component.set_proteinListDataTable({proteinListData});

            this._proteinListTable_SetInRootComponent = true;
        }
    }

    ///////////////////////

    /////  Protein List  - Data Table Row - Click Handler

    /**
     * Data Table Row has been clicked - Protein List 
     */
    _proteinListTable_dataRow_ClickHandler({ event, tableRowClickHandlerParameter } : { event : React.MouseEvent<HTMLTableRowElement, MouseEvent>, tableRowClickHandlerParameter : any }) {
        try {
            // console.log("_proteinListTable_dataRow_ClickHandler(...):  uniqueId: " + uniqueId + ", dataObject: ");
            // console.log( dataObject );

            if ( ! tableRowClickHandlerParameter ) {
                const msg = "ProteinExperimentPage_Display._proteinListTable_dataRow_ClickHandler: no value for tableRowClickHandlerParameter";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! ( tableRowClickHandlerParameter instanceof ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value ) ) {
                const msg = "ProteinExperimentPage_Display._proteinListTable_dataRow_ClickHandler: tableRowClickHandlerParameter not instance of ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value";
                console.warn( msg );
                throw Error( msg );
            }
            const proteinExperimentPage_Display_tableRowClickHandlerParameter_Value = tableRowClickHandlerParameter as ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value;

            const proteinListItem = proteinExperimentPage_Display_tableRowClickHandlerParameter_Value.proteinListItem;
            if ( ! proteinListItem ) {
                const msg = "ProteinExperimentPage_Display._proteinListTable_dataRow_ClickHandler: no value for proteinListItem";
                console.warn( msg );
                throw Error( msg );
            }
            if ( proteinListItem.proteinSequenceVersionId === undefined || proteinListItem.proteinSequenceVersionId === null ) {
                const msg = "ProteinExperimentPage_Display._proteinListTable_dataRow_ClickHandler: no value for proteinListItem.proteinSequenceVersionId";
                console.warn( msg );
                throw Error( msg );
            }

            const proteinSequenceVersionId = proteinListItem.proteinSequenceVersionId;

            this._singleProtein_ExpPage_CentralStateManagerObjectClass.setProteinSequenceVersionId( { proteinSequenceVersionId } );

            this._singleProteinRowShowSingleProteinOverlay({ entry_proteinList_ForDataTable : proteinListItem });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Show Single Protein Data in Overlay
     * 
     * Called from dataRow ClickHandler
     * Called from on page load when have Single Protein ID in URL
     */
    _singleProteinRowShowSingleProteinOverlay({ entry_proteinList_ForDataTable }) {

        const proteinSequenceVersionId = entry_proteinList_ForDataTable.proteinSequenceVersionId;

		//  Current Window Scroll position
		const currentWindowScrollY = window.scrollY;

		//  Hide Main Div inside of header/footer
		const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
        $data_page_overall_enclosing_block_div.hide();
        
		//  Create callback function to call on single protein close
		
        const singleProteinCloseCallback = () : void => {

			const proteinSequenceVersionIdLocal = proteinSequenceVersionId;

			//  Show Main Div inside of header/footer
			const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
			$data_page_overall_enclosing_block_div.show();

			if ( currentWindowScrollY ) {

				//  Scroll window down to original position when protein was clicked to open Single Protein view
				
				//  Web standard, should be supported in Edge but doesn't seem to work in Edge
				// window.scrollTo({ top : currentWindowScrollY });

				$( window ).scrollTop( currentWindowScrollY );
            }

			let calledMethod_formatAndRenderData = false;

            {
                const currentValue__experiment_SelectedConditionIdsAndPaths_AsJSON = JSON.stringify( this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.getDataForEncoding() );

                //  If selected condition ids have changed, update protein list

                let hasChanged = false;
                if ( currentValue__experiment_SelectedConditionIdsAndPaths_AsJSON !== this._usedForCurrentDisplay__experiment_SelectedConditionIdsAndPaths_AsJSON ) {
                    hasChanged = true;
                }

                if ( hasChanged ) {
                    
                    //  Save current values:

                    this._usedForCurrentDisplay__experiment_SelectedConditionIdsAndPaths_AsJSON = currentValue__experiment_SelectedConditionIdsAndPaths_AsJSON;

                    // update page

                    this._renderedReactComponent_ProteinExperimentPage_Root_Component.rebuild_graphicRepresentation_SelectedCells();

                    this._displayProteinListOnPage();

                    calledMethod_formatAndRenderData = true;
                }
            }

			if ( ( ! this._proteinListTable_SetInRootComponent ) && ( ! calledMethod_formatAndRenderData ) ) {

                this._displayProteinListOnPage();

                calledMethod_formatAndRenderData = true;
            }
        }

        this._proteinExperimentPage_Display_SingleProtein = new ProteinExperimentPage_Display_SingleProtein({ 
            
            proteinSequenceVersionId,
            proteinListItem : entry_proteinList_ForDataTable, 
            
            singleProteinCloseCallback,

            loadedDataCommonHolder : this._loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,

            dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
            
            experimentId : this._experimentId,
            experimentName : this._experimentName, 
            projectSearchIds : this._projectSearchIds,

            searchDataLookupParamsRoot : this._searchDataLookupParamsRoot,
            conditionGroupsContainer : this._conditionGroupsContainer,
            conditionGroupsDataContainer : this._conditionGroupsDataContainer,
            
            experimentConditions_GraphicRepresentation_PropsData : this._experimentConditions_GraphicRepresentation_PropsData,
            singleProtein_ExpPage_CentralStateManagerObjectClass : this._singleProtein_ExpPage_CentralStateManagerObjectClass,
            experiment_DataPages_LoggedInUser_CommonObjectsFactory : this._experiment_DataPages_LoggedInUser_CommonObjectsFactory,
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
        });

        this._proteinExperimentPage_Display_SingleProtein.initialize();
    }

}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

//   NOT IN THE CLASS


///////////////

/**
 * Create conditions for first condition group with their project search ids 
 */
const _create_conditions_with_their_project_search_ids_for_condition_group = function({ 
    
    conditionGroup, conditionGroupsContainer, conditionGroupsDataContainer, experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
} : { 
    
    conditionGroup : Experiment_ConditionGroup
    conditionGroupsContainer : Experiment_ConditionGroupsContainer // Needed by called code
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
    experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass

}) : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry> {

    const experimentConditions_GraphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells = (
        create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
            conditionGroupsContainer
        })
    );

    const conditions = conditionGroup.conditions;

    //  Accumulate projectSearchIds Per id_Condition

    const conditionIds_For_ConditionGroup : Set<number> = new Set();

    for ( const condition of conditions ) {

        const condition_id = condition.id;
        conditionIds_For_ConditionGroup.add( condition_id );
    }

    //  Map<Int, Set>  Map<[id_Condition],Set([projectSearchIds]).  Contents restricted to conditionIds_For_ConditionGroup
    const projectSearchIds_Map_Key_id_Condition : Map<number, Set<number>> = new Map();

    // const projectSearchIds_All = new Set();
                
    const processAllDataEntries_Callback = ( param : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) => {

        const conditionIds_Path = param.conditionIds_Path;
        const data = param.data;

        // console.log( ": callback: data:" );
        // console.log( data );
        const dataProperty = data.data;
        if ( dataProperty ) {
            const projectSearchIds = dataProperty.projectSearchIds;
            if ( projectSearchIds && projectSearchIds.size !== 0 ) {

                for ( const conditionIds_Path_Entry of conditionIds_Path ) {

                    if ( conditionIds_For_ConditionGroup.has( conditionIds_Path_Entry ) ) {
                        //  have entry for ConditionGroup collecting data for
                        const id_Condition = conditionIds_Path_Entry;
                        let projectSearchIds_For_id_Condition = projectSearchIds_Map_Key_id_Condition.get( id_Condition );
                        if ( ! projectSearchIds_For_id_Condition ) {
                            projectSearchIds_For_id_Condition = new Set();
                            projectSearchIds_Map_Key_id_Condition.set( id_Condition, projectSearchIds_For_id_Condition );
                        }
                        for ( const projectSearchId of projectSearchIds ) {
                            projectSearchIds_For_id_Condition.add( projectSearchId );
                        }
                    }
                }
            }
        }
    }
    conditionGroupsDataContainer.processAllDataEntries_ForSelectedConditionIds_ConditionGroupsDataContainer({ 
        callback : processAllDataEntries_Callback, experimentConditions_GraphicRepresentation_SelectedCells, conditionGroupsContainer
    });


    //  Array of each condition with it's projectSearchIds

    const result = [];

    for ( const condition of conditions ) {

        const id_Condition = condition.id;

        const projectSearchIds_For_id_Condition  = projectSearchIds_Map_Key_id_Condition.get( id_Condition );

        if ( projectSearchIds_For_id_Condition ) {

            const resultEntry = {
                condition,
                projectSearchIds : projectSearchIds_For_id_Condition
            }
            result.push( resultEntry );
        }
    }

    // console.log( "_create_conditions_with_their_project_search_ids_for_condition_group: result: ", result )

    return result;
}



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/**
 *
 */
const _loadDataFor_ComputedReportedPeptides_AllProteins = function( { projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds } : {

    projectSearchIds : Array<number>
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

} ) : Array<Promise<any>> {

    const promises__get_Array : Array<Promise<any>> = [];

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            const msg = "ProteinViewPage_Display_MultipleSearches: _loadDataFor_ComputedReportedPeptides_AllProteins: no value in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        //  Process for all reportedPeptideIds for projectSearchId

        const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
        if ( ! reportedPeptideIds ) {
            const msg = "ProteinViewPage_Display_MultipleSearches: _loadDataFor_ComputedReportedPeptides_AllProteins: no value in loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        {
            const promise_get__ = get_DynamicModificationsForReportedPeptideIds({ loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds });

            if ( promise_get__ ) { //  May return null so test before add to array
                promises__get_Array.push( promise_get__ );
            }
        }
        {
            const promise_get__ = get_OpenModificationsForReportedPeptideIds({ loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds });

            if ( promise_get__ ) { //  May return null so test before add to array
                promises__get_Array.push( promise_get__ );
            }
        }
        {
            const promise_get__ = loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( { reportedPeptideIds, projectSearchId, loadedDataPerProjectSearchIdHolder } );

            if ( promise_get__ ) { //  May return null so test before add to array
                promises__get_Array.push( promise_get__ );
            }
        }
    }

    return promises__get_Array;
}
