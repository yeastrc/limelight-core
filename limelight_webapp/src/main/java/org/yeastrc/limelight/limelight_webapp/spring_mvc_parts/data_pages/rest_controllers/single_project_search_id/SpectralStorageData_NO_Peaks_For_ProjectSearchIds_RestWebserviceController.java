package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.single_project_search_id;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKeyForSearchId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKeyForSearchId_Searcher.SpectralStorageAPIKeyForSearchId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKeyForSearchId_Searcher.SpectralStorageAPIKeyForSearchId_Searcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Get Scan Data (No Peaks) from Spectral Storage Service (Spectr) for Project Search Id
 *
 */
@RestController
public class SpectralStorageData_NO_Peaks_For_ProjectSearchIds_RestWebserviceController {

    private static final Logger log = LoggerFactory.getLogger( SpectralStorageData_NO_Peaks_For_ProjectSearchIds_RestWebserviceController.class );

    @Autowired
    private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

    @Autowired
    private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private Gzip_ByteArray_To_ByteArray_IF gzip_ByteArray_To_ByteArray;
	
	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;
	
    @Autowired
    private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
    
    @Autowired
    private SpectralStorageAPIKeyForSearchId_SearcherIF spectralStorageAPIKeyForSearchId_Searcher;
    
    @Autowired
    private ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_IF projectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher;
    
    @Autowired
    private Call_Get_ScanNumbers_SpectralStorageWebserviceIF call_Get_ScanNumbers_SpectralStorageWebservice;
    
    @Autowired
    private Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice;

    @Autowired
    private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

    @Autowired
    private MarshalObjectToJSON marshalObjectToJSON;

    public SpectralStorageData_NO_Peaks_For_ProjectSearchIds_RestWebserviceController() {
        super();
    }

    @PostMapping(
            path = {
                    AA_RestWSControllerPaths_Constants.PATH_START_ALL
                            + AA_RestWSControllerPaths_Constants.SPECTRAL_STORAGE_DATA__NO_PEAKS__SINGLE_PROJECT_SEARCH_ID
            },
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

    public @ResponseBody
    ResponseEntity<byte[]> webserviceMethod(

            @RequestBody byte[] postBody,
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse
    ) throws Exception {
        try {

            //  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception
            //    to return specific error to web app JS code if webserviceSyncTracking is not current value
            validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

            //  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

            if ( postBody == null || postBody.length == 0 ) {
                log.warn( "No Post Body" );
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }

            WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

            Integer projectSearchId = webserviceRequest.getProjectSearchId();

            if ( projectSearchId == null ) {
                log.warn( "No Project Search Ids" );
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }

            List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
            projectSearchIdsForValidate.add( projectSearchId );
            validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );

            Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
            if ( searchId == null ) {
                String msg = "No searchId for projectSearchId: " + projectSearchId;
                log.warn( msg );
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }
            
            SpectralStorageAPIKeyForSearchId_Searcher_Result spectralStorageAPIKeyForSearchId_Searcher_Result = 
            		spectralStorageAPIKeyForSearchId_Searcher.get_SearchScanFileId_SpectralStorageAPIKey_Entries_ForSearchId( searchId );

            List<WebsserviceResult_SingleScanFile> scanFileEntries = new ArrayList<>( spectralStorageAPIKeyForSearchId_Searcher_Result.getResultItems().size() );
            
            Map<Integer, Integer> project_scan_file_id__FOR__Search_scan_file_id_Map = new HashMap<>( spectralStorageAPIKeyForSearchId_Searcher_Result.getResultItems().size() );
            
            {
            	ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_Result result = 
            			projectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher.get_ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId(projectSearchId);
            	for ( ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_ResultItem resultItem : result.getResultItemList() ) {
            		project_scan_file_id__FOR__Search_scan_file_id_Map.put( resultItem.getSearch_scan_file_id(), resultItem.getProject_scan_file_id() );
            	}
            }
            

            for( SpectralStorageAPIKeyForSearchId_Searcher_Result_Item resultItem: spectralStorageAPIKeyForSearchId_Searcher_Result.getResultItems() ) {
            	
            	
            	String scanFileAPIKey = resultItem.getSpectralStorageAPIKey();
                if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
                    String msg = "Got empty scanFileAPIKey for search id: " + searchId;
                    log.error( msg );
                    throw new LimelightInternalErrorException( msg );
                }

                WebsserviceResult_SingleScanFile websserviceResult_SingleScanFile = new WebsserviceResult_SingleScanFile();
                scanFileEntries.add(websserviceResult_SingleScanFile);
                
                websserviceResult_SingleScanFile.searchScanFileId = resultItem.getSearchScanFileId();
                
                Integer project_scan_file_id = project_scan_file_id__FOR__Search_scan_file_id_Map.get( resultItem.getSearchScanFileId() );
                if ( project_scan_file_id == null ) {
                	 String msg = "NO project_scan_file_id for for SearchScanFileId: " + resultItem.getSearchScanFileId();
                     log.error( msg );
                     throw new LimelightInternalErrorException( msg );
                }
                
                websserviceResult_SingleScanFile.projectScanFileId = project_scan_file_id;

        		List<Integer> scanNumbers = call_Get_ScanNumbers_SpectralStorageWebservice.getScanNumbersFromSpectralStorageService(null, null, scanFileAPIKey);
                
                List<SingleScan_SubResponse> scanDataList_FromSpectralStorageService =
                		call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice.getScanDataFromSpectralStorageService(
                				scanNumbers, 
                				Get_ScanDataFromScanNumbers_IncludeParentScans.NO, // get_ScanDataFromScanNumbers_IncludeParentScans, 
                				Get_ScanData_ExcludeReturnScanPeakData.YES, // excludeReturnScanPeakData,
                				scanFileAPIKey);
                
                List<WebsserviceResult_SingleScanEntry> scanEntries = new ArrayList<>( scanDataList_FromSpectralStorageService.size() );
                websserviceResult_SingleScanFile.scanEntries = scanEntries;
                
                for ( SingleScan_SubResponse singleScan_SubResponse :  scanDataList_FromSpectralStorageService ) {
                	
                	WebsserviceResult_SingleScanEntry result_SingleScanEntry = new WebsserviceResult_SingleScanEntry();
                	scanEntries.add(result_SingleScanEntry);
                	
                	result_SingleScanEntry.level = singleScan_SubResponse.getLevel();
                	result_SingleScanEntry.scanNumber = singleScan_SubResponse.getScanNumber();
                	result_SingleScanEntry.retentionTime_InSeconds = singleScan_SubResponse.getRetentionTime();
                	result_SingleScanEntry.totalIonCurrent_ForScan = singleScan_SubResponse.getTotalIonCurrent_ForScan();
                	result_SingleScanEntry.ionInjectionTime_InMilliseconds = singleScan_SubResponse.getIonInjectionTime();
                	result_SingleScanEntry.parentScanNumber = singleScan_SubResponse.getParentScanNumber();
                	result_SingleScanEntry.precursorCharge = singleScan_SubResponse.getPrecursorCharge();
                	result_SingleScanEntry.precursor_M_Over_Z = singleScan_SubResponse.getPrecursor_M_Over_Z();
                }
                
            }

            WebserviceResult webserviceResult = new WebserviceResult();
            webserviceResult.scanFileEntries = scanFileEntries;

            byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		
    		byte[] responseAsJSON_GZIPPED = gzip_ByteArray_To_ByteArray.gzip_ByteArray_To_ByteArray(responseAsJSON);
    		

			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
			
    		
    		byte[] responseAsJSON_FINAL = responseAsJSON;
    		

			if ( accept_GZIP ) {
				restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
				
				responseAsJSON_FINAL = responseAsJSON_GZIPPED;
			}
			
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON_FINAL );

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
     *
     */
    public static class WebserviceRequest {
        Integer projectSearchId;

