/**
 * modPage_Get_PeptideList_ForModMassAndSearch_When_NO_Proteins_SubTableGenerator.ts
 */


import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_Column_sortFunction_Param,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__Get_RowChildContent_CallParams,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent,
    DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableDataObject_Both_ColumnArrays,
    DataTable_RootTableObject,
    DataTable_TableOptions,
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    OpenModPosition_DataType
} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";
import {
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";
import {
    psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__root_component_and_code/psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent";
import {
    PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    modPage_Create_GeneratedReportedPeptideEntries_String_Etc,
    ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Create_GeneratedReportedPeptideEntries_String_Etc";
import {
    CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {
    CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";


const dataTableId_ThisTable = "Mod View Peptide List By Search - NO Proteins Sub Table";


export const modPage_Get_PeptideList_ForModMassAndSearch_When_NO_Proteins_SubTableGenerator = async function (
    {
        projectSearchId_Or_SubSearchId,
        projectSearchId_ForUseWhereRequire_projectSearchId,
        data_For_ModMass,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchId_Or_SubSearchId: number
        projectSearchId_ForUseWhereRequire_projectSearchId: number

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : Promise<DataTable_RootTableObject> { try {

    const data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId)
    if ( ! data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId ) {
        throw Error("data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId ) returned NOTHING for projectSearchId_Or_SubSearchId: " + projectSearchId_Or_SubSearchId )
    }

    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId_ForUseWhereRequire_projectSearchId)
    if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
        throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId_ForUseWhereRequire_projectSearchId) returned NOTHING for projectSearchId_ForUseWhereRequire_projectSearchId: " + projectSearchId_ForUseWhereRequire_projectSearchId )
    }

    // create the columns for the table
    const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getDataTableColumns();

    // create the rows for the table
    const dataTableRows : Array<DataTable_DataRowEntry> = await _getDataTableRows({
        data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId,
        data_For_ModMass,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
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

/**
 *
 */
const  _getDataTableColumns = function () : DataTable_RootTableDataObject_Both_ColumnArrays { try {

    const dataTableColumns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {
        const displayName = "Peptide";

        const dataTableColumn = new DataTable_Column({
            id : "modListGeneratedPeptide", // Used for tracking sort order. Keep short
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

            id : "ModRes", // Used for tracking sort order. Keep short
            displayName,
            width : 100,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    const dataTable_RootTableDataObject_Both_ColumnArrays = new DataTable_RootTableDataObject_Both_ColumnArrays({ columns: dataTableColumns, columns_tableDownload: dataTable_Column_DownloadTable_Entries });

    return dataTable_RootTableDataObject_Both_ColumnArrays;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

///////////////////////////


const _getDataTableRows = async function (
    {
        data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId,
        data_For_ModMass,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : Promise<Array<DataTable_DataRowEntry>> { try {

    const projectSearchId = data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId

    const dataTableRows : Array<DataTable_DataRowEntry> = [];

    const allPeptideData_For_SearchAndModMass:Array<INTERNAL__PeptideDataForModSearch> = await _getPeptideData({
        data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId,
        data_For_ModMass,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    });

    allPeptideData_For_SearchAndModMass.sort( (a,b) => {

        //  PSM Count descending then peptide string ascending

        if ( a.psmEntries_Map_Key_PsmId.size > b.psmEntries_Map_Key_PsmId.size ) {
            return -1
        }
        if ( a.psmEntries_Map_Key_PsmId.size < b.psmEntries_Map_Key_PsmId.size ) {
            return 1
        }

        if ( a.peptideDisplayString < b.peptideDisplayString ) {
            return -1
        }
        if ( a.peptideDisplayString > b.peptideDisplayString ) {
            return 1
        }

        return 0
    })

    for ( const peptideData of allPeptideData_For_SearchAndModMass ) {

        const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
        const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

        // add the name
        {
            const valueDisplay = peptideData.peptideDisplayString;
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : peptideData.peptideDisplayString
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        // add psm count
        {
            const valueDisplay = peptideData.psmEntries_Map_Key_PsmId.size.toString();
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : peptideData.psmEntries_Map_Key_PsmId.size
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        // add modded residues
        {
            const valueString: string = ( peptideData.modifiedResidues && peptideData.modifiedResidues.size > 0 ) ? Array.from( peptideData.modifiedResidues ).sort().join(', ') : 'unlocalized';

            const valueDisplay = valueString;
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : valueString
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        //  cast as ReadonlyMap to ensure called constructor will not change it
        const psmEntries_Include_Map_Key_PsmId__ReadonlyMap : ReadonlyMap<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId> =
            peptideData.psmEntries_Map_Key_PsmId

        const subTableData = new PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter({
            dataPageStateManager: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server,
            projectSearchId: projectSearchId,
            psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId__ReadonlyMap,
            reportedPeptideId: undefined,
            searchSubGroupId: undefined,
            searchDataLookupParamsRoot: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchDataLookupParameters_Root,
            openModPositionOverride: peptideData.openModPositionOverride_ToPassTo_PsmTableCreationCode,
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__WhenAvailable: undefined  // NOT for mod page
        });

        const dataRow_Get_RowChildContent_Return_Promise_ChildContent: DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent =
            ( params : DataTable_DataRowEntry__Get_RowChildContent_CallParams ): Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent> => {

                const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params = {
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
                }

                return psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent({
                    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter: subTableData,
                    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params,
                    params_DataTableCallback: params })
            }

        const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

        // add this row to the rows
        const dataTable_DataRowEntry = new DataTable_DataRowEntry({
            uniqueId : peptideData.peptideDisplayString,
            sortOrder_OnEquals : peptideData.peptideDisplayString,
            columnEntries,
            dataTable_DataRowEntry_DownloadTable,
            dataRow_Get_RowChildContent_Return_Promise_ChildContent
        });

        dataTableRows.push( dataTable_DataRowEntry );
    }

    return dataTableRows;

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


///////////////////

const _getPeptideData = async function (
    {
        data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId,
        data_For_ModMass,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : Promise<Array<INTERNAL__PeptideDataForModSearch>> { try {

    const projectSearchId_Or_SubSearchId = data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId

    const projectSearchId_ForUseWhereRequire_projectSearchId = data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId

    const peptideIds_PeptideSequences_Holders = await _get_PeptideIds_PeptideSequences_FromServer({
        projectSearchId_ForUseWhereRequire_projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    })

    const peptideDataForModSearch_Map_Key_PeptideString: Map<string, INTERNAL__PeptideDataForModSearch> = new Map()

    for ( const dataFor_SinglePsm of data_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_All() ) {

        const psmId = dataFor_SinglePsm.psmId

        const reportedPeptideId = dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmTblData.reportedPeptideId

        const peptideId_For_ReportedPeptideId = peptideIds_PeptideSequences_Holders.peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId )
        if ( ! peptideId_For_ReportedPeptideId ) {
            throw Error("peptideIds_PeptideSequences_Holders.peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId ) returned NOTHING for reportedPeptideId: " + reportedPeptideId )
        }

        const peptideSequence = peptideIds_PeptideSequences_Holders.peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId )
        if ( ! peptideSequence ) {
            throw Error("peptideIds_PeptideSequences_Holders.peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId ) returned NOTHING for peptideId_For_ReportedPeptideId: " + peptideId_For_ReportedPeptideId )
        }

        const commonInputParameters: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters = {

            peptideSequence,
            reportedPeptideId,
            dataFor_SinglePsm,
            data_For_ModMass,

            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        }

        const modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result =
            modPage_Create_GeneratedReportedPeptideEntries_String_Etc({
                proteinSequenceVersionId: undefined,
                data_ForProtein_ForSinglePsm: undefined,
                data_For_ModMass,
                commonInputParameters,
                projectSearchId_ForUseWhereRequire_projectSearchId
            } )

        for ( const generatedReportedPeptideString_Result_Entry of modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result.generatedReportedPeptideString_Result_Entries ) {

            const peptideDisplayString = generatedReportedPeptideString_Result_Entry.peptideDisplayString
            const openModPositionOverride_ToPassTo_PsmTableCreationCode = generatedReportedPeptideString_Result_Entry.openModPositionOverride_ToPassTo_PsmTableCreationCode

            let peptideData_Output = peptideDataForModSearch_Map_Key_PeptideString.get( peptideDisplayString )
            if ( ! peptideData_Output ) {

                peptideData_Output = {
                    peptideDisplayString: peptideDisplayString,
                    modifiedResidues: new Set(),
                    openModPositionOverride_ToPassTo_PsmTableCreationCode,
                    psmEntries_Map_Key_PsmId: new Map()
                }
                peptideDataForModSearch_Map_Key_PeptideString.set( peptideDisplayString, peptideData_Output )

            } else {
                if ( peptideData_Output.openModPositionOverride_ToPassTo_PsmTableCreationCode !== openModPositionOverride_ToPassTo_PsmTableCreationCode ) {

                    const msg = "if ( peptideData_Output.openModPositionOverride_ToPassTo_PsmTableCreationCode !== openModPositionOverride_ToPassTo_PsmTableCreationCode ): peptideData_Output.openModPositionOverride_ToPassTo_PsmTableCreationCode: " +
                        peptideData_Output.openModPositionOverride_ToPassTo_PsmTableCreationCode +
                        ", openModPositionOverride_ToPassTo_PsmTableCreationCode: " + openModPositionOverride_ToPassTo_PsmTableCreationCode +
                        ", psmId: " + psmId
                    console.warn( msg )
                    throw Error(msg)
                }

            }

            peptideData_Output.psmEntries_Map_Key_PsmId.set( dataFor_SinglePsm.psmId, dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmEntry )

            if ( generatedReportedPeptideString_Result_Entry.modification_Residues ) {
                for ( const entry of generatedReportedPeptideString_Result_Entry.modification_Residues ) {
                    peptideData_Output.modifiedResidues.add( entry )
                }
            }
        }
    }

    return Array.from( peptideDataForModSearch_Map_Key_PeptideString.values() )

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


/**
 *
 * @param projectSearchId_ForUseWhereRequire_projectSearchId
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 */
const _get_PeptideIds_PeptideSequences_FromServer = function (
    {
        projectSearchId_ForUseWhereRequire_projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchId_ForUseWhereRequire_projectSearchId: number
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
): Promise<{
    peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
    peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
}> {

    let peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
    let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder


    const promises: Array<Promise<void>> = []

    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId_ForUseWhereRequire_projectSearchId)
    if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
        throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId_ForUseWhereRequire_projectSearchId) returned NOTHING for projectSearchId_ForUseWhereRequire_projectSearchId: " + projectSearchId_ForUseWhereRequire_projectSearchId )
    }

    const get_PeptideIdsHolder_AllForSearch_Result =
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
        get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().
        get_PeptideIdsHolder_AllForSearch()
    if ( get_PeptideIdsHolder_AllForSearch_Result.data ) {
        peptideIds_For_MainFilters_Holder = get_PeptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder
    } else if ( get_PeptideIdsHolder_AllForSearch_Result.promise ) {
        const promise = new Promise<void>((resolve, reject) => { try {
            get_PeptideIdsHolder_AllForSearch_Result.promise.catch( reason => reject(reason) )
            get_PeptideIdsHolder_AllForSearch_Result.promise.then( value => { try {
                peptideIds_For_MainFilters_Holder = value.peptideIds_For_MainFilters_Holder
                resolve()
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        promises.push(promise)
    } else {
        throw Error("get_PeptideIdsHolder_AllForSearch_Result No data or promise")
    }

    {
        const get_PeptideSequencesHolder_AllForAllSearches_Result =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer__CommonAcrossSearches().
            get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
            get_PeptideSequencesHolder_AllForAllSearches()
        if ( get_PeptideSequencesHolder_AllForAllSearches_Result.data ) {
            peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_Result.data.peptideSequences_For_MainFilters_Holder
        } else if ( get_PeptideSequencesHolder_AllForAllSearches_Result.promise ) {
            const promise = new Promise<void>((resolve, reject) => { try {
                get_PeptideSequencesHolder_AllForAllSearches_Result.promise.catch( reason => reject(reason) )
                get_PeptideSequencesHolder_AllForAllSearches_Result.promise.then( value => { try {
                    peptideSequences_For_MainFilters_Holder = value.peptideSequences_For_MainFilters_Holder
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push(promise)
        } else {
            throw Error("get_PeptideSequencesHolder_AllForAllSearches_Result No data or promise")
        }
    }

    if ( promises.length === 0 ) {

        //  EARLY RETURN
        return Promise.resolve({ peptideIds_For_MainFilters_Holder, peptideSequences_For_MainFilters_Holder })
    }

    const promisesAll = Promise.all( promises )

    return new Promise<{
            peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
            peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
        }>( ( resolve, reject) => { try {

            promisesAll.catch( reason => reject(reason) )
            promisesAll.then( noVlue => { try {

                resolve({ peptideIds_For_MainFilters_Holder, peptideSequences_For_MainFilters_Holder })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}

///////////////////


class INTERNAL__PeptideDataForModSearch {

    readonly peptideDisplayString: string

    readonly modifiedResidues: Set<string>

    readonly openModPositionOverride_ToPassTo_PsmTableCreationCode: OpenModPosition_DataType

    readonly psmEntries_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>
}
