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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagCategoryInProject_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTags_ForProjectId_Searcher.ProjectSearchTags_ForProjectId_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTags_ForProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Get Search Tags For Project Id
 * 
 */
@RestController
public class SearchTags_Get_For_ProjectId_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( SearchTags_Get_For_ProjectId_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private ProjectSearch_TagCategoryInProject_DAO_IF projectSearch_TagCategoryInProject_DAO;

	@Autowired
	private ProjectSearchTags_ForProjectId_Searcher_IF projectSearchTags_ForProjectId_Searcher;
	
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
					+ AA_RestWSControllerPaths_Constants.SEARCH_TAGS_GET_FOR_PROJECT_ID_REST_WEBSERVICE_CONTROLLER
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

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
    		////////////////

    		//  AUTH - validate access

    		//  throws an exception if access is not valid that is turned into a webservice response by Spring

			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
    				validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
    				.validateProjectOwnerAllowed(projectIds, httpServletRequest);

    		////////////////

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getWebSessionAuthAccessLevel();
			
    		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
    		
    		List<WebserviceResult_Tag> tags_DistinctInProject = null;
    		{
    			Integer id_For_UncategorizedFakeRecord = projectSearch_TagCategoryInProject_DAO.getId_For_UncategorizedFakeRecord();
    			
    			
    			List<ProjectSearchTags_ForProjectId_Searcher_ResultItem> results = 
    					projectSearchTags_ForProjectId_Searcher.getProjectSearchTags_ForProjectId(projectId);
    			
    			tags_DistinctInProject = new ArrayList<>( results.size() );
    			
    			for ( ProjectSearchTags_ForProjectId_Searcher_ResultItem result : results ) {
    				WebserviceResult_Tag webserviceResult_SearchTag = new WebserviceResult_Tag();
    				
    				Integer tag_category_id = result.getTag_category_id();
    				
    				if ( id_For_UncategorizedFakeRecord != null && id_For_UncategorizedFakeRecord.intValue() == tag_category_id.intValue() ) {
    					tag_category_id = null;  // Uncategorized so set to null
    				}
    				
    				webserviceResult_SearchTag.tag_id = result.getTag_id();
    				webserviceResult_SearchTag.tag_category_id = tag_category_id;
    				webserviceResult_SearchTag.tag_string = result.getTag_string();
    				webserviceResult_SearchTag.tag_Color_Font = result.getTag_Color_Font();
    				webserviceResult_SearchTag.tag_Color_Background = result.getTag_Color_Background();
    				webserviceResult_SearchTag.tag_Color_Border = result.getTag_Color_Border();
    				tags_DistinctInProject.add(webserviceResult_SearchTag);
    			}
    		}
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		
    		webserviceResult.tags_DistinctInProject = tags_DistinctInProject;
    		
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

		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	private List<WebserviceResult_Tag> tags_DistinctInProject;

		public List<WebserviceResult_Tag> getTags_DistinctInProject() {
			return tags_DistinctInProject;
		}
    }

    /**
     * 
     *
     */
    public static class WebserviceResult_Tag {
		
    	private int tag_id;
    	private Integer tag_category_id; //  NULL if 'Uncategorized'
		private String tag_string;
		private String tag_Color_Font;
    	private String tag_Color_Background;
    	private String tag_Color_Border;
		
		public int getTag_id() {
			return tag_id;
		}
		public String getTag_string() {
			return tag_string;
		}
		public String getTag_Color_Font() {
			return tag_Color_Font;
		}
		public String getTag_Color_Background() {
			return tag_Color_Background;
		}
		public String getTag_Color_Border() {
			return tag_Color_Border;
		}
		public Integer getTag_category_id() {
			return tag_category_id;
		}

    }

}
