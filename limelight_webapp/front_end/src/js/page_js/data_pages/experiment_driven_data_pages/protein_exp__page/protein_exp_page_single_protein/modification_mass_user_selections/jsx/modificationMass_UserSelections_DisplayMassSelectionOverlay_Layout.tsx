/**
 * modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout.tsx
 *
 * Modification Mass Selections Overlay - For selecting when there is a large number of Modification masses to select from
 *
 *
 */

import React from 'react'
import { ModalOverlay_Limelight_Component } from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001/modalOverlay_WithTitlebar_React_v001";
import {
    DataTable_Column,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry,
    DataTable_RootTableDataObject, DataTable_RootTableObject,
    DataTable_TableOptions, DataTable_TableOptions_dataRowClickHandler_RequestParm
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Create} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item_Selection_Overlay";
import {
    Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer,
    Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_CellMgmt_Data
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item__TableEntryContainer";

/**
 *
 */
export class ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods_Params {
    updated_selectedModificationMasses_Map : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry>
}

// Internal class
/**
 * Table tableRowClickHandlerParameter value
 */
class TableRowClickHandlerParameter_Class {
    mass : number

    constructor({ mass } : { mass : number }) {
        this.mass = mass
    }
}

/**
 *
 */
export const get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout = function(
    {
        height, width, title, proteinName,
        modUniqueMassesWithTheirPsmCountsArray,
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        callbackOn_Cancel_Close_Clicked,
        callback_updateSelectedMods
    } : {
        height : number
        width : number
        title : string
        proteinName : string
        modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> //  []; // {mass, psmCount}
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_updateSelectedMods : ( params : ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods_Params ) => void

    }) : JSX.Element {

    return (
        <ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component
            width={ width }
            height={ height }
            title={ title }
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
    height : number
    width : number
    title : string
    proteinName : string
    modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> //  []; // {mass, psmCount}
    selectedModificationMasses_MapClone : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry>
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_updateSelectedMods : ( params : ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods_Params ) => void
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
    private _dataRowClickHandler_BindThis = this._dataRowClickHandler.bind(this);

    private _above_mod_list_block_Ref : React.RefObject<HTMLDivElement>
    private _mods_selection_dialog_list_bounding_box_Ref : React.RefObject<HTMLDivElement>

    private _modificationMasses_Selected_InProgress : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry>

    /**
     *
     */
    constructor(props: ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_Props) {
        super(props);

        this._above_mod_list_block_Ref = React.createRef<HTMLDivElement>();
        this._mods_selection_dialog_list_bounding_box_Ref = React.createRef<HTMLDivElement>();

        this._modificationMasses_Selected_InProgress = props.selectedModificationMasses_MapClone

        const massDisplay_DataTable_RootTableObject : DataTable_RootTableObject = this._create_DataTableObjects({
            modUniqueMassesWithTheirPsmCountsArray : props.modUniqueMassesWithTheirPsmCountsArray
        })

        this.state = { massDisplay_DataTable_RootTableObject };
    }

    /**
     *
     */
    componentDidMount(): void {

        //  Adjust scrollable div max-height

        const aboveListBlockHeight= this._above_mod_list_block_Ref.current.getBoundingClientRect().height

        const scrollableDivMaxHeight = this.props.height - 125 - aboveListBlockHeight;
        const scrollableDivMaxHeightPxString = scrollableDivMaxHeight + "px";

        this._mods_selection_dialog_list_bounding_box_Ref.current.style.maxHeight = scrollableDivMaxHeightPxString;
    }

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
    private _dataRowClickHandler(param: DataTable_TableOptions_dataRowClickHandler_RequestParm): void {

        const rowClicked_Left = param.rowDOM_Rect.left
        const rowClicked_Bottom = param.rowDOM_Rect.bottom

        const tableRowClickHandlerParameter : TableRowClickHandlerParameter_Class = param.tableRowClickHandlerParameter as TableRowClickHandlerParameter_Class

        if ( ! ( tableRowClickHandlerParameter instanceof TableRowClickHandlerParameter_Class ) ) {
            const msg = "( ! ( tableRowClickHandlerParameter instanceof TableRowClickHandlerParameter_Class ) ) in _dataRowClickHandler in get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout"
            console.warn( msg )
            throw Error( msg )
        }

        const windowScroll_X = window.scrollX;
        const windowScroll_Y = window.scrollY;

        const position_Left = Math.floor( rowClicked_Left ) + windowScroll_X - 1 ; // -1 to shift left to align Left border with left border of selected items
        const position_Top = Math.floor( rowClicked_Bottom ) + windowScroll_Y

        let current_selection_SelectionType : SingleProtein_Filter_SelectionType = undefined

        const mass = tableRowClickHandlerParameter.mass;

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

        modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}>

    }) : DataTable_RootTableObject {

        // modUniqueMassesWithTheirPsmCountsArray //  []; // {mass, psmCount}

        //  Columns

        const dataTable_Columns : Array<DataTable_Column> = [];

        {
            {
                const dataTable_Column = new DataTable_Column({
                    id: "mass", // Used for tracking sort order. Keep short
                    displayName: "Modification Mass",
                    width: 160,
                    sortable: true,
                    style_override_DataRowCell_React: {
                        fontSize: 12
                    },
                    cellMgmt_ExternalReactComponent : { reactComponent : Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer }
                });
                dataTable_Columns.push(dataTable_Column);
            }
            {
                const style_override_DataRowCell_React : React.CSSProperties = {
                    paddingTop: 3,
                        fontSize: 12
                }
                const dataTable_Column = new DataTable_Column({
                    id: "psmCount", // Used for tracking sort order. Keep short
                    displayName: "PSMs",
                    width: 75,
                    sortable: true,
                    style_override_DataRowCell_React
                });
                dataTable_Columns.push(dataTable_Column);
            }
        }

        //  Data Rows

        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

        {
            for (const modUniqueMassesWithTheirPsmCountsEntry of modUniqueMassesWithTheirPsmCountsArray) {


                const columnEntries: DataTable_DataRow_ColumnEntry[] = [];
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

                        const cellMgmt_ExternalReactComponent_Data = new Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_CellMgmt_Data({
                            textLabel,
                            current_selection_SelectionType
                        })

                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            // valueDisplay: modUniqueMassesWithTheirPsmCountsEntry.mass.toString(),
                            valueSort: modUniqueMassesWithTheirPsmCountsEntry.mass,
                            cellMgmt_ExternalReactComponent_Data
                        })
                        columnEntries.push(columnEntry);
                    }

                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay: modUniqueMassesWithTheirPsmCountsEntry.psmCount.toLocaleString(),
                        valueSort: modUniqueMassesWithTheirPsmCountsEntry.psmCount
                    })
                    columnEntries.push(columnEntry);
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

                const tableRowClickHandlerParameter = new TableRowClickHandlerParameter_Class({
                    mass : modUniqueMassesWithTheirPsmCountsEntry.mass
                })

                const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId : modUniqueMassesWithTheirPsmCountsEntry.mass,
                    sortOrder_OnEquals : modUniqueMassesWithTheirPsmCountsEntry.mass,
                    columnEntries,
                    highlightRowWithBorder_peptideFilter_NOT_borderColor,
                    highlightRowWithBorderSolid,
                    highlightRowWithBorderDash,
                    tableRowClickHandlerParameter
                })

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );
            }
        }

        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns : dataTable_Columns,
            dataTable_DataRowEntries,
            highlightingOneOrMoreRowsWithBorder : true
        });

        const tableOptions = new DataTable_TableOptions({
            dataRowClickHandler : this._dataRowClickHandler_BindThis
        });

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
            <ModalOverlay_Limelight_Component
                width={ this.props.width }
                height={ this.props.height }
                title={ this.props.title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>

                <div >

                    <div className=" modal-overlay-body-standard-padding ">

                        <div ref={ this._above_mod_list_block_Ref }>   {/*className=" selector_mods_selection_dialog_above_mod_list_block "*/}
                            {/* may need to measure height and adjust max-height of selector_mods_selection_dialog_list_bounding_box */}

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
                            {/* max-height: value tied to height of total modal overlay, which is specified in JS code */}
                            {/* width: value tied to width of list entry */}

                        <div ref={ this._mods_selection_dialog_list_bounding_box_Ref }
                            style={ {  maxHeight : 300, overflowY: "auto", width: mods_selection_dialog_list_bounding_box_Width, overflowX: "hidden" } } // max-height updated after mount
                            // className=" mod-mass-select-dialog-bounding-box  "
                        >

                            <div  >

                                <DataTable_TableRoot
                                    tableObject={ this.state.massDisplay_DataTable_RootTableObject }
                                    resortTableOnUpdate={ true }
                                />

                            </div>
                        </div>

                        <div style={ { marginTop: 15 } }>
                            <input type="button" value="Update" style={ { marginRight: 5 } } onClick={ this._updateButtonClicked_BindThis } />

                            <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                        </div>
                    </div>
                </div>
            </ModalOverlay_Limelight_Component>
        );
    }
}

