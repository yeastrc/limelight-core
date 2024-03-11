/**
 * projectPage__ResearchersSection__ProjectOwnerInteraction_Root_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Researchers Section - Provide interaction for Project Owner
 *
 * Root Component
 *
 */

import React from "react";
import {
    ProjectPage__ResearchersSection__CommonInteraction_TopLevelLabel_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/researchers__section/common/projectPage__ResearchersSection__CommonInteraction_TopLevelLabel_Component";
import {
    ProjectPage__ResearchersSection__ProjectOwnerInteraction__AddUser_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/researchers__section/project_owner/projectPage__ResearchersSection__ProjectOwnerInteraction__AddUser_Component";
import {
    ProjectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/researchers__section/common/projectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component";
import {
    ProjectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/researchers__section/common/projectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component";


/**
 *
 */
export interface ProjectPage__ResearchersSection__ProjectOwnerInteraction_ROOT_Component_Props {
    projectIdentifier : string
    projectIsLocked : boolean
}

/**
 *
 */
interface ProjectPage__ResearchersSection__ProjectOwnerInteraction_ROOT_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage__ResearchersSection__ProjectOwnerInteraction_ROOT_Component extends React.Component< ProjectPage__ResearchersSection__ProjectOwnerInteraction_ROOT_Component_Props, ProjectPage__ResearchersSection__ProjectOwnerInteraction_ROOT_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _bodyEverShown = false
    private _expandBody = false

    private _forceReload_For_NewInvite: object = {}

    /**
     *
     */
    constructor(props: ProjectPage__ResearchersSection__ProjectOwnerInteraction_ROOT_Component_Props) {
        super(props)

        this.state = {
            force_ReRender_Object : {}
        }
    }

    /**
     *
     */
    private _expanded_Chosen_Callback() : void {

        this._bodyEverShown = true
        this._expandBody = true

        this.setState({ force_ReRender_Object: {} });
    }

    /**
     *
     */
    private _collapsed_Chosen_Callback() : void {

        this._expandBody = false

        this.setState({ force_ReRender_Object: {} });
    }

    /**
     *
     */
    render() {

        return (

            <div className="top-level-container share-data-root ">

                <ProjectPage__ResearchersSection__CommonInteraction_TopLevelLabel_Component
                    expanded_Chosen_Callback={ this._expanded_Chosen_Callback_BindThis }
                    collapsed_Chosen_Callback={ this._collapsed_Chosen_Callback_BindThis }
                />

                <div
                    style={ ( this._expandBody ? { display: "" } : { display: "none" } ) }
                    className=" researchers-block  "
                >
                    { (this._bodyEverShown) ? (
                        //  Show the Body Contents so call this method
                        this. _get_ExpandedBodyContents()
                    ) : null }
                </div>

            </div>
        )
    }

    /**
     *
     */
    private _get_ExpandedBodyContents() : JSX.Element {

        return (
            <div>
                <ProjectPage__ResearchersSection__ProjectOwnerInteraction__AddUser_Component
                    projectIdentifier={ this.props.projectIdentifier }
                    projectIsLocked={ this.props.projectIsLocked }
                    refresh_UserList_InvitedList_Callback={ () => {
                        this._forceReload_For_NewInvite = {}
                        this.setState( { force_ReRender_Object: {} } )
                    } }
                />


                <div style={ { position: "relative" } }>
                     {/* Re-Invite email successfully sent message */}
                    <div className="success-message-container error_message_container_jq"
                         id="success_message_invite_email_re_sent">
                        <div className="success-message-inner-container" style={ { width: 800 } }>
                            <div className="success-message-close-x error_message_close_x_jq">X</div>
                            <div className="success-message-text">Email re-sent inviting them to this project</div>
                        </div>
                    </div>

                     {/* Re-Invite email NOT successfully sent message */}
                    <div className="error-message-container error_message_container_jq"
                         id="error_message_invite_email_re_send_sytem_error">

                        <div className="error-message-inner-container" style={ { width: 400 } }>
                            <div className="error-message-close-x error_message_close_x_jq">X</div>
                            <div className="error-message-text">Unable to send email, system error.</div>
                        </div>
                    </div>

                </div>

                <div style={ {
                    display: "grid",
                    gridTemplateColumns: "max-content max-content max-content max-content max-content max-content 1fr",
                    width: "100%"
                } }>

                    {/*   7 column grid.  7th column is dummy 1fr to take rest of available space so that lines between entries span width of viewport  */ }

                    <ProjectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component
                        projectIdentifier={ this.props.projectIdentifier }
                        projectIsLocked={ this.props.projectIsLocked }
                        forceReload_UserList_Object={ this._forceReload_For_NewInvite }
                    />

                    <ProjectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component
                        projectIdentifier={ this.props.projectIdentifier }
                        projectIsLocked={ this.props.projectIsLocked }
                        forceReload_UserList_Object={ this._forceReload_For_NewInvite }
                    />

                </div>
            </div>
        )
    }
}

