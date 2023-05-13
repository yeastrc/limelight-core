package org.yeastrc.limelight.limelight_shared.protein_coverage_common;

import org.yeastrc.limelight.limelight_shared.constants.Limelight__Protein_PrePostResidue_Contants;

/**
 * Compute String protein_PreResidue, String protein_PostResidue
 *
 */
public class Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util {
	
	/**
	 * Result
	 *
	 */
	public static class Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util__Result {
		
		private String protein_PreResidue;
		private String protein_PostResidue;
		private boolean peptideAtProteinStart_Flag;  //  peptide at start of protein
		private boolean peptideAtProteinEnd_Flag;  //  peptide at end of protein
		
		public String getProtein_PreResidue() {
			return protein_PreResidue;
		}
		public String getProtein_PostResidue() {
			return protein_PostResidue;
		}
		public boolean isPeptideAtProteinStart_Flag() {
			return peptideAtProteinStart_Flag;
		}
		public boolean isPeptideAtProteinEnd_Flag() {
			return peptideAtProteinEnd_Flag;
		}
	}
	
	/**
	 * @param proteinSequence
	 * @param peptideStartPosition_InProtein
	 * @param peptideEndPosition_InProtein
	 * @return
	 */
	public static Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util__Result
	compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util(
		
			String proteinSequence,
			int peptideStartPosition_InProtein, // 1 based
			int peptideEndPosition_InProtein  // 1 based
			) {

		String protein_PreResidue = null;
		String protein_PostResidue = null;

		boolean peptideAtProteinStart_Flag = false;  //  peptide at start of protein
		boolean peptideAtProteinEnd_Flag = false;    //  peptide at end of protein
		
		if ( peptideStartPosition_InProtein == 1 ) {
			protein_PreResidue = Limelight__Protein_PrePostResidue_Contants.PROTEIN__PRE_RESIDUE__N_TERMINUS;
			peptideAtProteinStart_Flag = true;
		} else {

			// Subtract 1 for prev char and 1 for go from 1 based position to Zero based index
			int preResidue_Position_Index_ZeroBased = peptideStartPosition_InProtein - 2; 

			protein_PreResidue = 
					proteinSequence.substring( preResidue_Position_Index_ZeroBased, preResidue_Position_Index_ZeroBased + 1 );
		}

		if ( peptideEndPosition_InProtein == proteinSequence.length() ) {
			protein_PostResidue = Limelight__Protein_PrePostResidue_Contants.PROTEIN__POST_RESIDUE__C_TERMINUS;
			peptideAtProteinEnd_Flag = true;
		} else {

			// No Subtract or add since go from 1 based position to Zero based index
			int postResidue_Position_Index_ZeroBased = peptideEndPosition_InProtein;

			protein_PostResidue = 
					proteinSequence.substring( postResidue_Position_Index_ZeroBased, postResidue_Position_Index_ZeroBased + 1 );
		}
		
		Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util__Result result = new Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util__Result();
		
		result.protein_PreResidue = protein_PreResidue;
		result.protein_PostResidue = protein_PostResidue;
		result.peptideAtProteinStart_Flag = peptideAtProteinStart_Flag;
		result.peptideAtProteinEnd_Flag = peptideAtProteinEnd_Flag;
		
		return result;
	}
	
}
