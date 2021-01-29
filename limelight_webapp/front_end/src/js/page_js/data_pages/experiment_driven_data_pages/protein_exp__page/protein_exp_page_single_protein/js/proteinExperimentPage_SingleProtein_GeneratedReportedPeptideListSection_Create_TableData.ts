/**
 * proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.ts
 * 
 * Get Data Table from Peptide List
 * 
 * Create Root Table with Generated Peptide String, and PSM Counts per condition in first condition group
 * 
 */

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import {
    DataTable_RootTableObject,
    DataTable_TableOptions,
    DataTable_Column,
    DataTable_RootTableDataObject,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer, Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

import { Create_GeneratedReportedPeptideListData_Result, CreateReportedPeptideDisplayData_Result_Entry } from './proteinExperimentPage_SingleProtein_Create_GeneratedReportedPeptideListData';


//  Child Data Searches for Single Peptide show/hide


//  Used when > 1 Condition Group:  ...For_Last_ConditionGroup...



//  Used when only 1 Condition Group:  ...For_Last_ConditionGroup...

//  returns React Component to insert below current data row

import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {proteinExperimentPage_Display_SingleProtein_GeneratedReportedPeptideListSection_Components_Other} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/jsx/proteinExperimentPage_Display_SingleProtein_GeneratedReportedPeptideListSection_Components_Other";
import {Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer";
import {
    createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup,
    CreateReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter,
    GetDataTableDataObjects_All_But_Last_ConditionGroup_Result
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__entry_for_all_but_last_condition_group__per_condition_rows/js/generatedReportedPeptideList_For_All_But_Last_ConditionGroup_PerCondition_Rows_CreateListData";
import {
    createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup,
    CreateReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter,
    GetDataTableDataObjects_Result_Last_ConditionGroup
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__entry_for_last_condition_group__per_condition_rows/js/generatedReportedPeptideList_For_Last_ConditionGroup_PerCondition_Rows_CreateListData";


//////////////////

const dataTableId_ThisTable = "Single Protein Peptide List Root Table";







///////////////////

/**
 * Result from createReportedPeptideDisplayData call
 */
export class GetDataTableDataObjects_GeneratedReportedPeptideListSection_Result {
    dataTable_RootTableObject : DataTable_RootTableObject;
}

/**
 * Create Reported Peptide Data for Display
 * 
 * Reported Peptide List Data Table Root
 */
export const createReportedPeptideDisplayData_DataTableDataObjects_GeneratedReportedPeptideListSection = function( { 
    
    create_GeneratedReportedPeptideListData_Result, 
    
    conditionGroupsContainer,
    conditionGroupsDataContainer,

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
    proteinSequenceVersionId, 
    projectSearchIds,
    searchDataLookupParamsRoot,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder,
    dataPageStateManager
} : {
    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_Result,

    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    dataPageStateManager : DataPageStateManager

} ) : GetDataTableDataObjects_GeneratedReportedPeptideListSection_Result {

    const getDataTableDataObjects_Result = new GetDataTableDataObjects_GeneratedReportedPeptideListSection_Result();

    const peptideList : Array<CreateReportedPeptideDisplayData_Result_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList;

    if ( peptideList.length === 0 ) {
        //  No data found so return
        return getDataTableDataObjects_Result;  // EARLY RETURN
    }


    const first_conditionGroup = conditionGroupsContainer.conditionGroups[ 0 ];

    const first_conditionGroup_Conditions = first_conditionGroup.conditions;

    const projectSearchIds_By_conditionId :  Map<number,Set<number>> =
        Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer.
        getProjectSearchIds_For_First_ConditionGroup({ conditionGroupsContainer, conditionGroupsDataContainer });

    /////////////

    //  Create Table Columns (Header info and Data Info)

    const dataTable_Columns : Array<DataTable_Column> = [];

    {  // Generated Peptide sequence, including variable mods, etc
        const dataTable_Column = new DataTable_Column({
            id : "Sequence", // Used for tracking sort order. Keep short
            displayName : "Sequence",
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
            return proteinExperimentPage_Display_SingleProtein_GeneratedReportedPeptideListSection_Components_Other.uniqueColumnHeader_Tooltip_Create();
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

    //  PSM counts for each ...
    for ( const condition of first_conditionGroup_Conditions ) {
        
        const dataTable_Column = new DataTable_Column({
            id : "psmCount_" + condition.id, // Used for tracking sort order. Keep short
            displayName : "PSM Count (" + condition.label + ")",
            width : 70,
            sortable : true
        });
        dataTable_Columns.push( dataTable_Column );
    }

    //  Create Table Body

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        let peptideListCounter = 0;
        for ( const peptideEntry of peptideList ) {
            
            peptideListCounter++;

            const dataTable_DataRow_ColumnEntries : Array<DataTable_DataRow_ColumnEntry> = [];

            {
                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : peptideEntry.peptideSequenceDisplay,
                    valueSort : peptideEntry.peptideSequenceDisplay,
                    // tooltipText : 
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );
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

            //  Data for child tables

            for ( const condition of first_conditionGroup_Conditions ) {

                let psmCountAll = 0;

                const projectSearchIds = projectSearchIds_By_conditionId.get( condition.id );
                if ( projectSearchIds ) {
                    for ( const projectSearchId of projectSearchIds ) {
                        const psmCount = peptideEntry.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
                        if ( psmCount ) {
                            psmCountAll += psmCount;
                        }
                    }
                }

                const psmCountDisplay = psmCountAll.toLocaleString();

                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : psmCountDisplay,
                    valueSort : psmCountAll,
                    // tooltipText : 
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

                //  Data for child tables
                // if ( psmCount ) {
                //     projectSearchIds_ThatHavePsmCountsGtZero.push( projectSearchId );
                // }
            }

            //////////

            // Data for Child Tables for this row of this table

            const createReportedPeptideDisplayData_Result_Entry_ForThisRow : CreateReportedPeptideDisplayData_Result_Entry = (
                create_GeneratedReportedPeptideListData_Result.entries_Key_peptideSequenceDisplay.get( peptideEntry.peptideSequenceDisplay )
            );
            if ( ! createReportedPeptideDisplayData_Result_Entry_ForThisRow ) {
                throw Error("proteinExperimentPage_SingleProtein_ReportedPeptideListSection_CreateListData.ts: No value for peptideEntry.peptideSequenceDisplay: " + peptideEntry.peptideSequenceDisplay );
            }

            if ( conditionGroupsContainer.conditionGroups.length > 1 ) {

                //  > 1 Condition Group:  Children table uses ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter

                const conditionIds_ParentPath : Array<number> = (
                    [] // Empty since top level
                );
                
                const createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter = (
                    new CreateReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter({
                        
                        createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : createReportedPeptideDisplayData_Result_Entry_ForThisRow,
                        conditionIds_ParentPath,
                        
                        conditionGroupsContainer,
                        conditionGroupsDataContainer,

                        projectSearchIds,
                        reportedPeptideIdsMap_KeyProjectSearchId : peptideEntry.reportedPeptideIdsMap_KeyProjectSearchId,
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                        searchDataLookupParamsRoot,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder,
                        dataPageStateManager
                    })
                );

                const dataRow_GetChildTableData_Return_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : DataTable_RootTableObject => {

                        const getDataTableDataObjects_All_But_Last_ConditionGroup_Result : GetDataTableDataObjects_All_But_Last_ConditionGroup_Result =
                            createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup({ createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter });

                        return  getDataTableDataObjects_All_But_Last_ConditionGroup_Result.dataTable_RootTableObject;
                    }

                const dataTable_DataRowEntry = new DataTable_DataRowEntry( {
                    uniqueId : peptideEntry.peptideSequenceDisplay,
                    sortOrder_OnEquals : peptideListCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                    columnEntries : dataTable_DataRow_ColumnEntries,
                    dataRow_GetChildTableData_Return_DataTable_RootTableObject
                    // tableRowClickHandlerParameter : undefined,  //  Data passed to DataTable_TableOptions.dataRowClickHandler
                    // dataRow_GetChildTableDataParameter : undefined,   //  Data passed to DataTable_TableOptions.dataRow_GetChildTableData
                });

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );

            } else {

                //  Only 1 Condition Group:  Children table uses ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter

                const conditionIds_ParentPath : Array<number> = (
                    [] // Empty since top level
                );
                
                const createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter = (
                    new CreateReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter({
                        
                        createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : createReportedPeptideDisplayData_Result_Entry_ForThisRow,
                        conditionIds_ParentPath,
                        
                        conditionGroupsContainer,
                        conditionGroupsDataContainer,

                        projectSearchIds,
                        reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId : peptideEntry.reportedPeptideIdsMap_KeyProjectSearchId,
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                        searchDataLookupParamsRoot,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder,
                        dataPageStateManager
                    })
                );

                const dataRow_GetChildTableData_Return_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : DataTable_RootTableObject => {

                    const getDataTableDataObjects_Result_Last_ConditionGroup : GetDataTableDataObjects_Result_Last_ConditionGroup =
                        createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup({
                            createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter
                        })

                        return getDataTableDataObjects_Result_Last_ConditionGroup.dataTable_RootTableObject;
                }

                const dataTable_DataRowEntry = new DataTable_DataRowEntry( {
                    uniqueId : peptideEntry.peptideSequenceDisplay,
                    sortOrder_OnEquals : peptideListCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                    columnEntries : dataTable_DataRow_ColumnEntries,
                    dataRow_GetChildTableData_Return_DataTable_RootTableObject
                });

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );
            }

            //  dataTable_DataRowEntries added to inside 'if' and 'else' immediately above

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
