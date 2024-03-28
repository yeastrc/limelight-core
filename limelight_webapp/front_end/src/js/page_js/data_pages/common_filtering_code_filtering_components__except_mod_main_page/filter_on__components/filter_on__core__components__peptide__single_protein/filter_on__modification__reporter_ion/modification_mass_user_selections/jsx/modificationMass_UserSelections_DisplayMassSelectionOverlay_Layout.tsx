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
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Create} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item_Selection_Overlay";
import {get_Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item__TableEntryContainer";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass,
    ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ModMasses_PSM_Counts_PerMass";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {modificationMass_CommonRounding_ReturnNumber_Function} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

//  Main Dialog

const _DIALOG_TITLE = 'Change Modification Selection';
const _Overlay_Width_Min = 800;
const _Overlay_Width_Max = 800;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;


/**
 *
 */
export enum ModificationMass_UserSelections_DisplayMassSelectionOverlay__Variable_Or_Open_Mods {
    VARIABLE = "VARIABLE",
    OPEN = "OPEN"
}

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
export const get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout = function(
    {
        variable_Or_Open_Mods,
        proteinName,
        proteinSequenceVersionId,  //  Not always populated
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber,
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        callbackOn_Cancel_Close_Clicked,
        callback_updateSelectedMods
    } : {
        variable_Or_Open_Mods: ModificationMass_UserSelections_DisplayMassSelectionOverlay__Variable_Or_Open_Mods
        proteinName : string
        proteinSequenceVersionId : number  //  Not always populated
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_updateSelectedMods : ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods

    }) : JSX.Element {

    return (
        <ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component
            variable_Or_Open_Mods={ variable_Or_Open_Mods }
            proteinName={ proteinName }
            proteinSequenceVersionId={ proteinSequenceVersionId }
            projectSearchIds={ projectSearchIds }
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
            modificationMass_CommonRounding_ReturnNumber={ modificationMass_CommonRounding_ReturnNumber }
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
    variable_Or_Open_Mods: ModificationMass_UserSelections_DisplayMassSelectionOverlay__Variable_Or_Open_Mods
    proteinName : string
    proteinSequenceVersionId : number  //  Not populated on Peptide page
    projectSearchIds : Array<number>
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    selectedModificationMasses_MapClone : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry>
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_updateSelectedMods : ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods
}

/**
 *
 */
interface ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_State {
    massDisplay_DataTable_RootTableObject? : DataTable_RootTableObject
    loadingData?: boolean
}

/**
 *
 */
class ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component extends React.Component< ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_Props, ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_State > {

    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);

    private _modUniqueMassesWithTheirPsmCountsArray: ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result

    private _modificationMasses_Selected_InProgress : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry>

    /**
     *
     */
    constructor(props: ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component_Props) {
        super(props);

        this._modificationMasses_Selected_InProgress = props.selectedModificationMasses_MapClone

        this.state = { loadingData: true }
    }

    /**
     *
     */
    componentDidMount(): void {
        try {

            if (this.props.variable_Or_Open_Mods === ModificationMass_UserSelections_DisplayMassSelectionOverlay__Variable_Or_Open_Mods.OPEN) {

                this._show_OpenMods();

            } else if (this.props.variable_Or_Open_Mods === ModificationMass_UserSelections_DisplayMassSelectionOverlay__Variable_Or_Open_Mods.VARIABLE) {

                this._show_VariableMods();

            } else {
                const msg = "this.props.variable_Or_Open_Mods is not Open or Variable. value is: " + this.props.variable_Or_Open_Mods;
                console.warn(msg)
                throw Error(msg)
            }

        } catch( e ) {
            console.warn("Exception caught in componentDidMount inside setTimeout");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _show_OpenMods() : void {

        const createModsAndPsmCountsList_OpenModifications_Result =
            ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass.createModsAndPsmCountsList_OpenModifications({
                proteinSequenceVersionId: this.props.proteinSequenceVersionId,  //  Not populated on Peptide page
                projectSearchIds: this.props.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                modificationMass_CommonRounding_ReturnNumber: this.props.modificationMass_CommonRounding_ReturnNumber
            });

        if ( createModsAndPsmCountsList_OpenModifications_Result.data ) {

            const modUniqueMassesWithTheirPsmCountsArray = createModsAndPsmCountsList_OpenModifications_Result.data

            this._modUniqueMassesWithTheirPsmCountsArray = modUniqueMassesWithTheirPsmCountsArray;  //  Save off for redraw table when user selects table row

            const massDisplay_DataTable_RootTableObject : DataTable_RootTableObject = this._create_DataTableObjects({
                modUniqueMassesWithTheirPsmCountsArray : createModsAndPsmCountsList_OpenModifications_Result.data
            })
            this.setState({ massDisplay_DataTable_RootTableObject, loadingData: false });

        } else if ( createModsAndPsmCountsList_OpenModifications_Result.promise ) {

            createModsAndPsmCountsList_OpenModifications_Result.promise.catch(reason => {
                console.warn("createModsAndPsmCountsList_OpenModifications_Result.promise.catch:reason: ", reason)
                throw Error("createModsAndPsmCountsList_OpenModifications_Result.promise.catch:reason: " + reason)
            })
            createModsAndPsmCountsList_OpenModifications_Result.promise.then(modUniqueMassesWithTheirPsmCountsArray => {
                try {
                    this._modUniqueMassesWithTheirPsmCountsArray = modUniqueMassesWithTheirPsmCountsArray;  //  Save off for redraw table when user selects table row

                    const massDisplay_DataTable_RootTableObject : DataTable_RootTableObject = this._create_DataTableObjects({
                        modUniqueMassesWithTheirPsmCountsArray : modUniqueMassesWithTheirPsmCountsArray
                    })
                    this.setState({ massDisplay_DataTable_RootTableObject, loadingData: false });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } else {
            throw Error("createModsAndPsmCountsList_OpenModifications_Result no 'data' or 'promise'")
        }
    }

    /**
     *
     */
    private _show_VariableMods() : void {

        const createModsAndPsmCountsList_OpenModifications_Result =
            ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass.createModsAndPsmCountsList_VariableModifications({
                proteinSequenceVersionId: this.props.proteinSequenceVersionId,  //  Not populated on Peptide page
                projectSearchIds: this.props.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                modificationMass_CommonRounding_ReturnNumber: this.props.modificationMass_CommonRounding_ReturnNumber
            });

        if ( createModsAndPsmCountsList_OpenModifications_Result.data ) {

            const modUniqueMassesWithTheirPsmCountsArray = createModsAndPsmCountsList_OpenModifications_Result.data

            this._modUniqueMassesWithTheirPsmCountsArray = modUniqueMassesWithTheirPsmCountsArray;  //  Save off for redraw table when user selects table row

            const massDisplay_DataTable_RootTableObject : DataTable_RootTableObject = this._create_DataTableObjects({
                modUniqueMassesWithTheirPsmCountsArray : createModsAndPsmCountsList_OpenModifications_Result.data
            })
            this.setState({ massDisplay_DataTable_RootTableObject, loadingData: false });

        } else if ( createModsAndPsmCountsList_OpenModifications_Result.promise ) {

            createModsAndPsmCountsList_OpenModifications_Result.promise.catch(reason => {
                console.warn("createModsAndPsmCountsList_OpenModifications_Result.promise.catch:reason: ", reason)
                throw Error("createModsAndPsmCountsList_OpenModifications_Result.promise.catch:reason: " + reason)
            })
            createModsAndPsmCountsList_OpenModifications_Result.promise.then(modUniqueMassesWithTheirPsmCountsArray => {
                try {
                    this._modUniqueMassesWithTheirPsmCountsArray = modUniqueMassesWithTheirPsmCountsArray;  //  Save off for redraw table when user selects table row

                    const massDisplay_DataTable_RootTableObject : DataTable_RootTableObject = this._create_DataTableObjects({
                        modUniqueMassesWithTheirPsmCountsArray : modUniqueMassesWithTheirPsmCountsArray
                    })
                    this.setState({ massDisplay_DataTable_RootTableObject, loadingData: false });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } else {
            throw Error("createModsAndPsmCountsList_OpenModifications_Result no 'data' or 'promise'")
        }
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
            modUniqueMassesWithTheirPsmCountsArray : this._modUniqueMassesWithTheirPsmCountsArray
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

                { this.state.loadingData ? (

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    >
                        <div style={ { marginBottom: 12, fontWeight: "bold", fontSize: 24, textAlign: "center" } }>
                            LOADING DATA
                        </div>
                        <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                            <Spinner_Limelight_Component/>
                        </div>
                    </div>

                ) : (
                    <React.Fragment>

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

                    </React.Fragment>
                )}

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}


