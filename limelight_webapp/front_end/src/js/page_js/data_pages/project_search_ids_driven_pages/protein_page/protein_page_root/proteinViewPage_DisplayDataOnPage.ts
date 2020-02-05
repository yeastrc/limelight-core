/**
 * proteinViewPage_DisplayDataOnPage.ts
 * 
 * Javascript for proteinView.jsp page - Displaying Main Data  
 * 
 * 
 * 
 * 
 * 
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage';

import { downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds } from 'page_js/data_pages/project_search_ids_driven_pages_sub_parts/psm_downloadForCriteriaAndOptionalRepPepIdsProtSeqVIds';

//  From local dir
import { ProteinViewPage_Display_SingleSearch } from '../protein_page_single_search/proteinViewPage_DisplayData_SingleSearch';

import { ProteinViewPage_Display_MultipleSearches } from '../protein_page_multiple_search/proteinViewPage_DisplayData_MultipleSearches';

//  Import for typing only
import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';
import { SingleProtein_CentralStateManagerObjectClass }	from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass';
import { ProteinList_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinList_CentralStateManagerObjectClass';
import { ProteinGrouping_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';

/**
 * 
 */
export class ProteinViewPage_DisplayDataOnPage {

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _centralPageStateManager : CentralPageStateManager;

	private _searchDetailsAndFilterBlock_MainPage : SearchDetailsAndFilterBlock_MainPage;
	private _singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass;
	private _proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass;
	private _proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass;

	private _proteinViewPage_Display_SingleSearch : ProteinViewPage_Display_SingleSearch;
	private _proteinViewPage_Display_MultipleSearches : ProteinViewPage_Display_MultipleSearches;
	private _downloadPSMClickHandlerAttached : boolean;

	/**
	 * 
	 */
	constructor({ 
		dataPages_LoggedInUser_CommonObjectsFactory, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing,
		centralPageStateManager,
		singleProtein_CentralStateManagerObject,
		proteinList_CentralStateManagerObjectClass,
		proteinGrouping_CentralStateManagerObjectClass
	 } : { 
		dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager,
		dataPageStateManager_DataFrom_Server : DataPageStateManager, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing,
		centralPageStateManager : CentralPageStateManager,
		singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass,
		proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass
		proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
	 }) {

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

		this._centralPageStateManager = centralPageStateManager;
		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;
		this._proteinList_CentralStateManagerObjectClass = proteinList_CentralStateManagerObjectClass;
		this._proteinGrouping_CentralStateManagerObjectClass = proteinGrouping_CentralStateManagerObjectClass;

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
		
		this._proteinViewPage_Display_SingleSearch = new ProteinViewPage_Display_SingleSearch( {

			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager : this._centralPageStateManager,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,
			proteinList_CentralStateManagerObjectClass : this._proteinList_CentralStateManagerObjectClass,
			proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass
		});

		this._proteinViewPage_Display_MultipleSearches = new ProteinViewPage_Display_MultipleSearches( {

			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager : this._centralPageStateManager,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,
			proteinList_CentralStateManagerObjectClass : this._proteinList_CentralStateManagerObjectClass,
			proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass
		});
	}

	/**
	 * 
	 */
	initialize({ projectSearchIds } : { projectSearchIds : Array<number> }) {
		
		// @param rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto - Root DOM element to search for DOM element to insert the Search Details and Filters in

		this._searchDetailsAndFilterBlock_MainPage.initialize({ rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto : "#data_page_overall_enclosing_block_div" });

		if ( projectSearchIds.length === 1 ) {

			const projectSearchId = projectSearchIds[ 0 ];

			this._proteinViewPage_Display_SingleSearch.initialize({ projectSearchId });

		} else {

			this._proteinViewPage_Display_MultipleSearches.initialize({ projectSearchIds });
		}
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
	}

	/**
	 * 
	 */
	populateOtherFiltersInFilterBlock() : void {

		var projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		if ( projectSearchIds.length === 0 ) {
			throw Error( "populateProteinListBlock(): projectSearchIds.length === 0 " );
		}

		if ( projectSearchIds.length === 1 ) {

			this._proteinViewPage_Display_SingleSearch.populateOtherFiltersInFilterBlock();

		} else {

			// this._proteinViewPage_Display_MultipleSearches.po
		}
	}

	/**
	 * 
	 */
	populateProteinListBlock() {
		
		{
			const $protein_counts_download_assoc_psms_block = $("#protein_counts_download_assoc_psms_block");
			if ( $protein_counts_download_assoc_psms_block.length === 0 ) {
				throw Error("Failed to find DOM element with id 'protein_counts_download_assoc_psms_block'");
			}
			$protein_counts_download_assoc_psms_block.hide();
		}

		var projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		if ( projectSearchIds.length === 0 ) {
			throw Error( "populateProteinListBlock(): projectSearchIds.length === 0 " );
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

		// const $protein_counts_download_assoc_psms_block = $("#protein_counts_download_assoc_psms_block");
		// if ( $protein_counts_download_assoc_psms_block.length === 0 ) {
		// 	throw Error("Failed to find DOM element with id 'protein_counts_download_assoc_psms_block'");
		// }
		// $protein_counts_download_assoc_psms_block.show();
		
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
					objectThis._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

					if ( projectSearchIds_InDownloadClickHandler.length !== 1 ) {
						alert("More than one Search is not supported" );
						throw Error( "More than one Search is not supported" );
					}
					
					let projectSearchId_InDownloadClickHandler = projectSearchIds_InDownloadClickHandler[0];
					
					const searchDataLookupParamsRoot : SearchDataLookupParameters_Root = 
						objectThis._searchDetailsBlockDataMgmtProcessing.
						getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({ dataPageStateManager : undefined });

					if ( ! searchDataLookupParamsRoot ) {
						throw Error( "searchDataLookupParamsRoot not found" );
					}

					const single_projectSearchId_ReportedPeptideIdsPsmIds = { projectSearchId : projectSearchId_InDownloadClickHandler };
					
					const projectSearchIdsReportedPeptideIdsPsmIds = [ single_projectSearchId_ReportedPeptideIdsPsmIds ];

					downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds( { 
						projectSearchIdsReportedPeptideIdsPsmIds,
						searchDataLookupParamsRoot : searchDataLookupParamsRoot,
						proteinSequenceVersionIds : undefined
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

		
	}
	
}