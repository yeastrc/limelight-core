/**
 * searchTags_SearchCount_Display.tsx
 *
 * Shared, single-source wording for "how many searches ( in the project ) have this tag", shown in tag
 * tooltips across the project-page search filters ( basic "Filter On Tags:" selector, basic "Filtering on
 * tags:" summary, and the advanced grouped builder / summary / tag-picker ).  Centralized so the sentence
 * and pluralization only live in one place.
 */

import React from 'react'


/////


//  Count of searches ( in the project ) that have a tag, from an optional map.  A tag absent from the map
//  has zero searches;  returns undefined only when no map is supplied ( count data not available ).
export function searchTags_SearchCount_Display__countForTagId(
    searchesPerTagId_Map : ReadonlyMap<number, number> | undefined, tagId : number
) : number | undefined {
    return searchesPerTagId_Map ? ( searchesPerTagId_Map.get( tagId ) ?? 0 ) : undefined;
}

//  Sentence:  "No searches have this tag" / "1 search has this tag" / "N searches have this tag".
//  null when searchCount is undefined ( no count data ).
export function searchTags_SearchCount_Display__sentence( searchCount : number | undefined ) : string {
    if ( searchCount === undefined ) {
        return null;
    }
    if ( searchCount === 0 ) {
        return "No searches have this tag";
    }
    return searchCount + ( searchCount === 1 ? " search has this tag" : " searches have this tag" );
}

//  A <div> tooltip line with the sentence ( marginTop optional ), or null when there is no count data.
export function searchTags_SearchCount_Display__tooltipLine( searchCount : number | undefined, marginTop ?: number ) : React.JSX.Element {
    const sentence = searchTags_SearchCount_Display__sentence( searchCount );
    if ( sentence === null ) {
        return null;
    }
    return <div style={ ( marginTop !== undefined ) ? { marginTop } : undefined }>{ sentence }</div>;
}
