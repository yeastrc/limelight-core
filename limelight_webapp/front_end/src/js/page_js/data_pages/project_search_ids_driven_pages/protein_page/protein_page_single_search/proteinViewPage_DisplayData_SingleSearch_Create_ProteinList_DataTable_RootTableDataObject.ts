/**
 * proteinViewPage_DisplayData_SingleSearch_Create_ProteinList_DataTable_RootTableDataObject.ts
 * 
 * Create DataTable_RootTableDataObject for Protein List for Single Search
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import {
    DataTable_RootTableDataObject,
    DataTable_DataRowEntry,
    DataTable_DataGroupRowEntry,
    DataTable_Column,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import {
    ProteinDataDisplay_ProteinListItem_SingleSearch,
    ProteinDisplayData_From_createProteinDisplayData_SingleSearch
} from './proteinViewPage_DisplayData_SingleSearch_CreateProteinDisplayData';
import { ProteinInferenceUtils } from 'page_js/data_pages/protein_inference/ProteinInferenceUtils';
import { ProteinGroup } from 'page_js/data_pages/protein_inference/ProteinGroup';
import { SingleSearch_ProteinList_ProteinName_ExternalReactComponent, SingleSearch_ProteinList_ProteinName_ExternalReactComponent_Props_Data } from './proteinViewPage_DisplayData_SingleSearch_ProteinName_DataTable_Component';
import { SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent, SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data } from './proteinViewPage_DisplayData_SingleSearch_ProteinDescription_DataTable_Component';
import { ProteinGrouping_CentralStateManagerObjectClass } from '../protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';
import {AnnotationTypeItem} from "page_js/data_pages/data_pages_common/dataPageStateManager";


class GroupedProtein_Entry {
    proteinList_Grouped : Array<ProteinDataDisplay_ProteinListItem_SingleSearch>
    proteinGroup : ProteinGroup
}

//  Also export functions getProteinDataTableColumns_SingleSearch, createProteinList_ForDataTable below


export class ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Parameter {
    proteinSequenceVersionId : number
    dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params;
}

export type ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Function =
    ( params : ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Parameter ) => void;



/**
 * Create tableObject object  for DataTable
 */
