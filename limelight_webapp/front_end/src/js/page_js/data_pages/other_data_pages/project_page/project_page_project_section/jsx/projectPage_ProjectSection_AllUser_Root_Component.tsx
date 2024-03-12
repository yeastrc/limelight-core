/**
 * projectPage__ProjectSection_AllUser_Root_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Project Section - Root - for parts that are React Components
 *
 * Common
 *
 */

import React from "react";
import ReactDOM from "react-dom";


import {
    ProjectPage__ProjectSection_AllUser_Root_Main_Component,
    ProjectPage__ProjectSection_AllUser_Root_Main_Component_Props_Prop
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_AllUser_Root_Main_Component";





export const add_ProjectPage__ProjectSection_AllUser_Root_Component_ToPage = function (
    {
        propsValue
    } : {
        propsValue : ProjectPage__ProjectSection_AllUser_Root_Main_Component_Props_Prop
    }
) : void {

    const props : ProjectPage__ProjectSection_AllUser_Root_Component_Props = {
        propsValue
    }

    const projectPage_ExperimentsSectionRoot_Component = (
        React.createElement(
            ProjectPage__ProjectSection_AllUser_Root_Component,
            props,
            null
        )
    );

    //  Render to page:

    const containerDOMElement = document.getElementById("project_information_root_block_react_implementation");

    if ( ! containerDOMElement ) {
        throw Error("No DOM element with id 'project_information_root_block_react_implementation'");
    }

    //  Called on render complete
    const renderCompleteCallbackFcn = () => {

    };

    const renderedReactComponent = ReactDOM.render(
        projectPage_ExperimentsSectionRoot_Component,
        containerDOMElement,
        renderCompleteCallbackFcn
    );
}



/**
 *
 */
interface ProjectPage__ProjectSection_AllUser_Root_Component_Props {

    propsValue : ProjectPage__ProjectSection_AllUser_Root_Main_Component_Props_Prop
}

/**
 *
 */
interface ProjectPage__ProjectSection_AllUser_Root_Component_State {

    component_SubTree_Has_Error? : boolean
    force_ReRender_Object?: object
}

/**
 *
 */
class ProjectPage__ProjectSection_AllUser_Root_Component extends React.Component< ProjectPage__ProjectSection_AllUser_Root_Component_Props, ProjectPage__ProjectSection_AllUser_Root_Component_State > {

    /**
     *
     */
    constructor(props: ProjectPage__ProjectSection_AllUser_Root_Component_Props) {
        super(props)

        this.state = { force_ReRender_Object: {} }
    }

    /**
     *
     */
    static getDerivedStateFromError( error : any ) : ProjectPage__ProjectSection_AllUser_Root_Component_State {
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
    render() {

        if ( this.state.component_SubTree_Has_Error ) {

            return (  // EARLY RETURN

                <div >An Error has Occurred.  Please reload the page and try again.</div>
            );
        }

        return (
            <ProjectPage__ProjectSection_AllUser_Root_Main_Component
                propsValue={ this.props.propsValue }
            />
        )

    }
}

