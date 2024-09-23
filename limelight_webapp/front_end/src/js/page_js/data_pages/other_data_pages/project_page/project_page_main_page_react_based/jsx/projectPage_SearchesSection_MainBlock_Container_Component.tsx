/**
 * projectPage_SearchesSection_MainBlock_Container_Component.tsx
 *
 * Project Page - "Explore Search Results" section - Main Block Component
 *
 *
 */




import React from "react";

import {
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component,
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force,
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object,
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds,
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_SearchesAndFoldersList_Component";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod,
    projectPage_SearchesSection_Open_DataPages_PeptideProteinMod__Initialize
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesSection_Open_DataPages_PeptideProteinMod";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_SearchesAdmin} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {ProjectPage_SearchesAdmin_DeleteSearch_Overlay_Component__SingleSearchEntry} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesAdmin_DeleteSearch_Overlay_Component";
import {
    Search_Tags_SelectSearchTags_Component,
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry,
    Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import {ProjectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet";
import {ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/project_page_ReactParts_ROOT_Component/projectPage_ROOT_Container_Containing_MultipleSections_Component";
import {Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component";
import {Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage} from "page_js/data_pages/common__search_display_verbose_value_store_session_storage/search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage";
import {Search_Tags_Selections_Object} from "page_js/data_pages/search_tags__display_management/search_Tags_Selections_Object";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/**
 *
 */
export interface ProjectPage_SearchesSection_MainBlock_Component_Props {

    //  force_Rerender_EmptyObjectReference_EmptyObjectReference:  Bypass all shouldComponentUpdate and render current value
    force_Rerender_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    //  force_ReloadFromServer_EmptyObjectReference:  Reload all data from server and display that data.  Display "Loading" message.
    force_ReloadFromServer_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    projectIdentifier : string
    get_searchesSearchTagsFolders_Result_Root__Function: ProjectPage_ROOT_Container_Containing_MultipleSections_Component__Get_searchesSearchTagsFolders_Result_Root__Function
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin

    update_force_ReloadFromServer_EmptyObjectReference_Callback: () => void

    searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class

    update_force_ReRender_EmptyObjectReference_Callback: () => void
}

/**
 *
 */
interface ProjectPage_SearchesSection_MainBlock_Component_State {

    expand_All_Folders__ShowSearchDetailsTo_Global_Force?: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force

    selected_Searches_Data_Object?: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object;  // Pushed up on change from child component

    compareButtonsDisabled? : boolean;
    copy_move_ButtonsDisabled?: boolean

    projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering?: Set<number>   //  null if no filtering
    folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering?: Set<number>          //  null if no filtering

    search_Tags_SelectSearchTags_Component_SearchTagData_Root?: Search_Tags_SelectSearchTags_Component_SearchTagData_Root

    show_LoadingMessage_InitialLoad?: boolean
    show_UpdatingMessage?: boolean

    showNoSearchesMessage_NoSearchesLoadedFromServer?: boolean
    showNoSearchesMessage_NoSearches_AfterPossibleFiltering?: boolean

    show_SearchTag_Categories: boolean

    force_Rerender?: object
}

/**
 *
 */
export class ProjectPage_SearchesSection_MainBlock_Component extends React.Component< ProjectPage_SearchesSection_MainBlock_Component_Props, ProjectPage_SearchesSection_MainBlock_Component_State > {

    private _compare_Scan_File_to_Searches_Clicked_BindThis = this._compare_Scan_File_to_Searches_Clicked.bind(this);
    private _compare_Stats_QC_Clicked_BindThis = this._compare_Stats_QC_Clicked.bind(this);
    private _compare_Peptides_Clicked_BindThis = this._compare_Peptides_Clicked.bind(this);
    private _compare_Proteins_Clicked_BindThis = this._compare_Proteins_Clicked.bind(this);
    private _compare_Mods_Clicked_BindThis = this._compare_Mods_Clicked.bind(this);

    private _copySearches_Clicked_BindThis = this._copySearches_Clicked.bind(this);
    private _deleteSearches_Clicked_BindThis = this._deleteSearches_Clicked.bind(this);
    private _bulk_set_update_TagsOnSearches_BindThis = this._bulk_set_update_TagsOnSearches.bind(this)
    private _manageTagsInProject_BindThis = this._manageTagsInProject.bind(this);
    // private _moveSearches_Clicked_BindThis = this._moveSearches_Clicked.bind(this);
    private _organizeSearchesButton_Clicked_BindThis = this._organizeSearchesButton_Clicked.bind(this);
    private _openFilterOverridesOverlay_Clicked_BindThis = this._openFilterOverridesOverlay_Clicked.bind(this);
    private _expand_All_Button_Clicked_BindThis = this._expand_All_Button_Clicked.bind(this);
    private _collapse_All_Button_Clicked_BindThis = this._collapse_All_Button_Clicked.bind(this);

    private _callback_updateSelected_Searches_BindThis = this._callback_updateSelected_Searches.bind(this);
    private _callback_SearchChanged_BindThis = this._callback_SearchChanged.bind(this);
    private _callback_SearchDeleted_BindThis = this._callback_SearchDeleted.bind(this);
    private _callback_FolderDeleted_BindThis = this._callback_FolderDeleted.bind(this);

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

        const _callback_updateSelected_Searches : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds = this._callback_updateSelected_Searches;
    }

    private _searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root

    private _search_Tags_Selections_Object: Search_Tags_Selections_Object = Search_Tags_Selections_Object.createEmptyInstance()

    private _searchName_SearchId_Filter_UserInput = ""

    private _projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet: ProjectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet

    /**
     *
     */
    constructor(props: ProjectPage_SearchesSection_MainBlock_Component_Props) {
        super(props)

        this._projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet = new ProjectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet({ projectIdentifierFromURL: props.projectIdentifier })
        this._projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.initialize()

        {
            const current__SearchName_SearchId_FilterValue = this._projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.get_current__SearchName_SearchId_FilterValue()
            if ( current__SearchName_SearchId_FilterValue ) {
                this._searchName_SearchId_Filter_UserInput = current__SearchName_SearchId_FilterValue
            }
        }

        const show_SearchTag_Categories = Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.get_Value()

        this.state = {
            selected_Searches_Data_Object: null, // Nothing selected if null
            expand_All_Folders__ShowSearchDetailsTo_Global_Force: null,
            compareButtonsDisabled: true,
            copy_move_ButtonsDisabled: true,
            show_LoadingMessage_InitialLoad: true,
            show_UpdatingMessage: false,
            showNoSearchesMessage_NoSearchesLoadedFromServer: false,
            showNoSearchesMessage_NoSearches_AfterPossibleFiltering: false,
            show_SearchTag_Categories
        }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            projectPage_SearchesSection_Open_DataPages_PeptideProteinMod__Initialize();

            this._searchesAndFolders_GetFromFunctionPassedFromParent()

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    componentDidUpdate(prevProps: Readonly<ProjectPage_SearchesSection_MainBlock_Component_Props>, prevState: Readonly<ProjectPage_SearchesSection_MainBlock_Component_State>, snapshot?: any) {
        if ( prevProps.force_ReloadFromServer_EmptyObjectReference !== this.props.force_ReloadFromServer_EmptyObjectReference ) {
            //  Reload Data

            this._searchesAndFolders_GetFromFunctionPassedFromParent();
        }
    }

    /**
     *
     */
    private _searchesAndFolders_GetFromFunctionPassedFromParent() : void {

        const searchesSearchTagsFolders_Result_Root__Function__Result = this.props.get_searchesSearchTagsFolders_Result_Root__Function({})

        if ( searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root ) {

            this._process_New__searchesSearchTagsFolders_Result_Root({
                searchesSearchTagsFolders_Result_Root: searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root
            })

            return; // EARLY RETURN
        }

        if ( ! searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root_Promise ) {
            throw Error("this.props.get_searchesSearchTagsFolders_Result_Root__Function({}): Not return searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root or searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root_Promise")
        }

        this.setState({ show_UpdatingMessage: true })

        searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root_Promise.catch(reason => {

            this.setState({ show_UpdatingMessage: false, show_LoadingMessage_InitialLoad: false })
        })
        searchesSearchTagsFolders_Result_Root__Function__Result.searchesSearchTagsFolders_Result_Root_Promise.then(searchesSearchTagsFolders_Result_Root => { try {

            this._process_New__searchesSearchTagsFolders_Result_Root({ searchesSearchTagsFolders_Result_Root })
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
     */
    private _process_New__searchesSearchTagsFolders_Result_Root(
        {
            searchesSearchTagsFolders_Result_Root
        } : {
            searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
        }
    ) {
        this._searchesSearchTagsFolders_Result_Root = searchesSearchTagsFolders_Result_Root;

        const searchTagStrings_AllSearches_ArraySorted = Array.from(searchesSearchTagsFolders_Result_Root.get_all_SearchTags_InProject_Iterator());
        searchTagStrings_AllSearches_ArraySorted.sort((a, b) => {
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam( a.tagString, b.tagString )
        })

        {  //   Set Current Search Tag Filters from the stored entries in Browser Session Storage if any exist and for current project id

            const fromSessionStorage_SearchTagIds_Selected = this._projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.get_SearchTagIds_Selected();
            if ( fromSessionStorage_SearchTagIds_Selected ) {

                //   this._searchTag_Filter_SelectedTagIds set to default empty at object instantiation so only continue if have saved values

                //   Then remove filters for tags NOT currently in the list of searches.  Then Set that as the current search tag filters.

                const filterFor_OR_AND_or_NOT = (inputFilterTagIds: ReadonlySet<number>) : Set<number> => {
                    if ( ! inputFilterTagIds ) {
                        return new Set()
                    }

                    const output_Filter_TagIds = new Set( inputFilterTagIds )

                    for ( const searchTagId_Selected_Input of inputFilterTagIds ) {
                        if ( ! searchesSearchTagsFolders_Result_Root.get_SearchTags_InProject_For_TagId( searchTagId_Selected_Input ) ) {
                            output_Filter_TagIds.delete( searchTagId_Selected_Input );
                        }
                    }
                    return output_Filter_TagIds;
                }

                //   Then Set that as the current search tag filters.

                this._search_Tags_Selections_Object = new Search_Tags_Selections_Object({
                    searchTagIdsSelected_Boolean__OR: filterFor_OR_AND_or_NOT(fromSessionStorage_SearchTagIds_Selected.searchTagIdsSelected_Boolean__OR),
                    searchTagIdsSelected_Boolean__AND: filterFor_OR_AND_or_NOT(fromSessionStorage_SearchTagIds_Selected.searchTagIdsSelected_Boolean__AND),
                    searchTagIdsSelected_Boolean__NOT: filterFor_OR_AND_or_NOT(fromSessionStorage_SearchTagIds_Selected.searchTagIdsSelected_Boolean__NOT)
                });
            }

        }

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

        let showNoSearchesMessage_NoSearchesLoadedFromServer = false;

        if ( searchesSearchTagsFolders_Result_Root.is_NO_Searches_In_Project() ) {
            showNoSearchesMessage_NoSearchesLoadedFromServer = true;
        }

        const search_Tags_SelectSearchTags_Component_SearchTagData_Root: Search_Tags_SelectSearchTags_Component_SearchTagData_Root = {
            searchTagCategory_Array: searchTagCategory_Array_Filter_AllEntries, searchTag_Array: searchTagEntries_Filter_AllEntries
        }

        this.setState({
            search_Tags_SelectSearchTags_Component_SearchTagData_Root,
            showNoSearchesMessage_NoSearchesLoadedFromServer,
            show_UpdatingMessage: false,
            show_LoadingMessage_InitialLoad: false
        });

        this._searchesAndFolders_Update_FilterOnSearchTags()

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
     * @param params
     * @private
     */
    private _callback_updateSelected_Searches(params : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds_Params) : void {

        let compareButtonsDisabled = true;
        if ( params.selected_Searches_Data_Object.get_Number_Searches_Selected() > 1 ) {
            compareButtonsDisabled = false;
        }
        let copy_move_organize_ButtonsDisabled = true;
        if ( params.selected_Searches_Data_Object.is_ANY_Search_Selected() ) {
            copy_move_organize_ButtonsDisabled = false;
        }
        this.setState({
            selected_Searches_Data_Object: params.selected_Searches_Data_Object,
            compareButtonsDisabled,
            copy_move_ButtonsDisabled: copy_move_organize_ButtonsDisabled
        });
    }

    /**
     *
     */
    private _callback_SearchChanged() : void {

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
    private _callback_FolderDeleted() : void {

        if ( this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback ) {

            this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback()

            return; // EARLY RETURN
        }

        limelight__ReloadPage_Function() //  Fallback when no callback is available
    }

    /**
     *
     */
    private _compare_Scan_File_to_Searches_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        if ( ! this.state.selected_Searches_Data_Object ) {
            //  NO searches selected
            return; // EARLY RETURN
        }

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.scanFileToSearch_View_OpenDataPage({
            selected_Searches_Data_Object: this.state.selected_Searches_Data_Object,
            searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root,
            ctrlKeyOrMetaKey
        })
    }

    /**
     *
     */
    private _compare_Stats_QC_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        if ( ! this.state.selected_Searches_Data_Object ) {
            //  NO searches selected
            return; // EARLY RETURN
        }

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.qc_View_OpenDataPage({
            selected_Searches_Data_Object: this.state.selected_Searches_Data_Object,
            searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root,
            ctrlKeyOrMetaKey
        })
    }

    /**
     *
     */
    private _compare_Peptides_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        if ( ! this.state.selected_Searches_Data_Object ) {
            //  NO searches selected
            return; // EARLY RETURN
        }

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.peptide_View_OpenDataPage({
            selected_Searches_Data_Object: this.state.selected_Searches_Data_Object,
            searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root,
            ctrlKeyOrMetaKey
        })
    }

    /**
     *
     */
    private _compare_Proteins_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        if ( ! this.state.selected_Searches_Data_Object ) {
            //  NO searches selected
            return; // EARLY RETURN
        }

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.protein_View_OpenDataPage({
            selected_Searches_Data_Object: this.state.selected_Searches_Data_Object,
            searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root,
            ctrlKeyOrMetaKey
        })
    }

    /**
     *
     */
    private _compare_Mods_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        if ( ! this.state.selected_Searches_Data_Object ) {
            //  NO searches selected
            return; // EARLY RETURN
        }

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.mod_View_OpenDataPage({
            selected_Searches_Data_Object: this.state.selected_Searches_Data_Object,
            searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root,
            ctrlKeyOrMetaKey
        })
    }

    /**
     *
     */
    private _copySearches_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        if ( ! this.state.selected_Searches_Data_Object ) {
            //  NO searches selected
            return; // EARLY RETURN
        }

        this.props.projectPage_SearchesAdmin.openOverlay_ForCopySearches({
            projectSearchIdsSelected: new Set( this.state.selected_Searches_Data_Object.get_ProjectSearchIds_Selected_In_SelectionOrder_IterableIterator() ),
            projectIdentifier: this.props.projectIdentifier
        })
    }

    /**
     *
     */
    private _deleteSearches_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        if ( ! this.state.selected_Searches_Data_Object ) {
            //  NO searches selected
            return; // EARLY RETURN
        }

        if ( ! this.state.selected_Searches_Data_Object.is_ANY_Search_Selected() ) {

            // No project search ids found to process

            return; // EARLY RETURN
        }

        const searchesToDelete: Array<ProjectPage_SearchesAdmin_DeleteSearch_Overlay_Component__SingleSearchEntry> = []

        for ( const projectSearchId of  this.state.selected_Searches_Data_Object.get_ProjectSearchIds_Selected_Additions_In_DisplayOrder() ) {

            const searchData = this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId);

            if ( ! searchData ) {
                const msg = "this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }

            searchesToDelete.push( searchData );
        }

        const deleteComplete_Callback = () => {

            //  In Parent component of Search List so after delete searches is complete just reload the page

            limelight__ReloadPage_Function()
        }

        this.props.projectPage_SearchesAdmin.deleteSearches({
            searchesToDelete,
            projectIdentifier: this.props.projectIdentifier,
            deleteComplete_Callback
        })
    }

    /**
     *
     */
    private _bulk_set_update_TagsOnSearches(event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        if ( ! this.state.selected_Searches_Data_Object ) {
            //  NO searches selected
            return; // EARLY RETURN
        }

        if ( ! this.state.selected_Searches_Data_Object.is_ANY_Search_Selected() ) {

            // No project search ids found to process

            return; // EARLY RETURN
        }

        const tagsChangedOnSearches_Callback = () : void => {

            if ( this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback ) {

                this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback()

                return;  // EARLY RETURN
            }

            limelight__ReloadPage_Function()
        }

        this.props.projectPage_SearchesAdmin.openOverlay_For_Search_Tags_Manage_TagsForSearches({
            projectSearchIdsSelected: new Set( this.state.selected_Searches_Data_Object.get_ProjectSearchIds_Selected_In_SelectionOrder_IterableIterator() ),
            tagsChangedOnSearches_Callback
        })
    }

    /**
     *
     */
    private _manageTagsInProject(event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        const tagsChanged_Callback = () : void => {

            if ( this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback ) {

                this.props.update_force_ReloadFromServer_EmptyObjectReference_Callback()

                return;  // EARLY RETURN
            }

            limelight__ReloadPage_Function()
        }

        this.props.projectPage_SearchesAdmin.openOverlay_For_Search_Tags_Manage_TagsForProject({
            projectIdentifier: this.props.projectIdentifier,
            tagsChanged_Callback
        })
    }


    //  MOVE currently not supported so commented out

    /**
     *
     */
    // private _moveSearches_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
    //
    //     this.props.projectPage_SearchesAdmin.openOverlay_ForCopyMoveSearches({
    //         projectSearchIdsSelected: this.state.projectSearchIds_Selected_InProgress,
    //         projectIdentifier: this.props.projectIdentifier,
    //         doCopy: false,
    //         doMove: true
    //     })
    // }

    /**
     *
     */
    private _organizeSearchesButton_Clicked(event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        const url = "d/pg/project-organize-searches/" + this.props.projectIdentifier

        if ( ctrlKeyOrMetaKey ) {

            window.open(url, "_blank", "noopener");

            return; // EARLY EXIT
        }

        window.location.href = url
    }

    /**
     *
     */
    private _openFilterOverridesOverlay_Clicked(event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.props.projectPage_SearchesAdmin.set_ProjectWide_DefaultFilter_Cutoffs_Overrides.openSet_ProjectWide_DefaultFilter_Cutoffs_Overrides();
    }

    /**
     *
     */
    private _expand_All_Button_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.setState({ expand_All_Folders__ShowSearchDetailsTo_Global_Force: { expand_All_Folders__ShowSearchDetails_Global_ForceToValue: true } });
    }


    /**
     *
     */
    private _collapse_All_Button_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.setState({ expand_All_Folders__ShowSearchDetailsTo_Global_Force: { expand_All_Folders__ShowSearchDetails_Global_ForceToValue: false } });
    }

    /**
     *
     */
    render() {

        return (
            ( ! this._searchesSearchTagsFolders_Result_Root ) ? (
                <div>Loading Searches</div>

            ) : (
                <div>
                    { ( ! this.state.showNoSearchesMessage_NoSearches_AfterPossibleFiltering ) ? (

                        <div style={ { marginBottom: 10, whiteSpace: "nowrap" } }>

                            {/*  Expand All and Collapse All Buttons  */}

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Show Search Details for All Searches.
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
                                        Hide Search Details for All Searches.
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <input className="submit-button " type="button"
                                       value="Collapse All"
                                       onClick={ this._collapse_All_Button_Clicked_BindThis }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                            {/*  Only For Logged In User  */}
                            { ( this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails ) ? (

                                <>
                                    { ( this.props.projectPage_SearchesAdmin ) ? (

                                        // Show since projectPage_SearchesAdmin is populated

                                        <React.Fragment>

                                            <span> </span>

                                            {/*  Copy Searches */}

                                            <div style={ { position: "relative", display: "inline-block" } }>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                                        <span>
                                                            Click here to copy the selected searches to another project.
                                                        </span>
                                                    }
                                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                >
                                                    <input type="button" value="Copy Searches"
                                                           disabled={ this.state.copy_move_ButtonsDisabled }
                                                           onClick={ this._copySearches_Clicked_BindThis }
                                                    />
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                                { ( this.state.copy_move_ButtonsDisabled ) ? (
                                                    // overlay when button is disabled to show tooltip
                                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                        title={
                                                            <span>
                                                                Click here to copy the selected searches to another project.
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

                                            <span> </span>

                                            {/*  Delete Searches */}

                                            <div style={ { position: "relative", display: "inline-block" } }>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                                        <span>
                                                            Click here to delete the selected searches.
                                                        </span>
                                                    }
                                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                >
                                                    <input type="button" value="Delete Searches"
                                                           disabled={ this.state.copy_move_ButtonsDisabled }
                                                           onClick={ this._deleteSearches_Clicked_BindThis }
                                                    />
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                                { ( this.state.copy_move_ButtonsDisabled ) ? (
                                                    // overlay when button is disabled to show tooltip
                                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                        title={
                                                            <span>
                                                                Click here to delete the selected searches.
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

                                            <span> </span>

                                            {/*  Bulk set/update tags on Searches */}

                                            <div style={ { position: "relative", display: "inline-block" } }>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                                        <span>
                                                            Click here to add/remove tags on the selected searches.
                                                        </span>
                                                    }
                                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                >
                                                    <input type="button" value="Tag Searches"
                                                           disabled={ this.state.copy_move_ButtonsDisabled }
                                                           onClick={ this._bulk_set_update_TagsOnSearches_BindThis }
                                                    />
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                                { ( this.state.copy_move_ButtonsDisabled ) ? (
                                                    // overlay when button is disabled to show tooltip
                                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                            title={
                                                                <span>
                                                                    Click here to add/remove tags on the selected searches.
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

                                            <span> </span>

                                            {/*  Manage ALL Tags in Project  */}

                                            <div style={ { position: "relative", display: "inline-block" } }>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                                        <span>
                                                            Click here to manage tags on the project.
                                                        </span>
                                                    }
                                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                >
                                                <input type="button" value="Manage Tags"
                                                       onClick={ this._manageTagsInProject_BindThis }
                                                />
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                            </div>

                                            <span> </span>

                                            {/*  Move Searches */}
                                            {/*

                                        NO Longer support "Move Searches


                                    <div style={ { position: "relative", display: "inline-block" } }>
                                        <input type="button" value="Move Searches"
                                               disabled={ this.state.copy_move_ButtonsDisabled }
                                               onClick={ this._moveSearches_Clicked_BindThis }
                                        />
                                        { ( this.state.copy_move_ButtonsDisabled ) ? (
                                            // overlay when button is disabled to show tooltip
                                            <div
                                                style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                                title="Click here to copy the selected searches to another project."
                                            ></div>
                                        ): null }
                                    </div>

                                    <span> </span>

                                    */}

                                            {/*  Organize Searches */}
                                            <div style={ { position: "relative", display: "inline-block" } }>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                                        <span>
                                                            CTRL-click or Command-click to open in new tab
                                                        </span>
                                                    }
                                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                >
                                                    <input
                                                        type="button"
                                                        value="Organize Searches"
                                                        onClick={ this._organizeSearchesButton_Clicked_BindThis }
                                                    />
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                            </div>

                                            <span> </span>

                                            {/*  Open Set Filter Overrides Overlay  */}
                                            <div style={ { position: "relative", display: "inline-block" } }>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                                        <span>
                                                            Click here to set custom cutoffs for all searches..
                                                        </span>
                                                    }
                                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                >
                                                    <input type="button" value="Filter Overrides"
                                                           onClick={ this._openFilterOverridesOverlay_Clicked_BindThis }
                                                    />
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                            </div>

                                        </React.Fragment>
                                    ): null }
                                </>

                            ): null }
                        </div>

                    ): null }

                    {/*  Filter Searches on User Input */}

                    <div style={ { marginBottom: 10 } }>

                        { ( ! this.state.showNoSearchesMessage_NoSearchesLoadedFromServer ) ? (

                                <div style={ { marginBottom: 10 } }>
                                     <span
                                         style={ { whiteSpace: "nowrap", fontWeight: "bold", fontSize: 18 } }
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

                        ) : null }

                        {/*  Filter Searches: User Input: Filter On search name, search id, and search tags  */}

                        { ( ! this.state.showNoSearchesMessage_NoSearchesLoadedFromServer ) ? (

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

                                        this._projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.
                                        update_SearchName_SearchId_FilterValue({ updated_SearchName_SearchId_FilterValue: this._searchName_SearchId_Filter_UserInput })
                                    }}
                                />
                            </div>
                        ) : null }

                        { this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root && this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root.searchTag_Array.length > 0 ? (

                            <div
                                style={ { display: "grid", gridTemplateColumns: "min-content auto", marginTop: 3 } }
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

                                            this._projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.
                                            update_SearchTagIds_Selected({ updated_SearchTagIds_Selected: this._search_Tags_Selections_Object })
                                        } }
                                    />

                                </div>

                            </div>

                        ) : null }

                        {/*  Display "Filtering On" to show what search name, search id, and search tags filtering on  */}

                        { this._searchName_SearchId_Filter_UserInput.length > 0 || this._search_Tags_Selections_Object.is_any_selections() ? (

                            <div
                                className=" filter-on-tags--currently-filtering "
                                style={ { marginBottom: 15 } }
                            >
                                { this._searchName_SearchId_Filter_UserInput.length > 0 ? (  //  User Input value
                                    <div  //  Add marginBottom if also have Search Tags to display
                                        style={ { marginTop: 7, marginBottom : this._search_Tags_Selections_Object.is_any_selections() ? 5 : null } }
                                    >
                                        <span
                                            style={ { fontWeight: "bold", fontSize: 18, whiteSpace: "nowrap" } }
                                        >Filtering on text: </span>
                                        <span>
                                            { this._searchName_SearchId_Filter_UserInput }
                                        </span>
                                        <span> </span>
                                        <span
                                            className=" fake-link "
                                            style={ { fontSize: 10 } }
                                            title="Clear text filters"
                                            onClick={ event => {

                                                this._searchName_SearchId_Filter_UserInput = "";

                                                this._searchesAndFolders_Update_FilterOnSearchTags()

                                                this.setState({ force_Rerender: {} })

                                                this._projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.
                                                update_SearchName_SearchId_FilterValue({ updated_SearchName_SearchId_FilterValue: this._searchName_SearchId_Filter_UserInput })
                                            }}
                                        >
                                            clear
                                        </span>
                                    </div>
                                ) : null }

                                { this._search_Tags_Selections_Object.is_any_selections() ? (

                                    <div
                                        style={ { display: "grid", gridTemplateColumns: "min-content 1fr" } }
                                    >
                                        <div>
                                            <div>
                                                <span style={ { fontSize: 18, fontWeight: "bold", whiteSpace: "nowrap", marginRight: 5 }}
                                                >
                                                    Filtering on tags:
                                                </span>
                                            </div>
                                            <div style={ { fontSize: 10, marginBottom: 10 } }>
                                                <span
                                                    className=" fake-link "
                                                    style={ { fontSize: 10 } }
                                                    title="Clear tag filters"
                                                    onClick={ () => {

                                                        this._search_Tags_Selections_Object = Search_Tags_Selections_Object.createEmptyInstance()

                                                        this._searchesAndFolders_Update_FilterOnSearchTags()

                                                        this.setState({ force_Rerender: {} })

                                                        this._projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.
                                                        update_SearchTagIds_Selected({ updated_SearchTagIds_Selected: this._search_Tags_Selections_Object })
                                                    } }
                                                >
                                                    clear
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component
                                                searchTagData_Root={ this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                                                search_Tags_Selections_Object={ this._search_Tags_Selections_Object }
                                                clearSelection_Callback={ () => {

                                                    this._search_Tags_Selections_Object = Search_Tags_Selections_Object.createEmptyInstance()

                                                    this._searchesAndFolders_Update_FilterOnSearchTags()

                                                    this.setState({ force_Rerender: {} })

                                                    this._projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet.
                                                    update_SearchTagIds_Selected({ updated_SearchTagIds_Selected: this._search_Tags_Selections_Object })
                                                } }
                                            />
                                        </div>
                                    </div>
                                ) : null }
                            </div>
                        ) : null }
                    </div>

                    { ( this.state.showNoSearchesMessage_NoSearchesLoadedFromServer ) ? (

                        <div style={ { marginBottom: 20 } }>
                            No searches in this project.
                        </div>

                    ) : ( this.state.showNoSearchesMessage_NoSearches_AfterPossibleFiltering ) ? (

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

                    ) : (
                        <React.Fragment>

                            <ProjectPage_SearchesSection_SearchesAndFoldersList_Component
                                projectIdentifier={ this.props.projectIdentifier }
                                force_Rerender_EmptyObjectReference={ this.props.force_Rerender_EmptyObjectReference }
                                force_ReloadFromServer_EmptyObjectReference={ this.props.force_ReloadFromServer_EmptyObjectReference }

                                show_SearchTag_Categories={ this.state.show_SearchTag_Categories }
                                searchesSearchTagsFolders_Result_Root={ this._searchesSearchTagsFolders_Result_Root }
                                search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root={ this.state.search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                                projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering={ this.state.projectSearchIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering }   //  null if no filtering
                                folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering={ this.state.folderIds_ToDisplay_FilteredIfNeeded__Null_IfNoFiltering }          //  null if no filtering
                                expand_All_Folders__ShowSearchDetailsTo_Global_Force={ this.state.expand_All_Folders__ShowSearchDetailsTo_Global_Force }
                                dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails}
                                projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                                callback_updateSelected_Searches={ this._callback_updateSelected_Searches_BindThis }
                                projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet={ this._projectPage_SearchesSection_ROOT_Container_SessionStorage_SaveGet }
                                callback_SearchChanged={ this._callback_SearchChanged_BindThis }
                                callback_SearchDeleted={ this._callback_SearchDeleted_BindThis }
                                callback_FolderDeleted={ this._callback_FolderDeleted_BindThis }

                                searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject={ this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject  }
                                update_force_ReRender_EmptyObjectReference_Callback={ this.props.update_force_ReRender_EmptyObjectReference_Callback }
                            />

                            <div style={ { marginBottom: 10, whiteSpace: "nowrap" } }>

                                {/*  compare Scan File To Searches */}
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <input type="button" value="Compare by Scans"
                                           disabled={ this.state.compareButtonsDisabled }
                                           onClick={ this._compare_Scan_File_to_Searches_Clicked_BindThis }
                                    />
                                    { ( this.state.compareButtonsDisabled ) ? (
                                        // overlay when button is disabled to show tooltip
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Select 2 or more searches to compare searches
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

                                <span > </span>

                                {/*  compare QC */}
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <input type="button" value="Compare Stats/QC View"
                                           disabled={ this.state.compareButtonsDisabled }
                                           onClick={ this._compare_Stats_QC_Clicked_BindThis }
                                    />
                                    { ( this.state.compareButtonsDisabled ) ? (
                                        // overlay when button is disabled to show tooltip
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Select 2 or more searches to compare searches
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

                                <span > </span>

                                {/*  compare peptide */}
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <input type="button" value="Compare Peptide View"
                                           disabled={ this.state.compareButtonsDisabled }
                                           onClick={ this._compare_Peptides_Clicked_BindThis }
                                    />
                                    { ( this.state.compareButtonsDisabled ) ? (
                                        // overlay when button is disabled to show tooltip
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Select 2 or more searches to compare searches
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

                                <span > </span>

                                {/*  compare Protein */}
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <input type="button" value="Compare Protein View"
                                           disabled={ this.state.compareButtonsDisabled }
                                           onClick={ this._compare_Proteins_Clicked_BindThis }
                                    />
                                    { ( this.state.compareButtonsDisabled ) ? (
                                        // overlay when button is disabled to show tooltip
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Select 2 or more searches to compare searches
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

                                <span > </span>

                                {/*  compare Mod */}
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <input type="button" value="Compare Mod View"
                                           disabled={ this.state.compareButtonsDisabled }
                                           onClick={ this._compare_Mods_Clicked_BindThis }
                                    />
                                    { ( this.state.compareButtonsDisabled ) ? (
                                        // overlay when button is disabled to show tooltip
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Select 2 or more searches to compare searches
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
                            </div>
                        </React.Fragment>
                    )}
                </div>
            )
        );
    }

}
