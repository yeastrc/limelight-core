/**
 * searchDetailsBlockDataMgmtProcessing.js
 * 
 * Javascript:  Manage the Search Details Block Data
 * 
 * Currently, Cutoffs and Annotation Types to display
 * 
 */

//////////////////////////////////
//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';


/**
 * 
 */
export class SearchDetailsBlockDataMgmtProcessing {

	/**
	 * 
	 */
	constructor( params ) {
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = params.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = params.dataPageStateManager_DataFrom_Server;
	}

	/////////////////////////////////////////////////////////////////////////////

	/**
	 * Store Search Details (filters, ann types to display) for Webservice Calls, All Project Search Ids
	 * 
	 * Defaults to dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
	 */
	storeSearchDetails_Filters_AnnTypeDisplay_Root( { searchDetails_Filters_AnnTypeDisplay_Root, dataPageStateManager } ) {

		if ( ! dataPageStateManager ) {
			dataPageStateManager = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		}
		
		dataPageStateManager.setPageState( 
				dataPageStateManager_Keys.SEARCH_DETAILS_CRITERIA_DATA_DPSM, searchDetails_Filters_AnnTypeDisplay_Root );
	}
	
	/////////////////////////////////////////////////////////////////////////////

	/**
	 * Get Search Details (filters, ann types to display) for Webservice Calls, All Project Search Ids
	 * 
	 * Defaults to dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
	 */
	getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds( params ) {

		let dataPageStateManager = undefined;
		if ( params ) {
			dataPageStateManager = params.dataPageStateManager;
		}
		
		if ( ! dataPageStateManager ) {
			dataPageStateManager = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		}
		
		//  No translation for now
		
		return dataPageStateManager.getPageState( dataPageStateManager_Keys.SEARCH_DETAILS_CRITERIA_DATA_DPSM );
	}
	

	/////////////////////////////////////////////////////////////////////////////

	/**
	 * Get Search Details (filters, ann types to display) for Webservice Calls, Single Project Search Id
	 * 
	 * Defaults to dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
	 */
	getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager } ) {

		if ( ! dataPageStateManager ) {
			dataPageStateManager = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		}
		
		let searchDetails_Filters_AnnTypeDisplayRootObject = dataPageStateManager.getPageState( dataPageStateManager_Keys.SEARCH_DETAILS_CRITERIA_DATA_DPSM );

		let paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;
		if ( ! paramsForProjectSearchIds ) {
			throw Error("No value for paramsForProjectSearchIds");
		}

		//  filtersAnnTypeDisplayPerProjectSearchIds is array in same order as projectSearchIds
		let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;
		if ( ! filtersAnnTypeDisplayPerProjectSearchIds ) {
			throw Error("No value for filtersAnnTypeDisplayPerProjectSearchIds");
		}
		
		let filtersAnnTypeDisplay_SingleProjectSearchId = undefined;
		filtersAnnTypeDisplayPerProjectSearchIds.forEach(function( filtersAnnTypeDisplayPerProjectSearchIdsItem, index, array) {
			if ( filtersAnnTypeDisplayPerProjectSearchIdsItem.projectSearchId === projectSearchId ) {
				filtersAnnTypeDisplay_SingleProjectSearchId = filtersAnnTypeDisplayPerProjectSearchIdsItem;
				return false;
			}
		}, this );
		
		if ( ! filtersAnnTypeDisplay_SingleProjectSearchId ) {
			throw Error( "getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId: No Entry for projectSearchId: " + projectSearchId );
		}
		

		//  No translation for now
		
		return filtersAnnTypeDisplay_SingleProjectSearchId;
	}
	
	/////////////////////////////////////////////////////////////////////////////
	
	/////     Create for Defaults
	
	//        This may be useful for adding a search

