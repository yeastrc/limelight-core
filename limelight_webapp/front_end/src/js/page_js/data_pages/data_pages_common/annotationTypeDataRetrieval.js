/**
 * annotationTypeDataRetrieval.js
 * 
 * Javascript for retrieving Annotation Type data for project search ids 
 * 
 * Adds property 'sorttype' to each ann type object from Webservice
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

import { _SORT_TYPE_NUMBER, _SORT_TYPE_STRING } from 'page_js/data_pages/data_pages_common/a_annotationTypesConstants.js';

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

/**
 * 
 */
export class AnnotationTypeDataRetrieval {

	/**
	 * 
	 */
	constructor() {
		
		this._projectSearchIds_RetrievingDataFor = {};
	}
	
	/**
	 * return Promise, if anything to load.  Otherwise return null
	 */
	retrieveSearchAnnotationTypeData( { dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, dataPageStateManager_DataFrom_Server } ) {

		let projectSearchIds = // array
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.getPageState( dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM );

		let annotationTypeDataLoaded = 
			dataPageStateManager_DataFrom_Server.getPageStateAllowNotInPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );
		
		let projectSearchIds_dataNotLoadedObj = {};
		
		let found_projectSearchId_ToLoad = false;
		
			//  Some search names loaded so only load 'missing' search names
			
		projectSearchIds.forEach(function( projectSearchIdSingleString, index, array) {
			
			if ( ( ! annotationTypeDataLoaded ) || ( ! annotationTypeDataLoaded[ projectSearchIdSingleString ] ) ) {
				// no data for project search id, so add to loading list (object to drop dups)
				projectSearchIds_dataNotLoadedObj[ projectSearchIdSingleString ] = projectSearchIdSingleString;
				found_projectSearchId_ToLoad = true;
			}
		}, this );

		if ( ! found_projectSearchId_ToLoad ) {
			// nothing new to load so return null
			return null;
		}

		let projectSearchIds_dataNotLoadedArray = Object.keys( projectSearchIds_dataNotLoadedObj );
		
