/**
 * dataTable_Table_DataRow_React.tsx
 * 
 * Table Data Row
 */
import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


import {
    DataTable_TableOptions, DataTable_TableOptions_dataRow_GetChildTableData_RequestParm, DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm,
    DataTable_Column, DataTable_DataRowEntry, DataTable_RootTableObject, DataTable_RootTableDataObject, DataTable_TableOptions_dataRowClickHandler_RequestParm_RowDOM_Rect
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { DataTable_TableRoot } from './dataTable_TableRoot_React';
import { DataTable_Table_DataRowEntry } from './dataTable_Table_DataRowEntry_React';
import { DataTable_Table_DataRowEntry_External_Cell_Mgmt_React } from './dataTable_Table_DataRowEntry_External_Cell_Mgmt_React';
import { DataTable_Table_DataRowEntry_External_ReactComponent } from './dataTable_Table_DataRowEntry_External_ReactComponent';


/**
 * 
 */
export interface DataTable_Table_DataRow_Props {

    dataObject : DataTable_DataRowEntry
    tableOptions : DataTable_TableOptions
    columns : Array<DataTable_Column>
    dataTable_RootTableDataObject : DataTable_RootTableDataObject
    isLastRow : boolean
}

/**
 * 
 */
interface DataTable_Table_DataRow_State {

    dataRow_GetChildTableDataParameter?
    dataRow_GetChildTableDataParameter_FromProps?
    dataRow_GetChildTable_ReturnReactComponent_Parameter?
    dataRow_GetChildTable_ReturnReactComponent_Parameter_FromProps?

    tableOptions? : DataTable_TableOptions
    tableOptions_FromProps? : DataTable_TableOptions

    childDataTable_RootTableObject? : DataTable_RootTableObject;
    childDataTable_ReactComponent? : React.Component;
    displayChildTable? : boolean;
    // _placeholder //  have so not have any state properties
}

/**
 * 
 */
export class DataTable_Table_DataRow extends React.Component< DataTable_Table_DataRow_Props, DataTable_Table_DataRow_State > {

    private _row_onClick_BindThis = this._row_onClick.bind(this);

    private readonly _row_OfTable_Ref :  React.RefObject<HTMLTableRowElement>

    private _displayChildTable = false;  //  Primary is instance property.  Copied to state property displayChildTable


    /**
     * 
     */
    constructor(props : DataTable_Table_DataRow_Props) {
        super(props);

        // this.rowDivRef = React.createRef();

        this._row_OfTable_Ref = React.createRef();

        this.state = {
            displayChildTable : false
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
    static getDerivedStateFromProps( props : DataTable_Table_DataRow_Props, state : DataTable_Table_DataRow_State ) : DataTable_Table_DataRow_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //  Return new state (like return from setState(callback)) or null

        if ( 
            props.dataObject.dataRow_GetChildTableDataParameter === state.dataRow_GetChildTableDataParameter_FromProps 
            && props.dataObject.dataRow_GetChildTable_ReturnReactComponent_Parameter === state.dataRow_GetChildTable_ReturnReactComponent_Parameter_FromProps 
            && props.tableOptions === state.tableOptions_FromProps 
        ) {
            //  No changes so just return
            return null;  //
        }

        //  Props props.dataObject.dataRow_GetChildTableDataParameter or props.tableOptions changed so clear child table (clear childDataTable_RootTableObject and displayChildTable)
        return {
            dataRow_GetChildTableDataParameter : props.dataObject.dataRow_GetChildTableDataParameter,
            dataRow_GetChildTable_ReturnReactComponent_Parameter : props.dataObject.dataRow_GetChildTable_ReturnReactComponent_Parameter,
            tableOptions : props.tableOptions,
            dataRow_GetChildTableDataParameter_FromProps : props.dataObject.dataRow_GetChildTableDataParameter,
            dataRow_GetChildTable_ReturnReactComponent_Parameter_FromProps : props.dataObject.dataRow_GetChildTable_ReturnReactComponent_Parameter,
            tableOptions_FromProps : props.tableOptions,
            //  Clear out both child table objects
            childDataTable_RootTableObject : null,
            childDataTable_ReactComponent : null,
            //  Do Not Display Child Table
            displayChildTable : false
        };
    }

    /**
    * @returns true if should update, false otherwise
    */
    shouldComponentUpdate( nextProps : DataTable_Table_DataRow_Props, nextState : DataTable_Table_DataRow_State ) {

        // console.log("DataTable_Table_DataRow: shouldComponentUpdate")


        this._displayChildTable = nextState.displayChildTable; //  getDerivedStateFromProps(...) may have updated nextState.displayChildTable


        //  Only update if changed: props: dataObject

        if ( this.props.dataObject !== nextProps.dataObject ) {
            return true;
        }
        if ( this.props.dataObject.dataRow_GetChildTableDataParameter !== nextProps.dataObject.dataRow_GetChildTableDataParameter ) {
            return true;
        }
        if ( this.props.dataObject.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataObject.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            return true;
        }
        if ( this.props.tableOptions !== nextProps.tableOptions ) {
            return true;
        }
        if ( this.props.tableOptions.dataRow_GetChildTableData !== nextProps.tableOptions.dataRow_GetChildTableData ) {
            return true;
        }
        if ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ) {
            return true;
        }
        if ( this.state.childDataTable_ReactComponent !== nextState.childDataTable_ReactComponent ) {
            return true;
        }
        if ( this.state.displayChildTable !== nextState.displayChildTable  ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */
    _row_onClick( event: React.MouseEvent<HTMLTableRowElement, MouseEvent> ) : void {
        try {
            // console.log("_row_onClick");

            //  Remove event.preventDefault and event.stopPropagation until needed since breaks some behavior like check boxes

            // event.preventDefault(); //  Prevent Default Action of event
            // event.stopPropagation();  // Stop bubbling of event

            try { // In try/catch block in case not supported in browser
                const selectionObj = window.getSelection();
                const selection = selectionObj.toString()
                if ( selection ) {
                    //  Found a Selection so exit with no further action
                    return; //  EARLY RETURN
                }
            } catch (e) {
                //  Eat exception
                // const znothing = 0;
            }

            if ( this.props.tableOptions.dataRowClickHandler ) {

                const targetDOMElement_domRect = this._row_OfTable_Ref.current.getBoundingClientRect();

                /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

                const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
                const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
                const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
                const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;

                const rowDOM_Rect : DataTable_TableOptions_dataRowClickHandler_RequestParm_RowDOM_Rect = {
                    left : targetDOMElement_domRect_Left,
                    right : targetDOMElement_domRect_Right,
                    top : targetDOMElement_domRect_Top,
                    bottom : targetDOMElement_domRect_Bottom
                }


                this.props.tableOptions.dataRowClickHandler({ event, rowDOM_Rect, tableRowClickHandlerParameter : this.props.dataObject.tableRowClickHandlerParameter });
            } 

            if ( this.props.tableOptions.dataRow_GetChildTableData ) {

                this._processChildTableClick_For_dataRow_GetChildTableData({ event });
            
            } else if ( this.props.tableOptions.dataRow_GetChildTable_ReturnReactComponent ) {

                this._processChildTableClick_For_dataRow_GetChildTable_ReturnReactComponent({ event });
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * 
     */
    _processChildTableClick_For_dataRow_GetChildTableData({ event } : { event : React.MouseEvent<HTMLTableRowElement, MouseEvent> }) {

        // Invert state.displayChildTable to show/hide child table

        this._displayChildTable = ! this._displayChildTable;

        this.setState( ( prevState : DataTable_Table_DataRow_State, props : DataTable_Table_DataRow_Props ) : DataTable_Table_DataRow_State => {
            
            return { displayChildTable : this._displayChildTable };
        });

        if ( this._displayChildTable && ( ! this.state.childDataTable_RootTableObject ) ) {

            //   state.childDataTable_RootTableObject not exist so create it and set in state

            const dataTable_TableOptions_dataRow_GetChildTableData_RequestParm = new DataTable_TableOptions_dataRow_GetChildTableData_RequestParm();
            dataTable_TableOptions_dataRow_GetChildTableData_RequestParm.event = event;
            dataTable_TableOptions_dataRow_GetChildTableData_RequestParm.dataRow_GetChildTableDataParameter = this.state.dataRow_GetChildTableDataParameter

            const childDataTable_RootTableObject : DataTable_RootTableObject = (
                this.props.tableOptions.dataRow_GetChildTableData( dataTable_TableOptions_dataRow_GetChildTableData_RequestParm )
            );

            if ( ! childDataTable_RootTableObject ) {
                const msg = "No value returned from this.props.tableOptions.dataRow_GetChildTableData( dataTable_TableOptions_dataRow_GetChildTableData_RequestParm )"
                console.warn( msg );
                throw Error( msg );
            }

            this.setState( ( prevState : DataTable_Table_DataRow_State, props : DataTable_Table_DataRow_Props ) : DataTable_Table_DataRow_State => {
                return { childDataTable_RootTableObject };
            });
        }
    }

    /**
     * 
     */
    _processChildTableClick_For_dataRow_GetChildTable_ReturnReactComponent({ event } : { event : React.MouseEvent<HTMLTableRowElement, MouseEvent> }) {

        // Invert state.displayChildTable to show/hide child table

        this._displayChildTable = ! this._displayChildTable;

        this.setState( ( prevState : DataTable_Table_DataRow_State, props : DataTable_Table_DataRow_Props ) : DataTable_Table_DataRow_State => {
            
            return { displayChildTable : this._displayChildTable };
        });

        if ( this._displayChildTable && ( ! this.state.childDataTable_ReactComponent ) ) {

            //   state.childDataTable_RootTableObject not exist so create it and set in state

            const dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm = new DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm();
            dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.event = event;
            dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.dataRow_GetChildTable_ReturnReactComponent_Parameter = this.state.dataRow_GetChildTable_ReturnReactComponent_Parameter

            const childDataTable_ReactComponent : React.Component = (
                this.props.tableOptions.dataRow_GetChildTable_ReturnReactComponent( dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm )
            );

            if ( ! childDataTable_ReactComponent ) {
                const msg = "No value returned from this.props.tableOptions.dataRow_GetChildTable_ReturnReactComponent( dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm )"
                console.warn( msg );
                throw Error( msg );
            }

            this.setState( ( prevState : DataTable_Table_DataRow_State, props : DataTable_Table_DataRow_Props ) : DataTable_Table_DataRow_State => {
                return { childDataTable_ReactComponent };
            });
        }
    }

    /**
     * 
     */
    render () {

        // console.log("DataTable_Table_DataRow: render")


        if (this.props.tableOptions.dataRow_GetChildTableData && (!this.props.dataObject.dataRow_GetChildTableDataParameter)) {
            const msg = "tableOptions.dataRow_GetChildTableData populated but dataObject.dataRow_GetChildTableDataParameter is not populated"
            console.warn(msg);
            throw Error(msg);
        }

        if (this.props.tableOptions.dataRow_GetChildTable_ReturnReactComponent && (!this.props.dataObject.dataRow_GetChildTable_ReturnReactComponent_Parameter)) {
            const msg = "tableOptions.dataRow_GetChildTable_ReturnReactComponent populated but dataObject.dataRow_GetChildTable_ReturnReactComponent_Parameter is not populated"
            console.warn(msg);
            throw Error(msg);
        }


        let className_Row_classNameClickable = " ";

        if (this.props.tableOptions.dataRowClickHandler || this.props.tableOptions.dataRow_GetChildTableData || this.props.tableOptions.dataRow_GetChildTable_ReturnReactComponent) {
            className_Row_classNameClickable = " clickable "
        }


        let className_innerContainingDiv_HighlightRow = "";

        if (this.props.dataObject.highlightRowWithBackgroundColor) {
            className_innerContainingDiv_HighlightRow = " table-row-highlight-with-background-color ";
        }


        const className_Row = (
            " data-table-data-row  table-row-hovered-highlight   "
            + className_Row_classNameClickable
            + className_innerContainingDiv_HighlightRow
        );

        //   expandable-table-row

        //   The onMouseOut does not appear to fire consistently.  
        //        Rows are left highlighted after the mouse has moved to another row and that row is highlighted.
        // Code in these functions for onMouseOver and onMouseOut change the DOM directly which is a "BAD" idea.
        //     Also, returning a arrow function from an expression is a bad idea.  Better to have a class function that has .bind(this).  See onClick
        // onMouseOver={ (event) => { this.rowDivRef.current.classList.add( "hoveredTableRow" ) } }
        // onMouseOut={ (event) => { this.rowDivRef.current.classList.remove( "hoveredTableRow" ) } }

        //  Currently highlighting the row on hover using CSS class 'table-row-hovered-highlight' (see it above)

        // put inside <div> to use it: ref={ this.rowDivRef }


        let rowClickHandler = undefined;

        if (this.props.tableOptions.dataRowClickHandler || this.props.tableOptions.dataRow_GetChildTableData || this.props.tableOptions.dataRow_GetChildTable_ReturnReactComponent) {

            rowClickHandler = this._row_onClick_BindThis;
        }


        let childTableShowHideIcon = undefined;

        if (this.props.tableOptions.dataRow_GetChildTableData || this.props.tableOptions.dataRow_GetChildTable_ReturnReactComponent) {

            if (this.state.displayChildTable) {

                childTableShowHideIcon = (
                    <div className=" child-table-show-hide-icon-container ">
                        <img src="static/images/pointer-down.png" className=" clickable child-table-show-hide-icon " onClick={rowClickHandler}/>
                    </div>
                );
            } else {
                childTableShowHideIcon = (
                    <div className=" child-table-show-hide-icon-container ">
                        <img src="static/images/pointer-right.png" className=" clickable child-table-show-hide-icon " onClick={rowClickHandler}/>
                    </div>
                );
            }
        }

        let childTableAndContainer = undefined;
        {
            let childTable = undefined;

            if (this.state.childDataTable_RootTableObject) {

                childTable = (

                    <DataTable_TableRoot
                        tableObject={this.state.childDataTable_RootTableObject}
                    />
                );

            } else if (this.state.childDataTable_ReactComponent) {

                //  Cast to any since would not compile without it.  Probably a way to make this work but for now:
                let Component: any = this.state.childDataTable_ReactComponent as any //  as ChildTable;  // Make First letter capital for JSX

                childTable = (
                    <Component
                        dataRow_GetChildTable_ReturnReactComponent_Parameter={this.state.dataRow_GetChildTable_ReturnReactComponent_Parameter}
                        // key={ this.state.dataRow_GetChildTable_ReturnReactComponent_Parameter }  // key={...} is required
                    />
                    // !!!! Adding key={...} failed to cause <Component> to unmount when this.state.dataRow_GetChildTable_ReturnReactComponent_Parameter
                    //      changes.
                    //
                    // Add key={ this.state.dataRow_GetChildTable_ReturnReactComponent_Parameter }
                    // to force <Component> to unmount when this.state.dataRow_GetChildTable_ReturnReactComponent_Parameter
                    // changes.
                    // This is a simpler lifecycle for <Component> than having to deal with a change to the prop dataRow_GetChildTable_ReturnReactComponent_Parameter
                );
            }
            if (childTable) {

                const containerStyle = {} as React.CSSProperties;

                if (!this.state.displayChildTable) {
                    containerStyle.display = "none";
                }

                let classNameAddition = "";

                if (!this.props.isLastRow) {
                    classNameAddition = " child-data-table-container-not-last-parent-row ";
                }

                const className = " child-data-table-container " + classNameAddition;

                childTableAndContainer = (

                    <div style={containerStyle} className={className}>
                        {childTable}
                    </div>

                )
            }
        }

        //  Create Components for columns

        const columnComponents = (
            this.props.dataObject.columnEntries.map((dataObject_columnEntry, index) => {

                const column = this.props.columns[index];

                if (!column) {
                    const msg = "DataTable_Table_DataRowEntry: No column for index: " + index;
                    console.warn(msg);
                    throw Error(msg);
                }

                if (column.cellMgmt_External) {

                    return (
                        <DataTable_Table_DataRowEntry_External_Cell_Mgmt_React
                            column={column}
                            // dataObject={ this.props.dataObject }
                            dataObject_columnEntry={dataObject_columnEntry}
                            // index={ index }
                            key={index}
                        />
                    );
                }

                if (column.cellMgmt_ExternalReactComponent) {

                    return (
                        <DataTable_Table_DataRowEntry_External_ReactComponent
                            column={column}
                            // dataObject={ this.props.dataObject }
                            dataObject_columnEntry={dataObject_columnEntry}
                            // index={ index }
                            key={index}
                        />
                    );
                }

                return (
                    <DataTable_Table_DataRowEntry
                        column={column}
                        // dataObject={ this.props.dataObject }
                        dataObject_columnEntry={dataObject_columnEntry}
                        // index={ index }
                        key={index}
                    />
                );
            })
        );

        let className_outerContainingDiv : string = undefined

        {
            let className_outerContainingDiv_Border = "";

            if (this.props.dataTable_RootTableDataObject.highlightingOneOrMoreRowsWithBorder) {

                if ( this.props.dataObject.highlightRowWithBorderSolid || this.props.dataObject.highlightRowWithBorderDash ) {
                    className_outerContainingDiv_Border = " row-border-padding ";
                } else {
                    className_outerContainingDiv_Border = " row-border-place-holder ";
                }
            }

            className_outerContainingDiv = " data-table-data-rows-outer-containing-div " + className_outerContainingDiv_Border
        }

        let className_innerContainingDiv : string = undefined

        {
            let className_innerContainingDiv_GreyOut = "";

            if (this.props.dataObject.greyOutRow) {
                className_innerContainingDiv_GreyOut = " grey-out-row ";
            }

            let className_innerContainingDiv_Border = "";

            if (this.props.dataObject.highlightRowWithBorderSolid) {
                className_innerContainingDiv_Border = " row-border row-border-style-solid ";

            } else if (this.props.dataObject.highlightRowWithBorderDash) {
                className_innerContainingDiv_Border = " row-border row-border-style-dashed ";
            }

            let className_innerContainingDiv_row_CSS_Additions = "";

            if (this.props.dataObject.row_CSS_Additions) {
                className_innerContainingDiv_row_CSS_Additions = this.props.dataObject.row_CSS_Additions;
            }

            className_innerContainingDiv = " data-table-data-rows-inner-containing-div " + className_innerContainingDiv_GreyOut + className_innerContainingDiv_HighlightRow +
                className_innerContainingDiv_Border +
                className_innerContainingDiv_row_CSS_Additions;
        }

        let styleOverrides_innerContainingDiv : React.CSSProperties = undefined

        if ( this.props.dataObject.styleOverrides_innerContainingDiv ) {
            styleOverrides_innerContainingDiv = this.props.dataObject.styleOverrides_innerContainingDiv;
        }


        return (
            <React.Fragment>

                <div className={ className_outerContainingDiv }>

                    { childTableShowHideIcon }

                    <div className={ className_innerContainingDiv } style={ styleOverrides_innerContainingDiv }>
                        
                        <table className=" data-table-data-rows-table ">
                            <tbody>

                                <tr 
                                    style={ { position: "relative" } } 
                                    className={ className_Row } 
                                    onClick={ rowClickHandler }
                                    ref={ this._row_OfTable_Ref }
                                    // data-id={ this.props.dataObject.uniqueId }
                                >

                                    {/* Render columns */}
                                    { columnComponents }

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    { childTableAndContainer }
                </div>

                {/* If CSS Class 'data-table-data-rows-outer-containing-div' is changed to 'display: inline-block'
                        Add '<br />' after that <div> to ensure each of the div above is on a new visual line rather than more than one ending up on the same visual line 
                */}

            </React.Fragment>
        )
    }

}
