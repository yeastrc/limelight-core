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


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.FolderForProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.FolderProjectSearchDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderForProjectDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderProjectSearchDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Organize Searches - Set the folder for a Search for a Project Search Id
 *
 */
@RestController
public class Project_OrganizeSearches_SetSearchFolder_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_OrganizeSearches_SetSearchFolder_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private FolderForProjectDAO_IF folderForProjectDAO;
	
	@Autowired
	private FolderProjectSearchDAO_IF folderProjectSearchDAO;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_OrganizeSearches_SetSearchFolder_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}
	
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_ORGANIZE_SEARCHES_SET_SEARCH_FOLDER_REST_WEBSERVICE_CONTROLLER
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
    		WebserviceResult webserviceResult = new WebserviceResult();

    		//		log.warn( "webserviceMethod(...) called" );

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
    		
    		Integer projectSearchId = webserviceRequest.projectSearchId;
    		Integer folderId = webserviceRequest.folderId;
    		boolean putInNotInAnyFolder = webserviceRequest.putInNotInAnyFolder;
    		
    		if ( projectSearchId == null ) {
    			log.warn( "projectSearchId is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( folderId == null && ( ! putInNotInAnyFolder ) ) {
    			log.warn( "folderId is not assigned and putInNotInAnyFolder is false" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( folderId != null && ( putInNotInAnyFolder ) ) {
    			log.warn( "folderId is assigned and putInNotInAnyFolder is true" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
			//  Validate access to projectSearchId
    		
    		List<Integer> projectSearchIds = new ArrayList<>( 1 );
    		projectSearchIds.add( projectSearchId );

    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
					.validateProjectOwnerAllowed( projectSearchIds, httpServletRequest );

			////////   Auth complete
			//////////////////////////////////////////
    		
    		List<Integer> projectIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();
			
			UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getUserSession();
			if ( userSession == null ) {
				String msg = "ERROR: userSession == null";
				log.error(msg);
				throw new LimelightInternalErrorException( msg );
			}
			Integer userId = userSession.getUserId();
			if ( userId == null ) {
				String msg = "ERROR: userId == null";
				log.error(msg);
				throw new LimelightInternalErrorException( msg );
			}
			

			if ( putInNotInAnyFolder ) {
				//  Remove project_search_id from folder
				folderProjectSearchDAO.delete( projectSearchId );
			} else {
				//  Add or move project_search_id to folder
				
				if ( folderId == null ) {
					String msg = "INTERNAL ERROR: folderId == null when putInNotInAnyFolder is false ";
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				
				//  First validate that folder id is in same project as project search id
				
				FolderForProjectDTO folderForProjectDTO = folderForProjectDAO.getFolderForProjectDTO_ForId( folderId );
				if ( folderForProjectDTO == null ) {
					log.warn( "folderId not in DB: " + folderId + ", projectSearchId: " + projectSearchId );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				if ( ! projectIds.contains( folderForProjectDTO.getProjectId() ) ) {
					log.warn( "folderId does not have same projectId as projectSearchId.  folderId: " 
							+ folderId
							+ ", folder projectId: " 
							+ folderForProjectDTO.getProjectId()
							+ ", projectSearchId: "
							+ projectSearchId 
							+ ", projectSearchId project ids: "
							+ projectIds );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				
				FolderProjectSearchDTO folderProjectSearchDTO = new FolderProjectSearchDTO();
				folderProjectSearchDTO.setProjectSearchId( projectSearchId );
				folderProjectSearchDTO.setFolderId( folderId );
				folderProjectSearchDAO.saveOrUpdate( folderProjectSearchDTO, userId );
			}
			
			webserviceResult.status = true;

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
    
    //  Webservice Request and Response classes

    public static class WebserviceRequest {

    	private Integer projectSearchId; 
    	private Integer folderId;
    	private boolean putInNotInAnyFolder;
    	
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setFolderId(Integer folderId) {
			this.folderId = folderId;
		}
		public void setPutInNotInAnyFolder(boolean putInNotInAnyFolder) {
			this.putInNotInAnyFolder = putInNotInAnyFolder;
		}
    }
    
    public static class WebserviceResult {

		private boolean status;

		public boolean isStatus() {
			return status;
		}
		public void setStatus(boolean status) {
			this.status = status;
		}
    }


}


