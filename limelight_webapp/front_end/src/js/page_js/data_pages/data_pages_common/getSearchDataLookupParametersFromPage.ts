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

/**
 * 
 */
export class GetSearchDataLookupParametersFromPage_Result {

	public search_data_lookup_parameters_at_page_load_code : string;
	public search_data_lookup_parameters_at_page_load : any;
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

		let $search_data_lookup_parameters_at_page_load_code = $("#search_data_lookup_parameters_at_page_load_code");
		if ( $search_data_lookup_parameters_at_page_load_code.length === 0 ) {
			throw Error("No DOM element with ID 'search_data_lookup_parameters_at_page_load_code'");
		}
		let search_data_lookup_parameters_at_page_load_code = $search_data_lookup_parameters_at_page_load_code.text();
		
		//  Remove from Page DOM
		$search_data_lookup_parameters_at_page_load_code.remove();
		
		
		let $search_data_lookup_parameters_at_page_load_json = $("#search_data_lookup_parameters_at_page_load_json");
		if ( $search_data_lookup_parameters_at_page_load_json.length === 0 ) {
			throw Error("No DOM element with ID 'search_data_lookup_parameters_at_page_load_json'");
		}
		let search_data_lookup_parameters_at_page_load_json = $search_data_lookup_parameters_at_page_load_json.text();
		
		//  Remove from Page DOM
		$search_data_lookup_parameters_at_page_load_json.remove();
		
		let search_data_lookup_parameters_at_page_load = undefined;
		try {
			search_data_lookup_parameters_at_page_load = JSON.parse( search_data_lookup_parameters_at_page_load_json );
		} catch( e ) {
			throw Error("getSearchDataLookupParametersFromPage: Failed to parse: " + search_data_lookup_parameters_at_page_load_json );
		}

		// Get Project Search Ids
		let projectSearchIds = [];
		let paramsForProjectSearchIds = search_data_lookup_parameters_at_page_load.paramsForProjectSearchIds;
		if ( paramsForProjectSearchIds ) {
			let paramsForProjectSearchIdsList = paramsForProjectSearchIds.paramsForProjectSearchIdsList;
			if ( paramsForProjectSearchIdsList ) {
				paramsForProjectSearchIdsList.forEach(function( paramsForProjectSearchId, index, array) {
					let projectSearchId = paramsForProjectSearchId.projectSearchId;
					projectSearchIds.push( projectSearchId );
				}, this );
			}
		}

		const getSearchDataLookupParametersFromPage_Result : GetSearchDataLookupParametersFromPage_Result = new GetSearchDataLookupParametersFromPage_Result();

		getSearchDataLookupParametersFromPage_Result.search_data_lookup_parameters_at_page_load_code = search_data_lookup_parameters_at_page_load_code;
		getSearchDataLookupParametersFromPage_Result.search_data_lookup_parameters_at_page_load = search_data_lookup_parameters_at_page_load;
		getSearchDataLookupParametersFromPage_Result.projectSearchIds = projectSearchIds;
				
		return getSearchDataLookupParametersFromPage_Result;
	}
	
}
