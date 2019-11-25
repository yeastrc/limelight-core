/**
 * centralPageStateManager.js
 * 
 * Javascript:  A "State Manager" where all page state not stored in the searchDataLookupParametersCode will be stored.
 * 
 * This Reads from and updates the URL in the address bar, updating the 'page_state_string' 
 * 
 *    ..pagename/searchDataLookupParametersCode/q/page_state_string
 *    
 *    Nav from project page:
 *       ...pagename/searchDataLookupParametersCode/r
 *    
 *    Nav from other page:
 *       ...pagename/searchDataLookupParametersCode/q/page_state_string/r
 * 
 * What is stored in searchDataLookupParametersCode:
 *    Project Search Ids, in chosen display order
 *    Cutoffs/Filters per Project Search Ids.
 *    Annotation types to display per Project Search Ids.
 * 
 * **************************
 * 
 * Calling setState(...) method on this class causes it to call getDataForEncoding() on all registered components and updates the URL.
 * 
 * Any component that registers with this class has to implement the following methods:
 * 
 * 		getUniqueId()
 * 		getDataForEncoding()
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { StringCompressDecompress }  from 'page_js/data_pages/data_pages_common/compressDecompressString.js';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts.js';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM.js';
import { NewURL_Build_PerProjectSearchIds }  from 'page_js/data_pages/data_pages_common/newURL_Build_PerProjectSearchIds.js';

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants.js';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_dataPages_Maint.js';

/**
 * 
 */
export class CentralPageStateManager {

	/**
	 * 
	 */
	constructor() {
		this._stateLoadedFromURL = false;
		this._pageState = {};
		this._registeredComponents = new Map();
		
		this._parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();
		this._stringCompressDecompress = new StringCompressDecompress();
	}

	/**
	 * 
	 */
	getInitialStateFromURL() {

		const pageStatePartsFromURL = this._parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();
		const searchDataLookupParametersCode = pageStatePartsFromURL.searchDataLookupParametersCode;
		const pageStateIdentifier = pageStatePartsFromURL.pageStateIdentifier;
		const pageStateString = pageStatePartsFromURL.pageStateString;
		const referrer = pageStatePartsFromURL.referrer;

		let pageState = undefined

		if ( pageStateString ) {

			let stateAsJSON = undefined;
			
			try {
				stateAsJSON = this._stringCompressDecompress.decompress( pageStateString );
			} catch( e ) {
				throw Error("Failed to uncompress pageStateString: " + pageStateString );
			}

			if ( stateAsJSON ) {

				try {
					pageState = JSON.parse( stateAsJSON );
				} catch( e ) {
					throw Error("Failed to Parse stateAsJSON: " + stateAsJSON );
				}

				this._pageState = pageState;
			}
		}
		
		return { referrer };
	}

	/**
	 * 
	 */
	clearReferrerFlagFromURL() {

		let windowPath = window.location.pathname;
		
		if ( windowPath.endsWith( _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR ) ) {
			
			const newURLlength = windowPath.length - _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR.length
		
			let newURL = windowPath.substring( 0, newURLlength );

			window.history.replaceState( null, null, newURL );
		}
	}
	
	/**
	 * 
	 */
	register( { component } ) {
		if ( ! component.getUniqueId ) {
			throw Error("register() Component does not have method named getUniqueId");
		}
		const componentUniqueId = component.getUniqueId();
		if ( this._registeredComponents.has( componentUniqueId ) ) {
			return false;
		}
		this._registeredComponents.set( componentUniqueId, component);
		return true;
	}

	/**
	 * 
	 */	
	unregister( { componentUniqueId } ) {

		if ( this._registeredComponents.delete( componentUniqueId ) ) {
			return true;
		}
		return false;
	}
	
	/**
	 * 
	 */
	getEncodedData( { component } ) {
		const componentUniqueId = component.getUniqueId();
		if ( ! this._registeredComponents.has( componentUniqueId ) ) {
			throw( "getEncodedData() Component unique id not registered: " + componentUniqueId );
		}
		const componentData = this._pageState[ componentUniqueId ];
		return componentData;
	}
	
