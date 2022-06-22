/**
 * projectPage_ShareDataSection_ProjectOwnerInteraction_Root_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Share Data Section - Provide interaction for Project Owner
 *
 * Root Component
 *
 */

import React from "react";
import {ProjectPage_PublicAccessSection_ProjectOwnerInteraction__CurrentURL_CustomizeProjectURL_Component} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/share_data_section/project_owner/projectPage_ShareDataSection_ProjectOwnerInteraction_ProjectURL_Component";
import {
    ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component,
    ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_Expanded_Default
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/share_data_section/common/projectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component";
import ReactDOM from "react-dom";
import {ProjectPage_PublicAccessSection_ProjectOwnerInteraction__PublicAccess_ReviewerAccess_Component} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/share_data_section/project_owner/projectPage_ShareDataSection_ProjectOwnerInteraction_PublicAccess_ReviewerAccess_Component";


//  File Global values loaded from the DOM
let _share_data_project__public_access_enabled__ExistsInDOM = false;
let _share_data_project__public_access_code_enabled_ExistsInDOM = false;




/**
 * Create the React Component and add it to the page
 *
 * @param projectIdentifierFromURL
 * @param projectIsLocked
 */
export const add_Component_to_Page__ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component = function (
    {
        projectIdentifierFromURL,
        projectIsLocked
    } : {
        projectIdentifierFromURL: string
        projectIsLocked: boolean
    }
) {


    const props : ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component_Props = {
        projectIdentifier : projectIdentifierFromURL,
        projectIsLocked
    }

    const projectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component = (
        React.createElement(
            ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component,
            props,
            null
        )
    );

    const containerDOMElement = document.getElementById("share_data_section_outer_block_react_root_container");

    if ( ! containerDOMElement ) {
        throw Error("No DOM element with id 'share_data_section_outer_block_react_root_container'");
    }

    //  Called on render complete
    const renderCompleteCallbackFcn = () => {

    };

    const renderedReactComponent = ReactDOM.render(
        projectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component,
        containerDOMElement,
        renderCompleteCallbackFcn
    );

}


/**
 *
 */
export interface ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component_Props {
    projectIdentifier : string
    projectIsLocked : boolean
}

/**
 *
 */
interface ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component_State {

    show_Public_Tag?: boolean
    show_ReviewerMode_Tag?: boolean
    bodyEverShown?: boolean
    expandBody?: boolean
}

/**
 *
 */
export class ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component extends React.Component< ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component_Props, ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _set_publicAccess_Enabled_Callback_BindThis = this._set_publicAccess_Enabled_Callback.bind(this)
    private _set_publicAccess_Disabled_Callback_BindThis = this._set_publicAccess_Disabled_Callback.bind(this)
    private _set_reviewerAccess_Enabled_Callback_BindThis = this._set_reviewerAccess_Enabled_Callback.bind(this)
    private _set_reviewerAccess_Disabled_Callback_BindThis = this._set_reviewerAccess_Disabled_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component_Props) {
        super(props)

        const bodyEverShown = ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component_Expanded_Default;
        const expandBody = bodyEverShown;

        _initialize_file_global_variables__From_Page();

        this.state = {
            show_Public_Tag : _share_data_project__public_access_enabled__ExistsInDOM,
            show_ReviewerMode_Tag: _share_data_project__public_access_code_enabled_ExistsInDOM,
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


    private _set_publicAccess_Enabled_Callback() : void {
        this.setState({ show_Public_Tag: true });

    }
    private _set_publicAccess_Disabled_Callback() : void {
        this.setState({ show_Public_Tag: false });
    }

    private _set_reviewerAccess_Enabled_Callback() : void {
        this.setState({ show_ReviewerMode_Tag: true });
    }
    private _set_reviewerAccess_Disabled_Callback() : void {
        this.setState({ show_ReviewerMode_Tag: false });
    }

    /**
     *
     */
    render() {

        return (

            <div className="top-level-container share-data-root ">

                <ProjectPage_ShareDataSection_ProjectOwnerInteraction_Common_TopLevelLabel_Component
                    show_Public_Tag={ this.state.show_Public_Tag }
                    show_ReviewerMode_Tag={ this.state.show_ReviewerMode_Tag }
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
                <ProjectPage_PublicAccessSection_ProjectOwnerInteraction__CurrentURL_CustomizeProjectURL_Component
                    projectIdentifier={ this.props.projectIdentifier }
                    projectIsLocked={ this.props.projectIsLocked }
                />

                <ProjectPage_PublicAccessSection_ProjectOwnerInteraction__PublicAccess_ReviewerAccess_Component
                    projectIdentifier={ this.props.projectIdentifier }
                    projectIsLocked={ this.props.projectIsLocked }
                    share_data_project__public_access_enabled__ExistsInDOM={ _share_data_project__public_access_enabled__ExistsInDOM }
                    share_data_project__public_access_code_enabled_ExistsInDOM={ _share_data_project__public_access_code_enabled_ExistsInDOM }

                    set_publicAccess_Enabled_Callback={ this._set_publicAccess_Enabled_Callback_BindThis }
                    set_publicAccess_Disabled_Callback={ this._set_publicAccess_Disabled_Callback_BindThis }
                    set_reviewerAccess_Enabled_Callback={ this._set_reviewerAccess_Enabled_Callback_BindThis }
                    set_reviewerAccess_Disabled_Callback={ this._set_reviewerAccess_Disabled_Callback_BindThis }
                />
            </div>
        )
    }
}

/////////////

//  Not in a class

const _initialize_file_global_variables__From_Page = function () : void {

    _share_data_project__public_access_enabled__ExistsInDOM = false;
    _share_data_project__public_access_code_enabled_ExistsInDOM = false;

    const share_data_project__public_access_enabledDOM = document.getElementById("share_data_project__public_access_enabled");
    if ( share_data_project__public_access_enabledDOM ) {
        _share_data_project__public_access_enabled__ExistsInDOM = true;
    }


    const share_data_project__public_access_code_enabledDOM = document.getElementById("share_data_project__public_access_code_enabled");
    if ( share_data_project__public_access_code_enabledDOM ) {
        _share_data_project__public_access_code_enabled_ExistsInDOM = true;
    }
}
