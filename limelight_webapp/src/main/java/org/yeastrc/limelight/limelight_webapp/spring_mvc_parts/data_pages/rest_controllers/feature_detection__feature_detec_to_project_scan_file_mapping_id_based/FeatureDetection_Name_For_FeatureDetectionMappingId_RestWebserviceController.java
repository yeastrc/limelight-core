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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.feature_detection__feature_detec_to_project_scan_file_mapping_id_based;


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
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionRoot_ProjectScanFile_Mapping_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.FeatureDetectionRoot_ProjectScanFile_Mapping_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Feature Detection Name for feature_detection_root__project_scnfl_mapping_tbl__id
 * 
 */
@RestController
public class FeatureDetection_Name_For_FeatureDetectionMappingId_RestWebserviceController {
  
  
	private static final Logger log = LoggerFactory.getLogger( FeatureDetection_Name_For_FeatureDetectionMappingId_RestWebserviceController.class );

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.FEATURE_DETECTION__NAME_FROM_FEATURE_DETECTION_ROOT__PROJECT_SCNFL_MAPPING_TBL__ID;
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private FeatureDetectionRoot_ProjectScanFile_Mapping_DAO_IF featureDetectionRoot_ProjectScanFile_Mapping_DAO;
	
	@Autowired
	private ProjectScanFile_For_ProjectScanFileId_Searcher_IF projectScanFile_For_ProjectScanFileId_Searcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public FeatureDetection_Name_For_FeatureDetectionMappingId_RestWebserviceController() {
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
					+ CONTROLLER_PATH
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

    		if ( webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id == null ) {
    			log.warn( "feature_detection_root__project_scnfl_mapping_tbl__id is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}


    		FeatureDetectionRoot_ProjectScanFile_Mapping_DTO featureDetectionRoot_ProjectScanFile_Mapping_DTO =
					featureDetectionRoot_ProjectScanFile_Mapping_DAO.getForId(webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id);
			
			if ( featureDetectionRoot_ProjectScanFile_Mapping_DTO == null ) {
				String msg = "feature_detection_root__project_scnfl_mapping_tbl_Id not in DB: " + webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id;
				log.warn(msg);
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			int project_scan_file_id = featureDetectionRoot_ProjectScanFile_Mapping_DTO.getProjectScanFileId();

			Project_ScanFile_DTO project_ScanFile_DTO =
					projectScanFile_For_ProjectScanFileId_Searcher.get_For_ProjectScanFileId_Searcher(project_scan_file_id);

			if ( project_ScanFile_DTO == null ) {
				String msg = "projectScanFileId not in DB: " + project_scan_file_id;
				log.warn(msg);
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			int projectId = project_ScanFile_DTO.getProjectId();

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
			
    		
			//  End Authorization
			
			/////////////

    	
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.projectScanFileId = project_ScanFile_DTO.getId();
    		webserviceResult.displayLabel = featureDetectionRoot_ProjectScanFile_Mapping_DTO.getDisplayLabel();
    		webserviceResult.description = featureDetectionRoot_ProjectScanFile_Mapping_DTO.getDescription();

    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );
			
    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON_UTF8).body( responseAsJSON );
    		
    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }
    
    ////////////////////////////////

    public static class WebserviceRequest {
    	
    	private Integer feature_detection_root__project_scnfl_mapping_tbl__id;

		public void setFeature_detection_root__project_scnfl_mapping_tbl__id(
				Integer feature_detection_root__project_scnfl_mapping_tbl__id) {
			this.feature_detection_root__project_scnfl_mapping_tbl__id = feature_detection_root__project_scnfl_mapping_tbl__id;
		}
    }
    
    public static class WebserviceResult {

    	private int projectScanFileId;
    	private String displayLabel;
    	private String description;
    	
		public int getProjectScanFileId() {
			return projectScanFileId;
		}
		public String getDisplayLabel() {
			return displayLabel;
		}
		public String getDescription() {
			return description;
		}
    }
}