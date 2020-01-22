/**
 * generatedReportedPeptideList_For_All_But_Last_ConditionGroup_PerCondition_Rows_CreateListData.ts
 * 
 * Get Peptide List for Data Table - For All BUT Last Condition Group
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

    DataTable_ColumnId,

    DataTable_RootTableObject,
    
    DataTable_TableOptions,
    DataTable_TableOptions_dataRowClickHandler_RequestParm,
    DataTable_TableOptions_dataRow_GetChildTableData_RequestParm,
    
    DataTable_Column,
    DataTable_SortColumnsInfoEntry,

    DataTable_RootTableDataObject,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,

    DataTable_cellMgmt_External,
    DataTable_cellMgmt_External_PopulateRequest,
    DataTable_cellMgmt_External_PopulateResponse,
    DataTable_cellMgmt_ExternalReactComponent
    
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { ConditionGroupsDataContainer, ProcessAllDataEntries_callback_Param } from 'page_js/data_pages/experiment_data_pages_common/conditionGroupsDataContainer_Class';

import { create_GeneratedReportedPeptideListData, Create_GeneratedReportedPeptideListData_Result, CreateReportedPeptideDisplayData_Result_Entry } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/js/proteinExperimentPage_SingleProtein_Create_GeneratedReportedPeptideListData';

import { 
    forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent,
    ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter
} from './generatedReportedPeptideList_For_All_But_Last_ConditionGroup_PerCondition_Rows_ReturnChildReactComponent';

//  Child Data Searches for Single Peptide show/hide


//  Used when Child is NOT Last Condition Group:  ...For_All_But_Last_ConditionGroup...

//  Used when Child is Last Condition Group:  ...For_Last_ConditionGroup...

//  returns React Component to insert below current data row

import { 
    forSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent, 
    ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter 
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__entry_for_last_condition_group__per_condition_rows/js/generatedReportedPeptideList_For_Last_ConditionGroup_PerCondition_Rows_ReturnChildReactComponent';


//////////////////

const dataTableId_ThisTable = "Single Protein Peptide List Last Condition Group Condition rows PSM Count List Table";





///////////////////

/**
 * Result from createReportedPeptideDisplayData call
 */
export class GetDataTableDataObjects_Result {
    dataTable_RootTableObject : DataTable_RootTableObject;
}

/**
 * Create Reported Peptide Data for Display
 * 
 * Reported Peptide List Data Table Root
 */
