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
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.services.Get_SearchDetails_ProjectPage_For_ProjectSearchIds_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.services.Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service.IsAssistantProjectOwnerAllowed;
import org.yeastrc.limelight.limelight_webapp.services.Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service.IsProjectOwnerAllowed;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.SearchDetails_ProjectPage_PerProjectSearchId_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Get Search Details additions for Project Page
 * 
 */
@RestController
public class Get_SearchDetails_ProjectPage_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( Get_SearchDetails_ProjectPage_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private Get_SearchDetails_ProjectPage_For_ProjectSearchIds_ServiceIF get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service;
	
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
					+ AA_RestWSControllerPaths_Constants.GET_SEARCH_DETAILS_PROJECT_PAGE_REST_WEBSERVICE_CONTROLLER
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
    		
    		if ( webserviceRequest.getProjectSearchIds() == null || webserviceRequest.getProjectSearchIds().isEmpty() ) {
    			log.warn( "ProjectSearchIds is null or empty." );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		////////////////

    		//  AUTH - validate access

    		//  throws an exception if access is not valid that is turned into a webservice response by Spring

    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
    				.validatePublicAccessCodeReadAllowed( webserviceRequest.getProjectSearchIds(), httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getWebSessionAuthAccessLevel();
			
    		////////////////

    		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getUserSession();

    		Integer userId = null;
    		
    		if ( userSession != null ) {
    			userId = userSession.getUserId();
    		}
    		
    		IsProjectOwnerAllowed isProjectOwnerAllowed = IsProjectOwnerAllowed.NO;
    		IsAssistantProjectOwnerAllowed isAssistantProjectOwnerAllowed = IsAssistantProjectOwnerAllowed.NO;

			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				
				isProjectOwnerAllowed = IsProjectOwnerAllowed.YES;
			}

			if ( webSessionAuthAccessLevel.isAssistantProjectOwnerAllowed() ) {
				
				isAssistantProjectOwnerAllowed = IsAssistantProjectOwnerAllowed.YES;
			}


			SearchDetails_ProjectPage_PerProjectSearchId_Result result = 
    				get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service
    				.get_SearchDetails_ProjectPage_For_ProjectSearchIds( 
    						webserviceRequest.getProjectSearchIds(), isProjectOwnerAllowed, isAssistantProjectOwnerAllowed, userId );

			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				//  User is at least Project Owner so can add web links so always show the weblinks block, even if there are no web links
				result.setWeblinksShowBlockAlways( true );
			}

			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				//  User is at least Project Owner so can add web links show the Add Weblinks Link
				result.setWeblinksShowAddWeblinkLink( true );
			}
			
			if ( webSessionAuthAccessLevel.isAssistantProjectOwnerAllowed() ) {
				//  User is at least Researcher so can add comments so always show the comments block, even if there are no comments
				result.setCommentsShowBlockAlways( true );
			}
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    	    		
    		webserviceResult.setResult( result );

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

		public List<Integer> getProjectSearchIds() {
			return projectSearchIds;
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
    
    	SearchDetails_ProjectPage_PerProjectSearchId_Result result;

		public SearchDetails_ProjectPage_PerProjectSearchId_Result getResult() {
			return result;
		}

		public void setResult(SearchDetails_ProjectPage_PerProjectSearchId_Result result) {
			this.result = result;
		}

    }

}
