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

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory.js';

//  From local dir
import { ProteinViewPage_RootClass_Common }  
	from './proteinViewPage_RootClass_Common.js';

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

		const dataPages_LoggedInUser_CommonObjectsFactory = new DataPages_LoggedInUser_CommonObjectsFactory();
		dataPages_LoggedInUser_CommonObjectsFactory.initialize();

        const proteinViewPage_RootClass_Common = new ProteinViewPage_RootClass_Common({ dataPages_LoggedInUser_CommonObjectsFactory });
        proteinViewPage_RootClass_Common.initialize();
    }
}