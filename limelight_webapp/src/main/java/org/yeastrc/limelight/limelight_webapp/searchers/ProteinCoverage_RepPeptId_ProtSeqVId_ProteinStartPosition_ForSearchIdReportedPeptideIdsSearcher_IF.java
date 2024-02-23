package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result;

public interface ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_IF {

	/**
	 * @param searchId
	 * @param reportedPeptideIds
	 * @return
	 * @throws Exception
	 */

	ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result

			getProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIds(
					
					int searchId,
					List<Integer> reportedPeptideIds,
					SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws Exception;

}