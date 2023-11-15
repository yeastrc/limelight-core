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
import org.yeastrc.limelight.limelight_webapp.searchers.Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchIdList_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher.Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Single Feature Detection Run Details
 * 
 * Return data for Feature Detection Run.
 * 
 */
@RestController
public class Project_FeatureDetection_Run_Single_Details_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_FeatureDetection_Run_Single_Details_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_IF feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher;
	
	@Autowired
	private ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher_IF projectScanFile_ProjectId_For_ProjectScanFileId_Searcher;
	
	@Autowired
	private ProjectSearchIdList_For_ProjectScanFileId_Searcher_IF projectSearchIdList_For_ProjectScanFileId_Searcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_FeatureDetection_Run_Single_Details_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.FEATURE_DETECTION_RUN_DETAILS_FOR_PROJECT_REST_WEBSERVICE_CONTROLLER
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
    			log.warn( "feature_detection_root__project_scnfl_mapping_tbl__id is not assigned in request" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
			Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result =
					feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher.
					feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id(webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id);
			
			if ( feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result == null ) {
				String msg = "feature_detection_root__project_scnfl_mapping_tbl_Id not in DB: " + webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id;
				log.warn(msg);
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			int project_scan_file_id = feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result.getProject_scan_file_id();

    		Integer projectId = projectScanFile_ProjectId_For_ProjectScanFileId_Searcher.get_ProjectId_For_ProjectScanFileId_Searcher(project_scan_file_id);

    		if ( projectId == null ) {
    			log.warn( "projectScanFileId is not found in db: " + project_scan_file_id );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
			GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
					getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();
			
			if ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() ) {
				
				String msg = "( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )  Throw Limelight_WS_AuthError_Unauthorized_Exception";
				log.info( msg );
				throw new Limelight_WS_AuthError_Unauthorized_Exception();
			}
			
			//  End Authorization
			
			/////////////
			
			
			//  Searches containing Scan File
			
			List<Integer> projectSearchIds_ForScanFile_List = projectSearchIdList_For_ProjectScanFileId_Searcher.getForProjectScanFileId_ProjectSearchIdList(project_scan_file_id);
			
			//  Result Object
			
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.projectSearchIds_ForScanFile_List = projectSearchIds_ForScanFile_List;

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
    
    
    /////////////////////////////////////
    
    //  Request

    public static class WebserviceRequest {
    	
    	private Integer feature_detection_root__project_scnfl_mapping_tbl__id;

		public void setFeature_detection_root__project_scnfl_mapping_tbl__id(
				Integer feature_detection_root__project_scnfl_mapping_tbl__id) {
			this.feature_detection_root__project_scnfl_mapping_tbl__id = feature_detection_root__project_scnfl_mapping_tbl__id;
		}
    }
    
    //  Result
    
    public static class WebserviceResult {
    	
    	private List<Integer> projectSearchIds_ForScanFile_List;

		public List<Integer> getProjectSearchIds_ForScanFile_List() {
			return projectSearchIds_ForScanFile_List;
		}
    }

}


