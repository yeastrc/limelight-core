/**
 * peptideViewPage_DisplayDataOnPage.ts
 * 
 * Javascript for peptideView.jsp page - Displaying Main Data  
 * 
 * 
 * 
 * 
 * 
 */


//  From local dir
import { PeptideViewPage_Display_SingleSearch } from 'page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_DisplayData_SingleSearch';

//  Import for typing only
import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import {create_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/js/searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_AddToDOM";
import {SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";
import {peptideViewPage_DisplayDataOnPage_createSearchDetailsSection} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_DisplayDataOnPage_createSearchDetailsSection";

/**
 * 
 */
export class PeptideViewPage_DisplayDataOnPage {

	//  Bind method to 'this' to pass to callback
	private _filterValuesChanged_Callback_BindThis = this._filterValuesChanged_Callback.bind( this );

	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _centralPageStateManager : CentralPageStateManager;

	private _peptideViewPage_Display_SingleSearch : PeptideViewPage_Display_SingleSearch;
	
	/**
	 * 
	 */
	constructor({ 
		dataPages_LoggedInUser_CommonObjectsFactory, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing,
	 } : { 
		dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager,
		dataPageStateManager_DataFrom_Server : DataPageStateManager, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing,
	 }) {

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

		this._peptideViewPage_Display_SingleSearch = new PeptideViewPage_Display_SingleSearch( {

			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing
		});
	}
	
	/**
	 * 
	 */
	initialize() {
		
		let objectThis = this;
		
		//  TODO   TEMP
//		let $reload_peptide_data__temp = $("#reload_peptide_data__temp");
//
//		$reload_peptide_data__temp.click( function(eventObject) {
//			try {
//				eventObject.preventDefault();
//				objectThis.populatePeptideListBlock();
//			} catch( e ) {
//				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//				throw e;
//			}
//		});
	}

	/**
	 * Called when the user updates the filter cutoffs and the page needs to be re-rendered
	 */
	_rerenderPageForUpdatedFilterCutoffs( { projectSearchIdsForCutoffsChanged } ) {

		//  TODO  This is a blunt approach.  A better approach needs to be taken that preserves other User Input.
		
		this.populatePeptideListBlock();
	}

	/**
	 * Called by peptideViewPage_Root to populate the search details block at top of page.
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
		});

		const jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer = (
			peptideViewPage_DisplayDataOnPage_createSearchDetailsSection({ searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue })
		)

		create_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer({ jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer, containerDOMElement, renderCompleteCallbackFcn : undefined })
	}

	/**
	 * Called when the user updates the filter cutoffs and the page needs to be re-rendered
	 */
	_filterValuesChanged_Callback( params: SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) {

		//  This is a even more blunt approach.  Appear to have timing issues updating in memory cached data when don't reload the page

		window.location.reload(true ) //  param of true is deprecated, not the method

		//  This is a blunt approach.  A better approach could be taken that preserves other User Input.
		//
		// this.populateSearchDetailsAndOtherFiltersBlock(); //  Update Filter section with new values
		//
		// window.setTimeout( () => {
		// 	//  Run in settimeout so Update to FilterBlock paints first so user gets immediate visual feedback
		// 	this.populatePeptideListBlock(); // Update rest of page with new values
		// }, 10 )
	}

	/**
	 * 
	 */
	populatePeptideListBlock() {
		
		var projectSearchIds = 
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		if ( projectSearchIds.length === 1 ) {
			let projectSearchId = projectSearchIds[ 0 ];
			this._peptideViewPage_Display_SingleSearch.populatePeptideList( { projectSearchId } );
			
		} else {
			alert("More than one Search is not supported" );
			throw Error( "More than one Search is not supported" );
		}
	}
	
}