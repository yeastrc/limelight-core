/**
 * projectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help_Component.tsx
 *
 * React Root placed in "Project Information" Section to the right to add in the green ? in
 */


import React from "react";

import { createRoot as createRoot_ReactDOM_Client, Root as Root_ReactDOM_Client } from "react-dom/client";

import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";

/**
 *
 */
export const addToPage_INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component = function (  ) {


    const props : INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component_Props = {}

    const projectPage_ExperimentsSectionRoot_Component = (
        React.createElement(
            INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component,
            props,
            null
        )
    );

    //  Render to page:

    const containerDOMElement = document.getElementById("project_page_project_information_block___question_mark_with_circle__react_root_container");

    if ( ! containerDOMElement ) {
        throw Error("No DOM element with id 'project_page_project_information_block___question_mark_with_circle__react_root_container'");
    }

    const reactRoot_InDOMElement = createRoot_ReactDOM_Client( containerDOMElement )

    reactRoot_InDOMElement.render( projectPage_ExperimentsSectionRoot_Component )
}



/**
 *
 */
interface INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component_Props {

    _placeHolder?: unknown
}

/**
 *
 */
interface INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component_State {

    component_SubTree_Has_Error? : boolean
    force_ReRender_Object?: object
}

/**
 *
 */
class INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component extends React.Component< INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component_Props, INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component_State > {

    /**
     *
     */
    constructor(props: INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component_Props) {
        super(props)

        this.state = { force_ReRender_Object: {} }
    }

    /**
     *
     */
    static getDerivedStateFromError( error : any ) : INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Root_Component_State {
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
            <INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Main_Component/>
        )

    }
}


/**
 *
 */
interface INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Main_Component_Props {

    _placeHolder?: unknown
}

/**
 *
 */
interface INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Main_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
class INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Main_Component extends React.Component< INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Main_Component_Props, INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Main_Component_State > {

    private _forceReload_Data_Object: object = {}

    /**
     *
     */
    constructor(props: INTERNAL__ProjectPage_ProjectInformation_Section_QuestionMark_WithCircle_Help__Main_Component_Props) {
        super(props)

        this.state = { force_ReRender_Object: {} }
    }

    /**
     *
     */
    render() {

        return (
            <>
                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            General information about this project.
                        </span>
                    }
                />
            </>
        )
    }
}
