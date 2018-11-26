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
import java.sql.SQLException;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.ZzUserDataMirrorDTO;

/**
 * table zz_user_data_mirror_tbl
 *
 */
@Component
public class ZzUserDataMirrorDAO extends Limelight_JDBC_Base implements ZzUserDataMirrorDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ZzUserDataMirrorDAO.class );
	

	private static final String INSERT_SQL = 
			"INSERT INTO zz_user_data_mirror_tbl ( user_id, username, email, first_name, last_name, organization )"
			+ "VALUES ( ?, ?, ?, ?, ?, ? )"
					
			+ " ON DUPLICATE KEY UPDATE "
			+ " username = ?, email = ?, first_name = ?, last_name = ?, organization = ?";

	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( ZzUserDataMirrorDTO item ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getUserId() );
							counter++;
							pstmt.setString( counter, item.getUsername() );
							counter++;
							pstmt.setString( counter, item.getEmail() );
							counter++;
							pstmt.setString( counter, item.getFirstName() );
							counter++;
							pstmt.setString( counter, item.getLastName() );
							counter++;
							pstmt.setString( counter, item.getOrganization() );
							//  Update Values
							counter++;
							pstmt.setString( counter, item.getUsername() );
							counter++;
							pstmt.setString( counter, item.getEmail() );
							counter++;
							pstmt.setString( counter, item.getFirstName() );
							counter++;
							pstmt.setString( counter, item.getLastName() );
							counter++;
							pstmt.setString( counter, item.getOrganization() );
														return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "item: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	

	/**
	 * Update the non-null item values associated with this user_id
	 * @param item
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void updateRecord( final ZzUserDataMirrorDTO item ) {
		
		boolean firstField = true;
		
		StringBuilder sqlSB = new StringBuilder( 1000 );
		sqlSB.append( "UPDATE zz_user_data_mirror SET " );
		
		if ( item.getUsername() != null ) {
			if ( firstField ) {
				firstField = false;
			} else {
				sqlSB.append( ", " );
			}
			sqlSB.append( " username = ? " );
		}

		if ( item.getEmail() != null ) {
			if ( firstField ) {
				firstField = false;
			} else {
				sqlSB.append( ", " );
			}
			sqlSB.append( " email = ? " );
		}

		if ( item.getFirstName() != null ) {
			if ( firstField ) {
				firstField = false;
			} else {
				sqlSB.append( ", " );
			}
			sqlSB.append( " first_name = ? " );
		}
		
		if ( item.getLastName() != null ) {
			if ( firstField ) {
				firstField = false;
			} else {
				sqlSB.append( ", " );
			}
			sqlSB.append( " last_name = ? " );
		}

		if ( item.getOrganization() != null ) {
			if ( firstField ) {
				firstField = false;
			} else {
				sqlSB.append( ", " );
			}
			sqlSB.append( " organization = ? " );
		}
		
		if ( firstField ) {
			String msg = "In updateRecord(...), At least one field must be not null. item.getUserId(): " + item.getUserId();
			log.error( msg );
			throw new IllegalArgumentException(msg);
		}
		
		sqlSB.append( " WHERE user_id = ? " );

		final String sql = sqlSB.toString();

		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							if ( item.getUsername() != null ) {
								counter++;
								pstmt.setString( counter, item.getUsername() );
							}
							if ( item.getEmail() != null ) {
								counter++;
								pstmt.setString( counter, item.getEmail() );
							}
							if ( item.getFirstName() != null ) {
								counter++;
								pstmt.setString( counter, item.getFirstName() );
							}
							if ( item.getLastName() != null ) {
								counter++;
								pstmt.setString( counter, item.getLastName() );
							}
							if ( item.getOrganization() != null ) {
								counter++;
								pstmt.setString( counter, item.getOrganization() );
							}
							
							counter++;
							pstmt.setInt( counter, item.getUserId() );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "item: " + item + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
	}
	

}
