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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.project_scan_file_id__other_than_scan_data;


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
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Scan File Code First Six (First 6 of Spectral Storage API Key) FOR Single Scan File Id 
 * 
 */
@RestController
public class ScanFileCode_FirstSix_FOR_ProjectScanFileId_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ScanFileCode_FirstSix_FOR_ProjectScanFileId_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;
	
	@Autowired
	private ProjectScanFileDAO_IF projectScanFileDAO;
	
	@Autowired
	private ScanFileDAO_IF scanFileDAO;

//	@Autowired
//	private ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher_IF projectScanFile_ProjectId_For_ProjectScanFileId_Searcher;
//	
//	@Autowired
//	private SpectralStorageAPIKeyFor_ProjectScanFileId_Searcher_IF spectralStorageAPIKeyFor_ProjectScanFileId_Searcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ScanFileCode_FirstSix_FOR_ProjectScanFileId_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_SCAN_FILE_CODE_FIRST_SIX_FOR_PROJECT_SCAN_FILE_ID_REST_WEBSERVICE_CONTROLLER
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

    		if ( webserviceRequest.projectScanFileId == null ) {
    			log.warn( "projectScanFileId is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		Project_ScanFile_DTO Project_ScanFile_DTO = projectScanFileDAO.getById( webserviceRequest.projectScanFileId );

    		if ( Project_ScanFile_DTO == null ) {
    			log.warn( "projectScanFileId is not found in db: " + webserviceRequest.projectScanFileId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		Integer projectId = Project_ScanFile_DTO.getProjectId();
    		
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
			
			String spectralStorageAPIKey = scanFileDAO.getSpectralStorageAPIKeyById( Project_ScanFile_DTO.getScanFileId() );

    		if ( spectralStorageAPIKey == null ) {
    			String msg = "Project_ScanFile_DTO.getScanFileId() is not found in db. projectScanFileId: " + webserviceRequest.projectScanFileId;
    			log.warn( msg );
    			throw new LimelightInternalErrorException( msg );
    		}
    		
    		String scanFileCode_FirstSix = spectralStorageAPIKey;
    		
    		if ( spectralStorageAPIKey.length() > 6 ) {
    			scanFileCode_FirstSix = spectralStorageAPIKey.substring( 0, 6 );
    		}
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.scanFileCode_FirstSix = scanFileCode_FirstSix;

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
    	
    	private Integer projectScanFileId;

		public void setProjectScanFileId(Integer projectScanFileId) {
			this.projectScanFileId = projectScanFileId;
		}
    }
    
    //  Result
    
    public static class WebserviceResult {
    	
    	private String scanFileCode_FirstSix;

		public String getScanFileCode_FirstSix() {
			return scanFileCode_FirstSix;
		}

    }
}


