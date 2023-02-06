/**
 * search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component.tsx
 *
 * Search Tags UI Element for Display Search Tags and Categories that are Filter On
 *
 *
 */

import React from 'react'
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";

/////


export class Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_SearchTagData_Root {

    readonly searchTagCategory_Array: ReadonlyArray<Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTagCategory_Entry>
    readonly searchTag_Array: ReadonlyArray<Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTag_Entry>
}

export class Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTagCategory_Entry {

    readonly category_id: number;
    readonly category_label: string;
    readonly label_Color_Font: string;
    readonly label_Color_Background: string;
    readonly label_Color_Border: string;

}

export class Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTag_Entry {

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
interface Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_Props {
    searchTagData_Root: Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_SearchTagData_Root
    searchTagIdsSelected: Set<number>
    clearSelection_Callback: () => void
}

/**
 *
 */
interface Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_State {

    searchTagData_Root_Prev?: Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_SearchTagData_Root
    searchTagData_Display_Root?: INTERNAL__SearchTagData_Display_Root
    force_Rerender?: object
}

/**
 *
 */
export class Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component extends React.Component< Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_Props, Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_State > {

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_Props) {
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
    static getDerivedStateFromProps(props: Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_Props, state: Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_State) : Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_State {

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
        const searchTags_Uncategorized_Array_In_DisplayOrder: Array<INTERNAL__Search_Tags_FilterOnSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTag_Entry> = []

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

        const searchTagData_Display_Root: INTERNAL__SearchTagData_Display_Root = {
            searchTagCategory_Array_In_DisplayOrder, searchTags_Uncategorized_Array_In_DisplayOrder
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

        const categoriesAndTheirSearchTags_Elements: Array<JSX.Element> = [];

        {
            for ( const categoryEntry of this.state.searchTagData_Display_Root.searchTagCategory_Array_In_DisplayOrder ) {

                if ( categoryEntry.all_SearchTags_InCategory_In_DisplayOrder.length === 0 ) {
                    //  No Search Tags for Category so SKIP
                    continue; // EARLY CONTINUE
                }

                //  Skip if no tags selected
                let anyTagSelected = false;
                for ( const tagIdSelected of this.props.searchTagIdsSelected ) {
                    if ( categoryEntry.all_SearchTagIds_InCategory_Set.has( tagIdSelected ) ) {
                        anyTagSelected = true;
                        break;
                    }
                }
                if ( ! anyTagSelected ) {
                    //  No Tag selected so skip
                    continue; // EARLY CONTINUE
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
                            { categoryEntry.all_SearchTags_InCategory_In_DisplayOrder.map( (tag, index, array) => {
                                return this._render_SingleSearchTag(tag)
                            })}
                        </div>
                    </React.Fragment>
                )

                categoriesAndTheirSearchTags_Elements.push(element)
            }
        }

        let uncategorizedSearchTags_Elements: JSX.Element = null;

        {
            if ( this.state.searchTagData_Display_Root.searchTags_Uncategorized_Array_In_DisplayOrder.length > 0 ) {

                //  Skip if no tags selected
                let anyTagSelected = false;
                for ( const searchTag of  this.state.searchTagData_Display_Root.searchTags_Uncategorized_Array_In_DisplayOrder ) {
                    if ( this.props.searchTagIdsSelected.has( searchTag.tag_Entry.tagId ) ) {
                        anyTagSelected = true;
                        break;
                    }
                }
                if ( anyTagSelected ) {
                    //  Have at least one uncategorized Tag selected so process

                    uncategorizedSearchTags_Elements = (
                        <React.Fragment>
                            {/*  column 1:  Category Label  */}
                            <div style={ categoryLabel_Style }>
                                Uncategorized:
                            </div>
                            {/*  column 2:  Search Tags  */}
                            <div>
                                { this.state.searchTagData_Display_Root.searchTags_Uncategorized_Array_In_DisplayOrder.map( (tag, index, array) => {
                                    return this._render_SingleSearchTag(tag)
                                })}
                            </div>
                        </React.Fragment>
                    )
                }
            }
        }

        return (

            <>
                <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr" } }>
                    {/*  2 Column Grid.  Column 1: Category Label or 'Uncategorized'.  Column 2: Tags  */}

                    { categoriesAndTheirSearchTags_Elements.length > 0 ? (

                        categoriesAndTheirSearchTags_Elements

                    ) : null }

                    { uncategorizedSearchTags_Elements }
                </div>
                <div style={ { fontSize: 10, marginBottom: 10 } }>
                    <span
                        className=" fake-link "
                        style={ { fontSize: 10 } }
                        title="Clear tag filters"
                        onClick={ this.props.clearSelection_Callback }
                    >
                        clear
                    </span>
                </div>
            </>

        )
    }

    /**
     *
     * @param tag_Internal
     * @private
     */
    private _render_SingleSearchTag( tag_Internal: INTERNAL__Search_Tags_FilterOnSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTag_Entry ) : JSX.Element {

        const tag_Entry = tag_Internal.tag_Entry

        if ( ! this.props.searchTagIdsSelected.has( tag_Entry.tagId ) ) {
            //  NOT selected tag so skip
            return null;  // EARLY RETURN
        }

        const div_Outer_Style: React.CSSProperties = { display: "inline-block", marginBottom: 2 };

        const div_Inner_Style: React.CSSProperties = {  backgroundColor: tag_Entry.tag_Color_Background, color: tag_Entry.tag_Color_Font };

        return (
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
        )
    }
}

class INTERNAL__SearchTagData_Display_Root {

    searchTagCategory_Array_In_DisplayOrder: Array<INTERNAL__SingleSearchTagCategory_Entry>

    searchTags_Uncategorized_Array_In_DisplayOrder: Array<INTERNAL__Search_Tags_FilterOnSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTag_Entry>
}

class INTERNAL__SingleSearchTagCategory_Entry {

    readonly tagCategory_Entry: Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTagCategory_Entry

    all_SearchTagIds_InCategory_Set: Set<number>
    all_SearchTags_InCategory_In_DisplayOrder: Array<INTERNAL__Search_Tags_FilterOnSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTag_Entry>
}

class INTERNAL__Search_Tags_FilterOnSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTag_Entry {

    tag_Entry: Search_Tags_SelectSearchTags_DisplaySelectedTagsAndCategories_Component_SingleSearchTag_Entry
}
