/**
 * saveView_dataPages.ts
 * 
 * Javascript for Data Pages: Save the current view/URL.
 * 
 */


import Handlebars = require('handlebars/runtime');

import _save_view_template_bundle = require("../../../../../handlebars_templates_precompiled/save_view/save_view_template-bundle.js");

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import {saveView_dataPages_MainPage_ProcessRequest_Common} from "page_js/data_pages/data_pages_common/saveView_dataPages_Common";


/**
 * 
 */
export class SaveView_dataPages {

    //  Handlebars templates
    private _save_view__on_main_page_root_Template : any;

    //  Set in initialize
    private _projectSearchIds : Array<number>;
    private _experimentId : number;

	/**
	 *
	 */
	constructor() {

        if (!_save_view_template_bundle.save_view__on_main_page_root) {
			throw Error("Nothing in _save_view_template_bundle.save_view__on_main_page_root");
		}
        this._save_view__on_main_page_root_Template = _save_view_template_bundle.save_view__on_main_page_root;
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
	 * 
	 */
	private _saveView_MainPage_ButtonClicked() : void {

        saveView_dataPages_MainPage_ProcessRequest_Common({ projectSearchIds : this._projectSearchIds, experimentId: this._experimentId })
    }
}

