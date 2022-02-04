/**
 * generatedReportedPeptideList_For_All_But_Last_ConditionGroup_PerCondition_Rows_CreateListData.ts
 * 
 * Get Peptide List for Data Table - For All BUT Last Condition Group Shown (Now  the LAST condition Group where conditions are listed is the FIRST Condition Group )
 * 
 * Experiment Protein Page: Single Protein: for Single Peptide in Peptide List, All BUT "Bottom condition Group" before show Searches
 * 
 *     show a nested table where rows are conditions and columns for PSM counts are for conditions in child condition group for each of conditions 
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
    DataTable_Column_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry_DownloadTable,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

//  Child Data Searches for Single Peptide show/hide


//  Used when Child is NOT Last Condition Group Shown:  ...For_All_But_Last_ConditionGroup...

//  Used when Child is Last Condition Group Shown:  ...For_Last_ConditionGroup...

//  returns React Component to insert below current data row

import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup,
    CreateReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter,
    GetDataTableDataObjects_Result_Last_ConditionGroup
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__entry_for_last_condition_group__per_condition_rows/js/generatedReportedPeptideList_For_Last_ConditionGroup_PerCondition_Rows_CreateListData";
import {CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";


//////////////////

const dataTableId_ThisTable = "Single Protein Peptide List Last Condition Group Condition rows PSM Count List Table";




/**
 * Param to createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup
 */
export class CreateReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter {

    createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry //  Row in Top Level table that this is under (direct or indirect)

    //  Path of condition ids from Root Peptide List to current list being created. Empty array if at top group
    //    (This is how it is tracked the path of expanded rows and determine what is to be shown in the current table)
    conditionIds_ParentPath : Array<number>;

    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    projectSearchIds : Array<number>
    reportedPeptideIdsMap_KeyProjectSearchId : Map<number, Set<number>>
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
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
            reportedPeptideIdsMap_KeyProjectSearchId,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            searchDataLookupParamsRoot,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,
            dataPageStateManager
        } : {
            createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry;
            conditionIds_ParentPath : Array<number>; //  Empty array if at top group

            conditionGroupsContainer : Experiment_ConditionGroupsContainer
            conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

            projectSearchIds : Array<number>,
            reportedPeptideIdsMap_KeyProjectSearchId : Map<number, Set<number>>
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
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
        this.reportedPeptideIdsMap_KeyProjectSearchId = reportedPeptideIdsMap_KeyProjectSearchId;
        this.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        this.loadedDataCommonHolder = loadedDataCommonHolder;
        this.dataPageStateManager = dataPageStateManager;
    }
}



///////////////////

/**
 * Result from createReportedPeptideDisplayData call
 */
export class GetDataTableDataObjects_All_But_Last_ConditionGroup_Result {
    dataTable_RootTableObject : DataTable_RootTableObject;
}

/**
 * Create Reported Peptide Data for Display
 * 
 * Reported Peptide List Data Table Root
 */
