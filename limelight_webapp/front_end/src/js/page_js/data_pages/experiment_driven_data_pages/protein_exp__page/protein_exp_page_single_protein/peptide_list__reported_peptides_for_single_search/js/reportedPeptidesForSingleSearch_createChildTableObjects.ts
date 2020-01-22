/**
 * reportedPeptidesForSingleSearch_createChildTableObjects.ts
 * 
 * Experiment Protein Page: Single Protein: show Reported Peptides for Single Search for Single Peptide in Peptide List
 * 
 * Create     DataTable_RootTableObject for child table
 */

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import { ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page//protein_page_single_search/proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer';

import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page//protein_page_single_search/proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer';

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

import { psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent, PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__psm_list_for_reported_peptide_container_component/js/psmList_Wrapper_ReturnChildReactComponent';

//  Local

import { ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/reportedPeptidesForSingleSearch_ReturnChildReactComponent'

import { createReportedPeptideDisplayData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData';

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
    const reportedPeptideIds : Set<number> = dataRow_GetChildTable_ReturnReactComponent_Parameter.reportedPeptideIds;
    const reporterIonMassesSelected = dataRow_GetChildTable_ReturnReactComponent_Parameter.reporterIonMassesSelected;
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

    let reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param = {
        reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId  //  Reported Peptide Ann Type Ids To Display
    }; 

    const proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
        loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
    });
        
    const proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer({
        loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder ,
        loadedDataCommonHolder,
        dataPageStateManager_DataFrom_Server : dataPageStateManager,
        searchDetailsBlockDataMgmtProcessing : undefined , // not provided
        proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
    });

    const promise_loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch = (
        proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch( { 
            reportedPeptideIds, projectSearchId, 
            reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param
        } )
    );

    if ( ! promise_loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch ) {

        const dataTable_RootTableObject : DataTable_RootTableObject = _create_dataTable_RootTableObject({
            projectSearchId,
            reportedPeptideIds,
            reporterIonMassesSelected,
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
                        reportedPeptideIds,
                        reporterIonMassesSelected,
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
const _create_dataTable_RootTableObject = function({
    projectSearchId,
    reportedPeptideIds,
    reporterIonMassesSelected,
    searchDataLookupParamsRoot,
    loadedDataPerProjectSearchIdHolder,
    loadedDataCommonHolder,
    dataPageStateManager

} : {
    projectSearchId : number
    reportedPeptideIds : Set<number>
    reporterIonMassesSelected : Set<number>
    searchDataLookupParamsRoot
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

}) : DataTable_RootTableObject {


    const createReportedPeptideDisplayData_result = createReportedPeptideDisplayData({
        reportedPeptideIdsForDisplay : reportedPeptideIds, 
        reporterIonMassesSelected, 
        proteinSequenceVersionId : undefined/* Only for error reporting */, 
        projectSearchId, 
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager,

        forMultipleSearchesPage : true
    });

    // createReportedPeptideDisplayData_result:
    //     peptideList: [{…}]
    //     numberOfReportedPeptides: 1
    //     numberOfPsmsForReportedPeptides: 4
    //     annotationTypeRecords_DisplayOrder { psmAnnotationTypesForPeptideListEntries, reportedPeptideAnnotationTypesForPeptideListEntries }:
    // peptideList array element:
    //     reportedPeptideId: 141285
    //     reportedPeptideSequence: "EKKLE[9945.4689]ERRKRRRFLSPQQPPLLLPL - FAKE, has Isotope Label - commented out"
    //     numPsms: 4
    //     peptideAnnotationMap: {3750: {…}}
    //     psmAnnotationMap: {3756: {…}}

    // peptideAnnotationMap: Object
    //     One Entry:
    //     3750: Object Property Key
    //     {  Object Property Value
    //         annotationTypeId: 3750
    //         valueDouble: 0
    //         valueString: "0.000000"
    //     }
    // psmAnnotationMap: Same as peptideAnnotationMap

    // reportedPeptideAnnotationTypesForPeptideListEntries: Array
    // One entry {
    //     annotationTypeId: 3750
    //     searchProgramsPerSearchId: 438
    //     name: "q-value"
    //     defaultVisible: true
    //     displayOrder: 1
    //     description: "The minimum false discovery among all predictions with this score or better."
    //     filterDirectionAbove: false
    //     filterDirectionBelow: true
    //     defaultFilter: true
    //     defaultFilterValue: 0.05
    //     defaultFilterValueString: "0.05"
    //     sortOrder: null
    //     sorttype: "number"
    // }
    // psmAnnotationTypesForPeptideListEntries : same as reportedPeptideAnnotationTypesForPeptideListEntries

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
        {  //  PSM Scores
            const psmAnnotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries;
            for ( const psmAnnotationType of psmAnnotationTypesForPeptideListEntries ) {
                
                const dataTable_Column = new DataTable_Column({
                    id : "psm_" + psmAnnotationType.name, // Used for tracking sort order. Keep short
                    displayName : "Best PSM: " + psmAnnotationType.name,
                    width : 105,
                    sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 }
                });
                dataTable_Columns.push( dataTable_Column );
            }
        }
        // One entry {
            //     annotationTypeId: 3750
            //     searchProgramsPerSearchId: 438
            //     name: "q-value"
            //     defaultVisible: true
            //     displayOrder: 1
            //     description: "The minimum false discovery among all predictions with this score or better."
            //     filterDirectionAbove: false
            //     filterDirectionBelow: true
            //     defaultFilter: true
            //     defaultFilterValue: 0.05
            //     defaultFilterValueString: "0.05"
            //     sortOrder: null
            //     sorttype: "number"
            // }
    }

    //  Data Rows

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        for ( const peptideEntry of createReportedPeptideDisplayData_result.peptideList ) {

            const reportedPeptideId = peptideEntry.reportedPeptideId;
    // peptideList array element:
    //     reportedPeptideId: 141285
    //     reportedPeptideSequence: "EKKLE[9945.4689]ERRKRRRFLSPQQPPLLLPL - FAKE, has Isotope Label - commented out"
    //     numPsms: 4
    //     peptideAnnotationMap: {3750: {…}}
    //     psmAnnotationMap: {3756: {…}}
            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
            {
                { // reportedPeptideSequence
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay : peptideEntry.reportedPeptideSequence,
                        valueSort : peptideEntry.reportedPeptideSequence
                    })
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
                        const annotationEntry = peptideEntry.peptideAnnotationMap[ annotationType.annotationTypeId ];
                        let valueSort = annotationEntry.valueDouble;
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
                {  //  PSM Best Scores
                    const annotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries;
                    for ( const annotationType of annotationTypesForPeptideListEntries ) {
                        const annotationEntry = peptideEntry.psmAnnotationMap[ annotationType.annotationTypeId ];
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay : annotationEntry.valueString,
                            valueSort : annotationEntry.valueDouble
                        })
                        columnEntries.push( columnEntry );
                    }
                }
            }

            const psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter = new PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter({
                projectSearchId,
                reportedPeptideId,
                reporterIonMassesSelected,
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
    
// import { psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent, PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__psm_list_for_reported_peptide_container_component/js/psmList_Wrapper_ReturnChildReactComponent';

    const tableOptions = new DataTable_TableOptions({
        //  Comment out since no further drill down to child table
        // dataRow_GetChildTableData : fake_dataRow_GetChildTableData          //  TODO  Need to provide this for child table processing
        dataRow_GetChildTable_ReturnReactComponent : psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent
    });

    //  psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent, PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}


//////////////////////////


/**
 * Sort the Reported Peptide List.
 * 
 */
const _sort_reportedPeptideList = function({

    reportedPeptideList,
    projectSearchId,
    dataPageStateManager
} : {
    reportedPeptideList
    projectSearchId : number
    dataPageStateManager : DataPageStateManager 
}) {

    //   Sort Reported Peptide Array on Reported Peptide Ann Types Sort Order then Reported Peptide Id

    /**
     * Return array ann type entries, sorted on sortOrder
     */
    let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated = _get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated({ projectSearchId, dataPageStateManager });

    let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated.length;

    reportedPeptideList.sort( function( a, b ) {

        //  Compare Reported Peptide Ann Values, if they are populated
        let a_reportedPeptideAnnotationMap = a.reportedPeptideAnnotationMap;
        let b_reportedPeptideAnnotationMap = b.reportedPeptideAnnotationMap;
        if ( a_reportedPeptideAnnotationMap && b_reportedPeptideAnnotationMap ) {

            for ( let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index = 0; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index < reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index++ ) {
                let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated[ reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index ];
                let annotationTypeId = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.annotationTypeId;
                let a_reportedPeptideAnnotationMap_ForAnnType = a_reportedPeptideAnnotationMap[ annotationTypeId ];
                let b_reportedPeptideAnnotationMap_ForAnnType = b_reportedPeptideAnnotationMap[ annotationTypeId ];
                
                if ( a_reportedPeptideAnnotationMap_ForAnnType && b_reportedPeptideAnnotationMap_ForAnnType ) {
                    if ( reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionBelow ) {
                        if ( a_reportedPeptideAnnotationMap_ForAnnType.valueDouble < b_reportedPeptideAnnotationMap_ForAnnType.valueDouble ) {
                            return -1;
                        }
                        if ( a_reportedPeptideAnnotationMap_ForAnnType.valueDouble > b_reportedPeptideAnnotationMap_ForAnnType.valueDouble ) {
                            return 1;
                        }
                        //  Values match so go to next ann type values
                    } else if ( reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionAbove ) {
                        if ( a_reportedPeptideAnnotationMap_ForAnnType.valueDouble > b_reportedPeptideAnnotationMap_ForAnnType.valueDouble ) {
                            return -1;
                        }
                        if ( a_reportedPeptideAnnotationMap_ForAnnType.valueDouble < b_reportedPeptideAnnotationMap_ForAnnType.valueDouble ) {
                            return 1;
                        }
                        //  Values match so go to next ann type values
                    } else {
                        throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
                    }
                }
            }
        }
        
        //  All Reported Peptide Ann Type Values match so order on reportedPeptide id
        if ( a.reportedPeptideId < b.reportedPeptideId ) {
            return -1;
        }
        if ( a.reportedPeptideId > b.reportedPeptideId ) {
            return 1;
        }
        return 0;
    });
}

/**
 * Return array ann type entries, sorted on sortOrder
 */
const _get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated = function({ 
    
    projectSearchId, 
    dataPageStateManager
} : { 
    projectSearchId : number, 
    dataPageStateManager : DataPageStateManager 
}) {

    //   Get all ReportedPeptide annotation type records with sortOrder set

    let annotationTypeData = dataPageStateManager.get_annotationTypeData();

    let annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
    if ( ( ! annotationTypeDataForProjectSearchId ) ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }

    let reportedPeptideFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
    if ( ! reportedPeptideFilterableAnnotationTypes ) {
        //  No data so return empty array
        return []; //  EARLY RETURN
    }
    
    //  Get AnnotationType Records where sortOrder is populated
    
    let reportedPeptideFilterableAnnotationTypes_SortOrderPopulated = [];
    
    let reportedPeptideFilterableAnnotationTypes_Keys = Object.keys ( reportedPeptideFilterableAnnotationTypes );
    
    reportedPeptideFilterableAnnotationTypes_Keys.forEach( function( reportedPeptideFilterableAnnotationTypesKeyItem, index, array ) {
        let annotationTypeEntryForKey = reportedPeptideFilterableAnnotationTypes[ reportedPeptideFilterableAnnotationTypesKeyItem ];
        if ( annotationTypeEntryForKey.sortOrder ) {
            reportedPeptideFilterableAnnotationTypes_SortOrderPopulated.push( annotationTypeEntryForKey );
        }
    }, this );

    
    //  Sort on sort order
    
    reportedPeptideFilterableAnnotationTypes_SortOrderPopulated.sort(function(a, b) {
        if ( a.sortOrder < b.sortOrder ) {
            return -1;
        }
        if ( a.sortOrder > b.sortOrder ) {
            return 1;
        }
        return 0;
    })
    
    return reportedPeptideFilterableAnnotationTypes_SortOrderPopulated;
};

/////////////////////////////////////////////////


/**
 * 
 */
const _getAnnotationTypeRecords_DisplayOrder = function({ 
    
    reportedPeptideList, 
    projectSearchId,
    dataPageStateManager
} : { 
    reportedPeptideList : Array<any>, 
    projectSearchId : number,
    dataPageStateManager : DataPageStateManager
} ) {

    //   Get all annotation type ids returned in all entries and produce a list of them to put in columns
    
    let annotationTypeData = dataPageStateManager.get_annotationTypeData();

    let annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
    if ( ( ! annotationTypeDataForProjectSearchId ) ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }
    
    let allReportedPeptideAnnotationTypeIds_InReportedPeptideList = {};

    reportedPeptideList.forEach( function( reportedPeptideListItem, index, array ) {
        let reportedPeptideAnnotationMap = reportedPeptideListItem.reportedPeptideAnnotationMap;
        if ( reportedPeptideAnnotationMap ) {
            Object.keys ( reportedPeptideAnnotationMap ).forEach( function( reportedPeptideAnnotationMapKeyItem, index, array ) {
                let reportedPeptideAnnotationDTOItem = reportedPeptideAnnotationMap[ reportedPeptideAnnotationMapKeyItem ];
                allReportedPeptideAnnotationTypeIds_InReportedPeptideList[ reportedPeptideAnnotationDTOItem.annotationTypeId ] = reportedPeptideAnnotationDTOItem.annotationTypeId;
            }, this );
        }
    }, this );
    
    //  Pull AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
    
    let reportedPeptideAnnotationTypesForReportedPeptideListEntries = [];
    
    //  ReportedPeptide
    
    let allReportedPeptideAnnotationTypeIds_InReportedPeptideListKeys = Object.keys ( allReportedPeptideAnnotationTypeIds_InReportedPeptideList );
    if ( allReportedPeptideAnnotationTypeIds_InReportedPeptideListKeys.length > 0 ) {
        //  Have ReportedPeptide AnnotationType entries in Peptide list so must have ReportedPeptide AnnotationType records
        let reportedPeptideFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes
        let reportedPeptideDescriptiveAnnotationTypes = annotationTypeDataForProjectSearchId.reportedPeptideDescriptiveAnnotationTypes
        if ( ( ! reportedPeptideFilterableAnnotationTypes ) && ( ! reportedPeptideDescriptiveAnnotationTypes ) ) {
            throw Error("No reportedPeptideFilterableAnnotationTypes or reportedPeptideDescriptiveAnnotationTypes but have allReportedPeptideAnnotationTypeIds_InReportedPeptideList entries");
        }
        //  Get AnnotationTypeRecords for AnnotationTypeIds
        Object.keys ( allReportedPeptideAnnotationTypeIds_InReportedPeptideList ).forEach( function( allReportedPeptideAnnotationTypeIds_InReportedPeptideListKeyItem, index, array ) {
            let annotationTypeEntryForKey = reportedPeptideFilterableAnnotationTypes[ allReportedPeptideAnnotationTypeIds_InReportedPeptideListKeyItem ];
            if ( ! annotationTypeEntryForKey ) {
                annotationTypeEntryForKey = reportedPeptideDescriptiveAnnotationTypes[ allReportedPeptideAnnotationTypeIds_InReportedPeptideListKeyItem ];
                if ( ! annotationTypeEntryForKey ) {
                    throw Error( "No reportedPeptideFilterableAnnotationTypes or reportedPeptideDescriptiveAnnotationTypes entry for key: " + allReportedPeptideAnnotationTypeIds_InReportedPeptideListKeyItem );
                }
            }
            reportedPeptideAnnotationTypesForReportedPeptideListEntries.push( annotationTypeEntryForKey );
        }, this );
    }

    //  Sort this result array, on display order, then by ann type name
    
    _sort_AnnotationTypes_OnDisplayOrderAnnTypeName( { annTypesArray : reportedPeptideAnnotationTypesForReportedPeptideListEntries } );
    
    return {
        reportedPeptideAnnotationTypesForReportedPeptideListEntries : reportedPeptideAnnotationTypesForReportedPeptideListEntries
    };
}


/**
 * 
 */
const _sort_AnnotationTypes_OnDisplayOrderAnnTypeName = function( { annTypesArray } ) {

    annTypesArray.sort( function( a, b ) {
        if ( a.displayOrder && b.displayOrder ) {
            //  both a and b have display order so order them
            if ( a.displayOrder < b.displayOrder ) {
                return -1;
            }
            if ( a.displayOrder > b.displayOrder ) {
                return 1;
            }
            return 0;
        }
        if ( a.displayOrder ) {
            //  Only a has display order so order it first
            return -1;
        }
        if ( b.displayOrder ) {
            //  Only b has display order so order it first
            return 1;
        }
        //  Order on ann type name
        let nameCompare = a.name.localeCompare( b.name );
        return nameCompare;
    });
}

