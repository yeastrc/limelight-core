/**
 * reportedPeptideStringData_For_ReportedPeptideId.ts
 * 
 * Javascript - Holds Reported Peptide String Data for a single Reported Peptide Id
 * 
 */


/**
 * 
 */
export class ReportedPeptideStringData_For_ReportedPeptideId {

	private _reportedPeptideString;

	/**
	 * 
	 */
	constructor( { reportedPeptideString } ) {
		
		this._reportedPeptideString = reportedPeptideString;
		
		//  Computed in this class and cached
		
	}

	/**
	 * 
	 */
	getReportedPeptideString() {
		return this._reportedPeptideString;
	}

}