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
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.FolderForProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.SearchDisplayOrder_InFolder_Update_UsingDBTransactionService_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderForProjectDTO;
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
 * Organize Searches - Set Searches Order for a list of Project Search Ids in a Folder
 *
 */
@RestController
public class Project_OrganizeSearches_SetSearchesOrder_InFolder_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_OrganizeSearches_SetSearchesOrder_InFolder_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private FolderForProjectDAO_IF folderForProjectDAO;
	
	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
		
	@Autowired
	private SearchDisplayOrder_InFolder_Update_UsingDBTransactionService_IF searchDisplayOrder_InFolder_Update_UsingDBTransactionService;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_OrganizeSearches_SetSearchesOrder_InFolder_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_ORGANIZE_SEARCHES_SET_SEARCHES_ORDER_IN_FOLDER_REST_WEBSERVICE_CONTROLLER
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
    		
    		Integer folderId = webserviceRequest.folderId;
    		
    		List<Integer> projectSearchesIdsInOrder = webserviceRequest.projectSearchesIdsInOrder;

    		if ( folderId == null ) {
    			log.warn( "folderId is null" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( projectSearchesIdsInOrder == null || projectSearchesIdsInOrder.isEmpty() ) {
    			log.warn( "projectSearchesIdsInOrder is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

			//  Validate access to folderId
    		
			FolderForProjectDTO folderForProjectDTO = folderForProjectDAO.getFolderForProjectDTO_ForId( folderId );
			if ( folderForProjectDTO == null ) {
				log.warn( "folderId not in DB: " + folderId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
    		
    		List<Integer> projectIds = new ArrayList<>( 1 );
    		projectIds.add( folderForProjectDTO.getProjectId() );
    		
    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
    				validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validateProjectOwnerAllowed( projectIds, httpServletRequest );

			//  Validate access to Project Search Ids

    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result projectSearchIds_Access_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
					.validateProjectOwnerAllowed( projectSearchesIdsInOrder, httpServletRequest );
    		
			////////   Auth complete
			//////////////////////////////////////////
    		

			//  validate that folder id is in same project as project search ids
			
			List<Integer> projectId_List_For_ProjectSearchIds =
					projectSearchIds_Access_Result.getProjectIdsForProjectSearchIds();

			if ( projectId_List_For_ProjectSearchIds.isEmpty() ) {
				String msg = "NO Project Id for Project Search Ids projectSearchesIdsInOrder: " + StringUtils.join( projectSearchesIdsInOrder, ", " );
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}

			if ( projectId_List_For_ProjectSearchIds.size() > 1 ) {
				String msg = "> 1 Project Ids for Project Search Ids projectSearchesIdsInOrder: " + StringUtils.join( projectSearchesIdsInOrder, ", " );
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			Integer projectId_For_ProjectSearchIds = projectId_List_For_ProjectSearchIds.get(0);

			if ( projectId_For_ProjectSearchIds.intValue() != folderForProjectDTO.getProjectId() ) {
				log.warn( "folderId does not have same projectId as projectSearchIds.  folderId: " 
						+ folderId
						+ ", folder projectId: " 
						+ folderForProjectDTO.getProjectId()
						+ ", projectSearchesIdsInOrder: "
						+ StringUtils.join( projectSearchesIdsInOrder, ", " )
						+ ", projectSearchIds project id: "
						+ projectId_For_ProjectSearchIds );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
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

			searchDisplayOrder_InFolder_Update_UsingDBTransactionService.searchDisplayOrder_Update( folderId, projectSearchesIdsInOrder );
			
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

    	private Integer folderId;
    	private List<Integer> projectSearchesIdsInOrder;

		public void setProjectSearchesIdsInOrder(List<Integer> projectSearchesIdsInOrder) {
			this.projectSearchesIdsInOrder = projectSearchesIdsInOrder;
		}
		public void setFolderId(Integer folderId) {
			this.folderId = folderId;
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


