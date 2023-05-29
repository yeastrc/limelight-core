/**
 * projPg_ExpermntsSectionRoot_Root.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Experiment Section - Provide interaction for All Users, Including Public User
 *
 * Root Component
 *
 */

import React from "react";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {
    ProjectPage_ExperimentSection_Common_TopLevelLabel_Component,
    ProjectPage_ExperimentSection_Common_TopLevelLabel_Component_Expanded_Default
} from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projectPage_ExperimentSection_Common_TopLevelLabel_Component";
import { ProjectPage_ExperimentsSection_LoggedInUsersInteraction } from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projPg_Expermnts_LoggedInUsersInteraction";
import {
    ProjectPage_ExperimentsSectionRoot,
    ProjectPage_ExperimentsSectionRoot_Props
} from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projPg_ExpermntsSectionRoot";


/**
 *
 */
export interface ProjectPage_ExperimentsSectionRoot_Root_Component_Props {

    //  force_Rerender_EmptyObjectReference_EmptyObjectReference:  Bypass all shouldComponentUpdate and render current value
    force_Rerender_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    //  force_ReloadFromServer_EmptyObjectReference:  Reload all data from server and display that data.  Display "Loading" message.
    force_ReloadFromServer_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    projectIdentifier : string
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction // object of class ProjectPage_ExperimentsSection_LoggedInUsersInteraction
}

/**
 *
 */
interface ProjectPage_ExperimentsSectionRoot_Root_Component_State {

    bodyEverShown?: boolean
    expandBody?: boolean
}

/**
 *
 */
export class ProjectPage_ExperimentsSectionRoot_Root_Component extends React.Component< ProjectPage_ExperimentsSectionRoot_Root_Component_Props, ProjectPage_ExperimentsSectionRoot_Root_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_ExperimentsSectionRoot_Root_Component_Props) {
        super(props)

        const bodyEverShown = ProjectPage_ExperimentSection_Common_TopLevelLabel_Component_Expanded_Default;
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

                <ProjectPage_ExperimentSection_Common_TopLevelLabel_Component
                    expanded_Chosen_Callback={ this._expanded_Chosen_Callback_BindThis }
                    collapsed_Chosen_Callback={ this._collapsed_Chosen_Callback_BindThis }
                />

                <div
                    style={ ( this.state.expandBody ? { display: "" } : { display: "none" } ) }
                >
                    <div style={ { marginLeft: 26 } }>
                        { (this.state.bodyEverShown) ? (
                            //  Show the Body Contents so call this method
                            <ProjectPage_ExperimentSection_MainBlock_Component
                                force_Rerender_EmptyObjectReference={ this.props.force_Rerender_EmptyObjectReference }
                                force_ReloadFromServer_EmptyObjectReference={ this.props.force_ReloadFromServer_EmptyObjectReference }
                                projectIdentifier={ this.props.projectIdentifier}
                                dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                                projectPage_ExperimentsSection_LoggedInUsersInteraction={ this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction }
                            />
                        ) : null }
                    </div>
                </div>

            </div>
        )
    }
}

/////////////////

//  ProjectPage_ExperimentSection_MainBlock_Component  --  Internal Component to load data for display




/**
 *
 */
export interface ProjectPage_ExperimentSection_MainBlock_Component_Props {

    //  force_Rerender_EmptyObjectReference_EmptyObjectReference:  Bypass all shouldComponentUpdate and render current value
    force_Rerender_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    //  force_ReloadFromServer_EmptyObjectReference:  Reload all data from server and display that data.  Display "Loading" message.
    force_ReloadFromServer_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    projectIdentifier : string
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction // object of class ProjectPage_ExperimentsSection_LoggedInUsersInteraction
}

/**
 *
 */
interface ProjectPage_ExperimentSection_MainBlock_Component_State {

    projectPage_ExperimentsSectionRoot_Props?: ProjectPage_ExperimentsSectionRoot_Props
}

/**
 *
 */
export class ProjectPage_ExperimentSection_MainBlock_Component extends React.Component< ProjectPage_ExperimentSection_MainBlock_Component_Props, ProjectPage_ExperimentSection_MainBlock_Component_State > {

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor( props: ProjectPage_ExperimentSection_MainBlock_Component_Props ) {
        super( props )

        this.state = {}
    }

    /**
     *
     */
    render() {
        return (
            <ProjectPage_ExperimentsSectionRoot
                force_Rerender_EmptyObjectReference={ this.props.force_Rerender_EmptyObjectReference }
                force_ReloadFromServer_EmptyObjectReference={ this.props.force_ReloadFromServer_EmptyObjectReference }
                projectIdentifierFromURL={ this.props.projectIdentifier }
                projectPage_ExperimentsSection_LoggedInUsersInteraction={ this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction }
            />
        );
    }

}


