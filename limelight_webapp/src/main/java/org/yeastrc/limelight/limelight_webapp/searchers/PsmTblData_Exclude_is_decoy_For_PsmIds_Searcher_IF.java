package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher.PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry;

public interface PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_IF {

	/**
	 * !!!  Excludes psm_tbl with is_decoy = 1
	 * 
	 * @param psmIds
	 * @return
	 * @throws SQLException
	 */
	List<PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry> getPsmTblData_Exclude_is_decoy_For_PsmIds(

			List<Long> psmIds)
			throws Exception;

}