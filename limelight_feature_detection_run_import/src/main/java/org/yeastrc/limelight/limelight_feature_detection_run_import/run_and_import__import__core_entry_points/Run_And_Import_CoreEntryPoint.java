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
package org.yeastrc.limelight.limelight_feature_detection_run_import.run_and_import__import__core_entry_points;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_feature_detection_run_import.config.GetFeatureDetectionConfigFromConfigTable;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionRootDAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionRoot_ProjectScanFile_Mapping_DAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.ProjectDAO_Partial;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.ProjectScanFileDAO_Partial;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.ScanFileDAO_Partial;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dto.ProjectDTO_Partial;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterConfigurationException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterProjectNotAllowImportException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporter_PipelineRunErrorResult_Exception;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporter_ThrowOnShutdownSet_Exception;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.Limelight_FeatureDetectionRunImport_StatusStringUnexpectedValue_Exception;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Bullseye_Conf_File;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Bullseye_Conf_File.ImportFile_Bullseye_Conf_File__Params;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Bullseye_Results;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Bullseye_Results.ImportFile_Bullseye_Results__Params;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Hardklor_Conf_File;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Hardklor_Conf_File.ImportFile_Hardklor_Conf_File__Params;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Hardklor_Results;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Hardklor_Results.ImportFile_Hardklor_Results__Params;
import org.yeastrc.limelight.limelight_feature_detection_run_import.insert_mapping_singular_persistent_to_db.Insert_Mapping_Singular_Persistent_ToDB;
import org.yeastrc.limelight.limelight_feature_detection_run_import.insert_mapping_singular_persistent_to_db.Insert_Mapping_Singular_Persistent_ToDB.Insert_Mapping_Singular_Persistent_ToDB__Params;
import org.yeastrc.limelight.limelight_feature_detection_run_import.run_feature_detection_service_communication.RunFeatureDetectionService_CancelRequest_SendObject;
import org.yeastrc.limelight.limelight_feature_detection_run_import.run_feature_detection_service_communication.RunFeatureDetectionService_Communication;
import org.yeastrc.limelight.limelight_feature_detection_run_import.run_feature_detection_service_communication.RunFeatureDetectionService_GetStatus_ReceiveObject;
import org.yeastrc.limelight.limelight_feature_detection_run_import.run_feature_detection_service_communication.RunFeatureDetectionService_GetStatus_SendObject;
import org.yeastrc.limelight.limelight_feature_detection_run_import.run_feature_detection_service_communication.RunFeatureDetectionService_SubmitRequest_ReceiveObject;
import org.yeastrc.limelight.limelight_feature_detection_run_import.run_feature_detection_service_communication.RunFeatureDetectionService_SubmitRequest_SendObject;
import org.yeastrc.limelight.limelight_feature_detection_run_import.searcher.SpectralStorageAPIKey_For_ProjectScanFileId_Searcher;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.import_and_pipeline_run.dao.FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.constants.FeatureDetectionTypeLabel_Values_Constants;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionRootDTO;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionRoot_ProjectScanFile_Mapping_DTO;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.constants.FeatureDetection_HardklorBullseye_RunResult_Filenames_Constants;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.constants.FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.shared_objects.FeatureDetection_HardklorBullseye_Run_RequestData_V001;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingSingleFile_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingSingleFileDTO;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_IncludeReturnIonInjectionTimeData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_IncludeReturnScanLevelTotalIonCurrentData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ScanFileAPI_Key_NotFound;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanDataFromScanNumbers_Request;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanDataFromScanNumbers_Response;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanNumbers_Request;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanNumbers_Response;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebservice;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebserviceInitParameters;

import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

/**
 * 
 *
 */
public class Run_And_Import_CoreEntryPoint {

	private static final Logger log = LoggerFactory.getLogger( Run_And_Import_CoreEntryPoint.class );
	
	private static final int CHECK_RUN_PIPELINE_STATUS_WAIT_TIME__IN_MILLISECONDS = 5000;
	
	/**
	 * private constructor
	 */
	private Run_And_Import_CoreEntryPoint(){}
	public static Run_And_Import_CoreEntryPoint getInstance() {
		return new Run_And_Import_CoreEntryPoint();
	}

	private volatile boolean shutdownRequested = false;


