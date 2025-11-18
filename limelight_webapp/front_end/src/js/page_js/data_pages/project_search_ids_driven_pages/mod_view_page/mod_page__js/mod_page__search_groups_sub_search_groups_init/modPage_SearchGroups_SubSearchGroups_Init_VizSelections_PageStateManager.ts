/**
 * modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager.ts
 *
 * Initialize the Search Groups
 */


import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 * IF not already set, initialize the Search Groups in modViewPage_DataVizOptions_VizSelections_PageStateManager.ts
 */
export const modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager = function (
    {
        projectSearchIds_AllForPage,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager_DataFrom_Server
    } : {
        projectSearchIds_AllForPage : Array<number>
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager_DataFrom_Server : DataPageStateManager // dataPageStateManager_DataFrom_Server
    }
) {

    const searchGroups = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups()

    if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 &&
        searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 &&
        searchGroups.searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 ) {

        //  NO searches or sub searches set so compute from searches

        const searchSubGroups_Root= dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()

        if ( projectSearchIds_AllForPage.length === 1 && searchSubGroups_Root ) {

            //  Single Search with Sub Groups so putting the sub groups into ZScore Groups

            // if ( ! searchSubGroups_Root ) {
            //     const msg = "IN 'if ( ( ! this._display_NO_Searches_Message ) && ( ! this._display_OnlyOneSearch_Message ) ) {' AND 'if ( ! searchSubGroups_Root ) {'"
            //     console.warn(msg)
            //     throw Error(msg)
            // }

            const projectSearchId = projectSearchIds_AllForPage[ 0 ]

            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
            if ( ! searchSubGroups_ForProjectSearchId ) {
                throw Error("searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const searchSubGroups_Array = searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode()

            const searchSubGroups_ArrayLength_Half_Ceil = Math.ceil( searchSubGroups_Array.length / 2 )

            const group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number> = new Set()
            const group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number> = new Set()

            for ( const searchSubGroup of searchSubGroups_Array.slice( 0, searchSubGroups_ArrayLength_Half_Ceil ) ) {
                group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.add( searchSubGroup.searchSubGroup_Id )
            }
            for ( const searchSubGroup of searchSubGroups_Array.slice( searchSubGroups_ArrayLength_Half_Ceil, searchSubGroups_Array.length ) ) {
                group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.add( searchSubGroup.searchSubGroup_Id )
            }

            modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().set_SearchGroups({
                group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
                group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
                searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set: new Set(),
                projectSearchId_FOR_SubSearchIds: projectSearchId,
                projectSearchIds_Or_SubSearchIds_Enum: ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS
            })

        } else {

            const projectSearchIdsLength_Half_Ceil = Math.ceil( projectSearchIds_AllForPage.length / 2 )

            const group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set( projectSearchIds_AllForPage.slice( 0, projectSearchIdsLength_Half_Ceil ) )
            const group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set( projectSearchIds_AllForPage.slice( projectSearchIdsLength_Half_Ceil, projectSearchIds_AllForPage.length ) )

            modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().set_SearchGroups({
                group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
                group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
                searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set: new Set(),
                projectSearchId_FOR_SubSearchIds: undefined,
                projectSearchIds_Or_SubSearchIds_Enum: ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.PROJECT_SEARCH_IDS
            })
        }

    } else {
        if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 ||
            searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 ) {

            //  Display message that user needs to change searches in groups so at least one search is in each group

            // this._display_OneOrMoreGroupsHas_No_Searches_Or_SubSearches_Message = true
        }
    }

}