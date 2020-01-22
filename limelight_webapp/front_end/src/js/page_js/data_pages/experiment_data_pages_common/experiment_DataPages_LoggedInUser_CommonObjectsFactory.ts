/**
 * experiment_DataPages_LoggedInUser_CommonObjectsFactory.ts
 * 
 * Javascript for Data Pages
 * 
 * Creates objects from classes that are for Logged In Users.
 * 
 */


 //  Imports


import { SaveView_Create_Component_React_Type } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'
import { saveView_Create_Component_React } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React';

/**
 * 
 */
export class Experiment_DataPages_LoggedInUser_CommonObjectsFactory {
	
	/**
	 * 
	 */
	constructor() {

    }

	/**
	 * 
	 */
	initialize() {


    }

    /**
     * Create object of class SaveView_dataPages
     * 
     */
    getFunctionToGet_SaveView_dataPages_ComponentAndProps() : SaveView_Create_Component_React_Type {

        return saveView_Create_Component_React;
    }
}
