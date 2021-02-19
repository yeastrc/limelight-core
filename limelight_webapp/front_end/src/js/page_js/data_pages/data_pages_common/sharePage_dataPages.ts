/**
 * sharePage_dataPages.ts
 * 
 * Javascript for Data Pages: "Share Page" the current view/URL.  Provides a Shortened URL to the user.
 * 
 * For projects with public access allowed, this button is provided to public (not logged in users) as well.
 * 
 */

import Handlebars = require('handlebars/runtime');

import _share_page_template_bundle = require("../../../../../handlebars_templates_precompiled/share_page/share_page_template-bundle.js");

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import {sharePage_MainPage_ProcessRequest_Common} from "page_js/data_pages/data_pages_common/sharePage_dataPages_Common";



/**
 * 
 */
export class SharePage_dataPages {

    //  Handlebars Templates
    private _share_page__on_main_page_root_Template : any;

    //  Set in initialize
    private _projectSearchIds : Array<number>;
    private _experimentId : number;

	/**
	 * 
	 */
	constructor() {

        if (!_share_page_template_bundle.share_page__on_main_page_root) {
			throw Error("Nothing in _share_page_template_bundle.share_page__on_main_page_root");
		}
        this._share_page__on_main_page_root_Template = _share_page_template_bundle.share_page__on_main_page_root;
    }

	/**
     * @param projectSearchIds
     * @param experimentId - optional
	 * @param container_DOM_Element - optional
	 */
	initialize(
        { projectSearchIds, experimentId, container_DOM_Element = undefined } : 
        { 
            projectSearchIds : Array<number> 
            experimentId? : number
            container_DOM_Element : any }
    ) : void {

        this._projectSearchIds = projectSearchIds;
        this._experimentId = experimentId;

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

				sharePage_MainPage_ProcessRequest_Common({ projectSearchIds, experimentId });

				return false;

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
    }
}