export const renderToPageProteinList_SingleSearch_Create_DataTable_RootTableDataObject = function(
    {
        proteinDisplayData, proteinGrouping_CentralStateManagerObjectClass, projectSearchId, proteinRow_tableRowClickHandler_Callback_Function
} : {
    proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData_SingleSearch
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    projectSearchId : number
    proteinRow_tableRowClickHandler_Callback_Function: ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Function

}) : DataTable_RootTableDataObject {

    const proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch> = proteinDisplayData.proteinList
    const annotationTypeRecords_DisplayOrder = proteinDisplayData.annotationTypeRecords_DisplayOrder

    // the columns for the data being shown on the page
    const columns : Array<DataTable_Column> = getProteinDataTableColumns_SingleSearch( { 
        
        psmAnnotationTypes : annotationTypeRecords_DisplayOrder.psmAnnotationTypesForProteinListEntries,
        reportedPeptideAnnotationTypes : annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForProteinListEntries 
    } );

    let dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = undefined;
    let dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = undefined;

    if ( ! proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

        dataTable_DataGroupRowEntries = _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups({
            proteinGrouping_CentralStateManagerObjectClass, proteinList, projectSearchId, proteinRow_tableRowClickHandler_Callback_Function
        });

    } else {

        const greyOutRow = false;  //  Not pass for not grouped

        dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({
            greyOutRow, proteinList, proteinRow_tableRowClickHandler_Callback_Function
        });
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
export const getProteinDataTableColumns_SingleSearch = function(
    {
        psmAnnotationTypes, reportedPeptideAnnotationTypes
    }: {
        psmAnnotationTypes : AnnotationTypeItem[]
        reportedPeptideAnnotationTypes: AnnotationTypeItem[]

    } ) : Array<DataTable_Column> {


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
            cellMgmt_ExternalReactComponent : { reactComponent : SingleSearch_ProteinList_ProteinName_ExternalReactComponent }
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
            cellMgmt_ExternalReactComponent : { reactComponent : SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent }
            // css_class : ' clickable '
        });

        columns.push( column );
    }

    {
        const column = new DataTable_Column({
            id :           'protein_sequence_coverage',
            displayName :  'Sequence Coverage',
            width :        150,
            sortable : true,

            showHorizontalGraph: true,
            graphMaxValue: 1,
            graphWidth: 50,

            style_override_DataRowCell_React : { fontSize: 12 }, // React format Style overrides
            style_override_HeaderRowCell_React : { fontSize: 12 }, //  React format Style Overrides for Header Row Cells
            // css_class : ' clickable ' 
        });
        
        columns.push( column );
    }
    {
        const column = new DataTable_Column({
            id :           'num_reported_peptides',
            displayName :  'Peptides',
            width :        70,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 }, // React format Style overrides
            style_override_HeaderRowCell_React : { fontSize: 12 }, //  React format Style Overrides for Header Row Cells
            // css_class : ' clickable ' 
        });

        columns.push( column );
    }
    {
        const column = new DataTable_Column({
            id :           'num_reported_peptides_unique',
            displayName :  'Peptides Unique',
            width :        70,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 }, // React format Style overrides
            style_override_HeaderRowCell_React : { fontSize: 12 }, //  React format Style Overrides for Header Row Cells
            // css_class : ' clickable ' 
        });

        columns.push( column );
    }
    {
        const column = new DataTable_Column({
            id :           'psms',
            displayName :  'PSMs',
            width :        70,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 }, // React format Style overrides
            style_override_HeaderRowCell_React : { fontSize: 12 }, //  React format Style Overrides for Header Row Cells
            // css_class : ' clickable ' 
        });

        columns.push( column );
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
        proteinGrouping_CentralStateManagerObjectClass, proteinList, projectSearchId, proteinRow_tableRowClickHandler_Callback_Function
    } : {
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch>
    projectSearchId : number
    proteinRow_tableRowClickHandler_Callback_Function: ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Function

}) : Array<DataTable_DataGroupRowEntry> {

    const proteinList_Local = proteinList;

    const dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = [];

    const groupedProteins : Array<GroupedProtein_Entry> = _renderToPageProteinList_Create_dataGroupObjects_Group_proteinList_Entries({ proteinGrouping_CentralStateManagerObjectClass, proteinList: proteinList_Local, projectSearchId });

    let proteinList_Grouped_MaxLength = 0;

    //  Populate dataGroupObjects
    for ( const groupedProteinItem of groupedProteins ) {

        if ( proteinList_Grouped_MaxLength < groupedProteinItem.proteinList_Grouped.length ) {
            proteinList_Grouped_MaxLength = groupedProteinItem.proteinList_Grouped.length;
        }

        const greyOutRow = ! groupedProteinItem.proteinGroup.passesFilter;

        const dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({ 
            greyOutRow, proteinList : groupedProteinItem.proteinList_Grouped, proteinRow_tableRowClickHandler_Callback_Function
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
const _renderToPageProteinList_Create_dataGroupObjects_Group_proteinList_Entries = function({ proteinGrouping_CentralStateManagerObjectClass, proteinList, projectSearchId } : { 
    
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch> 
    projectSearchId  : number
}) : Array<GroupedProtein_Entry> {

    const proteinGroups_All : Array<ProteinGroup> = _group_proteinList_Entries_Get_PerProteinIdMap({ proteinGrouping_CentralStateManagerObjectClass, proteinList, projectSearchId });

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
            const msg = "WARN: At least 1 entry in  entry in proteinList not found in proteinGroups_All_Map_Key_ProteinId.  Not Found Count: " + notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count + ", projectSearchId: " + projectSearchId;
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
const _group_proteinList_Entries_Get_PerProteinIdMap = function({ proteinGrouping_CentralStateManagerObjectClass, proteinList, projectSearchId } : { 
    
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch> 
    projectSearchId  : number
}) : Array<ProteinGroup> {

    const proteinPeptideMap : Map<number, Set<number>> = new Map();

    for ( const proteinListItem of proteinList ) {
        const reportedPeptideIds_Set = new Set( proteinListItem.reportedPeptideIds );
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
const _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups = function(
    {
        greyOutRow, proteinList, proteinRow_tableRowClickHandler_Callback_Function
    } : {
    
    greyOutRow : boolean  //  Set greyOutRow on all rows
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch>
    proteinRow_tableRowClickHandler_Callback_Function: ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Function

}) : Array<DataTable_DataRowEntry> {

    const dataTable_DataRowEntries = createProteinList_ForDataTable_SingleSearch( {
        greyOutRow, proteinList, proteinRow_tableRowClickHandler_Callback_Function
    } );
    
    return dataTable_DataRowEntries;
}

/**
 *  Called from internal to this file and also called from proteinViewPage_DisplayData_SingleSearch.ts for downloads
 */
export const createProteinList_ForDataTable_SingleSearch = function(
    {
        greyOutRow, proteinList, proteinRow_tableRowClickHandler_Callback_Function
    } : {
    greyOutRow : boolean
    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch>
    proteinRow_tableRowClickHandler_Callback_Function: ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Function // May be Null

}) : Array<DataTable_DataRowEntry> {

    const proteinList_ForDataTable : Array<DataTable_DataRowEntry> = [];
    
    let index = 0;
    for ( const proteinListItem of proteinList ) {
        
        proteinList_ForDataTable.push( _createProteinItem_DataTableEntry( {
            greyOutRow, proteinListItem, arrayIndex : index, proteinRow_tableRowClickHandler_Callback_Function
        } ) );
        index++;
    }
    return proteinList_ForDataTable;
}

////////////////

/**
 * Create object 
 */
const _createProteinItem_DataTableEntry = function(
    {
        greyOutRow, proteinListItem, arrayIndex, proteinRow_tableRowClickHandler_Callback_Function
    } : {
    greyOutRow : boolean
    proteinListItem : ProteinDataDisplay_ProteinListItem_SingleSearch
    arrayIndex : number
    proteinRow_tableRowClickHandler_Callback_Function: ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Function // May be Null

}) : DataTable_DataRowEntry {


    //  Column entries for this data row in data table
    const columnEntries : DataTable_DataRow_ColumnEntry[] = [];

    {  // proteinName
        if ( ! proteinListItem.proteinName ) {
            throw Error( "_createProteinItem_DataTableEntry(...): proteinListItem.proteinName not populated: " + proteinListItem.proteinName )
        }

        const singleSearch_ProteinList_ProteinName_ExternalReactComponent_Props_Data = new SingleSearch_ProteinList_ProteinName_ExternalReactComponent_Props_Data({

            proteinName : proteinListItem.proteinName,
            proteinSequenceVersionId : proteinListItem.proteinSequenceVersionId
        });

        const columnEntry = new DataTable_DataRow_ColumnEntry({
            valueSort : proteinListItem.proteinName,
            cellMgmt_ExternalReactComponent_Data : singleSearch_ProteinList_ProteinName_ExternalReactComponent_Props_Data
        })
        columnEntries.push( columnEntry );
    }
    {  // proteinDescription
        let proteinDescription = proteinListItem.proteinDescription;
        if ( ! proteinDescription ) {
            proteinDescription = "";  // Was undefined, null, or empty string so make it empty string
        }

        const singleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data = new SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data ({

            proteinDescription : proteinDescription,
            proteinSequenceVersionId : proteinListItem.proteinSequenceVersionId
        });

        const columnEntry = new DataTable_DataRow_ColumnEntry({
            valueSort : proteinDescription,
            cellMgmt_ExternalReactComponent_Data : singleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data
        })
        columnEntries.push( columnEntry );
    }
    {  // proteinCoverageRatioDisplay
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            valueDisplay : proteinListItem.proteinCoverageRatioDisplay,
            valueSort : proteinListItem.proteinCoverageRatio
        })
        columnEntries.push( columnEntry );
    }
    {  // numReportedPeptides
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            valueDisplay : proteinListItem.numReportedPeptides.toLocaleString(),
            valueSort : proteinListItem.numReportedPeptides
        })
        columnEntries.push( columnEntry );
    }
    {  // numReportedPeptidesUnique
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            valueDisplay : proteinListItem.numReportedPeptidesUnique.toLocaleString(),
            valueSort : proteinListItem.numReportedPeptidesUnique
        })
        columnEntries.push( columnEntry );
    }
    {  // numPsms
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            valueDisplay : proteinListItem.numPsms.toLocaleString(),
            valueSort : proteinListItem.numPsms
        })
        columnEntries.push( columnEntry );
    }

    let tableRowClickHandler_Callback_NoDataPassThrough : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough = undefined;

    if ( proteinRow_tableRowClickHandler_Callback_Function ) {

        tableRowClickHandler_Callback_NoDataPassThrough =
            (params_tableRowClickHandler_Callback: DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params): void => {

                const proteinRow_tableRowClickHandler_Callback_Parameter = new ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Parameter();
                proteinRow_tableRowClickHandler_Callback_Parameter.proteinSequenceVersionId = proteinListItem.proteinSequenceVersionId;
                proteinRow_tableRowClickHandler_Callback_Parameter.dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params = params_tableRowClickHandler_Callback;

                proteinRow_tableRowClickHandler_Callback_Function(proteinRow_tableRowClickHandler_Callback_Parameter);
            }
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
