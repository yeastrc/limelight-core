/**
 * peptideViewPage_RootLaunch_LoggedInUsers.js
 * 
 * For peptideView.jsp page  
 * 
 * Root Launch Javascript for logged in users
 * 
 * 
 * This is required in ...RootLaunch... files: const Handlebars = require('handlebars/runtime');
 * 
 * 
 */


//  This is required in this 'RootLaunch' file to add Handlebars before anything else is added to the bundle

// @ts-ignore
import { Handlebars, _dummy_template_template_bundle } from './peptideViewPage_RootLaunch_ImportHandlebars';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

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
