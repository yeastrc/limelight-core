/**
 * modViewPage_RootClass_LoggedInUsers.js
 * 
 * For modView.jsp page
 * 
 * Root Class for Logged In Users
 * 
 * Does special code for logged in Users 
 * and then creates and initializes 
 * class ModViewPage_RootClass_Common 
 * in file modViewPage_RootClass_Common.js
 * 
 */

 //  Imports

import { SaveView_dataPages } from 'page_js/data_pages/data_pages_common/saveView_dataPages.js';

import { SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers } from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers.js';

//  From local dir
import { ModViewPage_RootClass_Common }  
	from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootClass_Common.js';

/**
 * 
 */
export class ModViewPage_RootClass_LoggedInUsers {
	
	/**
	 * 
	 */
	constructor() {

    }

	/**
	 * 
	 */
	initialize() {

        const saveView_dataPages = new SaveView_dataPages();
        
		const searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers = new SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers({});

        const modViewPage_RootClass_Common = new ModViewPage_RootClass_Common({ saveView_dataPages, searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers });
        modViewPage_RootClass_Common.initialize();
    }
}