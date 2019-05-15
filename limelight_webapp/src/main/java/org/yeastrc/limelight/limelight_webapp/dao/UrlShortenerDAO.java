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
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table url_shortener_tbl
 *
 */
@Component
public class UrlShortenerDAO extends Limelight_JDBC_Base implements UrlShortenerDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( UrlShortenerDAO.class );
	
	public static enum LogDuplicateSQLException{ TRUE, FALSE }

	/**
	 * Return the smallest id in the database for the url
	 * 
	 * @param url
	 * @return null if not found
	 * @throws SQLException
	 */
	@Override
	public Integer getFirstIdByURL( String url ) throws SQLException {
		
		Integer result = null;
		
		final String querySQL = "SELECT id FROM url_shortener_tbl WHERE url_start_at_page_controller_path = ? ORDER BY id LIMIT 1";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setString( 1, url );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getInt( "id" );
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

	/**
	 * Return the shortened_url_key for the smallest id in the database for the url in url_start_at_page_controller_path
	 * 
	 * @param url
	 * @return null if not found
	 * @throws SQLException
	 */
	@Override
	public String getFirstShortenedURLByURL( String url ) throws SQLException {
		
		String result = null;
		
		final String querySQL = "SELECT shortened_url_key FROM url_shortener_tbl WHERE url_start_at_page_controller_path = ? ORDER BY id LIMIT 1";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setString( 1, url );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getString( "shortened_url_key" );
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

	/**
	 * Return the url_start_at_page_controller_path for the smallest id in the database for the url_shortener_tbl
	 * 
	 * @param shortenedUrlKey
	 * @return null if not found
	 * @throws SQLException
	 */
	@Override
	public String getFirstURLByShortenedURLKey( String shortenedUrlKey ) throws SQLException {
		
		String result = null;
		
		final String querySQL = "SELECT url_start_at_page_controller_path FROM url_shortener_tbl WHERE shortened_url_key = ? ORDER BY id LIMIT 1";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setString( 1, shortenedUrlKey );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getString( "url_start_at_page_controller_path" );
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
			"INSERT INTO url_shortener_tbl "
			+ " ( shortened_url_key, "
			+ " user_id,"
			+ " url_start_at_page_controller_path,"
			+ " page_controller_path,"
			+ " srch_data_lkp_params_string,"
			+ " remote_user_ip_address"
			+ " )"
			+ " VALUES ( ?, ?, ?, ?, ?, ? )";

	/**
	 * @param item
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.MANDATORY )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( UrlShortenerDTO item, LogDuplicateSQLException logDuplicateSQLException ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL, Statement.RETURN_GENERATED_KEYS );
							int counter = 0;
							counter++;
							pstmt.setString( counter, item.getShortenedUrlKey() );
							counter++;
							if ( item.getUserId() != null ) {
								pstmt.setInt( counter, item.getUserId() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getUrlStartAtPageControllerPath() );
							counter++;
							pstmt.setString( counter, item.getPageControllerPath() );
							counter++;
							pstmt.setString( counter, item.getSearchDataLookupParamsString() );
							counter++;
							pstmt.setString( counter, item.getRemoteUserIPAddress() );

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

			if ( logDuplicateSQLException == LogDuplicateSQLException.TRUE ) {
				String msg = "Item to save: " + item + ", SQL: " + INSERT_SQL;
				log.error( msg, e );
				throw e;
			}
			
		} catch ( RuntimeException e ) {
			String msg = "Item to save: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

}
