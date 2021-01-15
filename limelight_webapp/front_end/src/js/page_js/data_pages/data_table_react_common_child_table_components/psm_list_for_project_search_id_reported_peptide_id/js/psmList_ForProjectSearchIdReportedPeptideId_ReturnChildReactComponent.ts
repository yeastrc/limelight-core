/**
 * psmList_ForProjectSearchIdReportedPeptideId_ReturnChildReactComponent.ts
 * 
 * Common Child Table: show PSMs for Project Search Id and Reported Peptide Id and PSM Filters and maybe PSM Ids
 * 
 * Return React Component that is shown for child of Data Table Row and will contain child table 
 */


//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts


 //  Data Table
import { DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

//  React Component that will be returned
import { PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent } from '../jsx/psmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent';
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";



/**
 * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
 */
class PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter {
    
    projectSearchId : number
    reportedPeptideId : number                                      // NOT required if have psmIds_Include
    openModPositionOverride : any
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    dataPageStateManager : DataPageStateManager
    psmIds_Include : ReadonlySet<number> // Optional
    alwaysShow_ReporterIonMasses_Column? : boolean

    /**
     * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
     */
    constructor({ 
        
        projectSearchId,
        reportedPeptideId,    // NOT required if have psmIds_Include
        searchDataLookupParamsRoot,
        dataPageStateManager,
        psmIds_Include,
        openModPositionOverride

    } : { 
        projectSearchId : number
        reportedPeptideId : number    // NOT required if have psmIds_Include
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        dataPageStateManager : DataPageStateManager
        psmIds_Include? : ReadonlySet<number> // Optional
        openModPositionOverride? : any  // optional
    }) {

        this.projectSearchId = projectSearchId;
        this.reportedPeptideId = reportedPeptideId;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.dataPageStateManager = dataPageStateManager;
        this.psmIds_Include = psmIds_Include;
        this.openModPositionOverride = openModPositionOverride;
    }


    // shallowClone() {

    //     const clone = new PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter();
    //     Object.assign( clone, this );
    //     return clone;
    // }
}

/**
 * 
 */
const psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent = ( 
    dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm: DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm 
) : any /* React.Component */ => {

    if ( ! dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm ) {
        throw Error("No value in dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm")
    }
    const dataRow_GetChildTable_ReturnReactComponent_Parameter = dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.dataRow_GetChildTable_ReturnReactComponent_Parameter;
    if ( ! dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
        throw Error("No value in dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    if ( ! ( dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
        throw Error("Not: dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    const dataRow_GetChildTable_ReturnReactComponentParameter = dataRow_GetChildTable_ReturnReactComponent_Parameter as PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter
    // dataRow_GetChildTable_ReturnReactComponentParameter is the value in dataTable_DataRowEntry.dataRow_GetChildTable_ReturnReactComponentParameter
    
    //  For this implementation, dataRow_GetChildTable_ReturnReactComponent_Parameter is not used here.

    //  Return class

    return PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent;
}


export { psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent, PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter }
