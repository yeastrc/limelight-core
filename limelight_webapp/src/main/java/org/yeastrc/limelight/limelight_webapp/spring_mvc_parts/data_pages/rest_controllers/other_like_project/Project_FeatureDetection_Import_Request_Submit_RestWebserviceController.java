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
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.constants.FeatureDetection_HardklorBullseye_Upload_FilenamesOnDisk_Constants;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.shared_objects.FeatureDetection_HardklorBullseye_Import_RequestData_V001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.constants.FileImportPipelineRunCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
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
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project.Project_UploadData_ListSubmittedItems_RestWebserviceController.FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Feature Detection Run -  Import Feature Detection (Hardklor and Bullseye) for the selected scan file given the uploaded Hardklor and Bullseye data files and optional Hardklor.conf file.
 * 
 * Webservices called:
 * 
 * Initialize:  
 * Upload file:    
 *   Hardklor Data file
 *   Hardklor Conf file
 *   Bullseye Data file
 * Submit: this webservice
 * 
 * General INFO:  This uses the generic import and run table:  import_and_pipeline_run_tracking_tbl  and its children
 * 
 * 
 * OLD CODE:
 * 
 * WARNING:  The Submit Import Program will show the value of BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage when set
 * 			 and will NO LONGER check the boolean flags (other than statusSuccess).
 * 			 So the property BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage will be REQUIRED to be set for all errors. 
 *
 */
