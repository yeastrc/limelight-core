package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTags_ForProjectSearchIdsSearcher.ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem;

public interface ProjectSearchTags_ForProjectSearchIdsSearcher_IF {

	/**
	 * @param projectSearchIds
	 * @return
	 * @throws SQLException
	 */
	List<ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem> getProjectSearchTags_ForProjectSearchIds(
			List<Integer> projectSearchIds) throws SQLException;

}