package org.yeastrc.limelight.limelight_importer.pre_validate_xml;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Validate that if any PSMs have attr is_independent_decoy="true" that the search contains <fasta_file_statistics>
 * 
 */
public class Validate_PSMs_IsIndependentDecoyTrue_SearchHas_FastaFileStatistics {
	
	private static final Logger log = LoggerFactory.getLogger( Validate_PSMs_IsIndependentDecoyTrue_SearchHas_FastaFileStatistics.class );
	
	private Validate_PSMs_IsIndependentDecoyTrue_SearchHas_FastaFileStatistics() { }
	public static Validate_PSMs_IsIndependentDecoyTrue_SearchHas_FastaFileStatistics getInstance() {
		return new Validate_PSMs_IsIndependentDecoyTrue_SearchHas_FastaFileStatistics();
	}
	
	/**
	 * 
	 *
	 */
	private static class InternalData {

		boolean searchHas_FastaFileStatistics_And_NumIndependentDecoys = false;
	}
	
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validate_PSMs_IsIndependentDecoyTrue_SearchHas_FastaFileStatistics( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		//  Validate all PSM 
		
		InternalData internalData = new InternalData();

		if ( limelightInput.getFastaFileStatistics() != null 
				&& limelightInput.getFastaFileStatistics().getNumIndependentDecoys() != null 
				&& limelightInput.getFastaFileStatistics().getNumIndependentDecoys().longValue() > 0 ) {
			
			internalData.searchHas_FastaFileStatistics_And_NumIndependentDecoys = true;
		}
		

		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		
		if ( reportedPeptides != null ) {
			
			List<ReportedPeptide> reportedPeptideList =	reportedPeptides.getReportedPeptide();
			
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {

				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					validateOnSingleReportedPeptideAndItsPSMs( reportedPeptide, internalData );
				}
			}
		}
	}

	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validateOnSingleReportedPeptideAndItsPSMs( ReportedPeptide reportedPeptide, InternalData internalData ) throws LimelightImporterDataException {
	
		if ( reportedPeptide.getPsms() != null ) {
			for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
				
				validateOnSinglePSM( psm, reportedPeptide, internalData );
			}
		}
	}

	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validateOnSinglePSM( 
			Psm psm,
			ReportedPeptide reportedPeptide,
			InternalData internalData ) throws LimelightImporterDataException {
		
		if ( psm.isIsIndependentDecoy() != null && psm.isIsIndependentDecoy().booleanValue() ) {
			if ( ! internalData.searchHas_FastaFileStatistics_And_NumIndependentDecoys ) {
				String msg = "Found PSM with is_independent_decoy = 'true' and <fasta_file_statistics> is not populated or <fasta_file_statistics num_independent_decoys=\"\" > is not populated or is zero.";
				log.error( msg );
				throw new LimelightImporterDataException( msg );
				
			}
		}
	}
			
}
