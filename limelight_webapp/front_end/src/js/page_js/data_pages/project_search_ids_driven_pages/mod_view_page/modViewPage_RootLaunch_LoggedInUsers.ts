/**
 * modViewPage_RootLaunch_LoggedInUsers.ts
 * 
 * For modView.jsp page  
 * 
 * Root Launch Javascript for logged in users
 *
 * 
 */


//  This is required in this 'RootLaunch' file to add Handlebars before anything else is added to the bundle

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

//  From local dir
import { ModViewPage_RootClass_LoggedInUsers }  
	from './modViewPage_RootClass_LoggedInUsers';

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
