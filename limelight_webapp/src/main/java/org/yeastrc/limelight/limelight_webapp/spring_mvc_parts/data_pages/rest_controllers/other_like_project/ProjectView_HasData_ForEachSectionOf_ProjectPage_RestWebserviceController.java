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

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.Project_Has_AtLeastOne_DataPage_SavedView_Table_Record_ForProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.Project_Has_AtLeastOne_Experiment_NOT_Draft_Record_ForProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.Project_Has_AtLeastOne_FeatureDetectionRoot_ProjectMapping_Table_Record_ForProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.Project_Has_AtLeastOne_ProjectScanFile_Table_Record_ForProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.Project_Has_AtLeastOne_ProjectSearch_Table_Record_ForProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

@RestController
public class ProjectView_HasData_ForEachSectionOf_ProjectPage_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ProjectView_HasData_ForEachSectionOf_ProjectPage_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private Project_Has_AtLeastOne_ProjectSearch_Table_Record_ForProjectId_Searcher_IF project_Has_AtLeastOne_Search_ForProjectId_Searcher;
	
	@Autowired
	private Project_Has_AtLeastOne_ProjectScanFile_Table_Record_ForProjectId_Searcher_IF project_Has_AtLeastOne_ProjectScanFile_Table_Record_ForProjectId_Searcher;
	
	@Autowired
	private Project_Has_AtLeastOne_Experiment_NOT_Draft_Record_ForProjectId_Searcher_IF project_Has_AtLeastOne_Experiment_NOT_Draft_Record_ForProjectId_Searcher;
	
	@Autowired
	private Project_Has_AtLeastOne_DataPage_SavedView_Table_Record_ForProjectId_Searcher_IF project_Has_AtLeastOne_DataPage_SavedView_Table_Record_ForProjectId_Searcher;
	
	@Autowired
	private Project_Has_AtLeastOne_FeatureDetectionRoot_ProjectMapping_Table_Record_ForProjectId_Searcher_IF project_Has_AtLeastOne_FeatureDetectionRoot_ProjectMapping_Table_Record_ForProjectId_Searcher;
	
	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ProjectView_HasData_ForEachSectionOf_ProjectPage_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_VIEW_PAGE_HAS_DATA_FOR_EACH_SECTION_OF_PROJECT_PAGE_REST_WEBSERVICE_CONTROLLER
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

    		String projectIdentifier = webserviceRequest.getProjectIdentifier();
    		
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
			
			GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
					getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();

			if ( getWebSessionAuthAccessLevelForProjectIds_Result.isNoSession()
					&& ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )) {
				
				//  No User session and not public project
				throw new Limelight_WS_AuthError_Unauthorized_Exception();
			}

    		WebserviceResult webserviceResult = new WebserviceResult();
    		
    		webserviceResult.has_Searches_Data = project_Has_AtLeastOne_Search_ForProjectId_Searcher.get_Project_Has_AtLeastOne_ProjectSearch_Table_Record_ForProjectId( projectId );

    		webserviceResult.has_ScanFile_Data =
    				project_Has_AtLeastOne_ProjectScanFile_Table_Record_ForProjectId_Searcher.get_Project_Has_AtLeastOne_ProjectScanFile_Record_ForProjectId( projectId );
    		
    		webserviceResult.has_Experiment_NOT_Drafts_Data =
    				project_Has_AtLeastOne_Experiment_NOT_Draft_Record_ForProjectId_Searcher.get_Project_Has_AtLeastOne_Experiment_NOT_Draft_Record_ForProjectId( projectId );
    		
    		webserviceResult.has_DataPage_SavedView_Data =
    				project_Has_AtLeastOne_DataPage_SavedView_Table_Record_ForProjectId_Searcher.get_Project_Has_AtLeastOne_DataPage_SavedView_Table_Record_ForProjectId( projectId );
    		
    		webserviceResult.has_FeatureDetectionRoot_ProjectMapping_Data =
    				project_Has_AtLeastOne_FeatureDetectionRoot_ProjectMapping_Table_Record_ForProjectId_Searcher
    				.get_Project_Has_AtLeastOne_FeatureDetectionRoot_ProjectMapping_Table_Record_ForProjectId( projectId );
    		
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
    
    ////////////////////////
    
    //  Webservice Request and Response objects

    public static class WebserviceRequest {
    	private String projectIdentifier;

		public String getProjectIdentifier() {
			return projectIdentifier;
		}

		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
    }
    
    public static class WebserviceResult {
    	
    	private boolean has_Searches_Data;
    	private boolean has_ScanFile_Data;
    	
    	private boolean has_Experiment_NOT_Drafts_Data;
    	private boolean has_DataPage_SavedView_Data;
    	
    	private boolean has_FeatureDetectionRoot_ProjectMapping_Data;

		public boolean isHas_Searches_Data() {
			return has_Searches_Data;
		}

		public boolean isHas_ScanFile_Data() {
			return has_ScanFile_Data;
		}

		public boolean isHas_Experiment_NOT_Drafts_Data() {
			return has_Experiment_NOT_Drafts_Data;
		}

		public boolean isHas_DataPage_SavedView_Data() {
			return has_DataPage_SavedView_Data;
		}

		public boolean isHas_FeatureDetectionRoot_ProjectMapping_Data() {
			return has_FeatureDetectionRoot_ProjectMapping_Data;
		}
    }
    
}


