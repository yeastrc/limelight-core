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


import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage';

//  From local dir
import { PeptideViewPage_Display_SingleSearch } from 'page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_DisplayData_SingleSearch.js';

//  Import for typing only
import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/data_pages_common/searchDetailsBlockDataMgmtProcessing';
import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';
import { SingleProtein_CentralStateManagerObjectClass }	from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass.js';
import { ProteinList_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinList_CentralStateManagerObjectClass.js';

/**
 * 
 */
export class PeptideViewPage_DisplayDataOnPage {

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _centralPageStateManager : CentralPageStateManager;

	private _searchDetailsAndFilterBlock_MainPage : SearchDetailsAndFilterBlock_MainPage;
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

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		
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
	 * 
	 */
	populateSearchDetailsBlock() {
		
		this._searchDetailsAndFilterBlock_MainPage.populatePage();
	}

	/**
	 * 
	 */
	populatePeptideListBlock() {
		
		var projectSearchIds = 
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		if ( projectSearchIds.length === 1 ) {
			let projectSearchId = projectSearchIds[ 0 ];
			this._peptideViewPage_Display_SingleSearch.getPeptideList( { projectSearchId } );
			
		} else {
			alert("More than one Search is not supported" );
			throw Error( "More than one Search is not supported" );
		}
	}
	
}