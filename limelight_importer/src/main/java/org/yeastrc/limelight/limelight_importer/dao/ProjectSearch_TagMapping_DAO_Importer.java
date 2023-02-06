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

/**
 * table project_search_tag_strings_in_project_tbl
 *
 */
public class ProjectSearch_TagMapping_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearch_TagMapping_DAO_Importer.class );
	
	private ProjectSearch_TagMapping_DAO_Importer() { }
	public static ProjectSearch_TagMapping_DAO_Importer getInstance() { return new ProjectSearch_TagMapping_DAO_Importer(); }
	
	///////

	private static final String INSERT_SQL = 
			"INSERT INTO project_search_tag_mapping_tbl "
			+ " (project_search_id, project_search_tag_strings_in_project_id) VALUES (?, ?) " + 
			"  ON DUPLICATE KEY UPDATE project_search_id = ?";

	/**
	 * @param project_search_id
	 * @param project_search_tag_strings_in_project_id
	 * @throws Exception
	 */
	public void save( int project_search_id, int project_search_tag_strings_in_project_id ) throws Exception {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try ( Connection connection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
				PreparedStatement pstmt = connection.prepareStatement( INSERT_SQL ) ) {

			int counter = 0;	counter++;
			pstmt.setInt( counter, project_search_id );
			counter++;
			pstmt.setInt( counter, project_search_tag_strings_in_project_id );
			counter++;
			pstmt.setInt( counter, project_search_id );
			
			pstmt.executeUpdate();

		} catch ( Exception e ) {
			String msg = "INSERT Failed: project_search_id: " + project_search_id + ", project_search_tag_strings_in_project_id: " + project_search_tag_strings_in_project_id + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}	

}
