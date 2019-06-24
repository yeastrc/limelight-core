/**
 * peptideViewPage_DisplayDataOnPage.js
 * 
 * Javascript for peptideView.jsp page - Displaying Main Data  
 * 
 * 
 * 
 * 
 * 
 */


import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage.js';

//  From local dir
import { PeptideViewPage_Display_SingleSearch }  
	from 'page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_DisplayData_SingleSearch.js';

/**
 * 
 */
export class PeptideViewPage_DisplayDataOnPage {

	/**
	 * 
	 */
	constructor( {
		dataPages_LoggedInUser_CommonObjectsFactory,
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_OtherUserSelections,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing
	}) {

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_OtherUserSelections = dataPageStateManager_OtherUserSelections;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		
		//  Bind method to 'this' to pass to callback
		let rerenderPageForUpdatedFilterCutoffs_BindThis = this._rerenderPageForUpdatedFilterCutoffs.bind( this );
		
		this._searchDetailsAndFilterBlock_MainPage = new SearchDetailsAndFilterBlock_MainPage({
			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			rerenderPageForUpdatedFilterCutoffs_Callback : rerenderPageForUpdatedFilterCutoffs_BindThis
		} );
		
		this._peptideViewPage_Display_SingleSearch = new PeptideViewPage_Display_SingleSearch( {

			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_OtherUserSelections : this._dataPageStateManager_OtherUserSelections,
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
	};

	/**
	 * 
	 */
	populatePeptideListBlock() {
		
		var projectSearchIds = 
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.getPageState( dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM );

		if ( projectSearchIds.length === 1 ) {
			let projectSearchId = projectSearchIds[ 0 ];
			this._peptideViewPage_Display_SingleSearch.getPeptideList( { projectSearchId } );
			
		} else {
			alert("More than one Search is not supported" );
			throw Error( "More than one Search is not supported" );
		}
	};
	
}