/**
 * tag_Filter_Expression_TagPicker_Overlay.tsx
 *
 * Home-grown modal overlay ( ModalOverlay_Limelight_Component_v001_B_FlexBox ) for picking a tag to add
 * to the grouped tag-filter builder.  Laid out like the "Filter On Tags:" block:  a 2-column grid with
 * the category label on the LEFT and that category's tags to the RIGHT.
 *
 * The overlay stays open after each pick ( so several tags can be added in a row );  tags already added
 * are greyed out.  The "open" function is colocated here.
 */

import React from 'react'

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";
import {tag_Filter_Expression_OperatorChooser_Overlay__Operator_Title_And_Example} from "page_js/data_pages/search_tags__display_management/tag_filter_expression_builder_cnf_component/tag_Filter_Expression_OperatorChooser_Overlay";


/////


//  Optional OR/AND chooser shown at the top of the picker ( used when starting the FIRST group ):  lets the
//  user choose how the tags being added combine.  Setting it drives the builder's within-group operator.
export interface TagFilter_Expression_TagPicker_Overlay__OperatorChooser {
    initial_WithinGroup_Operator : 'AND' | 'OR'
    onChoose_WithinGroup_Operator : ( withinGroup_Operator : 'AND' | 'OR' ) => void
}


const _Overlay_Width_Min = 420;
const _Overlay_Width_Max = 900;
const _Overlay_Height_Min = 250;
const _Overlay_Height_Max = 640;


interface TagFilter_Expression_TagPicker_Overlay__OpenParams {
    searchTagData_Root : Search_Tags_SelectSearchTags_Component_SearchTagData_Root
    title : string
    promptText : string
    initialDisabledTagIds : Set<number>
    disabledReason : string
    onPickTagId : ( tagId : number ) => void

    //  true  => close the overlay after the first pick ( e.g. "add a tag as a new group" )
    //  false => stay open so several tags can be added ( e.g. adding to an existing group )
    closeAfterPick? : boolean

    //  Called after the overlay is closed ( X / backdrop / Close button / closeAfterPick ).
    //  Used to apply/persist the accumulated picks once, instead of on every pick.
    onOverlayClosed? : () => void

    //  Optional OR/AND chooser ( shown when starting the first group )
    operatorChooser? : TagFilter_Expression_TagPicker_Overlay__OperatorChooser
}


/**
 * Open the tag-picker overlay.  Calls onPickTagId( tagId ) for each tag clicked.  If closeAfterPick,
 * the overlay closes after the first pick;  otherwise it stays open until closed.
 */
export function tagFilter_Expression_TagPicker_Overlay__openOverlay( params : TagFilter_Expression_TagPicker_Overlay__OpenParams ) : void {

    //  Forward-reference closure so the close callback can close over 'holder'
    let holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const close = () => {
        if ( holder ) {
            holder.removeContents_AndContainer_FromDOM();
        }
        if ( params.onOverlayClosed ) {
            params.onOverlayClosed();
        }
    };

    //  Wrap onPickTagId so it can close the overlay after the first pick when requested
    const effectiveParams : TagFilter_Expression_TagPicker_Overlay__OpenParams = {
        ...params,
        onPickTagId: ( tagId ) => {
            params.onPickTagId( tagId );
            if ( params.closeAfterPick ) {
                close();
            }
        }
    };

    const componentToAdd = get_TagFilter_Expression_TagPicker_Overlay_Container( { params: effectiveParams, onClose: close } );

    holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody( { componentToAdd } );
}


/**
 * Build the overlay JSX element ( ModalOverlay wrapping the picker body )
 */
export function get_TagFilter_Expression_TagPicker_Overlay_Container(
    {
        params,
        onClose
    } : {
        params : TagFilter_Expression_TagPicker_Overlay__OpenParams
        onClose : () => void
    }
) : React.JSX.Element {

    return (
        <ModalOverlay_Limelight_Component_v001_B_FlexBox
            widthMinimum={ _Overlay_Width_Min }
            widthMaximum={ _Overlay_Width_Max }
            heightMinimum={ _Overlay_Height_Min }
            heightMaximum={ _Overlay_Height_Max }
            title={ params.title }
            callbackOnClicked_Close={ onClose }
            close_OnBackgroundClick={ true }
        >
            <TagFilter_Expression_TagPicker_OverlayBody
                searchTagData_Root={ params.searchTagData_Root }
                promptText={ params.promptText }
                initialDisabledTagIds={ params.initialDisabledTagIds }
                disabledReason={ params.disabledReason }
                onPickTagId={ params.onPickTagId }
                operatorChooser={ params.operatorChooser }
                onClose={ onClose }
            />
        </ModalOverlay_Limelight_Component_v001_B_FlexBox>
    );
}


