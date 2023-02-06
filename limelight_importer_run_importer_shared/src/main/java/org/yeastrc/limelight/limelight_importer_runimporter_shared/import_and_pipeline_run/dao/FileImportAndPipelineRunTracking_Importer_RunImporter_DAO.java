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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * Do NOT use in Web App
 * 
 * Table import_and_pipeline_run_tracking_tbl
 *
 */
public class FileImportAndPipelineRunTracking_Importer_RunImporter_DAO {

	private static final Logger log = LoggerFactory.getLogger( FileImportAndPipelineRunTracking_Importer_RunImporter_DAO.class );
	
	//  private constructor
	private FileImportAndPipelineRunTracking_Importer_RunImporter_DAO() { }
	/**
	 * @return newly created instance
	 */
	public static FileImportAndPipelineRunTracking_Importer_RunImporter_DAO getInstance() { 
		return new FileImportAndPipelineRunTracking_Importer_RunImporter_DAO(); 
	}

	/**
	 * @param id
	 * @throws Exception
	 */
	public void updateStatusStarted( int id, Connection dbConnection ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = "UPDATE import_and_pipeline_run_tracking_tbl SET status_id = "
				+ FileImportStatus.STARTED.value() 
				+ ", run_start_date_time = NOW(), last_updated_date_time = NOW() WHERE id = ?";
		try {
			pstmt = dbConnection.prepareStatement( sql );
			int counter = 0;
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
		FileImportAndPipelineRunTrackingHistoryDAO.getInstance().save( FileImportStatus.STARTED, id /* FileImportTrackingId */, dbConnection );		
	}
	
	private static final String updateStatusAtImportEnd_SQL =
			"UPDATE import_and_pipeline_run_tracking_tbl "
			+ " SET status_id = ?, run_id_for_status_id = ?, run_end_date_time = NOW(), last_updated_date_time = NOW() "
			+ " WHERE id = ?"
			+ " AND status_id IN ( "
			+ FileImportStatus.QUEUED.value()
			+ ", "
			+ FileImportStatus.RE_QUEUED.value()
			+ ", "
			+ FileImportStatus.STARTED.value()
			+ ") "
			;
	
	/**
	 * @param status
	 * @param id
	 * @throws Exception
	 */
	public void updateStatusAtImportEnd( FileImportStatus status, int runId, int id, Connection dbConnection ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {
			pstmt = dbConnection.prepareStatement( updateStatusAtImportEnd_SQL );
			int counter = 0;
			counter++;
			pstmt.setInt( counter, status.value() );
			counter++;
			pstmt.setInt( counter, runId );
			counter++;
			pstmt.setInt( counter, id );
			
			int rowsUpdated = pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			String msg = "Failed to update status, sql: " + updateStatusAtImportEnd_SQL;
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
		
		FileImportAndPipelineRunTrackingHistoryDAO.getInstance().save( FileImportStatus.STARTED, id /* FileImportTrackingId */, dbConnection );		
	}
	
	
}
