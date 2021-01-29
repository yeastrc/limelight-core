/**
 * proteinExperimentPage_SingleProtein_MainContent_Component_mainCell_getHoverContents_StandAlone.tsx
 * 
 * Functions for proteinExperimentPage_SingleProtein_MainContent_Component.tsx
 * 
 * '.tsx' since contains JSX in at least function mainCell_getHoverContents_StandAlone
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


import React from 'react'

import { Experiment_ConditionGroupsContainer, Experiment_Condition } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';
import { SearchNames_AsMap } from 'page_js/data_pages/data_pages_common/dataPageStateManager';


/**
 * 
 */
const mainCell_getHoverContents_StandAlone = function({ 
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
                            console.log("WARN: No entry in searchNamesMap_KeyProjectSearchId for projectSearchId: " + projectSearchId );
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

	

///////////////////////////////////////////////


export { 
    mainCell_getHoverContents_StandAlone
}
