/**
 * Code related to working with page state data structures defined in core
 * javascript libraries.
 */

"use strict";

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

export class PageStateUtils {

	static getReportedPeptideAnnotationTypeIdsWhereSortOrderPopulated( { dataPageStateManager_DataFrom_Server, projectSearchId } ) {

		let reportedPeptideFilterableAnnotationTypes_SortOrderPopulated = 
            PageStateUtils.getReportedPeptideAnnotationTypeRecordsWhereSortOrderPopulated( { dataPageStateManager_DataFrom_Server, projectSearchId } );
		
		let result = [];
		
		reportedPeptideFilterableAnnotationTypes_SortOrderPopulated.forEach(function( element, i, array) {
			result.push( element.annotationTypeId );
		}, this );
		
		return result;
	}


	/**
	 * Return array ann type entries, sorted on sortOrder
	 */
	static getReportedPeptideAnnotationTypeRecordsWhereSortOrderPopulated( { dataPageStateManager_DataFrom_Server, projectSearchId } ) {

		//   Get all Reported Peptide annotation type records with sortOrder set

		let annotationTypeData = dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

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

	static getPsmAnnotationTypeIdsWhereSortOrderPopulated( { dataPageStateManager_DataFrom_Server, projectSearchId } ) {

		let psmFilterableAnnotationTypes_WhereSortOrderPopulated = 
         PageStateUtils.getPsmAnnotationTypeRecordsWhereSortOrderPopulated( { dataPageStateManager_DataFrom_Server, projectSearchId } );
		
		let result = [];
		
		psmFilterableAnnotationTypes_WhereSortOrderPopulated.forEach(function( element, i, array) {
			result.push( element.annotationTypeId );
		}, this );
		
		return result;
	}

    /**
	 * Return array ann type entries, sorted on sortOrder
	 */
	static getPsmAnnotationTypeRecordsWhereSortOrderPopulated( { dataPageStateManager_DataFrom_Server, projectSearchId } ) {

		//   Get all Psm annotation type records with sortOrder set

		let annotationTypeData = dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

		let annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}

		let psmFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
		if ( ! psmFilterableAnnotationTypes ) {
			//  No data so return empty array
			return []; //  EARLY RETURN
		}
		
		//  Get AnnotationType Records where sortOrder is populated
		
		let psmFilterableAnnotationTypes_SortOrderPopulated = [];
		
		let psmFilterableAnnotationTypes_Keys = Object.keys ( psmFilterableAnnotationTypes );
		
		psmFilterableAnnotationTypes_Keys.forEach( function( psmFilterableAnnotationTypesKeyItem, index, array ) {
			let annotationTypeEntryForKey = psmFilterableAnnotationTypes[ psmFilterableAnnotationTypesKeyItem ];
			if ( annotationTypeEntryForKey.sortOrder ) {
				psmFilterableAnnotationTypes_SortOrderPopulated.push( annotationTypeEntryForKey );
			}
		}, this );

		
		//  Sort on sort order
		
		psmFilterableAnnotationTypes_SortOrderPopulated.sort(function(a, b) {
			if ( a.sortOrder < b.sortOrder ) {
				return -1;
			}
			if ( a.sortOrder > b.sortOrder ) {
				return 1;
			}
			return 0;
		})
		
		return psmFilterableAnnotationTypes_SortOrderPopulated;
	};


}