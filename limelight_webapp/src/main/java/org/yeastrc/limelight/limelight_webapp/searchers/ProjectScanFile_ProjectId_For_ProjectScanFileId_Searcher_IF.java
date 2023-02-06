package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

public interface ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher_IF {

	/**
	 * @param projectScanFileId
	 * @return
	 * @throws SQLException
	 */
	Integer get_ProjectId_For_ProjectScanFileId_Searcher(int projectScanFileId) throws SQLException;

}