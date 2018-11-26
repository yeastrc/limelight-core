/**
 * dataPageStateManager_Keys.js
 * 
 * Javascript:  Keys to use with DataPageStateManager
 * 
 * page variable: dataPageStateManager_Keys
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

/**
 * 
 */

var dataPageStateManager_Keys = {
		
		//  All end in '_DPSM' to identify as part of this.
		
		//  YES encoded in URL
		
		SEARCH_CUTOFFS_DPSM : "searchCutoffs", // { searchCutoffs : >cutoffs object from  }

		//  NO encoded in URL
		
		PROJECT_SEARCH_IDS_DPSM : "projectSearchIds", // [ <projectSearchId>, ... ]  In the order they are on the URL, specifying the order to display them
		PROJECT_SEARCH_IDS_SEARCH_IDS_MAPPING_DPSM : "projectSearchIdsSearchIdsMapping", // { <projectSearchId> : <searchId>, ... }
		
		SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM : "searchNames", // { <projectSearchId> : 'search name', ... }
		ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM : "annotationTypeData", // { <projectSearchId> : { <ann type data> } ... }
		SEARCH_PROGRAMS_PER_SEARCH_DATA_KEY_PROJECT_SEARCH_ID_DPSM : "searchProgramsPerSearchData", // { <projectSearchId> : { <search programs per search data> } ... }

		SEARCH_DETAILS_CRITERIA_DATA_DPSM : "searchDetailsCriteriaData", // { <cutoffs data, managed by class SearchDetailsBlockDataMgmtProcessing> }

};


export { dataPageStateManager_Keys }
