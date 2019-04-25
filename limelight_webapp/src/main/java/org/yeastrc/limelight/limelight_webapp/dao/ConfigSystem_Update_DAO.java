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
import org.yeastrc.limelight.limelight_webapp.db_dto.ConfigSystemDTO;

/**
 * !!!  Cannot put this method in ConfigSystemDAO since then Spring fails to start
 * 
 * table config_system_tbl
 * 
 * Update
 *
 */
@Component
public class ConfigSystem_Update_DAO extends Limelight_JDBC_Base implements ConfigSystem_Update_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ConfigSystem_Update_DAO.class );
	
	
	//  Insert, on duplicate update
	private static final String INSERT_UPDATE_SQL = 
			"INSERT INTO config_system_tbl (config_key, config_value, comment)"
			+ "VALUES (?, ?, ?)"
			+ " ON DUPLICATE KEY UPDATE config_value = ?";

	/**
	 * @param configItem
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateValueOnlyOnConfigKey( ConfigSystemDTO configItem ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		final String insertUpdateSQL = INSERT_UPDATE_SQL;

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( insertUpdateSQL );

							int counter = 0;
							counter++;
							pstmt.setString( counter, configItem.getConfigKey() );
							counter++;
							pstmt.setString( counter, configItem.getConfigValue() );
							counter++;
							pstmt.setString( counter, configItem.getComment() );
							counter++;
							pstmt.setString( counter, configItem.getConfigValue() );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "configKey: " + configItem.getConfigKey() + ", SQL: " + insertUpdateSQL;
			log.error( msg, e );
			throw e;
		}
	}
	
}
