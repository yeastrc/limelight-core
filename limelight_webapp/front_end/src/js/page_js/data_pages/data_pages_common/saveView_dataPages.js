/**
 * saveView_dataPages.js
 * 
 * Javascript for Data Pages: Save the current view/URL.  Optionally for single search, set as default
 * 
 */


let Handlebars = require('handlebars/runtime');

let _save_view_template_bundle = require("../../../../../handlebars_templates_precompiled/save_view/save_view_template-bundle.js");

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { dataPageStateManager_Keys } from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts.js';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM.js';

import { ModalOverlay } from 'page_js/data_pages/display_utilities/modalOverlay.js';



/**
 * 
 */
export class SaveView_dataPages {

	/**
	 * 
	 */
	constructor() {

        if (!_save_view_template_bundle.save_view__on_main_page_root) {
			throw Error("Nothing in _save_view_template_bundle.save_view__on_main_page_root");
		}
        this._save_view__on_main_page_root_Template = _save_view_template_bundle.save_view__on_main_page_root;
        
        if (!_save_view_template_bundle.save_view_overlay_contents) {
			throw Error("Nothing in _save_view_template_bundle.save_view_overlay_contents");
		}
        this._save_view_overlay_contents_Template = _save_view_template_bundle.save_view_overlay_contents;
        
        
    }

