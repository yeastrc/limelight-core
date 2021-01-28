/**
 * modExperimentPage_RootLaunch_PublicUser.js
 * 
 * For mod_Experiment.jsp page  
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class ProteinExperimentPage_RootClass_Common
 *
 */

import Handlebars = require('handlebars/runtime');
import _dummy_template_template_bundle =
	require("../../../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );
Handlebars.templates = _dummy_template_template_bundle;


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


//  From local dir
import { ModExperimentPage_RootClass_Common }  from './modExperimentPage_RootClass_Common';

///////////////

$(document).ready(function() {

	try {
		const modExperimentPage_RootClass_Common = new ModExperimentPage_RootClass_Common({});
		modExperimentPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
