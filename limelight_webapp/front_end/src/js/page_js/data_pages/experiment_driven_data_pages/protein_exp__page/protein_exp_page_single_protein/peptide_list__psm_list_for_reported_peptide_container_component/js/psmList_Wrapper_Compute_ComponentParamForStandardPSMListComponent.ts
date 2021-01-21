/**
 * psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent.ts
 * 
 * Experiment Protein Page: Single Protein: Wrapper of PSM List for Single Reported Peptide, Single Search, Peptide in Peptide List
 * 
 * Create     DataTable_RootTableObject for child table
 */

import { PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/psmList_Wrapper_ReturnChildReactComponent'

//  Contained PSM List component
import { PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter } from 'page_js/data_pages/data_table_react_common_child_table_components/psm_list_for_project_search_id_reported_peptide_id/js/psmList_ForProjectSearchIdReportedPeptideId_ReturnChildReactComponent';

/**
 * returned from reportedPeptidesForSingleSearch_createChildTableObjects
 */
export class PsmList_Wrapper_For_SingleReportedPeptide_createChildTableObjects_Result {

    psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter : PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter
}

/**
 * 
 * @returns PsmList_Wrapper_For_SingleReportedPeptide_createChildTableObjects_Result
 */
export const psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent = ({

    dataRow_GetChildTable_ReturnReactComponent_Parameter
} : {
    dataRow_GetChildTable_ReturnReactComponent_Parameter : PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter

}) : PsmList_Wrapper_For_SingleReportedPeptide_createChildTableObjects_Result => {

    const projectSearchId = dataRow_GetChildTable_ReturnReactComponent_Parameter.projectSearchId;
    const reportedPeptideId = dataRow_GetChildTable_ReturnReactComponent_Parameter.reportedPeptideId;
    const searchSubGroupId = dataRow_GetChildTable_ReturnReactComponent_Parameter.searchSubGroupId;
    const proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = dataRow_GetChildTable_ReturnReactComponent_Parameter.proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
    const loadedDataPerProjectSearchIdHolder = dataRow_GetChildTable_ReturnReactComponent_Parameter.loadedDataPerProjectSearchIdHolder

    const searchDataLookupParamsRoot = dataRow_GetChildTable_ReturnReactComponent_Parameter.searchDataLookupParamsRoot;
    const dataPageStateManager = dataRow_GetChildTable_ReturnReactComponent_Parameter.dataPageStateManager;


    const psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter = new PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter({
        projectSearchId,
        reportedPeptideId,
        searchSubGroupId,
        searchDataLookupParamsRoot,
        psmIds_Include : proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include,
        dataPageStateManager
    });

    const result = new PsmList_Wrapper_For_SingleReportedPeptide_createChildTableObjects_Result();
    result.psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter = psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter;

    return result;

}

