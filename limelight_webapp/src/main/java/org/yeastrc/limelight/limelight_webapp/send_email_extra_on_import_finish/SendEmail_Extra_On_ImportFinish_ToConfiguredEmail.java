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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailIF;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailItem;
import org.yeastrc.limelight.limelight_webapp.send_email_extra_on_import_finish.SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig.SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig_Response;

/**
 * Send Email On Server Or Javacript Error - To Configured Email
 *
 * Send at most once an hour
 */
@Component
public class SendEmail_Extra_On_ImportFinish_ToConfiguredEmail 

implements 
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
, SendEmail_Extra_On_ImportFinish_ToConfiguredEmail_IF
{

	private static final Logger log = LoggerFactory.getLogger( SendEmail_Extra_On_ImportFinish_ToConfiguredEmail.class );
		
	private SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig_Response configuration;
	
	
	@Autowired
	private SendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig_IF sendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig;

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
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.send_email_extra_on_import_finish.SendEmail_Extra_On_ImportFinish_ToConfiguredEmail_IF#sendEmail_Extra_On_ImportFinish_ToConfiguredEmail(org.yeastrc.limelight.limelight_webapp.send_email.SendEmailItem, org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO, org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO)
	 */
	@Override
	public void sendEmail_Extra_On_ImportFinish_ToConfiguredEmail(
			SendEmailItem sendEmailItem_Extra_Emails,
			FileImportStatus status
			) {

		try {
			if ( configuration == null ) {
				
				//  Not configured or configured incorrectly
				
				return; // EARLY RETURN
			}

			//  Allow override from how main emails are sent
			String smtpServerHost_Override_NORMALLY_NOT_SET = configuration.getSmtpServerHost();
			String smtpServerPort_Override_NORMALLY_NOT_SET = configuration.getSmtpServerPort();
			String smtpAuthUsername_Override_NORMALLY_NOT_SET = configuration.getSmtpAuthUsername();
			String smtpAuthPassword_Override_NORMALLY_NOT_SET = configuration.getSmtpAuthPassword();


			sendEmailItem_Extra_Emails.setFromEmailAddress( configuration.getFrom_emailAddress() );
			sendEmailItem_Extra_Emails.setSmtpServerHost_Override_NORMALLY_NOT_SET(smtpServerHost_Override_NORMALLY_NOT_SET);
			sendEmailItem_Extra_Emails.setSmtpServerPort_Override_NORMALLY_NOT_SET(smtpServerPort_Override_NORMALLY_NOT_SET);
			sendEmailItem_Extra_Emails.setSmtpAuthUsername_Override_NORMALLY_NOT_SET(smtpAuthUsername_Override_NORMALLY_NOT_SET);
			sendEmailItem_Extra_Emails.setSmtpAuthPassword_Override_NORMALLY_NOT_SET(smtpAuthPassword_Override_NORMALLY_NOT_SET);

			if ( configuration.getTo_emailAddresses_OnImportFinish_All_Imports() != null ) {

				for ( String to_emailAddress : configuration.getTo_emailAddresses_OnImportFinish_All_Imports() ) {

					sendEmailItem_Extra_Emails.setToEmailAddress( to_emailAddress );
					sendEmail.sendEmail( sendEmailItem_Extra_Emails );
				}
			}

			if ( status == FileImportStatus.FAILED
					&& configuration.getTo_emailAddresses_OnImportFinish_Failed_Imports() != null ) {

				for ( String to_emailAddress : configuration.getTo_emailAddresses_OnImportFinish_Failed_Imports() ) {

					sendEmailItem_Extra_Emails.setToEmailAddress( to_emailAddress );
					sendEmail.sendEmail( sendEmailItem_Extra_Emails );
				}
			}

			if ( status == FileImportStatus.COMPLETE
					&& configuration.getTo_emailAddresses_OnImportFinish_Successful_Imports() != null ) {

				for ( String to_emailAddress : configuration.getTo_emailAddresses_OnImportFinish_Successful_Imports() ) {

					sendEmailItem_Extra_Emails.setToEmailAddress( to_emailAddress );
					sendEmail.sendEmail( sendEmailItem_Extra_Emails );
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
				sendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig.sendEmail_Extra_On_ImporterFinish_ToConfiguredEmail_ReadConfig();
	}
}

