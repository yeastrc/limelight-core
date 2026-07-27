/**
 * searchTags_TagLookupMaps.ts
 *
 * Lookup maps derived ONCE from a searchTagData_Root:  tagId -> tag entry, and category id -> label.
 *
 * Built once by the container when the search/tag data (re)loads ( alongside the per-tag search-count map )
 * and passed down as an INSTANCE to the tag-chip components ( grouped builder + read-only preview ), so the
 * maps are NOT rebuilt on every render.  An instance is immutable:  when searchTagData_Root changes, build a
 * NEW instance ( that is the whole lifetime of these maps -- they live as long as this instance is held, and
 * are replaced only on a data reload; there is no hidden cache ).
 */

import {
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";


/////


export class SearchTags_TagLookupMaps {

    private readonly _tagEntry_Map : Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>;
    private readonly _categoryLabel_Map : Map<number, string>;

    constructor( searchTagData_Root : Search_Tags_SelectSearchTags_Component_SearchTagData_Root ) {

        const tagEntry_Map = new Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>();
        if ( searchTagData_Root && searchTagData_Root.searchTag_Array ) {
            for ( const tagEntry of searchTagData_Root.searchTag_Array ) {
                tagEntry_Map.set( tagEntry.tagId, tagEntry );
            }
        }
        this._tagEntry_Map = tagEntry_Map;

        const categoryLabel_Map = new Map<number, string>();
        if ( searchTagData_Root && searchTagData_Root.searchTagCategory_Array ) {
            for ( const category of searchTagData_Root.searchTagCategory_Array ) {
                categoryLabel_Map.set( category.category_id, category.category_label );
            }
        }
        this._categoryLabel_Map = categoryLabel_Map;
    }

    get_TagEntry_ForTagId( tagId : number ) : Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry | undefined {
        return this._tagEntry_Map.get( tagId );
    }

    //  Category label for a tag entry ( or null when uncategorized / unknown ).
    get_CategoryLabel_ForTagEntry( tagEntry : Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry | undefined ) : string {
        if ( tagEntry && tagEntry.tagCategoryId !== undefined && tagEntry.tagCategoryId !== null ) {
            return this._categoryLabel_Map.get( tagEntry.tagCategoryId );
        }
        return null;
    }
}
