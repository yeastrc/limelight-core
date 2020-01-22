/**
 * psmList_Wrapper_ChildReactComponent.tsx
 * 
 * Experiment Protein Page: Single Protein: Wrapper Component on PSM List. under Single Reported Peptide, Single Search, Single Peptide in Peptide List
 * 
 * React Component that is shown for child of single peptide and will contain child table 
 * 
 * 
 * Change of props property props.dataRow_GetChildTable_ReturnReactComponent_Parameter
 * is not coded for and will result in throw Error(...) in shouldComponentUpdate(...).
 * 
 *    * This is currently ok since the code in DataTable_Table_DataRow_State (dataTable_Table_DataRow_React.tsx)
 *      will always re-render first without this component.
 *      So this component will be unmounted and then when this component needs to be shown again it will be mounted as a new instance.
 */

import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';



 //  Data Table
 import { DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

//  This component
import { psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent, PsmList_Wrapper_For_SingleReportedPeptide_createChildTableObjects_Result } from '../js/psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent';
import { PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/psmList_Wrapper_ReturnChildReactComponent'

//  Child Component
import { psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent, PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter } from 'page_js/data_pages/data_table_react_common_child_table_components/psm_list_for_project_search_id_reported_peptide_id/js/psmList_ForProjectSearchIdReportedPeptideId_ReturnChildReactComponent';

/**
 * 
 */
export interface PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_Props {

    //  This does not change since the parent component always goes through a render cycle where this is not rendered, 
    //     resulting in this being unmounted instead of updated.
    //  shouldComponentUpdate(...) throws Error if this changes
    dataRow_GetChildTable_ReturnReactComponent_Parameter : PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
}

/**
 * 
 */
interface PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_State {

    _placeholder //  have so not have any state properties
}

/**
 * 
 */
export class PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent extends React.Component< PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_Props, PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent_State > {

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

        if ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {

            //  props dataRow_GetChildTable_ReturnReactComponent_Parameter should never change
            //    This component should unmount and then mount since the parent component should always go through a render cycle 
            //     where this component is not rendered.

            const msg = "ERROR: PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent::shouldComponentUpdate() :  prop should never change: dataRow_GetChildTable_ReturnReactComponent_Parameter.  if statement is true: if ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter ) "
            console.warn( msg );
            throw Error( msg );
            // console.log("PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent::shouldComponentUpdate() return true ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter )")
            // return true;
        }

        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */
    render () {

        // console.log("PsmList_Wrapper_For_SingleReportedPeptide_ChildReactComponent::render() called:  now: " + new Date() );

        if ( ! this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            const msg = "this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter not populated"
            console.warn( msg )
            throw Error( msg )
        }

        if ( ! ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
            const msg = "this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter not instanceof PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter"
            console.warn( msg )
            throw Error( msg )
        }
        const dataRow_GetChildTable_ReturnReactComponent_Parameter = this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter;

        const psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent_Result = psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent({ dataRow_GetChildTable_ReturnReactComponent_Parameter });
        const psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter = psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent_Result.psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter;

        const dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm = new DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm();
        dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.dataRow_GetChildTable_ReturnReactComponent_Parameter = psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter;

        const Component = psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent( dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm );

        return (
            <Component
                dataRow_GetChildTable_ReturnReactComponent_Parameter={ psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter }
            />
        );
    }

}
