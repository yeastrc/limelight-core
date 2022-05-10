package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.SearchSubSearchGroupId_PsmId_For_SearchId_Searcher.SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem;

public interface SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_IF {

	/**
	 * @param searchId
	 * @param include_DecoyPSMs TODO
	 * @return
	 * @throws Exception
	 */
	List<SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem> getSearchSubSearchGroupId_PsmId_For_SearchId(
			int searchId, boolean include_DecoyPSMs) throws Exception;

}