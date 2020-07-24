/**
 * dataTable_Table_HeaderRowEntry_React.tsx
 * 
 * Table Entry in Header Row
 */
import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataTable_Column } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { DataTable_Table_HeaderRowEntry_SortIcon_InContainer } from './dataTable_HeaderRowEntry_SortIcon_InContainer'


/**
 * 
 */
export interface DataTable_Table_HeaderRowEntry_Props {

  column : DataTable_Column
  column_sortDirection
  column_sortPosition
  lastColumn
  headerColumnClicked_Callback
}

/**
 * 
 */
export class DataTable_Table_HeaderRowEntry extends React.Component< DataTable_Table_HeaderRowEntry_Props, {} > {

  private _headerColumnClicked_BindThis = this._headerColumnClicked.bind(this);

  constructor(props : DataTable_Table_HeaderRowEntry_Props ) {
    super(props);
  }

  /**
   * 
   */
  _headerColumnClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) : void {
    try {

      event.preventDefault();   //  Prevent Default Action of event
      event.stopPropagation();  // Stop bubbling of event

      //  Comment out since breaks the Shift Key to sort on additional columns.
      //     Shift Click is causing a text selection from the previous click to the current click

      //  Using selectionObj.removeAllRanges();  sometimes works but not well enough to not be frustrating to the user

      // try { // In try/catch block in case not supported in browser
      //   const selectionObj = window.getSelection();
      //   const selection = selectionObj.toString()
      //   if ( selection ) {
      //      //  Found a Selection so exit with no further action
      //     return; //  EARLY RETURN
      //   }

      //   selectionObj.removeAllRanges();

      //   var znothing = 0;

      // } catch (e) {
      //   //  Eat exception
      //   const znothing = 0;
      // }

      //  Does NOT fix problem with Selection check breaking Shift Click to select more than one column to sort on
      // const eventTarget : EventTarget = event.target;
      // (eventTarget as any).blur();


      const shiftKeyDown = event.shiftKey;

      const columnId = this.props.column.id;

      this.props.headerColumnClicked_Callback({ shiftKeyDown, columnId });

    } catch( e ) {
      console.warn( "Error in DataTable_Table_HeaderRowEntry._headerColumnClicked: ", e )
      reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
      throw e;
    }
  }

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

        <th style={ { whiteSpace: "nowrap", width: column.width, minWidth: column.width, maxWidth: column.width } } 
          className={ className }  data-columnid={ column.id }>

            <div style={ { display: "inline-block", width: "80%", whiteSpace: "normal" } }>
                &nbsp;
            </div>

        </th>
      )
    
    } else {

      //  Normal Header Item

      const cellOuterContainerDivStyle = { width: column.width, minWidth: column.width, maxWidth: column.width };

      const cellInnerContainerDivStyle : React.CSSProperties = { display: "grid" };

      let classNameSortable = " non-sortable-header ";
      
      if ( column.sortable ) {
          classNameSortable = " sortable-header clickable " 
      }
  
      const className = classNameCommon + " " + classNameSortable;
  
      const styleDisplayNameDiv = { whiteSpace: "normal", fontSize: "12px", overflowX: "hidden", textOverflow: "ellipsis" } as React.CSSProperties;

      // const style_override_React = column.style_override_React;
  
      const style_override_React = column.style_override_HeaderRowCell_React;
  
      if ( style_override_React ) {
        //  Copy style_override_React object to styleInnerDiv object
  
        const style_override_ReactKeys = Object.keys( style_override_React );
        for ( const style_override_ReactKey of style_override_ReactKeys ) {
          styleDisplayNameDiv[ style_override_ReactKey ] =  style_override_React[ style_override_ReactKey ];
        }
      }

      let clickHandler = undefined;
      let sortIconContainer = undefined;

      if ( column.sortable ) {

        clickHandler = this._headerColumnClicked_BindThis;

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

      let className_InnermostDiv_Column_DisplayName : string = undefined
      {
          let classesAdditions = "";
          if ( column.cssClassNameAdditions_HeaderRowCell ) {
              classesAdditions = "  " + column.cssClassNameAdditions_HeaderRowCell;
          }

          className_InnermostDiv_Column_DisplayName = " display-name-container " + classesAdditions
      }

      headerItem = (
        <th 
            className={ className }
            onClick={ clickHandler }
            data-columnid={ column.id }>
          <div style={ cellOuterContainerDivStyle }>
            <div style={ cellInnerContainerDivStyle }>
              <div style= { styleDisplayNameDiv } className={ className_InnermostDiv_Column_DisplayName } >

                  <span className=" display-name-value ">{ column.displayName }</span>
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
