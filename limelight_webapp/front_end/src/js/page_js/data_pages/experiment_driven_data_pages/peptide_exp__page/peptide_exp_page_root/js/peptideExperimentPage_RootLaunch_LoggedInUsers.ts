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

// @ts-ignore
import { Handlebars, _dummy_template_template_bundle } from './peptideExperimentPage_RootLaunch_ImportHandlebars'

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
