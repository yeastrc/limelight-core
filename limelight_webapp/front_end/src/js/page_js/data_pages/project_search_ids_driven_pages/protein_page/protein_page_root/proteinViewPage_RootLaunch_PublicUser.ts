/**
 * proteinViewPage_RootLaunch_PublicUser.js
 * 
 * For proteinView.jsp page  
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class ProteinViewPage_RootClass_Common
 *
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';


//  From local dir
import { ProteinViewPage_RootClass_Common }  from './proteinViewPage_RootClass_Common';

///////////////

$(document).ready(function() {

	try {
		var proteinViewPage_RootClass_Common = new ProteinViewPage_RootClass_Common({});
		proteinViewPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
