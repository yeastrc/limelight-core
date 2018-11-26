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
import org.yeastrc.limelight.limelight_importer.dto.SearchCommentDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;

/**
 * table search_comment_tbl for Importer
 *
 */
public class SearchCommentDAO {

	private static final Logger log = LoggerFactory.getLogger( SearchCommentDAO.class );
	
	private SearchCommentDAO() { }
	public static SearchCommentDAO getInstance() { return new SearchCommentDAO(); }

	private static final String INSERT_SQL =
			"INSERT INTO search_comment_tbl "
			+ "( project_search_id, comment, auth_user_id, created_auth_user_id ) "
			+ "VALUES (?,?,?,?, NOW() )";

	/**
	 * Save the given comment to the database. Assumes it's not already in the database.
	 * @param comment
	 * @throws Exception
	 */
	public void save( SearchCommentDTO comment ) throws Exception {
		
		final String sql = INSERT_SQL;

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {

				pstmt.setInt( 1, comment.getProjectSearchid() );
				pstmt.setString( 2, comment.getComment() );

				if ( comment.getUserId() != null ) {
					pstmt.setInt( 3, comment.getUserId() );
					pstmt.setInt( 4, comment.getUserId() );
				} else {
					pstmt.setNull( 3, java.sql.Types.INTEGER );
					pstmt.setNull( 4, java.sql.Types.INTEGER );
				}

				pstmt.executeUpdate();
			
				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
					if( rs.next() ) {
						comment.setId( rs.getInt( 1 ) );
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
