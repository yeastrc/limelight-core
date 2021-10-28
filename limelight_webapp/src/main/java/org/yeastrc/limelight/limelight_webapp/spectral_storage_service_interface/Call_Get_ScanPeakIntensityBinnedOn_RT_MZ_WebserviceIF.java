package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

public interface Call_Get_ScanPeakIntensityBinnedOn_RT_MZ_WebserviceIF {

	/**
	 * @param scanFileAPIKey
	 * @return
	 * @throws Exception
	 */
	byte[] getScanPeakIntensityBinnedOn_RT_MZ_Bytes_GZIPed__FromSpectralStorageService(String scanFileAPIKey)
			throws Exception;

}