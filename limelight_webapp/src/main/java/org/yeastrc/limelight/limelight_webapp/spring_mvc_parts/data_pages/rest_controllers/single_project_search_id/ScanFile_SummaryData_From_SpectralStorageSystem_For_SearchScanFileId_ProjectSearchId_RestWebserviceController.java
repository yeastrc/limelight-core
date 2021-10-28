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
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKey_For_SearchIdSearchScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_GetSummaryDataPerScanLevel_FromSpectralStorageServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScanLevelSummaryData_SubResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Get Scan File Summary Data From Spectral Storage System (Spectr) for Search Scan File Data Id, Project Search Id
 *
 */
@RestController
public class ScanFile_SummaryData_From_SpectralStorageSystem_For_SearchScanFileId_ProjectSearchId_RestWebserviceController {

    private static final Logger log = LoggerFactory.getLogger( ScanFile_SummaryData_From_SpectralStorageSystem_For_SearchScanFileId_ProjectSearchId_RestWebserviceController.class );

    @Autowired
    private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

    @Autowired
    private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

    @Autowired
    private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
    
    @Autowired
    private SpectralStorageAPIKey_For_SearchIdSearchScanFileId_Searcher_IF spectralStorageAPIKey_For_SearchIdSearchScanFileId_Searcher;
    
    @Autowired
    private Call_Get_GetSummaryDataPerScanLevel_FromSpectralStorageServiceIF call_Get_GetSummaryDataPerScanLevel_FromSpectralStorageService;
    
    @Autowired
    private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

    @Autowired
    private MarshalObjectToJSON marshalObjectToJSON;

    public ScanFile_SummaryData_From_SpectralStorageSystem_For_SearchScanFileId_ProjectSearchId_RestWebserviceController() {
        super();
    }

    @PostMapping(
            path = {
                    AA_RestWSControllerPaths_Constants.PATH_START_ALL
                            + AA_RestWSControllerPaths_Constants.SCAN_FILE_SUMMARY_DATA_FROM_SPECTRAL_STORAGE_DATA__SEARCH_SCAN_FILE_ID_SINGLE_PROJECT_SEARCH_ID
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

            Integer projectSearchId = webserviceRequest.projectSearchId;
            Integer searchScanFileId = webserviceRequest.searchScanFileId;

            if ( projectSearchId == null ) {
                log.warn( "No Project Search Id" );
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }
            if ( searchScanFileId == null ) {
                log.warn( "No searchScanFileId" );
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
            
            String scanFileAPIKey =  
            		spectralStorageAPIKey_For_SearchIdSearchScanFileId_Searcher.get_SpectralStorageAPIKey_For_SearchId_SearchScanFileId( searchId, searchScanFileId );
            
            if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
            	String msg = "Got empty scanFileAPIKey for search id: " + searchId + ", searchScanFileId: " + searchScanFileId;
            	log.warn( msg );
            	throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }

            List<SingleScanLevelSummaryData_SubResponse> singleScanLevelSummaryData_SubResponse_List =
            		call_Get_GetSummaryDataPerScanLevel_FromSpectralStorageService.getSummaryDataPerScanLevelFromAPIKey(scanFileAPIKey);

            
            List<WebsserviceResult_SingleLevelEntry> scanLevelEntries = new ArrayList<>( singleScanLevelSummaryData_SubResponse_List.size() );

            for ( SingleScanLevelSummaryData_SubResponse singleScanLevelSummaryData_SubResponse :  singleScanLevelSummaryData_SubResponse_List ) {

            	WebsserviceResult_SingleLevelEntry result_SingleLevelEntry = new WebsserviceResult_SingleLevelEntry();
            	scanLevelEntries.add(result_SingleLevelEntry);

            	result_SingleLevelEntry.scanLevel = singleScanLevelSummaryData_SubResponse.getScanLevel();
            	result_SingleLevelEntry.numberOfScans = singleScanLevelSummaryData_SubResponse.getNumberOfScans();
            	result_SingleLevelEntry.totalIonCurrent = singleScanLevelSummaryData_SubResponse.getTotalIonCurrent();
            }

            WebserviceResult webserviceResult = new WebserviceResult();
            webserviceResult.scanLevelEntries = scanLevelEntries;

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
     *
     */
    public static class WebserviceRequest {
    	
        Integer projectSearchId;
        Integer searchScanFileId;
        
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setSearchScanFileId(Integer searchScanFileId) {
			this.searchScanFileId = searchScanFileId;
		}
    }

    /**
    *
    */
    public static class WebserviceResult {
    	
    	List<WebsserviceResult_SingleLevelEntry> scanLevelEntries;

		public List<WebsserviceResult_SingleLevelEntry> getScanLevelEntries() {
			return scanLevelEntries;
		}

    }
    
    /**
    *
    */
    public static class WebsserviceResult_SingleLevelEntry {
    	/**
    	 * Scan level for this summary data entry
    	 */
    	byte scanLevel;
    	/**
    	 * number of scans with this scan level
    	 */
    	int numberOfScans;
    	/**
    	 * Sum of intensity of all peaks for all scans with this scan level
    	 */
    	double totalIonCurrent;
    	
		public byte getScanLevel() {
			return scanLevel;
		}
		public int getNumberOfScans() {
			return numberOfScans;
		}
		public double getTotalIonCurrent() {
			return totalIonCurrent;
		}
    }

}
