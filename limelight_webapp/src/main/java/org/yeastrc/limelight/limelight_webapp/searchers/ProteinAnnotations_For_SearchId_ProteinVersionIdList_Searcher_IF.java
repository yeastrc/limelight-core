package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher.ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_ResultItem;

public interface ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_IF {

	/**
	 * @param searchId
	 * @param proteinSequenceVersionIdList
	 * @return
	 * @throws SQLException
	 */
	List<ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_ResultItem> getProteinAnnotations_For_SearchID_ProteinVersionIdList_Searcher(

			int searchId, List<Integer> proteinSequenceVersionIdList) throws SQLException;

}