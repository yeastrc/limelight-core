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
package org.yeastrc.limelight.limelight_webapp.send_email_extra_on_import_finish;

import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants_config_filenames.SendExtraEmail_OnImportFinish_ToConfiguredEmail_ConfigFilename_Constants;

/**
 * Send Email Extra On Importer Finish - To Configured Email - Read Configuration File
 *
 */
@Component
public class SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig implements SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig_IF {

	private static final Logger log = LoggerFactory.getLogger( SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig.class );

	private static final String CONFIG_FILENAME = SendExtraEmail_OnImportFinish_ToConfiguredEmail_ConfigFilename_Constants.CONFIG_FILENAME;

	private static final String EMAILS_TO_SEND_TO_FOR_ALL_IMPORTS_ON_FINISH__PROPERTY_FILE_KEY = "emails.to.send.to.for.all.imports.on.finish";

	private static final String EMAILS_TO_SEND_TO_FOR_FAILED_IMPORTS_ON_FINISH__PROPERTY_FILE_KEY = "emails.to.send.to.for.failed.imports.on.finish";
	
	private static final String EMAILS_TO_SEND_TO_FOR_SUCCESS_IMPORTS_ON_FINISH__PROPERTY_FILE_KEY = "emails.to.send.to.for.success.imports.on.finish";

	private static final String EMAILS_FROM_ADDRESS__PROPERTY_FILE_KEY = "emails.from.address";

	private static final String SERVER_IDENTIFIER__PROPERTY_FILE_KEY = "server.identifier";

	//  SMTP Server  Override for specific uses like when there is an error.
	
	//  If 'host' is in properties file, then ALL the SMTP Server values are used from the property file and none from config table.
	
	private static final String SMTP_SERVER_HOST_KEY__PROPERTY_FILE_KEY = "smtp.server.host";
	private static final String SMTP_SERVER_PORT_KEY__PROPERTY_FILE_KEY = "smtp.server.port";

	private static final String SMTP_SERVER_AUTH_USERNAME_KEY__PROPERTY_FILE_KEY = "smtp.server.auth.username";
	private static final String SMTP_SERVER_AUTH_PASSWORD_KEY__PROPERTY_FILE_KEY = "smtp.server.auth.password";
	
	/**
	 * 
	 *
	 */
	public static class SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig_Response {

		private List<String> to_emailAddresses_OnImportFinish_All_Imports = null;
		private List<String> to_emailAddresses_OnImportFinish_Failed_Imports = null;
		private List<String> to_emailAddresses_OnImportFinish_Successful_Imports = null;
		private String from_emailAddress;
		private String serverIdentifier;
		
		//  Override main settings in config table
		private String smtpServerHost;
		private String smtpServerPort;
		private String smtpAuthUsername;
		private String smtpAuthPassword;

