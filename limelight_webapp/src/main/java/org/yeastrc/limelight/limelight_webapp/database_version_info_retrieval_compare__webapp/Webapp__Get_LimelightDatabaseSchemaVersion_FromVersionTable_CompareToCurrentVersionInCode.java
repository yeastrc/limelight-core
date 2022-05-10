package org.yeastrc.limelight.limelight_webapp.database_version_info_retrieval_compare__webapp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.database_schema_version__constant.LimelightDatabaseSchemaVersion_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;


/**
 * Get Limelight Database schema version from table and compare to current version in 
 * 
 * For Webapp
 *
 */
@Component
public class Webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode extends Limelight_JDBC_Base implements Webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode_IF {

	private static final Logger log = LoggerFactory.getLogger( Webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.class );
	

	/**
	 * Returned value
	 *
	 */
	public static enum LimelightDatabaseSchemaVersion_Comparison_Result {
		
		SAME,
		CODE_LESS_THAN_DATABASE,
		CODE_GREATER_THAN_DATABASE
	}
	

	/* 
	 * For CURRENT Version of Schema Version in table for row with label: DATABASE_VERSION_TABLE__ROW_LABEL__CURRENT_VERSION
	 */
	@Override
	public LimelightDatabaseSchemaVersion_Comparison_Result getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result() throws Exception {


		Integer versionNumber = null;
				
		final String sql = "SELECT limelight_database_version_number FROM aa_limelight_database_version_tbl WHERE row_Label = ?";
		
		try ( Connection dbConnection = super.getDBConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setString( 1, LimelightDatabaseSchemaVersion_Constants.DATABASE_VERSION_TABLE__ROW_LABEL__CURRENT_VERSION );

				try ( ResultSet rs = pstmt.executeQuery() ) {

					if( rs.next() ) {
						
						//  Record found in database

						int versionNumber__FromTable = rs.getInt( "limelight_database_version_number" );
						
						if ( ! rs.wasNull() ) {
							
							//  Entry in table so copy to variable versionNumber
							
							versionNumber = versionNumber__FromTable;
							
						} else {

							//  No entry in table for label.  
							
							//    SO database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
							
							versionNumber = LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE__OR__NO_RECORD_IN_TABLE_FOR_LABEL_STRING;
						
						}
					} else {
						
						//  NO Record found in database for label
						
						//    SO database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
						
						versionNumber = LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE__OR__NO_RECORD_IN_TABLE_FOR_LABEL_STRING;
					}
				}
			}
		} catch ( LimelightDatabaseException e ) {
			
			throw e; // Simply rethrow
			
		} catch ( Exception exception_MainSelect ) {
			
			//  Exception MAY be because the table aa_limelight_database_version_tbl does NOT exist, 
			//		which would mean the database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
			
			try ( Connection dbConnection = super.getDBConnection() ) {

				try ( PreparedStatement pstmt = dbConnection.prepareStatement( "SELECT * FROM config_system_tbl LIMIT 1" ) ) {

					try ( ResultSet rs = pstmt.executeQuery() ) {

						//  Retrieval from config_system_tbl successful so  database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
						
						versionNumber = LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE__OR__NO_RECORD_IN_TABLE_FOR_LABEL_STRING;
					}
				}

			} catch ( Exception exception_OtherTableSelect ) {
			
				//  Other table ('config_system_tbl') which has existed since start of Limelight project 
				//    also fails to query so there must a problem with SQL access so just rethrow the mainSelect exception
				
				String msg = "Failed to select database version: sql: " + sql;
				log.error( msg, exception_MainSelect );
				throw exception_MainSelect;
			}
		}
		
		if ( versionNumber == LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__CURRENT ) {
			
			return LimelightDatabaseSchemaVersion_Comparison_Result.SAME;
		
		} else if ( versionNumber < LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__CURRENT ) {
			
			return LimelightDatabaseSchemaVersion_Comparison_Result.CODE_GREATER_THAN_DATABASE;
		}
		
		return LimelightDatabaseSchemaVersion_Comparison_Result.CODE_LESS_THAN_DATABASE;
	}


	/* 
	 * 
	 * For Update In Progress Version of Schema Version in table for row with label: DATABASE_VERSION_TABLE__ROW_LABEL__IN_PROGRESS
	 */
	@Override
	public LimelightDatabaseSchemaVersion_Comparison_Result getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result() throws Exception {


		Integer versionNumber = null;
				
		final String sql = "SELECT limelight_database_version_number FROM aa_limelight_database_version_tbl WHERE row_Label = ?";
		
		try ( Connection dbConnection = super.getDBConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setString( 1, LimelightDatabaseSchemaVersion_Constants.DATABASE_VERSION_TABLE__ROW_LABEL__IN_PROGRESS );

				try ( ResultSet rs = pstmt.executeQuery() ) {

					if( rs.next() ) {
						
						//  Record found in database

						int versionNumber__FromTable = rs.getInt( "limelight_database_version_number" );
						
						if ( ! rs.wasNull() ) {
							
							//  Entry in table so copy to variable versionNumber
							
							versionNumber = versionNumber__FromTable;
							
						} else {

							//  No entry in table for label.  
							
							//    SO database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
							
							versionNumber = LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE__OR__NO_RECORD_IN_TABLE_FOR_LABEL_STRING;
						
						}
					} else {
						
						//  NO Record found in database for label
						
						//    SO database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
						
						versionNumber = LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE__OR__NO_RECORD_IN_TABLE_FOR_LABEL_STRING;
					}
				}
			}
		} catch ( LimelightDatabaseException e ) {
			
			throw e; // Simply rethrow
			
		} catch ( Exception exception_MainSelect ) {
			
			//  Exception MAY be because the table aa_limelight_database_version_tbl does NOT exist, 
			//		which would mean the database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
			
			try ( Connection dbConnection = super.getDBConnection() ) {

				try ( PreparedStatement pstmt = dbConnection.prepareStatement( "SELECT * FROM config_system_tbl LIMIT 1" ) ) {

					try ( ResultSet rs = pstmt.executeQuery() ) {

						//  Retrieval from config_system_tbl successful so  database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
						
						versionNumber = LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE__OR__NO_RECORD_IN_TABLE_FOR_LABEL_STRING;
					}
				}

			} catch ( Exception exception_OtherTableSelect ) {
			
				//  Other table ('config_system_tbl') which has existed since start of Limelight project 
				//    also fails to query so there must a problem with SQL access so just rethrow the mainSelect exception
				
				String msg = "Failed to select database version: sql: " + sql;
				log.error( msg, exception_MainSelect );
				throw exception_MainSelect;
			}
		}
		
		if ( versionNumber == LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__CURRENT ) {
			
			return LimelightDatabaseSchemaVersion_Comparison_Result.SAME;
		
		} else if ( versionNumber < LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__CURRENT ) {
			
			return LimelightDatabaseSchemaVersion_Comparison_Result.CODE_GREATER_THAN_DATABASE;
		}
		
		return LimelightDatabaseSchemaVersion_Comparison_Result.CODE_LESS_THAN_DATABASE;
	}
	
}
