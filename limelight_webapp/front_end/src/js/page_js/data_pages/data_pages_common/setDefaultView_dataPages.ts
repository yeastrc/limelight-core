/**
 * setDefaultView_dataPages.ts
 * 
 * Javascript for Data Pages: Set the current view/URL as Default.
 * 
 */

import Handlebars = require('handlebars/runtime');

import _set_default_view_template_bundle = require("../../../../../handlebars_templates_precompiled/set_default_view/set_default_view_template-bundle.js");

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';
import {setDefaultView_dataPages_ProcessRequest_Common} from "page_js/data_pages/data_pages_common/setDefaultView_dataPages_Common";


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

                setDefaultView_dataPages_ProcessRequest_Common({ projectSearchId })
                return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
    }
}

