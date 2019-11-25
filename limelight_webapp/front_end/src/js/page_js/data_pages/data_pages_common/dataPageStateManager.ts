/**
 * dataPageStateManager.ts
 * 
 * Javascript:  A simple "State Manager" where all page state will be stored.
 * 
 * page variable: dataPageStateManagerFactory - Create DataPageStateManager object and return it
 * 
 */



 //   !!!!!!!!!!!    This File needs a lot of work for FULL Conversion to Typescript

 //          All properties in the sub class and setters and getters should be typed.



//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import { AnnotationTypeData_ReturnSpecifiedTypes } from './annotationTypeData_ReturnSpecifiedTypes';

//  Class Exported at bottom

/**
 * 
 */
class DataPageStateManager {

	// private _pageState;

	private _PrivateProperties_MayChangeWithoutNotice : PageState_InternalData_Properties;

	private _AnnotationTypeData_ReturnSpecifiedTypes : AnnotationTypeData_ReturnSpecifiedTypes;

	/**
	 * 
	 */
	constructor() {
		this._PrivateProperties_MayChangeWithoutNotice = new PageState_InternalData_Properties();

		this._AnnotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes({ dataPageStateManager_DataFrom_Server : this });
	}

	get_util_AnnotationTypeData_ReturnSpecifiedTypes() : AnnotationTypeData_ReturnSpecifiedTypes {
		return this._AnnotationTypeData_ReturnSpecifiedTypes;
	}
	
	/**
	 * @returns [ <projectSearchId>, ... ]  In the order they are on the URL, specifying the order to display them
	 */
	get_projectSearchIds() : Array<number>  {
		return this._PrivateProperties_MayChangeWithoutNotice._projectSearchIds;
	}
	/**
	 * @param [ <projectSearchId>, ... ]  In the order they are on the URL, specifying the order to display them
	 */
	set_projectSearchIds( _projectSearchIds : Array<number> ) {
		this._PrivateProperties_MayChangeWithoutNotice._projectSearchIds = _projectSearchIds;
	}
	
		//  Not currently set or used.  !!!  MUST set before can use
	// /**
	//  * @returns { <projectSearchId> : <searchId>, ... }
	//  */
	// get_projectSearchIdsSearchIdsMapping() {
	// 	return this._PrivateProperties_MayChangeWithoutNotice._projectSearchIdsSearchIdsMapping;
	// }
	// /**
	//  * @param { <projectSearchId> : <searchId>, ... }
	//  */
	// set_projectSearchIdsSearchIdsMapping( _projectSearchIdsSearchIdsMapping ) {
	// 	this._PrivateProperties_MayChangeWithoutNotice._projectSearchIdsSearchIdsMapping = _projectSearchIdsSearchIdsMapping;
	// }

	/**
	 * @returns { <projectSearchId> : 'search name', ... }
	 */
	get_searchNames() {
		return this._PrivateProperties_MayChangeWithoutNotice._searchNames;
	}
	/**
	 * @param { <projectSearchId> : 'search name', ... }
	 */
	set_searchNames( _searchNames ) {
		this._PrivateProperties_MayChangeWithoutNotice._searchNames = _searchNames;
	}

	/**
	 * @returns { <projectSearchId> : { <ann type data> } ... }
	 */
	get_annotationTypeData() {
		return this._PrivateProperties_MayChangeWithoutNotice._annotationTypeData;
	}
	/**
	 * @param { <projectSearchId> : { <ann type data> } ... }
	 */
	set_annotationTypeData( _annotationTypeData ) {
		this._PrivateProperties_MayChangeWithoutNotice._annotationTypeData = _annotationTypeData;
	}

	/**
	 * @returns { <projectSearchId> : { <search programs per search data> } ... }
	 */
	get_searchProgramsPerSearchData() {
		return this._PrivateProperties_MayChangeWithoutNotice._searchProgramsPerSearchData;
	}
	/**
	 * @param { <projectSearchId> : { <search programs per search data> } ... }
	 */
	set_searchProgramsPerSearchData( _searchProgramsPerSearchData ) {
		this._PrivateProperties_MayChangeWithoutNotice._searchProgramsPerSearchData = _searchProgramsPerSearchData;
	}

	/**
	 * @returns { <cutoffs data, managed by class SearchDetailsBlockDataMgmtProcessing> }
	 */
	get_searchDetailsCriteriaData() {
		return this._PrivateProperties_MayChangeWithoutNotice._searchDetailsCriteriaData;
	}
	/**
	 * @param { <cutoffs data, managed by class SearchDetailsBlockDataMgmtProcessing> }
	 */
	set_searchDetailsCriteriaData( _searchDetailsCriteriaData ) {
		this._PrivateProperties_MayChangeWithoutNotice._searchDetailsCriteriaData = _searchDetailsCriteriaData;
	}

}

/**
 * 
 */
class PageState_InternalData_Properties {

	_projectSearchIds : Array<number>; // [ <projectSearchId>, ... ]  In the order they are on the URL, specifying the order to display them

	//  Not currently set or used    !!!  MUST set before can use
	// _projectSearchIdsSearchIdsMapping; // { <projectSearchId> : <searchId>, ... }

	_searchNames; // { <projectSearchId> : 'search name', ... }
				// Object
				// 	264:  object key projectSearchId
				// 			name: "Add Rep Pept Desc Ann To Default Visible: Has Scan Filename on PSMs - 1_PSM_1_Peptide_Default_Cutoffs_NoProteinAnnotations Very Small Extracted entries from Pipeline Sample - limelightXML_Limited_With_1_PSM_1_Peptide_Default_Cutoffs_NoProteinAnnotations.xml"
				// 			projectSearchId: 264
				// 			searchId: 222

	_annotationTypeData; // { <projectSearchId> : { <ann type data> } ... }
				//  Object  Objects all the way down

	_searchProgramsPerSearchData : object; // { <projectSearchId> : { <search programs per search data> } ... }
				// Object
				// 	264:  object Key projectSearchId
				// 		Object
				// 			437:  object key searchProgramsPerSearchId
				// 				description: null
				// 				displayName: "kojak"
				// 				name: "kojak"
				// 				searchId: 222
				// 				searchProgramsPerSearchId: 437
				// 				version: "1.4.3"

	_searchDetailsCriteriaData; // { <cutoffs data, managed by class SearchDetailsBlockDataMgmtProcessing> }

	/**
	 * 
	 */
	constructor() {
		
	}

}



export { DataPageStateManager }
