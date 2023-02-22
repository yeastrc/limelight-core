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
package org.yeastrc.limelight.limelight_importer.process_file_import_submission;

import java.io.File;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.objects.TrackingDTOTrackingRunDTOPair;
import org.yeastrc.limelight.limelight_importer.constants.Importer__InsertedSearchId_When_NoSearchImported_Constants;
import org.yeastrc.limelight.limelight_importer.dao.FileImportTrackingDataJSONBlob_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.FileImportTrackingSingleFileDAO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataNotFoundException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterErrorProcessingRunIdException;
import org.yeastrc.limelight.limelight_importer.importer_core_entry_point.ImporterCoreEntryPoint;
import org.yeastrc.limelight.limelight_importer.log_limelight_xml_stats.SearchStatistics_General_SavedToDB;
import org.yeastrc.limelight.limelight_importer.objects.FileObjectStorage_FileContainer;
import org.yeastrc.limelight.limelight_importer.objects.FileObjectStorage_FileContainer_AllEntries;
import org.yeastrc.limelight.limelight_importer.objects.ImportResults;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer_AllEntries;
import org.yeastrc.limelight.limelight_importer.objects.SearchTags_SearchTagCategories_Root_And_SubParts_InputData;
import org.yeastrc.limelight.limelight_importer.objects.SearchTags_SearchTagCategories_Root_And_SubParts_InputData.SearchTags_SearchTagCategories__SingleCategoryAndItsTags;
import org.yeastrc.limelight.limelight_importer.process_input.Process_ScanFiles_ONLY_Main__No_LimelightXMLFile;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.ValidateScanFileSuffix;
import org.yeastrc.limelight.limelight_importer.utils.SHA1SumCalculator;
import org.yeastrc.limelight.limelight_importer.utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_shared.enum_classes.FileObjectStore_FileType_Enum;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTrackingRun_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSONBlob_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSON_Contents_Version_Number_001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSON_Contents_Version_Number_001.FileImportTrackingDataJSON_Contents__SearchTagCategories_AndTheir_SearchTagStrings__Version_Number_001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSON_Contents_Version_Number_001.FileImportTrackingDataJSON_Contents__SearchTagCategory_AndIts_SearchTagStrings__SingleCategoryEntry__Version_Number_001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSON_Contents_Version_Number_001.FileImportTrackingDataJSON_Contents__SearchTagStrings__Version_Number_001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util.Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util__Result;

/**
 * Process fileImportTrackingDTO
 *
 */
public class ProcessFileImportSubmission {

	private static final Logger log = LoggerFactory.getLogger( ProcessFileImportSubmission.class );

	/**
	 * private constructor
	 */
	private ProcessFileImportSubmission(){}
	public static ProcessFileImportSubmission getInstance() {
		return new ProcessFileImportSubmission();
	}

