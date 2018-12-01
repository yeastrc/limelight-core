/**
 * proteinViewPage_RootClass_LoggedInUsers.js
 * 
 * For proteinView.jsp page
 * 
 * Root Class for Logged In Users
 * 
 * Does special code for logged in Users 
 * and then creates and initializes 
 * class ProteinViewPage_RootClass_Common 
 * in file proteinViewPage_RootClass_Common.js
 * 
 */

 //  Imports

import { SaveView_dataPages } from 'page_js/data_pages/data_pages_common/saveView_dataPages.js';

//  From local dir
import { ProteinViewPage_RootClass_Common }  
	from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_RootClass_Common.js';

/**
 * 
 */
export class ProteinViewPage_RootClass_LoggedInUsers {
	
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
        
        const proteinViewPage_RootClass_Common = new ProteinViewPage_RootClass_Common({ saveView_dataPages });
        proteinViewPage_RootClass_Common.initialize();
    }
}