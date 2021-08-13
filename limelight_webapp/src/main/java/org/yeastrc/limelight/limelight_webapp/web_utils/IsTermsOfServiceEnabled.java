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
package org.yeastrc.limelight.limelight_webapp.web_utils;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsValuesSharedConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;

/**
 * 
 *
 */
@Component
public class IsTermsOfServiceEnabled implements IsTermsOfServiceEnabled_IF {

	private static final Logger log = LoggerFactory.getLogger( IsTermsOfServiceEnabled.class );
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	/**
	 * @return
	 */
	@Override
	public boolean isTermsOfServiceEnabled() {
		try {
			//  Is terms of service enabled?
			String termsOfServiceEnabledString =
					configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.TERMS_OF_SERVICE_ENABLED );
			boolean termsOfServiceEnabled = false;
			if ( ConfigSystemsValuesSharedConstants.TRUE.equals(termsOfServiceEnabledString) ) {
				termsOfServiceEnabled = true;
			}
			return termsOfServiceEnabled;
		} catch ( Exception e ) {
			String msg = "Exception getting configSystem value for isTermsOfServiceEnabled()";
			log.error( msg, e );
			return false;
		}
	}	
}
