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
    getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
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
import { ProjectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component } from "page_js/data_pages/other_data_pages/project_page/project_page__feature_detection_runs_view_section/all_users_incl_public_user/projectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_Root_Component";
import {
    CommonData_LoadedFromServerFor_Project_DoSections_HaveAnyData_Result,
    get_CommonData_LoadedFromServerFor_Project_DoSections_HaveAnyData_Result
} from "page_js/data_pages/common_data_loaded_from_server__project_page_do_sections_have_any_data/commonData_LoadedFromServerFor_Project_DoSections_HaveAnyData";
import { Spinner_Limelight_Component } from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer";

export class ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Params {
    projectIdentifierFromURL: string
    projectIsLocked: boolean

    //  force_Rerender_EmptyObjectReference_EmptyObjectReference:  Bypass all shouldComponentUpdate and render current value
    force_Rerender_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    //  force_ReloadFromServer_EmptyObjectReference:  Reload all data from server and display that data.  Display "Loading" message.
    force_ReloadFromServer_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh
}

export type ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Function =
    ( params: ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Params ) => JSX.Element;

/**
 *
 */
export const add_Component_to_Page__ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component = function(
    {
        projectIdentifierFromURL,
        projectIsLocked,
        for_PublicUser,
        projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions,
        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails,
        projectPage_SearchesAdmin,
        projectPage_ExperimentsSection_LoggedInUsersInteraction,
        projectPage_SavedViews_Section_LoggedInUsersInteraction,

        getSubComponents__Callback_Function
    } : {
        projectIdentifierFromURL: string
        projectIsLocked: boolean
        for_PublicUser: boolean

        projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
        projectPage_SearchesAdmin: ProjectPage_SearchesAdmin
        projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction // object of class ProjectPage_ExperimentsSection_LoggedInUsersInteraction
        projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction

        //  Callback Function to add Components that are not rendered for all users
        getSubComponents__Callback_Function: ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Function
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
            projectIdentifier, projectIsLocked, for_PublicUser, projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions,
            dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails,
            projectPage_SearchesAdmin,
            projectPage_ExperimentsSection_LoggedInUsersInteraction,
            projectPage_SavedViews_Section_LoggedInUsersInteraction,
            getSubComponents__Callback_Function
        };

        const projectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent_Props : ProjectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent_Props = {
            mainProps: projectPage_ROOT_Container_Containing_MultipleSections_Component_Props
        }


        const projectPage_SearchesSection_ROOT_Component = (
            React.createElement(
                ProjectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent,
                projectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent_Props,
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

///   ROOT Rendered Component


/**
 *
 */
export interface ProjectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent_Props {
    mainProps: ProjectPage_ROOT_Container_Containing_MultipleSections_Component_Props
}

/**
 *
 */
interface ProjectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
class ProjectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent extends React.Component< ProjectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent_Props, ProjectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent_State > {

    /**
     *
     */
    constructor( props: ProjectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent_Props ) {
        super( props )

        this.state = {
            component_SubTree_Has_Error: false
        }
    }

    /**
     *
     */
    static getDerivedStateFromError( error: any ): ProjectPage_ROOT_Container_Containing_MultipleSections_Component_RootRenderedComponent_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     *
     */
    componentDidCatch( error: any, errorInfo: any ) {
        // You can also log the error to an error reporting service

        console.warn( "react Component 'ProjectPage_ROOT_Container_Containing_MultipleSections_Component'. componentDidCatch: ", error, errorInfo );
        // logErrorToMyService(error, errorInfo);
    }


    /**
     *
     */
    render() {

        if ( this.state.component_SubTree_Has_Error ) {

            return (
                <div >An Error has Occurred.  Please reload the page and try again.</div>
            )
        }

        return (
            <ProjectPage_ROOT_Container_Containing_MultipleSections_Component
                { ...this.props.mainProps }
            />
        );
    }
}


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


//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

////    Main ROOT Containing Component

/**
 *
 */
export interface ProjectPage_ROOT_Container_Containing_MultipleSections_Component_Props {
    projectIdentifier : string
    projectIsLocked: boolean
    for_PublicUser: boolean

    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin
    projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction // object of class ProjectPage_ExperimentsSection_LoggedInUsersInteraction
    projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction

    //  Callback Function to add Components that are not rendered for all users
    getSubComponents__Callback_Function: ProjectPage_ProjectPage_ROOT_Container_Containing_MultipleSections_Component__GetSubComponents__Callback_Function
}

/**
 *
 */
interface ProjectPage_ROOT_Container_Containing_MultipleSections_Component_State {

    show_Overall_Loading_Message?: boolean
    do_ANY_Sections_HaveData?: boolean
    doSections_HaveAnyData_Result?: CommonData_LoadedFromServerFor_Project_DoSections_HaveAnyData_Result

    //  force_Rerender_EmptyObjectReference_EmptyObjectReference:  Bypass all shouldComponentUpdate and render current value
    force_Rerender_EmptyObjectReference?: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    //  force_ReloadFromServer_EmptyObjectReference:  Reload all data from server and display that data.  Display "Loading" message.
    force_ReloadFromServer_EmptyObjectReference?: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh
}

/**
 *
 */
class ProjectPage_ROOT_Container_Containing_MultipleSections_Component extends React.Component< ProjectPage_ROOT_Container_Containing_MultipleSections_Component_Props, ProjectPage_ROOT_Container_Containing_MultipleSections_Component_State > {

    private _searchesAndFolders_From_Webservice_CalledByChildrenComponents_BindThis = this._searchesAndFolders_From_Webservice_CalledByChildrenComponents.bind(this)
    private _update_force_ReloadFromServer_EmptyObjectReference_Callback_BindThis = this._update_force_ReloadFromServer_EmptyObjectReference_Callback.bind(this)
    private _update_force_ReRender_EmptyObjectReference_Callback_BindThis = this._update_force_ReRender_EmptyObjectReference_Callback.bind(this)

    private _DONOTCALL() {

        const searchesAndFolders_From_Webservice_CalledByChildrenComponents: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function =
            this._searchesAndFolders_From_Webservice_CalledByChildrenComponents
    }

    //  Loaded when called from Child components and cached here for other components
    private _searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    //  Only populated when a Promise is in progress to retrieve this data
    private _searchesSearchTagsFolders_Result_Root_Promise: Promise<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root>

    private _searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject = new SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class()


    /**
     *
     */
    constructor(props: ProjectPage_ROOT_Container_Containing_MultipleSections_Component_Props) {
        super(props)

        let show_Overall_Loading_Message = false
        if ( props.for_PublicUser ) {
            show_Overall_Loading_Message = true
        }

        this.state = {
            show_Overall_Loading_Message,
            force_Rerender_EmptyObjectReference: {},
            force_ReloadFromServer_EmptyObjectReference: {}
        }
    }

    /**
     *
     */
    componentDidMount() {
        try {

            if ( this.props.for_PublicUser ) {

                const promise = get_CommonData_LoadedFromServerFor_Project_DoSections_HaveAnyData_Result({ projectIdentifier: this.props.projectIdentifier })

                promise.catch(reason => {})
                promise.then( result_Project_DoSections_HaveAnyData_Result => {
                    try {
                        let do_ANY_Sections_HaveData = false;

                        if ( result_Project_DoSections_HaveAnyData_Result.has_Searches_Data
                            || result_Project_DoSections_HaveAnyData_Result.has_ScanFile_Data
                            || result_Project_DoSections_HaveAnyData_Result.has_Experiment_NOT_Drafts_Data
                            || result_Project_DoSections_HaveAnyData_Result.has_DataPage_SavedView_Data
                            || result_Project_DoSections_HaveAnyData_Result.has_FeatureDetectionRoot_ProjectMapping_Data
                        ) {
                            do_ANY_Sections_HaveData = true
                        }

                        this.setState({ show_Overall_Loading_Message: false, do_ANY_Sections_HaveData, doSections_HaveAnyData_Result: result_Project_DoSections_HaveAnyData_Result })

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({
                            errorException : e
                        });
                        throw e;
                    }
                })
            }

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

            const promise = getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds({ projectIdentifier: this.props.projectIdentifier })
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

    /**
     * Called from Child components to force All child components to reload to display updated data
     */
    private _update_force_ReloadFromServer_EmptyObjectReference_Callback() : void {

        this._searchesSearchTagsFolders_Result_Root = null;

        this.setState({ force_ReloadFromServer_EmptyObjectReference: {} })
    }

    /**
     * Called from Child components to force All child components to rerender to display updated data
     */
    private _update_force_ReRender_EmptyObjectReference_Callback() {

        this._searchesSearchTagsFolders_Result_Root = null // Delete cached data
        this.setState({ force_Rerender_EmptyObjectReference: {} })
    }

    /**
     *
     */
    render() {

        if ( this.state.show_Overall_Loading_Message ) {

            return (
                <div>
                    <div style={ { fontSize: 28, fontWeight: "bold", textAlign: "center", marginTop: 40 } }>
                        Loading Data
                    </div>

                    <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                        <Spinner_Limelight_Component/>
                    </div>
                </div>
            )
        }

        if ( this.props.for_PublicUser && ( ! this.state.do_ANY_Sections_HaveData ) ) {

            return (
                <div style={ { fontSize: 24, fontWeight: "bold", marginTop: 40 } }>
                    Project has no data
                </div>
            )
        }

        return (
            <div>
                {/*

                As far as hiding sections that have NO data for Public User,
                this code assumes that 'this.props.getSubComponents__Callback_Function' returns NOTHING for Public User, which is currently true

                */}

                { //  Add Components for User type

                    ( this.props.getSubComponents__Callback_Function ) ? (

                    this.props.getSubComponents__Callback_Function({
                        projectIdentifierFromURL: this.props.projectIdentifier,
                        projectIsLocked: this.props.projectIsLocked,
                        force_Rerender_EmptyObjectReference: this.state.force_Rerender_EmptyObjectReference,
                        force_ReloadFromServer_EmptyObjectReference: this.state.force_ReloadFromServer_EmptyObjectReference
                    })
                ) : null }

                { ( ! this.props.for_PublicUser ) || ( this.state.doSections_HaveAnyData_Result && this.state.doSections_HaveAnyData_Result.has_DataPage_SavedView_Data ) ? (
                    <ProjectPage_SavedViewsSection_Root_Component
                        force_Rerender_EmptyObjectReference={ this.state.force_Rerender_EmptyObjectReference }
                        force_ReloadFromServer_EmptyObjectReference={ this.state.force_ReloadFromServer_EmptyObjectReference }
                        projectIdentifier={ this.props.projectIdentifier }
                        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                        projectPage_SavedViews_Section_LoggedInUsersInteraction={ this.props.projectPage_SavedViews_Section_LoggedInUsersInteraction }
                    />
                ) : null }

                { ( ! this.props.for_PublicUser ) || ( this.state.doSections_HaveAnyData_Result && this.state.doSections_HaveAnyData_Result.has_Experiment_NOT_Drafts_Data ) ? (
                    <ProjectPage_ExperimentsSectionRoot_Root_Component
                        force_Rerender_EmptyObjectReference={ this.state.force_Rerender_EmptyObjectReference }
                        force_ReloadFromServer_EmptyObjectReference={ this.state.force_ReloadFromServer_EmptyObjectReference }
                        projectIdentifier={ this.props.projectIdentifier }
                        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                        projectPage_ExperimentsSection_LoggedInUsersInteraction={ this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction }
                    />
                ) : null }

                { ( ! this.props.for_PublicUser ) || ( this.state.doSections_HaveAnyData_Result && this.state.doSections_HaveAnyData_Result.has_Searches_Data ) ? (
                    <ProjectPage_SearchesSection_Root_Component
                        force_Rerender_EmptyObjectReference={ this.state.force_Rerender_EmptyObjectReference }
                        force_ReloadFromServer_EmptyObjectReference={ this.state.force_ReloadFromServer_EmptyObjectReference }
                        projectIdentifier={ this.props.projectIdentifier }
                        get_searchesSearchTagsFolders_Result_Root__Function={ this._searchesAndFolders_From_Webservice_CalledByChildrenComponents_BindThis }
                        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                        projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                        update_force_ReloadFromServer_EmptyObjectReference_Callback={ this._update_force_ReloadFromServer_EmptyObjectReference_Callback_BindThis}
                        update_force_ReRender_EmptyObjectReference_Callback={ this._update_force_ReRender_EmptyObjectReference_Callback_BindThis }
                        searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject={ this._searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject }
                    />
                ) : null }

                { ( ! this.props.for_PublicUser ) || ( this.state.doSections_HaveAnyData_Result && this.state.doSections_HaveAnyData_Result.has_FeatureDetectionRoot_ProjectMapping_Data ) ? (
                    <ProjectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component
                        force_Rerender_EmptyObjectReference={ this.state.force_Rerender_EmptyObjectReference }
                        force_ReloadFromServer_EmptyObjectReference={ this.state.force_ReloadFromServer_EmptyObjectReference }
                        projectIdentifier={ this.props.projectIdentifier }
                        projectIsLocked={ this.props.projectIsLocked }
                        get_searchesSearchTagsFolders_Result_Root__Function={ this._searchesAndFolders_From_Webservice_CalledByChildrenComponents_BindThis }
                        projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                        dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                        projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                        update_force_ReloadFromServer_EmptyObjectReference_Callback={ this._update_force_ReloadFromServer_EmptyObjectReference_Callback_BindThis }
                        update_force_ReRender_EmptyObjectReference_Callback={ this._update_force_ReRender_EmptyObjectReference_Callback_BindThis }
                        searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject={ this._searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject }
                    />
                ) : null }

                { ( ! this.props.for_PublicUser ) || ( this.state.doSections_HaveAnyData_Result && this.state.doSections_HaveAnyData_Result.has_ScanFile_Data ) ? (
                    <ProjectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component
                        force_Rerender_EmptyObjectReference={ this.state.force_Rerender_EmptyObjectReference }
                        force_ReloadFromServer_EmptyObjectReference={ this.state.force_ReloadFromServer_EmptyObjectReference }
                        projectIdentifier={ this.props.projectIdentifier }
                        projectIsLocked={ this.props.projectIsLocked }
                        get_searchesSearchTagsFolders_Result_Root__Function={ this._searchesAndFolders_From_Webservice_CalledByChildrenComponents_BindThis }
                        projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                        dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                        projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                        update_force_ReloadFromServer_EmptyObjectReference_Callback={ this._update_force_ReloadFromServer_EmptyObjectReference_Callback_BindThis }
                        update_force_ReRender_EmptyObjectReference_Callback={ this._update_force_ReRender_EmptyObjectReference_Callback_BindThis }
                        searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject={ this._searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject }
                    />
                ) : null }

            </div>
        );
    }

}





