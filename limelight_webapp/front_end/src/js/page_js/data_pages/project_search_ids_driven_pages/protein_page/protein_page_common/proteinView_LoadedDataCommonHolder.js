/**
 * proteinView_LoadedDataCommonHolder.js
 * 
 * Javascript for proteinView.jsp page - Holds Loaded Data Common across Project Search Id  
 * 
 * 
 * The plan is to not store data tied to current Project Search Ids or current cutoffs/filters so this data can just remain loaded.
 * 
 * Stores data:
 * 
 *  protein sequences
 *  reported peptide string
 * 
 * 
 */


/**
 * 
 */
export class ProteinView_LoadedDataCommonHolder {

	/**
	 * 
	 */
	constructor() {
		
		//  Per proteinSequenceVersionId
		this._proteinSequenceData_KeyProteinSequenceVersionId = undefined; // Map <integer,Object> <proteinSequenceVersionId, ProteinSequenceData_For_ProteinSequenceVersionId>

		//  Per reportedPeptideId
		this._reportedPeptideStringData_KeyReportedPeptideId = undefined; // Map <integer,Object> <reportedPeptideId, ReportedPeptideStringData_For_ReportedPeptideId>

		//  Per peptideId
		this._peptideSequenceString_KeyPeptideId = undefined; // Map <integer,String> <peptideId, PeptideSequence>
	}
	
	//  _proteinSequenceData_KeyProteinSequenceVersionId

	get_proteinSequenceData_KeyProteinSequenceVersionId() {
		return this._proteinSequenceData_KeyProteinSequenceVersionId;
	}
	set_proteinSequenceData_KeyProteinSequenceVersionId( proteinSequenceData_KeyProteinSequenceVersionId ) {
		this._proteinSequenceData_KeyProteinSequenceVersionId = proteinSequenceData_KeyProteinSequenceVersionId;
	}

	add_proteinSequenceData_KeyProteinSequenceVersionId( { proteinSequenceData, proteinSequenceVersionId } ) {
		if ( ! this._proteinSequenceData_KeyProteinSequenceVersionId ) {
			this._proteinSequenceData_KeyProteinSequenceVersionId = new Map();
		}
		this._proteinSequenceData_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, proteinSequenceData );
	}
	get_proteinSequenceData_For_proteinSequenceVersionId( { proteinSequenceVersionId } ) {
		if ( ! this._proteinSequenceData_KeyProteinSequenceVersionId ) {
			return undefined;
		}
		return this._proteinSequenceData_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
	}

	//  _reportedPeptideStringData_KeyReportedPeptideId

	get_reportedPeptideStringData_KeyReportedPeptideId() {
		return this._reportedPeptideStringData_KeyReportedPeptideId;
	}
	set_reportedPeptideStringData_KeyReportedPeptideId( reportedPeptideStringData_KeyReportedPeptideId ) {
		this._reportedPeptideStringData_KeyReportedPeptideId = reportedPeptideStringData_KeyReportedPeptideId;
	}

	add_reportedPeptideStringData_KeyReportedPeptideId( { reportedPeptideStringData, reportedPeptideId } ) {
		if ( ! this._reportedPeptideStringData_KeyReportedPeptideId ) {
			this._reportedPeptideStringData_KeyReportedPeptideId = new Map();
		}
		this._reportedPeptideStringData_KeyReportedPeptideId.set( reportedPeptideId, reportedPeptideStringData );
	}
	get_reportedPeptideStringData_For_reportedPeptideId( { reportedPeptideId } ) {
		if ( ! this._reportedPeptideStringData_KeyReportedPeptideId ) {
			return undefined;
		}
		return this._reportedPeptideStringData_KeyReportedPeptideId.get( reportedPeptideId );
	}

	//  _peptideSequenceString_KeyPeptideId

	get_peptideSequenceString_KeyPeptideId() {
		return this._peptideSequenceString_KeyPeptideId;
	}
	set_peptideSequenceString_KeyPeptideId( peptideSequenceString_KeyPeptideId ) {
		this._peptideSequenceString_KeyPeptideId = peptideSequenceString_KeyPeptideId;
	}

	add_peptideSequenceString_KeyPeptideId( { peptideSequenceString, peptideId } ) {
		if ( ! this._peptideSequenceString_KeyPeptideId ) {
			this._peptideSequenceString_KeyPeptideId = new Map();
		}
		this._peptideSequenceString_KeyPeptideId.set( peptideId, peptideSequenceString );
	}
	get_peptideSequenceString_For_peptideId( { peptideId } ) {
		if ( ! this._peptideSequenceString_KeyPeptideId ) {
			return undefined;
		}
		return this._peptideSequenceString_KeyPeptideId.get( peptideId );
	}
}