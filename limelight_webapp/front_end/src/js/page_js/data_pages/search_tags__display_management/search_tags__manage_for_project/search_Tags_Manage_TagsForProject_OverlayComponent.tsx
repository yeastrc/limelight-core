/**
 * search_Tags_Manage_TagsForProject_OverlayComponent.tsx
 *
 * Search Sub Group Manage Sub Group Names Overlay - For User update Sub Group Names
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
import {SearchTag_Max_FieldLengths_Constants} from "page_js/constants_across_webapp/search_tag_constants/SearchTag_Max_FieldLengths_Constants";
import {
    searchTags__Get_For_ProjectId,
    SearchTags__Get_For_ProjectId_Result
} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_project/searchTags__Get_For_ProjectId";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";
import {SearchTag_DisallowedCategoryCharacters_Constants} from "page_js/constants_across_webapp/search_tag_constants/searchTag_DisallowedCategoryCharacters_Constants";
import {
    searchTagCategories__Get_For_ProjectId_Or_ProjectIdFromProjectSearchIds,
    SearchTagCategories__Get_For_ProjectId_Result
} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_project/search_tag_categories___get__for__project_id__or__project_id_from_project_search_ids";
import {limelight__IsTextSelected} from "page_js/common_all_pages/limelight__IsTextSelected";
import {SearchTag_ColorOptions_Constants} from "page_js/constants_across_webapp/search_tag_constants/SearchTag_ColorOptions_Constants";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/////

const _Overlay_Title = "Manage Tags"


const _Overlay_Width_Min = 510;
const _Overlay_Width_Max = 800;
const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 800;


const _CATEGORY_DISPLAY_LABEL_FOR_UNCATEGORIZED = "uncategorized"

//////


export class Search_Tags_Manage_TagsForProject_MainParams {

    projectIdentifier: string
    tagsChanged_Callback: () => void
}

/**
 *
 */
