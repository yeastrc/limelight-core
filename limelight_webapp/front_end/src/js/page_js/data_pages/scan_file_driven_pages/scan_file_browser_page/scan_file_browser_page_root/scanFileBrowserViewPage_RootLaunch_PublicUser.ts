/**
 * scanFileBrowserViewPage_RootLaunch_PublicUser.js
 * 
 * For qcView.jsp page
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class ProteinViewPage_RootClass_Common
 * 
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
import { ScanFileBrowserViewPage_RootClass_Common }  from './scanFileBrowserViewPage_RootClass_Common';

///////////////

$(document).ready(function() {

	try {
		var scanFileBrowserViewPage_RootClass_Common = new ScanFileBrowserViewPage_RootClass_Common({});
		scanFileBrowserViewPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
