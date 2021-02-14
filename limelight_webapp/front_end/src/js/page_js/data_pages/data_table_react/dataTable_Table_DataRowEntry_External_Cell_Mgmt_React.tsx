/**
 * dataTable_Table_DataRowEntry_External_Cell_Mgmt_React.tsx
 * 
 * Table Entry in Data Row
 * 
 * The Table cell contents is managed via external function calls
 */
import React from 'react'

import { DataTable_Column, DataTable_DataRow_ColumnEntry, DataTable_cellMgmt_External_PopulateResponse, DataTable_cellMgmt_External_PopulateResponse_NewValue_Callback_Params } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

/**
 * 
 */
export interface DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_Props {

  dataObject_columnEntry : DataTable_DataRow_ColumnEntry
  column : DataTable_Column
}

class DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_State {

    _placeholder: any
}

/**
 * 
 * 
 * 
 */
export class DataTable_Table_DataRowEntry_External_Cell_Mgmt_React extends React.Component< DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_Props, DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_State > {

    private cellContaining_TD :  React.RefObject<HTMLTableDataCellElement>

    private onUnmountCallback: any;
    private dataObject_columnEntry_NewValue_Callback :  ( params: DataTable_cellMgmt_External_PopulateResponse_NewValue_Callback_Params ) => void;


    constructor(props : DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_Props ) {
        super(props);

        this.cellContaining_TD = React.createRef();

        this.state = {
            _placeholder: undefined
        };
    }

    /**
     * After render()
     */
    componentDidMount() {

        // console.log("DataTable_Table_DataRowEntry_External_Cell_Mgmt_React: componentDidMount");

        if ( this.cellContaining_TD && this.props && this.props.column ) {

            const column = this.props.column;

            if ( column.cellMgmt_External && column.cellMgmt_External.populateCellDOMObject_Initial ) {

                const cellMgmt_ExternalFunction_Response : DataTable_cellMgmt_External_PopulateResponse = column.cellMgmt_External.populateCellDOMObject_Initial({ 
                    cellMgmt_External_Data : this.props.dataObject_columnEntry.cellMgmt_External_Data, 
                    domObjectInCell : this.cellContaining_TD.current,
                    columnWidth : column.width,
                    columnHeightInitial : column.heightInitial,
                    cellMgmt_External : column.cellMgmt_External
                })

                if ( cellMgmt_ExternalFunction_Response ) {

                    this.onUnmountCallback = cellMgmt_ExternalFunction_Response.domObjectInCell_RemoveContents_Callback;
                    this.dataObject_columnEntry_NewValue_Callback = cellMgmt_ExternalFunction_Response.cellMgmt_External_Data_NewValue_Callback;
                }
            }
        }
     
    }

    /**
     * After render()
     */
    componentWillUnmount() {

        if ( this.onUnmountCallback ) {
            this.onUnmountCallback();
        }
    }


    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps( props, state ) {

      // console.log("called: static getDerivedStateFromProps(): " );

      //  Return new state (like return from setState(callback)) or null

    //   return null;

    // }
  

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps: DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_Props, nextState: DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_State) {

        // console.log("DataTable_Table_DataRowEntry_External_Cell_Mgmt_React: shouldComponentUpdate")

        //  Only update if changed: props: dataObject_columnEntry or dataObject

        if ( this.props.dataObject_columnEntry !== nextProps.dataObject_columnEntry ) {
            return true;
        }
        // if ( this.props.dataObject !== nextProps.dataObject ) {
        //     return true;
        // }
        return false;

        //  If Comment out prev code, uncomment this:

        // return true;
    }

  // getSnapshotBeforeUpdate( <see docs> ) {


  // }


  /**
   * After render()
   */
  componentDidUpdate(prevProps: DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_Props, prevState: DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_State, snapshot: any) {

    // console.log("DataTable_Table_DataRowEntry_External_Cell_Mgmt_React: componentDidUpdate")

    if ( this.dataObject_columnEntry_NewValue_Callback ) {
        this.dataObject_columnEntry_NewValue_Callback({ cellMgmt_External_Data : this.props.dataObject_columnEntry.cellMgmt_External_Data });
    }
  }


  /**
   * 
   * 
   * 
   */
  render () {


        // console.log("DataTable_Table_DataRowEntry_External_Cell_Mgmt_React.render: this.props: ")
        // console.log( this.props );

        //  props
        // columns={ this.props.columns }
        // dataObject={ this.props.dataObject }
        // dataObject_columnEntry={ dataObject_columnEntry } 
        // index={ index }


        // const dataObject_columnEntry = this.props.dataObject_columnEntry;
        // const index = this.props.index;

        const column = this.props.column;

        let classesAdditions = "";
        if ( column.cssClassNameAdditions_DataRowCell ) {
            classesAdditions = "  " + column.cssClassNameAdditions_DataRowCell;
        }

        const className = ( "data-table-data-cell data-table-cell " // 'data-table-cell' not in CSS file
            // + column.id
            + classesAdditions
        );

        const styleContainer_TD : React.CSSProperties = { width: column.width, minWidth: column.width, maxWidth: column.width };

         //  Height not restricted to column.heightInitial
         
         //    column.heightInitial may or may not be populated.

        if ( column.heightInitial !== undefined && column.heightInitial !== null ) {
            styleContainer_TD.height = column.heightInitial;
        }

        const style_override_React = column.style_override_DataRowCell_React;

        if ( style_override_React ) {
        //  Copy style_override_React object to styleContainerDiv object

            const style_override_ReactKeys = Object.keys( style_override_React );
            for ( const style_override_ReactKey of style_override_ReactKeys ) {
                if ( style_override_ReactKey === 'width' || style_override_ReactKey === 'maxWidth' || style_override_ReactKey === 'minWidth') {
                    const msg = "Not valid to set 'width', 'maxWidth', or 'minWidth' in style_override_ReactKey";
                    console.warn( msg );
                    throw Error( msg );
                }
                if ( style_override_ReactKey !== 'display') { // NOT ALLOW: change to 'display' property

                    //  Copy object property with string in style_override_ReactKey from style_override_React to styleContainer_TD
                    // @ts-ignore
                    styleContainer_TD[style_override_ReactKey] = style_override_React[style_override_ReactKey];
                }
            }
        }
        
        return (
            <td
                ref={ this.cellContaining_TD }
                style={ styleContainer_TD }
                className={ className }
            >
            </td>
        );
    }

}
