/**
 * projectPage_ROOT_Container_Containing_MultipleSections_Component.tsx
 *
 * Project Page - ROOT Component
 *
 * Holds MANY sections, starting with:
 *
 * "Explore Search Results" --  class ProjectPage_ROOT_Container_Containing_MultipleSections_Component
 * "View Scan Files"        --  class ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_Common_TopLevelLabel_Component
 *
 */

import React from "react";
import ReactDOM from "react-dom";

import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    getSearchesSearchTagsAndFolders_SingleProject
} from "page_js/data_pages/common_data_loaded_from_server__for_project__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_SearchesAdmin} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_Root_Component";
import {ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions} from "page_js/data_pages/other_data_pages/project_page/project_page__common/projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions";
import {ProjectPage_SearchesSection_Root_Component} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_Root_Component";
import { ProjectPage_ExperimentsSectionRoot_Root_Component } from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projPg_ExpermntsSectionRoot_Root";
import { ProjectPage_ExperimentsSection_LoggedInUsersInteraction } from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projPg_Expermnts_LoggedInUsersInteraction";
import { ProjectPage_SavedViewsSection_Root_Component } from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SavedViewsSection_Root_Component";
import { ProjectPage_SavedViews_Section_LoggedInUsersInteraction } from "page_js/data_pages/other_data_pages/project_page/projectPage_SavedViews_Section_LoggedInUsersInteraction";
import { ProjectPage_UploadData_MainPage_Main_Component } from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__upload_data_section__main_page/projectPage_UploadData_MainPage_Main_Component";
import { ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component } from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/share_data_section/project_owner/projectPage_ShareDataSection_ProjectOwnerInteraction_Root_Component";

/**
 *
 */
export const add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component = function(
    {
        projectIdentifierFromURL,
        projectIsLocked,
        projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions,
        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails,
        projectPage_SearchesAdmin,
        projectPage_ExperimentsSection_LoggedInUsersInteraction,
        projectPage_SavedViews_Section_LoggedInUsersInteraction
    } : {
        projectIdentifierFromURL: string
        projectIsLocked: boolean

        projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
        projectPage_SearchesAdmin: ProjectPage_SearchesAdmin
        projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction // object of class ProjectPage_ExperimentsSection_LoggedInUsersInteraction
        projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction
    }
) {

    let projectIdentifier = projectIdentifierFromURL;

    {
        const containerDOMElement = document.getElementById("project_page_rest_of_sections__contents_block");
        if ( ! containerDOMElement ) {
            throw Error("NO DOM Element with id 'project_page_rest_of_sections__contents_block'")
        }

        //  Remove existing React Node, if one exists
        ReactDOM.unmountComponentAtNode(containerDOMElement);


        const projectPage_ROOT_Container_Containing_MultipleSections_Component_Props : ProjectPage_ROOT_Container_Containing_MultipleSections_Component_Props = {
            projectIdentifier, projectIsLocked, projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions,
            dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails,
            projectPage_SearchesAdmin,
            projectPage_ExperimentsSection_LoggedInUsersInteraction,
            projectPage_SavedViews_Section_LoggedInUsersInteraction
        };


        const projectPage_SearchesSection_ROOT_Component = (
            React.createElement(
                ProjectPage_ROOT_Container_Containing_MultipleSections_Component,
                projectPage_ROOT_Container_Containing_MultipleSections_Component_Props,
                null
            )
        );

        const renderCompletecallbackFcn_Local = ( ) => {

        }

        const renderedReactComponent = ReactDOM.render(
            projectPage_SearchesSection_ROOT_Component,
            containerDOMElement,
            renderCompletecallbackFcn_Local
        );

    }

};


//////////   Function passed to Children components so they can notify everything to reload.  This is to avoid page reload

//   NOT DONE YET.  Wait for all sections after 'Researchers' to be rendered here



//////////   Function passed to Children components so they can retrieve searchesSearchTagsFolders

export class ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root_Params {


}

export class ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root_Result {

    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    searchesSearchTagsFolders_Result_Root_Promise: Promise<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root>
}

export type ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function =
    (params: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root_Params) => ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root_Result

/**
 *
 */
export interface ProjectPage_ROOT_Container_Containing_MultipleSections_Component_Props {
    projectIdentifier : string
    projectIsLocked: boolean

    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin
    projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction // object of class ProjectPage_ExperimentsSection_LoggedInUsersInteraction
    projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction
}

/**
 *
 */
interface ProjectPage_ROOT_Container_Containing_MultipleSections_Component_State {

    force_Rerender?: object  //  All child components need to compare this object for display updating message since a newer force_Rerender object may come down while the child component is getting data to refresh
}

/**
 *
 */
