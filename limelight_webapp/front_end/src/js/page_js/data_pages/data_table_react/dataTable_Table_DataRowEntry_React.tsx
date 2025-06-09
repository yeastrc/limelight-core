/**
 * dataTable_Table_DataRowEntry_React.tsx
 * 
 * Table Entry in Data Row
 */
import React from 'react'

import { limelight__variable_is_type_number_Check } from 'page_js/common_all_pages/limelight__variable_is_type_number_Check';

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
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/**
 * 
 */
export interface DataTable_Table_DataRowEntry_Props {

    dataObject_columnEntry : DataTable_DataRow_ColumnEntry
    column : DataTable_Column
    isInGroup: boolean
    isFirstRowInGroup: boolean
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

  constructor(props : DataTable_Table_DataRowEntry_Props) {
    super(props);

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
              styleContainerDiv[style_override_ReactKey] = style_override_React[style_override_ReactKey];
          }
        }
      }

      if ( column.onlyShow_ValueDisplay_FirstRowOfGroup && this.props.isInGroup && ( ! this.props.isFirstRowInGroup ) ) {

          //  Early Return of empty cell

          return ( //  EARLY RETURN
              <td
                  style={ styleContainerDiv }
                  className={ className_Container_TD }

              > </td>   // Empty Cell for Placeholder in table
          )
      }

      //   !!!!  REST Only Executed When prev "return" not executed

      //////////////
      //////////////
      //////////////


      let horizontalGraph = undefined;
      let horizontalGraph_SpaceAfter = undefined;


      if ( column.showHorizontalGraph ) {

        if ( dataObject_columnEntry.valueSort == undefined || dataObject_columnEntry.valueSort === null ) {
          const msg = "DataTable_Table_DataRowEntry: column.showHorizontalGraph is true and is true if ( dataObject_columnEntry.valueSort == undefined || dataObject_columnEntry.valueSort === null )";
          console.warn( msg );
          throw Error( msg );
        }

        if ( ! limelight__variable_is_type_number_Check( dataObject_columnEntry.valueSort ) ) {
          const msg = "DataTable_Table_DataRowEntry: column.showHorizontalGraph is true and dataObject_columnEntry.valueSort is not a number.  dataObject_columnEntry.valueSort: " + dataObject_columnEntry.valueSort;
          console.warn( msg );
          throw Error( msg );
        }

        const valueSort_AsNumber = dataObject_columnEntry.valueSort as number;

        let fractionOfMaxValue = valueSort_AsNumber / column.graphMaxValue;
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

      if ( ( ! valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough ) && ( valueDisplay === undefined || valueDisplay === null ) ) {
        const msg = "DataTable_Table_DataRowEntry: Invalid value for valueDisplay: (valueDisplay === undefined || valueDisplay === null) is true: valueDisplay: " + valueDisplay + ", column.id " + column.id + ", dataObject_columnEntry: ";
        console.warn( msg, dataObject_columnEntry );
        throw Error( msg )
      }

      {
          if ( column.sortable ) {
              if ( column.sortFunction ) {
                  // Column Marked Sortable and have sortFunction so property valueSort_FOR_DataTable_Column_sortFunction must have a value
                  if (dataObject_columnEntry.valueSort_FOR_DataTable_Column_sortFunction === undefined || dataObject_columnEntry.valueSort_FOR_DataTable_Column_sortFunction === null) {
                      const msg = "DataTable_Table_DataRowEntry: column.sortable is true and column.sortFunction is populated and dataObject_columnEntry.valueSort_FOR_DataTable_Column_sortFunction is undefined or null.";
                      console.warn(msg);
                      throw Error(msg);
                  }
              } else {
                  // Column Marked Sortable and NOT have sortFunction so property valueSort must have a value

                  if (dataObject_columnEntry.valueSort === undefined) {
                      const msg = "DataTable_Table_DataRowEntry: column.sortable is true and dataObject_columnEntry.valueSort is undefined."
                      console.warn(msg);
                      throw Error(msg);
                  }

                  if ( ! column.sort_Null_BeforeValues_AfterValues_Enum ) {
                      if ( dataObject_columnEntry.valueSort === null ) {
                          const msg = "DataTable_Table_DataRowEntry: column.sortable is true and dataTable_ColumnEntry.sort_Null_BeforeValues_AfterValues_Enum is not set and dataObject_columnEntry.valueSort is null."
                          console.warn( msg );
                          throw Error( msg );
                      }
                  }
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

      //   "return" earlier for certain conditions

      const mainReturnElement = (
            <td
                style={ styleContainerDiv }
                className={ className_Container_TD }
            >

                { horizontalGraph }
                { horizontalGraph_SpaceAfter }
                { valueDisplay }{ cellDisplayContents_FromCallback }
            </td>
      )

    if ( ( ! dataObject_columnEntry.tooltipText ) && ( ! dataObject_columnEntry.tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough ) ) {

        return mainReturnElement  // EARLY RETURN
    }

    //  Have one of tooltip properties so surround the main element <td> with the Tooltip component

    if ( dataObject_columnEntry.tooltipText ) {

        // EARLY RETURN

        return (
            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                title={
                    dataObject_columnEntry.tooltipText
                }
                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
            >
                { mainReturnElement }
            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
        )
    }


    const params : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params = {

    }

    return (
        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
            title={ dataObject_columnEntry.tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough( params ) }
            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
        >
            { mainReturnElement }
        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
    )
    }

}
