
/**
 * updatePageState_URL_With_NewFilterCutoffs_FromUser.ts
 * 
 * Javascript:  Update Page State and URL with new Filter Cutoffs From User
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';
import { newURL_Build_PerProjectSearchIds_Or_ExperimentId }  from './newURL_Build_PerProjectSearchIds_Or_ExperimentId';


import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { limelight__IsVariableAString } from 'page_js/common_all_pages/limelight__IsVariableAString';
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {updatePageState_URL_With_New_SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages_common/updatePageState_URL_With_New_SearchDataLookupParameters_Root";

/**
 * 
 */
export class UpdatePageState_URL_With_NewFilterCutoffs_FromUser {

	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

	/**
	 * 
	 */
	constructor( { searchDetailsBlockDataMgmtProcessing } : { searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing } ) {
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
	}
	
	/**
	 * 
	 */
	updatePageState_URL_With_NewFilterCutoffs_FromUser( { searchDetails_Filters_AnnTypeDisplay_Root } : { searchDetails_Filters_AnnTypeDisplay_Root :  SearchDataLookupParameters_Root } ) {

		// Update JS variables with new filter cutoffs
		this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root({
			searchDetails_Filters_AnnTypeDisplay_Root : searchDetails_Filters_AnnTypeDisplay_Root, dataPageStateManager : undefined
		} );

		let updatePromise = updatePageState_URL_With_New_SearchDataLookupParameters_Root({ searchDetails_Filters_AnnTypeDisplay_Root })
		return updatePromise;
	}
}
