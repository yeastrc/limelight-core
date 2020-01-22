/**
 * webserviceCallStandardPost_ApiObject_Class.js
 * 
 * class for 'api' property returned from 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


/**
 * 
 */
export class WebserviceCallStandardPost_ApiObject_Class {

	private _request;
	private _abortCalled : boolean;

	/**
	 * 
	 */
	constructor() {

		this._abortCalled = false;
	}
	
	/**
	 * 
	 */
	abort() : void {
		if ( this._request ) {
			this._abortCalled = true;
			this._request.abort();
			this._request = undefined;
		}
	}
    
	/**
	 * !!!!  Only Call this from webserviceCallStandardPost__InternalJS.js
	 */
	_set_request( _request : any ) : void {
		this._request = _request;
	}

	/**
	 * !!!!  Only Call this from webserviceCallStandardPost__InternalJS.js
	 */
	_clear_request() : void {
		this._request = undefined;
	}

	/**
	 * !!!!  Only Call this from webserviceCallStandardPost__InternalJS.js
	 */
	_is_abortCalled() : boolean {
		return this._abortCalled;
	}
}


/**
 * 
 */
export class WebserviceCallStandardPost_ApiObject_Holder_Class {

	webserviceCallStandardPost_ApiObject_Class : WebserviceCallStandardPost_ApiObject_Class

}
