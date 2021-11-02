/**
 * proteinView_compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId.ts
 * 
 * Javascript for proteinView.jsp page - Compute Protein Sequence Coverage Per proteinSequenceVersionId
 * 
 * Input is Protein Sequence Coverage Per Reported Peptide Id
 * 
 * 
 * !!!!!!!!!!   Assumes for a single Project Search Id since it concatenates arrays of reported peptide ids  !!!!!!!!!!!!!!
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { ProteinSequenceCoverageData_For_ProteinSequenceVersionId } from './proteinSequenceCoverageData_For_ProteinSequenceVersionId';

/**
 * 
 */
export class ProteinView_compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId {

	/**
	 * 
	 */
	constructor() {}

	/**
	 * 
	 */
	initialize() {}

	/**
	 * Compute Protein Sequence Coverage Per proteinSequenceVersionId
	 * 
	 * Input:
	 *  Current Reported Peptide Ids (based on current cutoffs/filters)
	 *  Protein Sequence Coverage Per Reported Peptide Id
	 *  proteinInfoMapKeyProteinSequenceVersionId - for protein lengths
	 */
	static compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId({ reportedPeptideIds, proteinCoverage_KeyReportedPeptideId, proteinInfoMapKeyProteinSequenceVersionId } : {

		reportedPeptideIds : Array<number>
		proteinCoverage_KeyReportedPeptideId :  Map<number, {reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}[]>
		proteinInfoMapKeyProteinSequenceVersionId : Map<number, {proteinLength: number, annotations: {name: string, description: string, taxonomy: number}[]}>

	} ) :  { proteinCoverage_KeyProteinSequenceVersionId : Map<number, ProteinSequenceCoverageData_For_ProteinSequenceVersionId> } {

		const instance = new ProteinView_compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId();
		
		const proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId : Map<number, Array<{reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}> >   = (
			instance._create_proteinSequenceCoverage_MapPer_proteinSequenceVersionId( { reportedPeptideIds, proteinCoverage_KeyReportedPeptideId } )
		);

		const proteinCoverageMergedRanges_KeyProteinSequenceVersionId : Map<number, {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[]> = (
			instance._proteinSequenceCoverage_MergeRanges_Per_proteinSequenceVersionId( { proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId } )
		);
		
		//  Create Map of objects of class ProteinSequenceCoverageData_For_ProteinSequenceVersionId to return as the result
		
		const proteinCoverageEntries_Result_Map : Map<number, ProteinSequenceCoverageData_For_ProteinSequenceVersionId> = new Map();
		
		for ( const proteinCoverageEntries_PerReportedPeptideId_MapEntry of proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId ) {

			const proteinSequenceVersionId = proteinCoverageEntries_PerReportedPeptideId_MapEntry[ 0 ]; // Map Key
			const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageEntries_PerReportedPeptideId_MapEntry[ 1 ]; // Map Value
			
			const proteinCoverageMergedRanges_Entry = proteinCoverageMergedRanges_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( ! proteinCoverageMergedRanges_Entry ) {
				throw Error("Internal Error: No entry in proteinCoverageMergedRanges_KeyProteinSequenceVersionId for proteinSequenceVersionId: " + proteinSequenceVersionId );
			}
			
			const proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( ! proteinInfo ) {
				throw Error("Internal Error: No entry in proteinCoverageMergedRanges_KeyProteinSequenceVersionId for proteinSequenceVersionId: " + proteinSequenceVersionId );
			}
			const proteinLength = proteinInfo.proteinLength;
			
			const proteinSequenceCoverageData_For_ProteinSequenceVersionId = new ProteinSequenceCoverageData_For_ProteinSequenceVersionId({
				proteinSequenceVersionId, proteinLength, proteinCoverageEntries_PerReportedPeptideId_Array, proteinCoverageMergedRanges : proteinCoverageMergedRanges_Entry
			} );

			proteinCoverageEntries_Result_Map.set( proteinSequenceVersionId, proteinSequenceCoverageData_For_ProteinSequenceVersionId );
		}
		
		return ( { proteinCoverage_KeyProteinSequenceVersionId : proteinCoverageEntries_Result_Map } );
	}


	/**
	 * Map the protein sequence coverage to be per proteinSequenceVersionId
	 */
	_create_proteinSequenceCoverage_MapPer_proteinSequenceVersionId( { reportedPeptideIds, proteinCoverage_KeyReportedPeptideId } : {

		reportedPeptideIds: Array<number>
		proteinCoverage_KeyReportedPeptideId: Map<number, { reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number }[]>

	}) : Map<number, Array<{reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}> > {

		const proteinCoverage_KeyProteinSequenceVersionId : Map<number, Array<{reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}> > = new Map()

		for ( const reportedPeptideId of reportedPeptideIds ) {

			const proteinCoverage_Array = proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId );

			if ( ! proteinCoverage_Array ) {
				const msg = "proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId ); not return a value. reportedPeptideId: " + reportedPeptideId;
				console.warn( msg );
				throw Error( msg );
			}

			for ( const proteinCoverage_entry of proteinCoverage_Array ) {

				let proteinCoverage_NewMapEntry = proteinCoverage_KeyProteinSequenceVersionId.get( proteinCoverage_entry.proteinSequenceVersionId );
				if ( ! proteinCoverage_NewMapEntry ) {
					proteinCoverage_NewMapEntry = [];
					proteinCoverage_KeyProteinSequenceVersionId.set( proteinCoverage_entry.proteinSequenceVersionId, proteinCoverage_NewMapEntry );
				}
				proteinCoverage_NewMapEntry.push( proteinCoverage_entry );
			}
		}

		//  In result Map proteinCoverage_KeyProteinSequenceVersionId, sort each array

		//  Sort each array on Protein Start, Protein End, Reported Peptide Id 

		for ( const proteinCoverage_KeyProteinSequenceVersionId_MapEntry of proteinCoverage_KeyProteinSequenceVersionId ) {

			// const reportedPeptideId = proteinCoverage_MapEntry[ 0 ]; // Map Key
			const proteinCoverage_Array = proteinCoverage_KeyProteinSequenceVersionId_MapEntry[ 1 ]; // Map Value

			proteinCoverage_Array.sort( function( a, b ) {
				//  Sort in order of proteinStartPosition, proteinEndPosition, reportedPeptideId
				if ( a.proteinStartPosition < b.proteinStartPosition ) {
					return -1;
				}
				if ( a.proteinStartPosition > b.proteinStartPosition ) {
					return 1;
				}
				if ( a.proteinEndPosition < b.proteinEndPosition ) {
					return -1;
				}
				if ( a.proteinEndPosition > b.proteinEndPosition ) {
					return 1;
				}
				if ( a.reportedPeptideId < b.reportedPeptideId ) {
					return -1;
				}
				if ( a.reportedPeptideId > b.reportedPeptideId ) {
					return 1;
				}
				return 0;
			} );
		}

		return proteinCoverage_KeyProteinSequenceVersionId;
	}

