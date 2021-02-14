/**
 * centralPageStateManager.js
 * 
 * Javascript:  A "State Manager" where all page state not stored in the searchDataLookupParametersCode will be stored.
 * 
 * This Reads from and updates the URL in the address bar, updating the 'page_state_string'.
 * 
 * 
 * For Project Search Id based Data pages:
 * 
 *    ..pagename/searchDataLookupParametersCode/q/page_state_string
 *    
 *    Nav from project page:
 *       ...pagename/searchDataLookupParametersCode/r
 *    
 *    Nav from other page:
 *       ...pagename/searchDataLookupParametersCode/q/page_state_string/r
 * 
 * For Experiment Id based Data Pages
 * 
 *     ..pagename/e/{experimentId}/q/page_state_string
 * 
 *    User changed Search Filters or Annotation Types to Desplay:
 *        ..pagename/e/{experimentId}/c/{searchDataLookupParametersCode}/q/page_state_string
 * 
 *    Nav from project page:
 *         ..pagename/e/{experimentId}/r
 * 
 *    Nav from other page:
 *         ..pagename/e/{experimentId}/q/page_state_string/r
 *       or
 *         ..pagename/e/{experimentId}/c/{searchDataLookupParametersCode}/q/page_state_string/r
 * 
 * 
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

import { controller_path_prefix_ProjectSearchId_Based_FromDOM, controller_path_prefix_ExperimentId_Based_FromDOM } from 'page_js/data_pages/data_pages_common/controllerPath_Prefixes_FromDOM';

import { StringCompressDecompress }  from 'page_js/data_pages/data_pages_common/compressDecompressString';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';
import { newURL_Build_PerProjectSearchIds_Or_ExperimentId }  from 'page_js/data_pages/data_pages_common/newURL_Build_PerProjectSearchIds_Or_ExperimentId';

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint';

/**
 * 
 */
export class CentralPageStateManager {

	private _stateLoadedFromURL = false;
	private _pageState : any = {}
	private _registeredComponents = new Map();
	//
	private _parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();
	private _stringCompressDecompress = new StringCompressDecompress();

	/**
	 * 
	 */
	constructor() {}

	/**
	 * 
	 */
	getInitialStateFromURL() {

		const pageStatePartsFromURL = this._parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();

		const experimentId = pageStatePartsFromURL.experimentId;
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
	register( { component } : { component : any } ) {
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
	unregister( { componentUniqueId } : { componentUniqueId : any } ) {

		if ( this._registeredComponents.delete( componentUniqueId ) ) {
			return true;
		}
		return false;
	}
	
	/**
	 * 
	 */
	getEncodedData( { component } : { component : any } ) {
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
	setState( { component } : { component : any } ) {
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
	_updateStateFromAllRegisteredComponents( { pageStateObject } : { pageStateObject : any } ) {
		
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

		const newURL = this.getURL_ForCurrentState( undefined );

		window.history.replaceState( null, null, newURL );

		const controller_path_prefix_ProjectSearchId_Based = controller_path_prefix_ProjectSearchId_Based_FromDOM();
		const controller_path_prefix_ExperimentId_Based = controller_path_prefix_ExperimentId_Based_FromDOM();

		if ( newURL.includes( controller_path_prefix_ProjectSearchId_Based ) ) {

			//  Update Navigation Links for Project Search Id Based URLs

			navigation_dataPages_Maint_Instance.updateNavLinks();

		} else if ( newURL.includes( controller_path_prefix_ExperimentId_Based ) ) {

			//  Update Navigation Links for Experiment Id Based URLs



		} else {
			const msg = "ERROR: _updateURL(): newURL does not contain '" + controller_path_prefix_ProjectSearchId_Based + "' or '" + controller_path_prefix_ExperimentId_Based + "'.  newURL: " + newURL;
			console.warn( msg );
			throw Error( msg );
		}
	}

	/**
	 * Params:  
	 * componentOverridesAdditions - Array of components that will be added after the registered components.  These will override page state values if the same unique id.
	 *    								The array will be processed into an object with properties of unique id to remove duplicates.
	 * 
	 * return: String of URL for current state (and componentOverridesAdditions if present)
	 */
	getURL_ForCurrentState( params : any ) {

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

		const experimentId = pageStatePartsFromURL.experimentId;

		const searchDataLookupParametersCode = pageStatePartsFromURL.searchDataLookupParametersCode;

		//  Not used
		//		let pageStateIdentifier = pageStatePartsFromURL.pageStateIdentifier;

		const referrer = pageStatePartsFromURL.referrer;

		//		if ( ! pageStateIdentifier ) {
		//			pageStateIdentifier = _STANDARD_PAGE_STATE_IDENTIFIER;
		//		}

		const stateAsJSON = JSON.stringify( pageStateObject );

		let stateAsJSON_Compressed = this._stringCompressDecompress.compress(stateAsJSON);

		let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

		let newURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({
			pageControllerPath,
			experimentId,
			searchDataLookupParamsCode: searchDataLookupParametersCode,
			pageStateIdentifier: _STANDARD_PAGE_STATE_IDENTIFIER,
			pageStateString: stateAsJSON_Compressed,
			referrer: undefined
		});

		return newURL;
	}
}

