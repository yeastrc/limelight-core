/**
 * projectPage_FeatureDetection_Runs_View_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Feature Detection Runs View Section - Provide interaction for All Users, Including Public User
 *
 * Feature Detection Run List Component
 *
 */

import React from "react";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions} from "page_js/data_pages/other_data_pages/project_page/project_page__common/projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";
import {Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage} from "page_js/data_pages/common__search_display_verbose_value_store_session_storage/search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage";
import { ProjectPage_SearchesAdmin } from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {
    projectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer,
    ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_FeatureDetection_Run_Entry
} from "page_js/data_pages/other_data_pages/project_page/project_page__feature_detection_runs_view_section/all_users_incl_public_user/projectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer";
import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";
import { ProjectPage_SearchEntry_UsedInMultipleSections_Component } from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchEntry_UsedInMultipleSections_Component";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import {
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry,
    Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";
import {
    ProjectPage_FeatureDetection_Runs_View_Section_FeatureDetection_Run_Details_FromServer_Root,
    projectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Run_Details_FromServer
} from "page_js/data_pages/other_data_pages/project_page/project_page__feature_detection_runs_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_Get_FeatureDetection_Run_Details_FromServer";
import { FeatureDetection_Label_Description_Change_Component_Change_Callback_Params } from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/project_owner/featureDetection_Label_Description_Change_Component_and_WebserviceCall";
import { scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc } from "page_js/data_pages/scan_file_driven_pages/scan_file_driven_pages__utils/scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";


/**
 *
 */
export interface ProjectPage_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component_Props {

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
}

/**
 *
 */
interface ProjectPage_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component_State {

    show_LoadingData_Message?: boolean

    show_SearchTag_Categories?: boolean

    featureDetection_Run_Entry_CombinedEntries_Array?: Array<ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_FeatureDetection_Run_Entry>
    standardRunImporter_IsFullyConfigured?: boolean
    runFeatureDetection_IsFullyConfigured?: boolean

    expand_All___Show_FeatureDetectionRun_Details__Global_Force?: Internal__Expand_All___Show_FeatureDetectionRun_Details__Global_Force

    force_ReRender?: object
}

/**
 *
 */
export class ProjectPage_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component extends React.Component< ProjectPage_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component_Props, ProjectPage_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component_State > {

    private _expand_All_Button_Clicked_BindThis = this._expand_All_Button_Clicked.bind(this);
    private _collapse_All_Button_Clicked_BindThis = this._collapse_All_Button_Clicked.bind(this);

    private _updateFor_FeatureDetection_Run_Entry_Component_ExpandedChange_BindThis = this._updateFor_FeatureDetection_Run_Entry_Component_ExpandedChange.bind(this)
    private _updateFor_FeatureDetection_RunSelection_Change_BindThis = this._updateFor_FeatureDetection_RunSelection_Change.bind(this)

    private _searchChanged_Callback_BindThis = this._searchChanged_Callback.bind(this)
    private _callback_SearchDeleted_BindThis = this._callback_SearchDeleted.bind(this);

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

