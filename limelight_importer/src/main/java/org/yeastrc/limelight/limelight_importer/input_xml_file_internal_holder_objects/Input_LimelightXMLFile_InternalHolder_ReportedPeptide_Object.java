package org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects;

import java.util.Map;
import java.util.Set;

import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_shared.dto.PeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;

/**
 * Holds InputLimelightXMLFile object of class 'ReportedPeptide'
 * 
 * and holder objects of child objects of object of class 'ReportedPeptide'
 *
 */
public class Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object {

	private ReportedPeptide reportedPeptide;
	
	ReportedPeptideDTO reportedPeptideDTO;
	PeptideDTO peptideDTO;
	
	private Set<Integer> proteinVersionIdsForReportedPeptide;
	private Map<Integer,Set<String>> proteinResidueLetters_AllProteins_Map_Key_PeptidePosition;
	
	/**
	 * constructor
	 * 
	 * @param reportedPeptide
	 */
	public Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object( ReportedPeptide reportedPeptide ) {
		
		this.reportedPeptide = reportedPeptide;
		
		
	}

	public ReportedPeptide getReportedPeptide() {
		return reportedPeptide;
	}

	public ReportedPeptideDTO getReportedPeptideDTO() {
		return reportedPeptideDTO;
	}

	public void setReportedPeptideDTO(ReportedPeptideDTO reportedPeptideDTO) {
		this.reportedPeptideDTO = reportedPeptideDTO;
	}

	public PeptideDTO getPeptideDTO() {
		return peptideDTO;
	}

	public void setPeptideDTO(PeptideDTO peptideDTO) {
		this.peptideDTO = peptideDTO;
	}

	public Set<Integer> getProteinVersionIdsForReportedPeptide() {
		return proteinVersionIdsForReportedPeptide;
	}

	public void setProteinVersionIdsForReportedPeptide(Set<Integer> proteinVersionIdsForReportedPeptide) {
		this.proteinVersionIdsForReportedPeptide = proteinVersionIdsForReportedPeptide;
	}

	public Map<Integer, Set<String>> getProteinResidueLetters_AllProteins_Map_Key_PeptidePosition() {
		return proteinResidueLetters_AllProteins_Map_Key_PeptidePosition;
	}

	public void setProteinResidueLetters_AllProteins_Map_Key_PeptidePosition(
			Map<Integer, Set<String>> proteinResidueLetters_AllProteins_Map_Key_PeptidePosition) {
		this.proteinResidueLetters_AllProteins_Map_Key_PeptidePosition = proteinResidueLetters_AllProteins_Map_Key_PeptidePosition;
	}
}
