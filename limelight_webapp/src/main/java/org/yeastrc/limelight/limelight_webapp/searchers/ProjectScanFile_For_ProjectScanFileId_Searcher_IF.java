package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;

public interface ProjectScanFile_For_ProjectScanFileId_Searcher_IF {

	/**
	 * @param projectScanFileId
	 * @return
	 * @throws SQLException
	 */

	Project_ScanFile_DTO get_For_ProjectScanFileId_Searcher(int projectScanFileId) throws SQLException;

}