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

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailIF;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailItem;

/**
 * Send Email On Server Or Javacript Error - To Configured Email
 *
 * Send at most once an hour
 */
@Component
public class SendEmailOnServerOrJsError_ToConfiguredEmail implements SendEmailOnServerOrJsError_ToConfiguredEmail_IF {

	private static final Logger log = LoggerFactory.getLogger( SendEmailOnServerOrJsError_ToConfiguredEmail.class );
	
	private static final long ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

	private AtomicLong lastEmailSent_SystemTime = new AtomicLong( 0 );
	
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	@Autowired
	private SendEmailIF sendEmail;
	
	
	/**
	 * Send at most once an hour
	 */
	@Override
	public void sendEmailOnServerOrJsError_ToConfiguredEmail() {

		try {

			//  Send to emails specified in config table

			String to_emailAddresses_CommaDelim =
					configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysConstants.SERVER_OR_JAVASCRIPT_ERROR_EMAILS_TO_SEND_TO_KEY );

			String from_emailAddress =
					configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysConstants.SERVER_OR_JAVASCRIPT_ERROR_EMAILS_FROM_ADDRESS_KEY );

			String serverIdentifier =
					configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysConstants.SERVER_OR_JAVASCRIPT_ERROR_EMAILS_SERVER_IDENTIFIER_KEY );
			

			if ( StringUtils.isNotEmpty( to_emailAddresses_CommaDelim )
					&& ( StringUtils.isEmpty( from_emailAddress )
							|| StringUtils.isEmpty( serverIdentifier ) ) ) {
				
				log.error( "sendEmailOnServerOrJsError_ToConfiguredEmail configuration error.  Config table key '" 
						+ ConfigSystemsKeysConstants.SERVER_OR_JAVASCRIPT_ERROR_EMAILS_TO_SEND_TO_KEY
						+ "' has value but one of following Config table keys not populated: '"
						+ ConfigSystemsKeysConstants.SERVER_OR_JAVASCRIPT_ERROR_EMAILS_FROM_ADDRESS_KEY
						+ "' or '"
						+ ConfigSystemsKeysConstants.SERVER_OR_JAVASCRIPT_ERROR_EMAILS_SERVER_IDENTIFIER_KEY
						+ "'.");
			}
			

			if ( StringUtils.isNotEmpty( to_emailAddresses_CommaDelim )
					&& StringUtils.isNotEmpty( from_emailAddress )
					&& StringUtils.isNotEmpty( serverIdentifier ) ) {
				
				long lastEmailSent_SystemTime_CurrentValue = this.lastEmailSent_SystemTime.get();
				
				long currentTimeMillis = System.currentTimeMillis();
				
				long currentTime_Minus_OneHour = currentTimeMillis - ONE_HOUR_IN_MILLISECONDS;
				
				if ( currentTime_Minus_OneHour > lastEmailSent_SystemTime_CurrentValue ) {
				
//				if ( true ) {
				
					long lastEmailSent_SystemTime_OldValue = this.lastEmailSent_SystemTime.getAndSet( currentTimeMillis );
					
					//  lastEmailSent_SystemTime_OldValue != lastEmailSent_SystemTime_CurrentValue
					//      - Means that this.lastEmailSent_SystemTime was updated between .get() and .getAndSet(...)
					
					if ( lastEmailSent_SystemTime_OldValue == lastEmailSent_SystemTime_CurrentValue ) {
					
//					if ( true ) {
						
						String emailSubject = "Limelight Webapp running on server: " + serverIdentifier 
								+ ".  An error has occurred in server or Javascript code.";
						
						String emailBody = 
								"Limelight Webapp running on server: " + serverIdentifier + "\n\n"
								+ "An error has occurred in server or Javascript code.\n"
								+ "\n"
								+ "Emails will be sent at most once per hour";
						
						SendEmailItem sendEmailItem = new SendEmailItem();
						sendEmailItem.setEmailBody( emailBody );
						sendEmailItem.setEmailSubject( emailSubject );
						sendEmailItem.setFromEmailAddress( from_emailAddress );
		
						String[] extraEmailAddressesToSendTo_Array = to_emailAddresses_CommaDelim.split( "," );
						for ( String extraEmailAddressesToSendTo : extraEmailAddressesToSendTo_Array ) {
							
							sendEmailItem.setToEmailAddress( extraEmailAddressesToSendTo );
							sendEmail.sendEmail( sendEmailItem );
						}
					}
				}
			}
		} catch ( Throwable t ) {
			
			//  Eat exception after logging
			
			log.error( "Failed to send email that Server or JS had error.", t );
			
		}
	}
}
