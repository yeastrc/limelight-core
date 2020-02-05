/**
 * modViewPage_DisplayDataOnPage.ts
 * 
 * Javascript for modView.jsp page - Displaying Main Data  
 * 
 */

"use strict";

import {reportWebErrorToServer} from 'page_js/reportWebErrorToServer.js';

import {SearchDetailsAndFilterBlock_MainPage} from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage';
import {ModViewPage_DataLoader} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataLoader.js';
import {ModViewDataUtilities} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities.js';
import {ProteinPositionFilterStateManager} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/proteinPositionFilterStateManager.js';
import {ModViewDataVizRenderer_MultiSearch} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch.js';
import {ModViewDataVizRendererOptionsHandler} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizOptionsManager.js';
import {ModMultiSearch_DataVizPageStateManager} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMultiSearchDataViz_StateManager.js';
//  Import for typing only
import {DataPages_LoggedInUser_CommonObjectsFactory} from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import {SearchDetailsBlockDataMgmtProcessing} from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import {CentralPageStateManager} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

/**
 * 
 */
export class ModViewPage_DisplayDataOnPage {

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _centralPageStateManager : CentralPageStateManager;

	private _searchDetailsAndFilterBlock_MainPage : SearchDetailsAndFilterBlock_MainPage;


	/**
	 * 
	 */
	constructor({ 
		dataPages_LoggedInUser_CommonObjectsFactory, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing,
		centralPageStateManager
	 } : { 
		dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager,
		dataPageStateManager_DataFrom_Server : DataPageStateManager, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing,
		centralPageStateManager : CentralPageStateManager
	 }) {

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		this._centralPageStateManager = centralPageStateManager;

		//  Bind method to 'this' to pass to callback
		let rerenderPageForUpdatedFilterCutoffs_BindThis = this._rerenderPageForUpdatedFilterCutoffs.bind( this );
		
		this._searchDetailsAndFilterBlock_MainPage = new SearchDetailsAndFilterBlock_MainPage({
			displayOnly : false,
			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			rerenderPageForUpdatedFilterCutoffs_Callback : rerenderPageForUpdatedFilterCutoffs_BindThis
		} );
	}
	
	/**
	 * Called by modViewPage_Root to populate the search details
	 * block at top of page.
	 * 
	 */
	populateSearchDetailsBlock() {
		
		this._searchDetailsAndFilterBlock_MainPage.populatePage();
	}


	/**
	 * Called when the user updates the filter cutoffs and the page needs to be re-rendered
	 */
	_rerenderPageForUpdatedFilterCutoffs( { projectSearchIdsForCutoffsChanged } ) {
		
		//  TODO  This is a blunt approach.  A better approach needs to be taken that preserves other User Input.
		
		this.populateModDataBlock();
	}
	
	/**
	 * Called by modViewPage_Root after it has loaded annotation
	 * type names/descriptions. All search projects, annotation
	 * cutoffs, annotation names, etc are available at this point.
	 * 
	 * Mod data is not yet loaded.
	 * 
	 */
	populateModDataBlock() {
		
		let objectThis = this;

		let projectSearchIds = // array
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();
				
		let searchDetailsBlockDataMgmtProcessing = this._searchDetailsBlockDataMgmtProcessing;
		let dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = objectThis._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;

		this.loadDataForAllProjectSearchIds( { projectSearchIds, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay } );
	}

