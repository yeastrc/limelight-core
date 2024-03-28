/**
 * peptideExperimentPage_RootLaunch_PublicUser.ts
 * 
 * For peptide_Experiment.jsp page  
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class PeptideExperimentPage_RootClass_Common
 *
 */

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
