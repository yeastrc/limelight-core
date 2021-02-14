/**
 * dataTable_HeaderRowEntry_SortIcon_InContainer.tsx
 * 
 * Sort Icon for Table Entry in Header Row
 */
import React from 'react'
import { SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DECENDING } from './dataTable_constants';


const sortIconWidth  = 12;  // in px
const sortIconHeight = 23;  // in px

const triangleTipOffsetFromTopAndBottomEdge = 2; // in px

//  Hard coded text positions below

const iconColor = "#d3d3d3";
const iconFillWhenNumberColor = iconColor;
// const iconFillWhenNumberColor = "#e3e3e3";

const create_upperTrianglePoints = () => {
  const pointTopCenter = { x: ( sortIconWidth / 2 ), y: triangleTipOffsetFromTopAndBottomEdge };
  const leftAndRight_Y = ( ( sortIconHeight - 1 ) / 2 );
  const pointLeft = { x: 0, y: leftAndRight_Y };
  const pointRight = { x: ( sortIconWidth ), y: leftAndRight_Y };
  const upperTrianglePoints = "" + pointTopCenter.x + " " + pointTopCenter.y + ", " + pointLeft.x + " " + pointLeft.y + ", " + pointRight.x + " " + pointRight.y;
  return upperTrianglePoints;
}

const create_lowerTrianglePoints = () => {
  const pointBottomCenter = { x: ( sortIconWidth / 2 ), y: sortIconHeight - triangleTipOffsetFromTopAndBottomEdge };
  const leftAndRight_Y = ( ( sortIconHeight + 1 ) / 2 );
  const pointLeft = { x: 0, y: leftAndRight_Y };
  const pointRight = { x: ( sortIconWidth ), y: leftAndRight_Y };
  const lowerTrianglePoints = "" + pointBottomCenter.x + " " + pointBottomCenter.y + ", " + pointLeft.x + " " + pointLeft.y + ", " + pointRight.x + " " + pointRight.y;
  return lowerTrianglePoints;
}

const upperTrianglePoints = create_upperTrianglePoints();

const lowerTrianglePoints = create_lowerTrianglePoints();

const polygonUpper = ( <polygon points={ upperTrianglePoints } style={ { fillOpacity:1.0, fill: iconColor, strokeWidth: 0 ,stroke : iconColor } } /> );
const polygonLower = ( <polygon points={ lowerTrianglePoints } style={ { fillOpacity:1.0, fill: iconColor, strokeWidth: 0 ,stroke : iconColor } } /> );


//  Draw triangles pointing up and down - This column is not currently used in sorting
const sortIcon_NotCurrentLyForSorting = (
  <svg width={ sortIconWidth + "px" } height={ sortIconHeight + "px" } >
    { polygonUpper }
    { polygonLower }
  </svg>
);

export interface DataTable_Table_HeaderRowEntry_SortIcon_InContainer_Props {

  column_sortDirection?: any ; // may be undefined
  column_sortPosition: any
  lastColumn: any;
}

/**
 * 
 */
export class DataTable_Table_HeaderRowEntry_SortIcon_InContainer extends React.Component< DataTable_Table_HeaderRowEntry_SortIcon_InContainer_Props, {} > {

    // //  Add state so can update tooltip when tooltip in props changes
    // constructor(props : DataTable_Table_HeaderRowEntry_SortIcon_InContainer_Props) {
    //     super(props);
    //     // this._headerColumnClicked = this._headerColumnClicked.bind(this);
    //     this.state = {
    //         tableObject: props.tableObject,
    //         tableOptions : props.tableOptions,
    //         sortColumnsInfo : undefined
    //     };
    // }

    /**
     * 
     */
    render () {
  
      const column_sortDirection = this.props.column_sortDirection; // may be undefined
      const column_sortPosition = this.props.column_sortPosition;

      let sortIcon = undefined;

      if ( column_sortDirection ) {
        
        if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {

          let sortPosition_TextElement = undefined;

          if ( column_sortPosition ) {
            
            sortPosition_TextElement = (
              <text x={ sortIconWidth / 2 } y="20" style={ { fontWeight: "normal", fontSize: "11px", textAnchor: "middle" } }
                >{ column_sortPosition }</text>
            );
          }

          sortIcon = (
            <svg width={ sortIconWidth + "px" } height={ sortIconHeight + "px" } >
                { polygonUpper }
                { sortPosition_TextElement }
            </svg>
          );

        } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {

          let sortPosition_TextElement = undefined;

          if ( column_sortPosition ) {
            
            sortPosition_TextElement = (
              <text x={ sortIconWidth / 2 } y="10" style={ { fontWeight: "normal", fontSize: "11px", textAnchor: "middle" } }
                >{ column_sortPosition }</text>
            );
          }

          sortIcon = (
            <svg width={ sortIconWidth + "px" } height={ sortIconHeight + "px" } >
              { sortPosition_TextElement }
              { polygonLower }
            </svg>
          );

        } else {
          throw Error("column_sortDirection is not SORT_DIRECTION_ASCENDING or SORT_DIRECTION_DECENDING, is: " + column_sortDirection );
        }
      } else {
        //  Draw triangles pointing up and down - This column is not currently used in sorting
        sortIcon = sortIcon_NotCurrentLyForSorting;
      }

      const sortIconStyle : React.CSSProperties = { display: "flex", alignItems: "flex-end", paddingLeft: "1px" };
      if ( this.props.lastColumn ) {
        sortIconStyle.paddingRight = "3px";
      }

      const sortIconContainer =  ( 
        <div style={ sortIconStyle }>       
          { sortIcon }
        </div>
      );

      return sortIconContainer;

    }

}