	/**
	 * 
	 */
	setState( { component } ) {
		const componentUniqueId = component.getUniqueId();
		if ( ! this._registeredComponents.has( componentUniqueId ) ) {
			throw( "setState() Component unique id not registered: " + componentUniqueId );
		}
		if ( ! component.getDataForEncoding ) {
			throw Error("setState() Component does not have method named getDataForEncoding");
		}
		const componentData = component.getDataForEncoding();
		this._pageState[ componentUniqueId ] = componentData;

		//  Remove any page state for componentUniqueId not in this._registeredComponents
		if ( this._pageState ) {
			for ( const pageStatePropertyNames of Object.keys( this._pageState ) ) {
				if ( ! this._registeredComponents.has( pageStatePropertyNames ) ) {
					delete this._pageState[ pageStatePropertyNames ];
				}
			}
		}
		
		this._updateURL();
	}

	/**
	 * 
	 */
	_updateStateFromAllRegisteredComponents( { pageStateObject } ) {
		
		const componentUniqueIds = this._registeredComponents.keys();
		for ( const componentUniqueId of componentUniqueIds ) {
			
			const componentData = this._registeredComponents.get( componentUniqueId ).getDataForEncoding();
			pageStateObject[ componentUniqueId ] = componentData; 
		}
	}
	
	/**
	 * 
	 */
	_updateURL() {

		const newURL = this.getURL_ForCurrentState();

		window.history.replaceState( null, null, newURL );

		navigation_dataPages_Maint_Instance._updateNavLinks();
	}

	/**
	 * Params:  
	 * componentOverridesAdditions - Array of components that will be added after the registered components.  These will override page state values if the same unique id.
	 *    								The array will be processed into an object with properties of unique id to remove duplicates.
	 * 
	 * return: String of URL for current state (and componentOverridesAdditions if present)
	 */
	getURL_ForCurrentState( params ) {

		let componentOverridesAdditions = undefined;

		if ( params ) {
			componentOverridesAdditions = params.componentOverridesAdditions;
		}

		let pageStateObject = this._pageState;

		if ( componentOverridesAdditions ) {

			pageStateObject = {};  // Change to empty object since going to add values from componentOverridesAdditions
		}

		//  Initial update/add values from registered components
		this._updateStateFromAllRegisteredComponents( { pageStateObject } );

		if ( componentOverridesAdditions ) {

			for ( const entry of componentOverridesAdditions ) {
				const componentUniqueId = entry.getUniqueId()
				const componentData = entry.getDataForEncoding();
				pageStateObject[ componentUniqueId ] = componentData;
			}
		}

		// Current URL contents
		const pageStatePartsFromURL = this._parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();

		const searchDataLookupParametersCode = pageStatePartsFromURL.searchDataLookupParametersCode;

		//  Not used
		//		let pageStateIdentifier = pageStatePartsFromURL.pageStateIdentifier;

		const pageState = pageStatePartsFromURL.pageState;
		const referrer = pageStatePartsFromURL.referrer;

		//		if ( ! pageStateIdentifier ) {
		//			pageStateIdentifier = _STANDARD_PAGE_STATE_IDENTIFIER;
		//		}

		const stateAsJSON = JSON.stringify( pageStateObject );

		let stateAsJSON_Compressed = this._stringCompressDecompress.compress(stateAsJSON);

		let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

		let newURL =
			NewURL_Build_PerProjectSearchIds.newURL_Build_PerProjectSearchIds(
				{
					pageControllerPath,
					searchDataLookupParamsCode: searchDataLookupParametersCode,
					pageStateIdentifier: _STANDARD_PAGE_STATE_IDENTIFIER,
					pageStateString: stateAsJSON_Compressed,
					referrer: undefined
				});

		return newURL;
	}
}

