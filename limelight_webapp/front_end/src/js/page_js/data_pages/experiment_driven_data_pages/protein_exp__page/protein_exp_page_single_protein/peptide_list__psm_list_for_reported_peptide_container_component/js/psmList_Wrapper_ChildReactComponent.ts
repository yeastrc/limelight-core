/**
 * psmList_Wrapper_ChildReactComponent.ts
 * 
 * Experiment Protein Page: Single Protein: Wrapper Component on PSM List. under Single Reported Peptide, Single Search, Single Peptide in Peptide List
 * 
 * React Component that is shown for child of single peptide and will contain child table 
 * 
 * 
 * Change of props property props.psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter
 * is not coded for and will result in throw Error(...) in shouldComponentUpdate(...).
 * 
 *    * This is currently ok since the code in DataTable_Table_DataRow_State (dataTable_Table_DataRow_React.tsx)
 *      will always re-render first without this component.
 *      So this component will be unmounted and then when this component needs to be shown again it will be mounted as a new instance.
 */

//  This component

//  Child Component
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    DataTable_RootTableObject
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects,
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_for_project_search_id_reported_peptide_id/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";


/**
 *
 */
export class PsmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter {

    projectSearchId : number
    reportedPeptideId : number
    searchSubGroupId : number  // Optional
    proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager
    forMultipleSearchesPage : boolean  // Always True for Experiment

    /**
     * Used as class for object placed in data row object property psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter
     */
    constructor(
        {
            projectSearchId,
            reportedPeptideId,
            searchSubGroupId,  // Optional
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
            searchDataLookupParamsRoot,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            dataPageStateManager,
            forMultipleSearchesPage  // Always True for Experiment
        } : {
            projectSearchId : number
            reportedPeptideId : number
            searchSubGroupId : number  // Optional
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root
            loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
            dataPageStateManager : DataPageStateManager
            forMultipleSearchesPage : boolean  // Always True for Experiment
        }) {

        this.projectSearchId = projectSearchId;
        this.reportedPeptideId = reportedPeptideId;
        this.searchSubGroupId = searchSubGroupId;
        this.proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
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
export const psmList_Wrapper__Get_RowChildDataTable = function (
    {
        psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter
    } : {
        psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter : PsmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter
    }) :
    Promise<DataTable_RootTableObject> {

    const projectSearchId = psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter.projectSearchId;
    const reportedPeptideId = psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter.reportedPeptideId;
    const searchSubGroupId = psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter.searchSubGroupId;
    const proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter.proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
    const loadedDataPerProjectSearchIdHolder = psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter.loadedDataPerProjectSearchIdHolder

    const searchDataLookupParamsRoot = psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter.searchDataLookupParamsRoot;
    const dataPageStateManager = psmList_Wrapper__Get_RowChildContent_Return_ChildDataTableObject_Parameter.dataPageStateManager;


    const psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter = new PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter({
        projectSearchId,
        reportedPeptideId,
        searchSubGroupId,
        searchDataLookupParamsRoot,
        psmIds_Include: proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include,
        dataPageStateManager
    });

    return psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects({params: psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter})
}
