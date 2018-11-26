/**
 * modViewPage_RootLaunch_LoggedInUsers.js
 * 
 * For modView.jsp page  
 * 
 * Root Launch Javascript for logged in users
 * 
 * 
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

//  From local dir
import { ModViewPage_RootClass_LoggedInUsers }  
	from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootClass_LoggedInUsers.js';

///////////////

$(document).ready(function() {

	try {
		var modViewPage_RootClass_LoggedInUsers = new ModViewPage_RootClass_LoggedInUsers();
		modViewPage_RootClass_LoggedInUsers.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