//////


interface Internal__OverlayBody_Props {
    searchTagData_Root : Search_Tags_SelectSearchTags_Component_SearchTagData_Root
    promptText : string
    initialDisabledTagIds : Set<number>
    disabledReason : string
    onPickTagId : ( tagId : number ) => void
    operatorChooser? : TagFilter_Expression_TagPicker_Overlay__OperatorChooser
    onClose : () => void
}

interface Internal__OverlayBody_State {
    locallyPickedTagIds : Set<number>

    //  The currently-selected within-group operator ( only meaningful when operatorChooser is present )
    selectedOperator : 'AND' | 'OR'
}

//  One category ( or 'uncategorized' ) with its tags, for the 2-column layout
interface Internal__CategoryWithTags {
    category_id : number          //  -1 for uncategorized
    category_label : string
    tags : Array<Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>
}


class TagFilter_Expression_TagPicker_OverlayBody extends React.Component< Internal__OverlayBody_Props, Internal__OverlayBody_State > {

    constructor( props : Internal__OverlayBody_Props ) {
        super( props );
        this.state = {
            locallyPickedTagIds: new Set<number>(),
            selectedOperator: ( props.operatorChooser && props.operatorChooser.initial_WithinGroup_Operator === 'AND' ) ? 'AND' : 'OR'
        };
    }

    private _pick = ( tagId : number ) : void => {
        this.props.onPickTagId( tagId );
        const locallyPickedTagIds = new Set<number>( this.state.locallyPickedTagIds );
        locallyPickedTagIds.add( tagId );
        this.setState( { locallyPickedTagIds } );
    }

    private _chooseOperator = ( withinGroup_Operator : 'AND' | 'OR' ) : void => {
        this.setState( { selectedOperator: withinGroup_Operator } );
        if ( this.props.operatorChooser ) {
            this.props.operatorChooser.onChoose_WithinGroup_Operator( withinGroup_Operator );
        }
    }

    //  One OR/AND radio, tooltipped with the SAME description + example as the operator-chooser overlay
    private _render_OperatorRadio( withinGroup_Operator : 'AND' | 'OR' ) : React.JSX.Element {

        const { title, example } = tag_Filter_Expression_OperatorChooser_Overlay__Operator_Title_And_Example( withinGroup_Operator );

        const tooltipContents = (
            <span>
                <div>{ title }</div>
                <div style={ { fontFamily: "monospace", marginTop: 4 } }>{ example }</div>
            </span>
        );

        return (
            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                title={ tooltipContents }
                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
            >
                <label style={ { display: "inline-flex", alignItems: "center", marginRight: 18, cursor: "pointer" } }>
                    <input
                        type="radio"
                        name="tag_Filter_Expression_TagPicker_Overlay__within_group_operator"
                        checked={ this.state.selectedOperator === withinGroup_Operator }
                        onChange={ () => this._chooseOperator( withinGroup_Operator ) }
                        style={ { marginRight: 6 } }
                    />
                    <span style={ { fontWeight: "bold" } }>{ withinGroup_Operator }</span>
                </label>
            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
        );
    }

