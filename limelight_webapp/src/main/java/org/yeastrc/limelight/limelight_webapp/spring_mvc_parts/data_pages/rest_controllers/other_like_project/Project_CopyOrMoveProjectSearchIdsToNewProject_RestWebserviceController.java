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
import java.util.Set;

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
import org.yeastrc.limelight.limelight_webapp.dao.ExperimentDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.CopyProjectSearchIdToNewProjectUsingDBTransactionService;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.CopyProjectSearchIdToNewProjectUsingDBTransactionServiceIF;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.MoveProjectSearchIdToNewProjectUsingDBTransactionServiceIF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.experiment.searchers.Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchMinimalForProjectSearchIdSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * For Copy/Move of Searches
 *
 */
@RestController
public class Project_CopyOrMoveProjectSearchIdsToNewProject_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_CopyOrMoveProjectSearchIdsToNewProject_RestWebserviceController.class );

	private enum DoCopyOrDoMove { COPY, MOVE }
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private SearchMinimalForProjectSearchIdSearcher_IF searchMinimalForProjectSearchIdSearcher;
	
	@Autowired
	private CopyProjectSearchIdToNewProjectUsingDBTransactionServiceIF copyProjectSearchIdToNewProjectUsingDBTransactionService;
	
	@Autowired
	private MoveProjectSearchIdToNewProjectUsingDBTransactionServiceIF moveProjectSearchIdToNewProjectUsingDBTransactionService;

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
	public Project_CopyOrMoveProjectSearchIdsToNewProject_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.COPY_OR_MOVE_PROJECT_SEARCH_IDS_TO_NEW_PROJECT_REST_WEBSERVICE_CONTROLLER
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
    		WebserviceResult webserviceResult = new WebserviceResult();

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
    		
    		
    		
    		if ( webserviceRequest.moveToOtherProject != null && webserviceRequest.moveToOtherProject.booleanValue() ) {
    			
    			log.error( "moveToOtherProject is true which is NO LONGER allowed" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );
    		
    		String projectIdentifier = webserviceRequest.getProjectIdentifier();
        	Integer copyOrMoveToProjectId = webserviceRequest.getCopyOrMoveToProjectId();
    		List<Integer> projectSearchIdsSelected = webserviceRequest.getProjectSearchIdsSelected();
        	Set<Integer> experimentIds_Containing_ProjectSearchIds = webserviceRequest.experimentIds_Containing_ProjectSearchIds; // Optional
        	Boolean copyToOtherProject = webserviceRequest.getCopyToOtherProject();
        	Boolean moveToOtherProject = webserviceRequest.getMoveToOtherProject();
        	
    		if ( StringUtils.isEmpty( projectIdentifier ) ) {
    			log.warn( "projectIdentifier is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( webserviceRequest.copyAnyAssociatedTags == null ) {
    			log.warn( "webserviceRequest.copyAnyAssociatedTags is null" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( copyOrMoveToProjectId == null ) {
    			log.warn( "copyOrMoveToProjectId not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( projectSearchIdsSelected == null || projectSearchIdsSelected.isEmpty() ) {
    			log.warn( "projectSearchIdsSelected is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( copyToOtherProject == null && moveToOtherProject == null ) {
    			log.warn( "copyToOtherProject and moveToOtherProject are both not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( copyToOtherProject == null ) {
    			copyToOtherProject = false;
    		}
    		if (moveToOtherProject == null ) {
    			moveToOtherProject = false;
    		}
    		if ( ( ! copyToOtherProject ) && ( ! moveToOtherProject ) ) {
    			log.warn( "copyToOtherProject and moveToOtherProject are both not assigned or false" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( copyToOtherProject && moveToOtherProject ) {
    			log.warn( "copyToOtherProject and moveToOtherProject are both true" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		DoCopyOrDoMove doCopyOrDoMove = null;
    		
    		if ( copyToOtherProject ) {
    			doCopyOrDoMove = DoCopyOrDoMove.COPY;
    		} else if ( moveToOtherProject ) {
    			doCopyOrDoMove = DoCopyOrDoMove.MOVE;
    		} else {
    			log.warn( "copyToOtherProject and moveToOtherProject are both not assigned or false" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		int projectId = 0;

    		try {
    			projectId = Integer.parseInt( projectIdentifier );

    		} catch ( RuntimeException e ) {
    			log.warn( "Project Identifier not parsable to int: " + projectIdentifier );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

			//  Validate access to Current Project Id

    		List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validateProjectOwnerAllowed( projectIds, httpServletRequest );

			//  Validate access to Copy/Move To Project Id

			List<Integer> projectIds_CopyOrMoveTo = new ArrayList<>( 1 );
			projectIds_CopyOrMoveTo.add( copyOrMoveToProjectId );
			
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_NewProjectId =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validateProjectOwnerAllowed( projectIds_CopyOrMoveTo, httpServletRequest );

			////////   Auth complete
			//////////////////////////////////////////
			
			UserSession userSession =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
			
			if ( userSession == null ) {
				String msg = "userSession == null";
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			Integer userId = userSession.getUserId();
			if ( userId == null ) {
				String msg = "userId == null";
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			
			

			for( int projectSearchId : projectSearchIdsSelected ) {
				SearchItemMinimal searchItemMinimal =
						searchMinimalForProjectSearchIdSearcher.getSearchListForProjectSearchId( projectSearchId );

				if ( searchItemMinimal == null ) {
					String msg = "Search not found in DB for projectSearchId: " + projectSearchId;
					log.warn( msg );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				if ( projectId != searchItemMinimal.getProjectId() && copyOrMoveToProjectId != searchItemMinimal.getProjectId() ) {
					//  Invalid request, searches not in from or to project
					String msg = "search is not in project, projectSearchId: " + searchItemMinimal.getProjectSearchId() 
						+ ", search_id: " + searchItemMinimal.getSearchId();
					log.warn( msg );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
			}
			ProjectDTO projectDTO = projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
			if ( projectDTO == null ) {
				log.warn( "projectId is not in database: " + projectId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			ProjectDTO projectDTOcopyOrMoveToProjectId = 
					projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( copyOrMoveToProjectId );
			if ( projectDTOcopyOrMoveToProjectId == null ) {
				log.warn( "copyToProjectId is not in database: " + copyOrMoveToProjectId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			boolean experimentsWhereDeleted = false;
			
			if ( projectDTOcopyOrMoveToProjectId.isMarkedForDeletion() ) {
				webserviceResult.setCopyToProjectMarkedForDeletion(true);
				webserviceResult.setStatus(false);
			} else if ( ! projectDTOcopyOrMoveToProjectId.isEnabled() ) {
				webserviceResult.setCopyToProjectDisabled(true);
				webserviceResult.setStatus(false);
			} else {
				if ( doCopyOrDoMove == DoCopyOrDoMove.COPY ) {
					
					final int counterMAX = 3;
					
					int counter = 1;
					
					while (true) {  // exit loop with 'break'
						
						CopyProjectSearchIdToNewProjectUsingDBTransactionService.Log_DuplicateKeyException log_DuplicateKeyException = 
								CopyProjectSearchIdToNewProjectUsingDBTransactionService.Log_DuplicateKeyException.NO;
						
						if ( counter >= counterMAX ) {
							//  Final attempt
							
							log_DuplicateKeyException = CopyProjectSearchIdToNewProjectUsingDBTransactionService.Log_DuplicateKeyException.YES;
						}
					
						try {
							//  Copy Project Search and associated records to new Project
							copyProjectSearchIdToNewProjectUsingDBTransactionService
							.copyProjectSearchIdsToNewProjectId( 
									projectSearchIdsSelected, copyOrMoveToProjectId, webserviceRequest.copyAnyAssociatedTags, userId, 
									log_DuplicateKeyException );
							
							
							break; // EXIT LOOP since NO exception !!!!
							
							
						} catch ( org.springframework.dao.DuplicateKeyException duplicateKeyException ) {
							
							if ( counter >= counterMAX ) {
								
								//  Exceeded max tries so throw exception
								
								throw duplicateKeyException;
							}
							
							//  Duplicate key so try again by eating exception
						}
						
						int randomSleep = (int) ( ( Math.random() * 1000 ) + 500 ); // random between 500 and 1500
						
						Thread.sleep( randomSleep );
						
						counter++;
					}
					
				} else if ( doCopyOrDoMove == DoCopyOrDoMove.MOVE ) {
					
					
					throw new IllegalArgumentException( "NOT SUPPORTED:  ( doCopyOrDoMove == DoCopyOrDoMove.MOVE )");
					
					//  Move Project Search and associated records to new Project
					
					//  "MOVE" is NO LONGER supported.  Leaving code here as template for bulk delete
					
//					moveProjectSearchIdToNewProjectUsingDBTransactionService
//					.moveProjectSearchIdsToNewProjectId( projectSearchIdsSelected, copyOrMoveToProjectId, experimentIds_Containing_ProjectSearchIds );
//					
//					if ( experimentIds_Containing_ProjectSearchIds != null && ( ! experimentIds_Containing_ProjectSearchIds.isEmpty() ) ) {
//						experimentsWhereDeleted = true;
//					}
//
//					if ( projectSearchIdsSelected != null && ( ! projectSearchIdsSelected.isEmpty() ) ) {
//						
//						// Next Delete all Experiment IDs containing Project Search Ids That were NOT deleted in call to .moveProjectSearchIdsToNewProjectId(...)
//						
//						Set<Integer> projectSearchIdsSelected_Set = new HashSet<>( projectSearchIdsSelected );
//
//						List<Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result> dbResultList = 
//								experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher.getExperiments_ProjectSearchIds_List_ForProjectSearchIds(projectSearchIdsSelected_Set);
//
//						if ( dbResultList != null && ( ! dbResultList.isEmpty() ) ) {
//							experimentsWhereDeleted = true;
//						}
//
//						if ( ! dbResultList.isEmpty() ) {
//
//							try {
//
//			    				for ( Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result dbResult : dbResultList ) {
//
//			    					experimentDAO.delete( dbResult.getExperimentId() );
//			    				}
//							} catch( Exception e ) {
//								log.error( "Failed to delete Experiment Ids for ProjectSearchId that remained after main deletion", e );
//								
//								//  Eat/Swallow Exception
//							}
//						}
//					}
					
				} else {
					//  Only way to get here is a coding error above
					String msg = "Unknown Value for doCopyOrDoMove: " + doCopyOrDoMove;
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				webserviceResult.setStatus(true);
				webserviceResult.experimentsWhereDeleted = experimentsWhereDeleted;
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
    

    public static class WebserviceRequest {

    	private String projectIdentifier;
    	private Integer copyOrMoveToProjectId;
    	private List<Integer> projectSearchIdsSelected;
    	private Set<Integer> experimentIds_Containing_ProjectSearchIds; // Optional
    	private Boolean copyAnyAssociatedTags;
    	private Boolean copyToOtherProject;
    	private Boolean moveToOtherProject;
    	
		public String getProjectIdentifier() {
			return projectIdentifier;
		}
		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
		public Integer getCopyOrMoveToProjectId() {
			return copyOrMoveToProjectId;
		}
		public void setCopyOrMoveToProjectId(Integer copyOrMoveToProjectId) {
			this.copyOrMoveToProjectId = copyOrMoveToProjectId;
		}
		public List<Integer> getProjectSearchIdsSelected() {
			return projectSearchIdsSelected;
		}
		public void setProjectSearchIdsSelected(List<Integer> projectSearchIdsSelected) {
			this.projectSearchIdsSelected = projectSearchIdsSelected;
		}
		public Boolean getCopyToOtherProject() {
			return copyToOtherProject;
		}
		public void setCopyToOtherProject(Boolean copyToOtherProject) {
			this.copyToOtherProject = copyToOtherProject;
		}
		public Boolean getMoveToOtherProject() {
			return moveToOtherProject;
		}
		public void setMoveToOtherProject(Boolean moveToOtherProject) {
			this.moveToOtherProject = moveToOtherProject;
		}
		public void setExperimentIds_Containing_ProjectSearchIds(Set<Integer> experimentIds_Containing_ProjectSearchIds) {
			this.experimentIds_Containing_ProjectSearchIds = experimentIds_Containing_ProjectSearchIds;
		}
		public void setCopyAnyAssociatedTags(Boolean copyAnyAssociatedTags) {
			this.copyAnyAssociatedTags = copyAnyAssociatedTags;
		}
    }
    
    public static class WebserviceResult {

		private boolean status;
		private boolean experimentsWhereDeleted;
		private boolean copyToProjectMarkedForDeletion;
		private boolean copyToProjectDisabled;

		public boolean isStatus() {
			return status;
		}
		public void setStatus(boolean status) {
			this.status = status;
		}
		public boolean isCopyToProjectMarkedForDeletion() {
			return copyToProjectMarkedForDeletion;
		}
		public void setCopyToProjectMarkedForDeletion(boolean copyToProjectMarkedForDeletion) {
			this.copyToProjectMarkedForDeletion = copyToProjectMarkedForDeletion;
		}
		public boolean isCopyToProjectDisabled() {
			return copyToProjectDisabled;
		}
		public void setCopyToProjectDisabled(boolean copyToProjectDisabled) {
			this.copyToProjectDisabled = copyToProjectDisabled;
		}
		public boolean isExperimentsWhereDeleted() {
			return experimentsWhereDeleted;
		}
    }


}


