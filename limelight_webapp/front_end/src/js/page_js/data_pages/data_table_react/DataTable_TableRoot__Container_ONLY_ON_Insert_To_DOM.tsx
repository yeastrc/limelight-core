/**
 * DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM__Container_ONLY_ON_Insert_To_DOM.tsx
 *
 *   !!!  DO NOT USE THIS if <DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM> is contained by another
 *
 *   !!! USE ONLY used if using function create_dataTable_Root_React in dataTable_TableRoot_React_Create_Remove_Table_DOM.ts
 *          to insert component <DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM> into the DOM.
 *
 *  Container for Table Root <DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM>
 *
 *  This container provides Error Boundary code.
 *
 *
 */


import React from "react";
import {DataTable_RootTableObject} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";

/**
 *
 */
export interface DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM_Props {
    tableObject : DataTable_RootTableObject
    resortTableOnUpdate? : boolean //  Use with care - When tableObject property changes, apply existing sort columns to it.  This requires that the same table column identifiers are in the new table.
}

/**
 *
 */
interface DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM_State {

    component_SubTree_Has_Error? : boolean
}

/**
 * Data Table Container
 *
 * For stand alone Data Table in DOM (Not enclosed by a React Managed element)
 * it is recommended to use the functions create_dataTable_Root_React, remove_dataTable_Root_React
 * in the file dataTable_TableRoot_React_Create_Remove_Table_DOM.ts
 * to Create and Remove the Data Table to/from the DOM
 */
export class DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM extends React.Component< DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM_Props, DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM_State > {

    /**
     *
     */
    constructor(props : DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM_Props) {
        super(props);

        this.state = {};
    }

    /**
     *
     */
    static getDerivedStateFromError(error: any): DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM_State {
        // Update state so the next render will show the fallback UI.
        return {component_SubTree_Has_Error: true};
    }

    /**
     *
     */
    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'DataTable_TableRoot__Container_ONLY_ON_Insert_To_DOM'. componentDidCatch: ", error, errorInfo);
        // logErrorToMyService(error, errorInfo);


        // } catch( e ) {
        //     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        //     throw e;
        // }
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        let component_SubTree_ErrorMessage : React.JSX.Element = undefined;

        let mainContent : React.JSX.Element = undefined;


        if ( this.state.component_SubTree_Has_Error ) {

            component_SubTree_ErrorMessage = (

                <div style={ { fontWeight : "bold", fontSize : 18 } }>An Error has Occurred.  Please reload the page and try again.</div>
            );

        } else {

            mainContent = (
                <DataTable_TableRoot
                    tableObject={ this.props.tableObject }
                    resortTableOnUpdate={ this.props.resortTableOnUpdate }
                />
            )
        }

        return (
            ( component_SubTree_ErrorMessage ) ? (
                component_SubTree_ErrorMessage
            ) : (
                mainContent
            )
        )

    }

}