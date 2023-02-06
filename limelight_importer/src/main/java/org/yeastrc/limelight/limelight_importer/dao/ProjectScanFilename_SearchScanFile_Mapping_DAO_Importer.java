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
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.ProjectScanFilename_SearchScanFile_Mapping_DTO;

/**
 * table project_scan_filename__search_scan_file__mapping_tbl
 *
 */
public class ProjectScanFilename_SearchScanFile_Mapping_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( ProjectScanFilename_SearchScanFile_Mapping_DAO_Importer.class );
	
	private ProjectScanFilename_SearchScanFile_Mapping_DAO_Importer() { }
	public static ProjectScanFilename_SearchScanFile_Mapping_DAO_Importer getInstance() { return new ProjectScanFilename_SearchScanFile_Mapping_DAO_Importer(); }
	

	/**
	 * 
	 *
	 */
	public enum SkipLogInsertException { YES, NO }
	
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( ProjectScanFilename_SearchScanFile_Mapping_DTO item, SkipLogInsertException skipLogInsertException ) throws Exception {

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
			
			"INSERT INTO project_scan_filename__search_scan_file__mapping_tbl ( project_scan_filename_id, search_scan_file_id, project_search_id ) "
					+ "VALUES ( ?, ?, ? )"
					+ "  ON DUPLICATE KEY UPDATE search_scan_file_id = ?";
		
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( ProjectScanFilename_SearchScanFile_Mapping_DTO item, SkipLogInsertException skipLogInsertException, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

			int counter = 0;

			//  INSERT
			counter++;
			pstmt.setInt( counter, item.getProjectScanFilenameId() );
			counter++;
			pstmt.setInt( counter, item.getSearchScanFileId() );
			counter++;
			pstmt.setInt( counter, item.getProjectSearchId() );

			//  ON DUPLICATE KEY
			counter++;
			pstmt.setInt( counter, item.getSearchScanFileId() );

			pstmt.executeUpdate();

		} catch ( Exception e ) {
			if ( skipLogInsertException == null || skipLogInsertException != SkipLogInsertException.YES ) {
				log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			}
			throw e;
		}
	}
	
}
