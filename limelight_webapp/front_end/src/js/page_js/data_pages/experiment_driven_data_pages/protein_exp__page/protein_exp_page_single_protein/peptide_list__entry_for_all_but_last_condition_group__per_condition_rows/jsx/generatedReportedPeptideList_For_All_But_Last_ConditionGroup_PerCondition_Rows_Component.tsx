/**
 * generatedReportedPeptideList_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component.tsx
 * 
 * Protein Experiment Page - Single Protein - Reported Peptide List section - 
 *  * Experiment Protein Page: Single Protein: for Single Peptide in Peptide List, All BUT "Bottom condition Group" before show Searches
 * 
 *     show a nested table where rows are conditions and columns for PSM counts are for conditions in child condition group for each of conditions 
 */

import React from 'react'

// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';

import { ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/generatedReportedPeptideList_For_All_But_Last_ConditionGroup_PerCondition_Rows_ReturnChildReactComponent';

import { createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup, GetDataTableDataObjects_All_But_Last_ConditionGroup_Result } from '../js/generatedReportedPeptideList_For_All_But_Last_ConditionGroup_PerCondition_Rows_CreateListData';


/**
 * 
 */
export interface ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_Props {

    //  This does not change since the parent component always goes through a render cycle where this is not rendered, 
    //     resulting in this being unmounted instead of updated.
    //  shouldComponentUpdate(...) throws Error if this changes
    dataRow_GetChildTable_ReturnReactComponent_Parameter : ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter
}

/**
 * 
 */
interface ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_State {

    _placeholder //  have so not have any state properties
}

/**
 * 
 */
export class ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component extends React.Component< ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_Props, ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_State > {

    /**
     * 
     */
    constructor(props : ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_Props) {
        super(props);

        // console.log("ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component::constructor() called")

        ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component._validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( props );

        // this.rowDivRef = React.createRef();

        // this.state = {};
    }

    /**
     * Used to validate props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter
     * 
     * Must be Static
     * 
     */
    static _validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( props : ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_Props ) {

        if ( ! props.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not populated"
            console.warn( msg )
            throw Error( msg )
        }

        if ( ! ( props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not instanceof ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter"
            console.warn( msg )
            throw Error( msg )
        }
    }

    // /**
    //  * Used to validate props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter
    //  * 
    //  * Must be Static
    //  * Called before 
    //  *   Initial render: 'render()'
    //  *   Rerender : 'shouldComponentUpdate()'
    //  * 
    //  * Return new state (like return from setState(callback)) or null
    //  */
    // static getDerivedStateFromProps( props : ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_Props, state : ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_State ) : ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_State {

    //     // console.log("ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component::getDerivedStateFromProps() called")
        
    //     ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component._validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( props );

    //     return null;  //
    // }

    /**
    * @returns true if should update, false otherwise
    */
    shouldComponentUpdate( nextProps : ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_Props, nextState : ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component_State ) {

        // console.log("ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component::shouldComponentUpdate() called")
        
        ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component._validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( nextProps );

        //  Only update if changed: props: dataObject

        if ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {

            //  props dataRow_GetChildTable_ReturnReactComponent_Parameter should never change
            //    This component should unmount and then mount since the parent component should always go through a render cycle 
            //     where this component is not rendered.

            const msg = "ERROR: ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component::shouldComponentUpdate() :  prop should never change: dataRow_GetChildTable_ReturnReactComponent_Parameter.  if statement is true: if ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter ) "
            console.warn( msg );
            throw Error( msg );
            // console.log("ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component::shouldComponentUpdate() return true ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter )")
            // return true;
        }

        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */
    // componentWillUnmount() : void {

    //     // console.log("ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component::componentWillUnmount() called")

    //     // Here:  abort any in progress ajax calls where the response would be applied to this component
    // }

    /**
     * 
     */
    // componentDidMount() : void {

    //     // console.log("ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component::componentDidMount() called")
    // }

    /**
     * 
     */
    // componentDidUpdate() : void {

    //     // console.log("ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component::componentDidUpdate() called. Doing nothing in this method")
    // }

    /**
     * 
     */
    render () {

        // console.log("ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows_Component::render() called:  now: " + new Date() );

        if ( ! this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not populated"
            console.warn( msg )
            throw Error( msg )
        }

        if ( ! ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not instanceof ForSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter"
            console.warn( msg )
            throw Error( msg )
        }

        const getDataTableDataObjects_Result : GetDataTableDataObjects_All_But_Last_ConditionGroup_Result = createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup({ 
            forSinglePeptide_For_All_But_Last_ConditionGroup_PerCondition_Rows__dataRow_GetChildTable_ReturnReactComponent_Parameter : this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter
        });

        const childDataTable_RootTableObject = getDataTableDataObjects_Result.dataTable_RootTableObject;

        return (
            <div >
                <DataTable_TableRoot 
                    tableObject={ childDataTable_RootTableObject }
                />
            </div>
        )
    }

}
