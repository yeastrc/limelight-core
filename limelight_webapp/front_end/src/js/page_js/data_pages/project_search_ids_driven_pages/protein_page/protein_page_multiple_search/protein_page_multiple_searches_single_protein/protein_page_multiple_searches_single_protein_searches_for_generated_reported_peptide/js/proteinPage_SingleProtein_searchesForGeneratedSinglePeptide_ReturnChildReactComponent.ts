/**
 * proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ReturnChildReactComponent.ts
 * 
 * Protein Page: Multiple Search : Single Protein: show searches for Generated Single Peptide in Peptide List
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

//  React Component that will be returned
import { ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent } from '../jsx/proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent';
import { CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry } from '../../js/proteinPage_Display_MultipleSearches_SingleProtein_Create_GeneratedReportedPeptideListData';
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";



/**
 * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
 */
class ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter {
    
    createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry
    projectSearchIds : Array<number>
    reportedPeptideIdsMap_KeyProjectSearchId_ForParentPeptide : Map<number, Set<number>>  //  Reported Peptide Ids for this specific parent Peptide
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    searchDataLookupParamsRoot
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

    /**
     * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
     */
    constructor({ 
        
        createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow,
        projectSearchIds,
        reportedPeptideIdsMap_KeyProjectSearchId_ForParentPeptide,
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
        searchDataLookupParamsRoot,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder,
        dataPageStateManager 
    } : { 
        createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry
        projectSearchIds : Array<number>,
        reportedPeptideIdsMap_KeyProjectSearchId_ForParentPeptide : Map<number, Set<number>>  //  Reported Peptide Ids for this specific parent Peptide
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
        searchDataLookupParamsRoot
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
        dataPageStateManager : DataPageStateManager
    }) {

        this.createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow = createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow;
        this.projectSearchIds = projectSearchIds;
        this.reportedPeptideIdsMap_KeyProjectSearchId_ForParentPeptide = reportedPeptideIdsMap_KeyProjectSearchId_ForParentPeptide;
        this.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        this.loadedDataCommonHolder = loadedDataCommonHolder;
        this.dataPageStateManager = dataPageStateManager;
    }


    // shallowClone() {

    //     const clone = new ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter();
    //     Object.assign( clone, this );
    //     return clone;
    // }
}

/**
 * 
 */
const proteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent = ( 
    dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm: DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm 
) : any /* React.Component */ => {

    if ( ! dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm ) {
        throw Error("No value in dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm")
    }
    const dataRow_GetChildTable_ReturnReactComponent_Parameter = dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.dataRow_GetChildTable_ReturnReactComponent_Parameter;
    if ( ! dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
        throw Error("No value in dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    if ( ! ( dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
        throw Error("Not: dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    const dataRow_GetChildTable_ReturnReactComponentParameter = dataRow_GetChildTable_ReturnReactComponent_Parameter as ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
    // dataRow_GetChildTable_ReturnReactComponentParameter is the value in dataTable_DataRowEntry.dataRow_GetChildTable_ReturnReactComponentParameter
    
    //  For this implementation, dataRow_GetChildTable_ReturnReactComponent_Parameter is not used here.

    //  Return class

    return ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent;
}


export { proteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent, ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter }
