/**
 * modPage_get_ZScore_Tab_GroupsFor_SingleModMass_SubTable.ts
 */

import React from "react";

import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableDataObject_Both_ColumnArrays,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    modPage_get_ProteinList_SubTable
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_get_ProteinList_SubTable";
import {
    modPage_Get_Single_ModMass_By_SubSearch_List_When_NO_Proteins_SubTableGenerator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_Get_Single_ModMass_By_SubSearch_List_When_NO_Proteins_SubTableGenerator";
import {
    modPage_Get_Single_ModMass_BySearch_List_When_NO_Proteins_SubTableGenerator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_Get_Single_ModMass_BySearch_List_When_NO_Proteins_SubTableGenerator";
import {
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ModPage_ModifiedResidue__DataTable_ColumnDisplay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__modified_residue__table_column_display/ModPage_ModifiedResidue__DataTable_ColumnDisplay";
import {
    ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator";


//   Classes past to child tables are at the bottom of this file


export const modPage_get_ZScore_Tab_GroupsFor_SingleModMass_SubTable = async function (
    {
        data_For_ModMass,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

        quantTypeString_With_Count_String,

        group_1_ProjectSearchIds_Or_SubSearchIds,
        group_2_ProjectSearchIds_Or_SubSearchIds,

        group_1_CountValue,
        group_2_CountValue,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    } : {
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

        quantTypeString_With_Count_String: string

        group_1_ProjectSearchIds_Or_SubSearchIds : Array<number>
        group_2_ProjectSearchIds_Or_SubSearchIds : Array<number>

        group_1_CountValue: number
        group_2_CountValue: number

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    }
) : Promise<DataTable_RootTableObject> { try {

    const dataTableId_ThisTable = "Mod View ZScore Groups Single Mod Mass Sub Table";

    // create the columns for the table
    const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getDataTableColumns({
        quantTypeString_With_Count_String
    });

    // create the rows for the table
    const dataTableRows : Array<DataTable_DataRowEntry> = await _getDataTableRows({

        group_1_CountValue,
        group_2_CountValue,
        data_For_ModMass,
        group_1_ProjectSearchIds_Or_SubSearchIds,
        group_2_ProjectSearchIds_Or_SubSearchIds,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    });

    // assemble the table
    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_RootTableDataObject_Both_ColumnArrays.columns,
        columns_tableDownload : dataTable_RootTableDataObject_Both_ColumnArrays.columns_tableDownload,
        dataTable_DataRowEntries: dataTableRows
    });

    const tableOptions = new DataTable_TableOptions({ enable_Pagination_Download_Search: false, enable_Download: true });

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

///////

const _getDataTableColumns = function (
    {
        quantTypeString_With_Count_String
    }:{
        quantTypeString_With_Count_String: string
    }
) : DataTable_RootTableDataObject_Both_ColumnArrays { try {

    const dataTableColumns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {
        const displayName = "Group";

        const dataTableColumn = new DataTable_Column({
            id : "Group", // Used for tracking sort order. Keep short
            displayName,
            width : 200,
            sortable : false
        });
        dataTableColumns.push( dataTableColumn );

        const displayName_Download = displayName

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName_Download });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "Modified Residues";

        const dataTableColumn = new DataTable_Column({
            id : "modRes", // Used for tracking sort order. Keep short
            displayName,
            width : ModPage_ModifiedResidue__DataTable_ColumnDisplay.columnWidth,
            sortable : false
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = quantTypeString_With_Count_String

        const dataTableColumn = new DataTable_Column( {
            id: "count", // Used for tracking sort order. Keep short
            displayName,
            width: 100,
            sortable: true
        } );
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable( { cell_ColumnHeader_String: displayName } );
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    const dataTable_RootTableDataObject_Both_ColumnArrays = new DataTable_RootTableDataObject_Both_ColumnArrays({ columns : dataTableColumns, columns_tableDownload : dataTable_Column_DownloadTable_Entries});

    return dataTable_RootTableDataObject_Both_ColumnArrays;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

/////////////

const _getDataTableRows =  async function (
    {
        group_1_CountValue,
        group_2_CountValue,

        data_For_ModMass,

        group_1_ProjectSearchIds_Or_SubSearchIds,
        group_2_ProjectSearchIds_Or_SubSearchIds,

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    } : {
        group_1_CountValue: number
        group_2_CountValue: number

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        group_1_ProjectSearchIds_Or_SubSearchIds : Array<number>
        group_2_ProjectSearchIds_Or_SubSearchIds : Array<number>
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    }
) : Promise<Array<DataTable_DataRowEntry>> { try {

    const dataTableRows : Array<DataTable_DataRowEntry> = [];

    {  //  Group Number 1

        const groupNumber = 1

        // call for sub table
        const dataTable_DataRowEntry =
            _create_DataTable_DataRowEntry({

                groupNumber,
                countValue: group_1_CountValue,

                group_1_or_2_ProjectSearchIds_Or_SubSearchIds: group_1_ProjectSearchIds_Or_SubSearchIds,

                data_For_ModMass,
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

                all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

                modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
            })

        dataTableRows.push( dataTable_DataRowEntry );
    }

    {  //  Group Number 2

        const groupNumber = 2

        // call for sub table
        const dataTable_DataRowEntry =
            _create_DataTable_DataRowEntry({

                groupNumber,
                countValue: group_2_CountValue,

                group_1_or_2_ProjectSearchIds_Or_SubSearchIds: group_2_ProjectSearchIds_Or_SubSearchIds,

                data_For_ModMass,
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

                all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

                modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
            })

        dataTableRows.push( dataTable_DataRowEntry );
    }


    return dataTableRows;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


const _create_DataTable_DataRowEntry = function (
    {
        groupNumber,
        countValue,

        group_1_or_2_ProjectSearchIds_Or_SubSearchIds,

        data_For_ModMass,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    } : {
        groupNumber: number

        countValue: number

        group_1_or_2_ProjectSearchIds_Or_SubSearchIds : Array<number>

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    }
): DataTable_DataRowEntry {

    const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
    const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

    {    // Column:  Group label

        const valueDisplay = "Group " + groupNumber

        let searchesOrSubSearches_Label_String = "Searches"

        const searchName_Or_SubSearchLabels: Array<React.JSX.Element> = []

        if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
            === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            searchesOrSubSearches_Label_String = "Sub searches"

            const projectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

            const searchSubGroups_ForProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);

            for ( const subSearchId of group_1_or_2_ProjectSearchIds_Or_SubSearchIds ) {

                const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId )
                if ( ! searchSubGroup ) {
                    throw Error("searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId ) returned NOTHING for subSearchId: " + subSearchId )
                }

                searchName_Or_SubSearchLabels.push(
                    <li
                        key={ searchSubGroup.searchSubGroup_Id }
                        style={ { marginBottom: 8 } }
                    >
                        ({ searchSubGroup.subgroupName_Display }) { searchSubGroup.searchSubgroupName_fromImportFile }
                    </li>
                )
            }

        } else {

            for ( const projectSearchId of group_1_or_2_ProjectSearchIds_Or_SubSearchIds ) {

                const searchData_For_ProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

                searchName_Or_SubSearchLabels.push(
                    <li
                        key={ searchData_For_ProjectSearchId.projectSearchId }
                        style={ { marginBottom: 8 } }
                    >
                        ({ searchData_For_ProjectSearchId.searchId }) { searchData_For_ProjectSearchId.name }
                    </li>
                )
            }
        }

        const tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough = () : React.JSX.Element => (
            <div>
                <div style={ { fontWeight: "bold", marginBottom: 6 } }>
                    Group { groupNumber } { searchesOrSubSearches_Label_String }:
                </div>
                <div>
                    <ul>
                        { searchName_Or_SubSearchLabels }
                    </ul>
                </div>
            </div>
        )


        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            searchTableData,
            valueDisplay,
            tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
        });
        columnEntries.push( columnEntry );

        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
    }
    {    // Column: modded residues
        const existingEntries_ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator: Array<ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator> = []

        for ( const projectSearchId_Or_SubSearchId of group_1_or_2_ProjectSearchIds_Or_SubSearchIds ) {

            const data_For_ModMass_For__ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId )
            if ( ! data_For_ModMass_For__ProjectSearchId_Or_SubSearchId ) {
                continue // EARLY CONTINUE
            }

            existingEntries_ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.push( data_For_ModMass_For__ProjectSearchId_Or_SubSearchId.modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator )
        }

        //  Combined Values
        const modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator = ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.combine_ValuesInObjects( existingEntries_ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator )

        const valueDisplay_Search_and_Download = Array.from( modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.get_ResidueLetters() ).sort().join(', ');

        const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
            ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : React.JSX.Element => {

                return ModPage_ModifiedResidue__DataTable_ColumnDisplay.get_DataTable_ModifiedResidues_Column_Contents({ modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator })
            }

        const searchEntriesForColumn : Array<string> = [ valueDisplay_Search_and_Download ]
        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            searchTableData,
            valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
        });
        columnEntries.push( columnEntry );

        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay_Search_and_Download })
        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
    }
    { // Column: Count

        const value = countValue

        const valueDisplay = value.toLocaleString();
        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            searchTableData,
            valueDisplay,
            valueSort : value
        });
        columnEntries.push( columnEntry );

        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: value.toString() })
        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
    }

    let dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject = undefined

    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.allSearches_HaveProteins ) {

        dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
            ( params: DataTable_DataRowEntry__GetChildTableData_CallbackParams ): Promise<DataTable_RootTableObject> => {

                if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
                    === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                    return modPage_get_ProteinList_SubTable( {
                        force_AlwaysShow_Search_SubSearch_SubTable: true,
                        data_For_ModMass,
                        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

                        projectSearchIds: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,

                        searchSubGroup_Ids_Override: group_1_or_2_ProjectSearchIds_Or_SubSearchIds,

                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

                        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
                    } )
                }

                return modPage_get_ProteinList_SubTable( {
                    force_AlwaysShow_Search_SubSearch_SubTable: true,
                    data_For_ModMass,
                    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

                    projectSearchIds: group_1_or_2_ProjectSearchIds_Or_SubSearchIds,

                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

                    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
                } )
            };
    } else {

        if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
            === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            //  Comment out code to show different sub table if only one search or sub search.

            // if ( group_1_or_2_ProjectSearchIds_Or_SubSearchIds.length !== 1 ) {

                const group_1_or_2_ProjectSearchIds_Or_SubSearchIds_Set = new Set( group_1_or_2_ProjectSearchIds_Or_SubSearchIds )

                const projectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

                const searchSubGroups_DisplayOrder_Filtered: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = []

                const searchSubGroups = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
                for ( const searchSubGroup of searchSubGroups.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

                    if ( group_1_or_2_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id ) ) {

                        searchSubGroups_DisplayOrder_Filtered.push( searchSubGroup )
                    }
                }

                dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                        return modPage_Get_Single_ModMass_By_SubSearch_List_When_NO_Proteins_SubTableGenerator({
                            data_For_ModMass,
                            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

                            searchSubGroups_DisplayOrder_Filtered,
                            projectSearchId: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ],
                            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                        })
                    }
            // } else {
            //
            //     dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
            //         ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {
            //
            //             return modPage_Get_PeptideList_ForModMassAndSearch_When_NO_Proteins_SubTableGenerator({
            //                 projectSearchId_Or_SubSearchId: group_1_or_2_ProjectSearchIds_Or_SubSearchIds[ 0 ],
            //                 projectSearchId_ForUseWhereRequire_projectSearchId: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ],
            //                 data_For_ModMass,
            //                 all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            //                 commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            //             })
            //         };
            // }

        } else {

            //  Comment out code to show different sub table if only one search or sub search.

            // if ( group_1_or_2_ProjectSearchIds_Or_SubSearchIds.length !== 1 ) {

                dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                        return modPage_Get_Single_ModMass_BySearch_List_When_NO_Proteins_SubTableGenerator({

                            data_For_ModMass,
                            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

                            projectSearchIds: group_1_or_2_ProjectSearchIds_Or_SubSearchIds,
                            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                        })
                    }
            // } else {
            //
            //     dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
            //         ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {
            //
            //             return modPage_Get_PeptideList_ForModMassAndSearch_When_NO_Proteins_SubTableGenerator({
            //                 projectSearchId_Or_SubSearchId: group_1_or_2_ProjectSearchIds_Or_SubSearchIds[ 0 ],
            //                 projectSearchId_ForUseWhereRequire_projectSearchId: group_1_or_2_ProjectSearchIds_Or_SubSearchIds[ 0 ],
            //                 data_For_ModMass,
            //                 all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            //                 commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            //             })
            //         };
            // }
        }
    }

    const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

    // add this row to the rows
    const dataTable_DataRowEntry = new DataTable_DataRowEntry({
        uniqueId : groupNumber,
        sortOrder_OnEquals : groupNumber,
        columnEntries,
        dataTable_DataRowEntry_DownloadTable,
        dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject
    });

    return dataTable_DataRowEntry
}