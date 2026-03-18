/**
 * searchSelection_DisplayedNestedInFolders_Component.tsx
 *
 * Choose Searches Selection
 *
 *  Not used on Project Page since search list there includes parts needed for project page.
 *
 *
 *  MAIN CLASS:   React Component:  SearchSelection_DisplayedNestedInFolders_Component
 *
 *
 *  Main Prop:   'select_ONLY_ONE_Search: boolean' :   If true, User can select only ONE Search.  Make the search name a fake link instead of using check boxes.
 *
 */


import React from 'react'
import {
    Search_Tags_SelectSearchTags_Component,
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry,
    Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";

import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data,
    getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";
import {Search_Tags_DisplaySearchTags_UnderSearchName_Component} from "page_js/data_pages/search_tags__display_management/search_tags__display_under_search_name/search_Tags_DisplaySearchTags_UnderSearchName_Component";
import {Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component";
import {Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage} from "page_js/data_pages/common__search_display_verbose_value_store_session_storage/search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage";
import {Search_Tags_Selections_Object} from "page_js/data_pages/search_tags__display_management/search_Tags_Selections_Object";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    tooltip__green_question_mark_in_circle__tooltip_on_hover__COMMON_MESSAGE_Search_Tags_VerboseView_Checkbox_react_component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__COMMON_MESSAGE_Search_Tags_VerboseView_Checkbox_react_component";



//   MAIN CLASS:   React Component:  SearchSelection_DisplayedNestedInFolders_Component


/////////////  INTERNAL classes at bottom


/**
 *
 */
export class SearchSelection_DisplayedNestedInFolders_Component__Selected_Searches_Data_Object {

    private _search_Selected_InProgress : Internal__All_SearchSelectionData
    private _projectSearchIds_Previously_Selected : Array<number>  //  Existing selection.  Array to preserve the existing selection order
    private _searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root

    constructor(
        {
            search_Selected_InProgress, projectSearchIds_Previously_Selected, searchesSearchTagsFolders_Result_Root
        } : {
            search_Selected_InProgress : Internal__All_SearchSelectionData
            projectSearchIds_Previously_Selected : Array<number>  //  Existing selection.  Array to preserve the existing selection order
            searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
        }
    ) {
        this._search_Selected_InProgress = search_Selected_InProgress
        this._projectSearchIds_Previously_Selected = projectSearchIds_Previously_Selected
        this._searchesSearchTagsFolders_Result_Root = searchesSearchTagsFolders_Result_Root
    }

    is_ANY_Search_Selected() {
        return this._search_Selected_InProgress.is_ANY_Search_Selected()
    }

    get_Number_Searches_Selected() {
        return this._search_Selected_InProgress.get_Number_Searches_Selected()
    }

    /**
     * returned in Random Order from Map keys()
     */
    get_ProjectSearchIds_Selected_IterableIterator() :  IterableIterator<number> {

        return this._search_Selected_InProgress.get_search_Selected_InProgress_ProjectSearchIdArray().values()
    }

    /**
     * Return the newly selected ProjectSearchIds in display order
     */
    get_ProjectSearchIds_Selected_Additions_In_DisplayOrder() : ReadonlyArray<number> {

        let projectSearchIds_Previously_Selected_Set: Set<number>

        if ( this._projectSearchIds_Previously_Selected  ) {
            projectSearchIds_Previously_Selected_Set = new Set( this._projectSearchIds_Previously_Selected )
        } else {
            projectSearchIds_Previously_Selected_Set = new Set()
        }

        const searchSelection_Array__NewSelections: Array<number> = []

        for ( const search_Selected_InProgress_ProjectSearchId of this._search_Selected_InProgress.get_search_Selected_InProgress_ProjectSearchIdArray() ) {

            if ( projectSearchIds_Previously_Selected_Set.has( search_Selected_InProgress_ProjectSearchId ) ) {
                //  Skip since in existing ProjectSearchIds
                continue; // EARLY CONTINUE
            }

            searchSelection_Array__NewSelections.push(search_Selected_InProgress_ProjectSearchId)
        }

        return searchSelection_Array__NewSelections;
    }
}

/**
 *
 */
export class SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback_Params {
    readonly selected_Searches_Data_Object: SearchSelection_DisplayedNestedInFolders_Component__Selected_Searches_Data_Object
}

export type SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback =
    ( params : SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback_Params ) => void

/**
 *
 */
interface SearchSelection_DisplayedNestedInFolders_Component_Props {

    select_ONLY_ONE_Search: boolean  //  If true, User can select only ONE Search.  Make the search name a fake link instead of using check boxes.

    hide_SearchFilters?: boolean
    hide_SearchTag_VerboseView_Checkbox?: boolean

    notAllow_Selection_SearchesWithoutProteins?: boolean

    defaultView_ExpandFoldersOnInitialView?: boolean

    //   MUST populate projectIdentifier or searchesSearchTagsFolders_Result_Root

    projectIdentifier : string
    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root // Passed in if available

    projectSearchIds_Previously_Selected : Array<number>  //  Existing selection.  Array to preserve the existing selection order

    //  Experiment ONLY:  The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
    projectSearchIds_ContainedInAllOtherExperimentCells : Set<number>

    callback_updateSelected_Searches : SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback
}

/**
 *
 */
interface SearchSelection_DisplayedNestedInFolders_Component_State {

    show_LoadingData_Message?: boolean

    projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering?: Set<number>   //  null if no filtering
    folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering?: Set<number>          //  null if no filtering

    search_Tags_SelectSearchTags_Component_SearchTagData_Root?: Search_Tags_SelectSearchTags_Component_SearchTagData_Root

    showNoSearchesMessage_NoSearchesLoadedFromServer?: boolean
    showNoSearchesMessage_NoSearches_AfterPossibleFiltering?: boolean

    show_SearchTag_Categories?: boolean

    force_Rerender?: object
}

/////////////

/**
 *
 */
export class SearchSelection_DisplayedNestedInFolders_Component extends React.Component< SearchSelection_DisplayedNestedInFolders_Component_Props, SearchSelection_DisplayedNestedInFolders_Component_State > {

    private _search_Selection_Changed_BindThis = this._search_Selection_Changed.bind(this);

    private _DO_NOT_CALL() {

        const search_Selection_Changed: Internal__Callback_From_SearchEntry_On_Selection_Changed = this._search_Selection_Changed;
    }

    //  passed in or loaded on mount
    private _searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root

    private _search_Selected_InProgress : Internal__All_SearchSelectionData = new Internal__All_SearchSelectionData()

    private _search_Tags_Selections_Object: Search_Tags_Selections_Object = Search_Tags_Selections_Object.createEmptyInstance()

    private _searchName_SearchId_Filter_UserInput = ""

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: SearchSelection_DisplayedNestedInFolders_Component_Props) {
        super(props);

        if ( ( props.projectIdentifier === undefined || props.projectIdentifier === null ) &&
            ( props.searchesSearchTagsFolders_Result_Root === undefined || props.searchesSearchTagsFolders_Result_Root === null ) ) {
            const msg = "props.projectIdentifier AND props.searchesSearchTagsFolders_Result_Root CANNOT BOTH be undefined or null"
            console.warn(msg)
            throw Error(msg)
        }

        if ( ( props.projectIdentifier !== undefined && props.projectIdentifier !== null ) &&
            ( props.searchesSearchTagsFolders_Result_Root !== undefined && props.searchesSearchTagsFolders_Result_Root !== null ) ) {
            const msg = "props.projectIdentifier AND props.searchesSearchTagsFolders_Result_Root CANNOT BOTH be NOT (undefined or null)"
            console.warn(msg)
            throw Error(msg)
        }

        this._searchesSearchTagsFolders_Result_Root = props.searchesSearchTagsFolders_Result_Root; // Passed in if available

        let search_Tags_SelectSearchTags_Component_SearchTagData_Root: Search_Tags_SelectSearchTags_Component_SearchTagData_Root //  Populated here if props.searchesSearchTagsFolders_Result_Root is populated

        if ( this._searchesSearchTagsFolders_Result_Root ) {
            search_Tags_SelectSearchTags_Component_SearchTagData_Root = this._create_State_Entry__search_Tags_SelectSearchTags_Component_SearchTagData_Root({ searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root })
        }

        if ( props.projectSearchIds_Previously_Selected ) {

            //  Update this._search_Selected_InProgress to add in Previously selected ProjectSearchId

            for (const projectSearchId of props.projectSearchIds_Previously_Selected) {
                this._search_Selected_InProgress.add_For_ProjectSearchId_IfNotExists( projectSearchId )
            }
        }

        let show_LoadingData_Message = true;
        if ( this._searchesSearchTagsFolders_Result_Root ) {
            show_LoadingData_Message = false
        }

        const show_SearchTag_Categories = Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.get_Value()

        this.state = {
            search_Tags_SelectSearchTags_Component_SearchTagData_Root, //  Populated here if props.searchesSearchTagsFolders_Result_Root is populated
            show_LoadingData_Message,
            showNoSearchesMessage_NoSearches_AfterPossibleFiltering: false,
            show_SearchTag_Categories
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._loadData_On_ComponentMount();

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException: e
            });
            throw e;
        }
    }

    /**
     *
     */
    componentWillUnmount() {

        this._unmountCalled = true;
    }

    /**
     *
     */
    private _loadData_On_ComponentMount() {

        if ( this._unmountCalled ) {
            // unmounted so exit

            return; // EARLY RETURN
        }

        if ( ! this._searchesSearchTagsFolders_Result_Root ) {

            //  NO Data so load it

            this.setState({ show_LoadingData_Message: true })

            //  Load Searches and Folders to select from

            const promise = getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds({ projectIdentifier: this.props.projectIdentifier })
            promise.catch(reason => {

            })
            promise.then(searchesSearchTagsFolders_Result_Root => { try {

                this._searchesSearchTagsFolders_Result_Root = searchesSearchTagsFolders_Result_Root;

                this.setState({ show_LoadingData_Message: false })

                const search_Tags_SelectSearchTags_Component_SearchTagData_Root = this._create_State_Entry__search_Tags_SelectSearchTags_Component_SearchTagData_Root({ searchesSearchTagsFolders_Result_Root })

                this.setState({
                    search_Tags_SelectSearchTags_Component_SearchTagData_Root, force_Rerender: {}
                });

                this._searchesAndFolders_Update_FilterOnSearchTags()

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }})
        }
    }

    /**
     *
     * @param searchesSearchTagsFolders_Result_Root
     */
    private _create_State_Entry__search_Tags_SelectSearchTags_Component_SearchTagData_Root(
        {
            searchesSearchTagsFolders_Result_Root
        } : {
            searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
        }
    ) : Search_Tags_SelectSearchTags_Component_SearchTagData_Root {

        const searchTagStrings_AllSearches_ArraySorted = Array.from(searchesSearchTagsFolders_Result_Root.get_all_SearchTags_InProject_Iterator());
        searchTagStrings_AllSearches_ArraySorted.sort((a, b) => {
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam( a.tagString, b.tagString )
        })

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

        for (const tagEntry of searchTagStrings_AllSearches_ArraySorted) {

            searchTagEntries_Filter_AllEntries.push(tagEntry)
        }

        const search_Tags_SelectSearchTags_Component_SearchTagData_Root: Search_Tags_SelectSearchTags_Component_SearchTagData_Root = {
            searchTagCategory_Array: searchTagCategory_Array_Filter_AllEntries, searchTag_Array: searchTagEntries_Filter_AllEntries
        }

        return search_Tags_SelectSearchTags_Component_SearchTagData_Root
    }

    /**
     *
     */
    private _search_Selection_Changed(params: Internal__Callback_From_SearchEntry_On_Selection_Changed_Params): void {

        //  Update selection object

        if ( this._search_Selected_InProgress.has_Entry_For_ProjectSearchId( params.projectSearchId ) ) {
            this._search_Selected_InProgress.delete_Entry_For_ProjectSearchId( params.projectSearchId )
        } else {
            this._search_Selected_InProgress.add_For_ProjectSearchId_IfNotExists(params.projectSearchId)
        }

        //  Pass new selection up to parent via callback

        const selected_Searches_Data_Object = new SearchSelection_DisplayedNestedInFolders_Component__Selected_Searches_Data_Object({
            search_Selected_InProgress: this._search_Selected_InProgress,
            projectSearchIds_Previously_Selected: this.props.projectSearchIds_Previously_Selected,
            searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root
        })

        this.props.callback_updateSelected_Searches({ selected_Searches_Data_Object });

        this.setState({ force_Rerender: {} })
    }

    /**
     * Filtering on
     */
    private _searchesAndFolders_Update_FilterOnSearchTags() : void {
        try {
            if ( this._searchName_SearchId_Filter_UserInput.length === 0 && ( ! this._search_Tags_Selections_Object.is_any_selections() ) ) {
                //  NO Filtering on Search Name, Search Id, or Search Tags so just put this._searchesAndFolders_Unfiltered_FromWebservice in State

                this.setState({
                    projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering: null,
                    folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering: null,
                    showNoSearchesMessage_NoSearches_AfterPossibleFiltering: this._searchesSearchTagsFolders_Result_Root.is_NO_Searches_In_Project()
                });

                return;  // EARLY RETURN
            }

            //  Create new Project Search Id Set, applying filtering

            const projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering = new Set<number>();

            for ( const projectSearchId of this._searchesSearchTagsFolders_Result_Root.get_all_Searches_ProjectSearchIds_Set() ) {

                const searchData = this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId);

                if ( ! searchData ) {
                    const msg = "this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn(msg)
                    throw Error(msg)
                }

                let foundAllFilteringOn = true;

                //   Filter on Search Name

                if ( this._searchName_SearchId_Filter_UserInput.length > 0 ) {
                    if ( ( ! searchData.searchName.toLocaleLowerCase().includes( this._searchName_SearchId_Filter_UserInput.toLocaleLowerCase() ) )
                        && ( ! searchData.searchId.toString().includes( this._searchName_SearchId_Filter_UserInput ) ) ) {

                        foundAllFilteringOn = false;
                    }
                }

                if ( foundAllFilteringOn ) {

                    //  Filter on Search Tags

                    if ( ! searchData.searchTagIds_Set ) {
                        const msg = "searchData.searchTagIds_Set NOT Populated for projectSearchId: " + projectSearchId;
                        console.warn(msg)
                        throw Error(msg)
                    }

                    {  //  Filter on the 'AND' filters
                        if ( this._search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND.size > 0 ) {
                            for ( const filterOn_SelectedTagId of this._search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND ) {
                                if ( ! searchData.searchTagIds_Set.has( filterOn_SelectedTagId ) ) {
                                    foundAllFilteringOn = false
                                    break;
                                }
                            }
                        }
                    }
                    if ( foundAllFilteringOn ) { //  Filter on the 'NOT' filters
                        if ( this._search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT.size > 0 ) {
                            for ( const filterOn_SelectedTagId of this._search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT ) {
                                if ( searchData.searchTagIds_Set.has( filterOn_SelectedTagId ) ) {
                                    foundAllFilteringOn = false
                                    break;
                                }
                            }
                        }
                    }
                    if ( foundAllFilteringOn ) { //  Filter on the 'OR' filters
                        if ( this._search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR.size > 0 ) {
                            let foundAny_Of_OR_Tags = false;
                            for ( const filterOn_SelectedTagId of this._search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR ) {
                                if ( searchData.searchTagIds_Set.has( filterOn_SelectedTagId ) ) {
                                    foundAny_Of_OR_Tags = true
                                    break;
                                }
                            }
                            if ( ! foundAny_Of_OR_Tags ) {
                                foundAllFilteringOn = false
                            }
                        }
                    }
                }

                if ( foundAllFilteringOn ) {
                    projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.add(projectSearchId);
                }
            }

            let noSearchesFound_Result = true;
            if ( projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.size > 0 ) {
                noSearchesFound_Result = false;
            }

            const folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering = new Set<number>()

            for ( const folderData of this._searchesSearchTagsFolders_Result_Root.get_allFolders_Data_InDisplayOrder() ) {

                for ( const projectSearchId_InFolder of folderData.searchesInFolder_ProjectSearchIds_InDisplayOrder ) {
                    if ( projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.has( projectSearchId_InFolder ) ) {
                        folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.add(folderData.folderId)
                        break;
                    }
                }
            }

            this.setState({
                projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering,
                folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering,
                showNoSearchesMessage_NoSearches_AfterPossibleFiltering: noSearchesFound_Result
            });

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
    render(): React.ReactNode {

        if ( this.state.show_LoadingData_Message ) {

            return (  //  EARLY RETURN

                <div>
                    <div style={ { marginTop: 20, textAlign: "center" }}>
                        LOADING DATA
                    </div>
                    <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                        <Spinner_Limelight_Component/>
                    </div>
                </div>
            )
        }


        const folderDisplayList : Array<React.JSX.Element> = [];

        {
            for ( const folderEntry of this._searchesSearchTagsFolders_Result_Root.get_allFolders_Data_InDisplayOrder() ) {

                if ( this.state.folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering // null if no filtering
                    && ( ! this.state.folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.has( folderEntry.folderId ) ) ) {
                    //  Skip since filtering and not in filter
                    continue;  //  EARLY CONTINUE
                }

                if ( ( ! folderEntry.searchesInFolder_ProjectSearchIds_InDisplayOrder ) || folderEntry.searchesInFolder_ProjectSearchIds_InDisplayOrder.length === 0 ) {
                    //  Skip empty folder
                    continue;  //  EARLY CONTINUE
                }

                const element = (
                    <Internal_Component__FolderEntry
                        key={folderEntry.folderId}

                        rootComponent_Props={ this.props }

                        defaultView_ExpandFoldersOnInitialView={ this.props.defaultView_ExpandFoldersOnInitialView }

                        folderEntry={folderEntry}

                        show_SearchTag_Categories={ this.state.show_SearchTag_Categories }

                        //  Experiment ONLY:  The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
                        projectSearchIds_ContainedInAllOtherExperimentCells={ this.props.projectSearchIds_ContainedInAllOtherExperimentCells }

                        searchesSearchTagsFolders_Result_Root={ this._searchesSearchTagsFolders_Result_Root }
                        search_Tags_SelectSearchTags_Component_SearchTagData_Root={ this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                        projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering={ this.state.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering }
                        search_Selected_InProgress={ this._search_Selected_InProgress }
                        callbackOn_Search_Selection_Changed={ this._search_Selection_Changed_BindThis }
                    />
                )
                folderDisplayList.push(element);
            }
        }

        //  Searches NOT in any folder

        const searches_NOT_in_ANY_Folder_DisplayList : Array<React.JSX.Element> = [];

        for ( const projectSearchId of this._searchesSearchTagsFolders_Result_Root.get_searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder() ) {

            if ( this.state.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering // null if no filtering
                && ( ! this.state.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.has( projectSearchId ) ) ) {
                //  Skip since filtering and not in filter
                continue;
            }

            const searchData = this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId);

            if ( ! searchData ) {
                const msg = "this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }


            const selected = this._search_Selected_InProgress.has_Entry_For_ProjectSearchId(searchData.projectSearchId);

            const searchDisplayListEntry = (
                <Internal_Component__SearchEntry
                    key={searchData.projectSearchId}

                    rootComponent_Props={ this.props }

                    searchDisplayListItem={searchData}
                    folderId={ undefined }

                    //  Experiment ONLY:  The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
                    projectSearchIds_ContainedInAllOtherExperimentCells={ this.props.projectSearchIds_ContainedInAllOtherExperimentCells }

                    show_SearchTag_Categories={ this.state.show_SearchTag_Categories }

                    searchesSearchTagsFolders_Result_Root={ this._searchesSearchTagsFolders_Result_Root }
                    search_Tags_SelectSearchTags_Component_SearchTagData_Root={ this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                    selected={selected}
                    showSeparatorBelow={true}
                    callbackOn_Search_Selection_Changed={this._search_Selection_Changed_BindThis}
                />
            )
            searches_NOT_in_ANY_Folder_DisplayList.push(searchDisplayListEntry);
        }

        return (
            <div
                // style={ { padding : 6 } }
            >

                { ! this.props.hide_SearchTag_VerboseView_Checkbox ? (
                    <div style={ { marginBottom: 10 } }>
                         <span
                             style={ { whiteSpace: "nowrap", fontWeight: "bold", fontSize: 18 } }
                         >Verbose view: </span>
                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                tooltip__green_question_mark_in_circle__tooltip_on_hover__COMMON_MESSAGE_Search_Tags_VerboseView_Checkbox_react_component()
                            }
                        />
                        <span> </span>
                        <span>
                            <input
                                type="checkbox"
                                checked={ this.state.show_SearchTag_Categories }
                                onChange={ event => {
                                    this.setState({ show_SearchTag_Categories: event.target.checked })
                                }}
                            />
                        </span>
                    </div>
                ) : null }

                { ! this.props.hide_SearchFilters ? (
                    <>
                        <div>
                            <span
                                style={ { whiteSpace: "nowrap", fontWeight: "bold", fontSize: 18 } }
                            >Filter on Search Name or Id: </span>
                            <input
                                value={ this._searchName_SearchId_Filter_UserInput }
                                onChange={ event => {
                                    this._searchName_SearchId_Filter_UserInput = event.target.value

                                    this._searchesAndFolders_Update_FilterOnSearchTags()

                                    this.setState({ force_Rerender: {} })
                                }}
                            />
                        </div>

                        { this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root && this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root.searchTag_Array.length > 0 ? (

                            <div
                                style={ { display: "grid", gridTemplateColumns: "min-content auto", marginTop: 7 } }
                            >
                                <div style={ { marginRight: 10, marginTop: 5 } }>  {/*  marginTop to vertical align label with tag text  */}
                                    <div style={ { whiteSpace: "nowrap", fontWeight: "bold", fontSize: 18 } }>
                                        Filter On Tags:
                                    </div>
                                </div>
                                <div style={ { minWidth: 200 } }>

                                    <Search_Tags_SelectSearchTags_Component
                                        searchTagData_Root={ this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                                        search_Tags_Selections_Object={ this._search_Tags_Selections_Object }
                                        searchTagsSelected_Changed_Callback={ (params) => {

                                            this._search_Tags_Selections_Object = params.search_Tags_Selections_Object

                                            this._searchesAndFolders_Update_FilterOnSearchTags()

                                            this.setState({ force_Rerender: {} })
                                        } }
                                    />

                                </div>

                            </div>

                        ) : null }

                        {/*  Display "Filtering On" to show what search name, search id, and search tags filtering on  */}

                        { this._searchName_SearchId_Filter_UserInput.length > 0 || ( this._search_Tags_Selections_Object.is_any_selections() ) ? (

                            <div
                                className=" filter-on-tags--currently-filtering "
                                style={ { marginBottom: 15 } }
                            >
                                { this._searchName_SearchId_Filter_UserInput.length > 0 ? (  //  User Input value
                                    <div  //  Add marginBottom if also have Search Tags to display
                                        style={ { marginTop: 7, marginBottom : ( this._search_Tags_Selections_Object.is_any_selections() ) ? 5 : null } }
                                    >
                                                <span
                                                    style={ { fontWeight: "bold", fontSize: 18, whiteSpace: "nowrap" } }
                                                >Filtering on text: </span>
                                        <span>
                                                    { this._searchName_SearchId_Filter_UserInput }
                                                </span>
                                        <span> </span>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                "Clear text filters"
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <span
                                                className=" fake-link "
                                                style={ { fontSize: 10 } }
                                                onClick={ event => {

                                                    this._searchName_SearchId_Filter_UserInput = "";

                                                    this._searchesAndFolders_Update_FilterOnSearchTags()

                                                    this.setState({ force_Rerender: {} })
                                                }}
                                            >
                                                clear
                                            </span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </div>
                                ) : null }

                                { ( this._search_Tags_Selections_Object.is_any_selections() ) ? (

                                    <div
                                        style={ { display: "grid", gridTemplateColumns: "min-content 1fr" } }
                                    >
                                        <div style={ { marginTop: 2 } }>
                                            <div>
                                                <span style={ { fontSize: 18, fontWeight: "bold", whiteSpace: "nowrap", marginRight: 5 }}
                                                >
                                                    Filtering on tags:
                                                </span>
                                            </div>
                                            <div style={ { fontSize: 10, marginBottom: 10 } }>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                                        "Clear tag filters"
                                                    }
                                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                >
                                                    <span
                                                        className=" fake-link "
                                                        style={ { fontSize: 10 } }
                                                        onClick={  () => {

                                                            this._search_Tags_Selections_Object = Search_Tags_Selections_Object.createEmptyInstance();

                                                            this._searchesAndFolders_Update_FilterOnSearchTags()

                                                            this.setState({ force_Rerender: {} })
                                                        }  }
                                                    >
                                                        clear
                                                    </span>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                            </div>
                                        </div>
                                        <div>
                                            <Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component
                                                searchTagData_Root={ this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                                                search_Tags_Selections_Object={ this._search_Tags_Selections_Object }
                                                clearSelection_Callback={ () => {

                                                    this._search_Tags_Selections_Object = Search_Tags_Selections_Object.createEmptyInstance();

                                                    this._searchesAndFolders_Update_FilterOnSearchTags()

                                                    this.setState({ force_Rerender: {} })
                                                } }
                                            />
                                        </div>
                                    </div>
                                ) : null }
                            </div>
                        ) : null }
                    </>
                ) : null }

                { ( this.state.showNoSearchesMessage_NoSearches_AfterPossibleFiltering ) ? (

                    <div style={ { marginBottom: 20, marginTop: 20 } }>

                        <span>
                            No searches in this project match current filters.
                        </span>

                        {/* Error Message broken out by what filtering on

                                    { this._searchName_SearchId_Filter_UserInput.length > 0 && this._searchTag_Filter_SelectedTagIds.size > 0 ? (
                                        <span>
                                            No searches in this project contain all the selected search tags and the filter text.
                                        </span>
                                    ) : this._searchName_SearchId_Filter_UserInput.length > 0 ? (
                                        <span>
                                        No searches in this project contain the filter text.
                                    </span>
                                    ) : this._searchTag_Filter_SelectedTagIds.size > 0 ? (
                                        <span>
                                            No searches in this project contain all the selected search tags.
                                        </span>
                                    ) : null }
                                    */}
                    </div>

                ) : null }

                { ( ( folderDisplayList && folderDisplayList.length > 0 ) || ( searches_NOT_in_ANY_Folder_DisplayList && searches_NOT_in_ANY_Folder_DisplayList.length > 0 ) ) ? (
                    <>
                        <div
                            style={ { fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 10 } }
                        >
                            Search List
                        </div>

                        { folderDisplayList }
                        {/*  Searches NOT in ANY Folder  */}
                        { searches_NOT_in_ANY_Folder_DisplayList }
                    </>
                ) : null }
            </div>

        );
    }
}

/////

//  Single Search Entry

/**
 *
 */
interface SearchEntry_Props {

    rootComponent_Props: SearchSelection_DisplayedNestedInFolders_Component_Props  // Props to the root component at the top of this file

    searchDisplayListItem : CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
    folderId: number   //  Null or Undefined if not in folder

    //  Experiment ONLY:  The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
    projectSearchIds_ContainedInAllOtherExperimentCells : Set<number>

    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    search_Tags_SelectSearchTags_Component_SearchTagData_Root: Search_Tags_SelectSearchTags_Component_SearchTagData_Root
    selected : boolean
    show_SearchTag_Categories: boolean
    showSeparatorBelow : boolean
    callbackOn_Search_Selection_Changed: Internal__Callback_From_SearchEntry_On_Selection_Changed
}

/**
 *
 */
interface SearchEntry_State {
    _placeHolder: unknown
}

/**
 *
 */
class Internal_Component__SearchEntry extends React.Component< SearchEntry_Props, SearchEntry_State > {

    private _searchRowClicked_BindThis = this._searchRowClicked.bind(this);
    private _searchName_Clicked_BindThis = this._searchName_Clicked.bind(this)

    /**
     *
     */
    constructor(props: SearchEntry_Props) {
        super(props);

        // this.state = {};
    }

    /**
     *
     */
    private _searchRowClicked( event: React.MouseEvent<HTMLDivElement> ): void {
        try {
            this.props.callbackOn_Search_Selection_Changed({ projectSearchId: this.props.searchDisplayListItem.projectSearchId, folderId: this.props.folderId });
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    private _searchName_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ): void {
         try {
             this.props.callbackOn_Search_Selection_Changed({ projectSearchId: this.props.searchDisplayListItem.projectSearchId, folderId: this.props.folderId });
         } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render(): React.ReactNode {

        let search_selectedInOtherCell = false;

        if ( this.props.projectSearchIds_ContainedInAllOtherExperimentCells && this.props.projectSearchIds_ContainedInAllOtherExperimentCells.has(this.props.searchDisplayListItem.projectSearchId) ) {

            search_selectedInOtherCell = true
        }

        let notAllow_Selection_of_THIS_Search_SinceItHas_NO_Proteins
        if ( this.props.searchDisplayListItem.searchNotContainProteins && this.props.rootComponent_Props.notAllow_Selection_SearchesWithoutProteins ) {
            notAllow_Selection_of_THIS_Search_SinceItHas_NO_Proteins = true
        }

        let selectedOtherCellClass = ""

        if ( search_selectedInOtherCell ) {
            selectedOtherCellClass = " selected-other-cell "
        }

        let tooltipContents_RootDiv: React.JSX.Element = undefined

        if ( search_selectedInOtherCell ) {
            tooltipContents_RootDiv = (
                <div>
                    <div>
                        This search is already in another condition.
                    </div>
                    <div>
                        Selecting this search will remove it from the other condition.
                    </div>
                </div>
            )
        }

        const searchNameDisplay = "(" + this.props.searchDisplayListItem.searchId + ") " + this.props.searchDisplayListItem.searchName;

        let searchTags_Block: React.JSX.Element = undefined

        { //  Search Tags
            if ( this.props.searchDisplayListItem.searchTagIds_Set && this.props.searchDisplayListItem.searchTagIds_Set.size > 0 ) {
                //  Have Search Tags for Search
                const searchTagDisplay_Array: Array<React.JSX.Element> = []

                for ( const searchTag of this.props.searchesSearchTagsFolders_Result_Root.get_all_SearchTags_InProject_Iterator() ) {
                    if ( ! this.props.searchDisplayListItem.searchTagIds_Set.has( searchTag.tagId ) ) {
                        //  Skip since tag not on this search
                        continue; // EARLY CONTINUE
                    }
                    const element = (
                        <div
                            key={searchTag.tagId}
                            className=" search-tag-display-everywhere "
                            style={ { display: "inline-block", backgroundColor: searchTag.tag_Color_Background, marginTop: 1, marginBottom: 1 } }
                        >
                            {searchTag.tagString}
                        </div>
                    )
                    searchTagDisplay_Array.push(element)
                }

                searchTags_Block = (
                    <div>
                        { searchTagDisplay_Array }
                    </div>
                )
            }
        }

        { //  Search Tags

            let add_Change_SearchTags_Clicked_BindThis: () => void

            searchTags_Block = (
                <div>
                    <Search_Tags_DisplaySearchTags_UnderSearchName_Component
                        show_SearchTag_Categories={ this.props.show_SearchTag_Categories }
                        searchTagIds_OnSearch_Set={ this.props.searchDisplayListItem.searchTagIds_Set }
                        searchTagData_Root={ this.props.search_Tags_SelectSearchTags_Component_SearchTagData_Root  }
                        addTag_Clicked_Callback={ add_Change_SearchTags_Clicked_BindThis }
                        changeTags_Clicked_Callback={ add_Change_SearchTags_Clicked_BindThis }
                    />
                </div>
            )
        }

        let style_TopLevelDiv: React.CSSProperties = { display: "grid", gridTemplateColumns: "min-content auto" }

        let searchName_SPAN_CSS_Classes = ""

        if ( this.props.selected ) {
            searchName_SPAN_CSS_Classes = " search-entry-container-selected "
        }
        if ( notAllow_Selection_of_THIS_Search_SinceItHas_NO_Proteins ) {
            searchName_SPAN_CSS_Classes += " gray-text  "
        }

        let row_Div_ClickHandler = this._searchRowClicked_BindThis
        let row_Div_CSS_Class_Clickable = " clickable "

        let searchName_OnClick = undefined;

        if ( this.props.rootComponent_Props.select_ONLY_ONE_Search ) {

            row_Div_ClickHandler = undefined
            row_Div_CSS_Class_Clickable = ""

            // searchName_SPAN_CSS_Classes += " fake-link "

            // searchName_OnClick = this._searchName_Clicked_BindThis
        }

        if ( notAllow_Selection_of_THIS_Search_SinceItHas_NO_Proteins ) {

            row_Div_ClickHandler = undefined
            row_Div_CSS_Class_Clickable = ""
        }

        const topLevelDiv_CSS_Classes = " search-entry-container " + row_Div_CSS_Class_Clickable + searchName_SPAN_CSS_Classes + selectedOtherCellClass;

        let selectButton_Style: React.CSSProperties = undefined

        if ( this.props.selected ) {
            selectButton_Style = { visibility: "hidden" }
        }

        return (
            <React.Fragment>

                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={ tooltipContents_RootDiv }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <div
                        onClick={ row_Div_ClickHandler }
                        className={ topLevelDiv_CSS_Classes }
                        style={ style_TopLevelDiv }
                    >

                        { this.props.rootComponent_Props.select_ONLY_ONE_Search ? (
                            //  YES select_ONLY_ONE_Search
                            <>
                                {/*  2 Column Grid  */}
                                <div style={ { marginRight: 8 } }>
                                    {/*  Button hidden if selected search  */}
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            "Select this search"
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <button
                                            style={ selectButton_Style }
                                            onClick={ this._searchName_Clicked_BindThis }
                                        >
                                            Select
                                        </button>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </div>
                            </>
                        ) : (
                            //  NO select_ONLY_ONE_Search
                            <>
                                {/*  2 Column Grid  */}

                                <div style={ { marginRight: 8, position: "relative" } }>
                                    <input
                                        type="checkbox"
                                        checked={ this.props.selected }
                                        onChange={ () => { /* nothing since have click handler on containing row div */ } }
                                        disabled={ notAllow_Selection_of_THIS_Search_SinceItHas_NO_Proteins ? true : false }
                                    />
                                    { notAllow_Selection_of_THIS_Search_SinceItHas_NO_Proteins ? (
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <div>
                                                    This search is unavailable for selection since it contains no proteins.
                                                </div>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <div style={ { position: "absolute", inset: 0 } }>
                                            </div>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                    ) : null }
                                </div>
                            </>
                        ) }

                        {/*  Second Column or only Div */}
                        <div >
                            <div style={ { marginBottom: 2 } }>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        notAllow_Selection_of_THIS_Search_SinceItHas_NO_Proteins ? (
                                            <div>
                                                This search is unavailable for selection since it contains no proteins.
                                            </div>
                                        ) : undefined
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <span
                                        className={ searchName_SPAN_CSS_Classes }
                                        style={ { overflowWrap : "break-word"}}
                                        onClick={ notAllow_Selection_of_THIS_Search_SinceItHas_NO_Proteins ? undefined : searchName_OnClick }
                                    >
                                        { searchNameDisplay }
                                    </span>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </div>

                            {/*  Search Tags  */}
                            { searchTags_Block }
                        </div>

                    </div>
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                {this.props.showSeparatorBelow ?
                    <div className="standard-border-color-dark"
                         style={{width: "100%", borderBottomStyle: "solid", borderBottomWidth: 1 }}
                    ></div>
                    : null
                }

            </React.Fragment>
        );
    }
}


/////

//  Single Folder Entry

/**
 *
 */
interface FolderEntry_Props {

    rootComponent_Props: SearchSelection_DisplayedNestedInFolders_Component_Props  // Props to the root component at the top of this file

    defaultView_ExpandFoldersOnInitialView: boolean  //  If true, show folder as expanded as default

    folderEntry: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data

    show_SearchTag_Categories: boolean

    //  Experiment ONLY:  The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
    projectSearchIds_ContainedInAllOtherExperimentCells : Set<number>

    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    search_Tags_SelectSearchTags_Component_SearchTagData_Root: Search_Tags_SelectSearchTags_Component_SearchTagData_Root
    projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering?: Set<number>   //  null if no filtering
    search_Selected_InProgress : Internal__All_SearchSelectionData
    callbackOn_Search_Selection_Changed: Internal__Callback_From_SearchEntry_On_Selection_Changed
}

/**
 *
 */
interface FolderEntry_State {
    folderExpanded? : boolean
}

/**
 *
 */
class Internal_Component__FolderEntry extends React.Component< FolderEntry_Props, FolderEntry_State > {

    private _folderDivClickHandler_BindThis = this._folderDivClickHandler.bind(this);

    /**
     *
     */
    constructor(props: FolderEntry_Props) {
        super(props);

        let folderExpanded = false;

        if ( props.defaultView_ExpandFoldersOnInitialView ) {
            folderExpanded = true;
        }

        for ( const projectSearchId of this.props.folderEntry.searchesInFolder_ProjectSearchIds_InDisplayOrder ) {

            const selected = this.props.search_Selected_InProgress.has_Entry_For_ProjectSearchId(projectSearchId);
            if (selected) {
                folderExpanded = true; // Set true if any contained search is initially selected
            }
        }

        this.state = { folderExpanded };
    }

    /**
     *
     */
    private _folderDivClickHandler( event: React.MouseEvent<HTMLDivElement> ): void {

        this.setState( (state : FolderEntry_State, props : FolderEntry_Props ) : FolderEntry_State => {
            return { folderExpanded : ( ! state.folderExpanded ) }; // Save to state for re-render
        });
    }

    /**
     *
     */
    render(): React.ReactNode {

        let anySearchSelected = false;
        const searchDisplayList : Array<React.JSX.Element> = [];

        if ( this.state.folderExpanded ) {

            const searchesInFolder_ProjectSearchIds_InDisplayOrder = this.props.folderEntry.searchesInFolder_ProjectSearchIds_InDisplayOrder
            const searchesInFolder_length = searchesInFolder_ProjectSearchIds_InDisplayOrder.length;

            let counter = 0;

            for (const projectSearchId of searchesInFolder_ProjectSearchIds_InDisplayOrder) {

                counter++;

                if ( this.props.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering // null if no filtering
                    && ( ! this.props.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering.has( projectSearchId ) ) ) {
                    //  Skip since filtering and not in filter
                    continue;
                }

                const searchEntry = this.props.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId)
                if ( ! searchEntry ) {
                    const msg = "this.props.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
                    console.warn(msg)
                    throw Error(msg)
                }

                const selected = this.props.search_Selected_InProgress.has_Entry_For_ProjectSearchId(projectSearchId);
                if (selected) {
                    anySearchSelected = true;
                }
                //  Show Separator Below for all BUT last entry
                let showSeparatorBelow = true;
                if ( counter === searchesInFolder_length ) {
                    showSeparatorBelow = false;
                }

                const searchDisplayListEntry = (
                    <Internal_Component__SearchEntry
                        key={projectSearchId}

                        rootComponent_Props={ this.props.rootComponent_Props }

                        searchDisplayListItem={searchEntry}
                        folderId={ this.props.folderEntry.folderId }

                        //  Experiment ONLY:  The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
                        projectSearchIds_ContainedInAllOtherExperimentCells={ this.props.projectSearchIds_ContainedInAllOtherExperimentCells }

                        searchesSearchTagsFolders_Result_Root={ this.props.searchesSearchTagsFolders_Result_Root }
                        search_Tags_SelectSearchTags_Component_SearchTagData_Root={ this.props.search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                        selected={selected}
                        show_SearchTag_Categories={ this.props.show_SearchTag_Categories }
                        showSeparatorBelow={ showSeparatorBelow }
                        callbackOn_Search_Selection_Changed={this.props.callbackOn_Search_Selection_Changed }
                    />
                )
                searchDisplayList.push(searchDisplayListEntry);
            }
        }

        const folder_container_div_style : React.CSSProperties = {};
        if ( ! this.state.folderExpanded ) {
            folder_container_div_style.marginBottom = 8;
        }

        return (
            <React.Fragment>

                <div className="folder-container" style={ folder_container_div_style }>

                    <div
                        className=" folder-name-and-collapsable-container clickable "
                        style={ { display: "grid", gridTemplateColumns: "min-content auto"} }
                        onClick={ this._folderDivClickHandler_BindThis }
                    >

                        {/* 2 column grid */}
                        <div style={ { paddingRight: 6 } } className={"folder-collapsable-link-container"}>
                            {
                                ( this.state.folderExpanded ) ? (
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
                        <div >
                            <span className=" folder-name-display ">{ this.props.folderEntry.folderName }</span>
                        </div>

                    </div>

                    <div className={ " searches-under-folder-block "} >
                        { searchDisplayList }
                    </div>
                </div>

                <div className="standard-border-color-dark"
                     style={{width: "100%", borderBottomStyle: "solid", borderBottomWidth: 1 }}
                ></div>

            </React.Fragment>
        );
    }
}


/////////////  INTERNAL classes

/////////////  INTERNAL classes

/**
 *
 */
class Internal__All_SearchSelectionData {

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

    // get_search_Selected_InProgress_Map_Key_ProjectSearchId() : ReadonlyMap<number, Internal__Single_SearchSelectionData> {
    //     return this._search_Selected_InProgress_Map_Key_ProjectSearchId
    // }

    //////  PREVIOUSLY !!!

    // private _search_Selected_InProgress_Map_Key_ProjectSearchId : Map<number, Internal__Single_SearchSelectionData> = new Map();
    //
    // add_Entry_IfNotExists_For_ProjectSearchId ( entry : Internal__Single_SearchSelectionData ) {
    //     if ( ! this._search_Selected_InProgress_Map_Key_ProjectSearchId.has( entry.projectSearchId ) ) {
    //         this._search_Selected_InProgress_Map_Key_ProjectSearchId.set( entry.projectSearchId, entry )
    //     }
    // }
    //
    // has_Entry_For_ProjectSearchId( projectSearchId: number ) {
    //     return this._search_Selected_InProgress_Map_Key_ProjectSearchId.has(projectSearchId)
    // }
    //
    // delete_Entry_For_ProjectSearchId( projectSearchId: number ) : void {
    //     this._search_Selected_InProgress_Map_Key_ProjectSearchId.delete(projectSearchId)
    // }
    //
    // is_ANY_Search_Selected() {
    //     return this._search_Selected_InProgress_Map_Key_ProjectSearchId.size > 0
    // }
    //
    // get_Number_Searches_Selected() {
    //     return this._search_Selected_InProgress_Map_Key_ProjectSearchId.size
    // }
    //
    // get_search_Selected_InProgress_Map_Key_ProjectSearchId() : ReadonlyMap<number, Internal__Single_SearchSelectionData> {
    //     return this._search_Selected_InProgress_Map_Key_ProjectSearchId
    // }
}

// /**
//  *
//  */
// class Internal__Single_SearchSelectionData {
//     readonly folderId: number
//     readonly projectSearchId: number
//     readonly previouslySelected: boolean //  was in props.projectSearchIds_Previously_Selected
// }

///////

/**
 *
 */
class Internal__Callback_From_SearchEntry_On_Selection_Changed_Params {

    folderId: number
    projectSearchId: number
}

/**
 *
 */
type Internal__Callback_From_SearchEntry_On_Selection_Changed =
    (params: Internal__Callback_From_SearchEntry_On_Selection_Changed_Params ) => void
