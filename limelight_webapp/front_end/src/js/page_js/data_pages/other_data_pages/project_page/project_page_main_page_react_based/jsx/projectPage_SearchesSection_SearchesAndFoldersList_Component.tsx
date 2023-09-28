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

import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_SearchesAdmin} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data
} from "page_js/data_pages/common_data_loaded_from_server__for_project__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders";
import {ProjectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet";
import {
    ProjectPage_SearchEntry_UsedInMultipleSections_Component,
    ProjectPage_SearchEntry_UsedInMultipleSections_Component__DeleteSearch_Callback_Params,
    ProjectPage_SearchEntry_UsedInMultipleSections_Component__DeleteSearch_Callback_Type,
    ProjectPage_SearchEntry_UsedInMultipleSections_Component__SearchChanged_Callback_Params,
    ProjectPage_SearchEntry_UsedInMultipleSections_Component__SearchChanged_Callback_Type
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchEntry_UsedInMultipleSections_Component";
import {Search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root} from "page_js/data_pages/search_tags__display_management/search_tags__display_under_search_name/search_Tags_DisplaySearchTags_UnderSearchName_Component";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";

//  Internal Constants


/////////////  INTERNAL classes at bottom


/**
 *
 */
export class ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object {

    private _search_Selected_InProgress : ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData
    private _searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root

    constructor(
        {
            search_Selected_InProgress, searchesSearchTagsFolders_Result_Root
        } : {
            search_Selected_InProgress : ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData
            searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
        }
    ) {
        this._search_Selected_InProgress = search_Selected_InProgress
        this._searchesSearchTagsFolders_Result_Root = searchesSearchTagsFolders_Result_Root
    }

    is_ANY_Search_Selected() {
        return this._search_Selected_InProgress.is_ANY_Search_Selected()
    }

    get_Number_Searches_Selected() {
        return this._search_Selected_InProgress.get_Number_Searches_Selected()
    }

    has_Entry_For_ProjectSearchId( projectSearchId: number ) {
        return this._search_Selected_InProgress.has_Entry_For_ProjectSearchId(projectSearchId)
    }

    /**
     * returned in Random Order from Map keys()
     */
    get_ProjectSearchIds_Selected_In_SelectionOrder_IterableIterator() :  IterableIterator<number> {

        return this._search_Selected_InProgress.get_search_Selected_InProgress_ProjectSearchIdArray().values()
    }

    /**
     * Return the newly selected ProjectSearchIds in display order
     */
    get_ProjectSearchIds_Selected_Additions_In_DisplayOrder() : ReadonlyArray<number> {

        return this._search_Selected_InProgress.get_search_Selected_InProgress_ProjectSearchIdArray()
    }
}

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
export class ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds_Params {
    readonly selected_Searches_Data_Object: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object
}

export type ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds =
    ( params : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds_Params ) => void

////  React Components

/**
 *
 */
export interface ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Props {
    projectIdentifier : string
    show_SearchTag_Categories: boolean
    expand_All_Folders__ShowSearchDetailsTo_Global_Force: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force
    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root: Search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root
    projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering?: Set<number>   //  null if no filtering
    folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering?: Set<number>          //  null if no filtering
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet: ProjectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet
    callback_updateSelected_Searches : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds

    callback_SearchChanged: () => void
    callback_SearchDeleted: () => void
    callback_FolderDeleted: () => void
}

/**
 *
 */
interface ProjectPage_SearchesSection_SearchesAndFoldersList_Component_State {

    show_UpdatingMessage?: boolean

    folderIds_ExpandedFolders_InProgress? : Set<number>;

    expand_All_Folders__ShowSearchDetailsTo_Global_Force_FromProps?: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force

    fakeTriggerRender?: object
    force_Rerender?: object
}

/**
 *
 */
export class ProjectPage_SearchesSection_SearchesAndFoldersList_Component extends React.Component< ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Props, ProjectPage_SearchesSection_SearchesAndFoldersList_Component_State > {

    private _folderEntry_Expanded_Collapsed_Callback_BindThis = this._folderEntry_Expanded_Collapsed_Callback.bind(this)
    private _searchEntry_NOT_In_Folder_Selected_DeSelected_Callback_BindThis = this._searchEntry_NOT_In_Folder_Selected_DeSelected_Callback.bind(this);
    private _searchEntry_In_Folder_Selected_DeSelected_Callback_BindThis = this._searchEntry_In_Folder_Selected_DeSelected_Callback.bind(this);
    private _callback_SearchChanged_BindThis = this._callback_SearchChanged.bind(this);
    private _deleteSearch_Callback_BindThis = this._deleteSearch_Callback.bind(this);

    private _DO_NOT_CALL() {

        const folderEntry_Expanded_Collapsed_Callback: FolderEntry_Expanded_Collapsed_Callback_Type = this._folderEntry_Expanded_Collapsed_Callback;

        const searchEntry_In_Folder_Selected_DeSelected_Callback: SearchEntry_In_Folder_Selected_DeSelected_Callback_Type = this._searchEntry_In_Folder_Selected_DeSelected_Callback;

        const callback_SearchChanged: ProjectPage_SearchEntry_UsedInMultipleSections_Component__SearchChanged_Callback_Type = this._callback_SearchChanged

        const deleteSearch_Callback: ProjectPage_SearchEntry_UsedInMultipleSections_Component__DeleteSearch_Callback_Type = this._deleteSearch_Callback;
    }

    private _search_Selected_InProgress : ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData = new ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData()

    /**
     *
     */
    constructor(props: ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Props) {
        super(props);

        this.state = {
            show_UpdatingMessage: false,
            folderIds_ExpandedFolders_InProgress : new Set( props.projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.get_FolderIds_ExpandedFolders() ),
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
                if ( props.expand_All_Folders__ShowSearchDetailsTo_Global_Force.expand_All_Folders__ShowSearchDetails_Global_ForceToValue
                    && props.searchesSearchTagsFolders_Result_Root && ( ! props.searchesSearchTagsFolders_Result_Root.is_NO_Folders_In_Project() ) ) {

                    const folderIds_ExpandedFolders_InProgress: Set<number> = new Set();
                    for ( const entry of props.searchesSearchTagsFolders_Result_Root.get_allFolders_Data_InDisplayOrder() ) {
                        const id = entry.folderId;
                        folderIds_ExpandedFolders_InProgress.add( id );
                    }

                    props.projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.
                    update_folderIds_ExpandedFolders({ updated_folderIds_ExpandedFolders: folderIds_ExpandedFolders_InProgress });

                    newState.folderIds_ExpandedFolders_InProgress = folderIds_ExpandedFolders_InProgress;

                } else {
                    props.projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.
                    update_folderIds_ExpandedFolders({ updated_folderIds_ExpandedFolders: new Set() });

                    newState.folderIds_ExpandedFolders_InProgress = new Set();
                }
            }
        }

        return newState;
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Props>, prevState: Readonly<ProjectPage_SearchesSection_SearchesAndFoldersList_Component_State>, snapshot?: any ) {

        if ( prevProps.searchesSearchTagsFolders_Result_Root !== this.props.searchesSearchTagsFolders_Result_Root
            && this.state.show_UpdatingMessage ) {

            this.setState({ show_UpdatingMessage: false })
        }
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

            props.projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.
            update_folderIds_ExpandedFolders({ updated_folderIds_ExpandedFolders: folderIds_ExpandedFolders_InProgress });

            return { folderIds_ExpandedFolders_InProgress };
        });
    }

    /**
     *
     */
    private _searchEntry_NOT_In_Folder_Selected_DeSelected_Callback( projectSearchId: number ) : void {

        this._searchEntry_In_Folder_Selected_DeSelected_Callback({ projectSearchId, folderId: null })
    }

    /**
     *
     */
    private _searchEntry_In_Folder_Selected_DeSelected_Callback( params : SearchEntry_In_Folder_Selected_DeSelected_Callback_Type_Params ): void {

        //  Update selection object

        if ( this._search_Selected_InProgress.has_Entry_For_ProjectSearchId( params.projectSearchId ) ) {
            this._search_Selected_InProgress.delete_Entry_For_ProjectSearchId( params.projectSearchId )
        } else {
            this._search_Selected_InProgress.add_For_ProjectSearchId_IfNotExists(params.projectSearchId)
        }

        //  Pass new selection up to parent via callback

        const selected_Searches_Data_Object = new ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object({
            search_Selected_InProgress: this._search_Selected_InProgress,
            searchesSearchTagsFolders_Result_Root: this.props.searchesSearchTagsFolders_Result_Root
        })

        this.props.callback_updateSelected_Searches({ selected_Searches_Data_Object });

        this.setState({ force_Rerender: {} })
    }

    /**
     *
     */
    private _callback_SearchChanged( params: ProjectPage_SearchEntry_UsedInMultipleSections_Component__SearchChanged_Callback_Params ) {

        if ( this.props.callback_SearchChanged ) {

            this.setState( { show_UpdatingMessage: true } )

            window.setTimeout( () => {
                try {
                    this.props.callback_SearchChanged()

                } catch ( e ) {
                    console.warn( "Exception caught in _callback_SearchChanged inside setTimeout" );
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e;
                }
            }, 10 );

            return; // EARLY RETURN
        }

        window.location.reload(true) //  Fallback when no callback is available
    }

    /**
     *
     */
    private _deleteSearch_Callback( params : ProjectPage_SearchEntry_UsedInMultipleSections_Component__DeleteSearch_Callback_Params ) {

        if ( this.props.callback_SearchDeleted ) {

            this.setState( { show_UpdatingMessage: true } )

            window.setTimeout( () => {
                try {
                    this.props.callback_SearchDeleted()

                } catch ( e ) {
                    console.warn( "Exception caught in _deleteSearch_Callback inside setTimeout" );
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e;
                }
            }, 10 );

            return; // EARLY RETURN
        }

        window.location.reload(true) //  Fallback when no callback is available
    }

    /**
     *
     */
    render(): React.ReactNode {

        if ( this.props.searchesSearchTagsFolders_Result_Root.is_NO_Folders_In_Project() ) {
            return this._render_NO_Folders()
        }

        return this._render_YES_Folders()
    }

    /**
     *
     */
    private _render_NO_Folders(): React.ReactNode {

        const searchDisplayList : Array<JSX.Element> = [];

        for ( const projectSearchId of this.props.searchesSearchTagsFolders_Result_Root.get_searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder() ) {

            if ( this.props.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering // null if no filtering
                && ( ! this.props.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.has( projectSearchId ) ) ) {
                //  Skip since filtering and not in filter
                continue;
            }

            const searchData = this.props.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId);

            if ( ! searchData ) {
                const msg = "this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }


            const selected = this._search_Selected_InProgress.has_Entry_For_ProjectSearchId(searchData.projectSearchId);

            const searchDisplayListEntry = (
                <ProjectPage_SearchEntry_UsedInMultipleSections_Component
                    key={searchData.projectSearchId}

                    show_SearchTag_Categories={ this.props.show_SearchTag_Categories }

                    expand_All_Folders__ShowSearchDetailsTo_Global_Force={ this.props.expand_All_Folders__ShowSearchDetailsTo_Global_Force }
                    projectIdentifier={ this.props.projectIdentifier }
                    searchesSearchTagsFolders_Result_Root={ this.props.searchesSearchTagsFolders_Result_Root }
                    search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root={ this.props.search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root }
                    searchDisplayListItem={searchData}
                    selected={selected}
                    showSeparatorBelow={true}
                    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                    projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                    searchChanged_Callback={ this._callback_SearchChanged_BindThis }
                    deleteSearch_Callback={ this._deleteSearch_Callback_BindThis }
                    callbackOn_Search_Entry_Clicked={this._searchEntry_NOT_In_Folder_Selected_DeSelected_Callback_BindThis}
                />
            )
            searchDisplayList.push(searchDisplayListEntry);
        }

        return (
            <React.Fragment>
                <div>
                    { searchDisplayList }
                </div>
            </React.Fragment>
        );

    }

    /**
     *
     */
    private _render_YES_Folders(): React.ReactNode {

        const folderDisplayList : Array<JSX.Element> = [];

        {
            for ( const folderEntry of this.props.searchesSearchTagsFolders_Result_Root.get_allFolders_Data_InDisplayOrder() ) {

                if ( this.props.folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering // null if no filtering
                    && ( ! this.props.folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.has( folderEntry.folderId ) ) ) {
                    //  Skip since filtering and not in filter
                    continue;
                }

                const element = (
                    <FolderEntry
                        key={folderEntry.folderId}
                        projectIdentifier={ this.props.projectIdentifier }
                        folderEntry={folderEntry}
                        expand_All_Folders__ShowSearchDetailsTo_Global_Force={ this.props.expand_All_Folders__ShowSearchDetailsTo_Global_Force }

                        show_SearchTag_Categories={ this.props.show_SearchTag_Categories }

                        searchesSearchTagsFolders_Result_Root={ this.props.searchesSearchTagsFolders_Result_Root }
                        search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root={ this.props.search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root }
                        projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering={ this.props.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering }
                        folderIds_ExpandedFolders_InProgress={ this.state.folderIds_ExpandedFolders_InProgress }
                        search_Selected_InProgress={ this._search_Selected_InProgress }
                        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails}
                        projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                        folderEntry_Expanded_Collapsed_Callback={ this._folderEntry_Expanded_Collapsed_Callback_BindThis }
                        callbackOn_SearchEntry_In_Folder_Selected_DeSelected={ this._searchEntry_In_Folder_Selected_DeSelected_Callback_BindThis }
                        callback_SearchChanged={ this._callback_SearchChanged_BindThis }
                        callback_FolderDeleted={ this.props.callback_FolderDeleted }
                    />
                )
                folderDisplayList.push(element);
            }
        }

        const searchDisplayList : Array<JSX.Element> = [];

        for ( const projectSearchId of this.props.searchesSearchTagsFolders_Result_Root.get_searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder() ) {

            if ( this.props.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering // null if no filtering
                && ( ! this.props.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.has( projectSearchId ) ) ) {
                //  Skip since filtering and not in filter
                continue;
            }

            const searchData = this.props.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId);

            if ( ! searchData ) {
                const msg = "this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }


            const selected = this._search_Selected_InProgress.has_Entry_For_ProjectSearchId(searchData.projectSearchId);

            const searchDisplayListEntry = (
                <ProjectPage_SearchEntry_UsedInMultipleSections_Component
                    key={searchData.projectSearchId}
                    expand_All_Folders__ShowSearchDetailsTo_Global_Force={ this.props.expand_All_Folders__ShowSearchDetailsTo_Global_Force }
                    projectIdentifier={ this.props.projectIdentifier }
                    searchesSearchTagsFolders_Result_Root={ this.props.searchesSearchTagsFolders_Result_Root }
                    search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root={ this.props.search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root }
                    searchDisplayListItem={searchData}

                    show_SearchTag_Categories={ this.props.show_SearchTag_Categories }

                    selected={selected}
                    showSeparatorBelow={true}
                    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails }
                    projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                    searchChanged_Callback={ this._callback_SearchChanged_BindThis }
                    deleteSearch_Callback={ this._deleteSearch_Callback_BindThis }
                    callbackOn_Search_Entry_Clicked={this._searchEntry_NOT_In_Folder_Selected_DeSelected_Callback_BindThis}
                />
            )
            searchDisplayList.push(searchDisplayListEntry);
        }

        return (
            <div style={ { position: "relative"} }>
                <div>
                    { folderDisplayList }
                </div>
                <div>
                    { searchDisplayList }
                </div>

                {/*  Remove since not removed after update.  Maybe add back in when figure out    */}

                { this.state.show_UpdatingMessage ? (
                    <div className=" block-updating-overlay-container " >
                        Updating
                    </div>

                ) : null }

            </div>
        );

    }
}


