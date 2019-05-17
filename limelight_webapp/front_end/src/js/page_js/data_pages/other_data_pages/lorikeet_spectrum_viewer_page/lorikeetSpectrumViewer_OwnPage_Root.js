/**
 * lorikeetSpectrumViewer_OwnPage_Root.js
 * 
 * Javascript for  page lorikeetSpectrumViewerView.jsp 
 * 
 * Lorikeet Spectrum Viewer on it's own page
 * 
 * Root Javascript file
 */


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

const Handlebars = require('handlebars/runtime');


const _lorikeet_page_bundle =
	require("../../../../../../handlebars_templates_precompiled/lorikeet_page/lorikeet_page_template-bundle.js" );


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

import { LorikeetSpectrumViewer_LoadDataFromServer } from './lorikeetSpectrumViewer_LoadDataFromServer.js';

import { CreatePsmPeptideTable_HeadersAndData } from "./lorikeetSpectrumViewer_createDataFor_PsmPeptideTable.js";
import { LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded } from './lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded.js';


/**
 * 
 */
class LorikeetSpectrumViewer_OwnPage_Root {

	/**
	 * 
	 */
	constructor() {

		// console.log( "LorikeetSpectrumViewer_OwnPage_Root: contructor called")

		if ( ! _lorikeet_page_bundle.search_name_display ) {
			throw Error("Not found: _lorikeet_page_bundle.search_name_display");
		}
		if ( ! _lorikeet_page_bundle.project_title_url ) {
			throw Error("Not found: _lorikeet_page_bundle.project_title_url");
		}

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

		if ( ! window.opener ) {
			this._populateProjectAndSearchInfo({ projectSearchId });
		}

		const dataPageStateManager_DataFrom_Server = new DataPageStateManager();

		const lorikeetSpectrumViewer_LoadDataFromServer = new LorikeetSpectrumViewer_LoadDataFromServer();
		const promise_lorikeetSpectrumViewer_LoadDataFromServer = 
			lorikeetSpectrumViewer_LoadDataFromServer.lorikeetSpectrumViewer_LoadDataFromServer({ 
				projectSearchId, psmId, dataPageStateManager_DataFrom_Server });

		promise_lorikeetSpectrumViewer_LoadDataFromServer.catch( () => { });

		promise_lorikeetSpectrumViewer_LoadDataFromServer.then( ({ loadedDataFromServer }) => {
			try {
				const createPsmPeptideTable_HeadersAndData = new CreatePsmPeptideTable_HeadersAndData();

				const psmPeptideTable_HeadersAndData = 
					createPsmPeptideTable_HeadersAndData.createPsmPeptideTable_HeadersAndData( { psmId, projectSearchId, loadedDataFromServer, dataPageStateManager_DataFrom_Server } );

				const lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded = new LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded({ projectSearchId, psmId });
				lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded.initialize();
				lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded.addLorikeetToPage({ loadedDataFromServer, psmPeptideTable_HeadersAndData });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}


	/**
	 * 
	 */
	_populateProjectAndSearchInfo({ projectSearchId }) {
	
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
					const searchNameContext = { searchName, searchId }

					const searchNameHTML = _lorikeet_page_bundle.search_name_display( searchNameContext );

					const $search_name_container = $("#search_name_container");
					if ( $search_name_container.length === 0 ) {
						throw Error("No DOM element with id 'search_name_container'");
					}
					$search_name_container.html( searchNameHTML );

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

					const projectContext = { projectURL, projectTitle }
	
					const projectHTML = _lorikeet_page_bundle.project_title_url( projectContext );
	
					const $project_link_container = $("#project_link_container");
					if ( $project_link_container.length === 0 ) {
						throw Error("No DOM element with id 'project_link_container'");
					}
					$project_link_container.html( projectHTML );

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



