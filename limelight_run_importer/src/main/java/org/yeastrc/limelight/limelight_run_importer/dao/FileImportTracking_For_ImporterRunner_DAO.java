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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	
}
