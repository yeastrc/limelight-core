package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers_results.PeptideSequenceStringsForSearchIdReportedPeptideId_Item;

public interface PeptideSequenceStringsForSearchIdReportedPeptideIdsSearcherIF {

	List<PeptideSequenceStringsForSearchIdReportedPeptideId_Item> getPeptideSequenceStringsForSearchIdReportedPeptideIds(
			int searchId, List<Integer> reportedPeptideIds) throws SQLException;

}