/**
 * tag_Filter_Expression_Preview_Component.tsx
 *
 * Read-only display of a grouped tag-filter expression:  the colored tag chips with group parens and the
 * AND/OR operators, e.g.  ( a OR b )  AND  ( c AND d ).  Each group is combined with its OWN operator
 * ( groupOperator );  the groups are combined with a single betweenGroups_Operator.  If any group is empty,
 * shows the "no searches pass" warning instead ( an empty group blocks all searches -- see the parent
 * filtering ).
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
    Tag_Filter_Expression_Builder_Grouped_Component__Seed_Literal,
    Tag_Filter_Expression_Builder_Grouped_Component__Seed_Group
} from "page_js/data_pages/search_tags__display_management/tag_filter_expression_builder_grouped_component/tag_Filter_Expression_Builder_Grouped_Component";
import { searchTags_SearchCount_Display__countForTagId } from "page_js/data_pages/search_tags__display_management/searchTags_SearchCount_Display";
import {
    groupedTagChip_SharedHelpers__NEGATED_COLOR,
    groupedTagChip_SharedHelpers__build_TagEntry_Map,
    groupedTagChip_SharedHelpers__build_CategoryLabel_Map,
    groupedTagChip_SharedHelpers__resolve_TagChipColors,
    groupedTagChip_SharedHelpers__chip_BorderColor,
    groupedTagChip_SharedHelpers__categoryLabel_For_TagEntry,
    groupedTagChip_SharedHelpers__build_TagTooltipContents
} from "page_js/data_pages/search_tags__display_management/tag_filter_expression_builder_grouped_component/groupedTagChip_SharedHelpers";


/////


const _NEGATED_COLOR = groupedTagChip_SharedHelpers__NEGATED_COLOR;  //  red ( shared )


interface Internal__Tag_Filter_Expression_Preview_Component_Props {
    groups : ReadonlyArray<Tag_Filter_Expression_Builder_Grouped_Component__Seed_Group>
    betweenGroups_Operator : 'AND' | 'OR'
    searchTagData_Root : Search_Tags_SelectSearchTags_Component_SearchTagData_Root
    //  Number of searches ( in the project ) that have each tag, keyed by tagId -- shown in each tag's tooltip.
    searchesPerTagId_Map? : ReadonlyMap<number, number>
}


export class Tag_Filter_Expression_Preview_Component
    extends React.Component< Internal__Tag_Filter_Expression_Preview_Component_Props, { _placeholder?: unknown } > {

    //  A read-only ( non-interactive ) colored tag chip, with a tag+category tooltip
    private _render_PreviewTagChip(
        literal : Tag_Filter_Expression_Builder_Grouped_Component__Seed_Literal,
        tagEntry_Map : Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>,
        categoryLabel_Map : Map<number, string>
    ) : React.JSX.Element {

        const tagEntry = tagEntry_Map.get( literal.tagId );

        const { backgroundColor, fontColor, borderColor, tagString } = groupedTagChip_SharedHelpers__resolve_TagChipColors( tagEntry, literal.tagId );
        const categoryLabel = groupedTagChip_SharedHelpers__categoryLabel_For_TagEntry( tagEntry, categoryLabel_Map );

        const searchCount = searchTags_SearchCount_Display__countForTagId( this.props.searchesPerTagId_Map, literal.tagId );
        const tooltipContents = groupedTagChip_SharedHelpers__build_TagTooltipContents( { tagString, categoryLabel, negated: literal.negated, searchCount } );

        return (
            <span
                style={ {
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor,
                    color: fontColor,
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: groupedTagChip_SharedHelpers__chip_BorderColor( literal.negated, borderColor ),
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

        const betweenOp = this.props.betweenGroups_Operator;

        //  Any empty group blocks all searches -- warn instead of showing the expression.
        const hasEmptyGroup = this.props.groups.some( g => g.literals.length === 0 );
        if ( hasEmptyGroup ) {
            return (
                <span style={ { color: _NEGATED_COLOR, fontWeight: "bold" } }>
                    At least one group is empty, so no searches pass the filters.  Populate all groups, or remove empty groups.
                </span>
            );
        }

        const nonEmptyGroups = this.props.groups.filter( g => g.literals.length > 0 );
        if ( nonEmptyGroups.length === 0 ) {
            return <span style={ { color: "#888888" } }>(no tags selected)</span>;
        }

        const tagEntry_Map = groupedTagChip_SharedHelpers__build_TagEntry_Map( this.props.searchTagData_Root );
        const categoryLabel_Map = groupedTagChip_SharedHelpers__build_CategoryLabel_Map( this.props.searchTagData_Root );

        return (
            <span style={ { display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 4 } }>
                { nonEmptyGroups.map( ( g, groupIndex ) => (
                    <React.Fragment key={ groupIndex }>
                        { groupIndex > 0 ? ( <span style={ { fontWeight: "bold", marginLeft: 3, marginRight: 3 } }>{ betweenOp }</span> ) : null }
                        <span style={ { display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 4 } }>
                            <span style={ { fontWeight: "bold" } }>(</span>
                            { g.literals.map( ( literal, literalIndex ) => (
                                <React.Fragment key={ literalIndex }>
                                    { literalIndex > 0 ? ( <span style={ { fontWeight: "bold" } }>{ g.groupOperator }</span> ) : null }
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
