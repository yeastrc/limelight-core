package org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.constants;

/**
 * For Uploaded files, the 'file_type_id' in table 'import_and_pipeline_run_tracking_single_file_tbl'
 * 
 * Filenames written to disk for uploads.  For Import or Run Feature Detection in the Limelight Importer directory
 *
 */
public class FeatureDetection_HardklorBullseye_Upload_FileTypeIdsInDB_FilenamesOnDisk_Constants {

	public static final int HARDKLOR_CONF_FILE_FILE_TYPE_ID = 1;
	public static final int HARDKLOR_RESULT_FILE_FILE_TYPE_ID = 2;
	
	public static final int BULLSEYE_CONF_FILE_FILE_TYPE_ID  = 3;
	public static final int BULLSEYE_RESULT_FILE_FILE_TYPE_ID  = 4;
	
	
	public static final String HARDKLOR_CONF_FILE_FILENAME = "Hardklor.conf";
	public static final String HARDKLOR_RESULT_FILE_FILENAME = "Hardklor.results";
	
	public static final String BULLSEYE_CONF_FILE_FILENAME = "Bullseye.conf";
	public static final String BULLSEYE_RESULT_FILE_FILENAME = "Bullseye.results";
}

