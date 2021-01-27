/**
 * getSearchDataLookupParametersFromPage.ts
 * 
 * Javascript for getting the project search ids and their filters and annotation type display from page
 * 
 * This will change when groups are added.
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { SearchDataLookupParameters_Root, copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';

/**
 * 
 */
export class GetSearchDataLookupParametersFromPage_Result {

	public search_data_lookup_parameters_at_page_load_code : string;
	public search_data_lookup_parameters_at_page_load : SearchDataLookupParameters_Root;
	public projectSearchIds : Array<number>;
}

/**
 * 
 */
export class GetSearchDataLookupParametersFromPage {

	/**
	 * 
	 */
	constructor() {
		
	}
	
	/**
	 * @return SearchDataLookupParameters from Page DOM
	 */
	public getSearchDataLookupParametersFromPage() : GetSearchDataLookupParametersFromPage_Result {
		
		//   Process Search Data Lookup Parameters JSON and Code from DOM <script> text element 

		const search_data_lookup_parameters_at_page_load_code = _getDOMElementContents_UnEncode_HTML_To_Text( "search_data_lookup_parameters_at_page_load_code" );
		if ( search_data_lookup_parameters_at_page_load_code === undefined || search_data_lookup_parameters_at_page_load_code === null ) {
			throw Error("No DOM element with ID 'search_data_lookup_parameters_at_page_load_code' or contents failed to parse as HTML");
		}

		const search_data_lookup_parameters_at_page_load_json = _getDOMElementContents_UnEncode_HTML_To_Text( "search_data_lookup_parameters_at_page_load_json" );
		if ( ! search_data_lookup_parameters_at_page_load_json === undefined || search_data_lookup_parameters_at_page_load_json === null ) {
			throw Error("No DOM element with ID 'search_data_lookup_parameters_at_page_load_json' or contents failed to parse as HTML");
		}
		
		let search_data_lookup_parameters_at_page_load_Parsed = undefined;
		try {
			search_data_lookup_parameters_at_page_load_Parsed = JSON.parse( search_data_lookup_parameters_at_page_load_json );
		} catch( e ) {
			throw Error("getSearchDataLookupParametersFromPage: Failed to parse: " + search_data_lookup_parameters_at_page_load_json );
		}

		//  Validate that search_data_lookup_parameters_at_page_load matches class SearchDataLookupParameters_Root and child classes

		
		const search_data_lookup_parameters_at_page_load : SearchDataLookupParameters_Root = (
			copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root( search_data_lookup_parameters_at_page_load_Parsed )
		);
		

		// Get Project Search Ids
		const projectSearchIds : Array<number> = [];
		const paramsForProjectSearchIds = search_data_lookup_parameters_at_page_load.paramsForProjectSearchIds;
		if ( paramsForProjectSearchIds ) {
			const paramsForProjectSearchIdsList = paramsForProjectSearchIds.paramsForProjectSearchIdsList;
			if ( paramsForProjectSearchIdsList ) {
				for ( const paramsForProjectSearchId of paramsForProjectSearchIdsList ) {
					const projectSearchId = paramsForProjectSearchId.projectSearchId;
					projectSearchIds.push( projectSearchId );
				}
			}
		}

		const getSearchDataLookupParametersFromPage_Result : GetSearchDataLookupParametersFromPage_Result = new GetSearchDataLookupParametersFromPage_Result();

		getSearchDataLookupParametersFromPage_Result.search_data_lookup_parameters_at_page_load_code = search_data_lookup_parameters_at_page_load_code;
		getSearchDataLookupParametersFromPage_Result.search_data_lookup_parameters_at_page_load = search_data_lookup_parameters_at_page_load;
		getSearchDataLookupParametersFromPage_Result.projectSearchIds = projectSearchIds;
				
		return getSearchDataLookupParametersFromPage_Result;
	}
	
}

/**
 *
 * @param domElementIdString
 */
const _getDOMElementContents_UnEncode_HTML_To_Text = function ( domElementIdString : string ) : string {

	const domElementRef = document.getElementById(domElementIdString);
	if ( ! domElementRef ) {
		// Not on Page so exit
		return null; // EARLY EXIT
	}

	let domElementContents_Inside_HTML_BODY_Tags : string = null;

	{
		const innerText = domElementRef.innerText

		const domparser = new DOMParser()

		try {
			const doc = domparser.parseFromString(innerText, "text/html")

			const body = doc.body;

			domElementContents_Inside_HTML_BODY_Tags = body.innerText;

		} catch (e) {
			// Not parsable Value so exit
			return null; // EARLY EXIT
		}
	}
	try {
		domElementRef.remove();
	} catch (e) {
		// swallow any exception
	}

	return domElementContents_Inside_HTML_BODY_Tags;
}