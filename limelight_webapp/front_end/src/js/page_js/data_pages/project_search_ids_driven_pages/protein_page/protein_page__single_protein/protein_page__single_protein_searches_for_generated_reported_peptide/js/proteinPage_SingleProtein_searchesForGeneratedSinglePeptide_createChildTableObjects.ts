/**
 * proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_createChildTableObjects.ts
 * 
 * Protein Page: Multiple Search : Single Protein: show searches for Generated Single Peptide in Peptide List
 * 
 * Create     DataTable_RootTableObject for child table
 */

 ////    !!!!!!!  No Import for CreateReportedPeptideDisplayData_Result_Entry

import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import {
    CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry,
    CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry
} from '../../js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData';
import {Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {
    reportedPeptidesForSingleSearch_createChildTableObjects,
    ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_createChildTableObjects";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";

////////////

const dataTableId_ThisTable = "Protein Single Protein Single Peptide Search List Table";

////////////



/**
 * Used as class for function proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects
 */
export class ProteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects_Parameter {

    createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
    projectSearchIds : Array<number>
    dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId : Map<number, Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>>  //  Reported Peptide Ids for this specific parent Peptide
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    dataPageStateManager : DataPageStateManager

    /**
     * Used as class for function proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects
     */
    constructor(
        {
            createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow,
            projectSearchIds,
            dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            searchDataLookupParamsRoot,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            dataPageStateManager
        } : {
            createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
            projectSearchIds : Array<number>,
            dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId : Map<number, Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>>  //  Reported Peptide Ids for this specific parent Peptide
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            dataPageStateManager : DataPageStateManager
        }) {

        this.createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow = createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow;
        this.projectSearchIds = projectSearchIds;
        this.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId;
        this.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;
        this.dataPageStateManager = dataPageStateManager;
    }
}

/**
 *
 * @param params
 */
export const proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects = ({

    params
} : {
    params : ProteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects_Parameter
}) : DataTable_RootTableObject => {

    const projectSearchIds = params.projectSearchIds;
    const createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry = params.createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow;
    const dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId = params.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId;
    const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = params.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

    const searchData_SearchName_Etc_Root = params.dataPageStateManager.get_searchData_SearchName_Etc_Root();

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

            const searchNameObj = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
            if ( ! searchNameObj ) {
                const msg = "searchesForSinglePeptide_createChildTableObjects(...): No value in searchData_SearchName_Etc_Root for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }
            const searchName = searchNameObj.name;
            const searchShortName = searchNameObj.searchShortName;
            const searchId = searchNameObj.searchId;

            let searchShortName_Display = "";
            if ( searchShortName ) {
                searchShortName_Display = " (" + searchShortName + ")"
            }

            const searchNameDisplay = searchName + searchShortName_Display + " (" + searchId + ")";

            let psmCount : number = createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
            if ( ! psmCount ) { // is undefined if not in map so then set to 0
                // psmCount = 0;

                //  Skip display row with PSM Count Zero

                continue;  //  EARLY CONTINUE
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
            }

            const dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry> =
                dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId )
            if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {

                //  No Data for this projectSearchId

                continue; // EARLY CONTINUE  !!!
            }

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId =
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )
            if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId ) {

                //  No Data for this projectSearchId

                // continue; // EARLY CONTINUE  !!!

                const msg = "searchesForSinglePeptide_createChildTableObjects(...): No value in reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            const reportedPeptideIds = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds();
            
            if ( ( ! reportedPeptideIds ) || reportedPeptideIds.size === 0 ) {

                //  No Data for this projectSearchId

                // continue; // EARLY CONTINUE  !!!

                const msg = "searchesForSinglePeptide_createChildTableObjects.ts: reportedPeptideIdsMap_KeyProjectSearchId.get( projectSearchId ); returns nothing or empty set";
                console.warn( msg, reportedPeptideIds );
                throw Error( msg );
            }
            if ( reportedPeptideIds.size === undefined ) {
                const msg = "searchesForSinglePeptide_createChildTableObjects.ts: reportedPeptideIds.size === undefined";
                console.warn( msg, reportedPeptideIds );
                throw Error( msg );
            }

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                params.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
            if (!commonData_LoadedFromServer_PerSearch_For_ProjectSearchId) {
                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ); returned no value. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }


            const reportedPeptidesForSingleSearch_createChildTableObjects_Parameter = new ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter({
                for_MultipleSearches_Overall: params.projectSearchIds.length > 1,
                searchSubGroup_Ids_Selected : undefined,
                projectSearchId,
                reportedPeptideIds_ForDisplay : undefined,
                dataPerReportedPeptideId_Map_Key_reportedPeptideId,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                searchDataLookupParamsRoot : params.searchDataLookupParamsRoot,
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                dataPageStateManager : params.dataPageStateManager
            });

            const dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject =
                ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> =>
                {
                    const result : Promise<DataTable_RootTableObject> =
                        reportedPeptidesForSingleSearch_createChildTableObjects({ reportedPeptidesForSingleSearch_createChildTableObjects_Parameter });

                    return result;
                }

            const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : projectSearchId,
                sortOrder_OnEquals : projectSearchId,
                columnEntries,
                dataTable_DataRowEntry_DownloadTable,
                dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject
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
        columns_tableDownload: dataTable_Column_DownloadTable_Entries,
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
