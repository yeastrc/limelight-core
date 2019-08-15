package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

public interface Call_Get_MS2CountFromAPIKey_SpectralStorageWebserviceIF {

    /**
     * Get the number of ms2 scans in the given scan file using this scanFileAPIKey
     * @param scanFileAPIKey
     * @return
     * @throws Exception
     */
    Integer getMS2CountFromAPIKey(String scanFileAPIKey) throws Exception;

}
