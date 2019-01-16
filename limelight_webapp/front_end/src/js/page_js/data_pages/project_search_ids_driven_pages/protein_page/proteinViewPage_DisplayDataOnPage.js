/**
 * proteinViewPage_DisplayDataOnPage.js
 * 
 * Javascript for proteinView.jsp page - Displaying Main Data  
 * 
 * 
 * 
 * 
 * 
 */

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage.js';

import { downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds } from 'page_js/data_pages/project_search_ids_driven_pages_sub_parts/psm_downloadForCriteriaAndOptionalRepPepIdsProtSeqVIds.js';

//  From local dir
import { ProteinViewPage_Display_SingleSearch } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleSearch.js';

import { ProteinViewPage_Display_MultipleSearches } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_MultipleSearches.js';

/**
 * 
 */
export class ProteinViewPage_DisplayDataOnPage {

	/**
	 * 
	 */
	constructor( {
		dataPages_LoggedInUser_CommonObjectsFactory,
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_OtherUserSelections,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing,
		centralPageStateManager,
		singleProtein_CentralStateManagerObject
	}) {

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_OtherUserSelections = dataPageStateManager_OtherUserSelections;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

		this._centralPageStateManager = centralPageStateManager;
		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;

		//  Bind method to 'this' to pass to callback
		let rerenderPageForUpdatedFilterCutoffs_BindThis = this._rerenderPageForUpdatedFilterCutoffs.bind( this );
		
		this._searchDetailsAndFilterBlock_MainPage = new SearchDetailsAndFilterBlock_MainPage({

			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			rerenderPageForUpdatedFilterCutoffs_Callback : rerenderPageForUpdatedFilterCutoffs_BindThis
		} );
		
		this._proteinViewPage_Display_SingleSearch = new ProteinViewPage_Display_SingleSearch( {

			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_OtherUserSelections : this._dataPageStateManager_OtherUserSelections,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager : this._centralPageStateManager,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject
		});

		this._proteinViewPage_Display_MultipleSearches = new ProteinViewPage_Display_MultipleSearches( {

			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_OtherUserSelections : this._dataPageStateManager_OtherUserSelections,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager : this._centralPageStateManager,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject
		});
	}

	/**
	 * 
	 */
	initialize({ projectSearchIds }) {
		
		// @param rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto - Root DOM element to search for DOM element to insert the Search Details and Filters in

		this._searchDetailsAndFilterBlock_MainPage.initialize({ rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto : "#data_page_overall_enclosing_block_div" });
	}

	/**
	 * Called when the user updates the filter cutoffs and the page needs to be re-rendered
	 */
	_rerenderPageForUpdatedFilterCutoffs( { projectSearchIdsForCutoffsChanged } ) {

		//  TODO  This is a blunt approach.  A better approach needs to be taken that preserves other User Input.
		
		this.populateProteinListBlock();
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
	populateProteinListBlock() {
		
		const objectThis = this;

		var projectSearchIds = 
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.getPageState( dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM );

		if ( projectSearchIds.length === 0 ) {
			throw Error( "projectSearchIds.length === 0 " );
		}

		if ( projectSearchIds.length !== 1 ) {

			//  Multiple Project Search Ids
			this.populateProteinListBlock_MultipleSearches({ projectSearchIds });

			return;  //  EARLY EXIT
		}

		//  Single Project Search Id

		let projectSearchId = projectSearchIds[0];

		this.populateProteinListBlock_SingleSearch({ projectSearchId }) ;

	}


	/**
	 * 
	 */
	populateProteinListBlock_MultipleSearches({ projectSearchIds }) {

		const $protein_counts_download_assoc_psms_block = $("#protein_counts_download_assoc_psms_block");
		if ( $protein_counts_download_assoc_psms_block.length === 0 ) {
			throw Error("Failed to find DOM element with id 'protein_counts_download_assoc_psms_block'");
		}
		$protein_counts_download_assoc_psms_block.show();
		
		this._proteinViewPage_Display_MultipleSearches.populateProteinList({ projectSearchIds });
	}

	/**
	 * 
	 */
	populateProteinListBlock_SingleSearch({ projectSearchId }) {
		
		const objectThis = this;

		// Wait to show and attach click handler for #protein_download_proteins until after protein list is displayed

		if ( ! this._downloadPSMClickHandlerAttached ) {
	
			//  Download PSMs container and link.  Only supported for 1 project search id
		
			const $protein_download_assoc_psms = $("#protein_download_assoc_psms");
			$protein_download_assoc_psms.show();

			$protein_download_assoc_psms.click( function(eventObject) {
				try {
					eventObject.preventDefault();

					const projectSearchIds_InDownloadClickHandler = 
					objectThis._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.getPageState( dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM );

					if ( projectSearchIds_InDownloadClickHandler.length !== 1 ) {
						alert("More than one Search is not supported" );
						throw Error( "More than one Search is not supported" );
					}
					
					let projectSearchId_InDownloadClickHandler = projectSearchIds_InDownloadClickHandler[0];
					
					const searchDataLookupParamsRoot = 
						objectThis._searchDetailsBlockDataMgmtProcessing.
						getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

					if ( ! searchDataLookupParamsRoot ) {
						throw Error( "searchDataLookupParamsRoot not found" );
					}

					downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds( { 
						projectSearchIds : [ projectSearchId_InDownloadClickHandler ],
						searchDataLookupParamsRoot : searchDataLookupParamsRoot,
						//  No value for reportedPeptideIds or proteinSequenceVersionIds so don't use those to filter download
						// reportedPeptideIds : reportedPeptideIds, 
						// proteinSequenceVersionIds 
					 } );
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
					throw e;
				}
			});

			this._downloadPSMClickHandlerAttached = true;
		}

		const $protein_counts_download_assoc_psms_block = $("#protein_counts_download_assoc_psms_block");
		if ( $protein_counts_download_assoc_psms_block.length === 0 ) {
			throw Error("Failed to find DOM element with id 'protein_counts_download_assoc_psms_block'");
		}
		$protein_counts_download_assoc_psms_block.show();
		
		this._proteinViewPage_Display_SingleSearch.populateProteinList({ projectSearchId });

		
	};
	
}