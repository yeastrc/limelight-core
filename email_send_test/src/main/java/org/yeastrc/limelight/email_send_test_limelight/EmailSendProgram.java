package org.yeastrc.limelight.email_send_test_limelight;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
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



public class EmailSendProgram {

	public static void main(String[] args) throws Exception {
	
		if ( args.length == 0 ) {
			
			System.err.println( "No input parameters. usage:  <pgm> <input file properties file>");
			System.exit(1);
		}

		if ( args.length > 1 ) {
			
			System.err.println( "More than 1 input parameter: usage:  <pgm> <input file properties file>");
			System.exit(1);
		}
		
		String inputParamsFilename = args[ 0 ];
		
		File inputParamsFile = new File( inputParamsFilename );
		
		if ( ! inputParamsFile.exists() ) {
			System.err.println( "<input file properties file> does not exist. inputParamsFilename: " + inputParamsFilename );
			System.exit(1);
		}
		
		Properties configProps_FromPropertiesFile = null;
		InputStream propertiesFileAsStream = null;

		try {

			try {
				propertiesFileAsStream = new FileInputStream( inputParamsFile );

			} catch ( FileNotFoundException e ) {
				//						System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
				String msg = "<input file properties file> not found: " + inputParamsFile.getAbsolutePath() + " exception: " + e.toString();
				//					log.error( msg, e );
				System.err.println( msg );
				System.exit(1);
			}

			configProps_FromPropertiesFile = new Properties();

			configProps_FromPropertiesFile.load(propertiesFileAsStream);

		} finally {

			if ( propertiesFileAsStream != null ) {

				propertiesFileAsStream.close();
			}
		}

		String smtp_host = configProps_FromPropertiesFile.getProperty( "smtp.host" );

		String smtp_port = configProps_FromPropertiesFile.getProperty( "smtp.port" );

		String smtp_auth_username = configProps_FromPropertiesFile.getProperty( "smtp.auth.username" );

		String smtp_auth_password = configProps_FromPropertiesFile.getProperty( "smtp.auth.password" );

		String email_from_address = configProps_FromPropertiesFile.getProperty( "email.from.address" );

		String email_to_address = configProps_FromPropertiesFile.getProperty( "email.to.address" );

		String email_subject = configProps_FromPropertiesFile.getProperty( "email.subject" );

		String email_body = configProps_FromPropertiesFile.getProperty( "email.body" );


		// Generate and send the email to the user.
		try {
			
			String fromEmailAddress = email_from_address;

			// set the SMTP host property value
			Properties properties = System.getProperties();
			
			if ( StringUtils.isNotEmpty(smtp_auth_username) && StringUtils.isNotEmpty(smtp_auth_password) ) {

				// Force modern TLS for older JVMs / strict servers
				properties.put("mail.smtp.ssl.protocols", "TLSv1.2");    // or "TLSv1.3 TLSv1.2"

				properties.put("mail.smtp.auth", "true");
				properties.put("mail.smtp.starttls.enable", "true");
				properties.put("mail.smtp.starttls.required", "true");
			}
			
			final String SMTP_TIMEOUT = "3000";  // in Milliseconds.  String since put in Properties object
			
			properties.put("mail.smtp.timeout", SMTP_TIMEOUT);    
			properties.put("mail.smtp.connectiontimeout", SMTP_TIMEOUT); 
			
			properties.put( "mail.smtp.host", smtp_host );
			
			if ( StringUtils.isNotEmpty(smtp_port) ) {
				properties.put( "mail.smtp.port", smtp_port );
			}
			
			
			// create a JavaMail session
			javax.mail.Session mailSession = javax.mail.Session.getInstance(properties, null);
			// create a new MIME message
			MimeMessage message = new MimeMessage(mailSession);
			// set the from address
			Address fromAddress = new InternetAddress( fromEmailAddress );
			message.setFrom(fromAddress);
			// set the to address
			Address[] toAddress = InternetAddress.parse( email_to_address );
			message.setRecipients(Message.RecipientType.TO, toAddress);
			// set the subject
			message.setSubject( email_subject );
			message.setText( email_body );
			
			System.out.println( "smtp_auth_username: " + smtp_auth_username );
			System.out.println( "smtp_auth_password: " + smtp_auth_password );
			
			Transport mailTransport = null;
			try {
				mailTransport = mailSession.getTransport("smtp");
				
				if ( StringUtils.isNotEmpty(smtp_auth_username) && StringUtils.isNotEmpty(smtp_auth_password) ) {
					//  YES SMTP Username/Password
					mailTransport.connect( smtp_auth_username, smtp_auth_password );
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
			System.err.println( "Error sending email to Smtp Server.  AddressException: smtp_host: '" + smtp_host + "', email_from_address: " + email_from_address );
			e.printStackTrace();
			throw e; 
		}
		catch (SendFailedException e) {
			// Invalid email address format
			System.err.println( "Error sending email to Smtp Server.  SendFailedException: smtp_host: '" + smtp_host + "', email_from_address: " + email_from_address
					+ ", Smtp Server Host: " + smtp_host );
			e.printStackTrace();
			throw e; 
		}
		catch (MessagingException e) {
			// Invalid email address format
			System.err.println( "Error sending email to Smtp Server.  MessagingException: smtp_host: '" + smtp_host + "', email_from_address: " + email_from_address
					+ ", Smtp Server Host: " + smtp_host );
			e.printStackTrace();
			throw e; 
		}
		catch (Exception e) {
			// Invalid email address format
			System.err.println( "Error sending email to Smtp Server.  Exception: smtp_host: '" + smtp_host + "', email_from_address: " + email_from_address
					+ ", Smtp Server Host: " + smtp_host );
			e.printStackTrace();
			throw e; 
		}
	}

}
