/**
 * dataTable_Table_DataRow_React.tsx
 * 
 * Table Data Row
 */
import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


import {
    DataTable_TableOptions,
    DataTable_Column,
    DataTable_RootTableObject,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Param_RowDOM_Rect,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Param_ClickEventData,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent,
    DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue,
    DataTable_DataRowEntry__Get_RowChildContent_CallParams,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { DataTable_TableRoot } from './dataTable_TableRoot_React';
import { DataTable_Table_DataRowEntry } from './dataTable_Table_DataRowEntry_React';
import {
    DataTable_INTERNAL_DataRowEntry,
    DataTable_INTERNAL_RootTableDataObject
} from "page_js/data_pages/data_table_react/dataTable_React_INTERNAL_DataObjects";


/**
 * 
 */
export interface DataTable_Table_DataRow_Props {

    dataTable_DataRowEntry_INTERNAL : DataTable_INTERNAL_DataRowEntry
    tableOptions : DataTable_TableOptions
    columns : Array<DataTable_Column>
    dataTable_RootTableDataObject_INTERNAL :  DataTable_INTERNAL_RootTableDataObject
    dataTableId : string
    isInGroup: boolean
    isFirstRowInGroup: boolean
}

/**
 * 
 */
interface DataTable_Table_DataRow_State {

    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent? : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent
    dataRow_Get_RowChildContent_Return_ChildContent_FromProps? : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent

    //  function called to get 'Row Child Content' Callback to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent? : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent
    dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent_FromProps? : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent

    //  function called to get 'Row Child Content' Callback to display when this row is expanded, returns Promise<...>
    dataRow_Get_RowChildContent_Return_Promise_ChildContent? : DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent
    dataRow_Get_RowChildContent_Return_Promise_ChildContent_FromProps? : DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent

    tableOptions? : DataTable_TableOptions
    tableOptions_FromProps? : DataTable_TableOptions

    /**
     * Called in 'render()' when populated to get 'Row Child Content'.  function called to get 'Row Child Content' to display when this row is expanded
     *
     * This is populated from props.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent if that is populated
     * This can also be populated from result of calls to  dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent, dataRow_Get_RowChildContent_Return_Promise_ChildContent
     */
    dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender? : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent

    childDataTable_RootTableObject? : DataTable_RootTableObject;
    show_Loading_childContent_Message? : boolean
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
            props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent === state.dataRow_Get_RowChildContent_Return_ChildContent_FromProps
            && props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent === state.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent_FromProps
            && props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent === state.dataRow_Get_RowChildContent_Return_Promise_ChildContent_FromProps
            && props.tableOptions === state.tableOptions_FromProps 
        ) {
            //  No changes so just return
            return null;  //
        }

        //  Props props.dataObject.dataRow_GetChildTableDataParameter or props.tableOptions changed so clear child table (clear childDataTable_RootTableObject and displayChildTable)
        return {
            dataRow_Get_RowChildContent_Return_ChildContent : props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent,
            dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent : props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent,
            dataRow_Get_RowChildContent_Return_Promise_ChildContent : props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent,
            tableOptions : props.tableOptions,
            dataRow_Get_RowChildContent_Return_ChildContent_FromProps : props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent,
            dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent_FromProps : props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent,
            dataRow_Get_RowChildContent_Return_Promise_ChildContent_FromProps : props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent,
            tableOptions_FromProps : props.tableOptions,
            //  Clear out all child content objects
            dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender : null,
            childDataTable_RootTableObject : null,
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

        if ( this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry !== nextProps.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry ) {
            return true;
        }
        if ( this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent !== nextProps.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent ) {
            return true;
        }
        if ( this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent !== nextProps.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent ) {
            return true;
        }
        if ( this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent !== nextProps.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent ) {
            return true;
        }
        if ( this.props.tableOptions !== nextProps.tableOptions ) {
            return true;
        }
        if ( this.state.dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender !== nextState.dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender ) {
            return true;
        }
        if ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ) {
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
            try { // In try/catch block in case not supported in browser
                const selectionObj = window.getSelection();
                const selection = selectionObj.toString()
                if ( selection ) {
                    //  Found a Selection so exit with no further action
                    return; //  EARLY RETURN
                }
            } catch (e) {
                //  Eat exception
            }

            if ( this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.tableRowClickHandler_Callback_NoDataPassThrough ) {

                const targetDOMElement_domRect = this._row_OfTable_Ref.current.getBoundingClientRect();

                /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

                const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
                const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
                const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
                const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;

                const rowDOM_Rect : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Param_RowDOM_Rect = {
                    left : targetDOMElement_domRect_Left,
                    right : targetDOMElement_domRect_Right,
                    top : targetDOMElement_domRect_Top,
                    bottom : targetDOMElement_domRect_Bottom
                }

                const clickEventData : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Param_ClickEventData = {
                    ctrlKey_From_ClickEvent : event.ctrlKey,
                    metaKey_From_ClickEvent : event.metaKey
                }

                const clickHandlerParams : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params = {
                    clickEventData,
                    rowDOM_Rect
                }

                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.tableRowClickHandler_Callback_NoDataPassThrough( clickHandlerParams );

            }

            if ( this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject ||
                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject ||
                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject ) {

                this._processChildTableClick_For_dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject({ event });

            } else if ( this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent ||
                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent ||
                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent ) {

                this._processChildTableClick_For_dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent({ event });
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    //////


    /**
     * Get Child Table using function in
     *  Process these handlers:
     *          this.props.dataObject.dataRow_GetChildTableData_Return_DataTable_RootTableObject ||
     *          this.props.dataObject.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject ||
     *          this.props.dataObject.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject
     *
     *  Process handlers directly on the dataObject
     */
    _processChildTableClick_For_dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject({ event } : { event : React.MouseEvent<HTMLTableRowElement, MouseEvent> }) {

        // Invert state.displayChildTable to show/hide child table

        this._displayChildTable = ! this._displayChildTable;

        this.setState( ( prevState : DataTable_Table_DataRow_State, props : DataTable_Table_DataRow_Props ) : DataTable_Table_DataRow_State => {

            return { displayChildTable : this._displayChildTable };
        });

        if ( this._displayChildTable && ( ! this.state.childDataTable_RootTableObject ) ) {

            //   state.childDataTable_RootTableObject not exist so create it and set in state


            this.setState((prevState: DataTable_Table_DataRow_State, props: DataTable_Table_DataRow_Props): DataTable_Table_DataRow_State => {
                return {show_Loading_childContent_Message: true}
            });

            let childDataTable_RootTableObject: DataTable_RootTableObject = undefined
            let promise_childDataTable_RootTableObject: Promise<DataTable_RootTableObject> = undefined

            if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject) {

                const get_RowChildTableData_Params: DataTable_DataRowEntry__GetChildTableData_CallbackParams = {};

                childDataTable_RootTableObject = this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject(get_RowChildTableData_Params);

            } else if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject) {

                const get_RowChildTableData_Params: DataTable_DataRowEntry__GetChildTableData_CallbackParams = {};

                const result: DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue =
                    this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject(get_RowChildTableData_Params);

                if (result.dataTable_RootTableObject) {
                    childDataTable_RootTableObject = result.dataTable_RootTableObject;
                } else if (result.promise_Containing_dataTable_RootTableObject) {
                    promise_childDataTable_RootTableObject = result.promise_Containing_dataTable_RootTableObject;
                } else {
                    const msg = "result has NEITHER populated: dataTable_RootTableObject, promise_Containing_dataTable_RootTableObject.  From call to this.props.dataObject.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject";
                    console.warn(msg);
                    throw Error(msg);
                }

            } else if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject) {

                const get_RowDataTable_Params: DataTable_DataRowEntry__GetChildTableData_CallbackParams = {};

                promise_childDataTable_RootTableObject =
                    this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject(get_RowDataTable_Params);

            } else {
                const msg = "NEITHER populated: this.props.dataObject.dataRow_GetChildTableData_Return_DataTable_RootTableObject NOR this.props.dataObject.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject NOR this.props.dataObject.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject";
                console.warn(msg);
                throw Error(msg);
            }

            if (childDataTable_RootTableObject) {

                this.setState({
                    childDataTable_RootTableObject: childDataTable_RootTableObject,
                    show_Loading_childContent_Message: false
                });

            } else if (promise_childDataTable_RootTableObject) {

                promise_childDataTable_RootTableObject.catch((reason) => {
                    try {
                        const msg = "Promise reject from this.props.dataObject.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject OR this.props.dataObject.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject. dataTableId: " + this.props.dataTableId + ", reject reason: ";
                        console.warn(msg, reason)

                        //  Comment out throw since causing "Page Error" message when reject from server

                        // throw Error(msg)

                    } catch (e) {
                        console.warn("Error Caught: ", e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                })

                promise_childDataTable_RootTableObject.then((childDataTable_RootTableObject) => {
                    try {
                        if (!childDataTable_RootTableObject) {
                            const msg = "No value returned from this.props.dataObject.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject OR this.props.dataObject.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject. dataTableId: " + this.props.dataTableId;

                            console.warn(msg);
                            throw Error(msg);
                        }

                        this.setState((prevState: DataTable_Table_DataRow_State, props: DataTable_Table_DataRow_Props): DataTable_Table_DataRow_State => {
                            return {childDataTable_RootTableObject, show_Loading_childContent_Message: false};
                        });

                    } catch (e) {
                        console.warn("Error Caught: ", e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                })
            } else {
                const msg = "NEITHER childDataTable_RootTableObject NOR promise_childDataTable_RootTableObject is set"
                console.warn(msg)
                throw Error(msg)
            }
        }
    }

    ///////

    /**
     *  Process both handlers:
     *          this.props.dataObject.dataRow_Get_RowChildContent_Return_ChildContent ||
     *          this.props.dataObject.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent ||
     *          this.props.dataObject.dataRow_Get_RowChildContent_Return_Promise_ChildContent
     *
     *  Process handlers directly on the dataObject
     */
    _processChildTableClick_For_dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent({ event } : { event : React.MouseEvent<HTMLTableRowElement, MouseEvent> }) {

        // Invert state.displayChildTable to show/hide child table

        this._displayChildTable = !this._displayChildTable;

        this.setState((prevState: DataTable_Table_DataRow_State, props: DataTable_Table_DataRow_Props): DataTable_Table_DataRow_State => {

            return {displayChildTable: this._displayChildTable};
        });

        if (this._displayChildTable && (!this.state.dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender)) {

            //   state.dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender not exist so create it and set in state

            this.setState((prevState: DataTable_Table_DataRow_State, props: DataTable_Table_DataRow_Props): DataTable_Table_DataRow_State => {
                return {show_Loading_childContent_Message: true}
            });

            let dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender: DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent = undefined
            let promise_childContent_Callback: Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent> = undefined

            if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent) {

                const get_RowChildContent_Params: DataTable_DataRowEntry__Get_RowChildContent_CallParams = {};

                dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender = this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent;

            } else if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent) {

                const get_RowChildContent_Params: DataTable_DataRowEntry__Get_RowChildContent_CallParams = {};

                const result: DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue =
                    this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent(get_RowChildContent_Params);

                if (result.getchildContentCallback) {
                    dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender = result.getchildContentCallback;
                } else if (result.promise_Containing_GetChildContentCallback) {
                    promise_childContent_Callback = result.promise_Containing_GetChildContentCallback;
                } else {
                    const msg = "result has NEITHER populated: childContent, promise_childContent.  From call to this.props.dataObject.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent";
                    console.warn(msg);
                    throw Error(msg);
                }

            } else if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent) {

                const get_RowChildContent_Params: DataTable_DataRowEntry__Get_RowChildContent_CallParams = {};

                promise_childContent_Callback =
                    this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent(get_RowChildContent_Params);

            } else {
                const msg = "NEITHER populated: this.props.dataObject.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent NOR this.props.dataObject.dataRow_Get_RowChildContent_Return_Promise_ChildContent";
                console.warn(msg);
                throw Error(msg);
            }

            if (dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender) {

                this.setState({
                    dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender: dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender,
                    show_Loading_childContent_Message: false
                });

            } else if (promise_childContent_Callback) {

                promise_childContent_Callback.catch((reason) => {
                    try {
                        const msg = "Promise reject from this.props.dataObject.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent OR this.props.dataObject.dataRow_Get_RowChildContent_Return_Promise_ChildContent. dataTableId: " + this.props.dataTableId + ", reject reason: "
                        console.warn(msg, reason)

                        //  Comment out throw since causing "Page Error" message when reject from server

                        // throw Error(msg)

                    } catch (e) {
                        console.warn("Error Caught: ", e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                })

                promise_childContent_Callback.then((getChildContent_Callback) => {
                    try {
                        if (!getChildContent_Callback) {
                            const msg = "No value returned from Promise.resolve from this.props.dataObject.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent OR this.props.dataObject.dataRow_Get_RowChildContent_Return_Promise_ChildContent. dataTableId: " + this.props.dataTableId
                            console.warn(msg);
                            throw Error(msg);
                        }

                        this.setState((prevState: DataTable_Table_DataRow_State, props: DataTable_Table_DataRow_Props): DataTable_Table_DataRow_State => {
                            return {
                                dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender: getChildContent_Callback,
                                show_Loading_childContent_Message: false
                            };
                        });

                    } catch (e) {
                        console.warn("Error Caught: ", e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                })
            } else {
                const msg = "NEITHER childContent NOR promise_childContent is set"
                console.warn(msg)
                throw Error(msg)
            }
        }
    }

    /**
     * 
     */
    render () {

        // console.log("DataTable_Table_DataRow: render")

        let className_Row = " data-table-data-row ";

        if ( this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.highlightRowWithBackgroundColor ) {

            className_Row += "  table-row-highlight-with-background-color  ";
        }

        //   expandable-table-row

        let rowClickHandler = undefined;

        if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.tableRowClickHandler_Callback_NoDataPassThrough ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent ) {

            rowClickHandler = this._row_onClick_BindThis;
        }


        let childTableShowHideIcon = undefined;

        if (
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent ||
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent ) {

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

        let childContentsAndContainer = undefined;
        {
            let childContents = undefined;

            if (this.state.show_Loading_childContent_Message) {

                childContents = (

                    <div>
                        LOADING
                    </div>
                );

            } else if (this.state.dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender ) {

                const get_RowChildContent_Params: DataTable_DataRowEntry__Get_RowChildContent_CallParams = {};

                childContents = (

                    this.state.dataRow_Get_RowChildContent_Return_ChildContent__FINAL_CallOnRender( get_RowChildContent_Params )
                );

            } else if (this.state.childDataTable_RootTableObject) {

                childContents = (

                    <DataTable_TableRoot
                        tableObject={this.state.childDataTable_RootTableObject}
                    />
                );
            }
            if (childContents) {

                const containerStyle = {} as React.CSSProperties;

                if (!this.state.displayChildTable) {
                    containerStyle.display = "none";
                }

                let classNameAddition = "";

                //  Comment out 'if' since row becomes other than last row after user sorts the table
                // if (!this.props.isLastRow) {
                    classNameAddition = " child-data-table-container-not-last-parent-row ";
                // }

                const className = " child-data-table-container " + classNameAddition;

                childContentsAndContainer = (

                    <div style={containerStyle} className={className}>
                        {childContents}
                    </div>

                )
            }
        }

        //  Create Components for columns

        const columnComponents = (
            this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.columnEntries.map((dataObject_columnEntry, index) => {

                const column = this.props.columns[index];

                if (!column) {
                    const msg = "DataTable_Table_DataRowEntry: No column for index: " + index;
                    console.warn(msg);
                    throw Error(msg);
                }

                return (
                    <DataTable_Table_DataRowEntry
                        column={column}
                        dataObject_columnEntry={dataObject_columnEntry}
                        isInGroup={ this.props.isInGroup }
                        isFirstRowInGroup={ this.props.isFirstRowInGroup }
                        key={index}
                    />
                );
            })
        );

        let className_outerContainingDiv : string = undefined

        {
            let className_outerContainingDiv_Border = "";

            if (this.props.dataTable_RootTableDataObject_INTERNAL.highlightingOneOrMoreRowsWithBorder) {

                if ( this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.highlightRowWithBorder_peptideFilter_NOT_borderColor || this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.highlightRowWithBorderSolid || this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.highlightRowWithBorderDash ) {
                    className_outerContainingDiv_Border = " row-border-padding ";
                } else {
                    className_outerContainingDiv_Border = " row-border-place-holder ";
                }
            }

            className_outerContainingDiv = " data-table-data-rows-outer-containing-div " + className_outerContainingDiv_Border
        }

        let className_innerContainingDiv : string = undefined

        {
            let className_innerContainingDiv_classNameClickable = " ";

            if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.tableRowClickHandler_Callback_NoDataPassThrough ||
                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject ||
                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject ||
                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject ||
                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent ||
                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent ||
                this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent ) {

                className_innerContainingDiv_classNameClickable = " clickable "
            }

            let className_innerContainingDiv_HighlightRow = "";

            if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.highlightRowWithBackgroundColor) {
                className_innerContainingDiv_HighlightRow = " table-row-highlight-with-background-color ";
            }

            let className_innerContainingDiv_GreyOut = "";

            if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.greyOutRow) {
                className_innerContainingDiv_GreyOut = " grey-out-row ";
            }

            let className_innerContainingDiv_Border = "";

            if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.highlightRowWithBorder_peptideFilter_NOT_borderColor) {
                className_innerContainingDiv_Border = " row-border row-border-style-solid table-row-border-peptide-filter--not-border-color ";

            } else if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.highlightRowWithBorderSolid) {
                className_innerContainingDiv_Border = " row-border row-border-style-solid ";

            } else if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.highlightRowWithBorderDash) {
                className_innerContainingDiv_Border = " row-border row-border-style-dashed ";
            }

            let className_innerContainingDiv_row_CSS_Additions = "";

            if (this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.row_CSS_Additions) {
                className_innerContainingDiv_row_CSS_Additions = this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.row_CSS_Additions;
            }

            className_innerContainingDiv = " data-table-data-rows-inner-containing-div table-row-hovered-highlight " +
                className_innerContainingDiv_classNameClickable +
                className_innerContainingDiv_GreyOut +
                className_innerContainingDiv_HighlightRow +
                className_innerContainingDiv_Border +
                className_innerContainingDiv_row_CSS_Additions;
        }

        let styleOverrides_innerContainingDiv : React.CSSProperties = undefined

        if ( this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.styleOverrides_innerContainingDiv ) {
            styleOverrides_innerContainingDiv = this.props.dataTable_DataRowEntry_INTERNAL.dataTable_DataRowEntry.styleOverrides_innerContainingDiv;
        }


        return (
            <React.Fragment>

                <div className={ className_outerContainingDiv }>

                    { childTableShowHideIcon }

                    <div className={ className_innerContainingDiv } style={ styleOverrides_innerContainingDiv }
                         ref={ this._row_OfTable_Ref }
                         onClick={ rowClickHandler }
                    >
                        <table className=" data-table-data-rows-table ">
                            <tbody>

                                <tr 
                                    style={ { position: "relative" } } 
                                    className={ className_Row } 
                                >
                                    {/* Render columns */}
                                    { columnComponents }

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    { childContentsAndContainer }
                </div>

                {/* If CSS Class 'data-table-data-rows-outer-containing-div' is changed to 'display: inline-block'
                        Add '<br />' after that <div> to ensure each of the div above is on a new visual line rather than more than one ending up on the same visual line 
                */}

            </React.Fragment>
        )
    }

}
