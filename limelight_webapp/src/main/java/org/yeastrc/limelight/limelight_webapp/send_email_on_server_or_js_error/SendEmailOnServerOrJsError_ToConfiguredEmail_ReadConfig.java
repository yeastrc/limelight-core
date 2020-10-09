/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error;

import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants_config_filenames.SendEmailOnServerOrJsError_ToConfiguredEmail_ConfigFilename_Constants;

/**
 * Send Email On Server Or Javacript Error - To Configured Email - Read Configuration File
 *
 */
@Component
public class SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig implements SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig_IF {

	private static final Logger log = LoggerFactory.getLogger( SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig.class );

	private static final String CONFIG_FILENAME = SendEmailOnServerOrJsError_ToConfiguredEmail_ConfigFilename_Constants.CONFIG_FILENAME;

	private static final String SERVER_OR_JAVASCRIPT_ERROR_EMAILS_TO_SEND_TO__PROPERTY_FILE_KEY = "server.or.javascript.error.emails.to.send.to";

	private static final String SERVER_OR_JAVASCRIPT_ERROR_EMAILS_FROM_ADDRESS__PROPERTY_FILE_KEY = "server.or.javascript.error.emails.from.address";
	
	private static final String SERVER_OR_JAVASCRIPT_ERROR_EMAILS_SERVER_IDENTIFIER__PROPERTY_FILE_KEY = "server.or.javascript.error.emails.server.identifier";

	/**
	 * 
	 *
	 */
	public static class SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig_Response {

		private List<String> to_emailAddresses;
		private String from_emailAddress;
		private String serverIdentifier;
		
		public List<String> getTo_emailAddresses() {
			return to_emailAddresses;
		}
		public String getFrom_emailAddress() {
			return from_emailAddress;
		}
		public String getServerIdentifier() {
			return serverIdentifier;
		}
	}
	
	/**
	 * @return
	 */
	@Override
	public SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig_Response sendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig() throws Exception {
		
		SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig_Response response = new SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig_Response();
		
		Properties configProps = null;
		InputStream propertiesFileAsStream = null;

		try {

			//  Get config file from class path

			ClassLoader thisClassLoader = this.getClass().getClassLoader();
			URL configFileUrlObjUrlLocal = thisClassLoader.getResource( CONFIG_FILENAME );

			if ( configFileUrlObjUrlLocal == null ) {
				String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
				log.info( msg );

				return null; // EARLY RETURN

			} else {
				if ( log.isInfoEnabled() ) {
					log.info( "Properties file '" + CONFIG_FILENAME + "' found, load path = " + configFileUrlObjUrlLocal.getFile() );
				}
			}

			propertiesFileAsStream = configFileUrlObjUrlLocal.openStream();

			if ( propertiesFileAsStream == null ) {
				String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
				log.info( msg );

				return null; // EARLY RETURN

			}

			configProps = new Properties();

			configProps.load( propertiesFileAsStream );

		} finally {

			if ( propertiesFileAsStream != null ) {

				propertiesFileAsStream.close();
			}
		}
		
		List<String> to_emailAddresses = null;
		String from_emailAddress = null;
		String serverIdentifier = null;

		{ // TO addresses, comma delimited
			String propertyString = configProps.getProperty( SERVER_OR_JAVASCRIPT_ERROR_EMAILS_TO_SEND_TO__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				String[] propertyString_Split = propertyString.split(",");
				// remove any empty strings
				List<String> propertyString_Split_RemoveEmpties = new ArrayList<>( propertyString_Split.length );
				
				for ( String propertyString_Split_Entry : propertyString_Split ) {
					if ( StringUtils.isNotEmpty( propertyString_Split_Entry ) ) {
						propertyString_Split_RemoveEmpties.add( propertyString_Split_Entry );
					}
				}
				
				if ( ! propertyString_Split_RemoveEmpties.isEmpty() ) {
					
					to_emailAddresses = new ArrayList<>( propertyString_Split_RemoveEmpties );
				}
			}
		}
		{ // From Address
			String propertyString = configProps.getProperty( SERVER_OR_JAVASCRIPT_ERROR_EMAILS_FROM_ADDRESS__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				from_emailAddress = propertyString;
			}
		}
		{ // Server Identifier
			String propertyString = configProps.getProperty( SERVER_OR_JAVASCRIPT_ERROR_EMAILS_SERVER_IDENTIFIER__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				serverIdentifier = propertyString;
			}
		}

		if ( to_emailAddresses == null && from_emailAddress == null && serverIdentifier == null ) {

			String msg = "INFO: NONE of the properties have a value so NOT configured.  Config file: "
					+ CONFIG_FILENAME
					+ ".  Property names: '"
					+ SERVER_OR_JAVASCRIPT_ERROR_EMAILS_TO_SEND_TO__PROPERTY_FILE_KEY
					+ "', '"
					+ SERVER_OR_JAVASCRIPT_ERROR_EMAILS_FROM_ADDRESS__PROPERTY_FILE_KEY
					+ "', '"
					+ SERVER_OR_JAVASCRIPT_ERROR_EMAILS_SERVER_IDENTIFIER__PROPERTY_FILE_KEY		
					+ "'.";
			log.info( msg );
			
			return null;
		}

		if ( to_emailAddresses != null || from_emailAddress != null || serverIdentifier != null ) {
			
			if ( to_emailAddresses == null || from_emailAddress == null || serverIdentifier == null ) {
			
				String msg = "If any of properties have a value, ALL properties must have a value.  Config file: "
						+ CONFIG_FILENAME
						+ ".  Property names: '"
						+ SERVER_OR_JAVASCRIPT_ERROR_EMAILS_TO_SEND_TO__PROPERTY_FILE_KEY
						+ "', '"
						+ SERVER_OR_JAVASCRIPT_ERROR_EMAILS_FROM_ADDRESS__PROPERTY_FILE_KEY
						+ "', '"
						+ SERVER_OR_JAVASCRIPT_ERROR_EMAILS_SERVER_IDENTIFIER__PROPERTY_FILE_KEY		
						+ "'.";
				log.error( msg );
			}
		}
		
		response.to_emailAddresses = to_emailAddresses;
		response.from_emailAddress = from_emailAddress;
		response.serverIdentifier = serverIdentifier;
		
		return response;
	}
	
}