export const open_Search_Tags_Manage_TagsForProject_OverlayComponent_Overlay = function(
    {
        mainParams
    } : {
        mainParams: Search_Tags_Manage_TagsForProject_MainParams
    }) : void {

    let tagsHaveBeenUpdated = false;

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {

        if ( tagsHaveBeenUpdated ) {

            if ( mainParams.tagsChanged_Callback ) {

                mainParams.tagsChanged_Callback()

            } else {

                limelight__ReloadPage_Function()

                return; // EARLY RETURN
            }
        }

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const callback_TagsUpdated_Local = () : void => {

        tagsHaveBeenUpdated = true;
    }

    const overlayComponent = get_Search_Tags_Manage_TagsForProject_OverlayComponent_Overlay_Layout({
        mainParams,
        callbackOn_Cancel_Close_Clicked,
        callback_TagsUpdated: callback_TagsUpdated_Local
    })

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}


/**
 *
 */
const get_Search_Tags_Manage_TagsForProject_OverlayComponent_Overlay_Layout = function(
    {
        mainParams,
        callback_TagsUpdated,
        callbackOn_Cancel_Close_Clicked
    } : {
        mainParams: Search_Tags_Manage_TagsForProject_MainParams
        callback_TagsUpdated : () => void;
        callbackOn_Cancel_Close_Clicked : () => void;

    }) : React.JSX.Element {

    return (
        <Search_Tags_Manage_TagsForProject_OverlayComponent
            mainParams={ mainParams }
            callback_TagsUpdated={ callback_TagsUpdated }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
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
interface Search_Tags_Manage_TagsForProject_OverlayComponent_Props {
    mainParams: Search_Tags_Manage_TagsForProject_MainParams
    callback_TagsUpdated : () => void;
    callbackOn_Cancel_Close_Clicked : () => void;
}

/**
 *
 */
interface Search_Tags_Manage_TagsForProject_OverlayComponent_State {

    showLoadingMessage?: boolean
    showUpdatingMessage_Main_OverlayWholeScrollableDiv ?: boolean

    showDelete_TagCategory_OverScrollableDiv? : boolean
    delete_TagCategory_OverScrollableDiv_Top?: number

    showEditTag_OverScrollableDiv? : boolean
    editTag_OverScrollableDiv_Top?: number

    force_Rerender?: object
}

/**
 *
 */
class Search_Tags_Manage_TagsForProject_OverlayComponent extends React.Component< Search_Tags_Manage_TagsForProject_OverlayComponent_Props, Search_Tags_Manage_TagsForProject_OverlayComponent_State > {

    //  Tag Category
    private _modalTopLevelDiv_Scrollable_Ref: React.RefObject<HTMLDivElement>
    private _inputField_NewTagCategoryLabel_Ref: React.RefObject<HTMLInputElement>
    private _addTag_SavingTagCategoryLabel_Block_Ref: React.RefObject<HTMLDivElement>
    private _addTagCategoryLabel_MainBlock_Ref: React.RefObject<HTMLDivElement>

    private _overlay_Title;

    /**
     *   Tag Category
     *
     *   New Array Object created when any of contents changes
     */
    private _searchTagCategories_DistinctInProject: Array<Internal_SearchTagCategory_Entry>

    private _newTagCategoryLabel_Required_ErrorMessage = false;
    private _newTagCategoryLabel_Duplicate_ErrorMessage = false;
    private _newTagCategoryLabel_ContainsTilde_ErrorMessage = false

    private _newTagCategoryLabel_Empty = true;

    private _searchTagCategory_ToDelete_ShowOverlay: Internal_SearchTagCategory_Entry

    //  Tag

    private _searchTags_Uncategorized__DistinctInProject: Array<Internal_SearchTagEntry>

    private _searchTagEntry_ToEdit: Internal_SearchTagEntry

    private _display_tag_colorPicker_Overlay = false;

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: Search_Tags_Manage_TagsForProject_OverlayComponent_Props) {
        super(props);

        //  Tag Category
        this._modalTopLevelDiv_Scrollable_Ref = React.createRef();
        this._inputField_NewTagCategoryLabel_Ref = React.createRef();
        this._addTag_SavingTagCategoryLabel_Block_Ref = React.createRef();
        this._addTagCategoryLabel_MainBlock_Ref = React.createRef();

        this._overlay_Title = _Overlay_Title;

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
    componentDidMount() {

        try {
            this._loadData_SearchTags_SearchTagCategories()
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _searchTagCategories_DistinctInProject_ContentsHasChangedSoCreateNewObjectArray() {
        this._searchTagCategories_DistinctInProject = Array.from( this._searchTagCategories_DistinctInProject );

        this.setState({ force_Rerender: {} })
    }

    /**
     *
     */
    private _loadData_SearchTags_SearchTagCategories() {
        try {
            //  Load Search Tags for searches

            let searchTags__Get_For_ProjectId_Result: SearchTags__Get_For_ProjectId_Result
            let searchTagCategories__Get_For_ProjectId_Result: SearchTagCategories__Get_For_ProjectId_Result

            const promises: Array<Promise<void>> = []

            {
                const promise = new Promise<void>((resolve, reject) => { try {

                    const promise_getSearchTagList = searchTags__Get_For_ProjectId({ projectIdentifier: this.props.mainParams.projectIdentifier });

                    promise_getSearchTagList.catch(reason => { reject(reason) })

                    promise_getSearchTagList.then( ( searchTags__Get_For_ProjectId_Result__PromiseResolve ) => { try {

                        if ( this._unmountCalled ) {
                            // unmounted so exit
                            return; // EARLY RETURN
                        }

                        searchTags__Get_For_ProjectId_Result = searchTags__Get_For_ProjectId_Result__PromiseResolve;

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promises.push( promise );
            }
            {
                const promise = new Promise<void>((resolve, reject) => { try {

                    const promise_getSearchTagCategoryList =
                        searchTagCategories__Get_For_ProjectId_Or_ProjectIdFromProjectSearchIds({
                            projectIdentifier: this.props.mainParams.projectIdentifier, projectSearchIds: null
                        });

                    promise_getSearchTagCategoryList.catch(reason => { reject(reason) })

                    promise_getSearchTagCategoryList.then( ( searchTagCategories__Get_For_ProjectId_Result__PromiseResolve ) => { try {

                        if ( this._unmountCalled ) {
                            // unmounted so exit
                            return; // EARLY RETURN
                        }

                        searchTagCategories__Get_For_ProjectId_Result = searchTagCategories__Get_For_ProjectId_Result__PromiseResolve;

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

                const searchTagCategories_Map_Key_CategoryId: Map<number, Internal_SearchTagCategory_Entry> = new Map()

                for ( const tagCategoryEntry_DistinctInProject of searchTagCategories__Get_For_ProjectId_Result.tagCategories_DistinctInProject ) {

                    const tagCategory_InProgress: Internal_SearchTagCategory_Entry = {

                        tagCategoryId: tagCategoryEntry_DistinctInProject.category_id,
                        categoryLabel: tagCategoryEntry_DistinctInProject.category_label,
                        label_Color_Font: tagCategoryEntry_DistinctInProject.label_Color_Font,
                        label_Color_Background: tagCategoryEntry_DistinctInProject.label_Color_Background,
                        label_Color_Border: tagCategoryEntry_DistinctInProject.label_Color_Border,

                        searchTags_DistinctInProject__InCategory: []
                    }

                    if ( searchTagCategories_Map_Key_CategoryId.has( tagCategory_InProgress.tagCategoryId ) ) {
                        const msg = "Duplicate tagCategoryId: " + tagCategory_InProgress.tagCategoryId;
                        console.warn(msg)
                        throw Error(msg)
                    }

                    searchTagCategories_Map_Key_CategoryId.set( tagCategory_InProgress.tagCategoryId, tagCategory_InProgress );
                }

                const searchTags_Uncategorized__DistinctInProject: Array<Internal_SearchTagEntry> = []

                for ( const tagEntry_DistinctInProject of searchTags__Get_For_ProjectId_Result.tags_DistinctInProject ) {

                    const tag_InProgress: Internal_SearchTagEntry = {

                        tagId: tagEntry_DistinctInProject.tag_id,
                        tag_category_id: tagEntry_DistinctInProject.tag_category_id,
                        tagString: tagEntry_DistinctInProject.tag_string,
                        tag_Color_Font: tagEntry_DistinctInProject.tag_Color_Font,
                        tag_Color_Background: tagEntry_DistinctInProject.tag_Color_Background,
                        tag_Color_Border: tagEntry_DistinctInProject.tag_Color_Border,
                        tag_Added: false
                    }

                    let tagNotInCategory = true;

                    if ( tag_InProgress.tag_category_id !== undefined && tag_InProgress.tag_category_id !== null ) {

                        const category = searchTagCategories_Map_Key_CategoryId.get( tag_InProgress.tag_category_id )
                        if ( category ) {
                            category.searchTags_DistinctInProject__InCategory.push( tag_InProgress );
                            tagNotInCategory = false;
                        }
                    }

                    if ( tagNotInCategory ) {
                        searchTags_Uncategorized__DistinctInProject.push( tag_InProgress );
                    }
                }
                
                const searchTagCategories_DistinctInProject: Array<Internal_SearchTagCategory_Entry> = []

                for ( const searchTagCategory of searchTagCategories_Map_Key_CategoryId.values() ) {
                    searchTagCategories_DistinctInProject.push( searchTagCategory );

                    //  Sort tags in each category
                    searchTagCategory.searchTags_DistinctInProject__InCategory.sort( (a,b ) => {
                        return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam( a.tagString, b.tagString )
                    })
                }

                searchTagCategories_DistinctInProject.sort( (a,b) => {
                    return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam( a.categoryLabel, b.categoryLabel )
                })

                //  Sort tags uncategorized
                searchTags_Uncategorized__DistinctInProject.sort( (a,b ) => {
                    return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam( a.tagString, b.tagString )
                })

                this._searchTagCategories_DistinctInProject = searchTagCategories_DistinctInProject;

                this._searchTags_Uncategorized__DistinctInProject = searchTags_Uncategorized__DistinctInProject;

                this.setState({
                    showLoadingMessage: false,
                    showUpdatingMessage_Main_OverlayWholeScrollableDiv: false,
                    showEditTag_OverScrollableDiv: false,
                    showDelete_TagCategory_OverScrollableDiv: false,
                    force_Rerender: {}
                })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _sort__searchTagCategories_DistinctInProject() {
        this._searchTagCategories_DistinctInProject.sort( (a,b) => {
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.categoryLabel, b.categoryLabel)
        })
    }

    /**
     *
     */
    private _addTagCategory(): void {
        try {
            if ( ! this._inputField_NewTagCategoryLabel_Ref.current ) {
                return; // EARLY RETURN
            }

            this.props.callback_TagsUpdated()

            const categoryLabel : string = this._inputField_NewTagCategoryLabel_Ref.current.value.trim().substring(0, SearchTag_Max_FieldLengths_Constants.SEARCH_TAG_CATEGORY_MAX_LENGTH__CATEGORY_LABEL )

            if ( categoryLabel === "" ) {
                this._newTagCategoryLabel_Required_ErrorMessage = true;
                this.setState({ force_Rerender: {} })

                return; // EARLY RETURN
            }

            if ( categoryLabel.includes( SearchTag_DisallowedCategoryCharacters_Constants.SEARCH_TAG_CATEGORY_DISALLOWED_CHARACTER_TILDE ) ) {
                this._newTagCategoryLabel_ContainsTilde_ErrorMessage = true;
                this.setState({ force_Rerender: {} })

                return; // EARLY RETURN
            }

            // validate not already in list
            let categoryLabelString_AlreadyIn_Tags = false;
            for ( const searchTagCategory of this._searchTagCategories_DistinctInProject ) {
                if ( searchTagCategory.categoryLabel === categoryLabel ) {
                    categoryLabelString_AlreadyIn_Tags = true
                }
            }

            if ( categoryLabelString_AlreadyIn_Tags ) {
                this._newTagCategoryLabel_Duplicate_ErrorMessage = true;
                this.setState({ force_Rerender: {} })

                return; // EARLY RETURN
            }

            const searchTagCategoryToAdd: Internal_SearchTagCategory_Entry = {
                tagCategoryId: undefined,
                categoryLabel: categoryLabel,
                label_Color_Font: null,
                label_Color_Background: null,
                label_Color_Border: null,

                searchTags_DistinctInProject__InCategory: []
            }

            if ( ! this._addTagCategoryLabel_MainBlock_Ref.current ) {
                return;
            }
            if ( ! this._addTag_SavingTagCategoryLabel_Block_Ref.current ) {
                return;
            }

            this._addTagCategoryLabel_MainBlock_Ref.current.style.display = "none"
            this._addTag_SavingTagCategoryLabel_Block_Ref.current.style.display = ""

            const promise = _searchTagCategories__Add_New_For_ProjectId({ projectIdentifier: this.props.mainParams.projectIdentifier, searchTagCategoryToAdd })

            promise.catch(reason => {

                this._addTag_SavingTagCategoryLabel_Block_Ref.current.style.display = "none"
                this._addTagCategoryLabel_MainBlock_Ref.current.style.display = ""
            })

            promise.then(value => { try {

                this._addTag_SavingTagCategoryLabel_Block_Ref.current.style.display = "none"
                this._addTagCategoryLabel_MainBlock_Ref.current.style.display = ""

                if ( ! value.statusSuccess ) {

                    if ( value.duplicate ) {

                        this._newTagCategoryLabel_Duplicate_ErrorMessage = true;
                        this.setState({ force_Rerender: {} })

                    } else {

                        const msg = "( ! value.statusSuccess ) AND NOT ( value.duplicate )"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    return; // EARLY RETURN
                }

                // //  Add
                this._searchTagCategories_DistinctInProject.push({
                    tagCategoryId: value.searchTagCategoryId,
                    categoryLabel: categoryLabel,
                    label_Color_Font: null,
                    label_Color_Background: null,
                    label_Color_Border: null,

                    searchTags_DistinctInProject__InCategory: []
                })

                //  Sort
                this._sort__searchTagCategories_DistinctInProject()

                this._searchTagCategories_DistinctInProject_ContentsHasChangedSoCreateNewObjectArray()

                this._inputField_NewTagCategoryLabel_Ref.current.value = ""
                this._newTagCategoryLabel_Empty = true;

                this.setState({ force_Rerender: {} })


            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     * @param tagCategoryId
     */
    private _callbackOn_DeleteTagCategoryId_Clicked(tagCategoryId: number) : void {

        if ( ! this._modalTopLevelDiv_Scrollable_Ref.current ) {
            return
        }

        //  Get Category to delete

        let searchTagCategory_ToDelete: Internal_SearchTagCategory_Entry

        for ( const category of this._searchTagCategories_DistinctInProject ) {
            if ( category.tagCategoryId === tagCategoryId ) {
                searchTagCategory_ToDelete = category
                break
            }
        }

        if ( ! searchTagCategory_ToDelete ) {
            const msg = "IN _callbackOn_DeleteTagCategoryId_Clicked(tagCategoryId: number) : Category not found for tagCategoryId: " + tagCategoryId;
            console.warn(msg)
            throw Error(msg)
        }

        this._searchTagCategory_ToDelete_ShowOverlay = searchTagCategory_ToDelete

        let div_OverScrollableDiv_Top = this._modalTopLevelDiv_Scrollable_Ref.current.scrollTop - 10;

        if ( div_OverScrollableDiv_Top < 0 ) {
            div_OverScrollableDiv_Top = 0
        }

        this.setState({ showDelete_TagCategory_OverScrollableDiv: true, delete_TagCategory_OverScrollableDiv_Top: div_OverScrollableDiv_Top })
    }

    /**
     *
     * @param tagId
     * @private
     */
    private _callbackOn_EditTag(tagId: number) : void {

        if ( ! this._modalTopLevelDiv_Scrollable_Ref.current ) {
            return
        }

        //  Get tag to edit

        let searchTagEntry_ToEdit: Internal_SearchTagEntry

        for ( const searchTag of this._searchTags_Uncategorized__DistinctInProject ) {
            if ( searchTag.tagId === tagId ) {
                searchTagEntry_ToEdit = searchTag
                break
            }
        }

        if ( ! searchTagEntry_ToEdit ) {

            for ( const category of this._searchTagCategories_DistinctInProject ) {
                for ( const searchTag of category.searchTags_DistinctInProject__InCategory ) {
                    if ( searchTag.tagId === tagId ) {
                        searchTagEntry_ToEdit = searchTag
                        break
                    }
                }
                if ( searchTagEntry_ToEdit ) {
                    break
                }
            }
        }

        if ( ! searchTagEntry_ToEdit ) {
            const msg = "IN _callbackOn_EditTag(tagId: number) : Search tag not found for tagId: " + tagId;
            console.warn(msg)
            throw Error(msg)
        }

        this._searchTagEntry_ToEdit = searchTagEntry_ToEdit

        let editTag_OverScrollableDiv_Top = this._modalTopLevelDiv_Scrollable_Ref.current.scrollTop - 10;

        if ( editTag_OverScrollableDiv_Top < 0 ) {
            editTag_OverScrollableDiv_Top = 0
        }

        this.setState({ showEditTag_OverScrollableDiv: true, editTag_OverScrollableDiv_Top })
    }

    /**
     *
     * @param params
     */
    private _callbackOn_MoveTagToCategoryId( params: MoveTagToCategoryId_Params ) {

        //  Move tag to under category id or to uncategorized

        let tagToMove: Internal_SearchTagEntry

        if ( params.categoryId_Old !== undefined && params.categoryId_Old !== null ) {
            // Previously under a category

            for ( const category of this._searchTagCategories_DistinctInProject ) {

                if ( category.tagCategoryId !== params.categoryId_Old ) {
                    continue; // SKIP
                }
                category.searchTags_DistinctInProject__InCategory = category.searchTags_DistinctInProject__InCategory.filter(tag => {
                    if ( tag.tagId === params.tagId ) {
                        tagToMove = tag;
                        return false; // Remove from old tags
                    }
                    return true
                })
            }
        } else {
            // Previously uncategorized
            this._searchTags_Uncategorized__DistinctInProject = this._searchTags_Uncategorized__DistinctInProject.filter(tag => {
                if ( tag.tagId === params.tagId ) {
                    tagToMove = tag;
                    return false; // Remove from old tags
                }
                return true
            })
        }

        if ( params.categoryId_New !== undefined && params.categoryId_New !== null ) {
            //  add to category

            for ( const category of this._searchTagCategories_DistinctInProject ) {

                if ( category.tagCategoryId !== params.categoryId_New ) {
                    continue; // SKIP
                }
                category.searchTags_DistinctInProject__InCategory.push( tagToMove );
                category.searchTags_DistinctInProject__InCategory.sort( (a,b) => {
                    return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.tagString, b.tagString)
                })
            }
        } else {
            // Add to uncategorized
            this._searchTags_Uncategorized__DistinctInProject.push( tagToMove );
            this._searchTags_Uncategorized__DistinctInProject.sort( (a,b) => {
                return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.tagString, b.tagString)
            })
        }

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
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>


                <div
                    ref={ this._modalTopLevelDiv_Scrollable_Ref }
                    className=" search-tag-manage-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                    style={ { position: "relative", overflowY: "auto", overflowX: "auto", borderStyle: "solid", borderWidth: 1 } }
                    // style={ { padding : 6 } }
                    onMouseEnter={ event => {
                        if ( this._display_tag_colorPicker_Overlay ) {
                            this._display_tag_colorPicker_Overlay = false;
                            this.setState({force_Rerender: {}})
                        }
                    }}
                    onClick={ event => {
                        if ( this._display_tag_colorPicker_Overlay ) {
                            this._display_tag_colorPicker_Overlay = false;
                            this.setState({force_Rerender: {}})
                        }
                    }}
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
                            ref={ this._addTagCategoryLabel_MainBlock_Ref }
                            style={ { position: "relative" } }
                        >
                            {/*  Tag Categories   */}

                            <div
                                style={ { position: "relative", marginTop: 10 } }
                            >
                                <div
                                    style={ { fontSize: 16, fontWeight: "bold", marginBottom: 10 } }
                                >
                                    Current tags and tag categories
                                </div>

                                {/*  Add new Category  */}

                                <div
                                    style={ { marginBottom: 10 } }
                                >
                                    <input
                                        ref={ this._inputField_NewTagCategoryLabel_Ref }
                                        maxLength={ SearchTag_Max_FieldLengths_Constants.SEARCH_TAG_CATEGORY_MAX_LENGTH__CATEGORY_LABEL }
                                        placeholder="New Tag Category Label"
                                        style={ { width: 200 } }
                                        onChange={ event => {
                                            //  Clear error message if set
                                            if ( this._newTagCategoryLabel_Required_ErrorMessage || this._newTagCategoryLabel_Duplicate_ErrorMessage ) {
                                                this._newTagCategoryLabel_Required_ErrorMessage = false;
                                                this._newTagCategoryLabel_Duplicate_ErrorMessage = false
                                                this.setState({ force_Rerender: {} })
                                            }
                                            if ( event.target.value.length === 0 ) {
                                                this._newTagCategoryLabel_Empty = true;
                                                this.setState({ force_Rerender: {} })
                                            } else {
                                                if ( this._newTagCategoryLabel_Empty ) {
                                                    this._newTagCategoryLabel_Empty = false;
                                                    this.setState({ force_Rerender: {} })
                                                }
                                            }
                                        }}
                                    />

                                    <span> </span>
                                    <div style={ { display: "inline-block", position: "relative" } }>
                                        <button
                                            disabled={ this._newTagCategoryLabel_Empty }
                                            onClick={ event => {
                                                this._addTagCategory()
                                            } }
                                        >
                                            Add Tag Category
                                        </button>
                                        { this._newTagCategoryLabel_Empty ? (
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    "Tag String required"
                                                }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                                <div
                                                    style={ { position: "absolute", inset: 0 }}
                                                ></div>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        ) : null }

                                    </div>
                                </div>

                                { this._newTagCategoryLabel_Required_ErrorMessage ? (
                                    <div className=" error-text " >
                                        Tag Category Required
                                    </div>
                                ) : null }
                                { this._newTagCategoryLabel_Duplicate_ErrorMessage ? (
                                    <div className=" error-text " >
                                        Tag Category already Exists
                                    </div>
                                ) : null }
                                { this._newTagCategoryLabel_ContainsTilde_ErrorMessage ? (
                                    <div className=" error-text " >
                                        Tag Category cannot contain '~'
                                    </div>
                                ) : null }

                            </div>

                            {/*  Saving Tag Message for Add Tag  */}
                            <div
                                ref={ this._addTag_SavingTagCategoryLabel_Block_Ref }
                                style={ { position: "relative", display: "none" } }
                            >
                                Saving Tag Category...
                            </div>

                            {/*  List Existing Categories and their tags  */}

                            { this._searchTagCategories_DistinctInProject.map( (value, index, array) => {

                                return (
                                    <SelectTag_Category_Entry_OverlayComponent
                                        key={ value.tagCategoryId }
                                        searchTagCategoryEntry={ value }
                                        searchTagCategories_DistinctInProject_ALL={ this._searchTagCategories_DistinctInProject }
                                        callbackOn_ChangeTagCategory={ (tagId: number) : void => {
                                            try {
                                                this.props.callback_TagsUpdated()

                                                this.setState({ force_Rerender: {} })
                                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                        } }
                                        callbackOn_DeleteTagCategoryId_Clicked={ (tagCategoryId: number) : void => {
                                            try {
                                                this._callbackOn_DeleteTagCategoryId_Clicked(tagCategoryId);

                                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                        } }

                                        searchTagCategories_DistinctInProject={ this._searchTagCategories_DistinctInProject }
                                        callbackOn_ChangeTag={ (tagId: number) : void => {

                                            this.props.callback_TagsUpdated()

                                            this.setState({ force_Rerender: {} })
                                        } }
                                        callbackOn_RemoveTagId={ (tagId: number) : void => {

                                            this.props.callback_TagsUpdated()
                                        } }
                                        callbackOn_EditTag={ ( tagId: number ) => {
                                            this._callbackOn_EditTag(tagId)
                                        }}
                                        mainParams={ this.props.mainParams }
                                    />
                                )
                            })}


                            {/*  Border  */}

                            <div
                                className="standard-border-color-dark"
                                style={{ marginTop: 7,marginBottom: 8, width: "100%", borderBottomStyle: "solid", borderBottomWidth: 1 }}
                            ></div>

                            {/*  Search Tags  */}

                            <div
                                style={ { fontSize: 16, fontWeight: "bold", marginBottom: 10 } }
                            >
                                Uncategorized Tags
                            </div>

                            <div>

                                <Internal__New_SearchTag_Component
                                    tag_category_id={ null }  //  null for uncategorized
                                    tag_category_label={ null }  //  null for uncategorized
                                    mainParams={ this.props.mainParams }
                                    searchTagCategories_DistinctInProject={ this._searchTagCategories_DistinctInProject }
                                    callback_TagToAdd={ ( params: Internal__New_SearchTag_Component__Callback_TagToAdd_Params ) => {

                                        this._searchTags_Uncategorized__DistinctInProject.push( params.searchTagEntry )

                                        this.setState({ force_Rerender: {} })
                                    } }
                                />

                            </div>

                            <div style={ { marginTop: 12, marginBottom: 10 } }>

                                { this._searchTags_Uncategorized__DistinctInProject.map((value, index) => {

                                    return (
                                        <SelectTagEntry_OverlayComponent
                                            key={ value.tagId }
                                            searchTagEntry={ value }
                                            searchTagCategories_DistinctInProject={ this._searchTagCategories_DistinctInProject }
                                            callbackOn_ChangeTag={ (tagId: number) : void => {

                                                this.props.callback_TagsUpdated()

                                                this.setState({ force_Rerender: {} })
                                            } }
                                            callbackOn_RemoveTagId={ (tagId: number) : void => {

                                                this.props.callback_TagsUpdated()

                                                this._searchTags_Uncategorized__DistinctInProject =
                                                    this._searchTags_Uncategorized__DistinctInProject.filter(value_ForFilter => {
                                                        if ( value_ForFilter.tagId === tagId ) {
                                                            return false; // remove
                                                        }
                                                        return true; // keep
                                                    })
                                                this.setState({ force_Rerender: {} })
                                            } }
                                            callbackOn_EditTag={ tagId => {
                                                this._callbackOn_EditTag(tagId)
                                            } }
                                        />
                                    )
                                }) }

                            </div>

                            {/*  Delete Tag Category Dialog covering main scrollable div  */}

                            { this.state.showDelete_TagCategory_OverScrollableDiv ? (

                                <div
                                    className=" standard-background-color "
                                    style={ { position: "absolute", left: 0, right: 0, top: this.state.delete_TagCategory_OverScrollableDiv_Top, bottom: 0 } }
                                >

                                    <DeleteCategory_Overlay_Component
                                        searchTagCategory_Entry={ this._searchTagCategory_ToDelete_ShowOverlay }
                                        callbackOn_RemoveTagCategoryId={ (tagCategoryId: number) => {
                                            try {
                                                this._callbackOn_DeleteTagCategoryId_Clicked(tagCategoryId);

                                                this.props.callback_TagsUpdated()

                                                this.setState({ showUpdatingMessage_Main_OverlayWholeScrollableDiv: true })

                                                window.setTimeout( () => {
                                                    try {
                                                        //  Refresh data
                                                        this._loadData_SearchTags_SearchTagCategories()

                                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                                }, 10 )
                                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                        } }
                                        callbackOn_Cancel={ () => {
                                            this.setState({ showDelete_TagCategory_OverScrollableDiv: false })
                                        }}
                                    />
                                </div>

                            ) : null }

                            {/*  Edit Tag covering main scrollable div  */}

                            { this.state.showEditTag_OverScrollableDiv ? (

                                <div
                                    className=" standard-background-color "
                                    style={ { position: "absolute", left: 0, right: 0, top: this.state.editTag_OverScrollableDiv_Top, bottom: 0 } }
                                >
                                    <SelectTagEntry_EDIT_CHANGE_Component
                                        searchTagEntry={ this._searchTagEntry_ToEdit }
                                        searchTagCategories_DistinctInProject={ this._searchTagCategories_DistinctInProject }
                                        callbackOn_ChangeTag={ (tagId: number) : void => {

                                            this.props.callback_TagsUpdated()

                                            this.setState({ force_Rerender: {} })
                                        } }
                                        callbackOn_MoveTagToCategoryId={ (params) => {
                                            this._callbackOn_MoveTagToCategoryId(params)
                                        }}
                                        callbackOn_Close={ () => {
                                            this.setState({ showEditTag_OverScrollableDiv: false })
                                        }}
                                    />
                                </div>

                            ) : null }


                            {/*  Updating Message covering message  */}

                            { this.state.showUpdatingMessage_Main_OverlayWholeScrollableDiv ? (

                                <div
                                    className=" standard-background-color "
                                    style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                >
                                    <div style={ { marginTop: 20, textAlign: "center" }}>
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

                        <input type="button" value="Close" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                    </div>
                </div>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}

//  Private Components


//   Search Tag Category


/**
 *
 */
class SelectTag_Category_Entry_Component_Props {
    searchTagCategoryEntry: Internal_SearchTagCategory_Entry
    searchTagCategories_DistinctInProject_ALL: Array<Internal_SearchTagCategory_Entry>
    callbackOn_DeleteTagCategoryId_Clicked : (tagCategoryId: number) => void;
    callbackOn_ChangeTagCategory : (tagCategoryId: number) => void;

    //  For Child Search Tags
    searchTagCategories_DistinctInProject: Array<Internal_SearchTagCategory_Entry>
    callbackOn_RemoveTagId : (tagId: number) => void;
    callbackOn_ChangeTag : (tagId: number) => void;
    callbackOn_EditTag : (tagId: number) => void;

    mainParams: Search_Tags_Manage_TagsForProject_MainParams
}

/**
 *
 */
class SelectTag_Category_Entry_OverlayComponent_State {

    // showDeletingMessage?: boolean
    editingEntry?: boolean
    force_Rerender?: object
}

/**
 *
 */
class SelectTag_Category_Entry_OverlayComponent extends React.Component< SelectTag_Category_Entry_Component_Props, SelectTag_Category_Entry_OverlayComponent_State > {

    private _div_OuterContainer_WhenEditing_Ref: React.RefObject<HTMLDivElement>
    private _inputField_CategoryLabel_Ref: React.RefObject<HTMLInputElement>

    private _label_Color: Internal_SelectTagColor_OverlayComponent_Color_Entry

    private _categoryLabelString_Empty = false

    private _categoryLabel_Duplicate_ErrorMessage: boolean = false
    private _newCategoryLabel_Required_ErrorMessage = false;

    private _show_AddTag_Component = false

    /**
     *
     */
    constructor(props: SelectTag_Category_Entry_Component_Props) {
        super(props);

        this._div_OuterContainer_WhenEditing_Ref = React.createRef();
        this._inputField_CategoryLabel_Ref = React.createRef();

        this.state = {
            editingEntry: false
        };
    }

    /**
     *
     */
    private _editEntry() {
        try {
            this._label_Color = { backgroundColor: this.props.searchTagCategoryEntry.label_Color_Background, fontColor: this.props.searchTagCategoryEntry.label_Color_Font };

            this.setState({ editingEntry: true })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _saveTagCategory(): void {
        try {
            if ( ! this._inputField_CategoryLabel_Ref.current ) {
                return; // EARLY RETURN
            }

            const categoryLabel : string = this._inputField_CategoryLabel_Ref.current.value.substring(0, SearchTag_Max_FieldLengths_Constants.SEARCH_TAG_CATEGORY_MAX_LENGTH__CATEGORY_LABEL )

            if ( categoryLabel === "" ) {
                this._newCategoryLabel_Required_ErrorMessage = true;
                this.setState({ force_Rerender: {} })

                return; // EARLY RETURN
            }

            // validate not already in list
            let categoryLabel_AlreadyIn_Tags = false;
            for ( const searchTagCategory of this.props.searchTagCategories_DistinctInProject_ALL ) {
                if ( searchTagCategory.tagCategoryId === this.props.searchTagCategoryEntry.tagCategoryId ) {
                    //  is search tag currently editing so skip
                    continue;
                }
                if ( searchTagCategory.categoryLabel === categoryLabel ) {
                    categoryLabel_AlreadyIn_Tags = true
                    break;
                }
            }

            if ( categoryLabel_AlreadyIn_Tags ) {
                this._categoryLabel_Duplicate_ErrorMessage = true;
                this.setState({ force_Rerender: {} })

                return; // EARLY RETURN
            }

            const searchTagCategoryToSave: Internal_SearchTagCategory_Entry = {
                tagCategoryId: this.props.searchTagCategoryEntry.tagCategoryId,
                categoryLabel: categoryLabel,
                label_Color_Font: this._label_Color.fontColor,
                label_Color_Background: this._label_Color.backgroundColor,
                label_Color_Border: null,

                searchTags_DistinctInProject__InCategory: []
            }



            const promise = _searchTagCategories_TagCategoryChange_UpdateServer( searchTagCategoryToSave )

            promise.catch(reason => {

                this.setState({ editingEntry: false })
            })

            promise.then(value => { try {

                if ( ! value.statusSuccess ) {

                    if ( value.duplicate ) {

                        this._categoryLabel_Duplicate_ErrorMessage = true;
                        this.setState({ force_Rerender: {} })

                    } else {

                        const msg = "( ! value.statusSuccess ) AND NOT ( value.duplicate )"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    return; // EARLY RETURN
                }

                //  Update

                this.props.searchTagCategoryEntry.categoryLabel = categoryLabel;
                this.props.searchTagCategoryEntry.label_Color_Background = this._label_Color.backgroundColor;
                this.props.searchTagCategoryEntry.label_Color_Font = this._label_Color.fontColor

                this.props.callbackOn_ChangeTagCategory( this.props.searchTagCategoryEntry.tagCategoryId );

                this.setState({ editingEntry: false })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        const marginLeft__Tags = 20;

        return (
            <>
                <div
                    className=" standard-border-color-gray "
                    style={ { borderStyle: "solid", borderWidth: 2, paddingLeft: 10, paddingRight: 10, marginBottom: 10 } }
                >

                    { ( ! this.state.editingEntry ) ? (

                        <div
                            style={ { whiteSpace: "nowrap", paddingTop: 8, paddingBottom: 10, marginRight: 10, position: "relative" } }
                        >
                            {/*  Display the Category  */}
                            <span
                                style={ {
                                    // backgroundColor: this.props.searchTagCategoryEntry.label_Color_Background, color: this.props.searchTagCategoryEntry.label_Color_Font
                                } }
                                className=" "
                            >
                                Category: { this.props.searchTagCategoryEntry.categoryLabel }
                            </span>
                            <span> </span>
                            <span> </span>

                            <span style={ { whiteSpace: "nowrap", paddingTop: 4, paddingBottom: 4 } }>
                                <>
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            "Edit category"
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <img
                                            src="static/images/icon-edit.png"
                                            className="icon-small clickable "
                                            onClick={ event => {
                                                this._editEntry()
                                            }}
                                        />
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    <span> </span>
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            "Delete category.  This will delete all tags under this category."
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <img
                                            src="static/images/icon-circle-delete.png"
                                            className="icon-small clickable  "
                                            onClick={ event => {
                                                this.props.callbackOn_DeleteTagCategoryId_Clicked( this.props.searchTagCategoryEntry.tagCategoryId );
                                            }}
                                        />
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </>
                            </span>
                        </div>
                    ) : (  ///  Editing Entry

                        <div
                            ref={ this._div_OuterContainer_WhenEditing_Ref }
                            style={ { whiteSpace: "nowrap", position: "relative" } }
                        >

                            <form
                                onSubmit={ event => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    this._saveTagCategory()
                                }}
                            >
                                <input
                                    ref={ this._inputField_CategoryLabel_Ref }
                                    defaultValue={ this.props.searchTagCategoryEntry.categoryLabel }
                                    maxLength={ SearchTag_Max_FieldLengths_Constants.SEARCH_TAG_CATEGORY_MAX_LENGTH__CATEGORY_LABEL }
                                    placeholder="New Tag Category Label"
                                    style={ { width: 200 } }
                                    onChange={ event => {
                                        //  Clear error message if set
                                        if ( this._newCategoryLabel_Required_ErrorMessage || this._categoryLabel_Duplicate_ErrorMessage ) {
                                            this._newCategoryLabel_Required_ErrorMessage = false;
                                            this._categoryLabel_Duplicate_ErrorMessage = false
                                            this.setState({ force_Rerender: {} })
                                        }
                                        if ( event.target.value.length === 0 ) {
                                            this._categoryLabelString_Empty = true;
                                            this.setState({ force_Rerender: {} })
                                        } else {
                                            if ( this._categoryLabelString_Empty ) {
                                                this._categoryLabelString_Empty = false;
                                                this.setState({ force_Rerender: {} })
                                            }
                                        }
                                    }}
                                />

                                <span> </span>
                                <div style={ { display: "inline-block", position: "relative" } }>
                                    <input
                                        type="submit"
                                        value="Save"
                                        disabled={ this._categoryLabelString_Empty }
                                    />
                                    { this._categoryLabelString_Empty ? (
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                "Category Label required"
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <div
                                                style={ { position: "absolute", inset: 0 }}
                                            ></div>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    ) : null }
                                </div>

                                <span> </span>
                                <button
                                    onClick={ event => {
                                        event.preventDefault()
                                        event.stopPropagation();

                                        this.setState({ editingEntry: false })
                                    }}
                                >
                                    Cancel
                                </button>


                            </form>
                        </div>
                    )}

                    <div
                        style={ {
                            marginLeft: marginLeft__Tags,
                        } }
                    >
                        <div style={ { marginBottom: 10 } }>

                            { this.props.searchTagCategoryEntry.searchTags_DistinctInProject__InCategory.map( (value, index, array) => {

                                return (
                                    <SelectTagEntry_OverlayComponent
                                        key={ value.tagId }
                                        searchTagEntry={ value }
                                        searchTagCategories_DistinctInProject={ this.props.searchTagCategories_DistinctInProject }
                                        callbackOn_ChangeTag={ (tagId: number) : void => {

                                            this.props.callbackOn_ChangeTag( tagId )

                                            this.setState({ force_Rerender: {} })
                                        } }
                                        callbackOn_RemoveTagId={ (tagId: number) : void => {

                                            this.props.searchTagCategoryEntry.searchTags_DistinctInProject__InCategory =
                                                this.props.searchTagCategoryEntry.searchTags_DistinctInProject__InCategory.filter(value_ForFilter => {
                                                    if ( value_ForFilter.tagId === tagId ) {
                                                        return false; // remove
                                                    }
                                                    return true; // keep
                                                })

                                            this.props.callbackOn_RemoveTagId( tagId )

                                            this.setState({ force_Rerender: {} })
                                        } }
                                        callbackOn_EditTag={ this.props.callbackOn_EditTag }
                                    />
                                )
                            })}
                        </div>
                    </div>

                    <div
                        style={ {
                            position: "relative"
                        } }
                    >
                        <div
                            style={ {
                                marginLeft: marginLeft__Tags,
                            } }
                        >
                            { ! this._show_AddTag_Component ? (
                                <div
                                    style={ { marginBottom: 10 } }
                                >
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            "Add a tag to this category"
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <span
                                            className=" fake-link "
                                            onClick={ event => {
                                                event.stopPropagation()
                                                this._show_AddTag_Component = true;
                                                this.setState({ force_Rerender: {} })
                                            }}
                                        >
                                            +Add tag to category
                                        </span>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </div>
                            ) : (
                                <div
                                    // className=" standard-background-color select-color-display-div "
                                    // style={ { position: "absolute", top: 0, left: 0, right: 0, zIndex: 999 } }
                                >
                                    <Internal__New_SearchTag_Component
                                        tag_category_id={ this.props.searchTagCategoryEntry.tagCategoryId }  //  null for uncategorized
                                        tag_category_label={ this.props.searchTagCategoryEntry.categoryLabel }
                                        mainParams={ this.props.mainParams }
                                        searchTagCategories_DistinctInProject={ this.props.searchTagCategories_DistinctInProject }
                                        callback_TagToAdd={ ( params: Internal__New_SearchTag_Component__Callback_TagToAdd_Params ) => {

                                            this.props.searchTagCategoryEntry.searchTags_DistinctInProject__InCategory.push( params.searchTagEntry )

                                            this.setState({ force_Rerender: {} })
                                        } }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

/////////////////////////////////

//   Select Search Tag

///////////

/**
 *
 */
class SelectTagEntry_Component_Props {
    searchTagEntry: Internal_SearchTagEntry
    searchTagCategories_DistinctInProject: Array<Internal_SearchTagCategory_Entry>
    callbackOn_RemoveTagId : (tagId: number) => void;
    callbackOn_ChangeTag : (tagId: number) => void;
    callbackOn_EditTag : (tagId: number) => void;
}

/**
 *
 */
class SelectTagEntry_OverlayComponent_State {

    showDeletingMessage?: boolean
    force_Rerender?: object
}

/**
 *
 */
class SelectTagEntry_OverlayComponent extends React.Component< SelectTagEntry_Component_Props, SelectTagEntry_OverlayComponent_State > {

    /**
     *
     */
    constructor(props: SelectTagEntry_Component_Props) {
        super(props);

        this.state = {
            showDeletingMessage: false
        };
    }

    /**
     *
     */
    private _editEntry() {
        try {
            this.props.callbackOn_EditTag( this.props.searchTagEntry.tagId )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _deleteEntry() {
        try {
            if ( ! window.confirm( "delete tag '" + this.props.searchTagEntry.tagString + "'?" ) ) {
                return; // EARLY RETURN
            }

            this.setState({ showDeletingMessage: true })

            const promise = _searchTag__Delete_For_TagId({ tagId: this.props.searchTagEntry.tagId })

            promise.catch(reason => {

                // this.props.callbackOn_RemoveTagId( this.props.searchTagEntry.tagId )
            })

            promise.then(value => { try {

                this.props.callbackOn_RemoveTagId( this.props.searchTagEntry.tagId )

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        return (
            <>
                <div
                    style={ { display: "inline-block", whiteSpace: "nowrap", paddingBottom: 5, marginRight: 10 } }
                >
                    <div
                        className=" standard-border-color-gray "
                        style={ { borderStyle: "solid", borderWidth: 1, borderRadius: 10, paddingLeft: 2, paddingRight: 2, paddingTop: 6, paddingBottom: 6 } }
                    >
                        {/*  Display the Tag  */}
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "Click to Edit Tag"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                style={ { backgroundColor: this.props.searchTagEntry.tag_Color_Background, color: this.props.searchTagEntry.tag_Color_Font } }
                                className=" clickable search-tag-display-everywhere "
                                onClick={ event => {

                                    if ( limelight__IsTextSelected() ) {
                                        return
                                    }

                                    this._editEntry()
                                }}
                            >
                                { this.props.searchTagEntry.tagString }
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        <span> </span>
                        <span> </span>

                        { this.state.showDeletingMessage ? (

                            <span
                                style={ { marginLeft: 10 } }
                            >
                                Deleting tag...
                            </span>

                        ) : (
                            <>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        "Edit Tag '" + this.props.searchTagEntry.tagString + "'"
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <img
                                        src="static/images/icon-edit.png"
                                        className="icon-small clickable "
                                        onClick={ event => {
                                            this._editEntry()
                                        }}
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                <span> </span>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        "Delete Tag '" + this.props.searchTagEntry.tagString + "'"
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <img
                                        src="static/images/icon-circle-delete.png"
                                        className="icon-small clickable  "
                                        onClick={ event => {
                                            this._deleteEntry();
                                        }}
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </>
                        )}
                    </div>
                </div>
            </>
        )
    }
}


/////////////////////////////////

//   Edit Search Tag

///////////

class MoveTagToCategoryId_Params {
    tagId: number
    categoryId_Old: number
    categoryId_New: number
}

type CallbackOn_MoveTagToCategoryId_Type = ( params: MoveTagToCategoryId_Params ) => void

/**
 *
 */
class SelectTagEntry_EDIT_CHANGE_Component_Props {
    searchTagEntry: Internal_SearchTagEntry
    searchTagCategories_DistinctInProject: Array<Internal_SearchTagCategory_Entry>
    callbackOn_ChangeTag : (tagId: number) => void;
    callbackOn_MoveTagToCategoryId : CallbackOn_MoveTagToCategoryId_Type
    callbackOn_Close : () => void
}

/**
 *
 */
class SelectTagEntry_EDIT_CHANGE_Component_State {

    force_Rerender?: object
}

/**
 *
 */
class SelectTagEntry_EDIT_CHANGE_Component extends React.Component< SelectTagEntry_EDIT_CHANGE_Component_Props, SelectTagEntry_EDIT_CHANGE_Component_State > {

    private _inputField_TagString_Ref: React.RefObject<HTMLInputElement>
    private _inputField_CategorySelect_Ref: React.RefObject<HTMLSelectElement>

    private _tag_Color: Internal_SelectTagColor_OverlayComponent_Color_Entry

    private _display_tag_colorPicker_Overlay = false;
    private _tagString_Empty = false

    private _tagString_Duplicate_ErrorMessage: boolean = false
    private _newTagString_Required_ErrorMessage = false;

    /**
     *
     */
    constructor(props: SelectTagEntry_EDIT_CHANGE_Component_Props) {
        super(props);

        this._inputField_TagString_Ref = React.createRef();
        this._inputField_CategorySelect_Ref = React.createRef();

        this._tag_Color = { backgroundColor: props.searchTagEntry.tag_Color_Background, fontColor: props.searchTagEntry.tag_Color_Font };

        this.state = {
        };
    }

    /**
     *
     */
    private _saveTag(): void {
        try {
            if ( ! this._inputField_TagString_Ref.current ) {
                return; // EARLY RETURN
            }
            if ( ! this._inputField_CategorySelect_Ref.current ) {
                return; // EARLY RETURN
            }

            const tagString : string = this._inputField_TagString_Ref.current.value.substring(0, SearchTag_Max_FieldLengths_Constants.SEARCH_TAG_MAX_LENGTH__TAG_STRING )

            if ( tagString === "" ) {
                this._newTagString_Required_ErrorMessage = true;
                this.setState({ force_Rerender: {} })

                return; // EARLY RETURN
            }

            const categoryId_String = this._inputField_CategorySelect_Ref.current.value;

            let categoryId: number = null;

            if ( categoryId_String !== "" ) {
                categoryId = Number.parseInt( categoryId_String )
                if ( Number.isNaN( categoryId ) ) {
                    throw Error("categoryId_String is not empty string or valid number. categoryId_String: " + categoryId_String );
                }
            }

            const searchTagToSave: Internal_SearchTagEntry = {
                tagId: this.props.searchTagEntry.tagId,
                tag_category_id: categoryId,
                tagString: tagString,
                tag_Color_Font: this._tag_Color.fontColor,
                tag_Color_Background: this._tag_Color.backgroundColor,
                tag_Color_Border: null,
                tag_Added: true
            }

            const promise = _searchTags_TagChange_UpdateServer(searchTagToSave )

            promise.catch(reason => {

                this.props.callbackOn_Close()
            })

            promise.then(value => { try {

                if ( ! value.statusSuccess ) {

                    if ( value.duplicate ) {

                        this._tagString_Duplicate_ErrorMessage = true;
                        this.setState({ force_Rerender: {} })

                    } else {

                        const msg = "( ! value.statusSuccess ) AND NOT ( value.duplicate )"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    return; // EARLY RETURN
                }

                //  Update

                let callbackOn_MoveTagToCategoryIdParams: MoveTagToCategoryId_Params

                if ( searchTagToSave.tag_category_id !== this.props.searchTagEntry.tag_category_id ) {

                    callbackOn_MoveTagToCategoryIdParams = {
                        tagId: this.props.searchTagEntry.tagId,
                        categoryId_Old: this.props.searchTagEntry.tag_category_id,
                        categoryId_New: searchTagToSave.tag_category_id
                    };
                }

                this.props.searchTagEntry.tagString = tagString;
                this.props.searchTagEntry.tag_category_id = categoryId;
                this.props.searchTagEntry.tag_Color_Background = this._tag_Color.backgroundColor;
                this.props.searchTagEntry.tag_Color_Font = this._tag_Color.fontColor

                if ( callbackOn_MoveTagToCategoryIdParams ) {
                    this.props.callbackOn_MoveTagToCategoryId(callbackOn_MoveTagToCategoryIdParams)
                }

                this.props.callbackOn_ChangeTag( this.props.searchTagEntry.tagId );

                this.props.callbackOn_Close()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        return (
            <>
                <div
                    style={ { display: "grid", gridTemplateColumns: "1fr min-content 1fr" } }
                >
                    <div></div>
                    <div
                        className=" standard-border-color-gray "
                        style={ { borderStyle: "solid", borderWidth: 2, padding: 20 } }
                    >
                        <div
                            style={ { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 20 } }
                        >
                            Edit Tag
                        </div>

                        <div
                            style={ { display: "grid", gridTemplateColumns: "min-content min-content" } }
                        >
                            <div style={ { whiteSpace: "nowrap", marginRight: 10 } }>
                                Tag Name:
                            </div>
                            <div
                                style={ { marginBottom: 6 } }
                            >
                                <input
                                    ref={ this._inputField_TagString_Ref }
                                    defaultValue={ this.props.searchTagEntry.tagString }
                                    maxLength={ SearchTag_Max_FieldLengths_Constants.SEARCH_TAG_MAX_LENGTH__TAG_STRING }
                                    placeholder="New Tag String"
                                    style={ { width: 280 } }
                                    onChange={ event => {
                                        //  Clear error message if set
                                        if ( this._newTagString_Required_ErrorMessage || this._tagString_Duplicate_ErrorMessage ) {
                                            this._newTagString_Required_ErrorMessage = false;
                                            this._tagString_Duplicate_ErrorMessage = false
                                            this.setState({ force_Rerender: {} })
                                        }
                                        if ( event.target.value.length === 0 ) {
                                            this._tagString_Empty = true;
                                            this.setState({ force_Rerender: {} })
                                        } else {
                                            if ( this._tagString_Empty ) {
                                                this._tagString_Empty = false;
                                                this.setState({ force_Rerender: {} })
                                            }
                                        }
                                    }}
                                />
                            </div>

                            <div style={ { whiteSpace: "nowrap" } }>
                                Category:
                            </div>

                            <div
                                style={ { marginBottom: 6 } }
                            >
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        "Change and then click 'Save Tag' to move to different category"
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <select
                                        ref={ this._inputField_CategorySelect_Ref }
                                        defaultValue={ this.props.searchTagEntry.tag_category_id ? this.props.searchTagEntry.tag_category_id : "" }
                                        onChange={ event => {
                                            //  Clear error message if set
                                            if ( this._tagString_Duplicate_ErrorMessage ) {
                                                this._tagString_Duplicate_ErrorMessage = false
                                                this.setState({ force_Rerender: {} })
                                            }
                                        }}
                                    >
                                        <option
                                            value=""
                                        >
                                            Uncategorized
                                        </option>
                                        { this.props.searchTagCategories_DistinctInProject.map( searchTagCategory => {
                                            return (
                                                <option
                                                    key={ searchTagCategory.tagCategoryId }
                                                    value={ searchTagCategory.tagCategoryId }
                                                >
                                                    { searchTagCategory.categoryLabel }
                                                </option>
                                            )
                                        })}
                                    </select>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </div>

                            <div style={ { gridColumn: "1 / -1"}}>

                                {/*  Span all columns  */}

                                {/*  Overlay Tag Color Picker  */}

                                { this._display_tag_colorPicker_Overlay ? (
                                    <SelectTagColor_OverlayComponent
                                        callbackOn_ColorSelected={
                                            ( params: Internal_SelectTagColor_OverlayComponent_Color_Entry ) => {
                                                this._tag_Color = params;
                                                this._display_tag_colorPicker_Overlay = false;
                                                this.setState({ force_Rerender: {} })
                                            }
                                        }
                                        callbackOn_MouseLeave={
                                            () => {
                                                this._display_tag_colorPicker_Overlay = false;
                                                this.setState({ force_Rerender: {} })
                                            }
                                        }
                                    />
                                ) : null }

                            </div>

                            <div style={ { whiteSpace: "nowrap" } }>
                                Color:
                            </div>


                            <div
                                style={ { marginBottom: 6 } }
                            >
                                <div
                                    style={ { display: "inline-block", marginLeft: 3, marginRight: 3 } }
                                >
                                    <div
                                        style={ { display: "inline-block" } }
                                    >
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                "Click to change the color for this tag"
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <div
                                                className=" clickable search-tag-display-everywhere "
                                                style={ { display: "inline-block", marginRight: 0, backgroundColor: this._tag_Color.backgroundColor, color: this._tag_Color.fontColor  } }
                                                onClick={ event => {
                                                    event.stopPropagation()
                                                    this._display_tag_colorPicker_Overlay = true;
                                                    this.setState({ force_Rerender: {} })
                                                }}
                                            >
                                                Choose Color
                                            </div>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div
                            style={ { whiteSpace: "nowrap", position: "relative" } }
                        >
                            <div style={ { display: "inline-block", position: "relative" } }>
                                <input
                                    type="button"
                                    value="Save Tag"
                                    disabled={ this._tagString_Empty }
                                    onClick={ event => {
                                        this._saveTag()
                                    }}
                                />
                                { this._tagString_Empty ? (
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            "Tag String required"
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <div
                                            style={ { position: "absolute", inset: 0 }}
                                        ></div>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                ) : null }
                            </div>

                            <span> </span>
                            <button
                                onClick={ event => {
                                    event.preventDefault()
                                    event.stopPropagation();

                                    this.props.callbackOn_Close()
                                }}
                            >
                                Cancel
                            </button>

                        </div>

                        { this._tagString_Duplicate_ErrorMessage ? (
                            <div  className=" error-text" style={ { marginTop: 10 } }>
                                <span>This Tag Name and Category combination already exists.  Please change the Tag Name and/or Category.</span>
                            </div>
                        ) : null }
                    </div>
                    <div></div>
                </div>
            </>
        )
    }
}

//////////   Delete Category Overlay

/**
 *
 */
class DeleteCategory_Overlay_Component_Props {
    searchTagCategory_Entry: Internal_SearchTagCategory_Entry
    callbackOn_RemoveTagCategoryId : (tagCategoryId: number) => void;
    callbackOn_Cancel: () => void
}

/**
 *
 */
class DeleteCategory_Overlay_Component_State {

    showDeletingMessage?: boolean
    force_Rerender?: object
}

/**
 *
 */
class DeleteCategory_Overlay_Component extends React.Component< DeleteCategory_Overlay_Component_Props, DeleteCategory_Overlay_Component_State > {

    /**
     *
     */
    constructor(props: DeleteCategory_Overlay_Component_Props) {
        super(props);

        this.state = {
            showDeletingMessage: false
        };
    }

    /**
     *
     */
    private _delete_Category() {
        try {
            this.setState({ showDeletingMessage: true })

            const promise = _searchTagCategories__Delete_For_TagCategoryId({ tagCategoryId: this.props.searchTagCategory_Entry.tagCategoryId })

            promise.catch(reason => {

            })

            promise.then(value => { try {

                this.props.callbackOn_RemoveTagCategoryId( this.props.searchTagCategory_Entry.tagCategoryId )

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        return (
            <>

                <div
                    className=" standard-border-color-gray "
                    style={ { borderStyle: "solid", borderWidth: 2, padding: 20, minWidth: 320 } }
                >
                    { ! this.state.showDeletingMessage ? (
                        <>
                            <div
                                style={ { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 20 } }
                            >
                                Delete Category
                            </div>

                            <div>
                                <span>Delete Category '</span>
                                <span
                                    style={ { whiteSpace: "nowrap", fontWeight: "bold" } }
                                >
                                    { this.props.searchTagCategory_Entry.categoryLabel }
                                </span>
                                <span>'</span>
                            </div>
                            <div
                                style={ { marginTop: 6, marginBottom: 10 } }
                            >
                                <button
                                    onClick={ event => {
                                        this._delete_Category()
                                    }}
                                >
                                    Delete
                                </button>
                                <span> </span>
                                <button
                                    onClick={ event => {
                                        this.props.callbackOn_Cancel()
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>

                            { this.props.searchTagCategory_Entry.searchTags_DistinctInProject__InCategory &&
                            this.props.searchTagCategory_Entry.searchTags_DistinctInProject__InCategory.length > 0 ? (
                                <div>
                                    <div
                                        style={ { marginBottom: 10 } }
                                    >
                                        These tags under this category will also be deleted:
                                    </div>
                                    <div>
                                        { this.props.searchTagCategory_Entry.searchTags_DistinctInProject__InCategory.map( (tag, index) => {
                                            return (
                                                <div
                                                    key={ tag.tagId }
                                                    style={ { display: "inline-block", marginBottom: 10 } }
                                                >
                                                    <span
                                                        className=" search-tag-display-everywhere "
                                                        style={ { backgroundColor: tag.tag_Color_Background, color: tag.tag_Color_Font } }
                                                    >
                                                        { tag.tagString }
                                                    </span>
                                                    <span> </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ) : null }
                        </>
                    ) : (
                        <>
                            <div>
                                <div style={ { marginTop: 40, textAlign: "center" }}>
                                    Deleting Category
                                </div>
                                <div style={ { paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
                                    <Spinner_Limelight_Component/>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </>
        )
    }
}



////////////////////

//  Child Components

/////////////

//   New Search Tag Input

class Internal__New_SearchTag_Component__Callback_TagToAdd_Params {
    searchTagEntry: Internal_SearchTagEntry
}

/**
 *
 */
interface Internal__New_SearchTag_Component_Props {

    tag_category_id: number
    tag_category_label: string

    mainParams: Search_Tags_Manage_TagsForProject_MainParams

    searchTagCategories_DistinctInProject: Array<Internal_SearchTagCategory_Entry>

    callback_TagToAdd : (params: Internal__New_SearchTag_Component__Callback_TagToAdd_Params ) => void;
}

/**
 *
 */
interface Internal__New_SearchTag_Component_State {

    showLoadingMessage?: boolean
    showUpdatingMessage_Main_OverlayWholeScrollableDiv ?: boolean
    force_Rerender?: object
}

/**
 *
 */
class Internal__New_SearchTag_Component extends React.Component< Internal__New_SearchTag_Component_Props, Internal__New_SearchTag_Component_State > {

    private _inputField_NewTagString_Ref: React.RefObject<HTMLInputElement>

    private _addTag_SavingTag_Block_Ref: React.RefObject<HTMLDivElement>
    private _addTag_MainBlock_Ref: React.RefObject<HTMLDivElement>

    private _newTag_Color: Internal_SelectTagColor_OverlayComponent_Color_Entry = SearchTag_ColorOptions_Constants._SEARCH_TAG__COLOR__DEFAULT;


    private _newTagString_Required_ErrorMessage = false;
    private _newTagString_Duplicate_ErrorMessage = false;

    private _newTagString_Empty = true;

    private _display_tag_colorPicker_Overlay = false;

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: Internal__New_SearchTag_Component_Props) {
        super(props);


        //  Tag
        this._inputField_NewTagString_Ref = React.createRef();
        this._addTag_SavingTag_Block_Ref = React.createRef();
        this._addTag_MainBlock_Ref = React.createRef();

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
    private _change_NewTag_Color(params: Internal_SelectTagColor_OverlayComponent_Color_Entry) : void {

        this._newTag_Color = params

        this.setState({ force_Rerender: {} })
    }

    /**
     *
     */
    private _addTag(): void {
        try {
            if ( ! this._inputField_NewTagString_Ref.current ) {
                return; // EARLY RETURN
            }

            const tagString : string = this._inputField_NewTagString_Ref.current.value.trim().substring(0, SearchTag_Max_FieldLengths_Constants.SEARCH_TAG_MAX_LENGTH__TAG_STRING )

            if ( tagString === "" ) {
                this._newTagString_Required_ErrorMessage = true;
                this.setState({ force_Rerender: {} })

                return; // EARLY RETURN
            }

            const searchTagToAdd: Internal_SearchTagEntry = {
                tagId: undefined,
                tag_category_id: this.props.tag_category_id,
                tagString: tagString,
                tag_Color_Font: this._newTag_Color.fontColor,
                tag_Color_Background: this._newTag_Color.backgroundColor,
                tag_Color_Border: null,
                tag_Added: true
            }

            if ( ! this._addTag_MainBlock_Ref.current ) {
                return;
            }
            if ( ! this._addTag_SavingTag_Block_Ref.current ) {
                return;
            }

            this._addTag_MainBlock_Ref.current.style.display = "none"
            this._addTag_SavingTag_Block_Ref.current.style.display = ""

            const promise = _searchTags__Add_New_For_ProjectId({ projectIdentifier: this.props.mainParams.projectIdentifier, searchTagToAdd })

            promise.catch(reason => {

                if ( ! this._addTag_MainBlock_Ref.current ) {
                    return;
                }
                if ( ! this._addTag_SavingTag_Block_Ref.current ) {
                    return;
                }

                this._addTag_SavingTag_Block_Ref.current.style.display = "none"
                this._addTag_MainBlock_Ref.current.style.display = ""
            })

            promise.then(value => { try {

                if ( ! this._addTag_MainBlock_Ref.current ) {
                    return;
                }
                if ( ! this._addTag_SavingTag_Block_Ref.current ) {
                    return;
                }

                this._addTag_SavingTag_Block_Ref.current.style.display = "none"
                this._addTag_MainBlock_Ref.current.style.display = ""

                if ( ! value.statusSuccess ) {

                    if ( value.duplicate ) {

                        this._newTagString_Duplicate_ErrorMessage = true;
                        this.setState({ force_Rerender: {} })

                    } else {

                        const msg = "( ! value.statusSuccess ) AND NOT ( value.duplicate )"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    return; // EARLY RETURN
                }

                //  Add
                this.props.callback_TagToAdd({
                    searchTagEntry: {
                        tagId: value.tag_id,
                        tag_category_id: this.props.tag_category_id,
                        tagString: tagString,
                        tag_Color_Font: this._newTag_Color.fontColor,
                        tag_Color_Background: this._newTag_Color.backgroundColor,
                        tag_Color_Border: null,
                        tag_Added: true
                    }
                })

                this._inputField_NewTagString_Ref.current.value = ""
                this._newTagString_Empty = true;

                this.setState({ force_Rerender: {} })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        let marginTop_OuterBlock: number = null
        let marginBottom_OuterBlock = 8

        if ( this.props.tag_category_id !== undefined && this.props.tag_category_id !== null ) {
            marginTop_OuterBlock = 5
            marginBottom_OuterBlock = 5
        }


        return (
            <div style={ { marginTop: marginTop_OuterBlock, marginBottom: marginBottom_OuterBlock } }>

                <div style={ { marginBottom: 5, fontWeight: "bold" } }>
                    <span>Add new tag </span>

                    { ! ( this.props.tag_category_id === undefined || this.props.tag_category_id === null ) ? (
                        <>
                            <span> to category '</span>
                            <span>{ this.props.tag_category_label }</span>
                            <span>'</span>
                        </>
                    ) : null }

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={
                            <span>
                                <span>Use the form below to add new tags by entering a name and choosing a color.</span>
                                <span> </span>
                                <span>The tag will be added to the project and available to add to searches</span>
                            </span>
                        }
                    />
                </div>

                <div
                    ref={ this._addTag_MainBlock_Ref }
                    style={ { position: "relative" } }
                >
                    <div>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "New Tag String"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <input
                                ref={ this._inputField_NewTagString_Ref }
                                maxLength={ SearchTag_Max_FieldLengths_Constants.SEARCH_TAG_MAX_LENGTH__TAG_STRING }
                                placeholder="New Tag String"
                                style={ { width: 200 } }
                                onChange={ event => {
                                    //  Clear error message if set
                                    if ( this._newTagString_Required_ErrorMessage || this._newTagString_Duplicate_ErrorMessage ) {
                                        this._newTagString_Required_ErrorMessage = false;
                                        this._newTagString_Duplicate_ErrorMessage = false
                                        this.setState({ force_Rerender: {} })
                                    }
                                    if ( event.target.value.length === 0 ) {
                                        this._newTagString_Empty = true;
                                        this.setState({ force_Rerender: {} })
                                    } else {
                                        if ( this._newTagString_Empty ) {
                                            this._newTagString_Empty = false;
                                            this.setState({ force_Rerender: {} })
                                        }
                                    }
                                }}
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        <span> </span>

                        <div
                            style={ { display: "inline-block", marginLeft: 3, marginRight: 3 } }
                        >
                            <div
                                style={ { display: "inline-block" } }
                            >
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        "Click to change the color for this tag"
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <div
                                        className=" clickable search-tag-display-everywhere "
                                        style={ { display: "inline-block", marginRight: 0, backgroundColor: this._newTag_Color.backgroundColor, color: this._newTag_Color.fontColor } }
                                        onClick={ event => {
                                            event.stopPropagation()
                                            this._display_tag_colorPicker_Overlay = true;
                                            this.setState({ force_Rerender: {} })
                                        }}
                                    >
                                        Choose Color
                                    </div>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </div>
                        </div>

                        <span> </span>
                        <div style={ { display: "inline-block", position: "relative" } }>
                            <button
                                disabled={ this._newTagString_Empty }
                                onClick={ event => {
                                    this._addTag()
                                } }
                            >
                                Add Tag
                            </button>
                            { this._newTagString_Empty ? (
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        "Tag String required"
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <div
                                        style={ { position: "absolute", inset: 0 }}
                                    ></div>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            ) : null }

                        </div>
                    </div>

                    { this._newTagString_Required_ErrorMessage ? (
                        <div className=" error-text " >
                            Tag String Required
                        </div>
                    ) : null }
                    { this._newTagString_Duplicate_ErrorMessage ? (
                        <div className=" error-text " >
                            Tag String already Exists
                        </div>
                    ) : null }

                    {/*  Overlay Tag Color Picker  */}

                    { this._display_tag_colorPicker_Overlay ? (
                        <SelectTagColor_OverlayComponent
                            callbackOn_ColorSelected={
                                ( params: Internal_SelectTagColor_OverlayComponent_Color_Entry ) => {
                                    this._change_NewTag_Color(params)
                                    this._display_tag_colorPicker_Overlay = false;
                                    this.setState({ force_Rerender: {} })
                                }
                            }
                            callbackOn_MouseLeave={
                                () => {
                                    this._display_tag_colorPicker_Overlay = false;
                                    this.setState({ force_Rerender: {} })
                                }
                            }
                        />
                    ) : null }

                </div>

                {/*  Saving Tag Message for Add Tag  */}
                <div
                    ref={ this._addTag_SavingTag_Block_Ref }
                    style={ { position: "relative", display: "none" } }
                >
                    Saving Tag...
                </div>

            </div>

        )
    }
}





///////////////////////////////

/**
 *
 */
class SelectTagColor_OverlayComponent_Props {

    callbackOn_ColorSelected : (params: Internal_SelectTagColor_OverlayComponent_Color_Entry) => void;
    callbackOn_MouseLeave : () => void;
}

/**
 *
 */
class SelectTagColor_OverlayComponent_State {

    placeholder?: any
}

/**
 *
 */
class SelectTagColor_OverlayComponent extends React.Component< SelectTagColor_OverlayComponent_Props, SelectTagColor_OverlayComponent_State > {

    /**
     *
     */
    constructor(props: SelectTagColor_OverlayComponent_Props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div
                className=" select-color-display-div "
                style={ {
                    whiteSpace: "normal",  //  Override whiteSpace: "nowrap" when "Edit"
                    position: "absolute",
                    padding: 4,
                    top: 0,
                    left: 0,
                    minWidth: 310,
                    zIndex: 9999
                } }
                onMouseLeave={ event => {
                    this.props.callbackOn_MouseLeave()
                }}
            >
                <div
                    className=" "
                    style={ { display: "inline-block", marginBottom: 10 } }
                >
                    Click one of the sample tags to choose that color
                </div>

                <div style={ { color: "black" } }>
                    {
                        SearchTag_ColorOptions_Constants._SEARCH_TAG__COLOR_SELECTIONS.map((value, index) => {
                            return (
                                <div
                                    key={ index }
                                    className=" clickable search-tag-display-everywhere "
                                    style={ { display: "inline-block", marginBottom: 10, color: value.fontColor, backgroundColor: value.backgroundColor } }
                                    onClick={ event => {
                                        event.stopPropagation();
                                        this.props.callbackOn_ColorSelected(value)
                                    }}
                                >
                                    Sample Tag
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

////////////////////////

//  Private code

//  SEARCH TAG CATEGORY

class Internal_SearchTagCategory_Entry {

    tagCategoryId: number
    categoryLabel: string
    label_Color_Font: string
    label_Color_Background: string
    label_Color_Border: string
    
    searchTags_DistinctInProject__InCategory: Array<Internal_SearchTagEntry>
}

/**
 *
 */
const _searchTagCategories__Add_New_For_ProjectId = function(
    {
        projectIdentifier, searchTagCategoryToAdd
    } : {
        projectIdentifier: string
        searchTagCategoryToAdd: Internal_SearchTagCategory_Entry
    }
) : Promise<{
    statusSuccess: boolean ;
    searchTagCategoryId: number;
    duplicate: boolean ;
}> {

    return new Promise<{
        statusSuccess: boolean ;
        searchTagCategoryId: number;
        duplicate: boolean ;
    }> ( ( resolve, reject ) => {
        try {
            let requestObj = {
                projectIdentifier,
                category_label: searchTagCategoryToAdd.categoryLabel,
                label_Color_Font: searchTagCategoryToAdd.label_Color_Font,
                label_Color_Background: searchTagCategoryToAdd.label_Color_Background
            };

            const url = "d/rws/for-page/search-tags-add-single-search-tag-category-for-project-id-or-project-search-id-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    resolve({
                        statusSuccess: responseData.statusSuccess,
                        searchTagCategoryId: responseData.searchTagCategoryId,
                        duplicate: responseData.duplicate
                    });

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
 * @param tagId
 * @private
 */
const _searchTagCategories__Delete_For_TagCategoryId = function (
    {
        tagCategoryId
    } : {
        tagCategoryId: number
    } ) : Promise<void> {

    return new Promise<void> ( ( resolve, reject ) => {
        try {
            let requestObj = {
                tagCategoryId
            };

            const url = "d/rws/for-page/search-tag-categories-delete-single-search-tag-category-for-tag-category-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    if ( ! responseData.statusSuccess ) {
                        throw Error("( ! responseData.statusSuccess ): URL: " + url )
                    }

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
 * @param searchTagToSave
 * @private
 */
const _searchTagCategories_TagCategoryChange_UpdateServer = function(searchTagCategoryToSave: Internal_SearchTagCategory_Entry) : Promise<{
    statusSuccess: boolean ;
    duplicate: boolean ;
}> {

    return new Promise<{
        statusSuccess: boolean ;
        duplicate: boolean ;
    }> ( ( resolve, reject ) => {
        try {
            let requestObj = {
                tagCategoryId: searchTagCategoryToSave.tagCategoryId,
                category_label: searchTagCategoryToSave.categoryLabel,
                label_Color_Font: searchTagCategoryToSave.label_Color_Font,
                label_Color_Background: searchTagCategoryToSave.label_Color_Background
            };

            const url = "d/rws/for-page/search-tag-categories-update-single-search-tag-category-for-tag-category-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    if ( ! responseData.statusSuccess ) {
                        throw Error("( ! responseData.statusSuccess ): URL: " + url )
                    }

                    resolve({
                        statusSuccess: responseData.statusSuccess,
                        duplicate: responseData.duplicate
                    });

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



/////////

//  SEARCH TAG

class Internal_SearchTagEntry {

    tagId: number  //  Negative for newly added tags
    tag_category_id: number;  // null if uncategorized
    tagString: string
    tag_Color_Font: string
    tag_Color_Background: string
    tag_Color_Border: string
    tag_Added: boolean
}

/**
 *
 */
const _searchTags__Add_New_For_ProjectId = function(
    {
        projectIdentifier, searchTagToAdd
    } : {
        projectIdentifier: string
        searchTagToAdd: Internal_SearchTagEntry
    }
) : Promise<{
    statusSuccess: boolean ;
    tag_id: number;
    duplicate: boolean ;
}> {

    return new Promise<{
        statusSuccess: boolean ;
        tag_id: number;
        duplicate: boolean ;
    }> ( ( resolve, reject ) => {
        try {
            let requestObj = {
                projectIdentifier,
                tag_category_id: searchTagToAdd.tag_category_id,
                tag_string: searchTagToAdd.tagString,
                tag_Color_Font: searchTagToAdd.tag_Color_Font,
                tag_Color_Background: searchTagToAdd.tag_Color_Background
            };

            const url = "d/rws/for-page/search-tags-add-single-search-tag-for-project-id-or-project-search-id-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    resolve({
                        statusSuccess: responseData.statusSuccess,
                        tag_id: responseData.tag_id,
                        duplicate: responseData.duplicate
                    });

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
 * @param tagId
 * @private
 */
const _searchTag__Delete_For_TagId = function (
    {
        tagId
    } : {
        tagId: number
    } ) : Promise<void> {

    return new Promise<void> ( ( resolve, reject ) => {
        try {
            let requestObj = {
                tagId
            };

            const url = "d/rws/for-page/search-tags-delete-single-search-tag-for-tag-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    if ( ! responseData.statusSuccess ) {
                        throw Error("( ! responseData.statusSuccess ): URL: " + url )
                    }

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
 * @param searchTagToSave
 * @private
 */
const _searchTags_TagChange_UpdateServer = function(searchTagToSave: Internal_SearchTagEntry) : Promise<{
    statusSuccess: boolean ;
    duplicate: boolean ;
}> {

    return new Promise<{
        statusSuccess: boolean ;
        duplicate: boolean ;
    }> ( ( resolve, reject ) => {
        try {
            let requestObj = {
                tagId: searchTagToSave.tagId,
                tag_category_id: searchTagToSave.tag_category_id,
                tag_string: searchTagToSave.tagString,
                tag_Color_Font: searchTagToSave.tag_Color_Font,
                tag_Color_Background: searchTagToSave.tag_Color_Background
            };

            const url = "d/rws/for-page/search-tags-update-single-search-tag-for-tag-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    resolve({
                        statusSuccess: responseData.statusSuccess,
                        duplicate: responseData.duplicate
                    });

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
