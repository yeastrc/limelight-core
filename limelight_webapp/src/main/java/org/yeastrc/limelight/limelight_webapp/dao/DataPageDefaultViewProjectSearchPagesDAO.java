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
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageDefaultViewProjectSearchPagesDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table data_page_default_view_project_search_pages_tbl
 *
 */
@Component
public class DataPageDefaultViewProjectSearchPagesDAO extends Limelight_JDBC_Base implements DataPageDefaultViewProjectSearchPagesDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( DataPageDefaultViewProjectSearchPagesDAO.class );

	
	private static final String getURL_ByProjectSearchIdControllerPath_SQL =
			"SELECT url_start_at_page_controller_path FROM data_page_default_view_project_search_pages_tbl "
			+ " WHERE "
			+ " project_search_id = ? "
			+ " AND"
			+ " page_controller_path = ? ";

	/**
	 * Return the URL for project search id and controller path
	 * 
	 * @param projectSearchId
	 * @return null if not found
	 * @throws SQLException
	 */
	
	@Override
	public String getURL_ByProjectSearchIdControllerPath( int projectSearchId, String controllerPath ) throws SQLException {
		
		String result = null;
		
		final String querySQL = getURL_ByProjectSearchIdControllerPath_SQL;
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectSearchId );
			preparedStatement.setString( 2, controllerPath );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getString( "url_start_at_page_controller_path" );
				}
				if ( rs.next() ) {
					String msg = "Found > 1 record for projectSearchId: " + projectSearchId 
							+ ", controllerPath: " + controllerPath;
					log.error( msg );
					throw new LimelightInternalErrorException( msg );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return result;
	}
	

	
	///////
	
	private static final String INSERT_SQL = 
			"INSERT INTO data_page_default_view_project_search_pages_tbl "
			+ " ( project_search_id, page_controller_path, url_start_at_page_controller_path, srch_data_lkp_params_string, "
			+ " user_id_created_record, user_id_last_updated_record ) "
			+ " VALUES ( ?, ?, ?, ?, ?, ? )";

	/**
	 * @param item
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( DataPageDefaultViewProjectSearchPagesDTO item ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
//			int rowsUpdated = 
				this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL, Statement.RETURN_GENERATED_KEYS );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getProjectSearchId() );
							counter++;
							pstmt.setString( counter, item.getPageControllerPath() );
							counter++;
							pstmt.setString( counter, item.getUrlStartAtPageControllerPath() );
							counter++;
							pstmt.setString( counter, item.getSearchDataLookupParamsString() );
							counter++;
							pstmt.setInt( counter, item.getUserIdCreated() );
							counter++;
							pstmt.setInt( counter, item.getUserIdLastUpdated() );

							return pstmt;
						}
					},
					keyHolder);

			Number insertedKey = keyHolder.getKey();
			
			long insertedKeyLong = insertedKey.longValue();
			
			if ( insertedKeyLong > Integer.MAX_VALUE ) {
				String msg = "Inserted key is too large, is > Integer.MAX_VALUE. insertedKey: " + insertedKey;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
			
			item.setId( (int) insertedKeyLong ); // Inserted auto-increment primary key for the inserted record
			
		} catch ( org.springframework.dao.DuplicateKeyException e ) {
			
			//  Only minimal warn logging since will likely handle the DuplicateKeyException in the calling code in SetDefaultView_ProjectSearchPages_Insert_Service
			
			log.warn( "Insert results in Duplicate Key which will likely next be handled.  ProjectSearchId: " + item.getProjectSearchId()
				+ ", PageControllerPath: " + item.getPageControllerPath()
				+ ", Exception text: " + e.toString() );
			
			throw e;
			
		} catch ( RuntimeException e ) {
			String msg = "DTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	private static final String UPDATE_DEFAULT_URL_SQL = 
			"UPDATE data_page_default_view_project_search_pages_tbl "
			+ " SET "
			+ " url_start_at_page_controller_path = ?, "
			+ " srch_data_lkp_params_string = ?,"
			+ " user_id_last_updated_record = ?  "
			+ " WHERE "
			+ " project_search_id = ?"
			+ " AND page_controller_path = ? ";
	

	/**
	 * @param projectSearchId
	 * @param id
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void update_UrlStartPath_And_SrchDataLkpParams( DataPageDefaultViewProjectSearchPagesDTO item ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( UPDATE_DEFAULT_URL_SQL );
							int counter = 0;
							counter++;
							pstmt.setString(counter, item.getUrlStartAtPageControllerPath() );
							counter++;
							pstmt.setString(counter, item.getSearchDataLookupParamsString() );
							counter++;
							pstmt.setInt( counter, item.getUserIdLastUpdated() );
							counter++;
							pstmt.setInt( counter, item.getProjectSearchId() );
							counter++;
							pstmt.setString(counter, item.getPageControllerPath() );
							return pstmt;
						}
					});
			
			if ( rowsUpdated == 0 ) {
				String msg = "No records updated in table data_page_default_view_project_search_pages_tbl for projectSearchId: " 
						+ item.getProjectSearchId() + ", page_controller_path: " + item.getPageControllerPath(); 
				log.error( msg );
				throw new LimelightDatabaseException( msg );
			}

		} catch ( RuntimeException e ) {
			String msg = "projectSearchId: " + item.getProjectSearchId() + ", page_controller_path: " + item.getPageControllerPath() + ", SQL: " + UPDATE_DEFAULT_URL_SQL;
			log.error( msg, e );
			throw e;
		}
	}
	

}
