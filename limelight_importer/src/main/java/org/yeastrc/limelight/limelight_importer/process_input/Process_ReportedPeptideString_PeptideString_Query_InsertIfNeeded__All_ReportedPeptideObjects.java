package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.ArrayList;
import java.util.List;

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
		
		ReportedPeptideDAO_Importer reportedPeptideDAO_Importer = ReportedPeptideDAO_Importer.getInstance(); 
		PeptideDAO_Importer peptideDAO_Importer = PeptideDAO_Importer.getInstance();

		{
			//  First update last_used_in_search_import in both tables so the record doesn't get deleted before the next step.
			
			//    Doing this here creates some time separation between when a record is updated last_used_in_search_import field and when it is searched for, even if just milliseconds

			final int update_DBRecords_BlockSize = 100;

			List<String> reportedPeptideString_List = new ArrayList<>( update_DBRecords_BlockSize );

			List<String> peptideSequence_List = new ArrayList<>( update_DBRecords_BlockSize );
			
			int update_CurrentCount = 0;

			for ( Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object : input_LimelightXMLFile_InternalHolder_Root_Object.get_InternalHolder_ReportedPeptide_Object_Unmodifiable() ) {

				update_CurrentCount++;

				//  Add to the batch

				ReportedPeptide reportedPeptide = internalHolder_ReportedPeptide_Object.getReportedPeptide();

				reportedPeptideString_List.add( reportedPeptide.getReportedPeptideString() );
				peptideSequence_List.add( reportedPeptide.getSequence() );
				
				if ( update_CurrentCount >= update_DBRecords_BlockSize ) {
					
					// Updates to DB of the current batch
					
					reportedPeptideDAO_Importer.update_last_used_in_search_import(reportedPeptideString_List);
					peptideDAO_Importer.update_last_used_in_search_import(peptideSequence_List);
					
					//  Reset holding Lists for next batch
					
					update_CurrentCount = 0;
					
					reportedPeptideString_List.clear();
					peptideSequence_List.clear();
				}
				
			}
			
			// Updates for final group

			if ( ! reportedPeptideString_List.isEmpty() ) {
				reportedPeptideDAO_Importer.update_last_used_in_search_import(reportedPeptideString_List);
			}
			if ( ! peptideSequence_List.isEmpty() ) {
				peptideDAO_Importer.update_last_used_in_search_import(peptideSequence_List);
			}
		}
		
		Thread.sleep( 100 ); // tiny wait before start looking up records
		
		
		//  Main Lookup and insert if necessary

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
			ReportedPeptideDTO reportedPeptideDTO = reportedPeptideDAO_Importer.getReportedPeptideDTO_OrSave( reportedPeptideString );
			
			//  Retrieves reported_peptide record or inserts it if not in the database.
			PeptideDTO peptideDTO =	peptideDAO_Importer.getPeptideDTO_OrSave( peptideString );
			
			
			internalHolder_ReportedPeptide_Object.setReportedPeptideDTO(reportedPeptideDTO);
			
			internalHolder_ReportedPeptide_Object.setPeptideDTO(peptideDTO);
		}

		PeptideDAO_Importer.logTotalElapsedTimeAndCallCounts(search);
		ReportedPeptideDAO_Importer.logTotalElapsedTimeAndCallCounts(search);
	}
	
	
}
