/**
 * scanFileBrowserViewPage_RootLaunch_LoggedInUsers.js
 * 
 * For scanFileBrowserView.jsp page
 * 
 * Root Launch Javascript for logged in users
 *
 */

 import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';


//  From local dir
import { ProteinViewPage_RootClass_LoggedInUsers }  from './scanFileBrowserViewPage_RootClass_LoggedInUsers';

///////////////

$(document).ready(function() {

	try {
		var scanFileBrowserViewPage_RootClass_LoggedInUsers = new ProteinViewPage_RootClass_LoggedInUsers();
		scanFileBrowserViewPage_RootClass_LoggedInUsers.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
