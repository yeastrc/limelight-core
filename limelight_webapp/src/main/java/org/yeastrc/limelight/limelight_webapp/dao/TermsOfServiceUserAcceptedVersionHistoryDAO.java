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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.TermsOfServiceUserAcceptedVersionHistoryDTO;

/**
 * table terms_of_service_user_accepted_version_history_tbl
 * 
 */
@Component
public class TermsOfServiceUserAcceptedVersionHistoryDAO extends Limelight_JDBC_Base implements TermsOfServiceUserAcceptedVersionHistoryDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( TermsOfServiceUserAcceptedVersionHistoryDAO.class );

	private static final String SQL_getForUserIdTermsOfServiceVersionId =
			"SELECT accepted__date_time FROM terms_of_service_user_accepted_version_history_tbl "
					+ "WHERE user_id = ? AND terms_of_service_version_id = ?";
	/**
	 * @param userId
	 * @param termsOfServiceVersionId
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public TermsOfServiceUserAcceptedVersionHistoryDTO getForUserIdTermsOfServiceVersionId( 
			int userId,
			int termsOfServiceVersionId ) throws SQLException {
		TermsOfServiceUserAcceptedVersionHistoryDTO returnItem = null;
		final String sql = SQL_getForUserIdTermsOfServiceVersionId;

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {

			preparedStatement.setInt( 1, userId );
			preparedStatement.setInt( 2, termsOfServiceVersionId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				if( rs.next() ) {
					returnItem = new TermsOfServiceUserAcceptedVersionHistoryDTO();
					returnItem.setUserId( userId );
					returnItem.setTermsOfServiceVersionId( termsOfServiceVersionId );
					returnItem.setAcceptedDateTime( rs.getDate( "accepted__date_time" ) );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select TermsOfServiceUserAcceptedVersionHistoryDTO, sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}
	
	//////

	// Not using "INSERT IGNORE" since that also ignores failed inserts for missing foreign keys
	private static final String INSERT_SQL = "INSERT INTO terms_of_service_user_accepted_version_history_tbl "
			+ " (user_id, terms_of_service_version_id, accepted__date_time) "
			+ " VALUES ( ?, ?, NOW() ) "
			+ " ON DUPLICATE KEY UPDATE accepted__date_time = now() ";
	
	/**
	 * @param item
	 * @param dbConnection
	 * @throws Exception
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void save( TermsOfServiceUserAcceptedVersionHistoryDTO item ) {

		final String insertSQL = INSERT_SQL;

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
							pstmt.setInt( counter, item.getUserId() );
							counter++;
							pstmt.setInt( counter, item.getTermsOfServiceVersionId() );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "Failed to insert TermsOfServiceUserAcceptedVersionHistoryDTO, sql: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}
}
