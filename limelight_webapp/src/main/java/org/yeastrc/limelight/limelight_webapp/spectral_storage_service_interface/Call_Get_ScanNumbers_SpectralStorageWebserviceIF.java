package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import java.util.List;

public interface Call_Get_ScanNumbers_SpectralStorageWebserviceIF {

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

	List<Integer> getScanNumbersFromSpectralStorageService(List<Integer> scanLevelsToInclude,
			List<Integer> scanLevelsToExclude, String scanFileAPIKey) throws Exception;

}