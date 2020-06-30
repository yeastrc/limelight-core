/**
 * psmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent.tsx
 * 
 * Common Child Table: show PSMs for Project Search Id and Reported Peptide Id and PSM Filters and maybe PSM Ids
 * 
 * React Component that is shown for child of Data Table Row and will contain child table 
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

import { WebserviceCallStandardPost_ApiObject_Class, WebserviceCallStandardPost_ApiObject_Holder_Class } from 'page_js/webservice_call_common/webserviceCallStandardPost_ApiObject_Class';


import { DataTable_RootTableObject } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';

import { psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects, PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result, PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_PromiseResult } from '../js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects';

import { PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/psmList_ForProjectSearchIdReportedPeptideId_ReturnChildReactComponent'

/**
 * 
 */
export interface PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_Props {

    //  This does not change since the parent component always goes through a render cycle where this is not rendered, 
    //     resulting in this being unmounted instead of updated.
    //  shouldComponentUpdate(...) throws Error if this changes
    dataRow_GetChildTable_ReturnReactComponent_Parameter : PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter
}

/**
 * 
 */
interface PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_State {

    childDataTable_RootTableObject? : DataTable_RootTableObject;
  
    // _placeholder //  have so not have any state properties
}

/**
 * 
 */
export class PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent extends React.Component< PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_Props, PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_State > {

    private _dataRetrievalInProgress = false;

    private _webserviceCallStandardPost_ApiObject_Holder_Class : WebserviceCallStandardPost_ApiObject_Holder_Class = new WebserviceCallStandardPost_ApiObject_Holder_Class();

    /**
     * 
     */
    constructor(props : PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_Props) {
        super(props);

        // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::constructor() called")

        PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent._validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( props );

        // this.rowDivRef = React.createRef();

        this.state = {};
    }

    /**
     * Used to validate props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter
     * 
     * Must be Static
     * 
     */
    static _validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( props : PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_Props ) {

        if ( ! props.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not populated"
            console.warn( msg )
            throw Error( msg )
        }

        if ( ! ( props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not instanceof PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter"
            console.warn( msg )
            throw Error( msg )
        }
    }

    /**
     * Used to validate props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter
     * 
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_Props, state : PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_State ) : PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_State {

        // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::getDerivedStateFromProps() called")
        
        PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent._validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( props );

        return null;  //
    }

    /**
    * @returns true if should update, false otherwise
    */
    shouldComponentUpdate( nextProps : PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_Props, nextState : PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_State ) {

        // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::shouldComponentUpdate() called")
        
        PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent._validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( nextProps );

        //  Only update if changed: props: dataObject

        if ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {

            //  props dataRow_GetChildTable_ReturnReactComponent_Parameter should never change
            //    This component should unmount and then mount since the parent component should always go through a render cycle 
            //     where this component is not rendered.

            const msg = "ERROR: PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::shouldComponentUpdate() :  prop should never change: dataRow_GetChildTable_ReturnReactComponent_Parameter.  if statement is true: if ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter ) "
            console.warn( msg );
            throw Error( msg );
            // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::shouldComponentUpdate() return true ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter )")
            // return true;
        }
        if ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ) {

            // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::shouldComponentUpdate() return true ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ). this.state.childDataTable_RootTableObject:", this.state.childDataTable_RootTableObject )
            // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::shouldComponentUpdate() return true ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ). nextState.childDataTable_RootTableObject:", nextState.childDataTable_RootTableObject )
            return true;
        }

        // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::shouldComponentUpdate() return false")
        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */
    componentWillUnmount() : void {
        try {
            // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::componentWillUnmount() called")

            // Here:  abort any in progress ajax calls where the response would be applied to this component

            if ( this._webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class ) {
                this._webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class.abort();
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * 
     */
    componentDidMount() : void {

        // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::componentDidMount() called")
        
        //  Here:  Retrieve any data needed and set state to render the new data

        window.setTimeout( () => {
            try {
                // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::componentDidMount() inside window.setTimeout: call this._create_childDataTable_RootTableObject()")

                //  Do in new Paint Cycle so loading message shows
                this._create_childDataTable_RootTableObject();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 0 );
    }

    /**
     * 
     */
    componentDidUpdate() : void {

        // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::componentDidUpdate() called. Doing Nothing in this method")
    }

    /**
     * 
     */
    _create_childDataTable_RootTableObject() {

        // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::_create_childDataTable_RootTableObject() called")

        this._dataRetrievalInProgress = true;

        //  Checked class of dataRow_GetChildTable_ReturnReactComponent_Parameter so safe to cast it to that class

        const dataRow_GetChildTable_ReturnReactComponent_Parameter = this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter;

        // console.log( "_create_childDataTable_RootTableObject(): dataRow_GetChildTable_ReturnReactComponent_Parameter: ", dataRow_GetChildTable_ReturnReactComponent_Parameter );
        // console.log( "_create_childDataTable_RootTableObject(): dataRow_GetChildTable_ReturnReactComponent_Parameter.fakedata: ", dataRow_GetChildTable_ReturnReactComponent_Parameter.fakedata ) ;

        //  Probably AJAX call here

        const psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result : PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result = (
            
            psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects({ 
                dataRow_GetChildTable_ReturnReactComponent_Parameter,
                webserviceCallStandardPost_ApiObject_Holder_Class : this._webserviceCallStandardPost_ApiObject_Holder_Class
            })
        );

        const promise_DataTable_RootTableObject : Promise<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_PromiseResult> = psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result.promise_DataTable_RootTableObject;

        promise_DataTable_RootTableObject.catch( (reason) => {  });

        promise_DataTable_RootTableObject.then( ( promiseResult : PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_PromiseResult ) => {
            try {
                const childDataTable_RootTableObject : DataTable_RootTableObject = promiseResult.dataTable_RootTableObject;

                this._dataRetrievalInProgress = false;

                this.setState ( ( prevState : PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_State, props : PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_Props ) : PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent_State => {
                    return {  childDataTable_RootTableObject };
                });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })

    }

    /**
     * 
     */
    render () {

        // console.log("PsmList_ForProjectSearchIdReportedPeptideId_ChildReactComponent::render() called:  now: " + new Date() );

        if ( ! this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not populated"
            console.warn( msg )
            throw Error( msg )
        }

        if ( ! ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not instanceof PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter"
            console.warn( msg )
            throw Error( msg )
        }

        let childTable = undefined;
        let loadingMessage = undefined;

        if ( this.state.childDataTable_RootTableObject ) {

            childTable = (
                <div >
                    <DataTable_TableRoot 
                        tableObject={ this.state.childDataTable_RootTableObject }
                    />
                </div>
            )
        } else {
            loadingMessage = (
                <div >
                    Loading PSM Data
                </div>
            )
        }

        return (
            <React.Fragment>

                {/* One of these 2 will be displayed */}
                { childTable }
                { loadingMessage }

            </React.Fragment>
        )
    }

}
