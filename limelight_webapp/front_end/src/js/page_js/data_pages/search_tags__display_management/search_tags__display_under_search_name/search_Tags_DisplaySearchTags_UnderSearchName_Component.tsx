/**
 * search_Tags_DisplaySearchTags_UnderSearchName_Component.tsx
 *
 * Search Tags UI Element for Display Search Tags Under Search Name
 *
 * Also used when NO Search Tags to display the "Add Tags" fake link
 *
 *
 */

import React from 'react'
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/////

const _UNCATEGORIZED_LABEL_CONSTANT = "Uncategorized"

/**
 * Currently same as class Search_Tags_SelectSearchTags_Component_SearchTagData_Root
 * so can receive same data.
 * Code will need to change if these classes for input data change
 */
export class Search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root {

    readonly searchTagCategory_Array: ReadonlyArray<Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTagCategory_Entry>
    readonly searchTag_Array: ReadonlyArray<Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry>
}

export class Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTagCategory_Entry {

    readonly category_id: number;
    readonly category_label: string;
    readonly label_Color_Font: string;
    readonly label_Color_Background: string;
    readonly label_Color_Border: string;

}

export class Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry {

    readonly tagId: number;
    readonly tagCategoryId: number;  //  null if uncategorized
    readonly tagString: string;
    readonly tag_Color_Font: string;
    readonly tag_Color_Background: string;
    readonly tag_Color_Border: string;
}

//////

/**
 *
 */
interface Search_Tags_DisplaySearchTags_UnderSearchName_Component_Props {

    show_SearchTag_Categories: boolean

    searchTagIds_OnSearch_Set: ReadonlySet<number>
    searchTagData_Root: Search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root
    addTag_Clicked_Callback: () => void         //  Not set if not project owner
    changeTags_Clicked_Callback: () => void     //  Not set if not project owner
}

/**
 *
 */
interface Search_Tags_DisplaySearchTags_UnderSearchName_Component_State {

    searchTagData_Root_Prev?: Search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root
    searchTagData_Display_Root?: INTERNAL__SearchTagData_Display_Root
    force_Rerender?: object
}

/**
 *
 */
