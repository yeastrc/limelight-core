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
package org.yeastrc.limelight.limelight_shared.db;

import java.sql.Connection;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Use Only for Shared Code
 *
 */
public class SharedCodeOnly_DBConnectionProvider {

	private static final Logger log = LoggerFactory.getLogger( SharedCodeOnly_DBConnectionProvider.class );

	private SharedCodeOnly_DBConnectionProvider() { }
	public static SharedCodeOnly_DBConnectionProvider getInstance() { return new SharedCodeOnly_DBConnectionProvider(); }

	private static SharedCodeOnly_DBConnectionProvider_Provider_IF sharedCodeOnly_DBConnectionProvider_Provider;

	/**
	 * @param sharedCodeOnly_DBConnectionProvider_ProviderParam
	 */
	public static void setSharedCodeOnly_DBConnectionProvider_Provider_IF( 
			SharedCodeOnly_DBConnectionProvider_Provider_IF sharedCodeOnly_DBConnectionProvider_ProviderParam ) {
		sharedCodeOnly_DBConnectionProvider_Provider = sharedCodeOnly_DBConnectionProvider_ProviderParam;
	}

	/**
	 * @return
	 * @throws SQLException 
	 */
	public Connection getConnection() throws SQLException {
		if ( sharedCodeOnly_DBConnectionProvider_Provider == null ) {
			String msg = "sharedCodeOnly_DBConnectionProvider_Provider Not Set";
			log.error( msg );
			throw new IllegalStateException( msg );
		}
		return sharedCodeOnly_DBConnectionProvider_Provider.getConnection();
	}
}
