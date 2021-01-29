/**
 * proteinExperimentPage_RootLaunch_PublicUser.ts
 * 
 * For protein_Experiment.jsp page  
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class ProteinExperimentPage_RootClass_Common
 *
 */

import Handlebars = require('handlebars/runtime');
import _dummy_template_template_bundle =
	require("../../../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );

//  Code compiles with assignment to Handlebars.templates. Just IDE that flags it.
Handlebars.templates = _dummy_template_template_bundle;


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


//  From local dir
import { ProteinExperimentPage_RootClass_Common }  from './proteinExperimentPage_RootClass_Common';

///////////////

$(document).ready(function() {

	try {
		const proteinExperimentPage_RootClass_Common = new ProteinExperimentPage_RootClass_Common({});
		proteinExperimentPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
