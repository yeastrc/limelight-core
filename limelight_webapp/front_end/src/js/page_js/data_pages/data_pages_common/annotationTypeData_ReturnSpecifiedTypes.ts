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
	constructor( { dataPageStateManager_DataFrom_Server } : { dataPageStateManager_DataFrom_Server : DataPageStateManager } ) {
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
	}
	
	/**
	 * 
	 */
	get_ReportedPeptide_AnnotationTypeIds_WhereSortOrderPopulated( { projectSearchId } : { projectSearchId : any } ) : Array<number> {

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
	get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } : { projectSearchId : any } ) : Array<AnnotationTypeItem> {

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
	get_ReportedPeptide_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds } : { projectSearchId : any, uniqueAnnotationTypeIds : any } ) : Array<AnnotationTypeItem> {

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

	/////


	/**
	 * Return array ann type ids, sorted on sortOrder
	 */
	get_Psm_AnnotationTypeIds_WhereSortOrderPopulated({ projectSearchId } : { projectSearchId : number }) : Array<number> {

		let psmFilterableAnnotationTypes_SortOrderPopulated =
			this.get_Psm_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } );

		let result : Array<number> = [];

		psmFilterableAnnotationTypes_SortOrderPopulated.forEach(function( element, i, array) {
			result.push( element.annotationTypeId );
		}, this );

		return result;
	}

	/**
	 * Return array ann type entries, sorted on sortOrder
	 */
	get_Psm_AnnotationTypeRecords_WhereSortOrderPopulated({ projectSearchId } : { projectSearchId : number }) : Array<AnnotationTypeItem> {

		//   Get all Psm annotation type records with sortOrder set

		let annotationTypeData_Root : AnnotationTypeData_Root = this._dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		let annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}


		const psmFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
		const psmDescriptiveAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmDescriptiveAnnotationTypes;

		if ( ( ! psmFilterableAnnotationTypes_Map ) && ( ! psmDescriptiveAnnotationTypes_Map ) ) {
			//  No data so return empty array
			return []; //  EARLY RETURN
		}

		//  Get AnnotationType Records where sortOrder is populated

		let psmAnnotationTypes_SortOrderPopulated : Array<AnnotationTypeItem> = [];

		{
			for ( const psmFilterableAnnotationTypes_MapEntry of psmFilterableAnnotationTypes_Map.entries() ) {

				const psmFilterableAnnotationType : AnnotationTypeItem = psmFilterableAnnotationTypes_MapEntry[ 1 ];

				if ( psmFilterableAnnotationType.sortOrder ) {
					psmAnnotationTypes_SortOrderPopulated.push( psmFilterableAnnotationType );
				}
			}
		}
		{
			for ( const psmDescriptiveAnnotationTypes_MapEntry of psmDescriptiveAnnotationTypes_Map.entries() ) {

				const psmDescriptiveAnnotationType : AnnotationTypeItem = psmDescriptiveAnnotationTypes_MapEntry[ 1 ];

				if ( psmDescriptiveAnnotationType.sortOrder ) {
					psmAnnotationTypes_SortOrderPopulated.push( psmDescriptiveAnnotationType );
				}
			}
		}

		//  Sort on sort order

		psmAnnotationTypes_SortOrderPopulated.sort(function(a, b) {
			if ( a.sortOrder < b.sortOrder ) {
				return -1;
			}
			if ( a.sortOrder > b.sortOrder ) {
				return 1;
			}
			return 0;
		})

		return psmAnnotationTypes_SortOrderPopulated;
	}


	/**
	 * uniqueAnnotationTypeIds is type Set
	 */
	get_Psm_AnnotationTypeRecords_InDisplayOrder( { projectSearchId, uniqueAnnotationTypeIds } : { projectSearchId : any, uniqueAnnotationTypeIds : any } ) : Array<AnnotationTypeItem> {
		
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
		
		projectSearchId: any,
		uniqueAnnotationTypeIds: any,
		filterableAnnotationTypes_Map : Map<number, AnnotationTypeItem>
		descriptiveAnnotationTypes_Map : Map<number, AnnotationTypeItem>
	} ) : Array<AnnotationTypeItem> {

		let annotationTypesForPeptideListEntries : Array<AnnotationTypeItem> = [];

		//  Get AnnotationTypeRecords for AnnotationTypeIds
		uniqueAnnotationTypeIds.forEach( function( uniqueAnnotationTypeId: any, index: any, array: any ) {
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
