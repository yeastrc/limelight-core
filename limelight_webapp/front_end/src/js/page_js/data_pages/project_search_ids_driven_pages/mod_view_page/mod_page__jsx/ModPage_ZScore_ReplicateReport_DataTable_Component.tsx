/**
 * ModPage_ZScore_ReplicateReport_DataTable_Component.tsx
 */


import React from "react";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    DataPageStateManager,
    SearchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    modPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/mod_page__compute__total__psm_id__counts__per__project_search_id__or__sub_search_id__from__mod_view_page__compute_data__for__mod_mass_viz__and__top_level_table__result__root";
import {
    modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root";
import {
    ModPage_ModStatsUtils
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/ModPage_ModStatsUtils";
import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry, DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry, DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn, DataTable_RootTableDataObject,
    DataTable_RootTableObject, DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import { DataTable_TableRoot } from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {
    modPage_GetSearchNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameForProjectSearchId";

//////


/**
 *
 */
interface ModPage_ZScore_ReplicateReport_DataTable_Component_Props {

    forceUpdate_Object: unknown

    group_1_ProjectSearchIds: Array<number>
    group_2_ProjectSearchIds: Array<number>

    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    dataPageStateManager : DataPageStateManager
    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
}

/**
 *
 */
interface ModPage_ZScore_ReplicateReport_DataTable_Component_State {

    forceReRender_Object?: unknown
}

/**
 *
 */
export class ModPage_ZScore_ReplicateReport_DataTable_Component extends React.Component< ModPage_ZScore_ReplicateReport_DataTable_Component_Props, ModPage_ZScore_ReplicateReport_DataTable_Component_State > {

    private _dataTable_RootTableObject: DataTable_RootTableObject

    private _group_1_ProjectSearchIds_PrevRendered: ReadonlySet<number>
    private _group_2_ProjectSearchIds_PrevRendered: ReadonlySet<number>

    private _show_UpdatingMessage = false

    /**
     *
     */
    constructor( props: ModPage_ZScore_ReplicateReport_DataTable_Component_Props ) { try {

        super( props );

        const searchGroups = props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()

        this._group_1_ProjectSearchIds_PrevRendered = searchGroups.group_1_SearchGroup_ProjectSearchIds_Set
        this._group_2_ProjectSearchIds_PrevRendered = searchGroups.group_2_SearchGroup_ProjectSearchIds_Set

        this.state = { forceReRender_Object: {} };

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    componentDidMount() { try {

        this._compute_DataFor_NewTableData_ThenCallToDisplay()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    componentDidUpdate( prevProps: Readonly<ModPage_ZScore_ReplicateReport_DataTable_Component_Props>, prevState: Readonly<ModPage_ZScore_ReplicateReport_DataTable_Component_State>, snapshot?: any ) { try {

        //  Compare Search Groups (Prev vs Current) for changes

        let searchGroupsDifferent = false

        const searchGroups = this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()

        if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Set !== this._group_1_ProjectSearchIds_PrevRendered
            || searchGroups.group_2_SearchGroup_ProjectSearchIds_Set !== this._group_2_ProjectSearchIds_PrevRendered ) {

            searchGroupsDifferent = true

        } else if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Set.size !== this._group_1_ProjectSearchIds_PrevRendered.size
            || searchGroups.group_2_SearchGroup_ProjectSearchIds_Set.size !== this._group_2_ProjectSearchIds_PrevRendered.size ) {

            searchGroupsDifferent = true
        } else {

            for ( const projectSearchId of this._group_1_ProjectSearchIds_PrevRendered ) {
                if ( ! searchGroups.group_1_SearchGroup_ProjectSearchIds_Set.has( projectSearchId ) ) {
                    searchGroupsDifferent = true
                    break
                }
            }
            for ( const projectSearchId of this._group_2_ProjectSearchIds_PrevRendered ) {
                if ( ! searchGroups.group_2_SearchGroup_ProjectSearchIds_Set.has( projectSearchId ) ) {
                    searchGroupsDifferent = true
                    break
                }
            }
        }

        if ( searchGroupsDifferent ) {

            //  Search Groups changed so save new Search Groups

            this._group_1_ProjectSearchIds_PrevRendered = searchGroups.group_1_SearchGroup_ProjectSearchIds_Set
            this._group_2_ProjectSearchIds_PrevRendered = searchGroups.group_2_SearchGroup_ProjectSearchIds_Set
        }

        //  If Any changes, recompute data for table then display

        if ( searchGroupsDifferent
            || prevProps.forceUpdate_Object !== this.props.forceUpdate_Object
            ||  prevProps.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root !== this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root
            ||  prevProps.modViewPage_DataVizOptions_VizSelections_PageStateManager !== this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager
            ||  prevProps.dataPageStateManager !== this.props.dataPageStateManager
            ||  prevProps.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass !== this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
            ||  prevProps.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root !== this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        ) {
            //  Recompute data and display

            this._show_UpdatingMessage = true

            this.setState({ forceReRender_Object: {} })

            window.setTimeout( () => { try {

                this._compute_DataFor_NewTableData_ThenCallToDisplay()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     */
    private _compute_DataFor_NewTableData_ThenCallToDisplay() {

        const result = _compute_SignificantMods_CombineReps({
            group_1_ProjectSearchIds: this.props.group_1_ProjectSearchIds,
            group_2_ProjectSearchIds: this.props.group_2_ProjectSearchIds,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager: this.props.dataPageStateManager,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

        if ( result.data ) {

            this._dataTable_RootTableObject = _create_DataTable_Data(
                {
                    tableRows: result.data.tableRows,
                    group_1_ProjectSearchIds: this.props.group_1_ProjectSearchIds,
                    group_2_ProjectSearchIds: this.props.group_2_ProjectSearchIds,
                    modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                    dataPageStateManager: this.props.dataPageStateManager
                })

            this._show_UpdatingMessage = false

            this.setState({ forceReRender_Object: {} })

        } else if ( result.promise ) {
            result.promise.catch(reason => {})
            result.promise.then(value => { try {

                this._dataTable_RootTableObject = _create_DataTable_Data(
                    {
                        tableRows: value.tableRows,
                        group_1_ProjectSearchIds: this.props.group_1_ProjectSearchIds,
                        group_2_ProjectSearchIds: this.props.group_2_ProjectSearchIds,
                        modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                        dataPageStateManager: this.props.dataPageStateManager
                    })

                this._show_UpdatingMessage = false

                this.setState({ forceReRender_Object: {} })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } else {
            throw Error("_compute_SignificantMods_CombineReps(...) result.  no data or promise")
        }
    }

    /**
     *
     */
    render() {

        return (

            <div>
                { ! this._dataTable_RootTableObject ? (
                    <div>
                        Loading Data / Creating Table
                    </div>
                ) : (
                    <div style={ { position: "relative" } }>
                        <DataTable_TableRoot tableObject={ this._dataTable_RootTableObject }/>

                        {/*   "Updating Message" Cover <div>  */ }

                        { this._show_UpdatingMessage ? (
                            <div className=" block-updating-overlay-container ">
                                Updating
                            </div>
                        ) : null }
                    </div>
                ) }
            </div>
        )
    }
}


////////////////

///////////    Functions NOT in the Class



const _create_DataTable_Data = function (
    {
        tableRows,
        group_1_ProjectSearchIds,
        group_2_ProjectSearchIds,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager
    } : {
        tableRows: INTERNAL_TableRow[]

        group_1_ProjectSearchIds : Array<number>
        group_2_ProjectSearchIds : Array<number>

        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager : DataPageStateManager

    }): DataTable_RootTableObject {

    const dataTableId_ThisTable = "Mod View ZScore Table";

    const dataTableColumns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    const psmQuantType = (
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms
    )
    const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

    let group_1_ColumnHeader_Addition = " Group 1"
    let group_2_ColumnHeader_Addition = " Group 2"

    if ( group_1_ProjectSearchIds.length === 1 && group_2_ProjectSearchIds.length === 1 ) {

        //  If Both groups have ONE search, put the search id in the column header

        {
            const projectSearchId = group_1_ProjectSearchIds[ 0 ]

            const searchData_For_ProjectSearchId = dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

            group_1_ColumnHeader_Addition = " (" + searchData_For_ProjectSearchId.searchId + ")"
        }

        {
            const projectSearchId = group_2_ProjectSearchIds[ 0 ]

            const searchData_For_ProjectSearchId = dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

            group_2_ColumnHeader_Addition = " (" + searchData_For_ProjectSearchId.searchId + ")"
        }
    }

    {
        const displayName = "Mod Mass";

        const dataTableColumn = new DataTable_Column({
            id : "modMass", // Used for tracking sort order. Keep short
            displayName,
            width : 75,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = quantTypeString + " Count " + group_1_ColumnHeader_Addition;

        const group_SearchData_For_ProjectSearchId: Array<SearchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry> = []

        for ( const projectSearchId of group_1_ProjectSearchIds ) {

            const searchData_For_ProjectSearchId = dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

            group_SearchData_For_ProjectSearchId.push( searchData_For_ProjectSearchId )
        }

        const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => (
            <div>
                <div style={ { fontWeight: "bold", marginBottom: 6 } }>
                    { quantTypeString + " Count " }
                </div>
                <div style={ { fontWeight: "bold", marginBottom: 6 } }>
                    Group 1 Searches:
                </div>
                <div>
                    <ul>
                        { group_SearchData_For_ProjectSearchId.map( value => {
                            return (
                                <li
                                    key={ value.projectSearchId }
                                    style={ { marginBottom: 8 } }
                                >
                                    ({ value.searchId }) { value.name }
                                </li>
                            )
                        } ) }
                    </ul>
                </div>
            </div>
        )

        const dataTableColumn = new DataTable_Column( {
            id: "count_1", // Used for tracking sort order. Keep short
            displayName,
            columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,
            width : 85,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = quantTypeString + " Count " + group_2_ColumnHeader_Addition;

        const group_SearchData_For_ProjectSearchId: Array<SearchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry> = []

        for ( const projectSearchId of group_2_ProjectSearchIds ) {

            const searchData_For_ProjectSearchId = dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

            group_SearchData_For_ProjectSearchId.push( searchData_For_ProjectSearchId )
        }

        const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => (
            <div>
                <div style={ { fontWeight: "bold", marginBottom: 6 } }>
                    { quantTypeString + " Count " }
                </div>
                <div style={ { fontWeight: "bold", marginBottom: 6 } }>
                    Group 2 Searches:
                </div>
                <div>
                    <ul>
                        { group_SearchData_For_ProjectSearchId.map( value => {
                            return (
                                <li
                                    key={ value.projectSearchId }
                                    style={ { marginBottom: 8 } }
                                >
                                    ({ value.searchId }) { value.name }
                                </li>
                            )
                        } ) }
                    </ul>
                </div>
            </div>
        )

        const dataTableColumn = new DataTable_Column( {
            id: "count_2", // Used for tracking sort order. Keep short
            displayName,
            columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,
            width : 85,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "z-score";

        const dataTableColumn = new DataTable_Column({
            id : "z-score", // Used for tracking sort order. Keep short
            displayName,
            width : 130,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "p-value";

        const dataTableColumn = new DataTable_Column({
            id : "p-value", // Used for tracking sort order. Keep short
            displayName,
            width : 130,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "rank";

        const dataTableColumn = new DataTable_Column({
            id : "rank", // Used for tracking sort order. Keep short
            displayName,
            width : 75,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    /////////////////

    //  Populate dataTableRows

    const dataTableRows : Array<DataTable_DataRowEntry> = [];


    for ( const tableRow of tableRows ) {

        const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
        const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

        {
            const valueDisplay = tableRow.modMass.toString();
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : tableRow.modMass
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        {
            const valueDisplay = tableRow.count_1.toLocaleString()
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : tableRow.count_1
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }
        {
            const valueDisplay = tableRow.count_2.toLocaleString()
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : tableRow.count_2
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        //  The 'tableRow.zscore' and 'tableRow.pvalue' may be set to filtered based on user input

        {
            const valueDisplay = tableRow.zscore.toFixed( 2 );
            const searchEntriesForColumn: Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData( { searchEntriesForColumn } )
            const columnEntry = new DataTable_DataRow_ColumnEntry( {
                searchTableData,
                valueDisplay,
                valueSort: tableRow.zscore
            } );
            columnEntries.push( columnEntry );

            const valueDisplay_Download = tableRow.zscore.toString()

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn( { cell_ColumnData_String: valueDisplay_Download } )
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        {
            const valueDisplay = tableRow.pvalue.toExponential( 2 );
            const searchEntriesForColumn: Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData( { searchEntriesForColumn } )
            const columnEntry = new DataTable_DataRow_ColumnEntry( {
                searchTableData,
                valueDisplay,
                valueSort: tableRow.pvalue
            } );
            columnEntries.push( columnEntry );

            const valueDisplay_Download = tableRow.pvalue.toString()

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn( { cell_ColumnData_String: valueDisplay_Download } )
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        {
            const valueDisplay = tableRow.rank.toString();
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : tableRow.rank
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

        // add this row to the rows
        const dataTable_DataRowEntry = new DataTable_DataRowEntry({
            uniqueId : tableRow.modMass,
            sortOrder_OnEquals : tableRow.modMass,
            columnEntries,
            dataTable_DataRowEntry_DownloadTable
        })

        dataTableRows.push( dataTable_DataRowEntry );
    }

    const dataTable_Download_Content_PrefixLines: Array<string> = []

    {
        dataTable_Download_Content_PrefixLines.push( "# ZScore Data" )

        //  Blank line
        dataTable_Download_Content_PrefixLines.push( "#" )

        const searchName_IndentSpaces = " ".repeat( 10 ) //  Indent the # of spaces in the 'repeat'

        { //  Group 1 searches
            dataTable_Download_Content_PrefixLines.push( "#   Group 1 searches" )

            for ( const projectSearchId of group_1_ProjectSearchIds ) {
                const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
                    projectSearchId,
                    dataPageStateManager_DataFrom_Server: dataPageStateManager
                } )
                dataTable_Download_Content_PrefixLines.push( "#" + searchName_IndentSpaces + searchNameForProjectSearchId )
            }
        }

        { //  Group 2 searches
            dataTable_Download_Content_PrefixLines.push( "#   Group 2 searches" )

            for ( const projectSearchId of group_2_ProjectSearchIds ) {
                const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
                    projectSearchId,
                    dataPageStateManager_DataFrom_Server: dataPageStateManager
                } )
                dataTable_Download_Content_PrefixLines.push( "#" + searchName_IndentSpaces + searchNameForProjectSearchId )
            }
        }
        //  Blank line
        dataTable_Download_Content_PrefixLines.push( "#" )
    }

    // assemble the table
    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTableColumns,
        columns_tableDownload : dataTable_Column_DownloadTable_Entries,
        dataTable_DataRowEntries: dataTableRows,
        download_Content_PrefixLines: dataTable_Download_Content_PrefixLines
    });

    const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject
}


/////////////////////////////////

/**
 *
 */
const _compute_SignificantMods_CombineReps = function (
    {
        group_1_ProjectSearchIds,
        group_2_ProjectSearchIds,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        group_1_ProjectSearchIds: Array<number>
        group_2_ProjectSearchIds: Array<number>

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager : DataPageStateManager
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : {
    data: {
        tableRows: Array<INTERNAL_TableRow>
    }
    promise: Promise<{
        tableRows: Array<INTERNAL_TableRow>
    }>
} {

    const projectSearchIds_All_Set: Set<number> = new Set()

    for ( const projectSearchId of group_1_ProjectSearchIds ) {
        projectSearchIds_All_Set.add( projectSearchId )
    }
    for ( const projectSearchId of group_2_ProjectSearchIds ) {
        projectSearchIds_All_Set.add( projectSearchId )
    }

    /////////

    let computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

    //  ONLY for PSM Ratios
    let modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result

    //  ONLY for Scans Ratios
    let modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result

    const promises: Array<Promise<void>> = []

    //  Call 'modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable' with 'override_UserInput...' to get specific results

    const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable(
        {
            override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: true,
            override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: true,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        } )

    if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs.data ) {

        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs.data

    } else if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs.promise ) {
        const promise = new Promise<void>( (resolve, reject) => { try {
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs.promise.catch(reason => { reject(reason)})
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs.promise.then(value => { try {
                computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio = value
                resolve()
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        promises.push( promise )
    } else {
        throw Error( "modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs no 'data' or 'promise" )
    }

    if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ) {

            //  PSM Quant is Ratio AND QuantType is PSMs.  Need Total PSM Count per Project SearchId

            {
                const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

                const getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result =
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.getPsmCount_ForRatiosDenominator_For_ProjectSearchIds( projectSearchIds )

                if ( getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.data ) {
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result = getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.data
                } else if ( getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.promise ) {
                    const promise = new Promise<void>( (resolve, reject) => { try {
                        getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.promise.catch(reason => { reject(reason)})
                        getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.promise.then(value => { try {
                            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result = value
                            resolve()
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push( promise )
                } else {
                    throw Error("getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result no 'data' or 'promise'")
                }
            }

        } else if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

            //  PSM Quant is Ratio AND QuantType is Scans.  Need Total Scan Count per Project SearchId for computing Total Count of: Scan Number / Search Scan File Id Pair Count

            const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

            const getScanCount_For_ProjectSearchIds_Result =
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds( projectSearchIds )

            if ( getScanCount_For_ProjectSearchIds_Result.data ) {
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result = getScanCount_For_ProjectSearchIds_Result.data
            } else if ( getScanCount_For_ProjectSearchIds_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    getScanCount_For_ProjectSearchIds_Result.promise.catch(reason => { reject(reason)})
                    getScanCount_For_ProjectSearchIds_Result.promise.then(value => { try {
                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result = value
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error("getScanCount_For_ProjectSearchIds_Result no 'data' or 'promise'")
            }
        }
    }

    if ( promises.length === 0 ) {

        const result = _modPage_View_SignificantMods_CombineReps_After_GetData({
            group_1_ProjectSearchIds,
            group_2_ProjectSearchIds,
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
            modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager
        })

        return {                    // EARLY RETURN
            promise: undefined,
            data: result
        }
    }

    const promisesAll = Promise.all(promises)

    return {
        data: undefined,
        promise: new Promise<{tableRows: Array<INTERNAL_TableRow>}>( (resolve, reject) => { try {

            promisesAll.catch(reason => { reject(reason) })
            promisesAll.then(novalue => { try {

                const result = _modPage_View_SignificantMods_CombineReps_After_GetData({
                    group_1_ProjectSearchIds,
                    group_2_ProjectSearchIds,
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio,
                    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
                    modViewPage_DataVizOptions_VizSelections_PageStateManager,
                    dataPageStateManager
                })

                resolve(result)

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }
}

/////////////

/**
 *
 */
const _modPage_View_SignificantMods_CombineReps_After_GetData = function (
    {
        group_1_ProjectSearchIds,
        group_2_ProjectSearchIds,
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager
    } : {
        group_1_ProjectSearchIds : Array<number>
        group_2_ProjectSearchIds : Array<number>
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager: DataPageStateManager
    }
): {
    tableRows: Array<INTERNAL_TableRow>
} {

    if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum ===
        ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

        const msg = "_modPage_View_SignificantMods_CombineReps_After_GetData(...): SubSearchId NOT Processed"
        console.warn(msg)
        window.alert(msg)
        throw Error(msg)
    }

    const psmQuantType = (
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms
    )


    const resultsArray: Array<INTERNAL_TableRow> = []

    let filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, number> = undefined

    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ) {

            //  PSMs  quantType

            filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId = new Map()

            const resultRoot =
                modPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root({
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root: computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio,
                    modViewPage_DataVizOptions_VizSelections_PageStateManager
                })
            for ( const result_Single_ProjectSearchId_Or_SubSearchId of resultRoot.result_Total_PsmId_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId.values() ) {

                if ( filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.has( result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId ) ) {
                    const msg = "PSMs  quantType: filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId ALREADY has entry for result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId: " + result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId
                    console.warn(msg)
                    throw Error(msg)
                }

                filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.set(
                    result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId,
                    result_Single_ProjectSearchId_Or_SubSearchId.uniquePsmIdCount_AcrossAllModMasses_And_UnmodifiedPSMs_WhenNoModMassMinMaxFilters
                )
            }

        } else if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

            //  Scans  quantType

            filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId = new Map()

            const resultRoot =
                modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root({
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root: computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio,
                    modViewPage_DataVizOptions_VizSelections_PageStateManager
                })
            for ( const result_Single_ProjectSearchId_Or_SubSearchId of resultRoot.result_Total_Scan_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId.values() ) {

                if ( filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.has( result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId ) ) {
                    const msg = "Scans  quantType: filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId ALREADY has entry for result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId: " + result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId
                    console.warn(msg)
                    throw Error(msg)
                }

                filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.set(
                    result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId,
                    result_Single_ProjectSearchId_Or_SubSearchId.unique_ScanNumber_SearchScanFileId_Pair_Count_AcrossAllModMasses_And_ForUnmodifiedPSMs_WhenNoModMassMinMaxFilters
                )
            }

        } else {
            throw Error("modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() is NOT 'psms' or 'scans'" )
        }
    }


    const combinedModMap__GROUP_KEY_1 = 1
    const combinedModMap__GROUP_KEY_2 = 2

    // combine psm counts for reps into single row in new mod map
    const combinedModMap__PsmCount_Map_Key_Group_1_or_2_Map_Key_ModMass: Map<number, Map<number, number>> = new Map();

    if ( computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio.projectSearchId_Or_SubSearchId_Enum
        === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {
        throw Error( "CODE NOT HANDLE  ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId" )
    }

    for ( const result_ForSingle_ModMass of computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio.get_Data_AllValues() ) {

        const combinedModMap__PsmCount_Or_ScanCount_Map_Key_Group_1_or_2: Map<number, number> = new Map()

        {
            let topLevelTable_DisplayValue_Summed = 0

            for ( const projectSearchId of group_1_ProjectSearchIds ) {

                const data_For__ProjectSearchId_Or_SubSearchId = result_ForSingle_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
                if ( data_For__ProjectSearchId_Or_SubSearchId ) {

                    topLevelTable_DisplayValue_Summed += data_For__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                }
            }

            combinedModMap__PsmCount_Or_ScanCount_Map_Key_Group_1_or_2.set( combinedModMap__GROUP_KEY_1, topLevelTable_DisplayValue_Summed )
        }
        {
            let topLevelTable_DisplayValue_Summed = 0

            for ( const projectSearchId of group_2_ProjectSearchIds ) {

                const data_For__ProjectSearchId_Or_SubSearchId = result_ForSingle_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
                if ( data_For__ProjectSearchId_Or_SubSearchId ) {

                    topLevelTable_DisplayValue_Summed += data_For__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                }
            }

            combinedModMap__PsmCount_Or_ScanCount_Map_Key_Group_1_or_2.set( combinedModMap__GROUP_KEY_2, topLevelTable_DisplayValue_Summed )
        }

        combinedModMap__PsmCount_Map_Key_Group_1_or_2_Map_Key_ModMass.set( result_ForSingle_ModMass.modMass, combinedModMap__PsmCount_Or_ScanCount_Map_Key_Group_1_or_2 )
    }

    // get combined total psm count for each rep group

    let psm_Or_Scan_Count_Group_1 = undefined
    let psm_Or_Scan_Count_Group_2 = undefined

    if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

        psm_Or_Scan_Count_Group_1 = 0;
        psm_Or_Scan_Count_Group_2 = 0;

        for ( const projectSearchId of group_1_ProjectSearchIds ) {

            let countForSearch: number = undefined

            if ( psmQuantType ) {
                if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result ) {
                    throw Error( "In 'for ( const projectSearchId of group0 ) {': in 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result is NOT set.   AFTER: if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) { " )
                }
                countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId )
                if ( countForSearch === undefined || countForSearch === null ) {
                    throw Error( "In 'for ( const projectSearchId of group0 ) {': in 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId ) returned undefined or null for projectSearchId: " + projectSearchId )
                }
            } else {
                if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result ) {
                    throw Error( "In 'for ( const projectSearchId of group0 ) {': in 'else' of 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result is NOT set.  AFTER if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {" )
                }
                countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId )
                if ( countForSearch === undefined || countForSearch === null ) {
                    throw Error( "In 'for ( const projectSearchId of group0 ) {': in 'else' of 'if ( psmQuantType )':  modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId ) returned undefined or null for projectSearchId: " + projectSearchId )
                }
            }

            psm_Or_Scan_Count_Group_1 += countForSearch
        }

        for ( const projectSearchId of group_2_ProjectSearchIds ) {

            let countForSearch: number = undefined

            if ( psmQuantType ) {
                if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result ) {
                    throw Error( "In 'for ( const projectSearchId of group_2_ProjectSearchIds ) {': in 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result is NOT set.  AFTER if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) { " )
                }
                countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId )
                if ( countForSearch === undefined || countForSearch === null ) {
                    throw Error( "In 'for ( const projectSearchId of group_2_ProjectSearchIds ) {': in 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId ) returned undefined or null for projectSearchId: " + projectSearchId )
                }
            } else {
                if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result ) {
                    throw Error( "In 'for ( const projectSearchId of group_2_ProjectSearchIds ) {': in 'else' of 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result is NOT set.  AFTER  if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) { " )
                }
                countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId )
                if ( countForSearch === undefined || countForSearch === null ) {
                    throw Error( "In 'for ( const projectSearchId of group_2_ProjectSearchIds ) {': in 'else' of 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId ) returned undefined or null for projectSearchId: " + projectSearchId )
                }
            }

            psm_Or_Scan_Count_Group_2 += countForSearch
        }
    }

    // get combined filtered psm count for each rep group
    let filtered_Psm_Or_Scan_Count_1 = undefined
    let filtered_Psm_Or_Scan_Count_2 = undefined

    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

        if ( ! filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId ) {
            throw Error("if ( ! filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId ) {   AFTER 'let filtered_Psm_Or_Scan_Count_2 = undefined'")
        }

        filtered_Psm_Or_Scan_Count_1 = 0;
        filtered_Psm_Or_Scan_Count_2 = 0;

        for ( const projectSearchId of group_1_ProjectSearchIds ) {
            const n = filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId );
            if ( n ) {
                filtered_Psm_Or_Scan_Count_1 += n;
            }
        }
        for ( const projectSearchId of group_2_ProjectSearchIds ) {
            const n = filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId );
            if ( n ) {
                filtered_Psm_Or_Scan_Count_2 += n;
            }
        }
    }

    //     //  TESTING ONLY:  This variable 'TESTING__DataToLog_Lines'   ONLY for creating an output to 'console' for showing intermediate results
    //
    // const TESTING__DataToLog_Lines: Array<string> = []
    //
    //
    // TESTING__DataToLog_Lines.push( [
    //     "Mod Mass", "count_1", "count_2",
    //     "z-score", "z-score numerator", "z-score denominator",
    //     "z-score x1", "z-score n1", "z-score x2", "z-score n2",
    //     "p-value", "p-value x1", "p-value n1", "p-value x2", "p-value n2",
    //     "filtered z-score", "filtered z-score numerator", "filtered z-score denominator",
    //     "filtered z-score x1", "filtered z-score n1", "filtered z-score x2", "filtered z-score n2",
    //     "filtered p-value", "filtered p-value x1", "filtered p-value n1", "filtered p-value x2", "filtered p-value n2"
    // ].join("\t") )


    const sortedModMasses = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ModMass_Values_OrderedArray()

    for ( const modMass of sortedModMasses ) {

        let x_1 = combinedModMap__PsmCount_Map_Key_Group_1_or_2_Map_Key_ModMass.get( modMass )?.get( combinedModMap__GROUP_KEY_1 );
        if (x_1 === undefined) {
            x_1 = 0;
        }

        let x_2 = combinedModMap__PsmCount_Map_Key_Group_1_or_2_Map_Key_ModMass.get( modMass )?.get( combinedModMap__GROUP_KEY_2 );
        if (x_2 === undefined) {
            x_2 = 0;
        }

        let zscore: number = undefined
        let pvalue: number = undefined

        let filteredZscore: number = undefined
        let filteredPvalue: number = undefined

        if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

            if ( psm_Or_Scan_Count_Group_1 === undefined || psm_Or_Scan_Count_Group_2 === undefined ) {
                throw Error("if ( psm_Or_Scan_Count_Group_1 === undefined || psm_Or_Scan_Count_Group_2 === undefined ) {")
            }

            zscore = ModPage_ModStatsUtils.getZScoreForTwoRatios({ x1: x_1, n1: psm_Or_Scan_Count_Group_1, x2: x_2, n2: psm_Or_Scan_Count_Group_2 });

            pvalue = ModPage_ModStatsUtils.getPValueForTwoRatios({ x1: x_1, n1: psm_Or_Scan_Count_Group_1, x2: x_2, n2: psm_Or_Scan_Count_Group_2 });
            pvalue = pvalue * sortedModMasses.length;
            if (pvalue > 1) {
                pvalue = 1;
            }
        } else {

            if ( filtered_Psm_Or_Scan_Count_1 === undefined || filtered_Psm_Or_Scan_Count_2 === undefined ) {
                throw Error("if ( filtered_Psm_Or_Scan_Count_1 === undefined || filtered_Psm_Or_Scan_Count_2 === undefined ) {")
            }

            filteredZscore = ModPage_ModStatsUtils.getZScoreForTwoRatios({ x1: x_1, n1: filtered_Psm_Or_Scan_Count_1, x2: x_2, n2: filtered_Psm_Or_Scan_Count_2 });

            filteredPvalue = ModPage_ModStatsUtils.getPValueForTwoRatios({ x1: x_1, n1: filtered_Psm_Or_Scan_Count_1, x2: x_2, n2: filtered_Psm_Or_Scan_Count_2 });
            filteredPvalue = filteredPvalue * sortedModMasses.length;
            if (filteredPvalue > 1) {
                filteredPvalue = 1;
            }
        }

        // {
        //     //  TESTING ONLY:  This block ONLY for creating an output to 'console' for showing intermediate results
        //
        //     //  numerator and denominator calculated values code COPIED from other code:   export const ModPage_ModStatsUtils
        //
        //     //  numerator and denominator calculated values
        //
        //     // NOT Filtered
        //
        //     let numerator: number
        //     let denominator: number
        //
        //     // YES Filtered
        //
        //     let numerator_Filtered: number
        //     let denominator_Filtered: number
        //
        //     if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {
        //
        //         if ( psm_Or_Scan_Count_Group_1 === undefined || psm_Or_Scan_Count_Group_2 === undefined ) {
        //             throw Error("if ( psm_Or_Scan_Count_Group_1 === undefined || psm_Or_Scan_Count_Group_2 === undefined ) {")
        //         }
        //
        //         const x1 = x_1
        //         const x2 = x_2
        //
        //         const n1 = psm_Or_Scan_Count_Group_1
        //         const n2 = psm_Or_Scan_Count_Group_2
        //
        //         const p = ( x1 + x2 ) / ( n1 + n2 );
        //         numerator = ( x1 / n1 ) - ( x2 / n2 );
        //         denominator = Math.sqrt( p * ( 1 - p ) * ( 1 / n1 + 1 / n2 ) );
        //
        //     } else {
        //
        //         // YES Filtered
        //
        //         if ( filtered_Psm_Or_Scan_Count_1 === undefined || filtered_Psm_Or_Scan_Count_2 === undefined ) {
        //             throw Error("if ( filtered_Psm_Or_Scan_Count_1 === undefined || filtered_Psm_Or_Scan_Count_2 === undefined ) {")
        //         }
        //
        //         const x1 = x_1
        //         const x2 = x_2
        //
        //         const n1 = filtered_Psm_Or_Scan_Count_1
        //         const n2 = filtered_Psm_Or_Scan_Count_2
        //
        //         const p = ( x1 + x2 ) / ( n1 + n2 );
        //         numerator_Filtered = ( x1 / n1 ) - ( x2 / n2 );
        //         denominator_Filtered = Math.sqrt( p * ( 1 - p ) * ( 1 / n1 + 1 / n2 ) );
        //     }
        //
        //     //  Commented out copy of Push of header line from above for easy comparison
        //
        //     // TESTING__DataToLog_Lines.push( [
        //     //     "Mod Mass", "count_1", "count_2",
        //     //     "z-score", "z-score numerator", "z-score denominator",
        //     //     "z-score x1", "z-score n1", "z-score x2", "z-score n2",
        //     //     "p-value", "p-value x1", "p-value n1", "p-value x2", "p-value n2",
        //     //     "filtered z-score", "filtered z-score numerator", "filtered z-score denominator",
        //     //     "filtered z-score x1", "filtered z-score n1", "filtered z-score x2", "filtered z-score n2",
        //     //     "filtered p-value",
        //     //     "filtered p-value x1", "filtered p-value n1", "filtered p-value x2", "filtered p-value n2"
        //     // ].join("\t") )
        //
        //     const TESTING__DataToLog_Line = [
        //         modMass, x_1, x_2,
        //         zscore, numerator, denominator,
        //         x_1, psm_Or_Scan_Count_Group_1, x_2, psm_Or_Scan_Count_Group_2,
        //         pvalue,
        //         x_1, psm_Or_Scan_Count_Group_1, x_2, psm_Or_Scan_Count_Group_2,
        //         // Filtered
        //         filteredZscore,
        //         numerator_Filtered, denominator_Filtered,
        //         x_1, filtered_Psm_Or_Scan_Count_1, x_2, filtered_Psm_Or_Scan_Count_2,
        //         filteredPvalue,
        //         x_1, filtered_Psm_Or_Scan_Count_1, x_2, filtered_Psm_Or_Scan_Count_2,
        //     ].join( "\t" )
        //
        //     TESTING__DataToLog_Lines.push( TESTING__DataToLog_Line )
        // }

        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

            zscore = filteredZscore
            pvalue = filteredPvalue
        }

        const ob: INTERNAL_TableRow = {
            modMass: modMass,
            count_1: x_1,
            count_2: x_2,
            zscore: zscore,
            pvalue: pvalue,
            rank: undefined  //  Set later
        };

        resultsArray.push(ob);
    }

    // {
    //     TESTING__DataToLog_Lines.push("") // to add final \n
    //     const TESTING_StringToLog = TESTING__DataToLog_Lines.join("\n")
    //
    //     console.log( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //     console.log( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //     console.log( "!!!!!!!!!!!!!!!!!! Log of Data for ZScore Table: \n\n", TESTING_StringToLog )
    // }

    resultsArray.sort(function(a,b) {

        // sort on the magnitude of the zscore (asc) first, then p-value (desc) second

        if (Math.abs(a.zscore) > Math.abs(b.zscore)) {
            return -1;
        }
        if (Math.abs(a.zscore) < Math.abs(b.zscore)) {
            return 1;
        }
        return a.pvalue - b.pvalue;
    });

    //  Create Table and open overlay

    const tableRows: Array<INTERNAL_TableRow> = []

    {
        // assemble the table rows

        let rank = 1;

        for ( const tableRow of resultsArray ) {

            tableRow.rank = rank

            tableRows.push( tableRow )

            rank++;
        }
    }

    return {
        tableRows
    }
}




/**
 *
 */
type INTERNAL_TableRow = {

    modMass: number
    count_1: number
    count_2: number
    zscore: number
    pvalue: number
    rank: number
}
