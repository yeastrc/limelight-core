/**
 * annotationTypeData_ReturnSpecifiedTypes.js
 * 
 * Javascript for returning Annotation Type data for specific requests 
 * 
 * Uses the in memory variables populated by annotationTypeDataRetrieval.js (AnnotationTypeDataRetrieval)
 * 
 */



import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

/**
 * 
 */
export class AnnotationTypeData_ReturnSpecifiedTypes {

	/**
	 * 
	 */
	constructor( { dataPageStateManager_DataFrom_Server } ) {
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
	}
	
	/**
	 * 
	 */
	get_ReportedPeptide_AnnotationTypeIds_WhereSortOrderPopulated( { projectSearchId } ) {

		let reportedPeptideFilterableAnnotationTypes_SortOrderPopulated = 
			this.get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } );
		
		let result = [];
		
		reportedPeptideFilterableAnnotationTypes_SortOrderPopulated.forEach(function( element, i, array) {
			result.push( element.annotationTypeId );
		}, this );
		
		return result;
	}

	/**
	 * Return array ann type entries, sorted on sortOrder
	 */
	get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } ) {

		//   Get all Reported Peptide annotation type records with sortOrder set

		let annotationTypeData = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

		let annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}

		let reportedPeptideFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
		if ( ! reportedPeptideFilterableAnnotationTypes ) {
			//  No data so return empty array
			return []; //  EARLY RETURN
		}
		
		//  Get AnnotationType Records where sortOrder is populated
		
		let reportedPeptideFilterableAnnotationTypes_SortOrderPopulated = [];
		
		let reportedPeptideFilterableAnnotationTypes_Keys = Object.keys ( reportedPeptideFilterableAnnotationTypes );
		
		reportedPeptideFilterableAnnotationTypes_Keys.forEach( function( reportedPeptideFilterableAnnotationTypesKeyItem, index, array ) {
			let annotationTypeEntryForKey = reportedPeptideFilterableAnnotationTypes[ reportedPeptideFilterableAnnotationTypesKeyItem ];
			if ( annotationTypeEntryForKey.sortOrder ) {
				reportedPeptideFilterableAnnotationTypes_SortOrderPopulated.push( annotationTypeEntryForKey );
			}
		}, this );
		
		//  Sort on sort order
		reportedPeptideFilterableAnnotationTypes_SortOrderPopulated.sort(function(a, b) {
			if ( a.sortOrder < b.sortOrder ) {
				return -1;
			}
			if ( a.sortOrder > b.sortOrder ) {
				return 1;
			}
			return 0;
		})
		
		return reportedPeptideFilterableAnnotationTypes_SortOrderPopulated;
	};

	/**
	 * uniqueAnnotationTypeIds is type Set
	 */
	get_ReportedPeptide_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds } ) {

		if ( ( ! uniqueAnnotationTypeIds ) || uniqueAnnotationTypeIds.size === 0 ) {
			return [];
		}
		
		let annotationTypeData = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

		let annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}
		let filterableAnnotationTypes = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
		let descriptiveAnnotationTypes = annotationTypeDataForProjectSearchId.reportedPeptideDescriptiveAnnotationTypes;
		if ( ( ! filterableAnnotationTypes ) && ( ! descriptiveAnnotationTypes ) ) {
			throw Error("No reportedPeptideFilterableAnnotationTypes or reportedPeptideDescriptiveAnnotationTypes but have uniqueAnnotationTypeIds entries");
		}
		
		return this._get_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds, filterableAnnotationTypes, descriptiveAnnotationTypes } );
	}

	/**
	 * uniqueAnnotationTypeIds is type Set
	 */
	get_Psm_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds } ) {
		
		if ( ( ! uniqueAnnotationTypeIds ) || uniqueAnnotationTypeIds.size === 0 ) {
			return [];
		}
		
		let annotationTypeData = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

		let annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}
		let filterableAnnotationTypes = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
		let descriptiveAnnotationTypes = annotationTypeDataForProjectSearchId.psmDescriptiveAnnotationTypes;
		if ( ( ! filterableAnnotationTypes ) && ( ! descriptiveAnnotationTypes ) ) {
			throw Error("No psmFilterableAnnotationTypes or psmDescriptiveAnnotationTypes but have uniqueAnnotationTypeIds entries");
		}

		return this._get_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds, filterableAnnotationTypes, descriptiveAnnotationTypes } );
	}

	/**
	 * 
	 */
	_get_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds, filterableAnnotationTypes, descriptiveAnnotationTypes } ) {

		let annotationTypesForPeptideListEntries = [];

		//  Get AnnotationTypeRecords for AnnotationTypeIds
		uniqueAnnotationTypeIds.forEach( function( uniqueAnnotationTypeId, index, array ) {
			let annotationTypeEntryForKey = filterableAnnotationTypes[ uniqueAnnotationTypeId ];
			if ( ! annotationTypeEntryForKey ) {
				annotationTypeEntryForKey = descriptiveAnnotationTypes[ uniqueAnnotationTypeId ];
				if ( ! annotationTypeEntryForKey ) {
					throw Error( "No reportedPeptideFilterableAnnotationTypes or reportedPeptideDescriptiveAnnotationTypes entry for key: " + uniqueAnnotationTypeId );
				}
			}
			annotationTypesForPeptideListEntries.push( annotationTypeEntryForKey );
		}, this );
		
		//  Sort the result array, on display order, then by ann type name
		
		this._sort_AnnotationTypes_OnDisplayOrderAnnTypeName( { annTypesArray : annotationTypesForPeptideListEntries } );
		
		return annotationTypesForPeptideListEntries;
	};
	
	/**
	 * 
	 */
	_sort_AnnotationTypes_OnDisplayOrderAnnTypeName( { annTypesArray } ) {

		annTypesArray.sort( function( a, b ) {
			if ( a.displayOrder && b.displayOrder ) {
				//  both a and b have display order so order them
				if ( a.displayOrder < b.displayOrder ) {
					return -1;
				}
				if ( a.displayOrder > b.displayOrder ) {
					return 1;
				}
				return 0;
			}
			if ( a.displayOrder ) {
				//  Only a has display order so order it first
				return -1;
			}
			if ( b.displayOrder ) {
				//  Only b has display order so order it first
				return 1;
			}
			//  Order on ann type name
			let nameCompare = a.name.localeCompare( b.name );
			return nameCompare;
		});
	}
}
