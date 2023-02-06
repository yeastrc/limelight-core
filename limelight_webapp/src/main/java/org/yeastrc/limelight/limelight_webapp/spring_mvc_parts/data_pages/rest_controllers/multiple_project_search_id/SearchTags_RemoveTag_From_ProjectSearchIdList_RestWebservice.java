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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.multiple_project_search_id;

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
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagMapping_DAO_IF;
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
 * Remove Search Tag From Project Search Id List
 * 
 */
@RestController
public class SearchTags_RemoveTag_From_ProjectSearchIdList_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( SearchTags_RemoveTag_From_ProjectSearchIdList_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private ProjectSearch_TagMapping_DAO_IF projectSearch_TagMapping_DAO;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	

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
					+ AA_RestWSControllerPaths_Constants.SEARCH_TAGS_REMOVE_TAG_FROM_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  controllerEntry(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "controllerEntry(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );
    		
    		if ( webserviceRequest.projectSearchIds == null || webserviceRequest.projectSearchIds.isEmpty() ) {
    			log.warn( "projectSearchIds is null or empty." );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( webserviceRequest.tagId == null ) {
    			log.warn( "tagId is null." );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		////////////////

    		//  AUTH - validate access

    		//  throws an exception if access is not valid that is turned into a webservice response by Spring

    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
    				.validateProjectOwnerAllowed( webserviceRequest.projectSearchIds, httpServletRequest );

    		////////////////

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getWebSessionAuthAccessLevel();
			
    		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getUserSession();
    		
    		if ( userSession == null ) {
    			String msg = "( userSession == null )";
    			log.error(msg);
    			throw new LimelightInternalErrorException(msg);
    		}
    		
    		Integer userId = userSession.getUserId();

    		if ( userId == null ) {
    			String msg = "( userId == null )";
    			log.error(msg);
    			throw new LimelightInternalErrorException(msg);
    		}
    		
    		List<Integer> projectIdsForProjectSearchIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();

    		if ( projectIdsForProjectSearchIds.isEmpty() ) {
    			log.warn( "projectIdsForProjectSearchIds.isEmpty" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( projectIdsForProjectSearchIds.size() > 1 ) {
    			log.warn( "projectIdsForProjectSearchIds.size > 1. projectIdsForProjectSearchIds.size: " + projectIdsForProjectSearchIds.size() );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		List<Integer> project_search_tag_strings_in_project_id_List = new ArrayList<>( 2 );
    		
    		project_search_tag_strings_in_project_id_List.add( webserviceRequest.tagId );
    		
    		projectSearch_TagMapping_DAO.delete_For_project_search_id_List__project_search_tag_strings_in_project_id_List(webserviceRequest.projectSearchIds, project_search_tag_strings_in_project_id_List);
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		
    		webserviceResult.statusSuccess = true;
    		
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

    //////////////////////////////////////////
    
    //   Webservice Request and Result
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {

    	private List<Integer> projectSearchIds;
    	
    	private Integer tagId;

		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
		public void setTagId(Integer tagId) {
			this.tagId = tagId;
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
    }

}
