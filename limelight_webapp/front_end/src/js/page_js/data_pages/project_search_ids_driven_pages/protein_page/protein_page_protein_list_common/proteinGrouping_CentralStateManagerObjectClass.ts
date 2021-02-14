/**
 * proteinGrouping_CentralStateManagerObjectClass.ts
 * 
 * Holds the state of the Protein Groups User Selection.  Registers with CentralPageStateManager
 * 
 * For use with:  centralPageStateManager.js
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { PROTEIN_GROUPING__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';
import { ProteinList_CentralStateManagerObjectClass } from './proteinList_CentralStateManagerObjectClass';


const _COMPONENT_UNIQUE_ID = PROTEIN_GROUPING__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data 

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _GROUP_PROTEINS_PROPERTY_NAME = 'b';



//  Group Proteins values stored in _GROUP_PROTEINS_PROPERTY_NAME

const _PROTEIN_GROUP_SELECTION_NO = 'a';

const _PROTEIN_GROUP_SELECTION_GROUP_PROTEINS_ALL = 'b';

const _PROTEIN_GROUP_SELECTION_GROUP_PROTEINS_NON_SUBSET = 'c';

const _PROTEIN_GROUP_SELECTION_GROUP_PROTEINS_PARSIMONIOUS = 'd';



/**
 * 
 */
export class ProteinGrouping_CentralStateManagerObjectClass {

	private _initializeCalled : boolean = false;

	private _value : {
		groupProteins? : string
	};

	private _centralPageStateManager : CentralPageStateManager;
	private _proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass;

	/**
	 * IMPORTANT:
	 * 
	 * A value in initialProteinSequenceVersionId will not trigger a call to this._centralPageStateManager.setState(...).
	 *   Thus, those values will not automatically be reflected on the browser URL.
     * 
     * A value in initialProteinSequenceVersionId will be overlaid by any values on the URL for this component
	 */
	constructor({ centralPageStateManager, proteinList_CentralStateManagerObjectClass } : {

		centralPageStateManager : CentralPageStateManager, proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass
	} ) {

		this._value = {};

		//  No centralPageStateManager value if used for an override

		if ( centralPageStateManager ) {
			this._centralPageStateManager = centralPageStateManager;
			
			this._centralPageStateManager.register( { component : this } );
		}

		//  No proteinList_CentralStateManagerObjectClass value if used for an override

		if ( proteinList_CentralStateManagerObjectClass ) {
			this._proteinList_CentralStateManagerObjectClass = proteinList_CentralStateManagerObjectClass;
		}
	}
		
	/**
	 * @param proteinList_CentralStateManagerObjectClass - Passed in to get Old Value for GroupProteins to transfer it to this Object Class
	 */
	initialize() : void {

		let encodedStateData = this._centralPageStateManager.getEncodedData( { component : this } );
		if ( encodedStateData ) {

			const encodedVersion = encodedStateData[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ]
			if ( encodedVersion === 1 ) {

				this._value = {
					groupProteins : encodedStateData[ _GROUP_PROTEINS_PROPERTY_NAME ]
				};
			} else {
				const msg = "ProteinList_CentralStateManagerObjectClass:initialize: 'encodedVersion' value not recognized.  encodedVersion: " + encodedVersion;
				console.warn( msg );
				throw Error( msg );
			}
		}

		if ( ! this._value.groupProteins ) {
			if ( this._proteinList_CentralStateManagerObjectClass ) {
				const OLD_V1_GroupProteins = this._proteinList_CentralStateManagerObjectClass.get_OLD_V1_GroupProteins();
				if (OLD_V1_GroupProteins) {
					// Value not set and V1 value is true so set to ALL
					this._value.groupProteins = _PROTEIN_GROUP_SELECTION_GROUP_PROTEINS_ALL;
				}
			}
		}

		if ( ! this._value.groupProteins ) {
			this._value.groupProteins = _PROTEIN_GROUP_SELECTION_NO;  // Default to NO
		}

		this._initializeCalled = true;
	}

	clearAll() {

		if ( ! this._initializeCalled ) {
			const msg = "ProteinGrouping_CentralStateManagerObjectClass: initialize() NOT Called. clearAll() is being called"
			console.warn( msg );
			throw Error( msg );
		}

		this._value = {};
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}
	
	setGroupProteins_No_Grouping() : void {

		if ( ! this._initializeCalled ) {
			const msg = "ProteinGrouping_CentralStateManagerObjectClass: initialize() NOT Called. setGroupProteins_No_Grouping() is being called"
			console.warn( msg );
			throw Error( msg );
		}

		this._value.groupProteins = _PROTEIN_GROUP_SELECTION_NO;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}
	setGroupProteins_All_Groups() : void {

		if ( ! this._initializeCalled ) {
			const msg = "ProteinGrouping_CentralStateManagerObjectClass: initialize() NOT Called. setGroupProteins_All_Groups() is being called"
			console.warn( msg );
			throw Error( msg );
		}

		this._value.groupProteins = _PROTEIN_GROUP_SELECTION_GROUP_PROTEINS_ALL;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}
	setGroupProteins_NonSubset_Groups() : void {

		if ( ! this._initializeCalled ) {
			const msg = "ProteinGrouping_CentralStateManagerObjectClass: initialize() NOT Called. setGroupProteins_NonSubset_Groups() is being called"
			console.warn( msg );
			throw Error( msg );
		}

		this._value.groupProteins = _PROTEIN_GROUP_SELECTION_GROUP_PROTEINS_NON_SUBSET;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}
	setGroupProteins_Parsimonious_Groups() : void {

		if ( ! this._initializeCalled ) {
			const msg = "ProteinGrouping_CentralStateManagerObjectClass: initialize() NOT Called. setGroupProteins_Parsimonious_Groups() is being called"
			console.warn( msg );
			throw Error( msg );
		}

		this._value.groupProteins = _PROTEIN_GROUP_SELECTION_GROUP_PROTEINS_PARSIMONIOUS;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	isGroupProteins_No_Grouping() : boolean {

		if ( ! this._initializeCalled ) {
			const msg = "ProteinGrouping_CentralStateManagerObjectClass: initialize() NOT Called. isGroupProteins_No_Grouping() is being called"
			console.warn( msg );
			throw Error( msg );
		}

		const value = this._value.groupProteins === _PROTEIN_GROUP_SELECTION_NO
		return value;
	}
	isGroupProteins_All_Groups() : boolean {

		if ( ! this._initializeCalled ) {
			const msg = "ProteinGrouping_CentralStateManagerObjectClass: initialize() NOT Called. isGroupProteins_All_Groups() is being called"
			console.warn( msg );
			throw Error( msg );
		}

		const value = this._value.groupProteins === _PROTEIN_GROUP_SELECTION_GROUP_PROTEINS_ALL
		return value;
	}
	isGroupProteins_NonSubset_Groups() : boolean {

		if ( ! this._initializeCalled ) {
			const msg = "ProteinGrouping_CentralStateManagerObjectClass: initialize() NOT Called. isGroupProteins_NonSubset_Groups() is being called"
			console.warn( msg );
			throw Error( msg );
		}

		const value = this._value.groupProteins === _PROTEIN_GROUP_SELECTION_GROUP_PROTEINS_NON_SUBSET
		return value;
	}
	isGroupProteins_Parsimonious_Groups() : boolean {

		if ( ! this._initializeCalled ) {
			const msg = "ProteinGrouping_CentralStateManagerObjectClass: initialize() NOT Called. isGroupProteins_Parsimonious_Groups() is being called"
			console.warn( msg );
			throw Error( msg );
		}

		const value = this._value.groupProteins === _PROTEIN_GROUP_SELECTION_GROUP_PROTEINS_PARSIMONIOUS
		return value;
	}

    /**
     * Called by Central State Manager and maybe other code
	 */
	getUniqueId() : any {
		return _COMPONENT_UNIQUE_ID;
	}
	
    /**
     * Called by Central State Manager and maybe other code
	 */
	getDataForEncoding() {
		const dataForEncoding = {}
		// @ts-ignore
		dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

		if ( this._value.groupProteins !== undefined ) {
			// @ts-ignore
			dataForEncoding[ _GROUP_PROTEINS_PROPERTY_NAME ] = this._value.groupProteins;
		}
		return dataForEncoding;
	}
}