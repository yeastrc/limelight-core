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
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.populate_dto_from_result.FileImportAndPipelineRunTrackingSingleFile_PopulateDTO;

/**
 * Shared Get Only
 * 
 * Table import_and_pipeline_run_tracking_single_file_tbl
 *
 */
public class FileImportAndPipelineRunTrackingSingleFile_Shared_Get_DAO {

	private static final Logger log = LoggerFactory.getLogger( FileImportAndPipelineRunTrackingSingleFile_Shared_Get_DAO.class );
	
	//  private constructor
	private FileImportAndPipelineRunTrackingSingleFile_Shared_Get_DAO() { }
	/**
	 * @return newly created instance
	 */
	public static FileImportAndPipelineRunTrackingSingleFile_Shared_Get_DAO getInstance() { 
		return new FileImportAndPipelineRunTrackingSingleFile_Shared_Get_DAO(); 
	}
	
	/**
	 * Get the given import_and_pipeline_run_tracking_single_file_tbl from the database
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public FileImportAndPipelineRunTrackingSingleFileDTO getItem( int id ) throws Exception {
		FileImportAndPipelineRunTrackingSingleFileDTO item = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM import_and_pipeline_run_tracking_single_file_tbl WHERE id = ?";
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			pstmt.setInt( 1, id );
			rs = pstmt.executeQuery();
			if( rs.next() ) {
				item = FileImportAndPipelineRunTrackingSingleFile_PopulateDTO.getInstance().populateResultObject( rs );
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

	/**
	 * Get the given import_and_pipeline_run_tracking_single_file_tbl entries from the database
	 * 
	 * @param trackingId
	 * @return
	 * @throws Exception
	 */
	public List<FileImportAndPipelineRunTrackingSingleFileDTO> getFor_TrackingId( int trackingId )  throws Exception {
		
		List<FileImportAndPipelineRunTrackingSingleFileDTO> resultList = new ArrayList<>();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = "SELECT * FROM import_and_pipeline_run_tracking_single_file_tbl WHERE import_and_pipeline_run_tracking_id = ?";
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			pstmt.setInt( 1, trackingId );
			rs = pstmt.executeQuery();
			while ( rs.next() ) {
				FileImportAndPipelineRunTrackingSingleFileDTO result = FileImportAndPipelineRunTrackingSingleFile_PopulateDTO.getInstance()
						.populateResultObject( rs );
				resultList.add(result);
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
		return resultList;
	}

}
