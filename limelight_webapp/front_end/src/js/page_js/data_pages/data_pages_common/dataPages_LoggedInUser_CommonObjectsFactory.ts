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

import { SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers';
 
import {
    SaveView_Create_Component_React_Type,
    SaveView_Get_Component_React_Type
} from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'
import { saveView_Create_Component_React } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React';
import {SetDefaultView_dataPages} from "page_js/data_pages/data_pages_common/setDefaultView_dataPages";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_DataPageStateManager_ProjectSearchId} from "page_js/data_pages/search_sub_group/search_sub_group_manage_group_names/js/search_sub_group__manage__group_names__open_overlay__pass__data_page_state_manager__project_search_id";
import {Get_SetDefaultView_Component_React_Type} from "page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate";
import {setDefaultView_Create_Component_React} from "page_js/data_pages/setDefaultView_React/setDefaultView_Component_React";
import {getSaveView_Component} from "page_js/data_pages/saveView_React/saveView_Component_React";


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
     * Get function that when called returns JSX.Element
     */
    getFunctionToGet_getSaveView_Component(): SaveView_Get_Component_React_Type {
        return getSaveView_Component;
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

    /**
     * Create object of class SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers
     * 
     */
    instantiate_SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers() : SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers {

        return new SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers();
    }

    /**
     * call searchSubGroup_Manage_GroupNames_OpenOverlay
     *
     */
    call_searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_DataPageStateManager_ProjectSearchId(
    {
        dataPageStateManager_DataFrom_Server,
        projectSearchId
    } : {
        dataPageStateManager_DataFrom_Server: DataPageStateManager
        projectSearchId : number
    }) : void {

        searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_DataPageStateManager_ProjectSearchId({ dataPageStateManager_DataFrom_Server, projectSearchId });
    }
}
