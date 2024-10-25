/**
 * projectPage_Root_ProjectOwnerUser_ProjectLocked_SpecificComponentsForRoot_Component.tsx
 *
 * Project Page - Component
 *
 *  Components that go under Root Component for Project Owner when project IS Locked
 *
 *  Is using Researcher Components since they are "View Only"
 *
 */

import React from "react";
import { ProjectPage_PublicAccessSection_ResearcherInteraction_ROOT_Component } from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/share_data_section/researcher_aka_assistant_project_owner__or__project_locked_logged_in_user/projectPage_ShareDataSection_ResearcherInteraction_Root_Component";
import {
    ProjectPage__ResearchersSection__Researcher_Interaction_ROOT_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/researchers__section/researcher_aka_assistant_project_owner/projectPage__ResearchersSection__Researcher_Interaction_Root_Component";

/**
 *
 * @param props
 */
export const getComponent_ProjectPage_Root_ProjectOwnerUser_ProjectLocked_SpecificComponentsForRoot_Component = function( props: ProjectPage_SearchesSection_MainBlock_Component_Props ) : JSX.Element {

    return (
        <ProjectPage_Root_ProjectOwnerUser_SpecificComponentsForRoot_Component
            { ...props }
        />
    )
}


/**
 *
 */
export interface ProjectPage_SearchesSection_MainBlock_Component_Props {

    projectIdentifier : string
    projectIsLocked: boolean

    //  force_Rerender_EmptyObjectReference_EmptyObjectReference:  Bypass all shouldComponentUpdate and render current value
    force_Rerender_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    //  force_ReloadFromServer_EmptyObjectReference:  Reload all data from server and display that data.  Display "Loading" message.
    force_ReloadFromServer_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

}

/**
 *
 */
interface ProjectPage_SearchesSection_MainBlock_Component_State {

    _placeHolder?: unknown
}

/**
 *
 */
class ProjectPage_Root_ProjectOwnerUser_SpecificComponentsForRoot_Component extends React.Component< ProjectPage_SearchesSection_MainBlock_Component_Props, ProjectPage_SearchesSection_MainBlock_Component_State > {

    /**
     *
     */
    constructor( props: ProjectPage_SearchesSection_MainBlock_Component_Props ) {
        super( props )

        this.state = {
        }
    }

    render() {
        return (
            <>
                <ProjectPage__ResearchersSection__Researcher_Interaction_ROOT_Component
                    projectIdentifier={ this.props.projectIdentifier }
                    projectIsLocked={ this.props.projectIsLocked }
                />

                <ProjectPage_PublicAccessSection_ResearcherInteraction_ROOT_Component
                    projectIdentifier={ this.props.projectIdentifier }
                    projectIsLocked={ this.props.projectIsLocked }
                />
        </>
        );
    }

}

