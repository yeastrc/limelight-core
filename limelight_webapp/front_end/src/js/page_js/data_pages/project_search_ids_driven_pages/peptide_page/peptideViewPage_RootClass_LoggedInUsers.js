/**
 * peptideViewPage_RootClass_LoggedInUsers.js
 * 
 * For peptideView.jsp page
 * 
 * Root Class for Logged In Users
 * 
 * Does special code for logged in Users 
 * and then creates and initializes 
 * class PeptideViewPage_RootClass_Common 
 * in file peptideViewPage_RootClass_Common.js
 * 
 */

 //  Imports

import { SaveView_dataPages } from 'page_js/data_pages/data_pages_common/saveView_dataPages.js';

//  From local dir
import { PeptideViewPage_RootClass_Common }  
	from 'page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootClass_Common.js';

/**
 * 
 */
export class PeptideViewPage_RootClass_LoggedInUsers {
	
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
        
        const peptideViewPage_RootClass_Common = new PeptideViewPage_RootClass_Common({ saveView_dataPages });
        peptideViewPage_RootClass_Common.initialize();
    }
}