/**
 * modViewPage_DisplayDataOnPage.js
 * 
 * Javascript for modView.jsp page - Displaying Main Data  
 * 
 */

"use strict";

let Handlebars = require('handlebars/runtime');

let _mod_table_template_bundle = 
	require("../../../../../../handlebars_templates_precompiled/mod_view_page/mod_view_page_template-bundle.js" );

let _common_template_bundle = 
	require("../../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage.js';
import { ModViewPage_DataLoader } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataLoader.js';
import { ModViewDataUtilities } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities.js';
import { ProteinPositionFilterStateManager } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/proteinPositionFilterStateManager.js';
import { ModViewDataTableRenderer } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataTableRenderer.js';

/**
 * 
 */
export class ModViewPage_DisplayDataOnPage {

	/**
	 * 
	 */
	constructor( params ) {

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = params.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = params.dataPageStateManager_DataFrom_Server;
		this._searchDetailsBlockDataMgmtProcessing = params.searchDetailsBlockDataMgmtProcessing;

		//  Bind method to 'this' to pass to callback
		let rerenderPageForUpdatedFilterCutoffs_BindThis = this._rerenderPageForUpdatedFilterCutoffs.bind( this );
		
		this._searchDetailsAndFilterBlock_MainPage = new SearchDetailsAndFilterBlock_MainPage({
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
	};


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
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.getPageState( dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM );
				
		let searchDetailsBlockDataMgmtProcessing = this._searchDetailsBlockDataMgmtProcessing;
		let dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = objectThis._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;

		this.loadDataForAllProjectSearchIds( { projectSearchIds, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay } );
	};

	/**
	 * Load data for all the project search Ids and go to render page when all are done
	 * 
	 * @param {*} param0 
	 */
	loadDataForAllProjectSearchIds( { projectSearchIds, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay } ) {

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
			objectThis.renderModDataPage( { projectSearchIds, loadedData, searchDetailsBlockDataMgmtProcessing } );		
		});

	}

	/**
	 * Load the data for a single project search id, return a Promise that resolves when all data for project
	 * search id are loaded.
	 * 
	 * @param {*} param0 
	 */
	loadDataForProjectSearchId({ loadedData, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay } ) {

		let dataLoader = new ModViewPage_DataLoader();

		return new Promise( function( resolve, reject ) {
	
			// Get all mod data: modded proteins, positions in those proteins, list of reported peptide and psm ids for those locations
			let modDataPromise = dataLoader.getModDataForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId, loadedData } );
	
			// A chain of promises, each dependant on successful completion of the previous one
			let modDataPromiseChainFinalPromise = modDataPromise.then( function( result ) {
	
				/*
				 * Now that we have loaded the mod data, get all amino acid residues at modded locations
				 */
				let proteinsAndPositions = ModViewDataUtilities.getProteinsAndPositionsFromModData( { modData: loadedData.modData } );
				let proteinPositionResiduesPromise = dataLoader.getProteinPositionResidues( { projectSearchId, proteinsAndPositions, loadedData } );
				return proteinPositionResiduesPromise;
	
			}).then( function( result ) {
	
				/*
				 * Now that we have all amino acid residues at modded locations,
				 * let's get modification stats associated with those residues
				 * in this search at these cutoffs.
				 */
				let proteinPositionResidues = loadedData.proteinPositionResidues;
				let distinctResidues = ModViewDataUtilities.getDistinctResiduesFromProteinPositionResidues( { proteinPositionResidues } );
				let aminoAcidModStatsPromise = dataLoader.getAminoAcidModStatsForSearch( { projectSearchId, searchDetailsBlockDataMgmtProcessing, loadedData, residueArray : distinctResidues } );
	
				return aminoAcidModStatsPromise;
			});
	
			// load the protein annotations (names and descriptions) for proteins in this experiment
			let proteinDataPromise = dataLoader.getProteinAnnotationDataForSingleProjectSearchId( { projectSearchId, searchDetailsBlockDataMgmtProcessing,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, loadedData } );
	
			// get the total number of PSMs for this experiment that meet the cutoffs
			let totalPSMCountPromise = dataLoader.getTotalPSMCountForSingleProjectSearchId( { searchDetailsBlockDataMgmtProcessing, projectSearchId, loadedData } );
	
			// after we get all the data, move on to rendering the page.
			Promise.all( [modDataPromiseChainFinalPromise, proteinDataPromise, totalPSMCountPromise ] ).then( function( resolvedPromisesArray ) {
				resolve();
			});

		});

	}

	/**
	 * Render the page.
	 * 
	 * @param {*} param0 
	 */
	renderModDataPage( { loadedData, projectSearchIds, searchDetailsBlockDataMgmtProcessing } ) {

		console.log( loadedData );

		if( projectSearchIds.length == 1 ) {
			let projectSearchId = projectSearchIds[ 0 ];
			this.renderModDataPageSingleSearch({ searchDetailsBlockDataMgmtProcessing, loadedData : loadedData[ projectSearchId ], projectSearchId : projectSearchId } );
		} else {

			console.log( "multiple searches not done yet." );		

		}

	};

	renderModDataPageSingleSearch({ loadedData, projectSearchId, searchDetailsBlockDataMgmtProcessing } ) {

		// enable click handler for filtering proteins and positions overlay
		let proteinPositionFilterStateManager = new ProteinPositionFilterStateManager();

		// get our data into convenient variables
		let reportedPeptideModData = loadedData.modData.reportedPeptides;
		let proteinPositionResidues = loadedData.proteinPositionResidues;
		let totalPSMCount = loadedData.totalPSMCount;
		let aminoAcidModStats = loadedData.aminoAcidModStats.reportedPeptideData;
		let proteinData = loadedData.proteinData;

		ModViewDataTableRenderer.renderDataTable( { reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, proteinData, proteinPositionFilterStateManager, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server } );
	}

}