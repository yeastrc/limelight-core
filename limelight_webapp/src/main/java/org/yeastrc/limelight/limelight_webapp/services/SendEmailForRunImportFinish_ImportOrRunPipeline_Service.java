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

import java.io.StringReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.shared_objects.FeatureDetection_HardklorBullseye_Import_RequestData_V001;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.shared_objects.FeatureDetection_HardklorBullseye_Run_RequestData_V001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.constants.FileImportPipelineRunCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_RequestType;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFilename_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.LimelightWebappDataException;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailIF;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailItem;
import org.yeastrc.limelight.limelight_webapp.send_email_extra_on_import_finish.SendEmail_Extra_On_ImportFinish_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;

/**
 * 
 *
 */
@Component
public class SendEmailForRunImportFinish_ImportOrRunPipeline_Service implements SendEmailForRunImportFinish_ImportOrRunPipeline_Service_IF {

	private static final Logger log = LoggerFactory.getLogger( SendEmailForRunImportFinish_ImportOrRunPipeline_Service.class );

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
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private ProjectScanFilename_DAO_IF projectScanFilename_DAO;
	
	@Autowired
	private SendEmail_Extra_On_ImportFinish_ToConfiguredEmail_IF sendEmail_Extra_On_ImportFinish_ToConfiguredEmail;
	
	@Autowired
	private SendEmailIF sendEmail;
	
	/**
	 * @param fileImportAndPipelineRunTrackingDTO
	 * @param fileImportAndPipelineRunTrackingRunDTO
	 * @throws Exception
	 */
	@Override
	public void sendEmailForRunImportFinish_ImportOrRunPipeline_Service(
			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO,
			FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO
			) throws Exception {
		
		int userId = fileImportAndPipelineRunTrackingDTO.getUserId();
		
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
					+ ", import tracking id: " + fileImportAndPipelineRunTrackingDTO.getId();
			log.error( msg );
			throw new LimelightWebappDataException(msg);
		}

		try {  //  Send email to email addresses in properties file:  SendExtraEmail_OnImportFinish_ToConfiguredEmail_ConfigFilename_Constants.CONFIG_FILENAME

			String importerBaseDir = null;

			try {
				//  Get File Import base dir
				importerBaseDir = 
						configSystemDAO
						.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_TEMP_DIR_KEY );
			} catch ( Throwable t ) {
				// Log and eat exception

			}

			SendEmailItem sendEmailItem_Extra_Emails = createMailMessageToSend(
					Email_Contents_Control.FOR_OTHER, // used when send email to addresses configured in config_system table
					fileImportAndPipelineRunTrackingDTO, 
					fileImportAndPipelineRunTrackingRunDTO,
					"PlaceHolder_To_Email_Address", // toEmailAddressParam
					userMgmtGetUserDataResponse.getEmail(), // userEmailAddressParam
					importerBaseDir // from config
					);
			
