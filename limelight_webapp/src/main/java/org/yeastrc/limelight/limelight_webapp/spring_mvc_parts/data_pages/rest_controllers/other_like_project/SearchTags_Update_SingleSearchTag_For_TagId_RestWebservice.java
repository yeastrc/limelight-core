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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearch_TagStringInProject_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagCategoryInProject_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagStringInProject_DAO_IF;
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
 * Update Single Search Tag For Tag Id
 * 
 */
@RestController
public class SearchTags_Update_SingleSearchTag_For_TagId_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( SearchTags_Update_SingleSearchTag_For_TagId_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private ProjectSearch_TagStringInProject_DAO_IF projectSearch_TagStringInProject_DAO;

	@Autowired
	private ProjectSearch_TagCategoryInProject_DAO_IF projectSearch_TagCategoryInProject_DAO;

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
					+ AA_RestWSControllerPaths_Constants.SEARCH_TAGS_UPDATE_SINGLE_SEARCH_TAG_FOR_TAG_ID_REST_WEBSERVICE_CONTROLLER
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

			WebserviceResult webserviceResult = new WebserviceResult();

    		if ( webserviceRequest.tagId == null ) {
    			log.warn( "webserviceRequest.tagId is null" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( StringUtils.isEmpty( webserviceRequest.tag_string ) ) {
    			log.warn( "webserviceRequest.tag_string is null or empty" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( StringUtils.isEmpty( webserviceRequest.tag_Color_Background ) ) {
    			log.warn( "webserviceRequest.tag_Color_Background is null or empty" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( StringUtils.isEmpty( webserviceRequest.tag_Color_Font ) ) {
    			log.warn( "webserviceRequest.tag_Color_Font is null or empty" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		Integer projectId = projectSearch_TagStringInProject_DAO.getProjectId_For_Id( webserviceRequest.tagId );
    		
    		if ( projectId != null ) {

    			List<Integer> projectIds = new ArrayList<>( 1 );
    			projectIds.add( projectId );

    			////////////////

    			//  AUTH - validate access

    			//  throws an exception if access is not valid that is turned into a webservice response by Spring

    			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
    					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
    					.validateProjectOwnerAllowed(projectIds, httpServletRequest);

    			////////////////

        		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
        		if ( userSession == null ) {
        			String msg = "userSession == null";
        			log.error( msg );
        			throw new LimelightInternalErrorException(msg);
        		}
        		
        		Integer userId = userSession.getUserId();
        		if ( userId == null ) {
        			String msg = "userId == null";
        			log.error( msg );
        			throw new LimelightInternalErrorException(msg);
        		}
        		
        		int tagCategoryId = 0;
        		
        		if ( webserviceRequest.tag_category_id != null ) {
        			tagCategoryId = webserviceRequest.tag_category_id.intValue();
        		} else {
        			
        			Integer id_For_UncategorizedFakeRecord = projectSearch_TagCategoryInProject_DAO.getId_For_UncategorizedFakeRecord();
        			
        			if ( id_For_UncategorizedFakeRecord == null ) {
        				
        				projectSearch_TagCategoryInProject_DAO.insertIfNotExist_UncategorizedFakeRecord();
        				
        				id_For_UncategorizedFakeRecord = projectSearch_TagCategoryInProject_DAO.getId_For_UncategorizedFakeRecord();
        			}
        			
        			if ( id_For_UncategorizedFakeRecord == null ) {
        				String msg = "Failed to get id_For_UncategorizedFakeRecord after calling  projectSearch_TagCategoryInProject_DAO.insertIfNotExist_UncategorizedFakeRecord();";
        				log.error(msg);
        				throw new LimelightInternalErrorException(msg);
        			}
        			
        			
        			tagCategoryId = id_For_UncategorizedFakeRecord.intValue();
        		}
        		
        		ProjectSearch_TagStringInProject_DTO item = new ProjectSearch_TagStringInProject_DTO();
        		item.setId( webserviceRequest.tagId );
        		item.setTagCategoryId( tagCategoryId );
        		item.setTag_string( webserviceRequest.tag_string );
        		item.setTag_Color_Background( webserviceRequest.tag_Color_Background );
        		item.setTag_Color_Font( webserviceRequest.tag_Color_Font );
        		item.setUpdatedBy_UserId(userId);
        		
        		try {
        			projectSearch_TagStringInProject_DAO.update( item );

        			webserviceResult.statusSuccess = true;

        		} catch ( org.springframework.dao.DuplicateKeyException duplicateKeyException ) {

        			webserviceResult.duplicate = true;
        		}
    			
        		
    		}
    		
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

    	private Integer tagId;
    	private Integer tag_category_id;
        private String tag_string;
        private String tag_Color_Background;
        private String tag_Color_Font;

		public void setTagId(Integer tagId) {
			this.tagId = tagId;
		}

		public void setTag_string(String tag_string) {
			this.tag_string = tag_string;
		}

		public void setTag_Color_Background(String tag_Color_Background) {
			this.tag_Color_Background = tag_Color_Background;
		}

		public void setTag_Color_Font(String tag_Color_Font) {
			this.tag_Color_Font = tag_Color_Font;
		}

		public void setTag_category_id(Integer tag_category_id) {
			this.tag_category_id = tag_category_id;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
    	private boolean statusSuccess;
    	private boolean duplicate;
    	    	
		public boolean isStatusSuccess() {
			return statusSuccess;
		}

		public boolean isDuplicate() {
			return duplicate;
		}
    }
}
