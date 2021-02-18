/**
 * testPageComponent.js
 * 
 * 
 * for testing testPageComponent.js  centralPageStateManager.js
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

const _COMPONENT_UNIQUE_ID = 'TestPageComponent'; // Normally return a single character or 2 characters

/**
 * 
 */
export class TestPageComponent {

	_centralPageStateManager: any
	_value : any

	/**
	 * IMPORTANT:
	 * 
	 * An initialKey and initialValue will not trigger a call to this._centralPageStateManager.setState(...).
	 *   Thus, those values will not automatically be reflected on the browser URL.
	 */
	constructor( { centralPageStateManager, initialKey, initialValue } ) {

		this._centralPageStateManager = centralPageStateManager;
		
		this._centralPageStateManager.register( { component : this } );
		
		//  Hard coded arbitrary starting value
		this._value = { a : 105 };

		if ( initialKey !== undefined ) {
			this._value[ initialKey ] = initialValue;
		}
	}
	
	initialize() {
		let encodedData = this._centralPageStateManager.getEncodedData( { component : this } );
		if ( encodedData ) {
			this._value = encodedData;
		}
		const z = 0;
	}
	
	setValue( { key, value } ) {
		this._value[ key ] = value;
		this._centralPageStateManager.setState( { component : this } );
	}

	getUniqueId() {
		return _COMPONENT_UNIQUE_ID;
	}
	
	getDataForEncoding() {
		const dataForEncoding = this._value;
		return dataForEncoding;
	}
}