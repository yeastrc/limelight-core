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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
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
 * Add Single Search Tag Category For Project Id or Project Search Id List
 * 
 */
@RestController
public class SearchTags_Add_SingleSearchTagCategory_For_ProjectId_Or_ProjectSearchIdList_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( SearchTags_Add_SingleSearchTagCategory_For_ProjectId_Or_ProjectSearchIdList_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
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
					+ AA_RestWSControllerPaths_Constants.SEARCH_TAGS_ADD_SINGLE_SEARCH_TAG_CATEGORY_FOR_PROJECT_ID_OR_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER
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

    		String projectIdentifier = webserviceRequest.projectIdentifier;
    		
    		if ( StringUtils.isEmpty( projectIdentifier ) && ( webserviceRequest.projectSearchIdList == null || webserviceRequest.projectSearchIdList.isEmpty() ) ) {
    			log.warn( "Neither populated: ( StringUtils.isEmpty( webserviceRequest.projectIdentifier ) && ( webserviceRequest.projectSearchIdList == null || webserviceRequest.projectSearchIdList.isEmpty() ) )" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( StringUtils.isNotEmpty( projectIdentifier ) && ( webserviceRequest.projectSearchIdList != null && ( ! webserviceRequest.projectSearchIdList.isEmpty() ) ) ) {
    			log.warn( "BOTH populated: ( StringUtils.isNotEmpty( projectIdentifier ) && ( webserviceRequest.projectSearchIdList != null && ( ! webserviceRequest.projectSearchIdList.isEmpty() ) ) )" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( StringUtils.isEmpty( webserviceRequest.category_label ) ) {
    			log.warn( "webserviceRequest.category_label is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		//  No color assigned yet
//    		if ( StringUtils.isEmpty( webserviceRequest.label_Color_Background ) ) {
//    			log.warn( "webserviceRequest.label_Color_Background is empty or not assigned" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
    		
    		String category_label = webserviceRequest.category_label.trim();

    		if ( category_label.length() == 0  ) {
    			log.warn( "webserviceRequest.category_label is empty after trim() white space start and end" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
			
    		Integer projectId = null;
    		UserSession userSession = null;
    		Integer userId = null;

    		if ( StringUtils.isNotEmpty( projectIdentifier ) ) {
    		
    			try {
    				projectId = Integer.parseInt( projectIdentifier );

    			} catch ( RuntimeException e ) {
    				log.warn( "Project Identifier not parsable to int: " + projectIdentifier );
    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}

    			List<Integer> projectIds = new ArrayList<>( 1 );
    			projectIds.add( projectId );

    			////////////////

    			//  AUTH - validate access

    			//  throws an exception if access is not valid that is turned into a webservice response by Spring

    			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
    					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
    					.validateProjectOwnerAllowed(projectIds, httpServletRequest);

    			////////////////

    			userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
    			if ( userSession == null ) {
    				String msg = "userSession == null";
    				log.error( msg );
    				throw new LimelightInternalErrorException(msg);
    			}

    			userId = userSession.getUserId();
    			if ( userId == null ) {
    				String msg = "userId == null";
    				log.error( msg );
    				throw new LimelightInternalErrorException(msg);
    			}
    			
    		} else {

        		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
        				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
        				.validateProjectOwnerAllowed( webserviceRequest.projectSearchIdList, httpServletRequest );

        		////////////////

        		List<Integer> projectIdsForProjectSearchIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();

        		if ( projectIdsForProjectSearchIds.isEmpty() ) {
        			log.warn( "projectIdsForProjectSearchIds.isEmpty" );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
        		}

        		if ( projectIdsForProjectSearchIds.size() > 1 ) {
        			log.warn( "projectIdsForProjectSearchIds.size > 1. projectIdsForProjectSearchIds.size: " + projectIdsForProjectSearchIds.size() );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
        		}
        		
        		projectId = projectIdsForProjectSearchIds.get(0);
        		
        		userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getUserSession();
        		
        		if ( userSession == null ) {
        			String msg = "( userSession == null )";
        			log.error(msg);
        			throw new LimelightInternalErrorException(msg);
        		}
        		
        		userId = userSession.getUserId();
        		if ( userId == null ) {
    				String msg = "userId == null";
    				log.error( msg );
    				throw new LimelightInternalErrorException(msg);
    			}
    			
    		}

    		WebserviceResult webserviceResult = new WebserviceResult();
    		
			Integer id_Existing_For_CategoryLabel = projectSearch_TagCategoryInProject_DAO.getId_For_ProjectId_CategoryLabel(projectId, category_label);
			
			if ( id_Existing_For_CategoryLabel != null ) {

    			webserviceResult.duplicate = true;
				
			} else {

				//  No existing so save
	    		
				ProjectSearch_TagCategoryInProject_DTO item = new ProjectSearch_TagCategoryInProject_DTO();
				item.setProjectId(projectId);
				item.setCategoryLabel(category_label);
				item.setLabel_Color_Background(webserviceRequest.label_Color_Background);
				item.setLabel_Color_Font(webserviceRequest.label_Color_Font);
				item.setCreatedBy_UserId(userId);
				item.setUpdatedBy_UserId(userId);

				projectSearch_TagCategoryInProject_DAO.save__NOT_SET_ID( item );

				Integer searchTagCategoryId = projectSearch_TagCategoryInProject_DAO.getId_For_ProjectId_CategoryLabel(projectId, category_label);

				if ( searchTagCategoryId == null ) {
					String msg = "searchTagCategoryId == null";
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}

				webserviceResult.statusSuccess = true;
				webserviceResult.searchTagCategoryId = searchTagCategoryId;
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

    	private String projectIdentifier;
    	private List<Integer> projectSearchIdList;
    	private String category_label;
		private String label_Color_Font;
    	private String label_Color_Background;
    	private String label_Color_Border;
		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
		public void setProjectSearchIdList(List<Integer> projectSearchIdList) {
			this.projectSearchIdList = projectSearchIdList;
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
		public void setLabel_Color_Border(String label_Color_Border) {
			this.label_Color_Border = label_Color_Border;
		}
    	
    	
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
    	private boolean statusSuccess;
    	private Integer searchTagCategoryId;
    	private boolean duplicate;
    	
		public boolean isStatusSuccess() {
			return statusSuccess;
		}
		public Integer getSearchTagCategoryId() {
			return searchTagCategoryId;
		}
		public boolean isDuplicate() {
			return duplicate;
		}
    	
    }
}
