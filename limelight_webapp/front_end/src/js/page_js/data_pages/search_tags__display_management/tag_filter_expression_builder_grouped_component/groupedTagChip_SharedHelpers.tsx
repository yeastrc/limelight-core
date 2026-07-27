/**
 * groupedTagChip_SharedHelpers.tsx
 *
 * Helpers shared by the grouped tag-filter builder ( editable chips ) and its read-only preview ( summary
 * chips ):  the tag/category lookup maps, the tag-chip tooltip contents, and the chip color resolution /
 * negated ( NOT ) styling.  Centralized so the two components can't drift apart.
 */

import React from 'react'

import {
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";
import { searchTags_SearchCount_Display__tooltipLine } from "page_js/data_pages/search_tags__display_management/searchTags_SearchCount_Display";


/////


//  Red used for a negated ( NOT ) tag chip:  border, "NOT" label, and the "must be ABSENT" tooltip line.
export const groupedTagChip_SharedHelpers__NEGATED_COLOR = "#c0392b";


//  ( tagId -> tag entry and category id -> label lookups live in SearchTags_TagLookupMaps -- built once per
//  data load and passed down, so they are not rebuilt per render. )


//  Resolve a tag chip's colors + display string from an ( optional ) tag entry, with safe fallbacks.
export function groupedTagChip_SharedHelpers__resolve_TagChipColors(
    tagEntry : Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry | undefined, tagId : number
) : { backgroundColor : string, fontColor : string, borderColor : string, tagString : string } {
    return {
        backgroundColor: tagEntry ? tagEntry.tag_Color_Background : "#eeeeee",
        fontColor: tagEntry ? tagEntry.tag_Color_Font : "#000000",
        borderColor: tagEntry ? tagEntry.tag_Color_Border : "#999999",
        tagString: tagEntry ? tagEntry.tagString : ( "tagId " + tagId )
    };
}

//  The effective chip border color:  red when negated;  otherwise the tag's border color, falling back to
//  "transparent" ( a possibly-empty tag color must not produce an invalid "2px solid " shorthand that the
//  browser silently drops -- the "stuck border" bug ).
export function groupedTagChip_SharedHelpers__chip_BorderColor( negated : boolean, tag_BorderColor : string ) : string {
    if ( negated ) {
        return groupedTagChip_SharedHelpers__NEGATED_COLOR;
    }
    return tag_BorderColor ? tag_BorderColor : "transparent";
}

//  Tag chip tooltip:  Tag/Category grid + optional search-count line + optional negated ( NOT ) warning.
export function groupedTagChip_SharedHelpers__build_TagTooltipContents(
    {
        tagString, categoryLabel, negated, searchCount
    } : {
        tagString : string, categoryLabel : string, negated : boolean, searchCount : number | undefined
    }
) : React.JSX.Element {
    return (
        <span>
            <div style={ { display: "grid", gridTemplateColumns: "max-content 1fr", columnGap: 8, rowGap: 2 } }>
                <div>Tag:</div>
                <div><b>{ tagString }</b></div>
                <div>Category:</div>
                <div>{ categoryLabel ? categoryLabel : "(uncategorized)" }</div>
            </div>
            { searchTags_SearchCount_Display__tooltipLine( searchCount, 8 ) }
            { negated ? ( <div style={ { marginTop: 4, fontStyle: "italic" } }>Negated ( NOT ) — tag must be ABSENT</div> ) : null }
        </span>
    );
}
