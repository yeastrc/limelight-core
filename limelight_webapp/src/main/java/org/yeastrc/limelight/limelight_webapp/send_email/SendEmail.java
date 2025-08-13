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

import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappConfigException;
import org.yeastrc.sendmail.SendMailFacade;

/**
 * Send Email
 *
 */
@Component
public class SendEmail implements SendEmailIF {
	
	private static final Logger log = LoggerFactory.getLogger( SendEmail.class );
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	private boolean useEmailWebservice = false;

	/**
	 * Package Private
	 * 
	 * Set by SendMail_ReadConfigFileOnStartup
	 * 
	 * @param useEmailWebservice
	 */
	void setUseEmailWebservice(boolean useEmailWebservice) {
		this.useEmailWebservice = useEmailWebservice;

		if ( log.isInfoEnabled() ) {
			log.info( "useEmailWebservice: " + useEmailWebservice );
		}
	}

	/**
	 * @param sendEmailItem
	 * @throws Exception
	 */
	@Override
	public void sendEmail( SendEmailItem sendEmailItem ) throws Exception  {
		
		if ( log.isInfoEnabled() ) {
			log.info( "About to send email: " + sendEmailItem );
		}
		
		if ( useEmailWebservice ) {
		
			//  Send via email service
			
			SendMailFacade sendMailFacade = SendMailFacade.getSingtonInstance();
			sendMailFacade.send( 
					sendEmailItem.getToEmailAddress(),
					sendEmailItem.getFromEmailAddress(),
					sendEmailItem.getEmailSubject(),
					sendEmailItem.getEmailBody() );
		} else {
			
			String smtpServerHost = null;
			String smtpServerPort = null;
			
			String smtpAuthUsername = null;
			String smtpAuthPassword = null;
			
			if ( StringUtils.isNotEmpty(sendEmailItem.getSmtpServerHost_Override_NORMALLY_NOT_SET() ) ) {

				smtpServerHost = sendEmailItem.getSmtpServerHost_Override_NORMALLY_NOT_SET();
				smtpServerPort = sendEmailItem.getSmtpServerPort_Override_NORMALLY_NOT_SET();
				smtpAuthUsername = sendEmailItem.getSmtpAuthUsername_Override_NORMALLY_NOT_SET();
				smtpAuthPassword = sendEmailItem.getSmtpAuthPassword_Override_NORMALLY_NOT_SET();
				
			} else {
			
				smtpServerHost = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysConstants.EMAIL_SMTP_SERVER_HOST_KEY );
				smtpServerPort = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysConstants.EMAIL_SMTP_SERVER_PORT_KEY );

				if ( StringUtils.isEmpty( smtpServerHost ) ) {

					String msg = "Cannot send email: No entry in config table for key '" + ConfigSystemsKeysConstants.EMAIL_SMTP_SERVER_HOST_KEY
							+ "'.";
					log.error(msg);
					throw new LimelightWebappConfigException( msg );
				}

				//  Both smtpAuthUsername and smtpAuthPassword MUST be populated.  Ignored if only one is populated

				smtpAuthUsername = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysConstants.EMAIL_SMTP_SERVER_AUTH_USERNAME_KEY );
				smtpAuthPassword = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysConstants.EMAIL_SMTP_SERVER_AUTH_PASSWORD_KEY );
			}
			
			// Generate and send the email to the user.
			try {
				
				String fromEmailAddress = sendEmailItem.getFromEmailAddress();

				// set the SMTP host property value
				Properties properties = System.getProperties();

				// Force modern TLS for older JVMs / strict servers
				properties.put("mail.smtp.ssl.protocols", "TLSv1.2");    // or "TLSv1.3 TLSv1.2"
				
				properties.put("mail.smtp.auth", "true");
				properties.put("mail.smtp.starttls.enable", "true");
				properties.put("mail.smtp.starttls.required", "true");
				
				final String SMTP_TIMEOUT = "3000";  // in Milliseconds.  String since put in Properties object
				
				properties.put("mail.smtp.timeout", SMTP_TIMEOUT);    
				properties.put("mail.smtp.connectiontimeout", SMTP_TIMEOUT); 
				
				properties.put( "mail.smtp.host", smtpServerHost );
				
				if ( StringUtils.isNotEmpty(smtpServerPort) ) {
					properties.put( "mail.smtp.port", smtpServerPort );
				}
				
				
				// create a JavaMail session
				javax.mail.Session mailSession = javax.mail.Session.getInstance(properties, null);
				// create a new MIME message
				MimeMessage message = new MimeMessage(mailSession);
				// set the from address
				Address fromAddress = new InternetAddress( fromEmailAddress );
				message.setFrom(fromAddress);
				// set the to address
				Address[] toAddress = InternetAddress.parse( sendEmailItem.getToEmailAddress() );
				message.setRecipients(Message.RecipientType.TO, toAddress);
				// set the subject
				message.setSubject( sendEmailItem.getEmailSubject() );
				message.setText( sendEmailItem.getEmailBody() );
				
				Transport mailTransport = null;
				try {
					mailTransport = mailSession.getTransport("smtp");
					
					if ( StringUtils.isNotEmpty(smtpAuthUsername) && StringUtils.isNotEmpty(smtpAuthPassword) ) {
						//  YES SMTP Username/Password
						mailTransport.connect( smtpAuthUsername, smtpAuthPassword );
					} else {
						//  NO SMTP Username/Password
						mailTransport.connect();	
					}
					
					message.saveChanges();      // don't forget this
					
					mailTransport.sendMessage(message, message.getAllRecipients());
					
				} finally {
					if ( mailTransport != null ) {
						mailTransport.close();
					}
				}
				
			}
			catch (AddressException e) {
				// Invalid email address format
				//				errors.add("email", new ActionMessage("error.resetpassword.sendmailerror"));
				log.warn( "Error sending email to Smtp Server.  AddressException: smtpServerHost: '" + smtpServerHost + "', sendEmailItem: " + sendEmailItem, e );
				throw e; 
			}
			catch (SendFailedException e) {
				// Invalid email address format
				log.error( "Error sending email to Smtp Server.  SendFailedException: smtpServerHost: '" + smtpServerHost + "', sendEmailItem: " + sendEmailItem
						+ ", Smtp Server Host: " + smtpServerHost, e );
				throw e; 
			}
			catch (MessagingException e) {
				// Invalid email address format
				log.error( "Error sending email to Smtp Server.  MessagingException: smtpServerHost: '" + smtpServerHost + "', sendEmailItem: " + sendEmailItem
						+ ", Smtp Server Host: " + smtpServerHost, e );
				throw e; 
			}
			catch (Exception e) {
				// Invalid email address format
				log.error( "Error sending email to Smtp Server.  Exception: smtpServerHost: '" + smtpServerHost + "', sendEmailItem: " + sendEmailItem
						+ ", Smtp Server Host: " + smtpServerHost, e );
				throw e; 
			}
		}
		
		if ( log.isInfoEnabled() ) {
			log.info( "Email sent to : " + sendEmailItem.getToEmailAddress() );
		}
	}
	

}
