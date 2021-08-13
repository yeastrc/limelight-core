/*
 * Original author: Daniel Jaschob <djaschob .at. uw.edu>
 *                  
 * Copyright 2019 University of Washington - Seattle, WA
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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.TermsOfServiceTextVersionsDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table terms_of_service_text_versions_tbl
 * 
 */
@Component
public class TermsOfServiceTextVersionsDAO extends Limelight_JDBC_Base implements TermsOfServiceTextVersionsDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( TermsOfServiceTextVersionsDAO.class );


	/**
	 * Get record with largest version_id
	 * @return null if no records
	 * @throws Exception
	 */
	@Override
	public TermsOfServiceTextVersionsDTO getLatest() throws SQLException {

		TermsOfServiceTextVersionsDTO returnItem = null;

		final String sql = "SELECT * FROM terms_of_service_text_versions_tbl ORDER BY version_id DESC LIMIT 1";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {

			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				if( rs.next() ) {
					returnItem = populateFromResultSet(rs);
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "Failed to select TermsOfServiceTextVersionsDTO, sql: " + sql;
			log.error( msg, e );
			throw e;
		
		} catch ( SQLException e ) {
			String msg = "Failed to select TermsOfServiceTextVersionsDTO, sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	@Override
	public TermsOfServiceTextVersionsDTO populateFromResultSet(ResultSet rs) throws SQLException {
		TermsOfServiceTextVersionsDTO returnItem = new TermsOfServiceTextVersionsDTO();
		returnItem.setVersionId( rs.getInt( "version_id" ) );
		returnItem.setIdString( rs.getString( "id_string" ) );
		returnItem.setTermsOfServiceText( rs.getString( "terms_of_service_text" ) );
		returnItem.setCreatedUserId( rs.getInt( "created_user_id" ) );
		returnItem.setCreatedDateTime( rs.getDate( "created_date_time" ) );
		return returnItem;
	}


	/**
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public Integer getLatest_VersionId() throws SQLException {

		Integer returnItem = null;

		final String sql = "SELECT version_id FROM terms_of_service_text_versions_tbl ORDER BY version_id DESC LIMIT 1";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				if( rs.next() ) {
					returnItem = rs.getInt( "version_id" );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "Failed to select getVersionIdForIdString, sql: " + sql;
			log.error( msg, e );
			throw e;
		
		} catch ( SQLException e ) {
			String msg = "Failed to select getVersionIdForIdString, sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}
	

	/**
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public String getLatest_VersionIdString() throws SQLException {

		String returnItem = null;

		final String sql = "SELECT id_string FROM terms_of_service_text_versions_tbl ORDER BY version_id DESC LIMIT 1";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				if( rs.next() ) {
					returnItem = rs.getString( "id_string" );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "Failed to select getLatest_VersionIdString, sql: " + sql;
			log.error( msg, e );
			throw e;
		} catch ( Exception e ) {
			String msg = "Failed to select getLatest_VersionIdString, sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}
	
	/**
	 * @param idString
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public Integer getVersionIdForIdString( String idString ) throws SQLException {

		Integer returnItem = null;

		final String sql = "SELECT version_id FROM terms_of_service_text_versions_tbl WHERE id_string = ?";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {
			
			preparedStatement.setString( 1, idString );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				if( rs.next() ) {
					returnItem = rs.getInt( "version_id" );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "Failed to select getVersionIdForIdString, sql: " + sql;
			log.error( msg, e );
			throw e;
		} catch ( Exception e ) {
			String msg = "Failed to select getVersionIdForIdString, sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}

	/**
	 * @param idString
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public String getTermsOfServiceTextForIdString( String idString ) throws SQLException {

		String returnItem = null;

		final String sql = "SELECT terms_of_service_text FROM terms_of_service_text_versions_tbl WHERE id_string = ?";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {
			
			preparedStatement.setString( 1, idString );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				if( rs.next() ) {
					returnItem = rs.getString( "terms_of_service_text" );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "Failed to select getTermsOfServiceTextForIdString, sql: " + sql;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "Failed to select getTermsOfServiceTextForIdString, sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}
	
	//////
	
	private static final String INSERT_SQL = "INSERT INTO terms_of_service_text_versions_tbl "
			+ "( id_string, terms_of_service_text, created_user_id, created_date_time ) "
			+ "VALUES ( ?, ?, ?, NOW() )";
			
	/**
	 * @param item
	 * @param dbConnection
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void save( TermsOfServiceTextVersionsDTO item ) {

		final String insertSQL = INSERT_SQL;

		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( insertSQL, Statement.RETURN_GENERATED_KEYS );

							int counter = 0;
							counter++;
							pstmt.setString( counter, item.getIdString() );
							counter++;
							pstmt.setString( counter, item.getTermsOfServiceText() );
							counter++;
							pstmt.setInt( counter, item.getCreatedUserId() );

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
			
			item.setVersionId( (int) insertedKeyLong ); // Inserted auto-increment primary key for the inserted record

		} catch ( RuntimeException e ) {
			String msg = "Failed to insert TermsOfServiceTextVersionsDTO, sql: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}
}
