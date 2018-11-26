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
package org.yeastrc.limelight.limelight_webapp.init_shared_code_lib;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ApplicationContextEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemTableGetValueCommon;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO;
import org.yeastrc.limelight.limelight_webapp.init_shared_code_lib.pass_to_shared_code_lib.SharedCode_DBConnectionProvider;
import org.yeastrc.session_mgmt.main.YRCSessionMgmtMain;

/**
 * Initialize code in Limelight Shared Code jar included in the web app
 *
 */
@Component
public class InitializeSharedCodeLibrary {

	private static final Logger log = LoggerFactory.getLogger( InitializeSharedCodeLibrary.class );
	
	@Autowired
	private SharedCode_DBConnectionProvider sharedCode_DBConnectionProvider;

	@Autowired
	private ConfigSystemDAO configSystemDAO; // Not use interface since need its 'implements IConfigSystemTableGetValue'
	
    /**
     * @param event
     */
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

		SharedCodeOnly_DBConnectionProvider.setSharedCodeOnly_DBConnectionProvider_Provider_IF( sharedCode_DBConnectionProvider );
		
		//  Could change this to use the cached data for the table, when the data is cached
		ConfigSystemTableGetValueCommon.getInstance().setIConfigSystemTableGetValue( configSystemDAO );
    }
    

    /**
     * @param event
     */
    @EventListener
    public void handleApplicationContextEvent(ApplicationContextEvent event) {
    	
    	log.info( "handleApplicationContextEvent(...) called: " + event.getApplicationContext().getApplicationName() );
    }
}