export class Search_Tags_DisplaySearchTags_UnderSearchName_Component extends React.Component< Search_Tags_DisplaySearchTags_UnderSearchName_Component_Props, Search_Tags_DisplaySearchTags_UnderSearchName_Component_State > {

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: Search_Tags_DisplaySearchTags_UnderSearchName_Component_Props) {
        super(props);

        this.state = {
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
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     *
     * !!!  WARNING:  the type for params and returned value is not validated to the class
     */
    static getDerivedStateFromProps(props: Search_Tags_DisplaySearchTags_UnderSearchName_Component_Props, state: Search_Tags_DisplaySearchTags_UnderSearchName_Component_State) : Search_Tags_DisplaySearchTags_UnderSearchName_Component_State {

        if ( props.searchTagData_Root === state.searchTagData_Root_Prev ) {
            //  Nothing changed so just return
            return null; // EARLY RETURN
        }

        if ( ! props.searchTagData_Root ) {
            //  Nothing to process yet
            return null; // EARLY RETURN
        }

        //  Build internal data structure from props

        const categoryMap_Key_Id: Map<number, INTERNAL__SingleSearchTagCategory_Entry> = new Map()
        const searchTags_Uncategorized_Array_In_DisplayOrder: Array<INTERNAL__Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry> = []
        const searchTags_All_Array_In_DisplayOrder: Array<INTERNAL__Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry> = []

        for ( const category of props.searchTagData_Root.searchTagCategory_Array ) {
            if ( categoryMap_Key_Id.has( category.category_id ) ) {
                const msg = "Duplicate category_id in props.searchTagData_Root.searchTagCategory_Array";
                console.warn(msg)
                throw Error(msg)
            }
            categoryMap_Key_Id.set(category.category_id, { tagCategory_Entry: category, all_SearchTagIds_InCategory_Set: new Set<number>(), all_SearchTags_InCategory_In_DisplayOrder: [] })
        }

        for ( const tag of props.searchTagData_Root.searchTag_Array ) {
            let tag_uncategorized = false;
            if ( tag.tagCategoryId === undefined || tag.tagCategoryId === null ) {
                tag_uncategorized = true;
            } else {
                const category_ForId = categoryMap_Key_Id.get( tag.tagCategoryId );
                if ( ! category_ForId ) {
                    tag_uncategorized = true;
                } else {
                    category_ForId.all_SearchTags_InCategory_In_DisplayOrder.push({ tag_Entry: tag })
                }
            }
            if ( tag_uncategorized ) {
                searchTags_Uncategorized_Array_In_DisplayOrder.push({ tag_Entry: tag })
            }

            searchTags_All_Array_In_DisplayOrder.push({ tag_Entry: tag })
        }

        const searchTagCategory_Array_In_DisplayOrder: Array<INTERNAL__SingleSearchTagCategory_Entry> =
            Array.from( categoryMap_Key_Id.values() )

        searchTagCategory_Array_In_DisplayOrder.sort( (a,b) => {
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam( a.tagCategory_Entry.category_label, b.tagCategory_Entry.category_label )
        })

        for ( const searchTagCategory of searchTagCategory_Array_In_DisplayOrder ) {
            searchTagCategory.all_SearchTags_InCategory_In_DisplayOrder.sort( (a, b) => {
                return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.tag_Entry.tagString, b.tag_Entry.tagString)
            })

            for ( const tag of searchTagCategory.all_SearchTags_InCategory_In_DisplayOrder ) {
                searchTagCategory.all_SearchTagIds_InCategory_Set.add(tag.tag_Entry.tagId)
            }
        }

        searchTags_Uncategorized_Array_In_DisplayOrder.sort( (a, b) => {
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.tag_Entry.tagString, b.tag_Entry.tagString)
        })

        searchTags_All_Array_In_DisplayOrder.sort( (a, b) => {
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.tag_Entry.tagString, b.tag_Entry.tagString)
        })

        const searchTagData_Display_Root: INTERNAL__SearchTagData_Display_Root = {
            searchTagCategory_Array_In_DisplayOrder, searchTags_Uncategorized_Array_In_DisplayOrder, searchTags_All_Array_In_DisplayOrder
        }

        return { searchTagData_Display_Root }
    }

    /**
     *
     */
    render(): React.ReactNode {

        if ( ! this.state.searchTagData_Display_Root ) {
            //  Nothing to render yet
            return null; // EARLY RETURN
        }

        const categoryLabel_Style: React.CSSProperties = { marginTop: 4, marginRight: 6, fontWeight: "bold", whiteSpace: "nowrap" }

        const categoriesAndTheirSearchTags_Elements: Array<React.JSX.Element> = [];

        let uncategorizedSearchTags_Element: React.JSX.Element = null;

        let searchTagsOnly_Element: React.JSX.Element = null

        let add_Change_Tags_Element: React.JSX.Element

        if ( this.props.searchTagIds_OnSearch_Set && this.props.searchTagIds_OnSearch_Set.size > 0 ) {
            //  Have Search Tags on This Search

            if ( this.props.show_SearchTag_Categories ) {
                //  Showing the Search Categories

                for ( const categoryEntry of this.state.searchTagData_Display_Root.searchTagCategory_Array_In_DisplayOrder ) {

                    let searchHasAtLeastOneTagInThisCategory = false;

                    for (const tagIdOnSearch of this.props.searchTagIds_OnSearch_Set) {

                        if ( categoryEntry.all_SearchTagIds_InCategory_Set.has( tagIdOnSearch ) ) {
                            searchHasAtLeastOneTagInThisCategory = true;
                            break;
                        }
                    }

                    //    Comment out to show categories with no search tags
                    // if ( ! searchHasAtLeastOneTagInThisCategory ) {
                    //     //  Search has NO tag ids in this category so skip category
                    //     continue; // EARLY CONTINUE
                    // }

                    const searchTags_Elements: Array<React.JSX.Element> = [];
                    let searchTags_Elements_NONE: React.JSX.Element

                    if ( searchHasAtLeastOneTagInThisCategory ) {
                        for (const tagEntry of categoryEntry.all_SearchTags_InCategory_In_DisplayOrder) {

                            if (!this.props.searchTagIds_OnSearch_Set.has(tagEntry.tag_Entry.tagId)) {
                                //  Search does not have this tag id so skip
                                continue;
                            }

                            const tagElement = this._render_SingleSearchTag({ tag_Internal: tagEntry, category_label: categoryEntry.tagCategory_Entry.category_label });
                            searchTags_Elements.push(tagElement)
                        }
                    } else {
                        searchTags_Elements_NONE = (
                            <div
                                style={ { marginTop: 5, marginBottom: 3 } }
                            >
                                { "<None>"}
                            </div>
                        )
                    }

                    const element = (
                        <React.Fragment key={ categoryEntry.tagCategory_Entry.category_id  }>
                            {/*  column 1:  Category Label  */}
                            <div style={ categoryLabel_Style }>
                                <span>{ categoryEntry.tagCategory_Entry.category_label }</span>
                                <span>:</span>
                            </div>
                            {/*  column 2:  Search Tags  */}
                            <div>
                                { searchTags_Elements }
                                { searchTags_Elements_NONE }
                            </div>
                        </React.Fragment>
                    )

                    categoriesAndTheirSearchTags_Elements.push(element)
                }
                {
                    if ( this.state.searchTagData_Display_Root.searchTags_Uncategorized_Array_In_DisplayOrder.length > 0 ) {

                        const searchTags_Elements: Array<React.JSX.Element> = [];

                        for ( const tagEntry of this.state.searchTagData_Display_Root.searchTags_Uncategorized_Array_In_DisplayOrder ) {

                            if ( ! this.props.searchTagIds_OnSearch_Set.has( tagEntry.tag_Entry.tagId ) ) {
                                //  Search does not have this tag id so skip
                                continue;
                            }

                            const tagElement = this._render_SingleSearchTag({ tag_Internal: tagEntry, category_label: _UNCATEGORIZED_LABEL_CONSTANT });
                            searchTags_Elements.push(tagElement)
                        }

                        if ( searchTags_Elements.length > 0 ) {
                            uncategorizedSearchTags_Element = (
                                <React.Fragment>
                                    {/*  column 1:  Category Label  */}
                                    <div style={ categoryLabel_Style }>
                                        { _UNCATEGORIZED_LABEL_CONSTANT + ":"  }
                                    </div>
                                    {/*  column 2:  Search Tags  */}
                                    <div>
                                        { searchTags_Elements }
                                    </div>
                                </React.Fragment>
                            )
                        }

                    }
                }

            } else {
                //  NOT showing Categories.  ONLY showing search tags

                if ( this.state.searchTagData_Display_Root.searchTags_All_Array_In_DisplayOrder.length > 0 ) {

                    const searchTag_ElementArray: Array<React.JSX.Element> = []

                    if ( this.state.searchTagData_Display_Root.searchTagCategory_Array_In_DisplayOrder ) {
                        for ( const categoryEntry of this.state.searchTagData_Display_Root.searchTagCategory_Array_In_DisplayOrder ) {

                            for (const tagEntry of categoryEntry.all_SearchTags_InCategory_In_DisplayOrder) {

                                if (!this.props.searchTagIds_OnSearch_Set.has(tagEntry.tag_Entry.tagId)) {
                                    //  Search does not have this tag id so skip
                                    continue;
                                }

                                const tagElement = this._render_SingleSearchTag({ tag_Internal: tagEntry, category_label: categoryEntry.tagCategory_Entry.category_label });
                                searchTag_ElementArray.push(tagElement)
                            }
                        }
                    }
                    if ( this.state.searchTagData_Display_Root.searchTags_Uncategorized_Array_In_DisplayOrder ) {

                        for (const tagEntry of this.state.searchTagData_Display_Root.searchTags_Uncategorized_Array_In_DisplayOrder) {

                            if (!this.props.searchTagIds_OnSearch_Set.has(tagEntry.tag_Entry.tagId)) {
                                //  Search does not have this tag id so skip
                                continue;
                            }

                            const tagElement = this._render_SingleSearchTag({ tag_Internal: tagEntry, category_label: _UNCATEGORIZED_LABEL_CONSTANT });
                            searchTag_ElementArray.push(tagElement)
                        }
                    }

                    searchTagsOnly_Element = (
                        <div>
                            { searchTag_ElementArray }
                        </div>
                    )
                }
            }

            if ( this.props.changeTags_Clicked_Callback ) {
                add_Change_Tags_Element = (
                    <div>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Change tags on this search
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                        <span
                            className=" fake-link "
                            style={ { whiteSpace: "nowrap" } }
                            onClick={ this.props.changeTags_Clicked_Callback }
                        >
                            Change Tags
                        </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                )
            }

        } else {

            if ( this.props.addTag_Clicked_Callback ) {
                add_Change_Tags_Element = (
                    <div>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Add tags to this search
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                className=" fake-link "
                                style={ { whiteSpace: "nowrap" } }
                                onClick={ this.props.addTag_Clicked_Callback }
                            >
                                +Add Tag
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                )
            }
        }

        if ( this.props.show_SearchTag_Categories ) {

            return (  //  EARLY RETURN

                <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr" } }>
                    {/*  2 Column Grid.  Column 1: Category Label or 'Uncategorized'.  Column 2: Tags  */}

                    { categoriesAndTheirSearchTags_Elements.length > 0 ? (

                        categoriesAndTheirSearchTags_Elements

                    ) : null }

                    { uncategorizedSearchTags_Element }
                    { add_Change_Tags_Element }
                </div>
            )
        }

        //  NOT show categories

        return (

            <div >
                {/*  All tags.  No Categories  */}
                { searchTagsOnly_Element }
                { add_Change_Tags_Element }
            </div>
        )
    }

    /**
     *
     * @param tag_Internal
     * @private
     */
    private _render_SingleSearchTag(
        {
            tag_Internal, category_label
        } : {
            tag_Internal: INTERNAL__Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry
            category_label: string
        }) : React.JSX.Element {

        const tag_Entry = tag_Internal.tag_Entry

        const div_Outer_Style: React.CSSProperties = { display: "inline-block", marginBottom: 2 };

        const div_Inner_Style: React.CSSProperties = {  backgroundColor: tag_Entry.tag_Color_Background, color: tag_Entry.tag_Color_Font };

        return (
            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                key={ tag_Entry.tagId }
                title={
                    //  NOTE:  Any <div> inside a tooltip should have:  className=" word-break-break-word-backup-break-all "
                    <div style={ { width: "100%", display: "grid", gridTemplateColumns: "max-content 1fr", rowGap: 5, columnGap: 5 } }>
                        <div style={ { fontWeight: "bold", textAlign: "right" } }>Category:</div>
                        <div className=" word-break-break-word-backup-break-all ">{ category_label }</div>
                        <div style={ { fontWeight: "bold", textAlign: "right" } }>Tag:</div>
                        <div className=" word-break-break-word-backup-break-all ">{ tag_Entry.tagString }</div>
                    </div>
                }
                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
            >
                <div
                    key={ tag_Entry.tagId }
                    style={ div_Outer_Style }
                >
                    <div
                        className=" search-tag-display-everywhere "
                        style={ div_Inner_Style }
                    >
                        { tag_Entry.tagString }
                    </div>
                </div>
            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
        )
    }
}

class INTERNAL__SearchTagData_Display_Root {

    searchTagCategory_Array_In_DisplayOrder: Array<INTERNAL__SingleSearchTagCategory_Entry>

    searchTags_Uncategorized_Array_In_DisplayOrder: Array<INTERNAL__Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry>

    searchTags_All_Array_In_DisplayOrder: Array<INTERNAL__Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry>
}

class INTERNAL__SingleSearchTagCategory_Entry {

    readonly tagCategory_Entry: Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTagCategory_Entry

    all_SearchTagIds_InCategory_Set: Set<number>
    all_SearchTags_InCategory_In_DisplayOrder: Array<INTERNAL__Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry>
}

class INTERNAL__Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry {

    tag_Entry: Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry
}
