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
package org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * Do NOT use in Web App
 * 
 * table file_import_tracking_run_tbl
 *
 */
public class FileImportTrackingRun_Importer_RunImporter_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingRun_Importer_RunImporter_DAO.class );
	
	//  private constructor
	private FileImportTrackingRun_Importer_RunImporter_DAO() { }
	/**
	 * @return newly created instance
	 */
	public static FileImportTrackingRun_Importer_RunImporter_DAO getInstance() { 
		return new FileImportTrackingRun_Importer_RunImporter_DAO(); 
	}
	
	private static final String SAVE_SQL = "INSERT INTO file_import_tracking_run_tbl ( "
			+ " file_import_tracking_id, status_id,"
			+ " current_run, "
			+ " last_updated_date_time )"
			+ " VALUES ( ?, ?, "
			+  /* current_run_tbl */	Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
			+  /* last_updated_date_time */ " , NOW() )";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void save( FileImportTrackingRunDTO item, Connection dbConnection ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = SAVE_SQL;

		try {
			pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS );
//			pstmt = dbConnection.prepareStatement( sql );
			
			int counter = 0;
			
			counter++;
			pstmt.setInt( counter, item.getFileImportTrackingId() );
			counter++;
			pstmt.setInt( counter, item.getRunStatus().value() );
			
			pstmt.executeUpdate();
			
			rs = pstmt.getGeneratedKeys();

			if( rs.next() ) {
				item.setId( rs.getInt( 1 ) );
			} else {
				String msg = "Failed to insert FileImportTrackingRunDTO, generated key not found.";
				log.error( msg );
				throw new Exception( msg );
			}
		} catch ( Exception e ) {
			String msg = "Failed to insert FileImportTrackingRunDTO: " + item + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		} finally {
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
			}
			if( pstmt != null ) {
				try { pstmt.close(); } catch( Throwable t ) { ; }
				pstmt = null;
			}
		}
	}

	/**
	 * @param status
	 * @param id
	 * @throws Exception
	 */
	public void updateStatus( FileImportStatus status, int id ) throws Exception {
		Connection dbConnection = null;
		try {
			dbConnection = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			updateStatus( status, id, dbConnection );
		} finally {
			if( dbConnection != null ) {
				try { dbConnection.close(); } catch( Throwable t ) { ; }
				dbConnection = null;
			}
		}
	}
	/**
	 * @param status
	 * @param id
	 * @throws Exception
	 */
	public void updateStatus( FileImportStatus status, int id, Connection dbConnection ) throws Exception {
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = "UPDATE file_import_tracking_run_tbl SET status = ?, last_updated_date_time = NOW() WHERE id = ?";
		try {
			pstmt = dbConnection.prepareStatement( sql );
			int counter = 0;
			counter++;
			pstmt.setInt( counter, status.value() );
			counter++;
			pstmt.setInt( counter, id );
			pstmt.executeUpdate();
		} catch ( Exception e ) {
			String msg = "Failed to update status, sql: " + sql;
			log.error( msg, e );
			throw e;
		} finally {
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
			}
			if( pstmt != null ) {
				try { pstmt.close(); } catch( Throwable t ) { ; }
				pstmt = null;
			}
		}
	}
	
	private static final String updateClearCurrentRunForTrackingId_SQL =
			 "UPDATE file_import_tracking_run_tbl "
						+ "SET current_run = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE
						+ " WHERE file_import_tracking_id = ?";
	/**
	 * @param trackingId
	 * @throws Exception
	 */
	public void updateClearCurrentRunForTrackingId( int trackingId, Connection dbConnection ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = updateClearCurrentRunForTrackingId_SQL;
		try {
			pstmt = dbConnection.prepareStatement( sql );
			int counter = 0;
			counter++;
			pstmt.setInt( counter, trackingId );
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			String msg = "Failed updateClearCurrentRunForTrackingId(id), trackingId: " + trackingId + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		} finally {
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
			}
			if( pstmt != null ) {
				try { pstmt.close(); } catch( Throwable t ) { ; }
				pstmt = null;
			}
		}
	}
	
	private static final String updateStatusResultTexts_SQL =
			"UPDATE file_import_tracking_run_tbl "
					+ "SET status_id = ?, importer_sub_status_id = ?, import_result_text = ?, data_error_text = ?, "
					+ " last_updated_date_time = NOW() WHERE id = ?";

	/**
	 * @param status
	 * @param id
	 * @throws Exception
	 */
	public void updateStatusResultTexts( FileImportTrackingRunDTO item, Connection dbConnection ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = updateStatusResultTexts_SQL;
		try {
			pstmt = dbConnection.prepareStatement( sql );
			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getRunStatus().value() );
			counter++;
			if ( item.getRunSubStatus() != null ) {
				pstmt.setInt( counter, item.getRunSubStatus().value() );
			} else {
				pstmt.setNull(counter, java.sql.Types.INTEGER );
			}
			counter++;
			pstmt.setString( counter, item.getImportResultText() );
			counter++;
			pstmt.setString( counter, item.getDataErrorText() );
			counter++;
			pstmt.setInt( counter, item.getId() );
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			String msg = "Failed updateStatusResultTexts(item), item: " + item + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		} finally {
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
			}
			if( pstmt != null ) {
				try { pstmt.close(); } catch( Throwable t ) { ; }
				pstmt = null;
			}
		}
	}
	


	/**
	 * @param item
	 * @throws Exception
	 */
	public void updateInsertedSearchId( FileImportTrackingRunDTO item ) throws Exception {
		
		Connection dbConnection = null;
		try {
			dbConnection = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			updateInsertedSearchId( item, dbConnection );
		} finally {
			if( dbConnection != null ) {
				try { dbConnection.close(); } catch( Throwable t ) { ; }
				dbConnection = null;
			}
		}
	}

	/**
	 * @param item
	 * @param dbConnection
	 * @throws Exception
	 */
	public void updateInsertedSearchId( FileImportTrackingRunDTO item, Connection dbConnection ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = "UPDATE file_import_tracking_run_tbl SET inserted_search_id  = ? WHERE id = ?";
		
		try {
			pstmt = dbConnection.prepareStatement( sql );
			
			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getInsertedSearchId() );
			counter++;
			pstmt.setInt( counter, item.getId() );
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			String msg = "Failed to update inserted_search_id, sql: " + sql;
			log.error( msg, e );
			throw e;
		} finally {
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
			}
			if( pstmt != null ) {
				try { pstmt.close(); } catch( Throwable t ) { ; }
				pstmt = null;
			}
		}
	}
	

	/**
	 * Get the search id for the supplied id from the database. 
	 * @param id
	 * @return null if not found
	 * @throws Exception
	 */
	public Integer getSearchId_ForId( int id ) throws Exception {

		Integer searchId = null;
		
		final String sql = "SELECT inserted_search_id FROM file_import_tracking_run_tbl WHERE id = ? ORDER BY id LIMIT 1";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, id );

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						
						int fieldValue = rs.getInt( 1 );
						
						if ( ! rs.wasNull() ) {
							searchId = fieldValue;
						}
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getSearchId_ForId(...) sql: " + sql, e );
			throw e;
		}
		
		return searchId;
	}

	
}
