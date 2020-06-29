/**
 * proteinViewPage_RootLaunch_PublicUser.js
 * 
 * For proteinView.jsp page  
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

/**
 * Require Handlebars and dummy_template_template-bundle.js so that Handlebars is properly initialized for other uses of it
 */
const Handlebars = require('handlebars/runtime');
const _dummy_template_template_bundle = 
	require("../../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );
Handlebars.templates = _dummy_template_template_bundle;


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


//  From local dir
import { ProteinViewPage_RootClass_Common }  from './proteinViewPage_RootClass_Common';

///////////////

$(document).ready(function() {

	try {
		var proteinViewPage_RootClass_Common = new ProteinViewPage_RootClass_Common({});
		proteinViewPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
