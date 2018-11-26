/**
 * searchDetails_GetDataFromServer_Core.js
 * 
 * Javascript for Getting the Searches Details from the server webservice as HTML - Core HTML for Project Page and Search Details section on data pages
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


//  module import 

let Handlebars = require('handlebars/runtime');

let _search_detail_section_bundle = 
	require("../../../../../handlebars_templates_precompiled/search_detail_section_main_page/search_detail_section_main_page_template-bundle.js" );

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

/**
 * 
 */
export class SearchDetails_GetCoreDataFromServer {

	/**
	 * 
	 */
    constructor() {
		//  Template Bundle _search_detail_section_bundle
		
		if ( ! _search_detail_section_bundle.searchDetails_ExpandSearchContents ) {
			throw Error("Nothing in _search_detail_section_bundle.searchDetails_ExpandSearchContents");
		}
        this._searchDetails_ExpandSearchContents = _search_detail_section_bundle.searchDetails_ExpandSearchContents;
    }

	/**
	 * Getting the Searches Details from the server webservice as HTML - Core HTML for Project Page and Search Details section on data pages
     * 
     * @param projectSearchIds - array of projectSearchIds to get details for
     * @returns Promise - Promise.resolve(...) is passed Map( <project search id>, <HTML> )
	 */
    getSearchDetails_CoreDataFromServer({ projectSearchIds }) {

        const objectThis = this;

        return new Promise((resolve,reject) => {

			const _URL = "d/rws/for-page/psb/get-search-details-core/" + getWebserviceSyncTrackingCode();

			const requestObj = { projectSearchIds : projectSearchIds };

			const requestData = JSON.stringify( requestObj );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						const promiseResponse = objectThis._getHTMLFromAJAXResponse( { responseData, projectSearchIds } );
						
						resolve( { coreSearchDetails : promiseResponse } );
						
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						
						reject();
						
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );

					reject();
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject();

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});

        })
    }

	/**
	 * 
	 */
    _getHTMLFromAJAXResponse( { responseData, projectSearchIds } ) {

        const ajaxResults = responseData.results;

        const returnValue = new Map();

        for ( const ajaxResult of ajaxResults) {

            const html = this._searchDetails_ExpandSearchContents( ajaxResult );

            returnValue.set( ajaxResult.projectSearchId, { data : ajaxResult, html : html } );
        }

        return returnValue;
    }


}