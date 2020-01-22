/**
 * reportedPeptidesForSingleSearch_ReturnChildReactComponent.ts
 * 
 * Experiment Protein Page: Single Protein: show Reported Peptides for Single Search for Single Peptide in Peptide List
 * 
 * Return React Component that is shown for child of Single Search for Single Peptide and will contain child table 
 */


//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';


 //  Data Table
import { DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

//  React Component that will be returned
import { ReportedPeptidesForSingleSearch_ChildReactComponent } from '../jsx/reportedPeptidesForSingleSearch_ChildReactComponent';



/**
 * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
 */
class ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter {
    
    projectSearchId : number
    reportedPeptideIds : Set<number>
    reporterIonMassesSelected : Set<number>
    searchDataLookupParamsRoot
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

    /**
     * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
     */
    constructor({ 
        
        projectSearchId,
        reportedPeptideIds,
        reporterIonMassesSelected,
        searchDataLookupParamsRoot,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager
    } : { 
        projectSearchId : number
        reportedPeptideIds : Set<number>
        reporterIonMassesSelected : Set<number>
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
        searchDataLookupParamsRoot,
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
        dataPageStateManager : DataPageStateManager
    }) {

        this.projectSearchId = projectSearchId;
        this.reportedPeptideIds = reportedPeptideIds;
        this.reporterIonMassesSelected = reporterIonMassesSelected;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;
        this.loadedDataCommonHolder = loadedDataCommonHolder;
        this.dataPageStateManager = dataPageStateManager;
    }


    // shallowClone() {

    //     const clone = new ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter();
    //     Object.assign( clone, this );
    //     return clone;
    // }
}

/**
 * 
 */
const reportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent = ( 
    dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm: DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm 
) : any /* React.Component */ => {

    if ( ! dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm ) {
        throw Error("No value in dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm")
    }
    const dataRow_GetChildTable_ReturnReactComponent_Parameter = dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.dataRow_GetChildTable_ReturnReactComponent_Parameter;
    if ( ! dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
        throw Error("No value in dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    if ( ! ( dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
        throw Error("Not: dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    const dataRow_GetChildTable_ReturnReactComponentParameter = dataRow_GetChildTable_ReturnReactComponent_Parameter as ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter
    // dataRow_GetChildTable_ReturnReactComponentParameter is the value in dataTable_DataRowEntry.dataRow_GetChildTable_ReturnReactComponentParameter

    //  For this implementation, dataRow_GetChildTable_ReturnReactComponent_Parameter is not used here.

    //  Return class

    return ReportedPeptidesForSingleSearch_ChildReactComponent;
}


export { reportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent, ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter }
