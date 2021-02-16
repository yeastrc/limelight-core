/**
 * setDefaultView_dataPages.ts
 * 
 * Javascript for Data Pages: Set the current view/URL as Default.
 * 
 */

// @ts-ignore
import { Handlebars, _set_default_view_template_bundle } from './setDefaultView_dataPages_ImportHandlebarsTemplates'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';


/**
 * 
 */
export class SetDefaultView_dataPages {

    //  Handlebars templates
    private _set_default_view__on_main_page_root_Template : any;

    //  Set in initialize
    private _projectSearchId : number;
    private _experimentId : number;

	/**
	 * 
	 */
	constructor() {

        if (!_set_default_view_template_bundle.set_default_view__on_main_page_root) {
			throw Error("Nothing in _set_default_view_template_bundle.set_default_view__on_main_page_root");
		}
        this._set_default_view__on_main_page_root_Template = _set_default_view_template_bundle.set_default_view__on_main_page_root;
    }

	/**
	 * 
	 */
	public initialize({ projectSearchId, experimentId, container_DOM_Element } : {
        
        projectSearchId : number,
        experimentId? : number
        container_DOM_Element : any, 
    }) : void {

        //  Get is user Project Owner
        const $page_auth_access_level_project_owner_allowed = $("#page_auth_access_level_project_owner_allowed");
        if ( $page_auth_access_level_project_owner_allowed.length === 0 ) {

            //  Not Project Owner Access Level so Exit
            return; // EARLY RETURN
        }

        this._projectSearchId = projectSearchId;
        this._experimentId = experimentId;

        //  Populate Button for Save As Default View

        let $setDefaultViewButtonContainer = undefined;

        if ( container_DOM_Element ) {
            // Use Reference to DOM element if provided

            $setDefaultViewButtonContainer = $( container_DOM_Element );
        } else {
            $setDefaultViewButtonContainer = $(".selector_set_default_view_root_container");
            if ( $setDefaultViewButtonContainer.length === 0 ) {
                console.log("Unable to initialize class SetDefaultView_dataPages.  No DOM element with class 'selector_set_default_view_root_container'");
                return;
            }
        }

        $setDefaultViewButtonContainer.show();

        const setDefaultViewMainPageHTML = this._set_default_view__on_main_page_root_Template();
        $setDefaultViewButtonContainer.append( setDefaultViewMainPageHTML );

        const $selector_set_default_view_button = $setDefaultViewButtonContainer.find(".selector_set_default_view_button");

        $selector_set_default_view_button.click( (eventObject) => {
			try {
				eventObject.preventDefault();
                this._setDefaultView_MainPage_ButtonClicked();
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
	initializeFrom_SetDefaultView_Component_React(
        { projectSearchId, experimentId } :
        { 
            projectSearchId : number
            experimentId? : number
        }
    ) : void {

        this._projectSearchId = projectSearchId;
        this._experimentId = experimentId;
    }

	/**
	 * 
	 */
	public setDefaultView_MainPage_ButtonClicked_SetDefaultView_Component_React() : void {

        this._setDefaultView_MainPage_ButtonClicked();
    }

	/**
	 * 
	 */
	private _setDefaultView_MainPage_ButtonClicked() : void {

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

        const promise__setDefaultViewToServer = this._setDefaultViewToServer({ pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode })

        promise__setDefaultViewToServer.catch( () => {  });

        promise__setDefaultViewToServer.then( (  ) => {
            try {
                window.alert("Default View Saved")
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

	/**
     * Set the Default the view to the server
	 */
	private _setDefaultViewToServer(
	    {
            pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode
	    }: {
            pageControllerPath: string
            pageCurrentURL_StartAtPageController: string
            searchDataLookupParametersCode: string
        } ) : any {

        const projectSearchId = this._projectSearchId
        const experimentId = this._experimentId

		let promise = new Promise<void>( function( resolve, reject ) {
            try {
                let requestObject = {
                        projectSearchId,
                        pageControllerPath,
                        pageCurrentURL_StartAtPageController,
                        searchDataLookupParametersCode
                };

                const url = "d/rws/for-page/psb/save-default-view-project-search-based-page";

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

