/**
 * proteinViewPage_DisplayData_ProteinList__Create_ProteinList_DataTable_RootTableDataObject.ts
 * 
 * Create DataTable_RootTableDataObject for Protein List for Single Search, Sub Groups, and Multiple Searches
 */


import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataGroupRowEntry,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableDataObject_Both_ColumnArrays
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import {ProteinGrouping_CentralStateManagerObjectClass} from '../../protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {
    get_ProteinList_ProteinDescription_ExternalReactComponent,
    get_ProteinList_ProteinName_ExternalReactComponent
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__ProteinName_ProteinDescription_DataTable_Component";
import {ProteinNameDescriptionCacheEntry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped";
import {
    get_proteinViewPage_DisplayData__SearchSubGroup_NSAF_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_NSAF_Header_Tooltip_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_SequenceCoverage_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_SequenceCoverage_Header_Tooltip_DataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/jsx/proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_And_Tooltip_DataTable_Component";
import {
    get_proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Tooltip_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_PeptideUnique_Count_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_PeptideUnique_Count_Header_Tooltip_DataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/protein_page__protein_list__single_search_code/datatable_components/proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Text_And_Tooltip_DataTable_Component";
import {
    ProteinDataDisplay_ProteinList_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList
} from './proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes';
import {ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject";
import {proteinView_nsaf_formatNumber_ForDisplayInTable} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_nsaf_formatNumber_ForDisplayInTable";

const _TEXT_text_Optional_After_CurrentlyShowing_X_Of_Y__Proteins = "Proteins";
const _TEXT_text_Optional_After_CurrentlyShowing_X_Of_Y__ProteinGroups = "Protein Groups";

//  Strings used in the download of the table
const _FALSE__DOWNLOAD_STRING = "false";
const _TRUE__DOWNLOAD_STRING = "true";

///   Callback when row in protein list table is clicked

/**
 *
 */
export class ProteinViewPage_Display__singleProteinRow_ClickHandler_Params {
    proteinSequenceVersionId: number
    dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params: DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params
}

/**
 *
 */
export type ProteinViewPage_Display__singleProteinRow_ClickHandler = (params : ProteinViewPage_Display__singleProteinRow_ClickHandler_Params ) => void

/**
 * Create tableObject object  for DataTable
 */
export const proteinViewPage_renderToPageProteinList__Create_DataTable_RootTableDataObject = function(
    {
        singleProteinRowClickHandler_Callback,
        proteinDisplayData,
        proteinGrouping_CentralStateManagerObjectClass,
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject,
        searchSubGroupIds,
        projectSearchIds,
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, dataPageStateManager_DataFrom_Server
    } : {
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display__singleProteinRow_ClickHandler
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
        searchSubGroupIds : Array<number>  //  undefined or null when not applicable
        projectSearchIds : Array<number>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        dataPageStateManager_DataFrom_Server : DataPageStateManager

    }) : DataTable_RootTableDataObject {

    // the columns for the data being shown on the page
    const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getProteinDataTableColumns( {
        projectSearchIds, searchSubGroupIds, dataPageStateManager_DataFrom_Server, proteinGrouping_CentralStateManagerObjectClass,
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } );

    let dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = undefined;
    let dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = undefined;
    let text_Optional_After_CurrentlyShowing_X_Of_Y: string

    if ( ! proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

        text_Optional_After_CurrentlyShowing_X_Of_Y = _TEXT_text_Optional_After_CurrentlyShowing_X_Of_Y__ProteinGroups;

        //  YES Proteins ARE Grouped

        dataTable_DataGroupRowEntries = _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups({
            proteinDisplayData,
            projectSearchIds,
            searchSubGroupIds,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
            singleProteinRowClickHandler_Callback,
            proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
        });

    } else {

        //  Proteins are NOT Grouped

        text_Optional_After_CurrentlyShowing_X_Of_Y = _TEXT_text_Optional_After_CurrentlyShowing_X_Of_Y__Proteins;

        const greyOutRow = false;  //  Not pass for not grouped

        dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({
            groupNumber: undefined, greyOutRow, isSubsetGroup: undefined,
            proteinList: proteinDisplayData.proteinList,
            projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback,
            proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
        });
    }

    const tableObject = new DataTable_RootTableDataObject({
        columns: dataTable_RootTableDataObject_Both_ColumnArrays.columns,
        columns_tableDownload: dataTable_RootTableDataObject_Both_ColumnArrays.columns_tableDownload,
        dataTable_DataRowEntries,
        dataTable_DataGroupRowEntries,
        text_Optional_After_CurrentlyShowing_X_Of_Y
    });

    return tableObject;
}


/**
 * Create Table Columns
 */
const _getProteinDataTableColumns = function(
    {
        projectSearchIds, searchSubGroupIds, dataPageStateManager_DataFrom_Server, proteinGrouping_CentralStateManagerObjectClass,
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } : {
        projectSearchIds : Array<number>
        searchSubGroupIds : Array<number>  //  undefined or null when not applicable
        dataPageStateManager_DataFrom_Server : DataPageStateManager
        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject

    } ) : DataTable_RootTableDataObject_Both_ColumnArrays {

    //  For getting search info for projectSearchIds
    const searchData_SearchName_Etc_Root = dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root();

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

    if ( ( ! searchSubGroupIds ) ) {

        //  NO Sub Group Ids so display Sequence Coverage

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_SequenceCoverage_Selected() ) {

            for ( const projectSearchId of projectSearchIds ) {

                let displayName = 'Sequence Coverage';

                if ( projectSearchIds.length > 1 ) {

                    const searchNameObject = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
                    if ( ! searchNameObject ) {
                        throw Error("No searchNameObject from searchData_SearchName_Etc_Root for projectSearchId: " + projectSearchId );
                    }

                    displayName += ' (' + searchNameObject.searchLabel__SearchShortName_OR_SearchId + ")";
                }

                const column = new DataTable_Column({
                    id :           'protSeqCov_' + projectSearchId,
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
    }

    if ( projectSearchIds.length === 1 && searchSubGroupIds ) {

        //  Only 1 search  AND Sub Groups

        //  YES Sub Groups so display Sub Group data

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_SequenceCoverage_Selected() ) {

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

                const displayName = get_proteinViewPage_DisplayData__SearchSubGroup_SequenceCoverage_Header_Text_DataTable_Component({ searchSubGroup });

                const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => {

                    return get_proteinViewPage_DisplayData__SearchSubGroup_SequenceCoverage_Header_Tooltip_DataTable_Component({ searchSubGroup });
                }

                const column = new DataTable_Column({
                    id :           'protSeqCov_' + searchSubGroupId,
                    displayName,
                    width :        150,
                    sortable : true,

                    columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,

                    showHorizontalGraph: true,
                    graphMaxValue: 1,
                    graphWidth: 50,
                });

                columns.push( column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
        }
    }

    if ( projectSearchIds.length === 1 && ( ! searchSubGroupIds ) ) {

        //  Only 1 search and NOT Sub Groups

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_PsmCount_Selected() ) {

            // PSM count overall

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

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_Selected() ) {

            // NSAF overall

            const displayName = 'NSAF';

            const column = new DataTable_Column({
                id :           'nsaf',
                displayName,
                width :        80,
                sortable : true,
                onlyShow_ValueDisplay_FirstRowOfGroup: false
            });

            columns.push( column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected() ) {

            //  Generated Reported Peptides count overall

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

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() ) {

            //  Generated Reported Peptides Unique count overall

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

    if ( projectSearchIds.length === 1 && searchSubGroupIds ) {

        //  Only 1 search  AND Sub Groups

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

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_PsmCount_Selected() ) {

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
        }

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_Selected() ) {

            for ( const searchSubGroupId of searchSubGroupIds ) {

                const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroupId );
                if ( ! searchSubGroup ) {
                    throw Error("getProteinDataTableColumns_SingleSearch__SearchSubGroup: searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroupId ); return nothing for searchSubGroupId: " + searchSubGroupId
                        + ", projectSearchId: " + projectSearchId );
                }

                const displayName = get_proteinViewPage_DisplayData__SearchSubGroup_NSAF_Header_Text_DataTable_Component({ searchSubGroup });

                const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => {

                    return get_proteinViewPage_DisplayData__SearchSubGroup_NSAF_Header_Tooltip_DataTable_Component({ searchSubGroup });
                }

                const column = new DataTable_Column({
                    id :           'nsaf_' + searchSubGroupId,
                    displayName,
                    columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,
                    width :        80,
                    sortable : true,
                    onlyShow_ValueDisplay_FirstRowOfGroup: false
                });

                columns.push( column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
        }

        for ( const searchSubGroupId of searchSubGroupIds ) {

            const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroupId );
            if ( ! searchSubGroup ) {
                throw Error("getProteinDataTableColumns_SingleSearch__SearchSubGroup: searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroupId ); return nothing for searchSubGroupId: " + searchSubGroupId
                    + ", projectSearchId: " + projectSearchId );
            }

            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected() ) {

                //  Reported Peptides Count

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

            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() ) {

                //  Reported Peptides Unique Count

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

    if ( projectSearchIds.length > 1 ) {

        //  NOT Single Search.  Display data for Each Search

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_PsmCount_Selected() ) {

            //  PSM Counts

            for ( const projectSearchId of projectSearchIds ) {

                const searchNameObject = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
                if ( ! searchNameObject ) {
                    throw Error("No searchNameObject from searchData_SearchName_Etc_Root for projectSearchId: " + projectSearchId );
                }

                const displayName = 'PSMs (' + searchNameObject.searchLabel__SearchShortName_OR_SearchId + ")";

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

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_Selected() ) {

            //  NSAF

            for ( const projectSearchId of projectSearchIds ) {

                const searchNameObject = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
                if ( ! searchNameObject ) {
                    throw Error("No searchNameObject from searchData_SearchName_Etc_Root for projectSearchId: " + projectSearchId );
                }

                const displayName = 'NSAF (' + searchNameObject.searchLabel__SearchShortName_OR_SearchId + ")";

                const column = new DataTable_Column({
                    id :           'nsaf_' + projectSearchId,
                    displayName,
                    width :        80,
                    sortable : true,
                    onlyShow_ValueDisplay_FirstRowOfGroup: false
                });

                columns.push( column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
        }

		//  Distinct Peptide and Unique Distinct Peptide Counts

        for ( const projectSearchId of projectSearchIds ) {

            const searchNameObject = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
            if ( ! searchNameObject ) {
                throw Error("No searchNameObject from searchData_SearchName_Etc_Root for projectSearchId: " + projectSearchId );
            }

            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected() ) {

                //  Reported Peptides count

                const displayName = 'Distinct Peptides (' + searchNameObject.searchLabel__SearchShortName_OR_SearchId + ")";

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

            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() ) {

                //  Reported Peptides Unique count

                const displayName = 'Unique Peptides (' + searchNameObject.searchLabel__SearchShortName_OR_SearchId + ")";

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
        proteinDisplayData, projectSearchIds, searchSubGroupIds,
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback,
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } : {

        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        projectSearchIds  : Array<number>
        searchSubGroupIds : Array<number>  //  undefined or null when not applicable
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display__singleProteinRow_ClickHandler
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject

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
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback,
            proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
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
        groupNumber, greyOutRow, isSubsetGroup, proteinList, projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback,
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } : {
        groupNumber: number
        greyOutRow : boolean  //  Set greyOutRow on all rows
        isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
        proteinList : Array<ProteinDataDisplay_ProteinList_Item>
        projectSearchIds : Array<number>
        searchSubGroupIds : Array<number>  //  undefined or null when not applicable
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display__singleProteinRow_ClickHandler
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject

    }) : Array<DataTable_DataRowEntry> {

    const dataTable_DataRowEntries = _createProteinList_ForDataTable( {
        groupNumber, greyOutRow, isSubsetGroup, proteinList, projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback,
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } );

    return dataTable_DataRowEntries;
}

/**
 *
 */
const _createProteinList_ForDataTable = function(
    {
        groupNumber, greyOutRow, isSubsetGroup, proteinList, projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback, proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } : {
        groupNumber: number
        greyOutRow : boolean  //  Set greyOutRow on all rows
        isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
        proteinList : Array<ProteinDataDisplay_ProteinList_Item>
        projectSearchIds : Array<number>
        searchSubGroupIds : Array<number>  //  undefined or null when not applicable
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        singleProteinRowClickHandler_Callback : ProteinViewPage_Display__singleProteinRow_ClickHandler
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject

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
                groupNumber, greyOutRow, isSubsetGroup, proteinListItem, arrayIndex : index, projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip, singleProteinRowClickHandler_Callback,
                proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
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
        groupNumber, greyOutRow, isSubsetGroup, proteinListItem, arrayIndex, projectSearchIds, searchSubGroupIds, proteinNameDescriptionForToolip, singleProteinRowClickHandler_Callback,
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
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
    proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject

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


    if ( ( ! searchSubGroupIds ) ) {

        //   NO Sub Groups so display Sequence Coverage

        //  WAS  if ( projectSearchIds.length === 1 && ( ! searchSubGroupIds ) ) {

            //  Only 1 search and NO Sub Groups so display Sequence Coverage

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_SequenceCoverage_Selected() ) {

            // Per Search:  proteinCoverageRatioDisplay

            for ( const projectSearchId of projectSearchIds ) {

                let proteinCoverageRatio = 0;  // default to zero if no entry
                let proteinCoverageRatioDisplay = "0";  // default to zero if no entry

                const proteinItemRecord = proteinListItem.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId );
                if ( proteinItemRecord ) {
                    proteinCoverageRatio = proteinItemRecord.proteinCoverageRatio;
                    proteinCoverageRatioDisplay = proteinItemRecord.proteinCoverageRatioDisplay;
                }

                const valueDisplay = proteinCoverageRatioDisplay;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : proteinCoverageRatio
                })
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
        }
    }

    if ( projectSearchIds.length === 1 && searchSubGroupIds ) {

        //  Sequence Coverage Per Search Sub Group

        //  Only 1 search  AND Sub Groups

        //  YES Sub Groups so display Sub Group data

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_SequenceCoverage_Selected() ) {

            for ( const searchSubGroupId of searchSubGroupIds ) {

                let proteinCoverageRatio = 0;  // default to zero if no entry
                let proteinCoverageRatioDisplay = "0";  // default to zero if no entry

                const protein_SubItem_Record = proteinListItem.protein_SubItem_Records_Map_Key_SubGroup_Id.get( searchSubGroupId )
                if ( protein_SubItem_Record ) {
                    if ( protein_SubItem_Record.proteinCoverageRatio === undefined || protein_SubItem_Record.proteinCoverageRatio === null ) {
                        const msg = "( protein_SubItem_Record.proteinCoverageRatio === undefined || protein_SubItem_Record.proteinCoverageRatio === null ). //  YES Sub Groups so display Sub Group data. true get_SequenceCoverage_Selected.  ";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    proteinCoverageRatio = protein_SubItem_Record.proteinCoverageRatio;
                    proteinCoverageRatioDisplay = protein_SubItem_Record.proteinCoverageRatioDisplay;
                }

                const valueDisplay = proteinCoverageRatioDisplay;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : proteinCoverageRatio
                })
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
        }
    }

    if ( projectSearchIds.length === 1 && ( ! searchSubGroupIds ) ) {

        //  Only 1 search and NOT Sub Groups

        const projectSearchId = projectSearchIds[0];

        const protein_SubItem_Record__For__projectSearchId = proteinListItem.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId );

        //  Num PSMs, NSAF, Distinct Peptides, and Distinct Peptides Unique

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_PsmCount_Selected() ) {

            //  Num PSMs

            let psmCount = 0;

            if ( protein_SubItem_Record__For__projectSearchId ) {
                psmCount = protein_SubItem_Record__For__projectSearchId.numPsms;
            }

            const valueDisplay = psmCount.toLocaleString();
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : psmCount
            })
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_Selected() ) {

            //  NSAF

            let nsaf = 0;

            if ( protein_SubItem_Record__For__projectSearchId ) {
                nsaf = protein_SubItem_Record__For__projectSearchId.nsaf;
            }

            const nsafString = proteinView_nsaf_formatNumber_ForDisplayInTable( nsaf );

            const valueDisplay = nsafString;
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : nsaf
            })
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected() ) {

            // Num Reported Peptides

            let peptideCount = 0;
            {
                if ( protein_SubItem_Record__For__projectSearchId ) {
                    peptideCount = protein_SubItem_Record__For__projectSearchId.peptideCount;
                }
            }

            const valueDisplay = peptideCount.toLocaleString();
            const searchEntriesForColumn: Array<string> = [valueDisplay]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({searchEntriesForColumn})
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort: peptideCount
            })
            columnEntries.push(columnEntry);

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({cell_ColumnData_String: valueDisplay})
            dataColumns_tableDownload.push(dataTable_DataRowEntry_DownloadTable_SingleColumn);
        }

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() ) {

            // Reported Peptides Unique

            let uniquePeptideCount = 0;
            {
                if ( protein_SubItem_Record__For__projectSearchId ) {
                    uniquePeptideCount = protein_SubItem_Record__For__projectSearchId.uniquePeptideCount;
                }
            }

            const valueDisplay = uniquePeptideCount.toLocaleString();
            const searchEntriesForColumn: Array<string> = [valueDisplay]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({searchEntriesForColumn})
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort: uniquePeptideCount
            })
            columnEntries.push(columnEntry);

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({cell_ColumnData_String: valueDisplay})
            dataColumns_tableDownload.push(dataTable_DataRowEntry_DownloadTable_SingleColumn);
        }
    }

    if ( projectSearchIds.length === 1 && searchSubGroupIds ) {

        //  Only 1 search AND Sub Groups

        //  YES Sub Groups so display Sub Group data

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_PsmCount_Selected() ) {

            // numPsms per search sub group

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

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_Selected() ) {

            //  NSAF per search sub group

            for ( const searchSubGroupId of searchSubGroupIds ) {

                let nsaf = 0;  // default to zero if no entry

                const protein_SubItem_Record = proteinListItem.protein_SubItem_Records_Map_Key_SubGroup_Id.get( searchSubGroupId )
                if ( protein_SubItem_Record ) {
                    nsaf = protein_SubItem_Record.nsaf;
                }

                const nsafString = proteinView_nsaf_formatNumber_ForDisplayInTable( nsaf );

                const valueDisplay = nsafString;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : nsaf
                })
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
        }

        // Num Reported Peptides and Num Reported Peptides Unique per search sub group

        for (const searchSubGroupId of searchSubGroupIds) {

            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected() ) {

                // Num Distinct Peptides for search sub group

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


            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() ) {

                // Num Unique Distinct Peptides for search sub group

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

    if ( projectSearchIds.length > 1 ) {

        //  More than 1 Search

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_PsmCount_Selected() ) {

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
        }

        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_Selected() ) {

            //  NSAF per search sub group

            for ( const projectSearchId of projectSearchIds ) {

                let nsaf = 0;  // default to zero if no entry

                const proteinItemRecord = proteinListItem.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId );
                if ( proteinItemRecord ) {
                    nsaf = proteinItemRecord.nsaf;
                }

                const nsafString = proteinView_nsaf_formatNumber_ForDisplayInTable( nsaf );

                const valueDisplay = nsafString;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : nsaf
                })
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
        }

         //  Per Search: Num Distinct Peptides and Distinct Peptides Unique

        for ( const projectSearchId of projectSearchIds ) {

            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected() ) {

                // Num Distinct Peptides for search

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

            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() ) {
                // Num Distinct Peptides Unique for search

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
