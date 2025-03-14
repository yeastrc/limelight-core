/**
 * proteinSelection_Generic__UserInputOverlay.tsx
 *
 *  Protein Selection:  Overlay for user to select proteins
 *
 */

import React from 'react'
import {
    ProteinSelection_Generic__ProteinData_Root,
} from "page_js/data_pages/common_components__react/protein_selection_generic_component/proteinSelection_Generic__ProteinData";
import {
    ProteinSelection_Generic__UserSelectionData_Root
} from "page_js/data_pages/common_components__react/protein_selection_generic_component/proteinSelection_Generic__UserSelectionData";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
    DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";


/////

const _Overlay_Title = "Select Proteins"

const _Overlay_Width = 1000;  //  Single width since using DataTable_React

const _Overlay_Width_Min = _Overlay_Width;
const _Overlay_Width_Max = _Overlay_Width;

const _Overlay_Height_Min = 500;
const _Overlay_Height_Max = 1400;

/**
 *
 */
export const get_proteinSelection_Generic__UserInputOverlay_Component = function ( props: ProteinSelection_Generic__UserInputOverlay_Component_Props ) {

    return (
        <ProteinSelection_Generic__UserInputOverlay_Component
            { ...props }
        />
    )
}

////  Callback definitions

//  Get Protein Data via callback, returns Promise

export class ProteinSelection_Generic__UserInputOverlay_GetProteinData_Root_UserSelectionData_Root__ReturnPromise_Callback_ResultObject {
    promise: Promise<{
        proteinData_Root: ProteinSelection_Generic__ProteinData_Root
        existing_userSelections: ProteinSelection_Generic__UserSelectionData_Root
    }>
}

export type ProteinSelection_Generic__UserInputOverlay_Get_ProteinData_Root_UserSelectionData_Root_ReturnPromise_Callback_Type =
    () => ProteinSelection_Generic__UserInputOverlay_GetProteinData_Root_UserSelectionData_Root__ReturnPromise_Callback_ResultObject


//   "Save" Clicked Callback

export class ProteinSelection_Generic__UserInputOverlay_Save_CallbackFunction_Params {
    new_userSelections: ProteinSelection_Generic__UserSelectionData_Root
}

export type ProteinSelection_Generic__UserInputOverlay_Save_Callback_Type =
    ( params: ProteinSelection_Generic__UserInputOverlay_Save_CallbackFunction_Params ) => void;

//   Get Protein Tooltip Content Callback

export class ProteinSelection_Generic__UserInputOverlay_GetProteinTooltipContents_CallbackFunction_Params {
    proteinSequenceVersionId: number
}

export type ProteinSelection_Generic__UserInputOverlay_GetProteinTooltipContents_CallbackFunction =
    ( params: ProteinSelection_Generic__UserInputOverlay_GetProteinTooltipContents_CallbackFunction_Params ) => JSX.Element;

////  React Components

/**
 *
 */
export interface ProteinSelection_Generic__UserInputOverlay_Component_Props {

    proteinData: ProteinSelection_Generic__ProteinData_Root
    callback_Get_ProteinData_Root_UserSelectionData_Root__ReturnPromise: ProteinSelection_Generic__UserInputOverlay_Get_ProteinData_Root_UserSelectionData_Root_ReturnPromise_Callback_Type

    existing_userSelections: ProteinSelection_Generic__UserSelectionData_Root

    callback_GetProteinTooltipContents: ProteinSelection_Generic__UserInputOverlay_GetProteinTooltipContents_CallbackFunction

    callbackOn_Cancel_Close_Clicked: () => void
    callbackOn_Save_Clicked: ProteinSelection_Generic__UserInputOverlay_Save_Callback_Type
}

/**
 *
 */
interface ProteinSelection_Generic__UserInputOverlay_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class ProteinSelection_Generic__UserInputOverlay_Component extends React.Component< ProteinSelection_Generic__UserInputOverlay_Component_Props, ProteinSelection_Generic__UserInputOverlay_Component_State > {

    private _save_Button_Clicked_BindThis = this._save_Button_Clicked.bind(this);
    private _proteinRow_Clicked_BindThis = this._proteinRow_Clicked.bind(this);

    private _proteinData_Root: ProteinSelection_Generic__ProteinData_Root

