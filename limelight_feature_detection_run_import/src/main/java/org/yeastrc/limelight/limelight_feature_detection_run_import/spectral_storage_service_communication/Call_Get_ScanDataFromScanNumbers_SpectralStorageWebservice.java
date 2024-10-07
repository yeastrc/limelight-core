package org.yeastrc.limelight.limelight_feature_detection_run_import.spectral_storage_service_communication;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterConfigurationException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_IncludeReturnIonInjectionTimeData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_IncludeReturnScanLevelTotalIonCurrentData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ScanFileAPI_Key_NotFound;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanDataFromScanNumbers_Request;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanDataFromScanNumbers_Response;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebservice;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebserviceInitParameters;

/**
 * 
 *
 */
public class Call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice {

	private static final Logger log = LoggerFactory.getLogger( Call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice.class );

	private Call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice() { }
	public static Call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice getInstance() { return new Call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice(); }

	/**
	 * Get Scan Data from Spectral Storage Service
	 * 
	 * Number of scan numbers cannot exceed max as specified in Spectral Storage Service.  
	 *   LimelightInternalErrorException thrown with max allowed if max exceeded.
	 * 
	 * @param scanNumbers
	 * @param scanFileAPIKey
	 * @throws Exception 
	 */
	public List<SingleScan_SubResponse> getScanDataFromSpectralStorageService( 
			List<Integer> scanNumbers, 
			Get_ScanDataFromScanNumbers_IncludeParentScans get_ScanDataFromScanNumbers_IncludeParentScans,
			Get_ScanData_ExcludeReturnScanPeakData excludeReturnScanPeakData,
			String scanFileAPIKey ) throws Exception {
		
		if ( scanNumbers == null || scanNumbers.isEmpty() ) {
			
			return new ArrayList<SingleScan_SubResponse>();
			
//			throw new IllegalArgumentException( "scanNumbers is null or empty" );
		}
		if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
			Integer firstScanNumber = scanNumbers.iterator().next();
			String msg = "No value for scanFileAPIKey.  firstScanNumber: " + firstScanNumber;
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}

