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
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchCommentDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;

/**
 * table project_search__comment_tbl for Importer
 *
 */
public class ProjectSearchCommentDAO {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchCommentDAO.class );
	
	private ProjectSearchCommentDAO() { }
	public static ProjectSearchCommentDAO getInstance() { return new ProjectSearchCommentDAO(); }

	private static final String INSERT_SQL =
			"INSERT INTO project_search__comment_tbl "
					+ " (project_search_id, comment, created_user_id, last_updated_user_id) "
					+ " VALUES ( ?, ?, ?, ? ) ";

	/**
	 * Save the given comment to the database. Assumes it's not already in the database.
	 * @param comment
	 * @throws Exception
	 */
	public void save( ProjectSearchCommentDTO item ) throws Exception {
		
		final String sql = INSERT_SQL;

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
				int counter = 0;
				counter++;
				pstmt.setInt( counter, item.getProjectSearchId() );
				counter++;
				pstmt.setString( counter, item.getCommentText() );
				counter++;
				if ( item.getUserIdCreated() != null ) {
					pstmt.setInt( counter, item.getUserIdCreated() );
				} else {
					pstmt.setNull( counter, java.sql.Types.INTEGER );
				}
				counter++;
				if ( item.getUserIdLastUpdated() != null ) {
					pstmt.setInt( counter, item.getUserIdLastUpdated() );
				} else {
					pstmt.setNull( counter, java.sql.Types.INTEGER );
				}
				
				pstmt.executeUpdate();
			
				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
					if( rs.next() ) {
						item.setId( rs.getInt( 1 ) );
					} else
						throw new LimelightImporterDatabaseException( "Failed to insert comment" );
				}
			}
			
		} catch ( Exception e ) {
			
			log.error( "ERROR: save(...) sql: " + sql, e );
			
			throw e;
			
		}
		
	}
}
