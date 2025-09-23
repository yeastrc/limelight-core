/**
 * modPage_Get_Single_ModMass_BySearch_List_When_NO_Proteins_SubTableGenerator.tsx
 */

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableDataObject_Both_ColumnArrays,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    modPage_Get_PeptideList_ForModMassAndSearch_When_NO_Proteins_SubTableGenerator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_Get_PeptideList_ForModMassAndSearch_When_NO_Proteins_SubTableGenerator";
import {
    ModPage_ModifiedResidue__DataTable_ColumnDisplay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__modified_residue__table_column_display/ModPage_ModifiedResidue__DataTable_ColumnDisplay";
import {
    ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator";


//////////////////////


const dataTableId_ThisTable = "Mod View Single Mod Mass By Search Sub Table";




export const modPage_Get_Single_ModMass_BySearch_List_When_NO_Proteins_SubTableGenerator  = async function (
    {
        data_For_ModMass,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

        projectSearchIds,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

        projectSearchIds: Array<number>

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }):Promise<DataTable_RootTableObject> { try {

    // create the columns for the table
    const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getDataTableColumns();

    // create the rows for the table
    const dataTableRows : Array<DataTable_DataRowEntry> = await _getDataTableRows({
        data_For_ModMass,

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

        projectSearchIds,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    });

    // assemble the table
    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_RootTableDataObject_Both_ColumnArrays.columns,
        columns_tableDownload : dataTable_RootTableDataObject_Both_ColumnArrays.columns_tableDownload,
        dataTable_DataRowEntries: dataTableRows
    });

    const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: false});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

/////////////////////

const _getDataTableColumns = function () : DataTable_RootTableDataObject_Both_ColumnArrays { try {

    const dataTableColumns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {
        const displayName = "Search";

        const dataTableColumn = new DataTable_Column({
            id : "searchName", // Used for tracking sort order. Keep short
            displayName,
            width : 500,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "PSMs";

        const dataTableColumn = new DataTable_Column({
            id : "psmCount", // Used for tracking sort order. Keep short
            displayName,
            width : 100,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
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

    const dataTable_RootTableDataObject_Both_ColumnArrays = new DataTable_RootTableDataObject_Both_ColumnArrays({ columns: dataTableColumns, columns_tableDownload: dataTable_Column_DownloadTable_Entries });

    return dataTable_RootTableDataObject_Both_ColumnArrays;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}



////////////

const _getDataTableRows = async function (
    {
        data_For_ModMass,

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

        projectSearchIds,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    } : {
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

        projectSearchIds: Array<number>

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }
) : Promise<Array<DataTable_DataRowEntry>> { try {

    const dataTableRows : Array<DataTable_DataRowEntry> = [];

    const allData_ForSearches_ForModMass = await _getData_PerSearch_ForModMass({
        data_For_ModMass, projectSearchIds
    });

    for ( const allData_ForSearches_For_Single_ModMass of allData_ForSearches_ForModMass ) {

        const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
        const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

        // add the name
        {
            const searchData_For_ProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( allData_ForSearches_For_Single_ModMass.projectSearchId )
            if ( ! searchData_For_ProjectSearchId ) {
                throw Error("dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( allData_ForSearches_For_Single_ModMass.projectSearchId ) returned NOTHING for allData_ForSearches_For_Single_ModMass.projectSearchId_ForUseWhereRequire_projectSearchId: " + allData_ForSearches_For_Single_ModMass.projectSearchId )
            }

            const searchId = searchData_For_ProjectSearchId.searchId

            const searchName = searchData_For_ProjectSearchId.name

            const searchShortName = searchData_For_ProjectSearchId.searchShortName

            let displayString = searchName;
            if ( searchShortName && searchShortName.length > 0 ) {
                displayString += " (" + searchShortName + ")";
            }
            displayString += " (" + searchId + ")";

            const valueDisplay = displayString;
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : valueDisplay
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        // add psm count
        {
            const value = allData_ForSearches_For_Single_ModMass.psmIds_All_ForSearch_Set.size

            const valueDisplay = value.toString();
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : value
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        // add modded residues
        {
            const modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator = allData_ForSearches_For_Single_ModMass.modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator

            const valueDisplay_Search_and_Download = Array.from( modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.get_ResidueLetters() ).sort().join(', ');

            const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

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

        const dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                    return modPage_Get_PeptideList_ForModMassAndSearch_When_NO_Proteins_SubTableGenerator({
                        projectSearchId_Or_SubSearchId: allData_ForSearches_For_Single_ModMass.projectSearchId,
                        projectSearchId_ForUseWhereRequire_projectSearchId: allData_ForSearches_For_Single_ModMass.projectSearchId,
                        data_For_ModMass,
                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                    })
                };

        const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

        // add this row to the rows
        const dataTable_DataRowEntry = new DataTable_DataRowEntry({
            uniqueId : allData_ForSearches_For_Single_ModMass.projectSearchId,
            sortOrder_OnEquals : allData_ForSearches_For_Single_ModMass.projectSearchId,
            columnEntries,
            dataTable_DataRowEntry_DownloadTable,
            dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject
        });

        dataTableRows.push( dataTable_DataRowEntry );
    }

    return dataTableRows;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


///////////


const _getData_PerSearch_ForModMass = async function (
    {
        data_For_ModMass,
        projectSearchIds
    } : {
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        projectSearchIds: Array<number>
    }
) : Promise<Array<INTERNAL__OutputData_ForSingleSearch>> { try {

    const data_Output_Map_Key_ProjectSearchId :Map<number, INTERNAL__OutputData_ForSingleSearch> = new Map()

    for ( const projectSearchId of projectSearchIds ) {

        const data_For_ModMass_For__ProjectSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )

        if ( ! data_For_ModMass_For__ProjectSearchId ) {
            //  NO data so skip
            continue // EARLY CONTINUE
        }

        for ( const dataFor_SinglePsm of data_For_ModMass_For__ProjectSearchId.get_DataFor_SinglePsm_All() ) {

            let outputData_Output = data_Output_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( ! outputData_Output ) {

                outputData_Output = {

                    projectSearchId,

                    psmIds_All_ForSearch_Set: new Set(),

                    modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator: new ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator()
                }

                data_Output_Map_Key_ProjectSearchId.set( projectSearchId, outputData_Output )
            }

            outputData_Output.psmIds_All_ForSearch_Set.add( dataFor_SinglePsm.psmId )

            outputData_Output.modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.add__dataFor_SinglePsm__modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm({
                modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm: dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get_modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm()
            })
        }
    }


    const data_ForSearchForModMass = Array.from( data_Output_Map_Key_ProjectSearchId.values() );

    return data_ForSearchForModMass;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}





class INTERNAL__OutputData_ForSingleSearch {

    readonly projectSearchId: number

    readonly psmIds_All_ForSearch_Set: Set<number>

    modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator: ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator
}
