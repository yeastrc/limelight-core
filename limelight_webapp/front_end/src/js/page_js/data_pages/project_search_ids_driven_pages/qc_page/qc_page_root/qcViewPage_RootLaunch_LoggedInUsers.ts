/**
 * qcViewPage_RootLaunch_LoggedInUsers.js
 * 
 * For qcView.jsp page
 * 
 * Root Launch Javascript for logged in users
 *
 */

 import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


//  From local dir
import { ProteinViewPage_RootClass_LoggedInUsers }  from './qcViewPage_RootClass_LoggedInUsers';

///////////////

$(document).ready(function() {

	try {
		var qcViewPage_RootClass_LoggedInUsers = new ProteinViewPage_RootClass_LoggedInUsers();
		qcViewPage_RootClass_LoggedInUsers.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
