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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
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
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_IncludeReturnIonInjectionTimeData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_IncludeReturnScanLevelTotalIonCurrentData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanDataFromScanNumbers_Request;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;


/**
 * Get Scan Data NO Peaks For Scan Numbers, Project Scan File Id
 * 
 * 		OPTIONAL: Get Scan Data for ALL PARENTS of Scan Numbers when pass:
 * 
 * 				setIncludeParentScans( Get_ScanDataFromScanNumbers_IncludeParentScans.ALL_PARENTS
 * 
 * 
 */
@RestController
public class ScanData_NO_Peaks_And_Optional_ALL_PARENTS__For_ScanNumbers_ProjectScanFileId_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ScanData_NO_Peaks_And_Optional_ALL_PARENTS__For_ScanNumbers_ProjectScanFileId_RestWebserviceController.class );
	
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
	public ScanData_NO_Peaks_And_Optional_ALL_PARENTS__For_ScanNumbers_ProjectScanFileId_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SCAN_DATA_NO_PEAKS_AND_OPTIONAL_ALL_PARENTS__FOR_SCAN_NUMBERS_PROJECT_SCAN_FILE_ID_REST_WEBSERVICE_CONTROLLER
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

    		if ( webserviceRequest.scanNumberList == null ) {
    			
    			if ( webserviceRequest.retrieve_ALL_Scans_ForFile == null || ( ! webserviceRequest.retrieve_ALL_Scans_ForFile.booleanValue() ) ) {
    				log.warn( "( webserviceRequest.scanNumberList == null ) AND ( webserviceRequest.retrieve_ALL_Scans_ForFile == null || ( ! webserviceRequest.retrieve_ALL_Scans_ForFile.booleanValue() ) )" );
    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			
    		} else if ( webserviceRequest.scanNumberList.isEmpty() ) {
    			log.warn( "( webserviceRequest.scanNumberList.isEmpty() )" );
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

    		WebsserviceResult_ScanData scanData_Result = new WebsserviceResult_ScanData();
    		
        	{
        		List<Integer> scanNumbers = webserviceRequest.scanNumberList;

        		if ( webserviceRequest.retrieve_ALL_Scans_ForFile != null && webserviceRequest.retrieve_ALL_Scans_ForFile.booleanValue() ) {

        			scanNumbers = call_Get_ScanNumbers_SpectralStorageWebservice.getScanNumbersFromSpectralStorageService(null, null, scanFileAPIKey);
        		}

        		{
        			Get_ScanDataFromScanNumbers_Request get_ScanDataFromScanNumbers_Request = new Get_ScanDataFromScanNumbers_Request();
        			get_ScanDataFromScanNumbers_Request.setScanFileAPIKey( scanFileAPIKey );

        			get_ScanDataFromScanNumbers_Request.setScanNumbers( scanNumbers );

        			if ( webserviceRequest.returnParentScanData != null && webserviceRequest.returnParentScanData.booleanValue() ) {

        				get_ScanDataFromScanNumbers_Request.setIncludeParentScans( Get_ScanDataFromScanNumbers_IncludeParentScans.ALL_PARENTS );
        			}

        			get_ScanDataFromScanNumbers_Request.setExcludeReturnScanPeakData( Get_ScanData_ExcludeReturnScanPeakData.YES );

        			get_ScanDataFromScanNumbers_Request.setIncludeReturnScanLevelTotalIonCurrentData(Get_ScanData_IncludeReturnScanLevelTotalIonCurrentData.YES);
        			get_ScanDataFromScanNumbers_Request.setIncludeReturnIonInjectionTimeData(Get_ScanData_IncludeReturnIonInjectionTimeData.YES);

        			List<SingleScan_SubResponse> scans = 
        					call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice
        					.getScanDataFromSpectralStorageService_NativeSpectralStorageServiceRequestObject(
        							get_ScanDataFromScanNumbers_Request,
        							scanFileAPIKey );

        			scanData_Result.level_Array = new short[ scans.size() ];
        			scanData_Result.scanNumber_Array = new int[ scans.size() ];
        			scanData_Result.retentionTime_InSeconds_Array = new float[ scans.size() ];
        			scanData_Result.totalIonCurrent_ForScan_Array = new Float[ scans.size() ];
                	
                	/**
                	 * Not Populated when Data file is version < 5 since not stored in those data files
                	 */
        			scanData_Result.ionInjectionTime_InMilliseconds_Array = new Float[ scans.size() ];  // In Milliseconds

                	//  Only applicable where level > 1
                	
        			scanData_Result.parentScanNumber_Array = new Integer[ scans.size() ];
        			scanData_Result.precursorCharge_Array = new Byte[ scans.size() ];
        			scanData_Result.precursor_M_Over_Z_Array = new Double[ scans.size() ];
                	
                	{
                		int index_OfArrays = 0;

                		for ( SingleScan_SubResponse singleScan_SubResponse : scans ) {

                			scanData_Result.level_Array[ index_OfArrays ] = singleScan_SubResponse.getLevel();
                			scanData_Result.scanNumber_Array[ index_OfArrays ] = singleScan_SubResponse.getScanNumber();
                			scanData_Result.retentionTime_InSeconds_Array[ index_OfArrays ] = singleScan_SubResponse.getRetentionTime();
                			scanData_Result.totalIonCurrent_ForScan_Array[ index_OfArrays ] = singleScan_SubResponse.getTotalIonCurrent_ForScan();
                        	
                        	/**
                        	 * Not Populated when Data file is version < 5 since not stored in those data files
                        	 */
                			scanData_Result.ionInjectionTime_InMilliseconds_Array[ index_OfArrays ] = singleScan_SubResponse.getIonInjectionTime();  // In Milliseconds

                        	//  Only applicable where level > 1
                        	
                			scanData_Result.parentScanNumber_Array[ index_OfArrays ] = singleScan_SubResponse.getParentScanNumber();
                			scanData_Result.precursorCharge_Array[ index_OfArrays ] = singleScan_SubResponse.getPrecursorCharge();
                			scanData_Result.precursor_M_Over_Z_Array[ index_OfArrays ] = singleScan_SubResponse.getPrecursor_M_Over_Z();
                        	
                			index_OfArrays++;
                		}
                	}
        		}
        	}

    		WebserviceResult webserviceResult = new WebserviceResult();
    		
    		webserviceResult.scanData = scanData_Result;
    		
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
		private Boolean retrieve_ALL_Scans_ForFile;
		private List<Integer> scanNumberList;
		private Boolean returnParentScanData;
		
		public void setProjectScanFileId(Integer projectScanFileId) {
			this.projectScanFileId = projectScanFileId;
		}
		public void setScanNumberList(List<Integer> scanNumberList) {
			this.scanNumberList = scanNumberList;
		}
		public void setReturnParentScanData(Boolean returnParentScanData) {
			this.returnParentScanData = returnParentScanData;
		}
		public void setRetrieve_ALL_Scans_ForFile(Boolean retrieve_ALL_Scans_ForFile) {
			this.retrieve_ALL_Scans_ForFile = retrieve_ALL_Scans_ForFile;
		}
	}

    /**
     * 
     *
     */
    public static class WebserviceResult {

    	private WebsserviceResult_ScanData scanData;

		public WebsserviceResult_ScanData getScanData() {
			return scanData;
		}
    }

    /**
    *
    */
    public static class WebsserviceResult_ScanData {

    	private short[] level_Array;  //  Make 'short[]' since byte[] is serialized to JSON as a string
    	private int[] scanNumber_Array;
    	private float[] retentionTime_InSeconds_Array;
    	private Float[] totalIonCurrent_ForScan_Array;
    	
    	/**
    	 * Not Populated when Data file is version < 5 since not stored in those data files
    	 */
    	private Float[] ionInjectionTime_InMilliseconds_Array;  // In Milliseconds

    	
    	//  SKIP
    	/**
    	 * Not populated if request other than peaks and scan file contains more than one unique value
    	 */
//    	private Byte isCentroid;
    	
    	//  Only applicable where level > 1
    	
    	private Integer[] parentScanNumber_Array;
    	private Byte[] precursorCharge_Array;
    	private Double[] precursor_M_Over_Z_Array;
    	
		public short[] getLevel_Array() {
			return level_Array;
		}
		public int[] getScanNumber_Array() {
			return scanNumber_Array;
		}
		public float[] getRetentionTime_InSeconds_Array() {
			return retentionTime_InSeconds_Array;
		}
		public Float[] getTotalIonCurrent_ForScan_Array() {
			return totalIonCurrent_ForScan_Array;
		}
		public Float[] getIonInjectionTime_InMilliseconds_Array() {
			return ionInjectionTime_InMilliseconds_Array;
		}
		public Integer[] getParentScanNumber_Array() {
			return parentScanNumber_Array;
		}
		public Byte[] getPrecursorCharge_Array() {
			return precursorCharge_Array;
		}
		public Double[] getPrecursor_M_Over_Z_Array() {
			return precursor_M_Over_Z_Array;
		}
    	

    	
    }


}