			sendEmail_Extra_On_ImportFinish_ToConfiguredEmail.sendEmail_Extra_On_ImportFinish_ToConfiguredEmail(sendEmailItem_Extra_Emails, fileImportAndPipelineRunTrackingDTO.getStatus());
			
		} catch ( Throwable t ) {
			
			log.error( "Failed to send 'Extra' email on Importer Finish", t);
			
			//  Ignore Exception
		}
		
		// Generate and send the email to the user.
		try {
			SendEmailItem sendEmailItem = createMailMessageToSend( 
        			Email_Contents_Control.FOR_USER,
        			fileImportAndPipelineRunTrackingDTO, 
        			fileImportAndPipelineRunTrackingRunDTO,
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
        							fileImportAndPipelineRunTrackingDTO, 
        							fileImportAndPipelineRunTrackingRunDTO,
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
        			
        			FileImportStatus status = fileImportAndPipelineRunTrackingDTO.getStatus();
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
        								fileImportAndPipelineRunTrackingDTO, 
        								fileImportAndPipelineRunTrackingRunDTO,
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
			log.error( "Send import finish email: Exception: import tracking id: " + fileImportAndPipelineRunTrackingDTO.getId(), e );
			
			// eat exception so any error sending email doesn't stop run importer from continuing on to next import to process
			
			// throw e;
		}
	}
	
	
	/**
	 * @param fileImportAndPipelineRunTrackingDTO
	 * @param fileImportAndPipelineRunTrackingRunDTO
	 * @param toEmailAddressParam
	 * @return
	 * @throws Exception
	 */
	private SendEmailItem createMailMessageToSend( 
			Email_Contents_Control email_Contents_Control,
			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO,
			FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO,
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
		
		FileImportStatus status = fileImportAndPipelineRunTrackingDTO.getStatus();
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
		
		//  TODO   Update when have Run Sub Status
		
//		if ( email_Contents_Control == Email_Contents_Control.FOR_OTHER
//				&& status == FileImportStatus.FAILED ) {
//			FileImportRunSubStatus fileImportRunSubStatus = fileImportAndPipelineRunTrackingRunDTO.getRunSubStatus();
//			if ( fileImportRunSubStatus == FileImportRunSubStatus.SYSTEM_ERROR ) {
//				statusText = "failed with System Error";
//			}
//		}
		
		String subject_Import_OR_RunPipeline_Text = null;  //  Inserted into Subject String
		String body_Import_OR_RunPipeline_Text = null;  //  Inserted into emailBody_Lines
		
		String failedMessage = "";
		if ( status == FileImportStatus.FAILED ) {

			String dataErrorTextTruncated = null; 
					
			if ( StringUtils.isNotEmpty( fileImportAndPipelineRunTrackingRunDTO.getFinished_fail_end_user_display_message() ) ) {
				
				dataErrorTextTruncated = fileImportAndPipelineRunTrackingRunDTO.getFinished_fail_end_user_display_message();
				
			} else if ( StringUtils.isNotEmpty( fileImportAndPipelineRunTrackingRunDTO.getFinished_fail_pipeline_end_user_display_message() ) ) {
				
				dataErrorTextTruncated = fileImportAndPipelineRunTrackingRunDTO.getFinished_fail_pipeline_end_user_display_message();
			}
		
			if ( dataErrorTextTruncated.length() > MAX_FAILURE_MESSAGE_LENGTH ) {
				dataErrorTextTruncated = dataErrorTextTruncated.substring(0, MAX_FAILURE_MESSAGE_LENGTH );
			}
			failedMessage = "\n\n"
					+ "Failure Message (truncated): " 
					+ "\n\n"
					+ dataErrorTextTruncated
					+ "\n\n"
					+ "** END Failure Message";
		}
		
		String projectTitle = null;
		
		{
			ProjectDTO projectDTO = projectDAO.get_Title_ProjectLocked_ForId( fileImportAndPipelineRunTrackingDTO.getProjectId() );
		
			if ( projectDTO != null ) {
				projectTitle = projectDTO.getTitle();
			}
		}

		//////////

		List<String> emailBody_Lines__For_MessageType = new ArrayList<> ( 100 );
		
		///
		
		if ( fileImportAndPipelineRunTrackingDTO.getRequestType() == FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_IMPORT ) {

			if ( fileImportAndPipelineRunTrackingDTO.getRequestData_Format_VersionNumber() != 1 ) {
				String msg = "( fileImportAndPipelineRunTrackingDTO.getRequestData_Format_VersionNumber() != 1 )";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			};
			
			String requestData_AsString = fileImportAndPipelineRunTrackingDTO.getRequestData_AsString();

			//  Unmarshall the request data

			FeatureDetection_HardklorBullseye_Import_RequestData_V001 featureDetection_HardklorBullseye_Import_RequestData_V001 = null;

			try {
				JAXBContext jaxbContext = JAXBContext.newInstance( FeatureDetection_HardklorBullseye_Import_RequestData_V001.class );

				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

				Object unmarshalledObject = null;
				try {
					//  XML generated internal to Limelight so do NOT need Save Parsing
					//  XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
					StringReader stringReader = new StringReader( requestData_AsString );
					unmarshalledObject = unmarshaller.unmarshal( stringReader );
				} catch ( Exception e ) {
					log.error( "Exception in deserializing the Internal Request Data XML", e );
					throw new LimelightInternalErrorException( e.toString() , e ); 
				}
				if ( ! ( unmarshalledObject instanceof FeatureDetection_HardklorBullseye_Import_RequestData_V001 ) ) {
					String msg = "Object unmarshalled "
							+ " cannot be cast to FeatureDetection_HardklorBullseye_Import_RequestData_V001.  unmarshalledObject.getClass().getCanonicalName(): " + unmarshalledObject.getClass().getCanonicalName();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}

				featureDetection_HardklorBullseye_Import_RequestData_V001 = (FeatureDetection_HardklorBullseye_Import_RequestData_V001) unmarshalledObject;

			} catch ( Exception e ) {
				log.error( "Exception in deserializing the Internal Request Data XML" );
				throw e;
			}

			if ( projectTitle != null ) {
				emailBody_Lines__For_MessageType.add( "Project: " + projectTitle + " (" + fileImportAndPipelineRunTrackingDTO.getProjectId() + ")" );
			}
			
			{
				List<String> scanFilenameList = 
						projectScanFilename_DAO.getScanFilenameList_For_ProjectScanFileId(
								featureDetection_HardklorBullseye_Import_RequestData_V001.getProjectScanFileId() );
			
				if ( ! scanFilenameList.isEmpty() ) {
					Collections.sort( scanFilenameList );
					
					String scanFilenameDisplay = null;
					
					for ( String scanFilename : scanFilenameList ) {
						if ( scanFilenameDisplay == null ) {
							scanFilenameDisplay = scanFilename;
						} else {
							scanFilenameDisplay += ", " + scanFilename;
						}
					}
					
					emailBody_Lines__For_MessageType.add( "Scan file: " + scanFilenameDisplay );
				}
			}
			
			emailBody_Lines__For_MessageType.add( "Label: " + featureDetection_HardklorBullseye_Import_RequestData_V001.getLabel() );
			
			emailBody_Lines__For_MessageType.add( "Description: " + featureDetection_HardklorBullseye_Import_RequestData_V001.getDescription() );
			
			emailBody_Lines__For_MessageType.add( "Hardklor Results Filename: " + featureDetection_HardklorBullseye_Import_RequestData_V001.getHardklor_ResultsFile_UploadedFilename() );
			
			emailBody_Lines__For_MessageType.add( "Hardklor Conf Filename: " + featureDetection_HardklorBullseye_Import_RequestData_V001.getHardklor_ConfFile_UploadedFilename() );

			emailBody_Lines__For_MessageType.add( "Bullseye Results Filename: " + featureDetection_HardklorBullseye_Import_RequestData_V001.getBullseye_ResultsFile_UploadedFilename() );

			subject_Import_OR_RunPipeline_Text = "Feature Detection Import";
			
			body_Import_OR_RunPipeline_Text = subject_Import_OR_RunPipeline_Text;
			
		}  else if ( fileImportAndPipelineRunTrackingDTO.getRequestType() == FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_RUN_AND_IMPORT) {

			if ( fileImportAndPipelineRunTrackingDTO.getRequestData_Format_VersionNumber() != 1 ) {
				String msg = "( fileImportAndPipelineRunTrackingDTO.getRequestData_Format_VersionNumber() != 1 )";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			};
			
			String requestData_AsString = fileImportAndPipelineRunTrackingDTO.getRequestData_AsString();

			//  Unmarshall the request data

			FeatureDetection_HardklorBullseye_Run_RequestData_V001 featureDetection_HardklorBullseye_Run_RequestData_V1 = null;

			try {
				JAXBContext jaxbContext = JAXBContext.newInstance( FeatureDetection_HardklorBullseye_Run_RequestData_V001.class );

				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

				Object unmarshalledObject = null;
				try {
					//  XML generated internal to Limelight so do NOT need Save Parsing
					//  XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
					StringReader stringReader = new StringReader( requestData_AsString );
					unmarshalledObject = unmarshaller.unmarshal( stringReader );
				} catch ( Exception e ) {
					log.error( "Exception in deserializing the Internal Request Data XML", e );
					throw new LimelightInternalErrorException( e.toString() , e ); 
				}
				if ( ! ( unmarshalledObject instanceof FeatureDetection_HardklorBullseye_Run_RequestData_V001 ) ) {
					String msg = "Object unmarshalled "
							+ " cannot be cast to FeatureDetection_HardklorBullseye_Run_RequestData_V001.  unmarshalledObject.getClass().getCanonicalName(): " + unmarshalledObject.getClass().getCanonicalName();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}

				featureDetection_HardklorBullseye_Run_RequestData_V1 = (FeatureDetection_HardklorBullseye_Run_RequestData_V001) unmarshalledObject;

			} catch ( Exception e ) {
				log.error( "Exception in deserializing the Internal Request Data XML" );
				throw e;
			}

			if ( projectTitle != null ) {
				emailBody_Lines__For_MessageType.add( "Project: " + projectTitle + " (" + fileImportAndPipelineRunTrackingDTO.getProjectId() + ")" );
			}
			
			{
				List<String> scanFilenameList = 
						projectScanFilename_DAO.getScanFilenameList_For_ProjectScanFileId(
								featureDetection_HardklorBullseye_Run_RequestData_V1.getProjectScanFileId() );

				String scanFilenameDisplay = null;
				
				for ( String scanFilename : scanFilenameList ) {
					if ( scanFilenameDisplay == null ) {
						scanFilenameDisplay = scanFilename;
					} else {
						scanFilenameDisplay += ", " + scanFilename;
					}
				}
				
				emailBody_Lines__For_MessageType.add( "Scan file: " + scanFilenameDisplay );
			}
			
			emailBody_Lines__For_MessageType.add( "Label: " + featureDetection_HardklorBullseye_Run_RequestData_V1.getLabel() );
			
			emailBody_Lines__For_MessageType.add( "Description: " + featureDetection_HardklorBullseye_Run_RequestData_V1.getDescription() );
			
			emailBody_Lines__For_MessageType.add( "Hardklor Conf Filename: " + featureDetection_HardklorBullseye_Run_RequestData_V1.getHardklor_ConfFile_UploadedFilename() );

			emailBody_Lines__For_MessageType.add( "Bullseye Conf Filename: " + featureDetection_HardklorBullseye_Run_RequestData_V1.getBullseye_ConfFile_UploadedFilename() );
			
			subject_Import_OR_RunPipeline_Text = "Feature Detection Run";
			
			body_Import_OR_RunPipeline_Text = subject_Import_OR_RunPipeline_Text;
		}
		
		// set the message body
		String text = 
				"The Limelight " + body_Import_OR_RunPipeline_Text + " has " + statusText
				+ ".\n\n"
				+ StringUtils.join( emailBody_Lines__For_MessageType, "\n" )
				+ failedMessage
				+ "\n\n"
				+ "Thank you\n\nlimelight";

		if ( email_Contents_Control == Email_Contents_Control.FOR_OTHER ) {
			
			String importTrackingLine = "";
			if ( fileImportAndPipelineRunTrackingDTO != null ) {
				importTrackingLine = "\nImportTrackId: " + fileImportAndPipelineRunTrackingDTO.getId();
			}
			
			String importerBaseDirLine = "";
			if ( StringUtils.isNotEmpty( importerBaseDir ) ) {
				importerBaseDirLine = "\n Importer Base dir: " + importerBaseDir + "/" + FileImportPipelineRunCommonConstants.IMPORT_AND_PIPELINE_RUN__BASE_DIR;
			}
			
			
			text += "\n\nThe above text was sent to email address: " + userEmailAddressParam + "\n"
					+ "Project Id: " + fileImportAndPipelineRunTrackingDTO.getProjectId()
					+ importTrackingLine
					+ importerBaseDirLine;
		}
		
		String toEmailAddress = toEmailAddressParam;
		String emailSubject = "Limelight " + subject_Import_OR_RunPipeline_Text + " " + statusText;
		String emailBody = text;
		
		SendEmailItem sendEmailItem = new SendEmailItem();
		sendEmailItem.setFromEmailAddress( fromEmailAddress );
		sendEmailItem.setToEmailAddress( toEmailAddress );
		sendEmailItem.setEmailSubject( emailSubject );
		sendEmailItem.setEmailBody( emailBody );
		
		return sendEmailItem;
	}

}
