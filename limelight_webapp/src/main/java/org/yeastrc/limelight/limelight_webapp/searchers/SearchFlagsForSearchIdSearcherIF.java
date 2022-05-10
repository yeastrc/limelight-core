package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;

public interface SearchFlagsForSearchIdSearcherIF {

	/**
	 * @param searchIds
	 * @return Empty List if all searchIds not found
	 * @throws SQLException
	 */
	SearchFlagsForSearchIdSearcher_Result getSearchFlags_ForSearchIds(List<Integer> searchIds) throws SQLException;
}