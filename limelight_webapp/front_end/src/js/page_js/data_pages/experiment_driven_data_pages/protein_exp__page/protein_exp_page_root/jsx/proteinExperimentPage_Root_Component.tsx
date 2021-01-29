/**
 * proteinExperimentPage_Root_Component.tsx
 * 
 * Root of Protein Experiment Page - Main Display - inserted into <div> with id 'protein_experiment_data_page_overall_enclosing_block_div' in 
 * 
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


import React from 'react'

// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';

import { SaveView_Create_Component_React_Type, SaveView_Create_Component_React_Result } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'

import { ExperimentConditions_GraphicRepresentation_SelectedCells, create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass, ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams, ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_Callback_Definition } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections';
import { Experiment_SingleExperiment_ConditionsGraphicRepresentation, ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params, ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents, ExperimentConditions_GraphicRepresentation_ConditionCellClickHandler, ExperimentConditions_GraphicRepresentation_ConditionCellClickHandler_Params } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation';
import { Experiment_ConditionGroupsContainer, Experiment_Condition } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';
import { ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';

import { SharePage_Component } from 'page_js/data_pages/sharePage_React/sharePage_Component_React';

import {DataTable_DataGroupRowEntry, DataTable_DataRowEntry, DataTable_RootTableObject} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';
import { SearchNames_AsMap } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass } from '../../../../experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass';
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {
    ProteinPage_ProteinGroupingFilterSelection_Component_Root,
    ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
    ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_search_and_other_filters_block/proteinViewPage_ProteinGroupingFilterSelectionComponent";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import { SaveView_Component_Props_Prop} from "page_js/data_pages/saveView_React/saveView_Component_React";
import {StringDownloadUtils} from "page_js/data_pages/data_pages_common/downloadStringAsFile";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds} from "page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds";


/**
 * Used Externally
 * Held in this.state and the property proteinListDataTable passed to child component
 */
export interface ProteinExperimentPage_Root_Component_ProteinListData_Param {

    proteinCount : number
    proteinGroupCount : number
    proteinListDataTable : DataTable_RootTableObject
}

/**
 * 
 */
export interface ProteinExperimentPage_Root_Component_Props {

    conditionGroupsContainer : Experiment_ConditionGroupsContainer;
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer;
    searchNamesMap_KeyProjectSearchId : SearchNames_AsMap; // Map with key being project search id
    experimentId : number;
    experimentName : string;
    projectSearchIds : Array<number>;
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData
    
    experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
    proteinGrouping_CentralStateManagerObjectClass: ProteinGrouping_CentralStateManagerObjectClass


    experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory

    selectedConditionIdsUpdated_Callback
    proteinGroup_SelectionValues_Changed_Callback
}

/**
 * 
 */
interface ProteinExperimentPage_Root_Component_State {

    proteinListData? : ProteinExperimentPage_Root_Component_ProteinListData_Param;
    proteinListData_DisplayLoadedMessage? : boolean;  // Has data been loaded
    proteinList_Updating? : boolean;    // Updating Protein List

    saveView_Component_React? //  React Component for Save View
    saveView_Component_Props_Prop? : SaveView_Component_Props_Prop //  Object passed to saveView_Component_React as property propsValue

    //  Selected cells in Experiment_SingleExperiment_ConditionsGraphicRepresentation
    graphicRepresentation_SelectedCells? : ExperimentConditions_GraphicRepresentation_SelectedCells

    proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue? : ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue
}

/**
 * 
 */
export class ProteinExperimentPage_Root_Component extends React.Component< ProteinExperimentPage_Root_Component_Props, ProteinExperimentPage_Root_Component_State > {

    //  bind to 'this' for passing as parameters

    //  For class methods that are '.bind(this)' and cast to a function type:
    //     Add a cast to same function type without the '.bind(this)' in the constructor to local variable to validate that the local function properly implements the function type
    //        (missing or mis-typed parameters will error.  extra properties in a object in the parameters will not error)

    private _proteinGroup_SelectionValues_Changed_Callback_BindThis = this._proteinGroup_SelectionValues_Changed_Callback.bind(this);
    private _CAST_TEST_ONLY_proteinGroup_SelectionValues_Changed_Callback : ( params: ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param ) => void = this._proteinGroup_SelectionValues_Changed_Callback;

