package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_For_SearchId_PsmIds_Searcher.PsmTblData_For_SearchId_PsmIds_Searcher_ResultEntry;

public interface PsmTblData_For_SearchId_PsmIds_Searcher_IF {

	/**
	 * 
	 * 
	 * @param searchId
	 * @return
	 * @throws Exception 
	 */
	List<PsmTblData_For_SearchId_PsmIds_Searcher_ResultEntry> getPsmTblData_For_SearchId_PsmIds(

			int searchId, List<Long> psmIdList) throws Exception;

}