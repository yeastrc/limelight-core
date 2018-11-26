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
package org.yeastrc.limelight.limelight_webapp.init_included_libs.pass_to_included_libs;

import java.sql.Connection;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.user_mgmt_central.main_code.db.IUserMgmtCentralMainDBConnectionFactory;

/**
 * concrete class that will be passed to AuthLibraryDBConnectionFactory in User Mgmt Embed Library
 * for getting a database connection in Limelight web app
 *
 */
@Component
public class UserMgmtCentralMainDBConnectionFactory_For_Limelight extends Limelight_JDBC_Base implements IUserMgmtCentralMainDBConnectionFactory {
	
	private static final Logger log = LoggerFactory.getLogger( UserMgmtCentralMainDBConnectionFactory_For_Limelight.class );
		
	/* (non-Javadoc)
	 * @see org.yeastrc.user_mgmt_central.main_code.db.IUserMgmtCentralMainDBConnectionFactory#getConnection()
	 */
	@Override
	public Connection getConnection() throws Exception {

//		log.info( "UserMgmt requested a DB connection" );
		
		return super.getDBConnection();
	}

}
