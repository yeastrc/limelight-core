/**
 * peptideExperimentPage_Display_Root_Component.tsx
 * 
 * Root of Peptide Experiment Page - inserted into <div> with id '???' in
 * 
 */


import React from 'react'

import {
    PeptideExperimentPage_Display_MainContent_Component,
    PeptideExperimentPage_Display_MainContent_Component_Props_Prop
} from "page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/jsx/peptideExperimentPage_Display_MainContent_Component";



/////////////////////////

/**
 *
 */
export interface PeptideExperimentPage_Display_Root_Component_Props {

    propsValue : PeptideExperimentPage_Display_MainContent_Component_Props_Prop
}

/**
 * 
 */
interface PeptideExperimentPage_Display_Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 * 
 */
export class PeptideExperimentPage_Display_Root_Component extends React.Component< PeptideExperimentPage_Display_Root_Component_Props, PeptideExperimentPage_Display_Root_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     * 
     */    
    constructor(props : PeptideExperimentPage_Display_Root_Component_Props) {
        super(props);

        this.state = { 
        };
    }

    /**
     * 
     */ 
    static getDerivedStateFromError( error : any ) : PeptideExperimentPage_Display_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     * 
     */ 
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'PeptideExperimentPage_Display_Root_Component'. componentDidCatch: ", error, errorInfo );
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
                <PeptideExperimentPage_Display_MainContent_Component
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

