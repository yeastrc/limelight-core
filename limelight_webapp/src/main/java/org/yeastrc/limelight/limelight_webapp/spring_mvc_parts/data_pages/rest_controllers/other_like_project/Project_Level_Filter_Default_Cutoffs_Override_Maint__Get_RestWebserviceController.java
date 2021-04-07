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
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher.ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Get - Project Level Filter Default Cutoffs Override
 *
 */
@RestController
public class Project_Level_Filter_Default_Cutoffs_Override_Maint__Get_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_Level_Filter_Default_Cutoffs_Override_Maint__Get_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher_IF projectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_Level_Filter_Default_Cutoffs_Override_Maint__Get_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_LEVEL_FILTER_DEFAULT_CUTOFFS_OVERRIDE_MAINT__GET__REST_WEBSERVICE_CONTROLLER
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

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
//			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
			validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
			.validatePublicAccessCodeReadAllowed( projectIds, httpServletRequest );

			List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem> dbList =
					projectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher.getAllForProjectId( projectId );
			

			List<WebserviceResultEntry> reportedPeptideEntriesList = new ArrayList<>( dbList.size() );
			List<WebserviceResultEntry> psmEntriesList = new ArrayList<>( dbList.size() );

			for ( ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem resultItem : dbList ) {
				
				WebserviceResultEntry webserviceResultEntry = new WebserviceResultEntry();
//				webserviceResultEntry.id = resultItem.getId();
				webserviceResultEntry.searchProgramName = resultItem.getSearchProgramName();
				webserviceResultEntry.annotationTypeName = resultItem.getAnnotationTypeName();
				webserviceResultEntry.annotationCutoffValue = resultItem.getAnnotationCutoffValue();
				webserviceResultEntry.annotationCutoffValueString = resultItem.getAnnotationCutoffValueString();

				if ( resultItem.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PEPTIDE ) {
					
					reportedPeptideEntriesList.add( webserviceResultEntry );
					
				} else if ( resultItem.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PSM ) {
					
					psmEntriesList.add( webserviceResultEntry );
					
				} else {
					String msg = "Unknown value for resultItem.getPsmPeptideAnnotationType(): " + resultItem.getPsmPeptideMatchedProteinAnnotationType();
					log.error( msg );
					throw new LimelightInternalErrorException( msg );
				}
			}
			
			WebserviceResult_CutoffValues cutoffValues = new WebserviceResult_CutoffValues();
			cutoffValues.reportedPeptideEntriesList = reportedPeptideEntriesList;
			cutoffValues.psmEntriesList = psmEntriesList;
						
    		WebserviceResult webserviceResult = new WebserviceResult();
			webserviceResult.status = true;
			webserviceResult.cutoffValues = cutoffValues;
    		
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

		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
	}

	/**
	 * result from Webservice
	 *
	 */
	public static class WebserviceResult {
		
		private boolean status;
		private WebserviceResult_CutoffValues cutoffValues;

		public boolean isStatus() {
			return status;
		}
		public WebserviceResult_CutoffValues getCutoffValues() {
			return cutoffValues;
		}
	}
	

	/**
	 * cutoffValues in WebserviceResult
	 *
	 */
	public static class WebserviceResult_CutoffValues {

		private List<WebserviceResultEntry> reportedPeptideEntriesList;
		private List<WebserviceResultEntry> psmEntriesList;
		
		public List<WebserviceResultEntry> getReportedPeptideEntriesList() {
			return reportedPeptideEntriesList;
		}
		public List<WebserviceResultEntry> getPsmEntriesList() {
			return psmEntriesList;
		}
		
	}

	/**
	 * Entry in WebserviceResult_CutoffValues
	 *
	 */
	public static class WebserviceResultEntry {
		
		private String searchProgramName;
		private String annotationTypeName;
		private double annotationCutoffValue;
		private String annotationCutoffValueString;
		
		public String getSearchProgramName() {
			return searchProgramName;
		}
		public String getAnnotationTypeName() {
			return annotationTypeName;
		}
		public double getAnnotationCutoffValue() {
			return annotationCutoffValue;
		}
		public String getAnnotationCutoffValueString() {
			return annotationCutoffValueString;
		}
		
		
	}
	
}