    //  Group tags by category ( categories sorted by label, uncategorized last;  tags sorted by string )
    private _build_CategoriesWithTags() : Array<Internal__CategoryWithTags> {

        const categoryMap = new Map<number, Internal__CategoryWithTags>();
        for ( const category of this.props.searchTagData_Root.searchTagCategory_Array ) {
            categoryMap.set( category.category_id, { category_id: category.category_id, category_label: category.category_label, tags: [] } );
        }

        const uncategorized : Internal__CategoryWithTags = { category_id: -1, category_label: "Uncategorized", tags: [] };

        for ( const tag of this.props.searchTagData_Root.searchTag_Array ) {
            if ( tag.tagCategoryId === undefined || tag.tagCategoryId === null || ( ! categoryMap.has( tag.tagCategoryId ) ) ) {
                uncategorized.tags.push( tag );
            } else {
                categoryMap.get( tag.tagCategoryId ).tags.push( tag );
            }
        }

        const result = Array.from( categoryMap.values() ).filter( c => c.tags.length > 0 );
        result.sort( (a, b) => a.category_label.localeCompare( b.category_label, undefined, { sensitivity: "accent" } ) );

        if ( uncategorized.tags.length > 0 ) {
            result.push( uncategorized );
        }

        for ( const categoryWithTags of result ) {
            categoryWithTags.tags.sort( (a, b) => a.tagString.localeCompare( b.tagString, undefined, { sensitivity: "accent" } ) );
        }

        return result;
    }

    private _render_TagChip( tag : Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry ) : React.JSX.Element {

        const disabled = this.props.initialDisabledTagIds.has( tag.tagId ) || this.state.locallyPickedTagIds.has( tag.tagId );

        const tooltipText = disabled ? ( this.props.disabledReason ? this.props.disabledReason : "Already added" ) : "Add";

        return (
            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                key={ tag.tagId }
                title={ tooltipText }
                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
            >
                <span
                    onClick={ disabled ? undefined : () => this._pick( tag.tagId ) }
                    style={ {
                        display: "inline-block",
                        backgroundColor: tag.tag_Color_Background,
                        color: tag.tag_Color_Font,
                        borderWidth: 2,
                        borderStyle: "solid",
                        borderColor: tag.tag_Color_Border ? tag.tag_Color_Border : "transparent",
                        borderRadius: 4,
                        paddingTop: 1,
                        paddingBottom: 1,
                        paddingLeft: 6,
                        paddingRight: 6,
                        marginTop: 3,
                        marginRight: 3,
                        marginBottom: 3,
                        marginLeft: 3,
                        whiteSpace: "nowrap",
                        cursor: disabled ? "default" : "pointer",
                        opacity: disabled ? 0.35 : 1
                    } }
                >
                    { tag.tagString }
                </span>
            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
        );
    }

    render() {

        const categoriesWithTags = this._build_CategoriesWithTags();

        const categoryLabel_Style : React.CSSProperties = { marginTop: 7, marginRight: 8, fontWeight: "bold", whiteSpace: "nowrap", textAlign: "right" };

        return (
            <React.Fragment>

                {/*  Close button on its own line at the top  */}
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right ">
                    <button type="button" onClick={ () => this.props.onClose() }>
                        Close
                    </button>
                </div>

                {/*  Optional OR/AND chooser -- pinned above the ( scrolling ) tag list so it stays visible  */}
                { this.props.operatorChooser ? (
                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                        style={ { marginTop: 12, paddingTop: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "#dddddd", display: "flex", alignItems: "center", flexWrap: "wrap" } }
                    >
                        <span style={ { fontWeight: "bold", marginRight: 12 } }>Combine these tags with:</span>
                        { this._render_OperatorRadio( 'OR' ) }
                        { this._render_OperatorRadio( 'AND' ) }
                    </div>
                ) : null }

                <div
                    className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right modal-overlay-body-standard-margin-bottom "
                    style={ { overflowY: "auto", overflowX: "hidden", marginTop: 12 } }
                >
                    <div style={ { color: "#555555", marginBottom: 12 } }>
                        { this.props.promptText }
                    </div>

                    { categoriesWithTags.length === 0 ? (
                        <div style={ { color: "#888888" } }>No tags in this project.</div>
                    ) : (
                        <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr", rowGap: 4, alignItems: "start" } }>
                            { categoriesWithTags.map( categoryWithTags => (
                                <React.Fragment key={ categoryWithTags.category_id }>
                                    {/*  column 1:  category label  */}
                                    <div style={ categoryLabel_Style }>
                                        { categoryWithTags.category_label }:
                                    </div>
                                    {/*  column 2:  tags  */}
                                    <div>
                                        { categoryWithTags.tags.map( tag => this._render_TagChip( tag ) ) }
                                    </div>
                                </React.Fragment>
                            ) ) }
                        </div>
                    ) }
                </div>

            </React.Fragment>
        );
    }
}