interface FolderEntry_Expanded_Collapsed_Callback_Params {
    folderId: number
    flip_isExpanded: boolean
}

type FolderEntry_Expanded_Collapsed_Callback_Type =
    ( params : FolderEntry_Expanded_Collapsed_Callback_Params ) => void

interface SearchEntry_In_Folder_Selected_DeSelected_Callback_Type_Params {
    folderId: number
    projectSearchId: number
}

type SearchEntry_In_Folder_Selected_DeSelected_Callback_Type =
    ( params : SearchEntry_In_Folder_Selected_DeSelected_Callback_Type_Params ) => void

/////

//  Single Folder Entry

/**
 *
 */
interface FolderEntry_Props {
    projectIdentifier : string
    folderEntry : CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data

    show_SearchTag_Categories: boolean

    expand_All_Folders__ShowSearchDetailsTo_Global_Force: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force

    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root: Search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root
    projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering?: Set<number>   //  null if no filtering

    search_Selected_InProgress : ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData
    folderIds_ExpandedFolders_InProgress : Set<number>;

    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    folderEntry_Expanded_Collapsed_Callback: FolderEntry_Expanded_Collapsed_Callback_Type
    callbackOn_SearchEntry_In_Folder_Selected_DeSelected : SearchEntry_In_Folder_Selected_DeSelected_Callback_Type
    callback_FolderDeleted: () => void

