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
package org.yeastrc.limelight.limelight_run_importer.dao;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.populate_dto_from_result.FileImportTracking_PopulateDTO;

/**
 * 
 *
 */
public class FileImportTracking_For_ImporterRunner_DAO {

	private static final Logger log = LoggerFactory.getLogger( FileImportTracking_For_ImporterRunner_DAO.class );

	//  private constructor
	private FileImportTracking_For_ImporterRunner_DAO() { }
	
	/**
	 * @return newly created instance
	 */
	public static FileImportTracking_For_ImporterRunner_DAO getInstance() { 
		return new FileImportTracking_For_ImporterRunner_DAO(); 
	}
	
	
	private static final String GET_NEXT_QUEUED_SQL = 
			
			"SELECT * FROM file_import_tracking_tbl "
			+ " WHERE status_id IN ( " 
			+ 		FileImportStatus.QUEUED.value()
			+	  "," + FileImportStatus.RE_QUEUED.value()
			+ 	") AND marked_for_deletion != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
			+   " AND priority <= ? "
			+ " ORDER BY priority, ID LIMIT 1 FOR UPDATE";

	/**
	 * Get next import tracking item that is queued or re-queued
	 * @return
	 * @throws Exception
	 */
	public FileImportTrackingDTO getNextQueued( int maxPriority, Connection dbConnection ) throws Exception {


		FileImportTrackingDTO result = null;
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		final String sql = GET_NEXT_QUEUED_SQL;
		
		
		try {
			
			pstmt = dbConnection.prepareStatement( sql );
			
			pstmt.setInt( 1, maxPriority );
			
			rs = pstmt.executeQuery();
			
			if ( rs.next() ) {
				
				result = FileImportTracking_PopulateDTO.getInstance().populateResultObject( rs );
			}
			
		} catch ( Exception e ) {
			
			String msg = "Failed to select FileImportTrackingDTO, sql: " + sql;
			
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
		
		return result;
	}
	
	//////
	


	private static final String GET_ALL_ID_SQL = 
			
			"SELECT id FROM file_import_tracking_tbl ";

	/**
	 * Get ALL import tracking item id list
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getAll_TrackingId_InTable_List() throws Exception {


		List<Integer> results = new ArrayList<>( 100000 );

		final String sql = GET_ALL_ID_SQL;


		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				try ( ResultSet rs = pstmt.executeQuery() ) {

					while ( rs.next() ) {

						results.add( rs.getInt( "id" ) );
					}
				}
			}
		} catch ( Exception e ) {

			String msg = "getAll_TrackingId_For_SuccessAndFail_LastUpdate_Over_3_DaysAgo(...), sql: " + sql;

			log.error( msg, e );

			throw e;
		}

		return results;
	}

	
	/////

	private static final String GET_STATUS__SUCCESS_FAILED_OVER_3_DAYS_AGO_SQL = 
			
			"SELECT id FROM file_import_tracking_tbl "
			+ " WHERE status_id IN ( " 
			+ 		FileImportStatus.COMPLETE.value()
			+	  "," + FileImportStatus.FAILED.value()
			+ 	") AND last_updated_date_time <  DATE_SUB(DATE(NOW()), INTERVAL 3 DAY)"
			+ " ORDER BY last_updated_date_time ";

	/**
	 * Get import tracking item id list of items in COMPLETE or FAILED status with last update date 3 days ago
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getAll_TrackingId_For_Status_Success_OR_Fail_LastUpdate_Over_3_DaysAgo() throws Exception {


		List<Integer> results = new ArrayList<>( 100000 );

		final String sql = GET_STATUS__SUCCESS_FAILED_OVER_3_DAYS_AGO_SQL;


		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				try ( ResultSet rs = pstmt.executeQuery() ) {

					while ( rs.next() ) {

						results.add( rs.getInt( "id" ) );
					}
				}
			}
		} catch ( Exception e ) {

			String msg = "getAll_TrackingId_For_SuccessAndFail_LastUpdate_Over_3_DaysAgo(...), sql: " + sql;

			log.error( msg, e );

			throw e;
		}

		return results;
	}
	
	////

	private static final String GET_STATUS__STARTED__OVER_15_DAYS_AGO_SQL = 
			
			"SELECT id FROM file_import_tracking_tbl "
			+ " WHERE status_id IN ( " 
			+ 		FileImportStatus.STARTED.value()
			+ 	") AND last_updated_date_time <  DATE_SUB(DATE(NOW()), INTERVAL 15 DAY)"
			+ " ORDER BY last_updated_date_time ";

	/**
	 * Get import tracking item id list of items in STARTED status with last update date 15 days ago
	 * @return import tracking id list
	 * @throws Exception
	 */
	public List<Integer> getAll_TrackingId_For_Status_Started_LastUpdate_Over_15_DaysAgo() throws Exception {


		List<Integer> results = new ArrayList<>( 100000 );

		final String sql = GET_STATUS__STARTED__OVER_15_DAYS_AGO_SQL;


		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				try ( ResultSet rs = pstmt.executeQuery() ) {

					while ( rs.next() ) {

						results.add( rs.getInt( "id" ) );
					}
				}
			}
		} catch ( Exception e ) {

			String msg = "getAll_TrackingId_For_Status_Started_LastUpdate_Over_15_DaysAgo(...), sql: " + sql;

			log.error( msg, e );

			throw e;
		}

		return results;
	}
}
