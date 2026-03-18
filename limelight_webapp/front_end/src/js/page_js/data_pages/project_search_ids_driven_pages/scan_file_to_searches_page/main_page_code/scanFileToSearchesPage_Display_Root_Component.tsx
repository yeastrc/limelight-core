/**
 * scanFileToSearchesPage_Display_Root_Component.tsx
 * 
 * Root of ScanFileToSearchesView Page - inserted into <div> with id 'main_scan_view_outer_block_react_root_container' in
 * 
 */


import React from 'react'
import {
    ScanFileToSearchesPage_Display_MainContent_Component,
    ScanFileToSearchesPage_Display_MainContent_Component_Props_Prop
} from "page_js/data_pages/project_search_ids_driven_pages/scan_file_to_searches_page/main_page_code/scanFileToSearchesPage_Display_MainContent_Component";



/////////////////////////

/**
 *
 */
export interface ScanFileToSearchesPage_Display_Root_Component_Props {

    propsValue : ScanFileToSearchesPage_Display_MainContent_Component_Props_Prop
}

/**
 * 
 */
interface ScanFileToSearchesPage_Display_Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 * 
 */
export class ScanFileToSearchesPage_Display_Root_Component extends React.Component< ScanFileToSearchesPage_Display_Root_Component_Props, ScanFileToSearchesPage_Display_Root_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     * 
     */    
    constructor(props : ScanFileToSearchesPage_Display_Root_Component_Props) {
        super(props);

        this.state = { 
        };
    }

    /**
     * 
     */ 
    static getDerivedStateFromError( error : any ) : ScanFileToSearchesPage_Display_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     * 
     */ 
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ScanFileToSearchesPage_Display_Root_Component'. componentDidCatch: ", error, errorInfo );
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

        let component_SubTree_ErrorMessage : React.JSX.Element = undefined;

        let mainContent : React.JSX.Element = undefined;


        if ( this.state.component_SubTree_Has_Error ) {

            component_SubTree_ErrorMessage = (

                <div >An Error has Occurred.  Please reload the page and try again.</div>
            );

        } else {

            mainContent = (
                <ScanFileToSearchesPage_Display_MainContent_Component
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

