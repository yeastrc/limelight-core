/**
 * proteinPage_Display_MultipleSearches__SingleProteinGeneratedReportedPeptideListSection_Create_TableData.ts
 * 
 * Get Data Table from Peptide List
 * 
 * Create Root Table with Generated Peptide String, and PSM Counts per condition in first condition group
 * 
 */

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import {

    DataTable_ColumnId,

    DataTable_RootTableObject,
    
    DataTable_TableOptions,
    DataTable_TableOptions_dataRowClickHandler_RequestParm,
    DataTable_TableOptions_dataRow_GetChildTableData_RequestParm,
    
    DataTable_Column,
    DataTable_SortColumnsInfoEntry,

    DataTable_RootTableDataObject,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,

    DataTable_cellMgmt_External,
    DataTable_cellMgmt_External_PopulateRequest,
    DataTable_cellMgmt_External_PopulateResponse,
    DataTable_cellMgmt_ExternalReactComponent
    
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result, CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry } from './proteinPage_Display_MultipleSearches_SingleProtein_Create_GeneratedReportedPeptideListData';


//  Child Data Searches for Single Peptide show/hide

import { ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter, proteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent } from '../protein_page_multiple_searches_single_protein_searches_for_generated_reported_peptide/js/proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ReturnChildReactComponent';
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";


//////////////////

const dataTableId_ThisTable = "Single Protein Peptide List Root Table";







///////////////////

/**
 * Result from createReportedPeptideDisplayData call
 */
export class GetDataTableDataObjects_MultipleSearch_SingleProtein_Result {
    dataTable_RootTableObject : DataTable_RootTableObject;
}

/**
 * Create Reported Peptide Data for Display
 * 
 * Reported Peptide List Data Table Root
 */
export const createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein = function( { 
    
    create_GeneratedReportedPeptideListData_Result,

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
    proteinSequenceVersionId, 
    projectSearchIds,
    searchDataLookupParamsRoot,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder,
    dataPageStateManager
} : {
    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    proteinSequenceVersionId : number
    projectSearchIds : Array<number>
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

} ) : GetDataTableDataObjects_MultipleSearch_SingleProtein_Result {

    const getDataTableDataObjects_Result = new GetDataTableDataObjects_MultipleSearch_SingleProtein_Result();

    const peptideList : Array<CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList;

    if ( peptideList.length === 0 ) {
        //  No data found so return
        return getDataTableDataObjects_Result;  // EARLY RETURN
    }

    const searchNamesMap_KeyProjectSearchId = dataPageStateManager.get_searchNames_AsMap(); // Map with key is projectSearchId as number

    //  PSM counts by search in each PSM Count Column

    /////////////

    //  Create Table Columns (Header info and Data Info)

    const dataTable_Columns : Array<DataTable_Column> = [];

    {  // Generated Peptide sequence, including variable mods, etc
        const dataTable_Column = new DataTable_Column({
            id : "Sequence", // Used for tracking sort order. Keep short
            displayName : "Sequence",
            width : 500,
            sortable : true,
            style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    }
    {
        const dataTable_Column = new DataTable_Column({
            id : "unique", // Used for tracking sort order. Keep short
            displayName : "Unique",
            width : 55,
            sortable : true,
            style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    }

    //  PSM counts for each ...
    for ( const projectSearchId of projectSearchIds ) {
    
        //  searchNames // Object with property name is projectSearchId as number

        const searchNameObj = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
        if ( ! searchNameObj ) {
            const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): No value in searchNames for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }
        const searchName = searchNameObj.name;
        const searchId = searchNameObj.searchId;

        const dataTable_Column = new DataTable_Column({
            id : "psmCount_" + projectSearchId, // Used for tracking sort order. Keep short
            displayName : "PSM Count (" + searchId + ")",
            width : 70,
            sortable : true
        });
        dataTable_Columns.push( dataTable_Column );
    }

    //  Create Table Body

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        let peptideListCounter = 0;
        for ( const peptideEntry of peptideList ) {
            
            peptideListCounter++;

            const dataTable_DataRow_ColumnEntries : Array<DataTable_DataRow_ColumnEntry> = [];

            {
                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : peptideEntry.peptideSequenceDisplay,
                    valueSort : peptideEntry.peptideSequenceDisplay,
                    // tooltipText : 
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );
            }
            { // Unique
                let value = "";
                if (  peptideEntry.peptideUnique ) {
                    value = "*";  //  Display '*' if peptide unique
                }
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : value,
                    valueSort : value
                })
                dataTable_DataRow_ColumnEntries.push( columnEntry );
            }

            //  Data for child tables
            // const projectSearchIds_ThatHavePsmCountsGtZero : Array<number> = [];


            for ( const projectSearchId of projectSearchIds ) {

                let psmCount = peptideEntry.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
                if ( ! psmCount ) {
                    psmCount = 0;
                }

                const psmCountDisplay = psmCount.toLocaleString();

                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : psmCountDisplay,
                    valueSort : psmCount,
                    // tooltipText : 
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

                //  Data for child tables
                // if ( psmCount ) {
                //     projectSearchIds_ThatHavePsmCountsGtZero.push( projectSearchId );
                // }
            }

            //////////

            // Data for Child Tables for this row of this table

            const createReportedPeptideDisplayData_Result_Entry_ForThisRow : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry = (
                create_GeneratedReportedPeptideListData_Result.entries_Key_peptideSequenceDisplay.get( peptideEntry.peptideSequenceDisplay )
            );
            if ( ! createReportedPeptideDisplayData_Result_Entry_ForThisRow ) {
                throw Error("proteinPage_Display_MultipleSearches__SingleProteinReportedPeptideListSection_CreateListData.ts: No value for peptideEntry.peptideSequenceDisplay: " + peptideEntry.peptideSequenceDisplay );
            }

            const dataRow_GetChildTable_ReturnReactComponent_Parameter = ( 
                new ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter({
                    
                    createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow : createReportedPeptideDisplayData_Result_Entry_ForThisRow,
                    
                    projectSearchIds,
                    reportedPeptideIdsMap_KeyProjectSearchId_ForParentPeptide : peptideEntry.reportedPeptideIdsMap_KeyProjectSearchId,
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                    searchDataLookupParamsRoot,
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                    loadedDataCommonHolder,
                    dataPageStateManager
                })
            );

            //////////

            const dataTable_DataRowEntry = new DataTable_DataRowEntry( {   
                uniqueId : peptideEntry.peptideSequenceDisplay,
                sortOrder_OnEquals : peptideListCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                columnEntries : dataTable_DataRow_ColumnEntries,
                dataRow_GetChildTable_ReturnReactComponent_Parameter
                // tableRowClickHandlerParameter : undefined,  //  Data passed to DataTable_TableOptions.dataRowClickHandler
                // dataRow_GetChildTableDataParameter : undefined,   //  Data passed to DataTable_TableOptions.dataRow_GetChildTableData
            });

            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        dataTable_DataRowEntries
    });

    let dataRow_GetChildTable_ReturnReactComponent = proteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent;

    const tableOptions = new DataTable_TableOptions({
        // dataRow_GetChildTableData : fake_dataRow_GetChildTableData          //  TODO  Need to provide this for child table processing
       dataRow_GetChildTable_ReturnReactComponent
    });

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    getDataTableDataObjects_Result.dataTable_RootTableObject = dataTable_RootTableObject;

    return getDataTableDataObjects_Result;
}
