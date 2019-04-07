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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.DeleteDirectoryAndContentsUtilIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * For Upload Data, Remove Abandoned Upload (called when user closes Upload overlay without submitting it)
 *
 */
@RestController
public class Project_UploadData_UploadRemoveAbandoned_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_UploadRemoveAbandoned_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;
	
	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF limelight_XML_Importer_Work_Directory_And_SubDirs_Web;
	
	@Autowired
	private DeleteDirectoryAndContentsUtilIF deleteDirectoryAndContentsUtil;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	

	/////////////////////////////////////////////////////
	
	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same
	

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_UPLOAD_REMOVE_ABANDONED_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	try {
    		//		log.warn( "changeUserAccessToProject(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

			//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

			String projectIdentifier = webserviceRequest.getProjectIdentifier();

			if ( StringUtils.isEmpty( projectIdentifier ) ) {
				log.warn( "projectIdentifier is empty or not assigned" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			int projectId = 0;

			try {
				projectId = Integer.parseInt( projectIdentifier );

			} catch ( RuntimeException e ) {
				log.warn( "Project Identifier not parsable to int: " + projectIdentifier );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			long uploadKey = -1;
			try {
				uploadKey = Long.parseLong( webserviceRequest.uploadKey );
			} catch ( Exception e ) {
				String msg = "Provided uploadKey is invalid";
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

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

			WebserviceResult webserviceResult = processWebRequest( uploadKey, projectId, userId );

			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {

			//  only rethrow Error Response Exceptions 
			throw e;

		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}
    
	/**
	 * @param uploadKey
	 * @param projectId
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	private WebserviceResult processWebRequest( long uploadKey, int projectId, int userId ) throws Exception {

		//  Confirm projectId is in database
		ProjectDTO projectDTO =	projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
		if ( projectDTO == null ) {
			// should never happen
			String msg = "Project id is not in database " + projectId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		
		
		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		//  Get the File object for the Base Subdir used to temporarily store the files in this request 
		String uploadFileTempDirString =
				limelight_XML_Importer_Work_Directory_And_SubDirs_Web.getDirForUploadFileTempDir();
		File uploadFileTempDir = new File( importer_Work_Directory, uploadFileTempDirString );
		if ( ! uploadFileTempDir.exists() ) {
			String msg = "uploadFileTempDir does not exist.  uploadFileTempDir: " 
					+ uploadFileTempDir.getAbsolutePath();
			log.warn( msg );
			WebserviceResult webserviceResult = new WebserviceResult();
			return webserviceResult;
		}
		File tempSubdir =
				limelight_XML_Importer_Work_Directory_And_SubDirs_Web
				.getSubDirForUploadFileTempDir( userId, uploadKey, uploadFileTempDir );
		if ( ! tempSubdir.exists() ) {
			if ( log.isInfoEnabled() ) {
				String infoMsg = "tempSubdir does not exist.  tempSubdir: " 
						+ uploadFileTempDir.getAbsolutePath();
				log.info( infoMsg );
			}
			WebserviceResult webserviceResult = new WebserviceResult();
			return webserviceResult;
		}
		//  Remove the subdir the uploaded file(s) were in
		deleteDirectoryAndContentsUtil.deleteDirectoryAndContents( tempSubdir );
		
		WebserviceResult webserviceResult = new WebserviceResult();
		webserviceResult.statusSuccess = true;

		return webserviceResult;
	}
	
	public static class WebserviceRequest {
		private String projectIdentifier;
		String uploadKey;

		public String getProjectIdentifier() {
			return projectIdentifier;
		}
		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
		public String getUploadKey() {
			return uploadKey;
		}
		public void setUploadKey(String uploadKey) {
			this.uploadKey = uploadKey;
		}
	}
	
	/**
	 * 
	 *
	 */
	public static class WebserviceResult {
		
		private boolean statusSuccess;

		public boolean isStatusSuccess() {
			return statusSuccess;
		}
		public void setStatusSuccess(boolean statusSuccess) {
			this.statusSuccess = statusSuccess;
		}

	}



}
