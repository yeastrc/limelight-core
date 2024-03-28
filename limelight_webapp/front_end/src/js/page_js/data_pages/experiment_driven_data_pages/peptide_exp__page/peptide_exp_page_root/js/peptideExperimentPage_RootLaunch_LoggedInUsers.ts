/**
 * peptideExperimentPage_RootLaunch_LoggedInUsers.ts
 * 
 * For peptide_Experiment.jsp page  
 * 
 * Root Launch Javascript for logged in users
 *
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';


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