    private _proteinListDisplay_DataTable_RootTableObject : DataTable_RootTableObject

    private _existingSelections__selected_proteinSequenceVersionId: Set<number>;
    private _newSelections__selected_proteinSequenceVersionId: Set<number> = new Set();

    private _userSelections_Changed: boolean = false;

    private _alreadySelectedProtein_TooltipText: string;

    /**
     *
     */
    constructor(props: ProteinSelection_Generic__UserInputOverlay_Component_Props) {
        super(props);

        if ( props.proteinData ) {

            this._populate__Properties_From_Props_Or_LoadedData({
                proteinData_Root: props.proteinData,
                existing_userSelections: props.existing_userSelections,
                callback_GetProteinTooltipContents: this.props.callback_GetProteinTooltipContents
            })
        }

        try {
            this.state = {
                objectForceRerender: {}
            };

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            if ( ! this._proteinListDisplay_DataTable_RootTableObject ) {

                const result = this.props.callback_Get_ProteinData_Root_UserSelectionData_Root__ReturnPromise()
                result.promise.catch(reason => {})
                result.promise.then(value => { try {

                    this._populate__Properties_From_Props_Or_LoadedData({
                        proteinData_Root: value.proteinData_Root,
                        existing_userSelections: value.existing_userSelections,
                        callback_GetProteinTooltipContents: this.props.callback_GetProteinTooltipContents
                    })

                    this.setState({ objectForceRerender: {} })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _populate__Properties_From_Props_Or_LoadedData(
        {
            proteinData_Root, existing_userSelections, callback_GetProteinTooltipContents
        } : {
            proteinData_Root: ProteinSelection_Generic__ProteinData_Root
            existing_userSelections: ProteinSelection_Generic__UserSelectionData_Root
            callback_GetProteinTooltipContents: ProteinSelection_Generic__UserInputOverlay_GetProteinTooltipContents_CallbackFunction
        }
    ) {


        this._proteinData_Root = proteinData_Root


        if ( existing_userSelections && existing_userSelections.selected_proteinSequenceVersionId && existing_userSelections.selected_proteinSequenceVersionId.size > 0 ) {

            this._existingSelections__selected_proteinSequenceVersionId = new Set( existing_userSelections.selected_proteinSequenceVersionId );

            {
                let alreadySelectedProtein_TooltipText = null;

                alreadySelectedProtein_TooltipText = "* Indicates a protein that is already selected. Uncheck that protein to unselect it."

                //  Another possible string
                // alreadySelectedProtein_TooltipText = "* Indicates a protein already selected on this page before this dialog was opened."

                this._alreadySelectedProtein_TooltipText = alreadySelectedProtein_TooltipText;
            }

        } else {
            this._existingSelections__selected_proteinSequenceVersionId = new Set();
        }
        //  Copy existing selections to new selections
        for ( const selection of this._existingSelections__selected_proteinSequenceVersionId ) {
            this._newSelections__selected_proteinSequenceVersionId.add( selection );
        }

        this._proteinListDisplay_DataTable_RootTableObject = _create_ProteinList_DataTableObjects({
            proteinData: proteinData_Root,
            existingSelections__selected_proteinSequenceVersionId: this._existingSelections__selected_proteinSequenceVersionId,
            newSelections__selected_proteinSequenceVersionId: this._newSelections__selected_proteinSequenceVersionId,
            alreadySelectedProtein_TooltipText: this._alreadySelectedProtein_TooltipText,
            callback_GetProteinTooltipContents: callback_GetProteinTooltipContents,
            proteinRowClicked_Callback: this._proteinRow_Clicked_BindThis
        });
    }

    /**
     *
     */
    private _save_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            if ( ! this._userSelections_Changed ) {
                //  Nothing changed so just cancel
                this.props.callbackOn_Cancel_Close_Clicked();
            }

            const selected_proteinSequenceVersionId = new Set<number>();

            for ( const proteinSequenceVersionId of this._newSelections__selected_proteinSequenceVersionId ) {
                selected_proteinSequenceVersionId.add(proteinSequenceVersionId);
            }

            const new_userSelections = new ProteinSelection_Generic__UserSelectionData_Root();
            new_userSelections.selected_proteinSequenceVersionId = selected_proteinSequenceVersionId;

            const params = new ProteinSelection_Generic__UserInputOverlay_Save_CallbackFunction_Params();
            params.new_userSelections = new_userSelections;

            this.props.callbackOn_Save_Clicked( params );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    /**
     *
     */
    private _proteinRow_Clicked( params: ProteinRowClicked_Callback_Params ) {

        const proteinSequenceVersionId = params.proteinSequenceVersionId;

        if ( this._newSelections__selected_proteinSequenceVersionId.has( proteinSequenceVersionId ) ) {
            this._newSelections__selected_proteinSequenceVersionId.delete( proteinSequenceVersionId )
        } else {
            this._newSelections__selected_proteinSequenceVersionId.add( proteinSequenceVersionId );
        }
        this._userSelections_Changed = true;

        this._proteinListDisplay_DataTable_RootTableObject = _create_ProteinList_DataTableObjects({
            proteinData: this._proteinData_Root,
            existingSelections__selected_proteinSequenceVersionId: this._existingSelections__selected_proteinSequenceVersionId,
            newSelections__selected_proteinSequenceVersionId: this._newSelections__selected_proteinSequenceVersionId,
            alreadySelectedProtein_TooltipText: this._alreadySelectedProtein_TooltipText,
            callback_GetProteinTooltipContents: this.props.callback_GetProteinTooltipContents,
            proteinRowClicked_Callback: this._proteinRow_Clicked_BindThis
        });

        this.setState({ objectForceRerender: {} });
    }

    /**
     *
     */
    render() {

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false } >

                { ! this._proteinListDisplay_DataTable_RootTableObject ? (
                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { marginBottom: 12 } }
                        // style={ { padding : 6 } }
                    >
                        Loading Data...
                    </div>
                ) : (
                    <React.Fragment>

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginBottom: 12 } }
                            // style={ { padding : 6 } }
                        >
                            <div style={ { marginBottom: 10 } }>
                                <button
                                    onClick={ this._save_Button_Clicked_BindThis }
                                >
                                    Save Changes
                                </button>
                                <span> </span>
                                <button
                                    onClick={ this.props.callbackOn_Cancel_Close_Clicked }
                                >
                                    Cancel
                                </button>
                            </div>
                            <div>
                                No changes are saved until "Save Changes" is clicked.
                            </div>

                            <div className="standard-border-color-dark"
                                 style={ { marginTop: 7, marginBottom: 8, width: "100%", borderBottomStyle: "solid", borderBottomWidth: 1 } }
                            ></div>

                            { ( this._alreadySelectedProtein_TooltipText ) ? (
                                <div >
                                    { this._alreadySelectedProtein_TooltipText }
                                </div>
                            ) : null }

                        </div>

                        <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                             style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                        >
                            {/*  Main Body:  Scrollable Div  */}

                            <DataTable_TableRoot
                                tableObject={ this._proteinListDisplay_DataTable_RootTableObject }
                                resortTableOnUpdate={ true }
                            />
                        </div>

                    </React.Fragment>
                )}

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }


}


///////////////
///////////////


interface ProteinRowClicked_Callback_Params {

    proteinSequenceVersionId: number
}

type ProteinRowClicked_Callback = (params: ProteinRowClicked_Callback_Params) => void


/**
 *
 */
const _create_ProteinList_DataTableObjects = function(
    {
        proteinData,
        existingSelections__selected_proteinSequenceVersionId,
        newSelections__selected_proteinSequenceVersionId,
        alreadySelectedProtein_TooltipText,
        callback_GetProteinTooltipContents,

        proteinRowClicked_Callback

    } : {
        proteinData: ProteinSelection_Generic__ProteinData_Root
        existingSelections__selected_proteinSequenceVersionId: Set<number>
        newSelections__selected_proteinSequenceVersionId: Set<number>
        alreadySelectedProtein_TooltipText: string
        callback_GetProteinTooltipContents: ProteinSelection_Generic__UserInputOverlay_GetProteinTooltipContents_CallbackFunction
        proteinRowClicked_Callback: ProteinRowClicked_Callback

    }) : DataTable_RootTableObject {

    //  Columns

    const dataTable_Columns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    const checkbox_Selected_Width = 50 // width of "Selected" in first column

    const nameDesc_ColumnWidth = (

        (
            _Overlay_Width //  Overlay Width

            - 57 //  width when scrollable div

            - checkbox_Selected_Width // width of "Selected" in first column

            - ( 48 )  // Horizontal <table> padding for the 3 columns
        )
        / 2   // half for Name and half for Description
    );

    {
        {  // Checkbox for selection or "Selected"
            const displayName = "";

            const dataTable_Column = new DataTable_Column({
                id: "checkbox_or_selected", // Used for tracking sort order. Keep short
                displayName,

                width: checkbox_Selected_Width,
                sortable: false
            });
            dataTable_Columns.push(dataTable_Column);

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
        {
            const displayName = "Protein Name";

            const dataTable_Column = new DataTable_Column({
                id: "name", // Used for tracking sort order. Keep short
                displayName,
                width: nameDesc_ColumnWidth,
                sortable: true
            });
            dataTable_Columns.push(dataTable_Column);

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
        {
            const displayName = "Protein Description";

            const dataTable_Column = new DataTable_Column({
                id: "desc", // Used for tracking sort order. Keep short
                displayName,
                width: nameDesc_ColumnWidth,
                sortable: true,
            });
            dataTable_Columns.push(dataTable_Column);

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
    }

    //  Data Rows

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        for (const protein of proteinData.proteins) {

            const columnEntries: DataTable_DataRow_ColumnEntry[] = [];
            const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

            const is_Existing_Selected = existingSelections__selected_proteinSequenceVersionId.has( protein.proteinSequenceVersionId );
            const is_New_Selected = newSelections__selected_proteinSequenceVersionId.has( protein.proteinSequenceVersionId );

            // Use on all cells on row
            let tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough = null;
            if ( callback_GetProteinTooltipContents ) {
                tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough = (params : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params)
                    : JSX.Element => {

                    return callback_GetProteinTooltipContents({ proteinSequenceVersionId: protein.proteinSequenceVersionId });
                }
            }

            {
                { // Selection Checkbox

                    const textLabel : string = "";

                    let asteriskSpanTitle: string = null;
                    if ( ! callback_GetProteinTooltipContents ) {
                        asteriskSpanTitle = alreadySelectedProtein_TooltipText; // Ignore alreadySelectedProtein_TooltipText if callback_GetProteinTooltipContents is set
                    }

                    const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                        ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                            return (
                                <React.Fragment>
                                    <input
                                        type="checkbox"
                                        checked={ is_New_Selected }
                                        onChange={ event => { } }  // empty onChange since will handle click at row level
                                    />
                                    { ( is_Existing_Selected ) ? (
                                        <React.Fragment>
                                            <span> </span>
                                            <span
                                                title={ asteriskSpanTitle }
                                            >*</span>
                                        </React.Fragment>
                                    ) : null }
                                </React.Fragment>
                            )
                        }

                    let tooltipText: string = null;

                    const valueDisplay = textLabel;
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
                        tooltipText,
                        tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
                    })
                    columnEntries.push(columnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
                {  //  Protein Name
                    const valueDisplay = protein.proteinName;
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: valueDisplay,
                        tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
                    })
                    columnEntries.push(columnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
                {  //  Protein Description
                    let valueDisplay = protein.proteinDescription;
                    if ( ! valueDisplay ) {
                        valueDisplay = "";  // make empty string if null or undefined
                    }
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: valueDisplay,
                        tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
                    })
                    columnEntries.push(columnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
            }

            let highlightRowWithBackgroundColor = is_New_Selected;

            let tableRowClickHandler_Callback_NoDataPassThrough : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough = null;

            tableRowClickHandler_Callback_NoDataPassThrough =
                ( callbackParams : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params ) : void => {

                    proteinRowClicked_Callback({ proteinSequenceVersionId: protein.proteinSequenceVersionId });
                };

            const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : protein.proteinSequenceVersionId,
                sortOrder_OnEquals : protein.proteinSequenceVersionId,
                columnEntries,
                dataTable_DataRowEntry_DownloadTable,
                highlightRowWithBackgroundColor,
                tableRowClickHandler_Callback_NoDataPassThrough
            })

            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        columns_tableDownload : dataTable_Column_DownloadTable_Entries,
        dataTable_DataRowEntries
    });

    const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : "Protein Selection",
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}
