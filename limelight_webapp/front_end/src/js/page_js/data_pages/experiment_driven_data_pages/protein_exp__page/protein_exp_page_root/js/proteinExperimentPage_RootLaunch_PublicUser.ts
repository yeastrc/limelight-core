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

import { Handlebars, _dummy_template_template_bundle } from './proteinExperimentPage_RootLaunch_ImportHandlebars'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import {ProteinExperimentPage_RootClass_Common} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_RootClass_Common";


//  From local dir

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
