/**
 * proteinView_LoadedDataCommonHolder.ts
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

import { limelight__IsVariableAString } from 'page_js/common_all_pages/limelight__IsVariableAString';

import { ProteinSequenceData_For_ProteinSequenceVersionId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinSequenceData_For_ProteinSequenceVersionId';
import { ReportedPeptideStringData_For_ReportedPeptideId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/reportedPeptideStringData_For_ReportedPeptideId'

/**
 * 
 */
export class ProteinView_LoadedDataCommonHolder {

	//  Per proteinSequenceVersionId
	private _proteinSequenceData_KeyProteinSequenceVersionId : Map<number, ProteinSequenceData_For_ProteinSequenceVersionId> = undefined; // Map <integer,Object> <proteinSequenceVersionId, ProteinSequenceData_For_ProteinSequenceVersionId>

	//  Per reportedPeptideId
	private _reportedPeptideStringData_KeyReportedPeptideId : Map<number, ReportedPeptideStringData_For_ReportedPeptideId> = undefined; // Map <integer,Object> <reportedPeptideId, ReportedPeptideStringData_For_ReportedPeptideId>

	//  Per peptideId
	private _peptideSequenceString_KeyPeptideId : Map<number, string> = undefined; // Map <integer,String> <peptideId, peptideSequence>

	//  Per peptideId - 	Peptide String with replace I with L
	private _peptideSequenceString_I_To_L_KeyPeptideId : Map<number, string> = new Map(); // Map <integer,String> <peptideId, peptideSequence (after .replace('I','L'>

	/**
	 * 
	 */
	constructor() {
	}
	
	//  _proteinSequenceData_KeyProteinSequenceVersionId

	//  Not Used
	// get_proteinSequenceData_KeyProteinSequenceVersionId() : Map<number, ProteinSequenceData_For_ProteinSequenceVersionId> {
	// 	return this._proteinSequenceData_KeyProteinSequenceVersionId;
	// }
	// set_proteinSequenceData_KeyProteinSequenceVersionId( proteinSequenceData_KeyProteinSequenceVersionId : Map<number, ProteinSequenceData_For_ProteinSequenceVersionId> ) : void {
	// 	this._proteinSequenceData_KeyProteinSequenceVersionId = proteinSequenceData_KeyProteinSequenceVersionId;
	// }

