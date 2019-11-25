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

 import { SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers } from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers';
 

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
