/**
 * Code related to working with page state data structures defined in core
 * javascript libraries.
 */

"use strict";


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

		let annotationTypeDataLoaded_Root = dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		let annotationTypeDataForProjectSearchId = annotationTypeDataLoaded_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}

		let reportedPeptideFilterableAnnotationTypes_Map = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
		if ( ! reportedPeptideFilterableAnnotationTypes_Map ) {
			//  No data so return empty array
			return []; //  EARLY RETURN
		}
		
		//  Get AnnotationType Records where sortOrder is populated
		
		let reportedPeptideFilterableAnnotationTypes_SortOrderPopulated = [];
		
		for ( const annotationTypes_Map_Entry of reportedPeptideFilterableAnnotationTypes_Map.entries() ) {
            const annotationTypeEntry = annotationTypes_Map_Entry[ 1 ]; // value of map entry
			if ( annotationTypeEntry.sortOrder ) {
				reportedPeptideFilterableAnnotationTypes_SortOrderPopulated.push( annotationTypeEntry );
			}
		}
		
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
	}

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

		let annotationTypeDataLoaded_Root = dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		let annotationTypeDataForProjectSearchId = annotationTypeDataLoaded_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}

		let psmFilterableAnnotationTypes_Map = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
		if ( ! psmFilterableAnnotationTypes_Map ) {
			//  No data so return empty array
			return []; //  EARLY RETURN
		}
		
		//  Get AnnotationType Records where sortOrder is populated
		
		let psmFilterableAnnotationTypes_SortOrderPopulated = [];
		
		for ( const annotationTypes_Map_Entry of psmFilterableAnnotationTypes_Map.entries() ) {
            const annotationTypeEntry = annotationTypes_Map_Entry[ 1 ]; // value of map entry
			if ( annotationTypeEntry.sortOrder ) {
				psmFilterableAnnotationTypes_SortOrderPopulated.push( annotationTypeEntry );
			}
		}

		
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
	}


}