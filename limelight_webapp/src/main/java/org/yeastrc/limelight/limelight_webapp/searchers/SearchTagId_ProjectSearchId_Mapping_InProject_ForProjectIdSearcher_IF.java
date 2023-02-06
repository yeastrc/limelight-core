package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher.SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_ResultItem;

public interface SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_IF {

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	List<SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_ResultItem> get_SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectId(
			int projectId) throws SQLException;

}