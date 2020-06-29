/**
 * annotationTypeData_ReturnSpecifiedTypes.ts
 * 
 * Javascript for returning Annotation Type data for specific requests 
 * 
 * Uses the in memory variables populated by annotationTypeDataRetrieval.ts (AnnotationTypeDataRetrieval)
 * 
 */

import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItems_PerProjectSearchId, AnnotationTypeItem } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

/**
 * 
 */
export class AnnotationTypeData_ReturnSpecifiedTypes {

	private _dataPageStateManager_DataFrom_Server : DataPageStateManager

	/**
	 * 
	 */
	constructor( { dataPageStateManager_DataFrom_Server } ) {
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
	}
	
	/**
	 * 
	 */
	get_ReportedPeptide_AnnotationTypeIds_WhereSortOrderPopulated( { projectSearchId } ) : Array<number> {

		let reportedPeptideFilterableAnnotationTypes_SortOrderPopulated = 
			this.get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } );
		
		let result : Array<number> = [];
		
		reportedPeptideFilterableAnnotationTypes_SortOrderPopulated.forEach(function( element, i, array) {
			result.push( element.annotationTypeId );
		}, this );
		
		return result;
	}

	/**
	 * Return array ann type entries, sorted on sortOrder
	 */
	get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } ) : Array<AnnotationTypeItem> {

		//   Get all Reported Peptide annotation type records with sortOrder set

		let annotationTypeData_Root : AnnotationTypeData_Root = this._dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		let annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}

		let reportedPeptideFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
		if ( ! reportedPeptideFilterableAnnotationTypes_Map ) {
			//  No data so return empty array
			return []; //  EARLY RETURN
		}
		
		//  Get AnnotationType Records where sortOrder is populated
		
		let reportedPeptideFilterableAnnotationTypes_SortOrderPopulated : Array<AnnotationTypeItem> = [];
		
		for ( const reportedPeptideFilterableAnnotationTypes_MapEntry of reportedPeptideFilterableAnnotationTypes_Map.entries() ) {
			const annotationTypeEntry = reportedPeptideFilterableAnnotationTypes_MapEntry[ 1 ];
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

	/**
	 * uniqueAnnotationTypeIds is type Set
	 */
	get_ReportedPeptide_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds } ) : Array<AnnotationTypeItem> {

		if ( ( ! uniqueAnnotationTypeIds ) || uniqueAnnotationTypeIds.size === 0 ) {
			return [];
		}
		
		let annotationTypeData_Root : AnnotationTypeData_Root = this._dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		let annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}
		let filterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
		let descriptiveAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideDescriptiveAnnotationTypes;
		if ( ( ! filterableAnnotationTypes_Map ) && ( ! descriptiveAnnotationTypes_Map ) ) {
			throw Error("No reportedPeptideFilterableAnnotationTypes or reportedPeptideDescriptiveAnnotationTypes but have uniqueAnnotationTypeIds entries");
		}
		
		return this._get_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds, filterableAnnotationTypes_Map, descriptiveAnnotationTypes_Map } );
	}

	/**
	 * uniqueAnnotationTypeIds is type Set
	 */
	get_Psm_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds } ) : Array<AnnotationTypeItem> {
		
		if ( ( ! uniqueAnnotationTypeIds ) || uniqueAnnotationTypeIds.size === 0 ) {
			return [];
		}
		
		let annotationTypeData_Root : AnnotationTypeData_Root = this._dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		let annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}
		let filterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
		let descriptiveAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmDescriptiveAnnotationTypes;
		if ( ( ! filterableAnnotationTypes_Map ) && ( ! descriptiveAnnotationTypes_Map ) ) {
			throw Error("No psmFilterableAnnotationTypes or psmDescriptiveAnnotationTypes but have uniqueAnnotationTypeIds entries");
		}

		return this._get_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds, filterableAnnotationTypes_Map, descriptiveAnnotationTypes_Map } );
	}

	/**
	 * 
	 */
	_get_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds, filterableAnnotationTypes_Map, descriptiveAnnotationTypes_Map } : { 
		
		projectSearchId, 
		uniqueAnnotationTypeIds, 
		filterableAnnotationTypes_Map : Map<number, AnnotationTypeItem>
		descriptiveAnnotationTypes_Map : Map<number, AnnotationTypeItem>
	} ) : Array<AnnotationTypeItem> {

		let annotationTypesForPeptideListEntries : Array<AnnotationTypeItem> = [];

		//  Get AnnotationTypeRecords for AnnotationTypeIds
		uniqueAnnotationTypeIds.forEach( function( uniqueAnnotationTypeId, index, array ) {
			let annotationTypeEntryForKey = filterableAnnotationTypes_Map.get( uniqueAnnotationTypeId );
			if ( ! annotationTypeEntryForKey ) {
				annotationTypeEntryForKey = descriptiveAnnotationTypes_Map.get( uniqueAnnotationTypeId );
				if ( ! annotationTypeEntryForKey ) {
					throw Error( "No reportedPeptideFilterableAnnotationTypes or reportedPeptideDescriptiveAnnotationTypes entry for key: " + uniqueAnnotationTypeId );
				}
			}
			annotationTypesForPeptideListEntries.push( annotationTypeEntryForKey );
		}, this );
		
		//  Sort the result array, on display order, then by ann type name
		
		this._sort_AnnotationTypes_OnDisplayOrderAnnTypeName( annotationTypesForPeptideListEntries );
		
		return annotationTypesForPeptideListEntries;
	}
	
	/**
	 * 
	 */
	private _sort_AnnotationTypes_OnDisplayOrderAnnTypeName( annTypesArray : Array<AnnotationTypeItem> ) {

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