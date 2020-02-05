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

import { Experiment_SingleExperiment_ConditionsGraphicRepresentation } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation';
import { Experiment_ConditionGroupsContainer, Experiment_Condition } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/conditionGroupsDataContainer_Class';
import { create_experimentConditions_GraphicRepresentation_PropsData, ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';

import { SharePage_Component } from 'page_js/data_pages/sharePage_React/sharePage_Component_React';

import { DataTable_RootTableObject } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';
import { SearchNames_AsMap } from 'page_js/data_pages/data_pages_common/dataPageStateManager';


/**
 * Used Externally
 * Held in this.state and the property proteinListDataTable passed to child component
 */
export interface ProteinExperimentPage_Root_Component_ProteinListData_Param {

    proteinCount : number
    proteinListDataTable : DataTable_RootTableObject
}

/**
 * 
 */
export interface ProteinExperimentPage_Root_Component_Props {

    conditionGroupsContainer : Experiment_ConditionGroupsContainer;
    conditionGroupsDataContainer : ConditionGroupsDataContainer;
    searchNamesMap_KeyProjectSearchId : SearchNames_AsMap; // Map with key being project search id
    experimentId : number;
    experimentName : string;
    projectSearchIds : Array<number>;
    experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData
    
    experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 * 
 */
interface ProteinExperimentPage_Root_Component_State {

    proteinListData? : ProteinExperimentPage_Root_Component_ProteinListData_Param;
    proteinListData_Loaded? : boolean;  // Has data been loaded

    saveView_Component_React? //  React Component for Save View
    saveView_Component_Props_Prop? //  Object passed to saveView_Component_React as property propsValue
}

/**
 * 
 */
export class ProteinExperimentPage_Root_Component extends React.Component< ProteinExperimentPage_Root_Component_Props, ProteinExperimentPage_Root_Component_State > {

    //  bind to 'this' for passing as parameters
    private _mainCell_getHoverContents_BindThis = this._mainCell_getHoverContents.bind(this);

    /**
     * 
     */    
    constructor(props : ProteinExperimentPage_Root_Component_Props) {
        super(props);

        let saveView_Component_React = undefined;
        let saveView_Component_Props_Prop = undefined;

        if ( props.experiment_DataPages_LoggedInUser_CommonObjectsFactory ) {
            if ( props.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );
                
                // const enableSetDefault = true;  //  true since on main page
                const enableSetDefault = false; // false for now since Experiment Default View not supported yet

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : props.projectSearchIds, experimentId : props.experimentId, enableSetDefault });
                saveView_Component_React = result.saveView_Component_React
                saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
            }
        }

        this.state = { proteinListData : null, proteinListData_Loaded : false, saveView_Component_React, saveView_Component_Props_Prop };
    }

    /**
     * 
     */    
    set_proteinListDataTable({ proteinListData } : { proteinListData : ProteinExperimentPage_Root_Component_ProteinListData_Param }) {
        
        this.setState( (state: ProteinExperimentPage_Root_Component_State, props: ProteinExperimentPage_Root_Component_Props ) : ProteinExperimentPage_Root_Component_State => {

            return { proteinListData_Loaded : true };
        });

        window.setTimeout( ( ) => {
            this.setState( (state: ProteinExperimentPage_Root_Component_State, props: ProteinExperimentPage_Root_Component_Props ) : ProteinExperimentPage_Root_Component_State => {

                return { proteinListData, proteinListData_Loaded : false };
            });
        }, 10)
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
    _mainCell_getHoverContents({ conditionIdPath } : { conditionIdPath : Array<number> }) {

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

            const proteinListData = this.state.proteinListData;

            const proteinCount = proteinListData.proteinCount;
            const proteinListDataTable = proteinListData.proteinListDataTable;

            proteinData = (

                <div >
                    <div style={ { marginBottom: 10 } }>
                        <span >Protein Count: </span>
                        <span >{ proteinCount }</span>
                    </div>

                    <DataTable_TableRoot
                        tableObject={ proteinListDataTable }
                    />
                </div>
            );

        } else if ( this.state.proteinListData_Loaded ) {

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

                <Experiment_SingleExperiment_ConditionsGraphicRepresentation 
                    data={ this.props.experimentConditions_GraphicRepresentation_PropsData }
                    conditionCellClickHandler={ undefined }
                    mainCellClickHandler={ undefined }
                    mainCell_getHoverContents={ this._mainCell_getHoverContents_BindThis }
                />

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
    conditionGroupsDataContainer : ConditionGroupsDataContainer;
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


	