class ProjectPage_ROOT_Container_Containing_MultipleSections_Component extends React.Component< ProjectPage_ROOT_Container_Containing_MultipleSections_Component_Props, ProjectPage_ROOT_Container_Containing_MultipleSections_Component_State > {

    private _searchesAndFolders_From_Webservice_CalledByChildrenComponents_BindThis = this._searchesAndFolders_From_Webservice_CalledByChildrenComponents.bind(this)

    private _DONOTCALL() {

        const searchesAndFolders_From_Webservice_CalledByChildrenComponents: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function =
            this._searchesAndFolders_From_Webservice_CalledByChildrenComponents
    }

    //  Loaded when called from Child components and cached here for other components
    private _searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    //  Only populated when a Promise is in progress to retrieve this data
    private _searchesSearchTagsFolders_Result_Root_Promise: Promise<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root>

    /**
     *
     */
    constructor(props: ProjectPage_ROOT_Container_Containing_MultipleSections_Component_Props) {
        super(props)

        this.state = {
            force_Rerender: {}
        }
    }

    /**
     *
     */
    componentDidMount() {
        try {

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
    private _searchesAndFolders_From_Webservice_CalledByChildrenComponents(

        params: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root_Params) :

    //  return class
        ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root_Result {

        //  Have data so return
        if ( this._searchesSearchTagsFolders_Result_Root ) {
            return {
                searchesSearchTagsFolders_Result_Root_Promise: null,
                searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root
            }
        }

        //  Have Promise so return
        if ( this._searchesSearchTagsFolders_Result_Root_Promise ) {
            return {
                searchesSearchTagsFolders_Result_Root_Promise: this._searchesSearchTagsFolders_Result_Root_Promise,
                searchesSearchTagsFolders_Result_Root: null
            }
        }

        //  No data or Promise so retrieve data

        this._searchesSearchTagsFolders_Result_Root_Promise = new Promise<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root>((resolve, reject) => { try {

            const promise = getSearchesSearchTagsAndFolders_SingleProject({ projectIdentifier: this.props.projectIdentifier })
            promise.catch(reason => {

                this._searchesSearchTagsFolders_Result_Root_Promise = null

                reject(reason)
            })
            promise.then(searchesSearchTagsFolders_Result_Root => { try {

                this._searchesSearchTagsFolders_Result_Root_Promise = null

                this._searchesSearchTagsFolders_Result_Root = searchesSearchTagsFolders_Result_Root;

                resolve(searchesSearchTagsFolders_Result_Root)

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }})

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }})


        return {
            searchesSearchTagsFolders_Result_Root_Promise: this._searchesSearchTagsFolders_Result_Root_Promise,
            searchesSearchTagsFolders_Result_Root: null
        }
    }

    //   NOT Called Yet --  Called by children components when other children components need to refresh their data.  A way to avoid page reload
    // private _forceReload_AllData() {
    //
    //     this._searchesSearchTagsFolders_Result_Root = null // Delete cached data
    //     this.setState({ force_Reload_AllData_Object: { }})
    // }

    /**
     *
     */
    render() {

        return (
            <div>
                <ProjectPage_PublicAccessSection_ProjectOwnerInteraction_ROOT_Component
                    projectIdentifier={ this.props.projectIdentifier }
                    projectIsLocked={ this.props.projectIsLocked }
                />

                <ProjectPage_UploadData_MainPage_Main_Component
                    propsValue={ { projectIdentifier: this.props.projectIdentifier } }
                />

                <ProjectPage_SavedViewsSection_Root_Component
                    force_ReloadFromServer_Object={ this.state.force_Rerender }
                    projectIdentifier={ this.props.projectIdentifier }
                    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                    projectPage_SavedViews_Section_LoggedInUsersInteraction={ this.props.projectPage_SavedViews_Section_LoggedInUsersInteraction }
                />

                <ProjectPage_ExperimentsSectionRoot_Root_Component
                    force_ReloadFromServer_Object={ this.state.force_Rerender }
                    projectIdentifier={ this.props.projectIdentifier }
                    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                    projectPage_ExperimentsSection_LoggedInUsersInteraction={ this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction }
                />

                <ProjectPage_SearchesSection_Root_Component
                    force_ReloadFromServer_Object={ this.state.force_Rerender }
                    projectIdentifier={ this.props.projectIdentifier }
                    get_searchesSearchTagsFolders_Result_Root__Function={ this._searchesAndFolders_From_Webservice_CalledByChildrenComponents_BindThis }
                    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                    projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                />

                <ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component
                    projectIdentifier={ this.props.projectIdentifier }
                    projectIsLocked={ this.props.projectIsLocked }
                    get_searchesSearchTagsFolders_Result_Root__Function={ this._searchesAndFolders_From_Webservice_CalledByChildrenComponents_BindThis }
                    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                    dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                    projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                />

            </div>
        );
    }

}





