/**
 * proteinExperimentPage_DisplayData_ProteinList__Create_ProteinList_DataTable_RootTableDataObject.ts
 *
 * Create DataTable_RootTableDataObject for Protein List for Experiment
 */


import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataGroupRowEntry,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
    DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
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

import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {
    get_ProteinName_ProteinDescription_Tooltip_Contents
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__ProteinName_ProteinDescription_DataTable_Component";
import {ProteinNameDescriptionCacheEntry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped";
import {
    ProteinDataDisplay_ProteinList_Experiment_SubData_PerCondition,
    ProteinDataDisplay_ProteinList_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group";
import {ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject";
import {proteinView_nsaf_formatNumber_ForDisplayInTable} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_nsaf_formatNumber_ForDisplayInTable";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    proteinView_Adjusted_Spectral_Count_ABACUS_formatNumber_ForDisplayInTable
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_Adjusted_Spectral_Count_ABACUS_formatNumber_ForDisplayInTable";
import {
    proteinView__ProteinList_ColumnHeader__Tooltip_Text
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/jsx/proteinView__ProteinList_ColumnHeader__Tooltip_Text";

//  Strings used in the download of the table
const _FALSE__DOWNLOAD_STRING = "false";
const _TRUE__DOWNLOAD_STRING = "true";

///   Callback when row in protein list table is clicked

export class ProteinExperimentPage_Display__singleProteinRow_ClickHandler_Params {
    proteinSequenceVersionId: number
    dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params: DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params
}

export type ProteinExperimentPage_Display__singleProteinRow_ClickHandler = (params : ProteinExperimentPage_Display__singleProteinRow_ClickHandler_Params ) => void


/**
 * Create tableObject object  for DataTable
 */
export const proteinExperimentPage_renderToPageProteinList__Create_DataTable_RootTableDataObject = async function(
    {
        singleProteinRowClickHandler_Callback,
        proteinDisplayData,
        projectSearchIds,
        proteinGrouping_CentralStateManagerObjectClass,
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject,
        conditions_with_their_project_search_ids_for_First_condition_group,
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
        dataPageStateManager_DataFrom_Server,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    } : {
        singleProteinRowClickHandler_Callback : ProteinExperimentPage_Display__singleProteinRow_ClickHandler
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        projectSearchIds: Array<number>
        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        dataPageStateManager_DataFrom_Server : DataPageStateManager
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }) : Promise<DataTable_RootTableDataObject> {
    try {
        if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_SequenceCoverage_Selected() ) {

            //  User has selected Display Sequence Coverage so compute it (and will be cached on proteinList sub objects)
            await _add_SequenceCoverage_To__experiment_SubData_PerCondition_Map_Key_ConditionId_Entry__AllOf_ProteinList({
                proteinList: proteinDisplayData.proteinList,
                projectSearchIds,
                conditions_with_their_project_search_ids_for_First_condition_group,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            })
        }

        // the columns for the data being shown on the page
        const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = _getProteinDataTableColumns( {
            conditions_with_their_project_search_ids_for_First_condition_group, dataPageStateManager_DataFrom_Server, proteinGrouping_CentralStateManagerObjectClass,
            proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
        } );

        let dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = undefined;
        let dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = undefined;

        if ( ! proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

            //  YES Proteins ARE Grouped

            dataTable_DataGroupRowEntries = _renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups({
                proteinGrouping_CentralStateManagerObjectClass,
                proteinDisplayData,
                conditions_with_their_project_search_ids_for_First_condition_group,
                proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
                singleProteinRowClickHandler_Callback,
                proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
            });

        } else {

            //  Proteins are NOT Grouped

            const greyOutRow = false;  //  Not pass for not grouped

            dataTable_DataRowEntries = _renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({
                groupNumber: undefined, greyOutRow, isSubsetGroup: undefined,
                proteinList: proteinDisplayData.proteinList,
                conditions_with_their_project_search_ids_for_First_condition_group, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
                singleProteinRowClickHandler_Callback, proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
            });
        }

        const tableObject = new DataTable_RootTableDataObject({
            columns: dataTable_RootTableDataObject_Both_ColumnArrays.columns,
            columns_tableDownload: dataTable_RootTableDataObject_Both_ColumnArrays.columns_tableDownload,
            dataTable_DataRowEntries,
            dataTable_DataGroupRowEntries
        });

        return tableObject;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

/**
 * Create Table Columns
 */
const _getProteinDataTableColumns = function(
    {
        conditions_with_their_project_search_ids_for_First_condition_group, dataPageStateManager_DataFrom_Server, proteinGrouping_CentralStateManagerObjectClass,
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } : {
        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        dataPageStateManager_DataFrom_Server : DataPageStateManager
        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject

    } ) : DataTable_RootTableDataObject_Both_ColumnArrays {

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

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_SequenceCoverage_Selected() ) {

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            const displayName = 'Sequence Coverage (' + condition.label + ")";

            const column = new DataTable_Column({
                id :           'protSeqCov_' + condition.id,
                displayName,
                width :        150,
                sortable : true,
                columnHeader_Tooltip_HTML_TitleAttribute: proteinView__ProteinList_ColumnHeader__Tooltip_Text.Sequence_Coverage,

                showHorizontalGraph: true,
                graphMaxValue: 1,
                graphWidth: 50,
            });

            columns.push( column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
    }

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_PsmCount_Selected() ) {

        //  PSM Counts

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            const displayName = 'PSMs (' + condition.label + ")";

            const column = new DataTable_Column({
                id :           'psms_' + condition.id,
                displayName,
                width :        80,
                sortable : true,
                columnHeader_Tooltip_HTML_TitleAttribute: proteinView__ProteinList_ColumnHeader__Tooltip_Text.PSM_Count,
                onlyShow_ValueDisplay_FirstRowOfGroup: true
            });

            columns.push( column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
    }

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_Selected() ) {

        //  NSAF

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            const displayName = 'NSAF (' + condition.label + ")";

            const column = new DataTable_Column({
                id :           'nsaf_' + condition.id,
                displayName,
                width :        80,
                sortable : true,
                columnHeader_Tooltip_HTML_TitleAttribute: proteinView__ProteinList_ColumnHeader__Tooltip_Text.NSAF,
                onlyShow_ValueDisplay_FirstRowOfGroup: false
            });

            columns.push( column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
    }

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_Adjusted_Spectral_Count_ABACUS_Selected() ) {

        //  Adjusted_Spectral_Count_ABACUS_

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            const displayName = 'Adjusted Spectral Count (ABACUS)  (' + condition.label + ")";

            const column = new DataTable_Column({
                id :           'Adjusted_Spectral_Count_ABACUS__' + condition.id,
                displayName,
                width :        80,
                sortable : true,
                columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element: proteinView__ProteinList_ColumnHeader__Tooltip_Text.Adjusted_Spectral_Count__ABACUS__ReturnComponent,
                onlyShow_ValueDisplay_FirstRowOfGroup: true
            });

            columns.push( column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
    }

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_USING__Adjusted_Spectral_Count_ABACUS_Selected() ) {

        //  NSAF: Adjusted_Spectral_Count_ABACUS_

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            const displayName = 'NSAF: Adjusted Spectral Count (ABACUS)  (' + condition.label + ")";

            const column = new DataTable_Column({
                id :           'NSAF_Adjusted_Spectral_Count_ABACUS__' + condition.id,
                displayName,
                width :        80,
                sortable : true,
                columnHeader_Tooltip_HTML_TitleAttribute: proteinView__ProteinList_ColumnHeader__Tooltip_Text.NSAF_Using_Adjusted_Spectral_Count__ABACUS,
                onlyShow_ValueDisplay_FirstRowOfGroup: false
            });

            columns.push( column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
    }

    //  Distinct Peptide and Unique Distinct Peptide Counts

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected()
        || proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() ) {

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected() ) {
                //  Reported Peptides count

                const displayName = 'Distinct Peptides (' + condition.label + ")";

                const column = new DataTable_Column({
                    id: 'peptides_' + condition.id,
                    displayName,
                    width: 80,
                    sortable: true,
                    columnHeader_Tooltip_HTML_TitleAttribute: proteinView__ProteinList_ColumnHeader__Tooltip_Text.Distinct_Peptide_Count,
                    onlyShow_ValueDisplay_FirstRowOfGroup: true
                });

                columns.push(column);

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({cell_ColumnHeader_String: displayName});
                dataTable_Column_DownloadTable_Entries.push(dataTable_Column_DownloadTable);
            }
            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() ) {
                //  Reported Peptides Unique count

                const displayName = 'Unique Peptides (' + condition.label + ")";

                const column = new DataTable_Column({
                    id: 'peptidesUnique_' + condition.id,
                    displayName,
                    width: 80,
                    sortable: true,
                    columnHeader_Tooltip_HTML_TitleAttribute: proteinView__ProteinList_ColumnHeader__Tooltip_Text.Unique_Peptide_Count,
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
        proteinGrouping_CentralStateManagerObjectClass, proteinDisplayData, conditions_with_their_project_search_ids_for_First_condition_group,
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, singleProteinRowClickHandler_Callback,
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } : {

        proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        singleProteinRowClickHandler_Callback : ProteinExperimentPage_Display__singleProteinRow_ClickHandler
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
            groupNumber, greyOutRow, isSubsetGroup, proteinList : groupedProteinItem.proteinList_Grouped, conditions_with_their_project_search_ids_for_First_condition_group,
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
        groupNumber, greyOutRow, isSubsetGroup, proteinList, conditions_with_their_project_search_ids_for_First_condition_group, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
        singleProteinRowClickHandler_Callback, proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } : {
        groupNumber: number
        greyOutRow : boolean  //  Set greyOutRow on all rows
        isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
        proteinList : Array<ProteinDataDisplay_ProteinList_Item>
        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        singleProteinRowClickHandler_Callback : ProteinExperimentPage_Display__singleProteinRow_ClickHandler
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject

    }) : Array<DataTable_DataRowEntry> {

    const dataTable_DataRowEntries = _createProteinList_ForDataTable( {
        groupNumber, greyOutRow, isSubsetGroup, proteinList, conditions_with_their_project_search_ids_for_First_condition_group, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
        singleProteinRowClickHandler_Callback, proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } );

    return dataTable_DataRowEntries;
}

/**
 *
 */
const _createProteinList_ForDataTable = function(
    {
        groupNumber, greyOutRow, isSubsetGroup, proteinList, conditions_with_their_project_search_ids_for_First_condition_group, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
        singleProteinRowClickHandler_Callback, proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } : {
        groupNumber: number
        greyOutRow : boolean  //  Set greyOutRow on all rows
        isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
        proteinList : Array<ProteinDataDisplay_ProteinList_Item>
        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
        singleProteinRowClickHandler_Callback : ProteinExperimentPage_Display__singleProteinRow_ClickHandler
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
                groupNumber, greyOutRow, isSubsetGroup, proteinListItem, arrayIndex : index, conditions_with_their_project_search_ids_for_First_condition_group, proteinNameDescriptionForToolip,
                singleProteinRowClickHandler_Callback, proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
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
        groupNumber, greyOutRow, isSubsetGroup, proteinListItem, arrayIndex, conditions_with_their_project_search_ids_for_First_condition_group, proteinNameDescriptionForToolip,
        singleProteinRowClickHandler_Callback, proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    } : {
        groupNumber: number
        greyOutRow : boolean  //  Set greyOutRow on all rows
        isSubsetGroup: boolean  //  On Download, Set isSubsetGroup flag
        proteinListItem : ProteinDataDisplay_ProteinList_Item
        arrayIndex : number
        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry>
        singleProteinRowClickHandler_Callback : ProteinExperimentPage_Display__singleProteinRow_ClickHandler
        proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject

    }) : DataTable_DataRowEntry {

    if ( ( ! proteinListItem.experiment_SubData ) || ( ! proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId )  ) {
        const msg = "( ( ! proteinListItem.experiment_SubData ) || ( ! proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId )  )";
        console.warn( msg );
        throw Error(msg);
    }

    //  Column entries for this data row in data table
    const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
    const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

    {  // proteinNames
        if ( ! proteinListItem.proteinNames ) {
            throw Error( "_createProteinItem_DataTableEntry(...): proteinListItem.proteinNames not populated: " + proteinListItem.proteinNames )
        }

        const tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
            ( params : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                return get_ProteinName_ProteinDescription_Tooltip_Contents({ proteinNameDescriptionForToolip })
            }

        const valueDisplay = proteinListItem.proteinNames;
        const searchEntriesForColumn : Array<string> = [ valueDisplay ];
        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn });
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            searchTableData,
            valueDisplay: proteinListItem.proteinNames,
            valueSort : proteinListItem.proteinNames,
            tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
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

        const tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
            ( params : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                return get_ProteinName_ProteinDescription_Tooltip_Contents({ proteinNameDescriptionForToolip })
            }

        const valueDisplay = proteinDescription;
        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
        const columnEntry = new DataTable_DataRow_ColumnEntry({
            searchTableData,
            valueDisplay,
            valueSort : proteinDescription,
            tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
        })
        columnEntries.push( columnEntry );

        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
    }

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_SequenceCoverage_Selected() ) {

        // Per Group:  proteinCoverageRatioDisplay

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            let proteinCoverageRatio = 0;  // default to zero if no entry
            let proteinCoverageRatioDisplay = "0";  // default to zero if no entry

            const proteinItemRecord = proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get( condition.id );
            if ( proteinItemRecord ) {

                const cachedData__ProteinCoverageData = proteinItemRecord.get_From_CachedData__ProteinCoverageData()
                if ( ! cachedData__ProteinCoverageData ) {
                    const msg = "proteinItemRecord.get_From_CachedData__ProteinCoverageData() returned nothing.  proteinItemRecord = proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get( condition.id );: condition.id: " + condition.id;
                    console.warn(msg)
                    throw Error(msg)
                }

                proteinCoverageRatio = cachedData__ProteinCoverageData.proteinCoverageRatio;
                proteinCoverageRatioDisplay = cachedData__ProteinCoverageData.proteinCoverageRatioDisplay;
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

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_PsmCount_Selected() ) {

        // Per group:  numPsms

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            let numPsms = 0;  // default to zero if no entry

            const proteinItemRecord = proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get( condition.id );
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

        // Per group:  NSAF

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            let nsaf = 0;  // default to zero if no entry

            const proteinItemRecord = proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get( condition.id );
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

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_Adjusted_Spectral_Count_ABACUS_Selected() ) {

        // Per group:  Adjusted_Spectral_Count_ABACUS

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            let valueNumer = 0;  // default to zero if no entry

            const proteinItemRecord = proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get( condition.id );
            if ( proteinItemRecord ) {
                valueNumer = proteinItemRecord.adjusted_Spectral_Count_ABACUS;
            }

            const valueString = proteinView_Adjusted_Spectral_Count_ABACUS_formatNumber_ForDisplayInTable( valueNumer );

            const valueDisplay = valueString;
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : valueNumer
            })
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }
    }

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_USING__Adjusted_Spectral_Count_ABACUS_Selected() ) {

        // Per group:  NSAF: Adjusted_Spectral_Count_ABACUS

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            let valueNumer = 0;  // default to zero if no entry

            const proteinItemRecord = proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get( condition.id );
            if ( proteinItemRecord ) {
                valueNumer = proteinItemRecord.nsaf__Using_Adjusted_Spectral_Count_ABACUS;
            }

            const valueString = proteinView_nsaf_formatNumber_ForDisplayInTable( valueNumer );

            const valueDisplay = valueString;
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : valueNumer
            })
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }
    }

    if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected()
        || proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() ) {

        //  Per group: Num Distinct Peptides and Distinct Peptides Unique

        for ( const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group ) {

            const condition = conditionsEntry.condition;

            if ( proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected() ) {

                // Num Distinct Peptides for group

                let num = 0;  // default to zero if no entry

                const proteinItemRecord = proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get(condition.id);
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

                // Num Distinct Peptides Unique for group

                let num = 0;  // default to zero if no entry

                const proteinItemRecord = proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get(condition.id);
                if (proteinItemRecord && proteinItemRecord.uniquePeptideCount) {
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
        const singleProteinRowClickHandler_Params : ProteinExperimentPage_Display__singleProteinRow_ClickHandler_Params = {
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

/**
 *
 * @param proteinList
 * @param projectSearchIds
 * @param conditions_with_their_project_search_ids_for_First_condition_group
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 * @private
 */
const _add_SequenceCoverage_To__experiment_SubData_PerCondition_Map_Key_ConditionId_Entry__AllOf_ProteinList = async function (
    {
        proteinList,
        projectSearchIds,
        conditions_with_their_project_search_ids_for_First_condition_group,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        proteinList: Array<ProteinDataDisplay_ProteinList_Item>
        projectSearchIds: Array<number>
        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) {
    try {
        const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder> =
            await _get_proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId({
                projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            })


        for (const proteinListItem of proteinList) {

            for (const conditionsEntry of conditions_with_their_project_search_ids_for_First_condition_group) {

                const condition = conditionsEntry.condition;

                const experiment_SubData_PerCondition_Map_Key_ConditionId_Entry = proteinListItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get(condition.id);
                if (experiment_SubData_PerCondition_Map_Key_ConditionId_Entry) {

                    _add_SequenceCoverage_To__experiment_SubData_PerCondition_Map_Key_ConditionId_Entry({
                        experiment_SubData_PerCondition_Map_Key_ConditionId_Entry, proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                    })

                }

            }
        }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}


/**
 * Compute Sequence coverage and add to experiment_SubData_PerCondition_Map_Key_ConditionId_Entry
 */
const _add_SequenceCoverage_To__experiment_SubData_PerCondition_Map_Key_ConditionId_Entry = function(
    {
        experiment_SubData_PerCondition_Map_Key_ConditionId_Entry, proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId
    } : {
        experiment_SubData_PerCondition_Map_Key_ConditionId_Entry: ProteinDataDisplay_ProteinList_Experiment_SubData_PerCondition
        proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder>
    }
) : {
    proteinCoverageRatio: number
    proteinCoverageRatioDisplay : string
} {

    {
        const cached_ProteinCoverageData = experiment_SubData_PerCondition_Map_Key_ConditionId_Entry.get_From_CachedData__ProteinCoverageData()
        if ( cached_ProteinCoverageData ) {
            //  Already computed so return it
            return {  //  EARLY RETURN
                proteinCoverageRatio: cached_ProteinCoverageData.proteinCoverageRatio,
                proteinCoverageRatioDisplay: cached_ProteinCoverageData.proteinCoverageRatioDisplay
            }
        }
    }

    let proteinLength: number = undefined;

    const proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches : Array<boolean> = [];

    for ( const protein_SubItem_For_ProjectSearchId of experiment_SubData_PerCondition_Map_Key_ConditionId_Entry.protein_SubItem_Record_Map_Key_ProjectSearchId.values() ) {

        const proteinSequenceVersionId = protein_SubItem_For_ProjectSearchId.proteinSequenceVersionId
        const projectSearchId = protein_SubItem_For_ProjectSearchId.projectSearchId

        const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder =
            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
        if ( ! proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder ) {
            //  No data for projectSearchId so skip
            continue; // EARLY CONTINUE
        }

        const proteinSequenceCoverageData_For_ProteinSequenceVersionId =
            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder.get_ProteinSequenceCoverageData_For_ProteinSequenceVersionId(proteinSequenceVersionId);
        if ( ! proteinSequenceCoverageData_For_ProteinSequenceVersionId ) {
            //  No data for proteinSequenceVersionId so skip
            continue; // EARLY CONTINUE
        }

        const reportedPeptideIds_For_Protein = new Set<number>();

        if ( protein_SubItem_For_ProjectSearchId.reportedPeptideIds_AndTheirPsmIds && protein_SubItem_For_ProjectSearchId.reportedPeptideIds_AndTheirPsmIds.size > 0 ) {
            for ( const reportedPeptideId of protein_SubItem_For_ProjectSearchId.reportedPeptideIds_AndTheirPsmIds.keys() ) {
                reportedPeptideIds_For_Protein.add( reportedPeptideId );
            }
        }
        if ( protein_SubItem_For_ProjectSearchId.reportedPeptideIds_NoPsmFilters && protein_SubItem_For_ProjectSearchId.reportedPeptideIds_NoPsmFilters.size > 0 ) {
            for ( const reportedPeptideId of protein_SubItem_For_ProjectSearchId.reportedPeptideIds_NoPsmFilters ) {
                reportedPeptideIds_For_Protein.add( reportedPeptideId );
            }
        }

        proteinLength = proteinSequenceCoverageData_For_ProteinSequenceVersionId.getProteinLength();

        const proteinCoverage_BooleanArrayOfProteinCoverage = proteinSequenceCoverageData_For_ProteinSequenceVersionId.getBooleanArrayOfProteinCoverage_FilteringOnReportedPeptideIds({ reportedPeptideIds_For_Protein });

        //  Copy ProteinCoverage for Search to ProteinCoverage for All

        const proteinCoverage_BooleanArrayOfProteinCoverage_Length = proteinCoverage_BooleanArrayOfProteinCoverage.length;
        for ( let index = 0; index < proteinCoverage_BooleanArrayOfProteinCoverage_Length; index++ ) {
            if ( proteinCoverage_BooleanArrayOfProteinCoverage[ index ] ) {
                proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches[ index ] = true;
            }
        }
    }

    ///  Compute proteinCoverageRatio for Condition

    let proteinCoverageRatio: number = undefined;
    let proteinCoverageRatioDisplay: string = undefined

    if ( proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches.length === 0 ) {
        //  No Coverage entries

        proteinCoverageRatio = 0;
        proteinCoverageRatioDisplay = "0";

    } else {

        let proteinCoverage_Count = 0;

        const proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches_Length = proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches.length;
        for ( let index = 0; index < proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches_Length; index++ ) {
            if (proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches[index]) {
                proteinCoverage_Count++;
            }
        }

        proteinCoverageRatio = proteinCoverage_Count / proteinLength;

        proteinCoverageRatioDisplay = proteinCoverageRatio.toFixed(3);;
    }

    experiment_SubData_PerCondition_Map_Key_ConditionId_Entry.save_To_CachedData__ProteinCoverageData({ proteinCoverageRatio, proteinCoverageRatioDisplay })
}


/**
 * Get CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder for the projectSearchIds
 * @private
 */
const _get_proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId = function(
    {
        projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchIds: Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : Promise<Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder>> {

    const promises: Array<Promise<void>> = [];

    const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder> = new Map()

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); return nothing for projectSearchId: " + projectSearchId;
            console.warn(msg)
            throw Error(msg)
        }

        const get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters().
            get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch()
        if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data ) {
            get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                projectSearchId,
                get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
            );

        } else if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise ) {

            const promise = new Promise<void>( (resolve, reject) => {

                get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.catch(reason => {
                    reject(reason)
                });
                get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.then( value => {
                    try {
                        proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                            projectSearchId,
                            value.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
                        );
                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
            });
            promises.push(promise);

        } else {
            const msg = "get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result  'data' and 'promise' are both not populated for projectSearchId: " + projectSearchId;
            console.warn(msg)
            throw Error(msg)
        }
    }

    if ( promises.length === 0 ) {

        //  Data all loaded

        return Promise.resolve(proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId);  //  EARLY RETURN
    }

///  Have to wait for data to load

    const promisesAll = Promise.all(promises);

    return new Promise<Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder>>((resolve, reject) => {
        try {
            promisesAll.catch(reason => {
                reject(reason);
            })
            promisesAll.then(value => {
                try {
                    resolve(proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId);

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })
}
