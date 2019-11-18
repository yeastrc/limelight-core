package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result;

public interface SearchFlagsForSearchIdSearcherIF {

	/**
	 * @param searchId
	 * @return null if searchId not found
	 * @throws SQLException
	 */
	SearchFlagsForSearchIdSearcher_Result getSearchHasScanDataForSearchId(int searchId) throws SQLException;

}