//	/**
//	 * Create for Defaults.
//	 * 
//	 * Must be the format as code that updates the Project Search Info for Criteria and Ann Types Displayed from User and from page URL
//	 */
//	createForDefaults() {
//
//		var projectSearchIds = // array
//			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.getPageState( dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM );
//
//		var filtersAnnTypeDisplayPerProjectSearchIds = {};
//		
//		projectSearchIds.forEach(function( projectSearchIdSingleString, index, array) {
//			
//			if ( ! filtersAnnTypeDisplayPerProjectSearchIds[ projectSearchIdSingleString ] ) {
//				var filtersAnnTypeDisplayEntry = this.createForDefaultsForProjectSearchId( projectSearchIdSingleString );
//
//				filtersAnnTypeDisplayPerProjectSearchIds[ projectSearchIdSingleString ] = filtersAnnTypeDisplayEntry;
//			}
//		}, this );
//
//		var searchDetails_Filters_AnnTypeDisplayRootObject = { filtersAnnTypeDisplayPerProjectSearchIds : filtersAnnTypeDisplayPerProjectSearchIds };
//		
//		return searchDetails_Filters_AnnTypeDisplayRootObject;
//	};
//	
//	/**
//	 * Create for Defaults for single Project Search Id
//	 * 
//	 * Must be the format as code that updates the Project Search Info for Criteria and Ann Types Displayed from User and from page URL
//	 */
//	createForDefaultsForProjectSearchId( projectSearchIdSingleString ) {
//
//		var annotationTypeData = 
//			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );
//
//		if ( ! annotationTypeData ) {
//			throw Error("No annotation type data loaded" );
//		}
//		
//		//  Process the Annotation Types to populate the cutoffs for defaults
//
//		var annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchIdSingleString ];
//
//		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
//			throw Error("No annotation type data for projectSearchIdSingleString: " + projectSearchIdSingleString );
//		}
//
//		var searchDetails_Filters_AnnTypeDisplayDefaults = { projectSearchId : projectSearchIdSingleString };
//
//		searchDetails_Filters_AnnTypeDisplayDefaults.psmFilters = this._getDefaultsFiltersForType( annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes );
//		searchDetails_Filters_AnnTypeDisplayDefaults.reportedPeptideFilters = this._getDefaultsFiltersForType( annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes );
//		searchDetails_Filters_AnnTypeDisplayDefaults.matchedProteinFilters = this._getDefaultsFiltersForType( annotationTypeDataForProjectSearchId.matchedProteinFilterableAnnotationTypes );
//
//		searchDetails_Filters_AnnTypeDisplayDefaults.psmAnnTypeDisplay = this._getDefaultsAnnTypeDisplayForType( annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes );
//		searchDetails_Filters_AnnTypeDisplayDefaults.reportedPeptideAnnTypeDisplay = this._getDefaultsAnnTypeDisplayForType( annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes );
//		searchDetails_Filters_AnnTypeDisplayDefaults.matchedProteinAnnTypeDisplay = this._getDefaultsAnnTypeDisplayForType( annotationTypeDataForProjectSearchId.matchedProteinFilterableAnnotationTypes );
//
//		return searchDetails_Filters_AnnTypeDisplayDefaults;
//	};
//	
//	/**
//	 * 
//	 */
//	_getDefaultsFiltersForType( param_FilterableAnnotationTypes ) {
//
//		if ( ! param_FilterableAnnotationTypes ) {
//			return {};
//		}
//			
//		var searchDetails_Filters_Defaults = {};
//
//		Object.keys( param_FilterableAnnotationTypes ).forEach(function( param_FilterableAnnotationTypeItemKey, indexPSM, arrayPSM) {
//
//			var param_FilterableAnnotationTypeItem = param_FilterableAnnotationTypes[ param_FilterableAnnotationTypeItemKey ];
//
//			if ( param_FilterableAnnotationTypeItem.defaultFilter && 
//					param_FilterableAnnotationTypeItem.defaultFilterValueString &&
//					param_FilterableAnnotationTypeItem.defaultFilterValueString !== "" ) {
//
//				var searchDetails_Filters_AnnTypeDisplayItem = {
//						annotationTypeId : param_FilterableAnnotationTypeItem.annotationTypeId,
//						value : param_FilterableAnnotationTypeItem.defaultFilterValueString
//				};
//				searchDetails_Filters_Defaults[ param_FilterableAnnotationTypeItem.annotationTypeId ] = searchDetails_Filters_AnnTypeDisplayItem;
//			}
//		}, this );
//
//		return searchDetails_Filters_Defaults;
//	};
//
//	/**
//	 * 
//	 */
//	_getDefaultsAnnTypeDisplayForType( param_FilterableAnnotationTypes ) {
//
//		if ( ! param_FilterableAnnotationTypes ) {
//			return [];
//		}
//		
//		var searchDetails_AnnTypeDisplayDefaultDisplayItems = [];
//		
//		Object.keys( param_FilterableAnnotationTypes ).forEach(function( param_FilterableAnnotationTypeItemKey, indexPSM, arrayPSM) {
//
//			var param_FilterableAnnotationTypeItem = param_FilterableAnnotationTypes[ param_FilterableAnnotationTypeItemKey ];
//
//			if ( param_FilterableAnnotationTypeItem.defaultVisible ) {
//				// Is Default Visible so add to array
//				searchDetails_AnnTypeDisplayDefaultDisplayItems.push( param_FilterableAnnotationTypeItem );
//			}
//		}, this );
//
//		
//		//  Sort array 
//		
//		searchDetails_AnnTypeDisplayDefaultDisplayItems.sort( function( a, b ) {
//			if ( ( a.displayOrder === undefined || a.displayOrder === null ) && ( b.displayOrder === undefined || b.displayOrder === null ) ) {
//				return a.name.localeCompare( b.name );
//			}
//			if ( a.displayOrder === undefined || a.displayOrder === null ) {
//				return 1;  // sort a after b 
//			}
//			if ( b.displayOrder === undefined || b.displayOrder === null ) {
//				return -1;  // sort a before b 
//			}
//			return a.displayOrder - b.displayOrder;
//		})
//		
//		//  Create final array of annotation type ids
//		
//		let searchDetails_AnnTypeDisplayDefaultDisplayFinal = [];
//		
//		searchDetails_AnnTypeDisplayDefaultDisplayItems.forEach(function( item, i, array ) {
//			searchDetails_AnnTypeDisplayDefaultDisplayFinal.push( item.annotationTypeId );
//		}, this );
//		
//		return searchDetails_AnnTypeDisplayDefaultDisplayFinal;
//	};

};

	

