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
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailIF;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailItem;

/**
 * 
 *
 */
@Component
public class SendEmailForSubmitImportService implements SendEmailForSubmitImportServiceIF {

	private static final Logger log = LoggerFactory.getLogger( SendEmailForSubmitImportService.class );

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
	public void sendEmailForSubmitImportInternalService(
			FileImportTrackingDTO fileImportTrackingDTO
			) throws Exception {
		
		int userId = fileImportTrackingDTO.getUserId();
		
		//  Generate email 
		// Generate and send the email to the user.
		try {

			String emailAddressesToSendTo_CommaDelim =
					configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysConstants.SUBMIT_IMPORT_RECEIVED_EMAILS_TO_SEND_TO_KEY );

			if ( StringUtils.isEmpty( emailAddressesToSendTo_CommaDelim ) ) {
				//  No To Address 
				return; // EARLY EXIT
			}
			
			String fromEmailAddress = 
					configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY );

			if ( StringUtils.isEmpty( fromEmailAddress ) ) {
				//  No From Address so not properly configured
				return; // EARLY EXIT
			}

			String importerBaseDir = null;

			try {
				//  Get File Import base dir
				importerBaseDir = 
						configSystemDAO
						.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_TEMP_DIR_KEY );
			} catch ( Throwable t ) {
				// Log and eat exception

			}

			String searchPathWithLabel = "";
			if ( StringUtils.isNotEmpty( fileImportTrackingDTO.getSearchPath() ) ) {
				searchPathWithLabel = "\n\n"
						+ "Search Path: " + fileImportTrackingDTO.getSearchPath();
			}
			String importedShortDescription = null;
			if ( StringUtils.isNotEmpty( fileImportTrackingDTO.getSearchName() ) ) {
				importedShortDescription = "Imported short description: " + fileImportTrackingDTO.getSearchName();
			} else {
				importedShortDescription = "No Imported short description";
			}
				
			String importTrackingLine = "";
			if ( fileImportTrackingDTO != null ) {
				importTrackingLine = "\nImportTrackId: " + fileImportTrackingDTO.getId();
			}
			
			String importerBaseDirLine = "";
			if ( StringUtils.isNotEmpty( importerBaseDir ) ) {
				importerBaseDirLine = "\n Importer Base dir: " + importerBaseDir;
			}

			// set the message body
			String text = 
					"Limelight has received a Submit Import request"
							+ ".\n\n"
							+ "Project Id: " + fileImportTrackingDTO.getProjectId() + ".\n"
							+ "User Id that submitted: " + userId + ".\n"
							
							+ importedShortDescription
							+ searchPathWithLabel
							+ importTrackingLine
							+ importerBaseDirLine;
			
			String emailSubject = "Limelight Submit Import Received";
			String emailBody = text;
			
			SendEmailItem sendEmailItem = new SendEmailItem();
			sendEmailItem.setFromEmailAddress( fromEmailAddress );
			sendEmailItem.setEmailSubject( emailSubject );
			sendEmailItem.setEmailBody( emailBody );

			String[] emailAddressesToSendTo_Array = emailAddressesToSendTo_CommaDelim.split( "," );
			for ( String emailAddressToSendTo : emailAddressesToSendTo_Array ) {

				sendEmailItem.setToEmailAddress( emailAddressToSendTo );
				sendEmail.sendEmail( sendEmailItem );
			}
		}
		catch (Exception e) {
			log.error( "Send Submit Import Recieved email: Exception: import tracking id: " + fileImportTrackingDTO.getId(), e );
			throw e;
		}
	}

}
