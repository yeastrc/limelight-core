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
import {DataPages_LoggedInUser_CommonObjectsFactory} from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {SearchDetailsBlockDataMgmtProcessing} from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import {CentralPageStateManager} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';
import {create_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/js/searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_AddToDOM";
import {modViewPage_DisplayDataOnPage_createSearchDetailsSection} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DisplayDataOnPage_createSearchDetailsSection";
import {SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";
import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {
	SearchDataLookupParameters_Root,
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
	CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

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
	private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

	private _modViewDataManager : ModViewDataManager;
	private _vizOptionsData : ModView_VizOptionsData;

	/**
	 * 
	 */
	constructor({ 
		dataPages_LoggedInUser_CommonObjectsFactory, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing,
		centralPageStateManager,
		commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
	 } : { 
		dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory, 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager,
		dataPageStateManager_DataFrom_Server : DataPageStateManager, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing,
		centralPageStateManager : CentralPageStateManager
		commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
	 }) {

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		this._centralPageStateManager = centralPageStateManager;
		this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
	}

	/**
	 *  !!!!   ONLY initialize Page State Variables in this method.
	 *
	 *  !!!!   DO NOT update (make changes that will be saved to the URL) Page State Variables in this method.  Do that in the method "initialUpdatesToPageState
	 */
	async initialize() : Promise<void> {

		const searchDataLookupParamsRoot : SearchDataLookupParameters_Root =
			this._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

		this._modViewDataManager = new ModViewDataManager(searchDataLookupParamsRoot);

		this._vizOptionsData = { data: { } };
		this._vizOptionsData.data.selectedStateObject = { data: { } };
		const stateManagementObject = new ModMultiSearch_DataVizPageStateManager( { centralPageStateManager : this._centralPageStateManager, vizOptionsData: this._vizOptionsData } );
		this._vizOptionsData.stateManagementObject = stateManagementObject;

		stateManagementObject.initialize();	// load in values from the URL

		await this._purge_FiltersOptions_InURL_Example_ProteinPositionEntries_AsNeeded()
	}

	/**
	 *
	 */
	private _purge_FiltersOptions_InURL_Example_ProteinPositionEntries_AsNeeded(): Promise<void> {

		if ( ( ( ! this._vizOptionsData.data )
			|| ( ! this._vizOptionsData.data.proteinPositionFilter )
			|| ( ! ( this._vizOptionsData.data.proteinPositionFilter.getProteinRanges() ) )
			|| ( ! ( this._vizOptionsData.data.proteinPositionFilter.getProteinRanges().length > 0 ) ) ) ) {

			//  NO Protein Ranges Filters so exit

			return Promise.resolve() // EARLY RETURN
		}

		const proteinSequenceVersionId_All_Set :  Set<number> = new Set();

		// Load Data

		const promises: Array<Promise<void>> = []

		const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		for ( const projectSearchId of projectSearchIds ) {

			const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
			if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
				throw Error( "_purge_FiltersOptions_InURL_Example_ProteinPositionEntries_AsNeeded: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId );
			}

			const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
				commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();
			if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {

				for ( const proteinSequenceVersionId of get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIdsUnique() ) {
					proteinSequenceVersionId_All_Set.add( proteinSequenceVersionId );
				}

			} else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {

				const promise = new Promise<void>((resolve, reject) => { try {
					get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => { reject(reason) })
					get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then( promise_value => { try {

						for ( const proteinSequenceVersionId of promise_value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIdsUnique() ) {
							proteinSequenceVersionId_All_Set.add( proteinSequenceVersionId );
						}
						resolve()

					} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

				} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

				promises.push( promise )

			} else {
				throw Error("")
			}
		}

		if ( promises.length === 0 ) {

			this._purge_FiltersOptions_InURL_Example_ProteinPositionEntries_AsNeeded__AfterLoadData({ proteinSequenceVersionId_All_Set })
			return Promise.resolve() // EARLY RETURN
		}

		const promisesAll = Promise.all( promises )

		return new Promise<void>((resolve, reject) => { try {
			promisesAll.catch( reason => { reject(reason) })
			promisesAll.then(value => { try {
				this._purge_FiltersOptions_InURL_Example_ProteinPositionEntries_AsNeeded__AfterLoadData({ proteinSequenceVersionId_All_Set })
				resolve()
			} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
		} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
	}

	/**
	 *
	 */
	private _purge_FiltersOptions_InURL_Example_ProteinPositionEntries_AsNeeded__AfterLoadData(
		{
			proteinSequenceVersionId_All_Set
		} : {
			proteinSequenceVersionId_All_Set :  Set<number>
		}
	): void {

		const existingFilterEntries = Array.from( this._vizOptionsData.data.proteinPositionFilter.getProteinRanges() )

		for ( const existingFilterEntry of existingFilterEntries ) {

			if ( ! proteinSequenceVersionId_All_Set.has( existingFilterEntry.proteinId ) ) {
				this._vizOptionsData.data.proteinPositionFilter.deleteProteinRange({ proteinId: existingFilterEntry.proteinId, start: existingFilterEntry.start, end: existingFilterEntry.end })
			}
		}

		// update hash in URL to reflect user customization state
		this._vizOptionsData.stateManagementObject.updateState();

	}

	/**
	 * !!!  ONLY do initial update Page State variables here
	 */
	initialUpdates_To_PageStateVariables() {

		const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		if(this._vizOptionsData.data.projectSearchIds === undefined) {
			this._vizOptionsData.data.projectSearchIds = [...projectSearchIds];	// ordered list of project ids to show is considered a viz option
		} else {
			//  remove entries in vizOptionsData.data.projectSearchIds that are not in projectSearchIds.  also remove from vizOptionsData.data.selectedStateObject.data
			const new_vizOptionsData_projectSearchIds_Entries = [];
			for ( const vizOptionsData_projectSearchId of this._vizOptionsData.data.projectSearchIds ) {
				if ( projectSearchIds.includes( vizOptionsData_projectSearchId ) ) {
					new_vizOptionsData_projectSearchIds_Entries.push( vizOptionsData_projectSearchId );
				} else {
					if ( this._vizOptionsData.data.selectedStateObject ) {
						delete this._vizOptionsData.data.selectedStateObject.data[ vizOptionsData_projectSearchId ];
					}
				}
			}
			//  add entries in projectSearchIds that are not in vizOptionsData.data.projectSearchIds to the end of vizOptionsData.data.projectSearchIds
			for ( const projectSearchId of projectSearchIds ) {
				if ( ! new_vizOptionsData_projectSearchIds_Entries.includes( projectSearchId ) ) {
					new_vizOptionsData_projectSearchIds_Entries.push( projectSearchId );
				}
			}
			this._vizOptionsData.data.projectSearchIds = new_vizOptionsData_projectSearchIds_Entries;
		}

	}
	
	/**
	 * Called by modViewPage_Root to populate the search details block at top of page.
	 *
	 * Named populateSearchDetailsAndOtherFiltersBlock for consistency with other pages that have other filters in same block
	 * 
	 */
	populateSearchDetailsAndOtherFilters_And_Save_Set_Buttons_Underneath_Block() {

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
			searchSubGroup_PropValue : undefined,
			limelight_Colors_For_MultipleSearches: undefined
		})

		const jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer = (
			modViewPage_DisplayDataOnPage_createSearchDetailsSection({
				component_Props: {
					projectSearchIds: this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds(),
					searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
					dataPages_LoggedInUser_CommonObjectsFactory: this._dataPages_LoggedInUser_CommonObjectsFactory
				}
			})
		)

		create_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer({ jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer, containerDOMElement, renderCompleteCallbackFcn : undefined })
	}


	/**
	 * Called when the user updates the filter cutoffs and the page needs to be re-rendered
	 */
	_filterValuesChanged_Callback( params: SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) {

		console.warn("filterValuesChanged_Callback called: params: ", params )

		// throw Error("filterValuesChanged_Callback callback not handled")

		limelight__ReloadPage_Function()  // TODO
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

		this.renderModDataPage();
	}

	/**
	 * Render the page.
	 *
	 */
	private async renderModDataPage() {

		//  !!!  DO NOT  initialize any Page State variables here or later in the code.

		//  !!!   ALL Page state variables MUST be initialized in the 'initialize' method of this class or sooner


		//  Remove initial loading message in JSP from DOM
		$("#mod_list_loading_data_container").remove()


		let projectSearchIds = // array
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		// add the options section to the page using these viz options  -  IDE warning message: Promise returned from showOptionsOnPage is ignored
		ModViewDataVizRendererOptionsHandler.showOptionsOnPage({
			vizOptionsData : this._vizOptionsData,
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
			modViewDataManager: this._modViewDataManager,
			allProjectSearchIds: projectSearchIds,
			commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
		});

		// add the viz to the page using these viz options
		ModViewDataVizRenderer_MultiSearch.renderDataViz({
			vizOptionsData : this._vizOptionsData,
			dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
			modViewDataManager: this._modViewDataManager
		});

	}

}