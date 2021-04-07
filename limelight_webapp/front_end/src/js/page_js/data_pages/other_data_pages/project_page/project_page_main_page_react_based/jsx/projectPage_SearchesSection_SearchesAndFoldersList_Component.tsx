/**
 * projectPage_SearchesSection_SearchesAndFoldersList_Component.tsx
 *
 * Project Page - "Explore Data" section - Main Searches and Folders containing Searches List
 *
 * TODO  This is a little hacked since it deletes search entries from the search array in the props.
 *          Deletions are done from the unfiled searches and the searches under a folder when the search is deleted.
 *          It does work so good enough for now.
 */


import React from "react";
import {
    ProjectPage_SearchesSection_Searches_Folders_Root, ProjectPage_SearchesSection_Searches_Folders_SingleFolder,
    ProjectPage_SearchesSection_Searches_Folders_SingleSearch
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesSection_Get_Searches_Folders_From_Server";
import {SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_SearchesAdmin} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesSection_Open_DataPages_PeptideProteinMod";

/**
 * Create new Object and pass in as Props to force all Show Search Details to the new boolean value of true or false
 *
 * After the new object is processed, it's value is then ignored until a new object is passed.  tested using object reference
 *
 * If passed null, ignore
 */
export class ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force {
    expand_All_Folders__ShowSearchDetails_Global_ForceToValue : boolean  // true if Expand, false if Collapse
}

/**
 *
 */
export class ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_folderIds_ExpandedFolders_Params {
    updated_folderIds_ExpandedFolders : Set<number>
}

export type ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_folderIds_ExpandedFolders_Callback =
    ( params : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_folderIds_ExpandedFolders_Params ) => void


/**
 *
 */
export class ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds_Params {
    updated_selected_ProjectSearchIds : Set<number>
}

export type ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds =
    ( params : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds_Params ) => void

////  React Components

/**
 *
 */
export interface ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Props {
    projectIdentifier : string
    folderIds_ExpandedFolders_InitialValue : Set<number>;
    expand_All_Folders__ShowSearchDetailsTo_Global_Force: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force
    searchesAndFolders: ProjectPage_SearchesSection_Searches_Folders_Root
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    callback_updateSelected_Searches : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds
    callback_Update_folderIds_ExpandedFolders: ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_folderIds_ExpandedFolders_Callback
}

/**
 *
 */
interface ProjectPage_SearchesSection_SearchesAndFoldersList_Component_State {

    projectSearchIds_Selected_InProgress? : Set<number>;
    folderIds_ExpandedFolders_InProgress? : Set<number>;

    expand_All_Folders__ShowSearchDetailsTo_Global_Force_FromProps?: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force

    fakeTriggerRender?: object
}

/**
 *
 */
export class ProjectPage_SearchesSection_SearchesAndFoldersList_Component extends React.Component< ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Props, ProjectPage_SearchesSection_SearchesAndFoldersList_Component_State > {

    private _folderEntry_Expanded_Collapsed_Callback_BindThis = this._folderEntry_Expanded_Collapsed_Callback.bind(this)
    private _searchCheckboxChanged_BindThis = this._searchCheckboxChanged.bind(this);
    private _deleteSearch_Callback_BindThis = this._deleteSearch_Callback.bind(this);

    private _DO_NOT_CALL() {

        const folderEntry_Expanded_Collapsed_Callback: FolderEntry_Expanded_Collapsed_Callback_Type = this._folderEntry_Expanded_Collapsed_Callback;
        const deleteSearch_Callback: DeleteSearch_Callback_Type = this._deleteSearch_Callback;
    }

    /**
     *
     */
    constructor(props: ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Props) {
        super(props);

        this.state = {
            projectSearchIds_Selected_InProgress : new Set(),
            folderIds_ExpandedFolders_InProgress : new Set( props.folderIds_ExpandedFolders_InitialValue ),
            expand_All_Folders__ShowSearchDetailsTo_Global_Force_FromProps: props.expand_All_Folders__ShowSearchDetailsTo_Global_Force,
            fakeTriggerRender: {}
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
    static getDerivedStateFromProps( props : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Props, state : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_State ) : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        let newState : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_State = null;

        if ( props.expand_All_Folders__ShowSearchDetailsTo_Global_Force !== state.expand_All_Folders__ShowSearchDetailsTo_Global_Force_FromProps ) {

            newState = {
                expand_All_Folders__ShowSearchDetailsTo_Global_Force_FromProps: props.expand_All_Folders__ShowSearchDetailsTo_Global_Force
            };

            if ( props.expand_All_Folders__ShowSearchDetailsTo_Global_Force ) {
                if ( props.expand_All_Folders__ShowSearchDetailsTo_Global_Force.expand_All_Folders__ShowSearchDetails_Global_ForceToValue ) {

                    const folderIds_ExpandedFolders_InProgress: Set<number> = new Set();
                    for ( const entry of props.searchesAndFolders.folderList ) {
                        const id = entry.id;
                        folderIds_ExpandedFolders_InProgress.add( id );
                    }

                    props.callback_Update_folderIds_ExpandedFolders({ updated_folderIds_ExpandedFolders: folderIds_ExpandedFolders_InProgress });

                    newState.folderIds_ExpandedFolders_InProgress = folderIds_ExpandedFolders_InProgress;
                } else {
                    newState.folderIds_ExpandedFolders_InProgress = new Set();
                }
            }
        }

        return newState;
    }

    /**
     *
     */
    private _folderEntry_Expanded_Collapsed_Callback( params : FolderEntry_Expanded_Collapsed_Callback_Params ) {


        this.setState( (state, props) : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_State => {

            const folderIds_ExpandedFolders_InProgress = new Set(state.folderIds_ExpandedFolders_InProgress);
            if ( params.flip_isExpanded ) {
                if ( ! folderIds_ExpandedFolders_InProgress.delete(params.folderId) ) {
                    folderIds_ExpandedFolders_InProgress.add(params.folderId);
                }
            }

            props.callback_Update_folderIds_ExpandedFolders({ updated_folderIds_ExpandedFolders: folderIds_ExpandedFolders_InProgress });

            return { folderIds_ExpandedFolders_InProgress };
        });
    }

    /**
     *
     */
    private _searchCheckboxChanged( projectSearchId : number ): void {

        this.setState( (state, props) : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_State => {

            const newSelection = new Set( state.projectSearchIds_Selected_InProgress );

            if ( ! newSelection.delete( projectSearchId ) ) {
                newSelection.add( projectSearchId )
            }

            if ( this.props.callback_updateSelected_Searches ) {
                this.props.callback_updateSelected_Searches({ updated_selected_ProjectSearchIds: newSelection });
            }

            return { projectSearchIds_Selected_InProgress: newSelection };
        });
    }

    /**
     *
     */
    private _deleteSearch_Callback( params : DeleteSearch_Callback_Params ) {

        const new_searchesInFolder: ProjectPage_SearchesSection_Searches_Folders_SingleSearch[] = [];
        for ( const search of this.props.searchesAndFolders.searchesNotInFolders ) {
            if ( search.projectSearchId !== params.projectSearchId) {
                new_searchesInFolder.push( search );
            }
        }
        this.props.searchesAndFolders.searchesNotInFolders = new_searchesInFolder;

        this.setState({ fakeTriggerRender: {} })
    }

    /**
     *
     */
    render(): React.ReactNode {

        const searchDisplayList : Array<JSX.Element> = [];

        {
            const folderList = this.props.searchesAndFolders.folderList;

            if (folderList) {

                for (const folderEntry of folderList) {

                    const searchDisplayListEntry = (
                        <FolderEntry
                            key={"folder:" + folderEntry.id}
                            searchDisplayListItem={folderEntry}
                            expand_All_Folders__ShowSearchDetailsTo_Global_Force={ this.props.expand_All_Folders__ShowSearchDetailsTo_Global_Force }
                            folderIds_ExpandedFolders_InProgress={ this.state.folderIds_ExpandedFolders_InProgress }
                            projectSearchIds_Selected_InProgress={this.state.projectSearchIds_Selected_InProgress}
                            dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails}
                            projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                            folderEntry_Expanded_Collapsed_Callback={ this._folderEntry_Expanded_Collapsed_Callback_BindThis }
                            callbackOn_searchEntry_Clicked={this._searchCheckboxChanged_BindThis}
                        />
                    )
                    searchDisplayList.push(searchDisplayListEntry);
                }
            }
        }

        {
            const searchesNotInFolders = this.props.searchesAndFolders.searchesNotInFolders;

            if (searchesNotInFolders) {

                for (const searchEntry of searchesNotInFolders) {

                    const selected = this.state.projectSearchIds_Selected_InProgress.has(searchEntry.projectSearchId);

                    const searchDisplayListEntry = (
                        <SearchEntry
                            key={searchEntry.projectSearchId}
                            expand_All_Folders__ShowSearchDetailsTo_Global_Force={ this.props.expand_All_Folders__ShowSearchDetailsTo_Global_Force }
                            searchDisplayListItem={searchEntry}
                            selected={selected}
                            showSeparatorBelow={true}
                            dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                            projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                            deleteSearch_Callback={ this._deleteSearch_Callback_BindThis }
                            callbackOn_entry_Clicked={this._searchCheckboxChanged_BindThis}
                        />
                    )
                    searchDisplayList.push(searchDisplayListEntry);
                }
            }
        }

        return (
            <React.Fragment>
                <div
                    // style={ { padding : 6 } }
                >

                    { searchDisplayList }

                </div>
            </React.Fragment>
        );
    }
}

/////

//  Single Search Entry

interface DeleteSearch_Callback_Params {
    projectSearchId: number
}

type DeleteSearch_Callback_Type = ( params: DeleteSearch_Callback_Params ) => void

/**
 *
 */
interface SearchEntry_Props {
    searchDisplayListItem : ProjectPage_SearchesSection_Searches_Folders_SingleSearch
    expand_All_Folders__ShowSearchDetailsTo_Global_Force: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force
    selected : boolean
    showSeparatorBelow : boolean
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    callbackOn_entry_Clicked : ( projectSearchId : number ) => void;
    deleteSearch_Callback: DeleteSearch_Callback_Type
}

/**
 *
 */
interface SearchEntry_State {

    showSearchDetails? : boolean
    changeSearchName_Active? : boolean
    searchName_InputField_Value? : string

    expand_All_Folders__ShowSearchDetailsTo_Global_Force__Prev_From_Props ?: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force
}

/**
 *
 */
class SearchEntry extends React.Component< SearchEntry_Props, SearchEntry_State > {


    private _searchDetailsContainer_div_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div>

    private _showSearchDetails_Clicked_BindThis = this._showSearchDetails_Clicked.bind(this);
    private _hideSearchDetails_Clicked_BindThis = this._hideSearchDetails_Clicked.bind(this);
    private _searchName_Clicked_BindThis = this._searchName_Clicked.bind(this);

    private _changeSearchName_Clicked_BindThis = this._changeSearchName_Clicked.bind(this);
    private _changeSearchName_InputChanged_BindThis = this._changeSearchName_InputChanged.bind(this);
    private _changeSearchName_Save_Clicked_BindThis = this._changeSearchName_Save_Clicked.bind(this);

    private _deleteSearch_Clicked_BindThis = this._deleteSearch_Clicked.bind(this);

    private _peptide_Page_FakeLink_Clicked_BindThis = this._peptide_Page_FakeLink_Clicked.bind(this);
    private _protein_Page_FakeLink_Clicked_BindThis = this._protein_Page_FakeLink_Clicked.bind(this);
    private _modifications_Page_FakeLink_Clicked_BindThis = this._modifications_Page_FakeLink_Clicked.bind(this);

    private _checkboxChanged_BindThis = this._checkboxChanged.bind(this);


    private _searchNameInputField_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()  for container <div>


    private _searchDetailsAddedToDOM : boolean = false;


    /**
     *
     */
    constructor(props: SearchEntry_Props) {
        super(props);

        this._searchDetailsContainer_div_Ref = React.createRef<HTMLDivElement>();
        this._searchNameInputField_Ref = React.createRef<HTMLInputElement>();

        let showSearchDetails = false;
        if ( props.expand_All_Folders__ShowSearchDetailsTo_Global_Force ) {
            if ( props.expand_All_Folders__ShowSearchDetailsTo_Global_Force.expand_All_Folders__ShowSearchDetails_Global_ForceToValue ) {
                showSearchDetails = true;
            }
        }

        this.state = {
            changeSearchName_Active: false,
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
    static getDerivedStateFromProps( props : SearchEntry_Props, state : SearchEntry_State ) : SearchEntry_State {

        let newState : SearchEntry_State = null;

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
    componentDidUpdate(prevProps: Readonly<SearchEntry_Props>, prevState: Readonly<SearchEntry_State>, snapshot?: any): void {

        if ( prevProps.searchDisplayListItem.projectSearchId !== this.props.searchDisplayListItem.projectSearchId ) {

            /// If update and projectSearchId changed, remove Search Details from DOM and set showSearchDetails to false

            this._removeSearchDetailsFromDOM(); //  Will also set this._searchDetailsAddedToDOM to false
        }

        if ( this.state.showSearchDetails && ( ! this._searchDetailsAddedToDOM ) ) {
            this._addSearchDetailToDOM()
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

        this.setState( (state, props) : SearchEntry_State => {

            return { showSearchDetails: ! state.showSearchDetails };
        });
    }

    /**
     *
     */
    private _changeSearchName_Clicked(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {

        const searchName_InputField_Value = this.props.searchDisplayListItem.name;
        this.setState({ changeSearchName_Active: true, searchName_InputField_Value });
    }

    /**
     *
     */
    private _changeSearchName_InputChanged(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {

        const searchName_InputField_Value = this._searchNameInputField_Ref.current.value;
        this.setState({ searchName_InputField_Value });
    }

    /**
     *
     */
    private _changeSearchName_Save_Clicked(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {

        const saveComplete_Callback = () => {

            this.props.searchDisplayListItem.name = searchName_InputField_Value;
            this.setState({ changeSearchName_Active: false });
        }

        const searchName_InputField_Value = this.state.searchName_InputField_Value;
        this.props.projectPage_SearchesAdmin.saveSearchName({
            projectSearchId: this.props.searchDisplayListItem.projectSearchId,
            newSearchName: searchName_InputField_Value,
            saveComplete_Callback
        });
    }

    /**
     *
     */
    private _deleteSearch_Clicked(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {

        const deleteComplete_Callback = (): void => {

            this.props.deleteSearch_Callback({ projectSearchId: this.props.searchDisplayListItem.projectSearchId });
        }

        this.props.projectPage_SearchesAdmin.deleteSearch({
            projectSearchId: this.props.searchDisplayListItem.projectSearchId,
            searchId: this.props.searchDisplayListItem.searchId,
            deleteComplete_Callback
        })
    }

    /**
     *
     */
    private _peptide_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        event.stopPropagation();

        const projectSearchId = this.props.searchDisplayListItem.projectSearchId;
        const projectSearchIdCode = this.props.searchDisplayListItem.projectSearchIdCode;
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        const projectSearchIds = new Set<number>();
        projectSearchIds.add( projectSearchId );

        const projectSearchIdCodes = new Set<string>();
        projectSearchIdCodes.add( projectSearchIdCode );

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.peptide_View_OpenDataPage({ projectSearchIds, projectSearchIdCodes, ctrlKeyOrMetaKey })
    }

    /**
     *
     */
    private _protein_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        event.stopPropagation();

        const projectSearchId = this.props.searchDisplayListItem.projectSearchId;
        const projectSearchIdCode = this.props.searchDisplayListItem.projectSearchIdCode;
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        const projectSearchIds = new Set<number>();
        projectSearchIds.add( projectSearchId );

        const projectSearchIdCodes = new Set<string>();
        projectSearchIdCodes.add( projectSearchIdCode );

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.protein_View_OpenDataPage({ projectSearchIds, projectSearchIdCodes, ctrlKeyOrMetaKey })
    }

    /**
     *
     */
    private _modifications_Page_FakeLink_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        const projectSearchId = this.props.searchDisplayListItem.projectSearchId;
        const projectSearchIdCode = this.props.searchDisplayListItem.projectSearchIdCode;
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        const projectSearchIds = new Set<number>();
        projectSearchIds.add( projectSearchId );

        const projectSearchIdCodes = new Set<string>();
        projectSearchIdCodes.add( projectSearchIdCode );

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.mod_View_OpenDataPage({ projectSearchIds, projectSearchIdCodes, ctrlKeyOrMetaKey })
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

    /**
     *
     */
    private _checkboxChanged( event: React.MouseEvent<HTMLDivElement> ): void {

        this.props.callbackOn_entry_Clicked( this.props.searchDisplayListItem.projectSearchId );
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

        const searchNameDisplay = searchDisplayListItem.name+ " (" + searchDisplayListItem.searchId + ")";

        const searchDetailsContainer_div_Style : React.CSSProperties = {}
        if ( ! this.state.showSearchDetails ) {
            searchDetailsContainer_div_Style.display = "none";
        }

        return (
            <React.Fragment>
                <div
                     className={ cssClasses }
                     style={ { display: "grid", gridTemplateColumns: "  24px  16px auto " } }>

                    {/*  3 Column Grid  */}

                    <div style={ { marginRight: 8, position: "relative" } }>
                        <div style={ { position: "absolute", top: -2 }}>
                            <input type="checkbox" checked={ this.props.selected } onChange={ this._checkboxChanged_BindThis } />
                        </div>
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
                            <div >
                                { ( ! this.state.changeSearchName_Active ) ? (
                                    <React.Fragment>
                                        <span
                                            style={ { overflowWrap : "break-word"} }
                                            className=" clickable "
                                            onClick={ this._searchName_Clicked_BindThis }
                                        >
                                            { searchNameDisplay }
                                        </span>
                                        <span> </span>
                                        { ( searchDisplayListItem.canChangeSearchName ) ? (
                                            <img className="icon-small clickable  edit_search_name_jq selector_tool_tip_attached "
                                                 src="static/images/icon-edit.png"
                                                 title="Edit name of search"
                                                 onClick={ this._changeSearchName_Clicked_BindThis }
                                            />
                                        ): null }
                                    </React.Fragment>
                                ) : (
                                    <div style={ { whiteSpace: "nowrap" } }>
                                        <input
                                            style={ { width: 600 } }
                                            value={ this.state.searchName_InputField_Value }
                                            ref={ this._searchNameInputField_Ref }
                                            onChange={ this._changeSearchName_InputChanged_BindThis }
                                        />
                                        <span> </span>
                                        <input type="button" value="Save"
                                           onClick={ this._changeSearchName_Save_Clicked_BindThis }
                                        />
                                        <span> </span>
                                        <input type="button" value="Cancel"
                                               onClick={ (event) => { this.setState({ changeSearchName_Active: false}) } }
                                        />
                                    </div>
                                )}
                            </div>
                            <div style={ { paddingLeft: 10, whiteSpace: "nowrap" } }>

                                {/* Navigation Fake Links to Peptide, Protein, Modifications pages for Single Search */}

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
                                <span> </span>
                                { ( searchDisplayListItem.canDelete ) ? (
                                    <img className="icon-small clickable  "
                                         src="static/images/icon-circle-delete.png"
                                         title="Delete search"
                                         onClick={ this._deleteSearch_Clicked_BindThis }
                                    />
                                ): null }
                            </div>
                        </div>

                        {/* Search Detail Container */}
                        <div ref={ this._searchDetailsContainer_div_Ref } style={ searchDetailsContainer_div_Style }>
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

interface FolderEntry_Expanded_Collapsed_Callback_Params {
    folderId: number
    flip_isExpanded: boolean
}

type FolderEntry_Expanded_Collapsed_Callback_Type =
    ( params : FolderEntry_Expanded_Collapsed_Callback_Params ) => void

/////

//  Single Folder Entry

/**
 *
 */
interface FolderEntry_Props {
    searchDisplayListItem : ProjectPage_SearchesSection_Searches_Folders_SingleFolder

    expand_All_Folders__ShowSearchDetailsTo_Global_Force: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force

    projectSearchIds_Selected_InProgress : Set<number>
    folderIds_ExpandedFolders_InProgress : Set<number>;

    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    folderEntry_Expanded_Collapsed_Callback: FolderEntry_Expanded_Collapsed_Callback_Type
    callbackOn_searchEntry_Clicked : ( projectSearchId : number ) => void;
}

/**
 *
 */
interface FolderEntry_State {
    fakeTriggerRender?: object
}

/**
 *
 */
class FolderEntry extends React.Component< FolderEntry_Props, FolderEntry_State > {

    private _folderDivClickHandler_BindThis = this._folderDivClickHandler.bind(this);
    private _changeFolderName_Clicked_BindThis = this._changeFolderName_Clicked.bind(this);
    private _deleteFolder_Clicked_BindThis = this._deleteFolder_Clicked.bind(this);

    private _deleteSearch_Callback_BindThis = this._deleteSearch_Callback.bind(this);

    private _DO_NOT_CALL() {

        const deleteSearch_Callback: DeleteSearch_Callback_Type = this._deleteSearch_Callback;
    }

    /**
     *
     */
    constructor(props: FolderEntry_Props) {
        super(props);

        let folderExpanded = false;

        const searchesInFolder = this.props.searchDisplayListItem.searchesInFolder;

        if ( searchesInFolder ) {
            for (const searchEntry of searchesInFolder) {

                if (searchEntry.projectSearchId !== undefined) {

                    const selected = this.props.projectSearchIds_Selected_InProgress.has(searchEntry.projectSearchId);
                    if (selected) {
                        folderExpanded = true; // Set true if any contained search is initially selected
                    }
                }
            }
        }

        this.state = {};
    }

    /**
     *
     */
    private _folderDivClickHandler( event: React.MouseEvent<HTMLDivElement> ): void {

        this.props.folderEntry_Expanded_Collapsed_Callback({ flip_isExpanded: true, folderId: this.props.searchDisplayListItem.id });
    }

    /**
     *
     */
    private _changeFolderName_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        event.stopPropagation();

        this.props.projectPage_SearchesAdmin.projectPage_SearchesAdmin_OrganizeSearchesAndFolders.
        changeFolderName_MainFolderList({ folderId: this.props.searchDisplayListItem.id, folderName: this.props.searchDisplayListItem.folderName });
    }


    /**
     *
     */
    private _deleteFolder_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        event.stopPropagation();

        this.props.projectPage_SearchesAdmin.deleteFolder({ folderId: this.props.searchDisplayListItem.id })
    }

    /**
     *
     */
    private _deleteSearch_Callback( params : DeleteSearch_Callback_Params ) {

        const new_searchesInFolder: ProjectPage_SearchesSection_Searches_Folders_SingleSearch[] = [];
        for ( const search of this.props.searchDisplayListItem.searchesInFolder ) {
            if ( search.projectSearchId !== params.projectSearchId) {
                new_searchesInFolder.push( search );
            }
        }
        this.props.searchDisplayListItem.searchesInFolder = new_searchesInFolder;

        this.setState({ fakeTriggerRender: {} })
    }

    /**
     *
     */
    render(): React.ReactNode {

        let anySearchSelected = false;
        const searchDisplayList : Array<JSX.Element> = [];
        let emptyFolderMessage : JSX.Element = null;

        const folderExpanded = this.props.folderIds_ExpandedFolders_InProgress.has( this.props.searchDisplayListItem.id );

        if ( folderExpanded ) {

            const searchesInFolder = this.props.searchDisplayListItem.searchesInFolder

            if ( searchesInFolder && searchesInFolder.length > 0 ) {

                const searchesInFolder_length = searchesInFolder.length;

                let counter = 0;

                for (const searchEntry of searchesInFolder) {

                    counter++;

                    if (searchEntry.projectSearchId !== undefined) {

                        const selected = this.props.projectSearchIds_Selected_InProgress.has(searchEntry.projectSearchId);
                        if (selected) {
                            anySearchSelected = true;
                        }
                        //  Show Separator Below for all BUT last entry
                        let showSeparatorBelow = true;
                        if ( counter === searchesInFolder_length ) {
                            showSeparatorBelow = false;
                        }

                        const searchDisplayListEntry = (
                            <SearchEntry key={searchEntry.projectSearchId}
                                         searchDisplayListItem={searchEntry}
                                         expand_All_Folders__ShowSearchDetailsTo_Global_Force={ this.props.expand_All_Folders__ShowSearchDetailsTo_Global_Force }
                                         selected={selected}
                                         showSeparatorBelow={ showSeparatorBelow }
                                         dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails}
                                         projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                                         deleteSearch_Callback={ this._deleteSearch_Callback_BindThis }
                                         callbackOn_entry_Clicked={this.props.callbackOn_searchEntry_Clicked}
                            />
                        )
                        searchDisplayList.push(searchDisplayListEntry);
                    }
                }
            } else {
                emptyFolderMessage = (
                    <div className=" searches-under-folder-block ">
                        <div className="empty-folder-text" style={ { marginLeft: 3 } }>
                            Empty Folder
                        </div>
                    </div>
                );
            }
        }

        const folder_container_div_style : React.CSSProperties = {};
        // if ( ! folderExpanded ) {
        //     folder_container_div_style.marginBottom = 8;
        // }

        return (
            <React.Fragment>

                <div className="folder-container" style={ folder_container_div_style }>

                    <div
                        className=" folder-name-and-collapsable-container clickable "
                        style={ { display: "grid", gridTemplateColumns: "min-content auto"} }
                        onClick={ this._folderDivClickHandler_BindThis }
                    >

                        {/* 2 column grid */}
                        <div className={"folder-collapsable-link-container"}>
                              { ( folderExpanded ) ? (
                                  <img src="static/images/icon-folder-open.png"
                                       className=" icon-large fake-link-image "
                                  />
                              ) : (
                                  <img src="static/images/icon-folder-closed.png"
                                       className=" icon-large fake-link-image "
                                  />
                                )
                            }
                        </div>
                        <div>
                            <span className=" folder-name-display ">{ this.props.searchDisplayListItem.folderName }</span>

                            { ( this.props.searchDisplayListItem.canEdit ) ? (
                                <React.Fragment>
                                    <span> </span>
                                    <img src="static/images/icon-edit.png"
                                         className=" clickable icon-small "
                                         title="Edit name of folder"
                                         onClick={ this._changeFolderName_Clicked_BindThis }
                                    />
                                </React.Fragment>
                            ) : null }
                            { ( this.props.searchDisplayListItem.canDelete ) ? (
                                <React.Fragment>
                                    <span> </span>
                                    <img src="static/images/icon-circle-delete.png"
                                         className=" clickable icon-small "
                                         title="Delete folder.  Searches in it become 'Unfiled'."
                                         onClick={ this._deleteFolder_Clicked_BindThis }
                                    />
                                </React.Fragment>
                            ) : null }
                        </div>
                    </div>

                    <div className={ " searches-under-folder-block "} style={ { marginBottom: 8 } }>
                        { searchDisplayList }
                        { emptyFolderMessage }
                    </div>
                </div>

                <div className="standard-border-color-dark"
                     // marginTop: 7,
                     style={{marginBottom: 8, width: "100%", borderBottomStyle: "solid", borderBottomWidth: 1 }}
                ></div>

            </React.Fragment>
        );
    }
}
