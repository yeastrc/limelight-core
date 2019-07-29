/**
 * dataTable_Table_DataRow_Group_React.jsx
 * 
 * Table Group Row - renders 1 or more Data Rows inside
 */
import React from 'react'

import { DataTable_Table_DataRow } from './dataTable_Table_DataRow_React.jsx';


export class DataTable_Table_DataRow_Group extends React.Component {
  
  constructor(props) {
    super(props);
  }


  render () {

    const reactRowElements = [];

    for ( const dataObject of this.props.dataGroupObject.dataObjects ) {
      const reactRowElement = (
          <DataTable_Table_DataRow 
                tableObject={ this.props.tableObject } 
                dataObject={ dataObject } 
                tableOptions={ this.props.tableOptions }
                key={ dataObject.uniqueId } />

      );

      reactRowElements.push( reactRowElement );
    }

    let innerClassNameHighlightRow = "";
    if ( this.props.highlightRow ) {
      innerClassNameHighlightRow = " table-row-group-inner-container-highlighted-row ";
    }
    const innerClassName = " table-row-group-inner-container " + innerClassNameHighlightRow;


    return (

      <div className=" table-row-group-outer-container ">
        <div className={ innerClassName } >
              { reactRowElements }
        </div>
      </div>
    )
  }

}
