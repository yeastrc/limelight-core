/**
 * searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData.ts
 *
 * Create the Data Object for rendering using Component
 *
 *     <SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Root>  in searchSubGroup_In_SearchDetailsOuterBlock.tsx
 *
 *
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import {
    SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData,
    SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData_Single_SearchSubGroup
} from "../jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {
    SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";

/**
 * Create the Data Object for rendering using Component
 *
 *     <SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Root>  in searchSubGroup_In_SearchDetailsOuterBlock.tsx
 */
export const searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = function (
    {
        searchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry, searchSubGroup_CentralStateManagerObjectClass
    } : {
        searchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry : SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry
        searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass

    }) : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData {

    const selectedSearchSubGroupIds = searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds()
    const no_selectedSearchSubGroupIds = searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds()

    const searchSubGroupEntryArray : Array<SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData_Single_SearchSubGroup> = [];

    for ( const searchSubGroup of searchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

        let selectedEntry = false;

        if ( no_selectedSearchSubGroupIds !== true ) {
            //  NOT explicit No Selections
            if ( ! selectedSearchSubGroupIds ) {
                //  No selections stored so all selected
                selectedEntry = true;
            } else {
                if ( selectedSearchSubGroupIds.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  searchSubGroup_Id is selected
                    selectedEntry = true;
                }
            }
        }


        const searchSubGroupEntry = new SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData_Single_SearchSubGroup({
            searchSubGroup_Id : searchSubGroup.searchSubGroup_Id,
            searchSubgroupName_fromImportFile : searchSubGroup.searchSubgroupName_fromImportFile,
            // subgroupName_Display_FromServer_IfUserEnteredAValue : searchSubGroup.subgroupName_Display_FromServer_IfUserEnteredAValue,
            subgroupName_Display : searchSubGroup.subgroupName_Display,
            selectedEntry
        })

        searchSubGroupEntryArray.push( searchSubGroupEntry );
    }

    const searchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = new SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData({
        searchSubGroupEntryArray
    })

    return searchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData;
}