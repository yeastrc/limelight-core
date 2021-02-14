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
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import {
    reportedPeptidesForSingleSearch_createChildTableObjects,
    ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_createChildTableObjects";
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/js/proteinPage_Display_MultipleSearches_SingleProtein_Create_GeneratedReportedPeptideListData";

////////////

const dataTableId_ThisTable = "Experiment Protein Single Protein Single Peptide Search List Table";


/**
 * Parameter to searchesForSinglePeptide_createChildTableObjects_Parameter
 */
export class SearchesForSinglePeptide_createChildTableObjects_Parameter {

    createReportedPeptideDisplayData_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry
    projectSearchIds : Array<number>
    reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId : Map<number, Set<number>>
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
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
            createReportedPeptideDisplayData_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry
            projectSearchIds : Array<number>
            reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId : Map<number, Set<number>>
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
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
    const createReportedPeptideDisplayData_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry = searchesForSinglePeptide_createChildTableObjects_Parameter.createReportedPeptideDisplayData_Result_Entry_ForParentRow;
    const searchNamesMap_KeyProjectSearchId = searchesForSinglePeptide_createChildTableObjects_Parameter.dataPageStateManager.get_searchNames_AsMap(); // Map with key is projectSearchId as number

    const dataTable_Columns : Array<DataTable_Column> = [];

    {
        const dataTable_Column = new DataTable_Column({
            id : "SrchNm", // Used for tracking sort order. Keep short
            displayName : "Search Name",
            width : 500,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 }, // Allow to wrap: display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", 
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    }

    {
        const dataTable_Column = new DataTable_Column({
            id : "psmCount", // Used for tracking sort order. Keep short
            displayName : "PSMs",
            width : 75,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 }
        });
        dataTable_Columns.push( dataTable_Column );
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
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : searchNameDisplay,
                    valueSort : searchNameDisplay
                })
                columnEntries.push( columnEntry );
            }
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : psmCount.toLocaleString(),
                    valueSort : psmCount
                })
                columnEntries.push( columnEntry );
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

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : projectSearchId,
                sortOrder_OnEquals : projectSearchId,
                columnEntries,
                dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject
            })
            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        dataTable_DataRowEntries
    });
    
    const tableOptions = new DataTable_TableOptions({});

    //  psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent, PsmList_ForProjectSearchIdReportedPeptideId__searchesForSinglePeptide_createChildTableObjects_Parameter

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}
