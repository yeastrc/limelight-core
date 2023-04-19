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
import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionRootDAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionRoot_ProjectScanFile_Mapping_DAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.ProjectDAO_Partial;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.ProjectScanFileDAO_Partial;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.ScanFileDAO_Partial;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dto.ProjectDTO_Partial;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterConfigurationException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterProjectNotAllowImportException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Bullseye_Results;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Bullseye_Results.ImportFile_Bullseye_Results__Params;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Hardklor_Conf_File;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Hardklor_Conf_File.ImportFile_Hardklor_Conf_File__Params;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Hardklor_Results;
import org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db.ImportFile_Hardklor_Results.ImportFile_Hardklor_Results__Params;
import org.yeastrc.limelight.limelight_feature_detection_run_import.insert_mapping_singular_persistent_to_db.Insert_Mapping_Singular_Persistent_ToDB;
import org.yeastrc.limelight.limelight_feature_detection_run_import.insert_mapping_singular_persistent_to_db.Insert_Mapping_Singular_Persistent_ToDB.Insert_Mapping_Singular_Persistent_ToDB__Params;
import org.yeastrc.limelight.limelight_feature_detection_run_import.searcher.SpectralStorageAPIKey_For_ProjectScanFileId_Searcher;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.constants.FeatureDetectionTypeLabel_Values_Constants;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionRootDTO;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionRoot_ProjectScanFile_Mapping_DTO;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.constants.FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.shared_objects.FeatureDetection_HardklorBullseye_Import_RequestData_V001;
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

/**
 * 
 *
 */
public class Import_CoreEntryPoint {

	private static final Logger log = LoggerFactory.getLogger( Import_CoreEntryPoint.class );

	/**
	 * private constructor
	 */
	private Import_CoreEntryPoint(){}
	public static Import_CoreEntryPoint getInstance() {
		return new Import_CoreEntryPoint();
	}

	private volatile boolean shutdownRequested = false;

