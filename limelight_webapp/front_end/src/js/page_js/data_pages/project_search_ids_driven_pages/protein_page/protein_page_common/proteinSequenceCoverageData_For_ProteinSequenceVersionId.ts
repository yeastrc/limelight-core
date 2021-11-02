/**
 * proteinSequenceCoverageData_For_ProteinSequenceVersionId.ts
 * 
 * Javascript for proteinView.jsp page - Holds Protein Sequence Coverage for a single Protein Sequence Version Id
 * 
 */


/**
 * 
 */
export class ProteinSequenceCoverageData_For_ProteinSequenceVersionId {

	private _proteinSequenceVersionId: number
	private _proteinLength : number;

	private _proteinCoverageEntries_PerReportedPeptideId_Array : {reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}[];
	private _proteinCoverageEntries_Map_Key_ReportedPeptideId : Map<number, Array<{proteinStartPosition: number, proteinEndPosition: number}>> = new Map();

	private _proteinCoverageMergedRanges : {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[];
	
	//  Computed in this class and cached
	
	private _proteinCoverageRatio : number;
	private _coveredPositionCount: number;

	private _booleanArrayOfProteinCoverage: Array<boolean>;

	/**
	 * 
	 */
	constructor( { proteinSequenceVersionId, proteinLength, proteinCoverageEntries_PerReportedPeptideId_Array, proteinCoverageMergedRanges } : {
		proteinSequenceVersionId: number
		proteinLength : number
		proteinCoverageEntries_PerReportedPeptideId_Array : {reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}[]
		proteinCoverageMergedRanges : {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[]
	} ) {
		if ( ! proteinCoverageEntries_PerReportedPeptideId_Array ) {
			const msg = "ProteinSequenceCoverageData_For_ProteinSequenceVersionId:constructor: ( ! proteinCoverageEntries_PerReportedPeptideId_Array )";
			console.warn(msg);
			throw Error(msg);
		}

		this._proteinSequenceVersionId = proteinSequenceVersionId;
		this._proteinLength = proteinLength;
		this._proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageEntries_PerReportedPeptideId_Array;
		this._proteinCoverageMergedRanges = proteinCoverageMergedRanges;

		for ( const proteinCoverageEntries_PerReportedPeptideId_Array_Entry of proteinCoverageEntries_PerReportedPeptideId_Array) {
			const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Array_Entry.reportedPeptideId;
			let result_MapEntry = this._proteinCoverageEntries_Map_Key_ReportedPeptideId.get( reportedPeptideId );
			if ( ! result_MapEntry ) {
				result_MapEntry = [];
				this._proteinCoverageEntries_Map_Key_ReportedPeptideId.set( reportedPeptideId, result_MapEntry );
			}
			result_MapEntry.push({
				proteinStartPosition: proteinCoverageEntries_PerReportedPeptideId_Array_Entry.proteinStartPosition,
				proteinEndPosition: proteinCoverageEntries_PerReportedPeptideId_Array_Entry.proteinEndPosition
			});
		}
	}

	/**
	 * 
	 */
	initialize() {}

	// /**
	//  * Protein Length
	//  */
	// getProteinLength() {
	//
	// 	return this._proteinLength;
	// }

	/**
	 * Protein Coverage as ratio: (number of covered positions) / (protein length)
	 */
	getProteinSequenceCoverageRatio_FilteringOnReportedPeptideIds(
		{
			reportedPeptideIds_For_Protein
		} : {
			reportedPeptideIds_For_Protein: Set<number>
		}
	) : number
	{
		const booleanArrayOfProteinCoverage: Array<boolean> = [];

		for ( const reportedPeptideId of reportedPeptideIds_For_Protein ) {

			const proteinCoverageEntries_For_ReportedPeptideId = this._proteinCoverageEntries_Map_Key_ReportedPeptideId.get( reportedPeptideId );
			if ( ! proteinCoverageEntries_For_ReportedPeptideId ) {
				const msg = "this._proteinCoverageEntries_Map_Key_ReportedPeptideId.get( reportedPeptideId ); returned NOTHING for reportedPeptideId: " + reportedPeptideId;
				console.warn(msg);
				throw Error(msg);
			}

			for ( const proteinCoverageEntry of proteinCoverageEntries_For_ReportedPeptideId ) {
				const proteinStartPosition = proteinCoverageEntry.proteinStartPosition;
				const proteinEndPosition = proteinCoverageEntry.proteinEndPosition;

				for (let position = proteinStartPosition; position <= proteinEndPosition; position++) {
					booleanArrayOfProteinCoverage[position] = true;
				}
			}
		}

		let coveredPositionCount = 0;

		const booleanArrayOfProteinCoverage_Length = booleanArrayOfProteinCoverage.length;

		for ( let index = 0; index < booleanArrayOfProteinCoverage_Length; index++ ) {
			if ( booleanArrayOfProteinCoverage[ index ] ) {
				coveredPositionCount++;
			}
		}

		const proteinCoverageRatio = coveredPositionCount / this._proteinLength;

		return proteinCoverageRatio;
	}

		/**
	 * Protein Coverage as ratio: (number of covered positions) / (protein length)
	 */
	getProteinSequenceCoverageRatio_NoFiltering() : number {
		
		if ( this._proteinCoverageRatio !== undefined ) {
			return this._proteinCoverageRatio;
		}
		
		if ( this._coveredPositionCount === undefined ) {

			//  Compute Covered Positions

			let coveredPositionCount = 0;

			for ( const mergedRanges_Entry of this._proteinCoverageMergedRanges ) {

				const numberOfPositionsInEntry = mergedRanges_Entry.proteinEndPosition - mergedRanges_Entry.proteinStartPosition + 1;
				coveredPositionCount += numberOfPositionsInEntry;
			}

			this._coveredPositionCount = coveredPositionCount;
		}
		
		this._proteinCoverageRatio = this._coveredPositionCount / this._proteinLength;

		if ( Number.isNaN( this._proteinCoverageRatio ) ) {
			throw Error("ProteinSequenceCoverageData_For_ProteinSequenceVersionId: Computed this._proteinCoverageRatio is NaN, this._coveredPositionCount: " + this._coveredPositionCount + ", this._proteinLength: " + this._proteinLength )
		}
		
		return this._proteinCoverageRatio;
	}

	/**
	 * Get Reported Peptide Ids as Set For Protein Coverage At Position
	 */
	getReportedPeptidesForProteinCoverageAtPosition( { position }: { position: number } ) : Set<number> {
		
		const booleanArrayOfProteinCoverage = this.getBooleanArrayOfProteinCoverage();
		
		if ( ! booleanArrayOfProteinCoverage[ position ] ) {
			
			return new Set();
		}
		
		//  Linear search.  Binary search would be faster
		
		const proteinCoverageMergedRanges_element = this._proteinCoverageMergedRanges.find(function(element) {
			// return boolean:  position is within element
			return element.proteinStartPosition <= position && element.proteinEndPosition >= position;
		});
		if ( proteinCoverageMergedRanges_element === undefined ) {
			return new Set();
		}
		
		const reportedPeptideIds : Set<number> = new Set();
		
		const proteinCoverageDataItems = proteinCoverageMergedRanges_element.proteinCoverageDataItems;
		
		for ( const proteinCoverageDataItem of proteinCoverageDataItems ) {
			
			reportedPeptideIds.add( proteinCoverageDataItem.reportedPeptideId );
		}
		
		return reportedPeptideIds;
	}

//	/**
//	 * Get Reported Peptide Ids as Set For Protein Coverage At Positions (a Set)
//	 */
//	getReportedPeptidesForProteinCoverageAtPositions( { positions } ) {
//
//		throw Error("Not Complete, Not Tested");
//		
//		const results_reportedPeptideIds = new Set();
//		
//		const booleanArrayOfProteinCoverage = this.getBooleanArrayOfProteinCoverage();
//		
//		//  First check if any positions in coverage boolean array
//		let foundAnyPositionsIn_booleanArrayOfProteinCoverage = false;
//		
//		for ( const position of positions ) {
//			if ( booleanArrayOfProteinCoverage[ position ] ) {
//				foundAnyPositionsIn_booleanArrayOfProteinCoverage = true;
//				break;
//			}
//		}
//		if ( ! foundAnyPositionsIn_booleanArrayOfProteinCoverage ) {
//			return new Set();
//		}
//		
//		//  Copy to array so can sort them
//		const positionsAsArray = new Array( positions );
//		positionsAsArray.sort();
//		
//		//  !!!!  This whole next section needs to be re-written to implement the Merge search
//		
//		//  Merge search of positionsAsArray and this._proteinCoverageMergedRanges
//		
//		const proteinCoverageMergedRanges_element = this._proteinCoverageMergedRanges
//
//		// return boolean:  position is within element
//			return element.proteinStartPosition <= position && element.proteinEndPosition >= position;
//		});
//		if ( proteinCoverageMergedRanges_element === undefined ) {
//			return [];
//		}
//		
//		
//		const proteinCoverageDataItems = proteinCoverageMergedRanges_element.proteinCoverageDataItems;
//		
//		for ( const proteinCoverageDataItem of proteinCoverageDataItems ) {
//			
//			results_reportedPeptideIds.add( proteinCoverageDataItem.reportedPeptideId );
//		}
//
//		throw Error("Not Complete, Not Tested");
//		
//		return results_reportedPeptideIds;
//	}
	
	// /**
	//  * Is there Protein Coverage At Position
	//  */
	// isProteinCoverageAtPosition( { position } : { position: number } ) {
	//
	// 	const booleanArrayOfProteinCoverage = this.getBooleanArrayOfProteinCoverage();
	//
	// 	if ( booleanArrayOfProteinCoverage[ position ] ) {
	// 		return true;
	// 	}
	// 	return false;
	// }
	
	/**
	 * 
	 */
	get_proteinCoverageEntries_PerReportedPeptideId_Array() {
		return this._proteinCoverageEntries_PerReportedPeptideId_Array;
	}
	
	/**
	 * Return an Array of Boolean with true in each protein position (1 based) where there is protein coverage
	 */
	getBooleanArrayOfProteinCoverage(): Array<boolean> {

		// return this._booleanArrayOfProteinCoverage or build and return it

		if ( this._booleanArrayOfProteinCoverage ) {
			
			return this._booleanArrayOfProteinCoverage;
		}
		
		const booleanArrayOfProteinCoverage: Array<boolean> = [];
		
		for ( const proteinCoverageEntries_PerReportedPeptideId_Entry of this._proteinCoverageEntries_PerReportedPeptideId_Array ) {

			// const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Entry.reportedPeptideId;
			const proteinStartPosition = proteinCoverageEntries_PerReportedPeptideId_Entry.proteinStartPosition;
			const proteinEndPosition = proteinCoverageEntries_PerReportedPeptideId_Entry.proteinEndPosition;
				
			for ( let position = proteinStartPosition; position <= proteinEndPosition; position++ ) {
				booleanArrayOfProteinCoverage[ position ] = true;
			}
		}

		this._booleanArrayOfProteinCoverage = booleanArrayOfProteinCoverage;
		
		return this._booleanArrayOfProteinCoverage;
	}
	
	
	
}