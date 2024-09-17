/**
 * scanFileToSearchesViewPage_RootLaunch_LoggedInUsers.js
 * 
 * For scanFileToSearchesView.jsp page
 * 
 * Root Launch Javascript for logged in users
 *
 * 
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import {
	ScanFileToSearchesViewPage_RootClass_LoggedInUsers
} from "page_js/data_pages/project_search_ids_driven_pages/scan_file_to_searches_page/main_page_code/scanFileToSearchesViewPage_RootClass_LoggedInUsers";

///////////////

$(document).ready(function() {

	try {
		var scanFileToSearchesViewPage_RootClass_LoggedInUsers = new ScanFileToSearchesViewPage_RootClass_LoggedInUsers();
		scanFileToSearchesViewPage_RootClass_LoggedInUsers.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
