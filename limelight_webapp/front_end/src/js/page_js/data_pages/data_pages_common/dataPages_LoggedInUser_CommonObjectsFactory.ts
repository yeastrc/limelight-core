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
 
import { SaveView_Create_Component_React_Type } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'
import { saveView_Create_Component_React } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React';


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
     * Create object of class SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers
     * 
     */
    instantiate_SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers() : SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers {

        return new SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers();
    }
}
