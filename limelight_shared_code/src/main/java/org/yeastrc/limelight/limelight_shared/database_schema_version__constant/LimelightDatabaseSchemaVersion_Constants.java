package org.yeastrc.limelight.limelight_shared.database_schema_version__constant;

/**
 * 
 *
 */
public class LimelightDatabaseSchemaVersion_Constants {

	/**
	 * The CURRENT Database schema version the code in this REPO is coded to 
	 */
	public static final int DATABASE_SCHEMA_VERSION__CURRENT = 7;
	
	
	/////////
	
	//  Other Info 
	
	/**
	 * The Database version when the database schema version table 'aa_limelight_database_version_tbl' does NOT exist OR there is NO entry in the table for the label string.
	 */
	public static final int DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE__OR__NO_RECORD_IN_TABLE_FOR_LABEL_STRING = 2;
	
	
	//  DB table 'label' field values
	
	public static final String DATABASE_VERSION_TABLE__ROW_LABEL__CURRENT_VERSION = "DB Version Current";
	
	public static final String DATABASE_VERSION_TABLE__ROW_LABEL__IN_PROGRESS = "DB Version In Progress";
	
	
	
	
	// Used by Importer
	
	public static final String DATABASE_CURRENT_VERSION__CODE_GREATER_THAN_DATABASE__IMPORTER__ERROR_MESSAGE = 
			
			"The database version is behind the version for the importer. The Limelight administrator must upgrade the database to match.";
	
	public static final String DATABASE_CURRENT_VERSION__CODE_LESS_THAN_DATABASE__IMPORTER__ERROR_MESSAGE =
			
			"The database version is ahead of the version for the importer. The Limelight administrator must upgrade the importer to match the version of the database.";
	
	// Used by Run Importer

	public static final String DATABASE_CURRENT_VERSION__CODE_GREATER_THAN_DATABASE__RUN_IMPORTER__ERROR_MESSAGE = 
			
			"The database version is behind the version for the importer and run importer. The Limelight administrator must upgrade the database to match.";
	
	public static final String DATABASE_CURRENT_VERSION__CODE_LESS_THAN_DATABASE__RUN_IMPORTER__ERROR_MESSAGE =
			
			"The database version is ahead of the version for the importer. The Limelight administrator must upgrade the importer and run importer to match the version of the database.";
	

	public static final String DATABASE_UPGRADE_IN_PROGRESS_VERSION__MISMATCH_VERSION_NUMBERS__ERROR_MESSAGE =
			
			"Database updates in progress.";
			
			
}
