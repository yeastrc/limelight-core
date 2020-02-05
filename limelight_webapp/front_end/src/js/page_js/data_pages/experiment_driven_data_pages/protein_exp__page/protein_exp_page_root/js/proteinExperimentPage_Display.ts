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

import { DataTable_RootTableObject } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { loadProteinDisplayData_Per_ProjectSearchId } from './proteinExperiment___loadData';
import { createProteinDisplayData } from './proteinExperiment___createProteinDisplayData';

import {
    DataTable_ColumnId,
    DataTable_TableOptions,
    DataTable_TableOptions_dataRowClickHandler_RequestParm,
    
    DataTable_Column,
    DataTable_SortColumnsInfoEntry,

    DataTable_RootTableDataObject,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,

    DataTable_cellMgmt_External,
    DataTable_cellMgmt_External_PopulateRequest,
    DataTable_cellMgmt_External_PopulateResponse,
    DataTable_cellMgmt_ExternalReactComponent
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { ProteinExperimentPage_Root_Component, ProteinExperimentPage_Root_Component_Props, ProteinExperimentPage_Root_Component_ProteinListData_Param } from '../jsx/proteinExperimentPage_Root_Component';

import { ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_WIDTH as _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_HEIGHT as _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component } from '../jsx/proteinExperimentPage_PSMs_Per_Condition_Component';

import { ProteinExperimentPage_Display_SingleProtein } from '../../protein_exp_page_single_protein/js/proteinExperimentPage_Display_SingleProtein';

import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';

// import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';
import { SingleProtein_ExpPage_CentralStateManagerObjectClass } from './singleProtein_ExpPage_CentralStateManagerObjectClass';

import { create_experimentConditions_GraphicRepresentation_PropsData, ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';
import { Experiment_ConditionGroupsContainer, Experiment_ConditionGroup, Experiment_Condition } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { ConditionGroupsDataContainer, ProcessAllDataEntries_callback_Param } from 'page_js/data_pages/experiment_data_pages_common/conditionGroupsDataContainer_Class';



/**
 * Internal Class
 */
class Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry  {
    condition : Experiment_Condition
    projectSearchIds : Set<number>

}


/**
 * 
 */
export class ProteinExperimentPage_Display {
	
    private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

    private _experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory;

    private _experimentId : number;
    private _experimentName : string;

    private _projectSearchIds : Array<number>;

    private _searchDataLookupParamsRoot

    private _conditionGroupsContainer : Experiment_ConditionGroupsContainer;
    private _conditionGroupsDataContainer : ConditionGroupsDataContainer;
    
    private _experimentConditions_GraphicRepresentation_PropsData

    // private _centralPageStateManager : CentralPageStateManager;
    private _singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass;


    private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>;


    // !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
    
    //   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_MultipleSearches_SingleProtein
    
    private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;

    private _renderedReactComponent_ProteinExperimentPage_Root_Component : any;

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
        singleProtein_ExpPage_CentralStateManagerObjectClass

     } : { 
        dataPageStateManager_DataFrom_Server : DataPageStateManager,
        experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory,
        experimentId : number, 
        experimentName : string, 
        projectSearchIds : Array<number>,
        searchDataLookupParamsRoot,
        conditionGroupsContainer : Experiment_ConditionGroupsContainer,
        conditionGroupsDataContainer : ConditionGroupsDataContainer,
        experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData,
        // centralPageStateManager : CentralPageStateManager,
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
        this._singleProtein_ExpPage_CentralStateManagerObjectClass = singleProtein_ExpPage_CentralStateManagerObjectClass;


		// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
		
		//   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_MultipleSearches_SingleProtein
		
		this._loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();
    }
	

	/**
	 * 
	 */
	initialize() {

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
            experimentConditions_GraphicRepresentation_PropsData : this._experimentConditions_GraphicRepresentation_PropsData ,
            // proteinCount : proteinCount ,
            // proteinListDataTable : proteinListDataTable ,
            conditionGroupsContainer : this._conditionGroupsContainer ,
            conditionGroupsDataContainer : this._conditionGroupsDataContainer ,
            searchNamesMap_KeyProjectSearchId : searchNamesMap_KeyProjectSearchId,
            experiment_DataPages_LoggedInUser_CommonObjectsFactory : this._experiment_DataPages_LoggedInUser_CommonObjectsFactory
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

                this._formatAndRenderData({ loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

	/**
	 * 
	 */
	_formatAndRenderData({ 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    } : { 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    }) {

        //  Save for Single Protein processing:
        this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;


        //  Create these Maps elsewhere or store on object of this class
        const proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, { proteinSequenceVersionId : number, name : string, description : string }> = new Map();
        const proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map < number, Array< { name : string, description : string } >> = new Map();

        //  Get for First Condition Group - Hard Code to First Condition Group for now
        let conditions_for_condition_group_with_their_project_search_ids : Array<Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry> = undefined;
        {
            const conditionGroups = this._conditionGroupsContainer.conditionGroups;
            const conditionGroup = conditionGroups[ 0 ];
        
            conditions_for_condition_group_with_their_project_search_ids = _create_conditions_with_their_project_search_ids_for_condition_group({ 
                conditionGroup, conditionGroupsDataContainer : this._conditionGroupsDataContainer 
            });
        }


        // the columns for the data being shown on the page
        const columns = _getProteinDataTableColumns( { conditions_for_condition_group_with_their_project_search_ids /*, projectSearchIds, searchNamesKeyProjectSearchId */ } );


        const createProteinDisplayData_Result = createProteinDisplayData ({ // External Function
            projectSearchIds : this._projectSearchIds, 
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            proteinNameDescription_Key_ProteinSequenceVersionId,
            //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId
        } );

        const proteinList = createProteinDisplayData_Result.proteinList;
        
        const proteinCount = proteinList.length;

		//   Protein List of objects with properties for Data Table
        const proteinList_ForDataTable : Array<DataTable_DataRowEntry> = _createProteinList_ForDataTable( { 
            proteinList, 
            conditions_for_condition_group_with_their_project_search_ids // ,
            // projectSearchIds      
        } );


		{
			const proteinSequenceVersionId_FromURL = this._singleProtein_ExpPage_CentralStateManagerObjectClass.getProteinSequenceVersionId();

			if ( proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null ) {

                console.log( "Have proteinSequenceVersionId_FromURL value" );

				//  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay
                // this._singleProteinRowShowSingleProteinOverlay( { proteinSequenceVersionId : proteinSequenceVersionId_FromURL } ) ;
                
                //  Find dataObject for proteinSequenceVersionId_FromURL

                let proteinListItem_For_proteinSequenceVersionId_FromURL = undefined;

                for ( const dataObject of proteinList_ForDataTable ) {

                    const tableRowClickHandlerParameter = dataObject.tableRowClickHandlerParameter;
                    if ( ! tableRowClickHandlerParameter ) {
                        const msg = "ProteinExperimentPage_Display._formatAndRenderData: no value for tableRowClickHandlerParameter";
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( ! ( tableRowClickHandlerParameter instanceof ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value ) ) {
                        const msg = "ProteinExperimentPage_Display._formatAndRenderData: tableRowClickHandlerParameter not instance of ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value";
                        console.warn( msg );
                        throw Error( msg );
                    }
                    const proteinExperimentPage_Display_tableRowClickHandlerParameter_Value = tableRowClickHandlerParameter as ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value;
    
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

                    this._singleProteinRowShowSingleProteinOverlay({ entry_proteinList_ForDataTable : proteinListItem_For_proteinSequenceVersionId_FromURL });
                } else {
                    console.warn( "No entry in proteinList_ForDataTable for proteinSequenceVersionId_FromURL: " + proteinSequenceVersionId_FromURL );
                }
			}
		}

        //  Add Protein List Data to page:

		const tableDataObject : DataTable_RootTableDataObject = new DataTable_RootTableDataObject({ 
			columns,
			dataTable_DataRowEntries : proteinList_ForDataTable
		});

        const tableOptions = new DataTable_TableOptions({
            dataRowClickHandler : this._proteinListTable_dataRow_ClickHandler_BindThis //  Called when a data row is clicked
        });

        const proteinListDataTable : DataTable_RootTableObject = new DataTable_RootTableObject({ 
            dataTableId : "Experiment Protein List", 
            tableDataObject, tableOptions 
        });

        const proteinListData : ProteinExperimentPage_Root_Component_ProteinListData_Param = {
            proteinCount, proteinListDataTable
        };

        this._renderedReactComponent_ProteinExperimentPage_Root_Component.set_proteinListDataTable({ proteinListData });
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

            // console.log("_proteinListTable_dataRow_ClickHandler, proteinListItem: ")
            // console.log( proteinListItem );

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

        // console.log( "proteinSequenceVersionId: " + proteinSequenceVersionId );

		//  Current Window Scroll position
		const currentWindowScrollY = window.scrollY;

		//  Hide Main Div inside of header/footer
		const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
        $data_page_overall_enclosing_block_div.hide();
        

		//  Create callback function to call on single protein close
		
        const singleProteinCloseCallback = () : void => {

            // console.log("singleProteinCloseCallback(...) called");

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
            experiment_DataPages_LoggedInUser_CommonObjectsFactory : this._experiment_DataPages_LoggedInUser_CommonObjectsFactory
        });

        this._proteinExperimentPage_Display_SingleProtein.initialize();
    }

}

/**
 * DataTable_DataRowEntry.tableRowClickHandlerParameter value
 */
class ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value {

    proteinListItem;
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

//   NOT IN THE CLASS


/**
 * Create Table Columns 
 */
const _getProteinDataTableColumns = function( { 
    conditions_for_condition_group_with_their_project_search_ids 
    /*, projectSearchIds, searchNamesKeyProjectSearchId */ 
} : {
    conditions_for_condition_group_with_their_project_search_ids  : Array<Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
} ) : Array<DataTable_Column> {

    let columns : Array<DataTable_Column> = [ ];

    //  Elements for each row must be in the same order as in this array

    {
        const column : DataTable_Column = {
            id : 'protName', //  Short string that is unique for each column
            displayName :  'Protein(s)',
            sortable: true, // Will sort using Javascript < > on the 'value' property
            width :        350, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
            // heightInitial :        500, // pixels, must be a number.  style 'height' property, not 'maxHeight' property
            //  scroll if too wide
            style_override_DataRowCell_React : { whiteSpace: "nowrap", overflowX: "auto", fontSize: "12px" }, // React format Style overrides
            style_override_HeaderRowCell_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
            // css_class : ' clickable ' // + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' ' 
        };

        columns.push( column );
    }
    
    {
        const column : DataTable_Column = {
            id : 'protDesc', //  Short string that is unique for each column
            displayName :  'Protein Descripton(s)',
            sortable: true, // Will sort using Javascript < > on the 'value' property
            width :        200, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
            // heightInitial :        500, // pixels, must be a number.  style 'height' property, not 'maxHeight' property
            //  elippsis if too wide
            style_override_DataRowCell_React : { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "12px" }, // React format Style overrides
            style_override_HeaderRowCell_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
            // css_class : ' clickable ' // + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' ' 
        };

        columns.push( column );
    }

    // for ( const projectSearchId of projectSearchIds ) {
        
    //     const searchNameObject = searchNamesKeyProjectSearchId[ projectSearchId ];
    //     if ( ! searchNameObject ) {
    //         throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
    //     }
        
    //     const column = {
    //         id : 'nmPsm_' + projectSearchId, //  Short string that is unique for each column
    //         displayName :  'PSMs (' + searchNameObject.searchId + ")" ,
    //         sortable: true, // Will sort using Javascript < > on the 'value' property
    //         width :        80, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
    //         style_override_React : { fontSize: "12px" }, // React format Style overrides
    //         style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
    //         // css_class : ' clickable ' 
    //     };

    //     columns.push( column );
    // }

    for ( const condition_with_its_project_search_ids of conditions_for_condition_group_with_their_project_search_ids ) {

        const condition = condition_with_its_project_search_ids.condition;

        const column : DataTable_Column = {
            id : 'condition_' + condition.id, //  Short string that is unique for each column
            displayName :  "PSMs (" + condition.label + ")" ,
            sortable: true, // Will sort using Javascript < > on the 'value' property
            width :        80, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
            // heightInitial :        500, // pixels, must be a number.  style 'height' property, not 'maxHeight' property
            style_override_DataRowCell_React : { fontSize: "12px" }, // React format Style overrides
            style_override_HeaderRowCell_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
            // css_class : ' clickable ' 
        };

        columns.push( column );
    }

    {
        const column : DataTable_Column = {
            id : 'extFun', //  Short string that is unique for each column
            displayName :  'PSMs per Condition',
            // sortable: true, // Will sort using Javascript < > on the 'value' property

            width :             400, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
            heightInitial :     100, // pixels, must be a number.  style 'height' property, not 'maxHeight' property

            //  prevent line breaks and elippsis if too long
            style_override_DataRowCell_React : { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "12px" }, // React format Style overrides
            style_override_HeaderRowCell_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
            // css_class : ' clickable ' // + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' ' 

            cellMgmt_External : { 
                //  Function called to populate the DOM element on DOM element Mount (React calls componentDidMount())
                populateCellDOMObject_Initial : _PSMs_per_Condition_populateCellDOMObject_Initial
            }
        };

        columns.push( column );
    }

    // {
    //     const column : DataTable_Column = {
    //         id : 'extFun', //  Short string that is unique for each column
    //         displayName :  'PSMs per Condition - React Component - Only Up to 3 Conditions For Initial Testing',
    //         // sortable: true, // Will sort using Javascript < > on the 'value' property

    //         width :             _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
    //         heightInitial :     _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component, // pixels, must be a number.  style 'height' property, not 'maxHeight' property

    //         //  prevent line breaks and elippsis if too long
    //         style_override_React : { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "12px" }, // React format Style overrides
    //         style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
    //         // css_class : ' clickable ' // + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' ' 

    //         cellMgmt_ExternalReactComponent : { 
    //             //  React component to embed inside the <div> for the cell
    //             reactComponent : ProteinExperimentPage_PSMs_Per_Condition_Component
    //         }
    //     };

    //     columns.push( column );
    // }

    // import { ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_WIDTH as _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_HEIGHT as _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component } from '../jsx/proteinExperimentPage_PSMs_Per_Condition_Component';


    return columns;
};

////////////////


/**
 * Create Data Object Array for Protein List Data Table 
 */
const _createProteinList_ForDataTable = function( { proteinList, conditions_for_condition_group_with_their_project_search_ids /*, projectSearchIds */ } : {
    
    proteinList
    conditions_for_condition_group_with_their_project_search_ids  : Array<Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
} ) : Array<DataTable_DataRowEntry> {

    const proteinList_ForDataTable = [];

    let proteinListItem_Index = 0;
    
    for ( const proteinListItem of proteinList ) {
        
        proteinList_ForDataTable.push( _createProteinItem_DataTableEntry( { proteinListItem, proteinListItem_Index, conditions_for_condition_group_with_their_project_search_ids /*, projectSearchIds */ } ) );
        
        proteinListItem_Index++;
    }
    return proteinList_ForDataTable;
}

/**
 * Create Data Object for Single Entry in Protein List Data Table  
 */
const _createProteinItem_DataTableEntry = function( { proteinListItem, proteinListItem_Index, conditions_for_condition_group_with_their_project_search_ids /*, projectSearchIds */ } : {

    proteinListItem, 
    proteinListItem_Index
    conditions_for_condition_group_with_their_project_search_ids  : Array<Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
} ) : DataTable_DataRowEntry {

    //  Elements for each row must be in the same order as in header 

    const proteinItemRecordsMap_Key_projectSearchId = proteinListItem.proteinItemRecordsMap_Key_projectSearchId;

    const proteinSequenceVersionId = proteinListItem.proteinSequenceVersionId;
    const proteinName = proteinListItem.proteinNames;
    const proteinDescription = proteinListItem.proteinDescriptions;

    const columnEntries : Array<DataTable_DataRow_ColumnEntry> = [ 
        {
            valueSort : proteinName, //  for sorting
            valueDisplay : proteinName,
            tooltipText : proteinName   //  For html 'title' property for tooltip display.  Not HTML. Can have \n
        }, 
        {
            valueSort : proteinDescription, //  for sorting
            valueDisplay : proteinDescription,
            tooltipText : proteinDescription   //  For html 'title' property for tooltip display  Not HTML. Can have \n
        }
    ];

    const psmCountsPerCondition = [];


    for ( const  condition_for_condition_group_with_its_project_search_ids of conditions_for_condition_group_with_their_project_search_ids ) {

        //  Get PSM counts per condition

        const condition = condition_for_condition_group_with_its_project_search_ids.condition;
        const projectSearchIds = condition_for_condition_group_with_its_project_search_ids.projectSearchIds;
        
        let numPsms = 0;

        for ( const projectSearchId of projectSearchIds ) {
        
            //  Values per search
        
            const proteinItemRecord = proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );

            if ( proteinItemRecord ) {
                // record for this project search id
                numPsms += proteinItemRecord.numPsms;
            }
        }

        const valueDisplay = numPsms.toLocaleString();

        const columnEntry : DataTable_DataRow_ColumnEntry = {
            valueSort : numPsms, //  for sorting
            valueDisplay,
            tooltipText : undefined
        };

        columnEntries.push( columnEntry );

        const psmCountsPerConditionEntry = {
            condition,
            projectSearchIds,
            numPsms
        }
        psmCountsPerCondition.push( psmCountsPerConditionEntry );
    }

    //  Fake for testing cellMgmt_External
    {
        const columnEntry = {
            cellMgmt_External_Data : {
                proteinName_ForDiv : proteinName,
                psmCountsPerCondition
            }
        };

        columnEntries.push( columnEntry );
    }

    //  Fake for testing cellMgmt_ExternalReactComponent
    // {
    //     const columnEntry = {
    //          cellMgmt_ExternalReactComponent: {
    //                proteinName_ForDiv : proteinName,
    //                psmCountsPerCondition
    //            }
    //     };

    //     columnEntries.push( columnEntry );
    // }

    const proteinExperimentPage_Display_tableRowClickHandlerParameter_Value = new ProteinExperimentPage_Display_tableRowClickHandlerParameter_Value();
    proteinExperimentPage_Display_tableRowClickHandlerParameter_Value.proteinListItem = proteinListItem;

    const rowEntry = 
    { 
        uniqueId : proteinListItem.proteinSequenceVersionId, // Set for Data Table to identify the entry in the table
        sortOrder_OnEquals : proteinListItem_Index,        // For User Sort, order to sort items that are equals for User selected column(s)
        columnEntries,
        tableRowClickHandlerParameter : proteinExperimentPage_Display_tableRowClickHandlerParameter_Value //  Passed back in call from Data Table to method _proteinListTable_dataRow_ClickHandler (Specified in DataTable_TableOptions object)
    };

    return rowEntry;
}



////////////////
////////////////

//    Create Chart in Protein List


//  Create Chart - Initial callback after containing DOM element is mounted in DOM ( React: componentDidMount() )

/**
 * Process the DOM Object in the cell handed from the Data Table React
 */
const _PSMs_per_Condition_populateCellDOMObject_Initial = function( { cellMgmt_External_Data, domObjectInCell, columnWidth, columnHeightInitial, cellMgmt_External } ) {

    // console.log("_PSMs_per_Condition_populateCellDOMObject_Initial(...)")

    let timerId_PopulateCell = window.setTimeout( () => {

        _PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout( { cellMgmt_External_Data, domObjectInCell, columnWidth, columnHeightInitial, cellMgmt_External, cellMgmt_External_Data_InitialPopulation : undefined } );
    }, 10 );

    const domObjectInCell_RemoveContents_Callback = (  ) => {

        if ( timerId_PopulateCell ) {
            window.clearTimeout( timerId_PopulateCell )
        }

        _PSMs_per_Condition_CellCleanup({ domObjectInCell });
    }

    const cellMgmt_External_Data_InitialPopulation = cellMgmt_External_Data;

    const cellMgmt_External_Data_NewValue_Callback = ( { cellMgmt_External_Data } ) => {

        if ( timerId_PopulateCell ) {
            window.clearTimeout( timerId_PopulateCell )
        }
        timerId_PopulateCell = window.setTimeout( () => {
            _PSMs_per_Condition_CellCleanup({ domObjectInCell });

            _PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout({ cellMgmt_External_Data, domObjectInCell, columnWidth, columnHeightInitial, cellMgmt_External, cellMgmt_External_Data_InitialPopulation });
        }, 10 );
    }
    
    //  Returned to Data Table code 
    const result = {
        //  Called before domObjectInCell removed from page.  Remove any contents and remove any listeners added to domObjectInCell
        domObjectInCell_RemoveContents_Callback : domObjectInCell_RemoveContents_Callback,
        //  Called when new value for cellMgmt_External_Data
        cellMgmt_External_Data_NewValue_Callback : cellMgmt_External_Data_NewValue_Callback
    };

    return result;
}

//  Remove Chart - callback after containing DOM element is unmounted (removed) from DOM ( React: componentWillUnmount() )

/**
 * Process the DOM Object in the cell handed from the Data Table React
 */
const _PSMs_per_Condition_CellCleanup = function( { domObjectInCell } ) {

    // console.log( "_PSMs_per_Condition_CellCleanup called " );

    const $domObjectInCell = $( domObjectInCell );
    $domObjectInCell.empty();
}

////////////

//    Create Chart in Protein List - Actually create the chart


/**
 * Process the DOM Object in the cell handed from the Data Table React
 * 
 * @param cellMgmt_External - cellMgmt_External property in column in columns in Data Table Definition
 * @param dataObject_columnEntry_InitialPopulation - dataObject_columnEntry at time of initial population
 */
const _PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout = function( { cellMgmt_External_Data, domObjectInCell, columnWidth, columnHeightInitial, cellMgmt_External, cellMgmt_External_Data_InitialPopulation } ) {

    // console.log("_PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout(...)")

    //  Add Google Chart

    //  chart data for Google charts
    let chartData = [];

    let chartDataHeaderEntry = [ 'PSM Count', "Conditions", {role: "tooltip", 'p': {'html': true} } ]; 
    chartData.push( chartDataHeaderEntry );

    for ( const psmCountsPerConditionEntry of cellMgmt_External_Data.psmCountsPerCondition ) {
        let chartEntry = [ 
            psmCountsPerConditionEntry.condition.label, 
            psmCountsPerConditionEntry.numPsms, 
            //  Tool Tip
            "Condition: " + psmCountsPerConditionEntry.condition.label + ", numPsms: " + psmCountsPerConditionEntry.numPsms ];
        chartData.push( chartEntry );
    }

    //  Overridden for Specific elements like Chart Title and X and Y Axis labels
    const _CHART_DEFAULT_FONT_SIZE = 12;  //  Default font size - using to set font size for tick marks.

    const _TITLE_FONT_SIZE = 15; // In PX
    const _AXIS_LABEL_FONT_SIZE = 14; // In PX
    // const _TICK_MARK_TEXT_FONT_SIZE = 14; // In PX

    // const chartTitle = 'PSM Counts Per Condition';

    let optionsFullsize = {
        //  Overridden for Specific elements like Chart Title and X and Y Axis labels
                        fontSize: _CHART_DEFAULT_FONT_SIZE,  //  Default font size - using to set font size for tick marks.
                        
            // title: chartTitle, // Title above chart
            titleTextStyle: {
//			        color: <string>,    // any HTML string color ('red', '#cc00cc')
//			        fontName: <string>, // i.e. 'Times New Roman'
                fontSize: _TITLE_FONT_SIZE, // 12, 18 whatever you want (don't specify px)
//			        bold: <boolean>,    // true or false
//			        italic: <boolean>   // true of false
            },
            //  X axis label below chart
            // hAxis: { title: 'Charge', titleTextStyle: { color: 'black', fontSize: _AXIS_LABEL_FONT_SIZE }
            // },  
            //  Y axis label left of chart
            // vAxis: { title: 'Count', titleTextStyle: { color: 'black', fontSize: _AXIS_LABEL_FONT_SIZE }
            //     // ,baseline: 0     // always start at zero
            //     // ,ticks: vAxisTicks
            //     // ,maxValue : maxChargeCount
            // },
            legend: { position: 'none' }, //  position: 'none':  Don't show legend of bar colors in upper right corner
            width : columnWidth, 
            height : columnHeightInitial,   // width and height of chart, otherwise controlled by enclosing div
            // colors: [ chartBarColor ],  //  Color of bars
            tooltip: {isHtml: true}
//				,chartArea : { left : 140, top: 60, 
//				width: objectThis.RETENTION_TIME_COUNT_CHART_WIDTH - 200 ,  //  was 720 as measured in Chrome
//				height : objectThis.RETENTION_TIME_COUNT_CHART_HEIGHT - 120 }  //  was 530 as measured in Chrome
    };        


    //  Get reference to Google Charts.  
    
    //    Request to Load Google Charts Done above and the Promise if returned is waited for so is an error if Google Charts not loaded at this point.

    //  Object returned with Properties
    const loadGoogleChart_CoreChartResult = loadGoogleChart_CoreChart();

    if ( ! loadGoogleChart_CoreChartResult.isLoaded ) {
        const msg = "_PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout: loadGoogleChart_CoreChartResult.isLoaded is not true";
        console.warn( msg );
        throw Error( msg );
    }

    if ( ! loadGoogleChart_CoreChartResult.google ) {
        const msg = "_PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout: loadGoogleChart_CoreChartResult.google is not populated";
        console.warn( msg );
        throw Error( msg );
    }

    const google = loadGoogleChart_CoreChartResult.google;

    // console.log( "_PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout" )

    // create the chart
    const data = google.visualization.arrayToDataTable( chartData );
    const chartFullsize = new google.visualization.ColumnChart( domObjectInCell );
    chartFullsize.draw(data, optionsFullsize);

}


///////////////

/**
 * Create conditions for first condition group with their project search ids 
 */
const _create_conditions_with_their_project_search_ids_for_condition_group = function({ conditionGroup, conditionGroupsDataContainer } : { 
    
    conditionGroup : Experiment_ConditionGroup
    conditionGroupsDataContainer : ConditionGroupsDataContainer
}) : Array<Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry> {

    const conditions = conditionGroup.conditions;

    //  Accumulate projectSearchIds Per id_Condition

    const conditionIds_For_ConditionGroup : Set<number> = new Set();

    for ( const condition of conditions ) {
        conditionIds_For_ConditionGroup.add( condition.id );
    }

    //  Map<Int, Set>  Map<[id_Condition],Set([projectSearchIds]).  Contents restricted to conditionIds_For_ConditionGroup
    const projectSearchIds_Map_Key_id_Condition : Map<number, Set<number>> = new Map();

    // const projectSearchIds_All = new Set();
                
    const processAllDataEntries_Callback = ( param : ProcessAllDataEntries_callback_Param ) => {

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
    conditionGroupsDataContainer.processAllDataEntries({ callback : processAllDataEntries_Callback });


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
