/**
 * dataTable_Table_DataRowEntry_External_Cell_Mgmt_React.tsx
 * 
 * Table Entry in Data Row
 * 
 * The Table cell contents is managed via external function calls
 */
import React from 'react'

import { DataTable_Column, DataTable_DataRow_ColumnEntry } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

/**
 * 
 */
export interface DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_Props {

  dataObject_columnEntry : DataTable_DataRow_ColumnEntry
  column : DataTable_Column
}

/**
 * 
 * 
 * 
 */
export class DataTable_Table_DataRowEntry_External_Cell_Mgmt_React extends React.Component< DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_Props, {} > {

    private cellContainingDiv

    private onUnmountCallback;
    private dataObject_columnEntry_NewValue_Callback;


    constructor(props : DataTable_Table_DataRowEntry_External_Cell_Mgmt_React_Props ) {
        super(props);

        this.cellContainingDiv = React.createRef();

        this.state = {};
    }



    /**
     * After render()
     */
    componentDidMount() {

        // console.log("DataTable_Table_DataRowEntry_External_Cell_Mgmt_React: componentDidMount");

        if ( this.cellContainingDiv && this.props && this.props.column ) {

            const column = this.props.column;

            if ( column.cellMgmt_External && column.cellMgmt_External.populateCellDOMObject_Initial ) {

                const cellMgmt_ExternalFunction_Response = column.cellMgmt_External.populateCellDOMObject_Initial({ 
                    cellMgmt_External_Data : this.props.dataObject_columnEntry.cellMgmt_External_Data, 
                    domObjectInCell : this.cellContainingDiv.current, 
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
    shouldComponentUpdate(nextProps, nextState) {

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
  componentDidUpdate(prevProps, prevState, snapshot) {

    // console.log("DataTable_Table_DataRowEntry_External_Cell_Mgmt_React: componentDidUpdate")

    if ( this.dataObject_columnEntry_NewValue_Callback ) {
        this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
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

        const styleContainerDiv = { width: column.width, minWidth: column.width, maxWidth: column.width, height : undefined };

         //  Height not restricted to column.heightInitial
         
         //    column.heightInitial may or may not be populated.

        if ( column.heightInitial !== undefined && column.heightInitial !== null ) {
            styleContainerDiv.height = column.heightInitial;
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
                styleContainerDiv[ style_override_ReactKey ] =  style_override_React[ style_override_ReactKey ];
            }
        }
        
        return (
            <td 
                className={ className }
                // data-index={ index }
                // data-value={ valueDisplay }
                >
                {/* Removed since property not set: data-row-id={ columnEntry.uniqueId } */}

                <div ref={ this.cellContainingDiv } style={ styleContainerDiv }>
                    
                </div>
            </td>
        );
    }

}
