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
package org.yeastrc.limelight.limelight_webapp.init_populate_new_db_fields_shared_code_lib.pass_to_populate_new_db_fields_shared_code_lib;

import java.sql.Connection;
import java.sql.SQLException;

import org.springframework.stereotype.Component;
import org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DBConnectionProvider_Provider_IF;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * concrete class that will be passed to Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode
 * for getting a database connection in Limelight web app
 *
 */
@Component
public class PopulateNewDBFields_SharedCode_DBConnectionProvider extends Limelight_JDBC_Base implements Limelight_DatabasePopulateNewFields__DBConnectionProvider_Provider_IF {

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider_Provider_IF#getConnection()
	 */
	@Override
	public Connection getConnection() throws SQLException {

		return super.getDBConnection();
	}

}