	/**
	 * @param fileImportRunIdToProcess
	 * @param trackingDTOTrackingRunDTOPair
	 * @param importerCoreEntryPoint
	 * @param importResults
	 * @return
	 * @throws Exception
	 */
	public int processFileImportSubmission( 
			int fileImportRunIdToProcess, 
			TrackingDTOTrackingRunDTOPair trackingDTOTrackingRunDTOPair,
			ImporterCoreEntryPoint importerCoreEntryPoint,
			ImportResults importResults,

			SearchStatistics_General_SavedToDB searchStatistics_General_SavedToDB_ToDB
			
			) throws Exception {

		FileImportTrackingRunDTO fileImportTrackingRunDTO =
				FileImportTrackingRun_Shared_Get_DAO.getInstance()
				.getItem( fileImportRunIdToProcess );

		if ( fileImportTrackingRunDTO == null ) {
			final String msg = "No FileImportTrackingRunDTO Record found for fileImportRunIdToProcess: " + fileImportRunIdToProcess;
			System.err.println( msg );
			throw new LimelightImporterDataNotFoundException(msg);
		}

		trackingDTOTrackingRunDTOPair.setFileImportTrackingRunDTO( fileImportTrackingRunDTO );

		FileImportTrackingDTO fileImportTrackingDTO =
				FileImportTracking_Shared_Get_DAO.getInstance()
				.getItem( fileImportTrackingRunDTO.getFileImportTrackingId() );

		if ( fileImportTrackingDTO == null ) {
			final String msg = "No FileImportTrackingDTO Record found for fileImportRunIdToProcess: " + fileImportRunIdToProcess
					+ ", FileImportTrackingDTO record id: " + fileImportTrackingRunDTO.getFileImportTrackingId();
			System.err.println( msg );
			throw new LimelightImporterDataNotFoundException(msg);
		}

		trackingDTOTrackingRunDTOPair.setFileImportTrackingDTO( fileImportTrackingDTO );

		int projectId = fileImportTrackingDTO.getProjectId();
		int userIdInsertingSearch = fileImportTrackingDTO.getUserId();
		
		//  Search Name from fileImportTrackingDTO or command Line
		String searchNameOverrideValue = fileImportTrackingDTO.getSearchName();
		
		//  Search Short Name from fileImportTrackingDTO
		String searchShortName = fileImportTrackingDTO.getSearchShortName();

		//  "search_path" field from "file_import_tracking" table, if import run from Run Import pgm
		String importDirectoryOverrideValue = null;
		boolean skipPopulatingPathOnSearchLineOptChosen = true;
		if ( StringUtils.isNotEmpty( fileImportTrackingDTO.getSearchPath() ) ) {
			skipPopulatingPathOnSearchLineOptChosen = false;
			importDirectoryOverrideValue = fileImportTrackingDTO.getSearchPath();
		}

		//  Get the Search Tags
		
		SearchTags_SearchTagCategories_Root_And_SubParts_InputData searchTags_SearchTagCategories_Root_And_SubParts_InputData = new SearchTags_SearchTagCategories_Root_And_SubParts_InputData();
				
		{

			//  fileImportTrackingDataJSONBlob_DTO  may be null.
			FileImportTrackingDataJSONBlob_DTO fileImportTrackingDataJSONBlob_DTO = 
					FileImportTrackingDataJSONBlob_DAO_Importer.getInstance().getForTrackingId( fileImportTrackingDTO.getId() );

			if ( fileImportTrackingDataJSONBlob_DTO != null ) {

				Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util__Result getJSON_Contents_Object_Result =
						Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util
						.getSingletonInstance()
						.get_FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO(fileImportTrackingDataJSONBlob_DTO, UnmarshalJSON_ToObject.getInstance() );

				if ( getJSON_Contents_Object_Result.getFileImportTrackingDataJSON_Contents_Version_Number_001() != null ) {

					FileImportTrackingDataJSON_Contents_Version_Number_001 fileImportTrackingDataJSON_Contents_Version_Number_001 =
							getJSON_Contents_Object_Result.getFileImportTrackingDataJSON_Contents_Version_Number_001();
					
					{
						FileImportTrackingDataJSON_Contents__SearchTagStrings__Version_Number_001 searchTagStrings_Object =
								fileImportTrackingDataJSON_Contents_Version_Number_001.getSearchTagStrings();

						if ( searchTagStrings_Object != null ) {
							if ( searchTagStrings_Object.getSearchTagList() != null && ( ! searchTagStrings_Object.getSearchTagList().isEmpty() ) ) {

								searchTags_SearchTagCategories_Root_And_SubParts_InputData.setSearchTags_Uncategorized( searchTagStrings_Object.getSearchTagList() );
							}
						}
					}
					{
						FileImportTrackingDataJSON_Contents__SearchTagCategories_AndTheir_SearchTagStrings__Version_Number_001 searchTagCategories_AndTheir_SearchTagStrings =
								fileImportTrackingDataJSON_Contents_Version_Number_001.getSearchTagCategories_AndTheir_SearchTagStrings();

						if ( searchTagCategories_AndTheir_SearchTagStrings != null ) {
							if ( searchTagCategories_AndTheir_SearchTagStrings.getSearchTagCategoryList() != null && ( ! searchTagCategories_AndTheir_SearchTagStrings.getSearchTagCategoryList().isEmpty() ) ) {

								List<SearchTags_SearchTagCategories__SingleCategoryAndItsTags> searchTagCategories_AndTheir_SearchTags = new ArrayList<>( searchTagCategories_AndTheir_SearchTagStrings.getSearchTagCategoryList().size() );
								
								for ( FileImportTrackingDataJSON_Contents__SearchTagCategory_AndIts_SearchTagStrings__SingleCategoryEntry__Version_Number_001 searchTagCategory_AndIts_SearchTagStrings__SingleCategoryEntry : searchTagCategories_AndTheir_SearchTagStrings.getSearchTagCategoryList() ) {
									
									SearchTags_SearchTagCategories__SingleCategoryAndItsTags result_SingleCategoryAndItsTags = new SearchTags_SearchTagCategories__SingleCategoryAndItsTags();
									
									result_SingleCategoryAndItsTags.setCategoryLabel( searchTagCategory_AndIts_SearchTagStrings__SingleCategoryEntry.getCategoryLabel() );
									result_SingleCategoryAndItsTags.setSearchTagStrings( searchTagCategory_AndIts_SearchTagStrings__SingleCategoryEntry.getSearchTagList() );
									
									searchTagCategories_AndTheir_SearchTags.add(result_SingleCategoryAndItsTags);
								}

								searchTags_SearchTagCategories_Root_And_SubParts_InputData.setSearchTagCategories_AndTheir_SearchTags(searchTagCategories_AndTheir_SearchTags);
							}
						}
					}
				}
			}
		}
		
		
		///  Get the Limelight XML file and Scan files
		List<FileImportTrackingSingleFileDTO> fileDBRecordList = 
				FileImportTrackingSingleFileDAO_Importer.getInstance()
				.getForTrackingId( fileImportTrackingDTO.getId() );
		
		FileImportTrackingSingleFileDTO limelightXMLFileDBRecord = null;
		
		List<FileImportTrackingSingleFileDTO> scanFilesDBRecords = new ArrayList<>( fileDBRecordList.size() );
		
		FileObjectStorage_FileContainer_AllEntries fileObjectStorage_FileContainer_AllEntries = new FileObjectStorage_FileContainer_AllEntries();
		
		
		for ( FileImportTrackingSingleFileDTO fileDBRecordItem : fileDBRecordList ) {
			
			if ( fileDBRecordItem.getFileType() == FileImportFileType.LIMELIGHT_XML_FILE ) {
				limelightXMLFileDBRecord = fileDBRecordItem;
			
			} else if ( fileDBRecordItem.getFileType() == FileImportFileType.SCAN_FILE ) {
				scanFilesDBRecords.add( fileDBRecordItem );
				
			} else if ( fileDBRecordItem.getFileType() == FileImportFileType.FASTA_FILE ) {
				
				if ( StringUtils.isNotEmpty( fileDBRecordItem.getFilenameOnDiskWithPathSubSameMachine() ) ) {

					//  Special code for when the filename with path is passed to the webapp from the submitter
					
					String fileString = fileDBRecordItem.getFilenameOnDiskWithPathSubSameMachine();
					File file = new File( fileString );
					if( ! file.exists() ) {
						//  The User provided the path to this file 
						//  when the import was submitted, so this is considered a data error
						String msg = "Could not find File To Import: " + file.getCanonicalPath();
						System.err.println( msg );
						System.err.println( "fileImportRunIdToProcess: " + fileImportRunIdToProcess );
						throw new LimelightImporterErrorProcessingRunIdException(msg);

						//							importResults.setImportSuccessStatus( false ) ;
						//							
						//							importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
						//
						//							return importResults;  //  EARLY EXIT
					}
					FileObjectStorage_FileContainer fileObjectStorage_FileContainer = new FileObjectStorage_FileContainer();
					fileObjectStorage_FileContainer.setFileType_FileObjectStore_FileType( FileObjectStore_FileType_Enum.FASTA_FILE_TYPE );
					fileObjectStorage_FileContainer.setFile( file );
					fileObjectStorage_FileContainer.setFilename( file.getName() );
					fileObjectStorage_FileContainer.setFileImportTrackingSingleFileDTO( fileDBRecordItem );
					fileObjectStorage_FileContainer_AllEntries.addEntry(fileObjectStorage_FileContainer);

				} else {
					
					//  Standard processing to handle scan file has been copied to the server via the web app
					
					String filenameOnDisk_String = fileDBRecordItem.getFilenameOnDisk();
					String filenameInUpload = fileDBRecordItem.getFilenameInUpload();

					File file = new File( filenameOnDisk_String );
					if( ! file.exists() ) {
						System.err.println( "Could not find file: " + file.getAbsolutePath() );
						System.err.println( "fileImportRunIdToProcess: " + fileImportRunIdToProcess );
						System.err.println( "" );
						throw new LimelightImporterErrorProcessingRunIdException();
					}
					FileObjectStorage_FileContainer fileObjectStorage_FileContainer = new FileObjectStorage_FileContainer();
					fileObjectStorage_FileContainer.setFileType_FileObjectStore_FileType( FileObjectStore_FileType_Enum.FASTA_FILE_TYPE );
					fileObjectStorage_FileContainer.setFile( file );
					fileObjectStorage_FileContainer.setFilename( filenameInUpload );
					fileObjectStorage_FileContainer.setFileImportTrackingSingleFileDTO( fileDBRecordItem );
					fileObjectStorage_FileContainer_AllEntries.addEntry(fileObjectStorage_FileContainer);
				}
				
			} else {
				String msg = "Unexpected value in FileImportTrackingSingleFileDTO.fileType: " + fileDBRecordItem.getFileType();
				log.error( msg );
				throw new LimelightImporterInternalException( msg ); 
			}
		}
		
		if ( limelightXMLFileDBRecord == null ) {
			
			//  ONLY Importing Scan Files
			
			if ( scanFilesDBRecords.isEmpty() ) {
				
				//  NO Scan Files to import
				
				String msg = "NO Limelight XML file AND No Scan Files to Import";
				log.error( msg );
				throw new LimelightImporterInternalException( msg ); 
			}
			
			ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries =
					create_ScanFileFileContainer_AllEntries__Populate_importResults(scanFilesDBRecords, importResults, fileImportRunIdToProcess);
			

			Process_ScanFiles_ONLY_Main__No_LimelightXMLFile.getInstance().process_ScanFiles_ONLY_Main__No_LimelightXMLFile( scanFileFileContainer_AllEntries, projectId );
			
			return Importer__InsertedSearchId_When_NoSearchImported_Constants.INSERTED_SEARCH_ID_WHEN_NO_SEARCH_IMPORTED;  //  EARLY RETURN
			
			
//			String msg = "No Limelight XML File file record for fileImportTrackingDTO.getId(): " + fileImportTrackingDTO.getId();
//			log.error( msg );
//			throw new LimelightImporterInternalException( msg ); 
		}

		
		File mainXMLFileToImport = null;
		
		if ( StringUtils.isNotEmpty( limelightXMLFileDBRecord.getFilenameOnDiskWithPathSubSameMachine() ) ) {
			//  Populate Path on Search when submit on same machine
			skipPopulatingPathOnSearchLineOptChosen = false;
			String getFilenameOnDiskToImport = limelightXMLFileDBRecord.getFilenameOnDiskWithPathSubSameMachine();
			mainXMLFileToImport = new File( getFilenameOnDiskToImport );
			importResults.setImportedLimelightXMLFile( mainXMLFileToImport );
			if( ! mainXMLFileToImport.exists() ) {
				//  The User provided the path to this file 
				//  when the import was submitted, so this is considered a data error
				String msg = "Could not find Limelight XML File To Import: " + mainXMLFileToImport.getCanonicalPath();
				System.err.println( msg );
				throw new LimelightImporterDataException(msg);

				//					importResults.setImportSuccessStatus( false ) ;
				//					
				//					//  TODO	Consider different exit code since the import tracking tables 
				//					//  		are out of sync with the filesystem.
				//					
				//					importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
				//
				//					return importResults;  //  EARLY EXIT
			}
		} else {
			String getFilenameOnDiskToImport = limelightXMLFileDBRecord.getFilenameOnDisk();
			mainXMLFileToImport = new File( getFilenameOnDiskToImport );
			importResults.setImportedLimelightXMLFile( mainXMLFileToImport );
			if( ! mainXMLFileToImport.exists() ) {
				System.err.println( "Could not find mainXMLFileToImport File: " + mainXMLFileToImport.getCanonicalPath() );
				System.err.println( "fileImportRunIdToProcess: " + fileImportRunIdToProcess );
				throw new LimelightImporterErrorProcessingRunIdException();
			}
		}				
		long mainXMLFileToImportFileSize = mainXMLFileToImport.length();
		
		String SHA1Sum = SHA1SumCalculator.getInstance().getSHA1Sum( mainXMLFileToImport );
		FileImportTrackingSingleFileDAO_Importer.getInstance()
		.updateFileSizeSHA1Sum(mainXMLFileToImportFileSize, SHA1Sum, limelightXMLFileDBRecord.getId() );
		
		ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries =
				create_ScanFileFileContainer_AllEntries__Populate_importResults(scanFilesDBRecords, importResults, fileImportRunIdToProcess);

		int insertedSearchId = 
				importerCoreEntryPoint.doImport(
						projectId, 
						userIdInsertingSearch, 
						searchNameOverrideValue, 
						searchShortName,
						searchTags_SearchTagCategories_Root_And_SubParts_InputData, 
						importDirectoryOverrideValue, 
						mainXMLFileToImport,
						null, // limelightInputForImportParam
						fileObjectStorage_FileContainer_AllEntries,
						scanFileFileContainer_AllEntries,
						skipPopulatingPathOnSearchLineOptChosen, searchStatistics_General_SavedToDB_ToDB
						);
		
//		if ( StringUtils.isNotEmpty( filenameWithSearchIdToCreateOnSuccessInsert ) ) {
//			try {
//				String filenameWithSearchIdToCreateOnSuccessInsertActual = filenameWithSearchIdToCreateOnSuccessInsert + insertedSearchId;
//				FileWriter writer = null;
//				try {
//					writer = new FileWriter( filenameWithSearchIdToCreateOnSuccessInsertActual );
//					writer.write( "Inserted search id: " + insertedSearchId );
//				} finally {
//					if ( writer != null ) {
//						writer.close();
//					}
//				}
//			} catch ( Throwable t ) {
//				//  just eat it
//			}
//		}

		return insertedSearchId;



	}
	
