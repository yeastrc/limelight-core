package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;
import java.util.Set;

public interface ReportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds_Searcher_IF {

	/**
	 * Get the Reported Peptide Ids for
	 * 
	 * Protein Sequence Version Ids
	 * Reported Peptide Ids
	 * 
	 * So returns the input Reported Peptide Ids that are in the Protein Sequence Version Ids
	 * 
	 * @param searchId
	 * @param proteinSequenceVersionIds
	 * @param reportedPeptideIds
	 * @return
	 * @throws Exception
	 */
	Set<Integer> get_ReportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds(

			int searchId, List<Integer> proteinSequenceVersionIds, List<Integer> reportedPeptideIds

	) throws Exception;

}