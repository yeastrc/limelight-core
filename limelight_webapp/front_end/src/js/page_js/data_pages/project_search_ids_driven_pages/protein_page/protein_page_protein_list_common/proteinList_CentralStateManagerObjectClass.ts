/**
 * proteinList_CentralStateManagerObjectClass.ts
 * 
 * Holds the state of the Protein List.  Registers with CentralPageStateManager
 * 
 * For use with:  centralPageStateManager.js
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { PROTEIN_LIST__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';




const _COMPONENT_UNIQUE_ID = PROTEIN_LIST__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data 

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

//   V1 Group Proteins.  Kept for Backwards compatibility.   Now Handled in proteinGrouping_CentralStateManagerObjectClass.ts.
const _GROUP_PROTEINS_PROPERTY_NAME = 'b';

/**
 * 
 */
export class ProteinList_CentralStateManagerObjectClass {

	private _value : { 
		groupProteins_OLD_V1? : any //  OLD V1 value for groupProteins.  Only here for Backwards compatibility.   Now Handled in proteinGrouping_CentralStateManagerObjectClass.ts.
	};

	private _centralPageStateManager;

	/**
	 * 
	 */
	constructor( { centralPageStateManager } ) {

		this._value = {};

		//  No centralPageStateManager value if used for an override

		if ( centralPageStateManager ) {
			this._centralPageStateManager = centralPageStateManager;
			
			this._centralPageStateManager.register( { component : this } );
		}
	}
	
	initialize() {
		let encodedStateData = this._centralPageStateManager.getEncodedData( { component : this } );
		if ( encodedStateData ) {
            this._value = {
				// groupProteins_OLD_V1? : any //  OLD V1 value for groupProteins.  Only here for Backwards compatibility.   Now Handled in proteinGrouping_CentralStateManagerObjectClass.ts.
				groupProteins_OLD_V1 : encodedStateData[ _GROUP_PROTEINS_PROPERTY_NAME ],
            };
		}
	}

	clearAll() {

		this._value = {};
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	//  remove since OLD
	
	// setGroupProteins( { groupProteins } ) {
	// 	this._value.groupProteins = groupProteins;

	// 	if ( ! this._centralPageStateManager ) {
	// 		throw Error( "this._centralPageStateManager not set" );
	// 	}
	// 	this._centralPageStateManager.setState( { component : this } );
	// }

	// getGroupProteins() {
	// 	return this._value.groupProteins;
	// }

    /**
     * Exists to provide a way to transfer value to State Manager Object Class ProteinGrouping_CentralStateManagerObjectClass in proteinGrouping_CentralStateManagerObjectClass.ts
	 */
	get_OLD_V1_GroupProteins() {
		// groupProteins_OLD_V1? : any //  OLD V1 value for groupProteins.  Only here for Backwards compatibility.   Now Handled in proteinGrouping_CentralStateManagerObjectClass.ts.
		return this._value.groupProteins_OLD_V1;
	}

    /**
     * Called by Central State Manager and maybe other code
	 */
	getUniqueId() {
		return _COMPONENT_UNIQUE_ID;
	}
	
    /**
     * Called by Central State Manager and maybe other code
	 */
	getDataForEncoding() {

		const dataForEncoding = {}
		dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

		//  Do NOT encode since OLD version
		// if ( this._value.groupProteins !== undefined ) {
		// 	dataForEncoding[ _GROUP_PROTEINS_PROPERTY_NAME ] = this._value.groupProteins;
		// }

		return dataForEncoding;
	}
}