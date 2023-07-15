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
package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * Shared Searcher
 * 
 * Table file_import_tracking_tbl
 *
 */
public class FileImportTracking_Searcher_Shared {

	private static final Logger log = LoggerFactory.getLogger( FileImportTracking_Searcher_Shared.class );

	//  private constructor
	private FileImportTracking_Searcher_Shared() { }
	/**
	 * @return newly created instance
	 */
	public static FileImportTracking_Searcher_Shared getInstance() { 
		return new FileImportTracking_Searcher_Shared(); 
	}

	/**
	 * Get the count
	 * 
	 * @return the count of QUEUED and RE_QUEUED
	 * @throws Exception
	 */
	public int getItemCount_Status_QUEUED__RE_QUEUED() throws Exception {
		int result = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = 
				"SELECT COUNT(*) AS count FROM file_import_tracking_tbl WHERE status_id IN ( " + FileImportStatus.QUEUED.value() + ", " + FileImportStatus.RE_QUEUED.value() + ") "
						+ " AND marked_for_deletion != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE;
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			rs = pstmt.executeQuery();
			if( rs.next() ) {
				result = rs.getInt( "count" );
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
		return result;
	}

	/**
	 * Get the count 
	 * 
	 * @return the count of STARTED
	 * @throws Exception
	 */
	public int getItemCount_Status_STARTED() throws Exception {
		int result = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = "SELECT COUNT(*) AS count FROM file_import_tracking_tbl WHERE status_id IN ( " + FileImportStatus.STARTED.value() + ") "
				+ " AND marked_for_deletion != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE;
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			rs = pstmt.executeQuery();
			if( rs.next() ) {
				result = rs.getInt( "count" );
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
		return result;
	}
	

}