	add_proteinSequenceData_KeyProteinSequenceVersionId({ 
		proteinSequenceData, 
		proteinSequenceVersionId 
	} : { 
		proteinSequenceData : ProteinSequenceData_For_ProteinSequenceVersionId, 
		proteinSequenceVersionId : number
	} ) : void {
		if ( ! ( proteinSequenceData instanceof ProteinSequenceData_For_ProteinSequenceVersionId ) ) {
			const msg = "add_proteinSequenceData_KeyProteinSequenceVersionId: ! ( proteinSequenceData instanceof ProteinSequenceData_For_ProteinSequenceVersionId )";
			console.warn( msg, proteinSequenceData )
			throw Error( msg );
		}
		if ( ! ( Number.isInteger( proteinSequenceVersionId ) ) ) {
			const msg = "add_proteinSequenceData_KeyProteinSequenceVersionId: ! ( Number.isInteger( proteinSequenceVersionId )";
			console.warn( msg, proteinSequenceVersionId )
			throw Error( msg );
		}
		if ( ! this._proteinSequenceData_KeyProteinSequenceVersionId ) {
			this._proteinSequenceData_KeyProteinSequenceVersionId = new Map();
		}
		this._proteinSequenceData_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, proteinSequenceData );
	}
	get_proteinSequenceData_For_proteinSequenceVersionId( { proteinSequenceVersionId } : { proteinSequenceVersionId : number } ) : ProteinSequenceData_For_ProteinSequenceVersionId {
		if ( ! ( Number.isInteger( proteinSequenceVersionId ) ) ) {
			const msg = "get_proteinSequenceData_For_proteinSequenceVersionId: ! ( Number.isInteger( proteinSequenceVersionId )";
			console.warn( msg, proteinSequenceVersionId )
			throw Error( msg );
		}
		if ( ! this._proteinSequenceData_KeyProteinSequenceVersionId ) {
			return undefined;
		}
		return this._proteinSequenceData_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
	}

	//  _reportedPeptideStringData_KeyReportedPeptideId

	//  Not Used
	// get_reportedPeptideStringData_KeyReportedPeptideId() : Map<number, ReportedPeptideStringData_For_ReportedPeptideId> {
	// 	return this._reportedPeptideStringData_KeyReportedPeptideId;
	// }
	// set_reportedPeptideStringData_KeyReportedPeptideId( reportedPeptideStringData_KeyReportedPeptideId : Map<number, ReportedPeptideStringData_For_ReportedPeptideId> ) : void {
	// 	this._reportedPeptideStringData_KeyReportedPeptideId = reportedPeptideStringData_KeyReportedPeptideId;
	// }

	add_reportedPeptideStringData_KeyReportedPeptideId( { 
		reportedPeptideStringData, 
		reportedPeptideId 
	} : { 
		reportedPeptideStringData : ReportedPeptideStringData_For_ReportedPeptideId, 
		reportedPeptideId : number
	} ) : void {
		if ( ! ( reportedPeptideStringData instanceof ReportedPeptideStringData_For_ReportedPeptideId ) ) {
			const msg = "add_reportedPeptideStringData_KeyReportedPeptideId: ! ( reportedPeptideStringData instanceof ReportedPeptideStringData_For_ReportedPeptideId )";
			console.warn( msg, reportedPeptideStringData )
			throw Error( msg );
		}
		if ( ! ( Number.isInteger( reportedPeptideId ) ) ) {
			const msg = "add_reportedPeptideStringData_KeyReportedPeptideId: ! ( Number.isInteger( reportedPeptideId )";
			console.warn( msg, reportedPeptideId )
			throw Error( msg );
		}
		if ( ! this._reportedPeptideStringData_KeyReportedPeptideId ) {
			this._reportedPeptideStringData_KeyReportedPeptideId = new Map();
		}
		this._reportedPeptideStringData_KeyReportedPeptideId.set( reportedPeptideId, reportedPeptideStringData );
	}
	get_reportedPeptideStringData_For_reportedPeptideId( { reportedPeptideId } : { reportedPeptideId : number } ) : ReportedPeptideStringData_For_ReportedPeptideId {
		if ( ! ( Number.isInteger( reportedPeptideId ) ) ) {
			const msg = "get_reportedPeptideStringData_For_reportedPeptideId: ! ( Number.isInteger( reportedPeptideId )";
			console.warn( msg, reportedPeptideId )
			throw Error( msg );
		}
		if ( ! this._reportedPeptideStringData_KeyReportedPeptideId ) {
			return undefined;
		}
		return this._reportedPeptideStringData_KeyReportedPeptideId.get( reportedPeptideId );
	}

	//  _peptideSequenceString_KeyPeptideId

	//  Not Used
	// get_peptideSequenceString_KeyPeptideId() : Map<number, string> {
	// 	return this._peptideSequenceString_KeyPeptideId;
	// }
	// set_peptideSequenceString_KeyPeptideId( peptideSequenceString_KeyPeptideId : Map<number, string> ) : void {
	// 	this._peptideSequenceString_KeyPeptideId = peptideSequenceString_KeyPeptideId;
	// }

	add_peptideSequenceString_KeyPeptideId( { 
		peptideSequenceString, 
		peptideId 
	} : { 
		peptideSequenceString : string, 
		peptideId : number
	} ) : void {
		if ( ! limelight__IsVariableAString( peptideSequenceString ) ) {
			const msg = "add_peptideSequenceString_KeyPeptideId: ! ( limelight__IsVariableAString( peptideSequenceString ) )";
			console.warn( msg, peptideSequenceString )
			throw Error( msg );
		}
		if ( ! ( Number.isInteger( peptideId ) ) ) {
			const msg = "add_peptideSequenceString_KeyPeptideId: ! ( Number.isInteger( peptideId )";
			console.warn( msg, peptideId )
			throw Error( msg );
		}
		if ( ! this._peptideSequenceString_KeyPeptideId ) {
			this._peptideSequenceString_KeyPeptideId = new Map();
		}
		this._peptideSequenceString_KeyPeptideId.set( peptideId, peptideSequenceString );
	}
	get_peptideSequenceString_For_peptideId( { peptideId } : { peptideId : number } ) : string {
		if ( ! ( Number.isInteger( peptideId ) ) ) {
			const msg = "get_peptideSequenceString_For_peptideId: ! ( Number.isInteger( peptideId )";
			console.warn( msg, peptideId )
			throw Error( msg );
		}
		if ( ! this._peptideSequenceString_KeyPeptideId ) {
			return undefined;
		}
		return this._peptideSequenceString_KeyPeptideId.get( peptideId );
	}

	////  Peptide String replace I with L

	/**
	 *  Get Peptide String with replace I with L
	 */
	get_peptideSequenceString_I_To_L_For_peptideId( { peptideId } : { peptideId : number } ) : string {
		if ( ! ( Number.isInteger( peptideId ) ) ) {
			const msg = "get_peptideSequenceString_For_peptideId: ! ( Number.isInteger( peptideId )";
			console.warn( msg, peptideId )
			throw Error( msg );
		}
		if ( ! this._peptideSequenceString_KeyPeptideId ) {
			return undefined;
		}
		{
			const existing_peptideSequenceString_I_To_L = this._peptideSequenceString_I_To_L_KeyPeptideId.get( peptideId );
			if ( existing_peptideSequenceString_I_To_L ) {
				return existing_peptideSequenceString_I_To_L; // EARLY RETURN
			}
		}
		const peptideSequenceString = this._peptideSequenceString_KeyPeptideId.get( peptideId );
		if ( ! peptideSequenceString ) {
			return undefined;
		}

		const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

		//  The Peptide Search Strings will be used to search the protein sequence.
		//  Reported Peptides will be selected where their Protein Coverage records fully contain
		//     the locations of the search strings on the protein sequence.

		//  The amino acid letters I and L will be equivalent.

		const peptideSequenceString_I_To_L = peptideSequenceString.replace(findAll_I_Regex,'L');
		this._peptideSequenceString_I_To_L_KeyPeptideId.set( peptideId, peptideSequenceString_I_To_L );
		return peptideSequenceString_I_To_L;
	}



}
