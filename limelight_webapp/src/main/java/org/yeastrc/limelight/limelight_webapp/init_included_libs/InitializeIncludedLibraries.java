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
package org.yeastrc.limelight.limelight_webapp.init_included_libs;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ApplicationContextEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.init_included_libs.pass_to_included_libs.UserMgmtCentralMainDBConnectionFactory_For_Limelight;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.session_mgmt.main.YRCSessionMgmtMain;

/**
 * Initialize code in jars included in the web app
 * 
 * Excludes Limelight Shared Code Lib
 *
 */
@Component
public class InitializeIncludedLibraries {

	private static final Logger log = LoggerFactory.getLogger( InitializeIncludedLibraries.class );
	
	@Autowired
	private UserMgmtCentralMainDBConnectionFactory_For_Limelight userMgmtCentralMainDBConnectionFactory_For_Limelight;
	
	/**
	 * Limelight class for interacting with UserMgmtCentral classes:
	 *    UserMgmtCentral_Embedded_Facade - Uses tables in local DB through UserMgmtCentralMainDBConnectionFactory
	 *    CallUserAccountMgmtWebservice - Calls UserAccountMgmt Webservice
	 */
	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;
	
    @EventListener
    public void handleContextRefreshedEvent(ContextRefreshedEvent event) {
        
    	log.info( "handleContextRefreshedEvent(...) called: " + event.getApplicationContext().getApplicationName() );

		try {
			YRCSessionMgmtMain.getInstance().init();
		} catch (Exception e) {
			//  
			log.error( "Exception in YRCSessionMgmtMain.init():", e  );
			throw new RuntimeException( e );
		} 

		//  Provide DB connection for UserMgmtCentral_Embedded_Facade
		
		//  Initialize Limelight class for interacting with UserMgmtCentral classes
		userMgmtCentralWebappWebserviceAccess.init( userMgmtCentralMainDBConnectionFactory_For_Limelight );
    }
    

    @EventListener
    public void handleApplicationContextEvent(ApplicationContextEvent event) {
    	
    	log.info( "handleApplicationContextEvent(...) called: " + event.getApplicationContext().getApplicationName() );
    }

}