	public void process( 
			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO,
			FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO
		
			) throws Exception, LimelightImporterProjectNotAllowImportException {

		try {
			int projectId = fileImportAndPipelineRunTrackingDTO.getProjectId();
			Integer userIdInsertingRecords = fileImportAndPipelineRunTrackingDTO.getUserId();
			String requestData_AsString = fileImportAndPipelineRunTrackingDTO.getRequestData_AsString();

			//  Unmarshall the request data

			FeatureDetection_HardklorBullseye_Import_RequestData_V001 featureDetection_HardklorBullseye_Import_RequestData_V001 = null;

			try {
				JAXBContext jaxbContext = JAXBContext.newInstance( FeatureDetection_HardklorBullseye_Import_RequestData_V001.class );

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
				if ( ! ( unmarshalledObject instanceof FeatureDetection_HardklorBullseye_Import_RequestData_V001 ) ) {
					String msg = "Object unmarshalled "
							+ " cannot be cast to FeatureDetection_HardklorBullseye_Import_RequestData_V001.  unmarshalledObject.getClass().getCanonicalName(): " + unmarshalledObject.getClass().getCanonicalName();
					System.err.println( msg );
					System.out.println( msg );
					throw new LimelightImporterInternalException(msg);
				}

				featureDetection_HardklorBullseye_Import_RequestData_V001 = (FeatureDetection_HardklorBullseye_Import_RequestData_V001) unmarshalledObject;

			} catch ( Exception e ) {
				System.out.println( "Exception in deserializing the Internal Request Data XML" );
				System.err.println( "Exception in deserializing the Internal Request Data XML" );
				e.printStackTrace( System.out );
				e.printStackTrace( System.err );
				throw e;
			}

			String spectralStorageAPIKey =
					SpectralStorageAPIKey_For_ProjectScanFileId_Searcher.getInstance()
					.get_SpectralStorageAPIKey_For_ProjectScanFileId( featureDetection_HardklorBullseye_Import_RequestData_V001.getProjectScanFileId() );

			if ( spectralStorageAPIKey == null ) {
				String msg = "spectralStorageAPIKey NOT Found for ProjectScanFileId: featureDetection_HardklorBullseye_Import_RequestData_V001.getProjectScanFileId()";
				System.err.println( msg );
				throw new LimelightImporterInternalException(msg);
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


			Integer scanFileId = ProjectScanFileDAO_Partial.getInstance().get_scan_file_id_ById(featureDetection_HardklorBullseye_Import_RequestData_V001.getProjectScanFileId());
			if ( scanFileId == null ) {
				String msg = "scanFileId NOT found for projectScanFileId: " + featureDetection_HardklorBullseye_Import_RequestData_V001.getProjectScanFileId();
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

			
			FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Results = null;
			FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Conf = null;
			FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results = null;
			
			{
				List<FileImportAndPipelineRunTrackingSingleFileDTO> dbResultList = 
						FileImportAndPipelineRunTrackingSingleFile_Shared_Get_DAO.getInstance().getFor_TrackingId(fileImportAndPipelineRunTrackingDTO.getId());
			
				for ( FileImportAndPipelineRunTrackingSingleFileDTO item : dbResultList ) {
					
					if ( item.getFileTypeId() == FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.HARDKLOR_RESULT_FILE_FILE_TYPE_ID ) {
						fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Results = item;
					} else if ( item.getFileTypeId() == FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.HARDKLOR_CONF_FILE_FILE_TYPE_ID ) {
						fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Conf = item;
					} else if ( item.getFileTypeId() == FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.BULLSEYE_RESULT_FILE_FILE_TYPE_ID ) {
						fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results = item;
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
			
			{
				//  Import Hardklor Results file

				ImportFile_Hardklor_Results__Params importFile_Hardklor_Results__Params = new ImportFile_Hardklor_Results__Params();

				importFile_Hardklor_Results__Params.setFeatureDetectionRootId(featureDetectionRootDTO.getId());
				if ( fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Results != null ) {
				
					importFile_Hardklor_Results__Params.setFileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Results(fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Results);
				} else {
					String hardklor_Results_Filename_WithPath = 
							FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.HARDKLOR_RESULT_FILE_FILENAME;

					File hardklor_Results_File = new File( hardklor_Results_Filename_WithPath );

					importFile_Hardklor_Results__Params.setFilename_Uploaded(hardklor_Results_File.getName());
					importFile_Hardklor_Results__Params.setFileToImport(hardklor_Results_File);
				}
				
				importFile_Hardklor_Results__Params.setUserId(userIdInsertingRecords);
				
				importFile_Hardklor_Results__Params.setMs_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber(ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber);

				ImportFile_Hardklor_Results.getInstance().importFile_Hardklor_Results(importFile_Hardklor_Results__Params);
			}


			///

			{
				//  Import Bullseye Results file

				ImportFile_Bullseye_Results__Params importFile_Bullseye_Results__Params = new ImportFile_Bullseye_Results__Params();
				importFile_Bullseye_Results__Params.setScanFileId(scanFileId);
				importFile_Bullseye_Results__Params.setFeatureDetectionRootId(featureDetectionRootDTO.getId());
				
				if ( fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Results != null ) {
					
					importFile_Bullseye_Results__Params.setFileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results(fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results);;
				} else {
					String bullseye_Results_Filename_WithPath = 
							FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.BULLSEYE_RESULT_FILE_FILENAME;

					File bullseye_Results_File = new File( bullseye_Results_Filename_WithPath );

					importFile_Bullseye_Results__Params.setFilename_Uploaded(bullseye_Results_File.getName());
					importFile_Bullseye_Results__Params.setFileToImport(bullseye_Results_File);
				}
				
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
				
				if ( fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Conf != null ) {

					importFile_Hardklor_Conf_File__Params.setFileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Conf(fileImportAndPipelineRunTrackingSingleFileDTO__Hardklor_Conf);
					
				} else {

					importFile_Hardklor_Conf_File__Params.setFilename_Uploaded(featureDetection_HardklorBullseye_Import_RequestData_V001.getHardklor_ConfFile_UploadedFilename());
				}

				//  Always set since stored in DB table
				importFile_Hardklor_Conf_File__Params.setLimelight_InternalFilename( 
						FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.HARDKLOR_CONF_FILE_FILENAME );
				
				importFile_Hardklor_Conf_File__Params.setUserId(userIdInsertingRecords);

				ImportFile_Hardklor_Conf_File.getInstance().importFile_Hardklor_Conf_File(importFile_Hardklor_Conf_File__Params);
			}


			FeatureDetectionRootDAO.getInstance().set_True_EntryFullyInserted( featureDetectionRootDTO.getId(), userIdInsertingRecords);

			FeatureDetectionRoot_ProjectScanFile_Mapping_DTO featureDetectionRoot_ProjectScanFile_Mapping_DTO = new FeatureDetectionRoot_ProjectScanFile_Mapping_DTO();

			featureDetectionRoot_ProjectScanFile_Mapping_DTO.setFeatureDetectionRootId(featureDetectionRootDTO.getId());
			featureDetectionRoot_ProjectScanFile_Mapping_DTO.setProjectScanFileId( featureDetection_HardklorBullseye_Import_RequestData_V001.getProjectScanFileId() );
			featureDetectionRoot_ProjectScanFile_Mapping_DTO.setDisplayLabel(featureDetection_HardklorBullseye_Import_RequestData_V001.getLabel() );
			featureDetectionRoot_ProjectScanFile_Mapping_DTO.setDescription( featureDetection_HardklorBullseye_Import_RequestData_V001.getDescription() );
			featureDetectionRoot_ProjectScanFile_Mapping_DTO.setCreatedBy_UserId( userIdInsertingRecords );
			featureDetectionRoot_ProjectScanFile_Mapping_DTO.setUpdatedBy_UserId( userIdInsertingRecords );

			FeatureDetectionRoot_ProjectScanFile_Mapping_DAO.getInstance().save( featureDetectionRoot_ProjectScanFile_Mapping_DTO );

			System.out.println( "Import of Hardklor/Bullseye results is COMPLETE Successful" );

//				TODO  Update Tracking record with success


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
	

	public boolean isShutdownRequested() {
		return shutdownRequested;
	}
	public void setShutdownRequested(boolean shutdownRequested) {
		this.shutdownRequested = shutdownRequested;
	}
}
