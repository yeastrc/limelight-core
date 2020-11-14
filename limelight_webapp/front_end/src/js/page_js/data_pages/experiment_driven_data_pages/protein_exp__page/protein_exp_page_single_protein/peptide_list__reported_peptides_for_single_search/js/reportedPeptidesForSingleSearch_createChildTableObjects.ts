/**
 * reportedPeptidesForSingleSearch_createChildTableObjects.ts
 * 
 * Experiment Protein Page: Single Protein: show Reported Peptides for Single Search for Single Peptide in Peptide List
 * 
 * Create     DataTable_RootTableObject for child table
 */

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import {
   DataTable_RootTableObject,
    DataTable_TableOptions,
    DataTable_Column,
    DataTable_RootTableDataObject,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent, PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__psm_list_for_reported_peptide_container_component/js/psmList_Wrapper_ReturnChildReactComponent';

//  Local

import { ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/reportedPeptidesForSingleSearch_ReturnChildReactComponent'

import { createReportedPeptideDisplayData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData';
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/js/proteinPage_Display_MultipleSearches_SingleProtein_Create_GeneratedReportedPeptideListData";

////////////////

const dataTableId_ThisTable = "Experiment Protein Single Protein Single Peptide Search List Table";

////////////////

/**
 * returned from reportedPeptidesForSingleSearch_createChildTableObjects Promise.then(  )
 */
export class ReportedPeptidesForSingleSearch_createChildTableObjects_PromiseResolve_Result {

    dataTable_RootTableObject : DataTable_RootTableObject
}

/**
 * returned from reportedPeptidesForSingleSearch_createChildTableObjects
 */
export class ReportedPeptidesForSingleSearch_createChildTableObjects_Result {

    dataTable_RootTableObject : DataTable_RootTableObject
    promise_DataTable_RootTableObject : Promise<ReportedPeptidesForSingleSearch_createChildTableObjects_PromiseResolve_Result>
}

/**
 * 
 * @returns ReportedPeptidesForSingleSearch_createChildTableObjects_Result
 */
export const reportedPeptidesForSingleSearch_createChildTableObjects = ({

    dataRow_GetChildTable_ReturnReactComponent_Parameter
} : {
    dataRow_GetChildTable_ReturnReactComponent_Parameter : ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter

}) : ReportedPeptidesForSingleSearch_createChildTableObjects_Result => {

    const projectSearchId = dataRow_GetChildTable_ReturnReactComponent_Parameter.projectSearchId;
    const reportedPeptideIds_ForDisplay = dataRow_GetChildTable_ReturnReactComponent_Parameter.reportedPeptideIds_ForDisplay;
    const dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry> =
        dataRow_GetChildTable_ReturnReactComponent_Parameter.dataPerReportedPeptideId_Map_Key_reportedPeptideId;
    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = dataRow_GetChildTable_ReturnReactComponent_Parameter.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    const searchDataLookupParamsRoot = dataRow_GetChildTable_ReturnReactComponent_Parameter.searchDataLookupParamsRoot;

    const loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder = dataRow_GetChildTable_ReturnReactComponent_Parameter.loadedDataPerProjectSearchIdHolder;
    const loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder = dataRow_GetChildTable_ReturnReactComponent_Parameter.loadedDataCommonHolder;
    const dataPageStateManager : DataPageStateManager = dataRow_GetChildTable_ReturnReactComponent_Parameter.dataPageStateManager;

    let reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId : Array<number> = undefined;  //  Reported Peptide Ann Type Ids To Display

    {
        const paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
        const paramsForProjectSearchIdsList = paramsForProjectSearchIds.paramsForProjectSearchIdsList;
        for ( const paramsForProjectSearchId of paramsForProjectSearchIdsList ) {
            if ( paramsForProjectSearchId.projectSearchId === projectSearchId ) {
                reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId = paramsForProjectSearchId.reportedPeptideAnnTypeDisplay
                break;
            }
        }
        if ( ! reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) {
            const msg = "reportedPeptidesForSingleSearch_createChildTableObjects(...): searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList not contain entry for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }
        //  Validate all are numbers
        for ( const reportedPeptideAnnTypeId of reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) {
            if ( ! variable_is_type_number_Check( reportedPeptideAnnTypeId) ) {
                const msg = "reportedPeptidesForSingleSearch_createChildTableObjects(...): searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList[X].reportedPeptideAnnTypeDisplay contains a non-number: |" + reportedPeptideAnnTypeId + "|, projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }
        }
    }

    let reportedPeptideIds_LoadDataFor = reportedPeptideIds_ForDisplay;
    if ( dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
        reportedPeptideIds_LoadDataFor = new Set( dataPerReportedPeptideId_Map_Key_reportedPeptideId.keys() );
    }

    let reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param = {
        reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId  //  Reported Peptide Ann Type Ids To Display
    }; 

    const promise_loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch = (
        loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
            reportedPeptideIds : reportedPeptideIds_LoadDataFor,
            projectSearchId,
            reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param,
            searchDetailsBlockDataMgmtProcessing : undefined , // not provided
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            dataPageStateManager_DataFrom_Server : dataPageStateManager
        } )
    );

    if ( ! promise_loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch ) {

        const dataTable_RootTableObject : DataTable_RootTableObject = _create_dataTable_RootTableObject({
            projectSearchId,
            reportedPeptideIds_ForDisplay,
            dataPerReportedPeptideId_Map_Key_reportedPeptideId,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            searchDataLookupParamsRoot,
            dataPageStateManager
        });

        const result = new ReportedPeptidesForSingleSearch_createChildTableObjects_Result();
        result.dataTable_RootTableObject = dataTable_RootTableObject;

        return result; //  EARLY RETURN
    }

    const promiseResult = new Promise<ReportedPeptidesForSingleSearch_createChildTableObjects_PromiseResolve_Result>( ( resolve, reject ) => {
        try {
            promise_loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch.catch( (reason) => {  
                try {
                    reject( reason );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promise_loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch.then( (value) => {
                try {
                    const dataTable_RootTableObject : DataTable_RootTableObject = _create_dataTable_RootTableObject({
                        projectSearchId,
                        reportedPeptideIds_ForDisplay,
                        dataPerReportedPeptideId_Map_Key_reportedPeptideId,
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                        loadedDataPerProjectSearchIdHolder,
                        loadedDataCommonHolder,
                        searchDataLookupParamsRoot,
                        dataPageStateManager
                    });

                    const result = new ReportedPeptidesForSingleSearch_createChildTableObjects_PromiseResolve_Result();
                    result.dataTable_RootTableObject = dataTable_RootTableObject;

                    resolve( result );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });

    const result = new ReportedPeptidesForSingleSearch_createChildTableObjects_Result();
    result.promise_DataTable_RootTableObject = promiseResult;

    return result;
}

/**
 * Sort the Reported Peptide List.
 * 
 */
const _create_dataTable_RootTableObject = function(
    {
        projectSearchId,
        reportedPeptideIds_ForDisplay,
        dataPerReportedPeptideId_Map_Key_reportedPeptideId,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        searchDataLookupParamsRoot,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager

    } : {
        projectSearchId : number
        reportedPeptideIds_ForDisplay : Set<number>
        dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        dataPageStateManager : DataPageStateManager

    }) : DataTable_RootTableObject {


    const createReportedPeptideDisplayData_result = createReportedPeptideDisplayData({
        reportedPeptideIds_ForDisplay,
        dataPerReportedPeptideId_Map_Key_reportedPeptideId,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId : undefined/* Only for error reporting */, 
        projectSearchId, 
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager
    });

    //  Columns

    const dataTable_Columns : Array<DataTable_Column> = [];

    {
        {
            const dataTable_Column = new DataTable_Column({
                id : "repPeptIds", // Used for tracking sort order. Keep short
                displayName : "Reported Peptide",
                width : 400,
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
        {
            const dataTable_Column = new DataTable_Column({
                id : "psmCount", // Used for tracking sort order. Keep short
                displayName : "PSMs",
                width : 75,
                sortable : true,
                style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
                // style_override_header_React : {},  // Optional
                // style_override_React : {},  // Optional
                // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
            });
            dataTable_Columns.push( dataTable_Column );
        }
        //  Score Columns
        const annotationTypeRecords_DisplayOrder = createReportedPeptideDisplayData_result.annotationTypeRecords_DisplayOrder;
        // annotationTypeRecords_DisplayOrder { psmAnnotationTypesForPeptideListEntries, reportedPeptideAnnotationTypesForPeptideListEntries

        {  //  Reported Peptide Scores
            const reportedPeptideAnnotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries;
            for ( const reportedPeptideAnnotationType of reportedPeptideAnnotationTypesForPeptideListEntries ) {
                
                const dataTable_Column = new DataTable_Column({
                    id : "rp_" + reportedPeptideAnnotationType.name, // Used for tracking sort order. Keep short
                    displayName : reportedPeptideAnnotationType.name,
                    width : 105,
                    sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 }
                });
                dataTable_Columns.push( dataTable_Column );
            }
        }
    }

    //  Data Rows

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        for ( const peptideEntry of createReportedPeptideDisplayData_result.peptideList ) {

            if ( ! peptideEntry.numPsms ) {

                //  Skip where numPsms is zero or undefined or null

                continue;  // EARLY CONTINUE
            }

            const reportedPeptideId = peptideEntry.reportedPeptideId;

            const proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = peptideEntry.proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId

            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
            {
                { // reportedPeptideSequence
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay : peptideEntry.reportedPeptideSequence,
                        valueSort : peptideEntry.reportedPeptideSequence
                    })
                    columnEntries.push( columnEntry );
                }

                { // Unique
                    let value = "";
                    let valueSort = 1;
                    if (  peptideEntry.peptideUnique ) {
                        value = "*";  //  Display '*' if peptide unique
                        valueSort = 0;  // Sort unique above not unique
                    }
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay : value,
                        valueSort : valueSort
                    });
                    columnEntries.push( columnEntry );
                }

                { // numPsms
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay : peptideEntry.numPsms.toLocaleString(),
                        valueSort : peptideEntry.numPsms
                    })
                    columnEntries.push( columnEntry );
                }
            }
            { //  Score Columns
                const annotationTypeRecords_DisplayOrder = createReportedPeptideDisplayData_result.annotationTypeRecords_DisplayOrder;

                {  //  Reported Peptide Scores
                    const annotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries;
                    for ( const annotationType of annotationTypesForPeptideListEntries ) {
                        if ( peptideEntry.peptideAnnotationMap_KeyAnnType === undefined || peptideEntry.peptideAnnotationMap_KeyAnnType === null ) {
                            const msg = "( peptideEntry.peptideAnnotationMap === undefined || peptideEntry.peptideAnnotationMap === null )"
                            console.warn( msg );
                            throw Error( msg );
                        }
                        const annotationEntry = peptideEntry.peptideAnnotationMap_KeyAnnType.get( annotationType.annotationTypeId );
                        let valueSort : any = annotationEntry.valueDouble;
                        if ( valueSort === undefined || valueSort === null ) {
                            valueSort = annotationEntry.valueString; //  Needed for Descriptive Annotation Types
                        }
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay : annotationEntry.valueString,
                            valueSort
                        })
                        columnEntries.push( columnEntry );
                    }
                }
            }

            const psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter = new PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter({
                projectSearchId,
                reportedPeptideId,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId: proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
                searchDataLookupParamsRoot,
                loadedDataPerProjectSearchIdHolder,
                loadedDataCommonHolder,
                dataPageStateManager,
                forMultipleSearchesPage : true  // Always true for Experiment
            });

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : reportedPeptideId,
                sortOrder_OnEquals : reportedPeptideId,
                columnEntries,
                dataRow_GetChildTable_ReturnReactComponent_Parameter : psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
            })
            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        dataTable_DataRowEntries
    });

    const tableOptions = new DataTable_TableOptions({
        dataRow_GetChildTable_ReturnReactComponent : psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent
    });

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}
