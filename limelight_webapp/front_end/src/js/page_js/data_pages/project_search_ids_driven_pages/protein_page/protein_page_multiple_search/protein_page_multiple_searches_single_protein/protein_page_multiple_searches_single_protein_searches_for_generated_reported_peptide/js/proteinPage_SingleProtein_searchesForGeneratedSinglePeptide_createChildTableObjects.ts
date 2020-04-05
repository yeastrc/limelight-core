/**
 * proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_createChildTableObjects.ts
 * 
 * Protein Page: Multiple Search : Single Protein: show searches for Generated Single Peptide in Peptide List
 * 
 * Create     DataTable_RootTableObject for child table
 */

 ////    !!!!!!!  No Import for CreateReportedPeptideDisplayData_Result_Entry

import {

    DataTable_RootTableObject,
    
    DataTable_TableOptions,
    DataTable_TableOptions_dataRowClickHandler_RequestParm,
    DataTable_TableOptions_dataRow_GetChildTableData_RequestParm,
    DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm,
    
    DataTable_Column,

    DataTable_RootTableDataObject,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,

    DataTable_cellMgmt_External,
    DataTable_cellMgmt_External_PopulateRequest,
    DataTable_cellMgmt_External_PopulateResponse,
    DataTable_cellMgmt_ExternalReactComponent
    
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ReturnChildReactComponent'

import { reportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent, ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_ReturnChildReactComponent';

import { create_GeneratedReportedPeptideListData, Create_GeneratedReportedPeptideListData_Result, CreateReportedPeptideDisplayData_Result_Entry } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/js/proteinExperimentPage_SingleProtein_Create_GeneratedReportedPeptideListData';
import { CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry } from '../../js/proteinPage_Display_MultipleSearches_SingleProtein_Create_GeneratedReportedPeptideListData';

////////////

const dataTableId_ThisTable = "Experiment Protein Single Protein Single Peptide Search List Table";

////////////

/**
 * test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__CreateChildTableDataObjects.ts
 * 
 * Create the Data Table objects for use in Data Table in FAKE_dataRow_ChildTable_ReactComponent from file test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__ChildTableContainingReactComponent.tsx
 * 
 * Test creating a React Cmponent that is shown for show/hide row child data using call to tableOptions.dataRow_GetChildTable_ReturnReactComponent(...) which returns React.Component
 */
export const proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects = ({

    dataRow_GetChildTable_ReturnReactComponent_Parameter
} : {
    dataRow_GetChildTable_ReturnReactComponent_Parameter : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
}) : DataTable_RootTableObject => {

    const projectSearchIds = dataRow_GetChildTable_ReturnReactComponent_Parameter.projectSearchIds;
    const createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry = dataRow_GetChildTable_ReturnReactComponent_Parameter.createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow;
    const searchNamesMap_KeyProjectSearchId = dataRow_GetChildTable_ReturnReactComponent_Parameter.dataPageStateManager.get_searchNames_AsMap(); // Map with key is projectSearchId as number

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

            let psmCount : number = createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
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

            const loadedDataPerProjectSearchIdHolder = dataRow_GetChildTable_ReturnReactComponent_Parameter.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                const msg = "searchesForSinglePeptide_createChildTableObjects.ts: No entry in dataRow_GetChildTable_ReturnReactComponent_Parameter.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            const reportedPeptideIds = dataRow_GetChildTable_ReturnReactComponent_Parameter.reportedPeptideIdsMap_KeyProjectSearchId.get( projectSearchId );
            
            if ( ( ! reportedPeptideIds ) || reportedPeptideIds.size === 0 ) {

                //  No Data for this projectSearchId

                continue; // EARLY CONTINUE  !!!

                // const msg = "searchesForSinglePeptide_createChildTableObjects.ts: reportedPeptideIdsMap_KeyProjectSearchId.get( projectSearchId ); returns nothing or empty set";
                // console.warn( msg, reportedPeptideIds );
                // throw Error( msg );
            }
            if ( reportedPeptideIds.size === undefined ) {
                const msg = "searchesForSinglePeptide_createChildTableObjects.ts: reportedPeptideIds.size === undefined";
                console.warn( msg, reportedPeptideIds );
                throw Error( msg );
            }

            const reportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter = new ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter({
                projectSearchId,
                reportedPeptideIds,
                reporterIonMassesSelected : dataRow_GetChildTable_ReturnReactComponent_Parameter.reporterIonMassesSelected,
                searchDataLookupParamsRoot : dataRow_GetChildTable_ReturnReactComponent_Parameter.searchDataLookupParamsRoot,
                loadedDataPerProjectSearchIdHolder,
                loadedDataCommonHolder : dataRow_GetChildTable_ReturnReactComponent_Parameter.loadedDataCommonHolder,
                dataPageStateManager : dataRow_GetChildTable_ReturnReactComponent_Parameter.dataPageStateManager
            });

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : projectSearchId,
                sortOrder_OnEquals : projectSearchId,
                columnEntries,
                dataRow_GetChildTable_ReturnReactComponent_Parameter : reportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter
            })

            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    if ( dataTable_DataRowEntries.length === 0 ) {
        const msg = "searchesForSinglePeptide_createChildTableObjects.ts: dataTable_DataRowEntries.length === 0";
        console.warn( msg );
        throw Error( msg );
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        dataTable_DataRowEntries
    });
    
    const tableOptions = new DataTable_TableOptions({
        //  Comment out since no further drill down to child table
        // dataRow_GetChildTableData : fake_dataRow_GetChildTableData          //  TODO  Need to provide this for child table processing
        dataRow_GetChildTable_ReturnReactComponent : reportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent
    });

    //  psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent, PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}
