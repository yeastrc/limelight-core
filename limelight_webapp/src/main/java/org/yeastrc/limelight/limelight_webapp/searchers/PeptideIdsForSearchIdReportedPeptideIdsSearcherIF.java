package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers_results.PeptideIdsForSearchIdReportedPeptideIds_Item;

public interface PeptideIdsForSearchIdReportedPeptideIdsSearcherIF {

	/**
	 * @param searchId
	 * @param reportedPeptideIds
	 * @return
	 * @throws SQLException
	 */
	List<PeptideIdsForSearchIdReportedPeptideIds_Item> getPeptideIdsForSearchIdReportedPeptideIds(int searchId,
			List<Integer> reportedPeptideIds) throws SQLException;

}