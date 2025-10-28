/**
 * page_Update_From_search_data_lookup_parameters_lookup_code__computed.ts
 *
 * Javascript for Processing search_data_lookup_parameters_lookup_code__computed, if populated in DOM
 *
 * search_data_lookup_parameters_lookup_code__computed is populated if URL has Project Search Id Codes instead of search_data_lookup_parameters_lookup_code
 *
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import {
	limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function
} from "page_js/common_all_pages/limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function";

/**
 *
 */
export const page_Update_From_search_data_lookup_parameters_lookup_code__computed = function () {

	const search_data_lookup_parameters_lookup_code__computedDOM = document.getElementById("search_data_lookup_parameters_lookup_code__computed");
	if ( ! search_data_lookup_parameters_lookup_code__computedDOM ) {
		// Not on Page so exit
		return; // EARLY EXIT
	}

	let search_data_lookup_parameters_lookup_code__computed : string = null;

	{
		const innerText = search_data_lookup_parameters_lookup_code__computedDOM.innerText

		const domparser = new DOMParser()

		try {
			const doc = domparser.parseFromString(innerText, "text/html")

			const body = doc.body;

			search_data_lookup_parameters_lookup_code__computed = body.innerText;

		} catch (e) {
			// Not parsable Value so exit
			return; // EARLY EXIT
		}
	}

	if ( search_data_lookup_parameters_lookup_code__computed === undefined || search_data_lookup_parameters_lookup_code__computed === null || search_data_lookup_parameters_lookup_code__computed === "" ) {
		// No Value so exit
		return; // EARLY EXIT
	}

	try {
		search_data_lookup_parameters_lookup_code__computedDOM.remove();
	} catch (e) {
		// swallow any exception
	}

	//  Is current URL already the default?

	let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

	const newURL = pageControllerPath + search_data_lookup_parameters_lookup_code__computed + "/r";

	limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function({ newURL })
}
