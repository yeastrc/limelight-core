/**
 * scanFileToSearchesViewPage_RootLaunch_PublicUser.ts
 * 
 * For scanFileToSearchesView.jsp page
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class ScanFileToSearchesViewPage_RootClass_Common
 *
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import {
	ScanFileToSearchesViewPage_RootClass_Common
} from "page_js/data_pages/project_search_ids_driven_pages/scan_file_to_searches_page/main_page_code/scanFileToSearchesViewPage_RootClass_Common";


///////////////

$(document).ready(function() {

	try {
		var scanFileToSearchesViewPage_RootClass_Common = new ScanFileToSearchesViewPage_RootClass_Common({});
		scanFileToSearchesViewPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
