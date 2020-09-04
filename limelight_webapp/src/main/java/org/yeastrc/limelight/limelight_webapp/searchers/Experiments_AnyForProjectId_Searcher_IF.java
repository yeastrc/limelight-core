package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

public interface Experiments_AnyForProjectId_Searcher_IF {

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	boolean experiments_AnyForProjectId_Searcher(int projectId) throws SQLException;

}