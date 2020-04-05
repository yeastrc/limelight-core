/**
 * proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent.tsx
 * 
 * Protein Page: Multiple Search : Single Protein: show searches for Generated Single Peptide in Peptide List
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

 ////    !!!!!!!  No Import for CreateReportedPeptideDisplayData_Result_Entry


import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


import { DataTable_RootTableObject } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';

import { proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects } from '../js/proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_createChildTableObjects';
import { ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ReturnChildReactComponent'

/**
 * 
 */
export interface ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_Props {

    //  This does not change since the parent component always goes through a render cycle where this is not rendered, 
    //     resulting in this being unmounted instead of updated.
    //  shouldComponentUpdate(...) throws Error if this changes
    dataRow_GetChildTable_ReturnReactComponent_Parameter : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
}

/**
 * 
 */
interface ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_State {

    childDataTable_RootTableObject? : DataTable_RootTableObject;
  
    // _placeholder //  have so not have any state properties
}

/**
 * 
 */
export class ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent extends React.Component< ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_Props, ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_State > {

    private _dataRetrievalInProgress = false;

    /**
     * 
     */
    constructor(props : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_Props) {
        super(props);

        // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::constructor() called")

        ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent._validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( props );

        // this.rowDivRef = React.createRef();

        this.state = {};
    }

    /**
     * Used to validate props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
     * 
     * Must be Static
     * 
     */
    static _validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( props : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_Props ) {

        if ( ! props.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not populated"
            console.warn( msg )
            throw Error( msg )
        }

        if ( ! ( props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not instanceof ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter"
            console.warn( msg )
            throw Error( msg )
        }
    }

    /**
     * Used to validate props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
     * 
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_Props, state : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_State ) : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_State {

        // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::getDerivedStateFromProps() called")
        
        ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent._validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( props );

        return null;  //
    }

    /**
    * @returns true if should update, false otherwise
    */
    shouldComponentUpdate( nextProps : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_Props, nextState : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_State ) {

        // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::shouldComponentUpdate() called")
        
        ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent._validate_props__dataRow_GetChildTable_ReturnReactComponent_Parameter__isCorrectClass( nextProps );

        //  Only update if changed: props: dataObject

        if ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {

            //  props dataRow_GetChildTable_ReturnReactComponent_Parameter should never change
            //    This component should unmount and then mount since the parent component should always go through a render cycle 
            //     where this component is not rendered.

            const msg = "ERROR: ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::shouldComponentUpdate() :  prop should never change: dataRow_GetChildTable_ReturnReactComponent_Parameter.  if statement is true: if ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter ) "
            console.warn( msg );
            throw Error( msg );
            // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::shouldComponentUpdate() return true ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter !== nextProps.dataRow_GetChildTable_ReturnReactComponent_Parameter )")
            // return true;
        }
        if ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ) {

            // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::shouldComponentUpdate() return true ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ). this.state.childDataTable_RootTableObject:", this.state.childDataTable_RootTableObject )
            // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::shouldComponentUpdate() return true ( this.state.childDataTable_RootTableObject !== nextState.childDataTable_RootTableObject ). nextState.childDataTable_RootTableObject:", nextState.childDataTable_RootTableObject )
            return true;
        }

        // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::shouldComponentUpdate() return false")
        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */
    componentWillUnmount() : void {

        // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::componentWillUnmount() called")

        // Here:  abort any in progress ajax calls where the response would be applied to this component
    }

    /**
     * 
     */
    componentDidMount() : void {

        // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::componentDidMount() called")

        this._create_childDataTable_RootTableObject();
        
        //  Here:  Retrieve any data needed and set state to render the new data

        // window.setTimeout( () => {
        //     try {
        //         console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::componentDidMount() inside window.setTimeout: call this._create_childDataTable_RootTableObject()")

        //         //  Do in new Paint Cycle so loading message shows
        //         this._create_childDataTable_RootTableObject();

        //     } catch( e ) {
        //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        //         throw e;
        //     }
        // }, 5000 ); // 5 second delay to show loading message
    }

    /**
     * 
     */
    componentDidUpdate() : void {

        // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::componentDidUpdate() called.  Doing nothing in this method")
        
        //  Here:  Retrieve any data needed and set state to render the new data, if data retrieval not already in progress

        //  If no table and data retrieval not already in progress, populate the state object for the data table
        // if ( ( ! this.state.childDataTable_RootTableObject ) && ( ! this._dataRetrievalInProgress ) ) {fetch

        //     // Check this._dataRetrievalInProgress so that any other re-render doesn't cause another retrieval of the data

        //     window.setTimeout( () => {
        //         try {
        //             console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::componentDidUpdate() inside window.setTimeout: call this._create_childDataTable_RootTableObject()")

        //             //  Do in new Paint Cycle so loading message shows
        //             this._create_childDataTable_RootTableObject();

        //         } catch( e ) {
        //             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        //             throw e;
        //         }
        //     }, 5000 ); // 5 second delay to show loading message
        // }
    }

    /**
     * 
     */
    _create_childDataTable_RootTableObject() {

        // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::_create_childDataTable_RootTableObject() called")

        this._dataRetrievalInProgress = true;

        //  Checked class of dataRow_GetChildTable_ReturnReactComponent_Parameter so safe to cast it to that class

        const dataRow_GetChildTable_ReturnReactComponent_Parameter = this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter;

        // console.log( "_create_childDataTable_RootTableObject(): dataRow_GetChildTable_ReturnReactComponent_Parameter: ", dataRow_GetChildTable_ReturnReactComponent_Parameter );
        // console.log( "_create_childDataTable_RootTableObject(): dataRow_GetChildTable_ReturnReactComponent_Parameter.fakedata: ", dataRow_GetChildTable_ReturnReactComponent_Parameter.fakedata ) ;

        //  Probably AJAX call here

        const childDataTable_RootTableObject : DataTable_RootTableObject = proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects({ dataRow_GetChildTable_ReturnReactComponent_Parameter : this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter });

        this._dataRetrievalInProgress = false;
        
        this.setState ( ( prevState : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_State, props : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_Props ) : ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent_State => {
            return {  childDataTable_RootTableObject };
        });
    }

    /**
     * 
     */
    render () {

        // console.log("ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide_ChildReactComponent::render() called:  now: " + new Date() );

        if ( ! this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not populated"
            console.warn( msg )
            throw Error( msg )
        }

        if ( ! ( this.props.dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
            const msg = "props.dataRow_GetChildTable_ReturnReactComponent_Parameter not instanceof ProteinPage_SingleProtein_searchesForGeneratedSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter"
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
                    {/* Loading (5 second fake delay using setTimeout before show data table) */}
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
