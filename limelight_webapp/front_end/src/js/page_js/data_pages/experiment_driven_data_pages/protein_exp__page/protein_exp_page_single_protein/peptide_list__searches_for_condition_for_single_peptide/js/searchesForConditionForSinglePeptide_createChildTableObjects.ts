/**
 * searchesForConditionForSinglePeptide_createChildTableObjects.ts
 * 
 * Experiment Protein Page: Single Protein: show searches for Condition in Last Condition Group for Single Peptide in Peptide List
 * 
 * Create     DataTable_RootTableObject for child table
 */

 ////    !!!!!!!  No Import for CreateReportedPeptideDisplayData_Result_Entry

import {
    DataTable_RootTableObject,
    DataTable_TableOptions,
    DataTable_Column,
    DataTable_RootTableDataObject,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject,
    DataTable_Column_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry_DownloadTable
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import {
    reportedPeptidesForSingleSearch_createChildTableObjects,
    ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_createChildTableObjects";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";

////////////

const dataTableId_ThisTable = "Experiment Protein Single Protein Single Peptide Search List Table";


/**
 * Parameter to searchesForSinglePeptide_createChildTableObjects_Parameter
 */
export class SearchesForSinglePeptide_createChildTableObjects_Parameter {

    createReportedPeptideDisplayData_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
    projectSearchIds : Array<number>
    reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId : Map<number, Set<number>>
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

    /**
     * Used as class for object placed in data row object property searchesForSinglePeptide_createChildTableObjects_Parameter
     */
    constructor(
        {
            createReportedPeptideDisplayData_Result_Entry_ForParentRow,
            projectSearchIds,
            reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId,  //  The Reported Peptide Ids Associated with Parent Peptide
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            searchDataLookupParamsRoot,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,
            dataPageStateManager
        } : {
            createReportedPeptideDisplayData_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
            projectSearchIds : Array<number>
            reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId : Map<number, Set<number>>
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
            searchDataLookupParamsRoot : SearchDataLookupParameters_Root
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
            dataPageStateManager : DataPageStateManager
        }) {

        this.createReportedPeptideDisplayData_Result_Entry_ForParentRow = createReportedPeptideDisplayData_Result_Entry_ForParentRow;
        this.projectSearchIds = projectSearchIds;
        this.reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId = reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId;
        this.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        this.loadedDataCommonHolder = loadedDataCommonHolder;
        this.dataPageStateManager = dataPageStateManager;
    }
}

////////////

/**
 * test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__CreateChildTableDataObjects.ts
 * 
 * Create the Data Table objects for use in Data Table in FAKE_dataRow_ChildTable_ReactComponent from file test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__ChildTableContainingReactComponent.tsx
 * 
 * Test creating a React Component that is shown for show/hide row child data using call to DataTable_DataRowEntry.dataRow_GetChildTableData_Return_DataTable_RootTableObject
 */
export const searchesForSinglePeptide_createChildTableObjects = ({

    searchesForSinglePeptide_createChildTableObjects_Parameter
} : {
    searchesForSinglePeptide_createChildTableObjects_Parameter : SearchesForSinglePeptide_createChildTableObjects_Parameter
}) : DataTable_RootTableObject => {

    const projectSearchIds = searchesForSinglePeptide_createChildTableObjects_Parameter.projectSearchIds;
    const createReportedPeptideDisplayData_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry = searchesForSinglePeptide_createChildTableObjects_Parameter.createReportedPeptideDisplayData_Result_Entry_ForParentRow;
    const searchNamesMap_KeyProjectSearchId = searchesForSinglePeptide_createChildTableObjects_Parameter.dataPageStateManager.get_searchNames_AsMap(); // Map with key is projectSearchId as number

    const dataTable_Columns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {
        const displayName = "Search Name";

        const dataTable_Column = new DataTable_Column({
            id : "SrchNm", // Used for tracking sort order. Keep short
            displayName,
            width : 500,
            sortable : true
        });
        dataTable_Columns.push( dataTable_Column );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "PSMs";

        const dataTable_Column = new DataTable_Column({
            id : "psmCount", // Used for tracking sort order. Keep short
            displayName,
            width : 75,
            sortable : true
        });
        dataTable_Columns.push( dataTable_Column );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        for ( const projectSearchId of projectSearchIds ) {

            //  searchNames // Object with property name is projectSearchId as number

            const searchNameObj = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
            if ( ! searchNameObj ) {
                const msg = "searchesForSinglePeptide_createChildTableObjects(...): No value in searchNames for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }
            const searchName = searchNameObj.name;
            const searchId = searchNameObj.searchId;
            const searchNameDisplay = searchName + " (" + searchId + ")";

            let psmCount : number = createReportedPeptideDisplayData_Result_Entry_ForParentRow.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
            if ( ! psmCount ) { // is undefined if not in map so then set to 0
                psmCount = 0;
            }

            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
            const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

            {
                const valueDisplay = searchNameDisplay;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : searchNameDisplay
                })
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
            {
                const valueDisplay = psmCount.toLocaleString();
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : psmCount
                })
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }

            const loadedDataPerProjectSearchIdHolder = searchesForSinglePeptide_createChildTableObjects_Parameter.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                const msg = "searchesForSinglePeptide_createChildTableObjects.ts: No entry in searchesForSinglePeptide_createChildTableObjects_Parameter.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            const reportedPeptideIds_ForDisplay : Set<number> = searchesForSinglePeptide_createChildTableObjects_Parameter.reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId.get( projectSearchId )
            if ( ( ! reportedPeptideIds_ForDisplay ) || reportedPeptideIds_ForDisplay.size === 0 ) {
                const msg = "searchesForSinglePeptide_createChildTableObjects.ts: searchesForSinglePeptide_createChildTableObjects_Parameter..reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId.get( projectSearchId ) returns  nothing or empty set";
                console.warn( msg, reportedPeptideIds_ForDisplay );
                throw Error( msg );
            }
            if ( reportedPeptideIds_ForDisplay.size === undefined ) {
                const msg = "searchesForSinglePeptide_createChildTableObjects.ts: reportedPeptideIds_ForDisplay.size === undefined";
                console.warn( msg, reportedPeptideIds_ForDisplay );
                throw Error( msg );
            }

            const reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId = searchesForSinglePeptide_createChildTableObjects_Parameter.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId );
            if ( ( ! reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId ) ) {
                const msg = "searchesForSinglePeptide_createChildTableObjects.ts: reportedPeptideIdsMap_KeyProjectSearchId.get( projectSearchId ); returns nothing";
                console.warn( msg, reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId );
                throw Error( msg );
            }

            const reportedPeptidesForSingleSearch_createChildTableObjects_Parameter = new ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter({
                searchSubGroup_Ids_Selected : undefined,
                projectSearchId,
                reportedPeptideIds_ForDisplay,
                dataPerReportedPeptideId_Map_Key_reportedPeptideId : undefined,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId,
                searchDataLookupParamsRoot : searchesForSinglePeptide_createChildTableObjects_Parameter.searchDataLookupParamsRoot,
                loadedDataPerProjectSearchIdHolder,
                loadedDataCommonHolder : searchesForSinglePeptide_createChildTableObjects_Parameter.loadedDataCommonHolder,
                dataPageStateManager : searchesForSinglePeptide_createChildTableObjects_Parameter.dataPageStateManager
            });

            const dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject =
                ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue =>
                {
                    const result : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue =
                        reportedPeptidesForSingleSearch_createChildTableObjects({ reportedPeptidesForSingleSearch_createChildTableObjects_Parameter });

                    return result;
                }

            const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : projectSearchId,
                sortOrder_OnEquals : projectSearchId,
                columnEntries,
                dataTable_DataRowEntry_DownloadTable,
                dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject
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

    //  psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent, PsmList_ForProjectSearchIdReportedPeptideId__searchesForSinglePeptide_createChildTableObjects_Parameter

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}
