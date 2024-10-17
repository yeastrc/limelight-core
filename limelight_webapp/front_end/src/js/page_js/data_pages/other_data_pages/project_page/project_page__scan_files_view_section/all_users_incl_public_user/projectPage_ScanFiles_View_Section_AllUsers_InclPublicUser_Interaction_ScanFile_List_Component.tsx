/**
 * projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Scan Files View Section - Provide interaction for All Users, Including Public User
 *
 * Scan File List Component
 *
 */

import React from "react";
import {
    projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer,
    ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry
} from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    projectPage_ScanFiles_View_Section_Get_ScanFile_Details_FromServer,
    ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_FeatureDetectionEntry,
    ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_GoldStandardEntry,
    ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_Root
} from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_Get_ScanFile_Details_FromServer";
import {
    FeatureDetection_Label_Description_Change_Component_Change_Callback_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/project_owner/featureDetection_Label_Description_Change_Component_and_WebserviceCall";
import {refresh_ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__upload_data_section__main_page/projectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component";
import {refresh_ProjectPage_UploadData_MainPage_Main_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__upload_data_section__main_page/projectPage_UploadData_MainPage_Main_Component";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import {ProjectPage_SearchEntry_UsedInMultipleSections_Component} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchEntry_UsedInMultipleSections_Component";
import {ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions} from "page_js/data_pages/other_data_pages/project_page/project_page__common/projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";
import {
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry,
    Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";
import {Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage} from "page_js/data_pages/common__search_display_verbose_value_store_session_storage/search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import { ProjectPage_SearchesAdmin } from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import { GoldStandard_Label_Description_Change_Component_Change_Callback_Params } from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/project_owner/goldStandard_Label_Description_Change_Component_and_WebserviceCall";
import { scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc } from "page_js/data_pages/scan_file_driven_pages/scan_file_driven_pages__utils/scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc";
import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesSection_Open_DataPages_PeptideProteinMod";
import {
    limelight__TooltipAddition_Component_ControlClick_OR_CommandClick_ToOpenInNewTab
} from "page_js/common_all_pages/limelight__TooltipAddition_Component_ControlClick_OR_CommandClick_ToOpenInNewTab";

/**
 *
 */
export interface ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_Props {

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

    update_force_ReloadFromServer_EmptyObjectReference_Callback: () => void

    searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class

    update_force_ReRender_EmptyObjectReference_Callback: () => void
}

/**
 *
 */
interface ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_State {

    show_LoadingData_Message?: boolean

    show_SearchTag_Categories?: boolean

    scanFile_Entry_CombinedEntries_Array?: Array<ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry >
    standardRunImporter_IsFullyConfigured?: boolean
    runFeatureDetection_IsFullyConfigured?: boolean

    expand_All___Show_ScanFile_Details__Global_Force?: Internal__Expand_All___Show_ScanFile_Details__Global_Force

    force_ReRender?: object
}

/**
 *
 */
export class ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component extends React.Component< ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_Props, ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_State > {

    private _expand_All_Button_Clicked_BindThis = this._expand_All_Button_Clicked.bind(this);
    private _collapse_All_Button_Clicked_BindThis = this._collapse_All_Button_Clicked.bind(this);

    private _updateFor_ScanFileEntry_Component_ExpandedChange_BindThis = this._updateFor_ScanFileEntry_Component_ExpandedChange.bind(this)
    private _updateFor_ScanFileSelection_Change_BindThis = this._updateFor_ScanFileSelection_Change.bind(this)
    private _run_FeatureDetection_For_Selected_ScanFiles_BindThis = this._run_FeatureDetection_For_Selected_ScanFiles.bind(this)

    private _searchChanged_Callback_BindThis = this._searchChanged_Callback.bind(this)
    private _callback_SearchDeleted_BindThis = this._callback_SearchDeleted.bind(this);

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

        const scanFileEntry_Component_SelectionCheckboxChanged_CallbackFunction: ScanFileEntry_Component_SelectionCheckboxChanged_CallbackFunction = this._updateFor_ScanFileSelection_Change
    }

    private _scanFiles_Selected_ProjectScanFileId_Set: Set<number> = new Set();

    private _scanFiles_Expanded_ProjectScanFileId_Set: Set<number> = new Set();

    private _buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled: boolean = true //  start out with NO Scan File Selections


    /**
     *
     */
    constructor(props: ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_Props) {
        super(props)

        const show_SearchTag_Categories = Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.get_Value()

        this.state = {
            show_LoadingData_Message: true,
            show_SearchTag_Categories,
            force_ReRender: {}
        }
    }

    /**
     *
     */
    componentDidMount() {

        //  Load Data

        this.get_ScanList_FromServer();
    }

    componentDidUpdate( prevProps: Readonly<ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_Props>, prevState: Readonly<ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_State>, snapshot?: any ) {

        if ( prevProps.force_ReloadFromServer_EmptyObjectReference !== this.props.force_ReloadFromServer_EmptyObjectReference ) {

            this.setState({ show_LoadingData_Message: true })

            //  ReLoad Data

            this.get_ScanList_FromServer();
        }
    }

    /**
     *
     */
    private get_ScanList_FromServer() : void {

        const promise = projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer({ projectIdentifier: this.props.projectIdentifier });

        promise.catch( reason => {  });

        promise.then( scanFile_List_FromServer_Root => {  try {

            this.setState({
                show_LoadingData_Message: false,
                scanFile_Entry_CombinedEntries_Array: scanFile_List_FromServer_Root.scanFiles_In_Project_List,
                standardRunImporter_IsFullyConfigured: scanFile_List_FromServer_Root.standardRunImporter_IsFullyConfigured,
                runFeatureDetection_IsFullyConfigured: scanFile_List_FromServer_Root.runFeatureDetection_IsFullyConfigured
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    private _expand_All_Button_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.setState({ expand_All___Show_ScanFile_Details__Global_Force: { expand_All___Show_ScanFile_Details__Global_ForceToValue: true } });
    }


    /**
     *
     */
    private _collapse_All_Button_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.setState({ expand_All___Show_ScanFile_Details__Global_Force: { expand_All___Show_ScanFile_Details__Global_ForceToValue: false } });
    }

    /**
     *
     */
    private _updateFor_ScanFileEntry_Component_ExpandedChange( params: ScanFileEntry_Component_ExpandedChange_CallbackFunction_Params ) {

        if ( params.expanded ) {
            this._scanFiles_Expanded_ProjectScanFileId_Set.add( params.projectScanFileId )
        } else {
            this._scanFiles_Expanded_ProjectScanFileId_Set.delete( params.projectScanFileId )
        }
    }

    /**
     *
     */
    private _updateFor_ScanFileSelection_Change(params: ScanFileEntry_Component_SelectionCheckboxChanged_CallbackFunction_Params) {

        if ( params.checked ) {
            this._scanFiles_Selected_ProjectScanFileId_Set.add( params.projectScanFileId )
        } else {
            this._scanFiles_Selected_ProjectScanFileId_Set.delete( params.projectScanFileId )
        }

        this._updateFor__scanFiles_Selected_ProjectScanFileId_Set_Change()
    }

    /**
     *
     */
    private _updateFor__scanFiles_Selected_ProjectScanFileId_Set_Change() {

        if ( this._scanFiles_Selected_ProjectScanFileId_Set.size > 0 ) {
            if ( this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled ) {
                //  Changed
                this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled = false;
                this.setState({ force_ReRender: {} })
            }
        } else {
            if ( ! this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled ) {
                //  Changed
                this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled = true;
                this.setState({ force_ReRender: {} })
            }
        }
    }

    /**
     *
     */
    private _run_FeatureDetection_For_Selected_ScanFiles() {

        if ( this._scanFiles_Selected_ProjectScanFileId_Set.size === 0 ) {
            //  NO Selection so exit
            return; // EARLY RETURN
        }

        const projectScanFileId_List: Array<number> = []
        const scanFilename_Array_Array: Array<Array<string>> = []

        for ( const scanFile_Entry of this.state.scanFile_Entry_CombinedEntries_Array ) {

            if ( this._scanFiles_Selected_ProjectScanFileId_Set.has( scanFile_Entry.projectScanFileId ) ) {
                projectScanFileId_List.push( scanFile_Entry.projectScanFileId )
                scanFilename_Array_Array.push( scanFile_Entry.scanFilename_Array )
            }
        }

        this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.
        getFunction__open_Run_Hardklor_File_Contents_For_ScanFile_Project_Overlay__Function()({
            component_Params: {
                projectIdentifier: this.props.projectIdentifier,
                projectScanFileId_List,
                scanFilename_Array_Array
            },
            uploadComplete_Callback: () : void => {

                refresh_ProjectPage_UploadData_MainPage_Main_Component()

                refresh_ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component()
            }
        })
    }

    /**
     *
     */
    private _searchChanged_Callback() : void {

        if ( this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback ) {

            this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback()

            return; // EARLY RETURN
        }

        limelight__ReloadPage_Function() //  Fallback when no callback is available
    }

    /**
     *
     */
    private _callback_SearchDeleted() : void {

        if ( this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback ) {

            this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback()

            return; // EARLY RETURN
        }

        limelight__ReloadPage_Function() //  Fallback when no callback is available
    }

    /**
     *
     */
    render() {

        let no_ScanFiles_Found = false;
        const scanFile_Element_List: Array<JSX.Element> = [];

        if ( this.state.scanFile_Entry_CombinedEntries_Array ) {

            if ( this.state.scanFile_Entry_CombinedEntries_Array.length === 0 ) {

                no_ScanFiles_Found = true;

            } else {
                for ( const scanFile_Entry of this.state.scanFile_Entry_CombinedEntries_Array ) {

                    const element = (
                        <ScanFileEntry_Component
                            key={ scanFile_Entry.projectScanFileId }

                            force_Rerender_EmptyObjectReference={ this.props.force_Rerender_EmptyObjectReference }
                            force_ReloadFromServer_EmptyObjectReference={ this.props.force_ReloadFromServer_EmptyObjectReference }

                            showExpanded_OnMount={ this._scanFiles_Expanded_ProjectScanFileId_Set.has( scanFile_Entry.projectScanFileId )}
                            expand_All___Show_ScanFile_Details__Global_Force={ this.state.expand_All___Show_ScanFile_Details__Global_Force }
                            scanFile_Entry={ scanFile_Entry }
                            standardRunImporter_IsFullyConfigured={ this.state.standardRunImporter_IsFullyConfigured }
                            runFeatureDetection_IsFullyConfigured={ this.state.runFeatureDetection_IsFullyConfigured }
                            projectIdentifier={ this.props.projectIdentifier }
                            projectIsLocked={ this.props.projectIsLocked }
                            show_SearchTag_Categories={ this.state.show_SearchTag_Categories }
                            get_searchesSearchTagsFolders_Result_Root__Function={ this.props.get_searchesSearchTagsFolders_Result_Root__Function }
                            projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                            dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                            projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                            expandedChange_CallbackFunction={ this._updateFor_ScanFileEntry_Component_ExpandedChange_BindThis }
                            selectionCheckboxChanged_CallbackFunction={ this._updateFor_ScanFileSelection_Change_BindThis }
                            searchChanged_Callback={ this._searchChanged_Callback_BindThis }
                            callback_SearchDeleted={ this._callback_SearchDeleted_BindThis }
                            update_force_ReloadFromServer_EmptyObjectReference_Callback={ this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback }
                            searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject={ this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject }
                            update_force_ReRender_EmptyObjectReference_Callback={ this.props.update_force_ReRender_EmptyObjectReference_Callback }
                        />
                    )

                    scanFile_Element_List.push(element);
                }
            }
        }

        return (
            <div style={ { marginBottom: 20 } }>
                { (this.state.show_LoadingData_Message) ? (
                    <div>
                        Loading Data
                    </div>
                ) : no_ScanFiles_Found ? (
                    <div>
                        No scan files in this project.
                    </div>
                ) : (
                    <>
                        <div style={ { marginBottom: 10, whiteSpace: "nowrap" } }>

                            {/*  Expand All and Collapse All Buttons  */}

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Show Details for All Scan Files.
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <input type="button" className="submit-button "
                                       value="Expand All"
                                       onClick={ this._expand_All_Button_Clicked_BindThis }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Hide Details for All Scan Files.
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <input className="submit-button " type="button"
                                       id="collapse_all_search_details_button"
                                       value="Collapse All"
                                       onClick={ this._collapse_All_Button_Clicked_BindThis }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>

                        <div style={ { marginBottom: 10 } }>
                             <span
                                 style={ { whiteSpace: "nowrap", fontSize: 18, fontWeight: "bold" } }
                             >Verbose view: </span>
                            <span>
                                <input
                                    type="checkbox"
                                    checked={ this.state.show_SearchTag_Categories }
                                    onChange={ event => {
                                        const show_SearchTag_Categories = event.target.checked

                                        this.setState({ show_SearchTag_Categories })

                                        Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.save_Value(show_SearchTag_Categories)
                                    }}
                                />
                            </span>
                        </div>

                        <div style={ { display: "grid", gridTemplateColumns: "min-content min-content auto" } }>
                            {/*  3 Column Grid  */}
                            { scanFile_Element_List }
                        </div>

                        { this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ? (

                            <div style={ { marginBottom: 10, whiteSpace: "nowrap" } }>

                                { this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ? (

                                    <>
                                        {/*  Run Feature Detection */}
                                        <div style={ { position: "relative", display: "inline-block" } }>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    <span>
                                                        Run Feature Detection on selected scan files
                                                    </span>
                                                }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                                <button
                                                    disabled={ this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled }
                                                    onClick={ this._run_FeatureDetection_For_Selected_ScanFiles_BindThis }
                                                >
                                                    Run Feature Detection
                                                </button>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                            { ( this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled ) ? (
                                                // overlay when button is disabled to show tooltip
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                                        <span>
                                                            Select 1 or more scan files <br/> to run Feature Detection for
                                                        </span>
                                                    }
                                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                >
                                                    <div
                                                        style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                                    ></div>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                            ): null }
                                        </div>
                                    </>
                                ) : null }

                            </div>

                        ) : null }

                    </>
                ) }
            </div>
        )
    }
}


////////////////////////////////////////////


/**
 * Create new Object and pass in as Props to force all Show Scan File Details to the new boolean value of true or false
 *
 * After the new object is processed, it's value is then ignored until a new object is passed.  tested using object reference
 *
 * If passed null, ignore
 */
class Internal__Expand_All___Show_ScanFile_Details__Global_Force {
    expand_All___Show_ScanFile_Details__Global_ForceToValue : boolean  // true if Expand, false if Collapse
}

//  Component for Single Scan File - not exported

interface ScanFileEntry_Component_ExpandedChange_CallbackFunction_Params {

    projectScanFileId: number
    expanded: boolean
}

type ScanFileEntry_Component_ExpandedChange_CallbackFunction =
    (params: ScanFileEntry_Component_ExpandedChange_CallbackFunction_Params) => void

////////

interface ScanFileEntry_Component_SelectionCheckboxChanged_CallbackFunction_Params {

    projectScanFileId: number
    checked: boolean
}

type ScanFileEntry_Component_SelectionCheckboxChanged_CallbackFunction =
    (params: ScanFileEntry_Component_SelectionCheckboxChanged_CallbackFunction_Params) => void

////////

/**
 *
 */
interface ScanFileEntry_Component_Props {
    showExpanded_OnMount: boolean

    //  force_Rerender_EmptyObjectReference_EmptyObjectReference:  Bypass all shouldComponentUpdate and render current value
    force_Rerender_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    //  force_ReloadFromServer_EmptyObjectReference:  Reload all data from server and display that data.  Display "Loading" message.
    force_ReloadFromServer_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    expand_All___Show_ScanFile_Details__Global_Force: Internal__Expand_All___Show_ScanFile_Details__Global_Force

    scanFile_Entry: ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry
    standardRunImporter_IsFullyConfigured: boolean
    runFeatureDetection_IsFullyConfigured: boolean
    projectIdentifier : string
    projectIsLocked : boolean
    show_SearchTag_Categories: boolean
    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    expandedChange_CallbackFunction: ScanFileEntry_Component_ExpandedChange_CallbackFunction
    selectionCheckboxChanged_CallbackFunction: ScanFileEntry_Component_SelectionCheckboxChanged_CallbackFunction
    searchChanged_Callback: () => void
    callback_SearchDeleted: () => void
    update_force_ReloadFromServer_EmptyObjectReference_Callback: () => void

    searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class

    update_force_ReRender_EmptyObjectReference_Callback: () => void
}

/**
 *
 */
interface ScanFileEntry_Component_State {

    forceReloadContents_Object__For__ScanFile_Details_Component?: object
    force_Rerender?: object
}

/**
 *
 */
class ScanFileEntry_Component extends React.Component< ScanFileEntry_Component_Props, ScanFileEntry_Component_State > {

    private _iconOrMainRowClicked_BindThis = this._iconOrMainRowClicked.bind(this);

    private _scanFileToSearch_Page_ScanFile_FakeLink_Clicked_BindThis = this._scanFileToSearch_Page_ScanFile_FakeLink_Clicked.bind(this)
    private _scanBrowser_Page_FakeLink_Clicked_BindThis = this._scanBrowser_Page_FakeLink_Clicked.bind(this);

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _show_DetailsBlock: boolean

    private _detailsBlock_EverShown: boolean = false;

    /**
     *
     */
    constructor(props: ScanFileEntry_Component_Props) {
        super(props)

        this.state = {
            force_Rerender: {}
        }
    }

    componentDidMount() {
        try {
            if ( this.props.showExpanded_OnMount ) {
                if ( !this._detailsBlock_EverShown ) {
                    this._detailsBlock_EverShown = true;
                }

                this._show_DetailsBlock = true;

                this.setState( { force_Rerender: {} } );
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<ScanFileEntry_Component_Props>, prevState: Readonly<ScanFileEntry_Component_State>, snapshot?: any ) {

        if ( prevProps.expand_All___Show_ScanFile_Details__Global_Force !== this.props.expand_All___Show_ScanFile_Details__Global_Force ) {

            //  Force Expand All / Collapse All Changed

            this._show_DetailsBlock = this.props.expand_All___Show_ScanFile_Details__Global_Force.expand_All___Show_ScanFile_Details__Global_ForceToValue

            this._expandOrCollapse_Details_Updated()
        }
    }

    /**
     *
     */
    private _iconOrMainRowClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {

        event.stopPropagation();

        this._show_DetailsBlock = ! this._show_DetailsBlock

        this._expandOrCollapse_Details_Updated()
    }

    /**
     *
     */
    private _expandOrCollapse_Details_Updated() {

        if ( ! this._detailsBlock_EverShown ) {
            this._detailsBlock_EverShown = true;
        }

        this.props.expandedChange_CallbackFunction({ expanded: this._show_DetailsBlock, projectScanFileId: this.props.scanFile_Entry.projectScanFileId })

        this.setState( { force_Rerender: {} } );
    }

    /**
     *
     */
    private _scanFileToSearch_Page_ScanFile_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation();
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        if ( limelight__IsTextSelected() ) {
            //  Text is selected so exit
            return; // EARLY RETURN
        }

        this.props.scanFile_Entry.scanFile_Code_FirstSix

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.scanFileToSearch_View_OpenDataPage({
            projectScanFileId: this.props.scanFile_Entry.projectScanFileId,
            scanFile_Code_FirstSix: this.props.scanFile_Entry.scanFile_Code_FirstSix,
            ctrlKeyOrMetaKey
        })
    }

    /**
     *
     */
    private _scanBrowser_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation();
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        if ( limelight__IsTextSelected() ) {
            //  Text is selected so exit
            return; // EARLY RETURN
        }

        const scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result =
            scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc({
                projectScanFileId: this.props.scanFile_Entry.projectScanFileId,
                scanFile_Code_FirstSix: this.props.scanFile_Entry.scanFile_Code_FirstSix
            })

        const url = scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result.basePathURL_AND_codeForProjectScanFileId + "/r";

        if ( ctrlKeyOrMetaKey ) {

            window.open(url, "_blank", "noopener");

            return;  // EARLY RETURN
        }

        //  NO ctrlKeyOrMetaKey

        window.location.href = url;

        return;  // EARLY RETURN

    }

    /**
     *
     */
    render() {

        const scanFile_Entry = this.props.scanFile_Entry;

        return (
            //  3 Column Grid
            <React.Fragment>

                {/*  Column 1 of Grid  -  Checkbox  */}
                <div style={ { width: 16, marginRight: 8, position: "relative" } }>
                    <div style={ { position: "absolute", top: -2 } }>
                        <input
                            type="checkbox"
                            onChange={ event => {
                                if ( this.props.selectionCheckboxChanged_CallbackFunction ) {
                                    this.props.selectionCheckboxChanged_CallbackFunction({
                                        projectScanFileId: this.props.scanFile_Entry.projectScanFileId,
                                        checked: event.target.checked
                                    })
                                }
                            }}
                        />
                    </div>
                </div>

                {/*  Column 2 of Grid  -  Triangle Icon for details open/closed  */}
                <div
                    style={ { width: 16 } }
                    onClick={ this._iconOrMainRowClicked_BindThis }
                >
                    { ( ! this._show_DetailsBlock ) ? (
                        <img className="icon-small fake-link-image " src="static/images/pointer-right.png"/>
                    ) : (
                        <img className="icon-small fake-link-image " src="static/images/pointer-down.png"/>
                    )}
                </div>

                {/*  Column 3 of Grid  - Main Contents (Scan File Name(s) AND the links to the right */}

                <div>
                    {/* 2 Column Grid */}
                    <div style={ { display: "grid", gridTemplateColumns: "  auto min-content " } }>

                        <div
                            style={ { maxWidth: "calc( 100vw - 390px )" } }
                        >
                            <span
                                className=" clickable "
                                onClick={ this._iconOrMainRowClicked_BindThis }
                            >
                                {/*  May be more than 1 scan filename for the scan file id so list them all comma delim  */}
                                <span>Scan Filename</span>{ ( scanFile_Entry.scanFilename_Array.length > 1 ) ? <span>s</span> : null }
                                <span>: </span>
                                <span>{ scanFile_Entry.scanFilename_Array.join( ", " ) }</span>
                            </span>
                        </div>
                        <div>
                            <div style={ { paddingLeft: 10, whiteSpace: "nowrap" } }>

                                {/* Navigation etc */ }

                                { this.props.scanFile_Entry.canDownload ? (
                                    <>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Click to download scan file
                                                </span>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <span
                                                className=" fake-link "
                                                onClick={ event => {

                                                    event.stopPropagation();

                                                    if ( limelight__IsTextSelected() ) {
                                                        //  Text is selected so exit
                                                        return; // EARLY RETURN
                                                    }
                                                    try {
                                                        const requestJSONObject = {
                                                            projectScanFile_Id: this.props.scanFile_Entry.projectScanFileId
                                                        }

                                                        const requestJSONString = JSON.stringify( requestJSONObject );

                                                        //  Create and submit form

                                                        const form = document.createElement( "form" );

                                                        form.style.display = "none"

                                                        form.setAttribute( "method", "post" );
                                                        form.setAttribute( "action", "d/dnld/psb/scan-file-contents-from-file-object-storage-entry-using-project-scan-file-id" );
                                                        form.setAttribute( "target", "_blank" );

                                                        const requestJSONStringField = document.createElement( "textarea" );
                                                        requestJSONStringField.setAttribute( "name", "requestJSONString" );

                                                        requestJSONStringField.value = requestJSONString

                                                        form.appendChild( requestJSONStringField );

                                                        document.body.appendChild( form );    // Not entirely sure if this is necessary

                                                        try {
                                                            form.submit();
                                                        } finally {

                                                            document.body.removeChild( form );
                                                        }

                                                    } catch ( e ) {
                                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                        throw e
                                                    }
                                                } }
                                            >
                                                [Download]
                                            </span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        <span> </span>
                                    </>
                                ) : null }


                                { ( ( ! this.props.projectIsLocked ) && ( this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ) ) ? (
                                    <>

                                        {/* COMMENT OUT: GOLD STANDARD '[Import Gold Standard]'

                                        { this.props.standardRunImporter_IsFullyConfigured ? (
                                            <>
                                                <span
                                                    className=" fake-link "
                                                    onClick={ event => { 

                                                        event.stopPropagation();

                                                        this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.
                                                        getFunction__open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay()({
                                                            component_Params: {
                                                                projectIdentifier: this.props.projectIdentifier,
                                                                projectScanFileId: this.props.scanFile_Entry.projectScanFileId,
                                                                scanFilename_Array: this.props.scanFile_Entry.scanFilename_Array
                                                            },
                                                            uploadComplete_Callback: () : void => {

                                                                refresh_ProjectPage_UploadData_MainPage_Main_Component()

                                                                refresh_ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component()

                                                                //  Refresh everything under this Component

                                                                this.setState( { forceReloadContents_Object__For__ScanFile_Details_Component: {} } );
                                                            }
                                                        })
                                                    } }
                                                >
                                                    [Import Gold Standard]
                                                </span>
                                                <span> </span>
                                            </>
                                        ) : null }

                                        */ }

                                        { this.props.runFeatureDetection_IsFullyConfigured ? (
                                            <>
                                                <span
                                                    className=" fake-link "
                                                    onClick={ event => {

                                                        event.stopPropagation();

                                                        if ( limelight__IsTextSelected() ) {
                                                            //  Text is selected so exit
                                                            return; // EARLY RETURN
                                                        }

                                                        this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.getFunction__open_Run_Hardklor_File_Contents_For_ScanFile_Project_Overlay__Function()( {
                                                            component_Params: {
                                                                projectIdentifier: this.props.projectIdentifier,
                                                                projectScanFileId_List: [ this.props.scanFile_Entry.projectScanFileId ],
                                                                scanFilename_Array_Array: [ this.props.scanFile_Entry.scanFilename_Array ]
                                                            },
                                                            uploadComplete_Callback: (): void => {

                                                                refresh_ProjectPage_UploadData_MainPage_Main_Component()

                                                                refresh_ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component()
                                                            }
                                                        } )
                                                    } }
                                                >
                                                    [Run Feature Detection]
                                                </span>
                                                <span> </span>
                                            </>
                                        ) : null }


                                        {/*{ this.props.standardRunImporter_IsFullyConfigured ? (*/ }
                                        {/*    <>*/ }
                                        {/*        <span*/ }
                                        {/*            className=" fake-link "*/ }
                                        {/*            onClick={ event => {*/ }

                                        {/*                event.stopPropagation();*/ }

                                        {/*                if ( limelight__IsTextSelected() ) {*/ }
                                        {/*                    //  Text is selected so exit*/ }
                                        {/*                    return; // EARLY RETURN*/ }
                                        {/*                }*/ }

                                        {/*                this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.*/ }
                                        {/*                getFunction__open_Import_Hardklor_Bullseye_Files_Contents_For_ScanFile_Project_Overlay()({*/ }
                                        {/*                    component_Params: {*/ }
                                        {/*                        projectIdentifier: this.props.projectIdentifier,*/ }
                                        {/*                        projectScanFileId: this.props.scanFile_Entry.projectScanFileId,*/ }
                                        {/*                        scanFilename_Array: this.props.scanFile_Entry.scanFilename_Array*/ }
                                        {/*                    },*/ }
                                        {/*                    uploadComplete_Callback: () : void => {*/ }

                                        {/*                        refresh_ProjectPage_UploadData_MainPage_Main_Component()*/ }

                                        {/*                        refresh_ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component()*/ }
                                        {/*                    }*/ }
                                        {/*                })*/ }
                                        {/*            } }*/ }
                                        {/*        >*/ }
                                        {/*            [Import Feature Detection]*/ }
                                        {/*        </span>*/ }
                                        {/*        <span> </span>*/ }
                                        {/*    </>*/ }
                                        {/*) : null }*/ }
                                    </>
                                ) : null }

                                { this.props.scanFile_Entry.entryHasAnyRelatedProjectSearchId ? (
                                    //  Only show when have any searches
                                    <>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                limelight__TooltipAddition_Component_ControlClick_OR_CommandClick_ToOpenInNewTab()
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <span
                                                className=" fake-link "
                                                onClick={ this._scanFileToSearch_Page_ScanFile_FakeLink_Clicked_BindThis }
                                            >
                                                [Compare Results by Scan]
                                            </span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        <span> </span>
                                    </>
                                ) : null }
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        limelight__TooltipAddition_Component_ControlClick_OR_CommandClick_ToOpenInNewTab()
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <span
                                        className=" fake-link "
                                        onClick={ this._scanBrowser_Page_FakeLink_Clicked_BindThis }
                                    >
                                        [Scan Browser]
                                    </span>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                { this.props.scanFile_Entry.userIsProjectOwner ? (
                                    <>
                                        <span> </span>
                                        { this.props.scanFile_Entry.canDeleteEntry ? (
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    <span>
                                                        Delete Scan File.
                                                    </span>
                                                }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                            <img
                                                className="icon-small clickable  "
                                                src="static/images/icon-circle-delete.png"
                                                onClick={ event => {
                                                    event.stopPropagation()

                                                    if ( limelight__IsTextSelected() ) {
                                                        //  Text is selected so exit
                                                        return; // EARLY RETURN
                                                    }

                                                    {
                                                        let confirmMessage = "Delete Scan File";

                                                        if ( scanFile_Entry.entryHasFeatureDetection ) {
                                                            confirmMessage += " and all associated Feature Detection";
                                                        }
                                                        confirmMessage += "?"

                                                        if ( ! window.confirm( confirmMessage ) ) {
                                                            return // EARLY RETURN
                                                        }
                                                    }

                                                    const requestObject = {
                                                        projectScanFileId: this.props.scanFile_Entry.projectScanFileId
                                                    };

                                                    const url = "d/rws/for-page/scan-file-in-project-delete";

                                                    console.log( "START: AJAX Call to: getting data from URL: " + url );

                                                    const webserviceCallStandardPostResponse = webserviceCallStandardPost( {
                                                        dataToSend: requestObject,
                                                        url,
                                                        dataRetrieval_CanRetry: false
                                                    } );

                                                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                                                    promise_webserviceCallStandardPost.catch( ( reason ) => {
                                                        try {

                                                            console.log( "END: REJECTED: getting data from URL: " + url );

                                                            // reject();

                                                            throw Error( "Delete Scan File Request Rejected: reason: " + reason )

                                                        } catch ( e ) {
                                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                            throw e
                                                        }
                                                    } )

                                                    promise_webserviceCallStandardPost.then( ( { responseData }: {
                                                        responseData: any
                                                    } ) => {
                                                        try {

                                                            console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

                                                            if ( ! responseData.deleteSuccess ) {

                                                                window.alert( "Scan file not deleted.  Unable to delete scan files with associated searches." )
                                                            }

                                                            if ( this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback ) {

                                                                this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback()

                                                                return // EARLY RETURN
                                                            }

                                                            limelight__ReloadPage_Function()

                                                        } catch ( e ) {
                                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                            throw e
                                                        }
                                                    } )

                                                } }
                                            />
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        ) : (
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    <span>
                                                        Unable to delete scan files with associated searches.
                                                    </span>
                                                }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                                <img
                                                    className=" icon-small "
                                                    src="static/images/icon-circle-delete-disabled.png"
                                                />
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        ) }
                                    </>
                                ) : null }
                            </div>
                        </div>
                    </div>

                    {/*  Scan File Details  */ }
                    <div
                        style={ { display: ( ! this._show_DetailsBlock ) ? "none" : null } }
                    >
                        { ( this._detailsBlock_EverShown ) ? (
                            <ScanFile_Details_Component
                                forceReloadContents_Object={ this.state.forceReloadContents_Object__For__ScanFile_Details_Component }

                                force_Rerender_EmptyObjectReference={ this.props.force_Rerender_EmptyObjectReference }
                                force_ReloadFromServer_EmptyObjectReference={ this.props.force_ReloadFromServer_EmptyObjectReference }

                                scanFile_Entry={ this.props.scanFile_Entry }
                                projectIdentifier={ this.props.projectIdentifier }
                                projectIsLocked={ this.props.projectIsLocked }
                                show_SearchTag_Categories={ this.props.show_SearchTag_Categories  }
                                get_searchesSearchTagsFolders_Result_Root__Function={ this.props.get_searchesSearchTagsFolders_Result_Root__Function }
                                projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                                dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                                projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }

                                searchChanged_Callback={ this.props.searchChanged_Callback }
                                callback_SearchDeleted={ this.props.callback_SearchDeleted }
                                update_force_ReloadFromServer_EmptyObjectReference_Callback={ this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback }

                                searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject={ this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject  }
                                update_force_ReRender_EmptyObjectReference_Callback={ this.props.update_force_ReRender_EmptyObjectReference_Callback }
                            />
                        ) : null }
                    </div>
                </div>

                {/*  Span all the columns for display bottom border  */}
                <div style={ { gridColumn: "1 / -1" } }>
                    <div className="top-level-label-bottom-border"></div>
                </div>

            </React.Fragment>
        )
    }
}

///////////////////////////////////////

// Component for Details for Single Scan File  -  not exported

/**
 *
 */
interface ScanFile_Details_Component_Props {

    forceReloadContents_Object: object

    //  Pass Through to children

    //  force_Rerender_EmptyObjectReference_EmptyObjectReference:  Bypass all shouldComponentUpdate and render current value
    force_Rerender_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    //  force_ReloadFromServer_EmptyObjectReference:  Reload all data from server and display that data.  Display "Loading" message.
    force_ReloadFromServer_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh


    scanFile_Entry: ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry
    projectIdentifier : string
    projectIsLocked : boolean

    show_SearchTag_Categories: boolean

    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    searchChanged_Callback: () => void
    callback_SearchDeleted: () => void

    update_force_ReloadFromServer_EmptyObjectReference_Callback: () => void

    searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class

    update_force_ReRender_EmptyObjectReference_Callback: () => void

    //  Any changes, update componentDidUpdate
}

/**
 *
 */
interface ScanFile_Details_Component_State {

    scanFile_Details_FromServer_Root?: ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_Root

    searchesSearchTagsFolders_Result_Root?: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    search_Tags_SelectSearchTags_Component_SearchTagData_Root?: Search_Tags_SelectSearchTags_Component_SearchTagData_Root

    show_UpdatingSearchDataMessage?: boolean
    show_LoadingSearchDataMessage_InitialLoad?: boolean

    forceRerender?: {}
    //  Any changes, update componentDidUpdate
}

/**
 *
 */
class ScanFile_Details_Component extends React.Component< ScanFile_Details_Component_Props, ScanFile_Details_Component_State > {

    private _updateDisplayLabel_FeatureDetection_Entry_BindThis = this._updateDisplayLabel_FeatureDetection_Entry.bind(this);
    private _remove_FeatureDetection_Entry_BindThis = this._remove_FeatureDetection_Entry.bind(this);
    private _remove_GoldStandard_Entry_BindThis = this._remove_GoldStandard_Entry.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

        const remove_FeatureDetection_Entry: FeatureDetection_Entry_Component__Deleted__Callback = this._remove_FeatureDetection_Entry;
    }

    /**
     *
     */
    constructor(props: ScanFile_Details_Component_Props) {
        super(props)

        this.state = {
            scanFile_Details_FromServer_Root: null,
            show_LoadingSearchDataMessage_InitialLoad: true
        }
    }

    /**
     *
     */
    componentDidMount() {

        this._getDetails();
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<ScanFile_Details_Component_Props>, prevState: Readonly<ScanFile_Details_Component_State>, snapshot?: any) {

        if (  prevProps.forceReloadContents_Object === this.props.forceReloadContents_Object ) {

            if ( prevProps.scanFile_Entry === this.props.scanFile_Entry
                || prevProps.projectIdentifier === this.props.projectIdentifier
                || prevProps.projectIsLocked === this.props.projectIsLocked
                || prevProps.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions === this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
                || prevProps.show_SearchTag_Categories === this.props.show_SearchTag_Categories
                || prevState.scanFile_Details_FromServer_Root !== this.state.scanFile_Details_FromServer_Root
                // || prevState.forceRerender !== this.state.forceRerender
            ) {

                //  Nothing changed so exit

                return; // EARLY RETURN
            }
        }

        this._getDetails();
    }

    /**
     *
     */
    private _getDetails() {

        const promise = projectPage_ScanFiles_View_Section_Get_ScanFile_Details_FromServer({ projectScanFileId: this.props.scanFile_Entry.projectScanFileId })

        promise.catch( reason =>  {  })

        promise.then(scanFile_Details_FromServer_Root => { try {

            this.setState({ scanFile_Details_FromServer_Root })
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        //  Get ALL Searches Data

        const searchesSearchTagsFolders_Result_Root__Function__Result = this.props.get_searchesSearchTagsFolders_Result_Root__Function({})

        if ( searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root ) {

            this.setState({
                searchesSearchTagsFolders_Result_Root : searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root,
                show_UpdatingSearchDataMessage: false, show_LoadingSearchDataMessage_InitialLoad: false
            })

            this._create_search_Tags_SelectSearchTags_Component_SearchTagData_Root( searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root )

            return; // EARLY RETURN
        }

        if ( ! searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root_Promise ) {
            throw Error("this.props.get_searchesSearchTagsFolders_Result_Root__Function({}): Not return searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root or searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root_Promise")
        }

        this.setState({ show_UpdatingSearchDataMessage: true })

        searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root_Promise.catch(reason => {

            this.setState({ show_UpdatingSearchDataMessage: false, show_LoadingSearchDataMessage_InitialLoad: false })
        })
        searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root_Promise.then(searchesSearchTagsFolders_Result_Root => { try {

            this.setState({
                searchesSearchTagsFolders_Result_Root,
                show_UpdatingSearchDataMessage: false, show_LoadingSearchDataMessage_InitialLoad: false
            })
            this._create_search_Tags_SelectSearchTags_Component_SearchTagData_Root( searchesSearchTagsFolders_Result_Root )

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException: e
            });
            throw e;
        }})
    }

    /**
     *
     * @param searchesSearchTagsFolders_Result_Root
     * @private
     */
    private _create_search_Tags_SelectSearchTags_Component_SearchTagData_Root( searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root ) : void {

        const searchTagCategory_Array_Filter_AllEntries: Array<Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry> = []

        for ( const category_input of searchesSearchTagsFolders_Result_Root.get_all_SearchTagCategories_InProject_In_DisplayOrder() ) {
            const category_Result: Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry = {
                category_id: category_input.category_id,
                category_label: category_input.category_label,
                label_Color_Font: category_input.label_Color_Font,
                label_Color_Background: category_input.label_Color_Background,
                label_Color_Border: category_input.label_Color_Border
            }
            searchTagCategory_Array_Filter_AllEntries.push(category_Result)
        }

        const searchTagEntries_Filter_AllEntries: Array<Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry> = []

        for (const tagEntry of searchesSearchTagsFolders_Result_Root.get_all_SearchTags_InProject_Iterator() ) {

            searchTagEntries_Filter_AllEntries.push(tagEntry)
        }

        const search_Tags_SelectSearchTags_Component_SearchTagData_Root: Search_Tags_SelectSearchTags_Component_SearchTagData_Root = {
            searchTagCategory_Array: searchTagCategory_Array_Filter_AllEntries, searchTag_Array: searchTagEntries_Filter_AllEntries
        }

        this.setState({ search_Tags_SelectSearchTags_Component_SearchTagData_Root })
    }

    /**
     *
     */
    private _updateDisplayLabel_FeatureDetection_Entry( id_MappingTbl: number, displayLabel: string ) : void {

      if ( this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback ) {
          this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback()

          return
      }

      limelight__ReloadPage_Function()
    }

    /**
     *
     */
    private _remove_FeatureDetection_Entry( id_MappingTbl: number ) : void {

        if ( this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback ) {
            this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback()

            return
        }

        limelight__ReloadPage_Function()
    }

    private _remove_GoldStandard_Entry( id_MappingTbl: number ) : void {

        //  Remove id from featureDetection_List

        this.setState ((prevState, props) => {
            prevState.scanFile_Details_FromServer_Root.goldStandard_List = prevState.scanFile_Details_FromServer_Root.goldStandard_List.filter(value => {
                if ( value.id_MappingTbl === id_MappingTbl ) {
                    return false;
                }
                return true;
            });
            return { scanFile_Details_FromServer_Root: prevState.scanFile_Details_FromServer_Root, forceRerender: {} };
        });
    }

    /**
     *
     */
    render() {

        let searchElements: Array<JSX.Element> = undefined

        if ( this.state.scanFile_Details_FromServer_Root
            && this.state.scanFile_Details_FromServer_Root.projectSearchIds_ForScanFile_List
            && this.state.scanFile_Details_FromServer_Root.projectSearchIds_ForScanFile_List.length > 0
            && this.state.searchesSearchTagsFolders_Result_Root ) {

            searchElements = []

            const searchObjectList: Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data> = []

            for ( const projectSearchId of this.state.scanFile_Details_FromServer_Root.projectSearchIds_ForScanFile_List ) {
                const searchData_For_ProjectSearchId = this.state.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId)
                if ( ! searchData_For_ProjectSearchId ) {
                    throw Error("this.state.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId) returned nothing for projectSearchId: " + projectSearchId )
                }
                searchObjectList.push( searchData_For_ProjectSearchId )
            }

            //  Sort on Search Id Descending
            searchObjectList.sort( (a,b) => {
                if ( a.searchId > b.searchId ) {
                    return -1
                }
                if ( a.searchId < b.searchId ) {
                    return 1
                }
                return 0
            })

            let counter = 0;

            const searchObjectList_length = searchObjectList.length

            for ( const searchObject of searchObjectList ) {

                counter++;

                //  Show Separator Below for all BUT last entry
                let showSeparatorBelow = true;
                if ( counter === searchObjectList_length ) {
                    showSeparatorBelow = false;
                }

                const searchElement = (
                    <ProjectPage_SearchEntry_UsedInMultipleSections_Component
                        key={ searchObject.projectSearchId }

                        force_Rerender_EmptyObjectReference={ this.props.force_Rerender_EmptyObjectReference }
                        force_ReloadFromServer_EmptyObjectReference={ this.props.force_ReloadFromServer_EmptyObjectReference }

                        projectIdentifier={ this.props.projectIdentifier }
                        searchDisplayListItem={ searchObject }
                        searchesSearchTagsFolders_Result_Root={ this.state.searchesSearchTagsFolders_Result_Root }
                        search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root={ this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                        expand_All_Folders__ShowSearchDetailsTo_Global_Force={ null }
                        selected={ null }
                        show_SearchTag_Categories={ this.props.show_SearchTag_Categories }
                        showSeparatorBelow={ showSeparatorBelow }
                        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                        projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                        callbackOn_Search_Entry_Clicked={ null }
                        searchChanged_Callback={ this.props.searchChanged_Callback }
                        deleteSearch_Callback={ this.props.callback_SearchDeleted }

                        update_force_ReRender_EmptyObjectReference_Callback={ this.props.update_force_ReRender_EmptyObjectReference_Callback }
                        searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject={ this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject }
                    />
                )

                searchElements.push( searchElement )
            }
        }

        return (

            <div style={ { marginTop: 6, marginLeft: 30 } }>
                <div >
                    { ( ! this.state.scanFile_Details_FromServer_Root ) ? (
                        <div>
                            Loading Scan File Details
                        </div>
                    ): (
                        <div>

                            <div style={ { marginBottom: 9 } }>
                                <div>
                                    Searches
                                </div>
                                <div style={ { marginLeft: 20, marginTop: 8 } }>
                                    { this.state.show_LoadingSearchDataMessage_InitialLoad ? (
                                        <div>
                                            Loading Searches...
                                        </div>
                                    ) : ! searchElements ? (
                                        <div style={ { marginBottom: 10 }}>
                                            None
                                        </div>
                                    ) : (
                                        <div style={ { position: "relative" } }>
                                            { searchElements }
                                            { this.state.show_UpdatingSearchDataMessage ? (
                                                <div className=" block-updating-overlay-container " >
                                                    Updating Searches
                                                </div>
                                            ) : null }
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                Feature Detection Runs
                            </div>
                            <div style={ { marginLeft: 20, marginTop: 8 } }>
                                {
                                    this.state.scanFile_Details_FromServer_Root.featureDetection_List.length === 0 ? (
                                        <div>
                                            None
                                        </div>
                                    ) : (
                                        this.state.scanFile_Details_FromServer_Root.featureDetection_List.map(value => {
                                            return (
                                                <FeatureDetection_Entry_Component
                                                    key={ value.id_MappingTbl}
                                                    featureDetection_Entry={ value }
                                                    scanFile_Entry_Parent={ this.props.scanFile_Entry }
                                                    projectIdentifier={ this.props.projectIdentifier }
                                                    projectIsLocked={ this.props.projectIsLocked }
                                                    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                                                    entry_update_DisplayLabel_Description_Callback={ this._updateDisplayLabel_FeatureDetection_Entry_BindThis }
                                                    entryDeleted_Callback={ this._remove_FeatureDetection_Entry_BindThis }
                                                />
                                            )
                                        })
                                    )
                                }
                            </div>


                            {/* COMMENT OUT: GOLD STANDARD 'Gold Standard' Display Section

                            <div style={ { marginTop: 10 } }>
                                Gold Standard
                            </div>
                            <div style={ { marginLeft: 20, marginTop: 8 } }>
                                {
                                    this.state.scanFile_Details_FromServer_Root.goldStandard_List.length === 0 ? (
                                        <div>
                                            None
                                        </div>
                                    ) : (
                                        this.state.scanFile_Details_FromServer_Root.goldStandard_List.map(value => {
                                            return (
                                                <GoldStandard_Entry_Component
                                                    key={ value.id_MappingTbl}
                                                    goldStandard_Entry={ value }
                                                    projectIdentifier={ this.props.projectIdentifier }
                                                    projectIsLocked={ this.props.projectIsLocked }
                                                    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                                                    entry_update_DisplayLabel_Description_Callback={ this._updateDisplayLabel_FeatureDetection_Entry_BindThis }
                                                    entryDeleted_Callback={ this._remove_GoldStandard_Entry_BindThis }
                                                />
                                            )
                                        })
                                    )
                                }
                            </div>

                            */}

                        </div>
                    )}
                </div>
            </div>
        );
    }
}


///////////////////////////////////////

// Component for Single Feature Detection Entry  -  not exported

type FeatureDetection_Entry_Component__Deleted__Callback = ( id: number ) => void

/**
 *
 */
interface FeatureDetection_Entry_Component_Props {
    featureDetection_Entry: ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_FeatureDetectionEntry
    scanFile_Entry_Parent: ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry
    projectIdentifier : string
    projectIsLocked : boolean
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    entry_update_DisplayLabel_Description_Callback: (id: number, displayLabel: string, description: string ) => void,
    entryDeleted_Callback: FeatureDetection_Entry_Component__Deleted__Callback

    //  Any changes, update componentDidUpdate
}

/**
 *
 */
interface FeatureDetection_Entry_Component_State {

    //  Any changes, update componentDidUpdate
    deleteInProgress?: boolean
    forceRerender?: {}
}

/**
 *
 */
class FeatureDetection_Entry_Component extends React.Component< FeatureDetection_Entry_Component_Props, FeatureDetection_Entry_Component_State > {

    private _edit_DisplayLabel_Clicked_BindThis = this._edit_DisplayLabel_Clicked.bind(this);
    private _delete_Entry_Clicked_BindThis = this._delete_Entry_Clicked.bind(this);
    private _featureDetectionView_Page_FakeLink_Clicked_BindThis = this._featureDetectionView_Page_FakeLink_Clicked.bind(this)

    // private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {
    //
    // }

    private _displayLabel_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    /**
     *
     */
    constructor(props: FeatureDetection_Entry_Component_Props) {
        super(props)

        this._displayLabel_Div_Ref = React.createRef<HTMLDivElement>();

        this.state = {
            deleteInProgress: false,
            forceRerender: {}
        }
    }

    /**
     *
     */
    private _edit_DisplayLabel_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        event.stopPropagation();

        const buttonContainer_BoundingRect = this._displayLabel_Div_Ref.current.getBoundingClientRect();

        let position_top =  buttonContainer_BoundingRect.top;
        let position_left =  buttonContainer_BoundingRect.left;

        const change_Callback = ( params : FeatureDetection_Label_Description_Change_Component_Change_Callback_Params ) => {

            const newLabel: string = params.newLabel;
            const newDescription: string = params.newDescription;

            // const featureDetection_Entry = this.props.featureDetection_Entry;

            this.props.featureDetection_Entry.displayLabel = newLabel;
            this.props.featureDetection_Entry.description = newDescription

            this.setState({ forceRerender: {} });

            window.setTimeout( () => {
                try {

                    this.props.entry_update_DisplayLabel_Description_Callback( this.props.featureDetection_Entry.id_MappingTbl, newLabel, newDescription );
                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            }, 10 )

        }

        this.props.
        projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.
            getFunction__featureDetection_Label_Description_Change_Component__openOverlay__Function()({
            featureDetectionRoot_MappingTblId: this.props.featureDetection_Entry.id_MappingTbl,
            existingLabel: this.props.featureDetection_Entry.displayLabel,
            existingDescription: this.props.featureDetection_Entry.description,
            position_left,
            position_top,
            cancel_Callback: () => {},
            change_Callback
        })
    }

    /**
     *
     */
    private _delete_Entry_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        event.stopPropagation();

        if ( ! window.confirm( "Delete the Feature Detection Entry" ) ) {

            return; // EARLY RETURN
        }

        this.setState({ deleteInProgress: true })

        const promise =
            this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.
            getFunction__projectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer__Function() (
                { featureDetectionRoot_MappingTblId: this.props.featureDetection_Entry.id_MappingTbl })


        promise.catch(reason => {  })
        promise.then(value => { try {
            this.props.entryDeleted_Callback( this.props.featureDetection_Entry.id_MappingTbl )
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    private _featureDetectionView_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation();
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        let url_path__feature_detection: string;

        /**
         * DOM <script> tags hold the paths to the data pages
         */
        let url_path__feature_detection__Element = document.getElementById("url_path__feature_detection");
        if (!url_path__feature_detection__Element) {
            throw Error("No DOM element for id 'url_path__feature_detection'");
        }
        url_path__feature_detection = url_path__feature_detection__Element.innerHTML;

        const pathCode_Version = "a";

        const pathCode =
            "c/" +  // is path code
            pathCode_Version +
            this.props.scanFile_Entry_Parent.scanFile_Code_FirstSix +
            this.props.featureDetection_Entry.id_MappingTbl.toString( 35 ); //  35 kept in sync with other code

        const url = url_path__feature_detection + pathCode + "/r";

        if ( ctrlKeyOrMetaKey ) {

            window.open(url, "_blank", "noopener");

            return;  // EARLY RETURN
        }

        //  NO ctrlKeyOrMetaKey

        window.location.href = url;

        return;  // EARLY RETURN

    }

    /**
     *
     */
    render() {

        return (
            <div style={ { marginBottom: 5 } }>
                <span
                    ref={ this._displayLabel_Div_Ref } // ref used to get position
                >{ this.props.featureDetection_Entry.description } ({ this.props.featureDetection_Entry.displayLabel })</span>

                { this.state.deleteInProgress ? (
                    <React.Fragment>
                        <span> - delete in progress</span>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        { this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ? (
                            <React.Fragment>
                                <span> </span>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            Change Label
                                        </span>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <img
                                        src="static/images/icon-edit.png"
                                        className="icon-small clickable  "
                                        onClick={ this._edit_DisplayLabel_Clicked_BindThis }
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </React.Fragment>
                        ) : null }

                        { this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ? (
                            <React.Fragment>
                                <span> </span>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            Delete Feature Detection Entry
                                        </span>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <img
                                        src="static/images/icon-circle-delete.png"
                                        className="icon-small clickable  "
                                        onClick={ this._delete_Entry_Clicked_BindThis }
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </React.Fragment>
                        ) : null }

                        <span> </span>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                limelight__TooltipAddition_Component_ControlClick_OR_CommandClick_ToOpenInNewTab()
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                className=" fake-link "
                                onClick={ this._featureDetectionView_Page_FakeLink_Clicked_BindThis }
                            >[View Feature Detection Run]</span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </React.Fragment>
                ) }
            </div>

        );
    }
}

///////////////////////////////////////

// Component for Single Gold Standard Entry  -  not exported

type GoldStandard_Entry_Component__Deleted__Callback = ( id: number ) => void

/**
 *
 */
interface GoldStandard_Entry_Component_Props {
    goldStandard_Entry: ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_GoldStandardEntry
    projectIdentifier : string
    projectIsLocked : boolean
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    entry_update_DisplayLabel_Description_Callback: (id: number, displayLabel: string, description: string ) => void,
    entryDeleted_Callback: GoldStandard_Entry_Component__Deleted__Callback

    //  Any changes, update componentDidUpdate
}

/**
 *
 */
interface GoldStandard_Entry_Component_State {

    //  Any changes, update componentDidUpdate
    deleteInProgress?: boolean
    forceRerender?: {}
}

/**
 *
 */
class GoldStandard_Entry_Component extends React.Component< GoldStandard_Entry_Component_Props, GoldStandard_Entry_Component_State > {

    private _edit_DisplayLabel_Clicked_BindThis = this._edit_DisplayLabel_Clicked.bind(this);
    private _delete_Entry_Clicked_BindThis = this._delete_Entry_Clicked.bind(this);

    // private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {
    //
    // }

    private _displayLabel_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    /**
     *
     */
    constructor(props: GoldStandard_Entry_Component_Props) {
        super(props)

        this._displayLabel_Div_Ref = React.createRef<HTMLDivElement>();

        this.state = {
            deleteInProgress: false,
            forceRerender: {}
        }
    }

    private _edit_DisplayLabel_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        event.stopPropagation();

        const buttonContainer_BoundingRect = this._displayLabel_Div_Ref.current.getBoundingClientRect();

        let position_top =  buttonContainer_BoundingRect.top;
        let position_left =  buttonContainer_BoundingRect.left;

        const change_Callback = ( params : GoldStandard_Label_Description_Change_Component_Change_Callback_Params ) => {

            const newLabel: string = params.newLabel;
            const newDescription: string = params.newDescription;

            // const goldStandard_Entry = this.props.goldStandard_Entry;

            this.props.goldStandard_Entry.displayLabel = newLabel;
            this.props.goldStandard_Entry.description = newDescription

            this.props.entry_update_DisplayLabel_Description_Callback( this.props.goldStandard_Entry.id_MappingTbl, newLabel, newDescription );

            this.setState({ forceRerender: {} });
        }

        this.props.
        projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.
        getFunction__goldStandard_Label_Description_Change_Component__openOverlay__Function()({
            goldStandardRoot_MappingTblId: this.props.goldStandard_Entry.id_MappingTbl,
            existingLabel: this.props.goldStandard_Entry.displayLabel,
            existingDescription: this.props.goldStandard_Entry.description,
            position_left,
            position_top,
            cancel_Callback: () => {},
            change_Callback
        })
    }

    private _delete_Entry_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        event.stopPropagation();

        if ( ! window.confirm( "Delete the Gold Standard Entry" ) ) {

            return; // EARLY RETURN
        }

        this.setState({ deleteInProgress: true })

        const promise =
            this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.
            getFunction__projectPage_ScanFiles_View_Section_ScanFile_GoldStandardMappingEntry_Delete_FromServer__Function() (
                { goldStandardRoot_MappingTblId: this.props.goldStandard_Entry.id_MappingTbl })


        promise.catch(reason => {  })
        promise.then(value => { try {
            this.props.entryDeleted_Callback( this.props.goldStandard_Entry.id_MappingTbl )
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    render() {

        return (
            <div>
                <span
                    ref={ this._displayLabel_Div_Ref } // ref used to get position
                >{ this.props.goldStandard_Entry.description } ({ this.props.goldStandard_Entry.displayLabel })</span>

                { this.state.deleteInProgress ? (
                    <React.Fragment>
                        <span> - delete in progress</span>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {( this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ? (
                                <React.Fragment>
                                    <span> </span>
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                Change Label
                                            </span>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <img
                                            src="static/images/icon-edit.png"
                                            className="icon-small clickable  "
                                            onClick={ this._edit_DisplayLabel_Clicked_BindThis }
                                        />
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </React.Fragment>
                            ) : null
                        )}

                        {( this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ? (
                                <React.Fragment>
                                    <span> </span>
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                Delete Gold Standard Entry
                                            </span>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <img
                                            src="static/images/icon-circle-delete.png"
                                            className="icon-small clickable  "
                                            onClick={ this._delete_Entry_Clicked_BindThis }
                                        />
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </React.Fragment>
                            ) : null
                        )}
                    </React.Fragment>
                ) }
            </div>

        );
    }
}

