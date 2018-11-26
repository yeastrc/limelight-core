/**
 * modViewPage_FilterCriteriaDataDisplayUserInput.js
 * 
 * Javascript for modView.jsp page - Filter Criteria User Input  
 * 
 * 
 * 
 * 
 * 
 */

//var Handlebars = require('handlebars/runtime');
//
//var _search_detail_section_bundle = 
//	require("../../../../../handlebars_templates_precompiled/search_detail_section_main_page/search_detail_section_main_page_template-bundle.js" );

import { dataPageStateManager_Keys } from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

import { copyObject_DeepCopy_Limelight } from 'page_js/data_pages/data_pages_common/copyObject_DeepCopy.js';

/**
 * 
 */
export class ModViewPage_FilterCriteriaDataDisplayUserInput {

	/**
	 * 
	 */
	constructor(params) {

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = params.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = params.dataPageStateManager_DataFrom_Server;

		this._searchDetailsBlockDataMgmtProcessing = params.searchDetailsBlockDataMgmtProcessing;


		/**
		 * Store state of user filter selections above the "Update" button.  This used used to update 
		 */
		this._dataPageStateManager_For_UserFilterSelectionsBefore_Update_Clicked = new DataPageStateManager();
	}

	/**
	 * 
	 */
	initialize(params) {

		let objectThis = this;

		let $filters_change = $("#filters_change");
		$filters_change.click(function(eventObject) {

			objectThis._openFilterOverlay();
		});

		let $filters_overlay_overlay_X_for_exit_overlay = $("#filters_overlay_overlay_X_for_exit_overlay");
		$filters_overlay_overlay_X_for_exit_overlay.click(function(eventObject) {

			objectThis._cancelFilterOverlay();
		});
	}


	/**
	 * 
	 */
	populateForDefaults() {

		//  Call to set defaults in _dataPageStateManager_For_UserFilterSelectionsBefore_Update_Clicked

		let searchDetailsBlockDataDefaults = this._searchDetailsBlockDataMgmtProcessing.createForDefaults();
		

		this._dataPageStateManager_For_UserFilterSelectionsBefore_Update_Clicked.
		setPageState( dataPageStateManager_Keys.SEARCH_DETAILS_CRITERIA_DATA_DPSM, searchDetailsBlockDataDefaults );

		//  Copy default cutoffs to DataDisplay _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay

		let searchDetailsCriteriaForDefaults = 
			this.
			_dataPageStateManager_For_UserFilterSelectionsBefore_Update_Clicked.
			getPageState( dataPageStateManager_Keys.SEARCH_DETAILS_CRITERIA_DATA_DPSM );

		let searchDetailsCriteriaForDefaultsCopy = copyObject_DeepCopy_Limelight( searchDetailsCriteriaForDefaults );

		this.
		_dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.
		setPageState( dataPageStateManager_Keys.SEARCH_DETAILS_CRITERIA_DATA_DPSM, searchDetailsCriteriaForDefaultsCopy );
	}

	/**
	 * 
	 */
	_openFilterOverlay() {

		let $filters_overlay_modal_dialog_overlay_background = $("#filters_overlay_modal_dialog_overlay_background");
		let $filters_overlay_overlay_div = $("#filters_overlay_overlay_div");
		$filters_overlay_modal_dialog_overlay_background.show();
		$filters_overlay_overlay_div.show();

		_populateFilterOverlay();
	}

	/**
	 * 
	 */
	_cancelFilterOverlay() {

		let $filters_overlay_modal_dialog_overlay_background = $("#filters_overlay_modal_dialog_overlay_background");
		let $filters_overlay_overlay_div = $("#filters_overlay_overlay_div");
		$filters_overlay_modal_dialog_overlay_background.hide();
		$filters_overlay_overlay_div.hide();

	}

	/**
	 * 
	 */
	_populateFilterOverlay() {
		
		alert("In Progress");
	}
}