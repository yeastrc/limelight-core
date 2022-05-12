package org.yeastrc.limelight.limelight_webapp.send_email_extra_on_import_finish;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailItem;

public interface SendEmail_Extra_On_ImportFinish_ToConfiguredEmail_IF {

	/**
	 * 
	 */
	void sendEmail_Extra_On_ImportFinish_ToConfiguredEmail(SendEmailItem sendEmailItem_Extra_Emails,
			FileImportTrackingDTO fileImportTrackingDTO, FileImportTrackingRunDTO fileImportTrackingRunDTO);

}