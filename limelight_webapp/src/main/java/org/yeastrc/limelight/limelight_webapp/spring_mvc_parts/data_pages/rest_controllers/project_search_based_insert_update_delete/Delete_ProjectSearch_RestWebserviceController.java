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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.project_search_based_insert_update_delete;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import org.yeastrc.limelight.limelight_webapp.dao.ExperimentDAO_IF;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.DeleteProjectSearchId_UsingDBTransactionServiceIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.experiment.searchers.Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.experiment.searchers.Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher.Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Delete a project_search record as requested by user
 *
 */
@RestController
public class Delete_ProjectSearch_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Delete_ProjectSearch_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private DeleteProjectSearchId_UsingDBTransactionServiceIF deleteProjectSearchId_UsingDBTransactionService;
	
	@Autowired
	private Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_IF experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher;

	@Autowired
	private ExperimentDAO_IF experimentDAO;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Delete_ProjectSearch_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.DELETE_PROJECT_SEARCH_REST_WEBSERVICE_CONTROLLER
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
    		//		log.warn( "projectView(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		DeleteProjectSearchRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, DeleteProjectSearchRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		Integer projectSearchId = webserviceRequest.projectSearchId;
        	Set<Integer> experimentIds_Containing_ProjectSearchId = webserviceRequest.experimentIds_Containing_ProjectSearchId; // Optional

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
    		projectSearchIdsForValidate.add( projectSearchId );

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validateProjectOwnerAllowed( projectSearchIdsForValidate, httpServletRequest );

    		//  Auth Complete
    		
    		DeleteProjectSearchResult webserviceResult = new DeleteProjectSearchResult();
    		

    		// First validate all Experiment IDs containing Project Search Id are included in request
    		{
    			Set<Integer> projectSearchIds_GetExperiments = new HashSet<>();
    			projectSearchIds_GetExperiments.add( projectSearchId );

    			List<Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result> dbResultList = 
    					experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher.getExperiments_ProjectSearchIds_List_ForProjectSearchIds(projectSearchIds_GetExperiments);
    			
    			if ( dbResultList.isEmpty() && ( experimentIds_Containing_ProjectSearchId != null && ( ! experimentIds_Containing_ProjectSearchId.isEmpty() ) ) ) {
    				
    				webserviceResult.experimentIdsNotMatch = true;
    			}
    			if ( ( ! dbResultList.isEmpty() ) && ( experimentIds_Containing_ProjectSearchId == null || experimentIds_Containing_ProjectSearchId.isEmpty() ) ) {

    				webserviceResult.experimentIdsNotMatch = true;
    			}
    			if ( experimentIds_Containing_ProjectSearchId != null ) {
    			
    				Set<Integer> experimentIds_Containing_ProjectSearchId_CopyForRemovals = new HashSet<>( experimentIds_Containing_ProjectSearchId );
    				
    				for ( Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result dbResult : dbResultList ) {
    					if ( ! experimentIds_Containing_ProjectSearchId_CopyForRemovals.remove( dbResult.getExperimentId() ) ) {
    						webserviceResult.experimentIdsNotMatch = true;
    						break;
    					}
    				}
    				if ( ! webserviceResult.experimentIdsNotMatch ) {
    					if ( ! experimentIds_Containing_ProjectSearchId_CopyForRemovals.isEmpty() ) {
    						webserviceResult.experimentIdsNotMatch = true;
    					}
    				}
    			}
    		}
    		
    		if ( ! webserviceResult.experimentIdsNotMatch ) {
    		
    			deleteProjectSearchId_UsingDBTransactionService.deleteProjectSearchId( projectSearchId, experimentIds_Containing_ProjectSearchId );

    			webserviceResult.statusSuccess = true;


				{ // Next Delete all Experiment IDs containing Project Search Id That were NOT deleted in call to .deleteProjectSearchId(...)

					Set<Integer> projectSearchIds_GetExperiments = new HashSet<>();
					projectSearchIds_GetExperiments.add( projectSearchId );

					List<Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result> dbResultList = 
							experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher.getExperiments_ProjectSearchIds_List_ForProjectSearchIds(projectSearchIds_GetExperiments);

					if ( ! dbResultList.isEmpty() ) {

						try {

		    				for ( Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result dbResult : dbResultList ) {

		    					experimentDAO.delete( dbResult.getExperimentId() );
		    				}
						} catch( Exception e ) {
							log.error( "Failed to delete Experiment Ids for ProjectSearchId that remained after main deletion", e );
							
							//  Eat/Swallow Exception
						}
					}
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
    

    public static class DeleteProjectSearchRequest {
    	
    	private Integer projectSearchId;
    	private Set<Integer> experimentIds_Containing_ProjectSearchId; // Optional

		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setExperimentIds_Containing_ProjectSearchId(Set<Integer> experimentIds_Containing_ProjectSearchId) {
			this.experimentIds_Containing_ProjectSearchId = experimentIds_Containing_ProjectSearchId;
		}
    }
    
    public static class DeleteProjectSearchResult {
    	
    	boolean statusSuccess;
    	boolean experimentIdsNotMatch;

		public boolean isStatusSuccess() {
			return statusSuccess;
		}
		public boolean isExperimentIdsNotMatch() {
			return experimentIdsNotMatch;
		}
    }
    
}


