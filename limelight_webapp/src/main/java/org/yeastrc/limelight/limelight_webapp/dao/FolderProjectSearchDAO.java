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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderProjectSearchDTO;

/**
 * table folder_project_search_tbl
 *
 */
@Component
public class FolderProjectSearchDAO extends Limelight_JDBC_Base implements FolderProjectSearchDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FolderProjectSearchDAO.class );

	/**
	 * @param projectId
	 * @return 
	 * @throws Exception
	 */
	@Override
	public List<FolderProjectSearchDTO> getFolderProjectSearchDTO_ForProjectId( int projectId ) throws Exception {
		List<FolderProjectSearchDTO> returnList = new ArrayList<>();
		
		final String querySQL = "SELECT fps.* FROM folder_project_search_tbl AS fps INNER JOIN folder_for_project_tbl AS ffp ON fps.folder_id = ffp.id  WHERE ffp.project_id = ?";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FolderProjectSearchDTO returnItem = populateResultObject( rs );
					returnList.add( returnItem );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select ProjectDTO, projectId: " + projectId + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnList;
	}
	
	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	private FolderProjectSearchDTO populateResultObject(ResultSet rs) throws SQLException {
		FolderProjectSearchDTO returnItem = new FolderProjectSearchDTO();
		returnItem.setFolderId( rs.getInt( "folder_id" ) );
		returnItem.setProjectSearchId( rs.getInt( "project_search_id" ) );
		returnItem.setSearchDisplayOrder( rs.getInt( "search_display_order" ) );
		return returnItem;
	}
	
	
	
	////////////////////////

	// primary key project_search_id and folder_id.   On DUPLICATE KEY UPDATE: do NOT set search_display_order since it is passed in with zero for new entries
	private static final String INSERT_OR_UPDATE_SQL =
			"INSERT INTO folder_project_search_tbl ( project_search_id, folder_id, search_display_order ) VALUES ( ?, ?, ? )"
					+ " ON DUPLICATE KEY UPDATE dummy_on_duplicate_update = 0";
	/**
	 * @param item
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void saveOrUpdate( FolderProjectSearchDTO item, int createUserId ) {
		
		final String insertSQL = INSERT_OR_UPDATE_SQL;

		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( insertSQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getProjectSearchId() );
							counter++;
							pstmt.setInt( counter, item.getFolderId() );
							counter++;
							pstmt.setInt( counter, item.getSearchDisplayOrder() );
														
							return pstmt;
						}
					});
			
		} catch ( RuntimeException e ) {
			String msg = "item: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * 
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateDisplayOrderFor_FolderId_ProjectSearchId( int folderId, int projectSearchId, int newDisplayOrder ) {
		
		final String UPDATE_SQL = "UPDATE folder_project_search_tbl SET search_display_order = ? WHERE folder_id = ? AND project_search_id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( UPDATE_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, newDisplayOrder );
							counter++;
							pstmt.setInt( counter, folderId );
							counter++;
							pstmt.setInt( counter, projectSearchId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "newDisplayOrder: " + newDisplayOrder + ", projectSearchId: " + projectSearchId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	/**
	 * @param not_In_ProjectSearchId_List
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void delete_NOT_In_ProjectSearchId_List( List<Integer> not_In_ProjectSearchId_List, int folderId ) {
		
		if ( not_In_ProjectSearchId_List == null ) {
			throw new IllegalArgumentException( " ( not_In_ProjectSearchId_List == null )" );
		}
		
		StringBuilder sqlSB = new StringBuilder( 10000 ); 
		sqlSB.append( "DELETE FROM folder_project_search_tbl WHERE folder_id = ?" );
		
		if ( ! not_In_ProjectSearchId_List.isEmpty() ) {
		
			sqlSB.append( " AND project_search_id NOT IN ( " );

			for ( int counter = 1; counter <= not_In_ProjectSearchId_List.size(); counter++ ) {
				if ( counter > 1 ) {
					sqlSB.append( " , " );	
				}
				sqlSB.append( " ? " );
			}
			
			sqlSB.append( " ) " );
		}

		final String sql = sqlSB.toString();

		// Use Spring JdbcTemplate so Transactions work properly

		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, folderId );
							
							if ( ! not_In_ProjectSearchId_List.isEmpty() ) {
								for ( Integer not_In_ProjectSearchId : not_In_ProjectSearchId_List ) {
									counter++;
									pstmt.setInt( counter, not_In_ProjectSearchId );
								}
							}
							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "Failed to delete, id_List: " + StringUtils.join( not_In_ProjectSearchId_List, ", " ) + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
	}
	
}
