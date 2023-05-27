/**
 * projectPage_ExperimentSection_Common_TopLevelLabel_Component.tsx
 *
 * Project Page - "Explore Search Results" section - Top Level Label Component
 *
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

export const ProjectPage_ExperimentSection_Common_TopLevelLabel_Component_Expanded_Default = true

/**
 *
 */
export interface ProjectPage_ExperimentSection_Common_TopLevelLabel_Component_Props {

    expanded_Chosen_Callback: () => void
    collapsed_Chosen_Callback: () => void
}

/**
 *
 */
interface ProjectPage_ExperimentSection_Common_TopLevelLabel_Component_State {

    expanded?: boolean
}

/**
 *
 */
export class ProjectPage_ExperimentSection_Common_TopLevelLabel_Component extends React.Component< ProjectPage_ExperimentSection_Common_TopLevelLabel_Component_Props, ProjectPage_ExperimentSection_Common_TopLevelLabel_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_ExperimentSection_Common_TopLevelLabel_Component_Props) {
        super(props)

        this.state = {

            expanded: ProjectPage_ExperimentSection_Common_TopLevelLabel_Component_Expanded_Default
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

                    <div style={ { display: "grid", gridTemplateColumns: "min-content min-content" } }>

                        {/*   2 column grid   */}

                        <div style={ { whiteSpace: "nowrap" } } >  {/*  column 1  */}

                            {/*  Top Level Label  */}
                            <span>
                                Experiments
                            </span>

                        </div>

                        <div className=" project-page--top-level-label-help-tip-symbol">   {/*  column 2  */}

                            <p className="top-level-label-help-tip-actual ">  {/*   Displayed on hover of ?  */}
                                Experiments allow you to define a structure for your searches,
                                including conditions, timepoints, and replicates;
                                and provides appropriate default views of the data.
                            </p>
                        </div>

                    </div>
                </div>

                <div className="top-level-label-bottom-border"></div>

            </React.Fragment>
        )
    }

}
