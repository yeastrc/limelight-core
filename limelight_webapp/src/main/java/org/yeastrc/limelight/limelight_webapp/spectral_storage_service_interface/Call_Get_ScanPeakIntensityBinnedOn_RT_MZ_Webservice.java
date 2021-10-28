package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.exceptions.YRCSpectralStorageGetDataWebserviceCallErrorException;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanPeakIntensityBinnedOn_RT_MZ_Request;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebservice;

@Component
public class Call_Get_ScanPeakIntensityBinnedOn_RT_MZ_Webservice implements Call_Get_ScanPeakIntensityBinnedOn_RT_MZ_WebserviceIF {

    private static final Logger log = LoggerFactory.getLogger( Call_Get_ScanPeakIntensityBinnedOn_RT_MZ_Webservice.class );

	//   Bin size of 1 is only supported bin size currently
	
	private static final long RETENTION_TIME_BIN_SIZE = 1; // in seconds
	private static final long MZ_BIN_SIZE = 1;             // in m/z

    @Autowired
    private CallSpectralStorageWebservice_ForThisApp_FactoryIF callSpectralStorageWebservice_ForThisApp_Factory;


    /**
     * Returns JSON in byte[] that is GZIPed
     * 
	 * @param scanFileAPIKey
	 * @return
	 * @throws Exception
	 */
	@Override
	public byte[] getScanPeakIntensityBinnedOn_RT_MZ_Bytes_GZIPed__FromSpectralStorageService(String scanFileAPIKey) throws Exception {

        CallSpectralStorageGetDataWebservice callSpectralStorageWebservice =
                callSpectralStorageWebservice_ForThisApp_Factory.getCallSpectralStorageWebservice();

		Get_ScanPeakIntensityBinnedOn_RT_MZ_Request webserviceRequest = new Get_ScanPeakIntensityBinnedOn_RT_MZ_Request();
		webserviceRequest.setScanFileAPIKey( scanFileAPIKey );
		webserviceRequest.setRetentionTimeBinSize( RETENTION_TIME_BIN_SIZE );
		webserviceRequest.setMzBinSize( MZ_BIN_SIZE );
		
		byte[] serverResponseBytes = null;
		try {
			serverResponseBytes =
				callSpectralStorageWebservice.call_Get_ScanPeakIntensityBinnedOn_RT_MZ_Webservice( webserviceRequest );
		
		} catch ( YRCSpectralStorageGetDataWebserviceCallErrorException e ) {
			
			throw e;
		}

		if ( serverResponseBytes == null ) {
			
			String msg = "No data in Spectral Storage for API Key: " + scanFileAPIKey;
			log.error( msg );
			throw new LimelightInternalErrorException( msg );
		}
		
		//  Optional to use

//		MS1_IntensitiesBinnedSummedMapRoot ms1_IntensitiesBinnedSummedMapRoot =
//				CallSpectralStorageGetDataWebservice_JSON_Parse_Helper.getInstance()
//				.deserialize_unGzip_Get_ScanPeakIntensityBinnedOn_RT_MZ_Response( serverResponseBytes );
		
		
        return serverResponseBytes;
    }
}
