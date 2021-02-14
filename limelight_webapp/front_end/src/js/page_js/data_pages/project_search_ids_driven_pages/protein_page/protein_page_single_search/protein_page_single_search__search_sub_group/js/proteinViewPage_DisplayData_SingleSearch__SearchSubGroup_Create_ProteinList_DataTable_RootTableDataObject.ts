/**
 * proteinViewPage_DisplayData_SingleSearch__SearchSubGroup_Create_ProteinList_DataTable_RootTableDataObject.ts
 * 
 * Create DataTable_RootTableDataObject for Protein List for Single Search with Search Sub Groups
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import {
    DataTable_RootTableDataObject,
    DataTable_DataRowEntry,
    DataTable_DataGroupRowEntry,
    DataTable_Column,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { ProteinGroup } from 'page_js/data_pages/protein_inference/ProteinGroup';
import { ProteinGrouping_CentralStateManagerObjectClass } from '../../../protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';
import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {
    SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent,
    SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group/jsx/proteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinDescription_DataTable_Component";
import {
    SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent,
    SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_Props_Data
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group/jsx/proteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinName_DataTable_Component";
import {ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group/js/proteinViewPage_DisplayData_SingleSearch_SearchSubGroup_CreateProteinDisplayData";
import {ProteinInferenceUtils} from "page_js/data_pages/protein_inference/ProteinInferenceUtils";
import {
    get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/jsx/proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_And_Tooltip_DataTable_Component";



class GroupedProtein_Entry {
    proteinList_Grouped : Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup>
    proteinGroup : ProteinGroup
}

//  Also export functions getProteinDataTableColumns..., createProteinList_ForDataTable... below


export class ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Parameter {
    proteinSequenceVersionId : number
    dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params;
}

export type ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Function =
    ( params : ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Parameter ) => void;


/**
 * Create tableObject object  for DataTable
 */
export const renderToPageProteinList_SingleSearch__SearchSubGroup__Create_DataTable_RootTableDataObject = function({
    proteinList, proteinGrouping_CentralStateManagerObjectClass, searchSubGroupIds, projectSearchId, dataPageStateManager_DataFrom_Server, proteinRow_tableRowClickHandler_Callback_Function
} : {
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup>
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    searchSubGroupIds : Array<number>
    projectSearchId : number
    dataPageStateManager_DataFrom_Server : DataPageStateManager
    proteinRow_tableRowClickHandler_Callback_Function : ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Function

}) : DataTable_RootTableDataObject {

    // the columns for the data being shown on the page
    const columns : Array<DataTable_Column> = getProteinDataTableColumns_SingleSearch__SearchSubGroup( { searchSubGroupIds, projectSearchId, dataPageStateManager_DataFrom_Server } );

    let dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = undefined;
    let dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = undefined;

    if ( ! proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

        dataTable_DataGroupRowEntries = _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups({
            proteinGrouping_CentralStateManagerObjectClass, proteinList, columns, searchSubGroupIds, proteinRow_tableRowClickHandler_Callback_Function
        });

    } else {

        const greyOutRow = false;  //  Not pass for not grouped

        dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({ greyOutRow, proteinList, columns, searchSubGroupIds, proteinRow_tableRowClickHandler_Callback_Function });
    }

    const tableObject = new DataTable_RootTableDataObject({
        columns,
        dataTable_DataRowEntries,
        dataTable_DataGroupRowEntries
    });

    return tableObject;
}


/**
 * Create Table Columns
 *
 * Called from internal to this file and also called from proteinViewPage_DisplayData_SingleSearch_XXXX.ts for downloads
 */
