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
import java.sql.ResultSet;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * table file_import_tracking_single_file_tbl
 *
 */
public class FileImportTrackingSingleFileDAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingSingleFileDAO_Importer.class );
	
	private FileImportTrackingSingleFileDAO_Importer() { }
	public static FileImportTrackingSingleFileDAO_Importer getInstance() { return new FileImportTrackingSingleFileDAO_Importer(); }
	
	/**
	 * @param fileSize
	 * @param sha1Sum
	 * @param id
	 * @throws Exception
	 */
	public void updateFileSizeSHA1Sum( long fileSize, String sha1Sum, int id ) throws Exception {
		Connection dbConnection = null;
		try {
			dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
			updateFileSizeSHA1Sum( fileSize, sha1Sum, id, dbConnection );
		} finally {
			if( dbConnection != null ) {
				try { dbConnection.close(); } catch( Throwable t ) { ; }
				dbConnection = null;
			}
		}
	}
	
	/**
	 * @param fileSize
	 * @param sha1Sum
	 * @param id
	 * @param dbConnection
	 * @throws Exception
	 */
	public void updateFileSizeSHA1Sum( long fileSize, String sha1Sum, int id, Connection dbConnection ) throws Exception {
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = "UPDATE file_import_tracking_single_file_tbl SET file_size = ?, sha1_sum = ? WHERE id = ?";
		try {
			pstmt = dbConnection.prepareStatement( sql );
			int counter = 0;
			counter++;
			pstmt.setLong( counter, fileSize );
			counter++;
			pstmt.setString( counter, sha1Sum );
			counter++;
			pstmt.setInt( counter, id );
			pstmt.executeUpdate();
		} catch ( Exception e ) {
			String msg = "Failed to update fileSize: " + fileSize 
					+ ", sha1Sum: " + sha1Sum
					+ ", sql: " + sql;
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
