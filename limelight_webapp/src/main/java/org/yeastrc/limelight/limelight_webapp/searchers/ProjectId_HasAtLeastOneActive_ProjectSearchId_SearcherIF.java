package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

public interface ProjectId_HasAtLeastOneActive_ProjectSearchId_SearcherIF {

	/**
	 * 
	 * @param projectId
	 * @return true if At least 1 record in project_search_tbl for project_id where status_id =  SearchRecordStatus.IMPORT_COMPLETE_VIEW
	 * @throws SQLException
	 */
	boolean projectId_HasAtLeastOneActive_ProjectSearchId(int projectId) throws SQLException;

}