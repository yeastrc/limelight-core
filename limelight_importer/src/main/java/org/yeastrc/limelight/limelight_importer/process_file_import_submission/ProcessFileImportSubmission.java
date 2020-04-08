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
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.objects.TrackingDTOTrackingRunDTOPair;
import org.yeastrc.limelight.limelight_importer.dao.FileImportTrackingSingleFileDAO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataNotFoundException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterErrorProcessingRunIdException;
import org.yeastrc.limelight.limelight_importer.importer_core_entry_point.ImporterCoreEntryPoint;
import org.yeastrc.limelight.limelight_importer.objects.ImportResults;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.scan_file_processing_validating.ValidateScanFileSuffix;
import org.yeastrc.limelight.limelight_importer.utils.SHA1SumCalculator;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTrackingRun_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;

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
			ImportResults importResults ) throws Exception {

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

		//  "search_path" field from "file_import_tracking" table, if import run from Run Import pgm
		String importDirectoryOverrideValue = null;
		boolean skipPopulatingPathOnSearchLineOptChosen = true;
		if ( StringUtils.isNotEmpty( fileImportTrackingDTO.getSearchPath() ) ) {
			skipPopulatingPathOnSearchLineOptChosen = false;
			importDirectoryOverrideValue = fileImportTrackingDTO.getSearchPath();
		}

		List<File> scanFileList = null;

		///  Get the Limelight XML file and Scan files
		List<FileImportTrackingSingleFileDTO> fileDBRecordList = 
				FileImportTrackingSingleFileDAO_Importer.getInstance()
				.getForTrackingId( fileImportTrackingDTO.getId() );
		FileImportTrackingSingleFileDTO limelightXMLFileDBRecord = null;
		List<FileImportTrackingSingleFileDTO> scanFilesDBRecords = new ArrayList<>( fileDBRecordList.size() ); 
		for ( FileImportTrackingSingleFileDTO fileDBRecordItem : fileDBRecordList ) {
			if ( fileDBRecordItem.getFileType() == FileImportFileType.LIMELIGHT_XML_FILE ) {
				limelightXMLFileDBRecord = fileDBRecordItem;
			} else if ( fileDBRecordItem.getFileType() == FileImportFileType.SCAN_FILE ) {
				scanFilesDBRecords.add( fileDBRecordItem );
			} else {
				String msg = "Unexpected value in FileImportTrackingSingleFileDTO.fileType: " + fileDBRecordItem.getFileType();
				log.error( msg );
				throw new LimelightImporterInternalException( msg ); 
			}
		}
		if ( limelightXMLFileDBRecord == null ) {
			String msg = "No Limelight XML File file record for fileImportTrackingDTO.getId(): " + fileImportTrackingDTO.getId();
			log.error( msg );
			throw new LimelightImporterInternalException( msg ); 
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
		
		Map<String,ScanFileFileContainer> scanFileFileContainer_KeyFilename = null;
		
		if ( scanFilesDBRecords.isEmpty() ) {
			// noScanFilesCommandLineOptChosen = true; 
		} else {
			
			scanFileFileContainer_KeyFilename = new HashMap<>();
			
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
					scanFileFileContainer.setScanFileDBRecord( scanFileDBRecord );
					scanFileFileContainer_KeyFilename.put( scanFile.getName(), scanFileFileContainer );
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
					scanFileFileContainer.setScanFileDBRecord( scanFileDBRecord );
					scanFileFileContainer_KeyFilename.put( scanFilenameInUpload, scanFileFileContainer );
				}
			}					
			scanFileList = new ArrayList<>( scanFileFileContainer_KeyFilename.size() );
			for ( Map.Entry<String, ScanFileFileContainer> scanFileFileContainerEntry : scanFileFileContainer_KeyFilename.entrySet() ) {
				scanFileList.add( scanFileFileContainerEntry.getValue().getScanFile() );
			}
			importResults.setScanFileList( scanFileList );

		}
		
		
		int insertedSearchId = 
				importerCoreEntryPoint.doImport(
						projectId, 
						userIdInsertingSearch, 
						searchNameOverrideValue, 
						importDirectoryOverrideValue, 
						mainXMLFileToImport, 
						null, // LimelightInputForImportParam, 
						scanFileFileContainer_KeyFilename,
						skipPopulatingPathOnSearchLineOptChosen
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
}