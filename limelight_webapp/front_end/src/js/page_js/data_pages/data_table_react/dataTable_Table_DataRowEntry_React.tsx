/**
 * dataTable_Table_DataRowEntry_React.tsx
 * 
 * Table Entry in Data Row
 */
import React from 'react'

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

import {
    DataTable_Column,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import {
    tooltip_Limelight_Create_Tooltip,
    Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

/**
 * 
 */
export interface DataTable_Table_DataRowEntry_Props {

  dataObject_columnEntry : DataTable_DataRow_ColumnEntry
  column : DataTable_Column
}

class DataTable_Table_DataRowEntry_State {

    _placeholder: any
}

/**
 * 
 * 
 * 
 */
export class DataTable_Table_DataRowEntry extends React.Component< DataTable_Table_DataRowEntry_Props, DataTable_Table_DataRowEntry_State > {

    private _cellContentsDiv_onMouseEnterCallback_BindThis = this._cellContentsDiv_onMouseEnterCallback.bind(this);
    private _cellContentsDiv_onMouseLeaveCallback_BindThis = this._cellContentsDiv_onMouseLeaveCallback.bind(this);

    private readonly _displayNameValue_TD_Ref :  React.RefObject<HTMLTableDataCellElement>

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip

  constructor(props : DataTable_Table_DataRowEntry_Props) {
    super(props);

      this._displayNameValue_TD_Ref = React.createRef();

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
    shouldComponentUpdate(nextProps : DataTable_Table_DataRowEntry_Props, nextState: DataTable_Table_DataRowEntry_State ) {

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
     */
  private _cellContentsDiv_onMouseEnterCallback( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
      try {
          const params : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params = {

          }
          const tooltipContents = this.props.dataObject_columnEntry.tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough(params);

          this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltipContents, tooltip_target_DOM_Element : this._displayNameValue_TD_Ref.current })

      } catch( e ) {
          console.warn( "Error in DataTable_Table_DataRowEntry._cellContentsDiv_onMouseEnterCallback: ", e )
          reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
          throw e;
      }
  }

    /**
     *
     */
    private _cellContentsDiv_onMouseLeaveCallback( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {
            this._removeTooltip();

        } catch( e ) {
            console.warn( "Error in DataTable_Table_DataRowEntry._cellContentsDiv_onMouseLeaveCallback: ", e )
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
   * 
   * 
   */
  render () {

      const dataObject_columnEntry = this.props.dataObject_columnEntry;
      // const index = this.props.index;

      const column = this.props.column;

      let className_Container_TD = " data-table-data-cell ";
      if ( column.cssClassNameAdditions_DataRowCell ) {
          className_Container_TD += column.cssClassNameAdditions_DataRowCell;
      }

      const styleContainerDiv : React.CSSProperties = { width: column.width, minWidth: column.width, maxWidth: column.width };

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
          if ( style_override_ReactKey !== 'display') { // NOT ALLOW: change to 'display' property
              //  Copy object property with string in style_override_ReactKey from style_override_React to styleContainer_TD
              // @ts-ignore
              styleContainerDiv[style_override_ReactKey] = style_override_React[style_override_ReactKey];
          }
        }
      }

      let horizontalGraph = undefined;
      let horizontalGraph_SpaceAfter = undefined;

       
      if ( column.showHorizontalGraph ) {

        if ( dataObject_columnEntry.valueSort == undefined || dataObject_columnEntry.valueSort === null ) {
          const msg = "DataTable_Table_DataRowEntry: column.showHorizontalGraph is true and is true if ( dataObject_columnEntry.valueSort == undefined || dataObject_columnEntry.valueSort === null )";
          console.warn( msg );
          throw Error( msg );
        }

        if ( ! variable_is_type_number_Check( dataObject_columnEntry.valueSort ) ) {
          const msg = "DataTable_Table_DataRowEntry: column.showHorizontalGraph is true and dataObject_columnEntry.valueSort is not a number.  dataObject_columnEntry.valueSort: " + dataObject_columnEntry.valueSort;
          console.warn( msg );
          throw Error( msg );
        }

        let fractionOfMaxValue = dataObject_columnEntry.valueSort / column.graphMaxValue;
        if ( fractionOfMaxValue > 1 ) {
          fractionOfMaxValue = 1; // limit to max of 1
        }

        const widthForValue = Math.round( fractionOfMaxValue * column.graphWidth );

        if ( Number.isNaN( widthForValue ) ) {
          throw Error("DataTable_Table_DataRowEntry: widthForValue is NaN. dataObject_columnEntry.valueSort: " + dataObject_columnEntry.valueSort + ", column.graphMaxValue: " + column.graphMaxValue + ", column.graphWidth: " + column.graphWidth )
        }

        horizontalGraph = (
          <svg width={ column.graphWidth + "px" } height="14px" preserveAspectRatio="none">
            <rect x="0" y="0" width={ column.graphWidth + "px" } height="100%" 
              style={ { fillOpacity : 0.0, fill:"rgb(255,255,255)", strokeWidth : 2, stroke : "#d3d3d3"} } />
            <rect x="0" y="0" width={ widthForValue + "px" } height="100%" 
              style={ { fillOpacity:1.0, fill: "#32cd32", strokeWidth: 1 ,stroke : "#d3d3d3" } } />
          </svg>
        );
        horizontalGraph_SpaceAfter = " ";
      }

      const valueDisplay = dataObject_columnEntry.valueDisplay;
      const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough = dataObject_columnEntry.valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough;

      const tooltipText = dataObject_columnEntry.tooltipText;

      if ( ( ! valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough ) && ( valueDisplay === undefined || valueDisplay === null ) ) {
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

      let valueDisplay_ForCell = valueDisplay;
      let cellDisplayContents_FromCallback : JSX.Element = null;
      if ( valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough ) {
          const params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params = {

          }
          cellDisplayContents_FromCallback = valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough(params);
          valueDisplay_ForCell = null;
      }

      //  Cell tooltip

      let cellContentsDiv_onMouseEnterCallback = undefined;
      let cellContentsDiv_onMouseLeaveCallback = undefined;

      if ( dataObject_columnEntry.tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough ) {

          cellContentsDiv_onMouseEnterCallback = this._cellContentsDiv_onMouseEnterCallback_BindThis;
          cellContentsDiv_onMouseLeaveCallback = this._cellContentsDiv_onMouseLeaveCallback_BindThis;
      }

      return (
          <td
              ref={ this._displayNameValue_TD_Ref }
              style={ styleContainerDiv }
              className={ className_Container_TD }
              //  Set onMouse... if have tooltip callback
              onMouseEnter={ cellContentsDiv_onMouseEnterCallback }
              onMouseLeave={ cellContentsDiv_onMouseLeaveCallback }
              // Set title attribute if have text tooltip
              title={ tooltipText }
              >

              { horizontalGraph }
              { horizontalGraph_SpaceAfter }
              { valueDisplay }{ cellDisplayContents_FromCallback }
          </td>
      )
    }

}
