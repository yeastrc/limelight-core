/**
 * peptideExperimentPage_RootLaunch_LoggedInUsers.ts
 * 
 * For peptide_Experiment.jsp page  
 * 
 * Root Launch Javascript for logged in users
 * 
 * 
 * !!!  This will stay Javascript (".js") and not Typescript since uses "require" for import of Handlebars and Handlebars Precompiled Templates
 * 
 */

import Handlebars = require('handlebars/runtime');
import _dummy_template_template_bundle =
	require("../../../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );
Handlebars.templates = _dummy_template_template_bundle;


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


//  From local dir
import { PeptideExperimentPage_RootClass_LoggedInUsers }  from './peptideExperimentPage_RootClass_LoggedInUsers';

///////////////

$(document).ready(function() {

	try {
		const peptideExperimentPage_RootClass_LoggedInUsers = new PeptideExperimentPage_RootClass_LoggedInUsers();
		peptideExperimentPage_RootClass_LoggedInUsers.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
