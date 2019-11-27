/**
 * proteinSequenceData_For_ProteinSequenceVersionId.ts
 * 
 * Javascript - Holds Protein Sequence Data for a single Protein Sequence Version Id
 * 
 * Created to hold the sequence as an array of characters if that is requested.
 */


/**
 * 
 */
export class ProteinSequenceData_For_ProteinSequenceVersionId {

	private _proteinSequence : string;
	private _proteinSequenceAsArray : Array<string>;

	/**
	 * 
	 */
	constructor(  { proteinSequence } : { proteinSequence : string } ) {
		
		this._proteinSequence = proteinSequence;
		
		//  Computed in this class and cached
		
		this._proteinSequenceAsArray = undefined;
	}

	/**
	 * 
	 */
	getProteinSequence() {
		return this._proteinSequence;
	}

	/**
	 * 
	 */
	getProteinSequenceAsCharArray() : Array<string> {
		if ( this._proteinSequenceAsArray ) {
			return this._proteinSequenceAsArray;
		}
		
		this._proteinSequenceAsArray = this._proteinSequence.split("");
		
		return this._proteinSequenceAsArray;
	}
}