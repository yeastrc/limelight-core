/**
 * modViewPage_RootLaunch_LoggedInUsers.ts
 * 
 * For modView.jsp page  
 * 
 * Root Launch Javascript for logged in users
 * 
 * 
 * 
 * This is required in ...RootLaunch... files: const Handlebars = require('handlebars/runtime');
 * 
 * 
 */


//  This is required in this 'RootLaunch' file to add Handlebars before anything else is added to the bundle

import { Handlebars, _dummy_template_template_bundle } from './modViewPage_RootLaunch_ImportHandlebars'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//  From local dir
import { ModViewPage_RootClass_LoggedInUsers }  
	from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootClass_LoggedInUsers';

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
