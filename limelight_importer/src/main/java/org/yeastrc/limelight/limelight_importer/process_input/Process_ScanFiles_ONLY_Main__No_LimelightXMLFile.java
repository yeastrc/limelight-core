package org.yeastrc.limelight.limelight_importer.process_input;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.dao.Project_ScanFile_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.Project_ScanFile_Importer_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.Project_ScanFilename_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer_AllEntries;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search.ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search.ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result_Item;
import org.yeastrc.limelight.limelight_importer.spectral_storage_service_interface.ScanFileToSpectralStorageService_GetAPIKey__NO_SearchData;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_Importer_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFilename_DTO;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileSourceFirstImportDTO;

/**
 * 
 *
 */
public class Process_ScanFiles_ONLY_Main__No_LimelightXMLFile {

	private static final Logger log = LoggerFactory.getLogger( Process_ScanFiles_ONLY_Main__No_LimelightXMLFile.class );

	private Process_ScanFiles_ONLY_Main__No_LimelightXMLFile() { }
	public static Process_ScanFiles_ONLY_Main__No_LimelightXMLFile getInstance() { return new Process_ScanFiles_ONLY_Main__No_LimelightXMLFile(); }
	
	
	/**
	 * @param scanFileFileContainer_AllEntries
	 * @param projectId
	 * @throws Exception
	 */
	public void process_ScanFiles_ONLY_Main__No_LimelightXMLFile( 
			
			ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries,
			int projectId ) throws Exception {
		
		
		ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result scanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result =
				ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search.getInstance().sendScanFilesToSpectralStorageService(scanFileFileContainer_AllEntries);
		
		for ( ScanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result_Item resultItem : scanFiles_SendToSpectralStorageService__ONLY_ScanFiles_NO_Search_Result.getResult_List() ) {

			//  Wait for Spectral Storage Import and insert records into Limelight DB
			
			String spectralStorageProcessKey = resultItem.getSpectralStorageProcessKey();
			ScanFileFileContainer scanFileFileContainer = 	resultItem.getScanFileFileContainer();
			String sha1sum = resultItem.getSha1sum();

			long scanFile_Size = scanFileFileContainer.getScanFile().length();
			
			String spectralStorage_API_Key =
					ScanFileToSpectralStorageService_GetAPIKey__NO_SearchData.getInstance()
					.scanFileToSpectralStorageService_GetAPIKey( spectralStorageProcessKey, scanFileFileContainer );
			

			ScanFileDTO scanFileDTO_ForInsert = new ScanFileDTO();
			ScanFileSourceFirstImportDTO scanFileSourceFirstImportDTO = new ScanFileSourceFirstImportDTO();
			
			scanFileDTO_ForInsert.setSpectralStorageAPIKey( spectralStorage_API_Key );
			
			scanFileSourceFirstImportDTO.setSearchScanFileId( 0 );
			scanFileSourceFirstImportDTO.setFilename( scanFileFileContainer.getScanFilename() );
			scanFileSourceFirstImportDTO.setFileSize( scanFile_Size );
			scanFileSourceFirstImportDTO.setSha1sum( sha1sum );
			scanFileSourceFirstImportDTO.setCanonicalFilename_W_Path_OnSubmitMachine( scanFileFileContainer.getScanFile().getAbsolutePath() );
			scanFileSourceFirstImportDTO.setAbsoluteFilename_W_Path_OnSubmitMachine( scanFileFileContainer.getScanFile().getCanonicalPath() );
			scanFileSourceFirstImportDTO.setAwsBucketName( null );
			scanFileSourceFirstImportDTO.setAwsObjectKey( null );
			
			ScanFileDTO scanFileDTO_FromInsert =
					ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded.getInstance()
					.scanFile_Insert_scan_file_tbl_AndChildren_IfNeeded( scanFileDTO_ForInsert, scanFileSourceFirstImportDTO );
			
			Project_ScanFile_DTO project_ScanFile_DTO = new Project_ScanFile_DTO();
			
			project_ScanFile_DTO.setProjectId(projectId);
			project_ScanFile_DTO.setScanFileId(scanFileDTO_FromInsert.getId());
			
			{
				Integer id_FirstRetrieval = Project_ScanFile_DAO_Importer.getInstance().getId_ForItem(project_ScanFile_DTO);

				if ( id_FirstRetrieval != null ) {
					//  Yes existing record

					project_ScanFile_DTO.setId(id_FirstRetrieval);
					
				} else {
					//  No existing record

					try {
						Project_ScanFile_DAO_Importer.getInstance().saveToDatabase(project_ScanFile_DTO, Project_ScanFile_DAO_Importer.SkipLogInsertException.YES );
					} catch ( Exception e ) {

						//  Possibly here due to Duplicate

						Integer id_AfterInsert = Project_ScanFile_DAO_Importer.getInstance().getId_ForItem(project_ScanFile_DTO);

						if ( id_AfterInsert == null ) {
							//  NO existing record so insert failed for another reason so execute insert again

							Project_ScanFile_DAO_Importer.getInstance().saveToDatabase(project_ScanFile_DTO, Project_ScanFile_DAO_Importer.SkipLogInsertException.NO );
						}

						project_ScanFile_DTO.setId(id_AfterInsert);
					}
				}
			}

			Project_ScanFilename_DTO project_ScanFilename_DTO = new Project_ScanFilename_DTO();
			project_ScanFilename_DTO.setProjectScanFileId( project_ScanFile_DTO.getId() );
			project_ScanFilename_DTO.setScanFilename( scanFileFileContainer.getScanFilename() );

			{
				Integer id_FirstRetrieval = Project_ScanFilename_DAO_Importer.getInstance().getId_ForItem(project_ScanFilename_DTO);

				if ( id_FirstRetrieval != null ) {
					//  Yes existing record

					project_ScanFilename_DTO.setId(id_FirstRetrieval);
					
				} else {
					//  No existing record

					try {
						Project_ScanFilename_DAO_Importer.getInstance().saveToDatabase(project_ScanFilename_DTO, Project_ScanFilename_DAO_Importer.SkipLogInsertException.YES );
					} catch ( Exception e ) {

						//  Possibly here due to Duplicate

						Integer id_AfterInsert = Project_ScanFilename_DAO_Importer.getInstance().getId_ForItem(project_ScanFilename_DTO);

						if ( id_AfterInsert == null ) {
							//  NO existing record so insert failed for another reason so execute insert again

							Project_ScanFilename_DAO_Importer.getInstance().saveToDatabase(project_ScanFilename_DTO, Project_ScanFilename_DAO_Importer.SkipLogInsertException.NO );
						}

						project_ScanFilename_DTO.setId(id_AfterInsert);
					}
				}
			}
			
			
			Project_ScanFile_Importer_DTO project_ScanFile_Importer_DTO = new Project_ScanFile_Importer_DTO();
			project_ScanFile_Importer_DTO.setProjectScanFileId( project_ScanFile_DTO.getId() );
			project_ScanFile_Importer_DTO.setFileSize( scanFile_Size );
			project_ScanFile_Importer_DTO.setSha1sum(sha1sum);
			project_ScanFile_Importer_DTO.setCanonicalFilename_W_Path_OnSubmitMachine( scanFileFileContainer.getScanFile().getAbsolutePath() );
			project_ScanFile_Importer_DTO.setAbsoluteFilename_W_Path_OnSubmitMachine( scanFileFileContainer.getScanFile().getCanonicalPath() );
			project_ScanFile_Importer_DTO.setAwsBucketName(null);
			project_ScanFile_Importer_DTO.setAwsObjectKey(null);
			
			{
				Integer project_scan_file_id_FirstRetrieval = Project_ScanFile_Importer_DAO_Importer.getInstance().get_project_scan_file_id_For_project_scan_file_id( project_ScanFile_DTO.getId() );

				if ( project_scan_file_id_FirstRetrieval != null ) {
					//  Yes existing record

				} else {
					//  No existing record

					try {
						Project_ScanFile_Importer_DAO_Importer.getInstance().saveToDatabase(project_ScanFile_Importer_DTO, Project_ScanFile_Importer_DAO_Importer.SkipLogInsertException.YES );
					} catch ( Exception e ) {

						//  Possibly here due to Duplicate

						Integer project_scan_file_id_FirstRetrieval_AfterInsert = Project_ScanFile_Importer_DAO_Importer.getInstance().get_project_scan_file_id_For_project_scan_file_id( project_ScanFile_DTO.getId() );

						if ( project_scan_file_id_FirstRetrieval_AfterInsert == null ) {
							//  NO existing record so insert failed for another reason so execute insert again

							Project_ScanFile_Importer_DAO_Importer.getInstance().saveToDatabase(project_ScanFile_Importer_DTO, Project_ScanFile_Importer_DAO_Importer.SkipLogInsertException.NO );
						}
					}
				}
			}
		}
	}
	
	
}