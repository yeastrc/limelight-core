/**
 * proteinViewPage_DisplayData_MultipleSearches_Create_ProteinList_DataTable_RootTableDataObject.ts
 * 
 * Create DataTable_RootTableDataObject for Protein List for Multiple Searches
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
import { MultipleSearches_ProteinList_ProteinName_ExternalReactComponent, MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props_Data } from './proteinViewPage_DisplayData_MultipleSearches_ProteinName_DataTable_Component';
import { MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent, MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data } from './proteinViewPage_DisplayData_MultipleSearches_ProteinDescription_DataTable_Component';
import { ProteinGrouping_CentralStateManagerObjectClass } from '../protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';
import {
    ProteinDataDisplay_ProteinListItem_MultipleSearch,
    ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler,
    ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler_Params
} from './proteinViewPage_DisplayData_MultipleSearches';
import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';



class GroupedProtein_Entry {
    proteinList_Grouped : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
    proteinGroup : ProteinGroup
}

//  Also export functions getProteinDataTableColumns, createProteinList_ForDataTable below


export class ProteinRow_tableRowClickHandlerParameter_MultipleSearches {
    proteinSequenceVersionId : number

    constructor({ proteinSequenceVersionId } : { proteinSequenceVersionId : number }) {
        this.proteinSequenceVersionId = proteinSequenceVersionId;
    }
}
    
/**
 * Create tableObject object  for DataTable
 */
