/**
 * modViewPage_RootClass_LoggedInUsers.ts
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

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

//  From local dir
import { ModViewPage_RootClass_Common }  from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootClass_Common';
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

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
	initialize() { try {

		const dataPages_LoggedInUser_CommonObjectsFactory = new DataPages_LoggedInUser_CommonObjectsFactory();
		dataPages_LoggedInUser_CommonObjectsFactory.initialize();

        const modViewPage_RootClass_Common = new ModViewPage_RootClass_Common({ dataPages_LoggedInUser_CommonObjectsFactory });
        modViewPage_RootClass_Common.initialize();

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}