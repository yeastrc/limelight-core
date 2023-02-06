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
package org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.populate_dto_from_result.FileImportAndPipelineRunTrackingRun_PopulateDTO;

/**
 * Shared Get Only
 * 
 * Table import_and_pipeline_run_tracking_run_tbl
 *
 */
public class FileImportAndPipelineRunTrackingRun_Shared_Get_DAO {

	private static final Logger log = LoggerFactory.getLogger( FileImportAndPipelineRunTrackingRun_Shared_Get_DAO.class );
	
	//  private constructor
	private FileImportAndPipelineRunTrackingRun_Shared_Get_DAO() { }
	/**
	 * @return newly created instance
	 */
	public static FileImportAndPipelineRunTrackingRun_Shared_Get_DAO getInstance() { 
		return new FileImportAndPipelineRunTrackingRun_Shared_Get_DAO(); 
	}
	
	/**
	 * Get the given import_and_pipeline_run_tracking_run_tbl from the database
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public FileImportAndPipelineRunTrackingRunDTO getItem( int id ) throws Exception {
		FileImportAndPipelineRunTrackingRunDTO item = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM import_and_pipeline_run_tracking_run_tbl WHERE id = ?";
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			pstmt.setInt( 1, id );
			rs = pstmt.executeQuery();
			if( rs.next() ) {
				item = FileImportAndPipelineRunTrackingRun_PopulateDTO.getInstance().populateResultObject( rs );
			}
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql, e );
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
			if( conn != null ) {
				try { conn.close(); } catch( Throwable t ) { ; }
				conn = null;
			}
		}
		return item;
	}

}