	/**
	 * Load data for all the project search Ids and go to render page when all are done
	 * 
	 * @param {*} param0 
	 */
	loadDataForAllProjectSearchIds( { 
		projectSearchIds, 
		searchDetailsBlockDataMgmtProcessing, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay 
	} : { 
		projectSearchIds, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
	} ) {

		let objectThis = this;

		let projectSearchIdPromisesArray = [ ];
		let loadedData = { };

		for (let projectSearchId of projectSearchIds) {
			loadedData[ projectSearchId ] = { };

			projectSearchIdPromisesArray.push( this.loadDataForProjectSearchId( { loadedData : loadedData[ projectSearchId ],
																				  projectSearchId,
																				  searchDetailsBlockDataMgmtProcessing,
																				  dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay } ) );
		}

		Promise.all( projectSearchIdPromisesArray ).then( function( resolvedPromisesArray ) {
			try {
				objectThis.renderModDataPage( { projectSearchIds, loadedData, searchDetailsBlockDataMgmtProcessing } );		
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

	}

	/**
	 * Load the data for a single project search id, return a Promise that resolves when all data for project
	 * search id are loaded.
	 * 
	 * @param {*} param0 
	 */
	loadDataForProjectSearchId({ 
		loadedData, 
		projectSearchId, 
		searchDetailsBlockDataMgmtProcessing, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay 
	} : { 
		loadedData, 
		projectSearchId, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
	} ) {

		let dataLoader = new ModViewPage_DataLoader();

		return new Promise( function( resolve, reject ) {
			try {
				// Get all mod data: modded proteins, positions in those proteins, list of reported peptide and psm ids for those locations
				let modDataPromise = dataLoader.getModDataForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId, loadedData } );
		
				// A chain of promises, each dependant on successful completion of the previous one
				let modDataPromiseChainFinalPromise = modDataPromise.then( function( result ) {
					try {
						/*
						* Now that we have loaded the mod data, get all amino acid residues at modded locations
						*/
						let proteinsAndPositions = ModViewDataUtilities.getProteinsAndPositionsFromModData( { modData: loadedData.modData } );
						let proteinPositionResiduesPromise = dataLoader.getProteinPositionResidues( { projectSearchId, proteinsAndPositions, loadedData } );
						return proteinPositionResiduesPromise;
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				}).then( function( result ) {
					try {
						/*
						* Now that we have all amino acid residues at modded locations,
						* let's get modification stats associated with those residues
						* in this search at these cutoffs.
						*/
						let proteinPositionResidues = loadedData.proteinPositionResidues;
						let distinctResidues = ModViewDataUtilities.getDistinctResiduesFromProteinPositionResidues( { proteinPositionResidues } );
						let aminoAcidModStatsPromise = dataLoader.getAminoAcidModStatsForSearch( { projectSearchId, searchDetailsBlockDataMgmtProcessing, loadedData, residueArray : distinctResidues } );
			
						return aminoAcidModStatsPromise;
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
		
				// load the protein annotations (names and descriptions) for proteins in this experiment
				let proteinDataPromise = dataLoader.getProteinAnnotationDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing,
					dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, loadedData } );
		
				// get the total number of PSMs for this experiment that meet the cutoffs
				let totalPSMCountPromise = dataLoader.getTotalPSMCountForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId, loadedData } );
		
				// after we get all the data, move on to rendering the page.
				Promise.all( [modDataPromiseChainFinalPromise, proteinDataPromise, totalPSMCountPromise ] ).then( function( resolvedPromisesArray ) {
					try {
						resolve();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
			
		});

	}

	/**
	 * Render the page.
	 * 
	 * @param {*} param0 
	 */
	renderModDataPage( { 
		loadedData, 
		projectSearchIds, 
		searchDetailsBlockDataMgmtProcessing 
	} : { 
		loadedData, 
		projectSearchIds, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
	} ) {

		this.renderModDataPageMultiSearch({ searchDetailsBlockDataMgmtProcessing, loadedData, projectSearchIds } );
	}

	renderModDataPageMultiSearch({ 
		loadedData, 
		projectSearchIds, 
		searchDetailsBlockDataMgmtProcessing 
	} : { 
		loadedData, 
		projectSearchIds, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
	} ) {

		// enable click handler for filtering proteins and positions overlay
		let proteinPositionFilterStateManager = new ProteinPositionFilterStateManager();

		let reportedPeptideModData = {};
		let proteinPositionResidues = {};
		let totalPSMCount = {};
		let aminoAcidModStats = {};
		let proteinData = {};

		for(const projectSearchId of projectSearchIds) {

			reportedPeptideModData[projectSearchId] = loadedData[projectSearchId].modData.reportedPeptides;
			proteinPositionResidues[projectSearchId] = loadedData[projectSearchId].proteinPositionResidues;
			totalPSMCount[projectSearchId] = loadedData[projectSearchId].totalPSMCount;
			aminoAcidModStats[projectSearchId] = loadedData[projectSearchId].aminoAcidModStats.reportedPeptideData;
			proteinData[projectSearchId] = loadedData[projectSearchId].proteinData;
		}


		let vizOptionsData = { data: { selectedStateObject : undefined, projectSearchIds : undefined }, stateManagementObject : undefined };
		vizOptionsData.data.selectedStateObject = { data: { } };
		const stateManagementObject = new ModMultiSearch_DataVizPageStateManager( { centralPageStateManager : this._centralPageStateManager, vizOptionsData } );
		vizOptionsData.stateManagementObject = stateManagementObject;

		stateManagementObject.initialize();	// load in values from the URL

		if(vizOptionsData.data.projectSearchIds === undefined) {
			vizOptionsData.data.projectSearchIds = [...projectSearchIds];	// ordered list of project ids to show is considered a viz option
		}

		// add the options section to the page using these viz options
		ModViewDataVizRendererOptionsHandler.showOptionsOnPage({
			vizOptionsData,
			reportedPeptideModData,
			proteinPositionResidues,
			totalPSMCount,
			aminoAcidModStats,
			proteinData,
			proteinPositionFilterStateManager,
			searchDetailsBlockDataMgmtProcessing,
			projectSearchIds,
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server
		});

		// add the viz to the page using these viz options
		ModViewDataVizRenderer_MultiSearch.renderDataViz({
			vizOptionsData,
			reportedPeptideModData,
			proteinPositionResidues,
			totalPSMCount,
			aminoAcidModStats,
			proteinData,
			proteinPositionFilterStateManager,
			searchDetailsBlockDataMgmtProcessing,
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server
		});
	}

}