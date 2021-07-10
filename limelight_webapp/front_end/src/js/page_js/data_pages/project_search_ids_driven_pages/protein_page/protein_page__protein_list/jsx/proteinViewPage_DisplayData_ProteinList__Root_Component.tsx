/**
 * proteinViewPage_DisplayData_ProteinList_Root_Component.tsx
 *
 * Root of Protein Page - inserted into <div> with id 'main_protein_view_outer_block_react_root_container' in
 *
 */


import React from 'react'
import {
    ProteinViewPage_DisplayData_ProteinList__Main_Component,
    ProteinViewPage_DisplayData_ProteinList__Main_Component_Props_Prop
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__Main_Component.tsx";

/////////////////////////

/**
 *
 */
export interface ProteinViewPage_DisplayData_ProteinList__Root_Component_Props {

    propsValue : ProteinViewPage_DisplayData_ProteinList__Main_Component_Props_Prop
}

/**
 *
 */
interface ProteinViewPage_DisplayData_ProteinList__Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class ProteinViewPage_DisplayData_ProteinList__Root_Component extends React.Component< ProteinViewPage_DisplayData_ProteinList__Root_Component_Props, ProteinViewPage_DisplayData_ProteinList__Root_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props : ProteinViewPage_DisplayData_ProteinList__Root_Component_Props) {
        super(props);

        this.state = {
        };
    }

    /**
     *
     */
    static getDerivedStateFromError( error : any ) : ProteinViewPage_DisplayData_ProteinList__Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     *
     */
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ProteinViewPage_DisplayData_ProteinList_Root_Component'. componentDidCatch: ", error, errorInfo );
        // logErrorToMyService(error, errorInfo);
    }

    /**
     *
     */
    // componentDidMount() {
    //
    // }

    /**
     *
     */
    // componentWillUnmount() {
    //
    // }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        let component_SubTree_ErrorMessage : JSX.Element = undefined;

        let mainContent : JSX.Element = undefined;


        if ( this.state.component_SubTree_Has_Error ) {

            component_SubTree_ErrorMessage = (

                <div >An Error has Occurred.  Please reload the page and try again.</div>
            );

        } else {

            mainContent = (
                <ProteinViewPage_DisplayData_ProteinList__Main_Component
                    propsValue={ this.props.propsValue }
                />
            );
        }

        return (
            <div >
                { component_SubTree_ErrorMessage }
                { mainContent }
            </div>
        );
    }

}

