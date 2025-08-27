/**
 * modPage_Get_Single_ModMass_By_SubSearch_List_When_NO_Proteins_SubTableGenerator.tsx
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
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";


//////////////////////


const dataTableId_ThisTable = "Mod View Single Mod Mass By Sub Search Sub Table";




export const modPage_Get_Single_ModMass_By_SubSearch_List_When_NO_Proteins_SubTableGenerator  = async function (
    {
        data_For_ModMass,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

        searchSubGroups_DisplayOrder_Filtered,
        projectSearchId,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

        searchSubGroups_DisplayOrder_Filtered: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>
        projectSearchId: number

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }):Promise<DataTable_RootTableObject> { try {

    // create the columns for the table
    const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getDataTableColumns();

    // create the rows for the table
    const dataTableRows : Array<DataTable_DataRowEntry> = await _getDataTableRows({

        data_For_ModMass,

        searchSubGroups_DisplayOrder_Filtered,
        projectSearchId,

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
        const displayName = "Sub Search";

        const dataTableColumn = new DataTable_Column({
            id : "sub search", // Used for tracking sort order. Keep short
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
        const displayName = "Residues";

        const dataTableColumn = new DataTable_Column({
            id : "modRes", // Used for tracking sort order. Keep short
            displayName,
            width : 100,
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

        searchSubGroups_DisplayOrder_Filtered,
        projectSearchId,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        searchSubGroups_DisplayOrder_Filtered: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>
        projectSearchId: number

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }
) : Promise<Array<DataTable_DataRowEntry>> { try {

    const dataTableRows : Array<DataTable_DataRowEntry> = [];

    const allData_ForSearches_ForModMass = await _getData_PerSearch_ForModMass({
        data_For_ModMass, searchSubGroups_DisplayOrder_Filtered, projectSearchId
    });

    for ( const allData_ForSearches_For_Single_ModMass of allData_ForSearches_ForModMass ) {

        const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
        const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

        // add the name
        {
            const searchSubGroups_ForProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );

            if ( ! searchSubGroups_ForProjectSearchId ) {
                const msg = "returned nothing: dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            const searchSubGroup_For_SearchSubGroup_Id = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( allData_ForSearches_For_Single_ModMass.subSearchId )
            if ( ! searchSubGroup_For_SearchSubGroup_Id ) {
                const msg = "returned nothing: searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( allData_ForSearches_For_Single_ModMass.subSearchId ), allData_ForSearches_For_Single_ModMass.subSearchId: " + allData_ForSearches_For_Single_ModMass.subSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            let displayString = searchSubGroup_For_SearchSubGroup_Id.subgroupName_Display;

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
            const valueDisplay = allData_ForSearches_For_Single_ModMass.modifiedResidues ? Array.from(allData_ForSearches_For_Single_ModMass.modifiedResidues).sort().join(', ') : ""
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        const dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                    return modPage_Get_PeptideList_ForModMassAndSearch_When_NO_Proteins_SubTableGenerator({
                        projectSearchId_Or_SubSearchId: allData_ForSearches_For_Single_ModMass.subSearchId,
                        projectSearchId_ForUseWhereRequire_projectSearchId: projectSearchId,
                        data_For_ModMass,
                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                    })
                };

        const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

        // add this row to the rows
        const dataTable_DataRowEntry = new DataTable_DataRowEntry({
            uniqueId : allData_ForSearches_For_Single_ModMass.subSearchId,
            sortOrder_OnEquals : allData_ForSearches_For_Single_ModMass.subSearchId,
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
        searchSubGroups_DisplayOrder_Filtered,
        projectSearchId
    } : {
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        searchSubGroups_DisplayOrder_Filtered: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>
        projectSearchId: number
    }
) : Promise<Array<INTERNAL__OutputData_ForSingleSubSearch>> { try {

    const data_Output_Map_Key_SubSearchId :Map<number, INTERNAL__OutputData_ForSingleSubSearch> = new Map()

    for ( const searchSubGroup of searchSubGroups_DisplayOrder_Filtered ) {

        const data_For_ModMass_For__SearchSubGroup_Id = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( searchSubGroup.searchSubGroup_Id )

        if ( ! data_For_ModMass_For__SearchSubGroup_Id ) {
            //  NO data so skip
            continue // EARLY CONTINUE
        }

        for ( const dataFor_SinglePsm of data_For_ModMass_For__SearchSubGroup_Id.get_DataFor_SinglePsm_All() ) {

            let outputData_Output = data_Output_Map_Key_SubSearchId.get( searchSubGroup.searchSubGroup_Id )
            if ( ! outputData_Output ) {

                outputData_Output = {

                    subSearchId: searchSubGroup.searchSubGroup_Id,

                    modifiedResidues: new Set(),

                    psmIds_All_ForSearch_Set: new Set()
                }

                data_Output_Map_Key_SubSearchId.set( searchSubGroup.searchSubGroup_Id, outputData_Output )
            }

            outputData_Output.psmIds_All_ForSearch_Set.add( dataFor_SinglePsm.psmId )

            if ( dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__allMods_PeptideResidueLetters_At_ModificationPositions() ) {
                for ( const residue of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__allMods_PeptideResidueLetters_At_ModificationPositions() ) {
                    outputData_Output.modifiedResidues.add( residue )
                }
            }
        }
    }


    const data_ForSearchForModMass = Array.from( data_Output_Map_Key_SubSearchId.values() );

    return data_ForSearchForModMass;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}





class INTERNAL__OutputData_ForSingleSubSearch {

    readonly subSearchId: number
    readonly modifiedResidues: Set<string>

    readonly psmIds_All_ForSearch_Set: Set<number>
}
