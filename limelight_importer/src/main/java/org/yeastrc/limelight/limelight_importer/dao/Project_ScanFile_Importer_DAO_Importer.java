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
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_Importer_DTO;

/**
 * table project_scan_file_importer_tbl
 *
 */
public class Project_ScanFile_Importer_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( Project_ScanFile_Importer_DAO_Importer.class );
	
	private Project_ScanFile_Importer_DAO_Importer() { }
	public static Project_ScanFile_Importer_DAO_Importer getInstance() { return new Project_ScanFile_Importer_DAO_Importer(); }


	/**
	 * 
	 *
	 */
	public enum SkipLogInsertException { YES, NO }
	

	/**
	 * @param project_scan_file_id
	 * @throws Exception
	 */
	public Integer get_project_scan_file_id_For_project_scan_file_id( int project_scan_file_id ) throws Exception {

		Integer result = null;
		
		final String sql = "SELECT project_scan_file_id FROM project_scan_file_importer_tbl WHERE project_scan_file_id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, project_scan_file_id );
				pstmt.executeQuery();

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						result = rs.getInt( "project_scan_file_id" );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: get_project_scan_file_id_For_project_scan_file_id(...) project_scan_file_id: " + project_scan_file_id + ", sql: " + sql, e );
			throw e;
		}
		return result;
	}
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( Project_ScanFile_Importer_DTO item, SkipLogInsertException skipLogInsertException ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			saveToDatabase( item, skipLogInsertException, dbConnection );
		} catch ( Exception e ) {
			if ( skipLogInsertException == null || skipLogInsertException != SkipLogInsertException.YES ) {
				log.error( "ERROR: saveToDatabase( item ) item: " + item, e );
			}
			throw e;
		}
	}

	private final static String INSERT_SQL = 
			
			"INSERT INTO project_scan_file_importer_tbl "
			+ "(project_scan_file_id, file_size, sha1sum, "
			+ "canonical_filename_w_path_on_submit_machine, absolute_filename_w_path_on_submit_machine, "
			+ "aws_s3_bucket_name, aws_s3_object_key)"

			+ "VALUES (?, ?, ?, ?, ?, ?, ?)";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( Project_ScanFile_Importer_DTO item, SkipLogInsertException skipLogInsertException, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getProjectScanFileId() );
			counter++;
			pstmt.setLong( counter, item.getFileSize() );
			counter++;
			pstmt.setString( counter, item.getSha1sum() );
			counter++;
			pstmt.setString( counter, item.getCanonicalFilename_W_Path_OnSubmitMachine() );
			counter++;
			pstmt.setString( counter, item.getAbsoluteFilename_W_Path_OnSubmitMachine() );
			counter++;
			pstmt.setString( counter, item.getAwsBucketName() );
			counter++;
			pstmt.setString( counter, item.getAwsObjectKey() );

			pstmt.executeUpdate();

		} catch ( Exception e ) {

			if ( skipLogInsertException == null || skipLogInsertException != SkipLogInsertException.YES ) {
				log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			}
			throw e;
		}
	}
	
}
