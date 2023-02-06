package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTagCategories_ForProjectId_Searcher.ProjectSearchTagCategories_ForProjectId_Searcher_ResultItem;

public interface ProjectSearchTagCategories_ForProjectId_Searcher_IF {

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */

	List<ProjectSearchTagCategories_ForProjectId_Searcher_ResultItem> getProjectSearchTagCategories_ForProjectId(
			int projectId) throws SQLException;

}