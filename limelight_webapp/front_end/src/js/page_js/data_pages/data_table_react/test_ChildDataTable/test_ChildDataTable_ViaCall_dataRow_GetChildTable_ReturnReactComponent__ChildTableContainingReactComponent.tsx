/**
 * test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__ChildTableContainingReactComponent.tsx
 * 
 * Show Data Table Data Row Child Data Containing React Component
 */

import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


import { 
    DataTable_RootTableObject
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';

import { fake_Create_ChildTableData } from './test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__CreateChildTableDataObjects';
import { FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting } from './test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent'

/**
 * 
 */
export interface FAKE_dataRow_ChildTable_ReactComponent_Props {

    //  This does not change since the parent component always goes through a render cycle where this is not rendered, 
    //     resulting in this being unmounted instead of updated
    dataRow_GetChildTable_ReturnReactComponent_Parameter : any //  shouldComponentUpdate throws Error if this changes
}

/**
 * 
 */
interface FAKE_dataRow_ChildTable_ReactComponent_State {

    //   Not needed if have as a guard: shouldComponentUpdate throws Error if this changes
    dataRow_GetChildTable_ReturnReactComponent_Parameter? : FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting
    dataRow_GetChildTable_ReturnReactComponent_Parameter_FromProps? : FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting

    childDataTable_RootTableObject? : DataTable_RootTableObject;
  
    // _placeholder //  have so not have any state properties
}

/**
 * 
 */
export class FAKE_dataRow_ChildTable_ReactComponent extends React.Component< FAKE_dataRow_ChildTable_ReactComponent_Props, FAKE_dataRow_ChildTable_ReactComponent_State > {

    private _dataRetrievalInProgress = false;

    /**
     * 
     */
    constructor(props : FAKE_dataRow_ChildTable_ReactComponent_Props) {
        super(props);

        console.log("FAKE_dataRow_ChildTable_ReactComponent::constructor() called")

        // this.rowDivRef = React.createRef();

        this.state = {};
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : FAKE_dataRow_ChildTable_ReactComponent_Props, state : FAKE_dataRow_ChildTable_ReactComponent_State ) : FAKE_dataRow_ChildTable_ReactComponent_State {

        console.log("FAKE_dataRow_ChildTable_ReactComponent::getDerivedStateFromProps() called")
        
        if ( ! props.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not populated"
            console.warn( msg )
            throw Error( msg )
        }

        if ( ! ( props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting ) ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not instanceof FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting"
            console.warn( msg )
            throw Error( msg )
        }

        //  Return new state (like return from setState(callback)) or null

        if ( props.dataRow_GetChildTable_ReturnReactComponent_Parameter === state.dataRow_GetChildTable_ReturnReactComponent_Parameter_FromProps  ) {
            //  No changes so just return

            console.log("FAKE_dataRow_ChildTable_ReactComponent::getDerivedStateFromProps() return null ( props.dataRow_GetChildTable_ReturnReactComponent_Parameter === state.dataRow_GetChildTable_ReturnReactComponent_Parameter_FromProps )")
        
            return null;  //
        }

        console.log("FAKE_dataRow_ChildTable_ReactComponent::getDerivedStateFromProps() return object: props.dataRow_GetChildTable_ReturnReactComponent_Parameter: ", props.dataRow_GetChildTable_ReturnReactComponent_Parameter )
        

        //  Props props.dataObject.dataRow_GetChildTableDataParameter or props.tableOptions changed so clear child table (clear childDataTable_RootTableObject and displayChildTable)
        return {
            dataRow_GetChildTable_ReturnReactComponent_Parameter : props.dataRow_GetChildTable_ReturnReactComponent_Parameter,
            dataRow_GetChildTable_ReturnReactComponent_Parameter_FromProps : props.dataRow_GetChildTable_ReturnReactComponent_Parameter,
            childDataTable_RootTableObject : null
        };
    }

    /**
    * @returns true if should update, false otherwise
    */
    shouldComponentUpdate( nextProps : FAKE_dataRow_ChildTable_ReactComponent_Props, nextState : FAKE_dataRow_ChildTable_ReactComponent_State ) {

        console.log("FAKE_dataRow_ChildTable_ReactComponent::shouldComponentUpdate() called")
        
        // console.log("FAKE_dataRow_ChildTable_ReactComponent: shouldComponentUpdate")

        //  Only update if changed: props: dataObject

        if ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {

            //  props dataRow_GetChildTable_ReturnReactComponent_Parameter should never change
            //    This component should unmount and then mount since the parent component should always go through a render cycle 
            //     where this component is not rendered.

            const msg = "ERROR: FAKE_dataRow_ChildTable_ReactComponent::shouldComponentUpdate() :  prop should never change: dataRow_GetChildTable_ReturnReactComponent_Parameter.  if statement is true: if ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter ) "
            console.warn( msg );
            throw Error( msg );
            // console.log("FAKE_dataRow_ChildTable_ReactComponent::shouldComponentUpdate() return true ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter )")
            // return true;
        }
        if ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ) {

            console.log("FAKE_dataRow_ChildTable_ReactComponent::shouldComponentUpdate() return true ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ). this.state.childDataTable_RootTableObject:", this.state.childDataTable_RootTableObject )
            console.log("FAKE_dataRow_ChildTable_ReactComponent::shouldComponentUpdate() return true ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ). nextState.childDataTable_RootTableObject:", nextState.childDataTable_RootTableObject )
            return true;
        }

        console.log("FAKE_dataRow_ChildTable_ReactComponent::shouldComponentUpdate() return false")
        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */
    componentWillUnmount() : void {

        console.log("FAKE_dataRow_ChildTable_ReactComponent::componentWillUnmount() called")

        // Here:  abort any in progress ajax calls where the response would be applied to this component
    }

    /**
     * 
     */
    componentDidMount() : void {

        console.log("FAKE_dataRow_ChildTable_ReactComponent::componentDidMount() called")
        
        //  Here:  Retrieve any data needed and set state to render the new data

        window.setTimeout( () => {
            try {
                console.log("FAKE_dataRow_ChildTable_ReactComponent::componentDidMount() inside window.setTimeout: call this._create_childDataTable_RootTableObject()")

                //  Do in new Paint Cycle so loading message shows
                this._create_childDataTable_RootTableObject();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 5000 ); // 5 second delay to show loading message
    }

    /**
     * 
     */
    componentDidUpdate() : void {

        console.log("FAKE_dataRow_ChildTable_ReactComponent::componentDidUpdate() called")
        
        //  Here:  Retrieve any data needed and set state to render the new data, if data retrieval not already in progress

        //  If no table and data retrieval not already in progress, populate the state object for the data table
        if ( ( ! this.state.childDataTable_RootTableObject ) && ( ! this._dataRetrievalInProgress ) ) {fetch

            // Check this._dataRetrievalInProgress so that any other re-render doesn't cause another retrieval of the data

            window.setTimeout( () => {
                try {
                    console.log("FAKE_dataRow_ChildTable_ReactComponent::componentDidUpdate() inside window.setTimeout: call this._create_childDataTable_RootTableObject()")

                    //  Do in new Paint Cycle so loading message shows
                    this._create_childDataTable_RootTableObject();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 5000 ); // 5 second delay to show loading message
        }
    }

    /**
     * 
     */
    _create_childDataTable_RootTableObject() {

        console.log("FAKE_dataRow_ChildTable_ReactComponent::_create_childDataTable_RootTableObject() called")

        if ( ! this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not populated"
            console.warn( msg )
            throw Error( msg )
        }

        if ( ! ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting ) ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not instanceof FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting"
            console.warn( msg )
            throw Error( msg )
        }

        this._dataRetrievalInProgress = true;

        //  Checked class of dataRow_GetChildTable_ReturnReactComponent_Parameter so safe to cast it to that class

        const dataRow_GetChildTable_ReturnReactComponent_Parameter = this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter as FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting;

        console.log( "_create_childDataTable_RootTableObject(): dataRow_GetChildTable_ReturnReactComponent_Parameter: ", dataRow_GetChildTable_ReturnReactComponent_Parameter );
        console.log( "_create_childDataTable_RootTableObject(): dataRow_GetChildTable_ReturnReactComponent_Parameter.fakedata: ", dataRow_GetChildTable_ReturnReactComponent_Parameter.fakedata ) ;

        //  Probably AJAX call here

        const childDataTable_RootTableObject : DataTable_RootTableObject = fake_Create_ChildTableData();

        this._dataRetrievalInProgress = false;
        
        this.setState ( ( prevState : FAKE_dataRow_ChildTable_ReactComponent_State, props : FAKE_dataRow_ChildTable_ReactComponent_Props ) : FAKE_dataRow_ChildTable_ReactComponent_State => {
            return {  childDataTable_RootTableObject };
        });
    }

    /**
     * 
     */
    render () {

        console.log("FAKE_dataRow_ChildTable_ReactComponent::render() called:  now: " + new Date() );

        if ( ! this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not populated"
            console.warn( msg )
            throw Error( msg )
        }

        if ( ! ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting ) ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not instanceof FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting"
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
                    Loading (5 second fake delay using setTimeout before show data table)
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
