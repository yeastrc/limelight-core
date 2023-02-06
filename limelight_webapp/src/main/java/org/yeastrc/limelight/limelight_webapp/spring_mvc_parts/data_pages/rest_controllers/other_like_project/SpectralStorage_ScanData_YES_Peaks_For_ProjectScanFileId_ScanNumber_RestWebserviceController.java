package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScanPeak_SubResponse;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Get Scan Data Scan Data (YES Peaks) from Spectral Storage Service (Spectr) for Project Scan File Id AND Scan Number
 *
 */
@RestController
public class SpectralStorage_ScanData_YES_Peaks_For_ProjectScanFileId_ScanNumber_RestWebserviceController {

    private static final Logger log = LoggerFactory.getLogger( SpectralStorage_ScanData_YES_Peaks_For_ProjectScanFileId_ScanNumber_RestWebserviceController.class );

    @Autowired
    private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private Gzip_ByteArray_To_ByteArray_IF gzip_ByteArray_To_ByteArray;
	
	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;

	@Autowired
	private ProjectScanFile_For_ProjectScanFileId_Searcher_IF projectScanFile_For_ProjectScanFileId_Searcher;
	
	@Autowired
    private ScanFileDAO_IF scanFileDAO;

    @Autowired
    private Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice;

    @Autowired
    private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

    @Autowired
    private MarshalObjectToJSON marshalObjectToJSON;

    public SpectralStorage_ScanData_YES_Peaks_For_ProjectScanFileId_ScanNumber_RestWebserviceController() {
        super();
    }

    @PostMapping(
            path = {
                    AA_RestWSControllerPaths_Constants.PATH_START_ALL
                            + AA_RestWSControllerPaths_Constants.SPECTRAL_STORAGE_SCAN_SPECTRUM_FOR_PROJECT_SCAN_FILE_ID_SCAN_NUMBER_REST_WEBSERVICE_CONTROLLER
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

            if ( webserviceRequest.projectScanFileId == null ) {
                log.warn( "Request not have projectScanFileId" );
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }
            if ( webserviceRequest.scanNumber == null ) {
                log.warn( "Request not have scanNumber" );
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }
            
            Integer scanNumber = webserviceRequest.scanNumber;

    		Project_ScanFile_DTO project_ScanFile_DTO =
    				projectScanFile_For_ProjectScanFileId_Searcher.get_For_ProjectScanFileId_Searcher(webserviceRequest.projectScanFileId);
    		
    		if ( project_ScanFile_DTO == null ) {
    			String msg = "projectScanFileId not in DB: " + webserviceRequest.projectScanFileId;
    			log.warn(msg);
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
            int projectId = project_ScanFile_DTO.getProjectId();
            int scanFileId = project_ScanFile_DTO.getScanFileId();


			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );

			//  Restrict access to Public Access
//			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
			validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
			.validatePublicAccessCodeReadAccessLevel( projectIds, httpServletRequest );

			String scanFileAPIKey = scanFileDAO.getSpectralStorageAPIKeyById(scanFileId);

			if ( scanFileAPIKey == null ) {
				String msg = "Returned scanFileAPIKey == null for projectId: " + projectId + ", scanFileId: " + scanFileId;
				log.warn(msg);
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			List<Integer> scanNumbers = new ArrayList<>(1);
			scanNumbers.add(scanNumber);

			List<SingleScan_SubResponse> scanDataList_FromSpectralStorageService =
					call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice.getScanDataFromSpectralStorageService(
							scanNumbers, 
							Get_ScanDataFromScanNumbers_IncludeParentScans.NO, // get_ScanDataFromScanNumbers_IncludeParentScans, 
							Get_ScanData_ExcludeReturnScanPeakData.NO, // excludeReturnScanPeakData,
							scanFileAPIKey);
			
			if ( scanDataList_FromSpectralStorageService.isEmpty() ) {
				
				String msg = "Scan Number not in Spectral Storage. scanNumber " + scanNumber
						+ ", projectId: " + projectId
						 + ", scanFileId: " + scanFileId
						 + ", scanFileAPIKey: " + scanFileAPIKey;
				log.warn(msg);
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			SingleScan_SubResponse singleScan_SubResponse = scanDataList_FromSpectralStorageService.get(0);
			
			WebsserviceResult_SingleScanEntry result_SingleScanEntry = new WebsserviceResult_SingleScanEntry();

			result_SingleScanEntry.level = singleScan_SubResponse.getLevel();
			result_SingleScanEntry.scanNumber = singleScan_SubResponse.getScanNumber();
			result_SingleScanEntry.retentionTime_InSeconds = singleScan_SubResponse.getRetentionTime();
			result_SingleScanEntry.totalIonCurrent_ForScan = singleScan_SubResponse.getTotalIonCurrent_ForScan();
			result_SingleScanEntry.ionInjectionTime_InMilliseconds = singleScan_SubResponse.getIonInjectionTime();
			result_SingleScanEntry.parentScanNumber = singleScan_SubResponse.getParentScanNumber();
			result_SingleScanEntry.precursorCharge = singleScan_SubResponse.getPrecursorCharge();
			result_SingleScanEntry.precursor_M_Over_Z = singleScan_SubResponse.getPrecursor_M_Over_Z();
			
			//  Copy Peaks
			
			if ( singleScan_SubResponse.getPeaks() == null ) {
				String msg = "NO Peaks List returned. scanNumber " + scanNumber
						+ ", projectId: " + projectId
						 + ", scanFileId: " + scanFileId
						 + ", scanFileAPIKey: " + scanFileAPIKey;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			List<WebsserviceResult_SingleScan_Peak_Entry> result_SingleScanPeaksList = new ArrayList<>( singleScan_SubResponse.getPeaks().size() );
			
			for ( SingleScanPeak_SubResponse singleScanPeak_SubResponse : singleScan_SubResponse.getPeaks() ) {
			
				WebsserviceResult_SingleScan_Peak_Entry result_SingleScanPeak = new WebsserviceResult_SingleScan_Peak_Entry();
				result_SingleScanPeak.intensity = singleScanPeak_SubResponse.getIntensity();
				result_SingleScanPeak.m_over_z = singleScanPeak_SubResponse.getMz();
				
				result_SingleScanPeaksList.add(result_SingleScanPeak);
			}
			
			result_SingleScanEntry.scanPeaksList = result_SingleScanPeaksList;
			

			WebserviceResult webserviceResult = new WebserviceResult();

			webserviceResult.singleScanData = result_SingleScanEntry;
			

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

    	Integer projectScanFileId;
        Integer scanNumber;

		public void setProjectScanFileId(Integer projectScanFileId) {
			this.projectScanFileId = projectScanFileId;
		}
		public void setScanNumber(Integer scanNumber) {
			this.scanNumber = scanNumber;
		}
    }

    /**
    *
    */
    public static class WebserviceResult {

    	private WebsserviceResult_SingleScanEntry singleScanData;

		public WebsserviceResult_SingleScanEntry getSingleScanData() {
			return singleScanData;
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
    	
    	List<WebsserviceResult_SingleScan_Peak_Entry> scanPeaksList;
    	
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
		public List<WebsserviceResult_SingleScan_Peak_Entry> getScanPeaksList() {
			return scanPeaksList;
		}
    }
    

    /**
    *
    */
    public static class WebsserviceResult_SingleScan_Peak_Entry {
    	
    	private float intensity;
    	private double m_over_z;
    	
		public float getIntensity() {
			return intensity;
		}
		public double getM_over_z() {
			return m_over_z;
		}

    }
}
