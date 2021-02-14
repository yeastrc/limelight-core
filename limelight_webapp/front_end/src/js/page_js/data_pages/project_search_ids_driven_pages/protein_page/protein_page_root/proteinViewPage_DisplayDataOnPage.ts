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

import {create_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/js/searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_AddToDOM";
import {SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";
import {
	ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
	ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_search_and_other_filters_block/proteinViewPage_ProteinGroupingFilterSelectionComponent";
import {proteinViewPage_MainPageProteinList_createSearchDetailsSection} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_search_and_other_filters_block/proteinViewPage_MainPageProteinList_createSearchAndOtherFiltersSection";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {
	SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData,
	SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_ManageGroupNames_Clicked_Callback,
	SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_SelectionsChanged_Callback
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group/js/proteinViewPage_DisplayData_SingleSearch__SearchSubGroup";
import {searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";

/**
 * 
 */
export class ProteinViewPage_DisplayDataOnPage {

	//  Bind method to 'this' to pass to callback
	private _search_FilterValues_Changed_Callback_BindThis = this._search_FilterValues_Changed_Callback.bind( this );
	private _proteinGroup_SelectionValues_Changed_Callback_BindThis = this._proteinGroup_SelectionValues_Changed_Callback.bind(this);
	private _search_SubGroup_SelectionValues_Changed_Callback_BindThis = this._search_SubGroup_SelectionValues_Changed_Callback.bind(this); // Called from Single Protein

	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _centralPageStateManager : CentralPageStateManager;

	private _searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
	private _singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass;
	private _proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass;
	private _proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass;
	private _generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject

	private _proteinViewPage_Display_SingleSearch : ProteinViewPage_Display_SingleSearch;
	private _proteinViewPage_DisplayData_SingleSearch__SearchSubGroup : ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup
	private _proteinViewPage_Display_MultipleSearches : ProteinViewPage_Display_MultipleSearches;

	/**
	 * 
	 */
	constructor({ 
		dataPages_LoggedInUser_CommonObjectsFactory, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing,
		centralPageStateManager,
		searchSubGroup_CentralStateManagerObjectClass,
		singleProtein_CentralStateManagerObject,
		proteinList_CentralStateManagerObjectClass,
		proteinGrouping_CentralStateManagerObjectClass,
		generatedPeptideContents_UserSelections_StateObject
	 } : { 
		dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager,
		dataPageStateManager_DataFrom_Server : DataPageStateManager, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing,
		centralPageStateManager : CentralPageStateManager,
		searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
		singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass,
		proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass
		proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
		generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
	 }) {

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

		this._centralPageStateManager = centralPageStateManager;
		this._searchSubGroup_CentralStateManagerObjectClass = searchSubGroup_CentralStateManagerObjectClass;
		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;
		this._proteinList_CentralStateManagerObjectClass = proteinList_CentralStateManagerObjectClass;
		this._proteinGrouping_CentralStateManagerObjectClass = proteinGrouping_CentralStateManagerObjectClass;
		this._generatedPeptideContents_UserSelections_StateObject = generatedPeptideContents_UserSelections_StateObject;

		this._proteinViewPage_Display_SingleSearch = new ProteinViewPage_Display_SingleSearch( {

			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager : this._centralPageStateManager,
			searchSubGroup_CentralStateManagerObjectClass : this._searchSubGroup_CentralStateManagerObjectClass,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,
			proteinList_CentralStateManagerObjectClass : this._proteinList_CentralStateManagerObjectClass,
			proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass,
			generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject
		});

		this._proteinViewPage_DisplayData_SingleSearch__SearchSubGroup = new ProteinViewPage_DisplayData_SingleSearch__SearchSubGroup( {

			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager : this._centralPageStateManager,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,
			proteinList_CentralStateManagerObjectClass : this._proteinList_CentralStateManagerObjectClass,
			searchSubGroup_CentralStateManagerObjectClass : this._searchSubGroup_CentralStateManagerObjectClass,
			proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass,
			generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject,

			search_SubGroup_SelectionValues_Changed_Callback : this._search_SubGroup_SelectionValues_Changed_Callback_BindThis
	});

		this._proteinViewPage_Display_MultipleSearches = new ProteinViewPage_Display_MultipleSearches( {

			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			centralPageStateManager : this._centralPageStateManager,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,
			proteinList_CentralStateManagerObjectClass : this._proteinList_CentralStateManagerObjectClass,
			proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass,
			generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject
		});
	}

	/**
	 * 
	 */
	initialize({ projectSearchIds } : { projectSearchIds : Array<number> }) {

		if ( projectSearchIds.length === 1 ) {

			const projectSearchId = projectSearchIds[ 0 ];

			this._proteinViewPage_Display_SingleSearch.initialize({ projectSearchId });

			this._proteinViewPage_DisplayData_SingleSearch__SearchSubGroup.initialize({ projectSearchId });

		} else {

			this._proteinViewPage_Display_MultipleSearches.initialize({ projectSearchIds });
		}
	}

	/**
	 * Called by proteinViewPage_Root to populate the search details block at top of page.
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

		let searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = undefined;

		{
			const searchSubGroups_Root = this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
			if ( searchSubGroups_Root ) {
				const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds()
				if ( projectSearchIds.length === 1 ) {
					//  Only display for 1 search

					const projectSearchId = projectSearchIds[ 0 ]
					const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
					if ( searchSubGroups_ForProjectSearchId ) {

						searchSubGroup_PropValue = searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData({
							searchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry : searchSubGroups_ForProjectSearchId,
							searchSubGroup_CentralStateManagerObjectClass: this._searchSubGroup_CentralStateManagerObjectClass
						});
					}

				}
			}
		}

		const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = {
			displayOnly : false,
			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			filterValuesChanged_Callback : this._search_FilterValues_Changed_Callback_BindThis,
			searchSubGroup_PropValue
		}

		const proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue = new ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue({
			displayOnly : false,
			proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass,
			filterValuesChanged_Callback : this._proteinGroup_SelectionValues_Changed_Callback_BindThis
		})

		const searchSubGroup_SelectionsChanged_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_SelectionsChanged_Callback = () : void => {

			//  TODO  TEMP call this method since it does what needs to be done
			this._proteinGroup_SelectionValues_Changed_Callback( {} );
		}

		let searchSubGroup_ManageGroupNames_Clicked_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_ManageGroupNames_Clicked_Callback = undefined;

		if ( this._dataPages_LoggedInUser_CommonObjectsFactory && this._dataPageStateManager_DataFrom_Server.get_userCanEditSearchSubGroups() ) {

			searchSubGroup_ManageGroupNames_Clicked_Callback = () : void => {

				const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds()
				if ( projectSearchIds.length === 1 ) {
					//  Only display for 1 search

					const projectSearchId = projectSearchIds[ 0 ]
					this._dataPages_LoggedInUser_CommonObjectsFactory.call_searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_DataPageStateManager_ProjectSearchId({ dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server, projectSearchId });
				}
			}
		}

		const jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer = (
			proteinViewPage_MainPageProteinList_createSearchDetailsSection({
				searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
				proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
				searchSubGroup_CentralStateManagerObjectClass : this._searchSubGroup_CentralStateManagerObjectClass,
				searchSubGroup_SelectionsChanged_Callback,
				searchSubGroup_ManageGroupNames_Clicked_Callback
			})
		)

		create_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer({ jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer, containerDOMElement, renderCompleteCallbackFcn : undefined })
	}

	/**
	 * Called when the user updates the search filter cutoffs and the page needs to be re-rendered
	 */
	_search_FilterValues_Changed_Callback( params: SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) {

		//  This is a even more blunt approach.  Appear to have timing issues updating in memory cached data when don't reload the page

		window.location.reload(true ) //  param of true is deprecated, not the method

		// //  This is a blunt approach.  A better approach could be taken that preserves other User Input.
		//
		// this.populateSearchDetailsAndOtherFiltersBlock(); //  Update Filter section with new values
		//
		// window.setTimeout( () => {
		// 	//  Run in settimeout so Update to FilterBlock paints first so user gets immediate visual feedback
		// 	this.populateProteinListBlock(); // Update rest of page with new values
		// }, 10 )
	}

	/**
	 * Called when the user updates the Protein Group selection and the page needs to be re-rendered
	 *
	 * Also called by searchSubGroup_SelectionsChanged_Callback passing in param: {}
	 */
	_search_SubGroup_SelectionValues_Changed_Callback() {

		this._proteinGroup_SelectionValues_Changed_Callback({})
	}

	/**
	 * Called when the user updates the Protein Group selection and the page needs to be re-rendered
	 *
	 * Also called by searchSubGroup_SelectionsChanged_Callback passing in param: {}
	 */
	_proteinGroup_SelectionValues_Changed_Callback( params: ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param ) {

		//  This is a blunt approach.  A better approach could be taken that preserves other User Input.

		this.populateSearchDetailsAndOtherFiltersBlock(); //  Update Filter section with new values

		window.setTimeout( () => {
			try {
				//  Run in settimeout so Update to FilterBlock paints first so user gets immediate visual feedback

				// Update rest of page with new values

				var projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

				if ( projectSearchIds.length === 0 ) {
					throw Error( "_proteinGroup_SelectionValues_Changed_Callback(...): projectSearchIds.length === 0 " );
				}

				if ( projectSearchIds.length === 1 ) {

					if ( this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() ) {

						this._proteinViewPage_DisplayData_SingleSearch__SearchSubGroup.updateFor_ProteinGroup_Change_ProteinListOnPage();
					} else {

						this._proteinViewPage_Display_SingleSearch.updateFor_ProteinGroup_Change_ProteinListOnPage();
					}

				} else {

					this._proteinViewPage_Display_MultipleSearches.updateFor_ProteinGroup_Change_ProteinListOnPage();
				}
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
				throw e;
			}
		}, 10 )
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
	populateProteinListBlock_MultipleSearches({ projectSearchIds }: { projectSearchIds : Array<number> }) {

		this._proteinViewPage_Display_MultipleSearches.attachPSMDownloadClickHandler({ projectSearchIds });
		this._proteinViewPage_Display_MultipleSearches.populateProteinList({ projectSearchIds });
	}

	/**
	 * 
	 */
	populateProteinListBlock_SingleSearch({ projectSearchId }: { projectSearchId: number }) {

		if ( this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() ) {

			this._proteinViewPage_DisplayData_SingleSearch__SearchSubGroup.populateProteinList({ projectSearchId });
		} else {

			this._proteinViewPage_Display_SingleSearch.attachPSMDownloadClickHandler({ projectSearchId });
			this._proteinViewPage_Display_SingleSearch.populateProteinList({ projectSearchId });
		}
	}
	
}