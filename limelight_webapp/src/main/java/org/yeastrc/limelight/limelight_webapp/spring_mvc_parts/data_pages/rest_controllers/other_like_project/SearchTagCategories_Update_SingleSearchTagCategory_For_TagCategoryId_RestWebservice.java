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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearch_TagCategoryInProject_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagCategoryInProject_DAO_IF;
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
 * Update Single Search Tag Category For Tag Category Id
 * 
 */
@RestController
public class SearchTagCategories_Update_SingleSearchTagCategory_For_TagCategoryId_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( SearchTagCategories_Update_SingleSearchTagCategory_For_TagCategoryId_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

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
					+ AA_RestWSControllerPaths_Constants.SEARCH_TAG_CATEGORIES_UPDATE_SINGLE_SEARCH_TAG_CATEGORY_FOR_TAG_CATEGORY_ID_REST_WEBSERVICE_CONTROLLER
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

    		if ( webserviceRequest.tagCategoryId == null ) {
    			log.warn( "webserviceRequest.tagId is null" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( StringUtils.isEmpty( webserviceRequest.category_label ) ) {
    			log.warn( "webserviceRequest.category_label is null or empty" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		// Currently not applicable to Category
//    		if ( StringUtils.isEmpty( webserviceRequest.label_Color_Background ) ) {
//    			log.warn( "webserviceRequest.label_Color_Background is null or empty" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//    		if ( StringUtils.isEmpty( webserviceRequest.label_Color_Font ) ) {
//    			log.warn( "webserviceRequest.label_Color_Font is null or empty" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
    		
			
			String category_label = webserviceRequest.category_label.trim();

    		if ( category_label.length() == 0  ) {
    			log.warn( "webserviceRequest.category_label is empty after trim() white space start and end" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
			
    		
    		Integer projectId = projectSearch_TagCategoryInProject_DAO.getProjectId_For_Id( webserviceRequest.tagCategoryId );
    		
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
        		
        		ProjectSearch_TagCategoryInProject_DTO item = new ProjectSearch_TagCategoryInProject_DTO();
        		item.setId( webserviceRequest.tagCategoryId );
        		item.setCategoryLabel( category_label );
        		item.setLabel_Color_Background( webserviceRequest.label_Color_Background );
        		item.setLabel_Color_Font( webserviceRequest.label_Color_Font );
        		item.setUpdatedBy_UserId(userId);
        		
        		try {
        			projectSearch_TagCategoryInProject_DAO.update( item );

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

    	private Integer tagCategoryId;
    	private String category_label;
		private String label_Color_Font;
    	private String label_Color_Background;
    	
		public void setTagCategoryId(Integer tagCategoryId) {
			this.tagCategoryId = tagCategoryId;
		}
		public void setCategory_label(String category_label) {
			this.category_label = category_label;
		}
		public void setLabel_Color_Font(String label_Color_Font) {
			this.label_Color_Font = label_Color_Font;
		}
		public void setLabel_Color_Background(String label_Color_Background) {
			this.label_Color_Background = label_Color_Background;
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
