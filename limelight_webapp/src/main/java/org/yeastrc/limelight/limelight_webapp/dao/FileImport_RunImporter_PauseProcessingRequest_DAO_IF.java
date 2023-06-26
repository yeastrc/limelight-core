package org.yeastrc.limelight.limelight_webapp.dao;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Request_Status_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum;

public interface FileImport_RunImporter_PauseProcessingRequest_DAO_IF {

	/**
	 * @param status_Requested
	 * @param type
	 */
	void insertOrUpdate_StatusId_Requested_ForType(

			FileImport_RunImporter_PauseProcessing_Request_Status_Enum status_Requested,
			FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum type);

}