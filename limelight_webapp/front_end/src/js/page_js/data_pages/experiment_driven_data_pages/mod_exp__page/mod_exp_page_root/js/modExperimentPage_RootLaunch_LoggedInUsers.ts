/**
 * modExperimentPage_RootLaunch_LoggedInUsers.ts
 * 
 * For mod_Experiment.jsp page  
 * 
 * Root Launch Javascript for logged in users
 *
 */

import Handlebars = require('handlebars/runtime');
import _dummy_template_template_bundle =
	require("../../../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );
Handlebars.templates = _dummy_template_template_bundle;


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


//  From local dir
import { ModExperimentPage_RootClass_LoggedInUsers }  from './modExperimentPage_RootClass_LoggedInUsers';

///////////////

$(document).ready(function() {

	try {
		const modExperimentPage_RootClass_LoggedInUsers = new ModExperimentPage_RootClass_LoggedInUsers();
		modExperimentPage_RootClass_LoggedInUsers.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
