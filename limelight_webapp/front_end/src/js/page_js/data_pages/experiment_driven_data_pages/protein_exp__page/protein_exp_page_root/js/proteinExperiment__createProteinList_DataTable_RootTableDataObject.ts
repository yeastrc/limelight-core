/**
 * proteinExperiment__createProteinList_DataTable_RootTableDataObject.ts
 *
 *
 *
 */

import {
    DataTable_Column,
    DataTable_DataGroupRowEntry,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params,
    DataTable_RootTableDataObject
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {
    ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry,
    ProteinExperimentPage_Display_tableRowData,
    ProteinExperimentPage_Display_tableRowData_AllRows,
    ProteinExperimentPage_singleProteinRow_ClickHandler,
    ProteinExperimentPage_singleProteinRow_ClickHandler_Params
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_Display";
import {ProteinExperiment__CreateProteinDataTableColumns_Class} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperiment__createProteinList_DataTable_ColumnObject";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {ProteinExperiment_CreateProteinDisplayData_Result_ProteinListEntry} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperiment___createProteinDisplayData";
import {ProteinGroup} from "page_js/data_pages/protein_inference/ProteinGroup";
import {
    ProteinDataDisplay_ProteinListItem_MultipleSearch
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/proteinViewPage_DisplayData_MultipleSearches";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";



class GroupedProtein_Entry {
    proteinList_Grouped : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
    proteinGroup : ProteinGroup
}


/**
 * Create Data Object Array for Protein List Data Table
 */
export const proteinExperiment__createProteinList_DataTable_RootTableDataObject = function(
    {
        singleProteinRowClickHandler_Callback,
        proteinList, conditions_for_condition_group_with_their_project_search_ids, proteinGroups_ArrayOf_ProteinGroup, proteinGrouping_CentralStateManagerObjectClass, proteinExperiment__CreateProteinDataTableColumns_Class
    } : {
        singleProteinRowClickHandler_Callback : ProteinExperimentPage_singleProteinRow_ClickHandler

        proteinList :  ProteinExperiment_CreateProteinDisplayData_Result_ProteinListEntry[]
        conditions_for_condition_group_with_their_project_search_ids  : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinGroups_ArrayOf_ProteinGroup : Array<ProteinGroup> //  Populated when grouping
        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass

        proteinExperiment__CreateProteinDataTableColumns_Class : ProteinExperiment__CreateProteinDataTableColumns_Class

    } ) : {

    dataTable_RootTableDataObject : DataTable_RootTableDataObject
    tableRowData_AllRows : ProteinExperimentPage_Display_tableRowData_AllRows
} {
    const tableRowData_AllRows = new ProteinExperimentPage_Display_tableRowData_AllRows();

    // the columns for the data being shown on the page
    const columns :  DataTable_Column[] = proteinExperiment__CreateProteinDataTableColumns_Class.proteinExperiment__getProteinDataTableColumns( { conditions_for_condition_group_with_their_project_search_ids } ); // External Function Call

    let dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = undefined;
    let dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = undefined;

    if ( ! proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

        dataTable_DataGroupRowEntries = _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups({
            singleProteinRowClickHandler_Callback,
            proteinGrouping_CentralStateManagerObjectClass, proteinList, proteinGroups_ArrayOf_ProteinGroup, conditions_for_condition_group_with_their_project_search_ids, tableRowData_AllRows
        });

    } else {

        const greyOutRow: boolean = undefined;  //  Not pass for not grouped

        dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({
            singleProteinRowClickHandler_Callback, greyOutRow, proteinList, conditions_for_condition_group_with_their_project_search_ids, tableRowData_AllRows
        });
    }

    const tableDataObject: DataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns,
        dataTable_DataRowEntries,
        dataTable_DataGroupRowEntries
    });

    return { dataTable_RootTableDataObject : tableDataObject, tableRowData_AllRows };
}

////////////////

/**
 * Create dataGroupObjects object  for DataTable
 *
 * For YES Grouping of Proteins
 */
const _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups = function(
    {
        singleProteinRowClickHandler_Callback,
        proteinGrouping_CentralStateManagerObjectClass, proteinList, proteinGroups_ArrayOf_ProteinGroup, conditions_for_condition_group_with_their_project_search_ids, tableRowData_AllRows
    } : {
        singleProteinRowClickHandler_Callback : ProteinExperimentPage_singleProteinRow_ClickHandler

        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
        proteinGroups_ArrayOf_ProteinGroup : Array<ProteinGroup>
        conditions_for_condition_group_with_their_project_search_ids  : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>

        tableRowData_AllRows : ProteinExperimentPage_Display_tableRowData_AllRows // Updated in this file/function (or called function)

    }) : Array<DataTable_DataGroupRowEntry> {

    const proteinList_Local = proteinList;

    const dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = [];

    const groupedProteins : Array<GroupedProtein_Entry> = _renderToPageProteinList_Create_dataGroupObjects_Group_proteinList_Entries({

        proteinGrouping_CentralStateManagerObjectClass, proteinList: proteinList_Local, proteinGroups_ArrayOf_ProteinGroup, conditions_for_condition_group_with_their_project_search_ids
    });

    let proteinList_Grouped_MaxLength = 0;

    //  Populate dataGroupObjects
    for ( const groupedProteinItem of groupedProteins ) {

        if ( proteinList_Grouped_MaxLength < groupedProteinItem.proteinList_Grouped.length ) {
            proteinList_Grouped_MaxLength = groupedProteinItem.proteinList_Grouped.length;
        }

        const greyOutRow = ! groupedProteinItem.proteinGroup.passesFilter;

        const dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({
            singleProteinRowClickHandler_Callback, greyOutRow, proteinList : groupedProteinItem.proteinList_Grouped, conditions_for_condition_group_with_their_project_search_ids, tableRowData_AllRows
        });

        const first_dataTable_DataRowEntry = dataTable_DataRowEntries[ 0 ];

        const dataTable_DataGroupRowEntry = new DataTable_DataGroupRowEntry({
            dataTable_DataRowEntries,
            columnEntries : first_dataTable_DataRowEntry.columnEntries,
            sortOrder_OnEquals : first_dataTable_DataRowEntry.sortOrder_OnEquals,
            uniqueId : first_dataTable_DataRowEntry.uniqueId
        });

        dataTable_DataGroupRowEntries.push( dataTable_DataGroupRowEntry );
    }

    console.log("proteinList_Grouped_MaxLength: " + proteinList_Grouped_MaxLength );

    return dataTable_DataGroupRowEntries;
}


/**
 * Group the entries in proteinList
 *
 */
const _renderToPageProteinList_Create_dataGroupObjects_Group_proteinList_Entries = function({

    proteinList, proteinGroups_ArrayOf_ProteinGroup, conditions_for_condition_group_with_their_project_search_ids
} : {

    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
    proteinGroups_ArrayOf_ProteinGroup : Array<ProteinGroup>
    conditions_for_condition_group_with_their_project_search_ids  : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
}) : Array<GroupedProtein_Entry> {


    //  Copy ProteinGroup to map Key proteinSequenceVersionId for faster lookup
    const proteinGroups_All_Map_Key_ProteinId : Map<number,ProteinGroup> = new Map();
    for ( const proteinGroups_AllEntry of proteinGroups_ArrayOf_ProteinGroup ) {
        for ( const proteinId of proteinGroups_AllEntry.proteins ) {
            proteinGroups_All_Map_Key_ProteinId.set( proteinId , proteinGroups_AllEntry );
        }
    }

    let notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count = 0;

    const groupedProteins_map_Key_ProteinGroup : Map<ProteinGroup, { groupedProtein_Entry : GroupedProtein_Entry, proteinList_Index : number }> = new Map();

    let proteinList_Index = -1;

    for ( const proteinListItem of proteinList ) {

        proteinList_Index++;

        //  Get ProteinGroup for proteinListItem

        const proteinGroup_For_proteinListItem = proteinGroups_All_Map_Key_ProteinId.get( proteinListItem.proteinSequenceVersionId );

        if ( ! proteinGroup_For_proteinListItem ) {
            //  protein not found in any groups
            notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count++;
            continue; // EARLY CONTINUE
        }

        //  Look for existing entry in groupedProteins to add proteinListItem to

        const groupedProteins_map_Key_ProteinGroup_Entry = groupedProteins_map_Key_ProteinGroup.get( proteinGroup_For_proteinListItem );

        if ( groupedProteins_map_Key_ProteinGroup_Entry ) {

            //  Add to existing entry in groupedProteins

            groupedProteins_map_Key_ProteinGroup_Entry.groupedProtein_Entry.proteinList_Grouped.push( proteinListItem );

        } else {

            //  Add new entry to groupedProteins_map_Key_ProteinGroup

            const groupedProtein_NewEntry : GroupedProtein_Entry = {
                proteinList_Grouped : [ proteinListItem ],
                proteinGroup : proteinGroup_For_proteinListItem
            };

            groupedProteins_map_Key_ProteinGroup.set( proteinGroup_For_proteinListItem, { groupedProtein_Entry : groupedProtein_NewEntry, proteinList_Index } );
        }
    }

    if ( notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count > 0 ) {
        try {
            const projectSearchIds_All = new Array<number>();
            for ( const entry of conditions_for_condition_group_with_their_project_search_ids ) {
                for ( const projectSearchId of entry.projectSearchIds ) {
                    projectSearchIds_All.push( projectSearchId );
                }
            }
            const msg = "WARN: At least 1 entry in  entry in proteinList not found in proteinGroups_All_Map_Key_ProteinId.  Not Found Count: "
                + notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count + ", projectSearchIds: " + projectSearchIds_All.join(",");
            console.warn( msg );
            throw Error( msg )
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            // Do Not rethrow so not break page
        }
    }
    //  Convert Map to Array and sort

    const groupedProteins_map_Key_ProteinGroup_AsArray : Array<{ groupedProtein_Entry : GroupedProtein_Entry, proteinList_Index : number }> = [];

    for ( const entry of groupedProteins_map_Key_ProteinGroup.entries() ) {
        groupedProteins_map_Key_ProteinGroup_AsArray.push( entry[ 1 ] );
    }

    groupedProteins_map_Key_ProteinGroup_AsArray.sort( (a,b) => {
        if ( a.proteinList_Index < b.proteinList_Index ) {
            return -1;
        }
        if ( a.proteinList_Index > b.proteinList_Index ) {
            return 1;
        }
        return 0;
    })

    //  Create result Array

    const groupedProteins : Array<GroupedProtein_Entry> = [];

    for ( const entry of groupedProteins_map_Key_ProteinGroup_AsArray ) {
        groupedProteins.push( entry.groupedProtein_Entry );
    }

    return groupedProteins;
}

//////////////////////

/**
 *
 */
const _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups = function(
    {
        singleProteinRowClickHandler_Callback, greyOutRow, proteinList, conditions_for_condition_group_with_their_project_search_ids, tableRowData_AllRows
    } : {

        singleProteinRowClickHandler_Callback : ProteinExperimentPage_singleProteinRow_ClickHandler

        greyOutRow : boolean  //  Set greyOutRow on all rows
        proteinList: ProteinExperiment_CreateProteinDisplayData_Result_ProteinListEntry[]
        conditions_for_condition_group_with_their_project_search_ids: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>

        tableRowData_AllRows : ProteinExperimentPage_Display_tableRowData_AllRows // Updated in this file/function (or called function)

    }) : Array<DataTable_DataRowEntry> {

    const proteinList_ForDataTable : Array<DataTable_DataRowEntry> = [];

    let proteinListItem_Index = 0;

    for ( const proteinListItem of proteinList ) {

        proteinList_ForDataTable.push( _createProteinItem_DataTableEntry( {
            singleProteinRowClickHandler_Callback,
            greyOutRow, proteinListItem, proteinListItem_Index, conditions_for_condition_group_with_their_project_search_ids, tableRowData_AllRows
        } ) );

        proteinListItem_Index++;
    }

    return proteinList_ForDataTable;
}

/**
 * Create Data Object for Single Entry in Protein List Data Table
 */
const _createProteinItem_DataTableEntry = function( { singleProteinRowClickHandler_Callback, greyOutRow, proteinListItem, proteinListItem_Index, conditions_for_condition_group_with_their_project_search_ids, tableRowData_AllRows } : {

    singleProteinRowClickHandler_Callback : ProteinExperimentPage_singleProteinRow_ClickHandler

    greyOutRow : boolean
    proteinListItem: ProteinExperiment_CreateProteinDisplayData_Result_ProteinListEntry
    proteinListItem_Index: number
    conditions_for_condition_group_with_their_project_search_ids  : Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>

    tableRowData_AllRows : ProteinExperimentPage_Display_tableRowData_AllRows // Updated in this file/function (or called function)

} ) : DataTable_DataRowEntry {

    //  Elements for each row must be in the same order as in header

    const proteinItemRecordsMap_Key_projectSearchId = proteinListItem.proteinItemRecordsMap_Key_projectSearchId;

    const proteinSequenceVersionId = proteinListItem.proteinSequenceVersionId;
    const proteinName = proteinListItem.proteinNames;
    const proteinDescription = proteinListItem.proteinDescriptions;


    const proteinExperimentPage_Display_tableRowData = new ProteinExperimentPage_Display_tableRowData({
        proteinSequenceVersionId, proteinName, proteinDescription
    });
    tableRowData_AllRows.set_ProteinRowData_For_ProteinSequenceVersionId({ proteinSequenceVersionId, data : proteinExperimentPage_Display_tableRowData });

    const columnEntries : Array<DataTable_DataRow_ColumnEntry> = [];
    {
        const entry = new DataTable_DataRow_ColumnEntry({
            valueSort : proteinName, //  for sorting
            valueDisplay : proteinName,
            tooltipText : proteinName   //  For html 'title' property for tooltip display.  Not HTML. Can have \n
        });
        columnEntries.push( entry );
    }
    {
        const entry = new DataTable_DataRow_ColumnEntry({
            valueSort: proteinDescription, //  for sorting
            valueDisplay: proteinDescription,
            tooltipText: proteinDescription   //  For html 'title' property for tooltip display  Not HTML. Can have \n
        });
        columnEntries.push( entry );
    }

    const psmCountsPerCondition = [];


    for ( const  condition_for_condition_group_with_its_project_search_ids of conditions_for_condition_group_with_their_project_search_ids ) {

        //  Get PSM counts per condition

        const condition = condition_for_condition_group_with_its_project_search_ids.condition;
        const projectSearchIds = condition_for_condition_group_with_its_project_search_ids.projectSearchIds;

        let numPsms = 0;

        for ( const projectSearchId of projectSearchIds ) {

            //  Values per search

            const proteinItemRecord = proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );

            if ( proteinItemRecord ) {
                // record for this project search id
                numPsms += proteinItemRecord.numPsms;
            }
        }

        const valueDisplay = numPsms.toLocaleString();

        const columnEntry = new DataTable_DataRow_ColumnEntry({
            valueSort : numPsms, //  for sorting
            valueDisplay,
            tooltipText : undefined
        });

        columnEntries.push( columnEntry );

        const psmCountsPerConditionEntry = {
            condition,
            projectSearchIds,
            numPsms
        }
        psmCountsPerCondition.push( psmCountsPerConditionEntry );
    }

    //  Show chart with psm counts for conditions in first condition group
    if ( conditions_for_condition_group_with_their_project_search_ids.length > 0 ) {
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            cellMgmt_External_Data : {
                proteinName_ForDiv : proteinName,
                psmCountsPerCondition
            }
        });

        columnEntries.push( columnEntry );
    }

    //  Create callback function

    const tableRowClickHandler_Callback_NoDataPassThrough : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough = ( params :  DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params ) : void => {
        const singleProteinRowClickHandler_Params : ProteinExperimentPage_singleProteinRow_ClickHandler_Params = {
            dataTable_RowClickCallback_Params : params,
            tableRowData : proteinExperimentPage_Display_tableRowData
        }
        singleProteinRowClickHandler_Callback( singleProteinRowClickHandler_Params );
    }

    //  Create DataTable_DataRowEntry
    const rowEntry = new DataTable_DataRowEntry({
        uniqueId : proteinListItem.proteinSequenceVersionId, // Set for Data Table to identify the entry in the table
        sortOrder_OnEquals : proteinListItem_Index,        // For User Sort, order to sort items that are equals for User selected column(s)
        greyOutRow,
        columnEntries,
        tableRowClickHandler_Callback_NoDataPassThrough
    });

    return rowEntry;
}