	/**
	 * Merge the protein sequence coverage per proteinSequenceVersionId
	 * 
	 * Merge the overlapping ranges into adjacent ranges with combined proteinCoverageDataItems (reported peptide ids)
	 */
	_proteinSequenceCoverage_MergeRanges_Per_proteinSequenceVersionId( { proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId } : {
		proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId : Map<number, Array<{reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}> >
	}) : Map<number, {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[]> {

		const proteinCoverageMergedRanges_KeyProteinSequenceVersionId : Map<number, {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[]> = new Map()

		for ( const proteinCoverageEntries_PerReportedPeptideId_MapEntry of proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId ) {

			const proteinSequenceVersionId = proteinCoverageEntries_PerReportedPeptideId_MapEntry[ 0 ]; // Map Key
			const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageEntries_PerReportedPeptideId_MapEntry[ 1 ]; // Map Value
			
			//  Clone proteinCoverageEntries_PerReportedPeptideId_Array to proteinCoverageMergeRanges_Array
			
			const proteinCoverageMergeRanges_Array : Array<{ proteinStartPosition : number, proteinEndPosition: number, proteinSequenceVersionId : number, proteinCoverageDataItems : Array<{ reportedPeptideId : number }> }> = [];
			for ( const proteinCoverageEntries_PerReportedPeptideId_Item of proteinCoverageEntries_PerReportedPeptideId_Array ) {
				const proteinCoverage_Item_ForMerging = {
						proteinStartPosition : proteinCoverageEntries_PerReportedPeptideId_Item.proteinStartPosition, 
						proteinEndPosition : proteinCoverageEntries_PerReportedPeptideId_Item.proteinEndPosition,
						proteinSequenceVersionId : proteinCoverageEntries_PerReportedPeptideId_Item.proteinSequenceVersionId, 
						proteinCoverageDataItems : [ { reportedPeptideId : proteinCoverageEntries_PerReportedPeptideId_Item.reportedPeptideId } ]
				}
				proteinCoverageMergeRanges_Array.push( proteinCoverage_Item_ForMerging );
			}

			const combineOverlapsResult = this._combineOverlapsProteinPositionBased( proteinCoverageMergeRanges_Array );
			
			// const splitAnyEntries = combineOverlapsResult.splitAnyEntries;
			const outputList = combineOverlapsResult.outputList;
			
			proteinCoverageMergedRanges_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, outputList );
		}

		return proteinCoverageMergedRanges_KeyProteinSequenceVersionId;
	}

	/////////////////////////////////////////////////////////////////

	/*
	 * Combine for single ProteinSequenceVersionId
	 */
	_combineOverlapsProteinPositionBased( proteinCoverageItemsInputParam : Array<{ proteinStartPosition : number, proteinEndPosition: number, proteinSequenceVersionId : number, proteinCoverageDataItems : Array<{ reportedPeptideId : number }> }> )
	: { splitAnyEntries: boolean, outputList: {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[]  }
	{

		//  Sanity check to prevent infinite loop since have complicated loop exit control
		const MAX__numTimesSplitAnEntryLoop = 300;

		{
			//  Confirm all entries in proteinCoverageItemsInputParam have same value for proteinSequenceVersionId
			if ( proteinCoverageItemsInputParam && proteinCoverageItemsInputParam.length > 0 ) {
				const proteinSequenceVersionId_FirstEntry: number = proteinCoverageItemsInputParam[0].proteinSequenceVersionId;
				for (const proteinCoverageItemsInputParam_Entry of proteinCoverageItemsInputParam) {
					if (proteinSequenceVersionId_FirstEntry !== proteinCoverageItemsInputParam_Entry.proteinSequenceVersionId) {
						throw Error("_combineOverlapsProteinPositionBased(...): if ( proteinSequenceVersionId_FirstEntry !== proteinCoverageItemsInputParam_Entry.proteinSequenceVersionId ) {");
					}
				}
			}
		}
		
		let splitAnyEntries = false;

		let splitAnEntryThisIterationOfLoop = true;

		let numTimesSplitAnEntryLoop = 0;

		//  Input is null since will be copied from Output in each iteration of the loop
		let proteinCoverageItemListInput : {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[] = null;

		// Combine entries with same start and end positions - combine entries first to simplify later processing
		let proteinCoverageItemListOutput : {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[] = this._combineEntriesProteinPositionBased( numTimesSplitAnEntryLoop, proteinCoverageItemsInputParam );

		
		//   While ( entries have been split inside the loop )
		
		while ( splitAnEntryThisIterationOfLoop ) {

			numTimesSplitAnEntryLoop++;

			if ( numTimesSplitAnEntryLoop > MAX__numTimesSplitAnEntryLoop ) {

				try {
					let errorMsg = "combineOverlapsProteinPositionBased(...):  numTimesSplitAnEntryLoop > " + MAX__numTimesSplitAnEntryLoop + " so throwing exception.  ";

					throw Error( errorMsg );

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			}

			//   While entries have been split

			splitAnEntryThisIterationOfLoop = false;


			// Copy Output to Input for next creating of output
			proteinCoverageItemListInput = proteinCoverageItemListOutput;

			proteinCoverageItemListOutput = []; // New Output

			proteinCoverageItemListInput.sort( this._combineOverlaps_Z_compareForSortBlocks );

			//  Split entries if needed

			let index = -1;

			while ( ( ++index ) < proteinCoverageItemListInput.length ) {

				let proteinCoverageItem = proteinCoverageItemListInput[ index ];

				if ( index === ( proteinCoverageItemListInput.length - 1 ) ) {

					//  Last entry, put in output list.

					proteinCoverageItemListOutput.push( proteinCoverageItem );

				} else {

					let proteinCoverageItemNext = proteinCoverageItemListInput[ index + 1 ];

					if ( proteinCoverageItem.proteinEndPosition < proteinCoverageItemNext.proteinStartPosition ) {

						//  No overlap next entry, put in output list.

						proteinCoverageItemListOutput.push( proteinCoverageItem );

					} else {

						splitAnEntryThisIterationOfLoop = true;

						splitAnyEntries = true;

						if ( proteinCoverageItem.proteinStartPosition === proteinCoverageItemNext.proteinStartPosition ) {

							//  Same start point, the current entry is longer so split to end of next and what is left

							//  Split current entry to before next next entry and starts at next entry
							let proteinCoverageItemSplitBefore = {
								proteinCoverageDataItems: this._copyArray( proteinCoverageItem.proteinCoverageDataItems ),
								proteinStartPosition: proteinCoverageItem.proteinStartPosition,
								proteinEndPosition: proteinCoverageItemNext.proteinEndPosition,
								proteinSequenceVersionId : proteinCoverageItemNext.proteinSequenceVersionId
							};
							let proteinCoverageItemSplitAfter = {
								proteinCoverageDataItems: this._copyArray( proteinCoverageItem.proteinCoverageDataItems ),
								proteinStartPosition: proteinCoverageItemNext.proteinEndPosition + 1,
								proteinEndPosition: proteinCoverageItem.proteinEndPosition,
								proteinSequenceVersionId : proteinCoverageItemNext.proteinSequenceVersionId
							};

							proteinCoverageItemListOutput.push( proteinCoverageItemSplitBefore );
							proteinCoverageItemListOutput.push( proteinCoverageItemSplitAfter );

						} else {
							//  Split current entry to before next entry and starts at next entry

							let proteinCoverageItemSplitBefore = {
								proteinCoverageDataItems: this._copyArray( proteinCoverageItem.proteinCoverageDataItems ),
								proteinStartPosition: proteinCoverageItem.proteinStartPosition,
								proteinEndPosition: ( proteinCoverageItemNext.proteinStartPosition - 1 ),
								proteinSequenceVersionId : proteinCoverageItemNext.proteinSequenceVersionId
							};
							let proteinCoverageItemSplitAfter = {
								proteinCoverageDataItems: this._copyArray( proteinCoverageItem.proteinCoverageDataItems ),
								proteinStartPosition: proteinCoverageItemNext.proteinStartPosition,
								proteinEndPosition: proteinCoverageItem.proteinEndPosition,
								proteinSequenceVersionId : proteinCoverageItemNext.proteinSequenceVersionId
							};
							proteinCoverageItemListOutput.push( proteinCoverageItemSplitBefore );
							proteinCoverageItemListOutput.push( proteinCoverageItemSplitAfter );
						}
					}
				}
			}
			// Combine entries with same start and end positions
			proteinCoverageItemListOutput = this._combineEntriesProteinPositionBased( numTimesSplitAnEntryLoop, proteinCoverageItemListOutput);
		}
		return { splitAnyEntries: splitAnyEntries, outputList: proteinCoverageItemListOutput };
	};

	/*
	 * Combine entries with same start and end positions
	 */
	_combineEntriesProteinPositionBased( numTimesSplitAnEntryLoop : number, proteinCoverageItemListInput  : Array<{ proteinStartPosition : number, proteinEndPosition: number, proteinSequenceVersionId : number, proteinCoverageDataItems : Array<{ reportedPeptideId : number }> }> )
		: Array<{proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}> {

		let proteinCoverageItemListOutput : Array<{proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}> = [];

		proteinCoverageItemListInput.sort( this._combineOverlaps_Z_compareForSortBlocks );

		let index = -1; //  Incremented in outer and inner while loops
		
		while ( ( ++index ) < proteinCoverageItemListInput.length ) {

			let proteinCoverageItem : {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]} = proteinCoverageItemListInput[ index ];

			if ( index === ( proteinCoverageItemListInput.length - 1 ) ) {

				//  if is last entry( and not processed yet below ), put in output list.

				proteinCoverageItemListOutput.push( proteinCoverageItem );

			} else {

				let indexNext = index;

				while ( ( ++indexNext ) < proteinCoverageItemListInput.length ) {

					let proteinCoverageItemNext = proteinCoverageItemListInput[ indexNext ];

					if ( proteinCoverageItem.proteinStartPosition === proteinCoverageItemNext.proteinStartPosition
							&& proteinCoverageItem.proteinEndPosition === proteinCoverageItemNext.proteinEndPosition ) {

						index = indexNext;
						proteinCoverageItem.proteinCoverageDataItems = 
							this._concatArrays( 
									proteinCoverageItem.proteinCoverageDataItems, proteinCoverageItemNext.proteinCoverageDataItems );
					} else {
						break;
					}
				}
				proteinCoverageItemListOutput.push( proteinCoverageItem );
			}
		}
		return proteinCoverageItemListOutput;
	}
	
	///////////
	
	//  Utility functions

	/*
	 * Sort Function: Sort by start position ascending then end position descending
	 * 
	 * called by array.sort( this._combineOverlaps_Z_compareForSortBlocks )
	 */
	_combineOverlaps_Z_compareForSortBlocks(
		a : { proteinStartPosition : number, proteinEndPosition: number, proteinSequenceVersionId : number, proteinCoverageDataItems : Array<{ reportedPeptideId : number }> },
		b : { proteinStartPosition : number, proteinEndPosition: number, proteinSequenceVersionId : number, proteinCoverageDataItems : Array<{ reportedPeptideId : number }> }
	) {
		
		// StartPosition ascending
		if ( a.proteinStartPosition < b.proteinStartPosition ) {
			return -1;
		}
		if ( a.proteinStartPosition > b.proteinStartPosition ) {
			return 1;
		}
		
		// EndPosition descending
		if ( a.proteinEndPosition > b.proteinEndPosition ) {
			return -1;
		}
		if ( a.proteinEndPosition < b.proteinEndPosition ) {
			return 1;
		}
		
		//  Both Start and End Positions Match
		return 0;
	}

	/*
	 * Shallow Copy Array
	 */
	_copyArray( inputArray :  {reportedPeptideId: number}[] ) : {reportedPeptideId: number}[] {

		return inputArray.concat();
	}

	/*
	 * Shallow Concat Two Arrays
	 */
	_concatArrays( inputArray1 :  {reportedPeptideId: number}[], inputArray2 :  {reportedPeptideId: number}[] ) : {reportedPeptideId: number}[] {

		return inputArray1.concat( inputArray2 );
	}

}