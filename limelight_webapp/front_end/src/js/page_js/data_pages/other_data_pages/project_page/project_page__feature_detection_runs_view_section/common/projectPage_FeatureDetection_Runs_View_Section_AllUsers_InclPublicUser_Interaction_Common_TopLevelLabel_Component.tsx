/**
 * projectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Share Data Section - Provide Top Level Label, Tag (optional) and Expand Collapse icons
 *
 * Common - Project Owner, Researcher
 *
 */

import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";

export const ProjectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component_Expanded_Default = false

/**
 *
 */
export interface ProjectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component_Props {

    expanded_Chosen_Callback: () => void
    collapsed_Chosen_Callback: () => void
}

/**
 *
 */
interface ProjectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component_State {

    expanded?: boolean
}

/**
 *
 */
export class ProjectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component extends React.Component< ProjectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component_Props, ProjectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component_Props) {
        super(props)

        this.state = {

            expanded: ProjectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component_Expanded_Default
        }
    }

    /**
     *
     */
    private _expanded_Chosen_Callback() : void {
        try {
            this.setState({ expanded: true });

            window.setTimeout( () => {
                try {
                    this.props.expanded_Chosen_Callback();

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            }, 50 );
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    /**
     *
     */
    private _collapsed_Chosen_Callback() : void {
        try {
            this.setState({ expanded: false });

            window.setTimeout( () => {
                try {
                    this.props.collapsed_Chosen_Callback();

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            }, 50 );
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    /**
     *
     */
    render() {

        return (
            <React.Fragment>

                <div className="collapsable-link-container top-level-collapsable-link-container ">
                    { ( this.state.expanded ) ? (
                        <img src="static/images/pointer-down.png"
                             className=" icon-large fake-link-image "
                             onClick={ this._collapsed_Chosen_Callback_BindThis }
                        />
                    ) : (
                        <img src="static/images/pointer-right.png"
                             className=" icon-large fake-link-image  "
                             onClick={ this._expanded_Chosen_Callback_BindThis }
                        />
                    )}
                </div>

                <div className="top-level-label share-data-top-level-label-block">

                    <div style={ { whiteSpace: "nowrap" } } >

                        {/*  Top Level Label  */}
                        <span>
                            View Feature Detection Runs
                        </span>

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <span>
                                    View feature detection runs in this project.
                                </span>
                            }
                        />

                    </div>

                </div>
                
                <div className="top-level-label-bottom-border"></div>

            </React.Fragment>
        )
    }

}
