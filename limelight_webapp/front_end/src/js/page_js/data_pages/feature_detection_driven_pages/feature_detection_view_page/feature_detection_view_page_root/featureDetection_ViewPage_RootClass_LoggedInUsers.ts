/**
 * featureDetection_ViewPage_RootClass_LoggedInUsers.ts
 * 
 * For qcView.jsp page
 * 
 * Root Class for Logged In Users
 * 
 * Does special code for logged in Users 
 * and then creates and initializes 
 * class ProteinViewPage_RootClass_Common 
 * in file featureDetection_ViewPage_RootClass_Common.ts
 * 
 */

//  Imports

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

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

		//  Create to next input to constructor for ProteinViewPage_RootClass_Common
		const dataPages_LoggedInUser_CommonObjectsFactory = new DataPages_LoggedInUser_CommonObjectsFactory();
		dataPages_LoggedInUser_CommonObjectsFactory.initialize();

		//  Main Root Class for featureDetection_ViewPage
        // const featureDetection_ViewPage_RootClass_Common = new ScanFileBrowserViewPage_RootClass_Common({ dataPages_LoggedInUser_CommonObjectsFactory });
        // featureDetection_ViewPage_RootClass_Common.initialize();
    }
}