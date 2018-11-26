/**
 * dataPageStateManager.js
 * 
 * Javascript:  A simple "State Manager" where all page state will be stored.
 * 
 * page variable: dataPageStateManagerFactory - Create DataPageStateManager object and return it
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

/**
 * 
 */
class DataPageStateManager {

	/**
	 * 
	 */
	constructor() {
		this._pageState = {};
		this._changeListeners = [];
	}

	/**
	 * 
	 */
	addChangeListener( listener ) {
		this._changeListeners.push( listener );
	}
	
	/**
	 * 
	 */
	getStateForURL() {
		return JSON.stringify( this._pageState );
	}

	/**
	 * 
	 */
	replaceStateWithObjectFromURL( newState ) {
		this._pageState = newState;
	}
	
	
	/**
	 * 
	 */
	_notifyListeners() {

		this._changeListeners.forEach(function( listener, index, array) {
			listener();
		}, this)
	}
	
	/**
	 * 
	 */
	getPageState( key ) {
		
		if ( key === undefined || key === null || key === "" ) {
			throw Error("Key not provided");
		}
		if ( this._pageState[ key ] === undefined ) {
			throw Error("Key not in page state: " + key );
		}
		
		return this._pageState[ key ];
	};

	/**
	 * 
	 */
	getPageStateAllowNotInPageState( key ) {
		
		if ( key === undefined || key === null || key === "" ) {
			throw Error("Key not provided");
		}
		
		return this._pageState[ key ];
	};


	/**
	 * 
	 */
	setPageState( key, value ) {

		if ( key === undefined || key === null || key === "" ) {
			throw Error("Key not provided");
		}

		this._pageState[ key ] = value;
		
		this._notifyListeners();
	};

};


export { DataPageStateManager }
