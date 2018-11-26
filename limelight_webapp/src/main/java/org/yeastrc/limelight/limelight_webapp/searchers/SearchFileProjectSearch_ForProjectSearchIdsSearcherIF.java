package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers_results.SearchFileProjectSearch_ForProjectSearchIds_Item;

public interface SearchFileProjectSearch_ForProjectSearchIdsSearcherIF {

	/**
	 * @param projectSearchIds
	 * @return
	 * @throws SQLException
	 */
	List<SearchFileProjectSearch_ForProjectSearchIds_Item> getSearchFileProjectSearch_ForProjectSearchIds(
			List<Integer> projectSearchIds) throws SQLException;

}