		public String getFrom_emailAddress() {
			return from_emailAddress;
		}
		public String getServerIdentifier() {
			return serverIdentifier;
		}
		public String getSmtpServerHost() {
			return smtpServerHost;
		}
		public String getSmtpServerPort() {
			return smtpServerPort;
		}
		public String getSmtpAuthUsername() {
			return smtpAuthUsername;
		}
		public String getSmtpAuthPassword() {
			return smtpAuthPassword;
		}
		public List<String> getTo_emailAddresses_OnImportFinish_All_Imports() {
			return to_emailAddresses_OnImportFinish_All_Imports;
		}
		public List<String> getTo_emailAddresses_OnImportFinish_Failed_Imports() {
			return to_emailAddresses_OnImportFinish_Failed_Imports;
		}
		public List<String> getTo_emailAddresses_OnImportFinish_Successful_Imports() {
			return to_emailAddresses_OnImportFinish_Successful_Imports;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.send_email_extra_on_import_finish.SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig_IF#sendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig()
	 */
	
	@Override
	public SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig_Response sendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig() throws Exception {
		
		SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig_Response response = new SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig_Response();
		
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
		
		List<String> to_emailAddresses_OnImportFinish_All_Imports = null;
		List<String> to_emailAddresses_OnImportFinish_Failed_Imports = null;
		List<String> to_emailAddresses_OnImportFinish_Successful_Imports = null;
		String from_emailAddress = null;
		String serverIdentifier = null;

		//  Override main settings in config table
		String smtpServerHost = null;
		String smtpServerPort = null;
		String smtpAuthUsername = null;
		String smtpAuthPassword = null;

		
		{ // TO addresses, comma delimited - For ALL Imports
			String propertyString = configProps.getProperty( EMAILS_TO_SEND_TO_FOR_ALL_IMPORTS_ON_FINISH__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				String[] propertyString_Split = propertyString.split(",");
				// remove any empty strings
				List<String> propertyString_Split_RemoveEmpties = new ArrayList<>( propertyString_Split.length );
				
				for ( String propertyString_Split_Entry : propertyString_Split ) {

					if ( propertyString_Split_Entry != null ) {
						propertyString_Split_Entry = propertyString_Split_Entry.trim();
					}
					
					if ( StringUtils.isNotEmpty( propertyString_Split_Entry ) ) {
						propertyString_Split_RemoveEmpties.add( propertyString_Split_Entry );
					}
				}
				
				if ( ! propertyString_Split_RemoveEmpties.isEmpty() ) {
					
					to_emailAddresses_OnImportFinish_All_Imports = new ArrayList<>( propertyString_Split_RemoveEmpties );
				}
			}
		}

		{ // TO addresses, comma delimited - For Failed Imports
			String propertyString = configProps.getProperty( EMAILS_TO_SEND_TO_FOR_FAILED_IMPORTS_ON_FINISH__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				String[] propertyString_Split = propertyString.split(",");
				// remove any empty strings
				List<String> propertyString_Split_RemoveEmpties = new ArrayList<>( propertyString_Split.length );
				
				for ( String propertyString_Split_Entry : propertyString_Split ) {
					
					if ( propertyString_Split_Entry != null ) {
						propertyString_Split_Entry = propertyString_Split_Entry.trim();
					}
					
					if ( StringUtils.isNotEmpty( propertyString_Split_Entry ) ) {
						propertyString_Split_RemoveEmpties.add( propertyString_Split_Entry );
					}
				}
				
				if ( ! propertyString_Split_RemoveEmpties.isEmpty() ) {
					
					to_emailAddresses_OnImportFinish_Failed_Imports = new ArrayList<>( propertyString_Split_RemoveEmpties );
				}
			}
		}
		


		{ // TO addresses, comma delimited - For Successful Imports
			String propertyString = configProps.getProperty( EMAILS_TO_SEND_TO_FOR_SUCCESS_IMPORTS_ON_FINISH__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				String[] propertyString_Split = propertyString.split(",");
				// remove any empty strings
				List<String> propertyString_Split_RemoveEmpties = new ArrayList<>( propertyString_Split.length );
				
				for ( String propertyString_Split_Entry : propertyString_Split ) {

					if ( propertyString_Split_Entry != null ) {
						propertyString_Split_Entry = propertyString_Split_Entry.trim();
					}
					
					if ( StringUtils.isNotEmpty( propertyString_Split_Entry ) ) {
						propertyString_Split_RemoveEmpties.add( propertyString_Split_Entry );
					}
				}
				
				if ( ! propertyString_Split_RemoveEmpties.isEmpty() ) {
					
					to_emailAddresses_OnImportFinish_Successful_Imports = new ArrayList<>( propertyString_Split_RemoveEmpties );
				}
			}
		}
		
		{ // From Address
			String propertyString = configProps.getProperty( EMAILS_FROM_ADDRESS__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				from_emailAddress = propertyString;
			}
		}
		{ // Server Identifier
			String propertyString = configProps.getProperty( SERVER_IDENTIFIER__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				serverIdentifier = propertyString;
			}
		}
		
		{ // smtpServerHost
			String propertyString = configProps.getProperty( SMTP_SERVER_HOST_KEY__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				smtpServerHost = propertyString;
			}
		}
		{ // smtpServerPort
			String propertyString = configProps.getProperty( SMTP_SERVER_PORT_KEY__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				smtpServerPort = propertyString;
			}
		}
				
		{ // smtpAuthUsername
			String propertyString = configProps.getProperty( SMTP_SERVER_AUTH_USERNAME_KEY__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				smtpAuthUsername = propertyString;
			}
		}
		{ // smtpAuthPassword
			String propertyString = configProps.getProperty( SMTP_SERVER_AUTH_PASSWORD_KEY__PROPERTY_FILE_KEY );
			
			if ( StringUtils.isNotEmpty( propertyString ) ) {
				
				smtpAuthPassword = propertyString;
			}
		}
		
		
		////   Cross validation

		if ( to_emailAddresses_OnImportFinish_All_Imports == null && to_emailAddresses_OnImportFinish_Failed_Imports == null && to_emailAddresses_OnImportFinish_Successful_Imports == null 
				&& from_emailAddress == null && serverIdentifier == null
				&& smtpServerHost == null ) {

			String msg = "INFO: NONE of the properties have a value.  Values in config file are NOT used.  Config file: "
					+ CONFIG_FILENAME	
					+ "'. See comments in Sample Config file for how to configure.";
			log.warn( msg );
			
			return null;  // EARLY RETURN
		}

		if ( ( to_emailAddresses_OnImportFinish_All_Imports == null && to_emailAddresses_OnImportFinish_Failed_Imports == null && to_emailAddresses_OnImportFinish_Successful_Imports == null ) 
				|| from_emailAddress == null || serverIdentifier == null
				|| smtpServerHost == null ) {

			String msg = "Not all the required config parameters have values.  Values in config file are NOT used  Config file: "
					+ CONFIG_FILENAME		
					+ "'. See comments in Sample Config file for how to configure.";
			log.error( msg );

			return null;  // EARLY RETURN

		}
		
		response.to_emailAddresses_OnImportFinish_All_Imports = to_emailAddresses_OnImportFinish_All_Imports;
		response.to_emailAddresses_OnImportFinish_Failed_Imports = to_emailAddresses_OnImportFinish_Failed_Imports;
		response.to_emailAddresses_OnImportFinish_Successful_Imports = to_emailAddresses_OnImportFinish_Successful_Imports;
		response.from_emailAddress = from_emailAddress;
		response.serverIdentifier = serverIdentifier;
		
		response.smtpServerHost = smtpServerHost;
		response.smtpServerPort = smtpServerPort;
		response.smtpAuthUsername = smtpAuthUsername;
		response.smtpAuthPassword = smtpAuthPassword;
		
		return response;
	}
	
}