	public boolean isShutdownRequested() {
		return shutdownRequested;
	}
	public void setShutdownRequested(boolean shutdownRequested) {

		synchronized (this) {
			this.shutdownRequested = true;

			this.notify();
		}
	}
	
	
	/**
	 * @param fileImportAndPipelineRunTrackingDTO
	 * @param fileImportAndPipelineRunTrackingRunDTO
	 * @throws Exception
	 * @throws LimelightImporterProjectNotAllowImportException
	 */
	public void process( 
			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO,
			FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO
		
			) throws Exception, LimelightImporterProjectNotAllowImportException {

		try {
			int projectId = fileImportAndPipelineRunTrackingDTO.getProjectId();
			Integer userIdInsertingRecords = fileImportAndPipelineRunTrackingDTO.getUserId();
			String requestData_AsString = fileImportAndPipelineRunTrackingDTO.getRequestData_AsString();

			//  Unmarshall the request data

			FeatureDetection_HardklorBullseye_Run_RequestData_V001 featureDetection_HardklorBullseye_Run_RequestData_V1 = null;

			try {
				JAXBContext jaxbContext = JAXBContext.newInstance( FeatureDetection_HardklorBullseye_Run_RequestData_V001.class );

				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

				Object unmarshalledObject = null;
				try {
					//  XML generated internal to Limelight so do NOT need Save Parsing
					//  XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
					StringReader stringReader = new StringReader( requestData_AsString );
					unmarshalledObject = unmarshaller.unmarshal( stringReader );
				} catch ( Exception e ) {
					System.out.println( "Exception in deserializing the Internal Request Data XML" );
					System.err.println( "Exception in deserializing the Internal Request Data XML" );
					e.printStackTrace( System.out );
					e.printStackTrace( System.err );
					throw new LimelightImporterInternalException( e.toString() , e ); 
				}
				if ( ! ( unmarshalledObject instanceof FeatureDetection_HardklorBullseye_Run_RequestData_V001 ) ) {
					String msg = "Object unmarshalled "
							+ " cannot be cast to FeatureDetection_HardklorBullseye_Run_RequestData_V1.  unmarshalledObject.getClass().getCanonicalName(): " + unmarshalledObject.getClass().getCanonicalName();
					System.err.println( msg );
					System.out.println( msg );
					throw new LimelightImporterInternalException(msg);
				}

				featureDetection_HardklorBullseye_Run_RequestData_V1 = (FeatureDetection_HardklorBullseye_Run_RequestData_V001) unmarshalledObject;

			} catch ( Exception e ) {
				System.out.println( "Exception in deserializing the Internal Request Data XML" );
				System.err.println( "Exception in deserializing the Internal Request Data XML" );
				e.printStackTrace( System.out );
				e.printStackTrace( System.err );
				throw e;
			}

			String spectralStorageAPIKey =
					SpectralStorageAPIKey_For_ProjectScanFileId_Searcher.getInstance()
					.get_SpectralStorageAPIKey_For_ProjectScanFileId( featureDetection_HardklorBullseye_Run_RequestData_V1.getProjectScanFileId() );

			if ( spectralStorageAPIKey == null ) {
				String msg = "spectralStorageAPIKey NOT Found for ProjectScanFileId: featureDetection_HardklorBullseye_Run_RequestData_V1.getProjectScanFileId()";
				System.err.println( msg );
				throw new LimelightImporterInternalException(msg);
			}
			
			if ( shutdownRequested ) {
				throw new LimelightImporter_ThrowOnShutdownSet_Exception();
			}

			String requestId = null;
			String statusString_Final = null;

			RunFeatureDetectionService_GetStatus_ReceiveObject runFeatureDetectionService_GetStatus_ReceiveObject = null;

			byte[] hardklorConfFile_Contents_ByteArray = null;
			byte[] bullseyeConfFile_Contents_ByteArray = null;
			
			//  TODO  remove 'if ( false ) ' to stop testing
			
			if ( true ) {

				FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Conf = null;
				FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf = null;
				
				{
					List<FileImportAndPipelineRunTrackingSingleFileDTO> dbResultList = 
							FileImportAndPipelineRunTrackingSingleFile_Shared_Get_DAO.getInstance().getFor_TrackingId(fileImportAndPipelineRunTrackingDTO.getId());
				
					for ( FileImportAndPipelineRunTrackingSingleFileDTO item : dbResultList ) {
						
						if ( item.getFileTypeId() == FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.HARDKLOR_CONF_FILE_FILE_TYPE_ID ) {
							fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Conf = item;
						} else if ( item.getFileTypeId() == FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.BULLSEYE_CONF_FILE_FILE_TYPE_ID ) {
							fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf = item;
						} else {
							String msg = "Unexpected FileTypeId on FileImportAndPipelineRunTrackingSingleFileDTO record. FileTypeId: "
									+ item.getFileTypeId()
									+ ", id: "
									+ item.getId();
							log.error(msg);
							System.out.println(msg);
							throw new LimelightImporterInternalException(msg);
						}
						
					}
				}
				
				if ( fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Conf != null ) {
					
					hardklorConfFile_Contents_ByteArray = get_FileContentsLocalFile_OR_AWS_S3_Object_Contents_ReturnAsByteArray(fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Conf);
				} else {
					hardklorConfFile_Contents_ByteArray = get_FileContentsLocalFile_ReturnAsByteArray( FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.HARDKLOR_CONF_FILE_FILENAME );
				}

				if ( fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf != null ) {
					
					bullseyeConfFile_Contents_ByteArray = get_FileContentsLocalFile_OR_AWS_S3_Object_Contents_ReturnAsByteArray(fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Conf);
				} else {
					bullseyeConfFile_Contents_ByteArray = get_FileContentsLocalFile_ReturnAsByteArray( FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.BULLSEYE_CONF_FILE_FILENAME );
				}
				
				RunFeatureDetectionService_SubmitRequest_SendObject runFeatureDetectionService_SubmitRequest_SendObject = new RunFeatureDetectionService_SubmitRequest_SendObject();

				runFeatureDetectionService_SubmitRequest_SendObject.setProject_id(projectId);
				runFeatureDetectionService_SubmitRequest_SendObject.setSpectr_file_id(spectralStorageAPIKey);

				{
					String contents_String = new String(hardklorConfFile_Contents_ByteArray, StandardCharsets.US_ASCII);
					runFeatureDetectionService_SubmitRequest_SendObject.setHardklor_conf(contents_String); // File contents
				}
				{
					String contents_String = new String(bullseyeConfFile_Contents_ByteArray, StandardCharsets.US_ASCII);
					runFeatureDetectionService_SubmitRequest_SendObject.setBullseye_conf(contents_String); // File contents
				}

				RunFeatureDetectionService_SubmitRequest_ReceiveObject runFeatureDetectionService_SubmitRequest_ReceiveObject = 
						RunFeatureDetectionService_Communication.getInstance().call_Submit_Webservice(runFeatureDetectionService_SubmitRequest_SendObject);

				System.out.println( "Submit response: " + runFeatureDetectionService_SubmitRequest_ReceiveObject );


				requestId = runFeatureDetectionService_SubmitRequest_ReceiveObject.getRequest_id();


				RunFeatureDetectionService_GetStatus_SendObject runFeatureDetectionService_GetStatus_SendObject = new RunFeatureDetectionService_GetStatus_SendObject();
				runFeatureDetectionService_GetStatus_SendObject.setProject_id(projectId);
				runFeatureDetectionService_GetStatus_SendObject.setRequest_id( runFeatureDetectionService_SubmitRequest_ReceiveObject.getRequest_id() );

				while ( true ) {

					if ( shutdownRequested ) {
						
						call_RunFeatureDetectionService_Cancel_Request( runFeatureDetectionService_SubmitRequest_ReceiveObject, projectId );
						
						throw new LimelightImporter_ThrowOnShutdownSet_Exception();
					}

					runFeatureDetectionService_GetStatus_ReceiveObject =
							RunFeatureDetectionService_Communication.getInstance().call_GetStatus_Webservice(runFeatureDetectionService_GetStatus_SendObject);

					System.out.println( "Each from Get Status response: " + runFeatureDetectionService_GetStatus_ReceiveObject );

					if ( ( ! "processing".equals( runFeatureDetectionService_GetStatus_ReceiveObject.getStatus() ) ) 
							&& ( ! "queued".equals( runFeatureDetectionService_GetStatus_ReceiveObject.getStatus() ) ) ) {

						//  Finished processing
						break;  //  EARLY BREAK LOOP
					}
					

					if ( shutdownRequested ) {
						
						call_RunFeatureDetectionService_Cancel_Request( runFeatureDetectionService_SubmitRequest_ReceiveObject, projectId );
						
						throw new LimelightImporter_ThrowOnShutdownSet_Exception();
					}

					
					if ( "queued".equals( runFeatureDetectionService_GetStatus_ReceiveObject.getStatus() ) ) {

						fileImportAndPipelineRunTrackingRunDTO.setIn_progress_end_user_display_message( "Run Hardklor/Bullseye: Queue Position: " + runFeatureDetectionService_GetStatus_ReceiveObject.getQueue_position() );

					} else if ( "processing".equals( runFeatureDetectionService_GetStatus_ReceiveObject.getStatus() ) ) {
							
						fileImportAndPipelineRunTrackingRunDTO.setIn_progress_end_user_display_message( "Run Hardklor/Bullseye Msg: " + runFeatureDetectionService_GetStatus_ReceiveObject.getEnd_user_message() );
					} else {
						
						fileImportAndPipelineRunTrackingRunDTO.setIn_progress_end_user_display_message( null );
					}

					FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO.getInstance()
					.updateStatusResultTexts( fileImportAndPipelineRunTrackingRunDTO );

					synchronized (this) {
						try {

							wait( CHECK_RUN_PIPELINE_STATUS_WAIT_TIME__IN_MILLISECONDS );  //  Wait 5 seconds and try again 

						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}					

					if ( shutdownRequested ) {
						
						call_RunFeatureDetectionService_Cancel_Request( runFeatureDetectionService_SubmitRequest_ReceiveObject, projectId );
						
						throw new LimelightImporter_ThrowOnShutdownSet_Exception();
					}

				}

				System.out.println( "Final response: " + runFeatureDetectionService_GetStatus_ReceiveObject );

				statusString_Final = runFeatureDetectionService_GetStatus_ReceiveObject.getStatus();
			}


			if ( shutdownRequested ) {
				throw new LimelightImporter_ThrowOnShutdownSet_Exception();
			}

			if ( "error".equals( statusString_Final ) ) {
								
				log.error( "Pipeline run ends with status 'error' and error_message: " + runFeatureDetectionService_GetStatus_ReceiveObject.getError_message() );
				
				throw new LimelightImporter_PipelineRunErrorResult_Exception(runFeatureDetectionService_GetStatus_ReceiveObject.getError_message() );
				
			} else if ( "success".equals( statusString_Final ) ) {

				System.out.println( "Final status of run Hardklor/Bullseye is success so import" );

				{
					fileImportAndPipelineRunTrackingRunDTO.setIn_progress_end_user_display_message( "Importing Hardklor/Bullseye results" );

					FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO.getInstance()
					.updateStatusResultTexts( fileImportAndPipelineRunTrackingRunDTO );
				}
				
				//  Confirm projectId is in database
				ProjectDTO_Partial projectDTO =	ProjectDAO_Partial.getInstance().getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
				if ( projectDTO == null ) {
					// should never happen
					String msg = "Project id is not in database " + projectId;
					log.warn( msg );
					throw new LimelightImporterProjectNotAllowImportException(msg);
				}
				if ( ( ! projectDTO.isEnabled() ) || ( projectDTO.isMarkedForDeletion() ) ) {
					String msg = "Project id is disabled or marked for deletion: " + projectId;
					log.warn( msg );
					throw new LimelightImporterProjectNotAllowImportException(msg);
				}
				if ( ( projectDTO.isProjectLocked() ) ) {

					//  Return Error
					String msg = "Project id is locked: " + projectId;
					log.warn( msg );
					throw new LimelightImporterProjectNotAllowImportException(msg);
				}


				Integer scanFileId = ProjectScanFileDAO_Partial.getInstance().get_scan_file_id_ById(featureDetection_HardklorBullseye_Run_RequestData_V1.getProjectScanFileId());
				if ( scanFileId == null ) {
					String msg = "scanFileId NOT found for projectScanFileId: " + featureDetection_HardklorBullseye_Run_RequestData_V1.getProjectScanFileId();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				

				
				Map<Integer, SingleScan_SubResponse> ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber = get_INTERNAL__ScanData_From_SpectralStorage( scanFileId );


				FeatureDetectionRootDTO featureDetectionRootDTO = new FeatureDetectionRootDTO();

				featureDetectionRootDTO.setScanFileId(scanFileId);
				featureDetectionRootDTO.setEntryFullyInserted(false);

				featureDetectionRootDTO.setFeatureDetectionTypeLabel( FeatureDetectionTypeLabel_Values_Constants.HARDKLOR_AND_BULLSEYE );

				featureDetectionRootDTO.setCreatedBy_UserId(userIdInsertingRecords);
				featureDetectionRootDTO.setUpdatedBy_UserId(userIdInsertingRecords);

				FeatureDetectionRootDAO.getInstance().save( featureDetectionRootDTO );
				
				
				
				//  HOST_MACHINE_FINAL_DIR configured for the .env file for RunFeatureDetectionService

				String HOST_MACHINE_FINAL_DIR = GetFeatureDetectionConfigFromConfigTable.get_RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH();
				
				if ( StringUtils.isEmpty( HOST_MACHINE_FINAL_DIR) ) {
					String msg = "NO value from config for HOST_MACHINE_FINAL_DIR";
					log.error(msg);
					throw new LimelightImporterConfigurationException(msg);
				}
				
				{
					String hardklor_Results_Filename_WithPath = 
							HOST_MACHINE_FINAL_DIR
							+ "/"
							+ projectId
							+ "/"
							+ requestId
							+ "/"
							+ FeatureDetection_HardklorBullseye_RunResult_Filenames_Constants.HARDKLOR_RESULT_FILE_FILENAME;

					File hardklor_Results_File = new File( hardklor_Results_Filename_WithPath );


					//  Import Hardklor Results file

					ImportFile_Hardklor_Results__Params importFile_Hardklor_Results__Params = new ImportFile_Hardklor_Results__Params();
					
					importFile_Hardklor_Results__Params.setFeatureDetectionRootId(featureDetectionRootDTO.getId());
					importFile_Hardklor_Results__Params.setFilename_Uploaded(hardklor_Results_File.getName());
					importFile_Hardklor_Results__Params.setFileToImport(hardklor_Results_File);
					importFile_Hardklor_Results__Params.setUserId(userIdInsertingRecords);
					
					importFile_Hardklor_Results__Params.setMs_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber(ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber);
					
					ImportFile_Hardklor_Results.getInstance().importFile_Hardklor_Results(importFile_Hardklor_Results__Params);
				}


				///

				{
					String bullseye_Results_Filename_WithPath = 
							HOST_MACHINE_FINAL_DIR
							+ "/"
							+ projectId
							+ "/"
							+ requestId
							+ "/"
							+ FeatureDetection_HardklorBullseye_RunResult_Filenames_Constants.BULLSEYE_RESULT_FILE_FILENAME;

					File bullseye_Results_File = new File( bullseye_Results_Filename_WithPath );

					//  Import Bullseye Results file

					ImportFile_Bullseye_Results__Params importFile_Bullseye_Results__Params = new ImportFile_Bullseye_Results__Params();
					importFile_Bullseye_Results__Params.setScanFileId(scanFileId);
					importFile_Bullseye_Results__Params.setFeatureDetectionRootId(featureDetectionRootDTO.getId());
					importFile_Bullseye_Results__Params.setFilename_Uploaded(bullseye_Results_File.getName());
					importFile_Bullseye_Results__Params.setFileToImport(bullseye_Results_File);
					importFile_Bullseye_Results__Params.setUserId(userIdInsertingRecords);

					ImportFile_Bullseye_Results.getInstance().importFile_Bullseye_Results(importFile_Bullseye_Results__Params);
				}

				{ 	//  Mapping  Singular to Persistent
					
					Insert_Mapping_Singular_Persistent_ToDB__Params insert_Mapping_Singular_Persistent_ToDB__Params = new Insert_Mapping_Singular_Persistent_ToDB__Params();
					
					insert_Mapping_Singular_Persistent_ToDB__Params.setFeatureDetectionRootId(featureDetectionRootDTO.getId());
					
					insert_Mapping_Singular_Persistent_ToDB__Params.setMs_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber(ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber);
					
					Insert_Mapping_Singular_Persistent_ToDB.getInstance().insert_Mapping_Singular_Persistent_ToDB(insert_Mapping_Singular_Persistent_ToDB__Params);
				}

				{   //  Insert Hardklor Conf file
					ImportFile_Hardklor_Conf_File__Params importFile_Hardklor_Conf_File__Params = new ImportFile_Hardklor_Conf_File__Params();
					
					importFile_Hardklor_Conf_File__Params.setFeatureDetectionRootId(featureDetectionRootDTO.getId());

					//  Always set since stored in DB table
					importFile_Hardklor_Conf_File__Params.setLimelight_InternalFilename( 
							FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.HARDKLOR_CONF_FILE_FILENAME );
					
					importFile_Hardklor_Conf_File__Params.setFilename_Uploaded(featureDetection_HardklorBullseye_Run_RequestData_V1.getHardklor_ConfFile_UploadedFilename());
					
					importFile_Hardklor_Conf_File__Params.setHardklorConfFile_Contents_ByteArray(hardklorConfFile_Contents_ByteArray);
					
					importFile_Hardklor_Conf_File__Params.setUserId(userIdInsertingRecords);
					
					ImportFile_Hardklor_Conf_File.getInstance().importFile_Hardklor_Conf_File(importFile_Hardklor_Conf_File__Params);
				}

				{   //  Insert Bullseye Conf file

					ImportFile_Bullseye_Conf_File__Params importFile_Bullseye_Conf_File__Params = new ImportFile_Bullseye_Conf_File__Params();
					
					importFile_Bullseye_Conf_File__Params.setFeatureDetectionRootId(featureDetectionRootDTO.getId());

					//  Always set since stored in DB table
					importFile_Bullseye_Conf_File__Params.setLimelight_InternalFilename( 
							FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.BULLSEYE_CONF_FILE_FILENAME );
					
					importFile_Bullseye_Conf_File__Params.setBullseyeConfFile_Contents_ByteArray__Param(bullseyeConfFile_Contents_ByteArray);
							
					importFile_Bullseye_Conf_File__Params.setFilename_Uploaded(featureDetection_HardklorBullseye_Run_RequestData_V1.getBullseye_ConfFile_UploadedFilename());
					importFile_Bullseye_Conf_File__Params.setUserId(userIdInsertingRecords);
					
					ImportFile_Bullseye_Conf_File.getInstance().importFile_Bullseye_Conf_File(importFile_Bullseye_Conf_File__Params);
				}
				

				FeatureDetectionRootDAO.getInstance().set_True_EntryFullyInserted( featureDetectionRootDTO.getId(), userIdInsertingRecords);

				FeatureDetectionRoot_ProjectScanFile_Mapping_DTO featureDetectionRoot_ProjectScanFile_Mapping_DTO = new FeatureDetectionRoot_ProjectScanFile_Mapping_DTO();
				
				featureDetectionRoot_ProjectScanFile_Mapping_DTO.setFeatureDetectionRootId(featureDetectionRootDTO.getId());
				featureDetectionRoot_ProjectScanFile_Mapping_DTO.setProjectScanFileId( featureDetection_HardklorBullseye_Run_RequestData_V1.getProjectScanFileId() );
				featureDetectionRoot_ProjectScanFile_Mapping_DTO.setDisplayLabel(featureDetection_HardklorBullseye_Run_RequestData_V1.getLabel() );
				featureDetectionRoot_ProjectScanFile_Mapping_DTO.setDescription( featureDetection_HardklorBullseye_Run_RequestData_V1.getDescription() );
				featureDetectionRoot_ProjectScanFile_Mapping_DTO.setCreatedBy_UserId( userIdInsertingRecords );
				featureDetectionRoot_ProjectScanFile_Mapping_DTO.setUpdatedBy_UserId( userIdInsertingRecords );

				FeatureDetectionRoot_ProjectScanFile_Mapping_DAO.getInstance().save( featureDetectionRoot_ProjectScanFile_Mapping_DTO );

				System.out.println( "Import of Hardklor/Bullseye results is COMPLETE Successful" );

			} else {
				
				String msg = "Status string from Get Status webservice call is unexpected string. status string: " + statusString_Final;
				log.error(msg);
				throw new Limelight_FeatureDetectionRunImport_StatusStringUnexpectedValue_Exception(msg);
			}

		} catch ( Exception e ) {
			if ( ! shutdownRequested ) {
				System.out.println( "Exception in processing" );
				System.err.println( "Exception in processing" );
				e.printStackTrace( System.out );
				e.printStackTrace( System.err );



			}
			throw e;
		}
	}


	/**
	 * @param fileImportAndPipelineRunTrackingSingleFileDTO
	 * @return
	 * @throws IOException
	 * @throws Exception 
	 */
	private byte[] get_FileContentsLocalFile_OR_AWS_S3_Object_Contents_ReturnAsByteArray( FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO) throws IOException, Exception {
		
		if ( StringUtils.isNotEmpty( fileImportAndPipelineRunTrackingSingleFileDTO.getFilenameOnDisk() ) ) {
			
			return get_FileContentsLocalFile_ReturnAsByteArray( fileImportAndPipelineRunTrackingSingleFileDTO.getFilenameOnDisk() ) ;
		}
		
		if ( StringUtils.isNotEmpty( fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_bucket_name() ) ) {
			
			//  Not a local file.  Get from AWS S3

			S3Client amazonS3_Client = null;

			{  // Use Region from fileImportAndPipelineRunTrackingSingleFileDTO, otherwise Config, otherwise SDK use from Environment Variable

				String amazonS3_RegionName = fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_region();

				if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
							
					amazonS3_RegionName = ConfigSystemDAO_Importer.getInstance().getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_REGION_KEY );
				}

				if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
					
					Region aws_S3_Region = Region.of(amazonS3_RegionName);
					
					amazonS3_Client = 
							S3Client.builder()
							.region( aws_S3_Region )
							.httpClientBuilder(ApacheHttpClient.builder())
							.build();
					
				} else {
					//  SDK use Region from Environment Variable
					
					amazonS3_Client = 
							S3Client.builder()
							.httpClientBuilder(ApacheHttpClient.builder())
							.build(); 
				}
			}

			GetObjectRequest getObjectRequest = 
					GetObjectRequest
					.builder()
					.bucket(fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_bucket_name())
					.key( fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_object_key() )
					.build();
			try {
				byte[] confFile_Contents_ByteArray = amazonS3_Client.getObjectAsBytes(getObjectRequest).asByteArray();

				return confFile_Contents_ByteArray;
				
			} catch ( NoSuchKeyException e ) {

				//  Throw Data Exception if externally passed in object key and bucket name

				System.err.println( "Could not find S3 Object.  ObjectKey: " 
						+ fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_object_key() 
						+ ", Object Bucket: " 
						+ fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_bucket_name() );
				throw new LimelightImporterInternalException(e);
			}

		}
		
