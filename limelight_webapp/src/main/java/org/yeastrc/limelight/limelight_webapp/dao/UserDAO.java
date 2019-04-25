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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table user_tbl
 *
 */
@Component
public class UserDAO extends Limelight_JDBC_Base implements UserDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( UserDAO.class );
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF#getForId(int)
	 */
	@Override
	public UserDTO getForId( int id ) throws SQLException {
		
		UserDTO result = null;

		final String querySQL = "SELECT id, user_mgmt_user_id, user_access_level, enabled_app_specific FROM user_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populateFromResultSet( rs );
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

	@Override
	public List<UserDTO> getAll() throws SQLException {
		
		List<UserDTO> resultList = new ArrayList<>();

		final String querySQL = "SELECT id, user_mgmt_user_id, user_access_level, enabled_app_specific FROM user_tbl ";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					UserDTO result = populateFromResultSet( rs );
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

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	private UserDTO populateFromResultSet( ResultSet rs ) throws SQLException {
		UserDTO result;
		result = new UserDTO();
		result.setId( rs.getInt( "id" ) );
		result.setUserMgmtUserId( rs.getInt( "user_mgmt_user_id" ) );
		int userAccessLevel = rs.getInt( "user_access_level" );
		if ( ! rs.wasNull() ) {
			result.setUserAccessLevel( userAccessLevel );
		}
		int enabledInt = rs.getInt( "enabled_app_specific" );
		if ( enabledInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
			result.setEnabledAppSpecific( true );
		} else {
			result.setEnabledAppSpecific( false );
		}
		return result;
	}

	@Override
	public Integer getIdForId( int id ) throws Exception {
		Integer returnedItem = null;
		final String sql = "SELECT id FROM user_tbl WHERE id = ?";

		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, id );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					returnedItem = rs.getInt( "id" );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql, e );
			throw e;
		}
		return returnedItem;
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF#getIdForUserMgmtUserId(int)
	 */
	@Override
	public Integer getIdForUserMgmtUserId( int userMgmtUserId ) throws Exception {
		Integer returnedItem = null;
		final String sql = "SELECT id FROM user_tbl WHERE user_mgmt_user_id = ?";

		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, userMgmtUserId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					returnedItem = rs.getInt( "id" );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql, e );
			throw e;
		}
		return returnedItem;
	}
	
	@Override
	public Integer getUserMgmtUserIdForId( int id ) throws Exception {
		Integer returnedItem = null;
		final String sql = "SELECT user_mgmt_user_id FROM user_tbl WHERE id = ?";

		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, id );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					returnedItem = rs.getInt( "user_mgmt_user_id" );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql, e );
			throw e;
		}
		return returnedItem;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF#save(org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO)
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( UserDTO item ) {
		
		final String INSERT_SQL = "INSERT INTO user_tbl ( user_mgmt_user_id, user_access_level, enabled_app_specific ) VALUES ( ?, ?, ? )";

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
							pstmt.setInt( counter, item.getUserMgmtUserId() );
							counter++;
							if ( item.getUserAccessLevel() != null ) {
								pstmt.setInt( counter, item.getUserAccessLevel() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							if ( item.isEnabledAppSpecific() ) {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
							} else {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
							}
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
			String msg = "UserDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF#updateUserAccessLevel(int, java.lang.Integer)
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	/**
	 * Update user_access_level = ? 
	 * @param id
	 * @param user_access_level
	 */
	public void updateUserAccessLevel( int id, Integer user_access_level ) {

		
		final String sql = "UPDATE user_tbl SET user_access_level = ? WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							if ( user_access_level == null ) {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							} else {
								pstmt.setInt( counter, user_access_level );
							}
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "id: " + id + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF#updateEnabledAppSpecific(int, boolean)
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void updateEnabledAppSpecific( int id, boolean enabled_app_specific ) {
		
		final String sql = "UPDATE user_tbl SET enabled_app_specific = ? WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							int enabled_app_specificInt = Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE;
							if ( enabled_app_specific ) {
								enabled_app_specificInt = Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE;
							}
							pstmt.setInt( counter, enabled_app_specificInt );
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "id: " + id + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF#updateLastLogin(int, java.lang.String)
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void updateLastLogin( int id, String lastLoginIP ) {
		
		final String sql = "UPDATE user_tbl SET last_login = NOW(), last_login_ip = ? WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setString( counter, lastLoginIP );
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "id: " + id + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
	}

}