        public Integer getProjectSearchId() {
            return projectSearchId;
        }
        public void setProjectSearchId(Integer projectSearchId) {
            this.projectSearchId = projectSearchId;
        }
    }

    /**
    *
    */
    public static class WebserviceResult {

    	List<WebsserviceResult_SingleScanFile> scanFileEntries;

		public List<WebsserviceResult_SingleScanFile> getScanFileEntries() {
			return scanFileEntries;
		}
    }

    /**
    *
    */
    public static class WebsserviceResult_SingleScanFile {
    	
    	private int searchScanFileId;
    	private int projectScanFileId;
    	
    	private List<WebsserviceResult_SingleScanEntry> scanEntries;

		public List<WebsserviceResult_SingleScanEntry> getScanEntries() {
			return scanEntries;
		}

		public int getSearchScanFileId() {
			return searchScanFileId;
		}

		public int getProjectScanFileId() {
			return projectScanFileId;
		}
    }
    
    /**
    *
    */
    public static class WebsserviceResult_SingleScanEntry {
    	private byte level;
    	private int scanNumber;
    	private float retentionTime_InSeconds;
    	private Float totalIonCurrent_ForScan;
    	
    	/**
    	 * Not Populated when Data file is version < 5 since not stored in those data files
    	 */
    	private Float ionInjectionTime_InMilliseconds;  // In Milliseconds

    	
    	//  SKIP
    	/**
    	 * Not populated if request other than peaks and scan file contains more than one unique value
    	 */
//    	private Byte isCentroid;
    	
    	//  Only applicable where level > 1
    	
    	private Integer parentScanNumber;
    	private Byte precursorCharge;
    	private Double precursor_M_Over_Z;
    	
		public byte getLevel() {
			return level;
		}
		public int getScanNumber() {
			return scanNumber;
		}
		public float getRetentionTime_InSeconds() {
			return retentionTime_InSeconds;
		}
		public Float getTotalIonCurrent_ForScan() {
			return totalIonCurrent_ForScan;
		}
		public Float getIonInjectionTime_InMilliseconds() {
			return ionInjectionTime_InMilliseconds;
		}
		public Integer getParentScanNumber() {
			return parentScanNumber;
		}
		public Byte getPrecursorCharge() {
			return precursorCharge;
		}
		public Double getPrecursor_M_Over_Z() {
			return precursor_M_Over_Z;
		}
    }


}
