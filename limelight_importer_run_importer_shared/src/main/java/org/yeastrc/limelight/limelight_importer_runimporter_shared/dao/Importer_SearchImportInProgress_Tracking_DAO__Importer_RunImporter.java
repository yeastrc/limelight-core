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
package org.yeastrc.limelight.limelight_importer_runimporter_shared.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * DAO for importer__search_import_in_progress_tracking_tbl table
 *
 * For Importer and Run Importer
 */
public class Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter {
	
	private static final Logger log = LoggerFactory.getLogger( Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.class );
	
	private static final Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter instance = new Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter();

	//  private constructor
	private Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter() { }
	
	/**
	 * @return Singleton instance
	 */
	public static Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter getSingletonInstance() { 
		return instance; 
	}
	
	private static final String INSERT_UPDATE_SQL = 
			"INSERT INTO importer__search_import_in_progress_tracking_tbl (search_id, importer_running_heart_beat_last_update)"
			+ "VALUES (?, NOW() )"
			+ " ON DUPLICATE KEY UPDATE importer_running_heart_beat_last_update = NOW()";
	
	/**
	 * @param searchId
	 * @throws Exception
	 */
	public void saveOrUpdate_ForSearchId( int searchId ) throws Exception {

		final String sql = INSERT_UPDATE_SQL;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, searchId );

				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			String msg = "Failed to insert/update importer__search_import_in_progress_tracking_tbl, searchId: " + searchId + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * 
	 * 
	 * @param searchId
	 * @throws Exception 
	 */
	public void delete_ForSearchId( int searchId ) throws Exception {

		final String DELETE_SQL = "DELETE FROM importer__search_import_in_progress_tracking_tbl WHERE search_id = ?";

		final String sql = DELETE_SQL;

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {


			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				int counter = 0;
				counter++;
				pstmt.setInt( counter, searchId );

				pstmt.executeUpdate();
			}

		} catch ( Exception e ) {
			log.error( "ERROR: delete_ForSearchId(...) searchId: " + searchId + ", sql: " + sql, e );
			throw e;
		}
	}

	/**
	 * Assumes any records with importer_running_heart_beat_last_update < some interval can be deleted
	 * 
	 * Executed to delete any entries no longer applicable
	 * 
	 * @throws Exception 
	 */
	public void delete_Entries_LastUpdatedAWhileAgo() throws Exception {

		final String DELETE_SQL = "DELETE FROM importer__search_import_in_progress_tracking_tbl WHERE importer_running_heart_beat_last_update <= NOW() - INTERVAL 4 DAY";

		final String sql = DELETE_SQL;

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {


			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.executeUpdate();
			}

		} catch ( Exception e ) {
			log.error( "ERROR: delete_Entries_LastUpdatedAWhileAgo(...)  sql: " + sql, e );
			throw e;
		}
	}
}
