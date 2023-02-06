/**
 * scanFileBrowserViewPage_RootLaunch_LoggedInUsers.js
 * 
 * For qcView.jsp page
 * 
 * Root Launch Javascript for logged in users
 * 
 * !!!  This will stay Javascript (".js") and not Typescript since uses "require" for import of Handlebars and Handlebars Precompiled Templates
 * 
 * !!!  This is required in ...RootLaunch... files: const Handlebars = require('handlebars/runtime');
 * 
 * 
 */


//  This is required in this 'RootLaunch' file to add Handlebars before anything else is added to the bundle

import { Handlebars, _dummy_template_template_bundle } from './scanFileBrowserViewPage_RootLaunch_ImportHandlebars';

 import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


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
