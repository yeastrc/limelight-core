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
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    projectPage_ScanFiles_View_Section_Get_ScanFile_Details_FromServer,
    ProjectPage_ScanFiles_View_Section_ScanFile_Details_FromServer_FeatureDetectionEntry,
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
} from "page_js/data_pages/common_data_loaded_from_server__for_project__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders";
import {ProjectPage_SearchEntry_UsedInMultipleSections_Component} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchEntry_UsedInMultipleSections_Component";
import {ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions} from "page_js/data_pages/other_data_pages/project_page/project_page__common/projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";
import {
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry,
    Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";

/**
 *
 */
export interface ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_Props {
    projectIdentifier : string
    projectIsLocked : boolean
    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 *
 */
interface ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_State {

    show_LoadingData_Message?: boolean

    scanFile_Entry_CombinedEntries_Array?: Array<ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry >
    runFeatureDetection_IsFullyConfigured?: boolean
}

/**
 *
 */
export class ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component extends React.Component< ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_Props, ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_State > {

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_Section_AllUsers_InclPublicUser_Interaction_ScanFile_List_Component_Props) {
        super(props)

        this.state = {
            show_LoadingData_Message: true
        }
    }

    /**
     *
     */
    componentDidMount() {

        //  Load Data

        this.get_ScanList_FromServer();
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
                runFeatureDetection_IsFullyConfigured: scanFile_List_FromServer_Root.runFeatureDetection_IsFullyConfigured
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
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
                            scanFile_Entry={ scanFile_Entry }
                            runFeatureDetection_IsFullyConfigured={ this.state.runFeatureDetection_IsFullyConfigured }
                            projectIdentifier={ this.props.projectIdentifier }
                            projectIsLocked={ this.props.projectIsLocked }
                            get_searchesSearchTagsFolders_Result_Root__Function={ this.props.get_searchesSearchTagsFolders_Result_Root__Function }
                            projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                            dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
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
                    <div style={ { display: "grid", gridTemplateColumns: "16px auto" } }>
                        {/*  2 Column Grid  */}
                        { scanFile_Element_List }
                    </div>
                ) }
            </div>
        )
    }
}


////////////////////////////////////////////

//  Component for Single Scan File - not exported

/**
 *
 */
interface ScanFileEntry_Component_Props {
    scanFile_Entry: ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry
    runFeatureDetection_IsFullyConfigured: boolean
    projectIdentifier : string
    projectIsLocked : boolean
    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 *
 */
interface ScanFileEntry_Component_State {

    show_DetailsBlock?: boolean
}

/**
 *
 */
class ScanFileEntry_Component extends React.Component< ScanFileEntry_Component_Props, ScanFileEntry_Component_State > {

    private _iconOrMainRowClicked_BindThis = this._iconOrMainRowClicked.bind(this);

    private _scanBrowser_Page_FakeLink_Clicked_BindThis = this._scanBrowser_Page_FakeLink_Clicked.bind(this);

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _detailsBlock_EverShown: boolean = false;

    /**
     *
     */
    constructor(props: ScanFileEntry_Component_Props) {
        super(props)

        this.state = {
            show_DetailsBlock: false
        }
    }

    /**
     *
     */
    private _iconOrMainRowClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {

        event.stopPropagation();

        if ( ! this._detailsBlock_EverShown ) {
            this._detailsBlock_EverShown = true;
        }

        this.setState( (prevState: Readonly<ScanFileEntry_Component_State>, props: Readonly<ScanFileEntry_Component_Props>) => {
            //  flip show_DetailsBlock
            return { show_DetailsBlock: ( ! prevState.show_DetailsBlock ) }
        });
    }

    /**
     *
     */
    private _scanBrowser_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation();
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        let url_path__scan_browser: string;

        /**
         * DOM <script> tags hold the paths to the data pages
         */
        let url_path__scan_browser__Element = document.getElementById("url_path__scan_browser");
        if (!url_path__scan_browser__Element) {
            throw Error("No DOM element for id 'url_path__scan_browser'");
        }
        url_path__scan_browser = url_path__scan_browser__Element.innerHTML;

        const pathCode_Version = "a";

        const pathCode =
            "c/" +  // is path code
            pathCode_Version +
            this.props.scanFile_Entry.scanFile_Code_FirstSix +
            this.props.scanFile_Entry.projectScanFileId.toString( 35 );

        const url = url_path__scan_browser + pathCode + "/r";

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
            //  2 Column Grid
            <React.Fragment>

                {/*  Column 1 of Grid  -  Triangle Icon for details open/closed  */}
                <div
                    onClick={ this._iconOrMainRowClicked_BindThis }
                >
                    { ( ! this.state.show_DetailsBlock ) ? (
                        <img className="icon-small fake-link-image " src="static/images/pointer-right.png"/>
                    ) : (
                        <img className="icon-small fake-link-image " src="static/images/pointer-down.png"/>
                    )}
                </div>

                {/*  Column 2 of Grid  - Main Contents (Scan File Name(s) AND the links to the right */}

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

                                {/* Navigation etc */}

