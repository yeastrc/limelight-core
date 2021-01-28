/**
 * peptideExperimentPage_RootClass_LoggedInUsers.ts
 * 
 * For peptide_Experiment.jsp page
 * 
 * Root Class for Logged In Users
 * 
 * Does special code for logged in Users 
 * and then creates and initializes 
 * class PeptideExperimentPage_RootClass_Common 
 * in file peptideExperimentPage_RootClass_Common.js
 * 
 */

//  Imports

import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';

//  From local dir
import { PeptideExperimentPage_RootClass_Common }  from './peptideExperimentPage_RootClass_Common';

/**
 * 
 */
export class PeptideExperimentPage_RootClass_LoggedInUsers {
	
	/**
	 * 
	 */
	constructor() {

    }

	/**
	 * 
	 */
	initialize() {

		const experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory = new Experiment_DataPages_LoggedInUser_CommonObjectsFactory();
		experiment_DataPages_LoggedInUser_CommonObjectsFactory.initialize();

        const peptideExperimentPage_RootClass_Common = new PeptideExperimentPage_RootClass_Common({ experiment_DataPages_LoggedInUser_CommonObjectsFactory });
        peptideExperimentPage_RootClass_Common.initialize();
    }
}