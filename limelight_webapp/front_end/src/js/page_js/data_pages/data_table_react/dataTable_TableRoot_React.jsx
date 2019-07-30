/**
 * dataTable_TableRoot_React.jsx
 * 
 * Actual Table Root
 */
import React from 'react'

import { SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DECENDING } from "./dataTable_constants.js";

import { DataTable_Table_HeaderRowEntry }  from './dataTable_Table_HeaderRowEntry_React.jsx';
import { DataTable_Table_DataRow } from './dataTable_Table_DataRow_React.jsx';
import { DataTable_Table_DataRow_Group } from './dataTable_Table_DataRow_Group_React.jsx';

/**
 * 
 */
export class DataTable_TableRoot extends React.Component {

    constructor(props) {
        super(props);
        // this._headerColumnClicked = this._headerColumnClicked.bind(this);
        this.state = {
            tableObject: props.tableObject,
            tableOptions : props.tableOptions,
            sortColumnsInfo : undefined
        };
    }

    /**
     * 
     */
    update_tableObject({ tableObject, tableOptions }) {

        this.setState( ( existingState ) => {

            // Important: read `existingState` instead of `this.state` when updating.

            return { tableObject, tableOptions, sortColumnsInfo : undefined };
        });
    }

    /**
     * 
     */
    _headerColumnClicked({ event, columnId }) {

        const shiftKeyDown = event.shiftKey;

        event.preventDefault(); //  Prevent Default Action of event

        event.stopPropagation();  // Stop bubbling of event

        this._headerColumnClicked_UpdateState({ shiftKeyDown, columnId });
    }

    /**
     * 
     */
    _headerColumnClicked_UpdateState({ shiftKeyDown, columnId }) {

        this.setState( ( existingState ) => {

            // Important: read `existingState` instead of `this.state` when updating.

            return this._headerColumnClicked_CreateNewState({ existingState, shiftKeyDown, columnId });
        });
    }

    /**
     * 
     */
    _headerColumnClicked_CreateNewState({ existingState, shiftKeyDown, columnId }) {

        const tableObject = existingState.tableObject;
        let sortColumnsInfo_Existing = existingState.sortColumnsInfo;

        const sortColumnsInfo = this._update_sortColumnsInfo({ shiftKeyDown, columnId, sortColumnsInfo_Existing });

        this._sort_tableObject_on_sortColumnsInfo({ tableObject, sortColumnsInfo });

        //  Return updated objects to update state
        return { tableObject, sortColumnsInfo };
    }

    /**
     * 
     */
    _update_sortColumnsInfo({ shiftKeyDown, columnId, sortColumnsInfo_Existing }) {

        let sortColumnsInfo = sortColumnsInfo_Existing;

        if ( ! sortColumnsInfo ) {
            //  No previous entries
            sortColumnsInfo = [ { columnId, sortDirection : SORT_DIRECTION_ASCENDING, sortPosition: 1 } ];
        } else if ( ! shiftKeyDown ) {
            //  Shift Key not down
            if ( sortColumnsInfo.length === 1 && sortColumnsInfo[ 0 ].columnId === columnId ) {
                //  Only 1 Current Sort columnId and same headerColumnId so reverse direction
                if ( sortColumnsInfo[ 0 ].sortDirection === SORT_DIRECTION_ASCENDING ) {
                    sortColumnsInfo[ 0 ].sortDirection = SORT_DIRECTION_DECENDING;
                } else {
                    sortColumnsInfo[ 0 ].sortDirection = SORT_DIRECTION_ASCENDING;
                }
            } else {
                //  Replace sortColumnsInfo with new value
                sortColumnsInfo = [ { columnId, sortDirection : SORT_DIRECTION_ASCENDING, sortPosition: 1 } ];
            }
        } else {
            // Shift Key down when column header clicked
            const sortColumnsInfoEntry_For_Clicked_columnId = sortColumnsInfo.find( ( element ) => { return element.columnId === columnId } );
            if ( sortColumnsInfoEntry_For_Clicked_columnId ) {
                // Already selected column so reverse direction
                if ( sortColumnsInfoEntry_For_Clicked_columnId.sortDirection === SORT_DIRECTION_ASCENDING ) {
                    sortColumnsInfoEntry_For_Clicked_columnId.sortDirection = SORT_DIRECTION_DECENDING;
                } else {
                    sortColumnsInfoEntry_For_Clicked_columnId.sortDirection = SORT_DIRECTION_ASCENDING;
                }
            } else {
                //  Not selected column so add to end
                const sortColumnsInfo_Length = sortColumnsInfo.length;
                sortColumnsInfo.push( { columnId, sortDirection : SORT_DIRECTION_ASCENDING, sortPosition: sortColumnsInfo_Length + 1 } );
            }
        }

        return sortColumnsInfo;
    }

