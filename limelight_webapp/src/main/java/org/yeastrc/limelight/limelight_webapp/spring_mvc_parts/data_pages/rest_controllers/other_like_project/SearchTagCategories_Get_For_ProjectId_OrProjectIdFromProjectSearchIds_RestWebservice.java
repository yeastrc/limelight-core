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
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTagCategories_ForProjectId_Searcher.ProjectSearchTagCategories_ForProjectId_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTagCategories_ForProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Get Search Tag Categories For Project Id or Project Id from Project Search Ids
 * 
 */
@RestController
public class SearchTagCategories_Get_For_ProjectId_OrProjectIdFromProjectSearchIds_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( SearchTagCategories_Get_For_ProjectId_OrProjectIdFromProjectSearchIds_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private ProjectSearchTagCategories_ForProjectId_Searcher_IF projectSearchTagCategories_ForProjectId_Searcher;
	
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
					+ AA_RestWSControllerPaths_Constants.SEARCH_TAG_CATEGORIES_GET_FOR_PROJECT_ID_OR_PROJECT_ID_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER
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
    		List<Integer> projectSearchIds = webserviceRequest.projectSearchIds;
    		
    		if ( StringUtils.isEmpty( projectIdentifier ) && ( projectSearchIds == null || projectSearchIds.isEmpty() ) ) {
    			log.warn( "projectIdentifier is empty or not assigned AND projectSearchIds is null or empty" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		int projectId = 0;

    		if ( StringUtils.isNotEmpty( projectIdentifier ) ) { 
    			
    			// use Project Id
    			
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

    			//  ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
    			validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
    			.validateProjectOwnerAllowed(projectIds, httpServletRequest);

    		} else {
    			
    			//  Use Project Search Ids
    			

        		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
        				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
        				.validateProjectOwnerAllowed( projectSearchIds, httpServletRequest );

				List<Integer> projectIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();

				if (projectIds.isEmpty() ) {
					String msg = "validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds(); returned empty list.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				if (projectIds.size() > 1 ) {
					String msg = "validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds(); returned > 1 entry.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				projectId = projectIds.get(0);
    		}
    		
    		List<WebserviceResult_TagCategory> tagCategories_DistinctInProject = null;
    		{
    			List<ProjectSearchTagCategories_ForProjectId_Searcher_ResultItem> results = 
    					projectSearchTagCategories_ForProjectId_Searcher.getProjectSearchTagCategories_ForProjectId(projectId);
    			
    			tagCategories_DistinctInProject = new ArrayList<>( results.size() );
    			
    			for ( ProjectSearchTagCategories_ForProjectId_Searcher_ResultItem result : results ) {
    				WebserviceResult_TagCategory webserviceResult_TagCategory = new WebserviceResult_TagCategory();
    				webserviceResult_TagCategory.category_id = result.getCategory_id();
    				webserviceResult_TagCategory.category_label = result.getCategory_label();
    				webserviceResult_TagCategory.label_Color_Font = result.getLabel_Color_Font();
    				webserviceResult_TagCategory.label_Color_Background = result.getLabel_Color_Background();
    				webserviceResult_TagCategory.label_Color_Border = result.getLabel_Color_Border();
    				tagCategories_DistinctInProject.add(webserviceResult_TagCategory);
    			}
    		}
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		
    		webserviceResult.tagCategories_DistinctInProject = tagCategories_DistinctInProject;
    		
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
    	private List<Integer> projectSearchIds;

		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}

		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	private List<WebserviceResult_TagCategory> tagCategories_DistinctInProject;

		public List<WebserviceResult_TagCategory> getTagCategories_DistinctInProject() {
			return tagCategories_DistinctInProject;
		}
    }

    /**
     * 
     *
     */
    public static class WebserviceResult_TagCategory {
		
    	private int category_id;
		private String category_label;
		private String label_Color_Font;
    	private String label_Color_Background;
    	private String label_Color_Border;
    	
		public int getCategory_id() {
			return category_id;
		}
		public String getCategory_label() {
			return category_label;
		}
		public String getLabel_Color_Font() {
			return label_Color_Font;
		}
		public String getLabel_Color_Background() {
			return label_Color_Background;
		}
		public String getLabel_Color_Border() {
			return label_Color_Border;
		}
		
    }

}
