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
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table search_data_lookup_parameters
 *
 */
@Component
public class SearchDataLookupParametersLookupDAO extends Limelight_JDBC_Base implements SearchDataLookupParametersLookupDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( SearchDataLookupParametersLookupDAO.class );

	
	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	@Override
	public SearchDataLookupParametersLookupDTO getPartialForId( int id ) throws SQLException {
		
		SearchDataLookupParametersLookupDTO result = null;
		
		final String querySQL = "SELECT * FROM search_data_lookup_parameters WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populatePartialFromResultSet( rs );
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
	 * @param hashOfMainParams
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<SearchDataLookupParametersLookupDTO> getPartialForHashOfMainParams( String hashOfMainParams ) throws SQLException {
		
		List<SearchDataLookupParametersLookupDTO> resultList = new ArrayList<>();
		
		final String querySQL = "SELECT * FROM search_data_lookup_parameters WHERE hash_of_main_params = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setString( 1, hashOfMainParams );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SearchDataLookupParametersLookupDTO result = populatePartialFromResultSet( rs );
					resultList.add( result );
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
		
		return resultList;
	}

	
	private final static String querySQL_getFor_HashOfMainParams_HashCollisionIndex = 
			"SELECT * FROM search_data_lookup_parameters "
			+ " WHERE hash_of_main_params = ? AND hash_collision_index = ?";

	
	/**
	 * @param hashOfMainParams
	 * @param hashCollisitionIndex
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<SearchDataLookupParametersLookupDTO> getPartialFor_HashOfMainParams_HashCollisionIndex( 
			String hashOfMainParams, int hashCollisionIndex ) throws SQLException {
		
		List<SearchDataLookupParametersLookupDTO> resultList = new ArrayList<>();
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL_getFor_HashOfMainParams_HashCollisionIndex ) ) {
			
			preparedStatement.setString( 1, hashOfMainParams );
			preparedStatement.setInt( 2, hashCollisionIndex );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SearchDataLookupParametersLookupDTO result = populatePartialFromResultSet( rs );
					resultList.add( result );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + querySQL_getFor_HashOfMainParams_HashCollisionIndex;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "SQL: " + querySQL_getFor_HashOfMainParams_HashCollisionIndex;
			log.error( msg, e );
			throw e;
		}
		
		return resultList;
	}
	
	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public SearchDataLookupParametersLookupDTO populatePartialFromResultSet( ResultSet rs ) throws SQLException {
		
		SearchDataLookupParametersLookupDTO result = new SearchDataLookupParametersLookupDTO();
		result.setId( rs.getInt( "id" ) );
		result.setHashOfMainParams( rs.getString( "hash_of_main_params" ) );
		result.setHashCollisionIndex( rs.getInt( "hash_collision_index" ) );
		result.setLookupParametersJSONMainData( rs.getString( "lookup_parameters_json__main_data" ) );
		result.setVersionNumber(  rs.getInt( "version_number_main_json" ) );
		result.setRootIdsOnlyJSON( rs.getString( "root_ids_only_json" ) );
		return result;
	}

	
	
	private static final String INSERT_SQL =
			"INSERT INTO search_data_lookup_parameters "
			+ " ( "
			+ " hash_of_main_params, hash_collision_index, "
			+ " root_id_type_id, root_ids_only_json, "
			+ " lookup_parameters_json__main_data, version_number_main_json, "
			+ " created_by_user_id, created_by_user_type, created_date_time, created_by_remote_ip "
			+ " ) "
			+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ? )";
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.SearchDataLookupParametersLookupDAO_IF#save(org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO)
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.MANDATORY )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( SearchDataLookupParametersLookupDTO item ) {
		
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
							pstmt.setString( counter, item.getHashOfMainParams() );
							counter++;
							pstmt.setInt( counter, item.getHashCollisionIndex() );
							counter++;
							pstmt.setInt( counter, item.getRootIdType().value() );
							counter++;
							pstmt.setString( counter, item.getRootIdsOnlyJSON() );
							counter++;
							pstmt.setString( counter, item.getLookupParametersJSONMainData() );
							counter++;
							pstmt.setInt( counter, item.getVersionNumber() );

							counter++;
							if ( item.getCreatedByUserId() != null ) {
								pstmt.setInt( counter, item.getCreatedByUserId() );
							} else {
								pstmt.setNull(counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getCreatedByUserType().value() );
							counter++;
							pstmt.setString( counter, item.getCreatedByRemoteIP() );

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
			
		} catch ( RuntimeException e ) {
			String msg = "SearchDataLookupParametersLookupDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	////
	
	private static final String UPDATE_LAST_ACCESSED_SQL =
			"UPDATE search_data_lookup_parameters "
			+ " SET last_accessed = NOW() WHERE id = ?";
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	@Override
	/* 
	 * SET last_accessed = NOW() WHERE id = ?
	 */
	public void updateLastAccessed( int id ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( UPDATE_LAST_ACCESSED_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "id: " + id + ", SQL: " + UPDATE_LAST_ACCESSED_SQL;
			log.error( msg, e );
			throw e;
		}
	}


}
