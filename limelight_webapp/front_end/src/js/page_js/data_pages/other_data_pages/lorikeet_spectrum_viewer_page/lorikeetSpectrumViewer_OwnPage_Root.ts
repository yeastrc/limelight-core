/**
 * lorikeetSpectrumViewer_OwnPage_Root.ts
 * 
 * Javascript for  page lorikeetSpectrumViewerView.jsp 
 * 
 * Lorikeet Spectrum Viewer on it's own page
 *
 *
 *   !!!   Optional URL Query String Parameter 'openmod-position' - the position as a number OR 'n' OR 'c'
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

		//  openmodPosition - the position as a number OR 'n' OR 'c'
		const openmodPosition = urlSearchParams.get( "openmod-position" ); //  null if not found

		console.log( "openmodPosition: ", openmodPosition );

		if ( ! window.opener ) {
			this._populateProjectAndSearchInfo({ projectSearchId });
		}

		const dataPageStateManager_DataFrom_Server = new DataPageStateManager();

		const lorikeetSpectrumViewer_LoadDataFromServer = new LorikeetSpectrumViewer_LoadDataFromServer();
		const promise_lorikeetSpectrumViewer_LoadDataFromServer = 
			lorikeetSpectrumViewer_LoadDataFromServer.lorikeetSpectrumViewer_LoadDataFromServer({ 
				projectSearchId, psmId, openmodPosition, dataPageStateManager_DataFrom_Server });

		promise_lorikeetSpectrumViewer_LoadDataFromServer.catch( () => { });

		promise_lorikeetSpectrumViewer_LoadDataFromServer.then( ({ loadedDataFromServer }) => {
			try {
				let dataTable_RootTableDataObject : DataTable_RootTableDataObject = undefined;

				if ( openmodPosition === undefined || openmodPosition === null ) {
					dataTable_RootTableDataObject =
						lorikeetSpectrumViewer_createPsmPeptideTable_HeadersAndData( { psmId_Selection : psmId, projectSearchId, loadedDataFromServer, dataPageStateManager_DataFrom_Server } );
				}

				const lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded = new LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded({ projectSearchId, psmId });
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



