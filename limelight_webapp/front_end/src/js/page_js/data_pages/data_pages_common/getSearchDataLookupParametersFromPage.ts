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

		const $search_data_lookup_parameters_at_page_load_code = $("#search_data_lookup_parameters_at_page_load_code");
		if ( $search_data_lookup_parameters_at_page_load_code.length === 0 ) {
			throw Error("No DOM element with ID 'search_data_lookup_parameters_at_page_load_code'");
		}
		const search_data_lookup_parameters_at_page_load_code = $search_data_lookup_parameters_at_page_load_code.text();
		
		//  Remove from Page DOM
		$search_data_lookup_parameters_at_page_load_code.remove();
		
		
		const $search_data_lookup_parameters_at_page_load_json = $("#search_data_lookup_parameters_at_page_load_json");
		if ( $search_data_lookup_parameters_at_page_load_json.length === 0 ) {
			throw Error("No DOM element with ID 'search_data_lookup_parameters_at_page_load_json'");
		}
		const search_data_lookup_parameters_at_page_load_json = $search_data_lookup_parameters_at_page_load_json.text();
		
		//  Remove from Page DOM
		$search_data_lookup_parameters_at_page_load_json.remove();
		
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
