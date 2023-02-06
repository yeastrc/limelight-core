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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearch_TagStringInProject_DTO;

/**
 * table project_search_tag_strings_in_project_tbl
 *
 */
public class ProjectSearch_TagStringInProject_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearch_TagStringInProject_DAO_Importer.class );
	
	private ProjectSearch_TagStringInProject_DAO_Importer() { }
	public static ProjectSearch_TagStringInProject_DAO_Importer getInstance() { return new ProjectSearch_TagStringInProject_DAO_Importer(); }
	
	/**
	 * @param projectId
	 * @param tagString
	 * @return
	 * @throws Exception 
	 */
	public Integer getId_For_ProjectId_TagCategoryId_TagString( int projectId, int tagCategoryId, String tagString ) throws Exception {
		
		Integer result = null;

		final String querySQL = "SELECT id FROM project_search_tag_strings_in_project_tbl WHERE project_id = ? AND tag_category_id = ? AND tag_string = ?";
		
		try ( Connection connection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {

			preparedStatement.setInt( 1, projectId );

			preparedStatement.setInt( 2, tagCategoryId );

			preparedStatement.setString( 3, tagString );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getInt( "id" );
				}
			}
		} catch ( Exception e ) {
			String msg = "Query Failed: projectId: " + projectId + ", tagString: " + tagString + ", SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return result;
	}
	

	///////
	
	private static final String INSERT_SQL = 
			"INSERT INTO project_search_tag_strings_in_project_tbl "
			
					+ " (project_id, tag_category_id, tag_string, tag_color_font, tag_color_background, tag_color_border, "
					+ "  created_by_user_id, updated_by_user_id ) "
					+ " VALUES (?, ?, ?, ?, ?, ?, ?, ?) " + 
					"  ON DUPLICATE KEY UPDATE project_id = ?";

	/**
	 * NOT SET 'id' property on param Project_ScanFile_DTO
	 * 
	 * @param item
	 * @throws Exception 
	 */
	public void save__NOT_SET_ID( ProjectSearch_TagStringInProject_DTO item ) throws Exception {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try ( Connection connection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
				PreparedStatement pstmt = connection.prepareStatement( INSERT_SQL ) ) {

			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getProjectId() );
			counter++;
			pstmt.setInt( counter, item.getTagCategoryId() );
			counter++;
			pstmt.setString( counter, item.getTag_string() );
			counter++;
			pstmt.setString( counter, item.getTag_Color_Font() );
			counter++;
			pstmt.setString( counter, item.getTag_Color_Background() );
			counter++;
			pstmt.setString( counter, item.getTag_Color_Border() );
			counter++;
			if ( item.getCreatedBy_UserId() != null ) {
				pstmt.setInt( counter, item.getCreatedBy_UserId() );
			} else {
				pstmt.setNull(counter, java.sql.Types.INTEGER );
			}
			counter++;
			if ( item.getUpdatedBy_UserId() != null ) {
				pstmt.setInt( counter, item.getUpdatedBy_UserId() );
			} else {
				pstmt.setNull(counter, java.sql.Types.INTEGER );
			}
			counter++;
			pstmt.setInt( counter, item.getProjectId() );

			pstmt.executeUpdate();

		} catch ( Exception e ) {
			String msg = "INSERT Failed: Project_ScanFile_DTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}	

}
