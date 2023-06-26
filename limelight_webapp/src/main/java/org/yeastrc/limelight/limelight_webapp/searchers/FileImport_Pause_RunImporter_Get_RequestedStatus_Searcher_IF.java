package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher.FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher_Return_Item;

public interface FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher_IF {

	/**
	 * @param fileObjectStorage_ForSearch_Id
	 * @param searchId
	 * @return
	 * @throws SQLException
	 */

	List<FileImport_Pause_RunImporter_Get_RequestedStatus_Searcher_Return_Item>

			get_Requested_PauseRunImporter_Status() throws SQLException;

}