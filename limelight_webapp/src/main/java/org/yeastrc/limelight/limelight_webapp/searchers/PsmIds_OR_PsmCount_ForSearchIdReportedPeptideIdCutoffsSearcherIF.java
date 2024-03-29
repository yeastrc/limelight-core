package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;

public interface PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcherIF {

	/**
	 * @param reportedPeptideId
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @return
	 * @throws SQLException
	 */
	List<Long> getPsmIdsForSearchIdReportedPeptideIdCutoffs(

			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel)
			throws Exception;

	/**
	 * @param reportedPeptideId
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @return
	 * @throws Exception
	 */
	int getPsmCountForSearchIdReportedPeptideIdCutoffs(int reportedPeptideId, int searchId,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel) throws Exception;

}