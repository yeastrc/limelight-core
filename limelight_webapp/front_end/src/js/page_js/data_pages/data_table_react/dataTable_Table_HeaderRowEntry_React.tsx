/**
 * dataTable_Table_HeaderRowEntry_React.tsx
 * 
 * Table Entry in Header Row
 */
import React from 'react'

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import {DataTable_Column, DataTable_ColumnId} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { DataTable_Table_HeaderRowEntry_SortIcon_InContainer } from './dataTable_HeaderRowEntry_SortIcon_InContainer'
import {
  limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition,
  Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


export interface DataTable_Table_HeaderRowEntry__headerColumnClicked_Callback_Params {
  ctrl_OR_meta_KeyDown : boolean
  columnId : DataTable_ColumnId
}

export type DataTable_Table_HeaderRowEntry__headerColumnClicked_Callback = (params: DataTable_Table_HeaderRowEntry__headerColumnClicked_Callback_Params) => void

/**
 * 
 */
export interface DataTable_Table_HeaderRowEntry_Props {

  column : DataTable_Column
  column_sortDirection: string
  column_sortPosition: number
  lastColumn: boolean
  no_Columns_Are_Sortable: boolean
  headerColumnClicked_Callback: DataTable_Table_HeaderRowEntry__headerColumnClicked_Callback
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

      try { // In try/catch block in case not supported in browser
        const selectionObj = window.getSelection();
        const selection = selectionObj.toString()
        if ( selection ) {
           //  Found a Selection so exit with no further action
          return; //  EARLY RETURN
        }

      } catch (e) {
        //  Eat exception
        const znothing = 0;
      }

      const ctrl_OR_meta_KeyDown = event.ctrlKey || event.metaKey;

      const columnId = this.props.column.id;

      this.props.headerColumnClicked_Callback({ ctrl_OR_meta_KeyDown, columnId });

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

      //  Contained <span> has overflow-wrap: break-word; so ' overflowX: "hidden", textOverflow: "ellipsis" ' doesn't appear to have any effect
      const styleDisplayNameDiv : React.CSSProperties = { whiteSpace: "normal", overflowX: "hidden", textOverflow: "ellipsis" };

      // const style_override_React = column.style_override_React;
  
      const style_override_React = column.style_override_HeaderRowCell_React;
  
      if ( style_override_React ) {
        //  Copy style_override_React object to styleInnerDiv object
  
        const style_override_ReactKeys = Object.keys( style_override_React );
        for ( const style_override_ReactKey of style_override_ReactKeys ) {
          //  Copy object property with string in style_override_ReactKey from style_override_React to styleDisplayNameDiv
          // @ts-ignore
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

        let svg_BottomPosition = 0;
        if ( this.props.no_Columns_Are_Sortable ) {
          svg_BottomPosition = -4;
        }

        //  Column separator vertical line positioned to be on the edge between cells in the table
        columnSeparator = (
          <div
              className=" header-cell-divider-line-outer-container "  // Value for 'position' and 'display'
          >
            <div
                className=" header-cell-divider-line-inner-container "  // Value for 'left' and 'position'
                style={ { bottom: svg_BottomPosition } }
            >
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

      let column_Title_Element: React.JSX.Element = (

          <div style={ styleDisplayNameDiv } className={ className_InnermostDiv_Column_DisplayName }>

            { column.columnHeader_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element ? (
                column.columnHeader_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element()
            ) : (
                  <span className=" display-name-value ">{ column.displayName }</span>
            )}
          </div>
      )

      headerItem = (
          <th
              className={ className }
              onClick={ clickHandler }
              data-columnid={ column.id }>
            <div style={ cellOuterContainerDivStyle }>
              <div style={ cellInnerContainerDivStyle }>

                { column_Title_Element }

                { sortIconContainer }

              { columnSeparator /* Place here so aligned to base line of column name  */ }
            </div>
          </div>
        </th>
      );
    }

    if ( column.columnHeader_Tooltip_HTML_TitleAttribute ) {

      const tooltip_Main_Props = limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition();

      headerItem = (
          <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
              { ...tooltip_Main_Props }
              disableInteractive={ false }
              placement={ "top" }
              title={
                <span>{ column.columnHeader_Tooltip_HTML_TitleAttribute }</span>
              }
          >
            { headerItem }
          </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
      )

    } else if ( column.columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element ) {

      const tooltip_Main_Props = limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition();

      headerItem = (
          <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
              { ...tooltip_Main_Props }
              disableInteractive={ false }
              placement={ "top" }
              title={
                <span>{ column.columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element() }</span>
              }
          >
            { headerItem }
          </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
      )
    }


    return headerItem;
  }

}
