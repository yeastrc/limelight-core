/**
 * proteinList_CentralStateManagerObjectClass.js
 * 
 * Holds the state of the Protein List.  Registers with CentralPageStateManager
 * 
 * For use with:  centralPageStateManager.js
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { PROTEIN_LIST__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys.js';




const _COMPONENT_UNIQUE_ID = PROTEIN_LIST__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data 

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _GROUP_PROTEINS_PROPERTY_NAME = 'b';

/**
 * 
 */
export class ProteinList_CentralStateManagerObjectClass {

	/**
	 * IMPORTANT:
	 * 
	 * A value in initialProteinSequenceVersionId will not trigger a call to this._centralPageStateManager.setState(...).
	 *   Thus, those values will not automatically be reflected on the browser URL.
     * 
     * A value in initialProteinSequenceVersionId will be overlaid by any values on the URL for this component
	 */
	constructor( { centralPageStateManager, initialProteinSequenceVersionId } ) {

		this._value = {};

		if ( initialProteinSequenceVersionId !== undefined ) {
			this._value.proteinSequenceVersionId = initialProteinSequenceVersionId;
		}

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
				groupProteins : encodedStateData[ _GROUP_PROTEINS_PROPERTY_NAME ],
            };
		}
	}

	clearAll() {

		this._value = {};
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}
	
	setGroupProteins( { groupProteins } ) {
		this._value.groupProteins = groupProteins;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	getGroupProteins() {
		return this._value.groupProteins;
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

		if ( this._value.groupProteins !== undefined ) {
			dataForEncoding[ _GROUP_PROTEINS_PROPERTY_NAME ] = this._value.groupProteins;
		}
		return dataForEncoding;
	}
}