    callback_SearchChanged: ProjectPage_SearchEntry_UsedInMultipleSections_Component__SearchChanged_Callback_Type
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

    private _callback_SearchChanged_BindThis = this._callback_SearchChanged.bind(this);
    private _deleteSearch_Callback_BindThis = this._deleteSearch_Callback.bind(this);

    private _callbackOn_searchEntry_Clicked_BindThis = this._callbackOn_searchEntry_Clicked.bind(this);

    private _DO_NOT_CALL() {

        const deleteSearch_Callback: ProjectPage_SearchEntry_UsedInMultipleSections_Component__DeleteSearch_Callback_Type = this._deleteSearch_Callback;
    }

    /**
     *
     */
    constructor(props: FolderEntry_Props) {
        super(props);

        // let folderExpanded = false;
        //
        // for (const projectSearchId of this.props.folderEntry.searchesInFolder_ProjectSearchIds_InDisplayOrder) {
        //
        //     const selected = this.props.projectSearchIds_Selected_InProgress.has(projectSearchId);
        //     if (selected) {
        //         folderExpanded = true; // Set true if any contained search is initially selected
        //     }
        // }

        this.state = {};
    }

    /**
     *
     */
    private _folderDivClickHandler( event: React.MouseEvent<HTMLDivElement> ): void {

        event.stopPropagation();  // Stop bubbling of event

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

        this.props.folderEntry_Expanded_Collapsed_Callback({ flip_isExpanded: true, folderId: this.props.folderEntry.folderId });
    }

