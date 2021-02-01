/**
 * generatedReportedPeptideList_For_Last_ConditionGroup_PerCondition_Rows_CreateListData.ts
 * 
 * Get Peptide List for Data Table - For Last Condition Group Shown (Which is the First Condition Group)
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
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

//  Child Data Searches for Single Peptide show/hide

import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    searchesForSinglePeptide_createChildTableObjects,
    SearchesForSinglePeptide_createChildTableObjects_Parameter
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__searches_for_condition_for_single_peptide/js/searchesForConditionForSinglePeptide_createChildTableObjects";
import {
    CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/js/proteinPage_Display_MultipleSearches_SingleProtein_Create_GeneratedReportedPeptideListData";


//////////////////

const dataTableId_ThisTable = "Single Protein Peptide List Last Condition Group Condition rows PSM Count List Table";



/**
 * Parameter to createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup
 */
export class CreateReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter {

    createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry //  Row in Top Level table that this is under (direct or indirect)

    //  Path of condition ids from Root Peptide List to current list being created. Empty array if at top group
    //    (This is how it is tracked the path of expanded rows and determine what is to be shown in the current table)
    conditionIds_ParentPath : Array<number>;

    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    projectSearchIds : Array<number>
    reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId : Map<number, Set<number>>
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

    /**
     *
     */
    constructor(
        {
            createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow,
            conditionIds_ParentPath,

            conditionGroupsContainer,
            conditionGroupsDataContainer,

            projectSearchIds,
            reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            searchDataLookupParamsRoot,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,
            dataPageStateManager
        } : {
            createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry;
            conditionIds_ParentPath : Array<number>; //  Empty array if at top group

            conditionGroupsContainer : Experiment_ConditionGroupsContainer
            conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

            projectSearchIds : Array<number>,
            reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId : Map<number, Set<number>>
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
            searchDataLookupParamsRoot : SearchDataLookupParameters_Root
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
            dataPageStateManager : DataPageStateManager
        }) {

        this.createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow = createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow;
        this.conditionIds_ParentPath = conditionIds_ParentPath;
        this.conditionGroupsContainer = conditionGroupsContainer;
        this.conditionGroupsDataContainer = conditionGroupsDataContainer;
        this.projectSearchIds = projectSearchIds;
        this.reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId = reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId;
        this.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        this.loadedDataCommonHolder = loadedDataCommonHolder;
        this.dataPageStateManager = dataPageStateManager;
    }


    // shallowClone() {

    //     const clone = new CreateReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter();
    //     Object.assign( clone, this );
    //     return clone;
    // }
}



///////////////////

/**
 * Result from createReportedPeptideDisplayData call
 */
export class GetDataTableDataObjects_Result_Last_ConditionGroup {
    dataTable_RootTableObject : DataTable_RootTableObject;
}

/**
 * Create Reported Peptide Data for Display
 * 
 * Reported Peptide List Data Table Root
 */
