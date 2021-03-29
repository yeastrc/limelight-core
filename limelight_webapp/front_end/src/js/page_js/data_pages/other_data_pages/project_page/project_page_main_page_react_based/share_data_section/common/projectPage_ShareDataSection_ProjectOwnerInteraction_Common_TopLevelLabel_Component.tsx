/**
 * projectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Share Data Section - Provide Top Level Label, Tag (optional) and Expand Collapse icons
 *
 * Common - Project Owner, Researcher
 *
 */

import React from "react";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

export const ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_Expanded_Default = false

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

    expanded?: boolean
}

/**
 *
 */
export class ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component extends React.Component< ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_Props, ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_Props) {
        super(props)

        this.state = {

            expanded: ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_Expanded_Default
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

                    {/*  Top Level Label  */}
                    <span>
                        Share Data
                    </span>

                    {/*  Tags to right of Label

                        only show Public if both are true
                     */}

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
                </div>

                <div className="top-level-label-bottom-border"></div>

            </React.Fragment>
        )
    }

}
