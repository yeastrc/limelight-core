package org.yeastrc.limelight.limelight_importer.pre_validate_xml;

import java.math.BigDecimal;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReporterIon;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_shared.constants.ReporterIon_Constants;

/**
 * Validate that all PSM level Reporter Ions are within the valid range of values.
 *   See ReporterIon_Constants
 * 
 */
public class Validate_ReporterIons_OnPSMs {
	
	private static final Logger log = LoggerFactory.getLogger( Validate_ReporterIons_OnPSMs.class );
	
	private Validate_ReporterIons_OnPSMs() { }
	public static Validate_ReporterIons_OnPSMs getInstance() {
		return new Validate_ReporterIons_OnPSMs();
	}
	
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validate_ReporterIons_OnPSMs( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		//  Validate that all PSM level Reporter Ions are within the valid range of values.

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

		if ( psm.getReporterIons() != null 
				&& psm.getReporterIons().getReporterIon() != null
				&& ( ! psm.getReporterIons().getReporterIon().isEmpty() ) ) {

			List<ReporterIon> reporterIonList = psm.getReporterIons().getReporterIon();
			for ( ReporterIon reporterIon :  reporterIonList ) {
				BigDecimal reporterIonMass = reporterIon.getMass();
				
				String massAsString = reporterIonMass.toPlainString();
				int decimalPointIndex = massAsString.indexOf('.');
				int lengthOfWholeNumberPart = decimalPointIndex; // Digits before '.'
				if ( massAsString.startsWith( "-" ) ) {
					lengthOfWholeNumberPart--; //  Subtract 1 since starts with '-'
				}
				if ( lengthOfWholeNumberPart > ReporterIon_Constants.REPORTER_ION_MASS_MAX_DIGITS_LEFT_OF_DECIMAL_POINT ) {
					String msg = "Reporter Ion Value whole number length > " 
							+ ReporterIon_Constants.REPORTER_ION_MASS_MAX_DIGITS_LEFT_OF_DECIMAL_POINT
							+ ".  Reporter Ion Value: "
							+ reporterIonMass
							+ ", psm Scan Number: "
							+ psm.getScanNumber()
							+ ", reported peptide string: "
							+ reportedPeptide.getReportedPeptideString();
					log.error( msg );
					throw new LimelightImporterDataException( msg );
				}
			}
		}
	}
			
}
