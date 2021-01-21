/**
 * searchSubGroup_Are_All_SearchSubGroupIds_Selected.ts
 *
 * Are ALL the Selected Search SubGroup Ids Selected.
 *
 * Call this function to determine if ALL Search Sub Ids since SearchSubGroup_CentralStateManagerObjectClass holds nothing if all search sub ids are selected.
 *
 * For use with:  SearchSubGroup_CentralStateManagerObjectClass
 *
 *
 *
 */
import {SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";

/**
 * @returns true if all search sub group ids are selected, otherwise false
 */
export const searchSubGroup_Are_All_SearchSubGroupIds_Selected__Fcn = function ({ searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId } : {

    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    searchSubGroups_ForProjectSearchId: SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry
}) : boolean {

    if ( searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds() ) {

        return false;
    }

    if ( ! searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds() ) {

        return true;

    } else {

         if ( searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode().length === searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds().size ) {

             return true;
        }
    }

    return false;
}

