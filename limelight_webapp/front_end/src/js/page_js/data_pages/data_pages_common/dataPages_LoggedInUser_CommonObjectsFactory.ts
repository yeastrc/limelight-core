/**
 * dataPages_LoggedInUser_CommonObjectsFactory.ts
 * 
 * Javascript for Data Pages
 * 
 * Creates objects from classes that are for Logged In Users.
 * 
 */


 //  Imports

import { SaveView_dataPages } from 'page_js/data_pages/data_pages_common/saveView_dataPages';

import {
    SaveView_Create_Component_React_Type
} from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'
import { saveView_Create_Component_React } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React';
import {SetDefaultView_dataPages} from "page_js/data_pages/data_pages_common/setDefaultView_dataPages";
import {Get_SetDefaultView_Component_React_Type} from "page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate";
import {setDefaultView_Create_Component_React} from "page_js/data_pages/setDefaultView_React/setDefaultView_Component_React";
import {searchName_and_SearchShortName_Change_Component__openOverlay} from "page_js/data_pages/common_components__react/search_name_and_search_short_name__user_change_overlay/searchName_and_SearchShortName_Change_Component_and_WebserviceCall";
import {open_Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Overlay} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_search/search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent";
import {
    searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId
} from "page_js/data_pages/search_sub_group/search_sub_group_manage_group_names/js/search_sub_group__manage__group_names__open_overlay__pass__project_search_id";
import {
    searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__OpenOverlay
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change_Overlay";
import {
    searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Change__OpenOverlay
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Change_Overlay";
import {
    searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Delete
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Delete";
import {
    searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Add__OpenOverlay
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Add_Overlay";
import {
    searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Delete
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Delete";
import {
    searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__OpenOverlay
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add_Overlay";

/**
 * 
 */
export class DataPages_LoggedInUser_CommonObjectsFactory {
	
	/**
	 * 
	 */
	constructor() {

    }

	/**
	 * 
	 */
	initialize() {


    }

    /**
     * Create object of class SaveView_dataPages
     *
     */
    getFunctionToGet_SetDefaultView_Component_React() : Get_SetDefaultView_Component_React_Type {

        return setDefaultView_Create_Component_React;
    }

    /**
     * Create object of class SaveView_dataPages
     * 
     */
    getFunctionToGet_SaveView_dataPages_ComponentAndProps() : SaveView_Create_Component_React_Type {

        return saveView_Create_Component_React;
    }

    /**
     * Create object of class SaveView_dataPages
     * 
     */
    instantiate_SaveView_dataPages() : SaveView_dataPages {

        return new SaveView_dataPages();
    }

    /**
     * Create object of class SetDefaultView_dataPages
     *
     */
    instantiate_SetDefaultView_dataPages() : SetDefaultView_dataPages {

        return new SetDefaultView_dataPages();
    }

    getFunction_searchName_and_SearchShortName_Change_Component__openOverlay() {
        return searchName_and_SearchShortName_Change_Component__openOverlay
    }

    getFunction_open_Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent_Overlay() {
        return open_Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent_Overlay
    }

    getFunction_searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId() {
        return searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId
    }

    getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__OpenOverlay() {
        return searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__OpenOverlay
    }

    getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Change__OpenOverlay() {
        return searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Change__OpenOverlay
    }

    getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Delete() {
        return searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Delete
    }

    getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Add__OpenOverlay() {
        return searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Add__OpenOverlay
    }

    getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Delete() {
        return searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Delete
    }

    getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__OpenOverlay() {
        return searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__OpenOverlay
    }
}
