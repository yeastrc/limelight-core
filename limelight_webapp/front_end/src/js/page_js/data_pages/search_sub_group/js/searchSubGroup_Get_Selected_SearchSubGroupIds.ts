/**
 * searchSubGroup_Get_Selected_SearchSubGroupIds.ts
 *
 * Get the Selected Search SubGroup Ids.
 *
 * Call this function searchSubGroup_Get_Selected_SearchSubGroupIds since SearchSubGroup_CentralStateManagerObjectClass holds nothing if all search sub ids are selected.
 *
 * For use with:  SearchSubGroup_CentralStateManagerObjectClass
 *
 *
 *
 */
import {SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";

/**
 *
 */
export const searchSubGroup_Get_Selected_SearchSubGroupIds = function ({ searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId } : {

    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    searchSubGroups_ForProjectSearchId: SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry
}) : Set<number>{

    if ( searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds() ) {

        return new Set();
    }

    let searchSubGroup_Ids_Selected : Set<number> = undefined;

    if ( ! searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds() ) {

        searchSubGroup_Ids_Selected = new Set();
        for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
            searchSubGroup_Ids_Selected.add( searchSubGroup.searchSubGroup_Id );
        }
    } else {
        searchSubGroup_Ids_Selected = new Set( searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds() );
    }

    return searchSubGroup_Ids_Selected;
}

