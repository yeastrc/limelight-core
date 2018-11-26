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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;

/**
 * 
 *
 */
@Component
public class IsLimelightXMLFileImportFullyConfigured implements IsLimelightXMLFileImportFullyConfiguredIF {

	private static final Logger log = LoggerFactory.getLogger( IsScanFileImportAllowedViaWebSubmit.class );
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;


	/**
	 * @return
	 */
	@Override
	public boolean isLimelightXMLFileImportFullyConfigured() {
		try {
			String limelightXMLFileImportTempDir = 
					configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_TEMP_DIR_KEY );
			
			if ( limelightXMLFileImportTempDir != null ) {
				if ( StringUtils.isNotEmpty( limelightXMLFileImportTempDir.trim() ) ) {
					return true;
				}
			}
			return false;
		} catch ( Exception e ) {
			String msg = "Exception getting configSystem value for isLimelightXMLFileImportFullyConfigured()";
			log.error( msg, e );
			return false;
		}
	}
}
