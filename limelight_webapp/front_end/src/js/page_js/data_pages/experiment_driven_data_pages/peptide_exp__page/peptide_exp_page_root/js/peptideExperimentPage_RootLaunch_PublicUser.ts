/**
 * peptideExperimentPage_RootLaunch_PublicUser.ts
 * 
 * For peptide_Experiment.jsp page  
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class PeptideExperimentPage_RootClass_Common
 * 
 * 
 * !!!  This will stay Javascript (".js") and not Typescript since uses "require" for import of Handlebars and Handlebars Precompiled Templates
 * 
 */

import Handlebars = require('handlebars/runtime');
import _dummy_template_template_bundle = require("../../../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );
Handlebars.templates = _dummy_template_template_bundle;


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


//  From local dir
import { PeptideExperimentPage_RootClass_Common }  from './peptideExperimentPage_RootClass_Common';

///////////////

$(document).ready(function() {

	try {
		const peptideExperimentPage_RootClass_Common = new PeptideExperimentPage_RootClass_Common({});
		peptideExperimentPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
