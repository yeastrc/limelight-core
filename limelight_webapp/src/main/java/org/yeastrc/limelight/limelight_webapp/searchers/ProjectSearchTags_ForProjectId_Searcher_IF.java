package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTags_ForProjectId_Searcher.ProjectSearchTags_ForProjectId_Searcher_ResultItem;

public interface ProjectSearchTags_ForProjectId_Searcher_IF {

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */

	List<ProjectSearchTags_ForProjectId_Searcher_ResultItem> getProjectSearchTags_ForProjectId(int projectId)
			throws SQLException;

}