/**
 * proteinViewPage_RootLaunch_LoggedInUsers.js
 * 
 * For proteinView.jsp page  
 * 
 * Root Launch Javascript for logged in users
 * 
 * 
 */


 import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';


//  From local dir
import { ProteinViewPage_RootClass_LoggedInUsers }  
	from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_RootClass_LoggedInUsers.js';

///////////////

$(document).ready(function() {

	try {
		var proteinViewPage_RootClass_LoggedInUsers = new ProteinViewPage_RootClass_LoggedInUsers();
		proteinViewPage_RootClass_LoggedInUsers.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