		//  Return created Promise
		return this._retrieveSearchAnnotationTypeDataFromAJAX( 
				projectSearchIds_dataNotLoadedArray, 
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, dataPageStateManager_DataFrom_Server )
	};

	/**
	 * return Promise
	 */
	_retrieveSearchAnnotationTypeDataFromAJAX( 
			projectSearchIds_dataNotLoadedArray, 
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
			dataPageStateManager_DataFrom_Server ) {

		let objectThis = this;

		let retrieval = function( resolve, reject ) {
			try {
				const url = "d/rws/for-page/psb/search-annotation-type-list-from-psi";

				const requestData = { projectSearchIds : projectSearchIds_dataNotLoadedArray };

				const promise_webserviceCallStandardPost = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

				promise_webserviceCallStandardPost.catch( () => { reject() }  );

				promise_webserviceCallStandardPost.then( ({ responseData }) => {
					try {
						objectThis._retrieveSearchAnnotationTypeDataFromAJAXResponse( {
							requestData, responseData, 
							dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
							dataPageStateManager_DataFrom_Server, 
							projectSearchIds_dataNotLoadedArray } );
					
						resolve();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				} );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		};

		return new Promise( retrieval );
	};

	/**
	 * 
	 */
	_retrieveSearchAnnotationTypeDataFromAJAXResponse( {
			requestData, responseData, 
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
			dataPageStateManager_DataFrom_Server, projectSearchIds_dataNotLoadedArray } ) {
		
		let perSearchList = responseData.perSearchList;

		if ( ! perSearchList ) {
			throw Error("Annotation Type List return is empty. projectSearchIds_dataNotLoadedArray: " + projectSearchIds_dataNotLoadedArray.join( '_' ));
		}
		
		let annotationTypeDataLoaded = 
			dataPageStateManager_DataFrom_Server.getPageStateAllowNotInPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

		if ( ! annotationTypeDataLoaded ) {
			annotationTypeDataLoaded = {};
		}
		
		for ( const perSearchItem of perSearchList ) {
			
			//  Convert AnnotationType lists to objects keyed on Annotation Type Id which is then stored in local variable
			
			let annotationTypesAsObjectMap = {};
			
			annotationTypesAsObjectMap.psmFilterableAnnotationTypes = 
				this._convertAnnotationTypeArrayToObjectMapKeyedAnnotationTypeId(
						{ annotationTypeArray : perSearchItem.psmFilterableAnnotationTypes, 
							sorttype : _SORT_TYPE_NUMBER } );
			annotationTypesAsObjectMap.reportedPeptideFilterableAnnotationTypes =
				this._convertAnnotationTypeArrayToObjectMapKeyedAnnotationTypeId( 
						{ annotationTypeArray : perSearchItem.reportedPeptideFilterableAnnotationTypes, 
							sorttype : _SORT_TYPE_NUMBER } );
			annotationTypesAsObjectMap.matchedProteinFilterableAnnotationTypes =
				this._convertAnnotationTypeArrayToObjectMapKeyedAnnotationTypeId( 
						{ annotationTypeArray : perSearchItem.matchedProteinFilterableAnnotationTypes, 
							sorttype : _SORT_TYPE_NUMBER } );
			
			annotationTypesAsObjectMap.psmDescriptiveAnnotationTypes =
				this._convertAnnotationTypeArrayToObjectMapKeyedAnnotationTypeId( 
						{ annotationTypeArray : perSearchItem.psmDescriptiveAnnotationTypes, 
							sorttype : _SORT_TYPE_STRING } );
			annotationTypesAsObjectMap.reportedPeptideDescriptiveAnnotationTypes =
				this._convertAnnotationTypeArrayToObjectMapKeyedAnnotationTypeId( 
						{ annotationTypeArray : perSearchItem.reportedPeptideDescriptiveAnnotationTypes, 
							sorttype : _SORT_TYPE_STRING } );
			annotationTypesAsObjectMap.matchedProteinDescriptiveAnnotationTypes =
				this._convertAnnotationTypeArrayToObjectMapKeyedAnnotationTypeId( 
						{ annotationTypeArray : perSearchItem.matchedProteinDescriptiveAnnotationTypes, 
							sorttype : _SORT_TYPE_STRING } );
						
			//  Put in object, key projectSearchId
			annotationTypeDataLoaded[ perSearchItem.projectSearchId ] = annotationTypesAsObjectMap;
			
			//  remove from 'in progress' object
			delete this._projectSearchIds_RetrievingDataFor[ perSearchItem.projectSearchId ];
			
		}
		
		//  Save Data to state manager
		dataPageStateManager_DataFrom_Server.setPageState( 
				dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM,
				annotationTypeDataLoaded );
	};

	/**
	 * 
	 */
	_convertAnnotationTypeArrayToObjectMapKeyedAnnotationTypeId( { annotationTypeArray, sorttype } ) {

		let annotationTypesObject = {};
		
		for ( const annotationTypeItem of annotationTypeArray ) {
			
			annotationTypeItem.sorttype = sorttype; //  Label as sort as number or string for Filterable or Descriptive
			Object.freeze( annotationTypeItem );    //  Freeze Object, no changes to properties, no add or remove properties
			
			annotationTypesObject[ annotationTypeItem.annotationTypeId ] = annotationTypeItem;
		}
		
		return annotationTypesObject;
	};
};


//  When copied into variables on page, 
//   the lists of  WebserviceResultAnnotationTypeItem are converted into Object Maps (with the same property name), keyed on Annotation Type Id 

//  AnnotationType Data  - Root object key is projectSearchId

//	    	private String projectSearchId;
//	    	private String searchId;
//	    	
//	    	private List<WebserviceResultAnnotationTypeItem> psmFilterableAnnotationTypes;
//	    	private List<WebserviceResultAnnotationTypeItem> reportedPeptideFilterableAnnotationTypes;
//	    	private List<WebserviceResultAnnotationTypeItem> matchedProteinFilterableAnnotationTypes;
//
//	    	private List<WebserviceResultAnnotationTypeItem> psmDescriptiveAnnotationTypes;
//	    	private List<WebserviceResultAnnotationTypeItem> reportedPeptideDescriptiveAnnotationTypes;
//	    	private List<WebserviceResultAnnotationTypeItem> matchedProteinDescriptiveAnnotationTypes;
//	    	
//	WebserviceResultAnnotationTypeItem
//			
//	    	private String annotationTypeId;
//	    	
//	    	private String name;
//
//	    	private boolean defaultVisible;
//	    	private Integer displayOrder;
//
//	    	private String description;
//	    	
//	    	///  Filterable Only
//
//	    	private boolean filterDirectionAbove;
//	    	private boolean filterDirectionBelow;
//
//	    	private boolean defaultFilter;
//	    	private Double defaultFilterValue;
//	    	private String defaultFilterValueString;
//
//	    	private Integer sortOrder;

