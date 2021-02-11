/**
 * searchDetailsBlockDataMgmtProcessing.ts
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

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import { SearchDataLookupParameters_Root, SearchDataLookupParams_For_Single_ProjectSearchId } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';


interface SearchDetailsBlockDataMgmtProcessing_getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds_Params{
	dataPageStateManager? : DataPageStateManager
}

/**
 * 
 */
export class SearchDetailsBlockDataMgmtProcessing {

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;

	/**
	 * 
	 */
	constructor({ 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
	} :
	{ 
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager, 
	}) {
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
	}

	/////////////////////////////////////////////////////////////////////////////

	/**
	 * Store Search Details (filters, ann types to display) for Webservice Calls, All Project Search Ids
	 * 
	 * @param searchDetails_Filters_AnnTypeDisplay_Root - Parsed from JSON passed in HTML from server on page load
	 * @param dataPageStateManager - optional.  Uses value from constructor if not set
	 */
	storeSearchDetails_Filters_AnnTypeDisplay_Root({ 
		searchDetails_Filters_AnnTypeDisplay_Root, 
		dataPageStateManager 
	} : { 
		searchDetails_Filters_AnnTypeDisplay_Root : SearchDataLookupParameters_Root
		dataPageStateManager : DataPageStateManager 
	}) : void {

		if ( ! dataPageStateManager ) {
			dataPageStateManager = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		}
		
		dataPageStateManager.set_searchDetailsCriteriaData( searchDetails_Filters_AnnTypeDisplay_Root );
	}
	
	/////////////////////////////////////////////////////////////////////////////

	/**
	 * Get Search Details (filters, ann types to display) for Webservice Calls, All Project Search Ids
	 * 
	 * Defaults to dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
	 * 
	 * @param dataPageStateManager - optional.  Uses value from constructor if not set 
	 * @returns searchDetails_Filters_AnnTypeDisplay_Root passed to store... method: which is object Parsed from JSON passed in HTML from server on page load
	 * 				Return value has no type info since is from object Parsed from JSON passed in HTML from server on page load
	 */
	getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds(
		params? : SearchDetailsBlockDataMgmtProcessing_getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds_Params
	) : SearchDataLookupParameters_Root {

		let dataPageStateManager_Local : DataPageStateManager = undefined;
		if ( params && params.dataPageStateManager ) {
			dataPageStateManager_Local = params.dataPageStateManager;
		}
		
		if ( ! dataPageStateManager_Local ) {
			dataPageStateManager_Local = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		}
		
		//  No translation for now
		
		return dataPageStateManager_Local.get_searchDetailsCriteriaData();
	}
	

	/////////////////////////////////////////////////////////////////////////////

	/**
	 * Get Search Details (filters, ann types to display) for Webservice Calls, Single Project Search Id
	 * 
	 * @param dataPageStateManager - optional.  Uses value from constructor if not set 
	 * @returns part of searchDetails_Filters_AnnTypeDisplay_Root passed to store... method: which is object Parsed from JSON passed in HTML from server on page load
	 * 				Return value has no type info since is from object Parsed from JSON passed in HTML from server on page load
	 */
	getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( 
		{ projectSearchId, dataPageStateManager }  : 
		{
			projectSearchId : number,
			dataPageStateManager? : DataPageStateManager // Optional
		}
	) : SearchDataLookupParams_For_Single_ProjectSearchId {

		let dataPageStateManager_Local : DataPageStateManager = dataPageStateManager;
		if ( ! dataPageStateManager_Local ) {
			dataPageStateManager_Local = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		}
		
		let searchDetails_Filters_AnnTypeDisplayRootObject = dataPageStateManager_Local.get_searchDetailsCriteriaData();

		let paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;
		if ( ! paramsForProjectSearchIds ) {
			throw Error("No value for paramsForProjectSearchIds");
		}

		//  filtersAnnTypeDisplayPerProjectSearchIds is array in same order as projectSearchIds
		let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;
		if ( ! filtersAnnTypeDisplayPerProjectSearchIds ) {
			throw Error("No value for filtersAnnTypeDisplayPerProjectSearchIds");
		}
		
		let filtersAnnTypeDisplay_SingleProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId = undefined;
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
//			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();
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
//			this._dataPageStateManager_DataFrom_Server.get_annotationTypeData(); Line Commented Out
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

}

	

