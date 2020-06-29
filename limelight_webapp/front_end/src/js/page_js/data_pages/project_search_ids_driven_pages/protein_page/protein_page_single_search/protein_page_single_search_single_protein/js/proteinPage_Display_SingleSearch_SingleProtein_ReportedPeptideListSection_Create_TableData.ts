/**
 * proteinPage_Display_SingleSearch_SingleProtein_ReportedPeptideListSection_Create_TableData.ts
 * 
 * Get Data Table From Reported Peptide Id List
 * 
 * Create Root Table with Reported Peptide String, Reported Peptide Annotation values to display, and best PSM Annotation values filtered on
 * 
 */
import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

//   From data_pages_common
import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItems_PerProjectSearchId, AnnotationTypeItem }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

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

import { createReportedPeptideDisplayData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData';

////////////////

const dataTableId_ThisTable = "Experiment Protein Single Protein Single Peptide Search List Table";

////////////////

/**
 * returned from reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects
 */
export class ReportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result {

    dataTable_RootTableObject : DataTable_RootTableObject
    numberOfPsmsForReportedPeptides : number
    numberOfReportedPeptides : number
}

/**
 * 
 * @returns ReportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result
 */
export const reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects = ({

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

}) : ReportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result => {

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
            const msg = "reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects(...): searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList not contain entry for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }
        //  Validate all are numbers
        for ( const reportedPeptideAnnTypeId of reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) {
            if ( ! variable_is_type_number_Check( reportedPeptideAnnTypeId) ) {
                const msg = "reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects(...): searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList[X].reportedPeptideAnnTypeDisplay contains a non-number: |" + reportedPeptideAnnTypeId + "|, projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }
        }
    }

    const {
        dataTable_RootTableObject,
        numberOfPsmsForReportedPeptides,
        numberOfReportedPeptides
    } : {
        dataTable_RootTableObject : DataTable_RootTableObject,
        numberOfPsmsForReportedPeptides : number,
        numberOfReportedPeptides : number

    } = _create_dataTable_RootTableObject({
        projectSearchId,
        reportedPeptideIds,
        reporterIonMassesSelected,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        searchDataLookupParamsRoot,
        dataPageStateManager
    });

    const result = new ReportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result();
    result.dataTable_RootTableObject = dataTable_RootTableObject;
    result.numberOfPsmsForReportedPeptides = numberOfPsmsForReportedPeptides;
    result.numberOfReportedPeptides = numberOfReportedPeptides;

    return result; //  EARLY RETURN
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

}) : {
    dataTable_RootTableObject : DataTable_RootTableObject
    numberOfPsmsForReportedPeptides : number
    numberOfReportedPeptides : number
} {


    const createReportedPeptideDisplayData_result = createReportedPeptideDisplayData({
        reportedPeptideIdsForDisplay : reportedPeptideIds, 
        reporterIonMassesSelected, 
        proteinSequenceVersionId : undefined/* Only for error reporting */, 
        projectSearchId, 
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager,

        forMultipleSearchesPage : false
    });

    // createReportedPeptideDisplayData_result:
    //     annotationTypeRecords_DisplayOrder:Object {psmAnnotationTypesForPeptideListEntries: Array(1), reportedPeptideAnnotationTypesForPeptideListEntries: Array(2)}
    //     numberOfPsmsForReportedPeptides:1
    //     numberOfReportedPeptides:1
    //     peptideList:Array(1) [Object]

    if ( ! variable_is_type_number_Check( createReportedPeptideDisplayData_result.numberOfPsmsForReportedPeptides ) ) {
        const msg = "createReportedPeptideDisplayData_result.numberOfPsmsForReportedPeptides is not a number.  is: " + createReportedPeptideDisplayData_result.numberOfPsmsForReportedPeptides;
        console.warn( msg );
        throw Error( msg );
    }
    if ( ! variable_is_type_number_Check( createReportedPeptideDisplayData_result.numberOfReportedPeptides ) ) {
        const msg = "createReportedPeptideDisplayData_result.numberOfReportedPeptides is not a number.  is: " + createReportedPeptideDisplayData_result.numberOfReportedPeptides;
        console.warn( msg );
        throw Error( msg );
    }

    const numberOfPsmsForReportedPeptides = createReportedPeptideDisplayData_result.numberOfPsmsForReportedPeptides;
    const numberOfReportedPeptides = createReportedPeptideDisplayData_result.numberOfReportedPeptides;


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
                        if ( peptideEntry.peptideAnnotationMap === undefined || peptideEntry.peptideAnnotationMap === null ) {
                            const msg = "( peptideEntry.peptideAnnotationMap === undefined || peptideEntry.peptideAnnotationMap === null )"
                            console.warn( msg );
                            throw Error( msg );
                        }
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
                        if ( peptideEntry.psmAnnotationMap === undefined || peptideEntry.psmAnnotationMap === null ) {
                            const msg = "( peptideEntry.psmAnnotationMap === undefined || peptideEntry.psmAnnotationMap === null )"
                            console.warn( msg );
                            throw Error( msg );
                        }
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

    return {
        dataTable_RootTableObject,
        numberOfPsmsForReportedPeptides,
        numberOfReportedPeptides
    };
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
    let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated : Array<AnnotationTypeItem> = _get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated({ projectSearchId, dataPageStateManager });

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
}) : Array<AnnotationTypeItem> {

    //   Get all ReportedPeptide annotation type records with sortOrder set

    let annotationTypeData_Root : AnnotationTypeData_Root = dataPageStateManager.get_annotationTypeData_Root();

    let annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( annotationTypeDataForProjectSearchId === undefined || annotationTypeDataForProjectSearchId === null ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }

    let reportedPeptideFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
    if ( ! reportedPeptideFilterableAnnotationTypes_Map ) {
        //  No data so return empty array
        return []; //  EARLY RETURN
    }
    
    //  Get AnnotationType Records where sortOrder is populated
    
    let reportedPeptideFilterableAnnotationTypes_SortOrderPopulated : Array<AnnotationTypeItem> = [];
    
    for ( const reportedPeptideFilterableAnnotationTypes_MapEntry of reportedPeptideFilterableAnnotationTypes_Map.entries() ) {
        let annotationTypeEntry = reportedPeptideFilterableAnnotationTypes_MapEntry[ 1 ]; // Map Entry Value
        if ( annotationTypeEntry.sortOrder ) {
            reportedPeptideFilterableAnnotationTypes_SortOrderPopulated.push( annotationTypeEntry );
        }
    }
    
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
