package org.yeastrc.limelight.limelight_webapp.dao;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.enum_classes.FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum;

public interface FileImport_RunImporter_PauseProcessing_Schedule_DAO_IF {

	/**
	 * @param type
	 * @param scheduleJSON
	 * @param scheduleJSON_Version
	 */
	void insert(

			FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum type, String scheduleJSON,
			int scheduleJSON_Version);

	/**
	 * @param type
	 * @param scheduleJSON
	 * @param scheduleJSON_Version
	 * @param scheduleJSON_PrevLastUpdated_Milliseconds_UTC
	 * @return true if record updated
	 */
	boolean update_for_Type_And_scheduleJSON_PrevLastUpdated_Milliseconds_UTC(

			FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum type, String scheduleJSON,
			int scheduleJSON_Version, int scheduleJSON_PrevLastUpdated_Milliseconds_UTC);

}