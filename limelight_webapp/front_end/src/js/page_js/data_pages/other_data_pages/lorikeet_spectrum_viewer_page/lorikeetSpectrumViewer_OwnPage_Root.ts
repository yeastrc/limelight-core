/**
 * lorikeetSpectrumViewer_OwnPage_Root.ts
 * 
 * Javascript for  page lorikeetSpectrumViewerView.jsp 
 * 
 * Lorikeet Spectrum Viewer on it's own page
 *
 *
 *   !!!   Optional URL Query String Parameter 'openmod-position' - the position as a number OR 'n' OR 'c'.  values are in LorikeetSpectrumViewer_Constants
 *   			- Short term fix to get open mod added to variable mods at passed in position.  Assumes PSM only has ONE Open Mod Mass
 *
 *
 */


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { LorikeetSpectrumViewer_LoadDataFromServer } from './lorikeetSpectrumViewer_LoadDataFromServer';

import { lorikeetSpectrumViewer_createPsmPeptideTable_HeadersAndData } from "./lorikeetSpectrumViewer_createDataFor_PsmPeptideTable";
import { LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded } from './lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded';
import {DataTable_RootTableDataObject} from "../../data_table_react/dataTable_React_DataObjects";
import {LorikeetSpectrumViewer_Constants} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_Constants";
import {LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data";


/**
 * 
 */
class LorikeetSpectrumViewer_OwnPage_Root {

	/**
	 * 
	 */
	constructor() {

		// console.log( "LorikeetSpectrumViewer_OwnPage_Root: contructor called")

	}

	/**
	 * 
	 */
	initialize() {

		// console.log( "LorikeetSpectrumViewer_OwnPage_Root: initialize called");

		const initial_url_project_search_idDOMElement = document.getElementById("initial_url_project_search_id");
		if ( ! initial_url_project_search_idDOMElement ) {
				throw Error("No DOM element with id 'initial_url_project_search_id'");
		}
		const projectSearchIdString = initial_url_project_search_idDOMElement.innerText;

		const initial_url_psm_idDOMElement = document.getElementById("initial_url_psm_id");
		if ( ! initial_url_psm_idDOMElement ) {
				throw Error("No DOM element with id 'initial_url_psm_id'");
		}
		const psmIdString = initial_url_psm_idDOMElement.innerText;

		console.log("Value in  DOM element with id 'initial_url_psm_id': " + psmIdString );

		const projectSearchId = Number.parseInt( projectSearchIdString );
		if ( Number.isNaN( projectSearchId ) ) {
			throw Error("DOM element with id 'initial_url_project_search_id' does not contain a number.  contains: " + projectSearchIdString );
		}

		const psmId = Number.parseInt( psmIdString );
		if ( Number.isNaN( psmId ) ) {
			throw Error("DOM element with id 'initial_url_psm_id' does not contain a number.  contains: " + psmIdString );
		}

		console.log( "window.location.search: ", window.location.search );

		const urlSearchParams = new URLSearchParams( window.location.search )

		//  openmodPosition - the position as a number OR 'n' OR 'c'.  see LorikeetSpectrumViewer_Constants
		let openmodPosition_QueryParam_Value : string = urlSearchParams.get( "openmod-position" ); //  null if not found

		if ( openmodPosition_QueryParam_Value === undefined || openmodPosition_QueryParam_Value === null ) {

			//  Set to LorikeetSpectrumViewer_Constants.OPENMOD_POSITION__NO_POSITION_SELECTED for consistency

			openmodPosition_QueryParam_Value = LorikeetSpectrumViewer_Constants.OPENMOD_POSITION__NO_POSITION_SELECTED
		}

		console.log( "openmodPosition_QueryParam_Value: ", openmodPosition_QueryParam_Value );


		let openmodPosition : number | string = LorikeetSpectrumViewer_Constants.OPENMOD_POSITION__NO_POSITION_SELECTED;


		if ( openmodPosition_QueryParam_Value !== LorikeetSpectrumViewer_Constants.OPENMOD_POSITION__NO_POSITION_SELECTED ) {

			//  openmodPosition has a value so process it

			if ( openmodPosition_QueryParam_Value !== LorikeetSpectrumViewer_Constants.OPENMOD_POSITION_QUERY_STRING_VALUE__N && openmodPosition_QueryParam_Value !== LorikeetSpectrumViewer_Constants.OPENMOD_POSITION_QUERY_STRING_VALUE__C ) {

				//  Not 'n' or 'c' so must be a number

				const openmodPositionNumber = Number.parseInt( openmodPosition_QueryParam_Value );

				if ( Number.isNaN( openmodPositionNumber ) ) {

					window.alert("query string param 'openmod-position' is not a valid value.")

					const msg = "query string param 'openmod-position' is a value and is not 'n' or 'c' and is not a number. 'openmod-position' value: " + openmodPosition_QueryParam_Value;
					console.warn(msg);
					throw Error(msg);
				}

				console.log( "openmodPosition parsed as number: ", openmodPositionNumber );

				openmodPosition = openmodPositionNumber;
			} else {

				//  Is 'n' or 'c' so assign it

				openmodPosition = openmodPosition_QueryParam_Value;
			}
		}

		if ( ! window.opener ) {
			this._populateProjectAndSearchInfo({ projectSearchId });
		}

		const dataPageStateManager_DataFrom_Server = new DataPageStateManager();

		const lorikeetSpectrumViewer_LoadDataFromServer = new LorikeetSpectrumViewer_LoadDataFromServer();
		const promise_lorikeetSpectrumViewer_LoadDataFromServer = 
			lorikeetSpectrumViewer_LoadDataFromServer.lorikeetSpectrumViewer_LoadDataFromServer({ 
				projectSearchId, psmId, dataPageStateManager_DataFrom_Server });

		promise_lorikeetSpectrumViewer_LoadDataFromServer.catch( () => { });

		promise_lorikeetSpectrumViewer_LoadDataFromServer.then( (loadedDataFromServer) => {
			try {

				//  If only PSM Id on URL and have open mod position(s), update this._openModPosition_Displayed with first mod position

				if ( openmodPosition === LorikeetSpectrumViewer_Constants.OPENMOD_POSITION__NO_POSITION_SELECTED ) {

					let psmPeptideData_Entry_For_PsmId : LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry = undefined;

					for ( const psmPeptideData_List_Entry of loadedDataFromServer.psmPeptideData.resultList ) {
						if ( psmPeptideData_List_Entry.psmId === psmId ) {
							psmPeptideData_Entry_For_PsmId = psmPeptideData_List_Entry
						}
					}
					if ( ! psmPeptideData_Entry_For_PsmId ) {
						throw Error("No data for psmId: " + psmId );
					}

					if ( psmPeptideData_Entry_For_PsmId.openModificationMassAndPositionsList && psmPeptideData_Entry_For_PsmId.openModificationMassAndPositionsList.length > 0 ) {

						const openModificationMassAndPosition = psmPeptideData_Entry_For_PsmId.openModificationMassAndPositionsList[0]

						if ( openModificationMassAndPosition.positionEntries_Optional && openModificationMassAndPosition.positionEntries_Optional.length > 0 ) {

							const positionEntry = openModificationMassAndPosition.positionEntries_Optional[0];

							if ( positionEntry.is_N_Terminal ) {
								openmodPosition = LorikeetSpectrumViewer_Constants.OPENMOD_POSITION_QUERY_STRING_VALUE__N;
							} else if ( positionEntry.is_C_Terminal ) {
								openmodPosition = LorikeetSpectrumViewer_Constants.OPENMOD_POSITION_QUERY_STRING_VALUE__C;
							} else {
								openmodPosition = positionEntry.position;
							}
						}
					}
				}

				const lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded = new LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded({ projectSearchId, psmId, openmodPosition, dataPageStateManager_DataFrom_Server });

				const dataTable_RootTableDataObject =
					lorikeetSpectrumViewer_createPsmPeptideTable_HeadersAndData( {
						psmId_Selection : psmId, openModPosition_Selection: openmodPosition, projectSearchId, loadedDataFromServer, dataPageStateManager_DataFrom_Server, lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
					} );

				lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded.initialize();
				lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded.addLorikeetToPage({ loadedDataFromServer, dataTable_RootTableDataObject });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}


	/**
	 * 
	 */
	_populateProjectAndSearchInfo({ projectSearchId }:{ projectSearchId: any }) {
	
		const lorikeetSpectrumViewer_LoadDataFromServer = new LorikeetSpectrumViewer_LoadDataFromServer();

		{
			const promise_retrieveSearchNameFromServer = lorikeetSpectrumViewer_LoadDataFromServer.retrieveSearchNameFromServer({ projectSearchId });

			promise_retrieveSearchNameFromServer.catch( () => { });

			promise_retrieveSearchNameFromServer.then( ({ responseData }) => {
				try {
					const searchList = responseData.searchList;
					if ( searchList.length === 0 ) {
						throw Error("retrieveSearchNameFromServer returned empty list for projectSearchId: " + projectSearchId );
					}
					const searchData = searchList[ 0 ];
					if ( searchData.projectSearchId !== projectSearchId ) {
						throw Error("retrieveSearchNameFromServer returned search data with different projectSearchId. Request projectSearchId: " + projectSearchId + ", result projectSearchId: " + searchData.projectSearchId );
					}
					const searchName = searchData.name;
					const searchId = searchData.searchId;

					const $search_name_span = $("#search_name_span");
					if ( $search_name_span.length === 0 ) {
						throw Error("No DOM element with id 'search_name_span'");
					}
					$search_name_span.text( searchName )

					const $search_id_span = $("#search_id_span");
					if ( $search_id_span.length === 0 ) {
						throw Error("No DOM element with id 'search_id_span'");
					}
					$search_id_span.text( searchId )

					const $search_name_container = $("#search_name_container");
					if ( $search_name_container.length === 0 ) {
						throw Error("No DOM element with id 'search_name_container'");
					}
					$search_name_container.show()

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		}

		{
			const $project_id = $("#project_id");
			if ( $project_id.length === 0 ) {
				throw Error("No DOM element with id 'project_id'");
			}
			const projectIdentifier = $project_id.text();
			
			const $project_view_controller_path = $("#project_view_controller_path");
			if ( $project_view_controller_path.length === 0 ) {
				throw Error("No DOM element with id 'project_view_controller_path'");
			}
			const project_view_controller_path = $project_view_controller_path.text();

			const projectURL = project_view_controller_path + "/" + projectIdentifier;

			const promise_retrieveProjectTitleFromServer = lorikeetSpectrumViewer_LoadDataFromServer.retrieveProjectTitleFromServer({ projectIdentifier });

			promise_retrieveProjectTitleFromServer.catch( () => { });
	
			promise_retrieveProjectTitleFromServer.then( ({ responseData }) => {
				try {
					const projectTitle = responseData.projectTitle;

					const $project_title_link = $("#project_title_link");
					if ( $project_title_link.length === 0 ) {
						throw Error("No DOM element with id 'project_title_link'");
					}
					$project_title_link.attr( "href", projectURL );

					const $project_title_span = $("#project_title_span");
					if ( $project_title_span.length === 0 ) {
						throw Error("No DOM element with id 'project_title_span'");
					}
					$project_title_span.text( projectTitle );

					const $project_link_container = $("#project_link_container");
					if ( $project_link_container.length === 0 ) {
						throw Error("No DOM element with id 'project_link_container'");
					}
					$project_link_container.show()

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		}

	}
	
}

///////////////

// $(document).ready(function() {
	
	// console.log("called $(document).ready(function() {")
	
	try {
		const lorikeetSpectrumViewer_OwnPage_Root = new LorikeetSpectrumViewer_OwnPage_Root()
		
		lorikeetSpectrumViewer_OwnPage_Root.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

// });

//
// {
// 	const num_1 = 1.1111
// 	const num_2 = 1.1111
//
// 	const num_sum = num_1 + num_2;
//
// 	console.warn( "num_1: " + num_1)
// 	console.warn( "num_2: " + num_2)
// 	console.warn( "num_sum: " + num_sum)
// }
//
// {
// 	const num_1 = 1.001
// 	const num_2 = 1.001
//
// 	const num_sum = num_1 + num_2;
//
// 	console.warn( "num_1: " + num_1)
// 	console.warn( "num_2: " + num_2)
// 	console.warn( "num_sum: " + num_sum)
// }
// {
// 	const num_1 = 1.333
// 	const num_2 = 1.333
//
// 	const num_sum = num_1 + num_2;
//
// 	console.warn( "num_1: " + num_1)
// 	console.warn( "num_2: " + num_2)
// 	console.warn( "num_sum: " + num_sum)
// }