/**
 * proteinExperimentPage_RootClass_LoggedInUsers.ts
 * 
 * For protein_Experiment.jsp page
 * 
 * Root Class for Logged In Users
 * 
 * Does special code for logged in Users 
 * and then creates and initializes 
 * class ProteinExperimentPage_RootClass_Common 
 * in file proteinExperimentPage_RootClass_Common.js
 * 
 */

//  Imports

import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';

//  From local dir
import { ProteinExperimentPage_RootClass_Common }  from './proteinExperimentPage_RootClass_Common';

/**
 * 
 */
export class ProteinExperimentPage_RootClass_LoggedInUsers {
	
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

        const proteinExperimentPage_RootClass_Common = new ProteinExperimentPage_RootClass_Common({ experiment_DataPages_LoggedInUser_CommonObjectsFactory });
        proteinExperimentPage_RootClass_Common.initialize();
    }
}