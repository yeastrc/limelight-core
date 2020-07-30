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
package org.yeastrc.limelight.limelight_webapp.services;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportRunSubStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.LimelightWebappDataException;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailIF;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailItem;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;

/**
 * 
 *
 */
@Component
public class SendEmailForRunImportFinishService implements SendEmailForRunImportFinishServiceIF {

	private static final Logger log = LoggerFactory.getLogger( SendEmailForRunImportFinishService.class );

	private static final int MAX_FAILURE_MESSAGE_LENGTH = 500;
	
	private enum Email_Contents_Control { 
		FOR_USER, 
		FOR_OTHER // used when send email to addresses configured in config_system table 
	}
	
	@Autowired
	private UserDAO_IF userDAO;

	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private SendEmailIF sendEmail;
	
	/**
	 * @param fileImportTrackingDTO
	 * @param fileImportTrackingRunDTO
	 * @throws Exception
	 */
	@Override
	public void sendEmailForRunImportFinishInternalService(
			FileImportTrackingDTO fileImportTrackingDTO,
			FileImportTrackingRunDTO fileImportTrackingRunDTO
			) throws Exception {
		
		int userId = fileImportTrackingDTO.getUserId();
		


		UserDTO userDTO = userDAO.getForId( userId );
		if ( userDTO == null ) {
			String msg = "Failed to get userDTO for Limelight user id: " + userId;
			log.error(msg);
			throw new LimelightWebappDataException(msg);
		}
		
		

		//  Get User Mgmt User Id for userId
		Integer userMgmtUserId = userDAO.getUserMgmtUserIdForId( userId );
		if ( userMgmtUserId == null ) {
			String msg = "Failed to get userMgmtUserId for Limelight user id: " + userId;
			log.error( msg );
			throw new LimelightWebappDataException(msg);
		}
		
		//  Get full user data
		
		UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
//		userMgmtGetUserDataRequest.setSessionKey( userMgmtLoginResponse.getSessionKey() );
		userMgmtGetUserDataRequest.setUserId( userMgmtUserId );
		
		UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
				userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );
		
