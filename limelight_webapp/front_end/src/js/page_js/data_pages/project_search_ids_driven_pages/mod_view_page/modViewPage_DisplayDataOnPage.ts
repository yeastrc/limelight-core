/**
 * modViewPage_DisplayDataOnPage.ts
 * 
 * Javascript for modView.jsp page - Displaying Main Data  
 * 
 */

"use strict";

import {reportWebErrorToServer} from 'page_js/reportWebErrorToServer';

import {ModViewPage_DataLoader} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataLoader';
import {ModViewDataUtilities} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities';
import {ProteinPositionFilterStateManager} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/proteinPositionFilterStateManager';
import {ModViewDataVizRenderer_MultiSearch} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch';
import {ModViewDataVizRendererOptionsHandler} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizOptionsManager';
import {ModMultiSearch_DataVizPageStateManager} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMultiSearchDataViz_StateManager';
//  Import for typing only
import {DataPages_LoggedInUser_CommonObjectsFactory} from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {SearchDetailsBlockDataMgmtProcessing} from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import {CentralPageStateManager} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';
import {create_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/js/searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_AddToDOM";
import {modViewPage_DisplayDataOnPage_createSearchDetailsSection} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DisplayDataOnPage_createSearchDetailsSection";
import {SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

/**
 * 
 */
export class ModViewPage_DisplayDataOnPage {

	//  Bind method to 'this' to pass to callback
	private _filterValuesChanged_Callback_BindThis = this._filterValuesChanged_Callback.bind( this );

	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;
	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _centralPageStateManager : CentralPageStateManager;

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

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		this._centralPageStateManager = centralPageStateManager;
	}
	
	/**
	 * Called by modViewPage_Root to populate the search details block at top of page.
	 *
	 * Named populateSearchDetailsAndOtherFiltersBlock for consistency with other pages that have other filters in same block
	 * 
	 */
	populateSearchDetailsAndOtherFiltersBlock() {

		const containerDOMElement = document.getElementById("search_details_and_other_filters_outer_block_react_root_container");

		if ( ! containerDOMElement ) {
			const msg = "Failed to get DOM element by id 'search_details_and_other_filters_outer_block_react_root_container'";
			console.warn( msg );
			throw Error( msg )
		}

		const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = new SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue({
			displayOnly : false,
			do_NOT_Display_ChangeSearches_Link : true,
			do_NOT_Display_Re_Order_Searches_Link : true,
			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			filterValuesChanged_Callback : this._filterValuesChanged_Callback_BindThis
		})

		const jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer = (
			modViewPage_DisplayDataOnPage_createSearchDetailsSection({ searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue })
		)

		create_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer({ jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer, containerDOMElement, renderCompleteCallbackFcn : undefined })
	}


	/**
	 * Called when the user updates the filter cutoffs and the page needs to be re-rendered
	 */
	_filterValuesChanged_Callback( params: SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) {
		
		//  This is a blunt approach.  A better approach could be taken that preserves other User Input.

		this.populateSearchDetailsAndOtherFiltersBlock(); //  Update Filter section with new values

		window.setTimeout( () => {
			//  Run in settimeout so Update to FilterBlock paints first so user gets immediate visual feedback
			this.populateModDataBlock(); // Update rest of page with new values
		}, 10 )
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

				// get the open mod data
				let openModDataPromise = dataLoader.getOpenModDataForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing, loadedData });

				// after we get all the data, move on to rendering the page.
				Promise.all( [modDataPromiseChainFinalPromise, proteinDataPromise, totalPSMCountPromise, openModDataPromise ] ).then( function( resolvedPromisesArray ) {
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
		let openModPSMData = {};
		let reportedPeptideProteinMap = {};

		console.log('loadedData', loadedData);

		for(const projectSearchId of projectSearchIds) {

			reportedPeptideModData[projectSearchId] = loadedData[projectSearchId].modData.reportedPeptides;
			proteinPositionResidues[projectSearchId] = loadedData[projectSearchId].proteinPositionResidues;
			totalPSMCount[projectSearchId] = loadedData[projectSearchId].totalPSMCount;
			aminoAcidModStats[projectSearchId] = loadedData[projectSearchId].aminoAcidModStats.reportedPeptideData;
			proteinData[projectSearchId] = loadedData[projectSearchId].proteinData;
			openModPSMData[projectSearchId] = loadedData[projectSearchId].openModPSMData;
			reportedPeptideProteinMap[projectSearchId] = loadedData[projectSearchId].openModReportedPeptideProteinMap;
		}


		let vizOptionsData : { data: { selectedStateObject? : any, projectSearchIds? : any }, stateManagementObject? : ModMultiSearch_DataVizPageStateManager } = { data: { } };
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
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
			openModPSMData
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
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
			openModPSMData
		});
	}

}