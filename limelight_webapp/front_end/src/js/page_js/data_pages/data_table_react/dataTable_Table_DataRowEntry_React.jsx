/**
 * dataTable_Table_DataRowEntry_React.jsx
 * 
 * Table Entry in Data Row
 */
import React from 'react'

export class DataTable_Table_DataRowEntry extends React.Component {
  
  render () {

    //  props
    // tableObject={ this.props.tableObject }
    // dataObject={ this.props.dataObject }
    // dataColumn={ dataColumn } 

    const column = this.props.dataColumn.column;

    // style_override_React

    // <div style="width:{{column.width}};max-width:{{column.width}};{{#if column.style_override}}{{column.style_override}}{{/if}}"
    // class="div-table-data-cell div-table-cell column-{{column.id}} {{#if column.css_class}}{{column.css_class}}{{/if}}"

    let classesAdditions = "";
    if ( column.css_class ) {
      classesAdditions = column.css_class;
    }

    const className = "data-table-data-cell data-table-cell column-" // 'data-table-cell' not in CSS file
        + column.id
        + classesAdditions;


    const styleContainerDiv = { width: column.width, maxWidth: column.width };

    const style_override_React = column.style_override_React;

    if ( style_override_React ) {
      //  Copy style_override_React object to styleContainerDiv object

      const style_override_ReactKeys = Object.keys( style_override_React );
      for ( const style_override_ReactKey of style_override_ReactKeys ) {
        styleContainerDiv[ style_override_ReactKey ] =  style_override_React[ style_override_ReactKey ];
      }
    }

    let horizontalGraph = "";
    let horizontalGraph_SpaceAfter = "";

    if ( column.showHorizontalGraph ) {

      if ( this.props.dataObject.graphWidths === undefined || this.props.dataObject.graphWidths === null ) {

        console.log("column.showHorizontalGraph true but this.props.dataObject.graphWidths undefined or null. column.id: " + column.id );
      }  else {
        const dataObject_GraphWidth = this.props.dataObject.graphWidths[ column.id ];
        if ( dataObject_GraphWidth === undefined ) {
          throw Error("No value found in this.props.dataObject.graphWidths for column.id: " + column.id );
        }

        horizontalGraph = (
          <svg width={ column.graphWidth + "px" } height="14px" preserveAspectRatio="none">
            <rect x="0" y="0" width={ column.graphWidth + "px" } height="100%" 
              style={ { fillOpacity : 0.0, fill:"rgb(255,255,255)", strokeWidth : 2, stroke : "#d3d3d3"} } />
            <rect x="0" y="0" width={ dataObject_GraphWidth + "px" } height="100%" 
              style={ { fillOpacity:1.0, fill: "#32cd32", strokeWidth: 1 ,stroke : "#d3d3d3" } } />
          </svg>
        );
        horizontalGraph_SpaceAfter = " ";
      }
    }

    const displayValue = this.props.dataColumn.displayValue;

    return (
    <td 
        className={ className }
        data-columnid={ column.id }
        data-value={ displayValue }
        data-row-id={ this.props.dataObject.uniqueId }>

      <div style={ styleContainerDiv }>
        { horizontalGraph }
        { horizontalGraph_SpaceAfter }
        { displayValue }
      </div>
    </td>
    )
  }

}
