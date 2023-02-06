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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.FeatureDetectionRoot_ProjectScanFile_Mapping_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher.FeatureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Feature Detection - DisplayLabel - Description - Change 
 *
 */
@RestController
public class Feature_Detection_DisplayLabel_Description_Change_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Feature_Detection_DisplayLabel_Description_Change_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired 
	private FeatureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher_IF featureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher;

	@Autowired
	private FeatureDetectionRoot_ProjectScanFile_Mapping_DAO_IF featureDetectionRoot_ProjectScanFile_Mapping_DAO;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Feature_Detection_DisplayLabel_Description_Change_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.FEATURE_DETECTION_DISPLAY_LABEL_DESCRIPTION_CHANGE_REST_WEBSERVICE_CONTROLLER
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

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		if ( webserviceRequest.featureDetectionRoot_MappingTblId == null ) {
    			log.warn( "featureDetectionRoot_MappingTblId is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( StringUtils.isEmpty( webserviceRequest.displayLabel ) ) {
    			log.warn( "displayLabel is not assigned or is empty" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( StringUtils.isEmpty( webserviceRequest.description ) ) {
    			log.warn( "description is not assigned or is empty" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}


			//  Query is through project_scan_file_tbl table so ensured that scan file id is in project
			
    		FeatureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher_Result featureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher_Result =
					featureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher.getProjectIdFor_FeatureDetectionRoot_MappingTblId(webserviceRequest.featureDetectionRoot_MappingTblId);

			if ( featureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher_Result == null ) {
				log.warn( "No record found for webserviceRequest.featureDetectionRoot_MappingTblId " + webserviceRequest.featureDetectionRoot_MappingTblId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			int projectId = featureDetection_ProjectIdFor_FeatureDetectionRoot_MappingTblId_Searcher_Result.getProjectId();
	
			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
			GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
					getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();
			
			if ( ! webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				
				String msg = "( ! webSessionAuthAccessLevel.isProjectOwnerAllowed() )  Throw Limelight_WS_AuthError_Unauthorized_Exception";
				log.info( msg );
				throw new Limelight_WS_AuthError_Unauthorized_Exception();
			}

			UserSession userSession = getWebSessionAuthAccessLevelForProjectIds_Result.getUserSession();
			if ( userSession == null ) {
				throw new LimelightInternalErrorException( "userSession should not be null" );
			}
			Integer userId = userSession.getUserId();
			if ( userId == null ) {
				throw new LimelightInternalErrorException( "userId should not be null" );
			}

			//  End Authorization
			
			/////////////
						
			featureDetectionRoot_ProjectScanFile_Mapping_DAO.update_DisplayLabel_Description( webserviceRequest.displayLabel, webserviceRequest.description, webserviceRequest.featureDetectionRoot_MappingTblId, userId);

    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.successful = true;

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
    
    //////////////////////////////
    
    //  Webservice request response
    

    public static class WebserviceRequest {
    	
    	private Integer featureDetectionRoot_MappingTblId;
    	private String displayLabel;
    	private String description;

		public void setDisplayLabel(String displayLabel) {
			this.displayLabel = displayLabel;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public void setFeatureDetectionRoot_MappingTblId(Integer featureDetectionRoot_MappingTblId) {
			this.featureDetectionRoot_MappingTblId = featureDetectionRoot_MappingTblId;
		}
    }
    
    public static class WebserviceResult {

    	private boolean successful;

		public boolean isSuccessful() {
			return successful;
		}

    }
}


