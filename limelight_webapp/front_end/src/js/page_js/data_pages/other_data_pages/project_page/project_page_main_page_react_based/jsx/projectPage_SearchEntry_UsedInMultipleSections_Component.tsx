/**
 * projectPage_SearchEntry_UsedInMultipleSections_Component.tsx
 *
 * Project Page - "Explore Data" section - Main Searches and Folders containing Searches List
 *
 * TODO  This is a little hacked since it deletes search entries from the search array in the props.
 *          Deletions are done from the unfiled searches and the searches under a folder when the search is deleted.
 *          It does work so good enough for now.
 */


import React from "react";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
} from "page_js/data_pages/common_data_loaded_from_server__for_project__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders";
import {
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData,
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force,
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_SearchesAndFoldersList_Component";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_SearchesAdmin} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesSection_Open_DataPages_PeptideProteinMod";
import {SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers";
import {
    SearchName_and_SearchShortName_Change_Component_Change_Callback,
    SearchName_and_SearchShortName_Change_Component_Change_Callback_Params
} from "page_js/data_pages/common_components__react/search_name_and_search_short_name__user_change_overlay/searchName_and_SearchShortName_Change_Component_and_WebserviceCall";
import {
    open_Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Overlay,
    Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_MainParams,
    Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch
} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_search/search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent";
import {
    Search_Tags_DisplaySearchTags_UnderSearchName_Component,
    Search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root
} from "page_js/data_pages/search_tags__display_management/search_tags__display_under_search_name/search_Tags_DisplaySearchTags_UnderSearchName_Component";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";

/////

//  Single Search Entry

export interface ProjectPage_SearchEntry_UsedInMultipleSections_Component__SearchChanged_Callback_Params {
    projectSearchId: number
}

export type ProjectPage_SearchEntry_UsedInMultipleSections_Component__SearchChanged_Callback_Type = ( params: ProjectPage_SearchEntry_UsedInMultipleSections_Component__SearchChanged_Callback_Params ) => void

////

export interface ProjectPage_SearchEntry_UsedInMultipleSections_Component__DeleteSearch_Callback_Params {
    projectSearchId: number
}

export type ProjectPage_SearchEntry_UsedInMultipleSections_Component__DeleteSearch_Callback_Type = ( params: ProjectPage_SearchEntry_UsedInMultipleSections_Component__DeleteSearch_Callback_Params ) => void

/////////////

/**
 *
 */
interface ProjectPage_SearchEntry_UsedInMultipleSections_Component_Props {
    projectIdentifier : string
    searchDisplayListItem : CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data

    show_SearchTag_Categories: boolean

    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root: Search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root
    expand_All_Folders__ShowSearchDetailsTo_Global_Force: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force
    selected : boolean
    showSeparatorBelow : boolean
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    callbackOn_Search_Entry_Clicked : (projectSearchId : number ) => void;
    searchChanged_Callback: ProjectPage_SearchEntry_UsedInMultipleSections_Component__SearchChanged_Callback_Type
    deleteSearch_Callback: ProjectPage_SearchEntry_UsedInMultipleSections_Component__DeleteSearch_Callback_Type
}

/**
 *
 */
interface ProjectPage_SearchEntry_UsedInMultipleSections_Component_State {

    showSearchDetails? : boolean

    show_UpdatingSearchName_Message?: boolean

    expand_All_Folders__ShowSearchDetailsTo_Global_Force__Prev_From_Props ?: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force
}

/**
 *
 */
export class ProjectPage_SearchEntry_UsedInMultipleSections_Component extends React.Component< ProjectPage_SearchEntry_UsedInMultipleSections_Component_Props, ProjectPage_SearchEntry_UsedInMultipleSections_Component_State > {


    private _searchName_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    private _searchDetailsContainer_div_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div>


    private _showSearchDetails_Clicked_BindThis = this._showSearchDetails_Clicked.bind(this);
    private _hideSearchDetails_Clicked_BindThis = this._hideSearchDetails_Clicked.bind(this);
    private _searchName_Clicked_BindThis = this._searchName_Clicked.bind(this);

    private _changeSearchName_Clicked_BindThis = this._changeSearchName_Clicked.bind(this);

    private _deleteSearch_Clicked_BindThis = this._deleteSearch_Clicked.bind(this);

    private _qc_Page_FakeLink_Clicked_BindThis = this._qc_Page_FakeLink_Clicked.bind(this);
    private _peptide_Page_FakeLink_Clicked_BindThis = this._peptide_Page_FakeLink_Clicked.bind(this);
    private _protein_Page_FakeLink_Clicked_BindThis = this._protein_Page_FakeLink_Clicked.bind(this);
    private _modifications_Page_FakeLink_Clicked_BindThis = this._modifications_Page_FakeLink_Clicked.bind(this);

    private _add_Change_SearchTags_Clicked_BindThis = this._add_Change_SearchTags_Clicked.bind(this);

    private _checkboxChanged_BindThis = this._checkboxChanged.bind(this);

    private _searchDetailsAddedToDOM : boolean = false;


    /**
     *
     */
    constructor(props: ProjectPage_SearchEntry_UsedInMultipleSections_Component_Props) {
        super(props);

        this._searchName_Div_Ref = React.createRef<HTMLDivElement>();
        this._searchDetailsContainer_div_Ref = React.createRef<HTMLDivElement>();

        let showSearchDetails = false;
        if ( props.expand_All_Folders__ShowSearchDetailsTo_Global_Force ) {
            if ( props.expand_All_Folders__ShowSearchDetailsTo_Global_Force.expand_All_Folders__ShowSearchDetails_Global_ForceToValue ) {
                showSearchDetails = true;
            }
        }

        this.state = {
            showSearchDetails,
            expand_All_Folders__ShowSearchDetailsTo_Global_Force__Prev_From_Props: props.expand_All_Folders__ShowSearchDetailsTo_Global_Force
        };
    }

    /**
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : ProjectPage_SearchEntry_UsedInMultipleSections_Component_Props, state : ProjectPage_SearchEntry_UsedInMultipleSections_Component_State ) : ProjectPage_SearchEntry_UsedInMultipleSections_Component_State {

        let newState : ProjectPage_SearchEntry_UsedInMultipleSections_Component_State = null;

        if ( props.expand_All_Folders__ShowSearchDetailsTo_Global_Force !== state.expand_All_Folders__ShowSearchDetailsTo_Global_Force__Prev_From_Props ) {

            newState = {};

            if ( props.expand_All_Folders__ShowSearchDetailsTo_Global_Force ) {

                newState.expand_All_Folders__ShowSearchDetailsTo_Global_Force__Prev_From_Props = props.expand_All_Folders__ShowSearchDetailsTo_Global_Force
                newState.showSearchDetails = props.expand_All_Folders__ShowSearchDetailsTo_Global_Force.expand_All_Folders__ShowSearchDetails_Global_ForceToValue
            }
        }

        return newState;
    }

    /**
     *
     */
    componentDidMount() {

        if ( this.state.showSearchDetails && ( ! this._searchDetailsAddedToDOM ) ) {
            this._addSearchDetailToDOM()
        }
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<ProjectPage_SearchEntry_UsedInMultipleSections_Component_Props>, prevState: Readonly<ProjectPage_SearchEntry_UsedInMultipleSections_Component_State>, snapshot?: any): void {

        if ( prevProps.searchDisplayListItem.projectSearchId !== this.props.searchDisplayListItem.projectSearchId ) {

            /// If update and projectSearchId changed, remove Search Details from DOM and set showSearchDetails to false

            this._removeSearchDetailsFromDOM(); //  Will also set this._searchDetailsAddedToDOM to false
        }

        if ( this.state.showSearchDetails && ( ! this._searchDetailsAddedToDOM ) ) {
            this._addSearchDetailToDOM()
        }

        if ( prevProps.searchDisplayListItem.searchName !== this.props.searchDisplayListItem.searchName ) {

            this.setState({ show_UpdatingSearchName_Message: false })
        }
    }

    /**
     *
     */
    componentWillUnmount(): void {

        this._removeSearchDetailsFromDOM();
    }

    /**
     *
     */
    private _removeSearchDetailsFromDOM() {

        const $detailsContainer = $( this._searchDetailsContainer_div_Ref.current );
        $detailsContainer.empty()

        this._searchDetailsAddedToDOM = false;
    }

    /**
     * Show Search Details
     */
    private _showSearchDetails_Clicked( event :  React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        this.setState({ showSearchDetails: true })
    }

    /**
     * Hide Search Details
     */
    private _hideSearchDetails_Clicked( event :  React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        this.setState({ showSearchDetails: false })
    }

    /**
     *
     */
    private _searchName_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {

        event.stopPropagation();

        try { // In try/catch block in case not supported in browser
            const selectionObj = window.getSelection();
            const selection = selectionObj.toString()
            if ( selection ) {
                //  Found a Selection so exit with no further action
                return; //  EARLY RETURN
            }

        } catch (e) {
            //  Eat exception
            const znothing = 0;
        }

        this.setState( (state, props) : ProjectPage_SearchEntry_UsedInMultipleSections_Component_State => {

            return { showSearchDetails: ! state.showSearchDetails };
        });
    }

    /**
     *
     */
    private _changeSearchName_Clicked(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {

        event.stopPropagation();

        const buttonContainer_BoundingRect = this._searchName_Div_Ref.current.getBoundingClientRect();

        let position_top =  buttonContainer_BoundingRect.top;
        let position_left =  buttonContainer_BoundingRect.left;

        const change_Callback: SearchName_and_SearchShortName_Change_Component_Change_Callback =
            ( params: SearchName_and_SearchShortName_Change_Component_Change_Callback_Params ) : void => {

                if ( this.props.searchChanged_Callback ) {

                    this.setState({ show_UpdatingSearchName_Message: true })

                    window.setTimeout( () => {
                        try {

                            this.props.searchChanged_Callback( { projectSearchId: this.props.searchDisplayListItem.projectSearchId } )

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 10 );

                    return // EARLY RETURN
                }

                window.location.reload(true)  //  fallback when no callback
            }

        this.props.projectPage_SearchesAdmin.openOverlay_Change_SearchName_SearchShortName({
            projectSearchId: this.props.searchDisplayListItem.projectSearchId,
            existingSearchName: this.props.searchDisplayListItem.searchName,
            existingSearchShortName: this.props.searchDisplayListItem.searchShortName,
            position_top,
            position_left,
            change_Callback,
            cancel_Callback: null
        })
    }

    /**
     *
     */
    private _deleteSearch_Clicked(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {

        const deleteComplete_Callback = (): void => {

            if ( this.props.deleteSearch_Callback ) {

                this.props.deleteSearch_Callback( { projectSearchId: this.props.searchDisplayListItem.projectSearchId } );

                return; // EARLY RETURN
            }

            window.location.reload(true)
        }

        this.props.projectPage_SearchesAdmin.deleteSearch({
            projectSearchId: this.props.searchDisplayListItem.projectSearchId,
            searchId: this.props.searchDisplayListItem.searchId,
            searchName: this.props.searchDisplayListItem.searchName,
            projectIdentifier : this.props.projectIdentifier,
            deleteComplete_Callback
        })
    }

    /**
     *
     */
    private _qc_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        event.stopPropagation();

        const projectSearchId = this.props.searchDisplayListItem.projectSearchId;
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        const search_Selected_InProgress = new ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData()
        search_Selected_InProgress.add_For_ProjectSearchId_IfNotExists(projectSearchId )

        const selected_Searches_Data_Object = new ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object({
            search_Selected_InProgress,
            searchesSearchTagsFolders_Result_Root: this.props.searchesSearchTagsFolders_Result_Root,
        })

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.qc_View_OpenDataPage({
            selected_Searches_Data_Object,
            searchesSearchTagsFolders_Result_Root: this.props.searchesSearchTagsFolders_Result_Root,
            ctrlKeyOrMetaKey
        })
    }

    /**
     *
     */
    private _peptide_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        event.stopPropagation();

        const projectSearchId = this.props.searchDisplayListItem.projectSearchId;
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        const search_Selected_InProgress = new ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData()
        search_Selected_InProgress.add_For_ProjectSearchId_IfNotExists(projectSearchId )

        const selected_Searches_Data_Object = new ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object({
            search_Selected_InProgress,
            searchesSearchTagsFolders_Result_Root: this.props.searchesSearchTagsFolders_Result_Root,
        })

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.peptide_View_OpenDataPage({
            selected_Searches_Data_Object,
            searchesSearchTagsFolders_Result_Root: this.props.searchesSearchTagsFolders_Result_Root,
            ctrlKeyOrMetaKey
        })
    }

    /**
     *
     */
    private _protein_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        event.stopPropagation();

        const projectSearchId = this.props.searchDisplayListItem.projectSearchId;
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        const search_Selected_InProgress = new ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData()
        search_Selected_InProgress.add_For_ProjectSearchId_IfNotExists(projectSearchId )

        const selected_Searches_Data_Object = new ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object({
            search_Selected_InProgress,
            searchesSearchTagsFolders_Result_Root: this.props.searchesSearchTagsFolders_Result_Root,
        })

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.protein_View_OpenDataPage({
            selected_Searches_Data_Object,
            searchesSearchTagsFolders_Result_Root: this.props.searchesSearchTagsFolders_Result_Root,
            ctrlKeyOrMetaKey
        })
    }

    /**
     *
     */
    private _modifications_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        const projectSearchId = this.props.searchDisplayListItem.projectSearchId;
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;


        const search_Selected_InProgress = new ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData()
        search_Selected_InProgress.add_For_ProjectSearchId_IfNotExists(projectSearchId )

        const selected_Searches_Data_Object = new ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object({
            search_Selected_InProgress,
            searchesSearchTagsFolders_Result_Root: this.props.searchesSearchTagsFolders_Result_Root,
        })

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.mod_View_OpenDataPage({
            selected_Searches_Data_Object,
            searchesSearchTagsFolders_Result_Root: this.props.searchesSearchTagsFolders_Result_Root,
            ctrlKeyOrMetaKey
        })
    }

    /**
     * Add Search Details to DOM
     */
    private _addSearchDetailToDOM() {

        const projectSearchId = this.props.searchDisplayListItem.projectSearchId;
        const searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers = (
            new SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers({
                dataPages_LoggedInUser_CommonObjectsFactory : this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails
            })
        );

        searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.showSearchDetailsClicked({ projectSearchId, domElementToInsertInto : this._searchDetailsContainer_div_Ref.current });

        this._searchDetailsAddedToDOM = true;
    }

    ////////////////////////////////////////

    private _add_Change_SearchTags_Clicked() : void {

        const searches: Array<Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch> = []

        const search: Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch = {
            projectSearchId: this.props.searchDisplayListItem.projectSearchId
        }
        searches.push(search)

        const tagsChangedOnSearches_Callback = () => {

            if ( this.props.searchChanged_Callback ) {

                this.props.searchChanged_Callback({ projectSearchId: this.props.searchDisplayListItem.projectSearchId })

                return // EARLY RETURN
            }

            window.location.reload(true)  // Fallback
        }

        const mainParams : Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_MainParams = {
            searches, tagsChangedOnSearches_Callback
        }

        open_Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Overlay({ mainParams })
    }

    /**
     *
     */
    private _checkboxChanged( event: React.MouseEvent<HTMLDivElement> ): void {

        this.props.callbackOn_Search_Entry_Clicked( this.props.searchDisplayListItem.projectSearchId );
    }

    /**
     *
     */
    render(): React.ReactNode {

        const searchDisplayListItem = this.props.searchDisplayListItem;

        let selectedClass = ""

        // if ( this.props.selected ) {
        //     selectedClass = " selected "
        // }

        const cssClasses = "  " + selectedClass;

        let searchShortName_Display = "";

        if ( searchDisplayListItem.searchShortName ) {

            searchShortName_Display = " (" + searchDisplayListItem.searchShortName + ") ";
        }

        const searchNameDisplay = searchDisplayListItem.searchName + searchShortName_Display + " (" + searchDisplayListItem.searchId + ")";

        const searchDetailsContainer_div_Style : React.CSSProperties = {}
        if ( ! this.state.showSearchDetails ) {
            searchDetailsContainer_div_Style.display = "none";
        }

        let searchTags_Block: JSX.Element = undefined

        { //  Search Tags

            let add_Change_SearchTags_Clicked_BindThis: () => void

            if ( this.props.projectPage_SearchesAdmin && this.props.searchesSearchTagsFolders_Result_Root.is_userIsProjectOwner() ) {
                add_Change_SearchTags_Clicked_BindThis = this._add_Change_SearchTags_Clicked_BindThis
            }

            searchTags_Block = (
                <div>
                    <Search_Tags_DisplaySearchTags_UnderSearchName_Component
                        show_SearchTag_Categories={ this.props.show_SearchTag_Categories }
                        searchTagIds_OnSearch_Set={ searchDisplayListItem.searchTagIds_Set }
                        searchTagData_Root={ this.props.search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root  }
                        addTag_Clicked_Callback={ add_Change_SearchTags_Clicked_BindThis }
                        changeTags_Clicked_Callback={ add_Change_SearchTags_Clicked_BindThis }
                    />
                </div>
            )
        }

        return (
            <React.Fragment>
                <div
                     className={ cssClasses }
                     style={ { display: "grid", gridTemplateColumns: "  min-content  16px auto " } }>

                    {/*  3 Column Grid  */}

                    <div>
                        { this.props.callbackOn_Search_Entry_Clicked ? (
                            <div style={ { width: 16, marginRight: 8, position: "relative" } }>
                                <div style={ { position: "absolute", top: -2 }}>
                                    <input type="checkbox" checked={ this.props.selected } onChange={ this._checkboxChanged_BindThis } />
                                </div>
                            </div>
                        ) : null }
                    </div>

                    <div >
                        { ( this.state.showSearchDetails ) ? (
                            <img className="icon-small fake-link-image "
                                 onClick={ this._hideSearchDetails_Clicked_BindThis }
                                 src="static/images/pointer-down.png"/>
                        ) : (
                            <img className="icon-small fake-link-image "
                                 onClick={ this._showSearchDetails_Clicked_BindThis }
                                 src="static/images/pointer-right.png"/>
                        )}
                    </div>

                    {/* Container for both search name and the links to the right */}

                    <div >

                        {/* 2 Column Grid */}
                        <div style={ { display: "grid", gridTemplateColumns: "  auto min-content " } }>
                            <div style={ { maxWidth: "calc( 100vw - 390px )" }}>
                                <div
                                    ref={ this._searchName_Div_Ref }
                                    style={ { marginBottom: 2, position: "relative" } }
                                >
                                    <span
                                        style={ { overflowWrap : "break-word"} }
                                        className=" clickable "
                                        onClick={ this._searchName_Clicked_BindThis }
                                    >
                                        { searchNameDisplay }
                                    </span>
                                    { ( this.props.projectPage_SearchesAdmin && this.props.searchesSearchTagsFolders_Result_Root.is_userIsProjectOwner() ) ? (
                                        <>
                                            <span> </span>
                                            <img className="icon-small clickable "
                                                 src="static/images/icon-edit.png"
                                                 title="Edit name of search"
                                                 onClick={ this._changeSearchName_Clicked_BindThis }
                                            />
                                        </>
                                    ): null }

                                    { this.state.show_UpdatingSearchName_Message ? (
                                        <div
                                            style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                            className=" standard-background-color "
                                        >
                                            Updating Search Name...
                                        </div>
                                    ) : null }
                                </div>

                                <div >
                                    { searchTags_Block }
                                </div>
                            </div>

                            <div style={ { paddingLeft: 10, whiteSpace: "nowrap" } }>

                                {/* Navigation Fake Links to Peptide, Protein, Modifications pages for Single Search */}

                                <span
                                    className=" fake-link "
                                    onClick={ this._qc_Page_FakeLink_Clicked_BindThis }
                                >
                                    [Stats/QC]
                                </span>
                                <span> </span>
                                <span
                                    className=" fake-link "
                                    onClick={ this._peptide_Page_FakeLink_Clicked_BindThis }
                                >
                                    [Peptides]
                                </span>
                                <span> </span>
                                <span
                                    className=" fake-link "
                                    onClick={ this._protein_Page_FakeLink_Clicked_BindThis }
                                >
                                    [Proteins]
                                </span>
                                <span> </span>
                                <span
                                    className=" fake-link "
                                    onClick={ this._modifications_Page_FakeLink_Clicked_BindThis }
                                >
                                    [Modifications]
                                </span>

                                {/* Delete Search Icon */}

                                { this.props.projectPage_SearchesAdmin && this.props.searchesSearchTagsFolders_Result_Root.is_userIsProjectOwner() ? (
                                    <>
                                        <span> </span>
                                        <img className="icon-small clickable  "
                                             src="static/images/icon-circle-delete.png"
                                             title="Delete search"
                                             onClick={ this._deleteSearch_Clicked_BindThis }
                                        />
                                    </>
                                ): null }
                            </div>
                        </div>

                        {/* Search Detail Container */}
                        <div ref={ this._searchDetailsContainer_div_Ref } style={ searchDetailsContainer_div_Style }>
                            <span
                                style={ { color: "green", fontSize: 18 } }
                            >
                                LOADING
                            </span>
                        </div>
                    </div>
                </div>

                {this.props.showSeparatorBelow ?
                    <div className="standard-border-color-dark"
                         style={{ marginTop: 7,marginBottom: 8, width: "100%", borderBottomStyle: "solid", borderBottomWidth: 1 }}
                    ></div>
                    : null
                }

            </React.Fragment>
        );
    }
}