                                { ( ( ! this.props.projectIsLocked ) && ( this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ) ) ? (
                                    <>
                                        { this.props.runFeatureDetection_IsFullyConfigured ? (
                                            <>
                                                <span
                                                    className=" fake-link "
                                                    onClick={ event => {

                                                        event.stopPropagation();

                                                        this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.
                                                        getFunction__open_Run_Hardklor_File_Contents_For_ScanFile_Project_Overlay__Function()({
                                                            component_Params: {
                                                                projectIdentifier: this.props.projectIdentifier,
                                                                projectScanFileId: this.props.scanFile_Entry.projectScanFileId,
                                                                scanFilename_Array: this.props.scanFile_Entry.scanFilename_Array
                                                            },
                                                            uploadComplete_Callback: () : void => {

                                                                refresh_ProjectPage_UploadData_MainPage_Main_Component()

                                                                refresh_ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component()
                                                            }
                                                        })
                                                    } }
                                                >
                                                    [Run Feature Detection]
                                                </span>
                                                <span> </span>
                                            </>
                                        ) : null }
                                        <span
                                            className=" fake-link "
                                            onClick={ event => {

                                                event.stopPropagation();

                                                this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.
                                                getFunction__open_Import_Hardklor_Bullseye_Files_Contents_For_ScanFile_Project_Overlay()({
                                                    component_Params: {
                                                        projectIdentifier: this.props.projectIdentifier,
                                                        projectScanFileId: this.props.scanFile_Entry.projectScanFileId,
                                                        scanFilename_Array: this.props.scanFile_Entry.scanFilename_Array
                                                    },
                                                    uploadComplete_Callback: () : void => {

                                                        refresh_ProjectPage_UploadData_MainPage_Main_Component()

                                                        refresh_ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component()
                                                    }
                                                })
                                            } }
                                        >
                                            [Import Feature Detection]
                                        </span>
                                        <span> </span>
                                    </>
                                ) : null }
                                <span
                                    className=" fake-link "
                                    onClick={ this._scanBrowser_Page_FakeLink_Clicked_BindThis }
                                >
                                    [Scan Browser]
                                </span>
                            </div>
                        </div>
                    </div>

                    {/*  Scan File Details  */}
                    <div
                        style={ { display: ( ! this.state.show_DetailsBlock ) ? "none": null } }
                    >
                        { ( this._detailsBlock_EverShown ) ? (
                            <ScanFile_Details_Component
                                scanFile_Entry={ this.props.scanFile_Entry }
                                projectIdentifier={ this.props.projectIdentifier }
                                projectIsLocked={ this.props.projectIsLocked }
                                get_searchesSearchTagsFolders_Result_Root__Function={ this.props.get_searchesSearchTagsFolders_Result_Root__Function }
                                projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions={ this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions }
                                dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
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
    scanFile_Entry: ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_ScanFileEntry
    projectIdentifier : string
    projectIsLocked : boolean
    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions: ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

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

        if ( prevProps.scanFile_Entry === this.props.scanFile_Entry
            || prevProps.projectIdentifier === this.props.projectIdentifier
            || prevProps.projectIsLocked === this.props.projectIsLocked
            || prevProps.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions === this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions
            || prevState.scanFile_Details_FromServer_Root !== this.state.scanFile_Details_FromServer_Root
            // || prevState.forceRerender !== this.state.forceRerender
        ) {

            //  Nothing changed so exit

            return; // EARLY RETURN
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

        //  Update DisplayLabel for id in featureDetection_List

        this.setState ((prevState, props) => {
            for ( const entry of prevState.scanFile_Details_FromServer_Root.featureDetection_List ) {
                if ( entry.id_MappingTbl === id_MappingTbl ) {
                    entry.displayLabel = displayLabel;
                }
            }
            return { scanFile_Details_FromServer_Root: prevState.scanFile_Details_FromServer_Root, forceRerender: {} };
        });
    }

    /**
     *
     */
    private _remove_FeatureDetection_Entry( id_MappingTbl: number ) : void {

        //  Remove id from featureDetection_List

        this.setState ((prevState, props) => {
            prevState.scanFile_Details_FromServer_Root.featureDetection_List = prevState.scanFile_Details_FromServer_Root.featureDetection_List.filter(value => {
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
                        projectIdentifier={ this.props.projectIdentifier }
                        searchDisplayListItem={ searchObject }
                        searchesSearchTagsFolders_Result_Root={ this.state.searchesSearchTagsFolders_Result_Root }
                        search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root={ this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                        expand_All_Folders__ShowSearchDetailsTo_Global_Force={ null }
                        selected={ null }
                        showSeparatorBelow={ showSeparatorBelow }
                        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                        projectPage_SearchesAdmin={ null }
                        callbackOn_Search_Entry_Clicked={ null }
                        deleteSearch_Callback={ null }
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

            this.props.entry_update_DisplayLabel_Description_Callback( this.props.featureDetection_Entry.id_MappingTbl, newLabel, newDescription );

            this.setState({ forceRerender: {} });
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
    render() {

        return (
            <div>
                <span
                    ref={ this._displayLabel_Div_Ref } // ref used to get position
                >{ this.props.featureDetection_Entry.description } ({ this.props.featureDetection_Entry.displayLabel })</span>

                { this.state.deleteInProgress ? (
                    <React.Fragment>
                        <span> - delete in progress</span>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {( this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ? (
                        <React.Fragment>
                            <span> </span>
                            <img
                                src="static/images/icon-edit.png" title="Change Label"
                                className="icon-small clickable  "
                                onClick={ this._edit_DisplayLabel_Clicked_BindThis }
                            />
                        </React.Fragment>
                        ) : null
                        )}

                        {( this.props.projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions ? (
                        <React.Fragment>
                            <span> </span>
                            <img
                                src="static/images/icon-circle-delete.png" title="Delete Feature Detection Entry"
                                className="icon-small clickable  "
                                onClick={ this._delete_Entry_Clicked_BindThis }
                            />
                        </React.Fragment>
                        ) : null
                        )}
                    </React.Fragment>
                ) }
            </div>

        );
    }
}

