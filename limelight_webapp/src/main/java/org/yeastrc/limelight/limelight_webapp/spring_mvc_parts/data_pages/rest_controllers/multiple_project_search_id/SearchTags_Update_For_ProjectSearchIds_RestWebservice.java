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
import org.yeastrc.limelight.limelight_webapp.constants.FieldLengthConstants;
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
 * Update Search Tags For Project Search Ids
 * 
 */
@RestController
public class SearchTags_Update_For_ProjectSearchIds_RestWebservice {

//	private static final Logger log = LoggerFactory.getLogger( SearchTags_Update_For_ProjectSearchIds_RestWebservice.class );
//
//	@Autowired
//	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;
//
//	@Autowired
//	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
//
//	@Autowired
//	private Update_Search_Tags_UsingDBTransactionService_IF update_Search_Tags_UsingDBTransactionService;
//	
//	@Autowired
//	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;
//
//	@Autowired
//	private MarshalObjectToJSON marshalObjectToJSON;
//	
//
//	//  Convert result object graph to JSON in byte[] in the controller body so can cache it
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
//					+ AA_RestWSControllerPaths_Constants.SEARCH_TAGS_UPDATE_FOR_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER
//			},
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )
//
////	@RequestMapping( 
////			path = AA_RestWSControllerPaths_Constants.,
////			method = RequestMethod.POST,
////			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//
//    public @ResponseBody ResponseEntity<byte[]>  controllerEntry(
//
//    		@RequestBody byte[] postBody,
//    		HttpServletRequest httpServletRequest,
//    		HttpServletResponse httpServletResponse
//    		) throws Exception {
//    	
//    	try {
////    		log.warn( "controllerEntry(...) called" );
//
//    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
//    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
//    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );
//
//    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
//
//    		if ( postBody == null ) {
//    			log.warn( "No Post Body" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//
//    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );
//    		
//    		if ( webserviceRequest.getProjectSearchIds() == null || webserviceRequest.getProjectSearchIds().isEmpty() ) {
//    			log.warn( "ProjectSearchIds is null or empty." );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//    		if ( webserviceRequest.tagEntries == null || webserviceRequest.tagEntries.isEmpty() ) {
//    			log.warn( "tagEntries is null or empty." );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//
//    		////////////////
//
//    		//  AUTH - validate access
//
//    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
//
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
//    				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
//    				.validateProjectOwnerAllowed( webserviceRequest.getProjectSearchIds(), httpServletRequest );
//
//    		////////////////
//
//			WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
//					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getWebSessionAuthAccessLevel();
//			
//    		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getUserSession();
//    		
//    		if ( userSession == null ) {
//    			String msg = "( userSession == null )";
//    			log.error(msg);
//    			throw new LimelightInternalErrorException(msg);
//    		}
//    		
//    		Integer userId = userSession.getUserId();
//
//    		if ( userId == null ) {
//    			String msg = "( userId == null )";
//    			log.error(msg);
//    			throw new LimelightInternalErrorException(msg);
//    		}
//    		
//    		List<Integer> projectIdsForProjectSearchIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();
//
//    		if ( projectIdsForProjectSearchIds.isEmpty() ) {
//    			log.warn( "projectIdsForProjectSearchIds.isEmpty" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//
//    		if ( projectIdsForProjectSearchIds.size() > 1 ) {
//    			log.warn( "projectIdsForProjectSearchIds.size > 1. projectIdsForProjectSearchIds.size: " + projectIdsForProjectSearchIds.size() );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//    		
//    		int projectId = projectIdsForProjectSearchIds.get(0);
//    		
//    		List<Update_Search_Tags_UsingDBTransactionService_SingleTagEntry> searchTags = new ArrayList<>( webserviceRequest.tagEntries.size() );
//    		
//    		for ( WebserviceRequest_SingleTagEntry tagEntry : webserviceRequest.tagEntries ) {
//    			
//    			if ( tagEntry.tagId == null ) {
//    				log.warn( "( tagEntry.tagId == null )" );
//        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    			}
//    			if ( tagEntry.tagString == null || tagEntry.tagString.length() == 0 ) {
//    				log.warn( "( tagEntry.tagString == null || tagEntry.tagString.length() == 0 )" );
//        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    			}
//    			if ( tagEntry.tag_Selected == null ) {
//    				log.warn( "( tagEntry.tag_Selected == null )" );
//        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    			}
//    			if ( tagEntry.tag_Added == null ) {
//    				log.warn( "( tagEntry.tag_Added == null )" );
//        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    			}
//    			
//    			String tagString = null;
//    			
//    			if ( tagEntry.tag_Added != null && tagEntry.tag_Added.booleanValue() && tagEntry.tagString != null ) {
//    				
//    				tagString = tagEntry.tagString.trim();
//
//    				if ( tagEntry.tag_Added.booleanValue() && tagString.length() > FieldLengthConstants.SEARCH_TAG_MAX_LENGTH__TAG_STRING ) {
//    					log.warn( "( tagEntry.tag_Added != null && tagEntry.tag_Added.booleanValue() && tagEntry.tagString != null && tagEntry.tagString.trim().length() > FieldLengthConstants.SEARCH_TAG_MAX_LENGTH__TAG_STRING ).  FieldLengthConstants.SEARCH_TAG_MAX_LENGTH__TAG_STRING: " + FieldLengthConstants.SEARCH_TAG_MAX_LENGTH__TAG_STRING );
//    					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    				}
//    			}
//    			
//    			Update_Search_Tags_UsingDBTransactionService_SingleTagEntry searchTag = new Update_Search_Tags_UsingDBTransactionService_SingleTagEntry();
//    			searchTag.setTagId( tagEntry.tagId );
//    			searchTag.setTagString( tagString );
//    			searchTag.setTag_Color_Font( tagEntry.tag_Color_Font );
//    			searchTag.setTag_Color_Background( tagEntry.tag_Color_Background );
//    			searchTag.setTag_Color_Border( tagEntry.tag_Color_Border );
//    			searchTag.setTag_Selected( tagEntry.tag_Selected );
//    			searchTag.setTag_Added( tagEntry.tag_Added );
//    			
//    			searchTags.add(searchTag);
//    		}
//
//    		final int retry_OnDuplicate_Count_Max = 3;
//    		
//    		int retry_OnDuplicate_Count = 0;
//    		
//    		while ( true ) { //  "BREAK" to exit loop
//    			
//    			Update_Search_Tags_UsingDBTransactionService.Log_DuplicateKeyException log_DuplicateKeyException = Update_Search_Tags_UsingDBTransactionService.Log_DuplicateKeyException.NO;
//    			if ( retry_OnDuplicate_Count == retry_OnDuplicate_Count_Max ) {
//    				log_DuplicateKeyException = Update_Search_Tags_UsingDBTransactionService.Log_DuplicateKeyException.YES;
//    			}
//    			
//    			try {
//    				update_Search_Tags_UsingDBTransactionService.update_Search_Tags(userId, projectId, webserviceRequest.projectSearchIds, searchTags, log_DuplicateKeyException);
//    				
//    				break; //  "BREAK" to exit loop
//
//    			} catch ( org.springframework.dao.DuplicateKeyException duplicateKeyException ) {
//    				if ( retry_OnDuplicate_Count == retry_OnDuplicate_Count_Max ) {
//    					throw duplicateKeyException;
//    				}
//    			}
//    			
//    			retry_OnDuplicate_Count++;
//    		}
//    		
//    		WebserviceResult webserviceResult = new WebserviceResult();
//    		
//    		webserviceResult.statusSuccess = true;
//    		
//    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );
//    		
//    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );
//
//    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
//    		
//    		//  only rethrow Error Response Exceptions 
//    		throw e;
//    		
//    	} catch ( Exception e ) {
//    		String msg = "Failed in controller: ";
//			log.error( msg, e );
//			throw new Limelight_WS_InternalServerError_Exception();
//    	}
//    }
//
//    //////////////////////////////////////////
//    
//    //   Webservice Request and Result
//    
//    /**
//     * 
//     *
//     */
//    public static class WebserviceRequest {
//
//    	private List<Integer> projectSearchIds;
//    	
//    	private List<WebserviceRequest_SingleTagEntry> tagEntries;
//
//		public List<Integer> getProjectSearchIds() {
//			return projectSearchIds;
//		}
//		public void setProjectSearchIds(List<Integer> projectSearchIds) {
//			this.projectSearchIds = projectSearchIds;
//		}
//		public void setTagEntries(List<WebserviceRequest_SingleTagEntry> tagEntries) {
//			this.tagEntries = tagEntries;
//		}
//    }
//    
//    /**
//     * 
//     *
//     */
//    public static class WebserviceRequest_SingleTagEntry {
//
//    	private Integer tagId;
//    	private String tagString;
//    	private String tag_Color_Font;
//    	private String tag_Color_Background;
//    	private String tag_Color_Border;
//    	private Boolean tag_Selected;
//    	private Boolean tag_Added;
//    	
//		public void setTagId(Integer tagId) {
//			this.tagId = tagId;
//		}
//		public void setTagString(String tagString) {
//			this.tagString = tagString;
//		}
//		public void setTag_Selected(Boolean tag_Selected) {
//			this.tag_Selected = tag_Selected;
//		}
//		public void setTag_Added(Boolean tag_Added) {
//			this.tag_Added = tag_Added;
//		}
//		public void setTag_Color_Font(String tag_Color_Font) {
//			this.tag_Color_Font = tag_Color_Font;
//		}
//		public void setTag_Color_Background(String tag_Color_Background) {
//			this.tag_Color_Background = tag_Color_Background;
//		}
//		public void setTag_Color_Border(String tag_Color_Border) {
//			this.tag_Color_Border = tag_Color_Border;
//		}
//    	
//    }
//    
//    /**
//     * 
//     *
//     */
//    public static class WebserviceResult {
//    
//    	private boolean statusSuccess;
//
//		public boolean isStatusSuccess() {
//			return statusSuccess;
//		}
//    }

}
