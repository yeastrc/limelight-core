/**
 * projectPage_ShareDataSection_ProjectOwnerInteraction_TopLevelLabel_Component.tsx
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

export const ProjectPage_ShareDataSection_ProjectOwnerInteraction_TopLevelLabel_Component_Expanded_Default = false

/**
 *
 */
export interface ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_Props {

    show_Public_Tag: boolean
    show_ReviewerMode_Tag: boolean

    expanded_Chosen_Callback: () => void
    collapsed_Chosen_Callback: () => void
}

/**
 *
 */
interface ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage_ShareDataSection_ProjectOwnerInteraction_TopLevelLabel_Component extends React.Component< ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_Props, ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)
    private _labelClicked_Callback_BindThis = this._labelClicked_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _expanded = ProjectPage_ShareDataSection_ProjectOwnerInteraction_TopLevelLabel_Component_Expanded_Default
        /**
     *
     */
    constructor(props: ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_Props) {
        super(props)

        this.state = { force_ReRender_Object: {} }
    }

    /**
     *
     */
    private _expanded_Chosen_Callback() : void {
        try {
            this._expanded = true

            this.setState({ force_ReRender_Object: {} });

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
            this._expanded = false

            this.setState({ force_ReRender_Object: {} });

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
    private _labelClicked_Callback() : void {
        try {
            this._expanded = ! this._expanded  // Invert the value

            this.setState({ force_ReRender_Object: {} });

            window.setTimeout( () => {
                try {
                    if ( this._expanded ) {
                        this.props.expanded_Chosen_Callback()
                    } else {
                        this.props.collapsed_Chosen_Callback()
                    }

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
                    { ( this._expanded ) ? (
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
                        <span
                            className=" clickable "
                            onClick={ this._labelClicked_Callback_BindThis }
                        >
                            Share Data
                        </span>

                        {/*  Tags to right of Label

                            only show Public if both are true
                         */ }

                        { (this.props.show_Public_Tag ) ? (
                            <span className=" share-data-tag-container ">
                                <span className=" share-data-tag share-data-tag-common ">
                                    Public
                                </span>
                            </span>
                        ) : (this.props.show_ReviewerMode_Tag ) ? (
                            <span className=" share-data-tag-container ">
                                <span className=" share-data-tag share-data-tag-common ">
                                    Reviewer Mode
                                </span>
                            </span>
                        ) : null }

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <span>
                                    Enable or disable reviewer mode and public sharing for this project.  Add a custom URL for the project.
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
