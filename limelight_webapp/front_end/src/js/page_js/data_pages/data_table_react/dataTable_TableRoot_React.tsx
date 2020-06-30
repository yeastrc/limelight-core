/**
 * dataTable_TableRoot_React.tsx
 * 
 * Actual Table Root
 *
 *
 * For stand alone Data Table in DOM (Not enclosed by a React Managed element)
 * it is recommended to use the functions create_dataTable_Root_React, remove_dataTable_Root_React
 * in the file dataTable_TableRoot_React_Create_Remove_Table_DOM.ts
 * to Create and Remove the Data Table to/from the DOM
 */
import React from 'react'

import { SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DECENDING } from "./dataTable_constants";

import { DataTable_RootTableObject, DataTable_ColumnId, DataTable_TableOptions, DataTable_SortColumnsInfoEntry, DataTable_RootTableDataObject } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


import { DataTable_Table_HeaderRowEntry }  from './dataTable_Table_HeaderRowEntry_React';
import { DataTable_Table_DataRow } from './dataTable_Table_DataRow_React';
import { DataTable_Table_DataRow_Group } from './dataTable_Table_DataRow_Group_React';

import { sort_dataRows_on_sortColumnsInfo } from './dataTable_SortDataRows';
import {dataTable_React_DataObjects_Validator} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects_Validator";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

/**
 * 
 */
export interface DataTable_TableRoot_Props {
    tableObject : DataTable_RootTableObject
    resortTableOnUpdate? : boolean //  Use with care - When tableObject property changes, apply existing sort columns to it.  This requires that the same table column identifiers are in the new table.
}

/**
 * 
 */
interface DataTable_TableRoot_State {

    tableDataObject_FromProps? : DataTable_RootTableDataObject
    tableOptions_FromProps? : DataTable_TableOptions


    tableDataObject? : DataTable_RootTableDataObject
    tableOptions? : DataTable_TableOptions

    sortColumnsInfo? : Array<DataTable_SortColumnsInfoEntry>
    show_updatingTableOrder_Message? : boolean
}

/**
 * Data Table Root Node
 *
 * For stand alone Data Table in DOM (Not enclosed by a React Managed element)
 * it is recommended to use the functions create_dataTable_Root_React, remove_dataTable_Root_React
 * in the file dataTable_TableRoot_React_Create_Remove_Table_DOM.ts
 * to Create and Remove the Data Table to/from the DOM
 */
export class DataTable_TableRoot extends React.Component< DataTable_TableRoot_Props, DataTable_TableRoot_State > {

    private _headerColumnClicked_BindThis : ({ shiftKeyDown, columnId } : { shiftKeyDown : boolean, columnId : DataTable_ColumnId }) => void = this._headerColumnClicked.bind(this);

