/**
 * projectPage_SavedViewsSection_Common_TopLevelLabel_Component.tsx
 *
 * Project Page - "Highlighted Results" section - Top Level Label Component
 *
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";

export const ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component_Expanded_Default = true

/**
 *
 */
export interface ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component_Props {

    expanded_Chosen_Callback: () => void
    collapsed_Chosen_Callback: () => void
}

/**
 *
 */
interface ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component extends React.Component< ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component_Props, ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)
    private _labelClicked_Callback_BindThis = this._labelClicked_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _expanded = ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component_Expanded_Default

    /**
     *
     */
    constructor(props: ProjectPage_SavedViewsSection_Common_TopLevelLabel_Component_Props) {
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
                            Highlighted Results
                        </span>

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <span>
                                    Links to views of data in Limelight that the project owner wishes to highlight.
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
