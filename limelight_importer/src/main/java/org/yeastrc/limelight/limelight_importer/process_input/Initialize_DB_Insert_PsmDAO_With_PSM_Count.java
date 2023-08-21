package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Psm_InsertId_DAO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;

/**
 * 
 *
 */
public class Initialize_DB_Insert_PsmDAO_With_PSM_Count {

	private static final Logger log = LoggerFactory.getLogger( Initialize_DB_Insert_PsmDAO_With_PSM_Count.class );

	private static Initialize_DB_Insert_PsmDAO_With_PSM_Count singletonInstance = new Initialize_DB_Insert_PsmDAO_With_PSM_Count();

	private Initialize_DB_Insert_PsmDAO_With_PSM_Count() { }
	public static Initialize_DB_Insert_PsmDAO_With_PSM_Count getSingletonInstance() { return singletonInstance; }
	
	
	/**
	 * @param limelightInput
	 * @throws Exception 
	 */
	public void initialize_DB_Insert_PsmDAO_With_PSM_Count(LimelightInput limelightInput, SearchDTO_Importer searchDTO) throws Exception {
		
		//  Compute total PSM count and pass to DB_Insert_PsmDAO.initialize...
		
		int psmCount_ForSearch = 0;
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		
		if ( reportedPeptides != null ) {
			
			List<ReportedPeptide> reportedPeptideList =	reportedPeptides.getReportedPeptide();
			
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {

				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					if ( reportedPeptide.getPsms() != null ) {
						psmCount_ForSearch += reportedPeptide.getPsms().getPsm().size();
					}
				}
			}
		}
		
		DB_Insert_Psm_InsertId_DAO.getSingletonInstance().initialize_Pass_PsmCount(psmCount_ForSearch, searchDTO);
	}
			
}
