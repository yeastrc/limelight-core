package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.FastaFileStatistics_For_SearchIdList_Searcher.FastaFileStatistics_For_SearchId_Searcher_Result;

public interface FastaFileStatistics_For_SearchIdList_Searcher_IF {

	/**
	 * @param searchIdList
	 * @return
	 * @throws SQLException
	 */
	FastaFileStatistics_For_SearchId_Searcher_Result getForSearchIdList( List<Integer> searchIdList ) throws Exception;

}