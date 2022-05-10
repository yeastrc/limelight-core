package org.yeastrc.limelight.limelight_importer.process_input;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.dao.PeptideDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.ReportedPeptideDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_Root_Object;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter;
import org.yeastrc.limelight.limelight_shared.dto.PeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;

/**
 * 
 *
 */
public class Process_ReportedPeptideString_PeptideString_Query_InsertIfNeeded__All_ReportedPeptideObjects {

	private static final Logger log = LoggerFactory.getLogger( Process_ReportedPeptideString_PeptideString_Query_InsertIfNeeded__All_ReportedPeptideObjects.class );
	
	/**
	 * private constructor
	 */
	private Process_ReportedPeptideString_PeptideString_Query_InsertIfNeeded__All_ReportedPeptideObjects(){}
	public static Process_ReportedPeptideString_PeptideString_Query_InsertIfNeeded__All_ReportedPeptideObjects getInstance() {
		return new Process_ReportedPeptideString_PeptideString_Query_InsertIfNeeded__All_ReportedPeptideObjects();
	}
	
	/**
	 * Get ReportedPeptideDTO and PeptideDTO.  Insert to DB if necessary
	 * 
	 * 
	 * @param input_LimelightXMLFile_InternalHolder_Root_Object
	 * @throws Exception
	 */
	public void reportedPeptideString_PeptideString_Query_InsertIfNeeded__All_ReportedPeptideObjects(
			
			Input_LimelightXMLFile_InternalHolder_Root_Object input_LimelightXMLFile_InternalHolder_Root_Object,
			SearchDTO_Importer search
			) throws Exception {

		int reportedPeptides_SearchImportInProgress_Counter = 0; // NOT a total counter. Is reset to zero.

		for ( Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object : input_LimelightXMLFile_InternalHolder_Root_Object.get_InternalHolder_ReportedPeptide_Object_Unmodifiable() ) {

			{
				reportedPeptides_SearchImportInProgress_Counter++;
				if ( reportedPeptides_SearchImportInProgress_Counter > 400 ) {
					//  at 400th entry every 400 entry, Updates 'heart beat'
					Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().saveOrUpdate_ForSearchId(search.getId());
				
					reportedPeptides_SearchImportInProgress_Counter = 0;  	//  reset
				}
			}
			
			ReportedPeptide reportedPeptide = internalHolder_ReportedPeptide_Object.getReportedPeptide();

			String reportedPeptideString = reportedPeptide.getReportedPeptideString();
			
			String peptideString = reportedPeptide.getSequence();
			

			//  Retrieves reported_peptide record or inserts it if not in the database.
			ReportedPeptideDTO reportedPeptideDTO = ReportedPeptideDAO_Importer.getInstance().getReportedPeptideDTO_OrSave( reportedPeptideString );
			
			//  Retrieves reported_peptide record or inserts it if not in the database.
			PeptideDTO peptideDTO =	PeptideDAO_Importer.getInstance().getPeptideDTO_OrSave( peptideString );
			
			
			internalHolder_ReportedPeptide_Object.setReportedPeptideDTO(reportedPeptideDTO);
			
			internalHolder_ReportedPeptide_Object.setPeptideDTO(peptideDTO);
		}

		PeptideDAO_Importer.logTotalElapsedTimeAndCallCounts(search);
		ReportedPeptideDAO_Importer.logTotalElapsedTimeAndCallCounts(search);
	}
	
	
}
