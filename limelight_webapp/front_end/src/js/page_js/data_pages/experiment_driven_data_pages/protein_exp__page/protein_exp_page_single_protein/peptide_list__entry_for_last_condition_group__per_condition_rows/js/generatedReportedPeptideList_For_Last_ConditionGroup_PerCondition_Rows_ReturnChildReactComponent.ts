/**
 * generatedReportedPeptideList_For_Last_ConditionGroup_PerCondition_Rows_ReturnChildReactComponent.ts
 * 
 * Experiment Protein Page: Single Protein: for Single Peptide in Peptide List, "Bottom condition Group" before show Searches
 * 
 *     show a nested table where rows are conditions and column for PSM count for that condition
 * 
 * Return React Component that is shown for child of single peptide and will contain child table 
 */

// //   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';


 //  Data Table
import { DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';


import { create_GeneratedReportedPeptideListData, Create_GeneratedReportedPeptideListData_Result, CreateReportedPeptideDisplayData_Result_Entry } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/js/proteinExperimentPage_SingleProtein_Create_GeneratedReportedPeptideListData';

//  React Component that will be returned
import { ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows_Component } from '../jsx/generatedReportedPeptideList_For_Last_ConditionGroup_PerCondition_Rows_Component';
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";

/**
 * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
 */
class ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter {
    
    createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : CreateReportedPeptideDisplayData_Result_Entry //  Row in Top Level table that this is under (direct or indirect)

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
     * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
     */
    constructor({ 
        
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
        createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : CreateReportedPeptideDisplayData_Result_Entry;
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

    //     const clone = new ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter();
    //     Object.assign( clone, this );
    //     return clone;
    // }
}

/**
 * 
 */
const forSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent = ( 
    dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm: DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm 
) : any /* React.Component */ => {

    if ( ! dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm ) {
        throw Error("No value in dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm")
    }
    const dataRow_GetChildTable_ReturnReactComponent_Parameter = dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.dataRow_GetChildTable_ReturnReactComponent_Parameter;
    if ( ! dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
        throw Error("No value in dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    if ( ! ( dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
        throw Error("Not: dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    const dataRow_GetChildTable_ReturnReactComponentParameter = dataRow_GetChildTable_ReturnReactComponent_Parameter as ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter
    // dataRow_GetChildTable_ReturnReactComponentParameter is the value in dataTable_DataRowEntry.dataRow_GetChildTable_ReturnReactComponentParameter
    
    //  For this implementation, dataRow_GetChildTable_ReturnReactComponent_Parameter is not used here.

    //  Return class

    return ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows_Component;
}

export { 
    forSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent, 
    ForSinglePeptide_For_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter,
}
