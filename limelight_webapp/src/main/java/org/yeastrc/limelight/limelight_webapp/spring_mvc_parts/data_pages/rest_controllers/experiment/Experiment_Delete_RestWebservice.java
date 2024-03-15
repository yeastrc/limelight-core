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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.experiment;

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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ExperimentDAO_IF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
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
 * Delete Experiment
 * 
 */
@RestController
public class Experiment_Delete_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( Experiment_Delete_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private ExperimentDAO_IF experimentDAO;
	
//	@Autowired
//	private SearchDataLookupParams_MainProcessingIF searchDataLookupParams_MainProcessing;
//	
//	@Autowired
//	private SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF searchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds;
	
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
					+ AA_RestWSControllerPaths_Constants.DELETE_EXPERIMENT_REST_WEBSERVICE_CONTROLLER
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
    		
    		String remoteIP = httpServletRequest.getRemoteAddr();

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		Integer experimentId = webserviceRequest.id;
    		
    		if ( experimentId == null ) {
    			log.warn( "id is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		Integer projectId = experimentDAO.getProjectIdForId( experimentId );
    		
    		if ( projectId == null ) {
    			log.warn( "id not in database: " + experimentId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		List<Integer> projectIds = new ArrayList<>( 1 );
    		projectIds.add( projectId );
    		
    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
    				validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
    				.validateAssistantProjectOwnerAllowed( projectIds, httpServletRequest ); // ( webserviceRequest.getProjectSearchIds_CreateDefault(), httpServletRequest );

    		////////////////
   		
    		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();

    		WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
    				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getWebSessionAuthAccessLevel();
    		
    		if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {

    		} else if ( webSessionAuthAccessLevel.isAssistantProjectOwnerAllowed() ) {
    			
        		//  If Researcher, can only delete experiments this user has created
				
    			if ( userSession.getUserId() == null ) {
    				throw new LimelightInternalErrorException( "Should not occur here: userSession.getUserId() == null" );
    			}
				int userId_InSession = userSession.getUserId();

				Integer userId_Experiment = experimentDAO.getCreatedByUserIdForId( experimentId );

	    		if ( userId_Experiment == null ) {
	    			log.warn( "id not in database: " + experimentId );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
	    		}
	    		
	    		if ( userId_InSession != userId_Experiment.intValue() ) {
	    			log.warn( "User is researcher (assistant project owner) and this experiment is not this user's to delete: " 
	    					+ experimentId
	    					+ ", userId_InSession: " + userId_InSession );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
	    		}

	    		//  Remove requirement that experiment be draft experiment
	    		
//	    		Boolean isDraft = experimentDAO.getIsDraftForId( experimentId );
//
//	    		if ( isDraft == null ) {
//	    			log.warn( "id not in database: " + experimentId );
//	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//	    		}
//	    		
//	    		if ( ! isDraft.booleanValue() ) {
//	    			log.warn( "User is researcher (assistant project owner) and this experiment is not a draft experiment. Experiment to delete: " 
//	    					+ experimentId
//	    					+ ", userId_InSession: " + userId_InSession );
//	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//	    		}

			}
    		
    		experimentDAO.delete( experimentId );
    		
        		
    		WebserviceResult webserviceResult = new WebserviceResult();
    	    		
    		webserviceResult.status = true;

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

    	private Integer id; // experiment id

		public void setId(Integer id) {
			this.id = id;
		}
    	

    }
    
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	private boolean status;

		public boolean isStatus() {
			return status;
		}
    }
    
}
