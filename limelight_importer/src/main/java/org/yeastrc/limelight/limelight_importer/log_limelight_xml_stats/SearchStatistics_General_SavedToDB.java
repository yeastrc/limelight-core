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
import org.yeastrc.limelight.limelight_importer.constants.Importer_Stats_GeneralData_Table__Label_Values_Enum;
import org.yeastrc.limelight.limelight_importer.dao.Importer_Stats_GeneralData_DAO;
import org.yeastrc.limelight.limelight_importer.dao.SearchDetailsDAO;
import org.yeastrc.limelight.limelight_importer.dto.Importer_Stats_GeneralData_DTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.process_input.GetProteinsForPeptide;
import org.yeastrc.limelight.limelight_shared.dto.SearchDetailsDTO;

/**
 * 
 *
 */
public class SearchStatistics_General_SavedToDB {

	private static final Logger log = LoggerFactory.getLogger( SearchStatistics_General_SavedToDB.class );
	
	private long importStartTime_Milliseconds = System.currentTimeMillis();

	private long importerReadLimelightXmlFileElapsedTime_Milliseconds;
	
	private long importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds;
	
	private Long limelightXMLFileToImport_Size;
	
	private Long scanFiles_TotalFilesSize_Bytes;

	/**
	 * private constructor
	 */
	private SearchStatistics_General_SavedToDB(){
	}
	
	public static SearchStatistics_General_SavedToDB getInstance() {
		return new SearchStatistics_General_SavedToDB();
	}
	
	/**
	 * 
	 */
	public void read_LimelightXMLFile_Done() {
		
		importerReadLimelightXmlFileElapsedTime_Milliseconds = System.currentTimeMillis() - importStartTime_Milliseconds;
	}

	public void setImporter_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds(
			long importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds) {
		this.importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds = importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds;
	}
	
	public void set_limelightXMLFileToImport_Size( long limelightXMLFileToImport_Size ) {
		this.limelightXMLFileToImport_Size = limelightXMLFileToImport_Size;
	}
	
	public void setScanFiles_TotalFilesSize_Bytes(long scanFiles_TotalFilesSize_Bytes) {
		this.scanFiles_TotalFilesSize_Bytes = scanFiles_TotalFilesSize_Bytes;
	}

