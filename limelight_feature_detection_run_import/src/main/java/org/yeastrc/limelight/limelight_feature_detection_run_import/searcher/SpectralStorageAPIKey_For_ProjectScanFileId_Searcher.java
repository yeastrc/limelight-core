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
package org.yeastrc.limelight.limelight_feature_detection_run_import.searcher;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.slf4j.Logger;

/**
 * Retrieve scan_file_tbl.spectral_storage_api_key for project_scan_file_tbl.id
 *
 */
public class SpectralStorageAPIKey_For_ProjectScanFileId_Searcher {

	private static final Logger log = LoggerFactory.getLogger( SpectralStorageAPIKey_For_ProjectScanFileId_Searcher.class );
	
	private SpectralStorageAPIKey_For_ProjectScanFileId_Searcher() { }
	public static SpectralStorageAPIKey_For_ProjectScanFileId_Searcher getInstance() { return new SpectralStorageAPIKey_For_ProjectScanFileId_Searcher(); }
	
	/**
	 * @param projectScanFileId
	 * @return null if not found
	 * @throws Exception
	 */
	public String get_SpectralStorageAPIKey_For_ProjectScanFileId( int projectScanFileId ) throws Exception {
		
		String result = null;

		final String sql = 
				"SELECT scan_file_tbl.spectral_storage_api_key "
						+ ""
						+ "FROM scan_file_tbl INNER JOIN project_scan_file_tbl ON project_scan_file_tbl.scan_file_id = scan_file_tbl.id "
						+ " WHERE project_scan_file_tbl.id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, projectScanFileId );

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if ( rs.next() ) {
						result = rs.getString( "spectral_storage_api_key" );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: get_SpectralStorageAPIKey_For_ProjectScanFileId(...) sql: " + sql, e );
			throw e;
		}

		return result;
	}
	
}
