/**
 * annotationTypeDataRetrieval.ts
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


import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { AnnotationTypeItems_PerProjectSearchId, AnnotationTypeData_Root, AnnotationTypeItem, DataPageStateManager } from './dataPageStateManager';
import { limelight__variable_is_type_number_Check } from 'page_js/common_all_pages/limelight__variable_is_type_number_Check';

/**
 * 
 */
export class AnnotationTypeDataRetrieval {

	/**
	 *
	 */
	constructor() {

	}

	/**
	 * return Promise, if anything to load.  Otherwise return null
	 */
	retrieveSearchAnnotationTypeData( {

		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server
	} :  {

		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
		dataPageStateManager_DataFrom_Server : DataPageStateManager
	} ) : Promise<unknown> {

		// array
		let projectSearchIds = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		let projectSearchIds_dataNotLoadedArray = projectSearchIds; // Start with loading data for all projectSearchIds

		let annotationTypeDataLoaded = dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		if ( annotationTypeDataLoaded ) {

			let projectSearchIds_dataNotLoaded_Set : Set<number> = new Set();

				//  Some search names loaded so only load 'missing' search names

			for ( const projectSearchId of projectSearchIds ) {

				if ( ! annotationTypeDataLoaded.annotationTypeItems_PerProjectSearchId_Map.has( projectSearchId ) ) {
					// no data for project search id, so add to loading list (object to drop dups)
					projectSearchIds_dataNotLoaded_Set.add( projectSearchId );
				}
			}

			if ( projectSearchIds_dataNotLoaded_Set.size === 0 ) {
				// nothing new to load so return null

				return null;  // EARLY RETURN
			}

			projectSearchIds_dataNotLoadedArray = Array.from( projectSearchIds_dataNotLoaded_Set );
		}

		//  Return created Promise
		return this._retrieveSearchAnnotationTypeDataFromAJAX(
			projectSearchIds_dataNotLoadedArray,
			dataPageStateManager_DataFrom_Server
		);
}

