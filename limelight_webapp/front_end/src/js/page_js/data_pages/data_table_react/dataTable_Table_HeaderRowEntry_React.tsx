/**
 * dataTable_Table_HeaderRowEntry_React.tsx
 * 
 * Table Entry in Header Row
 */
import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import {DataTable_Column, DataTable_ColumnId} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { DataTable_Table_HeaderRowEntry_SortIcon_InContainer } from './dataTable_HeaderRowEntry_SortIcon_InContainer'
import {
  tooltip_Limelight_Create_Tooltip,
  Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";


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

  private _displayNameValueDOMElement_onMouseEnter_BindThis = this._displayNameValueDOMElement_onMouseEnter.bind(this);
  private _displayNameValueDOMElement_onMouseLeave_BindThis = this._displayNameValueDOMElement_onMouseLeave.bind(this);

  private readonly _displayNameValueDiv_Ref :  React.RefObject<HTMLDivElement>

  private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip


  constructor(props : DataTable_Table_HeaderRowEntry_Props ) {
    super(props);

    this._displayNameValueDiv_Ref = React.createRef();
  }

  /**
   *
   */
  componentWillUnmount() {
    try {
      this._removeTooltip();

    } catch( e ) {
      console.warn( "Error in DataTable_Table_HeaderRowEntry.componentWillUnmount: ", e )
      reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
      throw e;
    }
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
  private _displayNameValueDOMElement_onMouseEnter( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
    try {
      const tooltipContents = this.props.column.columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element();

      this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltipContents, tooltip_target_DOM_Element : this._displayNameValueDiv_Ref.current })

    } catch( e ) {
      console.warn( "Error in DataTable_Table_HeaderRowEntry._displayNameValueDOMElement_onMouseEnter: ", e )
      reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
      throw e;
    }
  }

  /**
   *
   */
  private _displayNameValueDOMElement_onMouseLeave( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
    try {
        this._removeTooltip();

    } catch( e ) {
      console.warn( "Error in DataTable_Table_HeaderRowEntry._displayNameValueDOMElement_onMouseLeave: ", e )
      reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
      throw e;
    }
  }

  /**
   *
   */
  private _removeTooltip() {

    if ( this._tooltip_Limelight_Created_Tooltip ) {
      this._tooltip_Limelight_Created_Tooltip.removeTooltip()
    }
    this._tooltip_Limelight_Created_Tooltip = undefined
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
          <div style={ { position: "relative", display: "inline-block" } }>
            <div style={ { position: "absolute", left: 4, bottom: svg_BottomPosition } }>
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

      let spanTitle : string = null;

      if ( column.columnHeader_Tooltip_HTML_TitleAttribute ) {

          spanTitle = column.columnHeader_Tooltip_HTML_TitleAttribute;
      }

      let displayNameValueDOMElement_onMouseEnter = null;
      let displayNameValueDOMElement_onMouseLeave = null;

      if ( column.columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element ) {

        displayNameValueDOMElement_onMouseEnter = this._displayNameValueDOMElement_onMouseEnter_BindThis;
        displayNameValueDOMElement_onMouseLeave = this._displayNameValueDOMElement_onMouseLeave_BindThis;
      }


      headerItem = (
        <th 
            className={ className }
            onClick={ clickHandler }
            data-columnid={ column.id }>
          <div style={ cellOuterContainerDivStyle }>
            <div style={ cellInnerContainerDivStyle }>
              <div
                  title={ spanTitle }
                  ref={ this._displayNameValueDiv_Ref }
                  onMouseEnter={ displayNameValueDOMElement_onMouseEnter }
                  onMouseLeave={ displayNameValueDOMElement_onMouseLeave }

                  style={ styleDisplayNameDiv } className={ className_InnermostDiv_Column_DisplayName } >

                  <span className=" display-name-value "
                  >{ column.displayName }</span>
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
