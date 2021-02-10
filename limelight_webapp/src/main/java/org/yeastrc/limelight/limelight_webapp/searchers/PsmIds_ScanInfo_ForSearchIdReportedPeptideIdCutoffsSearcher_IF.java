package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher.PsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;

public interface PsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher_IF {

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmIdsForSearchIdReportedPeptideIdCutoffsSearcherIF#getPsmIdsForSearchIdReportedPeptideIdCutoffs(int, int, org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel)
	 */
	List<PsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> getPsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffs(

			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel)
			throws SQLException;

}