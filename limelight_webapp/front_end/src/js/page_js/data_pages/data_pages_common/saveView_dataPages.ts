/**
 * saveView_dataPages.ts
 * 
 * Javascript for Data Pages: Save the current view/URL.
 * 
 */

// @ts-ignore
import { Handlebars, _save_view_template_bundle } from './saveView_dataPages_ImportHandlebarsTemplates'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';

// @ts-ignore
import { ModalOverlay } from 'page_js/data_pages/display_utilities/modalOverlay';



/**
 * 
 */
export class SaveView_dataPages {

    //  Handlebars templates
    private _save_view__on_main_page_root_Template : any;
    private _save_view_overlay_contents_Template : any;

    //  Set in initialize
    private _projectSearchIds : Array<number>;
    private _experimentId : number;

    //  set later

    private _modalOverlay : ModalOverlay;

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
	public initialize({ projectSearchIds, experimentId, container_DOM_Element } : {

        projectSearchIds : Array<number>,
        experimentId? : number
        container_DOM_Element : any,
    }) : void {

        this._projectSearchIds = projectSearchIds;
        this._experimentId = experimentId;

        //  Populate Button for Save View

        let $saveViewButtonContainer = undefined;

        if ( container_DOM_Element ) {
            // Use Reference to DOM element if provided

            $saveViewButtonContainer = $( container_DOM_Element );
        } else {
            $saveViewButtonContainer = $(".selector_save_view_root_container");
            if ( $saveViewButtonContainer.length === 0 ) {
                console.log("Unable to initialize class SaveView_dataPages.  No DOM element with class 'selector_save_view_root_container'");
                return;
            }
        }

        const saveViewMainPageHTML = this._save_view__on_main_page_root_Template();
        $saveViewButtonContainer.append( saveViewMainPageHTML );

        const $selector_save_view_button = $saveViewButtonContainer.find(".selector_save_view_button");

        $selector_save_view_button.click( (eventObject) => {
			try {
				eventObject.preventDefault();
                this._saveView_MainPage_ButtonClicked();
                return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
    }

	/**
     * @param projectSearchIds
	 * @param container_DOM_Element - optional
	 */
	initializeFrom_SaveView_Component_React(
        { projectSearchIds, experimentId } :
        {
            projectSearchIds : Array<number>
            experimentId? : number
        }
    ) : void {

        this._projectSearchIds = projectSearchIds;
        this._experimentId = experimentId;
    }

	/**
	 *
	 */
	public saveView_MainPage_ButtonClicked_SaveView_Component_React() : void {

        this._saveView_MainPage_ButtonClicked();
    }

	/**
	 * 
	 */
	private _saveView_MainPage_ButtonClicked() : void {

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
    private _createModalOverlay( {  } ) : ModalOverlay {
    	
    	const objectThis = this;

        const $contentDiv = this._createModalOverlayContentDiv( {  } );
        
        const callbackOnClickedHide = function() {
        	
        	objectThis._cancel_button_Click();
        }

        const props = { 
            width : '800',
            height : '500',
            title : 'Save View',
            $containerDiv : $('body' ),
            $contentDiv,
            callbackOnClickedHide,
            hideOnBackgroundClick : true
        }


        let overlay = new ModalOverlay( props );

        const $selector_save_view_button = $contentDiv.find(".selector_save_view_button");
        if ( $selector_save_view_button.length === 0 ) {
        	throw Error("No element with class 'selector_save_view_button'");
        }
        $selector_save_view_button.click( function(eventObject: any) {
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
    private _createModalOverlayContentDiv( {  } ) : any {

    	let contentDivHTML = this._save_view_overlay_contents_Template( { } );
    	let $contentDiv = $( contentDivHTML );
    	return $contentDiv;
    }
    
	/**
	 * 
	 */
	private _hide_remove_ModalOverlay() : void {
	
		this._modalOverlay.hide();
		
		this._modalOverlay.remove();
		
		this._modalOverlay = undefined;
	}
	
	/**
	 * 
	 */
	private _cancel_button_Click() : void {
		
		this._hide_remove_ModalOverlay();
	}
	
	/**
	 * 
	 */
    private _save_view_button_Overlay_Click({ clickThis }: { clickThis: any }) : void {

        //  view label

        const $clickThis = $( clickThis );
        const $selector_save_view_overlay_root_container = $clickThis.closest(".selector_save_view_overlay_root_container");
        if ( $selector_save_view_overlay_root_container.length === 0 ) {
            throw Error("No DOM element with class 'selector_save_view_overlay_root_container'");
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

        const promise__saveViewToServer = this._saveViewToServer({ viewLabel, pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode, projectSearchIds : this._projectSearchIds, experimentId : this._experimentId })

        promise__saveViewToServer.catch( () => {  });

        promise__saveViewToServer.then( (  ) => {
            try {
                this._hide_remove_ModalOverlay();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

	/**
     * Save the view to the server
	 */
	private _saveViewToServer(
	    {
            viewLabel, pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode, projectSearchIds, experimentId
	    }: {
            viewLabel: any, pageControllerPath: any, pageCurrentURL_StartAtPageController: any, searchDataLookupParametersCode: any, projectSearchIds: any, experimentId: any
        } ) : any {

		let promise = new Promise<void>( function( resolve, reject ) {
            try {
                let requestObject = {
                        projectSearchIds,
                        experimentId,
                        label : viewLabel,
                        pageControllerPath,
                        pageCurrentURL_StartAtPageController,
                        searchDataLookupParametersCode
                };

                const url = "d/rws/for-page/psb/insert-saved-view";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                    try {
                        resolve();

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
	}

}

