/**
 * projectPage_Root_ResearcherUser_SpecificComponentsForRoot_Component.tsx
 *
 * Project Page - Component
 *
 *  Components that go under Root Component for Researcher when project NOT Locked
 *
 *
 */

import React from "react";
import { ProjectPage_PublicAccessSection_ResearcherInteraction_ROOT_Component } from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/share_data_section/researcher_aka_assistant_project_owner/projectPage_ShareDataSection_ResearcherInteraction_Root_Component";

/**
 *
 * @param props
 */
export const getComponent_ProjectPage_Root_ResearcherUser_SpecificComponentsForRoot_Component = function( props: ProjectPage_SearchesSection_MainBlock_Component_Props ) : JSX.Element {

    return (
        <ProjectPage_Root_ResearcherUser_SpecificComponentsForRoot_Component
            { ...props }
        />
    )
}


/**
 *
 */
export interface ProjectPage_SearchesSection_MainBlock_Component_Props {
    force_ReloadFromServer_Object : object
    projectIdentifier : string
    projectIsLocked: boolean
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
class ProjectPage_Root_ResearcherUser_SpecificComponentsForRoot_Component extends React.Component< ProjectPage_SearchesSection_MainBlock_Component_Props, ProjectPage_SearchesSection_MainBlock_Component_State > {

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
                <ProjectPage_PublicAccessSection_ResearcherInteraction_ROOT_Component
                    projectIdentifier={ this.props.projectIdentifier }
                    projectIsLocked={ this.props.projectIsLocked }
                />
        </>
        );
    }

}

