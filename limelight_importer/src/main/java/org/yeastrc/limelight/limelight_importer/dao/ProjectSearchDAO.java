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
import org.yeastrc.limelight.limelight_importer.dto.ProjectSearchDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;

/**
 * Table project_search_tbl
 *
 */
public class ProjectSearchDAO {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchDAO.class );
	
	private ProjectSearchDAO() { }
	public static ProjectSearchDAO getInstance() { return new ProjectSearchDAO(); }
	
	/**
	 * This will INSERT the given ProjectSearchDTO into the database... even if an id is already set.
	 * This will result in a new id being set in the object.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( ProjectSearchDTO item ) throws Exception {
		Connection dbConnection = null;
		try {
			dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection();
			saveToDatabase( item, dbConnection );
		} finally {
			if( dbConnection != null ) {
				try { dbConnection.close(); } catch( Throwable t ) { ; }
				dbConnection = null;
			}
		}
	}
	
	private static final String INSERT_SQL =
			"INSERT INTO project_search_tbl "
			+ " (project_id, search_id, search_name, status_id, created_by_user_id ) "
			+ " VALUES (?, ?, ?, " +  SearchRecordStatus.IMPORTING.value() + ", ? "
			+ " )";
	/**
	 * This will INSERT the given ProjectSearchDTO into the database... even if an id is already set.
	 * This will result in a new id being set in the object.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( ProjectSearchDTO item, Connection conn ) throws Exception {
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = INSERT_SQL;
		try {
			pstmt = conn.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS );
			int counter = 0;
//			project_id, search_id, search_name
			counter++;
			pstmt.setInt( counter, item.getProjectId() );
			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setString( counter, item.getSearchName() );
			counter++;
			if ( item.getCreatedByUserId() != null ) {
				pstmt.setInt( counter, item.getCreatedByUserId() );
			} else {
				pstmt.setNull(counter, java.sql.Types.INTEGER );
			}

			pstmt.executeUpdate();
			rs = pstmt.getGeneratedKeys();
			if( rs.next() ) {
				item.setId( rs.getInt( 1 ) );
			} else
				throw new LimelightImporterDatabaseException( "Failed to insert project_search_tbl for SearchId " + item.getSearchId() );
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + sql, e );
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
//			if( conn != null ) {
//				try { conn.close(); } catch( Throwable t ) { ; }
//				conn = null;
//			}
		}
	}
	
	/**
	 * Update the status_id associated with this search
	 * @param projectSearchId
	 * @param status
	 * @throws Exception
	 */
	public void updateStatus( int projectSearchId, SearchRecordStatus status ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			updateStatus( projectSearchId, status, dbConnection );
		}
	}
	
	/**
	 * Update the status_id associated with this search
	 * @param projectSearchId
	 * @param status
	 * @throws Exception
	 */
	public void updateStatus( int projectSearchId, SearchRecordStatus status, Connection dbConnection ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "UPDATE project_search_tbl SET status_id = ? WHERE id = ?";
		try {
			pstmt = dbConnection.prepareStatement( sql );
			pstmt.setInt( 1, status.value() );
			pstmt.setInt( 2, projectSearchId );
			pstmt.executeUpdate();
		} catch ( Exception e ) {
			log.error( "ERROR: updateStatus(...) sql: " + sql, e );
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