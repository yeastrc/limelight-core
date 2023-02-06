package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

public interface ScanFileRecords_IsAny_For_ProjectId_Searcher_IF {

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	boolean isAny_ProjectScanFileRecords_For_ProjectId(int projectId) throws SQLException;

}