/**
 * controllerPaths_forDataPages_FromDOM.ts
 * 
 * Javascript:   Controller Path for current page, placed on DOM by server code
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

let controller_path_QC_Cached: string = undefined;
let controller_path_Peptide_Cached: string = undefined;
let controller_path_Protein_Cached: string = undefined;
let controller_path_Mod_Cached: string = undefined;

/**
 * 
 */
export class ControllerPaths_forDataPages_FromDOM {

	/**
	 * 
	 */
	constructor() {}

	/**
	 * Controller Path for QC page, placed on DOM by server code
	 */
	static controllerPath_QC_Page_FromDOM(): string {
		
		if ( controller_path_QC_Cached ) {
			return controller_path_QC_Cached;
		}

		const controller_path_qc_DOM = document.getElementById("controller_path_qc");
		if ( ! controller_path_qc_DOM ) {
			throw Error( "No page element with id 'controller_path_qc'.  controller_path_qc is set on the JSP. " );
		}
		const controller_path_qc  = controller_path_qc_DOM.textContent;
		if ( controller_path_qc === undefined || controller_path_qc === null || controller_path_qc === "" ) {
			throw Error( "Page element with id 'controller_path_qc' not populated.  controller_path_qc is specific to a page. controller_path_qc is set on the JSP." );
		}

		controller_path_QC_Cached = controller_path_qc;
		
		return controller_path_qc;
	}

	/**
	 * Controller Path for Peptide page, placed on DOM by server code
	 */
	static controllerPath_Peptide_Page_FromDOM(): string {

		if ( controller_path_Peptide_Cached ) {
			return controller_path_Peptide_Cached;
		}

		const controller_path_peptide_DOM = document.getElementById("controller_path_peptide");
		if ( ! controller_path_peptide_DOM ) {
			throw Error( "No page element with id 'controller_path_peptide'.  controller_path_peptide is set on the JSP. " );
		}
		const controller_path_peptide  = controller_path_peptide_DOM.textContent;
		if ( controller_path_peptide === undefined || controller_path_peptide === null || controller_path_peptide === "" ) {
			throw Error( "Page element with id 'controller_path_peptide' not populated.  controller_path_peptide is specific to a page. controller_path_peptide is set on the JSP." );
		}

		controller_path_Peptide_Cached = controller_path_peptide;

		return controller_path_peptide;
	}

	/**
	 * Controller Path for Protein page, placed on DOM by server code
	 */
	static controllerPath_Protein_Page_FromDOM(): string {

		if ( controller_path_Protein_Cached ) {
			return controller_path_Protein_Cached;
		}

		const controller_path_protein_DOM = document.getElementById("controller_path_protein");
		if ( ! controller_path_protein_DOM ) {
			throw Error( "No page element with id 'controller_path_protein'.  controller_path_protein is set on the JSP. " );
		}
		const controller_path_protein  = controller_path_protein_DOM.textContent;
		if ( controller_path_protein === undefined || controller_path_protein === null || controller_path_protein === "" ) {
			throw Error( "Page element with id 'controller_path_protein' not populated.  controller_path_protein is specific to a page. controller_path_protein is set on the JSP." );
		}

		controller_path_Protein_Cached = controller_path_protein;

		return controller_path_protein;
	}

	/**
	 * Controller Path for Mod page, placed on DOM by server code
	 */
	static controllerPath_Mod_Page_FromDOM(): string {

		if ( controller_path_Mod_Cached ) {
			return controller_path_Mod_Cached;
		}

		const controller_path_mod_DOM = document.getElementById("controller_path_mod");
		if ( ! controller_path_mod_DOM ) {
			throw Error( "No page element with id 'controller_path_mod'.  controller_path_mod is set on the JSP. " );
		}
		const controller_path_mod  = controller_path_mod_DOM.textContent;
		if ( controller_path_mod === undefined || controller_path_mod === null || controller_path_mod === "" ) {
			throw Error( "Page element with id 'controller_path_mod' not populated.  controller_path_mod is specific to a page. controller_path_mod is set on the JSP." );
		}

		controller_path_Mod_Cached = controller_path_mod;

		return controller_path_mod;
	}


}