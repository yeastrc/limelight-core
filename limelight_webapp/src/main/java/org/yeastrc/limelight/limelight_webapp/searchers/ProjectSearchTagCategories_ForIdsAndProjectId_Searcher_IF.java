package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.Collection;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTagCategories_ForIdsAndProjectId_Searcher.ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_ResultItem;

public interface ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_IF {

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */

	List<ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_ResultItem> getProjectSearchTagCategories_ForIdsAndProjectId(
			Collection<Integer> ids, int projectId) throws SQLException;

}