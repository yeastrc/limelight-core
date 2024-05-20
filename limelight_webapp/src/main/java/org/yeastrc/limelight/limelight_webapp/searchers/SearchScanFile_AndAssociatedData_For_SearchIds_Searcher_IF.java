package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.Collection;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_AndAssociatedData_For_SearchIds_Searcher.SearchScanFile_AndAssociatedData_For_SearchIds_Searcher_Result_Item;

public interface SearchScanFile_AndAssociatedData_For_SearchIds_Searcher_IF {

	/**
	 * @param searchIds
	 * @return
	 * @throws SQLException
	 */
	List<SearchScanFile_AndAssociatedData_For_SearchIds_Searcher_Result_Item> getSearchScanFile_For_SearchIds(
			Collection<Integer> searchIds) throws SQLException;

}