    /**
     *
     */
    private _changeFolderName_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        event.stopPropagation();

        const eventTarget_DOMElement = event.target as HTMLImageElement

        const eventTarget_DOMElement_BoundingRect = eventTarget_DOMElement.getBoundingClientRect();

        const position_top =  eventTarget_DOMElement_BoundingRect.top;
        const position_left =  eventTarget_DOMElement_BoundingRect.left;

        this.props.projectPage_SearchesAdmin.renameFolder({
            folderId: this.props.folderEntry.folderId, folderName: this.props.folderEntry.folderName,
            position_top, position_left
        });
    }

    /**
     *
     */
    private _deleteFolder_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        event.stopPropagation();

        const callback_FolderDelete_Complete = () : void => {

            this.props.callback_FolderDeleted()
        }

        this.props.projectPage_SearchesAdmin.deleteFolder({ folderId: this.props.folderEntry.folderId, callback_FolderDelete_Complete })
    }

    /**
     *
     */
    private _callback_SearchChanged( params: ProjectPage_SearchEntry_UsedInMultipleSections_Component__SearchChanged_Callback_Params ) {

        if ( this.props.callback_SearchChanged ) {

            this.props.callback_SearchChanged(params)

            return; // EARLY RETURN
        }

        window.location.reload(true) //  Fallback when no callback is available
    }

    /**
     *
     */
    private _deleteSearch_Callback( params : ProjectPage_SearchEntry_UsedInMultipleSections_Component__DeleteSearch_Callback_Params ) {

        if ( this.props.callback_FolderDeleted ) {

            this.props.callback_FolderDeleted()

            return;
        }

        window.location.reload(true)  // Fallback
    }

    /**
     *
     */
    private _callbackOn_searchEntry_Clicked( projectSearchId : number ) : void {

        this.props.callbackOn_SearchEntry_In_Folder_Selected_DeSelected({ folderId: this.props.folderEntry.folderId, projectSearchId })
    }

    /**
     *
     */
    render(): React.ReactNode {

        let anySearchSelected = false;
        const searchDisplayList : Array<JSX.Element> = [];
        let emptyFolderMessage : JSX.Element = null;

        const folderExpanded = this.props.folderIds_ExpandedFolders_InProgress.has( this.props.folderEntry.folderId );

        if ( folderExpanded ) {

            const projectSearchIds_InDisplayOrder = this.props.folderEntry.searchesInFolder_ProjectSearchIds_InDisplayOrder

            if ( projectSearchIds_InDisplayOrder && projectSearchIds_InDisplayOrder.length > 0 ) {

                const searchesInFolder_length = projectSearchIds_InDisplayOrder.length;

                let counter = 0;

                for (const projectSearchId_InDisplayOrder of projectSearchIds_InDisplayOrder) {

                    counter++;

                    if ( this.props.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering // null if no filtering
                        && ( ! this.props.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.has( projectSearchId_InDisplayOrder ) ) ) {
                        //  Skip since filtering and not in filter
                        continue;
                    }

                    if (projectSearchId_InDisplayOrder !== undefined) {

                        const selected = this.props.search_Selected_InProgress.has_Entry_For_ProjectSearchId(projectSearchId_InDisplayOrder);
                        if (selected) {
                            anySearchSelected = true;
                        }
                        //  Show Separator Below for all BUT last entry
                        let showSeparatorBelow = true;
                        if ( counter === searchesInFolder_length ) {
                            showSeparatorBelow = false;
                        }

                        const searchData = this.props.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId_InDisplayOrder);

                        if ( ! searchData ) {
                            const msg = "this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId_InDisplayOrder;
                            console.warn(msg)
                            throw Error(msg)
                        }


                        const searchDisplayListEntry = (
                            <ProjectPage_SearchEntry_UsedInMultipleSections_Component
                                key={searchData.projectSearchId}
                                projectIdentifier={ this.props.projectIdentifier }
                                searchDisplayListItem={searchData}

                                show_SearchTag_Categories={ this.props.show_SearchTag_Categories }

                                searchesSearchTagsFolders_Result_Root={ this.props.searchesSearchTagsFolders_Result_Root }
                                search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root={ this.props.search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root }
                                expand_All_Folders__ShowSearchDetailsTo_Global_Force={ this.props.expand_All_Folders__ShowSearchDetailsTo_Global_Force }
                                selected={selected}
                                showSeparatorBelow={ showSeparatorBelow }
                                dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails}
                                projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                                searchChanged_Callback={ this._callback_SearchChanged_BindThis }
                                deleteSearch_Callback={ this._deleteSearch_Callback_BindThis }
                                callbackOn_Search_Entry_Clicked={this._callbackOn_searchEntry_Clicked_BindThis}
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
                            <span className=" folder-name-display ">
                                { this.props.folderEntry ? (
                                    <span>
                                        { this.props.folderEntry.folderName }
                                    </span>
                                ) : (
                                    <span>
                                        All Searches   {/*  "All Searches" Folder Label  */}
                                    </span>
                                )}
                            </span>

                            { ( this.props.searchesSearchTagsFolders_Result_Root.is_userIsProjectOwner() ) ? (
                                <React.Fragment>
                                    <span> </span>
                                    <img src="static/images/icon-edit.png"
                                         className=" clickable icon-small "
                                         title="Edit name of folder"
                                         onClick={ this._changeFolderName_Clicked_BindThis }
                                    />
                                </React.Fragment>
                            ) : null }
                            { ( this.props.searchesSearchTagsFolders_Result_Root.is_userIsProjectOwner() ) ? (
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


/**
 *
 */
export class ProjectPage_SearchesSection_SearchesAndFoldersList_Component__All_SearchSelectionData {

    private _search_Selected_InProgress : Array<number> = [];

    add_For_ProjectSearchId_IfNotExists ( projectSearchId: number ) {
        if ( ! this._search_Selected_InProgress.includes( projectSearchId ) ) {
            this._search_Selected_InProgress.push( projectSearchId );
        }
    }

    has_Entry_For_ProjectSearchId( projectSearchId: number ) {
        return this._search_Selected_InProgress.includes( projectSearchId )
    }

    delete_Entry_For_ProjectSearchId( projectSearchId: number ) : void {
        this._search_Selected_InProgress = this._search_Selected_InProgress.filter(value => {
            if ( value === projectSearchId ) {
                return false
            }
            return true
        })
    }

    is_ANY_Search_Selected() {
        return this._search_Selected_InProgress.length > 0
    }

    get_Number_Searches_Selected() {
        return this._search_Selected_InProgress.length
    }

    get_search_Selected_InProgress_ProjectSearchIdArray(): ReadonlyArray<number> {
        return this._search_Selected_InProgress
    }

}
