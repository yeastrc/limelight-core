/**
 * sharePage_dataPages.js
 * 
 * Javascript for Data Pages: "Share Page" the current view/URL.  Provides a Shortened URL to the user.
 * 
 * For projects with public access allowed, this button is provided to public (not logged in users) as well.
 * 
 */


let Handlebars = require('handlebars/runtime');

let _share_page_template_bundle = require("../../../../../handlebars_templates_precompiled/share_page/share_page_template-bundle.js");

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

import { dataPageStateManager_Keys } from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts.js';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM.js';

import { ModalOverlay } from 'page_js/data_pages/display_utilities/modalOverlay.js';



/**
 * 
 */
export class SharePage_dataPages {

	/**
	 * 
	 */
	constructor() {

        if (!_share_page_template_bundle.share_page__on_main_page_root) {
			throw Error("Nothing in _share_page_template_bundle.share_page__on_main_page_root");
		}
        this._share_page__on_main_page_root_Template = _share_page_template_bundle.share_page__on_main_page_root;
        
        if (!_share_page_template_bundle.share_page_overlay_contents) {
			throw Error("Nothing in _share_page_template_bundle.share_page_overlay_contents");
		}
        this._share_page_overlay_contents_Template = _share_page_template_bundle.share_page_overlay_contents;
        
        
    }

	/**
	 * 
	 */
	initialize({ projectSearchIds, container_DOM_Element }) {

        const objectThis = this;

        this._projectSearchIds = projectSearchIds;

        //  Populate Button for Save View

        let $sharePageButtonContainer = undefined;

        if ( container_DOM_Element ) {
            // Use Reference to DOM element if provided

            $sharePageButtonContainer = $( container_DOM_Element );
        } else {
            $sharePageButtonContainer = $(".selector_share_page_root_container");
            if ( $sharePageButtonContainer.length === 0 ) {
                console.log("Unable to initialize class SharePage_dataPages.  No DOM element with class 'selector_share_page_root_container'");
                return;
            }
        }

        const sharePageMainPageHTML = this._share_page__on_main_page_root_Template();
        $sharePageButtonContainer.append( sharePageMainPageHTML );

        const $selector_share_page_button = $sharePageButtonContainer.find(".selector_share_page_button");

        $selector_share_page_button.click( function(eventObject) {
			try {
				eventObject.preventDefault();
                objectThis._sharePage_MainPage_ButtonClicked();
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
	_sharePage_MainPage_ButtonClicked() {

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

        const promise_sharePageToServer =
            this._sharePageToServer({ pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode, projectSearchIds : this._projectSearchIds })

        promise_sharePageToServer.catch(() => {
            try {

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promise_sharePageToServer.then(( ajaxResult ) => {
            try {
                const urlShortcutString = ajaxResult.ajaxResult.shortenedUrl;
            
                this._modalOverlay = this._createModalOverlay( { urlShortcutString } );
                this._modalOverlay.show();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

	/**
     * Send Share Page to the server
	 */
	_sharePageToServer( { pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode, projectSearchIds } ) {

		let promise = new Promise( function( resolve, reject ) {
		  try {
			let requestObject = {
                    projectSearchIds,
                    pageControllerPath,
                    pageCurrentURL_StartAtPageController,
                    searchDataLookupParametersCode
			};

			const url = "d/rws/for-page/psb/insert-shared-page";

			const promise_webserviceCallStandardPost = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					resolve({ ajaxResult : responseData });

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		  } catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		  }
		});
		
		return promise;
	};


    /**
     * Create and return the overlay, but don't show it
     * 
     * @param {*} param0 
     */
    _createModalOverlay( { urlShortcutString } ) {
    	
    	const objectThis = this;

        let props = { };
        props.width = '550';
        props.height = '150'
        props.title = 'URL Shortcut';
        props.$containerDiv = $('body' );
        props.hideOnBackgroundClick = true;

        let $contentDiv = this._createModalOverlayContentDiv( { urlShortcutString } );
        props.$contentDiv = $contentDiv;
        
        props.callbackOnClickedHide = function() {
        	
        	objectThis._cancel_button_Click();
        }

        let overlay = new ModalOverlay( props );

        // const $selector_share_page_button = $contentDiv.find(".selector_share_page_button");
        // if ( $selector_share_page_button.length === 0 ) {
        // 	throw Error("No element with class 'selector_share_page_button'");
        // }
        // $selector_share_page_button.click( function(eventObject) {
		// 	try {
		// 		eventObject.preventDefault();
        //         objectThis._share_page_button_Overlay_Click({ clickThis : this });
        //         return false;
		// 	} catch( e ) {
		// 		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		// 		throw e;
		// 	}
        // });
        
        return overlay;
    }
    
	/**
	 * 
	 */
    _createModalOverlayContentDiv( { urlShortcutString } ) {

        const context = {
            urlShortcutString
        }

    	let contentDivHTML = this._share_page_overlay_contents_Template( context );
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
	
}