	/**
	 * @param limelightInput
	 * @param searchDTOInserted
	 * @throws Exception
	 */
	public void searchStatistics_General_SavedToDB( LimelightInput limelightInput, SearchDTO_Importer searchDTOInserted ) throws Exception {
		
		SearchDetailsDTO searchDetailsDTO = new SearchDetailsDTO();

		searchDetailsDTO.setSearchId( searchDTOInserted.getId() );
				
		long importElapsedTime_Milliseconds = System.currentTimeMillis() - importStartTime_Milliseconds;
		
		searchDetailsDTO.setImportElapsedTime_Milliseconds( importElapsedTime_Milliseconds );
		searchDetailsDTO.setImporterReadLimelightXmlFileElapsedTime_Milliseconds( importerReadLimelightXmlFileElapsedTime_Milliseconds );
		
		{
			long importerProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds =
					GetProteinsForPeptide.getSingletonInstance().getTotalElapsedTimeInTheseMethodsInMilliSeconds();			
			searchDetailsDTO.setImporterProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds( importerProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds );
		}
		
		searchDetailsDTO.setLimelightXML_File__FileSize_Bytes( this.limelightXMLFileToImport_Size );
		searchDetailsDTO.setScanFiles_TotalFilesSize_Bytes(scanFiles_TotalFilesSize_Bytes);
		
		searchDetailsDTO.setImporter_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds(this.importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds);
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		reportReportedPeptidesAndPSMCount( reportedPeptides, searchDetailsDTO );
		
		MatchedProteins matchedProteins = limelightInput.getMatchedProteins();
		matchedProteinsCount( matchedProteins, searchDetailsDTO );
		
		SearchDetailsDAO.getInstance().saveToDatabase(searchDetailsDTO);
		
		
		{
			Importer_Stats_GeneralData_DTO importer_Stats_GeneralData_DTO = new Importer_Stats_GeneralData_DTO();
			importer_Stats_GeneralData_DTO.setSearchId(searchDTOInserted.getId());
			importer_Stats_GeneralData_DTO.setLabel( Importer_Stats_GeneralData_Table__Label_Values_Enum.TOTAL_IMPORT_TIME );
			importer_Stats_GeneralData_DTO.setTotal_elapsedTime_Milliseconds( importElapsedTime_Milliseconds );

			Importer_Stats_GeneralData_DAO.getInstance().save(importer_Stats_GeneralData_DTO);
		}
		
		{
			Importer_Stats_GeneralData_DTO importer_Stats_GeneralData_DTO = new Importer_Stats_GeneralData_DTO();
			importer_Stats_GeneralData_DTO.setSearchId(searchDTOInserted.getId());
			importer_Stats_GeneralData_DTO.setLabel( Importer_Stats_GeneralData_Table__Label_Values_Enum.READ_LIMELIGHT_XML_FILE_TIME );
			importer_Stats_GeneralData_DTO.setTotal_elapsedTime_Milliseconds( importerReadLimelightXmlFileElapsedTime_Milliseconds );

			Importer_Stats_GeneralData_DAO.getInstance().save(importer_Stats_GeneralData_DTO);
		}
		
		{
			Importer_Stats_GeneralData_DTO importer_Stats_GeneralData_DTO = new Importer_Stats_GeneralData_DTO();
			importer_Stats_GeneralData_DTO.setSearchId(searchDTOInserted.getId());
			importer_Stats_GeneralData_DTO.setLabel( Importer_Stats_GeneralData_Table__Label_Values_Enum.IMPORTER_SEARCH_INSERTED_WAIT_TIME_FOR_SPECTR_COMPLETE );
			importer_Stats_GeneralData_DTO.setTotal_elapsedTime_Milliseconds( this.importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds );

			Importer_Stats_GeneralData_DAO.getInstance().save(importer_Stats_GeneralData_DTO);
		}
		
		
	}

	/**
	 * @param matchedProteins
	 */
	private void matchedProteinsCount( MatchedProteins matchedProteins, SearchDetailsDTO searchDetailsDTO ) {

		if ( matchedProteins == null ) {
			searchDetailsDTO.setMatchedProteinCount( 0 );
			return;
		}
		List<MatchedProtein> matchedProteinList = matchedProteins.getMatchedProtein();
		if ( matchedProteinList == null || matchedProteinList.isEmpty() ) {
			searchDetailsDTO.setMatchedProteinCount( 0 );
			return;
		}

		searchDetailsDTO.setMatchedProteinCount( matchedProteinList.size() );

	}
	
	/**
	 * @param reportedPeptides
	 */
	private void reportReportedPeptidesAndPSMCount( ReportedPeptides reportedPeptides, SearchDetailsDTO searchDetailsDTO ) {
		
		if ( reportedPeptides == null ) {
			searchDetailsDTO.setPsmCount(0);
			searchDetailsDTO.setReportedPeptideCount(0);
			return;
		}
		List<ReportedPeptide> reportedPeptideList = reportedPeptides.getReportedPeptide();
		if ( reportedPeptideList == null || reportedPeptideList.isEmpty() ) {
			searchDetailsDTO.setPsmCount(0);
			searchDetailsDTO.setReportedPeptideCount(0);
			return;
		}
		
		searchDetailsDTO.setReportedPeptideCount( reportedPeptideList.size() );
		

		//  Get number of PSMs under all reported peptides
		
		int totalPSM_Count = 0;
		
		for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
			Psms psms = reportedPeptide.getPsms();
			if ( psms == null ) {
				continue;
			}
			List<Psm> psmList = psms.getPsm();
			if ( psmList == null || psmList.isEmpty() ) {
				continue;
			}
			totalPSM_Count += psmList.size();
		}

		searchDetailsDTO.setPsmCount( totalPSM_Count );

	}


}