export const getProteinDataTableColumns_SingleSearch__SearchSubGroup = function( { searchSubGroupIds, projectSearchId, dataPageStateManager_DataFrom_Server } : {

    searchSubGroupIds : Array<number>
    projectSearchId : number
    dataPageStateManager_DataFrom_Server : DataPageStateManager  //  Currently unused

} ) : Array<DataTable_Column> {

    const searchSubGroups_Root = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root();
    if ( ! searchSubGroups_Root ) {
        throw Error("getProteinDataTableColumns_SingleSearch__SearchSubGroup: dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root(); return nothing for projectSearchId: " + projectSearchId );
    }
    const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
    if ( ! searchSubGroups_ForProjectSearchId ) {
        throw Error("getProteinDataTableColumns_SingleSearch__SearchSubGroup: searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ); return nothing for projectSearchId: " + projectSearchId );
    }

    let columns : Array<DataTable_Column> = [ ];

    {
        const column = new DataTable_Column({
            id :           'proteins',
            displayName :  'Protein(s)',
            width :        300,
            sortable : true,
            //  copied style_override_DataRowCell_React to the component
            // style_override_DataRowCell_React : { whiteSpace : "nowrap", overflowX:"auto", fontSize: 12 }, // prevent line breaks and scroll if too long
            style_override_HeaderRowCell_React : { fontSize: 12 }, //  React format Style Overrides for Header Row Cells
            cellMgmt_ExternalReactComponent : { reactComponent : SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent }
            // css_class : ' clickable '
        });

        columns.push( column );
    }

    {
        const column = new DataTable_Column({
            id :           'protein_descriptions',
            displayName :  'Protein Description(s)',
            width :        325,
            sortable : true,
            //  copied style_override_DataRowCell_React to the component
            // style_override_DataRowCell_React : { whiteSpace : "nowrap", overflow:"hidden", textOverflow: "ellipsis", fontSize: 12 }, // prevent line breaks and scroll if too long
            style_override_HeaderRowCell_React : { fontSize: 12 }, //  React format Style Overrides for Header Row Cells
            cellMgmt_ExternalReactComponent : { reactComponent : SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent }
            // css_class : ' clickable '
        });

        columns.push( column );
    }

    {
		for ( const searchSubGroupId of searchSubGroupIds ) {

            const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroupId );
            if ( ! searchSubGroup ) {
                throw Error("getProteinDataTableColumns_SingleSearch__SearchSubGroup: searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroupId ); return nothing for searchSubGroupId: " + searchSubGroupId
                + ", projectSearchId: " + projectSearchId );
            }

            const displayName = get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_DataTable_Component({ searchSubGroup });

            const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => {

                return get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component({ searchSubGroup });
            }

            const column = new DataTable_Column({
                id :           'psms_' + searchSubGroupId,
                displayName,
                columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,
                width :        80,
                sortable : true,
                style_override_DataRowCell_React : { fontSize: 12 }, // React format Style overrides
                style_override_HeaderRowCell_React : { fontSize: 12 }, //  React format Style Overrides for Header Row Cells
                // css_class : ' clickable '
            });

            columns.push( column );
        }
    }

    return columns;
}


////////////////

/**
 * Create dataGroupObjects object  for DataTable
 *
 * For YES Grouping of Proteins
 */
