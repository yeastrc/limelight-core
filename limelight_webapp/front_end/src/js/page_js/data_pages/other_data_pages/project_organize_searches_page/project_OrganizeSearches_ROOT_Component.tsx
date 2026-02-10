/**
 * project_OrganizeSearches_ROOT_Component.tsx
 *
 * Javascript React Components for project-organize-searches-view.jsp page
 *
 * Organize Searches Page
 *
 * Root Component
 *
 */

import React from "react";
import {
    Project_OrganizeSearches_Main_Component,
    Project_OrganizeSearches_Main_Component_Props_Prop
} from "page_js/data_pages/other_data_pages/project_organize_searches_page/project_OrganizeSearches_Main_Component";

/**
 *
 */
export interface Project_OrganizeSearches_ROOT_Component_Props {

    propsValue : Project_OrganizeSearches_Main_Component_Props_Prop
}

/**
 *
 */
interface Project_OrganizeSearches_ROOT_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class Project_OrganizeSearches_ROOT_Component extends React.Component< Project_OrganizeSearches_ROOT_Component_Props, Project_OrganizeSearches_ROOT_Component_State > {

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: Project_OrganizeSearches_ROOT_Component_Props) {
        super(props)

        this.state = {
        }
    }

    /**
     *
     */
    static getDerivedStateFromError( error : any ) : Project_OrganizeSearches_ROOT_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     *
     */
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'PeptidePage_Display_Root_Component'. componentDidCatch: ", error, errorInfo );
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
                <Project_OrganizeSearches_Main_Component
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
