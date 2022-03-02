package org.yeastrc.limelight.limelight_importer.pre_validate_xml;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.constants.Database_DecimalFieldType_MaxWholeNumberDigits_Constants;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Validate that PSM Precursor Retention Time and Precursor M/Z values are NOT larger than allowed in DB
 * 
 * DB: Table psm_tbl:
 *   precursor_retention_time decimal(9,4) DEFAULT NULL,
 *   precursor_m_z decimal(10,4) DEFAULT NULL,
 *   
 *   precursor_retention_time max number of whole number digits is 5
 *   precursor_m_z   		  max number of whole number digits is 6 
 * 
 */
public class Validate_PSMs_PrecursorRetentionTime_PrecursorMZ__MaxValuesAllowed {
	
	private static final Logger log = LoggerFactory.getLogger( Validate_PSMs_PrecursorRetentionTime_PrecursorMZ__MaxValuesAllowed.class );
	
	private Validate_PSMs_PrecursorRetentionTime_PrecursorMZ__MaxValuesAllowed() { }
	public static Validate_PSMs_PrecursorRetentionTime_PrecursorMZ__MaxValuesAllowed getInstance() {
		return new Validate_PSMs_PrecursorRetentionTime_PrecursorMZ__MaxValuesAllowed();
	}
	
		
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validate_PSMs_PrecursorRetentionTime_PrecursorMZ__MaxValuesAllowed( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		//  Validate all PSM 
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		
		if ( reportedPeptides != null ) {
			
			List<ReportedPeptide> reportedPeptideList =	reportedPeptides.getReportedPeptide();
			
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {

				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					validateOnSingleReportedPeptideAndItsPSMs( reportedPeptide );
				}
			}
		}
	}

	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validateOnSingleReportedPeptideAndItsPSMs( ReportedPeptide reportedPeptide ) throws LimelightImporterDataException {
	
		if ( reportedPeptide.getPsms() != null ) {
			for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
				
				validateOnSinglePSM( psm, reportedPeptide );
			}
		}
	}

	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validateOnSinglePSM( 
			Psm psm,
			ReportedPeptide reportedPeptide ) throws LimelightImporterDataException {

		{
			BigDecimal precursor_RetentionTime = psm.getPrecursorRetentionTime();

			if ( precursor_RetentionTime != null ) {

				//  Round to same number of decimal places DB field has
				BigDecimal precursor_RetentionTime_Rounded = precursor_RetentionTime.setScale(Database_DecimalFieldType_MaxWholeNumberDigits_Constants.PSM_TBL__PRECURSOR_RETENTION_TIME__DECIMAL_PLACES, RoundingMode.HALF_UP );
				String precursor_RetentionTime_Rounded_IntegerString = precursor_RetentionTime_Rounded.toBigInteger().toString();

				if ( precursor_RetentionTime_Rounded_IntegerString.length() > Database_DecimalFieldType_MaxWholeNumberDigits_Constants.PSM_TBL__PRECURSOR_RETENTION_TIME__MAX_NUMBER_WHOLE_NUMBER_DIGITS ) {

					String msg = "Found PSM with precursor_retention_time number that is too large: " + precursor_RetentionTime;
					log.error( msg );
					throw new LimelightImporterDataException( msg );
				}
			}
		}
		{
			BigDecimal precursor_MZ = psm.getPrecursorMZ();

			if ( precursor_MZ != null ) {

				//  Round to same number of decimal places DB field has
				BigDecimal precursor_MZ_Rounded = precursor_MZ.setScale(Database_DecimalFieldType_MaxWholeNumberDigits_Constants.PSM_TBL__PRECURSOR_M_Z__DECIMAL_PLACES, RoundingMode.HALF_UP );
				String precursor_MZ_Rounded_IntegerString = precursor_MZ_Rounded.toBigInteger().toString();

				if ( precursor_MZ_Rounded_IntegerString.length() > Database_DecimalFieldType_MaxWholeNumberDigits_Constants.PSM_TBL__PRECURSOR_M_Z__MAX_NUMBER_WHOLE_NUMBER_DIGITS ) {

					String msg = "Found PSM with precursor_m_z number that is too large: " + precursor_MZ;
					log.error( msg );
					throw new LimelightImporterDataException( msg );
				}
			}
		}
	}
			
}
