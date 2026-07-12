/**
 * tag_Filter_Expression_Preview_Component.tsx
 *
 * Read-only display of a grouped ( CNF/DNF ) tag-filter expression:  the colored tag chips with group
 * parens and the AND/OR operators, e.g.  ( a OR b )  AND  ( c ).  If any group is empty, shows the
 * "no searches pass" warning instead ( an empty group blocks all searches -- see the parent filtering ).
 *
 * Rendered by the project-page searches section INSIDE the shared "Filtering on ..." summary block, so the
 * advanced filter's "Filtering on tags:" sits together with "Filtering on text:" ( same as the basic tag
 * filter ).  It renders only the expression content ( the right side ) -- the label + "clear" are the
 * caller's, matching the basic tag-filter summary.
 */

import React from 'react'

import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";
import {
    Tag_Filter_Expression_Builder_CNF_Component__Seed_Literal,
    Tag_Filter_Expression_Builder_CNF_Component__Seed_OrGroup
} from "page_js/data_pages/search_tags__display_management/tag_filter_expression_builder_cnf_component/tag_Filter_Expression_Builder_CNF_Component";


/////


const _NEGATED_COLOR = "#c0392b";  //  red


interface Internal__Tag_Filter_Expression_Preview_Component_Props {
    andGroups : ReadonlyArray<Tag_Filter_Expression_Builder_CNF_Component__Seed_OrGroup>
    withinGroup_Operator : 'AND' | 'OR'
    searchTagData_Root : Search_Tags_SelectSearchTags_Component_SearchTagData_Root
}


export class Tag_Filter_Expression_Preview_Component
    extends React.Component< Internal__Tag_Filter_Expression_Preview_Component_Props, { _placeholder?: unknown } > {

    private _get_TagEntry_Map() : Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry> {
        const result = new Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>();
        if ( this.props.searchTagData_Root && this.props.searchTagData_Root.searchTag_Array ) {
            for ( const tagEntry of this.props.searchTagData_Root.searchTag_Array ) {
                result.set( tagEntry.tagId, tagEntry );
            }
        }
        return result;
    }

    private _get_CategoryLabel_Map() : Map<number, string> {
        const result = new Map<number, string>();
        if ( this.props.searchTagData_Root && this.props.searchTagData_Root.searchTagCategory_Array ) {
            for ( const category of this.props.searchTagData_Root.searchTagCategory_Array ) {
                result.set( category.category_id, category.category_label );
            }
        }
        return result;
    }

    //  Shared tooltip contents for a tag chip.  Uses a 2-column CSS grid so the values left-align.
    private _build_TagTooltipContents( tagString : string, categoryLabel : string, negated : boolean ) : React.JSX.Element {
        return (
            <span>
                <div style={ { display: "grid", gridTemplateColumns: "max-content 1fr", columnGap: 8, rowGap: 2 } }>
                    <div>Tag:</div>
                    <div><b>{ tagString }</b></div>
                    <div>Category:</div>
                    <div>{ categoryLabel ? categoryLabel : "(uncategorized)" }</div>
                </div>
                { negated ? ( <div style={ { marginTop: 4, fontStyle: "italic" } }>Negated ( NOT ) — tag must be ABSENT</div> ) : null }
            </span>
        );
    }

    //  A read-only ( non-interactive ) colored tag chip, with a tag+category tooltip
    private _render_PreviewTagChip(
        literal : Tag_Filter_Expression_Builder_CNF_Component__Seed_Literal,
        tagEntry_Map : Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>,
        categoryLabel_Map : Map<number, string>
    ) : React.JSX.Element {

        const tagEntry = tagEntry_Map.get( literal.tagId );

        const backgroundColor = tagEntry ? tagEntry.tag_Color_Background : "#eeeeee";
        const fontColor = tagEntry ? tagEntry.tag_Color_Font : "#000000";
        const borderColor = tagEntry ? tagEntry.tag_Color_Border : "#999999";
        const tagString = tagEntry ? tagEntry.tagString : ( "tagId " + literal.tagId );

        const categoryLabel = ( tagEntry && tagEntry.tagCategoryId !== undefined && tagEntry.tagCategoryId !== null )
            ? categoryLabel_Map.get( tagEntry.tagCategoryId ) : null;

        const tooltipContents = this._build_TagTooltipContents( tagString, categoryLabel, literal.negated );

        return (
            <span
                style={ {
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor,
                    color: fontColor,
                    //  Always a VALID border color ( fall back to transparent ) so a possibly-empty tag color can't
                    //  produce an invalid "2px solid " shorthand string the browser silently ignores.
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: literal.negated ? _NEGATED_COLOR : ( borderColor ? borderColor : "transparent" ),
                    borderRadius: 4,
                    paddingTop: 1,
                    paddingBottom: 1,
                    paddingLeft: 5,
                    paddingRight: 5,
                    whiteSpace: "nowrap"
                } }
            >
                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={ tooltipContents }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <span style={ { display: "inline-flex", alignItems: "center" } }>
                        { literal.negated ? ( <span style={ { fontWeight: "bold", color: _NEGATED_COLOR, marginRight: 4 } }>NOT</span> ) : null }
                        <span style={ literal.negated ? { textDecoration: "line-through" } : undefined }>{ tagString }</span>
                    </span>
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
            </span>
        );
    }

    render() {

        const withinOp = this.props.withinGroup_Operator;
        const betweenOp : 'AND' | 'OR' = ( withinOp === 'OR' ) ? 'AND' : 'OR';

        //  Any empty group blocks all searches -- warn instead of showing the expression.
        const hasEmptyGroup = this.props.andGroups.some( g => g.literals.length === 0 );
        if ( hasEmptyGroup ) {
            return (
                <span style={ { color: _NEGATED_COLOR, fontWeight: "bold" } }>
                    At least one group is empty, so no searches pass the filters.  Populate all groups, or remove empty groups.
                </span>
            );
        }

        const nonEmptyGroups = this.props.andGroups.filter( g => g.literals.length > 0 );
        if ( nonEmptyGroups.length === 0 ) {
            return <span style={ { color: "#888888" } }>(no tags selected)</span>;
        }

        const tagEntry_Map = this._get_TagEntry_Map();
        const categoryLabel_Map = this._get_CategoryLabel_Map();

        return (
            <span style={ { display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 4 } }>
                { nonEmptyGroups.map( ( g, groupIndex ) => (
                    <React.Fragment key={ groupIndex }>
                        { groupIndex > 0 ? ( <span style={ { fontWeight: "bold", marginLeft: 3, marginRight: 3 } }>{ betweenOp }</span> ) : null }
                        <span style={ { display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 4 } }>
                            <span style={ { fontWeight: "bold" } }>(</span>
                            { g.literals.map( ( literal, literalIndex ) => (
                                <React.Fragment key={ literalIndex }>
                                    { literalIndex > 0 ? ( <span style={ { fontWeight: "bold" } }>{ withinOp }</span> ) : null }
                                    { this._render_PreviewTagChip( literal, tagEntry_Map, categoryLabel_Map ) }
                                </React.Fragment>
                            ) ) }
                            <span style={ { fontWeight: "bold" } }>)</span>
                        </span>
                    </React.Fragment>
                ) ) }
            </span>
        );
    }
}
