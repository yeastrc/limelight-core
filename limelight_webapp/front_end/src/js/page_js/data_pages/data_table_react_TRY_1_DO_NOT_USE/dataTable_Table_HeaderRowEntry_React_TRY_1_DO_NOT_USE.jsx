/**
 * dataTable_Table_HeaderRowEntry_React_TRY_1_DO_NOT_USE.jsx
 * 
 * Table Entry in Header Row
 */
import React from 'react'

import { DataTable_Table_HeaderRowEntry_SortIcon_InContainer } from './dataTable_HeaderRowEntry_SortIcon_InContainer_TRY_1_DO_NOT_USE.jsx'

/**
 * 
 */
export class DataTable_Table_HeaderRowEntry extends React.Component {

  /**
   * 
   */
  render () {

    const column = this.props.column;

    const classNameCommon = "data-table-header-cell column-" + column.id + " ";

    let headerItem = null;

    if ( column.hideColumnHeader ) {

      const className = classNameCommon + " blank-header non-sortable-header" ;

      //  Empty Column Header
      headerItem = (

        <th style={ { whiteSpace: "nowrap", width: column.width, maxWidth: column.width } } 
          class={ className }  data-columnid={ column.id }>

            <div style={ { display: "inline-block", width: "80%", whiteSpace: "normal" } }>
                &nbsp;
            </div>

        </th>
      )
    
    } else {

      //  Normal Header Item

      const cellOuterContainerDivStyle = { width: column.width, maxWidth: column.width };

      const cellInnerContainerDivStyle = { display: "grid" };

      let classNameSortable = " non-sortable-header ";
      let dataSortType = "";
      
      if ( column.sort ) {
          classNameSortable = " sortable-header clickable " 
          dataSortType = column.sort;
      }
  
      const className = classNameCommon + " " + classNameSortable;
  
      const styleDisplayNameDiv = { whiteSpace: "normal", fontSize: "12px", overflowX: "hidden", textOverflow: "ellipsis" };

      // const style_override_React = column.style_override_React;
  
      const style_override_React = column.style_override_header_React;
  
      if ( style_override_React ) {
        //  Copy style_override_React object to styleInnerDiv object
  
        const style_override_ReactKeys = Object.keys( style_override_React );
        for ( const style_override_ReactKey of style_override_ReactKeys ) {
          styleDisplayNameDiv[ style_override_ReactKey ] =  style_override_React[ style_override_ReactKey ];
        }
      }

      let sortIconContainer = undefined;

      if ( column.sort ) {

        sortIconContainer = (
          <DataTable_Table_HeaderRowEntry_SortIcon_InContainer
            column_sortDirection={ this.props.column_sortDirection } 
            column_sortPosition={ this.props.column_sortPosition } 
            lastColumn={ this.props.lastColumn } 
          />
        );
      }

      let columnSeparator = undefined;

      if ( ! this.props.lastColumn ) {

        //  Column separator vertical line positioned to be on the edge between cells in the table
        columnSeparator = (
          <div style={ { position: "relative", display: "inline-block" } }>
            <div style={ { position: "absolute", left: "4px", bottom: "-0px" } }>
                <svg preserveAspectRatio="none" height="16px" width="2px"><line x1="0" y1="0" x2="0" y2="16" style={ { stroke: "#d3d3d3", strokeWidth:2 } } /></svg>
            </div>
          </div>
        );
      }

      //  Style the cell for which parts are in it.

      if ( sortIconContainer && columnSeparator ) {
        cellInnerContainerDivStyle.gridTemplateColumns = "auto  min-content min-content";
      } else if ( sortIconContainer ) {
        cellInnerContainerDivStyle.gridTemplateColumns = "auto  min-content";
      } else if ( columnSeparator ) {
        cellInnerContainerDivStyle.gridTemplateColumns = "auto  min-content";
      } else {
        cellInnerContainerDivStyle.gridTemplateColumns = "auto";
      }

      headerItem = (
        <th 
            className={ className }
            onClick={ this.props.onClickFcn }
            data-sort_type={ dataSortType } data-columnid={ column.id }>
          <div style={ cellOuterContainerDivStyle }>
            <div style={ cellInnerContainerDivStyle }>
              <div style= { styleDisplayNameDiv } className=" display-name-container " >

                  { column.displayName }
              </div>

              { sortIconContainer }

              { columnSeparator /* Place here so aligned to base line of column name  */ }
            </div>
          </div>
        </th>
      );
    }

    return headerItem;
  }

}
