/**
 * getExerimentMainDataFromPage.ts
 * 
 * Javascript for getting the Experiment Data from the DOM (Passed as JSON from the server)
 * 
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { Experiment_ConditionGroupsContainer, create_Experiment_ConditionGroupsContainer_AndChildren_From_ServerSideParsedJSON } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/conditionGroupsDataContainer_Class';

const _ROOT_VERSION_NUMBER_SUPPORTED = 1;


/**
 * 
 */
export class GetExerimentMainDataFromPage {

	/**
	 * 
	 */
	constructor() {
		
		// this._projectSearchIds_RetrievingDataFor = {};
	}
	
	/**
	 * @return ExerimentMainData from Page DOM
	 */
	getExerimentMainDataFromPage({ searchDataLookupParamsRoot }) {

		// console.log("getExerimentMainDataFromPage()")
		
		//   Process Strings from Server from DOM <div style="display: none "> text elements

		//     ( Stored in <div> instead of <script> so can encode as HTML and auto decode using .text() )

		let experimentId : number = undefined;
		let experiment_id_string : string = undefined;
		{
			const $experiment_id_string = $("#experiment_id_string");
			if ( $experiment_id_string.length === 0 ) {
				throw Error("No DOM element with ID 'experiment_id_string'");
			}
			experiment_id_string = $experiment_id_string.text();
			
			//  Remove from Page DOM
			$experiment_id_string.remove();

			{
				experimentId = Number.parseInt( experiment_id_string );
				if ( Number.isNaN( experimentId ) ) {
					const msg = "getSearchDataLookupParametersFromPage: Failed to parse as int: experiment_id_string: " + experiment_id_string;
					console.warn( msg );
					throw Error(  msg );
				}
			}
		}

		let experiment_name : string = undefined;
		{
			const $experiment_name_from_server = $("#experiment_name_from_server");
			if ( $experiment_name_from_server.length === 0 ) {
				throw Error("No DOM element with ID 'experiment_name_from_server'");
			}
			experiment_name = $experiment_name_from_server.text();

			//  Remove from Page DOM
			$experiment_name_from_server.remove();
		}

		let experiment_ConditionGroupsContainer : Experiment_ConditionGroupsContainer = undefined;
		let conditionGroupsDataContainer : ConditionGroupsDataContainer = undefined;

		{
			const $experiment_main_data_at_page_load_json = $("#experiment_main_data_at_page_load_json");
			if ( $experiment_main_data_at_page_load_json.length === 0 ) {
				throw Error("No DOM element with ID 'experiment_main_data_at_page_load_json'");
			}
			const experiment_main_data_at_page_load_json = $experiment_main_data_at_page_load_json.text();
			
			//  Remove from Page DOM
			$experiment_main_data_at_page_load_json.remove();

			let experiment_main_data_at_page_load : any = undefined;

			try {
				experiment_main_data_at_page_load = JSON.parse( experiment_main_data_at_page_load_json );
			} catch( e ) {
				const msg = "getSearchDataLookupParametersFromPage: Failed to parse: experiment_main_data_at_page_load_json: " + experiment_main_data_at_page_load_json;
				console.warn( msg );
				console.warn( e );
				throw Error(  msg );
			}

			if ( experiment_main_data_at_page_load.version !== _ROOT_VERSION_NUMBER_SUPPORTED ) {
				const msg = "getSearchDataLookupParametersFromPage: experiment_main_data_at_page_load.version !== _ROOT_VERSION_NUMBER_SUPPORTED: experiment_main_data_at_page_load_json: " + experiment_main_data_at_page_load_json;
				console.warn( msg );
				throw Error(  msg );
			}

			if ( ! experiment_main_data_at_page_load.conditionGroupsContainer ) {
				const msg = "getSearchDataLookupParametersFromPage: experiment_main_data_at_page_load.conditionGroupsContainer Not Populated: experiment_main_data_at_page_load_json: " + experiment_main_data_at_page_load_json;
				console.warn( msg );
				throw Error(  msg );
			}

			try {
				experiment_ConditionGroupsContainer = create_Experiment_ConditionGroupsContainer_AndChildren_From_ServerSideParsedJSON( experiment_main_data_at_page_load.conditionGroupsContainer );
			} catch( e ) {
				const msg = "getSearchDataLookupParametersFromPage: Failed to process experiment_main_data_at_page_load.conditionGroupsContainer: experiment_main_data_at_page_load_json: " + experiment_main_data_at_page_load_json;
				console.warn( msg );
				console.warn( e );
				throw Error(  msg );
			}
			conditionGroupsDataContainer = new ConditionGroupsDataContainer({ 
				experimentConditionData_Serialized : experiment_main_data_at_page_load.experimentConditionData, 
				searchDataLookupParamsRoot : searchDataLookupParamsRoot 
			});
		}

		


		let experiment_project_search_ids_at_page_load_Local = undefined;
		{
			const $experiment_project_search_ids_at_page_load_json = $("#experiment_project_search_ids_at_page_load_json");
			if ( $experiment_project_search_ids_at_page_load_json.length === 0 ) {
				throw Error("No DOM element with ID 'experiment_project_search_ids_at_page_load_json'");
			}
			const experiment_project_search_ids_at_page_load_json = $experiment_project_search_ids_at_page_load_json.text();
			
			//  Remove from Page DOM
			$experiment_project_search_ids_at_page_load_json.remove();
			
			try {
				experiment_project_search_ids_at_page_load_Local = JSON.parse( experiment_project_search_ids_at_page_load_json );
			} catch( e ) {
				const msg = "getSearchDataLookupParametersFromPage: Failed to parse: experiment_project_search_ids_at_page_load_json: " + experiment_project_search_ids_at_page_load_json;
				console.warn( msg );
				console.warn( e )
				throw Error( msg );
			}
		}

		let experiment_project_search_ids_at_page_load_Result : Array<number> = [];

		for ( const project_search_id of experiment_project_search_ids_at_page_load_Local ) {

			if ( ! Number.isSafeInteger( project_search_id ) ) {
				const msg = "project_search_id is not a safe integer: " + project_search_id;
				console.warn( msg );
				throw Error( msg );
			}

			experiment_project_search_ids_at_page_load_Result.push( project_search_id );
		}
				
		return {
			experimentId,
			experiment_id_string,
			experiment_name,
			experiment_ConditionGroupsContainer,
			conditionGroupsDataContainer,
			experiment_project_search_ids_at_page_load: experiment_project_search_ids_at_page_load_Result
		};
	}
	
}


			//  contents of variable experiment_main_data_at_page_load_json is the serialized JSON representation of Java classes (Server side code):

			//    Experiment_A_Root and it's children

		   	// Experiment_A_Root


			// Experiment_ConditionGroupsContainer:

			//	Experiment_ConditionGroup:

			//   Experiment_Condition:


			//	Experiment_OverallConditionDataRoot:

			//				The contents of experimentConditionData is a parameter to the constructor of JS class ConditionGroupsDataContainer.
			//					As Such, no Typescript typings are needed for Experiment_OverallConditionDataRoot since it is not widely used in the JS/TS code.


			//	Experiment_OverallConditionDataRoot experimentConditionData:
			// 		List<Experiment_ConditionGroupDataNode> mainResultDataArray;

			//  Experiment_ConditionGroupDataNode:  // From JS Class ConditionGroupsDataContainer

			//  Experiment_ConditionDataNode:  // From JS Class ConditionGroupsDataContainer
							/**
							 * Single Condition
							 * 
							 * Contains either:
							 *   Data for this condition
							 *   Nested Condition Groups
							 *
							 */

			//  Experiment_ConditionDataOuterData: // Single Condition outer 'data' property // From JS Class ConditionGroupsDataContainer
					// Experiment_ConditionDataInnerData data;

			//  Should create Typescript typings for Experiment_ConditionDataInnerData since that is not managed as part of ConditionGroupsDataContainer

			// Experiment_ConditionDataInnerData
					
					// List<Integer> projectSearchIds;