        const featureDetection_RunEntry_Component_SelectionCheckboxChanged_CallbackFunction: FeatureDetection_Run_Entry_Component_SelectionCheckboxChanged_CallbackFunction = this._updateFor_FeatureDetection_RunSelection_Change
    }

    private _featureDetection_Runs_Selected_FeatureDetection_Run_Mapping_Id_Set: Set<number> = new Set();

    private _featureDetection_Runs_Expanded_FeatureDetection_Run_Mapping_Id_Set: Set<number> = new Set();

    private _buttons_For_ActOn_FeatureDetection_Run_CheckboxSelections_Disabled: boolean = true //  start out with NO Feature Detection Run Selections


    /**
     *
     */
    constructor(props: ProjectPage_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component_Props) {
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

        this.get_FeatureDetection_Run_List_FromServer();
    }

    componentDidUpdate( prevProps: Readonly<ProjectPage_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component_Props>, prevState: Readonly<ProjectPage_Section_AllUsers_InclPublicUser_Interaction_FeatureDetection_Run_List_Component_State>, snapshot?: any ) {

        if ( prevProps.force_ReloadFromServer_EmptyObjectReference !== this.props.force_ReloadFromServer_EmptyObjectReference ) {

            this.setState({ show_LoadingData_Message: true })

            //  ReLoad Data

            this.get_FeatureDetection_Run_List_FromServer();
        }
    }

    /**
     *
     */
    private get_FeatureDetection_Run_List_FromServer() : void {

        const promise = projectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer({ projectIdentifier: this.props.projectIdentifier });

        promise.catch( reason => {  });

        promise.then( featureDetection_Run_List_FromServer_Root => {  try {

            this.setState({
                show_LoadingData_Message: false,
                featureDetection_Run_Entry_CombinedEntries_Array: featureDetection_Run_List_FromServer_Root.featureDetection_Runs_In_Project_List,
                standardRunImporter_IsFullyConfigured: featureDetection_Run_List_FromServer_Root.standardRunImporter_IsFullyConfigured,
                runFeatureDetection_IsFullyConfigured: featureDetection_Run_List_FromServer_Root.runFeatureDetection_IsFullyConfigured
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    private _expand_All_Button_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.setState({ expand_All___Show_FeatureDetectionRun_Details__Global_Force: { expand_All___Show_FeatureDetectionRun_Details__Global_ForceToValue: true } });
    }


    /**
     *
     */
    private _collapse_All_Button_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.setState({ expand_All___Show_FeatureDetectionRun_Details__Global_Force: { expand_All___Show_FeatureDetectionRun_Details__Global_ForceToValue: false } });
    }

    /**
     *
     */
    private _updateFor_FeatureDetection_Run_Entry_Component_ExpandedChange( params: FeatureDetection_Run_Entry_Component_ExpandedChange_CallbackFunction_Params ) {

        if ( params.expanded ) {
            this._featureDetection_Runs_Expanded_FeatureDetection_Run_Mapping_Id_Set.add( params.featureDetection_Run_Mapping_Id )
        } else {
            this._featureDetection_Runs_Expanded_FeatureDetection_Run_Mapping_Id_Set.delete( params.featureDetection_Run_Mapping_Id )
        }
    }

    /**
     *
     */
    private _updateFor_FeatureDetection_RunSelection_Change(params: FeatureDetection_Run_Entry_Component_SelectionCheckboxChanged_CallbackFunction_Params) {

        if ( params.checked ) {
            this._featureDetection_Runs_Selected_FeatureDetection_Run_Mapping_Id_Set.add( params.featureDetection_Run_Mapping_Id )
        } else {
            this._featureDetection_Runs_Selected_FeatureDetection_Run_Mapping_Id_Set.delete( params.featureDetection_Run_Mapping_Id )
        }

        this._updateFor__featureDetection_Runs_Selected_ProjectFeatureDetection_RunId_Set_Change()
    }

    /**
     *
     */
    private _updateFor__featureDetection_Runs_Selected_ProjectFeatureDetection_RunId_Set_Change() {

        if ( this._featureDetection_Runs_Selected_FeatureDetection_Run_Mapping_Id_Set.size > 0 ) {
            if ( this._buttons_For_ActOn_FeatureDetection_Run_CheckboxSelections_Disabled ) {
                //  Changed
                this._buttons_For_ActOn_FeatureDetection_Run_CheckboxSelections_Disabled = false;
                this.setState({ force_ReRender: {} })
            }
        } else {
            if ( ! this._buttons_For_ActOn_FeatureDetection_Run_CheckboxSelections_Disabled ) {
                //  Changed
                this._buttons_For_ActOn_FeatureDetection_Run_CheckboxSelections_Disabled = true;
                this.setState({ force_ReRender: {} })
            }
        }
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

        let no_FeatureDetection_Runs_Found = false;
        const featureDetection_Run_Element_List: Array<JSX.Element> = [];

        if ( this.state.featureDetection_Run_Entry_CombinedEntries_Array ) {

            if ( this.state.featureDetection_Run_Entry_CombinedEntries_Array.length === 0 ) {

                no_FeatureDetection_Runs_Found = true;

            } else {
                for ( const featureDetection_Run_Entry of this.state.featureDetection_Run_Entry_CombinedEntries_Array ) {

                    const element = (
                        <FeatureDetection_Run_Entry_Component
                            key={ featureDetection_Run_Entry.featureDetection_Run_Mapping_Id }
                            showExpanded_OnMount={ this._featureDetection_Runs_Expanded_FeatureDetection_Run_Mapping_Id_Set.has( featureDetection_Run_Entry.featureDetection_Run_Mapping_Id )}
                            expand_All___Show_FeatureDetectionRun_Details__Global_Force={ this.state.expand_All___Show_FeatureDetectionRun_Details__Global_Force }
                            featureDetection_Run_Entry={ featureDetection_Run_Entry }
                            standardRunImporter_IsFullyConfigured={ this.state.standardRunImporter_IsFullyConfigured }
                            runFeatureDetection_IsFullyConfigured={ this.state.runFeatureDetection_IsFullyConfigured }
                            projectIdentifier={ this.props.projectIdentifier }
                            projectIsLocked={ this.props.projectIsLocked }
                            show_SearchTag_Categories={ this.state.show_SearchTag_Categories }
                            get_searchesSearchTagsFolders_Result_Root__Function={ this.props.get_searchesSearchTagsFolders_Result_Root__Function }
                            projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                            dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                            projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                            expandedChange_CallbackFunction={ this._updateFor_FeatureDetection_Run_Entry_Component_ExpandedChange_BindThis }
                            selectionCheckboxChanged_CallbackFunction={ this._updateFor_FeatureDetection_RunSelection_Change_BindThis }
                            searchChanged_Callback={ this._searchChanged_Callback_BindThis }
                            callback_SearchDeleted={ this._callback_SearchDeleted_BindThis }
                            update_force_ReloadFromServer_EmptyObjectReference_Callback={ this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback }
                        />
                    )

                    featureDetection_Run_Element_List.push(element);
                }
            }
        }

        return (
            <div style={ { marginBottom: 20 } }>
                { (this.state.show_LoadingData_Message) ? (
                    <div>
                        Loading Data
                    </div>
                ) : no_FeatureDetection_Runs_Found ? (
                    <div>
                        No feature detection runs in this project.
                    </div>
                ) : (
                    <>
                        <div style={ { marginBottom: 10, whiteSpace: "nowrap" } }>

                            {/*  Expand All and Collapse All Buttons  */}
                            <input type="button" className="submit-button "
                                   id="expand_all_search_details_button"
                                   title="Show Details for All Feature Detection."
                                   value="Expand All"
                                   onClick={ this._expand_All_Button_Clicked_BindThis }
                            />
                            <span> </span>
                            <input className="submit-button " type="button"
                                   id="collapse_all_search_details_button"
                                   title="Hide Details for All Feature Detection."
                                   value="Collapse All"
                                   onClick={ this._collapse_All_Button_Clicked_BindThis }
                            />
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
                            { featureDetection_Run_Element_List }
                        </div>

                    </>
                ) }
            </div>
        )
    }
}


////////////////////////////////////////////



/**
 * Create new Object and pass in as Props to force all Show Feature Detection Run Details to the new boolean value of true or false
 *
 * After the new object is processed, it's value is then ignored until a new object is passed.  tested using object reference
 *
 * If passed null, ignore
 */
class Internal__Expand_All___Show_FeatureDetectionRun_Details__Global_Force {
    expand_All___Show_FeatureDetectionRun_Details__Global_ForceToValue : boolean  // true if Expand, false if Collapse
}

//  Component for Single Feature Detection Run - not exported

interface FeatureDetection_Run_Entry_Component_ExpandedChange_CallbackFunction_Params {

    featureDetection_Run_Mapping_Id: number
    expanded: boolean
}

type FeatureDetection_Run_Entry_Component_ExpandedChange_CallbackFunction =
    (params: FeatureDetection_Run_Entry_Component_ExpandedChange_CallbackFunction_Params) => void

////////

interface FeatureDetection_Run_Entry_Component_SelectionCheckboxChanged_CallbackFunction_Params {

    featureDetection_Run_Mapping_Id: number
    checked: boolean
}

type FeatureDetection_Run_Entry_Component_SelectionCheckboxChanged_CallbackFunction =
    (params: FeatureDetection_Run_Entry_Component_SelectionCheckboxChanged_CallbackFunction_Params) => void

////////

/**
 *
 */
interface FeatureDetection_Run_Entry_Component_Props {
    showExpanded_OnMount: boolean

    expand_All___Show_FeatureDetectionRun_Details__Global_Force: Internal__Expand_All___Show_FeatureDetectionRun_Details__Global_Force

    featureDetection_Run_Entry: ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_FeatureDetection_Run_Entry
    standardRunImporter_IsFullyConfigured: boolean
    runFeatureDetection_IsFullyConfigured: boolean
    projectIdentifier : string
    projectIsLocked : boolean
    show_SearchTag_Categories: boolean
    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    expandedChange_CallbackFunction: FeatureDetection_Run_Entry_Component_ExpandedChange_CallbackFunction
    selectionCheckboxChanged_CallbackFunction: FeatureDetection_Run_Entry_Component_SelectionCheckboxChanged_CallbackFunction
    searchChanged_Callback: () => void
    callback_SearchDeleted: () => void

    update_force_ReloadFromServer_EmptyObjectReference_Callback: () => void
}

/**
 *
 */
interface FeatureDetection_Run_Entry_Component_State {

    forceReloadContents_Object__For__Internal__FeatureDetection_Run_Details_Component?: object
    force_Rerender?: object
}

/**
 *
 */
class FeatureDetection_Run_Entry_Component extends React.Component< FeatureDetection_Run_Entry_Component_Props, FeatureDetection_Run_Entry_Component_State > {

    private _iconOrMainRowClicked_BindThis = this._iconOrMainRowClicked.bind(this);
    private _edit_DisplayLabel_Clicked_BindThis = this._edit_DisplayLabel_Clicked.bind(this);
    private _featureDetection_Page_FakeLink_Clicked_BindThis = this._featureDetection_Page_FakeLink_Clicked.bind(this);

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _show_DetailsBlock: boolean

    private _detailsBlock_EverShown: boolean = false;

    private _displayLabel_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    /**
     *
     */
    constructor(props: FeatureDetection_Run_Entry_Component_Props) {
        super(props)

        this._displayLabel_Div_Ref = React.createRef<HTMLDivElement>();

        this.state = {
            force_Rerender: {}
        }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            if ( this.props.showExpanded_OnMount ) {
                if ( ! this._detailsBlock_EverShown ) {
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
    componentDidUpdate( prevProps: Readonly<FeatureDetection_Run_Entry_Component_Props>, prevState: Readonly<FeatureDetection_Run_Entry_Component_State>, snapshot?: any ) {

        if ( prevProps.expand_All___Show_FeatureDetectionRun_Details__Global_Force !== this.props.expand_All___Show_FeatureDetectionRun_Details__Global_Force ) {

            //  Force Expand All / Collapse All Changed

            this._show_DetailsBlock = this.props.expand_All___Show_FeatureDetectionRun_Details__Global_Force.expand_All___Show_FeatureDetectionRun_Details__Global_ForceToValue

            this._expandOrCollapse_Details_Updated()
        }
    }

    /**
     *
     */
    private _iconOrMainRowClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {

        event.stopPropagation();

        if ( limelight__IsTextSelected() ) {
            //  Text is selected so exit
            return // EARLY RETURN
        }

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

        this.props.expandedChange_CallbackFunction({ expanded: this._show_DetailsBlock, featureDetection_Run_Mapping_Id: this.props.featureDetection_Run_Entry.featureDetection_Run_Mapping_Id })

        this.setState( { force_Rerender: {} } );
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

            this.props.featureDetection_Run_Entry.displayLabel = newLabel;
            this.props.featureDetection_Run_Entry.description = newDescription

            this.setState({ force_Rerender: {} });

            if ( this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback ) {

                window.setTimeout( () => {
                    try {

                        this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback()
                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        throw e
                    }
                }, 10 )

                return
            }

            limelight__ReloadPage_Function()
        }

        this.props.
        projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.
        getFunction__featureDetection_Label_Description_Change_Component__openOverlay__Function()({
            featureDetectionRoot_MappingTblId: this.props.featureDetection_Run_Entry.featureDetection_Run_Mapping_Id,
            existingLabel: this.props.featureDetection_Run_Entry.displayLabel,
            existingDescription: this.props.featureDetection_Run_Entry.description,
            position_left,
            position_top,
            cancel_Callback: () => {},
            change_Callback
        })
    }

    /**
     *
     */
    private _featureDetection_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation();
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        if ( limelight__IsTextSelected() ) {
            //  Text is selected so exit
            return; // EARLY RETURN
        }

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
            this.props.featureDetection_Run_Entry.scanFile_Code_FirstSix +
            this.props.featureDetection_Run_Entry.featureDetection_Run_Mapping_Id.toString( 35 ); //  35 kept in sync with other code

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

        const featureDetection_Run_Entry = this.props.featureDetection_Run_Entry;

        return (
            //  3 Column Grid
            <React.Fragment>

                {/*  Column 1 of Grid  -  Checkbox  */}
                <div>
                    {/*<div style={ { width: 16, marginRight: 8, position: "relative" } }>*/}
                    {/*    <div style={ { position: "absolute", top: -2 } }>*/}
                    {/*        <input*/}
                    {/*            type="checkbox"*/}
                    {/*            onChange={ event => {*/}
                    {/*                if ( this.props.selectionCheckboxChanged_CallbackFunction ) {*/}
                    {/*                    this.props.selectionCheckboxChanged_CallbackFunction({*/}
                    {/*                        featureDetection_Run_Mapping_Id: this.props.featureDetection_Run_Entry.featureDetection_Run_Mapping_Id,*/}
                    {/*                        checked: event.target.checked*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                {/*  Column 2 of Grid  -  Triangle Icon for details open/closed  */}
                <div>
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
                </div>

                {/*  Column 3 of Grid  - Main Contents (Feature Detection Run Name(s) AND the links to the right */}

                <div>
                    {/* 2 Column Grid */}
                    <div style={ { display: "grid", gridTemplateColumns: "  auto min-content " } }>

                        <div
                            style={ { maxWidth: "calc( 100vw - 390px )" } }
                        >
                            <span
                                ref={ this._displayLabel_Div_Ref } // ref used to get position
                                className=" clickable "
                                onClick={ this._iconOrMainRowClicked_BindThis }
                            >
                                <span>{ featureDetection_Run_Entry.description } ({ featureDetection_Run_Entry.displayLabel })</span>
                            </span>

                            { this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ? (
                                <React.Fragment>
                                    <span> </span>
                                    <img
                                        src="static/images/icon-edit.png" title="Change Label"
                                        className="icon-small clickable  "
                                        onClick={ this._edit_DisplayLabel_Clicked_BindThis }
                                    />
                                </React.Fragment>
                            ) : null }
                        </div>
                        <div>
                            <div style={ { paddingLeft: 10, whiteSpace: "nowrap" } }>

                                {/* Navigation etc */}

                                <span
                                    className=" fake-link "
                                    onClick={ this._featureDetection_Page_FakeLink_Clicked_BindThis }
                                >
                                    [View Feature Detection Run]
                                </span>
                                {/*{ true ? (*/}
                                    <>
                                        <span > </span>
                                        {/*{ true ? (*/}
                                            <img
                                                className="icon-small clickable  "
                                                src="static/images/icon-circle-delete.png"
                                                title="Delete Feature Detection Run"
                                                onClick={ event => {

                                                    event.stopPropagation();

                                                    if ( ! window.confirm( "Delete the Feature Detection Entry" ) ) {

                                                        return; // EARLY RETURN
                                                    }

                                                    // this.setState({ deleteInProgress: true })

                                                    const promise =
                                                        this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.
                                                        getFunction__projectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer__Function() (
                                                            { featureDetectionRoot_MappingTblId: this.props.featureDetection_Run_Entry.featureDetection_Run_Mapping_Id })

                                                    promise.catch(reason => { try {

                                                        // reject();

                                                        throw Error( "Delete Feature Detection Run Request Rejected: reason: " + reason)

                                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }

                                                    })
                                                    promise.then(value => { try {

                                                        if ( this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback ) {
                                                            this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback()

                                                            return // EARLY RETURN
                                                        }

                                                        limelight__ReloadPage_Function()

                                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                                                }}
                                            />
                                        {/*) : (*/}
                                        {/*    <img*/}
                                        {/*        className=" icon-small "*/}
                                        {/*        title="Unable to delete feature detection run."*/}
                                        {/*        src="static/images/icon-circle-delete-disabled.png"*/}
                                        {/*    />*/}
                                        {/*)}*/}
                                    </>
                                {/*) : null }*/}
                            </div>
                        </div>
                    </div>

                    {/*  Feature Detection Run Details  */}
                    <div
                        style={ { display: ( ! this._show_DetailsBlock ) ? "none": null } }
                    >
                        { ( this._detailsBlock_EverShown ) ? (

                            <>
                                                 {/* Component 'Internal__FeatureDetection_Run_Details_Component' is declared below  */}
                                <Internal__FeatureDetection_Run_Details_Component
                                    forceReloadContents_Object={ this.state.forceReloadContents_Object__For__Internal__FeatureDetection_Run_Details_Component }
                                    featureDetection_Run_Entry={ this.props.featureDetection_Run_Entry }
                                    projectIdentifier={ this.props.projectIdentifier }
                                    projectIsLocked={ this.props.projectIsLocked }
                                    show_SearchTag_Categories={ this.props.show_SearchTag_Categories  }
                                    get_searchesSearchTagsFolders_Result_Root__Function={ this.props.get_searchesSearchTagsFolders_Result_Root__Function }
                                    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                                    dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                                    projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }

                                    searchChanged_Callback={ this.props.searchChanged_Callback }
                                    callback_SearchDeleted={ this.props.callback_SearchDeleted }
                                />
                            </>
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

// Component for Details for Single Feature Detection Run  -  not exported

/**
 *
 */
interface Internal__FeatureDetection_Run_Details_Component_Props {

    forceReloadContents_Object: object

    featureDetection_Run_Entry: ProjectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Runs_List_FromServer_FeatureDetection_Run_Entry
    projectIdentifier : string
    projectIsLocked : boolean

    show_SearchTag_Categories: boolean

    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    searchChanged_Callback: () => void
    callback_SearchDeleted: () => void

    //  Any changes, update componentDidUpdate
}

/**
 *
 */
interface Internal__FeatureDetection_Run_Details_Component_State {

    featureDetection_Run_Details_FromServer_Root?: ProjectPage_FeatureDetection_Runs_View_Section_FeatureDetection_Run_Details_FromServer_Root

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
class Internal__FeatureDetection_Run_Details_Component extends React.Component< Internal__FeatureDetection_Run_Details_Component_Props, Internal__FeatureDetection_Run_Details_Component_State > {

    private _scanBrowser_Page_FakeLink_Clicked_BindThis = this._scanBrowser_Page_FakeLink_Clicked.bind(this);

    /**
     *
     */
    constructor(props: Internal__FeatureDetection_Run_Details_Component_Props) {
        super(props)

        this.state = {
            featureDetection_Run_Details_FromServer_Root: null,
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
    componentDidUpdate(prevProps: Readonly<Internal__FeatureDetection_Run_Details_Component_Props>, prevState: Readonly<Internal__FeatureDetection_Run_Details_Component_State>, snapshot?: any) {

        if (  prevProps.forceReloadContents_Object === this.props.forceReloadContents_Object ) {

            if ( prevProps.featureDetection_Run_Entry === this.props.featureDetection_Run_Entry
                || prevProps.projectIdentifier === this.props.projectIdentifier
                || prevProps.projectIsLocked === this.props.projectIsLocked
                || prevProps.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions === this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
                || prevProps.show_SearchTag_Categories === this.props.show_SearchTag_Categories
                || prevState.featureDetection_Run_Details_FromServer_Root !== this.state.featureDetection_Run_Details_FromServer_Root
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

        const promise = projectPage_FeatureDetection_Runs_View_Section_Get_FeatureDetection_Run_Details_FromServer({ feature_detection_root__project_scnfl_mapping_tbl__id: this.props.featureDetection_Run_Entry.featureDetection_Run_Mapping_Id })

        promise.catch( reason =>  {  })

        promise.then(featureDetection_Run_Details_FromServer_Root => { try {

            this.setState({ featureDetection_Run_Details_FromServer_Root })
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
    private _scanBrowser_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation();
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        if ( limelight__IsTextSelected() ) {
            //  Text is selected so exit
            return; // EARLY RETURN
        }

        const scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result =
            scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc({
                projectScanFileId: this.props.featureDetection_Run_Entry.projectScanFileId,
                scanFile_Code_FirstSix: this.props.featureDetection_Run_Entry.scanFile_Code_FirstSix
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

        let searchElements: Array<JSX.Element> = undefined

        if ( this.state.featureDetection_Run_Details_FromServer_Root
            && this.state.featureDetection_Run_Details_FromServer_Root.projectSearchIds_ForScanFile_List
            && this.state.featureDetection_Run_Details_FromServer_Root.projectSearchIds_ForScanFile_List.length > 0
            && this.state.searchesSearchTagsFolders_Result_Root ) {

            searchElements = []

            const searchObjectList: Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data> = []

            for ( const projectSearchId of this.state.featureDetection_Run_Details_FromServer_Root.projectSearchIds_ForScanFile_List ) {
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
                    />
                )

                searchElements.push( searchElement )
            }
        }

        return (

            <div style={ { marginTop: 6, marginLeft: 30 } }>
                <div >
                    { ( ! this.state.featureDetection_Run_Details_FromServer_Root ) ? (
                        <div>
                            Loading Feature Detection Run Details
                        </div>
                    ): (
                        <div>
                            <div style={ { marginBottom: 9 } }>
                                <span>
                                    Scan Filename: { this.props.featureDetection_Run_Entry.scanFilename_Array.join( ", " ) }
                                </span>
                                <span> </span>
                                <span
                                    className=" fake-link "
                                    onClick={ this._scanBrowser_Page_FakeLink_Clicked_BindThis }
                                >
                                    [Scan Browser]
                                </span>
                            </div>

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
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

