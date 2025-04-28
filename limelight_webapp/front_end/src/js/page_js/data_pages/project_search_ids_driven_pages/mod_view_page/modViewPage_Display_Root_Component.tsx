/**
 * modViewPage_Display_Root_Component.tsx
 * 
 * Root of ModView Page - inserted into <div> with id 'main_modView_view_outer_block_react_root_container' in
 * 
 */


import React from 'react'
import {
    ModViewPage_Display_MainContent_Component,
    ModViewPage_Display_MainContent_Component_Props_Prop
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";


/////////////////////////

/**
 *
 */
export interface ModViewPage_Display_Root_Component_Props {

    propsValue : ModViewPage_Display_MainContent_Component_Props_Prop
}

/**
 * 
 */
interface ModViewPage_Display_Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 * 
 */
export class ModViewPage_Display_Root_Component extends React.Component< ModViewPage_Display_Root_Component_Props, ModViewPage_Display_Root_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     * 
     */    
    constructor(props : ModViewPage_Display_Root_Component_Props) {
        super(props);

        this.state = { 
        };
    }

    /**
     * 
     */ 
    static getDerivedStateFromError( error : any ) : ModViewPage_Display_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     * 
     */ 
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ModViewPage_Display_Root_Component'. componentDidCatch: ", error, errorInfo );
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
                <ModViewPage_Display_MainContent_Component
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

