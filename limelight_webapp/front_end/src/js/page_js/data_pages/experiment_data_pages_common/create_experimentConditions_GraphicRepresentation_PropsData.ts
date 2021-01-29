/**
 * create_experimentConditions_GraphicRepresentation_PropsData.ts
 * 
 *   Input:  Experiment Conditions Data - Internal Representation
 *   Output: Experiment Conditions Data - For Display using React Component Experiment_SingleExperiment_ConditionsGraphicRepresentation
 * 
 * Shown when "Add Replicate" is clicked
 */


import { Experiment_ConditionGroupsContainer, Experiment_ConditionGroup, Experiment_Condition } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

import { ExperimentConditions_GraphicRepresentation_PropsData, ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation'
import {ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Cell_Identifiers";


/**
 * @returns null if no data, otherwise { displayTableCells }
 */
const create_experimentConditions_GraphicRepresentation_PropsData = ({ 
    
    conditionGroupsContainer, 
    conditionGroupsDataContainer
} : { 
    conditionGroupsContainer : Experiment_ConditionGroupsContainer, 
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
}) : ExperimentConditions_GraphicRepresentation_PropsData => {

    if ( ! ( conditionGroupsContainer instanceof Experiment_ConditionGroupsContainer ) ) {
        const msg = "ERROR: create_experimentConditions_GraphicRepresentation_PropsData: ! ( conditionGroupsContainer instanceof Experiment_ConditionGroupsContainer )";
        console.warn( msg );
        throw Error( msg );
    }
    if ( ! ( conditionGroupsDataContainer instanceof Experiment_ConditionGroupsDataContainer ) ) {
        const msg = "ERROR: create_experimentConditions_GraphicRepresentation_PropsData: ! ( conditionGroupsDataContainer instanceof ConditionGroupsDataContainer )";
        console.warn( msg );
        throw Error( msg );
    }

    const conditionGroups = conditionGroupsContainer.conditionGroups;

    //  Create flat grid representation of the data for rendering in a table

    //    First conditionGroup is on X axis
    //    Following conditionGroups are on Y axis with nesting like:
    //         (where grp2 is actually on the half line between the grp3 lines)

    //                     grp3
    //            grp2
    //                     grp3
    //            ---------------
    //                     grp3
    //            grp2
    //                     grp3



    const displayTableCells : Array<Array<ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell>> = []; //  Array of Arrays, each sub-array is a row of the table

    if ( conditionGroups && conditionGroups.length !== 0 ) {

        const conditionGroups_Length = conditionGroups.length;

        _addFirstRowCells({ conditionGroups, conditionGroups_Length, displayTableCells });

        _add_AfterFirst_ProcessRows({ conditionGroups, conditionGroups_Length, conditionGroupsDataContainer, displayTableCells });
    }

    if ( displayTableCells.length === 0 ) {
        return null;
    }

    const result = new ExperimentConditions_GraphicRepresentation_PropsData({ displayTableCells, experiment_ConditionGroupsContainer : conditionGroupsContainer });

    return result;
}

/**
 * 
 */
const _addFirstRowCells = ({ 
    
    conditionGroups, 
    conditionGroups_Length, 
    displayTableCells 
} : { 
    conditionGroups : Array<Experiment_ConditionGroup>, 
    conditionGroups_Length : number, 
    displayTableCells : Array<Array<ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell>>
}) : void => {

    

    //  Create first row of cells for top labels using conditionGroups[0] (first group)

    const firstRowCells = [];

    //  First create filler cells for left side cells for labels for condition groups after first group

    const fillerCellsOnLeftCount = conditionGroups_Length - 1;
    for ( let counter = 0; counter < fillerCellsOnLeftCount; counter++ ) {
        const resultCell = { 
            label : "",
            styleOverrides : undefined // object if have overrides
        };
        firstRowCells.push( resultCell );
    }

    {
        const first_conditionGroup = conditionGroups[ 0 ];
        const conditions = first_conditionGroup.conditions;
        for ( const condition of conditions ) {

            const cell_ConditionIds_Path_Array = [ condition.id ]

            const experimentConditions_GraphicRepresentation_ConditionCell_Identifier : ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier = (
                new ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier({ cell_ConditionIds_Path_Array })
            )
            const displayTableCell : ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell = { 
                conditionLabelCell : true,
                label : condition.label, 
                styleOverrides : {
                    textAlign : "center"
                },
                conditionId : condition.id, 
                conditionIdPath : cell_ConditionIds_Path_Array,
                condition, 
                conditionGroup : first_conditionGroup,
                conditionGroupIndex : 0,
                experimentConditions_GraphicRepresentation_ConditionCell_Identifier
            };
            firstRowCells.push( displayTableCell );
        }
    }

    displayTableCells.push( firstRowCells );
}


/**
 * Add rows after first row
 * 
 */
const _add_AfterFirst_ProcessRows = ({ 
    
    conditionGroups, 
    conditionGroups_Length, 
    conditionGroupsDataContainer, 
    displayTableCells 
} : { 
    conditionGroups : Array<Experiment_ConditionGroup>, 
    conditionGroups_Length : number, 
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer,
    displayTableCells : Array<Array<ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell>>
}) : void => {

    


    //  Track current condition index per conditionGroup
    const conditionIndex_PerConditionGroup : Array<number> = [];
    const conditionArrayLength_PerConditionGroup : Array<number> = [];

    //  Array [id_Condition, ...].  With the index into the array the index to conditionGroups
    const ids_Condition_ForCurrentConditionGroupIndexes : Array<number> = [];

    //  Init conditionIndexes with zeros for length of conditionGroups

    for ( let index = 0; index < conditionGroups_Length; index++ ) {
        conditionIndex_PerConditionGroup[ index ] = 0;
        const conditionGroup = conditionGroups[ index ];
        const conditions = conditionGroup.conditions;
        conditionArrayLength_PerConditionGroup[ index ] = conditions.length;
    }

    //  Compute 'rowspan' value to use on condition label cells (on left) for each condition group (skipping the first one at index zero)

    const rowspan_Value_Per_ConditionGroupIndex : Array<number> = [];

    for ( let index = 1; index < conditionGroups_Length; index++ ) {
        let rowSpan = 1;
        //  Process 'child' condition groups (will be to right of current condition group)
        for ( let indexAfterCurrentIndex = ( index + 1 ); indexAfterCurrentIndex < conditionGroups_Length; indexAfterCurrentIndex++ ) {
            const conditionArrayLength = conditionArrayLength_PerConditionGroup[ indexAfterCurrentIndex ];
            rowSpan *= conditionArrayLength;
        }
        rowspan_Value_Per_ConditionGroupIndex[ index ] = rowSpan;
    }

    //  Start main processing

    let row_Starting_ConditionGroup_Index = 1; // Starting index in conditionGroups for current row

    {
        let continueProcessing = true; //  Set to false in processing at bottom of loop
    
        const default_border_TopBottom_Width = 2;

        const border_TopBottom_Width_Increment = 2;

        let tableRowIndex = 1; // initial value of 1 since processing in this function starts at the second row

        while (continueProcessing) {

            const row_TableCells : Array<ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell> = [];

            //   Add Condition Labels to left side of grid.  rowspan is used so for some rows the starting cells are skipped.
            {
                for ( let index = row_Starting_ConditionGroup_Index; index < conditionGroups_Length; index++ ) {
                    //  One entry per Condition Group
                    const conditionGroup = conditionGroups[ index ];
                    const conditions = conditionGroup.conditions;

                    if ( ( ! conditions ) || ( conditions.length === 0 ) ) {
                        //  No conditions so skip
                        continue; //  EARLY CONTINUE
                    }

                    const conditionsIndex = conditionIndex_PerConditionGroup[ index ];
                    const condition = conditions[ conditionsIndex ];

                    if ( ! condition ) {
                        //  No condition so skip
                        continue; //  EARLY CONTINUE
                    }
                    
                    const rowSpan = rowspan_Value_Per_ConditionGroupIndex[ index ];

                    {   //  Update ids_Condition_ForCurrentConditionGroupIndexes
                        ids_Condition_ForCurrentConditionGroupIndexes[ index ] = condition.id;
                    }
                    
                    let styleOverrides = undefined;

                    if ( index > 1 ) {

                        //  Only after first (outermost) condition group (first column of condition labels)

                        styleOverrides = { borderLeftWidth : 2 };

                        let conditionLabelCells_TopWidth_BorderOrPadding = default_border_TopBottom_Width;

                        if ( conditionIndex_PerConditionGroup[ index ] === 0 ) {

                            //  At first condition of group so set borderTopWidth
                                
                            //  Add to conditionLabelCells_borderTopWidth for each condition group after current condition group (to right)
                            for ( let index_conditionIndex_PerConditionGroup = ( conditionGroups_Length - 1 ); index_conditionIndex_PerConditionGroup > index; index_conditionIndex_PerConditionGroup-- ) {
                                if ( conditionIndex_PerConditionGroup[ index_conditionIndex_PerConditionGroup ] !== 0 ) {
                                    break; // EXIT LOOP
                                }
                                conditionLabelCells_TopWidth_BorderOrPadding += border_TopBottom_Width_Increment;
                            }
                            //  Add to conditionLabelCells_borderTopWidth for each condition group at current condition group and before (to left)
                            for ( let index_conditionIndex_PerConditionGroup = index; index_conditionIndex_PerConditionGroup >= 2; index_conditionIndex_PerConditionGroup-- ) {
                                if ( conditionIndex_PerConditionGroup[ index_conditionIndex_PerConditionGroup ] !== 0 ) {
                                    break; // EXIT LOOP
                                }
                                conditionLabelCells_TopWidth_BorderOrPadding += border_TopBottom_Width_Increment;
                            }

                            styleOverrides.borderTopWidth = conditionLabelCells_TopWidth_BorderOrPadding;
                        }

                        let conditionLabelCells_BottomWidth_BorderOrPadding = default_border_TopBottom_Width;
                            
                        if ( conditionIndex_PerConditionGroup[ index ] === ( conditionArrayLength_PerConditionGroup[ index ] - 1 ) ) {

                            //  At last condition of group so compute borderBottomWidth
                                
                            //  Add to conditionLabelCells_borderBottomWidth for each condition group after current condition group (to right)
                            for ( let index_conditionIndex_PerConditionGroup = ( conditionGroups_Length - 1 ); index_conditionIndex_PerConditionGroup > index; index_conditionIndex_PerConditionGroup-- ) { 
                                conditionLabelCells_BottomWidth_BorderOrPadding += border_TopBottom_Width_Increment;
                            }
                            //  Add to conditionLabelCells_borderBottomWidth for each condition group at current condition group and before (to left)
                            for ( let index_conditionIndex_PerConditionGroup = index; index_conditionIndex_PerConditionGroup >= 2; index_conditionIndex_PerConditionGroup-- ) { 
                                if ( conditionIndex_PerConditionGroup[ index_conditionIndex_PerConditionGroup ] !== ( conditionArrayLength_PerConditionGroup[ index_conditionIndex_PerConditionGroup ] - 1 ) ) {
                                    break; // EXIT LOOP
                                }
                                conditionLabelCells_BottomWidth_BorderOrPadding += border_TopBottom_Width_Increment;
                            }

                            styleOverrides.borderBottomWidth = conditionLabelCells_BottomWidth_BorderOrPadding;
                        }

                        //    Commented out since moved assignment to inside above 'if ( )'

                        // if ( conditionIndex_PerConditionGroup[ index ] === 0 ) {

                        //     //  At first condition of group so set borderTopWidth
                        //     styleOverrides.borderTopWidth = conditionLabelCells_TopWidth_BorderOrPadding;
                        // } else {

                        //     //  Commented out since not appear to do anything and is probably the wrong value 
                        //     // styleOverrides.paddingTop = conditionLabelCells_TopWidth_BorderOrPadding;
                        // }

                        // if ( conditionIndex_PerConditionGroup[ index ] === ( conditionArrayLength_PerConditionGroup[ index ] - 1 ) ) {

                        //     //  At last condition of group so compute borderBottomWidth
                        //     styleOverrides.borderBottomWidth = conditionLabelCells_BottomWidth_BorderOrPadding;
                        // } else {

                        //     //  Commented out since not appear to do anything and is probably the wrong value 
                        //     // styleOverrides.paddingBottom = conditionLabelCells_BottomWidth_BorderOrPadding;
                        // }

                    }

                    const cell_ConditionIds_Path_Array : Array<number> = []; // Path starting from 'Left Most' condition in Graphic, so skipping the first condition group which is placed across the top of the grid.

                    for ( let index_ids_Condition_ForCurrentConditionGroupIndexes = 1; index_ids_Condition_ForCurrentConditionGroupIndexes <= index ; index_ids_Condition_ForCurrentConditionGroupIndexes++ ) {
                        const conditionId_In_Ids = ids_Condition_ForCurrentConditionGroupIndexes[ index_ids_Condition_ForCurrentConditionGroupIndexes ];
                        cell_ConditionIds_Path_Array.push( conditionId_In_Ids );
                    }

                    const experimentConditions_GraphicRepresentation_ConditionCell_Identifier : ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier = (
                        new ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier({ cell_ConditionIds_Path_Array })
                    )

                    const displayTableCell : ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell = { 
                        conditionLabelCell : true,
                        label : condition.label,
                        styleOverrides,
                        tableRowIndex,
                        rowSpan,
                        condition, 
                        conditionId : condition.id,
                        conditionIdPath : cell_ConditionIds_Path_Array, // See comment at variable declaration
                        conditionGroup,
                        conditionGroupIndex : index,
                        experimentConditions_GraphicRepresentation_ConditionCell_Identifier
                    };

                    row_TableCells.push( displayTableCell );
                }
            }

            //  Insert cells for main data
            {
                //  Compute Top and Bottom Border Widths

                let mainCells_borderTopWidth = default_border_TopBottom_Width;
                let mainCells_borderBottomWidth = default_border_TopBottom_Width;

                //  Add to mainCells_borderTopWidth for each condition group at first condition 
                //  Start at last and exit when condition group NOT at first condition
                for ( let index = ( conditionGroups_Length - 1 ); index >= 2; index-- ) {
                    if ( conditionIndex_PerConditionGroup[ index ] !== 0 ) {
                        break; // EXIT LOOP
                    }
                    mainCells_borderTopWidth += border_TopBottom_Width_Increment;
                }

                //  Add to mainCells_borderBottomWidth for each condition group at last condition
                //  Start at last and exit when condition group NOT at last condition
                for ( let index = ( conditionGroups_Length - 1 ); index >= 2; index-- ) { 
                    if ( conditionIndex_PerConditionGroup[ index ] !== ( conditionArrayLength_PerConditionGroup[ index ] - 1 ) ) {
                        break; // EXIT LOOP
                    }
                    mainCells_borderBottomWidth += border_TopBottom_Width_Increment;
                }


                //  Insert cells for main data - ACTUAL

                const first_conditionGroup_Index = 0;

                const first_conditionGroup = conditionGroups[ first_conditionGroup_Index ];
                const conditions = first_conditionGroup.conditions;
                for ( const condition of conditions ) {

                    let cellLabel = "Empty";

                    {   //  Update ids_Condition_ForCurrentConditionGroupIndexes
                        ids_Condition_ForCurrentConditionGroupIndexes[ first_conditionGroup_Index ] = condition.id;
                    }

                    //  Make a copy for storage in the cell
                    const ids_Condition = [ ...ids_Condition_ForCurrentConditionGroupIndexes ];

                    const conditionGroupsDataContainer_Entry = conditionGroupsDataContainer.get_data ({ 
                        conditionIds_Array : ids_Condition
                    });

                    if ( conditionGroupsDataContainer_Entry ) {

                        const conditionGroupsDataContainer_Entry_Data = conditionGroupsDataContainer_Entry.data;
                        if ( conditionGroupsDataContainer_Entry_Data ) {
            
                            const projectSearchIds = conditionGroupsDataContainer_Entry_Data.projectSearchIds;
                            if ( projectSearchIds ) {

                                const projectSearchIdsLength = projectSearchIds.size;
                                if ( projectSearchIdsLength !== 0 ) {
                                    const projectSearchIdsLengthString = projectSearchIdsLength.toString();
                                    cellLabel = projectSearchIdsLengthString;
                                }
                            }
                        }
                    }

                    const displayTableCell : ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell = { 
                        mainDataCell : true,
                        label : cellLabel, 
                        tableRowIndex,
                        conditionIdPath: ids_Condition,
                        styleOverrides : {
                            borderTopWidth : mainCells_borderTopWidth, 
                            borderBottomWidth : mainCells_borderBottomWidth, 
                            borderLeftWidth : 2, 
                            borderRightWidth : 2
                        },
                        experimentConditions_GraphicRepresentation_ConditionCell_Identifier : undefined //  Not applicable to Main Data Cells
                    };
                    row_TableCells.push( displayTableCell );
                }
            }

            displayTableCells.push( row_TableCells );

            if ( conditionGroups_Length === 1 ) {

                //  Special Logic to exit loop if only 1 condition group

                break; //  EARLY LOOP EXIT
            }

            //  Set to Last condition group
            row_Starting_ConditionGroup_Index = ( conditionGroups_Length - 1 );

            //  increment last index
            conditionIndex_PerConditionGroup[ ( conditionGroups_Length - 1 ) ]++;

            //  Update indexes in conditionIndex_PerConditionGroup as needed for going past end of array size

            //  First walk backwards through conditionIndex_PerConditionGroup and reset index to zero if exceeded condition array length
            for ( let index = ( conditionGroups_Length - 1 ); index >= 0; index--  ) {

                if ( conditionIndex_PerConditionGroup[ index ] < conditionArrayLength_PerConditionGroup[ index ] ) {
                    //  index is still within range of array so skip/stop this processing
                    break; //  EXIT LOOP
                }
                //  index not within array range
                if ( index ===  1 ) { 

                    //  check for index 1 since index zero is the X-axis labels

                    //  index is 1 so set flag to exit main while(continueProcessing) loop
                    continueProcessing = false;  //  FLAG to EXIT MAIN WHILE LOOP

                    break; //  EXIT FOR LOOP
                }

                // index not within array range so reset to zero and increment prev index
                conditionIndex_PerConditionGroup[ index ] = 0;
                conditionIndex_PerConditionGroup[ ( index - 1 ) ]++;

                //  Set to index position incremented
                row_Starting_ConditionGroup_Index = ( index - 1 );
            }

            tableRowIndex++;
        }
    }
}



export { create_experimentConditions_GraphicRepresentation_PropsData, ExperimentConditions_GraphicRepresentation_PropsData }
