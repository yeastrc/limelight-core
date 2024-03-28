/**
 * experiment_ConditionGroups_Order_CentralStateManagerObjectClass.ts
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


import { limelight__variable_is_type_number_Check } from 'page_js/common_all_pages/limelight__variable_is_type_number_Check'

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';


import { PROTEIN_EXPERIMENT_PAGE_CONDITION_GROUPS_ORDER_CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';



const _COMPONENT_UNIQUE_ID = PROTEIN_EXPERIMENT_PAGE_CONDITION_GROUPS_ORDER_CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data 

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _CONDITION_GROUPS_ORDER_ENCODING_PROPERTY_NAME = 'b';

/**
 * for class property _value
 */
class InternalStateObject {

	conditionGroupIds_Order? : Array<number>
}


/**
 * 
 */
export class Experiment_ConditionGroups_Order_CentralStateManagerObjectClass {

	private _initializeCalled : boolean = false;

	private _for_SingleProtein : boolean = false;

	private _value : InternalStateObject = {};

	private _centralPageStateManager : CentralPageStateManager;

	/**
	 * Create Instance for Main Page
	 */
	static getNewInstance_MainPage( { centralPageStateManager } : { centralPageStateManager : CentralPageStateManager } ) : Experiment_ConditionGroups_Order_CentralStateManagerObjectClass {

		if ( ! centralPageStateManager ) {
			const msg = "getNewInstance_MainPage: centralPageStateManager is required."
			console.warn( msg );
			throw Error(msg);
		}

		const instance = new Experiment_ConditionGroups_Order_CentralStateManagerObjectClass({ centralPageStateManager });

		return instance;
	}

	/**
	 * Create Instance for Single Protein
	 */
	static getNewInstance_SingleProtein() : Experiment_ConditionGroups_Order_CentralStateManagerObjectClass {

		const instance = new Experiment_ConditionGroups_Order_CentralStateManagerObjectClass({ centralPageStateManager: undefined });

		instance._for_SingleProtein = true;

		return instance;
	}

	/**
	 * IMPORTANT:
	 * 
	 */
	private constructor( { centralPageStateManager } :  { centralPageStateManager : CentralPageStateManager } ) {

		//  No centralPageStateManager value if used for an override or for Single Protein

		if ( centralPageStateManager ) {
			this._centralPageStateManager = centralPageStateManager;
			
			this._centralPageStateManager.register( { component : this } );
		}
	}

	/**
	 *
	 */
	initialize_MainPageInstance() : void {

		let encodedStateData = this._centralPageStateManager.getEncodedData( { component : this } );
		this._initialize_Internal({ encodedStateData });

		this._initializeCalled = true;
	}

	/**
	 *
	 */
	initialize_SingleProteinInstance(
		{
			encodedStateData
		} : {
			encodedStateData: any
		}) : void {

		this._initialize_Internal({ encodedStateData });

		this._initializeCalled = true;
	}

	/**
	 * Update the state of this object with the value from the URL
	 *
	 */
	private _initialize_Internal(
		{
			encodedStateData
		} : {
			encodedStateData: any
		}) : void {

		if ( encodedStateData ) {
            this._value = {
				conditionGroupIds_Order: encodedStateData[ _CONDITION_GROUPS_ORDER_ENCODING_PROPERTY_NAME ]
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
	set_ConditionGroupIds_Order( conditionGroupIds_Order : Array<number> ) {

		if ( conditionGroupIds_Order && ! ( conditionGroupIds_Order instanceof Array ) ) {
			throw Error("set_ConditionGroupIds_Order(...): parameter must be type Array")
		}
		this._value.conditionGroupIds_Order = conditionGroupIds_Order;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}

	/**
	 *
	 */
	get_ConditionGroupIds_Order() {
		return this._value.conditionGroupIds_Order;
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

		if ( this._value.conditionGroupIds_Order !== undefined ) {

			const selectedConditionIds_First_ConditionGroup_Array = Array.from( this._value.conditionGroupIds_Order );

			dataForEncoding[ _CONDITION_GROUPS_ORDER_ENCODING_PROPERTY_NAME ] = selectedConditionIds_First_ConditionGroup_Array;
		}

		if ( Object.keys( dataForEncoding ).length === 0 ) {

			// NO properties on object to return so return undefined

			return undefined;  //  EARLY RETURN
		}

		dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

		return dataForEncoding;
	}
}
