package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

public interface SavedView_AnyForProjectId_Searcher_IF {
	
	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	boolean savedView_AnyForProjectId( int projectId ) throws SQLException;
	
}