package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response;

public interface SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF {

	/**
	 * Load Config file, Read OS Environment Variable, Read JVM -D property for:
	 *		directory to use for storing cached data
	 *      
	 * @return null if no properties file is found
	 */

	SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response get_SpectralStorageService_Connection_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup()
			throws Exception;

}