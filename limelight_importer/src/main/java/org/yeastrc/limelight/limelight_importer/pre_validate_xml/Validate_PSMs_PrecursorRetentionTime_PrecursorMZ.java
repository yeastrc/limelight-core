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
 * Validate that all PSMs have Precursor Retention Time and Precursor M/Z populated if Any are populated
 * 
 */
public class Validate_PSMs_PrecursorRetentionTime_PrecursorMZ {
	
	private static final Logger log = LoggerFactory.getLogger( Validate_PSMs_PrecursorRetentionTime_PrecursorMZ.class );
	
	private Validate_PSMs_PrecursorRetentionTime_PrecursorMZ() { }
	public static Validate_PSMs_PrecursorRetentionTime_PrecursorMZ getInstance() {
		return new Validate_PSMs_PrecursorRetentionTime_PrecursorMZ();
	}
	
	/**
	 * 
	 *
	 */
	private static class InternalData {
		boolean processedFirstPSM = false;
		boolean firstPSM_Has_Precursor_RetentionTime;
		boolean firstPSM_Has_Precursor_M_Z;
	}
	
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validate_PSMs_PrecursorRetentionTime_PrecursorMZ( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
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

		if ( ! internalData.processedFirstPSM ) {
			
			internalData.processedFirstPSM = true;
			
			if ( psm.getPrecursorRetentionTime() != null ) {
				internalData.firstPSM_Has_Precursor_RetentionTime = true;
			}
			if ( psm.getPrecursorMZ() != null ) {
				internalData.firstPSM_Has_Precursor_M_Z = true;
			}
			
		} else {
			if ( ( psm.getPrecursorRetentionTime() == null && internalData.firstPSM_Has_Precursor_RetentionTime )
					|| ( psm.getPrecursorRetentionTime() != null && ( ! internalData.firstPSM_Has_Precursor_RetentionTime ) ) ) {
				String msg = "Found PSM with precursor_retention_time and PSM without precursor_retention_time.  All PSM must either have or not have precursor_retention_time populated.";
				log.error( msg );
				throw new LimelightImporterDataException( msg );
			}
			if ( ( psm.getPrecursorMZ() == null && internalData.firstPSM_Has_Precursor_M_Z )
					|| ( psm.getPrecursorMZ() != null && ( ! internalData.firstPSM_Has_Precursor_M_Z ) ) ) {
				String msg = "Found PSM with precursor_m_z and PSM without precursor_m_z.  All PSM must either have or not have precursor_m_z populated.";
				log.error( msg );
				throw new LimelightImporterDataException( msg );
			}
		}
	}
			
}
