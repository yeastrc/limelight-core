/**
 * scanFileToSearchesViewPage_RootClass_LoggedInUsers.ts
 * 
 * For scanFileToSearchesView.jsp page
 * 
 * Root Class for Logged In Users
 * 
 * Does special code for logged in Users 
 * and then creates and initializes 
 * class ScanFileToSearchesViewPage_RootClass_Common 
 * in file scanFileToSearchesViewPage_RootClass_Common.js
 * 
 */

//  Imports

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import {
	ScanFileToSearchesViewPage_RootClass_Common
} from "page_js/data_pages/project_search_ids_driven_pages/scan_file_to_searches_page/main_page_code/scanFileToSearchesViewPage_RootClass_Common";

/**
 * 
 */
export class ScanFileToSearchesViewPage_RootClass_LoggedInUsers {
	
	/**
	 * 
	 */
	constructor() {

    }

	/**
	 * 
	 */
	initialize() {

		const dataPages_LoggedInUser_CommonObjectsFactory = new DataPages_LoggedInUser_CommonObjectsFactory();
		dataPages_LoggedInUser_CommonObjectsFactory.initialize();

        const scanFileToSearchesViewPage_RootClass_Common = new ScanFileToSearchesViewPage_RootClass_Common({ dataPages_LoggedInUser_CommonObjectsFactory });
        scanFileToSearchesViewPage_RootClass_Common.initialize();
    }
}