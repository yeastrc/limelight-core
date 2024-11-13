/**
 * project_OrganizeSearches__Folder_Add_Change_SearchesInFolder_OverlayComponent.tsx
 *
 * Re-Order Searches  Overlay - For Add Folder AND Changing the searches in the folder
 *
 *
 */

import React from 'react'

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    Search_Tags_SelectSearchTags_Component,
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry,
    Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";
import {
    Search_Tags_DisplaySearchTags_UnderSearchName_Component,
    Search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root
} from "page_js/data_pages/search_tags__display_management/search_tags__display_under_search_name/search_Tags_DisplaySearchTags_UnderSearchName_Component";
import {Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component";
import {Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage} from "page_js/data_pages/common__search_display_verbose_value_store_session_storage/search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage";
import {Search_Tags_Selections_Object} from "page_js/data_pages/search_tags__display_management/search_Tags_Selections_Object";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/////

const _Overlay_Title_Add_Folder = "Add folder"

const _Overlay_Title_Add_Searches = "Manage the searches in the folder"

const _Overlay_Title_Change_Searches = "Manage the searches in the folder"

const _Overlay_Width_Min = 500;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 1000;

//////

/**
 *
 */
export type Project_OrganizeSearches_Folder_Change_SearchesInFolder_OverlayComponent__Callback_update_SearchesInFolder =
    () => void

/**
 *
 */
export const open_Project_OrganizeSearches_Folder_Add_Change_SearchesInFolder_Overlay = function(
    params : {
        projectIdentifier: string // For Add Folder
        folderId: number; //  NOT populated for "Add Folder"
        folderName_Added_Or_Existing: string //  NOT populated for "Add Folder"
        projectSearchIds_InFolder_Existing: Set<number>
        searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_update_SearchesInFolder : () => void

    }) : void {


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.callback_update_SearchesInFolder();
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.callbackOn_Cancel_Close_Clicked()
    }


    const overlayComponent = (
        <Project_OrganizeSearches_Folder_Change_SearchesInFolder_OverlayComponent
            projectIdentifier={ params.projectIdentifier }
            folderId={ params.folderId }
            folderName_Added_Or_Existing={ params.folderName_Added_Or_Existing }
            projectSearchIds_InFolder_Existing={ params.projectSearchIds_InFolder_Existing }
            searchesSearchTagsFolders_Result_Root={ params.searchesSearchTagsFolders_Result_Root }
            callbackOn_Cancel_Close_Clicked={ cancel_Callback_Local }
            callback_update_SearchesInFolder_Complete={ change_Callback_Local }
        />
    )

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}

/////

////  React Components

/**
 *
 */
interface Project_OrganizeSearches_Folder_Change_SearchesInFolder_OverlayComponent_Props {
    projectIdentifier: string // For Add Folder
    folderId: number; //  NOT populated for "Add Folder"
    folderName_Added_Or_Existing: string //  NOT populated for "Add Folder"
    projectSearchIds_InFolder_Existing: Set<number>
    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_update_SearchesInFolder_Complete : () => void
}

/**
 *
 */
interface Project_OrganizeSearches_Folder_Change_SearchesInFolder_OverlayComponent_State {

    show_Saving_Message?: boolean
    show_SearchTag_Categories?: boolean
    force_Rerender?: object
}

/**
 *
 */
class Project_OrganizeSearches_Folder_Change_SearchesInFolder_OverlayComponent extends React.Component< Project_OrganizeSearches_Folder_Change_SearchesInFolder_OverlayComponent_Props, Project_OrganizeSearches_Folder_Change_SearchesInFolder_OverlayComponent_State > {

