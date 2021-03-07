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
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.enum_classes.Experiment_CreatedByUserType;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ExperimentDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.experiment.main.Experiment_AddSave_MainProcessingIF;
import org.yeastrc.limelight.limelight_webapp.experiment.main_objects.Experiment_A_Root;
import org.yeastrc.limelight.limelight_webapp.experiment.params.ExperimentParams_CreatedByInfo;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Add/Save Experiment
 * 
 */
@RestController
public class AddSaveExperiment_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( AddSaveExperiment_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private ExperimentDAO_IF experimentDAO;
	
	@Autowired
	private Experiment_AddSave_MainProcessingIF experiment_AddSave_MainProcessing;
	
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
					+ AA_RestWSControllerPaths_Constants.ADD_SAVE_EXPERIMENT_REST_WEBSERVICE_CONTROLLER
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
    		
//    		String remoteIP = httpServletRequest.getRemoteAddr();

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		String projectIdentifier = webserviceRequest.projectIdentifier;
    		
    		if ( StringUtils.isEmpty( projectIdentifier ) ) {
    			log.warn( "projectIdentifier is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		Experiment_A_Root experimentRoot = webserviceRequest.experimentRoot;
    		if ( experimentRoot == null ) {
    			log.warn( "experimentRoot is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		if ( ( ! webserviceRequest.draft ) && ( webserviceRequest.searchDataLookupParamsRoot == null ) ) {
    			log.warn( "searchDataLookupParamsRoot is not assigned when not draft" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( ( ! webserviceRequest.draft ) && ( experimentRoot.getExperimentConditionData() == null ) ) {
    			log.warn( "experimentConditionData is not assigned when not draft" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( ( ! webserviceRequest.draft ) && ( experimentRoot.getExperimentConditionData().getMainResultDataArray() == null ) ) {
    			log.warn( "MainResultDataArray is not assigned when not draft" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( ( ! webserviceRequest.draft ) && ( experimentRoot.getExperimentConditionData().getMainResultDataArray().isEmpty() ) ) {
    			log.warn( "MainResultDataArray.isEmpty() when not draft" );
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
    				.validateAssistantProjectOwnerAllowed( projectIds, httpServletRequest ); // ( webserviceRequest.getProjectSearchIds_CreateDefault(), httpServletRequest );

    		////////////////
   		
    		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();

    		WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
    				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getWebSessionAuthAccessLevel();
    		
    		ExperimentParams_CreatedByInfo experimentParams_CreatedByInfo = new ExperimentParams_CreatedByInfo();
    		
    		experimentParams_CreatedByInfo.setCreatedByRemoteIP( httpServletRequest.getRemoteAddr() );

    		if ( userSession != null && userSession.getUserId() != null ) {
    		
    			experimentParams_CreatedByInfo.setCreatedByUserId( userSession.getUserId() );
    			experimentParams_CreatedByInfo.setCreatedByUserType(  
    					Experiment_CreatedByUserType.WEB_USER );
    		}
    		
    		if ( webserviceRequest.experimentId != null ) {
    			
    			Integer experimentId = webserviceRequest.experimentId;
    			
    			Integer projectId_From_experimentId = experimentDAO.getProjectIdForId( experimentId );
    			if ( projectId_From_experimentId == null ) {
    				log.warn( "experimentId not in database: " + webserviceRequest.experimentId );
    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			if ( projectId_From_experimentId.intValue() != projectId ) {
    				log.warn( "projectId for experimentId not same as projectId in request. experimentId: " 
    						+ experimentId 
    						+ ", projectId in request: "
    						+ projectId 
    						+ ", projectId for experimentId: "
    						+ projectId_From_experimentId );
    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			
    			// NOT DOING:  If the user requests to change an experiment, we will provide a way to copy the experiment 
    			
//    			Boolean isDraft = experimentDAO.getIsDraftForId( experimentId );
//    			if ( isDraft == null ) {
//    				log.warn( "experimentId not in database: " + webserviceRequest.experimentId );
//    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    			}
//    			if ( ! isDraft.booleanValue() ) {
//    				log.warn( "isDraft for experimentId is false.  Save Not allowed for Non-Draft Experiments. experimentId: " 
//    						+ experimentId  );
//    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    			}
    			
    			Integer createdByUserIdForId = experimentDAO.getCreatedByUserIdForId( experimentId );
    			if ( createdByUserIdForId == null ) {
    				log.warn( "experimentId not in database: " + experimentId );
    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			
    			//  If current user is Researcher (), they can only change their own DRAFT experiments.
    			

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
    	    			log.warn( "User is researcher (assistant project owner) and this experiment is not this user's to update: " 
    	    					+ experimentId
    	    					+ ", userId_InSession: " + userId_InSession );
    	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    	    		}

    	    		Boolean isDraft = experimentDAO.getIsDraftForId( experimentId );

    	    		if ( isDraft == null ) {
    	    			log.warn( "id not in database: " + experimentId );
    	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    	    		}
    	    		
    	    		if ( ! isDraft.booleanValue() ) {
    	    			log.warn( "User is researcher (assistant project owner) and this experiment is not a draft experiment. Experiment to update: " 
    	    					+ experimentId
    	    					+ ", userId_InSession: " + userId_InSession );
    	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    	    		}
    			}
        		
    		}
    		
    		ExperimentDTO experimentDTO = experiment_AddSave_MainProcessing.experiment_AddSave_MainProcessing( 
    				webserviceRequest.experimentId,
    				webserviceRequest.experimentName, 
    				webserviceRequest.draft, 
    				experimentRoot,
    				webserviceRequest.searchDataLookupParamsRoot, 
    				projectId, 
    				experimentParams_CreatedByInfo );
    		
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    	    		
    		webserviceResult.experimentId = experimentDTO.getId();

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

    	private Integer experimentId; // populated for existing experiment

    	private String experimentName;
    	
    	private Boolean draft;
    	
    	private Experiment_A_Root experimentRoot;
    	
    	private SearchDataLookupParamsRoot searchDataLookupParamsRoot;

		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
		public void setExperimentId(Integer experimentId) {
			this.experimentId = experimentId;
		}
		public void setExperimentRoot(Experiment_A_Root experimentRoot) {
			this.experimentRoot = experimentRoot;
		}
		public void setExperimentName(String experimentName) {
			this.experimentName = experimentName;
		}
		public void setDraft(Boolean draft) {
			this.draft = draft;
		}
		public void setSearchDataLookupParamsRoot(SearchDataLookupParamsRoot searchDataLookupParamsRoot) {
			this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
		}
   	
    }
    
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	private Integer experimentId;

		public Integer getExperimentId() {
			return experimentId;
		}
    }
    
}
