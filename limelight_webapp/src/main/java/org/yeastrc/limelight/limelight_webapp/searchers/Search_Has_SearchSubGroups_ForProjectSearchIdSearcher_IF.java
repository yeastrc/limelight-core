package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

public interface Search_Has_SearchSubGroups_ForProjectSearchIdSearcher_IF {

	/**
	 * @param projectSearchId
	 * @return - true, false, or null. null if not found
	 * @throws SQLException
	 */
	Boolean get_Search_Has_SearchSubGroups_ForProjectSearchId(int projectSearchId) throws SQLException;

}