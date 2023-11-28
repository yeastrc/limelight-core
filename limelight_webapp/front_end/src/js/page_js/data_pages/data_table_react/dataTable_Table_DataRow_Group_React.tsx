/**
 * dataTable_Table_DataRow_Group_React.tsx
 * 
 * Table Group Row - renders 1 or more Data Rows inside
 */


import React from 'react'

import {
  DataTable_TableOptions,
  DataTable_Column,
  DataTable_RootTableDataObject
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { DataTable_Table_DataRow } from './dataTable_Table_DataRow_React';
import {
  DataTable_INTERNAL_DataGroupRowEntry,
  DataTable_INTERNAL_RootTableDataObject
} from "page_js/data_pages/data_table_react/dataTable_React_INTERNAL_DataObjects";


/**
 * 
 */
export interface DataTable_Table_DataRow_Group_Props {

  dataTable_INTERNAL_DataGroupRowEntry : DataTable_INTERNAL_DataGroupRowEntry
  columns : Array<DataTable_Column>
  tableRows_TotalCount: number
  tableOptions : DataTable_TableOptions
  dataTable_RootTableDataObject_INTERNAL :  DataTable_INTERNAL_RootTableDataObject
  dataTableId : string
  highlightRow : boolean
}

/**
 * 
 */
interface DataTable_Table_DataRow_Group_State {

  _placeholder: any //  have so not have any state properties
}

/**
 * 
 */
export class DataTable_Table_DataRow_Group extends React.Component< DataTable_Table_DataRow_Group_Props, DataTable_Table_DataRow_Group_State > {
  
  constructor(props : DataTable_Table_DataRow_Group_Props ) {
    super(props);
  }

  render () {

    const reactRowElements = [];
    {
      const dataTable_DataRowEntries_Length = this.props.dataTable_INTERNAL_DataGroupRowEntry.dataTable_DataRowEntries__INTERNAL.length;
      let counter = 0;
      for ( const dataTable_DataRowEntry_INTERNAL of this.props.dataTable_INTERNAL_DataGroupRowEntry.dataTable_DataRowEntries__INTERNAL ) {
        counter++;
        const isFirstRowInGroup = 1 === counter;
        const reactRowElement = (
            <DataTable_Table_DataRow 
              columns={ this.props.columns }
              tableRows_TotalCount={ this.props.tableRows_TotalCount }
              dataTable_DataRowEntry_INTERNAL={ dataTable_DataRowEntry_INTERNAL }
              tableOptions={ this.props.tableOptions }
              dataTable_RootTableDataObject_INTERNAL={ this.props.dataTable_RootTableDataObject_INTERNAL }
              dataTableId={ this.props.dataTableId }
              isInGroup={ true }
              isFirstRowInGroup={ isFirstRowInGroup }
              key={ dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.uniqueId } />
        );

        reactRowElements.push( reactRowElement );
      }
    }

    let innerClassNameHighlightRow = "";
    if ( this.props.highlightRow ) {
      innerClassNameHighlightRow = " table-row-group-inner-container-highlighted-row ";
    }
    const innerClassName = " table-row-group-inner-container " + innerClassNameHighlightRow;


    return (

      <React.Fragment>

        <div className=" table-row-group-outer-container ">
          <div className={ innerClassName } >
                { reactRowElements }
          </div>
        </div>

        {/* If CSS Class 'table-row-group-outer-container' is changed to 'display: inline-block'
              Add '<br />' after that <div> to ensure each of the div above is on a new visual line rather than more than one ending up on the same visual line 
        */}

      </React.Fragment>
    )
  }

}
