/**
 * dataTable_Table_DataRow_Group_React.tsx
 * 
 * Table Group Row - renders 1 or more Data Rows inside
 */


import React from 'react'

import {
  DataTable_TableOptions,
  DataTable_Column,
  DataTable_DataGroupRowEntry,
  DataTable_RootTableDataObject,
  DataTable_RootTableObject
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { DataTable_Table_DataRow } from './dataTable_Table_DataRow_React';

import { sort_dataRows_on_sortColumnsInfo } from './dataTable_SortDataRows';


/**
 * 
 */
export interface DataTable_Table_DataRow_Group_Props {

  dataTable_DataGroupRowEntry : DataTable_DataGroupRowEntry
  columns : Array<DataTable_Column>
  tableOptions : DataTable_TableOptions
  dataTable_RootTableDataObject : DataTable_RootTableDataObject
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
      const dataTable_DataRowEntries_Length = this.props.dataTable_DataGroupRowEntry.dataTable_DataRowEntries.length;
      let counter = 0;
      for ( const dataTable_DataRowEntry of this.props.dataTable_DataGroupRowEntry.dataTable_DataRowEntries ) {
        counter++;
        const isLastRow = dataTable_DataRowEntries_Length === counter;
        const reactRowElement = (
            <DataTable_Table_DataRow 
              columns={ this.props.columns } 
              dataObject={ dataTable_DataRowEntry } 
              tableOptions={ this.props.tableOptions }
              dataTable_RootTableDataObject={ this.props.dataTable_RootTableDataObject }
              dataTableId={ this.props.dataTableId }
              isLastRow={ isLastRow }
              key={ dataTable_DataRowEntry.uniqueId } />
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