    private _selectedConditionsChanged_Callback_BindThis : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_Callback_Definition = this._selectedConditionsChanged_Callback.bind(this);
    private _CAST_TEST_ONLY_selectedConditionsChanged_Callback : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_Callback_Definition = this._selectedConditionsChanged_Callback;

    private _mainCell_getHoverContents_BindThis = this._mainCell_getHoverContents.bind(this);
    private _CAST_TEST_ONLY_mainCell_getHoverContents : ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents = this._mainCell_getHoverContents;

    private _downloadProteinList_Clicked_BindThis = this._downloadProteinList_Clicked.bind(this)
    private _downloadPSMList_Clicked_BindThis = this._downloadPSMList_Clicked.bind(this)

    /**
     * 
     */    
    constructor(props : ProteinExperimentPage_Root_Component_Props) {
        super(props);

        let saveView_Component_React : any = undefined; // class SaveView_Component
        let saveView_Component_Props_Prop : SaveView_Component_Props_Prop = undefined;

        if ( props.experiment_DataPages_LoggedInUser_CommonObjectsFactory ) {
            if ( props.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : props.projectSearchIds, experimentId : props.experimentId });
                saveView_Component_React = result.saveView_Component_React
                saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
            }
        }
        
        //  Set object used by Experiment_SingleExperiment_ConditionsGraphicRepresentation

        const graphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells = (
            create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({ // External Function

                //  Will be used for population of ExperimentConditions_GraphicRepresentation_SelectedCells_IF
                // Will be Updated for changes in Selected Conditions
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this.props.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
                conditionGroupsContainer : this.props.conditionGroupsContainer,
                selectedConditionsChanged_Callback : this._selectedConditionsChanged_Callback_BindThis
            })
        );


        const proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue = new ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue({
            displayOnly : false,
            proteinGrouping_CentralStateManagerObjectClass : this.props.proteinGrouping_CentralStateManagerObjectClass,
            filterValuesChanged_Callback : this._proteinGroup_SelectionValues_Changed_Callback_BindThis
        })

        //  In filterValuesChanged_Callback:
        //     create new object of ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue and put back in page
        //      Trigger update to load additional data for Protein Grouping if needed. proteinListData_DisplayLoadedMessage as needed.
        //     after setTimeout, update proteinListData, proteinList_Updating : true,

        this.state = { 
            proteinListData : null, 
            proteinListData_DisplayLoadedMessage : false, 
            proteinList_Updating : false,
            graphicRepresentation_SelectedCells,
            proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
            saveView_Component_React, 
            saveView_Component_Props_Prop
         };
    }

    /**
     * Called for updates to graphicRepresentation_SelectedCells from close of Single Protein
     */
    rebuild_graphicRepresentation_SelectedCells() {

        const graphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells = (
            create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({ // External Function

                //  Will be used for population of ExperimentConditions_GraphicRepresentation_SelectedCells_IF
                // Will be Updated for changes in Selected Conditions
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this.props.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
                conditionGroupsContainer : this.props.conditionGroupsContainer,
                selectedConditionsChanged_Callback : this._selectedConditionsChanged_Callback_BindThis
            })
        );

        this.setState( (state: ProteinExperimentPage_Root_Component_State, props: ProteinExperimentPage_Root_Component_Props ) : ProteinExperimentPage_Root_Component_State => {

            return { graphicRepresentation_SelectedCells };
        });
    }


    /**
     * Called to clear proteinListData since loading new data
     */
    clear_proteinListDataTable() : void {

        this.setState((state: ProteinExperimentPage_Root_Component_State, props: ProteinExperimentPage_Root_Component_Props): ProteinExperimentPage_Root_Component_State => {

            return {proteinListData: null, proteinListData_DisplayLoadedMessage: false};
        });
    }

    /**
     * Called for initial setting of proteinListData and for changes based on changed filtering (selection on experiment graphic and maybe change search filtering in future)
     */    
    set_proteinListDataTable({ proteinListData } : { proteinListData : ProteinExperimentPage_Root_Component_ProteinListData_Param }) {
        
        this.setState( (state: ProteinExperimentPage_Root_Component_State, props: ProteinExperimentPage_Root_Component_Props ) : ProteinExperimentPage_Root_Component_State => {

            return { proteinListData_DisplayLoadedMessage : true };
        });
        if (  this.state.proteinListData && ( this.state.proteinListData.proteinCount > 20 || proteinListData.proteinCount > 20 ) ) {
            // Have existing protein list so display "Updating List" message

            this.setState( (state: ProteinExperimentPage_Root_Component_State, props: ProteinExperimentPage_Root_Component_Props ) : ProteinExperimentPage_Root_Component_State => {

                return { proteinList_Updating : true };
            });
        }

        window.setTimeout( ( ) => {
            this.setState( (state: ProteinExperimentPage_Root_Component_State, props: ProteinExperimentPage_Root_Component_Props ) : ProteinExperimentPage_Root_Component_State => {

                return { proteinListData, proteinListData_DisplayLoadedMessage : false, proteinList_Updating : false };
            });
        }, 10)
    }

    /**
     *
     */
    private _proteinGroup_SelectionValues_Changed_Callback( params: ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param ) {

        const proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue = new ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue({
            displayOnly : false,
            proteinGrouping_CentralStateManagerObjectClass : this.props.proteinGrouping_CentralStateManagerObjectClass,
            filterValuesChanged_Callback : this._proteinGroup_SelectionValues_Changed_Callback_BindThis
        })

        this.setState((state: ProteinExperimentPage_Root_Component_State, props: ProteinExperimentPage_Root_Component_Props): ProteinExperimentPage_Root_Component_State => {

            return { proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue };
        });

        // Update rest of page with new values

        this.props.proteinGroup_SelectionValues_Changed_Callback( params );
    }

    /**
     * After render()
     */
    // componentDidMount() {

    //     // console.log("ProteinExperimentPage_Root_Component: componentDidMount");

    //     window.setTimeout( ( ) => {
    
    //     }, 10)
    // }

    /**
     * 
     */
    // componentDidUpdate() {


    // }

    /**
     * 
     */
    // _conditionCellClickHandler( params : ExperimentConditions_GraphicRepresentation_ConditionCellClickHandler_Params ) {

        // const event : React.MouseEvent<HTMLElement, MouseEvent> = params.event;
        // const condition_Id : number = params.condition_Id
        // const conditionGroup_Id : number = params.conditionGroup_Id;
        // // entryCell_onMouseLeaveHandler : ({ event } : { event : React.MouseEvent<HTMLElement, MouseEvent> }) => void

        // //  Update Page State Object

        // let selectedConditionIds = this.props.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIds();
        // if ( ! selectedConditionIds ) {
        //     selectedConditionIds = new Set();
        // }

        // if ( event.metaKey || event.ctrlKey ) {
        //     if ( selectedConditionIds.has( condition_Id ) ) {
        //         selectedConditionIds.delete( condition_Id );
        //     } else {
        //         selectedConditionIds.add( condition_Id );
        //     }
        // } else {
        //     selectedConditionIds.clear();
        //     selectedConditionIds.add( condition_Id );
        // }

        // this.props.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.set_selectedConditionIds( selectedConditionIds );

        // //  Update object used by Experiment_SingleExperiment_ConditionsGraphicRepresentation

        // let graphicRepresentation_SelectedCells_Local : ExperimentConditions_GraphicRepresentation_SelectedCells_IF = undefined;
        // if ( this.state.graphicRepresentation_SelectedCells ) {

        //     graphicRepresentation_SelectedCells_Local = this.state.graphicRepresentation_SelectedCells.shallowClone();
        // } else {
        //     graphicRepresentation_SelectedCells_Local = new ExperimentConditions_GraphicRepresentation_SelectedCells_IF();
        // }

        // graphicRepresentation_SelectedCells_Local.set_Selection_ConditionIds( selectedConditionIds );

        // this.setState({ graphicRepresentation_SelectedCells : graphicRepresentation_SelectedCells_Local });

    /**
     * 
     */
    _selectedConditionsChanged_Callback( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) : void {

        // Trigger update of protein list

        this.props.selectedConditionIdsUpdated_Callback();
    }

    /**
     * 
     */    
    _mainCell_getHoverContents( params : ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params ) {

        const conditionIdPath = params.conditionIdPath;
        
        const conditionGroupsContainer = this.props.conditionGroupsContainer;
        const conditionGroupsDataContainer = this.props.conditionGroupsDataContainer;
        const searchNamesMap_KeyProjectSearchId = this.props.searchNamesMap_KeyProjectSearchId;

        return _mainCell_getHoverContents_StandAlone({ 
            conditionIdPath, conditionGroupsContainer, conditionGroupsDataContainer, searchNamesMap_KeyProjectSearchId 
        });
    }

    /**
     *
     */
    private _downloadProteinList_Clicked() {

        if ( this.state.proteinListData ) {
            _downloadProteinList({proteinListData: this.state.proteinListData, experimentId : this.props.experimentId})
        }
    }


    /**
     *
     */
    private _downloadPSMList_Clicked() {

        _downloadPSMs({ experimentId : this.props.experimentId, projectSearchIds : this.props.projectSearchIds, searchDataLookupParamsRoot : this.props.searchDataLookupParamsRoot });
    }

    /**
     * 
     */    
    render() {

        // console.log("ProteinExperimentPage_Root_Component")

        //  

        let saveView_Component = undefined;

        let proteinData = undefined;

        if ( this.state.proteinListData ) {

            if ( this.state.saveView_Component_React ) {

                //  Create "Save View" Component

                //  variable must start with Constant "S" since is React Component
                const SaveView_Component_React = this.state.saveView_Component_React;
                const saveView_Component_Props_Prop = this.state.saveView_Component_Props_Prop;

                saveView_Component = (

                    <React.Fragment>

                        <SaveView_Component_React 
                            propsValue={ saveView_Component_Props_Prop }
                        />

                        <span >&nbsp;</span>

                    </React.Fragment>
                )
            }
            {
                let proteinData_LoadingCover : JSX.Element = undefined;

                if ( this.state.proteinList_Updating ) {

                    // Overlay Protein Count and List with "Updating" message

                    proteinData_LoadingCover = (

                        <div className=" block-updating-overlay-container " >
                            Updating Protein List
                        </div>
                    )
                }

                const proteinListData = this.state.proteinListData;

                const proteinCount = proteinListData.proteinCount;
                const proteinGroupCount = proteinListData.proteinGroupCount;
                const proteinListDataTable = proteinListData.proteinListDataTable;

                let proteinCount_String = proteinCount.toString();
                try {
                    proteinCount_String = proteinCount.toLocaleString();
                } catch(e) {

                }

                let proteinGroupCount_String = undefined;
                if ( proteinGroupCount ) {
                    proteinGroupCount_String = proteinGroupCount.toString();
                    try {
                        proteinGroupCount_String = proteinGroupCount.toLocaleString();
                    } catch(e) {

                    }
                }

                proteinData = (

                    <div >
                        <div style={ { position : "relative", display: "inline-block" } }> {/* display: "inline-block"  so overlay message only as wide as table */}
                            <div style={ { marginBottom: 10 } }>
                                { ( proteinGroupCount_String ) ? (
                                    <span style={ { paddingRight: 15, whiteSpace: "nowrap" } }>
                                        <span>Protein Group Count: </span>
                                        <span>{ proteinGroupCount_String }</span>
                                    </span>
                                ) : null }
                                <span >Protein Count: </span>
                                <span >{ proteinCount_String }</span>


                                <span style={ { paddingLeft: 10, whiteSpace: "nowrap" } }  className=" fake-link " onClick={ this._downloadProteinList_Clicked_BindThis }>
                                    Download Proteins
                                </span>

                                {/*In Progress but needs more coding*/}
                                {/*<span style={ { paddingLeft: 10, whiteSpace: "nowrap" } } className=" fake-link " onClick={ this._downloadPSMList_Clicked_BindThis }>*/}
                                {/*    Download PSMs*/}
                                {/*</span>*/}

                            </div>

                            <DataTable_TableRoot
                                tableObject={ proteinListDataTable }
                            />

                            { proteinData_LoadingCover }
                        </div>
                        <br /> {/* since prev <div> is display: "inline-block" */}
                    </div>
                );
        }

        } else if ( this.state.proteinListData_DisplayLoadedMessage ) {

            proteinData = (
                <div >Loaded, Display Next</div>
            );
        
        } else {
            proteinData = (
                <div >Loading</div>
            );
        }

        return (
            <div >
                <h3>
                    List Proteins
                </h3>
                <h3>
                    Experiment: <span id="experiment_name">{ this.props.experimentName }</span>
                </h3>

                <div>
                    <Experiment_SingleExperiment_ConditionsGraphicRepresentation
                        data={ this.props.experimentConditions_GraphicRepresentation_PropsData }
                        selectedCells={ this.state.graphicRepresentation_SelectedCells }
                        conditionGroupsContainer={ this.props.conditionGroupsContainer }
                        manage_SelectedCells_ConditionCell_Selection_UserClick_Updates={ true }
                        conditionCellClickHandler={ undefined /* this._conditionCellClickHandler_BindThis */ }
                        mainCellClickHandler={ undefined }
                        mainCell_getHoverContents={ this._mainCell_getHoverContents_BindThis }
                    />
                </div>

                <div style={ { marginTop: 10 } }>
                    <SearchDetailsAndOtherFiltersOuterBlock_Layout >
                        <ProteinPage_ProteinGroupingFilterSelection_Component_Root
                            propValue={ this.state.proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue }
                        />
                    </SearchDetailsAndOtherFiltersOuterBlock_Layout>
                </div>

                <div style={ { marginTop: 10 } }>

                    { saveView_Component }

                    <SharePage_Component
                        experimentId={ this.props.experimentId }
                        projectSearchIds={ this.props.projectSearchIds }
                    />

                </div>

                <h3>
                    Protein List:
                </h3>

                <div >
                    { proteinData }
                </div>
            </div>
        );
    }

}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//   Not in a class:


/**
 * 
 */
const _mainCell_getHoverContents_StandAlone = function({ 
    conditionIdPath, 
    conditionGroupsContainer, 
    conditionGroupsDataContainer, 
    searchNamesMap_KeyProjectSearchId 
} : { 
    conditionIdPath : Array<number>, 
    conditionGroupsContainer : Experiment_ConditionGroupsContainer;
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer;
    searchNamesMap_KeyProjectSearchId  : SearchNames_AsMap
}) {
    // console.log("_mainCell_getHoverContents_StandAlone")

    const conditionGroupsDisplay = [];

    if ( conditionIdPath ) {

        if ( conditionGroupsContainer ) {
            const conditionGroups = conditionGroupsContainer.conditionGroups;
            if ( conditionGroups ) {
                const conditionGroupsLength = conditionGroups.length;

                for ( let index_conditionGroups = 0; index_conditionGroups < conditionGroupsLength; index_conditionGroups++ ) {
                    
                    const conditionGroup = conditionGroups[ index_conditionGroups ];
                    const conditions = conditionGroup.conditions;

                    let condition_For_cell_conditionIdPath : Experiment_Condition = undefined;

                    for ( const condition_Entry of conditions ) {
                        for ( const cell_conditionIdPath of conditionIdPath ) {
                            if ( condition_Entry.id === cell_conditionIdPath ) {
                                condition_For_cell_conditionIdPath = condition_Entry;
                                break;
                            }
                        }
                        if ( condition_For_cell_conditionIdPath ) {
                            break;
                        }
                    }

                    if ( ! condition_For_cell_conditionIdPath ) {
                        //  No entry found so skip
                        continue;  // EARLY CONTINUE
                    } 

                    const conditionGroupDisplay = (
                        <li key={ index_conditionGroups } style={ { whiteSpace : "nowrap", marginBottom: 3 } }>
                            <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                            >{ conditionGroup.label }</span>
                            <span >:&nbsp;</span> 
                            <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                            >{ condition_For_cell_conditionIdPath.label }</span>
                        </li>
                    );
                    
                    conditionGroupsDisplay.push( conditionGroupDisplay );
                }
            }
        }
    }

    let searchesDisplay = undefined;
    {
        let conditionGroupsDataContainer_Entry = conditionGroupsDataContainer.get_data ({ 
            conditionIds_Array : conditionIdPath
        });

        // let projectSearchIdsString = "none";

        if ( conditionGroupsDataContainer_Entry ) {

            const conditionGroupsDataContainer_Entry_Data = conditionGroupsDataContainer_Entry.data;

            const projectSearchIds = conditionGroupsDataContainer_Entry_Data.projectSearchIds;

            if ( projectSearchIds ) {
                //  projectSearchIds is Set
                const projectSearchIdsArray = Array.from( projectSearchIds );
                if ( projectSearchIdsArray.length !== 0 ) {

                    const searchDataEntries = [];

                    for ( const projectSearchIdsArray_Entry of projectSearchIdsArray ) {

                        const projectSearchId = (projectSearchIdsArray_Entry as number);

                        //  searchNamesMap_KeyProjectSearchId is Map with projectSearchId as keys
                        const searchDataEntry = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
                        if ( ! searchDataEntry ) {
                            console.log("WARN: No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
                            continue; // EARLY CONTINUE
                        }
                        searchDataEntries.push( searchDataEntry );
                    }

                    searchDataEntries.sort( (a,b) => { // sort on searchId ascending
                        if (a.searchId < b.searchId) {
                            return -1;
                        } else if (a.searchId > b.searchId) {
                            return 1;
                        }
                        return 0
                    })

                    const searchComponents = [];
                    {
                        let index = 0;
                        for ( const searchDataEntry of searchDataEntries ) {
                            const searchComponent = (
                                <li key={ index } style={ { marginBottom: 4 } }>
                                    <span >(</span> 
                                    <span >{ searchDataEntry.searchId }</span>
                                    <span >) </span> 
                                    <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                                    >{ searchDataEntry.name }</span>
                                </li>
                            );
                            searchComponents.push( searchComponent );
                            index++;
                        }
                    }
                    searchesDisplay = (
                        <div >
                            <div style={ { fontWeight: "bold", marginTop: 5, marginBottom: 5 } }>
                                Searches:
                            </div>
                            <div >
                                <ul style={ { marginBlockStart: 0, marginBlockEnd: 0 } }>
                                    { searchComponents }
                                </ul>
                            </div>
                        </div>
                    )
                }
            }
        }
    }
    if ( searchesDisplay === undefined ) {
        searchesDisplay = (
            <div style={ { marginTop: 5, marginBottom: 5 } }>
                <span style={ { fontWeight: "bold" } }>Searches:</span>
                <span >&nbsp;empty</span>
            </div>
        );
    }

    const hoverContent = (
        <div style={ { textAlign : "left" } }>
            <div style={ { fontWeight: "bold", marginBottom: 5 } }>
                Conditions:
            </div>
            <div >
                <ul style={ { marginBlockStart: 0, marginBlockEnd: 0 } }>
                    { conditionGroupsDisplay }
                </ul>
            </div>
            <div >
                { searchesDisplay }
            </div>
        </div>
    );


    return { hoverContent };
}

///////////////
///////////////

/**
 *
 */
const _downloadProteinList = function({ proteinListData, experimentId } : {

    proteinListData : ProteinExperimentPage_Root_Component_ProteinListData_Param
    experimentId : number
}) {

    const proteinListDataTable = proteinListData.proteinListDataTable;

    const proteinDisplayDataAsString = _createProteinDisplayDownloadDataAsString( proteinListDataTable );

    if (!proteinDisplayDataAsString) {

        window.alert("No data to download")
        return // EARLY RETURN
    }


    const filename = 'proteins-search-' + experimentId + '.txt';

    StringDownloadUtils.downloadStringAsFile({stringToDownload: proteinDisplayDataAsString, filename: filename});
}

/**
 *
 */
const _createProteinDisplayDownloadDataAsString = function( proteinListDataTable: DataTable_RootTableObject ) : string {

    if (!proteinListDataTable) {

        window.alert("No data to download")
        return // EARLY RETURN
    }

    const tableDataObject = proteinListDataTable.tableDataObject

    //  Array of Arrays of reportLineParts
    const reportLineParts_AllLines : Array<Array<string>> = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join

    //  reportLineParts will be joined with separator '\t'

    const columnIndexesToSkip : Set<number> = new Set()

    //  Header Line
    {
        const reportLineParts = [];

        for ( let index = 0; index < tableDataObject.columns.length; index++ ) {

            const column = tableDataObject.columns[ index ]

            if ( "PSMs per Condition" === column.displayName ) {

                //  Skipping this column

                columnIndexesToSkip.add( index )

            } else {

                reportLineParts.push(column.displayName);
            }
        }

        reportLineParts_AllLines.push(reportLineParts);
    }

    if ( tableDataObject.dataTable_DataRowEntries ) {
        _createProteinDisplayDownloadDataAsString_Process_dataTable_DataRowEntries({ dataTable_DataRowEntries : tableDataObject.dataTable_DataRowEntries, columnIndexesToSkip, reportLineParts_AllLines })

    } else if ( tableDataObject.dataTable_DataGroupRowEntries ) {

        _createProteinDisplayDownloadDataAsString_Process_dataTable_DataGroupRowEntries({ dataTable_DataGroupRowEntries : tableDataObject.dataTable_DataGroupRowEntries, columnIndexesToSkip, reportLineParts_AllLines })

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
const _createProteinDisplayDownloadDataAsString_Process_dataTable_DataGroupRowEntries = function({ dataTable_DataGroupRowEntries, columnIndexesToSkip, reportLineParts_AllLines } : {

    dataTable_DataGroupRowEntries: DataTable_DataGroupRowEntry[]
    columnIndexesToSkip : Set<number>
    reportLineParts_AllLines : Array<Array<string>>
}) {

    for ( const dataTable_DataGroupRowEntry of dataTable_DataGroupRowEntries ) {

        _createProteinDisplayDownloadDataAsString_Process_dataTable_DataRowEntries({ dataTable_DataRowEntries : dataTable_DataGroupRowEntry.dataTable_DataRowEntries, columnIndexesToSkip, reportLineParts_AllLines })
    }
}

/**
 *
 */
const _createProteinDisplayDownloadDataAsString_Process_dataTable_DataRowEntries = function({ dataTable_DataRowEntries, columnIndexesToSkip, reportLineParts_AllLines } : {

    dataTable_DataRowEntries : DataTable_DataRowEntry[]
    columnIndexesToSkip : Set<number>
    reportLineParts_AllLines : Array<Array<string>>
}) {

    //  Data Lines
    for (const dataTable_DataRowEntry of dataTable_DataRowEntries) {

        const reportLineParts = [];

        for ( let index = 0; index < dataTable_DataRowEntry.columnEntries.length; index++ ) {

            if ( columnIndexesToSkip.has( index) ) {

                //  Skip this column
                continue  // EARLY CONTINUE
            }

            const columnEntry = dataTable_DataRowEntry.columnEntries[ index ]

            let dataForColumn = columnEntry.valueDisplay;
            if ( columnEntry.valueSort !== undefined && columnEntry.valueSort !== null ) {
                dataForColumn = columnEntry.valueSort;
            }
            reportLineParts.push(dataForColumn)
        }

        reportLineParts_AllLines.push(reportLineParts);
    }
}


///////////////
///////////////


/**
 *
 */
const _downloadPSMs = function({ experimentId, projectSearchIds, searchDataLookupParamsRoot } : {

    experimentId : number
    projectSearchIds : Array<number> //  Filtered based on experiment graphic
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
}) {

    const projectSearchIdsReportedPeptideIdsPsmIds = [];

    for ( const projectSearchId of projectSearchIds ) {

        throw Error(" Need to compute conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId before can execute this code")

        // const experimentDataForSearch = conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId.get( projectSearchId );
        // if ( experimentDataForSearch === undefined ) {
        //     const msg = "No value in conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId;
        //     console.warn( msg );
        //     throw Error( msg );
        // }
        //
        // const projectSearchIdsReportedPeptideIdsPsmIds_Entry = { projectSearchId, experimentDataForSearch };
        //
        // projectSearchIdsReportedPeptideIdsPsmIds.push(projectSearchIdsReportedPeptideIdsPsmIds_Entry);
    }

    downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {
        experimentId,
        projectSearchIdsReportedPeptideIdsPsmIds,
        searchDataLookupParamsRoot : searchDataLookupParamsRoot,
        proteinSequenceVersionIds : undefined
    } );

}