export const createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup = function( { 
    
    createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter

} : {
    createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter : CreateReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter,

} ) : GetDataTableDataObjects_All_But_Last_ConditionGroup_Result {

    const getDataTableDataObjects_Result = new GetDataTableDataObjects_All_But_Last_ConditionGroup_Result();

    //  Row in Top Level table that this is under (direct or indirect)
    const createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow

    //  Path of condition ids from Root Peptide List to current list being created. Empty array if at top group
    //    (This is how it is tracked the path of expanded rows and determine what is to be shown in the current table)
    const conditionIds_ParentPath : Array<number> = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.conditionIds_ParentPath;

    const conditionGroupsContainer : Experiment_ConditionGroupsContainer = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.conditionGroupsContainer;
    const conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.conditionGroupsDataContainer;

    const projectSearchIds : Array<number> = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.projectSearchIds

    const reportedPeptideIdsMap_KeyProjectSearchId : Map<number, Set<number>> = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.reportedPeptideIdsMap_KeyProjectSearchId
    const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds =
        createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    const searchDataLookupParamsRoot = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.searchDataLookupParamsRoot
    const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    const loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.loadedDataCommonHolder
    const dataPageStateManager : DataPageStateManager = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter.dataPageStateManager;

    const conditionGroups = conditionGroupsContainer.conditionGroups;

    //  Validate that NOT at bottom Condition Group to Show (correct comparison since skip first Condition Group initially and show it last)

    if ( conditionIds_ParentPath.length === ( conditionGroups.length ) ) {
        const msg = ( 
            "Not Allowed: At 'Last Condition Group' when pass data to ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent:  conditionIds_ParentPath.length !== ( conditionGroups.length - 1 ). conditionIds_ParentPath.length: " 
            + conditionIds_ParentPath.length
            + ", conditionGroups.length: "
            + conditionGroups.length
        );
        console.warn( msg );
        throw Error( msg );
    }

    const current_conditionGroup_Index = conditionIds_ParentPath.length + 1;  // Skipping over the first condition group as that will be shown last

    const current_conditionGroup = conditionGroups[ current_conditionGroup_Index ];

    const first_conditionGroup = conditionGroups[ 0 ];

    //  Accumulate by conditionIds_ParentPath each condition.id

    //   Map< Current Condition Group: condition.id,Map< First Condition Group: condition.id,<Set<number>>>();

    const projectSearchIds_By_conditionId_FirstConditionGroupConditionId =
        Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer.
        getProjectSearchIds_For_ConditionGroup_FirstConditionGroup_FilteringOn_ConditionIdsParentPath({
            conditionIds_ParentPath,
            current_conditionGroup,
            first_conditionGroup,
            conditionGroupsDataContainer
        });

    const current_conditionGroup_Conditions = current_conditionGroup.conditions;

    ////////////////////

    //  Create Table Columns (Header info and Data Info)

    const dataTable_Columns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {  // Generated Peptide sequence, including variable mods, etc

        const displayName = "Condition";

        const dataTable_Column = new DataTable_Column({
            id : "Condition", // Used for tracking sort order. Keep short
            displayName,
            width : 500,
            sortable : true,
        });
        dataTable_Columns.push( dataTable_Column );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    //  PSM counts for each condition in first condition group
    for ( const first_conditionGroup_condition of first_conditionGroup.conditions ) {
        const first_conditionGroup_conditionId = first_conditionGroup_condition.id;

        const displayName = "PSM Count (" + first_conditionGroup_condition.label + ")";

        const dataTable_Column = new DataTable_Column({
            id : "psmCountTotal_" + first_conditionGroup_conditionId,
            displayName,
            width : 70,
            sortable : true
        });
        dataTable_Columns.push( dataTable_Column );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    //  Create Table Body

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        let listCounter = 0;

        for ( const condition of current_conditionGroup_Conditions ) {
            
            listCounter++;

            const projectSearchIds_By_FirstConditionGroupConditionId = projectSearchIds_By_conditionId_FirstConditionGroupConditionId.get( condition.id );

            if ( ! projectSearchIds_By_FirstConditionGroupConditionId ) {
                //  No data for this condition.id

                continue;  // EARLY CONTINUE
            }

            const projectSearchIds_ThatHavePsmCountsGtZero : Array<number> = [];

            //  Sum up PSM counts for condition and First ConditionGroup Condition

            const psmCount_TotalsPer_FirstConditionGroupConditionId : Map<number,number> = new Map();  //  Map< First ConditionGroup Condition.id, count>

            {
                let psmCount_ForRow = 0;

                for (const first_conditionGroup_condition of first_conditionGroup.conditions) {
                    const first_conditionGroup_conditionId = first_conditionGroup_condition.id;

                    let psmCount_For_first_conditionGroup_condition_Entry = 0;

                    const projectSearchIds = projectSearchIds_By_FirstConditionGroupConditionId.get(first_conditionGroup_conditionId);
                    if (projectSearchIds) {

                        for (const projectSearchId of projectSearchIds) {
                            
                            const psmCount = createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow.psmCountsMap_KeyProjectSearchId.get(projectSearchId);
                            if (psmCount) {

                                psmCount_For_first_conditionGroup_condition_Entry += psmCount;

                                //  Data for child tables
                                projectSearchIds_ThatHavePsmCountsGtZero.push(projectSearchId);

                                psmCount_ForRow += psmCount;
                            }
                        }
                    }

                    psmCount_TotalsPer_FirstConditionGroupConditionId.set(first_conditionGroup_conditionId, psmCount_For_first_conditionGroup_condition_Entry);
                }
                if ( psmCount_ForRow === 0 ) {
                    //  No PSMs for the row so skip this row

                    continue; //  EARLY CONTINUE
                }
            }

            const dataTable_DataRow_ColumnEntries : Array<DataTable_DataRow_ColumnEntry> = [];
            const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

            {
                const valueDisplay = condition.label;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : condition.label,
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
            
            //  PSM counts for each condition in first condition group
            for ( const first_conditionGroup_condition of first_conditionGroup.conditions ) {
                const first_conditionGroup_conditionId = first_conditionGroup_condition.id;

                let psmCountAll = psmCount_TotalsPer_FirstConditionGroupConditionId.get( first_conditionGroup_conditionId );
                if ( ! psmCountAll ) {
                    psmCountAll = 0;
                }

                const psmCountDisplay = psmCountAll.toLocaleString();

                const valueDisplay = psmCountDisplay;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : psmCountAll,
                    // tooltipText : 
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }

            //////////

            // Data for Child Tables for this row of this table

            const conditionIds_ParentPath_ForChild : Array<number> = ( 
                Array.from( conditionIds_ParentPath )
            );

            {
                conditionIds_ParentPath_ForChild.push( condition.id );
            }

            if ( conditionIds_ParentPath.length < ( conditionGroups.length - 2 ) ) {

                //  Child Condition Group NOT 'Last Condition Group':  Children table uses createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter

                const createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter = ( 
                    new CreateReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter({
                        
                        createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow,
                        conditionIds_ParentPath : conditionIds_ParentPath_ForChild,
                        
                        conditionGroupsContainer,
                        conditionGroupsDataContainer,

                        projectSearchIds,
                        reportedPeptideIdsMap_KeyProjectSearchId,
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

                const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                const dataTable_DataRowEntry = new DataTable_DataRowEntry( {
                    uniqueId : condition.label,
                    sortOrder_OnEquals : listCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                    columnEntries : dataTable_DataRow_ColumnEntries,
                    dataTable_DataRowEntry_DownloadTable,
                    dataRow_GetChildTableData_Return_DataTable_RootTableObject
                });

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );

            } else {

                //  Child Condition Group IS 'Last Condition Group':  Children table uses CreateReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter

                const createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter = (
                    new CreateReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter({
                        
                        createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow,
                        conditionIds_ParentPath : conditionIds_ParentPath_ForChild,
                        
                        conditionGroupsContainer,
                        conditionGroupsDataContainer,

                        projectSearchIds,
                        reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId : reportedPeptideIdsMap_KeyProjectSearchId,
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

                const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                const dataTable_DataRowEntry = new DataTable_DataRowEntry( {
                    uniqueId : condition.label,
                    sortOrder_OnEquals : listCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                    columnEntries : dataTable_DataRow_ColumnEntries,
                    dataTable_DataRowEntry_DownloadTable,
                    dataRow_GetChildTableData_Return_DataTable_RootTableObject
                });

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );
            }

            //  dataTable_DataRowEntries added to inside 'if' and 'else' immediately above

        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        columns_tableDownload: dataTable_Column_DownloadTable_Entries,
        dataTable_DataRowEntries
    });

    const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: false});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    getDataTableDataObjects_Result.dataTable_RootTableObject = dataTable_RootTableObject;

    return getDataTableDataObjects_Result;
}
