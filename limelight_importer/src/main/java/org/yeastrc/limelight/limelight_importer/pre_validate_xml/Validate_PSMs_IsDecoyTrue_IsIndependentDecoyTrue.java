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
 * Error if any PSMs have attr is_independent_decoy="true"  and attr is_independent_decoy="true" 
 * 
 */
public class Validate_PSMs_IsDecoyTrue_IsIndependentDecoyTrue {
	
	private static final Logger log = LoggerFactory.getLogger( Validate_PSMs_IsDecoyTrue_IsIndependentDecoyTrue.class );
	
	private Validate_PSMs_IsDecoyTrue_IsIndependentDecoyTrue() { }
	public static Validate_PSMs_IsDecoyTrue_IsIndependentDecoyTrue getInstance() {
		return new Validate_PSMs_IsDecoyTrue_IsIndependentDecoyTrue();
	}
	
	/**
	 * 
	 *
	 */
	private static class InternalData {

	}
	
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validate_PSMs_IsDecoyTrue_IsIndependentDecoyTrue( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		//  Validate all PSM 
		
		InternalData internalData = new InternalData();

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
		
		if ( psm.isIsDecoy() != null && psm.isIsDecoy().booleanValue()
				&& psm.isIsIndependentDecoy() != null && psm.isIsIndependentDecoy().booleanValue() ) {

			String msg = "Found PSM with is_decoy = 'true' and is_independent_decoy = 'true'.";
			log.error( msg );
			throw new LimelightImporterDataException( msg );
		}
	}
			
}
