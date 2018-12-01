/**
 * singleProtein_CentralStateManagerObjectClass.js
 * 
 * Holds the state of the Single Protein Overlay.  Registers with CentralPageStateManager
 * 
 * For use with:  centralPageStateManager.js
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { SINGLE_PROTEIN__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys.js';




const _COMPONENT_UNIQUE_ID = SINGLE_PROTEIN__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data 

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _PROTEIN_SEQENCE_VERSION_ID_ENCODING_PROPERTY_NAME = 'b';
const _PROTEIN_SEQUENCE_FORMATTED_DISPLAY_WIDGET_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'c';
const _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'd';

/**
 * 
 */
export class SingleProtein_CentralStateManagerObjectClass {

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
				proteinSequenceVersionId : encodedStateData[ _PROTEIN_SEQENCE_VERSION_ID_ENCODING_PROPERTY_NAME ],
				proteinSequenceFormattedDisplayWidgetEncodedStateData : encodedStateData[ _PROTEIN_SEQUENCE_FORMATTED_DISPLAY_WIDGET_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				modsSelectedEncodedStateData : encodedStateData[ _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ]
            };
		}
	}

	clearAll() {

		this._value = {};
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}
	
	setProteinSequenceVersionId( { proteinSequenceVersionId } ) {
		this._value.proteinSequenceVersionId = proteinSequenceVersionId;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	getProteinSequenceVersionId() {
		return this._value.proteinSequenceVersionId;
	}

	setProteinSequenceFormattedDisplayWidgetEncodedStateData( { proteinSequenceFormattedDisplayWidgetEncodedStateData } ) {
		this._value.proteinSequenceFormattedDisplayWidgetEncodedStateData = proteinSequenceFormattedDisplayWidgetEncodedStateData;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	getProteinSequenceFormattedDisplayWidgetEncodedStateData() {
		return this._value.proteinSequenceFormattedDisplayWidgetEncodedStateData;
	}


	setModsSelectedEncodedStateData( { modsSelectedEncodedStateData } ) {
		this._value.modsSelectedEncodedStateData = modsSelectedEncodedStateData;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	getModsSelectedEncodedStateData() {
		return this._value.modsSelectedEncodedStateData;
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

		if ( this._value.proteinSequenceVersionId !== undefined ) {
			dataForEncoding[ _PROTEIN_SEQENCE_VERSION_ID_ENCODING_PROPERTY_NAME ] = this._value.proteinSequenceVersionId;
		}
		if ( this._value.proteinSequenceFormattedDisplayWidgetEncodedStateData !== undefined ) {
			dataForEncoding[ _PROTEIN_SEQUENCE_FORMATTED_DISPLAY_WIDGET_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.proteinSequenceFormattedDisplayWidgetEncodedStateData;
		}
		if ( this._value.modsSelectedEncodedStateData !== undefined ) {
			dataForEncoding[ _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.modsSelectedEncodedStateData;
		}

		return dataForEncoding;
	}
}