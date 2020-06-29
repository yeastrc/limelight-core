/**
 * page_UserDefault_processing.ts
 * 
 * Javascript for Processing Default URL specified by User, if populated in DOM 
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';

/**
 * 
 */
export class Page_UserDefault_processing {

	private _parseURL_Into_PageStateParts : ParseURL_Into_PageStateParts

	/**
	 * 
	 */
	constructor() {
		
        this._parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();
	}

	/**
	 * @return
	 */
	page_UserDefault_processing() {
        
        const $page_user_default_url = $("#page_user_default_url");
        if ( $page_user_default_url.length === 0 ) {
            // Not on Page so exit
            return; // EARLY EXIT
        }
        const page_user_default_url = $page_user_default_url.text();
        if ( page_user_default_url === undefined || page_user_default_url === null || page_user_default_url === "" ) {
            // No Value so exit
            return; // EARLY EXIT
        }

        //  Is current URL a referrer from another page?

		const pageStatePartsFromURL = this._parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();
		const searchDataLookupParametersCode = pageStatePartsFromURL.searchDataLookupParametersCode;
		const pageStateIdentifier = pageStatePartsFromURL.pageStateIdentifier;
		const pageStateString = pageStatePartsFromURL.pageStateString;
		const referrer = pageStatePartsFromURL.referrer;

		if ( referrer !== _REFERRER_PATH_STRING ) {
            // No Referrer so exit
            return; // EARLY EXIT
        }

        //  Is current URL already the default?

		let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
				
		//  Get URL pageControllerPath and following
		
		let windowPath = window.location.pathname;
		
		// if ( windowPath.endsWith( "/" ) ) {
		// 	//  Remove trailing "/"
		// 	windowPath = windowPath.substring( 0, windowPath.length - 1 );
		// }
            
		let pageControllerPath_Index = windowPath.indexOf( pageControllerPath );
		if ( pageControllerPath_Index === -1 ) {
			throw Error( "Page controller path not found in window path.  windowPath: " + windowPath );
		}
		let windowPath_StartAt_PageControllerPath = windowPath.substring( pageControllerPath_Index );

        if ( windowPath_StartAt_PageControllerPath === page_user_default_url ) {
            //  Already Default URL
            return;  // EARLY EXIT
        }

        //  Test for is default with "/r"

        const page_user_default_url_WithTrailingReferrer = page_user_default_url + _PATH_SEPARATOR + _REFERRER_PATH_STRING;

        if ( windowPath_StartAt_PageControllerPath === page_user_default_url_WithTrailingReferrer ) {
            //  Already Default URL with referrer
            return;  // EARLY EXIT
        }

        //  Not at default. change to default

        document.location.href = page_user_default_url
    }

}
