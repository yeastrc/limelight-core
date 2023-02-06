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
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.constants.FeatureDetection_HardklorBullseye_Upload_FilenamesOnDisk_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.constants.FileImportPipelineRunCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Feature Detection Run -  Import Feature Detection (Hardklor and Bullseye) for the selected scan file given the uploaded Hardklor and Bullseye data files and optional Hardklor.conf file.
 * 
 * Webservices called:
 * 
 * Initialize:  
 * Upload file:    this webservice
 *   Hardklor Data file
 *   Hardklor Conf file
 *   Bullseye Data file
 * Submit
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
public class Project_FeatureDetection_Import_Request_UploadFile_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_FeatureDetection_Import_Request_UploadFile_RestWebserviceController.class );

	private static final int COPY_FILE_ARRAY_SIZE = 32 * 1024;
	
	//  Keep all these Strings in sync with the Javascript AJAX Send:

	private static final String UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON = "limelight_upload_file_params_json";

	//  Keep all these Strings in sync with the Submit Program Send:
	
//	private static final String UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML = "limelight_upload_file_params_xml";

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;
	
	@Autowired
	private FileImportAndPipelineRunTrackingDAO_IF fileImportAndPipelineRunTrackingDAO;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

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
					+ AA_RestWSControllerPaths_Constants.PROJECT__FEATURE_DETECTION_IMPORT_UPLOAD_FILE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_JSON(

//			//  No @RequestBody since the POST body will be read in this method and copied to a local file
//			//  @RequestBody byte[] postBody,
//
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    
		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs


		//    			String requestURL = httpServletRequest.getRequestURL().toString();

		String uploadFileParamsJSON = httpServletRequest.getHeader( UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON );

		if ( StringUtils.isEmpty( uploadFileParamsJSON ) ) {
			log.warn( "'" + UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON + "' header parameter is not sent or is empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		WebserviceRequestDataInHeader webserviceRequestHeaderContents = 
				unmarshalJSON_ToObject.getObjectFromJSONString( uploadFileParamsJSON, WebserviceRequestDataInHeader.class );
		
		
		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO = get_FileImportAndPipelineRunTrackingDTO_for_UploadKey(webserviceRequestHeaderContents);

		if ( fileImportAndPipelineRunTrackingDTO == null ) {
			log.warn( "webserviceRequestHeaderContents.uploadKey is Not found in DB.  value: " + webserviceRequestHeaderContents.uploadKey );
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
			log.warn( "User id for record in uploadKey is Not same as User id in session.  webserviceRequestHeaderContents.uploadKey: " + webserviceRequestHeaderContents.uploadKey );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
	
		
		WebserviceResponse webserviceResponse = 
				webserviceMethod_Internal( webserviceRequestHeaderContents, fileImportAndPipelineRunTrackingDTO, httpServletRequest );
    	
		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResponse );

		return ResponseEntity.ok().contentType( MediaType.APPLICATION_JSON ).body( responseAsJSON );
    }
    
    /**
     * @param webserviceRequestHeaderContents
     * @return null if not found
     * @throws Exception 
     */
    private FileImportAndPipelineRunTrackingDTO get_FileImportAndPipelineRunTrackingDTO_for_UploadKey(WebserviceRequestDataInHeader webserviceRequestHeaderContents) throws Exception {
	
		//  Get record for uploadKey
		
		if ( StringUtils.isEmpty( webserviceRequestHeaderContents.uploadKey ) ) {
			log.warn( "webserviceRequestHeaderContents.uploadKey is empty or null" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		int importAndPipelineRunTracking_ID = 0;
		
		try {
			importAndPipelineRunTracking_ID = Integer.parseInt(webserviceRequestHeaderContents.uploadKey);
		} catch (Exception e) {
			log.warn( "webserviceRequestHeaderContents.uploadKey is Not parsible as Integer.  value: " + webserviceRequestHeaderContents.uploadKey );
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
			
			WebserviceRequestDataInHeader webserviceRequestHeaderContents, 
			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO,
			HttpServletRequest httpServletRequest ) throws Exception {
		
		WebserviceResponse webserviceResponse = new WebserviceResponse();
		

		if ( ! webserviceRequestHeaderContents.hardklorConfFile && ! webserviceRequestHeaderContents.bullseyeDataFile  && ! webserviceRequestHeaderContents.hardklorDataFile ) {
			log.warn( "Invalid Input: Both webserviceRequestHeaderContents.hardklorConfFile AND webserviceRequestHeaderContents.bullseyeConfFile  AND webserviceRequestHeaderContents.hardklorDataFile are false or not set" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( webserviceRequestHeaderContents.hardklorConfFile && webserviceRequestHeaderContents.bullseyeDataFile && webserviceRequestHeaderContents.hardklorDataFile) {
			log.warn( "Invalid Input: Both webserviceRequestHeaderContents.hardklorConfFile AND webserviceRequestHeaderContents.bullseyeDataFile AND webserviceRequestHeaderContents.hardklorDataFile are true" );
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
		
		String filenameToWriteTo = null;
		
		if ( webserviceRequestHeaderContents.hardklorConfFile ) {
			
			filenameToWriteTo = FeatureDetection_HardklorBullseye_Upload_FilenamesOnDisk_Constants.HARDKLOR_CONF_FILE_FILENAME;

		} else if ( webserviceRequestHeaderContents.hardklorDataFile ) {
			
			filenameToWriteTo = FeatureDetection_HardklorBullseye_Upload_FilenamesOnDisk_Constants.HARDKLOR_RESULT_FILE_FILENAME;
			
		} else if ( webserviceRequestHeaderContents.bullseyeDataFile ) {
			
			filenameToWriteTo = FeatureDetection_HardklorBullseye_Upload_FilenamesOnDisk_Constants.BULLSEYE_RESULT_FILE_FILENAME;
			
		} else {
			log.warn( "Invalid Input: Both webserviceRequestHeaderContents.hardklorConfFile AND webserviceRequestHeaderContents.hardklorDataFile AND webserviceRequestHeaderContents.bullseyeDataFile are false or not set" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		File uploadedFileOnDisk = new File( dirForImportTrackingId, filenameToWriteTo );
		
		//  Copy InputStream containing POST body into file on disk
		{
			long totalBytesCopied = 0;
			boolean fileTooLarge = false;

			try ( InputStream inputStreamFromPOSTLocal = httpServletRequest.getInputStream() ) {

				try ( FileOutputStream fos = new FileOutputStream( uploadedFileOnDisk )) {
					byte[] buf = new byte[ COPY_FILE_ARRAY_SIZE ];
					int len;
					while ((len = inputStreamFromPOSTLocal.read(buf)) > 0){
						fos.write(buf, 0, len);
						totalBytesCopied += len;
//						if ( totalBytesCopied > webserviceMethod_Internal_Params.maxFileSize ) {
//	
//							fileTooLarge = true;
//							break;
//						}
					}
				}
			}
//			if ( fileTooLarge ) {
//				
//				if ( ! uploadedFileOnDisk.delete() ) {
//					log.warn("Failed to delete upload file that is canceled since too large.  file: " + uploadedFileOnDisk.getAbsolutePath() );
//				}
//				//  Return Error -  Status Code 400
//				webserviceResult.setStatusSuccess(false);
//				webserviceResult.setFileSizeLimitExceeded( true );
//				webserviceResult.setMaxSize( webserviceMethod_Internal_Params.maxFileSize );
//				webserviceResult.setMaxSizeFormatted( webserviceMethod_Internal_Params.maxFileSizeFormatted );
//
//				methodResults.returnBadRequestStatusCode = true;
//
//				//  EARLY RETURN
//				return methodResults;
//			}
		}
				
		webserviceResponse.setStatusSuccess( true );
		
				
		return webserviceResponse;
	}

	
	//////   WebserviceRequest and WebserviceResult classes

	public static class WebserviceRequestDataInHeader {
		
		private String uploadKey;
		private boolean hardklorConfFile;
		private boolean hardklorDataFile;
		private boolean bullseyeDataFile;
		
		private String filename;
		private long uploadFileSize;
		
		public void setUploadKey(String uploadKey) {
			this.uploadKey = uploadKey;
		}

		public void setHardklorConfFile(boolean hardklorConfFile) {
			this.hardklorConfFile = hardklorConfFile;
		}

		public void setFilename(String filename) {
			this.filename = filename;
		}

		public void setUploadFileSize(long uploadFileSize) {
			this.uploadFileSize = uploadFileSize;
		}

		public void setHardklorDataFile(boolean hardklorDataFile) {
			this.hardklorDataFile = hardklorDataFile;
		}

		public void setBullseyeDataFile(boolean bullseyeDataFile) {
			this.bullseyeDataFile = bullseyeDataFile;
		}
	}

	public static class WebserviceResponse {

		private boolean statusSuccess;

		public boolean isStatusSuccess() {
			return statusSuccess;
		}

		public void setStatusSuccess(boolean statusSuccess) {
			this.statusSuccess = statusSuccess;
		}
	}
}
