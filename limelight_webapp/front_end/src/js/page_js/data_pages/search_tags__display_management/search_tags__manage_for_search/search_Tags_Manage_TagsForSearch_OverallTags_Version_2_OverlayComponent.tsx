/**
 * search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Version_2_OverlayComponent.tsx
 *
 * Search Tags Manage Tags On Searches Overlay - Version 2
 *
 *
 */

import React from 'react'
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    retrieveSearchNamesFromServer,RetrieveSearchNamesFromServer_Result_SingleSearch
} from "page_js/data_pages/data_pages_common/searchNameRetrieval";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {
    Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result,
    Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleProjectSearchId,
    searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId
} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_search/searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId";
import {
    searchTagCategories__Get_For_ProjectId_Or_ProjectIdFromProjectSearchIds,
    SearchTagCategories__Get_For_ProjectId_Result, SearchTagCategories__Get_For_ProjectId_ResultItem_SingleTagCategory
} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_project/search_tag_categories___get__for__project_id__or__project_id_from_project_search_ids";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";

/////

const _Overlay_Title_Start = "Select/Add Tags to Search"


const _Overlay_Width_Min = 450;
const _Overlay_Width_Max = 1100;
const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 800;



//////


export class Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_MainParams {

    searches: Array<Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch>
    tagsChangedOnSearches_Callback: () => void
}

export class Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch {

    projectSearchId: number

    //  Remove since do NOT have this data in the calling code

    // searchId: number
    // searchName: string
}

/**
 *
 */
