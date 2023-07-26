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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.single_project_search_id;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.SearchScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;
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
 * Get Scan Numbers For MS 1 Scans, Project Search Id, Search Scan File Id, Retention Time Range
 * 
 * 
 */
@RestController
public class ScanNumbers_For_mS_1_Scans_ProjectSearchId_SearchScanFileId_RetentionTime_Range_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ScanNumbers_For_mS_1_Scans_ProjectSearchId_SearchScanFileId_RetentionTime_Range_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	@Autowired
	private SearchScanFileDAO_IF searchScanFileDAO;
	
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
	public ScanNumbers_For_mS_1_Scans_ProjectSearchId_SearchScanFileId_RetentionTime_Range_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SCAN_NUMBERS_FOR_MS_1_SCANS_PROJECT_SEARCH_ID_SEARCH_SCAN_FILE_ID_RETENTION_TIME_RANGE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  psmList(
    		
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

    		Integer projectSearchId = webserviceRequest.projectSearchId;

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Id" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( webserviceRequest.searchScanFileId == null ) {
    			log.warn( "( webserviceRequest.searchScanFileId == null )" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( webserviceRequest.retentionTimeRange_Min == null && webserviceRequest.retentionTimeRange_Max == null ) {
    			log.warn( "( webserviceRequest.retentionTimeRange_Min == null && webserviceRequest.retentionTimeRange_Max == null )" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
    		projectSearchIdsForValidate.add( projectSearchId );

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );
    		
    		////////////////
   			
    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			

			SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = 
					searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
			
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
    		

    		//  TODO Can do something more Graceful here
    		
    		if ( ! searchFlagsForSearchIdSearcher_Result_Item.isHasScanData() ) {
    			String msg = "No Scan Data for searchId: " + searchId + ", for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		SearchScanFileDTO searchScanFileDTO = searchScanFileDAO.getById( webserviceRequest.searchScanFileId );
    		if ( searchScanFileDTO == null ) {
    			String msg = "No DB record for webserviceRequest.searchScanFileId: " + webserviceRequest.searchScanFileId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( searchScanFileDTO.getSearchId() != searchId.intValue() ) {
    			String msg = "searchScanFileDTO DB record has searchId not match for param projectSearchId. webserviceRequest.searchScanFileId: " 
    					+ webserviceRequest.searchScanFileId 
    					+ ", projectSearchId: " + projectSearchId
    					+ ", searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( searchScanFileDTO.getScanFileId() == null ) {
    			String msg = "searchScanFileDTO.getScanFileId() == null so no Scan File associated with it. webserviceRequest.searchScanFileId: " 
    					+ webserviceRequest.searchScanFileId 
    					+ ", projectSearchId: " + projectSearchId
    					+ ", searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		String scanFileAPIKey = scanFileDAO.getSpectralStorageAPIKeyById( searchScanFileDTO.getScanFileId() );
    		if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
				String msg = "No value for scanFileAPIKey for scan file id: " 
						+ searchScanFileDTO.getScanFileId() 
						+ ", webserviceRequest.searchScanFileId: " + webserviceRequest.searchScanFileId;
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

			List<SingleScan_SubResponse> scans = 
					call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice
					.getScanDataFromSpectralStorageService(
							scanNumbers_All_Level_1_List, 
							Get_ScanDataFromScanNumbers_IncludeParentScans.NO,
							Get_ScanData_ExcludeReturnScanPeakData.YES,
							scanFileAPIKey );
			
			
			List<Integer> scanNumbers_Result_List = new ArrayList<>( scanNumbers_All_Level_1_List.size() );
			
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
	
		private Integer projectSearchId;
		private Integer searchScanFileId;
		private Float retentionTimeRange_Min;
		private Float retentionTimeRange_Max;
		
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setSearchScanFileId(Integer searchScanFileId) {
			this.searchScanFileId = searchScanFileId;
		}
		public void setRetentionTimeRange_Min(Float retentionTimeRange_Min) {
			this.retentionTimeRange_Min = retentionTimeRange_Min;
		}
		public void setRetentionTimeRange_Max(Float retentionTimeRange_Max) {
			this.retentionTimeRange_Max = retentionTimeRange_Max;
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


