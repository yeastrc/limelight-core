/**
 * projectPage_UploadData_MainPage_Root_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Upload Data Section
 *
 * Root Component
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import {
    ProjectPage_UploadData_MainPage_Main_Component,
    ProjectPage_UploadData_MainPage_Main_Component_Props_Prop
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__upload_data_section__main_page/projectPage_UploadData_MainPage_Main_Component";




/**
 * Create the React Component and add it to the page
 *
 * @param projectIdentifierFromURL
 */
export const add_Component_to_Page__ProjectPage_UploadData_MainPage_Root_Component = function (
    {
        projectIdentifierFromURL
    } : {
        projectIdentifierFromURL: string
    }
) {


    const propsValue : ProjectPage_UploadData_MainPage_Main_Component_Props_Prop = {
        projectIdentifier : projectIdentifierFromURL
    }

    const props : ProjectPage_UploadData_MainPage_Root_Component_Props = {
        propsValue
    }

    const projectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component = (
        React.createElement(
            ProjectPage_UploadData_MainPage_Root_Component,
            props,
            null
        )
    );

    const containerDOMElement = document.getElementById("upload_data_section_outer_block_react_root_container");

    if ( ! containerDOMElement ) {
        throw Error("No DOM element with id 'upload_data_section_outer_block_react_root_container'");
    }

    //  Called on render complete
    const renderCompleteCallbackFcn = () => {

    };

    const renderedReactComponent = ReactDOM.render(
        projectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component,
        containerDOMElement,
        renderCompleteCallbackFcn
    );

}



/**
 *
 */
export interface ProjectPage_UploadData_MainPage_Root_Component_Props {

    propsValue : ProjectPage_UploadData_MainPage_Main_Component_Props_Prop
}

/**
 *
 */
interface ProjectPage_UploadData_MainPage_Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class ProjectPage_UploadData_MainPage_Root_Component extends React.Component< ProjectPage_UploadData_MainPage_Root_Component_Props, ProjectPage_UploadData_MainPage_Root_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props : ProjectPage_UploadData_MainPage_Root_Component_Props) {
        super(props);

        this.state = {
        };
    }

    /**
     *
     */
    static getDerivedStateFromError( error : any ) : ProjectPage_UploadData_MainPage_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     *
     */
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ProjectPage_UploadData_MainPage_Root_Component'. componentDidCatch: ", error, errorInfo );
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
                <ProjectPage_UploadData_MainPage_Main_Component
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

