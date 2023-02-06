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
package org.yeastrc.limelight.limelight_importer_runimporter_shared.import_and_pipeline_run.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;

/**
 * Do NOT use in Web App
 * 
 * table import_and_pipeline_run_tracking_run_tbl
 *
 */
public class FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO.class );
	
	//  private constructor
	private FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO() { }
	/**
	 * @return newly created instance
	 */
	public static FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO getInstance() { 
		return new FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO(); 
	}
	
	private static final String SAVE_SQL = "INSERT INTO import_and_pipeline_run_tracking_run_tbl ( "
			+ " import_and_pipeline_run_tracking_id, status_id,"
//			+ " current_run, "
			+ " last_updated_date_time )"
			+ " VALUES ( ?, ?, "
//			+  /* current_run_tbl */	Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
			+  /* last_updated_date_time */ " NOW() )";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void save( FileImportAndPipelineRunTrackingRunDTO item, Connection dbConnection ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = SAVE_SQL;

		try {
			pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS );
//			pstmt = dbConnection.prepareStatement( sql );
			
			int counter = 0;
			
			counter++;
			pstmt.setInt( counter, item.getFileImportAndPipelineRunTracking_Id() );
			counter++;
			pstmt.setInt( counter, item.getStatus().value() );
			
			pstmt.executeUpdate();
			
			rs = pstmt.getGeneratedKeys();

			if( rs.next() ) {
				item.setId( rs.getInt( 1 ) );
			} else {
				String msg = "Failed to insert FileImportAndPipelineRunTrackingRunDTO, generated key not found.";
				log.error( msg );
				throw new Exception( msg );
			}
		} catch ( Exception e ) {
			String msg = "Failed to insert FileImportAndPipelineRunTrackingRunDTO: " + item + ", sql: " + sql;
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
		final String sql = "UPDATE import_and_pipeline_run_tracking_run_tbl SET status = ?, last_updated_date_time = NOW() WHERE id = ?";
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
			 "UPDATE import_and_pipeline_run_tracking_run_tbl "
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
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void updateStatusResultTexts( FileImportAndPipelineRunTrackingRunDTO item ) throws Exception {

		Connection dbConnection = null;
		try {
			dbConnection = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			updateStatusResultTexts( item, dbConnection );
		} finally {
			if( dbConnection != null ) {
				try { dbConnection.close(); } catch( Throwable t ) { ; }
				dbConnection = null;
			}
		}
	}
		
	
	private static final String updateStatusResultTexts_SQL =
			"UPDATE import_and_pipeline_run_tracking_run_tbl "
					+ "SET status_id = ?, "
					+ " sub_status_id = ?, "
					+ " in_progress_end_user_display_message = ?, "
					+ " finished_sucess_end_user_display_message = ?, "
					+ " finished_success_pipeline_end_user_display_message = ?, "
					+ " finished_fail_end_user_display_message = ?, "
					+ " finished_fail_pipeline_end_user_display_message = ?, "
					+ " last_updated_date_time = NOW()"
					+ " WHERE id = ?";

//	CREATE TABLE IF NOT EXISTS `limelight`.`import_and_pipeline_run_tracking_run_tbl` (
//			  `id` INT UNSIGNED NOT NULL,
//			  `import_and_pipeline_run_tracking_id` INT UNSIGNED NOT NULL,
//			  `status_id` TINYINT UNSIGNED NOT NULL,
//	sub_status_id TINYINT UNSIGNED NULL,
//			  `record_insert_date_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//			  `last_updated_date_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//			  `in_progress_end_user_display_message` VARCHAR(4000) NULL,
//			  `finished_sucess_end_user_display_message` VARCHAR(4000) NULL,
//			  `finished_success_pipeline_end_user_display_message` VARCHAR(4000) NULL,
//			  `finished_fail_end_user_display_message` VARCHAR(4000) NULL,
//			  `finished_fail_pipeline_end_user_display_message` VARCHAR(4000) NULL,
//			  `result_data_format_version_number` INT NULL,
//			  `result_data` LONGTEXT NULL,
	
	/**
	 * @param item
	 * @param dbConnection
	 * @throws Exception
	 */
	public void updateStatusResultTexts( FileImportAndPipelineRunTrackingRunDTO item, Connection dbConnection ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = updateStatusResultTexts_SQL;
		try {
			pstmt = dbConnection.prepareStatement( sql );
			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getStatus().value() );
			counter++;
			if ( item.getSubStatus() != null ) {
				pstmt.setInt( counter, item.getSubStatus().value() );
			} else {
				pstmt.setNull(counter, java.sql.Types.INTEGER );
			}
			
			counter++;
			pstmt.setString( counter, item.getIn_progress_end_user_display_message() );
			counter++;
			pstmt.setString( counter, item.getFinished_sucess_end_user_display_message() );
			counter++;
			pstmt.setString( counter, item.getFinished_success_pipeline_end_user_display_message() );
			counter++;
			pstmt.setString( counter, item.getFinished_fail_end_user_display_message() );
			counter++;
			pstmt.setString( counter, item.getFinished_fail_pipeline_end_user_display_message() );

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
	
}
