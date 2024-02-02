package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

public interface Project_Has_AtLeastOne_ProjectScanFile_Table_Record_ForProjectId_Searcher_IF {

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	boolean get_Project_Has_AtLeastOne_ProjectScanFile_Record_ForProjectId(int projectId) throws SQLException;

}