/**
 * modPage_get_ProteinList_SubTable.ts
 */


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
import {
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ModPage_Mod_Unlocalized_StartEnd_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_Mod_Unlocalized_StartEnd_ContainerClass";
import {
    limelight__variable_is_type_number_Check
} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {
    modPage_ProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents,
    ModPage_ProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback_Params
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_ProteinList_SubTableGenerator_ProteinName_Cell_Component";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass,
    ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";
import {
    modPage_Get_PeptideList_ForModMassProteinAndSearch_SubTableGenerator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_Get_PeptideList_ForModMassProteinAndSearch_SubTableGenerator";
import {
    modPage_Get_ProteinData_BySearch_List_SubTableGenerator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_Get_ProteinData_BySearch_List_SubTableGenerator";
import {
    modPage_DataTable_Display_Positions_Cell_ReturnComponent
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_DataTable_Display_Positions_Cell_Component";
import {
    ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";
import {
    modPage_CompressUnlocalizedRanges
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_CompressUnlocalizedRanges";
import {
    modPage_Get_SearchLabel__SearchShortName_OR_SearchId_ForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_SearchLabel__SearchShortName_OR_SearchId_ForProjectSearchId";
import React from "react";
import {
    searchSubGroup_Get_Selected_SearchSubGroupIds
} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {
    modPage_Get_ProteinData_By_SubSearch_List_SubTableGenerator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_Get_ProteinData_By_SubSearch_List_SubTableGenerator";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator";
import {
    ModPage_ModifiedResidue__DataTable_ColumnDisplay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__modified_residue__table_column_display/ModPage_ModifiedResidue__DataTable_ColumnDisplay";


//   Classes past to child tables are at the bottom of this file

export const modPage_get_ProteinList_SubTable = async function (
    {
        force_AlwaysShow_Search_SubSearch_SubTable,
        data_For_ModMass,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

        projectSearchIds,

        searchSubGroup_Ids_Override,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    } : {
        force_AlwaysShow_Search_SubSearch_SubTable: boolean

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

        projectSearchIds: Array<number>

        searchSubGroup_Ids_Override?: Array<number>

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    }
) : Promise<DataTable_RootTableObject> { try {

    const dataTableId_ThisTable = "Mod View Protein List Sub Table";


    let projectSearchId_Or_SubSearchId_Set_PossiblyFiltered: Set<number> = undefined
    let searchSubGroups_DisplayOrder_Filtered: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>

    if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
        === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.ProjectSearchId ) {

        projectSearchId_Or_SubSearchId_Set_PossiblyFiltered = new Set( projectSearchIds )

    } else if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
        === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

        //  Only display Sub Searches for 1 search

        if ( projectSearchIds.length !== 1 ) {
            const msg = "if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND if ( projectSearchIds.length !== 1 ) {"
            console.warn(msg)
            throw Error(msg)
        }

        const projectSearchId = projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        if ( searchSubGroup_Ids_Override ) {

            projectSearchId_Or_SubSearchId_Set_PossiblyFiltered = new Set( searchSubGroup_Ids_Override )


        } else {

            const searchSubGroup_Ids_Selected = searchSubGroup_Get_Selected_SearchSubGroupIds({
                searchSubGroup_CentralStateManagerObjectClass: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
            })

            projectSearchId_Or_SubSearchId_Set_PossiblyFiltered = new Set( searchSubGroup_Ids_Selected )
        }

        searchSubGroups_DisplayOrder_Filtered = []

        for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

            if ( projectSearchId_Or_SubSearchId_Set_PossiblyFiltered.has( searchSubGroup.searchSubGroup_Id ) ) {

                searchSubGroups_DisplayOrder_Filtered.push( searchSubGroup )
            }
        }

    } else {
        throw Error("Unexpected value for modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum: " + modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum )
    }



    // create the columns for the table
    const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getDataTableColumns({
        projectSearchIds,
        searchSubGroups_DisplayOrder_Filtered,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    });

    // create the rows for the table
    const dataTableRows : Array<DataTable_DataRowEntry> = await _getDataTableRows({
        force_AlwaysShow_Search_SubSearch_SubTable,
        data_For_ModMass,
        projectSearchIds,
        projectSearchId_Or_SubSearchId_Set_PossiblyFiltered,
        searchSubGroups_DisplayOrder_Filtered,
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

/**
 *
 * @param projectSearchIds
 * @param searchSubGroups_DisplayOrder_Filtered
 * @param all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
 */
const _getDataTableColumns = function (
    {
        projectSearchIds,
        searchSubGroups_DisplayOrder_Filtered,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }:{
        projectSearchIds: Array<number>
        searchSubGroups_DisplayOrder_Filtered: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }
) : DataTable_RootTableDataObject_Both_ColumnArrays { try {

    const dataTableColumns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {
        const displayName = "Protein";

        const dataTableColumn = new DataTable_Column({
            id : "proteinName", // Used for tracking sort order. Keep short
            displayName,
            width : 200,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const displayName_Download = "Protein Name";

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName_Download });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        //  Download ONLY  --  Protein Description

        const displayName_Download = "Protein Description";

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName_Download });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "Positions";

        const dataTableColumn = new DataTable_Column({
            id : "modPos", // Used for tracking sort order. Keep short
            displayName,
            width : 100,
            sortable : false
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

    if ( searchSubGroups_DisplayOrder_Filtered ) {

        // add a column for each project search id
        for ( const searchSubGroup of searchSubGroups_DisplayOrder_Filtered ) {

            const displayName = searchSubGroup.subgroupName_Display

            const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () => {

                return (
                    <>
                        <div style={ { fontWeight: "bold" } }>
                            { displayName }
                        </div>
                        <div style={ { marginTop: 2 } }>
                            { searchSubGroup.searchSubgroupName_fromImportFile }
                        </div>
                    </>
                )
            }

            const dataTableColumn = new DataTable_Column( {
                id: searchSubGroup.searchSubGroup_Id + "_val", // Used for tracking sort order. Keep short
                displayName,
                width: 100,
                sortable: true,
                columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element
            } );
            dataTableColumns.push( dataTableColumn );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable( { cell_ColumnHeader_String: displayName } );
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

    } else {

        for ( const projectSearchId of projectSearchIds ) {

            const searchIdXorShortName = modPage_Get_SearchLabel__SearchShortName_OR_SearchId_ForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server });

            const displayName = "PSM Count (" + searchIdXorShortName + ")";

            const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () => {

                const searchData = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId );
                if ( ! searchData ) {
                    const msg = "dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                let searchShortName_Label = ""

                if ( searchData.searchShortName ) {
                    searchShortName_Label = "(" + searchData.searchShortName + ") "
                }

                const searchLabel = "(" + searchData.searchId + ") " + searchShortName_Label + searchData.name

                return (
                    <>
                        <div style={ { fontWeight: "bold" } }>
                            { displayName }
                        </div>
                        <div style={ { marginTop: 5, fontWeight: "bold" } }>
                            Search:
                        </div>
                        <div style={ { marginTop: 2 } }>
                            { searchLabel }
                        </div>
                    </>
                )
            }

            const dataTableColumn = new DataTable_Column({
                id : projectSearchId + '-psms', // Used for tracking sort order. Keep short
                displayName,
                width : 100,
                sortable : true,
                columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element
            });
            dataTableColumns.push( dataTableColumn );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
    }

    const dataTable_RootTableDataObject_Both_ColumnArrays = new DataTable_RootTableDataObject_Both_ColumnArrays({ columns : dataTableColumns, columns_tableDownload : dataTable_Column_DownloadTable_Entries});

    return dataTable_RootTableDataObject_Both_ColumnArrays;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

/////////////

/**
 *
 * @param data_For_ModMass
 * @param projectSearchIds
 * @param searchSubGroups_DisplayOrder_Filtered
 * @param modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
 * @param all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 * @param modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
 */
const _getDataTableRows =  async function (
    {
        force_AlwaysShow_Search_SubSearch_SubTable,
        data_For_ModMass,
        projectSearchIds,
        projectSearchId_Or_SubSearchId_Set_PossiblyFiltered,
        searchSubGroups_DisplayOrder_Filtered,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    } : {
        force_AlwaysShow_Search_SubSearch_SubTable: boolean
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass
        projectSearchIds: Array<number>
        projectSearchId_Or_SubSearchId_Set_PossiblyFiltered: Set<number>
        searchSubGroups_DisplayOrder_Filtered: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    }
) : Promise<Array<DataTable_DataRowEntry>> { try {

    const dataTableRows : Array<DataTable_DataRowEntry> = [];

    const modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result =
        await modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass({
            projectSearchId_Or_SubSearchId_Set_PossiblyFiltered,
            data_For_ModMass,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

    const getProteinDataForModMass_Result = await _getProteinDataForModMass({
        data_For_ModMass,
        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,
        projectSearchIds,
        projectSearchId_Or_SubSearchId_Set_PossiblyFiltered,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    });

    const allProteinDataForModMass: Array<ModPage_get_ProteinList_SubTable__SingleProteinData_Root> = getProteinDataForModMass_Result.singleProteinData_Root_Array

    for ( const proteinData of allProteinDataForModMass ) {

        const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
        const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

        // add the name
        {
            const clickCallback =
                (params: ModPage_ProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback_Params) : void => { try {

                    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function({
                        proteinSequenceVersionId: params.proteinId,
                        ctrlKey_From_ClickEvent: params.ctrlKey_From_ClickEvent,
                        metaKey_From_ClickEvent: params.metaKey_From_ClickEvent,
                        modMass_Rounded_From_ModPage_ForInitialSelection: data_For_ModMass.modMass
                    })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

            const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : React.JSX.Element => { try {

                    return modPage_ProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents({
                        proteinName: proteinData.proteinName,
                        proteinId: proteinData.proteinId,
                        modMass: data_For_ModMass.modMass,
                        projectSearchIds,
                        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: getProteinDataForModMass_Result.get_Data_FromServer_Result.proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        clickCallback
                    });
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


            const valueDisplay = proteinData.proteinName;
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
                valueSort : proteinData.proteinName
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        {  //  Download ONLY  --   Protein Description

            const valueDisplay = proteinData.proteinDescription;

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );

        }

        // add modded positions
        {
            const positions: Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass> = new Array();

            for ( const loc of modPage_CompressUnlocalizedRanges(proteinData.unlocalizedPositionRanges) ) {
                positions.push(loc);
            }

            for ( const loc of proteinData.modifiedPositions ) {
                positions.push(new ModPage_Mod_Unlocalized_StartEnd_ContainerClass({start:loc, end:loc}));
            }

            positions.sort( function(a, b):number {
                if (a.start === b.start) {
                    return a.end - b.end;
                }

                return a.start - b.start;
            });

            const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : React.JSX.Element => { try {

                    return modPage_DataTable_Display_Positions_Cell_ReturnComponent({ positions })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

            const valueDisplay = positions.map(e => e.toString()).join(", ");
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        { // add modded residues

            const modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator = proteinData.modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator

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


        if ( searchSubGroups_DisplayOrder_Filtered ) {

            // add in psm counts for each sub search id

            for ( const searchSubGroup of searchSubGroups_DisplayOrder_Filtered ) {

                // add in psm counts for each project search id

                let count = 0

                const data_For_ProjectSearchId_Or_SubSearch =
                    proteinData.data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId.get( searchSubGroup.searchSubGroup_Id )

                if ( data_For_ProjectSearchId_Or_SubSearch ) {

                    count = data_For_ProjectSearchId_Or_SubSearch.dataFor_SinglePsm_Map_Key_PsmId.size
                }

                const valueDisplay = count.toString();
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : count
                });
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }

        } else {

            // add in psm counts for each project search id

            for ( const projectSearchId of projectSearchIds ) {

                let count = 0

                const data_For_ProjectSearchId_Or_SubSearch =
                    proteinData.data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId.get( projectSearchId )

                if ( data_For_ProjectSearchId_Or_SubSearch ) {

                    count = data_For_ProjectSearchId_Or_SubSearch.dataFor_SinglePsm_Map_Key_PsmId.size
                }

                const valueDisplay = count.toString();
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : count
                });
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
        }

        // call for sub table
        let dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject;



        if ( searchSubGroups_DisplayOrder_Filtered ) {

            if ( force_AlwaysShow_Search_SubSearch_SubTable || searchSubGroups_DisplayOrder_Filtered.length !== 1 ) {

                dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                        return modPage_Get_ProteinData_By_SubSearch_List_SubTableGenerator({
                            data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId: proteinData.data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId,
                            data_For_ModMass,
                            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                            modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,
                            modPage_get_ProteinList_SubTable__SingleProteinData_Root: proteinData,

                            projectSearchIds,

                            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                        })
                    }
            } else {

                dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                        return modPage_Get_PeptideList_ForModMassProteinAndSearch_SubTableGenerator({
                            projectSearchId_Or_SubSearchId: searchSubGroups_DisplayOrder_Filtered[ 0 ].searchSubGroup_Id,
                            projectSearchId_ForUseWhereRequire_projectSearchId: projectSearchIds[ 0 ],
                            modPage_get_ProteinList_SubTable__SingleProteinData_Root: proteinData,
                            modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,
                            data_For_ModMass,
                            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                        })
                    };
            }

        } else {

            if ( force_AlwaysShow_Search_SubSearch_SubTable || projectSearchIds.length !== 1 ) {

                dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                        return modPage_Get_ProteinData_BySearch_List_SubTableGenerator({
                            data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId: proteinData.data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId,
                            data_For_ModMass,
                            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                            modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,
                            modPage_get_ProteinList_SubTable__SingleProteinData_Root: proteinData,

                            projectSearchIds,
                            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                        })
                    }
            } else {

                dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                        return modPage_Get_PeptideList_ForModMassProteinAndSearch_SubTableGenerator({
                            projectSearchId_Or_SubSearchId: projectSearchIds[ 0 ],
                            projectSearchId_ForUseWhereRequire_projectSearchId: projectSearchIds[ 0 ],
                            modPage_get_ProteinList_SubTable__SingleProteinData_Root: proteinData,
                            modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,
                            data_For_ModMass,
                            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                        })
                    };
            }
        }

        const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

        // add this row to the rows
        const dataTable_DataRowEntry = new DataTable_DataRowEntry({
            uniqueId : proteinData.proteinId,
            sortOrder_OnEquals : proteinData.proteinId,
            columnEntries,
            dataTable_DataRowEntry_DownloadTable,
            dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject
        });

        dataTableRows.push( dataTable_DataRowEntry );
    }

    // The sorting NEEDS to happen before here

    // console.warn( "Currently sorting the dataTableRows rows for Mod Page Protein List.  It would be much better to sort the data BEFORE creating the dataTableRows ")

    if ( projectSearchIds.length === 1 && ( ! searchSubGroups_DisplayOrder_Filtered ) ) {

        // sort by psm count if there is one project search id
        dataTableRows.sort((function(a, b) {

            if ( ! limelight__variable_is_type_number_Check( b.columnEntries[3].valueSort ) ) {
                const msg = "static async getDataTableRows: b.columnEntries[3].valueSort is not a number.  b.columnEntries[3].valueSort: " + b.columnEntries[3].valueSort;
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__variable_is_type_number_Check( a.columnEntries[3].valueSort ) ) {
                const msg = "static async getDataTableRows: a.columnEntries[3].valueSort is not a number.  a.columnEntries[3].valueSort: " + a.columnEntries[3].valueSort;
                console.warn( msg );
                throw Error( msg );
            }

            if ( b.columnEntries[3].valueSort !== a.columnEntries[3].valueSort ) {

                //  PSM Count is different so sort on that
                return (b.columnEntries[3].valueSort as number) - (a.columnEntries[3].valueSort as number);
            }

            // sort by protein name otherwise
            if(a.columnEntries[0].valueSort < b.columnEntries[0].valueSort) {
                return -1;
            }
            if(a.columnEntries[0].valueSort > b.columnEntries[0].valueSort) {
                return 1;
            }
            return 0;
        }));

    } else {

        // sort by protein name otherwise
        dataTableRows.sort((function(a, b) {
            if(a.columnEntries[0].valueSort < b.columnEntries[0].valueSort) {
                return -1;
            }
            if(a.columnEntries[0].valueSort > b.columnEntries[0].valueSort) {
                return 1;
            }
            return 0;
        }));
    }



    return dataTableRows;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

/**
 * Get protein data for a mod mass in a group of project search ids
 * For each protein+project search id we need:
 *      protein name
 *      protein id
 *      modified residues (with this mod mass)
 *      positions in the protein modified by this mod mass
 *      map of project search id => # of psms for this mod in this protein in this search
 *
 * Return:
 */
const _getProteinDataForModMass = async function (
    {
        data_For_ModMass,
        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,
        projectSearchIds,
        projectSearchId_Or_SubSearchId_Set_PossiblyFiltered,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }:{
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass
        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result: ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_Root
        projectSearchIds: Array<number>
        projectSearchId_Or_SubSearchId_Set_PossiblyFiltered: Set<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : Promise<{
    singleProteinData_Root_Array: Array<ModPage_get_ProteinList_SubTable__SingleProteinData_Root>
    get_Data_FromServer_Result: Internal_get_Data_FromServer_Result
}> { try {

    const projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set = new Set( projectSearchIds )

    const data_FromServer = await _get_Data_FromServer({
        projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    })

    const proteinData_Output_Map_Key_ProteinSequenceVersionId :Map<number, ModPage_get_ProteinList_SubTable__SingleProteinData_Root> = new Map()

    for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

        const projectSearchId_Or_SubSearchId = data_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId

        if ( ! projectSearchId_Or_SubSearchId_Set_PossiblyFiltered.has( projectSearchId_Or_SubSearchId ) ) {
            //  Skip since not being included
            continue  // EARLY CONTINUE
        }

        const projectSearchId_ForUseWhereRequire_projectSearchId = data_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId

        for ( const dataFor_SinglePsm of data_ForSingle_ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_All() ) {

            const protein_Positions_Residues_ForPsm = modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result.get_data_For_SinglePsm_For_PsmId( dataFor_SinglePsm.psmId )
            if ( ! protein_Positions_Residues_ForPsm ) {
                throw Error("modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result.get_data_For_SinglePsm_For_PsmId( dataFor_SinglePsm.psmId ) returned NOTHING for dataFor_SinglePsm.psmId: " + dataFor_SinglePsm.psmId )
            }

            for ( const data_ForProtein_Positions_Residues of protein_Positions_Residues_ForPsm.get_Data_PerProtein_For_ProteinSequenceVersionId_All() ) {

                let proteinData_Output = proteinData_Output_Map_Key_ProteinSequenceVersionId.get( data_ForProtein_Positions_Residues.proteinSequenceVersionId )
                if ( ! proteinData_Output ) {

                    proteinData_Output = {
                        proteinId: data_ForProtein_Positions_Residues.proteinSequenceVersionId,
                        proteinName: "Protein Name: " + data_ForProtein_Positions_Residues.proteinSequenceVersionId,
                        proteinDescription: "Protein Desc: " + data_ForProtein_Positions_Residues.proteinSequenceVersionId,

                        modifiedPositions: new Set(),
                        unlocalizedPositionRanges: [],

                        modifiedResidues: new Set(),

                        modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator: new ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator(),

                        data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId: new Map()
                    }

                    proteinData_Output_Map_Key_ProteinSequenceVersionId.set( data_ForProtein_Positions_Residues.proteinSequenceVersionId, proteinData_Output )
                }

                if ( data_ForProtein_Positions_Residues.modifiedPositions_VariableAndOpen_Modifications ) {
                    for ( const position of data_ForProtein_Positions_Residues.modifiedPositions_VariableAndOpen_Modifications ) {
                        proteinData_Output.modifiedPositions.add( position )
                    }
                }
                if ( data_ForProtein_Positions_Residues.modifiedResidues_VariableAndOpen_Modifications ) {
                    for ( const residue of data_ForProtein_Positions_Residues.modifiedResidues_VariableAndOpen_Modifications ) {
                        proteinData_Output.modifiedResidues.add( residue )
                    }
                }
                if ( data_ForProtein_Positions_Residues.unlocalizedPositionRanges ) {
                    for ( const range of data_ForProtein_Positions_Residues.unlocalizedPositionRanges ) {
                        proteinData_Output.unlocalizedPositionRanges.push( range )
                    }
                }

                let data_Output_for_ProjectSearchId_Or_SubSearch = proteinData_Output.data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
                if ( ! data_Output_for_ProjectSearchId_Or_SubSearch ) {
                    data_Output_for_ProjectSearchId_Or_SubSearch = {
                        projectSearchId_Or_SubSearchId: projectSearchId_Or_SubSearchId,
                        projectSearchId_ForUseWhereRequire_projectSearchId: projectSearchId_ForUseWhereRequire_projectSearchId,
                        dataFor_SinglePsm_Map_Key_PsmId: new Map(),
                        singleProteinData_Root: proteinData_Output
                    }
                    proteinData_Output.data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId.set( data_Output_for_ProjectSearchId_Or_SubSearch.projectSearchId_Or_SubSearchId, data_Output_for_ProjectSearchId_Or_SubSearch )
                }

                data_Output_for_ProjectSearchId_Or_SubSearch.dataFor_SinglePsm_Map_Key_PsmId.set( dataFor_SinglePsm.psmId, dataFor_SinglePsm )
            }

            for ( const modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__ForSingle__ProteinSequenceVersionId
                of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get_modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__FOR__ALL__ProteinSequenceVersionId() ) {


                let proteinData_Output = proteinData_Output_Map_Key_ProteinSequenceVersionId.get( modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__ForSingle__ProteinSequenceVersionId.proteinSequenceVersionId__WhenForSpecificProtein )
                if ( ! proteinData_Output ) {

                    proteinData_Output = {
                        proteinId: modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__ForSingle__ProteinSequenceVersionId.proteinSequenceVersionId__WhenForSpecificProtein,
                        proteinName: "Protein Name: " + modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__ForSingle__ProteinSequenceVersionId.proteinSequenceVersionId__WhenForSpecificProtein,
                        proteinDescription: "Protein Desc: " + modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__ForSingle__ProteinSequenceVersionId.proteinSequenceVersionId__WhenForSpecificProtein,

                        modifiedPositions: new Set(),
                        unlocalizedPositionRanges: [],

                        modifiedResidues: new Set(),

                        modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator: new ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator(),

                        data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId: new Map()
                    }

                    proteinData_Output_Map_Key_ProteinSequenceVersionId.set( modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__ForSingle__ProteinSequenceVersionId.proteinSequenceVersionId__WhenForSpecificProtein, proteinData_Output )
                }

                proteinData_Output.
                modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.
                add__dataFor_SinglePsm__modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm({
                    modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm: modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__ForSingle__ProteinSequenceVersionId
                })
            }
        }
    }


    const proteinDataForModMass : Array<ModPage_get_ProteinList_SubTable__SingleProteinData_Root> = Array.from( proteinData_Output_Map_Key_ProteinSequenceVersionId.values() );

    //  Set Protein Names and Descriptions

    for ( const proteinDataEntry of proteinDataForModMass ) {

        const proteinNames_Set: Set<string> = new Set()
        const proteinDescriptions_Set: Set<string> = new Set()

        for ( const data_For_ProjectSearchId_Or_SubSearch of proteinDataEntry.data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId.values() ) {

            const projectSearchId = data_For_ProjectSearchId_Or_SubSearch.projectSearchId_ForUseWhereRequire_projectSearchId

            if ( ! projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set.has( projectSearchId ) ) {

                //  Skip since not in requested projectSearchIds
                continue  // EARLY CONTINUE
            }

            const proteinInfo_For_MainFilters_Holder = data_FromServer.proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( ! proteinInfo_For_MainFilters_Holder ) {
                throw Error("data_FromServer.proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }
            const proteinInfo_For_ProteinSequenceVersionId = proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinDataEntry.proteinId )
            if ( ! proteinInfo_For_ProteinSequenceVersionId ) {
                throw Error("proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinDataEntry.proteinId ) returned NOTHING for proteinDataEntry.proteinId: " + proteinDataEntry.proteinId )
            }

            for ( const proteinAnnotation of proteinInfo_For_ProteinSequenceVersionId.annotations ) {
                proteinNames_Set.add( proteinAnnotation.name )
                proteinDescriptions_Set.add( proteinAnnotation.description )
            }
        }

        proteinDataEntry.proteinName = Array.from( proteinNames_Set ).sort().join(", ") // + " :PROTEIN ID: " + proteinDataEntry.proteinId
        proteinDataEntry.proteinDescription = Array.from( proteinDescriptions_Set ).sort().join(", ")
    }

    return {
        singleProteinData_Root_Array: proteinDataForModMass,
        get_Data_FromServer_Result: data_FromServer
    };

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

//////////////

/**
 *
 */
class Internal_get_Data_FromServer_Result {
    proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder>
}

/**
 *
 * @param projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 */
const _get_Data_FromServer = function (
    {
        projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set: Set<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : Promise<Internal_get_Data_FromServer_Result> {

    const proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder> = new Map()

    const promises: Array<Promise<void>> = []

    for ( const projectSearchId of projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        {
            const get_ProteinInfoHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters().get_ProteinInfoHolder_AllForSearch();

            if ( get_ProteinInfoHolder_AllForSearch_Result.data ) {
                proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_ProteinInfoHolder_AllForSearch_Result.data.proteinInfo_For_MainFilters_Holder )
            } else if ( get_ProteinInfoHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_ProteinInfoHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                    get_ProteinInfoHolder_AllForSearch_Result.promise.then(value => { try {
                        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.proteinInfo_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_ProteinInfoHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }
    }

    if ( promises.length === 0 ) {

        return Promise.resolve({
            proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId
        })
    }

    const promisesAll = Promise.all( promises )

    return new Promise<Internal_get_Data_FromServer_Result>( (resolve, reject) =>  { try {

        promisesAll.catch(reason => reject(reason))
        promisesAll.then(novalue => { try {

            resolve({
                proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

}

///////////////////////////
///////////////////////////

export class ModPage_get_ProteinList_SubTable__SingleProteinData_Root {

    /**
     * AKA ProteinSequenceVersionId
     */
    proteinId: number

    proteinName: string
    proteinDescription: string

    modifiedPositions: Set<number>
    unlocalizedPositionRanges: Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass>

    modifiedResidues: Set<string>

    modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator: ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator

    data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId: Map<number, ModPage_get_ProteinList_SubTable__SingleProteinData_Per_ProjectSearchId_Or_SubSearch>
}


export class ModPage_get_ProteinList_SubTable__SingleProteinData_Per_ProjectSearchId_Or_SubSearch {

    projectSearchId_Or_SubSearchId: number
    projectSearchId_ForUseWhereRequire_projectSearchId: number

    dataFor_SinglePsm_Map_Key_PsmId: Map<number, ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm>

    singleProteinData_Root: ModPage_get_ProteinList_SubTable__SingleProteinData_Root
}

