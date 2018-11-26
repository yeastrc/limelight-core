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
package org.yeastrc.limelight.limelight_webapp.send_email;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ApplicationContextEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

/**
 * Read the SendMail Config file on webapp startup
 *
 */
@Component
public class SendMail_ReadConfigFileOnStartup {

	private static final Logger log = LoggerFactory.getLogger( SendMail_ReadConfigFileOnStartup.class );
	
	private static String USE_EMAIL_WEBSERVICE_TRUE = "y";

	private static String CONFIG_FILENAME = "send_mail_config.properties";
	
	private static String PROPERTY_NAME__USE_EMAIL_WEBSERVICE = "use.email.webservice";

	
	@Autowired
	private SendEmail sendEmail;
	
    /**
     * @param event
     */
    @EventListener
    public void handleContextRefreshedEvent(ContextRefreshedEvent event) {
        
    	log.info( "handleContextRefreshedEvent(...) called: " + event.getApplicationContext().getApplicationName() );

		try {
			//  Read Send Mail config file and set values on sendEmail object

			ConfigReader_Result configReader_Result = processConfigFile();
			
			if ( configReader_Result != null ) {
				
				log.info( "Properties file '" + CONFIG_FILENAME + "' contains property '" + PROPERTY_NAME__USE_EMAIL_WEBSERVICE 
						+ "' with value: " + configReader_Result );

				if ( USE_EMAIL_WEBSERVICE_TRUE.equals( configReader_Result.use_email_webservice ) ) {

					log.info( "property '" + PROPERTY_NAME__USE_EMAIL_WEBSERVICE 
							+ "' with value: " + configReader_Result 
							+ "' is == USE_EMAIL_WEBSERVICE_TRUE value of '" + USE_EMAIL_WEBSERVICE_TRUE 
							+ "' so setting UseEmailWebservice to true.");

					sendEmail.setUseEmailWebservice( true );
				}
			}
			
		} catch (Exception e) {
			//  
			log.error( "Exception in sendEmail.setEmail_webservice_url:", e  );
			throw new RuntimeException( e );
		} 

    }
    
    /**
     * @return
     * @throws IOException 
     */
    private ConfigReader_Result processConfigFile() throws IOException {

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
			propertyValue = configProps.getProperty( PROPERTY_NAME__USE_EMAIL_WEBSERVICE );
			if ( StringUtils.isNotEmpty( propertyValue ) ) {
				configReader_Result.use_email_webservice = propertyValue.trim();
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
     * @param event
     */
    @EventListener
    public void handleApplicationContextEvent(ApplicationContextEvent event) {
    	
    	log.info( "handleApplicationContextEvent(...) called: " + event.getApplicationContext().getApplicationName() );
    }
    

	/**
	 * 
	 *
	 */
	static class ConfigReader_Result {
		
		private String use_email_webservice;

		@Override
		public String toString() {
			return "ConfigReader_Result [use_email_webservice=" + use_email_webservice + "]";
		}
		
	}
}
