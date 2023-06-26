package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher.FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher_Return_Item;

public interface FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher_IF {

	/**
	 * @return
	 * @throws SQLException
	 */
	List<FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher_Return_Item>

			get_Current_PauseRunImporter_Status() throws SQLException;

}