    /**
     *
     */
    constructor(props : DataTable_TableRoot_Props) {
        super(props);

        try {
            if ( ! props.tableObject ) {
                const msg = "DataTable_TableRoot:constructor: No value in props.tableObject";
                console.warn( msg )
                throw Error( msg )
            }
            if ( ! ( props.tableObject instanceof DataTable_RootTableObject ) ) {
                const msg = "DataTable_TableRoot:constructor: props.tableObject NOT instanceof DataTable_RootTableObject";
                console.warn( msg + ".  props.tableObject: ", props.tableObject )
                throw Error( msg )
            }

            this.state = DataTable_TableRoot._createStateObjectFrom_DataTable_RootTableObject({
                tableObject : props.tableObject,
                resortTableOnUpdate : false /* not resort on first create */,
                sortColumnsInfo : null //  Not sort at first
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }

    }

    /**
     * 
     */
    private static _createStateObjectFrom_DataTable_RootTableObject({ tableObject, resortTableOnUpdate, sortColumnsInfo } : {

        tableObject : DataTable_RootTableObject
        resortTableOnUpdate : boolean
        sortColumnsInfo : Array<DataTable_SortColumnsInfoEntry>

    }) : DataTable_TableRoot_State {

        const state : DataTable_TableRoot_State = {
            tableDataObject: tableObject.tableDataObject,
            tableOptions : tableObject.tableOptions,
            tableDataObject_FromProps: tableObject.tableDataObject,
            tableOptions_FromProps : tableObject.tableOptions
        };
        if ( resortTableOnUpdate && sortColumnsInfo ) {

            const sort_tableObject_on_sortColumnsInfo_Result = DataTable_TableRoot._sort_tableObject_on_sortColumnsInfo({ tableObject : tableObject.tableDataObject, sortColumnsInfo });
            const tableDataObject_New = sort_tableObject_on_sortColumnsInfo_Result.tableObject;

            //  update tableDataObject
            state.tableDataObject = tableDataObject_New;

        } else {
            state.sortColumnsInfo = null
        }

        return state;
    }

    //  method update_tableObject(...) Is Incorrect.  It does NOT work correctly with getDerivedStateFromProps and shouldComponentUpdate

    //      Remove rather than try to fix.  Can just re-render 

    // /**
    //  * 
    //  */
    // update_tableObject({ tableObject } : { tableObject : DataTable_RootTableObject }) {

    //     this.setState( (existingState: DataTable_TableRoot_State, props: DataTable_TableRoot_Props ) : DataTable_TableRoot_State => {

    //         // Important: read `existingState` instead of `this.state` when updating.

    //         const state = DataTable_TableRoot._createStateObjectFrom_DataTable_RootTableObject({ tableObject : tableObject });

    //         //  WAS:
    //         // const state = DataTable_TableRoot._createStateObjectFrom_DataTable_RootTableObject({ tableObject : props.tableObject });

    //         return state;
    //     });
    // }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : DataTable_TableRoot_Props, state : DataTable_TableRoot_State ) : DataTable_TableRoot_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //  Return new state (like return from setState(callback)) or null

        if ( props.tableObject.tableDataObject === state.tableDataObject_FromProps && props.tableObject.tableOptions === state.tableOptions_FromProps ) {
            //  No changes so just return
            return null;  //
        }

        //  Validate new DataTable Object from Props
        {
            try {
                // throws Error if not valid
                dataTable_React_DataObjects_Validator({dataTable_RootTableObject: props.tableObject})
            } catch (e) {
                //  Have catch since dataTable_React_DataObjects_Validator also throws Error
                console.warn("dataTable_React_DataObjects_Validator(...) threw Error: ", e)
                console.warn("dataTable_React_DataObjects_Validator(...) threw Error: props.tableObject.dataTableId: " + props.tableObject.dataTableId + ", props.tableObject: ", props.tableObject)
                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                throw e;
            }
        }

        //  Props changed so create new state
        const new_state : DataTable_TableRoot_State = DataTable_TableRoot._createStateObjectFrom_DataTable_RootTableObject({
            tableObject : props.tableObject, resortTableOnUpdate : props.resortTableOnUpdate, sortColumnsInfo : state.sortColumnsInfo
        });

        return new_state;
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps : DataTable_TableRoot_Props, nextState : DataTable_TableRoot_State ) {

        if ( this.state.tableDataObject !== nextState.tableDataObject ) {
            return true;
        }
        if ( this.state.tableOptions !== nextState.tableOptions ) {
            return true;
        }
        if ( this.state.show_updatingTableOrder_Message !== nextState.show_updatingTableOrder_Message ) {
            return true;
        }
        
        return false;
    }


    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {


    // }

    /**
     * 
     */
    _headerColumnClicked({ shiftKeyDown, columnId } : { shiftKeyDown : boolean, columnId : DataTable_ColumnId }) : void {

        let displayUpdatingMsg = false;

        const displayUpdatingMsg_TriggerMinLength = 300;

        if ( this.props.tableObject.tableDataObject.dataTable_DataRowEntries && this.props.tableObject.tableDataObject.dataTable_DataRowEntries.length > displayUpdatingMsg_TriggerMinLength ) {

            displayUpdatingMsg = true;
        }

        if ( this.props.tableObject.tableDataObject.dataTable_DataGroupRowEntries && this.props.tableObject.tableDataObject.dataTable_DataGroupRowEntries.length > 0 ) {

            //  Get Total count of dataTable_DataRowEntries
            
            let dataTable_DataRowEntries_TotalCount = 0;

            for ( const dataTable_DataGroupRowEntry of this.props.tableObject.tableDataObject.dataTable_DataGroupRowEntries ) {
                if ( dataTable_DataGroupRowEntry.dataTable_DataRowEntries && dataTable_DataGroupRowEntry.dataTable_DataRowEntries.length > 0 ) {

                    dataTable_DataRowEntries_TotalCount += dataTable_DataGroupRowEntry.dataTable_DataRowEntries.length;
                }
            }
            if ( dataTable_DataRowEntries_TotalCount > displayUpdatingMsg_TriggerMinLength ) {
        
                displayUpdatingMsg = true;
            }
        }

        if ( displayUpdatingMsg ) {

            //  Update differed until after displaying updating message

            this.setState( (existingState: DataTable_TableRoot_State, props: DataTable_TableRoot_Props ) : DataTable_TableRoot_State => {

                // Important: read `existingState` instead of `this.state` when updating.

                return { show_updatingTableOrder_Message : true };
            });

            window.setTimeout(() => {
                    
                this.setState( (existingState: DataTable_TableRoot_State, props: DataTable_TableRoot_Props ) : DataTable_TableRoot_State => {

                    // Important: read `existingState` instead of `this.state` when updating.

                    return { show_updatingTableOrder_Message : false };
                });

                this.setState( (existingState: DataTable_TableRoot_State, props: DataTable_TableRoot_Props ) : DataTable_TableRoot_State => {

                    // Important: read `existingState` instead of `this.state` when updating.

                    return this._headerColumnClicked_CreateNewState({ existingState, shiftKeyDown, columnId });
                });
            }, 10 );

        } else {

            //  Update immediately
            
            this.setState( (existingState: DataTable_TableRoot_State, props: DataTable_TableRoot_Props ) : DataTable_TableRoot_State => {

                // Important: read `existingState` instead of `this.state` when updating.

                return this._headerColumnClicked_CreateNewState({ existingState, shiftKeyDown, columnId });
            });
        }
    }

    /**
     * 
     */
    _headerColumnClicked_CreateNewState({ 
        
        existingState, shiftKeyDown, columnId 
    } : { existingState : DataTable_TableRoot_State, shiftKeyDown : boolean, columnId : DataTable_ColumnId  }) : DataTable_TableRoot_State {

        const tableObject = existingState.tableDataObject;
        let sortColumnsInfo_Existing = existingState.sortColumnsInfo;

        const sortColumnsInfo = this._update_sortColumnsInfo({ shiftKeyDown, columnId, sortColumnsInfo_Existing });

        const sort_tableObject_on_sortColumnsInfo_Result = DataTable_TableRoot._sort_tableObject_on_sortColumnsInfo({ tableObject, sortColumnsInfo });
        const tableDataObject_New = sort_tableObject_on_sortColumnsInfo_Result.tableObject;

        //  Return updated objects to update state
        return { tableDataObject : tableDataObject_New, sortColumnsInfo };
    }

    /**
     * 
     */
    _update_sortColumnsInfo({ 
        
        shiftKeyDown, columnId, sortColumnsInfo_Existing 
    } : { shiftKeyDown : boolean, columnId : DataTable_ColumnId, sortColumnsInfo_Existing : Array<DataTable_SortColumnsInfoEntry> 
    }) : Array<DataTable_SortColumnsInfoEntry> {

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
    static _sort_tableObject_on_sortColumnsInfo({
        
        tableObject, sortColumnsInfo
    } : { tableObject : DataTable_RootTableDataObject, sortColumnsInfo : Array<DataTable_SortColumnsInfoEntry>  
    }) : { tableObject : DataTable_RootTableDataObject } {

        // console.log("_sort_tableObject_on_sortColumnsInfo")

        //  Sort table

        const columns = tableObject.columns;

        if ( tableObject.dataTable_DataRowEntries ) {

            sort_dataRows_on_sortColumnsInfo({ dataToSort : tableObject.dataTable_DataRowEntries, columns, sortColumnsInfo });

        } else if ( tableObject.dataTable_DataGroupRowEntries ) {

            //  Sort the groups

            //  First sort the contents of each group.  This will also update what the group returns for sorting the groups

            for ( const dataTable_DataGroupRowEntry of tableObject.dataTable_DataGroupRowEntries ) {

                sort_dataRows_on_sortColumnsInfo({ dataToSort : dataTable_DataGroupRowEntry.dataTable_DataRowEntries, columns, sortColumnsInfo });

                //  Update columnEntries to first row in group

                dataTable_DataGroupRowEntry.columnEntries = dataTable_DataGroupRowEntry.dataTable_DataRowEntries[ 0 ].columnEntries;
            }

            //  Sort the groups

            sort_dataRows_on_sortColumnsInfo({ dataToSort : tableObject.dataTable_DataGroupRowEntries, columns, sortColumnsInfo });

        } else {

            const msg = "_sort_tableObject_on_sortColumnsInfo: Neither are populated: tableObject.dataTable_DataRowEntries, tableObject.dataTable_DataGroupRowEntries";
            console.warn( msg );
            throw Error( msg );
        }

        let tableObject_New = tableObject.shallowClone(); // make copy of tableObject

        //  Return updated object
        return { tableObject : tableObject_New };
    }

    /**
     * 
     */
    render () {

        // console.log("DataTable_TableRoot: render()")

        let have_DataGroups = false;

        if ( this.state.tableDataObject.dataTable_DataGroupRowEntries ) {

            have_DataGroups = true;
        }

        //  Validate incoming data
        {
            const tableDataObject = this.state.tableDataObject;

            if ( tableDataObject.dataTable_DataGroupRowEntries && tableDataObject.dataTable_DataRowEntries ) {
                const msg = "Invalid that tableObject.dataTable_DataGroupRowEntries && tableObject.dataTable_DataRowEntries are both populated."
                console.warn( msg );
                throw Error( msg );
            }
            if ( ( ! tableDataObject.dataTable_DataGroupRowEntries ) && ( ! tableDataObject.dataTable_DataRowEntries ) ) {
                const msg = "Invalid that tableObject.dataTable_DataGroupRowEntries && tableObject.dataTable_DataRowEntries are both NOT populated."
                console.warn( msg );
                throw Error( msg );
            }
        }

        //  Convert this.state.tableDataObject.columns into React components

        const columnsArrayLength = this.state.tableDataObject.columns.length;

        const sortColumnsInfo = this.state.sortColumnsInfo;

        //  Create Header Row Components

        const headerColumnsReactComponents = (

            this.state.tableDataObject.columns.map( ( column, index ) => {

                const columnId = column.id;

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
                        // index={ index } 
                        lastColumn={ lastColumn }
                        headerColumnClicked_Callback={ this._headerColumnClicked_BindThis }
                        key={ index } />
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

        if ( have_DataGroups ) {

            header = (
                <div className=" data-table-header-row-groups-container  " >  {/* selector_group_container */}
                        { headerMain }
                    
                </div>
            )
        }

        let dataRows = undefined;

        if ( have_DataGroups ) {
            
            //  Display Groups, with each group entry containing dataTable_DataRowEntries

            //  Convert this.state.tableDataObject.dataTable_DataGroupRowEntries into React components

            const dataGroupRowsReactComponents = [];

            let highlightRow = false; // Alternate highlighting Table Group Rows
            for ( const dataTable_DataGroupRowEntry of this.state.tableDataObject.dataTable_DataGroupRowEntries ) {
                const reactRowElement = (
                    <DataTable_Table_DataRow_Group 
                        dataTable_DataGroupRowEntry={ dataTable_DataGroupRowEntry }
                        columns={ this.state.tableDataObject.columns }
                        tableOptions={ this.state.tableOptions }
                        highlightRow={ highlightRow }
                        key={ dataTable_DataGroupRowEntry.uniqueId } />
                );
        
                dataGroupRowsReactComponents.push( reactRowElement );

                if ( highlightRow ) {
                    highlightRow = false;
                } else {
                    highlightRow = true;
                }
            }
        
            dataRows = (
                <div className="table-rows-container selector_table_rows_container" data-component="div in 'have_DataGroups' in <DataTable_TableRoot>" >

                    { dataGroupRowsReactComponents }
                </div>
            );
        } else {

            //  No Groups so display the Data Rows

            if ( this.state.tableDataObject.dataTable_DataRowEntries === undefined || this.state.tableDataObject.dataTable_DataRowEntries === null ) {
                throw Error(" ( this.state.tableOptions.tableGroups ) is false and ( this.state.tableDataObject.dataTable_DataRowEntries === undefined || this.state.tableDataObject.dataTable_DataRowEntries === null )")
            }

            //  Convert this.state.tableDataObject.dataTable_DataRowEntries into React components

            const dataRowsReactComponents = [];
            {
                const dataTable_DataRowEntries_Length = this.state.tableDataObject.dataTable_DataRowEntries.length;
                let counter = 0;
                for ( const dataTable_DataRowEntry of this.state.tableDataObject.dataTable_DataRowEntries ) {
                    counter++;
                    const isLastRow = dataTable_DataRowEntries_Length === counter;
                    const reactRowElement = (
                        <DataTable_Table_DataRow 
                        columns={ this.state.tableDataObject.columns } 
                        dataObject={ dataTable_DataRowEntry } 
                        tableOptions={ this.state.tableOptions }
                        isLastRow={ isLastRow }
                        key={ dataTable_DataRowEntry.uniqueId } />
                    );
          
                  dataRowsReactComponents.push( reactRowElement );
                }
            }
            

            dataRows = dataRowsReactComponents ;
        }

        let divCssClass = " data-table-container-react ";

        if ( this.state.tableOptions.dataRow_GetChildTableData || this.state.tableOptions.dataRow_GetChildTable_ReturnReactComponent ) {
            //  Adding show/hide child table icons to left of each row 
            //     so need to add padding to provide space for them on the left since 
            //     the icons are positioned with a negative value for 'left' css property
            
            divCssClass += " padding-for-room-for-child-table-show-hide-icon ";
        }

        let updatingTableOrder_Message : JSX.Element = undefined;

        if ( this.state.show_updatingTableOrder_Message ) {

            updatingTableOrder_Message = (

                <div className=" block-updating-overlay-container " >
                    Updating Table Order
                </div>
            )
        }

        return (
            <React.Fragment>
                <div className={ divCssClass }  style={ { position: "relative" }} data-react-component="DataTable_TableRoot">
                
                    { header }
                    { dataRows }
                    { updatingTableOrder_Message }
                
                </div>
                <br />  {/* <br/> Added since <div> before it has 'display: inline-block' in CSS class data-table-container-react */}
            </React.Fragment>
        )
    }
}


