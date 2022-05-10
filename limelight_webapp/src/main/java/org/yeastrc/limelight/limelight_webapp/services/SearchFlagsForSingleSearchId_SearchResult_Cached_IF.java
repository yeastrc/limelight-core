package org.yeastrc.limelight.limelight_webapp.services;

import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;

public interface SearchFlagsForSingleSearchId_SearchResult_Cached_IF {

	/**
	 * @param searchId
	 * @return
	 * @throws Exception
	 */
	SearchFlagsForSearchIdSearcher_Result_Item get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(

			int searchId) throws Exception;

}