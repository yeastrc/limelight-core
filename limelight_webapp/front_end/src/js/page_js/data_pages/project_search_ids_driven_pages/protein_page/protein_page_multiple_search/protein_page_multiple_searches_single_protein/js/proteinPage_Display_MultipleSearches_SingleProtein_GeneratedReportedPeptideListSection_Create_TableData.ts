/**
 * proteinPage_Display_MultipleSearches__SingleProteinGeneratedReportedPeptideListSection_Create_TableData.ts
 * 
 * Get Data Table from Peptide List
 * 
 * Create Root Table with Generated Peptide String, and PSM Counts per condition in first condition group
 *
 */

//   From data_pages_common
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import {
    DataTable_RootTableObject,
    DataTable_TableOptions,
    DataTable_Column,
    DataTable_RootTableDataObject,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent,
    DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent,
    DataTable_DataRowEntry__Get_RowChildContent_CallParams,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject,
    DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result, CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry } from './proteinPage_Display_MultipleSearches_SingleProtein_Create_GeneratedReportedPeptideListData';


//  Child Data Searches for Single Peptide show/hide

import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/jsx/proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_And_Tooltip_DataTable_Component";
import {proteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components_Other} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/jsx/proteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components_Other";
import {
    reportedPeptidesForSingleSearch_createChildTableObjects,
    ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_createChildTableObjects";
import {
    proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects,
    ProteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects_Parameter
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/protein_page_multiple_searches_single_protein_searches_for_generated_reported_peptide/js/proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_createChildTableObjects";


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

    searchSubGroup_Ids_Selected,

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
    proteinSequenceVersionId, 
    projectSearchIds,
    searchDataLookupParamsRoot,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder,
    dataPageStateManager,
    showProteins
} : {
    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,

    searchSubGroup_Ids_Selected : Set<number>

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    proteinSequenceVersionId : number
    projectSearchIds : Array<number>
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager
    showProteins : boolean

} ) : GetDataTableDataObjects_MultipleSearch_SingleProtein_Result {

    const getDataTableDataObjects_Result = new GetDataTableDataObjects_MultipleSearch_SingleProtein_Result();

    const peptideList : Array<CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList;

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
            id : "Peptide_Sequence", // Used for tracking sort order. Keep short
            displayName : "Peptide Sequence",
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
        const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => {
            return proteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components_Other.uniqueColumnHeader_Tooltip_Create();
        }
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
            columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element
        });
        dataTable_Columns.push( dataTable_Column );
    }


    if ( showProteins ) {
        const dataTable_Column = new DataTable_Column({
            id : "Proteins", // Used for tracking sort order. Keep short
            displayName : "Protein(s)",
            width : 220,
            sortable : true,
            style_override_DataRowCell_React : { display: "inline-block", fontSize: 12 }, // whiteSpace: "nowrap", overflowX: "auto",
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    }

    //  PSM Count(s)

    if ( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) {

        const projectSearchId = projectSearchIds[ 0 ];

        const searchSubGroups_Root = dataPageStateManager.get_SearchSubGroups_Root();
        if ( ! searchSubGroups_Root ) {
            const msg = "( ! searchSubGroups_Root ) and ( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected )";
            console.warn( msg );
            throw Error( msg );
        }
        const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) and searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

            if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                //  Skip since not selected for display
                continue;  // EARLY CONTINUE
            }

            const displayName = get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_DataTable_Component({ searchSubGroup });

            const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => {

                return get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component({ searchSubGroup });
            }

            const dataTable_Column = new DataTable_Column({
                id: "psmCount_" + searchSubGroup.searchSubGroup_Id, // Used for tracking sort order. Keep short
                displayName,
                columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,
                width: 70,
                sortable: true
            });
            dataTable_Columns.push(dataTable_Column);
        }

    } else {

        //  PSM counts for each search
        for ( const projectSearchId of projectSearchIds ) {

            //  searchNames // Object with property name is projectSearchId as number

            const searchNameObj = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
            if ( ! searchNameObj ) {
                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): No value in searchNames for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            let displayName : string = undefined;

            if ( projectSearchIds.length > 1 ) {
                const searchName = searchNameObj.name;
                const searchId = searchNameObj.searchId;
                displayName = "PSM Count (" + searchId + ")";
            } else {
                // Special value when only 1 search for Single Search
                displayName = "PSM Count";
            }

            const dataTable_Column = new DataTable_Column({
                id : "psmCount_" + projectSearchId, // Used for tracking sort order. Keep short
                displayName,
                width : 70,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );
        }
    }

    //  Create Table Body

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        let peptideListCounter = 0;

        for ( const peptideEntry of peptideList ) {

            peptideListCounter++;

            const dataTable_DataRow_ColumnEntries: Array<DataTable_DataRow_ColumnEntry> = [];

            {
                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay: peptideEntry.peptideSequenceDisplay,
                    valueSort: peptideEntry.peptideSequenceDisplay,
                    // tooltipText : 
                });
                dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);
            }
            { // Unique
                let value = "";
                let valueSort = 1;
                if (peptideEntry.peptideUnique) {
                    value = "*";  //  Display '*' if peptide unique
                    valueSort = 0;  // Sort unique above not unique
                }
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay: value,
                    valueSort: valueSort
                });
                dataTable_DataRow_ColumnEntries.push(columnEntry);
            }


            if (showProteins) { // Protein(s)

                const proteinNames_Set: Set<string> = new Set();

                for (const projectSearchId of projectSearchIds) {

                    const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                    if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {

                        continue; // EARLY CONTINUE
                    }

                    const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
                    if (!loadedDataPerProjectSearchIdHolder) {

                        continue; // EARLY CONTINUE
                    }

                    const proteinSequenceVersionIdsKeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId();

                    for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                        const dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry[1];
                        const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId

                        const proteinSequenceVersionIds = proteinSequenceVersionIdsKeyReportedPeptideId.get(reportedPeptideId);
                        if (!proteinSequenceVersionIds) {

                            continue; // EARLY CONTINUE
                        }

                        for (const proteinSequenceVersionId of proteinSequenceVersionIds) {

                            const proteinInfo = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId().get(proteinSequenceVersionId);
                            if (!proteinInfo) {
                                const msg = "No value from loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId().get( proteinSequenceVersionId ). proteinSequenceVersionId: " + proteinSequenceVersionId;
                                console.warn(msg);
                                throw Error(msg);
                            }

                            for (const annotation of proteinInfo.annotations) {
                                proteinNames_Set.add(annotation.name)
                            }
                        }
                    }
                }

                const proteinNames_Array: Array<string> = Array.from(proteinNames_Set);
                proteinNames_Array.sort();

                const proteinNames_String = proteinNames_Array.join(", ");

                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay: proteinNames_String,
                    valueSort: proteinNames_String
                })
                dataTable_DataRow_ColumnEntries.push(columnEntry);
            }

            //  PSM Count(s)

            if (projectSearchIds.length === 1 && searchSubGroup_Ids_Selected) {

                const projectSearchId = projectSearchIds[0];

                const searchSubGroups_Root = dataPageStateManager.get_SearchSubGroups_Root();
                if (!searchSubGroups_Root) {
                    const msg = "( ! searchSubGroups_Root ) and ( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected )";
                    console.warn(msg);
                    throw Error(msg);
                }
                const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId(projectSearchId);
                if (!searchSubGroups_ForProjectSearchId) {
                    const msg = "( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) and searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                if (!peptideEntry.psmCountsMap_Key_SubSearchGroup_Id) {
                    const msg = "( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) and ( ! peptideEntry.psmCountsMap_Key_SubSearchGroup_Id ). projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }


                for (const searchSubGroup_Id_Selected of searchSubGroup_Ids_Selected) {

                    let psmCount = peptideEntry.psmCountsMap_Key_SubSearchGroup_Id.get(searchSubGroup_Id_Selected);
                    if (psmCount === undefined) {
                        psmCount = 0;
                    }

                    const psmCountDisplay = psmCount.toLocaleString();

                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay: psmCountDisplay,
                        valueSort: psmCount,
                        // tooltipText :
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                }

            } else {
                for (const projectSearchId of projectSearchIds) {

                    let psmCount = peptideEntry.psmCountsMap_KeyProjectSearchId.get(projectSearchId);
                    if (!psmCount) {
                        psmCount = 0;
                        const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                        if (dataPerReportedPeptideId_Map_Key_reportedPeptideId) {
                            for (const dataPerReportedPeptideId_MapEntry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {
                                const dataPerReportedPeptideId_MapEntry_Value = dataPerReportedPeptideId_MapEntry[1];
                                const psmIdsSet = dataPerReportedPeptideId_MapEntry_Value.psmIdsSet;
                                if (psmIdsSet) {
                                    psmCount += psmIdsSet.size;
                                } else {
                                    const msg = (
                                        "No Value in dataPerReportedPeptideId_MapEntry_Value.psmIdsSet: reportedPeptideId: "
                                        + dataPerReportedPeptideId_MapEntry_Value.reportedPeptideId
                                        + ", projectSearchId: " + projectSearchId
                                    );
                                    console.warn(msg);
                                    throw new Error(msg);
                                }
                            }
                        }
                    }

                    const psmCountDisplay = psmCount.toLocaleString();

                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay: psmCountDisplay,
                        valueSort: psmCount,
                        // tooltipText :
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);
                }
            }

            //////////

            // Data for Child Tables for this row of this table

            let dataRow_GetChildTableData_Return_DataTable_RootTableObject: DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject = undefined;

            let dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject: DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject = undefined;

            if (projectSearchIds.length > 1) {

                const createReportedPeptideDisplayData_Result_Entry_ForThisRow: CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry = (
                    create_GeneratedReportedPeptideListData_Result.entries_Key_peptideSequenceDisplay.get(peptideEntry.peptideSequenceDisplay)
                );
                if (!createReportedPeptideDisplayData_Result_Entry_ForThisRow) {
                    throw Error("proteinPage_Display_MultipleSearches__SingleProteinReportedPeptideListSection_CreateListData.ts: No value for peptideEntry.peptideSequenceDisplay: " + peptideEntry.peptideSequenceDisplay);
                }

                const params_createChildTableObjects = (
                    new ProteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects_Parameter({

                        createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow: createReportedPeptideDisplayData_Result_Entry_ForThisRow,

                        projectSearchIds,
                        dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId: peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId,
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                        searchDataLookupParamsRoot,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder,
                        dataPageStateManager
                    })
                );

                dataRow_GetChildTableData_Return_DataTable_RootTableObject = (params_callback: DataTable_DataRowEntry__GetChildTableData_CallbackParams): DataTable_RootTableObject => {

                    const dataTable_RootTableObject: DataTable_RootTableObject = proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects({params: params_createChildTableObjects});

                    return dataTable_RootTableObject;
                }

            } else {

                //  Special Value for when only 1 search

                if (!(projectSearchIds.length > 0)) {
                    const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein: ( ! ( projectSearchIds.length > 0 ) )";
                    console.warn(msg);
                    throw Error(msg);
                }

                const projectSearchId = projectSearchIds[0];

                const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId)
                if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {
                    const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein: peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId ); returned no value. projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId(projectSearchId);
                if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId) {
                    const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId ); returned no value. projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
                if (!loadedDataPerProjectSearchIdHolder) {
                    const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein: loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ); returned no value. projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const reportedPeptidesForSingleSearch_createChildTableObjects_Parameter = (
                    new ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter({
                        searchSubGroup_Ids_Selected,
                        projectSearchId,
                        reportedPeptideIds_ForDisplay: undefined,
                        dataPerReportedPeptideId_Map_Key_reportedPeptideId,
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                        searchDataLookupParamsRoot: searchDataLookupParamsRoot,
                        loadedDataPerProjectSearchIdHolder,
                        loadedDataCommonHolder: loadedDataCommonHolder,
                        dataPageStateManager: dataPageStateManager
                    })
                );

                dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject =
                    (params: DataTable_DataRowEntry__GetChildTableData_CallbackParams): DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue => {
                        const result: DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue =
                            reportedPeptidesForSingleSearch_createChildTableObjects({reportedPeptidesForSingleSearch_createChildTableObjects_Parameter});

                        return result;
                    }
            }

            //////////

            //  Create 1 of the next 2 entries based on the values set

            let dataTable_DataRowEntry: DataTable_DataRowEntry = undefined;

            if (dataRow_GetChildTableData_Return_DataTable_RootTableObject) {

                dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId: peptideEntry.peptideSequenceDisplay,
                    sortOrder_OnEquals: peptideListCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                    columnEntries: dataTable_DataRow_ColumnEntries,

                    dataRow_GetChildTableData_Return_DataTable_RootTableObject,
                });

            } else if (dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject) {

                dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId: peptideEntry.peptideSequenceDisplay,
                    sortOrder_OnEquals: peptideListCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                    columnEntries: dataTable_DataRow_ColumnEntries,

                    dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject,
                });
            }

            if ( ! dataTable_DataRowEntry ) {
                const msg = "dataTable_DataRowEntry is not set, for dataTable_DataRowEntries.push( dataTable_DataRowEntry );";
                console.warn(msg)
                throw Error(msg)
            }

            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        dataTable_DataRowEntries
    });

    const tableOptions = new DataTable_TableOptions({});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    getDataTableDataObjects_Result.dataTable_RootTableObject = dataTable_RootTableObject;

    return getDataTableDataObjects_Result;
}
