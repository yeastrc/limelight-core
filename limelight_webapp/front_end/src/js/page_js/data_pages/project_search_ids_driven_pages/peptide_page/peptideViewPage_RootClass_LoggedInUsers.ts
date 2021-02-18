/**
 * peptideViewPage_RootClass_LoggedInUsers.ts
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

import { Handlebars, _dummy_template_template_bundle } from './peptideViewPage_RootLaunch_ImportHandlebars';

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

//  From local dir
import { PeptideViewPage_RootClass_Common }  
	from 'page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootClass_Common';

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

		const dataPages_LoggedInUser_CommonObjectsFactory = new DataPages_LoggedInUser_CommonObjectsFactory();
		dataPages_LoggedInUser_CommonObjectsFactory.initialize();

        const peptideViewPage_RootClass_Common = new PeptideViewPage_RootClass_Common({ dataPages_LoggedInUser_CommonObjectsFactory });
        peptideViewPage_RootClass_Common.initialize();
    }
}