package org.yeastrc.limelight.limelight_feature_detection_run_import.config;

import org.apache.commons.lang3.StringUtils;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;

public class GetFeatureDetectionConfigFromConfigTable {
	
	/**
	 * @return
	 * @throws Exception
	 */
	public static boolean fullyConfigured_FeatureDetection() throws Exception {
		
		String RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH =
				get_RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH();
		
		String RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL =
				get_RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL();
		
		if ( StringUtils.isNotEmpty(RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL) 
				&& StringUtils.isNotEmpty(RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH) ) {
			return true;
		}
		
		return false;
	}

	/**
	 * @return
	 * @throws Exception
	 */
	public static String get_RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH() throws Exception {

		return
				ConfigSystemDAO_Importer.getInstance()
				.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH );
	}
	
	/**
	 * @return
	 * @throws Exception
	 */
	public static String get_RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL() throws Exception {

		return
				ConfigSystemDAO_Importer.getInstance()
				.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL );
	}
	
}
