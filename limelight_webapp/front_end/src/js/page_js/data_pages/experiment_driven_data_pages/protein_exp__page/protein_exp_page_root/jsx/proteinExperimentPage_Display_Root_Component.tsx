/**
 * proteinExperimentPage_Display_Root_Component.tsx
 * 
 * Root of Protein Experiment Page - inserted into <div> with id '???' in
 * 
 */


import React from 'react'

import {
    ProteinExperimentPage_Display_MainContent_Component,
    ProteinExperimentPage_Display_MainContent_Component_Props_Prop
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/jsx/proteinExperimentPage_Display_MainContent_Component";



/////////////////////////

/**
 *
 */
export interface ProteinExperimentPage_Display_Root_Component_Props {

    propsValue : ProteinExperimentPage_Display_MainContent_Component_Props_Prop
}

/**
 * 
 */
interface ProteinExperimentPage_Display_Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 * 
 */
export class ProteinExperimentPage_Display_Root_Component extends React.Component< ProteinExperimentPage_Display_Root_Component_Props, ProteinExperimentPage_Display_Root_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     * 
     */    
    constructor(props : ProteinExperimentPage_Display_Root_Component_Props) {
        super(props);

        this.state = { 
        };
    }

    /**
     * 
     */ 
    static getDerivedStateFromError( error : any ) : ProteinExperimentPage_Display_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     * 
     */ 
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ProteinExperimentPage_Display_Root_Component'. componentDidCatch: ", error, errorInfo );
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
                <ProteinExperimentPage_Display_MainContent_Component
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