	/**
	 * @param scanFilesDBRecords
	 * @param importResults
	 * @param fileImportRunIdToProcess
	 * @return
	 * @throws LimelightImporterDataException
	 * @throws Exception
	 */
	private ScanFileFileContainer_AllEntries create_ScanFileFileContainer_AllEntries__Populate_importResults(
			
			List<FileImportTrackingSingleFileDTO> scanFilesDBRecords,
			ImportResults importResults,
			int fileImportRunIdToProcess
			
			) throws LimelightImporterDataException, Exception {


		ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries = new ScanFileFileContainer_AllEntries();
		
		if ( scanFilesDBRecords.isEmpty() ) {
			// noScanFilesCommandLineOptChosen = true; 
		} else {
			
			List<File> scanFileList = new ArrayList<>( scanFilesDBRecords.size() );
			
			Set<String> scanFilenameInUpload_NoSuffixes = new HashSet<>();
			
			for ( FileImportTrackingSingleFileDTO scanFileDBRecord : scanFilesDBRecords ) {
				if ( StringUtils.isNotEmpty( scanFileDBRecord.getFilenameOnDiskWithPathSubSameMachine() ) ) {

					//  Special code for when the filename with path is passed to the webapp from the submitter
					
					String scanFileString = scanFileDBRecord.getFilenameOnDiskWithPathSubSameMachine();
					File scanFile = new File( scanFileString );
					String scanFilename = scanFile.getName();
					String errorStringScanSuffixValidation = ValidateScanFileSuffix.getInstance().validateScanFileSuffix( scanFilename );
					if ( errorStringScanSuffixValidation != null ) {
						System.err.println( errorStringScanSuffixValidation );
						throw new LimelightImporterDataException( errorStringScanSuffixValidation );
					}
					if( ! scanFile.exists() ) {
						//  The User provided the path to this file 
						//  when the import was submitted, so this is considered a data error
						String msg = "Could not find Scan File To Import: " + scanFile.getCanonicalPath();
						System.err.println( msg );
						System.err.println( "fileImportRunIdToProcess: " + fileImportRunIdToProcess );
						throw new LimelightImporterErrorProcessingRunIdException(msg);

						//							importResults.setImportSuccessStatus( false ) ;
						//							
						//							importResults.setProgramExitCode( ImporterProgramExitCodes.PROGRAM_EXIT_CODE_INVALID_COMMAND_LINE_PARAMETER_VALUES );
						//
						//							return importResults;  //  EARLY EXIT
					}
					ScanFileFileContainer scanFileFileContainer = new ScanFileFileContainer();
					scanFileFileContainer.setScanFile( scanFile );
					scanFileFileContainer.setScanFilename( scanFile.getName() );
					scanFileFileContainer.setScanFileDBRecord( scanFileDBRecord );
					scanFileFileContainer_AllEntries.addEntry(scanFileFileContainer);

					scanFileList.add(scanFile);
					
				} else {
					
					//  Standard processing to handle scan file has been copied to the server via the web app
					
					String scanFilenameOnDisk_String = scanFileDBRecord.getFilenameOnDisk();
					String scanFilenameInUpload = scanFileDBRecord.getFilenameInUpload();

					String errorStringScanSuffixValidation = ValidateScanFileSuffix.getInstance().validateScanFileSuffix( scanFilenameOnDisk_String );
					if ( errorStringScanSuffixValidation != null ) {
						System.err.println( errorStringScanSuffixValidation );
						System.err.println( "fileImportRunIdToProcess: " + fileImportRunIdToProcess );
						System.err.println( "" );
						throw new LimelightImporterErrorProcessingRunIdException();
					}

					{
						String scanFilenameInUpload_NoSuffix = FilenameUtils.removeExtension( scanFilenameInUpload );
						
						if ( ! scanFilenameInUpload_NoSuffixes.add( scanFilenameInUpload_NoSuffix ) ) {
							System.err.println( "scan filename (without Suffix) listed more than once: " 
									+ scanFilenameInUpload
									+ ", scanFilename in upload without Suffix: "
									+ scanFilenameInUpload_NoSuffix );
							System.err.println( "fileImportRunIdToProcess: " + fileImportRunIdToProcess );
							System.err.println( "" );
							throw new LimelightImporterErrorProcessingRunIdException();
						}
					}
					
					File scanFile = new File( scanFilenameOnDisk_String );
					if( ! scanFile.exists() ) {
						System.err.println( "Could not find scan file: " + scanFile.getAbsolutePath() );
						System.err.println( "fileImportRunIdToProcess: " + fileImportRunIdToProcess );
						System.err.println( "" );
						throw new LimelightImporterErrorProcessingRunIdException();
					}
					ScanFileFileContainer scanFileFileContainer = new ScanFileFileContainer();
					scanFileFileContainer.setScanFile( scanFile );
					scanFileFileContainer.setScanFilename( scanFilenameInUpload );
					scanFileFileContainer.setScanFileDBRecord( scanFileDBRecord );
					scanFileFileContainer_AllEntries.addEntry(scanFileFileContainer);
					
					scanFileList.add(scanFile);
				}
			}					
		
			importResults.setScanFileList( scanFileList );

		}
		
		return scanFileFileContainer_AllEntries;
	}
}