const _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups = function(
    {
        proteinGrouping_CentralStateManagerObjectClass, proteinList, columns, searchSubGroupIds, proteinRow_tableRowClickHandler_Callback_Function
    } : {
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup>
    columns : Array<DataTable_Column>
    searchSubGroupIds : Array<number>
    proteinRow_tableRowClickHandler_Callback_Function : ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Function

}) : Array<DataTable_DataGroupRowEntry> {

    const dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = [];

    const groupedProteins : Array<GroupedProtein_Entry> = _renderToPageProteinList_Create_dataGroupObjects_Group_proteinList_Entries({

        proteinGrouping_CentralStateManagerObjectClass, proteinList, searchSubGroupIds
    });

    let proteinList_Grouped_MaxLength = 0;

    //  Populate dataGroupObjects
    for ( const groupedProteinItem of groupedProteins ) {

        if ( proteinList_Grouped_MaxLength < groupedProteinItem.proteinList_Grouped.length ) {
            proteinList_Grouped_MaxLength = groupedProteinItem.proteinList_Grouped.length;
        }

        const greyOutRow = ! groupedProteinItem.proteinGroup.passesFilter;

        const dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({
            greyOutRow, proteinList : groupedProteinItem.proteinList_Grouped, columns, searchSubGroupIds, proteinRow_tableRowClickHandler_Callback_Function
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

    proteinGrouping_CentralStateManagerObjectClass, proteinList, searchSubGroupIds
} : {

    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup>
    searchSubGroupIds  : Array<number>
}) : Array<GroupedProtein_Entry> {

    const proteinGroups_All : Array<ProteinGroup> = _group_proteinList_Entries_Get_PerProteinIdMap({ proteinGrouping_CentralStateManagerObjectClass, proteinList });

    //  Copy ProteinGroup to map Key proteinSequenceVersionId for faster lookup
    const proteinGroups_All_Map_Key_ProteinId : Map<number,ProteinGroup> = new Map();
    for ( const proteinGroups_AllEntry of proteinGroups_All ) {
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
            const msg = "WARN: At least 1 entry in  entry in proteinList not found in proteinGroups_All_Map_Key_ProteinId.  Not Found Count: "
            + notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count + ", searchSubGroupIds: " + searchSubGroupIds.join(",");
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

/**
 * Group the entries in proteinList using ProteinInferenceUtils.getProteinGroups(...)
 *
 */
const _group_proteinList_Entries_Get_PerProteinIdMap = function({ proteinGrouping_CentralStateManagerObjectClass, proteinList } : {

    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup>
}) : Array<ProteinGroup> {

    const proteinPeptideMap : Map<number, Set<number>> = new Map();

    for ( const proteinListItem of proteinList ) {
        const reportedPeptideIds_Set = new Set( proteinListItem.proteinItem.reportedPeptideIds );
        proteinPeptideMap.set(  proteinListItem.proteinSequenceVersionId, reportedPeptideIds_Set );
    }

    let proteinGroup : Array<ProteinGroup> = undefined;

    if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_All_Groups() ) {

        proteinGroup = ProteinInferenceUtils.getProteinGroups({ proteinPeptideMap });

    } else if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups() ) {

        proteinGroup = ProteinInferenceUtils.getNonSubsetProteinGroupsFromProteinPeptideMap({ proteinPeptideMap });

    } else if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_Parsimonious_Groups() ) {

        proteinGroup = ProteinInferenceUtils.getParsimoniousProteinGroupsFromProteinPeptideMap({ proteinPeptideMap });

    } else {

        const msg = "proteinViewPage_DisplayData_SingleSearch_Create_ProteinList_DataTable_RootTableDataObject.ts:_group_proteinList_Entries_Get_PerProteinIdMap: groupProteinsSelection not === expected values.  proteinGrouping_CentralStateManagerObjectClass (Only in Console Log): ";
        console.warn( msg, proteinGrouping_CentralStateManagerObjectClass );
        throw Error( msg );
    }

    return proteinGroup;
}


//////////////////////


/**
 * Create dataObjects object  for DataTable
 *
 * For NO Grouping of Proteins
 */
const _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups = function({ greyOutRow, proteinList, columns, searchSubGroupIds, proteinRow_tableRowClickHandler_Callback_Function } : {

    greyOutRow : boolean  //  Set greyOutRow on all rows
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup>
    columns : Array<DataTable_Column>
    searchSubGroupIds : Array<number>
    proteinRow_tableRowClickHandler_Callback_Function : ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Function

}) : Array<DataTable_DataRowEntry> {

    const dataTable_DataRowEntries = createProteinList_ForDataTable( { greyOutRow, proteinList, searchSubGroupIds, proteinRow_tableRowClickHandler_Callback_Function } );

    return dataTable_DataRowEntries;
}

/**
 *  Called from internal to this file and also called from proteinViewPage_DisplayData_SingleSearch.ts for downloads
 */
export const createProteinList_ForDataTable = function({ greyOutRow, proteinList, searchSubGroupIds, proteinRow_tableRowClickHandler_Callback_Function } : {

    greyOutRow : boolean
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup>
    searchSubGroupIds : Array<number>
    proteinRow_tableRowClickHandler_Callback_Function : ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Function

}) : Array<DataTable_DataRowEntry> {

    const proteinList_ForDataTable : Array<DataTable_DataRowEntry> = [];

    let index = 0;
    for ( const proteinListItem of proteinList ) {

        proteinList_ForDataTable.push( _createProteinItem_DataTableEntry( { greyOutRow, proteinListItem, arrayIndex : index, searchSubGroupIds, proteinRow_tableRowClickHandler_Callback_Function } ) );
        index++;
    }
    return proteinList_ForDataTable;
}

////////////////

/**
 * Create object
 */
const _createProteinItem_DataTableEntry = function({ greyOutRow, proteinListItem, arrayIndex, searchSubGroupIds, proteinRow_tableRowClickHandler_Callback_Function } : {

    greyOutRow : boolean
    proteinListItem : ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup
    arrayIndex : number
    searchSubGroupIds : Array<number>
    proteinRow_tableRowClickHandler_Callback_Function : ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Function
}) : DataTable_DataRowEntry {


    //  Column entries for this data row in data table
    const columnEntries : DataTable_DataRow_ColumnEntry[] = [];

    {  // proteinNames
        if ( ! proteinListItem.proteinNames ) {
            throw Error( "_createProteinItem_DataTableEntry(...): proteinListItem.proteinNames not populated: " + proteinListItem.proteinNames )
        }

        const singleSearch_ProteinList_ProteinName_ExternalReactComponent_Props_Data = new SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_Props_Data({

            proteinName : proteinListItem.proteinNames,
            proteinSequenceVersionId : proteinListItem.proteinSequenceVersionId
        });

        const columnEntry = new DataTable_DataRow_ColumnEntry({
            valueSort : proteinListItem.proteinNames,
            cellMgmt_ExternalReactComponent_Data : singleSearch_ProteinList_ProteinName_ExternalReactComponent_Props_Data
        })
        columnEntries.push( columnEntry );
    }
    {  // proteinDescription
        let proteinDescription = proteinListItem.proteinDescriptions;
        if ( ! proteinDescription ) {
            proteinDescription = "";  // Was undefined, null, or empty string so make it empty string
        }

        const singleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data = new SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data ({

            proteinDescription : proteinDescription,
            proteinSequenceVersionId : proteinListItem.proteinSequenceVersionId
        });

        const columnEntry = new DataTable_DataRow_ColumnEntry({
            valueSort : proteinDescription,
            cellMgmt_ExternalReactComponent_Data : singleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data
        })
        columnEntries.push( columnEntry );
    }

    {  // numPsms per search sub group

		for ( const searchSubGroupId of searchSubGroupIds ) {

            let numPsms = 0;  // default to zero if no entry

            const numPsms_FromMap = proteinListItem.proteinItem.numPsms_Map_Key_SearchSubGroupId.get( searchSubGroupId )
            if ( numPsms_FromMap ) {
                numPsms = numPsms_FromMap;
            }

            const columnEntry = new DataTable_DataRow_ColumnEntry({
                valueDisplay : numPsms.toLocaleString(),
                valueSort : numPsms
            })
            columnEntries.push( columnEntry );
        }
    }

    const tableRowClickHandler_Callback_NoDataPassThrough : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough =
        ( params_tableRowClickHandler_Callback : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params ) : void => {

            const proteinRow_tableRowClickHandler_Callback_Parameter = new ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinRow_tableRowClickHandler_Callback_Parameter();
            proteinRow_tableRowClickHandler_Callback_Parameter.proteinSequenceVersionId = proteinListItem.proteinSequenceVersionId;
            proteinRow_tableRowClickHandler_Callback_Parameter.dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params = params_tableRowClickHandler_Callback;

            proteinRow_tableRowClickHandler_Callback_Function( proteinRow_tableRowClickHandler_Callback_Parameter );
        }

    const dataTable_DataRowEntry = new DataTable_DataRowEntry({
        uniqueId : proteinListItem.proteinSequenceVersionId,
        sortOrder_OnEquals : arrayIndex, // Original Sort Order
        greyOutRow : greyOutRow,
        columnEntries,
        tableRowClickHandler_Callback_NoDataPassThrough
    })

    return dataTable_DataRowEntry;
}

