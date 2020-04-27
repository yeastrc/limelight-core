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
import {psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__psm_list_for_reported_peptide_container_component/js/psmList_Wrapper_ReturnChildReactComponent";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";

/**
 *
 */
export class ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods_Params {
    updated_selectedModificationMasses : Set<number>
}

/**
 *
 */
export const get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout = function({

    height, width, title, proteinName,
    modUniqueMassesWithTheirPsmCountsArray,
    modificationMasses_Selected,
    callbackOn_Cancel_Close_Clicked,
    callback_updateSelectedMods
} : {
    height : number
    width : number
    title : string
    proteinName : string
    modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> //  []; // {mass, psmCount}
    modificationMasses_Selected : Set<number>
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
            modificationMasses_Selected={ modificationMasses_Selected }
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
    modificationMasses_Selected : Set<number>
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

    private _modificationMasses_Selected_InProgress : Set<number>

    /**
     *
     */
    constructor(props: ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_Props) {
        super(props);

        this._above_mod_list_block_Ref = React.createRef<HTMLDivElement>();
        this._mods_selection_dialog_list_bounding_box_Ref = React.createRef<HTMLDivElement>();

        this._modificationMasses_Selected_InProgress = new Set( props.modificationMasses_Selected )

        const massDisplay_DataTable_RootTableObject : DataTable_RootTableObject = this._create_DataTableObjects({ modUniqueMassesWithTheirPsmCountsArray : props.modUniqueMassesWithTheirPsmCountsArray })

        this.state = { massDisplay_DataTable_RootTableObject };
    }

    componentDidMount(): void {

        //  Adjust scrollable div max-height

        const aboveListBlockHeight= this._above_mod_list_block_Ref.current.getBoundingClientRect().height

        const scrollableDivMaxHeight = this.props.height - 125 - aboveListBlockHeight;
        const scrollableDivMaxHeightPxString = scrollableDivMaxHeight + "px";

        this._mods_selection_dialog_list_bounding_box_Ref.current.style.maxHeight = scrollableDivMaxHeightPxString;
    }

    private _updateButtonClicked(  ) {

        this.props.callback_updateSelectedMods({ updated_selectedModificationMasses : this._modificationMasses_Selected_InProgress })
    }

    private _dataRowClickHandler(param: DataTable_TableOptions_dataRowClickHandler_RequestParm): void {

        const mass = param.tableRowClickHandlerParameter.mass;

        if ( ! this._modificationMasses_Selected_InProgress.delete( mass ) ) {
            this._modificationMasses_Selected_InProgress.add( mass )
        }

        const massDisplay_DataTable_RootTableObject : DataTable_RootTableObject = this._create_DataTableObjects({ modUniqueMassesWithTheirPsmCountsArray : this.props.modUniqueMassesWithTheirPsmCountsArray })

        this.setState({ massDisplay_DataTable_RootTableObject })
    }

    private _create_DataTableObjects({ modUniqueMassesWithTheirPsmCountsArray }) : DataTable_RootTableObject {

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
                        // display: "inline-block",
                        // whiteSpace: "nowrap",
                        // overflowX: "auto",
                        fontSize: 12
                    },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push(dataTable_Column);
            }
            {
                const dataTable_Column = new DataTable_Column({
                    id: "psmCount", // Used for tracking sort order. Keep short
                    displayName: "PSMs",
                    width: 75,
                    sortable: true,
                    style_override_DataRowCell_React: {
                        // display: "inline-block",
                        // whiteSpace: "nowrap",
                        // overflowX: "auto",
                        // fontSize: 12
                    },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push(dataTable_Column);
            }
        }

        // modUniqueMassesWithTheirPsmCountsArray //  []; // {mass, psmCount}

        //  Data Rows

        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

        {
            for (const modUniqueMassesWithTheirPsmCountsEntry of modUniqueMassesWithTheirPsmCountsArray) {


                const columnEntries: DataTable_DataRow_ColumnEntry[] = [];
                {
                    { // reportedPeptideSequence
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay: modUniqueMassesWithTheirPsmCountsEntry.mass,
                            valueSort: modUniqueMassesWithTheirPsmCountsEntry.mass
                        })
                        columnEntries.push(columnEntry);
                    }

                    { // numPsms
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay: modUniqueMassesWithTheirPsmCountsEntry.psmCount.toLocaleString(),
                            valueSort: modUniqueMassesWithTheirPsmCountsEntry.psmCount
                        })
                        columnEntries.push(columnEntry);
                    }
                }

                let highlightRow = false;

                if ( this._modificationMasses_Selected_InProgress.has( modUniqueMassesWithTheirPsmCountsEntry.mass ) ) {
                    highlightRow = true;
                }

                const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId : modUniqueMassesWithTheirPsmCountsEntry.mass,
                    sortOrder_OnEquals : modUniqueMassesWithTheirPsmCountsEntry.mass,
                    columnEntries,
                    highlightRow,
                    tableRowClickHandlerParameter : { mass : modUniqueMassesWithTheirPsmCountsEntry.mass }
                    // dataRow_GetChildTable_ReturnReactComponent_Parameter : psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
                })

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );
            }
        }

        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns : dataTable_Columns,
            dataTable_DataRowEntries
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

    render(): React.ReactNode {

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

                            <div style={ { fontWeight: "bold", marginBottom: 10 } }>
                                Protein Name (from FASTA): { this.props.proteinName }
                            </div>

                            <div style={ { fontWeight: "bold", marginBottom: 10 } }>
                                Select Modification Masses to filter on.
                                (Click to select/deselect)
                            </div>
                            </div>
                                {/* max-height: value tied to height of total modal overlay, which is specified in JS code */}
                                {/* width: value tied to width of list entry */}

                            <div ref={ this._mods_selection_dialog_list_bounding_box_Ref }
                                style={ {  maxHeight : 300, overflowY: "auto", width: 270, overflowX: "hidden" } } // max-height updated after mount
                                className=" mod-mass-select-dialog-bounding-box  ">

                                <div  >

                                    <DataTable_TableRoot
                                        tableObject={ this.state.massDisplay_DataTable_RootTableObject }
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