	/**
	 * return Promise
	 */
	_retrieveSearchAnnotationTypeDataFromAJAX(

		projectSearchIds_dataNotLoadedArray : Array<number>,
		dataPageStateManager_DataFrom_Server  : DataPageStateManager
	) {

		let objectThis = this;

		let retrieval = function( resolve: any, reject: any ) {
			try {
				const url = "d/rws/for-page/psb/search-annotation-type-list-from-psi";

				const requestData = { projectSearchIds : projectSearchIds_dataNotLoadedArray };

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: true }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( () => { reject() }  );

				promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
					try {
						objectThis._retrieveSearchAnnotationTypeDataFromAJAXResponse( {
							requestData, responseData,
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
	}

	/**
	 *
	 */
	_retrieveSearchAnnotationTypeDataFromAJAXResponse( {

		requestData,
		responseData,
		dataPageStateManager_DataFrom_Server,
		projectSearchIds_dataNotLoadedArray
	} : {
		requestData: any,
		responseData: any,
		dataPageStateManager_DataFrom_Server : DataPageStateManager,
		projectSearchIds_dataNotLoadedArray : Array<number>
	} ) {

		//  Create and store data in format V2 Map Based format
		this._retrieveSearchAnnotationTypeDataFromAJAXResponse_V2_StoreDataIn_Map_BasedDataStructure( {
			requestData,
			responseData,
			dataPageStateManager_DataFrom_Server,
			projectSearchIds_dataNotLoadedArray
		} );

		//  Create and store data in format V1 Object Based format
		// this._retrieveSearchAnnotationTypeDataFromAJAXResponse_V1_StoreDataIn_Object_BasedDataStructure( { NOT CALLED
		// 	requestData, 
		// 	responseData, 
		// 	dataPageStateManager_DataFrom_Server, 
		// 	projectSearchIds_dataNotLoadedArray 
		// } );
	}

	////////////////////////////////////////////////////////////

	///   Create and store data in format V2 Map Based format

	/**
	 * Create and store data in format V2 Map Based format
	 */
	_retrieveSearchAnnotationTypeDataFromAJAXResponse_V2_StoreDataIn_Map_BasedDataStructure( {

		requestData,
		responseData,
		dataPageStateManager_DataFrom_Server,
		projectSearchIds_dataNotLoadedArray
	} :  {

		requestData: any,
		responseData: any,
		dataPageStateManager_DataFrom_Server : DataPageStateManager
		projectSearchIds_dataNotLoadedArray : Array<number>
	}
	 ) {

		let perSearchList = responseData.perSearchList;

		if ( ! perSearchList ) {
			throw Error("Annotation Type List return is empty. projectSearchIds_dataNotLoadedArray: " + projectSearchIds_dataNotLoadedArray.join( '_' ));
		}

		let annotationTypeData_Root : AnnotationTypeData_Root = dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		if ( ! annotationTypeData_Root ) {
			annotationTypeData_Root = new  AnnotationTypeData_Root();
		}

		for ( const perSearchItem of perSearchList ) {

			//  Convert AnnotationType lists to Maps keyed on Annotation Type Id which is then stored in local variable

			const psmFilterableAnnotationTypes = this._convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchItem.psmFilterableAnnotationTypes
			});
			const reportedPeptideFilterableAnnotationTypes = this._convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchItem.reportedPeptideFilterableAnnotationTypes
			});
			const matchedProteinFilterableAnnotationTypes = this._convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchItem.matchedProteinFilterableAnnotationTypes
			});
			const modificationPositionFilterableAnnotationTypes = this._convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchItem.modificationPositionFilterableAnnotationTypes
			});
			const psmPeptidePositionFilterableAnnotationTypes = this._convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchItem.psmPeptidePositionFilterableAnnotationTypes
			});

			const psmDescriptiveAnnotationTypes = this._convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchItem.psmDescriptiveAnnotationTypes
			});
			const reportedPeptideDescriptiveAnnotationTypes = this._convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchItem.reportedPeptideDescriptiveAnnotationTypes
			});
			const matchedProteinDescriptiveAnnotationTypes = this._convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchItem.matchedProteinDescriptiveAnnotationTypes
			});
			const modificationPositionDescriptiveAnnotationTypes = this._convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId({
				annotationTypeArray : perSearchItem.modificationPositionDescriptiveAnnotationTypes
			});

			const  annotationTypes_PerProjectSearchId : AnnotationTypeItems_PerProjectSearchId = {
				projectSearchId : perSearchItem.projectSearchId,
				searchId : perSearchItem.searchId,
				psmFilterableAnnotationTypes,
				reportedPeptideFilterableAnnotationTypes,
				matchedProteinFilterableAnnotationTypes,
				modificationPositionFilterableAnnotationTypes,
				psmPeptidePositionFilterableAnnotationTypes,
				psmDescriptiveAnnotationTypes,
				reportedPeptideDescriptiveAnnotationTypes,
				matchedProteinDescriptiveAnnotationTypes,
				modificationPositionDescriptiveAnnotationTypes
			};

			//  Put in object, key projectSearchId
			annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.set( perSearchItem.projectSearchId, annotationTypes_PerProjectSearchId );

		}

		//  Save Data to state manager
		dataPageStateManager_DataFrom_Server.set_annotationTypeData_Root( annotationTypeData_Root );
	}

	/**
	 *
	 */
	_convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId( { annotationTypeArray } : { annotationTypeArray: any } ) : Map<number, AnnotationTypeItem> {

		let annotationTypesMap : Map<number, AnnotationTypeItem> = new Map();

		if ( annotationTypeArray === undefined || annotationTypeArray === null ) {
			const msg = "AnnotationTypeDataRetrieval:_convertAnnotationTypeArrayTo_V2_Map_KeyedAnnotationTypeId: annotationTypeArray is undefined or null";
			console.warn( msg );
			throw Error( msg );
		}

		for ( const annotationTypeItem_ServerItem of annotationTypeArray ) {

			//  Validate that the expected numbers are numbers

			if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.annotationTypeId ) ) {
				const msg = "if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.annotationTypeId ) ): annotationTypeItem_ServerItem.annotationTypeId: " + annotationTypeItem_ServerItem.annotationTypeId;
				console.warn( msg );
				throw Error( msg );
			}
			if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.searchProgramsPerSearchId ) ) {
				const msg = "if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.searchProgramsPerSearchId ) ): annotationTypeItem_ServerItem.searchProgramsPerSearchId: " + annotationTypeItem_ServerItem.searchProgramsPerSearchId;
				console.warn( msg );
				throw Error( msg );
			}
			if ( annotationTypeItem_ServerItem.displayOrder !== undefined && annotationTypeItem_ServerItem.displayOrder !== null ) {
				if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.displayOrder ) ) {
					const msg = "if ( annotationTypeItem_ServerItem.displayOrder !== undefined && annotationTypeItem_ServerItem.displayOrder !== null ): if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.displayOrder ) ): annotationTypeItem_ServerItem.displayOrder: " + annotationTypeItem_ServerItem.displayOrder;
					console.warn( msg );
					throw Error( msg );
				}
			}
			if ( annotationTypeItem_ServerItem.defaultFilterValue !== undefined && annotationTypeItem_ServerItem.defaultFilterValue !== null ) {
				if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.defaultFilterValue ) ) {
					const msg = "if ( annotationTypeItem_ServerItem.defaultFilterValue !== undefined && annotationTypeItem_ServerItem.defaultFilterValue !== null ): if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.defaultFilterValue ) ): annotationTypeItem_ServerItem.defaultFilterValue: " + annotationTypeItem_ServerItem.defaultFilterValue;
					console.warn( msg );
					throw Error( msg );
				}
			}
			if ( annotationTypeItem_ServerItem.sortOrder !== undefined && annotationTypeItem_ServerItem.sortOrder !== null ) {
				if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.sortOrder ) ) {
					const msg = "if ( annotationTypeItem_ServerItem.sortOrder !== undefined && annotationTypeItem_ServerItem.sortOrder !== null ): if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.sortOrder ) ): annotationTypeItem_ServerItem.sortOrder: " + annotationTypeItem_ServerItem.sortOrder;
					console.warn( msg );
					throw Error( msg );
				}
			}


			if ( annotationTypeItem_ServerItem.min_ValueDouble !== undefined && annotationTypeItem_ServerItem.min_ValueDouble !== null ) {
				if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.min_ValueDouble ) ) {
					const msg = "if ( annotationTypeItem_ServerItem.min_ValueDouble !== undefined && annotationTypeItem_ServerItem.min_ValueDouble !== null ): if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.min_ValueDouble ) ): annotationTypeItem_ServerItem.min_ValueDouble: " + annotationTypeItem_ServerItem.min_ValueDouble;
					console.warn( msg );
					throw Error( msg );
				}
			}
			if ( annotationTypeItem_ServerItem.max_ValueDouble !== undefined && annotationTypeItem_ServerItem.max_ValueDouble !== null ) {
				if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.max_ValueDouble ) ) {
					const msg = "if ( annotationTypeItem_ServerItem.max_ValueDouble !== undefined && annotationTypeItem_ServerItem.max_ValueDouble !== null ): if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.max_ValueDouble ) ): annotationTypeItem_ServerItem.max_ValueDouble: " + annotationTypeItem_ServerItem.max_ValueDouble;
					console.warn( msg );
					throw Error( msg );
				}
			}
			if ( annotationTypeItem_ServerItem.best_ValueDouble !== undefined && annotationTypeItem_ServerItem.best_ValueDouble !== null ) {
				if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.best_ValueDouble ) ) {
					const msg = "if ( annotationTypeItem_ServerItem.best_ValueDouble !== undefined && annotationTypeItem_ServerItem.best_ValueDouble !== null ): if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.best_ValueDouble ) ): annotationTypeItem_ServerItem.best_ValueDouble: " + annotationTypeItem_ServerItem.best_ValueDouble;
					console.warn( msg );
					throw Error( msg );
				}
			}
			if ( annotationTypeItem_ServerItem.worst_ValueDouble !== undefined && annotationTypeItem_ServerItem.worst_ValueDouble !== null ) {
				if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.worst_ValueDouble ) ) {
					const msg = "if ( annotationTypeItem_ServerItem.worst_ValueDouble !== undefined && annotationTypeItem_ServerItem.worst_ValueDouble !== null ): if ( ! limelight__variable_is_type_number_Check( annotationTypeItem_ServerItem.worst_ValueDouble ) ): annotationTypeItem_ServerItem.worst_ValueDouble: " + annotationTypeItem_ServerItem.worst_ValueDouble;
					console.warn( msg );
					throw Error( msg );
				}
			}

			const annotationTypeItem = new AnnotationTypeItem({

				 //  Label as sort as number or string for Filterable or Descriptive

				annotationTypeId : annotationTypeItem_ServerItem.annotationTypeId,

				searchProgramsPerSearchId : annotationTypeItem_ServerItem.searchProgramsPerSearchId,

				name : annotationTypeItem_ServerItem.name,

				defaultVisible : annotationTypeItem_ServerItem.defaultVisible,
				displayOrder : annotationTypeItem_ServerItem.displayOrder, // may be null

				description : annotationTypeItem_ServerItem.description,

				///  Filterable Annotation Types Only, ignore for descriptive annotation types

				filterDirectionAbove : annotationTypeItem_ServerItem.filterDirectionAbove,
				filterDirectionBelow : annotationTypeItem_ServerItem.filterDirectionBelow,

				defaultFilter : annotationTypeItem_ServerItem.defaultFilter,
				defaultFilterValue : annotationTypeItem_ServerItem.defaultFilterValue,
				defaultFilterValueString : annotationTypeItem_ServerItem.defaultFilterValueString,

				min_ValueDouble : annotationTypeItem_ServerItem.min_ValueDouble,
				max_ValueDouble : annotationTypeItem_ServerItem.max_ValueDouble,
				best_ValueDouble : annotationTypeItem_ServerItem.best_ValueDouble,
				worst_ValueDouble : annotationTypeItem_ServerItem.worst_ValueDouble,

				sortOrder : annotationTypeItem_ServerItem.sortOrder
			});



			Object.freeze( annotationTypeItem );    //  Freeze Object, no changes to properties, no add or remove properties

			annotationTypesMap.set( annotationTypeItem.annotationTypeId , annotationTypeItem );
		}

		return annotationTypesMap;
	}
}