export const createReportedPeptideDisplayData_DataTableDataObjects = function( { 
    
    forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter

} : {
    forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter : ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter,

} ) : GetDataTableDataObjects_Result {

    const getDataTableDataObjects_Result = new GetDataTableDataObjects_Result();

    //  Row in Top Level table that this is under (direct or indirect)
    const createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : CreateReportedPeptideDisplayData_Result_Entry = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow

    //  Empty array if at top group
    const conditionIds_ParentPath : Array<number> = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.conditionIds_ParentPath;

    const conditionGroupsContainer : Experiment_ConditionGroupsContainer = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.conditionGroupsContainer;
    const conditionGroupsDataContainer : ConditionGroupsDataContainer = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.conditionGroupsDataContainer;

    const projectSearchIds : Array<number> = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.projectSearchIds
    const reportedPeptideIdsMap_KeyProjectSearchId : Map<number, Set<number>> = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.reportedPeptideIdsMap_KeyProjectSearchId
    const reporterIonMassesSelected : Set<number> = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.reporterIonMassesSelected
    const searchDataLookupParamsRoot = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.searchDataLookupParamsRoot
    const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    const loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.loadedDataCommonHolder
    const dataPageStateManager : DataPageStateManager = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter.dataPageStateManager;

    const conditionGroups = conditionGroupsContainer.conditionGroups;

    //  Validate that NOT at bottom Condition Group

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


    const current_conditionGroup = conditionGroups[ conditionIds_ParentPath.length ];

    //  Accumulate by conditionIds_ParentPath each condition.id

    const projectSearchIds_By_conditionId = new Map<number,Set<number>>();

    const current_id_ConditionGroup = current_conditionGroup.id;

    const current_conditionGroup_Conditions = current_conditionGroup.conditions;


    const processAllDataEntries_Callback = ( params : ProcessAllDataEntries_callback_Param ) => {

        const data = params.data
        const innerData = data.data;
      
        if ( ! innerData ) {
            // innerData not populated
            
            return; //  EARLY RETURN
        }

        const projectSearchIds : Set<number> = innerData.projectSearchIds;

        if ( ( ! projectSearchIds ) || ( projectSearchIds.size === 0 ) ) {
            // innerData.projectSearchIds not populated
            
            return; //  EARLY RETURN
        }

        let condition_id_For_current_ConditionGroup = undefined;

        const conditionIds_Path = params.conditionIds_Path;

        //  If not contain conditionIds_ParentPath skip

        if ( conditionIds_ParentPath && conditionIds_ParentPath.length > 0 ) {

            let foundAll = true;

            for ( const conditionIds_ParentPath_Entry of conditionIds_ParentPath ) {
                let foundEntry = false;
                for ( const conditionIds_Path_Entry of conditionIds_Path ) {
                    if ( conditionIds_Path_Entry === conditionIds_ParentPath_Entry ) {
                        foundEntry = true;
                        break;
                    }
                }
                if ( ! foundEntry ) {
                    foundAll = false;
                    break;
                }
            }
            if ( ! foundAll ) {
                // not contain conditionIds_ParentPath so skip

                return;  // EARLY RETURN
            }
        }

        for ( const conditionIds_Path_Entry of conditionIds_Path ) {
            for ( const condition of current_conditionGroup_Conditions ) {
                if ( conditionIds_Path_Entry === condition.id ) {
                    condition_id_For_current_ConditionGroup = conditionIds_Path_Entry;
                    break;
                }
            }
            if ( condition_id_For_current_ConditionGroup !== undefined ) {
                break;
            }
        }
        if ( condition_id_For_current_ConditionGroup === undefined ) {
            const msg = "No entry found in conditionIds_Path for condtions in current_id_ConditionGroup: " + current_id_ConditionGroup;
            console.warn( msg );
            throw Error( msg );
        }

        let projectSearchIds_For_conditionId = projectSearchIds_By_conditionId.get( condition_id_For_current_ConditionGroup );
        if ( ! projectSearchIds_For_conditionId ) {
            projectSearchIds_For_conditionId = new Set<number>();
            projectSearchIds_By_conditionId.set( condition_id_For_current_ConditionGroup, projectSearchIds_For_conditionId );
        }

        for ( const projectSearchId of projectSearchIds ) {
            projectSearchIds_For_conditionId.add( projectSearchId );
        }
    }

    conditionGroupsDataContainer.processAllDataEntries({ callback : processAllDataEntries_Callback });

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

            const conditionIds_ParentPath_ForChild : Array<number> = ( 
                Array.from( conditionIds_ParentPath )
            );

            {
                conditionIds_ParentPath_ForChild.push( condition.id );
            }

            let dataRow_GetChildTable_ReturnReactComponent_Parameter = undefined;

            
            if ( conditionIds_ParentPath.length < ( conditionGroups.length - 2 ) ) {

                //  Child Condition Group NOT 'Last Condition Group':  Children table uses ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter

                const forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter = ( 
                    new ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter({
                        
                        createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow,
                        conditionIds_ParentPath : conditionIds_ParentPath_ForChild,
                        
                        conditionGroupsContainer,
                        conditionGroupsDataContainer,

                        projectSearchIds,
                        reportedPeptideIdsMap_KeyProjectSearchId : reportedPeptideIdsMap_KeyProjectSearchId,
                        reporterIonMassesSelected,
                        searchDataLookupParamsRoot,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder,
                        dataPageStateManager
                    })
                );

                dataRow_GetChildTable_ReturnReactComponent_Parameter = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter;

            } else {

                //  Child Condition Group IS 'Last Condition Group':  Children table uses ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter

                const forSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter = ( 
                    new ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter({
                        
                        createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow,
                        conditionIds_ParentPath : conditionIds_ParentPath_ForChild,
                        
                        conditionGroupsContainer,
                        conditionGroupsDataContainer,

                        projectSearchIds,
                        reportedPeptideIdsMap_KeyProjectSearchId : reportedPeptideIdsMap_KeyProjectSearchId,
                        reporterIonMassesSelected,
                        searchDataLookupParamsRoot,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder,
                        dataPageStateManager
                    })
                );

                dataRow_GetChildTable_ReturnReactComponent_Parameter = forSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter;
            }

            //////////

            const dataTable_DataRowEntry = new DataTable_DataRowEntry( {   
                uniqueId : condition.label,
                sortOrder_OnEquals : listCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                columnEntries : dataTable_DataRow_ColumnEntries,
                // dataRow_GetChildTableDataParameter : fake_dataRow_GetChildTableDataParameter_FakeChildTableTesting
               dataRow_GetChildTable_ReturnReactComponent_Parameter
                // tableRowClickHandlerParameter : undefined,  //  Data passed to DataTable_TableOptions.dataRowClickHandler
                // dataRow_GetChildTableDataParameter : undefined,   //  Data passed to DataTable_TableOptions.dataRow_GetChildTableData
            });

            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        dataTable_DataRowEntries
    });

    let dataRow_GetChildTable_ReturnReactComponent = undefined;

    if ( conditionIds_ParentPath.length < ( conditionGroups.length - 2 ) ) {

        //  Child Condition Group NOT 'Last Condition Group':  

        dataRow_GetChildTable_ReturnReactComponent = forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent;

    } else {

        //  Child Condition Group IS 'Last Condition Group':  

        dataRow_GetChildTable_ReturnReactComponent = forSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent;
    }


    const tableOptions = new DataTable_TableOptions({
        // dataRow_GetChildTableData : fake_dataRow_GetChildTableData          //  TODO  Need to provide this for child table processing
       dataRow_GetChildTable_ReturnReactComponent
    });

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    getDataTableDataObjects_Result.dataTable_RootTableObject = dataTable_RootTableObject;

    return getDataTableDataObjects_Result;
}
