/**
 * modPage_Get_ProteinData_By_SubSearch_List_SubTableGenerator.ts
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
    ModPage_Mod_Unlocalized_StartEnd_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_Mod_Unlocalized_StartEnd_ContainerClass";
import {
    ModPage_get_ProteinList_SubTable__SingleProteinData_Per_ProjectSearchId_Or_SubSearch,
    ModPage_get_ProteinList_SubTable__SingleProteinData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_get_ProteinList_SubTable";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    SearchDataLookupParameters_Root
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    GeneratedPeptideContents_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {
    ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    ProteinPositionFilter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {
    DataPageStateManager, SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry,
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass";
import {
    modPage_Get_PeptideList_ForModMassProteinAndSearch_SubTableGenerator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_Get_PeptideList_ForModMassProteinAndSearch_SubTableGenerator";
import {
    modPage_DataTable_Display_Positions_Cell_ReturnComponent
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_DataTable_Display_Positions_Cell_Component";
import {
    modPage_CompressUnlocalizedRanges
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_CompressUnlocalizedRanges";
import {
    searchSubGroup_Get_Selected_SearchSubGroupIds
} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";


//////////////////////


const dataTableId_ThisTable = "Mod View Protein List By Sub Search Sub Table";




export const modPage_Get_ProteinData_By_SubSearch_List_SubTableGenerator  = async function (
    {
        data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId,
        data_For_ModMass,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,
        modPage_get_ProteinList_SubTable__SingleProteinData_Root,

        projectSearchIds,
        searchDataLookupParameters_Root,
        generatedPeptideContents_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        proteinPositionFilter_UserSelections_StateObject,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        dataPageStateManager_DataFrom_Server
    } : {
        data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId: Map<number, ModPage_get_ProteinList_SubTable__SingleProteinData_Per_ProjectSearchId_Or_SubSearch>

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result: ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_Root
        modPage_get_ProteinList_SubTable__SingleProteinData_Root: ModPage_get_ProteinList_SubTable__SingleProteinData_Root

        projectSearchIds: Array<number>
        searchDataLookupParameters_Root : SearchDataLookupParameters_Root

        generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject //  To limit which proteins are displayed when expand mod mass table row
        dataPageStateManager_DataFrom_Server : DataPageStateManager

    }):Promise<DataTable_RootTableObject> { try {

    // create the columns for the table
    const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getDataTableColumns();

    // create the rows for the table
    const dataTableRows : Array<DataTable_DataRowEntry> = await _getDataTableRows({
        data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId,
        modPage_get_ProteinList_SubTable__SingleProteinData_Root,
        data_For_ModMass,
        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,

        searchDataLookupParameters_Root,
        generatedPeptideContents_UserSelections_StateObject,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        dataPageStateManager_DataFrom_Server
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
            id : "searchProteinPSMCount", // Used for tracking sort order. Keep short
            displayName,
            width : 100,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "Positions";

        const dataTableColumn = new DataTable_Column({
            id : "searchProteinModPos", // Used for tracking sort order. Keep short
            displayName,
            width : 100,
            sortable : false
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "Residues";

        const dataTableColumn = new DataTable_Column({
            id : "searchProteinModRes", // Used for tracking sort order. Keep short
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
        data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId,
        modPage_get_ProteinList_SubTable__SingleProteinData_Root,
        data_For_ModMass,
        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,

        searchDataLookupParameters_Root,
        generatedPeptideContents_UserSelections_StateObject,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        dataPageStateManager_DataFrom_Server
    } : {
        data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId: Map<number, ModPage_get_ProteinList_SubTable__SingleProteinData_Per_ProjectSearchId_Or_SubSearch>

        modPage_get_ProteinList_SubTable__SingleProteinData_Root: ModPage_get_ProteinList_SubTable__SingleProteinData_Root
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result: ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_Root

        searchDataLookupParameters_Root : SearchDataLookupParameters_Root

        generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        dataPageStateManager_DataFrom_Server : DataPageStateManager

    }
) : Promise<Array<DataTable_DataRowEntry>> { try {

    let searchSubGroups_ForProjectSearchId: SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry = undefined
    let projectSearchId__searchSubGroups_ForProjectSearchId: number = undefined


    const dataTableRows : Array<DataTable_DataRowEntry> = [];

    const allProteinData_ForSearches_ForModMass = await _getProteinData_PerSearch_ForModMass({
        modPage_get_ProteinList_SubTable__SingleProteinData_Root,
        data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId,
        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,
    });

    for ( const proteinData of allProteinData_ForSearches_ForModMass ) {

        const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
        const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

        // add the name
        {
            {
                let populate__searchSubGroups_ForProjectSearchId = false
                if ( ! searchSubGroups_ForProjectSearchId ) {

                    populate__searchSubGroups_ForProjectSearchId = true

                } else if ( projectSearchId__searchSubGroups_ForProjectSearchId !== proteinData.projectSearchId_ForUseWhereRequire_projectSearchId ) {

                    populate__searchSubGroups_ForProjectSearchId = true
                }

                if ( populate__searchSubGroups_ForProjectSearchId ) {
                    projectSearchId__searchSubGroups_ForProjectSearchId = proteinData.projectSearchId_ForUseWhereRequire_projectSearchId
                    searchSubGroups_ForProjectSearchId = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId__searchSubGroups_ForProjectSearchId );

                    if ( ! searchSubGroups_ForProjectSearchId ) {
                        const msg = "returned nothing: dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId__searchSubGroups_ForProjectSearchId ), projectSearchId__searchSubGroups_ForProjectSearchId: " + projectSearchId__searchSubGroups_ForProjectSearchId;
                        console.warn( msg )
                        throw Error( msg )
                    }
                }
            }

            const searchSubGroup_For_SearchSubGroup_Id = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( proteinData.projectSearchId_Or_SubSearchId )
            if ( ! searchSubGroup_For_SearchSubGroup_Id ) {
                const msg = "returned nothing: searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( proteinData.projectSearchId_Or_SubSearchId ), proteinData.projectSearchId_Or_SubSearchId: " + proteinData.projectSearchId_Or_SubSearchId;
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
                valueSort : proteinData.projectSearchId_Or_SubSearchId
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        // add psm count
        {
            const value = proteinData.data_For_ProjectSearchId_Or_SubSearchId.dataFor_SinglePsm_Map_Key_PsmId.size

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

        // add modded positions
        {
            const positions:Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass> = new Array();

            for ( const loc of modPage_CompressUnlocalizedRanges(proteinData.unlocalizedPositionRanges) ) {
                positions.push(loc);
            }

            for ( const loc of proteinData.modifiedPositions ) {
                positions.push(new ModPage_Mod_Unlocalized_StartEnd_ContainerClass({start:loc, end:loc}));
            }

            positions.sort( function(a, b):number {
                if(a.start === b.start) {
                    return a.end - b.end;
                }

                return a.start - b.start;
            });


            const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => { try {

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

        // add modded residues
        {
            const valueDisplay = Array.from(proteinData.modifiedResidues).sort().join(', ');
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

                    return modPage_Get_PeptideList_ForModMassProteinAndSearch_SubTableGenerator({
                        projectSearchId_Or_SubSearchId: proteinData.projectSearchId_Or_SubSearchId,
                        projectSearchId_ForUseWhereRequire_projectSearchId: proteinData.projectSearchId_ForUseWhereRequire_projectSearchId,
                        modPage_get_ProteinList_SubTable__SingleProteinData_Root,
                        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,
                        data_For_ModMass,
                        searchDataLookupParameters_Root,
                        generatedPeptideContents_UserSelections_StateObject,
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                        dataPageStateManager_DataFrom_Server
                    })
                };

        const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

        // add this row to the rows
        const dataTable_DataRowEntry = new DataTable_DataRowEntry({
            uniqueId : proteinData.projectSearchId_Or_SubSearchId,
            sortOrder_OnEquals : proteinData.projectSearchId_Or_SubSearchId,
            columnEntries,
            dataTable_DataRowEntry_DownloadTable,
            dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject
        });

        dataTableRows.push( dataTable_DataRowEntry );
    }

    return dataTableRows;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


///////////


const _getProteinData_PerSearch_ForModMass = async function (
    {
        modPage_get_ProteinList_SubTable__SingleProteinData_Root,
        data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId,
        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result,
    } : {
        modPage_get_ProteinList_SubTable__SingleProteinData_Root: ModPage_get_ProteinList_SubTable__SingleProteinData_Root
        data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId: Map<number, ModPage_get_ProteinList_SubTable__SingleProteinData_Per_ProjectSearchId_Or_SubSearch>

        modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result: ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_Root
    }
) : Promise<Array<INTERNAL__ProteinData_ForSingleSearch>> { try {

    const proteinData_Output_Map_Key_ProteinSequenceVersionId :Map<number, INTERNAL__ProteinData_ForSingleSearch> = new Map()

    for ( const data_For_ProjectSearchId_Or_SubSearchId of data_Per_ProjectSearchId_Or_SubSearchId_Map_Key__ProjectSearchId_Or_SubSearchId.values() ) {

        const projectSearchId_Or_SubSearchId = data_For_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId
        const projectSearchId_ForUseWhereRequire_projectSearchId = data_For_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId
        // data_For_ProjectSearchId_Or_SubSearchId.dataFor_SinglePsm_Map_Key_PsmId

        for ( const dataFor_SinglePsm of data_For_ProjectSearchId_Or_SubSearchId.dataFor_SinglePsm_Map_Key_PsmId.values() ) {

            // dataFor_SinglePsm.psmId

            // dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm

            const protein_Positions_Residues_ForPsm = modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result.get_data_For_SinglePsm_For_PsmId( dataFor_SinglePsm.psmId )
            if ( ! protein_Positions_Residues_ForPsm ) {
                throw Error("modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result.get_data_For_SinglePsm_For_PsmId( dataFor_SinglePsm.psmId ) returned NOTHING for dataFor_SinglePsm.psmId: " + dataFor_SinglePsm.psmId )
            }

            const data_ForProtein_Positions_Residues = protein_Positions_Residues_ForPsm.get_data_PerProtein_For_ProteinSequenceVersionId( modPage_get_ProteinList_SubTable__SingleProteinData_Root.proteinId )
            if ( ! data_ForProtein_Positions_Residues ) {
                //  NO data for Protein Id
                throw Error("protein_Positions_Residues_ForPsm.get_data_PerProtein_For_ProteinSequenceVersionId( modPage_get_ProteinList_SubTable__SingleProteinData_Root.proteinId ) returned NOTHING for modPage_get_ProteinList_SubTable__SingleProteinData_Root.proteinId: " + modPage_get_ProteinList_SubTable__SingleProteinData_Root.proteinId )
            }

            // data_ForProtein_Positions_Residues.proteinSequenceVersionId
            // data_ForProtein_Positions_Residues.modifiedResidues
            // data_ForProtein_Positions_Residues.modifiedPositions
            // data_ForProtein_Positions_Residues.unlocalizedPositionRanges

            let proteinData_Output = proteinData_Output_Map_Key_ProteinSequenceVersionId.get( projectSearchId_Or_SubSearchId )
            if ( ! proteinData_Output ) {

                proteinData_Output = {

                    projectSearchId_Or_SubSearchId,
                    projectSearchId_ForUseWhereRequire_projectSearchId,

                    modifiedPositions: new Set(),
                    unlocalizedPositionRanges: [],

                    modifiedResidues: new Set(),

                    data_For_ProjectSearchId_Or_SubSearchId
                }

                proteinData_Output_Map_Key_ProteinSequenceVersionId.set( projectSearchId_Or_SubSearchId, proteinData_Output )
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
        }
    }


    const proteinData_ForSearchForModMass = Array.from( proteinData_Output_Map_Key_ProteinSequenceVersionId.values() );

    return proteinData_ForSearchForModMass;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}





class INTERNAL__ProteinData_ForSingleSearch {

    readonly projectSearchId_Or_SubSearchId: number
    readonly projectSearchId_ForUseWhereRequire_projectSearchId: number
    readonly modifiedResidues: Set<string>
    readonly modifiedPositions: Set<number>
    readonly unlocalizedPositionRanges: Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass>

    data_For_ProjectSearchId_Or_SubSearchId: ModPage_get_ProteinList_SubTable__SingleProteinData_Per_ProjectSearchId_Or_SubSearch
}