		String msg = "fileImportAndPipelineRunTrackingSingleFileDTO.getFilenameOnDisk() AND fileImportAndPipelineRunTrackingSingleFileDTO.getAws_s3_bucket_name() are BOTH Empty";
		log.error(msg);
		throw new LimelightImporterInternalException(msg);
	}

	/**
	 * @param filename
	 * @return
	 * @throws IOException 
	 */
	private byte[] get_FileContentsLocalFile_ReturnAsByteArray( String filename ) throws IOException {

		File confFile = new File( filename );  //  Load from directory the program runs in

		Path confFile_Path = confFile.toPath();

		byte[] confFile_Contents_ByteArray = Files.readAllBytes(confFile_Path);

		return confFile_Contents_ByteArray;
	}
	
	/**
	 * @param webserviceMethod_Internal_Params
	 * @return
	 * @throws Exception 
	 */
	private Map<Integer, SingleScan_SubResponse> get_INTERNAL__ScanData_From_SpectralStorage( int scanFileId ) throws Exception {

		//  MS 1 data from Spectral Storage

		//  Map of MS 1 Scans, Key on Scan Number
		
		Map<Integer, SingleScan_SubResponse> ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber = null; // ONLY MS 1 scans
		
		//  Get MS 1 data from Spectral Storage

		{
			List<Integer> scanLevelsToInclude = new ArrayList<>( 1 );
			
			scanLevelsToInclude.add( 1 );  // ONLY level 1 scans
			
			
			///  Spectr connector
			

			// First get override URL from config file
			String spectralStorageWebserviceBaseURL = null;
//					LimelightConfigFileValues.getInstance().getSpectralStorageServerURLandAppContext();
					
			if ( StringUtils.isEmpty( spectralStorageWebserviceBaseURL ) ) {
				//  Not in config file so get from config_system table
				spectralStorageWebserviceBaseURL = 
						ConfigSystemDAO_Importer.getInstance()
						.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL );
			}
			
			if ( StringUtils.isEmpty( spectralStorageWebserviceBaseURL ) ) {
				String msg = "No value in config for key '"
						+ ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL
						+ "'.";
				log.error( msg );
				throw new LimelightImporterConfigurationException( msg );
			}
			
			CallSpectralStorageGetDataWebserviceInitParameters initParams = new CallSpectralStorageGetDataWebserviceInitParameters();
			
			initParams.setSpectralStorageServerBaseURL( spectralStorageWebserviceBaseURL );
			
			CallSpectralStorageGetDataWebservice callSpectralStorageWebservice = CallSpectralStorageGetDataWebservice.getInstance();

			callSpectralStorageWebservice.init( initParams );
			

			
			//  Get all MS 1 scans from Spectr

			String scanFileAPIKey = ScanFileDAO_Partial.getInstance().getSpectralStorageAPIKeyById( scanFileId );
			if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
				String msg = "No value for scanFileAPIKey for scan file id: " + scanFileId;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}

			
			Get_ScanNumbers_Request get_ScanNumbers_Request = new Get_ScanNumbers_Request();
			get_ScanNumbers_Request.setScanFileAPIKey( scanFileAPIKey );
			get_ScanNumbers_Request.setScanLevelsToInclude(scanLevelsToInclude);
			get_ScanNumbers_Request.setScanLevelsToExclude(null);
			
			Get_ScanNumbers_Response get_ScanNumbers_Response =
					callSpectralStorageWebservice.call_Get_ScanNumbers_Webservice( get_ScanNumbers_Request );

			if ( get_ScanNumbers_Response.getStatus_scanFileAPIKeyNotFound() 
					== Get_ScanData_ScanFileAPI_Key_NotFound.YES ) {
				String msg = "No data in Spectral Storage for API Key: " + scanFileAPIKey;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
					
			List<Integer> scanNumbersList = get_ScanNumbers_Response.getScanNumbers();
			
			if ( scanNumbersList == null ) {
				String msg = "Returned scanNumbersList property is null: Spectral Storage API Key: " + scanFileAPIKey;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			
			ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber = new HashMap<>( scanNumbersList.size() );  //  Oversized

			//  Get the MS 1 & 2 scans from Spectr
			

			Get_ScanDataFromScanNumbers_Request get_ScanDataFromScanNumbers_Request = new Get_ScanDataFromScanNumbers_Request();
			get_ScanDataFromScanNumbers_Request.setScanFileAPIKey( scanFileAPIKey );
			get_ScanDataFromScanNumbers_Request.setScanNumbers( scanNumbersList );
			
			get_ScanDataFromScanNumbers_Request.setIncludeParentScans( Get_ScanDataFromScanNumbers_IncludeParentScans.NO );
			get_ScanDataFromScanNumbers_Request.setExcludeReturnScanPeakData( Get_ScanData_ExcludeReturnScanPeakData.YES );
			
			get_ScanDataFromScanNumbers_Request.setIncludeReturnScanLevelTotalIonCurrentData(Get_ScanData_IncludeReturnScanLevelTotalIonCurrentData.YES);
			get_ScanDataFromScanNumbers_Request.setIncludeReturnIonInjectionTimeData(Get_ScanData_IncludeReturnIonInjectionTimeData.YES);
			
			Get_ScanDataFromScanNumbers_Response get_ScanDataFromScanNumber_Response =
					callSpectralStorageWebservice.call_Get_ScanDataFromScanNumbers_Webservice( get_ScanDataFromScanNumbers_Request );

			if ( get_ScanDataFromScanNumber_Response.getStatus_scanFileAPIKeyNotFound() 
					== Get_ScanData_ScanFileAPI_Key_NotFound.YES ) {
				String msg = "No data in Spectral Storage for API Key: " + scanFileAPIKey;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			
			if ( get_ScanDataFromScanNumber_Response.getTooManyScansToReturn() != null
					&& get_ScanDataFromScanNumber_Response.getTooManyScansToReturn() ) {
				
				String msg = "Tried to get data from Spectral Storage Service for too many scan numbers.  "
						+ " MaxScansToReturn: " + get_ScanDataFromScanNumber_Response.getMaxScansToReturn();
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
			
			List<SingleScan_SubResponse> scans = get_ScanDataFromScanNumber_Response.getScans();
			
			if ( scans == null ) {
				String msg = "Returned Scans property is null: Spectral Storage API Key: " + scanFileAPIKey;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
						
			//  Put the MS1 scans into Map<{MS1 Scan Number}, MS 1 Scan> >
			
			for ( SingleScan_SubResponse scan : scans ) {
				
				if ( scan.getLevel() == 1 ) {
					
					ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber.put( scan.getScanNumber(), scan );
					
				} else {

					String msg = "( scan.getLevel() is not 1.  scan.getLevel() : " + scan.getLevel() + ", scan number: " + scan.getScanNumber();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
					
				}
			}
		}
		
		return ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber;
	}
	
	
	/**
	 * @param runFeatureDetectionService_SubmitRequest_ReceiveObject
	 */
	void call_RunFeatureDetectionService_Cancel_Request( RunFeatureDetectionService_SubmitRequest_ReceiveObject runFeatureDetectionService_SubmitRequest_ReceiveObject, int projectId ) {
		
		try {
			RunFeatureDetectionService_CancelRequest_SendObject runFeatureDetectionService_CancelRequest_SendObject = new RunFeatureDetectionService_CancelRequest_SendObject();
			
			runFeatureDetectionService_CancelRequest_SendObject.setRequest_id(runFeatureDetectionService_SubmitRequest_ReceiveObject.getRequest_id());
			runFeatureDetectionService_CancelRequest_SendObject.setProject_id(projectId);
			
//			RunFeatureDetectionService_CancelRequest_ReceiveObject runFeatureDetectionService_CancelRequest_ReceiveObject =
				RunFeatureDetectionService_Communication.getInstance().call_CancelRequest_Webservice(runFeatureDetectionService_CancelRequest_SendObject);
		
		} catch ( Throwable t ) {
			
			//  Eat exception
		}

	}
}
