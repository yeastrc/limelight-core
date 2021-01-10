/**
 * dataTable_Table_DataRowEntry_React.tsx
 * 
 * Table Entry in Data Row
 */
import React from 'react'

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

import { DataTable_Column, DataTable_DataRow_ColumnEntry } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
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

/**
 * 
 * 
 * 
 */
export class DataTable_Table_DataRowEntry extends React.Component< DataTable_Table_DataRowEntry_Props, {} > {

    private _cellContentsSpan_onMouseEnterCallback_BindThis = this._cellContentsSpan_onMouseEnterCallback.bind(this);
    private _cellContentsSpan_onMouseLeaveCallback_BindThis = this._cellContentsSpan_onMouseLeaveCallback.bind(this);

    private readonly _displayNameValueSpan_Ref :  React.RefObject<HTMLElement>

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip

  constructor(props : DataTable_Table_DataRowEntry_Props) {
    super(props);

      this._displayNameValueSpan_Ref = React.createRef();

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
     */
  private _cellContentsSpan_onMouseEnterCallback( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
      try {
          const tooltipContents = this.props.dataObject_columnEntry.tooltipDisplay_FunctionCallback_Return_JSX_Element_NoParamsPassed();

          this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltipContents, tooltip_target_DOM_Element : this._displayNameValueSpan_Ref.current })

      } catch( e ) {
          console.warn( "Error in DataTable_Table_DataRowEntry._cellContentsSpan_onMouseEnterCallback: ", e )
          reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
          throw e;
      }
  }

    /**
     *
     */
    private _cellContentsSpan_onMouseLeaveCallback( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {
            this._removeTooltip();

        } catch( e ) {
            console.warn( "Error in DataTable_Table_DataRowEntry._cellContentsSpan_onMouseLeaveCallback: ", e )
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
          styleContainerDiv[ style_override_ReactKey ] =  style_override_React[ style_override_ReactKey ];
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
      const valueDisplay_FunctionCallback_Return_JSX_Element_NoParamsPassed = dataObject_columnEntry.valueDisplay_FunctionCallback_Return_JSX_Element_NoParamsPassed;

      const tooltipText = dataObject_columnEntry.tooltipText;

      if ( ( ! valueDisplay_FunctionCallback_Return_JSX_Element_NoParamsPassed ) && ( valueDisplay === undefined || valueDisplay === null ) ) {
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
      if ( valueDisplay_FunctionCallback_Return_JSX_Element_NoParamsPassed ) {
          cellDisplayContents_FromCallback = valueDisplay_FunctionCallback_Return_JSX_Element_NoParamsPassed();
          valueDisplay_ForCell = null;
      }

      //  Cell tooltip

      let cellContentsSpan_onMouseEnterCallback = undefined;
      let cellContentsSpan_onMouseLeaveCallback = undefined;

      if ( dataObject_columnEntry.tooltipDisplay_FunctionCallback_Return_JSX_Element_NoParamsPassed ) {

          cellContentsSpan_onMouseEnterCallback = this._cellContentsSpan_onMouseEnterCallback_BindThis;
          cellContentsSpan_onMouseLeaveCallback = this._cellContentsSpan_onMouseLeaveCallback_BindThis;
      }

      return (
          <td 
              className={ " data-table-data-cell data-table-cell " }
              // data-index={ index }
              // data-value={ valueDisplay }
              >
                {/* Removed since property not set: data-row-id={ columnEntry.uniqueId } */}

            <div style={ styleContainerDiv } className={ column.cssClassNameAdditions_DataRowCell } title={ tooltipText } >
              { horizontalGraph }
              { horizontalGraph_SpaceAfter }
              <span ref={ this._displayNameValueSpan_Ref }
                  className=" table-data-cell-property-value "
                    onMouseEnter={ cellContentsSpan_onMouseEnterCallback }
                    onMouseLeave={ cellContentsSpan_onMouseLeaveCallback }
              >{ valueDisplay }{ cellDisplayContents_FromCallback }</span>
            </div>
          </td>
      )
    }

}
