/**
 * dataTable_Table_DataRowEntry_React.tsx
 * 
 * Table Entry in Data Row
 */
import React from 'react'

import { DataTable_Column, DataTable_DataRow_ColumnEntry } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

/**
 * 
 */
export interface DataTable_Table_DataRowEntry_Props {

  dataObject_columnEntry : DataTable_DataRow_ColumnEntry
  column : DataTable_Column
}

/**
 * 
 * 
 * 
 */
export class DataTable_Table_DataRowEntry extends React.Component< DataTable_Table_DataRowEntry_Props, {} > {



  constructor(props : DataTable_Table_DataRowEntry_Props) {
    super(props);
    // this.rowDivRef = React.createRef();

    // this.state = {};
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
    shouldComponentUpdate(nextProps : DataTable_Table_DataRowEntry_Props, nextState) {

        // console.log("DataTable_Table_DataRowEntry: shouldComponentUpdate")

        if ( this.props.dataObject_columnEntry !== nextProps.dataObject_columnEntry ) {
            return true;
        }
        // if ( this.props.dataObject !== nextProps.dataObject ) {
        //     return true;
        // }
        return false;

      //  If Comment out prev code, uncomment this:

      //   return true;
    }

  // getSnapshotBeforeUpdate( <see docs> ) {


  // }


  /**
   * After render()
   */
  // componentDidUpdate(prevProps, prevState, snapshot) {


  // }


  /**
   * 
   * 
   * 
   */
  render () {

      const dataObject_columnEntry = this.props.dataObject_columnEntry;
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

      // let horizontalGraph = undefined;
      // let horizontalGraph_SpaceAfter = undefined;

      //  showHorizontalGraph not currently supported
      // if ( column.showHorizontalGraph ) {

      //   if ( this.props.dataObject.graphWidths === undefined || this.props.dataObject.graphWidths === null ) {

      //     console.log("column.showHorizontalGraph true but this.props.dataObject.graphWidths undefined or null. column.id: " + column.id );
      //   }  else {
      //     const dataObject_GraphWidth = this.props.dataObject.graphWidths[ column.id ];
      //     if ( dataObject_GraphWidth === undefined ) {
      //       throw Error("No value found in this.props.dataObject.graphWidths for column.id: " + column.id );
      //     }

      //     horizontalGraph = (
      //       <svg width={ column.graphWidth + "px" } height="14px" preserveAspectRatio="none">
      //         <rect x="0" y="0" width={ column.graphWidth + "px" } height="100%" 
      //           style={ { fillOpacity : 0.0, fill:"rgb(255,255,255)", strokeWidth : 2, stroke : "#d3d3d3"} } />
      //         <rect x="0" y="0" width={ dataObject_GraphWidth + "px" } height="100%" 
      //           style={ { fillOpacity:1.0, fill: "#32cd32", strokeWidth: 1 ,stroke : "#d3d3d3" } } />
      //       </svg>
      //     );
      //     horizontalGraph_SpaceAfter = " ";
      //   }
      // }

      const valueDisplay = dataObject_columnEntry.valueDisplay;

      const tooltipText = dataObject_columnEntry.tooltipText;

      if ( valueDisplay === undefined || valueDisplay === null ) {
        const msg = "DataTable_Table_DataRowEntry: Invalid value for valueDisplay: (valueDisplay === undefined || valueDisplay === null) is true: valueDisplay: " + valueDisplay + ", column.id " + column.id + ", dataObject_columnEntry: ";
        console.warn( msg, dataObject_columnEntry );
        throw Error( msg )
      }

      {
        if ( column.sortable ) {
          const valueSort = dataObject_columnEntry.valueSort
          if ( valueSort === undefined || valueSort === null ) {
            const msg = "DataTable_Table_DataRowEntry: column.sortable is true.  Invalid value for valueSort: (valueSort === undefined || valueSort === null) is true: valueSort: " + valueSort + ", column.id " + column.id + ", dataObject_columnEntry: ";
            console.warn( msg, dataObject_columnEntry );
            throw Error( msg )
          }
        }
      }

      //  React auto escapes '"' to &quot; for contents of 'title' property

      return (
          <td 
              className={ className }
              // data-index={ index }
              // data-value={ valueDisplay }
              >
                {/* Removed since property not set: data-row-id={ columnEntry.uniqueId } */}

            <div style={ styleContainerDiv } title={ tooltipText }>
              {/* { horizontalGraph }
              { horizontalGraph_SpaceAfter } */}
              <span className=" table-data-cell-property-value ">{ valueDisplay }</span>
            </div>
          </td>
      )
    }

}
