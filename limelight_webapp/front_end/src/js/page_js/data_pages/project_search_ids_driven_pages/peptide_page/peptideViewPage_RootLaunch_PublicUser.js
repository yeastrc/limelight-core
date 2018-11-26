/**
 * peptideViewPage_RootLaunch_PublicUser.js
 * 
 * For peptideView.jsp page  
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class PeptideViewPage_RootClass_Common
 * 
 * 
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

//  From local dir
import { PeptideViewPage_RootClass_Common }  
	from 'page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootClass_Common.js';

///////////////

$(document).ready(function() {

	try {
		var peptideViewPage_RootClass_Common = new PeptideViewPage_RootClass_Common();
		peptideViewPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
