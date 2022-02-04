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
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_Column_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry_DownloadTable,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

//  Local

import { createReportedPeptideDisplayData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData';
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {
    searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject,
    SearchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list_search_sub_groups_for_single_reported_peptide/js/searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject";
import {reportedPeptidesForSingleSearch_ChildReactComponents_Other} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/jsx/reportedPeptidesForSingleSearch_ChildReactComponents_Other";
import {
    PsmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter, psmList_Wrapper__Get_RowChildDataTable
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__psm_list_for_reported_peptide_container_component/js/psmList_Wrapper_ChildReactComponent";
import {CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";

////////////////

const dataTableId_ThisTable = "Experiment Protein Single Protein Single Peptide Search List Table";

////////////////

/**
 * Used as class for object in call to reportedPeptidesForSingleSearch_createChildTableObjects
 */
export class ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter {

    searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
    projectSearchId : number
    reportedPeptideIds_ForDisplay : Set<number>  // reportedPeptideIds specific to ParentPeptide
    dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

    /**
     * Used as class for object in call to reportedPeptidesForSingleSearch_createChildTableObjects
     */
    constructor(
        {
            searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            projectSearchId,
            reportedPeptideIds_ForDisplay,
            dataPerReportedPeptideId_Map_Key_reportedPeptideId,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            searchDataLookupParamsRoot,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            dataPageStateManager
        } : {
            searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            projectSearchId : number
            reportedPeptideIds_ForDisplay : Set<number>  // reportedPeptideIds specific to ParentPeptide
            dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root,
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
            dataPageStateManager : DataPageStateManager
        }) {

        this.searchSubGroup_Ids_Selected = searchSubGroup_Ids_Selected;
        this.projectSearchId = projectSearchId;
        this.reportedPeptideIds_ForDisplay = reportedPeptideIds_ForDisplay;
        this.dataPerReportedPeptideId_Map_Key_reportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId;
        this.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;
        this.loadedDataCommonHolder = loadedDataCommonHolder;
        this.dataPageStateManager = dataPageStateManager;
    }
}

/**
 * 
 * @returns ReportedPeptidesForSingleSearch_createChildTableObjects_Result
 */
export const reportedPeptidesForSingleSearch_createChildTableObjects = ({

    reportedPeptidesForSingleSearch_createChildTableObjects_Parameter
} : {
    reportedPeptidesForSingleSearch_createChildTableObjects_Parameter : ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter

}) : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue => {

    const searchSubGroup_Ids_Selected : Set<number> = //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.searchSubGroup_Ids_Selected;

    const projectSearchId = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.projectSearchId;
    const reportedPeptideIds_ForDisplay = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.reportedPeptideIds_ForDisplay;
    const dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry> =
        reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.dataPerReportedPeptideId_Map_Key_reportedPeptideId;
    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    const searchDataLookupParamsRoot = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.searchDataLookupParamsRoot;

    const loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.loadedDataPerProjectSearchIdHolder;
    const loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.loadedDataCommonHolder;
    const dataPageStateManager : DataPageStateManager = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.dataPageStateManager;

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

    let reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param: {
        reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId : Array<number>
    } = {
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
            searchSubGroup_Ids_Selected,
            projectSearchId,
            reportedPeptideIds_ForDisplay,
            dataPerReportedPeptideId_Map_Key_reportedPeptideId,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            searchDataLookupParamsRoot,
            dataPageStateManager
        });

        const result : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue = {
            dataTable_RootTableObject
        }

        return result; //  EARLY RETURN
    }

    const promise_Containing_dataTable_RootTableObject = new Promise<DataTable_RootTableObject>( ( resolve, reject ) => {
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
                        searchSubGroup_Ids_Selected,
                        projectSearchId,
                        reportedPeptideIds_ForDisplay,
                        dataPerReportedPeptideId_Map_Key_reportedPeptideId,
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                        loadedDataPerProjectSearchIdHolder,
                        loadedDataCommonHolder,
                        searchDataLookupParamsRoot,
                        dataPageStateManager
                    });

                    resolve( dataTable_RootTableObject );

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

    const result : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue = {
        promise_Containing_dataTable_RootTableObject
    }

    return result;
}

/**
 * Sort the Reported Peptide List.
 * 
 */
const _create_dataTable_RootTableObject = function(
    {
        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        projectSearchId,
        reportedPeptideIds_ForDisplay,
        dataPerReportedPeptideId_Map_Key_reportedPeptideId,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        searchDataLookupParamsRoot,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager

    } : {
        searchSubGroup_Ids_Selected : Set<number> //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        projectSearchId : number
        reportedPeptideIds_ForDisplay : Set<number>
        dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
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
        searchDataLookupParamsRoot,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager
    });

    //  Columns

    const dataTable_Columns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {
        {
            const displayName = "Reported Peptide";

            const dataTable_Column = new DataTable_Column({
                id : "repPeptIds", // Used for tracking sort order. Keep short
                displayName,
                width : 400,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
        {
            const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => {
                return reportedPeptidesForSingleSearch_ChildReactComponents_Other.uniqueColumnHeader_Tooltip_Create();
            }

            const displayName = "Unique";

            const dataTable_Column = new DataTable_Column({
                id : "unique", // Used for tracking sort order. Keep short
                displayName,
                width : 55,
                sortable : true,
                columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
        {
            let displayName = "PSMs";

            if ( searchSubGroup_Ids_Selected ) {

                displayName = "Total PSMs";
            }

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
        //  Score Columns
        const annotationTypeRecords_DisplayOrder = createReportedPeptideDisplayData_result.annotationTypeRecords_DisplayOrder;
        // annotationTypeRecords_DisplayOrder { psmAnnotationTypesForPeptideListEntries, reportedPeptideAnnotationTypesForPeptideListEntries

        {  //  Reported Peptide Scores
            const reportedPeptideAnnotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForAnnotationTypeIds;
            for ( const reportedPeptideAnnotationType of reportedPeptideAnnotationTypesForPeptideListEntries ) {

                const displayName = reportedPeptideAnnotationType.name;

                const dataTable_Column = new DataTable_Column({
                    id : "rp_" + reportedPeptideAnnotationType.name, // Used for tracking sort order. Keep short
                    displayName,
                    width : 105,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
        }
    }

    //  Data Rows

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];
    const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

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

                    const valueDisplay = peptideEntry.reportedPeptideSequence;
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort : peptideEntry.reportedPeptideSequence
                    })
                    columnEntries.push( columnEntry );

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                { // Unique
                    let value = "";
                    let valueSort = 1;
                    if (  peptideEntry.peptideUnique ) {
                        value = "*";  //  Display '*' if peptide unique
                        valueSort = 0;  // Sort unique above not unique
                    }

                    const valueDisplay = value;
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort : valueSort
                    });
                    columnEntries.push( columnEntry );

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                { // numPsms

                    const valueDisplay = peptideEntry.numPsms.toLocaleString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort : peptideEntry.numPsms
                    })
                    columnEntries.push( columnEntry );

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
            }
            { //  Score Columns
                const annotationTypeRecords_DisplayOrder = createReportedPeptideDisplayData_result.annotationTypeRecords_DisplayOrder;

                {  //  Reported Peptide Scores
                    const annotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForAnnotationTypeIds;
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

                        const valueDisplay = annotationEntry.valueString;
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort
                        })
                        columnEntries.push( columnEntry );

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                }
            }

            if ( searchSubGroup_Ids_Selected ) {

                const searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter = new SearchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter({
                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    projectSearchId,
                    reportedPeptideId_ForDisplay : reportedPeptideId,
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId: proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
                    dataPerReportedPeptideId_Map_Key_reportedPeptideId,
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                    searchDataLookupParamsRoot,
                    loadedDataPerProjectSearchIdHolder,
                    loadedDataCommonHolder,
                    dataPageStateManager
                });

                const dataRow_GetChildTableData_Return_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : DataTable_RootTableObject => {

                        const dataTable_RootTableObject : DataTable_RootTableObject =
                            searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject(
                                searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter
                            );

                        return dataTable_RootTableObject;
                    }

                const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId : reportedPeptideId,
                    sortOrder_OnEquals : reportedPeptideId,
                    columnEntries,
                    dataTable_DataRowEntry_DownloadTable,
                    dataRow_GetChildTableData_Return_DataTable_RootTableObject
                });

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );

            } else {

                const psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter = new PsmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter({
                    projectSearchId,
                    reportedPeptideId,
                    searchSubGroupId : undefined,
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId: proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
                    searchDataLookupParamsRoot,
                    loadedDataPerProjectSearchIdHolder,
                    loadedDataCommonHolder,
                    dataPageStateManager,
                    forMultipleSearchesPage : true  // Always true for Experiment
                });

                const dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                        return psmList_Wrapper__Get_RowChildDataTable({
                            psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter
                        });
                    }

                const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId : reportedPeptideId,
                    sortOrder_OnEquals : reportedPeptideId,
                    columnEntries,
                    dataTable_DataRowEntry_DownloadTable,
                    dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject
                });

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );
            }

            //  dataTable_DataRowEntries added to inside both 'if' 'else'

        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        columns_tableDownload : dataTable_Column_DownloadTable_Entries,
        dataTable_DataRowEntries
    });

    const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: false});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}