    /**
     * 
     */
    _sort_tableObject_on_sortColumnsInfo({ tableObject, sortColumnsInfo }) {

        //  Sort table

        let dataToSort = tableObject.dataObjects

        if ( this.state.tableOptions.tableGroups ) {
            //  Sort the groups
            dataToSort = tableObject.dataGroupObjects;
        }

        dataToSort.sort( ( dataObject_A, dataObject_B ) => {

            //  Sort each selected columnId.   Sort undefined and null before other values

            for ( const sortColumnsInfoEntry of sortColumnsInfo ) {

                const columnId = sortColumnsInfoEntry.columnId;
                const column_sortDirection = sortColumnsInfoEntry.sortDirection;

                let columnInfo = undefined;
                for ( const columnsEntry of tableObject.columns ) {
                    if ( columnsEntry.id === columnId ) {
                        columnInfo = columnsEntry;
                        break;
                    }
                }
                if ( columnInfo === undefined ) {
                    throw Error("No entry in tableObject.columns for columnId: " + columnId );
                }
                const columnInfo_dataProperty = columnInfo.dataProperty;
                const a_ColumnValue = dataObject_A[ columnInfo_dataProperty ];
                const b_ColumnValue = dataObject_B[ columnInfo_dataProperty ];

                if ( a_ColumnValue === undefined && b_ColumnValue === undefined ) {
                    continue;  // EARLY CONTINUE
                }

                if ( a_ColumnValue === undefined && b_ColumnValue !== undefined ) {
                     // Sort undefined before not undefined
                    if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                        return -1;
                    } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                        return 1;
                    }
                    throw Error("column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                }
                if ( a_ColumnValue !== undefined && b_ColumnValue === undefined ) {
                    // Sort undefined before not undefined
                    if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                        return 1;
                    } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                        return -1;
                    }
                    throw Error("column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                }

                if ( a_ColumnValue < b_ColumnValue ) {
                    if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                        return -1;
                    } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                        return 1;
                    }
                    throw Error("column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                }
                if ( a_ColumnValue > b_ColumnValue ) {
                    if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                        return 1;
                    } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                        return -1;
                    }
                    throw Error("column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                }
            }
            //  All sort columns match so sort on unique id

            if ( dataObject_A.uniqueId < dataObject_B.uniqueId ) {
                return -1;
            }

            if ( dataObject_A.uniqueId > dataObject_B.uniqueId ) {
                return 1;
            }
            return 0;
        })

        //  Return updated object
        return { tableObject };
    }