export const open_Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Overlay = function(
    {
        mainParams
    } : {
        mainParams: Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_MainParams
    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Close = () : void => {

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent = get_Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Overlay_Layout({
        mainParams,
        callbackOn_Close
    })

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}


/**
 *
 */
const get_Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Overlay_Layout = function(
    {
        mainParams,
        // callback_TagsUpdated,
        callbackOn_Close
    } : {
        mainParams: Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_MainParams
        // callback_TagsUpdated : () => void;
        callbackOn_Close : () => void;

    }) : JSX.Element {

    return (
        <Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent
            mainParams={ mainParams }
            callbackOn_Close={ callbackOn_Close }
        />
    )
}


////  React Components

class Internal_SelectTagColor_OverlayComponent_Color_Entry {
    fontColor: string
    backgroundColor: string
}

/**
 *
 */
interface Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Props {
    mainParams: Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_MainParams
    callbackOn_Close : () => void;
}

/**
 *
 */
interface Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_State {

    showLoadingMessage?: boolean
    show_Updating_Message?: boolean
    force_Rerender?: object
}

/**
 *
 */
class Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent extends React.Component< Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Props, Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_State > {

    private _closeOverlay_BindThis = this._closeOverlay.bind(this)

    private _inputField_NewTagString_Ref: React.RefObject<HTMLInputElement>


    private _overlay_Title;

    private _searchTagCategories__Get_For_ProjectId_Result: SearchTagCategories__Get_For_ProjectId_Result

    private _searchTags_For__SingleProjectSearchId_List: Array<Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleProjectSearchId>

    private _searchTags_All: Array<Internal_SearchTagEntry>
    private _searchTagCategories_AndTheir_SearchTags: Array<Internal_SearchTagCategory_Entry>

    private _searchList: Array<RetrieveSearchNamesFromServer_Result_SingleSearch>

    private _changeMadeToTags = false;

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Props) {
        super(props);

        this._inputField_NewTagString_Ref = React.createRef<HTMLInputElement>();

        if ( this.props.mainParams.searches.length === 0 ) {
            const msg = "( this.props.mainParams.searches.length === 0 )"
            console.warn(msg)
            throw Error(msg)
        }

        this._overlay_Title = _Overlay_Title_Start;

        if ( this.props.mainParams.searches.length > 1 ) {
            this._overlay_Title += "es"
        }

        this.state = {
            showLoadingMessage: true,
            force_Rerender: {}
        };
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
    private _closeOverlay() {

        if ( this._changeMadeToTags ) {

            //  Show spinner

            if ( this.props.mainParams.tagsChangedOnSearches_Callback ) {

                this.props.mainParams.tagsChangedOnSearches_Callback()

            } else {

                limelight__ReloadPage_Function()

                return;
            }
        }

        this.props.callbackOn_Close()
    }

    /**
     *
     */
    componentDidMount() {

        //  Load Search Tags for searches

        const projectSearchIds: Array<number> = []

        for ( const searchData of this.props.mainParams.searches ) {
            projectSearchIds.push( searchData.projectSearchId );
        }

        let searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result: Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result
        let searchList: Array<RetrieveSearchNamesFromServer_Result_SingleSearch>

        const promises: Array<Promise<void>> = []

        {
            const promise = new Promise<void>((resolve, reject) => { try {

                const promise_getSearchTagList = searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId({ projectSearchIds });

                promise_getSearchTagList.catch(reason => { reject(reason) })

                promise_getSearchTagList.then( ( searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result__PromiseResolve ) => { try {

                    if ( this._unmountCalled ) {
                        // unmounted so exit
                        return; // EARLY RETURN
                    }

                    searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result = searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result__PromiseResolve;

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push( promise );
        }
        {
            const promise = new Promise<void>((resolve, reject) => { try {

                const promise_retrieveSearchNamesFromServer = retrieveSearchNamesFromServer({ projectSearchIds })

                promise_retrieveSearchNamesFromServer.catch(reason => { reject(reason)})

                promise_retrieveSearchNamesFromServer.then(retrieveSearchNamesFromServer_Result => { try {

                    if ( this._unmountCalled ) {
                        // unmounted so exit
                        return; // EARLY RETURN
                    }

                    searchList = Array.from( retrieveSearchNamesFromServer_Result.searchList );

                    searchList.sort( (a, b) => {
                        return a.searchId - b.searchId
                    })

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push( promise );
        }
        {
            const promise = new Promise<void>((resolve, reject) => { try {

                const promise_FromServer = searchTagCategories__Get_For_ProjectId_Or_ProjectIdFromProjectSearchIds({ projectSearchIds, projectIdentifier: null })

                promise_FromServer.catch(reason => { reject(reason)})

                promise_FromServer.then(searchTagCategories__Get_For_ProjectId_Result_PromiseResult => { try {

                    if ( this._unmountCalled ) {
                        // unmounted so exit
                        return; // EARLY RETURN
                    }

                    this._searchTagCategories__Get_For_ProjectId_Result = searchTagCategories__Get_For_ProjectId_Result_PromiseResult;

                    resolve()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promises.push( promise );
        }



        const promisesAll = Promise.all( promises );

        promisesAll.catch((reason => {}))

        promisesAll.then( () => { try {

            if ( this._unmountCalled ) {
                // unmounted so exit

                return; // EARLY RETURN
            }

            this._process__searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_FromServer_Result({
                searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result
            })

            this._searchList = searchList;

            this.setState({
                showLoadingMessage: false,
                force_Rerender: {}
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    }

    /**
     *
     */
    private _process__searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_FromServer_Result(
        {
            searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result
        } : {
            searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result: Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result
        }
    ) {

        const searchTags_All: Array<Internal_SearchTagEntry> = []

        const searchTagCategories_AndTheir_SearchTags_Map_Key_CategoryId: Map<number, Internal_SearchTagCategory_Entry> = new Map()
        const searchTags_Uncategorized: Array<Internal_SearchTagEntry> = []

        for ( const category of this._searchTagCategories__Get_For_ProjectId_Result.tagCategories_DistinctInProject ) {
            searchTagCategories_AndTheir_SearchTags_Map_Key_CategoryId.set(
                category.category_id,
                {
                    uncategorized_Entry: false,
                    categoryId: category.category_id,
                    categoryLabel: category.category_label,
                    searchTags: []
                });
        }

        for ( const tagEntry_DistinctInProject of searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result.tags_DistinctInProject ) {

            let foundTagInAll = true;
            let foundTagInAny = false;

            for ( const search of this.props.mainParams.searches ) {

                let searchTagsItem_ForSingleSearch: Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleProjectSearchId
                for ( const searchTagsItem_ForSingleSearch_InArray of searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result.entriesPerSingleProjectSearchId ) {
                    if ( searchTagsItem_ForSingleSearch_InArray.projectSearchId === search.projectSearchId ) {
                        searchTagsItem_ForSingleSearch = searchTagsItem_ForSingleSearch_InArray;
                        break;
                    }
                }

                if ( ! searchTagsItem_ForSingleSearch ) {
                    //  No entry in searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result.entriesPerSingleProjectSearchId for search.projectSearchId

                    foundTagInAll = false;

                    continue; // EARLY CONTINUE
                }

                let foundTag_In_SingleSearch = false;

                for ( const tagEntry of searchTagsItem_ForSingleSearch.entriesPerTag ) {
                    if ( tagEntry.tag_id === tagEntry_DistinctInProject.tag_id ) {
                        foundTag_In_SingleSearch = true;
                        break;
                    }
                }

                if ( foundTag_In_SingleSearch ) {
                    foundTagInAny = true;
                } else {
                    foundTagInAll = false;
                }
            }

            let tag_Selected = Internal__TagSelected.SELECTED__SOME_SEARCHES;

            if ( ! foundTagInAny ) {
                tag_Selected = Internal__TagSelected.NO_SELECTED__ALL_SEARCHES;
            }
            if ( foundTagInAll ) {
                tag_Selected = Internal__TagSelected.YES_SELECTED__ALL_SEARCHES;
            }

            const tag_InProgress: Internal_SearchTagEntry = {

                tagId: tagEntry_DistinctInProject.tag_id,
                tagString: tagEntry_DistinctInProject.tag_string,
                tag_Color_Font: tagEntry_DistinctInProject.tag_Color_Font,
                tag_Color_Background: tagEntry_DistinctInProject.tag_Color_Background,
                tag_Color_Border: tagEntry_DistinctInProject.tag_Color_Border,
                tag_Selected,
            }

            searchTags_All.push( tag_InProgress )

            let tag_IsUncategorized = true;

            if ( tagEntry_DistinctInProject.tag_category_id !== undefined && tagEntry_DistinctInProject.tag_category_id !== null ) {

                const category = searchTagCategories_AndTheir_SearchTags_Map_Key_CategoryId.get( tagEntry_DistinctInProject.tag_category_id )
                if ( category ) {

                    category.searchTags.push(tag_InProgress)

                    tag_IsUncategorized = false
                }
            }

            if ( tag_IsUncategorized ) {
                searchTags_Uncategorized.push( tag_InProgress );
            }
        }

        this._searchTags_For__SingleProjectSearchId_List = searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result.entriesPerSingleProjectSearchId;

        this._searchTagCategories_AndTheir_SearchTags = [];

        for ( const category of searchTagCategories_AndTheir_SearchTags_Map_Key_CategoryId.values() ) {
            if ( category.searchTags.length > 0 ) {
                this._searchTagCategories_AndTheir_SearchTags.push(category)
            }
        }

        this._searchTagCategories_AndTheir_SearchTags.sort( (a,b) => {
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.categoryLabel, b.categoryLabel)
        })

        //  Put uncategorized last
        this._searchTagCategories_AndTheir_SearchTags.push({ categoryLabel: null, categoryId: null, uncategorized_Entry: true, searchTags: searchTags_Uncategorized })

        this._searchTags_All = searchTags_All;
    }

    /**
     *
     */
    private _tagClicked( tagId : number ): void {
        try {
            let addTagToAll_ProjectSearchIds = true;

            this.setState({ show_Updating_Message: true })

            for ( const tag of this._searchTags_All ) {
                if ( tag.tagId === tagId ) {
                    if ( tag.tag_Selected === Internal__TagSelected.SELECTED__SOME_SEARCHES ) {
                        tag.tag_Selected = Internal__TagSelected.YES_SELECTED__ALL_SEARCHES
                    } else if ( tag.tag_Selected === Internal__TagSelected.NO_SELECTED__ALL_SEARCHES ) {
                        tag.tag_Selected = Internal__TagSelected.YES_SELECTED__ALL_SEARCHES
                    } else {
                        tag.tag_Selected = Internal__TagSelected.NO_SELECTED__ALL_SEARCHES

                        addTagToAll_ProjectSearchIds = false;
                    }
                }
            }

            const projectSearchIds: Array<number> = [];
            for ( const search of this.props.mainParams.searches ) {
                projectSearchIds.push(search.projectSearchId)
            }

            let promise_UpdateServer: Promise<void>

            if ( addTagToAll_ProjectSearchIds ) {

                promise_UpdateServer = _add_SearchTag_ProjectSearchIds_Mapping({ projectSearchIds, tagId })

            } else {

                promise_UpdateServer = _remove_SearchTag_ProjectSearchIds_Mapping({ projectSearchIds, tagId })
            }

            promise_UpdateServer.catch( reason => { })
            promise_UpdateServer.then(value => { try {

                this._changeMadeToTags = true;

                //  Refresh Tag Section

                const promise_getSearchTagList = searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId({ projectSearchIds });

                promise_getSearchTagList.catch(reason => {  })

                promise_getSearchTagList.then( ( searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result ) => { try {

                    if ( this._unmountCalled ) {
                        // unmounted so exit
                        return; // EARLY RETURN
                    }

                    this._process__searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_FromServer_Result({ searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result })

                    this.setState({ show_Updating_Message: false, force_Rerender : {} })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }
            })


        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render(): React.ReactNode {

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ this._overlay_Title }
                callbackOnClicked_Close={ this._closeOverlay_BindThis }
                close_OnBackgroundClick={ false }>


                <div className=" search-tag-manage-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                     style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                >

                    { ( this.state.showLoadingMessage ) ? (
                        <div>
                            <div style={ { marginTop: 20, textAlign: "center" }}>
                                LOADING DATA
                            </div>
                            <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                                <Spinner_Limelight_Component/>
                            </div>
                        </div>
                    ) : (
                        <div
                            style={ { position: "relative", marginTop: 5 } }
                        >
                            <div style={ { marginBottom: 10, fontWeight: "bold", fontSize: 18 } }>

                                <span>Click to add/remove tags from search</span>
                                { this.props.mainParams.searches.length > 1 ? (
                                    <span>es</span>
                                ) : null}
                                <span>:</span>

                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                    title={
                                        <span>

                                            <span>Click on a tag to assign or unassign the tag to the select search</span>
                                            { this.props.mainParams.searches.length > 1 ? (
                                                <span>es</span>
                                            ) : null}
                                            <span>.</span>
                                            <br/>

                                            <span>Assigned tags have a solid border.</span>
                                            <br/>

                                            { this.props.mainParams.searches.length > 1 ? (
                                                <span>
                                                    A dashed border indicates a tag is assigned to only some of the searches.<br/>
                                                    Clicking it will assign it to all selected searches.
                                                    Clicking again will unassign it from all selected searches.
                                                </span>
                                            ) : null}
                                        </span>
                                    }
                                />

                            </div>

                            <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr" } }>
                                {/*  2 Column Grid.  Column 1: Category Label or 'Uncategorized'.  Column 2: Tags  */}

                                { this._searchTagCategories_AndTheir_SearchTags.map((singleCategory, index) => {
                                    return (
                                        <React.Fragment key={ singleCategory.categoryId }>
                                            {/*  column 1:  Category Label  */}
                                            <div style={ { marginTop: 7, marginRight: 6, fontWeight: "bold", whiteSpace: "nowrap" } }>
                                                { singleCategory.uncategorized_Entry ? (
                                                    <span>Uncategorized</span>
                                                ) : (
                                                    <span>{ singleCategory.categoryLabel }</span>
                                                ) }
                                                <span>:</span>
                                            </div>
                                            {/*  column 2:  Search Tags  */}
                                            <div>
                                                { singleCategory.searchTags.map( (tagEntry) => {
                                                    return this._render_SingleTag({ tagEntry })
                                                })}
                                            </div>
                                        </React.Fragment>
                                    )
                                }) }
                            </div>

                            {/*     */}
                            <div style={ { marginTop: 15 } }>
                                <div
                                    style={ { fontWeight: "bold", marginBottom: 5 } }
                                >
                                    <span>Search</span>
                                    { this.props.mainParams.searches.length > 1 ? (
                                        <span>es</span>
                                    ) : null}
                                    <span> the tags are assigned to:</span>
                                </div>
                                <div>
                                    <ul>
                                    { this._searchList.map((searchItem, index) => {

                                        let searchShortNameDisplayElement: JSX.Element

                                        if ( searchItem.searchShortName ) {
                                            searchShortNameDisplayElement = (
                                                <React.Fragment>
                                                    <span> (</span>
                                                    <span>
                                                        { searchItem.searchShortName }
                                                    </span>
                                                    <span>)</span>
                                                </React.Fragment>
                                            )
                                        }

                                        return (
                                            <li
                                                key={ searchItem.projectSearchId }
                                                style={ { marginBottom: 6 } }
                                            >
                                                <span>
                                                { searchItem.name }
                                                </span>
                                                { searchShortNameDisplayElement }
                                                <span> (</span>
                                                   <span>
                                                       { searchItem.searchId }
                                                    </span>
                                                <span>)</span>
                                            </li>
                                        )
                                    }) }
                                    </ul>
                                </div>
                            </div>

                            {/*  "Updating" Overlay Message  */}

                            { this.state.show_Updating_Message ? (
                                <div
                                    style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                    className=" standard-background-color "
                                >
                                    <div style={ { marginTop: 60, textAlign: "center" }}>
                                        UPDATING DATA
                                    </div>
                                    <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                                        <Spinner_Limelight_Component/>
                                    </div>
                                </div>
                            ) : null }
                        </div>

                    ) }

                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>
                        <input type="button" value="Close" onClick={ this._closeOverlay_BindThis } />
                    </div>
                </div>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }

    /**
     *
     * @param tagEntry
     */
    private _render_SingleTag(
        {
            tagEntry
        }: {
            tagEntry: Internal_SearchTagEntry
        }
    ) {

        const divStyle: React.CSSProperties = {
            display: "inline-block",
            marginBottom: 3,
            marginRight: 10,
            backgroundColor: tagEntry.tag_Color_Background,
            color: tagEntry.tag_Color_Font
        }

        const borderColor = "black"
        const borderWidth = 6

        let div_title: string

        if ( tagEntry.tag_Selected === Internal__TagSelected.YES_SELECTED__ALL_SEARCHES ) {

            divStyle.borderStyle = "solid"
            divStyle.borderColor = borderColor
            divStyle.borderWidth = borderWidth

            if ( this.props.mainParams.searches.length > 1 ) {
                div_title = "tag selected for all searches\n\nclick to not select for any searches";
            } else {
                div_title = "tag selected\n\nclick to not select";
            }

        } else if ( tagEntry.tag_Selected === Internal__TagSelected.NO_SELECTED__ALL_SEARCHES ) {

            if ( this.props.mainParams.searches.length > 1 ) {
                div_title = "tag not selected for any searches\n\nclick to select for all searches";
            } else {
                div_title = "tag not selected\n\nclick to select";
            }

        } else if ( tagEntry.tag_Selected === Internal__TagSelected.SELECTED__SOME_SEARCHES ) {

            divStyle.borderStyle = "dashed"
            divStyle.borderColor = borderColor
            divStyle.borderWidth = borderWidth

            div_title = "tag selected for some searches\n\nclick to select for all searches";

        } else {
            throw Error("Unknown value for tagEntry.tag_Selected: " + tagEntry.tag_Selected )
        }

        return (
            <div
                key={ tagEntry.tagId }
                style={ divStyle }
                className=" clickable search-tag-display-everywhere "
                title={ div_title }
                onClick={ event => {
                    event.stopPropagation()
                    this._tagClicked( tagEntry.tagId )
                }}
            >
                { tagEntry.tagString }
            </div>
        )
    }
}


//  Private code

class Internal_SearchTagCategory_Entry {

    categoryId: number
    categoryLabel: string
    uncategorized_Entry: boolean

    searchTags: Array<Internal_SearchTagEntry>
}

class Internal_SearchTagEntry {

    tagId: number
    tagString: string
    tag_Color_Font: string
    tag_Color_Background: string
    tag_Color_Border: string
    tag_Selected: Internal__TagSelected
}

enum Internal__TagSelected {
    NO_SELECTED__ALL_SEARCHES = "NO_SELECTED__ALL_SEARCHES",
    YES_SELECTED__ALL_SEARCHES = "YES_SELECTED__ALL_SEARCHES",
    SELECTED__SOME_SEARCHES = "SELECTED__SOME_SEARCHES"  // Used when multiple searches
}


/**
 *
 */
const _searchTags__Update_For_ProjectSearchIds = function(
    {
        projectSearchIds, searchTags_DistinctInProject_AndAddedTags
    } : {
        projectSearchIds: Array<number>
        searchTags_DistinctInProject_AndAddedTags: Array<Internal_SearchTagEntry>
    }
) : Promise<void> {

    return new Promise<void> ( ( resolve, reject ) => {
        try {
            const searchTags_UpdateData: Array<{
                tagId: number
                tagString: string;
                tag_Color_Font: string
                tag_Color_Background: string
                tag_Color_Border: string
                tag_Selected: boolean;
            }> = []

            for ( const searchTag_Entry of searchTags_DistinctInProject_AndAddedTags ) {
                if ( searchTag_Entry.tag_Selected === Internal__TagSelected.SELECTED__SOME_SEARCHES ) {
                    //  Not changed and mixed so do NOT send
                    continue; // EARLY CONTINUE
                }

                searchTags_UpdateData.push({
                    tagId: searchTag_Entry.tagId,
                    tagString: searchTag_Entry.tagString,
                    tag_Color_Font: searchTag_Entry.tag_Color_Font,
                    tag_Color_Background: searchTag_Entry.tag_Color_Background,
                    tag_Color_Border: searchTag_Entry.tag_Color_Border,
                    tag_Selected: searchTag_Entry.tag_Selected === Internal__TagSelected.YES_SELECTED__ALL_SEARCHES,
                })
            }

            let requestObj = {
                projectSearchIds, tagEntries: searchTags_UpdateData
            };

            const url = "d/rws/for-page/search-tags-update-for-project-search-id-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    resolve();

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException: e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException: e
            });
            throw e;
        }
    });
}


/**
 *
 */
const _add_SearchTag_ProjectSearchIds_Mapping = function(
    {
        projectSearchIds, tagId
    } : {
        projectSearchIds: Array<number>
        tagId: number
    }
) : Promise<void> {

    return new Promise<void> ( ( resolve, reject ) => {
        try {
            let requestObj = {
                projectSearchIds, tagId
            };

            const url = "d/rws/for-page/search-tags-add-tag-to-project-search-id-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    resolve();

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException: e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException: e
            });
            throw e;
        }
    });
}

/**
 *
 */
const _remove_SearchTag_ProjectSearchIds_Mapping = function(
    {
        projectSearchIds, tagId
    } : {
        projectSearchIds: Array<number>
        tagId: number
    }
) : Promise<void> {

    return new Promise<void> ( ( resolve, reject ) => {
        try {
            let requestObj = {
                projectSearchIds, tagId
            };

            const url = "d/rws/for-page/search-tags-remove-tag-from-project-search-id-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    resolve();

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException: e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException: e
            });
            throw e;
        }
    });
}



// /**
//  *
//  */
// const _searchTags__Add_New_For_ProjectSearchIdList = function(
//     {
//         projectSearchIdList, searchTagToAdd
//     } : {
//         projectSearchIdList: Array<number>
//         searchTagToAdd: {
//             tag_string
//             tag_Color_Font
//             tag_Color_Background
//         }
//     }
// ) : Promise<{
//     statusSuccess: boolean ;
//     tag_id: number;
//     duplicate: boolean ;
// }> {
//
//     return new Promise<{
//         statusSuccess: boolean ;
//         tag_id: number;
//         duplicate: boolean ;
//     }> ( ( resolve, reject ) => {
//         try {
//             let requestObj = {
//                 projectSearchIdList,
//                 tag_string: searchTagToAdd.tag_string,
//                 tag_Color_Font: searchTagToAdd.tag_Color_Font,
//                 tag_Color_Background: searchTagToAdd.tag_Color_Background
//             };
//
//             const url = "d/rws/for-page/search-tags-add-single-search-tag-for-project-id-or-project-search-id-list";
//
//             const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});
//
//             const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
//
//             promise_webserviceCallStandardPost.catch((reason : any) => {
//                 reject(reason);
//             });
//
//             promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
//                 try {
//                     resolve({
//                         statusSuccess: responseData.statusSuccess,
//                         tag_id: responseData.tag_id,
//                         duplicate: responseData.duplicate
//                     });
//
//                 } catch (e) {
//                     reportWebErrorToServer.reportErrorObjectToServer({
//                         errorException: e
//                     });
//                     throw e;
//                 }
//             });
//         } catch (e) {
//             reportWebErrorToServer.reportErrorObjectToServer({
//                 errorException: e
//             });
//             throw e;
//         }
//     });
// }
