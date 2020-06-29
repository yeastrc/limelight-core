/**
 * collapsableSection_StandardProcessing.js
 * 
 * Javascript for 'Standard' Collapse/Expand of section that does not need to get data when expand
 * 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


/**
 * 
 */
export class CollapsableSection_StandardProcessing {

	private _initializeCalled = false

	/**
	 * 
	 */
	constructor(  ) {
		
	};
		
	/**
	 * initialize the page (Add element listeners like onClick, ...)
	 */
	initialize(  ) {

		this.initializeWithRootElement( { $searchRoot : undefined } );
	};
	
	initializeWithRootElement( { $searchRoot } ) {

		try {

			var $selector_collapsable_collapse_link = null;
			var $selector_collapsable_expand_link = null;
			
			if ( $searchRoot ) {
				
				$selector_collapsable_collapse_link = $searchRoot.find(".selector_collapsable_collapse_link");
				$selector_collapsable_expand_link = $searchRoot.find(".selector_collapsable_expand_link")
			} else {
				$selector_collapsable_collapse_link = $(".selector_collapsable_collapse_link");
				$selector_collapsable_expand_link = $(".selector_collapsable_expand_link")
			}
			
			$selector_collapsable_collapse_link.click( function(eventObject) {
	
				try {
	
					var $this = $( this );
					var $selector_collapsable_container = $this.closest(".selector_collapsable_container");
	
					var $selector_collapsable_item = $selector_collapsable_container.children(".selector_collapsable_item");
	
					var $selector_collapsable_expand_link = $selector_collapsable_container.children(".selector_collapsable_expand_link");
	
					if ( $selector_collapsable_expand_link.length === 0 ) {
	
						var $selector_collapsable_link_container = $selector_collapsable_container.children(".selector_collapsable_link_container");
						$selector_collapsable_expand_link = $selector_collapsable_link_container.children(".selector_collapsable_expand_link");
	
					}
	
					$this.hide();
					$selector_collapsable_item.hide();
					$selector_collapsable_expand_link.show();
	
					if ( $selector_collapsable_expand_link.length === 0 ) {
	
						throw Error( 'Unable to find class="collapsable" to hide' );
					}
	
					if ( $selector_collapsable_expand_link.length === 0 ) {
	
						throw Error( "Unable to find expand link" );
					}
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
	
			$selector_collapsable_expand_link.click( function(eventObject) {
	
				try {
	
					var $this = $( this );
					var $selector_collapsable_container = $this.closest(".selector_collapsable_container");
	
					var $selector_collapsable_item = $selector_collapsable_container.children(".selector_collapsable_item");
	
					var $selector_collapsable_collapse_link = $selector_collapsable_container.children(".selector_collapsable_collapse_link");
	
					if ( $selector_collapsable_collapse_link.length === 0 ) {
	
						var $selector_collapsable_link_container = $selector_collapsable_container.children(".selector_collapsable_link_container");
						$selector_collapsable_collapse_link = $selector_collapsable_link_container.children(".selector_collapsable_collapse_link");
	
					}
	
					$this.hide();
					$selector_collapsable_item.show();
					$selector_collapsable_collapse_link.show();
	
					if ( $selector_collapsable_collapse_link.length === 0 ) {
	
						throw Error( 'Unable to find class="collapsable" to show' );
					}
	
					if ( $selector_collapsable_collapse_link.length === 0 ) {
	
						throw Error( "Unable to find collapse link" );
					}
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
	
			});
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	
		this._initializeCalled = true;

	}
}

