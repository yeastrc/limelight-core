/**
 * dataTable_TableRoot_React.tsx
 * 
 * Actual Table Root
 *
 *
 * For stand alone Data Table in DOM (Not enclosed by a React Managed element)
 * it is recommended to use the functions create_dataTable_Root_React, remove_dataTable_Root_React
 * in the file dataTable_TableRoot_React_Create_Remove_Table_DOM.ts
 * to Create and Remove the Data Table to/from the DOM
 */
import React from 'react'

import { SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DECENDING } from "./dataTable_constants";

import {
    DataTable_RootTableObject,
    DataTable_ColumnId,
    DataTable_TableOptions,
    DataTable_RootTableDataObject, DataTable_Column_DownloadTable,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


import {
    DataTable_Table_HeaderRowEntry,
    DataTable_Table_HeaderRowEntry__headerColumnClicked_Callback,
    DataTable_Table_HeaderRowEntry__headerColumnClicked_Callback_Params
} from './dataTable_Table_HeaderRowEntry_React';
import { DataTable_Table_DataRow } from './dataTable_Table_DataRow_React';
import { DataTable_Table_DataRow_Group } from './dataTable_Table_DataRow_Group_React';

import { dataTable_SortDataRows__sort_dataRows_on_sortColumnsInfo } from './dataTable_SortDataRows';
import {dataTable_React_DataObjects_Validator} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects_Validator";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    DataTable_INTERNAL_DataGroupRowEntry,
    DataTable_INTERNAL_DataRowEntry,
    DataTable_INTERNAL_RootTableDataObject, DataTable_INTERNAL_SortColumnsInfoEntry
} from "page_js/data_pages/data_table_react/dataTable_React_INTERNAL_DataObjects";
import {dataTable_React_INTERNAL_DataObjects_InitialPopulation} from "page_js/data_pages/data_table_react/dataTable_React_INTERNAL_DataObjects_InitialPopulation";
import {
    DataTable_TableRoot__FindAllRows_SearchInput_Component,
    DataTable_TableRoot__FindAllRows_SearchInput_Component__InputField_NewValueEntered_Callback
} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React_Find_All_Rows_User_Input";
import {DataTable_INTERNAL_Search_Utils} from "page_js/data_pages/data_table_react/dataTable_INTERNAL_Search_Utils";
import {
    DataTable_TableRoot__ShowItemsPerPage_Select_Component,
    DataTable_TableRoot__ShowItemsPerPage_Select_Component__InputField_NewValueEntered_Callback
} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React_ShowItemsPerPage_User_Input";
import {dataTable_React_INTERNAL_Populate_Current_Pages_Arrays} from "page_js/data_pages/data_table_react/dataTable_React_INTERNAL_Populate_Current_Pages_Arrays";
import {
    DataTable_TableRoot_React_Table_PageNavigation_Component,
    DataTable_TableRoot_React_Table_PageNavigation_Component__InputField_NewValueEntered_Callback
} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React_Table_PageNavigation";
import {StringDownloadUtils} from "page_js/data_pages/data_pages_common/downloadStringAsFile";


/**
 *
 */
export const DataTable_TableRoot_showItemsPerPage_SelectValue_SHOW_ALL = -1;

/**
 *  !!!  Smallest/First entry in _showItemsPerPage_SelectValue_OPTIONS
 */
const _showItemsPerPage_SelectValue_Minimum_Value = 10;

/**
 *
 */
const _showItemsPerPage_SelectValue_DEFAULT = 50;

/**
 *   !!! MUST contain as one of the entries
 */
const _showItemsPerPage_SelectValue_OPTIONS = [ _showItemsPerPage_SelectValue_Minimum_Value, 25, _showItemsPerPage_SelectValue_DEFAULT, 100, 250, 500, 1000, DataTable_TableRoot_showItemsPerPage_SelectValue_SHOW_ALL ];

/**
 * 
 */
export interface DataTable_TableRoot_Props {
    tableObject : DataTable_RootTableObject
    resortTableOnUpdate? : boolean //  Use with care - When tableObject property changes, apply existing sort columns to it.  This requires that the same table column identifiers are in the new table.
}

/**
 * 
 */
interface DataTable_TableRoot_State {

    tableDataObject_FromProps? : DataTable_RootTableDataObject
    tableOptions_FromProps? : DataTable_TableOptions


    tableDataObject_INTERNAL? : DataTable_INTERNAL_RootTableDataObject
    tableOptions? : DataTable_TableOptions

    sortColumnsInfo? : Array<DataTable_INTERNAL_SortColumnsInfoEntry>
    show_updatingTableOrder_Message? : boolean

    show_updatingTable_Message? : boolean

    searchInputValue_CurrentValue? : string
    showItemsPerPage_SelectValue? : number

    currentPage_CurrentValue? : number

    tableRows_TotalCount?: number
}

/**
 * Data Table Root Node
 *
 * For stand alone Data Table in DOM (Not enclosed by a React Managed element)
 * it is recommended to use the functions create_dataTable_Root_React, remove_dataTable_Root_React
 * in the file dataTable_TableRoot_React_Create_Remove_Table_DOM.ts
 * to Create and Remove the Data Table to/from the DOM
 */
export class DataTable_TableRoot extends React.Component< DataTable_TableRoot_Props, DataTable_TableRoot_State > {

    private _headerColumnClicked_BindThis = this._headerColumnClicked.bind(this);
    private _searchInputField_NewValueEntered_Callback_BindThis = this._searchInputField_NewValueEntered_Callback.bind(this);
    private _showItemsPerPage_Select_Component__InputField_NewValueEntered_Callback_BindThis = this._showItemsPerPage_Select_Component__InputField_NewValueEntered_Callback.bind(this);
    private _currentPage_CurrentValue_Update_Callback_BindThis = this._currentPage_CurrentValue_Update_Callback.bind(this);

    private _downloadTableContents_All_Clicked_BindThis = this._downloadTableContents_All.bind(this);
    private _downloadTableContents_Filtered_Clicked_BindThis = this._downloadTableContents_Filtered.bind(this);

    /**
     * !!  Only exists to check function casts to type
     */
    private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature

