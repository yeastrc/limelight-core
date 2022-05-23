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
package org.yeastrc.limelight.limelight_importer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.slf4j.Logger;

/**
 * table search_scan_file_tbl table
 *
 */
public class SearchScanFileDAO {

	private static final Logger log = LoggerFactory.getLogger( SearchScanFileDAO.class );

	private SearchScanFileDAO() { }
	public static SearchScanFileDAO getInstance() { return new SearchScanFileDAO(); }

	/**
	 * Update the scan_file_id associated with this record
	 * @param id
	 * @param scanFileId
	 * @throws Exception
	 */
	public void updateScanFileId( int id, int scanFileId ) throws Exception {
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			updateScanFileId( id, scanFileId, dbConnection );
		}
	}
	
	/**
	 * Update the scan_file_id associated with this record
	 * @param id
	 * @param scanFileId
	 * @throws Exception
	 */
	public void updateScanFileId( int id, int scanFileId, Connection dbConnection ) throws Exception {
		
		final String sql = "UPDATE search_scan_file_tbl SET scan_file_id = ? WHERE id = ?";
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			pstmt.setInt( 1, scanFileId );
			pstmt.setInt( 2, id );
			pstmt.executeUpdate();
		} catch ( Exception e ) {
			log.error( "ERROR: updateScanFileId(...) sql: " + sql, e );
			throw e;
		}
	}
}