    /**
     * 
     */
    render () {

        //  Convert this.state.tableObject.columns into React components

        const columnsArrayLength = this.state.tableObject.columns.length;

        const sortColumnsInfo = this.state.sortColumnsInfo;

        const headerColumnsReactComponents = (
            this.state.tableObject.columns.map( ( column, index ) => {

                const columnId = column.id;

                const onClickFcn = (event) => { 
                    this._headerColumnClicked({ event, columnId }); 
                };

                let column_sortDirection = undefined;
                let column_sortPosition = undefined;

                if ( sortColumnsInfo ) {

                    for ( const sortColumnsInfoEntry_InArray of sortColumnsInfo ) {

                        const columnId_InSortEntry = sortColumnsInfoEntry_InArray.columnId;
                        if ( columnId === columnId_InSortEntry ) {
                            column_sortDirection = sortColumnsInfoEntry_InArray.sortDirection;
                            if ( sortColumnsInfo.length !== 1 ) {
                                column_sortPosition = sortColumnsInfoEntry_InArray.sortPosition;
                            }
                            break;
                        }
                    }    
                }

                const lastColumn = index === ( columnsArrayLength - 1 );

                return (
                    <DataTable_Table_HeaderRowEntry 
                        column={ column } 
                        column_sortDirection={ column_sortDirection } 
                        column_sortPosition={ column_sortPosition }
                        index={ index } lastColumn={ lastColumn }
                        onClickFcn={ onClickFcn }
                        key={ column.id } />
                );
            })
        );

        let headerMain = (

            <div >
                <table className=" data-table-header-table ">
                    <thead>
                        <tr className=" data-table-header-row data-table-row ">
                            
                            { headerColumnsReactComponents }
                        </tr>
                    </thead>
                </table>
            </div>
        )

        let header = headerMain;

        if ( this.state.tableOptions.tableGroups ) {

            header = (
                <div className=" data-table-header-row-groups-container selector_group_container " >
                    
                        { headerMain }
                    
                </div>
            )
        }

        let dataRows = undefined;

        if ( this.state.tableOptions.tableGroups ) {
            
            //  Display Groups, with each group entry containing dataObjects

            if ( this.state.tableObject.dataGroupObjects === undefined || this.state.tableObject.dataGroupObjects === null ) {
                throw Error(" ( this.state.tableOptions.tableGroups ) is true and ( this.state.tableObject.dataGroupObjects === undefined || this.state.tableObject.dataGroupObjects === null )")
            }

            //  Convert this.state.tableObject.dataGroupObjects into React components

            const dataGroupRowsReactComponents = [];

            let highlightRow = false;
            for ( const dataGroupObject of this.state.tableObject.dataGroupObjects ) {
                const reactRowElement = (
                    <DataTable_Table_DataRow_Group 
                        dataGroupObject={ dataGroupObject }
                        tableObject={ this.state.tableObject } 
                        tableOptions={ this.state.tableOptions }
                        highlightRow={ highlightRow }
                        key={ dataGroupObject.uniqueId } />
                );
        
                dataGroupRowsReactComponents.push( reactRowElement );

                if ( highlightRow ) {
                    highlightRow = false;
                } else {
                    highlightRow = true;
                }
            }
        
            dataRows = (
                <div className="table-rows-container selector_table_rows_container" >

                    { dataGroupRowsReactComponents }
                </div>
            );
        } else {

            //  No Groups so display the Data Rows

            if ( this.state.tableObject.dataObjects === undefined || this.state.tableObject.dataObjects === null ) {
                throw Error(" ( this.state.tableOptions.tableGroups ) is false and ( this.state.tableObject.dataObjects === undefined || this.state.tableObject.dataObjects === null )")
            }

            //  Convert this.state.tableObject.dataObjects into React components

            const dataRowsReactComponents = (
                this.state.tableObject.dataObjects.map(dataObject =>
                    <DataTable_Table_DataRow 
                        tableObject={ this.state.tableObject } 
                        dataObject={ dataObject } 
                        tableOptions={ this.state.tableOptions }
                        key={ dataObject.uniqueId } />)
            );

            dataRows = dataRowsReactComponents ;
        }

        return (
            <div className=" data-table-container-react selector_data_table_container">
              
                { header }
                { dataRows }
              
            </div>
        )
    }
}