export const renderToPageProteinList_MultipleSearches_Create_DataTable_RootTableDataObject = function(
    {
        singleProteinRowClickHandler_Callback,
        proteinList, proteinGroups_ArrayOf_ProteinGroup, proteinGrouping_CentralStateManagerObjectClass, projectSearchIds, dataPageStateManager_DataFrom_Server
    } : {
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler
        proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
        proteinGroups_ArrayOf_ProteinGroup : Array<ProteinGroup> //  Populated when grouping
        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        projectSearchIds : Array<number>
        dataPageStateManager_DataFrom_Server : DataPageStateManager

    }) : DataTable_RootTableDataObject {

    // the columns for the data being shown on the page
    const columns : Array<DataTable_Column> = getProteinDataTableColumns( { projectSearchIds, dataPageStateManager_DataFrom_Server } );

    let dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = undefined;
    let dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = undefined;

    if ( ! proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

        dataTable_DataGroupRowEntries = _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups({
            proteinGrouping_CentralStateManagerObjectClass, proteinList, proteinGroups_ArrayOf_ProteinGroup, projectSearchIds, singleProteinRowClickHandler_Callback
        });

    } else {

        const greyOutRow = false;  //  Not pass for not grouped

        dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({ greyOutRow, proteinList, projectSearchIds, singleProteinRowClickHandler_Callback });
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
 * Called from internal to this file and also called from proteinViewPage_DisplayData_SingleSearch.ts for downloads
 */
export const getProteinDataTableColumns = function( { projectSearchIds, dataPageStateManager_DataFrom_Server } : { 
    
    projectSearchIds : Array<number>
    dataPageStateManager_DataFrom_Server : DataPageStateManager

} ) : Array<DataTable_Column> {

    
    //  For getting search info for projectSearchIds

    //  searchNamesKeyProjectSearchId is an Object where the property names are project search ids as numbers
    const searchNamesMap_KeyProjectSearchId = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();


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
            cellMgmt_ExternalReactComponent : { reactComponent : MultipleSearches_ProteinList_ProteinName_ExternalReactComponent }
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
            cellMgmt_ExternalReactComponent : { reactComponent : MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent }
            // css_class : ' clickable '
        });

        columns.push( column );
    }

    {
		for ( const projectSearchId of projectSearchIds ) {
			
			const searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
			if ( ! searchNameObject ) {
				throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
			}
			
            const column = new DataTable_Column({
                id :           'psms_' + projectSearchId,
                displayName :  'PSMs (' + searchNameObject.searchId + ")" ,
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
        proteinGrouping_CentralStateManagerObjectClass, proteinList, proteinGroups_ArrayOf_ProteinGroup, projectSearchIds, singleProteinRowClickHandler_Callback
    } : {
    
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
    proteinGroups_ArrayOf_ProteinGroup : Array<ProteinGroup>
    projectSearchIds  : Array<number>
    singleProteinRowClickHandler_Callback : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler

}) : Array<DataTable_DataGroupRowEntry> {

    const proteinList_Local = proteinList;

    const dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = [];

    const groupedProteins : Array<GroupedProtein_Entry> = _renderToPageProteinList_Create_dataGroupObjects_Group_proteinList_Entries({ 
        
        proteinGrouping_CentralStateManagerObjectClass, proteinList: proteinList_Local, proteinGroups_ArrayOf_ProteinGroup, projectSearchIds 
    });

    let proteinList_Grouped_MaxLength = 0;

    //  Populate dataGroupObjects
    for ( const groupedProteinItem of groupedProteins ) {

        if ( proteinList_Grouped_MaxLength < groupedProteinItem.proteinList_Grouped.length ) {
            proteinList_Grouped_MaxLength = groupedProteinItem.proteinList_Grouped.length;
        }

        const greyOutRow = ! groupedProteinItem.proteinGroup.passesFilter;

        const dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({ 
            greyOutRow, proteinList : groupedProteinItem.proteinList_Grouped, projectSearchIds, singleProteinRowClickHandler_Callback
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
    
    proteinGrouping_CentralStateManagerObjectClass, proteinList, proteinGroups_ArrayOf_ProteinGroup, projectSearchIds 
} : { 
    
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch> 
    proteinGroups_ArrayOf_ProteinGroup : Array<ProteinGroup>
    projectSearchIds  : Array<number>
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
            const msg = "WARN: At least 1 entry in  entry in proteinList not found in proteinGroups_All_Map_Key_ProteinId.  Not Found Count: " 
            + notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count + ", projectSearchIds: " + projectSearchIds.join(",");
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
 * Create dataObjects object  for DataTable
 * 
 * For NO Grouping of Proteins
 */
const _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups = function({ greyOutRow, proteinList, projectSearchIds, singleProteinRowClickHandler_Callback } : {
    
    greyOutRow : boolean  //  Set greyOutRow on all rows
    proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
    projectSearchIds : Array<number>
    singleProteinRowClickHandler_Callback : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler

}) : Array<DataTable_DataRowEntry> {

    const dataTable_DataRowEntries = createProteinList_ForDataTable( { greyOutRow, proteinList, projectSearchIds, singleProteinRowClickHandler_Callback } );
    
    return dataTable_DataRowEntries;
}

/**
 *  Called from internal to this file and also called from proteinViewPage_DisplayData_SingleSearch.ts for downloads
 */
export const createProteinList_ForDataTable = function({ greyOutRow, proteinList, projectSearchIds, singleProteinRowClickHandler_Callback } : {

    greyOutRow : boolean
    proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
    projectSearchIds : Array<number>
    singleProteinRowClickHandler_Callback : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler

}) : Array<DataTable_DataRowEntry> {

    const proteinList_ForDataTable : Array<DataTable_DataRowEntry> = [];
    
    let index = 0;
    for ( const proteinListItem of proteinList ) {
        
        proteinList_ForDataTable.push( _createProteinItem_DataTableEntry( { greyOutRow, proteinListItem, arrayIndex : index, projectSearchIds, singleProteinRowClickHandler_Callback } ) );
        index++;
    }
    return proteinList_ForDataTable;
}

////////////////

/**
 * Create object 
 */
const _createProteinItem_DataTableEntry = function({ greyOutRow, proteinListItem, arrayIndex, projectSearchIds, singleProteinRowClickHandler_Callback } : {

    greyOutRow : boolean
    proteinListItem : ProteinDataDisplay_ProteinListItem_MultipleSearch
    arrayIndex : number
    projectSearchIds : Array<number>
    singleProteinRowClickHandler_Callback : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler

}) : DataTable_DataRowEntry {


    //  Column entries for this data row in data table
    const columnEntries : DataTable_DataRow_ColumnEntry[] = [];

    {  // proteinNames
        if ( ! proteinListItem.proteinNames ) {
            throw Error( "_createProteinItem_DataTableEntry(...): proteinListItem.proteinNames not populated: " + proteinListItem.proteinNames )
        }

        const singleSearch_ProteinList_ProteinName_ExternalReactComponent_Props_Data = new MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props_Data({

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

        const singleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data = new MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data ({

            proteinDescription : proteinDescription,
            proteinSequenceVersionId : proteinListItem.proteinSequenceVersionId
        });

        const columnEntry = new DataTable_DataRow_ColumnEntry({
            valueSort : proteinDescription,
            cellMgmt_ExternalReactComponent_Data : singleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data
        })
        columnEntries.push( columnEntry );
    }
    
    {  // numPsms per search

		for ( const projectSearchId of projectSearchIds ) {

            let numPsms = 0;  // default to zero if no entry

            const proteinItemRecord = proteinListItem.proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );
            if ( proteinItemRecord ) {
                numPsms = proteinItemRecord.numPsms;
            }
                
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                valueDisplay : numPsms.toLocaleString(),
                valueSort : numPsms
            })
            columnEntries.push( columnEntry );
        }
    }

    //  Create callback function

    const tableRowClickHandler_Callback_NoDataPassThrough : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough = ( params :  DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params ) : void => {
        const singleProteinRowClickHandler_Params : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler_Params = {
            dataTable_RowClickCallback_Params : params,
            proteinSequenceVersionId : proteinListItem.proteinSequenceVersionId
        }
        singleProteinRowClickHandler_Callback( singleProteinRowClickHandler_Params );
    }

    //  Create DataTable_DataRowEntry

    const dataTable_DataRowEntry = new DataTable_DataRowEntry({
        uniqueId : proteinListItem.proteinSequenceVersionId,
        sortOrder_OnEquals : arrayIndex, // Original Sort Order
        greyOutRow : greyOutRow,
        columnEntries,
        tableRowClickHandler_Callback_NoDataPassThrough
    })

    return dataTable_DataRowEntry;
}
