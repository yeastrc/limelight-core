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
	////             URL used to communicate to Blib File Creation Service
	
	public static final String BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL = 
			"blib_spectral_library_file_creation_web_service_base_url";

	////       Directory Base Path Result Files are written to ('BLIB_DIR' variable used by Blib service):  
	
	public static final String BLIB_SPECTRAL_LIBRARY_FILE_RESULT_FILE_BASE_PATH = 
			"blib_spectral_library_file_result_file_base_path";
	
	

	////  Limelight Run Feature Detection Service - Run Hardklor/Bullseye 
	
	////       Web Service Base URL - 
	////             URL used to communicate to Feature Detection Run Service - Run Hardklor/Bullseye
	
	public static final String RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL = 
			"run_feature_detection_service_run_hardklor_bullseye_web_service_base_url";

	////       Directory Base Path Result Files are written to ('HOST_MACHINE_FINAL_DIR' variable used by service):  
	
	public static final String RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH = 
			"run_feature_detection_service_run_hardklor_bullseye_result_files_base_path";
	


	////  Limelight Store imported files like FASTA file on YRC File Object Storage
	
	////       Web Service Base URL - 
	////             URL used to communicate to YRC File Object Storage
	
	public static final String YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL = 
			"yrc_file_object_storage_web_service_base_url";

	
	
	////  Limelight XML File Import Set Up keys

	public static final String file_import_limelight_xml_scans_TEMP_DIR_KEY = "file_import_limelight_xml_scans_temp_dir";

	public static final String file_import_limelight_xml_scans_AWS_S3_BUCKET_KEY = "file_import_limelight_xml_scans_aws_s3_bucket";

	public static final String file_import_limelight_xml_scans_AWS_S3_REGION_KEY = "file_import_limelight_xml_scans_aws_s3_region";

	public static final String SCAN_FILE_IMPORT_ALLOWED_VIA_WEB_SUBMIT_KEY = "scan_file_import_allowed_via_web_submit";

	public static final String SCAN_FILE_SAVED_TO_FILE_OBJECT_STORAGE_KEY = "scan_file_save_to_file_object_storage";
	
	public static final String SCAN_FILE_DOWNLOAD_FROM_FILE_OBJECT_STORAGE_ALLOWED_KEY = "scan_file_download_from_file_object_storage_allowed";


	public static final String LIMELIGHT_XML_FILE_MAX_FILE_SIZE_IN_GB_KEY = "limelight_xml_file_max_file_size_in_gb";

	public static final String FASTA_FILE_MAX_FILE_SIZE_IN_GB_KEY = "fasta_file_max_file_size_in_gb";

	public static final String SCAN_FILE_MAX_FILE_SIZE_IN_GB_KEY = "scan_file_max_file_size_in_gb";
	
	public static final String GENERIC_OTHER_FILE_MAX_FILE_SIZE_IN_GB_KEY = "generic_other_file_max_file_size_in_gb";

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
		
		textConfigKeys.add( LIMELIGHT_XML_FILE_MAX_FILE_SIZE_IN_GB_KEY );
		textConfigKeys.add( FASTA_FILE_MAX_FILE_SIZE_IN_GB_KEY );
		textConfigKeys.add( SCAN_FILE_MAX_FILE_SIZE_IN_GB_KEY );
		textConfigKeys.add( GENERIC_OTHER_FILE_MAX_FILE_SIZE_IN_GB_KEY );
		
		textConfigKeys.add( file_import_limelight_xml_scans_AWS_S3_BUCKET_KEY );
		textConfigKeys.add( file_import_limelight_xml_scans_AWS_S3_REGION_KEY );

		textConfigKeys.add( SCAN_FILE_IMPORT_ALLOWED_VIA_WEB_SUBMIT_KEY );
		textConfigKeys.add( SCAN_FILE_SAVED_TO_FILE_OBJECT_STORAGE_KEY );
		textConfigKeys.add( SCAN_FILE_DOWNLOAD_FROM_FILE_OBJECT_STORAGE_ALLOWED_KEY );
		
		textConfigKeys.add( BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL );
		textConfigKeys.add( BLIB_SPECTRAL_LIBRARY_FILE_RESULT_FILE_BASE_PATH );
		
		textConfigKeys.add( RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL );
		textConfigKeys.add( RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH );
		
		textConfigKeys.add( YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL );
	}
}
