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
package org.yeastrc.limelight.limelight_feature_detection_run_import.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionRoot_ProjectScanFile_Mapping_DTO;

/**
 * table feature_detection_root__project_scnfl_mapping_tbl
 *
 */
public class FeatureDetectionRoot_ProjectScanFile_Mapping_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionRoot_ProjectScanFile_Mapping_DAO.class );
	
	private FeatureDetectionRoot_ProjectScanFile_Mapping_DAO() { }
	public static FeatureDetectionRoot_ProjectScanFile_Mapping_DAO getInstance() { return new FeatureDetectionRoot_ProjectScanFile_Mapping_DAO(); }


	
	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO feature_detection_root__project_scnfl_mapping_tbl "
					+ " ( feature_detection_root_id, project_scan_file_id, display_label, description, "
					+ " created_by_user_id, updated_by_user_id ) "
					+ "VALUES ( ?, ?, ?, ?, ?, ? )";
	
	/**
	 * @param itemList
	 * @throws Exception
	 */
	public void save( FeatureDetectionRoot_ProjectScanFile_Mapping_DTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			//  Insert 
			save( item, dbConnection );
		}
	}

	/**
	 * @param itemList
	 * @param dbConnection
	 * @throws Exception
	 */
	public void save( FeatureDetectionRoot_ProjectScanFile_Mapping_DTO item, Connection dbConnection ) throws Exception {

		final String insertSQL = INSERT_SQL;

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL, Statement.RETURN_GENERATED_KEYS ) ) {

			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getFeatureDetectionRootId() );
			counter++;
			pstmt.setInt( counter, item.getProjectScanFileId() );
			counter++;
			pstmt.setString( counter, item.getDisplayLabel() );
			counter++;
			pstmt.setString( counter, item.getDescription() );
			counter++;
			pstmt.setInt( counter, item.getCreatedBy_UserId() );
			counter++;
			pstmt.setInt( counter, item.getUpdatedBy_UserId() );

			pstmt.executeUpdate();
			

			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					int id =  rs.getInt( 1 );

					item.setId(id);
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert.  Failed to get assigned id " );
			}
			
		} catch ( Exception e ) {
			String msg = "Insert Fail: item: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}

	////////////////
	
	final String SET_TRUE_ENTRY_FULLY_INSERTED_SQL = 
			"UPDATE feature_detection_root_tbl "
			+ " SET entry_fully_inserted = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
			+ ", updated_by_user_id = ?, entry_fully_inserted_date_time = NOW() "
			+ " WHERE id = ? ";

	/**
	 * @param id
	 * @param userId
	 * @throws SQLException
	 */
	public void set_True_EntryFullyInserted( int id, int userId ) throws SQLException {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String updateSQL = SET_TRUE_ENTRY_FULLY_INSERTED_SQL;


		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( updateSQL ) ) {

				int counter = 0;
				counter++;
				pstmt.setInt( counter, userId );
				counter++;
				pstmt.setInt( counter, id );

				pstmt.executeUpdate();
			}

		} catch ( RuntimeException e ) {
			String msg = "Update Failed: set_True_FileFullyInserted(...): id: " + id + ", SQL: " + updateSQL;
			log.error( msg, e );
			throw e;
		}
	}
	
}
