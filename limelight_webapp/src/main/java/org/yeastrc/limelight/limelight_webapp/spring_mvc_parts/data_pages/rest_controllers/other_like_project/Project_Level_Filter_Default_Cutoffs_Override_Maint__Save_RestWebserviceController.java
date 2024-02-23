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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService.ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectLevelDefaultFltrAnnCutoffs_DTO;
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
 * Save / Replace - Project Level Filter Default Cutoffs Override
 *
 */
@RestController
public class Project_Level_Filter_Default_Cutoffs_Override_Maint__Save_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_Level_Filter_Default_Cutoffs_Override_Maint__Save_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService_IF projectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_Level_Filter_Default_Cutoffs_Override_Maint__Save_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_LEVEL_FILTER_DEFAULT_CUTOFFS_OVERRIDE_MAINT__SAVE__REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  projectView(

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

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

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

    		WebserviceRequest_CutoffValues cutoffValues = webserviceRequest.cutoffValues;

    		if ( cutoffValues == null ) {
    			String msg = ": cutoffValues not provided";
    			log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validateProjectOwnerAllowed( projectIds, httpServletRequest );

			UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();

			if ( userSession == null ) {
				String msg = "( userSession == null )";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}

			Integer userId = userSession.getUserId();
			if ( userId == null ) {
				String msg = "( userId == null )";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}

			int arrayLengthsTotal = 0;
			
			if ( cutoffValues.reportedPeptideEntriesList != null ) {
				arrayLengthsTotal += cutoffValues.reportedPeptideEntriesList.size();
			}
			if ( cutoffValues.psmEntriesList != null ) {
				arrayLengthsTotal += cutoffValues.psmEntriesList.size();
			}
			
			List<ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry> entriesToSave = new ArrayList<>( arrayLengthsTotal );

			if ( cutoffValues.reportedPeptideEntriesList != null ) {
				for ( WebserviceRequestEntry webserviceRequestEntry : cutoffValues.reportedPeptideEntriesList ) {
					ProjectLevelDefaultFltrAnnCutoffs_DTO projectLevelDefaultFltrAnnCutoffs_DTO = new ProjectLevelDefaultFltrAnnCutoffs_DTO();
					ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO = new ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO();
					projectLevelDefaultFltrAnnCutoffs_DTO.setProjectId( projectId );
					projectLevelDefaultFltrAnnCutoffs_DTO.setPsmPeptideMatchedProteinAnnotationType( PsmPeptideMatchedProteinAnnotationType.PEPTIDE );
					projectLevelDefaultFltrAnnCutoffs_DTO.setSearchProgramName( webserviceRequestEntry.searchProgramName );
					projectLevelDefaultFltrAnnCutoffs_DTO.setAnnotationTypeName( webserviceRequestEntry.annotationTypeName );
					projectLevelDefaultFltrAnnCutoffs_DTO.setAnnotationCutoffValue( webserviceRequestEntry.annotationCutoffValue );
					projectLevelDefaultFltrAnnCutoffs_DTO.setCreatedUserId( userId );
					projectLevelDefaultFltrAnnCutoffs_DTO.setLastUpdatedUserId( userId );
					projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO.setAnnotationCutoffValueString( webserviceRequestEntry.annotationCutoffValueString );
					
					ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry entry = new ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry();
					entry.projectLevelDefaultFltrAnnCutoffs_DTO = projectLevelDefaultFltrAnnCutoffs_DTO;
					entry.projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO = projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO;
					entriesToSave.add( entry );
				}
			}

			if ( cutoffValues.psmEntriesList != null ) {
				for ( WebserviceRequestEntry webserviceRequestEntry : cutoffValues.psmEntriesList ) {
					ProjectLevelDefaultFltrAnnCutoffs_DTO projectLevelDefaultFltrAnnCutoffs_DTO = new ProjectLevelDefaultFltrAnnCutoffs_DTO();
					ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO = new ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO();
					projectLevelDefaultFltrAnnCutoffs_DTO.setProjectId( projectId );
					projectLevelDefaultFltrAnnCutoffs_DTO.setPsmPeptideMatchedProteinAnnotationType( PsmPeptideMatchedProteinAnnotationType.PSM );
					projectLevelDefaultFltrAnnCutoffs_DTO.setSearchProgramName( webserviceRequestEntry.searchProgramName );
					projectLevelDefaultFltrAnnCutoffs_DTO.setAnnotationTypeName( webserviceRequestEntry.annotationTypeName );
					projectLevelDefaultFltrAnnCutoffs_DTO.setAnnotationCutoffValue( webserviceRequestEntry.annotationCutoffValue );
					projectLevelDefaultFltrAnnCutoffs_DTO.setCreatedUserId( userId );
					projectLevelDefaultFltrAnnCutoffs_DTO.setLastUpdatedUserId( userId );
					projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO.setAnnotationCutoffValueString( webserviceRequestEntry.annotationCutoffValueString );
					
					ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry entry = new ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry();
					entry.projectLevelDefaultFltrAnnCutoffs_DTO = projectLevelDefaultFltrAnnCutoffs_DTO;
					entry.projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO = projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO;
					entriesToSave.add( entry );
				}
			}

			if ( cutoffValues.proteinEntriesList != null ) {
				for ( WebserviceRequestEntry webserviceRequestEntry : cutoffValues.proteinEntriesList ) {
					ProjectLevelDefaultFltrAnnCutoffs_DTO projectLevelDefaultFltrAnnCutoffs_DTO = new ProjectLevelDefaultFltrAnnCutoffs_DTO();
					ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO = new ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO();
					projectLevelDefaultFltrAnnCutoffs_DTO.setProjectId( projectId );
					projectLevelDefaultFltrAnnCutoffs_DTO.setPsmPeptideMatchedProteinAnnotationType( PsmPeptideMatchedProteinAnnotationType.MATCHED_PROTEIN );
					projectLevelDefaultFltrAnnCutoffs_DTO.setSearchProgramName( webserviceRequestEntry.searchProgramName );
					projectLevelDefaultFltrAnnCutoffs_DTO.setAnnotationTypeName( webserviceRequestEntry.annotationTypeName );
					projectLevelDefaultFltrAnnCutoffs_DTO.setAnnotationCutoffValue( webserviceRequestEntry.annotationCutoffValue );
					projectLevelDefaultFltrAnnCutoffs_DTO.setCreatedUserId( userId );
					projectLevelDefaultFltrAnnCutoffs_DTO.setLastUpdatedUserId( userId );
					projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO.setAnnotationCutoffValueString( webserviceRequestEntry.annotationCutoffValueString );
					
					ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry entry = new ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry();
					entry.projectLevelDefaultFltrAnnCutoffs_DTO = projectLevelDefaultFltrAnnCutoffs_DTO;
					entry.projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO = projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO;
					entriesToSave.add( entry );
				}
			}
			
			projectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService.saveUpdate( projectId, entriesToSave );

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
    

	/**
	 * Input to function webserviceMethod(..)
	 */
	public static class WebserviceRequest {
		
		private String projectIdentifier;
		private WebserviceRequest_CutoffValues cutoffValues;

		public void setCutoffValues(WebserviceRequest_CutoffValues cutoffValues) {
			this.cutoffValues = cutoffValues;
		}

		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
	}

	/**
	 * cutoffValues in WebserviceRequest
	 *
	 */
	public static class WebserviceRequest_CutoffValues {

		private List<WebserviceRequestEntry> reportedPeptideEntriesList;
		private List<WebserviceRequestEntry> psmEntriesList;
		private List<WebserviceRequestEntry> proteinEntriesList;
		
		public void setReportedPeptideEntriesList(List<WebserviceRequestEntry> reportedPeptideEntriesList) {
			this.reportedPeptideEntriesList = reportedPeptideEntriesList;
		}
		public void setPsmEntriesList(List<WebserviceRequestEntry> psmEntriesList) {
			this.psmEntriesList = psmEntriesList;
		}
		public void setProteinEntriesList(List<WebserviceRequestEntry> proteinEntriesList) {
			this.proteinEntriesList = proteinEntriesList;
		}
	}

	/**
	 * Entry in WebserviceRequest_CutoffValues
	 *
	 */
	public static class WebserviceRequestEntry {
		
		private String searchProgramName;
		private String annotationTypeName;
		private double annotationCutoffValue;
		private String annotationCutoffValueString;
		
		public void setSearchProgramName(String searchProgramName) {
			this.searchProgramName = searchProgramName;
		}
		public void setAnnotationTypeName(String annotationTypeName) {
			this.annotationTypeName = annotationTypeName;
		}
		public void setAnnotationCutoffValue(double annotationCutoffValue) {
			this.annotationCutoffValue = annotationCutoffValue;
		}
		public void setAnnotationCutoffValueString(String annotationCutoffValueString) {
			this.annotationCutoffValueString = annotationCutoffValueString;
		}
		
	}
	
	/**
	 * result from Webservice
	 *
	 */
	public static class WebserviceResult {
		
		private boolean status;

		public boolean isStatus() {
			return status;
		}
	}
	

}


