/**
 * dataTable_Table_HeaderRowEntry_React.jsx
 * 
 * Table Entry in Header Row
 */
import React from 'react'

/**
 * 
 */
export class DataTable_Table_HeaderRowEntry extends React.Component {

  /**
   * 
   */
  render () {

    const column = this.props.column;

    let headerItem = null;

    if ( column.hideColumnHeader ) {

      const className = "data-table-header-cell column-" + column.id + " blank-header non-sortable-header" ;

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

      let classNameSortable = " non-sortable-header ";
      let dataSortType = "";
      
      if ( column.sort ) {
          classNameSortable = " sortable-header clickable " 
          dataSortType = column.sort;
      }
  
      const className = "data-table-header-cell column-" + column.id + " " + classNameSortable;
  
      const styleInnerDiv = { display: "inline-block", width: "80%", whiteSpace: "normal", fontSize: "12px" };

      const style_override_React = column.style_override_React;
  
      if ( style_override_React ) {
        //  Copy style_override_React object to styleInnerDiv object
  
        const style_override_ReactKeys = Object.keys( style_override_React );
        for ( const style_override_ReactKey of style_override_ReactKeys ) {
          styleInnerDiv[ style_override_ReactKey ] =  style_override_React[ style_override_ReactKey ];
        }
      }

      let sortIcon = undefined;

      if ( column.sort ) {

        const sortIconStyle = { display: "inline-block" };
        if ( column.lastItem ) {
          sortIconStyle.paddingRight = "3px";
        }
        sortIcon =  ( <div style={ sortIconStyle }>
                        <img src="static/images/icon-sort.png" style={{ maxHeight: "12px" } }/>
                    </div>
                    );
      }

      let columnSeparator = undefined;

      if ( ! column.lastItem ) {
        columnSeparator = (
          <div style={ { position: "relative", display: "inline-block" } }>
            <div style={ { position: "absolute", left: "4px", bottom: "-4px" } }>
                <svg preserveAspectRatio="none" height="16px" width="2px"><line x1="0" y1="0" x2="0" y2="16" style={ { stroke: "#d3d3d3" /* "red" */, strokeWidth:2 } } /></svg>
            </div>
          </div>
        );
      }

      headerItem = (
        <th style={ { whiteSpace: "nowrap", width: column.width, maxWidth: column.width } }
            className={ className }
            onClick={ this.props.onClickFcn }
            data-sort_type={ dataSortType } data-columnid={ column.id }>

            <div style= { styleInnerDiv } >

                { column.displayName }
            </div>

            <div style={ { display: "inline-block", width: "20%", whiteSpace: "nowrap", textAlign: "right", paddingRight: "3px" } }>

              { sortIcon }

              { columnSeparator /* Place here so aligned to base line of column name  */ }

            </div>
            

        </th>
      );
    }

    return headerItem;
  }

}