@RestController
public class Project_FeatureDetection_Import_Request_Submit_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_FeatureDetection_Import_Request_Submit_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;
	
	@Autowired
	private FileImportAndPipelineRunTrackingDAO_IF fileImportAndPipelineRunTrackingDAO;
	
	@Autowired
	private ProjectScanFileDAO_IF projectScanFileDAO;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
	/////////////////////////////////////////////////////

	//   Separate called methods for From Web App and From Submit Program since local code is managing the parsing the request and serializing the response 
	
	//  Convert result object graph to JSON or XML in byte[] in the controller body so can cache it

	//     From Web App JSON
	
	//  These 2 annotations work the same
	
	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = { 
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT__FEATURE_DETECTION_IMPORT_SUBMIT_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_JSON(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    
		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

		if ( postBody == null ) {
			log.warn( "No Post Body" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );
		
		if ( StringUtils.isEmpty( webserviceRequest.uploadKey ) ) {
			log.warn( "webserviceRequest.uploadKey is null or empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( StringUtils.isEmpty( webserviceRequest.hardklor_Results_Filename ) ) {
			log.warn( "webserviceRequest.hardklor_Results_Filename is null or empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( StringUtils.isEmpty( webserviceRequest.bullseye_Results_Filename ) ) {
			log.warn( "webserviceRequest.bullseye_Results_Filename is null or empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		if ( webserviceRequest.projectScanFileId == null ) {
			log.warn( "webserviceRequest.projectScanFileId is null" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( StringUtils.isEmpty( webserviceRequest.displayLabel ) ) {
			log.warn( "webserviceRequest.displayLabel is null or empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( StringUtils.isEmpty( webserviceRequest.description ) ) {
			log.warn( "webserviceRequest.description is null or empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO = get_FileImportAndPipelineRunTrackingDTO_for_UploadKey(webserviceRequest);

		if ( fileImportAndPipelineRunTrackingDTO == null ) {
			log.warn( "webserviceRequest.uploadKey is Not found in DB.  value: " + webserviceRequest.uploadKey );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		int projectId = fileImportAndPipelineRunTrackingDTO.getProjectId();

		List<Integer> projectIds = new ArrayList<>( 1 );
		projectIds.add( projectId );

		//  Restrict access to Project owners or above (admin), if project was not locked
		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
				validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
				.validateProjectOwnerAllowed( projectIds, httpServletRequest );

		//  If NOT Limelight XML File Import is Fully Configured, 
		if ( ! isLimelightXMLFileImportFullyConfigured.isLimelightXMLFileImportFullyConfigured() ) {
			String msg = "Limelight XML File Import is NOT Fully Configured ";
			log.error( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
		if ( userSession == null ) {
			throw new LimelightInternalErrorException( "userSession should not be null" );
		}
		Integer userId = userSession.getUserId();
		if ( userId == null ) {
			throw new LimelightInternalErrorException( "userId should not be null" );
		}

		//  Validate same user
		
		if ( fileImportAndPipelineRunTrackingDTO.getUserId() != userId ) {
			log.warn( "User id for record in uploadKey is Not same as User id in session.  webserviceRequest.uploadKey: " + webserviceRequest.uploadKey );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
	
		WebserviceResponse webserviceResponse = 
				webserviceMethod_Internal( webserviceRequest, fileImportAndPipelineRunTrackingDTO, userId, httpServletRequest );
    	
		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResponse );

		return ResponseEntity.ok().contentType( MediaType.APPLICATION_JSON ).body( responseAsJSON );
    }

    /**
     * @param webserviceRequestHeaderContents
     * @return null if not found
     * @throws Exception 
     */
    private FileImportAndPipelineRunTrackingDTO get_FileImportAndPipelineRunTrackingDTO_for_UploadKey(WebserviceRequest webserviceRequest) throws Exception {
	
		//  Get record for uploadKey
		
		if ( StringUtils.isEmpty( webserviceRequest.uploadKey ) ) {
			log.warn( "webserviceRequest.uploadKey is empty or null" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		int importAndPipelineRunTracking_ID = 0;
		
		try {
			importAndPipelineRunTracking_ID = Integer.parseInt(webserviceRequest.uploadKey);
		} catch (Exception e) {
			log.warn( "webserviceRequest.uploadKey is Not parsible as Integer.  value: " + webserviceRequest.uploadKey );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO =
				fileImportAndPipelineRunTrackingDAO.getForId(importAndPipelineRunTracking_ID);
		
		return fileImportAndPipelineRunTrackingDTO;
    }
    
	/**
	 *  
	 * 
	 * 
	 * @param request
	 * @param projectId
	 * @throws Exception
	 * @throws LimelightInternalErrorException
	 */
	private WebserviceResponse webserviceMethod_Internal( 
			
			WebserviceRequest webserviceRequest, 
			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO,
			Integer userId, 
			HttpServletRequest httpServletRequest ) throws Exception {
		
		WebserviceResponse webserviceResponse = new WebserviceResponse();
		
		
		Project_ScanFile_DTO project_ScanFile_DTO = projectScanFileDAO.getById( webserviceRequest.projectScanFileId );
		if ( project_ScanFile_DTO == null ) {
			String msg = "webserviceRequest.projectScanFileId NOT in DB: " + webserviceRequest.projectScanFileId;
			log.error( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		if ( project_ScanFile_DTO.getProjectId() != fileImportAndPipelineRunTrackingDTO.getProjectId() ) {
			String msg = "( project_ScanFile_DTO.getProjectId() != fileImportAndPipelineRunTrackingDTO.getProjectId() ):  webserviceRequest.projectScanFileId: " + webserviceRequest.projectScanFileId;
			log.error( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		//  Upload Directory for files
		
		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		
		//  Get the File object for the Base Subdir used to first store the files in this request 
		String uploadFileDirString = FileImportPipelineRunCommonConstants.IMPORT_AND_PIPELINE_RUN__BASE_DIR;
		
		File uploadFileDir = new File( importer_Work_Directory, uploadFileDirString );
		
		if ( ! uploadFileDir.exists() ) {
			String msg = "uploadFileDir does not exist.  uploadFileDir: " 
					+ uploadFileDir.getAbsolutePath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}
		
		//  The subdir for this upload
		
		String dirNameForImportTrackingId =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( fileImportAndPipelineRunTrackingDTO.getId() );
		File dirForImportTrackingId  =  new File( uploadFileDir , dirNameForImportTrackingId );
		if ( ! dirForImportTrackingId.exists() ) {
			String msg = "dirForImportTrackingId NOT exist: " + dirForImportTrackingId.getAbsolutePath();
			log.error( msg );
			throw new Exception(msg);
		}
		
		//  Confirm uploaded files exist
		
		{
			File hardklor_Results_File = new File( dirForImportTrackingId, FeatureDetection_HardklorBullseye_Upload_FilenamesOnDisk_Constants.HARDKLOR_RESULT_FILE_FILENAME );

			if ( ! hardklor_Results_File.exists() ) {
				String msg = "hardklor_Results_File NOT exist: " + hardklor_Results_File.getAbsolutePath();
				log.error( msg );
				throw new Exception(msg);
			}
		}

		{
			File bullseye_Results_File = new File( dirForImportTrackingId, FeatureDetection_HardklorBullseye_Upload_FilenamesOnDisk_Constants.BULLSEYE_RESULT_FILE_FILENAME );

			if ( ! bullseye_Results_File.exists() ) {
				String msg = "bullseye_Results_File NOT exist: " + bullseye_Results_File.getAbsolutePath();
				log.error( msg );
				throw new Exception(msg);
			}
		}

		if ( StringUtils.isNotEmpty( webserviceRequest.hardklor_Conf_Filename ) ) {

			File hardklor_Conf_File = new File( dirForImportTrackingId, FeatureDetection_HardklorBullseye_Upload_FilenamesOnDisk_Constants.HARDKLOR_CONF_FILE_FILENAME );

			if ( ! hardklor_Conf_File.exists() ) {
				String msg = "hardklor_Conf_File NOT exist: " + hardklor_Conf_File.getAbsolutePath();
				log.error( msg );
				throw new Exception(msg);
			}
		}
		//  Update:  Main File Import Tracking Object:  Set Request Data and Status
		
		{

			FeatureDetection_HardklorBullseye_Import_RequestData_V001 featureDetection_HardklorBullseye_Import_RequestData_V1 = new FeatureDetection_HardklorBullseye_Import_RequestData_V001();

			featureDetection_HardklorBullseye_Import_RequestData_V1.setProjectId(fileImportAndPipelineRunTrackingDTO.getProjectId());
			featureDetection_HardklorBullseye_Import_RequestData_V1.setProjectScanFileId(webserviceRequest.projectScanFileId);
			featureDetection_HardklorBullseye_Import_RequestData_V1.setLabel(webserviceRequest.displayLabel);
			featureDetection_HardklorBullseye_Import_RequestData_V1.setDescription(webserviceRequest.description);
			featureDetection_HardklorBullseye_Import_RequestData_V1.setHardklor_ConfFile_UploadedFilename(webserviceRequest.hardklor_Conf_Filename);
			featureDetection_HardklorBullseye_Import_RequestData_V1.setHardklor_ResultsFile_UploadedFilename(webserviceRequest.hardklor_Results_Filename);
			featureDetection_HardklorBullseye_Import_RequestData_V1.setBullseye_ResultsFile_UploadedFilename(webserviceRequest.bullseye_Results_Filename);


			JAXBContext jaxbContext = JAXBContext.newInstance( FeatureDetection_HardklorBullseye_Import_RequestData_V001.class );

			Writer requestData_Writer = new StringWriter( 100000000 );

			try {
				Marshaller marshaller = jaxbContext.createMarshaller();
				marshaller.marshal( featureDetection_HardklorBullseye_Import_RequestData_V1, requestData_Writer );
			} catch ( JAXBException e ) {
				final String msg = "Failed to marshal to XML: " + featureDetection_HardklorBullseye_Import_RequestData_V1.toString();
				log.error( msg, e );
				throw new LimelightInternalErrorException( msg );
			}

			String requestData = requestData_Writer.toString();

			fileImportAndPipelineRunTrackingDTO.setRequestData_AsString(requestData);
			fileImportAndPipelineRunTrackingDTO.setRequestData_Format_VersionNumber( FeatureDetection_HardklorBullseye_Import_RequestData_V001.VERSION_NUMBER );
			fileImportAndPipelineRunTrackingDTO.setRequestData_Content_VersionNumber( 1 );
		}

		{   
			//   Create JSON for Label/Value pairs for display in webapp and in email sent when Import is finishes

			List<FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001> labelValueList = new ArrayList<>( 10 );

			{
				FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001 labelValuePair = new FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001();
				labelValueList.add( labelValuePair );
				labelValuePair.setLabel( "Label" );
				labelValuePair.setValue( webserviceRequest.displayLabel );
			}

			{
				FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001 labelValuePair = new FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001();
				labelValueList.add( labelValuePair );
				labelValuePair.setLabel( "Description" );
				labelValuePair.setValue( webserviceRequest.description );
			}
			
			{
				FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001 labelValuePair = new FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001();
				labelValueList.add( labelValuePair );
				labelValuePair.setLabel( "Hardklor Results Filename" );
				labelValuePair.setValue( webserviceRequest.hardklor_Results_Filename );
			}
			if ( StringUtils.isNotEmpty( webserviceRequest.hardklor_Conf_Filename ) ) {
				FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001 labelValuePair = new FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001();
				labelValueList.add( labelValuePair );
				labelValuePair.setLabel( "Hardklor Conf Filename" );
				labelValuePair.setValue( webserviceRequest.hardklor_Conf_Filename );
			}
			{
				FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001 labelValuePair = new FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001();
				labelValueList.add( labelValuePair );
				labelValuePair.setLabel( "Bullseye Results Filename" );
				labelValuePair.setValue( webserviceRequest.bullseye_Results_Filename );
			}
			
			FileImportPipelineRun_LabelValuePairs_JSON_Contents_V001 fileImportPipelineRun_LabelValuePairs_JSON_Contents_V001 = new FileImportPipelineRun_LabelValuePairs_JSON_Contents_V001();

			fileImportPipelineRun_LabelValuePairs_JSON_Contents_V001.setLabelValueList(labelValueList);
			
			String requestData_LabelValuePairs_JSON_AsString = marshalObjectToJSON.getJSONString(fileImportPipelineRun_LabelValuePairs_JSON_Contents_V001);

			fileImportAndPipelineRunTrackingDTO.setRequestData_LabelValuePairs_JSON_AsString(requestData_LabelValuePairs_JSON_AsString);
			fileImportAndPipelineRunTrackingDTO.setRequestData_LabelValuePairs_JSON_Format_VersionNumber( FileImportPipelineRun_LabelValuePairs_JSON_Contents_V001.VERSION_NUMBER );
			fileImportAndPipelineRunTrackingDTO.setRequestData_LabelValuePairs_JSON_Content_VersionNumber( 1 );
		}

		fileImportAndPipelineRunTrackingDAO.update__request_data( fileImportAndPipelineRunTrackingDTO );
		
		fileImportAndPipelineRunTrackingDAO.updateStatus(FileImportStatus.QUEUED, fileImportAndPipelineRunTrackingDTO.getId());
		
		webserviceResponse.statusSuccess = true;
				
		return webserviceResponse;
	}

	
	//////   WebserviceRequest and WebserviceResult classes

	public static class WebserviceRequest {
		
		private String uploadKey;
		private String hardklor_Conf_Filename;
		private String hardklor_Results_Filename;
		private String bullseye_Results_Filename;
		private Integer projectScanFileId;
		private String displayLabel;
		private String description;
		
		public void setUploadKey(String uploadKey) {
			this.uploadKey = uploadKey;
		}
		public void setHardklor_Conf_Filename(String hardklor_Conf_Filename) {
			this.hardklor_Conf_Filename = hardklor_Conf_Filename;
		}
		public void setProjectScanFileId(Integer projectScanFileId) {
			this.projectScanFileId = projectScanFileId;
		}
		public void setDisplayLabel(String displayLabel) {
			this.displayLabel = displayLabel;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public void setHardklor_Results_Filename(String hardklor_Results_Filename) {
			this.hardklor_Results_Filename = hardklor_Results_Filename;
		}
		public void setBullseye_Results_Filename(String bullseye_Results_Filename) {
			this.bullseye_Results_Filename = bullseye_Results_Filename;
		} 
		
	}

	public static class WebserviceResponse {

		private boolean statusSuccess;

		public boolean isStatusSuccess() {
			return statusSuccess;
		}

	}
}