	/**
	 * 
	 */
	initialize({ projectSearchIds }) {

        const objectThis = this;

        this._projectSearchIds = projectSearchIds;

        //  Populate Button for Save View

        const $selector_save_view_root_container = $(".selector_save_view_root_container");
        if ( $selector_save_view_root_container.length === 0 ) {
            console.log("Unable to initialize class SaveView_dataPages.  No DOM element with class 'selector_save_view_root_container'");
            return;
        }
        
        //  Get is user Project Owner
        const $page_auth_access_level_project_owner_allowed = $("#page_auth_access_level_project_owner_allowed");
        if ( $page_auth_access_level_project_owner_allowed.length !== 0 ) {
            this._userIsProjectOwner = true;
        }

        this._canSetDefault = this._userIsProjectOwner && this._projectSearchIds.length === 1
    	

        const saveViewMainPageHTML = this._save_view__on_main_page_root_Template();
        $selector_save_view_root_container.append( saveViewMainPageHTML );

        const $selector_save_view_button = $selector_save_view_root_container.find(".selector_save_view_button");

        $selector_save_view_button.click( function(eventObject) {
			try {
				eventObject.preventDefault();
                objectThis._saveView_MainPage_ButtonClicked();
                return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
    }

	/**
	 * 
	 */
	_saveView_MainPage_ButtonClicked() {

		if ( ! this._modalOverlay ) {
			
			this._modalOverlay = this._createModalOverlay( {  } );
		}
		this._modalOverlay.show();
		
    }

    /**
     * Create and return the overlay, but don't show it
     * 
     * @param {*} param0 
     */
    _createModalOverlay( {  } ) {
    	
    	const objectThis = this;

        let props = { };
        props.width = '800';
        props.height = '500'
        props.title = 'Save View';
        props.$containerDiv = $('body' );
        props.hideOnBackgroundClick = true;

        let $contentDiv = this._createModalOverlayContentDiv( {  } );
        props.$contentDiv = $contentDiv;
        
        props.callbackOnClickedHide = function() {
        	
        	objectThis._cancel_button_Click();
        }

        let overlay = new ModalOverlay( props );

        //  Hack to make checkbox work since ModalOverlay is doing weird things.
        if ( this._canSetDefault ) {
            const $selector_save_view_as_default_checkbox = $contentDiv.find(".selector_save_view_as_default_checkbox");
            if ( $selector_save_view_as_default_checkbox.length === 0 ) {
                throw Error("No element with class 'selector_save_view_as_default_checkbox'");
            }
            $selector_save_view_as_default_checkbox.click( function(eventObject) {
                try {
                    eventObject.preventDefault();
                    const $clickThis = $( this );
                    const checkboxValue = $clickThis.prop( "checked" );
                    window.setTimeout(() => {
                        //  Hack to make checkbox work since ModalOverlay is doing weird things.
                        //  Set checkbox to same value after timeout
                        $clickThis.prop( "checked", checkboxValue );
                    }, 1 );
                    return false;
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }
        
        const $selector_save_view_button = $contentDiv.find(".selector_save_view_button");
        if ( $selector_save_view_button.length === 0 ) {
        	throw Error("No element with class 'selector_save_view_button'");
        }
        $selector_save_view_button.click( function(eventObject) {
			try {
				eventObject.preventDefault();
                objectThis._save_view_button_Overlay_Click({ clickThis : this });
                return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });
        
        return overlay;
    }
    
	/**
	 * 
	 */
    _createModalOverlayContentDiv( {  } ) {

    	let contentDivHTML = this._save_view_overlay_contents_Template( { canSetDefault : this._canSetDefault } );
    	let $contentDiv = $( contentDivHTML );
    	return $contentDiv;
    }
    
	/**
	 * 
	 */
	_hide_remove_ModalOverlay() {
	
		this._modalOverlay.hide();
		
		this._modalOverlay.remove();
		
		this._modalOverlay = undefined;
	}
	
	/**
	 * 
	 */
	_cancel_button_Click() {
		
		this._hide_remove_ModalOverlay();
	}
	
	/**
	 * 
	 */
    _save_view_button_Overlay_Click({ clickThis }) {

        //  view label

        const $clickThis = $( clickThis );
        const $selector_save_view_overlay_root_container = $clickThis.closest(".selector_save_view_overlay_root_container");
        if ( $selector_save_view_overlay_root_container.length === 0 ) {
            throw Error("No DOM element with class 'selector_save_view_overlay_root_container'");
        }

        let setDefault = false;
        if ( this._canSetDefault ) {
            const $selector_save_view_as_default_checkbox = $selector_save_view_overlay_root_container.find(".selector_save_view_as_default_checkbox");
            if ( $selector_save_view_as_default_checkbox.length === 0 ) {
                throw Error("No element with class 'selector_save_view_as_default_checkbox'");
            }
            setDefault = $selector_save_view_as_default_checkbox.prop( "checked" );
        }

        const $selector_save_view_label = $selector_save_view_overlay_root_container.find(".selector_save_view_label");
        if ( $selector_save_view_label.length === 0 ) {
            throw Error("No DOM element with class 'selector_save_view_label'");
        }
        const viewLabel = $selector_save_view_label.val();

        if ( viewLabel === "" ) {
            //  No Label provided for view
            return;  // EARLY EXIT
        }

        var pageCurrentURL = window.location.href;

        const pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

        const controllerStart = pageCurrentURL.indexOf( pageControllerPath );
        if ( controllerStart === -1 ) {
            throw Error("Controller Path not found in current Page/Window URL.  pageControllerPath: " + pageControllerPath + ", pageCurrentURL: " + pageCurrentURL );
        }

        const pageCurrentURL_StartAtPageController = pageCurrentURL.substring( controllerStart );
        
        const parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();
        const pageStatePartsFromURL = parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();
        
		const searchDataLookupParametersCode = pageStatePartsFromURL.searchDataLookupParametersCode;
		const pageStateIdentifier = pageStatePartsFromURL.pageStateIdentifier;
		const pageStateString = pageStatePartsFromURL.pageStateString;
		const referrer = pageStatePartsFromURL.referrer;

        this._saveViewToServer({ viewLabel, pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode, setDefault, projectSearchIds : this._projectSearchIds })

        this._hide_remove_ModalOverlay();
    }

	/**
     * Save the view to the server
	 */
	_saveViewToServer( { viewLabel, pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode, setDefault, projectSearchIds } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
                    projectSearchIds,
                    label : viewLabel,
                    pageControllerPath,
                    pageCurrentURL_StartAtPageController,
                    searchDataLookupParametersCode,
                    setDefault
			};

			let _URL = "d/rws/for-page/psb/insert-saved-view/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get Peptide List START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get Peptide List END, Now: " + new Date() );

						resolve( responseData.reportedPeptideList );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};

}

