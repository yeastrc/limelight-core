package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.SearchIds_For_ProjectSearchIdList_Searcher.SearchIdForProjectSearchIdListSearcher_ResultItem;

public interface SearchIds_For_ProjectSearchIdList_Searcher_IF {

	List<SearchIdForProjectSearchIdListSearcher_ResultItem> get_SearchIds_For_ProjectSearchIdList(
			List<Integer> projectSearchIdList) throws SQLException;

}