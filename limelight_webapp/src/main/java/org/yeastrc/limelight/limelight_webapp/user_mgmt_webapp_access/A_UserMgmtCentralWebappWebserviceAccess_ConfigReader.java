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
package org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access;


import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;

/**
 * Read configuration for UserMgmtCentralWebappWebserviceAccess
 * 
 * If no configuration file, return null
 * 
 * Package Private
 */
@Component
class A_UserMgmtCentralWebappWebserviceAccess_ConfigReader {

	private static final Logger log = LoggerFactory.getLogger( A_UserMgmtCentralWebappWebserviceAccess_ConfigReader.class );
	
	private static String CONFIG_FILENAME = "user_mgmt_config.properties";

	private static String PROPERTY_NAME__USER_ACCOUNT_WEB_APP_URL = "user.account.webapp.url.app.context";
	private static String PROPERTY_NAME__WEBAPP_IDENTIFIER_FOR_USER_ACCOUNT_WEB_APP = "webapp.identifier.for.user.account.webapp";
	private static String PROPERTY_NAME__WEBAPP_KEY_FOR_USER_ACCOUNT_WEB_APP = "webapp.key.for.user.account.webapp";
	
	//  Encryption key.  Value must be 16 characters, 128 bits
	private static String PROPERTY_NAME__WEBAPP_ENCRYPTION_KEY_FOR_USER_ACCOUNT_WEB_APP = 
			"webapp.encryption.key.for.user.account.webapp";
	


	/**
	 * @return
	 * @throws IOException
	 */
	ConfigReader_Result getValuesFromPropertiesFile() throws IOException {

		final String propertiesFilename = CONFIG_FILENAME;
		
		ConfigReader_Result configReader_Result = new ConfigReader_Result();
		
		InputStream propertiesFileAsStream = null;
		try {
			//  Get config file from class path
			ClassLoader thisClassLoader = this.getClass().getClassLoader();
			URL configPropFile = thisClassLoader.getResource( propertiesFilename );
			if ( configPropFile == null ) {
				//  No properties file
				return null;  //  EARLY EXIT
			} else {
				log.info( "Properties file '" + propertiesFilename + "' found, load path = " + configPropFile.getFile() );
			}
			propertiesFileAsStream = thisClassLoader.getResourceAsStream( propertiesFilename );
			if ( propertiesFileAsStream == null ) {
				//  No properties file
				return null;  //  EARLY EXIT
			}
			Properties configProps = new Properties();
			configProps.load(propertiesFileAsStream);
			String propertyValue = null;
			propertyValue = configProps.getProperty( PROPERTY_NAME__USER_ACCOUNT_WEB_APP_URL );
			if ( StringUtils.isNotEmpty( propertyValue ) ) {
				configReader_Result.setUserAccountServerURLandAppContext( propertyValue );
			}
			propertyValue = configProps.getProperty( PROPERTY_NAME__WEBAPP_IDENTIFIER_FOR_USER_ACCOUNT_WEB_APP );
			if ( StringUtils.isNotEmpty( propertyValue ) ) {
				configReader_Result.setRequestingWebappIdentifier( propertyValue );
			}
			propertyValue = configProps.getProperty( PROPERTY_NAME__WEBAPP_KEY_FOR_USER_ACCOUNT_WEB_APP );
			if ( StringUtils.isNotEmpty( propertyValue ) ) {
				configReader_Result.setRequestingWebappKey( propertyValue );
			}
			propertyValue = configProps.getProperty( PROPERTY_NAME__WEBAPP_ENCRYPTION_KEY_FOR_USER_ACCOUNT_WEB_APP );
			if ( StringUtils.isNotEmpty( propertyValue ) ) {
				configReader_Result.setRequestingEncryptionKey( propertyValue );
			}
			
			
		} catch ( RuntimeException e ) {
			log.error( "Error processing Properties file '" + propertiesFilename + "', exception: " + e.toString(), e );
			throw e;
		} finally {
			if ( propertiesFileAsStream != null ) {
				propertiesFileAsStream.close();
			}
		}
		
		return configReader_Result;
	}


	/**
	 * 
	 *
	 */
	static class ConfigReader_Result {
		
		private String userAccountServerURLandAppContext;
		private String requestingWebappIdentifier;
		private String requestingWebappKey;
		private String requestingEncryptionKey;
		
		public String getUserAccountServerURLandAppContext() {
			return userAccountServerURLandAppContext;
		}
		public void setUserAccountServerURLandAppContext(String userAccountServerURLandAppContext) {
			this.userAccountServerURLandAppContext = userAccountServerURLandAppContext;
		}
		public String getRequestingWebappIdentifier() {
			return requestingWebappIdentifier;
		}
		public void setRequestingWebappIdentifier(String requestingWebappIdentifier) {
			this.requestingWebappIdentifier = requestingWebappIdentifier;
		}
		public String getRequestingWebappKey() {
			return requestingWebappKey;
		}
		public void setRequestingWebappKey(String requestingWebappKey) {
			this.requestingWebappKey = requestingWebappKey;
		}
		public String getRequestingEncryptionKey() {
			return requestingEncryptionKey;
		}
		public void setRequestingEncryptionKey(String requestingEncryptionKey) {
			this.requestingEncryptionKey = requestingEncryptionKey;
		}
	}
	
}
