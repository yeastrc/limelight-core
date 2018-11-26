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
import org.yeastrc.limelight.limelight_webapp.db_dto.UserForgotPasswordTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table user_forgot_password_tracking_tbl
 *
 */
@Component
public class UserForgotPasswordTrackingDAO extends Limelight_JDBC_Base implements UserForgotPasswordTrackingDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( UserForgotPasswordTrackingDAO.class );


	/**
	 * @param forgotPasswordTrackingCode
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public UserForgotPasswordTrackingDTO getForForgotPasswordTrackingCode( String forgotPasswordTrackingCode ) throws Exception {
		
		UserForgotPasswordTrackingDTO returnItem = null;

		final String querySQL = 
				"SELECT * FROM user_forgot_password_tracking_tbl WHERE forgot_password_tracking_code = ? ";


		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {

			preparedStatement.setString( 1, forgotPasswordTrackingCode );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					returnItem = new UserForgotPasswordTrackingDTO();
					returnItem.setId( rs.getInt( "id" ) );
					returnItem.setUserId( rs.getInt( "user_id" ) );
					returnItem.setCreateDate( rs.getDate( "create_date" ) );
					returnItem.setUsedDate( rs.getDate( "used_date" ) );
					returnItem.setForgotPasswordTrackingCode( rs.getString( "forgot_password_tracking_code" ) );
					returnItem.setSubmitIP( rs.getString( "submit_ip" ) );
					returnItem.setUseIP( rs.getString( "use_ip" ) );
					returnItem.setCodeReplacedByNewer( rs.getBoolean( "code_replaced_by_newer" ));
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select UserForgotPasswordTrackingDTO, forgotPasswordTrackingCode: " + forgotPasswordTrackingCode
					 + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}
	
	private static final String INSERT_SQL_STATIC = "INSERT INTO user_forgot_password_tracking_tbl "
			+ " ( user_id, forgot_password_tracking_code, submit_ip, create_date ) " 
			+ " VALUES ( ?, ?, ?, NOW() )";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( UserForgotPasswordTrackingDTO item ) throws Exception {

		final String INSERT_SQL = INSERT_SQL_STATIC;

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
							pstmt.setInt( counter, item.getUserId() );
							counter++;
							pstmt.setString( counter, item.getForgotPasswordTrackingCode() );
							counter++;
							pstmt.setString( counter, item.getSubmitIP() );
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
	
	/**
	 * Update used_date = NOW() , useIP = ?
	 * @param id
	 * @param useIP
	 * @throws Exception
	 */
@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void updateUsedDateUseIP( int id, String useIP ) throws Exception {

		final String sql = "UPDATE user_forgot_password_tracking_tbl SET use_ip = ?, used_date = NOW() WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setString( counter, useIP );
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "updateUsedDateUseIP(...): id: " + id + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
	}
	
	/**
	 * Update code_replaced_by_newer = ?
	 * @param id - ID to use in id < ? comparison
	 * @param codeReplacedByNewer
	 * @throws Exception
	 */
@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void updateCodeReplacedByNewer( int id, boolean codeReplacedByNewer ) throws Exception {

		final String sql = "UPDATE user_forgot_password_tracking_tbl SET code_replaced_by_newer = ? WHERE id < ?";

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setBoolean( counter, codeReplacedByNewer );
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "updateCodeReplacedByNewer(...): id: " + id + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
	}
}
