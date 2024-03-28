/**
 * proteinExperimentPage_RootLaunch_LoggedInUsers.js
 * 
 * For protein_Experiment.jsp page  
 * 
 * Root Launch Javascript for logged in users
 *
 */

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
