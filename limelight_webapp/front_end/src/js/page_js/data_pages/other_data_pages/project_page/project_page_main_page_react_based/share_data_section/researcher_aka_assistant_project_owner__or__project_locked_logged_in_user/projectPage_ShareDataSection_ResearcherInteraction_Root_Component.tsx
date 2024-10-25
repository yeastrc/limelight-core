/**
 * projectPage_ShareDataSection_ResearcherInteraction_Root_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Share Data Section - Provide interaction for Project Owner
 *
 * Root Component
 *
 * Uses 'ProjectOwner' Component:  <ProjectPage_ShareDataSection_ProjectOwnerInteraction_TopLevelLabel_Component> (includes ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_Expanded_Default)
 *
 */

import React from "react";
import {
    ProjectPage_ShareDataSection_ResearcherInteraction_Common_TopLevelLabel_Component,
    ProjectPage_ShareDataSection_ResearcherInteraction_Common_TopLevelLabel_Component_Expanded_Default
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/share_data_section/researcher_aka_assistant_project_owner__or__project_locked_logged_in_user/projectPage_ShareDataSection_ResearcherInteraction_Common_TopLevelLabel_Component";

/**
 *
 */
export interface ProjectPage_PublicAccessSection_ResearcherInteraction_ROOT_Component_Props {
    projectIdentifier : string
    projectIsLocked : boolean
}

/**
 *
 */
interface ProjectPage_PublicAccessSection_ResearcherInteraction_ROOT_Component_State {

    show_Public_Tag?: boolean
    bodyEverShown?: boolean
    expandBody?: boolean

    currentProjectURL? : string
    publicAccessEnabled?: boolean
}

/**
 *
 */
export class ProjectPage_PublicAccessSection_ResearcherInteraction_ROOT_Component extends React.Component< ProjectPage_PublicAccessSection_ResearcherInteraction_ROOT_Component_Props, ProjectPage_PublicAccessSection_ResearcherInteraction_ROOT_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_PublicAccessSection_ResearcherInteraction_ROOT_Component_Props) {
        super(props)

        const bodyEverShown = ProjectPage_ShareDataSection_ResearcherInteraction_Common_TopLevelLabel_Component_Expanded_Default;
        const expandBody = bodyEverShown;

        const get_global_variables__From_Page_Result = _get_global_variables__From_Page();

        this.state = {
            bodyEverShown,
            expandBody,
            currentProjectURL: get_global_variables__From_Page_Result.currentProjectURL,
            publicAccessEnabled: get_global_variables__From_Page_Result.publicAccessEnabled,
            show_Public_Tag: get_global_variables__From_Page_Result.publicAccessEnabled
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

                <ProjectPage_ShareDataSection_ResearcherInteraction_Common_TopLevelLabel_Component
                    show_Public_Tag={ this.state.show_Public_Tag }
                    expanded_Chosen_Callback={ this._expanded_Chosen_Callback_BindThis }
                    collapsed_Chosen_Callback={ this._collapsed_Chosen_Callback_BindThis }
                />

                <div
                    style={ ( this.state.expandBody ? { display: "" } : { display: "none" } ) }
                    className=" public-access-block  "
                >
                    { (this.state.bodyEverShown) ? (
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
            <div >

                <div style={ { marginTop: 20, marginBottom: 10, fontWeight: "bold" } }>

                    Project URL: <span>{ this.state.currentProjectURL }</span>
                </div>

                <div className="second-level-label " style={ { marginTop: 20 } }>

                    <span>Public access is currently </span>

                    { ( this.state.publicAccessEnabled ) ? (
                        <span>
                            enabled
                        </span>
                    ) : (
                        <span>
                            disabled
                        </span>
                    )}
                </div>
            </div>
        )
    }
}

/////////////

//  Not in a class

const _get_global_variables__From_Page = function () : {
    currentProjectURL : string
    publicAccessEnabled: boolean
} {

    //  Get Controller Path for page

    const $controller_path = $("#controller_path");
    if ($controller_path.length === 0) {
        throw Error("No element with id: 'controller_path'");
    }
    const controller_path = $controller_path.text();

    //  Set URL Path before controller to span on page

    const pageURL = window.location.href

    const controllerStartIndex = pageURL.indexOf( controller_path );
    if ( controllerStartIndex === -1 ) {
        throw Error("Controller Path is not in Page URL.  Controller Path: " + controller_path + ", pageURL: " + pageURL );
    }
    const pageURL_BeforeControllerPath = pageURL.substring( 0, controllerStartIndex );

    const $share_data_project_label_page_controller_path_separator = $("#share_data_project_label_page_controller_path_separator");
    if ( $share_data_project_label_page_controller_path_separator.length === 0 ) {
        throw Error("No element with id: 'share_data_project_label_page_controller_path_separator'");
    }
    const share_data_project_label_page_controller_path_separator = $share_data_project_label_page_controller_path_separator.text();
    if ( share_data_project_label_page_controller_path_separator === undefined ||
        share_data_project_label_page_controller_path_separator === null ||
        share_data_project_label_page_controller_path_separator === "" ) {
        throw Error("element with id: 'share_data_project_label_page_controller_path_separator' contains empty string or returned null or undefined");
    }

    const $share_data_project_label_page_controller_path = $("#share_data_project_label_page_controller_path");
    if ( $share_data_project_label_page_controller_path.length === 0 ) {
        throw Error("No element with id: 'share_data_project_label_page_controller_path'");
    }
    const share_data_project_label_page_controller_path = $share_data_project_label_page_controller_path.text();
    if ( share_data_project_label_page_controller_path === undefined ||
        share_data_project_label_page_controller_path === null ||
        share_data_project_label_page_controller_path === "" ) {
        throw Error("element with id: 'share_data_project_label_page_controller_path' contains empty string or returned null or undefined");
    }
    const urlBase = pageURL_BeforeControllerPath + share_data_project_label_page_controller_path + share_data_project_label_page_controller_path_separator;

    const share_data_project_label_project_short_labelDOM = document.getElementById("share_data_project_label_project_short_label");
    if ( ! share_data_project_label_project_short_labelDOM ) {
        throw Error("No DOM element with id 'share_data_project_label_project_short_label'");
    }

    let share_data_project_label_project_short_label_Inside_HTML_BODY_Tags : string = null;

    {
        const innerText = share_data_project_label_project_short_labelDOM.innerText

        const domparser = new DOMParser()

        try {
            const doc = domparser.parseFromString(innerText, "text/html")

            const body = doc.body;

            share_data_project_label_project_short_label_Inside_HTML_BODY_Tags = body.innerText;

        } catch (e) {
            // Not parsable Value so exit
            return null; // EARLY EXIT
        }
    }

    //  Comment out since not guarantee read only once
    // try {
    //     share_data_project_label_project_short_labelDOM.remove();
    // } catch (e) {
    //     // swallow any exception
    // }

    let currentProjectURL : string = undefined;

    if ( share_data_project_label_project_short_label_Inside_HTML_BODY_Tags === "" ) {
        currentProjectURL = window.location.href;
    } else {
        currentProjectURL = urlBase + share_data_project_label_project_short_label_Inside_HTML_BODY_Tags;
    }

    let publicAccessEnabled = false;

    if ( document.getElementById( "share_data_public_access_enabled_if_present" ) ) {
        publicAccessEnabled = true;
    }

    return {
        currentProjectURL, publicAccessEnabled
    }
}
