/**
 * proteinSequenceFormattedDisplay_widget_SequenceCoverageParam.js
 * 
 * Javascript for Widget for displaying the Protein Sequence Formatted  
 * 
 * Provides interactive selecting of positions in Protein Sequence
 * 
 * Provides highlighting of Protein Coverage
 * 
 * !!!!!!!!!  One option is to use object of class ProteinSequenceCoverageData_For_ProteinSequenceVersionId which is under the protein_page folder  !!!!!!!
 * 
 * Another option is to provide an array (position is '1' based) of boolean with true for is sequence coverage
 * 
 */


/**
 * 
 */
export class ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam {

	/**
     * Exactly 1 of the parameters proteinCoverageObject, coverageArrayOfBoolean must be populated (but not both)
     * 
	 * proteinCoverageObject : class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
     * coverageArrayOfBoolean : Array (position is '1' based) of boolean with true for is sequence coverage 
	 */
	constructor( { proteinCoverageObject, coverageArrayOfBoolean }) {

        if ( ( ! proteinCoverageObject ) && ( ! coverageArrayOfBoolean ) ) {
            throw Error("proteinCoverageObject or coverageArrayOfBoolean must be populated, but not both");
        }
        if ( proteinCoverageObject && coverageArrayOfBoolean ) {
            throw Error("proteinCoverageObject and coverageArrayOfBoolean cannot be both populated");
        }

        this._proteinCoverageObject = proteinCoverageObject;
        this._coverageArrayOfBoolean = coverageArrayOfBoolean;
    }

	/**
     * Is there Protein Coverage At Position
	 */
    isProteinCoverageAtPosition({ position}) {

        if ( this._proteinCoverageObject ) {
            return this._proteinCoverageObject.isProteinCoverageAtPosition({ position});
        }
        if ( this._coverageArrayOfBoolean[ position] ) {
            return true;
        }
        return false;
    }

}
