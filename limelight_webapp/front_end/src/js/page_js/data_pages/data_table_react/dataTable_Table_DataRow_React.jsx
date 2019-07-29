/**
 * dataTable_Table_DataRow_React.jsx
 * 
 * Table Data Row
 */
import React from 'react'

import { DataTable_Table_DataRowEntry } from './dataTable_Table_DataRowEntry_React.jsx';


export class DataTable_Table_DataRow extends React.Component {
  
  constructor(props) {
    super(props);
    // this.rowDivRef = React.createRef();
  }


  render () {

    let classNameClickable = " ";
    
    if ( this.props.tableObject.expandableRows ) {
      classNameClickable = " clickable " 
    }

    const className = ( "selector_data_table_row data-table-data-row  table-row-hovered-highlight   " 
        + classNameClickable );
        //   expandable-table-row

    //  Build Array of columns in "Final" form

    const dataRowColumns = [];

    for ( const column of this.props.tableObject.columns ) {

      const dataColumn = {
        column : column,
        displayValue : this.props.dataObject[ column.dataProperty ]
      }

      dataRowColumns.push( dataColumn );
    }

    //   The onMouseOut does not appear to fire consistently.  
    //        Rows are left highlighted after the mouse has moved to another row and that row is highlighted.
    // Code in these functions for onMouseOver and onMouseOut change the DOM directly which is a "BAD" idea
    // onMouseOver={ (event) => { this.rowDivRef.current.classList.add( "hoveredTableRow" ) } }
    // onMouseOut={ (event) => { this.rowDivRef.current.classList.remove( "hoveredTableRow" ) } }

    //  Currently highlighting the row on hover using CSS class 'table-row-hovered-highlight' (see it above)

    // put inside <div> to use it: ref={ this.rowDivRef }

    return (
      <div >
        <table className=" data-table-data-rows-table ">
          <tbody>

            <tr 
              style={ { position: "relative" } } 
              className={ className } 
              onClick={ (event) => 
                  { if ( this.props.tableOptions.rowClickHandler ) {
                    this.props.tableOptions.rowClickHandler({ 
                      event, uniqueId : this.props.dataObject.uniqueId, dataObject : this.props.dataObject }) } } }
              data-id={ this.props.dataObject.uniqueId }>

              { dataRowColumns.map(dataColumn =>
                  <DataTable_Table_DataRowEntry 
                    tableObject={ this.props.tableObject }
                    dataObject={ this.props.dataObject }
                    dataColumn={ dataColumn } 
                    key={ dataColumn.column.id } />)}

            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}
