/**
 * modPage_Get_PeptideList_ForModMassAndSearch_SubTableGenerator.tsx
 *
 * Used when there are no proteins
 */


// import {
//     DataTable_Column,
//     DataTable_Column_DownloadTable,
//     DataTable_Column_sortFunction_Param,
//     DataTable_DataRow_ColumnEntry,
//     DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
//     DataTable_DataRow_ColumnEntry_SearchTableData,
//     DataTable_DataRowEntry,
//     DataTable_DataRowEntry__Get_RowChildContent_CallParams,
//     DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent,
//     DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent,
//     DataTable_DataRowEntry_DownloadTable,
//     DataTable_DataRowEntry_DownloadTable_SingleColumn,
//     DataTable_RootTableDataObject,
//     DataTable_RootTableDataObject_Both_ColumnArrays,
//     DataTable_RootTableObject,
//     DataTable_TableOptions,
// } from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
// import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
// import {OpenModPosition_DataType} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";
// import {
//     DataPageStateManager,
//     SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
// } from "page_js/data_pages/data_pages_common/dataPageStateManager";
// import {
//     PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
// } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";
// import { psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__root_component_and_code/psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent";
// import { PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component";
// import {
//     ModPage_Mod_Unlocalized_StartEnd_ContainerClass
// } from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_Mod_Unlocalized_StartEnd_ContainerClass";
// import {
//     CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
// } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
// import {
//     ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
//     ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass,
//     ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId,
//     ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm
// } from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
// import {
//     ModPage_get_ProteinList_SubTable__SingleProteinData_Root
// } from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_get_ProteinList_SubTable";
// import {
//     ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_Root
// } from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass";
// import {
//     GeneratedPeptideContents_UserSelections_StateObject
// } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
// import {
//     SearchDataLookupParameters_Root
// } from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
// import {
//     CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
// } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
// import {
//     modPage_DataTable_Display_Positions_Cell_ReturnComponent
// } from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_DataTable_Display_Positions_Cell_Component";
// import {
//     modPage_CompressUnlocalizedRanges
// } from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_CompressUnlocalizedRanges";
// import {
//     searchSubGroup_Get_Selected_SearchSubGroupIds
// } from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
// import {
//     Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId
// } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
// import {
//     modPage_Create_GeneratedReportedPeptideEntries_String_Etc
// } from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Create_GeneratedReportedPeptideEntries_String_Etc";
// import {
//     ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
// } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
// import {
//     ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
// } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
// import {
//     ProteinPositionFilter_UserSelections_StateObject
// } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
//
//
//
//
// const dataTableId_ThisTable = "Mod View Peptide List Under Mod Mass By Search Sub Table";
//
//
// export const modPage_Get_PeptideList_ForModMassAndSearch_SubTableGenerator = async function (
//     {
//         projectSearchId_Or_SubSearchId,
//         projectSearchId_ForUseWhereRequire_projectSearchId,
//         data_For_ModMass,
//         searchDataLookupParameters_Root,
//         generatedPeptideContents_UserSelections_StateObject,
//         commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
//         dataPageStateManager_DataFrom_Server
//     } : {
//         projectSearchId_Or_SubSearchId: number
//         projectSearchId_ForUseWhereRequire_projectSearchId: number
//         data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass
//         searchDataLookupParameters_Root : SearchDataLookupParameters_Root
//
//         generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
//         commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
//         dataPageStateManager_DataFrom_Server : DataPageStateManager
//     }
// ) : Promise<DataTable_RootTableObject> { try {
//
//     const data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId)
//     if ( ! data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId ) {
//         throw Error("data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId ) returned NOTHING for projectSearchId_Or_SubSearchId: " + projectSearchId_Or_SubSearchId )
//     }
//
//     const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
//         commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId_ForUseWhereRequire_projectSearchId)
//     if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
//         throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId_ForUseWhereRequire_projectSearchId) returned NOTHING for projectSearchId_ForUseWhereRequire_projectSearchId: " + projectSearchId_ForUseWhereRequire_projectSearchId )
//     }
//
//     // create the columns for the table
//     const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getDataTableColumns();
//
//     // create the rows for the table
//     const dataTableRows : Array<DataTable_DataRowEntry> = await _getDataTableRows({
//         data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId,
//         data_For_ModMass,
//         searchDataLookupParameters_Root,
//         generatedPeptideContents_UserSelections_StateObject,
//         commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
//         commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
//         dataPageStateManager_DataFrom_Server
//     });
//
//     // assemble the table
//     const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
//         columns : dataTable_RootTableDataObject_Both_ColumnArrays.columns,
//         columns_tableDownload : dataTable_RootTableDataObject_Both_ColumnArrays.columns_tableDownload,
//         dataTable_DataRowEntries: dataTableRows
//     });
//
//     const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: false});
//
//     const dataTable_RootTableObject = new DataTable_RootTableObject({
//         dataTableId : dataTableId_ThisTable,
//         tableOptions,
//         tableDataObject : dataTable_RootTableDataObject
//     });
//
//     return dataTable_RootTableObject;
//
// } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
//
// /**
//  *
//  */
// const  _getDataTableColumns = function () : DataTable_RootTableDataObject_Both_ColumnArrays { try {
//
//     const dataTableColumns : Array<DataTable_Column> = [];
//     const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];
//
//     {
//         const displayName = "Peptide";
//
//         const dataTableColumn = new DataTable_Column({
//             id : "modListGeneratedPeptide", // Used for tracking sort order. Keep short
//             displayName,
//             width : 500,
//             sortable : true
//         });
//         dataTableColumns.push( dataTableColumn );
//
//         const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
//         dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
//     }
//
//     {
//         const displayName = "PSMs";
//
//         const dataTableColumn = new DataTable_Column({
//             id : "searchProteinPSMCount", // Used for tracking sort order. Keep short
//             displayName,
//             width : 100,
//             sortable : true
//         });
//         dataTableColumns.push( dataTableColumn );
//
//         const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
//         dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
//     }
//
//     {
//
//         const sortFunction = function(param : DataTable_Column_sortFunction_Param ): number {
//
//             const arrayA = param.sortValue_A as Array<number>;
//             const arrayB = param.sortValue_B as Array<number>
//
//             // handle blanks
//             if ( arrayA.length === 0 && arrayB.length === 0 ) { return 0; }
//             if ( arrayA.length === 0 && arrayB.length !== 0 ) { return -1; }
//             if ( arrayA.length !== 0 && arrayB.length === 0 ) { return 1; }
//
//             return arrayA[0] - arrayB[0];
//         }
//
//         const displayName = "Positions";
//
//         const dataTableColumn = new DataTable_Column({
//
//             id : "searchProteinModPos", // Used for tracking sort order. Keep short
//             displayName,
//             width : 100,
//             sortable : true,
//             sortFunction:sortFunction
//         });
//         dataTableColumns.push( dataTableColumn );
//
//         const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
//         dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
//     }
//
//     {
//         const displayName = "Residues";
//
//         const dataTableColumn = new DataTable_Column({
//
//             id : "searchProteinModRes", // Used for tracking sort order. Keep short
//             displayName,
//             width : 100,
//             sortable : true
//         });
//         dataTableColumns.push( dataTableColumn );
//
//         const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
//         dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
//     }
//
//     const dataTable_RootTableDataObject_Both_ColumnArrays = new DataTable_RootTableDataObject_Both_ColumnArrays({ columns: dataTableColumns, columns_tableDownload: dataTable_Column_DownloadTable_Entries });
//
//     return dataTable_RootTableDataObject_Both_ColumnArrays;
//
// } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
//
// ///////////////////////////
//
//
// const _getDataTableRows = async function (
//     {
//         data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId,
//         data_For_ModMass,
//         searchDataLookupParameters_Root,
//
//         generatedPeptideContents_UserSelections_StateObject,
//         commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
//         commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
//         dataPageStateManager_DataFrom_Server,
//     } : {
//         data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId
//         data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass
//         searchDataLookupParameters_Root : SearchDataLookupParameters_Root
//
//         generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
//         commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
//         commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
//         dataPageStateManager_DataFrom_Server : DataPageStateManager
//     }
// ) : Promise<Array<DataTable_DataRowEntry>> { try {
//
//     const projectSearchId = data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId
//
//     const dataTableRows : Array<DataTable_DataRowEntry> = [];
//
//     const allPeptideData_For_ProteinAndModMass:Array<INTERNAL__PeptideDataForModProteinSearch> = await _getPeptideDataForModSearch({
//         data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId,
//         data_For_ModMass,
//         generatedPeptideContents_UserSelections_StateObject,
//         commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
//         commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
//         dataPageStateManager_DataFrom_Server
//     });
//
//     allPeptideData_For_ProteinAndModMass.sort( (a,b) => {
//
//         //  PSM Count descending then peptide string ascending
//
//         if ( a.psmEntries_Map_Key_PsmId.size > b.psmEntries_Map_Key_PsmId.size ) {
//             return -1
//         }
//         if ( a.psmEntries_Map_Key_PsmId.size < b.psmEntries_Map_Key_PsmId.size ) {
//             return 1
//         }
//
//         if ( a.peptideDisplayString < b.peptideDisplayString ) {
//             return -1
//         }
//         if ( a.peptideDisplayString > b.peptideDisplayString ) {
//             return 1
//         }
//
//         return 0
//     })
//
//     for ( const peptideData of allPeptideData_For_ProteinAndModMass ) {
//
//         const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
//         const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];
//
//         // add the name
//         {
//             const valueDisplay = peptideData.peptideDisplayString;
//             const searchEntriesForColumn : Array<string> = [ valueDisplay ]
//             const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
//             const columnEntry = new DataTable_DataRow_ColumnEntry({
//                 searchTableData,
//                 valueDisplay,
//                 valueSort : peptideData.peptideDisplayString
//             });
//             columnEntries.push( columnEntry );
//
//             const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
//             dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
//         }
//
//         // add psm count
//         {
//             const valueDisplay = peptideData.psmEntries_Map_Key_PsmId.size.toString();
//             const searchEntriesForColumn : Array<string> = [ valueDisplay ]
//             const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
//             const columnEntry = new DataTable_DataRow_ColumnEntry({
//                 searchTableData,
//                 valueDisplay,
//                 valueSort : peptideData.psmEntries_Map_Key_PsmId.size
//             });
//             columnEntries.push( columnEntry );
//
//             const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
//             dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
//         }
//
//         // add modded positions
//         {
//             let valueString: string
//             let valueSort_FOR_DataTable_Column_sortFunction: unknown
//
//             const positions: Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass> = []
//
//             if ( peptideData.modifiedPositions && peptideData.modifiedPositions.size > 0 ) {
//
//                 valueString = Array.from( peptideData.modifiedPositions ).sort((a, b) => a - b).join(', ');
//                 valueSort_FOR_DataTable_Column_sortFunction = Array.from( peptideData.modifiedPositions ).sort((a, b) => a - b);
//
//                 const modifiedPositions = Array.from( peptideData.modifiedPositions )
//                 modifiedPositions.sort( (a, b) => a - b )
//
//                 for ( const modifiedPosition of modifiedPositions ) {
//                     const position = new ModPage_Mod_Unlocalized_StartEnd_ContainerClass({
//                         start: modifiedPosition, end: modifiedPosition
//                     })
//                     positions.push( position )
//                 }
//
//             } else if ( peptideData.unlocalizedPositionRanges && peptideData.unlocalizedPositionRanges.length > 0 ) {
//
//                 const ranges = new Array<string>();
//                 const sorts = new Array<number>();
//
//                 peptideData.unlocalizedPositionRanges.sort( (a, b) => a.start - b.start);
//
//                 const unlocalizedPositionRanges_Compressed = modPage_CompressUnlocalizedRanges( peptideData.unlocalizedPositionRanges )
//
//                 for ( const unlocPos of unlocalizedPositionRanges_Compressed ) {
//                     sorts.push(unlocPos.start);
//                     ranges.push("[" + unlocPos.start + "-" + unlocPos.end + "]");
//                 }
//
//                 valueString = ranges.join(', ');
//                 valueSort_FOR_DataTable_Column_sortFunction = sorts;
//
//                 for ( const unlocalizedPositionRange of unlocalizedPositionRanges_Compressed ) {
//                     const position = new ModPage_Mod_Unlocalized_StartEnd_ContainerClass({
//                         start: unlocalizedPositionRange.start, end: unlocalizedPositionRange.end
//                     })
//                     positions.push( position )
//                 }
//
//             } else {
//                 valueString = '';
//                 valueSort_FOR_DataTable_Column_sortFunction = [];
//             }
//
//             const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
//                 ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => { try {
//
//                     return modPage_DataTable_Display_Positions_Cell_ReturnComponent({ positions })
//
//                 } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
//
//
//             const valueDisplay = valueString;
//
//             const searchEntriesForColumn : Array<string> = [ valueDisplay ]
//             const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
//             const columnEntry = new DataTable_DataRow_ColumnEntry({
//                 searchTableData,
//                 valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
//                 valueSort_FOR_DataTable_Column_sortFunction : valueSort_FOR_DataTable_Column_sortFunction
//             });
//
//             columnEntries.push( columnEntry );
//
//             const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
//             dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
//         }
//
//         // add modded residues
//         {
//             const valueString: string = (!(peptideData.unlocalizedPositionRanges) || peptideData.unlocalizedPositionRanges.length === 0) ? Array.from(peptideData.modifiedResidues).sort().join(', ') : 'unlocalized';
//
//             const valueDisplay = valueString;
//             const searchEntriesForColumn : Array<string> = [ valueDisplay ]
//             const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
//             const columnEntry = new DataTable_DataRow_ColumnEntry({
//                 searchTableData,
//                 valueDisplay,
//                 valueSort : valueString
//             });
//             columnEntries.push( columnEntry );
//
//             const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
//             dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
//         }
//
//         //  cast as ReadonlyMap to ensure called constructor will not change it
//         const psmEntries_Include_Map_Key_PsmId__ReadonlyMap : ReadonlyMap<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId> =
//             peptideData.psmEntries_Map_Key_PsmId
//
//         const subTableData = new PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter({
//             dataPageStateManager: dataPageStateManager_DataFrom_Server,
//             projectSearchId: projectSearchId,
//             psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId__ReadonlyMap,
//             reportedPeptideId: undefined,
//             searchSubGroupId: undefined,
//             searchDataLookupParamsRoot: searchDataLookupParameters_Root,
//             openModPositionOverride: peptideData.openModPositionOverride_ToPassTo_PsmTableCreationCode,
//             commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
//             reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__WhenAvailable: undefined  // NOT for mod page
//         });
//
//         const dataRow_Get_RowChildContent_Return_Promise_ChildContent: DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent =
//             ( params : DataTable_DataRowEntry__Get_RowChildContent_CallParams ): Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent> => {
//
//                 const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params = {
//                     commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
//                 }
//
//                 return psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent({
//                     psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter: subTableData,
//                     psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params,
//                     params_DataTableCallback: params })
//             }
//
//         const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });
//
//         // add this row to the rows
//         const dataTable_DataRowEntry = new DataTable_DataRowEntry({
//             uniqueId : peptideData.peptideDisplayString,
//             sortOrder_OnEquals : peptideData.peptideDisplayString,
//             columnEntries,
//             dataTable_DataRowEntry_DownloadTable,
//             dataRow_Get_RowChildContent_Return_Promise_ChildContent
//         });
//
//         dataTableRows.push( dataTable_DataRowEntry );
//     }
//
//     return dataTableRows;
//
// } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
//
//
// ///////////////////
//
// const _getPeptideDataForModSearch = async function (
//     {
//         data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId,
//         data_For_ModMass,
//
//         generatedPeptideContents_UserSelections_StateObject,
//         commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
//         commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
//         dataPageStateManager_DataFrom_Server
//     } : {
//         data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId
//         data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass
//
//         generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
//         commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
//         commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
//         dataPageStateManager_DataFrom_Server : DataPageStateManager
//     }
// ) : Promise<Array<INTERNAL__PeptideDataForModProteinSearch>> { try {
//
//     const projectSearchId_Or_SubSearchId = data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId
//
//     const projectSearchId_ForUseWhereRequire_projectSearchId = data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId
//
//     const data_For_ModMass_For_ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId )
//     if ( ! data_For_ModMass_For_ProjectSearchId_Or_SubSearchId ) {
//         throw Error("data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId ) returned NOTHING for projectSearchId_Or_SubSearchId: " + projectSearchId_Or_SubSearchId )
//     }
//
//     const peptideDataForModProteinSearch_Map_Key_PeptideString: Map<string, INTERNAL__PeptideDataForModProteinSearch> = new Map()
//
//     for ( const dataFor_SinglePsm of data_For_ModMass_For_ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_All() ) {
//
//         const psmId = dataFor_SinglePsm.psmId
//
//
//         const sss = modPage_Create_GeneratedReportedPeptideEntries_String_Etc({
//             processingFor_ProteinDataTable: false,
//             proteinSequenceVersionId_WhenProcessingFor_ProteinDataTable: undefined,
//             data_ForProtein_ForSinglePsm_WhenProcessingFor_ProteinDataTable: undefined,
//             data_For_ModMass,
//             commonInputParameters: {
//                 peptideSequence: string,
//                 reportedPeptideId: dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmTblData.reportedPeptideId,
//                 dataFor_SinglePsm,
//                 data_For_ModMass,
//
//                 generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
//                 modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
//
//                 proteinPosition_Of_Modification_Filter_UserSelections_StateObject : undefined,  //  To limit which peptides are displayed
//                 proteinPositionFilter_UserSelections_StateObject : undefined, //  To limit which peptides are displayed when expand mod mass table row
//
//                 commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
//                 dataPageStateManager_DataFrom_Server
//             },
//             projectSearchId_ForUseWhereRequire_projectSearchId
//         } )
//
//         // const psm_ComputeData = psm_on_SingleProtein.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm
//
//         for ( const generatedReportedPeptideString_Result_Entry of get_GeneratedPeptide_Entries_For_PsmData_Result.generatedReportedPeptideString_Result_Entries ) {
//
//
//
//             const peptideDisplayString = generatedReportedPeptideString_Result_Entry.peptideDisplayString
//             const openModPositionOverride_ToPassTo_PsmTableCreationCode = generatedReportedPeptideString_Result_Entry.openModPositionOverride_ToPassTo_PsmTableCreationCode
//
//             let peptideData_Output = peptideDataForModProteinSearch_Map_Key_PeptideString.get( peptideDisplayString )
//             if ( ! peptideData_Output ) {
//
//                 peptideData_Output = {
//                     peptideDisplayString: peptideDisplayString,
//                     modifiedResidues: new Set(),
//                     modifiedPositions: new Set(),
//                     unlocalizedPositionRanges: [],
//                     openModPositionOverride_ToPassTo_PsmTableCreationCode,
//                     psmEntries_Map_Key_PsmId: new Map()
//                 }
//                 peptideDataForModProteinSearch_Map_Key_PeptideString.set( peptideDisplayString, peptideData_Output )
//
//             } else {
//                 if ( peptideData_Output.openModPositionOverride_ToPassTo_PsmTableCreationCode !== openModPositionOverride_ToPassTo_PsmTableCreationCode ) {
//
//                     const msg = "if ( peptideData_Output.openModPositionOverride_ToPassTo_PsmTableCreationCode !== openModPositionOverride_ToPassTo_PsmTableCreationCode ): peptideData_Output.openModPositionOverride_ToPassTo_PsmTableCreationCode: " +
//                         peptideData_Output.openModPositionOverride_ToPassTo_PsmTableCreationCode +
//                         ", openModPositionOverride_ToPassTo_PsmTableCreationCode: " + openModPositionOverride_ToPassTo_PsmTableCreationCode +
//                         ", psmId: " + psmId
//                     console.warn( msg )
//                     throw Error(msg)
//                 }
//
//             }
//
//             peptideData_Output.psmEntries_Map_Key_PsmId.set( psm_on_SingleProtein.psmId, psm_on_SingleProtein.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmEntry )
//
//             if ( generatedReportedPeptideString_Result_Entry.modification_ProteinPositions ) {
//                 for ( const entry of generatedReportedPeptideString_Result_Entry.modification_ProteinPositions ) {
//                     peptideData_Output.modifiedPositions.add( entry )
//                 }
//             }
//             if ( generatedReportedPeptideString_Result_Entry.modification_Residues ) {
//                 for ( const entry of generatedReportedPeptideString_Result_Entry.modification_Residues ) {
//                     peptideData_Output.modifiedResidues.add( entry )
//                 }
//             }
//             if ( generatedReportedPeptideString_Result_Entry.unlocalized_Protein_PositionRanges ) {
//                 for ( const entry of generatedReportedPeptideString_Result_Entry.unlocalized_Protein_PositionRanges ) {
//                     peptideData_Output.unlocalizedPositionRanges.push( entry )
//                 }
//             }
//
//             for ( const residue of modPage_GetProtein_Positions_Residues_ForPsm_For_proteinId.peptide_Pre_Residues ) {
//                 peptideData_Output.peptide_Pre_Residues.add( residue )
//             }
//             for ( const residue of modPage_GetProtein_Positions_Residues_ForPsm_For_proteinId.peptide_Post_Residues ) {
//                 peptideData_Output.peptide_Post_Residues.add( residue )
//             }
//         }
//     }
//
//     return Array.from( peptideDataForModProteinSearch_Map_Key_PeptideString.values() )
//
// } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
//
//
//
// ///////////////////
//
//
// class INTERNAL__PeptideDataForModProteinSearch {
//
//     readonly peptideDisplayString: string
//
//     readonly modifiedResidues: Set<string>
//
//     readonly modifiedPositions: Set<number>
//     readonly unlocalizedPositionRanges: Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass>
//     readonly openModPositionOverride_ToPassTo_PsmTableCreationCode: OpenModPosition_DataType
//
//     readonly psmEntries_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>
// }
