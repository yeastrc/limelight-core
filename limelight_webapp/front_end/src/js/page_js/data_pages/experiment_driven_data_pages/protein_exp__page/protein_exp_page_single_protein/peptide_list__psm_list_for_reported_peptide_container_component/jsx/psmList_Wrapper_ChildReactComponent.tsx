/**
 * psmList_Wrapper_ChildReactComponent.tsx
 * 
 * Experiment Protein Page: Single Protein: Wrapper Component on PSM List. under Single Reported Peptide, Single Search, Single Peptide in Peptide List
 * 
 * React Component that is shown for child of single peptide and will contain child table 
 * 
 * 
 * Change of props property props.psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter
 * is not coded for and will result in throw Error(...) in shouldComponentUpdate(...).
 * 
 *    * This is currently ok since the code in DataTable_Table_DataRow_State (dataTable_Table_DataRow_React.tsx)
 *      will always re-render first without this component.
 *      So this component will be unmounted and then when this component needs to be shown again it will be mounted as a new instance.
 */

import React from 'react'

//  This component

//  Child Component
import {PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_for_project_search_id_reported_peptide_id/jsx/psmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent";
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {DataTable_DataRowEntry__Get_RowChildContent_CallParams} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__psm_list_for_reported_peptide_container_component/js/psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";


/**
 *
 */
export class PsmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter {

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
     * Used as class for object placed in data row object property psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter
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
export const psmList_Wrapper__Get_RowChildContent_Return_ChildContent = function (
    {
        psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter,
        dataTable_DataRowEntry__Get_RowChildContent_CallParams
    } : {
        psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter : PsmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter
        dataTable_DataRowEntry__Get_RowChildContent_CallParams : DataTable_DataRowEntry__Get_RowChildContent_CallParams
    }) : {
    jsxElement: JSX.Element
} {

    const jsxElement = (
        <PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent
            psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter={ psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter }
        />
    )

    return { jsxElement }
}

/**
 * 
 */
interface PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_Props {

    //  This does not change since the parent component always goes through a render cycle where this is not rendered, 
    //     resulting in this being unmounted instead of updated.
    //  shouldComponentUpdate(...) throws Error if this changes
    psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter : PsmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter
}

/**
 * 
 */
interface PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_State {

    _placeholder: any //  have so not have any state properties
}

/**
 * 
 */
class PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent extends React.Component< PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_Props, PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_State > {

    /**
     * 
     */
    constructor(props : PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_Props) {
        super(props);

        // console.log("PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent::constructor() called")

        // this.rowDivRef = React.createRef();

        // this.state = {};
    }

    /**
    * @returns true if should update, false otherwise
    */
    shouldComponentUpdate( nextProps : PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_Props, nextState : PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_State ) {

        // console.log("PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent::shouldComponentUpdate() called")
        
        //  Error  if changed: props:

        if ( this.props.psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter !== nextProps.psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter ) {

            //  props psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter should never change
            //    This component should unmount and then mount since the parent component should always go through a render cycle 
            //     where this component is not rendered.

            const msg = "ERROR: PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent::shouldComponentUpdate() :  prop should never change: psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter.  if statement is true: if ( this.props.psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter !== nextProps.psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter ) "
            console.warn( msg );
            throw Error( msg );
            // console.log("PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent::shouldComponentUpdate() return true ( this.props.psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter !== nextProps.psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter )")
            // return true;
        }

        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */
    render () {

        //  Make and populate prop value to pass to child Component

        const psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent_Result =
            psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent({
                psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter : this.props.psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter
            });
        const psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter = psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent_Result.psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter;


        return (
            <PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent
                dataRow_GetChildTable_ReturnReactComponent_Parameter={ psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter }
            />
        );
    }

}
