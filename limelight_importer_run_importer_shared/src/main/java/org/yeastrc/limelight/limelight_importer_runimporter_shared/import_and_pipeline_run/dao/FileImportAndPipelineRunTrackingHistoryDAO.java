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
 * table import_and_pipeline_run_tracking_status_history_tbl
 *
 */
public class FileImportAndPipelineRunTrackingHistoryDAO {
	
	private static final Logger log = LoggerFactory.getLogger( FileImportAndPipelineRunTrackingHistoryDAO.class );
	
	//  private constructor
	private FileImportAndPipelineRunTrackingHistoryDAO() { }
	/**
	 * @return newly created instance
	 */
	public static FileImportAndPipelineRunTrackingHistoryDAO getInstance() { 
		return new FileImportAndPipelineRunTrackingHistoryDAO(); 
	}
	
	private static final String SAVE_SQL = "INSERT INTO import_and_pipeline_run_tracking_status_history_tbl "
			+ "( import_and_pipeline_run_tracking_id, status_id )"
			+ " VALUES ( ?, ? )";

	/**
	 * @param status
	 * @param import_and_pipeline_run_tracking_id
	 * @param dbConnection
	 * @throws Exception
	 */
	public void save( FileImportStatus status, int import_and_pipeline_run_tracking_id, Connection dbConnection ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = SAVE_SQL;
		
		try {
//			pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS );
			pstmt = dbConnection.prepareStatement( sql );
			int counter = 0;
			counter++;
			pstmt.setInt( counter, import_and_pipeline_run_tracking_id );
			counter++;
			pstmt.setInt( counter, status.value() );
			pstmt.executeUpdate();
		} catch ( Exception e ) {
			String msg = "Failed, sql: " + sql;
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
