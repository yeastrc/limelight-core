/**
 * proteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions.ts
 *
 * proteinViewPage_DisplayData_ProteinList__Main_Component.tsx
 *
 */


import {SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";
import {ProteinViewPage_DisplayData_ProteinList__Main_Component_Props_Prop} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__Main_Component";
import {searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData";
import {searchSubGroup_Are_All_SearchSubGroupIds_Selected__Fcn} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Are_All_SearchSubGroupIds_Selected";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";

/**
 * Create searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
 */
const compute_searchSubGroup_PropValue = function (
    {
        propsValue
    } : {
        propsValue : ProteinViewPage_DisplayData_ProteinList__Main_Component_Props_Prop

    }) : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData {

    let searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = null;

    if ( propsValue.projectSearchIds.length === 1 && propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

        //  Only display for 1 search

        const projectSearchId = propsValue.projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        searchSubGroup_PropValue = searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData({
            searchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry : searchSubGroups_ForProjectSearchId,
            searchSubGroup_CentralStateManagerObjectClass: propsValue.searchSubGroup_CentralStateManagerObjectClass
        });
    }

    return searchSubGroup_PropValue;
}

/**
 * Create searchSubGroup_Are_All_SearchSubGroupIds_Selected
 */
const compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected = function (
    {
        propsValue
    } : {
        propsValue : ProteinViewPage_DisplayData_ProteinList__Main_Component_Props_Prop
    }) :  boolean
{
    let searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean = true; // Default to true for when Merged Search or No Search SUb Groups

    if ( propsValue.projectSearchIds.length === 1 && propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

        //  Only display for 1 search

        const projectSearchId = propsValue.projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        searchSubGroup_Are_All_SearchSubGroupIds_Selected = searchSubGroup_Are_All_SearchSubGroupIds_Selected__Fcn({
            searchSubGroup_CentralStateManagerObjectClass : propsValue.searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
        })
    }

    return searchSubGroup_Are_All_SearchSubGroupIds_Selected;
}

/**
 * Create searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
 */
const compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = function (
    {
        propsValue
    } : {
        propsValue : ProteinViewPage_DisplayData_ProteinList__Main_Component_Props_Prop

    }) : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
{

    let searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = undefined;

    const filterValuesChanged_Callback = (params: SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param) : void => {

        console.warn("filterValuesChanged_Callback called: params: ", params )

        // throw Error("filterValuesChanged_Callback callback not handled")

        limelight__ReloadPage_Function()  // TODO
    }

    const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =  {
        displayOnly : false,
        dataPages_LoggedInUser_CommonObjectsFactory : propsValue.dataPages_LoggedInUser_CommonObjectsFactory,
        dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
        dataPageStateManager_DataFrom_Server : propsValue.dataPageStateManager,
        searchDetailsBlockDataMgmtProcessing : propsValue.searchDetailsBlockDataMgmtProcessing,
        filterValuesChanged_Callback,
        searchSubGroup_PropValue,
        limelight_Colors_For_MultipleSearches: undefined
    }

    return searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue;
}

/**
 *
 */
export class ProteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions {

    static compute_searchSubGroup_PropValue = compute_searchSubGroup_PropValue;
    static compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected = compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected
    static compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue;
}