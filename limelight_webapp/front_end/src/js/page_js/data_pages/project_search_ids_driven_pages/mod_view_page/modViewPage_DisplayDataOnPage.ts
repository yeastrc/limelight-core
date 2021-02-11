/**
 * modViewPage_DisplayDataOnPage.ts
 * 
 * Javascript for modView.jsp page - Displaying Main Data  
 * 
 */

"use strict";


import {ModViewDataVizRenderer_MultiSearch} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch';
import {ModViewDataVizRendererOptionsHandler} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizOptionsManager';
import {ModMultiSearch_DataVizPageStateManager} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMultiSearchDataViz_StateManager';
import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
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
import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {
	SearchDataLookupParameters_Root,
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";

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
			do_NOT_Display_ChangeSearches_Link : false,
			do_NOT_Display_Re_Order_Searches_Link : false,
			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			filterValuesChanged_Callback : this._filterValuesChanged_Callback_BindThis,
			searchSubGroup_PropValue : undefined
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

		let projectSearchIds = // array
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		const searchDataLookupParamsRoot : SearchDataLookupParameters_Root =
			this._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

		let searchDetailsBlockDataMgmtProcessing = this._searchDetailsBlockDataMgmtProcessing;

		const modViewDataManager = new ModViewDataManager(searchDataLookupParamsRoot);
		this.renderModDataPage( { projectSearchIds, modViewDataManager } );
	}

	/**
	 * Render the page.
	 * 
	 * @param {*} param0 
	 */
	renderModDataPage( { 
		projectSearchIds,
		modViewDataManager
	} : { 
		projectSearchIds : Array<number>
		modViewDataManager : ModViewDataManager
	} ) {

		this.renderModDataPageMultiSearch({ projectSearchIds, modViewDataManager } );
	}

	renderModDataPageMultiSearch({ 
		projectSearchIds,
		modViewDataManager
	} : { 
		projectSearchIds : Array<number>
		modViewDataManager : ModViewDataManager
	} ) {

		let vizOptionsData : ModView_VizOptionsData = { data: { } };
		vizOptionsData.data.selectedStateObject = { data: { } };
		const stateManagementObject = new ModMultiSearch_DataVizPageStateManager( { centralPageStateManager : this._centralPageStateManager, vizOptionsData } );
		vizOptionsData.stateManagementObject = stateManagementObject;

		stateManagementObject.initialize();	// load in values from the URL

		if(vizOptionsData.data.projectSearchIds === undefined) {
			vizOptionsData.data.projectSearchIds = [...projectSearchIds];	// ordered list of project ids to show is considered a viz option
        } else {
            //  remove entries in vizOptionsData.data.projectSearchIds that are not in projectSearchIds.  also remove from vizOptionsData.data.selectedStateObject.data
            const new_vizOptionsData_projectSearchIds_Entries = [];
            for ( const vizOptionsData_projectSearchId of vizOptionsData.data.projectSearchIds ) {
                if ( projectSearchIds.includes( vizOptionsData_projectSearchId ) ) {
                    new_vizOptionsData_projectSearchIds_Entries.push( vizOptionsData_projectSearchId );
                } else {
                	if ( vizOptionsData.data.selectedStateObject ) {
						delete vizOptionsData.data.selectedStateObject.data[ vizOptionsData_projectSearchId ];
					}
				}
            }
            //  add entries in projectSearchIds that are not in vizOptionsData.data.projectSearchIds to the end of vizOptionsData.data.projectSearchIds
            for ( const projectSearchId of projectSearchIds ) {
                if ( ! new_vizOptionsData_projectSearchIds_Entries.includes( projectSearchId ) ) {
                    new_vizOptionsData_projectSearchIds_Entries.push( projectSearchId );
                }
            }
            vizOptionsData.data.projectSearchIds = new_vizOptionsData_projectSearchIds_Entries;
        }

		// add the options section to the page using these viz options  -  IDE warning message: Promise returned from showOptionsOnPage is ignored
		ModViewDataVizRendererOptionsHandler.showOptionsOnPage({
			vizOptionsData,
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
			modViewDataManager,
			allProjectSearchIds:projectSearchIds
		});

		// add the viz to the page using these viz options
		ModViewDataVizRenderer_MultiSearch.renderDataViz({
			vizOptionsData,
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
			modViewDataManager
		});
	}

}