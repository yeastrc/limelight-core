package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher;


public interface ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_SearcherIF {

	List<ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher> getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher(

			int searchId, List<Integer> reportedPeptideIdList) throws Exception;

}