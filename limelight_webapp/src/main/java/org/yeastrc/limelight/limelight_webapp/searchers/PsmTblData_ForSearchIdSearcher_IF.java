package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_ForSearchIdSearcher.PsmTblData_ForSearchIdSearcher_ResultEntry;

public interface PsmTblData_ForSearchIdSearcher_IF {

	/**
	 * 
	 * 
	 * @param searchId
	 * @return
	 * @throws SQLException
	 */
	List<PsmTblData_ForSearchIdSearcher_ResultEntry> getPsmTblData_ForSearchId(

			int searchId, boolean include_DecoyPSMs ) throws Exception;

}