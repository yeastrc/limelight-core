/**
 * searchesForConditionForSinglePeptide_ReturnChildReactComponent.ts
 * 
 * Experiment Protein Page: Single Protein: show searches for Condition in Last Condition Group for Single Peptide in Peptide List
 * 
 * Return React Component that is shown for child of single peptide and will contain child table 
 */

 ////    !!!!!!!  No Import for CreateReportedPeptideDisplayData_Result_Entry

// //   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';


 //  Data Table
import { DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { create_GeneratedReportedPeptideListData, Create_GeneratedReportedPeptideListData_Result, CreateReportedPeptideDisplayData_Result_Entry } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/js/proteinExperimentPage_SingleProtein_Create_GeneratedReportedPeptideListData';

//  React Component that will be returned
import { SearchesForCondtionForSinglePeptide_ChildReactComponent } from '../jsx/searchesForConditionForSinglePeptide_ChildReactComponent';



/**
 * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
 */
class SearchesForConditionForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter {
    
    createReportedPeptideDisplayData_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData_Result_Entry
    projectSearchIds : Array<number>
    reportedPeptideIdsMap_KeyProjectSearchId : Map<number, Set<number>>
    reporterIonMassesSelected : Set<number>
    searchDataLookupParamsRoot
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

    /**
     * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
     */
    constructor({ 
        
        createReportedPeptideDisplayData_Result_Entry_ForParentRow,
        projectSearchIds,
        reportedPeptideIdsMap_KeyProjectSearchId,
        reporterIonMassesSelected,
        searchDataLookupParamsRoot,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder,
        dataPageStateManager 
    } : { 
        createReportedPeptideDisplayData_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData_Result_Entry
        projectSearchIds : Array<number>,
        reportedPeptideIdsMap_KeyProjectSearchId : Map<number, Set<number>>
        reporterIonMassesSelected : Set<number>
        searchDataLookupParamsRoot
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
        dataPageStateManager : DataPageStateManager
    }) {

        this.createReportedPeptideDisplayData_Result_Entry_ForParentRow = createReportedPeptideDisplayData_Result_Entry_ForParentRow;
        this.projectSearchIds = projectSearchIds;
        this.reportedPeptideIdsMap_KeyProjectSearchId = reportedPeptideIdsMap_KeyProjectSearchId;
        this.reporterIonMassesSelected = reporterIonMassesSelected;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        this.loadedDataCommonHolder = loadedDataCommonHolder;
        this.dataPageStateManager = dataPageStateManager;
    }


    // shallowClone() {

    //     const clone = new SearchesForConditionForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter();
    //     Object.assign( clone, this );
    //     return clone;
    // }
}

/**
 * 
 */
const searchesForCondtionForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent = ( 
    dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm: DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm 
) : any /* React.Component */ => {

    if ( ! dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm ) {
        throw Error("No value in dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm")
    }
    const dataRow_GetChildTable_ReturnReactComponent_Parameter = dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.dataRow_GetChildTable_ReturnReactComponent_Parameter;
    if ( ! dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
        throw Error("No value in dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    if ( ! ( dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof SearchesForConditionForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
        throw Error("Not: dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof SearchesForConditionForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    const dataRow_GetChildTable_ReturnReactComponentParameter = dataRow_GetChildTable_ReturnReactComponent_Parameter as SearchesForConditionForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
    // dataRow_GetChildTable_ReturnReactComponentParameter is the value in dataTable_DataRowEntry.dataRow_GetChildTable_ReturnReactComponentParameter
    
    //  For this implementation, dataRow_GetChildTable_ReturnReactComponent_Parameter is not used here.

    //  Return class

    return SearchesForCondtionForSinglePeptide_ChildReactComponent;
}


export { searchesForCondtionForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent as searchesForConditionForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent, SearchesForConditionForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter }
