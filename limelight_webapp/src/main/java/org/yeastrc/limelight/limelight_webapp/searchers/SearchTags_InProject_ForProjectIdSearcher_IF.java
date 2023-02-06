package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.SearchTags_InProject_ForProjectIdSearcher.SearchTags_InProject_ForProjectIdSearcher_ResultItem;

public interface SearchTags_InProject_ForProjectIdSearcher_IF {

	/**
	 * @param projectSearchIds
	 * @return
	 * @throws SQLException
	 */
	List<SearchTags_InProject_ForProjectIdSearcher_ResultItem> get_SearchTags_InProject_ForProjectId(int projectId)
			throws SQLException;

}