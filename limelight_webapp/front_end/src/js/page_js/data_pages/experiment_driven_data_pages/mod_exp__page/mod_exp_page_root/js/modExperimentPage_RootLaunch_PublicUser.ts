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


import { Handlebars, _dummy_template_template_bundle } from './modExperimentPage_RootLaunch_ImportHandlebars'


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
