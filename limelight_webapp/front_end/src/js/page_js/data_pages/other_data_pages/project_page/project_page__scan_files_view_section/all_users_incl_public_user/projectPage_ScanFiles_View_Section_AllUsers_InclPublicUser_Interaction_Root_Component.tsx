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
import {ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions} from "page_js/data_pages/other_data_pages/project_page/project_page__common/projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions";
import {ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";
import { ProjectPage_SearchesAdmin } from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer";


/**
 *
 */
export interface ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component_Props {

    //  force_Rerender_EmptyObjectReference_EmptyObjectReference:  Bypass all shouldComponentUpdate and render current value
    force_Rerender_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    //  force_ReloadFromServer_EmptyObjectReference:  Reload all data from server and display that data.  Display "Loading" message.
    force_ReloadFromServer_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    projectIdentifier : string
    projectIsLocked : boolean
    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class

    update_force_ReloadFromServer_EmptyObjectReference_Callback: () => void
    update_force_ReRender_EmptyObjectReference_Callback: () => void
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
                                force_Rerender_EmptyObjectReference={ this.props.force_Rerender_EmptyObjectReference }
                                force_ReloadFromServer_EmptyObjectReference={ this.props.force_ReloadFromServer_EmptyObjectReference }
                                projectIdentifier={ this.props.projectIdentifier}
                                projectIsLocked={ this.props.projectIsLocked }
                                get_searchesSearchTagsFolders_Result_Root__Function={ this.props.get_searchesSearchTagsFolders_Result_Root__Function }
                                projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions  }
                                dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                                projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                                update_force_ReloadFromServer_EmptyObjectReference_Callback={ this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback }
                                update_force_ReRender_EmptyObjectReference_Callback={ this.props.update_force_ReRender_EmptyObjectReference_Callback }
                                searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject={ this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject }
                            />
                        ) : null }
                    </div>
                </div>

            </div>
        )
    }
}

