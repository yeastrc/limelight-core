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

import java.util.concurrent.atomic.AtomicLong;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailIF;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailItem;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig.SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig_Response;

/**
 * Send Email On Server Or Javacript Error - To Configured Email
 *
 * Send at most once an hour
 */
@Component
public class SendEmailOnServerOrJsError_ToConfiguredEmail 

implements 
SendEmailOnServerOrJsError_ToConfiguredEmail_IF, 
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{

	private static final Logger log = LoggerFactory.getLogger( SendEmailOnServerOrJsError_ToConfiguredEmail.class );
	
	private static final long ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

	private AtomicLong lastEmailSent_SystemTime = new AtomicLong( 0 );
	
	private SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig_Response configuration;
	
	
	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig_IF sendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig;

	@Autowired
	private SendEmailIF sendEmail;
	

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			initializeObject_AfterPropertiesSetBySpring();
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
	}
	
	/**
	 * Send at most once an hour
	 */
	@Override
	public void sendEmailOnServerOrJsError_ToConfiguredEmail() {

		try {
			if ( configuration == null ) {
				
				//  Not configured or configured incorrectly
				
				return; // EARLY RETURN
			}

			long lastEmailSent_SystemTime_CurrentValue = this.lastEmailSent_SystemTime.get();

			long currentTimeMillis = System.currentTimeMillis();

			long currentTime_Minus_OneHour = currentTimeMillis - ONE_HOUR_IN_MILLISECONDS;

			if ( currentTime_Minus_OneHour > lastEmailSent_SystemTime_CurrentValue ) {

				long lastEmailSent_SystemTime_OldValue = this.lastEmailSent_SystemTime.getAndSet( currentTimeMillis );

				//  lastEmailSent_SystemTime_OldValue != lastEmailSent_SystemTime_CurrentValue
				//      - Means that this.lastEmailSent_SystemTime was updated between .get() and .getAndSet(...)

				if ( lastEmailSent_SystemTime_OldValue == lastEmailSent_SystemTime_CurrentValue ) {

					String emailSubject = "Limelight Webapp running on server: " + configuration.getServerIdentifier() 
					+ ".  An error has occurred in server or Javascript code.";

					String emailBody = 
							"Limelight Webapp running on server: " + configuration.getServerIdentifier() + "\n\n"
									+ "An error has occurred in server or Javascript code.\n"
									+ "\n"
									+ "Emails will be sent at most once per hour";

					SendEmailItem sendEmailItem = new SendEmailItem();
					sendEmailItem.setEmailBody( emailBody );
					sendEmailItem.setEmailSubject( emailSubject );
					sendEmailItem.setFromEmailAddress( configuration.getFrom_emailAddress() );

					for ( String extraEmailAddressesToSendTo : configuration.getTo_emailAddresses() ) {

						sendEmailItem.setToEmailAddress( extraEmailAddressesToSendTo );
						sendEmail.sendEmail( sendEmailItem );
					}
				}
			}
		} catch ( Throwable t ) {
			
			//  Eat exception after logging
			
			log.error( "Failed to send email that Server or JS had error.", t );
			
		}
	}
	
	
	/**
	 * Called from afterPropertiesSet() on object initialization
	 * 
	 * @throws Exception
	 */
	private void initializeObject_AfterPropertiesSetBySpring() throws Exception {
		
		configuration =
				sendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig.sendEmailOnServerOrJsError_ToConfiguredEmail_ReadConfig();
	}
}

