package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers_results.SavedViewListForProjectIdItem;

public interface SavedViewListForProjectIdSearcherIF {

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	List<SavedViewListForProjectIdItem> getSavedViewListForProjectId(int projectId) throws SQLException;

}