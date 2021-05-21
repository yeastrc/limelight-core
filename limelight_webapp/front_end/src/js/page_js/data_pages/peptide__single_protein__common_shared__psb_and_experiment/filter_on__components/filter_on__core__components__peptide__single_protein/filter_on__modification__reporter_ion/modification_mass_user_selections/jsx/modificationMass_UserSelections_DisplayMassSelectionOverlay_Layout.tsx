/**
 * modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout.tsx
 *
 * Modification Mass Selections Overlay - For selecting when there is a large number of Modification masses to select from
 *
 *
 */

import React from 'react'
import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Create} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item_Selection_Overlay";
import {
    get_Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item__TableEntryContainer";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ModMasses_PSM_Counts_PerMass";

//  Main Dialog

const _DIALOG_TITLE = 'Change Modification Selection';
const _Overlay_Width_Min = 800;
const _Overlay_Width_Max = 800;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;

/**
 *
 */
export class ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods_Params {
    updated_selectedModificationMasses_Map : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry>
}

export type ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods =
    ( params : ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods_Params ) => void

/**
 *
 */
export const get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage = function (
    {
        callbackOn_Cancel_Close_Clicked
    } : {
        callbackOn_Cancel_Close_Clicked? : () => void;

    }) : JSX.Element {

    return (
        <ModalOverlay_Limelight_Component_v001_B_FlexBox
            widthMinimum={ _Overlay_Width_Min }
            widthMaximum={ _Overlay_Width_Max }
            heightMinimum={ _Overlay_Height_Min }
            heightMaximum={ _Overlay_Height_Max }
            title={ _DIALOG_TITLE }
            callbackOnClicked_Close={ callbackOn_Cancel_Close_Clicked }
            close_OnBackgroundClick={ false }
            titleBar_LeaveSpaceFor_CloseX={ true }
        >


            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
            >
                <div style={ { marginBottom: 12, fontWeight: "bold", fontSize: 24, textAlign: "center" } }>
                    LOADING DATA
                </div>
                <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                    <Spinner_Limelight_Component/>
                </div>
            </div>

        </ModalOverlay_Limelight_Component_v001_B_FlexBox>
    );
}

/**
 *
 */
export const get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout = function(
    {
        proteinName,
        modUniqueMassesWithTheirPsmCountsArray,
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        callbackOn_Cancel_Close_Clicked,
        callback_updateSelectedMods
    } : {
        proteinName : string
        modUniqueMassesWithTheirPsmCountsArray : ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_updateSelectedMods : ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods

    }) : JSX.Element {

    return (
        <ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component
            proteinName={ proteinName }
            modUniqueMassesWithTheirPsmCountsArray={ modUniqueMassesWithTheirPsmCountsArray }
            selectedModificationMasses_MapClone={ modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.get_ModificationsSelected__ExcludingNoModification_AsMapClone() }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
            callback_updateSelectedMods={ callback_updateSelectedMods }
        />
    )
}

/**
 *
 */
interface ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_Props {
    proteinName : string
    modUniqueMassesWithTheirPsmCountsArray : ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result
    selectedModificationMasses_MapClone : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry>
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_updateSelectedMods : ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods
}

/**
 *
 */
interface ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_State {
    massDisplay_DataTable_RootTableObject? : DataTable_RootTableObject
}

/**
 *
 */
class ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component extends React.Component< ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_Props, ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_State > {

    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);

    private _modificationMasses_Selected_InProgress : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry>

    /**
     *
     */
    constructor(props: ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_Props) {
        super(props);

        this._modificationMasses_Selected_InProgress = props.selectedModificationMasses_MapClone

        const massDisplay_DataTable_RootTableObject : DataTable_RootTableObject = this._create_DataTableObjects({
            modUniqueMassesWithTheirPsmCountsArray : props.modUniqueMassesWithTheirPsmCountsArray
        })

        this.state = { massDisplay_DataTable_RootTableObject };
    }

    /**
     *
     */
    // componentDidMount(): void {
    //
    // }

    /**
     *
     */
    private _updateButtonClicked(  ) {

        this.props.callback_updateSelectedMods({
            updated_selectedModificationMasses_Map : this._modificationMasses_Selected_InProgress
        })
    }

    /**
     *
     */
    private _dataRowClickHandler({ mass, callbackParams } : { mass: number, callbackParams : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params }): void {

        const rowClicked_Left = callbackParams.rowDOM_Rect.left
        const rowClicked_Bottom = callbackParams.rowDOM_Rect.bottom

        const windowScroll_X = window.scrollX;
        const windowScroll_Y = window.scrollY;

        const position_Left = Math.floor( rowClicked_Left ) + windowScroll_X - 1 ; // -1 to shift left to align Left border with left border of selected items
        const position_Top = Math.floor( rowClicked_Bottom ) + windowScroll_Y

        let current_selection_SelectionType : SingleProtein_Filter_SelectionType = undefined

        {
            const selectionEntry = this._modificationMasses_Selected_InProgress.get(mass);
            if (selectionEntry) {
                current_selection_SelectionType = selectionEntry.selectionType
            }
        }

        const any_Selected_Callback = () => {
            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType : SingleProtein_Filter_SelectionType.ANY })
            this._modificationMasses_Selected_InProgress.set( mass, newEntry );

            this._updateTable_ForChangedSelection()
        }

        const all_Selected_Callback = () => {
            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType : SingleProtein_Filter_SelectionType.ALL })
            this._modificationMasses_Selected_InProgress.set( mass, newEntry );

            this._updateTable_ForChangedSelection()
        }

        const not_Selected_Callback = () => {
            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType : SingleProtein_Filter_SelectionType.NOT })
            this._modificationMasses_Selected_InProgress.set( mass, newEntry );

            this._updateTable_ForChangedSelection()
        }

        const remove_Selected_Callback = () => {
            this._modificationMasses_Selected_InProgress.delete( mass )

            this._updateTable_ForChangedSelection()
        }

        //  Creates the overlay and inserts it into the DOM, positioned by position_Left, position_Top
        filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Create({  // External Function

            current_selection_SelectionType,
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class : null, // Not Passed in Mod Mass Selection Overlay
            position_Left,
            position_Top,
            any_Selected_Callback,
            all_Selected_Callback,
            not_Selected_Callback,
            remove_Selected_Callback
        })
    }

    /**
     *
     */
    private _updateTable_ForChangedSelection() : void {

        const massDisplay_DataTable_RootTableObject : DataTable_RootTableObject = this._create_DataTableObjects({
            modUniqueMassesWithTheirPsmCountsArray : this.props.modUniqueMassesWithTheirPsmCountsArray
        })

        this.setState({ massDisplay_DataTable_RootTableObject })
    }

    /**
     *
     */
    private _create_DataTableObjects({ modUniqueMassesWithTheirPsmCountsArray } : {

        modUniqueMassesWithTheirPsmCountsArray : ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result

    }) : DataTable_RootTableObject {

        // modUniqueMassesWithTheirPsmCountsArray //  []; // {mass, psmCount}

        //  Columns

        const dataTable_Columns : Array<DataTable_Column> = [];
        const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

        {
            {
                const displayName = "Modification Mass";

                const dataTable_Column = new DataTable_Column({
                    id: "mass", // Used for tracking sort order. Keep short
                    displayName,
                    width: 160,
                    sortable: true
                });
                dataTable_Columns.push(dataTable_Column);

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            {
                const displayName = "PSMs";

                const dataTable_Column = new DataTable_Column({
                    id: "psmCount", // Used for tracking sort order. Keep short
                    displayName,
                    width: 75,
                    sortable: true,
                    style_override_DataRowCell_React: { paddingTop: 3 }
                });
                dataTable_Columns.push(dataTable_Column);

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
        }

        //  Data Rows

        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

        {
            for (const modUniqueMassesWithTheirPsmCountsEntry of modUniqueMassesWithTheirPsmCountsArray.entries) {


                const columnEntries: DataTable_DataRow_ColumnEntry[] = [];
                const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

                {
                    { // mod mass

                        const textLabel : string = modUniqueMassesWithTheirPsmCountsEntry.mass.toString()
                        let current_selection_SelectionType : SingleProtein_Filter_SelectionType = undefined;
                        {
                            const entry : SingleProtein_Filter_PerUniqueIdentifier_Entry = this._modificationMasses_Selected_InProgress.get( modUniqueMassesWithTheirPsmCountsEntry.mass )
                            if ( entry ) {
                                current_selection_SelectionType = entry.selectionType
                            }
                        }

                        const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                            ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                                return get_Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer({ textLabel, current_selection_SelectionType });
                            }

                        const valueDisplay = textLabel;
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            // valueDisplay: modUniqueMassesWithTheirPsmCountsEntry.mass.toString(),
                            valueSort: modUniqueMassesWithTheirPsmCountsEntry.mass,
                            valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
                        })
                        columnEntries.push(columnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                    {
                        const valueDisplay = modUniqueMassesWithTheirPsmCountsEntry.psmCount.toLocaleString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: modUniqueMassesWithTheirPsmCountsEntry.psmCount
                        })
                        columnEntries.push(columnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                }

                let highlightRowWithBorderDash = false
                let highlightRowWithBorderSolid = false
                let highlightRowWithBorder_peptideFilter_NOT_borderColor = false

                {
                    const entry : SingleProtein_Filter_PerUniqueIdentifier_Entry = this._modificationMasses_Selected_InProgress.get( modUniqueMassesWithTheirPsmCountsEntry.mass )
                    if ( entry ) {
                        if ( entry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                            //  OR
                            highlightRowWithBorderDash = true
                        } else if ( entry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                            //  AND
                            highlightRowWithBorderSolid = true
                        } else if ( entry.selectionType === SingleProtein_Filter_SelectionType.NOT ) {
                            //  NOT
                            highlightRowWithBorder_peptideFilter_NOT_borderColor = true
                        } else {
                            const msg = "ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component:_create_DataTableObjects: Unknown value for entry.selectionType : " + entry.selectionType
                            console.warn( msg )
                            throw Error( msg )
                        }
                    }
                }

                const tableRowClickHandler_Callback_NoDataPassThrough =
                    ( callbackParams : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params ) : void => {

                        this._dataRowClickHandler({ mass: modUniqueMassesWithTheirPsmCountsEntry.mass, callbackParams });
                    };

                const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId : modUniqueMassesWithTheirPsmCountsEntry.mass,
                    sortOrder_OnEquals : modUniqueMassesWithTheirPsmCountsEntry.mass,
                    columnEntries,
                    dataTable_DataRowEntry_DownloadTable,
                    highlightRowWithBorder_peptideFilter_NOT_borderColor,
                    highlightRowWithBorderSolid,
                    highlightRowWithBorderDash,
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

        const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: false});

        const dataTable_RootTableObject = new DataTable_RootTableObject({
            dataTableId : "Mod Mass Selection",
            tableOptions,
            tableDataObject : dataTable_RootTableDataObject
        });

        return dataTable_RootTableObject;
    }

    /**
     *
     */
    render(): React.ReactNode {

        let mods_selection_dialog_list_bounding_box_Width = 295;

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _DIALOG_TITLE }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>

                <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     style={ { marginBottom: 12, fontWeight: "bold" } }
                    // style={ { padding : 6 } }
                >

                    { (this.props.proteinName) ? (
                        <div style={ { fontWeight: "bold", marginBottom: 10 } }>
                            Protein Name (from FASTA): { this.props.proteinName }
                        </div>
                    ) : null }

                    <div style={ { fontWeight: "bold", marginBottom: 10 } }>
                        Select Modification Masses to filter on.
                        (Click to select/deselect)
                    </div>
                </div>

                <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     style={ { overflowY: "auto", overflowX: "hidden", width: mods_selection_dialog_list_bounding_box_Width } }
                >
                    <div  >

                        <DataTable_TableRoot
                            tableObject={ this.state.massDisplay_DataTable_RootTableObject }
                            resortTableOnUpdate={ true }
                        />

                    </div>
                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>
                        <input type="button" value="Update" style={ { marginRight: 5 } } onClick={ this._updateButtonClicked_BindThis } />

                        <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                    </div>
                </div>

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}


