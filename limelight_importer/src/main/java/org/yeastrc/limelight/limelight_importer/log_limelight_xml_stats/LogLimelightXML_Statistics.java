package org.yeastrc.limelight.limelight_importer.log_limelight_xml_stats;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProtein;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteins;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psms;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;

/**
 * 
 *
 */
public class LogLimelightXML_Statistics {

	private static final Logger log = LoggerFactory.getLogger( LogLimelightXML_Statistics.class );

	/**
	 * private constructor
	 */
	private LogLimelightXML_Statistics(){}
	public static LogLimelightXML_Statistics getInstance() {
		return new LogLimelightXML_Statistics();
	}
	
	public void logLimelightXML_Statistics( LimelightInput limelightInput ) {

		log.warn( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		log.warn( "Input Limelight XML file statistics: START:");
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		reportReportedPeptidesAndPSMCount( reportedPeptides );
		
		MatchedProteins matchedProteins = limelightInput.getMatchedProteins();
		matchedProteinsCount( matchedProteins );
		
		log.warn( "Input Limelight XML file statistics: END:");
		log.warn( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	}

	/**
	 * @param matchedProteins
	 */
	private void matchedProteinsCount( MatchedProteins matchedProteins ) {

		if ( matchedProteins == null ) {
			log.warn( "<matched_proteins> does not exist so no Matched Proteins");
			return;
		}
		List<MatchedProtein> matchedProteinList = matchedProteins.getMatchedProtein();
		if ( matchedProteinList == null || matchedProteinList.isEmpty() ) {
			log.warn( "<matched_proteins> is empty so no Matched Proteins");
			return;
		}

		log.warn( "Number of matched proteins under <matched_proteins>: " + matchedProteinList.size() );

	}
	
	/**
	 * @param reportedPeptides
	 */
	private void reportReportedPeptidesAndPSMCount( ReportedPeptides reportedPeptides ) {
		
		if ( reportedPeptides == null ) {
			log.warn( "<reported_peptides> does not exist so no Reported Peptides or PSMs");
			return;
		}
		List<ReportedPeptide> reportedPeptideList = reportedPeptides.getReportedPeptide();
		if ( reportedPeptideList == null || reportedPeptideList.isEmpty() ) {
			log.warn( "<reported_peptides> is empty so no Reported Peptides or PSMs");
			return;
		}
		
		log.warn( "Number of reported peptides under <reported_peptides>: " + reportedPeptideList.size() );

		//  Get number of PSMs under all reported peptides
		
		long totalPSM_Count = 0;
		
		for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
			Psms psms = reportedPeptide.getPsms();
			if ( psms == null ) {
				log.warn( "No PSMs under reported peptide: " + reportedPeptide.getReportedPeptideString() );
				continue;
			}
			List<Psm> psmList = psms.getPsm();
			if ( psmList == null || psmList.isEmpty() ) {
				log.warn( "No PSMs under reported peptide: " + reportedPeptide.getReportedPeptideString() );
				continue;
			}
			totalPSM_Count += psmList.size();
		}
		log.warn( "Number of PSMs under <reported_peptides>: " + totalPSM_Count );

	}
}
