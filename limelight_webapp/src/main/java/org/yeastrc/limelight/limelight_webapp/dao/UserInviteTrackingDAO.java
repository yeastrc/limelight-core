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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * DAO for user_invite_tracking_tbl table
 *
 */
@Component
public class UserInviteTrackingDAO extends Limelight_JDBC_Base implements UserInviteTrackingDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( UserInviteTrackingDAO.class );

	/**
	 * @param inviteTrackingId
	 * @return null if not found
	 * @throws SQLException
	 */
	@Override
	public UserInviteTrackingDTO getForInviteTrackingId( int inviteTrackingId ) throws SQLException {
		UserInviteTrackingDTO returnItem = null;

		final String querySQL = "SELECT * FROM user_invite_tracking_tbl WHERE id = ? ";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {

			preparedStatement.setInt( 1, inviteTrackingId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					returnItem = populateFromResultSet(rs);
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select UserInviteTrackingDTO, inviteTrackingId: " + inviteTrackingId
					+ ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}

	/**
	 * @param inviteTrackingCode
	 * @return null if not found
	 * @throws SQLException
	 */
	@Override
	public UserInviteTrackingDTO getForInviteTrackingCode( String inviteTrackingCode ) throws SQLException {

		UserInviteTrackingDTO returnItem = null;

		final String querySQL = "SELECT * FROM user_invite_tracking_tbl WHERE invite_tracking_code = ? ";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {

			preparedStatement.setString( 1, inviteTrackingCode );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					returnItem = populateFromResultSet(rs);
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select UserInviteTrackingDTO, inviteTrackingCode: " + inviteTrackingCode
					+ ", sql: " + querySQL;
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
	private UserInviteTrackingDTO populateFromResultSet(ResultSet rs) throws SQLException {
		UserInviteTrackingDTO returnItem;
		returnItem = new UserInviteTrackingDTO();
		returnItem.setId( rs.getInt( "id" ) );
		returnItem.setSubmittingUserId( rs.getInt( "submitting_user_id" ) );
		returnItem.setInvitedUserEmail( rs.getString( "invited_user_email" ) );
		returnItem.setInvitedUserAccessLevel( rs.getInt( "invited_user_access_level" ) );
		int invitedProjectId = rs.getInt( "invited_project_id" );
		if ( rs.wasNull() ) {
			returnItem.setInvitedProjectId(null);
		} else {
			returnItem.setInvitedProjectId( invitedProjectId );
		}
		returnItem.setInviteCreateDate( rs.getDate( "invite_create_date" ) );
		{
			int fieldIntValue = rs.getInt( "invite_used" );
			if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
				returnItem.setInviteUsed( true );
			}
		}
		returnItem.setInviteUsedDate( rs.getDate( "invite_used_date" ) );
		returnItem.setInviteTrackingCode( rs.getString( "invite_tracking_code" ) );
		returnItem.setSubmitIP( rs.getString( "submit_ip" ) );
		returnItem.setUseIP( rs.getString( "use_ip" ) );
		{
			int fieldIntValue = rs.getInt( "code_replaced_by_newer" );
			if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
				returnItem.setCodeReplacedByNewer( true );
			}
		}
		{
			int fieldIntValue = rs.getInt( "invite_revoked" );
			if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
				returnItem.setInviteRevoked( true );
			}
		}
		int revokingUserId = rs.getInt( "revoking_user_id" );
		if ( rs.wasNull() ) {
			returnItem.setRevokingUserId(null);
		} else {
			returnItem.setRevokingUserId( revokingUserId );
		}
		returnItem.setRevokedDate( rs.getDate( "revoked_date" ) );
		return returnItem;
	}

	/**
	 * @param item
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void save( UserInviteTrackingDTO item ) {
		final String INSERT_SQL = 
				"INSERT INTO user_invite_tracking_tbl " 
						+ " ( submitting_user_id, invited_user_email, invited_user_access_level, invited_project_id, " 
						+ "   invite_tracking_code, submit_ip, code_replaced_by_newer, invite_create_date ) "
						+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, NOW() )";

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
							pstmt.setInt( counter, item.getSubmittingUserId() );
							counter++;
							pstmt.setString( counter, item.getInvitedUserEmail() );
							counter++;
							pstmt.setInt( counter, item.getInvitedUserAccessLevel() );
							counter++;
							if ( item.getInvitedProjectId() != null ) {
								pstmt.setInt( counter, item.getInvitedProjectId() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getInviteTrackingCode() );
							counter++;
							pstmt.setString( counter, item.getSubmitIP() );
							counter++;
							if ( item.isCodeReplacedByNewer() ) {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );	
							} else {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
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
			String msg = "UserInviteTrackingDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * Update used_date = NOW() , useIP = ?
	 * @param id
	 * @param useUserId
	 * @param useIP
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void updateUsedInviteFields( int id, int useUserId, String useIP ) {

		final String sql = "UPDATE user_invite_tracking_tbl SET invite_used_user_id = ?, use_ip = ?, invite_used = 1, invite_used_date = NOW() WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, useUserId );
							counter++;
							pstmt.setString( counter, useIP );
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

	/**
	 * Update revoking_user_id = ?, invite_revoked = 1, revoked_date = NOW()
	 * @param id
	 * @param revokeAuthUserId
	 * @param useIP
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void updateRevokedInviteFields( int id, int revokeUserId ) {
		final String sql = "UPDATE user_invite_tracking_tbl SET revoking_user_id = ?, invite_revoked = 1, revoked_date = NOW() WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, revokeUserId );
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

	/**
	 * Update invited_user_access_level = ?
	 * @param id
	 * @param invitedUserAccessLevel
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void updateInvitedUserAccessLevelFields( int id, int invitedUserAccessLevel, Connection dbConnection  ) {

		final String sql = "UPDATE user_invite_tracking_tbl SET invited_user_access_level = ? WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, invitedUserAccessLevel );
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

	private static final String updateCodeReplacedByNewerToTrueForPrevInvitesMainPartSQL 
	= "UPDATE user_invite_tracking_tbl SET code_replaced_by_newer = 1 "
			+ " WHERE invited_user_email = ? AND id < ? AND ";
	private static final String updateCodeReplacedByNewerToTrueForPrevInvitesProjectValuePartSQL 
	= "invited_project_id = ? ";
	private static final String updateCodeReplacedByNewerToTrueForPrevInvitesProjectNULLPartSQL 
	= "invited_shared_object_id IS NULL ";
	private static final String updateCodeReplacedByNewerToTrueForPrevInvitesProjectValueSQL =
			updateCodeReplacedByNewerToTrueForPrevInvitesMainPartSQL 
			+ updateCodeReplacedByNewerToTrueForPrevInvitesProjectValuePartSQL;
	private static final String updateCodeReplacedByNewerToTrueForPrevInvitesProjectNULLSQL =
			updateCodeReplacedByNewerToTrueForPrevInvitesMainPartSQL 
			+ updateCodeReplacedByNewerToTrueForPrevInvitesProjectNULLPartSQL;
	/**
	 * Update code_replaced_by_newer = ? for same shared_object_id and user_email and id < supplied id
	 * @param authUserInviteTrackingDTO
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void updateCodeReplacedByNewerToTrueForPrevInvites( UserInviteTrackingDTO authUserInviteTrackingDTO ) {
		String sql = updateCodeReplacedByNewerToTrueForPrevInvitesProjectValueSQL;
		if ( authUserInviteTrackingDTO.getInvitedProjectId() == null ) {
			sql = updateCodeReplacedByNewerToTrueForPrevInvitesProjectNULLSQL;
		}

		final String updateSQL = sql;  // Must be final

		// Use Spring JdbcTemplate so Transactions work properly

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( updateSQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, authUserInviteTrackingDTO.getInvitedUserEmail() );
							counter++;
							pstmt.setInt( counter, authUserInviteTrackingDTO.getId() );
							if ( authUserInviteTrackingDTO.getInvitedProjectId() != null ) {
								counter++;
								pstmt.setInt( counter, authUserInviteTrackingDTO.getInvitedProjectId() );
							}
							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "Failed updateCodeReplacedByNewerToTrueForPrevInvites(...), sql: " + updateSQL;
			log.error( msg, e );
			throw e;
		}
	}

	private static final String updateAccessLevelSQL  =
			"UPDATE user_invite_tracking_tbl SET invited_user_access_level = ? WHERE id = ?";
	/**
	 * SET invited_user_access_level = ? WHERE id = ?
	 * 
	 * @param accessLevel
	 * @param id
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void updateAccessLevel( int accessLevel, int id ) {

		final String updateSQL = updateAccessLevelSQL;  // Must be final

		// Use Spring JdbcTemplate so Transactions work properly

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( updateSQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, accessLevel );
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "Failed updateAccessLevel(...), sql: " + updateSQL;
			log.error( msg, e );
			throw e;
		}
	}
		
	private static final String updateToRevokeInviteSQL  =
			"UPDATE user_invite_tracking_tbl SET invite_revoked = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
			+ ", revoking_user_id = ?, revoked_date = NOW() WHERE id = ?";
	/**
	 * SET invite_revoked = 'true' ... WHERE id = ?
	 * 
	 * @param revokingUserId
	 * @param id
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void updateToRevokeInvite( int revokingUserId, int id ) {

		final String updateSQL = updateToRevokeInviteSQL;  // Must be final

		// Use Spring JdbcTemplate so Transactions work properly

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( updateSQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, revokingUserId );
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "Failed updateAccessLevel(...), sql: " + updateSQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	/**
	 * @param id
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void delete( int id ) {

		final String sql = "DELETE FROM user_invite_tracking_tbl WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "Failed to delete, id: " + id + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
	}

}
