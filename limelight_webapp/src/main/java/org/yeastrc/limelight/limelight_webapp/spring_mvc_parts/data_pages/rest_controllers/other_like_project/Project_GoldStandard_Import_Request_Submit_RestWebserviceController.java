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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project;

import java.io.File;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.constants.FileImportPipelineRunCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.shared_objects.FileImportPipelineRun_LabelValuePairs_JSON_Contents_V001;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.shared_objects.FileImportPipelineRun_LabelValuePairs_JSON_Contents_V001.FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingSingleFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

/** 
 *  Gold Standard Run -  Import Gold Standard for the selected scan file given the uploaded file.
 * 
 * Webservices called:
 * 
 * Initialize
 * Upload Data file
 * Submit:  this webservice
 * 
 * General INFO:  This uses the generic import and run table:  import_and_pipeline_run_tracking_tbl  and its children
 *  
 *
 */
//@RestController
public class Project_GoldStandard_Import_Request_Submit_RestWebserviceController {

//	private static final Logger log = LoggerFactory.getLogger( Project_GoldStandard_Import_Request_Submit_RestWebserviceController.class );
//	
//	@Autowired
//	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;
//
//	@Autowired
//	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
//	
//	@Autowired
//	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;
//	
//	@Autowired
//	private FileImportAndPipelineRunTrackingDAO_IF fileImportAndPipelineRunTrackingDAO;
//	
//	@Autowired
//	private ProjectScanFileDAO_IF projectScanFileDAO;
//
//	@Autowired
//	private FileImportAndPipelineRunTrackingSingleFileDAO_IF fileImportAndPipelineRunTrackingSingleFileDAO;
//	
//	@Autowired
//	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;
//
//	@Autowired
//	private MarshalObjectToJSON marshalObjectToJSON;
//	
//	/////////////////////////////////////////////////////
//
//	//   Separate called methods for From Web App and From Submit Program since local code is managing the parsing the request and serializing the response 
//	
//	//  Convert result object graph to JSON or XML in byte[] in the controller body so can cache it
//
//	//     From Web App JSON
//	
//	//  These 2 annotations work the same
//	
//	//  Mapping the value in {} in the path to parameters in the method:
//	//
//	//    The value in {} has to match the value in the "value = " in the @PathVariable
//	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
//	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
//	
//	@PostMapping( 
//			path = { 
//					AA_RestWSControllerPaths_Constants.PATH_START_ALL
//					+ AA_RestWSControllerPaths_Constants.PROJECT__GOLD_STANDARD_IMPORT_SUBMIT_REST_WEBSERVICE_CONTROLLER
//			},
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )
//
////	@RequestMapping( 
////			path = AA_RestWSControllerPaths_Constants.,
////			method = RequestMethod.POST,
////			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//
//    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_JSON(
//
//    		@RequestBody byte[] postBody,
//    		HttpServletRequest httpServletRequest,
//    		HttpServletResponse httpServletResponse
//    		) throws Exception {
//    	
//    
//		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
//		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
//		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );
//
//		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
//
//		if ( postBody == null ) {
//			log.warn( "No Post Body" );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//
//		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );
//		
//		if ( StringUtils.isEmpty( webserviceRequest.uploadKey ) ) {
//			log.warn( "webserviceRequest.uploadKey is null or empty" );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		if ( StringUtils.isEmpty( webserviceRequest.goldStandard_Filename ) ) {
//			log.warn( "webserviceRequest.goldStandard_Filename is null or empty" );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		
//		if ( webserviceRequest.projectScanFileId == null ) {
//			log.warn( "webserviceRequest.projectScanFileId is null" );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		if ( StringUtils.isEmpty( webserviceRequest.displayLabel ) ) {
//			log.warn( "webserviceRequest.displayLabel is null or empty" );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		if ( StringUtils.isEmpty( webserviceRequest.description ) ) {
//			log.warn( "webserviceRequest.description is null or empty" );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		
//		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO = get_FileImportAndPipelineRunTrackingDTO_for_UploadKey(webserviceRequest);
//
//		if ( fileImportAndPipelineRunTrackingDTO == null ) {
//			log.warn( "webserviceRequest.uploadKey is Not found in DB.  value: " + webserviceRequest.uploadKey );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		
//		int projectId = fileImportAndPipelineRunTrackingDTO.getProjectId();
//
//		List<Integer> projectIds = new ArrayList<>( 1 );
//		projectIds.add( projectId );
//
//		//  Restrict access to Project owners or above (admin), if project was not locked
//		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
//				validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
//				.validateProjectOwnerAllowed( projectIds, httpServletRequest );
//
//		//  If NOT Limelight XML File Import is Fully Configured, 
//		if ( ! isLimelightXMLFileImportFullyConfigured.isLimelightXMLFileImportFullyConfigured() ) {
//			String msg = "Limelight XML File Import is NOT Fully Configured ";
//			log.error( msg );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		
//		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
//		if ( userSession == null ) {
//			throw new LimelightInternalErrorException( "userSession should not be null" );
//		}
//		Integer userId = userSession.getUserId();
//		if ( userId == null ) {
//			throw new LimelightInternalErrorException( "userId should not be null" );
//		}
//
//		//  Validate same user
//		
//		if ( fileImportAndPipelineRunTrackingDTO.getUserId() != userId ) {
//			log.warn( "User id for record in uploadKey is Not same as User id in session.  webserviceRequest.uploadKey: " + webserviceRequest.uploadKey );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//	
//		WebserviceResponse webserviceResponse = 
//				webserviceMethod_Internal( webserviceRequest, fileImportAndPipelineRunTrackingDTO, userId, httpServletRequest );
//    	
//		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResponse );
//
//		return ResponseEntity.ok().contentType( MediaType.APPLICATION_JSON ).body( responseAsJSON );
//    }
//
//    /**
//     * @param webserviceRequestHeaderContents
//     * @return null if not found
//     * @throws Exception 
//     */
//    private FileImportAndPipelineRunTrackingDTO get_FileImportAndPipelineRunTrackingDTO_for_UploadKey(WebserviceRequest webserviceRequest) throws Exception {
//	
//		//  Get record for uploadKey
//		
//		if ( StringUtils.isEmpty( webserviceRequest.uploadKey ) ) {
//			log.warn( "webserviceRequest.uploadKey is empty or null" );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		
//		int importAndPipelineRunTracking_ID = 0;
//		
//		try {
//			importAndPipelineRunTracking_ID = Integer.parseInt(webserviceRequest.uploadKey);
//		} catch (Exception e) {
//			log.warn( "webserviceRequest.uploadKey is Not parsible as Integer.  value: " + webserviceRequest.uploadKey );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		
//		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO =
//				fileImportAndPipelineRunTrackingDAO.getForId(importAndPipelineRunTracking_ID);
//		
//		return fileImportAndPipelineRunTrackingDTO;
//    }
//    
//	/**
//	 *  
//	 * 
//	 * 
//	 * @param request
//	 * @param projectId
//	 * @throws Exception
//	 * @throws LimelightInternalErrorException
//	 */
//	private WebserviceResponse webserviceMethod_Internal( 
//			
//			WebserviceRequest webserviceRequest, 
//			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO,
//			Integer userId, 
//			HttpServletRequest httpServletRequest ) throws Exception {
//		
//		WebserviceResponse webserviceResponse = new WebserviceResponse();
//		
//		
//		Project_ScanFile_DTO project_ScanFile_DTO = projectScanFileDAO.getById( webserviceRequest.projectScanFileId );
//		if ( project_ScanFile_DTO == null ) {
//			String msg = "webserviceRequest.projectScanFileId NOT in DB: " + webserviceRequest.projectScanFileId;
//			log.error( msg );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//		
//		if ( project_ScanFile_DTO.getProjectId() != fileImportAndPipelineRunTrackingDTO.getProjectId() ) {
//			String msg = "( project_ScanFile_DTO.getProjectId() != fileImportAndPipelineRunTrackingDTO.getProjectId() ):  webserviceRequest.projectScanFileId: " + webserviceRequest.projectScanFileId;
//			log.error( msg );
//			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//		}
//
//		//  Upload Directory for files
//		
//		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
//		
//		//  Get the File object for the Base Subdir used to first store the files in this request 
//		String uploadFileDirString = FileImportPipelineRunCommonConstants.IMPORT_AND_PIPELINE_RUN__BASE_DIR;
//		
//		File uploadFileDir = new File( importer_Work_Directory, uploadFileDirString );
//		
//		if ( ! uploadFileDir.exists() ) {
//			String msg = "uploadFileDir does not exist.  uploadFileDir: " 
//					+ uploadFileDir.getAbsolutePath();
//			log.error( msg );
//			throw new LimelightWebappFileUploadFileSystemException(msg);
//		}
//		
//		//  The subdir for this upload
//		
//		String dirNameForImportTrackingId =
//				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( fileImportAndPipelineRunTrackingDTO.getId() );
//		File dirForImportTrackingId  =  new File( uploadFileDir , dirNameForImportTrackingId );
//		if ( ! dirForImportTrackingId.exists() ) {
//			String msg = "dirForImportTrackingId NOT exist: " + dirForImportTrackingId.getAbsolutePath();
//			log.error( msg );
//			throw new Exception(msg);
//		}
//		
//		//  Confirm uploaded files exist
//
//		List<FileImportAndPipelineRunTrackingSingleFileDTO> fileImportAndPipelineRunTrackingSingleFileDTO_From_DB_List = 
//				fileImportAndPipelineRunTrackingSingleFileDAO.getFor_TrackingId(fileImportAndPipelineRunTrackingDTO.getId());
//		
//		{
//			boolean found_GoldStandard_File = false;
//
//			for ( FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO_From_DB : fileImportAndPipelineRunTrackingSingleFileDTO_From_DB_List ) {
//
//				if ( fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getFileUploadStatus() != ImportSingleFileUploadStatus.FILE_UPLOAD_COMPLETE ) {
//					String msg = "Single File File Upload Status is NOT COMPLETE. Single file id: "
//							+ fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getId()
//							+ ", for tracking id: " + fileImportAndPipelineRunTrackingDTO.getId();
//					log.error( msg );
//					throw new LimelightInternalErrorException(msg);
//				}
//				
//				if ( fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getFileTypeId() == GoldStandard_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants.GOLD_STANDARD_FILE_FILE_TYPE_ID ) {
//					
//					if ( found_GoldStandard_File ) {
//						String msg = "More than one Gold Standard File in the tracking id: " + fileImportAndPipelineRunTrackingDTO.getId();
//						log.error( msg );
//						throw new LimelightInternalErrorException(msg);
//					}
//					found_GoldStandard_File = true;
//					
//				} else {
//					String msg = "Unknown Single File file type: "
//							+ fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getFileTypeId()
//							+ ", Single file id: "
//							+ fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getId()
//							+ ", for tracking id: " + fileImportAndPipelineRunTrackingDTO.getId();
//					log.error( msg );
//					throw new LimelightInternalErrorException(msg);
//				}
//
//				if ( StringUtils.isNotEmpty( fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_bucket_name() ) ) {
//					
//					//  Validate is in S3
//
//					S3Client amazonS3_Client = null;
//
//					String amazonS3_RegionName = fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_region();
//
//					if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
//						
//						Region aws_S3_Region = Region.of(amazonS3_RegionName);
//						
//						amazonS3_Client = 
//								S3Client.builder()
//								.region( aws_S3_Region )
//								.httpClientBuilder(ApacheHttpClient.builder())
//								.build();
//						
//					} else {
//						//  SDK use Region from Environment Variable
//						
//						amazonS3_Client = 
//								S3Client.builder()
//								.httpClientBuilder(ApacheHttpClient.builder())
//								.build(); 
//					}
//					
//					HeadObjectRequest headObjectRequest= 
//							HeadObjectRequest
//							.builder()
//							.bucket( fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_bucket_name() )
//							.key( fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_object_key() )
//							.build();
//
//					try {
//						amazonS3_Client.headObject(headObjectRequest);
//					} catch ( NoSuchKeyException e ) {
//						String msg = "Single File File Upload NOT in AWS S3. Single file id: "
//								+ fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getId()
//								+ ", for tracking id: " + fileImportAndPipelineRunTrackingDTO.getId()
//								+ ", S3 Bucket Name: " + fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_bucket_name()
//								+ ", S3 Object Key: " + fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_object_key()
//								+ ", S3 Region: " + fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getAws_s3_region();
//						log.error( msg );
//						throw new LimelightInternalErrorException(msg);
//					}
//				} else {
//					
//					File conf_File = new File( dirForImportTrackingId, fileImportAndPipelineRunTrackingSingleFileDTO_From_DB.getFilenameOnDisk() );
//
//					if ( ! conf_File.exists() ) {
//						String msg = "Uploaded file NOT exist: " + conf_File.getAbsolutePath();
//						log.error( msg );
//						throw new LimelightInternalErrorException(msg);
//					}
//				}
//			
//			}
//
//			if ( ( ! found_GoldStandard_File )  ) {
//				String msg = "Gold Standard File NOT exist";
//				log.error( msg );
//				throw new LimelightInternalErrorException(msg);
//			}
//		}
//		
//		//  Update:  Main File Import Tracking Object:  Set Request Data and Status
//		
//		{
//
//			GoldStandard_Import_RequestData_V001 goldStandard_Import_RequestData_V001 = new GoldStandard_Import_RequestData_V001();
//
//			goldStandard_Import_RequestData_V001.setProjectId(fileImportAndPipelineRunTrackingDTO.getProjectId());
//			goldStandard_Import_RequestData_V001.setProjectScanFileId(webserviceRequest.projectScanFileId);
//			goldStandard_Import_RequestData_V001.setLabel(webserviceRequest.displayLabel);
//			goldStandard_Import_RequestData_V001.setDescription(webserviceRequest.description);
//			goldStandard_Import_RequestData_V001.setGoldStandardFile_UploadedFilename( webserviceRequest.goldStandard_Filename );
//
//
//			JAXBContext jaxbContext = JAXBContext.newInstance( GoldStandard_Import_RequestData_V001.class );
//
//			Writer requestData_Writer = new StringWriter( 100000000 );
//
//			try {
//				Marshaller marshaller = jaxbContext.createMarshaller();
//				marshaller.marshal( goldStandard_Import_RequestData_V001, requestData_Writer );
//			} catch ( JAXBException e ) {
//				final String msg = "Failed to marshal to XML: " + goldStandard_Import_RequestData_V001.toString();
//				log.error( msg, e );
//				throw new LimelightInternalErrorException( msg );
//			}
//
//			String requestData = requestData_Writer.toString();
//
//			fileImportAndPipelineRunTrackingDTO.setRequestData_AsString(requestData);
//			fileImportAndPipelineRunTrackingDTO.setRequestData_Format_VersionNumber( GoldStandard_Import_RequestData_V001.VERSION_NUMBER );
//			fileImportAndPipelineRunTrackingDTO.setRequestData_Content_VersionNumber( 1 );
//		}
//
//		{   
//			//   Create JSON for Label/Value pairs for display in webapp and in email sent when Import is finishes
//
//			List<FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001> labelValueList = new ArrayList<>( 10 );
//
//			{
//				FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001 labelValuePair = new FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001();
//				labelValueList.add( labelValuePair );
//				labelValuePair.setLabel( "Label" );
//				labelValuePair.setValue( webserviceRequest.displayLabel );
//			}
//
//			{
//				FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001 labelValuePair = new FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001();
//				labelValueList.add( labelValuePair );
//				labelValuePair.setLabel( "Description" );
//				labelValuePair.setValue( webserviceRequest.description );
//			}
//			
//			{
//				FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001 labelValuePair = new FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001();
//				labelValueList.add( labelValuePair );
//				labelValuePair.setLabel( "Gold Standard Filename" );
//				labelValuePair.setValue( webserviceRequest.goldStandard_Filename );
//			}
//			
//			FileImportPipelineRun_LabelValuePairs_JSON_Contents_V001 fileImportPipelineRun_LabelValuePairs_JSON_Contents_V001 = new FileImportPipelineRun_LabelValuePairs_JSON_Contents_V001();
//
//			fileImportPipelineRun_LabelValuePairs_JSON_Contents_V001.setLabelValueList(labelValueList);
//			
//			String requestData_LabelValuePairs_JSON_AsString = marshalObjectToJSON.getJSONString(fileImportPipelineRun_LabelValuePairs_JSON_Contents_V001);
//
//			fileImportAndPipelineRunTrackingDTO.setRequestData_LabelValuePairs_JSON_AsString(requestData_LabelValuePairs_JSON_AsString);
//			fileImportAndPipelineRunTrackingDTO.setRequestData_LabelValuePairs_JSON_Format_VersionNumber( FileImportPipelineRun_LabelValuePairs_JSON_Contents_V001.VERSION_NUMBER );
//			fileImportAndPipelineRunTrackingDTO.setRequestData_LabelValuePairs_JSON_Content_VersionNumber( 1 );
//		}
//
//		fileImportAndPipelineRunTrackingDAO.update__request_data( fileImportAndPipelineRunTrackingDTO );
//		
//		fileImportAndPipelineRunTrackingDAO.updateStatus(FileImportStatus.QUEUED, fileImportAndPipelineRunTrackingDTO.getId());
//		
//		webserviceResponse.statusSuccess = true;
//				
//		return webserviceResponse;
//	}
//
//	
//	//////   WebserviceRequest and WebserviceResult classes
//
//	public static class WebserviceRequest {
//		
//		private String uploadKey;
//		private String goldStandard_Filename;
//		private Integer projectScanFileId;
//		private String displayLabel;
//		private String description;
//		
//		public void setUploadKey(String uploadKey) {
//			this.uploadKey = uploadKey;
//		}
//		public void setProjectScanFileId(Integer projectScanFileId) {
//			this.projectScanFileId = projectScanFileId;
//		}
//		public void setDisplayLabel(String displayLabel) {
//			this.displayLabel = displayLabel;
//		}
//		public void setDescription(String description) {
//			this.description = description;
//		}
//		public void setGoldStandard_Filename(String goldStandard_Filename) {
//			this.goldStandard_Filename = goldStandard_Filename;
//		}
//		
//	}
//
//	public static class WebserviceResponse {
//
//		private boolean statusSuccess;
//
//		public boolean isStatusSuccess() {
//			return statusSuccess;
//		}
//
//	}
}
