package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher.PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;

public interface PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_IF {

	/**
	 * !!!  Excludes psm_tbl with is_decoy = 1
	 * 
	 * @param reportedPeptideId
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @return
	 * @throws SQLException
	 */
	List<PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> getPsmTblData_ForSearchIdReportedPeptideIdCutoffs(

			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel)
			throws Exception;

}