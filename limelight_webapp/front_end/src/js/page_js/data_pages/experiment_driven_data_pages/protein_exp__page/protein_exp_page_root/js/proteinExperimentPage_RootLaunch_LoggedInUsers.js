/**
 * proteinExperimentPage_RootLaunch_LoggedInUsers.js
 * 
 * For protein_Experiment.jsp page  
 * 
 * Root Launch Javascript for logged in users
 * 
 * 
 * !!!  This will stay Javascript (".js") and not Typescript since uses "require" for import of Handlebars and Handlebars Precompiled Templates
 * 
 */

var Handlebars = require('handlebars/runtime');
var _dummy_template_template_bundle = 
	require("../../../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );
Handlebars.templates = _dummy_template_template_bundle;


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


//  From local dir
import { ProteinExperimentPage_RootClass_LoggedInUsers }  from './proteinExperimentPage_RootClass_LoggedInUsers';

///////////////

$(document).ready(function() {

	try {
		const proteinExperimentPage_RootClass_LoggedInUsers = new ProteinExperimentPage_RootClass_LoggedInUsers();
		proteinExperimentPage_RootClass_LoggedInUsers.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});