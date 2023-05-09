/**
 * search_Tags_SelectSearchTags_Component.tsx
 *
 * Search Tags UI Element for User to select Search Tags to Filter On
 *
 *
 */

import React from 'react'
import {limelight__IsTextSelected} from "page_js/common_all_pages/limelight__IsTextSelected";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";
import {Search_Tags_Selections_Object} from "page_js/data_pages/search_tags__display_management/search_Tags_Selections_Object";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import ReactDOM from "react-dom";
import {
    tooltip_Limelight_Create_Tooltip,
    Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";

/////


const _SELECTION_BORDER_WIDTH = 3;




export class Search_Tags_SelectSearchTags_Component_SearchTagData_Root {

    readonly searchTagCategory_Array: ReadonlyArray<Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry>
    readonly searchTag_Array: ReadonlyArray<Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>
}

export class Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry {

    readonly category_id: number;
    readonly category_label: string;
    readonly label_Color_Font: string;
    readonly label_Color_Background: string;
    readonly label_Color_Border: string;

}

export class Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry {

    readonly tagId: number;
    readonly tagCategoryId: number;  //  null if uncategorized
    readonly tagString: string;
    readonly tag_Color_Font: string;
    readonly tag_Color_Background: string;
    readonly tag_Color_Border: string;
}



export class Search_Tags_SelectSearchTags_Component_SelectedSearchTagIds_Callback_Params {

    // searchTagIdsSelected: Set<number>

    search_Tags_Selections_Object: Search_Tags_Selections_Object
}

export type Search_Tags_SelectSearchTags_Component_SelectedSearchTagIds_Callback =
    ( params: Search_Tags_SelectSearchTags_Component_SelectedSearchTagIds_Callback_Params ) => void


//////

/**
 *
 */
interface Search_Tags_SelectSearchTags_Component_Props {
    searchTagData_Root: Search_Tags_SelectSearchTags_Component_SearchTagData_Root
    search_Tags_Selections_Object: Search_Tags_Selections_Object
    searchTagsSelected_Changed_Callback: Search_Tags_SelectSearchTags_Component_SelectedSearchTagIds_Callback
}

/**
 *
 */
interface Search_Tags_SelectSearchTags_Component_State {

    searchTagData_Root_Prev?: Search_Tags_SelectSearchTags_Component_SearchTagData_Root
    searchTagData_Display_Root?: INTERNAL__SearchTagData_Display_Root
    force_Rerender?: object
}

/**
 *
 */
export class Search_Tags_SelectSearchTags_Component extends React.Component< Search_Tags_SelectSearchTags_Component_Props, Search_Tags_SelectSearchTags_Component_State > {

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: Search_Tags_SelectSearchTags_Component_Props) {
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
    static getDerivedStateFromProps(props: Search_Tags_SelectSearchTags_Component_Props, state: Search_Tags_SelectSearchTags_Component_State) : Search_Tags_SelectSearchTags_Component_State {

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
        const searchTags_Uncategorized_Array_In_DisplayOrder: Array<INTERNAL__Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry> = []

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

        const categoryLabel_Style: React.CSSProperties = { marginTop: 7, marginRight: 6, fontWeight: "bold", whiteSpace: "nowrap" }

        const categoriesAndTheirSearchTags_Elements: Array<JSX.Element> = [];

        {
            for ( const categoryEntry of this.state.searchTagData_Display_Root.searchTagCategory_Array_In_DisplayOrder ) {

                if ( categoryEntry.all_SearchTags_InCategory_In_DisplayOrder.length === 0 ) {
                    //  No Search Tags for Category so SKIP
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

        return (

            <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr" } }>
                {/*  2 Column Grid.  Column 1: Category Label or 'Uncategorized'.  Column 2: Tags  */}

                { categoriesAndTheirSearchTags_Elements.length > 0 ? (

                    categoriesAndTheirSearchTags_Elements

                ) : null }

                { uncategorizedSearchTags_Elements }


            </div>

        )
    }

    /**
     *
     * @param tag_Internal
     * @private
     */
    private _render_SingleSearchTag( tag_Internal: INTERNAL__Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry ) : JSX.Element {

        return (
            <INTERNAL__Search_Tag_SINGLE_Component
                key={ tag_Internal.tag_Entry.tagId }
                tag_Internal={ tag_Internal }
                search_Tags_Selections_Object={ this.props.search_Tags_Selections_Object }

                searchTagsSelected_Changed_Callback={ this.props.searchTagsSelected_Changed_Callback }
            />
        )
    }
}

////////////////////////////////////////

//  INTERNAL   React Components



/**
 *
 */
interface INTERNAL__Search_Tag_SINGLE_Component_Props {

    tag_Internal: INTERNAL__Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry
    search_Tags_Selections_Object: Search_Tags_Selections_Object

    searchTagsSelected_Changed_Callback: Search_Tags_SelectSearchTags_Component_SelectedSearchTagIds_Callback
}

/**
 *
 */
interface INTERNAL__Search_Tag_SINGLE_Component_State {

    force_Rerender?: object
}

/**
 *
 */
export class INTERNAL__Search_Tag_SINGLE_Component extends React.Component< INTERNAL__Search_Tag_SINGLE_Component_Props, INTERNAL__Search_Tag_SINGLE_Component_State > {

    private _onClick_Handler_BindThis = this._onClick_Handler.bind(this)

    private readonly _entry_Ref :  React.RefObject<HTMLDivElement>

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: INTERNAL__Search_Tag_SINGLE_Component_Props) {
        super(props);

        this._entry_Ref = React.createRef();

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
     *
     */
    private _onClick_Handler( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            if ( limelight__IsTextSelected() ) {
                //  Text is selected so skip
                return; // EARLY RETURN
            }

            const targetDOMElement_domRect = this._entry_Ref.current.getBoundingClientRect();

            /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

            const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
            // const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
            // const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
            const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;

            const windowScroll_X = window.scrollX;
            const windowScroll_Y = window.scrollY;

            const position_Left = targetDOMElement_domRect_Left  + windowScroll_X;
            const position_Top = targetDOMElement_domRect_Bottom + windowScroll_Y;

            INTERNAL__filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Create({
                position_Left,
                position_Top,
                tag_Internal: this.props.tag_Internal,
                search_Tags_Selections_Object: this.props.search_Tags_Selections_Object,

                searchTagsSelected_Changed_Callback: this.props.searchTagsSelected_Changed_Callback,
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const tag_Entry = this.props.tag_Internal.tag_Entry

        const div_Outer_Style: React.CSSProperties = { display: "inline-block", marginBottom: 2 };

        const div_Inner_Style: React.CSSProperties = {  backgroundColor: tag_Entry.tag_Color_Background, color: tag_Entry.tag_Color_Font };

        let className_Addition_Inner = "";
        let tooltip_Inner: string

        if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND.has( tag_Entry.tagId ) ) {

            div_Inner_Style.borderStyle = "solid"
            div_Inner_Style.borderWidth = _SELECTION_BORDER_WIDTH;
            div_Inner_Style.borderColor = "black"

            let tooltipStart: string

            if (
                this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND.size === 1 &&
                this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR.size === 0 &&
                this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT.size === 0
            ) {
                tooltipStart = "The search will have this tag."

            } else {
                tooltipStart = "The search will have this tag AND any other tags with the AND designation."

            }

            tooltip_Inner = tooltipStart + "\n\nClick to change or remove filter on this tag"

        } else if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR.has( tag_Entry.tagId ) ) {

            div_Inner_Style.borderStyle = "dashed"
            div_Inner_Style.borderWidth = _SELECTION_BORDER_WIDTH;
            div_Inner_Style.borderColor = "black"

            tooltip_Inner = "The search will have this tag OR any other tags with the OR designation.\n\nClick to change or remove filter on this tag."

        } else if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT.has( tag_Entry.tagId ) ) {

            // div_Inner_Style.borderStyle = "solid"
            // div_Inner_Style.borderWidth = _SELECTION_BORDER_WIDTH;
            // div_Inner_Style.borderColor = "red"

            className_Addition_Inner += " search-tag-display-everywhere--not-selection "

            tooltip_Inner = "The search will not have this tag OR any other any other EXCLUDED tags.\n\nClick to change or remove filter on this tag."

        } else {
            div_Outer_Style.padding = _SELECTION_BORDER_WIDTH;

            tooltip_Inner = "Click to filter on this tag"
        }

        return (
            <div
                key={ tag_Entry.tagId }
                style={ div_Outer_Style }
            >
                <div
                    ref={ this._entry_Ref }
                    className={ " clickable search-tag-display-everywhere " + className_Addition_Inner }
                    style={ div_Inner_Style }
                    title={ tooltip_Inner }
                    onClick={ this._onClick_Handler_BindThis }
                >
                    { tag_Entry.tagString }
                </div>
            </div>
        )
    }
}



////////////////////////////////////////

//  INTERNAL   Data Classes

class INTERNAL__SearchTagData_Display_Root {

    searchTagCategory_Array_In_DisplayOrder: Array<INTERNAL__SingleSearchTagCategory_Entry>

    searchTags_Uncategorized_Array_In_DisplayOrder: Array<INTERNAL__Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>
}

class INTERNAL__SingleSearchTagCategory_Entry {

    readonly tagCategory_Entry: Search_Tags_SelectSearchTags_Component_SingleSearchTagCategory_Entry

    all_SearchTagIds_InCategory_Set: Set<number>
    all_SearchTags_InCategory_In_DisplayOrder: Array<INTERNAL__Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>
}

class INTERNAL__Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry {

    tag_Entry: Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry
}


///////////////

//    Overlay for selecting "AND" "OR" "NOT" "REMOVE" or Close



/**
 *
 */
const INTERNAL__filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Create = function (
    {
        position_Left,
        position_Top,
        tag_Internal,
        search_Tags_Selections_Object,

        searchTagsSelected_Changed_Callback,
    } : {
        position_Left : number
        position_Top : number
        tag_Internal: INTERNAL__Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry
        search_Tags_Selections_Object: Search_Tags_Selections_Object

        searchTagsSelected_Changed_Callback: Search_Tags_SelectSearchTags_Component_SelectedSearchTagIds_Callback
    }) {


    const overlay_addedDivElementDOM = document.createElement("div");

    var documentBody = document.querySelector('body');

    documentBody.appendChild( overlay_addedDivElementDOM );

    const close_Selected_Callback = () => {

        overlay_addedDivElementDOM.style.display = "none"; // Hide Tooltip from view

        //  React Unmount

        ReactDOM.unmountComponentAtNode( overlay_addedDivElementDOM );

        //  Remove containing <div> from DOM

        overlay_addedDivElementDOM.remove();
    }

    const renderCompletecallbackFcn = ( ) => { };

    const overlay_ComponentElement = (
        React.createElement(
            INTERNAL__Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay,
            {
                position_Left,
                position_Top,
                tag_Internal,
                search_Tags_Selections_Object,

                searchTagsSelected_Changed_Callback,
                close_Selected_Callback
            },
            null
        )
    );
    const overlay_Component = ReactDOM.render(
        overlay_ComponentElement,
        overlay_addedDivElementDOM,
        renderCompletecallbackFcn
    );
}

/**
 *
 */
interface INTERNAL__Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Props {

    position_Left : number
    position_Top : number
    tag_Internal: INTERNAL__Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry
    search_Tags_Selections_Object: Search_Tags_Selections_Object

    searchTagsSelected_Changed_Callback: Search_Tags_SelectSearchTags_Component_SelectedSearchTagIds_Callback
    close_Selected_Callback : () => void;
}

interface INTERNAL__Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_State { //  Keep shouldComponentUpdate up to date
    placeHolder?: any
}

/**
 *
 */
class INTERNAL__Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay extends React.Component< INTERNAL__Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Props, INTERNAL__Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_State > {

    //  bind to 'this' for passing as parameters
    private _selectionOverlay_Background_Clicked_BindThis = this._selectionOverlay_Background_Clicked.bind(this);
    private _choice_ANY_Clicked_BindThis = this._choice_ANY_Clicked.bind(this)
    private _choice_ALL_Clicked_BindThis = this._choice_ALL_Clicked.bind(this)
    private _choice_NOT_Clicked_BindThis = this._choice_NOT_Clicked.bind(this)
    private _choice_Remove_Clicked_BindThis = this._choice_Remove_Clicked.bind(this)
    private _close_SelectionOverlay_Clicked_BindThis = this._close_SelectionOverlay_Clicked.bind(this)

    /**
     *
     */
    constructor(props: INTERNAL__Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Props) {
        super(props);

    }

    /**
     *
     */
    private _close_SelectionOverlay( ) {

        this.props.close_Selected_Callback()
    }

    /**
     * direct from onClick on element
     */
    private _selectionOverlay_Background_Clicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            this.props.close_Selected_Callback()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_ANY_Clicked() {
        try {
            this._close_SelectionOverlay()

            const tagId = this.props.tag_Internal.tag_Entry.tagId;

            let searchTagIdsSelected_Boolean__OR: Set<number>
            let searchTagIdsSelected_Boolean__AND: Set<number>
            let searchTagIdsSelected_Boolean__NOT: Set<number>

            if ( this.props.search_Tags_Selections_Object ) {

                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR ) {
                    searchTagIdsSelected_Boolean__OR = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR )
                }
                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND ) {
                    searchTagIdsSelected_Boolean__AND = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND )
                }
                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT ) {
                    searchTagIdsSelected_Boolean__NOT = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT )
                }
            }

            if ( ! searchTagIdsSelected_Boolean__OR ) {
                searchTagIdsSelected_Boolean__OR = new Set()
            }
            if ( ! searchTagIdsSelected_Boolean__AND ) {
                searchTagIdsSelected_Boolean__AND = new Set()
            }
            if ( ! searchTagIdsSelected_Boolean__NOT ) {
                searchTagIdsSelected_Boolean__NOT = new Set()
            }

            if ( searchTagIdsSelected_Boolean__AND.size === 1 &&
                searchTagIdsSelected_Boolean__OR.size === 0 &&
                searchTagIdsSelected_Boolean__NOT.size === 0
            ) {
                //  ONLY selection is a single "AND", change that "AND" to "OR" and then add this tag id to "OR"
                for ( const entry of searchTagIdsSelected_Boolean__AND ) {
                    searchTagIdsSelected_Boolean__OR.add( entry );
                }
                searchTagIdsSelected_Boolean__AND.clear()
            }

            searchTagIdsSelected_Boolean__OR.add( tagId )
            searchTagIdsSelected_Boolean__AND.delete( tagId )
            searchTagIdsSelected_Boolean__NOT.delete( tagId )

            const search_Tags_Selections_Object = new Search_Tags_Selections_Object({
                searchTagIdsSelected_Boolean__OR,
                searchTagIdsSelected_Boolean__AND,
                searchTagIdsSelected_Boolean__NOT
            })

            this.props.searchTagsSelected_Changed_Callback({ search_Tags_Selections_Object })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_ALL_Clicked() {
        try {
            this._close_SelectionOverlay()

            const tagId = this.props.tag_Internal.tag_Entry.tagId;

            let searchTagIdsSelected_Boolean__OR: Set<number>
            let searchTagIdsSelected_Boolean__AND: Set<number>
            let searchTagIdsSelected_Boolean__NOT: Set<number>

            if ( this.props.search_Tags_Selections_Object ) {

                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR ) {
                    searchTagIdsSelected_Boolean__OR = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR )
                }
                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND ) {
                    searchTagIdsSelected_Boolean__AND = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND )
                }
                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT ) {
                    searchTagIdsSelected_Boolean__NOT = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT )
                }
            }

            if ( ! searchTagIdsSelected_Boolean__OR ) {
                searchTagIdsSelected_Boolean__OR = new Set()
            }
            if ( ! searchTagIdsSelected_Boolean__AND ) {
                searchTagIdsSelected_Boolean__AND = new Set()
            }
            if ( ! searchTagIdsSelected_Boolean__NOT ) {
                searchTagIdsSelected_Boolean__NOT = new Set()
            }

            searchTagIdsSelected_Boolean__AND.add( tagId )
            searchTagIdsSelected_Boolean__OR.delete( tagId )
            searchTagIdsSelected_Boolean__NOT.delete( tagId )

            const search_Tags_Selections_Object = new Search_Tags_Selections_Object({
                searchTagIdsSelected_Boolean__OR,
                searchTagIdsSelected_Boolean__AND,
                searchTagIdsSelected_Boolean__NOT
            })

            this.props.searchTagsSelected_Changed_Callback({ search_Tags_Selections_Object })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_NOT_Clicked() {
        try {
            this._close_SelectionOverlay()

            const tagId = this.props.tag_Internal.tag_Entry.tagId;

            let searchTagIdsSelected_Boolean__OR: Set<number>
            let searchTagIdsSelected_Boolean__AND: Set<number>
            let searchTagIdsSelected_Boolean__NOT: Set<number>

            if ( this.props.search_Tags_Selections_Object ) {

                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR ) {
                    searchTagIdsSelected_Boolean__OR = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR )
                }
                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND ) {
                    searchTagIdsSelected_Boolean__AND = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND )
                }
                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT ) {
                    searchTagIdsSelected_Boolean__NOT = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT )
                }
            }

            if ( ! searchTagIdsSelected_Boolean__OR ) {
                searchTagIdsSelected_Boolean__OR = new Set()
            }
            if ( ! searchTagIdsSelected_Boolean__AND ) {
                searchTagIdsSelected_Boolean__AND = new Set()
            }
            if ( ! searchTagIdsSelected_Boolean__NOT ) {
                searchTagIdsSelected_Boolean__NOT = new Set()
            }

            searchTagIdsSelected_Boolean__NOT.add( tagId )
            searchTagIdsSelected_Boolean__OR.delete( tagId )
            searchTagIdsSelected_Boolean__AND.delete( tagId )

            const search_Tags_Selections_Object = new Search_Tags_Selections_Object({
                searchTagIdsSelected_Boolean__OR,
                searchTagIdsSelected_Boolean__AND,
                searchTagIdsSelected_Boolean__NOT
            })

            this.props.searchTagsSelected_Changed_Callback({ search_Tags_Selections_Object })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_Remove_Clicked() {
        try {
            this._close_SelectionOverlay()

            const tagId = this.props.tag_Internal.tag_Entry.tagId;

            let searchTagIdsSelected_Boolean__OR: Set<number>
            let searchTagIdsSelected_Boolean__AND: Set<number>
            let searchTagIdsSelected_Boolean__NOT: Set<number>

            if ( this.props.search_Tags_Selections_Object ) {

                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR ) {
                    searchTagIdsSelected_Boolean__OR = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR )
                }
                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND ) {
                    searchTagIdsSelected_Boolean__AND = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND )
                }
                if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT ) {
                    searchTagIdsSelected_Boolean__NOT = new Set( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT )
                }
            }

            if ( ! searchTagIdsSelected_Boolean__OR ) {
                searchTagIdsSelected_Boolean__OR = new Set()
            }
            if ( ! searchTagIdsSelected_Boolean__AND ) {
                searchTagIdsSelected_Boolean__AND = new Set()
            }
            if ( ! searchTagIdsSelected_Boolean__NOT ) {
                searchTagIdsSelected_Boolean__NOT = new Set()
            }

            searchTagIdsSelected_Boolean__NOT.delete( tagId )
            searchTagIdsSelected_Boolean__OR.delete( tagId )
            searchTagIdsSelected_Boolean__AND.delete( tagId )

            const search_Tags_Selections_Object = new Search_Tags_Selections_Object({
                searchTagIdsSelected_Boolean__OR,
                searchTagIdsSelected_Boolean__AND,
                searchTagIdsSelected_Boolean__NOT
            })

            this.props.searchTagsSelected_Changed_Callback({ search_Tags_Selections_Object })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _close_SelectionOverlay_Clicked( event : React.MouseEvent<HTMLElement, MouseEvent> ) {
        try {
            this._close_SelectionOverlay()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }



    /**
     *
     */
    render() {

        let current_selection_SelectionType_ANY = false
        let current_selection_SelectionType_ALL = false
        let current_selection_SelectionType_NOT = false
        let current_selection_SelectionType_NotSelected = false

        if ( this.props.search_Tags_Selections_Object ) {
            if ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR &&
                this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR.has( this.props.tag_Internal.tag_Entry.tagId ) ) {
                current_selection_SelectionType_ANY = true
            } else if (
                this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND &&
                this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND.has( this.props.tag_Internal.tag_Entry.tagId ) ) {
                current_selection_SelectionType_ALL = true
            } else if (
                this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT &&
                this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT.has( this.props.tag_Internal.tag_Entry.tagId ) ) {
                current_selection_SelectionType_NOT = true
            } else {
                current_selection_SelectionType_NotSelected = true
            }
        }

        let show_Add_Option_InsteadOf_OR_AND = true;

        if ( this.props.search_Tags_Selections_Object &&
            (
                ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND &&
                    this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__AND.size > 0 ) ||
                ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR &&
                    this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__OR.size > 0 ) ||
                ( this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT &&
                    this.props.search_Tags_Selections_Object.searchTagIdsSelected_Boolean__NOT.size > 0 )
            ) ) {
            show_Add_Option_InsteadOf_OR_AND = false
        }

        const overlayPosition_Left = this.props.position_Left
        const overlayPosition_Top = this.props.position_Top

        return (
            <div >

                {/* Background under the dialog to close if clicked */}
                <div className="modal-overlay-page-background " style={ { backgroundColor: "transparent", zIndex: 1009 } } onClick={ this._selectionOverlay_Background_Clicked_BindThis } ></div> {/*  has z-index 1001  */}
                {/* Main Overlay */}
                <div style={ { position : "absolute", left: overlayPosition_Left, top: overlayPosition_Top, paddingTop: 8, paddingLeft: 8, paddingRight: 8, paddingBottom: 6, borderWidth: 3, borderStyle: "solid", backgroundColor: "white", zIndex: 1010 } }
                     className="standard-border-color-very-dark"
                >
                    <div>
                        { show_Add_Option_InsteadOf_OR_AND ? (
                            //  Show ADD button
                            <div style={ { display : "inline-block", position: "relative", paddingBottom: 2 } }>
                                <INTERNAL__OverlayUpdateButton
                                    buttonLabel={ "ADD" }
                                    isCurrentSelection={ current_selection_SelectionType_ALL }
                                    buttonTooltip_MainText={ "All searches will have this tag" }
                                    buttonTooltip_WhenCurrentSelectionText={ "Current Selection" }
                                    buttonClicked_Callback={ this._choice_ALL_Clicked_BindThis }
                                />
                            </div>
                        ) : (
                            //  Show OR and AND buttons
                            <React.Fragment>
                                <div style={ { display : "inline-block", position: "relative", paddingBottom: 2 } }>
                                    <INTERNAL__OverlayUpdateButton
                                        buttonLabel={ "OR" }
                                        isCurrentSelection={ current_selection_SelectionType_ANY }
                                        buttonTooltip_MainText={ "Add to OR set. All searches will contain at least one tag in the OR set." }
                                        buttonTooltip_WhenCurrentSelectionText={ "Current Selection" }
                                        buttonClicked_Callback={ this._choice_ANY_Clicked_BindThis }
                                    />
                                </div>
                                <span > </span>
                                <div style={ { display : "inline-block", position: "relative", paddingBottom: 2 } }>
                                    <INTERNAL__OverlayUpdateButton
                                        buttonLabel={ "AND" }
                                        isCurrentSelection={ current_selection_SelectionType_ALL }
                                        buttonTooltip_MainText={ "Add to AND set. All searches will contain all tags in the AND set." }
                                        buttonTooltip_WhenCurrentSelectionText={ "Current Selection" }
                                        buttonClicked_Callback={ this._choice_ALL_Clicked_BindThis }
                                    />
                                </div>
                            </React.Fragment>
                        )}
                        <span > </span>
                        <div style={ { display : "inline-block", position: "relative", paddingBottom: 2 } }>
                            <INTERNAL__OverlayUpdateButton
                                buttonLabel={ "EXCLUDE" }
                                isCurrentSelection={ current_selection_SelectionType_NOT }
                                buttonTooltip_MainText={ "None of the searches will have this tag OR any other EXCLUDED tags." }
                                buttonTooltip_WhenCurrentSelectionText={ "Current Selection" }
                                buttonClicked_Callback={ this._choice_NOT_Clicked_BindThis }
                            />
                        </div>
                        <span > </span>
                        <div style={ { display : "inline-block", position: "relative", paddingBottom: 2 } }>
                            <INTERNAL__OverlayUpdateButton
                                buttonLabel={ "Remove" }
                                isCurrentSelection={ current_selection_SelectionType_NotSelected }
                                buttonTooltip_MainText={ "Remove this item from search tag filters." }
                                buttonTooltip_WhenCurrentSelectionText={ "Value Not Selected" }
                                buttonClicked_Callback={ this._choice_Remove_Clicked_BindThis }
                            />
                        </div>
                        <span > </span>
                        <div style={ { display : "inline-block", position: "relative", paddingBottom: 2 } }>
                            <INTERNAL__OverlayUpdateButton
                                buttonLabel={ "Close" }
                                isCurrentSelection={ false }
                                buttonTooltip_MainText={ "Close with no changes." }
                                buttonTooltip_WhenCurrentSelectionText={ null }
                                buttonClicked_Callback={ this._close_SelectionOverlay_Clicked_BindThis }
                            />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


/**
 *
 */
interface INTERNAL__OverlayUpdateButton_Props {

    isCurrentSelection : boolean
    buttonLabel : string
    buttonTooltip_MainText : string
    buttonTooltip_WhenCurrentSelectionText : string
    buttonClicked_Callback : () => void;
}

interface INTERNAL__OverlayUpdateButton_State {
    _placeholder: any
}

/**
 *
 */
class INTERNAL__OverlayUpdateButton extends React.Component< INTERNAL__OverlayUpdateButton_Props, INTERNAL__OverlayUpdateButton_State > {

    //  bind to 'this' for passing as parameters
    private _onClick_BindThis = this._onClick.bind(this)
    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this)
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this)

    private readonly _button_Ref :  React.RefObject<HTMLInputElement>

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip

    /**
     *
     */
    constructor(props: INTERNAL__OverlayUpdateButton_Props) {
        super(props);

        this._button_Ref = React.createRef();

        // this.state = { };
    }

    /**
     *
     */
    private _onClick( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation()

        this._removeTooltip()

        this.props.buttonClicked_Callback()
    }

    /**
     *
     */
    private _onMouseEnter() {

        let tooltipContents : JSX.Element = undefined
        if ( this.props.isCurrentSelection && this.props.buttonTooltip_WhenCurrentSelectionText ) {
            tooltipContents = (
                <div >
                    <div style={ { marginBottom: 10 } }>
                        { this.props.buttonTooltip_WhenCurrentSelectionText }
                    </div>
                    <div>
                        {this.props.buttonTooltip_MainText}
                    </div>
                </div>
            )
        } else {
            tooltipContents = (
                <div >
                    <div>
                        {this.props.buttonTooltip_MainText}
                    </div>
                </div>
            )
        }
        this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltipContents, tooltip_target_DOM_Element : this._button_Ref.current })
    }

    /**
     *
     */
    private _onMouseLeave() {

        this._removeTooltip()
    }

    /**
     *
     */
    private _removeTooltip() {

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip()
        }
        this._tooltip_Limelight_Created_Tooltip = undefined
    }

    /**
     *
     */
    render() {
        let buttonDisabled = false

        if ( this.props.isCurrentSelection ) {
            buttonDisabled = true
        }

        return (
            <div style={ { display : "inline-block", position: "relative" } }>
                <input
                    type="button"
                    value={ this.props.buttonLabel }
                    disabled={ buttonDisabled }
                    ref={ this._button_Ref }
                    onClick={ this._onClick_BindThis }
                    onMouseEnter={ this._onMouseEnter_BindThis }
                    onMouseLeave={ this._onMouseLeave_BindThis }
                />
                { (this.props.isCurrentSelection) ?
                    ( // Add Overlay Div to provide target for tooltip
                        <div style={ { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } }
                             onMouseEnter={ this._onMouseEnter_BindThis }
                             onMouseLeave={ this._onMouseLeave_BindThis }
                        >
                        </div>
                    )
                    : null
                }
            </div>
        )
    }
}

