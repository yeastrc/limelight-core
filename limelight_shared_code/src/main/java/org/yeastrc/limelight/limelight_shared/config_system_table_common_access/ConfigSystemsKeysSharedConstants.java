package org.yeastrc.limelight.limelight_shared.config_system_table_common_access;

import java.util.HashSet;
import java.util.Set;

public class ConfigSystemsKeysSharedConstants {


	//////   Any plain text inputs need to be added to textConfigKeys in the "static {}" at the bottom

	////  Limelight Spectal Storage Service Accept Import Base URL - For Importer to submit scan file for import
	////             URL used to communicate to Spectral Storage Service using Class CallSpectralStorageAcceptImportWebservice
	
	public static final String SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL =
			"spectral_storage_service_accept_import_base_url";

	////  Limelight Spectal Storage Service Base URL - 
	////             URL used to communicate to Spectral Storage Service using Class CallSpectralStorageWebservice
	
	public static final String SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL = 
			"spectral_storage_service_get_data_base_url";

	////  Limelight Blib Spectal Library File Creation
	
	////       Web Service Base URL - 
	////             URL used to communicate to Spectral Storage Service using Class CallSpectralStorageWebservice
	
	public static final String BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL = 
			"blib_spectral_library_file_creation_web_service_base_url";

	////       Directory Base Path Result Files are written to ('BLIB_DIR' variable used by Blib service):  
	
	public static final String BLIB_SPECTRAL_LIBRARY_FILE_RESULT_FILE_BASE_PATH = 
			"blib_spectral_library_file_result_file_base_path";
	
	
	
	
	////  Limelight XML File Import Set Up keys

	public static final String file_import_limelight_xml_scans_TEMP_DIR_KEY = "file_import_limelight_xml_scans_temp_dir";

	public static final String SCAN_FILE_IMPORT_ALLOWED_VIA_WEB_SUBMIT_KEY = "scan_file_import_allowed_via_web_submit";

	////              Delete uploaded files after Import key  -  Specific Values allowed

	/**
	 * Delete Successful import at end of import.  Delete failed import after 3 days
	 */
	public static final String IMPORT_DELETE_UPLOADED_FILES = "import_delete_uploaded_files_after_import";

	////              Delete uploaded files after Import key  -  Specific Values allowed

	/**
	 * Delete successful and failed import after 3 days, using file_import_tracking_tbl.last_updated_date_time and status of success or fail
	 */
	public static final String IMPORT_DELETE_UPLOADED_FILES__ALL_AFTER_3_DAYS = "import_delete_uploaded_files_after_import__all_after_3_days";

	////              Terms of Service Enabled key  -  Specific Values allowed

	public static final String TERMS_OF_SERVICE_ENABLED = "terms_of_service_enabled";




	//   Lists of config keys for validation on save
	
	public static final Set<String> textConfigKeys = new HashSet<>();
	
	static {
		textConfigKeys.add( SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL );
		textConfigKeys.add( SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL );
		textConfigKeys.add( file_import_limelight_xml_scans_TEMP_DIR_KEY );
		textConfigKeys.add( SCAN_FILE_IMPORT_ALLOWED_VIA_WEB_SUBMIT_KEY );
		textConfigKeys.add( BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL );
		textConfigKeys.add( BLIB_SPECTRAL_LIBRARY_FILE_RESULT_FILE_BASE_PATH );
	}
}
