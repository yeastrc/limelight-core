/**
 * projectPage_SavedViewsSection_Root_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Highlighted Results Section - Provide interaction for All Users, Including Public User
 *
 * Root Component
 *
 */

import React from "react";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {
    ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component,
    ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component_Expanded_Default
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SavedViewsSection_Common_TopLevelLabel_Component";
import { ProjectPage_SavedViews_Section_LoggedInUsersInteraction } from "page_js/data_pages/other_data_pages/project_page/projectPage_SavedViews_Section_LoggedInUsersInteraction";
import { ProjectPage_SavedViewsSection_MainBlock_Component } from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SavedViewsSection_MainBlock_Container_Component";


/**
 *
 */
export interface ProjectPage_SavedViewsSection_Root_Component_Props {
    force_ReloadFromServer_Object : object
    projectIdentifier : string
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction
}

/**
 *
 */
interface ProjectPage_SavedViewsSection_Root_Component_State {

    bodyEverShown?: boolean
    expandBody?: boolean
}

/**
 *
 */
export class ProjectPage_SavedViewsSection_Root_Component extends React.Component< ProjectPage_SavedViewsSection_Root_Component_Props, ProjectPage_SavedViewsSection_Root_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_SavedViewsSection_Root_Component_Props) {
        super(props)

        const bodyEverShown = ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component_Expanded_Default;
        const expandBody = bodyEverShown;

        this.state = {
            bodyEverShown,
            expandBody
        }
    }

    /**
     *
     */
    private _expanded_Chosen_Callback() : void {

        this.setState({ bodyEverShown: true, expandBody: true });
    }

    /**
     *
     */
    private _collapsed_Chosen_Callback() : void {

        this.setState({ expandBody: false });
    }

    /**
     *
     */
    render() {

        return (

            <div className="top-level-container share-data-root ">

                <ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component
                    expanded_Chosen_Callback={ this._expanded_Chosen_Callback_BindThis }
                    collapsed_Chosen_Callback={ this._collapsed_Chosen_Callback_BindThis }
                />

                <div
                    style={ ( this.state.expandBody ? { display: "" } : { display: "none" } ) }
                >
                    <div style={ { marginLeft: 26 } }>
                        { (this.state.bodyEverShown) ? (
                            //  Show the Body Contents so call this method
                            <ProjectPage_SavedViewsSection_MainBlock_Component
                                force_ReloadFromServer_Object={ this.props.force_ReloadFromServer_Object }
                                projectIdentifier={ this.props.projectIdentifier}
                                dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                                projectPage_SavedViews_Section_LoggedInUsersInteraction={ this.props.projectPage_SavedViews_Section_LoggedInUsersInteraction }
                            />
                        ) : null }
                    </div>
                </div>

            </div>
        )
    }
}