        const _headerColumnClicked_BindThis : DataTable_Table_HeaderRowEntry__headerColumnClicked_Callback = this._headerColumnClicked;
        const _searchInputField_NewValueEntered_Callback : DataTable_TableRoot__FindAllRows_SearchInput_Component__InputField_NewValueEntered_Callback = this._searchInputField_NewValueEntered_Callback;
        const _showItemsPerPage_Select_Component__InputField_NewValueEntered_Callback : DataTable_TableRoot__ShowItemsPerPage_Select_Component__InputField_NewValueEntered_Callback =
            this._showItemsPerPage_Select_Component__InputField_NewValueEntered_Callback;
        const _currentPage_CurrentValue_Update_Callback : DataTable_TableRoot_React_Table_PageNavigation_Component__InputField_NewValueEntered_Callback = this._currentPage_CurrentValue_Update_Callback;
    }

    /**
     *
     */
    constructor(props : DataTable_TableRoot_Props) {
        super(props);

        try {
            if ( ! _showItemsPerPage_SelectValue_OPTIONS.includes( _showItemsPerPage_SelectValue_Minimum_Value ) ) {
                const msg = "( ! _showItemsPerPage_SelectValue_OPTIONS.includes( _showItemsPerPage_SelectValue_Minimum_Value ) )";
                console.warn(msg)
                throw Error(msg)
            }
            if ( ! _showItemsPerPage_SelectValue_OPTIONS.includes( _showItemsPerPage_SelectValue_DEFAULT ) ) {
                const msg = "( ! _showItemsPerPage_SelectValue_OPTIONS.includes( _showItemsPerPage_SelectValue_DEFAULT ) )";
                console.warn(msg)
                throw Error(msg)
            }

            if ( ! props.tableObject ) {
                const msg = "DataTable_TableRoot:constructor: No value in props.tableObject";
                console.warn( msg )
                throw Error( msg )
            }
            if ( ! ( props.tableObject instanceof DataTable_RootTableObject ) ) {
                const msg = "DataTable_TableRoot:constructor: props.tableObject NOT instanceof DataTable_RootTableObject";
                console.warn( msg + ".  props.tableObject: ", props.tableObject )
                throw Error( msg )
            }

            const initialState = _createStateObjectFrom_DataTable_RootTableObject({
                callFromConstructor: true,
                tableObject : props.tableObject,
                resortTableOnUpdate : false /* not resort on first create */,
                sortColumnsInfo : null, //  Not sort at first
                showItemsPerPage_SelectValue: null,
                searchInputValue : null // Not Filtered at first
            });

            initialState.currentPage_CurrentValue = 1;

            this.state = initialState;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Must be Static, called by React
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : DataTable_TableRoot_Props, state : DataTable_TableRoot_State ) : DataTable_TableRoot_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //  Return new state (like return from setState(callback)) or null

        if ( props.tableObject.tableDataObject === state.tableDataObject_FromProps && props.tableObject.tableOptions === state.tableOptions_FromProps ) {
            //  No changes so just return
            return null;  //
        }

        //  Validate new DataTable Object from Props
        {
            try {
                // throws Error if not valid
                dataTable_React_DataObjects_Validator({dataTable_RootTableObject: props.tableObject})
            } catch (e) {
                //  Have catch since dataTable_React_DataObjects_Validator also throws Error
                console.warn("dataTable_React_DataObjects_Validator(...) threw Error: ", e)
                console.warn("dataTable_React_DataObjects_Validator(...) threw Error: props.tableObject.dataTableId: " + props.tableObject.dataTableId + ", props.tableObject: ", props.tableObject)
                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                throw e;
            }
        }

        //  Props changed so create new state
        const new_state : DataTable_TableRoot_State = _createStateObjectFrom_DataTable_RootTableObject({
            tableObject : props.tableObject, resortTableOnUpdate : props.resortTableOnUpdate,
            sortColumnsInfo : state.sortColumnsInfo,
            searchInputValue: state.searchInputValue_CurrentValue,
            showItemsPerPage_SelectValue: state.showItemsPerPage_SelectValue,
        });

        if ( props.tableObject.tableDataObject !== state.tableDataObject_FromProps ) {
            // New Table data so reset current page to 1
            new_state.currentPage_CurrentValue = 1;
        }

        return new_state;
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps : DataTable_TableRoot_Props, nextState : DataTable_TableRoot_State ) {

        if ( this.state.tableDataObject_INTERNAL !== nextState.tableDataObject_INTERNAL ) {
            return true;
        }
        if ( this.state.tableOptions !== nextState.tableOptions ) {
            return true;
        }
        if ( this.state.show_updatingTableOrder_Message !== nextState.show_updatingTableOrder_Message ) {
            return true;
        }
        if ( this.state.show_updatingTable_Message !== nextState.show_updatingTable_Message ) {
            return true;
        }

        if ( this.state.searchInputValue_CurrentValue !== nextState.searchInputValue_CurrentValue ) {
            return true;
        }
        if ( this.state.showItemsPerPage_SelectValue !== nextState.showItemsPerPage_SelectValue ) {
            return true;
        }
        if ( this.state.currentPage_CurrentValue !== nextState.currentPage_CurrentValue ) {
            return true;
        }

        return false;
    }

    /**
     * 
     */
    private _headerColumnClicked(params: DataTable_Table_HeaderRowEntry__headerColumnClicked_Callback_Params) : void {

        let displayUpdatingMsg = false;

        //  Restore this code if allow page size > 300

        //  !!!!  IMPORTANT: If restore this code, it NEEDS to use the size of the current page, not the size of all table rows like it does now.

        const displayUpdatingMsg_TriggerMinLength = 300;

        try {

            const pagedIndex = this.state.currentPage_CurrentValue - 1; // change from 1 based to zero based.

            const dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged = this.state.tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged;

            if (dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged && dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged.length > 0) {

                const dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry =
                    dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged[pagedIndex];

                if (dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry) {

                    let dataRowsInGroups = 0;

                    for ( const dataTable_INTERNAL_DataGroupRowEntry of dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry.dataTable_INTERNAL_DataGroupRowEntries ) {

                        dataRowsInGroups += dataTable_INTERNAL_DataGroupRowEntry.dataTable_DataRowEntries__INTERNAL.length;
                    }

                    if ( dataRowsInGroups > displayUpdatingMsg_TriggerMinLength) {

                        displayUpdatingMsg = true;
                    }
                }
            }

            const dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged = this.state.tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged;

            if (dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged && dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged.length > 0) {

                const dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry =
                    dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged[pagedIndex];

                if (dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry
                    && dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry.dataTable_INTERNAL_DataRowEntries.length > displayUpdatingMsg_TriggerMinLength) {

                    displayUpdatingMsg = true;
                }
            }

        } catch (e) {
            var zNOTHING = 0;
            //  Eat exception
        }

        if ( displayUpdatingMsg ) {

            //  Update differed until after displaying updating message

            this.setState({ show_updatingTableOrder_Message : true });

            window.setTimeout(() => {
                    
                this.setState({ show_updatingTableOrder_Message : false });

                this.setState( (existingState: DataTable_TableRoot_State, props: DataTable_TableRoot_Props ) : DataTable_TableRoot_State => {

                    // Important: read `existingState` instead of `this.state` when updating.

                    return this._headerColumnClicked_CreateNewState({ existingState, header_clickCallback_params: params });
                });
            }, 10 );

        } else {

            //  Update immediately
            
            this.setState( (existingState: DataTable_TableRoot_State, props: DataTable_TableRoot_Props ) : DataTable_TableRoot_State => {

                // Important: read `existingState` instead of `this.state` when updating.

                return this._headerColumnClicked_CreateNewState({ existingState, header_clickCallback_params: params });
            });
        }
    }

    /**
     * 
     */
    _headerColumnClicked_CreateNewState(
        {
            existingState,  header_clickCallback_params
        } : {
            existingState : DataTable_TableRoot_State
            header_clickCallback_params: DataTable_Table_HeaderRowEntry__headerColumnClicked_Callback_Params

        }) : DataTable_TableRoot_State {

        const tableDataObject_INTERNAL = existingState.tableDataObject_INTERNAL;
        let sortColumnsInfo_Existing = existingState.sortColumnsInfo;

        const sortColumnsInfo = this._update_sortColumnsInfo({ header_clickCallback_params, sortColumnsInfo_Existing });

        const tableDataObject_INTERNAL_New = _sort_tableObject_on_sortColumnsInfo({ tableDataObject_INTERNAL, sortColumnsInfo });

        const tableDataObject_INTERNAL_New_Paged =
            dataTable_React_INTERNAL_Populate_Current_Pages_Arrays({
                dataTable_INTERNAL_RootTableDataObject: tableDataObject_INTERNAL_New, itemsPerPage_Count: this.state.showItemsPerPage_SelectValue,
                enable_Pagination_Download_Search: this.props.tableObject.tableOptions.enable_Pagination_Download_Search
            });

        //  Return updated objects to update state
        return { tableDataObject_INTERNAL : tableDataObject_INTERNAL_New_Paged, sortColumnsInfo };
    }

    /**
     * 
     */
    _update_sortColumnsInfo(
        {
            header_clickCallback_params, sortColumnsInfo_Existing
        } : {
            header_clickCallback_params: DataTable_Table_HeaderRowEntry__headerColumnClicked_Callback_Params
            sortColumnsInfo_Existing : Array<DataTable_INTERNAL_SortColumnsInfoEntry>

        }) : Array<DataTable_INTERNAL_SortColumnsInfoEntry> {

        const columnId = header_clickCallback_params.columnId;
        const ctrl_OR_meta_KeyDown = header_clickCallback_params.ctrl_OR_meta_KeyDown


        let sortColumnsInfo = sortColumnsInfo_Existing;

        if ( ! sortColumnsInfo ) {
            //  No previous entries

            sortColumnsInfo = [ { columnId, sortDirection : SORT_DIRECTION_ASCENDING, sortPosition: 1 } ];

        } else if ( ! ctrl_OR_meta_KeyDown ) {

            //  Ctrl Or Meta Key NOT down

            const sortColumnsInfoEntry_For_Clicked_columnId = sortColumnsInfo.find( ( element ) => { return element.columnId === columnId } );
            if ( sortColumnsInfoEntry_For_Clicked_columnId ) {

                //  Click existing sort column so reverse direction

                if ( sortColumnsInfoEntry_For_Clicked_columnId.sortDirection === SORT_DIRECTION_ASCENDING ) {
                    sortColumnsInfoEntry_For_Clicked_columnId.sortDirection = SORT_DIRECTION_DECENDING;
                } else {
                    sortColumnsInfoEntry_For_Clicked_columnId.sortDirection = SORT_DIRECTION_ASCENDING;
                }
            } else {

                //  Click Table column NOT in sort columns so Replace sort columns with ONLY this column

                sortColumnsInfo = [ { columnId, sortDirection : SORT_DIRECTION_ASCENDING, sortPosition: 1 } ];
            }

        } else {
            // Ctrl Or Meta Key IS down when column header clicked

            const sortColumnsInfoEntry_For_Clicked_columnId = sortColumnsInfo.find( ( element ) => { return element.columnId === columnId } );
            if ( sortColumnsInfoEntry_For_Clicked_columnId ) {

                // Click Already selected column so remove columnId

                sortColumnsInfo = sortColumnsInfo.filter( (value, index) => {
                    return value.columnId !== columnId
                });

                //  Update 'sortPosition' property in all entries
                {
                    let position = 1;
                    for ( const entry of sortColumnsInfo ) {
                        entry.sortPosition = position;
                        position++;
                    }
                }

            } else {

                //  Click Not selected column so add to end

                const sortColumnsInfo_Length = sortColumnsInfo.length;
                sortColumnsInfo.push( { columnId, sortDirection : SORT_DIRECTION_ASCENDING, sortPosition: sortColumnsInfo_Length + 1 } );
            }
        }

        return sortColumnsInfo;
    }

    /**
     * User Entered Value for Search
     */
    private _searchInputField_NewValueEntered_Callback( newValue : string ) : void {

        const searchInputValue_CurrentValue = newValue;

        this.setState( (existingState: DataTable_TableRoot_State, props: DataTable_TableRoot_Props ) : DataTable_TableRoot_State => {

            let tableDataObject_INTERNAL_New_Final : DataTable_INTERNAL_RootTableDataObject = undefined;

            // Important: read `existingState` instead of `this.state` when updating.
            const tableDataObject_INTERNAL_New_Filtered = _filterOnSearchInput_IfApplicable({
                tableDataObject_INTERNAL: existingState.tableDataObject_INTERNAL, searchInputValue: searchInputValue_CurrentValue, sortColumnsInfo : existingState.sortColumnsInfo
            });

            tableDataObject_INTERNAL_New_Final = tableDataObject_INTERNAL_New_Filtered;

            if ( props.resortTableOnUpdate && existingState.sortColumnsInfo ) {

                const tableDataObject_INTERNAL_New_Sorted = _sort_tableObject_on_sortColumnsInfo({
                    tableDataObject_INTERNAL : tableDataObject_INTERNAL_New_Filtered, sortColumnsInfo: existingState.sortColumnsInfo
                });
                //  update tableDataObject
                tableDataObject_INTERNAL_New_Final = tableDataObject_INTERNAL_New_Sorted;
            }

            //  Break into pages
            const tableDataObject_INTERNAL_New_Paged =
                dataTable_React_INTERNAL_Populate_Current_Pages_Arrays({
                    dataTable_INTERNAL_RootTableDataObject: tableDataObject_INTERNAL_New_Final, itemsPerPage_Count: existingState.showItemsPerPage_SelectValue,
                    enable_Pagination_Download_Search: props.tableObject.tableOptions.enable_Pagination_Download_Search
                });

            tableDataObject_INTERNAL_New_Final = tableDataObject_INTERNAL_New_Paged;

            return { currentPage_CurrentValue: 1, searchInputValue_CurrentValue, tableDataObject_INTERNAL: tableDataObject_INTERNAL_New_Final };
        });
    }

    /**
     *
     * @param newValue
     * @private
     */
    private _showItemsPerPage_Select_Component__InputField_NewValueEntered_Callback( newValue : number ) : void {

        if ( newValue > 100 || newValue === DataTable_TableRoot_showItemsPerPage_SelectValue_SHOW_ALL
            || this.state.showItemsPerPage_SelectValue > 100 || this.state.showItemsPerPage_SelectValue === DataTable_TableRoot_showItemsPerPage_SelectValue_SHOW_ALL ) {

            //  Show updating message then perform main update

            this.setState({ show_updatingTable_Message: true });

            window.setTimeout( () => {

                this.setState({ show_updatingTable_Message: false });

                this._showItemsPerPage_Select_Component__InputField_NewValueEntered_Callback__MainPart( newValue );
            })

        } else {

            // main update immediately
            this._showItemsPerPage_Select_Component__InputField_NewValueEntered_Callback__MainPart(newValue);
        }

    }


    /**
     *
     * @param newValue
     * @private
     */
    private _showItemsPerPage_Select_Component__InputField_NewValueEntered_Callback__MainPart( newValue : number ) : void {

        this.setState( (existingState: DataTable_TableRoot_State, props: DataTable_TableRoot_Props ) : DataTable_TableRoot_State => {

            let tableDataObject_INTERNAL_New_Final : DataTable_INTERNAL_RootTableDataObject = undefined;

            // Important: read `existingState` instead of `this.state` when updating.
            const tableDataObject_INTERNAL_New_Filtered = _filterOnSearchInput_IfApplicable({
                tableDataObject_INTERNAL: existingState.tableDataObject_INTERNAL, searchInputValue: existingState.searchInputValue_CurrentValue, sortColumnsInfo : existingState.sortColumnsInfo
            });

            tableDataObject_INTERNAL_New_Final = tableDataObject_INTERNAL_New_Filtered;

            if ( props.resortTableOnUpdate && existingState.sortColumnsInfo ) {

                const tableDataObject_INTERNAL_New_Sorted = _sort_tableObject_on_sortColumnsInfo({
                    tableDataObject_INTERNAL : existingState.tableDataObject_INTERNAL, sortColumnsInfo: existingState.sortColumnsInfo
                });
                //  update tableDataObject
                tableDataObject_INTERNAL_New_Final = tableDataObject_INTERNAL_New_Sorted;
            }

            //  Break into pages
            const tableDataObject_INTERNAL_New_Paged =
                dataTable_React_INTERNAL_Populate_Current_Pages_Arrays({
                    dataTable_INTERNAL_RootTableDataObject: tableDataObject_INTERNAL_New_Final, itemsPerPage_Count: newValue,
                    enable_Pagination_Download_Search: props.tableObject.tableOptions.enable_Pagination_Download_Search
                });

            tableDataObject_INTERNAL_New_Final = tableDataObject_INTERNAL_New_Paged;

            return { currentPage_CurrentValue: 1, showItemsPerPage_SelectValue: newValue, tableDataObject_INTERNAL: tableDataObject_INTERNAL_New_Final };
        });
    }

    /**
     * @param newValue
     */
    private _currentPage_CurrentValue_Update_Callback(newValue : number ) : void {

        if ( this.state.showItemsPerPage_SelectValue > 250 ) {

            //  Page is large so show Updating message while changing page

            this.setState({show_updatingTable_Message: true });

            window.setTimeout( () => {
                try {

                    this.setState({currentPage_CurrentValue: newValue, show_updatingTable_Message: false });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            } , 40 );

        } else {

            //  Run Page change immediately

            this.setState({currentPage_CurrentValue: newValue});
        }
    }

    /**
     *
     */
    private _downloadTableContents_All() {
        try {

            //  Array of Arrays of reportLineParts
            const reportLineParts_AllLines : Array<Array<string>> = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join

            if ( this.props.tableObject.tableDataObject.download_Content_PrefixLines ) {
                //  Add prefixLines to start of download
                for ( const prefixLine of this.props.tableObject.tableDataObject.download_Content_PrefixLines ) {
                    reportLineParts_AllLines.push( [ prefixLine ] )
                }
            }

            //  reportLineParts will be joined with separator '\t'

            //  Header Line
            this._downloadTableContents__Process_Header({
                columns_tableDownload : this.state.tableDataObject_INTERNAL.dataTable_RootTableDataObject.columns_tableDownload, reportLineParts_AllLines
            });

            //  Data Lines -

            if ( this.state.tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_All ) {

                for ( const entry of this.state.tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_All ) {

                    this._downloadTableContents__Process_dataTable_DataRowEntries__INTERNAL({
                        dataTable_DataRowEntries__INTERNAL:  entry.dataTable_DataRowEntries__INTERNAL, reportLineParts_AllLines
                    });
                }

            } else if ( this.state.tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_All ) {

                this._downloadTableContents__Process_dataTable_DataRowEntries__INTERNAL({
                    dataTable_DataRowEntries__INTERNAL: this.state.tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_All, reportLineParts_AllLines
                });
            } else {
                throw Error("_downloadTableContents_All_Clicked: Neither Populated: tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_All NOR tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_All");
            }

            const reportLinesSingleString = this._downloadTableContents__CombineContentsIntoString( reportLineParts_AllLines );

            StringDownloadUtils.downloadStringAsFile({ stringToDownload : reportLinesSingleString, filename: 'table_contents.txt' });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _downloadTableContents_Filtered() {
        try {
            //  Array of Arrays of reportLineParts
            const reportLineParts_AllLines : Array<Array<string>> = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join

            if ( this.props.tableObject.tableDataObject.download_Content_PrefixLines ) {
                //  Add prefixLines to start of download
                for ( const prefixLine of this.props.tableObject.tableDataObject.download_Content_PrefixLines ) {
                    reportLineParts_AllLines.push( [ prefixLine ] )
                }
            }

            //  reportLineParts will be joined with separator '\t'

            //  Header Line
            this._downloadTableContents__Process_Header({
                columns_tableDownload : this.state.tableDataObject_INTERNAL.dataTable_RootTableDataObject.columns_tableDownload, reportLineParts_AllLines
            });

            //  Data Lines -

            if ( this.state.tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing ) {

                for ( const entry of this.state.tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing ) {

                    this._downloadTableContents__Process_dataTable_DataRowEntries__INTERNAL({
                        dataTable_DataRowEntries__INTERNAL:  entry.dataTable_DataRowEntries__INTERNAL, reportLineParts_AllLines
                    });
                }

            } else if ( this.state.tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing ) {

                this._downloadTableContents__Process_dataTable_DataRowEntries__INTERNAL({
                    dataTable_DataRowEntries__INTERNAL: this.state.tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing, reportLineParts_AllLines
                });
            } else {
                throw Error("_downloadTableContents_All_Clicked: Neither Populated: _downloadTableContents__Process_dataTable_DataRowEntries__INTERNAL NOR dataTable_DataRowEntries__INTERNAL_CurrentlyShowing");
            }

            const reportLinesSingleString = this._downloadTableContents__CombineContentsIntoString( reportLineParts_AllLines );

            StringDownloadUtils.downloadStringAsFile({ stringToDownload : reportLinesSingleString, filename: 'table_contents_filtered.txt' });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _downloadTableContents__CombineContentsIntoString( reportLineParts_AllLines : Array<Array<string>> ) : string {

        //  Join all line parts into string for each line, delimit on '\t'

        const reportLine_AllLines = [];

        for ( const reportLineParts of reportLineParts_AllLines ) {

            const reportLine = reportLineParts.join( "\t" );
            reportLine_AllLines.push( reportLine );
        }

        //  Add empty string to array so get \n at end of last line when do reportLine_AllLines.join( '\n' );
        reportLine_AllLines.push("");

        //  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end

        const reportLinesSingleString = reportLine_AllLines.join( '\n' );

        return reportLinesSingleString;
    }

    /**
     *
     */
    private _downloadTableContents__Process_Header(
        {
            columns_tableDownload, reportLineParts_AllLines
        } : {
            columns_tableDownload: DataTable_Column_DownloadTable[]
            reportLineParts_AllLines : Array<Array<string>>
        }) : void {

        const reportLineParts : Array<string> = [];
        let index = 0;

        for ( const column of columns_tableDownload ) {

            reportLineParts.push( column.cell_ColumnHeader_String );

            index++;
        }

        reportLineParts_AllLines.push( reportLineParts );
    }

    /**
     *
     */
    private _downloadTableContents__Process_dataTable_DataRowEntries__INTERNAL(
        {
            dataTable_DataRowEntries__INTERNAL, reportLineParts_AllLines
        } : {
            dataTable_DataRowEntries__INTERNAL: DataTable_INTERNAL_DataRowEntry[]
            reportLineParts_AllLines : Array<Array<string>>
        }) : void {

        for ( const dataTable_DataRowEntry__INTERNAL of dataTable_DataRowEntries__INTERNAL ) {

            const reportLineParts : Array<string> = [];
            let index = 0;

            for ( const columnEntry of dataTable_DataRowEntry__INTERNAL.dataTable_DataRowEntry.dataTable_DataRowEntry_DownloadTable.dataColumns_tableDownload ) {

                let cellContentsString = columnEntry.cell_ColumnData_String;

                reportLineParts.push( cellContentsString );

                index++;
            }

            reportLineParts_AllLines.push( reportLineParts );
        }
    }

    //////////////////////////////

    /**
     *
     */
    render() {

        // console.log("DataTable_TableRoot: render()")

        let have_DataGroups = false;

        if ( this.state.tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_All ) {

            have_DataGroups = true;
        }

        //  Validate incoming data
        {
            const tableDataObject_INTERNAL = this.state.tableDataObject_INTERNAL;

            if ( tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_All && tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_All ) {
                const msg = "Invalid that tableObject.dataTable_DataGroupRowEntries && tableObject.dataTable_DataRowEntries are both populated."
                console.warn( msg );
                throw Error( msg );
            }
            if ( ( ! tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_All ) && ( ! tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_All ) ) {
                const msg = "Invalid that tableObject.dataTable_DataGroupRowEntries && tableObject.dataTable_DataRowEntries are both NOT populated."
                console.warn( msg );
                throw Error( msg );
            }
        }

        //  Convert this.state.tableDataObject.columns into React components

        const columnsArrayLength = this.state.tableDataObject_INTERNAL.dataTable_RootTableDataObject.columns.length;

        const sortColumnsInfo = this.state.sortColumnsInfo;

        //  Create Header Row Components

        let headerColumnsReactComponents: JSX.Element[] = undefined;

        {
            let no_Columns_Are_Sortable = true;
            for ( const column of this.state.tableDataObject_INTERNAL.dataTable_RootTableDataObject.columns ) {
                if ( column.sortable ) {
                    no_Columns_Are_Sortable = false;
                    break;
                }
            }

            headerColumnsReactComponents = (

                this.state.tableDataObject_INTERNAL.dataTable_RootTableDataObject.columns.map( (column, index ) => {

                    const columnId = column.id;

                    let column_sortDirection: string = undefined;
                    let column_sortPosition: number = undefined;

                    if ( sortColumnsInfo ) {

                        for ( const sortColumnsInfoEntry_InArray of sortColumnsInfo ) {

                            const columnId_InSortEntry = sortColumnsInfoEntry_InArray.columnId;
                            if ( columnId === columnId_InSortEntry ) {
                                column_sortDirection = sortColumnsInfoEntry_InArray.sortDirection;
                                if ( sortColumnsInfo.length !== 1 ) {
                                    column_sortPosition = sortColumnsInfoEntry_InArray.sortPosition;
                                }
                                break;
                            }
                        }
                    }

                    const lastColumn = index === ( columnsArrayLength - 1 );

                    //   return inside a array.map
                    return (
                        <DataTable_Table_HeaderRowEntry
                            column={ column }
                            column_sortDirection={ column_sortDirection }
                            column_sortPosition={ column_sortPosition }
                            lastColumn={ lastColumn }
                            no_Columns_Are_Sortable={ no_Columns_Are_Sortable }
                            headerColumnClicked_Callback={ this._headerColumnClicked_BindThis }
                            key={ index } />
                    );
                })
            );
        }

        let tableHeaderContainerDiv_ClassNames : string = " table-header-container-div "

        if ( this.state.tableDataObject_INTERNAL.highlightingOneOrMoreRowsWithBorder ) {

            tableHeaderContainerDiv_ClassNames += " table-header-container-div-padding-for-data-row-border "
        }


        let headerMain = (

            <div className={ tableHeaderContainerDiv_ClassNames }>
                <table className=" data-table-header-table ">
                    <thead>
                        <tr className=" data-table-header-row data-table-row ">
                            
                            { headerColumnsReactComponents }
                        </tr>
                    </thead>
                </table>
            </div>
        )

        let header = headerMain;

        if ( have_DataGroups ) {

            header = (
                <div className=" data-table-header-row-groups-container  " >  {/* selector_group_container */}
                        { headerMain }
                    
                </div>
            )
        }

        let dataRows = undefined;

        let showingStart = 0;
        let showingEnd = 0;

        if ( have_DataGroups ) {
            
            //  Display Groups, with each group entry containing dataTable_DataRowEntries

            //  Convert this.state.tableDataObject.dataTable_DataGroupRowEntries into React components

            const dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged = this.state.tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged;

            if ( dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged.length > 0 ) {

                const pagedIndex = this.state.currentPage_CurrentValue - 1; // change from 1 based to zero based.

                const dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry =
                    dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged[ pagedIndex ];

                if ( ! dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry ) {
                    throw Error("( ! dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry ) ")
                }

                showingStart = dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry.itemCount_pageStart;
                showingEnd =   dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry.itemCount_pageEnd;

                const dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing =
                    dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry.dataTable_INTERNAL_DataGroupRowEntries

                const dataGroupRowsReactComponents = [];

                let highlightRow = false; // Alternate highlighting Table Group Rows
                for ( const dataTable_INTERNAL_DataGroupRowEntry of dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing ) {
                    const reactRowElement = (
                        <DataTable_Table_DataRow_Group
                            dataTable_INTERNAL_DataGroupRowEntry={ dataTable_INTERNAL_DataGroupRowEntry }
                            columns={ this.state.tableDataObject_INTERNAL.dataTable_RootTableDataObject.columns }
                            tableOptions={ this.state.tableOptions }
                            tableRows_TotalCount={ this.state.tableRows_TotalCount }
                            dataTable_RootTableDataObject_INTERNAL={ this.state.tableDataObject_INTERNAL }
                            dataTableId={ this.props.tableObject.dataTableId }
                            highlightRow={ highlightRow }
                            key={ dataTable_INTERNAL_DataGroupRowEntry.dataTable_DataGroupRowEntry.uniqueId }
                        />
                    );

                    dataGroupRowsReactComponents.push( reactRowElement );

                    if ( highlightRow ) {
                        highlightRow = false;
                    } else {
                        highlightRow = true;
                    }
                }

                dataRows = (
                    <div >

                        { dataGroupRowsReactComponents }
                    </div>
                );
            }

        } else {

            //  No Groups so display the Data Rows

            if ( this.state.tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing === undefined || this.state.tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing === null ) {
                throw Error(" ( this.state.tableOptions.tableGroups ) is false and ( this.state.tableDataObject.dataTable_DataRowEntries__INTERNAL_All === undefined || this.state.tableDataObject.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing === null )")
            }

            //  Convert this.state.tableDataObject.dataTable_DataRowEntries into React components

            const dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged = this.state.tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged;

            if ( dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged.length > 0 ) {

                let pagedIndex = this.state.currentPage_CurrentValue - 1; // change from 1 based to zero based.

                const dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry =
                    dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged[ pagedIndex ];

                if ( ! dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry ) {
                    throw Error("( ! dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry ) ")
                }

                showingStart = dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry.itemCount_pageStart;
                showingEnd =   dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry.itemCount_pageEnd;

                const dataTable_DataRowEntries__INTERNAL_CurrentlyShowing =
                    dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged_Entry.dataTable_INTERNAL_DataRowEntries

                const dataRowsReactComponents = [];
                {
                    const dataTable_DataRowEntries_Length = dataTable_DataRowEntries__INTERNAL_CurrentlyShowing.length;
                    let counter = 0;
                    for ( const dataTable_INTERNAL_DataRowEntry of dataTable_DataRowEntries__INTERNAL_CurrentlyShowing ) {
                        counter++;
                        const isLastRow = dataTable_DataRowEntries_Length === counter;
                        const reactRowElement = (
                            <DataTable_Table_DataRow
                                columns={ this.state.tableDataObject_INTERNAL.dataTable_RootTableDataObject.columns }
                                dataTable_DataRowEntry_INTERNAL={ dataTable_INTERNAL_DataRowEntry }
                                tableRows_TotalCount={ this.state.tableRows_TotalCount }
                                tableOptions={ this.state.tableOptions }
                                dataTable_RootTableDataObject_INTERNAL={ this.state.tableDataObject_INTERNAL }
                                dataTableId={ this.props.tableObject.dataTableId }
                                isInGroup={ false }
                                isFirstRowInGroup={ false }
                                key={ dataTable_INTERNAL_DataRowEntry.dataTable_DataRowEntry.uniqueId }
                            />
                        );

                        dataRowsReactComponents.push( reactRowElement );
                    }
                }

                dataRows = dataRowsReactComponents ;
            }
        }

        let divCssClass = " data-table-container-react ";

        {
            let addPassingForChildContent = false;

            //  Check all data row entries for show child data function callback

            if ( _anyDataRow_Has_ChildContent_ChildDataTable_Function_Callback( this.state.tableDataObject_INTERNAL) ) {

                addPassingForChildContent = true;
            }

            if ( addPassingForChildContent ) {
                //  Adding show/hide child table icons to left of each row
                //     so need to add padding to provide space for them on the left since
                //     the icons are positioned with a negative value for 'left' css property
                divCssClass += " padding-for-room-for-child-table-show-hide-icon ";
            }
        }

        return (
            <React.Fragment>
                <div className={ divCssClass }  style={ { position: "relative" }} data-react-component="DataTable_TableRoot">

                    { ( this.props.tableObject.tableOptions.enable_Pagination_Download_Search || this.props.tableObject.tableOptions.enable_Download ) ? (

                        // Only Display when Pagination, Download, Search enabled

                        <div>
                            <div style={ { marginBottom: 5 } }>

                                { ( this.props.tableObject.tableOptions.enable_Pagination_Download_Search ) ? (
                                    <>
                                        <span style={ { fontWeight: "bold" } }>Currently Showing:&nbsp;</span>

                                        {(showingStart) ? (
                                            (showingEnd === 1) ? (
                                                <span>1</span>
                                            ) : (
                                                <span>{showingStart.toLocaleString()}-{showingEnd.toLocaleString()}</span>
                                            )
                                        ) : (
                                            <span>0</span>
                                        )}
                                        <span>&nbsp;of&nbsp;</span>
                                        <span>{ this.state.tableDataObject_INTERNAL.getTotalCount_ForCurrentlyShowing().toLocaleString() }</span>

                                        { ( this.state.searchInputValue_CurrentValue ) ? (
                                            <span >
                                            &nbsp;(filtered)
                                        </span>
                                        ) : null }

                                        { ( this.props.tableObject.tableDataObject.text_Optional_After_CurrentlyShowing_X_Of_Y !== undefined
                                            &&  this.props.tableObject.tableDataObject.text_Optional_After_CurrentlyShowing_X_Of_Y !== null ) ? (
                                            <>
                                            <span >
                                                &nbsp;{ this.props.tableObject.tableDataObject.text_Optional_After_CurrentlyShowing_X_Of_Y }
                                            </span>
                                            </>
                                        ) : null }
                                    </>
                                ): null }

                                <span className=" fake-link " style={ { marginLeft: ( this.props.tableObject.tableOptions.enable_Pagination_Download_Search ) ?  15 : 0 } }
                                      onClick={ this._downloadTableContents_All_Clicked_BindThis }
                                >
                                    Download All Table Data
                                </span>

                                { ( this.state.searchInputValue_CurrentValue ) ? (
                                    <span className=" fake-link " style={ { marginLeft: 15 } }
                                          onClick={ this._downloadTableContents_Filtered_Clicked_BindThis }
                                    >
                                        Download Filtered Table Data
                                    </span>
                                ) : null }
                            </div>

                            { ( this.props.tableObject.tableOptions.enable_Pagination_Download_Search ) ? (

                                <>
                                    { ( this.state.tableDataObject_INTERNAL.getTotalCount_ForAll() >= _showItemsPerPage_SelectValue_Minimum_Value && this.state.tableDataObject_INTERNAL.getPageCount() > 0 ) ? (

                                        // Show this line if:  Have more items than for 1 page.  Page Count is > 0 (Page Count is Zero if user search finds NO rows)

                                        <div style={ { marginBottom: 5 } }>

                                            {/*  Select Page to Display  */}
                                            <DataTable_TableRoot_React_Table_PageNavigation_Component
                                                pageNavigation_SelectValue_Prop={ this.state.currentPage_CurrentValue }
                                                pageNavigation_TotalPagesCount={ this.state.tableDataObject_INTERNAL.getPageCount() }
                                                tableDataObject_INTERNAL={ this.state.tableDataObject_INTERNAL }
                                                pageNavigation_NewValueEntered_Callback={ this._currentPage_CurrentValue_Update_Callback_BindThis }
                                            />

                                            {/*  Select number of rows per page */}
                                            <DataTable_TableRoot__ShowItemsPerPage_Select_Component
                                                showItemsPerPage_SelectValue_Prop={ this.state.showItemsPerPage_SelectValue }
                                                showItemsPerPage_SelectValue_Options={ _showItemsPerPage_SelectValue_OPTIONS }
                                                showItemsPerPage_NewValueEntered_Callback={ this._showItemsPerPage_Select_Component__InputField_NewValueEntered_Callback_BindThis }
                                            />

                                        </div>
                                    ) : null }

                                    { ( this.state.tableDataObject_INTERNAL.getTotalCount_ForAll() > 1 || this.state.searchInputValue_CurrentValue ) ? (

                                        <div style={ { marginBottom: 5 } }>
                                            <DataTable_TableRoot__FindAllRows_SearchInput_Component
                                                searchInputValue_Prop={ this.state.searchInputValue_CurrentValue }
                                                searchInputField_NewValueEntered_Callback={ this._searchInputField_NewValueEntered_Callback_BindThis }
                                            />
                                        </div>
                                    ) : null }

                                </>
                            ) : null }
                            
                        </div>

                    ) : null }

                    { header }
                    { ( ! dataRows ) ? (
                        ( this.state.searchInputValue_CurrentValue ) ? (
                            <div style={ { marginLeft: 10, marginTop: 10, marginBottom: 20, fontWeight: "bold" } }>
                                No rows contain '{ this.state.searchInputValue_CurrentValue }'
                            </div>
                        ) : (
                            <div style={ { marginLeft: 10, marginTop: 10, marginBottom: 20, fontWeight: "bold" } }>
                                No data
                            </div>
                        )
                    ) : (
                        dataRows
                    )}

                    { ( this.state.show_updatingTableOrder_Message ) ? (

                        <div className=" block-updating-overlay-container " >
                            Updating Table Order
                        </div>
                    ) : null }

                    { ( this.state.show_updatingTable_Message ) ? (

                        <div className=" block-updating-overlay-container " >
                            Updating Table
                        </div>
                    ) : null }


                </div>
                <br />  {/* <br/> Added since <div> before it has 'display: inline-block' in CSS class data-table-container-react */}
            </React.Fragment>
        )
    }
}

//////////////////////////////
//////////////////////////////
//////////////////////////////

//    Functions NOT in Class


/**
 *
 */
const _createStateObjectFrom_DataTable_RootTableObject = function ({ tableObject, resortTableOnUpdate, sortColumnsInfo, searchInputValue, showItemsPerPage_SelectValue, callFromConstructor } : {

    tableObject : DataTable_RootTableObject
    resortTableOnUpdate : boolean
    sortColumnsInfo : Array<DataTable_INTERNAL_SortColumnsInfoEntry>

    searchInputValue: string
    showItemsPerPage_SelectValue: number

    callFromConstructor? : boolean

}) : DataTable_TableRoot_State {

    let tableRows_TotalCount = 0

    {
        if ( tableObject.tableDataObject.dataTable_DataRowEntries ) {
            tableRows_TotalCount = tableObject.tableDataObject.dataTable_DataRowEntries.length
        }

        if ( tableObject.tableDataObject.dataTable_DataGroupRowEntries ) {

            for ( const dataTable_DataGroupRowEntry of tableObject.tableDataObject.dataTable_DataGroupRowEntries ) {

                tableRows_TotalCount += dataTable_DataGroupRowEntry.dataTable_DataRowEntries.length
            }
        }
    }

    const state : DataTable_TableRoot_State = {
        tableDataObject_INTERNAL: dataTable_React_INTERNAL_DataObjects_InitialPopulation({ dataTable_RootTableDataObject : tableObject.tableDataObject}),
        tableOptions : tableObject.tableOptions,
        tableDataObject_FromProps: tableObject.tableDataObject,
        tableOptions_FromProps : tableObject.tableOptions,
        tableRows_TotalCount
    };

    if ( callFromConstructor ) {

        state.searchInputValue_CurrentValue = "";
        state.showItemsPerPage_SelectValue = _showItemsPerPage_SelectValue_DEFAULT;
    }

    let showItemsPerPage_SelectValue_Local = showItemsPerPage_SelectValue;
    if ( showItemsPerPage_SelectValue_Local === undefined || showItemsPerPage_SelectValue_Local === null ) {
        showItemsPerPage_SelectValue_Local = state.showItemsPerPage_SelectValue;
    }

    //  Always re-filter for now
    state.tableDataObject_INTERNAL = _filterOnSearchInput_IfApplicable({
        tableDataObject_INTERNAL: state.tableDataObject_INTERNAL, searchInputValue, sortColumnsInfo
    });

    if ( resortTableOnUpdate && sortColumnsInfo ) {

        const tableDataObject_INTERNAL_New = _sort_tableObject_on_sortColumnsInfo({ tableDataObject_INTERNAL : state.tableDataObject_INTERNAL, sortColumnsInfo });

        //  update tableDataObject
        state.tableDataObject_INTERNAL = tableDataObject_INTERNAL_New;

    } else {
        state.sortColumnsInfo = null
    }

    {
        //  Break into pages
        const tableDataObject_INTERNAL_New_Paged =
            dataTable_React_INTERNAL_Populate_Current_Pages_Arrays({
                dataTable_INTERNAL_RootTableDataObject: state.tableDataObject_INTERNAL, itemsPerPage_Count: showItemsPerPage_SelectValue_Local,
                enable_Pagination_Download_Search: tableObject.tableOptions.enable_Pagination_Download_Search
            });
        state.tableDataObject_INTERNAL = tableDataObject_INTERNAL_New_Paged;
    }

    return state;
}

//////////////////

/**
 *
 * @param tableDataObject
 * @param searchInputValue
 */
const _filterOnSearchInput_IfApplicable = function (
    {
        tableDataObject_INTERNAL, searchInputValue, sortColumnsInfo
    } : {
        tableDataObject_INTERNAL: DataTable_INTERNAL_RootTableDataObject
        searchInputValue: string
        sortColumnsInfo : Array<DataTable_INTERNAL_SortColumnsInfoEntry>

    }): DataTable_INTERNAL_RootTableDataObject {

    const tableDataObject_INTERNAL_New = tableDataObject_INTERNAL.shallowClone();

    if ( searchInputValue === "" || searchInputValue === null || searchInputValue === undefined ) {
        //  Nothing to filter on, reset showing to all and resort

        tableDataObject_INTERNAL_New.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing = tableDataObject_INTERNAL_New.dataTable_DataRowEntries__INTERNAL_All;
        tableDataObject_INTERNAL_New.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing = tableDataObject_INTERNAL_New.dataTable_DataGroupRowEntries__INTERNAL_All;

        const tableDataObject_INTERNAL_New_Sorted = _sort_tableObject_on_sortColumnsInfo({ tableDataObject_INTERNAL : tableDataObject_INTERNAL_New, sortColumnsInfo })

        return tableDataObject_INTERNAL_New_Sorted;
    }

    const searchInputValue_ForSearching = DataTable_INTERNAL_Search_Utils.search_ChangeCharacterStringCase_ForSearching( searchInputValue );

    if ( tableDataObject_INTERNAL_New.dataTable_DataRowEntries__INTERNAL_All ) {

        tableDataObject_INTERNAL_New.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing =
            _filterOnSearchInput_IfApplicable_dataTable_DataRowEntries__INTERNAL({ searchInputValue_ForSearching, dataTable_INTERNAL_DataRowEntries : tableDataObject_INTERNAL_New.dataTable_DataRowEntries__INTERNAL_All })

    } else if ( tableDataObject_INTERNAL_New.dataTable_DataGroupRowEntries__INTERNAL_All ) {

        //  Filter the groups

        //  Show Groups where any row has the search string

        const dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing :  DataTable_INTERNAL_DataGroupRowEntry[] = []

        for ( const dataTable_DataGroupRowEntry_INTERNAL_InitialUnfiltered_ALL of tableDataObject_INTERNAL_New.dataTable_DataGroupRowEntries__INTERNAL_All ) {


            let found = false;

            for ( const dataTable_INTERNAL_DataRowEntry of dataTable_DataGroupRowEntry_INTERNAL_InitialUnfiltered_ALL.dataTable_DataRowEntries__INTERNAL ) {
                for ( const searchCharacterString_ToSearch_Entry of dataTable_INTERNAL_DataRowEntry.searchCharacterString_ToSearch_Entries ) {
                    if ( searchCharacterString_ToSearch_Entry.includes( searchInputValue_ForSearching )) {
                        found = true;
                        break;
                    }
                }
                if ( found ) {
                    break;
                }
            }
            if ( found ) {

                dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing.push( dataTable_DataGroupRowEntry_INTERNAL_InitialUnfiltered_ALL );
            }
        }

        tableDataObject_INTERNAL_New.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing = dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing;

    } else {

        const msg = "_filterOnSearchInput_IfApplicable: Neither are populated: tableDataObject_INTERNAL_New.dataTable_DataRowEntries__INTERNAL_All, tableDataObject_INTERNAL_New.dataTable_DataGroupRowEntries__INTERNAL_All";
        console.warn( msg );
        throw Error( msg );
    }

    const tableDataObject_INTERNAL_New_Sorted = _sort_tableObject_on_sortColumnsInfo({ tableDataObject_INTERNAL : tableDataObject_INTERNAL_New, sortColumnsInfo })

    return tableDataObject_INTERNAL_New_Sorted;
}

/**
 *
 * @param tableDataObject
 * @param searchInputValue
 */
const _filterOnSearchInput_IfApplicable_dataTable_DataRowEntries__INTERNAL = function (
    {
        dataTable_INTERNAL_DataRowEntries, searchInputValue_ForSearching
    } : {
        dataTable_INTERNAL_DataRowEntries: DataTable_INTERNAL_DataRowEntry[]
        searchInputValue_ForSearching: string
    }):  DataTable_INTERNAL_DataRowEntry[] {

    const filtered_DataTable_INTERNAL_DataRowEntries :  DataTable_INTERNAL_DataRowEntry[] = [];

    for ( const dataTable_INTERNAL_DataRowEntry of dataTable_INTERNAL_DataRowEntries ) {

        let found = false;

        for ( const searchCharacterString_ToSearch_Entry of dataTable_INTERNAL_DataRowEntry.searchCharacterString_ToSearch_Entries ) {
            if ( searchCharacterString_ToSearch_Entry.includes( searchInputValue_ForSearching )) {
                found = true;
                break;
            }
        }
        if ( found ) {

            filtered_DataTable_INTERNAL_DataRowEntries.push( dataTable_INTERNAL_DataRowEntry );
        }
    }

    return filtered_DataTable_INTERNAL_DataRowEntries;
}

//////////////////

/**
 *
 */
const _sort_tableObject_on_sortColumnsInfo = function (
    {
        tableDataObject_INTERNAL, sortColumnsInfo,
    } : {
        tableDataObject_INTERNAL : DataTable_INTERNAL_RootTableDataObject
        sortColumnsInfo : Array<DataTable_INTERNAL_SortColumnsInfoEntry>

    }) : DataTable_INTERNAL_RootTableDataObject {

    // console.log("_sort_tableObject_on_sortColumnsInfo")

    //  Sort table

    const columns = tableDataObject_INTERNAL.dataTable_RootTableDataObject.columns;

    const tableDataObject_INTERNAL_New = tableDataObject_INTERNAL.shallowClone(); // make copy of tableObject

    if ( tableDataObject_INTERNAL_New.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing ) {

        dataTable_SortDataRows__sort_dataRows_on_sortColumnsInfo({ dataToSort : tableDataObject_INTERNAL_New.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing, columns, sortColumnsInfo });

    } else if ( tableDataObject_INTERNAL_New.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing ) {

        //  Sort the groups

        //  First sort the contents of each group.  This will also update what the group returns for sorting the groups

        for ( const dataTable_DataGroupRowEntry_INTERNAL of tableDataObject_INTERNAL_New.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing ) {

            dataTable_SortDataRows__sort_dataRows_on_sortColumnsInfo({ dataToSort : dataTable_DataGroupRowEntry_INTERNAL.dataTable_DataRowEntries__INTERNAL, columns, sortColumnsInfo });

            //  Update columnEntries to first row in group

            dataTable_DataGroupRowEntry_INTERNAL.columnEntries = dataTable_DataGroupRowEntry_INTERNAL.dataTable_DataRowEntries__INTERNAL[ 0 ].columnEntries;
        }

        //  Sort the groups

        dataTable_SortDataRows__sort_dataRows_on_sortColumnsInfo({ dataToSort : tableDataObject_INTERNAL_New.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing, columns, sortColumnsInfo });

    } else {

        const msg = "_sort_tableObject_on_sortColumnsInfo: Neither are populated: tableDataObject_INTERNAL_New.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing, tableDataObject_INTERNAL_New.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing";
        console.warn( msg );
        throw Error( msg );
    }

    //  Return updated object
    return tableDataObject_INTERNAL_New;
}


/**
 *
 */
const _anyDataRow_Has_ChildContent_ChildDataTable_Function_Callback = function( tableDataObject_INTERNAL : DataTable_INTERNAL_RootTableDataObject ) : boolean {

    if ( tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_All ) {

        for (const dataTable_INTERNAL_DataGroupRowEntry of tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_All) {

            const foundInGroupRows = _anyDataRow_Has_ChildContent_ChildDataTable_Function_Callback___Check_DataRowEntriesArray( dataTable_INTERNAL_DataGroupRowEntry.dataTable_DataRowEntries__INTERNAL );
            if ( foundInGroupRows ) {
                return true;
            }
        }

    } else {

        return _anyDataRow_Has_ChildContent_ChildDataTable_Function_Callback___Check_DataRowEntriesArray(tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_All);
    }
}


/**
 *
 */
const _anyDataRow_Has_ChildContent_ChildDataTable_Function_Callback___Check_DataRowEntriesArray = function( dataTable_DataRowEntries__INTERNAL_All: DataTable_INTERNAL_DataRowEntry[] ) : boolean {

    for (const dataTable_INTERNAL_DataRowEntry of dataTable_DataRowEntries__INTERNAL_All) {

        if ( dataTable_INTERNAL_DataRowEntry.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_Promise_ChildContent ||
            dataTable_INTERNAL_DataRowEntry.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent ||
            dataTable_INTERNAL_DataRowEntry.dataTable_DataRowEntry.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent ||
            dataTable_INTERNAL_DataRowEntry.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject ||
            dataTable_INTERNAL_DataRowEntry.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject ||
            dataTable_INTERNAL_DataRowEntry.dataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject ) {

            return true;
        }
    }

    return false;
}
