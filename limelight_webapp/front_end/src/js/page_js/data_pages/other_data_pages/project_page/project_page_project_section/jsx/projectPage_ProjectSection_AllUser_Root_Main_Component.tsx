/**
 * projectPage__ProjectSection_AllUser_Root_Main_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Project Section - Root - for parts that are React Components
 *
 * Common
 *
 */

import React from "react";
import {
    ProjectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot";
import {
    ProjectPage__ProjectSection_AllUsers_Interaction_ProjectNotes_Main_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_AllUser_Interaction_ProjectNotes_Main_Component";
import {
    ProjectPage__ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component";


/**
 *
 */
export class ProjectPage__ProjectSection_AllUser_Root_Main_Component_Props_Prop {

    projectIdentifier: string

    projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot: ProjectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot
}

/**
 *
 */
export interface ProjectPage__ProjectSection_AllUser_Root_Main_Component_Props {

    propsValue : ProjectPage__ProjectSection_AllUser_Root_Main_Component_Props_Prop
}

/**
 *
 */
interface ProjectPage__ProjectSection_AllUser_Root_Main_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage__ProjectSection_AllUser_Root_Main_Component extends React.Component< ProjectPage__ProjectSection_AllUser_Root_Main_Component_Props, ProjectPage__ProjectSection_AllUser_Root_Main_Component_State > {

    private _forceReload_Data_Object: object = {}

    /**
     *
     */
    constructor(props: ProjectPage__ProjectSection_AllUser_Root_Main_Component_Props) {
        super(props)

        this.state = { force_ReRender_Object: {} }
    }

    /**
     *
     */
    render() {

        return (
            <>
                <ProjectPage__ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component
                    projectIdentifier={ this.props.propsValue.projectIdentifier }
                    projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot={ this.props.propsValue.projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot }
                />

                <ProjectPage__ProjectSection_AllUsers_Interaction_ProjectNotes_Main_Component
                    projectIdentifier={ this.props.propsValue.projectIdentifier }
                    projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot={ this.props.propsValue.projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot }
                    forceReload_Data_Object={ this._forceReload_Data_Object }
                />
            </>
        )
    }
}

