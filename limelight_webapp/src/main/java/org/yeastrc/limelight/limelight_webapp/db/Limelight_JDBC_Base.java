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
package org.yeastrc.limelight.limelight_webapp.db;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Base class for all JDBC access to database 'Limelight' (primary database)
 * 
 * Connection comes from primary JdbcTemplate jdbcTemplate
 * 
 * 
 * For uses of int rowsUpdated = this.getJdbcTemplate().update(...):
 * 			it throws org.springframework.dao.DuplicateKeyException for duplicate record
 *
 */
@Component
public abstract class Limelight_JDBC_Base {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	/**
	 * Connection comes from primary JdbcTemplate jdbcTemplate
	 * 
	 * @return
	 * @throws SQLException 
	 */
	protected Connection getDBConnection() throws SQLException {

		DataSource dataSourceDB = jdbcTemplate.getDataSource();
		
		Connection connection = dataSourceDB.getConnection();
		
		return connection;
	}
	
	//  Called from classes extending this class
	protected JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}


}