export const createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup = function( { 
    
    createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter

} : {
    createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter : CreateReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter,

} ) : GetDataTableDataObjects_Result_Last_ConditionGroup {

    const getDataTableDataObjects_Result = new GetDataTableDataObjects_Result_Last_ConditionGroup();

    //  Row in Top Level table that this is under (direct or indirect)   
    const createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry =
        createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow

    //  Path of condition ids from Root Peptide List to current list being created. Empty array if at top group
    //    (This is how it is tracked the path of expanded rows and determine what is to be shown in the current table)
    const conditionIds_ParentPath : Array<number> = createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.conditionIds_ParentPath;

    const conditionGroupsContainer : Experiment_ConditionGroupsContainer = createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.conditionGroupsContainer;
    const conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer = createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.conditionGroupsDataContainer;

    const projectSearchIds : Array<number> = createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.projectSearchIds
    const reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId : Map<number, Set<number>> = createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId
    const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds =
        createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    const searchDataLookupParamsRoot = createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.searchDataLookupParamsRoot
    const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    const loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder = createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.loadedDataCommonHolder
    const dataPageStateManager : DataPageStateManager = createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter.dataPageStateManager;

    const conditionGroups = conditionGroupsContainer.conditionGroups;

    //  Validate that at bottom Condition Group Shown

    if ( conditionIds_ParentPath.length !== ( conditionGroups.length - 1 ) ) {
        const msg = ( 
            "Not at 'Last Condition Group Shown' when pass data to ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent:  conditionIds_ParentPath.length !== ( conditionGroups.length - 1 ). conditionIds_ParentPath.length: " 
            + conditionIds_ParentPath.length
            + ", conditionGroups.length: "
            + conditionGroups.length
        );
        console.warn( msg );
        throw Error( msg );
    }

    const current_conditionGroup = conditionGroups[ 0 ];

    //  Accumulate by conditionIds_ParentPath each condition.id

    const projectSearchIds_By_conditionId =
        Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer.
        getProjectSearchIds_For_ConditionGroup_FilteringOn_ConditionIdsParentPath({
            conditionGroup : current_conditionGroup,
            conditionIds_ParentPath,
            conditionGroupsDataContainer
        });

    const current_conditionGroup_Conditions = current_conditionGroup.conditions;

    ////////////////////

    //  Create Table Columns (Header info and Data Info)

    const dataTable_Columns : Array<DataTable_Column> = [];

    {  // Generated Peptide sequence, including variable mods, etc
        const dataTable_Column = new DataTable_Column({
            id : "Condition", // Used for tracking sort order. Keep short
            displayName : "Condition",
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

    //  PSM counts for each ...
    // for ( const  of  ) {
    {
        const dataTable_Column = new DataTable_Column({
            id : "psmCountTotal",
            displayName : "PSM Count",
            width : 70,
            sortable : true
        });
        dataTable_Columns.push( dataTable_Column );
    }

    //  Create Table Body

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        let listCounter = 0;

        for ( const condition of current_conditionGroup_Conditions ) {
            
            listCounter++;

            const projectSearchIds_ThatHavePsmCountsGtZero : Array<number> = [];

            //  Sum up PSM counts for condition

            let psmCountAll = 0;
            {
                const projectSearchIds = projectSearchIds_By_conditionId.get( condition.id );
                if ( projectSearchIds ) {
                    for ( const projectSearchId of projectSearchIds ) {
                        const psmCount = createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
                        if ( psmCount ) {
                            psmCountAll += psmCount;

                        //  Data for child tables
                            projectSearchIds_ThatHavePsmCountsGtZero.push( projectSearchId );
                        }
                    }
                }
            }
            if ( psmCountAll === 0 ) {
                //  No PSMs so skip this row

                continue; //  EARLY CONTINUE
            }

            const dataTable_DataRow_ColumnEntries : Array<DataTable_DataRow_ColumnEntry> = [];

            {
                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : condition.label,
                    valueSort : condition.label,
                    // tooltipText : 
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );
            }

            {
                const psmCountDisplay = psmCountAll.toLocaleString();

                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : psmCountDisplay,
                    valueSort : psmCountAll,
                    // tooltipText : 
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

            }

            //////////

            // Data for Child Tables for this row of this table
            
            const searchesForSinglePeptide_createChildTableObjects_Parameter = (
                new SearchesForSinglePeptide_createChildTableObjects_Parameter({
                    createReportedPeptideDisplayData_Result_Entry_ForParentRow : createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow,
                    projectSearchIds : projectSearchIds_ThatHavePsmCountsGtZero,
                    reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId,
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                    searchDataLookupParamsRoot,
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                    loadedDataCommonHolder,
                    dataPageStateManager
                })
            );

            const dataRow_GetChildTableData_Return_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject =
                ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : DataTable_RootTableObject => {

                    const dataTable_RootTableObject : DataTable_RootTableObject =
                        searchesForSinglePeptide_createChildTableObjects({
                            searchesForSinglePeptide_createChildTableObjects_Parameter
                        })

                    return dataTable_RootTableObject;
                }

            //////////

            const dataTable_DataRowEntry = new DataTable_DataRowEntry( {   
                uniqueId : condition.label,
                sortOrder_OnEquals : listCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                columnEntries : dataTable_DataRow_ColumnEntries,
                dataRow_GetChildTableData_Return_DataTable_RootTableObject
            });

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
