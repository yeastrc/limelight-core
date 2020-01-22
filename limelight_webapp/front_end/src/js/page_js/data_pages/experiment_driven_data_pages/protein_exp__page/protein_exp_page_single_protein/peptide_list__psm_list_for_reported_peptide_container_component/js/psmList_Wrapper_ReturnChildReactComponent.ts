/**
 * psmList_Wrapper_ReturnChildReactComponent.ts
 * 
 * Experiment Protein Page: Single Protein: Wrapper Component on PSM List. under Single Reported Peptide, Single Search, Single Peptide in Peptide List
 * 
 * Return React Component that is shown for child of single peptide and will contain child table 
 */


//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';


 //  Data Table
import { DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

//  React Component that will be returned
import { PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent } from '../jsx/psmList_Wrapper_ChildReactComponent';



/**
 * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
 */
class PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter {
    
    projectSearchId : number
    reportedPeptideId : number
    reporterIonMassesSelected : Set<number>
    searchDataLookupParamsRoot
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager
    forMultipleSearchesPage : boolean  // Always True for Experiment

    /**
     * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
     */
    constructor({ 
        
        projectSearchId,
        reportedPeptideId,
        reporterIonMassesSelected,
        searchDataLookupParamsRoot,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager,
        forMultipleSearchesPage  // Always True for Experiment
    } : { 
        projectSearchId : number
        reportedPeptideId : number
        reporterIonMassesSelected : Set<number>
        searchDataLookupParamsRoot
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        dataPageStateManager : DataPageStateManager
        forMultipleSearchesPage : boolean  // Always True for Experiment
    }) {

        this.projectSearchId = projectSearchId;
        this.reportedPeptideId = reportedPeptideId;
        this.reporterIonMassesSelected = reporterIonMassesSelected;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;
        this.loadedDataCommonHolder = loadedDataCommonHolder;
        this.dataPageStateManager = dataPageStateManager;
        this.forMultipleSearchesPage = forMultipleSearchesPage;
    }

}

/**
 * 
 */
const psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent = ( 
    dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm: DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm 
) : any /* React.Component */ => {

    if ( ! dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm ) {
        throw Error("No value in dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm")
    }
    const dataRow_GetChildTable_ReturnReactComponent_Parameter = dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.dataRow_GetChildTable_ReturnReactComponent_Parameter;
    if ( ! dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
        throw Error("No value in dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    if ( ! ( dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
        throw Error("Not: dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    const dataRow_GetChildTable_ReturnReactComponentParameter = dataRow_GetChildTable_ReturnReactComponent_Parameter as PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
    // dataRow_GetChildTable_ReturnReactComponentParameter is the value in dataTable_DataRowEntry.dataRow_GetChildTable_ReturnReactComponentParameter

    //  For this implementation, dataRow_GetChildTable_ReturnReactComponent_Parameter is not used here.

    //  Return class

    return PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent;
}


export { psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent, PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter }
