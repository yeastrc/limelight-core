/**
 * experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.ts
 * 
 * Experiment Pages:
 * 
 * Holds the state of the Selected Experiment Condition Ids and Experiment Condition Ids.  Registers with CentralPageStateManager
 * 
 * For use with:  centralPageStateManager.js
 * 
 * This class is specifically designed to work with 
 *    class ExperimentConditions_GraphicRepresentation_SelectedCells
 *    in experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections.ts
 * 
 *    !!!!  class ExperimentConditions_GraphicRepresentation_SelectedCells 
 *          ASSUMES that only it is updating the instance of this class that it is holding.
 * 
 * It works with that class since that class represents selected conditions in a specific way to work with 
 *    class Experiment_SingleExperiment_ConditionsGraphicRepresentation extends React.Component
 *    in experiment_SingleExperiment_ConditionsGraphicRepresentation.tsx
 * 
 * 
 * !!!  For selecting Conditions:
 * 
 *    In the grid in ExperimentConditions_GraphicRepresentation, 
 *    any cell that contains a condition label can be independently selected.
 * 
 *    For selection of condition for condition group index > 1 (after second condition group, which is the left most condition group)
 *    the path of condition ids from the second condition group (Left most condition group) to the selected condition label cell is stored.
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check'

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';


import { PROTEIN_EXPERIMENT_PAGE_SELECTED_CONDITION_IDS_CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';



const _COMPONENT_UNIQUE_ID = PROTEIN_EXPERIMENT_PAGE_SELECTED_CONDITION_IDS_CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data 

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _SELECTED_CONDITION_IDS_FIRST_CONDITION_GROUP_ENCODING_PROPERTY_NAME = 'b';
const _SELECTED_CONDITION_IDS_OTHER_THAN_FIRST_CONDITION_GROUP_ENCODING_PROPERTY_NAME = 'c';

/**
 * for class property _value
 */
class InternalStateObject {

	selectedConditionIds_First_ConditionGroup? : Set<number>
	selectedConditionIdPaths_OtherThan_First_ConditionGroup? : Array<Array<number>>
}


/**
 * 
 */
export class Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass {

	private _value : InternalStateObject = {};

	private _centralPageStateManager : CentralPageStateManager;

	/**
	 * IMPORTANT:
	 * 
	 */
	constructor( { centralPageStateManager } :  { centralPageStateManager : CentralPageStateManager } ) {

		//  No centralPageStateManager value if used for an override

		if ( centralPageStateManager ) {
			this._centralPageStateManager = centralPageStateManager;
			
			this._centralPageStateManager.register( { component : this } );
		}
	}
	
	initialize() {
		let encodedStateData = this._centralPageStateManager.getEncodedData( { component : this } );
		if ( encodedStateData ) {

			let selectedConditionIds : Set<number> = undefined
			{
				const selectedConditionIds_FirstConditionGroup_Encoded = encodedStateData[ _SELECTED_CONDITION_IDS_FIRST_CONDITION_GROUP_ENCODING_PROPERTY_NAME ];

				if ( selectedConditionIds_FirstConditionGroup_Encoded ) {
					if ( ! ( selectedConditionIds_FirstConditionGroup_Encoded instanceof Array ) ) {
						const msg = "Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass::initialize(): if ( ! ( selectedConditionIds_FirstConditionGroup_Encoded instanceof Array ) )";
						console.warn( msg )
						throw Error( msg )
					}
					for ( const selectedConditionIds_FirstConditionGroup of selectedConditionIds_FirstConditionGroup_Encoded ) {
						if ( ! variable_is_type_number_Check( selectedConditionIds_FirstConditionGroup ) ) {
							const msg = "Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass::initialize(): if ( ! variable_is_type_number_Check( selectedConditionIds_FirstConditionGroup ) )";
							console.warn( msg )
							throw Error( msg )
						}
					}
					selectedConditionIds = new Set( selectedConditionIds_FirstConditionGroup_Encoded );
				}
			}
			let selectedConditionIdPaths_OtherThan_First_ConditionGroup : Array<Array<number>> = undefined;
			{
				selectedConditionIdPaths_OtherThan_First_ConditionGroup = encodedStateData[ _SELECTED_CONDITION_IDS_OTHER_THAN_FIRST_CONDITION_GROUP_ENCODING_PROPERTY_NAME ];

				if ( selectedConditionIdPaths_OtherThan_First_ConditionGroup ) {
					if (!(selectedConditionIdPaths_OtherThan_First_ConditionGroup instanceof Array)) {
						const msg = "Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass::initialize(): if ( ! ( selectedConditionIdPaths_OtherThan_First_ConditionGroup instanceof Array ) )";
						console.warn(msg)
						throw Error(msg)
					}
					for ( const selectedConditionIdPaths_OtherThan_First_ConditionGroup_OuterEntry of selectedConditionIdPaths_OtherThan_First_ConditionGroup ) {
						for (const selectedConditionIdPaths_OtherThan_First_ConditionGroup_InnerEntry of selectedConditionIdPaths_OtherThan_First_ConditionGroup_OuterEntry) {
							if (!variable_is_type_number_Check(selectedConditionIdPaths_OtherThan_First_ConditionGroup_InnerEntry)) {
								const msg = "Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass::initialize(): if ( ! variable_is_type_number_Check( selectedConditionIdPaths_OtherThan_First_ConditionGroup_InnerEntry ) )";
								console.warn(msg)
								throw Error(msg)
							}
						}
					}
				}
			}

            this._value = {
				selectedConditionIds_First_ConditionGroup: selectedConditionIds,
				selectedConditionIdPaths_OtherThan_First_ConditionGroup
            };
		}
	}

	/**
	 *
	 */
	clearAll() {

		this._value = {};
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 *
	 */
	clear_All_ConditionSelection_Entries() {

		if ( this._value.selectedConditionIds_First_ConditionGroup ) {
			this._value.selectedConditionIds_First_ConditionGroup.clear();
		}
		if ( this._value.selectedConditionIdPaths_OtherThan_First_ConditionGroup ) {
			this._value.selectedConditionIdPaths_OtherThan_First_ConditionGroup = [];
		}
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 *
	 */
	set_selectedConditionIds_FirstConditionGroup( selectedConditionIds : Set<number> ) {

		if ( selectedConditionIds && ! ( selectedConditionIds instanceof Set ) ) {
			throw Error("set_selectedConditionIds_FirstConditionGroup(...): parameter must be type Set")
		}
		this._value.selectedConditionIds_First_ConditionGroup = selectedConditionIds;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	/**
	 *
	 */
	get_selectedConditionIds_First_ConditionGroup() : Set<number> {
		return this._value.selectedConditionIds_First_ConditionGroup;
	}

	/**
	 *
	 */
	set_selectedConditionIdPaths_OtherThan_First_ConditionGroup( selectedConditionIdPaths : Array<Array<number>> ) {

		if ( selectedConditionIdPaths && ! ( selectedConditionIdPaths instanceof Array ) ) {
			throw Error("set_selectedConditionIdPaths_OtherThan_First_ConditionGroup(...): parameter must be type Set")
		}
		this._value.selectedConditionIdPaths_OtherThan_First_ConditionGroup = selectedConditionIdPaths;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	/**
	 *
	 */
	get_selectedConditionIdPaths_OtherThan_First_ConditionGroup() : Array<Array<number>> {
		return this._value.selectedConditionIdPaths_OtherThan_First_ConditionGroup;
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
		// @ts-ignore
		dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

		if ( this._value.selectedConditionIds_First_ConditionGroup !== undefined ) {

			const selectedConditionIds_First_ConditionGroup_Array = Array.from( this._value.selectedConditionIds_First_ConditionGroup );
			// @ts-ignore
			dataForEncoding[ _SELECTED_CONDITION_IDS_FIRST_CONDITION_GROUP_ENCODING_PROPERTY_NAME ] = selectedConditionIds_First_ConditionGroup_Array;
		}
		// @ts-ignore
		dataForEncoding[ _SELECTED_CONDITION_IDS_OTHER_THAN_FIRST_CONDITION_GROUP_ENCODING_PROPERTY_NAME ] = this._value.selectedConditionIdPaths_OtherThan_First_ConditionGroup;

		return dataForEncoding;
	}
}

//////////////////////////////
//////////////////////////////
//////////////////////////////

//  Functions not in any class

// const _ENCODING_SELECTED_CONDITION_IDS__RADIX = 35;
// const _ENCODING_SELECTED_CONDITION_IDS__SEPARATOR = "Z";

// /**
//  * Encode selectedConditionIds : Set<number> for compact storage in State in URL
//  */
// const _encode_selectedConditionIds = function( selectedConditionIds : Set<number> ) : string {

// 	if ( ( ! selectedConditionIds ) || selectedConditionIds.size === 0 ) {
// 		// No value if nothing to encode
// 		return undefined;
// 	}

// 	//  Order the values and compute offsets
// 	//  Encode into base _ENCODING_SELECTED_CONDITION_IDS__RADIX
// 	//  Separate using _ENCODING_SELECTED_CONDITION_IDS__SEPARATOR

// 	const selectedConditionIds_Array = Array.from( selectedConditionIds );

// 	//  Order the values
// 	selectedConditionIds_Array.sort( (a,b) => {
// 		if ( a < b ) {
// 			return -1;
// 		}
// 		if ( a > b ) {
// 			return -1;
// 		}
// 		return 0
// 	});

// 	//  compute offsets
// 	const selectedConditionIds_Offsets : Array<number> = [];
// 	{
// 		let prev_selectedConditionId = undefined;
// 		for ( const selectedConditionId of selectedConditionIds_Array ) {
// 			if ( prev_selectedConditionId === undefined ) {
// 				// First value
// 				selectedConditionIds_Offsets.push( selectedConditionId );
// 			} else {
// 				const offset = selectedConditionId - prev_selectedConditionId;
// 				selectedConditionIds_Offsets.push( offset );
// 			}
// 			prev_selectedConditionId = selectedConditionId;
// 		}
// 	}
// 	//  compute offsets as string using radix
// 	const selectedConditionIds_Offsets_AsStringUsingRadix : Array<string> = [];
// 	for ( const offset of selectedConditionIds_Offsets ) {
// 		const offset_AsStringUsingRadix = offset.toString( _ENCODING_SELECTED_CONDITION_IDS__RADIX );
// 		selectedConditionIds_Offsets_AsStringUsingRadix.push( offset_AsStringUsingRadix );
// 	}

// 	//  Compute result string using separator

// 	const encodedString = selectedConditionIds_Offsets_AsStringUsingRadix.join( _ENCODING_SELECTED_CONDITION_IDS__SEPARATOR );

// 	return encodedString;
// }


// /**
//  * Encode selectedConditionIds : Set<number> for compact storage in State in URL
//  */
// const _decode_selectedConditionIds = function( selectedConditionIds_Encoded : string ) : Set<number> {

// 	if ( ( ! selectedConditionIds_Encoded ) || selectedConditionIds_Encoded === "" ) {
// 		// No value if nothing to decode
// 		return undefined;
// 	}

// 	const split_selectedConditionIds_Encoded = selectedConditionIds_Encoded.split( _ENCODING_SELECTED_CONDITION_IDS__SEPARATOR );

// 	const result_selectedConditionIds : Set<number> = new Set();

// 	{
// 		let prev_DecimalValue_selectedConditionId = undefined;

// 		for ( const split_selectedConditionIds_Encoded_Entry of split_selectedConditionIds_Encoded ) {

// 			const decimalValue_selectedConditionId = Number.parseInt( split_selectedConditionIds_Encoded_Entry, _ENCODING_SELECTED_CONDITION_IDS__RADIX );
// 			if ( prev_DecimalValue_selectedConditionId === undefined ) {
// 				// First value
// 				result_selectedConditionIds.add( decimalValue_selectedConditionId );
// 			} else {
// 				// NOT First value so decimalValue_selectedConditionId is an offset
// 				const decimalValue_selectedConditionId_Actual = decimalValue_selectedConditionId + prev_DecimalValue_selectedConditionId;
// 				result_selectedConditionIds.add( decimalValue_selectedConditionId_Actual );
// 			}
// 			prev_DecimalValue_selectedConditionId = decimalValue_selectedConditionId;
// 		}
// 	}

// 	return result_selectedConditionIds;
// }
