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
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params,
    DataTable_RootTableDataObject_Both_ColumnArrays,
    DataTable_Column_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { ProteinGroup } from 'page_js/data_pages/protein_inference/ProteinGroup';
import { ProteinGrouping_CentralStateManagerObjectClass } from '../protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';
import {
    ProteinDataDisplay_ProteinListItem_MultipleSearch, ProteinNameDescriptionCacheEntry_MultipleSearches,
    ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler,
    ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler_Params
} from './proteinViewPage_DisplayData_MultipleSearches';
import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {
    get_MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent,
    get_MultipleSearches_ProteinList_ProteinName_ExternalReactComponent
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/proteinViewPage_DisplayData_MultipleSearches_ProteinName_ProteinDescription_DataTable_Component";
import {ProteinNameDescriptionCacheEntry_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/proteinViewPage_DisplayData_SingleSearch_CreateProteinDisplayData";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";


const _FALSE__DOWNLOAD_STRING = "false";
const _TRUE__DOWNLOAD_STRING = "true";

class GroupedProtein_Entry {
    proteinList_Grouped : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
    proteinGroup : ProteinGroup
    isSubsetGroup: boolean
}

/**
 * Create tableObject object  for DataTable
 */
export const renderToPageProteinList_MultipleSearches_Create_DataTable_RootTableDataObject = function(
    {
        singleProteinRowClickHandler_Callback,
        proteinList, proteinGroups_ArrayOf_ProteinGroup, proteinGrouping_CentralStateManagerObjectClass, projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, dataPageStateManager_DataFrom_Server
    } : {
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler
        proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
        proteinGroups_ArrayOf_ProteinGroup : Array<ProteinGroup> //  Populated when grouping
        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry_MultipleSearches>>
        dataPageStateManager_DataFrom_Server : DataPageStateManager

    }) : DataTable_RootTableDataObject {

    // the columns for the data being shown on the page
    const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getProteinDataTableColumns( {
        projectSearchIds, dataPageStateManager_DataFrom_Server, proteinGrouping_CentralStateManagerObjectClass
    } );

    let dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = undefined;
    let dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = undefined;

    if ( ! proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

        //  YES Proteins ARE Grouped

        dataTable_DataGroupRowEntries = _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups({
            proteinGrouping_CentralStateManagerObjectClass,
            proteinList,
            proteinGroups_ArrayOf_ProteinGroup,
            projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
            singleProteinRowClickHandler_Callback
        });

    } else {

        //  Proteins are NOT Grouped

        const greyOutRow = false;  //  Not pass for not grouped

        dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({
            groupNumber: undefined, greyOutRow, isSubsetGroup: undefined,
            proteinList, projectSearchIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
        });
    }

    const tableObject = new DataTable_RootTableDataObject({
        columns: dataTable_RootTableDataObject_Both_ColumnArrays.columns,
        columns_tableDownload: dataTable_RootTableDataObject_Both_ColumnArrays.columns_tableDownload,
        dataTable_DataRowEntries,
        dataTable_DataGroupRowEntries
    });

    return tableObject;
}


/**
 * Create Table Columns 
 */
const _getProteinDataTableColumns = function( { projectSearchIds, dataPageStateManager_DataFrom_Server, proteinGrouping_CentralStateManagerObjectClass } : {
    
    projectSearchIds : Array<number>
    dataPageStateManager_DataFrom_Server : DataPageStateManager
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass

} ) : DataTable_RootTableDataObject_Both_ColumnArrays {

    
    //  For getting search info for projectSearchIds

    //  searchNamesKeyProjectSearchId is an Object where the property names are project search ids as numbers
    const searchNamesMap_KeyProjectSearchId = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();


    let columns : Array<DataTable_Column> = [ ];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {
        const displayName = 'Protein(s)';

        const column = new DataTable_Column({
            id :           'proteins',
            displayName,
            width :        300,
            sortable : true
        });

        columns.push( column );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = 'Protein Description(s)';

        const column = new DataTable_Column({
            id :           'protein_descriptions',
            displayName,
            width :        325,
            sortable : true
        });

        columns.push( column );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
		for ( const projectSearchId of projectSearchIds ) {
			
			const searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
			if ( ! searchNameObject ) {
				throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
			}

            const displayName = 'PSMs (' + searchNameObject.searchId + ")";

            const column = new DataTable_Column({
                id :           'psms_' + projectSearchId,
                displayName,
                width :        80,
                sortable : true,
                onlyShow_ValueDisplay_FirstRowOfGroup: true
            });

            columns.push( column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
    }

    {
        for ( const projectSearchId of projectSearchIds ) {

            const searchNameObject = searchNamesMap_KeyProjectSearchId.get(projectSearchId);
            if (!searchNameObject) {
                throw Error("No searchNameObject for projectSearchId: " + projectSearchId);
            }

            {  //  Reported Peptides count

                const displayName = 'Peptides (' + searchNameObject.searchId + ")";

                const column = new DataTable_Column({
                    id: 'peptides_' + projectSearchId,
                    displayName,
                    width: 80,
                    sortable: true,
                    onlyShow_ValueDisplay_FirstRowOfGroup: true
                });

                columns.push(column);

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({cell_ColumnHeader_String: displayName});
                dataTable_Column_DownloadTable_Entries.push(dataTable_Column_DownloadTable);
            }
            {  //  Reported Peptides Unique count

                const displayName = 'Peptides Unique (' + searchNameObject.searchId + ")";

                const column = new DataTable_Column({
                    id: 'peptidesUnique_' + projectSearchId,
                    displayName,
                    width: 80,
                    sortable: true,
                    onlyShow_ValueDisplay_FirstRowOfGroup: true
                });

                columns.push(column);

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({cell_ColumnHeader_String: displayName});
                dataTable_Column_DownloadTable_Entries.push(dataTable_Column_DownloadTable);
            }
        }
    }

    ///  !!!!!

    //  Next are ONLY for Download

    if ( ! proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

        //  IS Grouping so add Protein Group Number

        const displayName = 'Protein Group Number';

        //   ONLY for Download

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups() ) {

        //  non subset groups so add Is Subset

        const displayName = 'Is Subset';

        //   ONLY for Download

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    const dataTable_RootTableDataObject_Both_ColumnArrays = new DataTable_RootTableDataObject_Both_ColumnArrays({ columns: columns, columns_tableDownload: dataTable_Column_DownloadTable_Entries });

    return dataTable_RootTableDataObject_Both_ColumnArrays;
}


////////////////

/**
 * Create dataGroupObjects object  for DataTable
 * 
 * For YES Grouping of Proteins
 */
const _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups = function(
    {
        proteinGrouping_CentralStateManagerObjectClass, proteinList, proteinGroups_ArrayOf_ProteinGroup, projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
    } : {
    
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
    proteinGroups_ArrayOf_ProteinGroup : Array<ProteinGroup>
    projectSearchIds  : Array<number>
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry_MultipleSearches>>
    singleProteinRowClickHandler_Callback : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler

}) : Array<DataTable_DataGroupRowEntry> {

    const proteinList_Local = proteinList;

    const dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = [];

    const groupedProteins : Array<GroupedProtein_Entry> = _renderToPageProteinList_Create_dataGroupObjects_Group_proteinList_Entries({ 
        
        proteinGrouping_CentralStateManagerObjectClass, proteinList: proteinList_Local, proteinGroups_ArrayOf_ProteinGroup, projectSearchIds 
    });

    //  The Unique Peptide Counts need to be computed using the groups
    _renderToPageProteinList_dataGroupObjects_Group_proteinList__Update_UniquePeptideCounts({ groupedProteins, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

    let proteinList_Grouped_MaxLength = 0;

    let groupNumber = 0;

    //  Populate dataGroupObjects
    for ( const groupedProteinItem of groupedProteins ) {

        groupNumber++;

        if ( proteinList_Grouped_MaxLength < groupedProteinItem.proteinList_Grouped.length ) {
            proteinList_Grouped_MaxLength = groupedProteinItem.proteinList_Grouped.length;
        }

        const greyOutRow = ! groupedProteinItem.proteinGroup.passesFilter;
        const isSubsetGroup = groupedProteinItem.isSubsetGroup;

        const dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({
            groupNumber, greyOutRow, isSubsetGroup, proteinList : groupedProteinItem.proteinList_Grouped, projectSearchIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
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

            //  Only Set isSubsetGroup when Selected NonSubset_Groups

            let isSubsetGroup: boolean = undefined;
            if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups() ) {
                isSubsetGroup = ! proteinGroup_For_proteinListItem.passesFilter
            }

            const groupedProtein_NewEntry : GroupedProtein_Entry = {
                proteinList_Grouped : [ proteinListItem ],
                proteinGroup : proteinGroup_For_proteinListItem,
                isSubsetGroup
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

/**
 *
 * @param groupedProteins
 * @param loadedDataPerProjectSearchIdHolder
 */
const _renderToPageProteinList_dataGroupObjects_Group_proteinList__Update_UniquePeptideCounts = function(
    {
        groupedProteins, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    } : {
        groupedProteins : Array<GroupedProtein_Entry>
        projectSearchIds  : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    }) : void {

    //  Populate dataGroupObjects
    for ( const groupedProteinItem of groupedProteins ) {

        const proteinSequenceVersionIds_InGroup = groupedProteinItem.proteinGroup.proteins

        for ( const proteinItem_Grouped of groupedProteinItem.proteinList_Grouped ) {

            for ( const projectSearchId of projectSearchIds ) {

                const proteinItemRecord = proteinItem_Grouped.proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );

                if ( ! proteinItemRecord ) {

                    //  No Entry for projectSearchId

                    continue;  // EARLY CONTINUE
                }

                const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
                if ( ! loadedDataPerProjectSearchIdHolder ) {
                    const msg = "_renderToPageProteinList_dataGroupObjects_Group_proteinList__Update_UniquePeptideCounts(...): loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId) returned nothing for projectSearchId: " + projectSearchId ;
                    console.warn(msg);
                    throw Error(msg);
                }

                const proteinSequenceVersionIdsKeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId();
                if ( ! proteinSequenceVersionIdsKeyReportedPeptideId ) {
                    const msg = "_renderToPageProteinList_dataGroupObjects_Group_proteinList__Update_UniquePeptideCounts(...): loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId() returned nothing";
                    console.warn(msg);
                    throw Error(msg);
                }

                let numReportedPeptidesUnique = 0;

                for ( const reportedPeptideId of proteinItemRecord.reportedPeptideIds ) {

                    const proteinSequenceVersionIds_For_ReportedPeptideId = proteinSequenceVersionIdsKeyReportedPeptideId.get( reportedPeptideId );
                    if ( ! proteinSequenceVersionIds_For_ReportedPeptideId ) {
                        const msg = "_renderToPageProteinList_dataGroupObjects_Group_proteinList__Update_UniquePeptideCounts(...): proteinSequenceVersionIdsKeyReportedPeptideId.get( reportedPeptideId ); returned nothing. reportedPeptideId: " + reportedPeptideId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    let reportedPeptide_Unique = true;
                    for ( const proteinSequenceVersionId of proteinSequenceVersionIds_For_ReportedPeptideId ) {
                        if ( ! proteinSequenceVersionIds_InGroup.has( proteinSequenceVersionId ) ) {
                            reportedPeptide_Unique = false;
                            break;
                        }
                    }
                    if ( reportedPeptide_Unique ) {
                        //  Reported Peptide unique so increment count

                        numReportedPeptidesUnique++;
                    }
                }

                proteinItemRecord.numReportedPeptidesUnique = numReportedPeptidesUnique;
            }
        }

    }
}

//////////////////////


/**
 * Create dataObjects object  for DataTable
 * 
 * For NO Grouping of Proteins
 */
const _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups = function(
    {
        groupNumber, greyOutRow, isSubsetGroup, proteinList, projectSearchIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
    } : {
        groupNumber: number
        greyOutRow : boolean  //  Set greyOutRow on all rows
        isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
        proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
        projectSearchIds : Array<number>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry_MultipleSearches>>
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler

    }) : Array<DataTable_DataRowEntry> {

    const dataTable_DataRowEntries = _createProteinList_ForDataTable( {
        groupNumber, greyOutRow, isSubsetGroup, proteinList, projectSearchIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
    } );
    
    return dataTable_DataRowEntries;
}

/**
 *
 */
const _createProteinList_ForDataTable = function(
    {
        groupNumber, greyOutRow, isSubsetGroup, proteinList, projectSearchIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
    } : {
        groupNumber: number
        greyOutRow : boolean  //  Set greyOutRow on all rows
        isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
        proteinList : Array<ProteinDataDisplay_ProteinListItem_MultipleSearch>
        projectSearchIds : Array<number>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry_MultipleSearches>>
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler

    }) : Array<DataTable_DataRowEntry> {

    const proteinList_ForDataTable : Array<DataTable_DataRowEntry> = [];
    
    let index = 0;
    for ( const proteinListItem of proteinList ) {

        const proteinSequenceVersionId = proteinListItem.proteinSequenceVersionId;

        const proteinNameDescriptionForToolip = proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( ! proteinNameDescriptionForToolip ) {
            const msg = "( ! proteinNameDescriptionForToolip ) in createProteinList_ForDataTable_SingleSearch for proteinSequenceVersionId: " + proteinSequenceVersionId;
            console.warn(msg);
            throw Error( msg );
        }

        proteinList_ForDataTable.push(
            _createProteinItem_DataTableEntry( {
                groupNumber, greyOutRow, isSubsetGroup, proteinListItem, arrayIndex : index, projectSearchIds, proteinNameDescriptionForToolip, singleProteinRowClickHandler_Callback
            } )
        );
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
        groupNumber, greyOutRow, isSubsetGroup, proteinListItem, arrayIndex, projectSearchIds, proteinNameDescriptionForToolip, singleProteinRowClickHandler_Callback
    } : {
    groupNumber: number
    greyOutRow : boolean  //  Set greyOutRow on all rows
    isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
    proteinListItem : ProteinDataDisplay_ProteinListItem_MultipleSearch
    arrayIndex : number
    projectSearchIds : Array<number>
    proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry_MultipleSearches>
    singleProteinRowClickHandler_Callback : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler

}) : DataTable_DataRowEntry {

    //  Column entries for this data row in data table
    const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
    const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

    {  // proteinNames
        if ( ! proteinListItem.proteinNames ) {
            throw Error( "_createProteinItem_DataTableEntry(...): proteinListItem.proteinNames not populated: " + proteinListItem.proteinNames )
        }

        const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
            ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                return get_MultipleSearches_ProteinList_ProteinName_ExternalReactComponent({
                    proteinName: proteinListItem.proteinNames, proteinSequenceVersionId: proteinListItem.proteinSequenceVersionId, proteinNameDescriptionForToolip
                });
            };

        const valueDisplay = proteinListItem.proteinNames;
        const searchEntriesForColumn : Array<string> = [ valueDisplay ];
        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn });
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            searchTableData,
            valueSort : proteinListItem.proteinNames,
            valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
        })
        columnEntries.push( columnEntry );

        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
    }
    {  // proteinDescription
        let proteinDescription = proteinListItem.proteinDescriptions;
        if ( ! proteinDescription ) {
            proteinDescription = "";  // Was undefined, null, or empty string so make it empty string
        }

        const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
            ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                return get_MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent({
                    proteinDescription: proteinDescription, proteinSequenceVersionId: proteinListItem.proteinSequenceVersionId, proteinNameDescriptionForToolip
                });
            };

        const valueDisplay = proteinDescription;
        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            searchTableData,
            valueSort : proteinDescription,
            valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
        })
        columnEntries.push( columnEntry );

        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
    }
    
    {  // numPsms per search

		for ( const projectSearchId of projectSearchIds ) {

            let numPsms = 0;  // default to zero if no entry

            const proteinItemRecord = proteinListItem.proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );
            if ( proteinItemRecord ) {
                numPsms = proteinItemRecord.numPsms;
            }

            const valueDisplay = numPsms.toLocaleString();
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : numPsms
            })
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }
    }
    {  // Num Reported Peptides and Reported Peptides Unique per search

        for ( const projectSearchId of projectSearchIds ) {

            { // Num Reported Peptides Unique for search

                let num = 0;  // default to zero if no entry

                const proteinItemRecord = proteinListItem.proteinItemRecordsMap_Key_projectSearchId.get(projectSearchId);
                if (proteinItemRecord) {
                    num = proteinItemRecord.numReportedPeptides;
                }

                const valueDisplay = num.toLocaleString();
                const searchEntriesForColumn: Array<string> = [valueDisplay]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({searchEntriesForColumn})
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort: num
                })
                columnEntries.push(columnEntry);

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({cell_ColumnData_String: valueDisplay})
                dataColumns_tableDownload.push(dataTable_DataRowEntry_DownloadTable_SingleColumn);
            }
            { // Reported Peptides Unique for search

                let num = 0;  // default to zero if no entry

                const proteinItemRecord = proteinListItem.proteinItemRecordsMap_Key_projectSearchId.get(projectSearchId);
                if (proteinItemRecord) {
                    num = proteinItemRecord.numReportedPeptidesUnique;
                }

                const valueDisplay = num.toLocaleString();
                const searchEntriesForColumn: Array<string> = [valueDisplay]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({searchEntriesForColumn})
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort: num
                })
                columnEntries.push(columnEntry);

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({cell_ColumnData_String: valueDisplay})
                dataColumns_tableDownload.push(dataTable_DataRowEntry_DownloadTable_SingleColumn);
            }
        }
    }

    ///////

    //  For Downloads Only

    {  //  groupNumber
        if ( groupNumber !== undefined && groupNumber !== null ) {

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: groupNumber.toString() })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }
    }

    {  //  isSubsetGroup
        if ( isSubsetGroup !== undefined && isSubsetGroup !== null ) {

            let cell_ColumnData_String = _FALSE__DOWNLOAD_STRING;
            if ( isSubsetGroup ) {
                cell_ColumnData_String = _TRUE__DOWNLOAD_STRING;
            }
            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }
    }


    //////


    //  Create callback function

    const tableRowClickHandler_Callback_NoDataPassThrough : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough = ( params :  DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params ) : void => {
        const singleProteinRowClickHandler_Params : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler_Params = {
            dataTable_RowClickCallback_Params : params,
            proteinSequenceVersionId : proteinListItem.proteinSequenceVersionId
        }
        singleProteinRowClickHandler_Callback( singleProteinRowClickHandler_Params );
    }

    const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

    //  Create DataTable_DataRowEntry

    const dataTable_DataRowEntry = new DataTable_DataRowEntry({
        uniqueId : proteinListItem.proteinSequenceVersionId,
        sortOrder_OnEquals : arrayIndex, // Original Sort Order
        greyOutRow : greyOutRow,
        columnEntries,
        dataTable_DataRowEntry_DownloadTable,
        tableRowClickHandler_Callback_NoDataPassThrough
    })

    return dataTable_DataRowEntry;
}
