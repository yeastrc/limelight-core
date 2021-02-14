/**
 * dataTable_Table_DataRowEntry_External_ReactComponent.tsx
 * 
 * Table Entry in Data Row
 * 
 * The Table cell contents is managed via external React Component
 */
import React from 'react'

import { DataTable_Column, DataTable_DataRow_ColumnEntry } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

/**
 * 
 */
export interface DataTable_Table_DataRowEntry_External_ReactComponent_Props {

  dataObject_columnEntry : DataTable_DataRow_ColumnEntry
  column : DataTable_Column
}

class DataTable_Table_DataRowEntry_External_ReactComponent_State {

    _placeholder: any
}

/**
 * 
 * 
 * 
 */
export class DataTable_Table_DataRowEntry_External_ReactComponent extends React.Component< DataTable_Table_DataRowEntry_External_ReactComponent_Props, DataTable_Table_DataRowEntry_External_ReactComponent_State > {

    constructor(props : DataTable_Table_DataRowEntry_External_ReactComponent_Props) {
        super(props);

        this.state = {
            _placeholder: null
        };
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
    shouldComponentUpdate(nextProps: DataTable_Table_DataRowEntry_External_ReactComponent_Props, nextState: DataTable_Table_DataRowEntry_External_ReactComponent_State) {

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
   * 
   * 
   * 
   */
  render () {

        // console.log("DataTable_Table_DataRowEntry_External_ReactComponent.render: this.props: ", this.props)

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

        if ( ! column.cellMgmt_ExternalReactComponent ) {
            const msg = "No value in column.cellMgmt_ExternalReactComponent";
            console.warn( msg );
            throw Error( msg );
        }

        if ( ! column.cellMgmt_ExternalReactComponent.reactComponent ) {
            const msg = "No value in column.cellMgmt_ExternalReactComponent.reactComponent";
            console.warn( msg );
            throw Error( msg );
        }

        const ReactComponentChild = column.cellMgmt_ExternalReactComponent.reactComponent;
        
        return (
            <td
                style={ styleContainer_TD }
                className={ className }
            >
                <ReactComponentChild
                    cellMgmt_ExternalReactComponent_Data={ this.props.dataObject_columnEntry.cellMgmt_ExternalReactComponent_Data }
                    columnWidth={ column.width }
                    columnHeightInitial={ column.heightInitial }
                />
            </td>
        );
    }

}
