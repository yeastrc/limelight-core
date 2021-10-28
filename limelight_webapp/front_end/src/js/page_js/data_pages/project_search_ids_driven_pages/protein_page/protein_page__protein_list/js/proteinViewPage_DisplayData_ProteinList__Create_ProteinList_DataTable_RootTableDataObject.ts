/**
 * proteinViewPage_DisplayData_ProteinList__Create_ProteinList_DataTable_RootTableDataObject.ts
 * 
 * Create DataTable_RootTableDataObject for Protein List for Single Search, Sub Groups, and Multiple Searches
 */


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

import { ProteinGrouping_CentralStateManagerObjectClass } from '../../protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';
import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {
    get_ProteinList_ProteinDescription_ExternalReactComponent,
    get_ProteinList_ProteinName_ExternalReactComponent
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__ProteinName_ProteinDescription_DataTable_Component";
import {
    ProteinNameDescriptionCacheEntry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped";
import {
    get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/jsx/proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_And_Tooltip_DataTable_Component";
import {
    get_proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Tooltip_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_PeptideUnique_Count_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_PeptideUnique_Count_Header_Tooltip_DataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/protein_page__protein_list__single_search_code/datatable_components/proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Text_And_Tooltip_DataTable_Component";
import {ProteinDataDisplay_ProteinList_Item, ProteinDisplayData_From_createProteinDisplayData_ProteinList } from './proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes';

//  Strings used in the download of the table
const _FALSE__DOWNLOAD_STRING = "false";
const _TRUE__DOWNLOAD_STRING = "true";

///   Callback when row in protein list table is clicked

export class ProteinViewPage_Display__singleProteinRow_ClickHandler_Params {
    proteinSequenceVersionId: number
    dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params: DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params
}

export type ProteinViewPage_Display__singleProteinRow_ClickHandler = (params : ProteinViewPage_Display__singleProteinRow_ClickHandler_Params ) => void

/**
 * Create tableObject object  for DataTable
 */
export const proteinViewPage_renderToPageProteinList__Create_DataTable_RootTableDataObject = function(
    {
        singleProteinRowClickHandler_Callback,
        proteinDisplayData,
        proteinGrouping_CentralStateManagerObjectClass,
        searchSubGroupIds,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, dataPageStateManager_DataFrom_Server
    } : {
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display__singleProteinRow_ClickHandler
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        searchSubGroupIds : Array<number>  //  undefined or null when not applicable
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        dataPageStateManager_DataFrom_Server : DataPageStateManager

    }) : DataTable_RootTableDataObject {

    // the columns for the data being shown on the page
    const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getProteinDataTableColumns( {
        projectSearchIds, searchSubGroupIds, dataPageStateManager_DataFrom_Server, proteinGrouping_CentralStateManagerObjectClass
    } );

    let dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = undefined;
    let dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = undefined;

    if ( ! proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

        //  YES Proteins ARE Grouped

        dataTable_DataGroupRowEntries = _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups({
            proteinGrouping_CentralStateManagerObjectClass,
            proteinDisplayData,
            projectSearchIds,
            searchSubGroupIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
            singleProteinRowClickHandler_Callback
        });

    } else {

        //  Proteins are NOT Grouped

        const greyOutRow = false;  //  Not pass for not grouped

        dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({
            groupNumber: undefined, greyOutRow, isSubsetGroup: undefined,
            proteinList: proteinDisplayData.proteinList,
            projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
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
const _getProteinDataTableColumns = function( { projectSearchIds, searchSubGroupIds, dataPageStateManager_DataFrom_Server, proteinGrouping_CentralStateManagerObjectClass } : {

    projectSearchIds : Array<number>
    searchSubGroupIds : Array<number>  //  undefined or null when not applicable
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

    if ( projectSearchIds.length === 1 && ( ! searchSubGroupIds ) ) {

        //  Only 1 search and NO Sub Group Ids so display Sequence Coverage

        {
            const displayName = 'Sequence Coverage';

            const column = new DataTable_Column({
                id :           'protein_sequence_coverage',
                displayName,
                width :        150,
                sortable : true,

                showHorizontalGraph: true,
                graphMaxValue: 1,
                graphWidth: 50,
            });

            columns.push( column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
    }

    if ( projectSearchIds.length === 1 ) {

        //  Only 1 search

        //  Counts overall

        {  // PSM count overall

            const displayName = 'PSMs';

            const column = new DataTable_Column({
                id :           'psms',
                displayName,
                width :        80,
                sortable : true,
                onlyShow_ValueDisplay_FirstRowOfGroup: true
            });

            columns.push( column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        {  //  Reported Peptides count overall

            const displayName = 'Distinct Peptides';

            const column = new DataTable_Column({
                id: 'peptides',
                displayName,
                width: 80,
                sortable: true,
                onlyShow_ValueDisplay_FirstRowOfGroup: true
            });

            columns.push(column);

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({cell_ColumnHeader_String: displayName});
            dataTable_Column_DownloadTable_Entries.push(dataTable_Column_DownloadTable);
        }
        {  //  Reported Peptides Unique count overall

            const displayName = 'Unique Peptides';

            const column = new DataTable_Column({
                id: 'peptidesUnique',
                displayName,
                width: 80,
                columnHeader_Tooltip_HTML_TitleAttribute: "distinct unique peptides",
                sortable: true,
                onlyShow_ValueDisplay_FirstRowOfGroup: true
            });

            columns.push(column);

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({cell_ColumnHeader_String: displayName});
            dataTable_Column_DownloadTable_Entries.push(dataTable_Column_DownloadTable);
        }

    }

    if ( projectSearchIds.length === 1 ) {

        //  Only 1 search

        if ( searchSubGroupIds ) {

            //  YES Sub Groups so display Sub Group data

            const projectSearchId = projectSearchIds[0];

            const searchSubGroups_Root = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root();
            if ( ! searchSubGroups_Root ) {
                throw Error("getProteinDataTableColumns_SingleSearch__SearchSubGroup: dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root(); return nothing for projectSearchId: " + projectSearchId );
            }
            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
            if ( ! searchSubGroups_ForProjectSearchId ) {
                throw Error("getProteinDataTableColumns_SingleSearch__SearchSubGroup: searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ); return nothing for projectSearchId: " + projectSearchId );
            }

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
                    onlyShow_ValueDisplay_FirstRowOfGroup: true
                });

                columns.push( column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }

            for ( const searchSubGroupId of searchSubGroupIds ) {

                const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroupId );
                if ( ! searchSubGroup ) {
                    throw Error("getProteinDataTableColumns_SingleSearch__SearchSubGroup: searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroupId ); return nothing for searchSubGroupId: " + searchSubGroupId
                        + ", projectSearchId: " + projectSearchId );
                }

                {  //  Reported Peptides Count

                    const displayName = get_proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Text_DataTable_Component({searchSubGroup});

                    const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = (): JSX.Element => {

                        return get_proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Tooltip_DataTable_Component({searchSubGroup});
                    }

                    const column = new DataTable_Column({
                        id: 'peptides_' + searchSubGroupId,
                        displayName,
                        columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,
                        width: 80,
                        sortable: true,
                        onlyShow_ValueDisplay_FirstRowOfGroup: true
                    });

                    columns.push(column);

                    const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({cell_ColumnHeader_String: displayName});
                    dataTable_Column_DownloadTable_Entries.push(dataTable_Column_DownloadTable);
                }

                {  //  Reported Peptides Unique Count

                    const displayName = get_proteinViewPage_DisplayData__SearchSubGroup_PeptideUnique_Count_Header_Text_DataTable_Component({searchSubGroup});

                    const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = (): JSX.Element => {

                        return get_proteinViewPage_DisplayData__SearchSubGroup_PeptideUnique_Count_Header_Tooltip_DataTable_Component({searchSubGroup});
                    }

                    const column = new DataTable_Column({
                        id: 'peptidesUnique_' + searchSubGroupId,
                        displayName,
                        columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,
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

    } else {

        //  NOT Single Search.  Display data for Each Search

        //  PSM Counts

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

		//  Distinct Peptide and Unique Distinct Peptide Counts

        for ( const projectSearchId of projectSearchIds ) {

            const searchNameObject = searchNamesMap_KeyProjectSearchId.get(projectSearchId);
            if (!searchNameObject) {
                throw Error("No searchNameObject for projectSearchId: " + projectSearchId);
            }

            {  //  Reported Peptides count

                const displayName = 'Distinct Peptides (' + searchNameObject.searchId + ")";

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
        proteinGrouping_CentralStateManagerObjectClass, proteinDisplayData, projectSearchIds, searchSubGroupIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
    } : {

        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        projectSearchIds  : Array<number>
        searchSubGroupIds : Array<number>  //  undefined or null when not applicable
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display__singleProteinRow_ClickHandler

    }) : Array<DataTable_DataGroupRowEntry> {

    const dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = [];

    if ( ( ! proteinDisplayData.proteinGroupsList ) || proteinDisplayData.proteinGroupsList.length === 0 ) {
        //  No data so return empty array
        return dataTable_DataGroupRowEntries; // EARLY RETURN
    }

    let proteinList_Grouped_MaxLength = 0;

    let groupNumber = 0;

    //  Populate dataGroupObjects
    for ( const groupedProteinItem of proteinDisplayData.proteinGroupsList ) {

        groupNumber++;

        if ( proteinList_Grouped_MaxLength < groupedProteinItem.proteinList_Grouped.length ) {
            proteinList_Grouped_MaxLength = groupedProteinItem.proteinList_Grouped.length;
        }

        const greyOutRow = ! groupedProteinItem.proteinGroup.passesFilter;
        const isSubsetGroup = groupedProteinItem.isSubsetGroup;

        const dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({
            groupNumber, greyOutRow, isSubsetGroup, proteinList : groupedProteinItem.proteinList_Grouped, projectSearchIds, searchSubGroupIds,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
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

//////////////////////


/**
 * Create dataObjects object  for DataTable
 *
 * For NO Grouping of Proteins
 */
const _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups = function(
    {
        groupNumber, greyOutRow, isSubsetGroup, proteinList, projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
    } : {
        groupNumber: number
        greyOutRow : boolean  //  Set greyOutRow on all rows
        isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
        proteinList : Array<ProteinDataDisplay_ProteinList_Item>
        projectSearchIds : Array<number>
        searchSubGroupIds : Array<number>  //  undefined or null when not applicable
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display__singleProteinRow_ClickHandler

    }) : Array<DataTable_DataRowEntry> {

    const dataTable_DataRowEntries = _createProteinList_ForDataTable( {
        groupNumber, greyOutRow, isSubsetGroup, proteinList, projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
    } );

    return dataTable_DataRowEntries;
}

/**
 *
 */
const _createProteinList_ForDataTable = function(
    {
        groupNumber, greyOutRow, isSubsetGroup, proteinList, projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback
    } : {
        groupNumber: number
        greyOutRow : boolean  //  Set greyOutRow on all rows
        isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
        proteinList : Array<ProteinDataDisplay_ProteinList_Item>
        projectSearchIds : Array<number>
        searchSubGroupIds : Array<number>  //  undefined or null when not applicable
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display__singleProteinRow_ClickHandler

    }) : Array<DataTable_DataRowEntry> {

    const proteinList_ForDataTable : Array<DataTable_DataRowEntry> = [];

    if ( ( ! proteinList ) || proteinList.length === 0 ) {
        //  No data so return empty array
        return proteinList_ForDataTable; // EARLY RETURN
    }

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
                groupNumber, greyOutRow, isSubsetGroup, proteinListItem, arrayIndex : index, projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip, singleProteinRowClickHandler_Callback
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
        groupNumber, greyOutRow, isSubsetGroup, proteinListItem, arrayIndex, projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip, singleProteinRowClickHandler_Callback
    } : {
    groupNumber: number
    greyOutRow : boolean  //  Set greyOutRow on all rows
    isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
    proteinListItem : ProteinDataDisplay_ProteinList_Item
    arrayIndex : number
    projectSearchIds : Array<number>
    searchSubGroupIds : Array<number>  //  undefined or null when not applicable
    proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry>
    singleProteinRowClickHandler_Callback : ProteinViewPage_Display__singleProteinRow_ClickHandler

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

                return get_ProteinList_ProteinName_ExternalReactComponent({
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

                return get_ProteinList_ProteinDescription_ExternalReactComponent({
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


    if ( projectSearchIds.length === 1 && ( ! searchSubGroupIds ) ) {

        //  Only 1 search and NO Sub Groups so display Sequence Coverage

        {  // proteinCoverageRatioDisplay
            const valueDisplay = proteinListItem.proteinCoverageRatioDisplay_SingleSearch_NoSubGroups;
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : proteinListItem.proteinCoverageRatio_SingleSearch_NoSubGroups
            })
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }
    }


    if ( projectSearchIds.length === 1 ) {

        //  Only 1 search

        // Overall: Num PSMs, Reported Peptides, and Reported Peptides Unique

        {  //  Num PSMs

            let num = -998;

            if ( proteinListItem.numPsms_Overall !== undefined && proteinListItem.numPsms_Overall !== null ) {
                num = proteinListItem.numPsms_Overall;
            }
            const valueDisplay = num.toLocaleString();
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : num
            })
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }
        { // Num Reported Peptides Unique

            let num = -998;

            if ( proteinListItem.peptideCount_Overall !== undefined && proteinListItem.peptideCount_Overall !== null ) {
                num = proteinListItem.peptideCount_Overall;
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
        { // Reported Peptides Unique

            let num = -998;

            if ( proteinListItem.uniquePeptideCount_Overall !== undefined && proteinListItem.uniquePeptideCount_Overall !== null ) {
                num = proteinListItem.uniquePeptideCount_Overall;
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

    if ( projectSearchIds.length === 1 ) {

        //  Only 1 search

        if (searchSubGroupIds) {

            //  YES Sub Groups so display Sub Group data


            {  // numPsms per search sub group

                for ( const searchSubGroupId of searchSubGroupIds ) {

                    let numPsms = 0;  // default to zero if no entry

                    const protein_SubItem_Record = proteinListItem.protein_SubItem_Records_Map_Key_SubGroup_Id.get( searchSubGroupId )
                    if ( protein_SubItem_Record ) {
                        numPsms = protein_SubItem_Record.numPsms;
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

            {  // Num Reported Peptides and Num Reported Peptides Unique per search sub group

                for (const searchSubGroupId of searchSubGroupIds) {

                    {  // Num Distinct Peptides for search sub group

                        let num = 0;  // default to zero if no entry

                        const protein_SubItem_Record = proteinListItem.protein_SubItem_Records_Map_Key_SubGroup_Id.get( searchSubGroupId )
                        if ( protein_SubItem_Record ) {
                            num = protein_SubItem_Record.peptideCount;
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

                    {  // Num Unique Distinct Peptides for search sub group

                        let num = 0;  // default to zero if no entry

                        const protein_SubItem_Record = proteinListItem.protein_SubItem_Records_Map_Key_SubGroup_Id.get( searchSubGroupId )
                        if ( protein_SubItem_Record ) {
                            num = protein_SubItem_Record.uniquePeptideCount;
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

        }

    } else {

        //  More than 1 Search

        // Per Search:  numPsms

		for ( const projectSearchId of projectSearchIds ) {

            let numPsms = 0;  // default to zero if no entry

            const proteinItemRecord = proteinListItem.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId );
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

         //  Per Search: Num Distinct Peptides and Distinct Peptides Unique

        for ( const projectSearchId of projectSearchIds ) {

            { // Num Distinct Peptides for search

                let num = 0;  // default to zero if no entry

                const proteinItemRecord = proteinListItem.protein_SubItem_Records_Map_Key_projectSearchId.get(projectSearchId);
                if (proteinItemRecord) {
                    num = proteinItemRecord.peptideCount;
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
            { // Num Distinct Peptides Unique for search

                let num = 0;  // default to zero if no entry

                const proteinItemRecord = proteinListItem.protein_SubItem_Records_Map_Key_projectSearchId.get(projectSearchId);
                if (proteinItemRecord) {
                    num = proteinItemRecord.uniquePeptideCount;
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
        const singleProteinRowClickHandler_Params : ProteinViewPage_Display__singleProteinRow_ClickHandler_Params = {
            dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params : params,
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
