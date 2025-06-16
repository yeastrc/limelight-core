/**
 * searchSubGroup_CentralStateManagerObjectClass.ts
 * 
 * Holds the state of the Search Sub Group Selection.
 *
 * !!!   Used in 2 Ways:
 *
 * 1) On Main Page, Registers with CentralPageStateManager,  For use with:  centralPageStateManager.js
 *
 * 2)  On Single Protein Overlay, is sub-part of Single Protein Overlay State object
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { SEARCH_SUB_GROUP_SELECTION_CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';




const _COMPONENT_UNIQUE_ID = SEARCH_SUB_GROUP_SELECTION_CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data 

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _PROJECT_SEARCH_ID_ENCODING_PROPERTY_NAME = 'b';  //  Single Project Search Id since only applicable for 1 project search id

const _SELECTED_SEARCH_SUB_GROUP_IDS = 'c';

const _NO_SELECTED_SEARCH_SUB_GROUP_IDS = 'd';  //  Track when no search sub ids are selected, since the default is for all search subgroup ids to be selected

/**
 * 
 */
export class SearchSubGroup_CentralStateManagerObjectClass {

	private _value : {
		projectSearchId? : number
		selectedSearchSubGroupIds? : Set<number>  //  Undefined if all are selected, to minimize storage needs
		no_selectedSearchSubGroupIds? : boolean
	};

	private _centralPageStateManager : CentralPageStateManager;

	/**
	 * Create Instance for Main Page
	 */
	static getNewInstance_MainPage( { centralPageStateManager } : { centralPageStateManager : CentralPageStateManager } ) : SearchSubGroup_CentralStateManagerObjectClass {

		if ( ! centralPageStateManager ) {
			const msg = "getNewInstance_MainPage: centralPageStateManager is required."
			console.warn( msg );
			throw Error(msg);
		}

		const instance = new SearchSubGroup_CentralStateManagerObjectClass({ centralPageStateManager });

		return instance;
	}

	/**
	 * Create Instance for Single Protein
	 */
	static getNewInstance_SingleProtein() : SearchSubGroup_CentralStateManagerObjectClass {

		const instance = new SearchSubGroup_CentralStateManagerObjectClass({ centralPageStateManager: undefined });

		return instance;
	}

	/**
	 * 
	 */
	private constructor( { centralPageStateManager } : { centralPageStateManager : CentralPageStateManager } ) {

		this._value = {};

		//  No centralPageStateManager value if used for an override or for Single Protein

		if ( centralPageStateManager ) {
			this._centralPageStateManager = centralPageStateManager;
			
			this._centralPageStateManager.register( { component : this } );
		}
	}

	/**
	 *
	 */
	initialize_MainPageInstance({ current_ProjectSearchIds } : { current_ProjectSearchIds : Array<number> }) : void {

		let encodedStateData = this._centralPageStateManager.getEncodedData( { component : this } );
		this.initialize_From_current_ProjectSearchIds({ current_ProjectSearchIds, encodedStateData });
	}

	/**
	 *
	 */
	initialize_SingleProteinInstance(
		{
			current_ProjectSearchIds,
			encodedStateData
		} : {
			current_ProjectSearchIds : Array<number>
			encodedStateData: any
		}) : void {

		if (encodedStateData) {

			this.initialize_From_current_ProjectSearchIds({ current_ProjectSearchIds, encodedStateData });
		}
	}

	/**
	 *
	 */
	private initialize_From_current_ProjectSearchIds(
		{
			current_ProjectSearchIds,
			encodedStateData
		} : {
			current_ProjectSearchIds : Array<number>
			encodedStateData: any

		}) : void {

		if ( encodedStateData ) {

			if ( current_ProjectSearchIds.length !== 1 ) {

				//  More than 1 Project Search Id so clear the values and exit

				this._value = {};
				return; // EARLY RETURN
			}

			const current_ProjectSearchId = current_ProjectSearchIds[ 0 ];

			const projectSearchId_FromURL = encodedStateData[ _PROJECT_SEARCH_ID_ENCODING_PROPERTY_NAME ]
			if ( projectSearchId_FromURL !== undefined && projectSearchId_FromURL !== current_ProjectSearchId ) {

				//  Project Search Id has changed so clear the values and exit

				this._value = {};
				return; // EARLY RETURN
			}

			let selectedSearchSubGroupIds : Set<number> = undefined;
			if ( encodedStateData[ _SELECTED_SEARCH_SUB_GROUP_IDS ] ) {
				selectedSearchSubGroupIds = new Set<number>( encodedStateData[ _SELECTED_SEARCH_SUB_GROUP_IDS ] )
			}

            this._value = {
				projectSearchId: current_ProjectSearchId,
				selectedSearchSubGroupIds,
				no_selectedSearchSubGroupIds : encodedStateData[ _NO_SELECTED_SEARCH_SUB_GROUP_IDS ]
            };
		}
	}

	clearAll() {

		this._value = {};
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	set_projectSearchId( { projectSearchId } : { projectSearchId : number } ) {
		this._value.projectSearchId = projectSearchId;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	get_projectSearchId() : number {
		return this._value.projectSearchId;
	}

	/**
	 *
	 * @param selectedSearchSubGroupIds - Undefined if all are selected, to minimize storage needs
	 */
	set_selectedSearchSubGroupIds( { selectedSearchSubGroupIds } : { selectedSearchSubGroupIds : Set<number> } ) {
		this._value.selectedSearchSubGroupIds = selectedSearchSubGroupIds;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}

	/**
	 * @returns Undefined if all are selected, to minimize storage needs
	 */
	get_selectedSearchSubGroupIds() : Set<number> {
		return this._value.selectedSearchSubGroupIds;
	}

	set_no_selectedSearchSubGroupIds( { no_selectedSearchSubGroupIds } : { no_selectedSearchSubGroupIds : boolean } ) {
		this._value.no_selectedSearchSubGroupIds = no_selectedSearchSubGroupIds;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	get_no_selectedSearchSubGroupIds() : boolean {
		return this._value.no_selectedSearchSubGroupIds;
	}



	/**
     * Called by Central State Manager and maybe other code
	 */
	getUniqueId() {
		return _COMPONENT_UNIQUE_ID;
	}
	
    /**
     * Called by Central State Manager and Single Protein Display code
	 */
	getDataForEncoding() {

		const dataForEncoding: { [key: string]: any } = {}
		dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

		if ( this._value.projectSearchId !== undefined ) {
			dataForEncoding[ _PROJECT_SEARCH_ID_ENCODING_PROPERTY_NAME ] = this._value.projectSearchId;
		}
		if ( this._value.selectedSearchSubGroupIds !== undefined ) {
			dataForEncoding[ _SELECTED_SEARCH_SUB_GROUP_IDS ] = Array.from( this._value.selectedSearchSubGroupIds );
		}
		if ( this._value.no_selectedSearchSubGroupIds !== undefined ) {
			dataForEncoding[ _NO_SELECTED_SEARCH_SUB_GROUP_IDS ] = this._value.no_selectedSearchSubGroupIds;
		}

		return dataForEncoding;
	}
}