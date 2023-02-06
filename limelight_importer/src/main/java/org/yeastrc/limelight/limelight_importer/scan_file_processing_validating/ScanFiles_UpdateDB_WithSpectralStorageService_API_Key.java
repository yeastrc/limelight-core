/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_importer.scan_file_processing_validating;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.dao.ProjectScanFilename_SearchScanFile_Mapping_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.Project_ScanFile_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.Project_ScanFile_Importer_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.Project_ScanFilename_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.SearchScanFileDAO;
import org.yeastrc.limelight.limelight_importer.dao.SearchScanFileImporterDAO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry_AllEntries;
import org.yeastrc.limelight.limelight_shared.dto.ProjectScanFilename_SearchScanFile_Mapping_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_Importer_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFilename_DTO;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileSourceFirstImportDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileImporterDTO;

/**
 * 
 *
 */
public class ScanFiles_UpdateDB_WithSpectralStorageService_API_Key {

	private static final Logger log = LoggerFactory.getLogger( ScanFiles_UpdateDB_WithSpectralStorageService_API_Key.class );

	private ScanFiles_UpdateDB_WithSpectralStorageService_API_Key() { }
	public static ScanFiles_UpdateDB_WithSpectralStorageService_API_Key getInstance() { return new ScanFiles_UpdateDB_WithSpectralStorageService_API_Key(); }
	
	/**
	 * @param searchScanFileEntry_KeyScanFilename
	 * @throws Exception 
	 */
	public void updateDB_WithSpectralStorageService_API_Key( SearchScanFileEntry_AllEntries searchScanFileEntry_AllEntries, int projectId, int projectSearchId ) throws Exception {

		for ( SearchScanFileEntry searchScanFileEntry : searchScanFileEntry_AllEntries.allEntries_AsList() ) {

			SearchScanFileImporterDTO searchScanFileImporterDTO = searchScanFileEntry.getSearchScanFileImporterDTO();
			
			if ( searchScanFileImporterDTO != null ) {
				
				SearchScanFileDTO searchScanFileDTO = searchScanFileEntry.getSearchScanFileDTO();
				if ( searchScanFileDTO == null ) {
					String msg = "searchScanFileEntry.getSearchScanFileDTO() == null";
					log.error( msg );
					throw new LimelightImporterInternalException( msg );
				}
				
				SearchScanFileImporterDAO.getInstance()
				.updateSpectralStorageAPIKey( searchScanFileImporterDTO.getId(), searchScanFileImporterDTO.getSpectralStorageAPIKey() );
				
				ScanFileDTO scanFileDTO_ForInsert = new ScanFileDTO();
				ScanFileSourceFirstImportDTO scanFileSourceFirstImportDTO = new ScanFileSourceFirstImportDTO();
				
				scanFileDTO_ForInsert.setSpectralStorageAPIKey( searchScanFileImporterDTO.getSpectralStorageAPIKey() );
				
				scanFileSourceFirstImportDTO.setSearchScanFileId( searchScanFileDTO.getId() );
				scanFileSourceFirstImportDTO.setFilename( searchScanFileDTO.getFilename() );
				scanFileSourceFirstImportDTO.setFileSize( searchScanFileImporterDTO.getFileSize() );
				scanFileSourceFirstImportDTO.setSha1sum( searchScanFileImporterDTO.getSha1sum() );
				scanFileSourceFirstImportDTO.setCanonicalFilename_W_Path_OnSubmitMachine( searchScanFileImporterDTO.getAbsoluteFilename_W_Path_OnSubmitMachine() );
				scanFileSourceFirstImportDTO.setAbsoluteFilename_W_Path_OnSubmitMachine( searchScanFileImporterDTO.getCanonicalFilename_W_Path_OnSubmitMachine() );
				scanFileSourceFirstImportDTO.setAwsBucketName( searchScanFileImporterDTO.getAwsBucketName() );
				scanFileSourceFirstImportDTO.setAwsObjectKey( searchScanFileImporterDTO.getAwsObjectKey() );
				
				ScanFileDTO scanFileDTO_FromInsert =
						ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded.getInstance()
						.scanFile_Insert_scan_file_tbl_AndChildren_IfNeeded( scanFileDTO_ForInsert, scanFileSourceFirstImportDTO );
				
				SearchScanFileImporterDAO.getInstance().updateScanFileId( searchScanFileImporterDTO.getId(), scanFileDTO_FromInsert.getId() );
				SearchScanFileDAO.getInstance().updateScanFileId( searchScanFileDTO.getId(), scanFileDTO_FromInsert.getId() );
				
				// Update existing objects
				
				searchScanFileDTO.setScanFileId( scanFileDTO_FromInsert.getId() );
				searchScanFileImporterDTO.setScanFileId( scanFileDTO_FromInsert.getId() );
				
				searchScanFileEntry.setScanFileDTO( scanFileDTO_FromInsert );
				
				///
				

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
				project_ScanFilename_DTO.setScanFilename( searchScanFileEntry.getSearchScanFileDTO().getFilename() );

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
				
				ProjectScanFilename_SearchScanFile_Mapping_DTO projectScanFilename_SearchScanFile_Mapping_DTO = new ProjectScanFilename_SearchScanFile_Mapping_DTO();
				projectScanFilename_SearchScanFile_Mapping_DTO.setProjectScanFilenameId( project_ScanFilename_DTO.getId() );
				projectScanFilename_SearchScanFile_Mapping_DTO.setSearchScanFileId( searchScanFileDTO.getId() );
				projectScanFilename_SearchScanFile_Mapping_DTO.setProjectSearchId(projectSearchId);
				
				ProjectScanFilename_SearchScanFile_Mapping_DAO_Importer.getInstance().saveToDatabase(projectScanFilename_SearchScanFile_Mapping_DTO, ProjectScanFilename_SearchScanFile_Mapping_DAO_Importer.SkipLogInsertException.NO);
	
				
				Project_ScanFile_Importer_DTO project_ScanFile_Importer_DTO = new Project_ScanFile_Importer_DTO();
				project_ScanFile_Importer_DTO.setProjectScanFileId( project_ScanFile_DTO.getId() );
				project_ScanFile_Importer_DTO.setFileSize( searchScanFileImporterDTO.getFileSize() );
				project_ScanFile_Importer_DTO.setSha1sum( searchScanFileImporterDTO.getSha1sum() );
				project_ScanFile_Importer_DTO.setCanonicalFilename_W_Path_OnSubmitMachine( searchScanFileImporterDTO.getAbsoluteFilename_W_Path_OnSubmitMachine() );
				project_ScanFile_Importer_DTO.setAbsoluteFilename_W_Path_OnSubmitMachine( searchScanFileImporterDTO.getCanonicalFilename_W_Path_OnSubmitMachine() );
				project_ScanFile_Importer_DTO.setAwsBucketName( searchScanFileImporterDTO.getAwsBucketName() );
				project_ScanFile_Importer_DTO.setAwsObjectKey( searchScanFileImporterDTO.getAwsObjectKey() );

				
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
	
}
