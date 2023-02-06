/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_importer_runimporter_shared.database_version_info_retrieval_compare;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.exceptions.LimelightImporterRunImporterDBInternalException;
import org.yeastrc.limelight.limelight_shared.database_schema_version__constant.LimelightDatabaseSchemaVersion_Constants;

/**
 * Get Limelight Database schema version from table and compare to current version in 
 *
 * For Importer and Run Importer
 */
public class Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode {
	
	private static final Logger log = LoggerFactory.getLogger( Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.class );
	
	/**
	 * Returned value
	 *
	 */
	public static enum LimelightDatabaseSchemaVersion_Comparison_Result {
		
		SAME,
		CODE_LESS_THAN_DATABASE,
		CODE_GREATER_THAN_DATABASE
	}
	
	/**
	 * Should the Exception be logged
	 *
	 */
	public static enum Log_Exception_YN { YES, NO }

	//  private constructor
	private Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode() { }
	
	/**
	 * @return newly created instance
	 */
	public static Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode getInstance() { 
		return new Importer_RunImporter_Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode(); 
	}
	
	/**
	 * For CURRENT Version of Schema Version in table for row with label: DATABASE_VERSION_TABLE__ROW_LABEL__CURRENT_VERSION
	 * 
	 * @throws Exception
	 */
	public LimelightDatabaseSchemaVersion_Comparison_Result getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result( Log_Exception_YN log_Exception_YN ) throws Exception {


		Integer versionNumber = null;
				
		final String sql = "SELECT limelight_database_version_number FROM aa_limelight_database_version_tbl WHERE row_Label = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

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
		} catch ( LimelightImporterRunImporterDBInternalException e ) {
			
			throw e; // Simply rethrow
			
		} catch ( Exception exception_MainSelect ) {
			
			//  Exception MAY be because the table aa_limelight_database_version_tbl does NOT exist, 
			//		which would mean the database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
			
			try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

				try ( PreparedStatement pstmt = dbConnection.prepareStatement( "SELECT * FROM config_system_tbl LIMIT 1" ) ) {

					try ( ResultSet rs = pstmt.executeQuery() ) {

						//  Retrieval from config_system_tbl successful.  
						
						//    SO database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
						
						versionNumber = LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE__OR__NO_RECORD_IN_TABLE_FOR_LABEL_STRING;
					}
				}

			} catch ( Exception exception_OtherTableSelect ) {
			
				//  Other table ('config_system_tbl') which has existed since start of Limelight project 
				//    also fails to query so there must a problem with SQL access so just rethrow the mainSelect exception
				
				if ( log_Exception_YN == Log_Exception_YN.YES ) {
					String msg = "Failed to select database version: sql: " + sql;
					log.error( msg, exception_MainSelect );
				}
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

	/**
	 * For Update In Progress Version of Schema Version in table for row with label: DATABASE_VERSION_TABLE__ROW_LABEL__IN_PROGRESS
	 * 
	 * @throws Exception
	 */
	public LimelightDatabaseSchemaVersion_Comparison_Result getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result( Log_Exception_YN log_Exception_YN ) throws Exception {


		Integer versionNumber = null;
				
		final String sql = "SELECT limelight_database_version_number FROM aa_limelight_database_version_tbl WHERE row_Label = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

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
		} catch ( LimelightImporterRunImporterDBInternalException e ) {
			
			throw e; // Simply rethrow
			
		} catch ( Exception exception_MainSelect ) {
			
			//  Exception MAY be because the table aa_limelight_database_version_tbl does NOT exist, 
			//		which would mean the database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
			
			try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

				try ( PreparedStatement pstmt = dbConnection.prepareStatement( "SELECT * FROM config_system_tbl LIMIT 1" ) ) {

					try ( ResultSet rs = pstmt.executeQuery() ) {

						//  Retrieval from config_system_tbl successful so  database version is == DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE (2)
						
						versionNumber = LimelightDatabaseSchemaVersion_Constants.DATABASE_SCHEMA_VERSION__WHEN_NO_DATABASE_VERSION_TABLE__OR__NO_RECORD_IN_TABLE_FOR_LABEL_STRING;
					}
				}

			} catch ( Exception exception_OtherTableSelect ) {
			
				//  Other table ('config_system_tbl') which has existed since start of Limelight project 
				//    also fails to query so there must a problem with SQL access so just rethrow the mainSelect exception
				
				if ( log_Exception_YN == Log_Exception_YN.YES ) {
					String msg = "Failed to select database version: sql: " + sql;
					log.error( msg, exception_MainSelect );
				}
				
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
