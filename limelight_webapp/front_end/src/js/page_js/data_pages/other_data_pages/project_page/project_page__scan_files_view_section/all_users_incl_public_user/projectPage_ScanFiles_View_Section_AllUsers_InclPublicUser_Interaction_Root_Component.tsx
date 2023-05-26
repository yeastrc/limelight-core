/**
 * projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_Root_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Scan Files View Section - Provide interaction for All Users, Including Public User
 *
 * Root Component
 *
 */

import React from "react";
import {
    ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component,
    ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component_Expanded_Default
} from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/common/projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component";
import {ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root} from "page_js/data_pages/common_data_loaded_from_server__for_project__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders";
import {ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions} from "page_js/data_pages/other_data_pages/project_page/project_page__common/projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions";
import {ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";
import { ProjectPage_SearchesAdmin } from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";


/**
 *
 */
export interface ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component_Props {
    projectIdentifier : string
    projectIsLocked : boolean
    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin
}

/**
 *
 */
interface ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component_State {

    bodyEverShown?: boolean
    expandBody?: boolean
}

/**
 *
 */
export class ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component extends React.Component< ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component_Props, ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component_Props) {
        super(props)

        const bodyEverShown = ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component_Expanded_Default;
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

                <ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component
                    expanded_Chosen_Callback={ this._expanded_Chosen_Callback_BindThis }
                    collapsed_Chosen_Callback={ this._collapsed_Chosen_Callback_BindThis }
                />

                <div
                    style={ ( this.state.expandBody ? { display: "" } : { display: "none" } ) }
                >
                    <div style={ { marginLeft: 26 } }>
                        { (this.state.bodyEverShown) ? (
                            //  Show the Body Contents so call this method
                            <ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component
                                projectIdentifier={ this.props.projectIdentifier}
                                projectIsLocked={ this.props.projectIsLocked }
                                get_searchesSearchTagsFolders_Result_Root__Function={ this.props.get_searchesSearchTagsFolders_Result_Root__Function }
                                projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions  }
                                dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                                projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                            />
                        ) : null }
                    </div>
                </div>

            </div>
        )
    }
}