    private _cancel_Close_Clicked_BindThis = this._cancel_Close_Clicked.bind(this)
    private _addFolder_formSubmit_BindThis = this._addFolder_formSubmit.bind(this)
    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);

    private _folderName_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _folderId: number
    private _folderName_Added_Or_Existing: string

    private _project_Has_Searches: boolean

    private _add_Folder: boolean
    private _add_Folder_When_Overlay_Opened: boolean

    private _folderWasAdded: boolean = false;

    private _search_Tags_Selections_Object: Search_Tags_Selections_Object = Search_Tags_Selections_Object.createEmptyInstance()

    // private _always_show_selected_searches = false

    private _searchName_SearchId_Filter_UserInput = ""

    private _projectSearchIds_ForSearchesPassFilter: Set<number>

    private _projectSearchIds_InFolder_InProgress: Set<number>

    private _search_Tags_SelectSearchTags_Component_SearchTagData_Root: Search_Tags_SelectSearchTags_Component_SearchTagData_Root


    /**
     *
     */
    constructor(props: Project_OrganizeSearches_Folder_Change_SearchesInFolder_OverlayComponent_Props) {
        super(props);

        this._folderName_Input_Ref = React.createRef<HTMLInputElement>();

        this._folderId = this.props.folderId
        this._folderName_Added_Or_Existing = this.props.folderName_Added_Or_Existing

        this._add_Folder = false;

        if ( this.props.folderId === undefined || this.props.folderId === null ) {
            this._add_Folder = true
            this._add_Folder_When_Overlay_Opened = true;
        }

        this._projectSearchIds_ForSearchesPassFilter = new Set( this.props.searchesSearchTagsFolders_Result_Root.get_all_Searches_ProjectSearchIds_Set() )

        this._projectSearchIds_InFolder_InProgress = new Set( this.props.projectSearchIds_InFolder_Existing );

        this._project_Has_Searches = ! props.searchesSearchTagsFolders_Result_Root.is_NO_Searches_In_Project();

        {

            const searchTagStrings_AllSearches_ArraySorted = Array.from(props.searchesSearchTagsFolders_Result_Root.get_all_SearchTags_InProject_Iterator());
            searchTagStrings_AllSearches_ArraySorted.sort((a, b) => {
                return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam( a.tagString, b.tagString )
            })

            const searchTagCategory_Array_Filter_AllEntries: Array<Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry> = []

            for ( const category_input of props.searchesSearchTagsFolders_Result_Root.get_all_SearchTagCategories_InProject_In_DisplayOrder() ) {
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

            this._search_Tags_SelectSearchTags_Component_SearchTagData_Root = search_Tags_SelectSearchTags_Component_SearchTagData_Root;
        }

        const show_SearchTag_Categories = Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.get_Value()

        this.state = { show_SearchTag_Categories, force_Rerender : {} };
    }

    /**
     *
     */
    private _cancel_Close_Clicked() {

        if ( this._folderWasAdded ) {

            this.props.callback_update_SearchesInFolder_Complete()

            return; // EARLY RETURN
        }

        this.props.callbackOn_Cancel_Close_Clicked()
    }


    /**
     *
     */
    private _addFolder_formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            if ( ( ! this._folderName_Input_Ref ) || ( ! this._folderName_Input_Ref.current ) ) {
                //  No access to <input> ref
                return; // EARLY RETURN
            }

            const folderName_Value = this._folderName_Input_Ref.current.value.trim();

            if ( folderName_Value.length === 0 ) {

                this.setState({ force_Rerender: {} });
                return; // EARLY EXIT
            }

            this._folderWasAdded = true;

            this.setState({ show_Saving_Message: true });

            let requestObj = {
                projectIdentifier: this.props.projectIdentifier,  // current project
                folderName: folderName_Value
            };

            const url = "d/rws/for-page/project-organize-searches-add-folder";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => {  }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( ! responseData.status ) {
                        limelight__ReloadPage_Function()
                        return;
                    }

                    this._folderId = responseData.folderId;

                    this._folderName_Added_Or_Existing = folderName_Value;

                    this._add_Folder = false;

                    this.setState({ show_Saving_Message: false })

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _searchesAndFolders_Update_FilterOnSearchTags() : void {

        if ( this._searchName_SearchId_Filter_UserInput.length === 0 &&
            ( ! this._search_Tags_Selections_Object.is_any_selections() ) ) {

            this._projectSearchIds_ForSearchesPassFilter = new Set( this.props.searchesSearchTagsFolders_Result_Root.get_all_Searches_ProjectSearchIds_Set() )
        }

        this._projectSearchIds_ForSearchesPassFilter = new Set()

        for (const projectSearchId of this.props.searchesSearchTagsFolders_Result_Root.get_all_Searches_ProjectSearchIds_Set() ) {

            const searchEntry = this.props.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId);

            if (!searchEntry) {
                const msg = "this.props.allSearches_Map_Key_ProjectSearchId.get( projectSearchId ); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            let foundAllFilteringOn = true;

            //   Filter on Search Name

            if ( this._searchName_SearchId_Filter_UserInput.length > 0 ) {
                if ( ( ! searchEntry.searchName.toLocaleLowerCase().includes( this._searchName_SearchId_Filter_UserInput.toLocaleLowerCase() ) )
                    && ( ! searchEntry.searchId.toString().includes( this._searchName_SearchId_Filter_UserInput ) ) ) {

                    foundAllFilteringOn = false;
                }
            }

            if ( foundAllFilteringOn ) {

                //  Filter on Search Tags

                {  //  Filter on the 'AND' filters
                    if ( this._search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND.size > 0 ) {
                        for ( const filterOn_SelectedTagId of this._search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND ) {
                            if ( ! searchEntry.searchTagIds_Set.has( filterOn_SelectedTagId ) ) {
                                foundAllFilteringOn = false
                                break;
                            }
                        }
                    }
                }
                if ( foundAllFilteringOn ) { //  Filter on the 'NOT' filters
                    if ( this._search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT.size > 0 ) {
                        for ( const filterOn_SelectedTagId of this._search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT ) {
                            if ( searchEntry.searchTagIds_Set.has( filterOn_SelectedTagId ) ) {
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
                            if ( searchEntry.searchTagIds_Set.has( filterOn_SelectedTagId ) ) {
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

                this._projectSearchIds_ForSearchesPassFilter.add( projectSearchId )
            }
        }
    }

    /**
     *
     */
    private _updateButtonClicked(  ) {

        this.setState({ show_Saving_Message: true })

        const projectSearchIdList_New: Array<number> = Array.from( this._projectSearchIds_InFolder_InProgress )

        const promise = _changeFolder_UpdateTo_NEW_SearchesInDB({ folderId : this._folderId, projectSearchIdList_New })
        promise.catch(reason => { })
        promise.then(value => { try {

            this.props.callback_update_SearchesInFolder_Complete()

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    render(): React.ReactNode {

        const searchDisplayList : Array<JSX.Element> = [];

        if ( ! this._add_Folder ) {

            let index = 0

            const search_Array_In_SearchId_Descending_Order: Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data> = []

            for (const projectSearchId of this._projectSearchIds_ForSearchesPassFilter ) {

                const searchEntry = this.props.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId);

                if (!searchEntry) {
                    const msg = "this.props.allSearches_Map_Key_ProjectSearchId.get( projectSearchId ); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                search_Array_In_SearchId_Descending_Order.push( searchEntry );
            }

            // SearchId_Descending_Order
            search_Array_In_SearchId_Descending_Order.sort( (a,b) => {
               if ( a.searchId > b.searchId ) {
                   return -1;
               }
                if ( a.searchId < b.searchId ) {
                    return 1;
                }
                return 0;
            })

            for ( const searchEntry of search_Array_In_SearchId_Descending_Order ) {

                const callbackOn_entry_Clicked = ( projectSearchId : number ) : void => {

                    if ( this._projectSearchIds_InFolder_InProgress.has( projectSearchId ) ) {
                        this._projectSearchIds_InFolder_InProgress.delete( projectSearchId )
                    } else {
                        this._projectSearchIds_InFolder_InProgress.add( projectSearchId )
                    }

                    this.setState({ force_Rerender: {} })
                };

                const selected = this._projectSearchIds_InFolder_InProgress.has( searchEntry.projectSearchId );

                const showSeparatorBelow = index !== this.props.searchesSearchTagsFolders_Result_Root.get_all_Searches_ProjectSearchIds_Set().size - 1


                const searchDisplayListEntry = (
                    <SearchEntryComponent
                        key={searchEntry.projectSearchId}
                        searchDisplayListItem={searchEntry}
                        searchesSearchTagsFolders_Result_Root={ this.props.searchesSearchTagsFolders_Result_Root }
                        selected={selected}
                        show_SearchTag_Categories={ this.state.show_SearchTag_Categories }
                        showSeparatorBelow={showSeparatorBelow}
                        search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root={ this._search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                        callbackOn_entry_Clicked={ callbackOn_entry_Clicked }
                    />
                )
                searchDisplayList.push(searchDisplayListEntry);

                index++;
            }
        }

        let saveButton_Disabled = true;
        if (this._folderName_Input_Ref && this._folderName_Input_Ref.current && this._folderName_Input_Ref.current.value !== "") {
            saveButton_Disabled = false;
        }

        let overlay_Title = _Overlay_Title_Change_Searches

        if ( this._add_Folder_When_Overlay_Opened ) {
            overlay_Title = _Overlay_Title_Add_Searches
        }

        if ( this._add_Folder ) {
            overlay_Title = _Overlay_Title_Add_Folder
        }

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                set_CSS_Position_Fixed={ true }
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ overlay_Title }
                callbackOnClicked_Close={ this._cancel_Close_Clicked_BindThis }
                close_OnBackgroundClick={ false }>

                { this.state.show_Saving_Message ? (

                    <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                        // style={ { padding : 6 } }
                    >
                        <div>
                            Saving data...
                        </div>
                        <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                            <Spinner_Limelight_Component/>
                        </div>
                    </div>

                ) : this._add_Folder ? (

                    <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { overflowY: "auto", overflowX: "hidden" } }
                        // style={ { padding : 6 } }
                    >
                        <div>
                            Enter a folder name and click "Add"
                        </div>

                        <form
                            onSubmit={ this._addFolder_formSubmit_BindThis }
                        >
                            <div>
                            <span>
                                Folder Name:&nbsp;
                            </span>
                                <span>
                                <input type="text"
                                       style={ { width: 350 } }
                                       maxLength={ 400 }
                                       autoFocus={ true }
                                       ref={ this._folderName_Input_Ref }
                                       defaultValue={ "" }
                                       onChange={ event => {
                                           this.setState({ force_Rerender: {} })
                                       } }
                                />
                            </span>
                            </div>

                            <div style={ { marginTop: 5 }}>
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <button type="submit"
                                            disabled={ saveButton_Disabled }
                                    >
                                        <span>Add</span>
                                    </button>
                                    { ( saveButton_Disabled ) ? (
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                "Enter an folder name to enable 'Add'"
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <div
                                                style={ { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 } }
                                            >
                                            </div>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    ) : null }
                                </div>
                                <span > </span>
                                <button
                                    onClick={ ( event) => {
                                        this._cancel_Close_Clicked()
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                ) : (
                    <>
                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                            style={ { paddingBottom : 20 } }
                        >
                            <div style={ { fontSize: 18, paddingBottom : 10 } }>
                                <span>Select searches to include in folder: </span>
                                <span style={ { fontWeight: "bold" } }>
                                    { this._folderName_Added_Or_Existing }
                                </span>
                            </div>
                            <div>
                                When Finished, click "Change" to save or click "Cancel" to close with no changes.
                            </div>
                        </div>

                        <div className=" change-searches-overlay-outer-block top-level single-entry-variable-height  modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                             style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                            // style={ { padding : 6 } }
                        >
                            <div style={ { marginBottom: 10 } }>
                                 <span
                                     style={ { whiteSpace: "nowrap", fontWeight: "bold", fontSize: 18 } }
                                 >Verbose view: </span>
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

                            { this._search_Tags_SelectSearchTags_Component_SearchTagData_Root.searchTag_Array.length > 0 ? (

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
                                            searchTagData_Root={ this._search_Tags_SelectSearchTags_Component_SearchTagData_Root }
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
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    <span>
                                                        Clear text filters
                                                    </span>
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

                                    { this._search_Tags_Selections_Object.is_any_selections() ? (

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
                                                            <span>
                                                                Clear tag filters
                                                            </span>
                                                        }
                                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                    >
                                                        <span
                                                            className=" fake-link "
                                                            style={ { fontSize: 10 } }
                                                            onClick={ () => {

                                                                this._search_Tags_Selections_Object = Search_Tags_Selections_Object.createEmptyInstance()

                                                                this._searchesAndFolders_Update_FilterOnSearchTags()

                                                                this.setState({ force_Rerender: {} })
                                                            } }
                                                        >
                                                            clear
                                                        </span>
                                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                                </div>

                                            </div>
                                            <div>
                                                <Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component
                                                    searchTagData_Root={ this._search_Tags_SelectSearchTags_Component_SearchTagData_Root }
                                                    search_Tags_Selections_Object={ this._search_Tags_Selections_Object }
                                                    clearSelection_Callback={ () => {

                                                        this._search_Tags_Selections_Object = Search_Tags_Selections_Object.createEmptyInstance()

                                                        this._searchesAndFolders_Update_FilterOnSearchTags()

                                                        this.setState({ force_Rerender: {} })
                                                    } }
                                                />
                                            </div>
                                        </div>
                                    ) : null }
                                </div>
                            ) : null }

                            { ( searchDisplayList.length === 0 ) ? (

                                <div style={ { marginBottom: 20, marginTop: 20 } }>

                                    <span>
                                        No searches in this project match current filters.
                                    </span>

                                    {/*  Message broken out by what filtering on

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

                            <div
                                // style={ { padding : 6 } }
                            >
                                <div style={ { fontSize: 18, fontWeight: "bold" } }>
                                    Searches:
                                </div>

                                <div
                                    className=" searches-container "
                                >
                                    { searchDisplayList  /* Entries in the list */ }
                                </div>
                            </div>
                        </div>

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                            // style={ { padding : 6 } }
                        >

                            <div style={ { marginTop: 15 } }>
                                <input type="button" value="Change" style={ { marginRight: 5 } } onClick={ this._updateButtonClicked_BindThis } />

                                <input type="button" value="Cancel" onClick={ this._cancel_Close_Clicked_BindThis } />
                            </div>
                        </div>
                    </>
                )}
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}

/////

//  Single Search Entry

/**
 *
 */
interface SearchEntry_Props {
    searchDisplayListItem : CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
    selected : boolean
    show_SearchTag_Categories: boolean
    showSeparatorBelow : boolean
    search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root: Search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root
    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    callbackOn_entry_Clicked : ( projectSearchId : number ) => void;
}

/**
 *
 */
interface SearchEntry_State {
    _placeholder?: unknown
}

/**
 *
 */
class SearchEntryComponent extends React.Component< SearchEntry_Props, SearchEntry_State > {

    private _searchRowClicked_BindThis = this._searchRowClicked.bind(this);

    /**
     *
     */
    constructor(props: SearchEntry_Props) {
        super(props);
    }

    /**
     *
     */
    private _searchRowClicked( event: React.MouseEvent<HTMLDivElement> ): void {

        this.props.callbackOn_entry_Clicked( this.props.searchDisplayListItem.projectSearchId );
    }

    /**
     *
     */
    render(): React.ReactNode {

        let selectedClass = ""

        if ( this.props.selected ) {
            selectedClass = " search-entry-container-selected "
        }

        const cssClasses = " search-entry-container clickable ";

        const searchNameDisplay = "(" + this.props.searchDisplayListItem.searchId + ") " + this.props.searchDisplayListItem.searchName;

        let searchTagsBlock: JSX.Element = null

        { //  Search Tags

            const add_Change_SearchTags_Clicked_BindThis: () => void = null

            searchTagsBlock = (
                <div>
                    <Search_Tags_DisplaySearchTags_UnderSearchName_Component
                        searchTagIds_OnSearch_Set={ this.props.searchDisplayListItem.searchTagIds_Set }
                        searchTagData_Root={ this.props.search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root  }
                        show_SearchTag_Categories={ this.props.show_SearchTag_Categories }
                        addTag_Clicked_Callback={ add_Change_SearchTags_Clicked_BindThis }
                        changeTags_Clicked_Callback={ add_Change_SearchTags_Clicked_BindThis }
                    />
                </div>
            )
        }

        return (
            <React.Fragment>
                <div onClick={ this._searchRowClicked_BindThis }
                     className={ cssClasses }
                     style={ { display: "grid", gridTemplateColumns: "min-content auto" } }>

                    {/*  2 Column Grid  */}
                    <div style={ { marginRight: 8 } }>
                        <input type="checkbox" checked={ this.props.selected } onChange={ () => { /* nothing since have click handler on containing row div */ } } />
                    </div>
                    <div >
                        <div style={ { marginBottom: 2 } }>
                            <span
                                className={ selectedClass }
                                style={ { overflowWrap : "break-word"}}
                            >
                                { searchNameDisplay }
                            </span>
                        </div>
                        { searchTagsBlock }
                    </div>

                </div>

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








/**
 *
 */
const _changeFolder_UpdateTo_NEW_SearchesInDB = function(
    {
        folderId, projectSearchIdList_New
    } : {
        folderId: number;
        projectSearchIdList_New: Array<number>;
    }
) : Promise<void> {
    try {
        let requestObj = {
            folderId, projectSearchIdList_New
        };

        const url = "d/rws/for-page/project-organize-searches-folder-update-to-new-searches";

        return new Promise<void>((resolve, reject) => { try {

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( ! responseData.status ) {
                        limelight__ReloadPage_Function()
                        return;
                    }

                    resolve()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }
}


