/**
 * peptideViewPage_RootLaunch_LoggedInUsers.js
 * 
 * For peptideView.jsp page  
 * 
 * Root Launch Javascript for logged in users
 *
 * 
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

//  From local dir
import { PeptideViewPage_RootClass_LoggedInUsers }  
	from 'page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootClass_LoggedInUsers';

///////////////

$(document).ready(function() {

	try {
		var peptideViewPage_RootClass_LoggedInUsers = new PeptideViewPage_RootClass_LoggedInUsers();
		peptideViewPage_RootClass_LoggedInUsers.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