		if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
			String msg = "Send import finish email: Failed to get Full user data from User Mgmt Webapp for userId: " + userId
					+ ", userMgmtUserId: " + userMgmtUserId
					+ ", import tracking id: " + fileImportTrackingDTO.getId();
			log.error( msg );
			throw new LimelightWebappDataException(msg);
		}
		
		//  Generate email with invite code
		// Generate and send the email to the user.
		try {
			SendEmailItem sendEmailItem = createMailMessageToSend( 
        			Email_Contents_Control.FOR_USER,
        			fileImportTrackingDTO, 
        			fileImportTrackingRunDTO,
        			userMgmtGetUserDataResponse.getEmail(), // toEmailAddressParam
        			null, // userEmailAddressParam
        			null // importerBaseDir
        			);
			
        	if ( sendEmailItem != null ) {
        		
        		if ( userDTO.isSendEmailOnImportFinish() ) {
        			
        			sendEmail.sendEmail( sendEmailItem );
        		}
        		
        		{  //  Send to extra "to" emails specified in config table, ANY status
        			String extraEmailAddressesToSendTo_CommaDelim =
        					configSystemDAO
        					.getConfigValueForConfigKey( ConfigSystemsKeysConstants.RUN_IMPORT_EXTRA_EMAILS_TO_SEND_TO_KEY );

        			if ( StringUtils.isNotEmpty( extraEmailAddressesToSendTo_CommaDelim ) ) {

        				String importerBaseDir = null;

        				try {
        					//  Get File Import base dir
        					importerBaseDir = 
        							configSystemDAO
        							.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_TEMP_DIR_KEY );
        				} catch ( Throwable t ) {
        					// Log and eat exception

        				}

        				String[] extraEmailAddressesToSendTo_Array = extraEmailAddressesToSendTo_CommaDelim.split( "," );
        				for ( String extraEmailAddressesToSendTo : extraEmailAddressesToSendTo_Array ) {

        					sendEmailItem = createMailMessageToSend(
        							Email_Contents_Control.FOR_OTHER, // used when send email to addresses configured in config_system table
        							fileImportTrackingDTO, 
        							fileImportTrackingRunDTO,
        							extraEmailAddressesToSendTo, // toEmailAddressParam
        							userMgmtGetUserDataResponse.getEmail(), // userEmailAddressParam
        							importerBaseDir // from config
        							);

        					sendEmailItem.setToEmailAddress( extraEmailAddressesToSendTo );
        					sendEmail.sendEmail( sendEmailItem );
        				}
        			}
        		}

        		{ //  Send to extra "to" emails specified in config table, FAILED status
        			
        			FileImportStatus status = fileImportTrackingDTO.getStatus();
        			if ( status == FileImportStatus.FAILED ) {
        				
        				String extraEmailAddressesToSendTo_CommaDelim =
    					configSystemDAO
    					.getConfigValueForConfigKey( ConfigSystemsKeysConstants.RUN_IMPORT_FAILED_STATUS_EXTRA_EMAILS_TO_SEND_TO_KEY );

        				if ( StringUtils.isNotEmpty( extraEmailAddressesToSendTo_CommaDelim ) ) {

        					String importerBaseDir = null;

        					try {
        						//  Get File Import base dir
        						importerBaseDir = 
        								configSystemDAO
        								.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_TEMP_DIR_KEY );
        					} catch ( Throwable t ) {
        						// Log and eat exception

        					}

        					String[] extraEmailAddressesToSendTo_Array = extraEmailAddressesToSendTo_CommaDelim.split( "," );
        					for ( String extraEmailAddressesToSendTo : extraEmailAddressesToSendTo_Array ) {

        						sendEmailItem = createMailMessageToSend(
        								Email_Contents_Control.FOR_OTHER, // used when send email to addresses configured in config_system table
        								fileImportTrackingDTO, 
        								fileImportTrackingRunDTO,
        								extraEmailAddressesToSendTo, // toEmailAddressParam
        								userMgmtGetUserDataResponse.getEmail(), // userEmailAddressParam
        								importerBaseDir // from config
        								);

        						sendEmailItem.setToEmailAddress( extraEmailAddressesToSendTo );
        						sendEmail.sendEmail( sendEmailItem );
        					}
        				}
        			}
        			
        		}
        	}
		}
		catch (Exception e) {
			log.error( "Send import finish email: Exception: import tracking id: " + fileImportTrackingDTO.getId(), e );
			throw e;
		}
	}
	/**
	 * @param fileImportTrackingDTO
	 * @param fileImportTrackingRunDTO
	 * @param toEmailAddressParam
	 * @return
	 * @throws Exception
	 */
	private SendEmailItem createMailMessageToSend( 
			Email_Contents_Control email_Contents_Control,
			FileImportTrackingDTO fileImportTrackingDTO,
			FileImportTrackingRunDTO fileImportTrackingRunDTO,
			String toEmailAddressParam,
			String userEmailAddressParam,
			String importerBaseDir ) throws Exception {

		String fromEmailAddress = 
				configSystemDAO
				.getConfigValueForConfigKey( ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY );

		if ( StringUtils.isEmpty( fromEmailAddress ) ) {
			//  No From Address so not properly configured
			return null; // EARLY EXIT
		}
		
		FileImportStatus status = fileImportTrackingDTO.getStatus();
		String statusText = null;
		if ( status == FileImportStatus.COMPLETE ) {
			statusText = "finished successfully";
		} else if ( status == FileImportStatus.FAILED ) {
			statusText = "failed";
		} else {
			log.error( "createMailMessageToSend: tracking status not complete or failed.  Not sending any email."
					+ "  tracking status : " + status.toString() );
			return null;  // EARLY RETURN
		}
		
		if ( email_Contents_Control == Email_Contents_Control.FOR_OTHER
				&& status == FileImportStatus.FAILED ) {
			FileImportRunSubStatus fileImportRunSubStatus = fileImportTrackingRunDTO.getRunSubStatus();
			if ( fileImportRunSubStatus == FileImportRunSubStatus.SYSTEM_ERROR ) {
				statusText = "failed with System Error";
			}
		}
		
		
		String searchPathWithLabel = "";
		if ( StringUtils.isNotEmpty( fileImportTrackingDTO.getSearchPath() ) ) {
			searchPathWithLabel = "\n\n"
					+ "Search Path: " + fileImportTrackingDTO.getSearchPath();
		}
		String failedMessage = "";
		if ( status == FileImportStatus.FAILED 
				&& StringUtils.isNotEmpty( fileImportTrackingRunDTO.getDataErrorText() ) ) {
			String dataErrorTextTruncated = fileImportTrackingRunDTO.getDataErrorText();
			if ( dataErrorTextTruncated.length() > MAX_FAILURE_MESSAGE_LENGTH ) {
				dataErrorTextTruncated = dataErrorTextTruncated.substring(0, MAX_FAILURE_MESSAGE_LENGTH );
			}
			failedMessage = "\n\n"
					+ "Import Failure Message (truncated): " 
					+ "\n\n"
					+ dataErrorTextTruncated
					+ "\n\n"
					+ "** END Import Failure Message";
		}
		String importedShortDescription = null;
		if ( StringUtils.isNotEmpty( fileImportTrackingDTO.getSearchName() ) ) {
			importedShortDescription = "Imported short description: " + fileImportTrackingDTO.getSearchName();
		} else {
			importedShortDescription = "No Imported short description";
		}
			
		
		// set the message body
		String text = 
				"The Limelight Import has " + statusText
				+ ".\n\n"
				+ importedShortDescription
				+ searchPathWithLabel
				+ failedMessage
				+ "\n\n"
				+ "Thank you\n\nlimelight";

		if ( email_Contents_Control == Email_Contents_Control.FOR_OTHER ) {
			
			String importTrackingLine = "";
			if ( fileImportTrackingDTO != null ) {
				importTrackingLine = "\nImportTrackId: " + fileImportTrackingDTO.getId();
			}
			
			String importerBaseDirLine = "";
			if ( StringUtils.isNotEmpty( importerBaseDir ) ) {
				importerBaseDirLine = "\n Importer Base dir: " + importerBaseDir;
			}
			
			
			text += "\n\nThe above text was sent to email address: " + userEmailAddressParam + "\n"
					+ "Project Id: " + fileImportTrackingDTO.getProjectId()
					+ importTrackingLine
					+ importerBaseDirLine;
		}
		
		if ( email_Contents_Control == Email_Contents_Control.FOR_OTHER ) {
			
			text += "\n\nThe above text was sent to email address: " + userEmailAddressParam + "\n"
					+ "Project Id: " + fileImportTrackingDTO.getProjectId();
		}
		
		String toEmailAddress = toEmailAddressParam;
		String emailSubject = "Limelight Import " + statusText;
		String emailBody = text;
		
		SendEmailItem sendEmailItem = new SendEmailItem();
		sendEmailItem.setFromEmailAddress( fromEmailAddress );
		sendEmailItem.setToEmailAddress( toEmailAddress );
		sendEmailItem.setEmailSubject( emailSubject );
		sendEmailItem.setEmailBody( emailBody );
		
		return sendEmailItem;
	}

}