		String spectralStorageServiceBaseURL = 
				ConfigSystemTableGetValueCommon.getInstance()
				.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL );
		
		if ( StringUtils.isEmpty( spectralStorageServiceBaseURL ) ) {
			String msg = "No Config value for Spectral Storage Base URL, key: " + ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL;
			log.error( msg );
			throw new LimelightImporterConfigurationException( msg );
		}
		
		CallSpectralStorageGetDataWebserviceInitParameters initParams = new CallSpectralStorageGetDataWebserviceInitParameters();

		initParams.setSpectralStorageServerBaseURL( spectralStorageServiceBaseURL );

		CallSpectralStorageGetDataWebservice callSpectralStorageGetDataWebservice = CallSpectralStorageGetDataWebservice.getInstance();

		callSpectralStorageGetDataWebservice.init( initParams );
		
		Get_ScanDataFromScanNumbers_Request webserviceRequest = new Get_ScanDataFromScanNumbers_Request();
		webserviceRequest.setScanFileAPIKey( scanFileAPIKey );
		webserviceRequest.setScanNumbers( scanNumbers );
		
		webserviceRequest.setIncludeParentScans( get_ScanDataFromScanNumbers_IncludeParentScans );
		webserviceRequest.setExcludeReturnScanPeakData( excludeReturnScanPeakData );
		
		webserviceRequest.setIncludeReturnScanLevelTotalIonCurrentData(Get_ScanData_IncludeReturnScanLevelTotalIonCurrentData.YES);
		webserviceRequest.setIncludeReturnIonInjectionTimeData(Get_ScanData_IncludeReturnIonInjectionTimeData.YES);
		
		webserviceRequest.setReturnScanPeakWithMaxIntensityIgnoringSanPeakFilters(true);
		
		Get_ScanDataFromScanNumbers_Response get_ScanDataFromScanNumber_Response =
				callSpectralStorageGetDataWebservice.call_Get_ScanDataFromScanNumbers_Webservice( webserviceRequest );

		if ( get_ScanDataFromScanNumber_Response.getStatus_scanFileAPIKeyNotFound() 
				== Get_ScanData_ScanFileAPI_Key_NotFound.YES ) {
			String msg = "No data in Spectral Storage for API Key: " + scanFileAPIKey;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		if ( get_ScanDataFromScanNumber_Response.getTooManyScansToReturn() != null
				&& get_ScanDataFromScanNumber_Response.getTooManyScansToReturn() ) {
			
			String msg = "Tried to get data from Spectral Storage Service for too many scan numbers.  "
					+ " MaxScansToReturn: " + get_ScanDataFromScanNumber_Response.getMaxScansToReturn();
			log.error( msg );
			throw new LimelightInternalErrorException( msg );
		}
		
		List<SingleScan_SubResponse> scans = get_ScanDataFromScanNumber_Response.getScans();
		
		if ( scans == null ) {
			String msg = "Returned Scans property is null: Spectral Storage API Key: " + scanFileAPIKey;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		return scans;
	}
	

	/**
	 * Get Scan Data from Spectral Storage Service
	 * 
	 * Number of scan numbers cannot exceed max as specified in Spectral Storage Service.  
	 *   LimelightInternalErrorException thrown with max allowed if max exceeded.
	 * 
	 * @param scanNumbers
	 * @param scanFileAPIKey
	 * @throws Exception 
	 */
	public List<SingleScan_SubResponse> getScanDataFromSpectralStorageService_NativeSpectralStorageServiceRequestObject( 
			Get_ScanDataFromScanNumbers_Request get_ScanDataFromScanNumbers_Request,
			String scanFileAPIKey ) throws Exception {
	
		if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
			String msg = "No value for scanFileAPIKey.  ";
			log.error( msg );
			throw new IllegalArgumentException( msg );
		}

		String spectralStorageServiceBaseURL = 
				ConfigSystemTableGetValueCommon.getInstance()
				.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL );
		
		if ( StringUtils.isEmpty( spectralStorageServiceBaseURL ) ) {
			String msg = "No Config value for Spectral Storage Base URL, key: " + ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL;
			log.error( msg );
			throw new LimelightImporterConfigurationException( msg );
		}
		
		CallSpectralStorageGetDataWebserviceInitParameters initParams = new CallSpectralStorageGetDataWebserviceInitParameters();

		initParams.setSpectralStorageServerBaseURL( spectralStorageServiceBaseURL );

		CallSpectralStorageGetDataWebservice callSpectralStorageGetDataWebservice = CallSpectralStorageGetDataWebservice.getInstance();

		callSpectralStorageGetDataWebservice.init( initParams );
		
		Get_ScanDataFromScanNumbers_Response get_ScanDataFromScanNumber_Response =
				callSpectralStorageGetDataWebservice.call_Get_ScanDataFromScanNumbers_Webservice( get_ScanDataFromScanNumbers_Request );

		if ( get_ScanDataFromScanNumber_Response.getStatus_scanFileAPIKeyNotFound() 
				== Get_ScanData_ScanFileAPI_Key_NotFound.YES ) {
			String msg = "No data in Spectral Storage for API Key: " + scanFileAPIKey;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		if ( get_ScanDataFromScanNumber_Response.getTooManyScansToReturn() != null
				&& get_ScanDataFromScanNumber_Response.getTooManyScansToReturn() ) {
			
			String msg = "Tried to get data from Spectral Storage Service for too many scan numbers.  "
					+ " MaxScansToReturn: " + get_ScanDataFromScanNumber_Response.getMaxScansToReturn();
			log.error( msg );
			throw new LimelightInternalErrorException( msg );
		}
		
		List<SingleScan_SubResponse> scans = get_ScanDataFromScanNumber_Response.getScans();
		
		if ( scans == null ) {
			String msg = "Returned Scans property is null: Spectral Storage API Key: " + scanFileAPIKey;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		return scans;
	}
}
