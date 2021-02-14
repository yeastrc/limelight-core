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

	private _reportedPeptideString : string;

	/**
	 * 
	 */
	constructor( { reportedPeptideString } : { reportedPeptideString : string } ) {
		
		this._reportedPeptideString = reportedPeptideString;
		
		//  Computed in this class and cached
		
	}

	/**
	 * 
	 */
	getReportedPeptideString()  : string {
		return this._reportedPeptideString;
	}

}