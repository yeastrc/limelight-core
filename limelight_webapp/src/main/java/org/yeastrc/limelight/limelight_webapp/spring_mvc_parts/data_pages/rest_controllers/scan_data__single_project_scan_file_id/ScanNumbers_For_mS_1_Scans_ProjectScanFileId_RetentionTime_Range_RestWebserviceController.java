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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.scan_data__single_project_scan_file_id;


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
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;


/**
 * Get Scan Numbers For MS 1 Scans, Project Scan File Id, Retention Time Range
 * 
 * 
 */
@RestController
public class ScanNumbers_For_mS_1_Scans_ProjectScanFileId_RetentionTime_Range_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ScanNumbers_For_mS_1_Scans_ProjectScanFileId_RetentionTime_Range_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;
	
	@Autowired
	private ProjectScanFileDAO_IF projectScanFileDAO;
		
	@Autowired
	private ScanFileDAO_IF scanFileDAO;
	
	@Autowired
	private Call_Get_ScanNumbers_SpectralStorageWebserviceIF call_Get_ScanNumbers_SpectralStorageWebservice;

	@Autowired
	private Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ScanNumbers_For_mS_1_Scans_ProjectScanFileId_RetentionTime_Range_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SCAN_NUMBERS_FOR_MS_1_SCANS_PROJECT_SCAN_FILE_ID_RETENTION_TIME_RANGE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceCall(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "peptideView(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
    		
    		if ( postBody == null || postBody.length == 0 ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		WebserviceRequestRoot webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequestRoot.class );

    		Integer projectScanFileId = webserviceRequest.projectScanFileId;

    		if ( projectScanFileId == null ) {
    			log.warn( "No projectScanFileId" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( webserviceRequest.retentionTimeRange_Min == null && webserviceRequest.retentionTimeRange_Max == null ) {
    			log.warn( "( webserviceRequest.retentionTimeRange_Min == null && webserviceRequest.retentionTimeRange_Max == null )" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		Project_ScanFile_DTO project_ScanFile_DTO = projectScanFileDAO.getById( projectScanFileId.intValue() );
     		if ( project_ScanFile_DTO == null ) {
    			log.warn( "projectScanFileId NOT in DB: projectScanFileId: " + projectScanFileId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( project_ScanFile_DTO.getProjectId() );


			GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
					getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();

			if ( getWebSessionAuthAccessLevelForProjectIds_Result.isNoSession()
					&& ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )) {
				
				//  No User session and not public project
				throw new Limelight_WS_AuthError_Unauthorized_Exception();
			}
    		
    		String scanFileAPIKey = scanFileDAO.getSpectralStorageAPIKeyById( project_ScanFile_DTO.getScanFileId() );
    		if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
				String msg = "No value for scanFileAPIKey for scan file id: " 
						+ project_ScanFile_DTO.getScanFileId() 
						+ ", webserviceRequest.projectScanFileId: " + webserviceRequest.projectScanFileId;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
    		
    		List<Integer> scanLevelsToInclude = new ArrayList<>( 1 );
    		scanLevelsToInclude.add( 1 );  // Only Scan Level 1
    		
    					
			List<Integer> scanNumbers_All_Level_1_List =
					call_Get_ScanNumbers_SpectralStorageWebservice.getScanNumbersFromSpectralStorageService( 
							scanLevelsToInclude,
							null, // scanLevelsToExclude
							scanFileAPIKey);

			List<Integer> scanNumbers_Result_List = new ArrayList<>( scanNumbers_All_Level_1_List.size() );
			
			
			if ( ! scanNumbers_All_Level_1_List.isEmpty() ) {
					
				List<SingleScan_SubResponse> scans = 
						call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice
						.getScanDataFromSpectralStorageService(
								scanNumbers_All_Level_1_List, 
								Get_ScanDataFromScanNumbers_IncludeParentScans.NO,
								Get_ScanData_ExcludeReturnScanPeakData.YES,
								scanFileAPIKey );

				for ( SingleScan_SubResponse scan : scans ) {

					if ( webserviceRequest.retentionTimeRange_Min != null ) {
						if ( webserviceRequest.retentionTimeRange_Min.floatValue() > scan.getRetentionTime() ) {
							//  Skip since out of range
							continue; // 
						}
					}
					if ( webserviceRequest.retentionTimeRange_Max != null ) {
						if ( webserviceRequest.retentionTimeRange_Max.floatValue() < scan.getRetentionTime() ) {
							//  Skip since out of range
							continue; // 
						}
					}

					scanNumbers_Result_List.add( scan.getScanNumber() );
				}
			}

    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.scanNumber_List = scanNumbers_Result_List;
    		
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
    
    /////////////////////////
    
    //   Webservice Request and Response
	
	/**
	 * Root object for JSON request
	 * 
	 * This is the representation that the Javascript code uses
	 *
	 */
	public static class WebserviceRequestRoot {
	
		private Integer projectScanFileId;
		private Float retentionTimeRange_Min;
		private Float retentionTimeRange_Max;
		
		public void setRetentionTimeRange_Min(Float retentionTimeRange_Min) {
			this.retentionTimeRange_Min = retentionTimeRange_Min;
		}
		public void setRetentionTimeRange_Max(Float retentionTimeRange_Max) {
			this.retentionTimeRange_Max = retentionTimeRange_Max;
		}
		public void setProjectScanFileId(Integer projectScanFileId) {
			this.projectScanFileId = projectScanFileId;
		}
	}
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
    	List<Integer> scanNumber_List;

		public List<Integer> getScanNumber_List() {
			return scanNumber_List;
		}
    	

    }

}


