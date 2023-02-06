/**
 * projectPage_SearchesSection_Root_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Explore Search Results Section - Provide interaction for All Users, Including Public User
 *
 * Root Component
 *
 */

import React from "react";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_SearchesAdmin} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {
    ProjectPage_SearchesSection_Common_TopLevelLabel_Component,
    ProjectPage_SearchesSection_Common_TopLevelLabel_Component_Expanded_Default
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_Common_TopLevelLabel_Component";
import {ProjectPage_SearchesSection_MainBlock_Component} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_MainBlock_Container_Component";
import {ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";


/**
 *
 */
export interface ProjectPage_SearchesSection_Root_Component_Props {
    force_ReloadFromServer_Object : object
    projectIdentifier : string
    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin
}

/**
 *
 */
interface ProjectPage_SearchesSection_Root_Component_State {

    bodyEverShown?: boolean
    expandBody?: boolean
}

/**
 *
 */
export class ProjectPage_SearchesSection_Root_Component extends React.Component< ProjectPage_SearchesSection_Root_Component_Props, ProjectPage_SearchesSection_Root_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_SearchesSection_Root_Component_Props) {
        super(props)

        const bodyEverShown = ProjectPage_SearchesSection_Common_TopLevelLabel_Component_Expanded_Default;
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

                <ProjectPage_SearchesSection_Common_TopLevelLabel_Component
                    expanded_Chosen_Callback={ this._expanded_Chosen_Callback_BindThis }
                    collapsed_Chosen_Callback={ this._collapsed_Chosen_Callback_BindThis }
                />

                <div
                    style={ ( this.state.expandBody ? { display: "" } : { display: "none" } ) }
                >
                    <div style={ { marginLeft: 26 } }>
                        { (this.state.bodyEverShown) ? (
                            //  Show the Body Contents so call this method
                            <ProjectPage_SearchesSection_MainBlock_Component
                                force_ReloadFromServer_Object={ this.props.force_ReloadFromServer_Object }
                                projectIdentifier={ this.props.projectIdentifier}
                                get_searchesSearchTagsFolders_Result_Root__Function={ this.props.get_searchesSearchTagsFolders_Result_Root__Function }
                                projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                                dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                            />
                        ) : null }
                    </div>
                </div>

            </div>
        )
    }
}

