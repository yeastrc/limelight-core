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
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectId_HasAtLeastOneActive_ProjectSearchId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Return true if a project id has at least 1 "active" project search id
 * 
 * - return true if At least 1 record in project_search_tbl for project_id 
 *   where status_id =  SearchRecordStatus.IMPORT_COMPLETE_VIEW
 *
 */
@RestController
public class Project_HasAtLeastOneActive_ProjectSearchId_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_HasAtLeastOneActive_ProjectSearchId_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private ProjectId_HasAtLeastOneActive_ProjectSearchId_SearcherIF projectId_HasAtLeastOneActive_ProjectSearchId_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_HasAtLeastOneActive_ProjectSearchId_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_HAS_AT_LEAST_ONE_ACTIVE_SEARCH_REST_WEBSERVICE_CONTROLLER
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

    		if ( StringUtils.isEmpty( webserviceRequest.projectIdentifier ) ) {
    			log.warn( "projectIdentifier is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		Integer projectId = null;
    		
    		try {
    			projectId = Integer.parseInt( webserviceRequest.projectIdentifier );
    		} catch ( Exception e ) {
    			log.warn( "projectIdentifier not parse to Integer. projectIdentifier: " + webserviceRequest.projectIdentifier );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
//			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
			validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
			.validatePublicAccessCodeReadAllowed( projectIds, httpServletRequest );

			boolean projectId_HasAtLeastOneActive_ProjectSearchId =  
					projectId_HasAtLeastOneActive_ProjectSearchId_Searcher
					.projectId_HasAtLeastOneActive_ProjectSearchId( projectId );
			
			//  Create webservice result object

    		WebserviceResult webserviceResult = new WebserviceResult();

			webserviceResult.status = true;
			webserviceResult.projectId_HasAtLeastOneActive_ProjectSearchId = projectId_HasAtLeastOneActive_ProjectSearchId;

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
    

    public static class WebserviceRequest {
    	
		private String projectIdentifier;

		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
    }
    
    public static class WebserviceResult {

		private boolean status;
		private boolean projectId_HasAtLeastOneActive_ProjectSearchId;

		public boolean isStatus() {
			return status;
		}
		public boolean isProjectId_HasAtLeastOneActive_ProjectSearchId() {
			return projectId_HasAtLeastOneActive_ProjectSearchId;
		}
    }

	/**
	 * Item in WebserviceResult
	 */
	public static class WebserviceResultItem {
		private int projectSearchId;
		private int searchId;
		private String searchName;

		public int getProjectSearchId() {
			return projectSearchId;
		}
		public void setProjectSearchId(int projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public int getSearchId() {
			return searchId;
		}
		public void setSearchId(int searchId) {
			this.searchId = searchId;
		}
		public String getSearchName() {
			return searchName;
		}
		public void setSearchName(String searchName) {
			this.searchName = searchName;
		}
	}    

}


